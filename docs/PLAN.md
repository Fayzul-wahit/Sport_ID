# Sports ID Platform: Implementation Plan

## 1. Project Folder Structure

Next.js 14+ (App Router) + TypeScript + Tailwind CSS. Organized into three distinct route groups: `(athlete)` for mobile-first views, `(org)` for desktop dashboard, and `(public)` for QR profiles.

```
sports-id/
├── app/
│   ├── (athlete)/
│   │   ├── layout.tsx                     # Mobile shell (Bottom Nav, Header, Language Switcher)
│   │   ├── language/
│   │   │   └── page.tsx                   # Screen 1: Language selection
│   │   ├── auth/
│   │   │   └── sign-up/
│   │   │       └── page.tsx               # Screen 2: Sign up with OTP / login
│   │   ├── onboarding/
│   │   │   ├── sport/
│   │   │   │   └── page.tsx               # Screen 3: Choose sport & position
│   │   │   └── id-created/
│   │   │       └── page.tsx               # Screen 4: Sports ID created + QR
│   │   ├── home/
│   │   │   └── page.tsx                   # Screen 5: Home dashboard
│   │   ├── achievements/
│   │   │   ├── new/
│   │   │   │   ├── page.tsx               # Screen 6: Upload certificate / manual entry
│   │   │   │   └── confirm/
│   │   │       └── page.tsx           # Screen 7: Confirm OCR details
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Screen 8 & 8b: Achievement detail & verified status
│   │   ├── journey/
│   │   │   └── page.tsx                   # Screen 9: Sports Journey timeline
│   │   └── discover/
│   │       └── page.tsx                   # Screen 11: Discover athletes & filterable directory
│   ├── (org)/
│   │   ├── layout.tsx                     # Desktop administrative sidebar layout
│   │   └── requests/
│   │       ├── page.tsx                   # Screen 12: Verification requests queue table
│   │       └── [id]/
│   │           ├── page.tsx               # Screen 13: Verification detail & document inspector
│   │           └── cannot-confirm/
│   │               └── page.tsx           # Screen 13b: Cannot confirm explanation screen
│   ├── (public)/
│   │   ├── layout.tsx                     # Clean public view layout
│   │   └── p/
│   │       └── [sportsId]/
│   │           └── page.tsx               # Screen 10: Public QR athlete profile
│   ├── api/
│   │   ├── ocr/
│   │   │   └── route.ts                   # OCR extraction endpoint (server-side)
│   │   └── qr/
│   │       └── [sportsId]/
│   │           └── route.ts               # Dynamic QR image endpoint
│   ├── layout.tsx                         # Root layout (i18n provider, font loading)
│   └── page.tsx                           # Root landing / smart redirect
├── components/
│   ├── ui/                                # Design system primitives (Button, Input, Badge, Card, Modal)
│   ├── athlete/                           # SportsCard, JourneyTimeline, AchievementCard
│   ├── org/                               # RequestTable, CertificateViewer, ActionDrawer
│   └── public/                            # PublicProfileCard, VerifiedBadge
├── lib/
│   ├── supabase/
│   │   ├── client.ts                      # Browser Supabase client
│   │   ├── server.ts                      # Server Component Supabase client
│   │   ├── middleware.ts                  # Route protection & session refresh
│   │   └── database.types.ts              # Generated Supabase TS types
│   ├── ocr/
│   │   ├── interface.ts                   # extractCertificate(file) contract
│   │   ├── mock-provider.ts               # Local dev OCR implementation
│   │   └── vision-provider.ts             # Production Vision API OCR provider
│   ├── utils/
│   │   └── formatters.ts                  # ID formatting, date formatting, tabular numerals
│   └── validations/
│       ├── auth.ts                        # Zod schemas for auth
│       ├── achievement.ts                 # Zod schemas for achievement entry
│       └── verification.ts                # Zod schemas for verification actions
├── messages/                              # i18n locale files
│   ├── en.json                            # English UI strings
│   ├── ta.json                            # Tamil UI strings
│   └── ml.json                            # Malayalam UI strings
├── i18n/
│   ├── request.ts                         # next-intl server configuration
│   └── routing.ts                         # next-intl routing settings
├── supabase/
│   ├── migrations/                        # Sequenced SQL migration scripts
│   └── seed.sql                           # Seed script (demo org, rep, athletes)
├── tests/
│   ├── unit/                              # Vitest state machine & validation tests
│   ├── rls/                               # Vitest RLS security policies tests
│   └── e2e/                               # Playwright end-to-end full flow test
├── .env.example                           # Template environment variables
├── .env.local                             # Local secrets (never committed)
└── README.md                              # Setup, seeding, testing instructions
```

