# Concept References

**Product:** Stack, mobile-first sport nutrition e-commerce, Ukraine
**Stage:** 06 Concept, Step 1 (visual references)
**Method:** Reference is an input, not an output. One reference is the base for mood and density. Specific techniques are borrowed from others. No reference is cloned. A palette that can be guessed from the category (the "beast mode" gym reflex, or the "cozy spa" wellness reflex) is a model reflex, not a decision, and is rejected here.
**Source of the direction:** `research/docs/benchmark.md` already named the strategic dimension on Stage 01. The dimension is **Trust**, and the trust benchmark is **Thorne** (36/40, calm, clinical, adult tone). Refero has no Thorne capture, so we searched Refero for the same visual language (calm, clinical, trustworthy supplement commerce) and for the two anxiety-removing mechanisms the benchmark named: the goal selector as the primary entry, and layered product-level trust signals.

All values below are reference values, cited so the borrowed technique is concrete (radius, accent discipline, photo treatment), not a general impression. The Stack palette and type pair are NOT decided here. They are decided at Step 3 from the brand plates and recorded in the root `DESIGN.md`.

---

## Base reference: Seed

- **Source:** Seed, https://seed.com (Refero style `e6800fa6-1c26-40ac-a93b-68bb5de59d12`)
- **Why base:** Seed is an actual supplement brand read as "part wellness brand, part scientific product catalog, technically trustworthy." It is the closest live analog to the Thorne benchmark tone (calm, authoritative, adult) and it is a real product catalog, not a one-page marketing site. It sets Stack's mood and density.

**Techniques taken as the foundation (mood, density, product treatment):**
1. **Muted single-hue-family palette on a warm off-white canvas** (Seed: forest green `#1c3a13` on snow white `#fcfcf7`), calm authority instead of loud contrast. This is the anti-reflex move for a sport nutrition store.
2. **Product photography as contained editorial still-life**, muted natural background, minimal shadow, "emphasizing form and texture rather than lifestyle storytelling." Trust through clarity, not hype.
3. **A mono typeface reserved for technical metadata** (Seed Sans Mono for product codes, serving data). Numbers read as precise and scientific, which is exactly what the composition and dosage block needs.
4. **Flat surfaces, no heavy elevation**; card radius 16px; capsule (pill) badge shape. Soft but precise.

**Persona anxiety it removes:**
- Viktoriia (Persona 3): "overwhelming catalog, unfamiliar terminology" (OBS-B2) and "complicated product pages with ingredient lists and no explanation." A calm, contained, scientific presentation lowers the overwhelm that makes her leave. Serves **ESJ-2 (beginner confidence)**.
- Aligns the whole store with **Design Principle 4 (calm and confident)** and matches the benchmark's calm clinical tone.

---

## Borrow 1: Alpine Bio (the clinical trust block)

- **Source:** Alpine Bio, https://alpbio.com (Refero style `94031909-a1c1-4c30-9326-91cb64cd9806`)
- **One technique borrowed, not the whole look:** the "scientific blueprint on parchment" treatment for the product-level trust block.

**Concrete techniques borrowed:**
1. **A single muted accent that is never promoted to a loud CTA.** Alpine Bio's rule is explicit: Bio Blue `#8ec7e2` is used only for interactive detail, "Do not promote it to the primary CTA color." This is the discipline for how Stack signals without shouting.
2. **A mono face for data points** (PT Mono for numbers and labels) plus **tightly cropped, high-key macro photography of the ingredient/material** inside an 18px rounded image card. This is precisely the visual language the PDP trust block wants: composition per serving, dosage, origin, certification, presented as scientific fact.
3. **Compact, information-dense layout** for the spec area (density: compact, 10px element gap), so the trust block reads as a lab spec sheet, not marketing copy.

**Persona anxiety it removes:**
- Viktoriia (Persona 3): **Job 3 "verify product safety before buying"** and "the buyer pauses before add-to-cart to verify safety; if the store does not answer the safety question on the product page, the buyer leaves" (OBS-B5). A clinical, data-first composition block answers the safety question on the page. Also serves **ESJ-3 (counterfeit skepticism)**.
- Olena (Persona 1): **Job 5 "recommend with visible evidence"**. The coach shows an athlete a precise, scientific-looking spec, which protects her professional credibility (trust blocker: "one bad product damages her professional reputation").

---

## Borrow 2: SAPGOODENERGY (sport energy, on a leash)

- **Source:** SAPGOODENERGY, https://sapgoodenergy.com (Refero style `45461634-bb44-4093-ad89-cf2ac74dd76a`)
- **One technique borrowed:** how to inject athletic energy with restraint.

**Concrete technique borrowed:**
1. **A single vivid accent used exclusively for the primary action and active nav**, on a black-on-white canvas with generous whitespace (SAP: Energy Burst Orange `#ff7840`, accent "only in small, high-attention moments such as primary buttons"). This is what keeps Stack reading as sport and performance, not as a probiotic or skincare brand, while staying calm. The accent marks the one obvious action and nothing else.

