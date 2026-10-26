"use client";

import { useState } from "react";
import { C, PAL, SOFT, Panel, Svg, Btn, Txt, Arrow } from "./kit";

// ---------------------------------------------------------------- cipher
const AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function Cipher({ words = ["HELLO"], shift = 3, interactive }) {
  const [s, setS] = useState(shift);
  const [wi, setWi] = useState(0);
  const w = words[wi].toUpperCase();
  const enc = [...w].map((ch) => (AZ.includes(ch) ? AZ[(AZ.indexOf(ch) + s) % 26] : ch)).join("");
  const used = new Set([...w].map((ch) => AZ.indexOf(ch)));
  const cw = 56;
  return (
    <Panel readout={<>{w} <span style={{ color: C.muted }}>→ key +{s} →</span> <span style={{ color: C.blue }}>{enc}</span></>}
      controls={interactive && <>
        <Btn onClick={() => setS((x) => (x + 25) % 26)}>Key −1</Btn><Btn onClick={() => setS((x) => (x + 1) % 26)}>Key +1</Btn>
        {words.length > 1 && <Btn wide onClick={() => setWi((i) => (i + 1) % words.length)}>Next word</Btn>}
      </>}>
      <Svg w={26 * cw + 20} h={240}>
        {[...AZ].map((ch, k) => {
          const x = 10 + k * cw, hot = used.has(k);
          return (
            <g key={ch}>
              <rect x={x + 2} y={20} width={cw - 4} height={70} rx={8} fill={hot ? C.orangeSoft : C.faint} stroke={hot ? C.orange : C.line} strokeWidth={2} />
              <Txt x={x + cw / 2} y={55} s={30} w={800}>{ch}</Txt>
              <Arrow x1={x + cw / 2} y1={96} x2={x + cw / 2} y2={136} color={hot ? C.orange : C.line} width={3} head={10} />
              <rect x={x + 2} y={142} width={cw - 4} height={70} rx={8} fill={hot ? C.blue : "#fff"} stroke={hot ? C.blue : C.line} strokeWidth={2} />
              <Txt x={x + cw / 2} y={177} s={30} w={800} fill={hot ? "#fff" : C.ink}>{AZ[(k + s) % 26]}</Txt>
            </g>
          );
        })}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- chart
export function Chart({ data, mode = "bar", modes, unit = "", per = 1, title, interactive }) {
  const [m, setM] = useState(mode);
  const [sel, setSel] = useState(null);
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const n = data.length, W = 1300, H = 420;
  const tot = data.reduce((a, d) => a + d.value, 0);
  const pick = (i) => interactive && setSel(i);
  const readout = sel != null ? `${data[sel].label}: ${data[sel].value}${unit ? ` ${unit}` : ""}` : title || (interactive ? "Tap a bar, row or slice to read its value" : null);
  let body;
  if (m === "bar") {
    const bw = Math.min(160, (W - 120) / n - 30), top = Math.ceil(max / 5) * 5 || 5;
    body = (
      <g>
        {Array.from({ length: 6 }, (_, k) => { const y = H - 40 - (k / 5) * (H - 90); return <g key={k}><line x1={80} y1={y} x2={W} y2={y} stroke={C.faint} strokeWidth={2} /><Txt x={66} y={y} a="end" s={20} fill={C.muted}>{Math.round(top * k / 5)}</Txt></g>; })}
        {data.map((d, i) => {
          const h = (d.value / top) * (H - 90), x = 110 + i * ((W - 120) / n);
          return (
            <g key={i} style={{ cursor: interactive ? "pointer" : "default" }} onClick={() => pick(i)}>
              <rect x={x} y={H - 40 - h} width={bw} height={h} rx={8} fill={sel === i ? C.orange : PAL[i % PAL.length]} />
              <Txt x={x + bw / 2} y={H - 56 - h} s={24} w={800}>{d.value}</Txt>
              <Txt x={x + bw / 2} y={H - 14} s={Math.min(24, bw / 4)} w={700}>{d.label}</Txt>
            </g>
          );
        })}
        <line x1={80} y1={H - 40} x2={W} y2={H - 40} stroke={C.ink} strokeWidth={3} />
      </g>
    );
  } else if (m === "picto" || m === "tally") {
    const rh = Math.min(80, (H - 40) / n);
    body = (
      <g>
        {data.map((d, i) => {
          const y = 10 + i * rh;
          const icons = [];
          if (m === "picto") {
            const full = Math.floor(d.value / per), part = (d.value % per) / per;
            for (let k = 0; k < full; k++) icons.push(<circle key={k} cx={300 + k * (rh - 6)} cy={y + rh / 2} r={rh / 2 - 8} fill={PAL[i % PAL.length]} />);
            if (part) icons.push(<path key="p" d={`M${300 + full * (rh - 6)},${y + 8} A${rh / 2 - 8},${rh / 2 - 8} 0 0 0 ${300 + full * (rh - 6)},${y + rh - 8} Z`} fill={PAL[i % PAL.length]} />);
          } else {
            for (let k = 0; k < d.value; k++) {
              const grp = Math.floor(k / 5), j = k % 5, gx = 300 + grp * 110;
              icons.push(j < 4 ? <line key={k} x1={gx + j * 20} y1={y + 12} x2={gx + j * 20} y2={y + rh - 12} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
                : <line key={k} x1={gx - 12} y1={y + rh - 16} x2={gx + 72} y2={y + 16} stroke={C.red} strokeWidth={5} strokeLinecap="round" />);
            }
          }
          return (
            <g key={i} style={{ cursor: interactive ? "pointer" : "default" }} onClick={() => pick(i)}>
              <rect x={0} y={y + 2} width={W} height={rh - 4} rx={10} fill={sel === i ? C.yellowSoft : i % 2 ? "#fff" : C.faint} />
              <Txt x={20} y={y + rh / 2} a="start" s={Math.min(30, rh * 0.4)} w={700}>{d.label}</Txt>
              {icons}
            </g>
          );
        })}
        {m === "picto" && <Txt x={W} y={H - 10} a="end" s={22} fill={C.muted}>{`Key: ● = ${per}${unit ? ` ${unit}` : ""}`}</Txt>}
      </g>
    );
  } else if (m === "line") {
    const top = Math.ceil(max / 5) * 5 || 5;
    const X = (i) => 110 + i * ((W - 160) / Math.max(1, n - 1)), Y = (v) => H - 40 - (v / top) * (H - 90);
    body = (
      <g>
        {Array.from({ length: 6 }, (_, k) => { const y = Y(top * k / 5); return <g key={k}><line x1={80} y1={y} x2={W} y2={y} stroke={C.faint} strokeWidth={2} /><Txt x={66} y={y} a="end" s={20} fill={C.muted}>{Math.round(top * k / 5)}</Txt></g>; })}
        <polyline points={data.map((d, i) => `${X(i)},${Y(d.value)}`).join(" ")} fill="none" stroke={C.blue} strokeWidth={6} strokeLinejoin="round" />
        {data.map((d, i) => (
          <g key={i} style={{ cursor: interactive ? "pointer" : "default" }} onClick={() => pick(i)}>
            <circle cx={X(i)} cy={Y(d.value)} r={sel === i ? 16 : 11} fill={sel === i ? C.orange : C.blue} />
            <Txt x={X(i)} y={H - 14} s={22} w={700}>{d.label}</Txt>
          </g>
        ))}
      </g>
    );
  } else {
    let acc = 0;
    body = (
      <g transform={`translate(${W / 2 - 250},${H / 2})`}>
        {data.map((d, i) => {
          const a0 = (acc / tot) * 2 * Math.PI; acc += d.value; const a1 = (acc / tot) * 2 * Math.PI;
          const r = sel === i ? 200 : 185, big = a1 - a0 > Math.PI ? 1 : 0;
          const p = (a) => `${Math.sin(a) * r},${-Math.cos(a) * r}`;
          const mid = (a0 + a1) / 2;
          return (
            <g key={i} style={{ cursor: interactive ? "pointer" : "default" }} onClick={() => pick(i)}>
              <path d={`M0,0 L${p(a0)} A${r},${r} 0 ${big} 1 ${p(a1)} Z`} fill={PAL[i % PAL.length]} stroke="#fff" strokeWidth={4} />
              <Txt x={Math.sin(mid) * 120} y={-Math.cos(mid) * 120} s={24} w={800} fill="#fff">{`${Math.round((d.value / tot) * 100)}%`}</Txt>
              <rect x={260} y={-n * 26 + i * 52} width={30} height={30} rx={6} fill={PAL[i % PAL.length]} />
              <Txt x={305} y={-n * 26 + i * 52 + 15} a="start" s={26} w={700}>{`${d.label} (${d.value})`}</Txt>
            </g>
          );
        })}
      </g>
    );
  }
  const avail = modes || [mode];
  return (
    <Panel readout={readout}
      controls={interactive && avail.length > 1 && avail.map((k) => <Btn key={k} wide active={m === k} onClick={() => { setM(k); setSel(null); }}>{{ bar: "Bar graph", picto: "Pictograph", tally: "Tally", line: "Line graph", pie: "Pie chart" }[k]}</Btn>)}>
      <Svg w={W} h={H}>{body}</Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- clues
const RULES = {
  even: () => (v) => v % 2 === 0, odd: () => (v) => v % 2 === 1,
  gt: (n) => (v) => v > n, lt: (n) => (v) => v < n, mult: (n) => (v) => v % n === 0, notmult: (n) => (v) => v % n !== 0,
  digitsum: (n) => (v) => String(v).split("").reduce((a, b) => a + +b, 0) === n,
  ones: (n) => (v) => v % 10 === n, tens: (n) => (v) => Math.floor(v / 10) % 10 === n,
};
export function Clues({ max = 50, clues, interactive }) {
  const [on, setOn] = useState([]);
  const ok = (v) => on.every((i) => { const [r, n] = clues[i].rule.split(":"); return RULES[r](Number(n))(v); });
  const left = Array.from({ length: max }, (_, i) => i + 1).filter(ok);
  const cols = 10, cs = 64, rows = Math.ceil(max / cols);
  return (
    <Panel readout={!interactive ? `Clues: ${clues.map((c) => c.text).join(" · ")}` : left.length === 1 ? `The secret number is ${left[0]}!` : `${left.length} numbers still possible`}
      controls={interactive && <>{clues.map((c, i) => <Btn key={i} active={on.includes(i)} onClick={() => setOn((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))}>{`Clue ${i + 1}: ${c.text}`}</Btn>)}
        <Btn onClick={() => setOn([])}>Reset</Btn></>}>
      <Svg w={cols * cs} h={rows * cs}>
        {Array.from({ length: max }, (_, i) => {
          const v = i + 1, x = (i % cols) * cs, y = Math.floor(i / cols) * cs, good = ok(v), only = left.length === 1 && good;
          return (
            <g key={v} opacity={good ? 1 : 0.28}>
              <rect x={x + 3} y={y + 3} width={cs - 6} height={cs - 6} rx={10} fill={only ? C.green : good ? C.blueSoft : C.faint} stroke={only ? C.green : C.line} strokeWidth={2} />
              <Txt x={x + cs / 2} y={y + cs / 2} s={26} w={700} fill={only ? "#fff" : C.ink}>{v}</Txt>
            </g>
          );
        })}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- flow / cycle
export function Flow({ steps, mode = "flow", interactive }) {
  const items = steps.map((s) => (typeof s === "string" ? { t: s } : s));
  const [k, setK] = useState(interactive && mode === "flow" ? 1 : items.length);
  const [sel, setSel] = useState(null);
  if (mode === "cycle") {
    const n = items.length, R = 250, cx = 650, cy = 320, bw = 320, bh = 96;
    const pts = items.map((_, i) => { const a = (-90 + (360 / n) * i) * Math.PI / 180; return [cx + R * 1.85 * Math.cos(a), cy + R * Math.sin(a)]; });
    // point where the line from p towards q leaves p's box
    const edge = (p, q) => {
      const dx = q[0] - p[0], dy = q[1] - p[1];
      const t = Math.min((bw / 2 + 10) / Math.abs(dx || 1e-9), (bh / 2 + 10) / Math.abs(dy || 1e-9));
      return [p[0] + dx * t, p[1] + dy * t];
    };
    return (
      <Panel readout={sel != null ? `${items[sel].t}: ${items[sel].d || ""}` : interactive ? "Tap a stage to explain it" : null}>
        <Svg w={1300} h={660}>
          {pts.map((p, i) => { const q = pts[(i + 1) % n], a = edge(p, q), b = edge(q, p); return <Arrow key={`a${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} color={C.muted} width={5} head={20} />; })}
          {items.map((it, i) => (
            <g key={i} style={{ cursor: interactive ? "pointer" : "default" }} onClick={() => interactive && setSel(i)}>
              <rect x={pts[i][0] - bw / 2} y={pts[i][1] - bh / 2} width={bw} height={bh} rx={20} fill={sel === i ? PAL[i % PAL.length] : SOFT[i % SOFT.length]} stroke={PAL[i % PAL.length]} strokeWidth={4} />
              <Txt x={pts[i][0]} y={pts[i][1]} s={27} w={800} fill={sel === i ? "#fff" : C.ink}>{`${i + 1}. ${it.t}`}</Txt>
            </g>
          ))}
        </Svg>
      </Panel>
    );
  }
  const n = items.length, perRow = n > 4 ? Math.ceil(n / 2) : n, rows = Math.ceil(n / perRow);
  const bw = Math.min(300, 1300 / perRow - 60), bh = 150, gx = 60, gy = 90;
  const pos = (i) => [(i % perRow) * (bw + gx), Math.floor(i / perRow) * (bh + gy)];
  return (
    <Panel controls={interactive && <><Btn wide onClick={() => setK((x) => Math.min(n, x + 1))} disabled={k >= n}>Next step ▶</Btn><Btn wide onClick={() => setK(1)}>Reset</Btn></>}>
      <Svg w={perRow * (bw + gx) - gx + 20} h={rows * (bh + gy) - gy + 20}>
        <g transform="translate(10,10)">
          {items.slice(0, k).map((it, i) => {
            const [x, y] = pos(i);
            const next = i + 1 < k ? pos(i + 1) : null;
            return (
              <g key={i}>
                {next && (next[1] === y
                  ? <Arrow x1={x + bw} y1={y + bh / 2} x2={next[0]} y2={y + bh / 2} color={C.muted} width={5} head={16} pad={4} />
                  : <path d={`M${x + bw / 2},${y + bh} L${x + bw / 2},${y + bh + gy / 2} L${next[0] + bw / 2},${y + bh + gy / 2} L${next[0] + bw / 2},${next[1] - 6}`} fill="none" stroke={C.muted} strokeWidth={5} />)}
                <rect x={x} y={y} width={bw} height={bh} rx={20} fill={SOFT[i % SOFT.length]} stroke={PAL[i % PAL.length]} strokeWidth={4} />
                <circle cx={x + 30} cy={y + 30} r={20} fill={PAL[i % PAL.length]} />
                <Txt x={x + 30} y={y + 30} s={22} w={800} fill="#fff">{i + 1}</Txt>
                <foreignObject x={x + 12} y={y + 50} width={bw - 24} height={bh - 56}>
                  <div style={{ fontSize: Math.min(28, bw / 9), fontWeight: 700, lineHeight: 1.2, textAlign: "center", color: C.ink }}>{it.t}</div>
                </foreignObject>
              </g>
            );
          })}
        </g>
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- cards (tap to flip)
export function Cards({ cards, cols, interactive }) {
  const [flip, setFlip] = useState({});
  const n = cards.length, cc = cols || (n <= 3 ? n : n === 4 ? 2 : 3), rr = Math.ceil(n / cc);
  return (
    <Panel controls={interactive && <><Btn wide onClick={() => setFlip(Object.fromEntries(cards.map((_, i) => [i, true])))}>Show all</Btn><Btn wide onClick={() => setFlip({})}>Hide all</Btn></>}>
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: `repeat(${cc},1fr)`, gridTemplateRows: `repeat(${rr},1fr)`, gap: 18 }}>
        {cards.map((c, i) => {
          const f = !!flip[i];
          return (
            <button key={i} data-noswipe onClick={() => interactive && setFlip((s) => ({ ...s, [i]: !s[i] }))}
              style={{ border: `3px solid ${PAL[i % PAL.length]}`, borderRadius: 20, background: f ? PAL[i % PAL.length] : SOFT[i % SOFT.length],
                color: f ? "#fff" : C.ink, padding: "14px 18px", cursor: interactive ? "pointer" : "default", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 8, textAlign: "center", minHeight: 0, overflow: "hidden", fontFamily: "inherit" }}>
              {!f && c.icon && <span style={{ fontSize: rr > 2 ? 40 : 56, lineHeight: 1 }}>{c.icon}</span>}
              <span style={{ fontSize: f ? (rr > 2 ? 26 : 30) : rr > 2 ? 28 : 34, fontWeight: f ? 600 : 800, lineHeight: 1.25 }}>{f ? c.back : c.front}</span>
              {!f && interactive && <span style={{ fontSize: 18, opacity: 0.6 }}>tap to flip</span>}
            </button>
          );
        })}
      </div>
    </Panel>
  );
}

// ---------------------------------------------------------------- decision tree
function layout(node, depth, out, leaves) {
  if (node.leaf) { const x = leaves.n++; out.push({ node, depth, x }); return x; }
  const xs = [layout(node.yes, depth + 1, out, leaves), layout(node.no, depth + 1, out, leaves)];
  const x = (xs[0] + xs[1]) / 2;
  out.push({ node, depth, x, kids: [node.yes, node.no] });
  return x;
}
export function Tree({ tree, interactive }) {
  const [path, setPath] = useState([tree]);
  const items = [], leaves = { n: 0 };
  layout(tree, 0, items, leaves);
  const depth = Math.max(...items.map((i) => i.depth)) + 1;
  const W = 1300, lw = W / leaves.n, rh = Math.min(190, 600 / depth);
  const P = new Map(items.map((i) => [i.node, [i.x * lw + lw / 2, i.depth * rh + 60]]));
  const cur = path[path.length - 1];
  const onPath = (n) => path.includes(n);
  return (
    <Panel readout={cur.leaf ? `Decision: ${cur.leaf}` : interactive ? cur.q : null}
      controls={interactive && (cur.leaf ? <Btn wide onClick={() => setPath([tree])}>Start again</Btn>
        : <><Btn wide onClick={() => setPath((p) => [...p, cur.yes])}>Yes</Btn><Btn wide onClick={() => setPath((p) => [...p, cur.no])}>No</Btn></>)}>
      <Svg w={W} h={depth * rh + 40}>
        {items.filter((i) => i.kids).map((i) => i.kids.map((k, j) => {
          const [x1, y1] = P.get(i.node), [x2, y2] = P.get(k), hot = interactive && onPath(i.node) && onPath(k);
          return (
            <g key={`${i.x}-${j}`}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={hot ? C.orange : C.line} strokeWidth={hot ? 7 : 4} />
              <Txt x={(x1 + x2) / 2 + (j ? 30 : -30)} y={(y1 + y2) / 2} s={28} w={800} fill={j ? C.red : C.green}>{j ? "No" : "Yes"}</Txt>
            </g>
          );
        }))}
        {items.map((i, k) => {
          const [x, y] = P.get(i.node), hot = interactive && onPath(i.node), bw = Math.min(lw - 16, 380);
          return (
            <g key={k}>
              <rect x={x - bw / 2} y={y - 48} width={bw} height={96} rx={i.node.leaf ? 48 : 14} fill={hot ? (i.node.leaf ? C.green : C.orange) : i.node.leaf ? C.greenSoft : C.blueSoft} stroke={i.node.leaf ? C.green : C.blue} strokeWidth={3} />
              <foreignObject x={x - bw / 2 + 6} y={y - 46} width={bw - 12} height={92}>
                <div style={{ height: 92, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: Math.min(32, bw / 9), fontWeight: 700, lineHeight: 1.15, color: hot ? "#fff" : C.ink }}>{i.node.leaf || i.node.q}</div>
              </foreignObject>
            </g>
          );
        })}
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- hub
export function Hub({ center, spokes, interactive }) {
  const [sel, setSel] = useState(null);
  const n = spokes.length, cx = 650, cy = 300;
  return (
    <Panel readout={sel != null ? `${spokes[sel].label}: ${spokes[sel].items.join(" · ")}` : interactive ? "Tap a branch to see examples" : null}>
      <Svg w={1300} h={600}>
        {spokes.map((s, i) => {
          const a = (-90 + (360 / n) * i) * Math.PI / 180, x = cx + 470 * Math.cos(a), y = cy + 220 * Math.sin(a);
          return (
            <g key={i} style={{ cursor: interactive ? "pointer" : "default" }} onClick={() => interactive && setSel(i)}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={PAL[i % PAL.length]} strokeWidth={6} />
              <rect x={x - 150} y={y - 50} width={300} height={100} rx={50} fill={sel === i ? PAL[i % PAL.length] : SOFT[i % SOFT.length]} stroke={PAL[i % PAL.length]} strokeWidth={4} />
              <Txt x={x} y={y} s={28} w={800} fill={sel === i ? "#fff" : C.ink}>{s.label}</Txt>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={100} fill={C.ink} />
        <Txt x={cx} y={cy} s={36} w={800} fill="#fff">{center}</Txt>
      </Svg>
    </Panel>
  );
}

// ---------------------------------------------------------------- bias
// Illustrative: a model learns well only for groups it has seen enough of.
export function Bias({ groups = ["Group A", "Group B"], skewed = [18, 2], balanced = [10, 10], what = "faces", interactive }) {
  const [bal, setBal] = useState(false);
  const counts = bal ? balanced : skewed;
  const acc = counts.map((c) => Math.round(50 + 45 * Math.min(1, c / 9)));
  const cols = [C.blue, C.orange, C.purple];
  const person = (x, y, col, k) => (
    <g key={k}><circle cx={x} cy={y - 18} r={13} fill={col} /><path d={`M${x - 18},${y + 22} Q${x},${y - 12} ${x + 18},${y + 22} Z`} fill={col} /></g>
  );
  return (
    <Panel readout={`${bal ? "Balanced" : "Unbalanced"} training data → ${groups.map((g, i) => `${g}: ${acc[i]}% correct`).join(" · ")}`}
      controls={interactive && <><Btn wide active={!bal} onClick={() => setBal(false)}>Unbalanced data</Btn><Btn wide active={bal} onClick={() => setBal(true)}>Balanced data</Btn></>}>
      <Svg w={1300} h={460}>
        <rect x={0} y={0} width={620} height={440} rx={20} fill={C.faint} />
        <Txt x={310} y={34} s={26} w={800}>{`Training ${what}`}</Txt>
        {counts.flatMap((c, gi) => Array.from({ length: c }, (_, k) => {
          const idx = counts.slice(0, gi).reduce((a, b) => a + b, 0) + k;
          return person(70 + (idx % 8) * 68, 110 + Math.floor(idx / 8) * 90, cols[gi], `${gi}-${k}`);
        }))}
        <Arrow x1={640} y1={220} x2={720} y2={220} color={C.muted} width={6} head={20} />
        <Txt x={680} y={180} s={22} w={700} fill={C.muted}>learns</Txt>
        {groups.map((g, i) => (
          <g key={g} transform={`translate(750,${70 + i * 170})`}>
            <Txt x={0} y={0} a="start" s={28} w={800} fill={cols[i]}>{g}</Txt>
            <rect x={0} y={30} width={520} height={60} rx={12} fill="#fff" stroke={C.line} strokeWidth={3} />
            <rect x={0} y={30} width={520 * acc[i] / 100} height={60} rx={12} fill={acc[i] > 85 ? C.green : acc[i] > 70 ? C.yellow : C.red} style={{ transition: "width .5s" }} />
            <Txt x={20} y={60} a="start" s={28} w={800} fill="#fff">{`${acc[i]}% correct`}</Txt>
          </g>
        ))}
      </Svg>
    </Panel>
  );
}
