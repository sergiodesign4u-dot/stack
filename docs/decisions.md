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

## Step 7.97-7.98 - the coach flow's open decisions, closed

The owner said fix them, and allowed subagents. Four in parallel, split by FILE so none could
meet: the mark passes, the coach cart's arithmetic, the type ladder, and the duplicate primary.
Everything below was measured in a browser, before and after.

### The rule I got wrong, and the omission that caused it

I reported at 7.96 that 73 type sizes had moved silently at 7.95 and that eighteen of them skipped
a rung. **All 73 were correct.** The repo's rule is TWO moves, not one, and I had read only the
second: step 5.5 snaps a half pixel to the nearer whole with the tie going to the **more-read
neighbour** - a table, `12.5 -> 13`, `13.5 -> 13`, `14.5 -> 14` - and only then does step 5.6 snap
that whole to the nine rungs, ties UP. So 12.5 reaches 14 by way of 13 and skips nothing, and
14.5 -> 14 lands on a rung rather than moving the wrong way. `buy-box.css` took the same
14.5 -> 14 at step 6.10 independently.

Worse than the wrong conclusion: at 7.96 I had four agents rewrite 54 notes to say «moved by the
move, not by a decision», replacing one falsehood with its opposite. The notes now say what is
true - the owner decided these at 5.5 and 5.6, and 7.95 applied that decision to screens which had
been outside it because they lived in `<style>` blocks. **No value was changed, at 7.95, 7.96 or
here.**

**The root cause is in `tokens.css` and is now fixed there.** That file compressed both moves into
one paragraph and stated only the tie rule - so the file people open to find out what the ladder is
could not tell them what happens to a half pixel. Three separate passes over the coach files read
it, applied a single nearest-rung rule, and each concluded there was a defect. The table is in
`tokens.css` now, with the two moves named and the cost of the omission written down.

### The marks: an address instead of a list

`uivChrome()` walked six hand-written element ids, and `uivAccount()` - the pass that paints the
cabinet rail - opened with a comment saying the rail is «injected by wfAccountNav, so uivChrome's
fixed id list never sees it». Nine buyer screens called it by name in their init. **Eleven screens
carry `#acc-nav`: eight buyer and three coach, and the three coach ones never called it.** Measured
at 1280: the buyer's rail drew 8 of 8 icons, the coach's **2 of 7** - five 20px slots at
`font-size: 0` holding a raw glyph and no drawing. The two that did draw were caught by a different
pass, because `▦` and `♡` happen to be in `UIV_SIGN_ONLY`.

Fixed by presence, not by a longer list: `uivChrome()` now paints the rail wherever the rail exists.
And `marks.js` gained the **third shape** - a mapped sign that LEADS a label, which neither of its
two maps had - addressed at «a control or a leaf», with three guards so that `+380`, `−15%` and
`× 1 од.` never fire. Font-drawn signs across the 48 coloured screens: **251 -> 174**, SVG marks
**+77**, and every screen's gain equals its loss exactly. Coach rail 2 of 7 -> **5 of 7**; the two
that remain are `👥` and `◈`, which have no drawing in the set, and drawing one is the owner's.

### The coach cart counts

Measured by clicking: two presses of «+» left every figure on the screen unchanged, and «Видалити»
left four rows. The grey `wireframes/cart-coach.html` never called `wfCart()` and carries zero
`data-unit`; the buyer's has four. Inert since stage 04.

`wfCartCoach()` is a **sibling** of `wfCart()`, not a widening of it: the coach's cart has a
per-client subtotal and a client count the buyer's recalc knows nothing about, and widening
`wfCartRecalc` to reach `.cprice` would have reached coach-session and coach-client, which are not
carts. Now: «+»x2 takes a row 1 230 -> 3 690 ₴, its client 2 320 -> 4 780, the total 3 480 -> 5 940;
removing a client's last row drops the group and takes the head from «4 товари · 2 клієнти» to
«2 товари · 1 клієнт».

**And it found a live defect in the buyer's cart.** `wfCartRecalc` wrote the cart's total into the
«Бонуси» button: measured on `cart.html`, the loyalty button read 3 939 ₴ at load and 5 229 ₴ after
one «+», where `account-loyalty.html` - which runs no recalc - reads the true 124 ₴. Cause is the
shape of the selector: `.wfh-act.numbtn` is worn by the cart button AND by «Бонуси», and
`.wfh-act .hb` by the cart badge AND the wishlist badge. Scoped by href. The loyalty button on the
cart now reads «Отримати», the string it was meant to show a guest and which the sum had covered.

### Two primaries, one destination

`wfCoachNav` emits a full-width accent «＋ Нова сесія» at y=302; `.cnew` stood at y=709 with the
same words and the same href, 358x141 in charcoal - and `pixel-proof.html` records step 6.7 taking
the last two black buttons to accent, «there is no black finish in the set». Deleted from the
markup, and its eight orphaned rules deleted from `coach-cabinet.css` after checking in the browser
that `.cnew` matched nothing on any of the 48 screens. **The sentence that explained what a session
IS went with it, and that is the owner's to re-home** - it is the empty state's job, and this
screen's base state has three clients and six orders.

**The accent count did not change, and the claim that it would was mine and wrong**: `.cnew` was
charcoal, so `<main>` holds six accent fills before and after. Four of them are card-level actions
painted like the page's primary - a real question, and stage 09's.

### The two rules that looked like a contradiction

`DESIGN-artifacts.md` locks «label on an orange fill = white»; `chip.css` chose an ink label for the
chosen state, on contrast grounds, tabulating four editions. They are consistent and now say so:
**orange as an invitation takes a white label (3.13), orange as a statement takes ink (5.45)**. Both
ratios and three sources named, zero pixels moved.

### Acceptance

Eight coach screens at 360/390/768/1280: zero sideways scroll, zero console errors, zero em dashes,
zero curly apostrophes. The 40 buyer screens against the committed 7.96 on fourteen visual keys:
thirteen moved and **not one of them moved a font size, a weight, a family, an ink, a border width,
a radius or a token**. What changed is what was decided - more drawn marks, fewer typed signs, fewer
controls under the 44px floor, and `account-orders` 79px taller because eight of its links now clear
that floor.

## Step 7.99 - the coach cabinet gets its last four marks, and the slash stops being drawn twice

Owner, two sightings on the same screen: «нет иконок в боковом меню тренера» and «какой двойной
слеш в кабинете тренера везде».

### The double slash, and why a sweep would have read as a fix without being one

Step 7.39 moved the breadcrumb separator into CSS - `.sep::before{ content: '/' }`, one place, one
value - and swept the 47 typed `<span class="sep">/</span>` out of the coloured markup **that
existed that day**. The grey layer kept its own 211, frozen since stage 05, which is correct. The
eight coloured coach screens arrived at 7.95 as clones of that frozen layer, brought the typed slash
with them, and the CSS added the second one. Measured at 390: **13 of them, on all seven coach pages
that carry a trail**.

Deleting those 13 characters would have fixed the screenshot and nothing else: the next screen
cloned from the grey layer arrives with the same slash. So the rule is stated once, in `uivCrumbs`
in `design/_nav.js`, which already exists to say the two things the frozen markup cannot - the last
crumb is the page, the separator is not read aloud. Now a third: **the glyph comes from CSS, so
whatever character the markup put in the box is a second edition of it and goes**. The box stays; it
carries the `::before` and the 8px on each side. Measured after: `sep` text empty, `::before` `"/"`,
box 4.33px wide - one slash, on all seven.

The characters are deliberately **left in the coloured markup**. That way the guard is exercised on
every load of those seven pages instead of only on the next cloned screen, so a regression shows
immediately rather than silently.

### Four marks, and only two of them were a drawing decision

Counted in the browser at 390 by the opposite question - any character in a text node that is not a
letter, a digit or ordinary punctuation - across the eight coach screens: **13 signs still drawn by
the font**, in four groups.

| sign | where | count | answer |
|---|---|---|---|
| 👥 | «Клієнти», the coach rail | 3 | new glyph `users` |
| ◈ | «Тариф», the coach rail | 3 | new glyph `gem` |
| 🎽 | «Кабінет», the coach tab bar | 6 | **no new glyph** - `cap` |
| 🔗 | the URL field on coach-verify | 1 | new glyph `link` |

**🎽 was never a drawing decision, it was a second mark for one destination.** The coach tab bar
points at `coach-home.html` and drew a running shirt; the buyer account rail points at the same
`coach-home.html` and has drawn 🎓 since it was built (`wfAccountNav`, isCoach branch). Two marks,
one place, in two navigations a coach uses in the same session. The tab takes the mark that was
already the coach's and the set gains nothing.

**`gem` is the hard one, and the reason is a collision, not a metaphor.** The set holds two marks
that almost fit «Тариф» and both are taken on the same screen: `tag` is «Бренди» in the mega-menu,
`card` is «Оплата карткою» in the footer trust strip. Either would have drawn two meanings in two
navigations a person can see at once - the exact fault `icons.js` records about the star. So the
glyph is the sign the prototype itself chose at stage 04 and Voice kept: ◈ U+25C8, a lozenge holding
a lozenge, drawn to the set's anatomy. Not a new metaphor - the same thing `box` did for 📦.

**`users` is `user` with a second person behind**, same head radius, same shoulder curve, same
weight: a client list is many of the person the account rail already draws. The one behind is two
arcs rather than a whole figure - a full circle would cross the front figure's stroke, and an
outline set cannot say which line is in front.

**`link` is on the diagonal**, and that is the whole reason it is not the flat two-C mark every set
draws. Flat it is 9.9 tall against a set median of 18.5 - the fault the `flame` note records, where
a small mark floats over its own line while its neighbour fills the cell. Turned 45 degrees it fills
a 17.4 square, dead centre.

**Both maps carry the three chrome glyphs**, the same discipline the 🗑 row recorded at 7.13:
`UIV_EMOJI` runs over the shop's regions and reaches the rail and the tab bar; `UIV_SIGN_ONLY` in
`marks.js` reaches any leaf whose whole text is the sign, and it is what the stand pages run. 🔗 is
in the second only - a field prefix is not chrome.

### What the glyph exposed: a prefix wearing the country code's class

`coach-verify.html` wrote `<span class="cc pre">🔗</span>` inside a `.field-grp`, copied from the
phone field at 7.96. **Neither class draws anything there**: the rule is `.ph-field .cc`, and `.pre`
in this product belongs to availability.css («передзамовлення»), always compounded. Measured at 390:
the prefix box sat at x 40 inside a group whose inner edge is x 40. **Zero.** The mark was flush
against the border with the emoji too - a square drawing is simply the first thing in that slot with
no side bearings of its own to hide it.

The two prefixes are not one thing. `+380` is content the person is not typing, and its ground and
divider are what say «this part is not yours to edit»; a mark is decoration - it names the field, and
a divider would state something false. So `field.css` gains a second rule addressed by role,
`.field-grp > .ic`, not a wider selector on the first. **The numbers are not new**: `.coach
.cl-search` one screen over is the accepted twin - a lens in front of an input - and it was
measured, not read. 13 from the box edge (12 of padding + 1 of border), 8 to the text, no colour of
its own. This rule uses 12 and 8 and declares no colour. Measured after: mark at 12, text at 8,
group still 44.00.

### Acceptance

The stand's own audit, run on the live set at `design/kit/icons.html`: **56 glyphs, 5 outside the
safe area (spark, bell, card, cart, cap), 8 off centre (bell, truck, cart, download, heart, ret,
star, leaf)**. None of the three new ones is in either list.

Eight coach screens at 360/390/768/1280: zero sideways scroll, zero console errors, zero em dashes,
zero curly apostrophes, and no typed separator anywhere. The 40 buyer screens at 390: the same, and
two known failures that are not this step's - see below.

Counted again after: on the eight coach screens the font now draws **four things and every one of
them is a value, not a sign** - `+` in «+380» and the tariff table, `−` in «−15%», `©` in the footer
legal, and `×` in «× 1 од.».

### Found in passing, not fixed, and each is one decision

- **34 em dashes, every one of them a lone U+2014 in a `<td>`** - the «no value in this cell»
  placeholder, in
  `design/product*.html` (4), `wireframes/product*.html` (4), `ia/*.html` (25) and `voice/voice.html`
  (1). CLAUDE.md forbids the character outright. It is one decision - which character stands for an
  empty cell - and it touches the frozen grey layer, the IA layer and the voice rulebook page, so it
  is not a sweep to make inside an icon step.
- **12 signs that point LEFT and have no drawing**: `←` x7 (four in the auth dialog - «Змінити
  номер» x3 and «Назад до коду» - which locked decision 5 puts on the coach's own path, plus
  `.pmback` on product-oos, product-reviews and overview)
  and `‹` x5 (`.addr-back` on account-addresses and account-profile). The set has `arrowRight` and
  `caret`, both pointing right. Two mirrored paths and two map rows.
- **Three delivery marks in an injected panel**: 📦 🔳 🚚 on `.am-ic` in the address dialog. 📦 and 🚚
  are mapped and still come out as emoji, because `addrStep()` builds that panel after every pass has
  run - the same defect `uivAuthPaint` had before 7.98, and the same one-line answer.

## Step 8.0 - the wholesale strip is a grid, and the link stops falling below-left

Owner, on `coach-home.html`: «переместить кнопку в правую часть и чуть изменить сам блок
расположение элементов так чтобы он стал меньше».

### What was measured before anything moved

| width | height | what it did |
|---|---|---|
| 360 / 390 | **168.0** | chip / sentence on two lines / link, three rows |
| 720 / 768 / 860 | **111.2** | chip + sentence, link below and LEFT |
| 960 | **168.0** | the shell opens its rail, the box narrows, back to three rows |
| 1280 | **111.2** | link below and left again |
| 1440 | **72.0** | one row, link at the right - the only width that worked |

**One row at 1440 and nowhere else**, and that is not a bug in the numbers. Flex breaks a line by
the item's hypothetical size, so the sentence claims its max-content **685.8** before anything is
allowed to shrink; the link does not fit after it and a new line starts. One row needs
45.7 + 12 + 685.8 + 12 + 133.8 = **889.3** of content, so a **921.3** box.

Step 7.96 had already traded `margin-left: auto` away for `flex-grow: 1` on exactly this ground, and
the trade was real: on a wrapped row `auto` means «hard right of MY row», so the link sat alone and
right-aligned under a left-aligned block. Both options were wrong; the wrapping row was the thing
making the choice necessary.

### A grid does not ask the question

`1fr` on the sentence is a share of the free space, not a claim on its own content, so the sentence
takes what is left and **wraps** instead of pushing the link off the line. The link is a column of
its own with `justify-self: end`, so there is no width at which it can fall below-left.

**Two shapes, one boundary, and the boundary is a layout one.** Under 720 the three-column row would
hand the sentence 122.5px and it would run six lines, so the phone puts the chip and the link on the
first row - the link still hard right - and gives the sentence the full width under them. **720 is
the system's own second breakpoint** (15 uses) and it is named for what it is. That is not the
boundary 7.96 refused: that one was 868 / 960 / 1440, three unnamed fit thresholds for one
alignment, and none of them exists any more.

### After

| width | before | after |
|---|---|---|
| 360 | 168.0 | 145.2 |
| 390 / 480 | 168.0 | **122.8** |
| 719 | 111.2 | 100.4 |
| 720 / 768 / 860 / 960 / 1280 | 111.2 - 168.0 | **70.8** |
| 1440 | 72.0 | 70.0 |

The link is at the strip's right edge at every one of those widths. `coach-home` at eleven widths
from 360 to 1440: zero sideways scroll, zero console errors.

### The three `[?]` numbers left with it, and one of them bought back a line

`margin-top: 15` -> `--space-16`, `padding: 13px 15px` -> `--space-12`. All three were flagged in
`coach-cabinet.css` as having no rung; the owner asked for a smaller block, so the smaller number
comes from the ladder rather than from a fresh guess.

**The side inset is 16 only above 720, and that is measured.** At 390 the strip is edge to edge
inside the page's own 16, so 16 more inside it insets the sentence 32 from the screen: at **324** the
sentence runs three lines, at **332** it runs two. Eight pixels are a whole line at that width, and
the line is worth more than the inset on the one width where the two compete.

### And then the sentence became a heading and its detail

Owner, same strip: «надо теперь перенести без обмежень на клієнтів · зекономлено цього місяця
1 240 ₴ [?] на нижнюю строчку под заголовок».

One `display: block` on the detail does it, and it does it **without a width**: the break is
structural, so it holds at 360 and at 1440 alike rather than depending on where the line happens to
run out. Measured: **70.8 at every width from 720 up, unchanged** - the note was already running two
lines there, so the split costs nothing and buys the hierarchy. On the phone it costs one line:
122.8 -> 145.2 at 390, because a break the flow did not need is now being asked for.

**One character of copy went with it, and it is the separator, not a word.** The sentence read
«Гуртові ціни активні · без обмежень…»; the interpunct existed because the two clauses shared a
line, and a separator at the head of the second line separates a line from nothing. Every word is
untouched.

**`.qm` is the prototype's own name** for the `[?]` marker - `wireframes/coach-tariff.html` has
called it that since stage 04. The selector here was `.cnote > span`, which picked the marker only
while it was a direct child; wrapping the detail line would have handed the whole line the muted
grey instead of the marker. Measured after: title rgb(28,28,28)/700, detail rgb(91,91,84)/400, the
sum rgb(28,28,28)/700, the marker rgb(110,106,98)/400 - every one of them what it was before.

**A space between the two, and it is for the reading, not the eye.** Without it `textContent` came
out «…активнібез обмежень…»: two words fused for a screen reader and for anyone copying the line,
while the block break hid it from view. The space sits at the end of the title's line box and
collapses before it is painted - measured before and after, both boxes identical to the tenth of a
pixel.

### «Додати клієнта» moves above the list and takes the full width

Owner, on the same screen: «давай перенесем додати кліента у вверх над списком и сделаем на всю
ширину кнопку».

Below the last row it was the end of a list; above it, it is the card's own action. `btn--full` is
what `button.css` calls «the button is alone in its block» - measured after: 324 x 40 at 390,
834 x 40 at 900, 698 x 40 at 1280, in every case exactly the card's inner width. It stays
`btn--outline btn--s`, which is the rung the card's other in-card actions already stand on: full
width raises its weight enough, and turning it accent would put a second orange fill on a screen
whose one action is «Нова сесія».

**The margin turns over with it.** `margin-top: 13` becomes `margin-bottom: --space-12`, and the 12
is not a new number: `.acard .ah` already sits 12 above whatever follows it, so the button now has
the same air on both sides. 13 was flagged in this file as having no rung.

**And the hairline came back, which is the same fault a third time.** Putting `.cli-add` between
`.ah` and the first row stopped `.ah + .cli` from matching, so the first client row drew its
`border-top` again - one line 12px under a full-width outline button that already draws a line of
its own across the card. That is what the original defect looked like at 7.96, and at 7.60 in
`restock-note.css` before it. The list's first row is whatever the list starts with, and there are
now three things it can follow, so there are three selectors. Measured after: the first `.cli` is
`border-top: 0` and the two below it are 1px, at 390, 900 and 1280.

`coach-home` at 360 / 390 / 720 / 900 / 1280 / 1440: zero sideways scroll, zero console errors.

## Step 8.1 - the marks that point back, three delivery methods, and two places no pass reached

Working the list from the 48-screen census. Four items closed, and two of them were found by
checking a claim rather than by looking for a defect.

### Back was not in the set

12 signs point LEFT across the coloured layer and none had a drawing, while the two that point right
have had one since 7.5. `←` x7 - «Змінити номер» x3 and «Назад до коду» in the login dialog, which
locked decision 5 puts on every role's path, plus `.pmback` and `.oosback` on the product screens -
and `‹` x5, «Інший спосіб» in the address dialog and «Змінити номер» / «Змінити e-mail» in the
profile ones. Going back is half the navigation of every dialog in this product.

**Neither is a new drawing**: `arrowRight` and `caret` mirrored about x=12, the way `arrowDown` is
`arrowRight` turned a quarter. A back arrow that is not the forward arrow reversed is two glyphs to
keep in sync.

**They are in `UIV_LEAD_MARK` and NOT in `UIV_EMOJI`**, and the header of `marks.js` says why: when
`→` went into the region map, every arrow in the footer's and the drawer's COPY was swapped too, 27
of them on cart-empty.html where the page has zero arrows on a button. A back arrow is the same
character a sentence uses; the `^` anchor plus «whitespace then a letter» is what tells a control
from a line of prose.

Measured after, across the 48: `←` 7 -> **1**, `‹` 5 -> **0**.

### The third delivery method had a white square

The address dialog offers three ways to take a parcel. `box` drew the branch and `truck` the
courier; the locker had 🔳 U+1F533, which is not a picture of anything - so the one method a person
picks BECAUSE it is self-service, around the clock, was the one with no mark. `locker` is a cabinet
of unequal cells, which is what a parcel locker looks like and also what keeps it apart from `grid`,
four separate rounded squares meaning the catalogue two taps away in the same drawer.

**And 📦 and 🚚 were coming from the font there too**, which is the 🗑 seam of 7.13 again: both have
been in `UIV_EMOJI` since the account screens were built, so the shop drew them everywhere
`uivIcons` runs - and `#addr-dlg` is not one of those regions. A row in both maps, not a call in one
more place. Measured after: three marks from the set, and the dialog's own «‹ Інший спосіб» with
them.

**The locker was redrawn once before it landed.** At 14.8 wide it read small in the row it actually
stands in - `box` is 16.6 across and `truck` 17.5 - so it went to 16.4. A column of glyphs is judged
against itself, not one at a time, which is the second time the `flame` note's sentence has decided
a number.

### The stand had the owner's double slash

`design/kit/kit.html` rendered «Дизайн-система // Кіт», two of them, while every product page beside
it showed one. The rule written at 7.99 lives in `uivCrumbs` in `design/_nav.js`, which is the
SHOP's runtime: the stand loads `icons.js` and `marks.js` and nothing else. Exactly the seam that
had the stand drawing ✕ ♡ −/+ ▦ ☰ with the font until 7.11 moved the passes into `marks.js`.

**A clean split, not a move.** The typed separator is a GLYPH the markup carries while a stylesheet
draws it, which is the one thing every pass in `marks.js` exists to undo, so `uivSepGlyph` joins the
three there and `uivMarks` runs it. `aria-current` and `aria-hidden` stay in `uivCrumbs`: they are
what the frozen markup cannot SAY, not what it wrongly draws.

### And the overlay head, found by checking my own comment

I added a `‹` row to `UIV_EMOJI` and wrote in the comment that it was «for `.cback`, the catalogue
overlay's own way back». Then I went to watch it work. It did not, and the row was not the reason.

`catOvHead` writes into `#wf-catov-h`; `uivPatchMenus` had been repainting `#wf-catov-body` and only
that, since it was written. Measured on listing.html at 390 with the overlay opened and drilled one
level down: the head read «‹ Каталог … ✕» with **both signs drawn by the font**, while the `›`
chevrons in the body two rows below came from the set. The way back out of a category and the way to
close the whole thing - the only two controls in that bar.

**Two passes, because the two signs answer to different maps**: `‹` is in `UIV_EMOJI` and needs
`uivIcons`; `✕` is in `UIV_SIGN_ONLY` and needs `uivMarks`. Both now run over the whole `#wf-catov`,
head and body, so a third node added to that overlay later is covered by neither list. This is the
eleventh instance of «a pass runs where somebody remembered to call it», and the first one found by
refusing to leave an unverified sentence in a comment.

### Acceptance

The stand's own audit on the live set: **59 glyphs, 5 outside the safe area, 8 off centre**, and none
of the five added since 7.99 in either list. 48 product screens at 390 and 1280, and 86 stand pages
at 390: zero sideways scroll, zero console errors, zero curly apostrophes, no typed separator
anywhere, and the only two failures are the em dashes below.

What the font still draws across the 48, and every one of them is a value or prose: `+` x260 (+380,
amounts), `−` x119 (−15%, ranges), `©` x42, `×` x17 («× 1 од.»), `≈` x3, `→` x2 in running text. Plus
**the 4 em dashes, which are the open decision**, and six signs on `design/overview.html` - the
stage's hub page, which loads the project registry and not the shop runtime, so no pass has ever run
there and `↗` has no drawing in the set at all.

### Two things broke and both were mine

**A comment edit left an orphan `*/` in `icons.js`** and the file stopped parsing. Caught by
`node --check` on every script touched, and the two measurements taken while it was broken were
re-run. The check is cheap and it was not being run; it is now part of the walk.

**And one acceptance run reported «0 failures» over 135 pages that it never visited.** The list was
built into a shell variable and passed as `$P` - and zsh, unlike bash, does not word-split an
unquoted parameter expansion, so 135 names arrived as ONE argument and the walk visited a single
page whose name was the whole list. It printed a clean pass. Found because the same two em-dash
pages failed when asked for by hand a minute later, and the two answers could not both be true. The
run is recorded here rather than quietly redone: an instrument that cannot fail is the same defect
as a check built from the list it is checking, which steps 7.6 and 7.7 both shipped. Command
substitution IS split in zsh, which is why the earlier stand-only run was real; the fix is to pass
`$(...)` directly and never through a variable.

## Step 8.2 - the empty cell gets a sign, and the sign had already been decided once

Owner: «який знак означає порожню клітинку замість - я не знаю дай решение».

### The decision

**`–` U+2013, the en dash.** Three grounds:

1. A bare `-` in the «% добової норми» column of `product.html` reads as a **minus**, and that is a
   column of numbers. Exactly where the misreading costs something.
2. `CLAUDE.md` bans the em dash outright; the en dash is not banned and **already lives in the
   product** as the range mark (`А–Я`), so it is not a new character in the language.
3. It is visually apart from the hyphen the project uses to separate parts of a sentence, so a dash
   in a cell and a dash in a line do not look like one sign doing two jobs.

Verified before replacing: all 34 in html were `<td>—</td>` and all 26 in md were `| — |` - a lone
em dash in a cell, every single one, no prose among them.

### And this had been decided before, by a pass whose log I nearly overwrote

`docs/critique-alignment.md` carries it in writing: **«Named exception, with idle control. A lone em
dash inside a table cell is the "no value" mark, not prose - a bare `-` there reads as a hyphen. 52
spans matched the exception»**, and finding D1 records «3 621 replaced, **60 exempted by a named
rule**».

Sixty. The sweep today replaced 34 in html and 26 in md: **the same 60, arrived at from the other
side and without knowing the first count existed.**

The reasoning was the same too - two candidates, `—` and `-`, and the minus is why the hyphen lost.
That is correct, and it is precisely why a **third** character ends the exemption rather than
documenting it: `–` answers the objection and needs no exception at all. So the earlier finding is
not withdrawn, it is answered, and it says so in place - a superseded decision stays visible or it
comes back next time in the same words.

**It was found by accident.** The owner asked for a decision, the decision was derived from first
principles, and the exemption surfaced only because the sweep reached the md files and the search
output printed that paragraph. A rule that lives in a critique log and not in `CLAUDE.md` is a rule
the next pass re-derives. So `CLAUDE.md` line 120 stops saying «no em dash» and states the whole
thing - `-` inside a sentence, `–` a range and an empty cell, `—` nowhere - replacing the line it
grew from, which is the only way that file accepts a rule.

Seven em dashes remain in the repository and every one is inside backticks, in the three documents
where the character is the subject rather than the text.

### The IA layer was NOT broken, and my own check said it was

Running the walk over `ia/*.html` reported five failures: «typed sep». Measured before touching
anything: `ia/product.html` has `<div class="crumb">` with a typed `/`, loads `_nav.css` and nothing
else, `::before` resolves to `none`, and the box is 3.55 wide. **One slash. Correct as it stands.**

The check was asking «is the separator typed» when the real question is «is the glyph drawn twice».
Typed is only wrong where `breadcrumb.css` supplies a `::before`. Fixed to ask the box.

**And the same wrong assumption was sitting in the fix from 8.1.** `uivSepGlyph` emptied every
`.crumb .sep` it found. `marks.js` does not load on the IA pages today - and «today» is the whole
problem, because the assumption is invisible until the file is included somewhere new, which is
exactly how the stand ended up drawing five signs with the font. Had it been pulled in, all ten IA
separators would have gone and the trail would read «ГоловнаКаталогПротеїн». It now asks the box
whether anything is painting a glyph in front of it, and the answer decides.

### Acceptance

