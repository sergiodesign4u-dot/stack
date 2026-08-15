# Backlog - what the sweep of system against product left open

Stage 08, step 6. Page: `design/kit/backlog.html`.

This file is the output of the step the pack calls **«звід системи з продуктом»**: three lists,
taken by walking the whole corpus in a browser after the system was built, against the same walk
taken before it. It is not a table of opinions - every line below has a number behind it and an
instrument that will reproduce the number: `node tools/census.mjs`.

## The instrument had to be built first, and that is finding zero

Step 1 produced `census.md` - 22 229 observations over 180 screens - and closes with its own
sentence: **«the script is the artifact, not the table»**. The script was not kept. Only
`btn-census.json`, which is the result. So «два заміри одним приладом» was impossible until there
was an instrument, and rebuilding one from memory is exactly the hand fix this repository bans for
tools as loudly as for pages.

`tools/census.mjs` is rebuilt from the METHOD as `census.md` states it: two viewports (390 and
1280, because the desktop header and the mega menu do not exist at mobile width), in a browser and
never by grep (the header is injected by `_nav.js` and is not in the markup at all), computed
style rather than the written rule, and the control test verbatim - `a` / `button` / `label` /
`[role=button]` / `[onclick]`, **or** an element that INTRODUCES `cursor:pointer` its parent does
not have.

**What is not reproduced is said rather than tuned.** `census.md` folds its boxy controls into 24
forms on four axes and excludes chips, tabs, thumbnails, pagination and fields from the action
family - by a list of classes that lived in the lost script and appears nowhere in the prose.
Tuning until the numbers matched a published table would prove only that they can be tuned.

## The corpus, and the number that changes what any earlier census is worth

| | static walk | with panels opened |
|---|---|---|
| loads (screen x width) | 460 | 460 |
| panels opened first | – | **11 946** |
| clickable observations | 35 714 | **63 154** |
| boxy controls | 7 118 | **14 896** |

**43% of the product's clickable surface is behind a state**, and a walk that only reads what is
already painted cannot see any of it. That applies to step 1's own 22 229 as well: it was taken
statically, which is the honest reason the two measurements do not reconcile arithmetically.

## List 1 - product to system

**Nothing is missing from the system.** Every control that renders in the grey layer either has a
component, or lives on a screen that has never been coloured.

Two candidates came back and both were on `wireframes/overview.html`, the hub that LISTS the
screens rather than being one - `flowlink` and `sm-item`. The hub is excluded by the same line
already drawn through `kit/` and `concept/`; CLAUDE.md draws it by name.

**22 controls are tirage, not gaps** - every occurrence sits on one of the 54 grey-only screens:

`addr-save` (4 screens) · `bsearch` (3) · `uachip` · `bcard` · `chub-goal` · `chub-cat` · `thumb` ·
`ttl` · `read` · `cert` · `moz` · `cta` · `rev-google` · `q-exit` · `sc-goal` · `sc-chip` · `clr` ·
`ov-row` · `ov-cb` · `ov-prod` · `ov-chip` · `ov-all`

They close when their screens are coloured, which the roadmap already parks after stage 09.

## The scope was missing on 23 screens, and it changes what list 2 means

Step 7.95 moved eight private stylesheets of the coach flow into
`design/system/components/` and scoped every selector in them: `.coach .qa-row`, `.coach .cnew`,
**360 selector occurrences across 18 files**. The scope class went onto the eleven screens of that
step by hand, on `<body>`.

Nothing else ever put it anywhere. `clone-to-colour.mjs` takes a screen out of `wireframes/`, and
the grey layer has **no body class at all** - 142 files, 142 bare `<body>` tags - so every state
screen coloured at 8.13 and 8.14 arrived without it. On those screens the whole coach layer of the
system is **inert**: not overridden, not losing on specificity, simply never matching.

`tools/scope.mjs` puts the question to the browser as a difference rather than as a name list: add
the class, read the computed style of every element, take it away, read again. **23 screens moved.**

