# MockPrep architecture

## Goals that shape the design

1. **Low cognitive load.** Every screen answers "what do I do next?" The 5-step lifecycle (Discover → Prepare → Practice → Apply → Join) is both the navigation model and the data model (`UserGoal.stage`).
2. **Multi-language.** Content stores every language it has, and the UI falls back to English per string, never per page.
3. **Cheap to serve at exam-season spikes.** Read-heavy pages are prerendered and cached. The database is touched on writes and revalidation, not on every visit.
4. **Trustworthy job information.** Nothing is published without an official source and an editor's verification.

## System overview

```
Browser ──► Next.js (App Router, Cache Components)
              │  Server Components ── lib/data/* ("use cache" + cacheTag)
              │                           │
              │                           ▼
              │                      Prisma Client 7 ──(pg adapter, TCP)──► Prisma Postgres
              │
              └─ Client Components ── React Context (preferences, test session)
                                          └─ localStorage (per-device persistence)
```

A single Next.js app (backend-for-frontend). No separate API service until a mobile app or partner integration needs one. Route Handlers can expose the same `lib/data` functions then.

## Data model (`prisma/schema.prisma`)

| Area | Models | Notes |
| --- | --- | --- |
| Users | `User` | Phone-first (OTP) login for the target audience; `preferredLang`, `qualification`, `birthDate` drive eligibility. |
| Exams | `Exam` | The hub: tests, jobs, roadmaps and books all hang off an exam. `eligibleQuals` powers the matcher. |
| Question bank | `Question`, `QuestionTranslation` | Questions are reusable across tests. Each language is a reviewed row, so a Hindi version can lag English without blocking publishing. |
| Tests | `Test`, `TestSection`, `TestQuestion` | Marking scheme on the test; sections have a stable `key` for the UI. |
| Attempts | `Attempt`, `AttemptAnswer` | Ready for server-side attempts (see below). `deadlineAt` is set by the server. |
| Jobs | `JobPosting`, `ApplicationStep`, `RequiredDocument` | Ordered 1-2-3 steps and documents. Only rows with `status = PUBLISHED` and `verifiedAt` set are shown. |
| Prep | `Roadmap`, `RoadmapStep`, `Book`, `ExamBook` | Roadmap steps can link to a practice test. |
| Lifecycle | `UserGoal`, `UserApplication`, `AlertSubscription` | Per-exam stage plus per-job application status (saved → applied → … → joined). |

**Localised text.** Short strings are `Json` columns shaped `{ en, hi?, … }`. `lib/i18n.ts#asLocalized` validates them at the data boundary. Questions use a translation table instead because they need per-language review.

## Rendering & caching

- `lib/data/*` functions are `"use cache"` with tags (`tests`, `test:<slug>`, `exams`, `jobs`, `books`). An editor save calls `revalidateTag(...)` so changes go live without a redeploy.
- `/test/[testId]` uses `generateStaticParams` from published tests. New tests are rendered on first visit and then cached.
- Client Components receive plain view models (`lib/types.ts`), never Prisma objects.

## Client state (React Context)

| Context | Scope | Holds |
| --- | --- | --- |
| `PreferencesContext` | Whole app (root layout) | Content language, high contrast, large text. Reflected on `<html>` as `lang` / `data-*`. |
| `TestSessionContext` | One test page | Attempt (answers, marked, visited, current question, start/finish time) and actions. |

Both persist through `lib/local-store.ts`, a `useSyncExternalStore` wrapper over `localStorage` with an in-memory fallback. This avoids hydration mismatches and keeps answers through a refresh. The countdown keeps its own 1-second tick, so only the timer re-renders each second.

## Mock test scoring — current vs. target

**Now:** the page sends the full test, answer key included, and `lib/scoring.ts` scores in the browser. It is instant and works offline, which is right for practice tests. The runner records tab switches in local storage as a focus reminder, but browser-only signals and scoring are user-editable and are not anti-cheat or tamper-proof.

**Target, once accounts exist:**
1. A Server Action `startAttempt(testSlug)` creates an `Attempt` with `deadlineAt = now + duration`.
2. The page receives questions *without* `answerIndex` / `explanation`.
3. Answers sync in batches (`AttemptAnswer` upserts) through a Server Action.
4. `submitAttempt` scores on the server with the same `scoreAttempt()` and rejects submissions after `deadlineAt` + a grace period. Explanations are returned only after that.

That enables percentile ranks (`@@index([testId, score])`) and tamper-proof leaderboards.

## Roadmap

| Phase | Scope |
| --- | --- |
| **Now** | Home, exam matcher, 3 seeded tests with client scoring, job guides, books, preferences |
| **Next** | Auth (phone OTP), server-side attempts, attempt history and lifecycle tracker UI, full UI translation (route-level `[lang]` + dictionaries) |
| **Later** | Editor CMS with a verification workflow for jobs, alert delivery (web push → WhatsApp), roadmap pages per exam, more languages |
