import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ctaiDataDir } from "./db";

// Key used to sign session cookies. JWT_SECRET wins when set. Otherwise a
// random key is generated once and kept next to the database, so a server
// that forgot to set JWT_SECRET never falls back to a value that is
// published in the source code.
function loadSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  const file = path.join(ctaiDataDir, ".jwt-secret");
  try {
    const existing = fs.readFileSync(file, "utf8").trim();
    if (existing.length >= 32) return existing;
  } catch {}
  const fresh = crypto.randomBytes(48).toString("hex");
  try {
    fs.writeFileSync(file, fresh, { mode: 0o600, flag: "wx" });
  } catch {
    // Another worker created it first: use theirs.
    const raced = fs.readFileSync(file, "utf8").trim();
    if (raced.length >= 32) return raced;
  }
  return fresh;
}

export const SESSION_SECRET = loadSecret();
