# tools - the instruments, and what each one is for

Five checks, a transform and a driver. Every one of them answers a question this project asks
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
node tools/grey-vars.mjs [--write]       private blocks learn the system's names
node tools/crop.mjs 390 coach-tariff .tf-compare /tmp/t.png
```

`accept`, `states`, `css-comments`, `vars` and `links` exit non-zero on a
finding, so they compose.

---

## `accept.mjs` - the gate

`CLAUDE.md`: *"Acceptance is in the browser, not in a table. Open it, walk every
state, narrow to 360px, and only then say done."* This is the browser half, over
every screen at once. Five questions per page, each one a defect somebody found
by eye after a step had already said it was finished:

| question | what it catches |
|---|---|
| sideways scroll | `scrollWidth - clientWidth` must be 0 |
| console error | anything uncaught, or a `console.error`, during load |
| em dash | `—` appears nowhere in project output |
| curly apostrophe | one apostrophe form in the product: `'` |
| doubled separator | the crumb draws its slash in CSS; a typed one shows twice |

**The crumb check asks "is it drawn twice", not "is it typed"**, and that is the
whole difference between an instrument and a nuisance. `ia/*.html` type their
slash and load no stylesheet that draws one, so they are correct - an earlier
version called five of them a failure.

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
