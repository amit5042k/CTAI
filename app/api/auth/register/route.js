import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, countByRole } from "@/lib/db";
import { signSession, setSessionCookie } from "@/lib/auth";

// Bootstraps the very first admin account.
// Disabled once an admin already exists — after that, all users
// are enrolled by an admin from /admin/users.
export async function POST(req) {
  try {
    if (countByRole("admin") > 0) {
      return NextResponse.json(
        { error: "Sign-up is disabled. Ask an administrator to enrol you." },
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
        { error: "Admin password must be at least 8 characters" },
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
      role: "admin",
      classLevel: null,
      sectionId: null,
      passwordHash,
    });
    const token = await signSession({ uid: user.id, role: user.role });
    await setSessionCookie(token);

    const { passwordHash: _ph, ...safe } = user;
    return NextResponse.json({ user: safe });
  } catch {
    return NextResponse.json(
      { error: "Unable to bootstrap admin account" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ adminExists: countByRole("admin") > 0 });
}
