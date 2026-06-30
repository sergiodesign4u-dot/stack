# Design & IA Process Playbook

A reusable, project-agnostic methodology for taking a digital product from research
to wireframe-ready information architecture. Captured while building **Stack**
(a Ukrainian sport-nutrition e-commerce store), but written to be lifted into other
projects. Stack-specific examples are marked _(example)_.

> Conventions used in this repo (and recommended generally):
> - Markdown docs are written in **English**.
> - Live/visual pages are written in the **product language** (Ukrainian for Stack).
> - Each artifact has **one source of truth** under a `docs/` folder; live HTML pages
>   are rendered summaries of those docs, never the source.

---

## Core idea

Build the full **library** of what goes into the product *before* wireframing, so
wireframes become pure rendering, not invention. You grow a skeleton (sitemap) into a
body (page-level IA) deliberately, layer by layer. Nothing new should appear for the
first time inside a wireframe.

## Phase model

```
Research → IA (global + page-level) → Wireframes → Concept → Design System → Components → Handoff
```

Research answers *who* and *why* (personas, JTBD). IA answers *where* and *what*. Only
then do wireframes answer *how it looks*.

---

## Principle 1 — Two layers of IA

| Layer | Question it answers | Artifacts |
|-------|--------------------|-----------|
| **Global IA** | "Where can a user go?" | Sitemap, navigation (header/footer), user flows, traceability matrix (jobs → screens) |
| **Page-level IA** | "What is on each page and how does it behave?" | Per-page spec + inherited-component library |

Most teams stop at the global layer and discover the page layer was missing only once
they are deep in wireframes. Do the page layer explicitly.

## Principle 2 — Jobs are "why", IA is "how"

Keep the JTBD set small and stable. Filters, facets, alternate search modes (by
category / goal / symptom / brand), city landing pages, etc. are **IA mechanisms that
serve existing jobs** — they are not new jobs. Do not inflate the job list to justify a
piece of UI. _(Stack example: "search by symptom" is a discovery entry point serving the
beginner-guidance job, not a separate job.)_

## Principle 3 — Mobile-first, fully responsive

The product is fully responsive desktop↔mobile, but **mobile is the priority**. Reason
block priority and the "above the fold" first screen from mobile; still design the
desktop layout deliberately (it is a store, not an app). State this stance in the
project context so every later artifact inherits it.

## Principle 4 — SEO baked into IA (pulled forward)

Do **not** defer SEO to wireframing. Before wireframes, define per page:
H1, H2 structure, meta title, meta description, URL slug, breadcrumbs, SEO-copy intent,
and any dynamic variables (e.g. city — _"Протеїн Одеса"_). This way the wireframes land
on a finished SEO structure instead of bolting it on later.

---

## Artifact format — Sitemap + IA

Adopted format (reference example lives in `research/sitemap png example/`):

- **Numbered cards.** `X.Y` where `X` = a flow cluster and `Y` = a step/state within it.
- Each card = **title** + **type** (page / dialog / state) + **INCLUDES** (the blocks
  and components on it) + **flow arrows** to the next nodes.
- **Dialogs and states are first-class nodes** (empty / loading / error / success /
  logged-in / role variants), not footnotes.

Deliver **two artifacts** (decided for Stack):

1. **Lean schema** — structure + transitions + brief includes. The map you scan.
2. **Full page-level IA** — one detailed spec per page, in docs. The detail you build from.

## Per-page IA spec template

Copy this per page:

```
Page: <name>            Type: page | dialog | state
Cluster/№: <X.Y>
Purpose: <one line>     Job(s) served: <#>
URL / slug: </path>     Breadcrumbs: A > B > C
SEO:
  H1: <...>
  H2 structure: <...>
  meta title / description: <...>
  SEO-copy intent: <what the copy must achieve>
  dynamic vars: <e.g. city>
Content blocks (priority order, mobile-first):
  1. <above the fold>
  2. ...
Components (from library) + variants: <Header(role=guest), ProductCard, FilterPanel...>
States: guest | logged-in | <role> | empty | loading | error | out-of-stock
Filters / facets (catalog pages): price, brand, country, goal, form, availability
Primary CTA (one clear next step): <...>
Responsive: <mobile stack → desktop layout notes>
```

## Inherited components — documented as page-level IA nodes (not a separate artifact)

