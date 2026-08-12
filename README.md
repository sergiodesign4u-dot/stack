# Stack

A mobile-first sport nutrition store for the Ukrainian market, built around coaches and gyms who
order for their athletes. Turns a confusing catalog into a clear, trusted path from a person's goal
to the right products.

**Entry point:** https://sergiodesign4u-dot.github.io/stack/ - the project route with every stage and
its status. Every page carries the same left sidebar, rendered from one registry (`/_nav.js`), so
there is no page list to maintain here.

## Status

| # | Stage | Status |
|---|-------|--------|
| 01 | Foundation Research | Done |
| 02 | User Research (personas + JTBD) | Done |
| 02+ | CJM (As-Is + To-Be) | Done - Olena x main job, emotions sourced live; added the order status notification to the MVP |
| 03 | Information architecture | Done - base layer, detail layer, node hub and block bank |
| 04 | Wireframes | Done - grey clickable prototype, 141 screens + hub |
| 05 | Voice | Done - rulebook + microcopy inventory, rolled out to the prototype |
| 06 | Concept | Done - visual language on two screens |
| 07 | UI + Visual | Done - component kit and inventory; the coloured layer is 87 screens of 141 plus the stage hub, counted 2026-08-12 (46 buyer + 41 coach; A13 brought 8 at step 7.95, step 8.7 added three, step 8.13 two, and step 8.14 the 35 page states the grey layer already drew) |
| 08 | Tokens + Components | In progress - 82 component files, 87 pages in `design/kit/`: the architecture sheet and `pixel-proof.html` among them. The coach flow is in colour and its own navigation no longer leaves it (A13 + step 8.7, 11 screens). Step 8.10 cleared the eight leftovers that needed no owner decision, and `badge.css` gained a second kind - the outlined badge, one shape that had been living under four names in four files. Step 8.12 took four owner decisions: A6's measured half (`product-thumb.css`, one box that was living under two names), A9 closed (the price grid, not the label), and the native checkbox takes the system's look. Step 8.13 measured section C before building and found a quarter of it wrong - 17 of the grey layer's 142 screens are empty states and 25 grey states of already-coloured screens are a clone away, not a design job; «no orders» and «no addresses» are coloured. Step 8.14 cloned the 35 grey page states whose base was already coloured - 48 candidates counted, 13 of them dialogs the coloured screen already opens - and the transform is `tools/clone-to-colour.mjs` now. Step 8.15 built the 10 states that existed nowhere - four new declarations in total, because the atoms were already there - and closed section C. Step 8.17 translated the private `<style>` blocks of 30 coloured screens that were still speaking the grey layer's variable names - an undefined custom property is silent, so `coach-verify-tier` had been drawing white ink on white paper past all four gates (`tools/vars.mjs`, `tools/grey-vars.mjs`). Step 8.18 asked the question no gate had asked: **803 of the 2882 internal links in `design/` went nowhere, against 0 of the 1579 in `wireframes/`** - 650 because the kit stand and its demo sit one directory apart and share their markup, 152 the tirage into the 41 screens still grey-only, 1 the design hub's favicon (`tools/links.mjs`, the fifth check). Next: section D's `[?]` numbers, then Крок 6 (rename) after stage 09 |
| 09 | Design System | Not started |
| 10 | Responsive | Not started |
| 11 | Animation | Not started |
| 12 | Handoff | Not started |

This table and `done:` in `/_nav.js` are the only two places status is written. `CLAUDE.md` holds
rules and never a status.

## Repository

```
_nav.js  _nav.css  index.html    roadmap registry, its look, and the entry point
research/     stages 01, 02, 02+   research, competitors, benchmark, AARRR, UX patterns,
                                   personas, JTBD, CJM
ia/           stage 03             base layer (flows, concept map) + detail layer
                                   (sitemap, structure, per-node specs)
wireframes/   stage 04             grey clickable prototype, frozen after Voice
voice/        stage 05             voice rulebook + microcopy inventory
design/       stages 06-09         concept/, colour theme, kit/, system/, product screens
docs/         decisions.md (why anything is the way it is) + playbook/
tools/        the checks a step runs before it says done - see tools/README.md
```

Each stage folder holds md sources of truth in `docs/` and its html visualization flat in the root.
`index.html` is always the home page of the folder you opened; a hub is always `overview.html`.

**Before any step says done:** `node tools/accept.mjs` (every screen at 390 - overflow, console
error, em dash, curly apostrophe, doubled crumb), `node tools/css-comments.mjs` (every stylesheet
in a second - CSS is silent about an orphaned comment and it once reached a screen), and
`node tools/states.mjs` when the step touched a dialog, a drawer or an overlay. No server to start
and no page list to type: each finds its own.

## Key documents

- [CLAUDE.md](CLAUDE.md) - project rules in force (200-line budget)
- [AGENTS.md](AGENTS.md) - entry point for an external reviewer
- [docs/decisions.md](docs/decisions.md) - decision records and the build journal
- [DESIGN-artifacts.md](DESIGN-artifacts.md) - visual language and the origin of every value
- Sources of truth: [`research/docs/`](research/docs/) · [`ia/docs/`](ia/docs/) ·
  [`wireframes/docs/`](wireframes/docs/) · [`voice/docs/`](voice/docs/)
