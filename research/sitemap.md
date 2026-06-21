# Sitemap

**Product:** Stack - mobile-first sport nutrition e-commerce, Ukraine
**Version:** v0.5 (2026-06-21)
**Language:** English (markdown research file)
**Depends on:** research/jtbd.md v1.2, research/strategy.md v5, research/personas.md v1.2, research/master-research.md v5, research/flows.md v0.2
**All facts cite sources. Unknowns marked [?]. No invented entities or fields.**

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| v0.1 | 2026-06-20 | Section IA added: product entity inventory (confirmed entities + under-question list). Screens and navigation deferred. |
| v0.2 | 2026-06-20 | Section 3 added: draft screen hierarchy derived from the 10 confirmed entities and jobs. Each screen tagged with its job/Decision and persona. MVP and post-launch separated. Navigation and depth beyond level 1 still deferred. |
| v0.3 | 2026-06-20 | Section 4 added: navigation model. 5 global entries mapped to job clusters; depth (tap count) measured separately for the coach work flow and the beginner first-purchase path; each screen assigned a level (global / contextual / deep). |
| v0.4 | 2026-06-20 | Section 5 added: traceability matrix (jobs to screens) with orphan-screen and orphan-job defect lists. Surfaces two defects: Loyalty status has no job (orphan screen) and the create-client name+goal step has no screen (orphan job). |
| v0.5 | 2026-06-21 | IA corrective pass. Section 3: registered new screen states and in-flow steps (Add client capture, Choose substitute, address selection, coach price unresolved, reviews and certificate content, and missing empty/loading/error states). Section 5: added Job 6 row, marked Loyalty status and Coach pricing tier (no longer orphan), marked the create-client step against the Add client capture state (no longer orphan), and confirmed every mark is backed by a flow node. flows.md rewired to v0.2 from these registrations. |

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

### Section 3: Screens (draft hierarchy)

Screens grow from what a person is trying to do, not from a competitor's menu. Every screen below derives from one of the 10 confirmed entities (Section 1) and is tagged with the job or Decision it serves. Groups are organized by human intent (find, buy, order for clients, reorder, manage), not by site sections.

Depth is deliberately kept to one level under each group. Deeper levels (filters, sub-steps, states as flows) are added consciously in a later IA step, not here.

**Legend:**
- Persona tags: `[P1]` Olena, primary coach with established supplier; `[P2]` Dmytro, new coach; `[P3]` Viktoriia, beginner; `[P4]` Andriy, regular. "lead" marks the persona a screen is primarily built for.
- `(job)` names the confirmed job from jtbd.md or the Decision from strategy.md v4 the screen closes.
- `[post-launch]` ships after MVP per strategy.md v4. Kept separate from the MVP tree.
- "supporting" marks a screen that is required by a job but does not close it on its own (it is a gate or a completion step, not an orphan).
- States (empty, loading, error, out of stock) belong to a screen and are not listed as separate screens.

