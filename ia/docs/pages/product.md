# Page-level IA — Product detail (node 3.0)

- **Node:** 3.0 Product detail. Sub-nodes on the same page: **3.1 Reviews**, **3.2 Questions**,
  **3.3 Related** (rendered as in-page sections, not separate routes).
- **Type:** product detail page (PDP) — the **conversion target of every product card** and the
  home of the trust/verify job.
- **Canonical visual:** `ia/product.html` (Ukrainian, B/W wireframe). This markdown is the source
  of truth (English).
- **Jobs:** **Job 4 — verify a product is safe, certified, correctly dosed** (the page's reason to
  exist; composition · dosage · origin · certification, per sitemap cluster 3) and the **conversion
  step** of Job 2 (beginner) and Job 3 (regular). In a coach session it is also a quick-add surface.
- **Flow source:** `research/docs/flows.md` → "Job 3 - verify product safety before buying". The
  page must deliver: trust details (composition/dosage/origin/certification) clearly; reviews +
  certificate content as the **recovery** for an unconvinced buyer (before any leave); an in-stock
  check → Cart; out-of-stock → back to the collection for an alternative; loading/error states for
  the trust details.
- **Card source:** the canonical product card (`home.md`) links here; «У кошик» on a card → Cart (6.0).
- **Related:** Category/listing `2.1`, Goal collection `2.2`, Brand `2.4`, Cart `6.0`,
  Wishlist `7.6`, Back-in-stock `8.x`, Navigation `0.1`, Footer `0.2`.

---

## Decisions (recommendations, flagged for review)

