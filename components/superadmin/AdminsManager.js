"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const blank = (schools) => ({
  name: "",
  email: "",
  password: "",
  schoolId: schools[0]?.id || "",
});

export default function AdminsManager({ initialAdmins, schools }) {
  const router = useRouter();
  const [admins, setAdmins] = useState(initialAdmins);
  const [form, setForm] = useState(blank(schools));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const schoolById = useMemo(
    () => Object.fromEntries(schools.map((s) => [s.id, s])),
    [schools],
  );

  async function create(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/superadmin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create admin");
      setAdmins([...admins, data.user]);
      setForm(blank(schools));
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function patch(id, body) {
    const res = await fetch(`/api/superadmin/admins/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Update failed");
      return;
    }
    const { user } = await res.json();
    setAdmins(admins.map((a) => (a.id === id ? user : a)));
    router.refresh();
  }

  async function remove(id) {
    if (!confirm("Delete this admin?")) return;
    const res = await fetch(`/api/superadmin/admins/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) return;
    setAdmins(admins.filter((a) => a.id !== id));
    router.refresh();
  }

  if (schools.length === 0) {
    return (
      <div className="card">
        <p className="text-sm text-slate-600">
          Create a school first, then come back here to assign an admin.
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={create} className="card">
        <h2 className="font-semibold">Create a school admin</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="label">School</label>
            <select
              className="input"
              value={form.schoolId}
              onChange={(e) =>
                setForm({ ...form, schoolId: e.target.value })
              }
            >
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
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
            <label className="label">Temporary password (8+)</label>
            <input
              required
              minLength={8}
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>
        {error && (
          <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-4">
          <button disabled={saving} className="btn-primary">
            {saving ? "Creating..." : "Create admin"}
          </button>
        </div>
      </form>

      <section className="card">
        <h2 className="font-semibold">All admins</h2>
        {admins.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            No admins yet — add one above.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">School</th>
                  <th className="py-2 pr-4">Reset password</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <AdminRow
                    key={a.id}
                    admin={a}
                    schools={schools}
                    schoolName={schoolById[a.schoolId]?.name || "—"}
                    onChangeSchool={(sid) => patch(a.id, { schoolId: sid })}
                    onResetPassword={(pwd) => patch(a.id, { password: pwd })}
                    onDelete={() => remove(a.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

function AdminRow({
  admin,
  schools,
  schoolName,
  onChangeSchool,
  onResetPassword,
  onDelete,
}) {
  const [pwd, setPwd] = useState("");
  return (
    <tr className="border-b border-slate-100 align-top">
      <td className="py-2 pr-4 font-medium">{admin.name}</td>
      <td className="py-2 pr-4 text-slate-600">{admin.email}</td>
      <td className="py-2 pr-4">
        <select
          className="input"
          value={admin.schoolId || ""}
          onChange={(e) => onChangeSchool(e.target.value)}
        >
          {schools.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </td>
      <td className="py-2 pr-4">
        <div className="flex gap-2">
          <input
            className="input"
            placeholder="new password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button
            disabled={pwd.length < 8}
            onClick={() => {
              onResetPassword(pwd);
              setPwd("");
            }}
            className="btn-outline disabled:opacity-50"
          >
            Reset
          </button>
        </div>
      </td>
      <td className="py-2 text-right">
        <button
          onClick={onDelete}
          className="text-sm text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
