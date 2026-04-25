import Link from "next/link";

const STATUS_LABEL = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
};

const STATUS_STYLE = {
  not_started: "bg-slate-100 text-slate-700",
  in_progress: "bg-amber-100 text-amber-800",
  completed: "bg-emerald-100 text-emerald-800",
};

export default function UnitCard({
  unit,
  index,
  initialStatus,
  canTrack,
  classLevel,
}) {
  const hasPractice = (unit.exerciseCount || 0) > 0;
  const locked = !!unit.locked;

  return (
    <article className={`card flex flex-col ${locked ? "opacity-70" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">
          Unit {index}: {unit.name}{" "}
          {locked && (
            <span className="ml-1 text-base" title="Locked by teacher">
              🔒
            </span>
          )}
        </h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[initialStatus] || STATUS_STYLE.not_started}`}
        >
          {STATUS_LABEL[initialStatus] || STATUS_LABEL.not_started}
        </span>
      </div>

      <div className="mt-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Learning outcomes
        </h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {unit.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        {locked ? (
          <span className="rounded-md border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs text-amber-900">
            🔒 Waiting for teacher to unlock
          </span>
        ) : (
          <Link
            href={`/curriculum/${classLevel}/${unit.id}`}
            className="btn-primary"
          >
            {hasPractice ? "Open chapter & practice" : "Open chapter"}
          </Link>
        )}
        {hasPractice && !locked && (
          <span className="text-xs text-slate-500">
            {unit.exerciseCount} graded question
            {unit.exerciseCount === 1 ? "" : "s"}
          </span>
        )}
      </div>
    </article>
  );
}
