#!/usr/bin/env node
/**
 * Seed an admin or superadmin into data/store.json without using the web bootstrap.
 *
 * Usage:
 *   node scripts/create-admin.js --role superadmin --email root@portal.in --password mySecret123 --name "Root"
 *   node scripts/create-admin.js --role admin --school SVB-DEL --email principal@svb.in --password schoolPass1
 *
 * Or via env vars:
 *   ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, ADMIN_ROLE (default: superadmin),
 *   ADMIN_SCHOOL (school code, required when role=admin)
 *
 * Safe to run multiple times: if a user with the same email already
 * exists, its password is reset and role/school updated.
 */

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const bcrypt = require("bcryptjs");

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
const role = (args.role || process.env.ADMIN_ROLE || "superadmin").toLowerCase();
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
const STORE_FILE = path.join(DATA_DIR, "store.json");
const EMPTY = { users: [], progress: [], sections: [], schools: [] };

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
let store = EMPTY;
if (fs.existsSync(STORE_FILE)) {
  try {
    store = { ...EMPTY, ...JSON.parse(fs.readFileSync(STORE_FILE, "utf-8")) };
  } catch {
    store = EMPTY;
  }
}

let schoolId = null;
if (role === "admin") {
  if (!schoolCode) {
    console.error(
      "When --role=admin you must also pass --school <code> (or ADMIN_SCHOOL).",
    );
    process.exit(1);
  }
  const school = store.schools.find(
    (s) => s.code.toLowerCase() === schoolCode.toLowerCase(),
  );
  if (!school) {
    console.error(
      `School with code '${schoolCode}' not found. Existing codes: ${store.schools
        .map((s) => s.code)
        .join(", ") || "(none)"}`,
    );
    process.exit(1);
  }
  schoolId = school.id;
}

const passwordHash = bcrypt.hashSync(password, 10);
const existing = store.users.find((u) => u.email === email);

if (existing) {
  existing.role = role;
  existing.passwordHash = passwordHash;
  existing.name = name;
  existing.schoolId = schoolId;
  console.log(`Updated existing ${role}: ${email}`);
} else {
  store.users.push({
    id: crypto.randomUUID(),
    name,
    email,
    role,
    classLevel: null,
    sectionId: null,
    schoolId,
    passwordHash,
    createdAt: new Date().toISOString(),
  });
  console.log(`Created ${role}: ${email}`);
}

fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
console.log(`Wrote ${STORE_FILE}`);
