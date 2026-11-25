import { listUsers, listSections, findSchoolById } from "@/lib/db";
import { requirePageRole } from "@/lib/pageGuard";
import { curriculum } from "@/data/curriculum";
import UsersManager from "@/components/admin/UsersManager";
import BulkImport from "@/components/admin/BulkImport";

export default async function AdminUsersPage() {
  const user = await requirePageRole("admin");
  const schoolId = user?.schoolId;
  // The admin layout shows a notice for admins without a school; never
  // query here with an empty (all-schools) filter.
  if (!schoolId) return null;
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
      {school && <BulkImport schoolCode={school.code} />}
      <UsersManager
        // Remount when the lists change (e.g. after a CSV import), since the
        // manager keeps its own copy of the lists in state.
        key={`${teachers.length}-${students.length}-${sections.length}`}
        initialTeachers={teachers}
        initialStudents={students}
        sections={sections}
        classes={classes}
      />
    </div>
  );
}
