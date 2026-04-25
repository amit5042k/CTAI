import { listSchools, listUsers } from "@/lib/db";
import SchoolsManager from "@/components/superadmin/SchoolsManager";

export default function SuperadminSchoolsPage() {
  const schools = listSchools();
  const users = listUsers();
  const decorated = schools.map((s) => {
    const u = users.filter((x) => x.schoolId === s.id);
    return {
      ...s,
      adminCount: u.filter((x) => x.role === "admin").length,
      teacherCount: u.filter((x) => x.role === "teacher").length,
      studentCount: u.filter((x) => x.role === "student").length,
    };
  });
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Schools</h1>
        <p className="mt-1 text-sm text-slate-600">
          Add new schools, change names or codes, and remove schools.
          Deleting a school removes all of its admins, teachers, students,
          sections and progress.
        </p>
      </header>
      <SchoolsManager initialSchools={decorated} />
    </div>
  );
}
