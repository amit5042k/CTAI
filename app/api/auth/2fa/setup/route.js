import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { findUserById, updateUser } from "@/lib/db";
import { generateBase32Secret, otpauthURI } from "@/lib/totp";

// Generate (or rotate) a pending TOTP secret for the current user.
// The secret is saved as `pendingTwoFactorSecret` until the user verifies
// a code via /enable; only then is it promoted to twoFactorSecret + enabled.
export async function POST() {
  const me = await getCurrentUser();
  if (!me)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (me.role !== "superadmin") {
    return NextResponse.json(
      { error: "2FA is only available for superadmin accounts" },
      { status: 403 },
    );
  }
  const secret = generateBase32Secret(20);
  updateUser(me.id, { pendingTwoFactorSecret: secret });
  const uri = otpauthURI({ secret, label: me.email });
  return NextResponse.json({ secret, otpauthUri: uri });
}
