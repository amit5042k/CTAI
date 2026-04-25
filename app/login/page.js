"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [stage, setStage] = useState("password"); // password | totp
  const [form, setForm] = useState({ email: "", password: "" });
  const [code, setCode] = useState("");
  const [challenge, setChallenge] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function destFor(role) {
    return role === "superadmin"
      ? "/superadmin"
      : role === "admin"
        ? "/admin"
        : role === "teacher"
          ? "/dashboard/teacher"
          : "/dashboard/student";
  }

  async function submitPassword(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      if (data.needs2FA) {
        setChallenge(data.challenge);
        setStage("totp");
      } else {
        router.replace(destFor(data.user.role));
        router.refresh();
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitCode(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");
      router.replace(destFor(data.user.role));
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card">
        <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
        <p className="mt-1 text-sm text-slate-600">
          {stage === "password"
            ? "Use the school account given to you by your administrator."
            : "Enter the 6-digit code from your authenticator app."}
        </p>
        {stage === "password" && (
          <form onSubmit={submitPassword} className="mt-6 space-y-4">
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
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
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
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        )}
        {stage === "totp" && (
          <form onSubmit={submitCode} className="mt-6 space-y-4">
            <div>
              <label className="label">Authenticator code</label>
              <input
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                autoFocus
                className="input tracking-widest text-center text-lg"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
              />
            </div>
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
            <button
              disabled={loading || code.length !== 6}
              type="submit"
              className="btn-primary w-full"
            >
              {loading ? "Verifying..." : "Verify code"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStage("password");
                setCode("");
                setChallenge(null);
                setError("");
              }}
              className="text-sm text-slate-500 hover:underline"
            >
              ← Use a different account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
