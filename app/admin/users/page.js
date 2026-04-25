import { listUsers, listSections, findSchoolById } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { curriculum } from "@/data/curriculum";
import UsersManager from "@/components/admin/UsersManager";

export default async function AdminUsersPage() {
  const user = await getCurrentUser();
  const schoolId = user?.schoolId;
  const school = schoolId ? findSchoolById(schoolId) : null;

  const filter = schoolId ? { schoolId } : {};
  const teachers = listUsers({ ...filter, role: "teacher" });
  const students = listUsers({ ...filter, role: "student" });
  const sections = listSections(filter);
  const classes = curriculum.map((c) => ({ classLevel: c.classLevel }));
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Teachers &amp; students
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          {school ? `${school.name} · ` : ""}Enrol new accounts and assign
          students to a class &amp; section.
        </p>
      </header>
      <UsersManager
        initialTeachers={teachers}
        initialStudents={students}
        sections={sections}
        classes={classes}
      />
    </div>
  );
}