```
A. FIND THE RIGHT PRODUCT  (discover and validate what to buy)
   Home / goal selector                  (Job 2; Decision 2)                         [P3 lead; serves all]
   Goal Collection                       (Job 2; Decision 2)                         [P3]
   Catalog and search                    (Main JTBD: coach locates known products)   [P1 lead; serves all]
   Product detail                        (Job 3 verify safety; Job 5 recommend;
                                          ESJ-3 counterfeit)                          [P3, P1]
   [post-launch] Help me choose / quiz   (Job 2; Decision 2 post-launch)             [P3]

B. BUY AND PAY  (complete the purchase)
   Cart                                  (Main JTBD; Decision 1 per-client tagging)  [all; P1 uses per-client grouping]
   Checkout                              supporting; completes the Job 2 / Job 4 /
                                          Main JTBD purchase                          [all]
   Order placed confirmation             supporting; terminal step of the purchase
                                          (Order, E4)                                 [all]

C. ORDER FOR MANY CLIENTS IN ONE SESSION  (coach workspace)
   For Coaches page + published pricing  (Job 1 switch; Decision 3 coach tier;
                                          ESJ-1 credibility)                          [P1, P2]
   Coach sign-up + social-link verify    (Decision 1 verification; ESJ-4 autonomy)   [P1, P2]
   Coach account home                    (Main JTBD; Decision 1; ESJ-4)              [P1 lead, P2]
   Client list                           (Main JTBD; Decision 1 saved client list)   [P1]
   Client profile                        (Main JTBD; Decision 1 order history
                                          per client)                                [P1]
   Multi-client order session            (Main JTBD; Decision 1 per-client tagging)  [P1]

D. COME BACK AND REORDER  (stay stocked with no effort)
   Order history                         (Job 4; Decision 4 one-tap repeat)          [P4 lead; P1 reorders for clients]
   Order detail + Repeat order           (Job 4; Decision 4)                         [P4, P1]
   [post-launch] My Staples list         (Job 4; Decision 4 post-launch)             [P4]
   [post-launch] Stockout email reminder (Job 4; Decision 4 post-launch)            [P4]
                 notification, NOT a screen

E. MANAGE ACCOUNT AND LOYALTY
   Sign in / register                    supporting; gate for Coach Account (E6)
                                          and Buyer Account (E8); required by
                                          Main JTBD, Decision 1, Job 4                [all]
   Buyer account home                    (Decision 4 order-history access; Job 4)    [P4, P3]
   Loyalty status                        (Decision 3 cumulative individual loyalty;
                                          numbers [?])                                [P4, P3]
   Saved addresses                       supporting; removes reorder friction
                                          (Job 4; strategy.md segment 3 pain)         [all]
```

**Orphan check:** No screen in the tree is an orphan. The four screens marked "supporting" (Checkout, Order placed confirmation, Sign in / register, Saved addresses) do not close a job by themselves, but each is required by a named job and is anchored to it above. If a later screen cannot be anchored this way, it is marked `[ORPHAN]` and reconsidered.

**Persona coverage at a glance:**
- Primary persona (Olena, P1): the entire Group C coach workspace, plus Catalog and search (Group A), Cart (Group B), and Order history / Repeat order (Group D) when she reorders for active clients. Group C is the structural MVP differentiator and exists only for the coach channel.
- Secondary (Viktoriia, P3 beginner): Group A discovery (Home / goal selector, Goal Collection, Product detail) and Group B purchase, plus Buyer account home and Loyalty status.
- Secondary (Andriy, P4 regular): Group D reorder is built for him (Order history, Repeat order), plus Group B purchase and the account screens in Group E.
- New coach (Dmytro, P2): the same Group C screens as Olena, entering through the public For Coaches page as a first-choice (not switching) acquisition.

**Entity-to-screen coverage:** all 10 confirmed entities surface on at least one screen. E7 Coach Pricing Tier surfaces inside the For Coaches page rather than as a standalone screen; E9 Individual Loyalty Balance surfaces on Loyalty status; E3 Cart carries per-client grouping for the coach flow.

**Under Question entities get no screens.** The five Section 2 entities (Coach Referral Link, Athlete Adherence Tracker, Paid Subscription Tier, Athlete-Facing Client Portal, Invoice and Order Export) are out of MVP scope and intentionally absent from this tree. They get screens only if a job is validated or a Decision is reversed.

**Post-launch items held out of the MVP tree** (tagged `[post-launch]` above): guided quiz / "Help me choose" path (Decision 2), My Staples list (Decision 4, entity E10), and the stockout email reminder (Decision 4, a notification rather than a screen).

---

**Registered screen states and in-flow steps (added v0.5 in the IA corrective pass).**

Integrity rule: a flow may draw a state or in-session step only after it is registered here with a job tag. The tree above stays one level; this registry is the explicit list the flows draw from. State vocabulary stays fixed (empty, loading, error, out of stock); in-session steps are sub-states of an existing screen, never new screens.

