# Strategy

**Version:** v5 (2026-06-21)
**Previous file:** research/product-model.md (kept for history)
**Date:** 2026-06-21

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| product-model v1 | 2026-06-10 | Initial pre-research hypotheses |
| product-model v2 | 2026-06-10 | Updated after competitive analysis + benchmark |
| strategy v_refresh | 2026-06-12 | Migrated to Strategy format. AIDA tables retired (AARRR is the single funnel). Each section updated with new competitor findings from v_refresh competitive analysis. Riskiest assumption added. Business model clarified (free reorder, no hardcoded subscription tier). |
| strategy v2 | 2026-06-14 | Added loyalty / bonus sub-section to Business Model. Framed as a research task. Working hypothesis: bonus balance + cumulative lifetime discount. Illustrative tiers (owner sketch, unvalidated). References competitor loyalty data from competitive-analysis.md v2. |
| strategy v3 | 2026-06-14 | Rewrote riskiest assumption: now frames the bet as SWITCHING coaches (experience over price, price as hygiene). Updated "Chosen" reasoning in discarded alternatives. Added price/volume open question. Reflects competitive analysis v3 finding that belok.ua, GymBeam UA, mega-mass.ua all have wholesale infrastructure. |
| strategy v4 | 2026-06-14 | Added Product Decisions section: four founder decisions locked after People and JTBD research phase. Coach ordering = minimal saved client list + per-client tagging + order history. Goal guidance = goal tiles in MVP, quiz post-launch. Coach pricing = separate published transparent tier + cumulative individual loyalty (numbers [?]). Reorder = one-tap repeat in MVP, My Staples post-launch. Open Questions remain open (switching trigger, volume economics). |
| strategy v5 | 2026-06-21 | Riskiest assumption rewritten after founder coach interviews (June 2026, field research, not web-sourced): price/margin is a primary switching driver and a gate, not only hygiene. Experience is the differentiator among price-acceptable suppliers. Previous v4 redaction preserved as superseded for trace. Updated "What Stack is betting on", the Discarded alternatives "Chosen" trace, Open Question 1, Decision 3 wording (numbers untouched), and the Olena segment Motivation. Price feasibility at launch volume remains [?]. |

### What changed from product-model v2 to strategy v_refresh

- **Structure:** AIDA tables removed. Objectives / Segments / Business Model / Riskiest Assumption is the new structure.
- **Objectives:** Reordered and tightened. Trust remains Objective 1. Coach-channel GMV target is explicitly labeled a hypothesis.
- **Segments:** GymBeam UA's B2B wholesale and vansiton.ua's Coach Account Program discovered - both narrow the "coach channel is wide open" claim. Gap still exists but is smaller than previously stated. Updated accordingly.
- **Business model:** Made explicit that reorder is a FREE convenience feature, not a paid tier. Subscription tier is an open question for a later phase, not promised.
- **Riskiest assumption:** Added as a new section. Framed around the coach-as-channel model.

---

## 1. Objectives

**Note on v_refresh:** No objectives were CHANGED by new competitor findings. Three were CONFIRMED and one was updated with a nuance on the coach-channel gap (GymBeam and Vansiton both have B2B/coach programs, narrowing the claim that "only belok.ua has any coach infrastructure" - but neither offers client management or multi-client ordering). Trust remains Objective 1.

