# Motion - what moves, what job it does, and where the numbers came from

Stage 11. The system could already do everything except move. This file is the record of what it
moved by accident before the stage, what it will move on purpose after it, and why every number is
the number it is. The visible half is `design/kit/motion.html`, where the examples are live, because
motion is the one artifact of this pipeline that a screenshot cannot carry.

Written at step 2. Sections marked **filled at step N** are deliberately empty until then; an empty
section named by its step is a different thing from a section nobody wrote.

---

## Three jobs, and there is no fourth

| | CONNECTION | STATUS | RESPONSE |
|---|---|---|---|
| the person's question | «where did this come from?» | «is it still working?» | «was I heard?» |
| typical moment | a panel opens, a row expands, a toast arrives | loading, saving, verifying | hover, press, focus, a switch |
| duration | `--dur-base` or `--dur-slow` | a cycle, even, for as long as it lasts | `--dur-fast` |
| what proves it | the direction of travel points at the source | the process is legible without text | the answer is faster than about 150ms |
| when it is NOT taken | the element has no source on screen | the process is shorter than about 300ms: a flicker is worse than stillness | the state does not exist in the component, which makes it an order for stage 08 |

A moment for which none of the three can be named does not enter the inventory, and there will be no
animation there. «Livens up the interface» is not a job. This is the same «an orphan is cut» rule the
To-Be map applies to features and the block bank applies to blocks, applied where it is most
expensive: motion with no job costs attention on every single opening of the screen, and it looks
like diligence while doing it.

---

## A. The census - what moved before this stage

Taken by `tools/motion.mjs`, from both ends, because the two ends do not agree and each is blind to
what the other sees. `--source` reads every stylesheet and every `<style>` block and can name a FILE;
`--output` resolves 279 pages in Chrome and reads the computed style of every element that moves, and
can name a NUMBER that is actually true. A declaration with no element and an element with no
declaration are both findings.

### A1. From the source

| | |
|---|---|
| files in `design/system/` carrying motion | **46 of 88** |
| different durations | **12** - `.15s`x92 · `.14s`x13 · `.12s`x13 · `.22s`x6 · `.18s`x5 · `.16s`x4 · `.9s`x2 · `.2s`x2 · `0s`x2 · `.25s`x2 · `.28s`x1 · `1.1s`x1 |
| different curves | **3** - `ease`x131 · `linear`x4 · `ease-in-out`x1 |
| `transition: all` | **1** - `toast.css:13` |
| animating LAYOUT | **4** - `checkout-form` `left` · `cookie-banner` `left` · `header` `max-height` · `switch` `left` |
| animating paint | 72 · animating `transform`/`opacity`: 27 |
| `@keyframes` | **3** - `skpulse` (skeleton), `tt-in` (toast), `uivspin` (spinner) |
| obeying `prefers-reduced-motion` | 4 blocks - `base.css`, `skeleton.css`, `auth-dialog.css`, `checkout-form.css`. Everything else: no |
| motion inside a SCREEN file | **3 declarations, all in `design/overview.html`** - the same file that is already the declared exception for `@media`. Cut at step 3 |
| the stand (`design/kit/`) | **0**, and the zero was proved by introduction: one `transition` appended to `_page.css` turned the counter to 1 and removing it returned it to 0. Thirteen stand pages match a grep for «transition» and every one of them is quoting a component's css inside a code block |
| `wireframes/` | 15 declarations, frozen corpus, not touched |

### A2. From the output, 279 pages at 1280

27 915 elements move (screens 24 428, stand 3 487). **16 369 of the screen movers are not visible at
the moment of reading** - motion declared on something that is not on the screen.

Nine transition durations resolve plus two cycle durations. `transition: all` from one declaration
lands on **32 elements**. Layout-expensive in the resolved output: `max-height`x86, `left`x2.

**The drift, grouped by role, which is the number the stage exists for:**

| role | different durations |
|---|---|
| link | **3** - `.15s`x1692 · `.14s`x735 · `.12s`x344 |
| card | **2** - `.15s`x576 · `.18s`x389 |
| button | 2 - `.15s`x8340 · `.14s`x3 |
| field · switch · surface · skeleton | 1 each |
| everything else | **8**, and its largest single carrier is `.mega-sub` - **7 560 elements at `.12s`** |

Two things only the output half could say. **`tt-in` is declared and worn by nothing**: the toast has
an entrance animation and no element in 279 pages carries it. And **`ease` is on 817 of 818 resolved
timing functions** - which is not a chosen curve, it is the value a declaration gets when nobody
names one.

### A3. The like-for-like comparison

One page against one page, same instrument, same browser, same day. Thorne is the benchmark leader
named by `research/docs/research.md` (36/40).

| | thorne.com | Stack `design/index.html` |
|---|---|---|
| elements moving | 110 | 461 |
| **different durations** | **2** (`0.2s`x109, `0.1s`x1) | **8** |
| different curves | 3, and one carries 95 of 110 | 2, and `ease` carries 817 of 818 |
| expensive properties | none | `box-shadow`x89 · `filter`x8 · `max-height`x1 |
| `transform` | 0 | 29 |

Not «they have fewer curves». They have a CHOSEN curve, `cubic-bezier(0.4, 0, 0.2, 1)`, on 95
elements.

---

## B. The inventory of moments

Two corpora, and they are not interchangeable, because the three jobs have different origins.

### B1. The screen corpus - CONNECTION and STATUS

`wireframes/*.html` (142 screens, the whole product; the coloured layer is a selection) plus
`ia/docs/flows.md`.

**STATUS.** `flows.md` names **nine distinct loading states**: signing in · processing payment ·
**verifying the coach's social link** · client order history · quick-add catalogue with the coach
price · search results · goal collection · trust details · loyalty status. The grey corpus draws 16
`-loading` screens, 16 `-empty` and 13 `-error`. Carrier: `skeleton.css`, whose `.skpulse` already
answers `prefers-reduced-motion` correctly - the cycle is replaced by a static state, not sped up.

**CONNECTION.** Surfaces that open inside the document, plus four in-session steps named by
`flows.md` (add client capture · choose substitute · address selection · certificate and reviews
content).

**AND THE STRUCTURAL FINDING THAT OUTRANKS THE NUMBERS: every surface in this product appears by
switching `display`.** 11 component files, 16 declarations - `auth-dialog`, `cat-overlay`,
`city-dialog`, `cookie-banner`, `filter-sheet`, `filter-rail`, `mega-menu`, `header`, `nav-drawer`,
`menu`, `overlay`, `review-modal`. `@starting-style` and `transition-behavior: allow-discrete` are at
**zero** in the system. An ordinary `transition` cannot animate that at all, which makes it a decision
of step 4 and not a detail of step 3.

### B2. The state registry - RESPONSE

Read row by row out of `inventory.md` by `tools/motion.mjs --states`, with a verdict on **all 85
rows**. This is a separate corpus and not a line in a list of sources, because **a flow map never
names the hover of a button**: it describes the path between screens, so an inventory taken from
screens sees CONNECTION and STATUS in full and sees RESPONSE almost not at all. That hits the bottom
rung hardest - atoms are made of RESPONSE almost entirely - and it is invisible on the page, because
a missing hover reads exactly like a decision.

| level | components | have at least one state | already move |
|---|---|---|---|
| atom | 23 | 15 | 15 |
| molecule | 27 | 20 | 17 |
| **organism** | **34** | **24** | **13** |
| pattern | 1 | 0 | 0 |

**The level named out loud now, as the pack requires: organism.** 24 carry a state, 13 move. The
eleven that carry a state and do not move are the surfaces: `overlay`, `cat-overlay`, `review-modal`,
`city-dialog`, `cart-drawer`, `coach-session`, `coach-verify`, `plan-card`, `tabbar`, `buy-box`,
`coach-clients`. The client panel that step 10.5 built appears with no transition at all.

Two more rows worth their own line. **`favourite.css` has a focus state and does not move** - the
heart on the card, 92 instances, the most frequent control in the product, and RESPONSE was never
done on it. And the mirror: **`icon.css` moves and has no state at all**, the only candidate for
confetti in the whole corpus.

