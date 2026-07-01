# Page-level IA — Cart & Checkout (node 6.x)

- **Node:** 6.x — Cart & checkout. One artifact covering **6.0 Cart** (dialog), **6.1 Checkout**
  (flow), **6.2 Order placed** (state).
- **Type:** dialog (6.0) + flow (6.1) + state (6.2).
- **Canonical visual:** `ia/cart.html`. This markdown is the source of truth.
- **Convergence point:** both the **product card** (buyer, 3.0) and the **coach multi-client session**
  (5.5) funnel here. Buyer bonuses/loyalty and the coach tier are applied here.
- **Flow source:** `research/docs/flows.md` — checkout tail of the Main (coach) and Job 2/4 flows
  (address selection, payment back-to-cart, empty state, OOS at checkout).
- **SEO:** transactional/private → **noindex, no schema** (like account & auth).

## 6.0 Cart — dialog drawer (pure quick view)

- Opens as a **right-side drawer** (header cart icon / after «У кошик») — doesn't take the user off
  the page. **Quick view only:** items · qty steppers · remove · **just the total («Разом»)** · CTA
  «Перейти до оформлення» · **empty state** (→ catalog / goals).
- **No breakdown in the drawer.** Loyalty discount, **bonuses spend**, and delivery are **NOT shown
  here** — they belong to checkout (6.1), which has room for states and input fields. The drawer shows
  only the line items and one total sum, with a hint «Знижка й бонуси — на оформленні».
- **Buyer:** flat item list + total. **Coach:** items **grouped by client** (from session 5.5) with a
  **per-client subtotal**; coach-tier price on lines; note «✓ Тариф тренера застосовано» + grand total.
  **Delivery is a single shipment to the coach** — the per-client grouping is for clarity/tagging and is
  **preserved in the order** so the coach can distribute. No personal bonuses for the coach (tier instead).

## 6.1 Checkout — one page, sectioned (not a multi-step wizard)

- **Simplified header** — the checkout page uses a **stripped header**: logo + a support block
  (phone / hours) only. **No main nav, mega-menu, search or cart icon** — fewer exits from the funnel
  (one clear action, principle #2). Standard competitor pattern.
- **Left column order (locked):** **1 Контакт** → **Ваше замовлення** → **2 Доставка** → **3 Оплата**,
  then — after all sections, full width — the **upsell «Не забудьте додати»**, then the **footer**.
- **Ваше замовлення** block = line items with **♡ В обране** and **🗑 Видалити** buttons per item
  (moved out of the right rail). **Upsell «Не забудьте додати»** = a horizontal strip of snacks/small
  add-ons (батончик, ізотонік, паста, BCAA-shot, шейкер) each with «+ Додати», for extra sales.
- **Simplified footer** (matches the simplified header): © · legal links (offer / privacy / delivery) ·
  support · payment badges.
- **Right column** is **money only** and stays compact so **«Підтвердити замовлення» is always in view**:
  a **compact bonus block** (balance + spend toggle; the full input/states live in the states gallery)
  → totals breakdown → accrual line → confirm button → trust micro. Sticky.

1. **Контакт** — **guests see a sign-in prompt «Увійдіть для оформлення замовлення»**: phone field +
   «Отримати код» (passwordless, like 1.x → account auto-created), with secondary Google/Apple/E-mail
   (auth 1.x). Logged-in → the section is collapsed with name · phone · email prefilled (editable). No
   password anywhere.
2. **Доставка** — methods (radio): **Нова Пошта — відділення/поштомат** (1–2 дні, від 50 ₴) · **Кур'єр
   НП — на адресу** (від 70 ₴) · **Самовивіз Одеса** (безкоштовно, лише за наявності на точці). City +
   warehouse via the **«Оберіть місто» dialog (0.1a)**; **saved addresses (7.5)** prefilled; new can be
   saved. Carrier tariff per the carrier.
3. **Оплата** — **Карта онлайн (LiqPay / Wayforpay)** · **Apple Pay / Google Pay** · **Накладений
   платіж** (COD) · **Готівка при самовивозі**. Optional order comment.
   - **No separate internal payment page.** The method is chosen *here*; on «Підтвердити» card
     payments **redirect to the provider's hosted page** (LiqPay/Wayforpay — PCI-safe, off our
     servers), then return to **6.2 Order placed**. COD / cash-on-pickup place the order directly (no
     payment step). A dedicated `/payment` screen is **not** part of the IA; if ever needed it'd be a
     thin redirect/return handler, not a designed page. [decision]
