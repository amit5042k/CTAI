import { listSchools, listUsers } from "@/lib/db";
import AdminsManager from "@/components/superadmin/AdminsManager";

export default function SuperadminAdminsPage() {
  const schools = listSchools();
  const admins = listUsers({ role: "admin" });
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">School admins</h1>
        <p className="mt-1 text-sm text-slate-600">
          Each school needs at least one admin. The admin then enrols
          teachers and students for that school only.
        </p>
      </header>
      <AdminsManager initialAdmins={admins} schools={schools} />
    </div>
  );
}