48 product screens and 86 stand pages at 390, 12 IA and voice pages at 1280: zero sideways scroll,
zero console errors, zero em dashes, zero curly apostrophes, no doubled separator. **Zero failures,
for the first time since the walk was written.**

## Step 8.3 - the walk that opens things, and the reason this defect kept arriving

Owner: «да почему у нас всегда какие то "та сама хибна засновка сиділа в моїй же правці"».

The honest answer is not that the codebase is unusually broken. It is that **every instance of this
class was found by accident** - by opening the right screen in the right state, or by checking a
comment, or by a search result printing a paragraph nobody was looking for. There was no way to ask
the question, so the answer arrived one instance per session, and a fix written from one instance is
a fix addressed at one instance.

### The instrument, and it took two wrong versions to get right

**Version one asked my question.** It listed every character that has a drawing in the set and is
still typed. It reported three kinds of thing that are correct on purpose: `−15%` and `+13 ₴` are
VALUES, and the ok toast's `✓` carries `data-uiv-keep` because the set has `check` and `alert` and no
info mark, so two of three drawn is worse than three of three typed - a decision written down in
`design/_nav.js`. An instrument that reports a documented decision as a defect trains you to ignore
it.

**Version two ran more than the product does.** Re-running the passes is the right question, but the
probe handed `uivIcons` ten region ids where `uivChrome` passes six, adding `wf-catov`, `addr-dlg`,
`wf-profile` and `wf-toast` «to be thorough». `uivIcons` does not honour `data-uiv-keep` - that is a
`marks.js` guard - so the walk drew the toast's `✓` itself and then reported it as a defect, ten
times over. **An instrument that runs more than the product cannot say what the product does.**

**Version three asks the system.** Open a state, then run the passes AGAIN and see whether anything
changes. Every pass in `marks.js` is idempotent and says so, so a second run over a state a pass
already reached does nothing; a state no pass reached is exactly where the second run moves. No list
of characters, no list of components, nothing of mine to go stale: the rules are the product's own
and the verdict is a diff. 22 openers x every screen.

### What it found on the first honest run

Sixteen screens, and **one** state: the address dialog, in both modes, **17 marks short each time**.
`openAddr()` and `openAddrEdit()` both call `wfAddrDialog()`, which writes the whole dialog's
innerHTML - so every mark the passes placed is thrown away the moment a person opens it. Step 8.1
had given 📦 🚚 🔳 their rows and verified them by adding `.open` to a dialog that was already built;
the rebuild was never on that path. Missing: `✕` on the close, `›` on all three delivery rows, the
three method glyphs, and in edit mode `📍` and `🗑`.

Everything else the walk can open - auth and its four steps, the catalogue overlay and its levels,
the cart drawer, the city dialog, the mobile drawer, the filter sheet, the client dialogs, the review
modal, the three profile dialogs, the toast - was already correct.

### And it caught the fix's own mistake in the same minute

The first wrapper repainted `#addr-dlg` and left **1 mark of 17** behind. `wfAddrDialog` writes ONE
innerHTML into `#wf-addr`, and that string holds two dialogs: the address form and the delete confirm
`#addr-del`, whose 48px disc carries `🗑`. I had named the container I could see on screen rather
than the one the builder assigns to - the same shape as everything above, committed while writing the
note about it.

The walk reported it on the next run. That is the whole difference: the same mistake shipped four
times before this instrument existed and lasted under a minute after it did.

### The set is four, and now that is a measurement

`uivPatchMenus`, `uivAuthPaint`, `uivToastMarks` and `uivAddrPaint` were each added after somebody
happened to look at the right screen in the right state. It is not a remembered list any more: the
walk enumerates the states and reports **none** across twelve screens. A `MutationObserver` would
cover the same ground and would also repaint every DOM change the product makes for its own reasons;
four named builders plus an instrument that can prove there is no fifth is the smaller claim.

### What the owner needs to supply, and it is not this

Nothing here needed a decision. The two that do are unchanged and both are about the product, not the
code: whether to colour `coach-wishlist` / `coach-tariff` / `coach-order` so the coach's own
navigation stops stepping out of colour into grey, and whether four card-level accent fills may stand
beside «Нова сесія» on `coach-home` when principle 2 says one main action per screen.

### Acceptance

Twelve screens x 22 states: **none**. 48 product screens at 390: zero failures. The address dialog
walked in both modes: three delivery marks, three row chevrons, the close and the way back, all from
the set.

`node --check` on every script touched, before any browser run. It caught the same orphan `*/` twice
in one session; the check costs nothing and the second one would otherwise have been another
measurement taken against a file that was not parsing.

## Steps 8.4-8.5 - the list ends, and three audits say what a walk could not

Owner: «да почему у нас всегда какие то "та сама хибна засновка сиділа в моїй же правці"… можешь
субагентами».

Three read-only audits ran in parallel - hand-written lists in the runtime, on-demand rebuilds, and
CSS addressed at position rather than role - while the browser walk ran here. The split is the one
`CLAUDE.md` states: what is falsifiable in the source goes to a reader, what needs a browser stays
in one.

### The walk said «none» and the walk was wrong

Step 8.3 built an instrument that opens states and re-runs the passes, reported **none** across 32
screens, and concluded the set of on-demand builders was closed at four. Both audits came back with
four more. The instrument was right; **its openers were a list I typed from memory**:

- `openClientDlg` and `openClientDel` are not functions in this product. The real names are
  `openClientEdit` and `openClientNew`, so those two lines were skipped in silence on every run.
- `profStep` does not rebuild anything. `openProfPhone` does.
- `wfAuthDone` was not in the list at all.
- And one early opener NAVIGATED the page, after which the probe said «no `uivMarks` here» and the
  loop **broke out** - so every opener after it was skipped, on every screen, and the walk printed a
  clean pass.

The instrument built to find this defect had this defect. It now asks the page what it can open -
every global function matching the product's own naming convention, enumerated at runtime - and it
puts the page back when an opener navigates instead of giving up on it.

Re-run, it finds by measurement exactly what the audits found by reading:

| state | marks lost |
|---|---|
| `wfAuthDone` - header, drawer, tab bar, footer | **585 across four screens** |
| `openClientEdit` / `openClientNew` | 8, twice |
| `openProfPhone` / `Email` / `Lang` / `Delete` | 6, four times |
| checkout upsell - the new line's stepper | 2 |

**`wfAuthDone` is the one that matters.** It runs when anybody finishes signing in, on every
coloured screen, and it takes the whole chrome back to raw emoji - measured on listing.html, **120
marks to 0**. Locked decision 5 sends every role through that dialog.

### So the answer is not a fifth wrapper

Eight instances, one shape, and each time a wrapper was added and the set declared closed. That is
the definition of the defect. `uivObserve` runs the passes on anything that appears after they
finished, and what it may do is bounded by what each pass is safe for: **`uivMarks` on every added
subtree**, because it is addressed at a control or a leaf; **`uivIcons` only when one of the six
chrome regions is what changed**, because it is a blanket text-node swap and this file records what
happened when `→` entered `UIV_EMOJI` - 27 arrows swapped inside footer and drawer copy. A category
glyph like 🥛 lives in `UIV_EMOJI` alone, which is why the header rebuild needs that half at all.

Re-entrancy is one flag held across the sweep; every pass is idempotent, so a mutation missed under
it would have been a no-op. `uivToastMarks` stays and must: it sets `data-uiv-keep` on the status
glyph synchronously inside `wfToast`, before the observer's microtask, which is what keeps the ok
toast's ✓ from being drawn while the info toast has no glyph to be drawn with.

After: the walk reports **none** across every screen it opens, `wfAuthDone` included.

### And the CSS audit found three, one of them mine

**`checkout-form.css` - the fourth `:first-of-type`.** `.co-line:first-of-type` matched **nothing**:
the section opens with `<div class="co-sec-h">`, so the first order line is div number two. All three
rows drew the hairline, including the one under the section's own header.

**Worse, in the same file: every product photo was wrong.** The three thumbnails rotated by
`:nth-of-type` and the same off-by-one shifted them - «Gold Standard 100% Whey» showed the creatine
tub, «Iso Whey Zero» the pre-workout, «Creatine Monohydrate» the whey. Three rows, three wrong
pictures, on the screen where a person confirms what they are buying. A rotation cannot be repaired
by shifting it: the row says what it holds now, `data-img` beside the `data-unit` it already carried.

**`cart-drawer.css` - and step 7.97 made it.** `.cd-group:last-child` was true when it was written
and stopped being true in the same batch, because 7.97 moved `.cd-note` out of the drawer's foot and
appended it to `.cd-body`. Measured: `.cd-group` 2, `.cd-group:last-child` 0, two horizontal rules a
pixel apart under the last client group.

**`city-dialog.css` - drawing on an accident.** `.city-lbl:first-of-type` is correct today only
because the element above it is an `<input>` rather than a div. It says `.city-search + .city-lbl`
now, which is the relationship that was the reason for the rule all along.

All three take the `+` idiom the system already uses correctly in `trust-strip.css`,
`coach-landing.css` and `footer.css`: **the divider belongs to the gap between two rows, not to one
row's position.**

### Acceptance

48 product screens at 390 and the touched ones at 1280: zero failures. The state walk: none.
Measured after: checkout row 1 no border and 2px top with the whey photo, rows 2 and 3 a 1px hairline
and 12px, creatine on the creatine; coach cart one divider between the two groups and the note's own
line above itself, none doubled; city labels 0 and 16.

### Still the owner's, and unchanged

Colouring `coach-wishlist` / `coach-tariff` / `coach-order` so the coach's navigation stops stepping
into grey, and the four card-level accent fills beside «Нова сесія» on `coach-home`.

## Step 8.6 - the four accent fills on coach-home: nothing to change, and my framing was the defect

Owner: «що робити з чотирма помаранчевими заливками поруч із "Нова сесія"». The question was mine,
carried forward from 7.98 as «four card-level actions painted like the page's primary». Measured
before answering, and the framing does not survive the measurement.

### They are not four card-level actions. They are two other atoms.

| control | what it is | accent instances in the product |
|---|---|---|
| `＋ Нова сесія` | this screen's primary | 1 |
| `↻ Повторити` x2 | the reorder action | **15** - 4 of them in the buyer's own `account-orders` |
| `🛒 У кошик` x2 | the add-to-cart atom | **96, across 18 screens** |

Neither is painted «like the primary». Each carries the accent by a rule that already runs across the
product, and reorder's rule is locked decision 4 - «one-tap repeat from order history in MVP».
Changing them on `coach-home` alone would not tighten the accent; it would make one screen disagree
with eighteen.

### And no viewport ever shows two of them

Principle 2 says «exactly one main action per screen», and a screen is what a person sees. Measured
at 390, viewport 844, document 4321:

    y  302   ＋ Нова сесія        white label
    y  366   Огляд (chosen tab)   ink label
    y 1707   ↻ Повторити          white label
    y 1871   ↻ Повторити          white label
    y 2313   🛒 У кошик  x2        white label

The primary and the nearest «Повторити» are **1353px apart** - a person would have to scroll past a
viewport and a half to see them together, and they never appear in one. The cart buttons are 2011px
down.

**The one accent pair that does share a viewport is 8px apart and is already a written decision**:
`＋ Нова сесія` at 302 and the `Огляд` chip at 366. `DESIGN-artifacts.md` settled that at 7.98 -
an ACTION takes the white label (3.13:1), a CHOSEN STATE takes the ink label (5.45:1), and the two
orange grounds standing together is what that note exists to explain.

### The answer

**Nothing changes.** The finding was a count taken with `getComputedStyle` over `<main>` and never
walked in a browser - it recorded that five fills exist on one document without asking whether any
two are ever on screen together, or whether the controls belong to this screen at all. Both answers
were available from the rendered page.

If the accent is ever to be tightened here, the one defensible move is narrower than the finding
was: outline `↻ Повторити` on the SUMMARY card (`coach-home` shows two of many orders) and keep it
accent on `coach-orders`, which owns the list. One rule, one file, and it would need measuring on
both screens. Not recommended today - it would be the only place in the product where reorder
changes weight by which screen it stands on.

## Step 8.7 - the three screens the coach rail pointed at, and the rail that never said where you were

Owner's call: colour `coach-wishlist`, `coach-tariff` and `coach-order`.

### The registry closed the three doors before any paint was applied

`uivFixLinks` rewrites a link whose destination has no coloured copy so that it lands in the grey
layer - which is correct, and which is exactly what the coach's own navigation was doing: **«Обране»
from six coloured screens, «Тариф» from three, «Деталі» of an order from three**. A coach in the
coloured prototype stepped out of colour mid-task, by an ordinary tap.

Registering the three in `DESIGN_NAV` fixed all three the moment the files existed. Measured on the
rail and the tab bar after: «Обране» -> `coach-wishlist.html`, «Тариф» -> `coach-tariff.html`,
«Деталі» -> `coach-order.html`, and none of the three appears in the grey-exit list any more.

**One exit stays and it is not the coach's.** The tab bar's «Каталог» still resolves to
`../wireframes/catalog-page.html` - and the BUYER's tab bar does the same, measured. One shared page
with no coloured copy, identical for both roles, outside A13.

### And the rendered screen showed something no source read would

`coach-wishlist` came back from its colouring pass with the section chips reading «Огляд · Клієнти ·
Замо…» and no mark on any of them, while `aria-current="page"` sat correctly on «Обране». The rail is
a 358px scroller holding 1103px of chips at 390, `scrollLeft` 0 always. Measured across every screen
that carries one:

    coach-home        0..105   visible      account            0..105   visible
    coach-clients   113..267   visible      account-orders   113..307   visible
    coach-orders    275..462   OUT          account-loyalty  315..504   OUT
    coach-wishlist  470..622   OUT          account-wishlist 512..665   OUT
                                            account-addresses 673..826  OUT
                                            account-profile  834..955   OUT

**Seven of ten.** On a phone the only sections that showed you were standing in them were the first
two of each rail; the accent bar, the ink and the ground that answer «where am I» were being drawn
outside the 358px anyone can see. Four buyer screens had been like this since the account was
coloured.

