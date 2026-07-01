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
