"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const blank = (classes) => ({
  name: "",
  email: "",
  password: "",
  role: "student",
  classLevel: classes[0]?.classLevel ?? 3,
  sectionId: "",
});

export default function UsersManager({
  initialTeachers,
  initialStudents,
  sections,
  classes,
}) {
  const router = useRouter();
  const [teachers, setTeachers] = useState(initialTeachers);
  const [students, setStudents] = useState(initialStudents);
  const [form, setForm] = useState(blank(classes));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const sectionById = useMemo(
    () => Object.fromEntries(sections.map((s) => [s.id, s])),
    [sections],
  );

  const sectionsForClass = (cl) =>
    sections.filter((s) => s.classLevel === Number(cl));

  async function enroll(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        ...(form.role === "student"
          ? {
              classLevel: Number(form.classLevel),
              sectionId: form.sectionId || null,
            }
          : {}),
      };
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Enrolment failed");
      if (data.user.role === "teacher")
        setTeachers([...teachers, data.user]);
      else setStudents([...students, data.user]);
      setForm(blank(classes));
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function patch(id, body, role) {
    const res = await fetch(`/api/admin/users/${id}`, {
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
    if (role === "teacher")
      setTeachers(teachers.map((t) => (t.id === id ? user : t)));
    else setStudents(students.map((s) => (s.id === id ? user : s)));
    router.refresh();
  }

  async function remove(id, role) {
    if (!confirm("Delete this user? Their progress will also be removed."))
      return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    if (role === "teacher") setTeachers(teachers.filter((t) => t.id !== id));
    else setStudents(students.filter((s) => s.id !== id));
    router.refresh();
  }

  return (
    <>
      <form onSubmit={enroll} className="card">
        <h2 className="font-semibold">Enrol a new user</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="label">Role</label>
            <select
              className="input"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value, sectionId: "" })
              }
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
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
            <label className="label">Temporary password</label>
            <input
              required
              minLength={6}
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          {form.role === "student" && (
            <>
              <div>
                <label className="label">Class</label>
                <select
                  className="input"
                  value={form.classLevel}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      classLevel: Number(e.target.value),
                      sectionId: "",
                    })
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
                <label className="label">Section</label>
                <select
                  className="input"
                  value={form.sectionId}
                  onChange={(e) =>
                    setForm({ ...form, sectionId: e.target.value })
                  }
                >
                  <option value="">— unassigned —</option>
                  {sectionsForClass(form.classLevel).map((s) => (
                    <option key={s.id} value={s.id}>
                      Class {s.classLevel} - {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
        {error && (
          <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="mt-4">
          <button disabled={saving} className="btn-primary">
            {saving ? "Enrolling..." : "Enrol user"}
          </button>
        </div>
      </form>

      <section className="card">
        <h2 className="font-semibold">Teachers</h2>
        {teachers.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            No teachers enrolled yet.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Reset password</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t) => (
                  <UserRow
                    key={t.id}
                    user={t}
                    onResetPassword={(pwd) =>
                      patch(t.id, { password: pwd }, "teacher")
                    }
                    onDelete={() => remove(t.id, "teacher")}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card">
        <h2 className="font-semibold">Students</h2>
        {students.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            No students enrolled yet.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Class</th>
                  <th className="py-2 pr-4">Section</th>
                  <th className="py-2 pr-4">Reset password</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <StudentRow
                    key={s.id}
                    student={s}
                    sections={sections}
                    classes={classes}
                    onChangeClass={(cl) =>
                      patch(s.id, { classLevel: cl, sectionId: null }, "student")
                    }
                    onChangeSection={(secId) =>
                      patch(s.id, { sectionId: secId || null }, "student")
                    }
                    onResetPassword={(pwd) =>
                      patch(s.id, { password: pwd }, "student")
                    }
                    onDelete={() => remove(s.id, "student")}
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

function UserRow({ user, onResetPassword, onDelete }) {
  const [pwd, setPwd] = useState("");
  return (
    <tr className="border-b border-slate-100">
      <td className="py-2 pr-4 font-medium">{user.name}</td>
      <td className="py-2 pr-4 text-slate-600">{user.email}</td>
      <td className="py-2 pr-4">
        <div className="flex gap-2">
          <input
            className="input"
            placeholder="new password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button
            disabled={pwd.length < 6}
            onClick={() => {
              onResetPassword(pwd);
              setPwd("");
            }}
            className="btn-outline"
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

function StudentRow({
  student,
  sections,
  classes,
  onChangeClass,
  onChangeSection,
  onResetPassword,
  onDelete,
}) {
  const [pwd, setPwd] = useState("");
  const matching = sections.filter((s) => s.classLevel === student.classLevel);
  return (
    <tr className="border-b border-slate-100">
      <td className="py-2 pr-4 font-medium">{student.name}</td>
      <td className="py-2 pr-4 text-slate-600">{student.email}</td>
      <td className="py-2 pr-4">
        <select
          className="input"
          value={student.classLevel ?? ""}
          onChange={(e) => onChangeClass(Number(e.target.value))}
        >
          {classes.map((c) => (
            <option key={c.classLevel} value={c.classLevel}>
              Class {c.classLevel}
            </option>
          ))}
        </select>
      </td>
      <td className="py-2 pr-4">
        <select
          className="input"
          value={student.sectionId || ""}
          onChange={(e) => onChangeSection(e.target.value)}
        >
          <option value="">— unassigned —</option>
          {matching.map((s) => (
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
            disabled={pwd.length < 6}
            onClick={() => {
              onResetPassword(pwd);
              setPwd("");
            }}
            className="btn-outline"
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
