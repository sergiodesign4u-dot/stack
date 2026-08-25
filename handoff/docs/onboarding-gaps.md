# Onboarding gaps - the order this stage works from

Not a report. **A commission.** Every row must get an executing step of stage 13, and a row that
cannot get one is carried to the owner separately.

Two sources feed it, and they read DIFFERENT things:

- **розкотка** - eighteen subagents of stage 12, 43 pages, 123 questions. Each read the
  documentation of stages 08-11 with a clean context and recorded what it had to ask about ITS OWN
  SCREEN. Deduped into nine classes in `design/kit/docs/rollout.md`, section F.
- **субагент кроку 1** - one agent with a clean context reading the PRODUCT AS A WHOLE, with the
  critique logs forbidden by path. Three artefacts: a reading log, «could not understand», «understood
  it this way».

**The second list is worth more than the first.** «Could not understand» is a known hole. «Understood
it this way» with a wrong conclusion is a hole no instrument sees, because the reader opened the page
and confidently concluded the wrong thing. That is what a real developer will do.

---

## 0. Isolation of the step-1 run - checked, not assumed

Three checks, all three passed:

| Check | Result |
|---|---|
| reading log vs the forbidden paths | **no overlap.** 45 entries; the agent also excluded four files nobody had named - `docs/critique-alignment.md`, `.impeccable/critique/*`, `research/docs/cjm-as-is.md` and `cjm-to-be.md` - because they carry `## Critique` sections |
| «where I looked» names a file from the log | **yes, on all three rows of list 1.** Every route is a chain of files that appear in the log, in the order given |
| terms that exist only in a chat | **none.** Every term it uses («ворота», «рейка», «чіп») is written in a file it opened |

**The idle control on the audit itself:** list 1 is NOT empty (3 rows), so the run was not formal and
the agent was not given the answer key.

---

## 1. What the step-1 auditor could not understand

