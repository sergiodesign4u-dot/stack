# Stack - Product Design Language (DESIGN-artifacts.md)

**Status:** Born at Concept Step 3b (2026-07-19) from the approved brand plate. This is the product's design language, not the research/IA-site style. No prior root DESIGN-artifacts.md existed, so nothing was renamed to DESIGN-artifacts.md.

**Scope:** identity, color, type, icons, and the tone of the screen. It does NOT fix page layout (that is chosen at Step 4 / 5) and it is NOT yet the full token set with real code values. Step 07 (`/impeccable document`) enriches this from the colored `design/` screens; it does not rewrite the brand.

Every decision below is signed with its source: an Attribute (A1..A5) or Designer's taste, both from `design/concept/docs/concept.md`.

**Rule:** no em dash in this file. Commas, periods, or spaced hyphen only.

---

## 1. Identity

- Name: Stack. Category: sport nutrition e-commerce, Ukraine, mobile-first.
- Chosen direction: **D (synthesis)**. The dense, complete brand system in the format of the owner's `brand-plate-c-3`, carried in the B color language (white canvas, soft charcoal, one signal-orange accent). Board of record: `design/concept/assets/brand-plate-d-2.png` (upright wordmark). Mascot of record: `design/concept/assets/brand-mascot-3d-realistic.png`.
- **Wordmark:** an upright heavy grotesk logotype "Stack" (not italic). Confident and premium, calm rather than sporty-aggressive. [A1 calm and confident, A4 athletic on a leash]
- **Logo mark (vectorized, locked 2026-07-20):** an angular "slashed" athletic **S** monogram in solid Signal Orange. Vectorized from the owner's reference into `design/concept/assets/logo-s.svg` (orange), `logo-s-white.svg`, `logo-s-dark.svg` (mono charcoal). Energetic register (leans on the B accent, athletic not calm) - a deliberate energy accent inside the calm frame. Used for the app icon, favicon, packaging, and small sizes.
  - **Tight mark assets (added 2026-07-20):** `logo-mark.svg` (orange), `logo-mark-white.svg`, `logo-mark-ink.svg` are the same glyph cropped to its ink bbox (viewBox `101 74.7 457.7 537.1`, optical aspect 0.852 : 1). The original `logo-s*.svg` carry ~21% built-in artboard padding, so sizing them by height reads smaller than the wordmark. The lockups and the favicon use the tight assets so the mark's optical height maps to the cap-height; `logo-s*.svg` stay as the standalone-mark artboard source.
- **Primary lockup:** horizontal - the S mark plus the "Stack" wordmark (Oswald 700). Vertical (S over "Stack" + "Sport Nutrition") and mark-only are the secondary forms. Full sheet + variants: `design/concept/logo.html`.
- **Lockup construction canon (locked 2026-07-20, measured from the font and the mark, not eyeballed):** the whole geometry hangs off one module **x** = a quarter of the wordmark height (cap-height). Rules: wordmark height **H = 4x** (cap-line to baseline); the S mark is **1x taller than the wordmark** (optical height **5x** = 1.25 * cap-height), **vertically centered** on the wordmark so it overshoots the cap-line and baseline by **0.5x each**; mark optical width ~4,3x (mark aspect 0,85 : 1); gap mark-to-wordmark = **1x**; the wordmark "Stack" is Oswald 700 title-case, width ~11,2x intrinsic to the font (a consequence, not a rule to memorize); mark on the left, centered on the wordmark's vertical axis; clear space >= **1x** on every side (measured from the mark's extremities, the tallest part). Minimum sizes: horizontal lockup wordmark cap-height >= 14px (>= 16px in the web header), mark-only H >= 16px (favicon, avatar); below that use the mark alone. Full construction grid + clear-space diagrams: `design/concept/logo.html`, section "Побудова та канон". Reference method for the grid: the MTS logo-grid guideline (owner-supplied), adapted to Stack's mark and Oswald metrics. The mark-to-wordmark ratio is the one owner-tunable knob (started at 4x = cap-height, raised to **5x / +1x** on 2026-07-20 for a stronger visual anchor, overshoot 0.5x above and below); the diagram generator (`scratchpad gen-logo-svg.mjs`) is parametric on it via `MARK_H`.
- **Seal / lockup:** a circular "STACK · SPORT NUTRITION · FUEL · TRAIN · RECOVER" badge for packaging and trust surfaces.
- **Brand rhythm:** Fuel · Train · Recover (a three-beat used in guidance strips). Actual product copy stays owned by `voice/docs/voice.md`.