| | |
|---|---|
| coloured screens whose base wears a scope they lack | **23** |
| of them moving 40 or more elements | 9 |
| the loudest - `coach-session-priceblock` | 87 of 1 434 elements, 56 selectors on 87 |

**Which screen a scope belongs to is written in the screen, not guessed.** Every state ends its
script with `wfBar('<base>.html', '<state>')` and every base names itself, so a state wears exactly
what its base wears. The alternative offered itself and was wrong: pairing the scope with
`wfHeader('coach')` / `wfCoachNav(` catches 36 screens and misses three that already carry the
class - `cart-coach`, `coach-landing`, `coach-verify` are coach screens without the coach rail.

**Five more screens move and must NOT be painted**, and they are the evidence that the scope is
load-bearing rather than decorative: `concept/directions` (203 elements from 2 selectors),
`account-orders` (67 from 2), `kit/order-row`, `kit/badge`, `checkout-loggedin`. There `.coach .x`
would collide with an `x` that means something else, which is what a namespace is for. The check
reports them in a list of their own and never writes them.

One screen wears the scope for nothing - `cart-coach`, where no scoped selector bites. **Decided
2026-08-15: kept, and the check stopped calling it a defect** - see item 6. The rule that used it
there moved to a correct guard at step 7.96, and a namespace with nothing to bite costs one class
token, where a namespace missing from one screen costs a class of silent bugs. What the check asks
now is the opposite direction: a screen wearing a scope its base does NOT wear.

## List 2 - system to product, and this is the whole of the remaining work

| | |
|---|---|
| screens carrying a private `<style>` block | **31** |
| private rules in total | **1 154** |
| of them redrawing a class the system already owns | **886** |
| of them declaring something that exists only there | **210** |

**«Overriding» was measured as «the system owns this class too», and on the coach state screens
that was not the same thing** - until 2026-08-14 the system did not reach them at all, so the
private block was the only paint on the page rather than a layer on top of one. The counts stand;
the word did not, and the sweep below is what makes it true.

The twelve loudest screens are **all in the coach flow**, which is the primary audience:

| screen | private rules overriding the system |
|---|---|
| `coach-session-addclient` | 74 |
| `coach-session-addempty` | 74 |
| `coach-session-priceblock` | 67 |
| `coach-session-oos` | 65 |
| `coach-session-loading` | 64 |
| `coach-session-newclient` | 52 |
| `coach-home-empty` | 44 |
| `coach-home-free` | 39 |
| `coach-tariff-cancel` | 34 |
| `coach-order-error` / `coach-order-loading` | 33 each |
| `coach-clients-cap` | 30 |

**This list is not cosmetic debt, and one measured defect proved it - though not for the reason
first written here.** `coach-session.css` answers the phone with `@media (max-width: 479px)`:
`.qa-row` stacks, and the action takes the whole second line. The base screen reads that and passes
at 360. The four state screens did not, «Додати клієнту» hung 10px past the viewport, and
`html{ overflow-x: hidden }` CLIPPED those 10px rather than scrolling, so the right edge of the
button could not be reached at all. `node tools/accept.mjs 360` returned **4 failures over 204
screens**, all four that page.

**The cause written here was wrong, and the wrong cause is kept because it is instructive.** It
said «a private block wins over a linked sheet». It does not: `.qa-row` is one class and
`.coach .qa-row` is two, so the system already outranked the copy. The rule never matched, because
the page was never inside `.coach`. **Specificity was blamed for what a missing scope did**, and the
sentence was plausible enough that nobody asked the browser.

Fixed 2026-08-14 by `tools/scope.mjs --apply`. `accept.mjs 360` now returns **0 over 205 screens**.
The private `.qa-row` copies are still on those pages and now lose to the system on every
declaration, which moves them out of «overriding» and into the inert set below.

**And it is why stage 10 cannot start on top of this.** The product carries 222 media blocks: 170
in the system and **52 in the private blocks of these 31 screens**, adding 7 boundaries of their
own on top of the system's. A responsive scale cannot consolidate what does not live in the system.

