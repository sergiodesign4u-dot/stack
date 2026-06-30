# Stack - Product Brief

## What it is

Stack is a mobile-first sport nutrition e-commerce store for the Ukrainian market. The platform turns a confusing product catalog into a clear, trusted path from a person's goal to the right products. It is built around the coach-ordering channel as its primary business model: coaches and gyms place bulk orders for their athletes, while individual beginners and regulars are served as secondary audiences.

Platform: mobile-first responsive web, scaling up to desktop. Native app is a later-stage decision, out of scope for MVP.

Core differentiator: a trusted, guided path from "I want to achieve X" to "here is the safe, right product set for you," delivered through the coach as the primary trusted intermediary, and through transparent product information (composition, dosage, origin, certification) for the self-guided buyer.

---

## Jobs To Be Done (JTBD)

### Candidate jobs scored

| # | Job | Frequency | Intensity | Willingness to Pay | Score |
|---|-----|-----------|-----------|-------------------|-------|
| 1 | Coach/gym: order the right products for multiple clients in one session | High | High | High | Primary |
| 2 | Beginner: turn my vague fitness goal into a safe, understandable product set | High | Very High | Medium-High | Secondary |
| 3 | Regular: restock the products I always buy without thinking about it | Very High | Medium | Medium | Secondary |
| 4 | Buyer: verify that a product is safe, certified, and correctly dosed | High | High | Low (table stakes) | Supporting |
| 5 | Athlete: get bulk pricing and reliable supply through my coach | Medium | High | High | Supporting |
| 6 | Explorer: discover new products relevant to my current training phase | Low | Medium | Low | Later |

### Selected jobs

**Primary:**
When I am a coach or gym manager ordering supplements for my clients, I want to quickly build orders for multiple people with different goals and dosages, so that I can serve my athletes reliably and maintain their trust in my recommendations.

**Secondary 1:**
When I am a beginner who wants to improve my body or performance but feels overwhelmed by the catalog, I want to answer a few simple questions and get a clear, safe, credible product set for my goal, so that I can start confidently without needing to research everything myself.

**Secondary 2:**
When I am a regular buyer running low on my staple products, I want to reorder in one or two taps without rediscovering what I need, so that I never run out and don't waste time on repeat decisions.

---

## Target Audience

### Primary: Athletes, Gyms, and Coaches (ordering through the coach for clients)

- **Profile:** Professional and semi-professional coaches, gym owners, and team managers aged 25-45. They purchase for 5-30+ athletes at a time. They know their products well, value reliability and competitive pricing, and act as a trust proxy for their clients.
- **Trust level:** High (domain experts). They don't need guidance on what products are - they need speed, bulk ordering, and account management.
- **Primary driver:** Operational efficiency. One session to order for all clients, clear pricing for resale or cost-sharing, reliable stock and delivery.
- **Pain:** Current stores are built for solo B2C buyers. Ordering for multiple people with different needs is slow, error-prone, and requires workarounds.

### Secondary: Non-Expert Beginners (needing guidance)

- **Profile:** People aged 18-35 starting a fitness journey or trying to improve a specific outcome (fat loss, muscle gain, energy, recovery). No or minimal prior knowledge of sport nutrition. Often referred by a coach or found the store via social.
- **Trust level:** Low to medium. Easily overwhelmed, afraid of side effects, uncertain about dosage. Safety and credibility signals are critical.
- **Primary driver:** Confidence and clarity. "Tell me what is safe and right for my goal."
- **Pain:** Huge catalog, unfamiliar terminology, fear of buying the wrong or unsafe product, no trusted source to check.

### Supporting: Regulars ("Always in Stock")

- **Profile:** Experienced buyers aged 22-40 who already know exactly what they want and order the same 2-5 products repeatedly. Time-poor, habit-driven.
- **Trust level:** High. Already converted and loyal. Do not need discovery or guidance.
- **Primary driver:** Convenience and reliability. One-tap reorder, stock alerts, never running out.
- **Pain:** Having to re-navigate the catalog every time, out-of-stock situations, no reminder system.

---

## MVP Feature Scope

### In scope

