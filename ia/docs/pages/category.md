# Page-level IA — Category / product listing (node 2.1)

- **Node:** 2.1 Category. This spec is the **shared listing template** that also powers
  2.0 Catalog root (scope = all / category hub), 2.2 Goal collection, 2.4 Brand listing,
  2.5 Search results, and the SEO city variant 2.1a (e.g. «Протеїн Одеса»). One skeleton,
  many scopes — the only differences are the H1, the data scope, and the SEO block.
- **Type:** product listing page (PLP) with an inherited facet/filter panel.
- **Canonical visual:** `ia/category.html` (Ukrainian, B/W wireframe). This markdown is the
  source of truth (English).
- **Job:** serves discovery for every persona — beginner browses a category after a goal,
  regular finds a known type fast, coach quick-adds from a category in-session.
- **Taxonomy source:** `catalog.md` (categories → subcategories → types; 6 goals; facet list).
- **Related:** Catalog taxonomy `2.x` (`catalog.md`), Goal collection `2.2`, Product `3.0`,
  Cart `6.0`, Navigation mega-menu `0.1`, Footer SEO links `0.2`.

---

## Decisions (recommendations, flagged for review)

- **One listing template for all scopes.** Category, Catalog-all, Goal collection, Brand and
  Search are the same page with a different query scope + H1 + SEO block. Build once.
- **Filter panel = inherited component.** Desktop: a **left rail** (sticky). Mobile: a
  **bottom-sheet** opened by a sticky «Фільтри» button (with active-count badge). Facets come
  straight from `catalog.md`: Бренд · Ціна · Ціль · Форма · Смак · Фасування/вага · Країна ·
  Сертифікація · Наявність. Subcategory/Тип is also expressible as a filter.
- **Goals stay first-class inside the catalog** (concern lens, per `catalog.md`): a «За ціллю»
  chip row sits near the top of the listing, so the beginner can switch from "what kind" to
  "what outcome" without leaving.