Group A:
- Goal Collection: loading; error (collection failed to load); empty (no in-stock products, route to other goals and to Search). Tag: Job 2 / Decision 2.
- Catalog and search: loading (search results); error (search failed); empty (no results, with suggestions). Tag: Job 3 entry and the Search utility; also Job 4 out-of-stock recovery (find a sold-out staple another way).
- Product detail: loading (trust details); error (details failed to load); out of stock; reviews and certificate content (same-screen recovery before a buyer leaves). Tag: Job 3 / Job 5 / ESJ-3.

Group B:
- Cart: empty cart (route back to discovery), including after an out-of-stock removal empties it. Tag: Main JTBD / Job 2 / Job 4 purchase.
- Checkout: address selection (reads Saved addresses, handles "no saved address yet" with a first-time capture); loading (processing payment); error (payment declined). The address-selection state is what backs Saved addresses (E4) in the flows. Tag: Job 4 / Decision 4 friction reduction; Main JTBD and Job 2 purchase.

Group C:
- Client list: Add client capture (add-mode, captures client name and goal). This is the create-client step and is the screen state that closes the Main JTBD create-client sub-step. Also empty (no saved clients). Tag: Main JTBD / Decision 1 (saved client list with name and goal).
- Coach sign-up + social-link verify: loading (verifying the social link, async); error (verification failed, resubmit link), which is recoverable. Tag: Decision 1 verification.
- Multi-client order session: loading (quick-add, fetching catalog matches and coach-tier prices); Choose substitute (out-of-stock recovery step; the chosen substitute is run through the same stock and coach-tier price checks as a normal line); coach price unresolved (session saved, checkout blocked until the coach-tier price resolves, never bills retail silently). Tag: Main JTBD / Decision 1 / out-of-stock recovery.
- Client profile: loading (per-client order history); error (history failed to load); empty (nothing ordered for this client yet). Tag: Main JTBD / Decision 1 (coach reviews per-client order history to verify what was ordered for whom).

Group D:
- Order history: inline "Repeat order" action on each order row (one-tap repeat per Decision 4), alongside the existing path through Order detail + Repeat order; empty (no past orders). Tag: Job 4 / Decision 4 one-tap repeat.

Group E:
- Sign in / register: loading (signing in); error (sign in failed, with retry). Tag: supporting gate (Main JTBD, Decision 1, Job 4).

Backlog (deliberately out of MVP, with reason, not drawn in any flow):
- Manual moderation of coach verification: no manual review desk in MVP, so a verification that cannot be fixed by resubmitting the link stays an explicit dead end. Revisit if auto-verification proves too strict.
- In-app support contact from the coach price-unresolved state: no in-app support desk in MVP; the MVP behaviour is save-session-and-block-checkout. Add a support path when a support channel exists.
- Back-in-stock notify (a wanted out-of-stock staple in reorder; a sold-out product in safety verification): this is the post-launch stockout reminder (Decision 4, entity E10), kept out of MVP.

---

### Section 4: Navigation

Navigation is derived from the screens in Section 3 and the jobs behind them. It works only with the 10 confirmed entities. Under Question entities and `[post-launch]` items are not in navigation. Screen names match Section 3 exactly.

The product has two different front doors, and the navigation must serve both: the beginner (Viktoriia) enters through a goal, and the coach (Olena, Dmytro) enters through the coach workspace. The global navigation below carries both entrances at once, so neither persona has to pass through the other's path.

---

#### 4.1 Global navigation (3 to 5 entries)

Five global entries, each an entrance into a job cluster (groups A to E), not a copied menu. Three are primary destinations; two (Search, Cart) are persistent header utilities that stay visible because the coach work flow leans on them repeatedly.

