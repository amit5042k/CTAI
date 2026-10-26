"use client";

import { useState } from "react";
import { C, PAL, SOFT, Panel, Svg, Btn, Txt, Arrow, clamp } from "./kit";

// ---------------------------------------------------------------- share
export function Share({ total = 13, groups = 4, interactive }) {
  const [t, setT] = useState(total);
  const [g, setG] = useState(groups);
  const each = Math.floor(t / g), left = t % g;
  const pw = Math.min(260, 1240 / g);
  return (
    <Panel readout={`${t} shared among ${g} = ${each} each${left ? `, ${left} left over` : ", none left over"}`}
      controls={interactive && <>
        <Btn onClick={() => setT((x) => Math.max(1, x - 1))}>− item</Btn><Btn onClick={() => setT((x) => Math.min(40, x + 1))}>+ item</Btn>
        <Btn onClick={() => setG((x) => Math.max(1, x - 1))}>− plate</Btn><Btn onClick={() => setG((x) => Math.min(8, x + 1))}>+ plate</Btn>
      </>}>
      <Svg w={g * pw + 220} h={340}>
        {Array.from({ length: g }, (_, k) => {
          const cx = k * pw + pw / 2;
          return (
            <g key={k}>
              <ellipse cx={cx} cy={190} rx={pw / 2 - 12} ry={130} fill={C.faint} stroke={C.line} strokeWidth={4} />
              {Array.from({ length: each }, (_, j) => {
                const cols = Math.max(2, Math.floor((pw - 60) / 44));
                return <circle key={j} cx={cx - ((Math.min(each, cols) - 1) * 44) / 2 + (j % cols) * 44} cy={110 + Math.floor(j / cols) * 44} r={17} fill={PAL[k % PAL.length]} />;
              })}
              <Txt x={cx} y={335} s={24} w={700} fill={C.muted}>{each}</Txt>
            </g>
          );
        })}
        <Txt x={g * pw + 110} y={60} s={24} w={700} fill={C.red}>left over</Txt>
        {Array.from({ length: left }, (_, j) => <circle key={j} cx={g * pw + 70 + (j % 2) * 60} cy={120 + Math.floor(j / 2) * 54} r={18} fill={C.red} />)}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- array
export function ArrayDots({ rows = 3, cols = 4, item = "circle", interactive }) {
  const [r, setR] = useState(rows);
  const [c, setC] = useState(cols);
  const cs = Math.min(80, 900 / c, 420 / r);
  return (
    <Panel readout={`${r} rows of ${c} = ${Array(r).fill(c).join(" + ")} = ${r} × ${c} = ${r * c}`}
      controls={interactive && <>
        <Btn onClick={() => setR((x) => Math.max(1, x - 1))}>− row</Btn><Btn onClick={() => setR((x) => Math.min(10, x + 1))}>+ row</Btn>
        <Btn onClick={() => setC((x) => Math.max(1, x - 1))}>− column</Btn><Btn onClick={() => setC((x) => Math.min(12, x + 1))}>+ column</Btn>
      </>}>
      <Svg w={c * cs + 20} h={r * cs + 20}>
        {Array.from({ length: r }, (_, i) => (
          <g key={i}>
            <rect x={4} y={10 + i * cs + 4} width={c * cs + 12} height={cs - 8} rx={cs / 2} fill={SOFT[i % SOFT.length]} />
            {Array.from({ length: c }, (_, j) => item === "square"
              ? <rect key={j} x={10 + j * cs + cs * 0.15} y={10 + i * cs + cs * 0.15} width={cs * 0.7} height={cs * 0.7} rx={6} fill={PAL[i % PAL.length]} />
              : <circle key={j} cx={10 + j * cs + cs / 2} cy={10 + i * cs + cs / 2} r={cs * 0.32} fill={PAL[i % PAL.length]} />)}
          </g>
        ))}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- balance
const fmtW = (g, unit) => (unit === "ml" ? (g >= 1000 ? `${g / 1000} l` : `${g} ml`) : g >= 1000 ? `${g / 1000} kg` : `${g} g`);
export function Balance({ left = [1000], right = [500, 200], weights = [500, 200, 100, 50], unit = "g", leftLabel, interactive }) {
  const [R, setR] = useState(interactive ? [] : right);
  const L = left.reduce((a, b) => a + b, 0), Rs = R.reduce((a, b) => a + b, 0);
  const tilt = clamp(((Rs - L) / Math.max(L, Rs, 1)) * 14, -14, 14);
  const pan = (items, x, label) => (
    <g transform={`translate(${x},0)`}>
      <line x1={-130} y1={0} x2={0} y2={150} stroke={C.muted} strokeWidth={3} />
      <line x1={130} y1={0} x2={0} y2={150} stroke={C.muted} strokeWidth={3} />
      <path d="M-170,150 Q0,215 170,150 Z" fill={C.yellowSoft} stroke={C.yellow} strokeWidth={4} />
      {label ? <g><rect x={-110} y={50} width={220} height={100} rx={16} fill={C.purpleSoft} stroke={C.purple} strokeWidth={3} /><Txt x={0} y={100} s={30} w={800}>{label}</Txt></g>
        : items.map((w, k) => <g key={k}><rect x={-160 + (k % 4) * 82} y={92 - Math.floor(k / 4) * 62} width={76} height={56} rx={8} fill={PAL[k % PAL.length]} /><Txt x={-122 + (k % 4) * 82} y={120 - Math.floor(k / 4) * 62} s={22} w={800} fill="#fff">{fmtW(w, unit)}</Txt></g>)}
    </g>
  );
  return (
    <Panel readout={`Left ${fmtW(L, unit)} · Right ${fmtW(Rs, unit)} → ${L === Rs ? "Balanced!" : Rs > L ? "Right side is heavier" : "Left side is heavier"}`}
      controls={interactive && <>{weights.map((w) => <Btn key={w} onClick={() => setR((r) => [...r, w])}>{`+${fmtW(w, unit)}`}</Btn>)}<Btn onClick={() => setR([])}>Clear</Btn></>}>
      <Svg w={1100} h={520}>
        <polygon points="520,500 580,500 560,140 540,140" fill={C.muted} />
        <rect x={440} y={490} width={220} height={22} rx={8} fill={C.ink} />
        <g transform={`rotate(${tilt} 550 140)`} style={{ transition: "transform .4s" }}>
          <rect x={160} y={132} width={780} height={16} rx={8} fill={C.ink} />
          <g transform={`translate(190,140) rotate(${-tilt})`}>{pan(left, 0, leftLabel)}</g>
          <g transform={`translate(910,140) rotate(${-tilt})`}>{pan(R, 0)}</g>
        </g>
        <circle cx={550} cy={140} r={14} fill={C.orange} />
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- money
const NOTES = [500, 200, 100, 50, 20, 10, 5, 2, 1];
export function Money({ price = 37, paid = [50], options = [1, 2, 5, 10, 20, 50, 100], item = "Item", interactive }) {
  const [P, setP] = useState(interactive ? [] : paid);
  const sum = P.reduce((a, b) => a + b, 0);
  const change = sum - price;
  const changeParts = [];
  let c = change;
  for (const n of NOTES) while (c >= n) { changeParts.push(n); c -= n; }
  const draw = (v, x, y, k) => (v >= 10
    ? <g key={k}><rect x={x} y={y} width={150} height={78} rx={8} fill={SOFT[(NOTES.indexOf(v) + 2) % SOFT.length]} stroke={PAL[(NOTES.indexOf(v) + 2) % PAL.length]} strokeWidth={3} /><Txt x={x + 75} y={y + 39} s={32} w={800}>{`₹${v}`}</Txt></g>
    : <g key={k}><circle cx={x + 40} cy={y + 39} r={38} fill={C.yellowSoft} stroke={C.yellow} strokeWidth={4} /><Txt x={x + 40} y={y + 39} s={28} w={800}>{`₹${v}`}</Txt></g>);
  return (
    <Panel readout={`${item} costs ₹${price} · paid ₹${sum} → ${change >= 0 ? `change ₹${change}${changeParts.length ? ` (${changeParts.map((n) => `₹${n}`).join(" + ")})` : ""}` : `₹${-change} more needed`}`}
      controls={interactive && <>{options.map((v) => <Btn key={v} onClick={() => setP((p) => [...p, v])}>{`₹${v}`}</Btn>)}<Btn onClick={() => setP([])}>Clear</Btn></>}>
      <Svg w={1200} h={300}>
        <rect x={10} y={20} width={220} height={240} rx={18} fill={C.blueSoft} stroke={C.blue} strokeWidth={3} />
        <Txt x={120} y={110} s={30} w={700}>{item}</Txt>
        <Txt x={120} y={170} s={48} w={800} fill={C.blue}>{`₹${price}`}</Txt>
        <Txt x={300} y={20} s={24} a="start" fill={C.muted} w={700}>Paid</Txt>
        {P.slice(0, 12).map((v, k) => draw(v, 280 + (k % 6) * 160, 50 + Math.floor(k / 6) * 100, k))}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- clock
function words(h, m) {
  const H = ((h + 11) % 12) + 1, N = (H % 12) + 1;
  if (m === 0) return `${H} o'clock`;
  if (m === 15) return `quarter past ${H}`;
  if (m === 30) return `half past ${H}`;
  if (m === 45) return `quarter to ${N}`;
  return m < 30 ? `${m} minutes past ${H}` : `${60 - m} minutes to ${N}`;
}
export function Clock({ h = 3, m = 15, interactive }) {
  const [t, setT] = useState(h * 60 + m);
  const H = Math.floor(t / 60) % 24, M = t % 60;
  const ha = ((H % 12) + M / 60) * 30, ma = M * 6;
  const hand = (deg, len, w, col) => <line x1={0} y1={0} x2={Math.sin(deg * Math.PI / 180) * len} y2={-Math.cos(deg * Math.PI / 180) * len} stroke={col} strokeWidth={w} strokeLinecap="round" />;
  const add = (d) => setT((x) => (x + d + 1440) % 1440);
  return (
    <Panel readout={`${String(H).padStart(2, "0")}:${String(M).padStart(2, "0")} · ${words(H, M)} · ${H < 12 ? "a.m." : "p.m."}`}
      controls={interactive && <>
        <Btn onClick={() => add(-60)}>−1 h</Btn><Btn onClick={() => add(60)}>+1 h</Btn>
        <Btn onClick={() => add(-5)}>−5 min</Btn><Btn onClick={() => add(5)}>+5 min</Btn><Btn onClick={() => add(1)}>+1 min</Btn>
      </>}>
      <Svg w={980} h={460}>
        <g transform="translate(230,230)">
          <circle r={210} fill="#fff" stroke={C.ink} strokeWidth={10} />
          {Array.from({ length: 60 }, (_, k) => {
            const a = k * 6 * Math.PI / 180, big = k % 5 === 0;
            return <line key={k} x1={Math.sin(a) * (big ? 178 : 190)} y1={-Math.cos(a) * (big ? 178 : 190)} x2={Math.sin(a) * 200} y2={-Math.cos(a) * 200} stroke={C.ink} strokeWidth={big ? 5 : 2} />;
          })}
          {Array.from({ length: 12 }, (_, k) => {
            const a = (k + 1) * 30 * Math.PI / 180;
            return <Txt key={k} x={Math.sin(a) * 148} y={-Math.cos(a) * 148} s={36} w={800}>{k + 1}</Txt>;
          })}
          {hand(ha, 100, 14, C.ink)}
          {hand(ma, 160, 8, C.blue)}
          <circle r={12} fill={C.orange} />
        </g>
        <rect x={540} y={150} width={400} height={160} rx={20} fill={C.ink} />
        <Txt x={740} y={230} s={96} w={800} fill="#34d399" style={{ fontVariantNumeric: "tabular-nums" }}>{`${String(H).padStart(2, "0")}:${String(M).padStart(2, "0")}`}</Txt>
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- ruler / map scale
export function Ruler({ length = 7.5, max = 15, object = "Pencil", scale, scaleUnit = "km", interactive }) {
  const [L, setL] = useState(length);
  const px = 1300 / max, x0 = 50;
  return (
    <Panel readout={scale ? `${L} cm on the map × ${scale} ${scaleUnit} per cm = ${+(L * scale).toFixed(2)} ${scaleUnit} on the ground` : `${object}: ${L} cm = ${L * 10} mm`}
      controls={interactive && <>{[-1, -0.5, 0.5, 1].map((d) => <Btn key={d} onClick={() => setL((x) => clamp(+(x + d).toFixed(1), 0.5, max))}>{d > 0 ? `+${d} cm` : `${d} cm`}</Btn>)}</>}>
      <Svg w={1400} h={330}>
        {scale ? (
          <g>
            <circle cx={x0} cy={90} r={22} fill={C.green} /><Txt x={x0} y={40} s={24} w={700}>A</Txt>
            <line x1={x0} y1={90} x2={x0 + L * px} y2={90} stroke={C.green} strokeWidth={6} strokeDasharray="16 10" />
            <circle cx={x0 + L * px} cy={90} r={22} fill={C.red} /><Txt x={x0 + L * px} y={40} s={24} w={700}>B</Txt>
          </g>
        ) : (
          <g>
            <rect x={x0} y={60} width={L * px - 40} height={50} rx={8} fill={C.yellow} />
            <polygon points={`${x0 + L * px - 40},60 ${x0 + L * px},85 ${x0 + L * px - 40},110`} fill={C.orangeSoft} stroke={C.orange} strokeWidth={3} />
            <rect x={x0} y={60} width={30} height={50} fill={C.pink} />
          </g>
        )}
        <rect x={x0 - 20} y={150} width={max * px + 40} height={130} rx={10} fill="#fef9c3" stroke={C.yellow} strokeWidth={3} />
        {Array.from({ length: max * 10 + 1 }, (_, k) => {
          const x = x0 + (k / 10) * px, cm = k % 10 === 0, half = k % 5 === 0;
          return (
            <g key={k}>
              <line x1={x} y1={150} x2={x} y2={150 + (cm ? 50 : half ? 34 : 20)} stroke={C.ink} strokeWidth={cm ? 3 : 1.5} />
              {cm && <Txt x={x} y={232} s={24} w={700}>{k / 10}</Txt>}
            </g>
          );
        })}
        <line x1={x0 + L * px} y1={40} x2={x0 + L * px} y2={210} stroke={C.red} strokeWidth={3} strokeDasharray="6 6" />
        <Txt x={x0 + max * px} y={262} s={20} fill={C.muted} a="end">cm</Txt>
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- gridMap
const DIRS = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] };
export function GridMap({ cols = 8, rows = 6, places = [], start = [0, 5], moves = "", interactive }) {
  const [pos, setPos] = useState(start);
  const [trail, setTrail] = useState([start]);
  const cs = Math.min(90, 1000 / cols, 470 / rows);
  const path = interactive ? trail : [...moves].reduce((acc, m) => { const [x, y] = acc[acc.length - 1], d = DIRS[m]; return d ? [...acc, [x + d[0], y + d[1]]] : acc; }, [start]);
  const cur = path[path.length - 1];
  const label = (p) => `${String.fromCharCode(65 + p[0])}${rows - p[1]}`;
  const here = places.find((pl) => pl.x === cur[0] && pl.y === cur[1]);
  const move = (m) => {
    const [x, y] = pos, d = DIRS[m];
    const nx = clamp(x + d[0], 0, cols - 1), ny = clamp(y + d[1], 0, rows - 1);
    setPos([nx, ny]); setTrail((t) => [...t, [nx, ny]]);
  };
  return (
    <Panel readout={`At ${label(cur)}${here ? ` — ${here.name}` : ""} · ${path.length - 1} steps`}
      controls={interactive && <>{["N", "W", "E", "S"].map((m) => <Btn key={m} wide onClick={() => move(m)}>{{ N: "↑ North", S: "↓ South", E: "East →", W: "← West" }[m]}</Btn>)}
        <Btn onClick={() => { setPos(start); setTrail([start]); }}>Reset</Btn></>}>
      <Svg w={cols * cs + 230} h={rows * cs + 60}>
        <g transform="translate(50,10)">
          {Array.from({ length: cols * rows }, (_, i) => <rect key={i} x={(i % cols) * cs} y={Math.floor(i / cols) * cs} width={cs} height={cs} fill={(i + Math.floor(i / cols)) % 2 ? "#f8fafc" : "#fff"} stroke={C.line} strokeWidth={2} />)}
          {Array.from({ length: cols }, (_, c) => <Txt key={c} x={c * cs + cs / 2} y={rows * cs + 24} s={22} w={700} fill={C.muted}>{String.fromCharCode(65 + c)}</Txt>)}
          {Array.from({ length: rows }, (_, r) => <Txt key={r} x={-24} y={r * cs + cs / 2} s={22} w={700} fill={C.muted}>{rows - r}</Txt>)}
          {places.map((pl, k) => (
            <g key={k}>
              <rect x={pl.x * cs + 6} y={pl.y * cs + 6} width={cs - 12} height={cs - 12} rx={10} fill={SOFT[k % SOFT.length]} stroke={PAL[k % PAL.length]} strokeWidth={3} />
              <Txt x={pl.x * cs + cs / 2} y={pl.y * cs + cs / 2} s={Math.min(18, cs / 5)} w={800} fill={PAL[k % PAL.length]}>{pl.short || pl.name.slice(0, 7)}</Txt>
            </g>
          ))}
          <polyline points={path.map(([x, y]) => `${x * cs + cs / 2},${y * cs + cs / 2}`).join(" ")} fill="none" stroke={C.blue} strokeWidth={6} strokeLinejoin="round" strokeDasharray="2 12" strokeLinecap="round" />
          <circle cx={cur[0] * cs + cs / 2} cy={cur[1] * cs + cs / 2} r={cs * 0.28} fill={C.blue} stroke="#fff" strokeWidth={4} />
        </g>
        <g transform={`translate(${cols * cs + 150},${rows * cs / 2 + 10})`}>
          <circle r={70} fill="#fff" stroke={C.line} strokeWidth={3} />
          <polygon points="0,-62 12,0 0,10 -12,0" fill={C.red} /><polygon points="0,62 12,0 0,-10 -12,0" fill={C.muted} />
          <Txt x={0} y={-88} s={26} w={800} fill={C.red}>N</Txt><Txt x={0} y={90} s={24} w={700}>S</Txt>
          <Txt x={90} y={0} s={24} w={700}>E</Txt><Txt x={-90} y={0} s={24} w={700}>W</Txt>
        </g>
      </Svg>
    </Panel>
  );
}

