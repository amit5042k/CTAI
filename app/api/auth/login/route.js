import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail, findSchoolByCode } from "@/lib/db";
import { signSession, setSessionCookie } from "@/lib/auth";
import { signChallenge } from "@/lib/twoFactor";

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

    // If 2FA is enabled, do NOT issue the session yet — return a short-lived
    // challenge token that the client exchanges for a session by submitting
    // the TOTP code to /api/auth/2fa/verify.
    if (user.twoFactorEnabled) {
      const challenge = await signChallenge(user.id);
      return NextResponse.json({ needs2FA: true, challenge });
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
