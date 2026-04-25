import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdmin } from "@/lib/adminGuard";
import {
  createUser,
  findUserByEmail,
  listUsers,
  findSectionById,
} from "@/lib/db";

export async function GET(req) {
  const { response } = await requireAdmin();
  if (response) return response;
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") || undefined;
  return NextResponse.json({ users: listUsers(role ? { role } : {}) });
}

export async function POST(req) {
  const { response } = await requireAdmin();
  if (response) return response;
  const { name, email, password, role, classLevel, sectionId } =
    await req.json();

  if (!name || !email || !password || !role) {
    return NextResponse.json(
      { error: "name, email, password and role are required" },
      { status: 400 },
    );
  }
  if (!["student", "teacher"].includes(role)) {
    return NextResponse.json(
      { error: "role must be 'student' or 'teacher'" },
      { status: 400 },
    );
  }
  if (String(password).length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 },
    );
  }
  if (findUserByEmail(email)) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 },
    );
  }

  let cl = null;
  let sec = null;
  if (role === "student") {
    cl = Number(classLevel);
    if (!Number.isInteger(cl) || cl < 3 || cl > 8) {
      return NextResponse.json(
        { error: "Students must be assigned to a class between 3 and 8" },
        { status: 400 },
      );
    }
    if (sectionId) {
      const section = findSectionById(sectionId);
      if (!section || section.classLevel !== cl) {
        return NextResponse.json(
          { error: "Section does not belong to the chosen class" },
          { status: 400 },
        );
      }
      sec = section.id;
    }
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({
    name,
    email,
    role,
    classLevel: cl,
    sectionId: sec,
    passwordHash,
  });
  const { passwordHash: _ph, ...safe } = user;
  return NextResponse.json({ user: safe });
}
