"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SchoolLoginForm({ schoolCode }) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, schoolCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      const dest =
        data.user.role === "admin"
          ? "/admin"
          : data.user.role === "teacher"
            ? "/dashboard/teacher"
            : "/dashboard/student";
      router.replace(dest);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Sign in</h2>
      <p className="text-sm text-slate-600">
        Use the school account given to you by your administrator.
      </p>
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
        <label className="label">Password</label>
        <input
          type="password"
          required
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
      <button disabled={loading} type="submit" className="btn-primary w-full">
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