**NEEDS A STATE** - 26 components carry no interactive state. Most of them legitimately (price,
badge, availability mark: they do nothing). The ones where the absence is a question, and the
decision is the owner's, not this file's: `client-dialog`, `buy-bar`, `upsell`, `toolbar`,
`product-grid`, `system-page`, and the `action-row` pattern. **Nothing here is being drawn in by
this stage**: a state that does not exist is an order against stage 08's five-part rule, and until it
is placed those rows get no animation.

---

## C. Character references - three moments, and not one new row

The rule that separates a reference from a collection of effects: the technique is taken FOR a moment
already named in B. Duration is never taken - it follows from the job and from the census, and a
borrowed number carries a borrowed context.

**The source was substituted, and the substitution is recorded rather than silent.** `motionsites`
returned `free_prompts_remaining: 0` - the account's three free prompts were spent before this
session - and its best-matching results were premium. The owner replaced it with
**`github.com/greensock/gsap-skills`**, read live on 2026-08-21: its `gsap-core`, `gsap-performance`
and `gsap-timeline` skills. GSAP is a REFERENCE and not a dependency:
nothing here ships a library, and the direction of translation is stated by the source itself, which
says CustomEase «can use cubic-bezier values (as used in CSS cubic-bezier())».

| moment (row from B) | job | source | what was taken | what it gives the job | what the tone says |
|---|---|---|---|---|---|
| **The client panel of the coach split view**, `coach-clients` | CONNECTION | `gsap-skills`, skill `gsap-core` | the curve family **`power_.out`**; direction from the edge of the rail and not the edge of the window; small amplitude | the direction says WHOSE record this is; an out-curve spends the energy at the start, so the eye arrives at the panel when it is already settling and already readable | agrees. **`back.out(1.7)` (overshoot) and `elastic` refused BY NAME** - `voice.md` Principle 5 bans celebration |
| **Verifying the coach's social link**, `coach-verify` | STATUS | `gsap-core` (`"none"`, linear) + `gsap-performance` | an even cycle with no acceleration; `opacity` only; do not leave `will-change` on permanently | a rate that does not change says «alive» and promises nothing - and the product does not know how long an external check takes | agrees. Phase 8 of the tone table is target emotion **0, not +2**; a cycle that accelerates reads as «almost there», which is a promise |
| **The mega menu**, `mega-menu` | CONNECTION, composition | `gsap-core` stagger + `gsap-timeline` | ordering **`from: "start"`** away from the trigger; **`amount`** (total spread fixed) rather than `each`; overlap so it reads as one surface and not twelve objects | the order points back at the trigger; a fixed total spread keeps the menu's arrival the same length however many categories it holds | neutral, no wording attached. No bounce, Principle 4 |
| - | - | **thorne.com**, measured live | **nothing taken**, one number for comparison | the benchmark leader runs on 2 durations and one chosen curve; we ran on 12 and none | - |

`gsap-performance` also confirms, from a source outside this project, the rule the stage already
carried: `transform` and `opacity` «keep work on the compositor and avoid layout and most paint»,
while width, height, top, left, margin and padding «trigger layout and can cause jank»; and
`will-change` is for «elements that are actually animating», not for everything just in case.

---

## D. The registry of durations, curves and distances

Every value with its origin. The declarations themselves live in `design/system/tokens.css`, on the
PRIMITIVE level, and **they have no theme pair**: a `:root` / `[data-theme="dark"]` pair is a property
of the semantic level, which is colour, and a duration is not a colour. The same rule the width
tokens of stage 10 carry.

| token | value | job | where the number came from |
|---|---|---|---|
| `--dur-fast` | **150ms** | RESPONSE | the product's own majority, taken rather than replaced: 92 of 133 declarations and 26 083 of 42 303 resolved values already stand there. `.14s` and `.12s` fold in. It also sits at the top of the window a response has |
| `--dur-base` | **220ms** | transition inside a component | also a value the product already holds (6 declarations), **but its job changes**: today it is what an appearance costs, from here appearances step up |
| `--dur-slow` | **330ms** | appearance | **the one number the census did not contain**, and that is the finding: the product lives inside a 160ms span holding no rung that reads as arrival. Nothing slows down - the eleven organisms with an `open` state have no transition at all today. 330 is 1.5x the base, the ratio the base already has to the fast one |
| `--ease-standard` | `cubic-bezier(.48, .04, .52, .96)` | most transitions | `power1.inOut`, **solved** by `tools/ease-fit.mjs` to 0.36% max error |
| `--ease-enter` | `cubic-bezier(.33, 1, .67, 1)` | what arrives | `power2.out`, 0.19%. Table C, moment M1 |
| `--ease-exit` | `cubic-bezier(.33, 0, .67, 0)` | what leaves | the mirror, 0.19% |
| `--move-sm` | **2px** | the lift under the cursor | census: 10 declarations of `translateY(-2px)`, plus 2 of `-1px` that fold in |
| `--move-md` | **10px** | what an arriving element travels | census: the toast's `tt-in` already starts at `translateY(10px)`; the one `translateY(8px)` folds in |

**No spring and no bounce, and that is a decision with a source.** `back.out` and `elastic` are
refused by name: `voice.md` Principle 5 bans celebration outright, and the tone table puts phase 8 -
the wait after paying, the bottom of the emotional curve - at target emotion zero. An overshoot is a
small celebration delivered exactly where the person wants none.

**Offscreen starts are not a distance token.** `translateY(100%)` and `translateX(-100%)` are a
relation to the element's own size; written as a length they break the moment the element resizes.

### The fourth pair, decided at step 4: `--dur-cycle` and `--ease-cycle`

The inventory row that does not close with three: **STATUS**. Nine loading states in `flows.md`, 16
loading screens in the grey corpus, carried by `skeleton.css` (`.skpulse`, `1.1s ease-in-out
infinite`) and two spinners (`uivspin`, `.9s linear infinite`). A cycle cannot be expressed by any of
the three rungs - a 150 or 330ms cycle is a flicker, not a pulse - so those two values are literals
inside component files today, which the contract calls a defect. Three legal outcomes, and the
decision is the owner's: give the cycle its own token pair (duration and curve), keep the two values
as declared literals with a written exception, or reduce the two cycles to one.

**The owner took the first**, and it is written as a PAIR rather than a fourth rung. 150 / 220 / 330
are transitions: each has a start, an end and a person waiting for the end. A cycle has no end - it
says «still running» and stops when the answer arrives - so putting it on the same ladder would invite
the next reader to compare 1100 with 330 as though one were three times the other.

| | value | how it was chosen |
|---|---|---|
| `--dur-cycle` | **1100ms** | the census counted by INSTANCE, not by declaration, and the two disagree. By declaration the spinners win 2 to 1; by instance the pulse wins **22 grey and 39 coloured against 3**. `.skpulse` is the cycle this product shows. Each spinner turns 200ms slower and nobody can put a word to that; the other way round costs the pulse 18% more agitation on the one screen a person stares at while waiting, and `voice.md` puts phase 8 at target emotion ZERO |
| `--ease-cycle` | **linear** | the census majority (2 of 3) AND the only curve a rotation can take: `ease-in-out` on a 360deg loop accelerates and decelerates once per turn, and a spinner that stutters once a second reads as a stuck process. `voice.md` says «рівний повтор» for loading, so the voice and the physics agree |

**What the single curve costs, and where it is paid.** A three-stop opacity ramp under `linear` has a
corner at its turn. The softness moved into the keyframes of `skeleton.css` - seven stops
approximating a cosine, same end values, 1 and .55 - rather than into a second curve token existing
for one selector. Written in the file that pays it.

**Neither token is in the `reduce` block, and the absence is the decision.** A transition at 1ms is
over before it is seen, which is what «no motion» means; a cycle at 1ms repeats a thousand times a
second, which is a flicker and worse than the pulse. Each cycle is switched off in its own file with
`animation: none` plus a static state - `skeleton.css`, `auth-dialog.css`, `checkout-form.css`.

---

## E. Less motion, and it has one mechanism

The block lives in `tokens.css` immediately after the light `:root` closes, and it redefines **the
same tokens**. Not thirty rules: every component that reads `var()` obeys on its own, and so will
every component written at stage 12, knowing nothing about it.