| # | Question | Where it looked | Verdict | Closed by | Closed with |
|---|---|---|---|---|---|
| G1 | **How do I create a NEW screen now that `wireframes/` is frozen?** Every document answers «how an existing grey screen becomes coloured»; none answers «who writes the grey original after stage 05, and by what rule» | `CLAUDE.md` Repository shape -> `wireframes/CLAUDE.md` 1 and 6 -> `conventions.md` 8 and 10 (written for stage 04) -> `architecture.md` J, which has «new COMPONENT / RULE / COMPOSITION / VALUE / ADAPTATION / MOTION» and **no «new SCREEN»** -> `clone-to-colour.mjs`, which says outright that it never touches `wireframes/` -> both registries -> `coverage.mjs` | **СПРАВДІ НЕМАЄ.** Verified by re-reading `architecture.md` J: the six entries are there and the seventh is not | **крок 7** (`one-shot.md` is exactly this text) + **крок 5** (a route row) | **ЗАКРИТО на 13.7 by two examinations rather than by an argument** - see section 9. Eight screens built from the prompt alone, and the three things the prompt could not buy are now named limits |
| G2 | **Has stage 13 started or not?** `README.md` row 13 says «Not started»; `/_nav.js` carries `wip: true` with a comment saying «the stage started». `CLAUDE.md` rules that status lives in these two files **and nowhere else**, so there is no third source to break the tie | `README.md` 28 -> `/_nav.js` last row -> `CLAUDE.md` -> `docs/decisions.md` (last entry is stage 12) -> `design/kit/why.html#now` | **СПРАВДІ НЕМАЄ, and step 1 of this stage created it.** The `wip` flag went in and the README row did not. The auditor found a live contradiction twenty minutes old | **крок 5** rewrites README; the status line is corrected there, not here | **ЗАКРИТО на 13.5.** README row 13 now reads «In progress - steps 1 to 5 done» and names what steps 6 to 8 still owe; `/_nav.js` carries `page: 'handoff/handoff.html', done: true, wip: true`. Two files, one state, and the README says out loud that it is the only status board in the repository |
| G3 | **Who is «the owner», how do I reach them, and where is the ONE list of what is waiting on them?** Open items are scattered across at least four files, and no file names a person or a channel | `CLAUDE.md` How work runs -> `AGENTS.md` rule 1 -> `why.html#owner` -> `decisions.md` («on the owner's word», dozens of times) -> `sitemap.md` Open items -> `pages/coach.md` Open questions -> `architecture.md` D -> `backlog.md` | **СПРАВДІ НЕМАЄ.** This is the one the pack names in advance: without an addressee the first `[?]` row stops the work | **крок 5**, section «ХТО УХВАЛЮЄ РІШЕННЯ» on `handoff.html`. Step 3 added evidence: `backlog.md` is 29 sections long and its own page is a curated narrative about one stage-06 measurement, so the owner-facing rows in it have no visible place in a browser at all | **ЗАКРИТО на 13.5, by the owner, and the answer was better than the question.** The addressee is the **product owner** and the channel is the repository's Issues - so a question goes to the place its own line lives in, and the decision stays beside it rather than in a chat that closes with the session. **No personal name on the page, deliberately:** the addressee is a ROLE, and a role outlives whoever holds it, while a page carrying somebody's name goes stale the first day the role moves on |

---

## 2. What it understood - and what verification said

Read line by line against the files, not from memory. Nothing here is «he is right, well done»: every
row was re-measured.

| # | The conclusion it would act on tomorrow | Verification | Verdict | Closed by |
|---|---|---|---|---|
| U1 | «README and `why.html` say 84 components; `ls` says 94; I take the number from the instrument, and my first commit tomorrow is not a feature, it is re-running these gates» | Measured: **94** css files. README says **84**, `why.html` says **84** three times, `kit.html` says **93**. Three numbers in prose for one thing, and all three wrong | **ЗРОЗУМІВ ПРАВИЛЬНО, and the repo is wrong in three places.** A number nobody maintains is removed, not corrected | **ЗАКРИТО на 13.2, і не рукою.** The claim now has a DECLARED LIST inside `inventory.mjs` question G - `kit.html`, `why.html` twice, `README.md` - each with its own pattern, rewritten by `--apply` from the tables. «A number nobody maintains is removed» applies to a number that CANNOT be maintained; this one now can. Asked both ways: a declared place whose claim has vanished fails the run, and the 13 other places where the phrase stands are printed as a census, because they are prose ABOUT a count |
| U2 | «`node tools/inventory.mjs` shows three open divergences right now» | **Re-run: exits 1.** `Lines розійшлось: 6` on `checkbox radio badge product-card section-head quiz`; the prose paragraph of `inventory.md` says «93 components: 23/29/41» against its own tables' 94 (23/29/42); the stand-width check fails on `system-page` | **ЗРОЗУМІВ ПРАВИЛЬНО, and six of the seven are MINE**, from commit `6b161f2` (12.11). The rule «a repair stales its own neighbours» exists and the gate that catches it was not re-run | **ЗАКРИТО, first act of step 2.** `node tools/inventory.mjs --screens --apply` now exits 0. Six `Lines`, 66 `Screens`, one `Width`, three level sums, 39 stand strips, 89 hub cards, the totals paragraph and three prose editions - all rewritten from disk. Four instrument defects were found under it and are rows S5-S8 below |
| U3 | «I will not take a stand page's prose on trust: `goal-tile.html` says 960 in nine places, the css is on 620 and 860» | Measured: `goal-tile.css` stands on both registry breakpoints (`--bp-grid-2col` and `--bp-shell-wide`) and on no third one; the page names a third, nine times. `roles.mjs` says «розійшлось: 0» because it only asks about tokens; `idle.mjs` says «червоних: 0» because it only asks about classes | **ЗРОЗУМІВ ПРАВИЛЬНО, and no gate covers the class.** A stand page can describe a width the file does not have, and two green counters both say nothing about it - `inventory.mjs` is the only one that asks, and it finds `system-page` and not this one | `backlog.md` + **крок 4/5**: name the instrument that would go red |
| U4 | «To move a breakpoint I edit the token AND every literal, then run `bp.mjs`» | Measured: `var(--bp-*)` appears **twice in the whole system and both are inside comments in `tokens.css`**. The live conditions are literals | **ЗРОЗУМІВ ПРАВИЛЬНО.** `@media` cannot read a custom property, the registry is prose plus an instrument, and the agent found both halves | **крок 3** (the map states it) |
| U5 | «A component never reads a colour primitive: `--orange-500` has 6 readers, all of them semantic roles» | Measured: **0** readers in `components/`, `patterns/` and `base.css`; **6** in `tokens.css` | **ЗРОЗУМІВ ПРАВИЛЬНО**, and this is why the reverse map has to open in TWO knees | **крок 3** |
| U6 | «`--text-primary` 244 readers, `--bg-page` 129, `--space-16` 402, `--dur-fast` 156» | Re-measured over `components/ + patterns/ + base.css` with comments stripped: **238 · 124 · 386 · 153**. Same order, same conclusion, different denominator | **ВИСНОВОК ПРАВИЛЬНИЙ, ЧИСЛО НЕ ВІДТВОРЮЄТЬСЯ.** A figure in prose with no named instrument behind it is not a fact anyone can re-check - which is the same class as U1 | **крок 3**: the map names the instrument, never a typed count |
| U7 | «level = 1 + the highest level of what the component CONTAINS» | Found verbatim in `inventory.md:76`. But `design/system/CLAUDE.md` - the file the third reader (Claude in a new session) opens first - **never says the word «level» at all** | **Є, І ВІН ПОБАЧИВ - але не там, де його читатиме третій читач.** Defect of ROUTE, not of content | **крок 5** (route) + **крок 6** (`CLAUDE.md` section) |
| U8 | «The coach buys for 8-25 athletes» | `personas.md:170` says «8-25 active clients **[?]**»; the audience-level statement in `CLAUDE.md` and `personas.md:25` is «5-30+» | **ЗРОЗУМІВ ПРАВИЛЬНО, and took the persona's own figure.** It did not carry the `[?]` forward, and the `[?]` is the point | **крок 2** (source column) |
| U9 | «Grey owns structure, text and states and is frozen; colour owns the visual layer only. I verified it by diffing `wireframes/goal.html` against `design/goal.html`: four differences, and not one byte of a word» | Confirmed by the corpora: **142 grey files, 142 colour files, 141 registry pages, `wireframes/` 0 changed for the whole of stage 12** | **ЗРОЗУМІВ ПРАВИЛЬНО**, and it reached the rule by measurement rather than by reading a claim about it | – (already true; **крок 5** names the folder once, in the route) |
| U10 | «Light is primary: it is the bare `:root`; dark is `[data-theme="dark"]` and only the semantic block is redefined. `auto` is deliberately absent» | `theme.js` applies the stored choice in `<head>` and REMOVES the attribute when the mode is not dark; the dark block redefines semantic roles only | **ЗРОЗУМІВ ПРАВИЛЬНО** | **крок 5**, section «ЯКА ТЕМА ГОЛОВНА» |
| U11 | «No `package.json`, no build, no dependencies; the Next/Tailwind/Medusa stack in `decisions.md` is marked HYPOTHESIS, not a decision. Tomorrow I add no build config» | Confirmed: no `package.json` at root, `.nojekyll` present, `tools/` raise their own static server and Chrome over CDP | **ЗРОЗУМІВ ПРАВИЛЬНО** | **крок 5**, section «МЕЖА ПАКЕТА» |
| U12 | «If my feature needs a number I do not have, I ship it with `[?]` and put the question in `backlog.md` rather than substituting a median» | This is the rule, verbatim, and the agent reached it from `CLAUDE.md` without being told | **ЗРОЗУМІВ ПРАВИЛЬНО**, and it is the single most important thing a new developer could take away | – |

**No row of list 2 came back as ЗРОЗУМІВ НЕПРАВИЛЬНО.** That is stated as a measurement, not as a
compliment: twelve conclusions, ten exactly right, one right with an unreproducible number (U6), one
right but reached in a file the reader it belongs to never opens (U7).

---

## 3. What stage 12 already collected - «хто знайшов» = розкотка

Eighteen agents, 43 pages, **123 questions**, deduped into nine classes in `rollout.md` section F.
Six classes are closed there. The four that arrive here open:

| Class | What is still open | Closed by | Closed with |
|---|---|---|---|
| **3. A product string with two editions and one owner who is behind it** | `aria-label` has **no owner in any file** · a service page's `<title>` has no owner (node S) · the SEO A-E block is missing for **8 nodes** · `description` exists in 6 of 18 `ia/docs/pages/*.md` and on **0 of 142 coloured heads**, so twelve nodes have that string nowhere. **Named in section F as the largest single hole in the handoff** | **крок 2** (source column) + **крок 5** (route) + owner decision on ownership | – |
| **4. A per-screen audit derived by substring from grey class names** | `motion.md` section J and `responsive.md`'s fourteen identical `content-*` rows. Two instances were repaired at 12.11 (the quiz's own rows); the class is not closed | **крок 3** (the map is taken from code, so it supersedes both) | – |
| **5. A rule that exists only in prose with no check under it** | `architecture.md` A19 against the ban on screen styles · the emoji map: **20 pictographs on 12 product screens with no row**, of which 12 already have a drawing and 8 need one | **крок 4** (a11y has the same shape) + owner decision on the 8 drawings | – |
| **8. Accessibility with no owner in any document** | no accessible `<h1>` on the two 5.4a screens - the only `h1` sits inside the inert backdrop and the dialog markup is in the frozen grey layer · `aria-label` ownership (class 3) · a ruling that corrected an `h1` and left the `aria-label` beside it saying something else | **крок 4**, with «борг» status and a link, never a repair here | – |
| **9. A number or a rank only the owner can rule on** | 18 400 ₴ on node 7.4 against its own ladder's 15 000 · the rank of the only action on `maintenance` · three dots for two slides · 35 one-job-two-emphases labels · `.starrow` worn by zero screens while both review pages type five stars | **owner**, carried by **крок 5** | – |

