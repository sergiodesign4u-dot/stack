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
| 10 | Responsive | In progress - steps 1-4 done, steps 5 and 6 left. **The census found 36 raw width values, 27 after mirroring, 18 acting in the product, and not one token for any of them**; `@container`, `container-type`, `clamp()` and `rem`-in-a-media-query were all at zero while 53 of the 88 files in `design/system/` already carried an `@media`. Step 2 wrote **two points in `rem`, named by the change and not by a device** (`--bp-grid-2col` 38.75rem, `--bp-shell-wide` 53.75rem), plus `--container-page`, `--container-text` in `ch` and two grid floors, and moved the type ramp from `px` to `rem` value for value. Step 3 took the shell fork: **form A**, chosen by the owner and already in the code - measured with the new `tools/tab-walk.mjs`, which presses a real Tab: at 1280 exactly **one** navigation carrier, focus on an invisible element **0**. Step 4 round 1 closed the atoms: **N = 23, M = 9, K = 14**, four off-registry numbers gone (479 twice, 1040, and 639 moved to the file that owns it), and the skeleton grid was found promising **four columns of 185px where the real grid gives three of 248** - both now agree to the pixel. Measured across all 92 coloured pages: **0 boxes moved at 360**. The page is `design/kit/responsive.html`. **The registry of components was rebuilt at step 4 because the first measurement was wrong three times over** - it asked the frozen grey corpus, then read `class="..."` statically, then took every class token instead of only the ones a single file owns; `tools/comp-width.mjs` carries all three wrong versions. Step 4 round 2 closed the molecules: **N = 27, M = 23, K = 4**, and the level went from **37 queries over 14 widths to 30 over 11** - every off-registry number left stands in the two files held on three owner questions (`trust-strip`, `seo-text`). The round's own roll-call was overruled by measurement in four places: `auto-fit` fills a row and cannot express the balanced arrangements of a FIXED item count, so six goal tiles, six brand logos and three blog cards keep a point. It also found a defect nothing had asked about - the restock row's e-mail field was **26 pixels wide from 420 all the way to 1600**, hidden by the very query that was defending its own boundary. New instrument `tools/grid-sweep.mjs` asks the resolved track list at every width from 320 to 1600; it was wrong twice first, and both versions are in its header. Measured again across all 92 coloured pages: **0 boxes moved at 360**. Step 4 round 3 closed the organisms, the heaviest level: **N = 34, M = 32, K = 2**, and the level fell from **86 queries over 19 widths to 80 over 7** - across all of `design/system/` it is now **117 queries on 13 widths**, with every off-registry number confined to four deliberately held files. Its largest finding is that `product-grid` carried **two queries that had never painted** (the stage-08 colour half out-declares them, so the census had counted 1040 as an acting boundary when it acts on nothing) over a grid that **lost a column as the window grew** - 3 columns at 520, 2 at 620 - because the floor switched 150 to 200 at the point. The switch became a ramp. The account proved to be a **second shell** and folded onto `--bp-shell-wide` by default, since a third point needs the owner to name it. Measured: **0 differences in 184 comparisons** at 360 and 1280, which is the expected result - every folded number lies between the anchors, where only the width sweep can see it. Step 4 round 4 closed the patterns - **N = 1, M = 1, K = 0**, the one pattern holds no query at all - and resolved the four held files. **The whole of `design/system/` was then 116 queries on SIX widths**: 619, 620, 859, 860 and the pair 939/940 that step 5 owned, against the **27 different width values with no token** the census found at step 1. The mascot folded cleanly beside the SEO text and BROKE beside the trust strip (four cells of 167, two clipping), so its reserve and its crop box became ramps. New instrument `tools/bp.mjs` reads the registry out of `tokens.css` and fails on four silent classes; all four were proved by being introduced and reverted. The `@media`-in-a-screen-file ban is written in `design/system/CLAUDE.md` (rules 11 and 12) and `architecture.md` section J, and the `Width` column now covers all 84 inventory rows, derived rather than typed. Step 5 built the one behaviour the audit named and nothing else: **the coach split view, both pairs**. The threshold is the pack's own - two or more list-and-detail pairs, or one pair of the main flow - and both hold: the saved clients list beside one client's record, and the session strip beside that client's basket. The detail screen is **not** cancelled (`coach-client.html` keeps its URL, breadcrumbs and SEO block), the panel opens **empty** on purpose with six new rows in `microcopy.md`, and the frame and the panel have **one edition** - `wfClientSplit()` builds them, so a screen states nothing about width and the rule falls out on its own: **no list means no split** (`empty` and `error` have no cards; `loading` does get the frame, or the page would jump at 860 the moment data arrives). Moving the client strip inside `.cs-grid` on all eight session screens spent **939/940**, the last pair deliberately off the registry - and `tools/bp.mjs` immediately **failed**, because its `EXCUSED` list no longer covered anything, which is the idle control working. **`design/system/` is now 117 queries on FOUR widths: 619, 620, 859, 860, and nothing else.** New instrument `tools/split.mjs` asks `getBoundingClientRect` whether the frame really has two columns and whether the two panes really sit in them, and rolls the whole corpus for a page that carries the list and stands outside a frame; five failure classes, each proved by being introduced on purpose, two wrong versions in its header. Two things the instruments could not find: `.cldetail-empty` was **`.emptybox.mini` written a second time** inside another component's file, so `.et` and `.es` matched nothing and heading and body rendered at the same size - found by opening the page, because no instrument asks whether a heading looks like a heading; and **22 of the 84 component stand pages describe a width their own file no longer holds**, of which step 5 repaired the two it touched. One question is open for the owner and costed in `backlog.md`: at the point the detail pane is **224px**, narrower than the rail, because the account shell takes its own 268px column - `@media` is answering about the SCREEN when the frame needs the PLACE. Measured: **282 screens, 0 failures at 390 and at 360**. **`/impeccable critique` then ran as two isolated agents and scored the result 24/40**, and its verdict was not a defect list: the specificity was SPLIT and the halves inverted - the session pair is authored for the coach channel and got layout only, the clients pair is a contact list with the labels changed and got all the new interaction engineering. Every repair follows from that. The panel's rows were Ціль / Телефон / E-mail while the card above it carried «8 замовлень · останнє 12 черв. 2026» - **the detail was less domain-relevant than the summary it detailed**; rows are now Ціль · Замовлень · Останнє замовлення with the coach's note promoted into a marked strip. Two names per destination collapsed to one, and `?client=` - the contract this step invented and then dropped at every action - now travels with both the panel's buttons and each card's own links. The card stopped claiming `role="button"` while containing two links; the claim moved onto the client's NAME. The session strip claimed `role="tablist"` with **no handler anywhere** and is now the same selection model the clients rail uses. Both new controls declare `--ring-focus-control` instead of falling through to Chrome's blue. **And the backlog's open question was closed by taking the ladder's own answer**: `container-type` on `.acc-main` plus `@container (min-width: 41rem)` on the frame, where 41rem is derived rather than chosen - rail + gap + the smallest panel worth opening. The split now opens at a **990** viewport with a **354px** pane; the 224px pane is gone. The first version of that was WRONG and the instrument caught it in one run: a bare `@container` turned the split on below 860 and off between 860 and 960, because **the place is not monotonic in the viewport**. Two gates in rank order fixed it. `tools/split.mjs` was rebuilt to declare each frame's RULE and sweep 320-1600 at 10px rather than assert where the point is - its third wrong version, written in its header. Four session screens clip between 320 and 350 and a `git stash` against the pre-step-5 tree proved every one identical on the baseline. **Two owner debts then closed by decision.** The header search collapsed to 44px between the shell point and ~1010; the owner chose to let the action labels go, and it became a CONTAINER question rather than a point - the ROW runs out of room and its width is not the window's, so `container-type` on `.wfh-main` with the words going at `@container (max-width: 63rem)`, a threshold that is the sum the row must hold with them in. The words are hidden from the eye, not the reader: `display: none` would have stripped the accessible name off four controls whose only text this is. **Half closed, and the estimate was wrong about the other half**: the actions give back 44px, not the predicted 408, because the buttons keep icons, padding and badges - the field goes 44 → 88 at the point and the words return at 1040. And the bonus action wore a `star` while the three actions beside it named their job, because the 67-glyph set had no mark for MONEY; the owner chose a new `coin`, two concentric circles at the set's own stroke, which reached the stand automatically because `icons.html` renders the set live. One new debt opened and is recorded: `header.css` now repeats the five visually-hidden declarations `menu.css` already carries. **Then a debts pass, and three of its four findings were about the CHECKS.** The dark-theme hole is closed and the backlog's diagnosis was wrong about the mechanism: not `--bg-page` in `banner.css` but `--bg-inverse` in `hero.css` - «inverse» means «opposite of the page» so the whole family flips, and `--text-action` does not flip with it. The owner chose a ground of its own: a new semantic family whose **two halves are deliberately equal** (`--bg-media` and its three companions), argued on the grounds that a promo panel is a PICTURE surface and the two tiles beside it carry photographs, which do not learn a theme. `theme.mjs` re-run: **35 forms with 1 broken by the theme → 28 with 0**. The 20 stand pages describing widths their files no longer hold are closed, and **11 of the 49 ghost numbers were legal** - 8 pages name history, 3 style their own demo tables, and the first measurement counted those wrongly. Nine pages carried a stale CURRENT claim and were rebuilt; the «У файлі N медіа-умов» lists are now GENERATED from the file rather than typed. **And it is checked now**: `inventory.mjs` gained class H2 with both legal classes declared and idle-controlled, both failure modes proved by introduction. `tools/vars.mjs` then caught the hover added an hour earlier to fix a missing hover state: it reached for `--bg-hover`, **a token declared nowhere**, so the declaration was invalid at computed-value time and the hover drew nothing - fixed by reusing `--bg-sunken`, which every other hovered row already takes. «Обране» duplicated across two carriers was WITHDRAWN on verification - at 360 there is exactly one visible carrier. The search placeholder shortens on the narrow row by asking the OUTPUT rather than copying the 63rem threshold. Gates: accept 282/0 at 390 and 360 · vars 0 · theme 0 broken by theme · bp · links · split · inventory all clean. Left: step 6, and the owner deferred the 92-page sweep until after Animation. |
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