`uivRailCurrent` scrolls the box, not the page: `scrollIntoView()` would move every scrollable
ancestor and jump a long account page to its own rail on load. The guard is a question rather than a
width - a rail that does not overflow is the desktop's vertical list, and `scrollWidth >
clientWidth` is false there, so no breakpoint has to be kept in sync with `account-shell.css`.
After: ten of ten show their current chip, each with 16px of lead, and the two that were already
visible did not move.

### What the colouring passes found

`coach-wishlist`: four favourite buttons, three cart buttons and one notify button were rendering as
**16.8 x 25.59 of unstyled text** - the `class="btn"` defect from 7.95 again, in a screen cloned
after it. Now 44 x 44 on the atom. And four `.pavail` lines carried a typed `●` while
`availability.css` has drawn that disc from `::before` since 7.35: every card showed two dots.

`coach-order`: the status pill was a private edition - 112.16 x 27.19, ink `rgb(28,28,28)`, no
ground - and now reads its twin on `coach-orders.html` to the hundredth of a pixel, ink
`rgb(46,125,70)` on `rgba(46,125,70,.07)`. `.cprice .old` was `rgb(170,170,170)`, **2.32:1**, and
took `--text-muted` at **5.4:1**. Three action buttons were unstyled text and are now 52 tall.

**A report that did not survive checking.** The wishlist pass reported that the `♥` in the injected
empty state stays a font glyph «because that text is injected after `uivMarks()` has run». Measured:
the empty box holds **2 svg marks, zero font characters, and re-running the passes changes nothing**
- `uivObserve`, added at 8.4, catches it. The note was read out of a file comment written before the
observer existed rather than off the running page.

### Acceptance

`coach-wishlist` and `coach-order` at 360 / 390 / 768 / 1280: zero sideways scroll, zero console
errors, zero em dashes, zero curly apostrophes. The state walk on both: none. The font still draws
only values on them - `+` in a phone number, `−` in `−15%`, `×` in «×1», `©` in the footer.
The ten rail screens after the scroll fix: acceptance clean at 390, and no rail scrolls at 1280.

### The third screen, and a bug of mine in the clone

`coach-tariff` came back with something the other two did not have: **its cancel dialog could not
open at all.** The screen carried its own `tfCancelOpen` / `tfCancelClose` and an Escape handler in
an inline `<script>`, and the clone script that produced the coloured file cut everything from the
first `<script` tag onward - so every press threw a ReferenceError. Restored verbatim. Checked the
other two afterwards: both carried an init line and no functions, so the cut was correct there. One
screen affected, caught by the pass that owned it.

Its own findings: three controls were **25.59 tall unstyled text**, 18.41px under the floor, and are
52 now; `.tfov` / `.tfdlg` were a third edition of the scrim and dialog `overlay.css` and
`client-dialog.css` already own; the confirm pair overflowed a 360 viewport by **27px sideways**,
with the destructive button the part hanging off the edge. `.tf-compare` was KEPT under its own name
with the reason written down - `coach-landing.css` draws a shared-row matrix, this is two
independent cards with nothing to align across the gap.

### Two agent findings that measurement disproved

Both were of the same shape: read out of a file comment written before a fix existed, rather than
off the running page.

- «The `♥` in the injected empty state stays a font glyph.» Measured: **2 svg marks, zero font
  characters, re-running the passes changes nothing.** `uivObserve` (8.4) catches it.
- «The dialog's disc holds `◈`, which is in no icon set.» Measured: `.cedlg .ic` holds **1 svg**, its
  text is empty. `gem` was drawn for that sign at 7.99 and both maps carry it.

### And one the census caught that no report mentioned

`coach-tariff` typed **«● Активний»** into the status pill. `status-pill.css` has no `::before`, so
this was not the double dot `.pavail` had - it was one pill of eight wearing a mark the component
does not use, while every other `.oc-status` in the coloured layer reads «Доставлено» with nothing
in front of it. The character is gone from the markup, where it was typed.

`•• 1234` on the same screen STAYS: it is a masked card number, the only one in the product, and `•`
there is content rather than a sign the set should draw. The census flagged it because its
punctuation list is deliberately narrow, which is the instrument being conservative.

### Acceptance, all of it

**51 screens at 390 and at 1280: zero failures** - no sideways scroll, no console errors, no em
dashes, no curly apostrophes, no doubled separator. The state walk on all three new screens: none.
The three destinations no longer appear anywhere in the grey-exit list of the nine coach screens.
The font draws only values on them: `+` in a phone number, `−` in `−15%`, `×` in «×1», `©` in the
footer, and the masked card.

### Open, measured, and not this step's

Three `<a>` under the 44 floor on every screen that has a trail: `.crumb a`, **15.00 tall** at all
four widths, drawn by `breadcrumb.css`. `link-row.css`'s 7.98 census did not include breadcrumbs.
Recommendation: **leave it.** `breadcrumb.css` calls the trail «orientation, not content - a person
reads it when they are lost and skips it when they are not», every destination in it is reachable
from a control that does clear 44 (the header, the rail, the tab bar), and growing it would push the
H1 down about 29px on fourteen screens to make a redundant path easier to hit. The same reasoning
`link-row.css` already applied to `.auth-sub a`.

## Step 8.8 - five things the owner saw on a phone, and one was two halves of one file

All five were found by looking at the rendered screen. Each is measured before and after.

### 1. 28px between the trail and the first card

`.crumb` closes with `padding-bottom: 12` and `.acc` opened with `margin-top: 16`: **28px**, and
neither rule knew the other existed. `listing` and `product` measure **0** there, because what
follows their trail carries its own top padding. `breadcrumb.css` owns the air under the trail and
declares it - 16 above, 12 below - so `.crumb + .acc` takes 0 and the grid keeps its 16 for any page
that opens without a trail. Measured after: **16 -> 0** on coach-home and on account.

### 2. The white panel behind the mobile chips, and it was not a background

Owner: «у чипсов меню я би убрал белий фон подложку». Measured: the ground was **transparent**. What
made the panel was a 12px radius and `--elevation-1`, declared in an **unscoped rule at the bottom of
`account-shell.css`** - seventy lines below the structure block that had already written
`border: 0; border-radius: 0` for exactly those widths. Two halves of one file deciding one box, and
the later one won, so a soft card outline floated behind seven pills that each carry their own edge.
The colour rule now lives inside the same `min-width: 960px` the vertical rail does. After: radius 0,
shadow none, border 0 under 960.

### 3. «Усі клієнти →» broke before its arrow

Measured at 360: «Усі клієнти →» 91 x 44.8 and «Усі замовлення →» 128.8 x 44.8 - **two lines, with
the arrow alone on the second**. The link was `flex: 0 1 auto`, so the row shrank the CONTROL and
left the caption beside it at full width. It is `flex: none; white-space: nowrap` now, and the
caption is what wraps, which is what a caption is for. After: all three headers one line.

### 4. The restock row squeezed the sentence into a ribbon

At 360 the row is 294 wide and held a 40 avatar, a 97.8 button and two 12 gaps, leaving the text
**132.2px**: the name broke over two lines and the sentence ran five, for a row **180.7** tall.

`flex-wrap` alone does nothing while every item still fits, and `min-width` alone was worse - with a
basis of `auto` the sentence's max-content is what the row measures, so the text took a whole line of
its own and the row grew to **195.2**. `flex: 1 1 200px` is the honest form: 200 is what the text
needs, it grows into what is left, and the BUTTON is the item that drops. After: **143.2** and the
name on one line. Above the breakpoint nothing moves - the three fit at their natural sizes and the
wrap never fires.

### 5. Every goal chip said «a goal» where the product says WHICH goal

Owner: «у нас есть иконки под цели, я би их тут и использовал». There are - the catalogue overlay's
«За ціллю» list has drawn one mark per goal since the prototype was built, and all six already have a
drawing and a `UIV_EMOJI` row: 💪 trending · 🔥 flame · 🌿 leaf · ⚡ bolt · 🛡️ shield · 🏃 pulse. The
client cards typed 🎯 for all of them. The generic target is right on «За ціллю», the ENTRY to the
list; it is not right on a chip that names one.

`uivGoalMarks` reads the chip's own label and looks it up in `WF_GOAL_MENU`, the map the product
already keeps - so a client card added on another screen is answered the day it appears, and a
seventh goal is answered by the row that defines it. It runs after `uivMarks`, so it only swaps the
drawing inside a box that already exists: if it never runs, the chip keeps a correct generic mark
rather than losing one.

**And the same chip was optically misaligned.** It was `display: inline-block`, so the drawing was an
inline box taking `vertical-align: middle` - centre at the baseline plus half an x-height, about 3px
below the label's own centre at 12px. Measured: icon 699.34..711.94 against text 696.92..711.92, the
bottoms agreeing and the tops not. `inline-flex` + `align-items: center` is what every chip in
`chip.css` does and it asks no question about x-heights; the gap has to be declared with it, because
`marks.js` keeps the space the author typed and that space collapses at the start of a flex line box.
After: **6.3 above and 6.3 below, on all three chips.**

### Acceptance

51 screens at 390 and at 1280: zero failures. The ten rail screens still scroll their current chip
into view. The three goal chips carry `trending`, `flame` and `pulse`.

## Step 8.9 - the one link in the mega menu that did nothing

Owner: «в чего у нас не подсвечивается в мега меню» - «Усі товари каталогу →».

Walked with a real mouse, with the panel opened by its own `mega-pinned` class, and every reading
guarded by `elementFromPoint`: measured at 1440, panel 940 x 625 at (244, 119).

    .ms-lead        NO HOVER    ink, and nothing moves
    .ms-link        ok          grey -> accent, underline appears
    .mph            ok          ink -> accent
    .ms-feat        ok          border -> --line-action
    .mega-goalcard  ok          border -> --line-action
    .mgchip         ok          ink -> accent

**The loudest line in the shelf column was the only one that did nothing under the cursor** - and it
is the way into the whole catalogue. `header.css` already keeps one answer for a text link in that
panel, so `.ms-lead` joins the list rather than getting a rule of its own: fourth name, same
declaration. Its arrow is a `currentColor` svg, so the mark moves with the word - the loud rung's own
rule about a two-tone hover reading as a rendering bug. After: `rgb(28,28,28)` -> `rgb(255,90,0)`,
word and arrow together.

### Three attempts at the measurement answered about a point that was not there

The first probe scanned `document.styleSheets` for `:hover` selectors and reported **no hover on any
of the nine link families**, including three that demonstrably have one - it never saw rules nested
in `@media`. The second used `CSS.forcePseudoState` and disagreed with itself: it said
`.mega-goalcard` had no hover while the rule was right there in the file. The third moved a real
mouse and reported `NO CHANGE` for `.ms-link`, `.mega-sub` and `.ms-feat` - because the panel had
been forced visible with `style.display='block'` rather than opened, so those three sat **off-screen**
and the cursor was over nothing.

Only the fourth asks the honest question: open the panel the way the CSS does, then ask
`elementFromPoint` whether the cursor is on the element, and **refuse to answer** where it is not.
That is the third «instrument that cannot return no» this project has written down, and the first one
caught before it was believed rather than after.

### Acceptance

51 screens at 390 and at 1280: zero failures.

## Step 8.9b - two corrections on coach-home, and the first one was mine from an hour earlier

### The wrap was written one level too high

Owner: «тут что-то стало плохо, раньше было лучше, там напротив было имени».

Step 8.8 fixed the restock card by putting `flex-wrap: wrap` on `.coach .cli` - and **two cards use
that row**. The restock nudge needed it; the client summary did not. Measured on the summary after
8.8: «Профіль →» left the name's line and dropped under the goal on all three rows, and the third row
pushed its text below the avatar as well. A one-line row became three.

`flex-wrap` now sits on `.coach .crestock .cli`, beside the two rules that were already scoped that
way in the same edit - so the wrap was scoped correctly in two places out of three, in one sitting.
Measured after: the summary row is back to **91.2** and `nowrap`; the restock row keeps its **143.2**
and its wrap.

Same fault this file records at 7.96 (`:first-of-type` matching nothing) and at 8.0 (`.ah + .cli`
losing its match): a rule that answers one card's question, written where every card can hear it.

### And a rule whose reason expired in the batch that wrote it

Owner: «тут у нас попливли кнопки».

`.coach .cord .co-sum` carried `align-items: baseline`, and the comment beside it gave the reason:
«the money is the tallest thing in the line and the two buttons should sit on its baseline, not float
against its box». That was true while the two actions were text LINKS at 78.04 x 19.20 - and **7.96
turned them into buttons**, which the paragraph directly above records in its own words.

Measured at 360 and 390: the money is 59.5 x 25.6 and each button is 40 tall, so the money became the
SHORTEST thing in the line and `baseline` was hanging two 40px boxes off a 25.6px baseline. The row
measured **44.1** where its own controls are 40. `center` is what the row was always describing.
After: **40.00**, the money's centre on the buttons' centre.

Neither of these is a new class of defect. Both are a REASON that stopped being true while the
sentence stating it stayed on the page - which is the argument for writing the reason down at all,
because a rule with no reason beside it cannot be caught this way.

### Acceptance

51 screens at 390 and the five rail screens at 1280: zero failures.

---

## Step 8.10 - the eight leftovers, and what a census said about six of them

The owner asked what was left and got three piles: the ones that need no decision,
the ones that are theirs, and the ones that wait for stage 09. This is the first
pile, done in one step. Every item on it had been recorded by an earlier pass as
«measured, not taken», which is the right call when a step has a different job -
and a list of those is worth nothing until someone works it.

**Six of the eight were «which things are X» questions, so none of them was
answered from a file.** This project has now got that shape wrong eleven times by
answering it with a hand-typed list, so 8.10 opened all 51 coloured screens at 390
and asked the rendered DOM five questions at once: which elements compute to weight
900, which draw a radius of 5 or 6, which resolve to Arial, which are an outlined
uppercase pill with no ground, and how tall `.acc-link` stands. Two of the answers
were nothing like what the file notes said.

### The two coach totals, and an alias that deleted itself

`coach-order.css:334` had written the fix out in full a week early: «THE FIX IS ONE
LINE IN price.css ... the day the atom learns the two names this rule goes and
nothing moves.» It did. `.od-grp-h .gs` and `.od-tot .v` are in price.css section
1's selector list and the private rule is gone.

What made this a two-line deletion instead of an excavation is the SHAPE of the
alias: written with the atom's own tokens, in the screen file, saying out loud
which file should own it and what would have to happen for it to go. That is worth
copying every time a step finds a defect in a file it is not allowed to edit.

Measured after, at 390: `.gs` 59.53 wide and `.od-tot .v` 83.59 - to the hundredth
the two widths that note recorded when it wrote the alias - both mono, both
tabular, word-spacing -3.84 and -5.76px, and the 5 `.uiv-cur` still 5.

**And the check caught the paragraph lying about the heights.** The first draft of
the replacement note said «59.53 x 19.20 and 83.59 x 28.80». The widths were right
and the heights were copied out of price.css's note about a DIFFERENT element on a
different screen; the real ones are 25.59 and 38.39. A number carried over from a
neighbouring paragraph is the same failure as a reason that outlives its truth,
which is what 8.9b cost two defects to learn. It is in the file now with the story
attached, because a corrected number with no note reads as one that was always
right.

### The two plan prices, and the same defect on two screens

`coach-tariff.css:177` reported it and refused to fix it locally, in as many words:
«price.css is not this file's to edit and a second `font-family: var(--font-mono)`
written locally is how one rule becomes eight». `.tf-price` and `.tf-col-p` joined
`.cmp-head .price b`'s rule - family and tabular numerals, NOT the ₴ kerning.

They join that rule and not the mono LIST above it for the reason the rule already
gives: a plan price has no struck twin and no `-N%` chip.

**The kerning is still one word from the owner, and 8.10 made that word matter
more.** Measured with a Range over the glyphs rather than the element box - the two
tariff figures are block-level and their boxes cannot narrow, so a box measurement
reported «saves 0px» and was wrong:

| figure | now | with `-.24em` | closes |
|---|---|---|---|
| `.tf-price` 26px «99 ₴ / міс [?]» | 154.67 | 129.72 | 24.95px |
| `.tf-col-p` 20px «99 ₴ / міс [?]» | 130.88 | 111.67 | 19.21px |
| `.tf-col-p` 20px «0 ₴» | 31.27 | 26.47 | 4.80px |
| `.cmp-head .price b` 16px, both | 28.81 / 86.41 | 24.97 / 82.56 | 3.84px |

The mono space is proportional to the size, so at 26px it is four times the gap the
landing shows at 16. Three figures wait on that word now instead of one, and the
biggest of them is the number the whole tariff screen is about.

### The outlined pill: four names, seven instances, and no owner

The owner's line read «`.tf-mini` as a ninth outlined mini-pill», which is what an
earlier note of mine had said. The census says there is no set to be ninth of.
Read out of the DOM at 390 across all 51 screens:

| name | file | count | size / weight | padding |
|---|---|---|---|---|
| `.addr-tag` | address-card.css | 3 | 10 / 700 | 2 / 8 |
| `.badge` | coach-landing.css | 2 | 10 / 700 | 2 / 9 |
| `.tf-mini` | coach-tariff.css | 1 | 12 / 700 | 2 / 8 |
| `.kicker` | coach-landing.css | 1 | 12 / 700 | 4 / 12 |

All four: 1px border, `--radius-pill`, uppercase, `--fw-black`, no ground. They
agreed on everything hard and disagreed on the two things that are easy, which is
status-pill.css's signature for «four people drawing one thing separately» - this
is that file's finding a second time, one level over.

**Two of them are literally the same element.** `coach-landing.html:98` writes
`<div class="plan">Free<span class="badge">миттєво</span></div>`;
`coach-tariff.html:71` writes `<div class="tf-col-h">Pro <span
class="tf-mini">ваш тариф</span></div>`. A plan name with an outlined pill beside
it, in two editions of the SAME Free / Pro comparison, on two screens of one flow.

**badge.css took the shape, and status-pill.css was the wrong home for a good
reason.** Both screen files had reached for the pill file and both had refused
correctly: 12px on a 2/8 padding crosses the ladder that file opens by refusing.
What neither asked is the next question. If it is not a status and no file declares
it, WHICH file should? Two paragraphs on two screens, each ending at «no file in
the system owns this» and each treating that as the end of the sentence rather than
the finding. badge.css's own definition answers it - «a pill reports a state that
changes, a badge states a kind that does not» - and «миттєво», «опт», «ваш тариф»
and «За замовчуванням» all state a kind. So the file has two kinds now: filled, on
a photograph, where a ground is needed to read over an image; outlined, beside a
word on the page's own paper, where an outline is enough.

**The ladder is status-pill.css's and was not re-derived** - row 12 / 4-12, inline
10 / 2-8, measured out of the product at 7.37. `.addr-tag` was already exactly on
the inline rung and `.kicker` exactly on the row rung, which is how the shape was
recognised at all.

**One value moved, said out loud: `.tf-mini` font-size 12 -> `--fs-10`.** WHY: in
the grey prototype the two twins were 10.5 and 10 - one pill, half a pixel apart,
drawn by hand on two days. Step 5.6's snap ladder took 10.5 up two rungs and left
10 alone, so a coincidence in the grey became a difference in the colour. 10 is the
one with a reason behind it, and badge.css states it for the whole family: the
smallest legible thing, because a badge that competed with the name beside it would
be selling.

Three `[?]`s went with the shape and none was the screen's to answer: `.badge`'s
`.03em` was a third tracking beside a system that has two, and `9px` and `7px` have
no rung. All three are A5's shape, closed at 7.67 - these were its stragglers, on a
screen that was still grey when A5 ran.

**Two things stayed behind on purpose.** A border COLOUR is a variant, not a shape:
coach-landing keeps `--line-inverse` because its ledger books it («--dark #161616
-> --line-inverse as a BORDER: kicker, badge, finalcta»), exactly as
`.addr-card.def .addr-tag` keeps the action colour over the same atom. And
`.kicker` is deliberately not in the set - it stands ALONE above the hero headline
and names the page under it, which is A3's definition of an eyebrow, not a label
beside a word.

**The names are still wrong and that is Крок 6's.** `.badge` collides with this
file's own atom; `.addr-tag` and `.tf-mini` are two more words for one thing. 8.10
closes the SHAPE. The vocabulary is the rename step's whole job.

### The margin the first cut deleted, and the check that found it in a minute

Sending `margin-left: 7px` away with the other two literals was wrong: the landing
markup writes `Free<span class="badge">` with NO whitespace between the word and
the pill, so at margin 0 they touch. Its twin writes `Pro <span class="tf-mini">`
WITH a space and needs none. Put back as `--space-8` on coach-landing only, where a
position belongs. Caught by reading every claimed number back out of the browser -
`ml 0px` in a row that should have said 8.

### The rail chip reaches the touch floor

`.acc-link` measured 40.39 at 390 on all 13 screens that draw the rail, 3.61 short,
on a chip inside a horizontal scroller - the hardest control to hit, because a miss
scrolls the strip instead of doing nothing. Above 960 the same class is the
vertical rail and already measures 46.39 to 48.39, which is why the line is inside
the phone block. 44 is not a new number: link-row.css:223 states it for six control
families, field.css:41 gives it to every field, coach-wishlist.css:81 took four
controls to it at 7.97. Measured after: 44.00 on all 13.

### The pixel proof's three leftovers, and two of them were not the product

7.94 reported «radii 5 and 6 survive, on `overview` and `product-coach`» and «Arial
survives on two pages». The census says:

- **Radius 5/6: 18 elements, 17 of them harness.** `.nav-top`, `.nav-link`,
  `.nav-section`, `.nav-toggle` come from `/_nav.css`, and `code`, `.eyebrow`, `.n`
  from the showcase chrome on the hub - which A3 already ruled out of the component
  count («`design/_stand.css` and `design/kit/_page.css` ... not a product
  component»). The finding was ONE element wide: `.cbsave` on `product-coach`,
  `border-radius: 5px` -> `--radius-4`, because 5 is not a rung and the ladder's
  ties go down. Its sibling `.cbtier` two lines up already draws `--radius-16` on
  the same kind of plate. Measured: the plate is 81.69 x 18 before and after - a
  radius does not size a box.
- **Arial: three controls, and all three draw zero glyphs.** Two
  `input[type=range]` price sliders on seven listing screens and one
  `input[type=checkbox]` on coach-verify. A form control does not inherit
  `font-family`; field.css found this at step 7 («66 of 101 were set in ARIAL») and
  fixed it on `.field`, base.css fixed it on `button`, and both fixed a NAME. What
  was left is every control wearing neither. `input, select, textarea, optgroup {
  font-family: inherit }` in base.css. **It changes nothing on any screen today**
  and saying so is the point - a range and a checkbox render no text, so Arial has
  been in the computed style of eight elements and on no pixels. What the line buys
  is the next un-classed `<select>`.

### Weight 900: the `[?]` was «nobody», and it is one edit away from being visible

The pixel proof left «weight 900 stands on 17 screens ... the scale has no 900,
Inter is not loaded with one, and no step in ninety-three ever named it. Whose
declaration this is: `[?]`». It is nobody's. `<b>` carries the user agent's
`font-weight: bolder`, which is RELATIVE - it resolves against the parent, and
every parent here is already 600 or 700, so bolder lands on 900. Measured: 113
elements, 18 screens, and every one is the rating figure - `<b>4.8</b>` inside
`.st` or `.rstars`, whose parent rating.css sets to `--fw-bold`.

**It draws 700, and the A/B is the proof**: the same figure at 900 and at 700 is
21.609px wide both times, on all seven instances of `index.html`. tokens.css:248
measured the mechanism when A8 closed - «from 700 upward the number stops moving» -
and IBM Plex Mono, which the rating is set in, is requested at 500;600 only.

**So why touch it.** Because A8's other branch is one line: «Add 800 to the font
request in the 89 pages, set this token back to 800, and the register the type was
written for arrives everywhere at once.» The day that happens, `bolder` starts
resolving somewhere real and 113 rating figures on 18 screens change weight with
nobody deciding it. A value that is invisible only because the font is missing is
not a settled value - it is a decision waiting to be made by an unrelated edit.
`b{ font-weight: var(--fw-bold) }` in base.css. Any component rule naming a weight
on a `b` outranks it, which is how `.auth-visual .vtag b` keeps its
`--fw-semibold`. 0 of 323 `<b>` move, and there are 0 `<strong>` in the product.

### The orphan comment terminator, third time, and now a machine finds it

Inserting a comment END in the middle of an existing comment leaves the prose after
it outside the comment and the original terminator orphaned. Twice this session it
happened in `.js`, where `node --check` said so within a second. The third time it
happened in **price.css**, and nothing said anything at all: CSS has no parse
error, it drops declarations until it finds its footing. The only symptom was three
plan prices - the very ones this step had just fixed - quietly rendering in Inter
on two screens, and the browser check found it only because those three were on the
list it was already reading.

`a810lint.mjs` asks the question directly, of every stylesheet, in a second. **All
of them balance.** It is CSS-only on purpose: the first version ran over `.js` too
and reported `design/_nav.js:1122`, which is a regex literal whose last two
characters are the two that end a comment. Telling a regex from a division sign is
the hard part of lexing JavaScript, `node --check` already cannot be fooled, and an
instrument that reports a correct line trains you to ignore it. (The comment
explaining this bug had to be written out in words rather than quoted, because
quoting it closed that comment - the bug appearing inside its own description, on
the first save of the file.)

### Two more instruments that returned a confident wrong answer

- **The Arial census matched `-apple-system`.** The first pattern was
  `/arial|times|-apple-system/i`, and the token stack CONTAINS `-apple-system`, so
  60 rows of correct buttons came back as findings. A pattern that includes a value
  the product legitimately uses cannot separate the defect from the norm.
- **The screenshot tool returned white paper twice.** `Page.captureScreenshot`
  clips in PAGE coordinates, and a clip outside the current viewport is not painted
  without `captureBeyondViewport` - with `scroll-behavior: smooth` in base.css,
  `scrollIntoView` had not finished moving anything by the time the rect was read.
  A screenshot tool that returns white on a wrong rect is the same class of
  instrument as a hover test that cannot say «the cursor missed», which cost three
  tries at 8.9.

### Acceptance

51 screens at 390: zero failures. Ten screens at 1280 including all five that carry
the rail: zero failures. The state walk over the six touched screens: no state a
pass failed to reach. Every stylesheet in `design/`, `wireframes/` and the root:
comments balanced. Five crops read by eye - the landing's plan table, the tariff's
two cards, the address list, the coach buy box and the account rail.

---

## Step 8.10b - the owner said the word, and three prices lost 3.84 to 24.95 pixels of gap

The kerning on the plan prices had been open since 7.96 with the number attached
and the decision explicitly left out: «AND THE KERNING IS LEFT OFF BY INSTRUCTION,
WITH THE NUMBER, so the owner can settle it in one word.» The word is said.

**And 8.10 is what made it worth asking rather than assuming.** The paragraph that
left it open had measured one figure, `.cmp-head .price b` at 16px, where closing
the gap saves 3.84px - small enough that leaving it open for a week cost nothing.
Putting the SAME figure on the tariff screen at 20 and 26 made it four times wider,
because the mono word space scales with the type. A number measured on the screen
it was first found on is not a number about the value; it is a number about that
screen. Measured with a Range over the glyphs:

| figure | before | after | closed |
|---|---|---|---|
| `.tf-price` 26px «99 ₴ / міс [?]» | 154.67 | 129.72 | 24.95 |
| `.tf-col-p` 20px «99 ₴ / міс [?]» | 130.88 | 111.67 | 19.21 |
| `.tf-col-p` 20px «0 ₴» | 31.27 | 26.47 | 4.80 |
| `.cmp-head .price b` 16px «0 ₴» | 28.81 | 24.97 | 3.84 |
| `.cmp-head .price b` 16px «~99 ₴/міс» | 86.41 | 82.56 | 3.85 |

7.96's own prediction for the 16px figure was «28.84 to 25.00». The browser says
28.81 to 24.97 - within three hundredths, four steps later, on a rule that had
been rewritten twice in between.

**The separate rule is gone, and that follows from the fix rather than being a
second decision.** Those three names sat outside price.css section 1's mono list
for exactly one reason, which the rule stated: they took the family and the
numerals and NOT the kerning. With the third declaration back there is nothing
left to tell them apart, and a rule whose whole content is «the same as those,
minus one line» has no business existing once the line returns. The ARGUMENT that
built it is kept in the file, because it is still true and still working: a plan
price is not a price surface - no struck twin, no `-N%` chip - which is why these
three never entered the surface table and must not enter it now. Two lists, two
counts, and confusing them is how the ninth surface went unranked for a week.

**Nothing around the figures moved**, A/B'd by switching the kerning back off in
the live page at 390 and at 1280: `.cmp-head .cmp-cell` 178 x 110.58 and `.price`
148 x 43.48 at 390, 321.88 x 90.28 and 291.88 x 23.19 at 1280; `.tf-col`
358 x 210.77 and `.tf-col-p` 320 x 32. **Twenty boxes, two widths, not one of them
different with the rule on and off.** The digits tighten and the layout does not
notice, which is the whole reason this is one line in one file rather than a value
per surface.

**And one note nearly copied a number forward untested.** The replacement paragraph
in coach-landing.css first said «both cells stay 46.4 tall», taken from the 7.96
note two paragraphs above it - a measurement of a different element. The A/B says
110.58. It is in the file with the correction attached, for the same reason 8.10's
height slip is: a corrected number with no note reads as one that was always right.

**What stays open on these three figures, unchanged:** the ₴ mark is still a typed
glyph on the landing's 16px figure, because `uivCurrency()` skips any parent under
17px. That is a SIZE question and still the owner's; it was only ever in the same
paragraph as the kerning because both are about the same character.

### Acceptance

51 screens at 390 and five at 1280: zero failures. Every stylesheet: comments
balanced. Both plan tables re-cropped and read by eye.

---

## Step 8.11 - the instruments move into the repo

Three hundred and eighty-three measurement scripts were written across stages 07
and 08, all of them into a session scratch folder that dies with the session.
Nearly all of them deserve that: a probe answers one question and is finished.
**Five did not.** They answer a question this project asks at the end of every
step, and each one was being rebuilt from memory - which is precisely the failure
`CLAUDE.md` names for the product, *«a hand fix does not survive the next clone»*,
applied to the apparatus that checks the product.

They are `tools/` now: `accept.mjs`, `states.mjs`, `css-comments.mjs`, `crop.mjs`,
the driver `cdp.mjs`, and `lib.mjs` for what they all used to hard-code.

### What moving them fixed, which was not just their address

**Every constant they carried had cost a real failure**, and putting them in one
place made that visible:

- **The server URL.** Every script wrote `127.0.0.1:8993` and assumed someone had
  started a static server by hand. A run against a dead server does not fail
  loudly - the census expression never runs and what comes back is an empty pass
  that reads like a clean one. `serve()` starts it, waits for it to answer, and
  stops it.
- **The profile directory.** An absolute path into one session's job folder, in
  every file. That is *why* none of these outlived the session that wrote them.
- **The port.** Two scripts on one port is a silent hang; it happened twice in one
  afternoon at 8.10. `freePort()` asks the operating system.
- **The page list**, and this is the one that matters. The scripts took their
  subject from a shell glob, and on 2026-08-11 an acceptance run over 135 pages
  reported **«0 failures» after visiting exactly one** - zsh does not word-split an
  unquoted parameter expansion, so the whole list arrived as a single argument and
  the walk asked for a page whose name was 135 names long. It printed a pass.
  `pages()` reads the screens off disk. **An instrument that takes its subject
  from the caller can be handed the wrong subject; one that finds its own cannot.**

**And one defect the move exposed rather than inherited.** Every script called
`l.proc.kill()` at its foot and nowhere else, so a script killed by a timeout,
stopped with ^C or thrown out by an exception left its Chrome and its server
running - and 8.10 killed several runs by timeout. Server, browser and scratch
profile now register a teardown that fires on exit, `SIGINT`, `SIGTERM`, `SIGHUP`
and an uncaught exception. This was invisible while each script owned its own copy
of the launch code; it became one obvious hole the moment they shared one.

**Verified by the port, not by a process count, and the first attempt to verify it
was the same defect one level up.** `ps aux | grep http.server` returned 7 and that
number went into this file - but the machine was also running two static servers
that have nothing to do with this work (`:8971` with no `--bind`, and `:8080`),
plus an unrelated python script whose path contains the word. A grep that counts
anything matching «server» cannot say whose server it counted. The honest form of
the claim asks about the ONE port the tool chose: started `serve()` and `chrome()`,
read back **port 56287, one listener and five headless Chrome processes**, sent
SIGTERM, and asked again - **zero and zero.** The two foreign servers are still up
and were deliberately left alone.

`node tools/accept.mjs` with no arguments now walks all 51 screens at 390, starts
and stops its own server, picks its own port, and exits non-zero on a finding.

### What earned a place, and what did not

The bar was: *a check the NEXT step will want to run unchanged.* Not «it was
useful once» - that describes all 383.

| tool | the question it answers | why it is not a probe |
|---|---|---|
| `accept.mjs` | overflow · console error · em dash · curly apostrophe · doubled crumb | the gate; nothing is done until it returns zero |
| `states.mjs` | is there a state no icon or mark pass reached | ended an eleven-instance defect class |
| `css-comments.mjs` | is any stylesheet comment orphaned | CSS is silent about this and nothing else checks |
| `crop.mjs` | what does it actually look like | numbers said 44 tall while two words were touching |

The other ~378 stay where they are. Copying them would turn a folder of
instruments into a folder of archaeology.

### The wrong versions came with them, and that is the point

Each file carries the versions that lied, because that is the part that does not
survive a rewrite. `states.mjs` explains why its openers are enumerated at runtime
(three versions carried a typed list and reported «none» across 32 screens while
four states were broken, one of them losing 585 marks). `css-comments.mjs`
explains why it is CSS-only (the `.js` version reported a regex literal as an
orphan, and an instrument that reports a correct line trains you to ignore it).
`crop.mjs` explains the two separate reasons it returned blank paper.
`cdp.mjs` explains why it pauses animations from time zero, why it does **not**
add `transition: none` - *«the instrument must not be visible in its own
measurement»* - and why it asks for `prefers-reduced-motion: no-preference`.

A tool with its failures written beside it can be trusted at a glance. A tool
without them gets rewritten by the next person who does not know why it is shaped
that way, and the rewrite reintroduces the bug the shape was avoiding.

### CLAUDE.md

Two edits, both by generalizing an existing rule rather than adding beside it, as
that file requires. **«Acceptance is in the browser»** now names the two commands
and extends its own second sentence: *«Fix through a rule, not by hand-editing one
file - and the same applies to the instrument: a check rebuilt from memory each
step is a hand fix.»* **«Every md gets a visible place on html»** gains `tools/` to
its list of service files, with the reason: they are read by whoever builds, not
by whoever decides. The repository-shape block gains one line. **194 of 200** -
counted after the edits, not estimated before them, which is the mistake this
file has now caught itself making twice in one day.

### Acceptance

`node tools/css-comments.mjs` - 88 stylesheets, balanced. `node tools/accept.mjs` -
51 screens at 390, zero failures. `node tools/accept.mjs 1280 account coach-home` -
zero. `node tools/states.mjs` - no state a pass failed to reach. `node
tools/crop.mjs` - a picture. All four run from a cold shell with no server, no
port and no page list given.

---

## Step 8.12 - four owner decisions, and two of them were about the wrong thing

The owner worked the list. Three answers landed as CSS this step; the fourth -
which of section C's 24 missing states to build - is 14 screens of work and goes
next. What is worth recording is that **two of the four questions had been asked
with the wrong cause attached**, and only re-measuring found it.

### A6 - the owner took the measured half and left the taste

Nine boxes frame a product photograph, at eight sizes: 34 / 40 / 46 / 46 / 52 /
56 / 60 / 70 / 74. A6 said folding them «would be taste, not measurement», and
the owner agreed: **the eight sizes stay.** What moved is the two things A6
itself named as measurement.

**`.aord-thumbs .t` and `.rk-ph` were not merely the same size - they were the
same declaration.** Read out of both files: nine declarations byte for byte,
plus the same two colour declarations, plus `flex: none` on one. One component
that was never given a name, which is the third time this stage has found that
shape - status-pill.css at 7.37, badge.css at 8.10, this now. `product-thumb.css`,
level 1, beside `cert-thumb.css`. It is a file and not a line in one of the two
because neither owner outranks the other: an order card's thumb strip and a
restock nudge have nothing in common except this box, and a rule reaching into a
component it does not own is the defect `filter-group.css` records by name.

**`.ci-ph` carried `--radius-12` where the other eight carry 8.** Nothing in
`cart-row.css` or `DESIGN-artifacts.md` ever said why the cart's tile is rounder.
Measured: 74 x 74 before and after - a radius does not size a box.

`.oh-thumbs i` (34) is the same shape at another size and stays out, with the
line saying so: the day the ladder is folded it joins by name.

### A9 - one width, not two bands, and the label was never the cause

A9 called this «the only sideways scroll left in the product» and reported two
bands at 7.64. Re-read across eleven widths: **one width scrolls, 480, by 39px.**
520 is 0. Third recorded number this session to have quietly expired.

**And the cause A9 named was the wrong one.** It said «the label's own min-content
is 358 inside a 303px column», which is true and reads as a fact about the label -
which is how the question reached the owner as «shorter word or wider column».
Measured:

| width | `.bb` | `.buyrow` | button | min-content | |
|---|---|---|---|---|---|
| 440 | 408 | 408 | 408 | 406 | fits |
| 480 | 448 | **302.92** | 357.84 | 356 | scrolls 39 |
| 620 | 588 | 442.92 | 378.92 | 377 | fits |

Below 480 `.priceblk` is one column. At 480 it becomes `auto minmax(220px, 1fr)`,
the 36px price takes ~121 and the gap 24, and the row is handed 303. **The row
did not shrink - the price took the space.** A correct measurement, read as a
fact about the wrong element.

Fixed with `.bb .priceblk:has(.oosbtn){ grid-template-columns: 1fr }` under 620,
and **not** a tuned width: the band depends on how wide the price is, so a
boundary fitted to «1 290 ₴» would be a value with no reason behind it. `:has()`
states the condition that matters. Measured after: 480 over=0, and the five
in-stock product screens keep two columns at every width, byte for byte.

**The word was untouched, and that was the point.** «Повідомити про надходження»
is locked in `voice.md` in four places including its list of the phrasings that
are RIGHT. Shortening it was a voice decision wearing a layout costume.

### E - `span.cb` is canonical, and the fix is still CSS

351 `span.cb` against **5** real inputs, not the 2 the sheet recorded - three in
the address dialog, one in the profile delete confirmation, one on `coach-verify`,
which `coach-verify.css:496` had already flagged as «a markup question to answer,
not a css one». All five drew the operating system's blue box.

**Deleting them would have bricked a destructive confirmation.** `#pf-del-ok`
carries `onchange="...disabled=!this.checked"` - the only thing that enables
«Видалити акаунт». Four of the five are written by `wireframes/_nav.js`, which is
frozen, so a markup conversion also means unbuilding and rebuilding in script.

So the native box takes the atom's look: `appearance: none` and this file's own
square. One look on 356 boxes, and where a real control exists it keeps its focus,
its Space, its accessibility tree and its handler. **On the a11y ledger the five
are now the better half** - they have natively what the 351 are given by hand.
Verified past the transition: 18 x 18, `--radius-4`, white on hairline off,
`--bg-action` with the drawn 5 x 9 tick on, and `disabled` still goes true -> false.

### Three instruments lied on the way, and the third was a new one

- **A live `CSSStyleDeclaration`.** The first probe read `::after` into a variable,
  restored `checked = false`, then built its report - by which time the pseudo it
  described was gone. It printed `autoxauto` through a branch that can only run
  when the width is not `auto`. Snapshot to strings at read time.
- **A transition.** The second read the background in the same tick as the click
  and got the value the transition STARTED from - white - while reporting the tick
  as already drawn, which is impossible for two rules sharing a selector. An
  instrument that reads a transitioning property immediately after the event that
  starts it measures the old value and reports it as the new one.
- **Hand-typed opener names again.** `openProfDel` is not a function in this
  product; it is `openProfDelete`. Exactly what `states.mjs` paid three versions to
  learn, repeated in a throwaway probe an hour after writing that lesson down. The
  probe now enumerates `^open[A-Z]` at runtime, like the walk does.

### Acceptance

51 screens at 390, 8 at 480 and 4 at 1280: zero failures. 89 stylesheets, comments
balanced. Three crops read by eye - the OOS buy row at 480, the consent box, the
restock tile.

---

## Step 8.13 - the census before the build, and section C was wrong about a quarter of its own table

The owner picked 14 of section C's 24 missing states: the dead ends, the far end
of a list, and the trust signals. The step began by asking what already exists -
and stopped there, because the answer changed the job.

### `wireframes/` has been drawing these since stage 04

Section C opens: «Twenty-five findings across the pass name a state that no screen
draws.» Counted in both layers at 8.13:

- **`wireframes/` holds 142 screens and 17 of them are empty states** -
  `account-orders-empty`, `account-addresses-empty`, `account-wishlist-empty`,
  `account-loyalty-empty`, `coach-clients-empty`, `coach-home-empty`,
  `coach-orders-empty`, `coach-session-empty`, `cart-coach-empty`, `goal-empty`,
  `brands-empty`, `listing-empty`, `search-empty` and four more. With their
  words, their icon and their exit.
- **Two of the owner's five dead ends are already drawn in COLOUR** and have been:
  «nothing matched the filter» and «Знайдено: 0» are both on
  `design/listing-empty.html`, the second on line 36.
- **Twenty-five grey states of screens that are ALREADY coloured have no coloured
  twin** - not just empty states: `-error` and `-loading` for six coach screens,
  `coach-session-oos`, `coach-client-empty`, and the rest.

**And this table already knew the shape.** Two of its own rows read «exists in
grey, not in colour» - the loyalty rung and the bonus ledger. The other
twenty-two were written as though the state existed nowhere. A finding recorded
in the right words for two rows and the wrong words for twenty-two is the same
defect this project has now hit twelve times: a question of the form «which
things are X» answered from a reading rather than from a count.

**What it changes.** The 14 the owner chose split three ways: **2 already done**,
**2 a clone away**, **10 genuinely new**. And beyond the 14 there are 23 more
cheap clones nobody had costed, because the table made them look expensive.

### What was built: two clones, and not one new word

`design/account-orders-empty.html` and `design/account-addresses-empty.html`,
cloned from their grey originals by the step-8.7 transform: the stylesheet head,
the crumb separator emptied because the colour layer DRAWS it, the button ranks
(`btn dark` -> `btn--accent btn--s`, `btn` -> `btn--outline btn--s`), the five
script tags, and the colour layer's own passes appended to whatever the screen
already runs - here a state patch that drops the sidebar count badge.

