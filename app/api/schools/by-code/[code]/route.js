import { NextResponse } from "next/server";
import { findSchoolByCode } from "@/lib/db";

export async function GET(_req, { params }) {
  const school = findSchoolByCode(params.code);
  if (!school)
    return NextResponse.json({ error: "School not found" }, { status: 404 });
  // Only public-safe fields.
  return NextResponse.json({
    school: {
      id: school.id,
      name: school.name,
      code: school.code,
      hasLogo: !!school.logoExt,
    },
  });
}
