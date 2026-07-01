# Page-level IA — Content, info & legal (node 8.x)

- **Node:** 8.x — Content, info & legal. **13 nodes (8.0–8.12)** specced as **one template system**,
  not 13 bespoke layouts (the same dedup approach as the category matrix).
- **Type:** SEO-surface + service pages + one footer component.
- **Canonical visual:** `ia/content.html`. This markdown is the source of truth.
- **Serves:** **Principle 1 (trust first)** — guarantee, certificates, returns, FAQ are on show; and
  the **second internal-linking hub** after the footer SEO block.
- **Entries:** footer columns · meta-bar «Акції» · product page «Сертифікація» → certificates.

## 13 nodes → 6 templates (dedup)

| Node | Page | Template | Index |
|------|------|----------|-------|
| 8.2 | Про нас | **Info page (A)** | index |
| 8.3 | Контакти | Info page (A) + **contacts block** | index |
| 8.4 | Доставка й оплата | Info page (A) | index |
| 8.5 | Обмін і повернення | Info page (A) | index |
| 8.6 | Legal (privacy · terms · **public offer**) | Info page (A), legal variant | index, low-prio |
| 8.7 | Система знижок | Info page (A) + **table** | index |
| 8.8 | Гарантія та сертифікати | Info page (A) + **certificate gallery** | index (trust) |
| 8.9 | FAQ | **FAQ accordion** | index + FAQPage |
| 8.0 | Каталог блога | **Blog listing** | index |
| 8.1 | Стаття | **Article** | index + Article |
| 8.10 | Акції / Промо | **Promo listing** | index |
| 8.11 | Відгуки про магазин | **Reviews** (3.1 card) | index + AggregateRating(Org) |
| 8.12 | Підписка на розсилку | **State/component** (footer field) | noindex |

Common to all: inherited header/footer · breadcrumb · H1 · full A–E SEO block (per `seo.md`).

## Templates

1. **Info page (A) — covers 8.2–8.8.** Breadcrumb → H1 + updated-date → **TOC** (long pages) +
   **prose body** (H3 sections, lists, info cards) → related links. Variants: **contacts block** (8.3
   — phone/hours/email/messengers/map, single source of truth with the footer), **table** (8.7 discounts),
   **certificate gallery** (8.8, viewable docs like PDP 3.0), **legal** (8.6 — prose + date, no TOC).
2. **FAQ (8.9)** — grouped **accordion** Q&A; **global shop FAQ**, separate from product Q&A (3.2);
   **FAQPage schema** for rich results.
3. **Blog listing (8.0)** — tags/categories · search · pagination; SEO surface for top-of-funnel
   informational queries. **Article (8.1)** — H1 · SEO body (simple answer first) · **Article schema** ·
   breadcrumb · **related products** (canonical cards → 3.0, internal linking) · related articles.
4. **Promo listing (8.10)** — active promos; entry = meta-bar «Акції»; **calm, no timers** (Principle 4
   — «до …» date, not a countdown); each promo → a collection/listing (2.x) or a product.
5. **Reviews (8.11)** — reviews about the **shop** (service/delivery), separate from product reviews
   (3.1); same review card; «Залишити відгук» dialog (like 3.1a) + «Оцінити в Google»;
   **AggregateRating on Organization**.
6. **Newsletter (8.12)** — a **footer component**, not a page: email field + welcome discount [?] +
   states (empty → loading → success/double-opt-in + promo code / error / unsubscribe). A small
   «subscription confirmed» state page after the email click. **noindex.**

## Trust guarantee page (8.8) detail

Trust row (original · certificates · 14-day return · manufacturer guarantee) + **certificate gallery**
(per brand + MOZ declaration), each opening the viewable document — the same certificate the PDP links
to. This page is linked from the **footer trust strip** and the PDP «Сертифікація» block.

## SEO / indexation

- Info/legal (8.2–8.8): index (legal low-priority) · BreadcrumbList; Organization on About/Contacts.
- FAQ (8.9): index · **FAQPage**. Blog (8.0/8.1): index · **Article** + BreadcrumbList; listing =
  CollectionPage. Promo (8.10): index. Store reviews (8.11): index · **AggregateRating(Organization)**.
  Newsletter (8.12): **noindex** (component).
- Every indexed page carries the full A–E block (`seo.md`). This cluster is the **second internal-link
  hub** after the footer SEO block.

## Locked (2026-07-01)

1. **Small template system (6)** instead of 13 layouts; pages = data in a template.
2. **Info page (A)** covers 8.2–8.8 with variants (contacts · table · certificates · legal).
3. **Trust serves Principle 1** — guarantee/certs/returns/FAQ on show; linked from the trust strip and PDP.
4. **Shop FAQ** separate from product Q&A (3.2); **shop reviews** separate from product reviews (3.1).
5. **Promo calm, no timers** (Principle 4).
6. **Contacts = single source of truth** with the footer; **newsletter = footer component** with states
   (double opt-in).
7. Content pages **index** (A–E + schema); newsletter **noindex**. Second internal-link hub after the footer.

## Open questions [?]

- **Ready copy** for every page (About, delivery, returns, legal, FAQ Q&A) — copywriting stage.
- **Real certificate files** and permits — operational.
- **Discount/loyalty/tier/subscription numbers** — from Decision 3 / unit economics [?].
- **Legal texts** (privacy, terms, public offer) — lawyer.
- **Launch blog volume** and content plan — marketing.
