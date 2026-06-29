# Page-level IA — Navigation (global)

- **Node:** 0.1 (Sitemap cluster 0 — Home & navigation)
- **Type:** Global component / state (inherited on every page)
- **Canonical visual:** `ia/navigation.html`. This markdown is the source of truth for the
  spec; the HTML is the rendered, reviewable view.
- **Scope:** Navigation = the **header** (desktop top bar + mobile top bar) **plus the
  mobile bottom tab bar**. Both are documented here as one navigation node.
- **Stance:** mobile-first, fully responsive. **Mobile baseline = 360px** (reason layouts
  from 360px up).

## Purpose

Navigation is the persistent shell on every page. It must hold **two front doors that
never block each other** — the beginner's goal-first entry and the coach's "For Coaches"
entry — plus the everyday buyer utilities (search, favorites, cart, account). It adapts to
auth state and role, and is the main internal-linking surface for SEO.

On mobile the **primary navigation is a bottom tab bar** (thumb-reachable), with a slim top
bar kept for logo, search and cart. On desktop it is a single top header bar.

## Jobs served

- All jobs (it is global). Direct hooks: Job 1 (coach — reach For-Coaches / coach home),
  Job 2 (beginner — goal selector / catalog), Job 3 (search known product), Job 4
  (reorder — reach account/orders), favorites (MVP convenience).

## Navigation model

Five global entries (from the conceptual IA), expressed across header + tabs:
1. **Home / goal selector** — logo + "Цілі" / Home tab (beginner front door)
2. **For Coaches** — "Для тренерів" → 5.0 (coach front door)
3. **Search** — buyer utility for known products → 2.5
4. **Cart** → 6.0 (dialog)
5. **Account** → 1.0 (guest) / 7.0 (logged-in)

Plus **Favorites** (wishlist → 7.6), an MVP convenience and a mobile tab.

## A. Header — anatomy (desktop top bar / mobile top bar)

| # | Element | Behavior | Goes to |
|---|---------|----------|---------|
| 1 | Logo (Stack) | Always visible | 0.0 Home |
| 2 | **Цілі** | Desktop mega-menu = 2 columns (goals + top categories) + "all products" link; on mobile via Home tab / Каталог. «Каталог» stays the entry to the full catalog. | 2.2 / 2.1 |
| 3 | **Каталог** | All products | 2.0 |
| 4 | **Для тренерів** | Coach front door, always visible regardless of role | 5.0 |
| 5 | **Search** | Inline field (desktop) / icon → expanding field (mobile top bar) | 2.5 |
| 6 | **Favorites** icon + count | Wishlist | 7.6 |
| 7 | **Cart** icon + count | Opens cart dialog | 6.0 |
| 8 | **Account** zone | State-dependent (see matrix) | 1.0 / 7.0 |
| 9 | **Role / tier badge** | Coach only — calm Free / Pro chip in the account zone; upgrade nudge is contextual (at the client-cap), not a banner | 7.7 / 5.1 |

On mobile the top bar carries only Logo · Search · Favorites · Cart (primary destinations
move to the bottom tabs); secondary links live inside the Account screen.

## B. Mobile bottom tab bar (primary nav, mobile)

Grounded in mobile-nav UX research (sources below): **3–5 tabs, never more than 5**;
labels **and** icons; tap targets ≥44px; product **categories should be a top-level
destination on mobile** (Baymard); search stays prominent. A dedicated "More/Menu" tab is
avoided — it buries primary destinations behind overflow; secondary links live in Account.

**Tab set — 5 tabs (buyer / guest) — LOCKED 2026-06-29:**

| Tab | Icon | Destination | Note |
|-----|------|-------------|------|
| **Головна** | home | 0.0 (goal-first home) | beginner front door = goal selector; also an escape-hatch/reset |
| **Каталог** | grid | 2.0 / 2.1 | categories top-level (Baymard) |
| **Кошик** | bag | 6.0 | badge count |
| **Обране** | heart | 7.6 | badge count |
| **Акаунт** | person | 7.0 / 1.0 | hub for secondary links (orders, loyalty, addresses, For Coaches, info, blog) |

- **Search** is NOT a tab — it lives in the persistent top bar (frees a slot, stays
  prominent).
- **Coach variant — LOCKED:** **Кабінет тренера · Каталог · Кошик · Обране · Акаунт** —
  tab 1 swaps to the coach's order workspace; the rest match the buyer set.

### Locked decisions (2026-06-29)

- **Tab 1 = Головна** (not Цілі): the Stack home leads with goal tiles (so it *is* the
  goal catalog), gives a reset/escape-hatch, and sits in the thumb zone (the logo is
  top-left, hard to reach). The Home tab does not duplicate the logo in practice.
