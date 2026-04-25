import Link from "next/link";
import { listSchools, listUsers } from "@/lib/db";

export default function SuperadminOverview() {
  const schools = listSchools();
  const users = listUsers();
  const admins = users.filter((u) => u.role === "admin");
  const teachers = users.filter((u) => u.role === "teacher");
  const students = users.filter((u) => u.role === "student");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Superadmin overview
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Manage all schools using the portal. Each school has its own admin
          who manages teachers and students for that school only.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-4">
        <Stat label="Schools" value={schools.length} />
        <Stat label="Admins" value={admins.length} />
        <Stat label="Teachers" value={teachers.length} />
        <Stat label="Students" value={students.length} />
      </section>

      <section className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Schools</h2>
          <div className="flex gap-2">
            <Link href="/superadmin/schools" className="btn-outline">
              Manage schools
            </Link>
            <Link href="/superadmin/admins" className="btn-primary">
              Manage admins
            </Link>
          </div>
        </div>
        {schools.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            No schools yet. Create your first school under{" "}
            <Link
              href="/superadmin/schools"
              className="font-medium text-brand-700 hover:underline"
            >
              Schools
            </Link>
            .
          </p>
        ) : (
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Code</th>
                <th className="py-2 pr-4">Admins</th>
                <th className="py-2 pr-4">Teachers</th>
                <th className="py-2">Students</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((s) => {
                const u = users.filter((x) => x.schoolId === s.id);
                return (
                  <tr key={s.id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 font-medium">{s.name}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.code}</td>
                    <td className="py-2 pr-4">
                      {u.filter((x) => x.role === "admin").length}
                    </td>
                    <td className="py-2 pr-4">
                      {u.filter((x) => x.role === "teacher").length}
                    </td>
                    <td className="py-2">
                      {u.filter((x) => x.role === "student").length}
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

function Stat({ label, value }) {
  return (
    <div className="card">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
