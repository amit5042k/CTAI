import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { listUsers, getAllProgress } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "teacher") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const students = listUsers({ role: "student" });
  const progress = getAllProgress();

  const byStudent = students.map((s) => {
    const items = progress.filter((p) => p.userId === s.id);
    const completed = items.filter((p) => p.status === "completed").length;
    const inProgress = items.filter((p) => p.status === "in_progress").length;
    return { ...s, completed, inProgress, total: items.length };
  });

  return NextResponse.json({ students: byStudent });
}
