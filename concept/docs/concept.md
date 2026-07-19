# Concept

**Product:** Stack, mobile-first sport nutrition e-commerce, Ukraine
**Stage:** 06 Concept
**Depends on:** `concept/docs/references.md`, `research/docs/personas.md` v1.2, `research/docs/jtbd.md` v1.2, `Voices/docs/voice.md`, `research/docs/benchmark.md`, `research/docs/competitive-analysis.md`
**Language:** English (internal md). Product strings quoted from `Voices/docs/voice.md` stay Ukrainian.

This file records the design language as decisions with reasons, not mood. Section "Designer's taste" is the owner's input (captured, not invented). Section "Attributes" derives visual opposites from data and taste, each with a source line and a borrowed technique. Sections "Brand" and "Layout" are filled later (Step 3 brand plates, Step 5 chosen layout).

---

## Designer's taste (owner input, captured 2026-07-19)

Taste is data too. It lives here next to the personas, not in anyone's head, so every later prompt reads it instead of returning a model default.

### Likes (named products, not adjectives)

1. **Thorne, Seed** wants clinical, science-first, calm authority. Science and composition are the hero of the screen. These are the trust-benchmark tone (Thorne is the named benchmark in `benchmark.md`) and the base reference in `references.md`.
2. **monobank** wants character without corporate stiffness: a trusted product that still has a living personality. Note: monobank pairs a serious, trusted bank with a beloved cat mascot, which is exactly the "trust plus character" combination Stack is after.
3. **Nike, Peloton** wants athletic energy, confident and performance-forward. Kept on a leash so it never becomes gym aggression (see anti-references).

### Brand mascot (owner idea, candidate, not locked)

