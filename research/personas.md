# Personas

**Product:** Stack - mobile-first sport nutrition e-commerce, Ukraine
**Version:** v1 (2026-06-14)
**Language:** English (markdown research file)
**Depends on:** research/master-research.md v3, research/strategy.md v3, research/competitive-analysis.md v3, research/ux-patterns.md, research/benchmark.md
**All facts cite sources. Unknowns marked [?]. No invented quotes or numbers.**

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| v1 | 2026-06-14 | Initial people inventory and 4 personas from research synthesis. |
| v1.1 | 2026-06-14 | Post-persona research updates: OBS-B10 (counterfeit concern confirmed by NADC case + reviews), OBS-C13 (coach Instagram/Telegram digital presence confirmed), OBS-C16 (SN-Import and SPORT-FACTOR as additional wholesale channels), OBS-C17 (Ukrainian buyer priorities from review analysis). Switching trigger remains [?]. |

---

## Section 1: People Observations from Research

### Coach / Gym Channel

**OBS-C1:** Ukrainian gym coaches and fitness professionals (ages 25-45) purchase supplements for 5-30+ athletes at a time. They are domain experts who know their products well and act as a trusted intermediary between the store and their athletes.
Source: CLAUDE.md (Target Audience, Primary segment)

**OBS-C2:** Four direct Ukrainian competitors now have some form of B2B/wholesale infrastructure for coaches: belok.ua (callback form at /ua/opt/), GymBeam UA (self-service register/activate/shop), mega-mass.ua (informal wholesale program, /uk/optom/ inaccessible [?]), vansiton.ua (manual phone/email partner program + Coach Cabinet PDF). None has a self-service coach account with multi-client ordering or saved client profiles.
Source: research/competitive-analysis.md v3, direct site fetches 2026-06-14

**OBS-C3:** belok.ua's wholesale form (/ua/opt/) collects company name, contact, business type, city, and expected monthly volume. It requires a manual callback. Terms and pricing are not published on the page.
Source: https://belok.ua/ua/opt/ (visited 2026-06-14)

**OBS-C4:** GymBeam's B2B wholesale is framed as a retailer/distributor program, not a coach-specific tool. Pricing is negotiated based on planned turnover. No saved client profiles, no multi-client cart.
Source: https://gymbeam.com/content/wholesale (visited 2026-06-12)

**OBS-C5:** vansiton.ua's partner program targets sports organizations, fitness clubs, gyms, individual coaches, teams, and federations. Contact is by phone/email only ((050) 410-44-27, moka@vansiton.ua). A "Coach Cabinet" is referenced via a 1.5 MB PDF - content not parseable.
Source: https://vansiton.ua/ua/partneram.html (visited 2026-06-14)

**OBS-C6:** mega-mass.ua has 18+ physical stores across 10 Ukrainian cities, making the store network an effective informal B2B touchpoint for local coaches (especially western Ukraine). Digital wholesale details are not publicly accessible [?].
Source: https://mega-mass.ua/uk/ (visited 2026-06-14), research/competitive-analysis.md v3

**OBS-C7:** The core coach UX problem with existing tools: ordering for multiple clients with different goals from a single session is not supported anywhere in the Ukrainian market. A coach managing 10 clients must navigate the catalog multiple times, maintain their own spreadsheet for client needs [?], and either wait for a callback (belok.ua) or work through a retailer-framed self-service flow (GymBeam).
Source: research/ux-patterns.md (Pattern 3), research/competitive-analysis.md v3

**OBS-C8:** Coaches think in client outcomes first, then translate to products. "Client A wants to lose fat" not "Client A needs CLA 1000mg and L-carnitine 3g/day." The translation from goal to product is the coach's job - the store's job is to have the right products available at the right price.
Source: research/ux-patterns.md (Pattern 1)

**OBS-C9:** Coach/bulk ordering benchmark scores: Thorne 4/5 (best), Myprotein 3/5, Huel 1/5, Bulk 1/5, Liki24 1/5. Even the best-in-class aspirational references barely address coach ordering. US-based Fullscript and Wellevate are practitioner-ordering gold standards but are not UA market references.
Source: research/benchmark.md, Section 3 and 4

