import { NextResponse } from "next/server";
import { checkAnswer } from "@/lib/curriculumServer";

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
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