---

## 4. What step 2 found while writing the spec - «хто знайшов» = крок 2

Reading a diagram row by row against the product asks it questions no reader of the prose ever asks.
Ten rows, and four of them are about the instruments rather than the product - the same proportion
stage 12 reported for its own fan-out.

| # | What | Evidence | Closed by | Closed with |
|---|---|---|---|---|
| S1 | **Every coloured screen loads `../wireframes/_nav.js`. The frozen folder is the RUNTIME.** It renders the header, mega-menu, tab-bar, footer, cookie banner, toasts and every dialog; `design/_nav.js` repaints over it | the script tag stands in all 141 screens, first of five. `design/_nav.js` wraps `window.wfAuthGo` rather than replacing it | **крок 2** (a section of `behaviour.md`) + **крок 5** (the route sentence is only half the truth) | **ЗАКРИТО:** `behaviour.md` section «The runtime» |
| S2 | `flows.md` prose lists **20** decision points for the Main Job; the diagram holds **18** | «order line tagged to client» and «assign client or discard line» are in the bullet list and in no node; the diagram's own edge says tagging is automatic | reported, not patched - `flows.md` belongs to stage 03 | **owner:** re-cut the prose, or add the two nodes |
| S3 | `flows.md` prose lists a state the diagram lacks - «empty, active client has no items yet» | the state exists in the product as `design/coach-session-addempty.html`. Product and prose agree; the DIAGRAM is the one missing it | reported, not patched | **owner** |
| S4 | **three flow states have no coloured screen** - search failed, loyalty loading, loyalty failed | every other state node of all five flows resolves to a file. `sitemap.md` registers all three | `behaviour.md` «НЕ ВИРІШЕНО» D1 | **owner:** build them, or drop them from the flow |
| S5 | **the component rule was FIVE parts in prose and SIX in the instruments.** Nothing written down required a card in the kit hub | `quiz.css` shipped at 12.11 with all five and no card. It was in the registry, the inventory, the stylesheet and on its own page, and unreachable from the page a person browses | **ЗАКРИТО на 13.2** | `CLAUDE.md`, `design/system/CLAUDE.md` and `architecture.md` J now say six |
| S6 | **twelve of `inventory.mjs`'s own lists could not turn its exit code red** - patterns, hub, stand meta, stand width, import group, nav group | that is why S5 survived a fortnight: the run REPORTED the missing card on every pass and handed back 0. Stage 12 used this exit code as a gate | **ЗАКРИТО на 13.2** | the exit expression now names every defect list; the four census lists stay out and say why |
| S7 | **the hub cards published 133 wrong numbers on 183 numeric tags.** Question H asks the stand strip, and nobody had ever asked the THIRD copy | measured on 94 cards. Same number is published in `inventory.md`, on the stand page and on the hub card; the hub is the copy read most and checked least | **ЗАКРИТО на 13.2** | question J, with `--apply`; 89 cards rewritten |
| S8 | **the registry's `Screens` column was wrong on 66 of 94 rows**, and `--apply` had never written it | not typing errors: the column was measured over 88 coloured screens and the product now has 142. A number true on a smaller corpus is the hardest kind to distrust | **ЗАКРИТО на 13.2** | `--screens --apply` writes it; the three registry columns now rewrite in ONE pass, because three passes silently dropped the `Width` repair |
| S9 | `--apply` could not close its own `kit.html` finding - the search pattern carried the number it was correcting **to** | so it fired only when the total was already right. Reported before `--apply` and again after it, which reads as «needs a hand» rather than as a broken repair | **ЗАКРИТО на 13.2** | every number in the pattern is now a digit class, and a miss is printed |
| S10 | **the product enforces four validation rules and writes down none of the others** | one `aria-required` in 141 pages and no HTML `required` at all. No phone format, no e-mail format, no field lengths, no required-ness. The failure STATES exist as screens; what makes them fire is written nowhere | `behaviour.md` «НЕ ВИРІШЕНО» D2 | **owner** |

