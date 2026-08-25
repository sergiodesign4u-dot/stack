# tools - the instruments, and what each one is for

Checks, two transforms and a driver - the list below is the count, and it is not
repeated in a sentence here, because a number typed twice drifts. Every one of
them answers a question this project asks
at the end of **every** step, and until 2026-08-11 all of them lived in a session
scratch folder and were rebuilt from memory each time. That is the same failure
`CLAUDE.md` names for the product - *"a hand fix does not survive the next
clone"* - applied to the apparatus that checks the product.

Nothing here needs a server started by hand, a port chosen by hand, or a list of
pages typed by hand. Each script starts what it needs and cleans up after itself.

```
node tools/accept.mjs                    the gate: every screen, 390
node tools/accept.mjs 1280 account       one width, named screens
node tools/accept.mjs 360 --root handoff/handoff   a page OUTSIDE design/, same ten marks
node tools/accept.mjs 1280 --text200     TEXT-only zoom: the root font size doubled, rem tested
node tools/focus.mjs --all --dark        the ring in the theme the instrument was written about
node tools/states.mjs                    open every state, re-run the passes
node tools/css-comments.mjs              every stylesheet, one second
node tools/vars.mjs                      every var(--x), and whether it exists
node tools/links.mjs [--write]           every href AND src, and whether it goes anywhere
node tools/paths.mjs                     every path an md NAMES, and whether it still exists
node tools/theme.mjs [--source]          the dark theme as a stress test
node tools/roles.mjs [name...]           does the stand still describe the file
node tools/idle.mjs [name...]            what each stand page is not showing, sorted
node tools/inventory.mjs [--screens]     is the published count still true
node tools/grey-vars.mjs [--write]       private blocks learn the system's names
node tools/crop.mjs 390 coach-tariff .tf-compare /tmp/t.png
node tools/scope.mjs [--apply]           is a screen inside the scope its components need
node tools/btn-rank.mjs [--apply]        a control wearing only `btn` renders as bare text
node tools/inert.mjs [--apply]           which private rules can go, decided by loading without them
node tools/tab-walk.mjs [pages...]       press Tab and see where focus actually lands
node tools/comp-width.mjs [--md] [level] what each component knows about width
node tools/grid-sweep.mjs [file.css]     how many columns a grid really has, width by width
node tools/split.mjs [--frame .sel]      does the split view split, and does every screen have it
node tools/dupe.mjs [--census]          the same declaration block, written twice
node tools/typo.mjs                     the three-dash and apostrophe rule, over the whole tree
node tools/focus.mjs [--all|pages]      press Tab on every control and read the ring it draws
node tools/motion.mjs [--source|--output|--states|--full]   what moves today, asked from the file AND from the frame
node tools/motion.mjs --surfaces [--live]   the surfaces that appear by switching `display`, from css and from the browser
node tools/motion.mjs --view            the crossfade BETWEEN two documents, read from inside a live navigation
node tools/width-sweep.mjs [--step N] [--stand]   what breaks BETWEEN the points: 320-1600, bisected to the pixel
node tools/motion-row.mjs               rebuild a stand page's motion row in «Токени» from its own css
node tools/ease-fit.mjs                 where the three cubic-bezier curves came from, re-solvable
node tools/screen-css.mjs [--list] [--apply] [names]   the TEN marks a screen file may not carry
node tools/rollout-table.mjs [--check]  the stage-12 estimate, out of the two registries
node tools/coverage.mjs [--check|--apply]   the coverage map, generated from the registries and then WALKED
node tools/glyphs.mjs [width] [pages]   a mark the runtime passes did not reach
python3 tools/key-alpha.py --check [dir]   every PNG, and whether it has the alpha channel a dark page needs
node tools/steps.mjs [--census] [names]   the steps that stand BEHIND A CLICK, which no other width instrument sees
node tools/handoff.mjs [--strings]       is the handoff a POINTER or a COPY, and does every spec row name a source
node tools/map.mjs [--write] [--token --x]   screen -> zone -> component -> tokens, and the INVERSION in two knees
node tools/headings.mjs [pages...]       one reachable h1 per screen, and a ladder with no missing rung
node tools/clone-test.mjs [--keep]      clone HEAD to a temp dir and open it from file://, no server
node tools/nav.mjs [pages...]            do the THREE panels know where they are AND hold your place
```

`accept`, `states`, `css-comments`, `vars`, `links`, `theme`, `roles`, `bp`,
`inventory`, `dupe`, `typo`, `steps`, `handoff`, `nav` and `focus` exit non-zero on a finding, so they
compose. `handoff` exits **2** rather than 0 or 1 when its subject is not on disk yet:
a question asked of a file that does not exist has no answer, and a zero would be one.
`nav` exits **2** on the same reasoning from the other end - an empty SUBJECT, i.e. a walk that
opened no page at all. It printed «0 findings, exit 0» that way once, on code broken on purpose.

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

**And a fourth thing, learned at stage 12: it used to die of its own length.** The
full run on 2026-08-22 printed 177 dots and then `CDP мовчить 60с:
Runtime.evaluate` on `kit/demo/coach-landing-cta` - a page that walks in two
seconds on its own. Nothing is wrong with page 178; the BROWSER wears out
somewhere past a hundred and fifty targets. The verdict line never printed, so a
walk that had opened 177 pages and found nothing reported neither the nothing nor
the 123 pages it never opened - **a crash at page 178 and a clean page 178 are
the same exit code.** Now a page that stops answering is caught, the browser is
thrown away and relaunched, and the page is tried once more: survives, one `r`
in the dots; stalls twice, it goes on a NAMED list, the walk finishes the rest,
and the run exits non-zero. The list is declared, so it prints when empty too -
`0 з 300` is the only form in which a person can tell a complete walk from a
lucky one.

The deadline in `cdp.mjs` became a knob for the same reason: `CDP_TIMEOUT_MS=300
node tools/states.mjs 390 order-placed` makes every call stall on purpose, and
that is how the stall path above was shown to work before it was believed.
Nothing in the repo sets the variable.

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

## `paths.mjs` - does the file this sentence name still exist

Stage 09 step 6. `links.mjs` reads html attributes, so a path written inside md prose is invisible
to it, and a full two-instrument critique had just passed over the repository without noticing that
`CLAUDE.md` - the one file every session reads first - named a `_theme.css` under `design/` in its
value chain, and no such file exists or has existed for several stages. **A rule file that points at a dead path teaches the dead path.**

Three things make it work, and two of them are mistakes it made first:

- **A path in prose is a TAIL, not an address.** Resolving against the md's own directory reported
  61 dead paths, all alive. Resolving against the repository root reported 150, almost all alive -
  `ia/docs/sitemap.md` writes `pages/home.md` and means its own `pages/`. Dropping the `../` run and
  matching any file whose path ENDS with the tail is the rule `links.mjs` had already written down.
- **A record names history; a rule names an address.** `docs/decisions.md` says
  a `flows.md` under `research/docs/` because that is what the file was called that day, and
  rewriting it would
  falsify the record. The record files are listed by name in `RECORD`, not guessed at, and the list
  has an idle control: a name in it that is not an md on disk fails the run.
- **A quoted dead path is not a dead link.** `DESIGN.md` names `design/kit/kit.css` - the flat sheet
  deleted at 8.8 - as a dead middle step in the drawn value chain, on purpose, because every token
  cites the declaration it came from. Those live in `KNOWN_GONE` with a reason each, and an entry
  that stops matching anything fails the run just as loudly as a dead path. **Two entries came off at
  12.10 for exactly that reason**: `design/system.html` and `design/content-loyalty.html` were
  declared gone, stage 12 built both, and the run went red on its own excuses. An exclusion for a
  file that came back is the most invisible hole a check can have - nothing else asks about a path
  that is excused.

The four counts this run prints - paths named, dead, in the record files, declared gone - are NOT
repeated here. They were, as «1256 across 63 md», and by 12.10 the tree held 1553 across 68 while
the sentence still said 1256: a number typed beside the command that prints it drifts the first
time anybody adds an md, and drifts silently, because nothing compares the two. Run it.

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

0. **A CSS selector quoted as documentation is not a link** - added at 13.3, and it was the FOURTH kind after the three below. `pixel-proof.html` prints `a[href="index.html"]` inside a sentence about what `idle.mjs` reads, and the scan took it for a link to a file that does not exist - one dead href in 6070, the only one, so it read as a real finding for two steps. A `<code>` that CONTAINS an anchor is left alone: blanking those wholesale would hide a live link inside a code sample, which is the opposite mistake and the more expensive one.
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

## `idle.mjs` - what each stand page is not showing, and whose fault it is

`roles.mjs` asks whether the page still names the right TOKENS. This one asks the
other half: whether the page ever SHOWS the classes its file declares. Each stand
page already answers that itself - `KIT_CLS` against what its demos render, in a
box at the foot - and nineteen of those boxes had been red for days, because the
verdict is drawn in a browser and nothing collected it. `accept.mjs` reads the
pass/fail at 8.31b; this reads the detail, in the box's own `<code>` pills rather
than a second implementation of the same set logic.

**The sorting question is the instrument.** A class a script adds at the moment
of an act cannot be rendered in repose, and showing it would mean faking it -
banned by the same rule as an invented role - so it belongs in `KIT_STS`, where
the control asks whether the page NAMES it. Everything else is a demo the page
owes.

**Wrong version 1, and it flattered.** The first edition asked «does this class
string appear in a JS file», matching `classList.add` OR `class="x"` inside a
script, and reported **70 states / 109 demos**. But `wireframes/_nav.js` is the
BUILDER of the grey prototype: most of the product's markup lives inside JS
string literals, so `class="x"` there means nothing at all. Of the 26 classes on
the seven smallest pages, 23 were markup in a template and 3 were real. The
narrow signature - `classList.add|toggle|remove('x')` on an element that already
exists - gives **9 states / 163 demos**. `.className = '...'` is deliberately
excluded: in this repo it always dresses a node the same script just created,
which is markup again.

**Wrong version 2, one run later.** `KIT_STS` is a declared exemption, so it
needs an idle control - the cheapest way to green this gate is to park a class
there. The first control asked every entry «does a script toggle you» and flagged
**143** across 61 pages, because `KIT_STS` holds five kinds of condition:
pseudo-classes, media queries, attributes, runtime classes and plain prose.
Asking a media query about `classList` is noise, and noise in a gate is how the
nineteen red boxes went unread in the first place. Narrowed to the only kind that
could be parked there - a bare identifier the component's own css declares as a
class and no script toggles - it is 8 entries in the whole stand and finds 2.

The page-side half lives in **`design/kit/_idle.js`**, one file where there were
74 inline copies in five editions. See its header for what the copies had drifted
into, including the one page that held the correct timing rule.

## `inventory.mjs` - is the published count still true

Backlog item 8, and the shape of the gap is one sentence: `vars.mjs` and
`grey-vars.mjs` ask whether a **value** is still true, `roles.mjs` whether a
**token list** is, and nothing asked it of a **count**.

`design/kit/docs/inventory.md` is the registry of the component layer - three
tables by level, a `Lines` column, a `Screens` column and a totals paragraph.
Every number in it was measured once at step 5 and typed in. Asked on
2026-08-16, the file listed **73** components against **84** on disk, carried two
rows for files that no longer exist, and had **66 of 73** line counts and
**58 of 73** screen counts wrong. Its own note about the gap named eight of the
thirteen missing files, so the note had drifted too.

