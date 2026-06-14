# JTBD

**Product:** Stack - mobile-first sport nutrition e-commerce, Ukraine
**Version:** v1 (2026-06-14)
**Language:** English (markdown research file)
**Depends on:** research/personas.md v1, research/master-research.md v3
**All facts cite sources. Hypothetical jobs marked [H]. Invented jobs are in the Hypotheses section only.**

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| v1 | 2026-06-14 | Initial JTBD set, matrix, and critique from research synthesis. |

---

## Section 1: JTBD

### Product Main Job (the job this product exists to do)

**When I am a coach ordering supplements for multiple athletes with different goals, I want to build a complete order for each client in one session from a trusted supplier and receive my products reliably, so that I can fulfill my clients' orders profitably without losing professional credibility.**

Note on economic model (CONFIRMED by post-persona research): Ukrainian coaches who use wholesale channels act as resellers - they purchase at wholesale price and pass on a marked-up price to clients, keeping the margin as income. This is not just a convenience workflow; it is part of how coaches earn income. The coach's job includes protecting their margin, which makes supplier pricing (accessible wholesale rate) AND reliability (on-time delivery so clients don't ask questions) equally important to the ordering flow.
- Persona: Olena (Persona 1, PRIMARY)
- Research source: CLAUDE.md JTBD table (Primary job), research/ux-patterns.md Pattern 3, research/competitive-analysis.md v3 (gap confirmed: no UA competitor has multi-client cart with saved profiles), fitness-shop.ua wholesale page (coach reseller model confirmed 2026-06-14)
- Status: CONFIRMED by competitive gap, strategy alignment, and reseller model evidence

---

### Related Jobs (on the way to the main job)

**Job 1: Switch to a better supplier**
When I am a coach with an established supplier whose tools don't support multi-client ordering, I want to evaluate a new supplier's tool before fully committing, so that I can switch without putting my client relationships at risk.

- Persona: Olena (Persona 1, PRIMARY)
- Research source: research/strategy.md v3 (riskiest assumption - switching bet), research/competitive-analysis.md v3 (existing competitor programs are not coach-specific)
- Status: CONFIRMED as the core switching dynamic. The specific trigger for switching is [?] - not confirmed by cited source. See Critique section.

---

**Job 2: Get a confident first purchase recommendation**
When I am a beginner with a fitness goal but no supplement knowledge, I want to answer a few plain questions and get a specific, safe product recommendation, so that I can start without becoming a nutrition expert first.

- Persona: Viktoriia (Persona 3, SECONDARY)
- Research source: CLAUDE.md JTBD table (Secondary job), research/ux-patterns.md Pattern 1, research/competitive-analysis.md v3 (gap: no UA store has interactive goal path)
- Status: CONFIRMED as a market gap

---

**Job 3: Verify product safety before buying**
When I am a buyer evaluating a supplement, I want to see the composition, dosage, and origin explained in plain language on the product page, so that I can confirm it is safe and real before adding it to my cart.

- Persona: Viktoriia (Persona 3), partial relevance to Olena (Persona 1) when recommending new products to athletes
- Research source: research/ux-patterns.md Pattern 2, research/benchmark.md (Thorne 4-rounds-of-testing, Bulk Informed Sport per-product), belok.ua /ua/serteficates/ (empty - confirmed gap)
- Status: CONFIRMED as market gap. Specific fears (fakes vs. side effects) are [?].

---

**Job 4: Reorder without effort**
When I am a regular buyer running low on my staple products, I want to reorder in 1-2 taps, so that my routine is never interrupted.

- Persona: Andriy (Persona 4, SUPPORTING)
- Research source: CLAUDE.md JTBD table (Supporting job), research/ux-patterns.md Pattern 4, research/competitive-analysis.md v3 (gap: no UA store has smart reorder)
- Status: CONFIRMED as market gap

---

**Job 5: Recommend with visible evidence**
When I am a coach recommending a product to an athlete, I want to show them the composition, dosage guide, and quality signals from the product page, so that the athlete trusts the recommendation and does not question it.

- Persona: Olena (Persona 1, PRIMARY) in the athlete-facing moment
- Research source: research/ux-patterns.md Pattern 5 (trust through professional credibility), OBS-C8 (coaches translate goals to products for clients)
- Status: CONFIRMED as a use case. Specific trust signals that coaches find credible when showing clients are [?].

---

### Emotional and Social Jobs

These are jobs about how the person wants to feel or be perceived, separate from functional outcomes.

