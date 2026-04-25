import { SignJWT, jwtVerify } from "jose";

// Short-lived JWT used between password-verify and TOTP-verify.
// Independent from the session secret so a leaked challenge cannot mint
// a real session by itself.
const SECRET = new TextEncoder().encode(
  (process.env.JWT_SECRET || "dev-secret-change-me-please-use-env") +
    "::2fa-challenge",
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