| # | Objective | Metric | Target (hypothesis) | Evidence status |
|---|-----------|--------|-------------------|-----------------|
| 1 | Build trust and reduce uncertainty for the safety-sensitive buyer | Product page trust signal engagement rate; return rate; bounce rate on product pages | Less than 5% return rate; trust engagement on more than 60% of sessions | CONFIRMED. Benchmark: all top performers lead with trust before price. No UA store communicates composition depth or testing. Vansiton mentions ISO 22000:2005 - the best UA signal seen, but not on product pages. Sources: research/competitive-analysis.md v_refresh |
| 2 | Build a trusted path from goal to product for non-expert buyers | Guided quiz completion rate; first-purchase conversion from quiz | 40% quiz completion; 20% quiz-to-purchase | CONFIRMED. Goal navigation is universal; no UA sport nutrition store has an interactive path. GymBeam UA uses static categories. Sources: gymbeam.ua, belok.ua, research/competitive-analysis.md |
| 3 | Establish the coach/gym ordering channel as primary revenue driver | Percentage of GMV from coach accounts; average coach order value | 40% of GMV from coach accounts within 6 months [hypothesis] | CONFIRMED WITH NUANCE. GymBeam has a self-service B2B wholesale program. Vansiton has a Coach Account Program. The gap is narrower than v2 suggested - but neither competitor offers multi-client ordering, saved client profiles, or coach-specific landing pages. The structural gap remains. Sources: gymbeam.com/content/wholesale, vansiton.ua |
| 4 | Drive repeat purchases and reduce catalog abandonment | 30-day repeat purchase rate; cart abandonment rate | 35% repeat rate; less than 60% abandonment [hypothesis] | CONFIRMED. No UA sport nutrition store has smart reorder, consumption-based reminders, or subscription. Liki24 (SOFT) has a cashback loyalty program - the best local reorder reference. Source: liki24.com |

---

## 2. Audience Segments

**v_refresh notes:**
- Coach segment: UPDATED. GymBeam UA's B2B program and vansiton.ua's Coach Account are now confirmed. Stack's coach channel must deliver beyond bulk ordering - client management, multi-client cart, and front-of-site positioning are the differentiation.
- Beginner segment: UNCHANGED. Goal quiz + trust signals before price remain the primary lever.
- Regulars segment: UNCHANGED. Email/SMS reorder confirmed as correct MVP mechanic. Subscription is not viable for UA MVP.

### Segment 1: Coaches, Gyms, Team Managers (Primary)

**Validation: CONFIRMED WITH NARROWED GAP.** GymBeam's B2B wholesale (self-service) and vansiton.ua's Coach Account Program both exist, but neither is a coach-specific tool with client management. Stack's differentiation must be: dedicated entry point, multi-client cart, client profiles, and a community identity - not just better pricing.

| Field | Detail |
|-------|--------|
| Age | 25-45 |
| Profile | Professional/semi-pro coaches, gym owners, team managers. Purchase for 5-30+ athletes. Know products well. Act as trust proxy for clients. |
| Motivation | Serve athletes reliably. Maintain professional credibility. Save time on bulk ordering. Primary switching driver (founder coach interviews, June 2026, field research, not web-sourced): a wholesale price that protects the reseller margin is the gate - a coach will not consider a new supplier without a workable price that lets them mark up and earn. The ordering experience (multi-client flow, predictable pricing, reliable delivery, goal-based selection for athletes) is what wins among the suppliers that pass the price gate. Price is the precondition; experience is the differentiator beyond it. |
| Pain | GymBeam's B2B is retailer-focused, not coach-focused (no client management). Belok's wholesale requires a callback form. Vansiton's Coach Account scope is unclear. No UA competitor has multi-client cart or saved client profiles. |
| JTBD | When I am ordering supplements for my clients, I want to build multi-client orders in one session with saved client profiles, so that I can serve my athletes reliably and maintain their trust in my professional recommendations. |
| Priority | PRIMARY. Coach accounts bring multiple repeat customers, high AOV, and remain underserved despite GymBeam and vansiton.ua partial offerings. Sources: gymbeam.com/content/wholesale, vansiton.ua, belok.ua/ua/opt/ |

### Segment 2: Non-Expert Beginners (Secondary)

**Validation: CONFIRMED.** No Ukrainian sport nutrition store has an interactive goal path. The safety concern is more prominent than initially stated - it must appear before price.