## 2. Mascot (canon)

- **Locked: yes.** The bear is a canonical brand character. [Designer's taste (monobank: trust plus character), A3 character and warmth]
- **Creature:** a friendly, sturdy brown bear.
- **Register:** realistic 3D render (`brand-mascot-3d-realistic.png`). Dimensional CGI, soft studio lighting, matte materials, bear-like lower body, wearing a charcoal athletic hoodie with a single orange accent. Grown-up and premium. Not a flat illustration, not a photoreal wild predator.
- **Behavior:** calm, competent, guiding. Lives in hero, onboarding, empty states, the goal selector, and coach moments. It reassures by being steady. [A3, plus the beginner's "one clear next step", Persona 3 Viktoriia]
- **Framing (decided 2026-07-19):** shown LARGE, typically as a huge background layer cropped by its container, not a small figure beside a heading. One asset, different crops by context (full hero half-panel, corner peek, bottom-crop). Content sits on the clear area; keep text off the dark hoodie so contrast holds. Cropping by the frame reads more present and characterful.
- **Voice:** obeys `voice.md`. No greetings, no celebration, no cheerful slop, no emoji.
- **Expression set:** calm / focused / confident on the base sheet, extended (2026-07-20) with attentive, supportive, and honest-concern faces (see the pose and expression set below). Refinement locked for the final canon: keep "focused" determined-but-calm, never angry. [A4 energy, not aggression]
- **Pose and expression set (added 2026-07-20):** the canon extends beyond the base sheet with reusable single-asset renders, each generated from `brand-mascot-3d-realistic.png` as a character reference (Nano Banana Pro) so the same bear, hoodie, and single orange stripe hold across all of them, on a white background for clean compositing. **Poses:** `mascot-guide.png` (guide, goal-pick), `mascot-pose-point.png` (leads to the next step, empty states), `mascot-pose-present.png` (presents a collection or calm promo), `mascot-pose-product.png` (product moments, the starter set). **Faces:** `mascot-face-curious.png` (attentive, listening; quiz and onboarding), `mascot-face-reassure.png` (support, "you're in good hands"; empty states and trust), `mascot-face-concern.png` (honest out-of-stock or error state, calm not alarmed, obeys `voice.md` principle 5). Shown together in `design/concept/concept.html` section 06 Маскот.

## 3. Color

Core palette (locked, transcribed from `brand-plate-d-2.png`, not read off the pixels). Orange is the single action accent and is never spread.

| Token | Hex | Role | Source |
|---|---|---|---|
| Ink (Soft Charcoal) | `#1C1C1C` | primary text, near-black surfaces, product base. A softened near-black, not pure `#000000` | Designer's taste (softer black), A1 |
| Canvas | `#FFFFFF` | page background. Product photos sit on white | Designer's taste (product photos on white), A1 |
| Signal Orange | `#FF5A00` | the ONE action accent: primary button, active or selected state, single key highlight - plus the **reduced price** (see the price rule below). Never decorative, never a discount *burst* | B palette, A4 energy, A1 single-accent discipline |
| Ash Grey | `#D9D9D9` | surfaces, dividers, borders, disabled | A1 |
| Warm Neutral | `#F2F0ED` | warm section backgrounds. Keeps neutrals human, not clinical white | A3 warmth in the neutral (anti sterile-pharma) |

**The dark end of the ramp - four rungs, derived, added 2026-08-13 at stage 09 step 1.** Nothing on
screen changes today: these are primitives with no semantic role until Крок 7 declares
`[data-theme="dark"]`. They exist because the scale had **eight rungs and no surface between
lightness 34 and 11** - a dark theme had exactly one value to stand on, `#1C1C1C`, and one value is
not a set of surfaces.

**The rule, so no number here is invented.** Every dark rung takes its **hue and saturation from
`#F2F0ED`**, the plate's locked Warm Neutral (H 36, S 16.1) - the same argument as the light end,
*A3 warmth in the neutral, anti sterile-pharma*, which is about neutrals and not about pale ones -
and its **lightness from the light end's own step sizes**, measured in L\*: white → `--warm-50` is
2.1, then 3.1, then 3.2, then 5.0. The dark end walks those same four steps upward, anchored so that
**`#1C1C1C` lands on the second rung unchanged**. It is a plate pixel and the product's ink; it is
not re-derived, it is where the mirror already put it.

| Token | Hex | Role it is being built for | L\* | Accent `#FF5A00` on it |
|---|---|---|---|---|
| `--warm-950` | `#191612` | dark page | 7.4 | 5.76 |
| `--warm-900` | `#1C1C1C` | dark surface - **unchanged, the locked Ink** | 10.3 | 5.45 |
| `--warm-850` | `#26211B` | dark sunken | 13.1 | 5.10 |
| `--warm-800` | `#2D2821` | dark hairline / rule | 16.4 | 4.67 |
| `--warm-750` | `#39332A` | dark track / strong line | 21.6 | 3.99 |

**And the two rungs the ramp was always missing - added 2026-08-13, step 09.1c.** The scale ran
`--warm-300` straight to `--warm-600`: **400 and 500 were simply absent**, a 41.8 hole in L\*. The
preview showed what that costs - with no rung there, dark secondary text had to borrow `--warm-300`
and the two-level hierarchy went almost flat, 16.2 for a title against 12.1 for its caption where
the light theme has 16.2 against 6.5. Same rule, and the mirror lands to the hundredth on all three
grounds:

| Token | Hex | L\* | Role | Light twin, on page / surface / sunken | Dark, on page / surface / sunken |
|---|---|---|---|---|---|
| `--warm-400` | `#AA9D8A` | 65.4 | dark secondary text | 6.84 / 6.50 / 6.02 | **6.78 / 6.41 / 6.00** |
| `--warm-500` | `#9A8B73` | 58.6 | dark muted text | 5.38 / 5.12 / 4.73 | **5.42 / 5.12 / 4.80** |

**Measured, and it changes what A10 means.** The accent clears **4.5:1 - full AA for normal text - on
every dark rung a word can sit on**, and only the track falls to 3.99, where no text sits. The
sub-AA compromise the owner accepted on 2026-08-12 is a property of the **pale grounds**, not of
`#FF5A00`: on `--bg-surface` the same mark reads 2.97, here it reads 5.10. A dark theme does not
inherit that compromise and must not be built as if it did.

**Rejected, and the rejection is the evidence.** The other candidate mirrored hue and saturation
**per rung** from the light pair, which is equally underived - but three of the five pairs (white,
`--warm-50` via the fixed Ink, `--warm-300`) are themselves neutral, so the dark ramp came out
`#171717` / `#1C1C1C` / warm / warm / `#343434`: a visible temperature wobble with the track reading
cool between two warm neighbours. Rendered both at 1100 and chosen by eye, which is where a ramp is
decided.

**Semantic** (proposed, tuned to `voice.md` principle 5 "states tell the truth"; validate at Step 6 / 8, not read off the plate):

- Success `#2E7D46` - muted green, calm not celebratory
- Warning `#C9821E` - amber, clearly visible and clearly NOT the signal orange
- Error `#C42B1C` - a serious deep red, deliberately separated from Signal Orange so an error never reads as the brand accent or as festive
- Info `#4A5568` - neutral slate
- Rating gold `#F6A800` - the filled star on any rating (PDP, product card, review). Yellow on purpose, so it never reads as Signal Orange: a rating is evidence, not an action. Only ever a star glyph - never a fill, a button, or a text colour

**Color rules:**

- Exactly one orange per view, on the single primary action. Everything else is charcoal, white, or grey. [A1, anti loud-discounter]
- **Label on an orange fill = white, at every size (locked 2026-07-27).** One action must look like one action, so a compact «У кошик» on the sticky shelf reads the same as the full CTA in the buy box. Contrast note: white on `#FF5A00` is 3.1:1 - it clears the 3:1 bar for graphics and for large text (>=19px/700, e.g. the buy-box CTA), and sits under the 4.5:1 AA bar for small text; ink would give 5.4:1 but split one action into two visual styles. Owner's call, taken knowingly.
  - **The rule above is about an ACTION. A CHOSEN STATE takes the ink label, and that is not a contradiction (written down 2026-08-11, step 7.98).** Two orange grounds stand 64px apart on `design/coach-home.html` at 390 and carry different inks, which reads as a defect until you know why: `.coach-newcta` («＋ Нова сесія», `--bg-action`, white label, **3.13:1**) is a button, and `.acc-link[aria-current="page"]` under 960 (the chosen section tab, `--bg-action`, ink label `#1C1C1C`, **5.45:1**) is not. A selected tab says «you are here»; it is a mark of state that happens to be pressable, and pressing it does nothing. Sources, both already written and neither aware of the other: this line, locked 2026-07-27, for the action; and `design/system/components/chip.css`, section «selected», which tabulated four editions and chose accent fill + ink label **on contrast grounds** - «the only one of the three accent editions a 14px label can pass AA on» - naming the account tabs as the family it copied, 28 instances. `design/system/components/badge.css`:56-61 settles the same question the same way for `.tag-new`: accent ground, ink label, 5.45, «the ONE place the action colour appears without being an action».
  - So the test is not «is it orange» and not «can it be pressed», it is **what is the orange saying**. Orange as an INVITATION (do this) takes the white label and accepts 3.13 knowingly, so that one action looks like one action at every size. Orange as a STATEMENT (this one is chosen, this is new, this price is cut) takes the ink label and gets 5.45, which is AA at any size. Nothing here reopens the 2026-07-27 lock: it fences it.
- Small orange things that are **not** buttons - badges, counters, the «Новинка» tag, and a **selected chip or tab** - keep the **ink** label. There orange is a marker, not an action, and ink stays crisp at 10-12px.
- **Price colour states the discount (locked 2026-07-29, owner's rule).** A price that is **reduced** is set in Signal Orange; a price with **no discount** stays ink. Nothing else about the price changes. So across a grid, an orange figure means exactly one thing - "cheaper than usual" - and the absence of orange is just as readable. This is the one place orange is allowed on text that is not an action, because the figure *is* the fact being marked, not decoration.
  - Applies to every price surface: product card (grid + list), PDP buy box, PDP sticky shelf, mobile buy bar. Struck old prices, per-serving and bonus lines stay grey - small print never turns orange.
  - The `-N%` chip keeps its muted red: the chip states the **size** of the cut, the accent marks **which** price is live. Two jobs, two marks.
  - **Contrast gate - THE GROUND FOR IT CHANGED ON 2026-08-12, the number did not.** `#FF5A00` on white is 3.13:1. A price is allowed the accent only at **>=19px bold**; every surface is sized to clear it. Until step 8.19 the reason given was «AA for large text only», i.e. the threshold was WCAG's large-text bar wearing a different number. **The owner has accepted sub-AA accent text for this shop (2026-08-12, closing A10), so the WCAG bar is no longer what holds this line up.** The line stays, on the ground it always really had: **the accent is the loudest thing in the system and the single action colour, so it is spent on large type or not at all.** What it may not keep doing is speaking about SIZE while the thing that decides is the SURFACE - see the block below. **Re-measured 2026-08-10 (step 7.74) on all eight carriers, read from the one rule that paints a price with the accent, `price.css`:** grid card 20/700 at 390 and 24/700 at 1280, list card 20/700, deal 30/700, buy box 36/600, pdp tab 20/700, buy bar 20/700, cart row 20/700, checkout line 20/700. Every one clears the gate. The buy box clears it **by size rather than by weight** - 600 is not bold, but 36px is large text by WCAG regardless of weight. The earlier list here (card 22 / mobile 19, list 21, buy box 36, shelf 19, buy bar 19) predated step 7.36: one of its five figures survived, «shelf» names a carrier that no longer exists, and the pdp tab, the cart row and the checkout line were missing from it.
  - Implemented data-driven in `design/kit/kit.css` via `:has()` on the struck old price, so the colour cannot drift from the fact.
- **Accent text under 19px outside the price - measured, kept knowingly (2026-08-07).** The gate above was written for the price and never asked of anything else. Measured on 146 page-states, each element on the ground it actually sits on rather than on a notional white: the language switch `a.on` (14/600, **3.13**, 34 screens), the sort value `.menu-val` (14/600, **3.13**, 17), the active account link `.acc-link[aria-current]` (14/600 on `--bg-surface`, **2.97**, 8 - and only from 960px up, because below that it is an orange fill with an ink label at 5.4), «Читати більше» `.lintro .more` (14/700, **3.13**, 5) and the `₴` mark `.uiv-cur` (11-20.9px, **3.13**, ~39). Accent on the inverse ground already passes and is untouched (`.hptag`, 5.45).
  - **Why not a darker orange.** `#D24400` clears 4.5 only on pure white (4.60) and still fails on `--bg-surface` (4.37) and `--bg-sunken` (4.04), where these controls actually stand, while falling to **3.71** on the inverse ground where today's accent gives 5.45. It would take two accent tokens under a light/dark condition - two oranges in a system whose first colour rule is one orange per view.
  - **The option that stays open is ink.** Every one of these controls already carries a non-text accent signal - the left bar and pin on the account link, the tick in the sort menu, the `btn--inline` underline and arrow on «Читати більше» - so ink would cost no wayfinding. Owner's call to ship as is, taken on the rendered screens.
  - Published on `design/kit/color.html`, so the compromise is visible where the roles are read.
- **THE SIZE GATE IS NOT WHAT DECIDES - THE SURFACE IS. Owner's call, A10 closed 2026-08-12 (step 8.19): sub-AA accent text is accepted for this shop, and nothing on screen changes.** Two additions to the rule above, both read off a fresh census rather than off the record - **all 88 coloured screens at 390 and at 1280**, every element the browser paints `rgb(255,90,0)` that owns visible words, each against the ground it actually composites onto (16 elements over a gradient are unresolved and counted apart):
  - **Accent on the INVERSE ground is allowed at any size.** `.hptag` «Акція тижня» is 12px/500 and reads **5.45:1**, which is AA at every size, and the 19px sentence forbade it for no reason a measurement supports. Orange on ink is the one place this colour gets *more* legible, not less.
  - **A warm surface costs 0.16 and the rule never mentioned it.** `.cbnew` is 30px/600 - large text by WCAG regardless of weight - and still fails, at **2.97 against the 3.0 bar, by 0.03**, purely because it stands on `--bg-surface` `rgb(250,249,247)` instead of white, where the same mark reads 3.13 and passes. A gate written in pixels cannot see this.
  - **Accepted, measured 2026-08-12, and the census had to open the states to be true.** At 390: 18 accent-text shapes, **8 fail, 62 instances**. At 1280: 21 shapes, **12 fail, 172 instances** - not additional marks but the two widths of the same product, and the desktop header carries shapes the mobile one does not. **Six classes:** `.on` (the current language), `.uiv-cur` (the `₴`), `.acc-link`, `.btn--text.btn--inline`, `.cbnew`, `.addr-tag`. Worst in the product: `.acc-link` on `rgb(242,240,237)` at **2.75**, a ground no record had named.
  - **The biggest one had never been rendered by any census, because the walk could not open its menu.** `.on` «Українська» is **82 instances on 82 screens** at 3.13 - every screen in the product - and it lives inside `.wfh-langmenu`, which `toggleLang()` opens. `tools/states.mjs` matched openers on `open[A-Z]` plus **two names typed out**, and measured against the product's real globals one of those two (`toggleDrawer`) is not a function at all while `toggleBurger`, `toggleDrCat` and `toggleLang` are and were never walked. Widened to `toggle[A-Z]` at step 8.19. A record has carried this shape as an accepted exception since 2026-08-07, at 34 screens, while nothing had ever drawn it to check.
  - **The `₴` mark is the next biggest, and the record said the opposite.** `.uiv-cur` is **56 of the 62** at 390. A10's table folded it into «eight money shapes, 20-30/700, passes» - and the digits do pass; the `₴` beside them renders at **11px/700** and does not. The figure and its unit were measured as one thing and are two. (The 2026-08-07 line above had it right at ~39; the 7.81 census lost it, which is what a re-count is for.)
  - **`.badge` «еталон» - 28 instances at 2.91, the biggest line in A10's table - no longer paints the accent at all.** Step 8.10 folded `.badge`, `.addr-tag` and `.tf-mini` into one shape and the colour went with it: measured now on `coach-landing`, «миттєво» and «опт» are ink at 10/700. Fixed as a side effect of a step about geometry, and nobody re-read the finding it closed. **A10's largest item had been dead for two steps.** `.menu-val` «Популярні», in the 2026-08-07 list at 3.13, is ink too.
  - **`.acc-link` is 31, not 8** - the coach cabinet grew at A13 and 8.7 and the count did not.
  - **Said once, factually, and then left with the decision:** sub-AA text is harder to read for low-vision and older buyers, and the accessibility obligations on an EU/UA e-commerce storefront are `[?]` - not read from a source in this session, so not asserted here. Everything above is measured and reversible: the six classes are named, so ink is one decision away if that `[?]` ever resolves against this.
- Error must never look like the brand accent or a celebration. Warning must be visible. [voice.md 5]
- No discount-red bursts, no neon, no beast-mode black-plus-neon. The rule above colours the **price itself**, which is a fact; it is not a licence for red splashes, "sale" banners or countdowns. [anti-references: loud UA discounter, beast mode]

## 4. Typography

- **Display / headline:** a tight condensed heavy grotesk (Oswald Bold as the named default). Role: confident athletic hero headlines. [A4]
- **Body / UI:** Inter. The plain-answer-first workhorse, legible and quiet. [A5 plain answer first]
- **Numerals:** IBM Plex Mono for every dose, serving, nutrition figure, and price. Mono numbers are a trust signal. [A2 trust proven]
- The logotype "Stack" is a custom upright heavy grotesk, related to the display face.

Type scale and weights are set at Step 5 (`design/concept/concept.html`) and Step 07.

## 5. Icon language

- **Solar Bold** (solid / filled), confident and simple. Inline SVG in the product, never a CDN script. [A4]
- Set seen on the plate: leaf (natural), shield-check (trusted), dumbbell (strength), bolt (energy), drop (hydration), heart (wellness).
- **Brand marks are badges, not UI icons (locked 2026-07-31).** Messenger and social marks (Telegram, Viber) deliberately break the outline rule: they are **filled discs with the glyph knocked out**, taken from **one** icon set (Flaticon, via the Freepik/Magnific catalogue) so the two are siblings rather than two strangers. Reason: at 16px an outline mark turns to mush, while a solid silhouette survives - and a badge is what a contact channel looks like everywhere. They still carry **no brand hue**: the paths inherit `currentColor`, so a mark rides its link - grey at rest, Signal Orange on hover. Licence/attribution for the icon set is an operational **[?]** before public launch, same shelf as the brand product logos on the home showcase.

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

- `design/concept/docs/concept.md` - Designer's taste, the 5 Attributes, the stance
- `design/concept/docs/references.md` - the borrowed techniques and the anxieties they answer
- Chosen plate: `design/concept/assets/brand-plate-d-2.png` (board) plus `design/concept/assets/brand-mascot-3d-realistic.png` (mascot)
- Runners-up kept for revisit: `brand-plate-d-1.png` (italic wordmark), `brand-mascot-3d-plush.png`, and the first-round plates `brand-plate-a/b/c-*.png` plus the owner's `brand-plate-c-3.png` (the density reference)
- Enriched later by Step 07 (`/impeccable document`) from the colored `design/` screens. That step does not rewrite this brand.