---

## 5. What step 3 found while taking the map - «хто знайшов» = крок 3

The map is an INVERSION, so it asks the corpus a question nothing had asked: which token does nobody
read. Six rows, and three of them are again about the instrument rather than the product.

| # | What | Evidence | Closed by | Closed with |
|---|---|---|---|---|
| M1 | **four dead tokens** - two roles and two primitives that no component and no knee reaches | `--bg-success` (its own comment in `status-pill.css` says the SOFT ground is what readers take), `--text-price-was`, `--scrim-white-70`, `--tint-red-d-10` | `design/kit/docs/backlog.md`; stage 13 may not touch `design/system/**` | **owner of stage 08:** remove, or give each the reader its comment promises |
| M2 | **the walk read the document AT REST and called `cat-overlay` dead** - it is the mobile catalogue overlay and renders on every one of 141 screens | the same class `steps.mjs` was written for at 12.11: a component behind a click is invisible to a reader that never clicks. A dead-token list taken without opening the panels would have been wrong in the other direction too, and nothing in the output would have said so | **ЗАКРИТО на 13.3** | the walk now sweeps every opener the page declares - 3679 calls over 141 screens, one dropped because it navigates away |
| M3 | **eleven state screens have no section of their own in `microcopy.md`** | `account-profile-phone`, `account-addresses-courier`, `coach-tariff-cancel` and eight more are dialog STEPS; their strings are authored in the shared sections of cluster 0, which have no screen heading by construction | **ЗАКРИТО на 13.3** | a state screen inherits the base screen's zones, mechanically, and the inheritance is printed: 130 with their own section, 11 inherited |
| M4 | **the IA node was matched by the FIRST prefix rather than the longest** | `account-addresses-add` matches both `account` and `account-addresses`, so half the address book was filed under node 7.0 instead of 7.5. A prefix match without «longest» is a guess wearing a lookup | **ЗАКРИТО на 13.3** | longest prefix wins |
| M5 | **eight components render on all 141 screens, and seven screens deliberately drop the shell** | the global layer is `auth-dialog`, `breadcrumb`, `button`, `cat-overlay`, `field`, `link-row`, `otp`, `toast` - written into every page by `wireframes/_nav.js`. The five checkout states plus `500` and `maintenance` carry no header; the five auth screens also carry no footer | **ЗАКРИТО на 13.3** | section A1 of `map.md` names the exceptions rather than averaging them away |
| M6 | the two-knee rule is not enough on its own: **a primitive can be read by another primitive** | `--grid-col-fluid` is a `clamp()` whose floor is `--grid-col-min-narrow`; a walk that only knew role -> primitive called the floor dead | **ЗАКРИТО на 13.3** | the primitive layer is closed transitively before the roles are asked |

