import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function SuperadminLayout({ children }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== "superadmin") {
    if (user.role === "admin") redirect("/admin");
    if (user.role === "teacher") redirect("/dashboard/teacher");
    redirect("/dashboard/student");
  }
  return (
    <div className="grid gap-8 md:grid-cols-[220px_1fr]">
      <aside className="card h-fit md:sticky md:top-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Superadmin
        </p>
        <nav className="mt-3 flex flex-col gap-1 text-sm">
          <SLink href="/superadmin">Overview</SLink>
          <SLink href="/superadmin/schools">Schools</SLink>
          <SLink href="/superadmin/admins">School admins</SLink>
          <SLink href="/superadmin/security">Security</SLink>
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}

function SLink({ href, children }) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100"
    >
      {children}
    </Link>
  );
}
