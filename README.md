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
| 07 | UI + Visual | Done - component kit and inventory; the coloured layer is 91 screens of 142 plus the stage hub, counted 2026-08-19 (46 buyer + 41 coach; A13 brought 8 at step 7.95, step 8.7 added three, step 8.13 two, and step 8.14 the 35 page states the grey layer already drew) |
| 08 | Tokens + Components | Done - **84 component files, and every one of them carries a stand page**; two token levels with a dark theme written over the semantic block; `kit.css` deleted at step 8 and the sample moved onto `system/index.css` with a pixel proof. Step 9 closed it: `/impeccable audit` ran, and the dry run over 54 grey screens with no coloured twin found **228 classes in 79 families with no component**, of which exactly one family crosses more than two screens - `info-*`, the content page, on six. Recorded as A19 and deferred on purpose: those six screens are still grey, so a component built now would be worn by nobody. Why any of it is the way it is: `docs/decisions.md`. |
| 09 | Design System | Done - **one pattern, nine rules of use, and a proof that the pattern moved nothing**. The product was repeating one composition by hand under **53 container names**; `patterns/action-row.css` now holds it - 4 rules, 3 classes, **zero colour declarations of its own**, imported after the components. 13 container names in 10 component files were **cut out**, not copied, and the 15 coloured screens wearing `actions` were converted with **0.000% pixel movement on all 15** (`proof.mjs --against`, working tree vs `c07e2c8`, both halves shot live in one browser). The same counter run backwards gave the prohibitions: **U1-U9 in `architecture.md` section I**, each with its «where it came from» filled, echoed as an «Обмеження» sub-item on 27 component pages. `why.html` is the stage's roadmap page. The self-sufficiency test built a real product node (`goal` 2.2 plus three states) with **no private styles at all** and a backlog that is not empty - 6 gaps, one of them a missing IA screen. **Two token rungs were added on the way** (`--warm-400` `#AA9D8A`, `--warm-500` `#9A8B73`), because dark secondary text had no rung. Step 6 ran two instruments plus the contract as a third: **28 findings confirmed, 5 withdrawn on verification and left visible**, a second Codex pass over the repaired files that caught the repair three times, and **four instruments that had been answering a false zero** - `links.mjs` had never read a `src`, `proof.mjs` could not prove a screen without a stored baseline, `inventory.mjs` never asked its own summaries, and nothing at all asked whether a path NAMED in an md still exists (`tools/paths.mjs`, new). Open and waiting on the owner, listed on `pixel-proof.html`: the dark-theme contrast hole on `.hptag`, 61 anatomy captions naming a zone without a class, and the 43 screens the composition stands on but has not been converted to - which is stage 12. |
| 10 | Responsive | In progress - steps 1-4 done, steps 5 and 6 left. **The census found 36 raw width values, 27 after mirroring, 18 acting in the product, and not one token for any of them**; `@container`, `container-type`, `clamp()` and `rem`-in-a-media-query were all at zero while 53 of the 88 files in `design/system/` already carried an `@media`. Step 2 wrote **two points in `rem`, named by the change and not by a device** (`--bp-grid-2col` 38.75rem, `--bp-shell-wide` 53.75rem), plus `--container-page`, `--container-text` in `ch` and two grid floors, and moved the type ramp from `px` to `rem` value for value. Step 3 took the shell fork: **form A**, chosen by the owner and already in the code - measured with the new `tools/tab-walk.mjs`, which presses a real Tab: at 1280 exactly **one** navigation carrier, focus on an invisible element **0**. Step 4 round 1 closed the atoms: **N = 23, M = 9, K = 14**, four off-registry numbers gone (479 twice, 1040, and 639 moved to the file that owns it), and the skeleton grid was found promising **four columns of 185px where the real grid gives three of 248** - both now agree to the pixel. Measured across all 92 coloured pages: **0 boxes moved at 360**. The page is `design/kit/responsive.html`. **The registry of components was rebuilt at step 4 because the first measurement was wrong three times over** - it asked the frozen grey corpus, then read `class="..."` statically, then took every class token instead of only the ones a single file owns; `tools/comp-width.mjs` carries all three wrong versions. Step 4 round 2 closed the molecules: **N = 27, M = 23, K = 4**, and the level went from **37 queries over 14 widths to 30 over 11** - every off-registry number left stands in the two files held on three owner questions (`trust-strip`, `seo-text`). The round's own roll-call was overruled by measurement in four places: `auto-fit` fills a row and cannot express the balanced arrangements of a FIXED item count, so six goal tiles, six brand logos and three blog cards keep a point. It also found a defect nothing had asked about - the restock row's e-mail field was **26 pixels wide from 420 all the way to 1600**, hidden by the very query that was defending its own boundary. New instrument `tools/grid-sweep.mjs` asks the resolved track list at every width from 320 to 1600; it was wrong twice first, and both versions are in its header. Measured again across all 92 coloured pages: **0 boxes moved at 360**. Step 4 round 3 closed the organisms, the heaviest level: **N = 34, M = 32, K = 2**, and the level fell from **86 queries over 19 widths to 80 over 7** - across all of `design/system/` it is now **117 queries on 13 widths**, with every off-registry number confined to four deliberately held files. Its largest finding is that `product-grid` carried **two queries that had never painted** (the stage-08 colour half out-declares them, so the census had counted 1040 as an acting boundary when it acts on nothing) over a grid that **lost a column as the window grew** - 3 columns at 520, 2 at 620 - because the floor switched 150 to 200 at the point. The switch became a ramp. The account proved to be a **second shell** and folded onto `--bp-shell-wide` by default, since a third point needs the owner to name it. Measured: **0 differences in 184 comparisons** at 360 and 1280, which is the expected result - every folded number lies between the anchors, where only the width sweep can see it. Step 4 round 4 closed the patterns - **N = 1, M = 1, K = 0**, the one pattern holds no query at all - and resolved the four held files. **The whole of `design/system/` is now 116 queries on SIX widths**: 619, 620, 859, 860 and the pair 939/940 that step 5 owns, against the **27 different width values with no token** the census found at step 1. The mascot folded cleanly beside the SEO text and BROKE beside the trust strip (four cells of 167, two clipping), so its reserve and its crop box became ramps. New instrument `tools/bp.mjs` reads the registry out of `tokens.css` and fails on four silent classes; all four were proved by being introduced and reverted. The `@media`-in-a-screen-file ban is written in `design/system/CLAUDE.md` (rules 11 and 12) and `architecture.md` section J, and the `Width` column now covers all 84 inventory rows, derived rather than typed. Left: step 5 (the coach split-view) and step 6. |
| 11 | Animation | Not started |
| 12 | Rollout | Not started |
| 13 | Handoff | Not started |

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

