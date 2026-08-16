# tools - the instruments, and what each one is for

Seven checks, a transform and a driver. Every one of them answers a question this project asks
at the end of **every** step, and until 2026-08-11 all of them lived in a session
scratch folder and were rebuilt from memory each time. That is the same failure
`CLAUDE.md` names for the product - *"a hand fix does not survive the next
clone"* - applied to the apparatus that checks the product.

Nothing here needs a server started by hand, a port chosen by hand, or a list of
pages typed by hand. Each script starts what it needs and cleans up after itself.

```
node tools/accept.mjs                    the gate: every screen, 390
node tools/accept.mjs 1280 account       one width, named screens
node tools/states.mjs                    open every state, re-run the passes
node tools/css-comments.mjs              every stylesheet, one second
node tools/vars.mjs                      every var(--x), and whether it exists
node tools/links.mjs [--write]           every href, and whether it goes anywhere
node tools/theme.mjs [--source]          the dark theme as a stress test
node tools/roles.mjs [name...]           does the stand still describe the file
node tools/grey-vars.mjs [--write]       private blocks learn the system's names
node tools/crop.mjs 390 coach-tariff .tf-compare /tmp/t.png
node tools/scope.mjs [--apply]           is a screen inside the scope its components need
node tools/btn-rank.mjs [--apply]        a control wearing only `btn` renders as bare text
node tools/inert.mjs [--apply]           which private rules can go, decided by loading without them
```

`accept`, `states`, `css-comments`, `vars`, `links`, `theme` and `roles` exit
non-zero on a finding, so they compose.

---

## `accept.mjs` - the gate

`CLAUDE.md`: *"Acceptance is in the browser, not in a table. Open it, walk every
state, narrow to 360px, and only then say done."* This is the browser half, over
every screen at once. Six questions per page, each one a defect somebody found
by eye after a step had already said it was finished:

| question | what it catches |
|---|---|
| sideways scroll | `scrollWidth - clientWidth` must be 0 |
| console error | anything uncaught, or a `console.error`, during load |
| em dash | `—` appears nowhere in project output |
| curly apostrophe | one apostrophe form in the product: `'` |
| doubled separator | the crumb draws its slash in CSS; a typed one shows twice |
| **doubled mark** (`dot=`) | a component draws a mark with `::before` and the markup types it too |

**The crumb check asks "is it drawn twice", not "is it typed"**, and that is the
whole difference between an instrument and a nuisance. `ia/*.html` type their
slash and load no stylesheet that draws one, so they are correct - an earlier
version called five of them a failure.

**The `dot=` column is that same check, widened at 8.31 to the family it turned
out to belong to.** `.pavail` had a doubled dot at 8.7; the tariff pill had one at
8.7; the third time a shape appears it stops being a screen's mistake. The census
found **31 on seven screens**, including `account-wishlist-many` - a buyer screen,
twelve lines, shipping two dots each. Four glyphs, each one a component in this
system draws: `●` the availability / status dot, `✓` an included line, `·` a list
bullet, `✕` an excluded one. The test is deliberately narrow - the element's OWN
first text node, never a descendant's - so a word that merely contains the
character is not a finding.

**Do not put a backtick in a note inside `accept.mjs`.** The probe lives in a
template literal, and the first writing of the `dot=` note closed it early. Ninth
in that family, and the file now says so where the note is.

## `states.mjs` - the walk that opens things

The instrument that ended an eleven-instance defect class, after three wrong
versions. A dialog or drawer that rebuilds part of the page loses whatever the
icon and mark passes put there, because those ran once on load.

It does not carry a list of characters or a list of components. It opens a state,
**re-runs the passes, and reports what moved** - every pass is idempotent, so a
second run changes nothing unless a pass never reached that state. The rules are
the product's and the verdict is a diff.

Its openers are enumerated **at runtime** from the product's own naming
convention. Three earlier versions carried a typed list of 22 calls and reported
"none" across 32 screens while four states were broken: two names in the list
were not functions in this product, and `wfAuthDone` - losing 585 marks across
four screens - was never in it at all. A dialog added next month is walked the
day it is added.

**And then it kept two of them typed, and both halves of that were wrong (step
8.19).** The pattern read `open[A-Z]` OR `toggleDrawer` OR `toggleCab`, and
measured against the product's real globals **`toggleDrawer` is not a function in
either layer** - a dead name, exactly like `openClientDlg` before it - while
**`toggleBurger`, `toggleDrCat` and `toggleLang` are, and were never walked**.
*A hand-written list of two is still a hand-written list.* Now `toggle[A-Z]`.

It surfaced sideways, which is the part worth keeping. A contrast census for A10
could not find `a.on` «Українська» - the current language, painted
`rgb(255,90,0)` on **82 of the 88 screens**. It sits inside `.wfh-langmenu`,
`toggleLang` opens it, and nothing opened it, so its box was 0x0 and every census
read past it. A record had carried it as an accepted contrast exception since
2026-08-07 while no walk had ever drawn it. **The widened walk still reports
«none»**, so what was broken was coverage, not marks - which is the only reason
this was invisible for so long: the instrument was right about everything it
looked at.

## `css-comments.mjs` - the silent one

An edit that inserts a comment end inside an existing comment orphans the
original terminator. In `.js`, `node --check` says so in a second. **In CSS
nothing says anything**: no parse error, the parser drops declarations until it
finds its footing. It happened three times in one session and the CSS one reached
a screen.

The stylesheets here carry more prose than rules, which is deliberate and is
exactly what makes this likely. CSS only, on purpose: the `.js` version reported
a regex literal as an orphan, and an instrument that reports a correct line
trains you to ignore it.

## `vars.mjs` - the name that nothing declares

Quieter than the CSS comment, and it reached the product. `var(--dark)` with
nothing declaring `--dark` does not fall back to black and raises nothing: the
declaration becomes invalid at computed-value time and the property lands on
inherit. `background: var(--dark)` disappears, `color: #fff` beside it survives -
white ink on white paper, drawn exactly as instructed, with no error anywhere.
`coach-verify-tier` lost both of its tier cards that way, and `accept`, `states`
and `css-comments` all pass it.