**OBS-C10:** The riskiest assumption in strategy.md v3: coaches with established supplier relationships will SWITCH to Stack for a better ordering experience. Price is hygiene (stay within market range) not the reason to switch. Coaches without an established supplier are a distinct sub-group - for them it is a first-choice decision, not a switch.
Source: research/strategy.md v3, research/master-research.md v3

**OBS-C11:** Coach AOV hypothesis: 4,000-12,000 UAH per order [?]. Individual buyer AOV hypothesis: 1,200-2,000 UAH [?]. No real market data exists for either number.
Source: research/strategy.md v3 (labeled [?] hypothesis)

**OBS-C12:** Coach acquisition metrics are entirely hypothetical at this stage: 10 new coach accounts per month by month 3 [?], 60% of registered coaches placing first order within 7 days [?].
Source: research/aarrr.md v2

**OBS-C13 (UPDATED by post-persona research):** Ukrainian coaches are active on Instagram (documented top coaches with workout content, nutrition Q&A in stories). Telegram is used for wholesale supplement ordering - at least one Telegram channel (@sportiv_admin) explicitly offers "wholesale and trainer pricing." Sources: https://mixsport.pro/blog/top-8-instagram-akkauntov-ukrainskih-fitnes-trenerov; tgstat.com health/sport channels search (2026-06-14). However, structured digital ordering for clients (multi-client ordering workflow) remains [?] - no evidence of coaches using digital tools to manage per-client supplement orders was found.

**OBS-C14:** No data found on the proportion of Ukrainian coaches who already have an established supplier relationship vs. those ordering ad hoc from B2C retail. This split determines the ratio of switching-required vs. first-choice acquisitions.
Source: gap - not found

**OBS-C18 (CRITICAL - post-persona research):** The coach-aggregated-order model is a confirmed commercial pattern in Ukraine. fitness-shop.ua explicitly pitches it: coaches collect group orders from multiple clients and place as a single wholesale order, earning the margin between wholesale and retail price. Coaches are RESELLERS with a margin incentive, not just bulk buyers seeking convenience. Source: https://fitness-shop.ua/optovyj-prajs-dlja-vykupa (2026-06-14)

**OBS-C19 (CRITICAL - post-persona research):** The current universal B2B ordering workflow in Ukraine is entirely analog: (1) download Excel price list from supplier, (2) mark quantities, (3) email order back, (4) manager phones to confirm. No self-service multi-client digital tool was found in any publicly accessible supplier. Stack's multi-client cart replaces a spreadsheet and a phone call, not a competitor's digital product. This significantly lowers the switching bar for Persona 1. Sources: fitness-shop.ua, sport-factor.ua (2026-06-14)

**OBS-C20 (NEW - post-persona research):** mega-mass.ua's wholesale form asks trainers for their social media links as identity verification: "якщо ви тренер, то посилання на соціальні мережі" (if you are a trainer, your social media links). This is a simple, low-friction coach verification method used in practice. Source: https://mega-mass.ua/uk/opt/ (2026-06-14)

**OBS-C21 (NEW - post-persona research):** Delivery reliability and stock availability are the most consistently praised traits in wholesale supplement supplier reviews. DSN Group (5.0/5.0, 23 reviews): "stable wholesale supplies, stock availability, fast shipping." Authenticity/official distributor status is the second trust signal. Price is the least visible factor (none of 8 suppliers publishes pricing publicly). Sources: https://dsn.ua/store-reviews/ (2026-06-14)

**OBS-C22 (NEW - post-persona research):** belok.ua has a documented counterfeit complaint: reviewer "Елена Андрейченко" explicitly states "selling non-original product, seal doesn't match the original" for Optimum Nutrition Opti-Men. Delivery failures also documented. Source: https://hotline.ua/ua/yp/23704/reviews/ (2026-06-14)

**OBS-C23 (NEW - post-persona research):** No public forum discussions or reviews where Ukrainian coaches discuss supplement supplier switching were found after extensive search. No coach-specific B2B reviews exist on any accessible public platform. The switching trigger remains [?] - but structural evidence (analog workflow, personal pricing relationships) suggests switching cost is higher than a transparent price comparison would imply. Source: Confirmed absence across 8 supplier pages, 3 review platforms (2026-06-14)

