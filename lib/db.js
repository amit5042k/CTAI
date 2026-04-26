// SQLite-backed store. Synchronous via better-sqlite3 — keeps every
// exported function signature identical to the previous file-based store
// so the rest of the app needs no changes.
//
// On first run the database is created at data/portal.db. If a legacy
// data/store.json exists alongside an empty database, its contents are
// imported once so existing accounts and progress survive the upgrade.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import Database from "better-sqlite3";

// The directory holding portal.db, the legacy store.json (for one-time
// migration) and uploaded school logos. Set CTAI_DATA_DIR to keep this
// outside the app folder so redeploys can't accidentally wipe it.
const DATA_DIR = process.env.CTAI_DATA_DIR
  ? path.resolve(process.env.CTAI_DATA_DIR)
  : path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "portal.db");
const LEGACY_JSON = path.join(DATA_DIR, "store.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Expose so other modules (logo routes) can co-locate uploads with the DB.
export const ctaiDataDir = DATA_DIR;

// `globalThis` cache so dev-mode hot reloads don't open a new connection
// (and potentially lock the file) on every request.
const g = globalThis;
const db = g.__ctai_db || (g.__ctai_db = openDb());

function openDb() {
  const conn = new Database(DB_FILE);
  conn.pragma("journal_mode = WAL");
  conn.pragma("foreign_keys = ON");
  migrate(conn);
  importLegacyJsonIfPresent(conn);
  return conn;
}

function migrate(conn) {
  conn.exec(`
    CREATE TABLE IF NOT EXISTS schools (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT NOT NULL UNIQUE,
      logoExt TEXT,
      logoMime TEXT,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sections (
      id TEXT PRIMARY KEY,
      classLevel INTEGER NOT NULL,
      name TEXT NOT NULL,
      classTeacherId TEXT,
      schoolId TEXT,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (schoolId) REFERENCES schools(id) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS sections_by_school
      ON sections(schoolId);
    CREATE UNIQUE INDEX IF NOT EXISTS sections_unique_per_school_class
      ON sections(schoolId, classLevel, name);

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
      createdAt TEXT NOT NULL,
      FOREIGN KEY (schoolId) REFERENCES schools(id) ON DELETE SET NULL,
      FOREIGN KEY (sectionId) REFERENCES sections(id) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS users_by_school ON users(schoolId);
    CREATE INDEX IF NOT EXISTS users_by_role ON users(role);

    CREATE TABLE IF NOT EXISTS section_teachers (
      sectionId TEXT NOT NULL,
      teacherId TEXT NOT NULL,
      PRIMARY KEY (sectionId, teacherId),
      FOREIGN KEY (sectionId) REFERENCES sections(id) ON DELETE CASCADE,
      FOREIGN KEY (teacherId) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS progress (
      userId TEXT NOT NULL,
      unitId TEXT NOT NULL,
      status TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      PRIMARY KEY (userId, unitId),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS unlocks (
      sectionId TEXT NOT NULL,
      unitId TEXT NOT NULL,
      unlockedBy TEXT,
      unlockedAt TEXT NOT NULL,
      PRIMARY KEY (sectionId, unitId),
      FOREIGN KEY (sectionId) REFERENCES sections(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      unitId TEXT NOT NULL,
      exerciseId TEXT NOT NULL,
      correct INTEGER NOT NULL,
      at TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS attempts_by_user_unit
      ON attempts(userId, unitId);
  `);
}

function importLegacyJsonIfPresent(conn) {
  if (!fs.existsSync(LEGACY_JSON)) return;
  const userCount = conn
    .prepare("SELECT COUNT(*) AS n FROM users")
    .get().n;
  const schoolCount = conn
    .prepare("SELECT COUNT(*) AS n FROM schools")
    .get().n;
  if (userCount > 0 || schoolCount > 0) return; // already migrated

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(LEGACY_JSON, "utf-8"));
  } catch {
    return;
  }
  const tx = conn.transaction(() => {
    for (const s of parsed.schools || []) {
      conn
        .prepare(
          `INSERT INTO schools (id, name, code, logoExt, logoMime, createdAt)
           VALUES (@id, @name, @code, @logoExt, @logoMime, @createdAt)`,
        )
        .run({
          id: s.id,
          name: s.name,
          code: s.code,
          logoExt: s.logoExt || null,
          logoMime: s.logoMime || null,
          createdAt: s.createdAt || new Date().toISOString(),
        });
    }
    for (const sec of parsed.sections || []) {
      conn
        .prepare(
          `INSERT INTO sections (id, classLevel, name, classTeacherId, schoolId, createdAt)
           VALUES (@id, @classLevel, @name, @classTeacherId, @schoolId, @createdAt)`,
        )
        .run({
          id: sec.id,
          classLevel: sec.classLevel,
          name: sec.name,
          classTeacherId: sec.classTeacherId || null,
          schoolId: sec.schoolId || null,
          createdAt: sec.createdAt || new Date().toISOString(),
        });
      for (const tid of sec.teacherIds || []) {
        conn
          .prepare(
            `INSERT OR IGNORE INTO section_teachers (sectionId, teacherId)
             VALUES (?, ?)`,
          )
          .run(sec.id, tid);
      }
    }
    for (const u of parsed.users || []) {
      conn
        .prepare(
          `INSERT INTO users
             (id, name, email, role, classLevel, sectionId, schoolId,
              passwordHash, twoFactorEnabled, twoFactorSecret,
              pendingTwoFactorSecret, createdAt)
           VALUES
             (@id, @name, @email, @role, @classLevel, @sectionId, @schoolId,
              @passwordHash, @twoFactorEnabled, @twoFactorSecret,
              @pendingTwoFactorSecret, @createdAt)`,
        )
        .run({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          classLevel: u.classLevel ?? null,
          sectionId: u.sectionId ?? null,
          schoolId: u.schoolId ?? null,
          passwordHash: u.passwordHash,
          twoFactorEnabled: u.twoFactorEnabled ? 1 : 0,
          twoFactorSecret: u.twoFactorSecret || null,
          pendingTwoFactorSecret: u.pendingTwoFactorSecret || null,
          createdAt: u.createdAt || new Date().toISOString(),
        });
    }
    for (const p of parsed.progress || []) {
      conn
        .prepare(
          `INSERT OR REPLACE INTO progress (userId, unitId, status, updatedAt)
           VALUES (?, ?, ?, ?)`,
        )
        .run(p.userId, p.unitId, p.status, p.updatedAt);
    }
    for (const ul of parsed.unlocks || []) {
      conn
        .prepare(
          `INSERT OR REPLACE INTO unlocks (sectionId, unitId, unlockedBy, unlockedAt)
           VALUES (?, ?, ?, ?)`,
        )
        .run(ul.sectionId, ul.unitId, ul.unlockedBy || null, ul.unlockedAt);
    }
    for (const a of parsed.attempts || []) {
      conn
        .prepare(
          `INSERT INTO attempts (userId, unitId, exerciseId, correct, at)
           VALUES (?, ?, ?, ?, ?)`,
        )
        .run(a.userId, a.unitId, a.exerciseId, a.correct ? 1 : 0, a.at);
    }
  });
  try {
    tx();
    fs.renameSync(LEGACY_JSON, LEGACY_JSON + ".migrated");
  } catch (e) {
    console.error("Legacy JSON migration failed:", e.message);
  }
}