The cause is structural, not a typo: a screen with its own `<style>` block gets
cloned to colour, the head is swapped from `wireframes/_wf.css` to
`design/system/index.css`, and the private block keeps speaking the grey layer's
names. **Thirty screens did this**, all of them the coach flow, until step 8.17
translated them with `grey-vars.mjs` below. It is 0 now, and it is 0 that this
check has to keep saying - a screen coloured next month arrives the same way.

**Three wrong versions, each lying differently**, and all three are written into
the file because the next check to read CSS will meet the same three:

1. `@import[^;]*["']([^"']+)["']` **matched 43 times on a file with 43 imports and
   captured `;\n@import ` every time** - a greedy `[^;]*` settles on the closing
   quote of one import and the opening quote of the next. The count was right,
   the content was garbage, and the check then called 86 screens broken over
   tokens declared exactly where they belong. *A match count is not a result.*
2. **The comments are most of these files.** They quote the grey names in prose
   to explain what changed, so an uncommented scan flagged all nine on all 174
   screens. *A check that fires everywhere is describing itself.*
3. `var(--x, fallback)` is not a defect, and not every declaration is in a
   stylesheet - `--p` comes from the markup and `--uiv-side-h` from `_nav.js`.

## `links.mjs` - does this link go anywhere

**Four checks stood at the gate and not one of them asked it.** On the first
run: **803 of the 2882 internal hrefs in `design/` resolved to nothing, and 0 of
the 1579 in `wireframes/` did** - 28% against zero, in a layer that is a clone
of the other.

The blind spot has a shape worth naming, because it predicts the next one. Every
instrument above examines a *screen*, and a dead link raises nothing on the
screen that carries it: the 404 happens on the NEXT page, which no pass visits.
A link is the one thing that is not on the page it is written on.

650 of the 803 were one cause. `design/kit/hero.html` and
`design/kit/demo/hero.html` share their markup and sit one directory apart, and
one relative path cannot be right at two depths - line 35 of the first writes
`../../wireframes/catalog-page.html` (correct here) and `../../listing.html`
(the repository root) in the same line. 152 were the tirage, pointing at the 41
screens that are still grey-only, and 1 was the design hub's own favicon.

**The correction is read off the href, never typed.** Drop the `../` run, keep
the rest as a tail, find the file whose path ends with it; one candidate is the
answer, several and the linking file's own folder decides first, then
`wireframes/`. More than one survivor and it writes nothing.

**Three things it had to be taught, all three from wrong first runs:**

1. **An escaped markup sample is not a link** - `stack-action.html` prints
   `&lt;a … href="..."&gt;` as documentation, and 16 more hid in comments and
   code samples. Caught before the file was written, which is the only time this
   folder has managed that.
2. **A link built at runtime cannot be read statically**, and half-parsing it is
   worse than skipping it: `' + n.file + '` was reported as a dead href on two
   pages. `<script>` is blanked, and what `_nav.js` renders is outside what this
   can see - stated in the file rather than left to be found.
3. **Blanking keeps the length.** The scan runs on the blanked copy and the edit
   lands on the real one, so every offset has to agree; a `<script>` collapsed to
   one space shifts the rest and the splice writes into the middle of a tag.
   Three files carry an href literal both live and inside a blanked region -
   `coach-clients.html` has `coach-session.html` 3 times live of 4 - so a
   string-level replace would have edited the commented copy too. None of the
   three was dead that day. *Next time is not a plan.*

**And the same question asked of the server is not the same question** - case,
directory indexes and encoding live there and not in `existsSync`. Confirmed
once, over http: 2050 distinct (page, target) pairs, non-200: 0.

## `theme.mjs` - the dark theme as a stress test

Stage 08 step 7. Four classes, two from the source and two from a browser: a role
declared in one theme only, a component reading a colour primitive directly, two
roles of one surface that collapse to a single value in dark, and ink that fails
its own composited ground in dark.

**The dark number alone does not say whose fault it is.** The first run reported
25 shapes and I read all 25 as damage the theme had done; with the LIGHT number
for the same element beside it, 8 of 49 are the theme's and 41 fail in both. The
light reading costs nothing - the probe already visits that theme - and it is the
difference between a harvest and a panic.

Two things it refuses to measure rather than guess at, each with its own count
printed so the exemption cannot go quietly empty:

- **ink with zero alpha is not ink.** Nine photo slots carry the word «фото» at
  `color: transparent`, alt text behind a real photograph. Read as opaque it is
  21.00 on the light page and 1.16 on the dark one - two numbers about a word
  nobody paints. *And the filter did not work the first time*: `\s` written with
  one backslash inside the probe's template literal is eaten before the string is
  ever a regex, so it went looking for a literal «s».
- **a ground it cannot see is said, not guessed.** It reads `backgroundColor` and
  nothing else, so a photograph or a gradient - `.pl-panel` paints its packaging
  out of two gradients and no colour at all - is invisible, and the walk then
  reports the page *behind* the panel. Those readings are listed apart.

**Its subject was 87 pages of 203 until 2026-08-13, and none of them a product
screen.** The filter read «starts with `kit/`, not `kit/demo/`, not `kit/kit`»,
which does not look like an omission - it looks like a scope, because the dark
theme is a property of the system and the pages that document the system are the
obvious place to measure it. They are not the only place. The first run over the
whole folder found the panel that walks all 88 coloured screens rendering its
navigation at **1.05**, white on white. The subject is now everything under
`design/` except `kit/kit`, which stays out BY KIND, and the count is printed
before the walk starts.

**And it can no longer pass silently.** `uivTheme('dark')` is a call INTO the
page; a page without `theme.js` swallows it without a sound, and the probe then
walks a LIGHT page, calls the reading «dark», compares it with itself and reports
a perfect result. The probe returns the theme it was actually standing in, the
caller refuses the reading when it is the wrong one, and both ways a page can
leave a run unmeasured are counted at the end - `зміряно: 199 з 203`, with the
four named. A page that was never measured used to be one character on a progress
line, which is indistinguishable from a page that passed.