1. **Coach ordering flow** - Multi-client cart: a coach can build separate orders or a combined order for multiple clients in one session. Account management for saved client profiles (basic). Bulk pricing or coach discount tier.
2. **Goal-to-product guidance** - A lightweight guided quiz (3-5 questions: goal, experience, constraints) that outputs a curated safe product set with clear composition and dosage info. No account required for the quiz.
3. **Product pages with trust signals** - Composition breakdown, dosage instructions, origin and certification information, user reviews. Clear, plain language.
4. **Catalog with smart filtering** - Filter by goal, category, brand, price. Mobile-first navigation.
5. **Reorder / always in stock** - On mobile web: one-tap repeat order from order history, email or SMS low-stock reminders, saved product lists. This is a free convenience feature in the MVP, not a paid tier.
6. **Checkout and basic account** - Standard e-commerce checkout. Account for order history, saved addresses, saved cart.

### Out of scope for MVP

- Native iOS/Android app (later-stage decision)
- Paid subscription tier (open question for a later phase, do not hardcode)
- Loyalty points or gamification
- Live chat / coach consulting
- Custom formulation or private label

### Reorder on web (scoping note)

The reorder / "always in stock" idea is natively stronger as a native app feature (push notifications, lock screen widgets). On mobile-first web in the MVP, it works as: email or SMS reminders triggered by estimated consumption rate, a saved "my staples" list in the account, and one-tap repeat order from order history. This is sufficient for MVP and does not require a native app.

---

## Business Model Hypothesis

- **Core:** Margin on sales. Standard e-commerce model. No SaaS or subscription required to buy.
- **Retention driver:** Reorder mechanics (free convenience) keep regulars on the platform and reduce churn to competitors.
- **Coach channel value:** Coaches bring multiple repeat customers. A coach account with slightly better pricing or a rebate mechanism is a high-leverage acquisition and retention tool.
- **Paid subscription tier:** Open question for a later phase. Do not hardcode. Possible future value: priority stock alerts, deeper analytics for coaches, exclusive products. Not a committed MVP feature.

---

## Geography

Ukraine only. Foreign stores (MyProtein, Bulk, Thorne, etc.) are behavioral references for how best-in-class players solve buyer pains and build guidance - they are NOT market competitors. The relevant market is Ukrainian sport nutrition retail.

---

## Design Principles

1. **Trust first, then sell.** Every page must first reduce doubt, then invite action. Composition, dosage, origin, and certification are not secondary details - they are the lead.
2. **One clear next step.** The user should never face a blank stare. From goal quiz to product page to cart, there is always one obvious action.
3. **The coach is a channel, not an edge case.** The ordering interface must work for a coach managing multiple clients without friction. This is not a hidden power-user feature.
4. **Calm and confident.** Visual tone is clean, unhurried, and professional. No noise, no countdown timers, no anxiety-inducing popups. Sport nutrition is serious for people who take it seriously.
5. **Plain language, deep information.** Labels and navigation use everyday words. Product detail pages can go deep, but lead with the simple answer.

---

## Tech Stack Hypothesis

- **Frontend:** Next.js (React) with TypeScript - mobile-first responsive web, SSR/SSG for performance and SEO
- **Styling:** Tailwind CSS - rapid, consistent design system implementation
- **Backend / API:** Node.js with a headless commerce layer (e.g. Medusa.js or Shopify Hydrogen / Headless) or a custom REST/GraphQL API
- **Database:** PostgreSQL for structured product and order data
- **CMS:** Contentful or Sanity for product descriptions and editorial content
- **Auth:** NextAuth.js or Supabase Auth
- **Payments:** LiqPay or Wayforpay (Ukrainian payment processors), card and Apple/Google Pay
- **Notifications:** Email via SendGrid or Postmark; SMS via Twilio or a Ukrainian SMS gateway for reorder reminders
- **Hosting:** Vercel (frontend) + Railway or Render (backend/DB)
- **Analytics:** Mixpanel or PostHog for product analytics
- Note: this is a hypothesis, to be validated during the technical scoping phase.

### E-commerce Platform Direction (HYPOTHESIS - not a decision)

Two directions exist for a UA sport nutrition store at this scale. Neither is committed. This is a scoping question for the technical phase.

