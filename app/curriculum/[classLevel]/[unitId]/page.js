import Link from "next/link";
import { notFound } from "next/navigation";
import { getClass } from "@/data/curriculum";
import { findUnit, publicUnit } from "@/lib/curriculumServer";
import { getCurrentUser } from "@/lib/auth";
import { getProgressForUser, setProgress } from "@/lib/db";
import Practice from "@/components/Practice";
import StatusToggle from "@/components/StatusToggle";

export default async function UnitDetailPage({ params }) {
  const cls = getClass(params.classLevel);
  if (!cls) return notFound();
  const idx = cls.units.findIndex((u) => u.id === params.unitId);
  if (idx === -1) return notFound();
  const unit = cls.units[idx];
  const safeUnit = publicUnit(unit);

  const user = await getCurrentUser();
  const progress = user ? getProgressForUser(user.id) : [];
  const status =
    progress.find((p) => p.unitId === unit.id)?.status || "not_started";

  const canTrack =
    user?.role === "student" && user.classLevel === cls.classLevel;

  const prevUnit = cls.units[idx - 1];
  const nextUnit = cls.units[idx + 1];
  const hasPractice = (unit.exercises || []).length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href={`/curriculum/${cls.classLevel}`}
          className="text-sm text-brand-700 hover:underline"
        >
          ← Class {cls.classLevel} units
        </Link>
        <span className="tag">
          {unit.stream === "AI" ? "Artificial Intelligence" : "Computational Thinking"}
        </span>
      </div>

      <header className="card">
        <p className="text-sm text-slate-500">Class {cls.classLevel}</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">{unit.name}</h1>
        {unit.intro && (
          <p className="mt-3 text-slate-700">{unit.intro}</p>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Learning outcomes
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {unit.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Activities
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {unit.activities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        {canTrack && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <StatusToggle unitId={unit.id} initialStatus={status} />
          </div>
        )}
      </header>

      {(unit.examples || []).length > 0 ? (
        <section className="card">
          <h2 className="text-lg font-semibold">Worked examples</h2>
          <p className="mt-1 text-sm text-slate-500">
            Read through these first, then try the practice below.
          </p>
          <ol className="mt-4 space-y-4">
            {unit.examples.map((ex, i) => (
              <li
                key={ex.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                  Example {i + 1}
                  {ex.title ? ` — ${ex.title}` : ""}
                </p>
                <p className="mt-2 font-medium text-slate-900">{ex.problem}</p>
                <p className="mt-2 text-sm text-slate-700">
                  <span className="font-semibold">Solution: </span>
                  {ex.solution}
                </p>
                {ex.takeaway && (
                  <p className="mt-2 text-xs text-slate-500">{ex.takeaway}</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      ) : (
        <section className="card">
          <h2 className="text-lg font-semibold">Worked examples</h2>
          <p className="mt-1 text-sm text-slate-600">
            Examples for this chapter are coming soon.
          </p>
        </section>
      )}

      {hasPractice ? (
        <Practice
          unitId={unit.id}
          exercises={safeUnit.exercises}
          canTrack={canTrack}
        />
      ) : (
        <section className="card">
          <h2 className="text-lg font-semibold">Self-do practice</h2>
          <p className="mt-1 text-sm text-slate-600">
            Practice exercises with instant marking are coming soon for this chapter.
          </p>
        </section>
      )}

      <nav className="flex justify-between">
        {prevUnit ? (
          <Link
            href={`/curriculum/${cls.classLevel}/${prevUnit.id}`}
            className="btn-outline"
          >
            ← {prevUnit.name}
          </Link>
        ) : (
          <span />
        )}
        {nextUnit ? (
          <Link
            href={`/curriculum/${cls.classLevel}/${nextUnit.id}`}
            className="btn-outline"
          >
            {nextUnit.name} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
