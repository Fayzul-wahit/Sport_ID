# Sports ID Platform: Technical & Product Decisions

This document records the architectural and product decisions adopted for the implementation of the Sports ID Platform.

---

### Decision 1: Local Authentication & OTP Strategy
- **Choice:** Use Supabase Auth with Email / Phone OTP. In local development environment, use fixed test OTP (`123456`) or local Supabase CLI console OTP logs.
- **Rationale:** Enables rapid end-to-end testing without external SMS/Email gateway costs while preserving the authentic OTP verification flow.

---

### Decision 2: UI Timeline Wording Alignment
- **Choice:** Update Step 2 of the achievement verification timeline from *"Reviewed by verification committee"* to *"Submitted for verification to [Organization Name]"*.
- **Rationale:** Strict adherence to `BUILD_SPEC.md` Section 5 and Section 0 Rule 4 ("No invented content"). Verification is performed by active representatives of addressed organizations, not unmentioned committees.

---

### Decision 3: Seed Data & Organization Approval
- **Choice:** Populate one pre-verified organization (`Demo District Sports Association`, Org ID: `ORG-TN-000001`, `status = 'verified'`) with an active representative (`role = 'org_rep'`), and one pending organization (`status = 'pending'`).
- **Rationale:** Satisfies M4 seeding requirements while providing test coverage for permission enforcement blocking unverified/pending organization representatives.

---

### Decision 4: Modular OCR Vision Provider Architecture
- **Choice:** Implement an abstracted `extractCertificate(fileBuffer, mimeType)` interface with:
  1. `MockOCRProvider`: Deterministic local mock extractor for dev and testing.
  2. `VisionAPIOCRProvider`: Live provider calling OpenAI GPT-4o Vision or Google Cloud Vision API when `OCR_API_KEY` is present in `.env.local`.
- **Rationale:** Allows offline testing and CI test suite execution while permitting seamless production OCR integration.

---

### Decision 5: Dynamic Organization ID State Code Prefix
- **Choice:** Postgres trigger generates Organization IDs formatted as `ORG-[STATE]-NNNNNN` (e.g., `ORG-TN-000001` for Tamil Nadu, `ORG-KL-000002` for Kerala).
- **Rationale:** Supports nationwide organizational representation while matching design system specifications.
