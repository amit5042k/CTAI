import { curriculum } from "@/data/curriculum";

export function findUnit(unitId) {
  for (const cls of curriculum) {
    const unit = cls.units.find((u) => u.id === unitId);
    if (unit) return { unit, classLevel: cls.classLevel };
  }
  return null;
}

// Strip server-only fields (answers, explanations) from exercises before
// sending the unit to the client.
export function publicUnit(unit) {
  if (!unit) return unit;
  return {
    ...unit,
    exercises: (unit.exercises || []).map(
      ({ answerIndex, answer, explanation, ...rest }) => rest,
    ),
  };
}

export function checkAnswer(unitId, exerciseId, response) {
  const found = findUnit(unitId);
  if (!found) return { ok: false, error: "Unknown unit" };
  const ex = (found.unit.exercises || []).find((e) => e.id === exerciseId);
  if (!ex) return { ok: false, error: "Unknown exercise" };

  let correct = false;
  let correctAnswer = null;
  if (ex.type === "mcq") {
    correct = Number(response) === ex.answerIndex;
    correctAnswer = ex.answerIndex;
  } else if (ex.type === "tf") {
    correct = Boolean(response) === Boolean(ex.answer);
    correctAnswer = ex.answer;
  } else if (ex.type === "short") {
    correct =
      String(response).trim().toLowerCase() ===
      String(ex.answer).trim().toLowerCase();
    correctAnswer = ex.answer;
  }
  return {
    ok: true,
    correct,
    correctAnswer,
    explanation: ex.explanation || "",
  };
}
