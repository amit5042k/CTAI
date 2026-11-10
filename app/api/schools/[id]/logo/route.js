import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { findSchoolById, ctaiDataDir } from "@/lib/db";

const LOGO_DIR = path.join(ctaiDataDir, "logos");

export async function GET(req, { params }) {
  const school = findSchoolById(params.id);
  if (!school || !school.logoExt)
    return NextResponse.json({ error: "No logo" }, { status: 404 });
  const file = path.join(LOGO_DIR, `${school.id}.${school.logoExt}`);
  if (!fs.existsSync(file))
    return NextResponse.json({ error: "Missing file" }, { status: 404 });
  const stat = fs.statSync(file);
  // Revalidate on every view (cheap 304) so a newly uploaded logo shows
  // up straight away instead of after the old copy expires.
  const etag = `"${school.logoExt}-${stat.size}-${Math.floor(stat.mtimeMs)}"`;
  const headers = {
    "Content-Type": school.logoMime || "application/octet-stream",
    "Cache-Control": "no-cache",
    ETag: etag,
    // SVG logos can contain scripts; never let them run if the logo is
    // opened directly, and stop browsers guessing a different type.
    "Content-Security-Policy":
      "default-src 'none'; style-src 'unsafe-inline'; img-src data:",
    "X-Content-Type-Options": "nosniff",
  };
  if (req.headers.get("if-none-match") === etag)
    return new NextResponse(null, { status: 304, headers });
  return new NextResponse(fs.readFileSync(file), { status: 200, headers });
}