- **Why `@media` works here and did not at stage 10.** There the query ASKED ABOUT a variable, and a
  media condition is evaluated before the cascade of custom properties, so it never fired and never
  errored. Here the query does not ask: inside it the variable is REDEFINED, which is an ordinary
  declaration. Asking and assigning are different operations.
- **1ms and not 0s.** At zero some browsers never fire `transitionend`, so a handler waiting for the
  end of a movement waits forever. The instrument's sign is «more than 1ms is a defect», never
  «exactly zero», which would fail every element that worked.
- **Reducing motion does not cancel the STATE.** An element that appears still appears. What goes is
  the travel, not the arrival.
- **No safety net on `*` - and at step 2 that sentence was FALSE.** It was written as a description
  of the system and was in fact a description of the intention: `base.css` had carried
  `@media (prefers-reduced-motion: reduce){ *{ transition: none !important } }` since stage 07, and
  `!important` on `*` beats every declaration in `tokens.css`. Under it the step 5 audit would have
  been green over an empty field - underneath such a rule no component that fails to read the tokens
  can be seen at all. **It also put a wrong sentence into the record of step 3**, where the zeros the
  emulation returned were explained as «Chrome zeroes every transition itself under that emulation».
  Chrome does no such thing; it was this repository's own line, and `tools/cdp.mjs` had said so in a
  comment since stage 07. Removed at 11.5 before the audit was first run, which is what turned the
  audit red. **An instrument must not hide the defect it is looking for - and a claim that the
  instrument is clean has to be asked of the tree, not of the intention.**

### What the token override cannot reach

**Filled at step 5**, and it is the main harvest of that step, not a footnote. Three entries, and step
4 already closed two of them:

| what the override cannot reach | state after step 4 |
|---|---|
| a `@keyframes` cycle - at `reduce` it must be REPLACED by a static state, never accelerated | **closed, 3 of 3.** `.skpulse`, `.auth-spin`, `.co-spin`, each with `animation: none` and a static state in its own file. Step 5 proves it in the browser rather than in the source |
| a duration written as a literal inside a component | **closed by the census: 0 in the product.** What is left stands on `design/overview.html`, the declared exception of stage 09's hub, and on the stand and the frozen corpus, neither of which is the product |
| a transition between two documents | **closed by name at step 4 for `reduce`, and only HALF closed until step 6.** The browser's crossfade is an ANIMATION, so no token override sees it; `base.css` carries its own `prefers-reduced-motion` block switching off `::view-transition-old/new/group`, and the navigation itself is untouched. But «the token cannot reach it» is also true of the ORDINARY case, and that half went unnoticed for two steps: the crossfade ran on the browser's own 250ms `ease`. Both halves are now written by hand in `base.css` and measured by `motion.mjs --view` (section G) |
| a pseudo-element that exists only during a navigation | **found at step 6 by the critique, not by any counter.** The whole census reads computed style off elements resolved from a document at rest; the four view-transition animations are in no such document. The instrument could not have gone red - it could only ever have been silent. `--view` is the mode that asks, and it is falsified by removing the override and watching it go red on five lines |
| `scroll-behavior: smooth` on `html` | **found at step 5 and closed by name.** It is not a transition, so it has no computed duration for the walk to read and no token can reach it. Switched to `auto` in the same `base.css` block |
| a stylesheet in NEITHER corpus | **found at step 5 by the audit, not by the census.** `design/_stand.css` is loaded by 91 coloured screens and lives at the root of `design/`, so `--source` - which walks `design/system/**.css` and `design/**.html` - never saw it. Four literal durations, moving on ninety-one pages, invisible to every count the stage printed. Now on tokens |
| repo chrome outside the system | `/_nav.css` (the roadmap panel) and `design/overview.html` (the stage hub). Neither loads `tokens.css` on every page that uses it, so both are **closed by name in their own file**. The hub was the declared exception for the LITERAL; the exception was never about ignoring a person who asked their system for less motion, and the audit said so |
| the page about motion | `design/kit/motion.html` had a demo pulse answering only its own on-page toggle, not the media query. **The one page in the tree whose subject is motion was the one that kept moving at `reduce`** |

The list is declared here, so idle control applies to it: an empty section is also named with a
number.

### The audit itself, and what it means that it is green

`tools/motion.mjs --reduce` walks **280 pages twice** in the same browser - once at
`prefers-reduced-motion: no-preference`, once at `reduce` - and reads `transitionDuration`,
`animationDuration`, `animationName` and `animationIterationCount` off every element **and its
`::before` and `::after`**.

    елементів із рухом у звичайному проході: 5826
    з них при reduce БІЛЬШЕ за 1ms: 0

**5826 moving elements, 0 still moving, and it is measured with no net underneath.** The sign is the
pack's: `0s` or `1ms`, because `1ms` IS what the override writes and demanding zero would fail every
element that worked.

The first run of the same instrument returned **96**, in five distinct places, and every one of them
is in the table above. That difference is the whole argument for taking the net out first.

**The instrument was wrong twice before it was right.** It asked only
`document.querySelectorAll('*')`, so three animations living on pseudo-elements were invisible to it;
and it counted a cycle as a defect, when `animation: none` at `reduce` is the CORRECT closure for a
`@keyframes` loop. The two are told apart by `animationName`.

### And reducing motion did not cancel a single state

The second half of the check, and the one whose failure would be the worst of the stage. Ten surfaces
were opened under the emulation: **every one arrived** - opacity 1 within 30ms, `display` set, and a
resolved duration of `0.001s`. The eleventh, `.ord.open .ord-body`, is the row the live probe cannot
reach because its state sits on the parent, and it was measured by hand: closed `display: none` ->
open `display: block`, `1.000` at +30ms against `0.391` without the emulation, duration `0.22s` ->
`0.001s`. **The travel goes; the arrival stays.**

---

## F. Components and patterns

Rounds from the bottom up, each opened by a roll-call of its whole level and closed by N = M + K.
Molecules, organisms and the pattern are **rounds 2 to 4**; state transitions and the between-documents
fork are **step 4**.

### Round 1 - atoms. N = 23, M = 16, K = 7

Sixteen atoms move and seven deliberately do not. Every duration in the sixteen is now
`var(--dur-fast)` and every curve `var(--ease-standard)`: fifteen of them carry the RESPONSE job, and
the sixteenth, the skeleton, carries STATUS as a cycle. Twenty-four declarations across fourteen files
moved onto the registry; `.14s`, `.12s` and `.16s` folded into the fast rung, which is the drift the
census named.

**The seven that do not move, with the reason, because «not in the inventory» is not one.** Price,
status pill, badge, discount badge, availability mark, product thumbnail and counter carry **no
interactive state at all** - they are things that say a number or a word and answer nothing. That is
the first of the two legal reasons; none of the seven needed the second.

**The chevron takes the fast rung and not the base one, and that is a decision.** A chevron turning is
the ANSWER to the finger, and the panel behind it is CONNECTION - a different job with a slower rung
on purpose. If the chevron waited for the panel, the click would read as unanswered.

### Two claims from step 1 that the roll-call proved wrong

Both came from the state registry reading each file **in isolation**, and both would have been shipped
as facts:

- **`icon.css` was reported as «moves and has no state - the only confetti in the corpus».** It is not.
  The chevron's `transform` is turned by `.ord.open` in `order-row.css` and `.trustsec[open]` in
  `trust-strip.css`. The atom carries its own transition and the parent flips the state, which is
  correct architecture; a reader that opens one file at a time cannot see it.
- **`favourite.css` was reported as «has a focus state and does not move», on the product's most
  frequent control (92 hearts).** It moves. The heart is `btn--text btn--icon`, so its transition comes
  from `button.css` in one declaration serving all 92. The file owning the component and the file
  owning its motion are simply not the same file.

### Round 2 - molecules. N = 27, M = 19, K = 8

Nineteen molecules move on the page; **seventeen declare motion in their own file**, and the
difference is the point. `address-card`, `pagination` and `restock-note` declare nothing and still
move, because the buttons and links inside them are atoms that already do. A component can move
without owning a single transition, and a roll-call that only asked the file would have called all
three still.

Twenty-eight declarations moved onto the registry. `.14s`, `.18s`, `.2s`, `.25s` and `.28s` all
folded into the fast rung, which is what «same role, same duration» costs when it is applied for the
first time: **the product card alone carried three different numbers** for one hover - `.18s` on the
card, `.28s` on the photograph and `.15s` on the link inside it.

