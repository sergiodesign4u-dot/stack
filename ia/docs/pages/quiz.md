# Page-level IA — Quiz / goal guide (node 4.x)

**Type:** focused dialog flow (4.0 intro → 4.1 questions → 4.2 result → 4.3 set-to-cart)
**Status:** **POST-LAUNCH** (Decision 2: MVP goal entry = goal tiles 2.2; the quiz is the enriched version)
**Visual:** `ia/quiz.html` (Ukrainian, B/W wireframe)
**This file:** source of truth (English)
**Job:** Job 2 — turn a beginner's vague goal into a safe, credible product set (persona Viktoriia)
**Related:** Home `0.0` (hero CTA), Goal collection `2.2`, Catalog goal→category map (`catalog.md`), Product `3.0`, Cart `6.0`

---

## Decisions (my recommendations, flagged for review)

- **Format:** a **focused dialog/overlay** — a centered modal (~540px) on desktop, **full-screen on
  mobile**; one step = one question, progress bar, calm supportive visual. Attractive but **calm**
  (principle #4: no anxiety/timers). **No account required.** Close any time.
- **Goal of the quiz (answering the open question):** lead **not to a single product** (too risky;
  stock changes) but to a **curated set = a pre-filtered Goal collection (2.2)** — a 3–5 item starter
  set with "add all to cart" + "view the full collection".
- **Branching model:** keep the **question order fixed (linear)**; put the "branching" in the
  **result mapping** (answers → set) plus **one conditional insert** (a safety interstitial). For a
  5-question quiz, a full per-answer decision tree is unnecessary complexity. (Alternative noted, not
  taken for MVP; can deepen later from analytics.)

---

## Flow

`Intro (4.0)` → `Q1 Goal` → `Q2 Experience` → `Q3 Frequency` → `Q4 Constraints (multi)` →
`[⚠ Safety insert — if "meds/chronic"]` → `Q5 Format/budget` → `Result set (4.2)` →
`Add set to cart (4.3)` / `View full collection (2.2)`.

### Questions (ready draft copy)

**Q1 · Яка ваша ціль?** (single) — sets the base categories
| Option | Set pulls from (base) |
|---|---|
| 💪 Набір м'язової маси | Протеїн · Гейнери · Креатин · BCAA/EAA · Передтрен. |
| 🔥 Схуднення і рельєф | Жироспалювачі · L-карнітин · Протеїн (ізолят) · Клітковина |
| 🌿 Відновлення | BCAA/EAA · Глютамін · Казеїн · Омега-3 · Магній/сон |
| ⚡ Енергія і тонус | Передтренувальні · Кофеїн · B-вітаміни · Ізотоніки |
| 🛡️ Імунітет і здоров'я | Вітаміни (C, D3, цинк) · Омега-3 · Адаптогени |
| 🏃 Витривалість / кардіо | Ізотоніки/електроліти · Бета-аланін · L-карнітин · Гелі |

(Mapping = the canonical goal→category table in `catalog.md`.)

**Q2 · Який у вас досвід?** (single): Новачок · Є досвід (регулярно) · Досвідчений.
**Q3 · Як часто тренуєтесь?** (single): 1–2 / 3–4 / 5+ разів на тиждень.
**Q4 · Чи є щось, що нам врахувати?** (multi, skippable): Непереносимість лактози · Вегетеріанство/
веганство · Алергії (горіхи, глютен…) · Приймаю ліки / хронічне захворювання · Нічого з переліченого.
**Q5 · Що вам зручніше?** (single/two): Формат — порошок / капсули / готові напої (RTD); Бюджет —
економний / оптимальний / максимальний.

**Required:** only **Q1 (goal)** is mandatory; **Q2–Q5 are skippable** with sensible defaults
(experience defaults to «новачок» → conservative set). Keeps the quiz light.

### Conditional rules (affect the SET, not the question order)
| If answer… | Effect on the set |
|---|---|
| Q1 goal = X | Base categories = goal→category map |
| Q2 Новачок | Smaller set (2–3 core) + more explanation/safety |
| Q2 Досвідчений | Fuller stack (up to 4–5), less hand-holding |
| Q3 5+ / week | Add intra-workout / electrolytes / recovery; 1–2 → minimal |
| Q4 Лактоза | Protein → isolate/plant; exclude concentrate |
| Q4 Vegan/veg | Plant protein; exclude animal (whey/casein/beef) |
| Q4 Meds/chronic | Safety interstitial + conservative base set |
| Q5 Format/budget | Filter form (powder/caps/RTD) and price tier in the set |

---

## Result (4.2 / 4.3)
- Headline «Ваш стартовий набір для [цілі]» + **rationale chips** (goal, experience, "без лактози",
  format…).
- **3–5 product cards** in a **compact set-card** form (**оновлено 2026-07-02**: NOT the full catalog
  card — a lighter card = thumb · brand · name · **one-line «чому тут»** · price + add), laid out
  **≥3 in a row** so the whole set reads at a glance without much vertical space. In the wireframe the
  result dialog widens for this row (desktop 4-across, mobile 2×2). Full composition/dosage stays on the PDP.
- CTAs: **«Додати весь набір у кошик»** (→ 6.0, shows set total) · **«Переглянути всю колекцію»**
  (→ 2.2) · per-item «У кошик» (→ 3.0/6.0).
- Trust: **«Це не медична порада»**, certified, composition/dosage on the product page.
- **Save the set = inline email field at the bottom of the result** (NOT a separate dialog):
  prompt «Зберегти набір на потім?» + `Ваш email` + «Надіслати». No account; opt-in to the newsletter
  (8.12) + first-order promo code.
- Set size: 2–3 for beginners, up to 4–5 for advanced.

## Entry points (locked)
Home hero «Підібрати за квізом» (4.0); **goal tile → deep-links into the quiz with Q1 preset (jumps
to Q2)** — the tile's primary action stays → Goal collection (2.2); a banner inside the Goal collection.
**Not added to global nav.** Exit «Просто відкрити каталог» → 2.0 (no pressure).

---

## SEO block (A–E)
The quiz is a JS modal flow, but has an **indexable landing page** `/pidbir` (the intro). Optimize that.
- **Title (≤60):** Підбір спортивного харчування — пройдіть тест | Stack
- **Description (≤155):** Не знаєте, що обрати? Пройдіть короткий тест — і отримайте безпечний набір
  спортивного харчування під вашу ціль: склад, дозування, без зайвого.
- canonical `/pidbir/`; hreflang uk/ru/x-default; robots index,follow; OG/Twitter.
- **H1:** Підберіть спортивне харчування під свою ціль. **H2:** Як це працює (3 кроки) · Кому
  підійде · Часті питання (FAQ).
- **Schema:** WebPage + optional FAQPage (підбір) + HowTo (як працює). Quiz steps (modal states) are
  not indexed. Ready landing copy at the copy stage.

## Accessibility
`role="dialog" aria-modal`, focus trap, ESC closes, focus returns to trigger. Progress with
`aria-valuenow` + `aria-live` step announcement. Answer cards = radiogroup (single) / checkbox group
(multi), keyboard-operable, tap ≥ 44px. Fully completable without a mouse; «Далі» disabled until a
required choice is made. Safety interstitial visible but calm, doesn't block exit.

## Mobile (360px)
Full-screen dialog: progress on top, question, answer cards in **1 column**, «Назад/Далі» as a
**sticky footer** (thumb zone). Intro and result also full-screen; result has a sticky «Додати весь
набір» CTA.

---

## Locked (draft) / open
**Locked (draft, 2026-06-30):** post-launch status; focus-dialog format; 5 questions (goal · experience
· frequency · constraints-multi · format/budget) + conditional safety insert; fixed order + result
branching (not a full tree); output = curated set (filtered goal collection 2.2), not a single product;
trust disclaimer + safety insert.

**Resolved 2026-06-30 (were open [?]):**
- **5 steps; only Q1 (goal) required** — Q2–Q5 have «Пропустити»/default (experience defaults to
  «новачок» → more conservative set). Fast to finish, room to refine.
- **Start from a goal tile = yes** — deep-link with Q1 preset (jumps to Q2); the tile's primary action
  stays → Goal collection (2.2).
- **Email-save of the set = yes, as an inline field at the bottom of the result** (not a separate
  dialog): `Ваш email` + «Надіслати», no account (lead capture + newsletter 8.12 opt-in + promo code).
- **Global nav = no** — entries are Home hero, goal-tile deep-link, Goal-collection banner only.

**Still [?] (operational, not IA):** exact SKU picks in the set — an editorial/data task at build time
(the curation *mechanism* is fixed: goal→categories · experience→size · constraints→swaps ·
format/budget→filter · output 3–5 explained items).
