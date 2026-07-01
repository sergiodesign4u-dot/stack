# Design Wireframes Process Playbook

A reusable, project-agnostic methodology for turning a finished information
architecture into a **clean, navigable, greyscale wireframe prototype**. Captured while
building **Stack** (a Ukrainian sport-nutrition e-commerce store), but written to be
lifted into other projects. Stack-specific examples are marked _(example)_.

This is the sibling of `design-ia-playbook.md`. IA answered *where* and *what*; wireframes
answer *how it is laid out and how you move through it* — still **before** any visual design.

> Conventions used in this repo (and recommended generally):
> - Markdown docs are written in **English**.
> - Live/visual pages (incl. wireframe HTML) are written in the **product language**
>   (Ukrainian for Stack).
> - Each artifact has **one source of truth**; the wireframe HTML files are themselves the
>   deliverable here (not a rendering of some other doc), governed by two control docs:
>   `wireframes/_screens.md` and `wireframes/_conventions.md`.

---

## Core idea

A wireframe is **structure, not appearance.** Greyscale, semantic HTML, real domain text —
**no decisions about colour, type, brand, imagery, shadows or icons.** Those belong to the
Concept and Design-System phases. The wireframe's two jobs:

1. **Structure** — real proportions, grid, spacing, hierarchy and zones for every screen,
   at every viewport (mobile-first, then desktop).
2. **Prototype** — the screens are linked along the user flows so you can **click through the
   whole product in a browser**, including transitions between states.

And the discipline that makes it honest: **no screen is done until its states are closed.**
The four *system* states — empty / error / loading / success — are the **floor**; the real
state set for each screen comes from its IA spec (roles, out-of-stock, no-address, etc.).

Nothing new should be invented in a wireframe. If a block, page or state appears here for the
first time, **fix the IA spec first**, then render it. (Same rule the IA playbook applied to
research → IA, now applied to IA → wireframes.)

## Phase model

```
Research → IA (global + page-level) → Wireframes → Concept → Design System → Components → Handoff
                                        ▲ you are here
```

Wireframes consume a **finished** IA library and produce the clickable greyscale prototype
that Concept then dresses in visual design. If the wireframe reveals a missing block or
state, that is an **IA defect** — patch upstream, don't invent downstream.

---

## Principle 1 — Structure, not appearance (the greyscale contract)

- **Detail level:** only structure, hierarchy and zones. Greyscale. **No** colour, fonts,
  brand, imagery, shadows, icons, or finished UI.
- **Markup:** semantic HTML (`header`, `nav`, `main`, `section`, `article`, `form`, `button`),
  not a pile of `div`s. Buttons and fields are real elements.
- **Text:** real domain text, never `lorem ipsum` or "Heading 1". _(Stack advantage: the text
  already exists — see Principle 4.)_
- **Deferred to later phases:** colour, type scale, shadows, icons, real imagery, motion,
  the finished component look. If you catch visual design creeping in, pull it back to grey.

## Principle 2 — States are first-class, and there are more than four

Each state is a **separate page**, not a toggle inside one file — because the prototype must
*navigate* between them (loading → success, error → retry, empty → filled).

- **System-state floor (always check):** empty · error · loading · success.
- **The real set comes from the IA spec's "States" section**, and for a real product it is
  usually richer: **role** states (guest / buyer / coach), **domain** states (out-of-stock →
  notify, no saved address, payment declined, untagged coach line), **transient** states
  (search-open, mega-menu open, drawer open). _(Stack example: the PLP's most important states
  are availability variants and the OOS→«Повідомити» state, not "loading".)_
- Do **not** add a "success" page automatically everywhere — only where there is a distinct
  "it worked" screen. Do **not** invent a state the scenario doesn't produce; if the spec's
  table has no such state, no page for it.
- **No dead ends:** every state has a visible exit/next action, reconciled against `flows.md`.

## Principle 3 — Mobile-first, fully responsive (two viewports per screen)