**The toast is the only molecule with the CONNECTION job, so it is the only one on `--dur-slow`**,
arriving on `--ease-enter` and leaving on `--ease-exit` - it goes back the way it came. It is also
where **the product's only `transition: all` died**. One declaration, reaching 32 elements, animating
whatever happened to change; the two properties that actually leave are now named, and the departure
distance folded from `8px` into `--move-md`, the same number the arrival uses.

**Eight do not move, and all eight for the first legal reason:** the spec table, the empty state, the
review, the description block, the question, the restock note, the toolbar and the client row declare
no interactive state of their own. The client row is worth its own line: its single `:hover` re-colours
a BUTTON inside the coach banner, and that button already carries the transition from `button.css`.
Nothing is missing there; the motion simply belongs to the atom.

**And round 1's carried finding closed itself.** `.all` and `.more` were literals reaching button's
elements from `section-head.css` and `seo-text.css`; both are molecules, both were converted here, and
the atom roll-call re-run afterwards is clean with no carried line at all.

### Round 3 - organisms. N = 34, M = 22, K = 12

The heaviest level, and the one that holds every surface. **Thirteen organisms declare motion in
their own file**; twenty-two move on the page, the rest through the atoms and molecules inside them.
Twenty-four declarations went onto the fast rung, two onto the base one, four onto the slow one.

**The header is the only component in the product with two rungs, and that is the point of having
rungs.** Hovering a link is RESPONSE and takes `--dur-fast`. The meta row collapsing as the page
scrolls is a transition INSIDE the component and takes `--dur-base` - together with the header's own
shadow, because both change in the same instant and used to carry three different numbers between
them (`.22s`, `.16s`, `.2s`).

**Two organisms already had an appearance and stepped up from 220ms to `--dur-slow`:** the filter
sheet rising from the bottom and the nav drawer coming down from the top. Both arrive on
`--ease-enter` and leave on `--ease-exit`, so each goes back the way it came. Their
`visibility 0s linear var(--dur-slow)` keeps its zero deliberately: visibility is not animated, it
only WAITS for the slide to finish.

**The mega menu was the single largest carrier of motion in the product** - the census found 7 560
elements on `.12s` from one declaration - and it is now on the same fast rung as every other answer.

### Three blind spots the roll-call found in its own instrument, not in the product

Each was found by pointing the walk at a case that had to fail, and each would have closed a round on
an empty set:

- **The coach stands render their component inside a same-origin `<iframe>`** (`demo/*.html`), and the
  query only read the top document. Eight components in a row came back «no own selector matched,
  verdict impossible» - which was at least honest about not knowing. The frames are walked now, and
  the token swap is injected into each of them, or an element inside a frame would look like a literal
  merely because the override never reached it.
- **Motion declared on a pseudo-element was invisible.** The scope strips the pseudo part to make a
  selector queryable, so the walk read the host - which has no transition - and called `pdp-tabs`
  still. It animates the opacity of its own `::before` shelf. `::before` and `::after` are read now.
- **`price-slider` cannot be answered by the browser at all.** Its motion lives on
  `::-webkit-slider-thumb` and `::-moz-range-thumb`, vendor pseudo-elements `getComputedStyle` does not
  expose. The instrument now says «the file declares motion, the page does not show it» rather than
  calling the component still - a limit named is worth more than a verdict invented.

And one more that is not about motion: **`0s` is a decision, not a drift.** The literal check counted
the `visibility 0s` of the two sliding surfaces and failed the round for two rules that are exactly
right. A zero duration says «this part does not animate, it is only delayed»; it is excluded now.

### Round 4 - the pattern. N = 1, M = 1, K = 0

`action-row.css` declares no motion of its own and needs none: it is a composition of buttons, and the
buttons carry the transition. Measured on its stand, two of its six elements move and both follow the
token swap. The pattern's own composition transitions - if any are needed at all - are step 4.

### What every round carried, and where it went

`.all` (`section-head.css`) and `.more` (`seo-text.css`) resolved to a literal `0.15s` on elements
that button's selectors also matched. Both files are **molecules**; round 2 converted them and the
re-run of round 1 came back with no carried line at all.

**Three layout properties are still moved by a layout property, and that is step 5's list, not this
one's:** the knob of `switch.css`, the knob of `cookie-banner.css` and the payment step of
`checkout-form.css` all travel on `left`, and the header's meta row collapses on `max-height`. Only
their durations changed here.

**Three cycles keep their literal** - `skpulse 1.1s`, `uivspin .9s` twice - because a cycle has no
token and cannot get one without the owner's decision. See the open question in section D.

**`design/overview.html` keeps three transitions, and it is a declared exception rather than a miss.**
The page is the stage-09 hub, not a product screen: it does not load `system/index.css` at all and
declares its own `--ink`, `--muted`, `--line` and `--shadow` inside the page, so `var(--dur-fast)`
would not resolve there and moving the rules into a component would invent a component for one page.
It is already the declared exception for the `@media` ban of stage 10 (`tools/bp.mjs`), and the motion
ban of step 6 takes the same exception, written down in the same place. The alternative - making the
hub load the design system - is a change to the whole page and belongs to whoever decides its future,
not to a step about durations.

## F5. Surfaces - what an ordinary transition cannot see at all

**The largest finding of step 4, and it outranks every number in the census.** Every surface in this
product appears by switching `display`, and `display` is a DISCRETE property: it has no midpoint, so
a transition has nothing to interpolate. A component could read `--dur-slow` honestly, pass the
roll-call of step 3, and still arrive in one frame. The roll-call was right about all of them and the
screen was still instant.

| number | what it counts |
|---|---|
| **20** | surfaces in the system that appear by switching `display`. Counted by `tools/motion.mjs --surfaces`, from both ends: the class may GIVE visibility (nineteen) or TAKE it (the cookie banner) |
| **+1** | the coach split view's client panel, switched from javascript through the `hidden` attribute. The instrument reads css and cannot see it; it is counted by hand, and that is said out loud so 20 is never read as «all of them» |
| **0** | `@starting-style` and `transition-behavior: allow-discrete` in the system before this step |
| **20 of 20** | carry the pair after step 4, and the check was falsified from the other side: the pair was taken off `.menu-tick` and the counter went red on that one line while its nineteen neighbours stayed green |

**The instrument found three defects in itself before it found anything in the product**, and the
first is the one worth keeping: it assumed the state marker stands on the VISIBLE side. It does not
always - `cookie-banner.css` writes `.wf-cookie.hidden{ display: none }`, a surface that is on by
default and is taken away by a class. **The surface every visitor meets was the one missing from the
list**, and the count went 19 to 20. The other two: the verdict was per FILE rather than per rule
(three files hold more than one surface, so one answered surface would have reported all of them
answered), and «the surface's own class» is not the last class in the selector but the first class of
the last descendant step - taking the last one read `.wf-cookie.hidden` as `.hidden`.

### What each surface got, and why the numbers differ