**ESJ-1 (Coach credibility):** When I am a coach, I want to be seen as the reliable expert who always has the right product for each athlete's specific goal, so that my athletes trust me, continue training with me, and refer others.
- Persona: Olena (Persona 1), Dmytro (Persona 2)
- Source: CLAUDE.md (Primary segment profile - "act as trust proxy for clients"), research/ux-patterns.md Pattern 3
- Status: CONFIRMED as driver. Magnitude of this need relative to price sensitivity is [?].

**ESJ-2 (Beginner confidence):** When I am a beginner, I want to feel that I am making a smart, safe, informed decision, so that I don't feel foolish or naive in a gym environment where others clearly know more than I do.
- Persona: Viktoriia (Persona 3)
- Source: CLAUDE.md (Secondary segment profile - "fear of buying the wrong product"), research/ux-patterns.md Pattern 2
- Status: CONFIRMED as driver. Specific social comparison anxiety [?].

**ESJ-3 (Ukrainian buyer skepticism):** When I am a Ukrainian buyer, I want to feel confident that the product I am buying is not a fake or mislabeled version, so that I am not putting my health or money at risk.
- Persona: all personas, strongest for Viktoriia (Persona 3)
- Source: research/ux-patterns.md Pattern 5 (Ukrainian buyers sensitive to "who stands behind this"), belok.ua /ua/serteficates/ (empty certificates - store recognized the need), research/benchmark.md (Thorne, Bulk trust architecture)
- Status: CONFIRMED as a real, active market concern by post-persona research (nadc.gov.ua NADC Ukraine June 2025 case + hotline.ua review behavior + editorial coverage). The dominant fear is fakes/steroids disguised as supplements AND ingredient substitution (cheaper analogs), not primarily side effects. Specific fear hierarchy for the beginner segment is still [?].

**ESJ-4 (Coach autonomy):** When I am a coach, I want to manage my athletes' supplement programs without depending on the supplier for support or advice, so that I maintain full control over what I recommend to clients.
- Persona: Olena (Persona 1), Dmytro (Persona 2)
- Source: CLAUDE.md (Primary segment profile - "know their products well"), OBS-C8
- Status: CONFIRMED as attitude. Specific tool requirements for self-service independence are [?].

---

### Hypothetical Jobs (no confirmed source - do not use in design decisions without validation)

**HYP-1:** When I am a coach whose athletes want individual purchasing flexibility, I want to give each athlete a referral link so they can order directly, so that I still get credit and commission without managing every order myself.
- Source: [H] - no data found. Inferred from referral mechanic in aarrr.md v2 (20% new accounts from coach referral [?]) but no coach behaviour data.
- Risk: assumed referral/commission motivation that may not be how Ukrainian coaches think.

**HYP-2:** When I am a coach, I want to see my athletes' order history to track their supplement adherence, so that I can adjust their program based on what they actually use.
- Source: [H] - inferred from multi-client cart concept; no coach interviews to confirm this is a real need.
- Risk: may be over-engineering the coach tool before validating the basic ordering flow works.

---

## Section 2: JTBD Matrix

### Matrix Key

Importance scale for each persona:
- 3 = Critical: primary deciding factor for this persona's choice to adopt/stay/switch
- 2 = Important: matters, but not the deciding factor alone
- 1 = Nice to have: relevant, will not win or lose the persona
- [?] = Unknown: no data to assign importance

COMPETITORS column: whether direct Ukrainian competitors already close this job well.
- CLOSED: competitor closes the job adequately
- PARTIAL: competitor attempts the job but leaves meaningful gaps
- OPEN: no competitor closes this job

