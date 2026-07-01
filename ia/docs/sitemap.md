# Stack — Full Sitemap (Sitemap + IA) — structural index

- **Version:** v0.3 (DRAFT)
- **Canonical artifact:** `ia/sitemap.html` (the visual cards + Mermaid overview the team
  reviews and iterates on). This markdown is a lightweight structural index only — do not
  treat it as a second source to keep in lockstep; edit the HTML, then update this list.
- **Relation to the conceptual layer:** the conceptual / global IA (clusters, navigation
  model, traceability, user flows) stays in `research/` — «Концептуальна архітектура»
  (`research/concept.html`, `research/docs/sitemap.md` v0.6, `research/docs/flows.md`).
  This `ia/` layer is the *detailed / page-level* IA («Інформаційна архітектура»).
- **Page-level specs:** one md source of truth per node in `ia/docs/pages/`, each rendered
  as a reviewable HTML visual in `ia/`. Done so far:
  - `pages/navigation.md` → `ia/navigation.html` (node 0.1 — Navigation = meta bar + main
    bar + mega-menu + mobile tabs; 360px baseline; UX-research-backed; B/W mockups).
  - `pages/home.md` → `ia/home.html` (node 0.0 — Home = goal-selector hero + state-based personal
    strip [guest hidden / buyer repeat-order / coach new session] + trust band + visible
    «Для тренерів» block + popular categories + products + promo/brands/blog + SEO text; two
    non-blocking front doors; mobile tab 1; 360px; B/W).
  - `pages/footer.md` → `ia/footer.html` (node 0.2 — Footer = trust strip + main footer
    [newsletter+support · Stack · Customers · Consultation] + SEO popular-queries block
    [categories/types · goals · brands · cities] + bottom bar; 360px baseline; B/W mockups;
    second internal-linking surface).
  - `pages/catalog.md` → `ia/catalog.html` (cluster 2 — the **store taxonomy**: 12 top
    categories → subcategories → types (rebalanced from 14; «Здоров'я» expanded into ~10
    subcategories), 6 goals as cross-cutting collections, facets; built from real UA
    catalogs, Belok-based).
  - `pages/quiz.md` → `ia/quiz.html` (node 4.x, **post-launch** — goal-guide quiz as a focused
    dialog: intro → 5 questions [goal·experience·frequency·constraints·format/budget] + conditional
    safety insert → curated set = filtered goal collection 2.2, not a single product; fixed order,
    result-branching; B/W).
  - `pages/catalog-page.md` → `ia/catalog-page.html` (node 2.0 — Catalog **hub/landing**: H1
    «Каталог» + 6 goal tiles + 12 category tiles + popular + SEO; navigation hub, NOT a listing
    and NOT the taxonomy). `catalog.md`/`catalog.html` is the **structure/taxonomy** («Структура»
    sidebar group); this is the «Каталог» page in the «Сторінки» group.
  - `pages/category-matrix.md` → `ia/category-matrix.html` (node 2.x data — content matrix that
    **populates all 11 categories**: facets subset, brands, goals, H1/Title/Description, ready SEO
    text + FAQ, related; shared brand pool. One artifact instead of 12 specs).
  - `pages/seo.md` → `ia/seo.html` (SEO **engine** for the whole project: principles, keyword model,
    sportpit keyword clusters, intent modifiers, Title/Description/H1 templates, SEO-text structure,
    schema, technical checklist, process. Search volumes = `[?]` (Ahrefs/Serpstat/GKP)).
  - `pages/category.md` → `ia/category.html` (node 2.1 — Category / product listing (PLP):
    breadcrumb → H1 + intro → subcategory chips + goal chips → toolbar/sort → active filters →
    filter rail (desktop) / bottom-sheet (mobile) + product grid (canonical card + availability
    states + quick-add) → load-more + crawlable pagination → SEO text + related. **One shared
    listing template** for 2.0 Catalog-all / 2.2 Goal / 2.4 Brand / 2.5 Search / 2.1a city; A–E
    SEO block with explicit faceted-nav indexation control; B/W).
  - `pages/product.md` → `ia/product.html` (node 3.0 — Product detail / PDP, **conversion target
    of every product card** + trust/verify job): breadcrumb → gallery + buy-box (H1 · brand·country ·
    rating · availability · plain "simple answer" · price + per-serving + coach tier · variant
    selectors · qty · **«У кошик»** + ♡ · trust micro-row) → **trust block is the LEAD** (Склад ·
    Дозування · Походження · Сертифікація with viewable certificate — Job 4) → опис → характеристики
    (mirror catalog facets) → **3.1 Відгуки** → **3.2 Питання** → **3.3 Схожі**, all on one page →
    sticky mobile buy-bar. Variants on one canonical URL (params canonical to base, OOS variants
    disabled not hidden); out-of-stock → «Повідомити» + back-to-collection (flow recovery, no dead
    end); coach-aware CTA «Додати клієнту»; A–E SEO with Product/Offers + AggregateRating + Review +
    Breadcrumb schema. Flow source: flows.md "Job 3 — verify product safety". B/W).
  - `pages/auth.md` → `ia/auth.html` (node 1.x — Authentication, **unified Sign in / Sign up dialog**,
    **phone-OTP-first / passwordless**): split layout (sport-nutrition visual + form); step 1 = single
    phone field + consent + «Отримати код»; secondary buttons Google/Apple/Email; SMS code (OTP) →
    new-user name step → success returns to the triggering action; email = passwordless code; social =
    OAuth + soft add-phone; all states (invalid/loading/wrong-code/resend/rate-limit/social-new);
    role-agnostic (coach role activated later 5.1/7.7); **noindex, no schema**. B/W).
  - `pages/account.md` → `ia/account.html` (node 7.x — **Buyer account shell**, covers 7.0 Overview ·
    7.1 Profile · 7.2 Orders · 7.3 Order detail + **one-tap repeat (Job 4)** · 7.4 Loyalty & bonuses
    (Job 6, Decision 3) · 7.5 Addresses · 7.6 Wishlist · entry to 7.7 Become-a-coach → 5.1): one shell
    (section nav + panel desktop / menu-hub mobile, tab «Акаунт»); section set = header «Кабінет»
    dropdown; Overview = dashboard snapshot; profile **passwordless** (no «Пароль», per 1.x); wishlist
    uses the canonical card; coach = role on the same account. **Private → noindex, no schema**. B/W).
  Next: cluster by cluster — Coach workspace (5.x), Cart/Checkout (6.x).
