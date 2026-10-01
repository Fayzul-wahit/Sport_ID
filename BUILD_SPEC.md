# Sports ID Platform: Build Spec (Phase 1 Vertical Slice)

Read this file fully before writing any code. Also read `/design` (screen images and design system) and `docs/MASTER_PROMPT.md` (product vision). If anything conflicts, this file wins for implementation and the master prompt wins for product intent.

## 0. Working rules for the agent

1. **Plan first.** Before coding, write `docs/PLAN.md` with the folder structure and milestone checklist, then stop and wait for approval.
2. **One milestone at a time.** After each milestone: run the app, run tests, summarize what works and what doesn't, then stop for review. Do not start the next milestone on your own.
3. **Match the designs.** Screens in `/design` are the visual reference. Reuse the design system exactly (colors, fonts, spacing, button size, status chips). Do not copy generated code structure; build clean components.
4. **No invented content.** Do not add government, federation, "official" or "tamper-proof" claims, fake statistics, or sample data presented as real.
5. **Ask when unclear** instead of guessing on anything touching verification, permissions or privacy.

## 1. Scope

**Goal:** one complete working path:

`Athlete registers → picks sport → gets Sports ID + QR → adds achievement (certificate upload + OCR + athlete confirms) → requests verification → organization representative confirms or cannot confirm → green "Organization Verified" status appears on the athlete's Sports ID and public QR page.`

**In scope:** auth, roles, language (English/Tamil/Malayalam), athlete profile, Sports ID, achievements, certificate upload, OCR with confirmation, verification requests and records, audit log, journey timeline, home, public QR profile, basic discover, organization dashboard (requests list and detail).

**Out of scope (do not build):** performance radar, coach recommendations, tournaments, opportunities, voice input, natural-language search, anomaly detection, payments, social feed, full admin panel (organizations are approved manually via the database for now).

## 2. Tech stack

| Layer | Choice |
|---|---|
| App | Next.js (App Router) + TypeScript + Tailwind CSS, a single project |
| Layout | Route groups: `(athlete)` mobile-first, `(org)` desktop dashboard, `(public)` QR profile |
| Backend | Supabase: Postgres, Auth, Storage, Row Level Security |
| i18n | `next-intl` with `en`, `ta`, `ml` message files; no hard-coded UI strings |
| OCR | Server-side route calling a vision/document API behind an interface `extractCertificate(file) → fields`. Start with a mock implementation, then connect a real provider with the key in env vars |
| QR | `qrcode` library, generated from the public profile URL |
| Validation | `zod` on every API input |
| Tests | Vitest for logic, Playwright for the main flow |

Keep secrets in `.env.local` and never commit them. Provide `.env.example`.

## 3. Roles

`athlete`, `org_rep`, `admin` (stored on `profiles.role`). Coach and scout roles are out of scope. Role checks happen on the server and in database policies, never only in the UI.

## 4. Data model

IDs are UUIDs unless stated. All tables have `created_at`.

| Table | Key columns |
|---|---|
| `profiles` | `id` (= auth user id), `role`, `full_name`, `language` (en/ta/ml) |
| `athlete_profiles` | `user_id`, `sports_id` (unique, format `ATH-YYYY-NNNNNN`), `primary_sport`, `position`, `city`, `state`, `date_of_birth`, `gender`, `avatar_url`, `is_public` (default true) |
| `organizations` | `org_id` (unique, format `ORG-TN-NNNNNN`), `name`, `type`, `city`, `state`, `sports` (array), `contact_email`, `status` (`pending`, `verified`, `rejected`, `suspended`) |
| `organization_representatives` | `organization_id`, `user_id`, `status` (`active`, `revoked`) |
| `achievements` | `athlete_id`, `event_name`, `sport`, `level` (`school`, `district`, `state`, `national`, `international`), `result` (`first`, `second`, `third`, `finalist`, `participation`, `mvp`, `best_player`, `special`), `event_date`, `location`, `organizer_name`, `organization_id` (nullable), `certificate_number`, `verification_status` |
| `achievement_documents` | `achievement_id`, `storage_path` (private bucket), `mime_type`, `size_bytes`, `ocr_raw` (jsonb) |
| `verification_requests` | `achievement_id`, `organization_id`, `status` (`pending`, `confirmed`, `not_confirmed`, `cancelled`), `reason`, `requested_at`, `decided_at`, `decided_by` |
| `verification_records` | **append-only**: `achievement_id`, `organization_id`, `verified_by` (user), `action` (`confirmed`, `withdrawn`), `reason` |
| `audit_logs` | **append-only**: `actor_id`, `action`, `entity_type`, `entity_id`, `previous_state` (jsonb), `new_state` (jsonb) |

Sports ID and Org ID are generated server-side from database sequences, never by the client.

## 5. Verification state machine (hard requirements)

`achievements.verification_status`: `self_reported`, `under_review`, `org_verified`, `not_confirmed`, `withdrawn`.