---

## 2. Milestones M0 to M8 Checklist & Acceptance Criteria

- [ ] **M0: Project Setup & Infrastructure**
  - **Acceptance Criteria:**
    - Next.js App Router project initialized with TypeScript and Tailwind CSS.
    - Tailwind theme configured with exact design tokens from `design/design-system.md` (Colors: `#0B1F3A` primary, `#FF6B1A` energetic orange, `#16A34A` verified green, etc.).
    - `next-intl` set up with locale files (`en.json`, `ta.json`, `ml.json`) and header Language Switcher component.
    - Supabase client initialized; `.env.example` provided.
    - `docs/PLAN.md` and `docs/QUESTIONS.md` written and approved.
  - **What to test yourself:**
    - Run `npm run dev` and open `http://localhost:3000`.
    - Click the language switcher (EN / தமிழ் / മലയാളം) and verify text updates seamlessly without layout break.
    - Verify design system color tokens and Inter font application.

- [ ] **M1: Auth & Roles (Screens 1, 2)**
  - **Acceptance Criteria:**
    - Sign up and Login flows working via OTP / passwordless auth.
    - User roles (`athlete`, `org_rep`, `admin`) saved in `profiles.role`.
    - Language preference saved to `profiles.language`.
  - **What to test yourself:**
    - Navigate to `/(athlete)/auth/sign-up`.
    - Register as a new athlete using OTP/credentials.
    - Confirm in Supabase dashboard or SQL log that `profiles` row is created with correct role and language.

- [ ] **M2: Athlete Profile & Sports ID Creation (Screens 3, 4)**
  - **Acceptance Criteria:**
    - Primary sport, position, city, state collected on onboarding.
    - Unique Sports ID generated server-side using Postgres sequence formatted as `ATH-YYYY-NNNNNN`.
    - Sports ID Card displayed with athlete details and generated QR code pointing to public URL.
  - **What to test yourself:**
    - Complete sport and position selection.
    - Verify generated Sports ID format (e.g., `ATH-2026-000001`).
    - Click or scan the QR code to verify it links to `/(public)/p/[sportsId]`.

- [ ] **M3: Achievements & OCR Flow (Screens 6, 7, 8)**
  - **Acceptance Criteria:**
    - Manual achievement entry and certificate upload (JPG, PNG, PDF up to 10MB) to private Supabase storage bucket `achievements-private`.
    - Server-side `extractCertificate(file)` runs and pre-fills the confirmation form.
    - **No data saved** until athlete explicitly clicks Save on confirmation screen.
    - Initial status created as `self_reported`.
  - **What to test yourself:**
    - Upload a certificate document on Screen 6.
    - Verify pre-filled extracted fields on Screen 7; edit a field value.
    - Click "Save & Confirm" and verify achievement is saved with status `self_reported`.
    - Verify image file resides in private bucket and is not publicly accessible without signed URL.

- [ ] **M4: Organization Dashboard (Screens 12, 13, 13b)**
  - **Acceptance Criteria:**
    - Seeded verified organization ("Demo District Sports Association") and active representative can log in to `(org)` desktop layout.
    - Queue displays only requests addressed to their `organization_id`.
    - Rep can view the certificate document via short-lived signed URL.
  - **What to test yourself:**
    - Log in as demo organization representative.
    - Open `/(org)/requests`, select a pending request, and view the certificate document.
    - Attempt to access requests belonging to another organization (verify access is restricted).

- [ ] **M5: Verification Engine & State Machine (Screen 8b)**
  - **Acceptance Criteria:**
    - Full implementation of Section 5 state machine.
    - Active rep of addressed verified organization can transition status to `org_verified` or `not_confirmed`.
    - Active rep can withdraw a prior confirmation, setting status to `withdrawn`.
    - Every status transition writes a `verification_records` row and an `audit_logs` row inside the same database transaction.
    - Green "Organization Verified" badge with verifier name, Org ID, and date appears on achievement detail.
  - **What to test yourself:**
    - As org rep, click "Confirm" on a request -> status updates to `org_verified`.
    - Check database to verify `verification_records` (`action = 'confirmed'`) and `audit_logs` rows were written.
    - View achievement detail as athlete -> green "Organization Verified" badge displayed.
    - Test "Cannot Confirm" action -> verify status updates to `not_confirmed`.
    - Test "Withdraw" action -> verify new record with `action = 'withdrawn'` is inserted while maintaining history.

