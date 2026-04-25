import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

const EMPTY = { users: [], progress: [], sections: [] };

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

export function listSections() {
  return readStore().sections;
}

export function findSectionById(id) {
  return readStore().sections.find((s) => s.id === id) || null;
}

export function createSection({ classLevel, name, classTeacherId }) {
  const store = readStore();
  const dup = store.sections.find(
    (s) =>
      s.classLevel === Number(classLevel) &&
      s.name.toLowerCase() === String(name).toLowerCase(),
  );
  if (dup) return { error: "A section with this name already exists for this class" };
  const section = {
    id: crypto.randomUUID(),
    classLevel: Number(classLevel),
    name: String(name).trim(),
    classTeacherId: classTeacherId || null,
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
