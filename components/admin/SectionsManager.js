"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function SectionsManager({
  initialSections,
  teachers,
  classes,
}) {
  const router = useRouter();
  const [sections, setSections] = useState(initialSections);
  const [form, setForm] = useState({
    classLevel: classes[0]?.classLevel ?? 3,
    name: "",
    classTeacherId: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const teachersById = useMemo(
    () => Object.fromEntries(teachers.map((t) => [t.id, t])),
    [teachers],
  );

  async function addSection(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classLevel: form.classLevel,
          name: form.name,
          classTeacherId: form.classTeacherId || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create section");
      setSections([...sections, data.section]);
      setForm({ ...form, name: "", classTeacherId: "" });
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function updateClassTeacher(id, classTeacherId) {
    const res = await fetch(`/api/admin/sections/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classTeacherId: classTeacherId || null }),
    });
    if (!res.ok) return;
    const { section } = await res.json();
    setSections(sections.map((s) => (s.id === id ? section : s)));
    router.refresh();
  }

  async function remove(id) {
    if (!confirm("Delete this section? Students will be unassigned.")) return;
    const res = await fetch(`/api/admin/sections/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    setSections(sections.filter((s) => s.id !== id));
    router.refresh();
  }

  const grouped = classes.map((c) => ({
    ...c,
    items: sections
      .filter((s) => s.classLevel === c.classLevel)
      .sort((a, b) => a.name.localeCompare(b.name)),
  }));

  return (
    <>
      <form onSubmit={addSection} className="card">
        <h2 className="font-semibold">Create section</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <div>
            <label className="label">Class</label>
            <select
              className="input"
              value={form.classLevel}
              onChange={(e) =>
                setForm({ ...form, classLevel: Number(e.target.value) })
              }
            >
              {classes.map((c) => (
                <option key={c.classLevel} value={c.classLevel}>
                  Class {c.classLevel}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Section name</label>
            <input
              required
              placeholder="A"
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Class teacher</label>
            <select
              className="input"
              value={form.classTeacherId}
              onChange={(e) =>
                setForm({ ...form, classTeacherId: e.target.value })
              }
            >
              <option value="">— none —</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.email})
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button disabled={saving} className="btn-primary w-full">
              {saving ? "Saving..." : "Add section"}
            </button>
          </div>
        </div>
        {error && (
          <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
      </form>

      <div className="space-y-4">
        {grouped.map((g) => (
          <section key={g.classLevel} className="card">
            <h3 className="font-semibold">Class {g.classLevel}</h3>
            {g.items.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">No sections yet.</p>
            ) : (
              <table className="mt-3 w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="py-2 pr-4">Section</th>
                    <th className="py-2 pr-4">Class teacher</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {g.items.map((s) => (
                    <tr key={s.id} className="border-b border-slate-100">
                      <td className="py-2 pr-4 font-medium">
                        Class {s.classLevel} - {s.name}
                      </td>
                      <td className="py-2 pr-4">
                        <select
                          className="input"
                          value={s.classTeacherId || ""}
                          onChange={(e) =>
                            updateClassTeacher(s.id, e.target.value)
                          }
                        >
                          <option value="">— none —</option>
                          {teachers.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2 text-right">
                        <button
                          onClick={() => remove(s.id)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
