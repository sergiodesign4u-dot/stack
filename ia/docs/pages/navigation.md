# Page-level IA — Navigation (global)

- **Node:** 0.1 (Sitemap cluster 0 — Home & navigation)
- **Type:** Global component / state (inherited on every page)
- **Canonical visual:** `ia/navigation.html`. This markdown is the source of truth for the
  spec; the HTML is the rendered, reviewable view.
- **Scope:** Navigation = the **header** (desktop **meta bar + main bar**, mobile top bar) **plus the
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

## A. Header — meta bar + main bar (desktop) / top bar (mobile)

Two desktop rows: a **meta bar** (utility) then the **main bar**. Mockups in
`navigation.html` are intentionally **black-and-white** (wireframe level) — colour is added
at the concept stage, not carried into wireframes.

### Meta bar (desktop, top row)

| Element | Behavior | Goes to |
|---------|----------|---------|
| **Для тренерів** (emphasized) | Coach front door, accented (like Belok's «Акції») | 5.0 |
| Info links | Акції · Бренди · Доставка · Повернення · Про нас | 8.x |
| **Location** → city dialog | City chip opens a large **«Оберіть місто» dialog** (not a narrow dropdown): search + popular-city badges + full A–Z. Default by geo. Feeds delivery/availability + SEO city pages | 2.1a |
| **Language** dropdown | Укр / Рус (hreflang, locale URLs) | — |

#### City selector & canonical city list (LOCKED 2026-06-30)
The location chip opens a **large modal dialog** (the list is long), containing — **simplified
2026-06-30**:
- **Search** field (type-ahead).
- **Popular cities** — a **single** badge set (no intermediate "Tier-2"): Київ · Харків · Дніпро · Одеса · Львів · Запоріжжя · Кривий Ріг · Миколаїв …
- **Full A–Z list** of all served cities (analyzed shortlist below; search resolves any Nova Poshta city beyond it).

**Canonical city list (single source for the whole site):** all Ukraine-controlled **oblast
centers** (24 oblasts − Donetsk & Luhansk + Kyiv = **23**) **plus large cities & delivery hubs with
sportpit demand** (Кривий Ріг, Кам'янське, Кременчук, Нікополь, …). **Excluded:** Crimea
(Сімферополь / Севастополь) and temporarily occupied territories. Nova Poshta covers the long tail
via search. The full A–Z list shown in the mock is a **preliminary analyzed set**; the final
membership is reconciled against real delivery/demand data **[?]**.

**Interactive curation:** the **popular** set is **data-driven** — auto-ranked by traffic/orders
share with a **manual override** — so it stays current and users find their city fast. The default
city is detected by geolocation and is user-changeable.

This one list also feeds the **footer SEO city block** (node 0.2). Which cities become SEO
landing pages (2.1a) is prioritized by traffic.

### Main bar (desktop)

| # | Element | Behavior | Goes to |
|---|---------|----------|---------|
| 1 | Logo (Stack) | Always visible | 0.0 |
| 2 | **Каталог** (primary button) | Prominent, icon; opens the mega-menu | 2.0 / 2.1 |
| 3 | **✦ Квіз** (secondary; replaced «Цілі» 2026-07-01) | Opens the **Quiz (4.0)** — a few-question goal-set picker (the best beginner entry; MVP routes to goal tiles). The «Цілі» button is dropped: goals are already well surfaced in the catalog (the **«За ціллю» column** of the Каталог mega-menu, Catalog-hub 2.0 goal tiles, Category 2.1 goal chips, Goal collections 2.2), so the secondary slot goes to the otherwise-lost quiz. | 4.0 / 2.2 |
| 4 | **Search** + «Знайти» button | Field with an explicit button; `<form role="search">` → /search?q= | 2.5 |
| 5 | **Увійти / Кабінет** | Icon + caption: «Увійти» (guest) → **dialog 1.0** (no dropdown); «Кабінет» (logged-in) → **dropdown** | 1.0 / 7.0 |
| 6 | **Обране** + count | Guest → sign-in dialog; logged-in → list | 7.6 |
| 7 | **Бонуси** | Guest: «бонуси» + big «Отримати»; logged-in: bonus balance | 7.4 `[?]` |
| 8 | **Кошик** (informative) | Empty: icon + «Кошик»; active: count + total sum | 6.0 |
| 9 | **Tier badge** (coach) | Calm Free/Pro chip in the account zone | 5.1 / 7.7 |

On **mobile** the top bar carries only Logo · Search · Favorites · Cart; the **meta bar
(Для тренерів, info links), language, location, and Бонуси move to the Account screen**.
Primary nav = the bottom tab bar (section B).

### Sticky header variant (simplified, no meta bar) — decided 2026-06-30
On scroll the **meta bar hides** and the **main bar sticks to the top in a compact form**
(Logo · Каталог · Квіз · Search · account · favorites · **bonuses** · cart) — **no location / language / info
links** (those live in the meta bar, visible only at the top of the page). Lower height = more
content room. On the **product page** the **product section-nav tabs stick directly under this
sticky header and become part of it**, gaining a compact **price (discount/none) + «Купити» + ♡**
on the right (see `product.md`).

### Catalog mega-menu (desktop)

Opening «Каталог» reveals a mega-menu (structure like Belok):
- **Left column** — the **12 top categories** (Протеїн · Гейнери · Креатин · Амінокислоти ·
  Передтренувальні та енергія · Жироспалювачі · Ізотоніки та витривалість · Батончики, снеки
  та харчування · Вітаміни та мінерали · Здоров'я · Аксесуари · Бренди), each with a flyout ›.
- **Middle** — the hovered category's **subcategories + inner** (e.g. Протеїн → за типом /
  за формою / за ціллю; inner facets — brand, flavour, serving size, price — on the listing).
- **Right column** — **«За ціллю»** (the 6 goals) + an "all products" link. Goals are
  Stack's **concern lens** (analogue of "browse by symptom" on Liki24), first-class inside
  the catalog. On **mobile** the Catalog tab opens a full-screen drilldown with **«За ціллю» as
  its top block**, so goals never disappear on mobile. «Каталог» stays the entry to the full
  catalog. See the catalog taxonomy (`ia/catalog.html`) for the 12 categories + 6 goals.

### Header «Квіз» button replaces the «Цілі» mega-menu (decided 2026-07-01)
Because goals are **already well surfaced inside the catalog** (the «За ціллю» column above,
Catalog-hub 2.0 goal tiles, Category 2.1 goal chips, Goal collections 2.2), the separate «Цілі»
secondary header button was **redundant**. The main-bar secondary slot is now a **«✦ Квіз»
button** → opens the **Quiz (4.0)** (the otherwise-lost beginner entry; MVP routes to goal
tiles). The goal→category concern-lens mapping (previously rendered as the «Цілі» mega-menu)
still lives in the catalog mega-menu's «За ціллю» column and the catalog taxonomy:
- **Набір маси** → Протеїн · Гейнери · Креатин · Амінокислоти (BCAA/EAA) · Передтренувальні
- **Схуднення** → Жироспалювачі · L-карнітин · Протеїн (ізолят) · Замінники їжі · Клітковина
- **Відновлення** → BCAA/EAA · Глютамін · Казеїн · Омега-3 · Магній/сон
- **Енергія / тонус** → Передтренувальні · Кофеїн/гуарана · Вітаміни групи B · Ізотоніки
- **Імунітет / здоров'я** → Вітаміни та мінерали · Вітамін D3 · Цинк/вітамін C · Омега-3 · Адаптогени
- **Витривалість / кардіо** → Ізотоніки та електроліти · Бета-аланін · L-карнітин · Гелі та батончики · Креатин

Goal column → Goal collection (2.2); inner items → category/subcategory (2.1) with the goal
filter applied. Full mapping lives in the catalog taxonomy.

### Account — guest dialog vs logged-in dropdown

- **Guest:** 👤 «Увійти» opens the **sign-in/register dialog directly** (node 1.0) — **no
  dropdown**. **Phone-OTP-first** (single phone field + «Отримати код» + consent; Google/Apple/Email
  buttons) — passwordless, no "forgot password". Full spec: `auth.md`.
- **Buyer (logged-in):** 👤 «Кабінет» opens a **dropdown**: Кабінет → 7.0, Замовлення → 7.2,
  Адреси → 7.5, **Стати тренером → 7.7**, Вихід. **No «Обране»/«Бонуси»** in the dropdown —
  they are their own header elements (♡ icon + Бонуси button), no point duplicating.
- **Coach:** tier chip in the dropdown header; adds Кабінет тренера → 5.2, Клієнти → 5.3,
  Нова сесія → 5.5; «Стати тренером» disappears (role already active).

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
- **Catalog mega-menu:** «Каталог» (primary button) opens the mega-menu — categories →
  subcategories → inner + a **«За ціллю» column** + "all products". The secondary main-bar
  button is **«✦ Квіз»** (4.0), not «Цілі» (goals live in the «За ціллю» column + catalog
  pages). Satisfies Baymard's "categories top-level".

### Header structure — LOCKED 2026-06-30

- **Meta bar** (desktop top row): left — «Для тренерів» (emphasized) + Акції · Бренди ·
  Доставка · Повернення · Про нас; right — location dropdown + language dropdown (Укр/Рус).
- **Main bar:** Logo · Каталог (primary) · Цілі (secondary dropdown) · Search + «Знайти» ·
  Увійти/Кабінет (icon + caption) · Обране · Бонуси · Кошик.
- **Informative cart:** empty = icon + «Кошик»; active = count + total sum.
- **Bonuses element:** guest = «бонуси» + big «Отримати» (→ register); logged-in = bonus
  balance. Bonus mechanics (points vs %) `[?]`; activates loyalty (Decision 3) and touches
  the brief's "loyalty points out of scope" — keep as a hypothesis.
- **Account:** guest 👤 «Увійти» → **dialog** (node 1.0), no dropdown; logged-in 👤 «Кабінет»
  → **dropdown** that **excludes Обране & Бонуси** (they're their own header elements).
- **«Для тренерів» placement:** emphasized link in the meta bar (coach front door is also on
  the home teaser + account). Primary audience stays reachable without crowding the main bar.
- **Mockups are black-and-white** (wireframe level); colour is added at the concept stage.
- On mobile, the meta bar, language, location, and Бонуси move to the Account screen.

### Goals & catalog — LOCKED 2026-06-30

- **Goals are integrated into the Catalog** (concern lens, Liki24-style): «За ціллю» column
  in the desktop mega-menu **and the top block of the mobile Catalog drilldown** — goals
  never disappear on mobile. They also stay on the Головна hero and the «Цілі» dropdown.
- **Symptom/concern (node 2.3) = goals** — no separate symptom tree; health concerns are
  «Здоров'я» subcategories + the Імунітет goal.
- Catalog = **12 top categories** (rebalanced from 14) + **6 goals** — see `ia/catalog.html`.

## State matrix (auth / role)

| Zone | Guest | Buyer (logged-in) | Coach (logged-in) |
|------|-------|-------------------|-------------------|
| Account | 👤 «Увійти» → **dialog 1.0** (no dropdown) | 👤 «Кабінет» → **dropdown**: Замовлення, Адреси, **Стати тренером** → 7.7, Вихід (no Обране/Бонуси — header elements) | Dropdown adds **«Кабінет тренера»** → 5.2, Клієнти, Нова сесія + tier chip |
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

- **Bonus mechanics:** points-wallet vs %-discount, earn/spend rules, expiry — `[?]`.
  Activates loyalty (Decision 3) and touches the brief's "loyalty points out of scope";
  the header «Бонуси» element shows a balance but the model is not committed.
- **Free/Pro coach tier** itself is still a business-model hypothesis; the tier badge
  applies if/when it ships.
- ~~City list for the location dropdown / SEO city pages~~ — **RESOLVED 2026-06-30**: canonical
  list = 23 controlled oblast centers + large non-center cities (Crimea/occupied excluded);
  location is a dialog with interactive popular-city tiers. Which cities get SEO landing pages
  first is a traffic-priority call (data-driven), not an open structural question.

All structural navigation decisions (tabs, header rows, mega-menu, dropdowns, favorites,
search, language/location, **city selector**) were locked 2026-06-29 / 06-30 — see Locked decisions.

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