**OBS-C16 (NEW from post-persona research):** The wholesale landscape for coaches extends beyond the 4 retail competitors profiled. SN-Import (snimport.com.ua) explicitly serves "sports trainers and nutritional instructors" for wholesale purchases, importing 30+ brands (NOW Foods, Amix, Nutrend, Optimum Nutrition, Sporter). SPORT-FACTOR (sport-factor.ua) similarly targets coaches, gym owners, and fitness club owners for wholesale with a registration form + weekly pricing via email/Telegram. These distributor relationships may be long-standing and price-driven (direct import pricing, bypassing retail margin). Source: https://snimport.com.ua/ (visited 2026-06-14), https://sport-factor.ua/sportyvne-kharchuvannia-optom/ (visited 2026-06-14)

**OBS-C17 (NEW from post-persona research):** What Ukrainian buyers prioritize in supplement stores (from review analysis and editorial content): (1) product authenticity and certificates, (2) professional, knowledgeable staff, (3) prices and promotions, (4) business transparency (physical address, return policy). Coaching tools, wholesale flow, and B2B features were not mentioned in any consumer review or ranking found. Source: top20.ua/belok.ua reviews (59 reviews), thepage.ua top 5 stores article (visited 2026-06-14)

**OBS-C15:** No data found on what specifically triggers a Ukrainian coach to change supplement suppliers. Price failure? Stockout? Peer recommendation? Something else?
Source: gap - not found. This is the most dangerous missing piece given the switching-bet nature of the riskiest assumption.

---

### Non-Expert Beginners

**OBS-B1:** Beginners are 18-35, starting a fitness journey or targeting a specific outcome (fat loss, muscle gain, energy, recovery). Minimal sport nutrition knowledge. Often referred by a coach or found the store via social or goal-based search.
Source: CLAUDE.md (Target Audience, Secondary)

**OBS-B2:** Primary beginner pains: overwhelming catalog, unfamiliar terminology, fear of side effects, uncertainty about dosage, no way to verify product authenticity.
Source: CLAUDE.md, research/master-research.md v3

**OBS-B3:** No Ukrainian sport nutrition store has an interactive, personalized goal-to-product path. GymBeam uses static categories. belok.ua has 3 static goal buckets. vansiton.ua has sport/goal navigation but no personalized quiz. The market gap is real and confirmed.
Source: research/competitive-analysis.md v3

**OBS-B4:** Beginners do not arrive knowing the product - they arrive knowing the outcome. "I want to lose weight" not "I want thermogenic + CLA." The translation from goal to product is what they need the store to do.
Source: research/ux-patterns.md (Pattern 1)

**OBS-B5:** Non-expert buyers pause before add-to-cart to verify safety. If the store does not answer the safety question on the product page, the buyer leaves and may not return. Counter-evidence: belok.ua's certificates page (/ua/serteficates/) is empty - a store that recognized the need but left it unresolved.
Source: research/ux-patterns.md (Pattern 2), https://belok.ua/ua/serteficates/ (visited)

**OBS-B6:** Ukrainian buyers trust "who stands behind this" more than abstract certifications. Physical store presence, named experts, coach endorsements, and federation partnerships are more culturally legible than NSF or Informed Sport badges.
Source: research/ux-patterns.md (Pattern 5)

**OBS-B7:** Ukrainian buyers already understand concern/symptom-based navigation from Liki24's "Симптоми" category (1M+ customers). This is not a foreign UX pattern for the Ukrainian market.
Source: research/benchmark.md (Liki24 section), research/ux-patterns.md (Pattern C)

**OBS-B8:** Goal quiz hypothesis: 40% completion rate; completers are 3x more likely to purchase than cold browsers [?]. Both are unvalidated.
Source: research/aarrr.md v2 (labeled [?])

**OBS-B9:** No data found on how Ukrainian beginners actually discover supplement stores (TikTok? Instagram coach referral? Google search? In-gym recommendation?). Acquisition channel mix is unknown.
Source: gap