**Not a word was rewritten.** «Ще немає замовлень», «Ще немає збережених адрес»
and both bodies are voice's, they exist, and a second edition of a product string
is what `CLAUDE.md` forbids by name. Colouring a screen is not an occasion to
re-open its copy.

Both added to `DESIGN_NAV`, without which `uivFixLinks` sends every link on them
back into the grey layer - the defect step 8.7 exists to record.

**One bug in my own transform, caught by reading the output.** The regex meant to
match a plain `class="btn"` was written `class="btn"(?! )` - a negative lookahead
forbidding the space that ALWAYS follows a closing attribute quote, so it matched
nothing and «До каталогу» rendered as bare text, which is exactly the defect
step 7.96 found on three coach controls. Found by counting `btn--` in the output
and getting 1 where 2 were expected.

### Acceptance

53 screens at 390 and both new ones at 1280: zero failures. State walk over the
two: no state a pass failed to reach. 89 stylesheets balanced. Both read by eye -
the box icon and the pin are drawn, the actions carry their ranks, the plus in
«＋ Додати адресу» is a drawn mark.

---

## Step 8.14 - the cheap clones, and the count was 48 rather than 23

The owner asked for «the 23 cheap clones». Counted properly before starting, it is
**48**, and my 23 came from a `sed` whose suffix list was incomplete - a
hand-typed list answering «which things are X», the twelfth instance.

### 48, and they are two different jobs

For every grey screen with no coloured twin, the longest already-coloured name it
starts with is its base. 89 grey screens have no twin; **48 are a state of a
screen already coloured**, across 13 bases. Splitting those by what they do on
load, read out of their own scripts rather than guessed from their names:

- **13 auto-open a DIALOG** the coloured base already reaches through its own
  `open*` function - the six address dialogs, four profile dialogs, three client
  dialogs. Four of them have a body diff of **0** against their base: the whole
  state IS the dialog. Cloning those would put a second edition of a state that
  already exists into the layer, which is what `CLAUDE.md` forbids for strings and
  what step 8.10 spent a whole finding on for shapes. **Not cloned, and that is a
  decision, not an omission.**
- **35 change the PAGE itself** - empty, error, loading, out-of-stock, and the
  content variants (`-free`, `-max`, `-cap`, `-many`, `-tier`, `-deadend`,
  `-withemail`, `-priceblock`). These are the clones.

All 35 written. The coloured layer is now **87 screens of 141 plus the stage hub**,
46 buyer and 41 coach, against 52 before this step.

### The transform is a file now, and it caught its own history