| Field | Detail |
|-------|--------|
| Age | 18-35 |
| Profile | Starting a fitness journey or targeting a specific outcome (fat loss, muscle gain, energy, recovery). No or minimal sport nutrition knowledge. Arrives via coach referral, TikTok/Instagram, or goal-based search. |
| Motivation | Achieve a fitness goal safely. Get confident, clear direction. Not appear foolish, not make a dangerous mistake. |
| Pain | Enormous catalog, unfamiliar terminology, fear of side effects or wrong products. No single trusted source. Cannot evaluate "100% original" claims. |
| JTBD | When I want to improve my body or performance but feel overwhelmed and unsafe with the catalog, I want to answer a few plain questions and get a clear, verified product set for my goal, so that I can start confidently without becoming an expert first. |
| Priority | SECONDARY. High volume acquisition path; trust systems built for this segment serve all segments. |

### Segment 3: Experienced Regulars ("Always in Stock") (Supporting / Later)

**Validation: CONFIRMED with subscription correction.** The subscription model is NOT viable for UA market at MVP stage. No UA sport nutrition store has smart reorder. The correct approach is: one-tap reorder from order history + email/SMS reminders.

| Field | Detail |
|-------|--------|
| Age | 22-40 |
| Profile | Experienced buyers with established supplement routines. Know exactly what they want. Time-poor. Loyal to a store they trust and will stay if it is reliable. |
| Motivation | Never run out of staples. Minimize decision effort for repeat purchases. |
| Pain | Re-navigating the catalog every time. Out-of-stock surprises. No reminder or auto-reorder system. Having to re-enter address/payment. |
| JTBD | When I am running low on my staple products, I want to reorder in one or two taps, so that I never run out and don't waste mental energy on repeat decisions. |
| Priority | SUPPORTING/LATER. Valuable for LTV and retention. Reorder as a free convenience in MVP. Subscription tier is an open question for Phase 2 - do not hardcode. |

---

## 3. Business Model

**Core:** Margin on sales. Standard e-commerce. No SaaS or subscription required to buy.

**Coach channel:** Coach accounts with slightly better pricing (5-10% discount or a rebate mechanism) are an acquisition investment, not a margin cost. One coach account replaces 10-30 individual customer acquisition costs [hypothesis]. This is a high-leverage retention tool.

**Reorder ("always in stock"):** FREE convenience feature in MVP. Email/SMS reminders at estimated consumption timing + one-tap repeat order from account history + "My Staples" saved list. This drives retention without requiring subscription infrastructure. It is NOT a paid tier.

**Paid subscription tier:** Open question for a later phase. Do not hardcode it as a committed product feature. Possible future value: priority stock alerts, deeper analytics for coaches, exclusive products. Not an MVP commitment.

**Loyalty / bonus structure (research task, not a settled decision):**

The goal is a loyalty structure that is not worse than the UA market AND does not destroy margin. Both are unknowns until real sales data exists - no margin numbers are available, so no final structure can be calculated now.

Market context (from research/competitive-analysis.md v2, 2026-06-14):
- belok.ua: cumulative lifetime discount in a 12-month window - 5% at 10K UAH, 10% at 50K UAH. Simple, spend-based, no points accounting. Source: https://belok.ua/ua/sistema-skidok/
- 5lb.ua: two-layer system - cumulative tier discount (3% at 1K-5K UAH, 5% at 5K-10K, 8% at 10K+) plus a bonus points balance redeemable up to 7% of order. Source: https://5lb.ua/en/skidki.html
- GymBeam UA: points system (1 pt per 50 UAH web, 2 pt per 50 UAH app), 4 redemption tiers, 90-day expiry. Source: https://gymbeam.ua/ua/content/prohrama-loialnosti
- No competitor has a coach-specific loyalty or bulk discount structure that is transparent and self-service.

Working hypothesis (to validate against unit economics, which are not calculated yet):
- A bonus balance earned from purchases (percentage of spend credited to a redeemable account balance), plus a cumulative lifetime discount that grows with total spend.
- Illustrative tier sketch from the owner - UNVALIDATED HYPOTHESIS ONLY, never to be treated as decided:
  - Roughly 5,000 UAH lifetime spend - approximately 5% discount
  - Roughly 25,000 UAH lifetime spend - approximately 7% discount
  - Roughly 50,000 UAH lifetime spend - approximately 10% discount
