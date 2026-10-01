# Sports ID Platform: Clarifying Questions & Design Decisions

This document outlines key technical decisions, minor design discrepancies, and recommended solutions for approval before beginning development.

---

### Question 1: Local Authentication & OTP Method
**Context:** Screen 2 (`2._sign_up_otp`) specifies a mobile/email sign-up flow using OTP verification.
**Decision Needed:** How should local development handle OTP verification without relying on paid SMS/Email gateways?
**Recommended Answer:** Use Supabase Auth with Email OTP / test phone numbers. In local development, configure Supabase CLI to capture OTPs in local logs or enable a deterministic test OTP (`123456`) when `NEXT_PUBLIC_ENABLE_MOCK_AUTH=true` in `.env.local`.

---

### Question 2: UI Timeline Wording in Screen 8b vs. Build Spec
**Context:** Screen 8b (`8b._achievement_verified/code.html`) includes the timeline phrase *"Reviewed by verification committee"*. However, `BUILD_SPEC.md` Section 5 defines verification as being conducted directly by an active representative of the addressed, verified organization.
**Decision Needed:** Should we update the UI text to match `BUILD_SPEC.md`?
**Recommended Answer:** Yes. Update step 2 of the vertical tracker on Screen 8b to read *"Submitted for verification to [Organization Name]"* instead of referring to a committee. This preserves accuracy and adheres strictly to Section 0 Rule 4 ("No invented content").

---

### Question 3: Organization Seeding & Status
**Context:** `BUILD_SPEC.md` specifies that organization approval workflows are out of scope for Phase 1 ("organizations are approved manually via the database for now").
**Decision Needed:** How should seed data be structured for organization representatives?
**Recommended Answer:** The seed script (`supabase/seed.sql`) will populate:
1. One pre-approved, verified organization ("Demo District Sports Association", Org ID: `ORG-TN-000001`, `status = 'verified'`) with one active representative (`role = 'org_rep'`).
2. One pending organization ("Unverified Local Club", `status = 'pending'`) with one representative to test that RLS/state machine rules correctly block pending organizations from verifying achievements.

---

### Question 4: Certificate OCR API Provider
**Context:** `BUILD_SPEC.md` Section 2 requires a server-side route calling `extractCertificate(file) -> fields`, starting with a mock implementation and supporting real vision providers via environment variables.
**Decision Needed:** What vision API format should be supported for production OCR?
**Recommended Answer:** Build a modular interface `ICertificateOCRProvider`:
- `MockOCRProvider`: Used by default in local dev/testing; returns parsed certificate mock data from uploaded test documents.
- `VisionAPIOCRProvider`: Calls OpenAI GPT-4o Vision or Google Cloud Vision API using `OCR_API_KEY` when configured in `.env.local`.

---

### Question 5: Dynamic Organization ID State Code Prefix
**Context:** `BUILD_SPEC.md` format for Organization ID is `ORG-TN-NNNNNN`.
**Decision Needed:** Should the state segment (`TN`) be dynamic based on the organization's state?
**Recommended Answer:** Yes. The database sequence trigger will derive the 2-letter state code from the organization's `state` field (e.g. `TN` for Tamil Nadu -> `ORG-TN-000001`, `KL` for Kerala -> `ORG-KL-000002`, `MH` for Maharashtra -> `ORG-MH-000003`), defaulting to `TN`.
