"use client";

import { useState } from "react";

const STATUS_LABEL = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed",
};

export default function StatusToggle({ unitId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);

  async function update(next) {
    setSaving(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitId, status: next }),
      });
      if (res.ok) setStatus(next);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-slate-700">Mark as:</span>
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
  );
}
