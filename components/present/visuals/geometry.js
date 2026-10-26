"use client";

import { useState } from "react";
import { C, PAL, SOFT, Panel, Svg, Btn, Txt, Arrow, clamp, gcd, polar, regularPolygon } from "./kit";

// ---------------------------------------------------------------- solids
const SOLID = {
  cube: { name: "Cube", f: 6, e: 12, v: 8 },
  cuboid: { name: "Cuboid", f: 6, e: 12, v: 8 },
  cylinder: { name: "Cylinder", f: "2 flat + 1 curved", e: 2, v: 0 },
  cone: { name: "Cone", f: "1 flat + 1 curved", e: 1, v: 1 },
  sphere: { name: "Sphere", f: "1 curved", e: 0, v: 0 },
  pyramid: { name: "Square pyramid", f: 5, e: 8, v: 5 },
  prism: { name: "Triangular prism", f: 5, e: 9, v: 6 },
};
function drawSolid(kind, col, soft) {
  const st = { stroke: col, strokeWidth: 4, strokeLinejoin: "round" };
  switch (kind) {
    case "cube": return (<g><polygon points="-60,-30 -30,-60 70,-60 40,-30" fill="#fff" {...st} /><polygon points="40,-30 70,-60 70,40 40,70" fill={soft} {...st} /><rect x={-60} y={-30} width={100} height={100} fill={soft} {...st} /></g>);
    case "cuboid": return (<g><polygon points="-95,-20 -60,-50 85,-50 50,-20" fill="#fff" {...st} /><polygon points="50,-20 85,-50 85,30 50,60" fill={soft} {...st} /><rect x={-95} y={-20} width={145} height={80} fill={soft} {...st} /></g>);
    case "cylinder": return (<g><path d="M-60,-50 L-60,50 A60,18 0 0 0 60,50 L60,-50" fill={soft} {...st} /><ellipse cx={0} cy={-50} rx={60} ry={18} fill="#fff" {...st} /></g>);
    case "cone": return (<g><path d="M0,-85 L-60,50 A60,18 0 0 0 60,50 Z" fill={soft} {...st} /><path d="M-60,50 A60,18 0 0 1 60,50" fill="none" {...st} strokeDasharray="8 8" /></g>);
    case "sphere": return (<g><circle r={72} fill={soft} {...st} /><ellipse rx={72} ry={20} fill="none" {...st} strokeDasharray="8 8" /></g>);
    case "pyramid": return (<g><polygon points="-75,45 35,45 75,15 -35,15" fill="#fff" {...st} /><polygon points="0,-85 -75,45 35,45" fill={soft} {...st} /><polygon points="0,-85 35,45 75,15" fill={soft} {...st} /></g>);
    case "prism": return (<g><polygon points="-70,50 -20,-40 30,50" fill={soft} {...st} /><polygon points="-20,-40 60,-60 80,30 30,50" fill={soft} {...st} /><line x1={-70} y1={50} x2={-30} y2={50} {...st} /></g>);
    default: return null;
  }
}
export function Solids({ items = ["cube", "cuboid", "cylinder", "cone", "sphere", "pyramid"], interactive }) {
  const [sel, setSel] = useState(null);
  const n = items.length, cols = Math.min(n, 3), rows = Math.ceil(n / cols);
  const s = SOLID[sel];
  return (
    <Panel readout={s ? `${s.name}: faces ${s.f} · edges ${s.e} · corners ${s.v}` : interactive ? "Tap a solid to count its faces, edges and corners" : null}>
      <Svg w={cols * 260} h={rows * 250}>
        {items.map((k, i) => {
          const x = (i % cols) * 260 + 130, y = Math.floor(i / cols) * 250 + 115;
          const on = sel === k;
          return (
            <g key={k} style={{ cursor: interactive ? "pointer" : "default" }} onClick={() => interactive && setSel(k)}>
              <rect x={x - 125} y={y - 110} width={250} height={240} rx={18} fill={on ? C.yellowSoft : "transparent"} />
              <g transform={`translate(${x},${y - 5})`}>{drawSolid(k, PAL[i % PAL.length], SOFT[i % SOFT.length])}</g>
              <Txt x={x} y={y + 108} s={26} w={700}>{SOLID[k].name}</Txt>
            </g>
          );
        })}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- shapes
const SHAPE = {
  triangle: { name: "Triangle", sides: 3, pts: (r) => regularPolygon(0, 10, r, 3) },
  square: { name: "Square", sides: 4, pts: (r) => regularPolygon(0, 0, r, 4, -45), note: "4 equal sides, 4 right angles" },
  rectangle: { name: "Rectangle", sides: 4, pts: (r) => `${-r * 1.2},${-r * 0.6} ${r * 1.2},${-r * 0.6} ${r * 1.2},${r * 0.6} ${-r * 1.2},${r * 0.6}`, note: "opposite sides equal, 4 right angles" },
  rhombus: { name: "Rhombus", sides: 4, pts: (r) => `0,${-r} ${r * 0.7},0 0,${r} ${-r * 0.7},0`, note: "4 equal sides, opposite angles equal" },
  parallelogram: { name: "Parallelogram", sides: 4, pts: (r) => `${-r},${r * 0.55} ${-r * 0.5},${-r * 0.55} ${r},${-r * 0.55} ${r * 0.5},${r * 0.55}`, note: "opposite sides parallel and equal" },
  trapezium: { name: "Trapezium", sides: 4, pts: (r) => `${-r},${r * 0.55} ${-r * 0.5},${-r * 0.55} ${r * 0.5},${-r * 0.55} ${r},${r * 0.55}`, note: "one pair of parallel sides" },
  kite: { name: "Kite", sides: 4, pts: (r) => `0,${-r} ${r * 0.6},${-r * 0.3} 0,${r} ${-r * 0.6},${-r * 0.3}`, note: "two pairs of equal adjacent sides" },
  pentagon: { name: "Pentagon", sides: 5, pts: (r) => regularPolygon(0, 0, r, 5) },
  hexagon: { name: "Hexagon", sides: 6, pts: (r) => regularPolygon(0, 0, r, 6) },
  octagon: { name: "Octagon", sides: 8, pts: (r) => regularPolygon(0, 0, r, 8, -67.5) },
  circle: { name: "Circle", sides: 0 },
};
export function Shapes({ items = ["triangle", "square", "rectangle", "pentagon", "hexagon", "circle"], interactive }) {
  const [sel, setSel] = useState(null);
  const n = items.length, cols = Math.min(n, n > 6 ? 4 : 3), rows = Math.ceil(n / cols);
  const s = SHAPE[sel];
  return (
    <Panel readout={s ? `${s.name}: ${s.sides ? `${s.sides} sides, ${s.sides} corners` : "no straight sides, no corners"}${s.note ? ` — ${s.note}` : ""}` : interactive ? "Tap a shape" : null}>
      <Svg w={cols * 250} h={rows * 220}>
        {items.map((k, i) => {
          const x = (i % cols) * 250 + 125, y = Math.floor(i / cols) * 220 + 95;
          const col = PAL[i % PAL.length];
          return (
            <g key={k} style={{ cursor: interactive ? "pointer" : "default" }} onClick={() => interactive && setSel(k)}>
              <rect x={x - 118} y={y - 90} width={236} height={210} rx={16} fill={sel === k ? C.yellowSoft : "transparent"} />
              <g transform={`translate(${x},${y})`}>
                {k === "circle" ? <circle r={66} fill={SOFT[i % SOFT.length]} stroke={col} strokeWidth={5} />
                  : <polygon points={SHAPE[k].pts(72)} fill={SOFT[i % SOFT.length]} stroke={col} strokeWidth={5} strokeLinejoin="round" />}
              </g>
              <Txt x={x} y={y + 100} s={26} w={700}>{SHAPE[k].name}</Txt>
            </g>
          );
        })}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- tiles (tessellation)
export function Tiles({ kind = "hexagon", interactive }) {
  const [k, setK] = useState(kind);
  const cells = [];
  if (k === "square") for (let y = 0; y < 5; y++) for (let x = 0; x < 9; x++) cells.push(<rect key={`${x}${y}`} x={x * 80} y={y * 80} width={80} height={80} fill={SOFT[(x + y) % 3]} stroke={PAL[(x + y) % 3]} strokeWidth={3} />);
  if (k === "triangle") for (let y = 0; y < 5; y++) for (let x = 0; x < 18; x++) {
    const up = (x + y) % 2 === 0, bx = x * 40, by = y * 70;
    cells.push(<polygon key={`${x}${y}`} points={up ? `${bx},${by + 70} ${bx + 40},${by} ${bx + 80},${by + 70}` : `${bx},${by} ${bx + 80},${by} ${bx + 40},${by + 70}`} fill={SOFT[up ? 0 : 1]} stroke={PAL[up ? 0 : 1]} strokeWidth={3} />);
  }
  if (k === "hexagon") for (let y = 0; y < 5; y++) for (let x = 0; x < 9; x++) {
    const cx = x * 78 + (y % 2) * 39 + 40, cy = y * 68 + 40;
    cells.push(<polygon key={`${x}${y}`} points={regularPolygon(cx, cy, 45, 6, -90)} fill={SOFT[(x + 2 * y) % 3]} stroke={PAL[(x + 2 * y) % 3]} strokeWidth={3} />);
  }
  return (
    <Panel readout={`${k[0].toUpperCase()}${k.slice(1)}s fit together with no gaps and no overlaps`}
      controls={interactive && ["square", "triangle", "hexagon"].map((t) => <Btn key={t} wide active={k === t} onClick={() => setK(t)}>{t}s</Btn>)}>
      <Svg w={720} h={380}><g>{cells}</g></Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- symmetry
export function Symmetry({ mode = "mirror", cells = [], size = 8, order = 4, interactive }) {
  const [shown, setShown] = useState(!interactive);
  const [turns, setTurns] = useState(0);
  if (mode === "rotate") {
    const petal = "M0,0 C40,-40 40,-120 0,-160 C-40,-120 -40,-40 0,0 Z";
    return (
      <Panel readout={`Turned ${turns * (360 / order)}°${turns && turns % order === 0 ? " — back to the start!" : turns ? " — still looks the same!" : ""} · order of rotation ${order}`}
        controls={interactive && <><Btn wide onClick={() => setTurns((t) => t + 1)}>{`Turn ${360 / order}° ↻`}</Btn><Btn wide onClick={() => setTurns(0)}>Reset</Btn></>}>
        <Svg w={420} h={420}>
          <g transform={`translate(210,210) rotate(${turns * (360 / order)})`} style={{ transition: "transform .6s" }}>
            {Array.from({ length: order }, (_, k) => (
              <path key={k} d={petal} transform={`rotate(${(360 / order) * k})`} fill={SOFT[k % 2 ? 1 : 0]} stroke={PAL[k % 2 ? 1 : 0]} strokeWidth={4} />
            ))}
            <circle cx={0} cy={-120} r={14} fill={C.red} />
          </g>
          <circle cx={210} cy={210} r={10} fill={C.ink} />
        </Svg>
      </Panel>
    );
  }
  const cs = 50, W = size * cs, half = size / 2;
  return (
    <Panel readout={shown ? "Each square has a partner the same distance from the mirror line" : "Complete the other half of the design"}
      controls={interactive && <><Btn wide active={shown} onClick={() => setShown(true)}>Reflect</Btn><Btn wide onClick={() => setShown(false)}>Hide</Btn></>}>
      <Svg w={W + 20} h={W + 20}>
        <g transform="translate(10,10)">
          {Array.from({ length: size * size }, (_, i) => <rect key={i} x={(i % size) * cs} y={Math.floor(i / size) * cs} width={cs} height={cs} fill="#fff" stroke={C.line} />)}
          {cells.map(([r, c, col = 0], k) => <rect key={`a${k}`} x={c * cs + 2} y={r * cs + 2} width={cs - 4} height={cs - 4} fill={PAL[col]} rx={4} />)}
          {shown && cells.map(([r, c, col = 0], k) => <rect key={`b${k}`} x={(size - 1 - c) * cs + 2} y={r * cs + 2} width={cs - 4} height={cs - 4} fill={PAL[col]} opacity={0.75} rx={4} />)}
          <line x1={half * cs} y1={-10} x2={half * cs} y2={W + 10} stroke={C.red} strokeWidth={5} strokeDasharray="14 10" />
        </g>
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- angle
function angleType(d) {
  if (d === 0) return "zero angle";
  if (d < 90) return "acute angle";
  if (d === 90) return "right angle · quarter turn";
  if (d < 180) return "obtuse angle";
  if (d === 180) return "straight angle · half turn";
  if (d < 360) return d === 270 ? "reflex angle · three-quarter turn" : "reflex angle";
  return "complete angle · full turn";
}
export function Angle({ deg = 60, interactive }) {
  const [d, setD] = useState(deg);
  const cx = 400, cy = 250, R = 230;
  const [ex, ey] = polar(cx, cy, R, d);
  const big = d > 180 ? 1 : 0;
  const arc = d === 360 ? <circle cx={cx} cy={cy} r={70} fill="none" stroke={C.orange} strokeWidth={6} />
    : d === 90 ? <polyline points={`${cx + 50},${cy} ${cx + 50},${cy - 50} ${cx},${cy - 50}`} fill="none" stroke={C.orange} strokeWidth={6} />
    : <path d={`M${cx + 70},${cy} A70,70 0 ${big} 0 ${polar(cx, cy, 70, d).join(",")}`} fill="none" stroke={C.orange} strokeWidth={6} />;
  return (
    <Panel readout={`${d}° — ${angleType(d)}`}
      controls={interactive && <>{[-15, -5, 5, 15].map((s) => <Btn key={s} onClick={() => setD((x) => clamp(x + s, 0, 360))}>{s > 0 ? `+${s}°` : `${s}°`}</Btn>)}
        {[90, 180, 270, 360].map((p) => <Btn key={p} active={d === p} onClick={() => setD(p)}>{`${p}°`}</Btn>)}</>}>
      <Svg w={800} h={490}>
        <line x1={cx} y1={cy} x2={cx + R} y2={cy} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={ex} y2={ey} stroke={C.blue} strokeWidth={8} strokeLinecap="round" style={{ transition: "all .3s" }} />
        {arc}
        <circle cx={cx} cy={cy} r={10} fill={C.ink} />
        {d > 0 && d < 360 && <Txt x={polar(cx, cy, 120, d / 2)[0]} y={polar(cx, cy, 120, d / 2)[1]} s={40} w={800} fill={C.orange}>{`${d}°`}</Txt>}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- lines
const TRI_PRESETS = [
  [[200, 420], [700, 420], [330, 80]],
  [[150, 420], [750, 420], [450, 120]],
  [[200, 420], [600, 420], [200, 120]],
  [[120, 420], [780, 420], [640, 260]],
];
function angleAt(p, q, r) {
  const a1 = Math.atan2(q[1] - p[1], q[0] - p[0]), a2 = Math.atan2(r[1] - p[1], r[0] - p[0]);
  let d = Math.abs(a1 - a2) * 180 / Math.PI;
  if (d > 180) d = 360 - d;
  return d;
}
export function Lines({ mode = "transversal", angle = 60, interactive }) {
  const [a, setA] = useState(angle);
  const [sel, setSel] = useState(null);
  const [tri, setTri] = useState(0);
  if (mode === "triangle") {
    const P = TRI_PRESETS[tri];
    let angs = [angleAt(P[0], P[1], P[2]), angleAt(P[1], P[0], P[2]), angleAt(P[2], P[0], P[1])].map(Math.round);
    angs[2] = 180 - angs[0] - angs[1];
    return (
      <Panel readout={`${angs[0]}° + ${angs[1]}° + ${angs[2]}° = 180°`}
        controls={interactive && <Btn wide onClick={() => setTri((t) => (t + 1) % TRI_PRESETS.length)}>New triangle</Btn>}>
        <Svg w={900} h={480}>
          <polygon points={P.map((p) => p.join(",")).join(" ")} fill={C.blueSoft} stroke={C.blue} strokeWidth={6} strokeLinejoin="round" />
          {P.map((p, k) => {
            const o = P.filter((_, j) => j !== k);
            const mx = (o[0][0] + o[1][0]) / 2, my = (o[0][1] + o[1][1]) / 2;
            const dx = mx - p[0], dy = my - p[1], L = Math.hypot(dx, dy);
            return (
              <g key={k}>
                <circle cx={p[0]} cy={p[1]} r={12} fill={PAL[k + 1]} />
                <Txt x={p[0] + (dx / L) * 75} y={p[1] + (dy / L) * 60} s={34} w={800} fill={PAL[k + 1]}>{`${angs[k]}°`}</Txt>
              </g>
            );
          })}
        </Svg>
      </Panel>
    );
  }
  // two parallel lines cut by a transversal; 8 angles, tap one to see its equals
  const y1 = 150, y2 = 350, cx1 = 450 + 100 / Math.tan(a * Math.PI / 180), cx2 = 450 - 100 / Math.tan(a * Math.PI / 180);
  const dx = Math.cos(a * Math.PI / 180) * 240, dy = Math.sin(a * Math.PI / 180) * 240;
  const ints = [[cx1, y1], [cx2, y2]];
  // angle k at intersection: 0 top-right, 1 top-left, 2 bottom-left, 3 bottom-right
  const val = (k) => (k % 2 === 0 ? a : 180 - a);
  const group = (k) => k % 2;
  const pos = (cx, cy, k) => {
    const mids = [a / 2, (180 + a) / 2, 180 + a / 2, (540 + a) / 2];
    return polar(cx, cy, 78, mids[k]);
  };
  return (
    <Panel readout={sel == null ? (interactive ? "Tap an angle to find all the angles equal to it" : `Corresponding, alternate and vertically opposite angles are equal`) : `${val(sel % 4)}° — ${4} angles are equal; the other 4 are ${180 - val(sel % 4)}°`}
      controls={interactive && <>{[-10, 10].map((s) => <Btn key={s} onClick={() => setA((x) => clamp(x + s, 30, 150))}>{s > 0 ? "Tilt +10°" : "Tilt −10°"}</Btn>)}</>}>
      <Svg w={900} h={500}>
        <line x1={60} y1={y1} x2={840} y2={y1} stroke={C.ink} strokeWidth={6} />
        <line x1={60} y1={y2} x2={840} y2={y2} stroke={C.ink} strokeWidth={6} />
        <Txt x={830} y={y1 - 26} s={24} fill={C.muted}>l</Txt>
        <Txt x={830} y={y2 - 26} s={24} fill={C.muted}>m</Txt>
        <line x1={450 - dx} y1={250 + dy} x2={450 + dx} y2={250 - dy} stroke={C.blue} strokeWidth={6} />
        {ints.map(([cx, cy], ii) => [0, 1, 2, 3].map((k) => {
          const id = ii * 4 + k, [tx, ty] = pos(cx, cy, k);
          const hot = sel != null && group(sel % 4) === group(k);
          return (
            <g key={id} style={{ cursor: interactive ? "pointer" : "default" }} onClick={() => interactive && setSel(id)}>
              <circle cx={tx} cy={ty} r={30} fill={hot ? (group(k) ? C.orangeSoft : C.greenSoft) : "#fff"} stroke={hot ? (group(k) ? C.orange : C.green) : C.line} strokeWidth={3} />
              <Txt x={tx} y={ty} s={hot ? 22 : 24} w={800} fill={hot ? C.ink : C.muted}>{hot ? `${val(k)}°` : id + 1}</Txt>
            </g>
          );
        }))}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- areaGrid
export function AreaGrid({ w = 6, h = 4, split, interactive }) {
  const [W, setW] = useState(w);
  const [H, setH] = useState(h);
  const [S, setS] = useState(split ?? null);
  const cs = Math.min(70, 760 / Math.max(W, 1), 380 / Math.max(H, 1));
  const readout = S != null
    ? `${H} × (${S} + ${W - S}) = ${H} × ${S} + ${H} × ${W - S} = ${H * S} + ${H * (W - S)} = ${H * W}`
    : `Area = ${W} × ${H} = ${W * H} square units · Perimeter = 2 × (${W} + ${H}) = ${2 * (W + H)} units`;
  return (
    <Panel readout={readout}
      controls={interactive && <>
        <Btn onClick={() => setW((x) => Math.max(S != null ? S + 1 : 1, x - 1))}>− width</Btn><Btn onClick={() => setW((x) => Math.min(12, x + 1))}>+ width</Btn>
        <Btn onClick={() => setH((x) => Math.max(1, x - 1))}>− height</Btn><Btn onClick={() => setH((x) => Math.min(6, x + 1))}>+ height</Btn>
        {S != null && <><Btn onClick={() => setS((x) => Math.max(1, x - 1))}>◀ split</Btn><Btn onClick={() => setS((x) => Math.min(W - 1, x + 1))}>split ▶</Btn></>}
      </>}>
      <Svg w={W * cs + 80} h={H * cs + 80}>
        <g transform="translate(40,40)">
          {Array.from({ length: W * H }, (_, i) => {
            const c = i % W, r = Math.floor(i / W);
            const left = S == null || c < S;
            return <rect key={i} x={c * cs} y={r * cs} width={cs} height={cs} fill={left ? C.blueSoft : C.orangeSoft} stroke={left ? C.blue : C.orange} strokeWidth={1.5} />;
          })}
          <rect x={0} y={0} width={W * cs} height={H * cs} fill="none" stroke={C.ink} strokeWidth={5} />
          <Txt x={W * cs / 2} y={-20} s={26} w={700}>{S != null ? "" : W}</Txt>
          <Txt x={-22} y={H * cs / 2} s={26} w={700}>{H}</Txt>
          {S != null && <><Txt x={S * cs / 2} y={-20} s={26} w={700} fill={C.blue}>{S}</Txt><Txt x={S * cs + (W - S) * cs / 2} y={-20} s={26} w={700} fill={C.orange}>{W - S}</Txt></>}
        </g>
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- construction
export function Construction({ interactive }) {
  const [k, setK] = useState(interactive ? 1 : 4);
  const A = [200, 300], B = [600, 300], r = 260;
  const h = Math.sqrt(r * r - 200 * 200);
  const P = [400, 300 - h], Q = [400, 300 + h];
  const labels = ["Draw a line segment AB", "With centre A and radius more than half AB, draw arcs", "Same radius, centre B — draw arcs to cut the first ones", "Join the two crossing points: the perpendicular bisector"];
  return (
    <Panel readout={`Step ${k}: ${labels[k - 1]}`}
      controls={interactive && <><Btn wide onClick={() => setK((x) => Math.min(4, x + 1))} disabled={k >= 4}>Next step ▶</Btn><Btn wide onClick={() => setK(1)}>Reset</Btn></>}>
      <Svg w={800} h={620}>
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={C.ink} strokeWidth={6} />
        {[A, B].map((p, i) => <g key={i}><circle cx={p[0]} cy={p[1]} r={9} fill={C.ink} /><Txt x={p[0] + (i ? 26 : -26)} y={p[1] + 26} s={32} w={800}>{i ? "B" : "A"}</Txt></g>)}
        {k >= 2 && <path d={`M${polar(...A, r, 60).join(",")} A${r},${r} 0 0 1 ${polar(...A, r, 30).join(",")} M${polar(...A, r, -30).join(",")} A${r},${r} 0 0 1 ${polar(...A, r, -60).join(",")}`} fill="none" stroke={C.blue} strokeWidth={4} />}
        {k >= 3 && <path d={`M${polar(...B, r, 150).join(",")} A${r},${r} 0 0 1 ${polar(...B, r, 120).join(",")} M${polar(...B, r, 240).join(",")} A${r},${r} 0 0 1 ${polar(...B, r, 210).join(",")}`} fill="none" stroke={C.orange} strokeWidth={4} />}
        {k >= 4 && <><line x1={P[0]} y1={P[1] - 30} x2={Q[0]} y2={Q[1] + 30} stroke={C.green} strokeWidth={6} />
          <polyline points="400,270 430,270 430,300" fill="none" stroke={C.green} strokeWidth={4} />
          <Txt x={300} y={330} s={26} fill={C.muted}>equal</Txt><Txt x={500} y={330} s={26} fill={C.muted}>equal</Txt></>}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- fractions
export function Fractions({ bars = [{ n: 4, k: 1 }, { n: 8, k: 2 }], interactive }) {
  const [state, setState] = useState(bars.map((b) => Array.from({ length: b.n }, (_, j) => j < b.k)));
  const W = 1100, bh = Math.min(110, 380 / bars.length);
  return (
    <Panel readout={state.map((s) => `${s.filter(Boolean).length}/${s.length}`).join("   ·   ")}
      controls={interactive && <span style={{ fontSize: 22, color: C.muted }}>Tap parts to shade or unshade them</span>}>
      <Svg w={W + 160} h={bars.length * (bh + 30)}>
        {state.map((s, bi) => {
          const n = s.length, pw = W / n, y = bi * (bh + 30) + 10;
          return (
            <g key={bi}>
              {s.map((on, j) => (
                <rect key={j} x={j * pw} y={y} width={pw} height={bh} fill={on ? PAL[bi % PAL.length] : "#fff"} stroke={C.ink} strokeWidth={3}
                  style={{ cursor: interactive ? "pointer" : "default" }}
                  onClick={() => interactive && setState((st) => st.map((row, r) => (r === bi ? row.map((v, c) => (c === j ? !v : v)) : row)))} />
              ))}
              <Txt x={W + 80} y={y + bh / 2} s={44} w={800} fill={PAL[bi % PAL.length]}>{`${s.filter(Boolean).length}/${n}`}</Txt>
            </g>
          );
        })}
      </Svg>
    </Panel>
  );
}

export function FractionArea({ a = [2, 3], b = [3, 4], interactive }) {
  const [p, setP] = useState(a);
  const [q, setQ] = useState(b);
  const S = 420, num = p[0] * q[0], den = p[1] * q[1], g = gcd(num, den);
  const step = (set, idx, d, lo, hi) => set((f) => { const nf = [...f]; nf[idx] = clamp(nf[idx] + d, lo, hi); if (nf[0] > nf[1]) nf[0] = nf[1]; return nf; });
  return (
    <Panel readout={`${p[0]}/${p[1]} × ${q[0]}/${q[1]} = ${num}/${den}${g > 1 ? ` = ${num / g}/${den / g}` : ""}`}
      controls={interactive && <>
        <Btn onClick={() => step(setP, 0, 1, 1, 9)}>{"blue top +"}</Btn><Btn onClick={() => step(setP, 1, 1, 1, 9)}>{"blue bottom +"}</Btn>
        <Btn onClick={() => step(setQ, 0, 1, 1, 9)}>{"yellow top +"}</Btn><Btn onClick={() => step(setQ, 1, 1, 1, 9)}>{"yellow bottom +"}</Btn>
        <Btn onClick={() => { setP(a); setQ(b); }}>Reset</Btn>
      </>}>
      <Svg w={S + 40} h={S + 40}>
        <g transform="translate(20,20)">
          {Array.from({ length: p[1] * q[1] }, (_, i) => {
            const c = i % p[1], r = Math.floor(i / p[1]);
            const inA = c < p[0], inB = r < q[0];
            return <rect key={i} x={c * S / p[1]} y={r * S / q[1]} width={S / p[1]} height={S / q[1]}
              fill={inA && inB ? C.green : inA ? C.blueSoft : inB ? C.yellowSoft : "#fff"} stroke={C.line} strokeWidth={2} />;
          })}
          <rect width={S} height={S} fill="none" stroke={C.ink} strokeWidth={5} />
        </g>
      </Svg>
    </Panel>
  );
}
