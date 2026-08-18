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
| 08 | Tokens + Components | In progress - steps 1-8 done. **84 component files, and all 84 have a stand page**; 98 pages in `design/kit/`, the census moved to its foot. Two token levels with a dark theme over the semantic block; `kit.css` deleted at step 8 and the sample runs on `system/index.css`. The coach flow is eight organisms, in colour, with its own pages. Gates: `accept` 275 screens 0 failures at 390 and 360 · `roles` 84/0, none without a page or a table · `dead-sel` 0 selectors that never match · `idle` 83 pages 0 red · `links` 4921/0/0. Step 9: the closing ritual is done (`CLAUDE.md` 195/200) and the dry run has run - `tools/dry-run.mjs` over 54 grey screens with no coloured twin found **228 classes in 79 families with no component**, and exactly one family crosses more than two screens: `info-*`, the content page, on six. Recorded as A19 and deferred on purpose - the six screens are still grey, so a component built now would be worn by nobody. Left: `/impeccable audit`. Why any of it is the way it is: `docs/decisions.md`, 53 passes. |
| 09 | Design System | In progress - step 1 done 2026-08-13: **the dark end of the warm ramp**. The scale had eight rungs and no surface between lightness 34 and 11, so a dark theme had exactly one value to stand on; it now has twelve. `--warm-950` `#191612`, `--warm-850` `#26211B`, `--warm-800` `#2D2821`, `--warm-750` `#39332A` - hue and saturation from `#F2F0ED`, the plate's locked Warm Neutral, lightness from the light end's own steps in L\* (2.1 / 3.1 / 3.2 / 5.0), and `#1C1C1C` unchanged because the mirror agrees with where it already is. Primitives only at the time; stage 08 step 7 now reads them. Measured on the way: **the accent clears full AA on every dark rung a word can sit on** (5.76 / 5.45 / 5.10 / 4.67), so A10's sub-AA compromise is a property of the pale grounds and is not inherited by the dark theme. Step 09.1b built a preview page to show it - **withdrawn and deleted 2026-08-13**, because the real theme replaced it; what it found before that was worth the step: **the two-level text hierarchy goes almost flat** (light 16.2 / 6.5, dark 16.2 / 12.1), because `--text-secondary` and `--text-muted` had no dark rung. Step 09.1c took those two: **`--warm-400` `#AA9D8A` and `--warm-500` `#9A8B73`** - the two numbers the ramp never had, and the hole they close is exactly where dark secondary text lives. The mirror lands to the hundredth on all three grounds (secondary light 6.84 / 6.50 / 6.02 against dark 6.78 / 6.41 / 6.00). Step 09.2 wrote **`design/kit/why.html`**, the page the registry owed. **Both 09.1 and 09.2 were taken off the pack** - stage 09's real step 1 is «патерни і заборони з екранів» and `why.html` is its step 3. The palette work stands (a dark theme needed it), the route the page drew did not and is corrected on the page itself. Next: stage 09 step 1 for real |
| 10 | Responsive | Not started |
| 11 | Animation | Not started |
| 12 | Handoff | Not started |

This table and `done:` in `/_nav.js` are the only two places status is written. `CLAUDE.md` holds
rules and never a status.

## The route to the end

**Corrected 2026-08-13, and the correction is the point.** The route written here that morning was
**invented**, not read out of the pipeline packs: it claimed the dark theme had to wait for a
"tirage" and that stage 08 owed steps 6, 7 and 8 in a made-up order. The packs in
`AI Design Workflow/` say otherwise, and they are the source of truth.

- **The dark theme is stage 08 step 7**, and it is a **stress test of the system**, not decoration
  at the end. It goes in early precisely because it breaks whatever is badly separated, and early
  is when that is cheap to fix. `08 - Tokens Components.md`: «пара тем обов'язкова з першого рядка
  ... роль без пари не існує». Built 2026-08-13.
- **The rollout is stage 12**, after Responsive (10) and Animation (11). A screen is assembled
  **once**, from a system that is finished; a component the rollout would lack has to be found
  before it drags states, a pattern, breakpoints and motion behind it.
- Stage 08's real steps 6, 8 and 9 are «звід системи з продуктом», «переїзд вибірки (піксельний
  доказ)» and «перевірка і фінал» - not what the task list paraphrased them into.

The withdrawn route is left visible on `design/kit/why.html` beside the real one, with the reason.
A route corrected silently comes back in the same words.

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
