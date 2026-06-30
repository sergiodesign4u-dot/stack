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
| 🚚 | Швидка доставка | Самовивіз із магазину Stack, доставка за адресою або у відділення Нової Пошти. | Delivery 8.x |
| ✅ | Гарантія якості | Сертифікована продукція з офіційною гарантією від виробника. | Guarantee/certs 8.x |
| 💳 | Зручна оплата | Оплатити покупку можливо готівкою, картою чи безготівковим розрахунком. | Payment 8.x |
| 🔄 | Обмін і повернення | Повернення товару протягом 14 днів після покупки, відповідно до чинного закону. | Returns 8.x |

Each card carries a **full sentence** (not a 2-word tag): clearer for the buyer and gives the
crawler descriptive, keyword-relevant body text. Trust strip is **text, not images**
(screen-reader + crawler legible). Mobile: 2×2 grid, shortened headings (full text in the
linked info page).

### B. Main footer — 4 columns (left → right)

**Col 1 — Розсилка (Newsletter) + Support**
- **Hook (benefit-led):** «Підписуйтесь на знижки!» — leads with the user benefit, not the
  channel. Sub: "Промокоди, акції та новинки — першими на вашу пошту. Знижка на перше
  замовлення після підписки."
- Email field + «Підписатися» button (real `<form>`).
- Gentle anti-spam line: "Тільки користь: листи зрідка, без спаму, відписатися можна будь-коли."
- **Підтримайте нас:** «Оцінити в Google» + «Залишити відгук».
- Note: the welcome-discount value (e.g. −5% / fixed ₴) is **[?]** — confirm with promo/unit
  economics before committing the exact number; copy stays qualitative until then.

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
- **Міста (SEO)** — Протеїн Київ, Спортивне харчування Одеса, Спортпіт Львів, Протеїн Харків, Дніпро. Drawn from the **same canonical city list** as the Navigation city-selector dialog (2.1a): 23 controlled oblast centers + large non-center cities (Crimea/occupied excluded). Which cities become SEO landing pages first is a traffic-priority call.

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
- Trust strip = 4 cards (icon + heading + **full descriptive sentence**, SEO-friendly):
  delivery (pickup / address / Nova Poshta branch) · guarantee (certified, manufacturer
  warranty) · payment (cash / card / bank transfer) · returns (14 days, per law).
- Newsletter column = **benefit-led hook** «Підписуйтесь на знижки!» (promo/discount value
  [?]) + anti-spam reassurance + "support us" (Google rating + review).
- Stack / Customers / Consultation columns as specified above; «Для тренерів» duplicated in Customers as a second coach door.
- Consultation: big free number first + schedule + email + on-site chat + Telegram/Viber + socials (FB · IG · TikTok · YouTube).
- SEO popular-queries block: **structure locked** (categories/types · goals · brands · cities); exact list via keyword research.
- Bottom bar: copyright + Visa/Mastercard/Apple-Google Pay badges + socials + policy/contract.
- B/W wireframe mockups (colour at concept stage). Mobile: trust 2×2, newsletter+consultation expanded, link columns + SEO block as accordions.

## Open [?]
- Exact popular-queries list & order (keyword research: volume, seasonality) — at SEO-copy stage.
- Real support number, hours, and live channels (operational).
- City list — **RESOLVED 2026-06-30** (canonical list = Navigation 2.1a: 23 oblast centers +
  large cities; Crimea/occupied excluded). Only which cities get SEO landing pages first is a
  traffic-priority call.
- Newsletter welcome-discount value (−5% / fixed ₴) — promo + unit economics.
