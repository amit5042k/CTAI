import { NextResponse } from "next/server";
import { requireAdmin, scopedSchoolId } from "@/lib/adminGuard";
import { findSchoolById } from "@/lib/db";
import {
  validateRows,
  importRows,
  MAX_IMPORT_ROWS,
  IMPORT_BATCH,
} from "@/lib/bulkImport";

// POST { rows: [{ row, name, email, class, section, password }],
//        dryRun, createSections, schoolId? }
// dryRun=true checks any number of rows (up to MAX_IMPORT_ROWS) without
// writing. dryRun=false creates accounts, at most IMPORT_BATCH rows per call;
// the page sends a large file in several calls.
export async function POST(req) {
  const { user, response } = await requireAdmin();
  if (response) return response;

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { rows, dryRun = true, createSections = false } = body || {};
  if (!Array.isArray(rows) || rows.length === 0)
    return NextResponse.json({ error: "No rows to import" }, { status: 400 });

  const limit = dryRun ? MAX_IMPORT_ROWS : IMPORT_BATCH;
  if (rows.length > limit)
    return NextResponse.json(
      { error: dryRun ? `A file can have at most ${MAX_IMPORT_ROWS} students` : `Send at most ${IMPORT_BATCH} rows at a time` },
      { status: 400 },
    );

  const schoolId = scopedSchoolId(user, body.schoolId);
  const school = schoolId ? findSchoolById(schoolId) : null;
  if (!school)
    return NextResponse.json({ error: "Choose a school first" }, { status: 400 });

  const opts = { school, createSections: !!createSections };
  const results = dryRun ? validateRows(rows, opts) : await importRows(rows, opts);
  return NextResponse.json({ results, batchSize: IMPORT_BATCH });
}
