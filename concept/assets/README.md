# Brand plates (Step 3a) — generation prompts

**Product:** Stack, mobile-first sport nutrition e-commerce, Ukraine
**Stage:** 06 Concept, Step 3a (three brand toolkit plates)
**Depends on:** `concept/docs/concept.md` (taste + 5 attributes + stance), `concept/docs/references.md`

## Update (2026-07-19): direction chosen, Step 3b done

Magnific MCP became reachable, so the three prompts below were generated directly (GPT 2, 2K, 4:3), two variants each: `brand-plate-a-1/2`, `brand-plate-b-1/2`, `brand-plate-c-1/2`. The owner then added a much denser board `brand-plate-c-3.png` and asked to synthesize: keep that density, move to a white canvas with soft charcoal plus signal orange (the B language), render the bear in 3D. That produced **direction D**: `brand-plate-d-1.png` (italic wordmark), `brand-plate-d-2.png` (upright wordmark), plus two 3D mascot studies `brand-mascot-3d-realistic.png` and `brand-mascot-3d-plush.png`.

**Chosen:** board `brand-plate-d-2.png` + mascot `brand-mascot-3d-realistic.png`. The root `DESIGN.md` was written from these (Step 3b), and the choice plus runners-up are recorded in `concept/docs/concept.md` (section Brand). The prompt library below is kept as history.

## How to use this file

Magnific is not reachable from the assistant in this session (no MCP, no API key in env), so per the stage dependency rule the assistant does not silently swap in another generator. Instead: below are three ready, model-agnostic image prompts. Generate each in your Magnific (or any GPT image 2+ / Mystic model), one image per plate, and save the files here as:

- `concept/assets/brand-plate-a.png`
- `concept/assets/brand-plate-b.png`
- `concept/assets/brand-plate-c.png`

Then say go, and Step 3b writes the root `DESIGN.md` from the plate you pick (identity, palette, typography, icon language, UI direction), transcribing exact values from the "Starting values" blocks below (image models render hex and long text poorly, so this file, not the picture, is the source of truth for the numbers).

Note: no old root `DESIGN.md` exists, so nothing was renamed to `DESIGN-artifacts.md`. The product `DESIGN.md` is born fresh at Step 3b.

## The three plates are three different feelings, not shades of one

All three obey the stance (trust-first calm as the frame; character and energy as accents) and dodge all four rejected reflexes (beast mode, cozy spa, loud UA discounter, sterile pharma). They differ in where they sit on two axes: calm↔energy and clinical↔character.

- **A. Trust Lab** sits at calm and clinical (Thorne, Seed lane). Mascot is emblematic only.
- **B. Coach Power** sits at energy and confident (Nike, Peloton lane, disciplined). Mascot is a dynamic athletic silhouette.
- **C. Your Coach** sits at character and warmth (monobank lane). Mascot is the hero.

Mascot creature: your call. To keep each image coherent the prompts seed a **friendly, sturdy bear** (reads as strength plus warmth, legible in Ukraine, never aggressive). Swap the creature freely if you prefer a shepherd dog or another character; the point of Step 3 is to see the mascot idea in three registers and decide.

---

## Plate A — "Trust Lab"

**Feeling:** calm, scientific, premium trust. Closest to the Thorne benchmark.
**Answers (concept.md):** attribute 1 (calm, not loud), attribute 2 (trust proven, not asserted), attribute 5 (plain answer first).
**Persona emotion:** Viktoriia (Persona 3) feels safe and unhurried, the overwhelm drops (ESJ-2). Olena (Persona 1) trusts what she recommends (Job 5).
**Difference from competitors:** where UA stores shout discounts, this reads as a lab you can trust; where pharma is cold, the warm parchment keeps it human.

**Starting values (source of truth for 3b, not the image):**
- Palette: Evergreen `#1f3d2b` (primary), Warm Parchment `#f6f2e8` (canvas), Ink `#14140f` (text), Graphite `#5b5f57` (secondary), single muted accent Amber `#e0a13a` (action only). One accent, never spread.
- Type pair: a precise neutral grotesk (Inter / Söhne feel) for UI plus a mono (IBM Plex Mono / Geist Mono) for every number, dose, and serving.
- Icon language: thin linear, precise (Solar Linear).
- Radius: soft but tight, 12 to 16px. Flat surfaces, no heavy shadow.

**Prompt:**
> A clean brand identity board poster for a sport nutrition e-commerce brand, laid out as a labeled grid of cells on a warm parchment off-white background. Cells show: a calm minimal wordmark "Stack"; a palette row of solid color swatches (deep evergreen, warm parchment, ink black, graphite grey, one muted amber accent); a typography specimen pairing a precise neutral grotesk with a monospaced numeral sample; a small set of thin linear line icons (leaf, shield, drop, dumbbell); a single small emblematic bear line-mark; one application shot of a matte supplement jar photographed as contained editorial still-life on parchment; a small square social tile; and one mobile UI card fragment showing a product with a plain one-line description and a monospaced dosage figure. Mood: clinical, scientific, premium, calm, trustworthy, adult, unhurried. Muted palette, generous whitespace, flat surfaces, subtle. Avoid: neon, black beast-mode gym aesthetic, terracotta wellness spa tones, red discount bursts or percentage stickers, cold sterile corporate blue. Keep any text short and label-like. Aspect ratio 4:3.