**OBS-B10 (UPDATED by post-persona research):** Counterfeit and misrepresented supplements are a CONFIRMED real concern in Ukraine. Evidence: (1) NADC Ukraine (June 2025) documented the "largest underground anabolic steroid manufacturing in country's history" - 20,000+ packages of anabolic steroids sold as sports supplements with counterfeit labels, distributed in Kharkiv, Kyiv, Odesa, Lviv. Source: https://nadc.gov.ua/en/news/disguised-as-sports-supplements-large-scale-illegal-anabolic-steroid-production-uncovered-in-ukraine (2) bcaa.ua buyers actively verify authenticity with manufacturers before trusting stores (205 reviews, hotline.ua). Source: https://hotline.ua/ua/yp/26100/reviews/ (3) GymBeam reviews mentioned "packaging not matching official packaging." The fear is about fakes AND quality substitution (cheaper ingredient substitutes). What dominates - fake products vs. dosage substitution vs. side effects - is still [?] for the specific beginner segment.

---

### Experienced Regulars

**OBS-R1:** Regular buyers are 22-40, experienced, know exactly what they want, time-poor, habit-driven. Order the same 2-5 products repeatedly. Will stay loyal to a reliable store.
Source: CLAUDE.md (Target Audience, Supporting)

**OBS-R2:** Their primary pain: re-navigating the catalog on every order and out-of-stock surprises. No UA sport nutrition store has smart reorder or consumption-based reminders.
Source: research/competitive-analysis.md v3

**OBS-R3:** belok.ua's cumulative discount system (12-month window, 5% at 10K UAH, 10% at 50K UAH) is the best existing retention mechanic in UA for this segment. Liki24 (SOFT) has the best local reorder reference via search history and cashback.
Source: https://belok.ua/ua/sistema-skidok/ (visited), research/ux-patterns.md (Pattern 4)

**OBS-R4:** Second-purchase hypothesis: regulars who place a second order within 30 days have a retention rate above 80% at 6 months [?]. Unvalidated.
Source: research/aarrr.md v2 (labeled [?])

**OBS-R5:** Subscription model is explicitly ruled out for UA MVP. Low recurring billing trust in Ukrainian e-commerce. The correct MVP approach is email/SMS reminder + one-tap repeat order from history.
Source: research/benchmark.md (Section 6), research/ux-patterns.md (Pattern That Does NOT Fit)

---

### What We Do NOT Know About People (Summary)

| Gap | Why It Matters | Priority |
|-----|---------------|----------|
| What triggers a Ukrainian coach to change supplement suppliers? | Core to the riskiest assumption (switching bet) | CRITICAL |
| How do coaches communicate supplement ordering to their athletes today? (WhatsApp/Telegram/spreadsheet/face-to-face?) | Determines whether a digital multi-client cart replaces an existing workflow or creates a new parallel one | HIGH |
| What fraction of coaches already have an established supplier relationship vs. ordering ad hoc? | Determines ratio of switching-required to first-choice acquisitions | HIGH |
| Do coaches pay for client supplements themselves (resell/bundle) or do clients buy separately? | Affects pricing model, loyalty tier design, and coach channel economic hypothesis | HIGH |
| What are the specific fears Ukrainian beginners have about supplements? (Fakes? Side effects? Doping?) | Determines trust signal hierarchy and content priority on product pages | HIGH |
| How do beginners discover supplement stores in Ukraine today? | Determines acquisition channel investment priorities | MEDIUM |
| What is the real distribution of coaches by number of clients served? | Affects MVP scope - a 5-client coach needs a different tool than a 30-client one | MEDIUM |
| What is a typical coach reorder frequency? | Determines reminder timing and retention mechanic cadence | MEDIUM |

---

## Section 2: Personas

**Selection rationale:** Research supports four distinct people, each with fundamentally different motivations and relationship with the product. The coach channel is split into two sub-personas because the switching dynamic (OBS-C10, OBS-C12) makes them meaningfully different acquisition problems. One is chosen as PRIMARY per strategy requirements. The beginner and regular are confirmed as distinct by multiple research observations.

---

