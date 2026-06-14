# Master Research

**Single source of truth for the Stack research phase.**
**Version:** v_refresh (2026-06-12)
**Previous version:** Final (2026-06-10)
**All facts cite sources. Unknowns marked [?]. Never invented.**

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| Final | 2026-06-10 | Initial synthesis of all research phases |
| v_refresh | 2026-06-12 | Updated competitors section (3 groups, new discoveries: GymBeam UA, vansiton Coach Account, MyProtein UA shipping suspended). Renamed Product Model section to Strategy. AARRR updated with new competitor findings. Hypotheses updated to If/Then/Because format; riskiest assumption marked. |
| v2 | 2026-06-14 | Reflected loyalty hypothesis in Strategy (Business Model) and Conclusions (open questions). Added SEO open question to conclusions. Reflects additions from competitive-analysis.md v2, strategy.md v2, aarrr.md v2. |
| v3 | 2026-06-14 | Rewrote riskiest assumption: switching framing (experience over price, price as hygiene, volume economics [?]). Updated Hypothesis 2 [RISKIEST] to match. Added price positioning/volume open question. Reflects competitive-analysis.md v3 and strategy.md v3. |
| v4 | 2026-06-14 | Added Post-Persona Research section (June 2026): counterfeit supplements confirmed as real market concern (NADC case + buyer reviews), SN-Import as additional wholesale channel for coaches, Instagram/Telegram presence for coach acquisition, buyer trust criteria from review analysis. Switching trigger remains [?]. |

---

## 1. Introduction

### Purpose

This document synthesizes all research phases (strategy, AARRR, competitive analysis, benchmark, UX patterns) into a single actionable source of truth for the wireframes and concept phases. It is written for the product designer and does not repeat raw data - it draws conclusions.

### Problem

The Ukrainian sport nutrition market is dominated by catalog-first stores that treat every buyer identically. Non-expert buyers abandon because they cannot navigate a 2,500-SKU catalog without knowing product terminology. Coaches ordering for multiple athletes have no dedicated tools - existing B2B programs are either retailer-focused bulk flows (GymBeam) or form-based callbacks (belok.ua). Regular buyers have no reorder convenience. Trust signals are either absent or unconvincing ("100% original" with an empty certificates page).

### Approach

Eight weeks of structured research across five phases: strategy hypotheses, AARRR funnel design, competitive analysis of 15 companies (HARD/SOFT/ASPIRATIONAL), benchmark of 5 best-in-class products across 8 criteria, and UX pattern analysis. v_refresh adds web search and site fetches from 2026-06-12 to update competitor findings. All findings are based on direct site access or cited external sources.

### 5 Key Conclusions

