# Wireframes — Conventions / the contract (`_conventions.md`)

Written once, **read by every screen and every subagent** (Steps 3–9). It defines *how* every
Stack wireframe is built so the whole set stays one consistent, greyscale, clickable prototype.
Adapted from the reusable prompt-pack, **grounded in what this project already has** — we inherit
the existing B/W wireframe vocabulary and the IA text, we do not invent a second system.

> Governs: `wireframes/*.html`. Sources it leans on: `wireframes/_screens.md` (the work order),
> `ia/docs/pages/*.md` (per-screen IA + A–E text), `research/docs/flows.md` (transitions, exits),
> `ia/*.html` (the existing `.wf` B/W vocabulary we reuse).

---

## 1. Detail level — structure, not appearance

- Only **structure, hierarchy and zones.** Greyscale. **No** colour, brand, real fonts (system
  stack only), shadows-as-decoration, icons-as-art, real photos, or finished UI.
- This is the same rule the IA mockups already follow inside their `.wf` blocks — the wireframe
  phase just makes those the **whole page** at real proportions, with all states and clicks.
- **Deferred to later phases** (do not do here): colour palette, type scale, iconography, real
  imagery, motion, elevation/shadow language, the finished component look. Green `--accent` and
  any brand colour belong to Concept — **never inside a screen canvas.**

## 2. Palette & styling — inherit, don't invent

- **One shared stylesheet: `wireframes/_wf.css`** — every screen `<link>`s it. Single source of
  truth for the greyscale system; change it once, all screens follow. No per-file style forests.
- **Greyscale-only tokens** (lifted from the existing `.wf` blocks in `ia/*.html`, stripped of colour):
  - ink `#1b1b1b` / strong `#111` · secondary `#777` · light `#999`/`#8a8a8a` · hairline `#e4e4e4`/`#cfcfcf`
  - surface `#fff` · rail/fill `#f4f4f4` · **filled/selected state `#161616` bg + `#fff` text**
    (e.g. active chip, primary button) — the one "dark" accent, greyscale.
  - radius 10px / 6px · system font stack (`-apple-system…`) · 1px hairline borders.
- **No colour semantics.** Availability, warnings, errors are shown by **text + position + weight**,
  not by red/green/amber. _(e.g. «Немає в наявності» is a label, not a red pill.)_

## 3. Markup — semantic HTML

- Real semantic elements: `header`, `nav`, `main`, `section`, `article`, `aside`, `form`, `button`,
  `a`, `input`, `label` — **not** a wall of `div`s. Buttons and fields are real, focusable elements.
