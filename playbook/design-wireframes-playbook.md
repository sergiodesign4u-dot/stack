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
- **Next** — Step 1: read sitemap/flows/jtbd + the IA specs' States sections, build
  `wireframes/_screens.md` (screen × state, main-flow first). Then Step 2 `_conventions.md`.