## The design system

The system is a product of its own, with three readers and one entrance for each of them. It is live
on GitHub Pages together with the rest of the repository; nothing here needs a separate deploy.

- **[Why it is the way it is](design/kit/why.html)** - the guide. Where the visual language came
  from, how the values reached the tokens, how to use the system and how to grow it. Start here if
  you have never seen this system before.
- **[The showcase](design/kit/overview.html)** - all 84 components as cards, grouped by the ladder of
  levels, each with its own page: anatomy, variants, when to use, rule and anti-rule, states in both
  themes.
- **[Patterns](design/kit/patterns.html)** - the level above a component: stable compositions the
  product already repeats, the rule for when to take one, and the candidates waiting for a third
  screen.
- **[Architecture and the rules](design/kit/architecture.html)** - the decision sheet, the rules of
  use (section I) and the contribution rule (section J).
- **[Backlog](design/kit/backlog.html)** - what the system could not do, and what was found and
  deliberately not fixed.

**The contribution rule, in one line:** new appears in `design/system/` first, then on the screen,
never the other way round. A screen declares no styles of its own; what it lacks is an order for the
system. Ten lines of it live in the code, in `design/system/CLAUDE.md`.

**Two clicks from the root**: the sidebar of any page is the roadmap registry, and «Дизайн-система ->
Чому саме так» is the row that opens the guide.

## Key documents

- [CLAUDE.md](CLAUDE.md) - project rules in force (200-line budget)
- [AGENTS.md](AGENTS.md) - entry point for an external reviewer
- [docs/decisions.md](docs/decisions.md) - decision records and the build journal
- [DESIGN-artifacts.md](DESIGN-artifacts.md) - visual language and the origin of every value
- Sources of truth: [`research/docs/`](research/docs/) · [`ia/docs/`](ia/docs/) ·
  [`wireframes/docs/`](wireframes/docs/) · [`voice/docs/`](voice/docs/)
