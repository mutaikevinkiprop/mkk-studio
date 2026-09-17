# mkk Studio

A high-fidelity studio website and lead-management (CRM) platform built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

mkk Studio is a creative development practice. This repository contains both the public-facing marketing site and an internal admin area for managing inbound leads.

---

## Features

### Public site
- **Home** - art-directed hero, marquee, services, selected work showcase, manifesto, and CTA sections
- **Work** - editorial portfolio grid with variable project sizing
- **Studio** - studio positioning, values, and team information
- **Contact** - project inquiry form with validation, wired to lead capture

### Admin (CRM)
- **Dashboard** - lead overview and pipeline statistics
- **Leads** - lead table with detail views and status tracking
- **Settings** - team, email, and notification configuration

### Experience layer
- Custom cursor and magnetic interactions (fine-pointer devices only)
- Lenis smooth scrolling and GSAP/Framer Motion driven reveals
- Preloader and page transitions
- Full `prefers-reduced-motion` support

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (custom `mkk` design tokens) |
| Motion | Framer Motion, GSAP, Lenis |
| Data | Prisma ORM + PostgreSQL |
| Auth | JWT |
| Email | Nodemailer |
| Images | Next.js Image optimization (`sharp`) |

---

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- PostgreSQL (for the admin/CRM features)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env.local` file in the project root:

```bash
# PostgreSQL connection string (used by Prisma)
DATABASE_URL="postgresql://user:password@localhost:5432/mkk_studio?schema=public"

# Auth
JWT_SECRET="your-secret-key"

# Email (Nodemailer)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="you@example.com"
SMTP_PASS="your-password"
```

### 3. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site and [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the admin area.

---

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler (no emit) |

---

## Project Structure

```
mkk-studio/
|-- prisma/
|   `-- schema.prisma          # Lead, Project, User, Email models
|-- public/                    # Static assets
|-- src/
|   |-- app/                   # Next.js App Router
|   |   |-- (public)/          # Public route group - work, about, contact
|   |   |-- (admin)/           # Admin route group - dashboard, leads, settings
|   |   |-- api/               # API routes - leads, auth
|   |   |-- layout.tsx         # Root layout
|   |   `-- page.tsx           # Homepage
|   |-- components/
|   |   |-- cursor/            # CustomCursor
|   |   |-- layout/            # Navigation, Footer, Preloader, SmoothScroll, PageTransition
|   |   |-- motion/            # AnimatedText, ImageReveal, Magnetic, Marquee, InteractiveSphere
|   |   `-- sections/          # Hero, Services, SelectedWork, Manifesto, CTA, HorizontalShowcase
|   |-- content/
|   |   `-- site.ts            # All site copy and data (single source of truth)
|   |-- hooks/                 # usePrefersReducedMotion, useHasFinePointer
|   |-- lib/                   # Utilities
|   `-- styles/
|       `-- globals.css        # Global styles and design tokens
|-- tailwind.config.ts         # Design tokens (color, type, motion)
`-- next.config.js
```

---

## Design System

Content lives in `src/content/site.ts` so the interface can be re-skinned without touching components. Tokens live in `tailwind.config.ts`.

### Color
- **Ink Navy** - `#0F172A` (primary foundation), with a `900`-`600` scale
- **Signal Cyan** - `#22D3EE` (accent), with `400`/`300` variants
- **Neutral** - derived grayscale (`50`-`900`) for hierarchy

No gradients and no colors beyond the documented palette.

### Typography
- **Display** - Space Grotesk (interface headings, large scale)
- **Sans** - Inter (body and UI)
- Extended type scale from `xs` through `10xl`

### Form & Motion
- Maximum radius of `8px` (`md`); no pills, glassmorphism, or soft cards
- Flat surfaces, minimal shadow, 8px spacing system
- Custom easing: `ease-mkk` = `cubic-bezier(0.16, 1, 0.3, 1)`
- All motion respects `prefers-reduced-motion`

---

## API Reference

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/leads` | List leads |
| `POST` | `/api/leads` | Create a lead from the contact form |
| `POST` | `/api/auth` | Authenticate an admin user |

> **Note:** API routes are currently scaffolded with in-memory sample data and marked with `TODO`s for Prisma/database wiring, JWT generation, and email delivery.

---

## Deployment

1. Set all environment variables (see `Getting Started`) in your hosting provider.
2. Run `npm run build` to produce the production bundle.
3. Run `npm run start` to serve it.
4. Point a PostgreSQL instance at `DATABASE_URL` and apply the Prisma schema.

---

**Brand first. Digital craft. Original content.**