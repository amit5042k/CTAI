import { notFound, redirect } from "next/navigation";
import { findSchoolByCode } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import SchoolLoginForm from "@/components/SchoolLoginForm";

const RESERVED = new Set([
  "login",
  "register",
  "admin",
  "superadmin",
  "dashboard",
  "curriculum",
  "api",
]);

export default async function SchoolLoginPage({ params }) {
  const code = decodeURIComponent(params.schoolCode || "");
  if (!code || RESERVED.has(code.toLowerCase())) return notFound();
  const school = findSchoolByCode(code);
  if (!school) return notFound();

  const user = await getCurrentUser();
  if (user) {
    if (user.role === "superadmin") redirect("/superadmin");
    if (user.schoolId === school.id) {
      if (user.role === "admin") redirect("/admin");
      if (user.role === "teacher") redirect("/dashboard/teacher");
      if (user.role === "student") redirect("/dashboard/student");
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card">
        <div className="flex flex-col items-center gap-3 border-b border-slate-100 pb-5">
          {school.logoExt ? (
            <img
              src={`/api/schools/${school.id}/logo`}
              alt={`${school.name} logo`}
              className="h-20 w-20 rounded-xl bg-white object-contain ring-1 ring-slate-200"
            />
          ) : (
            <div className="grid h-20 w-20 place-items-center rounded-xl bg-brand-600 text-3xl font-bold text-white">
              {school.name?.[0]?.toUpperCase() || "S"}
            </div>
          )}
          <div className="text-center">
            <h1 className="text-xl font-bold text-slate-900">{school.name}</h1>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {school.code}
            </p>
          </div>
        </div>
        <div className="pt-5">
          <SchoolLoginForm schoolCode={school.code} />
        </div>
      </div>
    </div>
  );
}
