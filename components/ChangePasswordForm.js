"use client";

import { useState } from "react";

export default function ChangePasswordForm({ minLength = 8 }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setOk(false);
    if (form.newPassword !== form.confirm) {
      setError("New password and confirmation don't match");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not change password");
      setOk(true);
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="card max-w-md">
      <h2 className="text-lg font-semibold">Change password</h2>
      <p className="mt-1 text-sm text-slate-600">
        Pick a new password (at least {minLength} characters).
      </p>
      <div className="mt-4 space-y-3">
        <div>
          <label className="label">Current password</label>
          <input
            type="password"
            required
            className="input"
            value={form.currentPassword}
            onChange={(e) =>
              setForm({ ...form, currentPassword: e.target.value })
            }
          />
        </div>
        <div>
          <label className="label">New password</label>
          <input
            type="password"
            required
            minLength={minLength}
            className="input"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Confirm new password</label>
          <input
            type="password"
            required
            minLength={minLength}
            className="input"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          />
        </div>
      </div>
      {error && (
        <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      {ok && (
        <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Password changed.
        </p>
      )}
      <div className="mt-4">
        <button disabled={saving} className="btn-primary">
          {saving ? "Updating..." : "Update password"}
        </button>
      </div>
    </form>
  );
}
