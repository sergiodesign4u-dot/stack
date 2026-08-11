# tools - the instruments, and what each one is for

Four checks and a driver. Every one of them answers a question this project asks
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
node tools/crop.mjs 390 coach-tariff .tf-compare /tmp/t.png
```

`accept`, `states`, `css-comments` and `vars` exit non-zero on a finding, so they
compose.

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
names. **Thirty screens do this today**, all of them the coach flow.

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
