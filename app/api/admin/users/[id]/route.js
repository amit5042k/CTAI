import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/adminGuard";
import {
  findUserById,
  updateUser,
  deleteUser,
  findSectionById,
} from "@/lib/db";

export async function PATCH(req, { params }) {
  const { user: admin, response } = await requireAdmin();
  if (response) return response;
  const target = findUserById(params.id);
  if (!target)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const body = await req.json();
  const patch = {};
  if (body.name !== undefined) patch.name = String(body.name).trim();
  if (body.classLevel !== undefined) {
    const cl = body.classLevel === null ? null : Number(body.classLevel);
    if (cl !== null && (!Number.isInteger(cl) || cl < 3 || cl > 8)) {
      return NextResponse.json(
        { error: "classLevel must be 3..8 or null" },
        { status: 400 },
      );
    }
    patch.classLevel = cl;
  }
  if (body.sectionId !== undefined) {
    if (body.sectionId === null) patch.sectionId = null;
    else {
      const section = findSectionById(body.sectionId);
      if (!section)
        return NextResponse.json({ error: "Unknown section" }, { status: 400 });
      const cl = patch.classLevel ?? target.classLevel;
      if (target.role === "student" && section.classLevel !== cl) {
        return NextResponse.json(
          { error: "Section is for a different class" },
          { status: 400 },
        );
      }
      patch.sectionId = section.id;
    }
  }
  if (body.password) {
    if (String(body.password).length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }
    patch.passwordHash = await bcrypt.hash(body.password, 10);
  }

  const updated = updateUser(params.id, patch);
  const { passwordHash, ...safe } = updated;
  return NextResponse.json({ user: safe });
}

export async function DELETE(_req, { params }) {
  const { user: admin, response } = await requireAdmin();
  if (response) return response;
  if (admin.id === params.id) {
    return NextResponse.json(
      { error: "You cannot delete yourself" },
      { status: 400 },
    );
  }
  const ok = deleteUser(params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
