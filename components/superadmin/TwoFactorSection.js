"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TwoFactorSection({ twoFactorEnabled }) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(!!twoFactorEnabled);
  const [setup, setSetup] = useState(null); // { secret, otpauthUri }
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // for disabling
  const [pwd, setPwd] = useState("");
  const [disableCode, setDisableCode] = useState("");

  async function startSetup() {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/2fa/setup", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not start setup");
      setSetup(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function enable(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/2fa/enable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not enable 2FA");
      setEnabled(true);
      setSetup(null);
      setCode("");
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function disable(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/2fa/disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd, code: disableCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not disable 2FA");
      setEnabled(false);
      setPwd("");
      setDisableCode("");
      router.refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (enabled) {
    return (
      <form onSubmit={disable} className="card max-w-md">
        <h2 className="text-lg font-semibold">Two-factor authentication</h2>
        <p className="mt-1 text-sm text-emerald-700">
          ✓ 2FA is currently enabled on this account.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          To turn it off, enter your password and a current 6-digit code from
          your authenticator app.
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              required
              className="input"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Authenticator code</label>
            <input
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              className="input tracking-widest text-center text-lg"
              value={disableCode}
              onChange={(e) =>
                setDisableCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
            />
          </div>
        </div>
        {error && (
          <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          disabled={busy || disableCode.length !== 6}
          className="btn-outline mt-4"
        >
          {busy ? "Working..." : "Disable 2FA"}
        </button>
      </form>
    );
  }

  return (
    <div className="card max-w-2xl">
      <h2 className="text-lg font-semibold">Two-factor authentication</h2>
      <p className="mt-1 text-sm text-slate-600">
        Add a second step at sign-in using Google Authenticator, Authy or any
        other TOTP app.
      </p>
      {!setup ? (
        <div className="mt-4">
          {error && (
            <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          <button onClick={startSetup} disabled={busy} className="btn-primary">
            {busy ? "Generating..." : "Set up 2FA"}
          </button>
        </div>
      ) : (
        <form onSubmit={enable} className="mt-4 space-y-4">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li>Open your authenticator app and add a new account.</li>
            <li>
              Scan this QR code, or use the 'enter a key' option and paste the
              secret below:
            </li>
          </ol>
          <div className="grid gap-4 md:grid-cols-[180px_1fr]">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                setup.otpauthUri,
              )}`}
              alt="QR code for authenticator app"
              className="h-44 w-44 rounded-md bg-white ring-1 ring-slate-200"
            />
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-slate-500">Account name</p>
                <p className="font-mono">CTAI Portal</p>
              </div>
              <div>
                <p className="text-slate-500">Secret (Base32)</p>
                <p className="break-all rounded bg-slate-100 px-2 py-1 font-mono">
                  {setup.secret}
                </p>
              </div>
              <div>
                <p className="text-slate-500">otpauth:// URI</p>
                <p className="break-all rounded bg-slate-100 px-2 py-1 font-mono text-xs">
                  {setup.otpauthUri}
                </p>
              </div>
            </div>
          </div>
          <div>
            <label className="label">Enter the 6-digit code shown in your app</label>
            <input
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
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
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy || code.length !== 6}
              className="btn-primary"
            >
              {busy ? "Verifying..." : "Enable 2FA"}
            </button>
            <button
              type="button"
              onClick={() => {
                setSetup(null);
                setCode("");
                setError("");
              }}
              className="btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