- These thresholds and percentages need to be validated against actual margin data [?] before committing. Margin numbers do not yet exist.
- The coach channel reaches high lifetime spend thresholds quickly (coach AOV hypothesis: 4,000-12,000 UAH per order [?]), which means a cumulative lifetime discount rewards coaches structurally without a separate discount category.

Open question: Does a simpler cumulative tier discount (like belok.ua) outperform a points balance (like GymBeam) in practice for a UA sport nutrition buyer? This requires user research and early sales data, not desk research alone.

**Value exchange:**
- For coaches: faster multi-client ordering + better pricing in exchange for volume and loyalty
- For beginners: guided, safe path to first purchase in exchange for trust and first transaction
- For regulars: zero-friction reorder in exchange for repeat business and LTV

**Pricing:** All price points are hypotheses. No invented numbers.
- Individual buyer AOV hypothesis: 1,200-2,000 UAH [hypothesis]
- Coach account AOV hypothesis: 4,000-12,000 UAH [hypothesis]
- Coach discount hypothesis: 5-10% below retail [hypothesis]

These require validation through early sales data and user interviews before being treated as targets.

---

## 4. Riskiest Assumption

**Updated v5 (2026-06-21) after founder coach interviews (June 2026, field research, not web-sourced). The interviews reversed the prior framing: price and reseller margin are a primary reason coaches switch, not only competitive hygiene. Price is the gate - without a workable wholesale price a coach will not even consider Stack - and experience is how Stack wins and keeps the coaches who pass that gate.**

**The single assumption this entire product depends on (v5): coaches, gyms, and fitness professionals - both those already buying from belok.ua, GymBeam UA, mega-mass.ua, or vansiton.ua, and those without an established supplier - switch primarily on price and reseller margin. A wholesale price that lets the coach mark up and earn is the precondition for Stack to be considered at all. Among the suppliers that pass on price, the ordering experience wins and retains: the multi-client flow, transparent and predictable pricing, reliable delivery, and goal-based selection for their athletes. Stack must be BOTH competitive enough on price to pass the gate AND better on experience to win beyond it. It cannot win on the lowest price alone, because it lacks the purchasing volume to undercut larger rivals - it must clear the price gate and then win on experience.**

**Open risk [?]:** whether Stack can offer a coach-acceptable price at launch-stage volume without wholesale-cost data. This gates the entire bet and is unconfirmed. The founder interviews give the motivation (price and margin are the gate); they do not give the wholesale-cost numbers that decide whether Stack can meet that gate. Specific prices remain [?]. Source: founder coach interviews, June 2026 (field research, not web-sourced).

**Superseded v4 redaction (kept for trace, no longer operative):**

> The single assumption this entire product depends on: coaches, gyms, and fitness professionals - both those already buying from belok.ua, GymBeam UA, mega-mass.ua, or vansiton.ua, and those without an established supplier - will SWITCH to Stack because of a clearly better ordering experience for themselves and their athletes. That experience means goal-based product selection, transparent composition and dosage, easy multi-client reorder, and a clear loyalty and bonus benefit. Price must stay within market range. It is competitive hygiene, the condition not to be blocked, not the reason to switch.

Why it changed: founder coach interviews (June 2026) found that price and reseller margin are a primary switching driver and a gate, not merely hygiene. The v4 line "price is hygiene, not the reason to switch" understated price. Experience remains the differentiator, but only among price-acceptable suppliers.

The bet fails immediately if the only reason coaches would come to Stack is a lower price. A price war is won by the player with the largest purchasing volume, not the best product - and the established rivals (belok.ua, GymBeam UA, mega-mass.ua) have far more volume and likely lower per-unit wholesale costs at scale. Stack cannot win on price alone at launch.

**Why this is the riskiest assumption:**