_(Stack decision, 2026-06-29)_ Rather than a standalone "component library" page, the
**global elements are documented as page-level IA nodes themselves** — Navigation (header +
mobile tabs) is node 0.1, Footer is 0.2, etc. Each gets the same treatment as a page: an md source of truth in
`ia/docs/pages/` plus a reviewable HTML visual in `ia/`, and a line in the unified
sidebar. The "library" emerges as the set of these nodes; shared sub-elements (Search,
Product card, Filter panel, Auth dialogs, Cart, Goal tiles) are described inside the nodes
that own them and cross-referenced, instead of duplicated in a separate doc.

For a stateful global component, the node spec's core is a **state matrix** (e.g. Header:
guest / buyer / coach × mobile / desktop, plus transient states like search-open,
mega-open, scrolled), an **anatomy table** (element → behavior → destination), the
**transitions**, and **SEO/a11y** notes (a global component carries no H1; it is the main
internal-linking surface).

---

## How to run it (sequence)

0. **Reframe context** — platform stance (mobile-first responsive), the two IA layers,
   SEO pulled forward. Update the project brief so all later work inherits it.
1. **Complete the sitemap** — exhaustive page tree + auth/dialog/state nodes + dynamic
   (e.g. city) variants. Lean includes only.
2. **Inherited component library** — header/footer/dialogs/card/filters defined once.
3. **Page-level IA per cluster** — fill the per-page template, cluster by cluster.

Output = the wireframe library. Wireframes then just render it.

---

## Project log — Stack (append-only)

- **2026-06-29** — Repo restructured: research HTML moved to `research/`, research
  markdown moved to `research/docs/` as the single source of truth. Sidebar navigation
  made consistent across pages.
- **2026-06-29** — Adopted this playbook. Locked decisions for the new IA push:
  - Coach model stays **"coach-as-buyer"** (multi-client ordering), **not** a coach
    marketplace/directory. Rejected ChatGPT's directory model (it also pulled in
    "consultation", which is out of MVP scope).
  - Deliver sitemap and page-level IA as **two separate artifacts**.
  - **Do not change JTBD** — filters and symptom search are IA, not new jobs.
  - SEO **pulled forward** into IA. Mobile-first responsive confirmed as the stance.
- **2026-06-29** — Built the live sitemap artifact `ia/sitemap.html` (Ukrainian cards +
  Mermaid). User reviews HTML, not markdown — HTML is canonical, `ia/docs/sitemap.md` is
  a light index. Iterations: split Home from Auth; renumbered clusters (Home=0, Auth=1, …,
  Content=8); added Favorites/wishlist (MVP: header icon + account page, buyer + coach);
  added a global Footer card; Cart became a dialog (selected items + "go to checkout");
  split Blog into catalog + article.
- **2026-06-29** — Auth model CONFIRMED: unified sign in/up as dialogs for all roles;
  coach is a role activated on an existing account (landing CTA or account section); no
  separate coach login, no role tabs.
- **2026-06-29** — Coach-tier hypothesis Free vs Pro (numbers [?]): Free = better-than-
  retail wholesale + 2-3 client cap, instant; Pro = max wholesale + unlimited clients,
  paid (~99 UAH/mo). Activates the brief's deferred paid-subscription question; Free price
  must still pass the coach price gate; primary persona needs Pro. Not committed.
- **2026-06-29** — Pivot on the component library: **no separate `components.html`.**
  Each card/node becomes its own page-level IA page = md source of truth (`ia/docs/pages/`)
  + reviewable HTML visual (`ia/*.html`). Started with the **Header** (node 0.1):
  `ia/docs/pages/header.md` + `ia/header.html` (state matrix guest/buyer/coach × mobile/
  desktop, anatomy table, transitions, SEO/a11y, open questions).
- **2026-06-29** — Unified the doc site under **one left sidebar** across all pages
  (research, personas, jtbd, concept, and every page-level IA page). Two groups:
  research-phase pages, then an «Інформаційна архітектура» group listing the page-level
  nodes (Карта сайту → Хедер → …). Converted `ia/sitemap.html` from its standalone topbar
  to the shared sidebar layout.
- **2026-06-29** — Renamed the old global-IA page: `research/ia.html` →
  `research/concept.html`, titled **«Концептуальна архітектура»** (jobs/persona-driven
  clusters, flows, traceability). The name **«Інформаційна архітектура»** is now reserved
  for the detailed page-level layer in `ia/`.