| job | surfaces | duration | movement |
|---|---|---|---|
| scrims - dark says «what is behind is paused» | `.wf-ov` `.ceov` `.fsheet-ov` `.wfh-scrim` `.hrail-scrim` | `--dur-slow` (the rail's on `--dur-base`, to land with its own flyout) | none. A scrim has no place it came from |
| centred dialogs | `.wf-city` `.wf-ckset` `.pm` | `--dur-slow` | `--move-md`, written INSIDE the centring transform - a second `transform` would replace the centring and throw the dialog into a corner |
| the auth surface | `.auth-ov` + `.auth-modal` | `--dur-slow` | two movements, not one: the scrim fades, the panel rises `--move-md` |
| the full-screen drill-down | `.wf-catov` | `--dur-slow` | none, deliberately. It replaces the whole page under the header, so a slide moves every pixel at once for the least meaning: the catalogue is not to the left of anything |
| menus and popovers | `.wfh-langmenu` `.wfh-cabmenu` `.menu-pop` | `--dur-base` | none. Anchored one gap under the control that opened them, so they are already where they came from; ten pixels on a popover that size reads as a lurch |
| the one surface with a SIDE | `.hrail-fly` | `--dur-base` | `--move-md` from the left, because it stands hard against the rail that opened it. This is the direction rule doing its only real work in the step |
| accordions | `.dr-subs` `.ord-body` | `--dur-base` | none, and the HEIGHT is not animated: both stand in lists where one opening moves everything below it, and the pack rules layout animation out by name |
| the panel switch | `.mega-panel` | `--dur-fast` | none. **The only one of the twenty doing RESPONSE and not CONNECTION** - it answers a hover while the menu is already open, and at `--dur-base` a cursor running down five categories leaves a queue of half-finished panels |
| the tick | `.menu-tick` | `--dur-fast` | none. A tick that slides has been somewhere else, and it has not |
| the validation message | `.pm-e` | `--dur-fast` | `--move-sm`, and this one is written out of `voice.md` rather than out of the ladder - see the tone table below |
| the banner that LEAVES | `.wf-cookie` | `--dur-slow` | `--move-md` down, exit only. On the way in it is part of the first paint |
| the split view's panel | `#clDetailBody` | `--dur-base` | `--move-md` from the side of the list, **and no fade at all** - see F6 |

**Browser support was measured, not recalled.** Chrome 151 in this session parses `@starting-style`,
`transition-behavior: allow-discrete`, `@view-transition` and `view-transition-name`. **Safari and
Firefox were not measured here**, and that is written down rather than assumed. A browser that does
not know the at-rule drops it and shows the surface instantly - exactly as it did before this step.

**And the source cannot answer whether it actually moved.** `allow-discrete` without a matching
`@starting-style` parses, passes every source check, and still jumps. `motion.mjs --surfaces --live`
adds the state class on a real screen and samples 30ms later; an opacity strictly between 0 and 1 is
the proof, because a jump has no midpoint by definition. Seven surfaces are confirmed this way today.
**What it still cannot reach is named rather than left as a low number**: a state carried on an
ancestor (`.ord.open .ord-body`), a surface inside a closed surface (`.mega-panel` cannot transition
while the mega menu is not rendered), and a dialog nothing has built yet. Each prints its own line and
is counted apart from «did not interpolate» - an unreachable surface and a broken one must never share
a number.

---

## F6. Screen states, and the structural answer that changes the question

**A state in this product is a DOCUMENT.** `goal-empty.html`, `goal-error.html`,
`goal-loading.html`: 16 empty, 13 error and 16 loading screens in the grey corpus, 14 / 11 / 13 in the
coloured one. No javascript switches a state inside a page. So «a transition between screen states»
cannot be done with a `transition` at all - it is a navigation, and it lives in section G. Inside a
document there are exactly two states: the coach split view's panel and the validation message under
a field.

### The tone check, per state, four values each

| state (`voice.md`) | carrier | duration | curve | amplitude | direction | verdict |
|---|---|---|---|---|---|---|
| **empty** - why it is empty + a way out | `.empty` / `.emptybox`, `#clDetailEmpty` | `--dur-base` | `--ease-enter` | – | no shift | **agrees.** A shift from below reads as «something is loading», and nothing is |
| **error** - what happened + what to do | `.pm-e`; `.wf-toast.error` | `--dur-fast` · `--dur-base` | `--ease-standard` | `--move-sm` | up, 2px | **disagreed, repaired.** See below |
| **loading** - silent or short | `.skpulse`; `.auth-spin` / `.co-spin` | `--dur-cycle` | `--ease-cycle` | – | even repeat | **agrees.** «Рівний повтор» and the physics of rotation demand the same thing |
| **success** - fact + next step, no celebration | `.wf-toast` (ok) | `--dur-slow` in, `--dur-base` out | `--ease-enter` / `--ease-exit` | `--move-md` | from below | **agrees**, no spring and no bounce |
| **OOS / availability** | `availability.css`, `restock-note.css` | – | – | – | – | **no motion, deliberately.** These are marks, not events: they neither arrive nor leave |
| **dangerous action** | `.ceov` + the confirm dialog | `--dur-slow` | `--ease-enter` / `--ease-exit` | `--move-md` | rise to centre | **agrees, and the sameness is deliberate.** Principle 4 is calm and confident: a delete dialog arrives like any other, because drama in motion is pressure |

**The one animation defect the tone check found.** `wfToast('error', ...)` arrived on the same 330ms
and the same ten pixels as «Адресу збережено»: one movement under two opposite sentences. The tone row
for an error names four things - short, no spring, SMALL amplitude, no celebration nearby - so the
error toast now takes `--dur-base` and `--move-sm`. The mechanism is a local alias, `--tt-travel`, and
not a redefined token: the first writing set `--move-md: var(--move-sm)` on the error, which works and
reads as a lie, and `roles.mjs` promptly reported `--move-md` as unused.

**And one animation was being cut by a number in a file this stage may not touch.**
`wireframes/_nav.js:1260` removes the toast node 250ms after adding `.out` - a number written when the
exit was a quarter of a second. Step 3 put the exit on `--dur-slow`, which is 330, so the toast
vanished 80ms before its own fade finished, and no census of css could see it. The grey corpus is
frozen, so the duration is what moves: **220 fits inside 250.** This is the one place in the stage
where a number OUTSIDE the system decided a number inside it.

**One discrepancy turned out to be in the text, not in the motion.** `microcopy.md` carried «Вітаємо у
Stack! Ви увійшли 🎉» while the product says `wfToast('ok', 'Ви увійшли')`. The product's edition is
the one that obeys Principle 5; the inventory's did not, and no product string exists in two editions.
Both rows in `microcopy.md` now match the corpus, with the banned edition kept where it belongs - as
the example in Розділ D.

### The frame cost, and the case the method fears does not exist here

**Three of the four layout animations were converted; the fourth cannot be.** All three were switch
knobs riding on `left`, and in each the two numbers the file carried were the same fact written twice
- the knob rests one inset from its own end of the track and crosses whatever is left. Written as the
relation: `44 - 20 - 3*2 = 18`, which is exactly `21 - 3`.

| was | became | proof |
|---|---|---|
| `.sw i` `transition: left` | `transform: translateX(var(--sw-travel))` | measured: 21 -> 3, travel **-18**, to the pixel |
| `.co-sw::after` `transition: left` | `transform: translateX(var(--cosw-travel))` | measured on `checkout.html`: 2 -> 18, travel **+16** |
| `.ck-tog i` `transition: left` | `transform: translateX(var(--ckt-travel))` | **cannot be proved by pixels**, and that is said rather than skipped: the cookie banner stands on ONE page in the whole tree - `wireframes/system.html`, in the frozen corpus - so `cookie-banner.css` draws nothing today. Arithmetic only, proof at stage 12 |
| `.wfh-meta` `transition: max-height` | **stays** | the header is `sticky`, so it holds its space in flow, and the whole point of the collapse is that it takes less. **No transform frees layout space** |

`proof.mjs --against HEAD` over the three screens that carry a knob: **0.000% of pixels moved.**

**What the one surviving layout animation costs, in the browser's own numbers** (`listing.html`, 2006
elements, `Performance.getMetrics`): 400ms of idle - **0 layouts**; the collapse - **25 layouts, 1.1ms
of layout, 1.3ms of style**; the same element on `opacity` alone - **1 layout, 0.1ms**. And the second
measurement, which removes the argument the pack makes: **the meta bar exists only from 860px**, so a
weak phone never renders it.

**Expensive PAINT is 24 declarations, not 70.** The census counts 70, but 46 of those are `color`,
`background` and `border-color` on hover states, which load no surface. `box-shadow` and `filter`
carry 24 rules.

**And the list of twenty cards the method fears does not occur in this product.** Every one of the 24
triggers is `:hover`, `:focus-visible` or a selection class (`.on`, `[aria-current]`). A pointer is
one, focus is one, a selected item in a group is one: at most two elements repaint at a time, and that
only while a selection moves.

**There is one place where half the document does move at once, and it is not a list.** Switching the
theme flips `[data-theme]` on the root, which changes the colour of everything. Measured:
`listing.html` holds 2006 elements of which **463 carry a colour transition**, and the switch costs
**32.1ms of style recalculation** in one go; `index.html`, 459 and 21.7ms. **Nobody ordered that** -
those transitions were written for a pointer, and the whole page cross-fading is a side effect of 463
hover rules, the same argument that removed `transition: all`.