## List 3 - a class nobody wears

**Zero dead classes remain.** Six were deleted by the owner on 2026-08-14; the seventh was an
error of the instrument.

Two further buckets are named rather than counted, because neither is a defect:

- **30 classes behind a state the walk cannot reach.** A script writes each of them, so they are
  live. The walk calls every `open*` / `toggle*` global, but it cannot SCROLL (`stuck` and
  `pdp-stuck` in pdp-tabs, `uiv-scrolled` in the header) and it does not advance a flow past its
  first step (`auth-load`, `auth-spin` - the dialog after submitting). This is a named limit of
  `census.mjs`, not a hole in the system.
- **43 classes waiting for their screen.** Worn by the grey layer, with no coloured twin yet -
  mostly `system-page.css` (16), `cookie-banner.css` (15) and `account-shell.css` (10).

### The instrument was wrong four times, and every error had the same shape

Each answered a question NEXT to the one being asked, and each produced a plausible number:

| reported | actual cause |
|---|---|
| **962** dead classes, `coach` and `wfh` among them | the map was built from CONTROL rows, so «never worn» meant «worn by nothing clickable» |
| `svg` `jpg` `png` `html` are dead component classes | they are the tails of `url(../../visuals/…jpg)` and `a[href="index.html"]` |
| 12 classes of `cat-overlay.css` are dead | nothing had OPENED the overlay - `census.md` withdrew this exact finding once, about `.tbuy` |
| `menu-pop` is dead | `design/system/menu.js:39` sets it at wire time and CSS hides it until it opens; the collector skipped `display:none` |

The fourth cost a 35-minute walk twice over: the correction was announced before it was verified,
the patch had not applied, and the re-run produced a byte-identical record - 1518 distinct classes,
50 417 total, in both files. **The identity is what exposed it.**

### Deleted 2026-08-14, and what each deletion cost

Two were lint, one was free, three removed a designed state. The reasoning of the three is kept
here verbatim so re-adding any of them is one line of CSS and a paste.

**`.only-mobile` / `.only-desk`** (`account-shell.css`, 6 rules including two 860 media blocks).
Lint: 0 wearers on 141 grey screens and 87 coloured ones. This CLOSED a question `account-shell.html`
had held open since step 5 - «два імені є тільки в css і в жодному html. Або утилітний файл, або
видалення». The page's note «three different breakpoints for one thought» is now two: 860 left
with the utilities, and the scale of boundaries is stage 10's subject.

**`.field--err`** (`field.css`). Free: the selector read `.field--err, .field.err`, and the measurement
ended the argument written above it - the runtime writes `.err` and something wears it, the tidy
name is worn by nothing. **No declaration changed.** The state fires exactly as before.

**`.certthumb--pending`** (`cert-thumb.css`, one declaration). *What the system can no longer say:*
«this certificate is claimed but not yet on file». Verbatim:

> пунктирний край, без мітки «PDF», без печатки, без підйому - документа на партію ще немає.
> Аркуш лишається аркушем, але нічого не обіцяє: ні файлу, ні натиску.

**`.qans--wait`** (`qa-item.css`, one rule). *What the system can no longer say:* «the shop is
preparing an answer». Verbatim, including the five anatomy notes and the 390 measurements:

