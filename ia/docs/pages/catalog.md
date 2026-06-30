# Page-level IA — Catalog structure (taxonomy)

- **Node:** 2.x (Sitemap cluster 2 — Catalog & discovery). This is the **store taxonomy**
  that powers Catalog (2.0), Category (2.1), the «Каталог» mega-menu, and the «За ціллю»
  collections (2.2).
- **Type:** Information structure (category tree + goal mapping).
- **Canonical visual:** `ia/catalog.html`. This markdown is the source of truth.
- **Grounding:** built from real Ukrainian sport-nutrition catalogs — primarily
  **Belok.ua** (full tree pulled), cross-checked against Sporter / bb.ua / Euro Protein.

## MVP breadth & rebalancing (decided 2026-06-30)

Launch the **full breadth**, but **rebalanced** so we don't have many thin top-level
categories with half-empty listings. From the first-draft 14 top-levels → **12 well-filled
ones**:

- **«Для суглобів і зв'язок» folded into «Здоров'я»** (as a subcategory).
- **«Замінники харчування» merged into «Батончики, снеки та харчування»**.
- **«Здоров'я»** expanded from a flat blob into ~10 clear subcategories (incl. men's /
  women's health), so depth lives one level down instead of spawning thin top-levels.
- **«Передтренувальні»** absorbs energy/caffeine → **«Передтренувальні та енергія»**.

Subcategory depth shows only where there are SKUs; the **catalog population at scale**
(sourcing, feeds, stock) stays the brief's deferred operational `[?]` (technical scoping
with real supplier data). The tree is the target structure.

## Model

- **Categories** = product structure ("what kind of product"). Tree: **Category →
  Subcategory → Type / inner**. Brand, flavour, serving size, price, form, country,
  certification, availability are **facets/filters** on the listing, not tree levels.
- **Goals** = curated **collections** that cut across categories ("what outcome"). Not
  categories (JTBD unchanged); they select products from the tree. Goals are Stack's
  **concern/outcome discovery lens** — the analogue of "browse by symptom" on a pharmacy
  aggregator (e.g. Liki24). So they are **first-class inside the Catalog**, not only a
  separate dropdown: **«За ціллю» leads the category list** — it is the **first item** in the
  home category rail and in the «Каталог» mega-menu category column, the first block on the
  Catalog hub (2.0), and the top block of the mobile Catalog drilldown + goal pages (2.2)
  (consistent goals-first ordering, decided 2026-07-01). This keeps goals reachable everywhere
  (Головна hero · Catalog hub · mega-menu · mobile Catalog) and surfaced before the categories.
- **One canonical category per product.** A product lives in exactly one category;
  multi-discovery is via **goal tags + facets + search**, not dual category listings.
  _(Example: L-карнітин's canonical home is Жироспалювачі; it also surfaces under the
  «Схуднення» goal and search — no second listing under Амінокислоти.)_
- **Symptom/concern = goals.** There is no separate "symptom" tree (closes node 2.3):
  goals are the concern lens; health-specific concerns (immunity, sleep, joints…) are the
  «Здоров'я» subcategories + the Імунітет goal. A dedicated symptom landing, if ever needed,
  is just an SEO variant of a goal/Здоров'я page.
- **Brands** = a parallel index (2.4).

## Category tree — 12 top categories (Ukrainian = product language)

### 1. Протеїн
- За типом: Сироватковий (концентрат) · Ізолят · Гідролізат · Казеїн · Комплексний ·
  Яловичий · Рослинний (соя/горох/рис) · Яєчний
- За формою: Порошок · Готові напої (RTD)

### 2. Гейнери
- Високовуглеводні · Збалансовані (білок+вуглеводи) · Вуглеводи/карбо (мальтодекстрин,
  амілопектин, восковидна кукурудза)

### 3. Креатин
- Моногідрат · Creapure® · Гідрохлорид (HCl) · Kre-Alkalyn · Суміш креатинів
- Форма: Порошок · Капсули/таблетки

### 4. Амінокислоти
- BCAA · EAA / комплексні · L-глютамін · L-аргінін · L-цитрулін · Бета-аланін · Таурин ·
  L-лізин · (форма: порошок / капсули / рідкі)

### 5. Передтренувальні та енергія
- Передтреники з кофеїном (стим) · Без стимуляторів (stim-free) · Пампінг / NO-бустери ·
  Енергетики, кофеїн, гуарана

### 6. Жироспалювачі
- L-карнітин · Термогеніки (комплексні) · Ліпотропіки · Блокатори (вуглеводів/жирів, хітозан)

### 7. Ізотоніки та витривалість
- Ізотоніки · Енергетичні гелі · Електроліти / сольові таблетки

