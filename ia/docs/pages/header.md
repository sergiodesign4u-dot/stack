# Page-level IA — Header (global)

- **Node:** 0.1 (Sitemap cluster 0 — Home & navigation)
- **Type:** Global component / state (inherited on every page)
- **Canonical visual:** `ia/header.html`. This markdown is the source of truth for the
  spec; the HTML is the rendered, reviewable view.
- **Stance:** mobile-first, fully responsive. Reason the bar from mobile up.

## Purpose

The header is the persistent navigation shell on every page. It must hold **two front
doors that never block each other** — the beginner's goal-first entry and the coach's
"For Coaches" entry — plus the everyday buyer utilities (search, favorites, cart,
account). It adapts to auth state and role, and is the main internal-linking surface for
SEO.

## Jobs served

- All jobs (it is global). Direct hooks: Job 1 (coach — reach For-Coaches / coach home),
  Job 2 (beginner — goal selector / catalog), Job 3 (search known product), Job 4
  (reorder — reach account/orders), favorites (MVP convenience).

## Navigation model it implements

Five global entries (from the global IA), expressed in the header:
1. **Home / goal selector** — logo + "Цілі" (beginner front door)
2. **For Coaches** — "Для тренерів" → 5.0 (coach front door)
3. **Search** — buyer utility for known products → 2.5
4. **Cart** → 6.0 (dialog)
5. **Account** → 1.0 (guest) / 7.0 (logged-in)

Plus **Favorites** (wishlist icon → 7.6), added in this layer as an MVP convenience.

## Anatomy (elements)

| # | Element | Behavior | Goes to |
|---|---------|----------|---------|
| 1 | Logo (Stack) | Always visible | 0.0 Home |
| 2 | Primary nav — **Цілі** | Mega-menu: goals + top categories (desktop); inside drawer (mobile) | 2.2 / 2.1 |
| 3 | Primary nav — **Каталог** | All products | 2.0 |
| 4 | Primary nav — **Для тренерів** | Coach front door, always visible regardless of role | 5.0 |
| 5 | **Search** | Inline field (desktop) / icon → expanding field (mobile) | 2.5 |
| 6 | **Favorites** icon + count | Wishlist | 7.6 |
| 7 | **Cart** icon + count | Opens cart dialog | 6.0 |
| 8 | **Account** zone | State-dependent (see matrix) | 1.0 / 7.0 |
| 9 | **Role / tier badge** | Coach only — Free / Pro chip | 7.7 / 5.1 |
| 10 | **Hamburger** (mobile) | Opens nav drawer (items 2–4 + account + info) | — |

## State matrix (the core of header IA)

### By auth state / role

| Zone | Guest | Buyer (logged-in) | Coach (logged-in) |
|------|-------|-------------------|-------------------|
| Account zone | **«Увійти»** → 1.0 dialog (+ «Реєстрація») | Avatar/menu → 7.0 (Замовлення, Лояльність, Обране, Адреси, **Стати тренером** → 7.7, Вихід) | Avatar/menu adds **«Кабінет тренера»** → 5.2 and **role/tier badge** (Free/Pro) |
| Favorites | Icon visible; on add → prompt login then merge `[?]` | Saved list, count badge | Saved list (coach's own), count badge |
| Cart | Visible, count badge | Same | Same; cart groups per client (6.0) |
| Primary CTA (one next step) | Discover (Цілі) + Увійти | Cart / repeat order | **Нова сесія замовлення** → 5.5 (entry from account menu) |
| "Для тренерів" | Visible (front door) | Visible | Visible (leads to landing; coach already activated) |

### By breakpoint

- **Mobile (<860px):** compact bar = Logo · Search icon · Favorites · Cart · Hamburger.
  Primary nav (Цілі / Каталог / Для тренерів), account/auth, and info links live inside
  the **drawer**. Bar is fixed; condenses on scroll.
- **Desktop (≥860px):** full bar = Logo · Цілі · Каталог · Для тренерів · (spacer) ·
  Search field · Favorites · Cart · Account. Mega-menu on "Цілі".

### Transient states

- `search-open` (mobile field expanded), `mega-open` (Цілі mega-menu), `scrolled`
  (condensed/elevated), `cart-badge` / `fav-badge` empty vs count, `loading` (skeleton on
  first paint).

## Transitions (flow arrows)

Logo → 0.0 · Цілі → 2.2 / 2.1 · Каталог → 2.0 · Для тренерів → 5.0 · Search → 2.5 ·
Favorites → 7.6 · Cart → 6.0 · Увійти → 1.0 · Account → 7.0 · Стати тренером → 7.7 → 5.1 ·
Кабінет тренера → 5.2 · Нова сесія → 5.5.

## SEO & markup (global component)

- Header carries **no H1** (H1 belongs to the page body).
- Logo is an `<a>` to `/` wrapping the site name.
- Primary nav in `<nav aria-label="Головна навігація">`; consider schema.org
  `SiteNavigationElement`. Mega-menu links use keyword-bearing anchors (Протеїн, Креатин,
  Вітаміни…) — this is the main internal-linking surface and must render crawlable `<a>`,
  not JS-only menus.
- Search is a real `<form role="search">` posting to the results URL (`/search?q=`).
- Skip-to-content link for accessibility/SEO.

## Accessibility

- Hamburger: `aria-expanded`, focus trap in drawer, ESC to close, overlay click closes.
- Cart/Favorites icons: `aria-label` incl. live count.
- Mega-menu keyboard-navigable; visible focus states.
- Contrast meets the calm/clean palette already in tokens.

## Responsive notes

- Mobile bar height ~52px, fixed; content offset accordingly.
- Drawer slides from left (matches the docs-site sidebar pattern); overlay dims page.
- Consider a mobile **bottom tab bar** (Home · Search · Cart · Account) as an option to
  shorten thumb travel — `[?]` MVP or post-launch.

## Open questions [?]

- Guest favorites: local-store then merge on login, or require login to save? `[?]`
- Mobile bottom tab bar in addition to the top bar? `[?]`
- Show coach tier (Free/Pro) as a header badge, or only inside account? Leaning badge. `[?]`
- Mega-menu depth for "Цілі" (goals only vs goals + categories). `[?]`
