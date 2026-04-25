import { listSections, listUsers } from "@/lib/db";
import { curriculum } from "@/data/curriculum";
import SectionsManager from "@/components/admin/SectionsManager";

export default function AdminSectionsPage() {
  const sections = listSections();
  const teachers = listUsers({ role: "teacher" });
  const classes = curriculum.map((c) => ({
    classLevel: c.classLevel,
    title: c.title,
  }));
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Classes & sections
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Create sections (e.g. Class 5 - A, Class 5 - B) and assign a class
          teacher to each.
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