> Питання чекає на відповідь днями, і саме таким його бачить більшість читачів. Досі пару можна
> було намалювати лише завершеною: `.qans` це магазин, який говорить, а мовчання вигляду не мало
> зовсім.
>
> 390 на `product.html`: обидві коробки 358 завширшки, поле 12 з чотирьох боків, відступ 8 згори,
> радіус `0 8 8 0` · очікування 46.4 заввишки - рівно стільки, скільки коротка відповідь.
>
> 1. **Модифікатор, а не друга коробка.** Рядок мусить стояти рівно там, де стане відповідь: коли
>    вона прийде, коробка виросте вниз, і більше в парі не зрушить нічого.
> 2. **Чорнило** - `--text-secondary` замість `--text-body`. Список гортають у пошуках відповідей;
>    рядок тим самим чорнилом, що й відповідь, заводить око в коробку, де нічого немає. Це примітка
>    про відповідь, а не відповідь.
> 3. **Грань** - `--line-strong` замість `--line-action`. Помаранчева грань - єдине місце системи,
>    де акцент носить лінія без кнопки поруч, і дозволено це тому, що вона позначає голос. Голосу
>    тут ще немає, тож грань відступає до того самого чорнила, яким `.empty` малює свою рамку.
> 4. **Не `--line-hair`.** На поверхні #FAF9F7 грань #E9E7E2 це 2px нічого; #D9D9D9 ще читається як
>    шов. Заміряно на обох.
> 5. **Ні курсиву, ні пунктиру, ні дати.** Курсив - другий типографічний регістр заради одного
>    рядка. Пунктир на 46px висоти читається як обрізок, а не як рамка.

**`.tsx--unproven`** (`trust-strip.css`, the class plus two `:not()` that were always true).
*What the system can no longer say:* the difference between a proven trust signal and an unproven
one - and «trust first» is design principle 1. **Not one tile moved**: 290 x 66.38 tile,
38 x 38 icon box, 308 x 283.5 strip at 390, to the hundredth, the same figures measured when the
exception was added. Verbatim:

> другий рядок каже «на цю партію - уточнюємо», наведення не спрацьовує - сертифіката на партію ще
> немає. Смуга не знімає обіцянку, вона перестає вдавати, що вже її довела. 7.72: «роль - це
> обіцянка про те, що робить контрол». Там, де за плиткою документ, підйом хоча б вказує на щось
> справжнє; на «уточнюємо» за ним нема нічого.

## The migration was attempted, measured, applied and reverted - and that is the record

**262 of the 1 185 top-level private rules measure as inert** - 215 matching no element on their
own page (clone residue: `clone-to-colour.mjs` copies the full screen's block into its empty and
loading states whole) and 47 matching elements without moving a single value. `coach-order-loading`
alone is 37 of 42.

**The cut was applied and then reverted, because the proof caught it.** `tools/tree-diff.mjs` -
git archive the reference into its own tree, serve both, one Chrome, compare the computed style of
every element on 40 properties at 390 and 1280 - found **9 movements on 5 screens**:
`coach-clients-cap`, `-empty`, `-error`, `-loading` and `coach-home-loading`. At 390 a rail link
turned **orange** (`rgb(242,240,237)` to `rgb(255,90,0)`); at 1280 the page grew 555px.

**The cause is the method, not a bug.** The probe tested each rule ALONE, with every neighbour in
place, which answers «is this rule redundant GIVEN all the others». **Inertness is not additive.**
`coach-clients-cap` held both `.acc-nav` and `.acc-link[aria-current="page"]`; neither alone changed
anything, and losing both turned the rail into the mobile chip strip whose current chip
`account-shell.css` paints with `--bg-action` under `@media (max-width: 959px)`.

Two corrections went in and both are right: the walk is cumulative now, against a **full-document**
snapshot (a rule restyles only what it matches, but LAYOUT travels - a parent grows with its child
and is not in the selector), and the set found at one width is re-offered at the other, because
their **union was never tested anywhere**: 390 may clear {A,B} and 1280 {A,C}, and {A,B,C} is a
configuration no browser was asked about.

**They did not close the gap.** The probe still clears rules the fresh page does not. The remaining
difference is between MUTATING a loaded document and LOADING one without those rules - the page's
own scripts have already run and have reacted to what they saw. That is a hypothesis, not a
measurement, and it is written here as one.

**So the deletion waits for a probe that can be trusted, and the proof stays the gate.** The
measurement is not wasted: the 262 are identified, the two kinds are separated, and
`tools/tree-diff.mjs` will name any page a future cut moves, at any width, to the element and the
property.

## What step 6 still owes

