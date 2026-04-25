import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { findUserById, getProgressForUser, findSectionById } from "@/lib/db";
import { getClass } from "@/data/curriculum";

export default async function TeacherStudentDetail({ params }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "teacher") {
    redirect(user.role === "admin" ? "/admin" : "/dashboard/student");
  }

  const student = findUserById(params.id);
  if (!student || student.role !== "student") return notFound();

  // A teacher can only view a student in one of their assigned sections.
  const studentSection = student.sectionId
    ? findSectionById(student.sectionId)
    : null;
  const teaches =
    studentSection &&
    (studentSection.classTeacherId === user.id ||
      (Array.isArray(studentSection.teacherIds) &&
        studentSection.teacherIds.includes(user.id)));
  if (!teaches) return notFound();

  const cls = getClass(student.classLevel);
  const section = student.sectionId ? findSectionById(student.sectionId) : null;
  const progress = getProgressForUser(student.id);
  const map = Object.fromEntries(progress.map((p) => [p.unitId, p]));

  const completed = progress.filter((p) => p.status === "completed").length;
  const inProgress = progress.filter((p) => p.status === "in_progress").length;
  const totalUnits = cls?.units.length ?? 0;
  const pct = totalUnits ? Math.round((completed / totalUnits) * 100) : 0;

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/teacher"
        className="text-sm text-brand-700 hover:underline"
      >
        ← All students
      </Link>

      <header className="card">
        <h1 className="text-2xl font-bold text-slate-900">{student.name}</h1>
        <p className="mt-1 text-sm text-slate-600">
          {student.email}
          {" · "}Class {student.classLevel}
          {section ? ` - ${section.name}` : ""}
        </p>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall progress</span>
            <span className="text-sm text-slate-600">
              {completed} / {totalUnits} ({pct}%)
            </span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full bg-brand-600"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {inProgress} unit(s) currently in progress.
          </p>
        </div>
      </header>

      <section className="card">
        <h2 className="font-semibold">Unit-by-unit status</h2>
        {!cls ? (
          <p className="mt-2 text-sm text-slate-500">
            This student has no class assigned.
          </p>
        ) : (
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">Unit</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Updated</th>
              </tr>
            </thead>
            <tbody>
              {cls.units.map((u, i) => {
                const p = map[u.id];
                const status = p?.status || "not_started";
                return (
                  <tr key={u.id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 text-slate-500">{i + 1}</td>
                    <td className="py-2 pr-4 font-medium">{u.name}</td>
                    <td className="py-2 pr-4">
                      <StatusBadge status={status} />
                    </td>
                    <td className="py-2 text-slate-500">
                      {p ? new Date(p.updatedAt).toLocaleString() : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    not_started: ["bg-slate-100 text-slate-700", "Not started"],
    in_progress: ["bg-amber-100 text-amber-800", "In progress"],
    completed: ["bg-emerald-100 text-emerald-800", "Completed"],
  };
  const [cls, label] = map[status];
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}
    >
      {label}
    </span>
  );
}