Six questions, all answered from the files rather than from the file's prose:
coverage both ways (a component with no row, a row with no component), `Lines`
against disk, the level table against the level the component declares in its own
opening comment, the totals paragraph against the tables it summarises, and -
behind `--screens`, because it costs a browser - the `Screens` column.

**`Screens` cannot be grepped**, and the old column proves it: `footer.css` read
1 and measures **77**, `tabbar.css` read 0 and measures **82**. A third of this
product's chrome is written by `wireframes/_nav.js` at load, so the question goes
to the rendered DOM over all 88 coloured screens. A component's **anchors** are
the classes its own file declares and no other component file does; a screen
carries the component if at least one anchor renders. The old `**JS**` annotation
existed for exactly the blindness this removes.

**Its exemption has a control.** Three components have no anchor at all -
`counter`, `icon`, `product-thumb` - because every class they declare is also
declared elsewhere, so their cell reads `–`. That does not fail the run; what
fails is the pair going out of step, in either direction. Without the second half
the dash would be a place to hide a number nobody wants to take.

**`--measure <component>` turns the check around.** It prints the meta strip one
stand page should carry - level, path, lines, selectors, rules, declarations,
screens - with the Ukrainian endings the numbers take, from the same `measure()`
the check runs. Added at 8.45, writing the first of the eight coach organism
pages: until then a strip was typed by hand and caught by question H afterwards,
which is the expensive half, because by then the page is written and read. Screens
keeps its `–` here too - a component with no anchor cannot be counted from either
direction.


### What stage 09 added to it, and two of the three were latent bugs

**Three new questions, because the system grew a second level and a hub that lies quietly.**
A pattern with no inventory row, a pattern with no stand page, a registry page with no card in
`overview.html`, a card with no registry row, and a group heading whose count disagrees with the
cards under it. Every question in this file was written when the system had one level and when the
hub happened to be current.

The hub question is the one that paid for itself immediately: `overview.html` carried **73 component
cards for 84 files** and its own heading read «Організми 24 / 24» about a group of 34. The heading
was true the afternoon it was typed; eleven components arrived afterwards, and each of them was
added by editing a DIFFERENT file, so nothing the hub could see ever changed. **A hub that misses a
card does not 404 and does not look broken - it looks finished**, which is the more expensive
failure. Positive control was run in both directions before the number was trusted.

**Wrong version 1: the last level table ran to the end of the file.** Each level section was scanned
until the next level heading, and the LAST one until `md.length`. The patterns table appended below
it was read as a thirty-fifth organism and the level check called it diverged. Any table appended
under the last level would have been swallowed the same way, silently, and the count would still
have looked like coverage.

**Wrong version 2: `--apply` could not close its own finding.** It rewrote the stand pages' meta
tags and left the `Lines` column in `inventory.md` alone, so the run that «applied everything» still
reported ten wrong numbers on its next pass. The number comes off disk and this file knows both
halves; it writes both now.

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

## `demo.mjs` - a stand frame, taken off the coloured screen

    node tools/demo.mjs <screen> <name> --sel '<css>' [--strip '<css>'] [--state "js"] [--max N] [--pad N]
    node tools/demo.mjs coach-landing coach-landing --sel '.clh' --sel '.clv' --max 1200 --pad 16

Writes `design/kit/demo/<name>.html`. **53 of these frames were built one at a
time between 7.87 and 8.34b**, each by reading markup off a screen and pasting it,
which is the hand fix `CLAUDE.md` bans applied to the showcase: the paste drifts
the moment the screen changes. This reads the page in a browser at build time.

Three things it does that a paste does not:

1. **The markup comes from the LIVE page**, after the builders have run. Parts of
   several screens exist in no file at all - `wfAccountNav()` writes the rail's
   head, `wfHeader()` writes the header - so a file-level extractor would ship a
   frame missing exactly what the stand is trying to show.
2. **The body class travels with the markup.** This is the whole reason the tool
   exists for the eight coach organisms: every selector in all eight files is
   scoped to `.coach`, so a frame that drops the class renders a blank page and
   looks like a broken component rather than a broken frame.
3. **Document-relative `href` and `src` are lifted two levels**, because a frame
   sits at `design/kit/demo/` and its screen sits at `design/`. `uivFixLinks`
   does links at runtime; doing both in the file means the frame is correct
   before a script runs.

`--pad` exists for one reason worth writing down: the screen's own gutter lives in
`.wf-page`, which is **stand chrome** (`design/_stand.css`) and must not be loaded
into a frame. Without it a block that stops 16px from the page edge in the product
runs to the frame edge in the stand, and reads as a bleed the product does not have.

**What it deliberately does not do is choose the fragment.** Which part of a screen
is the component is a reading, not a measurement, and the wrong guess is a frame
that looks right.

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

**And `profile()` sweeps what earlier runs left behind - 11.5.** Its `onExit` hook
covers a clean exit and the signals it registers for; it does not cover `SIGKILL`,
and a walk that takes ten minutes gets killed often - by a timeout, by a second
run started beside it, by a person. Each of those leaves a whole Chrome profile in
the system temp directory. Counted when the line was written: **1107 directories,
162MB**, none of them in the repository and none ever removed. Anything older than
an hour cannot belong to a live run, since the longest walk here is the reduce
audit at about twelve minutes, so it is swept on the way IN. *A tidy-up that only
runs on a clean exit tidies up exactly the case that did not need it.*

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
put `).replace(/'/g,` into a published page while removing a curly apostrophe from
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
`design/system.html`, and the first version of this sweep sent
every page there - all three test screens came back «the page has no theme». (It
was a 404 when this was written and stage 12 built the page at batch 5; the
opener is still dropped, because the reason was never the 404 - it is that the
call LEAVES the page, and a check inside the sweep then measures a different
document.) The
navigation is asynchronous, so a check inside the sweep sees nothing; it has to
be asked afterwards. Each name is tried once in a session of its own and the
verdict is cached for the run, so a new opener is judged the day it appears. The
dropped names are printed with the result.

`--closed` restores the old behaviour, for comparing a run against an older one.

---

## `motion.mjs` - what moves in this product today, asked twice and from both ends

The census stage 11 opens with. It exists because «what already moves» has two
different answers and a stage that puts three durations into tokens needs both:
the css says one thing and the cascade resolves another, so `--source` reads
every stylesheet and every `<style>` block with line numbers (it can name a FILE,
which the browser cannot) and `--output` resolves 279 pages in Chrome and reads
the computed style of every element that actually moves (it can name a NUMBER
that is true, which the source cannot). The totals are not expected to match: a
declaration with no element and an element with no declaration are both findings,
and each half is blind to one of them.

`--states` is the third question and a different corpus: the registry of states
out of `inventory.md`, row by row, with a verdict on every row. It is separate
because a flow map never names the hover of a button - an inventory taken from
screens finds CONNECTION and STATUS in full and finds RESPONSE almost not at all,
and RESPONSE is nearly the whole of the atom rung.

**Six wrong versions, all in the header of the file**, and two of them are the
same fault in different halves: it counted every time value in a file including
the ones inside comments, it asked only the focusable elements and so could not
see a skeleton or a panel, it took every other time in a shorthand as the
duration (right for `a .15s .3s`, wrong for `a .15s, b .22s`), and its list of
state selectors was typed from habit - it asked about `[aria-selected]` and never
about `[aria-current]`, so `tabbar.css`, whose entire job is to mark the page you
are on, was reported as having no state at all. An under-reading list fails in
the direction that looks like a clean result.

`--surfaces` is the fourth question and it belongs to step 4: **a component can
read `--dur-slow` honestly, pass the roll-call of step 3 and still arrive in one
frame**, because what it changes is `display`, and `display` is a discrete
property with no midpoint for a transition to interpolate. It lists every rule
that switches a surface on or off by a class, from BOTH ends - the class may give
visibility or take it - and says for each whether the file answers with
`transition-behavior: allow-discrete` beside a `@starting-style`. Twenty surfaces
in this product, and the twenty-first (the coach split view's panel, switched
from javascript through `hidden`) is invisible to it and counted by hand, which is
printed rather than rounded off.

`--surfaces --live` asks the browser the same question, because the source cannot
answer it: `allow-discrete` without a matching `@starting-style` parses, passes
every source check and still jumps. It finds a screen carrying the class, closes
the surface, opens it and samples 30ms later - **an opacity strictly between 0 and
1 is the proof, because a jump has no midpoint by definition**. What it cannot
reach is named in its own header: a state carried on an ancestor, a surface inside
a closed surface, and a dialog nothing has built. Those print their own line and
are counted apart from «did not interpolate», because an unreachable surface and a
broken one must never share a number.

**Eight wrong versions now**, and the three newest were all in `--surfaces`:
it assumed the state marker stands on the VISIBLE side (so `.wf-cookie.hidden` -
the one surface every visitor meets - was missing from the list); its verdict was
per FILE rather than per rule, so one answered surface in `header.css` would have
reported all three answered; and it read «the surface's own class» as the LAST
class in the selector, which is the state, not the element. The eighth is worth
its own line because it was invisible until the product changed: **`opacity`
stood in the expensive-paint list AND in the cheap list at once.** It cost nothing
while the product barely used opacity; the moment step 4 put an opacity transition
on twenty surfaces, «animates something expensive to paint» jumped from 73 to 107
and every new case was the cheapest thing in css. Step 5's frame-cost table would
have been built on it.

**The check was falsified from the other side before it was believed**: the pair
was taken off `.menu-tick`, the counter went red on that one line while its
nineteen neighbours stayed green, and it was put back. A check that has never
failed has not been shown to work.

**The zero it reports for the stand corpus was proved by introduction**: one
`transition` appended to `design/kit/_page.css` turned it to 1 and removing it
returned it to 0. Thirteen stand pages match a grep for `transition` and none of
them declares one - they quote the component's css inside a code block, which is
exactly the reading the comment-blanking fixes.

`--view` is the sixth question, and it exists because the other five could not
have asked it. Every one of them resolves a document and reads computed style off
its elements. The crossfade branch B bought lives on `::view-transition-old(root)`
and its siblings - a pseudo-element tree the browser builds when a navigation
starts and destroys when it lands, present in no document at rest. So the census
printed four clean durations for two whole steps while the largest arrival in the
product rendered a fifth number: **250ms with the curve `ease`**, which is the
exact value this stage removed from 817 of 818 timing functions. *A green counter
that cannot see the class is not a zero*, and this is the stage paying that rule
on itself.

It installs a `pagereveal` listener through `Page.addScriptToEvaluateOnNewDocument`
- before the incoming document runs a line of its own script - waits on the
transition's `ready`, and reads `document.getAnimations()`. Duration is checked
against the token registry resolved in the same browser; **the curve is checked
against the ROLE, not merely against the registry**, because `linear` IS a
registry value (`--ease-cycle`) and a table lookup alone would have passed the
browser default that started the repair. What leaves must be `--ease-exit`, what
arrives `--ease-enter`, the group `--ease-standard`.

