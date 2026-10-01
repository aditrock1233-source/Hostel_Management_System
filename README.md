# Hostel Management System (MERN)

Digital hostel environment for students, wardens, security and admins: rooms, passes, complaints, notices.

## Structure
- `server/`  Express + MongoDB API
- `client/`  React app (create with `npm create vite@latest client -- --template react`)

## Run the server
```bash
cd server
cp .env.example .env     # then edit values
npm install
node seedAdmin.js        # first admin account
npm run dev
```
Check http://localhost:5000/api/health

## Phase plan
| Phase | Goal | Done when |
|-------|------|-----------|
| 0 | Setup: repo, structure, env, team workflow | everyone can run the server locally |
| 1 | Auth + roles (JWT, bcrypt, role middleware), login/register UI | each role logs in and lands on its own dashboard |
| 2 | Rooms and student records (admin) | admin adds rooms, allocates students, sees occupancy |
| 3 | Passes: request, approve/reject, history | student requests, warden decides, status visible |
| 4 | Complaints: raise, assign, update, resolve | full lifecycle works with status timeline |
| 5 | Notices + manager dashboard stats | occupancy and complaint stats shown |
| 6 | Polish: validation, error handling, responsive UI, deploy (Render + Vercel + Atlas) | live link works |
| 7 | Extras if time: QR gate log, email notifications, escalation | optional |

## Team git workflow
- `main` = always working; `dev` = integration branch.
- One branch per feature: `feature/auth-ui`, `feature/rooms-api`, etc.
- Open a pull request into `dev`, get one teammate to review, then merge.
- Commit messages: `feat: add room model`, `fix: login error handling`.