## `roles.mjs` - does the stand still describe the file

Every component page prints the list of tokens its CSS reads, and all 69 of those
lists are typed by hand. On 2026-08-13 one role was split in three, sixteen rules
moved, and twelve pages went on printing the old names - nothing noticed, because
nothing was asking.

It asks the OUTPUT on both sides: every `var(--name)` the component file contains
against every `<code>` inside the page's own table. A token the component
declares for itself is neither - that is its private business and the page never
listed it.

**A report, not a rewriter.** The primitive column is ordered by meaning -
`--space-2 --space-4 --space-8 --space-12`, not alphabetically - and a generator
would flatten that across 69 pages in order to fix twelve. What the page says is
the author's; whether it is still true is this file's. Its idle control is the
two lists it prints at the foot: components with no page, and pages with no
table.

## `grey-vars.mjs` - the transform `vars.mjs` asks for

Kept because **Крок 6 will need it again**: 54 grey screens are still to be
coloured, and each one arrives carrying its own `<style>` block written in the
same eight names. `node tools/grey-vars.mjs` is a dry run, `--write` applies, and
`vars.mjs` before and after is the verdict.

Seven of the eight names have one answer and are renamed under a property guard -
measured, `--sec` is `color` 166 times and nothing else. `--dark` has two answers
and gets an explicit (selector, property) table, every row read off a state class
in the selector or off a rule the system already wrote.

Two guards, both of which caught something on the first run:

- **A table row that matches nothing is a typo, and a typo here is silent.** Six
  rows reported themselves unmatched, because the transform has to leave comments
  in the file and was reading `/* big primary CTA */ .cnew` as the selector.
- **A page that declares the name itself is not speaking the grey layer's
  language.** `design/overview.html` is the design hub - `../_nav.css` only, its
  own `--ink` on line 14 - and the first run renamed seven of its uses to a token
  that page does not load, turning a working page into a broken one. Caught by
  running `vars.mjs` *after* the write. *A migration is not finished when it
  stops; it is finished when the check that asked for it goes green.*

## `crop.mjs` - one element, photographed

Numbers say a box is 44 tall. Only a picture says the pill still sits beside the
word - the defect a whole step of correct measurements missed once, when a margin
was deleted and every number still read right.

**It has returned blank white paper for four different reasons**, and every one of
them looked identical: a valid PNG of the right size, no error, nothing to
suggest the target was missed. They are all fixed and all written into the file,
because the failure mode is silent and the next cause will look the same:

1. **Viewport rect, page clip.** `Page.captureScreenshot` clips in page
   coordinates; `getBoundingClientRect()` after a scroll is neither.
2. **`captureBeyondViewport` missing.** A clip outside the current viewport is
   simply not painted without it.
3. **The animation freeze.** `cdp.mjs` pins every animation at frame zero on
   purpose, and a page that fades its sections in has `opacity: 0` there. On
   `voice/microcopy.html` five elements carry `fadeUp`; the `<h1>` inside them
   computes opacity 1 and still photographs as white, because the transparent
   thing is its ancestor. A screenshot wants the settled page, so the animation is
   removed after the census expression has run.
4. **Where the file lives, guessed twice.** First `design/<name>.html` was
   hard-coded, so `voice/microcopy` resolved to a file that does not exist. The
   fix - "a name with a slash is a path from the root" - then broke
   `kit/pagination`, which had worked all session because it *is* under design/.
   It asks the filesystem now. *Two guesses about where a file lives, two wrong.*

## `cdp.mjs` - the driver, and `lib.mjs` - the plumbing

`cdp.mjs` launches headless Chrome and walks pages. Three things in it are not
obvious and are load-bearing:

- **Animations are paused from time zero**, before the document has nodes. A
  before/after pass otherwise returns 56 rows of skeleton pulse and spinner, and
  a floor that big hides a real 16-row change inside it.
- **It does not add `transition: none`.** A transition only runs when a computed
  value changes, and nothing changes on a fresh load - what that bought was a
  `*` rule with `!important` in the page, which then beat every component's
  transition in the winning-rule solver and reported five live declarations as
  dead. *The instrument must not be visible in its own measurement.*
- **It asks for `prefers-reduced-motion: no-preference` explicitly.** Headless
  Chrome answers `reduce`, so `base.css` fires its reduced-motion branch on every
  load and the census reads the exception rather than the default.

`lib.mjs` holds what every script used to hard-code, and each constant cost a
real failure: the server URL (a run against a dead server returns an empty pass
that reads like a clean one), the profile directory (an absolute path into one
session's folder, which is why none of these outlived the session that wrote
them), the port (two scripts on one port is a silent hang), and **the page list**.

That last one is the important one. `pages()` reads the screens off disk. When
the list came from a shell glob, an acceptance run over 135 pages reported
**"0 failures" after visiting exactly one**: zsh does not word-split an unquoted
parameter expansion, the whole list arrived as a single argument, and the walk
asked for a page whose name was 135 names long. *An instrument that takes its
subject from the caller can be handed the wrong subject; one that finds its own
cannot.*

**And finding its own is not enough if it looks one level deep - 2026-08-13.**
`pages()` read a single directory, so `design/` meant the 88 product screens and
stopped there: **the stand's 87 pages, its 25 demos and the 3 concept pages were
outside every walk that trusted this function.** The gate printed «88 screens,
failures: 0» over a folder that holds **203**, and the sentence a person read off
that was «the product passes». `vars.mjs` had the same defect in its own hand:
two directories typed out, `design` and `design/kit`, which is why its number was
175 for so long and `design/kit/demo/` was never read at all. One walking finder
now, shared by `accept`, `states` and `vars`.