**Five wrong versions, and the first two were about driving the product in a way
no visitor can.** It measured the FIRST navigation, which has no opted-in old
document, and read «no transition» - a true reading of a false situation. It took
its page pair from my hand rather than from the corpus. Its second hop was a CDP
`Page.navigate`, which is a browser-initiated navigation and therefore one of the
cases a cross-document transition is specified to SKIP; the real anchor is clicked
now. Then two about reading rather than driving: the curve was compared as a
string, so `cubic-bezier(.48, .04, .52, .96)` in `tokens.css` and
`cubic-bezier(0.48, 0.04, 0.52, 0.96)` from the browser disagreed on a leading
zero and a fully correct run printed five failures - *a comparison whose two sides
differ in more than the thing being measured is not a proof*. And a CSS animation
spells its curve on every keyframe, so the capture handed back «curve | curve».

**That last one had already cost something before the instrument existed**: read by
hand, the effect-level easing says `linear` and the keyframe-level easing says
`ease`, and the critique log first recorded `linear` - a true reading of the wrong
half. Both spellings are printed side by side now, and the log was corrected in
place rather than quietly.

**Falsified twice.** Comment the override out of `base.css` and the same run prints
five lines of ПОЗА РЕЄСТРОМ at 250ms `ease`. Then the token-swap proof, the same
one the rest of the stage uses: `--dur-slow` redefined to `7.77s` on the incoming
document, and all five animations must read 7770ms - a pseudo-element that renders
330ms because someone typed 330ms is indistinguishable from a token reader until
the token moves.

## `width-sweep.mjs` - the hole stage 10 left open, and it was the stage's own subject

`responsive.md` closed stage 10 with one row of its contract table red on purpose:
**«breaks between the points - not measured»**. Everything else had been proved -
`accept.mjs` walks the corpus at 360 and 390, `tree-diff.mjs` compares two trees
property by property, `grid-sweep.mjs` counts columns, `split.mjs` sweeps 129
widths but only for the FRAMES it declares. **A stage whose whole subject is width
closed with its main class carrying no findings, and three of its four instruments
would have called that a clean stage.** This is the missing one.

Four questions, each asked at every width from 320 to 1600, each crossing bisected
to the pixel because «somewhere between 600 and 610» is not a finding anyone can
act on: the document scrolling sideways; an element leaving the screen; a line
longer than `--container-text`, which is read out of the browser rather than typed
here so the ceiling cannot drift from the token; and **the same entry carried by
two navigation carriers**, whose definition is taken verbatim from `tab-walk.mjs`
rather than re-derived - what this file adds is 129 widths instead of two.

It found **32 defects above the floor on 91 coloured pages**, including one that
no other instrument in this repository could have seen: `.ob-side` on
`account-orders` renders 56.8px past the edge between 1076 and roughly 1160, and
`scrollWidth` equals `clientWidth` at every one of those widths - an ancestor
clips it, so the panel is not pushed somewhere findable, it is cut off in silence.
At 1060 and at 1280 the page is clean, which is why two viewports could not find
it and 129 could.

**Twelve wrong versions, and they are worth reading in order because the last four
are the interesting ones.** It measured the stand chrome instead of the product
(the boundary is `.wf-canvas`, and the page says which is which). It read a footer
column of links as prose. It approximated `ch` with a canvas and turned its own
rounding into three findings. It printed the reading taken AT the crossing, which
is by construction the smallest bad reading there is - 74 lines all saying «68.5
against 68». It re-derived the carrier question and got «2 carriers» on 34 pages
at the shell point, where a section nav beside the header is the shape the fork
chose. It put one owner's peak on another owner's row. It read a control as prose,
then a shell with no text in it as prose.

Then the four that changed what it can do at all:

- **The measure was taken of the BOX and the measure is about the LINE.** `.qans`
  was reported at 132.3ch and its text is «Магазин: ~72 порції по 30 г.» - twenty
  eight characters in a wide box, wrapping zero times, reading perfectly. Found by
  opening all 21 findings by hand, which is the step that separates a reading from
  a repair.
- **One offender per width means a fix reveals the next one.** Capping `.qans`
  immediately surfaced `.simple`, which had been standing behind it. An instrument
  that must be run, fixed and run again to see one layer deeper **cannot tell
  «clean» from «one more round to go»**, and the round count is invisible in its
  own output. Every class answers in OWNERS now. It also fixed a silent blindness:
  with one boolean per class, anything true from below the floor upward reported
  nothing above it - which is why the «leaves the screen» class went from 1 finding
  to 15 the moment owners got their own edges.
- **A rail is not a break.** Fourteen of those fifteen were items inside a
  container that scrolls sideways on purpose. They are counted apart and printed,
  never dropped: a finding silently filtered is indistinguishable from one never
  made.
- **The inside of an `<svg>` is not layout.** A `rect` living in the svg's own
  coordinate space, which the browser clips anyway.

**Stage 12 found two more, and both were showing as a clean zero.** Until then the
instrument had only ever been run on a corpus it had already repaired; the second
run - 124 coloured pages instead of 91 - is what exposed them.

- **A clipping ancestor ended the search for a rail, and those are two different
  questions.** `.hpromo` carries `overflow:hidden` and sits inside `.hslider`,
  which scrolls X - so the card itself was correctly called a rail item while
  `SPAN.hptag` INSIDE it was reported as cut off by 488px on the four home
  screens. **Clipping decides whether the pixels are gone; only a scroller decides
  whether they are reachable.** The break stays for the case it was written for -
  a child that escapes the clipper's own box really is lost, and no scroll above
  brings it back - and an element still inside that box keeps climbing.
- **A record was filed by its FIRST crossing, and the first crossing is not the
  finding.** `rec.ats[0] < FLOOR` sent the WHOLE record to the below-floor block,
  which prints and does not fail. An owner crossing at 324 **and** at 374, 424,
  474, 524 and 574 was filed under «the product never promised to work there»,
  while the class counter above it read `0`. A defect that starts below the floor
  and survives above it is a defect above the floor. Ten phantom rows disappeared
  and four real ones surfaced when the two were fixed together.

**And what it then found is rule 8 of the system in a second material.** Five rows
on the three service pages read «77.7ch against 68», and 77.7 / 68 is exactly
16 / 14. `--container-text` is `68ch`; a custom property is substituted as a token
and resolved on the element that USES it; `ch` is a unit of the font it lands on.
The ceiling sat on `.info-body` at 16px while every line of prose inside it is
drawn at 14 or 12, so each line got 68 characters of the parent and 78 of its own.
**A ceiling written in `ch` is only that ceiling on the font it was read against.**
The repair is a nearer ceiling, not a bigger one.

**And the typography sweep broke it, for the third time in this repository.**
Replacing the modifier apostrophe by rule closed a single-quoted JavaScript string
and the file stopped parsing - the same lesson `docs/decisions.md` records from
stage 11 step 4: *a repair applied by rule still has to know the kind of every file
it opens.* The class label was reworded instead.

### `--apply` reported the defect it had just closed, and that read as a convergence bug

Every counter in this file is computed **before** the writes, so a run that
repaired one drifted `Lines` cell printed «Lines розійшлось: 1» and exited 1 -
having just closed it. Three times in stage 12 that was written down as «`--apply`
needs two passes to converge», and it never did: **the data converged in one pass
and the report did not.** A wrong diagnosis of a real symptom, which is worse than
no diagnosis, because it turned into a habit of running the tool twice.

The close is the repository's own rule rather than arithmetic. Subtracting the
writes from the counters would be trusting the write; **re-asking cannot.** So
`--apply` now ends by running this same file WITHOUT `--apply` and hands over its
verdict and its exit code. The output keeps all three facts apart: what the run
FOUND, what it WROTE, and what it LEFT. No recursion is possible, because the
child carries no flag to repeat the repair.

**Proved by breaking a cell on purpose**, which is how the first version of it was
caught failing: `new URL(import.meta.url).pathname` hands back the percent-encoded
path, this repository lives under a directory with a space in its name, and the
child died with `MODULE_NOT_FOUND` while the parent still exited 0 through a pipe.
`fileURLToPath` is the fix. A repair path nobody has watched fail is a repair path
nobody has watched.

## `motion-row.mjs` - the repair that belongs to `roles.mjs`, written as a rule

Step 4 put motion tokens into seventeen component files, and every one of those
files has a stand page whose «Токени» table lists what the file reads. `roles.mjs`
found fifteen pages drifted, which is exactly what it is for; fixing fifteen HTML
tables by hand is exactly what this repository forbids. This rebuilds the motion
row of every stand page **from the component's own css**: it reads the file, takes
every `--dur-*`, `--ease-*` and `--move-*` it uses, and rewrites the one `<tr>`
whose first cell is the «no value» dash - or adds that row if the page never had
one. Eight rows rewritten, seven added, and `roles.mjs` went from fifteen drifts to
zero on the next pass.

It touches nothing else on the page and nothing outside that single row, which is
the whole reason it can be run again after any step that adds a token to a
component.

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

## The subject of both private-rule walks, in one place

`private.mjs` and `inert.mjs` ask the same corpus two different questions, and they must agree on WHO
they are asking. Until 2026-08-17 they did not, and the disagreement was invisible for two days
because the count was not yet zero.

`inert.mjs` says of the shared predicate that it exists «so the two walks cannot disagree about what
their subject is». They disagreed anyway, because **the disagreement was not in the predicate** - it
was in the exclusions above it. `private.mjs` measured the stage hub out of its subject on 2026-08-15
(`design/overview.html` does not link `system/index.css` at all, so «which private rules override the
system» is not a question that applies to it); `inert.mjs`'s own note, written the day before and
never revisited, still said «`overview` STAYS».

**The moment the product reached zero, the two printed different answers in the same minute**:
`private.mjs` «no page carries a private rule», `inert.mjs` «1 page, 30 rules». A count that agrees
while it is wrong is exactly why this now lives in `lib.mjs` as `outOfPrivateSubject`, and why both
walks PRINT what they dropped and why - 75 pages, showcase and hub. An exemption nobody can see is
the same defect as an exemption that covers nothing.

Side effect worth naming: `inert.mjs` used to spend 3m51s answering «can these go» about a hub that
does not load the system. It now finishes instantly with nothing to ask.

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

---

## `dead-sel.mjs` - does this selector ever match anything at all

```
node tools/dead-sel.mjs                 all 84 components
node tools/dead-sel.mjs coach-order     only those
```

The question nothing in this folder was asking. `inert.mjs` asks whether a **declaration** is
overridden by another rule and is structurally blind to a selector that never matched - there is no
losing declaration to find, because there is no element for anything to be declared on. `roles.mjs`
compares tokens read against tokens listed. `idle.mjs` asks whether a class the page NAMES is a class
the page SHOWS. None of them can see a rule in a shipped stylesheet that has never painted a pixel.

**Two were found by hand, in one file, and that is the whole argument.** `coach-order.css` lost
`.od-back` at 8.7 - counted instance by instance in both layers, 0 and 0 - and kept
`.od-line:last-child` four lines below it, dead for exactly the same reason, because hand counting
stops when the counter is satisfied.

Pass A asks the browser the selector **as written**, over every page that loads `system/index.css`.
One match anywhere is enough. Pass B runs only on what pass A could not place, and it is the sorting
pass `idle.mjs` had to invent first: **a rule that applies only during an act cannot be found in
repose.** The condition is stripped and the question becomes «does the HOST exist»:

| selector | host asked | verdict |
|---|---|---|
| `.coach .cs-save:hover` | `.coach .cs-save` | condition, host exists |
| `.kp-tag::after` | `.kp-tag` | condition, host exists |
| `.coach .od-line:last-child` | *unchanged* | **dead** |