### Persona 1 (PRIMARY): Coach with Established Supplier - "Olena"

**Why primary:** Strategy.md v3 names the coach channel as primary and the switching bet as the riskiest assumption. The coach who already has a supplier relationship is the harder acquisition (high switching cost) and the higher-value customer (high AOV, multiplied by athlete referrals). If Stack cannot convert Olena, the business model fails.

| Field | Detail |
|-------|--------|
| Age | 30-42 |
| Role | Professional or semi-professional fitness coach, gym trainer, or sports team manager |
| Situation | Has been ordering from belok.ua /opt/, GymBeam B2B, mega-mass.ua, or a distributor for 1-3+ years. Has an established ordering routine - even if imperfect. |
| Current tools | Excel price list downloaded from supplier + email order submission + manager phone callback. Personal spreadsheet for tracking client needs [?]. WhatsApp/Telegram to coordinate with clients [?]. SOURCE: fitness-shop.ua wholesale page (confirmed), coach client coordination channel still [?] |
| Clients | 8-25 active clients [?] with different goals, budgets, and schedules |

**Jobs (what she is trying to get done):**
- Build and track orders for each client's specific product set in one session, not multiple separate browser tabs
- Maintain her professional credibility - athletes trust her recommendations and she cannot afford to recommend a product that turns out to be fake, out of stock, or wrongly dosed
- Get pricing that allows her to either include supplements in her coaching fee or transparently pass savings to clients
- Never have a client run out of a product mid-training block

**Pains with current options (UPDATED with confirmed research):**
- CONFIRMED: The current universal workflow is Excel price list → email → manager phone callback. This is a manual, analog process with no digital order tracking.
- CONFIRMED: No supplier has a self-service multi-client cart or saved client profiles. Stack would replace a spreadsheet and a phone call, not another product.
- CONFIRMED: belok.ua has authenticity problems (documented fake seal complaint) and delivery failures (multi-day non-delivery). Source: hotline.ua reviews
- CONFIRMED: None of 8 identified suppliers publishes pricing publicly - all pricing is negotiated directly with a manager. This creates a personal relationship dependency.
- [?]: Whether coach manages client list in a spreadsheet, WhatsApp group, or memory - specific tool is unknown

