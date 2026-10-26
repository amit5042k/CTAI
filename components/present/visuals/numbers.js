"use client";

import { useState } from "react";
import { C, PAL, SOFT, Panel, Svg, Btn, Txt, Arrow, clamp, group } from "./kit";

// ---------------------------------------------------------------- blocks
// Base-ten blocks: hundreds flats, tens rods, ones cubes (0–999).
export function Blocks({ value = 134, interactive }) {
  const [v, setV] = useState(clamp(value, 0, 999));
  const h = Math.floor(v / 100), t = Math.floor((v % 100) / 10), o = v % 10;
  const add = (d) => setV((x) => clamp(x + d, 0, 999));
  const flats = Array.from({ length: h }, (_, k) => {
    const x = 20 + (k % 5) * 100, y = 60 + Math.floor(k / 5) * 100;
    return (
      <g key={`h${k}`}>
        <rect x={x} y={y} width={90} height={90} fill={C.blueSoft} stroke={C.blue} strokeWidth={2} />
        {Array.from({ length: 9 }, (_, j) => (
          <g key={j}>
            <line x1={x + 9 * (j + 1)} y1={y} x2={x + 9 * (j + 1)} y2={y + 90} stroke={C.blue} strokeOpacity={0.35} />
            <line x1={x} y1={y + 9 * (j + 1)} x2={x + 90} y2={y + 9 * (j + 1)} stroke={C.blue} strokeOpacity={0.35} />
          </g>
        ))}
      </g>
    );
  });
  const rods = Array.from({ length: t }, (_, k) => {
    const x = 560 + k * 30, y = 60;
    return (
      <g key={`t${k}`}>
        <rect x={x} y={y} width={18} height={180} fill={C.orangeSoft} stroke={C.orange} strokeWidth={2} />
        {Array.from({ length: 9 }, (_, j) => (
          <line key={j} x1={x} y1={y + 18 * (j + 1)} x2={x + 18} y2={y + 18 * (j + 1)} stroke={C.orange} strokeOpacity={0.4} />
        ))}
      </g>
    );
  });
  const ones = Array.from({ length: o }, (_, k) => (
    <rect key={`o${k}`} x={860 + (k % 3) * 34} y={60 + Math.floor(k / 3) * 34} width={24} height={24}
      fill={C.greenSoft} stroke={C.green} strokeWidth={2} />
  ));
  return (
    <Panel
      readout={`${h} hundred${h === 1 ? "" : "s"} + ${t} ten${t === 1 ? "" : "s"} + ${o} one${o === 1 ? "" : "s"} = ${v}`}
      controls={interactive && (
        <>
          <Btn onClick={() => add(100)}>+100</Btn><Btn onClick={() => add(-100)}>−100</Btn>
          <Btn onClick={() => add(10)}>+10</Btn><Btn onClick={() => add(-10)}>−10</Btn>
          <Btn onClick={() => add(1)}>+1</Btn><Btn onClick={() => add(-1)}>−1</Btn>
        </>
      )}>
      <Svg w={980} h={280}>
        <Txt x={260} y={22} fill={C.blue} s={26}>Hundreds</Txt>
        <Txt x={690} y={22} fill={C.orange} s={26}>Tens</Txt>
        <Txt x={910} y={22} fill={C.green} s={26}>Ones</Txt>
        <line x1={540} y1={40} x2={540} y2={270} stroke={C.line} strokeWidth={3} />
        <line x1={840} y1={40} x2={840} y2={270} stroke={C.line} strokeWidth={3} />
        {flats}{rods}{ones}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- placeChart
// Place-value chart; tap a column to change its digit.
export function PlaceChart({ labels, digits: d0, point, system = "indian", interactive }) {
  const [digits, setDigits] = useState(d0.map(Number));
  const n = labels.length;
  const intLen = point ?? n;
  const intStr = digits.slice(0, intLen).join("");
  const decStr = digits.slice(intLen).join("");
  const shown = group(intStr, system) + (decStr ? `.${decStr}` : "");
  const pv = (k) => (k < intLen ? 10 ** (intLen - 1 - k) : 1 / 10 ** (k - intLen + 1));
  const fmtPv = (k) => (k < intLen ? group(String(10 ** (intLen - 1 - k)), system) : `1/${10 ** (k - intLen + 1)}`);
  const expanded = digits.map((dg, k) => (dg ? `${dg}×${fmtPv(k)}` : null)).filter(Boolean).join(" + ");
  const cw = Math.min(170, 1400 / n);
  const W = cw * n + 20;
  return (
    <Panel
      readout={<><div>{shown}</div><div style={{ fontSize: 24, color: C.muted, fontWeight: 500 }}>{expanded}</div></>}
      controls={interactive && <span style={{ fontSize: 22, color: C.muted }}>Tap a column to change its digit</span>}>
      <Svg w={W} h={260}>
        {labels.map((l, k) => {
          const x = 10 + k * cw;
          const col = k < intLen ? PAL[Math.floor((intLen - 1 - k) / (system === "indian" && intLen - 1 - k >= 3 ? 2 : 3)) % PAL.length] : C.teal;
          return (
            <g key={k} style={{ cursor: interactive ? "pointer" : "default" }}
              onClick={() => interactive && setDigits((ds) => ds.map((x2, j) => (j === k ? (x2 + 1) % 10 : x2)))}>
              <rect x={x} y={10} width={cw - 6} height={80} rx={10} fill={col} />
              <Txt x={x + (cw - 6) / 2} y={50} fill="#fff" s={Math.min(24, (cw - 16) / (l.length * 0.56))} w={700}>{l}</Txt>
              <rect x={x} y={100} width={cw - 6} height={140} rx={10} fill="#fff" stroke={col} strokeWidth={3} />
              <Txt x={x + (cw - 6) / 2} y={170} s={84} w={800}>{digits[k]}</Txt>
              {k === intLen - 1 && point != null && <circle cx={x + cw - 3} cy={225} r={9} fill={C.ink} />}
            </g>
          );
        })}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- sequence
// A row of tokens (shapes or numbers); the last `hide` are mystery boxes.
function Token({ t, x, y, s }) {
  const [kind, color = C.blue] = String(t).split(":");
  const r = s / 2 - 6;
  switch (kind) {
    case "circle": return <circle cx={x} cy={y} r={r} fill={color} />;
    case "square": return <rect x={x - r} y={y - r} width={2 * r} height={2 * r} rx={6} fill={color} />;
    case "triangle": return <polygon points={`${x},${y - r} ${x + r},${y + r * 0.8} ${x - r},${y + r * 0.8}`} fill={color} />;
    case "star": {
      const pts = Array.from({ length: 10 }, (_, k) => {
        const rr = k % 2 ? r * 0.45 : r, a = (-90 + k * 36) * Math.PI / 180;
        return `${x + rr * Math.cos(a)},${y + rr * Math.sin(a)}`;
      }).join(" ");
      return <polygon points={pts} fill={color} />;
    }
    default: return <Txt x={x} y={y} s={Math.min(64, s * 0.55)} w={800}>{t}</Txt>;
  }
}

export function Sequence({ items, hide = 1, rule, interactive }) {
  const [shown, setShown] = useState(false);
  const n = items.length, s = Math.min(150, 1400 / n);
  return (
    <Panel
      readout={shown && rule ? `Rule: ${rule}` : interactive ? "What comes next?" : null}
      controls={interactive && (
        <><Btn wide active={shown} onClick={() => setShown(true)}>Reveal</Btn><Btn wide onClick={() => setShown(false)}>Hide</Btn></>
      )}>
      <Svg w={s * n + 20} h={s + 20}>
        {items.map((t, k) => {
          const x = 10 + s * k + s / 2, y = s / 2 + 10;
          const hidden = k >= n - hide && !shown;
          return (
            <g key={k}>
              <rect x={x - s / 2 + 4} y={14} width={s - 8} height={s - 8} rx={14}
                fill={hidden ? C.yellowSoft : C.faint} stroke={hidden ? C.yellow : C.line} strokeWidth={3}
                strokeDasharray={hidden ? "10 8" : ""} />
              {hidden ? <Txt x={x} y={y} s={s * 0.5} w={800} fill={C.yellow}>?</Txt> : <Token t={t} x={x} y={y} s={s - 8} />}
            </g>
          );
        })}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- numberLine
export function NumberLine({ min = 0, max = 20, start = 0, jumps = [], tickEvery = 1, labelEvery, interactive }) {
  const [k, setK] = useState(interactive ? 0 : jumps.length);
  const W = 1400, X = (v) => 60 + ((v - min) / (max - min)) * (W - 120);
  const le = labelEvery || (max - min <= 20 ? 1 : tickEvery * 2);
  let pos = start;
  const arcs = jumps.slice(0, k).map((j, idx) => {
    const a = pos, b = pos + j; pos = b;
    const x1 = X(a), x2 = X(b), mid = (x1 + x2) / 2, hgt = Math.min(120, 30 + Math.abs(x2 - x1) * 0.45);
    const col = j < 0 ? C.red : C.blue;
    return (
      <g key={idx}>
        <path d={`M${x1},200 Q${mid},${200 - hgt * 2} ${x2},200`} fill="none" stroke={col} strokeWidth={5} />
        <polygon points={`${x2},200 ${x2 + (j < 0 ? 16 : -16)},186 ${x2 + (j < 0 ? 4 : -4)},${180}`} fill={col} />
        <Txt x={mid} y={200 - hgt - 22} s={28} w={800} fill={col}>{j > 0 ? `+${j}` : j}</Txt>
      </g>
    );
  });
  const ticks = [];
  const nTicks = Math.round((max - min) / tickEvery);
  for (let i = 0; i <= nTicks; i++) {
    const v = +(min + i * tickEvery).toFixed(6);
    const lab = i % Math.max(1, Math.round(le / tickEvery)) === 0;
    ticks.push(
      <g key={v}>
        <line x1={X(v)} y1={190} x2={X(v)} y2={lab ? 216 : 208} stroke={C.ink} strokeWidth={lab ? 3 : 2} />
        {lab && <Txt x={X(v)} y={244} s={26} fill={v < 0 ? C.red : v === 0 ? C.ink : C.ink} w={v === 0 ? 800 : 600}>{v}</Txt>}
      </g>,
    );
  }
  return (
    <Panel
      readout={k > 0 ? `${start} ${jumps.slice(0, k).map((j) => (j < 0 ? `− ${-j}` : `+ ${j}`)).join(" ")} = ${+pos.toFixed(6)}` : `Start at ${start}`}
      controls={interactive && (
        <><Btn wide onClick={() => setK((x) => Math.min(jumps.length, x + 1))} disabled={k >= jumps.length}>Jump ▶</Btn>
          <Btn wide onClick={() => setK(0)}>Reset</Btn></>
      )}>
      <Svg w={W} h={270}>
        <line x1={30} y1={200} x2={W - 30} y2={200} stroke={C.ink} strokeWidth={4} />
        {ticks}
        <circle cx={X(start)} cy={200} r={13} fill={C.orange} />
        {arcs}
        {k > 0 && <circle cx={X(pos)} cy={200} r={13} fill={C.green} />}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- dots
const DOTS = {
  square: (n) => Array.from({ length: n * n }, (_, i) => [i % n, Math.floor(i / n)]),
  triangle: (n) => { const p = []; for (let r = 0; r < n; r++) for (let c = 0; c <= r; c++) p.push([c - r / 2 + (n - 1) / 2, r]); return p; },
  rect: (n) => Array.from({ length: n * (n + 1) }, (_, i) => [i % (n + 1), Math.floor(i / (n + 1))]),
  odd: (n) => { const p = []; for (let r = 0; r < n; r++) { for (let c = 0; c <= r; c++) p.push([r, c]); for (let c = 0; c < r; c++) p.push([c, r]); } return p; },
};
export function Dots({ kind = "square", upto = 4, interactive }) {
  const [k, setK] = useState(upto);
  const f = DOTS[kind] || DOTS.square;
  const counts = Array.from({ length: k }, (_, i) => f(i + 1).length);
  const cell = 26, gap = 50;
  let x0 = 10;
  const figs = Array.from({ length: k }, (_, i) => {
    const pts = f(i + 1), wdt = (Math.max(...pts.map((p) => p[0])) + 1) * cell;
    const g = (
      <g key={i}>
        {pts.map(([x, y], j) => <circle key={j} cx={x0 + x * cell + cell / 2} cy={20 + y * cell + cell / 2} r={9} fill={PAL[i % PAL.length]} />)}
        <Txt x={x0 + wdt / 2} y={20 + (k + 1.4) * cell} s={30} w={800}>{counts[i]}</Txt>
      </g>
    );
    x0 += wdt + gap;
    return g;
  });
  return (
    <Panel readout={`${counts.join(", ")}, …`}
      controls={interactive && (
        <><Btn wide onClick={() => setK((x) => Math.min(8, x + 1))}>Next shape</Btn><Btn wide onClick={() => setK((x) => Math.max(1, x - 1))}>Back</Btn></>
      )}>
      <Svg w={Math.max(x0, 400)} h={20 + (k + 2.2) * cell}>{figs}</Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- machine
// Number machine: input passes through operations (number tricks, conjectures).
const OPS = {
  "+": (v, n) => v + n, "-": (v, n) => v - n, "*": (v, n) => v * n, "/": (v, n) => v / n,
  sq: (v) => v * v, rev: (v) => Number(String(Math.abs(v)).split("").reverse().join("")) * Math.sign(v || 1),
  digitsum: (v) => String(Math.abs(v)).split("").reduce((a, b) => a + Number(b), 0),
  "-start": (v, n, s) => v - s, "+start": (v, n, s) => v + s,
};
const OPLABEL = { "+": (n) => `+ ${n}`, "-": (n) => `− ${n}`, "*": (n) => `× ${n}`, "/": (n) => `÷ ${n}`, sq: () => "square it",
  rev: () => "reverse digits", digitsum: () => "add digits", "-start": () => "− start no.", "+start": () => "+ start no." };

export function Machine({ steps, input = 7, inputs, interactive }) {
  const list = inputs || [input];
  const [idx, setIdx] = useState(0);
  const [custom, setCustom] = useState(null);
  const start = custom ?? list[idx];
  const vals = [start];
  steps.forEach((s) => vals.push(OPS[s.op](vals[vals.length - 1], s.n, start)));
  const n = steps.length, bw = Math.min(200, 1300 / (n + 2));
  const W = (n + 2) * (bw + 30);
  const fmt = (v) => (Number.isInteger(v) ? v : Number(v.toFixed(2)));
  return (
    <Panel readout={`Start ${start} → end ${fmt(vals[n])}`}
      controls={interactive && (
        <>
          <Btn onClick={() => { setCustom(null); setIdx((i) => (i + 1) % list.length); }} wide>Next number</Btn>
          <Btn onClick={() => setCustom((c) => (c ?? start) + 1)}>+1</Btn>
          <Btn onClick={() => setCustom((c) => (c ?? start) - 1)}>−1</Btn>
          <Btn onClick={() => setCustom(Math.floor(Math.random() * 90) + 10)} wide>Random</Btn>
        </>
      )}>
      <Svg w={W} h={300}>
        {vals.map((v, k) => {
          const x = 10 + k * (bw + 30);
          const isEnd = k === 0 || k === n;
          return (
            <g key={k}>
              {k > 0 && <Arrow x1={x - 30} y1={170} x2={x} y2={170} color={C.muted} width={4} head={14} />}
              {k > 0 && <Txt x={x - 15 - bw / 2} y={60} s={Math.min(26, bw / 6)} w={700} fill={C.purple}>{steps[k - 1].label || OPLABEL[steps[k - 1].op](steps[k - 1].n)}</Txt>}
              <rect x={x} y={110} width={bw} height={120} rx={16} fill={isEnd ? (k ? C.greenSoft : C.orangeSoft) : C.purpleSoft}
                stroke={isEnd ? (k ? C.green : C.orange) : C.purple} strokeWidth={3} />
              <Txt x={x + bw / 2} y={170} s={Math.min(56, bw / 3.2)} w={800}>{fmt(v)}</Txt>
              <Txt x={x + bw / 2} y={260} s={20} fill={C.muted}>{k === 0 ? "start" : k === n ? "result" : `step ${k}`}</Txt>
            </g>
          );
        })}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- worksteps
// Big lines of working, revealed one at a time.
export function Worksteps({ lines, notes = [], interactive }) {
  const [k, setK] = useState(interactive ? 1 : lines.length);
  return (
    <Panel
      controls={interactive && (
        <><Btn wide onClick={() => setK((x) => Math.min(lines.length, x + 1))} disabled={k >= lines.length}>Next step ▶</Btn>
          <Btn wide onClick={() => setK(1)}>Reset</Btn></>
      )}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
        {lines.slice(0, k).map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 28, fontSize: Math.min(56, 300 / lines.length + 18),
            fontWeight: 800, color: i === k - 1 ? C.blue : C.ink, fontVariantNumeric: "tabular-nums" }}>
            <span>{l}</span>
            {notes[i] && <span style={{ fontSize: 24, fontWeight: 600, color: C.muted }}>{notes[i]}</span>}
          </div>
        ))}
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- hundredGrid
export function HundredGrid({ mode = "multiples", n = 3, max = 100, interactive }) {
  const [m, setM] = useState(n);
  const [crossed, setCrossed] = useState(mode === "sieve" && !interactive ? [2, 3, 5, 7] : []);
  const cols = 10, rows = Math.ceil(max / cols), cs = 66;
  const isCrossed = (v) => v === 1 || crossed.some((p) => v !== p && v % p === 0);
  const fill = (v) => {
    if (mode === "multiples") return v % m === 0 ? PAL[0] : "#fff";
    if (v === 1) return C.faint;
    if (isCrossed(v)) return C.faint;
    return crossed.includes(v) ? C.green : "#fff";
  };
  const primesLeft = Array.from({ length: max }, (_, i) => i + 1).filter((v) => v > 1 && !isCrossed(v));
  return (
    <Panel
      readout={mode === "multiples" ? `Multiples of ${m}: ${m}, ${2 * m}, ${3 * m}, ${4 * m}, …` :
        crossed.length ? `Crossed out multiples of ${crossed.join(", ")} — ${primesLeft.length} numbers left` : "Tap a prime to cross out its multiples"}
      controls={interactive && (mode === "multiples"
        ? [2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => <Btn key={v} active={m === v} onClick={() => setM(v)}>{v}</Btn>)
        : <>{[2, 3, 5, 7].map((p) => <Btn key={p} wide active={crossed.includes(p)} onClick={() => setCrossed((c) => (c.includes(p) ? c : [...c, p]))}>{`${p}s`}</Btn>)}
          <Btn wide onClick={() => setCrossed([])}>Reset</Btn></>)}>
      <Svg w={cols * cs} h={rows * cs}>
        {Array.from({ length: max }, (_, i) => {
          const v = i + 1, x = (i % cols) * cs, y = Math.floor(i / cols) * cs;
          const f = fill(v), dark = f === PAL[0] || f === C.green;
          return (
            <g key={v}>
              <rect x={x + 2} y={y + 2} width={cs - 4} height={cs - 4} rx={8} fill={f} stroke={C.line} strokeWidth={2} />
              <Txt x={x + cs / 2} y={y + cs / 2} s={26} w={700} fill={dark ? "#fff" : mode === "sieve" && isCrossed(v) ? C.line : C.ink}>{v}</Txt>
              {mode === "sieve" && v > 1 && isCrossed(v) && <line x1={x + 12} y1={y + cs - 12} x2={x + cs - 12} y2={y + 12} stroke={C.red} strokeWidth={3} strokeOpacity={0.6} />}
            </g>
          );
        })}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- bags (letter-numbers)
export function Bags({ bags = 3, extra = 2, x = 4, letter = "x", interactive }) {
  const [v, setV] = useState(x);
  const [peek, setPeek] = useState(!interactive);
  const W = bags * 200 + 60 + extra * 60 + 40;
  return (
    <Panel
      readout={<>{`${bags}${letter} + ${extra}`}{peek ? ` → when ${letter} = ${v}: ${bags} × ${v} + ${extra} = ${bags * v + extra}` : ""}</>}
      controls={interactive && (
        <><Btn wide active={peek} onClick={() => setPeek((p) => !p)}>{peek ? "Close bags" : "Peek inside"}</Btn>
          <Btn onClick={() => setV((a) => Math.max(0, a - 1))}>−</Btn><Btn onClick={() => setV((a) => Math.min(9, a + 1))}>+</Btn></>
      )}>
      <Svg w={W} h={300}>
        {Array.from({ length: bags }, (_, b) => {
          const bx = 20 + b * 200;
          return (
            <g key={b}>
              <path d={`M${bx + 30},90 Q${bx},280 ${bx + 90},280 Q${bx + 180},280 ${bx + 150},90 Z`} fill={C.orangeSoft} stroke={C.orange} strokeWidth={4} />
              <path d={`M${bx + 40},90 L${bx + 60},50 L${bx + 120},50 L${bx + 140},90`} fill="none" stroke={C.orange} strokeWidth={4} />
              {peek
                ? Array.from({ length: v }, (_, j) => <circle key={j} cx={bx + 55 + (j % 3) * 35} cy={145 + Math.floor(j / 3) * 38} r={14} fill={C.blue} />)
                : <Txt x={bx + 90} y={190} s={64} w={800} fill={C.orange}>{letter}</Txt>}
            </g>
          );
        })}
        <Txt x={bags * 200 + 40} y={190} s={56} w={800}>+</Txt>
        {Array.from({ length: extra }, (_, j) => <circle key={j} cx={bags * 200 + 100 + j * 60} cy={190} r={22} fill={C.green} />)}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- powers
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (k) => String(k).split("").map((d) => SUP[d]).join("");
export function Powers({ mode = "square", n = 3, base = 2, interactive }) {
  const [k, setK] = useState(n);
  if (mode === "power") {
    const val = base ** k;
    return (
      <Panel readout={`${base}${sup(k)} = ${Array(k).fill(base).join(" × ") || 1} = ${val.toLocaleString("en-IN")}`}
        controls={interactive && <><Btn onClick={() => setK((x) => Math.max(0, x - 1))}>− power</Btn><Btn onClick={() => setK((x) => Math.min(10, x + 1))}>+ power</Btn></>}>
        <Svg w={1200} h={330}>
          {Array.from({ length: Math.min(k, 10) + 1 }, (_, i) => {
            const h = Math.max(6, (base ** i / base ** Math.max(k, 1)) * 280);
            return (
              <g key={i}>
                <rect x={20 + i * 105} y={300 - h} width={80} height={h} rx={8} fill={i === k ? C.blue : C.blueSoft} />
                <Txt x={60 + i * 105} y={318} s={22} fill={C.muted}>{`${base}${sup(i)}`}</Txt>
                <Txt x={60 + i * 105} y={286 - h} s={22} w={800}>{(base ** i).toLocaleString("en-IN")}</Txt>
              </g>
            );
          })}
        </Svg>
      </Panel>
    );
  }
  if (mode === "cube") {
    const s = Math.min(46, 260 / k), cubes = [];
    for (let z = 0; z < k; z++) for (let y = k - 1; y >= 0; y--) for (let x = 0; x < k; x++) {
      const ox = 200 + (x - y) * s * 0.87, oy = 320 - z * s + (x + y) * s * 0.5 - k * s * 0.5;
      cubes.push(
        <g key={`${x}${y}${z}`}>
          <polygon points={`${ox},${oy} ${ox + s * 0.87},${oy - s * 0.5} ${ox},${oy - s} ${ox - s * 0.87},${oy - s * 0.5}`} fill={C.blueSoft} stroke={C.blue} />
          <polygon points={`${ox},${oy} ${ox - s * 0.87},${oy - s * 0.5} ${ox - s * 0.87},${oy + s * 0.5} ${ox},${oy + s}`} fill="#9fb3f5" stroke={C.blue} />
          <polygon points={`${ox},${oy} ${ox + s * 0.87},${oy - s * 0.5} ${ox + s * 0.87},${oy + s * 0.5} ${ox},${oy + s}`} fill="#6f8cf0" stroke={C.blue} />
        </g>,
      );
    }
    return (
      <Panel readout={`${k} × ${k} × ${k} = ${k ** 3}   (cube of ${k})`}
        controls={interactive && <><Btn onClick={() => setK((x) => Math.max(1, x - 1))}>−</Btn><Btn onClick={() => setK((x) => Math.min(6, x + 1))}>+</Btn></>}>
        <Svg w={400} h={420}>{cubes}</Svg>
      </Panel>
    );
  }
  const cs = Math.min(60, 360 / k);
  return (
    <Panel readout={`${k} × ${k} = ${k * k}   (square of ${k}; √${k * k} = ${k})`}
      controls={interactive && <><Btn onClick={() => setK((x) => Math.max(1, x - 1))}>−</Btn><Btn onClick={() => setK((x) => Math.min(12, x + 1))}>+</Btn></>}>
      <Svg w={400} h={400}>
        {Array.from({ length: k * k }, (_, i) => (
          <rect key={i} x={20 + (i % k) * cs} y={20 + Math.floor(i / k) * cs} width={cs - 3} height={cs - 3} rx={4}
            fill={(i % k) === k - 1 || Math.floor(i / k) === k - 1 ? C.orange : C.blue} />
        ))}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- converter
const ROMAN = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
function toRoman(v) { const parts = []; for (const [n, s] of ROMAN) while (v >= n) { parts.push([n, s]); v -= n; } return parts; }

export function Converter({ mode = "binary", value = 13, interactive }) {
  const [v, setV] = useState(value);
  if (mode === "roman") {
    const parts = toRoman(v);
    return (
      <Panel readout={`${v} = ${parts.map((p) => p[1]).join("")}`}
        controls={interactive && <>{[-10, -1, 1, 10, 100].map((d) => <Btn key={d} onClick={() => setV((x) => clamp(x + d, 1, 3999))}>{d > 0 ? `+${d}` : `−${-d}`}</Btn>)}</>}>
        <Svg w={Math.max(500, parts.length * 150 + 20)} h={260}>
          {parts.map(([n, s], k) => (
            <g key={k}>
              <rect x={10 + k * 150} y={30} width={130} height={130} rx={16} fill={SOFT[k % SOFT.length]} stroke={PAL[k % PAL.length]} strokeWidth={3} />
              <Txt x={75 + k * 150} y={95} s={56} w={800} fill={PAL[k % PAL.length]}>{s}</Txt>
              <Txt x={75 + k * 150} y={200} s={30} w={700}>{n}</Txt>
            </g>
          ))}
        </Svg>
      </Panel>
    );
  }
  const bits = [128, 64, 32, 16, 8, 4, 2, 1];
  return (
    <Panel readout={`${bits.map((b) => (v & b ? 1 : 0)).join("")} in binary = ${bits.filter((b) => v & b).join(" + ") || 0} = ${v}`}
      controls={interactive && <span style={{ fontSize: 22, color: C.muted }}>Tap a bulb to switch it on or off</span>}>
      <Svg w={1240} h={280}>
        {bits.map((b, k) => {
          const on = !!(v & b), x = 80 + k * 150;
          return (
            <g key={b} style={{ cursor: interactive ? "pointer" : "default" }} onClick={() => interactive && setV((x2) => x2 ^ b)}>
              <circle cx={x} cy={100} r={56} fill={on ? C.yellow : C.faint} stroke={on ? C.orange : C.line} strokeWidth={4} />
              <Txt x={x} y={100} s={48} w={800} fill={on ? "#fff" : C.muted}>{on ? 1 : 0}</Txt>
              <Txt x={x} y={196} s={30} w={700}>{b}</Txt>
            </g>
          );
        })}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- ratio
// Double number line for direct proportion.
export function Ratio({ a, b, max = 5, interactive }) {
  const [m, setM] = useState(interactive ? 1 : max);
  const W = 1400, X = (i) => 80 + (i / max) * (W - 160);
  return (
    <Panel readout={`${a.v * m} ${a.unit || ""} ↔ ${b.v * m} ${b.unit || ""}   (× ${m})`}
      controls={interactive && <><Btn onClick={() => setM((x) => Math.max(1, x - 1))}>−</Btn><Btn onClick={() => setM((x) => Math.min(max, x + 1))}>+</Btn></>}>
      <Svg w={W} h={310}>
        {[[a, 70, C.blue], [b, 250, C.orange]].map(([row, y, col]) => (
          <g key={y}>
            <Txt x={X(0)} y={y - 40} a="start" s={28} w={800} fill={col}>{row.label}</Txt>
            <line x1={X(0)} y1={y} x2={X(max)} y2={y} stroke={col} strokeWidth={5} />
            {Array.from({ length: max + 1 }, (_, i) => (
              <g key={i} opacity={i <= m ? 1 : 0.25}>
                <line x1={X(i)} y1={y - 14} x2={X(i)} y2={y + 14} stroke={col} strokeWidth={4} />
                <Txt x={X(i)} y={y + 36} s={28} w={i === m ? 800 : 600}>{row.v * i}</Txt>
              </g>
            ))}
          </g>
        ))}
        <line x1={X(m)} y1={60} x2={X(m)} y2={260} stroke={C.green} strokeWidth={4} strokeDasharray="8 8" />
      </Svg>
    </Panel>
  );
}