`:last-child` is structural - true or false in repose - so it stays in pass A's question. The strip
list is a list of **acts and states**, never of structure. Strip `:nth-child` and the instrument
stops being able to find the defect it was built for.

### What a verdict says, and what it does not

«МЕРТВИЙ» means «matched nothing on these 263 pages», never «can never match». Both kinds land in the
same list and are repaired differently: `.btn--accent .uiv-brand` has no possible host (the brand
mark only ever sits on the outline finish), while `.pcard.dim .pold` is a **combination the corpus
never shows** - dimmed cards exist, struck prices exist, no card is both. The tool reports the fact
and refuses to guess which; the reading is a person's and belongs beside the fix.

### Three wrong versions, written down so they are not rebuilt

1. **Asking the source instead of the browser.** Grepping class names across `design/*.html` looks
   equivalent and fails in both directions: half this product's markup is written at runtime by
   `wfHeader()` and `_nav.js` and exists in no html file, so real elements read as absent; and a
   class in a JS template string that no branch renders reads as present.
2. **Stripping every pseudo-class.** The first draft treated `:` as the mark of a state. That turns
   `.od-line:last-child` into `.od-line`, which is alive, and the one defect the file exists to find
   reports healthy.
3. **Stripping inside parentheses.** `:not(.on)` holds an argument, not a condition of this element.
   Strip `.on` out because a script toggles it and the selector becomes `:not()`, which no browser
   parses - so the host query throws, the host reads as absent, and **eleven healthy `:hover` rules
   on radios, steppers and the view toggle reported as dead**. 37 findings became 16 when this was
   fixed. The mistake flatters, which is the dangerous direction: it produces findings.

A fourth was caught before it shipped: **stopping the walk once every probe has gone green.** It is a
real speedup and it costs the corpus census - a run that stops at page 47 has not looked at pages 48
to 267 and reported «0 pages without the system» on a repository that has four. The per-page work
still shrinks, because only selectors still unplaced are asked; the walk does not.

### Its exemptions, and the control on each

- **Born at an act.** An element that does not exist on a loaded page because a script creates it.
  Pass B cannot help: the host is the thing that is missing. Declared by hand, per file, with the
  line of code that builds it - today only `toast.css`, whose strip is `t.className = 'wf-toast '
  + type` at `wireframes/_nav.js:1242`. `idle.mjs` refused that same `className =` signature on the
  ground that it dresses a node the script just created, which is markup and can be shown in repose:
  **the same fact read for the opposite question, and both readings are right.** The control fails if
  a declared file turns out to have every selector alive.
- **Pages without the system.** A class in markup is a class in markup whether or not a stylesheet
  reached it, so the four pages deliberately off the system would lend liveness to rules that never
  painted on them. Asked in the browser (`document.styleSheets`), never of the file - `design/
  overview.html` mentions `system/index.css` **in a comment**, and a source grep counts that as a
  link. Named out loud, and a zero here fails.
- **Selectors this engine will not parse.** `::-moz-range-track` and its three siblings in
  `price-slider.css` are correct rules for another engine. Reported, not failed.

### What the first full sweep found

2925 selectors in 84 files (2215 distinct), 263 pages with the system: **16 dead**, 365 conditional
with a live host, 6 born at an act, 4 unparseable here. Seven of the sixteen are one shape - **a
comma list completed for symmetry where only one member has an element**: `.btn--outline .uiv-brand`
is alive and the accent, ghost and `--l` editions are not; `.field-grp > .btn--accent` is alive and
outline and ghost are not; `.emptybox .et:first-child` is alive and `.empty .et:first-child` is not.
That last one is the sharpest: `empty-state.css` had **already written the rule down** four lines
above - «a selector added for it would match nothing. An exemption that covers nothing fails as
loudly as an undeclared case; so does a rule» - and then wrote two.

**Read and closed the same day: twelve deleted, four kept, `dead-sel` 0.** 2925 selectors before,
2913 after, **live count unchanged at 2534** - which is what proves nothing alive was touched;
`tree-diff --dir` over all 88 product screens at both widths, 176 comparisons, **0 elements moved**.
The reference had to be built by hand and that is worth knowing before trusting `tree-diff HEAD` for
a stylesheet edit: against HEAD it answers 4, all of them earlier uncommitted steps, and with no page
named its default subject is «which `design/*.html` did git see change» - **two pages, neither of
them one this edit could reach.** A component-layer change touches every page that loads it and no
html file at all. The four kept are
declared as `KEPT_ON_PURPOSE` with a reason each, and that control fails **in both directions**: an
entry that goes alive means the case has arrived and the note must go, an entry naming a selector no
file declares means the exemption outlived its rule.

Two of the twelve are worth remembering for what they say about other instruments. **`.resend a`**
was four declarations for an anchor that is not there - the live resend link is `.pf-resend` inside
`.otp-note`, already drawn by `checkout-form.css:50`, and this was its ninth-edition twin one token
off, **on markup that never existed, so no amount of looking at the screen could have found it.**
**`.skcard:not(:has(.skb))`** was correct the day it was written and the corpus moved out from under
it: twelve `.skcard` today, not one without a `.skb`, and on the two screens the rule names the word
survives only in a comment. **A rule can be right when written and wrong later without anybody
editing it** - which is the argument for sweeping the whole corpus rather than what a step touched.

---

## `dry-run.mjs` - can the system build the screens it has never seen

```
node tools/dry-run.mjs              every grey screen with no coloured twin
node tools/dry-run.mjs content-faq  only those
```

**The check that replaces a rollout.** Stage 08 has no розкотка: a screen is assembled once, when
the system is finished, and that is stage 12. The rollout was the completeness test - the moment a
missing component announces itself - so the pack puts three cheaper instruments in its place, and
this is the third. A component found here costs one file; the same component found at stage 11 drags
its states, its pattern, its breakpoints and its motion behind it.

The classes are read off the **loaded** page, because `wireframes/_nav.js` builds the header, the
bar, the drawers and much of the body at runtime. The answer side is every class any component
declares at any depth. What is left over is what the system has no name for, grouped by prefix,
sorted by how many screens carry it.

### Three «not a finding» rules, each declared and counted

- **`wf-` / `uiv-` / `sk` prefixes** - the prototype's scaffolding and the mark passes.
- **1-2 letter names** (`h`, `t`, `bd`, `ic`) - the grey layer's local shorthands inside a block.
  They ride their parent: covered parent, no question; uncovered parent, they come along with it.
- **A class that also lives on ANSWERED territory** - a grey screen that already has a coloured
  twin. The system was built against those, so a class there that nothing declares is chrome the
  colour layer dropped or a dead name the transform carries (`stack`, `dark`), and it belongs to
  `btn-rank.mjs` rather than here. A zero here fails the run.

### Two wrong versions, and the second one is the more instructive

1. **Reading `<main>` instead of `<body>`.** It looks right - the product is what is inside the page
   - and it is blind to exactly the components that are hardest to build: an overlay, a drawer, a
   dialog and a sheet all live outside `<main>`. `search-suggest` came back with **nothing at all**
   while its markup holds **68 `ov-*` classes**, and the screen did not appear in the report. Same
   family as a finder that reads one directory level: it fails where nobody looks.
2. **«Does this class appear anywhere in `design/`?»** as the answered-territory test. It dropped
   **233 classes** and took `info-*`, `op-*`, `loy-*`, `art-*` and the whole quiz with them - because
   **a screen that has never been coloured has no class in `design/` by construction.** The question
   and the exclusion were the same question, which is the check whose both sides come from one source
   wearing a new costume. The fix compares against grey screens that HAVE a twin, and both sides are
   then read the same way in the same browser pass.

### What the first run found

54 grey screens with no coloured twin, 1 153 classes known to the system: **228 classes in 79
families with no component**, 16 dropped as answered chrome, 19 shorthands.

**Exactly one family crosses more than two screens.** `info-*` - `info-body` `info-card` `info-stat`
`info-stats` `info-steps` `info-toc` `info-updated` `info-vals` - on six: about, contacts, delivery,
guarantee, legal, returns. Everything else is one or two screens, which is that screen's own block
rather than a component; the ladder's own rule is that a pattern needs three.

The runner-up by SIZE is `q-*`, 35 classes - and it is one screen, the quiz, which locked decision 2
puts post-launch. **The biggest pile in the report is the one that must not shape the system.**

## `pattern.mjs` - does a composition repeat, and on how many SCREENS

Stage 09 step 1 asks two things of one walk: what stands on three or more screens (a pattern) and
what never happens twice on one screen (a rule of use). One pass, both harvests.

    node tools/pattern.mjs --mode=comp|pair|cls|raw|rawv [--min=3] [--width=390]
                           [--json=<file>] [--from=<file>] [--screens]

`--json` stores the walk so the reports can be re-read without re-opening 230 pages; `--from`
reads it back. `comp` is the full ordered child sequence of a named container, `pair` every
adjacent pair under one, `cls` the normalised per-screen class count, `raw` the same unnormalised,
`rawv` only what has a box on it at that moment.

Five wrong versions, all of them still written in the file's own header:

1. **No ownership question.** Without asking which component file declares a class, it reported
   268 compositions on three or more screens, most of them the inside of a card. A threshold that
   returns a quarter of the corpus has measured nothing.
2. **The signature was the whole child sequence.** One extra block on one screen split one
   composition in two: «section head plus a row of cards» came back as four rows of four screens
   instead of one of sixteen. Adjacent pairs were added beside it, not instead of it - the filter
   rail's `.frail > .fgroup+` has no adjacent pair at all and only `comp` sees it.
3. **`btn--*` was dropped to align the two corpora, and that broke the one row that mattered.**
   Stage 08 renamed the grey `.btn.dark` to `.btn--accent`, so dropping the modifier left the
   child with no class, the pair rule threw it away as unnamed, and «a row of two actions» read
   70 grey screens against **0 coloured**. Now any class carrying `--` collapses to its base.
4. **A run is a pair too.** Two identical adjacent children collapse into one run and the
   adjacent-pair loop never fired on it - which is exactly the case «two buttons side by side».
   28 screens instead of 76.
5. **Chrome was decided by the whole key.** `wireframes/_nav.js` builds the header, footer, mega
   menu, drawer, city dialog and tab bar, and BOTH corpora load it, so those compositions stand on
   134 of 142 grey screens while already living in one function. The rule «every class here was
   injected» answered «no» for the entire header, because `btn` and `field` are also written by
   hand elsewhere: one shared name let 66 chrome rows back in as findings. The container decides
   now - if the element the composition hangs off was put there by a script, so was the
   composition.

And one caveat that is not a bug: the walk runs at ONE width. At 390 the desktop filter rail and
desktop toolbar have no box, so `rawv` reports them on zero screens. Read `raw` for anything whose
visibility is a breakpoint's decision, and say which reading a claim came from.

## `tab-walk.mjs` - press Tab and see where focus actually lands

Born at stage 10 step 3, and it exists because a shell that changes shape with the
width has one failure mode nothing else here can see: **the carrier that is no
longer drawn stays in the tab order**. Hidden by opacity, by a negative offset or
by a zero-size clip, it is invisible to the eye and fully reachable by keyboard, so
a person walks a navigation they cannot see. `accept.mjs` asks the output about
text and overflow, `theme.mjs` about colour, and neither of them presses a key.

It dispatches a real `Tab` through CDP and reads `document.activeElement` at each
stop, tagging the stop with the shell region it landed in.