| Global entry | Cluster | Job behind it | Whose front door |
|--------------|---------|---------------|------------------|
| Home / goal selector | A (Find) | Job 2 + Decision 2: a beginner turns a goal into a safe product set through goal tiles on the landing screen. This is an activation entrance, not a generic "home." | Viktoriia (P3), beginner |
| For Coaches page + published pricing -> Coach account home | C (Coach workspace) | Main JTBD + Decision 1 (multi-client ordering) and Job 1 + Decision 3 (evaluate a published coach price before switching). Logged out it shows the public For Coaches page; for a verified coach it becomes Coach account home. | Olena (P1), Dmytro (P2), coach |
| Search | A (Find) | Main JTBD: the coach locates known products to add to client orders; Job 4: the regular finds a staple by name. Persistent because the coach hits it on every product while building a multi-client order. | Olena (P1) lead, Andriy (P4) |
| Cart | B (Buy) | Completes the purchase for Main JTBD, Job 2, and Job 4. Carries per-client grouping (Decision 1) in the coach flow. Persistent so the running order is always one tap away. | all |
| Account | D + E (Reorder, Manage) | Job 4 + Decision 4 (order history and one-tap repeat) and Decision 3 (cumulative loyalty). | Andriy (P4) lead, all |

Why these and not more: clusters A, B, C, D, E are each reachable from a global entry. The coach entrance (For Coaches / Coach) and the beginner entrance (Home / goal selector) are deliberately separate top-level entries so the primary and secondary front doors never block each other. The For Coaches entry stays visible to non-coaches on purpose, so a new coach (Dmytro) can self-identify and switch into the coach path.

---

#### 4.2 Depth: coach work flow (Olena)

Job: from entry to a placed multi-client order (Main JTBD, Decision 1). This is a work flow and is deeper by definition. The depth below is the real depth, not flattened.

Returning verified coach, ordering for 2 clients, quick-adding known products from search results (she knows her products, so Product detail is optional here and used only for Job 5 when showing an athlete):

```
Coach account home                         (tap 0, landing)
  tap New order session   -> Multi-client order session     (tap 1)
  tap Client A            -> client context set             (tap 2)
  tap Search              -> Catalog and search             (tap 3)
  tap Quick-add (A)       -> product added, tagged to A     (tap 4)
  tap Client B            -> client context set             (tap 5)
  tap Search              -> Catalog and search             (tap 6)
  tap Quick-add (B)       -> product added, tagged to B     (tap 7)
  tap Review / Cart       -> Cart (per-client grouping)     (tap 8)
  tap Checkout            -> Checkout                       (tap 9)
  tap Place order         -> Order placed confirmation      (tap 10)
```

- 2-client order: 10 taps.
- 1-client order: about 7 taps (drop the second client loop, taps 5 to 7).
- Each additional client adds about 3 to 4 taps (select client, Search, Quick-add), and each extra product per client adds about 2 taps (Search, Quick-add). Depth stays flat; breadth grows with client and product count. This is the expected shape of a bulk work flow and is not a problem to optimize away.
- First-time coach prepends a one-time onboarding of about 2 taps: For Coaches page -> Coach sign-up + social-link verify -> Coach account home. Building the saved client list the first time also adds a few taps per client, once.

Decision held: the coach flow is intentionally not forced through Product detail. The coach quick-adds known SKUs from search; she opens Product detail only for Job 5 (showing an athlete the composition and evidence), which is a separate moment, not a step in placing the order.

---

#### 4.3 Depth: beginner first purchase (Viktoriia)

Job: from entry to first purchase through a goal tile (Job 2, Decision 2). This path must be short. Budget: no more than 3 taps to reach the product under the goal.

```
Home / goal selector                       (tap 0, landing)
  tap goal tile (e.g. Fat Loss)  -> Goal Collection         (tap 1)
  tap a product                  -> Product detail          (tap 2)   <- product under goal reached here
  tap Add to cart                -> cart updated            (tap 3)
  tap Cart                       -> Cart                    (tap 4)
  tap Checkout                   -> Checkout                (tap 5)
  tap Place order                -> Order placed confirmation(tap 6)
```