**Direction A: Ready-made platform (e.g. Shopify, Medusa.js, Saleor)**
- Faster to launch. Built-in checkout, payments, order management, inventory, and discount logic.
- Tradeoffs: customization constraints (coach multi-client cart is non-standard); per-transaction fees on Shopify; may require significant theme work for a custom mobile-first experience.
- Relevant for a UA store: Shopify has LiqPay and Wayforpay payment integrations available via third-party apps. Medusa.js is open-source and more customizable.

**Direction B: Custom build (Next.js frontend + custom API + PostgreSQL)**
- Full control over coach ordering flow, product page layout, loyalty logic, and SEO structure.
- Tradeoffs: significantly more development time and operational overhead; no built-in order management.
- Relevant for a UA store: the coach multi-client cart and goal quiz are non-standard enough that a custom build may be more practical than adapting a platform.

**Recommendation to validate in technical scoping:** Assess whether the coach ordering flow (multi-client cart, saved client profiles, bulk pricing) can be built on a ready-made platform without unacceptable tradeoffs. If yes, a hybrid approach (Medusa.js or Shopify headless + custom coach layer) is likely faster to market than a full custom build.

### Catalog Source and Freshness (HYPOTHESIS - open questions)

Where product data would come from and how stock and prices stay current are unresolved operational questions. Design research cannot answer them alone.

**Possible sources (hypothesis):**
- Distributor price lists and feeds: most Ukrainian sport nutrition distributors provide Excel or CSV price lists. Whether any provide structured API feeds is [?].
- Supplier direct feeds: individual brand suppliers (e.g. own-brand manufacturers) may provide structured data. Format and reliability are [?].
- Manual entry: feasible for a small initial catalog (100-300 SKUs), but does not scale to 1,000+ SKUs without a real data pipeline.

**Open question - catalog population at scale (operational, not a design question):**
Populating the store with 500-2,000+ products requires: sourcing agreements with distributors or brands, a structured data format for product descriptions and images, a process for keeping prices and stock levels current (potentially near-real-time for popular SKUs), and a system for handling out-of-stock and back-in-stock states. This is an operational and sourcing challenge that design research cannot resolve. It requires real conversations with Ukrainian distributors and suppliers, actual price list formats, and a data operations plan. It is noted here as an open question so it is not forgotten, but it will not be answered by the research phase. Mark as [?] until technical scoping with real supplier data.

---

## Deferred to Later Phases

These topics were identified during research but are NOT built, designed, or decided in the research phase. They are noted here so they are not forgotten.

**Full SEO plan (PULLED FORWARD into the page-level IA, June 2026 — no longer deferred):**
Page-level H1 / H2 structure, meta titles and descriptions, URL slugs, breadcrumbs, SEO-copy intent, dynamic variables (e.g. city: "Протеїн Одеса"), goal-based landing architecture, keyword-to-URL mapping. Previously deferred to Phase 2; now baked into each page's IA spec *before* wireframes so wireframes land on a finished SEO structure. Human-quality final SEO copy and image alt text are still produced later, but the structure is decided in the IA layer.

**Operational catalog population (deferred to technical scoping with real supplier data):**
Sourcing agreements with Ukrainian distributors and brands, structured data format for product descriptions and images, processes for keeping prices and stock levels current, handling out-of-stock and back-in-stock states. This is an operational and sourcing challenge that design research cannot resolve. It will be handled with real supplier data in the technical scoping phase.

---

## Research Phase Output (Phase 1 complete, June 2026)

**Live pages (GitHub Pages, Ukrainian)** — now in `research/`:
- research/research.html - competitive analysis, benchmark, UX patterns, AARRR, Lean UX Canvas, strategy
- research/personas.html - 4 personas (Olena primary coach, Dmytro new coach, Viktoriia beginner, Andriy regular)
- research/jtbd.html - JTBD hierarchy, matrix, critique and danger list
- research/concept.html - conceptual architecture (was ia.html): jobs/persona-driven sitemap clusters, 5 user flows, traceability matrix, navigation. Renamed to distinguish it from the detailed page-level IA in `ia/`.

