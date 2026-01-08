# Deployment Instructions

This project is a Next.js application built with a Mock Database layer for demonstration. To deploy it to production (Vercel) with a real database (PostgreSQL), follow these steps:

## 1. Prerequisites
- A [Vercel](https://vercel.com) account.
- A [Cloudinary](https://cloudinary.com) account (for image uploads).
- A [PostgreSQL Database](https://vercel.com/docs/storage/vercel-postgres) (Vercel Postgres, Neon, or Supabase).

## 2. Environment Variables
In your Vercel project settings, add the following environment variables:

```env
DATABASE_URL="postgres://user:password@host:port/database"
NEXTAUTH_SECRET="generate-a-random-string-here"
NEXTAUTH_URL="https://your-domain.com"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="portfolio_preset"
```

## 3. Database Switching
Before deploying, you must switch from the Mock DB to the real Prisma Client.

1. Open `lib/prisma.ts`.
2. Replace the content with:
   ```typescript
   import { PrismaClient } from '@prisma/client';

   const globalForPrisma = global as unknown as { prisma: PrismaClient };

   export const prisma =
     globalForPrisma.prisma ||
     new PrismaClient({
       log: ['query'],
     });

   if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
   ```
3. Open `prisma/schema.prisma` and ensure the datasource is set to PostgreSQL:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Run `npx prisma generate` locally.

## 4. Database Migration & Seeding (Crucial)
After connecting Vercel to your GitHub repo and deploying, you need to set up the database schema and create your admin account.

**Option A: Using Vercel Build Command (Recommended)**
Update your "Build Command" in Vercel settings to:
`npx prisma db push && next build`

**Option B: Manual Setup**
1. Run this command locally (ensure your `.env` has the production `DATABASE_URL`):
   ```bash
   npx prisma db push
   ```
2. Seed the database with your admin account:
   ```bash
   npx tsx prisma/seed.ts
   ```
   *(Note: You might need to install `tsx` globally or use `npx ts-node prisma/seed.ts`)*.

## 5. Cloudinary Setup
1. In Cloudinary Settings > Upload, create a new "Upload Preset".
2. Name it `portfolio_preset` (or change the name in `new-project-form.tsx`).
3. Set "Signing Mode" to "Unsigned".
4. Enable the Cloudinary Widget code in `app/admin/portfolio/new-project-form.tsx` by uncommenting the `<CldUploadWidget>` block and removing the fallback input.

## Admin Access
- Default Admin Login (created by seed): `prashantkumarsheoganj@gmail.com` / `password`
- **Security Warning:** Change this password immediately after logging in or update `prisma/seed.ts` before running it.