**The owner chose to suppress it.** `theme.js` puts `.uiv-theming` on the root, flips the attribute,
and takes the class off after TWO animation frames - the first callback runs before the change is
painted, so removing it there would let the transitions start anyway. Under that class one rule kills
transitions on `*` with `!important`, which is everything this stage argues against and is the point:
it has to outrank every component for the length of one frame. **It is a shutter, not a safety net** -
it exists for 16ms at a time and hides nothing, because the audit runs on a page nobody is switching.

Measured through the product's own entry point rather than by setting the attribute by hand, which is
what the first measurement did and why it saw no change:

| | transitions running one frame after the switch |
|---|---|
| `listing.html` through `uivTheme()` | **0** |
| `listing.html` bypassing the shutter | **390** |
| `index.html` through `uivTheme()` | **0** |
| `index.html` bypassing the shutter | **263** |

**`will-change`: zero in the whole tree**, which is the correct state - a permanent `will-change` is a
graphics memory leak, not an optimisation.

### The safety net: decided at step 5, and the decision is NO

With the audit green without one, the owner chose not to put a blanket rule back. The argument for it
was the code stage 12 will write; the argument against it is this stage's own evidence: the net that
was already there cost four stages of numbers. Under it the first run of the audit would have returned
**0 defects instead of 96**, and not one of the five findings above would ever have been made. Stage 12
is covered by an instrument instead - `motion.mjs --reduce` is a gate now, and a literal written by a
subagent turns it red the same way it turned red here.

---

## G. The fork about moving between documents

**Decided at step 4: branch B, `@view-transition { navigation: auto }` in `base.css`.** Every screen
here is a separate html document, so «the detail slides out of the side of the list» cannot be done
with an ordinary `transition` at all: the page is unloaded together with its stylesheet before the
next one paints.

| branch | what it is | outcome |
|---|---|---|
| A | do not animate between documents; CONNECTION stays with what happens inside a document | **recommended, not taken** |
| B | one record, `@view-transition { navigation: auto }`, with quiet degradation | **TAKEN by the owner** |
| C | a decision for one named flow | not taken |

**The recommendation was A, and the reason was not caution but the pack's own rule:** branch B is
taken «only if the inventory holds a concrete pair of screens with the CONNECTION job», and the
inventory of moments names no such pair - it names surfaces inside a document and four in-session
steps. The owner took B. That makes this the one moment in the stage that came from a DECISION rather
than from the corpus, and it pays for that twice: with a row of its own here, and with the critique
step 6 owes a look that did not exist before.

**And it was suspected of costing the instruments, so it was measured.** `theme.mjs` threw a CDP
timeout on one run after this step and passed on the next, and a cross-document transition holds the
old frame while the new one paints - in a headless target that presents no frames, a stall would look
exactly like that. Twenty navigations across five product screens, with the rule and with it commented
out: **median 113ms against 114ms**, and the run WITH the rule finished faster of the two. The rule
costs the browser gates nothing; the timeout was a second Chrome left running beside the walk. The
suspicion was worth an instrument either way - a stalled navigation would have made every browser gate
in `tools/` flaky, and flakiness is the one defect class that gets explained away instead of found.

**What it costs at `reduce`, closed by name.** The browser's crossfade is an ANIMATION, not a
transition, so the token override at the foot of `tokens.css` cannot reach it. `base.css` carries its
own `prefers-reduced-motion` block switching off `::view-transition-group/old/new`. **The navigation
is untouched** - the next screen still arrives, it just arrives the way it did before the rule
existed. A state may never disappear together with its motion.

### The repair at step 6: branch B was buying a mechanism and inheriting values

**The critique the row above promised found that the transition shipped on numbers nobody in this
project chose.** One record buys the mechanism and nothing else; the browser then supplies its own
animation for the crossfade. Read from inside a live navigation in Chrome 151, before the repair:

| pseudo-element | animation | duration | curve |
|---|---|---|---|
| `::view-transition-old(root)` | `-ua-view-transition-fade-out` | 250ms | `ease` |
| `::view-transition-new(root)` | `-ua-view-transition-fade-in` | 250ms | `ease` |
| `::view-transition-group(root)` | `-ua-view-transition-group-anim-root` | 250ms | `ease` |
| `::view-transition-old/new(root)` | `-ua-mix-blend-mode-plus-lighter` | 250ms | `ease` |

250 is not 150, not 220 and not 330. And `ease` is **the exact value this stage exists to remove** -
section A2 counts it on 817 of 818 timing functions and calls it «the value a declaration gets when
nobody names one». It came back, at full size, on the one moment the owner personally chose.

**The curve has two spellings and the first reading took the wrong one.** A CSS animation carries
`linear` on the EFFECT, which is a default, and the real `animation-timing-function` on every
KEYFRAME. The critique log first recorded `linear`, which was a true reading of the wrong half; the
rendered curve is `ease`. Corrected in the log rather than quietly, and `motion.mjs --view` now prints
both spellings side by side so the next reader cannot repeat it.

**What it is now, and why these tokens.** A whole document arriving is an APPEARANCE, so it takes the
top rung of the same ladder every other appearance takes - `--dur-slow`, on all four animations. That
is 80ms slower than the browser's default, and it is said out loud, because the alternative is a
second ladder for one moment. The curve is read off the direction, exactly as the twenty surfaces of
step 4 read it: what LEAVES takes `--ease-exit`, what ARRIVES takes `--ease-enter`, and the group,
which morphs the snapshot's box rather than its opacity and on two same-sized documents has nothing to
morph, takes the symmetric `--ease-standard`.

**The census could not have found this, and that is the more expensive half of the finding.** Every
other question in `motion.mjs` is asked of an ELEMENT. These four animations live on a pseudo-element
tree the browser builds when a navigation starts and destroys when it lands: it is in no document at
rest, so `querySelectorAll('*')` cannot reach it in principle, not by accident. **A green counter that
cannot see the class is not a zero.** `motion.mjs --view` is the mode that asks - it installs a
`pagereveal` listener before the incoming document runs a line of its own script, waits for the
transition's `ready`, and reads `document.getAnimations()`.

    ok ::view-transition-group(root)  330ms (--dur-slow)  --ease-standard
    ok ::view-transition-new(root)    330ms (--dur-slow)  --ease-enter    x2
    ok ::view-transition-old(root)    330ms (--dur-slow)  --ease-exit     x2
    поза реєстром: 0 · при reduce анімацій 0 · підміна --dur-slow на 7.77s -> усі 5 поїхали за токеном

**And it was falsified before it was believed.** With the override commented out the same run prints
five lines of ПОЗА РЕЄСТРОМ at 250ms `ease`. The curve check is deliberately stricter than «is this
spelling in the table», because `linear` IS in the table - it is `--ease-cycle` - and a table lookup
alone would have passed a default. Each pseudo-element is checked against the curve its ROLE demands.

**What the transition carries: nothing but the page.** `view-transition-name` has **0 declarations**
in the tree, so what crossfades is one whole-page snapshot against another. Element continuity - the
card photo becoming the PDP photo - is NOT taken here, and the reason is a constraint rather than a
preference: a `view-transition-name` must be unique per document, a listing renders 12 product cards,
and 12 duplicates make Chrome skip the entire transition rather than half of it. Unique per-card names
cannot come from a component stylesheet and cannot come from a screen file either, because stage 11
bans motion declarations there. It is an order for the system, and it is in `backlog.md`.

## H. Motion at a breakpoint

**Decided at step 4: NO, and the exception is no as well.** The default is already no - the point
fires while a person is dragging the edge of the window and not looking at the content, and animating
a grid rebuild is the most expensive movement available for the least meaning.

The pack allows one exception: a surface that did not exist at the narrow width, which appears as an
element rather than as a rebuild. In this product that would be three - the filter rail `.frail`, the
category rail `.hrail` and the split view's right panel. **The exception is not taken, and the reason
is stronger than the default: all three arrive ONLY through a media query**, that is, from a window
being resized rather than from anything a person did to them. There is nothing to announce, so there
is nothing to animate. Nothing was written into any file for this decision, which is the point of
recording it here.

---

