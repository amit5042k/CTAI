import { notFound, redirect } from "next/navigation";
import { getClass } from "@/data/curriculum";
import { presentations } from "@/data/presentations";
import { findUnit } from "@/lib/curriculumServer";
import { getCurrentUser } from "@/lib/auth";
import { findSchoolById } from "@/lib/db";
import Deck from "@/components/present/Deck";

export const metadata = { title: "Present to class — CTAI Portal" };

const STAFF = new Set(["teacher", "admin", "superadmin"]);

// Builds the slide list for "Present to class" mode. Chapter content comes
// from the curriculum; the illustration, explore prompt, key words and class
// checks come from data/presentations.js. Teacher notes are spread across
// the slides so the right guidance is at hand on each one.
export default async function PresentPage({ params }) {
  const cls = getClass(params.classLevel);
  if (!cls) return notFound();
  const base = cls.units.find((u) => u.id === params.unitId);
  if (!base) return notFound();

  const chapterHref = `/curriculum/${cls.classLevel}/${base.id}`;
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!STAFF.has(user.role)) redirect(chapterHref);

  const unit = findUnit(base.id).unit;
  const p = presentations[unit.id] || {};
  const tn = unit.teacherNotes || {};
  const plan = Array.isArray(tn.lessonPlan) ? tn.lessonPlan : [];
  const stage = (k) => (plan[k] ? `${plan[k].stage}${plan[k].minutes ? ` (~${plan[k].minutes} min)` : ""}: ${plan[k].detail}` : "");
  const list = (title, arr) => (Array.isArray(arr) && arr.length ? `${title}\n${arr.map((x) => `• ${x}`).join("\n")}` : "");
  const join = (...parts) => parts.filter(Boolean).join("\n");

  const [label, ...rest] = unit.name.split(":");
  const meta = {
    classLevel: cls.classLevel,
    stream: unit.stream,
    chapterLabel: rest.length ? label.trim() : "",
    chapterTitle: (rest.length ? rest.join(":") : label).trim(),
    unitName: unit.name,
    schoolName: user.schoolId ? findSchoolById(user.schoolId)?.name || "" : "",
    backHref: chapterHref,
  };

  const visual = p.visual || null;
  const slides = [];
  slides.push({ kind: "title", visual, notes: join(tn.overview, list("CT skills:", tn.ctSkills)) });
  slides.push({ kind: "goals", items: unit.outcomes, notes: stage(0) });
  if (unit.intro || visual) {
    slides.push({ kind: "idea", title: p.bigIdea || "Let's think about it", text: unit.intro || "", visual: p.idea || visual, notes: stage(1) });
  }
  if (visual) {
    slides.push({
      kind: "explore",
      prompt: p.prompt || "Let's explore it together",
      visual: p.explore || visual,
      notes: join(p.exploreNote, stage(2), "Invite students up to the board to tap and try. Ask: what do you notice? what do you wonder?"),
    });
  }
  (unit.examples || []).slice(0, 3).forEach((ex, k) => {
    slides.push({
      kind: "example", n: k + 1, title: ex.title || `Example ${k + 1}`, problem: ex.problem, solution: ex.solution,
      notes: join(ex.takeaway, "Give 30 seconds of think time before revealing. Ask one student to explain their method."),
    });
  });
  (p.checks || []).forEach((c, k) => {
    slides.push({
      kind: "check", n: k + 1, q: c.q, options: c.options, answerIndex: c.answer, answer: c.answerText, explain: c.explain,
      notes: join("Let students tap or show fingers (1–4) for A–D, then reveal.", k === 0 ? list("Watch for these misconceptions:", tn.misconceptions) : ""),
    });
  });
  if ((unit.activities || []).length) {
    slides.push({
      kind: "activity", items: unit.activities, steps: p.activitySteps || [],
      notes: join(...plan.slice(3).map((_, k) => stage(k + 3)), list("Differentiation:", tn.differentiation)),
    });
  }
  slides.push({ kind: "recap", keyWords: p.keyWords || [], items: unit.outcomes, notes: list("Exit-ticket / assessment ideas:", tn.assessmentIdeas) });

  return <Deck meta={meta} slides={slides} />;
}