`tools/clone-to-colour.mjs`. This transform had been retyped from memory three
times and each retyping shipped a defect: 8.7 cut every screen's own inline script
(`coach-tariff`'s cancel dialog died with a ReferenceError), 8.13 wrote
`class="btn"(?! )` - a lookahead forbidding the space that always follows a
closing attribute quote - so «До каталогу» rendered as bare text.

**And writing it down did not stop me repeating the exact lesson it warns about.**
Its `PASSES` table paired `wfCoachNav(` with `uivCoach()`. There is no `uivCoach`
in this product and never has been: the coach screens coloured at 7.95 and 8.7
call three passes and no fourth. Twelve screens loaded with
`Uncaught ReferenceError`. That is `states.mjs`'s lesson - a function name typed
from memory - repeated inside the file written to stop hand-typed lists, an hour
after writing that file's header. The table now **checks itself against
`design/_nav.js`** and throws if it names a function the product does not declare.
A rule that can be broken by a typo needs a check, not a comment.

**Two more, both caught by the gate rather than by me.** The colour passes were
joined on a space - `uivFixLinks() uivBar() uivChrome();` - a SyntaxError that
took out the whole inline block on all 35 screens at once. And the first anchor
looked for `wfBar(` at the start of a line, warning on all 35: these screens write
`wfFooter(); wfBar('x.html','empty');` on one line. **A rule that fails on every
single input is never telling you about the inputs.**

### One real defect, and the clone is what exposed it

`account-profile-withemail` came back **51px past the viewport at 390**. Not a
clone defect - a defect in a rule every profile screen shares, which no coloured
screen had ever been able to show.

`.pf-row` is `display: flex; justify-content: space-between` with `.pf-act` set
`white-space: nowrap`, and no `flex-wrap`. On `account-profile` the e-mail row
says «не додано» / «Додати - код на пошту» and fits. **The state where an e-mail
has been added carries a real address and a longer verb** - «Змінити - код на
пошту», 188.5 wide, right edge at 441.1 - and that state had no coloured copy
until this step. Every screen this rule serves has always been one string away
from the same overflow.

`flex-wrap: wrap`, and not a width: a row that fits is untouched, because wrap
only fires when the line is short of room. That is 8.9b's scoping lesson applied
before the fact instead of after. Measured: 51 -> 0, and the rows that already fit
are unmoved - «Українська / Змінити» still shares its line.

### And a fourth instrument that could not say no

Hunting the 51px, the probe filtered out any element with a scrolling ancestor -
walking all the way to `<html>`, which `base.css` gives `overflow-x: hidden`. So
**every element in the product had a scrolling ancestor** and the filter excluded
all of them: it printed an empty list while the document was 51px wide. A filter
whose condition is true for every input is not a filter. Stopped at `body`, and
only `auto`/`scroll` count.

### Acceptance

**88 screens at 390: zero failures.** Five clones at 1280: zero. 89 stylesheets
balanced. Two read by eye - the coach's empty home, and the profile card where the
e-mail row now puts its action on a line of its own.

---

## Step 8.15 - the ten states nobody had drawn, and a stale number that reached a design decision

Section C's last ten rows, built. Three subagents on three disjoint sets of
component files, the copy decided before any of them started, and every claim
they made read back out of a browser rather than taken.

### The copy came first, and the survey changed what «write copy» meant

`voice/docs/microcopy.md` is 5112 lines and holds every string in the prototype.
Searched for all ten states before writing one word: **none of them has a row.**
And `voice.md:266` lists the state inventory the rulebook was written against -
`empty x16 · loading x16 · error x13 · OOS · no-address · price-block · declined ·
dead-end · cap · confirm` - and **not one of the ten is in that count.** So this
was not an edit of existing text, it was text that had never been written.

Sixteen rows, written to `voice.md:285-290` («чому порожньо + одна дія-вихід,
ніколи глухий кут»), the banned-phrasing table at `:249-260`, and principle 1.
No sentence promises a date: when a certificate or a composition arrives is `[?]`,
an operational question, and an invented number would poison the very rows that
exist to avoid inventing. `voice/microcopy.html` shows the growth as **3220 +16**
rather than a recount - a second method would give a third number and no truth.

### What ten states cost: four declarations

| file | added |
|---|---|
| `qa-item.css` | `.qaitem .qans--wait{ color; border-left-color }` |
| `gallery.css` | `.gal .gmain:has(.loadnote){ background }` |
| `cert-thumb.css` | `.certthumb--pending{ border-style: dashed }` |
| `pagination.css` | `.loadmore[aria-busy]{ cursor }` · `.pages [aria-disabled]{ pointer-events }` |
| `desc-block.css` `rating.css` `review-item.css` `spec-table.css` `trust-strip.css` | **nothing** - comments only |

Everything else is atoms that already existed. **The last page needed no CSS at
all**: `button.css`'s off state has carried `[aria-disabled="true"]` since 7.61,
precisely because «the markup is an `<a>` or a `<span>`, which is also the only
version a screen reader can hear» - the state was in the system and no markup had
ever asked for it.

Two re-scopings did more than any declaration. `.certthumb::after` (the «PDF»
tag) and `.certthumb:hover` (the 2px lift) became **`a.certthumb`**: on a tile
with no file behind it, «PDF» IS the claim and the lift is a promise. Verified by
behaviour, not attribute - the pending sheet is `focusable: false`, absent from
the accessibility tree, `::after` computes to `none`, `:hover` matches `[]`. Step
7.72's lesson - «a role is a promise about what a control does, and this one
announced a button nobody could press» - applied structurally.

### The rating summary with zero reviews shows nothing, and three placeholders were rejected

Not `0.0` - a claim about the product that is false, and it sorts as a real
number the first time anything reads it. Not a 50px dash - the card row already
answers «no rating yet» with `★ - · новинка`, which works at 12px among five other
facts; at 50px, alone in its block, a dash is a headline that says nothing. Not
five hollow stars - that is what every rating control draws for «0 of 5»,
including this file's own picker at rest, so the one shape meaning «no opinion
given» would be spelled exactly like the worst opinion available.
The figure's own reason decides it: it is mono **because it is compared between
cards**. With no reviews nothing compares, so there is no job.

### A stale number in a stand reached a design decision two steps later

Two agents on the same page picked two sizes for the same box. One argued: «46px
does not draw anywhere in colour - all three coloured boxes carry `.mini`». That
sentence was **printed on `empty-state.html`**, it was true when written, and it
stopped being true at **step 8.13**, which cloned two grey empty screens into
colour.

Counted across all 88 coloured screens: `.empty` 40px on **6** screens,
`.emptybox` 46px on **3**, `.emptybox.mini` 24px on **1**. The premise was false
and neither agent could have known without recounting.

**The size is decided by scope**, which is what the three sizes are a scale of:
`.empty` when the whole SCREEN is empty, `.emptybox` when a SECTION is, `.mini`
when several stack in one CARD - and `account-empty`'s three `.mini` boxes sit
inside `.acard`, which is what fixed the reading. All four states are sections of
the product page. All four now carry the same box: 220.4 / 198 / 244 / 254 tall
at 390, one padding, one radius, one frame. The stand's count is corrected.

**This is the reason-that-outlived-its-truth failure wearing a number**, and it is
the fourth time this session. A stand is read by whoever builds next; a count on
it that nobody re-runs is a decision waiting to be made wrongly.

### The atom was charging for parts it did not have

Found independently by two of the three agents, which is what made it the atom's
rather than any component's. `.et` carries a top margin because an icon usually
sits above it and `.es` a bottom margin because an action usually sits below.
With neither, both survive. Measured at 390 in a box whose own padding is 24:

| box | air above title | below body |
|---|---|---|
| icon + actions | 71.4 | 81 |
| no icon | 25 | 81 |
| neither | **33** | **41** |

Thirty-three and forty-one where the box asked for twenty-four - and
`account-empty.html` had already patched its own copy with `style="margin-top:0"`
written into the markup, which `empty-state.html` lists as a defect of that file.
`:first-child` / `:last-child` on the atom, once. It retires the inline style on
one screen, a private `.emptybox.specempty .es` rule an agent had written for the
same reason, and every copy the next borrower would have written. Boxes that DO
have an icon and actions are unmoved - in those the title is not the first child.

### Acceptance

**88 screens at 390: zero failures.** All ten touched stands report **Пройдено**
with `over=0` and a clean console. 89 stylesheets balanced. The state walk over
the four product screens: no state a pass failed to reach.

### Left open, reported and not touched

- **`uivPdp` in `design/_nav.js`** puts a `doc` glyph in the trust strip's second
  tile, and the set's `doc` has a **checkmark drawn inside it**. A checked
  document beside «уточнюємо» still claims verification. The tile order lives in
  `_nav.js`, not in CSS.
- **`.tsx` is a `<div>` on all three coloured screens - 12 tiles, 0 links** - and
  all four lift on hover. Only the unproven tile had its promise withdrawn; the
  other three still lift toward pages they merely point at. A product decision.
- **`.truststrip`'s `min-width: 720px` is a viewport query inside a 578px stand
  column**, so the kit page overlaps its tiles between roughly 720 and 1024. The
  product screens are unaffected. Container-query territory, stage 10.
- **`kp-meta` counts on `trust-strip.html` and `spec-table.html` were already
  stale** and the counting method could not be reproduced, so they were left
  rather than replaced with a differently-wrong number.
- **`coach-home-empty` draws an `.emptybox` at 30/18**, which is neither rung.
  Found by the census, not chased.

---

## Step 8.16 - two defects found by eye, and the check that found the third

The owner opened `design/kit/filter-sheet.html` and `design/home-coach.html` and
found two things. Both were real, both are fixed by a rule, and looking for the
mechanism behind the second one turned up a class of thirty screens that nothing
was checking.

### 1. A checked filter box floating above the word «Фільтри»

Scroll the filter sheet and an orange square with a white tick climbs out through
the sticky header, while the label «В наявності» that belongs to it stays
correctly hidden. Measured at 390 with the sheet scrolled 260: the header
occupies 101.3 to 174.3 and `.cb.on` sits at 167.4.

**`position: sticky` does not lift anything.** It changes where a box is laid out,
not what paints over what. The header and the checked box are both positioned
with `z-index: auto`, so paint order falls back to tree order - and the header is
the sheet's FIRST child, so everything positioned in the body comes after it and
therefore on top of it. The header's own background hid the rest, which is why
exactly one element showed through.

`.cb.on` is `position: relative` for a reason that has nothing to do with
layering: checkbox.css turns it relative so the drawn tick can be absolute
inside it. **A component two levels down took a decision about its own tick and,
without anyone writing it down, took a decision about this sheet's header.**

The fix is one stacking context for the content rather than a bigger number for
the bar. The two range thumbs carry `z-index: 3` and `4` in the markup, so a bar
at 1 or 2 would still lose to them and the answer would be a number picked to
beat whatever is highest - which is how a z-index war starts. `.fsheet-body` at
`z-index: 0` becomes a stacking context, so 3 and 4 become ranks INSIDE the list;
the bars at 1 sit above the whole of it regardless of what it does internally.
This is also `.fsheet-body`'s first declaration anywhere - the stand lists it
among five names in this markup that no component file declares.

Verified at five scroll positions on the stand AND on `listing.html`, the real
screen: nothing of the body paints inside either bar.

### 2. Two labelled buttons rendering as two empty boxes

`.coachbn` is `--bg-inverse`, and client-row.css hands its title and its caption
the inverse ink. **The three buttons beside them were never told.** Measured on
`home-coach` at 1280: «Клієнти» and «Історія» drew `rgb(28, 28, 28)` ink on an
`rgb(28, 28, 28)` ground - the same value byte for byte, contrast 1.00.

The accent button beside them was fine, and that is why this survived a whole
step of looking at the screen: `btn--accent` brings its own ground and its own
white label, so it does not care what it stands on. `btn--outline` brings only an
edge, and an edge assumes a plate. Its border stayed visible by accident -
`--line-strong` is a light-ground token that happens to read as a pale outline on
ink - which made the result look like a deliberate empty box rather than a
defect.

Scoped to `.coachbn` and NOT made a finish: one measured ground is not a pattern.
`btn--oninverse` earns its name when a second dark surface asks for it.

### 3. `tools/vars.mjs` - and thirty screens speaking a language the system does not

Chasing the second defect asked a bigger question: where else is ink set and
ground not? A contrast census over all 88 coloured screens returned 38 findings,
**36 of which were the instrument's fault** - the ground walker read only
`background-color`, so an ancestor painting a gradient sent it past to the white
body and it reported white text on white paper for every element on a dark strip.
Corrected to stop at any background-image and count those separately, the census
returned two real ones - and both were on `coach-verify-tier`, whose two tier
cards have no border, no fill, no CTA box and no flag: `Free` and `Pro` are bare
stacked text.

The cause is not a missing rule. **The screen carries its own `<style>` block
written against the GREY layer's variable names** - `--dark`, `--hair2`, `--sec`,
`--light`, `--ink`, `--fill` - and the clone that made it coloured swapped the
stylesheet link from `wireframes/_wf.css` to `design/system/index.css`, where
those names do not exist. The head was translated; the private block was not.

**An undefined custom property is the quietest failure CSS has.** `var(--dark)`
with nothing declaring `--dark` does not fall back to black and raises nothing:
the whole declaration becomes invalid at computed-value time, so the property
lands on inherit. `background: var(--dark)` disappears; `color: #fff` on the same
element, being a literal, survives. White ink on white paper, drawn exactly as
instructed, with no error anywhere - which is why `accept.mjs`, `states.mjs` and
`css-comments.mjs` all pass these screens.

`tools/vars.mjs` asks the one question none of them ask: does every name a
coloured screen uses have a declaration in the sheets that screen actually loads.
Both halves are read off disk. **Thirty screens fail, all of them the coach flow**,
over eight names: `--sec` 28, `--hair2` 27, `--hair` 27, `--dark` 26, `--fill` 22,
`--light` 21, `--fill2` 16, `--ink` 12.

It took three wrong versions to get there, and each one lied differently:

1. **`@import[^;]*["']([^"']+)["']` matched 43 times on a file with 43 imports,
   and every capture was `;\n@import `.** A greedy `[^;]*` pushes the opening
   quote as far right as it can, so the pattern settled on the closing quote of
   one import and the opening quote of the next; the filename between them was
   never read. The count was right and the content was garbage, so the check
   declared 86 screens broken over tokens that are declared exactly where they
   should be. *A match count is not a result.*
2. **The comments are most of these files.** Every component stylesheet explains
   what the grey layer used to say, quoting `var(--dark)` and `--hair2` in prose,
   so an uncommented scan reported all nine grey names as orphans on all 174
   screens - every screen there is. *A check that fires everywhere is describing
   itself, not the product.*
3. **`var(--x, fallback)` carries its own answer** and is not a defect, and a
   custom property does not have to come from a stylesheet: `--p` is written on
   the element by the markup and `--uiv-side-h` by `_nav.js` at runtime.

**The thirty screens are NOT fixed in this step.** Seven of the eight names map to
a role that tokens.css states outright, but `--dark` is the grey prototype's one
stand-in for «selected / primary», which is two roles in colour - `--line-action`
where it means selected, `--bg-inverse` where it means a dark plate,
`--text-primary` where it is ink - and coach-session.css already resolved one
such case by reading the markup rather than the name. A blind rename would put a
value in the right slot and the wrong role. Logged as its own step.

---

## Step 8.17 - thirty screens learn the system's names

`tools/vars.mjs` found 30 coloured screens whose private `<style>` blocks were
written against the grey layer's variable names - 637 declarations, eight names,
every one of them landing on `inherit` in silence. `coach-verify-tier` drew both
of its tier cards as bare stacked text: no border, no fill, no CTA box, no flag.

**637 became 54.** The same private block is copied across the state screens of
one flow, so the distinct (selector, declaration) pairs are 54, not 637. Sizing
the work by occurrences would have described a job ten times bigger than the one
that exists.

**And 133 of them were already answered.** A second census asked, for each pair,
whether `design/system/` declares the same property for the same selector - and
for 133 it does, which means the invalid private declaration drops and the
system's rule wins. Those screens were never visibly broken. 146 were real
holes, and that is where every visible defect was.

### What the transform is allowed to do

`tools/grey-vars.mjs`. Seven of the eight names land in exactly ONE property
family across all 637 uses, measured before anything was written - `--sec` is
`color` 166 times and nothing else, `--hair2` a border 114 times, `--fill` a
background 43 - so the role is not in doubt and the map is a rename. The guard is
what makes it safe: a name is translated only inside the property family it was
measured in. `--ink` is what the guard was for - 18 colours, plus one background
and one `border-bottom` that mean something else and went in the table by hand.

`--dark` is the prototype's single stand-in for «selected / primary», which is
two roles once there is colour, so it gets an explicit (selector, property)
table where **every row is read off a selector or off a rule the system already
wrote, never off the name**:

- `.on` / `.now` / `.cur` in the selector - the thing you chose or are on - take
  `--line-action` / `--bg-action`. `.ctab.on` copies coach-session.css:661
  verbatim, which resolved this exact case at 7.95.
- A dark plate takes `--line-inverse` / `--bg-inverse`. The tell survives the
  dead variable: these boxes have a literal `#fff` label that rendered while the
  ground did not.
- `.ord-status.way` is not a selection but a delivery status, and status-pill.css
  already answers it - taken from there.
- **The chip edge has two answers in the system already**, and this step adds no
  third. Grey wrote `1.5px solid var(--dark)` for `.acc-tier`, `.ch-goal`,
  `.tierchip` and four more; account-shell.css:59 answered `--line-strong` and
  coach-clients.css answered `--line-inverse`, writing down that the difference
  «may be real or may be two hands ... three chips, two edges, one stage 09
  decision». Each row copies whichever answer that class already had, so the
  stage 09 question stays open and is not quietly closed by a migration.

**`.pro` is not a state, it is a variant name**, and that is the one row the
photograph changed. Drawn with `--line-action` first, it put a full orange
rectangle around a card that already carries a dark CTA - two loud marks arguing,
against principle 4. `.tier.pro` takes the ink edge: it says «this one» without
spending the action colour, which CLAUDE.md keeps for actions.

### The four it refused to touch, and the note that was waiting for them

`.cv-cta` on `coach-verify-deadend` and `coach-verify-error`. coach-verify.css:505
wrote the answer at step 7.96 and left it as a handover: «`.cv-cta` is declared
again, with its own numbers, in the `<style>` blocks of coach-verify-error.html
and coach-verify-deadend.html ... when they get a coloured edition they want the
same three classes, not a third set of numbers.» The three are `btn--accent
btn--l btn--full`. The private rule is deleted on both and the markup carries the
classes, which is also what retires the hand version's missing hover, active,
focus ring and off state.

### Two things the file learned about itself

**A table row that matches nothing is a typo, and a typo here is silent.** Six
rows reported themselves as unmatched on the first run - `/* big primary CTA */
.cnew` is not `.cnew`, because the transform must leave comments in the file and
was therefore reading them as part of the selector. The self-check is the only
reason that surfaced rather than leaving nine declarations quietly untranslated.

**A page that declares the name itself is not speaking the grey layer's
language.** `design/overview.html` is the design hub, not a product screen: it
loads `../_nav.css` and nothing of the system, and line 14 declares its own
`--ink`. The first run renamed seven of its uses to `--text-body`, which that
page does not have, **turning a page that worked into one that did not**. Caught
by running `vars.mjs` after the write and seeing a screen fail that had never
failed before. Reverted, and the guard is in the file: a name is foreign only if
nothing the page loads declares it.

### Result

`vars.mjs` 175 screens, 0 failures - from 30. `accept` 88 screens @390, 0
failures. `css-comments` 89 sheets balanced. Photographed: both tier cards, the
dark `.cnew` tile, the dead-end CTA.

**Not done here, on purpose.** Moving 600 lines of private CSS out of the screens
and into `design/system/components/` is Крок 6, after stage 09; this step changes
which name a declaration reaches for, never a value, never a selector, never a
location. The `1.5px` borders are left as they are - Chrome resolves them to 1px
anyway, documented in checkbox.css - and are Крок 6's to fold.

**Found and not fixed:** `.cnew .cn-t` and `.cn-s` are inline `<span>`s with no
`display`, so the title and its caption run together on one line and the
caption's `margin-top: 3px` does nothing. The grey layer has the identical
defect, so it is not a colour regression; `wireframes/` is frozen, which makes it
the colour layer's to fix in its own file, in a step whose subject is layout.

**Left for the owner:** `.cv-step.stop` on coach-verify-deadend is drawn with the
same mark as `.cv-step.on`, because that is what grey said. Whether a dead end
should read as danger rather than as the current step is a decision about what a
dead end looks like, not a translation of what is there.

---

## Step 8.18 - 803 links that went nowhere, and the question no gate had asked

**Four checks stood at the gate and not one of them asked whether a link goes
anywhere.** Asked it: **803 of the 2882 internal hrefs in `design/` resolved to
nothing, and 0 of the 1579 in `wireframes/` did.** 28% against zero, in a layer
that is a clone of the other - so every one of them was introduced by the
colouring, and every one had been clickable since.

**The blind spot has an exact shape, and it is worth naming because it predicts
the next one.** `accept.mjs` opens a page and asks five questions about what it
finds there; `vars.mjs`, `states.mjs` and `css-comments.mjs` likewise examine a
screen. A dead link raises nothing on the page that carries it - the 404 happens
on the NEXT page, which no pass ever visits. Every instrument in this folder
looks at a screen, and a link is the one thing that is not on the screen it is
written on.

### Three causes, and only one of them was a mistake

**1. The stand and its demo are one directory apart and share their markup -
650 links.** `design/kit/hero.html` and `design/kit/demo/hero.html` hold the same
rail, so they hold the same hrefs, and one relative path cannot be right at two
depths. `design/kit/hero.html:35` writes, in ONE LINE,
`../../wireframes/catalog-page.html` (correct from `design/kit/`) and
`../../listing.html` - which is the repository root, where there is nothing but
`index.html`. The first was written for this depth, the second copied up from the
demo. It fails in both directions: the demo's own `../../wireframes/goal.html`
lands in `design/wireframes/`, 87 times.

**2. The tirage - 152 links, and not a mistake.** A coloured screen points at
`content-legal.html`, `goal.html`, `catalog-page.html`; the link was right when
the page was cloned and the target has not arrived, because 41 of the 142 screens
are still to be coloured. **The arithmetic closes exactly** - every one of the 152
targets is one of the 41, which is what proves the reading rather than illustrates
it.

**3. One typo.** `design/overview.html:8` asked for
`design/concept/assets/logo-mark.svg` from a file already inside `design/` - the
design hub's own favicon, missing since it was written.

### The 152 are re-pointed at grey, and that is a transfer, not a new decision

A dead click is not a decision anyone took; it is the absence of one. The
product already holds the answer: **`design/kit/*.html` renders 193 deliberate,
resolving links into `../../wireframes/`** for exactly this case - a screen with
no coloured edition yet. `CLAUDE.md` says values move and are never re-derived,
and that applies to an answer as much as to a number. So `design/checkout.html`
now reaches `../wireframes/content-delivery.html`, which is the real screen with
the real text, and at Крок 6 it re-points to the coloured twin by the same rule.

**Said out loud, because it is visible:** the coloured product now walks into
grey for those 41 screens, and there is no way back - grey's own links stay
inside grey. That is one word away from being reversed if the owner would rather
see a 404 than a leak, and it is the honest picture of how much is left.

**The worst single one was on the primary audience.**
`design/coach-session-addclient.html:304` carried
`<a class="ac-new" href="coach-client-new.html">` with **no onclick fallback** -
a plain 404 on «＋ Новий клієнт», not a dialog that failed to open. Its two
neighbours (`coach-clients.html:57`, `coach-client.html:48`) have
`onclick="…;return false"`, so the same dead href was invisible on those.

### The fix is a rule, and the rule is read off the href

`tools/links.mjs`, the fifth check: report by default, `--write` to re-point.
Never a typed table of corrections - **the href already says what it wants.**
Drop the `../` run, keep the rest as a tail, find the file whose path ends with
it. One candidate is the answer; several, and the linking file's own top-level
folder decides first, then `wireframes/`. That order is what keeps
`catalog-page.html` off `ia/catalog-page.html`, which is an IA specification page
and not a screen. **More than one survivor and it writes nothing** - a tiebreak
typed into the file would be the hand-written list this folder exists to avoid.
803 links, 56 distinct rewrites, 0 ambiguous.

### Three things the instrument had to be taught before it could be trusted

**An escaped markup sample is not a link, and this one was caught before the file
existed.** `design/kit/stack-action.html` prints `&lt;a … href="..."&gt;` in its
«Розмітка» section, and the first probe read the two of them as dead. 16 more hid
in comments and code samples across the kit. Same shape as `css-comments.mjs`
reporting a regex literal: an instrument that reports a correct line trains you to
ignore it.

**A link the page writes at runtime cannot be read statically**, and half-parsing
it is worse than skipping it - the first probe reported `' + n.file + '` as a dead
href on `index.html:227` and `ia/structure.html:188`. `<script>` blocks are
blanked. `_nav.js` building the sidebar from the registry stays outside what this
check can see, and that is stated in the file rather than left to be discovered.

**Blanking has to keep the length, and that is not tidiness - it is what makes
the write safe.** The scan runs on the blanked copy and the edit lands on the real
one, so the two must agree on every offset; a `<script>` collapsed to one space
shifts everything after it and the splice writes into the middle of the next tag.
Measured before it was fixed: three files in `design/` carry an href literal both
live and inside a blanked region - `coach-clients.html` has `coach-session.html`
3 times live of 4 - so a string-level replace would have edited the copy inside
the comment too. None of those three was dead this time. **Next time is not a
plan.**

### Verified

`links.mjs` 4589 hrefs, **0 dead** (from 803). `accept` 88 @390 - 0 · `vars` 175 -
0 · `css-comments` 89 balanced. 68 files, 252 insertions and 252 deletions, which
is what a pure re-pointing looks like.

**And the same question asked of the server rather than of the filesystem**,
because they are not the same question - case, directory indexes and encoding all
live there: **2050 distinct (page, target) pairs fetched over http, non-200: 0.**
Then followed by hand in a real browser: coloured checkout → «Доставка й оплата» →
grey delivery page; `design/kit/hero.html` → «Протеїн» → the COLOURED listing;
`design/kit/demo/hero.html` → «За ціллю» → the grey catalogue hub.

---

## Step 8.19 - A10 closed by the owner, and the re-count found the record wrong in four places

**The owner's decision, 2026-08-12: «не проходить - це для нас нормально, для
магазину».** Sub-AA accent text is accepted for this shop. **Nothing on screen
changes.** Two further decisions taken in the same breath: section D's four `[?]`
number groups **wait until the end of all stages**, and the grey-only screens
**stay for Крок 6, after stage 09** - which is where the roadmap already had them.
(The count was written here as 41 and step 6 measured **54** on 2026-08-14: 142
files in `wireframes/` against 88 in `design/`, with no coloured screen lacking a
grey twin. The decision is unchanged, the number was stale.)

### The decision was recorded only after counting again, and that was the whole step

A10's census ran at step 7.81 over **40** coloured screens. There are **88**.
Writing a decision on top of that number would have been step 8.15's defect
repeated - *a stale number reaching a design decision* - so the census was rebuilt
first: every element the browser paints `rgb(255,90,0)` **that owns visible
words**, read against the ground it actually composites onto, at **390 and 1280**,
with **every state opened**.

**@390: 18 accent-text shapes, 8 fail, 62 instances. @1280: 21 shapes, 12 fail,
172 instances.** Not different marks - the same product at two widths, and the
desktop header carries shapes the mobile one does not. **Six classes:** `.on`,
`.uiv-cur`, `.acc-link`, `.btn--text.btn--inline`, `.cbnew`, `.addr-tag`.

### Four things the sheet had wrong, every one found by counting rather than reading

**1. A10's biggest line had been dead for two steps.** `.badge` «еталон», 28
instances at 2.91, was the largest single item on the sheet. It is not accent any
more: step 8.10 folded `.badge`, `.addr-tag` and `.tf-mini` into one shape and the
colour went with it. Measured on `coach-landing`: «миттєво» and «опт» are ink at
10/700. `.menu-val` «Популярні», also listed as an accepted 3.13 failure, is ink
too. **A step about geometry closed a contrast finding as a side effect and no
record noticed.**

**2. The `₴` was counted as passing.** The sheet reads «eight money shapes,
20-30/700, passes», and of the digits that is true. The `.uiv-cur` beside them
renders at **11px/700** and is **56 of the 62** failures at 390 - the second
biggest shape in the product. The figure and its unit were measured as one thing
and are two. (The 2026-08-07 line in `DESIGN-artifacts.md` had it right at ~39;
the 7.81 census lost it, which is exactly what a re-count is for.)

**3. `.acc-link` is 31, not 8**, because the coach cabinet grew at A13 and 8.7 and
the count did not. One of its grounds, `rgb(242,240,237)` at **2.75**, is the
worst contrast in the product and appears in no record anywhere.

**4. THE BIGGEST FAILING SHAPE HAD NEVER BEEN RENDERED BY ANY CENSUS.** `.on`
«Українська» - the current language - is **82 instances on 82 of the 88 screens**
at 3.13. It lives inside `.wfh-langmenu`, whose box is 0x0 until `toggleLang()`
opens it, so every census read straight past it and every screenshot was taken
without it. A record has carried it as an accepted exception since **2026-08-07**,
at 34 screens, and in all that time nothing had drawn it to look.

### And the instrument's own defect, which is why

`tools/states.mjs` matched openers on `open[A-Z]` **plus two names typed out**.
Measured against the product's actual globals: **`toggleDrawer` is not a function
in either layer** - a dead name, precisely like `openClientDlg`, the defect this
file's own header says it exists to have fixed - while **`toggleBurger`,
`toggleDrCat` and `toggleLang` are real and were never walked.** Half the typed
half was wrong and the missing half was three times its size.

**A hand-written list of two is still a hand-written list.** Widened to
`toggle[A-Z]`; the opener count went 1740 -> 2002 per width. **The widened walk
still reports «none»**, so what was broken was coverage and not marks - which is
why this survived so long. The instrument was right about everything it looked at,
and the question was never what it saw but what it never opened.

### The rule changes out loud, and only because the measurement says to

`DESIGN-artifacts.md` locked «accent on text only from >=19px bold, because
`#FF5A00` on white is 3.13:1 - AA for large text only». With AA no longer the
gate, that sentence's stated ground is gone. The line **stays**, on the ground it
always really had: the accent is the loudest thing in the system and the single
action colour, so it is spent on large type or not at all. What it stops doing is
speaking about SIZE when the measurement says the SURFACE decides:

- **Accent on the inverse ground is allowed at any size.** `.hptag` is 12/500 and
  reads **5.45** - AA everywhere - and a rule written in pixels forbade it for no
  reason a measurement supports.
- **A warm surface costs 0.16 and the rule never mentioned it.** `.cbnew` is
  30/600, large text by WCAG regardless of weight, and still fails at **2.97
  against 3.0 - by 0.03** - purely for standing on `--bg-surface` rather than
  white, where the identical mark reads 3.13 and passes.

Said once and then left with the decision: sub-AA text is harder to read for
low-vision and older buyers, and what an EU/UA storefront is obliged to do is
`[?]` - no source was opened this session, so nothing is asserted. All six classes
are named precisely so the call is one move to reverse.

### Carried to every edition, because no product string exists twice

`DESIGN-artifacts.md` (the source) · `DESIGN.md` · `CLAUDE.md` pointer · `_nav.css`
header · `design/kit/kit.html` · `design/kit/color.html` (the published table,
rebuilt from the new census) · `design/kit/button.html` (its «лишилось відкритим»
was this exact question, now closed) · `design/kit/docs/architecture.md` and
`design/kit/architecture.html` (A10 closed, section D's deferral recorded).

**Verified:** `accept` 88 @390 - 0 · `links` 4591 - 0 dead · `vars` 175 - 0 ·
`css-comments` 89 balanced · `states` (widened) - «none».

---

## Step 8.20 - the route to the end, written down because it fell out of a summary

**2026-08-13.** The owner asked a one-line question - «а как же крок 7 темная тема и крок 8
перевірка?» - and it was a correction. The 8.19 report closed with «stage 09 → Крок 6 → section D»
and **two steps were missing from it**, and `README.md` carried the same omission in its «Next:»
line. Nothing had been cancelled; the steps were live in the task list and dropped out of the
sentence that a person actually reads.

### The decision

**The dark theme is IN the MVP.** Until today it was in neither list in `CLAUDE.md` - not In, not
Out - which made it **unratified**, not deferred: the step had entered the stage plan as a technical
consequence of the semantic roles, with no decision under it. Every other item of scope in that file
is named. Now it is too.

**And the order:** stage 08's last three steps all run **after stage 09**, in the order
`09 → Крок 6 → Крок 7 → Крок 8 → section D`. Крок 6 was already moved past 09 by the owner on
2026-08-12; the other two follow it, for a reason that is not tidiness:

- **A theme built before the tirage is verified on 47 coloured screens out of 88.** The other 41 go
  colour at Крок 6 and would meet the theme from behind. That sentence is already written on the
  stand once - `design/kit/system-page.html`, the «темна тема» row: «не бачена - перевірити немає на
  чому, кольорового екрана з цими класами не існує». Building early writes it forty-one more times.
- **The dark rungs of the warm scale are stage 09's subject**, not a leftover of 08. A palette is
  decided where palettes are decided.

### Measured before writing it, not assumed

- **Precondition met.** 4512 role reads and **0** raw colour values across the component files.
  `consolidation.md` claimed exactly this at step 5.9 and it is still true, so the theme really is
  an override of the semantic block and nothing else.
- **The palette has no dark surfaces.** `--warm-700` is lightness 34, `--warm-900` is 11, and there
  is no rung between them. Eight rungs, a 23-point hole where the theme has to stand.
- **`[data-theme="dark"]` does not exist in the code.** One occurrence in the whole repository, and
  it is prose on `color.html` saying the block is missing.
- **One inline colour literal on the whole coloured product**: `design/coach-home-free.html:111`,
  `background:#fff`, inherited byte for byte from the frozen grey twin at
  `wireframes/coach-home-free.html:106`. Inline beats every token, so the theme cannot reach it; the
  fix is one declaration, in the coloured copy only.
- **The concept stand's 32 literals are not in the way** - `concept.html` 27, `directions.html` 5. A
  palette swatch showing `#FF5A00` has to be a literal or it stops being a swatch.

### And the measurement found a published number that had been wrong since 7.30

`design/kit/button.html` carried «**six** footer links have an inline `style` … a finished wall
standing in front of the dark theme». **Both halves were wrong.**

1. **It is three, not six.** Measured at `wireframes/_nav.js:1940`: three links, all `.wff-soc`, all
   carrying `color:inherit` and no second declaration. Six was true until **step 7.30**, which took
   the inline off the legal row - and that step *wrote the three down itself*, in the «Found, not
   fixed» list of `consolidation.md`, and nobody carried it back to the page. **The same defect
   shape as `.badge` at 8.19: a later step made a number false and the page never heard.**
2. **`color:inherit` is not a wall for a theme at all.** The colour comes from the parent, the
   parent is themed, so the three links switch on their own. What survives of the finding is
   narrower and still true: those three cannot carry a role of their own.

Both editions corrected, and the withdrawn wording left visible beside the correction.

### Where the route lives

**`README.md`, under «The route to the end»** - one place, because status has two homes in this
project and a third only drifts. `CLAUDE.md` gained the scope decision (the dark theme in the In
list) and not the order; it points at README for that. The visible edition for whoever decides is
`design/kit/color.html`, whose «Темна тема» section stopped saying «немає в коді» and now carries
the decision, the measured obstacles and the withdrawn number.

---

## Step 8.21 - the gate could see 88 of 203 pages, and the first look at the rest found two defects

**2026-08-13.** Written down at the foot of 8.20: `accept.mjs` takes its subject
from `pages()` in `lib.mjs`, and `pages()` read **one directory level**. So
`design/` meant the 88 product screens, and the stand's 87 pages, its 25 demos
and the 3 concept pages were outside every walk that trusted it. The gate had
been printing «88 screens, failures: 0» over a folder that holds **203**.

`vars.mjs` had the same defect in its own hand - two directories typed out,
`design` and `design/kit` - which is why its number was 175 for so long and
`design/kit/demo/` was never read at all.

### The fix is one walking finder, not three lists

`pages()` now walks, and `accept`, `states` and `vars` all take their subject
from it. `vars.mjs`'s two hand-typed directories are deleted. *A finder that
looks one level deep is the same defect as a list typed from memory - point 1 of
`states.mjs` - it just fails where nobody thinks to check, and prints a number
that sounds like coverage.*

### What the first run that could see them found

Two defects on `design/concept/`, published since **stage 06**, on pages no gate
had ever opened:

1. **`sections is not defined`, thrown on every load** of `concept/concept.html`
   and `concept/directions.html`. A gutted `<script>` block: six blank lines
   where the declarations used to be and one surviving line calling them. The
   page's own scrollspy was replaced by `/_nav.js`, which runs the
   IntersectionObserver over `NAV_SECTIONS` itself (`_nav.js:221`); the
   declarations went and the call stayed. Both blocks removed.
2. **53px of sideways scroll at 390** on `concept/concept.html`, and the same 443
   at 360. One element: the contrast table, whose four columns of prose resolve
   to a min-content of 423 that beats its own `width: 100%`. Wrapped in
   `.tscroll{overflow-x:auto}` - the same rule `.kp-scroll` states on the kit
   stand. The table scrolls inside its own box, the page never does.

### And a third, which is NOT fixed here because it is a step, not a defect

Running the gate at **360**, which is the width `CLAUDE.md` names («narrow to
360px, and only then say done») and not the 390 the gate defaults to, **four
coach screens scroll sideways by 10px**: `coach-session-addclient`,
`-addempty`, `-oos`, `-priceblock`. One element on each, `button.btn.qa-add`,
«Додати клієнту».

**That button already has a fix, written at step 7.97**, and the comment above it
in `coach-session.css` is three paragraphs long. The fix is a
`@media (max-width: 479px)` block that stacks the row so the button gets a full
second line - and every selector in it is gated on `.coach`.

**The six state screens of the coach session do not carry `.coach` and never
received it.** Measured:

| screen | private declarations | raw values |
|---|---|---|
| `coach-session` (the base) | **0** | **0** |
| `coach-session-addclient` | 446 | 234 |
| `coach-session-addempty` | 443 | 234 |
| `coach-session-priceblock` | 340 | 181 |
| `coach-session-oos` | 330 | 177 |
| `coach-session-loading` | 320 | 174 |
| `coach-session-newclient` | 261 | 140 |

The base screen is fully migrated to the system; its six states are the
**pre-Крок-5 edition**, carrying the component restated by hand in raw values -
`44px`, `13px`, `#bbb`, `#aaa`, `1.5px`, `background:#fff`. They pass `vars.mjs`
because the names they do use are declared; the architecture was never the thing
that file asks about.

**Across all 88 coloured screens: 57 carry no private CSS, 31 carry 4898
declarations with 2634 raw values between them**, and the twelve largest are
almost all coach screens - the primary audience. The task list sizes this piece
of Крок 6 as «~600 lines of private CSS»; the measurement says otherwise, and
that estimate is now replaced by the count.

Not started here. It is Крок 6's subject, it needs the owner's word on ordering
against stage 09, and a 6-screen migration folded silently into a step about an
instrument is exactly the kind of thing this file exists to prevent.

### And the state walk, on the same widened subject, found a fourth

`states.mjs` over 203 pages came back with two rows, both on `kit/toast` - the
only stand page that also loads the product's runtime, so the only one the walk
can open anything on. Both said the same thing: **one `←` still typed, turned
into a glyph the moment the pass ran again.**

It was not the toast. It was **`a.kn-back`, «← Вся система», the stand's own back
link**, rendered by `design/kit/_nav.js:501` as `&#8592;`. `marks.js:341` maps
that character to `arrowLeft` and states in capitals that «`←` and `‹` are here
and nowhere else» - but the kit nav renders **after** `uivChrome()` has already
run on the page, so nothing had ever marked it. **112 stand pages drew that arrow
in the body font while the product beside them drew it from the set**, and no
pass had ever looked, because no walk could see the stand.

One line, and it is the rule rather than the instance: the nav marks the subtree
it just rendered, `uivMarks` is idempotent, so it survives a re-render and costs
nothing. Verified on `kit/toast` after an opener, on a plain kit page and on a
demo page: zero typed arrows left. The walk now says «none» again.

**Gates after the step:** `accept` **203** @390 - 0 · `states` **203** - «none» ·
`vars` **203** - 0 · `css-comments` 89 balanced · `links` 4591 - 0 dead.
Two of those numbers were 88 and 175 this morning.

---

# STAGE 09 - DESIGN SYSTEM

## Step 09.1 - the dark end of the warm ramp

**2026-08-13.** First step of the stage, taken because it is the only thing in
the route that **blocks a later one**: Крок 7 cannot stand a dark theme on a
scale that has nowhere dark to stand it.

### What was measured first

The warm ramp, read off `tokens.css` and computed rather than eyeballed:

| token | hex | H | S | L\* |
|---|---|---|---|---|
| `--white` | `#FFFFFF` | – | 0 | 100.0 |
| `--warm-50` | `#FAF9F7` | 40 | 23.1 | 97.9 |
| `--warm-100` | `#F2F0ED` | 36 | 16.1 | 94.9 |
| `--warm-200` | `#E9E7E2` | 43 | 13.7 | 91.7 |
| `--warm-300` | `#D9D9D9` | – | 0 | 86.7 |
| `--warm-600` | `#6E6A62` | 40 | 5.8 | 44.9 |
| `--warm-700` | `#5B5B54` | 60 | 4.0 | 38.5 |
| `--warm-900` | `#1C1C1C` | – | 0 | 10.3 |

**Two holes, and the published record named only one.** `color.html` said «no
rung between lightness 11 and 34», which is true; there is a **larger** one
between `--warm-300` and `--warm-600`, 41.8 in L\*. That one is a mid-tone hole
and not what a dark theme needs, so it is named here and left alone.

**And the light end is not warm all the way through**: `--warm-300` and
`--warm-900` are both **S 0**, pure neutral greys inside a ramp called warm
neutrals. Both are plate pixels, so that is what the plate gave.

### The rule, so that no number is invented

Hue and saturation from **`#F2F0ED`**, the plate's locked Warm Neutral (H 36,
S 16.1). The ground is the light end's own: *A3, warmth in the neutral, anti
sterile-pharma* - an argument about neutrals, not about pale ones.

Lightness from **the light end's own step sizes in L\***: white → `--warm-50` is
2.1, then 3.1, 3.2, 5.0. The dark end walks those four upward, anchored so that
**`#1C1C1C` lands on the second rung unchanged**. It is a plate pixel and the
product's ink; it is not re-derived, the mirror simply agrees with where it is.

| token | hex | role it is built for | L\* | accent on it |
|---|---|---|---|---|
| `--warm-950` | `#191612` | dark page | 7.4 | 5.76 |
| `--warm-900` | `#1C1C1C` | dark surface - **unchanged** | 10.3 | 5.45 |
| `--warm-850` | `#26211B` | dark sunken | 13.1 | 5.10 |
| `--warm-800` | `#2D2821` | dark hairline | 16.4 | 4.67 |
| `--warm-750` | `#39332A` | dark track | 21.6 | 3.99 |

Resulting dark steps: 2.5 / 3.2 / 3.1 / 5.2 against the light end's 2.1 / 3.1 /
3.2 / 5.0. **Primitives only.** The semantic block is untouched and
`[data-theme="dark"]` is Крок 7's to write.

### The rejected candidate is the evidence, so it stays written down

The other rule was equally underived: mirror hue and saturation **per rung** from
the light pair. But three of the five pairs are themselves neutral - white, the
fixed Ink, `--warm-300` - so the ramp came out `#171717` / `#1C1C1C` / warm /
warm / `#343434`: a **visible temperature wobble**, the track reading cool
between two warm neighbours. Both were rendered at 1100 with real text, ink and
accent on every rung, and chosen by eye, because that is where a ramp is decided.

### And it changes what A10 means

`#FF5A00` clears **4.5:1, full AA for normal text, on every dark rung a word can
sit on**: 5.76, 5.45, 5.10, 4.67. Only the track falls to 3.99, and no text sits
on a track. **The sub-AA compromise the owner accepted on 2026-08-12 is a
property of the pale grounds, not of the accent** - the same mark reads 2.97 on
`--bg-surface` and 5.10 on `--warm-850`. The decision stands for the light theme
and **is not inherited** by the dark one.

### The page caught the change, and then the change caught the page

`color.html` has a self-check that lists tokens declared in the file and not
shown on it. It would have flagged all four - the ramp list on that page is
typed - so the four names were added and the check now reads **«all 130 tokens
shown»**.

**Then the new rungs broke its duplicate detector**, and that is the better
finding. It compared neighbours at **ΔL ≤ 2 in HSL L**, which is not
perceptually uniform: it compresses at the dark end, so the ramp's own single
step reads as **4** between `--warm-100` and `--warm-200` and as **2** between
`--warm-850` and `--warm-800` - the same 3.2 apart in L\*. The pair would have
been reported as one colour under two names while the identical light pair went
unmentioned. The detector now measures in **L\***; the cards still print HSL
because that is what the token names are shaped like, but nothing that decides
uses it. Both panels read «пройдено».

## Step 09.1b - the dark theme, made visible before it is built

**2026-08-13.** The owner asked why they could not see a dark theme. Two answers,
and both were true at once.

**There was none to see.** Step 09.1 added four values to the palette and
**zero rules read them** - measured, and `color.html` prints it on the cards
themselves as «не читається». The theme is `[data-theme="dark"]` overriding the
semantic block, which is Крок 7's, after the tirage.

**And nothing was published.** The last commit was step 8.19; three steps of work
sat uncommitted, so the live site showed none of it. That half was on me: every
report ended with «не комітив» and none of them said that this is *why nothing is
visible*.

### `design/kit/dark-preview.html`

One page. A wrapper class redefines **fourteen roles and not one component**, and
the same markup runs inside it and beside it - byte for byte, real product
classes (`btn--accent`, `btn--outline`, `btn--ghost`, `field`, `tag-new`,
`tag-pop`, `pnew`, `pold`).

**The override block lives in the page, not in `tokens.css`.** That is the point:
the owner has not seen the theme yet, so the theme does not exist in the system
yet. What the page proves is the claim step 5.9 made - that a theme here is an
override of the semantic block and nothing else. Everything followed: the
inverse bar flipped, the field inverted, the badges inverted, the accent stayed
put. **Nothing leaked a raw colour**, which is the strongest evidence yet that
the components really are free of values.

### What it made visible, which a table would not have

**The two-level text hierarchy goes almost flat.** Measured inside the card, on
`--bg-surface`: light gives 16.2 for the title and **6.5** for the caption under
it, 2.5x quieter. Dark gives the same 16.2 and **12.1**, only 1.3x. The cause is
already recorded: `--text-secondary` and `--text-muted` have **no dark rung**.
The mirror needs L\* **65.4** and **58.5**, and those land inside the ramp's
**other** hole - `--warm-300` 86.7 to `--warm-600` 44.9 - the one step 09.1 found
and deliberately left alone as «not what a dark theme needs». It is exactly what
a dark theme needs, one level down from the surfaces.

By the same rule the values would be `#AA9D8A` and `#9A8B73`. **Written nowhere
and left `[?]`** until the owner takes them: this step was asked for a preview,
not for two more palette decisions taken quietly inside one.

Registered in `design/kit/_nav.js` under Основи, next to Колір. Gates: `accept`
**204** @390 - 0, and the new page also at 360 - 0 · `vars` 204 - 0 ·
`css-comments` 89 balanced · `links` 4594 - 0 dead.

## Steps 09.1c and 09.2 - the two rungs the ramp never had, and the page that says why

**2026-08-13.** The owner's words were «я чего-то совсем не понимаю что
происходит», and that is a finding about the reporting, not about the work. Both
steps here answer it.

### 09.1c - `--warm-400` and `--warm-500`

The preview showed dark secondary text borrowing `--warm-300` and the two-level
hierarchy going almost flat. The rungs it needed turned out to be **the two
numbers the ramp never had**: it ran `--warm-300` straight to `--warm-600`, and
400 and 500 were simply absent - a 41.8 hole in L\*. Step 09.1 found that hole,
named it and left it alone as «a mid-tone hole, not what a dark theme needs». It
is exactly what a dark theme needs, one level down from the surfaces.

`--warm-400` `#AA9D8A` (L\* 65.4) · `--warm-500` `#9A8B73` (L\* 58.6). Same rule
as the surfaces, and the mirror lands to the hundredth on all three grounds:

| role | light: page / surface / sunken | dark: page / surface / sunken |
|---|---|---|
| `--text-secondary` | 6.84 / 6.50 / 6.02 | **6.78 / 6.41 / 6.00** |
| `--text-muted` | 5.38 / 5.12 / 4.73 | **5.42 / 5.12 / 4.80** |

The preview now uses them and the caption reads quiet again. Still primitives:
nothing in the semantic block moved.

### 09.2 - `design/kit/why.html`

The one page the registry carried as `done: false` since the stage was declared.
It is deliberately **not** another sheet of numbers - the rest of the stand is
that. Three parts:

1. **The route as a picture**, with the current step lit, because the confusion
   was structural: *stage 09 makes values, Крок 7 uses them*, which is why a dark
   theme can be absent from the screen while stage 09 works on its palette.
   Every edge carries its reason, and none of them is tidiness.
2. **The seven decisions everything else stands on**, each with what it produces
   on screen and where it came from: trust first · one action colour · warm
   neutral, not clinical white · role not value · values move, never re-derived ·
   the grey layer is frozen · every number has an origin or is `[?]`. Plus the
   eighth, about the work rather than the look - fix by a rule, and the same goes
   for the instrument - with the price it paid on 2026-08-13 written out.
3. **The three owner decisions visible on screen right now**, each with its cost.

Registered in both registries, `/_nav.js` flipped to `done: true`. Gates:
`accept` **205** @390 - 0, and the new page also at 360 - 0 · `vars` 205 - 0 ·
`css-comments` 89 balanced · `links` 4598 - 0 dead.

---

# CORRECTION - 2026-08-13. The pipeline packs exist, and I had not opened them

The owner's words: «я не понимаю почему мы пошли в разрез етапов... вот скилл
/dp-pipeline /dp-tokens-components /dp-design-system... все остальное по урокам».
They were right on every count, and the packs in `AI Design Workflow/` are the
source of truth this session had been working around rather than from.

## What the packs actually say

- **The dark theme is stage 08 step 7, «Темна тема: стрес-тест системи».** Not a
  finale, not decoration: it goes in EARLY because it breaks whatever is badly
  separated, and early is when that is cheap. `08 - Tokens Components.md`: «пара
  тем обов'язкова з першого рядка... роль без пари не існує».
- **The rollout is stage 12**, after Responsive (10) and Animation (11) - exactly
  as the owner said. `09 - Design System.md`: «у кольорі стоїть вибірка 5-7
  екранів; решта продукту чекає розкотки на етапі 12».
- **Stage 09 has six steps**: patterns and prohibitions from screens · pattern
  showcase · `why.html` · contribution rule · next product screen assembled from
  the system · check and final. `why.html` is its **step 3**, with its content
  specified (from `concept.md` and `references.md`, plus a «Беклог системи»
  section).
- Stage 08's steps 6, 8 and 9 are «звід системи з продуктом», «переїзд вибірки»
  and «перевірка і фінал» - not what the task list had paraphrased them into.

## What I had invented

The route written at step 8.20 - «тираж → тема → доступність», with the argument
that a theme built before the tirage would be verified on 47 screens of 88. The
logic is backwards: the selection is MEANT to stay a selection, the theme is the
stress test on it, and the rollout copies a FINISHED system at the end. The owner
agreed to that route because I presented it as read out of the files. It was not.

Withdrawn in every edition rather than deleted: `README.md` (the section now
states the correction), `CLAUDE.md` (the MVP scope entry), and
`design/kit/why.html`, where the old route stands next to the real one with the
reason. A route corrected silently returns in the same words.

`design/kit/dark-preview.html` deleted and unregistered: it was a substitute for
the switch that should have existed, and the real theme replaced it. What it
found before that stands - the flat two-level hierarchy that produced
`--warm-400` and `--warm-500`.

## Stage 08 step 7, and the debt under it

Step 7 could not run: it stress-tests a theme, and the theme did not exist.
`[data-theme="dark"]` was **0 lines** in the whole repository, so steps 3 and 5
had each delivered half their contract, and step 4's theme switch was missing
too. Written now, before the stress test:

- **23 dark-side primitives**, one rule and no invented number: each keeps the
  hue and saturation of its light twin and solves its lightness so it stands to
  `--warm-950` exactly as the light one stands to white. `--green-400` 5.09 where
  `--green-600` is 5.07 · `--amber-500` 5.93 / 5.92 · `--red-400` 5.64 / 5.66 ·
  `--slate-300` 7.52 / 7.53. Plates keep their distance off the page: `--green-950`
  1.076 where `--green-50` is 1.079, and so on. Alphas flip direction, not opacity.
- **85 semantic roles** given their dark half. The action colour does NOT invert
  and that is the point of the semantic layer: the ground flips, the ink flips,
  and «action» is still action - `#FF5A00` even gains, 5.76 here against 3.13 on
  white.
- **`design/system/theme.js`**, loaded in `<head>` of all 114 stand pages, applies
  the stored choice **before the first paint**; the pack names the defect it
  prevents («щоб сторінка не блимала світлим»). Two states, not three: an `auto`
  mode following `prefers-color-scheme` would need all 85 roles declared a second
  time inside a media query, and two copies of 85 values diverge on the first edit.
- **The switch in the stand's panel** (`design/kit/_nav.js`), which is step 4's
  debt. The product's own switch is step 8's, when the screens move onto the system.

Verified in the browser: `data-theme="dark"` on `<html>`, body `rgb(25,22,18)`
= `--warm-950`, ink `rgb(250,249,247)` = `--warm-50`. Gates: `accept` 204 @390 - 0 ·
`vars` 204 - 0 · `css-comments` 89 balanced · `links` 4594 - 0 dead.

**Not done here, and it is the actual step 7:** the stress test itself - walking
the whole stand in dark looking for neighbourhood failures (surfaces that merged,
two roles that collapsed into one value, a component that reads a primitive
directly). That is the next step, and it is what step 7 is for.

---

## Stage 08 step 7 - the stress test, and `tools/theme.mjs`

**2026-08-13.** The pack's own question, and it is not step 5's: there it was
about ONE file («did I just write a literal»), here about **neighbourhood**, which
on a single component cannot be asked at all. Four classes, in the pack's order,
and the first two need no browser.

`tools/theme.mjs` is the sixth check. It reads the ink/fill/line table off
`color.html`, where the project already declares which surface each role paints -
one declaration, two readers - because the threshold depends on the surface and
`--bg-rule` is a fill that draws a line.

### The instrument was wrong three times before it was right, and each is written in it

1. **«0 roles in `:root`, all 86 missing.»** The marker `SEMANTIC - roles` is
   itself a comment, and the file stripped comments *before* searching, so
   `indexOf` returned -1 and `slice(-1)` handed the check one character. Visible
   only because the number was absurd - «3 missing» would have been believed.
2. **28 primitives reported as roles without a light half.** «Everything after
   the marker» swept in the dark-side primitives, which live in a `:root` of
   their own further down. Now it stops at the end of its own block.
3. **Nine of the first twenty class-4 findings were the probe's alpha bug.** Half
   the roles here are tinted plates - `rgba(56,154,86,.07)` - and taking that as
   solid returns the pill's own hue as its own ground, so ink and ground come out
   identical and a perfectly readable pill reports 1.00. The ground is composited
   now, through the whole ancestor chain.

### What it found, and what was done

- **1 - a role with only one half:** `--line-rule`, declared in the dark block and
  read by nobody. Deleted. Now **87 / 87**.
- **2 - a component reading a colour primitive directly:** `loyalty-rung.css`,
  `--brown-600` and `--slate-400` on `.uiv-tier.t1` and `.t2`, so two of the four
  tier marks did not follow the theme while their siblings (t0 on `--text-muted`,
  t3 on `--text-action`) did. **Why step 5 looked past them:** step 5.9 recorded
  them as the exemption «two loyalty metals where the value IS the meaning» -
  true, and not a reason to skip the role. They are `--mark-tier-bronze` and
  `--mark-tier-silver` now, and both halves hold the same value **on purpose**:
  the mark is a glyph, its bar is 3:1, and both clear it in both themes (bronze
  4.66 / 3.87, silver 3.86 / 4.67). A silver darkened to match its light contrast
  stops looking like silver.
- **4 - the swatch cards on `color.html`** picked ink by the swatch's own
  lightness but wrote `var(--text-primary)`, which flips with the theme: light ink
  on the white, `warm-50`, `orange-25` and `green-50` swatches, 1.00 to 1.05.
  A swatch's ground is a fixed VALUE, so its ink is a literal now - except on the
  alpha swatches, whose ground genuinely is themed, and there the role is right.

### Withdrawn on verification, and the withdrawal stays

`--mark-faint` + `--text-price-was` collapse onto `--warm-600`. Spreading them
produced a **second** collapse one rung down, which is the signal that the check
over-reported rather than that the system was wrong. The pack's rule carries a
clause the checker did not: «зійшлись в одне значення, **тож два різні компоненти
стали невідрізнюваними**». A placeholder and a struck price are told apart by
position and by the strike, and the same file says «дві ролі = два токени, навіть
якщо значення сьогодні однакове». Class 3 is labelled **candidates** now.

`kit/kit.html` is excluded by kind - the pack calls it «ЗАМОРОЖЕНИЙ смоук етапу
07», a deliberate snapshot that assumes a light ground. Eleven findings came from
it and every one would have been a lie about the system.

### Open, measured, and the next fix - the label on an accent fill

**25 shapes, 44 instances, across 8 stand pages.** `.tag-new`, `.hptag`, `.hb`,
`.tbadge`, `.q`, the selected chips: an accent fill with a label that reads
`--text-primary`. In light that is ink on orange, **5.45**, and
`DESIGN-artifacts.md` locked it deliberately. In dark `--text-primary` flips to
`--warm-50`, so the same label becomes near-white on the same orange: **2.97**,
and the chips **2.70**.

**No component is broken and each reads its role correctly** - which is the exact
sentence the pack uses for this class. The fill does not invert, so the ink on it
must not either: the fix is a role that means «ink on the action colour», equal in
both themes, and the components that hard-read `--text-primary` on an accent
ground move onto it. That is the next step, and per the pack it is step 7's
harvest rather than its failure: «якщо для теми довелося правити хоч один файл
компонента - це не провал кроку, а його врожай».

Gates: `accept` 204 @390 - 0 · `vars` 204 - 0 · `css-comments` 89 balanced.

## The product's theme switch - the owner asked for it in the top bar

**2026-08-13.** The pack puts the product's switch at step 8 («перемикач у
продуктовій панелі `design/_nav.js` поставить крок 8, коли екрани переїдуть на
систему»). The screens are already on `system/index.css` - that migration
happened - so the condition behind step 8 is met and the owner asked for it now.

