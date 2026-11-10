import { NextResponse } from "next/server";
import { findUserById, publicUser } from "@/lib/db";
import { startSession } from "@/lib/auth";
import { verifyChallenge } from "@/lib/twoFactor";
import { verifyTotp } from "@/lib/totp";
import { retryAfter, recordFailure, clearFailures } from "@/lib/rateLimit";

// Wrong 6-digit codes allowed per account per 15 minutes.
const MAX_CODE_FAILURES = 6;

export async function POST(req) {
  const { challenge, code } = await req.json();
  const uid = await verifyChallenge(challenge);
  if (!uid)
    return NextResponse.json(
      { error: "Login attempt expired. Sign in again." },
      { status: 401 },
    );
  const user = findUserById(uid);
  if (!user || !user.twoFactorEnabled || !user.twoFactorSecret)
    return NextResponse.json(
      { error: "Account state changed. Sign in again." },
      { status: 401 },
    );
  const key = `2fa:${user.id}`;
  if (retryAfter([key], MAX_CODE_FAILURES))
    return NextResponse.json(
      { error: "Too many wrong codes. Please wait 15 minutes and sign in again." },
      { status: 429 },
    );
  if (!verifyTotp(user.twoFactorSecret, code)) {
    recordFailure([key]);
    return NextResponse.json(
      { error: "Invalid code. Try the next one shown in your app." },
      { status: 400 },
    );
  }
  clearFailures([key]);
  await startSession(user);
  return NextResponse.json({ user: publicUser(user) });
}