---

## Plate B — "Coach Power"

**Feeling:** confident, athletic, performance forward. Energy on a leash.
**Answers (concept.md):** attribute 4 (athletic energy, not aggression), attribute 1 (calm frame, single accent), attribute 3 (character via a bold voice and mascot).
**Persona emotion:** Olena and Dmytro (Personas 1, 2) feel this store is built for coaches and athletes, it matches their world (ESJ-1 coach credibility). Andriy (Persona 4) sees the action instantly.
**Difference from competitors:** the energy of Nike without the beast-mode noise of UA gym stores, discipline is the differentiator.

**Starting values (source of truth for 3b, not the image):**
- Palette: Ink Black `#0e0e0e` (primary), Canvas White `#fafafa` (canvas), one vivid signal Hot Orange `#ff5a1f` (action and active only), Ash `#e7e7e7` (surfaces), Slate `#6f6f6f` (secondary). Single accent, high-attention moments only.
- Type pair: a tight condensed grotesk display for confident headlines plus a clean neutral sans (Inter) for body.
- Icon language: bold, solid, confident (Solar Bold).
- Radius: crisp, 6 to 10px on interactive elements, generous whitespace and big section gaps.

**Prompt:**
> A bold athletic brand identity board poster for a sport nutrition brand, laid out as a labeled grid of cells on a clean bright white canvas with strong black typography and one vivid hot-orange accent. Cells show: a confident condensed wordmark "Stack"; a palette row (ink black, canvas white, one hot-orange signal color, ash grey); a typography specimen pairing a tight condensed display headline with a clean sans body; a set of bold solid icons (dumbbell, bolt, shield, timer); a dynamic athletic bear mascot silhouette in motion, simple and geometric, strong but friendly, not aggressive; one application shot of a real athlete mid-training holding a supplement, clean and energetic not explosive; a small square social tile with a big headline; and one mobile UI card fragment with a single hot-orange primary action button. Mood: confident, athletic, performance-driven, disciplined, high-contrast, lots of whitespace, the accent appears only on the action. Avoid: neon overload, dark beast-mode aggression, veins and explosions, terracotta spa tones, red discount bursts or countdowns, cold sterile pharma blue. Keep any text short and label-like. Aspect ratio 4:3.

---

## Plate C — "Your Coach" (character led)

**Feeling:** warm, personable, guided, trustworthy with a face. The monobank lane.
**Answers (concept.md):** attribute 3 (character and warmth, not sterile), attribute 5 (plain answer first, a guide), attribute 2 (trust still proven under the warmth).
**Persona emotion:** Viktoriia (Persona 3) feels she finally has someone to ask, the "no one to ask" pain is met by a friendly guide. Warmth without losing trust.
**Difference from competitors:** no UA sportpit store has a character or a guiding personality, this is the monobank move (trusted plus a beloved mascot) that none of the loud or the sterile competitors make.

**Starting values (source of truth for 3b, not the image):**
- Palette: Berry `#6b2d5c` (primary brand), Warm Cream `#f7f1e9` (canvas), Ink `#1a1420` (text), a friendly secondary accent Coral `#ff7a59` (highlights and the mascot), soft Lilac Grey `#e6dfe6` (surfaces). Distinct from A (green) and B (black plus orange).
- Type pair: a warm humanist or lightly rounded sans with personality for headlines plus a clean sans for body.
- Icon language: rounded, friendly, bold duotone (Solar Bold Duotone).
- Radius: friendly and rounded, 16 to 20px, soft.

**Prompt:**
> A warm, friendly, character-led brand identity board poster for a sport nutrition brand, laid out as a labeled grid of cells on a warm cream background with a distinctive deep berry brand color and a friendly coral accent. Cells show: a warm rounded wordmark "Stack"; a palette row (deep berry, warm cream, ink, coral accent, soft lilac grey); a typography specimen pairing a friendly humanist sans headline with a clean sans body; a set of rounded bold-duotone icons (leaf, heart, shield, dumbbell); a friendly sturdy bear mascot as the hero of the plate, calm and competent and approachable, a helpful coach companion, simple flat geometric style, warm not cartoonish or loud; one application shot of the mascot next to a supplement jar guiding a beginner; a small square social tile with the mascot; and one mobile UI card fragment where the mascot points to one clear next step. Mood: warm, human, personable, trustworthy, calm, guiding, a brand with a face. Avoid: dark beast-mode gym aesthetic, terracotta cozy-spa wellness, red discount bursts, cold sterile pharma blue, over-cheerful cartoon slop. Keep any text short and label-like. Aspect ratio 4:3.

---

## After you generate

Drop the three PNGs here with the names above and say go. Step 3b:
1. writes the root `DESIGN.md` from the chosen plate (values transcribed from the "Starting values" block, not read off the image),
2. records the choice and the two runners-up in `concept/docs/concept.md` (section "Brand"),
3. keeps the mascot decision explicit (whether it becomes canon, and which creature).

If you would rather the assistant generate these directly next time, export a Freepik or Magnific API key into the environment (or add a Magnific MCP), and it will call the generator itself.