**Sun and moon, in the top bar beside «Одеса» and «Укр»**, at the owner's own
pointing. Two new glyphs in `icons.js`, drawn on the set's grid and stroke.

**It is INJECTED, not typed into the markup**, and that is the whole architecture
in one control: the top bar is rendered by `wireframes/_nav.js`, the frozen grey
layer, and «колір ніколи не лягає на wireframes». The grey prototype keeps one
theme and knows nothing about the button; the coloured layer adds it to what the
grey layer drew. `uivThemeBtn()` is idempotent, so a dialog that rebuilds the
header does not stack a second one.

**The label says what it will DO, not what is on**: a moon means «switch to
dark». A control labelled with its current state reads as «you are here» rather
than «press me». Verified by a real click: `aria-pressed` and the label both
follow, and the glyph swaps.

`design/system/theme.js` now loads in the `<head>` of the 87 product screens as
well, so the stored choice is applied before the first paint here too.

**Not fixed yet, and it is visible in dark**: the 25 shapes / 44 instances of «an
accent fill with a label reading `--text-primary`» that the stress test found.
The buy button is right (white on orange is a locked decision), the badges and
selected chips are not.

Gates: `accept` 204 @390 - 0 · `vars` 204 - 0 · `css-comments` 89 · `links` 4594 - 0.

## The harvest of step 7: one role was carrying two grounds

**2026-08-13.** The pack says the dark theme is a stress test and that a
component file it forces you to edit is not a failure of the step but its yield:
«якщо для теми довелося правити хоч один файл компонента - це не провал кроку, а
його врожай». This is that yield, and it turned out to be one defect wearing
nine faces.

### What the measurement actually said

`tools/theme.mjs` gained a LIGHT column beside its dark one, and that single
column reclassified its own output. Twenty-five shapes had been reported as
damage the theme did, and I had read all twenty-five that way. With both numbers
in view the final count is **48 shapes: 7 the theme broke, 41 that fail in both
themes and are older than it**. Three of the instrument's own readings were
wrong, and each is fixed in the file with the wrong version written beside it:

- **ink with zero alpha is not ink.** Nine photo slots carry the word «фото» at
  `color: transparent` - alt text behind a real photograph. Read as opaque it
  came out 21.00 on the light page and 1.16 on the dark one, two numbers about a
  word nobody paints.
- **a ground the probe cannot see must be said, not guessed.** `.pl-panel` paints
  its packaging out of two gradients and no background colour at all, so the walk
  kept climbing and reported the page behind the panel. That is where 1.02 on
  «1 мірна ложка» came from. Such readings are now listed apart, uncounted, with
  their own printed total so the exemption cannot go quietly empty.
- **and the transparency test itself was wrong twice, which is the part worth
  keeping.** Written first as a regex it went looking for a literal «s», because
  a single backslash inside the probe's template literal is eaten before the
  string is ever a regex. Rewritten to match «, 0)» at the end it then also
  matched `rgb(255, 90, 0)` - the accent - and silently removed every orange word
  on the stand from the measurement, including one of the two real findings of
  this step. Both versions produced a SHORTER list, and a shorter list from a
  checker reads exactly like progress. It is now a test on the fourth component:
  a colour is transparent when it has an alpha and that alpha is zero.

The row cap went too. The listing printed 40 of 48 and said nothing about the
eight, and eight rows dropped in silence are indistinguishable from eight that do
not exist.

### The defect

`--text-oninverse` was declared with this comment: «the label on every dark **and
every orange** fill». Two grounds in one role, and while there was one theme it
cost nothing. The dark theme separates them: `--bg-inverse` flips to `--warm-50`
and its ink follows down to `--warm-900`, while `#FF5A00` stays exactly where it
is. So every white label on the accent went near-black in one step - and in the
other direction the ink labels riding `--text-body` went near-white on the same
orange. Measured: `.chip.on` 4.78 -> 2.55, `.tag-new` / `.hb` / `.tbadge` /
`.q` 5.45 -> 2.97.

The accent button is the one the instrument could NOT see, because near-black on
orange is 5.45 and passes. It broke the locked decision of 27.07.2026 instead of
a threshold, and a contrast check has nothing to say about that.

The same thing had happened on the LINE surface: `--line-onink` was drawing the
tick inside a filled checkbox and the ring around the price knob, neither of
which is on an inverse ground. In dark the ring went to `--warm-900` and read
**1.36** against its own track - a 3:1 line at a third of its threshold, and the
knob had no outline at all.

### The fix - three roles, each equal in both themes

Equal halves are the exception this file allows only when the ground itself is
exempt from the theme, which is exactly the case here and already the case for
`--text-action` and `--bg-action`.

| role | value | why that value |
|---|---|---|
| `--text-onaction` | `--white` | 3.13. The owner, 27.07.2026: a label on an orange fill is white at any size, so that one action looks like one action |
| `--text-onaction-ink` | `--warm-900` | 5.45. Step 7.47: small orange things which are NOT buttons keep the ink label, and for the 14px chip family it is the only edition that clears AA |
| `--line-onaction` | `--white` | the line twin of the first, on the same unmoving ground |

Sixteen rules moved across twelve files, plus two private blocks on the stand.
`--text-oninverse` keeps the inverse surface and only it; `--line-onink` is down
to its one true reader, the error toast's border. Its old comment claimed five
readers and four of them were somewhere else entirely - one of them was not even
a line, it was `--ring-onink`, a shadow.

### And a seventh check, because the stand had gone quiet

Every component page prints the tokens its CSS reads, and all 69 of those lists
are typed by hand. The role split invalidated twelve of them and nothing in the
repository noticed, because nothing was asking. `tools/roles.mjs` asks: the left
side is every `var(--name)` the component file contains, the right side is every
`<code>` inside the page's own table.

It reports **35 of 82 components adrift**, and only twelve of those are today's.
The other twenty-three are older - `otp.html` lists five tokens its file does not
read, `restock-note.html` six, `loyalty-rung.html` still names the two primitives
that became `--mark-tier-bronze` / `--mark-tier-silver`. Twelve are corrected
here; the rest is a named list for step 9, not a silent sweep.

The check is a REPORT and not a rewriter on purpose: the primitive column is
ordered by meaning (`--space-2 --space-4 --space-8 --space-12`), and a generator
would flatten that across 69 pages to fix twelve.

### What is left after the split

Seven shapes still change for the worse between the themes, and only two of them
are the product's: `.hptag` and `.hps` below. Four are one swatch on
`color.html` - `--scrim-white-50`, a 50% white scrim shown over a ground the
stand chooses - and one is `.ct`, the chip's count, at 4.47 against a 4.5
threshold it clears by 0.14 in light. Everything the role split touched is now
equal in both themes, including the accent button, which fails at 3.13 in BOTH -
that is A10, accepted by the owner on 12.08.2026, and the point is that the theme
no longer changes the story.

### Left open, and it needs the owner

The hero strip's first tile is a dark card by design - `--bg-inverse` - and in
the dark theme it turns light, as «inverse» is defined to. Its heading follows
correctly, its other two lines do not: `.hptag` reads `--text-action` (5.45 ->
**2.97**) and `.hps` reads `--text-onphoto` (17.04 -> **1.05**) on a card that is
no longer a photograph and no longer dark. The question is not which role to
patch: it is whether an INVERSE surface should invert at all, or whether the
charcoal brand plate stays charcoal in both themes. That answer moves the toast,
the top bar and the promo card together, so it is the owner's.

Gates: `theme` 90/90 roles paired, 0 primitive leaks · `vars` 204 - 0 ·
`css-comments` 89 · `links` 4594 - 0 dead.

## Step 7.9 - the panel that walks the screens went white on white, and the reason it was never seen

The owner opened a product screen in the dark theme and asked why the left panel
was broken there when the design system's own panel next to it was fine. It was
broken. Every quiet word in it - the flow heads, the node numbers, the arrows,
the caption, the foot links - was rendering at **1.05** against its own plate.

### The instrument had never opened a product screen

`tools/theme.mjs` chose its subject with three words: «starts with `kit/`, not
`kit/demo/`, not `kit/kit`». That is **87 pages of 203**. The other 116 include
all **88 coloured product screens** - the thing the system exists for - and the
check had not opened one of them since it was written. It did not read like an
omission. It read like a scope: the dark theme is a property of the SYSTEM, so
measuring the pages that document the system sounds like the whole job.

Pointed at `design/index.html` for the first time it returned **14 shapes, 42
instances**, and 32 of those instances were the panel.

The subject is now the whole folder minus `kit/kit`, which stays out BY KIND (the
frozen stage-07 smoke, and its own line has said so since the file was written).
Two more holes were closed with it, both of the same family - a page that leaves
the run unmeasured used to be one character on a progress line:

- **the probe cannot fail silently.** `uivTheme('dark')` is a call INTO the page,
  and a page without `theme.js` swallows it without a sound. The probe then walks
  a LIGHT page, calls the reading «dark», compares it against itself and reports
  a perfect result. It now returns the theme it was actually standing in, and the
  caller refuses the reading when it is the wrong one.
- **the two failure buckets are counted.** `зміряно: 199 з 203`, and the four are
  named: `concept/concept`, `concept/directions`, `concept/logo` (stage 06, their
  own brand tokens, outside the system on purpose) and `design/overview.html`
  (the stage hub, built on the roadmap chrome like `/index.html`). None of the
  four is a product screen, and that is the answer the count was for.

### The defect: a frame painted for a plate that moves

`.uiv-side` stands on `--bg-inverse`. That role flips - «inverse» means «opposite
of the page», so charcoal `#1C1C1C` becomes `#FAF9F7` when the page goes dark -
and **the flip is right**: it is how the frame keeps saying «I am not the
product» after the product itself turns dark. What was wrong is that
`design/_stand.css` painted **sixteen `rgba(255,255,255,.x)` literals** and read
**one colour primitive directly** (`--scrim-white-70`, the chevron) onto it. White
at .5 on charcoal is a quiet grey. White at .5 on `#FAF9F7` is nothing.

The file was invisible to both existing checks by construction: `theme.mjs`'s
leak check reads `design/system/components/`, and so does `roles.mjs`.
`_stand.css` is neither a component nor a stand page - it is the frame - and
«neither» meant «nobody's».

Nine values became **five paired variables**, and the merges are named: the
caption's .55 joined .66, the flow head's .40 joined .50, three hairlines at
.08 / .10 / .13 became one, and the hover fill at .07 joined the current row's
.08 - the current row is said by the orange bar down its left edge, never by a
1% difference in fill.

**The pair is not the same alpha with a different ink.** It is the alpha that
reproduces the light half's CONTRAST against the plate it actually has, solved
per line:

| | light, on `#1C1C1C` | dark, on `#FAF9F7` | |
|---|---|---|---|
| `--stand-ink-2` | white .66 | ink .75 | 8.02 -> 8.03 |
| `--stand-ink-3` | white .50 | ink .63 | 5.17 -> 5.25 |
| `--stand-ink-4` | white .28 | ink .39 | 2.53 -> 2.50, disabled in both on purpose |
| `--stand-rule` | white .10 | ink .14 | hairline |
| `--stand-fill` | white .08 | ink .11 | hover and current |

They are declared in `_stand.css` and read only there. The file exports
`--shell-top` and `--shell-left` and nothing else; the frame's own greys are the
frame's business, not the system's.

### The same disease as yesterday, in the file yesterday could not see

Four labels riding the accent fill read `--text-body`: `.us-all`, `.uiv-tag`
twice and `.us-st.on`. `--text-body` inverts, `#FF5A00` does not, so «Усі екрани»
and «Базовий» went from ink at 5.45 to near-white at **2.97** on the same orange.
That is exactly the split of 2026-08-13, and the role for it already existed -
`--text-onaction-ink`. The twelve component files were corrected that day;
`_stand.css` was not among them because it is not a component.

### `--text-onphoto` is deleted: its ground never existed

The role was declared «the caption over a photograph, where the surface is
unknown». It had **one** reader in the whole system - `hero.css:31`, the subtitle
of the hero's first promo tile - and that tile is a solid `--bg-inverse` plate
four lines above in the same file. The surface was known, and it was not a
photograph.

A role whose stated ground is fiction reads correctly for exactly as long as its
value happens to fit. The dark theme is what asks: `--text-onphoto` stays white
in both themes (a photo is a photo), the plate under it turns `#FAF9F7`, and
17.04 becomes **1.05**. The right role was already there with three readers on
this very plate - `--text-oninverse-muted` - and it has four now.
`--text-onphoto` has none and is gone, together with `--scrim-white-72`, the
primitive nothing else read. `color.html` (`S`, `ALPHA`, `ROLE`), the three `USE`
censuses, `hero.html` and `banner.html` follow.

### And the role it moved to was 3.66 in the dark

`--text-oninverse-muted` is `--scrim-white-66` in the light, **8.02** on
`--bg-inverse`. Its dark half was `--scrim-ink-52`, **3.66** - a caption that had
quietly stopped clearing 4.5 while its light twin sat at 8.02. The line above
that block in `tokens.css` says why: «scrim, veil, fade: the direction flips, the
opacity does not». **It does not hold.** The same alpha over the opposite ground
is a different contrast, and this is the third time in two days that a value
copied across the flip has been the defect. `--scrim-ink-75`, **8.03**, solved
rather than chosen.

### What the wider subject found that is not this

The full corpus now reports **81 shapes: 28 the theme broke, 53 fail in both** -
against 48 shapes from a subject less than half the size. Everything the panel
and the hero subtitle contributed is gone. What is new and NOT closed here is
named rather than swept, and the first item is most of it:

- **The coach flow's private `<style>` blocks, 21 shapes and 67 instances on 12
  screens.** `.cn-t` and `.cn-s` on the empty coach home, the whole «add a client
  to the session» dialog, `.tier-flag` and `.tier-cta` on the tier screen, the
  outline buttons on three of them, `.ct` on the client list: every one is ink on
  a ground that stays `#FFFFFF` or `#FAF9F7` when the page goes dark, so 17.04
  becomes **1.05**. `.tier-flag` is the shape in one line - `color:#fff;
  background:var(--bg-inverse)` - half a rule speaking roles and half speaking a
  number. Counted at the source: **25 of the 88 product screens carry a raw
  colour literal in a private block, and all 25 are coach screens; the other 63
  carry none.** That is one step with one address, and it is the same disease as
  this one: a ground written as a number cannot move.
- **`.hptag`, «Акція тижня», 5.45 -> 2.97 on the hero's promo plate, 6 screens.**
  Still the owner's, and now the only half of that tile left open: it is an
  accent word on a pale ground, which is the shape A10 accepted on 12.08.2026 for
  five named classes. The question is whether A10 extends to it.
- The rest are the stand's own: four rows of the single `--scrim-white-50` swatch
  on `kit/color`, whose ink is picked by HSL L instead of L\* (already open), and
  the `фото` stubs the stand puts where the product puts an image.

**One shape straddles the threshold and changed bucket between two runs of the
same code**: `span.ct` on `coach-clients-cap` read 4.39 dark / 4.44 light once
and 4.16 / 4.57 the next time, so it counted as «fails in both» in one run and
«the theme broke it» in the other. Its ground is a composited alpha and the
rounding lands either side of 4.5. Written down because a total that moves by one
between identical runs is worth knowing about before someone diffs two reports.

Gates: `theme` 90 roles paired both ways, 0 primitive leaks, 199 of 203 measured
and the 4 named · `vars` 204 - 0 · `roles` 30 adrift, all pre-existing, none in
the files touched here · `css-comments` 89 balanced.

## Step 7.11 - the theme was chocolate everywhere except the surface, and the bear was a silhouette

The owner opened the dark theme and said two things: «шоколадная, но какой-то
вдруг серый», and «медведь темный почему-то». Both were right, both had one
sentence of cause each, and no check in the repository was asking either
question.

### The grey: `--bg-surface` was pointing at the Ink

The dark theme's fills, measured off `tokens.css`:

| role | primitive | value | H | S | L\* |
|---|---|---|---|---|---|
| `--bg-page` | `--warm-950` | `#191612` | 34 | 16 | 7.4 |
| **`--bg-surface`** | **`--warm-900`** | **`#1C1C1C`** | **0** | **0** | **10.3** |
| `--bg-sunken` | `--warm-850` | `#26211B` | 33 | 17 | 13.1 |
| `--bg-rule` | `--warm-800` | `#2D2821` | 35 | 15 | 16.4 |
| `--bg-track` | `--warm-750` | `#39332A` | 36 | 15 | 21.6 |

One row with no hue, and it is the one that paints the most: every card, the
header, the search field, the category rail, the footer plates. The page around
them was warm, so the grey did not read as grey - it read as **the theme
failing** at exactly the places a person looks at.

**The cause is a number, not a colour.** Slot 900 in this ramp is held by
`#1C1C1C`, which is the brand's **Ink** - a plate pixel, neutral by design - and
was never a rung of a WARM ramp at all. Its own comment admitted the double job:
«plate pixel - Ink. Also the dark surface.» Stage 09 step 1 built four dark rungs
and left this one alone «because the mirror agrees with where it already is». The
mirror was asked about **lightness** and was never asked about **hue**.

`--warm-880` `#1F1C16`, by the same rule as its four neighbours: H and S from
`#F2F0ED`, the plate's locked Warm Neutral, lightness solved for the L\* the grey
already stood at. 10.41 against 10.27, so **no contrast anywhere in the theme
moves** - this is a hue correction and nothing else. The number is 880 because
900 is taken, not because the ramp steps that way, and the comment says so.

> **Superseded the same day by step 7.13**, and only the *number* was wrong: the
> owner sent an example with the whole dark end pushed down, so Ink left the ramp
> entirely as `--charcoal`, `--warm-900` became a rung again, and the surface is
> `#181511`. The finding, the cause and the check below all stand.

`--grey-ed` `#EDEDED` went the same way and was the last neutral fill in the
theme: it is the step off `--bg-inverse`, and that bar is `--warm-50` here.
`--warm-150` `#EFEDE9`, L\* 93.80 against 93.75.

### The check that was missing, and its negative control

**Nothing was failing.** Every role had both halves, no component read a
primitive, contrast was right on every surface. The system was correct and the
theme still did not look like one theme - which is the exact class the pack sends
step 7 to find and the only class a per-component review cannot see.

`theme.mjs` check **2b**: a dark-theme role that paints an AREA and carries no
hue. Ink is exempt by kind - Ink is Ink, and on the grounds that do not move it
is the same colour in both themes. **The exemption is a rule, not a list:** a
role named `-onaction` / `-onink` / `-onphoto` says in its own name that its
ground is the orange, the ink plate or a photograph, none of which move with the
theme. Two roles are exempted today, both printed, and an empty exemption prints
as a reason to re-read the rule.

Proved by putting the defect back: with `--bg-surface` pointed at `--warm-900`
again the check prints `--bg-surface  --warm-900  #1C1C1C  S 0%`, and silent
after. A check that has never been seen to fail has not been seen at all.

### The bear: `mix-blend-mode: multiply` was a missing alpha channel

`mascot-pose-present.png` is 848x1264 of **RGB with no transparency**, drawn on
white. `multiply` is the one blend that makes white disappear against a LIGHT
plate, and that is the whole reason it was on the rule. Against a dark plate it
does the opposite of what it was hired for: every channel is multiplied by the
plate, so the bear goes to the plate's own darkness and reads as a silhouette.

**The fix is in the asset, not in the rule.** The white is keyed by a flood fill
from the border - not «every white pixel», which would also punch out the
highlight in an eye - and the anti-aliased rim keeps its softness by taking
`a = 255 - min(r,g,b)` with the colour un-multiplied back out of white, the exact
inverse of what compositing onto white did. 56.9% of the image is transparent,
8461 pixels of soft rim, and the file is 30KB **smaller** than the one it
replaces. On white it looks the same as it did; on anything else it now looks
like itself. `mix-blend-mode` is gone from `.uiv-bear`.

### The rest of that class, counted and not closed

`multiply` is on **seven** rules in the system, and every one of them is the same
workaround for the same missing channel: `gallery.css` (the product photograph on
the PDP), `trust-strip.css`, `cart-drawer.css`, `empty-state.css`, `banner.css`
twice, `seo-text.css` (closed here). **Five PNGs in active use have no alpha**,
across 25 references: `product-whey` (9), `product-creatine` (8),
`product-preworkout` (5), `mascot-face-reassure` (2), `mascot-pose-product` (1).

Where nothing blends them at all - the two hero promo tiles use them as a plain
`background-image` - the white rectangle is simply visible, and on the dark theme
it is the brightest thing on the screen. In the light theme it never showed,
because the card behind it is nearly white.

Keying those five the same way would close both symptoms in both themes and would
change the light theme in seven places by the difference between «multiplied onto
a near-white plate» and «alpha over the same plate», which is small but is not
nothing. That is a step of its own and it is not taken here.

Gates: `theme --source` 89 roles paired both ways, 0 primitive leaks, 0 hueless
fills with 2 exemptions both firing · `accept` 204 @390 - 0 · `vars` 204 - 0 ·
`links` 4594 - 0 · `css-comments` 89.

## Step 7.13 - the owner sent a picture, and it decided three lightnesses

Step 7.11 made the dark theme warm. The owner looked at it and said: «я би зробив
фон темніше і інше підкоригував би», with an image.

### The picture is the decision, and it was measured, not eyeballed

A histogram over his image, every third pixel:

| share | value | H | S | L\* | what it is |
|---|---|---|---|---|---|
| 35.8% | `#181512` | 30 | 14 | 7.0 | header, category rail, every card |
| 30.6% | `#0B0A08` | 40 | 16 | 2.8 | the page behind all of it |
| 4.9% | `#201D15` | 44 | 21 | 10.8 | the sign-in strip |
| 0.6% | `#2C2822` | 36 | 13 | 16.3 | the hairline |

Against what was on screen - page 7.4, surface 10.4, sunken 13.1, hairline 16.4 -
the reading is exact: **the dark end goes down and compresses, and the hairline
stays where it is.** His surface is almost precisely what was the page.

**The lightnesses are taken, the hues are not.** His three grounds read H40 / H30
/ H44 and S 14-21, which is what happens when colours are picked by hand one at a
time; this ramp has one hue and one saturation for the family, and re-deriving at
H36 S16 is what keeps it a ramp rather than three neighbours. So: **page
`#0C0A08` L\* 2.83, surface `#181511` L\* 6.96, sunken `#201D17` L\* 10.90**,
hairline and track untouched.

### Ink finally leaves the ramp

Step 7.11 had to call the new surface `--warm-880`, because slot 900 was held by
`#1C1C1C` - and with the surface now at L\* 7.0, that number was worse than ugly,
it was **out of order**: 850 read 10.9, 880 read 7.0, and 900 read 10.3, so a
higher number was lighter than a lower one in a ramp that means the opposite.

`#1C1C1C` is **`--charcoal`** now, the name DESIGN-artifacts.md gives it - «Ink
(Soft Charcoal)», a plate pixel, neutral by the designer's decision. It keeps
every job it had (`--text-primary`, `--text-body`, `--bg-inverse`,
`--line-inverse`, `--text-onaction-ink`, `--line-onink`, `--ring-onink`, and its
dark half on the flipped bar) - all of them on grounds that do not move. Nine
`var()` readers in `tokens.css`, five prose mentions in component comments, two
census lists on `color.html`. **No component file changed**, because components
read roles and never primitives - which is the claim the two levels were built to
make, and this is the first time it has been cashed.

The ramp is monotone again: 750 · 800 · 850 · 900 · 950 = 21.6 · 16.4 · 10.9 ·
7.0 · 2.8.

### What moving the grounds cost, measured rather than assumed