### 8. Батончики, снеки та харчування
- Протеїнові батончики (без цукру / високобілкові / вуглеводні) · Протеїнове печиво,
  цукерки, снеки · Паста (арахісова/горіхова) · Замінники харчування (meal replacement) ·
  Суперфуди · Гранола · Сиропи без цукру

### 9. Вітаміни та мінерали
- Вітамінно-мінеральні комплекси (чол. / жін. / універсальні)
- Окремі вітаміни: D3 · C · група B · A · E
- Мінерали: Магній · Цинк · Кальцій · Залізо · Селен
- Омега / риб'ячий жир: Омега-3 · 3-6-9 · Омега-3 + D3

### 10. Здоров'я (umbrella — condition-based)
- **Суглоби та зв'язки:** Глюкозамін/хондроїтин/MSM · Колаген · Комплекси для суглобів
- **Імунітет:** Комплекси · Вітамін C/D · Цинк · Ехінацея
- **Сон і нервова система:** Мелатонін · GABA · L-тріптофан · 5-HTP · Антистрес-комплекси
- **Травлення:** Пробіотики · Ферменти · Клітковина
- **Серце та судини:** Коензим Q10 · Омега-3 · Фолієва
- **Печінка:** Розторопша · Гепатопротектори
- **Чоловіче здоров'я:** Тестостеронові бустери · Трибулус · ZMA · Простата
- **Жіноче здоров'я та краса:** Шкіра/волосся/нігті · Біотин · Колаген · При менопаузі ·
  Залізо/фолієва
- **Адаптогени:** Ашваганда · Женьшень · Родіола
- **Антиоксиданти:** Q10 · Альфа-ліпоєва · Кверцетин · Куркумін
- _(Дитяче здоров'я — **out of scope**: audience is adult athletes/coaches/beginners; a
  pediatric subtree dilutes focus and adds trust/safety surface. Revisit post-launch only if
  demand shows.)_

### 11. Аксесуари
- Шейкери та пляшки · Дозатори / таблетниці · Атрибутика (пояси, лямки/крюки, бинти,
  рукавички, магнезія, фітнес-гумки)

### 12. Бренди
- Індекс брендів → лістинг (parallel entry, 2.4)

## Goals → categories — 6 goals (LOCKED 2026-06-30)

All six are backed by the launch catalog (full breadth ships, incl. Ізотоніки → endurance).
**This table is the canonical source for the «Цілі» mega-menu** in the header (Navigation 0.1):
each goal is a column, and the categories/subcategories below come from this mapping. It also
powers the «За ціллю» column in the «Каталог» mega-menu and the goal block atop the mobile
Catalog drilldown.

| Goal | Pulls mainly from |
|------|-------------------|
| **Набір маси** | Протеїн (сироватковий/комплексний) · Гейнери · Креатин · BCAA/EAA · Передтреники |
| **Схуднення** | Протеїн (ізолят) · Жироспалювачі · L-карнітин · Клітковина · Вітаміни |
| **Відновлення** | BCAA/EAA · Глютамін · Здоров'я→Суглоби/Колаген · Омега · Магній · Сон |
| **Енергія / тонус** | Передтренувальні та енергія · B-вітаміни · Адаптогени · Ізотоніки |
| **Імунітет / здоров'я** | Вітаміни (C, D3, цинк) · Омега · Здоров'я→Травлення (пробіотики) |
| **Витривалість / кардіо** | Ізотоніки · Гелі · Електроліти · Бета-аланін |

(Brief Decision 2 allowed 4–6 goal tiles; we use the full 6 since the launch catalog
backs each one.)

## Facets (listing filters, not tree levels)

Brand · Price · Goal · Form (порошок/капсули/RTD) · Flavour · Serving size / weight ·
Country of origin · Certification · Availability (in stock / back-in-stock). These power the
inherited Filter panel on Category/Catalog/Search pages.

## Resolved (2026-06-30)

- **Goals integrated into the Catalog** as the concern lens (mega-menu column + top of the
  mobile Catalog drilldown), so they never disappear on mobile.
- **Symptom/concern (2.3)** — no separate tree; goals + «Здоров'я» subcategories cover it.
- **Дитяче здоров'я** — out of scope (not added).
- **L-карнітин** — canonical category = Жироспалювачі; one-canonical-category rule.

## Open questions [?]

- **Catalog population at scale** (sourcing, feeds, stock, out-of-stock handling) — the
  brief's deferred operational `[?]`; resolved in technical scoping with real supplier data.
  Subcategory depth fills as SKUs land. (The only navigation/structure question left.)

## Sources

- Belok.ua — full catalog tree (primary reference)
- Sporter Nutrition, bb.ua, Euro Protein — cross-check of category breadth
