import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") {
    if (user.role === "superadmin") redirect("/superadmin");
    redirect(user.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student");
  }
  return (
    <div className="grid gap-8 md:grid-cols-[220px_1fr]">
      <aside className="card h-fit md:sticky md:top-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Admin
        </p>
        <nav className="mt-3 flex flex-col gap-1 text-sm">
          <AdminLink href="/admin">Overview</AdminLink>
          <AdminLink href="/admin/sections">Classes & sections</AdminLink>
          <AdminLink href="/admin/users">Teachers & students</AdminLink>
          <AdminLink href="/admin/security">Security</AdminLink>
        </nav>
      </aside>
      <div>
        {user.schoolId ? (
          children
        ) : (
          // Without a school every admin page would list all schools' data.
          <div className="card border-amber-200 bg-amber-50 text-amber-900">
            <h1 className="text-lg font-semibold">No school linked</h1>
            <p className="mt-1 text-sm">
              This admin account is not linked to a school yet. Ask the portal
              owner (superadmin) to assign it to your school.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminLink({ href, children }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
    >
      {children}
    </Link>
  );
}
