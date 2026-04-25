import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireSuperadmin } from "@/lib/adminGuard";
import {
  findUserById,
  updateUser,
  deleteUser,
  findSchoolById,
} from "@/lib/db";

export async function PATCH(req, { params }) {
  const { user: actor, response } = await requireSuperadmin();
  if (response) return response;
  const target = findUserById(params.id);
  if (!target || target.role !== "admin")
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });

  const body = await req.json();
  const patch = {};
  if (body.name !== undefined) patch.name = String(body.name).trim();
  if (body.schoolId !== undefined) {
    if (body.schoolId === null) patch.schoolId = null;
    else if (!findSchoolById(body.schoolId))
      return NextResponse.json({ error: "Unknown school" }, { status: 400 });
    else patch.schoolId = body.schoolId;
  }
  if (body.password) {
    if (String(body.password).length < 8)
      return NextResponse.json(
        { error: "Admin password must be at least 8 characters" },
        { status: 400 },
      );
    patch.passwordHash = await bcrypt.hash(body.password, 10);
  }
  const updated = updateUser(params.id, patch);
  const { passwordHash, ...safe } = updated;
  return NextResponse.json({ user: safe });
}

export async function DELETE(_req, { params }) {
  const { user: actor, response } = await requireSuperadmin();
  if (response) return response;
  if (actor.id === params.id)
    return NextResponse.json(
      { error: "You cannot delete yourself" },
      { status: 400 },
    );
  const target = findUserById(params.id);
  if (!target || target.role !== "admin")
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  deleteUser(params.id);
  return NextResponse.json({ ok: true });
}
