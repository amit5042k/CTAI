import "./globals.css";
import Link from "next/link";
import { headers } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import { findSchoolById, findSchoolByCode } from "@/lib/db";
import LogoutButton from "@/components/LogoutButton";
import Brand from "@/components/Brand";

export const metadata = {
  title: "CTAI Portal — Coding, Computational Thinking & AI (Class 3-8)",
  description:
    "An interactive curriculum portal for the CTAI subject (Coding, Computational Thinking & AI) for Classes 3 to 8, with separate logins for students and teachers.",
};

// Reserved top-level routes that must NOT be treated as school codes.
const RESERVED = new Set([
  "",
  "login",
  "register",
  "admin",
  "superadmin",
  "dashboard",
  "curriculum",
  "api",
]);

function schoolFromPath() {
  const pathname = headers().get("x-pathname") || "";
  // Match exactly /something or /something/...
  const m = pathname.match(/^\/([^/?#]+)/);
  if (!m) return null;
  const slug = decodeURIComponent(m[1]);
  if (RESERVED.has(slug)) return null;
  const school = findSchoolByCode(slug);
  return school || null;
}

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  const userSchool = user?.schoolId ? findSchoolById(user.schoolId) : null;
  const pathSchool = userSchool ? null : schoolFromPath();
  const brandSchool = userSchool || pathSchool;

  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Brand school={brandSchool} />
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/curriculum" className="hover:text-brand-700">
                Curriculum
              </Link>
              {user ? (
                <>
                  <Link
                    href={
                      user.role === "superadmin"
                        ? "/superadmin"
                        : user.role === "admin"
                          ? "/admin"
                          : user.role === "teacher"
                            ? "/dashboard/teacher"
                            : "/dashboard/student"
                    }
                    className="hover:text-brand-700"
                  >
                    Dashboard
                  </Link>
                  <span className="text-slate-500">
                    {user.name}{" "}
                    <span className="tag ml-1">{user.role}</span>
                    {userSchool && (
                      <span className="ml-1 text-xs text-slate-400">
                        · {userSchool.name}
                      </span>
                    )}
                  </span>
                  <LogoutButton />
                </>
              ) : (
                <Link
                  href={pathSchool ? `/${pathSchool.code}` : "/login"}
                  className="btn-primary"
                >
                  Sign in
                </Link>
              )}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mt-16 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
            CTAI curriculum portal — Classes 3 to 8. For educational use.
          </div>
        </footer>
      </body>
    </html>
  );
}
