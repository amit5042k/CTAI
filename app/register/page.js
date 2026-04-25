"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    classLevel: 3,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      if (!res.ok) throw new Error(data.error || "Registration failed");
      const dest =
        data.user.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";
      router.replace(dest);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card">
        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
        <p className="mt-1 text-sm text-slate-600">
          Join as a student or as a teacher.
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
            <label className="label">Password (min 6 chars)</label>
            <input
              type="password"
              required
              minLength={6}
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div>
            <label className="label">I am a…</label>
            <div className="grid grid-cols-2 gap-2">
              {["student", "teacher"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setForm({ ...form, role: r })}
                  className={`btn ${
                    form.role === r
                      ? "bg-brand-600 text-white"
                      : "border border-slate-300 bg-white"
                  }`}
                >
                  {r === "student" ? "Student" : "Teacher"}
                </button>
              ))}
            </div>
          </div>
          {form.role === "student" && (
            <div>
              <label className="label">Class</label>
              <select
                className="input"
                value={form.classLevel}
                onChange={(e) =>
                  setForm({ ...form, classLevel: Number(e.target.value) })
                }
              >
                {[3, 4, 5, 6, 7, 8].map((c) => (
                  <option key={c} value={c}>
                    Class {c}
                  </option>
                ))}
              </select>
            </div>
          )}
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
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already a member?{" "}
          <Link href="/login" className="font-medium text-brand-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