- **Format:** numbered cards `X.Y` (X = flow cluster). Dialogs and states are first-class
  nodes. Reference visual: `research/sitemap png example/`.
- **Stance:** mobile-first, fully responsive. Coach = buyer (not a marketplace). SEO is
  part of each page's spec.

## Clusters

- **0 — Home & navigation:** 0.0 Home (**goal-selector hero + state-based personal strip +
  visible coach block**; two front doors; mobile tab 1) · 0.1 Header (guest/buyer/coach, incl.
  favorites icon) · **0.1a City-selector dialog** (search + popular + full A–Z; canonical city
  list) · 0.2 Footer (global). Header and footer are inherited on every page.
- **1 — Authentication:** all dialogs/modals (do not navigate away). **Unified sign
  in / sign up for every role** — no separate coach login, no role tabs. **Phone-OTP-first,
  passwordless** (revised 2026-06-30): 1.0 Sign in / Sign up (single **phone** field +
  consent + «Отримати код» + social/email buttons) · 1.1 SMS code (OTP) · 1.2 Profile
  completion (name, new user) · 1.3 Email method (passwordless code to email) · 1.4 Social
  (Google/Apple + soft add-phone) · 1.5 Success → returns to the triggering action. **Email
  is passwordless** → old forgot/reset-password nodes dropped. Split layout (sport-nutrition
  visual + form); **noindex**, no schema. Coach is a **role activated on an existing account**
  (see 5.1 / 7.7), reachable both from the For-Coaches landing CTA and an account section, so a
  coach never has to hunt for "where to log in". Full spec: `pages/auth.md` → `ia/auth.html`.
- **2 — Catalog & discovery:** 2.0 Catalog · 2.1 Category (+ 2.1a city variant for SEO) ·
  2.2 Goal collection (**6 goals**; entered via the **«Цілі» mega-menu** = goal columns →
  relevant categories/subcats, no side-category column) · 2.3 Symptom/concern (**= goals**,
  no separate tree) · 2.4 Brands · 2.5 Search results.
  Inherited filter panel: price, brand, country, goal, form, availability.
- **3 — Product:** 3.0 Product detail (composition/dosage/origin/certification — Job 4) ·
  3.1 Reviews · 3.2 Questions · 3.3 Related.
- **4 — Goal guide (quiz, POST-LAUNCH):** focused dialog — 4.0 Intro · 4.1 Questions (5 steps:
  goal·experience·frequency·constraints-multi·format/budget + conditional safety insert) · 4.2
  Result (curated set = filtered goal collection 2.2, not one product) · 4.3 Add set to cart.
  Fixed question order; branching lives in the result mapping. See `ia/quiz.html`.
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
- **8 — Content, info & legal:** 8.0 Blog · 8.1 Article · 8.2–8.5 About / Contacts /
  Delivery & payment / Returns · 8.6 Legal (Privacy, Terms, **Public contract / offer**) ·
  **8.7 Discount system · 8.8 Guarantee & certificates · 8.9 FAQ · 8.10 Promotions (Акції) ·
  8.11 Store reviews (+ leave review / rate on Google) · 8.12 Newsletter subscription (state;
  welcome discount [?])**. (8.7–8.12 added 2026-06-30 to back the footer + meta-bar promises.)

## Open items [?]

- ~~City list for SEO city-variant pages~~ — **RESOLVED**: canonical list (23 oblast centers +
  large cities; Crimea/occupied excluded), dialog 0.1a; which become landing pages first is a
  traffic-priority call.
- ~~Symptom/concern (2.3) at MVP or post-launch~~ — **RESOLVED**: = goals (concern lens), no
  separate tree.
- Newsletter welcome-discount value (8.12) — promo + unit economics.
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