- [ ] **M6: Home, Sports Journey & Public QR Profile (Screens 5, 9, 10)**
  - **Acceptance Criteria:**
    - Home screen (Screen 5) displays profile card and achievement summaries.
    - Sports Journey (Screen 9) displays vertical timeline of all athlete achievements and verification states.
    - Public QR Profile (`/(public)/p/[sportsId]`, Screen 10) queries strictly from `public_athlete_view`.
    - **Never exposes** email, phone, date of birth, or document storage paths. Respects `is_public`.
  - **What to test yourself:**
    - View Home and Journey screens as logged-in athlete.
    - Open public profile URL in an incognito/unauthenticated browser session.
    - Inspect page source / network response to confirm email, phone, DOB, and document paths are omitted.

- [ ] **M7: Discover Screen (Screen 11)**
  - **Acceptance Criteria:**
    - Filterable directory allowing search by sport, location (city/state), achievement level (`school`, `district`, `state`, etc.), and `verified_only` filter.
    - Uses efficient Postgres queries against public athlete data.
  - **What to test yourself:**
    - Open `/(athlete)/discover`.
    - Apply filter by sport (e.g. "Kabaddi") and toggle "Verified only".
    - Verify matching athlete profiles and verified counts are displayed accurately.

- [ ] **M8: Hardening, Testing & Verification**
  - **Acceptance Criteria:**
    - Vitest unit tests pass for state machine transitions, RLS restrictions, and log immutability.
    - Playwright E2E test runs clean for the entire section 1 flow: `Register -> Select Sport -> Upload Achievement -> Submit Request -> Org Confirm -> Public View Green Status`.
    - Security audit complete: private bucket signed URLs, Zod schema validation on all API endpoints.
  - **What to test yourself:**
    - Run `npm run test` (Vitest unit & RLS tests).
    - Run `npx playwright test` (E2E integration flow).
    - Verify all test suites pass with 0 failures.

---

## 3. Design Screen Mapping Table

| Screen Folder | Visual Reference | Route Group & Route | Target Milestone |
|---|---|---|---|
| `1._language_selection` | Screen 1 | `(athlete)/language` | M1 |
| `2._sign_up_otp` | Screen 2 | `(athlete)/auth/sign-up` | M1 |
| `3._choose_your_sport` | Screen 3 | `(athlete)/onboarding/sport` | M2 |
| `4._sports_id_created` | Screen 4 | `(athlete)/onboarding/id-created` | M2 |
| `5._home` | Screen 5 | `(athlete)/home` | M6 |
| `6._add_achievement_upload` | Screen 6 | `(athlete)/achievements/new` | M3 |
| `7._confirm_details` | Screen 7 | `(athlete)/achievements/new/confirm` | M3 |
| `8._achievement_detail` | Screen 8 | `(athlete)/achievements/[id]` | M3 |
| `8b._achievement_verified` | Screen 8b | `(athlete)/achievements/[id]` (Verified state) | M5 |
| `9._sports_journey` | Screen 9 | `(athlete)/journey` | M6 |
| `10._public_profile` | Screen 10 | `(public)/p/[sportsId]` | M6 |
| `11._discover` | Screen 11 | `(athlete)/discover` | M7 |
| `12._verification_requests` | Screen 12 | `(org)/requests` | M4 |
| `13._verification_detail` | Screen 13 | `(org)/requests/[id]` | M4 / M5 |
| `13b._cannot_confirm` | Screen 13b | `(org)/requests/[id]/cannot-confirm` | M4 / M5 |

---

## 4. Data Model Migration Order

Migrations are executed sequentially in Supabase (`supabase/migrations/`):

