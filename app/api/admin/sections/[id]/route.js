import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminGuard";
import { updateSection, deleteSection, findSectionById } from "@/lib/db";

export async function PATCH(req, { params }) {
  const { response } = await requireAdmin();
  if (response) return response;
  const existing = findSectionById(params.id);
  if (!existing)
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  const patch = await req.json();
  const allowed = {};
  if (patch.name !== undefined) allowed.name = String(patch.name).trim();
  if (patch.classTeacherId !== undefined)
    allowed.classTeacherId = patch.classTeacherId || null;
  const updated = updateSection(params.id, allowed);
  return NextResponse.json({ section: updated });
}

export async function DELETE(_req, { params }) {
  const { response } = await requireAdmin();
  if (response) return response;
  const ok = deleteSection(params.id);
  if (!ok)
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
