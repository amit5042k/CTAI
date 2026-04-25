import Link from "next/link";
import { notFound } from "next/navigation";
import { getClass, curriculum } from "@/data/curriculum";
import { getCurrentUser } from "@/lib/auth";
import { getProgressForUser } from "@/lib/db";
import UnitCard from "@/components/UnitCard";

export function generateStaticParams() {
  return curriculum.map((c) => ({ classLevel: String(c.classLevel) }));
}

export default async function ClassPage({ params }) {
  const cls = getClass(params.classLevel);
  if (!cls) return notFound();

  const user = await getCurrentUser();
  const progress = user ? getProgressForUser(user.id) : [];
  const progressMap = Object.fromEntries(
    progress.map((p) => [p.unitId, p.status]),
  );

  return (
    <div className="space-y-8">
      <header className="card">
        <Link
          href="/curriculum"
          className="text-sm text-brand-700 hover:underline"
        >
          ← All classes
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          {cls.title}
        </h1>
        <p className="mt-2 text-slate-600">{cls.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {cls.pillars.map((p) => (
            <span key={p} className="tag">
              {p}
            </span>
          ))}
        </div>
      </header>

      {!user && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <Link href="/login" className="font-medium underline">
            Sign in
          </Link>{" "}
          with your school account to track progress.
        </div>
      )}
      {user?.role === "student" && user.classLevel !== cls.classLevel && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          You are enrolled in Class {user.classLevel}. You can browse this
          class but progress can only be tracked in your own class.
        </div>
      )}

      {(() => {
        const ctUnits = cls.units.filter((u) => u.stream !== "AI");
        const aiUnits = cls.units.filter((u) => u.stream === "AI");
        const groups = [];
        if (ctUnits.length)
          groups.push({
            title:
              aiUnits.length > 0 ? "Part 1 — Computational Thinking" : "Units",
            units: ctUnits,
            offset: 0,
          });
        if (aiUnits.length)
          groups.push({
            title: "Part 2 — Artificial Intelligence",
            units: aiUnits,
            offset: 0,
          });
        const canTrack =
          user?.role === "student" && user.classLevel === cls.classLevel;
        return groups.map((g) => (
          <section key={g.title} className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">{g.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {g.units.map((u, i) => (
                <UnitCard
                  key={u.id}
                  unit={u}
                  index={i + 1}
                  initialStatus={progressMap[u.id] || "not_started"}
                  canTrack={canTrack}
                />
              ))}
            </div>
          </section>
        ));
      })()}
    </div>
  );
}
