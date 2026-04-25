import Link from "next/link";
import { listClasses } from "@/data/curriculum";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();
  const classes = listClasses();
  return (
    <div className="space-y-12">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="tag">CBSE Academic · 2026-27</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Coding, Computational Thinking & AI for Class 3 – 8
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            A guided curriculum portal for the new CBSE CTAI subject. Students
            learn step-by-step with hands-on activities; teachers track
            progress and assign units.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/curriculum" className="btn-primary">
              Browse curriculum
            </Link>
            {user ? (
              <Link
                href={
                  user.role === "admin"
                    ? "/admin"
                    : user.role === "teacher"
                      ? "/dashboard/teacher"
                      : "/dashboard/student"
                }
                className="btn-outline"
              >
                Go to my dashboard
              </Link>
            ) : (
              <Link href="/login" className="btn-outline">
                Sign in
              </Link>
            )}
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-800">
            What's inside
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• 6 grade levels — Class 3 through Class 8</li>
            <li>• Computational thinking, block coding, Python</li>
            <li>• AI literacy, ethics, and project work</li>
            <li>• Separate student & teacher logins</li>
            <li>• Track unit progress as you learn</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900">
          Classes at a glance
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((c) => (
            <Link
              key={c.classLevel}
              href={`/curriculum/${c.classLevel}`}
              className="card transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-brand-600">
                  Class {c.classLevel}
                </span>
                <span className="tag">{c.pillars.length} pillars</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{c.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.pillars.map((p) => (
                  <span
                    key={p}
                    className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
