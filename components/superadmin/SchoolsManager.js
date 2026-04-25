"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SchoolsManager({ initialSchools }) {
  const router = useRouter();
  const [schools, setSchools] = useState(initialSchools);
  const [form, setForm] = useState({ name: "", code: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function add(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/superadmin/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create school");
      setSchools([
        ...schools,
        { ...data.school, adminCount: 0, teacherCount: 0, studentCount: 0 },
      ]);
      setForm({ name: "", code: "" });
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function patch(id, body) {
    const res = await fetch(`/api/superadmin/schools/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Update failed");
      return;
    }
    const { school } = await res.json();
    setSchools(schools.map((s) => (s.id === id ? { ...s, ...school } : s)));
    router.refresh();
  }

  async function remove(id) {
    if (
      !confirm(
        "Delete this school? All of its admins, teachers, students, sections and progress will be removed.",
      )
    )
      return;
    const res = await fetch(`/api/superadmin/schools/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) return;
    setSchools(schools.filter((s) => s.id !== id));
    router.refresh();
  }

  return (
    <>
      <form onSubmit={add} className="card">
        <h2 className="font-semibold">Create a new school</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div>
            <label className="label">School name</label>
            <input
              required
              className="input"
              placeholder="e.g. Sunrise Public School"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Code</label>
            <input
              required
              className="input"
              placeholder="e.g. SPS-DEL"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />
          </div>
          <div className="flex items-end">
            <button disabled={saving} className="btn-primary w-full">
              {saving ? "Adding..." : "Add school"}
            </button>
          </div>
        </div>
        {error && (
          <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
      </form>

      <section className="card">
        <h2 className="font-semibold">All schools</h2>
        {schools.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            No schools yet — add one above.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Code</th>
                  <th className="py-2 pr-4">Admins</th>
                  <th className="py-2 pr-4">Teachers</th>
                  <th className="py-2 pr-4">Students</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {schools.map((s) => (
                  <SchoolRow
                    key={s.id}
                    school={s}
                    onSave={(body) => patch(s.id, body)}
                    onDelete={() => remove(s.id)}
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

function SchoolRow({ school, onSave, onDelete }) {
  const [name, setName] = useState(school.name);
  const [code, setCode] = useState(school.code);
  const dirty = name !== school.name || code !== school.code;
  return (
    <tr className="border-b border-slate-100 align-top">
      <td className="py-2 pr-4">
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td className="py-2 pr-4">
        <input
          className="input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </td>
      <td className="py-2 pr-4">{school.adminCount}</td>
      <td className="py-2 pr-4">{school.teacherCount}</td>
      <td className="py-2 pr-4">{school.studentCount}</td>
      <td className="py-2 text-right">
        <div className="flex justify-end gap-2">
          <button
            disabled={!dirty}
            onClick={() => onSave({ name, code })}
            className="btn-outline disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={onDelete}
            className="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