| it reports | why |
|---|---|
| **focus on an invisible element** | `checkVisibility({checkOpacity, checkVisibilityCSS})` false, or a box measuring 0 in either axis. This is the defect the file exists for, and it fails the run |
| **the same entry in two carriers at once** | asked as a set intersection of the two carriers, not from the walk. Reported, not failed - see below |
| **a positive `tabindex`** | it would make DOM order and focus order disagree and quietly invalidate every other reading here |

**Two wrong versions, both written down in the file.**

The first did not press anything. It listed every focusable descendant of `.wfh`,
filtered on the element's own `display`, and called the rest «hidden but
focusable»: **196 at 360 and 183 at 1280**. Every one was a false positive - an
element under a `display: none` ANCESTOR is not in the tab order at all, so what
the number described was the closed mega-menu, the closed drawer and the language
dropdown. A count of «not visible» is not a count of «reachable while invisible».

The second counted repeated labels among the stops and reported **six** - «В
обране», «У кошик», «фото» on a listing, «У сесію», «Усі клієнти», «Профіль» in the
coach cabinet. Every one was a control repeated per row, which is what a list is. A
duplicate only matters when the SAME top-level entry is carried by two different
carriers at the same width, so that question is now asked directly of the two
carriers and the walk no longer guesses at it.

**The intersection is reported and does not fail the run**, and that is deliberate:
at mobile this product carries the cart in both by an IA decision written in
`ia/docs/pages/navigation.md`. An instrument that fails on a decision teaches its
reader to ignore it.


---

## `grid-sweep.mjs` - how many columns a grid really has, width by width

Stage 10 replaces breakpoints with `auto-fit`, and neither half of what it promises
can be checked by reading CSS. `repeat(3, 1fr)` under a query and
`repeat(auto-fit, minmax(180px, 1fr))` are the same three columns at ONE width and
different everywhere else, and the width where they part is written in neither
declaration. So the count is asked of the output: `getComputedStyle(el).gridTemplateColumns`
comes back as a resolved track list, which is the column count and the column width
in the same string.

```
node tools/grid-sweep.mjs                    every grid in the system
node tools/grid-sweep.mjs goal-tile.css      one component file
node tools/grid-sweep.mjs --sel .goaltiles   one selector
node tools/grid-sweep.mjs --step 10          finer than the default 40px
```

It finds its own subjects: the selectors are read out of `design/system/**/*.css` -
every rule that declares `grid-template-columns`, base rules and rules inside a
query alike - and the pages come from `pages()`. When a rewrite deletes a selector
the sweep stops reporting it rather than silently sweeping the neighbour.

**The width is the measured width.** Every row carries
`document.documentElement.clientWidth` as read from the page, and the run exits
non-zero if any row's measured width differs from the requested one. A scrollbar
turning a requested 360 into an actual 345 is how a whole class of defect gets
tested at a width where it does not reproduce.

**It resizes rather than reloads.** 33 widths x 90 pages is 2 970 page loads and
about two hours. The page is loaded once and the viewport moves under it, which is
also the gesture the fluid way has to survive.

**Two wrong versions, both written down in the file.**

The first counted the raw track list. `auto-fit` COLLAPSES the tracks it has no item
for and `getComputedStyle` still lists them, as `0px`, so the five trust banners were
reported standing in **eight columns at 1360**. A collapsed track is not a column.

The second asked «is this selector on any page» of the product corpus alone -
`design/*.html` minus `kit/`, minus `concept/`, minus the hub, which is the right
corpus for a width audit and the wrong one for «does this exist». It printed
«`.addr-2col` stands on no coloured page», which reads as dead and was one edit from
being published as a finding. It stands on `design/kit/client-dialog.html`. A
selector missing from the product corpus is now looked for in the stand as well, and
the answer says which of the two it found.

---

## `bp.mjs` - every width the product asks about is a width the registry names

Stage 10 puts two points in `tokens.css` and then cannot use them:
`@media (min-width: var(--bp-shell-wide))` does not work, because a media query is
evaluated before the cascade of custom properties. There is no error - the rule simply
never fires. So the query has to carry the literal, and the moment it does, the token
stops being the only source and becomes a source plus a promise. This file turns the
promise back into a source: the registry is READ OUT of `tokens.css`, and every
`@media` in the product is asked to give one of its numbers.

```
node tools/bp.mjs            every query, product and stand alike
node tools/bp.mjs --all      also print the queries that pass
```

Four classes fail the run, and each was proved to fail by being introduced on purpose
and then reverted:

| class | why it is silent otherwise |
|---|---|
| a number that is not in the registry | the rule works, the look is fine, and the system quietly has three points instead of two |
| an `@media` in a screen file | it works, it is local, nothing fails - and at stage 12 twenty subagents each invent one, exactly as inline CSS scattered at stage 04 |
| `var()` inside a query | evaluated before custom properties: no error, the rule never fires |
| `@container` with no `container-type` declared anywhere | the component silently always looks the way it does in a wide place |

**The mirror is part of the number.** A point at 620 is written `min-width: 620` on one
side and `max-width: 619` on the other; both are the same decision, so 619 and 859 pass
while 621 and 861 do not.

**Every declared list is itself checked.** `EXCUSED` names the numbers deliberately not
on the registry yet and why; `NOT_PRODUCT` names the three presentation pages of stage
06 plus the folder hub. An entry that matches nothing fails the run exactly as loudly
as an undeclared number - a list nobody maintains is worse than no list, because it
reads as coverage.

**One wrong version, written down in the file.** The first run reported eight failures
and every one was on `design/concept/*` or `design/overview.html` - the presentation
pages and the hub, which `dead-sel.mjs` and `theme.mjs` both name out loud for the same
reason. An instrument that treats a presentation page as a product screen reports drift
that does not exist, and after the second such report a reader stops looking.

## `focus.mjs` - press Tab on every control and read the ring it actually draws

`DESIGN.md` section 7 says the ring is the system's and fires on `focus-visible`,
never `focus`. Seventeen component files declared that; sixty-seven did not, so
what a control showed on Tab depended on which file happened to own it. Measured
on `coach-clients.html` at 1280 before step 10.6b: of 80 visible focusables,
**51 drew Chrome's own `1px rgb(0, 95, 204)`** and two drew the system's. That
blue is a fixed value in the user agent - it does not follow the dark theme, so
a keyboard user on a dark surface gets a blue line on near-black.

**The css cannot answer this, which is why the tool exists.** The failure that
started it is invisible in any grep: `cart-drawer.css` writes `box-shadow: none`
on `.cd-foot > .btn--outline` to take the outline finish's box off a link-shaped
action. That is (0,2,0), the same as `.btn--outline:focus-visible` in
`button.css`, and cart-drawer loads later - a tie goes to source order and the
focus ring is deleted, in every state, permanently. Two files, both correct on
their own; the defect exists only in the resolved output. Four more of the same
class turned up on `.acc-link[aria-current]`, `.tbanners .tbn`, and the
`aria-disabled` off state.

**The ring may live on an ancestor.** The header search is a `.field-grp` around
a `.field`: the input carries none by design and the group carries the halo. So
an element showing nothing is asked again about its nearest three ancestors
before it counts as unanswered.

**Wrong version 1: it read the ring immediately after `focus()`.** The ring
transitions - `box-shadow .15s` - so a read at 0 ms samples the transparent start
and calls a correct control dead. The first run said 24 of 111 had no ring and
all 24 were mid-transition. The fix is not a longer wait, which would put a
corpus walk into hours: transitions are switched OFF in the page before the walk,
because the question is about the resting focus style, never the animation.

**Wrong version 2: it enumerated focusables by their own `display`,** which
ignores ancestors - so every link inside the closed mega menu counted, 342
candidates instead of 111.

Today: **19 071 controls across 91 pages at two widths, 0 in the UA blue, 0 with
no ring at all.** Proved able to go red by removing the floor from `base.css` for
one run: 158 of 215 fell straight back to the browser's blue.

## `typo.mjs` - the three-dash rule, asked of the whole tree instead of the screens

`CLAUDE.md` says U+2014 appears nowhere in project output and that the product
uses one apostrophe form. Both rules were enforced - **on rendered screens**, by
`accept.mjs`, in a browser. That is where they were easy to check, not where the
rule says. An em dash in an md, in a css comment, or inside a js string on a page
`accept.mjs` never opens went unasked for the whole project. Every md here is
read by whoever builds next, and `docs/decisions.md` is what the handoff stage
reads as the record.

**The exceptions carry a COUNT, not a pass.** Six files legitimately hold an em
dash because the sentence is ABOUT the em dash - `CLAUDE.md` stating the rule,
`accept.mjs` holding the literal it searches for, `decisions.md` quoting the form
it replaced 3 621 times. A file-level mute would then hide a real one added
beside the quotation, which is the likeliest way this class ever comes back. So
each entry declares how many, and a change in either direction fails the run.

**This file holds neither character as a literal.** Both are built from their code
points and every mention is by name. A checker that has to declare itself as an
exception has given itself the one mute nobody will ever question.

**Wrong version: the first draft skipped `tools/`,** on the argument that the
instruments are not product. But `accept.mjs` holds the em dash as the literal it
searches for - so the one file guaranteed to contain the character would have
been the one file never asked about it.

Today: 13 em dashes in 6 files and 3 curly apostrophes in 3, every one of them a
declared quotation of the rule. Three failure modes were proved by being
introduced and reverted: a real one in an undeclared file, a real one added
beside a declared quotation, and a declared quotation removed.

### The parse gate - the half this check owed for two stages

Added 12.1. The apostrophe rule is a rule about TEXT, and this checker enforces it
over `.js` and `.mjs` too. In those two kinds the ASCII apostrophe is not neutral:
inside a single-quoted string it CLOSES the string. So a blanket replacement can
leave the text rule perfectly satisfied and the file unable to run, and nothing
asked the second question.

It is not hypothetical. **`tools/dry-run.mjs` shipped that way and stayed broken
across two stages** - `сім'ях` and `ім'я` on two `console.log` lines - with this
checker green on it every run. It was found by the stage-12 entry gate asking it
a question, which is the only reason anybody noticed: an instrument nobody runs
reports nothing, and reporting nothing looks exactly like reporting zero.
`width-sweep.mjs` took the identical wound at 10.7 and was caught only because it
was being written at that moment.

So every `.js` and `.mjs` the walk opens must PARSE. `node --check` is the
authority rather than a regex, because the question is precisely «does the engine
accept this», and a regex approximating the engine is a second grammar to keep in
step. The gate carries its own idle control: if the walk opened no script at all,
the extension list or the exclusion list has moved underneath it, and that fails.

Proved red before it was believed: a two-line file holding `'сім'ях'` was written
into `tools/`, the run failed with the file named and the engine's own message
quoted, and removing it returned the run to zero. **54 scripts, all parse.**

## `dupe.mjs` - the same declaration block, written twice

A design system's claim is that a shape is decided once. That claim does not die
in a refactor, it dies in one honest copy: somebody needs the visually-hidden
pattern in a second place, writes the five declarations again because CSS has no
way to share them, and leaves a comment saying `= .vh`. The comment is true the
day it is written, nothing asks again, and the THIRD copy reads the second as
precedent rather than the first. That is exactly what happened here - the pattern
reached `menu.css`, then `header.css`, then an inline `style=` on `checkout.html`
that was not even a correct copy: `clip: rect(0 0 0 0)`, the deprecated form,
with `padding`, `margin` and `border` missing.

