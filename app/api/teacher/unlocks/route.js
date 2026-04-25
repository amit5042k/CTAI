import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  findSectionById,
  setUnitUnlocked,
  listUnlocks,
} from "@/lib/db";
import { findUnit } from "@/lib/curriculumServer";

function teaches(user, section) {
  if (!section) return false;
  if (user.role === "admin" && user.schoolId === section.schoolId) return true;
  if (section.classTeacherId === user.id) return true;
  if (Array.isArray(section.teacherIds) && section.teacherIds.includes(user.id))
    return true;
  return false;
}

export async function GET(req) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "teacher" && user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("sectionId");
  if (!sectionId)
    return NextResponse.json({ error: "sectionId is required" }, { status: 400 });
  const section = findSectionById(sectionId);
  if (!teaches(user, section))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({ unlocks: listUnlocks({ sectionId }) });
}

export async function POST(req) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "teacher" && user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { sectionId, unitId, unlocked } = await req.json();
  if (!sectionId || !unitId)
    return NextResponse.json(
      { error: "sectionId and unitId are required" },
      { status: 400 },
    );
  const section = findSectionById(sectionId);
  if (!teaches(user, section))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const found = findUnit(unitId);
  if (!found || found.classLevel !== section.classLevel)
    return NextResponse.json(
      { error: "Unit does not belong to this section's class" },
      { status: 400 },
    );
  setUnitUnlocked(sectionId, unitId, user.id, !!unlocked);
  return NextResponse.json({ ok: true });
}