1. `20261001000001_create_enums_and_sequences.sql`
   - Custom Postgres Enums: `user_role` (`athlete`, `org_rep`, `admin`), `org_status` (`pending`, `verified`, `rejected`, `suspended`), `org_rep_status` (`active`, `revoked`), `achievement_level` (`school`, `district`, `state`, `national`, `international`), `achievement_result` (`first`, `second`, `third`, `finalist`, `participation`, `mvp`, `best_player`, `special`), `verification_status` (`self_reported`, `under_review`, `org_verified`, `not_confirmed`, `withdrawn`), `verification_action` (`confirmed`, `withdrawn`).
   - Sequences: `sports_id_seq`, `org_id_seq`.

2. `20261001000002_create_profiles_and_organizations.sql`
   - Tables: `profiles`, `athlete_profiles`, `organizations`, `organization_representatives`.
   - Triggers/Functions: `generate_sports_id()` -> outputs `ATH-YYYY-NNNNNN`; `generate_org_id()` -> outputs `ORG-TN-NNNNNN`.

3. `20261001000003_create_achievements_and_documents.sql`
   - Tables: `achievements`, `achievement_documents`.
   - Foreign key bindings and index optimization on `athlete_id`, `organization_id`, `verification_status`.

4. `20261001000004_create_verification_and_audit.sql`
   - Tables: `verification_requests`, `verification_records`, `audit_logs`.
   - Hard constraint triggers prohibiting `UPDATE` or `DELETE` operations on `verification_records` and `audit_logs`.

5. `20261001000005_create_public_views.sql`
   - View: `public_athlete_view` selecting strictly: `id`, `sports_id`, `full_name`, `primary_sport`, `position`, `city`, `state`, `avatar_url`, `is_public`, and a JSON aggregation of achievements (excluding private fields like DOB, email, phone, document storage paths).

6. `20261001000006_apply_rls_policies.sql`
   - Enables Row Level Security on all 9 tables and storage bucket `achievements-private`.
   - Restricts read/write operations per user role.

7. `20261001000007_verification_state_machine_rpc.sql`
   - Stored Procedure `process_verification_transition(p_achievement_id, p_action, p_reason)`:
     - Validates caller is active rep of target verified org.
     - Executes status change on `achievements`.
     - Inserts record into `verification_records`.
     - Inserts event into `audit_logs`.
     - All in one atomic Postgres transaction block.

---

## 5. Section 5 Verification Enforcement Strategy

| Section 5 Rule | Technical Enforcement Mechanism | Verification / Test |
|---|---|---|
| **1. `org_verified` only set by active rep of addressed, verified org** | Enforced inside security-definer RPC `process_verification_transition`. Checks `auth.uid()` against `organization_representatives` where `status = 'active'` AND `organizations.status = 'verified'` AND `organization_id` matches request. | Vitest RLS test attempts status change from unauthorized user -> expect rejection. |
| **2. Athletes, admins, AI/OCR cannot set `org_verified` directly** | RLS policies on `achievements` forbid client direct `UPDATE` on `verification_status`. Updates must go through RPC. | Vitest test attempts `supabase.from('achievements').update({ verification_status: 'org_verified' })` -> expect RLS failure. |
| **3. OCR pre-fills form; nothing saved without athlete Save tap** | API route `/api/ocr` returns JSON to client state only. No DB write happens in `/api/ocr`. DB insert occurs exclusively when POST is sent to `/api/achievements` by athlete. | Unit test verifies `/api/ocr` performs zero DB queries/inserts. |
| **4. Every transition writes record & audit log atomically** | Executed inside a single Postgres transaction (`BEGIN ... COMMIT`) within `process_verification_transition` procedure. Failure in audit write rolls back status update. | Vitest test executes state transition and asserts `verification_records` and `audit_logs` counts increment by 1. |
| **5. `verification_records` & `audit_logs` append-only** | Postgres triggers `BEFORE UPDATE OR DELETE ON verification_records` and `audit_logs` raise exception `'Table is append-only'`. RLS policies grant `SELECT` and `INSERT` only. | Vitest test executes `UPDATE` and `DELETE` queries on logs -> expect Postgres exception. |
| **6. Withdrawal maintains history** | Transition to `withdrawn` inserts a new row in `verification_records` with `action = 'withdrawn'`. Prior `action = 'confirmed'` row remains unmodified. | Test withdraw flow and assert 2 records exist for achievement in `verification_records`. |
| **7. Clean UI wording for verified items** | Component `VerifiedBadge` renders: `"Organization Verified"` + `org_name` + `org_id` + `decided_at`. Wording contains zero references to AI, OCR, or platform proof. | DOM assertion in Playwright test verifying string content. |
