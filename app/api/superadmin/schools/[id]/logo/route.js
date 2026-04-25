import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireSuperadmin } from "@/lib/adminGuard";
import { findSchoolById, updateSchool } from "@/lib/db";

const LOGO_DIR = path.join(process.cwd(), "data", "logos");
const ALLOWED = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};
const MAX_BYTES = 1_000_000; // 1 MB

export async function POST(req, { params }) {
  const { response } = await requireSuperadmin();
  if (response) return response;
  const school = findSchoolById(params.id);
  if (!school)
    return NextResponse.json({ error: "School not found" }, { status: 404 });

  const form = await req.formData();
  const file = form.get("logo");
  if (!file || typeof file === "string")
    return NextResponse.json(
      { error: "Upload a file under field name 'logo'" },
      { status: 400 },
    );
  const ext = ALLOWED[file.type];
  if (!ext)
    return NextResponse.json(
      { error: "Logo must be PNG, JPG, WebP or SVG" },
      { status: 400 },
    );
  if (file.size > MAX_BYTES)
    return NextResponse.json(
      { error: "Logo must be smaller than 1 MB" },
      { status: 400 },
    );

  const buf = Buffer.from(await file.arrayBuffer());
  if (!fs.existsSync(LOGO_DIR)) fs.mkdirSync(LOGO_DIR, { recursive: true });
  // Remove old logo with a different extension
  for (const e of Object.values(ALLOWED)) {
    const old = path.join(LOGO_DIR, `${school.id}.${e}`);
    if (e !== ext && fs.existsSync(old)) fs.unlinkSync(old);
  }
  fs.writeFileSync(path.join(LOGO_DIR, `${school.id}.${ext}`), buf);
  const result = updateSchool(school.id, { logoExt: ext, logoMime: file.type });
  return NextResponse.json({ school: result.school });
}

export async function DELETE(_req, { params }) {
  const { response } = await requireSuperadmin();
  if (response) return response;
  const school = findSchoolById(params.id);
  if (!school)
    return NextResponse.json({ error: "School not found" }, { status: 404 });
  for (const e of Object.values(ALLOWED)) {
    const p = path.join(LOGO_DIR, `${school.id}.${e}`);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
  const result = updateSchool(school.id, { logoExt: null, logoMime: null });
  return NextResponse.json({ school: result.school });
}
