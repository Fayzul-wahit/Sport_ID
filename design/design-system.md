---
name: Athletic Merit
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#44474d'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#75777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#4d5f7d'
  primary: '#0b1f3a'
  on-primary: '#ffffff'
  primary-container: '#0b1f3a'
  on-primary-container: '#7587a7'
  inverse-primary: '#b5c7ea'
  secondary: '#a43e00'
  on-secondary: '#ffffff'
  secondary-container: '#fe6a19'
  on-secondary-container: '#591e00'
  tertiary: '#16a34a'
  on-tertiary: '#ffffff'
  tertiary-container: '#00250b'
  on-tertiary-container: '#009b44'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b5c7ea'
  on-primary-fixed: '#071c36'
  on-primary-fixed-variant: '#364764'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb596'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#7d2d00'
  tertiary-fixed: '#7ffc97'
  tertiary-fixed-dim: '#62df7d'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005320'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an authoritative, energetic, and deeply empowering environment tailored for Indian grassroots athletes, state sports bodies, national federations, scouts, and academy administrators. It serves as a digital sports record that athletes build over time and that organizations can confirm.

The visual style is **High-Contrast Modern Athletic**, merging structured institutional credibility with vibrant, kinetic field energy. It communicates clarity and trust by showing plainly what is self-reported and what an organization has confirmed, while remaining fiercely motivational, accessible, and welcoming to athletes from Tier-1 metros down to rural taluks.

Key emotional anchors:
- **Merit & Legitimacy**: High visual clarity, solid validation indicators, and structured information layouts inspire trust without overclaiming.
- **Dynamic Energy**: Focused bursts of high-visibility sports orange ignite movement, ambition, and progress without compromising legibility.
- **Democratic Accessibility**: Large touch targets, hyper-legible multilingual typography (Latin, Tamil, Malayalam), and distinct contrast thresholds ensure effortless usage across diverse hardware and outdoor sunlight conditions.

## Colors

The palette is engineered for directness, institutional authority, and rapid status triage under varied ambient field conditions.

### Palette Roles
- **Primary (`#0B1F3A`)**: Deep Navy. Represents the certifying foundation, administrative power, and structural framing. Used for primary interactive actions, high-level navigation headers, and hero profile anchors.
- **Secondary / Accent (`#FF6B1A`)**: Energetic Sports Orange. Used only for the single primary action on a screen and for selected states. Never for verified states (those are green). Never diluted into background washes. White text on this orange fails contrast, so use navy text on it (see Buttons).
- **Tertiary / Success (`#16A34A`)**: Verified Green. Reserved strictly for the Organization Verified status and its badge. Never used for decoration.
- **Neutral Core (`#111827`)**: Ink Black. The foundational color for primary copy, high-legibility headings, and structural iconography.
- **Canvas Base (`#F7F8FA`)**: Off-White Track. A deliberate soft-field grey-white that reduces glare outdoors while providing high contrast against pure white cards.

### Verification Status Tier System
1. **Self-Reported**: Background `#F3F4F6`, Border `#E5E7EB`, Text `#4B5563`, Icon `#6B7280`. Indicates initial entry submitted by the athlete pending corroboration.
2. **Evidence Under Review**: Background `#FEF3C7`, Border `#FDE68A`, Text `#92400E`, Icon `#F5A524`. Indicates documents submitted, awaiting institutional sign-off.
3. **Organization Verified**: Background `#DCFCE7`, Border `#BBF7D0`, Text `#15803D`, Icon `#16A34A`. Accompanied universally by the verified check mark.

### Sport Identity Color Accents (Subtle Badging only)
- **Kabaddi**: Terracotta Earth (`#C2410C`)
- **Badminton**: Electric Volt (`#0284C7`)
- **Athletics**: Track Amber (`#D97706`)
- **Football**: Pitch Emerald (`#059669`)
- **Cricket**: Traditional Indigo (`#1D4ED8`)

## Typography

The type system prioritizes structural performance, dense data legibility, and effortless cross-lingual parity. **Inter** provides high x-height, wide apertures, and exceptional tabular support for sports statistics, metric timings, and Sports ID and Organization ID numbers.