| From | Event | To | Who may trigger |
|---|---|---|---|
| (new) | athlete confirms OCR/manual details | `self_reported` | athlete |
| `self_reported` | athlete uploads certificate and requests verification | `under_review` | athlete |
| `under_review` | active rep of the **addressed, verified** organization confirms | `org_verified` | org rep only |
| `under_review` | that rep selects Cannot Confirm (reason optional) | `not_confirmed` | org rep only |
| `org_verified` | same organization withdraws | `withdrawn` | org rep only |
| `not_confirmed` or `withdrawn` | athlete re-requests | `under_review` | athlete |

**Rules that must never be broken:**

1. `org_verified` can only be set inside the confirm action, by an active representative of a `verified` organization that matches the request's `organization_id`.
2. Athletes, admins and AI/OCR code can never set `org_verified` directly.
3. OCR output only pre-fills a form. Nothing is saved until the athlete presses Save.
4. Every transition writes one `verification_records` row (if applicable) and one `audit_logs` row, in the same database transaction as the status change.
5. `verification_records` and `audit_logs` allow `INSERT` and `SELECT` only. No `UPDATE` or `DELETE` policies for any role.
6. Withdrawal keeps history: the earlier `confirmed` record stays; a new `withdrawn` record is added.
7. UI wording for verified items: "Organization Verified" plus verifier name, Org ID and date. Never wording that says AI or the platform proved something.

## 6. Permissions (Row Level Security)

- **Athlete:** read and write only their own profile, achievements and documents. Read the status of their own verification requests.
- **Org rep:** read requests addressed to their organization; read the certificate of those requests only (signed URL, short expiry); insert confirm/not-confirm/withdraw actions for their own organization only.
- **Admin:** read everything; may approve organizations; may **not** edit verification records.
- **Public:** reads only through a database view `public_athlete_view` that exposes name, Sports ID, sport, position, level, and achievements with their verification status. It must exclude email, phone, date of birth, documents and storage paths. Respect `is_public`.
- **Storage:** certificate bucket is private. No public URLs. Validate file type (JPG, PNG, PDF) and size (max 10 MB) on upload.
- Add rate limiting to auth, upload and OCR routes.

## 7. Screens to build (from `/design`)

| # | Screen | Route group |
|---|---|---|
| 1-2 | Language, sign up with OTP | `(athlete)` |
| 3-4 | Choose sport and position, Sports ID created (QR) | `(athlete)` |
| 5 | Home | `(athlete)` |
| 6-8, 8b | Add achievement, confirm details, detail, verified variant | `(athlete)` |
| 9 | Sports Journey timeline | `(athlete)` |
| 10 | Public profile (QR) | `(public)` |
| 11 | Discover (filters: sport, location, level, verified only) | `(athlete)` |
| 12-13, 13b | Verification requests, detail, cannot-confirm | `(org)` |

Every screen needs loading, empty and error states, with clear short messages. Minimum tap target 48px, body text at least 16px.

## 8. Milestones (stop for review after each)

| # | Milestone | Done when |
|---|---|---|
| M0 | Project setup: Next.js, Tailwind with design tokens, Supabase client, i18n skeleton, `.env.example`, `docs/PLAN.md` | App runs; tokens match `/design/design-system.md`; a language switcher changes text |
| M1 | Auth and roles, screens 1-2 | Sign up and log in work; role stored; language saved to profile |
| M2 | Athlete profile, screens 3-4 | Sport and position saved; unique Sports ID generated; QR shown |
| M3 | Achievements, screens 6-8 | Manual and certificate upload work; OCR pre-fills a form; nothing saves before the athlete confirms; status shows Self-reported |
| M4 | Organizations, screens 12-13, 13b | A seeded verified org and rep can log in; see only their own requests; can view the certificate |
| M5 | Verification, screen 8b | Request, confirm, cannot-confirm and withdraw follow section 5; records and audit rows written atomically; green status appears |
| M6 | Home, Journey, Public profile (5, 9, 10) | Timeline shows statuses; QR page exposes no private data |
| M7 | Discover (11) | Filters work; verified-only filter works |
| M8 | Hardening | Tests below pass; security checklist complete |

## 9. Tests required

- **State machine:** every row of the table in section 5 passes; every other transition is rejected.
- **Permissions:** an athlete cannot set `org_verified`; org A's rep cannot see or confirm org B's requests; a revoked rep cannot act; a `pending` organization cannot verify.
- **Immutability:** `UPDATE` and `DELETE` on `verification_records` and `audit_logs` fail.
- **Privacy:** the public view and QR page never return email, phone, date of birth or document paths; private documents are unreachable without a signed URL.
- **OCR:** extracted data is never persisted without the athlete's confirmation.
- **End-to-end (Playwright):** the full flow in section 1 passes in one run.

## 10. Seed data (development only)

Create a seed script with: one admin, one verified organization ("Demo District Sports Association") with one representative, and two demo athletes. Mark all seed data as demo data in the database. Never show demo data in production.

## 11. Definition of done

- The Section 1 flow works end to end in English, Tamil and Malayalam.
- All Section 9 tests pass.
- No private data reachable from public routes.
- No unrequested claims or statistics in the UI.
- `README.md` explains setup, environment variables, seeding and running tests.