- **Sticky order summary** (right / bottom on mobile): items · **bonus module** (see below) · сума
  товарів · знижка лояльності · списано бонусів · доставка · **До сплати** · **accrual line** «★
  Нарахуємо +N ₴ (~1% [?])» right by the button · «Підтвердити замовлення» · trust micro (secure pay ·
  14-day return · original). Coach summary shows the per-client breakdown.
- **Bonus module (right column, 4 states)** — the whole loyalty-spend UX lives here, not in the cart:
  1. **Немає бонусів** — balance 0 ₴; only «нарахуємо ~1%» note + link to the programme (8.7).
  2. **Є бонуси (collapsed)** — balance shown + «Списати бонуси» toggle (off).
  3. **Списання увімкнено** — toggle on → «− N ₴ до оплати», reflected in the «Списано бонусів» row.
  4. **Ввід суми** — amount field for **partial** spend (e.g. 150 з 240), max = balance / up-to-100% [?].
- **Accrual preview** — an amber line by the confirm button: «★ Нарахуємо +N ₴ бонусів за це замовлення
  (~1% [?])». Actual credit happens after payment and shows in the account (7.4). Rate/spend cap = [?].

## 6.2 Order placed — state

- Confirmation (✓ «Замовлення #N оформлено» + SMS sent) · order summary (items · discount+bonuses ·
  delivery · paid) · **next steps**: «Відстежити» · **«Мої замовлення» → 7.2** (one-tap repeat, Job 4)
  · «Продовжити покупки». Bonuses accrued show in the account. Coach sees the per-client breakdown.

## States

- **Empty cart** → empty-state → catalog / goals.
- **Guest at checkout** → phone + code (passwordless) → account auto-created → checkout.
- **No saved address** → capture in the delivery section; offer to save (→ 7.5).
- **Item went OOS in cart** → flag the line, remove/replace; can't check out unavailable stock.
- **Payment declined** → **back to cart/payment (retry)**, not a terminal; order not lost.
- **Pickup, not on-site** → method unavailable for those items → prompt a delivery method.
- **Coach grouping** → cart & summary by client; single delivery to the coach; breakdown kept in the order.
- **Cart drawer** → quick view: line items + one total only; no discount/bonus/delivery rows.
- **Bonuses/loyalty (checkout only)** → buyer: auto discount + bonus module (4 states: none / has / spend
  on / amount input) + accrual line; coach: tier on lines, no personal bonuses.
- **Confirm → payment interstitial** → full-page «Опрацьовуємо оплату…» redirect/return handler before
  6.2 (card via provider-hosted page). Wireframe: `checkout-loading.html`.
- **6.2 has two ends** → guest = confirmation + «створіть акаунт, щоб зберегти замовлення» offer;
  logged-in = confirmation with the order already saved to 7.2. Wireframes: `order-placed.html` /
  `order-placed-account-end.html`.

## Locked (2026-07-01)

1. **Cart = drawer dialog, pure quick view** — line items + **total only**; no discount/bonus/delivery
   breakdown (those move to checkout); empty state → catalog/goals.
2. **Coach = per-client grouping** (from 5.5); **single delivery** to the coach, breakdown kept in the order.
3. **Checkout on one page** (contact/delivery/payment + sticky summary), not a multi-step wizard.
   **Simplified header** (logo + support only). **Items live in a left «Ваше замовлення» block** (each
   with ♡ В обране / 🗑 Видалити) + an **upsell strip**; **right column is money-only & compact** so the
   confirm button stays visible. **No standalone payment page** — card → provider-hosted redirect → 6.2.
4. **Delivery:** НП відділення/поштомат · courier · Odesa pickup; city via dialog 0.1a; addresses from 7.5.
5. **Payment:** LiqPay/Wayforpay (card) · Apple/Google Pay · COD · cash on pickup.
6. **Passwordless checkout:** guest confirms phone by code → account auto-created.
7. Buyer **bonuses live only at checkout** — a right-column **bonus module with 4 states** (none / has /
   spend-on / amount-input) + an **accrual line** «+N ₴» by the confirm button; loyalty discount auto;
   coach **tier** on lines (no personal bonuses). Recovery: payment back-to-cart, OOS not orderable.
8. **Transactional zone noindex**; calm, no timers (principle #4).

## Open questions [?]

- **Loyalty discount / bonuses:** %, rate, whether they stack — from 7.4 [?].
- **Delivery tariff:** exact НП/courier amounts — carrier rates (integration).
- **Payment provider:** LiqPay vs Wayforpay — technical-scoping decision.
- **Min order / free-delivery threshold** — marketing/operational [?].
- **Coach:** possible future per-client split delivery (now single) [?].
