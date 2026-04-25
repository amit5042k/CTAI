import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail, findSchoolByCode } from "@/lib/db";
import { signSession, setSessionCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password, schoolCode } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }
    const user = findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // If signing in via a school-scoped page, ensure the user belongs to
    // that school. Superadmins are not school-scoped and can sign in from
    // any URL — but they should use /login.
    if (schoolCode) {
      const school = findSchoolByCode(schoolCode);
      if (!school) {
        return NextResponse.json(
          { error: "Unknown school" },
          { status: 404 },
        );
      }
      if (user.role === "superadmin") {
        return NextResponse.json(
          { error: "Superadmin should sign in from /login" },
          { status: 403 },
        );
      }
      if (user.schoolId !== school.id) {
        return NextResponse.json(
          { error: "This account does not belong to this school" },
          { status: 403 },
        );
      }
    }

    const token = await signSession({ uid: user.id, role: user.role });
    await setSessionCookie(token);
    const { passwordHash, ...safe } = user;
    return NextResponse.json({ user: safe });
  } catch {
    return NextResponse.json(
      { error: "Unable to sign in at this time" },
      { status: 500 },
    );
  }
}