// ---------- helpers ----------

// Strip sensitive fields before returning a user to the client. Use this
// from any endpoint that puts a user object on the wire.
export function publicUser(user) {
  if (!user) return null;
  const {
    passwordHash,
    twoFactorSecret,
    pendingTwoFactorSecret,
    ...safe
  } = user;
  return { ...safe, twoFactorEnabled: !!safe.twoFactorEnabled };
}

function rowToUser(row) {
  if (!row) return null;
  return {
    ...row,
    twoFactorEnabled: !!row.twoFactorEnabled,
  };
}

function rowToSection(row) {
  if (!row) return null;
  const teacherIds = db
    .prepare(`SELECT teacherId FROM section_teachers WHERE sectionId = ?`)
    .all(row.id)
    .map((t) => t.teacherId);
  return { ...row, teacherIds };
}

function whereFromFilter(filter, allowed) {
  const clauses = [];
  const params = {};
  for (const k of Object.keys(filter || {})) {
    if (filter[k] === undefined) continue;
    if (!allowed.includes(k)) continue;
    if (filter[k] === null) clauses.push(`${k} IS NULL`);
    else {
      clauses.push(`${k} = @${k}`);
      params[k] = filter[k];
    }
  }
  return { sql: clauses.length ? "WHERE " + clauses.join(" AND ") : "", params };
}