**Locked research files — SOURCE OF TRUTH in `research/docs/`** (markdown; the `research/*.html` pages above are the rendered Ukrainian summaries):
- research/docs/master-research.md v5 - single source of truth
- research/docs/strategy.md v5 - product decisions locked (4 decisions); riskiest assumption updated after founder coach interviews
- research/docs/personas.md v1.2 - people observations and 4 personas
- research/docs/jtbd.md v1.2 - JTBD set (now incl. Job 6 loyalty retention), matrix, critique
- research/docs/sitemap.md v0.6 - IA: entities, screens, navigation, traceability matrix
- research/docs/flows.md v0.3 - 5 user flows (Mermaid)

**4 product decisions locked:**
1. Coach ordering (MVP): saved client list + per-client order tagging + order history per client
2. Goal guidance (MVP): 4-6 goal tiles; guided quiz post-launch
3. Pricing structure: separate published coach tier + cumulative individual loyalty (specific numbers [?])
4. Reorder (MVP): one-tap repeat from order history; My Staples post-launch

**All numbers that require real data remain [?]**: coach tier %, loyalty thresholds, consumption cycles, AOV.

**Strategy v5 update (founder coach interviews, June 2026, field research):** price and reseller margin are a PRIMARY switching driver and a gate, not only competitive hygiene. A workable wholesale price is the precondition for a coach to consider Stack at all; among price-acceptable suppliers, the ordering experience (multi-client flow, transparent pricing, reliable delivery, goal-based selection) is the differentiator that wins and retains. Stack must be both competitive on price (pass the gate) and better on experience (win beyond it). Whether Stack can meet a coach-acceptable price at launch volume remains [?]. This supersedes the earlier "experience is the reason to switch, price is hygiene" framing.

---

## Conceptual Architecture — global layer (Phase 2 prep, June 2026)

This jobs/persona-driven layer was built and audited across two critique rounds (zero defects: no orphan screens, no orphan jobs, no marked-but-unflowed or flowed-but-unmarked cells). Live page: research/concept.html (renamed from ia.html — see the detailed page-level IA below for the "real" information architecture). Sources: research/docs/sitemap.md v0.6, research/docs/flows.md v0.3.

**Sitemap - 19 MVP screens in 5 clusters (by human intent):**
- A. Find: Home / goal selector, Goal Collection, Catalog and search, Product detail
- B. Buy: Cart, Checkout, Order placed confirmation
- C. Coach workspace: For Coaches page + published pricing, Coach sign-up + social-link verify, Coach account home, Client list, Client profile, Multi-client order session
- D. Reorder: Order history, Order detail + Repeat order
- E. Account and loyalty: Sign in / register, Buyer account home, Loyalty status, Saved addresses

**Coach main flow (Main JTBD, Decision 1):** Coach account home -> Multi-client order session -> per-client loop (select or add client, in-session quick-add, stock and coach-tier price checks, tag to client) -> Cart (per-client grouping) -> Checkout -> Order placed confirmation. The coach adds products via in-session quick-add, not the global Search.

**Global navigation - 5 entries:** Home / goal selector (beginner front door), For Coaches -> Coach account home (coach front door), Search (buyer utility for known products), Cart, Account. Two separate front doors so coach and beginner never block each other.

**Depth to main job:** coach 8 taps for a 2-client order (deep by nature, a bulk work flow, not flattened); beginner 2 taps to the product under a goal (6 taps to first purchase).

**5 user flows** drawn with decisions, states and dead ends: Main (coach), Job 2 (beginner goal-to-product), Job 3 (safety verification), Job 4 (one-tap reorder), Job 6 (loyalty review).

Wireframes (Phase 2) not started; this IA is its input.

---

## Information Architecture v2 — Detailed / page-level (Phase 2 prep, June 2026)

The conceptual architecture above is the **global layer** (sitemap clusters, navigation,
user flows, traceability) — jobs/persona-driven, intentionally a skeleton, now titled
**«Концептуальна архітектура»** (`research/concept.html`). Before wireframes we add the
**page-level layer** — the actual, full information architecture: what each page contains,
its states, components, filters, and SEO. This is the **«Інформаційна архітектура»**
section in the unified left-sidebar navigation. Each page-level node is delivered as an
md source of truth (`ia/docs/pages/`) plus a reviewable HTML visual (`ia/*.html`), and is
listed in the sidebar (Карта сайту → Навігація → Футер → Головна → …). Method and reusable
templates are documented in `playbook/design-ia-playbook.md`.