Risk to VALUE, not feasibility. The coach channel is not an empty niche anymore. The competitive analysis (v3, 2026-06-14) confirmed that belok.ua, GymBeam UA, mega-mass.ua, and vansiton.ua all have some form of wholesale or B2B infrastructure for coaches. The question has shifted: it is no longer "will coaches order online?" - some already do. The question is whether they will switch suppliers for a better experience for their clients, or stay where they are because switching costs are high and price alone does not justify the change.

If the ordering experience Stack builds is not meaningfully better than what rivals already offer - in the flow, the guidance, the trust signals, and the loyalty benefit - then:
- The coach-channel GMV hypothesis fails
- The primary differentiator disappears
- Stack becomes a standard B2C store competing on price with rivals who have more scale, more volume, and lower per-unit costs
- Volume economics (higher turnover compensating for lower margin per unit) is an UNVALIDATED hypothesis [?]: it depends on purchasing scale we do not have at launch and on wholesale cost data we do not yet have. Do not treat this as a plan.

**What Stack is betting on (v5):**
Coaches switch first on price and reseller margin: a wholesale price that lets them mark up and earn is the gate. Among suppliers that pass that gate, Stack wins on experience - goal-based product selection, composition transparency, easy multi-client reorder, reliable delivery, and a loyalty structure that rewards growing volume. Price is the precondition to be in the running; experience is what wins and retains. (Superseded v4 framing: "Experience is the reason to switch. Price is the condition not to be blocked." - now outdated; price is a primary driver, not only hygiene.)

**The smallest test for this assumption:**
Talk to coaches in two groups before writing a line of code. Group 1: coaches who already buy through a wholesale or B2B program (belok.ua /opt/, GymBeam B2B, mega-mass.ua, vansiton.ua). Group 2: coaches who have no established supplier and order ad hoc. For each group: What would realistically make you switch to a new supplier? Is it the ordering experience and what it enables for your athletes, or primarily the purchase price per unit? What does "better for your athletes" mean to you in practice?

If the consistent answer is "price is the only thing that would make me switch," the core positioning needs revision before building.

---

## Discarded alternatives for "riskiest assumption" (trace)

**Option A: Trust signals are not enough to convert beginners.** A real risk, but it is a conversion optimization problem, not a model-level failure. If trust signals don't work, adjust the product page design. The business model survives.

**Option B: Interactive goal quiz does not convert.** Also a conversion problem. The quiz can be iterated. The model survives without it (becomes a standard catalog + trust signals).

**Option C: Email/SMS reorder reminders don't drive repeat purchases.** A retention risk, not a model-level failure. Retention can be addressed through other mechanics.