// ---------- schools ----------

export function listSchools() {
  return db.prepare(`SELECT * FROM schools ORDER BY name`).all();
}

export function findSchoolById(id) {
  if (!id) return null;
  return db.prepare(`SELECT * FROM schools WHERE id = ?`).get(id) || null;
}

export function findSchoolByCode(code) {
  if (!code) return null;
  return (
    db
      .prepare(`SELECT * FROM schools WHERE code = ? COLLATE NOCASE`)
      .get(String(code)) || null
  );
}

export function createSchool({ name, code }) {
  const trimmedCode = String(code || "").trim();
  if (!trimmedCode) return { error: "School code is required" };
  if (
    db
      .prepare(`SELECT 1 FROM schools WHERE code = ? COLLATE NOCASE`)
      .get(trimmedCode)
  )
    return { error: "A school with this code already exists" };
  const school = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    code: trimmedCode,
    logoExt: null,
    logoMime: null,
    createdAt: new Date().toISOString(),
  };
  db.prepare(
    `INSERT INTO schools (id, name, code, logoExt, logoMime, createdAt)
     VALUES (@id, @name, @code, @logoExt, @logoMime, @createdAt)`,
  ).run(school);
  return { school };
}

export function updateSchool(id, patch) {
  const existing = findSchoolById(id);
  if (!existing) return null;
  const next = { ...existing };
  if (patch.name !== undefined) next.name = String(patch.name).trim();
  if (patch.code !== undefined) {
    const code = String(patch.code).trim();
    const dup = db
      .prepare(
        `SELECT 1 FROM schools WHERE code = ? COLLATE NOCASE AND id != ?`,
      )
      .get(code, id);
    if (dup) return { error: "Another school with this code already exists" };
    next.code = code;
  }
  if (patch.logoExt !== undefined) next.logoExt = patch.logoExt;
  if (patch.logoMime !== undefined) next.logoMime = patch.logoMime;
  db.prepare(
    `UPDATE schools SET name = @name, code = @code, logoExt = @logoExt, logoMime = @logoMime WHERE id = @id`,
  ).run(next);
  return { school: next };
}

export function deleteSchool(id) {
  // Manually cascade: cleanup users, sections, progress, attempts, unlocks
  // (foreign keys help but the JSON store also wiped progress for the
  // school's users — keep that behaviour explicit).
  const userIds = db
    .prepare(`SELECT id FROM users WHERE schoolId = ?`)
    .all(id)
    .map((u) => u.id);
  const tx = db.transaction(() => {
    for (const uid of userIds) {
      db.prepare(`DELETE FROM progress WHERE userId = ?`).run(uid);
      db.prepare(`DELETE FROM attempts WHERE userId = ?`).run(uid);
    }
    db.prepare(`DELETE FROM users WHERE schoolId = ?`).run(id);
    const sectionIds = db
      .prepare(`SELECT id FROM sections WHERE schoolId = ?`)
      .all(id)
      .map((s) => s.id);
    for (const sid of sectionIds) {
      db.prepare(`DELETE FROM section_teachers WHERE sectionId = ?`).run(sid);
      db.prepare(`DELETE FROM unlocks WHERE sectionId = ?`).run(sid);
    }
    db.prepare(`DELETE FROM sections WHERE schoolId = ?`).run(id);
    return db.prepare(`DELETE FROM schools WHERE id = ?`).run(id).changes > 0;
  });
  return tx();
}

// ---------- users ----------

export function findUserByEmail(email) {
  if (!email) return null;
  return rowToUser(
    db
      .prepare(`SELECT * FROM users WHERE email = ? COLLATE NOCASE`)
      .get(String(email)),
  );
}

export function findUserById(id) {
  if (!id) return null;
  return rowToUser(db.prepare(`SELECT * FROM users WHERE id = ?`).get(id));
}

export function countByRole(role) {
  return db
    .prepare(`SELECT COUNT(*) AS n FROM users WHERE role = ?`)
    .get(role).n;
}

