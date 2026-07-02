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
- **Header + footer are inherited zones** (Navigation 0.1 / Footer 0.2) — shown as labelled
  zones on the wireframe, not re-specified here. The **«Каталог» breadcrumb → node 2.0**
  (Catalog/all-products, same template scoped to all).
- **Chips «за типом» + «за ціллю» live INSIDE the filter panel** (decided 2026-06-30), not as
  separate top chip rows — and the goal duplicate is removed (goals existed both as a chip row
  and as a «Ціль» facet). **Тип/субкатегорія** = the first filter group, but rendered as
  **links, not checkboxes** (refined 2026-07-01, wireframe review): each type is an `<a>` to its
  **own crawlable listing page** (e.g. `/protein/isolate/`) — more real pages = more SEO weight,
  and it matches the taxonomy (type = a subcategory page, not just a facet). True facets
  (availability, price, brand, goal, flavour, weight, country, certification) stay checkboxes/range.
- **Filter panel = inherited component.** Desktop: a **left rail** (sticky). Mobile: a
  **bottom-sheet** opened by a sticky «Фільтри» button (with active-count badge). Facets come
  straight from `catalog.md`: Тип · Наявність · Ціна · Бренд · Ціль · Форма · Смак ·
  Фасування/вага · Країна · Сертифікація — **populated with real values + counts** at the IA
  stage (this is content/structure work, not placeholders).
- **Sort = full visible option list** in the toolbar (not a small grey note): Популярні (default)
  · Спочатку дешевші · Спочатку дорожчі · Новинки · За рейтингом · За розміром знижки · За назвою.
- **Grid 4 cards per row** at wide desktop → 3 → 2 (mobile); the bigger Foxtrot-style card reads
  better at 4-up than the earlier 5-up.
- **Calm, trust-first** (principles #1, #4): no countdown timers; availability and certification
  are honest, plain-language signals on every card. The category intro reduces doubt before
  the grid sells; **«Читати більше» anchors down to the bottom SEO text** (not inline expand).
  The **bottom SEO text is always fully rendered** (never a read-more collapse) — hidden text
  isn't indexed (locked 2026-07-01).

---

## Block order (mobile-first)

0. **Header** — inherited (Navigation 0.1): meta bar · main bar · mega-menu · search · ♡ · cart.
1. **Breadcrumb** — Головна / Каталог / [scope-name] (BreadcrumbList schema; crawlable `<a>`;
   «Каталог» → 2.0). Scope-name = category · goal · brand · «Пошук». For the **goal collection (2.2)**
   it is **Головна / Каталог / [Ціль]** — **no intermediate «Цілі» node** (уточнено 2026-07-02: the
   goal.html wireframe’s extra «Цілі» crumb was removed to match this pattern; «Цілі» has no landing
   page — it is a mega-menu, so a crumb pointing at it was misleading).
2. **H1 + short intro** — category name + result count + 1–2 calm sentences (trust-first);
   **«Читати більше» → anchors down to the bottom SEO text**.
3. **Toolbar** — Sort (full option list shown) · results count · view toggle (сітка/список) ·
   on mobile the **«Фільтри»** button (active-count badge).
4. **Active-filter chips** — removable chips of applied facets + «Очистити все».
5. **Listing** — two columns on desktop (**filter rail** + grid), single column on mobile.
   - **Filter rail** holds ALL facets incl. **Тип (субкатегорія)** as the first/expanded group
     and **Ціль** (the goal chips moved here; the dupe removed).
   - **Product grid** uses the canonical card (`home.md`), **now propagated here**: vertical photo ·
     NEW/Хіт corner tag · ♡ · **brand·country eyebrow ABOVE the name** · name · **availability line**
     (в наявності / мало / під замовлення / немає) · price (new + old struck **+ −% badge next to the
     struck price**) + **icon-only 🛒 quick-add beside the price** · **rating after the price** ·
     per-serving + bonus meta. **OOS card** dims + swaps 🛒 for a **🔔 notify** button
     («Повідомимо, коли з'явиться»). **4 per row** (wide) → 3 → 2 (mobile).
6. **Pagination** — «Показати ще» (load-more) **plus** crawlable numbered pages for SEO.
7. **SEO text** — category description at the bottom (H2 + ready copy) — **unique per category**.
8. **Related** — popular brands in this category + related categories (internal linking).
9. **Footer** — inherited (0.2).

## Default card order (availability-first)
Cards are ordered **available first, then under-order, then out-of-stock last**:
1. **В наявності** (including «Залишилось мало») — shown first.
2. **Під замовлення** — after the in-stock block.
3. **Немає в наявності** — always last.
The user's chosen **sort applies WITHIN these availability groups** (so a sold-out item never
outranks an in-stock one). Out-of-stock is never hidden (SEO + «Повідомити про надходження»).

## Per-category SEO text + matrix
The SEO body text **lives at the bottom of the listing** (full width, below products+filters) and
is **unique per category**. Ready text + FAQ for all 11 categories are in the **content matrix**
(`category-matrix.md` / `ia/category-matrix.html`) — that is the "SEO-text matrix". Principles and
templates are in `seo.md` / `ia/seo.html`.

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
Brand / Search; header + footer as inherited zones (breadcrumb «Каталог» → 2.0); **chips «за
типом»/«за ціллю» moved into the filter panel** (goal dupe removed; subcategories keep own
crawlable URLs); inherited filter panel (left rail desktop, bottom-sheet mobile) **populated with
real values + counts**; full sort option list visible in the toolbar; canonical product card with
availability states + quick-add; **grid 4→3→2**; load-more **plus** crawlable numbered
pagination; A–E SEO block with explicit faceted-nav indexation control; per-category SEO text;
SEO city variant 2.1a.

**Pending decision (raised 2026-06-30): per-category content population.** Each category needs
its own filters subset, brand set, SEO meta/H1/text and FAQ. Brands/facets are largely shared
across categories (same product pool). Options: (A) a single **category content matrix** (one
structured artifact driving all 12 categories) — recommended; (B) a separate page/spec per
category (heavy, 12+ artifacts); (C) template + data table hybrid. To confirm with the user
before building.

**Still [?] (operational / data, not IA):**
- Faceted-nav indexation **whitelist** (which facet/brand/city pages get indexed) — keyword research.
- Which city pages (2.1a) launch first — traffic priority.
- Per-category SEO copy and FAQ content — copy stage (fed by the matrix once approach is chosen).
- Default sort weighting (популярні) — needs analytics; начально = ручний/маржа+продажі.
