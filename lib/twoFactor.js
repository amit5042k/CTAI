import { SignJWT, jwtVerify } from "jose";
import { SESSION_SECRET } from "./secret";

// Short-lived JWT used between password-verify and TOTP-verify.
// Independent from the session secret so a leaked challenge cannot mint
// a real session by itself.
const SECRET = new TextEncoder().encode(
  SESSION_SECRET + "::2fa-challenge",
);

export async function signChallenge(uid) {
  return new SignJWT({ uid })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(SECRET);
}

export async function verifyChallenge(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload?.uid || null;
  } catch {
    return null;
  }
}
