import Link from "next/link";
import { listUsers, listSections, findSchoolById } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { curriculum } from "@/data/curriculum";

export default async function AdminOverview() {
  const user = await getCurrentUser();
  const schoolId = user?.schoolId;
  const school = schoolId ? findSchoolById(schoolId) : null;

  const filter = schoolId ? { schoolId } : {};
  const students = listUsers({ ...filter, role: "student" });
  const teachers = listUsers({ ...filter, role: "teacher" });
  const sections = listSections(filter);

  const byClass = curriculum.map((c) => ({
    classLevel: c.classLevel,
    title: c.title,
    sections: sections.filter((s) => s.classLevel === c.classLevel),
    students: students.filter((s) => s.classLevel === c.classLevel).length,
  }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Admin overview</h1>
        <p className="mt-1 text-sm text-slate-600">
          {school
            ? `Managing ${school.name} (code: ${school.code}).`
            : "No school is linked to this admin account."}{" "}
          Set up classes/sections, then enrol teachers and students.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat label="Teachers" value={teachers.length} />
        <Stat label="Students" value={students.length} />
        <Stat label="Sections" value={sections.length} />
      </section>

      <section className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Classes</h2>
          <div className="flex gap-2">
            <Link href="/admin/sections" className="btn-outline">
              Manage sections
            </Link>
            <Link href="/admin/users" className="btn-primary">
              Enrol users
            </Link>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2 pr-4">Class</th>
                <th className="py-2 pr-4">Sections</th>
                <th className="py-2 pr-4">Students</th>
                <th className="py-2">Curriculum</th>
              </tr>
            </thead>
            <tbody>
              {byClass.map((c) => (
                <tr key={c.classLevel} className="border-b border-slate-100">
                  <td className="py-2 pr-4 font-medium">Class {c.classLevel}</td>
                  <td className="py-2 pr-4">
                    {c.sections.length === 0 ? (
                      <span className="text-slate-400">— none —</span>
                    ) : (
                      c.sections.map((s) => s.name).join(", ")
                    )}
                  </td>
                  <td className="py-2 pr-4">{c.students}</td>
                  <td className="py-2">
                    <Link
                      href={`/curriculum/${c.classLevel}`}
                      className="text-brand-700 hover:underline"
                    >
                      View units →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
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