**The steps between rungs.** Were 5.2 / 3.3 / 2.7 / 3.0 in L\*, are 5.2 / 5.5 /
3.9 / 4.1. A card now stands off the page **more** than it did - 1.09 against
1.06 - and the hairline stands off the surface more too, 1.25 against 1.16.

**The accent got easier, not harder.** `#FF5A00` was 5.76 / 5.45 / 5.10 / 4.67 on
the four rungs a word can sit on; it is now **6.32 / 5.82 / 5.37 / 4.67**. Stage
09's finding - that A10's sub-AA compromise is a property of the pale grounds and
is not inherited by the dark theme - holds with more room than before.

**The two text rungs had to be re-solved, and this is the part that would have
been easy to skip.** `--warm-400` and `--warm-500` were derived so that dark
secondary and muted text stand to the dark grounds exactly as their light twins
stand to the light ones. Move the grounds and the mirror breaks silently: the old
`#AA9D8A` on the new grounds reads **7.43 / 6.84 / 6.32** against a target of
6.84 / 6.50 / 6.02 - the caption LOUDER in the dark theme than in the light one,
which is the exact thing the mirror exists to prevent. Re-solved: `--warm-400`
`#A59883` (6.98 / 6.43 / 5.94) and `--warm-500` `#95856C` (5.51 / 5.07 / 4.68).

One value cannot hit three targets exactly once their spacing changes, so the fit
is ±0.14 where it used to be ±0.08. That is the honest price of a darker page,
and it is written into the file next to the numbers rather than rounded away.

### One gate caught one thing, and it was mine

`accept` failed on `kit/color.html` with `curly=1`: the paragraph explaining this
decision used `ʼ` (U+02BC) in «сім'ї» where the project has exactly one
apostrophe, `'`. Fixed there and in the four other files where the same character
had come in with quotations from the pack.

Gates: `accept` 204 @390 - **0** · `vars` 204 - 0 · `theme --source` 89 roles
paired both ways, 0 primitive leaks, 0 hueless fills with both exemptions firing ·
`css-comments` 89 · `roles` 30 adrift, all pre-existing.

## Steps 7.14-7.16 - four things the owner caught in one sitting, and three were one class

The owner walked the dark theme and sent five screenshots: the trust card's bear
a silhouette, the SEO bear with a white gash down his side, the PDP photograph
nearly black, the mascot on a white box in the description, and the coach's
verify and tier screens with white plates carrying white ink. Plus the `dna`
icon, which was a separate fault.

### The white gash: the flood fill could not reach it

Step 7.11's key ran a flood fill from the border, and 16402 near-white pixels
survived it. They are not noise, they are **background the drawing sealed off**:
a 117x196 pocket between the legs and a 26x150 strip between the arm and the
body. On a white page they were invisible; on a dark one they were a gash.

`tools/key-alpha.py` now has three rules, and each is there because the naive
version failed on a real file:

1. **The background is a flood fill from the border**, not «every white pixel» -
   a global key punches the highlight out of an eye and the shine off a bottle.
2. **An enclosed pocket is still background**, told apart from a highlight by
   measurement: big and flat and near-pure-white. Both counts are printed, so the
   split can be checked instead of trusted. On the mascot it absorbed 2 pockets
   of 17003 px and kept 53 specks of 215 px inside the drawing.
3. **The rim is found by connectivity, not by a radius.** A fixed 3px band was
   the first version and it left the drop shadows behind - a shadow baked for a
   white page is 20 to 60 pixels wide, so it stayed opaque and read as a pale
   smear under every mascot. The band now grows from the background through
   anything lighter than 150, which is where the drawing's own silhouette stops
   it, and the un-multiply formula is self-limiting anyway: a dark pixel that did
   get reached keeps a=225 and stays put.

Six assets keyed, 60.5 / 60.3 / 33.8 / 68.3 / 68.3 / 79.1 percent transparent,
checked by compositing each over `#0C0A08` and over `#F2F0ED` before shipping.

**All seven `multiply` rules are gone**: `banner.css` twice, `cart-drawer.css`,
`empty-state.css`, `gallery.css`, `trust-strip.css`, `seo-text.css`. None of them
was a blend decision.

### The coach screens: 119 raw values, and the census is what made it small

25 of the 88 product screens carried a raw colour literal in a private `<style>`
block, and all 25 were coach screens. Counted before touching anything, it was
**119 occurrences of twelve distinct values** - and once broken down BY PROPERTY
rather than by value, every one of them had exactly one honest role:

| what | n | role |
|---|---|---|
| `background: #fff` | 42 | `--bg-page` |
| `color: #bbb` | 17 | `--mark-faint` |
| `color: #aaa` on `.cprice .old` | 8 | `--text-price-was` (which had 0 rendered uses) |
| `color: #fff` on `.cc-goals a.on`, `.acgoals button.on` | 8 | `--text-onaction-ink` |
| `background: #ececec` | 7 | `--bg-rule` |
| `box-shadow: 0 -2px 10px rgba(0,0,0,.06)` on `.cs-bar` | 7 | `--elevation-bar-top` |
| `border-bottom: #fff` on `.ctab.on` | 6 | `--bg-page` |
| `color: #fff` on the step numerals | 5 | `--text-onaction` |
| `color: #fff` on `.cnew`, `.btn.dark`, `.tier-flag`, `.tier-cta.dark`, `.cv-ok .m` | 6 | `--text-oninverse` |
| `box-shadow: 0 6px 24px rgba(0,0,0,.12)` on `.acmodal`, `.tfdlg` | 3 | `--elevation-4` |
| `color: #cfcfcf` on empty and error glyphs | 2 | `--mark-disabled` |
| `background: rgba(0,0,0,.34 / .4)` | 3 | `--scrim-overlay` |
| `border: rgba(255,255,255,.4)` | 2 | `--line-oninverse-soft` |
| `color: rgba(255,255,255,.72)` | 2 | `--text-oninverse-muted` |
| `color: #ccc` on `.ccard-meta .dot` | 1 | `--mark-faint` |

Two value changes, both named: the separator dot goes `#CCC -> #BBB` because a
dot is the quiet mark and not a disabled control, and the two shadows take the
system's geometry (`0 -2px 18px` and `0 24px 64px`) instead of their own.

**The first pass translated 117 of 119 and the two it missed are the instrument's
own lesson.** The selector was read as everything since the previous `}`, so
`/* big primary CTA */\n.cnew` matched no key and those two rules kept their
literal - a comment in front of a selector, and the map never saw it. Corrected
in the rule, not by hand. The count now: **0 raw colour values in the private
blocks of all 88 product screens.**

Re-measured on the screens the owner sent: `coach-verify-tier`,
`coach-verify-loading`, `coach-home-empty`, `coach-session-addclient`,
`coach-clients-cap`, `product`, `index` - **15 shapes, and only ONE is the
theme's**, `.hptag`, which is still his call. The other fourteen fail in both
themes and most of them read BETTER in dark than in light (the struck price 3.38
against 2.21, the meta dot 3.67 against 1.92).

### `dna`: a junction that does not meet is a lump

The same fault `flask` was fixed for on 08-05. Every one of the four rungs
stopped SHORT of the strand it was drawing to: measured, the rung ended 0.53 to
0.75 before the curve, so with 1.9 of stroke and round caps on both, paint
overlapped by **1.07 to 1.75** while the geometry never touched. No white left to
read the join by, and no join - a blob.

The helix was also wrong for the set: ink **9.9 x 19.9**, the narrowest and the
tallest glyph in it against a median of 18.5. Widened from x 8..16 to 7..17 and
shortened from y 3..21 to 3.5..20.5, so **11.9 x 18.9**.

**The four rung heights are read off the width curve, not spaced by eye.** The
strands cross at y 8.46 and 15.54 and are widest at 12, so a rung near a crossing
is a stub and one at 12 is an axle. 6.8 / 10.0 / 14.0 / 17.2 sit 1.6 clear of
both pinches and come out 5.90 and 6.35 wide - within half a module of each
other, which is why the four now read as one ladder.

### Left open, and both are the owner's

- **`.hptag`** on the hero promo plate, 5.45 -> 2.97. Unchanged since 7.9.
- **The PDP photo stage.** With the white box gone, `.gal .gmain` is a gradient
  from `--bg-page` to `--bg-surface` - the two darkest values in the system - and
  the product photographed on it is a black jar. It is legible and it is moody,
  but a black product on the darkest plate has nowhere to stand, and the floor
  shadow under it is `rgba(0,0,0,.22)` on `#0C0A08`, which does nothing at all.
  The system already has the sentence for the other answer - «a photo is a photo
  in both themes» - and applying it here means the product stage stays a LIGHT
  plate in the dark theme, deliberately this time rather than by accident. Not
  taken here, because a bright rectangle is exactly what he asked to be rid of
  and the difference between «by accident» and «on purpose» is his to draw.

### And one more hiding place the census had not looked in

The full sweep still reported two shapes at **1.05 on a pure white ground** on
`coach-home-free`, after every `<style>` block in the corpus was clean. The white
was in an **inline `style=` attribute**: `background:#fff` together with
`var(--dark)`, a grey-layer name that resolves to nothing. Counted across all 88
product screens, that was the only one - one declaration, one screen - and it is
`--bg-page` / `--line-inverse` now. A census that reads `<style>` blocks and not
`style=` attributes is a census with a blind spot, and the blind spot was exactly
one element wide.

**Before and after, on the whole corpus:** 81 shapes with 28 broken by the theme
-> **65 shapes with 7**, and the two `coach-home-free` rows above were closed
after that sweep and verified on their own page, so **5**: `.hptag` on the hero
plate, and four rows of the single `--scrim-white-50` swatch on `kit/color`.

Gates: `accept` 204 @390 - 0 · `vars` 204 - 0 · `links` 4594 - 0 dead ·
`css-comments` 89 · `theme --source` 89 roles paired both ways, 0 primitive
leaks, 0 hueless fills · `roles` 30 adrift, all pre-existing.

## Step 7.17 - the account dropdown was the one region of the header nobody had coloured

**The owner, with two screenshots side by side:** «дроп виглядит как с вайрфреймов
… надо сделать как дизайн + у пунктов меню добавить иконки таки как тут», the
second picture being the account rail, and one bridge said out loud: **«Кабінет =
Огляд»**.

### Three findings, and the third was not colour at all

Measured on `home-buyer` at 1280 with the menu open:

**1. Five bare rows.** `<a href="account.html">Кабінет</a>` and four like it - no
mark on any of them, while the same five sections in `.acc-links` two clicks away
each carry one. It is the only navigation in the product where a section has no
mark.

**2. The cap was the grey prototype's.** This header drops three popups.
`.wfh-mega` and `.wfh-langmenu` both take `border-top-color: var(--line-action)`
in header.css, twelve lines apart; `.wfh-cabmenu` still carried
`--line-inverse` from the structure half, so a brand-ink cap stood between two
accent ones. Its hover moved the ground and left the word where it was, which is
a third hover language in a header that already had one.

**3. Two rows pointed at the wrong section.** «Замовлення» and «Адреси» both go to
`account.html`. The label names one section and the click lands on another - in
colour, in grey, and since the prototype was built. The rail's own table,
`WF_ACC_LINKS`, holds the right two destinations.

### The mark is not chosen here, it is asked for

A destination that already has a mark in the product's own navigation keeps it,
so two lists cannot draw one section two ways - the same rule `uivGoalMarks`
follows. `uivCabMarks()` puts the question three times, in this order:

1. **By label**, against `WF_ACC_LINKS`. «Замовлення» and «Адреси» answer here,
   and they have to be asked by label BEFORE they are asked by destination,
   precisely because of finding 3.
2. **By destination**: «Кабінет» -> `account.html` -> «Огляд» -> the grid mark.
   That is the owner's «Кабінет = Огляд», and it turned out to be **a fact of the
   markup rather than an alias anybody had to invent** - both rows lead to the
   overview.
3. **`UIV_CAB_MARK`**, six rows, and it exists only because the frozen layer
   writes those six by hand instead of tabulating them. Every value is copied
   from the line named beside it (`wfAccountNav` 1182-1184, `wfCoachNav`
   1215-1219), never chosen here.

`coach-session.html` is deliberately absent from that table: «＋ Нова сесія»
carries its own mark and `uivLeadMark` has drawn it since 7.11. A second one
would be the two-drawings defect this pass exists to close, so the walk steps
over any row that already has a mark rather than asking who put it there. **The
idle control** is the row that nobody answered: it is named in the console rather
than left as an empty 20px slot that reads like a rendering glitch. Silence is
the pass working, and it is silent on both variants.

### The wrong destinations are a value that moves, not a decision to take

The rail already holds the right answer, and `CLAUDE.md` says values move and are
never re-derived. So the row is re-pointed **from the same table that gave it its
mark**, and only when the destination actually differs: the coach's «Адреси»
already carries `account-addresses.html?r=coach` and keeps its query, because the
role is part of where that row goes. Said out loud because a click now lands
somewhere else than it did yesterday: `wireframes/` is untouched and still has
the defect, being frozen.

### The look is the rail's, restated rather than borrowed

`.acc-link` in account-shell.css is the same row - a section, its mark, its word
- and it is what the owner pointed at. It is not put into the markup, and the
reason is measured rather than stylistic: below 960 that class turns into a pill
in a horizontal scroller, which is right for a rail and wrong for a popup. It
would never fire here, because `.wfh-actions` only appears at 860 - but «it works
because it is hidden» is not a rule, it is a coincidence waiting for a breakpoint
to move.

Row: flex, gap 12, the mark in a 20px slot at 18px, **min-height 44** (the touch
floor `link-row.css` states for six control families), a hairline between rows,
and the popup clips them to its own radius. The separator stopped being a line:
with every row carrying a hairline its own `border-top` stacked against the one
above it and said nothing, so it is **8px of the sunken ground** - a groove, which
is what «a different kind of row follows» looks like when the list is already all
lines.

**And the menu now knows where you are standing.** `aria-current="page"` is set
from the file in the address bar, and the row takes the rail's answer: the ground
comes up, the word goes accent, a 2px bar marks the edge. Before this you could
open the dropdown from the orders page and nothing in it knew. On
`account-orders` exactly one row lights - which it could not have done before,
because three rows shared one destination.

### Four states, both themes, measured

| state | light | dark |
|---|---|---|
| rest, ink on the popup | 17.04 | 18.78 |
| current / hover, accent on surface | **2.97** | 5.82 |
| «Вийти» rest, secondary | 6.84 | 6.98 |
| «Вийти» hover, danger on surface | 5.38 | 5.69 |

The one number under 4.5 is **A10's own class**: `.acc-link` is one of the six
the owner accepted under AA on 2026-08-12, and this is that same ink on that same
ground. It is named here rather than left to be re-discovered, because of what
step 8.19 found - **a popup is 0x0 until it is opened, so no census sees it**.
`.on` «Українська» hid there for six days and 82 screens. `tools/theme.mjs`
reads rendered shapes and skips anything under 2px, so it cannot see this menu
either; these four readings are by hand, in the browser, with the menu open and
the cursor really on the row. **That is the second class found inside a closed
popup, and it is the argument for widening the theme walk the way `states.mjs`
was widened at 8.19** - proposed, not done, because it will produce a harvest
that needs the owner.

Walked in both variants: buyer 5 rows, coach 7, every one marked, every one 44
tall, «Замовлення тренера» on one line at 230 wide. Below 860 the menu does not
exist - the drawer has no account section and the phone reaches the rail through
the tab bar - so nothing on a phone changed.

Gates: `accept` 204 @390 - 0 · `vars` 204 - 0 · `links` 4594 - 0 dead ·
`css-comments` 89 · `theme --source` 89 roles paired both ways, 0 primitive
leaks, 0 hueless fills · `theme` on the 5 touched screens - the same 5 shapes as
before, none of them new.

## Step 7.18 - «marked as design» meant the values were translated, not that the design was applied

**The owner, with three screenshots of the «Стати тренером» flow:** «ну у нас тут
как би єто не сильно похоже на дизайн, хотя страница помечена как в дизайне».

He is right, and the reason is written in `coach-verify.css`'s own header. The
grey prototype's palette is value-named, and the move into colour translated it
by the JOB each value did - one row of that table being
`--dark #161616 «selected / primary» -> --bg-inverse / --line-inverse`. But
`--dark` was **the greyscale stand-in for an accent the prototype could not
show**, and the coloured product splits its two jobs: SELECTED is the accent
(chip.css 7.23, radio.css 7.29, `.cv-step.on` 7.96, all three saying «ACCENT IS
WHAT CHOSEN LOOKS LIKE»), PRIMARY is `.btn--accent` (button.css). Step 7.96 made
that split **on `coach-verify.html` only** - the one screen that move was given -
and the file says so in two places, both beginning «STILL OUTSTANDING».

So the flow was marked coloured because every raw hex had become a role name.
Every role name was the wrong role.

### What it looked like, and every fix is an answer the system already had

| where | was | is | who had already decided it |
|---|---|---|---|
| `coach-verify-loading` «Далі (демо…)» | a local `.btn.dark` painting `--bg-inverse` **over** an anchor that already carried `btn--accent` - a black button with the atom's orange edge still showing round it | rule deleted, `dark` off the markup | button.css owns primary |
| `coach-verify-loading` `.cv-ring` | ink arc | `--line-action` | `.auth-spin`, `.co-spin` |
| `coach-home-loading` `.sk-spin` | ink arc | `--line-action` | the same two - this was the third edition |
| `coach-verify-tier` «Оформити Pro» | hand-built ink fill, radius 10, no hover / active / focus / off | `btn--accent btn--l btn--full` | `.cv-cta` at 7.96 |
| `coach-verify-tier` «Активувати Free» | hand-built ink border | `btn--outline btn--l btn--full` | the same |
| `coach-verify-tier` `.cv-ok` | 1.5px ink frame round a filled ink disc | `--bg-success-soft` plate, `--line-success-soft` edge, and the disc is auth-dialog's outlined 46px circle in `--line-success` / `--text-success` | status-pill.css + `auth-dialog.css` `[data-state="newuser"]` |
| `coach-verify-error` / `-deadend` `.cv-badge` | 2px ink ring | the same outlined disc - danger on the error, quiet on the dead end | `auth-dialog.css` `[data-state="error"]` |
| `coach-verify-tier` `.tier` | 1.5px `--line-strong`, no ground, no lift | the card face: 1px `--line-hair`, `--radius-12`, `--bg-page`, `--elevation-1` | `.acard` |
| `coach-verify-tier` `.tier.pro` | ink edge | `--line-action` | the three files above |
| `coach-verify-tier` `.tier-flag` x2 | ink slabs | the outlined badge: hairline, pill, no fill | badge.css:163, the shape 8.10 folded four names into |
| `.tierchip` x9, `.ch-goal` x3 | 1.5px ink ring on a small pill | 1px `--line-strong` | badge.css:163 |
| `coach-session-priceblock` `.wa` | a control built by hand out of an ink border | `btn--outline btn--s` | button.css |

**The screen's own arithmetic is what the owner was seeing.** On `-tier` before
this step, `rgb(255,90,0)` appeared exactly once above the fold - on the step
marker - while five objects were ink slabs: two flags, the confirmation disc, the
Pro card's edge and the Pro CTA. The loudest thing on a page whose entire job is
«choose one of these two» was a pair of labels. There is now **one accent fill on
the screen**, on the action the page recommends, one accent LINE round the card
it recommends (a line and a fill are different surfaces, which is how
`.opt-tile.on` and a CTA have always coexisted), and the good news is green.

### The count, so the rest is not guessed

Every `design/*.html` private `<style>` block was read for the inverse pair:
**16 screens, 20 declarations.** 13 screens are closed above by rule. **Seven
declarations on five screens are left, and they are left on purpose** - they are
PANELS, and an ink plate with a white label is a legitimate emphasis in this
system that is not the action colour (`.tag-pop`, `.acc-tier`, the footer, the
hero promo all use it). Whether these five should stay ink or move to the accent
is a look, not a defect:

- `coach-home-empty` / `coach-home-free` `.cnew` - the «нова сесія» panel, ink fill
- `coach-clients-cap` `.upsell` and its progress bar fill
- `coach-tariff-free` `.tf-upsell`
- `coach-session-priceblock` `.cs-warn`

**And the wider point, which is the owner's sentence:** «coloured» in the registry
has meant «every raw hex is a role name» since 8.17. `tools/vars.mjs` and
`tools/grey-vars.mjs` both check exactly that and both passed on all five of these
screens the whole time. **No instrument in this repository asks whether the role
is the RIGHT role** - `--line-inverse` on a spinner is as valid to them as
`--line-action` is. That is why the owner found it by opening the page, and it is
the same shape as 8.18: the gate can only see what it was built to ask.

Gates: `vars` 204 - 0 · `links` 4594 - 0 dead · `accept` 204 @390 - 0.

### One stepper, two drawings, and it is one attribute wide

Counted after the fixes above, and it is the reason the flow still does not feel
like one flow: `coach-verify.css` draws the three-step marker in tokens - 1px,
`--fs-12`, `--fs-14`, `--radius-circle` - and **the four state screens each
redeclare the same six selectors in their own `<style>` with hand numbers**
(1.5px, 12px, 12.5px, 11px, 50%). Measured: the tile is 66.19 tall on
`coach-verify` and 65 on the other four, with a half-pixel heavier edge.

**The cause is one attribute.** `coach-verify.css` scopes every rule under
`.coach`, and only `coach-verify.html` carries that class - the four states carry
none, so the component file reaches none of them and each had to bring its own
copy. Deleting the copies means adding `coach` to four `<body>` tags, which also
hands those screens the rest of the file, and `.cv-card` means something
different on all five (the file's own note, «ONE NAME, FIVE LOOKS», books that
for Крок 6). So it is stated here and not done in this step: it is one line of
markup and one collision, and the collision has to be answered first.

## Step 7.19 - the owner closed both open looks of step 7, and one of them rewrote a check

### (a) A10 extends to `.hptag`

**The owner, 2026-08-13: «A10 распространяется».** «Акція тижня» on the hero's
first promo tile reads 5.45 in the light theme and **2.97** in the dark one, on 6
screens. Nothing on screen changes. The mechanism is worth keeping written down
because it will produce more of these: the tile stands on `--bg-inverse`, a
ground that FLIPS, and the accent word on it does not - `#FF5A00` is the same
colour in both themes by decision. So a pair that was solved once against a dark
plate is a different pair against a light one, and no amount of pairing the ROLES
fixes it, because the failing pair is a role and a constant.

A10 now covers seven classes: `.on`, `.uiv-cur`, `.acc-link`, `.btn--text.btn--inline`,
`.cbnew`, `.addr-tag` and `.hptag`.

### (b) The product-photo stage does not move with the theme

**The owner: «светлая плита».** The stage under a product photograph, and the
thumbnails beside it, keep the light theme's values in both themes.

**Why it had to be decided at all.** When the white box came out of the PNGs at
step 7.12, `.gal .gmain` became `--bg-page -> --bg-surface`, which in the dark
theme is `#0C0A08 -> #181511` - **the two darkest values the system has** - with a
BLACK jar standing on it and a floor shadow of `rgba(0,0,0,.22)` underneath,
which on `#0C0A08` is nothing at all. The product had nothing to stand on.

**The sentence that decides it was already in `tokens.css`,** one line above where
the new roles went: `--bg-onphoto`'s dark half carries the comment «a photo is a
photo in both themes». A photograph is not a surface of the interface - it is a
thing being shown, lit the way it was lit when it was taken, and the plate under
it belongs to the photograph rather than to the page.

**Five roles, all paired to themselves on purpose:** `--bg-photo` (the near end of
the gradient and the thumbnail), `--bg-photo-far` (its far end), `--fade-photo`
(the transparent end of the floor shadow - its own role rather than
`--fade-inverse`, which has a second reader in the auth visual that DOES flip),
`--bg-photo-mark` and `--text-photo-mark` (the «Хіт продажів» pill in the corner).
`--shadow-floor` moved with them: it has exactly one reader, this stage, so its
dark value went back from `--scrim-black-22` to `--scrim-ink-07`.

**The mark is the part that proves the stage needed a FAMILY and not one role.**
With only the ground frozen, the pill went on reading `--bg-inverse` /
`--text-oninverse` - and that plate flips to light warm in the dark theme, so a
near-white pill landed on a now-white photograph. Measured before the fix:
`rgb(250,249,247)` on `rgb(255,255,255)`. Anything placed on a frozen ground has
to be frozen too, and that is a general statement, not a note about one badge.

### And the exemption inside `theme.mjs` check 2b became a MEASUREMENT

Check 2b asks whether a dark-theme fill or line carries the family's hue, and it
exempted «a role that declares its own ground» with the pattern
`/-on(action|ink|photo)/`. `--bg-photo` is `#FFFFFF`, makes exactly that claim,
and does not contain the word «on» - so the check fired on it, correctly by its
own letter and wrongly by its own reasoning.

**The claim those roles make is «my ground does not move», and a role that means
it says so in the file: its two halves are the same value.** That is the whole
test now. Verified against all five roles the old pattern covered -
`--line-onink`, `--line-onaction`, `--bg-onphoto`, `--line-onphoto`,
`--text-onaction` - so nothing that was exempt stopped being exempt, and there is
no name left to remember.

**It found something the name was hiding, in the same minute.** `--line-onink`
matched the old pattern and has DIFFERENT halves, because its ground genuinely
moves: the error toast is an ink plate in the light theme and a light warm one in
the dark. Its dark value was `--charcoal` - Ink, H0 S0 - a neutral line on a warm
plate, the same «grey patch in a warm family» the owner named at 7.11. **Mirrored
rather than picked:** in the light theme this line is `--white` on the Ink plate,
the far end of the scale from its own ground, so in the dark theme it is
`--warm-950`, the far end for a ground that is now light. One reader, `.wf-toast.error`,
and the line stands at ~19:1 where a line needs 3.

That is the second time in two days that making a rule measurable instead of
named turned up a real finding in the space the name had been covering.

## Step 7.20 - the pixel proof could not be re-taken, and that was the finding

The task was «re-shoot the after half under 13.08's changes». The first attempt
did exactly that - a new `tools/proof.mjs` re-photographed the working tree at
390x844, scale .75, and compared each result with the stored `-after.jpg`.

**It reported that all 40 screens had moved, by 2 to 15 percent, with channel
differences up to 255.** The diff map said why in one look: **every glyph on
every screen was outlined twice.** That is sub-pixel text rendering, not layout.
The 2026-08-06 set was shot in an environment nobody recorded - Chrome build,
font state, device scale - so nothing taken today is comparable with it, and no
amount of care at this end fixes that. **A proof that goes stale the first time
the product moves is a screenshot, not a proof.**

### So both halves are re-shot, which is what the page always claimed

`pixel-proof.html`'s own «Як це заміряно» reads «два дерева, один браузер, одна
мить». That was true of the day it was written and had no way to stay true.
`tools/proof.mjs` now unpacks `git archive 9e44109` into a temp directory
**outside the repository**, serves it on its own port beside the working tree,
and photographs both with one Chrome, back to back, per screen. `serve()` in
lib.mjs takes a root now; every other caller passes nothing and gets what it got.

### Three instrument decisions, each because the naive version failed

**1. By pixel, not by byte.** The first comparison was byte-wise and answered
«changed» to all 40 - true, and useless: JPEG is Chrome's encoder, so a different
Chrome writes different bytes for the same picture. An instrument that cannot
answer «no» is the failure this repository has recorded twice. Both images go
back to the browser, which decodes them and counts pixels over 12 levels on a
channel. Re-encoding noise lands at 1-3; the loudest screen that did NOT move
measures **0.066%**.

**2. The answer is an ELEMENT, not a percentage.** The pack's rule is that every
difference is explained by a line of a named list, and that cannot be checked
from a number. Changed pixels are grouped on an 8px grid - so a word is one
region and not forty - and each region's centre is handed to `elementFromPoint`
on the page that is still open. Every one of the 19 differences below is named.

**3. The wait is on the page's signature, not on a clock.** 90ms gave two
different lists on two runs; 300ms plus two animation frames still did. The
stand's bar is built by `uivBar()` and its chevron swapped by the mark passes
afterwards, and **each of those changes the document's height**, so a screen
captured between them has everything below shifted 8px. The tool now polls
document height, the bar's height and the svg count until they hold still three
times. **39 of 40 then repeat exactly.** `checkout-loading` does not, because a
loading state changes itself over time; it is named on the page as a limit.

### What 13.08 actually moved: 19 of 40, and all three causes were already named

`node tools/proof.mjs --against HEAD`, three families:

