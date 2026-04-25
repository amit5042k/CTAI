import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  getProgressForUser,
  findSectionById,
  findSchoolById,
} from "@/lib/db";
import { getClass } from "@/data/curriculum";

export default async function StudentDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "student") {
    if (user.role === "superadmin") redirect("/superadmin");
    if (user.role === "admin") redirect("/admin");
    redirect("/dashboard/teacher");
  }

  const cls = getClass(user.classLevel);
  const section = user.sectionId ? findSectionById(user.sectionId) : null;
  const school = user.schoolId ? findSchoolById(user.schoolId) : null;
  const progress = getProgressForUser(user.id);
  const progressMap = Object.fromEntries(
    progress.map((p) => [p.unitId, p.status]),
  );
  const totalUnits = cls?.units.length ?? 0;
  const completed = cls
    ? cls.units.filter((u) => progressMap[u.id] === "completed").length
    : 0;
  const inProgress = cls
    ? cls.units.filter((u) => progressMap[u.id] === "in_progress").length
    : 0;
  const pct = totalUnits ? Math.round((completed / totalUnits) * 100) : 0;

  return (
    <div className="space-y-8">
      <header className="card">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome, {user.name} 👋
        </h1>
        <p className="mt-1 text-slate-600">
          Class {user.classLevel}
          {section ? ` - ${section.name}` : ""} · {cls?.title}
        </p>
        {school && (
          <p className="mt-1 text-xs text-slate-500">{school.name}</p>
        )}
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat label="Units in this class" value={totalUnits} />
        <Stat label="In progress" value={inProgress} />
        <Stat label="Completed" value={completed} suffix={` / ${totalUnits}`} />
      </section>

      <section className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your progress</h2>
          <span className="text-sm text-slate-600">{pct}%</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-brand-600 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <Link
          href={`/curriculum/${user.classLevel}`}
          className="btn-primary mt-4 inline-flex"
        >
          Continue learning
        </Link>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Units</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {cls?.units.map((u, i) => {
            const status = progressMap[u.id] || "not_started";
            return (
              <Link
                key={u.id}
                href={`/curriculum/${user.classLevel}#${u.id}`}
                className="card hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-700">
                    Unit {i + 1}
                  </span>
                  <span className="text-xs text-slate-500">
                    {status.replace("_", " ")}
                  </span>
                </div>
                <h3 className="mt-1 font-semibold">{u.name}</h3>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, suffix = "" }) {
  return (
    <div className="card">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
        <span className="text-base font-medium text-slate-500">{suffix}</span>
      </p>
    </div>
  );
}
