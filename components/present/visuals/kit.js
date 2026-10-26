"use client";

// Shared drawing helpers for the presentation visuals. Every visual is
// drawn inside the 1600×900 slide stage, so sizes here are stage pixels.

export const C = {
  ink: "#0f172a",
  muted: "#64748b",
  line: "#cbd5e1",
  faint: "#f1f5f9",
  blue: "#1f47e0",
  blueSoft: "#e0e8ff",
  green: "#059669",
  greenSoft: "#d1fae5",
  red: "#dc2626",
  redSoft: "#fee2e2",
  orange: "#ea580c",
  orangeSoft: "#ffedd5",
  yellow: "#f59e0b",
  yellowSoft: "#fef3c7",
  purple: "#7c3aed",
  purpleSoft: "#ede9fe",
  teal: "#0d9488",
  tealSoft: "#ccfbf1",
  pink: "#db2777",
  pinkSoft: "#fce7f3",
};

export const PAL = [C.blue, C.orange, C.green, C.purple, C.pink, C.teal, C.yellow, C.red];
export const SOFT = [C.blueSoft, C.orangeSoft, C.greenSoft, C.purpleSoft, C.pinkSoft, C.tealSoft, C.yellowSoft, C.redSoft];

// Layout: drawing area that fills the space, an optional big readout line
// and a row of touch-sized controls (shown only in interactive mode).
export function Panel({ children, readout, controls }) {
  return (
    <div style={{ flex: 1, minWidth: 0, minHeight: 0, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ flex: 1, minHeight: 120, position: "relative" }}>{children}</div>
      {readout != null && readout !== "" && (
        <div style={{ textAlign: "center", fontSize: 34, fontWeight: 700, color: C.ink, lineHeight: 1.25 }}>{readout}</div>
      )}
      {controls && (
        <div data-noswipe style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>{controls}</div>
      )}
    </div>
  );
}

export function Svg({ w, h, children }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible",
        fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif" }}>
      {children}
    </svg>
  );
}

export function Btn({ children, onClick, active, disabled, wide }) {
  return (
    <button data-noswipe onClick={onClick} disabled={disabled}
      style={{ height: 66, minWidth: wide ? 180 : 66, padding: "0 24px", fontSize: 28, fontWeight: 700,
        borderRadius: 14, cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.4 : 1,
        border: `3px solid ${active ? C.blue : C.line}`, background: active ? C.blue : "#fff",
        color: active ? "#fff" : C.ink }}>
      {children}
    </button>
  );
}

export function Txt({ x, y, s = 28, w = 600, fill = C.ink, a = "middle", children, ...rest }) {
  return (
    <text x={x} y={y} fontSize={s} fontWeight={w} fill={fill} textAnchor={a}
      dominantBaseline="central" {...rest}>
      {children}
    </text>
  );
}

// Straight arrow with a solid head; shortened by `pad` at both ends.
export function Arrow({ x1, y1, x2, y2, color = C.muted, width = 5, pad = 0, head = 18 }) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len;
  const sx = x1 + ux * pad, sy = y1 + uy * pad;
  const ex = x2 - ux * pad, ey = y2 - uy * pad;
  const bx = ex - ux * head, by = ey - uy * head;
  const px = -uy * head * 0.55, py = ux * head * 0.55;
  return (
    <g>
      <line x1={sx} y1={sy} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${ex},${ey} ${bx + px},${by + py} ${bx - px},${by - py}`} fill={color} />
    </g>
  );
}

export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
export const polar = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)];

export function regularPolygon(cx, cy, r, n, rot = -90) {
  return Array.from({ length: n }, (_, k) => {
    const a = ((rot + (360 / n) * k) * Math.PI) / 180;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

// Indian (2,2,3) or international (3,3) digit grouping for an integer string.
export function group(intStr, system = "indian") {
  const s = String(intStr).replace(/^0+(?=\d)/, "");
  if (system === "international") return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (s.length <= 3) return s;
  const head = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${head},${s.slice(-3)}`;
}