1. ~~**36 controls wear `btn` with no rank and render as bare text.**~~ **Closed 2026-08-14.**
   `button.css` has no `.btn` rule - the finish IS the rank - and `clone-to-colour.mjs` matched
   `class="btn"` and `class="btn dark"` as whole strings, so every button carrying a utility class
   beside them slipped through: `btn qa-add` (14), `btn cs-save` (7), `btn dark cs-go` (6),
   `btn dark co-new` (3), `btn dark cgo-btn` (2), and four more, over 13 screens. Same family as the
   8.13 lookahead: a pattern tight enough to be right about the case in front of it and wrong about
   the set.

   **The rank came off each screen's base and was never chosen by hand**, which mattered: the grey
   layer marks `cs-go`, `co-new` and `cgo-btn` as `dark` - its word for a primary action - and the
   coloured bases had deliberately made all three `btn--outline` at 7.95 and 8.7, because a screen
   carries one accent fill and these were not it. Ranking them off `dark` would have put three new
   orange fills into the coach flow and called it a bug fix. **34 of 36 were answered by the base**;
   the two the product could not answer are decided in `tools/btn-rank.mjs` with their neighbour
   written beside them - `cart-coach-empty .cont` takes `btn--outline btn--s` from the buyer's own
   `cart-empty`, and the bar's `.blocked` on `coach-session-priceblock` takes the base bar's
   `btn--accent btn--l`, its `aria-disabled="true"` already being something `button.css` answers.

   The transform now matches `btn` as a **token** rather than as a whole attribute, and hands the
   final say to `btn-rank.mjs`: its own default is a starting rank, not the decision.
2. **Move the 886 overriding rules into their components.** This is the step's own remaining body
   of work and the precondition for stage 10.

   **The inert half is gone, 2026-08-15: 655 of 1 154 private rules removed from all 31 screens,
   and the proof says nothing moved.** `tools/tree-diff.mjs --dir` compared the computed style of
   every element on both widths against the tree as it stood minutes before the cut: **62
   comparisons, 0 elements moved.** That is the same comparison that refused the June attempt with
   9 movements on 5 screens.

   | | before | after |
   |---|---|---|
   | private rules on the 31 screens | 1 154 | **499** |
   | private `@media` blocks | 52 | **19** |
   | bytes inside the `<style>` blocks | – | 67 723 |

   **The old probe measured 262 inert; this one found 655, and the difference is the method.**
   `private-css.mjs` deleted one rule at a time out of a LOADED document and asked whether anything
   moved, which answers «is this rule redundant given all the others» - and inertness is not
   additive. `inert.mjs` decides by LOADING the page without the rules, tries the whole block
   first, and on a failure halves it and offers each chunk **on top of what is already proven
   safe**, so every accepted set has been tested as a set. Both readings are then taken again:
   computed style on 85 properties including `::before` and `::after`, and a PNG hash.

   **The shape of the result is the clone transform, not chance.** The states cloned from a
   coloured base give up 88-93% (`coach-order-loading` 38 of 41, `coach-orders-loading` 28 of 31),
   because `clone-to-colour.mjs` copies the base screen's whole block into a state that does not
   contain most of the elements it paints. The states with an anatomy of their own give up almost
   nothing: `coach-verify-tier` 2 of 27, `coach-home-loading` 1 of 19, `coach-home-error` 0 of 5.
   **The 499 that remain are the honest subject of this item** - what is left is either a real
   override to move into its component or one of the 210 local declarations of item 3.

   **The count nobody has re-taken is 886.** It was measured as «the system owns this class too»,
   before the scope fix made the system reach these screens at all, and 655 rules have since left
   the corpus it was taken over. It is not restated here as a smaller number, because that number
   would be arithmetic rather than a measurement.
