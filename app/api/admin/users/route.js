import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdmin, scopedSchoolId } from "@/lib/adminGuard";
import {
  createUser,
  findUserByEmail,
  listUsers,
  findSectionById,
  findSchoolById,
} from "@/lib/db";

export async function GET(req) {
  const { user, response } = await requireAdmin();
  if (response) return response;
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") || undefined;
  const schoolId = scopedSchoolId(user, searchParams.get("schoolId"));
  const filter = {};
  if (role) filter.role = role;
  if (schoolId) filter.schoolId = schoolId;
  return NextResponse.json({ users: listUsers(filter) });
}

export async function POST(req) {
  const { user, response } = await requireAdmin();
  if (response) return response;
  const {
    name,
    email,
    password,
    role,
    classLevel,
    sectionId,
    schoolId: bodySchoolId,
  } = await req.json();

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
      if (
        !section ||
        section.classLevel !== cl ||
        section.schoolId !== schoolId
      ) {
        return NextResponse.json(
          { error: "Section does not belong to this school + class" },
          { status: 400 },
        );
      }
      sec = section.id;
    }
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = createUser({
    name,
    email,
    role,
    classLevel: cl,
    sectionId: sec,
    schoolId,
    passwordHash,
  });
  const { passwordHash: _ph, ...safe } = newUser;
  return NextResponse.json({ user: safe });
}
