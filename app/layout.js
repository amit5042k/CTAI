import "./globals.css";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export const metadata = {
  title: "CTAI Portal — Coding, Computational Thinking & AI (Class 3-8)",
  description:
    "An interactive curriculum portal for the CTAI subject (Coding, Computational Thinking & AI) for Classes 3 to 8, with separate logins for students and teachers.",
};

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white font-bold">
                C
              </span>
              <span className="font-semibold text-slate-800">
                CTAI Portal
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/curriculum" className="hover:text-brand-700">
                Curriculum
              </Link>
              {user ? (
                <>
                  <Link
                    href={
                      user.role === "admin"
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
                  </span>
                  <LogoutButton />
                </>
              ) : (
                <Link href="/login" className="btn-primary">
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