- **2026-06-29** — Renamed Header node → **Navigation** (0.1): `header.*` → `navigation.*`,
  sidebar label «Хедер» → «Навігація» on every page. Scope widened to **header + mobile
  bottom tab bar**. Set **mobile baseline = 360px**. Did a small **UX research pass** on
  mobile bottom-nav patterns (3–5 tabs max 5; categories top-level per Baymard; ≥44px;
  labels+icons; search stays in top bar; avoid a "More" tab) and baked a research-backed
  recommended tab set (Головна · Каталог · Кошик · Обране · Акаунт; coach variant swaps in
  Кабінет) into `navigation.html`/`.md`. Open micro-decisions flagged: Home-vs-Цілі label,
  no dedicated Menu tab, coach tab set.
- **2026-06-29** — Reconciled the conceptual layer: translated the **whole `concept.html`
  visual to Ukrainian** (all 6 Mermaid diagrams + tree + matrix + nav), since visual pages
  must be in the product language (md sources stay English). Added a one-line note in its
  navigation model that mobile primary nav = bottom tabs. Did **not** touch the 5 flows'
  structure or add jobs (e.g. favorites stays a mechanism, not a flow) — conceptual stays
  the lean base.
- **2026-06-29** — Mobile tab set **LOCKED**: buyer/guest = Головна · Каталог · Кошик ·
  Обране · Акаунт; coach swaps tab 1 → Кабінет тренера. Search stays in top bar; no
  «Меню» tab (secondary links go to the Account screen). Tab 1 = Головна over Цілі (home
  leads with goal tiles, gives reset, thumb-reachable since the logo is top-left). Open
  decisions in `navigation.html`/`.md` converted from `[?]` to ✓.
- **2026-06-29** — Closed the rest of the navigation open questions: guest favorites =
  **login required** (no guest wishlist → registration driver); tier badge = calm Free/Pro
  chip in the header account zone + contextual upgrade nudge; «Цілі» desktop mega-menu =
  goals + top categories (2 columns) + "all products" link, with «Каталог» kept as the
  full-catalog entry. Navigation node now has zero open questions.
- **2026-06-30** — Detailed the desktop header (LOCKED). **Meta bar**: «Для тренерів»
  (emphasized, the coach front door) + Акції · Бренди · Доставка · Повернення · Про нас on
  the left; location + language (Укр/Рус) dropdowns on the right. **Main bar**: Logo ·
  Каталог (primary button) · Цілі (secondary dropdown) · Search with a «Знайти» button ·
  Увійти/Кабінет (icon + caption) · Обране · Бонуси · Кошик. **Каталог mega-menu** (Belok-
  style): categories → subcategories → inner + a «За ціллю» column + "all products".
  **Account dropdown** specced (guest/buyer/coach). **Informative cart** (empty / count+sum)
  and **Бонуси** element (guest «Отримати» → register, logged-in balance; mechanics `[?]`).
  Referenced Belok screenshots for structure. All header mockups are **black-and-white**
  (wireframe level) so colour isn't carried into wireframes — colour comes at the concept
  stage. On mobile, the meta bar + language/location + Бонуси move to the Account screen.
- **2026-06-30** — Built the **store taxonomy** (`ia/docs/pages/catalog.md` +
  `ia/catalog.html`, cluster 2). Pulled a real catalog tree from **Belok.ua** (WebFetch) and
  cross-checked Sporter / bb.ua / Euro Protein, then de-duplicated (Belok lists Креатин /
  Амінокислоти / Батончики both nested and top-level → one top-level each). Result: 14 top
  categories → subcategories → types; **goals modelled as cross-cutting collections** (goal
  → which categories it pulls from), not new categories (JTBD unchanged); brand/price/form/
  flavour/etc. are **facets**, not tree levels. Added «Каталог» to the sidebar on every page.
  Method note: when a node needs a real-world structure (taxonomy, channels), pull it from
  live references rather than inventing — ground the IA in actual market data.
