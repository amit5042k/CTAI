"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Visual from "./visuals";
import { C } from "./visuals/kit";

const W = 1600;
const H = 900;
const BAR = 76;
const PEN_COLORS = ["#dc2626", "#1f47e0", "#059669", "#0f172a"];

export default function Deck({ meta, slides }) {
  const [i, setI] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [notesOpen, setNotesOpen] = useState(false);
  const [pen, setPen] = useState(null); // colour or null
  const [revealed, setRevealed] = useState({});
  const [picked, setPicked] = useState({});
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const strokes = useRef({}); // slide index -> [{color, pts}]
  const drawing = useRef(null);
  const swipe = useRef(null);

  const n = slides.length;
  const go = useCallback((d) => setI((x) => Math.max(0, Math.min(n - 1, x + d))), [n]);

  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / W, (window.innerHeight - BAR) / H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.("input,textarea,select")) return;
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(1); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
      else if (e.key === "Home") setI(0);
      else if (e.key === "End") setI(n - 1);
      else if (e.key.toLowerCase() === "f") toggleFullscreen();
      else if (e.key.toLowerCase() === "n") setNotesOpen((v) => !v);
      else if (e.key.toLowerCase() === "r") setRevealed((r) => ({ ...r, [i]: true }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, i, n]);

  // ---- pen ----
  const redraw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    for (const s of strokes.current[i] || []) {
      ctx.strokeStyle = s.color; ctx.lineWidth = 6; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath();
      s.pts.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
    }
  }, [i]);
  useEffect(redraw, [redraw]);

  function toStage(e) {
    const r = canvasRef.current.getBoundingClientRect();
    return [(e.clientX - r.left) / scale, (e.clientY - r.top) / scale];
  }
  function penDown(e) {
    if (!pen) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = { color: pen, pts: [toStage(e)] };
    (strokes.current[i] ||= []).push(drawing.current);
  }
  function penMove(e) {
    if (!drawing.current) return;
    drawing.current.pts.push(toStage(e));
    redraw();
  }
  function penUp() { drawing.current = null; }

  // ---- swipe (only when the pen is off and not on an interactive control) ----
  function onPointerDown(e) {
    if (pen || e.target.closest("[data-noswipe],button,input")) return;
    swipe.current = { x: e.clientX, y: e.clientY };
  }
  function onPointerUp(e) {
    const s = swipe.current; swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x, dy = e.clientY - s.y;
    if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else rootRef.current?.requestFullscreen?.();
  }

  const s = slides[i];
  return (
    <div ref={rootRef} style={{ position: "fixed", inset: 0, zIndex: 100, background: "#0b1220",
      display: "flex", flexDirection: "column", userSelect: "none", touchAction: pen ? "none" : "pan-y" }}>
      <div style={{ flex: 1, display: "grid", placeItems: "center", overflow: "hidden" }}
        onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <div style={{ width: W * scale, height: H * scale, position: "relative" }}>
          <div key={i} className="deck-fade" style={{ width: W, height: H, transform: `scale(${scale})`,
            transformOrigin: "top left", position: "absolute", background: "#fff", borderRadius: 6,
            overflow: "hidden", fontFamily: "Inter, 'Segoe UI', system-ui, sans-serif", color: C.ink }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: 8, width: `${((i + 1) / n) * 100}%`,
              background: C.blue, transition: "width .3s" }} />
            <SlideBody s={s} meta={meta} idx={i}
              revealed={!!revealed[i]} reveal={() => setRevealed((r) => ({ ...r, [i]: true }))}
              picked={picked[i]} pick={(k) => setPicked((p) => ({ ...p, [i]: k }))} />
            <div style={{ position: "absolute", left: 56, bottom: 22, fontSize: 20, color: C.muted }}>
              Class {meta.classLevel} · {meta.unitName}
            </div>
            <div style={{ position: "absolute", right: 56, bottom: 22, fontSize: 20, color: C.muted }}>
              {i + 1} / {n}
            </div>
            <canvas ref={canvasRef} width={W} height={H}
              onPointerDown={penDown} onPointerMove={penMove} onPointerUp={penUp} onPointerCancel={penUp}
              style={{ position: "absolute", inset: 0, pointerEvents: pen ? "auto" : "none",
                cursor: pen ? "crosshair" : "default", touchAction: "none" }} />
          </div>
        </div>
      </div>

      {notesOpen && (
        <div style={{ position: "absolute", right: 16, bottom: BAR + 12, width: 460, maxHeight: "55vh",
          overflowY: "auto", background: "#fffbeb", border: "2px solid #f59e0b", borderRadius: 12,
          padding: "14px 18px", fontSize: 17, lineHeight: 1.5, color: "#422006", boxShadow: "0 10px 30px rgba(0,0,0,.35)" }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Teacher notes · slide {i + 1}</div>
          {s.notes ? s.notes.split("\n").map((l, k) => <p key={k} style={{ margin: "0 0 6px" }}>{l}</p>)
            : <p style={{ margin: 0, opacity: .7 }}>No notes for this slide.</p>}
        </div>
      )}

      <div style={{ height: BAR, display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 10, padding: "0 14px", background: "#111a2e", color: "#e2e8f0" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <a href={meta.backHref} style={btn(false)} title="Exit presentation">✕ Exit</a>
          <button style={btn(notesOpen)} onClick={() => setNotesOpen((v) => !v)} title="Teacher notes (N)">Notes</button>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button style={{ ...btn(false), width: 96 }} onClick={() => go(-1)} disabled={i === 0} aria-label="Previous slide">◀</button>
          <span style={{ minWidth: 80, textAlign: "center", fontSize: 18 }}>{i + 1} / {n}</span>
          <button style={{ ...btn(false), width: 96, background: "#1f47e0" }} onClick={() => go(1)} disabled={i === n - 1} aria-label="Next slide">▶</button>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {PEN_COLORS.map((c) => (
            <button key={c} onClick={() => setPen(pen === c ? null : c)} title="Draw"
              aria-label={`Pen ${c}`}
              style={{ ...btn(pen === c), width: 52, padding: 0 }}>
              <span style={{ display: "inline-block", width: 22, height: 22, borderRadius: 11, background: c,
                border: "2px solid #fff" }} />
            </button>
          ))}
          <button style={btn(false)} onClick={() => { strokes.current[i] = []; redraw(); }}>Clear</button>
          <button style={btn(false)} onClick={toggleFullscreen} title="Full screen (F)">⛶ Full screen</button>
        </div>
      </div>
      <style>{`.deck-fade{animation:deckIn .25s ease-out}@keyframes deckIn{from{opacity:.25}to{opacity:1}}`}</style>
    </div>
  );
}

function btn(active) {
  return {
    height: 54, minWidth: 54, padding: "0 16px", borderRadius: 10, border: "1px solid #334155",
    background: active ? "#f59e0b" : "#1e293b", color: active ? "#111" : "#e2e8f0",
    fontSize: 18, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center",
    justifyContent: "center", textDecoration: "none",
  };
}

// ----------------------------------------------------------------------------

const T = {
  kicker: { fontSize: 24, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: C.blue },
  h: { fontSize: 60, fontWeight: 800, lineHeight: 1.1, margin: "10px 0 0", letterSpacing: "-0.01em" },
  body: { fontSize: 36, lineHeight: 1.4 },
};

function Frame({ kicker, title, children, pad = "64px 72px 70px" }) {
  return (
    <div style={{ position: "absolute", inset: 0, padding: pad, display: "flex", flexDirection: "column" }}>
      {kicker && <div style={T.kicker}>{kicker}</div>}
      {title && <h2 style={T.h}>{title}</h2>}
      <div style={{ flex: 1, minHeight: 0, marginTop: title ? 28 : 0, display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  );
}

function BigButton({ children, onClick, color = C.blue }) {
  return (
    <button data-noswipe onClick={onClick} style={{ alignSelf: "flex-start", height: 76, padding: "0 36px",
      fontSize: 30, fontWeight: 700, borderRadius: 14, border: 0, background: color, color: "#fff", cursor: "pointer" }}>
      {children}
    </button>
  );
}

function SlideBody({ s, meta, revealed, reveal, picked, pick }) {
  switch (s.kind) {
    case "title":
      return (
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1.1fr 1fr" }}>
          <div style={{ background: C.blue, color: "#fff", padding: "90px 70px", display: "flex",
            flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", opacity: .85 }}>
              Class {meta.classLevel} · {meta.stream === "AI" ? "Artificial Intelligence" : "Computational Thinking"}
            </div>
            <div style={{ fontSize: 30, marginTop: 30, opacity: .9 }}>{meta.chapterLabel}</div>
            <h1 style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, margin: "8px 0 0" }}>{meta.chapterTitle}</h1>
            {meta.schoolName && <div style={{ fontSize: 24, marginTop: 40, opacity: .8 }}>{meta.schoolName}</div>}
          </div>
          <div style={{ padding: 40, display: "flex" }}><Visual spec={s.visual} /></div>
        </div>
      );
    case "goals":
      return (
        <Frame kicker="Today we will learn to…" title="Learning goals">
          <ol style={{ ...T.body, margin: 0, paddingLeft: 0, listStyle: "none" }}>
            {s.items.map((t, k) => (
              <li key={k} style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 30 }}>
                <span style={{ flex: "none", width: 60, height: 60, borderRadius: 30, background: C.blueSoft,
                  color: C.blue, fontWeight: 800, display: "grid", placeItems: "center" }}>{k + 1}</span>
                <span style={{ paddingTop: 6 }}>{t}</span>
              </li>
            ))}
          </ol>
        </Frame>
      );
    case "idea":
      return (
        <Frame kicker="The big idea" title={s.title}>
          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, flex: 1, minHeight: 0 }}>
            <p style={{ ...T.body, margin: 0, alignSelf: "center" }}>{s.text}</p>
            <div style={{ display: "flex", minHeight: 0 }}><Visual spec={s.visual} /></div>
          </div>
        </Frame>
      );
    case "explore":
      return (
        <Frame kicker="Explore together" title={s.prompt} pad="54px 64px 66px">
          <div data-noswipe style={{ flex: 1, minHeight: 0, display: "flex" }}><Visual spec={s.visual} interactive /></div>
        </Frame>
      );
    case "example":
      return (
        <Frame kicker={`Worked example ${s.n}`} title={s.title}>
          <div style={{ ...T.body, fontSize: 42, fontWeight: 600, marginBottom: 36 }}>{s.problem}</div>
          {revealed ? (
            <div style={{ ...T.body, background: C.greenSoft, border: `3px solid ${C.green}`, borderRadius: 18,
              padding: "26px 32px" }}>
              <b style={{ color: C.green }}>Solution: </b>{s.solution}
            </div>
          ) : (
            <BigButton onClick={reveal}>Show solution</BigButton>
          )}
          <div style={{ marginTop: "auto", fontSize: 24, color: C.muted }}>Think first · discuss with your partner · then reveal</div>
        </Frame>
      );
    case "check": {
      const correct = s.answerIndex;
      return (
        <Frame kicker={`Class check ${s.n}`} title={null}>
          <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.25, marginBottom: 34 }}>{s.q}</div>
          {s.options ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
              {s.options.map((o, k) => {
                const isRight = revealed && k === correct;
                const isWrong = revealed && picked === k && k !== correct;
                const sel = !revealed && picked === k;
                return (
                  <button key={k} data-noswipe onClick={() => pick(k)} style={{ textAlign: "left", fontSize: 36,
                    padding: "22px 28px", borderRadius: 16, cursor: "pointer", color: C.ink, minHeight: 96,
                    border: `3px solid ${isRight ? C.green : isWrong ? C.red : sel ? C.blue : C.line}`,
                    background: isRight ? C.greenSoft : isWrong ? C.redSoft : sel ? C.blueSoft : "#fff" }}>
                    <b style={{ color: C.muted, marginRight: 14 }}>{"ABCD"[k]}</b>{o}
                  </button>
                );
              })}
            </div>
          ) : (
            <div style={{ fontSize: 30, color: C.muted }}>Ask the class to answer on their slates or out loud.</div>
          )}
          <div style={{ marginTop: 30 }}>
            {revealed ? (
              <div style={{ ...T.body, fontSize: 32, background: C.greenSoft, borderRadius: 16, padding: "20px 28px",
                borderLeft: `8px solid ${C.green}` }}>
                <b style={{ color: C.green }}>Answer: {s.options ? s.options[correct] : s.answer}</b>
                {s.explain && <span> — {s.explain}</span>}
              </div>
            ) : (
              <BigButton onClick={reveal} color={C.green}>Reveal answer</BigButton>
            )}
          </div>
        </Frame>
      );
    }
    case "activity":
      return (
        <Frame kicker="Activity time" title="Let's do it!">
          <div style={{ display: "grid", gridTemplateColumns: s.steps?.length ? "1fr 1fr" : "1fr", gap: 40 }}>
            <div>
              {s.items.map((t, k) => (
                <div key={k} style={{ ...T.body, background: C.orangeSoft, borderRadius: 18, padding: "24px 30px",
                  marginBottom: 22, borderLeft: `10px solid ${C.orange}`, fontWeight: 600 }}>{t}</div>
              ))}
            </div>
            {s.steps?.length > 0 && (
              <ol style={{ fontSize: 30, lineHeight: 1.4, margin: 0, paddingLeft: 40 }}>
                {s.steps.map((t, k) => <li key={k} style={{ marginBottom: 16 }}>{t}</li>)}
              </ol>
            )}
          </div>
        </Frame>
      );
    case "recap":
      return (
        <Frame kicker="Recap" title="What we learned">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
            {s.keyWords.map((w) => (
              <span key={w} style={{ fontSize: 32, fontWeight: 700, padding: "12px 26px", borderRadius: 999,
                background: C.blueSoft, color: C.blue }}>{w}</span>
            ))}
          </div>
          <ul style={{ ...T.body, fontSize: 34, margin: 0, paddingLeft: 0, listStyle: "none" }}>
            {s.items.map((t, k) => (
              <li key={k} style={{ marginBottom: 18 }}><span style={{ color: C.green, fontWeight: 800 }}>✓ I can </span>{lowerFirst(t)}</li>
            ))}
          </ul>
        </Frame>
      );
    default:
      return null;
  }
}

function lowerFirst(t) {
  return t ? t[0].toLowerCase() + t.slice(1) : t;
}
