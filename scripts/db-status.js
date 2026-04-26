#!/usr/bin/env node
/**
 * Print where the SQLite database lives and what's in it. Run with:
 *
 *   node scripts/db-status.js
 *
 * Honours CTAI_DATA_DIR (same as the Next.js app). Use this on the
 * host to diagnose 'accounts disappeared after deploy' problems —
 * the printed path is the only file you need to keep alive between
 * deploys.
 */

const path = require("node:path");
const fs = require("node:fs");
const Database = require("better-sqlite3");

const DATA_DIR = process.env.CTAI_DATA_DIR
  ? path.resolve(process.env.CTAI_DATA_DIR)
  : path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "portal.db");

console.log("Data directory  :", DATA_DIR);
console.log("Database file   :", DB_FILE);
console.log(
  "DB exists       :",
  fs.existsSync(DB_FILE) ? "yes" : "NO — file is missing!",
);
if (!fs.existsSync(DB_FILE)) process.exit(0);

const stat = fs.statSync(DB_FILE);
console.log("DB size         :", stat.size, "bytes");
console.log("Last modified   :", stat.mtime.toISOString());

let db;
try {
  db = new Database(DB_FILE, { readonly: true, fileMustExist: true });
} catch (e) {
  console.error("Cannot open database:", e.message);
  process.exit(2);
}

function count(table) {
  try {
    return db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get().n;
  } catch (e) {
    return `(table missing: ${e.message})`;
  }
}

console.log();
console.log("Counts:");
console.log("  schools        :", count("schools"));
console.log("  users (total)  :", count("users"));
console.log("  superadmins    :", count("users WHERE role = 'superadmin'"));
console.log("  admins         :", count("users WHERE role = 'admin'"));
console.log("  teachers       :", count("users WHERE role = 'teacher'"));
console.log("  students       :", count("users WHERE role = 'student'"));
console.log("  sections       :", count("sections"));
console.log("  progress rows  :", count("progress"));
console.log("  attempts       :", count("attempts"));
console.log("  unlocks        :", count("unlocks"));

console.log();
console.log("Last 5 users (by createdAt):");
try {
  const rows = db
    .prepare(
      "SELECT email, role, createdAt FROM users ORDER BY createdAt DESC LIMIT 5",
    )
    .all();
  for (const r of rows) console.log(" ", r.createdAt, r.role, r.email);
} catch (e) {
  console.log("  (no users yet)");
}
