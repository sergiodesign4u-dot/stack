# Competitive Analysis

**Version:** v_refresh (2026-06-12)
**Previous version:** v1 (2026-06-10) - initial analysis
**Research method:** Direct site fetch + web search + Playwright screenshots
**All claims cite sources. Unverified data marked [?].**

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| v1 | 2026-06-10 | Initial analysis: 3-group structure, 5-competitor matrix, patterns/gaps |
| v_refresh | 2026-06-12 | Added GymBeam UA (largest traffic in UA, confirmed B2B program); corrected belok.ua age (7 years, not 15); added vansiton.ua Coach Account Program; confirmed MyProtein direct shipping to UA is suspended; deepened belok.ua wholesale findings; refreshed comparison matrix |

---

## Competitor Groups

### Group 1: HARD Competitors

Same product, same audience, same market - Ukrainian sport nutrition e-commerce stores. Max 5.

| Name | Type | Why in this group | What to study |
|------|------|-------------------|---------------|
| belok.ua | Ukrainian sport nutrition e-commerce | Owner's primary reference competitor; 2.345M monthly visits (Similarweb Sep 2024); 40+ physical stores | Wholesale/coach sign-up form, discount system, per-serving price display, goal navigation, 7-year market position |
| GymBeam UA (gymbeam.ua) | International sport nutrition brand with strong UA presence | Largest traffic in UA market (2.39M monthly visits); self-service B2B wholesale program; 10,000+ SKUs | B2B wholesale self-service flow (contrast with belok.ua form-only), product breadth, goal navigation, UA-specific positioning |
| bcaa.ua | Ukrainian sport nutrition e-commerce, Kyiv | 3 physical stores in Kyiv; named athlete endorsements; high review volume | Athlete endorsement model, goal navigation, loyalty program mechanics |
| 5lb.ua | Ukrainian sport nutrition, Dnipro-based | 50+ brands, physical retail presence, loyalty/bonus mechanics | Loyalty/bonus program, brand breadth, multi-city presence |
| vansiton.ua | Ukrainian own-brand manufacturer, sport nutrition store | Own production since 1993, ISO 22000:2005 certified, Coach Account Program; 150+ own-brand SKUs | Coach account model (another UA competitor with coach tools), manufacturing trust signals, ISO certification display |

**Special focus: belok.ua**

