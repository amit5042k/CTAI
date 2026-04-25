import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getProgressForUser } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  const progress = getProgressForUser(user.id);
  return NextResponse.json({ user, progress });
}
