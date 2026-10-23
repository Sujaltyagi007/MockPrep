# MockPrep

Free, bilingual career-prep platform: timed mock tests, step-by-step job application guides, exam matching and book lists.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS 4 · Prisma ORM 7 · Prisma Postgres · lucide-react · React Context for client state.

## Getting started

```bash
pnpm install            # also runs `prisma generate`
pnpm db:dev             # start a local Prisma Postgres server in the background
cp .env.example .env    # paste the TCP URL printed by db:dev into DATABASE_URL
pnpm db:migrate         # apply migrations
pnpm db:seed            # load exams, tests, job guides and books
pnpm dev
```

Open http://localhost:3000.

For a hosted database, create a Prisma Postgres database in [Prisma Console](https://console.prisma.io), copy its **direct TCP** connection string into `DATABASE_URL`, then run `pnpm db:deploy && pnpm db:seed`.

> The home page and test pages are prerendered from the database at build time, so `next build` needs a reachable `DATABASE_URL`.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` / `build` / `start` | Next.js dev server, production build, production server |
| `pnpm lint` / `typecheck` | ESLint / TypeScript |
| `pnpm db:dev` | Local Prisma Postgres (`prisma dev`) |
| `pnpm db:migrate` | Create and apply a migration after editing `prisma/schema.prisma` |
| `pnpm db:deploy` | Apply existing migrations (CI / production) |
| `pnpm db:seed` | Idempotent seed from `prisma/seed-data/` |
| `pnpm db:studio` | Browse data in Prisma Studio |

## Folder structure

```
app/                     Routes only: layouts, pages, metadata
  layout.tsx             Root layout; mounts <PreferencesProvider>
  page.tsx               Home: fetches data, composes sections
  test/[testId]/page.tsx Mock test route (statically generated per test)
components/
  ui/                    Design-system primitives (Button, ToggleChip, IconBadge, SectionHeading)
  layout/                Site chrome (header, footer, logo)
  home/                  Home page sections
  test/                  Mock test engine (intro, header/timer, question, palette, dialog)
    results/             Score summary, section breakdown, answer review
context/
  preferences-context    Language + reading aids, app-wide
  test-session-context   One test attempt: answers, navigation, submit
lib/
  data/                  Server-only, cached Prisma queries → plain view models
  generated/prisma/      Prisma Client output (gitignored, regenerated on install)
  prisma.ts              PrismaClient singleton (pg driver adapter)
  types.ts               View-model types shared by server and client
  i18n.ts                t(), language list, enum labels
  scoring.ts             Pure scoring function
  local-store.ts         localStorage as a useSyncExternalStore store
  site-content.ts        Static page copy (roadmap steps, FAQ)
prisma/
  schema.prisma          Data model
  migrations/            SQL migrations
  seed.ts, seed-data/    Seed script and content
docs/ARCHITECTURE.md     Design decisions
```

### Conventions

- **Server Components by default.** `"use client"` only where there is interaction or browser state.
- **Data flows one way:** `lib/data/*` (server-only, `"use cache"` + `cacheTag`) → page → props. Client Components never import Prisma, only `lib/types`.
- **Context holds client state**, never server data. Each context has a `useX()` hook that throws outside its provider.
- **Every interactive element is at least 44px tall**, and decorative icons use `aria-hidden`.
