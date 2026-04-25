import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { findSchoolById } from "@/lib/db";

const LOGO_DIR = path.join(process.cwd(), "data", "logos");

export async function GET(_req, { params }) {
  const school = findSchoolById(params.id);
  if (!school || !school.logoExt)
    return NextResponse.json({ error: "No logo" }, { status: 404 });
  const file = path.join(LOGO_DIR, `${school.id}.${school.logoExt}`);
  if (!fs.existsSync(file))
    return NextResponse.json({ error: "Missing file" }, { status: 404 });
  const data = fs.readFileSync(file);
  return new NextResponse(data, {
    status: 200,
    headers: {
      "Content-Type": school.logoMime || "application/octet-stream",
      "Cache-Control": "public, max-age=300",
    },
  });
}
