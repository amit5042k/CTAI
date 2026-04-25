# CBSE CTAI Portal — Class 3 to 8

A Next.js + Node.js web application for the CBSE **CTAI** subject (Coding,
Computational Thinking & Artificial Intelligence) covering Classes 3 to 8,
with separate authenticated experiences for **students** and **teachers**.

Curriculum reference: [CBSE Academic — CTAI 2026-27](https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri3SH_2026-27.pdf)

## Features

- 6 grade-level curricula (Class 3 → Class 8) with units, learning outcomes
  and hands-on activities
- Authentication with role selection (student / teacher)
  - Passwords hashed with bcrypt
  - JWT session in an `httpOnly` cookie (signed with `jose`)
- Student dashboard with personal progress tracking per unit
- Teacher dashboard with a class-wise roster and progress overview
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

Open <http://localhost:3000>.

## Project structure

```
app/
  api/               Node.js route handlers (auth, progress, teacher)
  curriculum/        Class index + per-class unit pages
  dashboard/         Student & teacher dashboards
  login, register    Auth pages
components/          Client components (UnitCard, LogoutButton)
data/
  curriculum.js      Class 3-8 CTAI curriculum data
  store.json         Auto-created JSON store (gitignored)
lib/
  auth.js            JWT signing, cookie helpers, getCurrentUser()
  db.js              File-backed store for users + progress
```

## Notes

- The JSON store is ideal for dev / classroom prototypes. For production,
  swap `lib/db.js` for a real database (Postgres, MongoDB, etc).
- Curriculum content is adapted from the public CBSE CTAI document for
  educational purposes.