Every rule in `design/system/` is reduced to its declarations, normalised and
sorted, so neither order nor whitespace can hide an equality. Then two floors,
and the second one is why the check is usable at all:

| floor | what happens |
|---|---|
| **4 declarations** | reported and counted. `color; font-size; line-height; margin` is a sentence in the language, not a shared decision - 30 groups over 71 places today |
| **6 declarations** | fails the run unless the group is declared. From six up, two blocks are the same OBJECT written twice, and somebody had to decide that |

Six groups are declared, each with the reason CSS could not share it, and each
under three tests at once: every named site must still exist, every site the
duplicate actually has must be named, and all of them must still be EQUAL. The
third is the one the whole tool is for - a repeat that drifts leaves a comment
behind claiming an equality that is gone.

**Wrong version 1: it compared whole rule texts.** Two rules differing only in a
trailing comment, or in the order of `padding` and `margin`, are the same
decision written twice, and text comparison answered «different» to both.

**Wrong version 2: the floor was two declarations**, which made every
`display:flex; align-items:center` in the system a finding - 200+ of them, all
correct. A gate that fails on 81 correct idioms is a gate somebody mutes.

All three failure modes were proved by being introduced on purpose and reverted:
a repeat drifted by one pixel of `margin`, a seventh site added to a declared
group, and a declared site removed.

## `split.mjs` - does the split view split, and does every screen that could have it have it

Stage 10 step 5 is the only place in the stage where a LOOK appears that did not exist
before: above `--bp-shell-wide` a list of records and one open record stand side by side.
That is two claims at once - the frame really has two columns, and the two panes really
sit in them - and neither is visible in the css, because the frame is one `minmax()`
column in the base rule and two under a query, and whether a child landed in the second
column is a fact about the OUTPUT. Both are asked of `getBoundingClientRect`, at the
point minus one, at the point, at the point plus forty and at 1440, with the point read
off `:root` at runtime so this file holds no copy of 860.

**The roll-call is the other half, and it is the half that catches the real defect.** A
split that works on one screen and is missing on its six siblings is worse than no
split: the coach meets it, learns it, and then it disappears on the screen where the
session is loading. So the walk covers the whole product corpus and fails on any page
that carries the LIST and stands outside a frame.

```
node tools/split.mjs                     both frames, the whole product corpus
node tools/split.mjs --frame .clsplit    one of them
node tools/split.mjs -v                  name every page, not just the count
```

**Five failure classes, each introduced on purpose and reverted:** a carrier outside its
frame, a declared frame nobody carries, one column above the point, a clipped box inside
the frame, and the page scrolling sideways. **Every declared list is itself checked** -
the two-row frame registry fails the run if a row covers nothing, exactly as loudly as an
uncovered page.

**A third wrong version, and it is the one worth reading.** The check used to assert
WHERE the split turns on - four probes around `--bp-shell-wide` - which is a media query
written into the instrument. The moment the clients frame started asking about its PLACE
it failed nine times on a frame behaving correctly, and it could never have seen the
defect that actually shipped in that change: a bare `@container` turned the split ON
below 860 and OFF between 860 and 960, because the shell takes a nav column there and the
box is not monotonic in the viewport. Four probes never saw it. It now declares each
frame's own RULE - «two columns exactly when the viewport is at least X and my box is at
least Y» - and sweeps 320 to 1600 at 10px checking the frame is a pure function of it,
printing every transition with the box that caused it. It also separates findings below
the 360 floor from failures, and prints them rather than dropping them.

**Two earlier wrong versions, written down in the file.** The roll-call was first a **grep over
the source**, which answered correctly on the eight session screens and would answer «no
split» on three of the four clients screens, which have one: `wfClientSplit()` builds
their frame at load, so neither class exists in those files at all. A question about
structure can only be asked of the DOM. And the first session measurement **injected the
layout it was measuring** - it pushed an override stylesheet in instead of moving the
viewport, then reported the client rail at 320 and the basket at 488 with the two
swapped, plus a `qa-row 324 > 258` clip that exists at no width. A probe that changes the
page is measuring the probe.

## `screen-css.mjs` - the nine marks a screen file may not carry

    node tools/screen-css.mjs           every coloured screen
    node tools/screen-css.mjs cart      only those
    node tools/screen-css.mjs --list    print every hit, not just the counts

Stage 12 hands the same contract to fifty subagents, and its hardest line is **«a screen declares
no styles of its own»**: no `@media`, no `transition`, no `animation`, no `@keyframes`, no `<style>`
tag, no `style` attribute, no hex, no `px`, no font name past a token. Until this file the
instrument for that was a grep somebody would type differently each time.

**A hand-typed grep cannot carry the exceptions**, and it cannot carry them the way this repository
insists on: with a COUNT rather than a pass, the shape `typo.mjs` uses. A mute saying «this file is
fine» hides the next real one added beside it.

| exception | why | check |
|---|---|---|
| `style="width:NN%"` on a bar | a percentage is a VALUE - a static prototype has no server to compute a rating bar | **20 declared**, any change either way fails |
| `design/overview.html` | the hub is the map of the prototype, not a screen of it, and it loads no `system/index.css` | out of subject by name |

**Comments are not code.** `coach-tariff.html` holds the word `<style>` inside a `<script>` comment,
describing what the grey original had; a raw text search calls that a style block. Html comments and
script comments come out before anything is asked.

**The third exception was written, run, and withdrawn by its own idle control.** The pack names
INLINE SVG as the one exception this instrument must carry - icons arrive with their own `fill`,
`stroke` and `viewBox`, so a run without it would be a legal non-zero on every screen. The first
version stripped `<svg>...</svg>` and then asked how many bytes it had removed: **zero, on all 91
coloured screens and all 142 grey ones.** This product has no svg in its markup at all - `uivChrome()`
swaps every emoji for an icon AT RUNTIME - so a source-reading instrument never meets one. The
exception covered nothing, and it would have hidden the case that matters: a subagent hand-writing an
icon, which SHOULD fail on `hex` and on `px`.

**Proved red before it was believed.** A `<style>` block, a `style=` attribute with a hex, a `px`, a
font name and an `@media` were injected into `cart.html`: seven of the nine marks fired, the run
failed with the screen named, and reverting returned it to zero.

Today, after the floor sweep of 12.2: **all nine at zero over 91 screens**, and 20 declared
percentages on 8 screens.

## `rollout-table.mjs` - the stage-12 estimate, out of the two registries

    node tools/rollout-table.mjs           the markdown table
    node tools/rollout-table.mjs --check   is `rollout.md` still telling the truth

The estimate in `design/kit/docs/rollout.md` is the **only place in this repository where «screen ->
IA node» is written down**. Stage 13 reads it, and the parent substitutes its node column into every
subagent contract before every launch. A table like that, typed by hand, goes stale the first time a
state is added - and it goes stale in silence, because nothing downstream can tell a wrong node from
a right one. So it is generated: `WF_FLOWS` and `WF_SITEMAP` from the grey registry, `DESIGN_NAV`
from the coloured one, and both file trees.

**Wrong version:** the declaration matcher read `const NAME =` only, and `DESIGN_NAV` is declared
`var`. The run reported the registry missing when it was three lines below it.

`--check` is the idle control on the file rather than on the walk: every row the registries produce
has to appear in the md, and a screen that has drifted is named.

