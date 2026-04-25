import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminGuard";
import { listSections, createSection } from "@/lib/db";

export async function GET() {
  const { response } = await requireAdmin();
  if (response) return response;
  return NextResponse.json({ sections: listSections() });
}

export async function POST(req) {
  const { response } = await requireAdmin();
  if (response) return response;
  const { classLevel, name, classTeacherId } = await req.json();
  const cl = Number(classLevel);
  if (!Number.isInteger(cl) || cl < 3 || cl > 8) {
    return NextResponse.json(
      { error: "classLevel must be an integer between 3 and 8" },
      { status: 400 },
    );
  }
  if (!name || !String(name).trim()) {
    return NextResponse.json(
      { error: "Section name is required (e.g. 'A')" },
      { status: 400 },
    );
  }
  const result = createSection({ classLevel: cl, name, classTeacherId });
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }
  return NextResponse.json({ section: result.section });
}
