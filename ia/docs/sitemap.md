# Stack — Full Sitemap (Sitemap + IA) — structural index

- **Version:** v0.3 (DRAFT)
- **Canonical artifact:** `ia/sitemap.html` (the visual cards + Mermaid overview the team
  reviews and iterates on). This markdown is a lightweight structural index only — do not
  treat it as a second source to keep in lockstep; edit the HTML, then update this list.
- **Relation to research-phase IA:** the global IA (clusters, navigation model,
  traceability, user flows) stays in `research/` (`research/ia.html`,
  `research/docs/sitemap.md` v0.6, `research/docs/flows.md`). This is the *detailed /
  page-level* layer.
- **Format:** numbered cards `X.Y` (X = flow cluster). Dialogs and states are first-class
  nodes. Reference visual: `research/sitemap png example/`.
- **Stance:** mobile-first, fully responsive. Coach = buyer (not a marketplace). SEO is
  part of each page's spec.

## Clusters

- **0 — Home & navigation:** 0.0 Home · 0.1 Header (guest/buyer/coach, incl. favorites
  icon) · 0.2 Footer (global). Header and footer are inherited on every page.
- **1 — Authentication:** all dialogs/modals (do not navigate away). **Unified sign
  in / sign up for every role** — no separate coach login, no role tabs. 1.0 Sign in ·
  1.1 Sign up · 1.2 Forgot · 1.3 Link sent · 1.4 Email confirmation · 1.5 Reset
  password · 1.6 Success. Coach is a **role activated on an existing account** (see 5.1
  / 7.7), reachable both from the For-Coaches landing CTA and an account section, so a
  coach never has to hunt for "where to log in".
- **2 — Catalog & discovery:** 2.0 Catalog · 2.1 Category (+ 2.1a city variant for SEO) ·
  2.2 Goal collection · 2.3 Symptom/concern · 2.4 Brands · 2.5 Search results.
  Inherited filter panel: price, brand, country, goal, form, availability.
- **3 — Product:** 3.0 Product detail (composition/dosage/origin/certification — Job 4) ·
  3.1 Reviews · 3.2 Questions · 3.3 Related.
- **4 — Goal guide (quiz):** 4.0 Intro · 4.1 Questions · 4.2 Results · 4.3 Recommended set.
- **5 — Coach workspace (PRIMARY, Decision 1):** 5.0 For-Coaches landing + published
  pricing (CTA "become a coach") · 5.1 Become-a-coach: verification + tier activation
  (one flow, entered from landing 5.0 or account 7.7) · 5.2 Coach home · 5.3 Client list ·
  5.4 Client profile · 5.5 Multi-client order session.
- **6 — Cart & checkout:** 6.0 Cart (dialog: selected items, per-client grouping for
  coach, CTA "go to checkout") · 6.1 Checkout · 6.2 Order placed.
- **7 — Buyer account:** 7.0 Account home · 7.1 Profile · 7.2 Orders · 7.3 Order detail +
  one-tap repeat (Job 4) · 7.4 Loyalty (Job 6) · 7.5 Addresses · 7.6 Favorites/wishlist
  (MVP, buyer + coach; header icon) · 7.7 "I'm a coach / become a coach" (entry to the
  5.1 verification flow).
- **8 — Content, info & legal:** 8.0 Blog · 8.1–8.4 About / Delivery & payment / Returns /
  Contacts · 8.5 Legal (Privacy, Terms, Public offer).

## Open items [?]

- City list for SEO city-variant pages (which cities at launch).
- Symptom/concern (2.3) at MVP or post-launch.
- Coach-tier % and loyalty thresholds — need real data.
- Favorites (7.6) is MVP (header icon + page); "Мої стейпли" stays post-launch.
- Coach tiering hypothesis **Free vs Pro** (numbers [?]): Free = better-than-retail
  wholesale + 2-3 client cap, instant; Pro = max wholesale + unlimited clients, paid
  (~99 UAH/mo). Activates the brief's deferred "paid subscription tier". Free price must
  still pass the coach price gate (strategy v5); primary persona needs Pro. Calc unit
  economics before committing.

## Locked decisions (this layer)

- **Auth (CONFIRMED):** unified login + registration for every role (dialogs, not full
  pages); coach is a role activated on an existing account (5.1 / 7.7), reachable from
  the For-Coaches landing CTA and an account section. No separate coach login, no role
  tabs.