**The first run that could see them found two defects on pages no gate had ever
opened**, both published since stage 06: a gutted `<script>` block on
`concept/concept.html` and `concept/directions.html` - six blank lines where the
declarations used to be and one surviving call to them, `sections is not
defined`, thrown on every load - and **53px of sideways scroll at 390** from a
contrast table whose min-content beat its own `width: 100%`. *A finder that looks
one level deep is the same defect as a list typed from memory; it just fails
where nobody thinks to check, and prints a number that sounds like coverage.*

**Nothing a tool starts outlives it.** The `stop()` calls at the foot of each
script only run on the happy path - a script killed by a timeout, stopped with
^C, or thrown out by an exception used to leave its Chrome and its server up, and
a stale server is the worse half: the next run binds a fresh port, so nothing
looks wrong and the machine quietly accumulates. Every server, browser and scratch
profile now registers a teardown that fires on exit, `SIGINT`, `SIGTERM`, `SIGHUP`
and an uncaught exception.

Verified **by the port**, which is the only form of the question that has an
answer: start `serve()` and `chrome()`, read back the port they chose, kill the
process, ask whether that port still has a listener. Measured - 56287 with one
listener and five headless Chrome, then zero and zero. The first attempt counted
`ps aux | grep http.server` instead and got 7, of which at least three had nothing
to do with this repo. *A count of everything matching a word cannot say whose.*

---

## What is not here

The ~380 one-shot probes each step wrote to answer one question and then
abandoned. That is the correct life of a probe, and copying them here would turn
a folder of instruments into a folder of archaeology. What earns a place is a
check the **next** step will want to run unchanged.

## One rule about editing text, because this shape has now cost eight repairs

**Never run a text substitution through `node -e '...'` when the replacement
contains an apostrophe.** zsh closes the single-quoted argument at the first `'`
inside it, so the shell hands node a truncated program and the REST OF THE SCRIPT
becomes literal text - which the substitution then writes into the file. Step 8.19
put `).replace(/’/g,` into a published page while removing a curly apostrophe from
it, and `accept` failed on the same page for the same reason it had failed a
minute earlier, which is what made it visible.

Same family, different door: a backtick inside a template literal (seven times), a
`*/` written inside the comment explaining comment terminators, and this. All three
are the shell or the parser reading a delimiter the author meant as content.

Use `Edit` on the file, or write a `.mjs` to the scratchpad and run it. Both are
shorter than the repair.

## `proof.mjs` - the pixel proof, both halves, one browser

    node tools/proof.mjs                     re-take all 40 pairs
    node tools/proof.mjs product cart        just these
    node tools/proof.mjs --against HEAD      what does the working tree move? writes nothing
    node tools/proof.mjs --against HEAD --map /tmp/maps   ...and draw where

`design/kit/pixel-proof.html` shows 40 before/after pairs. They were shot **once,
by hand,** on 2026-08-06, and when the light theme moved a week later there was
nothing to re-take them with - the conditions of that shoot were never written
down. This tool is that missing driver.

**It re-shoots BOTH halves,** and that is the finding rather than the plan. The
first version re-photographed only the working tree and compared with the stored
«after»: it reported all 40 screens moved, by 2 to 15 percent, and the diff map
showed every glyph on every screen outlined twice - sub-pixel text rendering, not
layout. Nothing shot today is comparable with that set. «Before» is `git archive`
of the commit the page names, unpacked outside the repository and served on its
own port; one Chrome photographs both, back to back.

**The comparison is by pixel and the answer is an element.** JPEG is Chrome's own
encoder, so a byte check answers «changed» to everything - an instrument that
cannot say «no». Both pictures go back to the browser, which decodes them and
counts pixels over `TOL`; the changed pixels are grouped on an 8px grid and each
region's centre is handed to `elementFromPoint`. «Every difference is explained
by a line of a named list» cannot be checked without knowing which element moved.

**The wait is on the page's signature, not on a clock.** A fixed 300ms still gave
two different answers on two runs: the stand's bar is built by `uivBar()` and its
chevron swapped by the mark passes afterwards, and each changes the document's
height, so a capture taken between them shifts everything below by 8px. It now
polls document height, the bar's height and the svg count until they hold still
three times. 39 of 40 then repeat exactly; `checkout-loading` does not, because a
loading state changes itself over time, and that is said on the page.

### `theme.mjs --closed`

Since 2026-08-14 the theme walk **opens every panel before it measures**. A popup
is 0x0 until somebody opens it and the probe skips anything under 2px, so until
now this check had been measuring only the part of the product already on screen.
That blind spot cost twice, both times found by a person opening a menu rather
than by any instrument: `.on` «Українська» inside `.wfh-langmenu` at step 8.19 -
the accent's largest failing shape, 82 instances on 82 of 88 screens, carried in
a record as «accepted» since 2026-08-07 with nothing ever drawing it to look -
and the header's account menu at 7.17, whose four states had to be measured by
hand.

Every global matching `open[A-Z]` or `toggle[A-Z]` is called, plus the few that
take an argument. **All at once**, not one at a time as `states.mjs` does: that
tool asks whether a state re-renders into an unmarked one and has to isolate each
opener, while this one asks whether ink reads on its ground, and a ground is
composited from an element's own ancestor chain - two dialogs overlapping on the
z axis do not disturb each other's answer. The same sweep runs in both themes, so
anything it does that is not about colour cancels out of the difference.

**An opener that leaves the page is dropped, and it is discovered rather than
listed.** One of them does: `openCookieSettings()` navigates to
`design/system.html`, which is a 404, and the first version of this sweep sent
every page there - all three test screens came back «the page has no theme». The
navigation is asynchronous, so a check inside the sweep sees nothing; it has to
be asked afterwards. Each name is tried once in a session of its own and the
verdict is cached for the run, so a new opener is judged the day it appears. The
dropped names are printed with the result.

`--closed` restores the old behaviour, for comparing a run against an older one.

---

## `census.mjs` - the control census, and this time it is an instrument

Step 6 of stage 08 asks for **два заміри одним приладом**: step 1 walks the corpus before the
system, step 6 walks it after. Opening that step, the prilad was gone. `census.md` produced 22 229
observations over 180 screens and closes with its own sentence - «the script is the artifact, not
the table» - and the script was never kept; only `btn-census.json`, which is the result.

