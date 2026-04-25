import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { setProgress, getProgressForUser } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ progress: getProgressForUser(user.id) });
}

export async function POST(req) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "student") {
    return NextResponse.json(
      { error: "Only students record progress" },
      { status: 403 },
    );
  }
  const { unitId, status } = await req.json();
  if (!unitId || !["not_started", "in_progress", "completed"].includes(status)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const entry = setProgress({ userId: user.id, unitId, status });
  return NextResponse.json({ progress: entry });
}
