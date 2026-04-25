import ChangePasswordForm from "@/components/ChangePasswordForm";

export default function AdminSecurityPage() {
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
