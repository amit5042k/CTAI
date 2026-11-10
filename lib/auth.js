import crypto from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { findUserById } from "./db";
import { SESSION_SECRET } from "./secret";

const SECRET = new TextEncoder().encode(SESSION_SECRET);
const COOKIE_NAME = "ctai_token";
const SEVEN_DAYS = 60 * 60 * 24 * 7;

// Fingerprint of the user's password hash. Stored in the session so that
// changing or resetting a password signs out every existing session.
export function passwordVersion(user) {
  return crypto
    .createHash("sha256")
    .update(String(user?.passwordHash || ""))
    .digest("base64url")
    .slice(0, 16);
}

// Issue a session cookie for a full (DB) user row.
export async function startSession(user) {
  const token = await signSession({
    uid: user.id,
    role: user.role,
    pv: passwordVersion(user),
  });
  await setSessionCookie(token);
}

export async function signSession(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifySession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SEVEN_DAYS,
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const token = cookies().get(COOKIE_NAME)?.value;
  const session = await verifySession(token);
  if (!session?.uid) return null;
  const user = findUserById(session.uid);
  if (!user) return null;
  if (session.pv !== passwordVersion(user)) return null;
  const {
    passwordHash,
    twoFactorSecret,
    pendingTwoFactorSecret,
    ...safe
  } = user;
  return safe;
}

export const SESSION_COOKIE = COOKIE_NAME;
