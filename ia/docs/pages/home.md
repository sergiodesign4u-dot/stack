# Page-level IA — Home (node 0.0)

**Type:** page (the site root)
**Visual:** `ia/home.html` (Ukrainian, B/W wireframe)
**This file:** source of truth (English)
**Platform:** mobile-first, fully responsive, baseline 360px
**Related:** Navigation `0.1`, Footer `0.2`, Goal collection `2.2`, Catalog `2.0/2.1`, For-coaches `5.0`, Order repeat `7.3`, Coach session `5.5`

---

## Role

The Home page is **two non-blocking front doors + a return path**, per the concept layer:
1. **Beginner (Job 2)** — the hero is a **goal selector** (6 goal tiles): the overwhelmed
   newcomer's "one clear next step" (design principle #2). Goals are the same concern lens used
   in Navigation and Catalog.
2. **Coach (Job 1, primary business)** — a **visible «Для тренерів» block** on the page, not just
   a meta-bar link (principle #3: the coach is a channel, not an edge case).
3. **Regular (Job 4/Job 3)** — for logged-in buyers, a **repeat-order** strip surfaces right under
   the hero.

Trust first (principle #1), calm and confident, **no countdown timers** (principle #4). Home is
also **mobile tab 1** and the root SEO landing.

---

## Block order (mobile-first priority) — restructured 2026-07-01 (Foxtrot-pattern hero)

1. **Hero — category rail + banners (Foxtrot/Rozetka pattern).** Desktop: a **left category rail**
   (12 top categories; hover → **flyout** of subcategories → Category 2.1) + **banners on the right**
   — a **promo slider of 2–3 banner cards** (not one big banner) + 2 **vertical** promo banners. Fast
   entry for the regular/known-item buyer (Job 3) + merchandising. The **wholesale «Для тренерів» banner
   is targeted to coaches only** (not shown to everyone — showing wholesale prices to all is undesirable;
   the dedicated «Для тренерів» block remains, principle #3). On **mobile** the rail collapses to a
   **banner + horizontal category chips** (full catalog in the «Каталог» tab). Replaces the previous
   goal-selector hero — goals move to block 3.
2. **Cart shelf (state)** — shown when the cart is non-empty (now or from a previous visit; guest
   cart persisted locally): item count, total sum, item thumbnails, **«Оформити замовлення»** (→
   checkout 6.1) + «Переглянути кошик» (→ 6.0). A strong "continue your purchase" nudge. Coach: sum
   by tier + per-client grouping mention. (A by-role **personal strip** — guest/buyer/coach — is a
   detailed state variant of this block.)
3. **Спортивне харчування під вашу ціль (goal selector).** **Big heading + description** (restored) +
   **6 goal tiles** (Набір маси · Схуднення · Відновлення · Енергія/тонус · Імунітет/здоров'я ·
   Витривалість) — the beginner's concern-lens front door (Job 2), right under the cart shelf. Primary
   CTA is **«Пройти квіз»** (not «Відкрити каталог»). Tiles → Goal collection (2.2); quiz → 4.0
   (post-launch; MVP routes to goal tiles). **Quiz surfacing (it had got lost):** this block's CTA +
   the header **«✦ Квіз» button** (which replaces the «Цілі» mega-menu, see `navigation.md`); candidates:
   empty catalog results, product page for a beginner.
4. **Trust band** — certified/original · delivery NP 1–2 days · payment · 14-day returns · reviews.
   Short band; the full 4-card strip lives in the Footer (0.2). Links → 8.8 / 8.4 / 8.5 / 8.11. Text, not images.
5. **Products — themed showcase tabs.** A tabbed product block: **Хіт продажу · Кращі цінові
   пропозиції · Преміум товари · Новинки** (switching a tab swaps the card row). Uses the **new
   canonical card** (see below). Card → Product (3.0), 🛒 → Cart (6.0). Coach sees tier pricing.
6. **«Для тренерів» banner** — wholesale pricing, multi-client ordering, per-client history; CTA →
   For-coaches landing (5.0, Free/Pro comparison). Guest → unified sign-in (1.0) then activation (5.1).
7. **(Новинки is a tab of block 5.)**
8. **Recently viewed (state)** — shown when there's view history (guest: local; logged-in: account);
   same product card. Helps the user return to a product and finish buying.
9. **Promotions · Brands · Blog** — calm promo (no timers, principle #4) → 8.10; brand strip → 2.4
   (trust + SEO); blog teaser → Article (8.1) / Blog (8.0) (helps the beginner + SEO).
10. **SEO text** — bottom H2 + descriptive store copy (root keywords). Popular query-links live in
   the footer (0.2).

(The old standalone "Popular categories" tiles block is **dropped** — the hero category rail covers it.)

### Product card (canonical component) — redesigned 2026-07-01 (Foxtrot/Belok-style)
Reused on Home, Catalog and all listings. Fields, top→bottom:
- **Vertical photo** (~10:11 — slightly reduced from the first pass; jars/tubs read vertical) with
  **♡ favourite** (top-right; guest → sign-in 1.0) and a **corner tag for Хіт / NEW only** (the
  discount is shown by the price, not a corner).
- **Rating** (★ score) **+ review count** → Reviews (3.1).
- **Product name** — up to **2 lines** (clamped) → Product (3.0).
- **Brand · country** — a separate meta line under the name (brand → 2.4).
- **Price row:** new price (big) + old struck **with the −% badge next to the struck price** (universal
  rule), and an **icon-only «У кошик» button (cart icon, no text) beside the price** → Cart (6.0).
- **Meta row (bottom):** **price-per-serving** «75 ₴ / порція» (Belok-style) on the left + **bonus-program
  amount** «+9 ₴ Бонус» on the right.
Coach sees the tier price. Calm, no aggressive badges. **Canonical → must propagate to Category (2.1),
Catalog-hub (2.0) and all listings** (follow-up). Per-serving + bonus values are data-stage [?].

Desktop = the same blocks; the hero may go two-column (tiles + visual), categories/products run as
wider rows. First-screen and priority are reasoned from mobile.

---

## State matrix

| Block | Guest | Buyer | Coach |
|---|---|---|---|
| Hero goals | same | same | same |
| Cart shelf | shown if cart non-empty (local) | shown if cart non-empty | shown if non-empty; tier sum |
| Recently viewed | shown if local history | shown if account/local history | shown if history |
| Personal strip | hidden (show «Увійти») | **Repeat order** (7.3) + staples* | **New session** (5.5) + Coach home (5.2) |
| Product prices | retail | retail + loyalty | **wholesale by tier** (Free/Pro chip) |
| «Для тренерів» | banner → 5.0 | banner → 5.0 / become a coach | replaced by coach quick actions |
| One next step | pick a goal / sign in | repeat order | new order session |

---

## SEO block (full, produced at the IA stage — template for every page)

We finalize the page's whole SEO block during IA: meta tags (with ready copy), heading structure,
ready SEO body text, schema/tags, and an optimization checklist.

**A · Meta tags (ready copy)**
- `<title>` (≤60): **Спортивне харчування — купити спортпіт в Україні | Stack**
- `<meta name="description">` (≤155): **Магазин спортивного харчування Stack: протеїн, креатин,
  амінокислоти, вітаміни. Оригінал і сертифікати, швидка доставка Новою Поштою, оплата картою.
  Підберіть під вашу ціль.**
- `canonical` = `https://stack.ua/`; `hreflang` uk / ru / x-default; `robots` = index, follow.
- Open Graph (og:type=website, og:title, og:description, og:image, og:locale=uk_UA) + Twitter
  `summary_large_image`.

**B · Heading structure**
- **H1 (single):** «Спортивне харчування — інтернет-магазин Stack» (page-level store heading near the
  top of the content; root keyword). The hero rail is navigation, not the H1.
- **H2:** Спортивне харчування під вашу ціль · Хіти продажів · Для тренерів · Новинки ·
  Корисні поради · «Спортивне харчування в Україні — Stack» (SEO text).

**C · Ready SEO text (bottom)**
> **Спортивне харчування в Україні — Stack**
> Stack — інтернет-магазин спортивного харчування з доставкою по всій Україні. У каталозі —
> протеїн, гейнери, креатин, амінокислоти (BCAA, EAA), передтренувальні комплекси, жироспалювачі,
> вітаміни та продукти для здоров'я від перевірених брендів. Уся продукція сертифікована, з
> оригінальною гарантією виробника.
> Не знаєте, з чого почати? Оберіть ціль — набір маси, схуднення, відновлення, енергія, імунітет
> чи витривалість — і отримайте зрозумілий, безпечний набір із вказаним складом і дозуванням.
> Швидка доставка Новою Поштою за 1–2 дні, зручна оплата та повернення протягом 14 днів.

**D · Tags / structured data**
- schema.org **Organization** (name, logo, contacts, socials) + **WebSite** + SearchAction
  (sitelinks searchbox). **No BreadcrumbList** on the root. ItemList (optional) for the product rows.
- `lang="uk"` + hreflang (uk/ru).

**E · Optimization checklist**
- One H1, logical H2 → H3; every section has a meaningful heading.
- LCP banner optimized, non-blocking; images have `alt`, below-the-fold lazy-loaded.
- Internal linking via crawlable `<a>` tiles (goals/categories) with descriptive anchors.
- canonical + hreflang (uk/ru), no duplicate content. Trust band is text, not images.
- Core Web Vitals in the green; content language = Ukrainian. Popular query-links live in the footer.

> **Template:** this A–E SEO block is produced for **every** IA page (Catalog, Product, Goal, …).

## Accessibility
- Logical heading order H1 → H2; every section has a heading.
- Tiles are tap targets ≥ 44px with a visible focus ring.
- Product carousels keyboard-operable; prev/next buttons have `aria-label`.
- Text-on-banner contrast ≥ 4.5:1 (verify at the colour stage).

---

## Locked decisions (2026-06-30; hero + card restructured 2026-07-01)
- **First screen = category rail + banners** (Foxtrot/Rozetka pattern): left rail of 12 categories
  with hover **flyout** of subcategories + right **banner slider** & 2 **vertical** promo banners.
  Mobile = banner + horizontal category chips. (Replaces the goal-selector hero.)
- **Cart shelf (state)** right under the hero when the cart is non-empty: count, sum, thumbnails,
  «Оформити замовлення» / «Переглянути кошик». A by-role personal strip is a state variant.
- **Спортивне харчування під вашу ціль (goal selector, 6 tiles)** is block 3 — beginner's concern-lens
  front door, kept high (just under the cart shelf). The standalone "popular categories" tiles are dropped.
- **Product rows:** Хіти продажів · **Новинки** (NEW tag) · **Recently-viewed** (state) — all use the
  redesigned canonical card.
- **Canonical product card (Foxtrot/Belok-style):** large **vertical** photo · ♡ favourite · Хіт/NEW
  corner tag only · **rating + review count** · name up to **2 lines** · price (new + struck **with −%
  beside the struck price**) · **icon-only 🛒 button beside the price** · **meta row: price-per-serving
  + bonus («+N ₴ Бонус»)**. Canonical → must propagate to listings (2.1/2.0/…).
- **Full SEO block produced at IA** (meta tags + H1/H2 + ready text + schema + checklist) — template for every page.
- **Trust band high** (principle #1); full 4-card strip in the footer.
- **Visible «Для тренерів» block** on Home (principle #3) → landing 5.0.
- **Calm, no countdown timers** (principle #4). B/W mockups; colour at concept stage.
- Block order reasoned from mobile (360px); desktop = rail+banners, mobile = banner+chips.

## Open [?]
- Curation rules for product rows (bestsellers / new / recommended) — need sales data.
- Quiz (4.x) is post-launch (goal tiles for now); «Мої стейпли» post-launch.
- Whether to show "recently viewed" to guests.
