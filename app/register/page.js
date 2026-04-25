"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BootstrapAdminPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminExists, setAdminExists] = useState(null);

  useEffect(() => {
    fetch("/api/auth/register")
      .then((r) => r.json())
      .then((d) => setAdminExists(!!d.adminExists))
      .catch(() => setAdminExists(false));
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bootstrap failed");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (adminExists === null) {
    return (
      <div className="mx-auto max-w-md card">
        <p className="text-sm text-slate-600">Loading…</p>
      </div>
    );
  }

  if (adminExists) {
    return (
      <div className="mx-auto max-w-md card">
        <h1 className="text-2xl font-bold text-slate-900">Sign-up disabled</h1>
        <p className="mt-2 text-sm text-slate-600">
          This portal is enrolment-only. An administrator already exists; ask
          them to add your account.
        </p>
        <Link href="/login" className="btn-primary mt-4 inline-flex">
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card">
        <span className="tag">First-time setup</span>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Create the administrator account
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          This page works only once — for setting up the first admin who will
          then enrol teachers and students.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label">Full name</label>
            <input
              required
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              required
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Password (min 8 chars)</label>
            <input
              type="password"
              required
              minLength={8}
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <button
            disabled={loading}
            type="submit"
            className="btn-primary w-full"
          >
            {loading ? "Creating..." : "Create admin & continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