3. **Decide the 210 local declarations**: a component each, or a deletion each.
4. ~~**105 dead `class="dark"` in `design/*.html`** - no stylesheet in the coloured layer defines
   `.dark`.~~ **Closed 2026-08-15: 105 removed from 57 screens, and nothing moved.**

   **Measured before it was touched, and the measurement is what made it safe.** All 105 sat on
   controls that already carry a `btn--*` rank, so the word had been superseded rather than
   forgotten. `wireframes/_wf.css:583` declares `.btn.dark`; nothing under `design/` declares
   `.dark` at all - the mentions in `tokens.css`, `button.css` and `filter-sheet.css` are comments
   recording that it used to matter, and `design/kit/_page.css` has `.kp-demo.dark`, which is the
   stand's own demo canvas and not this class on a product control. No JS reads or writes it
   either: every `dark` in `design/_nav.js` and `design/system/theme.js` is the THEME mode string.

   **The fix is in two places, and one of them is the transform.** `clone-to-colour.mjs` reads
   `dark` to decide whether a cloned control starts as `btn--accent` or `btn--outline` and used to
   carry it into the result - so `dark` is INPUT to the transform and is now dropped from its
   output. The sweep of what already shipped lives in `btn-rank.mjs`, which owns button class
   attributes in `design/*.html`, **and it runs after the ranks are written**: a control arriving
   as `btn dark cs-go` is unranked, so a sweep placed before the ranking would leave the dead word
   behind and need a second run to converge.

   **The guard is what makes it a sweep and not a `sed`:** a `dark` is dead only where a rank has
   replaced it. Anything else wearing the word is listed and left alone.

   Proof: `tree-diff HEAD`, 57 pages, 114 comparisons, **0 moved, 630 rows renamed** - which is
   105 controls x 3 rows (element, `::before`, `::after`) x 2 widths, exactly. `accept` at 360 and
   390 over the 57: 0 failures.
5. ~~**`.cline.oos` dims a whole row to `opacity: .5`.**~~ **Decided and built 2026-08-15, the
   owner handing the look back.** It was a bug after all, and the measurement is what settled it.

   **The number in this entry was wrong, and the true one is worse in the place that matters.**
   Composited against the surface rather than multiplied raw, `rgb(28,28,28)` at `opacity: .5` on
   white is **3.30:1**, not 1.47 - measured in the browser on `cart-oos`, `coach-session-oos`,
   `listing` and `listing-list` at 390, all four the same figure. 3.30 clears the 3:1 non-text
   threshold and fails the 4.5:1 one that applies to what this actually is. The placeholder's 1.97
   was right and does not matter: a placeholder box is decoration.

   **One instrument was doing two jobs on two surfaces**, which is the axis this system splits
   roles by, and only one of the two has a floor:

   | | | |
   |---|---|---|
   | the photograph | decoration, no threshold | `opacity: .5` stays |
   | name and price | ink, 4.5:1 | 3.30 -> **6.84:1** via `--text-secondary` |

   > Variable: how an unavailable product is muted. Value: photograph keeps `opacity: .5`; name and
   > price take `--text-secondary`. Why: opacity changes contrast without declaring a role, and the
   > product name is exactly what a coach reads in order to choose a substitute - the last thing
   > that may go faint. `--text-secondary` is the existing muted-ink role, 265 uses, 6.84:1 on white.

   Applied to all four places that share the meaning, because one meaning may not have two
   treatments: `.ci.oos` (cart-row.css), `.pcard.dim` / `.pcard-l.dim` (product-card.css), and
   `.cline.oos`, which **moved out of the private block of `coach-session-oos.html` into
   `coach-session.css`** where it belongs - one rule off item 2's pile as well.

   **The state was never carried by the fade.** `.ci-oostag` and `.pavail.out` say «Немає в
   наявності» in words, which is what states a state; the fade is emphasis.

   **And measuring after the change caught a mistake reasoning had missed.** `color` on `.prow2` is
   INHERITED, and inheritance loses to any declaration of its own however weak - `.pnew` has one,
   so the grid card came back at 17.04:1, not muted at all, the exact opposite of the fix. The role
   had to land on the price element. The same measurement showed the old fade had also been
   dimming `.cartbtn.notify`, «Повідомити про надходження» - **the one action still possible on
   that card**. It now stands at full strength, which is right: the product is unavailable, the
   notification is not.

   Proof: `tree-diff --dir`, 88 pages, 176 comparisons, **10 moved - the 5 affected screens at both
   widths and nothing else**, every movement either `opacity 0.5 -> 1` or `rgb(28,28,28) ->
   rgb(91,91,84)`. `accept` at 360 and 390 on the five: 0.