1. **The goal-to-product gap is the product.** No Ukrainian sport nutrition store has an interactive goal-based path. GymBeam (the market's #1 by traffic at 2.39M monthly visits) uses static categories. The first store to build a real goal quiz or goal selector will own a durable UX advantage.

2. **The coach channel is partially open - but Stack's pitch must be specific.** GymBeam has a self-service B2B wholesale program. Vansiton has a Coach Account Program. Belok has a form-based wholesale with callback. None of these offer multi-client cart, saved client profiles, or a coach community identity. The gap is structural, not just a feature.

3. **Trust signals are the conversion barrier, not price.** Belok.ua's certificates page is empty. No UA sport nutrition store communicates composition depth, testing, or origin beyond "100% original." Vansiton mentions ISO 22000:2005 - the strongest quality signal observed in UA. This is where Ukrainian buyers drop off and where Stack can lead.

4. **Subscription is not the reorder solution for UA MVP.** The reorder problem is real and validated. But the subscription model requires recurring billing trust that the Ukrainian market has not established. MVP solution: email/SMS reminders + one-tap reorder from history. This is confirmed by the absence of any subscription mechanic across all UA hard competitors.

5. **Mobile is underdeveloped but expected.** Only belok.ua (Android) and Liki24 (iOS+Android) have confirmed apps in UA sport nutrition. GymBeam operates multi-platform internationally but UA-specific app status is [?]. Stack's mobile-first responsive web must feel native, not shrunk.

---

## 2. Strategy (v_refresh)

### Product in one sentence

Stack is a mobile-first sport nutrition store for the Ukrainian market, built around coaches and gyms who order for their athletes, that turns a confusing catalog into a clear, trusted path from a person's goal to the right products, and keeps regulars stocked with easy reorders.

### Jobs to Be Done

| Priority | Job | Segment |
|----------|-----|---------|
| Primary | When I am a coach ordering for my clients, I want to build multi-client orders in one session with saved client profiles, so that I can serve my athletes reliably and maintain their professional trust. | Coaches, gyms, team managers |
| Secondary | When I want to improve my body or performance but feel overwhelmed and unsafe with the catalog, I want to answer a few plain questions and get a clear, verified product set for my goal, so that I can start confidently. | Non-expert beginners |
| Supporting | When I am running low on my staple products, I want to reorder in one or two taps, so that I never run out. | Experienced regulars |

### Audience Segments

| Segment | Priority | Age | Driver | Pain | Trust Level |
|---------|----------|-----|--------|------|-------------|
| Coaches, gyms, team managers | PRIMARY | 25-45 | Operational efficiency for client ordering | GymBeam B2B is retailer-focused (no client management); belok.ua requires callback; vansiton Coach Account scope unclear [?] | High (domain expert) |
| Non-expert beginners | SECONDARY | 18-35 | Safe, guided first purchase | Overwhelmed by catalog, afraid of wrong/unsafe product | Low to medium |
| Experienced regulars | SUPPORTING/LATER | 22-40 | Never run out, no friction | Re-navigating catalog every time, no reminders | High (already converted) |

### MVP Feature Scope

| Feature | Segment | Priority | Notes |
|---------|---------|----------|-------|
| Coach ordering flow (multi-client cart, saved client profiles, bulk pricing) | Primary | Must have | Differentiates from GymBeam B2B (retailer-focused) and belok.ua (callback form) |
| Goal-to-product quiz / goal selector | Secondary | Must have | Primary activation mechanism; no UA competitor has this |
| Product pages with trust signals (composition, dosage, origin, certification) | All | Must have | Primary conversion barrier; vansiton ISO 22000 is best UA signal seen |
| Catalog with smart goal-based filtering | All | Must have | Supports all segments |
| Reorder / always in stock (email/SMS reminders, one-tap repeat, My Staples) | Supporting | Should have | Free convenience; not a paid tier |
| Standard checkout and account | All | Must have | - |

### Business Model

- Core: margin on product sales
- Coach channel: slightly better pricing (5-10% discount or rebate) is an acquisition investment, not a margin cost
- Reorder: FREE convenience feature in MVP; subscription tier is an open question for Phase 2 - do not hardcode
- Loyalty / bonus (research task, not a settled decision): working hypothesis is a bonus balance earned from purchases plus a cumulative lifetime discount that grows with total spend. Illustrative tiers (owner sketch, UNVALIDATED - needs real margin data [?]): roughly 5K UAH = 5%, 25K = 7%, 50K = 10%. The cumulative structure rewards coaches naturally because their AOV is high. Competitor context: belok.ua (10K/50K UAH, 5%/10% discount), 5lb.ua (three-tier, 3-8% + bonus points balance), GymBeam UA (points, 90-day expiry). See research/competitive-analysis.md v2 and research/strategy.md v2.
- Sources: research/competitive-analysis.md v2, research/strategy.md v2

### Riskiest Assumption

**The switching bet:** coaches, gyms, and fitness professionals - including those already buying from belok.ua, GymBeam UA, mega-mass.ua, or vansiton.ua - will SWITCH to Stack because of a clearly better ordering experience for themselves and their athletes. Experience is the reason to switch. Price is competitive hygiene: Stack must stay within market range so price is not a reason NOT to switch, but low price is not the differentiator.

The coach channel is not an empty niche (competitive analysis v3, 2026-06-14). belok.ua, GymBeam UA, mega-mass.ua, and vansiton.ua all have some form of wholesale or B2B infrastructure. The question has shifted from "will coaches order online?" to "will they switch for a better experience?" If the only reason to switch is price, Stack cannot win - it lacks the purchasing volume to undercut established rivals with more scale. Volume economics (higher turnover compensating for lower per-unit margin) is UNVALIDATED [?]: it depends on purchasing scale and wholesale costs not yet available at launch.

If the experience Stack builds is not meaningfully better than what rivals already offer, the primary JTBD, the 40% GMV coach-channel hypothesis, and the referral flywheel all fail simultaneously. The product becomes a standard B2C store at a scale disadvantage.

Smallest test: qualitative interviews with coaches in two groups - those who already use a wholesale program and those without an established supplier - asking what would realistically make them switch.

See research/strategy.md v3 for full reasoning and discarded alternatives.

---

## 3. AARRR Funnel (v_refresh)

### Funnel Summary

| Stage | Primary Mechanic | Coach Channel Path | Primary Metric | Target [?] | MVP Decision |
|-------|-----------------|-------------------|----------------|------------|--------------|
| Acquisition | Goal-based SEO, coach outreach (Telegram/Instagram), paid social | Direct outreach to gym owners; message: multi-client cart, not bulk retailer | New coach accounts/month | 10 by month 3 [?] | "For Coaches" landing page from day 1; differentiate from GymBeam B2B |
| Activation | Goal quiz completion, first purchase from quiz results | First multi-client order within 7 days of registration | Quiz completion rate | 40% quiz; 60% coach first order in 7 days [?] | Goal quiz is required MVP; ship before catalog breadth |
| Retention | Email/SMS reorder reminders, My Staples list, stock alerts | Coach account reorder; client list management; stock reliability | 30-day repeat purchase rate | 35% [?] | Email reminder is free MVP feature; no subscription |
| Revenue | Margin on sales; coach bulk pricing; quiz upsell | Coach account AOV 3-5x individual buyer | GMV; AOV per segment | 1,200-2,000 UAH individual; 4,000-12,000 UAH coach [?] | Coach pricing tier from launch; even a simple discount code |
| Referral | Coach referral link (athlete arrives pre-trusted) | Coach organic referral to athletes | % new accounts from referral | 20% within 6 months [?] | Organic word-of-mouth in MVP; formal referral links in phase 2 |

All targets marked [?] are hypotheses pending market validation.

---

## 4. Competitors (v_refresh)

### Competitor Groups

**HARD (UA market, same product):** belok.ua, GymBeam UA (gymbeam.ua), bcaa.ua, 5lb.ua, vansiton.ua
**SOFT (different product, same JTBD):** liki24.com, apteka24.ua
**ASPIRATIONAL (behavioral references, not market rivals):** myprotein.com, bulk.com, thorne.com, drinkag1.com, huel.com

### 5-Competitor Matrix

| Competitor | Audience | Product Foundation | Key Mechanism | Trust | Monetization |
|------------|----------|--------------------|---------------|-------|--------------|
| belok.ua (HARD) | All levels; gym-goers; wholesale via callback form | 80+ brands, 2,000+ SKUs, own Sporter brand, 40+ stores | Per-serving cost; 3 goal buckets; cumulative discount; Android app | 7 years on market, 40+ stores, federation partnership; empty certificates page | Margin; wholesale form; Android app |
| GymBeam UA (HARD) | Broad fitness audience; B2B wholesalers; 16 markets | 10,000+ products (own brand + third-party) | Self-service B2B wholesale; largest traffic in UA (2.39M/month) | International brand, EU market presence, 10,000+ product catalog | Margin; B2B wholesale self-service; own-brand manufacturing |
| myprotein.com (ASPIRATIONAL) | All levels globally; male/female paths. UA: local retailers only | Full supply chain; UK+EU manufacturing | 6-goal selector; 210k+ Trustpilot (4.4); Expert Advice hub | BRCGS AA+; Informed Choice/Protein/NSF; "we don't spike protein" | Margin; subscriptions; 5% app discount; trade accounts |
| thorne.com (ASPIRATIONAL) | Health-focused; athletes; healthcare practitioners | 40-year science; 2 labs; Mayo/NIH/Duke | Taia AI advisor; Health Tests (physician-reviewed plans) | NSF+TGA+GRMA; 4 rounds of testing; 40+ active clinical trials | Margin; subscribe-and-save 20%; professional tools |
| liki24.com (SOFT) | Ukrainian health consumers; 1M+ customers | Marketplace; 13,000 pharmacies; 50,000+ products | Symptom-based navigation; price comparison | 1M+ customers; iOS+Android redesigned app | Marketplace margin; cashback; referral |

### 3 Common Patterns

1. Goal navigation is universal, but depth varies 10x. UA stores use static buckets. International leaders use quizzes, AI, and personalized paths.
2. Trust is layered differently by market maturity. UA: physical presence, years operating. International: third-party certifications, clinical partnerships.
3. Reorder is an afterthought in UA, a product feature internationally.

### 3 Key Differences

1. GymBeam has self-service B2B but it is retailer-focused, not coach-focused. No UA competitor has multi-client ordering or saved client profiles.
2. No UA sport nutrition store communicates composition, testing, or origin in depth. Vansiton's ISO 22000:2005 is the closest signal.
3. Mobile is underdeveloped in UA sport nutrition; only belok.ua (Android) and Liki24 (SOFT, iOS+Android) are confirmed.

### Opportunity Gaps

| Gap | Evidence |
|-----|---------|
| Interactive goal-to-product path | No UA sport nutrition store has one. Source: research/competitive-analysis.md v_refresh |
| Multi-client coach ordering with client profiles | GymBeam B2B is retailer-focused; belok.ua requires callback; vansiton scope unclear. Sources: gymbeam.com/content/wholesale, belok.ua/ua/opt/ |
| Smart reorder or consumption-based reminders | Absent from all UA hard competitors. Source: research/competitive-analysis.md v_refresh |
| Third-party quality certification communication | Belok's certificates page is empty. Vansiton mentions ISO 22000 but not on product pages. Source: belok.ua/ua/serteficates/ |
| Per-serving cost display | Only belok.ua confirmed. Source: belok.ua/ua/sportivnoye-pitaniye/protein/ |

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

1. **Goal Selector as primary entry point** (Myprotein + Huel): 4-6 goal tiles as homepage hero. No product knowledge required. Source: us.myprotein.com/c/goal-selector/, huel.com/pages/choose-your-goal
2. **Layered trust signals at product level** (Thorne + Bulk): Composition, dosage, origin, certification above the fold. Source: thorne.com/nsf-certified-for-sport, bulk.com/uk/sports-nutrition/informed-sport
3. **Concern/symptom-based navigation as secondary path** (Liki24): "Not sure what you need?" path. Proven in the Ukrainian market. Source: liki24.com

### 1 Mechanism That Will NOT Work

**Subscription-first purchase model** (AG1/Thorne): Not viable for UA market at MVP stage. Recurring billing trust is not established. Reorder problem solved via email/SMS + one-tap repeat. Source: research/benchmark.md

---

## 6. UX Patterns

### Primary UX Pattern: Goal Selector + Guided Quiz

Homepage entry point is a goal selector (4-6 goal tiles). A secondary "help me choose" path leads to a short guided quiz for buyers who cannot map themselves to a goal. Covers both "I know my goal" and "I don't know where to start."

**3 reasons:**
1. JTBD alignment: goal selector is the shortest validated path from intent to curated products.
2. Audience fit: Ukrainian buyers already use concern-based discovery on Liki24.
3. Competitor gap: no Ukrainian sport nutrition store has an interactive goal path.

### Alternative Under Condition X

If A/B testing shows significant drop-off on goal tiles among "general wellness/energy/recovery" sub-segment, activate concern/symptom navigation as a secondary path labeled "Not sure what you need?" - positioned below goal tiles, not replacing them.

### Pattern That Does NOT Fit

Subscription-first purchase model. See Benchmark Section and Strategy Business Model. Reorder as free convenience is the correct MVP approach.

---

## 7. Conclusions

### Gaps Table

| Gap | Evidence Source | Priority |
|-----|----------------|----------|
| No interactive goal-to-product path in UA sport nutrition | research/competitive-analysis.md v_refresh; all UA hard competitors observed | Critical |
| No multi-client coach tools in UA (self-service, with client profiles) | gymbeam.com/content/wholesale (retailer-focused); belok.ua/ua/opt/ (form/callback); vansiton.ua (scope unclear) | Critical |
| Trust signal communication absent on product pages | belok.ua/ua/serteficates/ (empty); vansiton ISO only at store level, not product level | Critical |
| No smart reorder or consumption reminder in UA | research/competitive-analysis.md v_refresh | Important |
| Mobile UX underdeveloped in UA sport nutrition | Only belok.ua Android confirmed; Liki24 (soft) best mobile reference | Important |
| Per-serving cost not shown universally | Only belok.ua observed | Nice to have |

### 6 Hypotheses (If / Then / Because)

**Hypothesis 2 is the riskiest assumption. Marked with [RISKIEST].**

| # | If | Then | Because |
|---|----|----|---------|
| 1 | If Stack is the first UA sport nutrition store with an interactive goal-to-product quiz | Then it will convert beginners at a significantly higher rate than competitors | Because the primary drop-off for beginners is catalog overwhelm, not price - and no UA competitor addresses this |
| 2 [RISKIEST] | If coaches - including those already buying from belok.ua, GymBeam UA, mega-mass.ua, or vansiton.ua - experience Stack's ordering flow and the guidance it enables for their athletes as meaningfully better than what they currently use, AND Stack's price stays within market range | Then coach accounts will switch to Stack and have a repeat order rate over 80% within 90 days | Because experience, not price, is the switching reason: a coach who finds a tool that makes ordering easier and enables better outcomes for their athletes will not leave it for a marginal price difference from a rival - but if the experience is not clearly better, switching costs alone will keep them where they are |
| 3 | If product pages lead with composition, dosage, and origin signals before price | Then bounce rate on product pages will decrease for first-time visitors | Because the primary exit trigger for beginners is unresolved safety doubt, not price - answering the safety question first breaks the exit loop |
| 4 | If the coach channel generates 40% of GMV within 6 months | Then Stack can offer coach pricing at 5-10% below retail and still improve overall margin vs. a pure B2C model | Because one coach account replaces 10-30 individual customer acquisition costs [?] |
| 5 | If email/SMS consumption reminders are sent 5-7 days before estimated stockout | Then 30-day repeat purchase rate will exceed 35% for the regular buyer segment | Because the primary barrier to reorder is not motivation but timing and friction - reminders remove both [?] |
| 6 | If Stack communicates product origin, composition (per-serving breakdown), and one quality signal on every product page | Then trust signal engagement will correlate with higher add-to-cart rate | Because removing safety doubt is the proximate cause of purchase commitment for the non-expert buyer - all benchmark leaders confirm this |

### Open Questions Table

| Question | Why It Matters | How to Resolve |
|----------|----------------|---------------|
| Are Ukrainian gym coaches primarily reachable digitally (Instagram/Telegram) or through in-person relationships? | Determines coach acquisition channel mix - and whether the coach-as-channel model is viable at all | User interviews with 5-10 coaches; community observation |
| How does GymBeam UA's B2B wholesale perform with Ukrainian coaches in practice - do coaches use it, and is it good enough? | Determines Stack's real differentiation gap in the coach channel | Qualitative research with 5-10 coaches who have tried B2B tools |
| What is the real competitive intensity for goal-based Ukrainian search terms? | Determines SEO vs. paid social mix for beginner acquisition | Keyword research (Ahrefs/Semrush) with UA data |
| Which trust signals resonate most with Ukrainian buyers: certifications, coach endorsements, lab tests, or physical store presence? | Determines product page trust architecture priority | Landing page A/B test or 5-second test with target users |
| What is the actual consumption cycle for common products (whey 2kg, creatine 300g)? | Required for accurate reorder reminders | Product documentation + user interviews |
| What loyalty / bonus structure keeps regulars buying without destroying margin? Cumulative tier discount (belok.ua model) vs. points balance (GymBeam model) vs. a hybrid? | Determines retention mechanic and pricing architecture. Coaches hit high spend thresholds fast - loyalty structure affects coach channel economics. | Unit economics analysis with real margin data [?] + user research on what buyers value most |
| Do goal-based SEO landing pages actually outperform catalog category pages for beginner acquisition in UA? GymBeam has hundreds of blog articles; no competitor runs goal-intent pages. | Determines content and SEO strategy for Phase 2 (Wireframes / site structure). Full SEO plan is deferred. | Keyword research with UA data (Ahrefs/Semrush); traffic and conversion comparison once live |
| What is Stack's viable price positioning given launch-stage volume - and does volume economics (higher turnover per unit compensating for lower per-unit margin) hold at the scale achievable in the first 6-12 months? | Determines whether the coach discount hypothesis (5-10% below retail) is structurally sustainable and whether price-as-hygiene is achievable at launch - or whether margin pressure makes the switching premise fragile. Volume economics is UNVALIDATED [?]. | Unit economics model built from real wholesale cost data obtained during supplier sourcing and technical scoping. Cannot be calculated before supplier negotiations. |

---

## Post-Persona Research, June 2026

Targeted re-research conducted after building personas.md and jtbd.md to close the three most dangerous claim gaps: counterfeit product concern in Ukraine, coach-supplier switching trigger, and coach digital communication channel.

### Finding 1: Counterfeit supplements are a confirmed, active concern in Ukraine - NOT an assumption

**Confirmed.** Two independent lines of evidence:

1. **Law enforcement case (June 2025):** The National Anti-Doping Center of Ukraine reported the "largest underground anabolic steroid manufacturing operation in the country's history." Five individuals charged. Products were "falsely marketed as imported sports supplements for athletes" with counterfeit labels "as if made in Malaysia." 20,000+ packages seized, distribution network active in Kharkiv, Kyiv, Odesa, and Lviv. Source: https://nadc.gov.ua/en/news/disguised-as-sports-supplements-large-scale-illegal-anabolic-steroid-production-uncovered-in-ukraine (June 20, 2025)

2. **Buyer review behavior:** Among 205 reviews on hotline.ua for bcaa.ua, at least one buyer went directly to the manufacturer's office to verify product authenticity before trusting the store. Some GymBeam reviews (vidhuk.ua search results) mention "packaging not matching official packaging from the original manufacturer." Source: https://hotline.ua/ua/yp/26100/reviews/

3. **Editorial confirmation:** A dedicated article titled "Сертифікати якості спортивного харчування: як відрізнити оригінал від підробки" (Quality certificates for sports nutrition: how to distinguish original from fake) was published on bodyforlife.com.ua (now redirected). The topic is actively discussed in the Ukrainian market. Search query: "спортивне харчування Україна відгуки покупців оригінал підробка перевірка," 2026-06-14.

**Impact on personas.md and jtbd.md:** ESJ-3 (Ukrainian buyer skepticism about counterfeits) is now CONFIRMED by evidence, not assumption. The trust architecture must address authenticity explicitly - not as a nice-to-have but as table stakes. Persona 3 (Viktoriia) fear is real; Persona 1 (Olena) also affected - a fake product recommendation from a coach to a client damages professional reputation permanently.

---

### Finding 2: Ukrainian coaches use Instagram and Telegram - but not for structured supplement ordering

**Partially confirmed.** Ukrainian fitness coaches are active on Instagram (mixsport.pro article documented top coaches with active Instagram audiences for workout content, nutrition advice, Q&A in stories). Source: https://mixsport.pro/blog/top-8-instagram-akkauntov-ukrainskih-fitnes-trenerov

Telegram is used for wholesale supplement pricing: at least one channel (@sportiv_admin) explicitly offers "wholesale and trainer pricing" for sport equipment via Telegram. Source: tgstat.com search result, 2026-06-14.

However, no evidence was found of structured supplement ordering from coaches to clients through digital channels. Coach-client supplement communication appears informal (personal recommendations, stories). Structured ordering workflows remain [?].

**Impact:** The "For Coaches" acquisition channel via Instagram/Telegram is supported by digital presence data. The coach client management workflow (whether it replaces or supplements a current digital flow) remains [?].

---

### Finding 3: SN-Import is an additional wholesale channel for coaches - not in previous competitive analysis

**New finding.** SN-Import (snimport.com.ua) explicitly serves "sports trainers and nutritional instructors" for wholesale purchases, alongside fitness centers and gyms. They are an official importer for 30+ brands (NOW Foods, Amix, Nutrend, Optimum Nutrition, Animal, Sporter). They serve as general sponsor of Ukrainian bodybuilding and fitness championships. Source: https://snimport.com.ua/ (visited 2026-06-14)

This means the competitive wholesale landscape for coaches is wider than the 4 retailers profiled (belok.ua, GymBeam, mega-mass.ua, vansiton.ua). Distributors like SN-Import and SPORT-FACTOR (sport-factor.ua) serve coaches directly at wholesale, bypassing retail stores entirely.

**Impact on strategy:** The switching bet now includes not just retail stores' wholesale programs but also distributor relationships. A coach who buys directly from SN-Import or SPORT-FACTOR is not visible in competitive analysis. Stack's "better experience" must also beat the distributor phone/email/Telegram ordering flow, not just the retail B2B forms.

**Implication:** The coach's current supplier may be a distributor (not a store), and the relationship may be long-standing and price-driven (direct import pricing). This makes switching harder, not easier, than the retail comparison assumed.

---

### Finding 4: What makes Ukrainian buyers choose a supplement store

From thepage.ua top 5 stores analysis and belok.ua customer reviews (top20.ua, 59 reviews, 4.0/5.0):

- **Product authenticity** is the #1 trust concern - certificates, official supplier status, lab tests
- **Knowledgeable staff** is a strong differentiator - belok.ua reviews specifically praise "real professional" staff members by name
- **Prices and promotions** are important but secondary to trust
- **Business transparency** - physical address, phone number, return policy
- **No mention of coaching tools, wholesale flow, or B2B experience** in any consumer review or ranking article found

**Gap still open:** What specifically triggers a coach to switch wholesale supplier remains unconfirmed by any cited source. No forum posts, reviews, or interviews with coaches on this topic were found. This is the most dangerous remaining gap.

---

### Finding 5 (CRITICAL): The coach-aggregated-order model is confirmed as a commercial pattern in Ukraine

**Confirmed.** fitness-shop.ua publishes this verbatim: "Якщо ви тренер і маєте групу клієнтів, які бажають замовити спортивне харчування - ви можете зібрати одне загальне замовлення та оформити його у нас." (If you are a trainer with a group of clients who want to order sports nutrition, you can collect one group order and place it with us.) The trainer earns the margin between the wholesale price they pay and the retail price clients pay.
Source: https://fitness-shop.ua/optovyj-prajs-dlja-vykupa (confirmed 2026-06-14)

**Structural implication:** Coaches are RESELLERS, not just bulk buyers. They earn a margin on each client's order. This is an economic incentive structure embedded in the market, not just a convenience. It changes the loyalty model (coaches need a lower wholesale price to maintain their margin, not just a discount), and it changes what "better experience" means - it must protect the coach's margin while reducing the overhead of managing multiple orders.

---

### Finding 6 (CRITICAL): The current coach ordering workflow is entirely analog - Excel price list, email, manager callback

**Confirmed.** The universal B2B ordering process in Ukraine: download Excel price list from supplier → mark quantities → email back to supplier → manager phones to confirm order. No self-service multi-client cart exists anywhere in the publicly visible Ukrainian market. fitness-shop.ua minimum order for wholesale pricing: 5,000 UAH. Sport-Factor sends weekly price lists via Telegram/email after registration.
Sources: https://fitness-shop.ua/optovyj-prajs-dlja-vykupa, https://sport-factor.ua/sportyvne-kharchuvannia-optom/ (2026-06-14)

**Structural implication:** Stack's multi-client cart would not be replacing a competitor's digital tool - it would be replacing an analog, Excel-based workflow. This significantly lowers the switching bar. The comparison is not "Stack vs. GymBeam B2B" but "Stack vs. Excel + email + phone callback." The switching trigger is not "Stack must be better than a competitor's product" but "Stack must be better than a spreadsheet and a phone call."

---

### Finding 7: Wholesale supplier landscape is wider than competitive analysis captured

Eight suppliers were confirmed as explicitly naming coaches as a target segment:

| Supplier | URL | Notes |
|---|---|---|
| fitness-shop.ua | https://fitness-shop.ua/optovyj-prajs-dlja-vykupa | Explicit coach aggregation pitch; Excel price list; min 5K UAH |
| Sport-Factor | https://sport-factor.ua/sportyvne-kharchuvannia-optom/ | Weekly Telegram price list to wholesale clients |
| mega-mass.ua | https://mega-mass.ua/uk/opt/ | 4 customer types: Trainer / Gym Owner / Store Owner / Regular; asks trainers for social media links as identity verification; 72% repeat rate |
| vansiton.ua | https://vansiton.ua/ua/partneram.html | Individual coaches, athletes, teams, federations; phone/email only |
| belok.ua | https://belok.ua/ua/opt/ | "Fitness clubs, personal trainers, online stores"; contact via partner@belok.ua |
| Nutrend Ukraine | https://nutrend.com.ua/spivpratsya/ | "Coaches of sports clubs and sections, sports teams"; 24/7 online catalog; loyalty bonuses |
| GymBeam Ukraine | https://gymbeam.ua/ua/content/b2b/form | Gym/fitness studio/sports club on dropdown; 9,000+ SKUs; terms via email |
| DSN GROUP | https://dsn.ua/ | "Personal trainers, nutritionists"; daily shipments; deposit-based tiered discounts; 23 reviews, 5.0/5 |

No supplier publicly shows pricing or discount percentages. All pricing is gated behind registration + manager contact. This suggests pricing relationships are personal and negotiated, not market-transparent.

**Structural implication for switching bet:** The current relationship between a coach and their supplier is personal and opaque (custom pricing, direct manager contact). This makes switching stickier than a transparent pricing comparison would suggest. Stack's "better experience" must outweigh a personal supplier relationship, not just a price sheet comparison.

---

### Finding 8: Delivery reliability and stock availability are the most praised traits in wholesale supplier reviews

DSN Group (23 verified reviews, 5.0/5.0) reviews consistently praise: fast delivery, reliable stock availability, responsive communication. Sample quotes: "all agreements executed on time" (Михайлов Сергій, Feb 2026), "stable wholesale supplies, stock availability, fast shipping across Ukraine" (Protein-Vitamin, Feb 2026), "easy communication and good price" (Інна Скрипник, Apr 2024).
Source: https://dsn.ua/store-reviews/ (2026-06-14)

Belok.ua has documented counterfeit/authenticity complaint (Елена Андрейченко: "selling non-original product, seal doesn't match original" - specifically about Optimum Nutrition Opti-Men) and delivery failure complaints (multi-day delivery failures). Source: https://hotline.ua/ua/yp/23704/reviews/ (2026-06-14)

**Inferred switching trigger (from supplier positioning + reviews):** Reliability (stock availability + delivery speed) is the most cited reason wholesale buyers praise a supplier. Authenticity/official distributor status is the second signal. Price is the least visible/public factor. This is consistent with the experience-over-price framing in strategy.md v3 but adds a specific dimension: "experience" for a coach means delivery reliability and stock predictability, not just the UI.

---

### Finding 9: Ukrainian digital platform data (2024)

- Telegram: 92% weekly access among Ukrainian internet users; 330M total channel subscriptions. Supplier Telegram channels are broadcast-only (price lists, promotions). Source: nv.ua citing Gradus App research, Sep 2024
- WhatsApp: grew from 30% to 41% of users in 2024. Source: billing.media survey
- Instagram: 12.4M users (2024 Digital report). Top Ukrainian fitness trainers have 784K-24.7M followers. Source: hypeauditor.com/top-instagram-fitness-gym-ukraine/
- No supplement/nutrition content at scale on Instagram - only 1 nutrition account (nutro.bio, 31.4K) appeared in top 20 Ukrainian fitness accounts. Source: hypeauditor.com

---

### Finding 10: Ukrainian fitness industry (pre-war baseline, 2019-2020)

1,419 fitness clubs. 1.2 million gym members. Annual market turnover: $266.6 million. Ukraine was in top 20 European countries by both club count and visitor count. Post-war status is [?] - no 2024-2025 club count or membership data was found publicly.
Source: FitnessConnectUA research cited at sportforall.info (2026-06-14)

---

### Sources Added in Post-Persona Research

- https://nadc.gov.ua/en/news/disguised-as-sports-supplements-large-scale-illegal-anabolic-steroid-production-uncovered-in-ukraine (visited 2026-06-14)
- https://hotline.ua/ua/yp/26100/reviews/ (visited 2026-06-14)
- https://top20.ua/kyiv/sport-krasota/sportivnaya-odezhda-i-inventar/belokua-0.html (visited 2026-06-14)
- https://thepage.ua/ua/news/top-5-magaziniv-sportivnogo-harchuvannya-v-ukrayini (visited 2026-06-14)
- https://mixsport.pro/blog/top-8-instagram-akkauntov-ukrainskih-fitnes-trenerov (visited 2026-06-14)
- https://sport-factor.ua/sportyvne-kharchuvannia-optom/ (visited 2026-06-14)
- https://snimport.com.ua/ (visited 2026-06-14)
- https://horoshop.ua/ua/suppliers/belok/ (visited 2026-06-14)
- https://fitness-shop.ua/optovyj-prajs-dlja-vykupa (visited 2026-06-14)
- https://mega-mass.ua/uk/opt/ (visited 2026-06-14)
- https://mega-mass.ua/uk/o-kompanii/ (visited 2026-06-14)
- https://dsn.ua/ (visited 2026-06-14)
- https://dsn.ua/store-reviews/ (visited 2026-06-14)
- https://gymbeam.ua/ua/content/b2b/form (visited 2026-06-14)
- https://nutrend.com.ua/spivpratsya/ (visited 2026-06-14)
- https://hotline.ua/ua/yp/23704/reviews/ (visited 2026-06-14)
- https://vansiton.ua/ua/reviews_store/ (visited 2026-06-14)
- https://hypeauditor.com/top-instagram-fitness-gym-ukraine/ (visited 2026-06-14)
- https://nv.ua/ukr/ukraine/events/telegram-za-danimi-doslidzhennya-ukrajinci-chitayut-novini-u-socmerezhi-durova-50452249.html (Sep 2024)
- https://business-broker.com.ua/blog/zarplata-fitnes-trenera-v-ukraini-skilky-realno-platiat/ (visited 2026-06-14)
- https://pro-consulting.ua/en/issledovanie-rynka/analiz-rynka-sportivnogo-pitaniya-v-ukraine-2024-god (report exists; content behind paywall)

---

## Sources Index

- https://belok.ua/ua/
- https://belok.ua/ua/opt/
- https://belok.ua/ua/sistema-skidok/
- https://belok.ua/ua/sportivnoye-pitaniye/protein/
- https://belok.ua/ua/serteficates/
- https://play.google.com/store/apps/details?id=starter.belok.client
- https://gymbeam.ua/ua/
- https://gymbeam.com/content/wholesale
- https://en.wikipedia.org/wiki/GymBeam
- https://www.similarweb.com/website/bcaa.ua/competitors/
- https://bcaa.ua/
- https://5lb.ua/ua/
- https://vansiton.ua/en/
- https://liki24.com/
- https://qubstudio.com/blog/internship-ux-improvement-of-liki24/
- https://apps.apple.com/ua/app/liki24-health-and-beauty/id1577477032
- https://www.apteka24.ua/
- https://www.myprotein.com/
- https://www.myprotein.com/c/new-delivery/international-delivery/
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
- https://huel.com/pages/huel-is-now-b-corp-certified
- research/competitive-analysis.md v_refresh
- research/strategy.md
- research/aarrr.md v_refresh
- research/benchmark.md
- research/ux-patterns.md
