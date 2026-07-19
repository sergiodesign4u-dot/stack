# Stack - Product Design Language (DESIGN.md)

**Status:** Born at Concept Step 3b (2026-07-19) from the approved brand plate. This is the product's design language, not the research/IA-site style. No prior root DESIGN.md existed, so nothing was renamed to DESIGN-artifacts.md.

**Scope:** identity, color, type, icons, and the tone of the screen. It does NOT fix page layout (that is chosen at Step 4 / 5) and it is NOT yet the full token set with real code values. Step 07 (`/impeccable document`) enriches this from the colored `ui-visual/` screens; it does not rewrite the brand.

Every decision below is signed with its source: an Attribute (A1..A5) or Designer's taste, both from `concept/docs/concept.md`.

**Rule:** no em dash in this file. Commas, periods, or spaced hyphen only.

---

## 1. Identity

- Name: Stack. Category: sport nutrition e-commerce, Ukraine, mobile-first.
- Chosen direction: **D (synthesis)**. The dense, complete brand system in the format of the owner's `brand-plate-c-3`, carried in the B color language (white canvas, soft charcoal, one signal-orange accent). Board of record: `concept/assets/brand-plate-d-2.png` (upright wordmark). Mascot of record: `concept/assets/brand-mascot-3d-realistic.png`.
- **Wordmark:** an upright heavy grotesk logotype "Stack" (not italic). Confident and premium, calm rather than sporty-aggressive. [A1 calm and confident, A4 athletic on a leash]
- **Logo mark (vectorized, locked 2026-07-20):** an angular "slashed" athletic **S** monogram in solid Signal Orange. Vectorized from the owner's reference into `concept/assets/logo-s.svg` (orange), `logo-s-white.svg`, `logo-s-dark.svg` (mono charcoal). Energetic register (leans on the B accent, athletic not calm) - a deliberate energy accent inside the calm frame. Used for the app icon, favicon, packaging, and small sizes.
- **Primary lockup:** horizontal - the S mark plus the "Stack" wordmark (Oswald 700). Vertical (S over "Stack" + "Sport Nutrition") and mark-only are the secondary forms. Full sheet + variants: `concept/logo.html`.
- **Seal / lockup:** a circular "STACK · SPORT NUTRITION · FUEL · TRAIN · RECOVER" badge for packaging and trust surfaces.
- **Brand rhythm:** Fuel · Train · Recover (a three-beat used in guidance strips). Actual product copy stays owned by `Voices/docs/voice.md`.

## 2. Mascot (canon)

