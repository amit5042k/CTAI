import ChangePasswordForm from "@/components/ChangePasswordForm";
import { requirePageRole } from "@/lib/pageGuard";
import TwoFactorSection from "@/components/superadmin/TwoFactorSection";
import { findUserById } from "@/lib/db";

export default async function SuperadminSecurityPage() {
  const me = await requirePageRole("superadmin");
  const full = me ? findUserById(me.id) : null;
  const twoFactorEnabled = !!full?.twoFactorEnabled;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Security</h1>
        <p className="mt-1 text-sm text-slate-600">
          Change your password and manage two-factor authentication.
        </p>
      </header>
      <ChangePasswordForm minLength={8} />
      <TwoFactorSection twoFactorEnabled={twoFactorEnabled} />
    </div>
  );
}