## I. What step 4 changed, in one list

| | |
|---|---|
| the fourth pair | `--dur-cycle: 1100ms`, `--ease-cycle: linear` - the last three literals in the product are gone |
| surfaces | 20 of 20 carry `allow-discrete` + `@starting-style`; the 21st, the split view's panel, by hand |
| screen states | the tone table checked per state, one animation defect found and repaired (the error toast), one truncated exit found and repaired (250ms), one text drift found and synced |
| patterns | one pattern, and it gets **no** transition of its own - said with the number and the reason |
| between documents | branch B taken, with its own `reduce` block and a critique owed at step 6 |
| at a breakpoint | no, exception included; nothing written into any file |
| instruments | `motion.mjs --surfaces` and `--surfaces --live` added, with eight wrong versions between them; `motion-row.mjs` rebuilds a stand page's motion row from its css instead of fifteen hand edits |

---

## J. ЕКРАН -> МОМЕНТИ - the slice stage 12 will actually ask for

Every table above is sorted by EVENT, and the rollout will ask about a SCREEN. A row with a screen's
name does not exist in an event-sorted inventory by construction, so this section is produced
mechanically (`tools/screen-moments.mjs`) rather than written: it takes each component's anchors out
of `inventory.md`, finds them in the markup of every screen of the GREY corpus - 142 screens, the
whole product, against 92 in colour - and lists the motion each one brings with it.

**The grey corpus and not the coloured one**, because the coloured layer is a selection and stage 12
assembles the rest: a table covering only what is already done is silent about the thing it is written
for.

### On EVERY screen, named once

The shared script draws these on every page, so they are stated here instead of being repeated 142
times - and this paragraph is itself a finding: **a reader with clean context could not tell which
surfaces a screen carries**, because the script that injects them is not a file they were given.

| component | job | duration |
|---|---|---|
| header (`header.css`) - meta bar collapsing, its shadow, the language and cabinet menus, the mega scrim | response · **connection** | `--dur-fast` for the menus' own links, `--dur-base` for the collapse and the shadow, `--dur-slow` for the scrim |
| mega menu (`mega-menu.css`) - the panel switching under the pointer | **response** | `--dur-fast` |
| nav drawer (`nav-drawer.css`) + its accordion | **connection** | `--dur-slow` panel, `--dur-base` accordion |
| catalogue overlay (`cat-overlay.css`) | **connection** | `--dur-slow` |
| overlay and dialog scrim (`overlay.css`) | **connection** | `--dur-slow` |
| auth dialog (`auth-dialog.css`) + its spinner | connection · **status** | `--dur-slow` · `--dur-cycle` |
| city dialog (`city-dialog.css`) | **connection** | `--dur-slow` |
| cookie banner + settings (`cookie-banner.css`) | connection · response | `--dur-slow` |
| toast (`toast.css`) | **connection** | `--dur-slow` in, `--dur-base` out; an ERROR toast takes `--dur-base` and `--move-sm` |
| tab bar (`tabbar.css`) | none - the mark of the page you stand on neither arrives nor leaves | – |
| footer (`footer.css`) | **response** | `--dur-fast` |
| menu popover (`menu.css`) + its tick | response · connection | `--dur-base` · `--dur-fast` |
| filter sheet (`filter-sheet.css`) | **connection** | `--dur-slow` |
| client dialog (`client-dialog.css`) | none - no interactive state declared; its scrim moves, the box does not | – |

**And three that belong to no component at all, on every screen:** the cross-document view transition
(`base.css`, switched off by name at `reduce`), smooth scroll to an in-page anchor (`base.css`,
CONNECTION, `auto` at `reduce`), and the theme shutter (`base.css` + `theme.js`, one frame).

### Per screen, what stands ONLY there

<!-- ЕКРАН -> МОМЕНТИ: генерується tools/screen-moments.mjs --write -->

