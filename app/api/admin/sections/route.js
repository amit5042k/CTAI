import { NextResponse } from "next/server";
import { requireAdmin, scopedSchoolId } from "@/lib/adminGuard";
import { listSections, createSection, findSchoolById } from "@/lib/db";

export async function GET(req) {
  const { user, response } = await requireAdmin();
  if (response) return response;
  const { searchParams } = new URL(req.url);
  const schoolId = scopedSchoolId(user, searchParams.get("schoolId"));
  const filter = schoolId ? { schoolId } : {};
  return NextResponse.json({ sections: listSections(filter) });
}

export async function POST(req) {
  const { user, response } = await requireAdmin();
  if (response) return response;
  const body = await req.json();
  const { classLevel, name, classTeacherId, schoolId: bodySchoolId } = body;

  const schoolId = scopedSchoolId(user, bodySchoolId);
  if (!schoolId) {
    return NextResponse.json(
      { error: "schoolId is required" },
      { status: 400 },
    );
  }
  if (!findSchoolById(schoolId)) {
    return NextResponse.json({ error: "Unknown school" }, { status: 400 });
  }

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
  const result = createSection({
    classLevel: cl,
    name,
    classTeacherId,
    schoolId,
  });
  if (result.error)
    return NextResponse.json({ error: result.error }, { status: 409 });
  return NextResponse.json({ section: result.section });
}
