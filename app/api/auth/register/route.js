import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "@/lib/db";
import { signSession, setSessionCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    const { name, email, password, role, classLevel } = await req.json();

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
    if (role === "student") {
      const cl = Number(classLevel);
      if (!Number.isInteger(cl) || cl < 3 || cl > 8) {
        return NextResponse.json(
          { error: "Students must select a class between 3 and 8" },
          { status: 400 },
        );
      }
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

    const passwordHash = await bcrypt.hash(password, 10);
    const user = createUser({
      name,
      email,
      role,
      classLevel: role === "student" ? Number(classLevel) : null,
      passwordHash,
    });

    const token = await signSession({ uid: user.id, role: user.role });
    await setSessionCookie(token);

    const { passwordHash: _ph, ...safe } = user;
    return NextResponse.json({ user: safe });
  } catch (e) {
    return NextResponse.json(
      { error: "Unable to register at this time" },
      { status: 500 },
    );
  }
}