---

## 6. What step 4 found while re-asking the accessibility rules - «хто знайшов» = крок 4

Nothing here is new POLICY. Every rule was decided at stages 08 to 11; what step 4 did is ask each of
them with a command and write down the answer. Nine of the 26 rows came back different from the day
they were written.

| # | What | Evidence | Closed by | Closed with |
|---|---|---|---|---|
| K1 | **the focus instrument had never walked the dark theme** - the very case its own opening paragraph was written about | `focus.mjs` says the browser's blue ring is a defect because it does not follow the theme, and then only ever measured the light one | **ЗАКРИТО на 13.4** | `--dark` sets the theme through the page's own call and FAILS LOUDLY if it does not take. Result: 33816 controls, **0 and 0** in both themes |
| K2 | **text-only zoom at 200% had no instrument at all**, and it is the reader stage 10 moved the type ramp to `rem` for | browser zoom halves the viewport and the width sweep already covered that; a raised DEFAULT FONT SIZE changes the type and not the viewport, which nothing had asked | **ЗАКРИТО на 13.4** (the instrument) | `accept.mjs --text200`. Result: **142 of 343 overflow at 1280, 284 of 343 at 360** - debt C5, the largest in the document |
| K3 | **«no accessible h1» was prose in `rollout.md` and named 2 screens** | asked mechanically it is **35 of 141**, in three classes; and the same walk found a second question nobody had asked - **97 of 141 skip a rung in the heading ladder**, all from ONE cause | **ЗАКРИТО на 13.4** (the instrument) | new `tools/headings.mjs`; debts E1 and E2 |
| K4 | the heading walk's FIRST writing swept every opener, and reported two `h1` on screens that have one | the sweep opens every dialog at once; no reader is ever in that state. The opposite lesson to 13.3, on the same day | **ЗАКРИТО на 13.4** | it reads at rest, because in this product every state is already its own document |
| K5 | **`quiz.css` reads a colour primitive directly** - the first component in the system to do it | `theme.mjs` question 2 said «none» for stages 08 to 11. Mine, from batch 6 at 12.11, and the stage-12 gate was not re-run after that batch - the same sentence as `inventory.mjs`, on the same commit | `backlog.md`; a new semantic role is the system owner's call | **owner of stage 08** |
| K6 | **an ADDITION stales its neighbours too**, not only a repair | «a repair stales its own neighbours» was already written down. Batch 6 added a component and left two gates behind it: `inventory.mjs` (found at step 2) and `theme.mjs` (found here) | **ЗАКРИТО**: the rule is generalised in `docs/decisions.md` | – |
| K7 | contrast: **37 shapes fail, and 36 of them fail in BOTH themes** | the light reading beside the dark one is what separates a harvest from a panic. The largest group is the accent button: white on Signal Orange, 3.13 against 4.5 | `backlog.md`, debt B2 | **owner:** it is a brand decision before it is a bug |
| K8 | the width sweep is clean where it matters and not silent where it is not | above the floor of 360: sideways scroll **0**, element past the edge **0**, one entry in two carriers **0**. Two lines exceed the reading measure | `backlog.md`, debt C6 | **owner** |
| K9 | every debt now carries the number that has to reach zero | eight debts, eight commands, eight target numbers | **ЗАКРИТО на 13.4** | the table at the foot of `a11y.md` and its twin in `backlog.md` |