Rebuilt **from the written method**, not from memory: two viewports (390 and 1280, because the
desktop header and the mega menu do not exist at mobile width), in a browser and **never by grep**
(the header is injected by `_nav.js` and is not in the markup at all), computed style rather than
the written rule, and the control test verbatim - `a` / `button` / `label` / `[role=button]` /
`[onclick]`, **or** an element that INTRODUCES `cursor:pointer` its parent does not have.

**The 24-form folding of step 1 is NOT reproduced**, and that is said rather than tuned: the
exclusion list lived in the lost script and appears nowhere in the prose. Tuning until the numbers
matched a published table would prove only that they can be tuned.

**The number that reprices every earlier census: 35 714 clickable observations become 63 154 with
panels open.** 43% of the product's clickable surface is behind a state, step 1's 22 229 included.

`--lists <raw.json>` computes step 6's three lists off a finished walk. Its own errors are worth
the space, because all four had one shape - **answering the question next to the one asked**:

| reported | cause |
|---|---|
| 962 dead classes, `coach` and `wfh` among them | the map was built from CONTROL rows, so «never worn» meant «worn by nothing clickable» |
| `svg` `jpg` `png` `html` are dead component classes | tails of `url(...jpg)` and of an href attribute selector |
| 12 classes of `cat-overlay.css` are dead | nothing had OPENED the overlay |
| `menu-pop` is dead | `menu.js` sets it at wire time and CSS hides it until it opens; the collector skipped `display:none` |

The fourth cost the 35-minute walk twice, and not because of the bug: the correction was announced
before it was verified, the patch had never applied, and the re-run produced a **byte-identical**
record - 1 518 distinct classes, 50 417 total, in both files. The identity is what exposed it.

## `inert.mjs` - which private rules can go, decided by LOADING the page without them

**Replaces `private-css.mjs`, and the reason is the whole point.** That probe deleted one rule at a
time out of the LOADED document; the cut it blessed was applied and `tree-diff` reverted it. The
gap was written down as a hypothesis - mutating a document whose scripts have already run is not
the same experiment as loading one without those rules. This tool does not test that hypothesis, it
removes the difference: every verdict IS a load, and the probe and the proof now share one reading
(`snapshotExpr()` in `lib.mjs`).

**The search is sound about sets.** «Inertness is not additive» is built in: the whole block is
tried first, and on a failure each chunk is offered on top of what is already proven safe, so an
accepted set has been tested whole at every step.

Three faults of its own, all found by measuring rather than reasoning:

- **The cache.** `cdp.mjs` disables the cache once per connection and re-enables it - right for
  every walk, fatal for the one tool that rewrites a page and asks for the same URL. Measured:
  `styles: [6166]` after writing an empty block, `[0]` only on the second load. So the first width
  of every test read the UNCUT page and answered «nothing moved», and the first run reported a
  27-rule block as entirely removable. Fixed per session, and a **guard** now runs first: cut a page
  to nothing and stop unless the browser says the stylesheet got shorter.
- **A screenshot as the third reading.** The probe and the proof share a reading on purpose, and a
  shared reading has a shared blind spot. Every accepted set is photographed whole and cut, both
  widths, PNG hashed. The screenshot is what caught the cache while computed style said «identical».
- **The read is not deterministic, and nothing here had ever measured it.** Four reads of an
  unchanged page: `coach-session-priceblock` @390 came back 39.19px taller on the fourth, 78 rows
  differing. That noise is why the same two pages first answered «38 of 41», then «0», then «2».
  The direction is worth knowing - noise makes a removal look DANGEROUS, never safe, so it cost
  coverage rather than damage. Fixed anyway: a baseline is read until the same answer arrives twice,
  and a difference is re-read once before it is believed.

**Three more, found on 2026-08-15 when the first full walk hung.** It lived 3h13m, spent 28.85s of
CPU and printed nothing after minute 47, while Chrome was fine, its tab was open and the server
answered 200.

- **`Conn.send()` had no deadline at all** (`once()` always had its 20s). One lost reply parked a
  promise forever. A hang is the worst failure this folder can have, because it is the only shape
  that never reaches a report: a crash is read, a wrong number is argued with, **silence is
  mistaken for work in progress**. Every request now has 60 seconds; every READ has 120, retries
  once with a fresh tab, and on a second death ends the PAGE, not the walk - it goes into the report
  as «не відповіла», which is a result someone can act on.
- **The CDP handler leak, and it was quadratic.** Every session pushed a listener onto
  `conn.handlers` and nothing ever removed it, so a walk opening fifty tabs per screen ran every
  message from every tab through every dead listener it had ever made. That is the honest reason a
  pass slowed from two minutes a page to nine while doing identical work. Handlers now unhook
  themselves when their target detaches. **Fixed in `cdp.mjs`, so every instrument here got faster.**
- **The subject was 69 pages when the question was 31.** `subject()` reads subfolders - widened on
  purpose so no walk could miss the stand - so «every design page with a private `<style>`» included
  the stand's 35 demos and 3 concept pages. More than half of a five-hour estimate was going to be
  spent cutting CSS out of the showcase. `kit/` and `concept/` are excluded by name now, the line
  CLAUDE.md already draws.

**The log has to move while the work moves.** One line per page meant nine minutes of work and nine
minutes of a corpse looked identical from outside. A line per trial with a clock on it is what a
watcher should read - and a watcher that asks «does the output file exist» and «is the pid alive»
is the same defect in a different costume: both answered «fine» for three hours.

**`--shard k/n` splits the walk.** Safe here and nowhere else in this folder: a page is cut in
place and no two pages share a file, and `serve()`/`chrome()` already take a free port and a fresh
profile each. Three shards took the full corpus from ~5 hours to **48 minutes**. Three, not four,
for a reason written in `cdp.mjs`: parallel passes raise the noise floor, and noise here costs
coverage.