**Chosen: Coach-as-channel model fails because the switching reason is wrong.** The coach channel is not an empty niche - belok.ua, GymBeam UA, mega-mass.ua, and vansiton.ua all have some B2B/wholesale infrastructure. The risk is no longer "will coaches order online at all" - some already do. The risk is whether the experience Stack offers is compelling enough to make coaches switch from an existing supplier relationship. If the differentiator is not experience (for them and their athletes) but only price, Stack cannot win: it lacks the purchasing volume to undercut established rivals with more scale. Objectives 1-2 (trust, goal guidance) are still valid standalone features for a B2C store - but the primary JTBD, the primary revenue driver hypothesis (40% GMV from coaches), and the referral flywheel all depend on the switching bet being right. That is why this is the riskiest assumption. (v5 note: founder coach interviews, June 2026, refined this trace. Price and reseller margin are a primary switching driver and a gate, not only hygiene. The bet now has two conditions: Stack must pass the coach's price gate AND win on experience beyond it. The earlier "differentiator is experience, not price" framing is superseded - experience differentiates among price-acceptable suppliers, and price feasibility at launch volume remains [?].)

---

## Open Questions

| # | Question | Why it matters |
|---|----------|----------------|
| 1 | What would actually make a coach switch suppliers - is it the ordering experience, price, product range, or delivery reliability? | Validates or invalidates the switching assumption. If price is the dominant answer and it is not hygiene but the primary driver, the positioning and go-to-market strategy need revision before building. ANSWERED (v5) by founder coach interviews, June 2026 (field research, not web-sourced): price and reseller margin are a primary driver and a gate; the riskiest assumption was revised accordingly. The remaining [?] is whether Stack can meet a coach-acceptable price at launch volume (see Question 2). |
| 2 | Can Stack price within market range while sustaining margin at launch-stage volume - and does higher volume eventually compensate for lower per-unit margin? | Volume economics is an UNVALIDATED hypothesis [?]. Without wholesale cost data and real sales volume, no unit economics calculation is possible. This is a question for the technical scoping and supplier sourcing phase, not a number to invent now. |

---

## Product Decisions (Locked, 2026-06-14)

The following four decisions were made by the founder after reviewing the People and JTBD research phase (personas.md v1.1, jtbd.md v1, master-research.md v4). Each closes an open product scope question that was blocking wireframe work.

Hard constraint: No specific percentages, discount rates, cumulative thresholds, or conversion rates are committed as targets anywhere. Any numbers shown are labeled as unvalidated placeholders only.

---

### Decision 1: Coach ordering flow (CLOSED)
**Choice: Self-service multi-client cart, minimal version.**

Ships in MVP:
- Saved client list with client name and goal
- Ability to place an order tagged to a specific client
- Order history per client

Coach identity verified via a social media link. Precedent: mega-mass.ua wholesale form uses this method in practice (OBS-C20).

Does NOT include: full B2B order management, invoice export, client nutrition tracking, custom client-facing portal.

Research basis:
- The current universal B2B ordering workflow in Ukraine is entirely analog: Excel price list + email + manager phone callback. Stack replaces a spreadsheet and a phone call, not a competitor's digital product. This lowers the switching bar significantly. Sources: fitness-shop.ua, sport-factor.ua (OBS-C19, confirmed 2026-06-14)
- Coaches are resellers who earn the margin between wholesale and retail price. Per-client order tracking protects their margin management workflow. Source: fitness-shop.ua (OBS-C18, confirmed 2026-06-14)
- No UA competitor has a self-service multi-client cart with saved client profiles. Source: research/competitive-analysis.md v3 (OBS-C2)

This closes: the MVP scope question for the coach ordering flow.

---

### Decision 2: Goal-to-product guidance (CLOSED)
**Choice: Goal selector tiles in MVP, guided quiz as first post-launch iteration.**

MVP ships: 4-6 goal tiles on the homepage (examples: Build Muscle, Fat Loss, Energy, Recovery, Performance), each leading to a curated product collection. No account required.

First post-launch iteration: a short guided quiz (3-5 questions: goal, experience level, constraints) as a secondary "Help me choose" path for buyers who cannot map themselves to a tile.

Research basis:
- No Ukrainian sport nutrition store has any interactive goal-to-product path. belok.ua has 3 static goal buckets. This is a confirmed market gap. Source: research/competitive-analysis.md v3 (OBS-B3)
- Goal tiles are proven in best-in-class international references: Myprotein 6-goal selector, Huel 4-goal, Bulk 4-goal. Source: research/benchmark.md
- Ukrainian buyers already understand concern-based discovery from Liki24. Source: research/ux-patterns.md (OBS-B7)

Important: The conversion hypotheses from aarrr.md v2 ("40% quiz completion," "3x more likely to buy") are NOT the basis for this decision and remain [?]. The decision rests on coverage logic: tiles for buyers who can self-identify a goal, quiz for those who cannot.

This closes: the goal guidance scope question for MVP.

---

### Decision 3: Coach pricing structure (CLOSED - structure only; numbers remain [?])
**Choice: Separate, published, transparent coach pricing tier + cumulative loyalty system for individual buyers.**

The coach pricing tier:
- Published on the public "For Coaches" page, visible before registration
- A fixed wholesale discount below retail [? - specific % requires real wholesale cost data from supplier negotiations]
- Accessible from day one of a verified coach account (social media link verification)
- NOT a negotiated relationship: a published tier any coach can see and evaluate before signing up

Individual buyer loyalty:
- Cumulative system tied to lifetime spend
- Thresholds and % rates remain [?] until real margin data exists (illustrative, unvalidated example from owner sketch: roughly 5K/25K/50K UAH at roughly 5/7/10%)
- Separate from the coach tier

Research basis:
- None of the 8 identified wholesale suppliers in Ukraine publishes pricing publicly. All pricing is gated behind registration and manager contact. Source: research/master-research.md v4, post-persona research (8 supplier pages visited 2026-06-14, OBS-C21)
- Publishing a transparent, self-service coach price is an experience differentiator - consistent with the riskiest assumption. The experience win is transparency and pricing predictability for a reseller who needs to plan their margin without a phone call. Source: research/strategy.md v3 (riskiest assumption)
- A unified cumulative tier was rejected: a new coach with 5 clients may wait many orders before reaching the first threshold, giving them no immediate reason to switch from a supplier who already has their custom pricing.

Numbers that remain [?] and require real data before commitment:
- Specific coach discount % [?]
- Cumulative loyalty thresholds [?]
- Cumulative loyalty discount rates [?]
- Minimum order for coach tier access [?]

This closes: the STRUCTURE of the pricing decision (what it is: separate transparent coach tier + cumulative individual loyalty).
This does NOT close: the specific numbers, which require real wholesale cost data from supplier negotiations.
This is NOT a race to the lowest price: the coach tier must stay consistent with the riskiest assumption (v5) - the price must be competitive enough to pass the coach's gate AND the experience must win among price-acceptable suppliers. The differentiator beyond the price gate is transparency and predictable pricing, not the lowest possible number. Price is a primary gate, not mere hygiene.

---

### Decision 4: Reorder mechanic (CLOSED)
**Choice: One-tap repeat from order history in MVP; My Staples as first post-launch iteration.**

MVP ships: Order history in the account page. "Repeat order" button adds all previous items to cart. Quick confirmation, done. No consumption estimation required.

First post-launch iteration: "My Staples" saved list + email reminder triggered before estimated stockout. Reminder timing to be calibrated from real post-launch purchase data, not invented before launch.

Research basis:
- No Ukrainian sport nutrition competitor has any reorder mechanic. Source: research/competitive-analysis.md v3 (OBS-R2)
- Consumption-cycle estimation (whey 2kg, creatine 300g) cannot be reasonably calculated before first sales data exists. Source: OBS-R2 (gap)
- One-tap repeat from order history maps to established behavior in adjacent Ukrainian categories (Liki24 purchase history). Source: research/benchmark.md

Numbers that remain [?]:
- Consumption cycle for common products [?]
- Email reminder timing [?]
- Expected repeat purchase rate from the mechanic [?]

This closes: the MVP reorder scope question.
This does NOT close: consumption-cycle data, which requires real post-launch purchase history.

---

### What remains deferred (outside product scope - not forced closed)

| Item | Why deferred | Where to resolve |
|------|-------------|-----------------|
| Real coach discount % | Requires wholesale cost data from supplier negotiations | Technical scoping + supplier sourcing phase |
| Cumulative loyalty thresholds and rates | Requires real margin data; no number is load-bearing without it | Technical scoping + unit economics model |
| Consumption cycle times for reorder reminders | Requires real purchase history from first sales cycle | Post-launch calibration (first 90 days) |
| Coach AOV actual data | No real market data exists; current numbers are hypothesis [?] | First 90 days of sales data |
| Switching trigger specifics | Requires direct coach interviews - no public data exists after 25+ source searches | User research, pre-launch or parallel to launch |

---

## Sources

- research/competitive-analysis.md v_refresh (2026-06-12)
- https://belok.ua/ua/opt/
- https://gymbeam.com/content/wholesale
- https://vansiton.ua/en/
- https://liki24.com/
- research/benchmark.md
