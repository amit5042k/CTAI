"use client";

import { useState } from "react";

const STATUS_LABEL = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
};

const STATUS_STYLE = {
  not_started: "bg-slate-100 text-slate-700",
  in_progress: "bg-amber-100 text-amber-800",
  completed: "bg-emerald-100 text-emerald-800",
};

export default function UnitCard({ unit, index, initialStatus, canTrack }) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);

  async function update(next) {
    if (!canTrack) return;
    setSaving(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitId: unit.id, status: next }),
      });
      if (res.ok) setStatus(next);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="card flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">
          Unit {index}: {unit.name}
        </h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[status]}`}
        >
          {STATUS_LABEL[status]}
        </span>
      </div>

      <div className="mt-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Learning outcomes
        </h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {unit.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Activities
        </h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {unit.activities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      {canTrack && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
          {["not_started", "in_progress", "completed"].map((s) => (
            <button
              key={s}
              disabled={saving || status === s}
              onClick={() => update(s)}
              className={`btn text-xs ${
                status === s
                  ? "bg-brand-600 text-white"
                  : "border border-slate-300 bg-white"
              }`}
            >
              {STATUS_LABEL[s]}
            </button>
          ))}
        </div>
      )}
    </article>
  );
}
