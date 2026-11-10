import { NextResponse } from "next/server";
import { checkAnswer, findUnit, studentBlockReason } from "@/lib/curriculumServer";
import { getCurrentUser } from "@/lib/auth";
import {
  recordAttempt,
  getAttemptsForUnit,
  setProgress,
  isUnitUnlocked,
} from "@/lib/db";

export async function POST(req) {
  try {
    const { unitId, exerciseId, response } = await req.json();
    if (!unitId || !exerciseId) {
      return NextResponse.json(
        { error: "unitId and exerciseId are required" },
        { status: 400 },
      );
    }
    // Students may only answer chapters of their own class that their
    // section's teacher has unlocked. Check this before marking so the
    // answer key is not revealed for locked chapters.
    const user = await getCurrentUser();
    const found = findUnit(unitId);
    const blocked = found
      ? studentBlockReason(user, found.classLevel, unitId, isUnitUnlocked)
      : null;
    if (blocked) {
      const msg = {
        other_class: "This chapter belongs to another class.",
        no_section: "You are not in a section yet. Ask your school admin.",
        locked: "This chapter is locked. Ask your teacher to unlock it.",
      }[blocked];
      return NextResponse.json({ error: msg }, { status: 403 });
    }

    const result = checkAnswer(unitId, exerciseId, response);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Auto progress for signed-in students.
    let progress = null;
    if (user?.role === "student" && found) {
      recordAttempt({
        userId: user.id,
        unitId,
        exerciseId,
        correct: result.correct,
      });
      const totalQuestions = (found.unit.exercises || []).length;
      const myAttempts = getAttemptsForUnit(user.id, unitId);
      const correctIds = new Set(
        myAttempts.filter((a) => a.correct).map((a) => a.exerciseId),
      );
      const status =
        correctIds.size >= totalQuestions && totalQuestions > 0
          ? "completed"
          : "in_progress";
      progress = setProgress({ userId: user.id, unitId, status });
    }
    return NextResponse.json({ ...result, progress });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