The product is fully responsive; **mobile is the priority.** Every screen is wireframed at
**both** the mobile baseline (_360px for Stack_) and desktop — the same §01 desktop / §02
mobile split the IA specs already use. Reason block priority and the first screen from mobile,
then lay out desktop deliberately (it is a store, not an app). Responsive is an explicit axis,
not an afterthought.

## Principle 4 — Inherit from IA, don't reinvent

The wireframe phase stands on a finished IA. It **quotes** upstream instead of re-deciding:

- **Real text + SEO structure** come from each node's A–E SEO block (ready H1, heading skeleton,
  body copy). The wireframe renders finished-but-provisional copy; production swaps in
  tool-validated copy. This is why Stack wireframes never need `lorem ipsum`.
- **Components** (header, footer, product card, filter panel, auth dialog, cart drawer) were
  documented as IA nodes. Wireframes **include** each component once and reuse it — they do not
  redraw the header on every screen.
- **CSS / tokens / sidebar** are inherited from the existing B/W wireframe style already used in
  the IA HTML (_Stack: the greyscale `#161616` accents, 360px mobile mocks, the unified left
  sidebar_). `_conventions.md` **references** that style; it does not start a new one — otherwise
  wireframes drift visually from the IA anatomies they extend.
- **States, filters, CTAs, flows** come from the IA spec and `flows.md`. The wireframe's job is
  to lay them out spatially and wire them, not to add new ones.

## Principle 5 — Etalon first, then roll out (and quality-etalon ≠ first-flow)

Make **one** screen fully — main view + all its state pages + the nav + real text — and let it
set the bar for detail, zone-labelling and text quality. Then clone the pattern across the rest,
using subagents (one screen / one flow per agent) against the same contract. Cheap, because the
contract (`_conventions.md`) and the etalon exist.

