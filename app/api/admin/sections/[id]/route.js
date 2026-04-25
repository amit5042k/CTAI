import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminGuard";
import { updateSection, deleteSection, findSectionById } from "@/lib/db";

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
  if (patch.name !== undefined) allowed.name = String(patch.name).trim();
  if (patch.classTeacherId !== undefined)
    allowed.classTeacherId = patch.classTeacherId || null;
  const updated = updateSection(params.id, allowed);
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