**Trust triggers (what convinces her):**
- Peer recommendation from a respected coach colleague (the #1 trigger [?] - no cited source yet)
- Transparent, published pricing - knowing the coach rate before committing, not after a callback
- Visible product range that covers everything her clients already use (switching suppliers means switching products, which athletes notice)
- Signs of operational stability (years on market, physical presence, stock reliability)

**Trust blockers (what scares her off):**
- Unknown or untested supplier - one bad product damages her professional reputation
- Pricing higher than her current supplier for the same product
- Complex onboarding that requires a form + callback + waiting period

**Switching likelihood:** LOW without a strong reason. She has a working system, even if imperfect. The switching trigger must be experiential (the tool is materially better for her work, not just slightly cheaper).

**CONFIRMED:** OBS-C1 through OBS-C8, OBS-C10, OBS-C13 (gap), OBS-C14 (gap), OBS-C15 (gap)
**[?]:** Client count, current spreadsheet use, WhatsApp/Telegram for client coordination, "peer recommendation as trigger" - all unconfirmed

---

### Persona 2 (SECONDARY): Coach Without Established Supplier - "Dmytro"

| Field | Detail |
|-------|--------|
| Age | 24-34 |
| Role | Early-career personal trainer or recently certified coach |
| Situation | Has 3-10 clients [?], currently buying from B2C retail stores at full price, no active B2B relationship |
| Current tools | Orders from standard B2C stores (same path as his clients), no wholesale account |

**Jobs:**
- Find a supplier who makes him look professional and knowledgeable to his clients
- Get pricing below retail so he can offer value to clients or create a small margin
- Stop directing clients to different stores and start being the single trusted recommendation

**Pains:**
- Pays retail prices while ordering volume for clients - economics don't work
- Clients compare prices across stores and see the same prices he pays, which undermines his role as a professional with access to something better
- No consolidated view - each client order is a separate browser session

**Trust triggers:**
- Product authenticity assurance (critical in the Ukrainian market - concern about fakes is real [? - assumed, needs confirmation])
- Low-friction onboarding - no form + callback required; can self-service from day one
- "Used by coaches" social proof and positioning from the store itself
- Clear coach pricing tier that is published, not negotiated

**Switching cost:** LOW - no established supplier relationship to displace. First-choice acquisition, not switching.

**CONFIRMED:** OBS-C1, OBS-C2 (gap exists), OBS-C7
**[?]:** Client count, specific pricing pain, peer review of Stack's positioning as "for coaches"

---

### Persona 3 (SECONDARY): Non-Expert Beginner - "Viktoriia"

| Field | Detail |
|-------|--------|
| Age | 19-28 |
| Role | Person starting a fitness journey or targeting a specific outcome |
| Situation | Has a goal ("I want to lose fat", "I want more energy"), has no supplement knowledge, found Stack via coach referral or goal-based search |
| Current alternatives | Googles "протеїн для схуднення," browses belok.ua or GymBeam UA, gets overwhelmed, may ask a friend or coach |

**Jobs:**
- Receive a specific, safe product recommendation for her goal in a few steps without learning sport nutrition terminology
- Verify the product is real and correctly labeled before buying
- Make a first purchase decision with confidence, not anxiety

**Pains:**
- 2,000-10,000 SKU catalogs with no guided path (belok.ua, GymBeam UA)
- Ingredient lists she cannot evaluate for safety or effectiveness
- "100% original" claims that she cannot verify
- No one to ask - she is online, not in a store with a staff member

**Trust triggers:**
- A clear path that says "if your goal is X, here is what you need"
- Composition explained in plain language ("what is this, what does it do")
- A visible connection to a coach or expert ("recommended by coaches who train athletes")
- Physical store presence signal (confirms the business is real)

**What scares her off:**
- Complicated product pages with ingredient lists and no explanation
- Being asked for payment before she has built trust
- Anything that feels like she might be buying the wrong thing

**CONFIRMED:** OBS-B1 through OBS-B7
**[?]:** How she discovers Stack (acquisition channel), specific fears (fakes vs. side effects vs. dosage), whether she relies on a coach recommendation or independent discovery

---

### Persona 4 (SUPPORTING): Experienced Regular - "Andriy"

| Field | Detail |
|-------|--------|
| Age | 26-38 |
| Role | Experienced gym-goer with an established supplement routine |
| Situation | Takes the same 2-4 products for 12+ months, knows exactly what he wants, orders monthly |
| Current alternatives | Shops across belok.ua, GymBeam UA, bcaa.ua based on price and stock at the time |

**Jobs:**
- Reorder his staples in 1-2 taps without re-navigating the catalog
- Get notified before he runs out (not after)
- Never run out during a training block

**Pains:**
- Must re-find his products every time (no saved staples list in any UA store)
- Out-of-stock surprises mid-training
- No reminder or consumption-tracking system

**Trust triggers:**
- Stock reliability (he can predict his staples will be available)
- Consistent pricing (no price surprise on a repeat order)
- Fast repeat-order flow (account page shows his last order, one tap to repeat)

**Switching cost:** MEDIUM - has no strong loyalty to any one store, shops on price and availability. Will switch if Stack is reliably stocked and has an easy reorder flow.

**CONFIRMED:** OBS-R1 through OBS-R5
**[?]:** Whether he shops on price alone or has any brand/store loyalty; reorder frequency; whether email reminders would appeal to him or feel like spam

---

## Sources

- CLAUDE.md (product brief)
- research/master-research.md v3
- research/strategy.md v3
- research/competitive-analysis.md v3
- research/ux-patterns.md
- research/benchmark.md
- https://belok.ua/ua/opt/ (visited 2026-06-14)
- https://gymbeam.com/content/wholesale (visited 2026-06-12)
- https://vansiton.ua/ua/partneram.html (visited 2026-06-14)
- https://mega-mass.ua/uk/ (visited 2026-06-14)
- https://belok.ua/ua/serteficates/ (visited)
- https://belok.ua/ua/sistema-skidok/ (visited)