6. ~~**`cart-coach` wears `.coach` for nothing.**~~ **Closed 2026-08-15: kept, and the check was
   wrong to call it a defect.**

   **Nothing is broken on that screen, and the answer was already written in the code.** The one
   rule that ever used the scope there was `.coach .ci:last-child`, moved to
   `.cd-group .ci:last-child` at step 7.96 with its reason recorded in `cart-drawer.css`: `.coach`
   was **not a guard**, because every coloured coach screen carries it, so the rule reached
   whatever wore `.ci` anywhere in the flow. `.cd-group` is the true guard - 2 instances on
   `cart-coach.html`, 0 on `cart.html` and `cart-oos.html`. The rule that needed a guard got a
   correct one; the namespace simply has nothing to bite on that screen today.

   **Kept, and the reasoning is asymmetric on purpose.** `cart-coach` IS a coach screen - locked
   product decision 1, the cart with per-client tagging. The scope is written from the base by
   rule, not by hand. Stripping it would leave the single coach screen without the namespace, so
   the next `.coach`-scoped selector would silently miss it - **the 23-screen defect this stage has
   already paid for once**. A namespace that catches nothing today costs one class token; a
   namespace missing from one screen costs a class of silent bugs.

   **`scope.mjs` had been failing the gate on it, and now asks the right question instead.** An
   idle namespace is reported and does not fail. What fails is the direction nobody had been
   asking: **a screen wearing a scope its base does not wear** - a screen claiming a flow it is not
   in. Currently 0.
7. ~~**Two stale records**: `design/overview.html` says 50 coloured screens (it is 87 plus the hub)
   and the step-8.19 note says 41 grey-only screens (it is 54).~~ **Closed 2026-08-15, and the
   entry was stale about itself.** Both had already been corrected in their own files -
   `design/overview.html:283` carries «87 екранів + хаб (46 покупця, 41 тренера), перераховано
   2026-08-14 кроком 6» with the old 50 named as the number that froze at stage 07, and
   `docs/decisions.md` marks the 41 as stale beside step 6's 54. The README stage-07 row was right
   all along.

   **A third one was found in their place, and it was on no list.**
   `design/kit/docs/architecture.md` and its page said «the coloured layer is 40 screens; the grey
   prototype is 142. The 42 coach screens have no colour at all», and then put a scope decision to
   the owner on the strength of it. Both numbers were made false by this stage's own work: 87 plus
   the hub are in colour, and the coach flow has been coloured since step 7.95. The record is
   **noted rather than rewritten** - it is the question the owner answered on 11 August, and the
   answer does not read without it - but a reader arriving today would have taken a settled
   decision for an open one.

   **What the pattern is worth saying out loud:** a list of stale records goes stale. Two entries
   were fixed at the point of the fix and the list never heard, while the record that nobody had
   listed kept its numbers for four days. The lesson is the one already written above about
   `.badge` at 8.19 - a later step makes a number false and the page never hears - and the only
   defence that scales is asking the OUTPUT rather than keeping a list: the count of coloured
   screens has one measurable source, and any page stating a different one is stale by
   construction. That check does not exist yet; it is item 8.
8. **No instrument asks whether a published number is still true.** Every count on the stand was
   right when it was written and nothing re-asks. Three have been caught by hand in two days (50,
   41, 40/42), each by someone reading the page for another reason. The shape of the check is known
   from the ones that already work: take the claim from the page, take the number from the corpus,
   and fail when they differ - `grey-vars.mjs` and `vars.mjs` already do exactly this for values.
