# Page-level IA — Footer (node 0.2)

**Type:** global component (appears on every page)
**Visual:** `ia/footer.html` (Ukrainian, B/W wireframe)
**This file:** source of truth (English)
**Platform:** mobile-first, fully responsive, baseline 360px
**Related:** Navigation `0.1` (`navigation.md`), Sitemap (`sitemap.md`), info pages cluster `8.x`

---

## Role

The footer does three jobs, in this order:

1. **Remove the last doubt** — a trust strip (delivery, guarantee, payment, returns) repeated on every page, per design principle #1 "trust first, then sell".
2. **Service & legal entry points** — newsletter + reviews, and the link columns (Stack / Customers / Consultation) with real contacts and chat channels.
3. **Second large internal-linking surface for SEO** — a popular-queries block that passes weight to priority listings and feeds the crawler to key pages.

Ends with a legal line, payment badges, and social icons.

---

## Structure (top → bottom)

### A. Trust strip (above the footer) — 4 cards
Icon (side) + heading + short text. Each card is a crawlable `<a>` to the matching info page.

| Card | Heading | Sub-text | → |
|---|---|---|---|
| 🚚 | Швидка доставка | Нова Пошта по Україні за 1–2 дні | Delivery 8.x |
| ✅ | Гарантія оригіналу | Сертифіковані товари, дозвільні документи | Guarantee/certs 8.x |
| 💳 | Зручна оплата | Картка, Apple / Google Pay, накладений платіж | Payment 8.x |
| 🔄 | Обмін і повернення | 14 днів на повернення товару | Returns 8.x |

Mobile: 2×2 grid, shortened labels. Trust strip is **text, not images** (screen-reader + crawler legible).

### B. Main footer — 4 columns (left → right)

**Col 1 — Розсилка (Newsletter) + Support**
- Email field + «Підписатися» button (real `<form>`).
- Gentle anti-spam line: "Ми не спамимо: лист раз на тиждень, відписатися можна будь-коли."
- **Підтримайте нас:** «Оцінити в Google» + «Залишити відгук».

**Col 2 — Stack**
- Про нас · Контакти · Політика конфіденційності · Публічний договір (договір приєднання) · Умови використання · Блог.

**Col 3 — Клієнтам (Customers)**
- Система знижок · Доставка і оплата · Питання і відповіді (FAQ) · Обмін і повернення · **Для тренерів** (duplicated coach door).

**Col 4 — Консультація (Consultation)** — all items with icons
- Big **free phone number** first (0 800 …) + "Безкоштовно по Україні".
- 🕐 Working days + hours (Пн–Нд, 9:00–21:00).
- ✉️ Email (mailto:).
- 💬 Чат на сайті.
- **Напишіть нам:** Telegram · Viber (chat links with icons).
- **Ми в соцмережах:** Facebook · Instagram · TikTok · YouTube.

Modeled on UA stores (Comfy/Rozetka): free number leads, then schedule, email, chat, messengers, socials.

### C. SEO popular-queries block
List of most-popular query-links (the "iPhone 17 / smartphones / laptops" pattern Comfy uses). Second large internal-linking surface. **Structure locked; exact list deferred to keyword research.**

Groups:
- **Категорії та типи** — Протеїн, Сироватковий протеїн, Ізолят, Гейнер, Креатин моногідрат, BCAA, Амінокислоти, Передтренувальні, Жироспалювачі, L-карнітин, Вітамін D3, Омега-3, Колаген.
- **За ціллю** — Для набору маси / схуднення / відновлення / енергії / імунітету / витривалості (the 6 locked goals).
- **Бренди** — Optimum Nutrition, BioTech, Scitec, OstroVit, Kevin Levrone, "Усі бренди →".
- **Міста (SEO)** — Протеїн Київ, Спортивне харчування Одеса, Спортпіт Львів, Протеїн Харків, Дніпро. Same SEO city pages as the location dropdown in Navigation (2.1a).

All items are real crawlable `<a>` with descriptive anchors. Link **only to what users actually want** — avoid diluting weight with hundreds of footer links (SEO anti-pattern).

### D. Bottom bar
© 2026 Stack. Усі права захищені. · payment badges (Visa · Mastercard · Apple/Google Pay — reinforce "convenient payment") · socials · policy/contract links (dup of Stack column, required for UA e-commerce).

---

## Mobile (360px)
- Trust strip → 2×2.
- Newsletter + Consultation → **expanded** (priority: email capture + contact).
- Stack / Customers / popular-queries → **accordions**, collapsed by default. Collapsed accordions stay in the DOM (crawlable links) without bloating the screen.
- Bottom bar → copyright + payment badges stacked.

---

## SEO
- `<footer>`; link groups in `<nav aria-label>`.
- Second large internal-linking surface: top categories + popular queries with descriptive anchors.
- Link only valuable destinations (no weight dilution).
- City links = same SEO city pages as the location dropdown (2.1a, "Протеїн Одеса").
- Newsletter = real `<form>`; social buttons external `rel="nofollow"`.
- Phone `tel:`, email `mailto:`; consider schema.org Organization / ContactPoint.

## Accessibility
- Link contrast ≥ 4.5:1; social icons have `aria-label`.
- Email field has associated `<label>`; success/error announced via `aria-live`.
- Mobile accordions = `<button aria-expanded>`, keyboard-operable.
- Tap targets ≥ 44px; messenger/social icons have text alternatives.
- Trust strip is text, not images.

---

## Locked decisions (2026-06-30)
- Trust strip = 4 cards (icon + heading + short text): delivery · guarantee · payment · returns.
- Newsletter column with anti-spam reassurance + "support us" (Google rating + review).
- Stack / Customers / Consultation columns as specified above; «Для тренерів» duplicated in Customers as a second coach door.
- Consultation: big free number first + schedule + email + on-site chat + Telegram/Viber + socials (FB · IG · TikTok · YouTube).
- SEO popular-queries block: **structure locked** (categories/types · goals · brands · cities); exact list via keyword research.
- Bottom bar: copyright + Visa/Mastercard/Apple-Google Pay badges + socials + policy/contract.
- B/W wireframe mockups (colour at concept stage). Mobile: trust 2×2, newsletter+consultation expanded, link columns + SEO block as accordions.

## Open [?]
- Exact popular-queries list & order (keyword research: volume, seasonality) — at SEO-copy stage.
- Final city list (shared with Navigation location dropdown / SEO city pages).
- Real support number, hours, and live channels (operational).
