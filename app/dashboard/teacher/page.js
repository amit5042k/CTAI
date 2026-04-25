import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { listUsers, getAllProgress, listSections } from "@/lib/db";
import { curriculum } from "@/data/curriculum";

export default async function TeacherDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "teacher") {
    redirect(user.role === "admin" ? "/admin" : "/dashboard/student");
  }

  const students = listUsers({ role: "student" });
  const progress = getAllProgress();
  const sections = listSections();
  const sectionById = Object.fromEntries(sections.map((s) => [s.id, s]));
  const mySectionIds = new Set(
    sections.filter((s) => s.classTeacherId === user.id).map((s) => s.id),
  );

  const byClass = curriculum.map((cls) => {
    const classStudents = students.filter(
      (s) => s.classLevel === cls.classLevel,
    );
    const totalUnits = cls.units.length;
    const sectionsForClass = sections
      .filter((s) => s.classLevel === cls.classLevel)
      .sort((a, b) => a.name.localeCompare(b.name));
    return {
      classLevel: cls.classLevel,
      title: cls.title,
      totalUnits,
      sections: sectionsForClass,
      students: classStudents.map((s) => {
        const items = progress.filter((p) => p.userId === s.id);
        const completed = items.filter((p) => p.status === "completed").length;
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

  return (
    <div className="space-y-8">
      <header className="card">
        <h1 className="text-2xl font-bold text-slate-900">Teacher dashboard</h1>
        <p className="mt-1 text-slate-600">
          Hello, {user.name}. Here's how your students are progressing.
        </p>
        {mySectionIds.size > 0 && (
          <p className="mt-2 text-sm text-slate-500">
            You are class teacher of:{" "}
            {[...mySectionIds]
              .map((id) => {
                const s = sectionById[id];
                return s ? `Class ${s.classLevel}-${s.name}` : "";
              })
              .filter(Boolean)
              .join(", ")}
          </p>
        )}
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat label="Students enrolled" value={totalStudents} />
        <Stat label="Units completed (all)" value={completedAll} />
        <Stat label="Classes covered" value={curriculum.length} />
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
              Sections: {c.sections.map((s) => s.name).join(", ")}
            </p>
          )}

          {c.students.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              No students enrolled in this class yet.
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