Belok.ua is the owner's primary reference and the only UA hard competitor with an explicit coach/wholesale program publicly accessible. Key facts:
- 80+ brands, 2,000+ SKUs, 40+ physical stores across Ukraine
- Market position: 7 years (established 2019; site states "7 років на ринку"). Previous analysis incorrectly stated 15 years - corrected here.
- Goal navigation: 3 buckets (Набрати масу / Спалити жир / Вітаміни та здоров'я)
- Discount system: "Flexible discount system" - negotiated per partner, not a published tier. Form-based sign-up requires callback.
- Wholesale program (belok.ua/ua/opt/): form collects company name, contact, business type (nutrition store, fitness club, personal trainer, or other), city, and expected monthly volume. No self-service ordering. Partner email: partner@belok.ua. Emphasizes "flexible discounts" and "individual approach" - terms not published.
- Trust signals: physical presence, partnership with Ukrainian bodybuilding federations, Android app (confirmed on Play Store)
- Certificates page (belok.ua/ua/serteficates/) is empty - a notable gap
- Source: direct site fetch 2026-06-12

---

### Group 2: SOFT Competitors

Different product, same JTBD - trusted guidance through a complex health catalog and easy reorder. Max 5.

| Name | Type | Why in this group | What to study |
|------|------|-------------------|---------------|
| liki24.com | Ukrainian online health marketplace | Same JTBD - guided selection in an overwhelming health catalog; symptom-based navigation; 1M+ customers | Symptom-based navigation (strongest goal-to-product model in UA market), cashback program, iOS+Android app UX |
| apteka24.ua | Ukrainian online pharmacy | Same JTBD - trusted, expert-guided health product selection; pharmacist consultation model | Pharmacist consultation layer, E-A-T content strategy, search by active substance |

Note: only 2 SOFT competitors met the criteria with verifiable public evidence. No coach or team supply tools found in the UA market that qualify. If fitfood-type meal delivery stores exist in UA, they serve a different JTBD (food preparation, not sport supplements) and do not belong in this group.

---

### Group 3: ASPIRATIONAL Competitors (Behavioral References Only)

International best-in-class players. Studied for how they solve goal-to-product guidance, trust, and reorder. Not market rivals. Max 5.

| Name | Type | Why in this group | What to study |
|------|------|-------------------|---------------|
| myprotein.com | World's largest online sports nutrition brand | Best-in-class goal navigation, certification communication, scale social proof. Note: direct shipping to Ukraine currently suspended - products reach UA via local distributors only | 6-goal selector, Informed Sport/Choice/Protein, 210k+ Trustpilot reviews (4.4), mobile app mechanics |
| bulk.com | Major European sport nutrition brand | Best-in-class Informed Sport integration, batch-level transparency, subscription model | 4-goal homepage navigation, 149 Informed Sport certified products, Bulk Boost membership |
| thorne.com | Premium US supplement brand, clinical positioning | Gold standard for trust-through-science, AI-powered goal guidance | Taia AI advisor, 4-rounds-of-testing communication, NSF+TGA+GRMA certifications |
| drinkag1.com | Single-product supplement brand | Best-in-class simplicity and subscription mechanics, expert endorsement architecture | Single-product trust architecture, 90-day guarantee, NSF certification, subscription as primary purchase path |
| huel.com | Complete nutrition brand | Best-in-class quiz and goal-based navigation, B Corp trust signal | "Which Huel is right for you?" quiz, Choose Your Goal 4-goal page, B Corp (92.1 score) |

---

## Comparison Matrix: 5 Most Relevant Competitors

| Competitor | Audience | Product Foundation | Key Mechanism | Trust | Monetization |
|------------|----------|--------------------|---------------|-------|--------------|
| **belok.ua** (HARD) | All levels; gym-goers primarily; wholesale/coach via buried form | 80+ brands, 2,000+ SKUs, own Sporter brand, 40+ physical stores | Per-serving cost display; cumulative discount system; 3-goal navigation buckets; Android app | 7 years on market, 40+ stores, federation partnership; empty certificates page | Margin on sales; wholesale form for coaches/gyms/trainers (no self-service) |
| **GymBeam UA** (HARD) | Broad fitness audience; 16 markets including UA; B2B wholesalers via self-service | 10,000+ products (own brand + third-party); spans supplements, apparel, healthy food | Self-service B2B wholesale (register, activate, shop - no form/callback); 2.39M monthly UA visits | International brand, large product catalog, EU market presence | Margin; B2B wholesale self-service; own-brand manufacturing margins |
| **myprotein.com** (ASPIRATIONAL) | All levels globally; male/female paths; trade accounts. UA: products via local retailers only, no direct shipping | Full supply chain; UK+EU manufacturing; Informed Choice/Protein/NSF | 6-goal selector; Expert Advice hub; gender-specific paths; 210k+ Trustpilot (4.4) | BRCGS AA+; Informed Choice/Protein/NSF; "we don't spike protein" anti-fraud claim | Margin; subscriptions; 5% mobile app discount; trade accounts |
| **thorne.com** (ASPIRATIONAL) | Health-focused; athletes; healthcare practitioners | 40+ years science; 2 in-house labs; Mayo Clinic/NIH/Duke partnerships | Taia AI advisor; Health Tests (physician-reviewed plans); "Take 5 Daily" curated stack | NSF+TGA+GRMA; 4 rounds of testing; 40+ active clinical trials | Margin; subscribe-and-save 20% + free shipping; practitioner professional tools |
| **liki24.com** (SOFT) | Ukrainian health consumers; 1M+ customers | Marketplace; 13,000 pharmacies; 50,000+ products | Symptom-based navigation - strongest goal-to-product model in UA market; price comparison across pharmacies | 1M+ customers; iOS+Android app (Qubstudio-redesigned); EU market recognition | Marketplace margin; cashback program; referral (up to 200 UAH/invitee) |

---

## Patterns, Differences, and Gaps

### 3 Common Patterns (across all groups)

1. **Goal buckets are universal, but depth varies by a factor of 10.** Every competitor from belok.ua to Huel uses goal-based navigation. UA stores use 3-5 static goal categories. International aspirational players use interactive quizzes, AI advisors, and gender-specific paths. The mechanism is the same; the execution gap is enormous.

2. **Trust is built differently at different market maturities.** UA stores rely on physical presence, years of operation, and "100% original" claims. International leaders rely on third-party certifications (NSF, Informed Sport, BRCGS), clinical partnerships, and volume social proof. Stack needs to bridge both registers for the UA market.

3. **Reorder is an afterthought in Ukraine, a product feature internationally.** Belok has a cumulative discount system. GymBeam has a B2B self-service flow. But MyProtein, Bulk, Thorne, and Huel all have structured subscription models with explicit savings (20%+ off). The "never run out" job is clearly unmet in the UA consumer market.

### 3 Key Differences

1. **GymBeam has self-service B2B wholesale; belok.ua uses a callback form. Neither treats the coach as a community or a primary front-of-site identity.** GymBeam's B2B is positioned as a retailer/distributor program - not a coach-specific tool. Belok's form requires a phone callback. No UA competitor has a self-service coach account with client management. The gap is structural, not just a feature.

2. **No Ukrainian sport nutrition store communicates composition, dosage, or testing in depth.** Vansiton mentions ISO 22000:2005 - the strongest quality signal seen in UA. But no store communicates ingredient sourcing, lab testing, or per-serving breakdown at the level of Thorne (4 rounds of testing), Bulk (Informed Sport batch-level), or Huel (100+ peer-reviewed studies). The trust vocabulary gap is the largest observed.

3. **Mobile is underdeveloped in UA sport nutrition.** Only belok.ua has a confirmed Android app. Liki24 (SOFT) has a full iOS+Android redesigned app. GymBeam operates multi-platform internationally but UA-specific app status is [?]. No UA sport nutrition store has a confirmed iOS app.

### What is Missing Across All (Our Opportunity Gap)

- **A real interactive goal-to-product path for the Ukrainian market.** The best UA store (belok.ua) offers 3 static goal buckets. GymBeam UA appears to use static categories as well [?]. No quiz, no personalization, no conversational guidance exists in UA sport nutrition.
- **Coach ordering as a front-of-site, community-centered feature.** GymBeam has self-service B2B (retailer-focused). Belok has a wholesale form. Vansiton has a Coach Account (scope unclear). No competitor treats the coach as a channel with their own landing page, client management tools, and community identity.
- **Subscription or smart reorder for consumers.** Completely absent from all UA hard competitors. Liki24 (SOFT) has a loyalty cashback; no UA sport nutrition store has reminders or smart reorder.
- **Third-party quality certification communication.** Vansiton mentions ISO 22000:2005. Belok's certificates page is empty. No UA store explains testing, sourcing, or manufacturing at depth.
- **Per-serving cost display.** Belok does this. GymBeam does not appear to (based on public pages [?]). Other UA competitors do not. A foundational UX feature worth matching.

### 3 Open Questions

1. How does GymBeam UA's B2B wholesale program actually perform with Ukrainian coaches and gym managers? If coaches already use it for bulk supply, Stack's coach channel must offer meaningfully more (client management, multi-client ordering) to displace it.
2. Does vansiton.ua's "Coach Account Program" have active users, and what does it offer? If it is a real self-service tool, it narrows Stack's coach-channel differentiation gap.
3. Do Ukrainian buyers respond to international quality certifications (NSF, Informed Sport) or do they require Ukrainian/EU-specific signals? The market is still developing trust vocabulary, and belok.ua's empty certificates page suggests local stores have not tested this yet.

---

## Screens Captured

- `research/screens/belok-ua-homepage.png` - belok.ua homepage
- `research/screens/belok-ua-protein-category.png` - belok.ua protein category with filters and per-serving cost
- `research/screens/belok-ua-wholesale.png` - belok.ua wholesale/coach sign-up form at /opt/
- `research/screens/protein-kiev-ua-homepage.png` - protein.kiev.ua (proteininkiev.com) homepage
- `research/screens/bcaa-ua-homepage.png` - bcaa.ua homepage with athlete testimonials
- `research/screens/liki24-homepage.png` - liki24.com homepage with symptom-based navigation
- `research/screens/myprotein-homepage.png` - myprotein.com homepage
- `research/screens/myprotein-goal-selector.png` - myprotein.com goal selector page
- `research/screens/thorne-homepage.png` - thorne.com homepage
- `research/screens/thorne-taia-advisor.png` - thorne.com Taia AI advisor page
- `research/screens/huel-homepage.png` - huel.com homepage
- `research/screens/huel-goal-selector.png` - huel.com "Choose Your Goal" page
- `research/screens/bulk-homepage.png` - bulk.com homepage

---

## Sources

- https://belok.ua/ua/
- https://belok.ua/ua/opt/
- https://belok.ua/ua/sistema-skidok/
- https://belok.ua/ua/sportivnoye-pitaniye/protein/
- https://belok.ua/ua/serteficates/
- https://play.google.com/store/apps/details?id=starter.belok.client
- https://gymbeam.ua/ua/
- https://gymbeam.com/content/wholesale
- https://gymbeam.com/b2b/form
- https://en.wikipedia.org/wiki/GymBeam
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
- https://www.similarweb.com/website/bcaa.ua/competitors/
- https://uba.top/sports-nutrition-stores-in-ukraine/
