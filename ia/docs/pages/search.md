# Page-level IA — Search (node 2.5)

- **Node:** 2.5 Search. **Two parts:** the **header autocomplete/suggestions overlay** and the
  **search results page** (which reuses the shared listing template — same as Category 2.1).
- **Type:** overlay (suggestions) + results page.
- **Canonical visual:** `ia/search.html`. This markdown is the source of truth.
- **Job:** the **known-item utility** — the regular buyer who knows what they want (Andriy restocks).
  Secondary to catalog navigation (grounded: the reference store **Belok.ua** leads with catalog nav,
  search is a supporting utility).
- **Grounding:** suggestions draw on **real project data** — categories (`catalog.md`), popular queries
  (footer 0.2 SEO block), brands (2.4), goals. Results reuse the listing template (`category.md`).

## Suggestions overlay (autocomplete)

- **Empty (focus, no input):** recent searches (history — logged-in / local) + **popular queries**
  (from the footer SEO block). Guest without history sees only popular.
- **Typing ≥ 2 chars:** groups — **query completions** (with result counts) · **categories/brands**
  (from catalog + brand index 2.4) · **product previews** (3–4, thumb + name + price) · **«Показати
  всі результати»**. Keyboard: ↑↓ select, Enter → results.
- **< 2 chars:** hold the empty state (don't fire on 1 letter). Debounced; skeleton while loading.

## Results page (= listing template, scope «query»)

Same skeleton as Category (2.1): H1 «Знайдено N товарів за запитом …» + count → toolbar
(**default sort = relevance**, then price/newest/rating, all **within availability-first**) → filter
rail (same facets as catalog) → **canonical cards** (name match highlighted) → «Показати ще». Differs
from Category only in **H1, query scope, and the SEO block** (here noindex). Product → PDP (3.0), 🛒 →
cart (6.0). Load-more **without** crawlable numbered pages (results aren't for the index).

## No results (never a dead end)

«За запитом "…" нічого не знайшли» + **«Можливо, ви шукали»** (spelling correction) + **goal tiles**
(2.2) + **popular queries** + catalog link. Honors the «one clear next step» principle. Typo-tolerance /
synonyms live in the **search engine [?]** (operational).

## Entry

- **Desktop:** the search field is always visible in the header main bar (Navigation 0.1).
- **Mobile:** a **🔎 icon** in the top bar opens a **full-screen search** (field + suggestions) — search
  is not a bottom-nav tab (consistent with Navigation: «search stays in the top bar»).

## States

- Focus/no input → recent + popular. `<2` chars → hold empty. `≥2` + matches → suggestions. Loading →
  skeletons (debounce). Has results → results page (relevance, highlight). No results → correction +
  goals + popular. Exact match (SKU/EAN) → optionally straight to PDP [?]. Active filter on results →
  same facets/chips/reset as Category.

## SEO / indexation

- **Results = `noindex, follow`** — standard SEO practice (internal search = thin/duplicate, index-bloat
  risk); follow so the crawler still traverses cards. URL `/search?q={query}`, not in sitemap.xml. No
  schema on results; site-level **WebSite + SearchAction** (sitelinks searchbox) lives in Navigation/Home.
- Real search queries are a **signal for SEO landings** (categories, goals, cities) — those are what gets
  indexed, not the search results.
- A11y: field = `combobox`, list = `listbox`/`option`, `aria-activedescendant`; result count in `aria-live`.

## Locked (2026-07-01)

1. **Search = known-item utility**, secondary to catalog nav (as Belok).
2. **Suggestions overlay** (recent + popular + queries + categories/brands + product previews) from **real
   project data** (catalog.md, footer 0.2, brands 2.4).
3. **Results = shared listing template** (2.1), default sort = relevance; differs by H1 + scope + SEO.
4. **No results is never a dead end** (correction + goals + popular + catalog).
5. **Results noindex, follow**; WebSite+SearchAction stays site-level.
6. Entry: desktop field always in header; mobile 🔎 icon → full-screen (not a tab).

## Open questions [?]

- **Search engine:** typo-tolerance, synonyms, UA/RU morphology, ranking — tech choice (Meilisearch /
  Typesense / Elastic).
- **Relevance ranking** weights (name/brand/availability/popularity) — tuning.
- **Exact SKU/EAN match** → straight to PDP or list — decision.
- **Popular queries** — from real analytics (currently a hypothesis from the footer list).
- **Voice / barcode search** — post-launch.
