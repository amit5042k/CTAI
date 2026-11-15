// Bulk student import (CSV). The browser parses the file and sends rows;
// this module validates them against the database and creates accounts.
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import {
  createUser,
  createSection,
  findUserByEmail,
  listSections,
  listUsers,
} from "./db";

export const MAX_IMPORT_ROWS = 2000;
// Rows created per request. bcrypt takes ~70 ms per password, so 50 rows
// stay well under hosting request time limits.
export const IMPORT_BATCH = 50;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROMAN = { iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8 };
const WORDS = [
  "Kite", "Mango", "Tiger", "River", "Lotus", "Pearl", "Comet", "Maple",
  "Cloud", "Spark", "Peacock", "Sun", "Banyan", "Delta", "Star", "Ocean",
];

// "6", "Class 6", "VI", "6th" -> 6
export function parseClass(value) {
  const v = String(value ?? "").trim().toLowerCase().replace(/^(class|grade|std\.?)\s*/, "");
  if (ROMAN[v]) return ROMAN[v];
  const m = v.match(/^(\d{1,2})(st|nd|rd|th)?$/);
  return m ? Number(m[1]) : null;
}

// "A", "6-A", "6A", "Section A" -> "A"
export function parseSection(value, classLevel) {
  let v = String(value ?? "").trim().replace(/^section\s*/i, "");
  const m = v.match(/^(\d{1,2})\s*[-\s]?\s*(.+)$/);
  if (m && Number(m[1]) === classLevel) v = m[2];
  return v.trim();
}

export function generatePassword() {
  const word = WORDS[crypto.randomInt(WORDS.length)];
  return `${word}@${crypto.randomInt(1000, 10000)}`;
}

function slug(name) {
  return (
    String(name)
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ".")
      .replace(/^\.+|\.+$/g, "")
      .slice(0, 30) || "student"
  );
}

// A sign-in name for students without an email address, unique across
// the portal: firstname.lastname@<school-code>.ctai (with a number if taken).
function generateEmail(name, schoolCode, taken) {
  const base = slug(name);
  const domain = `${String(schoolCode).toLowerCase()}.ctai`;
  for (let n = 1; ; n++) {
    const email = `${base}${n > 1 ? n : ""}@${domain}`;
    if (!taken.has(email) && !findUserByEmail(email)) return email;
  }
}

// Validates rows and returns one result per row:
//   { row, name, email, classLevel, section, password, emailGenerated,
//     passwordGenerated, newSection, errors: [] }
// `row` is the line number in the CSV (header = 1). Nothing is written.
export function validateRows(rows, { school, createSections }) {
  const sections = listSections({ schoolId: school.id });
  const sectionKey = (cl, name) => `${cl}|${name.toLowerCase()}`;
  const known = new Map(sections.map((s) => [sectionKey(s.classLevel, s.name), s]));
  const seenEmails = new Set();
  const generated = new Set();
  // Students already in this school, by class + name, so importing the
  // same sheet twice does not create everyone again under new sign-ins.
  const nameKey = (cl, n) => `${cl}|${String(n).toLowerCase().replace(/\s+/g, " ").trim()}`;
  const existingNames = new Set(
    listUsers({ schoolId: school.id, role: "student" }).map((u) => nameKey(u.classLevel, u.name)),
  );
  const seenNames = new Set();

  return rows.map((r, i) => {
    const errors = [];
    const name = String(r.name ?? "").trim().replace(/\s+/g, " ");
    const classLevel = parseClass(r.class);
    let email = String(r.email ?? "").trim().toLowerCase();
    let password = String(r.password ?? "").trim();
    const out = { row: r.row ?? i + 2, name, classLevel, errors };

    if (!name) errors.push("Name is missing");
    else if (name.length > 80) errors.push("Name is too long");

    if (classLevel === null) errors.push(`Class "${r.class ?? ""}" is not a class number`);
    else if (classLevel < 3 || classLevel > 8) errors.push("Class must be between 3 and 8");

    if (email) {
      if (!EMAIL_RE.test(email)) errors.push("Email address is not valid");
      else if (seenEmails.has(email)) errors.push("Email appears twice in this file");
      else if (findUserByEmail(email)) errors.push("An account with this email already exists");
    } else if (name && classLevel) {
      // Without an email, a name is the only way to tell students apart.
      const key = nameKey(classLevel, name);
      if (existingNames.has(key))
        errors.push(`A student called ${name} is already in Class ${classLevel} (add an email to enrol a second one)`);
      else if (seenNames.has(key))
        errors.push(`${name} appears twice for Class ${classLevel} (add an email to each to keep both)`);
      seenNames.add(key);
    }
    if (!email && name && !errors.length) {
      email = generateEmail(name, school.code, generated);
      generated.add(email);
      out.emailGenerated = true;
    }
    if (email) seenEmails.add(email);
    out.email = email;

    if (password) {
      if (password.length < 6) errors.push("Password must be at least 6 characters");
    } else {
      password = generatePassword();
      out.passwordGenerated = true;
    }
    out.password = password;

    const sectionName = classLevel ? parseSection(r.section, classLevel) : "";
    out.section = sectionName || null;
    if (sectionName && classLevel >= 3 && classLevel <= 8) {
      if (sectionName.length > 20) errors.push("Section name is too long");
      else if (!known.has(sectionKey(classLevel, sectionName))) {
        if (createSections) {
          out.newSection = true;
          // later rows reuse the section this row will create
          known.set(sectionKey(classLevel, sectionName), { pending: true, name: sectionName });
        } else {
          errors.push(`Section ${classLevel}-${sectionName} does not exist (create it first, or tick “create missing sections”)`);
        }
      }
    }
    return out;
  });
}

// Creates the accounts for rows that pass validation. Returns the same
// per-row results with `created: true` on success.
export async function importRows(rows, { school, createSections }) {
  const results = validateRows(rows, { school, createSections });
  for (const r of results) {
    if (r.errors.length) continue;
    let sectionId = null;
    if (r.section) {
      const existing = listSections({ schoolId: school.id, classLevel: r.classLevel }).find(
        (s) => s.name.toLowerCase() === r.section.toLowerCase(),
      );
      if (existing) sectionId = existing.id;
      else {
        const made = createSection({ classLevel: r.classLevel, name: r.section, schoolId: school.id });
        if (made.error) {
          r.errors.push(made.error);
          continue;
        }
        sectionId = made.section.id;
      }
    }
    const passwordHash = await bcrypt.hash(r.password, 10);
    // Re-check right before writing in case another import just used it.
    if (findUserByEmail(r.email)) {
      r.errors.push("An account with this email already exists");
      continue;
    }
    createUser({
      name: r.name,
      email: r.email,
      role: "student",
      classLevel: r.classLevel,
      sectionId,
      schoolId: school.id,
      passwordHash,
    });
    r.created = true;
  }
  return results;
}
