# Wireframes — Critique & fixes (`_critique.md`)

**Step 9 of the wireframe method.** Scope: **Флоу 1 (beginner path)** only — the 35+
`wireframes/*.html` for Job 2 (goal→product→checkout) + Job 3 (verify safety). Audited against
`_conventions.md`, `_screens.md`, `research/docs/flows.md` (Job 2/3) and `ia/docs/sitemap.md`.

Method: a defect table first (reviewed & prioritised), then fixes applied — dead ends & missing
states first. Coverage cross-check (`_nav.js` ↔ `_screens.md` ↔ disk) came back **clean** (0
orphans, 0 mismatches) and stays clean after the new state pages below were registered.

Audit run: 2026-07-01, five parallel read-only auditors (home+listing · goal+product ·
cart+checkout · auth+order-placed · account+coverage).

---

## Defect table → resolution

Severity: **H** breaks a flow / missing matrix-required state · **M** wrong route / spec gap ·
**L** polish. Status: ✅ fixed · ↩ intentionally kept (with reason).

| # | Sev | Screen(s) | Defect | Resolution | Status |
|---|-----|-----------|--------|------------|--------|
| H1 | H | cart ↔ checkout ↔ checkout-declined ↔ order-placed(±account-end) | **Cart desync** — 3 different baskets + same SKU at two prices (OstroVit Creatine 500 г = 549 ₴ / 420 ₴) | Locked ONE canonical basket everywhere: ON Gold Standard Whey 2270 г ×1 (1 290) · BioTechUSA Iso Whey Zero 908 г ×2 (2 100) · OstroVit Creatine 500 г ×1 (549) = **3 939 ₴**. Two money variants by auth: **guest** (+delivery 60 → 3 999) and **logged-in** (−197 silver −5% +60 → 3 802, +38 accrual). | ✅ |
| H2 | H | checkout | Missing matrix states (row 6): **logged-in contact** + **no-address** | Added `checkout-loggedin.html` (collapsed prefilled contact, saved address, bonus module + loyalty discount) and `checkout-noaddr.html` (empty-address note + required city/branch capture). Wired: guest `checkout.html` sign-in → `checkout-loggedin.html`. Registered in `_nav.js`. | ✅ |
| H3 | H | auth | Missing matrix state (row 7): **loading** (sending code) | Added `auth-loading.html` («Надсилаємо код…», static spinner, phone shown, forward → `auth-code.html`, back → `auth.html`). Registered in `_nav.js`. | ✅ |
| H4 | H | checkout-loading | Happy path not clickable — only exit was «Скасувати»→cart; no forward to order-placed | Added forward CTA «Оплату підтверджено — продовжити →» → `order-placed.html` (cancel path kept). | ✅ |
| M1 | M | auth-newuser | «Продовжити» → `home.html`, but footer promises return to cart/checkout (flows `b8` → account) | Form action + CTA → `account.html`. | ✅ |
| M2 | M | account ×4 | Private zone `noindex` missing `nofollow` (spec: noindex, nofollow) | `content="noindex, nofollow"` on account / -empty / -loading / -error. | ✅ |
| M3 | M | auth ×4 (+new loading) | Heavy decorative modal drop-shadow `0 14px 44px rgba(.28)` | Softened to `0 6px 24px rgba(.12)` — matches the low-alpha shadow the cart drawer already uses (accepted greyscale affordance for lifting a dialog off its backdrop). | ✅ |
| L1 | L | product · product-reviews | `href="#"` on «Залишити відгук» / «Поставити запитання» / review pagination (§3: no fake #) | Converted to `<button type="button">`; broadened `.pages a` → `.pages a, .pages button` in `_wf.css` so pagination keeps its box style. | ✅ |
| L2 | L | checkout-loading | CSS spin + pulse animations (motion deferred, §1) | Removed both `@keyframes`; static spinner ring + static skeleton. | ✅ |
| L5 | L | index | «Пройти Флоу 1» → `listing.html`, but the spine starts at Головна | → `home.html`. | ✅ |

### Intentionally kept (not defects, or out of Флоу-1 scope)

| Item | Reason kept |
|------|-------------|
| **Hatch gradient** on `.auth-visual` (and hero stories) | It is the project's **standard greyscale image-placeholder texture**, not decoration — used consistently for visual placeholders (the home auditor confirmed the identical pattern as accepted). Removing it would make auth inconsistent with home. |
| **M3 shadow kept (softened, not removed)** | A dialog legitimately needs to lift off the dimmed backdrop; the cart drawer's low-alpha shadow was already accepted. Softened rather than deleted. |
| **L4** home «Пройти квіз»→`goal.html`, «За ціллю»→`listing.html` | Quiz is post-launch; pointing at the built goal collection avoids a 404. Acceptable for MVP; revisit when quiz/goal-hub ship. |
| **L6** account medal emoji 🥈🥇🥉 | Consistent with the project's emoji-as-icon convention (♡ ↻ ★ ●); loyalty tier needs a glyph. Left as-is. |
| **L7** auth Google/Apple → `auth-code.html` | A proper OAuth screen is out of Флоу-1 scope; the SMS-code page is a stand-in. Noted for the auth build-out. |
| **L8** goal related-links → `goal.html` | Distinct goal collections are a Step-8 roll-out; forward-ref. |
| **L9** PDP `reviews-empty` sub-state | Optional per matrix; deferred (reviews list is populated in the built states). |
| **Forward-refs** brands / catalog-page / coach / content / quiz / search `.html` | Expected — those screens are Step-8 roll-out; links resolve when built. |

---

## New files this pass
`checkout-loggedin.html` · `checkout-noaddr.html` · `auth-loading.html` — all registered in
`_nav.js` (checkout states → `loggedin, noaddr, loading, declined`; auth states →
`code, loading, newuser, error`) and shown in each screen's prototype bar.

## Canonical order (single source for the whole flow)
- **Items:** ON Gold Standard 100% Whey 2270 г — Подвійний шоколад — ×1 — 1 290 ₴ · BioTechUSA
  Iso Whey Zero 908 г — Ваніль — ×2 — 2 100 ₴ · OstroVit Creatine Monohydrate 500 г — Без смаку —
  ×1 — 549 ₴. **Сума товарів = 3 939 ₴** (4 units).
- **Guest** (`checkout.html`, `order-placed.html`): + Доставка 60 → **До сплати 3 999 ₴**; no
  loyalty discount / bonus (sign-in incentive shown instead).
- **Logged-in** (`checkout-loggedin.html`, `checkout-noaddr.html`, `checkout-declined.html`,
  `order-placed-account-end.html`): − Знижка 🥈 Срібло −5% 197 + Доставка 60 → **До сплати
  3 802 ₴**; accrual **+38 ₴** (~1%); bonus balance 240 ₴ (spend toggle off).

## Verified
Rendered at 1200 (desktop) — `checkout` (guest 3 999), `checkout-loggedin` (3 802),
`checkout-noaddr` (address capture), `auth-loading` (static), `order-placed` (guest 3 999).
Prototype bars show the new sibling states. No colour leaks introduced; all edits greyscale.

**Result:** all High + Med resolved; selected Low fixed; the rest consciously kept with reasons.
Флоу 1 is internally consistent (one basket, two honest money variants, no dead ends, no
matrix-required state missing). Next: Step 8 — roll out the remaining flows via subagents.

---

# Step 9 — Critique · Flow 2 (Coach workspace, Job 1) — 2026-07-02

Scope: the 26 coach files (5.0 landing · 5.1 verify+4 · 5.2 home+2 · 5.3 clients+4 · 5.4 client+3 ·
5.5 session+5 · 6.0 cart-coach+1). Same method: 5 parallel read-only auditors (session · landing+verify
· home+clients · client+cart · coverage+wiring) → one prioritised table → fixes. Coverage/wiring came
back **0 defects** (26/26 on disk = _nav.js = matrix; spine + recoveries intact; robots + wfBar clean).
cart-coach matches coach-session **verbatim** (2 320 / 1 160 / 3 480) — no desync.

## Defect table → resolution

| # | Sev | Screen(s) | Defect | Resolution | Status |
|---|-----|-----------|--------|------------|--------|
| H1 | H | global footer (`_nav.js wfFooter`, every page) + header meta-bar + home×3 · product · account×3 | «Для тренерів»/«Стати тренером»/«Тарифи» linked to **`coach.html` (never built)** → 404 on every page + broken buyer→coach entry | Repointed: footer/header/home/product «Для тренерів»/«Тарифи» → `coach-landing.html`; account «Стати тренером» → `coach-verify.html`; header meta-bar «Для тренерів» given a real href. Zero bare `coach.html` left. | ✅ |
| M1 | M | coach-session -oos / -untagged / -priceblock | Banner said a line was excluded but per-client subtotal + session summary + grand total + mobile bar still counted it (all 2 320 / 3 480) | Recomputed per state: **oos** Андрій 1 090 / Разом 2 250 (Hyper Mass excluded) · **untagged** 1 230 / 2 390 (untagged line won't reach cart) · **priceblock** 1 230 confirmed / 2 390 «без 1 позиції» (pending line unpriced). | ✅ |
| M2 | M | coach-home ↔ coach-clients (×6) | Shell drift: coach identity («Олена» vs «Олена Тренер», av «О» vs «ОЛ», phone …21 09 vs …88 21), client count (2 vs 3), order counts (4/2 vs 8/5), first-nav label («Огляд» vs «Кабінет»), tier chip variants | Canonicalised one coach profile (Олена · «О» · …21 09 · «Pro · Тренер»), nav label «Огляд», client count **3** (added Ігор to the home summary), order counts **8 / 5 / 2** across all coach-clients* + coach-home. | ✅ |
| M3 | M | coach-home | Order-list links → `checkout.html` (semantic-wrong; no coach order-history screen) | «↻ Повторити» → `cart-coach.html` (Job 4); «Замовлення» nav + «Усі замовлення» → `coach-home.html` (dashboard) pending the coach order-history node (IA gap, see below). | ✅ |
| L1 | L | coach-session-loading + -addclient | Loading never resolved forward («Знайти» self-link); addclient skipped the specified loading step | Added forward demo edges on session-loading → base (loaded) + → oos; wired addclient «Додати клієнта» → session-loading (flows `addc → slqa`). | ✅ |
| L2 | L | coach-session quick-add rows | Quick-add suggestions showed `.cprice` without the «гурт» `.wtag` (wholesale framing only on committed lines) | Added «гурт» tag to all quick-add rows (base + 4 states). | ✅ |
| L5 | L | coach-verify-loading | Only the pass branch was clickable | Added a «Демо: не пройдено» edge → coach-verify-error (mirrors flows `svrf → q2 → evf`). | ✅ |
| L7 | L | coach-home | «Тариф» / «Керувати тарифом» self-linked | → `coach-verify-tier.html`. | ✅ |

### Intentionally kept / noted (IA gaps — need spec, not wiring)
- **M4 (Med→noted):** coach-client «Деталі» → session and «Редагувати клієнта» → clients list are **stand-ins** — there is **no coach order-detail and no client-edit node** in the IA. Per convention §10 (IA gap → fix the spec first), left as-is and flagged; add the nodes to `coach.md`/sitemap before wiring.
- **Coach order-history node missing:** coach-home «Замовлення»/«Усі замовлення» point at the dashboard because no coach order-list screen exists (buyer 7.2 is separate). Same IA gap.
- **L6 nav order/icons** differ between coach-home and coach-clients (Нова сесія position + ＋ vs 🛒 icon). Real fix = **extract the coach section-nav into a `_nav.js` component** (like `wfHeader`), deferred; low visual impact.
- **content.html** links (verify consent/support, footer) — expected forward-ref (node 8.x), shared with ~50 other screens.
- Modal/drawer low-alpha shadows on addclient/cart-coach — the accepted dialog-depth treatment (same as auth/cart), kept.

**Result:** all High + Med resolved and the chosen Low; Flow 2 is internally consistent (canonical coach
profile + counts, honest session-state numbers, no `coach.html` 404, cart matches session). Remaining
items are genuine IA gaps (coach order-detail / client-edit / order-history nodes) to be specced, not
wireframe bugs. Verified renders: coach-session-oos summary (2 250), coach-clients profile (Олена/О/Pro).

---

## Крок 10 — Звірка IA ↔ вайрфрейми (обидва флоу готові), 2026-07-02

Після завершення Флоу 1+2 прогнали **8 паралельних read-only аудиторів** (по кластеру: nav+footer ·
home · category+goal · product · auth · account · coach · cart), кожен звіряв *вайрфрейм ↔ `ia/docs/*.md`
(джерело правди) ↔ `ia/*.html` (візуал)*. Головний висновок: **md-специфікації переважно актуальні**,
дрейф — у застарілих `ia/*.html` візуалах і в кількох вайрфрейм-деталях. Виправлено:

**Наскрізне**
- **Бредкрампси кабінету** (головний баг): уніфіковано — покупець `Головна › Кабінет`; робочий кабінет
  тренера 5.2–5.7 `Головна › Кабінет тренера › …`; активація 5.1 `Головна › Кабінет › Стати тренером › …`;
  лендинг 5.0 `Головна › Для тренерів`. (29 coach-файлів, скрипт.) Схему записано в `coach.md` (Locked §8).
- **Застарілий сайдбар «Флоу 2 · скоро»** → активне посилання `#f2` у всіх 23 `ia/*` + `research/*`.
- `index.html`: активовано **Флоу 2** + додано блок **«Повна карта сайту»** (усе поза флоу → IA-спеки).

**IA-специфікації (md)** — `navigation.md` вичищено залишкові «Цілі» (суперечили рішенню «✦ Квіз» 07-01);
`auth.md` loading = повнодіалоговий інтерстішл; `cart.md` додано стани (checkout-loading + два фінали 6.2);
`coach.md` +бредкрамп-схема +порядок секційного меню (Locked §8/§9), знято застарілий рядок про 6.x;
`home.md` картка позначена availability-aware.

**Спільні компоненти (`_nav.js` / `_wf.css`)** — хедер «Цілі ▾» → **«✦ Квіз»** + «Про нас» у мета-бар;
футер +колонка **«Розсилка»** (поле+Google) +політики в Stack +соцмережі/політики в нижній бар (сітка
5 колонок); каталожна рейка +фасети **Форма випуску** + **Фасування, вага**.

**Вайрфрейм-консистентність** — `product`: порція 28→**18 ₴** (1290/72); покупець Флоу 1 усюди **Вікторія
Коваль** (`account`/`account-error`/`home-buyer`, було «Андрій»); `account` порядок меню (Обране вище
Адрес/Профілю); `order-placed` нарахування +40→**+38**; `home-coach` стрип/кнопки → реальні сторінки
(`coach-home`/`coach-session`/`coach-clients`/`coach-orders`).

**Регенеровані візуали** — `ia/coach.html` розширено (додано 5.4a/5.6/5.7 +стани, hero/§07/§08/§09/футер
5.5→5.7, URL `/coach/orders*`, дані → Олена/Андрій 2 320/Марія 1 160/Разом 3 480); точкові патчі
`ia/category.html` (Тип→лінки · goal-в-панелі · breadcrumb→`catalog-page.html`), `ia/navigation.html`
(діалог міста без «2 рівні»), `ia/product.html` + `ia/cart.html` (числа → канон).

**Метод-урок:** аудит-фан-аут ОБОВʼЯЗКОВО з палітрою greyscale наперед (інакше плейсхолдери-текстури
дають хибні «leak»); звіряти в обидва боки (вайрфрейм міг піти вперед від спеки — тоді оновлюємо спеку).