- One `<h1>` per screen (from the node's A–E heading skeleton); `h2/h3` map to real on-page blocks
  in the IA order. Breadcrumb where the IA spec has one.
- Links that lead somewhere real use `<a href>` (Step 7 wiring); a control with no target yet is a
  `<button>` (never a fake `<a href="#">` that reads as a dead flow edge).

## 4. Text — real, from the IA (never lorem ipsum)

- **Quote the node's A–E SEO block** in `ia/docs/pages/*.md` for the H1, headings and body copy —
  Stack already has ready UA copy, so wireframes never need placeholders.
- Real domain content everywhere: real UA product names/brands/flavours from `category-matrix.md`,
  UA prices (₴), per-serving/bonus meta, real goal/category names from `catalog.md`, real filter
  facets. No "Заголовок 1", no `lorem ipsum`, no "Товар 1".
- Language = **Ukrainian** (product language), like every visual page in the repo.

## 5. Viewports — mobile-first, genuinely responsive (Principle 3)

- Each screen is **one responsive file** = the real product screen, **mobile-first**, reflowing via
  CSS media queries. **Not** two frozen frames — the prototype must actually adapt.
- **Mobile baseline 360px.** Desktop breakpoints follow the existing system (~720 / 860 / 1100).
  Reason block priority and the first screen from mobile; lay out desktop deliberately.
- Review = screenshot at **360** and at **~1280**. Both must be correct before a screen is "done".

## 6. Prototype navigation — flow-first (Step 4, decided 2026-07-01)

Navigation is **flow-first**, not a per-screen rail (a rail would clash with a screen's own
layout, e.g. the catalog filter rail). Three layers:

1. **`wireframes/index.html` = «Всі екрани»** — a greyscale hub showing the whole tree
   **флоу → екран → стани**; the **live coverage index** (built screens/states are links, planned
   ones are dashed/muted). Rendered from **`wireframes/_nav.js`** — the **single source of truth**
   (mirrors `_screens.md`); flip `built` / add to `builtStates` as screens are drawn.
2. **Thin prototype bar** (`<div class="wf-bar" id="wf-bar">` + `wfBar('file.html')`) at the very
   top of every screen: `« Всі екрани · <flow> · <screen>` + sibling-state links once built. Keeps
   the screen a clean product but never a dead end.
3. **Project sidebar** (green, on research/IA pages) has a top-level **«Вайрфрейми»** →
   Флоу 1 · Покупець / Флоу 2 · Тренер (**скоро** until built) / Всі екрани.

`_nav.js` is minimal vanilla JS, no libraries; both the tree and the bar read the same `WF_FLOWS`
array, so 30+ pages never drift by copy-paste.

**Build order is flow-first** (agreed): assemble **Флоу 1 (Покупець-новачок)** end-to-end — every
screen + its states + click-wiring — then **Флоу 2 (Тренер)**, with `index.html` tracking coverage
throughout. This groups the playbook's Steps 5–8 by flow rather than running them globally.

## 7. Inherited components — render once, include everywhere (Principle 4)

- Global components were specced as IA nodes; wireframes **reuse** them, they don't redraw the header
  on every screen. Componentized as shared CSS (in `_wf.css`) + a small render partial where practical:
  **Header/nav (0.1) · Footer (0.2) · Product card · Filter panel/bottom-sheet · Cart drawer (6.0) ·
  City dialog (0.1a) · Auth dialog (1.x).**
- The **product card** is the canonical one from the IA (`home.html`) — same markup/class everywhere;
  if it changes, it changes in one place. Listing grids = 4-up desktop.
- Checkout uses the **simplified header** (logo + support only) per `cart.md`, not the full header —
  reuse that variant, don't invent.

## 8. States — one page each, no dead ends (Principle 2)

- **File naming (Latin, from the sitemap):** base screen `wireframes/<name>.html` (= the default/
  populated view, i.e. the "success"/base), plus one page per real state
  `wireframes/<name>-<state>.html`. Same structure, different content.
  - System states: `-empty` · `-loading` · `-error`.
  - Role/domain states get an explicit suffix: `-guest` · `-coach` · `-oos` · `-noaddr` ·
    `-declined` · `-code` · `-newuser` · `-reviews` · `-account-end`, etc. — **exactly those
    marked for the screen in `_screens.md`.** Don't invent a state the matrix doesn't list.
- **Canonical name map** (from `_screens.md`, main flow):
  `home` · `listing` (etalon = Категорія 2.1) · `goal` (Ціль-колекція 2.2) · `product` (PDP) ·
  `cart` (drawer 6.0) · `checkout` (6.1) · `auth` (1.x dialog) · `order-placed` (6.2) ·
  `account` (7.0).
- **No dead ends:** every `-empty`/`-error`/`-oos` page has a **visible exit/next action**,
  reconciled against `flows.md` (empty collection → try another goal; error → retry; OOS →
  «Повідомити» + back-to-collection; payment declined → retry / back to cart).
- At the top of each state page, link the **sibling states** of that screen so they open side by side.

## 9. Flow wiring — the clickable prototype (Step 7)

- Each zone has **one main action**; the screen's main action is a real `<a href>` to the next
  screen along `flows.md`. Wire **state transitions** too (loading→success, error→retry, empty→filled).
- Take **branches both ways** (guest vs register; in-stock vs OOS), not only the happy path.
- Link **only** along routes in `flows.md`, and **only** to screens/states that actually exist.

## 10. The prime directive — nothing new is invented here

- A wireframe **renders** the IA; it does not add blocks, pages, states, filters or CTAs. If
  something is needed that the IA spec doesn't have, that's an **IA defect** → fix
  `ia/docs/pages/*.md` (+ its `.html`) **first**, then render it. Keep the two layers in sync.

## 11. Housekeeping

- No external libraries, no frameworks, no web fonts, no tracking. Minimal vanilla JS (nav-tree
  render + any state toggle that a real screen genuinely needs, e.g. opening the cart drawer).
- Keep the repo clean: no stray screenshots committed; wireframe files live only in `wireframes/`.
- Drift-correction re-prompts live in `playbook/design-wireframes-playbook.md` (§Drift-correction).

---

## Locked refinements (2026-07-01, from the etalon review)

These apply to **every** wireframe (fix once in `_wf.css`, all screens inherit):

- **Header width:** meta bar + main bar content are constrained to the **content width**
  (`.wfh-in`, max 1200) — nothing touches the viewport edges.
- **Header height:** give the main bar breathing room (≈14px vertical padding) — controls not
  jammed against the top/bottom edges.
- **Header hierarchy:** «Каталог» = **primary** (filled dark) **with an icon**; «Цілі» secondary.
- **Search** fills all remaining free space between the nav and the action cluster.
- **Header actions order (locked): Увійти · Обране · Бонуси · Кошик.**
  - **Увійти / Обране** = **stacked icon-over-label**, borderless (light).
  - **Бонуси** = bordered button, two-line (cap «Бонуси» / value «Отримати» for guest, balance
    for logged-in). **Кошик** = bordered button, icon + «Кошик» when empty; when full → icon left,
    right = small «Кошик» + sum under it (+ item counter later, at the states pass).
- **Listing toolbar:** **«Знайдено: N товарів» on the left**; **sort dropdown + view-toggle pinned
  to the far right** of the content column (a flex spacer between). ⚠️ Build gotcha: never hang the
  `.only-desk` helper (which sets `display:block`) on a **flex** container — it kills the spacer;
  hide such containers on mobile with their own media query and keep `display:flex` on desktop.
- **Active filters:** **«Очистити все» first**, then the selected-filter chips.
- **Taxonomy vs facets:** a **type / subcategory** is a **link to its own listing page**
  (`.flink`, more pages = more SEO weight), **not** a facet checkbox. True facets (availability,
  price, brand, goal, flavour, country, certification) stay checkboxes/range in the rail/sheet.
- **Card stability:** the price + buy/notify button (and every card row) **never shifts between
  cards** — reserve fixed row heights (name 2 lines, availability, rating) so OOS/short cards
  align with full ones. No `margin-top:auto` pushes that depend on variable lower content.
- **SEO body text is always fully expanded** — **never** a «read more» collapse (hidden text
  isn't indexed). Top-of-page «Читати більше ↓» is only an anchor jump to the open block.
- **Listing base = the clean/unfiltered view** (no active-filter chips; facets unchecked; full
  count). **Filtered** (active-filter chips + narrowed count + matching checked facets) is a
  **separate state page**. Keep the two consistent — pass the active set to the shared rail
  (`wfCatalogRail([...])`) so a chip and its facet checkbox always agree.
- **Grid ↔ list view toggle** is real: **two pages** (`listing.html` grid ▦ / `listing-list.html`
  list ☰), the ▦/☰ control links between them, active view marked. **List card layout:** image ·
  brand/name/availability/meta · **price in the middle** (struck old price **+ discount badge**,
  then new) · **right = ♡ + clean icon cart button** (🛒 / 🔔 for OOS). Reserve the old-price row
  height so prices align across rows.

## Build order (per the playbook's How-to-run)

1. **Step 3 — etalon:** `wireframes/listing.html` (Категорія 2.1), base view, mobile + desktop,
   real text from `category.md` A–E. Sets the bar.
2. **Step 4 — nav-tree:** `_wf.css` + `_nav.js`, put the greyscale tree on the etalon.
3. **Step 5 — etalon states:** `listing-empty/-loading/-error/-filtered.html`.
4. **Step 6 — rest of the main flow:** `goal`, `product`, `cart`, `checkout`, `auth`,
   `order-placed`, `account` + each one's states from `_screens.md`.
5. **Step 7 — wire the beginner flow** end to end (clickable).
6. **Step 8 — roll out** the deferred set (coach/reorder/loyalty/content/system) via subagents.
7. **Step 9 — review** → `_critique.md` → fix → update CLAUDE.md/README → push.

**Do not draw screens yet in this step.** Next action = Step 3 (the etalon).
