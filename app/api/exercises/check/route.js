import { NextResponse } from "next/server";
import { checkAnswer, findUnit } from "@/lib/curriculumServer";
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
    const result = checkAnswer(unitId, exerciseId, response);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Auto progress: only for signed-in students whose chapter is unlocked.
    const user = await getCurrentUser();
    let progress = null;
    if (user?.role === "student") {
      const found = findUnit(unitId);
      if (found && found.classLevel === user.classLevel) {
        if (user.sectionId && !isUnitUnlocked(user.sectionId, unitId)) {
          return NextResponse.json(
            { error: "This chapter is locked. Ask your teacher to unlock it." },
            { status: 403 },
          );
        }
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
    }
    return NextResponse.json({ ...result, progress });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