**`--from <json>` applies a decision already taken, and it exists because the owner asked for the
wall clock back.** `--apply` measures and then writes, which is right as a default and costs the
same fifty minutes twice. The proof does not depend on it: `tree-diff --dir` compares against the
tree as it stood before the cut, so a cut applied from a saved decision is proven or refuted by the
same gate. Re-measuring buys a second opinion, not the proof. It is the SAME parser and the SAME
`write()`, only the decision loaded instead of measured - **not a second code path**, which is what
this tool exists to avoid. The guard is the whole safety of it: a saved decision is a list of rule
INDICES, so the top-level rule count is checked per page and a mismatch stops everything before a
byte is written.

**Result, 2026-08-15: 655 of 1 154 private rules removed from all 31 screens, `tree-diff --dir`
answering 62 comparisons and 0 elements moved**, plus `accept` at 360 and 390 over 205 screens with
0 failures.

---

## `private-css.mjs` - which private rules draw anything (SUPERSEDED by `inert.mjs`)

31 coloured screens carry a private `<style>` block, 1 185 top-level rules. A source count says a
rule EXISTS, not that it CHANGES anything. This deletes a rule and asks the browser whether
anything moved: **215 match no element on their own page** (clone residue) and **47 match and move
no value** (a copy of what the system already says).

**Its verdict is not yet trusted, and the reason is written into the file.** The first version
tested each rule ALONE with every neighbour in place - **inertness is not additive**, and a cut
built on that answer moved 5 screens. Two corrections went in: the walk is cumulative against a
**full-document** snapshot (a rule restyles only what it matches, but LAYOUT travels), and the set
found at one width is re-offered at the other (their **union was never tested anywhere**). Neither
closed the gap. Until it closes, `tree-diff.mjs` is the gate.

`--closed` skips the opener sweep · `--apply` writes · `--json` keeps the raw record.

---

## `private.mjs` - what is LEFT in the private blocks, sorted by who should own it

`inert.mjs` answers «can this rule go». This answers the harder half: **the rule draws something, so
where does it belong.** Every private rule is classified by asking which component file DECLARES its
classes - one home, several, none, partly new, or no class at all - and the result is the work-list
for item 3 of the backlog.

Ownership is read from the **parser**, never from a grep: `button.css` discusses `.dark` at length
and declares it nowhere, and a grep would have called that ownership.

`--diff` adds the browser half - neuter the rule (`selectorText = '.__stack_none__'`), re-read the
same elements, restore - and reports per property whether the system says something else (a
conflict) or nothing at all (a gap). Both widths: 35 rules once read as «changed nothing» were
inside a private `@media (min-width:)` and the 390-only pass could not see them.

**Two faults, both reporting plausibly.** The selector was read back to the last comment terminator,
which lands *inside* the declaration block when a rule carries a trailing note - **16 rules
vanished under a heading that looked like an answer**. Comments are stripped first now.

**And the verdict was printed without its ground, which is the fault that matters at the tail of the
list** (step 8.26). «One home» is a claim about a NAME. A name can be worn by two different objects,
and by the time the honest matches are closed, the collisions are all that is left: `buy-box.css`
declares `.bb .tier`, a wholesale-price badge inside the buy box, and `coach-verify-tier`'s private
`.tier` is a whole plan card. Three of eight homes in the final list were that shape. The output now
prints the SELECTOR that produced each home - «бо buy-box.css оголошує `.bb .tier`» - so a wrong one
reads as wrong in a glance. The verdict is unchanged; **do not soften the answer, show what it rests
on** is the same repair `tree-diff` got in the same week.

And, step 8.23: **a modifier was naming a component.** It read every class in a selector, so
`.loy .lrung.now` registered `.now` as `loyalty-rung.css`'s, and a private `.cv-steps2 li.now` - a
checklist on the verification screen - came back as «one home: loyalty-rung.css», which reads as an
instruction to move it there. Now: **within one compound only the FIRST class names the thing**;
across a descendant combinator every compound still counts, because `.loy .lrung` does mean the file
owns both. Adjectives (`.now`, `.on`, `.off`, `.oos`, `.done`, `.open`) are shared across twenty
files and any of them matching as a home is noise dressed as an answer. The fix moved rules **both
ways** - two files lost a spurious entry, four gained real ones - which is what tells you the old
reading was wrong rather than merely loose.

### Its fifth fault: a NOTE read as a selector (8.31)

`withNotes` grows a rule's span backwards over the comment above it, so the span text is
**note + rule**. `text.indexOf('{')` then finds the first brace ANYWHERE in that span - and this
repository writes css inside its notes constantly.

Two rules were misfiled, and both notes were written by the two passes before this one, to record
what had LEFT the block: `coach-session-empty`'s quotes `.cs-empty .btn{ padding: 13px 24px }` and
`coach-verify-tier`'s quotes `.tier-cta{ display: block }`. The paragraph became the selector, the
real rule under it was never classified, and the totals the tool printed were wrong in the split
rather than in the sum - which is the hardest kind to notice.

`braceAfterNotes` is in `lib.mjs` beside the parser, and it skips comments exactly the way `topRules`
does. **One parser, one answer to «is this position inside a comment».** `dropline.mjs` in the
scratchpad takes it too, for the same reason.

## `tree-diff.mjs` - did the working tree move anything, element by element

`proof.mjs` answers this in pixels for the 40 screens that have a baseline JPEG. This answers it
for anything: git archive the reference into its own tree, serve both, open both in ONE Chrome and
compare the **computed style of every element** on 40 properties at 390 and 1280.

**Take the positive control before trusting a zero.** `coach-home-empty` answers «11 elements at
390, 12 at 1280» for the accent change of 7.26; a comparator that cannot say «moved» cannot testify
to «did not». It caught the private-css cut on 5 screens and named the property: a rail link
`rgb(242,240,237)` to `rgb(255,90,0)` at 390.

Three of its own faults, all the shape this directory keeps meeting: it **hung with no output** by
opening two tabs before visiting either; it compared its own two server **PORTS** inside
`background-image` and reported that as a finding; and its regex literal was eaten by the template
literal holding it, so the escapes arrived as a bare slash - built with `new RegExp` now, from a
plain string.

