# Page-level IA — Catalog structure (taxonomy)

- **Node:** 2.x (Sitemap cluster 2 — Catalog & discovery). This is the **store taxonomy**
  that powers Catalog (2.0), Category (2.1), the «Каталог» mega-menu, and the «За ціллю»
  collections (2.2).
- **Type:** Information structure (category tree + goal mapping).
- **Canonical visual:** `ia/catalog.html`. This markdown is the source of truth.
- **Grounding:** built from real Ukrainian sport-nutrition catalogs — primarily
  **Belok.ua** (full tree pulled), cross-checked against Sporter / bb.ua / Euro Protein.
  Belok's redundant nodes (Креатин / Амінокислоти / Батончики listed both under
  «Спортивне харчування» and as top-level) were **de-duplicated**: each is one top-level
  category here.

## Model

- **Categories** = the product structure ("what kind of product"). A 3-level tree:
  **Category → Subcategory → Type / inner**. Deeper distinctions (brand, flavour, serving
  size, price, form) are **facets/filters** on the listing, not tree levels.
- **Goals** = curated **collections** that cut across categories ("what outcome"). Goals
  are NOT categories (JTBD unchanged) — they select products from the tree. They appear as
  the «За ціллю» column in the Каталог mega-menu and as goal pages (2.2).
- **Brands** = a parallel index (2.4), reachable from the mega-menu.

## Category tree (Ukrainian names = product language)

### 1. Протеїн
- За типом: Сироватковий (концентрат) · Сироватковий ізолят · Гідролізат · Казеїн ·
  Комплексний (багатокомпонентний) · Яловичий · Рослинний (соєвий/гороховий/рисовий) · Яєчний
- За формою: Порошок · Готові напої (RTD) · (батончики → категорія 10)

### 2. Гейнери
- Високовуглеводні · Збалансовані (білок+вуглеводи) · Вуглеводи / карбо (мальтодекстрин,
  амілопектин, восковидна кукурудза)

### 3. Креатин
- Моногідрат · Creapure® · Гідрохлорид (HCl) · Kre-Alkalyn · Суміш креатинів
- Форма: Порошок · Капсули/таблетки

### 4. Амінокислоти
- BCAA · EAA / комплексні амінокислоти · L-глютамін · L-аргінін · L-цитрулін ·
  Бета-аланін · Таурин · L-лізин
- Форма: Порошок · Капсули/таблетки · Рідкі

### 5. Передтренувальні комплекси
- З кофеїном (стим) · Без стимуляторів (stim-free) · Пампінг / NO-бустери ·
  Енергетики й кофеїн

### 6. Жироспалювачі
- L-карнітин · Термогеніки (комплексні) · Ліпотропіки · Блокатори (вуглеводів/жирів, хітозан)

### 7. Вітаміни та мінерали
- Вітамінно-мінеральні комплекси (для чоловіків / для жінок / універсальні)
- Окремі вітаміни: D3 · C · група B · A · E
- Окремі мінерали: Магній · Цинк · Кальцій · Залізо · Селен
- Омега / риб'ячий жир: Омега-3 · Омега 3-6-9 · Омега-3 + D3

### 8. Для суглобів і зв'язок
- Глюкозамін, хондроїтин, MSM · Колаген · Комплекси для суглобів

### 9. Здоров'я та бади (wellness)
- Імунітет · Сон і релакс (мелатонін, GABA, тріптофан) · Антистрес / нервова система ·
  Травлення (пробіотики, ферменти, клітковина) · Серце та судини (Q10, омега) · Печінка ·
  Адаптогени (ашваганда, женьшень) · Краса (шкіра/волосся/нігті, біотин, колаген) ·
  Чоловіче здоров'я (тестобустери, трибулус, ZMA) · Жіноче здоров'я · Антиоксиданти

### 10. Батончики та снеки
- Протеїнові батончики · Без цукру · Вуглеводні / енергетичні · Протеїнове печиво ·
  Паста (арахісова/горіхова) · Снеки

### 11. Ізотоніки та витривалість
- Ізотоніки · Енергетичні гелі · Електроліти / сольові таблетки

### 12. Замінники харчування
- Протеїнові коктейлі-замінники (meal replacement) · Суперфуди · Сиропи без цукру · Гранола

### 13. Аксесуари
- Шейкери та пляшки · Дозатори / таблетниці ·
  Атрибутика (пояси, лямки/крюки, бинти, рукавички, магнезія, фітнес-гумки)

### 14. Бренди
- Індекс брендів → лістинг (parallel entry, 2.4)

## Goals → categories (cross-cutting collections)

Goal pages (2.2) and the «За ціллю» mega-menu column pull a curated set from the tree:

| Goal | Pulls mainly from |
|------|-------------------|
| **Набір маси** | Протеїн (сироватковий/комплексний) · Гейнери · Креатин · BCAA/EAA · Передтреники |
| **Схуднення** | Протеїн (ізолят) · Жироспалювачі · L-карнітин · Клітковина · Вітаміни |
| **Відновлення** | BCAA/EAA · Глютамін · Колаген / суглоби · Омега · Магній · Сон |
| **Енергія / тонус** | Передтреники · Енергетики/кофеїн · B-вітаміни · Адаптогени · Ізотоніки |
| **Імунітет / здоров'я** | Вітаміни (C, D3, цинк) · Омега · Пробіотики |
| **Витривалість / кардіо** `[?]` | Ізотоніки · Гелі · Електроліти · Бета-аланін |

- Locked goal set for MVP is 4 (Набір маси · Схуднення · Відновлення · Енергія) — see brief
  Decision 2; Імунітет and Витривалість are candidates `[?]`.

## Facets (listing filters, not tree levels)

Brand · Price · Goal · Form (порошок/капсули/RTD) · Flavour · Serving size / weight ·
Country of origin · Certification · Availability (in stock / back-in-stock). These power
the inherited Filter panel on Category/Catalog/Search pages.

## Open questions [?]

- **MVP breadth:** which categories/subcategories launch first vs later. The full tree is
  the target; catalog **population at scale** (sourcing, feeds, stock) is the brief's
  deferred operational `[?]` (technical scoping with real supplier data).
- Symptom/concern entry (2.3) overlaps with «Здоров'я» subcategories — keep as a discovery
  lens over the same products, not a separate tree. MVP vs post-launch `[?]`.
- Goal set: 4 locked + Імунітет / Витривалість candidates `[?]`.
- L-карнітин placement (Амінокислоти vs Жироспалювачі) — kept under Жироспалювачі; can be
  cross-listed via facet.

## Sources

- Belok.ua — full catalog tree (primary reference)
- Sporter Nutrition, bb.ua, Euro Protein — cross-check of category breadth
