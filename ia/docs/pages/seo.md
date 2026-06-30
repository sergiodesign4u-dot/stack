# Page-level IA — SEO methodology & keyword reference (Stack, UA sportpit)

- **What it is:** the project's SEO engine — principles, keyword model, sportpit keyword clusters,
  intent modifiers, Title/Description/H1 templates, SEO-text structure, schema and a technical
  checklist. With this, ready, on-brand, optimized Ukrainian copy can be generated for any page
  **at the IA stage**; only search-volume validation waits for real data.
- **Canonical visual:** `ia/seo.html`. This markdown is the source of truth.
- **Feeds:** every page's A–E SEO block (`home.md`, `category.md`…), the category content matrix
  (`category-matrix.md`), the footer SEO links (`footer.md`).
- **Volumes [?]:** search volumes / difficulty need Ahrefs · Serpstat · Google Keyword Planner ·
  Google Search Console. Until then volume columns are `[?]`; structure + draft copy are final.

---

## 1 · Principles (Stack-specific)
1. **Trust-first copy** (Принцип №1): lead with safety/quality (сертифікати, оригінал, склад,
   дозування), then sell. Reduces doubt — matches the beginner persona.
2. **Plain Ukrainian** (Принцип №5): everyday words in nav/labels; depth in body text. Root
   keywords used naturally, **no keyword stuffing**.
3. **Intent match:** each page targets one dominant intent (commercial / informational) and one
   primary keyword; supporting keywords are LSI, not repetition.
4. **One H1 per page**, logical H2→H3; every section has a meaningful heading.
5. **Internal linking** with descriptive crawlable anchors (categories ↔ subcategories ↔ goals ↔
   brands ↔ cities). Footer + mega-menu are the two main linking surfaces.
6. **Faceted-nav indexation control:** only a curated whitelist of facet pages is indexed; the rest
   canonical-to-base / noindex,follow (avoid index bloat — critical for a store).
7. **Bilingual reality (uk/ru):** UA users search both Ukrainian and Russian. Site is **uk-first**
   (canonical uk), with `ru` hreflang. Don't mix languages on one URL; mirror content per locale.
8. **Technical hygiene:** mobile-first, Core Web Vitals, alt text, lazy-load, clean URLs,
   sitemap.xml, breadcrumbs.

## 2 · Keyword model
- **Head** (high volume, broad): `протеїн`, `креатин`, `вітаміни`.
- **Body** (commercial): `купити протеїн`, `протеїн ціна`, `сироватковий протеїн`.
- **Long-tail** (specific, high-intent / informational): `протеїн для набору маси для початківців`,
  `як приймати креатин`, `протеїн без лактози купити`.
- Map: head → Category H1; body → Category Title/Description + subcategory pages; long-tail →
  subcategory/goal/filter pages, product pages and blog articles.

## 3 · Intent modifiers (UA) — combine with the head term
**Commercial:** купити · ціна · вартість · в Україні · [місто] · оригінал · дешево · знижка ·
акція · замовити · доставка.
**Choice / quality:** найкращий · рейтинг · відгуки · який обрати · топ.
**Informational (blog/FAQ):** як приймати · дозування · для чого · користь · протипоказання ·
коли пити · скільки.
**Audience / goal:** для набору маси · для схуднення · для відновлення · для жінок · для чоловіків
· для початківців · для витривалості.

## 4 · Keyword map by page type
| Page type | Primary pattern | Example | Intent |
|---|---|---|---|
| Home (0.0) | спортивне харчування + купити/Україна | спортивне харчування купити Україна | commercial |
| Category (2.1) | [категорія] + купити/ціна | купити протеїн ціна | commercial |
| Subcategory | [тип] + купити | сироватковий протеїн купити | commercial |
| Goal (2.2) | спортхарчування для [цілі] | спортивне харчування для набору маси | commercial+info |
| Product (3.0) | [бренд] + [назва] + [фасування] | Optimum Whey Gold Standard 2.27 кг | transactional |
| Brand (2.4) | [бренд] + в Україні | Optimum Nutrition Україна | commercial |
| City (2.1a) | [категорія] + [місто] | протеїн Одеса | local commercial |
| Blog (8.1) | як/чому/скільки + тема | як приймати креатин | informational |

## 5 · Sportpit keyword clusters (UA) — volumes [?]
Per category: primary + key body/long-tail. Volume/difficulty = `[?]` (fill via tools). uk + ru
variants noted where the ru form is common.