- **Calm, trust-first** (principles #1, #4): no countdown timers; availability and certification
  are honest, plain-language signals on every card. The category intro reduces doubt before
  the grid sells.

---

## Block order (mobile-first)

1. **Breadcrumb** — Головна / Каталог / [Категорія] (BreadcrumbList schema; crawlable `<a>`).
2. **H1 + short intro** — category name + 1–2 calm sentences (trust-first), collapsible
   «читати більше». Result count «Знайдено N товарів».
3. **Subcategory chips** — drilldown inside the category (e.g. Протеїн → Ізолят · Концентрат ·
   Казеїн · Рослинний…). Crawlable links to the filtered/subcategory listing.
4. **Goal cross-links** («За ціллю») — small chip row (concern lens); → Goal collection 2.2.
5. **Toolbar** — Sort (популярні · дешевші · дорожчі · новинки · рейтинг · знижка), results
   count, view toggle (сітка/список), and on mobile the **«Фільтри»** button (active-count badge).
6. **Active-filter chips** — removable chips of applied facets + «Очистити все».
7. **Listing** — two columns on desktop (filter rail + grid), single column on mobile.
   **Product grid** uses the canonical card (`home.md`): photo · NEW/Хіт/−% badge · name ·
   brand·country meta · price (new + old struck) · wishlist ♡ · **«У кошик»** quick-add.
8. **Pagination** — «Показати ще» (load-more) **plus** crawlable numbered pages for SEO.
9. **SEO text** — category description at the bottom (H2 + ready copy).
10. **Related** — popular brands in this category + related categories (internal linking).
11. Footer (inherited 0.2).

## Product-card availability states (on the listing)
| State | Card shows |
|---|---|
| В наявності | price + «У кошик» (active) |
| Закінчується | «Залишилось мало» note + «У кошик» |
| Під замовлення | «Під замовлення» + «У кошик» (longer delivery note) |
| Немає | greyed price + **«Повідомити про надходження»** (back-in-stock, 8.x) |

## Page / listing states
| State | Behaviour |
|---|---|
| Default | Grid of in-scope products, default sort = популярні. |
| Filtered | Active-filter chips visible; count updates; URL reflects facets. |
| Empty / no results | «Нічого не знайдено» + «Очистити фільтри» + suggested categories/goals + search prompt. Never a dead end (principle #2). |
| Loading | Card skeletons (no layout shift). |
| Coach in-session | Same listing, but card CTA = «Додати клієнту» quick-add (per `flows`, multi-client session 5.5). |

## Facets / filter panel (from `catalog.md`)
Бренд (multi, search-in-list) · Ціна (range) · Ціль (the 6 goals) · Форма (порошок/капсули/RTD) ·
Смак · Фасування / вага · Країна походження · Сертифікація · Наявність (в наявності /
під замовлення / повідомити). Subcategory/Тип selectable as a filter. Each facet shows counts;
«Застосувати» + «Скинути» on mobile sheet; instant on desktop.

---

## SEO block (A–E) — category template

**A · Meta tags (example: Протеїн)**
- **Title (≤60):** Протеїн — купити протеїн в Україні, ціна | Stack
- **Description (≤155):** Протеїн від перевірених брендів: ізолят, концентрат, казеїн,
  рослинний. Оригінал і сертифікати, швидка доставка Новою Поштою, оплата картою.
- `canonical` → the clean category URL `/protein/`; **paginated pages self-canonical**
  (`/protein/?page=2` → itself, not page 1); hreflang uk/ru/x-default; robots index,follow;
  OG/Twitter (category image).

**B · Headings**
- **H1 (single):** category name (e.g. «Протеїн»).
- **H2:** subcategory groups (Ізолят · Концентрат…) · «Як обрати [категорію]» · «Часті
  питання» (FAQ) · the bottom SEO description heading.

**C · Ready SEO text** — short trust intro under H1 + a longer description block at the
bottom (composition/how-to-choose, root keywords, no spam; principle #5). Written per category
at the copy stage; the structure is fixed here.

**D · Structured data**
- **BreadcrumbList** (Головна → Каталог → Категорія).
- **ItemList** / **CollectionPage** for the product grid.
- **FAQPage** (optional, if a «Часті питання» block ships on the category).

**E · Optimization checklist — incl. faceted-nav indexation (critical for a store)**
- **Faceted navigation control:** only a **curated whitelist** of facet pages is indexable
  (high-intent: brand-in-category, goal-in-category, the city variant 2.1a). All other filter
  combinations → `canonical` to the base category (or `noindex, follow`) to avoid index bloat
  and duplicate content. Decide the whitelist with keyword research [?].
- **Pagination:** numbered pages crawlable; each self-canonical; «Показати ще» must not hide
  links from the crawler (real `<a>` page links present).
- Single H1; descriptive crawlable anchors on subcategory + goal chips; images `alt` + lazy-load
  below the fold; LCP not blocked; availability/certification as text, not images; Core Web
  Vitals; українська мова контенту.

---

## SEO city variant (2.1a)
The same listing scoped + localized for a city («Протеїн Одеса»): H1 and copy include the city,
delivery info localized, canonical to the city URL. Driven by the canonical city list (0.1a) +
footer city links (0.2). Which cities become landing pages first = a traffic-priority call [?].

## Accessibility
Filter panel reachable and operable by keyboard; bottom-sheet traps focus, ESC closes, focus
returns to «Фільтри». Active-filter chips are buttons with clear labels. Sort = a labelled
control. Grid is a list semantically; cards keyboard-focusable; tap targets ≥ 44px. Result count
announced via `aria-live` after filtering.

## Mobile (360px)
Single-column grid (2 cards/row). Sticky «Фільтри» + «Сортування» bar. Filters open as a
**bottom-sheet** with «Застосувати (N)». Subcategory + goal chips scroll horizontally. SEO text
collapsible at the bottom. Tab «Каталог» active.

---

## Locked (draft) / open
**Locked (draft, 2026-06-30):** one shared listing template for Category / Catalog-all / Goal /
Brand / Search; inherited filter panel (left rail desktop, bottom-sheet mobile) with the
`catalog.md` facets; goals as a concern-lens chip row inside the listing; canonical product card
with availability states + quick-add; load-more **plus** crawlable numbered pagination; A–E SEO
block with explicit faceted-nav indexation control; SEO city variant 2.1a.

**Still [?] (operational / data, not IA):**
- Faceted-nav indexation **whitelist** (which facet/brand/city pages get indexed) — keyword research.
- Which city pages (2.1a) launch first — traffic priority.
- Per-category SEO copy and FAQ content — copy stage.
- Default sort weighting (популярні) — needs analytics; начально = ручний/маржа+продажі.