---

## 7. What step 5 found while building the route - «хто найшов» = крок 5

| # | What | Evidence | Closed by | Closed with |
|---|---|---|---|---|
| R1 | **the roadmap pages had never been measured at 360 by anything** | `accept.mjs` was written for `design/` and had no way to reach the repository root, so `index.html`, `voice/voice.html` and every other stage page stood outside every width gate this project runs | **ЗАКРИТО на 13.5** | `--root` moves the subject; `handoff/handoff.html` measured **0 overflow at 390 and at 360** |
| R2 | **the README carried a second component count that the declared list did not cover** | question G named `README.md` for «N component files» in the status row; the sentence «all 84 components as cards» in the design-system section was a different phrasing and stood untouched at 84 against 94 | **ЗАКРИТО на 13.5** | the rewritten README names no count at all - the showcase carries the number and the README leads to it. The declaration then covered nothing and **the reverse half of the both-ways ask failed the run on its first pass**, which is exactly what it exists for; the row was removed from `CLAIMS` with that reason written beside it |
| R3 | «no more than two clicks from the root to any handoff artefact» was prose | the route has exactly two legs - the sidebar is on every page and carries every registry row, so click 1 is any registry page and click 2 is a link on it | **ЗАКРИТО на 13.5** | `handoff.mjs` question I: `handoff.html` stands in the registry, and every file under `handoff/` is linked from it. Both halves falsified with a probe |
| R4 | the four handoff documents are `.md` and nothing else in this repository links to an md from an html page | 27 such links exist and all 27 are on `handoff.html` | **ЗАКРИТО на 13.5** | said out loud on the page: the file a person reads and the file `handoff.mjs` checks must be ONE file, or the package has two editions of itself again |
| R5 | **G3 is the one field of this package that cannot be derived from the repository** | the section «Хто ухвалює рішення» listed the five classes waiting and their counts, with the addressee as `[?]` | **ЗАКРИТО на 13.5** | a ROLE and a channel rather than a person: the product owner, via the repository's Issues. The one `[?]` left on the page is the sentence that EXPLAINS the mark, not a hole |

---

