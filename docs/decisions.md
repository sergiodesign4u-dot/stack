# Decision records

What was decided in this project, why, and what was rejected. Written by the stage that took the
decision, on closing. This file is **never loaded into context** - `CLAUDE.md` holds the rules that
must act next session, `README.md` and `/_nav.js` hold status, and everything else is here.

Moved out of `CLAUDE.md` on 2026-08-04 when the project was aligned with the course pipeline: the
root rules file had grown to 537 lines (94 KB, one line of 36 691 characters) because the journal of
every step was being written into it. The content below is the original text, unchanged.

---

## 1. Scope decisions carried forward

### Deferred to Later Phases

These topics were identified during research but are NOT built, designed, or decided in the research phase. They are noted here so they are not forgotten.

**Full SEO plan (PULLED FORWARD into the page-level IA, June 2026 - no longer deferred):**
Page-level H1 / H2 structure, meta titles and descriptions, URL slugs, breadcrumbs, SEO-copy intent, dynamic variables (e.g. city: "Протеїн Одеса"), goal-based landing architecture, keyword-to-URL mapping. Previously deferred to Phase 2; now baked into each page's IA spec *before* wireframes so wireframes land on a finished SEO structure. Human-quality final SEO copy and image alt text are still produced later, but the structure is decided in the IA layer.

**Operational catalog population (deferred to technical scoping with real supplier data):**
Sourcing agreements with Ukrainian distributors and brands, structured data format for product descriptions and images, processes for keeping prices and stock levels current, handling out-of-stock and back-in-stock states. This is an operational and sourcing challenge that design research cannot resolve. It will be handled with real supplier data in the technical scoping phase.

---

## 2. Phase 1 - Research (June 2026)

### Research Phase Output (Phase 1 complete, June 2026)

**Live pages (GitHub Pages, Ukrainian)** - now in `research/`:
- research/research.html - competitive analysis, benchmark, UX patterns, AARRR, Lean UX Canvas, strategy
- research/personas.html - 4 personas (Olena primary coach, Dmytro new coach, Viktoriia beginner, Andriy regular)
- research/jtbd.html - JTBD hierarchy, matrix, critique and danger list
- ia/concept-map.html - conceptual architecture (was ia.html): jobs/persona-driven sitemap clusters, 5 user flows, traceability matrix, navigation. Renamed to distinguish it from the detailed page-level IA in `ia/`.

**Locked research files - SOURCE OF TRUTH in `research/docs/`** (markdown; the `research/*.html` pages above are the rendered Ukrainian summaries):
- research/docs/research.md v5 - single source of truth
- research/docs/strategy.md v5 - product decisions locked (4 decisions); riskiest assumption updated after founder coach interviews
- research/docs/personas.md v1.2 - people observations and 4 personas
- research/docs/jtbd.md v1.2 - JTBD set (now incl. Job 6 loyalty retention), matrix, critique
- ia/docs/concept-map.md v0.6 - IA: entities, screens, navigation, traceability matrix
- ia/docs/flows.md v0.3 - 5 user flows (Mermaid)

**4 product decisions locked:**
1. Coach ordering (MVP): saved client list + per-client order tagging + order history per client
2. Goal guidance (MVP): 4-6 goal tiles; guided quiz post-launch
3. Pricing structure: separate published coach tier + individual buyer loyalty (specific numbers [?]).
   **Buyer loyalty = TWO independent mechanisms (locked July 2026):** (a) **personal discount, 3 tiers
   on lifetime spend** - cumulative lifetime purchase sum → tier (🥉/🥈/🥇) → bigger auto discount in the
   cart; lifetime sum does not expire; (b) **bonus account** - ~1% accrual (600 ₴ → 6 ₴, hypothesis) in
   bonus hryvnia, **bonuses expire after 3 months** (ledger shows accrual **and** burn) - a retention
   driver. Both live in the account (7.4); explained on the public **Бонусна програма landing (8.7)**.
   Coach tier is separate. All numbers [?].
4. Reorder (MVP): one-tap repeat from order history; My Staples post-launch

**All numbers that require real data remain [?]**: coach tier %, loyalty tier thresholds + discount %,
bonus accrual rate + expiry, consumption cycles, AOV.

**Strategy v5 update (founder coach interviews, June 2026, field research):** price and reseller margin are a PRIMARY switching driver and a gate, not only competitive hygiene. A workable wholesale price is the precondition for a coach to consider Stack at all; among price-acceptable suppliers, the ordering experience (multi-client flow, transparent pricing, reliable delivery, goal-based selection) is the differentiator that wins and retains. Stack must be both competitive on price (pass the gate) and better on experience (win beyond it). Whether Stack can meet a coach-acceptable price at launch volume remains [?]. This supersedes the earlier "experience is the reason to switch, price is hygiene" framing.

---

## 3. Conceptual architecture, global layer (June 2026)

### Conceptual Architecture - global layer (Phase 2 prep, June 2026)

This jobs/persona-driven layer was built and audited across two critique rounds (zero defects: no orphan screens, no orphan jobs, no marked-but-unflowed or flowed-but-unmarked cells). Live page: ia/concept-map.html (renamed from ia.html - see the detailed page-level IA below for the "real" information architecture). Sources: ia/docs/concept-map.md v0.6, ia/docs/flows.md v0.3.

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

Wireframes (Phase 2) are now **in progress** in `wireframes/` (Флоу 1 complete); this IA is their input. See the Timeline + `docs/playbook/design-wireframes-playbook.md`.

---

## 4. Information architecture v2, page level (June - July 2026)

### Information Architecture v2 - Detailed / page-level (Phase 2 prep, June 2026)

The conceptual architecture above is the **global layer** (sitemap clusters, navigation,
user flows, traceability) - jobs/persona-driven, intentionally a skeleton, now titled
**«Концептуальна архітектура»** (`ia/concept-map.html`). Before wireframes we add the
**page-level layer** - the actual, full information architecture: what each page contains,
its states, components, filters, and SEO. This is the **«Інформаційна архітектура»**
section in the unified left-sidebar navigation. Each page-level node is delivered as an
md source of truth (`ia/docs/pages/`) plus a reviewable HTML visual (`ia/*.html`), and is
listed in the sidebar (Карта сайту → Навігація → Футер → Головна → …). Method and reusable
templates are documented in `docs/playbook/design-ia-playbook.md`.

**Platform stance:** mobile-first, **fully responsive** (desktop↔mobile, mobile is the
priority). Block priority and the first screen are reasoned from mobile; the desktop
layout is still designed deliberately (it is a store).

**Two IA layers:**
- *Conceptual / global IA* - in `research/` («Концептуальна архітектура»,
  `ia/concept-map.html`, `ia/docs/concept-map.md` v0.6, `ia/docs/flows.md` v0.3).
