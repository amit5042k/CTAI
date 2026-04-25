#!/usr/bin/env node
/**
 * Seed an admin or superadmin into data/portal.db without using the web bootstrap.
 *
 * Usage:
 *   node scripts/create-admin.js --role superadmin --email root@portal.in --password mySecret123 --name "Root"
 *   node scripts/create-admin.js --role admin --school SVB-DEL --email principal@svb.in --password schoolPass1
 *
 * Or via env vars:
 *   ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, ADMIN_ROLE (default: superadmin),
 *   ADMIN_SCHOOL (school code, required when role=admin)
 *
 * Safe to run multiple times: existing emails get their password reset
 * and role/school updated.
 */

const path = require("node:path");
const crypto = require("node:crypto");
const fs = require("node:fs");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");

function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const val =
        argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
      out[key] = val;
    }
  }
  return out;
}

const args = parseArgs(process.argv);
const email = (args.email || process.env.ADMIN_EMAIL || "").toLowerCase();
const password = args.password || process.env.ADMIN_PASSWORD || "";
const name = args.name || process.env.ADMIN_NAME || "Administrator";
const role = (
  args.role ||
  process.env.ADMIN_ROLE ||
  "superadmin"
).toLowerCase();
const schoolCode = args.school || process.env.ADMIN_SCHOOL || "";

if (!["superadmin", "admin"].includes(role)) {
  console.error("--role must be 'superadmin' or 'admin'.");
  process.exit(1);
}
if (!email || !password) {
  console.error(
    "Missing --email or --password (or ADMIN_EMAIL / ADMIN_PASSWORD env vars).",
  );
  process.exit(1);
}
if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "portal.db");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new Database(DB_FILE);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Make sure tables exist (for the case where the script is run before
// the Next.js server has booted and run its own migrations).
db.exec(`
  CREATE TABLE IF NOT EXISTS schools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    logoExt TEXT,
    logoMime TEXT,
    createdAt TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    role TEXT NOT NULL,
    classLevel INTEGER,
    sectionId TEXT,
    schoolId TEXT,
    passwordHash TEXT NOT NULL,
    twoFactorEnabled INTEGER DEFAULT 0,
    twoFactorSecret TEXT,
    pendingTwoFactorSecret TEXT,
    createdAt TEXT NOT NULL
  );
`);

let schoolId = null;
if (role === "admin") {
  if (!schoolCode) {
    console.error(
      "When --role=admin you must also pass --school <code> (or ADMIN_SCHOOL).",
    );
    process.exit(1);
  }
  const school = db
    .prepare(`SELECT * FROM schools WHERE code = ? COLLATE NOCASE`)
    .get(schoolCode);
  if (!school) {
    const codes = db
      .prepare(`SELECT code FROM schools`)
      .all()
      .map((s) => s.code)
      .join(", ");
    console.error(
      `School with code '${schoolCode}' not found. Existing codes: ${
        codes || "(none)"
      }`,
    );
    process.exit(1);
  }
  schoolId = school.id;
}

const passwordHash = bcrypt.hashSync(password, 10);
const existing = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);

if (existing) {
  db.prepare(
    `UPDATE users SET role = ?, passwordHash = ?, name = ?, schoolId = ? WHERE id = ?`,
  ).run(role, passwordHash, name, schoolId, existing.id);
  console.log(`Updated existing ${role}: ${email}`);
} else {
  db.prepare(
    `INSERT INTO users
       (id, name, email, role, classLevel, sectionId, schoolId,
        passwordHash, twoFactorEnabled, twoFactorSecret,
        pendingTwoFactorSecret, createdAt)
     VALUES (?, ?, ?, ?, NULL, NULL, ?, ?, 0, NULL, NULL, ?)`,
  ).run(
    crypto.randomUUID(),
    name,
    email,
    role,
    schoolId,
    passwordHash,
    new Date().toISOString(),
  );
  console.log(`Created ${role}: ${email}`);
}

console.log(`Wrote ${DB_FILE}`);