`--dir <path>` compares against a directory instead of a ref, which is what a migration needs: the
reference is «the tree five minutes ago», and that has no commit to name.

**A fourth fault, and it was about to bless the biggest cut this stage has made.** The tool exited
**0 after making zero comparisons**. Found by a shell mistake rather than by thought: zsh does not
word-split an unquoted `$PAGES`, so 31 page names arrived as ONE argument, each was reported as «a
new page with nothing to compare against», and the foot of the run read «зрушило: 0» with a success
code. The proof of a 655-rule cut would have been a green line over nothing. **Zero comparisons is
now exit 2**, with the words «це не „нічого не зрушило“, це відсутність доказу» - the same family as
the glob that reported 0 failures over 135 pages after visiting one, and as `accept.mjs` blessing
`kit/zzz-nope`. An instrument that cannot say «no» is not evidence.

**Also widened 2026-08-14, with `scope.mjs`, because both read through `STYLE_PROPS`:** the list
carried `border-top-color` and none of the other three sides, and never read pseudo-elements. 40
properties became **85**, element plus `::before` plus `::after`. The step-6 reading of «9
movements on 5 screens» was taken with the narrow list.

**A fifth: a RENAME was being counted as a MOVE.** Every row begins with `TAG.className`, so
changing a class - which is what half the repairs in this stage do - made the row string differ
while all 85 properties stood still. Sweeping the dead `dark` off 105 controls came back as «114
comparisons, **114 moved**» with an empty property list under every one of them, and a reader who
trusted the headline would have reverted a correct change. They are different findings and both
are worth seeing: a moved property is a visual regression, a renamed row is the markup edit you
meant to make. **Moved counts properties only; renames are named beside it.** The same sweep now
reads «114 comparisons, 0 moved, 630 rows renamed» - and 630 is 105 controls x 3 rows x 2 widths,
which is the arithmetic saying the same thing twice.

The 40-property list moved into `lib.mjs` as `STYLE_PROPS` when `scope.mjs` needed the same one.

**A sixth, 2026-08-15, and it is a cap rather than a bug.** The output printed **four** moved
elements per page and three properties each, with no total per family. That is enough for the
question the tool was built for - «did the cut mangle anything», where the right answer is zero -
and useless for the question it grew into. Removing the retyped cabinet shell from four screens
moved **149 elements**, all of them intended, and the report showed four `height` changes on
`HTML` / `BODY` / `wf-canvas` / `wf-page`: a reader could neither confirm the change nor spot a
stray. A silent cap reads as «here is what moved».

Now the sample stays and a **roll-up** is printed under it - by element family and by property, top
eight each - so the 149 read as `::before 26 · ::after 26 · ic 17 · path 13 · acc-link 7` and
`font-size 114 · font-weight 102`, which is the rail and its icons and nothing else. `--full`
prints every row with every changed property.

---

## `scope.mjs` - is this screen inside the scope its components are written against

The coach components are scoped - `.coach .qa-row`, 360 selector occurrences across 18 files - and
the class went onto eleven screens by hand at 7.95. `clone-to-colour.mjs` reads `wireframes/`, and
the grey layer has **142 bare `<body>` tags**, so 23 state screens arrived without it and the whole
coach layer of the system was **inert** on them: not overridden, not outranked, never matching.

**No other check in this folder can see that.** `vars` and `grey-vars` read declarations, `roles`
reads values, `links` reads hrefs, `accept` reads a page that renders and sees something rendering.
The answer is not in any file - it is the difference between the page with the class and the page
without it, so the question goes to the browser as exactly that: add the class, read the computed
style of every element, take it away, read again.

**The measurement and the decision are two different questions**, and the output keeps them apart.
Moving is measured; belonging is read off `wfBar('<base>.html', ...)`, because a state wears what
its base wears. Five screens move and must never be written - `concept/directions` moves 203
elements from 2 selectors - and those are the evidence the namespace is load-bearing.

`--apply` is the sweep, and it lives here rather than in the transform: the scope is a property of
the CSS, not of the markup being cloned, so the file being copied cannot know.

Two of its own faults, and both reported plausible numbers. It tested `r.cssRules` before
`r.selectorText`, and since CSS Nesting **every** `CSSStyleRule` carries an empty (and therefore
truthy) `CSSRuleList`, so the walk recursed into nothing for every rule in the product. It also
treated `@import` as a grouping rule; `design/system/index.css` is nothing but imports, so the
whole component layer was invisible. Both came back as «0 selectors» on a page that moved 87
elements - **the two numbers disagreeing is what exposed it**, and one number alone would have read
as a clean pass.

---

## `btn-rank.mjs` - a control wearing only `btn` renders as bare text

`button.css` has no `.btn` rule at all: **the finish IS the rank**. An element carrying `btn` and
nothing else gets no background, no border, no padding and no focus ring, and still reads as a link
to a screen reader - so nothing but a pair of eyes catches it. `clone-to-colour.mjs` matched
`class="btn"` and `class="btn dark"` as whole strings, so every button with a utility class beside
them slipped through: **36 controls across 13 screens**.

**The rank is read off the base screen and never chosen here**, and that is the whole design. The
grey layer marks a primary action `dark`; the coloured bases did not all keep it - `cs-go`,
`co-new` and `cgo-btn` are `dark` in `wireframes/` and `btn--outline` in the base, because the
review at 7.95 and 8.7 decided there is one accent fill per screen and these were not it. A state
screen must not reopen a decision its base already took. Whose base is whose comes from
`wfBar('<base>.html', ...)`, the same reading `scope.mjs` uses.

**Collapse on equality, not on count.** The first version required a unique match in the base and
called all 16 `qa-add` rows ambiguous - three identical rows are one answer repeated. Take the set
first, then ask whether it holds one thing.

