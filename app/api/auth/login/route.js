import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail, findSchoolByCode, publicUser } from "@/lib/db";
import { startSession } from "@/lib/auth";
import { signChallenge } from "@/lib/twoFactor";
import { retryAfter, recordFailure, clearFailures, clientIp } from "@/lib/rateLimit";

// Failed sign-ins allowed per 15 minutes, per account and per network address.
const MAX_PER_ACCOUNT = 8;
const MAX_PER_IP = 30;

export async function POST(req) {
  try {
    const { email, password, schoolCode } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }
    const acctKey = `login:acct:${String(email).trim().toLowerCase()}`;
    const ipKey = `login:ip:${clientIp(req)}`;
    if (
      retryAfter([acctKey], MAX_PER_ACCOUNT) ||
      retryAfter([ipKey], MAX_PER_IP)
    ) {
      return NextResponse.json(
        { error: "Too many failed attempts. Please wait 15 minutes and try again." },
        { status: 429 },
      );
    }
    const user = findUserByEmail(email);
    const ok = user
      ? await bcrypt.compare(String(password), user.passwordHash)
      : false;
    if (!ok) {
      recordFailure([acctKey, ipKey]);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }
    clearFailures([acctKey]);

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
    // the TOTP code to /api/auth/2fa/verify. Guard against the data-corruption
    // case where twoFactorEnabled is on but no secret was ever stored
    // (interrupted setup, direct DB edit) — that would lock the user out.
    if (user.twoFactorEnabled && user.twoFactorSecret) {
      const challenge = await signChallenge(user.id);
      return NextResponse.json({ needs2FA: true, challenge });
    }

    await startSession(user);
    return NextResponse.json({ user: publicUser(user) });
  } catch {
    return NextResponse.json(
      { error: "Unable to sign in at this time" },
      { status: 500 },
    );
  }
}
