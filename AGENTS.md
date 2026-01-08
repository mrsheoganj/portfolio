# Agent Instructions

This repository contains a Next.js Portfolio application.

## Key Architecture
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM (Currently configured with a Mock Layer in `lib/db-mock.ts` for sandbox compatibility).
- **Auth**: NextAuth.js (Credentials Provider).

## Development
- Run `npm run dev` to start the server.
- The Admin Panel is at `/admin`.
- Default Admin Login (Mock): `prashantkumarsheoganj@gmail.com` / `password`.

## Important Notes
- **Mock DB**: The app uses a file-based JSON mock DB (`data/mock-db.json`) via `lib/db-mock.ts` because `prisma generate` fails in some constrained environments.
- **Switching to Real DB**: To use a real DB, follow the instructions in `DEPLOY.md` to enable the standard Prisma Client in `lib/prisma.ts`.
