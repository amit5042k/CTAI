import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { findUserById } from "./db";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret-change-me-please-use-env",
);
const COOKIE_NAME = "ctai_token";
const SEVEN_DAYS = 60 * 60 * 24 * 7;

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
  const {
    passwordHash,
    twoFactorSecret,
    pendingTwoFactorSecret,
    ...safe
  } = user;
  return safe;
}

export const SESSION_COOKIE = COOKIE_NAME;
