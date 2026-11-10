import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminGuard";
import {
  updateSection,
  deleteSection,
  findSectionById,
  findUserById,
} from "@/lib/db";

// Only teachers of the section's own school may be assigned to it;
// otherwise a teacher from another school would gain access to its
// students and chapter unlocks.
function isSchoolTeacher(id, schoolId) {
  const t = findUserById(id);
  return !!t && t.role === "teacher" && t.schoolId === schoolId;
}

function canTouchSection(user, section) {
  if (!section) return false;
  if (user.role === "superadmin") return true;
  return user.schoolId && user.schoolId === section.schoolId;
}

export async function PATCH(req, { params }) {
  const { user, response } = await requireAdmin();
  if (response) return response;
  const existing = findSectionById(params.id);
  if (!existing)
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  if (!canTouchSection(user, existing))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const patch = await req.json();
  const allowed = {};
  if (patch.name !== undefined) {
    allowed.name = String(patch.name).trim();
    if (!allowed.name)
      return NextResponse.json(
        { error: "Section name is required" },
        { status: 400 },
      );
  }
  if (patch.classTeacherId !== undefined) {
    allowed.classTeacherId = patch.classTeacherId || null;
    if (
      allowed.classTeacherId &&
      !isSchoolTeacher(allowed.classTeacherId, existing.schoolId)
    )
      return NextResponse.json(
        { error: "Class teacher must be a teacher of this school" },
        { status: 400 },
      );
  }
  if (patch.teacherIds !== undefined && Array.isArray(patch.teacherIds)) {
    allowed.teacherIds = patch.teacherIds.filter(Boolean);
    if (!allowed.teacherIds.every((t) => isSchoolTeacher(t, existing.schoolId)))
      return NextResponse.json(
        { error: "Co-teachers must be teachers of this school" },
        { status: 400 },
      );
  }
  const updated = updateSection(params.id, allowed);
  if (updated?.error)
    return NextResponse.json({ error: updated.error }, { status: 409 });
  return NextResponse.json({ section: updated });
}

export async function DELETE(_req, { params }) {
  const { user, response } = await requireAdmin();
  if (response) return response;
  const existing = findSectionById(params.id);
  if (!existing)
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  if (!canTouchSection(user, existing))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  deleteSection(params.id);
  return NextResponse.json({ ok: true });
}
