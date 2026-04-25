import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth";
import { findUserById, updateUser } from "@/lib/db";
import { verifyTotp } from "@/lib/totp";

// Disabling 2FA requires the password AND a valid TOTP code.
export async function POST(req) {
  const me = await getCurrentUser();
  if (!me)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { password, code } = await req.json();
  const full = findUserById(me.id);
  if (!full?.twoFactorEnabled)
    return NextResponse.json(
      { error: "2FA is not currently enabled" },
      { status: 400 },
    );
  const ok = await bcrypt.compare(password || "", full.passwordHash);
  if (!ok)
    return NextResponse.json(
      { error: "Password is incorrect" },
      { status: 401 },
    );
  if (!verifyTotp(full.twoFactorSecret, code))
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  updateUser(me.id, {
    twoFactorEnabled: false,
    twoFactorSecret: null,
    pendingTwoFactorSecret: null,
  });
  return NextResponse.json({ ok: true });
}