- **Протеїн:** протеїн (uk) / протеин (ru) · купити протеїн · протеїн ціна · сироватковий протеїн ·
  ізолят протеїну · протеїн для набору маси · протеїн без лактози · рослинний протеїн.
- **Гейнери:** гейнер · купити гейнер · гейнер для набору маси · гейнер ціна.
- **Креатин:** креатин · креатин моногідрат · купити креатин · як приймати креатин · креатин ціна.
- **Амінокислоти:** bcaa · купити bcaa · eaa · амінокислоти · глютамін · bcaa для чого.
- **Передтренувальні:** передтреник · передтренувальний комплекс · pre workout купити · бустер азоту.
- **Жироспалювачі:** жироспалювач · л-карнітин · карнітин для схуднення · жироспалювач для жінок.
- **Ізотоніки:** ізотонік · купити ізотонік · електроліти · енергетичний гель біг.
- **Батончики/снеки:** протеїновий батончик · батончик без цукру · замінник харчування · арахісова паста.
- **Вітаміни:** вітаміни · вітамін d3 купити · омега 3 · магній · цинк · вітаміни для імунітету.
- **Здоров'я:** колаген купити · глюкозамін хондроїтин · мелатонін · пробіотики · ашваганда.
- **Аксесуари:** шейкер · шейкер для спортпиту · атлетичний пояс · кистьові бинти · лямки для тяги.

## 6 · Title / Description / H1 templates
- **Title (≤60):** `[Head] — [модифікатор: купити/ціна] [в Україні] | Stack`
  - e.g. `Креатин — купити креатин моногідрат, ціна | Stack`
- **Description (≤155):** `[Що є / типи] від перевірених брендів. [Trust: оригінал/сертифікати].
  [Доставка/оплата]. [CTA/ціль].`
- **H1 (single):** the bare category/entity name (`Креатин`), no «купити» spam in H1.
- **Goal page H1:** `Спортивне харчування для [цілі]`.
- **City page H1:** `[Категорія] [Місто]` + localized delivery line.

## 7 · SEO-text structure (the body block at page bottom)
1. **Intro (trust)** — what the category is + quality signal (1–2 sentences).
2. **How to choose** — types/use-cases in plain language (the value for the beginner), with root
   keywords woven naturally.
3. **Close (trust/logistics)** — сертифікація, доставка Новою Поштою, оплата, повернення.
- Length: ~600–1200 characters; keyword density ~1–2%; use LSI/synonyms, not repetition.
- Place **below** products+filters; «Читати більше» on top can anchor to it.

## 8 · Structured data by page type
| Page | Schema |
|---|---|
| Home | Organization · WebSite + SearchAction |
| Category / listing | BreadcrumbList · ItemList / CollectionPage · (FAQPage опц.) |
| Product | Product + Offer (price, availability) · AggregateRating · BreadcrumbList |
| Brand | BreadcrumbList · (Brand) |
| Blog article | Article / BlogPosting · BreadcrumbList |
| FAQ block | FAQPage |

## 9 · Technical SEO checklist
- canonical on every page; paginated pages self-canonical; faceted combos canonical-to-base.
- hreflang uk / ru / x-default; no language mixing per URL.
- clean human-readable slugs (`/protein/`, `/protein/isolate/`, `/brand/optimum-nutrition/`).
- XML sitemap (categories, subcategories, products, brands, city pages, blog); robots.txt.
- breadcrumbs (BreadcrumbList) on all deep pages.
- images: descriptive `alt`, lazy-load below fold, compressed; LCP element not blocked.
- Core Web Vitals (LCP/CLS/INP) in green; mobile-first.
- internal links as real crawlable `<a>` (load-more must not hide pagination links).

## 10 · Tools & process
- **Tools (volumes [?]):** Ahrefs / Serpstat (UA market) · Google Keyword Planner · Google Search
  Console · Google Trends (uk vs ru split).
- **Generation process (how a page text is produced):**
  1. Pick the page type → its primary keyword pattern (§4).
  2. Pull the category cluster (§5) + intent modifiers (§3).
  3. Fill Title/Description/H1 templates (§6).
  4. Write the body with the 3-part structure (§7), trust-first, no stuffing.
  5. Add schema (§8) + run the technical checklist (§9).
  6. Validate volumes/difficulty later with tools; refine wording, not structure.

## Open [?]
- Real search volumes / difficulty / SERP competitors — tool data (Ahrefs/Serpstat/GKP).
- uk-vs-ru query split per cluster — Search Console / Trends after launch.
- Final faceted-nav indexation whitelist — keyword research.
- Blog topic plan (informational long-tail) — content stage.