export function createUser({
  name,
  email,
  role,
  classLevel,
  sectionId,
  schoolId,
  passwordHash,
}) {
  const user = {
    id: crypto.randomUUID(),
    name,
    email: String(email).toLowerCase(),
    role,
    classLevel: classLevel ?? null,
    sectionId: sectionId ?? null,
    schoolId: schoolId ?? null,
    passwordHash,
    twoFactorEnabled: 0,
    twoFactorSecret: null,
    pendingTwoFactorSecret: null,
    createdAt: new Date().toISOString(),
  };
  db.prepare(
    `INSERT INTO users
       (id, name, email, role, classLevel, sectionId, schoolId,
        passwordHash, twoFactorEnabled, twoFactorSecret,
        pendingTwoFactorSecret, createdAt)
     VALUES
       (@id, @name, @email, @role, @classLevel, @sectionId, @schoolId,
        @passwordHash, @twoFactorEnabled, @twoFactorSecret,
        @pendingTwoFactorSecret, @createdAt)`,
  ).run(user);
  return rowToUser(user);
}

export function updateUser(id, patch) {
  const existing = findUserById(id);
  if (!existing) return null;
  const cols = [
    "name",
    "email",
    "role",
    "classLevel",
    "sectionId",
    "schoolId",
    "passwordHash",
    "twoFactorEnabled",
    "twoFactorSecret",
    "pendingTwoFactorSecret",
  ];
  const sets = [];
  const params = { id };
  for (const c of cols) {
    if (patch[c] !== undefined) {
      sets.push(`${c} = @${c}`);
      if (c === "twoFactorEnabled") params[c] = patch[c] ? 1 : 0;
      else if (c === "email" && patch[c])
        params[c] = String(patch[c]).toLowerCase();
      else params[c] = patch[c];
    }
  }
  if (sets.length === 0) return existing;
  db.prepare(`UPDATE users SET ${sets.join(", ")} WHERE id = @id`).run(params);
  return findUserById(id);
}

export function deleteUser(id) {
  const tx = db.transaction(() => {
    db.prepare(`DELETE FROM progress WHERE userId = ?`).run(id);
    db.prepare(`DELETE FROM attempts WHERE userId = ?`).run(id);
    db.prepare(`DELETE FROM section_teachers WHERE teacherId = ?`).run(id);
    db.prepare(
      `UPDATE sections SET classTeacherId = NULL WHERE classTeacherId = ?`,
    ).run(id);
    return db.prepare(`DELETE FROM users WHERE id = ?`).run(id).changes > 0;
  });
  return tx();
}

export function listUsers(filter = {}) {
  const allowed = ["role", "schoolId", "classLevel", "sectionId"];
  const { sql, params } = whereFromFilter(filter, allowed);
  const rows = db.prepare(`SELECT * FROM users ${sql} ORDER BY name`).all(params);
  return rows.map((r) => {
    const { passwordHash, twoFactorSecret, pendingTwoFactorSecret, ...rest } =
      r;
    return { ...rest, twoFactorEnabled: !!rest.twoFactorEnabled };
  });
}

// ---------- sections ----------

export function listSections(filter = {}) {
  const allowed = ["schoolId", "classLevel"];
  const { sql, params } = whereFromFilter(filter, allowed);
  const rows = db
    .prepare(`SELECT * FROM sections ${sql} ORDER BY classLevel, name`)
    .all(params);
  return rows.map(rowToSection);
}

export function findSectionById(id) {
  if (!id) return null;
  return rowToSection(
    db.prepare(`SELECT * FROM sections WHERE id = ?`).get(id),
  );
}

export function createSection({ classLevel, name, classTeacherId, schoolId }) {
  const dup = db
    .prepare(
      `SELECT 1 FROM sections
       WHERE schoolId IS ? AND classLevel = ? AND name = ? COLLATE NOCASE`,
    )
    .get(schoolId ?? null, Number(classLevel), String(name));
  if (dup)
    return {
      error:
        "A section with this name already exists for this class in this school",
    };
  const section = {
    id: crypto.randomUUID(),
    classLevel: Number(classLevel),
    name: String(name).trim(),
    classTeacherId: classTeacherId || null,
    schoolId: schoolId ?? null,
    createdAt: new Date().toISOString(),
  };
  db.prepare(
    `INSERT INTO sections
       (id, classLevel, name, classTeacherId, schoolId, createdAt)
     VALUES
       (@id, @classLevel, @name, @classTeacherId, @schoolId, @createdAt)`,
  ).run(section);
  return { section: rowToSection(section) };
}