### Multilingual Support (Tamil & Malayalam)
When rendering Indic scripts (e.g., Tamil and Malayalam localized dashboards or physical certificate generators), pair with system Noto Sans regional fallbacks (`Noto Sans Tamil`, `Noto Sans Malayalam`). Maintain identical font sizing, but expand `lineHeight` by +15% to accommodate full vertical vowel markers and conjunct ligatures without clipping.

### Rules of Usage
- **Tabular Figures**: Force `font-feature-settings: "tnum" 1` across all scorecards, athlete timing results, weigh-in figures, and serial credentials.
- **Visual Pacing**: Pair tight uppercase `label-caps` for structural indicators (e.g., `DISTRICT QUALIFIER`, `U-19 GOLD`) directly against high-weight bold numerical headers.

## Layout & Spacing

The layout is built upon an 8pt architectural rhythm, tailored to accommodate both responsive field-level mobile athlete views and data-heavy organizational management desks.

### Grid Framework
- **Athlete Mobile Views (Viewport &lt; 768px)**: Single-column fluid canvas with `margin-sm` (16px) gutters. Elements prioritize single-thumb interactions with bottom-weighted action zones.
- **Organization Web Dashboard (Viewport ≥ 1024px)**: 12-column fixed-fluid hybrid grid with 24px gutters, constrained inside a 1440px master wrapper. Features a fixed 260px administrative navigation sidebar alongside fluid data tables and inspection panes.

### Form Factor Behavior
- **Mobile**: Stacks verification certificates, timeline events, and match records into single vertical stream flows. Bottom navigation stays persistent with a minimum 64px physical thumb clearance.
- **Desktop**: Three-pane master-detail arrangement:
  1. Primary navigation & filters (260px)
  2. Verification request queue & event logs (Fluid 5-col)
  3. Real-time document inspector & certificate inspection and verification drawer (Fluid 7-col)

## Elevation & Depth

Visual hierarchy uses crisp, low-elevation layers that prevent glare on mobile devices outdoors and eliminate visual noise in dense administrative portals. Depth is achieved via **tonal separation** and **calibrated micro-shadows**, never through heavy blur blankets.

### Elevation Scales
- **Ground (Canvas)**: `#F7F8FA`. The foundational floor.
- **Surface Level 1 (Card & Content Block)**: `#FFFFFF` resting on `#F7F8FA`. Bound by a crisp boundary stroke: `1px solid rgba(17, 24, 39, 0.08)`. Subtle ambient grounding: `box-shadow: 0 1px 3px rgba(11, 31, 58, 0.04), 0 1px 2px rgba(11, 31, 58, 0.02)`.
- **Surface Level 2 (Interactive Floating Card / Athlete Card Hover)**: Raised state during inspection or touch. Boundary stroke: `1px solid rgba(11, 31, 58, 0.12)`. Ambient grounding: `box-shadow: 0 4px 12px rgba(11, 31, 58, 0.06), 0 2px 4px rgba(11, 31, 58, 0.04)`.
- **Surface Level 3 (Drawers, Modals, Verification Inspection Panels)**: Crisp `#FFFFFF` surface suspended over a high-contrast backing scrim: `background-color: rgba(11, 31, 58, 0.6)`. Elevation shadow: `box-shadow: 0 12px 32px rgba(11, 31, 58, 0.16)`.

### Border Integrity
Every white card and status container features a micro-border (`1px solid #E5E7EB` or contextual state color). This prevents pure white components from washing out on high-brightness mobile displays.

## Shapes

The geometric framework is balanced: **sturdy structural chassis** on cards and surfaces, transitioning to **ergonomic rounded silhouettes** for tactile targets.

### Curvature Guidelines
- **Buttons & Touch Elements**: 56px height primary touch targets utilize `rounded-2xl` (16px radius) or full-pill profiles (`rounded-full`) for effortless finger acquisition on mobile.
- **Cards & Visual Containers**: Anchored at `rounded-lg` (16px) or `rounded-md` (8px for dense dashboard tables) to retain a reliable, clean card silhouette.
- **Badges & Micro-Pills**: `rounded-full` (9999px) for status indicators, verification tags, and sport classification labels.

