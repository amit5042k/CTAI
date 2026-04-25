import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  listUsers,
  getAllProgress,
  listSections,
  findSchoolById,
  listUnlocks,
} from "@/lib/db";
import { curriculum } from "@/data/curriculum";
import UnlockRow from "@/components/UnlockRow";

export default async function TeacherDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "teacher") {
    if (user.role === "superadmin") redirect("/superadmin");
    if (user.role === "admin") redirect("/admin");
    redirect("/dashboard/student");
  }

  const schoolId = user.schoolId;
  const school = schoolId ? findSchoolById(schoolId) : null;
  const filter = schoolId ? { schoolId } : {};
  const allSections = listSections(filter);

  // A teacher only sees sections where they are class teacher OR
  // listed in section.teacherIds. Other school sections are hidden.
  const mySections = allSections.filter(
    (s) =>
      s.classTeacherId === user.id ||
      (Array.isArray(s.teacherIds) && s.teacherIds.includes(user.id)),
  );
  const mySectionIds = new Set(mySections.map((s) => s.id));
  const myClassLevels = new Set(mySections.map((s) => s.classLevel));

  // Students restricted to teacher's sections.
  const allStudents = listUsers({ ...filter, role: "student" });
  const students = allStudents.filter((s) => mySectionIds.has(s.sectionId));

  const allProgress = getAllProgress();
  const studentIds = new Set(students.map((s) => s.id));
  const progress = allProgress.filter((p) => studentIds.has(p.userId));
  const sectionById = Object.fromEntries(allSections.map((s) => [s.id, s]));

  const byClass = curriculum
    .filter((cls) => myClassLevels.has(cls.classLevel))
    .map((cls) => {
      const classStudents = students.filter(
        (s) => s.classLevel === cls.classLevel,
      );
      const totalUnits = cls.units.length;
      const sectionsForClass = mySections
        .filter((s) => s.classLevel === cls.classLevel)
        .sort((a, b) => a.name.localeCompare(b.name));
      return {
        classLevel: cls.classLevel,
        title: cls.title,
        units: cls.units,
        totalUnits,
        sections: sectionsForClass,
        students: classStudents.map((s) => {
          const items = progress.filter((p) => p.userId === s.id);
          const completed = items.filter(
            (p) => p.status === "completed",
          ).length;
          const inProgress = items.filter(
            (p) => p.status === "in_progress",
          ).length;
          return {
            ...s,
            completed,
            inProgress,
            totalUnits,
            pct: totalUnits ? Math.round((completed / totalUnits) * 100) : 0,
          };
        }),
      };
    });

  const totalStudents = students.length;
  const completedAll = progress.filter((p) => p.status === "completed").length;
  const allUnlocks = listUnlocks();
  const unlockedBySection = mySections.reduce((acc, s) => {
    acc[s.id] = new Set(
      allUnlocks.filter((u) => u.sectionId === s.id).map((u) => u.unitId),
    );
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <header className="card">
        <h1 className="text-2xl font-bold text-slate-900">Teacher dashboard</h1>
        <p className="mt-1 text-slate-600">
          Hello, {user.name}.{" "}
          {school && (
            <span className="text-slate-500">
              You teach at <strong>{school.name}</strong>.
            </span>
          )}
        </p>
        {mySections.length > 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            Your sections:{" "}
            {mySections
              .map((s) => `Class ${s.classLevel}-${s.name}`)
              .join(", ")}
          </p>
        ) : (
          <p className="mt-2 text-sm text-amber-700">
            You are not yet assigned to any section. Ask your school admin to
            add you as a class teacher or to a section.
          </p>
        )}
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat label="Your students" value={totalStudents} />
        <Stat label="Units completed" value={completedAll} />
        <Stat label="Classes" value={byClass.length} />
      </section>

      {byClass.map((c) => (
        <section key={c.classLevel} className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Class {c.classLevel} —{" "}
              <span className="font-normal text-slate-600">{c.title}</span>
            </h2>
            <Link
              href={`/curriculum/${c.classLevel}`}
              className="text-sm text-brand-700 hover:underline"
            >
              View units →
            </Link>
          </div>

          {c.sections.length > 0 && (
            <p className="mt-1 text-xs text-slate-500">
              Sections you teach:{" "}
              {c.sections.map((s) => s.name).join(", ")}
            </p>
          )}

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {c.sections.map((sec) => {
              const unlocked = unlockedBySection[sec.id] || new Set();
              return (
                <div
                  key={sec.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="text-sm font-semibold text-slate-700">
                    Class {sec.classLevel}-{sec.name} · chapter unlocks
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Tick a chapter to make it visible to students in this
                    section.
                  </p>
                  <ul className="mt-3 max-h-56 space-y-1 overflow-y-auto pr-1 text-sm">
                    {c.units.map((u) => (
                      <UnlockRow
                        key={u.id}
                        sectionId={sec.id}
                        unit={u}
                        initiallyUnlocked={unlocked.has(u.id)}
                      />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {c.students.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              No students in your sections yet.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="py-2 pr-4">Student</th>
                    <th className="py-2 pr-4">Section</th>
                    <th className="py-2 pr-4">In progress</th>
                    <th className="py-2 pr-4">Completed</th>
                    <th className="py-2">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {c.students.map((s) => {
                    const sec = s.sectionId ? sectionById[s.sectionId] : null;
                    return (
                      <tr
                        key={s.id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="py-2 pr-4 font-medium">
                          <Link
                            href={`/dashboard/teacher/student/${s.id}`}
                            className="text-brand-700 hover:underline"
                          >
                            {s.name}
                          </Link>
                        </td>
                        <td className="py-2 pr-4">
                          {sec ? (
                            <span className="tag">
                              Class {sec.classLevel}-{sec.name}
                            </span>
                          ) : (
                            <span className="text-slate-400">unassigned</span>
                          )}
                        </td>
                        <td className="py-2 pr-4">{s.inProgress}</td>
                        <td className="py-2 pr-4">
                          {s.completed} / {s.totalUnits}
                        </td>
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full bg-brand-600"
                                style={{ width: `${s.pct}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-500">
                              {s.pct}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="card">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
