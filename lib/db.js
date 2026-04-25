import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(STORE_FILE)) {
    fs.writeFileSync(
      STORE_FILE,
      JSON.stringify({ users: [], progress: [] }, null, 2),
    );
  }
}

function readStore() {
  ensureStore();
  const raw = fs.readFileSync(STORE_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return { users: [], progress: [] };
  }
}

function writeStore(store) {
  ensureStore();
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));
}

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

export function createUser({ name, email, role, classLevel, passwordHash }) {
  const store = readStore();
  const user = {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    role,
    classLevel: classLevel ?? null,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);
  writeStore(store);
  return user;
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
  const store = readStore();
  return store.progress.filter((p) => p.userId === userId);
}

export function getAllProgress() {
  const store = readStore();
  return store.progress;
}
