# Master Research

**Single source of truth for the Stack research phase.**
**Version:** Final (post all research phases)
**Date:** 2026-06-10
**All facts cite sources. Unknowns marked [?]. Never invented.**

---

## 1. Introduction

### Purpose

This document synthesizes all research phases (product model, AARRR, competitive analysis, benchmark, UX patterns) into a single actionable source of truth for the wireframes and concept phases. It is written for the product designer and does not repeat raw data - it draws conclusions.

### Problem

The Ukrainian sport nutrition market is dominated by catalog-first stores that treat every buyer identically. Non-expert buyers abandon because they cannot navigate a 2,500-SKU catalog without knowing product terminology. Coaches ordering for multiple athletes have no tools - they are forced to use a consumer checkout built for one person. Regular buyers have no reorder convenience. Trust signals are either absent or unconvincing ("100% original" with an empty certificates page).

### Approach

Eight weeks of structured research across five phases: product model hypotheses, AARRR funnel design, competitive analysis of 15 companies (HARD/SOFT/ASPIRATIONAL), benchmark of 5 best-in-class products across 8 criteria, and UX pattern analysis. All findings are based on direct site access or cited external sources. No facts were invented.

### 5 Key Conclusions

1. **The goal-to-product gap is the product.** No Ukrainian sport nutrition store has an interactive goal-based path. The best local reference (Liki24's symptom navigation) proves Ukrainian buyers understand and use concern-based discovery. The first store to build a real goal quiz or goal selector will own a permanent UX advantage.

2. **The coach channel is wide open.** Only belok.ua has any wholesale infrastructure (a buried form requiring callback - https://belok.ua/ua/opt/). All other Ukrainian competitors treat coaches as regular B2C buyers. Stack's coach account is not a nice feature - it is a category-defining market position.

3. **Trust signals are the conversion barrier, not price.** Belok.ua has an empty certificates page (https://belok.ua/ua/serteficates/). No UA sport nutrition store communicates composition depth, testing, or origin beyond "100% original." The benchmark shows all top international performers lead with safety before price. This is where Ukrainian buyers drop off.

4. **Subscription is not the reorder solution for UA MVP.** The reorder problem is real and validated. But the subscription model (used by Thorne, Bulk, AG1) requires recurring billing trust that the Ukrainian market has not established. MVP solution: email/SMS reminders + one-tap reorder from history.

5. **Mobile is underdeveloped but expected.** Only belok.ua (Android) and Liki24 (iOS+Android) have confirmed apps in UA. But Liki24's app redesign case study (https://qubstudio.com/blog/internship-ux-improvement-of-liki24/) proves that Ukrainian health e-commerce buyers use mobile heavily. Stack's mobile-first responsive web must feel native, not shrunk.

---

## 2. Product Model (v2 - Validated)

### Product in one sentence

Stack is a mobile-first sport nutrition store for the Ukrainian market, built around coaches and gyms who order for their athletes, that turns a confusing catalog into a clear, trusted path from a person's goal to the right products, and keeps regulars stocked with easy reorders.

### Jobs to Be Done

| Priority | Job | Segment |
|----------|-----|---------|
| Primary | When I am a coach ordering for my clients, I want to build multi-client orders in one session, so that I can serve my athletes reliably and maintain their professional trust. | Coaches, gyms, team managers |
| Secondary | When I want to improve my body or performance but feel overwhelmed and unsafe with the catalog, I want to answer a few plain questions and get a clear, verified product set for my goal, so that I can start confidently. | Non-expert beginners |
| Supporting | When I am running low on my staple products, I want to reorder in one or two taps, so that I never run out. | Experienced regulars |

### Audience Segments

| Segment | Priority | Age | Driver | Pain | Trust Level |
|---------|----------|-----|--------|------|-------------|
| Coaches, gyms, team managers | PRIMARY | 25-45 | Operational efficiency for client ordering | No self-service coach tools exist in UA | High (domain expert) |
| Non-expert beginners | SECONDARY | 18-35 | Safe, guided first purchase | Overwhelmed by catalog, afraid of wrong/unsafe product | Low to medium |
| Experienced regulars | SUPPORTING/LATER | 22-40 | Never run out, no friction | Re-navigating catalog every time, no reminders | High (already converted) |

### MVP Feature Scope

| Feature | Segment | Priority | Notes |
|---------|---------|----------|-------|
| Coach ordering flow (multi-client cart, saved client profiles, bulk pricing) | Primary | Must have | Differentiates Stack from all UA competitors |
| Goal-to-product quiz / goal selector | Secondary | Must have | Primary activation mechanism for beginners |
| Product pages with trust signals (composition, dosage, origin, certification) | All | Must have | Primary conversion barrier addressed |
| Catalog with smart goal-based filtering | All | Must have | Supports all segments |
| Reorder / always in stock (email/SMS reminders, one-tap repeat, My Staples) | Supporting | Should have | Free convenience; not a paid tier |
| Standard checkout and account | All | Must have | - |

### Business Model

- Core: margin on product sales
- Coach channel: slightly better pricing (5-10% discount or rebate) is an acquisition investment, not a margin cost
- Reorder: free convenience feature in MVP; subscription tier is an open question for Phase 2
- Sources: competitive analysis research/competitive-analysis.md

---

## 3. AARRR Funnel

### Funnel Summary

| Stage | Primary Mechanic | Coach Channel Path | Primary Metric | Target [?] |
|-------|-----------------|-------------------|----------------|------------|
| Acquisition | Goal-based SEO, coach outreach (Telegram/Instagram), paid social | Direct outreach to gym owners; Telegram fitness communities | New coach accounts/month | 10 by month 3 [?] |
| Activation | Goal quiz completion, first purchase from quiz results | First multi-client order placed within 7 days of registration | Quiz completion rate; coach first-order rate | 40% quiz; 60% coach first order in 7 days [?] |
| Retention | Email/SMS reorder reminders, My Staples list, stock alerts | Coach account reorder; client list management | 30-day repeat purchase rate | 35% [?] |
| Revenue | Margin on sales; coach bulk pricing; quiz upsell | Coach account AOV 3-5x individual buyer | GMV; AOV per segment | 1,200-2,000 UAH individual; 4,000-12,000 UAH coach [?] |
| Referral | Coach referral link (athlete arrives pre-trusted) | Coach organic referral to athletes | % new accounts from referral | 20% within 6 months [?] |

All targets marked [?] are hypotheses pending market validation.

### Key AARRR Decisions

1. **Coach landing page from day 1.** Coach acquisition requires a dedicated entry point, not the standard homepage.
2. **Goal quiz is a required MVP feature.** It is the activation mechanism, not a nice-to-have.
3. **Email reorder reminders (not subscription) in MVP.** SMS in phase 2.
4. **Coach referral links in phase 2.** MVP focus is on excellent coach experience first.

---

## 4. Competitors

### 5-Competitor Matrix

| Competitor | Audience | Product Foundation | Key Mechanism | Trust | Monetization |
|------------|----------|--------------------|---------------|-------|--------------|
| belok.ua (HARD) | All levels; gym-goers; wholesale for coaches (buried) | 80+ brands, 2,500 SKUs, own brand Sporter, 40+ physical stores | Per-serving cost display; 3 goal buckets; cumulative discount | Physical presence, 15 years, federation partnership; empty certificates page | Margin; wholesale form; Android app |
| myprotein.com (ASPIRATIONAL) | All levels globally; male/female segmented; trade accounts | Full supply chain ownership; UK/EU manufacturing | 6-goal selector; Expert Advice hub; 210k+ Trustpilot | BRCGS AA+; Informed Choice/Protein/NSF; "we don't spike protein" | Margin; subscriptions; 5% app discount; trade accounts |
| thorne.com (ASPIRATIONAL) | Health-focused; athletes; healthcare practitioners | 40-year science foundation; 2 labs; Mayo/NIH/Duke partnerships | Taia AI advisor; Health Tests (physician-reviewed); "Take 5 Daily" | NSF+TGA+GRMA; 4 rounds of testing; 40+ active clinical trials | Margin; subscribe-and-save 20%; professional tools |
| liki24.com (SOFT) | Ukrainian health consumers; 1M+ customers | Marketplace; 13,000 pharmacies; 50k+ products | Symptom-based navigation; price comparison across pharmacies | 1M+ customers; EU market recognition; redesigned mobile app | Marketplace margin; cashback; referral |
| huel.com (ASPIRATIONAL) | Health-conscious adults; fitness-oriented | Complete nutrition; B Corp 92.1; 100+ peer-reviewed studies | Quiz + 4-goal page; "Give 25% Get 25%" in primary nav | B Corp; taste guarantee; celebrity endorsements | Margin; subscribe-and-save 20%; Huel+ membership |

### 3 Common Patterns

1. **Goal navigation is universal, but depth varies 10x.** UA stores use 3-5 static buckets. International leaders use quizzes, AI advisors, and gender-specific paths. Same concept, enormous execution gap.

2. **Trust is layered differently by market maturity.** UA: physical presence, years operating, "100% original." International: third-party certifications, clinical partnerships, volume social proof. Both are valid for their context; Stack needs to bridge the two registers.

3. **Reorder is an afterthought in UA, a product feature internationally.** Belok has a cumulative discount. No UA store has structured subscription or smart reminders.

### 3 Key Differences

1. Only belok.ua has any coach/wholesale channel in UA. All other stores are pure B2C.
2. No UA sport nutrition store communicates composition, testing, or origin in depth.
3. Mobile is underdeveloped in UA sport nutrition; only Liki24 (SOFT) has a strong mobile app.

### Opportunity Gaps

| Gap | Evidence |
|-----|---------|
| Interactive goal-to-product path | No UA sport nutrition store has one; Myprotein, Huel, Bulk all do. Source: research/competitive-analysis.md |
| Coach ordering as front-of-site feature | Only belok.ua wholesale exists; buried at /opt/. Sources: https://belok.ua/ua/opt/ |
| Subscription/smart reorder | Completely absent from all UA hard competitors. Sources: research/competitive-analysis.md |
| Third-party quality certification communication | Belok's certificates page is empty. Source: https://belok.ua/ua/serteficates/ |
| Per-serving cost display | Belok does this; no other UA competitor observed doing it. Source: https://belok.ua/ua/sportivnoye-pitaniye/protein/ |

---

## 5. Benchmark

### Scores (8 criteria, scale 1-5)

| Criterion | Myprotein | Thorne | Huel | Bulk | Liki24 |
|-----------|-----------|--------|------|------|--------|
| First screen clarity | 3 | 4 | 4 | 4 | 3 |
| Goal-to-product guidance | 4 | 5 | 5 | 4 | 4 |
| Composition/dosage transparency | 4 | 5 | 4 | 4 | 3 |
| Origin/certification signals | 5 | 5 | 4 | 5 | 3 |
| Social proof quality | 5 | 4 | 4 | 3 | 3 |
| Calm/trustworthy tone | 3 | 5 | 5 | 4 | 4 |
| Reorder ease | 4 | 4 | 4 | 5 | 3 |
| Coach/bulk ordering | 3 | 4 | 1 | 1 | 1 |
| **Total** | **31** | **36** | **31** | **30** | **24** |

Sources: https://www.myprotein.com/, https://www.thorne.com/, https://huel.com/, https://bulk.com/, https://liki24.com/

### Top 3 Mechanisms to Carry into MVP

1. **Goal Selector as primary entry point** (Myprotein + Huel): Present 4-6 goal tiles as the homepage hero. Each tile leads to a curated product collection. No product knowledge required. Psychological mechanism: eliminates catalog paralysis by transferring curation responsibility to the store. Source: https://us.myprotein.com/c/goal-selector/, https://huel.com/pages/choose-your-goal

2. **Layered trust signals at product level** (Thorne + Bulk): Composition, dosage, origin flag, and certification badge visible above the fold on product pages. Answer the safety question before asking for the buy decision. Psychological mechanism: resolves the buyer's primary pre-purchase doubt. Source: https://www.thorne.com/nsf-certified-for-sport, https://www.bulk.com/uk/sports-nutrition/informed-sport

3. **Concern/symptom-based navigation as secondary path** (Liki24): "Not sure what you need?" path organized by situation or concern, not product category. Already proven in the Ukrainian market. Psychological mechanism: meets the buyer in their language before translating to product vocabulary. Source: https://liki24.com/

### 1 Mechanism That Will NOT Work

**Subscription-first purchase model** (AG1/Thorne): Presenting subscription as the default or primary purchase path is not viable for the UA market at MVP stage. Ukrainian e-commerce buyers have low recurring billing trust. The reorder problem is solved in MVP via email/SMS + one-tap repeat order. Source: research/benchmark.md, Section 6.

---

## 6. UX Patterns

### Primary UX Pattern: Goal Selector + Guided Quiz

The homepage entry point is a goal selector (4-6 goal tiles). A secondary "help me choose" path leads to a short guided quiz for buyers who cannot map themselves to a goal. This combination covers both the "I know my goal" buyer and the "I don't know where to start" buyer.

**3 reasons for this choice:**

1. **JTBD alignment:** The beginner's primary job is "turn my vague goal into a safe product set." The goal selector is the shortest validated path from intent to curated products.

2. **Audience fit:** Ukrainian buyers already use concern-based discovery on Liki24. Goal-based navigation is a natural extension of this existing behavior. No learning curve.

3. **Competitor gap:** No Ukrainian sport nutrition store has an interactive goal path. First-mover advantage is real and durable because it requires UX investment to replicate.

### Alternative Under Condition X

If A/B testing shows significant drop-off on goal tiles among the "general wellness/energy/recovery" sub-segment, activate the concern/symptom navigation as a secondary path labeled "Not sure what you need?" - positioned below the goal tiles, not replacing them.

### Pattern That Does NOT Fit

Subscription-first purchase model: see Benchmark Section 5 and Mechanism Won't Work. Reorder as a free convenience feature is the correct MVP approach.

---

## 7. Conclusions

### Gaps Table

| Gap | Evidence Source | Priority |
|-----|----------------|----------|
| No interactive goal-to-product path in UA sport nutrition market | research/competitive-analysis.md; all UA hard competitors observed | Critical |
| No coach ordering tools (self-service) in UA | https://belok.ua/ua/opt/ is the only existing option; form-based, requires callback | Critical |
| Trust signal communication absent on product pages | https://belok.ua/ua/serteficates/ (empty); no UA store communicates testing/origin depth | Critical |
| No smart reorder or consumption reminder system in UA | research/competitive-analysis.md; Belok has discount system but no reminders | Important |
| Mobile UX underdeveloped in UA sport nutrition | Only belok.ua (Android) has an app; all others desktop-first sites | Important |
| Per-serving cost not shown universally | Only belok.ua observed showing this; strong buyer utility signal | Nice to have |

### 6 Hypotheses (If / Then / Because)

| # | If | Then | Because |
|---|----|----|---------|
| 1 | If Stack is the first UA sport nutrition store to build an interactive goal-to-product quiz | Then it will convert beginners at a significantly higher rate than competitors | Because the primary drop-off point for beginners is catalog overwhelm, not price - and no UA competitor addresses this |
| 2 | If coaches experience a self-service multi-client ordering tool (not a callback form) | Then coach accounts will have a repeat order rate over 80% within 90 days | Because coaches who find a reliable supply channel become sticky customers by necessity - switching costs are high when client relationships depend on consistent supply |
| 3 | If product pages lead with composition, dosage, and origin signals before price | Then bounce rate on product pages will decrease for first-time visitors | Because the primary exit trigger for beginners is unresolved safety doubt, not price - answering the safety question first breaks the exit loop |
| 4 | If the coach channel generates 40% of GMV within 6 months | Then Stack can offer coach pricing at 5-10% below retail and still improve overall margin vs. a pure B2C model | Because one coach account replaces 10-30 individual customer acquisition costs [?] |
| 5 | If email/SMS consumption reminders are sent 5-7 days before estimated stockout | Then 30-day repeat purchase rate will exceed 35% for the regular buyer segment | Because the primary barrier to reorder is not motivation (they want to reorder) but timing and friction - reminders remove both [?] |
| 6 | If Stack communicates product origin (country flag), composition (per-serving breakdown), and one quality signal (certification or lab test) on every product page | Then trust signal engagement will correlate with higher add-to-cart rate | Because removing safety doubt is the proximate cause of purchase commitment for the non-expert buyer - all benchmark leaders confirm this pattern |

### Open Questions Table

| Question | Why It Matters | How to Resolve |
|----------|----------------|---------------|
| Are Ukrainian gym coaches primarily reachable via digital (Instagram/Telegram) or in-person? | Determines coach acquisition channel mix and budget | User interviews with 5-10 coaches; community observation |
| What is the real competitive intensity for goal-based Ukrainian search terms ("спортивне харчування для схуднення")? | Determines SEO vs. paid social mix for beginner acquisition | Keyword research tool (Ahrefs/Semrush) with UA data |
| Which trust signals resonate most with Ukrainian buyers: certification badges, coach endorsements, lab tests, or physical store presence? | Determines product page trust architecture priority | Landing page A/B test or 5-second test with target users |
| What is the actual consumption cycle for common products (whey 2kg, creatine 300g)? | Required to implement accurate reorder reminders | Product documentation + user interviews |
| Is there demand for a paid coach account tier, or will basic coach tools be sufficient to acquire the segment? | Determines business model complexity at launch | Qualitative research with 5-10 coaches |

---

## Sources Index

All sources referenced in this document:

- https://belok.ua/ua/
- https://belok.ua/ua/opt/
- https://belok.ua/ua/sistema-skidok/
- https://belok.ua/ua/sportivnoye-pitaniye/protein/
- https://belok.ua/ua/serteficates/
- https://belok.ua/ua/what-is-belok-ua/
- https://play.google.com/store/apps/details?id=starter.belok.client
- https://protein.kiev.ua/uk
- https://bcaa.ua/
- https://5lb.ua/ua/
- https://bodylife.ua/
- https://waysport.ua/
- https://proteinchik.com.ua/uk
- https://sporthavka.com.ua/
- https://liki24.com/
- https://qubstudio.com/blog/internship-ux-improvement-of-liki24/
- https://apps.apple.com/ua/app/liki24-health-and-beauty/id1577477032
- https://www.apteka24.ua/
- https://www.promodo.com/case-studies/how-improving-user-experience-helped-double-organic-traffic
- https://www.myprotein.com/
- https://us.myprotein.com/c/goal-selector/
- https://us.myprotein.com/c/about-us/quality/
- https://bulk.com/
- https://www.bulk.com/uk/sports-nutrition/informed-sport
- https://help.bulk.com/hc/en-gb/articles/23536492662289-Bulk-Boost
- https://www.thorne.com/
- https://www.thorne.com/featured/taia
- https://www.thorne.com/nsf-certified-for-sport
- https://drinkag1.com/
- https://drinkag1.com/ag1-membership
- https://huel.com/
- https://huel.com/pages/choose-your-goal
- https://huel.com/pages/which-huel-survey
- https://huel.com/pages/huel-is-now-b-corp-certified
- research/competitive-analysis.md
- research/benchmark.md
- research/ux-patterns.md
- research/product-model.md
- research/aarrr.md
