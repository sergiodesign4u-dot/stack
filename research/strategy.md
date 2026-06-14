# Strategy

**Version:** v_refresh (migrated from product-model.md)
**Previous file:** research/product-model.md (kept for history)
**Date:** 2026-06-12

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| product-model v1 | 2026-06-10 | Initial pre-research hypotheses |
| product-model v2 | 2026-06-10 | Updated after competitive analysis + benchmark |
| strategy v_refresh | 2026-06-12 | Migrated to Strategy format. AIDA tables retired (AARRR is the single funnel). Each section updated with new competitor findings from v_refresh competitive analysis. Riskiest assumption added. Business model clarified (free reorder, no hardcoded subscription tier). |
| strategy v2 | 2026-06-14 | Added loyalty / bonus sub-section to Business Model. Framed as a research task. Working hypothesis: bonus balance + cumulative lifetime discount. Illustrative tiers (owner sketch, unvalidated). References competitor loyalty data from competitive-analysis.md v2. |

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
| Motivation | Serve athletes reliably. Maintain professional credibility. Save time on bulk ordering. |
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

**The single assumption this entire product depends on: coaches and gym managers will actually order for their athletes through a digital platform - and Stack can reach them and convert them before they are satisfied by the existing partial solutions (GymBeam B2B, belok.ua wholesale form, vansiton.ua Coach Account).**

If coaches are not reachable digitally (they operate via personal relationships and WhatsApp/Telegram direct messages), or if the partial B2B solutions from GymBeam and vansiton.ua already satisfy their need well enough, then:
- The coach-channel GMV projection fails
- The primary differentiator disappears
- Stack becomes a standard B2C store competing on price with belok.ua and GymBeam, where both have more scale and brand recognition

**Why this is the riskiest assumption:**
- Risk to VALUE (not feasibility). The tech is buildable. The question is whether coaches will change behavior.
- The v_refresh competitive research found that GymBeam and Vansiton both have coach/B2B programs - the assumption that "only belok.ua has any coach infrastructure" is no longer true. Stack must offer something coaches cannot get elsewhere.
- Digital reachability of Ukrainian coaches via Instagram/Telegram is unconfirmed. This is Open Question 1 from the competitive analysis.

**What Stack is betting on:**
Coaches will prefer a dedicated multi-client tool with client profiles and a community identity over the retailer-focused B2B bulk flows that exist today - and they are reachable through digital channels.

**The smallest test for this assumption:**
Qualitative interviews with 5-10 Ukrainian gym coaches before writing a line of code. Key questions: How do you currently order for your athletes? Have you tried GymBeam B2B or belok.ua wholesale? What is missing? Would a multi-client cart with saved client profiles solve a real problem?

If coaches say their current method (even a spreadsheet + one phone call) is good enough, the core business model needs revision before building.

---

## Discarded alternatives for "riskiest assumption" (trace)

**Option A: Trust signals are not enough to convert beginners.** A real risk, but it is a conversion optimization problem, not a model-level failure. If trust signals don't work, adjust the product page design. The business model survives.

**Option B: Interactive goal quiz does not convert.** Also a conversion problem. The quiz can be iterated. The model survives without it (becomes a standard catalog + trust signals).

**Option C: Email/SMS reorder reminders don't drive repeat purchases.** A retention risk, not a model-level failure. Retention can be addressed through other mechanics.

**Chosen: Coach-as-channel model fails.** This is the only scenario where the entire product positioning collapses. Objectives 1-2 (trust, goal guidance) are still valid standalone features for a B2C store - but the primary JTBD, the primary revenue driver hypothesis (40% GMV from coaches), and the referral flywheel all depend on coaches adopting the platform. That is why it is the riskiest assumption.

---

## Sources

- research/competitive-analysis.md v_refresh (2026-06-12)
- https://belok.ua/ua/opt/
- https://gymbeam.com/content/wholesale
- https://vansiton.ua/en/
- https://liki24.com/
- research/benchmark.md
