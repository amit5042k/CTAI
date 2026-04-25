import Link from "next/link";
import { listClasses } from "@/data/curriculum";

export const metadata = { title: "Curriculum · CTAI Portal" };

export default function CurriculumIndex() {
  const classes = listClasses();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">CTAI Curriculum</h1>
        <p className="mt-2 text-slate-600">
          Pick a class to view its units, learning outcomes and activities.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <Link
            key={c.classLevel}
            href={`/curriculum/${c.classLevel}`}
            className="card transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="text-sm font-semibold text-brand-600">
              Class {c.classLevel}
            </span>
            <h2 className="mt-2 text-lg font-semibold">{c.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