- **Trust is the lead, not a tab buried below the fold (principle #1).** The four trust facts the
  flow names — **Склад · Дозування · Походження · Сертифікація** — are a first-class block directly
  under the buy box, not hidden behind a single «Опис» accordion. The marketing description sits
  *after* the trust facts, not before.
- **One clear next step (principle #2).** A single primary CTA «У кошик». On mobile it becomes a
  **sticky bottom bar** (price + «У кошик») so the action is always one tap away. Wishlist ♡ is
  secondary. No competing CTAs.
- **Lead with the simple answer, allow depth (principle #5).** A one-line plain-language «для чого
  це» under the H1; the full composition table / lab values are available but never block the
  simple answer.
- **Variants on one page, one canonical URL.** Flavour + size/weight are selectors on a single PDP.
  Switching a variant updates price/availability/SKU in place; variant params are **canonical to the
  base product URL** (no thin duplicate pages). Out-of-stock variants are shown disabled, not hidden.
- **Calm, honest availability (principle #4).** No countdown timers, no fake scarcity. Availability
  states are plain text; out-of-stock offers **«Повідомити про надходження»** (8.x) and a route back
  to the collection — never a dead end.
- **Reviews + certificate are the conversion recovery.** Per the flow, an unsure buyer is routed to
  **reviews (3.1)** and **certificate content** on the same screen before leaving. Both live on the
  PDP; the certificate is **real viewable content** (image/PDF), not just a claim.
- **Coach-aware.** In a coach in-session state the primary CTA becomes **«Додати клієнту»** (per the
  category «Тренер у сесії» state); the coach also sees the **tier price**.

---

## Block order (mobile-first)

0. **Header** — inherited (Navigation 0.1).
1. **Breadcrumb** — Головна / Каталог / [Категорія] / [Товар] (BreadcrumbList; crawlable `<a>`).
1a. **Product section-nav tabs** — Про товар · Склад · Дозування · Характеристики · Відгуки · Питання
   (anchor links to the page sections). **On scroll the tab bar sticks under the simplified header
   (the sticky header variant — main bar only, no meta bar) and becomes part of it**; on the right it
   gains a **compact price (with or without discount) + «Купити» + ♡** so the action is reachable at any
   scroll depth. Active tab highlights by scroll position. (Header sticky variant spec: `navigation.md`.)
2. **Gallery** — product photos (main + thumbs); zoom; lazy-loaded below the first image.
3. **Buy box** (right column on desktop, under gallery on mobile):
   - **brand · country eyebrow ABOVE the H1** (brand → 2.4), then the **H1** product name (with
     weight/size in the name). Same brand-above-title pattern as the canonical product card.
   - **Rating** stars + review count → anchors to Reviews (3.1).
   - **Article/SKU** · **availability** (в наявності / залишилось мало / під замовлення / немає).
   - **One-line simple answer** — «для чого це» in plain language.
   - **Price:** **struck (old) price + the −% discount badge BESIDE it on top → new price big below**
     (the badge sits next to the struck price — the universal rule across PDP and all cards; decided
     2026-06-30, refined from "beside the new price"); **per-serving price** («≈ X ₴ / порція»); coach
     sees **tier price**. No discount → just the main price (no struck price / badge).
   - **Variant selectors** — Смак · Фасування/вага (disabled when a variant is out of stock).
   - **Quantity** stepper.
   - **Primary CTA «У кошик»** (→ Cart 6.0) + **♡ wishlist** (→ 7.6). Coach session → «Додати клієнту».
   - **Delivery + Payment block (under the CTA, decided 2026-06-30):**
     - **Доставка:** Нова Пошта — **відділення або поштомат** (від 50 ₴); **кур'єр Нової Пошти на
       адресу / до під'їзду** (від 70 ₴); **самовивіз** (Одеса, адреса [?]) — **безкоштовно**.
       Terms: НП 1–2 дні; **самовивіз лише за наявності на точці** (own per-point stock state).
     - **Оплата:** картка онлайн / Apple·Google Pay · накладений платіж · готівка при самовивозі.
       (Delivery prices and pickup addresses are example values — operational [?].)
4. **Trust strip (single block, before composition).** The four micro-signals — **оригінал+гарантія ·
   сертифікат · доставка Новою Поштою · повернення 14 днів** — moved OUT of the buy box into one
   full-width block placed **right before the trust facts** (decided 2026-06-30).
5. **Trust block — the lead (Job 4).** Four grouped facts, **all sections open by default, collapsible**:
   - **Склад** — active ingredients **per serving** (table: речовина · на порцію · % добової норми) +
     **full ingredient list text** + allergens (МОЛОКО/СОЯ) + **photo of the on-pack composition label**
     (extra trust — mirrors what competitors show).
   - **Дозування та застосування** — how much, when, how to take; plain steps.
   - **Походження** — manufacturer, country, importer; «оригінальний продукт» guarantee.
   - **Сертифікація** — certificate of conformity + lab tests; **viewable certificate** (open image/PDF).
6. **Опис (description)** — full product copy (plain language; what / who / why / key features). After
   trust. **Additional product photos** row. (Per-product copy = copy stage.)
7. **Характеристики (specs)** — full attribute table (brand · country · form · weight · servings ·
   flavour · certification · goal) — mirrors the catalog facets.
8. **Відгуки (3.1)** — aggregate rating + breakdown + **«Залишити відгук»**; the trust **recovery**
   surface. **Review item layout: name + given rating + date on the LEFT, the review text on the RIGHT.**
   Each review: **Переваги / Недоліки** categories (**may be empty → show only filled ones**),
   **photos**, **replies** («Показати відповіді (N)» → expand, with dates, photos allowed on replies),
   and **shop replies marked with a special chip (shop logo instead of a name)**. **Two states:**
   **many reviews → paginated**, **few → simple list, no pagination**.
9. **Питання (3.2)** — **«Поставити запитання» opens a dialog form** (modal desktop / full-screen
   mobile); the question is added to the **Q&A feed**; the **shop answers (special chip)** or other
   buyers do; **no rating, no pros/cons** — same mechanic as reviews otherwise. Optional moderation
   before publish. FAQ schema if present.
10. **Схожі / related (3.3)** — «Схожі товари» · «З цим купують» · same-goal collection (internal
   linking + AOV). Canonical product cards.
11. **Статті по темі (blog 8.0/8.1)** — article teasers related to the product (helps the beginner /
   Job 2 + SEO; calm, no selling).
12. **Sticky buy bar (mobile)** — price + «У кошик», visible after the buy box scrolls off.
13. **Footer** — inherited (0.2).

## States
| State | Behaviour |
|---|---|
| Default / in stock | Price + active «У кошик»; variants selectable. |
| Залишилось мало | «Залишилось мало» note + active «У кошик». |
| Під замовлення | «Під замовлення» + «У кошик» (longer delivery note). |
| Немає в наявності | Greyed price + **«Повідомити про надходження»** (8.x) + «Повернутись до колекції» link (flow recovery). Never a dead end. |
| Variant out of stock | That flavour/size option disabled; other variants still buyable. |
| Loading (trust details) | Skeletons for gallery + buy box + trust block (no layout shift). |
| Error (details failed) | Inline error + **«Спробувати ще»** (retry), per the flow's `se → qr` recovery. |
| Added to cart | Confirmation (toast / mini-cart drawer) with «Перейти в кошик» + «Продовжити». |
| Coach in-session | CTA = **«Додати клієнту»**; tier price shown (per category 2.1 coach state). |
| Unsure buyer | Same-screen route to Reviews (3.1) + certificate content before any leave (flow recovery). |
| Reviews: many | Paginated list; rating + breakdown on top. |
| Reviews: few | Simple list, no pagination. |
| Review without cons | Empty «Недоліки» hidden; show only filled pros/cons. |
| Review replies | «Показати відповіді (N)» expands; shop reply = special chip; replies can have photos. |
| Ask a question | Opens a dialog form; on submit the question appears in the Q&A feed (optional moderation), shop answers. |
| Pickup unavailable | Самовивіз shown only when the pickup point has stock; otherwise hidden / «немає на точці». |

---

## SEO block (A–E) — product template

**A · Meta tags (example: Gold Standard 100% Whey 2270 г)**
- **Title (≤60):** Gold Standard 100% Whey 2270 г — купити, ціна | Stack
- **Description (≤155):** Сироватковий протеїн Optimum Nutrition: 24 г білка/порція, оригінал
  із сертифікатом. Доставка Новою Поштою, оплата картою. Купити в Stack.
- `canonical` → clean product URL (e.g. `/protein/gold-standard-whey/`); **variant params
  (flavour/size) canonical to the base product** (no thin duplicates); hreflang uk/ru/x-default;
  robots index,follow; **OG type = product** (og:title · og:image · product:price:amount ·
  product:availability).

**B · Headings**
- **H1 (single):** product name (incl. weight/size).
- **H2:** Склад · Дозування та застосування · Опис · Характеристики · Відгуки · Часті питання ·
  Схожі товари.

**C · Ready SEO text** — plain-language description + how-to-use (root keywords, no spam,
principle #5). Per-product copy is authored at the copy stage; structure fixed here.

**D · Structured data**
- **Product** (name, image, brand, sku, description) + **Offers** (price, priceCurrency UAH,
  **availability** InStock/PreOrder/OutOfStock, priceValidUntil).
- **AggregateRating** + **Review** (from 3.1) — eligible for review stars in SERP.
- **BreadcrumbList** (Головна → Каталог → Категорія → Товар).
- **FAQPage** (optional, from 3.2 Questions).

**E · Optimization checklist**
- Single **H1**; descriptive crawlable breadcrumb; brand link → 2.4.
- **availability + price in Product/Offers schema** kept in sync with the real state (incl. out-of-stock).
- **Certificate is real content** (viewable image/PDF), not text-only claim — trust + (indirectly) SEO.
- Gallery images: `alt` (product + brand + flavour), main image not lazy (LCP), thumbs lazy-loaded.
- Variant URLs canonical to base; no duplicate-content from flavour/size params.
- Reviews rendered server-side (crawlable text), not only via JS.
- Core Web Vitals; українська мова контенту; tap targets ≥ 44px.

---

## Accessibility
Gallery operable by keyboard (arrows, thumbs focusable); variant selectors are labelled radio
groups; quantity stepper has accessible +/− buttons and a typable field; «У кошик» announces the
add via `aria-live`; sticky bar does not trap focus; certificate opens in an accessible
dialog (focus trap, ESC closes, returns focus). Star rating has a text equivalent («4.8 з 5,
126 відгуків»).

## Mobile (360px)
Single column: gallery → buy box → trust block → опис → характеристики → відгуки → питання →
схожі. **Sticky bottom buy bar** (price + «У кошик») appears after the buy box scrolls off.
Trust facts and long sections are collapsible accordions but the **simple answer + price + CTA
are always above the fold**. Tab «Каталог» active.

---

## Locked (draft) / open
**Locked (draft, 2026-06-30):**
- **Product section-nav tabs** after the breadcrumb (Про товар · Склад · Дозування · Характеристики ·
  Відгуки · Питання); on scroll they **stick under the simplified header (no meta bar) and become part
  of it**, with a compact **price (discount/none) + «Купити» + ♡** on the right.
- **Price:** struck (old) price **+ −% badge beside the struck price** on top → new big below
  (universal rule across PDP and all catalog cards; the discount badge is NOT a corner overlay).
- **Delivery + Payment block under the CTA** (НП відділення/поштомат · кур'єр на адресу · самовивіз
  за наявності; ціни від 50/70/безкоштовно; способи оплати).
- **Single trust strip before composition** (оригінал · сертифікат · доставка · повернення), moved
  out of the buy box.
- **Trust block is the lead** (Склад + **on-pack composition photo** · Дозування · Походження ·
  Сертифікація), **sections open by default, collapsible**; **опис** (full copy + extra photos) after.
- Single primary CTA «У кошик» + sticky mobile bar; lead-with-simple-answer + depth.
- Variants on one canonical PDP (params canonical to base, OOS variants disabled not hidden).
- Calm honest availability with «Повідомити» + route back to collection (no dead end).
- **Reviews (3.1):** name+rating+date LEFT ↔ text RIGHT; **Переваги/Недоліки** (may be empty);
  photos; **replies** (expand/collapse, dates, photos); **shop reply = special chip (logo, not name)**;
  states **many → paginated / few → no pagination**. Certificate + reviews = conversion recovery.
- **Questions (3.2):** «Поставити запитання» = **dialog form** → Q&A feed; shop (chip) / buyers
  answer; **no rating, no pros/cons**.
- **Статті по темі (blog 8.0/8.1)** section before footer.
- Specs mirror catalog facets; related (3.3) on the same page; coach-aware CTA «Додати клієнту» +
  tier price; A–E SEO with Product/Offers + AggregateRating + Review + Breadcrumb + variant-canonical.

**Still [?] (operational / data, not IA):**
- Per-product copy, composition tables/photos, dosage text, certificate files — copy/data stage (real
  supplier data; the operational catalog-population [?] from the brief).
- Review/rating data — needs real reviews; aggregate rating depends on volume.
- «З цим купують» recommendation logic — needs sales data (initially manual/related-category).
- Coach tier price value — pricing decision [?] (Free vs Pro hypothesis).
- Per-serving price display rule when pack sizes/servings vary — confirm at data stage.
- **Pickup addresses + delivery prices** (НП від 50 ₴, кур'єр від 70 ₴ — examples) — operational [?].
- **Per-pickup-point stock** for the самовивіз availability — operational [?].
- **Moderation policy** for reviews/questions before publish — [?].