- **Locked: yes.** The bear is a canonical brand character. [Designer's taste (monobank: trust plus character), A3 character and warmth]
- **Creature:** a friendly, sturdy brown bear.
- **Register:** realistic 3D render (`brand-mascot-3d-realistic.png`). Dimensional CGI, soft studio lighting, matte materials, bear-like lower body, wearing a charcoal athletic hoodie with a single orange accent. Grown-up and premium. Not a flat illustration, not a photoreal wild predator.
- **Behavior:** calm, competent, guiding. Lives in hero, onboarding, empty states, the goal selector, and coach moments. It reassures by being steady. [A3, plus the beginner's "one clear next step", Persona 3 Viktoriia]
- **Framing (decided 2026-07-19):** shown LARGE, typically as a huge background layer cropped by its container, not a small figure beside a heading. One asset, different crops by context (full hero half-panel, corner peek, bottom-crop). Content sits on the clear area; keep text off the dark hoodie so contrast holds. Cropping by the frame reads more present and characterful.
- **Voice:** obeys `voice.md`. No greetings, no celebration, no cheerful slop, no emoji.
- **Expression set:** calm / focused / confident. Refinement locked for the final canon: keep "focused" determined-but-calm, never angry. [A4 energy, not aggression]

## 3. Color

Core palette (locked, transcribed from `brand-plate-d-2.png`, not read off the pixels). Orange is the single action accent and is never spread.

| Token | Hex | Role | Source |
|---|---|---|---|
| Ink (Soft Charcoal) | `#1C1C1C` | primary text, near-black surfaces, product base. A softened near-black, not pure `#000000` | Designer's taste (softer black), A1 |
| Canvas | `#FFFFFF` | page background. Product photos sit on white | Designer's taste (product photos on white), A1 |
| Signal Orange | `#FF5A00` | the ONE action accent: primary button, active or selected state, single key highlight. Never decorative, never a discount burst | B palette, A4 energy, A1 single-accent discipline |
| Ash Grey | `#D9D9D9` | surfaces, dividers, borders, disabled | A1 |
| Warm Neutral | `#F2F0ED` | warm section backgrounds. Keeps neutrals human, not clinical white | A3 warmth in the neutral (anti sterile-pharma) |

**Semantic** (proposed, tuned to `voice.md` principle 5 "states tell the truth"; validate at Step 6 / 8, not read off the plate):

- Success `#2E7D46` - muted green, calm not celebratory
- Warning `#C9821E` - amber, clearly visible and clearly NOT the signal orange
- Error `#C42B1C` - a serious deep red, deliberately separated from Signal Orange so an error never reads as the brand accent or as festive
- Info `#4A5568` - neutral slate

**Color rules:**

- Exactly one orange per view, on the single primary action. Everything else is charcoal, white, or grey. [A1, anti loud-discounter]
- Error must never look like the brand accent or a celebration. Warning must be visible. [voice.md 5]
- No discount-red bursts, no neon, no beast-mode black-plus-neon. [anti-references: loud UA discounter, beast mode]

## 4. Typography

- **Display / headline:** a tight condensed heavy grotesk (Oswald Bold as the named default). Role: confident athletic hero headlines. [A4]
- **Body / UI:** Inter. The plain-answer-first workhorse, legible and quiet. [A5 plain answer first]
- **Numerals:** IBM Plex Mono for every dose, serving, nutrition figure, and price. Mono numbers are a trust signal. [A2 trust proven]
- The logotype "Stack" is a custom upright heavy grotesk, related to the display face.

Type scale and weights are set at Step 5 (`concept/concept.html`) and Step 07.

## 5. Icon language

- **Solar Bold** (solid / filled), confident and simple. Inline SVG in the product, never a CDN script. [A4]
- Set seen on the plate: leaf (natural), shield-check (trusted), dumbbell (strength), bolt (energy), drop (hydration), heart (wellness).

## 6. UI direction (tone of the screen, not the layout)

Composition and density are chosen at Step 4 (`directions.html`). The tone:

- White canvas, generous whitespace, calm and unhurried. No countdown timers, no urgency, no popups. [A1, Design Principle 4]
- Matte-black product photography on white. The product is the hero of the card. [Designer's taste: photo-first, product-on-white]
- One signal-orange action per screen. Active and selected states use orange. [A1, A4]
- Monospaced figures for all numbers (dose, per-serving, price). [A2]
- Cards: crisp, moderate radius (about 8 to 12px), flat surfaces, restrained shadow. [A1]
- Trust leads: composition, dosage, origin, and a real viewable certificate are shown, not asserted. [A2, Design Principle 1]
- The 3D bear appears as a calm guide in hero, onboarding, empty, and coach moments, never as noise. [A3]
- Two registers inside one calm frame: novice gets warmth and guidance, the coach gets fast and businesslike. Both stay calm. [A3, voice.md 4]
- **Density is context-driven** (decided 2026-07-19). One card component, three densities, chosen by page not by preference:
  - Listing / catalog -> dense grid (compact tiles, mono facts, coach-tier price). [A4, A2]
  - Product focus (PDP, hero, featured card) -> calm expanded card (big photo, plain answer first, one action, air). [A1, A5]
  - Guidance (onboarding, goal selector, empty states) -> mascot-led, one clear next step. [A3, A5]

## 7. Sources

- `concept/docs/concept.md` - Designer's taste, the 5 Attributes, the stance
- `concept/docs/references.md` - the borrowed techniques and the anxieties they answer
- Chosen plate: `concept/assets/brand-plate-d-2.png` (board) plus `concept/assets/brand-mascot-3d-realistic.png` (mascot)
- Runners-up kept for revisit: `brand-plate-d-1.png` (italic wordmark), `brand-mascot-3d-plush.png`, and the first-round plates `brand-plate-a/b/c-*.png` plus the owner's `brand-plate-c-3.png` (the density reference)
- Enriched later by Step 07 (`/impeccable document`) from the colored `ui-visual/` screens. That step does not rewrite this brand.
