# Page-level IA — Catalog (hub / landing, node 2.0)

- **Node:** 2.0 Catalog — the **top entry to the store**: a navigation hub of all categories +
  goals. **Not** a product listing (that is Категорія 2.1) and **not** the taxonomy doc
  (`catalog.md` = the structure/tree). This is the actual «Каталог» page a user lands on.
- **Type:** hub / landing page (tiles + cross-links), mobile tab «Каталог».
- **Canonical visual:** `ia/catalog-page.html`. Source of truth = this file.
- **Relation:** structure/taxonomy → `catalog.md` (`ia/catalog.html`); per-category content →
  `category-matrix.md`; the listing template → `category.md` (2.1).

## Why a separate hub (2.0) vs listing (2.1)
- **2.0 Каталог** = "where do I want to go" — 12 category tiles + 6 goal tiles + popular. No filter
  panel, no product grid. One tap → a category listing (2.1) or a goal collection (2.2).
- **2.1 Категорія** = the product listing with filters/sort/grid.

## Block order (mobile-first)
0. **Header** — inherited (0.1).
1. **Breadcrumb** — Головна / Каталог.
2. **H1 «Каталог» + short intro** (trust-first, 1–2 sentences).
3. **За ціллю** — the 6 goal tiles (concern lens; → goal collection 2.2). Beginners' lens.
4. **Категорії** — the 12 category tiles (icon + name + a few subcategory hints; → 2.1).
5. **Популярні товари** — optional product row (canonical card; → 3.0/6.0).
6. **SEO text** — catalog-level description (H2 + ready copy).
7. **Footer** — inherited (0.2).

## SEO block (A–E, summary)
- **H1:** Каталог
- **Title (≤60):** Каталог спортивного харчування — купити | Stack
- **Description (≤155):** Каталог спортивного харчування: протеїн, креатин, амінокислоти, вітаміни,
  батончики. Оригінал, сертифікати, доставка по Україні. Оберіть категорію або ціль.
- canonical `/catalog/`; hreflang uk/ru/x-default; BreadcrumbList + ItemList (categories).
- Ready SEO text + per-page rules per `seo.md`.

## States
Default (all tiles). No empty state (always has categories). Coach/buyer header state inherited.

## Mobile (360px)
Goal tiles 2 cols, category tiles 2 cols, popular row scroll. Tab «Каталог» active.

## Locked (draft, 2026-06-30)
2.0 is a **hub** (tiles + goals), not a listing; `catalog.html` reframed as the **structure**
(«Структура» group); the «Каталог» page in the «Сторінки» group = this 2.0 hub. SEO per `seo.md`.

## Open [?]
- Popular-products source (manual vs sales-driven) — analytics.
- Whether 2.0 also exposes an "all products" listing link (likely yes, secondary CTA).
