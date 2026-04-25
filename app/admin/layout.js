import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") {
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
        </nav>
      </aside>
      <div>{children}</div>
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