- Product under the goal: 2 taps (Home goal tile -> Goal Collection -> Product detail). Inside the 3-tap budget, no restructuring needed.
- Completed first purchase: about 6 taps.

Two design choices protect the 2-tap figure, and both are real tradeoffs:
- Goal tiles live on the Home landing screen (Decision 2), not behind a "Shop" or "Catalog" menu. Putting them behind a menu would push the product to 3 taps (still inside budget but at the limit) and would cost the home screen its activation role. Tradeoff accepted: the home is the goal selector, so the catalog-style entry is demoted to the Search utility for people who already know what they want.
- The beginner checks out as a guest. Decision 2 requires no account for the goal path, so Sign in / register is not inserted before checkout. Forcing account creation first would add 1 to 2 taps and reintroduce the friction the goal path exists to remove. Tradeoff accepted: account creation is offered after the purchase, not before.

---

#### 4.4 Level of each screen and action

Global = visible at all times. Contextual = appears inside a flow. Deep = rare actions reached by drilling in.

| Screen / action | Cluster | Level | Reason |
|-----------------|---------|-------|--------|
| Home / goal selector | A | Global | Default landing and the beginner front door. |
| Search (Catalog and search entry) | A | Global | Persistent header field; the coach uses it on every product mid-order. |
| Cart | B | Global | Persistent running-order state, one tap from anywhere. |
| Account (Buyer account home) | E | Global | Account hub; entrance to reorder and loyalty. |
| For Coaches page + published pricing | C | Global | Coach self-identify entrance; becomes Coach account home when a coach is verified. |
| Coach account home | C | Global | The verified coach's landing tab (the Coach entry resolves here). |
| Goal Collection | A | Contextual | Appears after a goal tile is tapped. |
| Catalog and search (results) | A | Contextual | Appears after a search query. |
| Product detail | A | Contextual | Reached from a collection, search, or an order line. |
| Checkout | B | Contextual | Appears from Cart. |
| Order placed confirmation | B | Contextual | Terminal step after placing an order. |
| Multi-client order session | C | Contextual | The coach working surface; appears on New order. |
| Client list | C | Contextual | Inside the coach workspace. |
| Order history | D | Contextual | Behind Account; source of one-tap repeat. |
| Order detail + Repeat order | D | Contextual | Reached from Order history. |
| Sign in / register | E | Contextual | Appears only when a flow needs authentication. |
| Client profile | C | Deep | Per-client order history drill-down; infrequent. |
| Coach sign-up + social-link verify | C | Deep | One-time onboarding action. |
| Loyalty status | E | Deep | Checked occasionally, not every session. |
| Saved addresses | E | Deep | Rare management action. |

Excluded from navigation by rule: the five Under Question entities (Coach Referral Link, Athlete Adherence Tracker, Paid Subscription Tier, Athlete-Facing Client Portal, Invoice and Order Export) and the `[post-launch]` items (guided quiz / Help me choose, My Staples list, stockout email reminder). They get navigation only when a job is validated or a Decision is reversed.

---

### Section 5: Traceability (jobs to screens coverage)

This matrix tests whether every job has a screen and every screen has a job. Rows are all jobs from jtbd.md. Columns are all MVP screens from Section 3. A cell is marked only where a screen really participates in closing the job, based on the drawn flows (flows.md) and the job or Decision that backs the screen. Marks are not added for screens a user merely passes through.

Method notes:
- Where the flow and a stale screen tag disagree, the flow wins. Example: Catalog and search was tagged "coach locates known products (Main JTBD)" in Sections 3 and 4, but flows.md routes the coach through in-session quick-add in Multi-client order session, so Catalog and search is not marked for the Main JTBD.
- Emotional and social jobs (ESJ-1 to ESJ-4) are usually closed by a cross-cutting property of several screens, not by one screen. A mark is placed only where that property is actually described for the screen.
- The Main JTBD has sub-steps. The create-client step (name + goal input) is checked on its own row, because Decision 1 names "client name and goal" as data the coach enters and the matrix must show honestly whether a screen captures it.

