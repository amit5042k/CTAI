import { NextResponse } from "next/server";
import { findUserById, publicUser } from "@/lib/db";
import { signSession, setSessionCookie } from "@/lib/auth";
import { verifyChallenge } from "@/lib/twoFactor";
import { verifyTotp } from "@/lib/totp";

export async function POST(req) {
  const { challenge, code } = await req.json();
  const uid = await verifyChallenge(challenge);
  if (!uid)
    return NextResponse.json(
      { error: "Login attempt expired. Sign in again." },
      { status: 401 },
    );
  const user = findUserById(uid);
  if (!user || !user.twoFactorEnabled)
    return NextResponse.json(
      { error: "Account state changed. Sign in again." },
      { status: 401 },
    );
  if (!verifyTotp(user.twoFactorSecret, code))
    return NextResponse.json(
      { error: "Invalid code. Try the next one shown in your app." },
      { status: 400 },
    );
  const token = await signSession({ uid: user.id, role: user.role });
  await setSessionCookie(token);
  return NextResponse.json({ user: publicUser(user) });
}
