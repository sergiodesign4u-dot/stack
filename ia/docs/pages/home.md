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
2. **Personal strip (by state)** — one block that changes by role, right under the hero:
   - **Guest:** hidden (nothing to repeat) → show «Увійти / Реєстрація» (1.0).
   - **Buyer (regular):** **Повторити останнє замовлення** (7.3, Job 4) + «Мої стейпли»* (post-launch).
   - **Coach:** **Нова сесія замовлення** (5.5) + **Кабінет тренера** (5.2).
3. **Trust band** — certified/original · delivery NP 1–2 days · payment · 14-day returns · reviews.
   Short band high on the page; the full 4-card strip lives in the Footer (0.2). Links → 8.8 / 8.4 /
   8.5 / 8.11. Text, not images.
4. **«Для тренерів» banner** — wholesale pricing, multi-client ordering, per-client history; CTA →
   For-coaches landing (5.0, Free/Pro comparison). Guest → unified sign-in (1.0) then activation (5.1).
5. **Popular categories** — tiles of top categories (Протеїн, Гейнери, Креатин, Амінокислоти,
   Передтренувальні, Вітаміни…) → Category (2.1). Full 12 in the «Каталог» mega-menu / catalog taxonomy.
6. **Products** — bestsellers / new / recommended; card → Product (3.0), «У кошик» → Cart (6.0).
   Coach sees tier pricing. Calm cards, no aggressive badges.
7. **Promotions · Brands · Blog** — calm promo (no timers, principle #4) → 8.10; brand strip → 2.4
   (trust + SEO); blog teaser → Article (8.1) / Blog (8.0) (helps the beginner + SEO).
8. **SEO text** — bottom H2 + descriptive store copy (root keywords). Popular query-links live in
   the footer (0.2).

Desktop = the same blocks; the hero may go two-column (tiles + visual), categories/products run as
wider rows. First-screen and priority are reasoned from mobile.

---

## State matrix

| Block | Guest | Buyer | Coach |
|---|---|---|---|
| Hero goals | same | same | same |
| Personal strip | hidden (show «Увійти») | **Repeat order** (7.3) + staples* | **New session** (5.5) + Coach home (5.2) |
| Product prices | retail | retail + loyalty | **wholesale by tier** (Free/Pro chip) |
| «Для тренерів» | banner → 5.0 | banner → 5.0 / become a coach | replaced by coach quick actions |
| One next step | pick a goal / sign in | repeat order | new order session |

---

## SEO
- **Single H1** in the hero (root keyword «спортивне харчування»).
- Goal & category tiles are crawlable `<a>` with descriptive anchors (internal linking).
- Bottom SEO text (H2 + copy); popular query-links are in the footer (0.2).
- schema.org **Organization** + **WebSite** (sitelinks searchbox). No breadcrumbs on the root.
- Banner images have `alt`; the LCP banner must not block render (performance).

## Accessibility
- Logical heading order H1 → H2; every section has a heading.
- Tiles are tap targets ≥ 44px with a visible focus ring.
- Product carousels keyboard-operable; prev/next buttons have `aria-label`.
- Text-on-banner contrast ≥ 4.5:1 (verify at the colour stage).

---

## Locked decisions (2026-06-30)
- First screen = **goal selector** (H1 + 6 tiles); secondary «Відкрити каталог».
- **Personal strip by state** right under the hero (guest hidden · buyer repeat-order · coach new session).
- **Trust band high** (principle #1); full 4-card strip in the footer.
- **Visible «Для тренерів» block** on Home (principle #3) → landing 5.0.
- Then: popular categories → products (bestsellers) → promo/brands/blog → SEO text.
- **Calm, no countdown timers** (principle #4). B/W mockups; colour at concept stage.
- Block order reasoned from mobile (360px); desktop = same blocks, wider rows.

## Open [?]
- Curation rules for product rows (bestsellers / new / recommended) — need sales data.
- Quiz (4.x) is post-launch (goal tiles for now); «Мої стейпли» post-launch.
- Whether to show "recently viewed" to guests.
