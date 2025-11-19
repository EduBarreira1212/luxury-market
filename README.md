<div align="center">

# Luxury Market

Premium marketplace for exotic cars and motorcycles built with Next.js 15, React 19, Prisma, and Tailwind CSS. Buyers browse curated inventory, while verified sellers manage listings, upload photo galleries to S3, and keep account data synchronized with PostgreSQL.

</div>

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Data Model](#data-model)
5. [Authentication & Authorization](#authentication--authorization)
6. [Core Features & Flows](#core-features--flows)
7. [API & Server Actions](#api--server-actions)
8. [Environment Configuration](#environment-configuration)
9. [Getting Started](#getting-started)
10. [Database Management](#database-management)
11. [Media Storage Setup](#media-storage-setup)
12. [Deployment Checklist](#deployment-checklist)
13. [Testing & Quality](#testing--quality)
14. [Troubleshooting Tips](#troubleshooting-tips)

---

## Project Overview

Luxury Market is a full-stack marketplace dedicated to high-end vehicles. It blends a visual browsing experience with a role-aware back office so that:

- Enthusiasts can explore curated car and motorcycle listings with immersive hero sections, carousels, and seller context.
- Buyers can register directly from the sign-in dialog, maintain their profile, and contact sellers.
- Sellers onboard through a step-by-step form, create rich ads with up to ten media assets, and manage the entire lifecycle of each listing.

The app uses Next.js App Router with a hybrid server/client component approach, Prisma for data persistence, AWS S3 + CloudFront for media delivery, and NextAuth for secure credentials-based authentication.

### Feature Highlights

- **Dual personas**: Buyers and sellers use tailored onboarding flows (`src/app/buyer`, `src/app/seller`) and share a unified account settings page.
- **Listing lifecycle**: Server actions in `src/app/_actions` create, update, and delete cars or motorcycles, automatically syncing with Prisma and revalidating cached routes.
- **Media uploads**: Sellers can upload up to ten images per vehicle. Files travel through `/api/uploads/presign`, get uploaded to S3, and are later read from `NEXT_PUBLIC_CLOUDFRONT_URL`.
- **My Ads dashboard**: The `/my-ads` route aggregates cars and motorcycles that belong to the signed-in seller, presenting quick entry points to edit pages.
- **Rich detail pages**: `/cars/[id]` and `/motorcycles/[id]` combine pricing cards, spec grids, seller information, and edit/delete actions (only for owners).
- **Inline account updates**: `AccountSettingCard` components provide quick edit controls with optimistic UI and server validation.
- **Accessible UI kit**: Tailwind CSS, shadcn/ui, Radix Primitives, Swiper, and Embla carousel power an accessible, responsive interface.

---

## Tech Stack

| Layer | Tools |
| --- | --- |
| Application | Next.js 15 (App Router), React 19, TypeScript |
| Styling & UI | Tailwind CSS, shadcn/ui, Radix UI, clsx, class-variance-authority, lucide-react icons |
| Forms & Validation | react-hook-form, Zod, @hookform/resolvers, react-phone-number-input, libphonenumber-js |
| Auth | NextAuth credentials provider with JWT sessions (`src/app/_lib/auth.ts`, `src/app/middleware.ts`) |
| Data | PostgreSQL via Prisma Client (`prisma/schema.prisma`) |
| Storage & Media | AWS S3 + (optional) CloudFront CDN, AWS SDK v3 |
| Utilities | Sonner for toasts, Swiper + Embla for carousels, tsx for scripts |
| Tooling | ESLint 9, Prettier 3, Tailwind CSS plugin, TypeScript 5, Docker Compose for local Postgres |

---

## Architecture

### Application Layers

1. **UI & Routing (`src/app`)**  
   Next.js App Router organizes routes such as `/cars`, `/motorcycles`, `/buyer`, `/seller`, `/create-ad`, `/my-ads`, `/account`, and `/about`. Layouts (`src/app/layout.tsx`) apply global providers, fonts, and the footer.

2. **Server Components & Actions**  
   Data-heavy components (listings, detail pages) are server components for SEO and data locality. Mutations live in `src/app/_actions` and leverage `use server` with built-in authentication checks and `revalidatePath`.

3. **Data-Access Abstraction (`src/app/_data-access`)**  
   `server-only` modules centralize Prisma queries (e.g., `getCars`, `getSellerAds`, `getAccountById`) to keep server boundaries explicit.

4. **APIs & Integrations (`src/app/api`)**  
   - `/api/uploads/presign` issues temporary S3 upload URLs, validates file metadata, and enforces ownership rules.
   - `/api/cars/[id]/photos` and `/api/motorcycles/[id]/photos` persist uploaded keys and allow deletions while also attempting to purge S3 objects.
   - `/api/auth/[...nextauth]` is automatically handled by NextAuth.

5. **Libraries & Helpers (`src/app/_lib` / `_helpers`)**  
   - `auth.ts` instantiates NextAuth Credentials provider.
   - `prisma.ts` ensures a singleton Prisma client in development.
   - `s3.ts` configures the AWS SDK.
   - `helpers/currency.ts` formats currency consistently.

### Directory Reference

```
luxury-market/
├── src/
│   └── app/
│       ├── _actions/              # Server actions (create/update/delete entities, auth updates)
│       ├── _components/           # Shared UI: header, dialogs, cards, carousels, uploader, etc.
│       ├── _data-access/          # Server-only Prisma query modules grouped by domain
│       ├── _helpers/              # Formatting helpers
│       ├── _lib/                  # Auth, Prisma, AWS S3, utility functions
│       ├── _schemas/              # Zod schemas for forms (cars, motorcycles, seller, buyer, auth)
│       ├── _types/                # Shared TypeScript types + NextAuth module augmentation
│       ├── (route folders)        # `/`, `/cars`, `/motorcycles`, `/create-ad`, `/edit-ad/[id]`, etc.
│       ├── api/                   # Route handlers for uploads & photo management
│       ├── providers/             # Client-side providers (NextAuth SessionProvider)
│       ├── globals.css            # Tailwind layers + global styles
│       └── layout.tsx             # Root layout applying fonts, footer, toasts
├── prisma/
│   ├── schema.prisma              # Database schema (Seller, Buyer, Car, Motorcycle, enums)
│   └── seed.ts                    # Seed script using Faker + bcrypt
├── public/                        # Static hero images used in carousels/backgrounds
├── docker-compose.yml             # Local Postgres service
├── package.json                   # Scripts and dependencies
└── tailwind.config.ts / eslint / tsconfig / etc.
```

---

## Data Model

Prisma schema (`prisma/schema.prisma`) defines the relational model:

| Model | Key Fields | Notes |
| --- | --- | --- |
| `Seller` | `id`, `name`, `email`, `password`, `address`, `phoneNumber`, `about`, timestamps | Owns multiple `Car` and `Motorcycle` records. Passwords hashed with bcrypt. |
| `Buyer` | `id`, `name`, `email`, `password`, `phoneNumber`, timestamps | Used for browsing and account management. |
| `Car` | `id`, `sellerId`, `model`, `brand`, `year`, `mileage`, `condition`, `price`, `fuel`, `gearbox`, `about`, `s3Keys[]` | `s3Keys` holds up to ten S3 object keys for photo galleries. |
| `Motorcycle` | `id`, `sellerId`, `model`, `brand`, `year`, `mileage`, `condition`, `price`, `cc`, `about`, `s3Keys[]` | Similar to `Car`, but stores engine displacement (`cc`). |
| Enums | `FuelType`, `Condition`, `Gearbox` | Provide controlled vocabularies used by forms and filters. |

Relationships:  
- `Seller` → `Car[]` / `Motorcycle[]` (cascade delete).  
- Buyers currently do not relate to listings directly but have distinct authentication/authorization rules.

---

## Authentication & Authorization

- **NextAuth Credentials Provider** (`src/app/_lib/auth.ts`) handles login for both buyers and sellers by checking the database for a matching email (case-insensitive) and verifying bcrypt hashes.
- **Roles**: `Session.user.role` is augmented via `src/app/_types/next-auth.d.ts`. The role influences UI (e.g., sellers see *My ads*) and authorization in server actions/APIs.
- **Middleware**: `src/app/middleware.ts` re-exports `auth` to make sessions available in server components.
- **Session strategy**: JWT-based sessions keep responses stateless while storing the `id` and `role` claims on the token.
- **Protected mutations**:
  - Listing updates/deletions ensure the session user owns the listing (`updateCar`, `updateMotorcycle`, `deleteCar`, `deleteMotorcycle`).
  - Photo upload routes only accept requests from the seller that owns the vehicle.
  - Account settings forms call server actions that gate writes by role.

---

## Core Features & Flows

### Public Browsing
- `/` shows a hero carousel (`src/app/_components/images-carousel.tsx`) with Swiper and curated category cards.
- `/cars` and `/motorcycles` fetch inventory via `getCars` / `getMotorcycles` (server-only Prisma queries) and render `VehicleCard` components that display a cover image from CloudFront.
- `/cars/[id]` and `/motorcycles/[id]` present detailed specs, seller bio, a call-to-action button, and—if the visitor is the owner—an `EditDeleteContainer` with edit/delete affordances.

### Buyer Experience
- **Sign up**: Accessible from the sign-in dialog (`LogInDialog`). Buyers fill out `SignUpForm` which validates with Zod and `react-hook-form`, then calls the `createBuyer` server action.
- **Authentication**: After successful creation, the form attempts to sign the user in automatically with NextAuth credentials.
- **Profile management**: `/account` uses `AccountSettingsForm` to allow inline updates of name, email, and phone number, plus password changes via `updateBuyerPassword`.

### Seller Experience
- **Onboarding (`/seller`)**: `CreateSellerForm` collects business profile, address, phone, and password, then calls `createSeller`. Inputs leverage `react-phone-number-input` and masked icons for better UX.
- **Listing creation (`/create-ad`)**:
  - Tabbed UI (Radix Tabs) toggles between car and motorcycle forms.
  - Forms rely on the seller's session ID to populate `sellerId` automatically.
  - The `Uploader` component handles client-side selection before upload.
  - After creating the record via `createCar`/`createMotorcycle`, the form requests presigned URLs, PUTs files directly to S3, and persists keys via `/api/.../photos`.
- **My Ads (`/my-ads`)**: Displays cars and motorcycles owned by the seller with quick navigation to details or edit pages. If the seller has no listings, `EmptyState` prompts them to create one.

### Listing Management
- **Editing (`/edit-ad/[id]`)**: Server component resolves whether the ID maps to a car or motorcycle the seller owns, then renders the matching edit form.
- **Photo management**: Existing photos show thumbnails with delete toggles. Uploads reuse the presign flow and enforce max 10 photos per vehicle and allowed MIME types (`image/jpeg`, `png`, `webp`, `avif`).
- **Deletion**: `deleteCar`/`deleteMotorcycle` actions remove database records, attempt to bulk delete associated S3 keys, and revalidate `/my-ads`.

### Media Storage Workflow
1. Seller selects files (up to 10) from the client-side `Uploader`.
2. Client POSTs metadata to `/api/uploads/presign` which:
   - Authenticates the seller via `auth()`.
   - Validates file type/size (configurable via `MAX_UPLOAD_MB`).
   - Verifies vehicle ownership.
   - Returns a signed URL + sanitized storage key.
3. Client `PUT`s file bytes directly to S3 with the signed URL.
4. Client persists the key via `/api/cars/[id]/photos` or `/api/motorcycles/[id]/photos`.
5. Components such as `VehicleCard` and `VehicleCarousel` read from `NEXT_PUBLIC_CLOUDFRONT_URL + key`, enabling CDN caching.

### Account Management
- `AccountSettingCard` wraps inline forms that trigger server actions per field.
- Password updates (`AccountPasswordUpdateForm`) compare current passwords (via bcrypt) before saving new hashes.
- The dropdown menu in `HeaderRight` exposes entry points for `/account`, `My ads`, and `Sign out`.

---

## API & Server Actions

### REST-like Route Handlers

| Endpoint | Method | Description | Auth |
| --- | --- | --- | --- |
| `/api/uploads/presign` | `POST` | Generates an S3 upload URL for a given vehicle and validates metadata. | Seller session required |
| `/api/cars/[id]/photos` | `POST` | Appends a photo key to the car's `s3Keys`. | Seller must own car |
| `/api/cars/[id]/photos/delete` | `POST` | Removes a key from the car record and attempts to delete the S3 object. | Seller must own car |
| `/api/motorcycles/[id]/photos` | `POST` | Same behavior for motorcycle listings. | Seller must own motorcycle |
| `/api/motorcycles/[id]/photos/delete` | `POST` | Removes motorcycle photo and purges S3 object. | Seller must own motorcycle |
| `/api/auth/[...nextauth]` | `ALL` | Built-in NextAuth handler for sign-in/out/callbacks. | Handles buyers & sellers |

> **Note:** All handlers that talk to AWS declare `export const runtime = 'nodejs';` to ensure they execute on a Node runtime (the AWS SDK requires native Node APIs).

### Server Actions (selected examples)

| File | Responsibility |
| --- | --- |
| `_actions/create-seller.ts`, `_actions/create-buyer.ts` | Register new accounts with salted bcrypt hashes. |
| `_actions/create-car.ts`, `_actions/create-motorcycle.ts` | Persist listing metadata before media uploads. |
| `_actions/update-car.ts`, `_actions/update-motorcycle.ts` | Validate ownership, update listing data, revalidate caches. |
| `_actions/delete-car.ts`, `_actions/delete-motorcycle.ts` | Delete listings and cascade deletion to S3. |
| `_actions/update-seller.ts`, `_actions/update-buyer.ts` | Update profile fields then revalidate `/account`. |
| `_actions/update-seller-password.ts`, `_actions/update-buyer-password.ts` | Validate current password, hash the new password, and persist. |

---

## Environment Configuration

Create a `.env.local` (used by Next.js) with the variables below. The sample values assume Dockerized Postgres and an AWS S3 bucket:

```bash
DATABASE_URL="postgresql://root:root123@localhost:5432/luxury_market_db?schema=public"
NEXTAUTH_SECRET="replace-with-long-random-string"
NEXTAUTH_URL="http://localhost:3000"

# AWS / S3
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="YOUR_KEY"
AWS_SECRET_ACCESS_KEY="YOUR_SECRET"
S3_BUCKET="luxury-market-dev"
NEXT_PUBLIC_CLOUDFRONT_URL="https://dxxxxxxxx.cloudfront.net" # or https://<bucket>.s3.<region>.amazonaws.com for dev
MAX_UPLOAD_MB="10" # optional, defaults to 10
```

Additional notes:

- `DATABASE_URL` must point to a Postgres instance that Prisma can access.
- `NEXTAUTH_SECRET` must stay consistent between deployments or sessions will break.
- `NEXTAUTH_URL` should match the canonical URL of your deployment (`http://localhost:3000` in development, `https://your-domain.com` in production).
- `NEXT_PUBLIC_CLOUDFRONT_URL` is used client-side; ensure it is publicly accessible.
- If you use IAM roles instead of key-based auth (e.g., on AWS ECS), configure credentials accordingly.

---

## Getting Started

1. **Install prerequisites**
   - Node.js 20.x (Next.js 15 requires ≥ 18.17; Node 20 recommended)
   - npm 10.x (ships with Node 20)
   - Docker (for local Postgres) or your own Postgres instance

2. **Clone & install dependencies**
   ```bash
   git clone <repo-url>
   cd luxury-market
   npm install
   ```

3. **Configure environment**
   - Copy `.env.local` as described above.
   - (Optional) Configure AWS credentials via environment or `~/.aws/credentials`.

4. **Start Postgres**
   ```bash
   docker compose up -d postgres
   ```
   Docker Compose uses `postgres:15` with username `root`, password `root123`, and database `luxury_market_db`.

5. **Generate & run Prisma migrations**
   ```bash
   npx prisma migrate dev --name init
   ```
   If the schema already exists, run `npx prisma db push` instead.

6. **Seed sample data (optional)**
   ```bash
   npm run db:seed
   ```
   The seed script (`prisma/seed.ts`) creates one seller, one buyer, and sample vehicles with the password `Test12345@`. Emails and IDs are randomized; check the database or Prisma Studio to retrieve them.

7. **Run the development server**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to interact with the app.

8. **Sign in**
   - Use the header dialog to create a buyer account or the `/seller` route for sellers.
   - Alternatively, use credentials from the seed data (consult the DB for generated emails).

---

## Database Management

- **Migrations**  
  `npx prisma migrate dev --name <migration-name>` — creates & runs migrations locally.  
  `npx prisma migrate deploy` — run during production deployments.

- **Introspection & schema sync**  
  `npx prisma db pull` if the database schema changes outside Prisma.  
  `npx prisma generate` regenerates the Prisma client (automatically run after migrations).

- **Seeding**  
  `npm run db:seed` uses `tsx` to execute `prisma/seed.ts`. Customize data or add deterministic fixtures as needed.

- **Prisma Studio**  
  `npx prisma studio` opens a GUI to inspect tables—handy for retrieving seeded emails/passwords.

---

## Media Storage Setup

1. **Create an S3 bucket** dedicated to vehicle photos. Disable public ACLs and serve files through a CloudFront distribution if possible.
2. **Bucket policy** should allow the CloudFront OAI (if used) or be world-readable if you opt for direct S3 URLs.
3. **CloudFront (optional but recommended)**  
   - Point the distribution to the S3 bucket origin.  
   - Set `NEXT_PUBLIC_CLOUDFRONT_URL` to the distribution domain.  
   - Enable caching headers; uploads already set `CacheControl: public, max-age=31536000, immutable`.
4. **IAM credentials** must allow `s3:PutObject`, `s3:DeleteObject`, and `s3:GetObject` on the bucket prefix used (`{env}/cars/*`, `{env}/motorcycles/*`).
5. **Upload constraints**  
   - MIME types limited to JPEG, PNG, WEBP, or AVIF.  
   - Maximum size defined by `MAX_UPLOAD_MB` (defaults to 10 MB).  
   - Each listing may store up to 10 photos; APIs enforce this.
6. **Development fallback**  
   - If you do not have S3/CloudFront yet, you can temporarily point `NEXT_PUBLIC_CLOUDFRONT_URL` to `https://<bucket>.s3.<region>.amazonaws.com`.  
   - For fully offline dev, swap the upload logic with a mock implementation (not provided here).

---

## Deployment Checklist

- [ ] Set production values for every environment variable, especially `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and AWS credentials.
- [ ] Provision a managed Postgres database and update `DATABASE_URL`.
- [ ] Run `npx prisma migrate deploy` against the production DB.
- [ ] Ensure the Next.js runtime has network access to the Postgres DB and S3.
- [ ] Provide write access for the AWS IAM principal used in production.
- [ ] Configure a CDN (`NEXT_PUBLIC_CLOUDFRONT_URL`) for fast media delivery.
- [ ] Run `npm run build` and `npm run start` (or deploy via a platform like Vercel) to verify that the app compiles in production mode.
- [ ] Confirm NextAuth callbacks/URLs (especially if deploying behind a proxy or custom domain).

---

## Testing & Quality

- **Linting**: `npm run lint` leverages ESLint 9 with `eslint-config-next` and Prettier integration. Resolve lint errors before committing.
- **Type safety**: TypeScript is enabled project-wide; run `tsc --noEmit` (or rely on IDE diagnostics) to ensure types remain accurate.
- **Manual QA suggestions**:
  1. Seller onboarding, login, and ad creation (with multiple photos).
  2. Editing listings, deleting photos, and ensuring S3 keys change accordingly.
  3. Buyer sign-up flow via the modal, including password validation messages.
  4. Account edits + password updates for both roles.
  5. Authorization checks (buyers should not access `/my-ads`, sellers cannot edit others' listings).

> Automated tests are not yet implemented. Consider adding integration tests (Playwright), unit tests for server actions, and contract tests for the S3 upload flow as future work.

---

## Troubleshooting Tips

- **Cannot sign in**: Ensure `NEXTAUTH_SECRET` matches the environment where you created the session. Confirm the credentials exist in the database (use Prisma Studio after seeding).
- **Database connection errors**: Verify Docker is running, the container is healthy (`docker ps`, `docker compose logs postgres`), and `DATABASE_URL` matches the credentials in `docker-compose.yml`.
- **S3 upload failures**: Check CloudWatch/IAM permissions, confirm MIME type + file size limits, and inspect `/api/uploads/presign` logs for validation errors. Remember that presigned URLs expire in 60 seconds.
- **Photos not showing**: Confirm `NEXT_PUBLIC_CLOUDFRONT_URL` is correct and that the object exists in the bucket. Use your CDN URL + key in a browser to test.
- **Stale data after edits**: Server actions call `revalidatePath`, but browser caches may still hold old data. Trigger a hard refresh or ensure you're not running multiple instances of the dev server.
- **Random seed emails**: The seeding script generates random emails; inspect the DB to retrieve them or create deterministic values before running `npm run db:seed`.

---

Happy building! If you extend the marketplace (e.g., add messaging, payments, or search), follow the established patterns: place server actions in `_actions`, keep Prisma access inside `_data-access`, and lean on Zod schemas to validate every form submission.