- **Product photographs and thumbnails** - `img < div.gmain`, `div.gthumb`,
  `a.ph < article.pcard`, `a.lph`, `a.ci-ph`, `div.li-img`. The seven `multiply`
  rules and the six keyed PNGs. Loudest: `product-oos` at **2.07%**.
- **The hero's first promo tile** - `span.hps < a.hpromo`, `a.hpromo`, `a.hvert`.
  `--text-onphoto` .72 -> `--text-oninverse-muted` .66.
- **The stand's own bar** - `button.uiv-topbar` and the svg in it. **This is
  stand chrome standing in the product's photograph**, and the proof has always
  included it; `design/_stand.css`'s nine raw scrims became five paired
  `--stand-*` variables at 7.9.

Not in that list although they happened the same day: the 25 coach screens (110
of 119 replacements were a role in place of a literal of the same value - zero
pixels; the other 9 are on screens outside these 40), the `dna` glyph (redrawn,
but no first screen of these 40 shows it) and the dark theme entirely (these 40
are shot in the light one).

### And the control from the other side

**One screen of 40 measures 0.000% against the stage-08 baseline: `overview`.**
It is the one screen that is not on the system - the stage hub is built on the
roadmap chrome `/_nav.css`, like the repository's own `index.html` - so stage 08
never touched it. A zero here is not an achievement, it is the negative control:
an instrument that found a difference there would be reporting noise.

`design/kit/pixel-proof.html` carries all of this: the method paragraph, the
fourth named list as a table of element against cause, and two more lines in
«Чого цей доказ не доводить».

## Step 7.21 - the theme walk opens the panels, and 7.22 - the fifth wrapper is a named set instead

### The walk now opens what it measures

**A popup is 0x0 until somebody opens it, and the probe skips anything under
2px** - so for as long as this check has existed it measured only the part of
the product already on screen. That blind spot had already cost twice, both
found by a person opening a menu rather than by any instrument: `.on`
«Українська» inside `.wfh-langmenu` at 8.19 - the accent's largest failing
shape, 82 instances on 82 of 88 screens, carried in a record as «accepted» since
2026-08-07 with nothing ever drawing it to look - and the account menu at 7.17,
whose four states had to be measured by hand.

Every global matching `open[A-Z]` or `toggle[A-Z]` is called before the probe,
plus the few that take an argument. **All at once**, unlike `states.mjs`: that
tool asks whether a state re-renders into an unmarked one and has to isolate each
opener, while this one asks whether ink reads on its ground - and a ground is
composited from an element's own ancestor chain, so two dialogs overlapping on
the z axis do not disturb each other's answer. The sweep is identical in both
themes, so anything it does that is not about colour cancels out of the
difference.

**An opener that leaves the page is dropped, and it is discovered rather than
listed** - because one of them does. `openCookieSettings()` falls back to
`location.href = 'system.html'` when the cookie dialog is not on the page, and
that file does not exist under `design/`; the first sweep sent every page to a
404 and all three test screens came back «the page has no theme». The navigation
is asynchronous, so a check written inside the sweep sees nothing - it has to be
asked afterwards. Each name is tried once in a session of its own and the verdict
is cached for the run.

**The harvest: 57 shapes, 5 broken by the theme, 52 failing in both**, from
**5890 opener calls over 406 passes**, 199 of 203 pages measured. What is new is
almost entirely INSIDE things: `button.btn--accent.btn--l` «Підтвердити» at 113
instances and `a.btn--accent.btn--l` at 18 are dialog actions this check had
never seen. All of them are the locked white-on-orange pair (3.13, failing in
both themes by the owner's 27.07.2026 rule), so the widening added no new
decision - it added the evidence that was missing.

### And one page in four turned out not to be a debt at all

The walk reported four pages with no theme: `design/overview.html` and the three
`concept/` ones. `overview` was on the harvest list as item (f), «the stage hub
has no theme». It loads `../_nav.css` and nothing else - **it is on the ROADMAP
chrome, like the repository's own `index.html`** - so it has no semantic layer to
override and «no theme» is the right answer for it.

So the check asks the page instead: does it load `system/index.css`? Two lines
now, «поза системою за родом» and «НА СИСТЕМІ, А ТЕМА НЕ ПЕРЕМИКАЄТЬСЯ», because
those are not the same defect and lumping them together is how a real one hides
behind three correct ones. Today the second line is empty.

## Step 7.22 - the account menu after logging in, and the fifth wrapper

**The owner, with a screenshot of the menu open on `product.html`: «почему
где-то нет иконок как должно быть».**

Reproduced exactly. `product.html` renders a GUEST header, so there is no account
menu at load; logging in through the auth dialog makes `wfAuthDone()` rebuild the
header, and the menu that appears then has never met any of the passes. Measured
after `openAuth('phone'); wfAuthDone()`: **0 marks of 5**, `🥈` drawn by the font
instead of the loyalty jar, and both of the wrong destinations 7.17 had just
corrected, back again.

**This is the fifth time this shape has arrived**, and `uivAddrPaint`'s own note -
«this is the fourth wrapper and the first time the set is known to be closed» -
is what says the answer is not a sixth wrapper. `uivObserve()` already exists for
exactly this: it watches the six chrome regions and re-runs `uivMarks` and
`uivIcons` on whatever a builder rewrites. What it did not re-run is the passes
that paint the chrome's own CONTENTS, because those were a handful of calls typed
out at the end of `uivChrome()` and nowhere else.

So they have a name now. `uivChromePaint()` holds `uivTiers`, `uivCabMarks` and
`uivRailCurrent`; `uivChrome()` calls it once and the observer calls **the same
set** after every rebuild - which means a pass added to it next month is re-run
after a rebuild the day it is added, instead of being the sixth defect of this
family. Every member is idempotent by its own guard, so a second call on a page
nothing rebuilt costs a walk and changes nothing.

Measured after: 5 marks of 5, the tier jar an svg, `account-orders.html` and
`account-addresses.html` back in place - on `product`, `listing`, `cart` and
`index`, none of which shows this menu until somebody logs in.

## Step 7.23 - one stepper, five drawings, and the scope was buying nothing

Named as a finding at 7.18 and left there because it looked like it needed
markup. It did not.

`coach-verify.css` scopes every rule under `.coach`, and only `coach-verify.html`
carries that class. The four STATE screens of the same flow carry none, so the
component file reached none of them and each brought its own copy of the
three-step marker in its `<style>` block. Measured at 1280:

| | coach-verify | the other four |
|---|---|---|
| tile edge | 1px | **1.5px** |
| numeral | 12px | **11px** |
| label | 14px | **12.5px** |

**`.cv-step` occurs in exactly six files** - the five screens of this flow and the
component - so the name was already the scope, and the extra `.coach` only ever
meant «the one screen that happens to carry the class». Two roads were rejected
before this one: copying the file's numbers into the four pages is the same
defect written out four more times, and putting `coach` on their `<body>` hands
them the rest of the file, where `.cv-card` means something different on all five
(the file's own «ONE NAME, FIVE LOOKS» note, booked for Крок 6).

So the scope comes off the seven rules that draw the marker, and **28 declarations
are deleted from the four pages** - seven selectors each. Measured after: all five
screens draw a 1px edge, a 12px numeral, a 14px label, and an accent edge with an
accent disc on the current step. The residual difference in tile HEIGHT, 65.59
against 67.39, is the container's width and not the component's: every declared
property now matches to the pixel, and `.cv-wrap` is each screen's own business.

**And the flow's third state came into the file.** `coach-verify-deadend` marks
its step `.stop` - the flow ended here, there is no step after it - and drew it
with its own copy of `.on`'s two declarations. Same meaning, same three tokens, so
it joins `.on` rather than becoming a fourth answer to «you are here»; what makes
it a dead end is the word beside it, not a different colour.

Gates: `accept` on the five - 0 · `css-comments` 89 balanced.

## Step 7.24 - two agents, and the three defects they found were all in the INSTRUMENTS

Two read-only-scoped agents ran in parallel on the two pieces of debt the step-7
harvest had left: the stand's role tables and the colour page's swatch ink. Both
delivered, and both came back with findings about the CHECKERS rather than about
the product - which is the pattern this stage keeps producing.

### The role tables: 31 adrift, 0 adrift

`tools/roles.mjs` compares what a stand page CLAIMS a component uses against what
the component's CSS actually reads. Thirty components were brought into line, and
**five more that the checker cannot see at all**, because it compares names and
never counts: `pdp-tabs`, `blog-card`, `breadcrumb`, `seo-text`, `status-pill`
printed totals that contradicted their own tables (`status-pill` said 8/7 beside
a table of 10/12). Three roles - `--elevation-mark`, `--elevation-1`,
`--ring-focus-control` - sat in the «primitives» cell; `roles.mjs` merges the two
cells before comparing, so it never saw the mistake.

**And the last one adrift was the instrument's own.** `icon.html` says out loud
that `--brand-ink` is not a token but the component's own variable, and the
checker called the page wrong: it excluded a self-declaration with `/^\s*--name:/`,
anchored to the start of a LINE, while `icon.css:64` writes the declaration on
the same line as its selector. A declaration begins after `{`, `;` or a line
start; that is the whole rule, and with it the count is **0**.

### The colour page: the ink was chosen by the wrong lightness, twice over

`card()` decided a swatch's ink with `H[2] < 55` - **HSL lightness**, which is not
perceptual - and read the swatch value **unpremultiplied**, so a translucent token
was judged by the colour it would have been if it were opaque. Both are now one
pass that composites the real ground up the ancestor chain and takes the ink with
the higher WCAG ratio, re-run on a `MutationObserver` for `data-theme`. Measured:
`--gold-500` **2.00 -> 8.54**, `--orange-500` 3.13 -> 5.45, `--scrim-white-50`
3.50 -> 4.60 in the dark theme, `--scrim-ink-52` 3.71 -> 4.59 in the light one -
and that last was failing in the LIGHT theme, where section 4 does not look.

**`--slate-400` cannot pass with any ink this system owns.** `#7E8288` gives 4.41
against `--charcoal`, the darkest ink there is, and 3.86 against white. Pure black
would give 5.44 and `--warm-950` 5.12, but neither is an ink role. Left for the
owner: it is a decision about a token, not about a page.

### And the finding that changes every number this tool has ever printed

The agent measured `kit/color` by hand and found the tool's answer was not what
the eye gets: `.use` renders at `opacity: .62` and `.rg` at `.72`, and **the probe
read `color` and ignored `opacity` entirely.** So «4.75» on `--warm-500` is
really **2.69**, and «8.54» on `--gold-500` is **3.67**.

Every reading this check has produced for a faded element was wrong, and **it was
always the flattering direction** - which from a checker reads exactly like
health. The probe now multiplies the ink's alpha by the fade above it and
composites onto the ground, stopping the walk at the element that supplied the
ground (opacity fades a subtree together, so an ancestor that carries both fades
ink and ground equally and changes nothing between them).

The correction was written into the probe's template literal and **broke the file
on the first try, on the rule the file itself states two lines away**: no
backticks inside the probe, because one backtick ends the string. It is now
written there twice, because it has now been broken twice.

### One more, and it is the oldest shape in this repository

`node tools/accept.mjs kit/zzz-nope` printed «OK · over=0 em=0 curly=0» and
«1 screens · failures: 0». **A 404 loads as an empty document, and every question
that walk asks of an empty document answers «clean».** Same family as the glob
that reported 0 failures over 135 pages after visiting one. `subject()` in
lib.mjs asks the filesystem now and stops the run with the names it could not
find - which is one line, and it guards every tool that shares that helper.

## Step 7.25 - the corrected probe named a false positive before it named a defect

The fix at the end of 7.24 - the probe multiplies the ink's alpha by every fade
above it - changes every number this check has printed for a faded element, so
the whole corpus was re-walked. The first thing it returned was not a defect.

### 113 screens at 1.00, and none of them wrong

Top of the list, by a distance: `span.tt-m` «Перевірка», **1.00 on 113 screens**
- ink exactly equal to its ground. That is the toast **before it is called**:
`toast.css:13` keeps `.wf-toast.out` in the document at `opacity: 0` and the
animation brings it in. An element faded to nothing has no contrast to have, and
calling it the product's worst defect would have invented 113 defects out of one
correct line of CSS.

`if (op === 0) return;` plus a skip on `visibility: hidden`. It is the same
sentence the probe already carries two lines up - «ink at zero alpha is not ink»
- said from the other side, and it is worth writing down that **the correction
and its false positive arrived in the same run**: a checker made sharper finds
more of everything, and the first thing it finds more of is noise.

**Corpus with the clean probe: 79 shapes, 8 broken by the theme, 71 failing in
both.** 199 of 203 pages measured, the 4 named. The list is now dominated by
`kit/color`'s own swatches - which is the honest picture, because that page is a
wall of colour samples and the accent rows are A10's, closed by the owner.

### The photo placeholder: a word, not a mark

Four classes, **37 instances** across the coach flow - `.oc-ph`, `.od-ph`,
`.qa-ph`, `.cl-ph` - wrote the word «фото» in `--mark-faint` on `--bg-sunken` at
8px: **1.28 to 1.69**. Step 8.16 had already settled the principle on the
gallery's own frame, in its own words: «in the COLOURED layer the placeholder is
not faint, it is INVISIBLE».

A word nobody can read is not a quiet word, it is an absent one, and the tile
then says nothing about what belongs in it. `--mark-faint` is the right role for
a chevron on a row, because a chevron is a SHAPE and its job survives being
barely there; this is a WORD. A word takes the muted rung: **5.0** on the same
ground, at the same size, one token wider. Three component files, and the note
stands in the file that changed.

### The four screenshots nobody could reach

`design/kit/screens/` holds four full-height shots of `kit.html`, before and
after the step-8 move, 2.7MB - and a search of the repository finds **no html
and no md that links to any of them**. The project's rule is that an artifact
with no visible place does not exist for whoever decides, so they got a section
on `pixel-proof.html` with a table and links, not a deletion.

Said out loud there, because it is the part that would rot quietly: they were
shot on 2026-08-06 and are **older than the code**, and `proof.mjs` does not
take them - it reads its frame from `proof/*-before.jpg`, the first screen at
390x844, while these are a full page in two different sizes. Re-shooting them
with that instrument is its own step, named rather than forgotten.

## Step 7.26 - three owner decisions, and each one moved a rule rather than a screen

The three looks left open at 7.24-7.25 were called on 2026-08-14: **(a) чорнило ·
(b) підняти прозорість · (c) акцент**. None of the three turned out to be a
question about the screen it was asked on.

### (a) The swatch's ink stopped being borrowed

`--slate-400` `#7E8288` could not be lifted by either candidate: **4.41** on
`--charcoal`, the darkest INK the system owns, and **3.86** on white. Two ways
out - move the token's value, or deepen the ink. The owner said ink, and that is
the right side: `--slate-400` is the silver tier's mark and it looks the way
silver looks. Nothing is wrong with it.

What the answer exposed is that **this page was borrowing.** It chose between
`--text-onaction-ink` and `--text-onaction` - a pair picked for one true
property, «this ground does not move», wearing a name that says «the label on
the ACTION fill», which a swatch is not. So the pair moved to where it belongs:
`--stand-swatch-ink` / `--stand-swatch-onink` in `kit/_page.css`, owned by the
STAND, the same call step 7.9 made when the stand frame got five `--stand-*`
variables instead of borrowing product roles.

The deep half is `--warm-950`, **already an ink in everything but name** -
`--line-onink` reads it - and on `--slate-400` it measures **5.05**. No swatch
that passed can fail, because the new ink is darker than the old one on every
ground, and **no new value enters the system**: both halves are primitives
`tokens.css` already declares. Declared once with no dark half, on purpose: the
7.19 rule, and a swatch is the purest case in the repository of a ground that
does not move, because it IS the value.

### (b) The fade could not be raised, so it went

Solved on the worst swatch rather than argued: `.use` and `.rg` needed **.90 to
reach 4.62, and .85 gives 4.35 and fails.** A fade that has to sit at .9 is no
longer a hierarchy device, it is a rounding error that costs contrast. So the
hierarchy moved onto **weight**, which costs none - the token's name is black,
its value semibold, the two derived lines regular.

`.sc .st u` went with it: it faded a `<u>` inside the token's name and `card()`
has never written one. **The third list of the step-6 sweep is «a class nobody
wears», and a stand page is not exempt from it.**

**`kit/color` measures 0 shapes.** The page that produced the largest single
block of the corpus list is clean, and the last one to go was not on the page at
all - `.kn-gh i`, the count in the stand's own side panel, at `.7` of
`--text-muted`: **2.84** beside a label at 5.05.

### (c) The five panels take the accent, and four of them take it as an EDGE

`--dark` in the grey layer meant «primary» in one value; the move to roles
translated the VALUE and kept the look, which is how this flow shipped with its
emphasis drawn in ink. The owner called it accent.

Only `.cnew` is a fill, and it is a fill because it is the whole screen's one
main action - a single `<a>` wrapping the panel, marked «BIG primary CTA» in the
markup since the grey layer. `--bg-action` with `--text-onaction`, and the
subtitle takes the same white the title does: the locked rule of 27.07.2026 says
a label on an orange fill is white at any size, there is no muted rung on the
accent, and the hierarchy is already in the size (18 against 13) and the weight.

`.upsell` + its bar, `.tf-upsell` and `.cs-warn` take `--line-action` on the
edge and keep `--bg-surface` under it. **Each of the three holds its own accent
button**, so an accent PLATE would have put the colour of «act here» on the
block and on the action inside it at once - and the accent is the single action
colour by the oldest rule in `DESIGN-artifacts.md`.

**One of the five differs in kind and is written down as differing.**
`.cs-warn` is `role="alert"` and it blocks checkout; the system owns a warning
family (`--line-warning`, `--bg-warning`) and that is the other honest reading.
Taken as accent because the alert's whole content is an instruction - «оновіть
ціни», with the button to do it inside the panel - and because the edge says
«act here» without spending the fill. One word from the owner moves it.

### Three things the work walked into, all of the same family

**`var(--light)` is not defined anywhere and five places read it** - all of them
inline `style=` attributes around a `[?]` mark, on `coach-home-free` and
`coach-verify-tier`. An undefined custom property is silent (step 8.17's whole
subject), and the inline attribute is the one hiding place a census does not
read (step 7.16 found the same thing, one declaration wide). `--text-muted`, by
7.25's rule: a `[?]` is a word.

**Step 7.25 fixed the component files and reached eight pages that do not read
them.** `.qa-ph` / `.cl-ph` / `.od-ph` still measured **1.69** on eight coach
state screens, because each carries a private copy of the rule in its own
`<style>` block - the identical disease as 7.23, where a stepper scoped to
`.coach` reached one screen of five. **13 declarations swept by rule**, and the
note on each points at the file where the reasoning lives instead of repeating
it eight times.

**`.cline.oos` dims a whole row to `opacity: .5`** - and everything in it goes
with it: the placeholder to 1.97, the struck price to 1.47. That is not a
mistake, it is how the row says «unavailable», and it is the fourth member of
the family this stage keeps finding since the probe learnt to composite. Named,
not touched: how an unavailable line should read is a look, not a bug.

**And one dead thing counted but left alone.** `class="... dark"` appears **105
times in `design/*.html` and no stylesheet in the coloured layer defines
`.dark`** - the ghost of `--dark`, left behind when 7.18 deleted the rules.
Harmless to render and misleading to read. It is not being swept by hand,
because `tools/clone-to-colour.mjs` would put it back: the fix is one rule in
the transform plus a sweep, which is its own step.

## Step 6 of the pack - the sweep of system against product, and the instrument that had to exist first

Stage 08's step 6 had never been run. Steps 7 and 8 went ahead of it, and everything
recorded since under 7.9-7.26 is repair rather than the pack's own list. Opening it,
the first thing missing was not a document - it was the prilad.

### Finding zero: «the script is the artifact, not the table», and the script was not kept

The pack asks for **два заміри одним приладом**: step 1 walks the corpus before the
system, step 6 walks it after and proves every line of the first is closed. `census.md`
produced 22 229 observations over 180 screens and ends with that sentence about its own
script. Only `btn-census.json` survived, which is the RESULT. Rebuilding a checker from
memory is the hand fix this repository bans for tools as loudly as for pages, so
`tools/census.mjs` is rebuilt **from the written method**: two viewports, in a browser
and never by grep, computed style, and the control test verbatim - `a`/`button`/`label`/
`[role=button]`/`[onclick]`, or an element that INTRODUCES `cursor:pointer` its parent
does not have. It stays in `tools/`, so the third measurement costs one command.

**What is not reproduced is said rather than tuned.** The 24-form folding and the
exclusion list lived in the lost script and appear nowhere in the prose. Tuning until
the numbers matched a published table would prove only that they can be tuned.

### The number that reprices every census this project has taken

| | static walk | with panels opened |
|---|---|---|
| clickable observations | 35 714 | **63 154** |
| boxy controls | 7 118 | **14 896** |
| panels opened first | – | **11 946** |

**43% of the product's clickable surface is behind a state.** Step 1's own 22 229 were
taken statically, which is the honest reason the two measurements do not reconcile
arithmetically - and the reason the opener sweep moved from `theme.mjs` into `lib.mjs`
rather than being typed a second time. `theme.mjs` imports it now; so does the census.

### The three lists

**1 - product to system: nothing is missing.** Two candidates came back and both sat on
`wireframes/overview.html`, the hub that LISTS screens rather than being one. **22
controls are tirage, not gaps** - every occurrence is on one of the 54 grey-only screens.

**2 - system to product, and this is the body of the work left.** 31 screens carry a
private `<style>` block, **1 154 rules**, of which **886 redraw a class the system
already owns** and 210 declare something that exists only there. The twelve loudest
screens are all in the coach flow.

**And that list is not cosmetic, which one measured defect proves.**
`coach-session.css` answers the phone with `@media (max-width: 479px)` - `.qa-row`
stacks and the action takes the second line. The base screen reads it and passes at 360.
The four state screens carry a private copy of `.qa-row` WITHOUT the media query, a
private block beats a linked sheet, and «Додати клієнту» hangs 10px past the viewport
which `html{ overflow-x: hidden }` CLIPS rather than scrolls. `accept.mjs 360` returns
**4 failures over 204 screens**; at 390 and 1280 the same corpus returns 0.

**It is also why stage 10 cannot start on top of this.** 222 media blocks: 170 in the
system, **52 in the private blocks of those 31 screens**, adding 7 boundaries of their
own. A scale cannot consolidate what does not live in the system.

**3 - a class nobody wears: zero remain.** Six deleted by the owner 2026-08-14, the
seventh an error of the instrument. Beside them, 30 classes behind a state the walk
cannot reach (a script writes each, so they are live - the walk cannot SCROLL and does
not advance a flow past its first step) and 43 waiting for their screen.

### The instrument was wrong four times, and all four errors had one shape

Each answered the question NEXT to the one being asked, and each returned a plausible
number - which from a checker is indistinguishable from a finding.

| reported | cause |
|---|---|
| **962** dead classes, `coach` and `wfh` among them | the map was built from CONTROL rows: «never worn» meant «worn by nothing clickable» |
| `svg` `jpg` `png` `html` are dead component classes | tails of `url(../../visuals/...jpg)` and of an href attribute selector |
| 12 classes of `cat-overlay.css` are dead | nothing had OPENED the overlay - `census.md` withdrew this exact finding once, about `.tbuy` |
| `menu-pop` is dead | `design/system/menu.js:39` sets it at wire time and CSS hides it until it opens; the collector skipped `display:none` |

**The fourth cost the walk twice**, and not because of the bug: the correction was
announced before it was verified, the patch had never applied (a python assert failed
into a backgrounded launch), and the re-run produced a byte-identical record - 1518
distinct classes, 50 417 total, in both files. **The identity is what exposed it.** A
tool that returns exactly what it returned before has not been changed, and saying so
out loud is cheaper than a second 35-minute walk.

Twice more the probe's template literal was broken by backticks inside a comment about
backticks - the third and fourth time in this repository. Both are written into
`census.mjs` beside the rule.

### Six deletions, and three of them were not lint

`.only-mobile` / `.only-desk` (6 rules) closed a question `account-shell.html` had held
open since step 5. `.field--err` cost nothing: the selector read `.field--err, .field.err`,
the runtime writes `.err`, and no declaration changed. But `.certthumb--pending`,
`.qans--wait` and `.tsx--unproven` were **designed states nobody had applied** - a
certificate not yet on file, an answer the shop is preparing, a trust claim not yet
proven. Deleting them removes capability, not clutter, and «trust first» is principle 1.
Every word of their reasoning is kept verbatim in `backlog.md` so re-adding any is one
line of CSS and a paste. Five stand pages were edited the same step, because a stand that
demos a class the system no longer has is «worse than no stand» - menu.css's own words.

### And the page about false positives caused one

`links.mjs` reported a dead link, and it was the literal `href` inside the table
explaining where `svg`/`jpg`/`png`/`html` came from. The tool scans raw html and cannot
tell a link from its quotation - a class it already carries written in its own header.
Fixed on the page with an entity rather than in the tool: teaching a scanner to tell a
citation from the thing cited reliably costs more than not writing the citation so it
looks like the thing.

## Step 6, second half - the migration was measured, applied, and reverted by its own proof

The 886 rules that redraw what the system already owns are step 6's remaining body of
work. Before moving any of them, the question nobody had asked: how many of the private
rules **draw anything at all**. A source count says a rule EXISTS; it does not say it
CHANGES something, and moving the two kinds as if they were one is how a migration of
this size goes wrong.

### The measurement, and the two kinds it separated

`tools/private-css.mjs` (the ninth check) deletes a rule and asks the browser whether
anything moved. **262 of 1 185 top-level private rules are inert**:

- **215 match no element on their own page.** Clone residue: `clone-to-colour.mjs` copies
  a full screen's private block into its empty and loading states whole, CSS for cards
  that will never be there included. `coach-order-loading` is 37 of 42.
- **47 match elements and move no value** - a copy of what the system already says. This
  is the kind step 6 is about, and it is the smaller one: the private blocks do not
  duplicate the system, they **draw instead of it**.

### The cut shipped, and the proof caught it

`tools/tree-diff.mjs` (the tenth) exists because `proof.mjs` covers only the 40 screens
with a baseline JPEG, and the risk here is not «is the rule inert» but «did the CUT
mangle the file» - a regex that eats one closing brace leaves valid CSS with the wrong
meaning and every source check still passes. It git-archives the reference into its own
tree, serves both, opens both in one Chrome and compares the computed style of every
element on 40 properties at both widths.

**9 movements on 5 screens**: `coach-clients-cap`, `-empty`, `-error`, `-loading`,
`coach-home-loading`. At 390 a rail link went **orange**, at 1280 the page grew 555px.
Everything reverted; the re-check is 0.

**The cause is the method.** The probe tested each rule ALONE with every neighbour in
place, which answers «is this redundant GIVEN all the others». **Inertness is not
additive**: `coach-clients-cap` held `.acc-nav` and `.acc-link[aria-current="page"]`,
neither alone changed anything, and losing both turned the rail into the mobile chip
strip whose current chip `account-shell.css` paints `--bg-action` under
`@media (max-width: 959px)`.

Two corrections went in, both right and neither sufficient: the walk is cumulative
against a **full-document** snapshot (a rule restyles only what it matches, but LAYOUT
travels), and the set found at one width is re-offered at the other, because their
**union was never tested anywhere**. The probe still clears rules a fresh page does not.
The remaining difference is most likely between MUTATING a loaded document and LOADING
one without those rules - the page's scripts have run and reacted to what they saw. That
is written down as a hypothesis, because it has not been measured.

**So the deletion waits and the proof stays the gate.** Nothing about the measurement is
wasted: the 262 are identified, the two kinds are apart, and tree-diff will name any page
a future cut moves, down to the element and the property.

### And the instruments were wrong five more times, all one shape

`private-css.mjs` answered «0 rules» about a block the browser had just said held 77 - a
`for...of` over a `CSSRuleList` inside a `try` that swallowed the reason. `tree-diff` hung
with no output because it opened two tabs before visiting either; compared its own two
server PORTS inside `background-image` and reported that as a finding; broke its own probe
with a regex literal whose backslashes the template literal ate before the browser saw
them; and silently dropped `argv[0]` when `--dir` was absent, so a PAGE became the git ref.

Every one of them is the same fault this stage keeps meeting: **an instrument answering
the question next to the one it was asked, or answering with silence.** All five are
written into the files beside the fix, with the wrong version stated.
