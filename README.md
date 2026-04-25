# CTAI Portal — Class 3 to 8

A Next.js + Node.js web application for the **CTAI** subject (Coding,
Computational Thinking & Artificial Intelligence) covering Classes 3 to 8,
with separate authenticated experiences for **admins**, **teachers** and
**students**.

## Features

- 6 grade-level curricula (Class 3 → Class 8) with units, learning outcomes
  and hands-on activities
- Admin panel for creating sections, enrolling teachers/students and
  resetting passwords
- Authentication with three roles (admin / teacher / student)
  - Passwords hashed with bcrypt
  - JWT session in an `httpOnly` cookie (signed with `jose`)
- Student dashboard with personal progress tracking per unit
- Teacher dashboard with a class-wise roster, sections, and per-student
  drill-down
- Students can only update progress in their own class
- File-backed JSON store — zero external dependencies for local dev

## Tech stack

- **Frontend & API:** Next.js 14 App Router (React 18)
- **Backend (Node.js):** Next.js Route Handlers
- **Auth:** `jose` (JWT) + `bcryptjs`
- **Styling:** Tailwind CSS

## Getting started

```bash
npm install
cp .env.example .env.local   # set a real JWT_SECRET
npm run dev
```

Open <http://localhost:3000>. Visit `/register` once to create the first
admin; after that the page disables itself and only an admin can enrol new
users from `/admin/users`.

## Project structure

```
app/
  admin/             Admin dashboard, sections, user enrolment
  api/               Node.js route handlers (auth, progress, admin)
  curriculum/        Class index + per-class unit pages
  dashboard/         Student & teacher dashboards
  login, register    Auth pages (register = first-admin bootstrap)
components/          Client components (UnitCard, LogoutButton, admin/*)
data/
  curriculum.js      Class 3-8 curriculum data
  store.json         Auto-created JSON store (gitignored)
lib/
  auth.js            JWT signing, cookie helpers, getCurrentUser()
  db.js              File-backed store for users, sections, progress
  adminGuard.js      requireAdmin() helper for admin routes
```

## Notes

- The JSON store is ideal for dev / classroom prototypes. For production,
  swap `lib/db.js` for a real database (Postgres, MongoDB, etc).
