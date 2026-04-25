import { NextResponse } from "next/server";
import { getCurrentUser } from "./auth";

// Allows admins (scoped to their own school) and superadmins (everywhere).
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (user.role !== "admin" && user.role !== "superadmin") {
    return {
      user,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { user, response: null };
}

// Only superadmin.
export async function requireSuperadmin() {
  const user = await getCurrentUser();
  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (user.role !== "superadmin") {
    return {
      user,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { user, response: null };
}

// For multi-school: returns the schoolId an admin is allowed to operate on.
// Superadmin may pass an explicit `schoolId` query/body field; admins are
// always pinned to their own school.
export function scopedSchoolId(user, requestedSchoolId) {
  if (user.role === "superadmin") {
    return requestedSchoolId || null;
  }
  return user.schoolId || null;
}
