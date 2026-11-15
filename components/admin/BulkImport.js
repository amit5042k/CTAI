"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TEMPLATE =
  "name,email,class,section,password\n" +
  "Aarav Sharma,aarav@example.com,6,A,\n" +
  "Diya Patel,,6,B,Diya@2026\n" +
  "Kabir Singh,,7,A,\n";

// Accepted header names for each column (lower-case, spaces removed).
const HEADERS = {
  name: ["name", "fullname", "studentname", "student"],
  email: ["email", "emailaddress", "e-mail", "mail", "username", "login"],
  class: ["class", "grade", "std", "standard", "classlevel"],
  section: ["section", "sec", "division", "div"],
  password: ["password", "pass", "pwd", "temporarypassword"],
};

// Minimal RFC-4180 CSV parser: quoted fields, "" escapes, CRLF/LF, BOM.
// Also accepts semicolon-separated files (some spreadsheet locales).
function parseCsv(text) {
  text = text.replace(/^﻿/, "");
  const firstLine = text.split(/\r?\n/, 1)[0] || "";
  const delim = (firstLine.match(/;/g) || []).length > (firstLine.match(/,/g) || []).length ? ";" : ",";
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === delim) { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function toRecords(text) {
  const table = parseCsv(text);
  if (!table.length) throw new Error("The file is empty.");
  const head = table[0].map((h) => h.trim().toLowerCase().replace(/[\s_]+/g, ""));
  const col = {};
  for (const [key, names] of Object.entries(HEADERS)) {
    const idx = head.findIndex((h) => names.includes(h));
    if (idx >= 0) col[key] = idx;
  }
  const missing = ["name", "class"].filter((k) => col[k] === undefined);
  if (missing.length)
    throw new Error(`The first row must contain column headings. Missing: ${missing.join(", ")}. Download the template to see the layout.`);
  const records = [];
  table.slice(1).forEach((cells, i) => {
    if (cells.every((c) => !String(c).trim())) return; // blank line
    const rec = { row: i + 2 };
    for (const k of Object.keys(HEADERS)) rec[k] = col[k] !== undefined ? (cells[col[k]] ?? "").trim() : "";
    records.push(rec);
  });
  if (!records.length) throw new Error("No students found below the heading row.");
  return records;
}

function csvCell(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function download(name, text) {
  const url = URL.createObjectURL(new Blob(["﻿" + text], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function BulkImport({ schoolCode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [records, setRecords] = useState(null);
  const [preview, setPreview] = useState(null);
  const [createSections, setCreateSections] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(null);
  const [done, setDone] = useState(null);

  function reset() {
    setFileName(""); setRecords(null); setPreview(null); setError(""); setProgress(null); setDone(null);
  }

  async function check(recs, create = createSections) {
    setBusy(true); setError(""); setPreview(null);
    try {
      const res = await fetch("/api/admin/users/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: recs, dryRun: true, createSections: create }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not check the file");
      setPreview(data.results);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function onFile(e) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    reset();
    setFileName(f.name);
    if (!/\.(csv|txt)$/i.test(f.name)) {
      setError("Please choose a .csv file. In Excel or Google Sheets use File → Save as / Download → CSV.");
      return;
    }
    try {
      const recs = toRecords(await f.text());
      setRecords(recs);
      await check(recs);
    } catch (err) {
      setError(err.message);
    }
  }

  async function runImport() {
    const good = new Set(preview.filter((r) => !r.errors.length).map((r) => r.row));
    const todo = records.filter((r) => good.has(r.row));
    const batch = 50;
    const all = [];
    setBusy(true); setError(""); setProgress({ done: 0, total: todo.length });
    try {
      for (let i = 0; i < todo.length; i += batch) {
        const res = await fetch("/api/admin/users/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rows: todo.slice(i, i + batch), dryRun: false, createSections }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Import stopped");
        all.push(...data.results);
        setProgress({ done: Math.min(i + batch, todo.length), total: todo.length });
      }
    } catch (e) {
      setError(`${e.message}. ${all.filter((r) => r.created).length} students were added before it stopped; check the file and import the rest.`);
    } finally {
      setBusy(false);
      setDone(all);
      router.refresh();
    }
  }

  function downloadCredentials() {
    const created = done.filter((r) => r.created);
    const lines = ["name,class,section,sign-in email,password"];
    for (const r of created) lines.push([r.name, r.classLevel, r.section || "", r.email, r.password].map(csvCell).join(","));
    download(`student-sign-ins${schoolCode ? `-${schoolCode}` : ""}.csv`, lines.join("\n") + "\n");
  }

  const ok = preview?.filter((r) => !r.errors.length) || [];
  const bad = preview?.filter((r) => r.errors.length) || [];
  const newSections = [...new Set(ok.filter((r) => r.newSection).map((r) => `${r.classLevel}-${r.section}`))];
  const created = done?.filter((r) => r.created) || [];
  const failed = done?.filter((r) => !r.created) || [];

  return (
    <section className="card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold">Import students from a spreadsheet (CSV)</h2>
          <p className="mt-0.5 text-sm text-slate-500">Add a whole class or school at once.</p>
        </div>
        <button className="btn-outline" onClick={() => { setOpen((o) => !o); if (open) reset(); }}>
          {open ? "Close" : "Import CSV"}
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-4">
          <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
            <li>
              Make a sheet with the columns <b>name</b>, <b>email</b>, <b>class</b>, <b>section</b>, <b>password</b>.{" "}
              <button type="button" className="text-brand-700 underline" onClick={() => download("student-import-template.csv", TEMPLATE)}>
                Download the template
              </button>
            </li>
            <li>
              Only <b>name</b> and <b>class</b> are required. Leave <b>email</b> empty and a sign-in name like{" "}
              <span className="font-mono text-xs">diya.patel@{(schoolCode || "school").toLowerCase()}.ctai</span> is made. Leave{" "}
              <b>password</b> empty and one is generated.
            </li>
            <li>Save as <b>CSV</b> (Excel: File → Save As → CSV UTF-8; Google Sheets: File → Download → CSV) and choose it below.</li>
          </ol>

          <div className="flex flex-wrap items-center gap-4">
            <label className="btn-primary cursor-pointer">
              Choose CSV file
              <input type="file" accept=".csv,text/csv,.txt" className="hidden" onChange={onFile} disabled={busy} />
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={createSections}
                disabled={busy || !!done}
                onChange={(e) => { setCreateSections(e.target.checked); if (records) check(records, e.target.checked); }}
              />
              Create missing sections automatically
            </label>
            {fileName && <span className="text-sm text-slate-500">{fileName}</span>}
          </div>

          {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {busy && !progress && <p className="text-sm text-slate-500">Checking the file…</p>}

          {preview && !done && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800">{ok.length} ready to import</span>
                {bad.length > 0 && <span className="rounded-full bg-red-100 px-3 py-1 font-medium text-red-800">{bad.length} with problems (will be skipped)</span>}
                {newSections.length > 0 && <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-800">New sections: {newSections.join(", ")}</span>}
              </div>

              {bad.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-sm">
                    <thead><tr className="border-b border-slate-200 text-left text-slate-500"><th className="py-1.5 pr-3">Row</th><th className="py-1.5 pr-3">Name</th><th className="py-1.5">Problem</th></tr></thead>
                    <tbody>
                      {bad.map((r) => (
                        <tr key={r.row} className="border-b border-slate-100 align-top">
                          <td className="py-1.5 pr-3 text-slate-500">{r.row}</td>
                          <td className="py-1.5 pr-3">{r.name || <i className="text-slate-400">blank</i>}</td>
                          <td className="py-1.5 text-red-700">{r.errors.join("; ")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-1 text-xs text-slate-500">Fix these rows in your sheet and choose the file again, or import the others now and add these later.</p>
                </div>
              )}

              {ok.length > 0 && (
                <details className="text-sm">
                  <summary className="cursor-pointer text-slate-600">Preview the {ok.length} students to be added</summary>
                  <div className="mt-2 max-h-64 overflow-auto">
                    <table className="w-full min-w-[560px] text-sm">
                      <thead><tr className="border-b border-slate-200 text-left text-slate-500"><th className="py-1.5 pr-3">Name</th><th className="py-1.5 pr-3">Class</th><th className="py-1.5 pr-3">Sign-in email</th><th className="py-1.5">Password</th></tr></thead>
                      <tbody>
                        {ok.map((r) => (
                          <tr key={r.row} className="border-b border-slate-100">
                            <td className="py-1.5 pr-3">{r.name}</td>
                            <td className="py-1.5 pr-3">{r.classLevel}{r.section ? `-${r.section}` : " (no section)"}</td>
                            <td className="py-1.5 pr-3 font-mono text-xs">{r.email}{r.emailGenerated ? " *" : ""}</td>
                            <td className="py-1.5 text-slate-500">{r.passwordGenerated ? "generated" : "from file"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">* sign-in name made automatically. Students without a section can sign in but see chapters only after they are put in a section.</p>
                </details>
              )}

              <button className="btn-primary" disabled={busy || ok.length === 0} onClick={runImport}>
                {progress ? `Importing… ${progress.done} / ${progress.total}` : `Import ${ok.length} student${ok.length === 1 ? "" : "s"}`}
              </button>
            </div>
          )}

          {done && (
            <div className="space-y-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <p className="font-medium text-emerald-900">
                {created.length} student{created.length === 1 ? "" : "s"} added.
                {failed.length > 0 && ` ${failed.length} could not be added: ${failed.map((r) => `row ${r.row} (${r.errors.join("; ")})`).join(", ")}.`}
              </p>
              {created.length > 0 && (
                <>
                  <button className="btn-primary" onClick={downloadCredentials}>Download sign-in details (CSV)</button>
                  <p className="text-sm text-emerald-900">
                    This file holds every new student&apos;s sign-in email and password. Download it now: passwords are
                    stored scrambled and cannot be shown again. Share each student&apos;s details privately, then delete the file.
                  </p>
                </>
              )}
              <button className="btn-outline" onClick={reset}>Import another file</button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
