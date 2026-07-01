# Page-level IA — Buyer Account (node 7.x)

- **Node:** 7.x — Account & loyalty. This spec is the **buyer account shell** and covers the
  sub-nodes on it: **7.0 Overview**, **7.1 Profile**, **7.2 Orders**, **7.3 Order detail + repeat**,
  **7.4 Loyalty & bonuses**, **7.5 Addresses**, **7.6 Wishlist**, and the entry to **7.7 Become a
  coach** (which hands off to the coach cluster 5.x). One artifact, like `product.md` covers 3.0+3.1/3.2/3.3.
- **Type:** page-shell (private, behind auth).
- **Canonical visual:** `ia/account.html`. This markdown is the source of truth.
- **Role:** the **regular buyer**. Coach is a role activated on top of the same account (7.7 → 5.1);
  coach-only workspace (5.x) is a separate cluster, not yet at page-level.
- **Jobs served:** **Job 4** (one-tap repeat from order history) and **Job 6** (loyalty review);
  supports Job 3 (leave a review on a delivered item → dialog 3.1a).
- **Flow source:** `research/docs/flows.md` — Job 4 (reorder) and Job 6 (loyalty).

## Shell model

- **Desktop:** two-column shell — **left section nav** (profile header + section links with counters
  + «Вийти») **+ content panel** for the active section. The section set is **the same as the header
  «Кабінет» dropdown** (Navigation 0.1): Огляд 7.0 · Замовлення 7.2 · Лояльність 7.4 · Обране 7.6 ·
  Адреси 7.5 · Профіль 7.1 · Стати тренером 7.7 · Вийти.
- **Mobile:** the left nav collapses into a **menu-hub** screen (profile + bonuses/discount on top,
  then the section list with counters); tapping a section opens it full-screen with a «‹ back». This
  is **tab 5 «Акаунт»** of the mobile bottom nav.

## Sections

1. **Огляд / dashboard (7.0)** — greeting + **snapshot cards**: bonus balance · **last order with a
   «↻ Повторити» button** · wishlist count · saved-addresses count; a **loyalty progress** strip; a
   **«Стати тренером» banner**. Each card deep-links into its section. The default section.
2. **Замовлення (7.2) → Деталі + повтор (7.3)** — order list (number · date · **status pill** ·
   sum · item thumbnails · «Повторити»/«Деталі»). Detail = line items · sums · bonuses used · ТТН ·
   **«Повторити замовлення» → cart (6.0)** · documents · «Залишити відгук» (→ 3.1a). **Job 4.**
   Repeat adds available items to the cart and **honestly flags** anything out of stock (leads to an
   alternative — never a silent failure or dead end). States: Оформлено / В дорозі (ТТН) / Доставлено
   / Скасовано; many → pagination; empty → «Ще немає замовлень» + «До каталогу».
3. **Лояльність і бонуси (7.4)** — **personal cumulative loyalty** (Decision 3), separate from the
   coach's published tier: **level / discount %**, **progress to the next threshold**, and **bonus
   balance + ledger** (the header «Бонуси» element links here). **Job 6.** Guest sees «бонуси /
   Отримати» in the header → registration. All thresholds, %, accrual mechanics are **[?]**.
4. **Адреси (7.5)** — list + add/edit + one **default**. Address types mirror the delivery options
   (Nova Poshta відділення/поштомат · courier · Odesa pickup). Speeds up checkout (6.x).
5. **Профіль (7.1)** — **passwordless** (consistent with auth 1.x): name · **phone (primary,
   verified, change via OTP)** · **e-mail (optional, code)** · language · notification consents
   (SMS status + e-mail reorder reminders — Decision 4) · delete account. **No password** (the old
   sitemap «Пароль» is removed).
6. **Обране (7.6)** — grid of saved products using the **canonical product card**; ♡ active; «У кошик»
   moves to 6.0; available to **buyer and coach**; ♡ icon in the header. Empty state. «My staples» is
   post-launch.
7. **Стати тренером / Я тренер (7.7)** — **same entry point as the For-Coaches landing (5.0)** so a
   coach never hunts for «where to activate»: launches verification (social-link) → **5.1**. If the
   role is already active — shows role status + tier (**Free/Pro [?]**) + a link to Coach workspace
   (5.2). The coach cluster (5.x) is separate and not yet at page-level.

## States

- **Guest** → hitting /account opens the **auth dialog (1.0)**; after sign-in, return to the requested
  section. The private area is never rendered to a guest.
- **Buyer (default)** — full shell, no coach items in the nav.
- **Coach** — tier chip (Free/Pro) + «Кабінет тренера» (5.2) / «Клієнти» (5.3) in the nav; «Стати
  тренером» becomes «Я тренер» (status).
- **Empty:** orders / wishlist / addresses each have an empty state; bonuses = 0 shows how to earn.
- **Repeat with OOS** — cart gets the available items; missing ones are flagged + alternative.
- **Loading** — skeletons; confirmed actions → toast.

## SEO / privacy

Account is **behind auth → not a content SEO page** (like Auth 1.x). Deliberate exception to the A–E
block: **`noindex, nofollow`, no schema.** URLs are plain (`/account`, `/account/orders`,
`/account/orders/{id}`, `/account/loyalty`, `/account/addresses`, `/account/profile`,
`/account/wishlist`), not for SEO. Phone/e-mail masked in UI; «Видалити акаунт». A11y: left nav =
`nav` with `aria-current`; focus on section change; counters in `aria-label`.

## Locked (2026-07-01)

1. **One shell** (section nav + panel) desktop; **menu-hub** mobile (tab «Акаунт»). Section set =
   header «Кабінет» dropdown.
2. **Огляд = dashboard snapshot**; each card deep-links into its section.
3. **One-tap repeat** from list and detail (Job 4) → cart; OOS honestly flagged, leads to alternative.
4. **Loyalty is personal** (Decision 3), separate from the coach tier; header «Бонуси» → here.
5. **Profile is passwordless** (phone/e-mail by code); the stale «Пароль» is removed.
6. **Wishlist** uses the canonical card; buyer + coach; «My staples» post-launch.
7. **«Стати тренером»** = the same entry as landing 5.0 → verification 5.1.
8. **Private zone** — noindex, no schema (A–E exception, like 1.x).

## Open questions [?]

- **Loyalty:** levels, thresholds, discount %, counting period — real data / unit economics.
- **Bonuses:** mechanic (points vs %), rate, expiry, accrual/spend — [?].
- **Reorder reminders:** channels (SMS/e-mail) + consumption-cycle trigger — Decision 4, data [?].
- **Coach workspace (5.x)** — separate cluster, not yet page-level (7.7 → 5.1/5.2 link).
- **Order documents** (invoice / waybill) — format/availability operational [?].