| Job | Olena (P1) Coach+Supplier | Dmytro (P2) Coach-New | Viktoriia (P3) Beginner | Andriy (P4) Regular | FUNCTION in Stack | COMPETITORS |
|-----|--------------------------|----------------------|------------------------|--------------------|--------------------|-------------|
| Main: multi-client ordering in one session | 3 (defining pain) | 3 (would unlock professional positioning) | 1 (not applicable) | 1 (not applicable) | Multi-client cart with saved client profiles | OPEN: no UA competitor has multi-client cart. GymBeam B2B = retailer flow (PARTIAL). belok.ua = callback form (PARTIAL). |
| Job 1: switch to better supplier | 3 (this is the bet) | 1 (first choice, not switching) | - | - | Coach-specific landing, transparent pricing, self-service trial | OPEN: no competitor offers a clearly coach-oriented experience to switch TO |
| Job 2: goal-to-product recommendation | 2 [?] (coaches know products but new product discovery matters) | 2 [?] | 3 (core activation need) | 1 | Goal quiz, goal selector tiles | OPEN: no UA store has interactive goal path |
| Job 3: verify safety before buying | 2 (coaches need to trust what they recommend) | 2 | 3 (top trust barrier) | 1 | Composition/dosage/origin block on product pages | OPEN: belok.ua certificates page empty; vansiton ISO at store level only; no product-level trust content in UA sport nutrition |
| Job 4: reorder without effort | 2 (coaches reorder regularly for active clients) | 1 | 1 | 3 (primary driver for this persona) | One-tap repeat order, My Staples, email/SMS reminder | OPEN: no UA competitor has smart reorder or consumption reminders |
| Job 5: recommend with visible evidence | 3 (protects professional credibility) | 3 | - | - | Product pages with composition/dosage/coach-shareable format | OPEN: no UA store communicates composition depth per product |
| ESJ-1: coach credibility | 3 | 3 | - | - | Coach account positioning, community identity | OPEN: no competitor positions coaches as a community or identity |
| ESJ-2: beginner confidence | - | - | 3 | - | Goal quiz, trust signals, calm tone | OPEN: all UA stores feel catalog-first, not guidance-first |
| ESJ-3: counterfeit skepticism | 2 | 2 | 3 | 1 | Origin/certification/testing communication | PARTIAL: vansiton ISO 22000 (best in UA), belok certificates page empty |
| ESJ-4: coach autonomy | 3 | 2 | - | - | Self-service coach account (no form, no callback) | PARTIAL: GymBeam B2B is self-service but retailer-framed |

---

### Conclusions from Matrix

**3 Jobs for the MVP Core:**

These are jobs that score 3 for Olena (PRIMARY persona) AND are OPEN in the competitive landscape (no competitor closes them well):

1. **Multi-client ordering in one session** - 3 for Olena, 3 for Dmytro, OPEN in market. No workaround exists. This is the structural MVP differentiator for the coach channel.
2. **Recommend with visible evidence (Job 5 / ESJ-1)** - 3 for both coaches, OPEN. Product pages with composition/dosage depth serve coaches when they show products to athletes. This is also the OPEN gap for beginners (ESJ-2) and the safety-verification job (Job 3).
3. **Goal-to-product path (Job 2)** - 3 for beginners, OPEN, 2 for coaches. The single biggest activation gap in the market. Also serves coaches discovering new products for clients.

Note: Jobs 1 and 4 are important but less structurally urgent for MVP. Job 1 (switching) is closed by the combination of Jobs 2, 3, and 5 delivering a better experience. Job 4 (reorder) is the right second feature after first purchase.

**Candidates for cut (functions that close no job scored 3 for primary persona):**

- HYP-1 (referral/commission for coaches): No confirmed job. Deferrable to Phase 2.
- HYP-2 (athlete adherence tracking): No confirmed job. Feature-ahead of validated need.
- Loyalty/bonus tier: Important but does not open a door - it is a retention modifier on an existing relationship, not an acquisition or activation unlock. Deferrable post-launch with real margin data.

---

## Section 3: Critique

### Claim Status Review

| Claim | Status | Risk |
|-------|--------|------|
| Coaches order for 5-30+ athletes per session | CONFIRMED (CLAUDE.md, product brief - but based on owner/designer assumption, not user research) | MEDIUM - may be right order of magnitude but 5-30 is a wide range |
| No UA competitor has multi-client cart with saved profiles | CONFIRMED (competitive-analysis.md v3, direct site fetches) | LOW - verified by research |
| Coaches maintain personal spreadsheets [?] for client tracking | HYPOTHESIS - no cited source | HIGH - if false, the pain of not having a digital tool is lower |
| Peer recommendation is the #1 switching trigger for coaches | HYPOTHESIS [?] - no cited source | CRITICAL - this drives the go-to-market approach but has no evidence |
| belok.ua /opt/, GymBeam B2B, vansiton partner program all have active users | INFERRED - programs exist but usage/satisfaction data is unavailable | HIGH - if coaches are not actively using these tools, the switching framing changes |
| Counterfeit supplements are a real concern for Ukrainian buyers | CONFIRMED by post-persona research: NADC Ukraine June 2025 case (20,000+ packages of fake steroids sold as supplements); buyer authenticity-verification behavior on hotline.ua/bcaa.ua reviews; editorial content about "how to tell original from fake." Sources: nadc.gov.ua, hotline.ua | LOW - trust signal priority is validated |
| Ukrainian coaches communicate with athletes via WhatsApp/Telegram [?] | HYPOTHESIS - no cited source | MEDIUM - affects whether a "coach referral link to athlete" feature has value |
| Goal quiz 40% completion / 3x purchase likelihood | HYPOTHESIS [?] from aarrr.md | LOW risk for now - labeled as hypothesis, not a design input yet |
| Coach AOV 4,000-12,000 UAH [?] | HYPOTHESIS [?] - no real data | LOW for design, HIGH for business model - needed before pricing decisions |
| Beginner fear is primarily about fakes or side effects | ASSUMED - no cited source for Ukrainian context specifically | HIGH - affects trust signal priority |
| Coach pays for client supplements (resells) vs. client buys directly | UNKNOWN - no source | HIGH - affects loyalty/pricing architecture |