## `glyphs.mjs` - a mark the passes did not reach

    node tools/glyphs.mjs [width] [page...]      default 1280, every design/*.html

The product types emojis in its markup and swaps them for icons at runtime. **No instrument could
ask whether a mark survived that.** A source-reading one sees an emoji on every screen and is right
to; a browser one sees an icon and is right to; neither asks the only question that matters. The
contract that fifty subagents read states it without a caveat - «`uivChrome()` міняє кожну емодзі на
іконку набору» - and it was not true.

The list is the PRODUCT'S: `UIV_EMOJI` is read out of the running page, so a row added to the map
next month is asked about the same day and a row deleted stops being asked. Two opposite questions:
a character the map **knows**, still sitting in a text node (a pass did not reach it - this fails the
run), and a pictograph the map does **not** know (a hole in the declared list, the shape step 7.99
had twice with 👥 and ◈).

**Two exceptions, both carrying their count**, because an exception that stops covering anything must
be visible: © ® ™ are typography rather than icons and `Extended_Pictographic` owns them anyway; and
the empty state's mark is an ILLUSTRATION, which `empty-state.css` says in two rules rather than in
prose - it draws `.empty .ei` at `fs-30` as the picture itself and hides the same class inside
`.emptybox` at `font-size: 0` so an icon can take its place. Stand pages are counted separately: they
quote glyphs on purpose, and twenty-one of those must not bury two real misses.

**Proved in both colours before it was believed.** With the old `uivHome()` gate restored it reported
nineteen marks on `home-catalog`; repaired, none. Its first corpus run then found a second one
nobody was looking for: `cart-coach-empty.html` never called `uivCart()`, so its empty state kept a
raw trolley where `cart-drawer.css` expects the mascot - five screens carry a cart drawer and four
called the pass. Invisible in a screenshot, invisible in the source.


## `steps.mjs` - the seven eighths of a screen that stand behind a click

    node tools/steps.mjs              every screen with a step machine
    node tools/steps.mjs quiz         only that one
    node tools/steps.mjs --census     also print the machines found

Every width instrument here loads a page and measures what it finds. `accept.mjs` walks 343 screens
at 390 and 360, `width-sweep.mjs` asks four questions at 129 widths, `split.mjs` sweeps its declared
frames - and all three read the document AT REST. On a screen built as an in-page machine that is
one state of eight.

It was not a theory. The colour quiz arrived with its footer row overflowing at 360 and 390 by 68px,
taking the whole document sideways, and `width-sweep.mjs quiz` printed «чисто на кожній із 129
ширин». Three green counters, one of them running 129 times, none of them able to see the class.

**The subject is DERIVED, so it is asked both ways for free.** A step machine is a visibility switch
the system declares (`.S{display:none}` plus `.S.X{display:...}`) that the screen's own tail script
toggles with `classList`. Three machines in 142 screens today; a screen that grows one is picked up
without an edit here.

**Two wrong versions, and the first one was this file's own.** It reached every step by applying the
switch class directly and reported ZERO - then the repair it was written to verify was reverted, and
it reported zero again. A step machine moves two things: the body, which the class shows, and the
chrome around it, which the script re-dresses. The overflowing row was «Назад · Пропустити ·
Показати набір →», and none of those three words exists in the markup at rest. The second was the
scope walk: `closest('div')` on a `div.q-step` returns the step itself, so the footer was never in
scope and the walk stopped on step one.

So it does both and counts them apart: it clicks the machine's own controls, which is the only thing
that dresses the chrome, and says how many steps that reached; whatever the path never visited is
opened by the switch and counted separately, with its chrome named as somebody else's. An instrument
that shows one layer cannot say «clean».

## `coverage.mjs` - the coverage map, generated and then walked

    node tools/coverage.mjs           the report and the walk
    node tools/coverage.mjs --apply   walk, then rewrite the section in design/overview.html
    node tools/coverage.mjs --check   idle control only, no browser

The map on `design/overview.html` had been typed by hand, screen by screen, since stage 06. At the
end of the rollout it named **54 of 141 pages** and looked complete, because **a map that has never
mentioned a screen has no gap where that screen should be**. That is the fifth instance in one stage
of a declared list asked in one direction only, and the resolution is the one the others got: the
section between `<!-- coverage:start -->` and `<!-- coverage:end -->` is generated from `WF_FLOWS`
(the whole product, grey) and `DESIGN_NAV` (what exists in colour). Nothing in it is typed.

**Then it is walked, because a generated list only proves the generator ran.** Every registry entry
is opened in a browser and the OUTPUT is read: `записів N · відкрилось M · зі своїми станами K ·
панель рівно одна: X з M`. K comes from the stand rail, which `uivBar()` derives from `DESIGN_NAV`
rather than from this script - so the two halves of the question have independent sources.

**Its first walk found a defect no source instrument could have.** The rail on `index.html` drew all
three of the home page's states as grey escapes to `index-buyer.html`, a name that exists in neither
tree: node 0.0 is the one screen with a `stateFile`, and this copy of the screen lookup had dropped
it. `links.mjs` cannot see that - the rail is injected at runtime.

**Zero-coverage is a state, not an absence.** A screen deliberately out of scope stays ON the map,
in its row, drawn as a struck span with the decision that put it there in the next cell, and it is
counted. `OUT_OF_SCOPE` is a declared list too: an entry naming a screen that does not exist, or one
whose coloured copy has since been built, fails the run.

**Wrong version:** the completeness check asked whether every registry page appears as an `href` on
the map. An out-of-scope page is deliberately NOT a link, so it could never pass, and the run
reported `quiz.html` as «not on the map» while it sat in the middle of it. **A red that means
nothing trains the reader to skip the reds that do** - the same failure as a meaningless green, read
backwards. Out-of-scope screens are now asked the question they can answer: is the ROW there.

## `key-alpha.py --check` - the transform existed and the check did not

    python3 tools/key-alpha.py --check [dir]     default `design`

`key-alpha.py` gives a white-background PNG the alpha channel it never had, and its own header says
it is «an asset tool run by whoever changes an asset, not a check run by every step». That was a
true description and a hole. **Two mascots shipped as PNG colour type 2** - no alpha at all - and on
a dark page `border-radius: 50%` turned the baked white background into an opaque disc brighter than
the accent button beside it, on three screens. Nothing in this folder asked: a browser instrument
sees a picture and is right to, a source instrument never opens a PNG. A critique agent found ONE of
the two by looking at a dark screenshot; the check found the second in a byte.

The question is one byte - IHDR colour type, where 0 and 2 carry no alpha. **Two folders are exempt
and each carries its count**: `kit/screens` (full-page screenshots - the picture IS the page, nothing
shows through it) and `concept/assets` (reference plates on the concept stand, which `theme.mjs`
already declares outside the system by kind). An exemption that stops covering anything fails the run.

Proved in both directions before it was believed: a type-2 file copied into `design/visuals/` turns
it red and naming the file turns it green again.

## `crop.mjs`, two guards and a flag added at 12.10

A critique subagent, told in three places to write nothing, ran `crop.mjs` with its arguments a place
out and left `content-guarantee` - a 29KB PNG with no extension - at the **repository root**. Nothing
stopped it. Two guards now refuse rather than warn, because a warning on a tool a subagent runs is
read by nobody: the output must end in `.png`, and it must resolve OUTSIDE the tree the instrument
photographs. **An instrument that can write into its own subject can change what the next run
measures.**

And `--dark` photographs the other theme, added because an agent had to hand-roll plumbing this file
already had every part of. **Wrong version, and it photographed a LIGHT page while reporting
success**: setting `data-theme="dark"` on `<html>` before load does nothing, because
`design/system/theme.js` runs `apply(read())` on every load and `apply` REMOVES the attribute
whenever the stored mode is not dark. The product's switch is the storage key; the attribute is what
the key produces. The instrument now sets what a person sets and lets the product apply it.


## What step 7 of the rollout added to `roles.mjs`, `split.mjs`, `dupe.mjs` and `theme.mjs`

**`roles.mjs --apply` - the drift this file existed to name, finally closed.** Its own first paragraph
says «all of those lists are typed by hand», and for two stages the only thing it could do about the
drift was report it. At the close of the rollout it reported **29 of 93 pages adrift**, twelve of the
tokens on one component whose listing form batch 4 had just written. Nothing in the table is a
judgement - the set is `var(--x)` in the css minus what the file declares for itself, split by whether
`tokens.css` calls the name semantic - so every part of it can be written rather than typed. Both
cells, both column headings and the two counts in the sentence above the table are rewritten whole,
and the run re-asks itself afterwards. 29 -> 0.

**And the seven pages that had no table at all now have one.** Every component page keeps the
convention; it was true of 86 of 93, and the seven exceptions were all written at batches 4 and 5.
Placement varies across the corpus (11th of 13 sections on `address-card`, 16th of 19 on `button`),
so there is no rule to derive: a generated section is appended LAST and the file says so out loud
rather than dressing a default as a derivation.

**`split.mjs` - the exception that lived in a comment.** `coach-client-new` carries the client list
and may not carry the two-column frame: the DIALOG is the subject there, and a «choose a client»
panel beside a form creating one is two answers to one question. That case was argued in prose inside
the screen file, where no instrument reads it, so the roll-call was red on a page that is correct.
It is now a declared entry with its reason, and it carries the same idle control every declared list
here takes - proved red by renaming the key and green by restoring it.

**`dupe.mjs` - a declared PAIR became a trio, and the entry earned its keep.** `.wff-col h4` (footer
column heading) and `.wfh-mega .mgt` (mega-menu column heading) were declared as a pair when they
were a pair. `info-page.css` arrived at batch 3 with `.info-toc .tt` - byte-identical to both - and
the group failed the run instead of staying green. **A declared group is a set of claims under test,
not a mute button**; the third site is named, and three identical blocks is where a caps-label atom
stops being a preference.

**`theme.mjs` - it measured one width and said so nowhere.** All three of its `visit()` calls
hard-coded 1280, so «0 зламала тема» meant «0 at 1280». `account-shell.css` puts the active
coach-nav chip's icon and counter on `--text-body`, a PAGE ink role, inside a block that exists only
below 859: charcoal on orange in light and right by accident, near-white at **2.97:1** in dark on a
fill that does not invert, beside a label on the same pill sitting at 5.45. Eleven screens, two
stages of green. The walk now takes both widths and prints the width beside every finding
(`[coach-clients@1280, coach-clients@360]`). It costs twice as long, and the alternative is a verdict
that is true and useless.

---

## `handoff.mjs` - is the handoff a POINTER or a COPY

Stage 13 writes four documents about a product they do not own, and the whole stage stands on one
rule: they REFERENCE rather than duplicate. A component and its variant instead of the css, a token
name instead of the number, an address in `microcopy.md` instead of the sentence a user reads. That
rule was prose for a whole stage, and **a rule stated in prose has no check under it** - which is why
the first draft of `onboarding-gaps.md` shipped two `px` literals that had to be caught by eye.

Six questions, all asked of the whole `handoff/` tree:

- **A** a colour literal anywhere in a handoff document.
- **B** a length in `px`. The registry keeps its widths in `rem` with the token named beside them, so
  a `px` here is by definition a number copied out of a file rather than an address into one.
- **C** a css fragment - a `{ ... }` block, or a `property: value` pair in a code span. `var(--token)`
  alone is NOT one: naming a token is exactly what the stage asks for, and a check that forbade it
  would forbid the cure with the disease.
- **D** a READY INTERFACE STRING - a `«...»` fragment that also stands, verbatim, in the `Текст`
  column of `voice/docs/microcopy.md`. **The threshold is three words and it is declared, not felt:**
  a one-word label is also the NAME of the thing, and forbidding it would forbid naming screens.
  `--strings` prints the dictionary so the subject is visible rather than assumed - 1691 strings today.
- **E** every row of `behaviour.md` names a source, and the source RESOLVES. Three are legal and
  there is no fourth: `design/<name>.html`, `flows.md · <node id>`, `pages/<cluster>.md`. A row with
  an empty source is only a finding if it is ALSO absent from the «НЕ ВИРІШЕНО» list, because that
  list is where a sourceless row is supposed to go.
- **F** the roll-call: flows in `flows.md` = described in `behaviour.md` + named as deliberately-not.

### Three verdicts, not two

`0` asked everything and found nothing · `1` found something · **`2` could not ask.** The third exists
because E and F have no subject until `behaviour.md` is on disk, and the first writing of the exit
line let that run hand back **0** - a clean bill from an instrument that had not looked at anything.
That is this repository's own sentence, «a zero from an instrument that cannot see the class is not a
zero», caught inside the file written to enforce it.

### Two wrong versions, both found by running it

- **C recognised a declaration by its COLON**, so its first catch was `wip: true` - a row of the
  roadmap registry, written about in prose, in a document that holds no css at all. A rule whose
  first find is a false one teaches the next reader to scroll past it. A css property either carries
  a hyphen or is one of the thirty-three bare words listed in the file; `data-` and `aria-` are
  attributes, not properties.
- **E asked EVERY table in the file**, including the legend that explains the three sources. It
  reported ten rows whose sources do not resolve - «Answers», «Section», «F1» - none of them about
  the product. A spec table is now recognised by its header row ending in `Source`.

All six have been shown to fail: a probe file carrying two colours, three lengths, three css
fragments and one copied sentence raised exactly those, and left `wip: true`, `data-theme: dark`,
`var(--bg-action)` and a one-word label silent. A probe table with an empty source, a screen that
does not exist, a flow id that is not in the diagram and a missing IA cluster raised all four.

---

## `map.mjs` - what a screen is made of, and what moves when a token changes

Stage 13, step 3. It builds the map of correspondences and then TURNS IT OVER, and the turning is the
point: «if I change this token, what goes with it» is the question no page of the kit answers.

Four links, each taken from exactly one source: screen -> components from the rendered DOM,
component -> tokens from `var()` in its own css, role -> primitive from the semantic block in both
themes, screen -> zones from the `Зона` column of that screen's section in `microcopy.md`.
`--write` emits `handoff/docs/map.md` from those numbers, so the document and the instrument cannot
disagree; `--token --bg-action` answers for one name in a second.

### Why the reverse list opens in TWO knees, and sometimes three

**A component never reads a colour primitive.** Measured: `--orange-500` has 0 readers in
`components/` and 6 inside `tokens.css`. A one-knee inversion - token to whoever names it - would
therefore have reported the ENTIRE primitive layer as dead, which is the shape of an instrument error
rather than a finding. The chain is component -> semantic role -> primitive.

**And a primitive can be read by another primitive**, which the two-knee rule does not cover:
`--grid-col-fluid` is a `clamp()` whose floor is `--grid-col-min-narrow`. A walk that only knew
role -> primitive called the floor dead. The primitive layer is closed transitively first, and only
then handed to the roles.

### Three wrong versions, all found by running it

- **The walk read the document AT REST**, so `cat-overlay.css` came back «on no screen at all» when
  it is the mobile catalogue overlay and renders on every one. Same class as `steps.mjs`: a component
  behind a click is invisible to a reader that never clicks. It now sweeps every opener the page
  declares - **3679 calls over 141 screens**, one dropped because it navigates away - and the at-rest
  and after-sweep sets are held apart.
- **Twelve screens came back «`microcopy.md` does not know this name»**, and eleven were dialog STEPS
  whose strings are authored in the shared sections of cluster 0. A state screen now inherits its
  base screen's zones, and the inheritance is printed rather than assumed: 130 with a section of
  their own, 11 inherited.
- **The IA node was matched by the FIRST prefix rather than the longest**, so `account-addresses-add`
  matched `account` and half the address book was filed under node 7.0 instead of 7.5. A prefix match
  without «longest» is a guess wearing a lookup.

### The idle control, in both directions

A role no component reads · a primitive no knee reaches · a component on no screen · a component with
no class of its own · a screen `microcopy.md` cannot answer for · a screen that did not open. Stage 08
asked the dead-component question BEFORE the roll-out and the answer could have changed under it, so
it is asked again here over the whole product with the panels open. The two registry breakpoints are a
declared exception with its own reverse check: `@media` cannot read a custom property, so they have no
reader by construction, and if either ever gains one the run fails rather than excusing it.

---

## `headings.mjs` - one reachable `h1`, and a ladder with no missing rung

Stage 13, step 4. It exists because the accessibility checklist may not carry a row whose way of
checking cannot be named, and one row had none: the roll-out's class 8 reported in PROSE that
`coach-client-edit` and `coach-client-edit-confirm` have no accessible `h1` - the only `h1` on those
screens sits inside the inert backdrop behind the dialog - and nothing could re-ask it. Asked
mechanically, that class is **17 screens, not 2**, and the whole answer is **35 of 141**.

Three questions, all of the rendered DOM: exactly one `h1` a screen reader can reach (not
`display:none`, not `visibility:hidden`, not inside `[inert]`, not inside `[aria-hidden="true"]`); a
ladder that skips no rung; a heading with no text, which is worse than no heading because it occupies
a rung and says nothing.

### It reads AT REST, and that is the opposite of what `map.mjs` does

The first writing swept every opener the page declares, the way 13.3 had just taught, and immediately
reported **two** `h1` on `cart` and on `index`: the sweep opens every dialog at once and the auth
dialog brings its own heading. That is not a state any reader is ever in.

The cure is the corpus itself. This product models a state as its own DOCUMENT - `coach-client-edit`
IS the screen with the dialog open, `auth-code` IS the dialog on its code step - so every state that
matters is already a page at rest, and opening things on top of one manufactures a state the product
does not have. **«How many `h1` can a reader reach at once» is a question about one document in one
state**, and «which components stand on this screen» is not. Two questions, two walks, and the same
sweep is right for one and wrong for the other.

### What it found

**35 of 141 with no reachable `h1`**, in three classes: 17 dialog states, 16 loading and error states
whose headings are all reachable but none of them an `h1`, and 2 checkout states with no heading in
the markup at all. **97 of 141 skip a rung**, and that is one cause - the footer's newsletter block
is an `h4` standing directly after an `h2`. **0 empty headings.**

---

## Three flags added at stage 13, and each closed a hole the gate could not see

- **`accept.mjs --text200`** doubles the root font size before the probe. Browser zoom at 200% only
  halves the CSS viewport and the width sweep already covered that; a reader who raises their DEFAULT
  FONT SIZE changes the type and not the viewport, and only a layout in `rem` survives it. Stage 10
  moved the type ramp from px to rem value for value for exactly that reader, and nothing had ever
  asked whether it worked. **142 of 343 screens overflow at 1280, 284 of 343 at 360.**
- **`accept.mjs --root`** moves the subject to the repository root. This gate was written for
  `design/` and had no way to reach anywhere else, so the roadmap pages - `index.html`,
  `voice/voice.html`, `handoff/handoff.html` - had never been measured at 360 by anything. The flag
  changes the base directory and nothing else: same probe, same ten marks, same verdict.
- **`focus.mjs --dark`** sets the theme through the page's own call and **fails loudly if the call
  does not take**, because a page without `theme.js` swallows it in silence and would hand back a
  light reading labelled dark. The file's own opening paragraph says the browser's blue ring is a
  defect precisely because it does not follow the theme - and for a whole stage the instrument only
  ever walked the light one. Both themes now: 33816 controls, 0 and 0.

---

## `clone-test.mjs` - does this repository work for somebody who is not me

Stage 13, step 6. Every other instrument here runs inside the working tree, with the author's paths,
the author's untracked files and the author's habits. Three failures are invisible from in there and
fatal from outside: an **absolute path** to the machine it was written on, a file **eaten by
`.gitignore`**, and a dependency on a **local server** - and half the instruments here raise one, so
a page that only works when served looks fine to all of them.

The test is the plain one: clone HEAD into a temporary directory and open the entry points from
`file://` with no server and no explanation. `file://` is the point - it is the harshest reading of
«works without a build», and anything that survives it survives being served.

**Its first run found what it was written for.** `tools/motion-row.mjs` line 6 held
`/Users/…/Stack sportpit/` typed in as a constant: **that tool had worked on exactly one machine for
four stages**, and nothing could see it, because every check that opened it ran on that machine.

### Three wrong versions, all in the first run

- **An ignored file is not a missing file.** It reported 103 absent, and 100 were `.playwright-mcp/`
  logs - `.gitignore` doing its job, not a package missing a part. The question now goes to
  `git check-ignore` rather than to a guess, and both counts are printed so the filter cannot go
  quiet.
- **A slash-separated enumeration is not a path.** `footer/header/home/product/account` in a playbook
  sentence contains «/home/product/». A path token starts where a word does not: at a line start, or
  after a quote, a space, a bracket or an equals sign.
- **Three kinds of page have three navigation carriers, and it asked all of them for `#sidebar`.** A
  roadmap page carries the panel, the kit carries `#kitnav`, and a product screen carries the
  product's own header and tab-bar and no panel at all. Two «no panel» findings, neither about the
  product: a comparison whose two sides differ in more than the thing measured.

## `nav.mjs` - do the panels know where they are, and do they hold your place

    node tools/nav.mjs [page...]        default: every page with a panel - 37 <aside id="sidebar">,
                                        113 <nav id="kitnav">, 143 from DESIGN_NAV (injected)
    node tools/nav.mjs --full           E over every stand and product page, not a sample

Owner, 25.08.2026: «нажимаєш по сторінці і воно скролить угору, а я хочу щоб фіксувало,
де ти зараз». The panel was marking no active stage and drawing none of the sections its
pages declare - **33 findings across 37 pages**, and nothing had ever asked.

Three questions, and the third is the one that made the other two invisible:

- **A** every page in `/_nav.js` that carries the panel marks its stage active
- **B** a page that declares `NAV_SECTIONS` renders exactly that many links
- **C** ...asked over `file://`, **the protocol the package promises**

**C is the whole reason this survived.** The cause was one side of a prefix comparison keeping
its percent escapes while the other was decoded, so a checkout folder with a SPACE in its name
never matched. Served from `/stack/` there is nothing to escape and the panel is perfect, so
every check that has ever run against a server was structurally unable to see it. `clone-test.mjs`
does open these pages from `file://` and passed - it asks whether a page OPENS, not whether the
page knows where it is. **Two instruments on the same protocol, and neither asked this question.**

### D and E, and the second report that produced them

Owner again, same day: «боковая панель обновляется вместе со страницами и снова наверху». A and B
ask what the panel SAYS, and the panel was saying it correctly while throwing away where the reader
stood. So the subject widens from `#sidebar` to **both** panels of the repository - A and B stay on
the roadmap registry, D and E ask everything that has a panel.

- **D** the current row is INSIDE the panel's own scroll box
- **E** and the place survives a CLICK, asked over a real navigation
- **F** the three copies of the mechanism have not drifted apart

**And the subject took a third widening, which is the lesson of this instrument.** The panel the
owner was actually reporting is `.uiv-side .us-nav`, the product's own screen navigator - 143 screens
on every coloured screen. It is **injected by `uivBar()` at runtime**, so no `id=` for it exists in
any html, and a subject built by grepping markup was structurally blind to it through two whole
passes of fixing the wrong panels. It is discovered from `DESIGN_NAV` now, the registry that declares
it. **A subject assembled from one kind of evidence cannot see what the product builds another way.**

**F exists because the mechanism lives in three files and cannot live in one:** the root pages do not
load the design system, the product screens load nothing from the root. So the bodies are identical
to the character, the arguments differ, and F compares them normalised for whitespace (one of the
three sits inside an IIFE). Proven red by changing `/ 2` to `/ 3` in one copy.

**E is asked as a DIFFERENCE between a hot and a cold arrival at the same page**, and that is the
only form that needs no tolerance. A panel that keeps your place cannot land where one that ignores
it lands - whatever the number is.

Eight wrong versions, kept:

1. **It served the pages over http**, because every other browser instrument here does. Clean
   sweep on broken code. A check whose transport differs from the promise is not a check of it.
2. **It called any zero a failure**, which fails `index.html` legitimately - the root is not a
   stage. The root is an explicit case with its own expectation now, not an exemption that
   swallows a class.
3. **It reported 37 findings having measured nothing**: `newSession` returns a session OBJECT and
   `visit` returns a STRING, both learned by reading `accept.mjs` rather than guessed. A transport
   error landing in the same list as a real finding is worse than a crash.
4. **E parked the target row in the CENTRE of the box.** It passed on the broken rail, and it had
   to: the code it was meant to catch was `scrollIntoView({block:'center'})`, which centres that
   same row by itself. **A check whose expected value is what the defect already produces is not a
   check.** The row is parked just inside the TOP edge now.
5. **E parked the LAST row of the rail.** At the ceiling, «centred» and «parked» are within 56px of
   each other, and a check that cannot tell 3205 from 3261 says nothing about a 300px defect. It
   takes the row nearest the middle of the content.
6. **E compared the landing offset with the number it had parked**, and called a legitimate
   correction a lost place. The two pages do not draw the same panel - the current row carries its
   own sections with it - so an offset that showed a row on A can hide it on B, and the honest
   211px nudge that follows sits right beside the 300px defect. Hence hot-versus-cold.
7. **It printed «0 findings, exit 0» having opened nothing.** `node tools/nav.mjs $SUB` in zsh
   passes the whole variable as ONE argument, nothing matched, and an empty subject read as a clean
   sweep. This is the shape `CLAUDE.md` bans by name, arriving inside the check written to enforce
   it. An empty subject is louder than a finding now and exits 2.
8. **It ran D over a corpus typed from memory.** Three of the ten names carried no roadmap panel at
   all, and the 113 pages of the stand - where the owner was actually standing - were not in the
   list. The subject is read off the markup of the whole tree, both ids, and both counts print.

Proven red before it was believed, three times. A, B, C: against the pre-fix `_nav.js`, **33
findings on 37 pages**, exit 1. D, E on the roadmap and the stand rail: same instrument, same eight
pages, same six pairs, **6 findings and 0 after**. D, E on the product navigator: six screens, **10
findings** - five current rows outside their box (`coach-home` at 1779..1813 in a box of 717) and
five places lost to a click - **and 0 after**. F: one character changed in one of the three copies,
one finding, exit 1.

Three skips are reported rather than counted as passes, because passes they are not: a panel that
FITS lands at zero however you arrive (there is no place to keep); a link that leaves the panel
corpus entirely; and a link that steps between two DIFFERENT panels - «Розкотка» opens the product
from the roadmap, and two panels keep two keys, so there is no offset to carry. That last one was
itself a wrong version: reading the roadmap's box on a page that has the product's reported «панель
немає» as though the panel had failed.