- *Page-level IA* - «Інформаційна архітектура», in `ia/`. Source of truth: `ia/docs/`.
  Per-page specs live in `ia/docs/pages/`: `navigation.md` = header (meta bar + main bar +
  Belok-style mega-menu) + mobile tabs (node 0.1; 360px baseline; B/W mockups). **City selector
  (locked June 2026):** the location chip opens a large **«Оберіть місто» dialog** (search +
  interactive popular-city tiers + full A–Z); canonical city list = the 23 Ukraine-controlled
  oblast centers + large non-center cities (Кривий Ріг, Кременчук…), Crimea/occupied excluded;
  popular sets are data-driven (traffic/orders, manual override); one list feeds delivery,
  the dialog, and the footer SEO city pages. **Dialog simplified June 2026:** search + a single
  «популярні міста» badge set + full A–Z (no intermediate tier); canonical list registered as
  sitemap node 0.1a. **«Цілі» is also a mega-menu (locked June 2026)** but with **no side-category
  column** - the 6 goals as columns, each listing its relevant categories/subcategories (concern
  lens); the goal→category mapping is canonical in `catalog.md`. `footer.md`
  = the global footer (node 0.2): trust strip (delivery/guarantee/payment/returns) + main
  footer (newsletter+support · Stack · Customers · Consultation with phone/chat/Telegram/Viber/
  socials) + **SEO popular-queries block** (categories/types · goals · brands · cities - second
  internal-linking surface; exact list [?] via keyword research) + bottom bar (© · Visa/MC/Pay);
  `catalog.md`
  = the **store taxonomy** (cluster 2): 12 top categories (rebalanced from 14; «Здоров'я» is
  an umbrella with ~10 subcategories incl. men's/women's health) → subcategories → types,
  6 goals as cross-cutting collections (MVP: Набір маси · Схуднення · Відновлення · Енергія ·
  Імунітет · Витривалість), facets; built from real UA catalogs (Belok-based). Full breadth
  ships, rebalanced; catalog population at scale stays the operational [?]. The full sitemap is
  `ia/docs/sitemap.md` / `ia/sitemap.html`. **Cluster 8 expanded June 2026** to back the footer +
  meta-bar promises: 8.7 Discount system · 8.8 Guarantee & certificates · 8.9 FAQ · 8.10
  Promotions (Акції) · 8.11 Store reviews (+ leave review / Google) · 8.12 Newsletter subscription
  (welcome-discount value [?]). Symptom node 2.3 and the city-list [?] are now resolved.
  **Home page (`home.md`, node 0.0, done June 2026):** two non-blocking front doors + a return path -
  a **goal-selector hero** (6 goal tiles = the beginner's one clear step), a **state-based personal
  strip** under the hero (guest hidden / buyer = repeat order / coach = new session), a high trust
  band, a **visible «Для тренерів» block** (coach is a channel, not an edge case), then popular
  categories → products → promo/brands/blog → SEO text. Calm, no countdown timers; mobile tab 1.
  **Quiz / goal guide (`quiz.md`, node 4.x, POST-LAUNCH, drafted June 2026):** a focused **dialog**
  (modal desktop / full-screen mobile) for the beginner - intro → 5 questions (goal · experience ·
  frequency · constraints-multi · format/budget) + a conditional safety insert (meds/chronic) →
  **curated set = a filtered Goal collection (2.2), NOT a single product**. Question order is fixed;
  branching lives in the result mapping. No account. MVP keeps goal tiles; the quiz is the enriched
  later version.
  **Catalog hub (`catalog-page.md`, node 2.0, done June 2026):** the actual «Каталог» page - a
  **navigation hub** (H1 «Каталог» + 6 goal tiles + 12 category tiles with subcategory hints +
  popular + SEO), NOT a product listing (that's 2.1) and NOT the taxonomy. **Three distinct things
  now:** `catalog.html` = **structure/taxonomy** (sidebar group «Структура»); `catalog-page.html`
  = the **Каталог page/hub 2.0** (sidebar group «Сторінки»); `category.html` = the **listing 2.1**.
  **Category content matrix (`category-matrix.md`, done June 2026):** one artifact that populates
  ALL 11 listing categories - per category: facet subset, brand set (from a shared brand pool),
  goals, H1/Title/Description, ready SEO text + FAQ, related. Dedupes shared brands/facets instead
  of 12 separate specs; feeds each 2.1 instance + footer + mega-menu.
  **SEO methodology (`seo.md`, done June 2026):** the project's SEO **engine** - principles,
  keyword model (head/body/long-tail), sportpit keyword clusters (UA), intent modifiers,
  Title/Description/H1 templates, 3-part SEO-text structure, schema-by-page-type, technical
  checklist, generation process. Lets ready optimized UA copy be produced at the IA stage; search
  **volumes stay [?]** until Ahrefs/Serpstat/Keyword Planner. Every page's A–E SEO block draws on it.
  **Docs sidebar reorganized (June 2026):** two IA groups - **«Структура»** (Карта сайту · Хедер
  [was «Навігація»] · Футер · Каталог [taxonomy] · Матриця категорій · SEO-методика) and
  **«Сторінки»** (Головна · Каталог [hub 2.0] · Категорія · Квіз). Two «Каталог» entries by design
  (structure vs page).
  **Category / product listing (`category.md`, node 2.1, done June 2026):** the catalog workhorse
  PLP - breadcrumb → H1 + collapsible trust intro + result count → subcategory chips + «За ціллю»
  goal chips (concern lens) → toolbar (sort/view/active-filter chips) → **filter rail (desktop) /
  bottom-sheet (mobile)** with the `catalog.md` facets → product grid (the canonical home.md card +
  availability states: в наявності/мало/під замовлення/немає→«Повідомити») + ♡ + quick-add «У кошик»
  → **load-more PLUS crawlable numbered pagination** → category SEO text + related brands/categories.
  **Key decision: one shared listing template** serves Category (2.1), Catalog-all (2.0), Goal
  collection (2.2), Brand (2.4), Search (2.5) and the SEO city variant (2.1a) - differing only in
  H1, data scope and SEO block. A–E SEO block includes explicit **faceted-nav indexation control**
  (curated index whitelist; other filter combos → canonical-to-base / noindex,follow) - critical to
  avoid store index bloat. **Default card order = availability-first** (в наявності incl. «мало» →
  під замовлення → немає в наявності last; user sort applies *within* groups). The **SEO body text
  sits at the bottom of the listing** (visible in the wireframe) and is unique per category - ready
  per-category text + FAQ live in the matrix. Open [?] (operational): index whitelist, first city
  landings, per-category copy/FAQ, default-sort weighting.
  **Docs presentation pattern (June 2026):** page specs lead with **§01 «Анатомія сторінки»**
  (one consolidated desktop wireframe of the whole page with inherited header/footer zones) →
  **§02 «Мобілка»** → then the **розбір** (per-block detail, states, A–E SEO, anatomy table,
  locked). `home.html`, `category.html`, `catalog-page.html`, `product.html` all follow this.
  **Product detail / PDP (`product.md`, node 3.0, done June 2026):** the **conversion target of
  every product card** and the home of the trust/verify job (Job 4). Sidebar order in «Сторінки»:
  Головна · Каталог · Категорія · **Картка товару** · Квіз. Breadcrumb → **gallery + buy-box**
  (H1 · brand·country · rating → reviews · availability · one-line plain «для чого» · price + per-
  serving + **coach tier price** · variant pills смак/вага · qty · single primary **«У кошик»** + ♡ ·
  trust micro-row) → **trust block is the LEAD directly under buy-box, not buried** (Склад per-serving
  table · Дозування · Походження · **Сертифікація = real viewable certificate**) → опис (after trust,
  principle #1) → характеристики (mirror catalog.md facets) → **3.1 Відгуки** (rating breakdown +
  list + leave-review = the conversion **recovery**) → **3.2 Питання** → **3.3 Схожі / з цим купують**,
  all rendered on one page → **sticky mobile buy-bar**. Locked: single CTA + sticky bar; lead-with-
  simple-answer; **variants on one canonical PDP** (flavour/size params canonical to base, OOS variant
  disabled not hidden); calm honest availability, out-of-stock → «Повідомити про надходження» +
  back-to-collection (flow recovery, never a dead end); coach-aware CTA «Додати клієнту» + tier price;
  A–E SEO with **Product/Offers (price·availability) + AggregateRating + Review + BreadcrumbList**
  schema. Flow source: `ia/docs/flows.md` "Job 3 - verify product safety". Per-product content
  (composition, dosage, certificate files, reviews) stays the operational/data [?].

**Unified navigation (revised July 2026):** all docs pages (research, personas, jtbd, concept, and
every page-level IA page) share one left sidebar. Top-level items: Дослідження · Персони · JTBD ·
Концептуальна архітектура · **Інформаційна архітектура**. **IA is one top-level section** (link →
Карта сайту/`sitemap.html`) that behaves like the research sections - an **accordion**: its sub-tree
(the «Структура» + «Сторінки» separators with all page links) is shown **only while you are on an IA
page**; on research pages it collapses to the single «Інформаційна архітектура» link (sub-tree hidden).
No JS collapse - driven by which page you're on. All 4 research sidebars were **resynced** to the full
13-link «Сторінки» list. The bottom «Далі» hint = just **Wireframes** on every page. The old per-page
topbar on `ia/sitemap.html` was replaced with this sidebar.

**Artifact format:** Sitemap + IA as numbered cards (`X.Y`, X = flow cluster) with an
INCLUDES list and flow arrows; dialogs and states are first-class nodes. Reference
example: `research/sitemap png example/`. Delivered as **two artifacts** - a lean
schema (structure + transitions) and full per-page specs.

**Locked sub-decisions (June 2026):**
1. Coach model stays **coach-as-buyer** (multi-client ordering), NOT a coach
   marketplace/directory. Coach consulting/consultation remains out of MVP scope.
2. Sitemap and page-level IA are **two separate artifacts**.
3. **JTBD is not changed** - filters, facets, and symptom/concern search are IA
   mechanisms serving existing jobs, not new jobs.
4. **SEO is pulled forward** into the page-level IA (see Deferred section update above).
5. **Auth model (confirmed; page-level done June 2026 - `auth.md`/`auth.html`, node 1.x):**
   one unified sign in / sign up for every role, as dialogs (no full-page redirect, no
   separate coach login, no role tabs). **Phone-OTP-first / passwordless (locked 2026-06-30):**
   step 1 of the dialog is a **single phone field** + consent-offer text + «Отримати код»;
   code via SMS; **secondary methods are buttons** (Google · Apple · E-mail) under an «або»
   divider; **email is also passwordless (code to email)** so there is **no password / no
   forgot-password** (supersedes the earlier email+password sketch). Split layout (sport-nutrition
   visual one side, form the other); new user → name step; **success returns to the triggering
   action**; social OAuth + soft skippable add-phone for new accounts; SMS code has expiry +
   attempts + resend cooldown + rate-limit. Page is **noindex, no schema** (utility, not content).
   Sidebar «Сторінки» order: Головна · Каталог · Категорія · **Бренди** · **Пошук** · Картка товару · Квіз · **Авторизація** · **Акаунт** · **Кабінет тренера** · **Кошик · Оформлення** · **Контент та інфо** · **Системні та глобальні**.
   Coach is a **role activated on an existing account** via a verification flow reachable from both the
   For-Coaches landing CTA and an account section, so coaches never hunt for a login.
   Coach tiering is being explored as **Free vs Pro** (HYPOTHESIS, numbers [?]): Free =
   better-than-retail wholesale + multi-client capped at 2-3 clients, activated instantly;
   Pro = max wholesale price + unlimited multi-client, paid subscription (~99 UAH/mo
   hypothesis, needs unit-economics). This activates the brief's deferred "paid
   subscription tier" - keep as hypothesis, not committed. Watch the strategy-v5 tension:
   the Free price must still pass the coach "price gate", or acquisition suffers; the
   primary persona (5-30+ athletes) effectively needs Pro, so coach monetization =
   Pro subscription + product margin.

**Buyer account (`account.md`/`account.html`, node 7.x, done July 2026):** the **regular buyer's
account**, built as **one shell** - desktop = left **section nav** (profile + counters + «Вийти») +
content panel; mobile = a **menu-hub** screen (tab «Акаунт»). The section set equals the header
«Кабінет» dropdown. Covers 7.0 **Огляд** (dashboard snapshot: bonuses · last order with **«↻
Повторити»** · wishlist · addresses + loyalty progress + become-a-coach banner) · 7.2/7.3 **Замовлення**
(list → detail with **one-tap repeat → cart 6.0**, honest OOS handling - **Job 4**) · 7.4 **Лояльність
і бонуси** (Decision 3 - **two mechanisms**: 3-tier lifetime-spend discount + ~1%/3-month-expiry bonus
account with accrual+burn ledger; **Job 6**; full explainer = 8.7 landing; numbers [?]) ·
7.5 **Адреси** (НП/courier/pickup, default) · 7.1 **Профіль** (**passwordless** - phone/e-mail by code,
**no password**, per auth 1.x; the old sitemap «Пароль» removed) · 7.6 **Обране** (canonical card,
buyer+coach) · 7.7 **Стати тренером / Я тренер** (same entry as landing 5.0 → verification 5.1; coach
cluster 5.x still separate/not page-level). **Private zone → `noindex, nofollow`, no schema** (A–E
exception, like Auth). Coach is a role on top of the same account, not a separate account.

**Coach workspace (`coach.md`/`coach.html`, node 5.x - PRIMARY Job 1, done July 2026):** the whole
cluster in one spec. **5.0 «Для тренерів» landing** (public/indexable - value prop + **Free/Pro**
comparison + CTA, guest → auth first) · **5.1 Стати тренером** (role activated **on top of the
account**; social-link **verification** with waiting/fail-resubmit/**dead-end**/verified states →
tier choice Free-instant / Pro-subscription) · **5.2 Кабінет** (= the **account shell in coach mode**:
tier chip + big **«＋ Нова сесія»** CTA + clients/orders/wishlist) · **5.3 Клієнти + 5.4 Профіль
клієнта** (saved clients + **tag-to-client + per-client history**; client goal drives selection;
per-client repeat = Job 4) · **5.5 Мультиклієнтська сесія замовлення** ★ - client tabs (per-client
subtotals) + active-client panel (goals → **in-session quick-add**, NOT global search → lines with
**coach-tier price** vs struck retail + qty + tag) + session summary → **cart grouped by client (6.0)**.
Per-client loop with recovery (OOS→substitute/skip · **tier price unresolved → session saved, checkout
blocked** · untagged line → assign/discard). **Coach-as-buyer** (Decision 1), not a marketplace; flow
depth intentional (~8 taps / 2-client order). **Mixed SEO:** landing indexes, **work zone 5.1–5.5 =
noindex, no schema**. Free/Pro numbers + wholesale price gate stay **[?]**.

**Cart & checkout (`cart.md`/`cart.html`, node 6.x, done July 2026; revised July 2026):** the
**convergence point** of both flows (product card 3.0 → cart; coach session 5.5 → cart). **6.0 Cart =
right-side drawer dialog, PURE QUICK VIEW** - line items + qty + **just the «Разом» total**; **no
discount/bonus/delivery breakdown in the drawer** (those move to checkout). Each item shows **clear ♡ В
обране / 🗑 Видалити buttons** (buyer + mobile; coach lines show 🗑 Видалити). Coach: **grouped by client**
(per-client subtotals, tier price on lines), **single delivery to the coach** with the breakdown kept in the
order. **6.1 Checkout = one sectioned page** (not a wizard) with a **SIMPLIFIED HEADER** (logo + support
phone only - no nav/search/cart, fewer funnel exits). **Left-column order (locked):** ① **Контакт** - guests
lead with **«Увійдіть для оформлення замовлення»** (phone + «Отримати код», passwordless per 1.x → account
auto-created; secondary Google/Apple/E-mail); logged-in → collapsed prefilled → **Ваше замовлення** (items
moved here from the right rail, with ♡/🗑) → ② **Доставка** (**НП відділення/поштомат · кур'єр · самовивіз
Одеса**; city via dialog 0.1a; addresses 7.5) → ③ **Оплата** (**LiqPay/Wayforpay · Apple/Google Pay ·
накладений · готівка**) → then, full-width under all sections, an **upsell «Не забудьте додати»** (snack
add-ons + «+ Додати») → **simplified footer** (© · legal · support · pay badges). **Right column = money
only & compact** so **«Підтвердити» is always in view**: a **compact bonus block** (balance + spend toggle)
+ breakdown + an **accrual line «★ Нарахуємо +N ₴ (~1%)»** by the button. **Bonuses live ONLY at checkout**,
never in the cart - a **4-state bonus module** (none / has / spend-on / amount-input), shown in a states
gallery. **No standalone payment page** - card pays via the **provider-hosted redirect** (LiqPay/Wayforpay,
PCI-safe) → returns to **6.2 Order placed**; COD/pickup place the order directly. 6.2 → confirmation + next
steps → history 7.2 (repeat, Job 4). Recovery: payment back-to-cart, OOS not orderable. **Transactional →
noindex, no schema**; calm, no timers. Loyalty %/rates + delivery tariffs + payment-provider choice stay
**[?]**. This closes the JTBD page-level gaps (all clusters 0–7 now have page-level IA); next phase =
Wireframes.

**Content, info & legal (`content.md`/`content.html`, node 8.x, done July 2026):** the 13 nodes
(8.0–8.12) specced as **one small template system, not 13 layouts** (same dedup approach as the category
matrix), with a **node→template map**. **7 templates:** **Info page (A)** - covers **8.2–8.6, 8.8** (About ·
Contacts+contacts-block · Delivery&payment · Returns · Legal/**public offer** · Guarantee+**certificate
gallery**): breadcrumb → H1+date → TOC(long) → prose → related · **Loyalty explainer landing** (8.7
«Бонусна програма та знижки» - public/indexable, like the coach 5.0 landing: **2 mechanisms** - personal
discount 3 tiers on lifetime spend + bonus account ~1%/3-month-expiry - + movement example + FAQ + CTA) ·
**FAQ** (8.9,
accordion + FAQPage, separate from product Q&A 3.2) · **Blog** (8.0 listing + 8.1 article, Article schema,
related products → 3.0) · **Promo** (8.10, **calm, no timers** - Principle 4) · **Reviews** (8.11, shop
reviews, separate from product reviews 3.1, AggregateRating on Organization + Google) · **Newsletter**
(8.12, **footer component** with states/double-opt-in, noindex). Serves **Principle 1 (trust first)** -
guarantee/certs/returns/FAQ on show, linked from the footer trust strip + PDP «Сертифікація»; and is the
**second internal-link hub** after the footer SEO block. Content pages index (A–E + schema); newsletter
noindex. Ready copy / certificate files / legal texts / discount numbers stay **[?]**.

**Brand index (`brands.md`/`brands.html`, node 2.4, done July 2026):** the **parallel index** - an «all
brands» page (A–Z card grid: logo · name · country · product count), **structurally distinct** from a brand
*listing* (products of one brand = shared listing template 2.1, `scope=brand`). Anatomy: breadcrumb → H1 +
trust intro → toolbar (brand search · country · category · A–Z) → popular brands → A–Z grid → SEO text. Each
card → the brand listing. Uses the **real 24-brand pool** from `category-matrix.md` (global + UA). Different
intent than a listing (choose by brand trust) + a separate SEO surface; **indexable** (CollectionPage +
Breadcrumb), a second index→listing bridge like the Catalog hub. Entries: meta-bar «Бренди» · mega-menu ·
footer. Product counts / popular / logos / final brand list stay **[?]**.

**Search (`search.md`/`search.html`, node 2.5, done July 2026):** the **known-item utility** (regular
buyer), secondary to catalog nav (grounded: Belok leads with catalog). Two parts - **header autocomplete
overlay** (recent + popular + query completions + categories/brands + product previews, all from **real
project data**: catalog.md, footer 0.2 popular queries, brands 2.4, goals) + **results page = the shared
listing template (2.1)** (default sort = relevance, name-match highlight). **No-results is never a dead
end** (spelling correction + goal tiles + popular + catalog). **Results = `noindex, follow`** (standard SEO
for internal search); WebSite+SearchAction stays site-level. Desktop field always in header; mobile 🔎 →
full-screen. Search engine (typo-tolerance/synonyms/ranking) stays **[?]**.

**System pages & global components (`system.md`/`system.html`, done July 2026):** cross-cutting things
needed before wireframes - **404** (full page w/ header/footer + search + quick links; **HTTP 404 +
noindex**; never a dead end) · **500** (minimal, backend-independent) · **maintenance** (**503 +
Retry-After**) · **cookie-consent banner** (grounded in the UA **Law "On Personal Data Protection"** →
**prior consent, not by inaction**; equal-weight Прийняти всі / Тільки необхідні / Налаштувати; settings
dialog with Необхідні locked-on + Аналітика/Маркетинг **opt-in off**; policy link to 8.6; «Змінити згоду»
in footer; watch Draft Law 8153) · **toasts** (ok/err/info, auto-dismiss, aria-live; critical → dialog).
Removed-product rule 301-to-category vs 410 stays **[?]**. **This closes the pre-wireframe gaps flagged in
the audit (Search + 404 + cookie).**

**Sequence:** (1) full sitemap → (2) inherited component library → (3) page-level IA per
cluster. Output is the "wireframe library" that Phase 2 renders.

---

## 5. Voice (July 2026)

### Voice - Голос продукту (Phase 2, липень 2026)

The product-voice layer for the wireframes - **rules, not mood**. Lives in a new `voice/`
folder: `voice/docs/` = md source of truth; `voice/*.html` = research-style UA visualizations,
wired into the shared left sidebar as a top-level **«Голос продукту»** (with a Voice accordion,
like the IA section). Method mirrors the IA/wireframe lessons: etalon → roll-out via subagents →
audit. Live pages: `voice/voice.html`, `voice/microcopy.html`.

**Two docs (source of truth, `voice/docs/`):**
- **`voice.md`** - the voice rulebook. **5 Принципи** (each = rule + example + anti-example +
  research citation), **Словник** (one-concept-one-word + «ви» form + allowed/replaced anglicisms
  + typography), **Заборонене** (cliché/greeting/exclamation/emoji/urgency stop-list with
  «було→як треба»), **Мікрокопі** (rules per element type + tone-by-state). Every product line is
  written to it.
- **`microcopy.md`** - the text inventory. Розділ A = full verbatim inventory (157 screens,
  3220 rows) · B = divergences · C = UGC (don't touch) · D = cheerful-tone flags · **E** = etalon
  (listing) · **F** = roll-out log + consistency table · **G** = final audit. Two-level: A =
  snapshot, E/F/G = «було→стало» deltas (D4 decision: no full 3220-row «стало» column).

**5 principles:** (1) Спокій замість тиску (trust-first, no urgency/celebration); (2) Проста
відповідь спереду, глибина під нею; (3) Одна дія - кнопка називає результат; (4) Двоє дверей,
два регістри (novice care vs coach business); (5) Стани кажуть правду й дають вихід. Conflicts
resolve to #1 (trust = strategy Objective 1).

**Locked canon (examples):** add-to-cart **«У кошик»** · repeat **«Повторити замовлення»** ·
coach add **«Додати клієнту»** · checkout **«Оформити замовлення» → «Підтвердити замовлення»** ·
retry **«Спробувати ще раз»** · OOS **«Повідомити про надходження» / «Повідомимо, коли з'явиться»** ·
loyalty section **«Знижки та бонуси»** · returns **«Повернення»** · 6 goals **short set**
(Набір маси · Схуднення · Відновлення · Енергія · Імунітет · Витривалість) · tiers **«Free»/«Pro»** ·
**«ви»** form · one apostrophe **'**. Greetings/celebration/«успішно»/exclamations/urgency/unproven
«100% оригінал» removed; trust is **proved** (show склад/походження/сертифікат), not asserted.
Competitor-voice evidence captured in `research/docs/competitors.md` (§Competitor Voice):
the UA category is loud/discount/urgency; Stack differentiates by proving trust, leading with fit
not discount, naming the coach price, staying calm.

**Applied to the whole prototype:** ~250 text edits across ~95 `wireframes/*.html` + shared
`_nav.js` (chrome), by 9 per-cluster subagents from the `listing.html` etalon; then a cross-screen
consistency sweep (0 residual divergences) and a final audit (Крок 7 - defects D1–D3 fixed:
store-voice review replies de-celebrated, error glyph «!»→«⚠», title term). Structure/markup and
UGC (product names, reviews, blog, legal, persona sample data) untouched. Method/prompts = the
Voice lesson pack. **Voice phase complete (Кроки 1–7 + visualization).**

---

## 6. Build journal

Kept verbatim from the old `CLAUDE.md` timeline. These were two table cells; a cell of
36 691 characters is a journal, so it is unwrapped into prose here.

### Phase 2 - Wireframes

Detailed IA complete (page-level in `ia/`, global in `research/`). **Wireframes IN PROGRESS** (`wireframes/` - greyscale clickable prototype). **Флоу 1 (beginner) + Флоу 2 (coach) BOTH COMPLETE + CRITIQUED (Step 9)** - ~64 html. Flow 1: canonical basket (guest 3 999 ₴ / logged-in 3 802 ₴) + checkout-loggedin/noaddr + auth-loading; home promo = IG-stories slider (2–3 vertical cards + 2 stacked side banners, per `home.md`). Flow 2 (PRIMARY Job 1): hand-built 5.5 **coach-session** (client tabs + in-session quick-add + coach-tier price + tag-to-client) + 5 states, then fanned out 5.0 landing · 5.1 verify · 5.2 home (=account shell coach-mode) · 5.3 clients · 5.4 client · 6.0 cart-coach (grouped by client) via subagents; canonical coach data Олена·Pro / Андрій 2 320 · Марія 1 160 · Разом 3 480. Step-9 critique fixed a global `coach.html`→`coach-landing.html` 404, session-state number consistency, coach-shell drift. **Coach order-history (5.6) + order-detail (5.7)** then added - specced in `coach.md`/`ia/docs/sitemap.md` and built (`coach-orders`+empty/loading/error · `coach-order`+loading/error, grouped by client, per-client repeat) plus **coach client-edit (5.4a)** (`coach-client-edit`+confirm - edit modal name/goal/notes + delete-behind-confirm) - **all Step-9 coach IA gaps now closed**. **«Крок 10» - big IA↔wireframe reconciliation DONE (2026-07-02):** 8 parallel read-only auditors (one per cluster) compared wireframe ↔ `ia/docs/*.md` ↔ `ia/*.html`; md specs mostly current, drift lived in stale `ia/*.html` + a few wireframe details. Fixed: **cabinet breadcrumbs unified** (buyer `Головна › Кабінет`; coach cabinet 5.2–5.7 `Головна › Кабінет тренера › …`; verify 5.1 `Головна › Кабінет › Стати тренером › …` - cabinet is a *parallel* zone, not nested, no «Кабінет/Кабінет тренера» repeat); global stale sidebar «Флоу 2 · скоро» → active `#f2` (23 pages); `navigation.md` «Цілі»→«✦ Квіз»; `_nav.js`/`_wf.css` header «✦ Квіз»+«Про нас», footer +Розсилка/policy/socials (5-col grid), rail +Форма/Фасування facets; **`ia/coach.html` regenerated** with 5.4a/5.6/5.7 (+states, data→Олена/Андрій 2 320/Марія 1 160/Разом 3 480/№ К-2041); `ia/category/navigation/product/cart.html` number/label patches; canonical buyer = **Вікторія Коваль**, accrual guest +40 / logged-in +38. Added **«Повна карта сайту» block** to `wireframes/overview.html` - a COMPLETE product sitemap by IA cluster (built → wireframe + view-count, remainder → IA spec); data-driven from a new `WF_SITEMAP`/`wfFullMap()` in `_nav.js` (auto-counts built vs spec-only). **Catalog surfaces built next (2026-07-02):** `catalog-page.html` (2.0 hub - goal+category tiles, NOT a listing), `brands.html` (2.4 A–Z brand index, 24 real brands), `search.html` (2.5 results=listing template + autocomplete overlay/no-results), all +states; registered as WF_FLOWS group `f3`. **Content + loyalty cluster built next (2026-07-02):** 13 pages = 7-template system (content.md) - `content-loyalty.html` (8.7 landing, 2 mechanisms, Job 6) + 6 info-variants (about/contacts/delivery/returns/legal/guarantee) + faq/blog/article/promo(no timers)/reviews/newsletter; fixed a latent `content.html` 404 by remapping 75 footer/PDP/consent anchors to specific pages; WF_FLOWS group `f4`; full map now «35 збудовано · 6 у специфікації». **Interactive navigation + Quiz built (2026-07-02):** the prototype's global nav is now truly clickable - the **Catalog mega-menu (node 0.1, Belok-style)** lives in `_nav.js`/`wfHeader()` on every page (left 12 categories → middle subcategories switch on hover via `wfMega()` → right «За ціллю» 6 goals + «Усі товари»; all real crawlable `<a>`), plus a **«Оберіть місто» dialog (0.1a)** off the 📍 chip (search + 8 popular + full А–Я 24 cities; data `WF_CAT_MENU`/`WF_GOAL_MENU`/`WF_CITIES_*` + `openCity`/`wfPickCity`) and a **mobile burger drawer** (`openBurger`: goals + 12 categories + meta links + city) so the ☰ is no longer dead. **`quiz.html` (node 4.x)** built as a real stepped dialog flow (intro → Q1 goal[gated] → Q2–Q5 skippable → conditional safety insert when meds/chronic checked → result = 4-card curated set «Ваш стартовий набір» + rationale chips + «Додати весь набір · 4 009 ₴»→cart · «Переглянути всю колекцію»→goal.html · inline email-save + «Це не медична порада»); registered in WF_FLOWS f1 + WF_SITEMAP 4.x (ia→file); header «✦ Квіз» + home hero + catalog-hub entry points rewired goal.html→quiz.html. All verified at 1280 + 390 (mega category-switch, city dialog, drawer, full quiz run). **System pages & global components built (2026-07-02):** `404.html` (full page - search + quick links + recovery products, never a dead end, HTTP 404 + noindex), `500.html` + `maintenance.html` (minimal backend-independent templates; maintenance = 503 + Retry-After, no timer), and a `system.html` **component gallery** demoing the two globals now living in `_nav.js`: a **cookie-consent banner** (UA «Про захист персональних даних» - prior consent, equal-weight «Прийняти всі / Тільки необхідні / Налаштувати», settings dialog with Необхідні🔒 locked-on + Аналітика/Маркетинг opt-in off; `wfCookie`/`openCookieSettings`/`wfCkTog`/`saveCookiePrefs`, footer «Змінити згоду» link) and **toasts** (`wfToasts`/`wfToast(type,msg)` ok/error/info, auto-dismiss ~4 s, aria-live). Registered WF_FLOWS group `f5` + WF_SITEMAP cluster S (ia→file). Verified at 1280. Full map now «40 збудовано · 3 у специфікації». **Logged-in account dropdown built (2026-07-02):** `wfHeader(role)` now takes `'guest'` (default, all existing pages unchanged) · `'buyer'` · `'coach'`. Logged-in → 👤 «Кабінет ▾» opens a dropdown (`toggleCab`/`closeCab`, click-outside + ESC close) per `navigation.md`: buyer = name + 🥈 tier + Кабінет · Замовлення · Адреси · Стати тренером · Вийти; coach = name + PRO chip + Кабінет тренера · Клієнти · ＋Нова сесія · Замовлення тренера · Мій профіль · Адреси · Вийти (no «Стати тренером»); «Обране»/«Бонуси» stay separate header elements (Бонуси shows a balance «240 ₴» when logged-in). Wired: `account*.html` → buyer (4), coach cabinet pages → coach (29; coach-landing/coach-verify stay guest). This also fixes the Крок-10 drift where logged-in areas showed the guest header. Verified buyer + coach dropdowns at 1280. **Mega-menu deep-dive (2026-07-02, Крок 15) - start of the detail-polish phase (color/concept deferred; user drives that):** the Catalog mega-menu was fully elaborated from `catalog.md`. `WF_CAT_MENU` now carries the **full taxonomy** (all 12 categories × complete subcategories, grouped «За типом»/«За формою»/concern, per-category goal tags + icons) + `WF_GOAL_MENU` with goal→category mappings. Render is **goals-first** (per catalog.md 2026-07-01): left rail = **✦ За ціллю** first + 12 categories; middle switches on hover - a category shows grouped subcategory columns + «За ціллю» chip row, «За ціллю» shows 6 concern cards; **new right utility+featured panel** (Усі товари · Бренди · Новинки · Акції · Розпродаж + «Хіт місяця» card). `wfMega(k)` is data-key based (`'g'` + indices). Mobile burger drawer upgraded to a **2-level accordion drilldown** (`toggleDrCat` - tap category → its subcategories + «Усі: {cat}»). New **`megamenu.html`** = a spec/states gallery (noindex): §01 anatomy (3 zones) · §02 pinned live interactive mega · §03 mobile drilldown L0/L1 mocks · §04 **full content table auto-generated from `WF_CAT_MENU`** (spec never drifts from the live menu) · §05 the 6 states (closed · open-goals-default · open-per-category · sticky/compact · mobile L0 · mobile L1). Registered WF_FLOWS f5 + WF_SITEMAP 0.1 (ia→file). Verified at 1280 + 390. Full map now «41 збудовано · 2 у специфікації». Remaining IA-only (2): footer component (0.2 - lives in `_nav.js`) · account sub-sections 7.1–7.7 (sections within `account.html`). **Крок 16 - mega-menu as a real OVERLAY + `megamenu.html` reworked (2026-07-02, on user request):** the live mega now opens as a **Comfy-style overlay** - a dark **scrim** dims the page while the panel is open (`openMega`/`closeMega` toggle `.mega-open` on `.wfh`; close on mouse-leave / scrim-click / ESC; `.mega-pinned` forces it open for demos). **`megamenu.html` is no longer an IA-summary** - it's now a **real open-menu wireframe** (like the auth-dialog pages): the actual overlay open over a dimmed faux-home, shown per **state via the prototype bar** - base = Цілі, + `megamenu-protein/health/vitamins.html` (state = which category the menu is opened on). New artifact **`home-catalog.html`** = the homepage **category rail (`.hrail`) opening a flyout as an overlay** (Comfy-home; reuses `WF_CAT_MENU` + `wfMegaCatPanel`/`wfMegaGoalsPanel`, so it never drifts). The descriptive/structure content moved into IA (`navigation.md` §«Realized in the wireframe»). Registered: megamenu states + `home-catalog.html` (WF_FLOWS f3/f5, WF_SITEMAP 0.0/0.1). Verified 1280 (overlay scrim confirmed via elementFromPoint; goals + protein states). Full map «42 збудовано · 2 у специфікації». Method: `docs/playbook/design-wireframes-playbook.md`; contract `wireframes/docs/conventions.md`; coverage `wireframes/_nav.js`; matrix `wireframes/docs/screens.md`; critique `wireframes/docs/critique.md` (§Крок 10). **Voice phase COMPLETE (2026-07-08):** product-voice layer in `voice/` (`voice.md` rulebook + `microcopy.md` inventory + `voice.html`/`microcopy.html`), rolled out to all ~95 wireframes + `_nav.js` (~250 text edits) via 9 subagents from the `listing.html` etalon; cross-screen canon unified (repeat/cart/session/retry/OOS/loyalty/returns/goals/tiers), greetings & cheerful tone removed, competitor-voice added to `competitors.md`; sidebar top-level «Голос продукту» on all 23 doc pages. Full detail in the **«Voice»** section above.

### Phase 3 - Concept & Visual Direction

**IN PROGRESS** (`design/concept/` + `design/`). **Concept stand (Кроки 1–6):** `design/concept/directions.html` (3 напрями верстки) · `design/concept/concept.html` (мова продукту: палітра · типографіка · форма · фото · маскот · іконки · компоненти · «на екрані») · `design/concept/logo.html`; source of truth `DESIGN-artifacts.md` + `design/concept/docs/concept.md`. Locked: **Signal Orange `#FF5A00` = єдиний акцент дії**, Ink `#1C1C1C`, тепла нейтраль, Oswald/Inter/IBM Plex Mono, реалістичний 3D-ведмідь-маскот, Solar-spirit іконки. **UI Visual (Крок 7, `design/`)** - кольорові копії сірих вайрфреймів: сірий прототип лишається сірим і володіє структурою/текстом/станами, копія володіє **лише візуальним шаром** (`_theme.css` вантажиться після `wireframes/_wf.css`, `_uivis.js` = навігація + іконки + PDP-поліш). Збудовано **18 екранів**: лістинг-еталон 2.1 (базовий · списком · з фільтрами · шит · порожньо · помилка · завантаження) + **картка товару 3.0 з усіма 5 станами** (завантаження · помилка · немає в наявності · відгуки Job 3 · тренер Job 1) + **діалог авторизації 1.x з усіма 5 кроками** (телефон · надсилаємо код · код зі SMS · невірний код · новий користувач); карта = `design/overview.html`, бокова рейка на кожному екрані data-driven із `UIV_SET`. **Правило кольору ціни (locked 2026-07-29, `DESIGN-artifacts.md` §3):** ціна **зі знижкою** - в акценті, ціна без знижки - чорнильна; керується даними через `:has()` на закресленій ціні; акцент дозволений лише від **19px bold** (#FF5A00 на білому = 3.13:1 = AA лише для великого тексту). Наслідки: OOS без акценту; у стані тренера жива ціна - **тарифна**, роздрібний блок = довідка (`.retailref`). **Крок 11 - звірка вайрфрейми ↔ ui-visual ↔ IA (2026-07-29):** кольорова PDP пішла вперед структурно, тож 8 дельт спущено назад у сірий (`.bbline` статус-рядок · ціна+дія одним рядом · **лічильник кількості прибрано** · стики-полиця й мобільний бар несуть увесь ціновий факт · доставка рядками з чипом міста · алергени окремим блоком · **етикетка з упаковки в DOM**), greyscale-верстка нових блоків додана в `_wf.css`, спека (`ia/docs/pages/product.md`) і візуал (`ia/product.html`) оновлені. Деталі: `wireframes/docs/critique.md` §Крок 11. **Крок 12 - стан «Відгуки» (3.0) перебудовано (2026-07-30, на запит власника):** дві голі кнопки в підвалі сторінки замінені на **закріплену картку товару збоку від відгуків** (`.revcols` + `.pmini`, sticky на десктопі) + тихий вихід «← Повернутись до колекції» (обидва виходи збережені). Закріплена картка = **канонічна `.pcard`** (той самий компонент, що в сітці лістингу - без власної панелі, без зайвої рамки навколо фото, дія = компактна іконка-кнопка `.cartbtn`), тож вона не може розійтися з мовою карток і успадковує правило кольору ціни. Мобілка: картка **перша** (контекст під банером) і горизонтальна, постійну дію несе липкий `.mbuybar`. База в `_wf.css`, ре-скін у `_theme.css`, сірий `product-reviews.html` синхронізовано. Побічно полагоджено давній дефект **сірого** шару: `.mbuybar` стояв на `bottom:0` під мобільним таб-баром (недосяжний на всіх сірих PDP) - правило з кольорового шару перенесено вниз. Деталі: `wireframes/docs/critique.md` §Крок 12. **Крок 13 - діалог авторизації (1.x) у кольорі (2026-07-30):** авторизація - не сторінка, а **спільний компонент** (`wfAuth()` у `wireframes/_nav.js`, відкривається з будь-якого «Увійти»), тож кольорові `design/auth*.html` - такі самі **референс-рендери**, як сірі: відкривають той самий діалог закріпленим, нічого не копіюючи. Кольоровий шар лише перефарбовує його: `uivAuth()` **обгортає `wfAuthGo`** (діалог перемальовується на кожному кроці, тож разова фарба жила б один клік) + `_theme.css` §AUTH. Рішення: ліва **брендова панель** із маскотом і білою карткою-обіцянкою (двері як запрошення, не пропускний пункт) · **один оранжевий** на крок (Google/Apple/E-mail, повтор, «Змінити номер» - контур і тихі лінки) · **фокус-кільце оранжеве** (акцент = «ви тут», заливка = «це завершує крок») · телефон/код/відлік - **моно** · помилка - серйозний червоний (`--err`), підтверджений крок - спокійний зелений, акцент не бере на себе стани · спінер справді крутиться (`prefers-reduced-motion` шанується) · знак Apple - власний SVG (гліф  порожній поза шрифтом Apple). Прототипна рейка/смуга відсуваються від діалогу (в auth-сторінок немає `.wf-canvas`, який зазвичай зсувають). Карта: `design/overview.html` §Авторизація. **Крок 13а - правки власника (2026-07-30):** ліва панель стала **однією повнокадровою фотографією** - згенерований маскот у залі (Magnific/Seedream з рефом `mascot-pose-present.png`, збережено `design/concept/assets/mascot-gym-a.jpg`, `-b.jpg` = альтернатива); два скрими (світлий згори під лого, чорнильний знизу під карткою-обіцянкою), підпис «спортивне харчування» прибрано (це тепер каже картинка), чип стану став **бейджем у кутку**. Закриття - **тільки ✕**, притиснуте вправо (`margin-left:auto`, 38×38; текст «Закрити» знято в **сірому** шарі, тож обидва шари синхронні). У `_nav.js` додано **`wfAuthDigits()`**: телефон і шість комірок коду приймають **лише цифри**, телефон групується «67 123 45 67» на льоту, комірки коду автопереходять - поведінка живе в сірому шарі, як і належить. Кнопки способів входу отримали **справжні марки** (кольорова Google G, Apple - власний SVG) без сірих плашок, ховер пом'якшено (біле тло + легкий підйом замість чорнильної рамки із заливкою), інтервали до нижньої лінії полагоджено. Виправлено баг фарбування: іконки визначалися за гліфом усередині чипа, тож після першого перемальовування порожній `textContent` збігався з гілкою Apple і E-mail отримував яблуко - тепер ключ = підпис кнопки. **Крок 13б (2026-07-30):** ✕ і заголовок - **в одному рядку** (на десктопі мобільне лого сховане, тож `.auth-top` була порожньою смугою над H1: тепер вона абсолютна в кутку панелі, H1 тримає під неї смугу) · **діалог більше не обрізається**: `.auth-form` став скролером, а `min-height:560px` замінено на `min(560px, 94vh)` - фіксований min б'є `max-height` у CSS, тож на низькому екрані модалка виростала за поля скриму й губила нижній край · **чекбокс opt-in - той самий компонент**, що у фільтрах (стан `.on` додано в сірий канон, оранжева заливка з мальованою галочкою в колір, клік через `uivCheckboxes()`), а не гола рамка без стану. Вирівнювання доведено до кінця: **вордмарк · чип стану · заголовок · ✕ - на одній горизонталі**. Не підібраними відступами, а конструкцією: усе, крім заголовка, - абсолютний бокс, що стартує з тих самих 34px і має висоту **в один рядок заголовка** (`--auth-row`, задається на `.auth-modal` **пошарово**, бо кегль H1 різний: сірий 22px → 34, кольоровий Oswald 27px → 42). Перевірено програмно: усі чотири центри збігаються - 56px від верху модалки в кольорі, 51px у сірому, в кожному стані. **Крок 14 - кошик 6.0 у кольорі (2026-07-30):** `design/cart.html` + `cart-empty` + `cart-oos` (**21 екран**). Рішення кольору (locked 2026-07-30, власник): **знижка їде разом зі своїм товаром, «Разом» - просто сума**. Товар, що на лістингу/PDP іде −15%, несе ту саму закреслену ціну + чип −% на рядку кошика, а його жива цифра бере акцент за звичайним правилом ціни (**один товар - одна історія ціни**); заради цього рядкова цифра піднята до **19px/700** (нижче #FF5A00 на білому = 3.13:1 недопустимий). **«Разом» лишається чорнильним** - це арифметика набраного, а не пропозиція; правило «жодної розкладки в шухляді» не зачеплене: ціна товару - дані товару, розкладка **замовлення** (лояльність, бонуси, доставка) далі на оформленні. При кількості > 1 закреслена цифра масштабується разом із живою (`data-old` × кількість). Зафіксовано в `cart.md` §Locked 9 + реєстрі `_theme.css`. Стан OOS - **факт, а не помилка**: рядок тьмяніє, нейтральний чип каже причину, оформлення лишається **видимим і видимо закритим**, а акцент переходить на дію, що розблоковує крок; порожній кошик відповідає маскотом (як порожній лістинг). Покраска знову спрацювала як QA - **п'ять дефектів у сірому**: (1) компонент шухляди жив у **п'яти інлайнових копіях** (`cart` · `cart-empty` · `cart-oos` · `cart-coach` · `cart-coach-empty`), тож `_theme.css` фізично не міг його перефарбувати → переїхав у `_wf.css` §CART DRAWER, тренерські сторінки лишили самі дельти; (2) **ціна за штуку була перекреслена** (`.ci-old` → `.ci-per`, без закреслення, показ лише при кількості > 1) - читалась як неіснуюча знижка; (3) **три різні відповіді на «скільки товарів»** (шухляда 3 · хедер 2 · оформлення 4) → канон = **позиції**, `checkout.html` виправлено на «(3)»; (4) **керування було мертве** → `wfCart()` у `_nav.js` рахує суму рядка, «Разом», лічильник і хедер з **однієї** величини (`data-unit` на рядку), 🗑 прибирає рядок (останній → стан «порожньо»), ♡ дає тост; (5) **голова шухляди була зрізана прототипною смугою** на кожному сірому екрані кошика → `wfBar()` публікує заміряну `--wfbar-h`. Відкрите [?]: чи має рядок кошика нести закреслену ціну й чип −% для товару зі знижкою (записано в `cart.md` §Open questions). Деталі: `wireframes/docs/critique.md` §Крок 14. **Крок 15 - оформлення 6.1 у кольорі (2026-07-30):** `design/checkout*.html` - базовий (гість) · у кабінеті · без адреси · оплата в дорозі · оплату відхилено (**26 екранів**). Рішення кольору: сторінку тримає **просторове правило** - ліва колонка це **ввід**, права це **рішення**; тому зліва немає жодної залитої дії (обраний спосіб доставки/оплати = **оранжевий контур**, мова вибору), а єдиний залитий оранжевий - «Підтвердити замовлення». Вхід - не покупка, тож «Отримати код» чорнильна: один акцент, одне значення. Рядки замовлення повторюють цінову мову кошика (закреслена + чип + акцент на живій цифрі) - **знижка більше не губиться на переході кошик → оформлення** (закрито відкрите питання Кроку 14); рядки розкладки й «До сплати» - чорнильні моно (на 13px акцент не пройшов би за контрастом), єдина кольорова цифра - **нарахування в бонусному золоті**. «Немає адрес» - бурштинова **задача**, не помилка; відхилена оплата - серйозний червоний, замовлення збережено. Знову п'ять дефектів у сірому: (1) компонент у **п'яти інлайнових копіях** → `_wf.css` §CHECKOUT; (2) **зайняте ім'я класу** - грошова панель `.co-sum` конфліктувала з рядками замовлень тренера (`.cord .co-sum`) → перейменовано на `.co-money`; (3) назва способу доставки **зліплювалась з описом** (`.otn`/`.otd` - інлайн-спани) → `display:block`; (4) три **анонімні флекс-елементи** (`.co-accrual`, `.co-noaddr`, `.cd-oosnote`) розривали повідомлення на дві колонки й ламали «+38 ₴» навпіл → текст загорнуто в `.m`; (5) **мобілка ламала рядок замовлення** («В обране» переносилось усередині слова) → до 560px рядок став сіткою з грошима власним рядком. Плюс **уся сторінка була нерухома** → `wfCheckout()` у `_nav.js` **виводить** грошову колонку з даних (`data-unit` · `data-price` · `data-rate` · `data-balance`): радіо доставки/оплати, кількість, перемикач бонусів і «+ Додати» в апселі одразу переписують суму, знижку, доставку, списання, «До сплати» і нарахування. **Крок 15а - апсел на канонічній картці (2026-07-30, на запит власника):** «Не забудьте додати» був самописним компонентом у білій панелі з рамкою на фото - тепер це **полиця, а не коробка**: заголовок + канонічна сітка `.prow > .pcard` без панелі позаду й без рамки на фото, дія = власна кнопка картки, що після додавання стає спокійною зеленою галочкою. Третій випадок, коли самописна картка розходилась із мовою карток (перші два - `.pmini` у відгуках). Деталі: `wireframes/docs/critique.md` §Крок 15. **Крок 16 - головна 0.0 у кольорі (2026-07-30):** `design/home*.html` - базовий (гість) · покупець · тренер · кошик-полиця (**30 екранів**). Перша сторінка без інлайнових копій - верстка вже жила в `_wf.css`, тож чиста покраска. Рішення: двоє вхідних дверей отримали **два регістри, а не два акценти** - двері новачка (вибір цілі) це місце, де сторінці дозволено співати (шість теплих плиток з оранжевою іконкою; іконки читаються з `WF_GOAL_MENU`, тобто з джерела мега-меню, тож плитки не можуть із ним розійтися), двері тренера - **вугільна смуга з білою дією**: та сама вага, інший голос, без купівельного акценту. Промо-картка зі знижкою - вугільна й **без товару** (рендери йдуть на власній білій підкладці й дають білий прямокутник на кольоровій поверхні; картки з товаром лишились білими, а гучній картці товар не потрібен). Смуга довіри - тихі факти з іконкою на кожен; блогові картки беруть маскота через `background-blend-mode: multiply` і кадруються по висоті. Нове правило: коли на сторінці є **кошик-полиця**, головна дія належить їй - `.cshelf ~ .pstrip .btn.dark` стає контурною, щоб дві залиті оранжеві кнопки не змушували обирати між двома «головними» кроками. Дефект у сірому: у станах `home-buyer`/`home-coach` «Пройти квіз» усе ще вів на `goal.html` (точки входу перевели на `quiz.html` ще в Кроці 14, два стани пропустили). **Крок 16а - головна: справжні картинки замість заглушок (2026-07-30, правки власника):** згенеровано **12 зображень** (Magnific/Seedream, рендери товару як референс, усі в одному світлі на тій самій теплій безшовній поверхні): банер «Новинки» · широкий банер акції · 4 фото смуги довіри · 3 фото статей блогу. Структурно (сірий шар): **смуга довіри → п'ять міні-банерів** `.tbanners` (одна текстова стрічка читалась як дрібний шрифт; кожен банер тепер **справжнє посилання** на сторінку, що доводить обіцянку - ще одна поверхня перелінковки; текстова `.tband` лишилась для лендингу тренерів, у якого своїх фото немає) · **акція тижня → справжній банер** (фото на полотні, твердження ліворуч на теплому скримі, без таймера) · п'ята картка довіри про **голос людей**, тож її несе маскот. **Знак рівня лояльності - банка, що наповнюється**, замість 🥉🥈🥇: медаль каже «ти змагався», а рівень - не змагання; форма та сама, що в товару, який магазин продає, а механіка буквально в малюнку (сума покупок наповнює банку), три рівні заливки × три метали, `uivTiers()` обходить сторінку як `uivCurrency`. Два дефекти в **спільних** правилах, помітні тільки в кольорі: (1) `hcClose()` не знімав `.on` з рейки категорій - рейка, на відміну від колонки мега-меню, лишається на сторінці, тож остання наведена категорія горіла назавжди; (2) `.blogcard` ділили два набори правил, і в старому лишалось `.blogcard:hover .bim{background-size:48px}` - фото статті стискалось від дотику курсора (старий набір видалено). **Логотипи брендів - з belok.ua** (підказка власника; clearbit заблокований на DNS): каталог бенчмарку віддає 30 марок, оригінали дістаються прибиранням `/cache/` і суфікса розміру. З шести брендів на головній belok тримає лише два, тож **вітрину перебрано на шість із нашого ж пулу**, які можна показати - Optimum Nutrition · OstroVit · Power Pro · Sporter · NOW Foods · Mutant (пул у `category-matrix.md` не змінено; BSN відкинуто - жовто-білий знак у сірому зникає). Логотипи **знебарвлені** за замовчуванням, колір бренду повертається під курсором: справжні марки приходять у шести різних стилях, і саме знебарвлення робить із них один ряд. Гніздо відмовостійке: `<img … onerror="this.remove()">` + вордмарк і `.brandbox:has(img) .bnm{display:none}`. **Застереження:** це чужі торгові марки з CDN конкурента - перед публічним показом замінити на офіційні файли. **Крок 16б - герой головної (2026-07-30, правка власника):** рейка категорій - 13 пунктів, а блок банерів був удвічі нижчий, тож ряд героя закінчувався **смугою порожнього білого**. Два малі банери (Новинки · Сезон) переїхали **під слайдер** (удвох в один ряд, заповнюють саме ту смугу), а права колонка стала **однією високою «Пропозицією дня»** - герой отримав третє, що сказати, замість дірки. Пропозиція дня - **картка товару, якій дали місце**, а не окремий жанр: слухається того самого правила ціни (закреслена ціна дає живій цифрі акцент), тож найгучніший товар гучний із причини, яку можна перевірити; таймера немає - назва вже каже строк. Копії малих банерів дано власну колонку (`max-width:60%`), інакше збільшений товар щоразу наїжджав на слово. Розкладка керується `:has(.hdeal)`, тож `home-catalog` (де герой - декорація під демо меню) лишається зі старим розкладом сам собою. Деталі: `wireframes/docs/critique.md` §Крок 16, §16а, §16б. **Кроки 16в–16д - дрібний поліш (2026-07-30/31):** смуга довіри у футері на вузькому екрані (правило «один доказ на рядок» додавало падінги й лінію, але не знімало рамку/радіус/заливку картки, тож телефон отримував чотири коробки) · **пункти меню більше не стрибають**: наведення в рейці головної та в лівій колонці мега-меню міняло насиченість 600→800, довга назва набирала другий рядок і список стрибав під курсором - стан тепер каже заливка + колір + **мітка 2px** (`inset`), метрики недоторканні; попутно шов рейки при відкритті флайаута перестав рости з 1px до 2px (1px рамка + `inset` тінь) · **Telegram і Viber у футері отримали знаки**: спершу мальовані в нашій штриховій мові - на 16px марка Viber (бульбашка + слухавка + дуги) злипалась, тож узяті готові з **одного** набору Flaticon через каталог Freepik/Magnific (бренд-марка це **бейдж**, а не іконка інтерфейсу: залитий диск із вибитим гліфом виживає там, де контур гине), без брендових барв - `currentColor`, сіра в спокої, акцент під курсором. Ліцензія/атрибуція набору - операційне [?]. **Крок 17 - кабінет покупця 7.x у кольорі (2026-07-31):** `design/account*.html` - огляд 7.0 · замовлення 7.2/7.3 · знижки та бонуси 7.4 · обране 7.6 · адреси 7.5 · профіль 7.1 + порожньо / завантаження / помилка (**39 екранів**). Рішення: кабінет - не вітрина, тому **оранжевий** лишається дією і поточним місцем, **золото** (бонусна фарба оформлення) веде лояльність (баланс, прогрес, щаблі, нарахування - це статус, а не дія), а **стан замовлення** говорить кольорами стану (доставлено зелений · у дорозі бурштин · обробляється сірий); рядкова дія лишилась оранжевою, але отримала вагу рядка, «Стати тренером» - контур (запрошення, не покупка). Шість дефектів у сірому: (1) верстка всіх розділів жила в **посторінкових `<style>`** (25 файлів), а `account-empty/loading/error` носили **власну копію оболонки** → усе в `_wf.css` §ACCOUNT SECTIONS; (2) панель профілю звалась **`.pcard`** - іменем канонічної картки товару, тож форма ловила картковий скін і оранжевий ховер → `.pfcard`; (3) `.emptybox` існував у двох розмірах під одним іменем → канон + `.mini`; (4) порожній кабінет показував **іншу людину** (рука-написана рейка «Олег Новак» проти «Вікторія Коваль» у шапці) і свій порядок розділів → `wfAccountNav()` навчено `counts`/`tier`, порожній стан і помилка кличуть **спільний** компонент; (5) журнал бонусів не відрізняв списання від **згоряння** → `tr.burn`; (6) три дії в картці адреси переносились у два ряди. Деталі: `wireframes/docs/critique.md` §Крок 17. **Крок 17а - правки власника (2026-07-31):** (1) **коричневого було забагато** - уся історія лояльності йшла в AA-безпечному бурштині, а «золото» #8A5A0E поруч із бронзою #9A6A3F читалось як та сама бронза; тепер бурштин лише там, де треба стежити (**згоряння бонусів**), а смуга прогресу · банка золота · баланс - **оранжеві**, щаблі й чип рівня - нейтральні (метал живе в банці, не в підкладці; побічно: чип був золотим за будь-якого рівня, тож срібний покупець носив золотий бейдж); (2) **кнопки завеликі** - тема ставить `.btn` 19px (розмір героя), у робочій зоні кнопка = дія рядка → одне правило `.acc-main .btn` 13.5px/10×17; (3) **порожній кабінет обіцяв рівень, якого немає** («🥉 Бронзовий - старт»), тоді як 7.4 правильно казала «Базовий · 0%» - канон узято з 7.4: базовий рівень, порожня смуга, «купуйте на 3 000 ₴ - і відкриється Бронза −3%» + **усі три щаблі** одразу; `uivTier()` навчено **рівня 0** = та сама банка, порожня (сірий гліф-заглушка 🫙). **Крок 17б - драбина рівнів (2026-07-31, правка власника):** досягнутий щабель відрізнявся від недосягнутого лише відтінком рамки, тож драбина не казала ні що вже твоє, ні що далі. Тепер **три ролі - три різні прийоми** (не три відтінки одного) + **слово стану** під кожним щаблем, щоб драбину можна було й прочитати: `done` «✓ отримано» (зелена галочка, біле тло) · `now` «ваш рівень» (акцентна рамка + мітка згори - той самий «ви тут», що в рейці) · `next` «наступний» (пунктирний край, біле тло) · `locked` «ще не відкрито» (тон, приглушена назва); біле тло = «в грі», тоноване = «ще ні» - це вирішує саме **новий акаунт**, де щабля `now` немає взагалі. Спроба, відхилена того ж дня («а чого іконка золота злетіла? стала порожня?»): разом зі станами я спорожнив банку недосягнутих рівнів - але **наповненість банки вже зайнята**, вона кодує *який* це рівень (заливка = ранг, колір = метал), тож «Золото» почало виглядати не «ще не твоїм», а іконкою, що не завантажилась. Відкочено (`uivLadder()` прибрано): **стан - робота щабля, а не знака**; порожня банка лишає єдине значення - рівня немає взагалі (новий акаунт). Урок: перш ніж навантажити знак новим змістом, перевір, **чи не зайнята вже та змінна**, якою ти хочеш його сказати. Підпис стану ніколи не бере акцент (10.5px проти порогу 19px bold) - оранжевий живе в рамці й мітці. Стани в **сірому** (`.lrung.done/.now/.next/.locked` + `.rs`), `.lrung.on`/`.lrung.top` прибрано (максимум = просто `now`); спека - `ia/docs/pages/account.md` §7.4. **Крок 17в - обране 7.6 (2026-07-31, правка власника):** на сторінці, де **все вже збережене**, картка несла ♥ - ще й **порожнє**, тобто екран стверджував протилежне тому, чим є; навіть залите, серце тут може означати лише «зняти зі збереженого». Той самий кутовий слот отримав іншу дію - **«Видалити з обраного» (🗑)**, без підтвердження (повернути можна одним дотиком), тост «Видалено з обраного», спорожніла сітка **на місці** стає станом «порожньо»; серце лишилось там, де воно справді вибір (лістинг, PDP, прев'ю в огляді - там тепер **залите**). Друга половина дефекту - **рахунок**: одне число жило в чотирьох місцях і трьох значеннях (бейдж хедера 4 · рейка 8 · сітка 6 карток) → канон **6**, і видалення переписує всі поверхні одним викликом (`wfWishlistCount` у `_nav.js`); стани дістали свої числа явно (порожній `{fav:0}`, «багато» 42 і в хедері, тренерське 4). Урок: іконка мусить називати **дію в цьому місці**, а не сутність узагалі; лічильник, показаний у кількох місцях, не можна лишати константами. Відкрите [?]: `coach-wishlist.html` каже «спільний список», але показує інші товари - вирішувати на реальних даних. Деталі: `wireframes/docs/critique.md` §Крок 17а, §17б, §17в.

---

## 7. Technical hypotheses (not decisions)

### Tech Stack Hypothesis

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

---

## 8. Alignment with the course pipeline (2026-08-04)

The project was built before the course settled into a fixed structure, so it carried the right
material under its own names. This pass aligned names, navigation and the rules file. Product
content was not rewritten; what moved, moved with `git mv`, and what was rendered stayed rendered.

### What moved and why

| Was | Became | Why |
|---|---|---|
| `voice/` | `voice/` | one address for the stage |
| `concept/` | `design/concept/` | `design/` is the roof of the whole visual half (stages 06-09) |
| `design/` | `design/` | same |
| `design/screens.html` | `design/overview.html` | a hub is always `overview.html` |
| `design/home.html` | `design/index.html` | `index.html` is the home page of the folder |
| `wireframes/index.html` | `wireframes/overview.html` | the hub was sitting on the entry name |
| `wireframes/home.html` | `wireframes/index.html` | same rule, other direction |
| `wireframes/docs/screens.md` and friends | `wireframes/docs/` | md sources live in `docs/` |
| `research/concept.html` | `ia/concept-map.html` | the base IA layer belongs to `ia/`, not `research/` |
| `research/docs/flows.md` | `ia/docs/flows.md` | authored by the base IA layer |
| `research/docs/sitemap.md` | `ia/docs/concept-map.md` | pairs with the page it feeds |
| `research/docs/master-research.md` | `research/docs/research.md` | the synthesis has one name |
| `research/docs/competitive-analysis.md` | `research/docs/competitors.md` | same |
| `DESIGN.md` | `DESIGN-artifacts.md` | this file is the draft from brand and concept (stage 06); the product `DESIGN.md` is formed from code at stage 07 |
| `playbook/` | `docs/playbook/` | process notes are service material, not a stage artifact |
| `tokens/ components/ design-system/ handoff/` | deleted | empty folders ahead of the work; the route is shown by the registry and README |

Links were rewritten in the same pass and checked by resolving every relative `href`/`src` in the
repository (3 300+ references). The links that stayed broken are the pre-existing ones: coloured
copies under `design/` point at screens that have not been coloured yet, which resolves at the
stage-08 rollout.

### Navigation

The sidebar existed as an **inline copy in 29 pages** - markup, css and its own IntersectionObserver
in each. It is now one registry (`/_nav.js`) plus one stylesheet (`/_nav.css`); a page carries an
empty `<aside id="sidebar"></aside>` and declares `NAV_BASE`, `NAV_SECTIONS`, and `NAV_ACTIVE` when
it is a satellite. 161 KB of duplication removed. Status of a page is now one `done:` flag instead
of a manual pass over every file.

Added: `/index.html` (without it the root of GitHub Pages was a 404), `AGENTS.md` (entry point for
the Codex reviewer), `ia/_nav.js` + `ia/structure.html` (node chips), `ia/flows.html`.

**Named deviation from the course:** `design/kit/kit.html` is registered in the roadmap rather than
kept as a satellite outside it. The course keeps the kit off the roadmap; here stage 07 is unfinished,
and an unfinished stage that shows "done" on the route while the README says "in progress" is exactly
the drift the single-status rule exists to prevent.

### Rules file

`CLAUDE.md` was 537 lines and 94 KB, with one line of 36 691 characters, because the journal of every
step was written into it. It is now 184 lines of rules only; the journal is sections 1-7 of this file.
Status now lives in `README.md` and `/_nav.js` alone.

### What this pass did not close

`ia/docs/blocks.md` (block bank by page type), the CJM stage (`cjm-as-is.md`, `cjm-to-be.md` and
their pages), the MVP / later estimate on the concept map, the emotional and social jobs table, the
stage-07 component kit, and the two-instrument critique. Each is named out loud on the surface it
belongs to rather than left silent - see the "Банк блоків" section on `ia/structure.html`.

---

## 9. Order status notification enters the MVP (2026-08-04)

**Decision: option A.** A change of order status sends an e-mail or SMS. Owner's call, taken after the
CJM stage produced the evidence.

**Why.** Zone Z3 of `cjm-as-is.md` - silence during the wait - is one of the three deepest lows of the
map, and all three sit **after the money is paid**. Two independent reviews, taken from hotline.ua on
2026-08-04, describe the same failure four years apart:

- Михаил Морозов, 22.06.2022: ordered ahead for a fixed date, never shipped, "никто не предупредил за
  столько дней"
- Кайзер Билл, 24.12.2021: "Второй день подряд не могут привезти заказ... Сейчас 15:30 никто даже не
  звонил"

The locked MVP answered this with honest status **inside the account**, which only reaches a coach who
thinks to go and look - while both quotes are precisely about nobody reaching out. For Olena the cost
is not her own inconvenience: it is the credibility she spends in front of an athlete who is waiting
(ESJ-1).

**What was rejected.** Option B - keep it out of MVP and accept Z3 half closed. Rejected because the
barrier is sourced, deep, and cheap to close: it adds no IA node and no screen.

**Cost and shape.** A notification, not a screen. The 19 MVP screens and the concept map are unchanged.
Obligations it creates are listed in `cjm-to-be.md` "Where To-Be argued with the locked scope": a
defined set of status transitions (7.2 / 7.3), a line on order-placed saying which channel and when
(6.2), the message text as a product string in `microcopy.md` with the phase-8 tone (honest, dated, no
celebration), an opt-out `[?]`, and the SMS cost per order `[?]`.

**Why this one matters beyond itself.** It is the first MVP item this project added because of
something found in the field rather than decided at the desk. Every other MVP feature was a founder
decision that the CJM stage later supplied a reason for; this one ran the other way.

---

## 10. The contrast gate meets the rest of the product (2026-08-07)

**Decision: ship as is.** Owner's call, taken on the rendered screens, not on a table.

**What was asked.** The contrast gate in `DESIGN-artifacts.md` §3 was written for the **price** -
accent on text only from 19px bold - and every price surface is sized to clear it. It was never asked
of anything else. Step 7.12 asked it: every element carrying `--text-action` across 146 page-states,
measured against the ground it actually sits on rather than a notional white.

**What came back.** Five kinds of small accent text in the store sit under AA 4.5:1 and stay:

| element | size | ground | ratio | screens |
|---|---|---|---|---|
| `a.on` «Українська» | 14 / 600 | page | 3.13 | 34 |
| `.menu-val` «Популярні» | 14 / 600 | page | 3.13 | 17 |
| `.acc-link[aria-current]` «Адреси» | 14 / 600 | surface | 2.97 | 8 (>=960px only) |
| `.lintro .more` «Читати більше» | 14 / 700 | page | 3.13 | 5 |
| `.uiv-cur` the `₴` mark | 11-20.9 | page | 3.13 | ~39 |

Accent on the **inverse** ground already passes (`.hptag`, 5.45) and was not touched. Below 960px the
active account link is an orange fill with an ink label (5.4), so its 2.97 is a desktop-only case.
Three more failures are on the stand's own chrome (`.kn-back`, the stage arrow, `.lvl-n`) - that is
the instrument, not the store.

**What was rejected, and why it is not close.** A darker accent `#D24400` clears 4.5 **only on pure
white** (4.60). On `--bg-surface` it is 4.37 and on `--bg-sunken` 4.04 - still failing on exactly the
grounds these controls stand on - and on the inverse ground it drops to **3.71** where today's accent
gives 5.45. Passing everywhere would need two accent tokens under a light/dark condition, which
contradicts the first colour rule in §3: one orange per view. A second orange to fix a contrast
number would buy the number and sell the rule.

**What stays open at zero cost.** Ink. Every one of the five already carries a **non-text** accent
signal - the accent left bar and pin icon on the account link, the accent tick in the sort menu, the
`btn--inline` underline plus arrow on «Читати більше». Rendered side by side, the ink version loses no
wayfinding and makes the accent rarer, which is what §3 asks of it. It was shown and not taken.

**Why this is written down.** An accepted shortfall that lives only in a chat is indistinguishable
next month from a defect nobody noticed. It is now in three places that get read: the rule file
(`DESIGN-artifacts.md` §3), this journal, and the surface where the roles are actually looked at
(`design/kit/color.html`). The `₴` mark is deliberately outside the argument: it is a unit of measure
half the size of the figure beside it, and that figure clears the gate.

## Step 7.96 - the coach flow is reviewed, and one deletion explains most of it

The owner opened the eight coloured coach screens and said there were a lot of problems on them.
Eight read-only reviewers, one per screen, each working from 390-wide slices plus the markup, the
component file and the accepted buyer twin; then six fix agents grouped **by component file, never
by screen**, so two agents could not meet in one file. Everything below was measured in a browser.

### The one cause

**`class="btn"` paints nothing in this system.** `button.css` has no `.btn` rule at all - its base
block is declared on the four finish classes. At step 7.95 five agents each deleted a screen's
hand-built button rules for the right reason, «the atom owns it», and each assumed an element
already wearing `btn` was therefore dressed. Measured: **ten actions on four screens rendering as
25.6px of unstyled text**, no ground, no edge, no hit area - among them the single action of
`coach-verify` (which carried no class at all) and all three «Додати клієнту» keys of the primary
job. The same deletion-without-a-landing hit four atoms as well: `.cq` had lost the stepper,
`.cc-goals a` the chip, `.opt-tile` the radio, and two fields on `coach-verify` were the user
agent's own inputs in Arial at 22.5 tall. Every one of those files **said in writing what had to
happen next**, and none of it had happened. A deleted rule and an unwritten one are the same screen.

### The values, and this is the part that needed saying out loud

**73 type sizes moved during the 7.95 move: 71 up, 2 down**, across all five coach files -
`coach-session` 20, `coach-cabinet` 19, `coach-clients` 14, `coach-landing` 11, `coach-verify` 9.
Eighteen of them are 12.5 -> 14, which skips 12 entirely. Every GEOMETRY literal in the same files
stayed a literal with a real note, which is what makes this a type-only slip rather than a policy -
and it is why nobody saw it: the files look scrupulous.

**54 `[?]` notes describe a size as untouched while standing beside a declaration that had already
moved.** «12.5px is a half pixel and the scale has none», next to `var(--fs-14)`. The sentence is
true about the grey value and false about the line it is attached to. Two reviewers found this
independently in two different files before it was swept; a hand count in each matched the sweep.

**No value was adjusted.** «Never round it silently» stands, and the ladder decision is the owner's.
All 54 notes were rewritten to say the grey value, the current one, and that a move took it, and
each file carries one block listing its share as a single stage-09 decision.

### Two of my own errors, corrected in place

A brief I wrote said the dead `:first-of-type` cost three hairlines on `coach-home` and four on
`coach-orders`. The agent checked: **coach-orders has no `.cli`, no `.cord` and no such rule.** The
number came from another screen's report and I spread it without measuring - the exact fault this
step is about.

I then wrote into `buy-bar.css` that content had been seen in the 18px band under the buy bar. It
had not. The probe asked `elementFromPoint` what stood there and got the page wrapper, which spans
its own padding and answers the same whether content reaches the band or not - an instrument that
cannot return no. The comment now claims only the arithmetic, which stands on its own: the bar is
89 tall and lifted 61, so it occupies 150px, and the page reserved 132. **`padding-bottom` 132 ->
150**, and that is the only deliberate change to the buyer's product in this step.

### Scoping: `.coach ` is not a guard

Every coloured coach screen carries `body class="coach"`, so a short name written in one screen's
file lands on a different control four screens away. Swept: of twelve candidates, **three actually
leak** - the rest are qualified by an ancestor. `.coach .ci:last-child` was living in
`coach-verify.css` and drawing the coach cart's group edges; it moved to `cart-drawer.css` as
`.cd-group .ci:last-child`, where the rule it cancels lives. Counted: `.cd-group` has 2 instances on
`cart-coach.html` and **0** on `cart.html` and `cart-oos.html`, so it cannot reach the buyer's cart.

### The cart's foot, and a screen that was never alive

The coach cart's foot was **269.75px, 33.6% of an 844 phone**, where the buyer's - after the owner's
7.89/7.90/7.93 work - is 180.59. All 89px was one box, and the product already knew where that box
goes: `cart-oos.html` puts a note that qualifies the cart at the **end of the body**. Moved, no CSS
touched: **269.8 -> 174.2**, and `cart.html` did not move.

**The coach's cart is inert, and always was.** Two presses of «+» leave the value, the line, the
client subtotal and the grand total unchanged; «Видалити» leaves four rows. The grey
`wireframes/cart-coach.html` never called `wfCart()` and never carried `data-unit` - the buyer's has
four. It is a wireframe-stage gap on a frozen layer, not a colour regression, and building
`wfCartCoach()` is the owner's call: the coach cart has a per-client subtotal and a client count
that the buyer's recalc has no idea about.

### Acceptance

Eight coach screens at 360 / 390 / 768 / 1280: zero sideways scroll, zero console errors, zero em
dashes, zero curly apostrophes. All eleven order status pills now read the same green and amber as
the buyer's, to the hundredth of a pixel. The 40 buyer screens compared against HEAD on fourteen
visual keys: **three moved, all by +18px of document height**, which is the clearance decided above.