- **2026-06-30** — Catalog MVP breadth + goals locked. Ship **full breadth but rebalanced
  14→12 well-filled top categories** (user flagged "many thin top-levels with half-empty
  listings"): folded «Суглоби» into «Здоров'я», merged «Замінники харчування» into
  «Батончики, снеки та харчування», expanded «Здоров'я» from a flat blob into ~10
  subcategories (incl. men's/women's health), renamed «Передтренувальні та енергія».
  **Goals = 6 LOCKED** (Набір маси · Схуднення · Відновлення · Енергія · Імунітет ·
  Витривалість) — each backed by the launch catalog (a goal tile must not lead to an empty
  listing; Витривалість only works because Ізотоніки ships). Lesson: **balance the taxonomy
  to fill, don't multiply thin top-levels; and never ship a goal/collection the catalog
  can't back.**
- **2026-06-30** — Closed the remaining catalog questions. **Goals integrated into the
  Catalog** as a first-class **concern lens** (the user's analogy: "browse by symptom" on
  Liki24): «За ціллю» is the mega-menu column *and* the top block of the mobile Catalog
  drilldown, so goals never disappear on mobile (they also stay on the Головна hero and the
  «Цілі» dropdown). **Symptom/concern node 2.3 dissolved into goals** + «Здоров'я»
  subcategories (no separate tree). **Дитяче здоров'я — out of scope** (audience focus).
  **L-карнітин → canonical category Жироспалювачі**, via a general rule: **one canonical
  category per product**, multi-discovery through goal tags + facets + search (no dual
  listings). Updated the Navigation page to reflect all of this. Catalog now has only the
  operational population `[?]` left. Lesson: a recurring discovery dimension (goals/symptoms)
  should live *inside* the catalog, not only in a top-bar dropdown that vanishes on mobile.
- **2026-06-30** — Navigation polish to match the catalog + a cleaner account model:
  mega-menu left column now lists the real **12 categories** (+ middle subcats aligned, right
  column **6 goals**); added a **«Цілі» dropdown** mock (same 6 goals + "all goals"). **Account
  model:** guest 👤 «Увійти» opens the **dialog** directly (no dropdown); only logged-in gets a
  **dropdown**, and that dropdown **drops «Обране» & «Бонуси»** since they're already their own
  header elements (don't duplicate a control that's visible on the bar).
- **2026-06-30** — **Footer (node 0.2)** built as `ia/docs/pages/footer.md` + `ia/footer.html`
  (B/W wireframe, 360px). Structure: (A) **trust strip** = 4 cards icon+heading+text
  (delivery · guarantee · payment · returns), repeated per page per "trust first" principle;
  (B) **main footer** 4 columns — newsletter (with anti-spam reassurance) + "support us"
  (Google rating / review) · Stack (about, contacts, policy, public contract, terms, blog) ·
  Customers (discounts, delivery & payment, FAQ, returns, «Для тренерів» dup) · Consultation
  (big free phone first, hours, email, on-site chat, Telegram/Viber, socials FB·IG·TikTok·YT);
  (C) **SEO popular-queries block** — the Comfy "iPhone 17 / smartphones / laptops" pattern;
  groups = categories/types · goals · brands · cities; web-research-grounded (top categories in
  header+footer + descriptive internal links is standard; link only valuable destinations or you
  dilute weight); **structure locked, exact list deferred to keyword research [?]**, cities share
  the Navigation location dropdown's SEO city pages; (D) **bottom bar** © + Visa/MC/Apple-Google
  Pay badges + socials. Mobile: trust 2×2, newsletter+consultation expanded, link columns + SEO
  block as **accordions** (collapsed but still crawlable in DOM). Added Футер to every page's
  shared sidebar (between Навігація and Каталог) and enriched sitemap node 0.2. Lesson: the
  footer is a *second* internal-linking surface — treat the popular-queries block as real SEO
  IA (groups + crawlable `<a>`), but lock the pattern now and fill exact terms at SEO-copy stage.
- **2026-06-30** — **City list resolved** (was an open `[?]` on both Navigation and Footer).
  Decision: the location chip opens a **large «Оберіть місто» dialog** (not a narrow dropdown,
  because the list is long) — search + **Tier-1 popular** (metros: Київ/Харків/Дніпро/Одеса/
  Львів/Запоріжжя/Кривий Ріг/Миколаїв) + **Tier-2 popular** (~12 secondary) + full A–Z. Canonical
  list = **23 Ukraine-controlled oblast centers + large non-center cities** with sportpit demand
  (Кривий Ріг, Кременчук…); Crimea (Сімферополь/Севастополь) + occupied territories excluded;
  Nova Poshta covers the long tail. **Popular tiers are data-driven** (auto-ranked by traffic/
  orders + manual override); default city by geo. **One canonical list** feeds delivery, the nav
  dialog, and the footer SEO city pages — built it into Navigation (mock + locked block + anatomy)
  and pointed Footer's city group at it. Web-grounded in real UA sportpit store coverage +
  population data. Lesson: a value that recurs in several components (here: cities — nav selector,
  delivery, footer SEO) should be defined **once as a canonical list** and referenced, not
  re-listed per page; and "which cities are *popular*" is an operational/data knob, not a
  structural IA decision — lock the mechanism (tiers + auto/manual), defer the contents.
- **Next** — Home (0.0) as a page-level IA page (md + html), then cluster by cluster. Add each
  new node to the sidebar group and to `ia/docs/sitemap.md`.
