import { NextResponse } from "next/server";

// Exposes the request pathname to server components via the
// `x-pathname` request header. Used by the root layout to render
// per-school branding when a visitor lands on /<schoolCode>.
export function middleware(req) {
  const headers = new Headers(req.headers);
  headers.set("x-pathname", req.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