**Platform stance:** mobile-first, **fully responsive** (desktop↔mobile, mobile is the
priority). Block priority and the first screen are reasoned from mobile; the desktop
layout is still designed deliberately (it is a store).

**Two IA layers:**
- *Conceptual / global IA* — in `research/` («Концептуальна архітектура»,
  `research/concept.html`, `research/docs/sitemap.md` v0.6, `research/docs/flows.md` v0.3).
- *Page-level IA* — «Інформаційна архітектура», in `ia/`. Source of truth: `ia/docs/`.
  Per-page specs live in `ia/docs/pages/`: `navigation.md` = header (meta bar + main bar +
  Belok-style mega-menu) + mobile tabs (node 0.1; 360px baseline; B/W mockups); `catalog.md`
  = the **store taxonomy** (cluster 2): 12 top categories (rebalanced from 14; «Здоров'я» is
  an umbrella with ~10 subcategories incl. men's/women's health) → subcategories → types,
  6 goals as cross-cutting collections (MVP: Набір маси · Схуднення · Відновлення · Енергія ·
  Імунітет · Витривалість), facets; built from real UA catalogs (Belok-based). Full breadth
  ships, rebalanced; catalog population at scale stays the operational [?]. The full sitemap is
  `ia/docs/sitemap.md` / `ia/sitemap.html`.

**Unified navigation:** all docs pages (research, personas, jtbd, concept, and every
page-level IA page) share one left sidebar. Group order: Дослідження · Персони · JTBD ·
Концептуальна архітектура — then the «Інформаційна архітектура» group (Карта сайту, Навігація,
and subsequent per-page nodes). The old per-page topbar on `ia/sitemap.html` was replaced
with this sidebar.

**Artifact format:** Sitemap + IA as numbered cards (`X.Y`, X = flow cluster) with an
INCLUDES list and flow arrows; dialogs and states are first-class nodes. Reference
example: `research/sitemap png example/`. Delivered as **two artifacts** — a lean
schema (structure + transitions) and full per-page specs.

**Locked sub-decisions (June 2026):**
1. Coach model stays **coach-as-buyer** (multi-client ordering), NOT a coach
   marketplace/directory. Coach consulting/consultation remains out of MVP scope.
2. Sitemap and page-level IA are **two separate artifacts**.
3. **JTBD is not changed** — filters, facets, and symptom/concern search are IA
   mechanisms serving existing jobs, not new jobs.
4. **SEO is pulled forward** into the page-level IA (see Deferred section update above).
5. **Auth model (confirmed):** one unified sign in / sign up for every role, as dialogs
   (no full-page redirect, no separate coach login, no role tabs). Coach is a **role
   activated on an existing account** via a verification flow reachable from both the
   For-Coaches landing CTA and an account section, so coaches never hunt for a login.
   Coach tiering is being explored as **Free vs Pro** (HYPOTHESIS, numbers [?]): Free =
   better-than-retail wholesale + multi-client capped at 2-3 clients, activated instantly;
   Pro = max wholesale price + unlimited multi-client, paid subscription (~99 UAH/mo
   hypothesis, needs unit-economics). This activates the brief's deferred "paid
   subscription tier" — keep as hypothesis, not committed. Watch the strategy-v5 tension:
   the Free price must still pass the coach "price gate", or acquisition suffers; the
   primary persona (5-30+ athletes) effectively needs Pro, so coach monetization =
   Pro subscription + product margin.

**Sequence:** (1) full sitemap → (2) inherited component library → (3) page-level IA per
cluster. Output is the "wireframe library" that Phase 2 renders.

---

## Timeline (Hypothesis)

| Phase | Focus | Status |
|-------|-------|--------|
| Phase 1 | Research (this phase) | Done |
| Phase 2 | Wireframes | Not started. Detailed IA in progress (page-level layer in `ia/`; global layer done in `research/`) |
| Phase 3 | Concept & Visual Direction | Not started |
| Phase 4 | Design System & Tokens | Not started |
| Phase 5 | Component Library | Not started |
| Phase 6 | Handoff | Not started |
