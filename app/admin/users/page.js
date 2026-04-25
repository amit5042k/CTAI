import { listUsers, listSections } from "@/lib/db";
import { curriculum } from "@/data/curriculum";
import UsersManager from "@/components/admin/UsersManager";

export default function AdminUsersPage() {
  const teachers = listUsers({ role: "teacher" });
  const students = listUsers({ role: "student" });
  const sections = listSections();
  const classes = curriculum.map((c) => ({ classLevel: c.classLevel }));
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Teachers & students
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Enrol new accounts and assign students to a class & section.
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