The owner wants to explore a **brand mascot**: a character that carries personality, supports the brand, and drives interaction with people. This is a real and promising direction (monobank's cat is the proof it can coexist with trust), and it has functional value for Stack:
- it can be the calm guide for the beginner's "one clear next step" (Persona 3 Viktoriia: "no one to ask");
- it can live in empty states, the goal selector, and coach onboarding as a warm, human touch;
- it must obey the voice rules: no greetings, no celebration, no cheerful slop (`voice.md`, Заборонене). A calm, competent character, not a mascot that shouts.

Status: **LOCKED as canon (2026-07-19).** The owner approved the bear as a canonical brand character. Creature = brown bear. Register = **realistic 3D render** (not a flat illustration), in a charcoal athletic hoodie with a single orange accent, calm and competent, never aggressive. Full spec in the root `DESIGN.md` (section 2). "focused" expression to stay determined-but-calm.

### Anti-references (what Stack must never look like)

All four category reflexes are rejected by the owner:
1. **"Beast mode" gym**: black plus neon, aggression, explosive muscle imagery, urgency stickers. It feeds the exact fear Stack must reduce (Viktoriia's fear of the wrong or unsafe product) and it breaks Design Principle 4.
2. **"Cozy spa" wellness**: cream plus sage plus terracotta, soft wellness. Reads as tea or skincare, not performance nutrition.
3. **Loud UA discounter**: red price bursts, banners, countdowns, "-50%" explosions. This is the competitor register Stack differentiates from (`competitive-analysis.md`, Competitor Voice).
4. **Sterile pharma**: cold blue, generic, no character. Trust without a soul. Rejecting this is what makes the mascot and the monobank personality necessary, not optional.

### Taste addendum (owner input, captured 2026-07-19 at Step 3 review)

Recorded as data, not kept in anyone's head, so the brand and every later prompt inherit it:

1. **White canvas.** Background is white, functional reason: product cards carry product photos shot on white, so the UI must sit on white to match. This resolves the earlier open question between the parchment (A) and cream (C) canvases in favor of white.
2. **Softer near-black, not pure black.** The "ink" is a soft charcoal (`#1C1C1C`), not `#000000`, so the dark surfaces read premium rather than beast-mode.
3. **Signal Orange as the single accent** over evergreen or berry: the owner picked the B color language (black plus one signal orange) as the most fitting.
4. **3D mascot over flat illustration.** The bear is rendered in 3D (realistic register chosen), not drawn.
5. **A dense, complete brand board is valued** (the owner's `brand-plate-c-3` with about 25 cells): understanding plus variety in one glance. This density is the format the brand system was built in.

---

## Central tension and stance

The taste spans three pulls: calm and clinical (Thorne, Seed), character and warmth (monobank, mascot), athletic energy (Nike, Peloton). The anti-references reject both the loud poles (beast mode, loud discounter) and the cold poles (sterile pharma). So the language must be warm and energetic and calm at once.

**Stance (proposed, confirm at the review gate):** trust-first calm is the **frame**; character (the mascot, a monobank-like voice) and athletic energy are **accents inside that frame**, never the whole register. When two pulls conflict, calm and trust win, because trust is Strategy Objective 1 and `voice.md` principle 1 resolves every conflict to calm. Concretely: energy lives in a single action accent and in photography, not in noise; character lives in the mascot, microcopy, and warmth of the neutral, not in loud color or jokes.

This stance is what keeps Stack off all four anti-reference reflexes at the same time.

---

## Attributes (visual opposites, each from a source and a technique)

Each pair is `attribute, not opposite`, with the data line it comes from and the borrowed technique from `references.md`. No pair may contradict the taste above; where taste and data pull apart it is named.

### 1. Calm and confident, not loud or urgent
- **Source:** `voice.md` principle 1 (спокій замість тиску); Persona 3 Viktoriia pain "anything that feels like she might be buying the wrong thing"; Design Principle 4; `competitive-analysis.md` (UA category is loud, discount-led, urgency-led).
- **Technique:** SAPGOODENERGY discipline: a single accent used only on the primary action, generous whitespace, no discount bursts or countdowns.
- **Taste check:** aligns with Thorne, Seed. Tension with Nike, Peloton energy is resolved by the stance: energy is an accent, not the volume of the page.

### 2. Trust proven, not asserted
- **Source:** `voice.md` (trust is proved by showing склад, походження, сертифікат, never "100% оригінал"); `jtbd.md` Job 3 (verify safety before buying), ESJ-3 (counterfeit skepticism); Persona 3 OBS-B5 (buyer pauses to verify; leaves if the page does not answer).
- **Technique:** Alpine Bio clinical spec block (mono numbers, tightly cropped macro ingredient photo, a real viewable certificate) plus the Instacart facts-label pattern (structured per-serving facts beside plain-language ingredients).
- **Taste check:** core Thorne, Seed. No conflict.

### 3. Character and warmth, not sterile or corporate
- **Source:** owner taste (monobank; anti-reference "sterile pharma" rejected); `voice.md` principle 4 (two doors, the novice register is care); Persona 3 "no one to ask, she is online, not in a store with a staff member."
- **Technique:** monobank-style personality carried by a **brand mascot** as a calm guide and interaction device, and a **warm off-white canvas** (Seed snow white, not a cold clinical white). Warmth in the neutral, character in the mascot and microcopy.
- **Taste check:** this is the pair that carries the tension with attributes 1 and 2. Resolved by the stance (character inside a calm frame). Mascot flagged for the owner's go.

### 4. Athletic energy, not gym aggression
- **Source:** owner taste (Nike, Peloton); anti-reference "beast mode" rejected; the product is sport nutrition, and Personas 1 and 2 are coaches and athletes.
- **Technique:** SAP single vivid accent plus a confident condensed headline for hero moments, and energetic but clean real-athlete photography (the Nike, Strava lane), restrained rather than explosive.
- **Taste check:** Nike, Peloton yes, kept on a leash so it does not tip into the rejected beast-mode reflex.

### 5. Plain answer first, depth underneath, not a wall of terms
- **Source:** `voice.md` principle 2; Design Principle 5 (plain language, deep information); Persona 3 "ingredient lists she cannot evaluate," OBS-B4 (arrives knowing the outcome, not the product).
- **Technique:** Seed PDP (science depth in tables and accordions sitting under a simple lead) plus a one-line plain "для чого" on every product card, and the ALO split goal selector as the simple beginner front door.
- **Taste check:** aligns with Thorne, Seed and the guidance mission. No conflict.

---

## Brand

**Chosen (2026-07-19): direction D (synthesis).** Full language lives in the root `DESIGN.md`; this section records the choice and what stays on the shelf.

**Path to the decision.** Round 1 generated three feelings as brand-toolkit plates (Magnific, GPT 2): A "Trust Lab" (calm, clinical, evergreen), B "Coach Power" (athletic, black plus signal orange), C "Your Coach" (warm, berry, mascot-led), two variants each. The owner then added `brand-plate-c-3`, a much denser board (about 25 cells: color system, logo lockups, mascot expressions, UI states, packaging family, trust badges, data cards, tone of voice), and liked that completeness. Round 2 synthesized: keep the c-3 density, drop the berry/cream, move to the B color language on a white canvas, and render the bear in 3D. That synthesis = direction **D**.

**Selected artifacts:**

- Board of record: `concept/assets/brand-plate-d-2.png` - upright wordmark (calmer and more premium than the italic D-1), IBM Plex Mono numerals (matches Attribute 2), clear-space discipline.
- Mascot of record: `concept/assets/brand-mascot-3d-realistic.png` - the realistic 3D register (grown-up, premium, bear-like), chosen over the plush register.

**Why D-2 plus realistic:** white canvas fits product-on-white photography (taste addendum 1); soft charcoal plus a single signal orange keeps energy on a leash (A1, A4); the upright wordmark reads trust-first rather than sporty-aggressive (A1); IBM Plex Mono numerals carry the trust-by-proof technique (A2); the 3D bear delivers character and warmth inside the calm frame (A3), which no UA competitor offers.

**Kept on the shelf (can be revisited):**

- `brand-plate-d-1.png` - same system, italic sporty wordmark. Revisit if the brand should lean more aggressive.
- `brand-mascot-3d-plush.png` - warmer, fully-dressed, more merch-able mascot. Revisit if the beginner-guide warmth should outweigh the premium-performance read.
- Round 1 plates `brand-plate-a/b/c-*.png` and the owner's `brand-plate-c-3.png` (kept as the density reference).

**Open refinement carried into build:** soften the mascot "focused" expression to determined-but-calm (A4).

## Layout

**Decided (2026-07-19): not one direction, a density system mapped to context.** The three directions in `directions.html` are not competing options to pick one from; they are three densities of the one language, each used where it fits ("смотря где и на какой странице"):

- **Listing / catalog (many products at once)** -> the DENSE storefront (direction 2). Compact tiles, mono facts, coach-tier price up front. The register for browsing and for the coach or regular who already knows what they want. [A4 athletic tempo, A2 trust by mono facts]
- **Product focus (a single product: PDP, hero, a featured card)** -> the CALM treatment (direction 1). Big photo, plain "для чого" answer first, one orange action, air around it. The same card component, expanded. [A1 calm, A5 plain answer first]
- **Guidance (onboarding, goal selector, empty states, the "нема кого спитати" newcomer)** -> the MASCOT leads (direction 3). The bear guides to one clear next step on warm-neutral ground. [A3 character, A5 one clear step]

One card component, three densities by context. This composes the two-registers-in-one-frame stance above: the same calm brand, denser for work, airier for focus, guided for the newcomer. The `concept.html` stand (Step 5) demonstrates the one language plus these three context densities, not a single winning layout.
