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

## Block order (mobile-first priority)

1. **Hero — goal selector.** One H1 (root keyword "спортивне харчування …") + **6 goal tiles**
   (Набір маси · Схуднення · Відновлення · Енергія/тонус · Імунітет/здоров'я · Витривалість/кардіо)
   + secondary «Відкрити каталог» and «Підібрати за квізом». Tiles → Goal collection (2.2);
   catalog → 2.0; quiz → 4.0 (post-launch; for now routes to goal tiles).
2. **Cart shelf (state)** — shown when the cart is non-empty (now or from a previous visit; guest
   cart persisted locally): item count, total sum, item thumbnails, **«Оформити замовлення»** (→
   checkout 6.1) + «Переглянути кошик» (→ 6.0). A strong "continue your purchase" nudge. Coach: sum
   by tier + per-client grouping mention.
3. **Personal strip (by state)** — one block that changes by role, right under the cart shelf:
   - **Guest:** hidden (nothing to repeat) → show «Увійти / Реєстрація» (1.0).
   - **Buyer (regular):** **Повторити останнє замовлення** (7.3, Job 4) + «Мої стейпли»* (post-launch).
   - **Coach:** **Нова сесія замовлення** (5.5) + **Кабінет тренера** (5.2).
4. **Trust band** — certified/original · delivery NP 1–2 days · payment · 14-day returns · reviews.
   Short band high on the page; the full 4-card strip lives in the Footer (0.2). Links → 8.8 / 8.4 /
   8.5 / 8.11. Text, not images.
5. **«Для тренерів» banner** — wholesale pricing, multi-client ordering, per-client history; CTA →
   For-coaches landing (5.0, Free/Pro comparison). Guest → unified sign-in (1.0) then activation (5.1).
6. **Popular categories** — tiles of top categories (Протеїн, Гейнери, Креатин, Амінокислоти,
   Передтренувальні, Вітаміни…) → Category (2.1). Full 12 in the «Каталог» mega-menu / catalog taxonomy.
7. **Products — bestsellers & new arrivals** — rows of product cards (Хіти продажів + **Новинки**,
   NEW badge instead of −%); card → Product (3.0), «У кошик» → Cart (6.0). Coach sees tier pricing.
   Calm cards. Row curation rules (hits/new/recommended) come later, from sales data.
8. **Recently viewed (state)** — shown when there's view history (guest: local; logged-in: account);
   same product card. Helps the user return to a product and finish buying.
9. **Promotions · Brands · Blog** — calm promo (no timers, principle #4) → 8.10; brand strip → 2.4
   (trust + SEO); blog teaser → Article (8.1) / Blog (8.0) (helps the beginner + SEO).
10. **SEO text** — bottom H2 + descriptive store copy (root keywords). Popular query-links live in
   the footer (0.2).

### Product card (canonical component)
Reused on Home, Catalog and listings. Fields:
**photo · product name · meta (brand · country of production) · price (new + old struck-through
when discounted, + a −% badge) · «У кошик» button.** Coach sees the tier price. Calm, no aggressive
badges. (Card → Product 3.0; «У кошик» → Cart 6.0.)

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
- **H1 (single):** «Спортивне харчування під вашу ціль» (hero).
- **H2:** Оберіть ціль · Для тренерів · Популярні категорії · Хіти продажів · Новинки ·
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

## Locked decisions (2026-06-30)
- First screen = **goal selector** (H1 + 6 tiles); secondary «Відкрити каталог».
- **Cart shelf (state)** under the hero when the cart is non-empty (now or earlier): count, sum,
  thumbnails, «Оформити замовлення» / «Переглянути кошик».
- **Personal strip by state** right under the cart shelf (guest hidden · buyer repeat-order · coach new session).
- **Product rows:** Хіти продажів · **Новинки** (NEW badge) · **Recently-viewed** (state; view
  history) — all use the canonical product card.
- **Canonical product card:** photo · name · meta (brand · country) · price (new + old struck-through
  + −% badge; NEW badge for new arrivals) · «У кошик».
- **Full SEO block produced at IA** (meta tags + H1/H2 + ready text + schema + checklist) — see the
  SEO block section; this is the **template for every page**.
- **Trust band high** (principle #1); full 4-card strip in the footer.
- **Visible «Для тренерів» block** on Home (principle #3) → landing 5.0.
- Then: popular categories → products (bestsellers) → promo/brands/blog → SEO text.
- **Calm, no countdown timers** (principle #4). B/W mockups; colour at concept stage.
- Block order reasoned from mobile (360px); desktop = same blocks, wider rows.

## Open [?]
- Curation rules for product rows (bestsellers / new / recommended) — need sales data.
- Quiz (4.x) is post-launch (goal tiles for now); «Мої стейпли» post-launch.
- Whether to show "recently viewed" to guests.
