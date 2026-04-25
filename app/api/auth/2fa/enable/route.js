import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { findUserById, updateUser } from "@/lib/db";
import { verifyTotp } from "@/lib/totp";

export async function POST(req) {
  const me = await getCurrentUser();
  if (!me)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (me.role !== "superadmin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { code } = await req.json();
  const full = findUserById(me.id);
  if (!full?.pendingTwoFactorSecret)
    return NextResponse.json(
      { error: "Run setup first to get a secret" },
      { status: 400 },
    );

  if (!verifyTotp(full.pendingTwoFactorSecret, code))
    return NextResponse.json(
      { error: "Invalid code. Try the next one shown in your app." },
      { status: 400 },
    );

  updateUser(me.id, {
    twoFactorSecret: full.pendingTwoFactorSecret,
    twoFactorEnabled: true,
    pendingTwoFactorSecret: null,
  });
  return NextResponse.json({ ok: true });
}