Two controls the product cannot answer (`cart-coach-empty .cont`, the bar's `.blocked` on
`coach-session-priceblock`) are decided in a map inside the file, each with its neighbour written
out. The map runs **after** the base, not before - the first version asked it first and its
`blocked` entry ate `cs-go blocked` too, handing the sidebar the bottom bar's accent. Its idle
control asks **«is the decision still visible in the product»**, not «did it fire»: every entry
stops firing the moment `--apply` works, so the other question would have turned the gate red one
run after it went green.

**It also sweeps the dead `dark`, 2026-08-15: 105 of them on 57 screens.** `wireframes/_wf.css`
declares `.btn.dark`; nothing under `design/` declares `.dark` at all, so the word paints nothing
in colour - it is the grey layer's way of saying «primary», and the rank has replaced it. It is
INPUT to `clone-to-colour.mjs`, which reads it to pick a starting rank and now drops it from the
output, so a fresh clone never writes one.

- **The guard is what makes it a sweep and not a `sed`:** a `dark` is dead only where a `btn--*`
  rank has replaced it. Anything else wearing the word is listed and left alone, because a word can
  be reused and a sweep that cannot say «not this one» will take a live class with it one day.
- **The order is load-bearing.** The sweep runs AFTER the ranks are written and reads the updated
  sources: a control arriving as `btn dark cs-go` is unranked, so a sweep placed first would leave
  the now-dead word behind and need a second run to converge.
- **The count that fails the gate is what is LEFT, not what fired** - the same lesson the decision
  map above already paid for.

---

### The second question, 8.31: is the rank the BASE's rank?

The section above asks «is there a rank?». It never asked whether the rank AGREES with the base, so
`btn--accent btn--s btn` passed every run on six screens whose base writes `btn--l` - the sticky bar
of the coach ordering session, 40.00 tall against 64.00, under the 44px touch floor, on the primary
audience's daily flow.

**Three keys were tried and only the third is sound:**

| key | result |
|---|---|
| utility class | **nothing.** The bar's action has no utility class at all - what identifies it is the block it sits in, and a tool reading class attributes out of source has no parents. |
| destination (`href`) | six, and two false. `coach-client-empty`'s «＋ Нова сесія» against `coach-client`'s: same words, same href, different container - one stands alone in `.cc-cta`, the other sits in an empty state's `.eact`. The same destination in two containers is two controls. |
| **the slot**, destination only as a tiebreak | all six, none false. `coach-session-empty`'s bar goes to `coach-session-addclient` rather than the cart, because an empty session has nothing to send: the same slot doing a different job, which a destination key cannot see. |

The slot is read as **the nearest class attribute before the control** - a source-level stand-in for
a parent, and it is named as one: a control whose real parent carries no class is invisible to it.

**A SIZE THAT DISAGREES IS A DEFECT; A FINISH THAT DISAGREES IS A DECISION.** Size is a touch target
and the weight of one control. Finish is «what this screen recommends», and design principle 2 says
that belongs to the screen: `--apply` writes sizes and never finishes, and a finish disagreement does
not fail the run - a gate that goes red on an open question stops being read. Six stand open today,
and one of them is correct by design (on `index` the strip's action is «Увійти» in accent; on the
signed-in screens it is «Мій кабінет» in outline - an invitation against navigation).

**And `--apply` was a string replace.** `class="btn--accent btn--s btn"` is worn on five session
screens by the bar's action AND by «Знайти» in the quick-add field, so upsizing one upsized the
other. The plain re-run reported five fresh disagreements against `.qadd-field`, which is the idle
control working. Writes are position-targeted now, applied in descending order, and each verifies the
slice before touching it.

## `gap.mjs` - the distance between two elements, not the margin declared on one

Every other browser instrument here compares **computed style** - `inert`, `tree-diff`,
`private --diff` all read `getComputedStyle` over a fixed property set. That is the right question
for «did this rule change anything the engine resolved», and it is blind to a whole class of
nothing.

**Margin collapse.** Two adjacent block siblings do not add their facing margins; the larger wins
outright. `coach-clients-loading` declared `margin-bottom: 4px` on `.cl-sub` next to `.skclist`'s
`margin-top: 18px`. Measured gap with the rule: **18px**. Without it: **18px**. Computed
`margin-bottom` either way: **4px**. The rule was alive to every instrument in this folder and dead
on the screen, and it survived the cut that removed 655 of its neighbours at step 6.

The same blindness covers every case where a declared number resolves to no distance: a vertical
margin on an inline element, a margin inside a flex or grid container whose own `gap` already
exceeds it, a bottom margin on a last child under a padded parent.

```
node tools/gap.mjs '[["coach-clients-loading",".cl-sub",".skclist"]]'
node tools/gap.mjs '[[page, selA, selB], ...]'  [--width 390,1280]
```

**It does not find its own subjects, and that is deliberate.** «Which two elements should be a known
distance apart» is a question about the design, not about the document - a walk that guessed would
produce thousands of pairs and no finding. This is the instrument you reach for when a rule LOOKS
live and you want to know whether anybody can see it.

It marks two readings: a distance **smaller** than the larger facing margin, and a distance
**equal** to the larger one when both are non-zero - the ordinary collapse, and the one that hides
a dead rule.

**Its blind spot has a name, and it is the whole other half of the family.** This finds a control
wearing `btn` **without a rank**, because that is the shape `clone-to-colour.mjs` produces. A control
wearing **no class at all** never enters the subject: there is no token to match on. Found by hand at
step 8.22 on `coach-home-free`, whose order rows carried `<a href="coach-order.html">Деталі</a>` and
`<a href="cart-coach.html">↻ Повторити</a>` with a private `text-decoration: underline` at 12px,
where the base draws `btn--outline btn--s` and `btn--accent btn--s`. «↻ Повторити» is Job 2 entire.

The general shape is worth keeping: **the transform's OUTPUT got an instrument, its INPUT did not.**
`btn`-without-rank was something the transform did, so it was somebody's subject. A class-less anchor
in the grey original was never the transform's doing, so nobody owned the question. Widening this
tool to «any `<a>` or `<button>` inside a component the base ranks» is possible and is not free -
it would have to know which anchors are prose links - so it is written down here rather than guessed
at.