Columns are split by group (A to E) for width. Every job row appears in every group table. Screen names are exact.

**Group A - Find the right product**

| Job | A1 Home / goal selector | A2 Goal Collection | A3 Catalog and search | A4 Product detail |
|-----|:--:|:--:|:--:|:--:|
| Main JTBD |  |  |  |  |
| Main JTBD sub-step: create client (name + goal) [Decision 1] |  |  |  |  |
| Job 1 switch supplier |  |  |  |  |
| Job 2 goal-to-product |  ✓  |  ✓  |  |  |
| Job 3 verify safety |  |  |  ✓  |  ✓  |
| Job 4 reorder |  |  |  |  |
| Job 5 recommend with evidence |  |  |  |  ✓  |
| Job 6 growing price benefit from volume |  |  |  |  |
| ESJ-1 coach credibility |  |  |  |  ✓  |
| ESJ-2 beginner confidence |  ✓  |  ✓  |  |  ✓  |
| ESJ-3 counterfeit skepticism |  |  |  |  ✓  |
| ESJ-4 coach autonomy |  |  |  |  |

**Group B - Buy and pay**

| Job | B1 Cart | B2 Checkout | B3 Order placed confirmation |
|-----|:--:|:--:|:--:|
| Main JTBD |  ✓  |  ✓  |  ✓  |
| Main JTBD sub-step: create client (name + goal) [Decision 1] |  |  |  |
| Job 1 switch supplier |  |  |  |
| Job 2 goal-to-product |  ✓  |  ✓  |  ✓  |
| Job 3 verify safety |  |  |  |
| Job 4 reorder |  ✓  |  ✓  |  ✓  |
| Job 5 recommend with evidence |  |  |  |
| Job 6 growing price benefit from volume |  |  |  |
| ESJ-1 coach credibility |  |  |  |
| ESJ-2 beginner confidence |  |  |  |
| ESJ-3 counterfeit skepticism |  |  |  |
| ESJ-4 coach autonomy |  |  |  |

**Group C - Order for many clients in one session**

| Job | C1 For Coaches page + published pricing | C2 Coach sign-up + social-link verify | C3 Coach account home | C4 Client list | C5 Client profile | C6 Multi-client order session |
|-----|:--:|:--:|:--:|:--:|:--:|:--:|
| Main JTBD |  |  |  ✓  |  ✓  |  ✓  |  ✓  |
| Main JTBD sub-step: create client (name + goal) [Decision 1] |  |  |  |  ✓  |  |  |
| Job 1 switch supplier |  ✓  |  ✓  |  |  |  |  |
| Job 2 goal-to-product |  |  |  |  |  |  |
| Job 3 verify safety |  |  |  |  |  |  |
| Job 4 reorder |  |  |  |  |  |  |
| Job 5 recommend with evidence |  |  |  |  |  |  |
| Job 6 growing price benefit from volume |  ✓  |  |  ✓  |  |  |  |
| ESJ-1 coach credibility |  ✓  |  |  |  |  |  |
| ESJ-2 beginner confidence |  |  |  |  |  |  |
| ESJ-3 counterfeit skepticism |  |  |  |  |  |  |
| ESJ-4 coach autonomy |  |  ✓  |  ✓  |  |  |  |

**Group D - Come back and reorder**

| Job | D1 Order history | D2 Order detail + Repeat order |
|-----|:--:|:--:|
| Main JTBD |  |  |
| Main JTBD sub-step: create client (name + goal) [Decision 1] |  |  |
| Job 1 switch supplier |  |  |
| Job 2 goal-to-product |  |  |
| Job 3 verify safety |  |  |
| Job 4 reorder |  ✓  |  ✓  |
| Job 5 recommend with evidence |  |  |
| Job 6 growing price benefit from volume |  |  |
| ESJ-1 coach credibility |  |  |
| ESJ-2 beginner confidence |  |  |
| ESJ-3 counterfeit skepticism |  |  |
| ESJ-4 coach autonomy |  |  |

