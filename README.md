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
| 08 | Tokens + Components | In progress - 82 component files, 87 pages in `design/kit/`: the architecture sheet and `pixel-proof.html` among them. The coach flow is in colour and its own navigation no longer leaves it (A13 + step 8.7, 11 screens). Step 8.10 cleared the eight leftovers that needed no owner decision, and `badge.css` gained a second kind - the outlined badge, one shape that had been living under four names in four files. Step 8.12 took four owner decisions: A6's measured half (`product-thumb.css`, one box that was living under two names), A9 closed (the price grid, not the label), and the native checkbox takes the system's look. Step 8.13 measured section C before building and found a quarter of it wrong - 17 of the grey layer's 142 screens are empty states and 25 grey states of already-coloured screens are a clone away, not a design job; «no orders» and «no addresses» are coloured. Step 8.14 cloned the 35 grey page states whose base was already coloured - 48 candidates counted, 13 of them dialogs the coloured screen already opens - and the transform is `tools/clone-to-colour.mjs` now. Step 8.15 built the 10 states that existed nowhere - four new declarations in total, because the atoms were already there - and closed section C. Step 8.17 translated the private `<style>` blocks of 30 coloured screens that were still speaking the grey layer's variable names - an undefined custom property is silent, so `coach-verify-tier` had been drawing white ink on white paper past all four gates (`tools/vars.mjs`, `tools/grey-vars.mjs`). Step 8.18 asked the question no gate had asked: **803 of the 2882 internal links in `design/` went nowhere, against 0 of the 1579 in `wireframes/`** - 650 because the kit stand and its demo sit one directory apart and share their markup, 152 the tirage into the 41 screens still grey-only, 1 the design hub's favicon (`tools/links.mjs`, the fifth check). Step 8.19 closed **A10 by the owner's call** - sub-AA accent text is accepted for this shop, nothing on screen changes - after re-counting, because the 7.81 census read 40 screens and there are 88: the sheet's biggest line (`.badge`, 28 at 2.91) had been ink since 8.10, the `₴` was counted as passing when it is 56 of 62 failures, and **the largest failing shape in the product - `.on` «Українська», 82 of 88 screens - had never been rendered by any census**, because `states.mjs` matched two opener names typed by hand, one of them dead and three real ones missing. **Step 7 done 2026-08-13, and it was overdue**: `[data-theme="dark"]` had never been written, so steps 3 and 5 had each delivered half their contract (the pack: «пара тем обовʼязкова з першого рядка... роль без пари не існує»). 85 semantic roles now carry a dark half, 23 dark-side primitives derived by one rule - hue and saturation kept, lightness solved so each colour stands to the dark page as its light twin stands to white. `design/system/theme.js` applies the choice in `<head>`, before the first paint, and the switch is in the stand's panel (step 4's debt). Next: the pack's real steps 6, 8 and 9 |
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
  is when that is cheap to fix. `08 - Tokens Components.md`: «пара тем обовʼязкова з першого рядка
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