## 8. What step 6 found from OUTSIDE the working tree - «хто знайшов» = крок 6

| # | What | Evidence | Closed by | Closed with |
|---|---|---|---|---|
| C1 | **`motion-row.mjs` carried the author's home directory as a typed constant** | line 6, four stages old. The tool resolved on exactly one machine, and nothing could see it because every check that opened it ran on that machine | **ЗАКРИТО на 13.6** | it imports `ROOT` from `lib.mjs` like every other tool; confirmed by the clone test's second run |
| C2 | **the same tool WRITES by default** - no `--apply` guard | smoke-testing the fix rewrote 21 stand pages. Ten other repairs in `tools/` read by default and write behind a flag; this one is the exception | `backlog.md` | **owner of stage 11:** a flag changes how every step that calls it must call it |
| C3 | the clone test's own three wrong versions | an ignored file counted as missing (100 of 103 were `.playwright-mcp` logs), a slash-separated enumeration read as a path, and three kinds of page all asked for the roadmap panel | **ЗАКРИТО на 13.6** | all three written beside it in `tools/README.md` |
| C4 | nothing in the repository needs a build, a server or an explanation - **measured rather than claimed** | HEAD cloned to a temporary directory and opened from `file://`: 0 missing without a reason, 0 absolute paths, 0 build files, 5 of 5 pages with their navigation drawn | **ЗАКРИТО на 13.6** | `node tools/clone-test.mjs` |

---

## 9. The examination, twice - «хто знайшов» = крок 7

**Two agents with clean contexts, two features, one prompt.** Neither had built anything here. Each
was given `one-shot.md` and a feature named in numbers before the run - four files apiece - and each
was told that the list of what it had to ask or guess at was worth more than the screens.

| | Feature | Source | Rows it came back with |
|---|---|---|---|
| **Run A** | «Мої стейпли» | `sitemap.md` Open items + `cjm-to-be.md` P2 | **18** |
| **Run B** | «Знову в наявності» | `flows.md` Backlog E10 + `cjm-to-be.md` P2 | **16** |

**16 against 18 is the same length, and the pack says what that means: the handoff is not finished.**
It is said here rather than rounded off. But the two lists are not the same list, and the difference
is the measurement that matters:

- **Four of run B's sixteen were run A's holes, and B met a documented answer instead of a guess.**
  It found no microcopy cluster «as the prompt predicts»; it hit the frozen account rail and ordered
  the row instead of hand-writing four links; it resolved the a11y contradiction with the sentence
  step 7 had just added; and it read the coverage-map correction and repeated it rather than
  re-deriving it. **That is the repair working, and it is why the run is done twice.**
- **One repeated because it was deliberately not repaired.** Both runs found that `voice.md` demands a
  non-breaking space before the currency sign and that **0 of 141 screens carry one**, with no
  instrument asking. It belongs to the owner of `voice.md`, so it stayed open and came back - exactly
  as a finding does when nobody closes it.
- **Eleven were new territory**, because the second feature lives on a product page and the first
  lived in the cabinet.

### What the two runs found that no instrument had

