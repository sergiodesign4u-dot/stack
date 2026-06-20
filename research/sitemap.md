# Sitemap

**Product:** Stack - mobile-first sport nutrition e-commerce, Ukraine
**Version:** v0.1 (2026-06-20)
**Language:** English (markdown research file)
**Depends on:** research/jtbd.md v1.1, research/strategy.md v4, research/personas.md v1.2, research/master-research.md v5
**All facts cite sources. Unknowns marked [?]. No invented entities or fields.**

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| v0.1 | 2026-06-20 | Section IA added: product entity inventory (confirmed entities + under-question list). Screens and navigation deferred. |

---

## IA - Information Architecture

### About this section

Entities are the objects a person deals with to close their jobs. Screens only display entities; entities grow from jobs. This inventory is the first input to IA work, before any screen or navigation decisions are made.

Sources used: research/jtbd.md v1.1 (confirmed jobs, hypothetical jobs, danger list), research/strategy.md v4 (Decisions 1-4 and what is cut), research/personas.md v1.2 (people observations and persona needs), CLAUDE.md (MVP feature scope).

Rule: an entity without at least one confirmed job source or a locked Decision goes into Section 2 (Under Question). Objects explicitly excluded by a Decision are listed there with the reason.

---

### Section 1: Confirmed Entities

Entities supported by at least one confirmed job from jtbd.md or a locked Decision from strategy.md v4.

---

#### E1 - Product

The individual sellable item. The central entity of the catalog. Every other confirmed entity either contains a Product, points to one, or is built around the trust and clarity signals a Product must carry.

**Fields:**
- Name, brand
- Category tag (taxonomy label used for filtering; e.g. Protein, Creatine, Vitamins)
- Images
- Composition - ingredient list with per-serving quantities
- Dosage instructions (plain language)
- Origin and production info (country, manufacturer name)
- Quality and certification signals (third-party certifications, official distributor status, testing claims)
- Retail price
- Price per serving
- Coach-tier price [? - rate pending supplier cost data; visible to verified coach accounts only]
- Stock status (in stock, low stock, out of stock)
- Goal tags (which Goal Collections include this product)
- User reviews (rating and text)

**Jobs:**
- Job 3: verify safety before buying (jtbd.md) - composition, dosage, origin, and certification are the primary signals a buyer checks before adding to cart
- Job 5: recommend with visible evidence (jtbd.md) - coaches share the product page with athletes to back their recommendation and protect professional credibility
- ESJ-3: Ukrainian buyer counterfeit skepticism (jtbd.md) - origin, official distributor status, and certification signals address confirmed fear of fake or mislabeled products (NADC case June 2025, hotline.ua review behavior, master-research.md Post-Persona Finding 1)

**Connections:**
- Goal Collection (product is tagged to one or more goals)
- Cart (product is added as a line item)
- Order (product is captured as a line item at checkout)
- My Staples List (product can be saved as a staple; post-launch, E10)

---

#### E2 - Goal Collection

A curated set of products organized around one shopper goal. In MVP, one Goal Collection exists per goal tile (4-6 tiles on the homepage). Post-launch, a Goal Collection can also be produced by the Guided Quiz as a personalized output.

**Fields:**
- Goal name (e.g. Build Muscle, Fat Loss, Energy, Recovery, Performance)
- Goal description in plain language - what this goal means, who it is for
- Goal image or icon
- Curated product list (ordered; maintained by admin in MVP)
- Post-launch extension: quiz-generated variant - same structure, personalized by quiz answers (Decision 2 first post-launch iteration)

**Jobs:**
- Job 2: get a confident first purchase recommendation (jtbd.md) - the goal tile is the primary activation path for beginners; it replaces the need to navigate a 2,000-10,000 SKU catalog without prior knowledge
- Decision 2: 4-6 goal selector tiles in MVP, each leading to a curated product collection; no account required (strategy.md v4)

**Connections:**
- Product (a Goal Collection contains an ordered list of Products)

---

#### E3 - Cart

The active list of items a buyer intends to purchase, before checkout. In the coach flow, a cart is built for a specific client and tagged to that client's profile before the order is placed. A coach may build multiple carts in one session, one per client.

**Fields:**
- Line items (product reference, quantity, unit price at the time of adding)
- Applied pricing tier (individual retail or coach wholesale)
- Coach client tag [coach flow only - which client this cart is for]
- Subtotal
- Discount or coupon applied

**Jobs:**
- Main JTBD: multi-client ordering in one session (jtbd.md) - the coach builds one cart per client without losing track of who ordered what
- Decision 1: per-client order tagging within the session (strategy.md v4)

**Connections:**
- Product (line items reference Products)
- Coach Client Profile [coach flow] (cart is tagged to a specific client during the session)
- Order (Cart converts to an Order at checkout)

---

#### E4 - Order

A placed and confirmed purchase. For coach accounts, each order carries a client tag so it appears in that client's order history. The Order record is the source for the one-tap repeat mechanic.

