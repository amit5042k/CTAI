import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireSuperadmin } from "@/lib/adminGuard";
import {
  createUser,
  findUserByEmail,
  findSchoolById,
  listUsers,
} from "@/lib/db";

export async function GET(req) {
  const { response } = await requireSuperadmin();
  if (response) return response;
  const { searchParams } = new URL(req.url);
  const schoolId = searchParams.get("schoolId") || undefined;
  const filter = { role: "admin" };
  if (schoolId) filter.schoolId = schoolId;
  return NextResponse.json({ admins: listUsers(filter) });
}

export async function POST(req) {
  const { response } = await requireSuperadmin();
  if (response) return response;
  const { name, email, password, schoolId } = await req.json();
  if (!name || !email || !password || !schoolId) {
    return NextResponse.json(
      { error: "name, email, password and schoolId are required" },
      { status: 400 },
    );
  }
  if (String(password).length < 8) {
    return NextResponse.json(
      { error: "Admin password must be at least 8 characters" },
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
  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({
    name,
    email,
    role: "admin",
    classLevel: null,
    sectionId: null,
    schoolId,
    passwordHash,
  });
  const { passwordHash: _ph, ...safe } = user;
  return NextResponse.json({ user: safe });
}