| # | What | Verdict | Closed by |
|---|---|---|---|
| E1 | **`one-shot.md` said the registry row puts the screen on the coverage map. It does not.** The map is derived from `WF_FLOWS` in the frozen grey runtime; `DESIGN_NAV` only decides whether a row the map already knows is drawn coloured. **A screen with no grey twin cannot appear at all - and `coverage.mjs --check` still exits 0 and still says «all 141».** Verified: four new screens on disk, registered, and the map named them zero times | **ЗРОЗУМІВ ПРАВИЛЬНО, і помилка була в промпті, написаному годиною раніше** - a green counter that cannot see its class, inside the document that teaches people not to build one | **ЗАКРИТО на 13.7**: the paragraph now states the limit and says the green means nothing about your work |
| E2 | **a new SECTION of an account cannot enter the account rail** - `WF_ACC_LINKS` is one list inside the frozen `wireframes/_nav.js`. Run A refused to hand-write the link into four screen files because «the sidebar has one source» is the rule that would break | **ПРАВИЛЬНА ВІДПОВІДЬ, ЯКОЇ В ПРОМПТІ НЕ БУЛО** | **ЗАКРИТО на 13.7** in `one-shot.md`; the rail row itself is an order in `backlog.md` |
| E3 | **the package said a feature was absent and the corpus says it is half-present.** `product-oos.html` has carried the back-in-stock request form since stage 08 - a contact field and a button. `behaviour.md` said «is NOT drawn here» and `handoff.html` said the dead end is truly dead | **ЗРОЗУМІВ ПРАВИЛЬНО.** Verified: the form dates to commit `25ca246` | **ЗАКРИТО на 13.7** in both files: what is post-launch is everything AFTER the form |
| E4 | **`flows.md` and `concept-map.md` give entity E10 to two different features** - the stockout reminder and My Staples | **ЗРОЗУМІВ ПРАВИЛЬНО**, and it chose the entity register over the flow document | **behaviour.md** drift D-d; the fix is the owner's |
| E5 | **`microcopy.md` has no cluster for a screen that did not exist at stage 05**, and silence reads as permission to invent | both runs; 17 strings written as declared PROPOSALS rather than canon | **ЗАКРИТО на 13.7** in `one-shot.md` |
| E6 | **`a11y.md` asked for something impossible** - «a new screen must not add to the debts», while E2 is written by the frozen footer and is inherited the moment a screen exists | **ЗРОЗУМІВ ПРАВИЛЬНО** | **ЗАКРИТО на 13.7**: «add no new CAUSE», measured against the nearest neighbour |
| E7 | **`accept.mjs` matches a subject by exact name and `screen-css.mjs` by substring** - one base name means «one screen» to one gate and «all four» to the other, so the first would report clean over a quarter of the work | **ЗРОЗУМІВ ПРАВИЛЬНО** | **ЗАКРИТО на 13.7** in `one-shot.md` |
| E8 | **one feature, three names and two job numbers** - «Мої стейпли» / "My Staples" / «Мій набір», job 3 in one document and Job 4 in another. **`handoff.html` carried the third name AND filed the feature as CUT rather than post-launch** | **ЗРОЗУМІВ ПРАВИЛЬНО, і помилка була на моїй сторінці** | name and verdict **ЗАКРИТО на 13.7**; the job-number collision is an order in `backlog.md` |
| E9 | **four defects found BY EYE after every gate was green** - a price breaking between the figure and the currency sign at the floor, a loading skeleton promising fewer rows than the loaded state, a product name running to six lines at the floor, and one action carrying two names | **the instruments are a floor, not a verdict** | named in `one-shot.md` as what to look for after the gates pass |

**Both feature sets were deleted afterwards, on the owner's word.** They were probes: accepting them
would have meant reopening three closed stages - repairing the coverage map's derivation (12), making
17 proposed strings canon (05) and removing the post-launch marks (03) - for two features the owner
had already filed as post-launch. **The seventeen orders they raised stay** in `design/kit/docs/backlog.md`
as sections «Мої стейпли» and «Знову в наявності»; they cost nothing to keep and they are the part
that was actually worth building.

---

## Idle control on this file

Rows: **3** (list 1) + **12** (list 2) + **5** (rollout classes) + **10** (step 2) + **6** (step 3)
+ **9** (step 4) + **5** (step 5) + **4** (step 6) + **9** (step 7) = **63**. Every
one carries an executing step or a named addressee; **0 rows without one**. The column «чим закрито»
is filled as the steps run - a row that reaches step 8 with it still empty is a row this stage did
not do.

**Closed so far: 35** - U1, U2, S1, S5-S10 by step 2; M2-M6 by step 3; K1-K4, K6, K9 by step 4;
G2, G3, R1-R5 by step 5; C1, C3, C4 by step 6; E1, E2, E3, E5, E6, E7 by step 7. **Open: 28.**

**G1 is closed too, and by the exam rather than by an argument.** «How do I create a NEW screen now
that `wireframes/` is frozen» was list 1's first row; two agents did it, from the prompt alone, and
between them they produced eight screens that passed every gate. What they could NOT do - reach the
coverage map, enter the account rail, open a door from a screen they may not edit - is now written
down as three named limits rather than left as a gap.

**All three rows of list 1 are now closed**, and list 1 was the one the stage pack warned about in
advance: without an addressee the first `[?]` stops the work. There is one now, and it is a role
with a channel rather than a person.

Of the open rows, **11 are addressed to the owner** and cannot be closed by any step of this stage:
S2, S3, S4, S10, M1, K5, K7, K8, C2, and the three classes of rollout that need a decision rather
than a document. The eight accessibility debts are counted inside K5, K7 and K8 rather than as rows of their
own: their register is the table at the foot of `a11y.md`.
