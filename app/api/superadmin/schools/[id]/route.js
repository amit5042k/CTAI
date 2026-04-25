import { NextResponse } from "next/server";
import { requireSuperadmin } from "@/lib/adminGuard";
import { findSchoolById, updateSchool, deleteSchool } from "@/lib/db";

export async function PATCH(req, { params }) {
  const { response } = await requireSuperadmin();
  if (response) return response;
  if (!findSchoolById(params.id))
    return NextResponse.json({ error: "School not found" }, { status: 404 });
  const patch = await req.json();
  const result = updateSchool(params.id, patch);
  if (result?.error)
    return NextResponse.json({ error: result.error }, { status: 409 });
  return NextResponse.json({ school: result.school });
}

export async function DELETE(_req, { params }) {
  const { response } = await requireSuperadmin();
  if (response) return response;
  const ok = deleteSchool(params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