---

### Danger List (hypothesis or invented claims that directly affect a design or product decision)

Priority ordered by blast radius - what breaks if the claim is wrong:

**1. What triggers a coach to switch suppliers in Ukraine? (MOST DANGEROUS - confirmed no public data exists)**
- UPDATED by post-persona research: The current universal workflow is Excel+email+phone - Stack replaces an analog tool, not a competitor's digital product. This lowers the switching bar. Coaches are resellers who protect a margin (fitness-shop.ua confirms), so "experience" includes price access transparency (published tier, not negotiated), not just the UI. Delivery reliability is the most cited wholesale praise signal (DSN Group reviews). Personal pricing relationships with a supplier manager add switching friction not captured in price comparison.
- Risk that remains: if a coach's relationship with their current supplier manager is personal and trusted ("he calls me every week, knows my clients"), a digital product alone may not displace that relationship even if technically superior.
- Design decision at stake: the coach onboarding flow must feel like a professional welcome, not just an account setup. Price access must be transparent from day one. Delivery reliability must be signaled.
- Where to look: direct interviews with 5-8 Ukrainian coaches about their supplier relationship. No public data exists - confirmed absent after searching 25+ sources.

**2. Do coaches who already use wholesale programs have specific unmet needs Stack can address? (UPDATED - CONFIRMED YES)**
- CONFIRMED by post-persona research: The current universal ordering process is analog (Excel+email+phone). No self-service multi-client cart exists anywhere in the visible market. Stack would not be competing with a digital B2B tool; it would be offering something that does not exist.
- CONFIRMED: belok.ua has documented authenticity problems and delivery failures (hotline.ua reviews). GymBeam has delivery complaints (wrong product, delayed). These are NOT satisfied coaches.
- Remaining [?]: Whether coaches with DSN GROUP or sport-factor.ua relationships (who rate their suppliers 5.0/5.0) would see a reason to switch. These coaches may be satisfied with analog tools because their supplier delivers reliably.

**3. Are counterfeit supplements a real, active concern for Ukrainian buyers - or is it a background assumption? (CLOSED by post-persona research)**
- CONFIRMED: NADC Ukraine documented the largest underground anabolic steroid operation in the country's history (June 2025) - fake products sold as sports supplements. Buyer behavior on hotline.ua shows active authenticity verification. Editorial content discusses "how to tell original from fake." Trust architecture must address authenticity explicitly - not as optional content.
- Open sub-question remains [?]: whether the beginner's primary fear is fakes, or ingredient underdosing, or side effects. Product page hierarchy should address all three but ordering is still unknown.

---

### 3 Targeted Questions to Close the Most Important Gaps

**Q1 (Switching trigger):** "If you currently buy supplements for your athletes from a supplier you already use, what would have to happen for you to try a different store? What has happened in the past that made you switch?" - for any coach currently buying from belok.ua /opt/, GymBeam B2B, or mega-mass.ua.

**Q2 (Current workflow pain):** "Walk me through how you currently handle ordering for one client - from deciding what they need to the product arriving. Where does it get messy?" - for any coach ordering for 5+ athletes.

**Q3 (Buyer fear):** "What would make you hesitate to buy a supplement online in Ukraine that you've never bought from that store before?" - for beginners and first-time buyers on any Ukrainian store.

---

## Sources

- research/personas.md v1 (this file's base data)
- research/master-research.md v3
- research/strategy.md v3
- research/competitive-analysis.md v3
- research/ux-patterns.md
- research/aarrr.md v2
- research/benchmark.md
- CLAUDE.md (product brief)
- https://belok.ua/ua/opt/ (visited 2026-06-14)
- https://gymbeam.com/content/wholesale (visited 2026-06-12)
- https://vansiton.ua/ua/partneram.html (visited 2026-06-14)
- https://belok.ua/ua/serteficates/ (visited)
