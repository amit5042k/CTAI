import { curriculum } from "@/data/curriculum";
import { extraExercises } from "@/data/extra-exercises";
import { answerAlternates } from "@/data/answer-alternates";

// Lenient comparison for typed answers: ignores case, spacing, ×/*/x
// differences, unicode minus signs, hyphens inside words and a trailing
// full stop. Numeric keys also accept equal numbers with a trailing unit
// ("240 km", "90°", "₹15", "3,600").
function normalise(s) {
  return String(s ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[−–—]/g, "-")
    .replace(/[×*]/g, "x")
    .replace(/(?<=[a-z])-(?=[a-z])/g, "")
    .replace(/[\s^"'`]/g, "")
    .replace(/\.$/, "");
}

const NUMERIC = /^-?\d+(\.\d+)?$/;

function shortAnswerMatches(response, expected) {
  if (normalise(response) === normalise(expected)) return true;
  if (NUMERIC.test(String(expected).trim())) {
    const m = normalise(response)
      .replace(/^(rs\.?|₹)/, "")
      .match(/^(-?)([\d,]+(?:\.\d+)?)[a-z°%²³₹]*$/);
    if (!m) return false;
    let digits = m[2];
    if (digits.includes(",")) {
      const intPart = digits.split(".")[0];
      const international = /^\d{1,3}(,\d{3})+$/.test(intPart);
      const indian = /^\d{1,2}(,\d{2})*,\d{3}$/.test(intPart);
      if (!international && !indian) return false;
      digits = digits.replace(/,/g, "");
    }
    return Number(m[1] + digits) === Number(expected);
  }
  return false;
}

function mergeExercises(unitId, baseExercises) {
  const extras = extraExercises[unitId] || [];
  return [...(baseExercises || []), ...extras];
}

export function findUnit(unitId) {
  for (const cls of curriculum) {
    const unit = cls.units.find((u) => u.id === unitId);
    if (unit) {
      const merged = {
        ...unit,
        exercises: mergeExercises(unitId, unit.exercises),
      };
      return { unit: merged, classLevel: cls.classLevel };
    }
  }
  return null;
}

// Number of graded questions a chapter exposes — sums the in-source
// exercises with any extras from data/extra-exercises.js.
export function getExerciseCount(unitId, baseExercises) {
  return mergeExercises(unitId, baseExercises).length;
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
    const accepted = [ex.answer, ...(answerAlternates[`${unitId}:${exerciseId}`] || [])];
    correct = accepted.some((a) => shortAnswerMatches(response, a));
    correctAnswer = ex.answer;
  }
  return {
    ok: true,
    correct,
    correctAnswer,
    explanation: ex.explanation || "",
  };
}