Two distinct choices, often different screens:
- **Quality etalon** = the **highest-reuse workhorse** (sets the pattern cheaply).
  _(Stack: the product listing / PLP — its template feeds category, goal, brand, search, and
  the coach session's product picking.)_
- **First flow assembled** = the flow with the **highest reuse of the etalon** (assemble it
  end-to-end first, cheaply, off the already-built pattern).
  _(Stack: the beginner conversion path — Головна → Категорія/листинг → PDP → кошик →
  оформлення — it rides directly on the listing etalon and reuses the most templates. The
  deeper coach multi-client flow (primary Job 1) comes next, reusing the same listing/PDP.)_

---

## Artifacts and file layout

```
wireframes/
  _screens.md        # the "order": screen × state matrix (rows = screens, cols = states)
  _conventions.md    # the contract: greyscale rules, markup, naming, states, responsive, inheritance
  _critique.md       # append-only defect log from the review step (what was wrong / what was fixed)
  <screen>.html          # base page = the SUCCESS state
  <screen>-empty.html    # one page per real state from the matrix
  <screen>-error.html
  <screen>-loading.html
  <screen>-<rolestate>.html   # e.g. -guest / -coach / -oos, when the spec calls for it
```

- **File names are Latin, screen names from the sitemap** (_e.g._ `listing.html`,
  `listing-empty.html`, `listing-oos.html`). One base page per screen (the success/default view)
  + one page per real state.
- **Each page carries the same nav tree** (see below) so you can reach any screen/state from
  anywhere.

### `_screens.md` — the screen × state matrix (Step 1 output)

Rows = screens (name exactly as in `sitemap.md`), columns = states. Mark `✓` where the state is
real, `—` where the scenario doesn't produce it. Per screen also record: the **job** it closes
(line from `jtbd.md`), its **place in the flow** (`flows.md`), and its **viewports** (mobile +
desktop). This table is the work order for every later step — an agent builds strictly to it.

### `_conventions.md` — the contract (Step 2 output)

Written once, read by every screen and every subagent. For Stack it **inherits** rather than
invents: point at the existing B/W CSS/tokens, the 360px baseline, the sidebar shell, the
§01/§02 desktop-mobile split, and the A–E text source. Then state the greyscale rules, semantic
markup, file/state naming, the "no dead ends" rule, and the "no new blocks — fix IA first" rule.

### Nav tree (Step 4)

Extend the existing unified sidebar into a **tree**: section → screen → its states, indented to
show nesting; every node is a link; the current one is marked. Same greyscale shell as the rest.
It doubles as a live index of coverage (you can *see* which states still don't exist).

---

## Per-screen wireframe checklist

Copy this per screen (it renders the IA spec, it doesn't re-decide it):

```
Screen: <name from sitemap>          Node/№: <X.Y>
Job(s) closed: <# from jtbd.md>      Flow position: <from flows.md>
Viewports: mobile (360) + desktop
Inherited components: <Header(role), Footer, ProductCard, FilterPanel, CartDrawer...>
Zones (priority order, mobile-first) + the ONE main action of each zone:
  1. <above the fold> — action: <...>
  2. ...
States to build (from _screens.md row) — each a separate page, each with a visible exit:
  success (base) | empty | error | loading | <role/domain states>
Text: real, from the node's A–E SEO block (H1 + headings + body)
Links out: <along flows.md — main action → next screen; state transitions>
```

---

## How to run it (the 9 steps)

Adapted from the reference prompt-pack. Steps 1–7 build the **main flow** as the pattern; step 8
rolls out the rest via subagents; step 9 reviews and finalizes.

0. **Set the contract mentally** — Principles 1–5. Confirm the etalon screen (highest-reuse
   workhorse) and the first flow to assemble (primary job).
1. **Choose screens** — read `sitemap.md`, `flows.md`, `jtbd.md`. List the **main-flow** screens
   (name · job · flow position · which of the 4 system states are real + which role/domain states).
   Build the `wireframes/_screens.md` matrix. No screen without a job and a flow position.
2. **Write the rules** — `wireframes/_conventions.md`, inheriting the existing CSS/tokens/sidebar/
   viewports/text-source (Principle 4). Don't draw screens yet.
3. **First screen (the etalon)** — the highest-reuse workhorse, success view, mobile + desktop.
   Semantic HTML, labelled zones each with a main action, real text from the A–E block. Sets the bar.
4. **Nav tree** — add the section → screen → states tree sidebar; put it on the etalon; every new
   screen inherits it.
5. **Four+ states of the etalon** — one page per real state (`-empty`, `-error`, `-loading`, plus
   any role/domain states), same structure, different content, each with a visible exit; link the
   states to each other at the top.
6. **Rest of the main-flow screens** — one file each, same pattern, each with its own real states
   from the matrix, tied to flow and sitemap.
7. **Wire the flow** — make each screen's main action a real `<a href>` to the next screen; wire
   state transitions (loading→success, error→retry, empty→filled); take branches **both** ways
   (not only the happy path); every state has an exit. Links only along `flows.md`, only to screens
   /states that actually exist.
8. **Roll out to the whole product** — same process for all remaining `sitemap.md` screens/flows,
   via **subagents** (one screen or flow per agent) against `_conventions.md` (contract) +
   the etalon (example). No sitemap screen left without a wireframe. Then reconcile: a table of any
   mismatches in zones / naming / nav.
9. **Review & finalize** — a scrupulous pass vs `_conventions.md`, `sitemap.md`, `flows.md`. First
   produce a defect table (`screen → what's wrong → how to fix`) covering: visual creep (colour/
   font/shadow/icon), placeholder text, missing states, dead ends, a zone with no main action, a
   screen not on the map. **Then** fix the files (dead ends + missing states first); log in
   `wireframes/_critique.md`. Finally update CLAUDE.md ("Wireframes") + README.md ("Wireframes")
   and push.

### Drift-correction re-prompts (when the model slips)

- **Visual crept in** → return the screen to greyscale per `_conventions.md`: structure/hierarchy/
  zones only, no colour/font/shadow/icon.
- **Placeholder text** → replace with real domain text from the node's A–E block.
- **Single-scenario screen** → build the remaining states as separate pages — exactly those marked
  in `_screens.md`, no invented ones.
- **Screen not on the map** → reconcile with `sitemap.md`/`flows.md`: tie it to a real flow position
  + job, or remove it.
- **State with no main action** → add a visible exit (empty → relax filters, error → retry,
  loading → success). No dead ends.
- **States crammed into one file with a switcher** → split into separate `-empty`/`-error`/
  `-loading` pages; keep the base page as the success state.

---

## Stack-specific decisions (locked here as we go)

- **Medium:** self-contained **HTML** on GitHub Pages, consistent with research + IA; the
  wireframes become a **clickable prototype** (real transitions between screens/states).
- **Fidelity:** **mid-fi that extends the IA anatomy** — IA §01 anatomy = schematic block order;
  the wireframe adds real proportions, grid, spacing, all states, responsive behaviour, and
  clickable transitions. Still B/W, no visual design.
- **Viewports:** mobile 360 + desktop per screen (§01/§02 split).
- **Etalon:** the **product listing / PLP** (highest reuse — shared listing template).
- **First flow assembled:** the **beginner conversion path** (Головна → Категорія → PDP →
  кошик → оформлення) — highest reuse of the PLP etalon; the coach multi-client flow (primary
  Job 1) comes next on the same listing/PDP templates.
- **Inheritance:** reuse the existing B/W wireframe CSS/tokens + unified sidebar; include IA
  components (header/footer/card/filter/cart) once; pull real text from each node's A–E SEO block.

---

## Project log — Stack wireframes (append-only)

- **2026-07-01** — Adopted this playbook. Confirmed with the user: medium = HTML (clickable
  prototype); fidelity = mid-fi extending the IA anatomy; two viewports (360 + desktop) per screen.
  Method sourced from a reusable 9-step prompt-pack (demo: "Куток"), adapted to Stack in five ways:
  (1) states = the spec's full set (role/domain), not just the 4-system floor; (2) responsive as a
  first-class axis; (3) inherit IA components instead of redrawing; (4) inherit the existing B/W
  CSS/tokens + sidebar; (5) etalon (PLP, max reuse) is distinct from the first flow assembled.
  First flow = the **beginner conversion path** (Головна → Категорія → PDP → кошик →
  оформлення), chosen for highest reuse of the PLP etalon; the coach flow (primary Job 1)
  follows on the same templates. Wireframe folder still empty; next = Step 1 (`_screens.md` matrix).
- **2026-07-01** — Steps 1–4 done. **Step 1** `_screens.md` (9 beginner-flow screens × states,
  Job 2+3). **Step 2** `_conventions.md` (greyscale contract, inherits IA CSS/text/components).
  **Step 3** etalon `listing.html` (Категорія 2.1) + shared `_wf.css` — verified at 360/1280.
  Etalon review (user) surfaced fixes now **locked in `_conventions.md`** and worth generalizing:
  header constrained to content width; «Каталог» primary+icon; header actions Увійти·Обране
  (stacked) · Бонуси·Кошик (bordered); toolbar «Знайдено: N» left / sort+view far right (⚠ never
  hang the `display:block` mobile-hide helper on a flex container — it kills the spacer); **type/
  subcategory = links to real pages, not facet checkboxes** (more pages = SEO weight); **card CTA/
  rows never shift** (reserve fixed row heights); **SEO body always fully expanded** (hidden text
  isn't indexed). **Step 4 — navigation reframed to FLOW-FIRST** (user idea, better for a
  clickable prototype): `index.html` «Всі екрани» coverage tree + thin per-screen prototype bar +
  a «Вайрфрейми» section in the project sidebar (Флоу 1 / Флоу 2·скоро / Всі екрани), all from one
  `_nav.js` source of truth. **Build order is now flow-by-flow**, not global steps. Lesson: build
  the etalon first precisely to catch component-level defects (header/toolbar/card) **before**
  cloning — and when the medium is a clickable prototype, navigate it **by flow**, not by a rail.
- **Method upgrade (reusable):** for any project, prefer **flow-first prototype navigation** — an
  «all screens» coverage index (single-source-of-truth array) + a thin per-screen bar + flow entry
  points — over a persistent nav rail that fights each screen's own layout.
- **2026-07-01** — **Step 5 done + a well-timed refactor.** Before cloning, extracted the truly
  global components — **header, footer, filter-rail, bottom-sheet — into `_nav.js` render functions**
  (injected into `#wf-header`/`#wf-footer`/`#wf-rail`/`#wf-sheet` placeholders), per conventions §7.
  Now each page is thin: only its unique zone differs. Built the etalon's 3 state pages
  (`listing-empty/-loading/-error`) — same structure, different results area, each with a **visible
  exit** reconciled to `flows.md` (empty → clear filters + goal chips; error → retry; loading →
  skeleton grid, resolves to base/error). The prototype bar marks the current state and links
  siblings. Lesson: the moment to **componentize is right after the etalon and before cloning** —
  extract globals into one render module so 30 pages inherit one header/footer, and state pages
  become a few lines. Also: only build states the scenario truly produces — dropped a redundant
  «filtered» page (the base already shows the filter-applied view).
- **2026-07-01** — **Step 5.5 (etalon completeness).** Before cloning, finished the listing pattern:
  flipped the base to the **clean/unfiltered** view and added **`listing-filtered`** (chips + narrowed
  + matching checked facets via a parametrized `wfCatalogRail([...])`) and **`listing-list`** (grid↔list
  ▦/☰ toggle as two linked pages; list card = image · info · price-middle+badge · ♡+cart-right). Lesson:
  a real view toggle is two linked pages, and a facet-rail should take its active set as a param so a
  chip and its checkbox always agree.
- **2026-07-01** — **Step 6 (Флоу-1 screens).** Built **home 0.0** (Foxtrot hero: category rail +
  banners, role personal strip, goal tiles, trust, product tabs, coach block, recently-viewed, promo/
  brands/blog, SEO) and **product 3.0** (PDP with **trust as the lead**: sticky tabs, gallery + buy box
  w/ variants + delivery/payment, trust strip, Склад/Дозування/Походження/Сертифікація, reviews w/
  shop-reply, Q&A, related, sticky mobile bar). Then applied the **Step-8 subagent fan-out to the rest of
  Flow 1** (the user's call — Step 8's method scoped to one flow): **6 general-purpose agents, one screen
  each** (goal · cart · checkout · auth · order-placed · account), each told to build ONLY its own html
  (base + states) using the shared `_nav.js`/`_wf.css`, put screen-specific CSS inline, and NOT touch the
  shared files (parent registers). **Reconcile pass:** flipped all `built`/`builtStates` in `_nav.js`;
  removed redundant per-agent `.wf-states` strips (rely on the unified prototype bar); swept greyscale
  (no colour leaks) + structure (css/bar/noindex/wfBar) + broken links; verified renders. Then completed
  coverage: **home-buyer/home-coach** (generated from home.html — swap the role strip + coach block only,
  structure identical) and **product states** loading/error/oos/reviews. Lessons: (1) for a parallel
  fan-out, keep agents **conflict-free** — own files only, inline CSS, parent owns the shared source +
  registration; (2) give each agent a **complete example** (product.html) + the contract so they clone
  the pattern rather than reinvent (result: zero colour leaks, consistent components); (3) a **reconcile
  pass is mandatory** after any fan-out (register, de-dup, sweep, verify).
- **Milestone — Флоу 1 COMPLETE (2026-07-01):** 35 html files, every beginner-flow screen + all states
  built and lit in `_nav.js`/`index.html`. Known minor mismatches deferred to Step 7: cart basket differs
  across cart/checkout/order-placed (illustrative data); `wfCatalogRail()` type group is protein-specific
  on the goal collection.
- **2026-07-01** — **Step 9 (critique) done for Флоу 1** + a promo-banner rework. Ran the critique as a
  **5-way parallel read-only audit** (home+listing · goal+product · cart+checkout · auth+order-placed ·
  account+coverage), each auditor given the allowed greyscale palette + the six-defect taxonomy + the
  reference docs, returning a defect table. Synthesised one prioritised table, showed it to the user
  **before touching anything** (the method's "table first" checkpoint), then fixed dead-ends/missing-states
  first. Fixes (full log → `wireframes/_critique.md`): **H1** the known cart-desync — locked ONE canonical
  basket across cart/checkout/declined/order-placed with **two honest money variants** (guest 3 999 ₴ vs
  logged-in 3 802 ₴), which also resolved a guest page that wrongly showed loyalty/bonus lines; **H2/H3**
  added the matrix-required states that were missing — `checkout-loggedin`, `checkout-noaddr`,
  `auth-loading` (registered in `_nav.js`); **H4** wired the payment happy path forward; **M1** newuser →
  account; **M2** account `noindex,nofollow`; **M3** softened (not removed) the modal shadow to the
  drawer's accepted low-alpha; **L1/L2/L5** button-ise fake `#`, drop motion, fix the flow-start link.
  Promo banner reworked to **IG-stories** (one visible portrait + segmented progress + prev/next). Also
  fixed a **cross-cutting sidebar bug**: «Флоу 2» was a `<span>` while `.sidebar-sub` sizing was scoped to
  `a`, so it rendered at body 16px — broadened the selector across all 23 research/ia pages. Lessons:
  (1) **audit fan-out wants the accepted-palette list up front** or auditors false-positive the project's
  own placeholder textures (the 45°-hatch is a *placeholder*, not a leak — one auditor flagged it, another
  correctly didn't; the critique keeps it); (2) a "colour/leak" finding is a **judgement call** — resolve
  it against what the rest of the prototype already accepts (low-alpha shadows, hatch placeholders), don't
  blanket-remove; (3) **canonical illustrative data** (one basket, stated once) prevents desync when many
  agents author sibling screens — record it in the critique so Step 8 reuses it.
- **Milestone — Флоу 1 COMPLETE + CRITIQUED (2026-07-01):** 38 html files; one canonical basket; no
  dead ends; every matrix-required state built and lit in `_nav.js`/`index.html`.
- **2026-07-01/02** — **Флоу 2 (Coach, Job 1) built + critiqued.** Approach = **hybrid, NOT a fresh
  9-step run**: the etalon + Flow-1 primitives are reused, so this was Step-8-for-one-flow. Because the
  one genuinely-new screen (**5.5 multi-client session**) had no precedent, hand-built it first as the
  coach **reference** (client tabs w/ per-client subtotals · in-session quick-add, NOT global search ·
  coach-tier price vs struck retail · tag-to-client · session summary) + its 5 recovery states, then
  **fanned out the other 6** (5.0 landing · 5.1 verify · 5.2 home=account-shell-coach-mode · 5.3 clients ·
  5.4 client · 6.0 cart grouped-by-client) via conflict-free subagents cloning 5.5 — with **canonical
  coach data handed to every agent** so cart-coach matched the session verbatim (no desync). Reconcile
  fixed `coach.html→coach-home.html`. **Step-9 critique** (5 auditors, coverage=0 defects) then caught:
  a **global `coach.html` 404** (footer/header/home/product/account all linked a screen that was never
  built → `coach-landing.html`); **session-state number drift** (oos/untagged/priceblock banners said a
  line was excluded while subtotals still counted it → recomputed); **coach-shell drift** between
  coach-home and coach-clients (identity, client count, order counts, nav label — canonicalised). Lessons:
  (1) when a placeholder node name (`coach.html`) is referenced by many screens before it's built, the
  real screen often lands under a **different filename** — sweep the old name globally at reconcile;
  (2) a **shared shell reused by parallel agents drifts** (each invents the profile card / counts / nav) —
  either hand one canonical block to all agents or extract the shell to a `_nav.js` component;
  (3) **recovery states that exclude a line must recompute every total** (line subtotal + summary +
  grand + mobile bar), not just show a banner.
- **Milestone — Флоу 1 + Флоу 2 COMPLETE + CRITIQUED (2026-07-02):** ~64 html; both flows internally
  consistent; coverage clean; critique log in `wireframes/_critique.md`.
- **Next** — remaining product areas via subagents (loyalty Job 6 / 8.7 · content 8.x · system pages ·
  listing instances catalog-hub 2.0 / brands 2.4 / search 2.5) + the IA gaps surfaced by the Flow-2
  critique (coach order-detail / order-history / client-edit nodes — spec first, then wire). Forward-ref
  `content.html` still links from ~50 screens; resolve when 8.x is built.