## Components

### Buttons
- **Primary Athletic Button**: 56px minimum height. High-contrast `#0B1F3A` fill, `#FFFFFF` text, `rounded-2xl` or full pill (`rounded-full`). Deep padding: `16px 28px`. Text style: `label-lg`.
- **Action Highlight Button**: 56px minimum height. `#FF6B1A` fill with `#0B1F3A` text (or `#A43E00` fill with `#FFFFFF` text). Maximum one per screen. Used for the primary athlete path (e.g., "Request Organization Verification", "Continue", "Save").
- **Secondary Action**: 56px height. `#FFFFFF` background, 2px border `#0B1F3A`, `#0B1F3A` text.
- **Destructive / Reject Button**: Light crimson wash (`#FEF2F2`), border `1px solid #FCA5A5`, text `#DC2626`.

### Verification Chips & Badges
- Compact pills with height 24px (compact) or 32px (card hero).
- Structure: Icon (16px SVG) + Inter `label-md` uppercase text.
  - **Self-Reported**: Background `#F3F4F6`, border `#E5E7EB`, text `#4B5563`, default dot icon.
  - **Evidence Under Review**: Background `#FEF3C7`, border `#FDE68A`, text `#92400E`, hour-glass icon.
  - **Organization Verified**: Background `#DCFCE7`, border `#BBF7D0`, text `#15803D`, verified seal or shield with a distinct checkmark icon.
  - **Not Confirmed**: Background `#FEF2F2`, border `#FECACA`, text `#991B1B`, neutral info icon. Wording: "Organization could not confirm". Shown calmly; it is not an accusation.
  - **Withdrawn**: Background `#F3F4F6`, border `#D1D5DB`, text `#374151`, clock-back icon. Wording: "Confirmation withdrawn". The earlier confirmation stays visible in history.

### Form Inputs & Selectors
- **Input Fields**: Standard 52px height for mobile ergonomics. `#FFFFFF` background, `#111827` active text, 1.5px border `#E5E7EB`.
- **Focused State**: Border `#0B1F3A` with a 3px outer ring `#0B1F3A` at 10% opacity.
- **Language Switcher Control**: Prominent, highly accessible segmented pill located in top header displaying `EN | தமிழ் | മലയാളം`. Active language in solid `#0B1F3A` with `#FFFFFF` text; inactive in transparent wash.

### Athlete Digital ID Card (Core Specialized Component)
- A clean card showing the athlete's Sports ID. It must not look like a government document.
- Header: `#0B1F3A` navy bar with the app name "Sports ID" and the Sports ID number in the format `ATH-YYYY-NNNNNN` (e.g., `ATH-2026-018472`).
- Body: white card with the athlete avatar (plain placeholder if no photo), name, sport and position, city, and the QR code.
- No state or national emblems, no government wording, no "official" or "tamper-proof" wording, no signature or institutional seal.
- No full-card "verified" banner. Verification belongs to individual achievements, not the athlete. Show only a count such as "2 achievements verified by organizations".
- Date of birth, phone and email are never shown on the card or the public profile.

### Data Tables & Verification Queue (Dashboard Component)
- Clean alternating rows (`#FFFFFF` to `#F9FAFB`) with 48px height per entry.
- Each row has one "Review" button that opens the request detail. Confirm and Cannot Confirm happen on the detail screen with an explicit confirmation step. No bulk approval and no one-click approve in the table.

## Content Rules (apply to every screen)

- Never use government, federation, "official", "tamper-proof", "cryptographically signed", "immutable" or registry wording, and never imply government endorsement.
- Never show invented statistics, banners, tournaments or sample claims as real content.
- AI and OCR are never presented as proof. Verified means "confirmed by the organization that conducted or officially recorded the event".
- One primary button per screen. Body text 16px, nothing below 14px.
- Verified green appears only on the Organization Verified status.
