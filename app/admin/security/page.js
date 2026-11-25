import ChangePasswordForm from "@/components/ChangePasswordForm";
import { requirePageRole } from "@/lib/pageGuard";

export default async function AdminSecurityPage() {
  await requirePageRole("admin");
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Security</h1>
        <p className="mt-1 text-sm text-slate-600">
          Change your administrator password.
        </p>
      </header>
      <ChangePasswordForm minLength={8} />
    </div>
  );
}