**Fields:**
- Order ID
- Placed-at timestamp
- Line items (product name, quantity, price snapshot at the moment of purchase)
- Delivery address
- Total paid
- Pricing tier applied (individual or coach)
- Payment status
- Delivery status
- Coach client tag [coach orders only]

**Jobs:**
- Main JTBD: serve clients reliably and fulfill their orders profitably (jtbd.md)
- Decision 1: order history per client - the order is the record coaches review when reordering for a specific athlete (strategy.md v4)
- Decision 4: one-tap repeat from order history - the Order entity is the source for the "Repeat order" action (strategy.md v4)

**Connections:**
- Coach Client Profile [coach orders] (order is tagged to a client profile)
- Coach Account or Buyer Account (order belongs to an account)
- Product (line items)

---

#### E5 - Coach Client Profile

A saved record for one athlete in a coach's client list. Contains the client's name, goal label, and all orders ever tagged to them. Enables the coach to review what a specific client has ordered and build or repeat the next order for them.

**Fields:**
- Client name
- Client goal (optional label, e.g. "Fat Loss," or free text; sourced from the coach's knowledge, not from a quiz)
- Order history for this client (list of Orders tagged to this profile)

**Jobs:**
- Main JTBD: build a complete order for each client in one session and track per-client order history (jtbd.md)
- Decision 1: saved client list with client name and goal; order history per client (strategy.md v4)

**Connections:**
- Coach Account (a Client Profile belongs to one Coach Account)
- Order (orders tagged to this client appear in this profile)
- Cart [during an ordering session] (the active cart is tagged to this client)

---

#### E6 - Coach Account

The platform account for a verified coach or gym. Unlocks the coach pricing tier and the saved client list. Identity is verified via a social media link - a low-friction method confirmed in practice on mega-mass.ua wholesale form (OBS-C20, personas.md). No callback, no waiting period.

**Fields:**
- Display name (coach or gym name)
- Social media link (for identity verification; one confirmed link required)
- Verification status (pending, verified)
- Saved client list (list of Coach Client Profiles)
- Order history across all clients
- Access to coach pricing tier (unlocked on verification)

**Jobs:**
- Main JTBD: place multi-client orders from a single account in one session (jtbd.md)
- Decision 1: self-service coach account; no callback form required; social media link verification (strategy.md v4)
- Decision 3: coach pricing tier accessible from day one of a verified account; published upfront, not negotiated (strategy.md v4)
- ESJ-4: coach autonomy - self-service from day one, no dependency on a supplier manager (jtbd.md)

**Connections:**
- Coach Client Profile (has many)
- Order (has many, across all clients)
- Coach Pricing Tier (verified account grants access)

---

#### E7 - Coach Pricing Tier

The published wholesale pricing structure for verified coach accounts. Shown on the public "For Coaches" page before registration. Pricing transparency is itself the experience advantage: unlike all 8 known UA wholesale suppliers, Stack publishes the rate without requiring a callback or negotiation (OBS-C21, personas.md; Decision 3 reasoning, strategy.md v4).

**Fields:**
- Discount rate below retail [? - specific percentage requires real wholesale cost data from supplier negotiations]
- Conditions for access (verified Coach Account with social media link)
- Visibility: public, shown on the "For Coaches" page before registration

**Jobs:**
- Decision 3: separate, published, transparent coach pricing tier (strategy.md v4)
- ESJ-1: coach credibility - the published rate protects the coach's resale margin and removes the need to call a supplier manager to get pricing (jtbd.md)
- Job 1: switch to a better supplier - published pricing is an experience win that allows a coach to evaluate Stack without committing (jtbd.md)

Note: the Coach Pricing Tier is not a low-price strategy. It must stay consistent with the riskiest assumption (switch for experience; price as competitive hygiene). The differentiator is transparency and predictability, not the lowest rate. Strategy.md v4, Riskiest Assumption.

**Connections:**
- Coach Account (verification grants access to this tier)

---

#### E8 - Buyer Account

The platform account for an individual (non-coach) buyer. Contains order history for the one-tap repeat mechanic and tracks lifetime spend for the cumulative loyalty tier.

**Fields:**
- Name, email
- Delivery address(es)
- Order history (list of Orders)
- Individual Loyalty Balance (current discount tier and lifetime spend total)
- My Staples List [post-launch, E10]

**Jobs:**
- Decision 4: order history with "Repeat order" action accessible from the account page (strategy.md v4)
- Decision 3: cumulative lifetime loyalty for individual buyers (strategy.md v4)
- Job 4: reorder without effort (jtbd.md) - order history is the first reorder surface in MVP

**Connections:**
- Order (has many)
- Individual Loyalty Balance (has one, E9)
- My Staples List [post-launch] (has one, E10)

---

#### E9 - Individual Loyalty Balance

The cumulative discount tier for individual buyers, based on lifetime spend. Structure is decided by Decision 3. Specific thresholds and rates are [?] pending real margin data from supplier negotiations.

**Fields:**
- Lifetime spend total (cumulative; not reset periodically)
- Current discount tier (%)
- Threshold amount for next tier [? - specific values require real margin data]
- Spend milestones reached

**Jobs:**
- Decision 3: cumulative lifetime loyalty for individual buyers; structure decided, specific numbers [?] (strategy.md v4)

Note: the Loyalty Balance is separate from the Coach Pricing Tier. Coaches access a fixed published wholesale rate (E7). Individual buyers accumulate a discount over time through the Loyalty Balance (E9). These are two distinct structures, not one unified tier. Decision 3, strategy.md v4.

**Connections:**
- Buyer Account (belongs to one Buyer Account, E8)

---

#### E10 - My Staples List [POST-LAUNCH]

A saved list of a buyer's regularly purchased products. The first post-launch iteration of the reorder mechanic (Decision 4). Enables email reminders before estimated stockout. Not in MVP - ships after the "Repeat order from order history" mechanic has generated real purchase frequency data.

**Fields:**
- List of saved Products (with optional preferred quantity per product)
- Email reminder preference (on or off per product)
- Estimated next stockout date [? - requires real purchase history; reminder timing [?] until post-launch data exists]

**Jobs:**
- Job 4: reorder without effort (jtbd.md) - My Staples is the persistent, proactive version of the reorder mechanic, beyond order history
- Decision 4: "My Staples" saved list and email reminder as first post-launch iteration (strategy.md v4)

**Connections:**
- Buyer Account (belongs to one Buyer Account, E8)
- Product (contains references to Products)

---

### Section 2: Under Question

Entities with no confirmed job source, or objects explicitly cut from scope by a Product Decision. Do not design screens for these without first validating a job or reversing a Decision. Each entry names the Decision or jtbd.md section that governs it.

---

#### UQ1 - Coach Referral Link

A shareable link that a coach gives to individual athletes so they can order directly from Stack, with the coach receiving credit or a commission on the sale.

**Hypothetical job:** HYP-1 (jtbd.md hypothetical jobs section) - no confirmed source; inferred from AARRR v2 referral hypothesis ("20% new accounts from coach referral" [?]). No coach behavior data supports this motivation or workflow.

**Why deferred:** strategy.md v4 AARRR table notes "organic word-of-mouth in MVP; formal referral links in Phase 2." The commission-driven motivation is assumed, not validated. HYP-1 is explicitly labeled as a hypothesis with a risk note in jtbd.md ("assumed referral/commission motivation that may not be how Ukrainian coaches think").

---

#### UQ2 - Athlete Supplement Adherence Tracker

A view inside the coach's account where they can see which athletes are actually consuming their supplements and at what cadence.

**Hypothetical job:** HYP-2 (jtbd.md hypothetical jobs section) - inferred from multi-client cart concept; no coach interviews or research data confirm this is a real job a coach needs the store to close.

**Why cut:** Explicitly excluded from MVP scope in Decision 1: "Does NOT include: client nutrition tracking" (strategy.md v4). Risk noted in jtbd.md: may be over-engineering the coach tool before the basic ordering flow is validated.

---

#### UQ3 - Paid Subscription Tier

A premium paid membership for buyers or coaches, potentially offering priority stock alerts, deeper analytics for coaches, or exclusive product access.

**Job source:** None confirmed. CLAUDE.md marks this as "Open question for a later phase. Do not hardcode." strategy.md v4 Business Model: "Do not hardcode as a committed product feature." research/benchmark.md and master-research.md UX Patterns confirm subscription billing trust is not established in the Ukrainian market.

**Why deferred:** No confirmed job. Structurally blocked by low recurring billing trust in Ukraine (research/benchmark.md, research/ux-patterns.md "Pattern That Does NOT Fit"). Reorder is solved as a free convenience mechanic in MVP (Decision 4, strategy.md v4).

---

#### UQ4 - Athlete-Facing Client Portal

A separate account or view for an athlete to see the orders their coach has placed for them, or to manage their own supplement program independently.

**Job source:** None confirmed in jtbd.md or personas.md. No athlete-as-independent-buyer data exists in the research. The athlete's relationship to Stack in the coach model is as the END beneficiary of a coach's order, not as a direct buyer with their own account.

**Why cut:** Explicitly excluded from MVP scope in Decision 1: "Does NOT include: custom client-facing portal" (strategy.md v4).

---

#### UQ5 - Invoice and Order Export

A downloadable business document (PDF or CSV) for a coach's wholesale orders, for accounting, client billing, or margin tracking.

**Job source:** None confirmed in jtbd.md. The closest confirmed need is the coach reseller margin management job (OBS-C18, personas.md), which is served in MVP by Order history and per-client order tagging (E4, E5). Whether coaches need a formal document export is not validated.

**Why cut:** Explicitly excluded from MVP scope in Decision 1: "Does NOT include: invoice export" (strategy.md v4).

---

## Sources

- research/jtbd.md v1.1
- research/strategy.md v4
- research/personas.md v1.2
- research/master-research.md v5
- CLAUDE.md (MVP feature scope, Out of scope for MVP section)
