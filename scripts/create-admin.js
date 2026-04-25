#!/usr/bin/env node
/**
 * Seed an admin account into data/store.json without using the web bootstrap.
 *
 * Usage:
 *   node scripts/create-admin.js --email admin@school.in --password mySecret123 --name "Principal"
 *
 * Or via env vars:
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=... ADMIN_NAME=... node scripts/create-admin.js
 *
 * Safe to run multiple times: if an admin with the same email already
 * exists, its password is reset.
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
const EMPTY = { users: [], progress: [], sections: [] };

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
let store = EMPTY;
if (fs.existsSync(STORE_FILE)) {
  try {
    store = { ...EMPTY, ...JSON.parse(fs.readFileSync(STORE_FILE, "utf-8")) };
  } catch {
    store = EMPTY;
  }
}

const passwordHash = bcrypt.hashSync(password, 10);
const existing = store.users.find((u) => u.email === email);

if (existing) {
  existing.role = "admin";
  existing.passwordHash = passwordHash;
  existing.name = name;
  console.log(`Updated existing admin: ${email}`);
} else {
  store.users.push({
    id: crypto.randomUUID(),
    name,
    email,
    role: "admin",
    classLevel: null,
    sectionId: null,
    passwordHash,
    createdAt: new Date().toISOString(),
  });
  console.log(`Created admin: ${email}`);
}

fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
console.log(`Wrote ${STORE_FILE}`);
