import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth";
import { findUserById, updateUser } from "@/lib/db";

export async function POST(req) {
  const me = await getCurrentUser();
  if (!me)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword)
    return NextResponse.json(
      { error: "Both current and new password are required" },
      { status: 400 },
    );

  const minLen = me.role === "superadmin" || me.role === "admin" ? 8 : 6;
  if (String(newPassword).length < minLen)
    return NextResponse.json(
      { error: `New password must be at least ${minLen} characters` },
      { status: 400 },
    );
  if (currentPassword === newPassword)
    return NextResponse.json(
      { error: "New password must be different from the current one" },
      { status: 400 },
    );

  const fullUser = findUserById(me.id);
  if (!fullUser)
    return NextResponse.json({ error: "Account missing" }, { status: 404 });

  const ok = await bcrypt.compare(currentPassword, fullUser.passwordHash);
  if (!ok)
    return NextResponse.json(
      { error: "Current password is incorrect" },
      { status: 401 },
    );

  const passwordHash = await bcrypt.hash(newPassword, 10);
  updateUser(me.id, { passwordHash });
  return NextResponse.json({ ok: true });
}
