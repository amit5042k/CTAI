import { listSections, listUsers, findSchoolById } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { curriculum } from "@/data/curriculum";
import SectionsManager from "@/components/admin/SectionsManager";

export default async function AdminSectionsPage() {
  const user = await getCurrentUser();
  const schoolId = user?.schoolId;
  const school = schoolId ? findSchoolById(schoolId) : null;

  const filter = schoolId ? { schoolId } : {};
  const sections = listSections(filter);
  const teachers = listUsers({ ...filter, role: "teacher" });
  const classes = curriculum.map((c) => ({
    classLevel: c.classLevel,
    title: c.title,
  }));
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Classes &amp; sections
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          {school ? `${school.name} · ` : ""}Create sections (e.g. Class 5 - A,
          Class 5 - B) and assign a class teacher to each.
        </p>
      </header>
      <SectionsManager
        initialSections={sections}
        teachers={teachers}
        classes={classes}
      />
    </div>
  );
}