**Group E - Manage account and loyalty**

| Job | E1 Sign in / register | E2 Buyer account home | E3 Loyalty status | E4 Saved addresses |
|-----|:--:|:--:|:--:|:--:|
| Main JTBD |  ✓  |  |  |  |
| Main JTBD sub-step: create client (name + goal) [Decision 1] |  |  |  |  |
| Job 1 switch supplier |  |  |  |  |
| Job 2 goal-to-product |  |  |  |  |
| Job 3 verify safety |  |  |  |  |
| Job 4 reorder |  ✓  |  ✓  |  |  ✓  |
| Job 5 recommend with evidence |  |  |  |  |
| Job 6 growing price benefit from volume |  |  ✓  |  ✓  |  |
| ESJ-1 coach credibility |  |  |  |  |
| ESJ-2 beginner confidence |  |  |  |  |
| ESJ-3 counterfeit skepticism |  |  |  |  |
| ESJ-4 coach autonomy |  |  |  |  |

**Out of MVP scope (not rows in the matrix):**
- HYP-1 (coach gives athletes a referral link) and HYP-2 (coach tracks athlete adherence): hypothetical jobs in jtbd.md with no confirmed source; their entities are Under Question (UQ1, UQ2). They correctly have no MVP screen.
- Post-launch screens are excluded from the columns by design: Help me choose / quiz (later iteration of Job 2), My Staples list (later iteration of Job 4), Stockout email reminder (Decision 4, a notification, not a screen). They serve in-scope jobs at a later iteration, not new jobs.

---

#### Defects

**ORPHAN SCREENS: none (resolved in v0.5).** E3 Loyalty status was the one orphan screen. It now closes Job 6 (coach earns a growing price benefit from volume, jtbd.md v1.2), together with the Coach pricing tier on the For Coaches page (C1), Coach account home (C3), and Buyer account home (E2). Loyalty status is marked for Job 6 above and is no longer an orphan. No cosmetic fold was used; the screen was given a real job by adding Job 6 to jtbd.md.

**ORPHAN JOBS: none (resolved in v0.5).** The Main JTBD create-client sub-step (name + goal) was the one orphan job. It is now closed by the Add client capture state on Client list (registered in Section 3, tag Main JTBD / Decision 1), marked C4 in the sub-step row above, and wired into the Main flow (q3 no -> Client list -> Add client capture -> session with the client selected). The qE gate that previously let a new client be skipped is removed.

**Marked-but-unflowed cells: none (resolved in v0.5).** The three cells the critique flagged as marked but not exercised by any flow are now backed by real flow nodes:
- Client profile (C5), marked Main JTBD, is a real step in the Main flow (Coach account home -> Client profile review, with loading / empty / error states).
- Saved addresses (E4), marked Job 4, is backed by the address-selection state at Checkout, which reads Saved addresses and captures one if none exists.
- Sign in / register (E1), marked Main JTBD, appears in the Main flow via the returning-coach sign-in branch (q1 no -> have an account -> Sign in / register).

**Watch (not a defect, still worth tracking):**

- A3 Catalog and search carries Job 3 (the finding entry to Product detail) and now also a Job 4 out-of-stock recovery role (a regular searches for a sold-out staple another way). Still thin; if usage shows few buyers search, reconsider folding it into Multi-client order session quick-add and Product detail entry.

**Result:** no orphan screens, no orphan jobs, no marked-but-unflowed cells. Every job has at least one screen backed by a flow node, and every MVP screen has at least one job. The only deliberately empty matrix areas are the out-of-scope items (Under Question entities and post-launch screens) listed above.

---

## Sources

- research/jtbd.md v1.2
- research/strategy.md v5
- research/personas.md v1.2
- research/master-research.md v5
- research/flows.md v0.2
- CLAUDE.md (MVP feature scope, Out of scope for MVP section)
