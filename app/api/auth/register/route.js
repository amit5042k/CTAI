import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, countByRole, publicUser } from "@/lib/db";
import { signSession, setSessionCookie } from "@/lib/auth";

// One-time bootstrap to create the very first SUPERADMIN.
// Disabled the moment a superadmin exists. After that all users are
// created by the superadmin (admins) or by an admin (teachers/students).
export async function POST(req) {
  try {
    if (countByRole("superadmin") > 0) {
      return NextResponse.json(
        {
          error:
            "Sign-up is disabled. Ask the system administrator to enrol you.",
        },
        { status: 403 },
      );
    }

    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 },
      );
    }
    if (String(password).length < 8) {
      return NextResponse.json(
        { error: "Superadmin password must be at least 8 characters" },
        { status: 400 },
      );
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
      role: "superadmin",
      classLevel: null,
      sectionId: null,
      schoolId: null,
      passwordHash,
    });
    const token = await signSession({ uid: user.id, role: user.role });
    await setSessionCookie(token);

    return NextResponse.json({ user: publicUser(user) });
  } catch {
    return NextResponse.json(
      { error: "Unable to bootstrap superadmin" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    superadminExists: countByRole("superadmin") > 0,
  });
}
