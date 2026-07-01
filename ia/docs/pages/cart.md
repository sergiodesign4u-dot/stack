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

## 6.0 Cart — dialog drawer

- Opens as a **right-side drawer** (header cart icon / after «У кошик») — doesn't take the user off
  the page. Items · qty steppers · remove · subtotal · CTA «Перейти до оформлення» · **empty state**
  (→ catalog / goals).
- **Buyer:** flat item list; **loyalty discount auto-applied** (Decision 3); **bonuses toggle**
  (spend available balance); delivery «за тарифом перевізника».
- **Coach:** items **grouped by client** (from session 5.5) with a **per-client subtotal**; coach-tier
  price on lines; grand total; note «✓ Тариф тренера застосовано». **Delivery is a single shipment to
  the coach** — the per-client grouping is for clarity/tagging and is **preserved in the order** so the
  coach can distribute. No personal bonuses for the coach (tier instead).

## 6.1 Checkout — one page, sectioned (not a multi-step wizard)

1. **Контакт** — phone (guest confirms by **code, passwordless** like 1.x → account auto-created);
   name; email optional (for the receipt). Logged-in → prefilled.
2. **Доставка** — methods (radio): **Нова Пошта — відділення/поштомат** (1–2 дні, від 50 ₴) · **Кур'єр
   НП — на адресу** (від 70 ₴) · **Самовивіз Одеса** (безкоштовно, лише за наявності на точці). City +
   warehouse via the **«Оберіть місто» dialog (0.1a)**; **saved addresses (7.5)** prefilled; new can be
   saved. Carrier tariff per the carrier.
3. **Оплата** — **Карта онлайн (LiqPay / Wayforpay)** · **Apple Pay / Google Pay** · **Накладений
   платіж** (COD) · **Готівка при самовивозі**. Optional order comment.
- **Sticky order summary** (right / bottom on mobile): items · сума товарів · знижка лояльності ·
  бонуси · доставка · **До сплати** · «Підтвердити замовлення» · trust micro (secure pay · 14-day
  return · original). Coach summary shows the per-client breakdown.

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
- **Bonuses/loyalty** → buyer: auto discount + bonuses toggle; coach: tier on lines, no personal bonuses.

## Locked (2026-07-01)

1. **Cart = drawer dialog** (quick view); empty state → catalog/goals.
2. **Coach = per-client grouping** (from 5.5); **single delivery** to the coach, breakdown kept in the order.
3. **Checkout on one page** (contact/delivery/payment + sticky summary), not a multi-step wizard.
4. **Delivery:** НП відділення/поштомат · courier · Odesa pickup; city via dialog 0.1a; addresses from 7.5.
5. **Payment:** LiqPay/Wayforpay (card) · Apple/Google Pay · COD · cash on pickup.
6. **Passwordless checkout:** guest confirms phone by code → account auto-created.
7. Buyer **bonuses/loyalty** here; coach **tier** on lines. Recovery: payment back-to-cart, OOS not orderable.
8. **Transactional zone noindex**; calm, no timers (principle #4).

## Open questions [?]

- **Loyalty discount / bonuses:** %, rate, whether they stack — from 7.4 [?].
- **Delivery tariff:** exact НП/courier amounts — carrier rates (integration).
- **Payment provider:** LiqPay vs Wayforpay — technical-scoping decision.
- **Min order / free-delivery threshold** — marketing/operational [?].
- **Coach:** possible future per-client split delivery (now single) [?].