**Persona anxiety / principle it serves:**
- This is mainly a **differentiation and clarity** borrow. `research/docs/competitive-analysis.md` (Competitor Voice) records that the UA category is loud, discount-led, and urgency-led. A single disciplined accent is how Stack stays calm yet unmistakably sport, and it directly delivers **Design Principle 2 (one clear next step)** and voice principle 3 (a button names its result).
- Andriy (Persona 4): a single high-contrast action makes "Повторити замовлення" unmistakable, serving his need for a fast repeat-order flow.

---

## Supporting screen references (concrete UI patterns)

### Screen 1: Seed AM-02 product page (supplement PDP that leads with science)
- **Source:** https://seed.com/energy-focus (Refero screen `d0c4cb9b-1043-405b-be62-f222dd49af68`)
- **Pattern borrowed:** a supplement PDP that leads with science depth (comparison table, accordion of science-backed explanations, reviews) instead of hype banners. Trust content is the lead, price and buy are calm.
- **Anxiety removed:** Viktoriia **Job 3** (verify safety) and Olena **Job 5** (evidence to show an athlete). Feeds Stack's `ia/docs/pages/product.md` trust-lead PDP.

### Screen 2: Instacart nutrition-facts modal (the composition pattern)
- **Source:** Instacart product detail modal (Refero screen `3998138a-8c20-4f91-92df-b8ab3f8fec1a`)
- **Pattern borrowed:** a two-column composition view, plain-language ingredient text on the left beside a structured per-serving facts label on the right. The raw label sits next to the plain explanation.
- **Anxiety removed:** Viktoriia's "ingredient lists she cannot evaluate for safety" (OBS-B2 / Persona 3 pains). Pairing the label with plain language is the fix. Feeds the "Склад per-serving" block on the PDP.

### Screen 3: ALO wellness goal selector (the beginner front door)
- **Source:** https://wellnessclub.aloyoga.com/surveys/onboarding (Refero screen `2399733e-ee2d-40a2-8d0d-19a9705af7c1`)
- **Pattern borrowed:** a split composition, hero fitness photo on one side and a goal-selection tile grid on the other, with one clear Next. This is the goal-selector entry the benchmark named (Myprotein and Huel).
- **Anxiety removed:** Viktoriia **Job 2** (a confident first recommendation) and "beginners arrive knowing the outcome, not the product" (OBS-B4). Feeds the goal-selector hero in `ia/docs/pages/home.md` and the quiz.

**Also noted (not a primary borrow):** Hers "trust and safety" page (Refero screen `287311c2-2c2e-4a13-841c-ca592f33d9ef`), pale calm sections with green-checkmark trust rows and "doctor-trusted" signals. Pattern for the guarantee and certificates surface (`content.md` 8.8) and the footer trust strip, tied to OBS-B6 ("who stands behind this") and ESJ-3.

---

## Reflexes rejected (before showing anything)

- **Sport-nutrition category reflex: "beast mode".** Aggressive near-black plus neon green, red, or acid yellow, explosive gym imagery, urgency stickers and discount bursts. Rejected: it fuels the exact fear Stack must reduce (Viktoriia's "fear of buying the wrong or unsafe product") and it is the loud UA competitor register Stack differentiates from (`competitive-analysis.md`, Competitor Voice). It also breaks Principle 4.
- **Wellness reflex: "cozy spa".** Cream plus sage plus terracotta, soft botanical calm. Rejected: it reads as tea, skincare, or a probiotic brand, not performance nutrition for "people who take it seriously" (Principle 4). Stack is sport-serious.
- **The synthesis takes neither reflex.** Calm scientific base (Seed) plus a disciplined single sport-energy accent (SAP) plus a clinical trust block (Alpine Bio) gives a store that is trust-first but unmistakably sport. The exact hue, whether the accent is warm or cool, and the type pair are decided at Step 3 from the brand plates, not here.

---

## Sources

- `research/docs/benchmark.md` (strategic dimension = Trust; benchmark = Thorne; mechanisms = goal selector, layered product trust signals)
- `research/docs/personas.md` v1.2 (OBS-B2, OBS-B4, OBS-B5, OBS-B6; Persona 3 Viktoriia, Persona 1 Olena, Persona 4 Andriy)
- `research/docs/jtbd.md` v1.2 (Job 2, Job 3, Job 5, ESJ-2, ESJ-3)
- `research/docs/competitive-analysis.md` (Competitor Voice: UA category is loud, discount-led, urgency-led)
- Refero styles: Seed `e6800fa6-1c26-40ac-a93b-68bb5de59d12`, Alpine Bio `94031909-a1c1-4c30-9326-91cb64cd9806`, SAPGOODENERGY `45461634-bb44-4093-ad89-cf2ac74dd76a`
- Refero screens: Seed AM-02 PDP `d0c4cb9b-1043-405b-be62-f222dd49af68`, Instacart facts modal `3998138a-8c20-4f91-92df-b8ab3f8fec1a`, ALO goal selector `2399733e-ee2d-40a2-8d0d-19a9705af7c1`, Hers trust and safety `287311c2-2c2e-4a13-841c-ca592f33d9ef`
