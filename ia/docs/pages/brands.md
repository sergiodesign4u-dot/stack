# Page-level IA — Brand index (node 2.4)

- **Node:** 2.4 Brands. The **parallel index** — an «all brands» page (A–Z grid of brand cards),
  **structurally different** from a brand *listing* (products of one brand, which the shared listing
  template 2.1 covers). One is a **navigation hub**; the other is a PLP.
- **Type:** index page (A–Z card grid).
- **Canonical visual:** `ia/brands.html`. This markdown is the source of truth.
- **Each brand card →** the **brand listing** (2.1 with `scope=brand`, H1 «Бренд {назва}», own SEO block).
- **Entries:** meta-bar «Бренди» (Navigation 0.1), a mega-menu column, the footer SEO block.
- **Brands = the real shared pool** from `category-matrix.md` (24 UA-available brands), each with a country.

## Anatomy

Breadcrumb (Каталог → Бренди) → H1 «Бренди спортивного харчування» + short **trust intro** (only
original/certified brands — Principle 1) → **toolbar** (brand **search** · **country** filter · **category**
filter · **A–Z**) → **popular brands** (top cards, real sales/traffic) → **all brands A–Z** (card grid: logo
· name · country · product count) → unique **SEO text** → footer. Grouped by letter (Latin + a «А–Я (UA)»
group for Ukrainian brands).

## Why a separate page (not the listing)

The brand **listing** (2.1) answers «show me Optimum's products». The brand **index** (2.4) answers «what
brands do you even carry» — a **different intent** (choosing by brand trust) and a separate SEO surface. Same
relationship as the Catalog hub (2.0) vs a Category listing (2.1).

## States

- Default → popular on top + full A–Z list. Brand search → instant client filter; empty → «Бренд не
  знайдено» + reset. Letter A–Z → scroll/filter to that group; letters with no brands dimmed. Country
  filter → only США / Польща / Україна / … (brand has a country). Category filter → brands that have
  products in the category. Card → brand listing (2.1). New brand → optional «new» badge.

## SEO

- **`index, follow`** — a valuable navigation/link page. URL `/brands` (index) · `/brands/{slug}` (brand
  listing 2.1). Schema **CollectionPage + BreadcrumbList** (ItemList optional); brand logos = `<img alt>`.
  It's a **second index→listing bridge** (like the Catalog hub for categories); linked from the meta-bar +
  mega-menu + footer SEO block. Full A–E per `seo.md`. The index passes weight to brand listings, which rank
  for «{brand} купити україна».

## Locked (2026-07-01)

1. **Index ≠ listing:** 2.4 is the «all brands» navigation hub (A–Z grid); a brand's products = listing 2.1
   with `scope=brand`.
2. **Real brand pool** (24, from the category matrix): global + Ukrainian; each has a country.
3. **Toolbar:** brand search (instant filter) + country + category + A–Z; popular on top.
4. **Trust (Principle 1):** only original/certified — noted in the intro.
5. **Indexable** (CollectionPage + Breadcrumb); a second internal-link bridge index→brand-listings.

## Open questions [?]

- **Product counts** per brand + which brands are **popular** — real catalog/sales data.
- **Brand logos** — real files (placeholders now).
- **Final launch brand list** — depends on distributor agreements (operational).
- **Ukrainian brands in A–Z** (Cyrillic) — a separate «А–Я (UA)» group vs the main list — design detail.