export function updateSection(id, patch) {
  const existing = findSectionById(id);
  if (!existing) return null;
  const cols = ["name", "classTeacherId"];
  const sets = [];
  const params = { id };
  for (const c of cols) {
    if (patch[c] !== undefined) {
      sets.push(`${c} = @${c}`);
      params[c] = patch[c] || null;
    }
  }
  if (sets.length > 0) {
    db.prepare(`UPDATE sections SET ${sets.join(", ")} WHERE id = @id`).run(
      params,
    );
  }
  if (Array.isArray(patch.teacherIds)) {
    setSectionTeachers(id, patch.teacherIds);
  }
  return findSectionById(id);
}

export function deleteSection(id) {
  const tx = db.transaction(() => {
    db.prepare(`DELETE FROM section_teachers WHERE sectionId = ?`).run(id);
    db.prepare(`DELETE FROM unlocks WHERE sectionId = ?`).run(id);
    db.prepare(`UPDATE users SET sectionId = NULL WHERE sectionId = ?`).run(id);
    return db.prepare(`DELETE FROM sections WHERE id = ?`).run(id).changes > 0;
  });
  return tx();
}

export function setSectionTeachers(id, teacherIds) {
  const cleaned = Array.from(
    new Set((teacherIds || []).filter(Boolean)),
  );
  const tx = db.transaction(() => {
    db.prepare(`DELETE FROM section_teachers WHERE sectionId = ?`).run(id);
    const ins = db.prepare(
      `INSERT OR IGNORE INTO section_teachers (sectionId, teacherId) VALUES (?, ?)`,
    );
    for (const tid of cleaned) ins.run(id, tid);
  });
  tx();
  return findSectionById(id);
}

// ---------- chapter unlocks ----------

export function listUnlocks(filter = {}) {
  const allowed = ["sectionId", "unitId"];
  const { sql, params } = whereFromFilter(filter, allowed);
  return db.prepare(`SELECT * FROM unlocks ${sql}`).all(params);
}

export function isUnitUnlocked(sectionId, unitId) {
  if (!sectionId) return false;
  return !!db
    .prepare(
      `SELECT 1 FROM unlocks WHERE sectionId = ? AND unitId = ?`,
    )
    .get(sectionId, unitId);
}

export function setUnitUnlocked(sectionId, unitId, unlockedBy, unlocked) {
  if (unlocked) {
    db.prepare(
      `INSERT OR IGNORE INTO unlocks (sectionId, unitId, unlockedBy, unlockedAt)
       VALUES (?, ?, ?, ?)`,
    ).run(sectionId, unitId, unlockedBy || null, new Date().toISOString());
  } else {
    db.prepare(
      `DELETE FROM unlocks WHERE sectionId = ? AND unitId = ?`,
    ).run(sectionId, unitId);
  }
}

// ---------- progress ----------

export function setProgress({ userId, unitId, status }) {
  const entry = {
    userId,
    unitId,
    status,
    updatedAt: new Date().toISOString(),
  };
  db.prepare(
    `INSERT INTO progress (userId, unitId, status, updatedAt)
     VALUES (@userId, @unitId, @status, @updatedAt)
     ON CONFLICT(userId, unitId) DO UPDATE SET
       status = excluded.status,
       updatedAt = excluded.updatedAt`,
  ).run(entry);
  return entry;
}

export function getProgressForUser(userId) {
  return db
    .prepare(`SELECT * FROM progress WHERE userId = ?`)
    .all(userId);
}

export function getAllProgress() {
  return db.prepare(`SELECT * FROM progress`).all();
}

// ---------- attempts ----------

export function recordAttempt({ userId, unitId, exerciseId, correct }) {
  db.prepare(
    `INSERT INTO attempts (userId, unitId, exerciseId, correct, at)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(userId, unitId, exerciseId, correct ? 1 : 0, new Date().toISOString());
}

export function getAttemptsForUser(userId) {
  return db
    .prepare(`SELECT * FROM attempts WHERE userId = ?`)
    .all(userId)
    .map((a) => ({ ...a, correct: !!a.correct }));
}

export function getAttemptsForUnit(userId, unitId) {
  return db
    .prepare(
      `SELECT * FROM attempts WHERE userId = ? AND unitId = ? ORDER BY at`,
    )
    .all(userId, unitId)
    .map((a) => ({ ...a, correct: !!a.correct }));
}