| екран | моменти, що є ТІЛЬКИ на ньому |
|---|---|
| `404.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) |
| `500.html` | Кнопка (`button.css`, відповідь) |
| `account-addresses-add.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-addresses-courier.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-addresses-delete.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-addresses-edit.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-addresses-empty.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-addresses-postomat.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-addresses-viddilennia.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-addresses.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-empty.html` | Кнопка (`button.css`, відповідь) · Щабель лояльності (`loyalty-rung.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-error.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-loading.html` | Скелетон (`skeleton.css`, статус) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-loyalty-empty.html` | Щабель лояльності (`loyalty-rung.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-loyalty-max.html` | Щабель лояльності (`loyalty-rung.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-loyalty.html` | Щабель лояльності (`loyalty-rung.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-orders-empty.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-orders.html` | Кнопка (`button.css`, відповідь) · Іконка (`icon.css`, відповідь) · Рядок замовлення (`order-row.css`, відповідь · зв'язок) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-profile-delete.html` | Кнопка (`button.css`, відповідь) · Перемикач (`switch.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-profile-email.html` | Кнопка (`button.css`, відповідь) · Перемикач (`switch.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-profile-lang.html` | Кнопка (`button.css`, відповідь) · Перемикач (`switch.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-profile-phone.html` | Кнопка (`button.css`, відповідь) · Перемикач (`switch.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-profile-withemail.html` | Кнопка (`button.css`, відповідь) · Перемикач (`switch.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-profile.html` | Кнопка (`button.css`, відповідь) · Перемикач (`switch.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-wishlist-empty.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-wishlist-many.html` | Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account-wishlist.html` | Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `account.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Рядок замовлення (`order-row.css`, відповідь · зв'язок) · Щабель лояльності (`loyalty-rung.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `auth-code.html` | **руху немає** - на екрані стоять лише спільні компоненти шапки й підвалу, і всі їхні моменти перелічені вище |
| `auth-error.html` | **руху немає** - на екрані стоять лише спільні компоненти шапки й підвалу, і всі їхні моменти перелічені вище |
| `auth-loading.html` | **руху немає** - на екрані стоять лише спільні компоненти шапки й підвалу, і всі їхні моменти перелічені вище |
| `auth-newuser.html` | **руху немає** - на екрані стоять лише спільні компоненти шапки й підвалу, і всі їхні моменти перелічені вище |
| `auth.html` | **руху немає** - на екрані стоять лише спільні компоненти шапки й підвалу, і всі їхні моменти перелічені вище |
| `brands-empty.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `brands-error.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `brands-loading.html` | Скелетон (`skeleton.css`, статус) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `brands.html` | SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `cart-coach-empty.html` | Кнопка (`button.css`, відповідь) |
| `cart-coach.html` | Кнопка (`button.css`, відповідь) · Рядок кошика (`cart-row.css`, відповідь) |
| `cart-empty.html` | Кнопка (`button.css`, відповідь) |
| `cart-oos.html` | Кнопка (`button.css`, відповідь) · Рядок кошика (`cart-row.css`, відповідь) |
| `cart.html` | Кнопка (`button.css`, відповідь) · Рядок кошика (`cart-row.css`, відповідь) |
| `catalog-page-error.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `catalog-page-loading.html` | Скелетон (`skeleton.css`, статус) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `catalog-page.html` | Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `checkout-declined.html` | Кнопка (`button.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) |
| `checkout-loading.html` | Кнопка (`button.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) |
| `checkout-loggedin.html` | Радіо (`radio.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Перемикач (`switch.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) |
| `checkout-noaddr.html` | Радіо (`radio.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Перемикач (`switch.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) |
| `checkout.html` | Радіо (`radio.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Перемикач (`switch.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) |
| `coach-client-edit-confirm.html` | Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-client-edit.html` | Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-client-empty.html` | Кнопка (`button.css`, відповідь) · Рядок замовлення (`order-row.css`, відповідь · зв'язок) · Хлібні крихти (`breadcrumb.css`, відповідь) · Клієнти тренера (`coach-clients.css`, зв'язок) |
| `coach-client-error.html` | Кнопка (`button.css`, відповідь) · Рядок замовлення (`order-row.css`, відповідь · зв'язок) · Хлібні крихти (`breadcrumb.css`, відповідь) · Клієнти тренера (`coach-clients.css`, зв'язок) |
| `coach-client-loading.html` | Кнопка (`button.css`, відповідь) · Скелетон (`skeleton.css`, статус) · Рядок замовлення (`order-row.css`, відповідь · зв'язок) · Хлібні крихти (`breadcrumb.css`, відповідь) · Клієнти тренера (`coach-clients.css`, зв'язок) |
| `coach-client-new.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Клієнти тренера (`coach-clients.css`, зв'язок) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-client.html` | Кнопка (`button.css`, відповідь) · Рядок замовлення (`order-row.css`, відповідь · зв'язок) · Хлібні крихти (`breadcrumb.css`, відповідь) · Клієнти тренера (`coach-clients.css`, зв'язок) |
| `coach-clients-cap.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Клієнти тренера (`coach-clients.css`, зв'язок) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-clients-empty.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Клієнти тренера (`coach-clients.css`, зв'язок) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-clients-error.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Клієнти тренера (`coach-clients.css`, зв'язок) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-clients-loading.html` | Скелетон (`skeleton.css`, статус) · Хлібні крихти (`breadcrumb.css`, відповідь) · Клієнти тренера (`coach-clients.css`, зв'язок) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-clients.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Клієнти тренера (`coach-clients.css`, зв'язок) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-home-empty.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-home-error.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-home-free.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-home-loading.html` | Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-home.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-landing.html` | Кнопка (`button.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) |
| `coach-order-error.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-order-loading.html` | Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-order.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-orders-empty.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-orders-error.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-orders-loading.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-orders.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Форма чекауту (`checkout-form.css`, відповідь · статус) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-session-addclient.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-session-addempty.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-session-empty.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-session-loading.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-session-newclient.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-session-oos.html` | Кнопка (`button.css`, відповідь) · Банер (`banner.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-session-priceblock.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-session.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-tariff-cancel.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-tariff-free.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-tariff.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `coach-verify-deadend.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-verify-error.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-verify-loading.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-verify-tier.html` | Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-verify.html` | Поле (`field.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `coach-wishlist.html` | Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Оболонка кабінету (`account-shell.css`, відповідь) |
| `content-about.html` | Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Схожі товари (`related.css`, відповідь) |
| `content-article.html` | Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Головний блок (`hero.css`, відповідь) |
| `content-blog.html` | SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `content-contacts.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Схожі товари (`related.css`, відповідь) |
| `content-delivery.html` | Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Схожі товари (`related.css`, відповідь) |
| `content-faq.html` | Кнопка (`button.css`, відповідь) · Іконка (`icon.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `content-guarantee.html` | Чекбокс (`checkbox.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Схожі товари (`related.css`, відповідь) |
| `content-legal.html` | Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Схожі товари (`related.css`, відповідь) |
| `content-loyalty-buyer.html` | Кнопка (`button.css`, відповідь) · Щабель лояльності (`loyalty-rung.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `content-loyalty.html` | Кнопка (`button.css`, відповідь) · Щабель лояльності (`loyalty-rung.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Головний блок (`hero.css`, відповідь) |
| `content-newsletter.html` | Кнопка (`button.css`, відповідь) |
| `content-promo.html` | Кнопка (`button.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Банер (`banner.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `content-returns.html` | Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Схожі товари (`related.css`, відповідь) · Головний блок (`hero.css`, відповідь) |
| `content-reviews.html` | Кнопка (`button.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) |
| `goal-empty.html` | Кнопка (`button.css`, відповідь) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `goal-error.html` | Кнопка (`button.css`, відповідь) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `goal-loading.html` | Скелетон (`skeleton.css`, статус) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `goal.html` | Рейтинг (`rating.css`, відповідь) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Схожі товари (`related.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `home-buyer.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Банер (`banner.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Плитка цілі (`goal-tile.css`, відповідь) · Картка блогу (`blog-card.css`, відповідь) · Логотип бренду (`brand-logo.css`, відповідь) · Вкладки товару (`pdp-tabs.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) · Головний блок (`hero.css`, відповідь) |
| `home-cart.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Банер (`banner.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Плитка цілі (`goal-tile.css`, відповідь) · Картка блогу (`blog-card.css`, відповідь) · Логотип бренду (`brand-logo.css`, відповідь) · Вкладки товару (`pdp-tabs.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) · Головний блок (`hero.css`, відповідь) |
| `home-catalog.html` | Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) · Головний блок (`hero.css`, відповідь) |
| `home-coach.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Банер (`banner.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Плитка цілі (`goal-tile.css`, відповідь) · Картка блогу (`blog-card.css`, відповідь) · Логотип бренду (`brand-logo.css`, відповідь) · Вкладки товару (`pdp-tabs.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) · Головний блок (`hero.css`, відповідь) |
| `index.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Банер (`banner.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Плитка цілі (`goal-tile.css`, відповідь) · Картка блогу (`blog-card.css`, відповідь) · Логотип бренду (`brand-logo.css`, відповідь) · Вкладки товару (`pdp-tabs.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) · Головний блок (`hero.css`, відповідь) |
| `listing-empty.html` | Кнопка (`button.css`, відповідь) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `listing-error.html` | Кнопка (`button.css`, відповідь) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `listing-filtered.html` | Рейтинг (`rating.css`, відповідь) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `listing-list.html` | Рейтинг (`rating.css`, відповідь) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `listing-loading.html` | Скелетон (`skeleton.css`, статус) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `listing-sheet.html` | Рейтинг (`rating.css`, відповідь) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Схожі товари (`related.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `listing.html` | Рейтинг (`rating.css`, відповідь) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Схожі товари (`related.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `maintenance.html` | Кнопка (`button.css`, відповідь) |
| `megamenu-health.html` | Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) · Головний блок (`hero.css`, відповідь) |
| `megamenu-protein.html` | Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) · Головний блок (`hero.css`, відповідь) |
| `megamenu-vitamins.html` | Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) · Головний блок (`hero.css`, відповідь) |
| `megamenu.html` | Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) · Головний блок (`hero.css`, відповідь) |
| `order-placed-account-end.html` | Кнопка (`button.css`, відповідь) · Головний блок (`hero.css`, відповідь) |
| `order-placed.html` | Кнопка (`button.css`, відповідь) · Головний блок (`hero.css`, відповідь) |
| `overview.html` | **руху немає** - на екрані стоять лише спільні компоненти шапки й підвалу, і всі їхні моменти перелічені вище |
| `product-coach.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Іконка (`icon.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Смуга довіри (`trust-strip.css`, відповідь) · Галерея (`gallery.css`, відповідь) · Мініатюра сертифіката (`cert-thumb.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Картка блогу (`blog-card.css`, відповідь) · Вкладки товару (`pdp-tabs.css`, відповідь) |
| `product-error.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `product-loading.html` | Скелетон (`skeleton.css`, статус) · Галерея (`gallery.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Вкладки товару (`pdp-tabs.css`, відповідь) |
| `product-oos.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Смуга довіри (`trust-strip.css`, відповідь) · Галерея (`gallery.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Вкладки товару (`pdp-tabs.css`, відповідь) |
| `product-reviews.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Галерея (`gallery.css`, відповідь) · Мініатюра сертифіката (`cert-thumb.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) |
| `product.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Іконка (`icon.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Смуга довіри (`trust-strip.css`, відповідь) · Галерея (`gallery.css`, відповідь) · Мініатюра сертифіката (`cert-thumb.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) · Картка блогу (`blog-card.css`, відповідь) · Вкладки товару (`pdp-tabs.css`, відповідь) |
| `quiz.html` | Кнопка (`button.css`, відповідь) · Рейтинг (`rating.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `search-empty.html` | Кнопка (`button.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `search-loading.html` | Скелетон (`skeleton.css`, статус) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `search-suggest.html` | Чекбокс (`checkbox.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) |
| `search.html` | Рейтинг (`rating.css`, відповідь) · Лічильник кількості (`stepper.css`, відповідь) · Перемикач вигляду (`view-toggle.css`, відповідь) · Обране (`favourite.css`, відповідь) · Картка товару (`product-card.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Рейка фільтрів (`filter-rail.css`, відповідь · зв'язок) |
| `system.html` | Кнопка (`button.css`, відповідь) · SEO-текст (`seo-text.css`, відповідь) · Хлібні крихти (`breadcrumb.css`, відповідь) · Заголовок секції (`section-head.css`, відповідь) |

<!-- /ЕКРАН -> МОМЕНТИ -->
