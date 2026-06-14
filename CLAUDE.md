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

**Full SEO plan (deferred to Wireframes / site structure phase):**
Page-level H1 / H2 structure, meta titles and descriptions, image alt text, human-quality SEO copy, semantic optimization, goal-based landing page architecture, keyword-to-URL mapping. Belongs to Phase 2 (Wireframes). Do not design or commit URL structures without this plan.

**Operational catalog population (deferred to technical scoping with real supplier data):**
Sourcing agreements with Ukrainian distributors and brands, structured data format for product descriptions and images, processes for keeping prices and stock levels current, handling out-of-stock and back-in-stock states. This is an operational and sourcing challenge that design research cannot resolve. It will be handled with real supplier data in the technical scoping phase.

---

## Timeline (Hypothesis)

| Phase | Focus | Status |
|-------|-------|--------|
| Phase 1 | Research (this phase) | In Progress |
| Phase 2 | Wireframes | Not started |
| Phase 3 | Concept & Visual Direction | Not started |
| Phase 4 | Design System & Tokens | Not started |
| Phase 5 | Component Library | Not started |
| Phase 6 | Handoff | Not started |