- **No dedicated "Меню" (burger) tab:** the 5th slot goes to a primary destination;
  secondary links (For Coaches, delivery, blog, loyalty) live on the Account screen.
- **Coach tab 1 = Кабінет тренера**; the rest of the set matches the buyer.
- **Guest favorites = login required:** clicking ♡ (or the Обране tab) opens the sign-in /
  register dialog. No guest/local wishlist — favorites becomes a registration driver.
- **Tier badge = calm chip in the header account zone** (status/identity); upgrade nudge is
  contextual at the client-cap moment, not a global banner. (Conditional on the Free/Pro
  tier, still a hypothesis.)
- **"Цілі" mega-menu = goals + top categories** (two columns) + an "all products" link;
  «Каталог» remains the entry to the full catalog (intentional, useful overlap; satisfies
  Baymard's "categories top-level").

## State matrix (auth / role)

| Zone | Guest | Buyer (logged-in) | Coach (logged-in) |
|------|-------|-------------------|-------------------|
| Account | **«Увійти»** → 1.0 (+ Реєстрація) | Menu → 7.0 (Замовлення, Лояльність, Обране, Адреси, **Стати тренером** → 7.7, Вихід) | Menu adds **«Кабінет тренера»** → 5.2 + role/tier badge |
| Favorites | Clicking ♡ / the Обране tab → **sign-in dialog** (login required to save; no guest wishlist → registration driver) | Saved list, count badge | Saved list, count badge |
| Cart | Visible, count badge | Same | Same; groups per client (6.0) |
| Mobile tabs | 5 (buyer set) | 5 (buyer set) | 5 (coach variant) |
| Primary CTA | Discover (Цілі) + Увійти | Cart / repeat order | **Нова сесія замовлення** → 5.5 |

## Breakpoints

- **Mobile (360px baseline, <860px):** slim top bar (Logo · Search · Favorites · Cart) +
  **bottom tab bar** (primary nav). Цілі / Каталог / For Coaches reachable via Home tab /
  Account. Bars fixed; top bar condenses on scroll.
- **Desktop (≥860px):** single full top header bar; no bottom tabs. Mega-menu on "Цілі".

## Transitions

Logo → 0.0 · Цілі → 2.2 / 2.1 · Каталог → 2.0 · Для тренерів → 5.0 · Search → 2.5 ·
Favorites → 7.6 · Cart → 6.0 · Увійти → 1.0 · Account → 7.0 · Стати тренером → 7.7 → 5.1 ·
Кабінет тренера → 5.2 · Нова сесія → 5.5.

## SEO & markup

- Carries **no H1** (H1 belongs to page body).
- Logo is an `<a>` to `/` wrapping the site name.
- Primary nav in `<nav aria-label>`; consider schema.org `SiteNavigationElement`. Mega-menu
  links use keyword anchors (Протеїн, Креатин, Вітаміни…) — main internal-linking surface,
  must be crawlable `<a>`, not JS-only.
- Search is a real `<form role="search">` posting to `/search?q=`.
- Bottom tab bar links are real `<a>` (crawlable); aria-current on the active tab.

## Accessibility

- Tap targets ≥44px (both top bar icons and bottom tabs).
- Tabs: labels + icons (icon-only hurts discoverability), `aria-current="page"` on active.
- Hamburger/drawer (if used for mega-menu on mobile): `aria-expanded`, focus trap, ESC and
  overlay click close.
- Cart/Favorites: `aria-label` incl. live count. Skip-to-content link.

## Open questions [?]

- None open for navigation. All navigation decisions were locked 2026-06-29 (see Locked
  decisions). Downstream/dependent: the Free/Pro coach tier itself is still a business-model
  hypothesis; the tier badge applies if/when it ships.

## Sources (mobile bottom-nav UX)

- Baymard — Make Product Categories the Top-Level Navigation Items on Mobile Sites:
  https://baymard.com/blog/main-navigation-product-categories
- Baymard — The State of Mobile E-Commerce Search and Category Navigation:
  https://baymard.com/blog/mobile-ecommerce-search-and-navigation
- Smashing Magazine — The Golden Rules of Mobile Navigation Design:
  https://www.smashingmagazine.com/2016/11/the-golden-rules-of-mobile-navigation-design/
- Smashing Magazine — Bottom Navigation Pattern on Mobile Web Pages:
  https://www.smashingmagazine.com/2019/08/bottom-navigation-pattern-mobile-web-pages/
- UX Planet — Bottom Tab Bar Navigation Design Best Practices:
  https://uxplanet.org/bottom-tab-bar-navigation-design-best-practices-48d46a3b0c36
