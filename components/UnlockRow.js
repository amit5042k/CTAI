"use client";

import { useState } from "react";

export default function UnlockRow({ sectionId, unit, initiallyUnlocked }) {
  const [unlocked, setUnlocked] = useState(!!initiallyUnlocked);
  const [busy, setBusy] = useState(false);

  async function toggle(next) {
    setBusy(true);
    try {
      const res = await fetch("/api/teacher/unlocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionId, unitId: unit.id, unlocked: next }),
      });
      if (res.ok) setUnlocked(next);
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className="flex items-center justify-between gap-2 rounded-md bg-white px-2 py-1">
      <span className="truncate text-slate-700">{unit.name}</span>
      <label className="flex shrink-0 items-center gap-1 text-xs text-slate-500">
        <input
          type="checkbox"
          checked={unlocked}
          disabled={busy}
          onChange={(e) => toggle(e.target.checked)}
        />
        {unlocked ? "Unlocked" : "Locked"}
      </label>
    </li>
  );
}
