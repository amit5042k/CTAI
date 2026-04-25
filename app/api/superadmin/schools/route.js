import { NextResponse } from "next/server";
import { requireSuperadmin } from "@/lib/adminGuard";
import { listSchools, createSchool, listUsers } from "@/lib/db";

export async function GET() {
  const { response } = await requireSuperadmin();
  if (response) return response;
  const schools = listSchools();
  const allUsers = listUsers();
  // Decorate each school with counts so the UI can show a quick summary.
  const decorated = schools.map((s) => {
    const usersForSchool = allUsers.filter((u) => u.schoolId === s.id);
    return {
      ...s,
      adminCount: usersForSchool.filter((u) => u.role === "admin").length,
      teacherCount: usersForSchool.filter((u) => u.role === "teacher").length,
      studentCount: usersForSchool.filter((u) => u.role === "student").length,
    };
  });
  return NextResponse.json({ schools: decorated });
}

export async function POST(req) {
  const { response } = await requireSuperadmin();
  if (response) return response;
  const { name, code } = await req.json();
  if (!name || !String(name).trim()) {
    return NextResponse.json(
      { error: "School name is required" },
      { status: 400 },
    );
  }
  if (!code || !String(code).trim()) {
    return NextResponse.json(
      { error: "School code is required (short identifier, e.g. SVB-DEL)" },
      { status: 400 },
    );
  }
  const result = createSchool({ name, code });
  if (result.error)
    return NextResponse.json({ error: result.error }, { status: 409 });
  return NextResponse.json({ school: result.school });
}
