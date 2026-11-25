import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth";

// Role check for server pages. Must be called by each page itself: Next.js
// renders a page alongside its layout, so a redirect in the layout alone
// does not stop the page's data from being sent.
export async function requirePageRole(...roles) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!roles.includes(user.role)) {
    redirect(
      {
        superadmin: "/superadmin",
        admin: "/admin",
        teacher: "/dashboard/teacher",
      }[user.role] || "/dashboard/student",
    );
  }
  return user;
}
