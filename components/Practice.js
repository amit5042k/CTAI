"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// `exercises` here is the SANITISED list — no answers attached.
// Each item has at least { id, type, prompt, options? }.
export default function Practice({ unitId, exercises, canTrack }) {
  const router = useRouter();
  const total = exercises?.length ?? 0;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [shortText, setShortText] = useState("");
  const [feedback, setFeedback] = useState(null); // { correct, explanation, correctAnswer }
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(() => new Array(total).fill(null));

  const current = exercises[idx];

  const stats = useMemo(() => {
    const answered = results.filter((r) => r !== null).length;
    const correct = results.filter((r) => r === true).length;
    return { answered, correct };
  }, [results]);

  if (!current) return null;

  // Submit a response and immediately show right/wrong feedback.
  // For MCQ/TF this is called the moment an option is clicked, so
  // the learner doesn't need a separate "Check answer" button.
  async function submitAnswer(response) {
    if (response === null || response === undefined || response === "") return;
    if (feedback || submitting) return;
    setPicked(response);
    setSubmitting(true);
    try {
      const res = await fetch("/api/exercises/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitId, exerciseId: current.id, response }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to check");
      setFeedback(data);
      setResults((r) => {
        const next = [...r];
        next[idx] = data.correct;
        return next;
      });
      // Refresh server components (e.g. status badge in the chapter
      // header, dashboard counts) so the page reflects the new
      // progress without a manual reload.
      if (canTrack) router.refresh();
    } catch (e) {
      setFeedback({ correct: false, explanation: e.message });
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    setPicked(null);
    setShortText("");
    setFeedback(null);
    setIdx((i) => Math.min(i + 1, total - 1));
  }

  function prev() {
    setPicked(null);
    setShortText("");
    setFeedback(null);
    setIdx((i) => Math.max(i - 1, 0));
  }

  function reset() {
    setPicked(null);
    setShortText("");
    setFeedback(null);
    setIdx(0);
    setResults(new Array(total).fill(null));
  }

  const allDone = stats.answered === total;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Self-do practice</h2>
        <span className="text-sm text-slate-500">
          Question {idx + 1} of {total} · Score {stats.correct}/{stats.answered}
        </span>
      </div>

      <div className="mt-3 flex gap-1">
        {results.map((r, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              r === true
                ? "bg-emerald-500"
                : r === false
                  ? "bg-red-500"
                  : i === idx
                    ? "bg-brand-500"
                    : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      <div className="mt-5">
        <p className="font-medium text-slate-900">{current.prompt}</p>

        {current.type === "mcq" && (
          <div className="mt-3 grid gap-2">
            {current.options.map((opt, i) => {
              const chosen = picked === i;
              const isAnswered = feedback !== null;
              const isRight = isAnswered && feedback.correctAnswer === i;
              const isWrongPick =
                isAnswered && chosen && !feedback.correct;
              return (
                <button
                  key={i}
                  disabled={isAnswered || submitting}
                  onClick={() => submitAnswer(i)}
                  className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                    isRight
                      ? "border-emerald-400 bg-emerald-50"
                      : isWrongPick
                        ? "border-red-400 bg-red-50"
                        : chosen
                          ? "border-brand-500 bg-brand-50"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="mr-2 font-mono text-xs text-slate-500">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {current.type === "tf" && (
          <div className="mt-3 flex gap-2">
            {[
              { v: true, label: "True" },
              { v: false, label: "False" },
            ].map(({ v, label }) => {
              const chosen = picked === v;
              const isAnswered = feedback !== null;
              const isRight = isAnswered && feedback.correctAnswer === v;
              const isWrongPick =
                isAnswered && chosen && !feedback.correct;
              return (
                <button
                  key={label}
                  disabled={isAnswered || submitting}
                  onClick={() => submitAnswer(v)}
                  className={`flex-1 rounded-md border px-3 py-2 text-sm transition ${
                    isRight
                      ? "border-emerald-400 bg-emerald-50"
                      : isWrongPick
                        ? "border-red-400 bg-red-50"
                        : chosen
                          ? "border-brand-500 bg-brand-50"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {current.type === "short" && (
          <div className="mt-3 flex gap-2">
            <input
              className="input"
              placeholder="Type your answer and press Enter"
              value={shortText}
              disabled={feedback !== null || submitting}
              onChange={(e) => setShortText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && shortText.trim() && !feedback) {
                  e.preventDefault();
                  submitAnswer(shortText.trim());
                }
              }}
            />
            {!feedback && (
              <button
                onClick={() => submitAnswer(shortText.trim())}
                disabled={submitting || shortText.trim().length === 0}
                className="btn-primary disabled:opacity-60"
              >
                {submitting ? "..." : "Check"}
              </button>
            )}
          </div>
        )}
        {current.type === "short" && feedback && !feedback.correct && (
          <p className="mt-2 text-sm text-slate-600">
            Correct answer:{" "}
            <span className="font-semibold">
              {String(feedback.correctAnswer)}
            </span>
          </p>
        )}

        {feedback && (
          <div
            className={`mt-4 rounded-md border px-3 py-3 text-sm ${
              feedback.correct
                ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                : "border-red-300 bg-red-50 text-red-900"
            }`}
            role="status"
          >
            <p className="font-semibold">
              {feedback.correct ? "✓ Correct!" : "✗ Not quite."}
            </p>
            {feedback.explanation && (
              <p className="mt-1 text-slate-700">{feedback.explanation}</p>
            )}
            {feedback.progress?.status && (
              <p className="mt-2 text-xs text-slate-600">
                Your status for this chapter:{" "}
                <strong>
                  {feedback.progress.status === "completed"
                    ? "Completed"
                    : feedback.progress.status === "in_progress"
                      ? "In progress"
                      : "Not started"}
                </strong>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            disabled={idx === 0}
            onClick={prev}
            className="btn-outline disabled:opacity-50"
          >
            ← Previous
          </button>
          {feedback &&
            (idx < total - 1 ? (
              <button onClick={next} className="btn-primary">
                Next →
              </button>
            ) : (
              <button onClick={reset} className="btn-outline">
                Try again
              </button>
            ))}
        </div>
        {!canTrack && (
          <p className="text-xs text-slate-500">
            Sign in as a student in this class to save your progress.
          </p>
        )}
        {allDone && (
          <p className="text-sm font-semibold text-emerald-700">
            Done! You got {stats.correct} of {total} right.
          </p>
        )}
      </div>
    </div>
  );
}
