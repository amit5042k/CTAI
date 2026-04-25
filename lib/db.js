import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

const EMPTY = { users: [], progress: [], sections: [], schools: [] };

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(STORE_FILE)) {
    fs.writeFileSync(STORE_FILE, JSON.stringify(EMPTY, null, 2));
  }
}

function readStore() {
  ensureStore();
  const raw = fs.readFileSync(STORE_FILE, "utf-8");
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = {};
  }
  return { ...EMPTY, ...parsed };
}

function writeStore(store) {
  ensureStore();
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
}

// ---------- schools ----------

export function listSchools() {
  return readStore().schools;
}

export function findSchoolById(id) {
  if (!id) return null;
  return readStore().schools.find((s) => s.id === id) || null;
}

export function findSchoolByCode(code) {
  if (!code) return null;
  return (
    readStore().schools.find(
      (s) => s.code.toLowerCase() === String(code).toLowerCase(),
    ) || null
  );
}

export function createSchool({ name, code }) {
  const store = readStore();
  const trimmedCode = String(code || "").trim();
  if (!trimmedCode)
    return { error: "School code is required" };
  if (
    store.schools.some(
      (s) => s.code.toLowerCase() === trimmedCode.toLowerCase(),
    )
  )
    return { error: "A school with this code already exists" };
  const school = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    code: trimmedCode,
    createdAt: new Date().toISOString(),
  };
  store.schools.push(school);
  writeStore(store);
  return { school };
}

export function updateSchool(id, patch) {
  const store = readStore();
  const idx = store.schools.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  const allowed = {};
  if (patch.name !== undefined) allowed.name = String(patch.name).trim();
  if (patch.code !== undefined) {
    const code = String(patch.code).trim();
    if (
      store.schools.some(
        (s) => s.id !== id && s.code.toLowerCase() === code.toLowerCase(),
      )
    )
      return { error: "Another school with this code already exists" };
    allowed.code = code;
  }
  if (patch.logoExt !== undefined) allowed.logoExt = patch.logoExt;
  if (patch.logoMime !== undefined) allowed.logoMime = patch.logoMime;
  store.schools[idx] = { ...store.schools[idx], ...allowed };
  writeStore(store);
  return { school: store.schools[idx] };
}

export function deleteSchool(id) {
  const store = readStore();
  const before = store.schools.length;
  store.schools = store.schools.filter((s) => s.id !== id);
  // Cascade: remove users, sections and progress that belong to the school
  const userIds = store.users.filter((u) => u.schoolId === id).map((u) => u.id);
  store.users = store.users.filter((u) => u.schoolId !== id);
  store.sections = store.sections.filter((s) => s.schoolId !== id);
  store.progress = store.progress.filter((p) => !userIds.includes(p.userId));
  writeStore(store);
  return store.schools.length < before;
}

// ---------- users ----------

export function findUserByEmail(email) {
  const store = readStore();
  return store.users.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase(),
  );
}

export function findUserById(id) {
  const store = readStore();
  return store.users.find((u) => u.id === id);
}

export function countByRole(role) {
  const store = readStore();
  return store.users.filter((u) => u.role === role).length;
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
  const store = readStore();
  const user = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    role,
    classLevel: classLevel ?? null,
    sectionId: sectionId ?? null,
    schoolId: schoolId ?? null,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);
  writeStore(store);
  return user;
}

export function updateUser(id, patch) {
  const store = readStore();
  const idx = store.users.findIndex((u) => u.id === id);
  if (idx < 0) return null;
  store.users[idx] = { ...store.users[idx], ...patch };
  writeStore(store);
  return store.users[idx];
}

export function deleteUser(id) {
  const store = readStore();
  const before = store.users.length;
  store.users = store.users.filter((u) => u.id !== id);
  store.progress = store.progress.filter((p) => p.userId !== id);
  store.sections = store.sections.map((s) =>
    s.classTeacherId === id ? { ...s, classTeacherId: null } : s,
  );
  writeStore(store);
  return store.users.length < before;
}

// `filter` may include schoolId. For a teacher's school view we narrow
// students/teachers to that school; for the superadmin view we pass no filter.
export function listUsers(filter = {}) {
  const store = readStore();
  return store.users
    .filter((u) =>
      Object.entries(filter).every(([k, v]) =>
        v === undefined ? true : u[k] === v,
      ),
    )
    .map(({ passwordHash, ...rest }) => rest);
}

// ---------- sections ----------

export function listSections(filter = {}) {
  const store = readStore();
  return store.sections.filter((s) =>
    Object.entries(filter).every(([k, v]) =>
      v === undefined ? true : s[k] === v,
    ),
  );
}

export function findSectionById(id) {
  return readStore().sections.find((s) => s.id === id) || null;
}

export function createSection({ classLevel, name, classTeacherId, schoolId }) {
  const store = readStore();
  const dup = store.sections.find(
    (s) =>
      s.schoolId === schoolId &&
      s.classLevel === Number(classLevel) &&
      s.name.toLowerCase() === String(name).toLowerCase(),
  );
  if (dup)
    return {
      error: "A section with this name already exists for this class in this school",
    };
  const section = {
    id: crypto.randomUUID(),
    classLevel: Number(classLevel),
    name: String(name).trim(),
    classTeacherId: classTeacherId || null,
    schoolId: schoolId ?? null,
    createdAt: new Date().toISOString(),
  };
  store.sections.push(section);
  writeStore(store);
  return { section };
}

export function updateSection(id, patch) {
  const store = readStore();
  const idx = store.sections.findIndex((s) => s.id === id);
  if (idx < 0) return null;
  store.sections[idx] = { ...store.sections[idx], ...patch };
  writeStore(store);
  return store.sections[idx];
}

export function deleteSection(id) {
  const store = readStore();
  const before = store.sections.length;
  store.sections = store.sections.filter((s) => s.id !== id);
  store.users = store.users.map((u) =>
    u.sectionId === id ? { ...u, sectionId: null } : u,
  );
  writeStore(store);
  return store.sections.length < before;
}

// ---------- progress ----------

export function setProgress({ userId, unitId, status }) {
  const store = readStore();
  const idx = store.progress.findIndex(
    (p) => p.userId === userId && p.unitId === unitId,
  );
  const entry = {
    userId,
    unitId,
    status,
    updatedAt: new Date().toISOString(),
  };
  if (idx >= 0) store.progress[idx] = entry;
  else store.progress.push(entry);
  writeStore(store);
  return entry;
}

export function getProgressForUser(userId) {
  return readStore().progress.filter((p) => p.userId === userId);
}

export function getAllProgress() {
  return readStore().progress;
}
