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

| | at step 6 | 2026-08-17 |
|---|---|---|
| screens carrying a private rule | **31** | **0** |
| private rules in total | **1 154** | **0** |
| of them redrawing a class the system already owns | **886** | **0** |
| of them declaring something that exists only there | **210** | **0** |

**Zero.** The last two were one deferred decision, not two jobs - `.cv-card{ max-width: 560px }` on
`coach-verify-error` and `coach-verify-deadend` - and it was taken on 2026-08-17 rather than deferred
again, because the measurement the deferral lacked turned out to decide it. See item 2. The
right-hand column is a re-measurement by the same instrument, not 1 154 minus what left.

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
2. **Move the 886 overriding rules into their components.** This was the step's own remaining body
   of work and the precondition for stage 10. **CLOSED 2026-08-17: 886 -> 3 -> 2 -> 0.**

   **THE LAST TWO NEEDED A DECISION, AND THE DECISION NEEDED A MEASUREMENT NOBODY HAD TAKEN.**
   `.cv-card{ max-width: 560px; margin: 0 auto }` stood on `coach-verify-error` and
   `coach-verify-deadend`, byte for byte identical, deferred in the honest words «whether 560 becomes
   the panel's width is stage 09's decision». What the deferral did not say is that a THIRD screen
   carries `.cv-card` - `coach-verify-loading` - and shipped the other answer: 828px at 1280, with a
   centred headline in a 778px box, while its two siblings centred the same rank across 510.

   There is no selector separating the two that declared it from the one that did not, so the rule
   could not be moved without deciding. It was decided, and written beside the rule as «variable ->
   value -> why»: `.coach .cv-card` gains `max-width: 560px; margin-inline: auto`, because (1) two of
   three declare exactly this, identically, and a rule two screens write the same way is a component
   rule in the wrong file; (2) the system already caps what is inside the card - `.cv-lead` 440,
   `.cv-card.mid .cv-actions` 340 - so a width for the card is what those two caps are already half
   saying; (3) `.mid` MEANS centred, and 828 is too wide to centre in.

   **A/B'd in the live pages at 1280 / 900 / 390**, rule injected and removed: `error` and `deadend`
   byte-identical at every width and every number, `loading` 828 -> 560 at 1280 and 900 with its
   button row wrapping to two lines and the card 52px taller, `loading` identical at 390 because the
   cap never binds there. `scrollWidth - clientWidth` 0 everywhere, both ways. Two of the three
   buttons in that row are the prototype's own demo switches, not product controls.
   **Reversible in one declaration**, and the whole cost of being wrong is 268px on one desktop
   screen.

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

   **The count nobody had re-taken was 886**, and it was deliberately never restated as a smaller
   number: it had been measured as «the system owns this class too», before the scope fix made the
   system reach these screens at all, and 655 rules had left the corpus since. Subtracting would
   have been arithmetic rather than a measurement.

   **TAKEN AGAIN 2026-08-17, BY THE SAME INSTRUMENT ASKING THE SAME QUESTION: 3.** `private.mjs`
   walks the corpus and classifies each private rule by how many homes its classes have in the
   system. Every category is empty except one: **3 rules, one home, `coach-verify.css`** - and they
   are the `.cv-card` set item 3 deferred to stage 09 by decision. There is nothing behind this item
   that is not already behind that one; the two halves of list 2 converged on a single open decision.

   **AND ONE OF THE THREE HAD NEVER DRAWN, WHICH THE SAME RUN FOUND: 3 -> 2.** With the subject line
   fixed, `inert.mjs` walks 3 pages instead of 30 and finished in 42 seconds, so it was worth asking:
   `coach-verify-loading` answered **1 of 1 removable, whole block, pixels identical**. Its rule was
   `.cv-card{ padding: 40px 24px }` and the system writes `.coach .cv-card` - (0,2,0) against
   (0,1,0), so the screen has been rendering `--space-32` since 8.40 took the anatomy over. The note
   above it read «40 is a rung, so the waiting screen's padding is a choice rather than a drift, and
   unmaking a choice is stage 09's call»; the cascade had unmade it a day earlier and nobody asked
   the browser. Deferring that rule was deferring nothing. **This is `.qa-row` from list 2 in
   mirror image** - there a private rule was blamed for winning when it never matched, here a
   private rule was preserved as a decision when it was already losing. Both times the sentence was
   plausible and the reading was not taken.

   **AND ITEM 2 DID NOT CLOSE ITSELF - IT WAS CLOSED BY ITEM 3'S SWEEP, WHICH IS WHY THE NUMBER HAD
   TO BE TAKEN RATHER THAN REASONED.** The split into «886 overriding» and «210 local» was a
   forecast of two different jobs, and the work turned out to be one: a rule copied from a component
   and a rule invented on the screen were answered by the same walk, screen by screen, and neither
   pile could be finished without the other. The forecast was useful and the boundary inside it was
   not real.

   **THE ITEM ALSO PUBLISHED A NUMBER THAT HAD STOPPED BEING TRUE: «31 screens carrying a private
   `<style>` block».** On 2026-08-17 that was still what both walks counted, and it was reading 30 -
   with 3 rules under it. Twenty-seven of those thirty declared nothing at all: 22 carried the note
   left where their rules had been, and **5 carried nothing but the blank lines the rules used to
   occupy** (`cart-coach-empty`, `coach-client-empty`, `coach-session-addclient`,
   `coach-session-addempty`, `coach-tariff-cancel`). The subject line of `private.mjs` and
   `inert.mjs` asked «is there a `<style>` element» where the question was «is there a rule»; it is
   one predicate in `lib.mjs` now, shared, and the report names the note-only pages and the blank
   shells separately so neither can hide inside the other again. The five shells were given the note
   their twenty-two siblings carry, each destination read out of the system by name.

   **AND WRITING ONE OF THOSE FIVE NOTES FOUND WHERE A MIGRATION HAD MOVED DEAD CODE INTO THE
   SYSTEM.** Step 8.31b lifted `#wf-bar{ position: relative; z-index: 80 }` off the two
   `coach-session-add*` screens into `design/_stand.css`, with nine lines on why the stand bar must
   stay above `overlay.css`'s scrim at 55 - «the bar that says WHICH SCREEN YOU ARE LOOKING AT
   disappears under the dimming on exactly the screens whose subject is the modal». The reasoning is
   correct about the grey layer. On the coloured layer the bar has been **`display: none`** since
   2026-08-06, hidden by that same file four lines below the rule, because `.uiv-side` replaced it
   as this layer's chrome; measured 2026-08-17, `getComputedStyle` gives `display: none` and height
   0 on every screen tried. Five more rules were painting it, and `body:has(.cart-drawer) .wf-bar{
   position: relative; z-index: 80 }` was in addition a **verbatim repeat** of the rule above it.
   All six are gone; `display: none !important` stays as the file's one statement about the bar,
   `!important` because the markup writes `id="wf-bar"` and an id outranks a class.

   **A migration that verifies the DESTINATION and never asks whether the SUBJECT renders will move
   dead code into the system and give it a home** - and every gate passes, because the rule is real,
   the values are tokens and the component is the right one. `--text-oninverse`'s use list in
   `tokens.css` lost `.wf-bar` along with the paint.

   **`tree-diff` reported «зрушило елементів 39» on every design page for that deletion, and the
   screen did not move by a pixel.** It reads computed style, and `querySelectorAll('*')` sees a
   hidden element. The arithmetic closes it exactly: the bar's subtree is 13 elements on
   `coach-home`, 12 on `index`, 11 on `coach-tariff-cancel`, times the three rows the tool reads per
   element - 39, 36 and 33, the numbers reported, with no differing row outside that subtree. The
   limit is written into the instrument now, because the next person to delete a rule off a hidden
   element will read the same alarming number.
3. **Decide the 210 local declarations**: a component each, or a deletion each. **CLOSED 2026-08-16,
   except three rules deferred to stage 09 by decision.**
   `tools/private.mjs` splits what is left by how many homes the class has in the system, and the
   first pile - «one home, so every difference is a gap or a resurrection» - is being walked rule by
   rule.

   | | at the start | now |
   |---|---|---|
   | private rules on the coloured screens | 468 | **2** |
   | of them with exactly one home | 157 | **2** |
   | screens still carrying rules (of 88) | 31 | **2** |
   | private `@media` blocks | 19 | **0** |
   | components in the system | 82 | **84** |

   **TWO OF THOSE CELLS DID NOT SURVIVE RE-MEASUREMENT, AND THAT IS ITEM 8'S SUBJECT.** «29 screens»
   and «4 media blocks» were both taken before the last batches of pile 1 and never re-taken: counted
   again on 2026-08-16, the screens were 23 going into this batch and the media blocks **1**. Neither
   was ever a wrong measurement, and both were a wrong published number - which is exactly the class
   `tools/inventory.mjs` was built for and the class it does not yet reach.

   **PILE 1 IS CLOSED, AND SO IS EVERYTHING ELSE.** The two that remained were
   `.cv-card{ max-width: 560px; margin: 0 auto }` on `coach-verify-error` and `coach-verify-deadend`,
   deferred to stage 09 on purpose - and taken on 2026-08-17 instead, once the third screen carrying
   the same class was measured. A third rule stood beside them until that day,
   `.cv-card{ padding: 40px 24px }` on `coach-verify-loading`, and it was not a deferred decision at
   all - it lost to `.coach .cv-card` on specificity and had never drawn. See item 2 for both.

   **PILE 2, FIRST BATCH: THE SKELETON. 20 rules on 5 screens to zero, and no declaration replaced
   them.** `skeleton.css` opens with a census - the bar «written SIX times in FOUR files» - taken at
   7.28 over 40 colour screens. The coach flow entered colour at 7.95, so the census never saw it.
   Counted again over the five coach loading screens, the bar is written **nine** times:

   | | height | radius | ground | where |
   |---|---|---|---|---|
   | `.sk-line` | 13px | 6px | `--bg-sunken` | `coach-client-loading` |
   | `.skln` | 12px | 6px | `--bg-rule` | `coach-order-loading`, `coach-orders-loading` |
   | `.qa-skel .sk` | 12px | 6px | `--bg-rule` | `coach-session-loading` |
   | `.skline` | **10px** | **4px** | **`--bg-sunken`** | the system, and 78 of 84 bars |

   **`--bg-rule` is `--warm-200`, which is `--line-hair`**, so three coach screens were painting a
   skeleton bar in the hairline colour while every other skeleton in the product paints `--warm-100`.
   Measured by `tree-diff`: `rgb(233, 231, 226)` -> `rgb(242, 240, 237)` on 21 bars. The file states
   the answer in one line: «the ground of a skeleton bar is `--bg-sunken` and is stated once».

   **And the rows around the bars were the real component, retyped.** Not a family resemblance -
   the same declarations, side by side: `.sk-row` = `.oc-item` (40 / 1fr, gap 11, hairline),
   `.sk-ph` = `.oc-ph` (40 square, radius 7), `.sk-top` = `.oc-top`, `.sk-actions` = `.oc-actions`
   (gap 9, margin-top 14), `.qa-skel` = `.qa-row` (44 / 1fr, gap 11, padding 9/0), `.skhd` =
   `.ccard-hd`, `.skav` = `.ccard-av`, `.skacts` = `.ccard-acts`, `.skclist` = `.clist` (same grid,
   same 640 flip, same gap), `.skgrp` = `.od-grp`.

   So the answer is not «move these into a component». It is 7.68's rule read to the end - **a
   skeleton is a promise about the box that replaces it, and the only promise that cannot drift is
   the box itself.** The markup on those five screens now wears `.ocard`, `.oc-item`, `.oc-ph`,
   `.ccard`, `.ccard-hd`, `.ccard-acts`, `.clist`, `.od-grp`, `.ord`, `.qa-row` - the real thing,
   standing empty, with `.skline` inside. `.skpulse` was already this shape and says so in the file:
   «the container is usually a real component».

   **Exactly two declarations were added, and both were written twice already.** The button
   placeholder (`.sk-btn` 38 x 120 and `.skacts i` 38 with `flex: 1`), both 2px short of the
   `btn--s` they stand for, whose `min-height` is `--size-40`; and `.load-note`, the sentence under a
   skeleton. Plus three rules that read the anatomy the way 8.30's two do: what `.od-grp` and `.ord`
   need when they hold bars instead of their real children, and what a bar needs in a flex row or an
   `auto` grid track - the percentage-of-nothing defect 8.30 measured in the account rail, in its
   second habitat.

   **One of those three rules was written from one screen's markup, and the corpus refused it.** The
   holder rule read `.od-grp:not(:has(.od-grp-h)), .ord:not(:has(.ord-body))` for one draft. Both
   halves of the `.ord` clause were wrong: `coach-cabinet.css` gives `.coach .ord` a padding of its
   own, so it answered a question nobody had asked - and only `account-orders` writes `.ord-body`, so
   the guard would have matched the four **real** order cards on `coach-orders.html`. Same family as
   item 1's `class="btn"` whole-string match. Removed with the reading beside it, and `tree-diff`
   proves the removal: **the six loaded screens these skeletons stand in front of moved 0 elements at
   both widths.**

   **This completes 8.24 rather than reversing it.** That step took `coach-clients-loading` off a
   third skeleton-card name and onto `.skcard`; the same reading one step further says it is not a
   skeleton card at all, it is the client card standing empty. `.skcard` keeps the catalogue and the
   account, where the box that replaces it is a `.pcard` - **naming those is stage 09's, not a move
   this step has measured.**

   **PILE 2, SECOND BATCH: THE ERROR BOX AND THE EMPTY BOX. 26 rules on 7 screens to zero.**
   `empty-state.css` has said since 7.28 that empty and broken are different things, in a sentence on
   its own stand page: «нічого не знайдено» is the result of a person's choice and leads forward,
   «не вдалося завантажити» is our breakage and leads back. **No screen in the coach flow had read
   it.** `.errbox` was worn by exactly ONE screen in the product - `account-error` - and
   `--line-danger-soft` had exactly one use in the whole system: that box's border.

   | box | edge | radius | padding | glyph |
   |---|---|---|---|---|
   | `.err` · `coach-client-error` | 1px solid `--line-strong` | 14 | 40/22 | 32px on `--mark-disabled` |
   | `.cerr` · `coach-home-error` | 1.5px dashed `--line-strong` | 16 | 44/26 | a 60px ring, `--text-secondary` |
   | `.ord-err` · `coach-order-error`, `-orders-` | 1px `--line-hair` | 14 | 44/24 | **none** |
   | `.empty` · `coach-clients-error` | – | – | – | the catalogue's illustrated nothing-here-yet plate |
   | **`.errbox`** | **1px `--line-danger-soft`** | **`--radius-12`** | **48/24** | **`--text-danger`, 34** |

   **Not one of the four carried the danger role** - not a different red, no red at all. Flat grey,
   and on `coach-client-error` the warning glyph sat on `--mark-disabled`, the ink for something
   switched OFF. This is the primary audience in the worst minute of its journey, and the product was
   saying nothing about what had happened.

   With them went what those screens drew by hand: `.err-btns .btn{ padding: 13px 24px }`, a size on
   top of `btn--s` and the same deletion 8.30 made for `.cs-empty .btn`; `.ord-empty, .ord-err` in
   **one selector**, one plate doing two opposite jobs; and `p.lead` on the two client screens, which
   is `.es` under another name carrying **42ch on one screen and 46ch on the other**.

   **And the measure was missing from the box, which is why both screens grew it.** `.emptybox .es`
   is capped at 440 and `.errbox .es` at 420; `.empty .es` had no cap at all, so on a wide column its
   body ran the full width of its holder. Measured at 1280: **660px on `coach-clients-empty`, 726 on
   `listing-error`, 818 on `coach-client-empty`, 982 on `product-error`** - up to a hundred characters
   a line. One declaration, 440, the number the sibling box already carries. `tree-diff` says it moves
   **exactly one element on each of those four screens and nothing at 390**, where the box is
   narrower than 440 anyway.

   **Two screens were given the `⚠️` glyph, and that is a look decision rather than a measurement.**
   Every other error box in the product carries one, and a box the component paints `--text-danger`
   for is a box that expects one. It also keeps 8.15's rule honest: `.errbox` is deliberately NOT in
   the `:first-child` selector, because after this step no error box lacks a glyph, and a selector
   that covers nothing is the same noise as an empty exemption. The reasoning is written at that rule.

   **PILE 2, THIRD BATCH: THE COACH VERIFY FLOW. 32 rules on 4 screens to zero, and the deferred
   three are all that is left of it.** Every name in those blocks was prefixed `cv-` - this file's own
   anatomy, carried by the four state screens while the base carried none of it. Four things it cost,
   and not one is tidiness:

   1. **`.lead` is `.cv-lead` with one word missing.** `coach-verify.css` has declared `.coach
      .cv-lead` since the split - `--fs-14`, `--text-secondary`, `margin: --space-8 0 22px`. Three
      state screens wrote `class="lead"`, a name one word away from the one that would have inherited
      it, so each grew its own: **14px / 13.5px / 13.5px**, three margins, two measures.
      `coach-verify-tier`, which does write `cv-lead`, is the control: it never needed a rule.
   2. **`.cv-lead` had no measure**, so `coach-verify-tier` rendered it **828px wide at 1280** - 93
      characters on one line, on a shipped screen. Same finding as `.empty .es` last batch, same
      answer: 440, the number the product already carries twice. The base measures 444 in its own
      column and moves 4px.
   3. **`h1.cv-h1` at 24/800 Inter.** The heading rank of this flow is the display face at `--fs-30`,
      declared for `.cv-body h1` and `.cv-card h1` - and tier's h1 is inside neither, so the selector
      never reached it and the screen typed its own. **The fourth heading with two faces for one
      rank**, after the cabinet, `coach-orders` and this flow's own states.
   4. **A bare `.btn{ display: block }` on two screens**, third occurrence of the shape after
      `.tier-cta` at 8.29 and `.cs-empty .btn` at 8.30.

   **And the first draft of that fourth line was wrong, which is why it is worth its own paragraph.**
   It said the rule turned the main action's `btn--full` back into a block. The browser said no:
   `cv-cta` is written `btn--accent btn--l btn--full` with **no bare `btn`**, so the rule never
   reached it. Measured on `coach-verify-error` at 1280 before and after, it reached the SECONDARY
   action, and there it was doing real work - the outline button was **510 x 40 with `margin-top:
   11px`**, and the atom alone makes it **203 x 40 with no margin**: a natural-width control glued to
   the bottom edge of a full-width one. So the answer was not to keep a bare `.btn`. Two stacked
   actions are a GROUP, this file already had the class for it (`.cv-actions`, on the dead end), and
   the error screen simply was not wearing it. **A claim that survives one screen and dies on the
   next is what a browser is for.**

   **`text-align: center` came out of the deferred set on purpose.** What stays private is three
   rules - `.cv-card{ max-width: 560px }` twice and `{ padding: 40px 24px }` once - because which of
   the card's answers becomes the panel's is a decision. Centring is not part of that question: it
   splits the four screens on **what they hold** rather than on a value. The waiting screen and the
   dead end centre one message; the error screen keeps its text left because it carries a LIST. So it
   is `.cv-card.mid` in the component, and everything that follows from centring - the disc, the ring,
   the lead, the sub, the note, the action column's 340 cap - follows from it in one place.

   **PILE 2, LAST BATCH: 25 rules on 8 screens, and the pile is closed.** What was left after the
   verify flow was the same three atoms retyped a third time, plus four button paddings.

   **The card, typed out by hand on two screens.** `account-shell.css` declares `.acard` (1px
   `--line-hair`, `--space-16`) and its colour block adds `--radius-12`, `--bg-page` and
   `--elevation-1`. `coach-home-free` and `coach-home-empty` wrote radius **14** and neither the plate
   nor the shadow, and they win on load order. `.ah`, `.ah h3` and `.ah a` are declared there too, and
   all three had drifted: gap 10 against `--space-12`, the caps label on `--text-secondary` against
   `--text-muted`, the link at 12.5 against `--fs-14`. **This is 8.29's `plan-card.css` finding a
   second time, in the same flow** - «THE FACE WAS `.acard`'S, TYPED OUT BY HAND».

   **The pill, twice.** `.cord .co-status` on `coach-home-free` overrode `status-pill.css`'s own
   `.co-status` at (0,2,0) - an 11px/800 pill on `--line-strong` where the atom draws `--fs-12` on
   `--space-4/--space-12` - and the override also cut it off from its `.ok` state. The word on that
   screen is «Доставлено», so the markup takes `ok`: status-pill.css settled at 7.96 that this half is
   the markup's and no stylesheet can write it. And `.cl-oostag` on `coach-session-oos` was
   `.ci-oostag` under another name; the system draws that tag in mono at `--fs-10` on `--bg-sunken`,
   with the reason written beside it, and the copy was 11px/800 Inter on nothing.

   **The empty box, a seventh time - and 8.30 had already removed the sixth from this screen's
   sibling.** `coach-session-newclient` carried the same block `coach-session-empty` lost, in the same
   flow, written in element names (`.ico`, `h3`, `p`) exactly as `coach-client-empty` was. A rename
   map executed on one screen and not on the next, which is the mechanism this item has found in five
   separate places now.

   **Four button paddings, and two of them the system had deleted BY NAME.**
   `coach-clients.css:411` reads «`.cc-cta .btn{ padding: 13px 22px }` DELETED - button.css owns the
   padding», and `coach-client-loading` was still carrying that exact rule. `:332` reads
   «`.ccard-acts .btn` KEPT ONLY ITS `flex: 1`», and `coach-clients-cap` was still carrying all three
   declarations. The third, `.cli .cgo-btn`, declared three things the system already declares in
   three different files - `margin-left: auto` at coach-cabinet.css:477, `white-space: nowrap` at
   button.css:116, and the padding at the atom.

   ### And one fix was measured, found to be a regression, and reverted the same step

   The empty box sets `.ei{ font-size: 0 }` and shows the SVG `marks.js` puts there. The private box
   had no such rule, so its `🛒` was drawn by the font - and `marks.js` does not map `🛒`, `UIV_EMOJI`
   in `design/_nav.js` does. So the moment the component took over, the icon slot measured **259 x 0**:
   the mark was not faint, it was ABSENT. Same seam as `🗑` at 7.13 and `📦` at 8.1, both recorded in
   that file, so the obvious answer was a third row.

   **It cost two shipped buyer screens.** `.ei` is also the slot `design/_nav.js:1566` fills with the
   mascot on `cart-empty` and `cart-coach-empty`, and `'🛒':'cart'` replaced the mascot with a cart
   outline on both - caught by reading the element's own `innerHTML` against the reference tree, which
   is what `tree-diff` counts as an element-count change and nothing else would have shown. Reverted;
   the box takes `📦`, the glyph its three sibling empty states already use. **A third route writing
   into the same element is why a two-map seam cannot always be closed by a row in the second map.**

   **Four of the eight loading screens were not breathing.** `.skpulse` has been in the system since
   7.28 with its own `prefers-reduced-motion` answer, and `coach-client-loading`,
   `coach-order-loading`, `coach-orders-loading` and `coach-session-loading` simply never got it -
   `coach-session-loading` said so in its own comment, «static, motion deferred». All eight now.

   **And one class was dead from the other end:** `.skel` on `coach-orders-loading` is declared by
   nothing, in this layer or the grey one. List 3 asks «which class does no markup wear»; this is the
   mirror question, and no instrument here asks it.

   **Every rule closed so far was a state re-opening a decision its base had already taken**, and
   after 109 of them that is the mechanism rather than a pattern: `clone-to-colour.mjs` reads
   `wireframes/`, so a cloned state arrives carrying the grey layer's answers to questions the
   coloured base had already answered differently. The seven `coach-session-*` screens were the
   clearest case - 31 rules, and `coach-session.css` and `stepper.css` had DELETED all four of them
   with the reason written beside each deletion. One was a live defect on all seven: a
   `margin-bottom: 76px` meant as clearance for the sticky bar, put on an element that is not last
   on the page, so it drew a 76px hole in the middle of the screen instead. Measured 96px between
   `.cs-panel` and `.cs-summ` on the states against 20px on the base; 20px on all of them now.

   **The biggest entry in the pile was not a rule, it was a block.** 48 private rules on the four
   `coach-clients-*` screens were `account-shell.css` retyped by hand - a decision taken and written
   down at 7.95 and only partly executed. It had drifted on five properties (`.acc` gap 20/28
   against 24/32, `.acc-prof` 15/14/13 against 16/12/12, `.acc-tier` 11px against 12, `.acc-link`
   13/15 against 8/16, and `1fr` where the system writes `minmax(0, 1fr)`) **and it cancelled the
   phone pattern outright**: the copy's `.acc-link{ width: 100% }` outranks the system's chip strip
   below 960 by document order, so four cabinet screens showed ONE full-width row where every other
   cabinet screen shows a scrollable strip of chips. Deleted; `account-shell.css` draws it now.

   **This is the change June measured, called a regression and reverted** - «на 390 рядок рейки
   став помаранчевим», recorded above in item 2's own history. That orange is the current chip
   taking `--bg-action`, which is what `coach-home` and `account` have been showing all along. The
   revert was right for its instruments and wrong about the screen.

   **Three exceptions to the mechanism so far, and each is worth its own line.** One was the system
   being wrong (`.qadd-res`). One a genuine gap (`.cnew .cn-tx`). And one - `.cv-card` - was the
   system being right about the screen it was written for and wrong about three it reached, which is
   the expensive kind: it laid the three coach-verify state screens out **in a row** on every
   desktop, and the private rules were the only thing keeping them survivable at 390. Photographed
   before and after; the record is in `docs/decisions.md`, step 6 eighth pass.

   **One rule was dead in a way nothing in `tools/` could see.** A `margin-bottom: 4px` adjacent to
   a `margin-top: 18px` collapses, and the larger wins - the measured gap is 18px with the rule and
   18px without it, while computed `margin-bottom` reads 4px either way. Every instrument here
   compares computed style, so all of them called it alive. What told the difference was reading the
   DISTANCE between two elements; that check is `tools/gap.mjs` now.

   **The `.cnew` card answered differently on its two screens, and that is the case against a
   blanket sweep.** `coach-cabinet.css` had ended 7.98 with a note to whoever came next - «Whoever
   confirms the deletion of the block deletes these eight with it» - after removing the same card
   from `coach-home` for carrying the rail button's words and href. Measured at 390:
   `coach-home-free` said «Нова сесія» to `coach-session.html`, 515px under a rail button saying
   «Нова сесія» to `coach-session.html`, so it went, and accent fills on that screen went 4 -> 3.
   `coach-home-empty` says «Зібрати першу сесію» and carries the sentence 7.98 itself named as the
   empty state's job, so it stayed and its six structure rules moved into the component. **Open, and
   the owner's:** that screen still points two accent fills at one destination with different words.
   Principle 2 says one clear next step; which of the two carries it is a look, not a measurement.

   **The largest single finding was a rename map executed on a base and never carried to its
   states.** `coach-tariff.css` opens with nine numbered items - «TWELVE RULES DELETED, ONE CUT TO A
   SINGLE DECLARATION, ONE MARKUP OVERRIDE REMOVED, TWO RULES WRITTEN» - each with a real reading at
   four widths. `coach-tariff.html` carries it and has an empty `<style>` block. Its two states had
   none of it: the H1's inline override, the bare `.tf-lead`, `.tf-badge` instead of the status pill,
   `.tfov` / `.tfdlg` instead of the system's scrim and dialog, and - item 9 - **`btn--accent` on
   «Скасувати підписку»**, the orange fill on the control that ends a paid subscription, where
   `button.css` settled at 7.61 that «the destructive control is the OUTLINE carrying the danger
   ink». Executing the map reproduced its measurements to the hundredth of a pixel on a screen it was
   never taken on: the dialog «before 350 x 357.53, radius 14 -> after 342 x 428.34, radius 12»
   arrived as 342 x 428.344, radius 12. `coach-tariff-cancel`'s `<style>` block is now empty.

   **The same map turned up on a second flow, and with it a control class the instruments cannot
   see.** `coach-orders`'s three states still wore a bare `<h1>` and a bare `.sub` where 7.96 had
   moved the base to `.acc-h1` and `.sub acc-sub` - the title went Inter 22/800 to Oswald 30/600, the
   face every other cabinet screen wears. And `coach-home-free`'s order rows carried
   `<a href="coach-order.html">Деталі</a>` with **no class at all**, dressed by a private
   `text-decoration: underline` at 12px, where the base draws `btn--outline btn--s` and
   `btn--accent btn--s`. That is item 1's family, and `btn-rank.mjs` walks past it: it finds a control
   «wearing `btn` without a rank», because that is the shape the transform produces, and a control
   wearing NOTHING never enters its subject. **The transform's output got an instrument; its input did
   not.** Written into `tools/README.md` beside the tool rather than fixed by guessing which anchors
   are prose links.

   **A THIRD flow was found wearing two title faces for one rank**, after the cabinet and
   `coach-orders`: `coach-verify`'s base draws its heading Oswald 30/600 inside `.cv-body` and its
   three state screens drew theirs Inter 22/800 inside `.cv-card`. Joined rather than deleted -
   `.cv-card` is not `.cv-body`, so a deletion would have left the three with nothing.

   **And the instrument itself had been handing out wrong homes.** `private.mjs` read every class in
   a selector, so `.loy .lrung.now` registered `.now` as `loyalty-rung.css`'s and a private
   `.cv-steps2 li.now` - a verification checklist - came back as «one home: loyalty-rung.css», which
   reads as an instruction to move it there. Within one compound only the FIRST class names the
   thing now. The reclassification moves rules **both ways** - two files lose a spurious entry, four
   gain real ones - which is what says the old reading was wrong rather than merely loose. None of
   the twelve earlier passes rested on a modifier match; that was checked, not assumed.

   **A third name for the skeleton card, and an anatomy nobody had answered.** `coach-clients-loading`
   drew its skeletons as `.skccard` - radius 14, its own `.skline` tone and radius, its own
   45/68/88 widths against the system's 50/72/90 - while `listing-loading` and `account-loading` wear
   `skeleton.css`'s `.skcard` with no private rule at all. Renamed in the markup, five rules gone.
   And the reason both coach loading screens had grown the same private `padding: 15px 16px` is that
   `.skcard` puts its padding on `.skb` and these two have no `.skb`: the box had no inside. **The
   same number appearing on two screens is a component's answer, not a screen's** -
   `.skcard:not(:has(.skb)){ padding: var(--space-16) }`, and the two screens that DO wrap in `.skb`
   measured 0 moved, which is the whole risk of that guard.

   **The empty state was written in element names on one screen and oversized on another.**
   `empty-state.css` draws its box with `.ei` `.et` `.es` `.eact` and five coloured screens write
   them; `coach-client-empty` wrote `.ic` / `<h3>` / `<p>`, so its whole look came from five private
   rules - including a **solid** `--line-hair` edge where the system draws a **dashed**
   `--line-strong` one, which is the difference between a panel and a placeholder. And
   `coach-home-empty` had shrunk the full-page `.emptybox` privately to fit inside `.acard`, where
   the component already offers **`.emptybox.mini`** and `account-empty` takes it for exactly that
   reason. Both fixed in the markup; ten private rules gone, and `coach-client-empty`'s `<style>`
   block is now empty.

   **At the tail of the pile the verdict starts being true about a NAME and wrong about the object,
   and the instrument was not printing its grounds.** «One home» means the class is declared in
   exactly one component - but `buy-box.css` declares `.bb .tier`, a wholesale-price badge inside the
   buy box, while `coach-verify-tier`'s private `.tier` is a whole plan card. **Three of the last
   eight homes were that shape** (`.bb .tier`, `.acc-prof .av` against a skeleton's `.sk-prof .av`,
   `.goalcta .hint` against `.cs-empty .hint`). `private.mjs` now prints the selector that produced
   each home, so a wrong one reads as wrong in a glance. Same repair `tree-diff` got two passes
   earlier: **do not soften the verdict, show what it rests on.**

   **`.ctab.add` was the one rule held back «for a look», and reading answered it.** The note said
   the tab has a bottom edge the base lacks AND a different height, 44 against 90, so it might be a
   deliberate «a tab with nothing under it». `coach-session.css` declares **both** `.coach .ctab` -
   three lines, `min-width: 118px`, `border-bottom: 0`, because the tab joins the panel below it -
   and `.coach .ctab.add`, one row, `min-width: 0`, dashed. So 44 against 90 is the difference
   between the add-tab and a client tab, not between two editions of one tab, and the bottom edge was
   the private rule redrawing `.ctab` from scratch without knowing the system removes it. **The look
   would have seen a tab that looks fine; what answered it was two rules read side by side.**

   **The first component born out of the private blocks.** `.upsell` on `coach-clients-cap` and
   `.tf-upsell` on `coach-tariff-free` were the same panel under two names, and the second one cited
   the first in its own comment - «same shape and same reasoning as `.upsell` on
   coach-clients-cap.html». Two files agreeing in prose while disagreeing in numbers is the
   definition of a component nobody wrote. `upsell.css` is that component, with the full five: css,
   `design/kit/upsell.html`, a row in the stand registry, a line in `inventory.md`, and an
   `@import` into the level-3 coach group. Three values settled (padding 18, ground `--bg-surface`,
   heading `--fs-16`), none moving more than 2px.

   **The second component, and its copy cited the atom by name before retyping it.** `.tier` on
   `coach-verify-tier` and `.tf-col` on the two `coach-tariff` screens are the Free / Pro card in two
   editions: same job, agreeing in prose, disagreeing in every number. Both had also typed out the
   FACE of `.acard` - grand, radius, ground, lift, padding - and `.tier`'s own comment NAMED the
   atom in the sentence above the copy. Read off the running pages at 390 the two were identical on
   all five properties, which makes it re-derivation with the source cited: every value right, every
   token right, and the next change to the product's card reaching one of the two.
   `plan-card.css` is the component; the markup wears `acard` on all three screens; the five
   declarations are gone. **`.tier.pro` and `.tf-col.on` stayed two states on purpose** - one says
   «we recommend this» (accent, an invitation), the other «you are on this» (ink, a statement about
   the account) - and folding them would have put one screen's meaning on the other's.
   Four defects came out with it, all measured: the choose screen's price was set in **Inter** where
   the same figures on the tariff screen are mono (`.tier-price` joins price.css's list, **and so
   does `.tf-price2`, which is my own miss from 8.28** - that pass took the rank and the air and did
   not follow the family); `.tier-flag` was the fifth edition of badge.css's pill and stood 3px
   taller than `.tf-mini` because the copy omitted the one declaration it never wrote, `line-height`;
   the list ticks were typed into the markup as `<span class="m">✓</span>`; and `.tier-cta`'s
   `display: block` had been quietly turning `.btn--full`'s flex box back into a block. Two lists on
   ONE screen had been drawing the same sentence two ways - a tick on body ink above, a middle dot
   on secondary below - and now draw it once. `tree-diff` accounts for all 33 moved elements on each
   tariff screen and 4 renamed rows.

   **The last four rules of pile 1 were four different files, and none of them was a name collision
   after all.** Every one had a real home the census had pointed at from the wrong angle.

   `.sk-prof` on `coach-home-loading` was not «account-shell's `.av`» - it was **15 rules retyping
   the buyer's loading screen**, which carries none. And the skeleton it drew was a promise about a
   screen that no longer exists: 5 stacked rail rows where the phone draws a 48-tall chip strip, a
   48 strip against the real 145.17, an 86px CTA for a block deleted at 7.98, 2 side-by-side boxes
   against 3 full-width cards, and `.skpulse` on no element of the page while every buyer skeleton
   breathes. Its `.sk-spin` said «this was the third edition» in its own comment and never asked the
   next question; skeleton.css answers it - «one slow breath, NEVER A SPINNER».

   **Then the photograph found what every number had passed.** The rewritten screen matched its twin
   on every measurement and the picture was empty - a blank profile card and seven empty pills, and
   the twin had been shipping that at 390 all along. These bars are PERCENTAGES and below 960 their
   containers size to them: `.acc-prof .who` is a flex child with nothing to stretch it, `.acc-link`
   is a chip that sizes to its content. Two declarations on the holders, the inline widths out of
   both markups (an inline style beats any rule a component can write), and `:has(.skline)` so the
   three shipped account screens read **0 moved** rather than «nothing renders differently».

   `.ac-cli` is **radio.css's fifth row-rung name** - picking a client from a list is choosing an
   option out of several - and it gained a hover, a press, a focus ring and the family's chosen
   ground, none of which it had. `.tf-incl li.off` went home beside the tick it is the opposite of,
   and settled the mark 8.29 had got wrong (`\2715`, not an en dash - the dash rule is about dashes
   in TEXT). `.cs-empty` was a sixth private `.emptybox`, the third in this pile.

   After pile 1: 111 local names with no home, 88 multi-component rules, 24 partially new, 2 with no
   class.

   **Pile 2, first block: the ordering session, 138 rules -> 48.** The seven state screens of the
   coach's session carried the largest single block left, and their base carries **no `<style>` at
   all**: the base was migrated and its states never were, the same shape as `coach-tariff` and
   `coach-orders` at four times the size. Three class attributes make the map (`.cc-repeat`,
   `.qadd-field`, `.cl-rm`, plus the field's input), applied by a transform that READS the base
   rather than by six hand edits; fifteen selectors were pure resurrection of buy-bar, client-row,
   price, discount, availability and chip.

   What the states had been drawing instead, at 390: the sticky bar's action **100.50 x 40 against
   243.30 x 64** - under the 44px touch floor, on the control the whole session leads to; «В
   наявності» in **secondary** where availability.css says `--text-success`, on the primary
   audience's trust signal; a struck price in **rgb(170,170,170)**, a grey in no palette; the
   quick-add input drawing **a box inside a box**; goal chips 33.19 tall.

   **And four instruments learned something.** `private.mjs` was reading a NOTE as a selector -
   `withNotes` grows a span over its comment and this repository writes css inside its comments, so
   two rules were misfiled and both notes were the two previous passes' own. `btn-rank.mjs` had never
   asked whether a rank AGREES with the base, and it took three keys to ask it soundly - the slot,
   not the class and not the destination - plus a split that is now a rule: **a size that disagrees
   is a defect, a finish that disagrees is a decision**, and it writes the first and only reports the
   second. Its `--apply` was a string replace that upsized a second control per page, caught by its
   own next run. And `accept.mjs` gained a `dot=` column after a photograph showed **two dots** on
   every availability line: 31 typed marks on seven screens, one of them a buyer screen shipping a
   doubled dot on twelve lines. Third time for that shape, so it is a gate now.

   **Pile 2, second block: the add-client modal, 32 rules -> 0 on the screens.** It is
   `client-dialog.css`'s EDITOR dialog under six other names, and the private copy had built the
   WRONG one of that file's two dialogs from scratch - its own 440px box at radius 14 against
   `.cemodal`'s 460 at `--radius-12`, and a close control that was a bare `<a>` at 19px with no
   hover, no focus ring and no touch target on the modal whose only way out it is. Three moves were
   genuinely new: the picker's scrolling list and its dashed launcher went into the component, and
   `#wf-bar{ z-index: 80 }` went to `design/_stand.css`, where it belongs - every state screen that
   opens a modal needs the bar to stay above a scrim at 55.

   **And the same 27 pixels the tariff dialog measured at 8.7.** «Додати першого клієнта» beside
   «Скасувати» runs 154..387 in a 360 viewport and does NOT scroll the page - the scrim clips it, so
   the right edge of the primary action is unreachable and every gate reads 0. Two dialogs, one
   measurement each, so the stacking rule is the component's now and the tariff copy is gone.

   **The stand page's idle control had been red and nothing was reading it.**
   `kit/client-dialog.html` had been printing «5 named in words, not shown in a demo» for as long as
   it existed - verified against the tree before this pass touched it. `accept.mjs` collects that
   verdict now, using the box's own words rather than a second implementation of them.

   **And the inventory turned out not to be one.** Adding `plan-card.css`'s row showed that
   `inventory.md` lists none of the eight coach components that entered at 7.95 and 8.7, files
   `upsell.css` as a molecule while its own stand page called it level 3, and carries a «Lines»
   column that is a step-5 snapshot - `tabbar.css` reads 25 there and 72 on disk. All three are
   written into the file itself, under the table. The second is the one with a rule behind it: **the
   coach group in `index.css` is a SCOPE group, not a level group**, so any file put there loses the
   one place its level was readable.
3b. **NINETEEN STAND PAGES ARE SHOWING LESS THAN THEIR FILE, and the control that says so had
   never been read.** Opened 2026-08-16 by step 8.31b.

   Every component page ends with an idle control: a box comparing the classes its css file declares
   against the classes its demos actually render, printing «Пройдено» or naming what is missing. The
   box draws in the browser. **No gate had ever collected the verdict**, so
   `kit/client-dialog.html` had been printing «5 named in words, not shown in a demo» for as long as
   it existed - and it was one of nineteen.

   `accept.mjs` reads it now, in the box's own words rather than a second implementation of the same
   check. First run over the corpus: **19 pages red, 179 classes**, and a scratchpad probe sorted
   them **70 JavaScript-written / 109 demos owed**.

   **THE SORTING WAS WRONG, AND IT WAS WRONG IN THE DIRECTION THAT FLATTERS** - step 8.32 refused to
   apply it mechanically and read the evidence line by line instead. The probe asked «does this class
   string appear in a JS file», matching `classList.add` OR `class="x"` inside a script. In this
   repository the second half means nothing: `wireframes/_nav.js` is the BUILDER of the grey
   prototype, so most of the product's markup lives inside JS string literals. Of the 26 classes on
   the seven smallest pages, 23 were `class="x"` in a template string - ordinary markup, which a
   stand can render in repose - and only three were real. The question had quietly become «where does
   this file live».

   `tools/idle.mjs` asks the narrow, falsifiable version: `classList.add|toggle|remove('x')` on an
   element that already exists. Honest census:

   | | first probe | measured |
   |---|---|---|
   | classes a script writes - a state, not a demo | 70 | **9** |
   | classes the page genuinely owes a demo | 109 | **163** |

   **All nine states are closed** (8.32). Each moved into `KIT_STS` with a sentence on its own page
   saying what writes it and why it cannot stand in repose: `dr-lock` and `pdp-stuck` are put on
   `<html>` and `<body>`, so rendering them would dress the STAND rather than the demo;
   `catov-open` lands on the bottom tab, an element that page does not contain; `hidden` is the
   cookie bar's absence; `added` is the trace of an act. `checkout-form` owes **57 of its 93** - the
   stand page for the largest organism in the system shows barely a third of its file.

   **Two more findings came out of building the instrument, both closed:**

   - **The page-side control existed in 74 hand copies, in five editions.** Three differed only in
     where a string wrapped. The fourth - `plan-card` and `upsell` - had the states clause DELETED,
     so those two pages could not have reported an unnamed state if they had one. The fifth was
     `icon.html`, and it held the one rule the other 73 had lost: **measure after the passes have
     run, never at parse time**, because `marks.js` adds `.uiv-trail` on DOMContentLoaded. Now one
     `design/kit/_idle.js`, included once per page, and it also reads into the demo frame - worth
     exactly 4 classes of 162, `toolbar`'s three and `co-wrap`, but a page red for a reason that is
     not true is what this item is about.
   - **`address-card` had two classes parked in `KIT_STS` that are not states.** `.addr-del-row` and
     `.addr-back` are both drawn on that page already; what switches them is the `hidden` ATTRIBUTE
     and `.mode-edit` on the modal, neither of which is these classes. The exemption list now has an
     idle control of its own in `idle.mjs`, narrowed to the only kind that could be parked there: a
     bare identifier the component's own css declares as a class and no script toggles.

   **First five pages closed 2026-08-16 (8.33): `filter-sheet` `overlay` `product-grid` `restock-note`
   `pdp-tabs`, 6 classes.** None of the six was a decoration. `.fsheet-ov` was missing because the
   extractor walked the panel's own tree and the scrim is its SIBLING; `.ceov` had to stand apart
   from `.wf-ov`, since two `position: fixed` scrims on `inset: 0` in one viewport read as one dark
   rectangle; `.oosbtn` had been deliberately taken OFF this page at 7.91 for being drawn under the
   wrong finish, and is now shown where the product puts it, inside `.bb .buyrow`; `.pdp` moved into
   the frame around its own strip, because the strip grows a price at 960 precisely BECAUSE `.pdp`
   moved the buy rail into a second column; and `.ptabs` turned out to be an unrelated tab strip
   sharing a file, which is a stage 09 question.

   **And the first real demo found a live defect on a shipped buyer screen.** `design/listing-list.html`,
   first card: the «★ Популярне» badge overlaps the product title by **10 x 14px at 390 and at 360**,
   clean at 1280. Under 559 `.pcard-l` becomes a `56px 1fr` grid and the photo narrows to 56, but the
   badge inside it is `position: absolute` with no width bound and is 77px wide, so it crosses into a
   text column that starts at 101; `.lph` has no `overflow`. The «✦ Новинка» badge is 13px narrower
   and misses the title BY LUCK, not by a rule. Three remedies were measured before one was chosen -
   clipping the word, ellipsing it, or the photo keeping its 84 - and all three remove the overlap
   at the same card height, 225. **DECIDED 2026-08-16, owner: the photo keeps its 84.** It is the
   only one that keeps the WORD, and it costs 43px of title width and nothing in height: the name
   wraps to two lines either way, so narrowing to 56 was buying nothing visible and paying for it
   with a collision. Written into `product-card.css` with the table.

   **Three more closed 2026-08-16 (8.34): `filter-rail` `auth-dialog` `cat-overlay`, 16 classes,
   and all sixteen were the same shape - a face of the component that does not exist in repose.**
   `.hrail` and its flyout are `display: none` below 960 and `!important`-hidden below 860, so at
   the width the listing rail is shown that whole family draws nothing. `.auth-load` `.auth-spin`
   `.lp` `.auth-note` live only in the dialog's `loading` state and `.auth-alt` only in `error` -
   the panel is rebuilt whole, not re-dressed. `.cback` `.wf-catov-all` `.wf-catov-sub` and
   `.wf-catov-goal` with `.cg` `.gn` live on the overlay's second and third levels, whose body is
   rewritten by a function.

   **None of the five new frames types markup: each one CALLS the product's own builder** -
   `wfHomeRail({open: true})`, `wfAuthGo('loading')`, `wfAuthGo('error')`, `catOverlayCat(0)`,
   `catOverlayGoals()`. A stand that retypes what a builder emits is showing its own copy.

   **And that needed a second instrument extraction.** The frame-fit script was 24 byte-identical
   inline copies, and the copy carried a limit nobody had decided: `querySelector`, singular, so a
   page could hold exactly ONE frame and a second would have sat unfitted at 150px. Now
   `design/kit/_frame.js` with `querySelectorAll`; nothing about the sizing changed. Several of the
   pages left need two or three frames, so this was the blocking piece rather than a tidy-up.

   **Two more closed 2026-08-16 (8.34b): `cookie-banner` and `cart-drawer`, 20 classes.** The
   cookie settings dialog is written by `wfCookie()` together with the bar and stays shut until
   something presses «Налаштувати», so ten classes had no resting form; the frame calls
   `wfCookie(); openCookieSettings()`. The cart's other three faces live on three other screens -
   `.cd-empty` on `cart-empty`, `.cd-oosnote` `.cd-blocked` `.cd-fix` on `cart-oos`, `.cd-group`
   `.cd-note` on `cart-coach` - and **the page BEHIND the drawer belongs to this file too**:
   `.cart-behind` `.cart-ov` `.ph-grid` `.ph-card` are the drawer's siblings, and the whole point
   of `.cart-behind` is that the cart is a drawer over a page rather than a page of its own.

   **Third instrument extraction of the day, and this one found a live class of bug.** The frames'
   boot block - the init list that makes a demo behave rather than pose - was **33 identical
   copies**. Now `design/kit/demo/_boot.js`, with two things the copies did not have:
   - **`FRAME_STATE`, called at one exact point**: after the initialisers, so the builders exist,
     and BEFORE the icon and mark passes, so markup a state builds gets its glyphs. Placed at the
     end instead, a freshly built panel stays in emoji - the defect 7.78 fixed for the toast and
     7.87 for the catalogue overlay, which would have returned by placement alone.
   - **The asset path a builder types by hand.** Four builders in `design/_nav.js` write a
     DOCUMENT-relative `src` into an element they create (`:563`, `:1228`, `:1425`, `:1566`).
     Correct on a screen that sits in `design/`; a frame sits two levels deeper, so the same string
     404s. Found by the empty cart drawing a broken image. `uivFixLinks` solves exactly this for
     `<a href>` and only for those.

   **And an open panel produced a finding bigger than any of these components.** The container of
   every open fixed panel draws **Chrome's default focus ring, `auto 1px rgb(0, 95, 204)`** - a blue
   that is in no palette. 7.85's focus trap sets `tabindex="-1"` on the panel and focuses the
   CONTAINER deliberately, «so it announces the panel's own label and does not preselect an action»;
   nobody ever declared a ring for that container, because the system declares focus per component,
   for controls. Measured on three real coloured screens: `#fsheet` on `listing.html`, `#city-dlg`
   on `index.html`, `#wf-catov` on `product.html`. **DECIDED 2026-08-16, owner: take the ring off the
   container** - `[tabindex="-1"].open:focus{ outline: none }` in `base.css`. Every control inside
   the panel keeps its own `:focus-visible`. **`.open` in that selector is the whole safety of the
   rule:** a bare `[tabindex="-1"]:focus` would have been an accessibility REGRESSION, because
   across 88 screens that attribute is worn by `div.menu-opt` on 87, `label.co-opt` on 15,
   `div.menu-list` on 15, `span.ptab` on 12, `span.vopt` on 10 - roving tabindex, the inactive
   members of composite widgets that arrow keys DO focus and that must keep their ring. None of
   them ever carries `.open`; every panel the trap focuses does.

   **Three more closed 2026-08-16 (8.34c): `header`, `system-page`, `buy-box`, 31 classes.**
   `.mega-pinned` and the scrim's `.pinned` turned out not to be runtime states at all - the only
   things that set them are the four grey `wireframes/megamenu*.html` screens, and `screens.md`
   says why: «`.mega-pinned` тримає відкритим для демо». A class whose purpose IS the demo, shown
   by the demo, is the honest reading. The cabinet menu needed two frames rather than one, because
   `.cab-lvl` is the buyer's loyalty line and `.cab-tier` the coach's plan pill, and one
   `.cab-head` answers both. `system-page` got its 404 and its status page - the first time either
   is seen under `system/index.css`, since none of the four grey screens has a coloured twin.
   `buy-box` got the coach's box from `design/product-coach.html`, nine classes that exist on that
   one screen: retail price and coach price side by side, never one instead of the other.

   **And two of `buy-box`'s eleven were not demos owed but DEAD CODE - list 3, closed by
   deletion.** `.bb .tier` and `.bb .qty` are worn by **nothing**: asked of the rendered DOM on all
   four screens that carry `.bb`, 0 matches, and the grey layer has none either. `.bb .tier` reads
   as an earlier name for the wholesale pill that `.cbtier` now carries, with different
   declarations - a second answer, not a duplicate. Quantity is counted under three other names,
   each in its own file (`.ci-qty`, `.co-qty`, `.oc-qty`), and never inside `.bb`. Deleted with the
   measurement written beside each; `--line-strong` left the file with them and left the page's
   token table the same step, which `roles.mjs` caught.

   **`.tier` is also the string that misled the first sorting probe at 8.32**, because it occurs in
   `wireframes/_nav.js` as `acc-tier` and `cab-tier`. Two instruments misled by one name in a row,
   and both times the fix was to ask the rendered page rather than the source text.

   **The last two pages, 2026-08-16 (8.36): 86 classes -> 11, and `checkout-form` is closed
   entirely.** The biggest file in the system needed eight frames, because it holds eight faces and
   TWO ADDRESSES: the checkout's own stripped chrome (`.co-head` / `.co-logo` / `.co-support` /
   `.co-foot` - no menu, no search, no catalogue, one way out and no way sideways), the logged-in
   and no-address variants, the declined screen with its «order kept» block, the processing screen,
   the profile card `.pfcard` that shares no code with any of it, and two dialogs the profile opens
   (`openProfPhone()` + `profStep('pf-phone','code')` for `.pf-resend`, `openProfDelete()` for
   `.pf-delcheck` - the only place in the product where a destructive act is gated by an explicit
   «I understand»). `account-shell` went 29 -> 11: the shell itself, its loading grid, the coach
   rail's buyer row and the wishlist heading.

   **One class turned out to be in the wrong file.** `.smeths` - the column of social sign-in
   buttons - was declared in `checkout-form.css` and appears in **no markup at all**: the only
   thing that emits it is `wfAuthPanel()`, the auth dialog. Moved to `auth-dialog.css`, both
   declarations byte for byte and each kept in its own block. It sat there unnoticed precisely
   because it has no markup: nothing could ever have pointed at it until this page was asked to
   show a class its own five screens do not contain.

   **AND THE LAST 11 ARE NOT THE ACCOUNT SHELL AT ALL - they are the grey hub's flow map, and this
   is an owner's decision.** `.wt-flow` `.wt-fh` `.wt-fnote` `.wt-screen` `.wt-sname` `.wt-st`
   `.wt-states` with `.base` `.node` `.planned` `.soon` are built by `wfTree()` and called by
   exactly one page, `wireframes/overview.html` - the prototype hub that LISTS the screens rather
   than being one, which `CLAUDE.md` excludes from the component corpus by name. That page loads
   `_wf.css` and never the system, and `_wf.css` declares the family itself. So the copy inside
   `account-shell.css` cannot be reached by anything: **136 of that file's 169 declarations that
   match no element in the product**. The precedent is on the same page - `.only-mobile` and
   `.only-desk` were the identical question and the owner closed it by deletion on 2026-08-14.
   Recommendation: delete, same as then.

   **CLOSED 2026-08-16.** The owner took the recommendation: the twelve `.wt-*` rules are deleted
   from `account-shell.css`, with the three measurements written beside them. The hub was measured
   after, not assumed - `wireframes/overview.html` still draws 6 flows, 50 screens and 141 state
   pills, with the same border, radius and pill shape, all of it from `_wf.css`. Four tokens left
   the file with the rules and left the page's token table in the same step, which `roles.mjs`
   caught: `--bg-inverse`, `--line-inverse`, `--fs-10`, `--fw-medium`.

   **Item 3b is done. 74 stand pages, 0 red; `accept` over 234 screens, 0 failures.** The debt ran
   179 classes on 19 pages -> 0, and along the way it produced three instrument extractions
   (`_idle.js`, `_frame.js`, `_boot.js`), two dead-code deletions (`.bb .tier` / `.bb .qty` and the
   `.wt-*` family), one rule that was living in the wrong file (`.smeths`), one live defect on a
   shipped buyer screen (the badge over the title) and one across the whole panel layer (the blue
   focus ring) - none of which any earlier probe could have pointed at, because they were all
   questions nobody was asking. One page at a time, each
   decided by reading - a mechanical sweep would hide real gaps behind a heuristic, which is what the
   first probe nearly did.

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

   **AND «ONE SCREEN» IS FOUR AS OF 2026-08-17, WHICH IS THE DECISION WORKING RATHER THAN DRIFTING.**
   `cart-coach`, `cart-coach-empty`, `coach-home-error` and `coach-home-loading` now wear `.coach`
   and catch nothing with it. Nothing was added: the private rules that used the namespace on those
   screens were migrated into their components by the item 3 sweep, and a rule that moves into
   `coach-cabinet.css` no longer needs the screen to say `.coach` for it. Every screen that loses
   its last scoped selector joins this list, so the list GROWS as the work finishes - which is why
   it is reported and does not fail. The number is written here rather than left at «one», because
   a published count that quietly went stale is exactly item 8.
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

   **FIRST INSTRUMENT BUILT 2026-08-16: `tools/inventory.mjs`,** and its subject is the registry of
   the component layer, `inventory.md`. Six questions: coverage both ways, `Lines` against disk, the
   level table against the level the component declares about itself, the totals paragraph against
   the tables it summarises, and - behind `--screens` - the `Screens` column, asked of the rendered
   DOM over all 88 coloured screens.

   | first run | |
   |---|---|
   | components on disk / rows in the tables | **84 / 73** |
   | rows pointing at a file that no longer exists | 2 |
   | `Lines` cells drifted | **66 of 73** |
   | `Screens` cells drifted | **58 of 73** |
   | totals paragraph | «70 components: 22/27/21» against 73 (22/28/23) in its own tables |

   **The `Screens` column could never have been right:** it was a markup scan, and a third of this
   product's chrome is written by `wireframes/_nav.js` at load, so it read `footer.css` **1** where
   the footer is on **77** screens and `tabbar.css` **0** against **82**. The `**JS**` annotation it
   carried was a note beside a number saying «this is wrong and here is why». **And the file's own
   note about the gap had drifted too** - it said eight components were missing, the real number was
   thirteen. All of it is measured now and the run exits 0.

   **SECOND SUBJECT WIRED 2026-08-17, AND IT IS THE ONE A PERSON ACTUALLY READS.** The registry is
   one copy of «how big is this component»; the `kp-meta` strip on each `design/kit/<component>.html`
   is a SECOND, and the second copy is the one that drifts. Question **H** in the same instrument,
   over the 75 stand pages that name a component file:

   | | tags | wrong |
   |---|---|---|
   | `рівень` | 75 | **0** |
   | `N рядків` | 73 | **53** |
   | `N селекторів` | 51 | **40** |
   | `N оголошень` | 46 | **19** |
   | `N екранів` | 56 | **37** |
   | **total numeric tags** | **270** | **143** |

   **Level at zero is what makes the other four readable.** A check that finds everything wrong is
   as suspect as one that finds nothing; one family coming back entirely clean says the parser and
   the corpus agree, and the drift is real.

   **The vocabulary was read off the pages rather than chosen.** `loyalty-rung.html` publishes «49
   селекторів · 61 правило», and its file measures 67 selectors and exactly **61** rules - so the
   stand already distinguishes the two words, and the check keeps the distinction: a selector is one
   comma-separated member of a rule head at any depth, a rule is one block. `pdp-tabs.html` pinned
   the other two, shipping 85 lines and 102 declarations both exact against a stale selector count.
   Twenty pages had a correct line count and twenty-seven a correct declaration count, which is how
   the conventions were confirmed instead of invented.

   **Agreement travels with the number, because these tags are render text.** `button.html` shipped
   «461 рядків» where 561 wants «рядок»; `breadcrumb.html` «22 екранів» where the count wants
   «екрани». `--apply` writes the ending the new number takes: 1 -> рядок, 2-4 -> рядки, 5+ ->
   рядків, and 11-14 take the last form against their last digit.

   **AND THE FIRST `--apply` DAMAGED THIRTEEN TAGS BEFORE ANYTHING WAS COMMITTED.** The tag matcher
   anchored at the start of the string, so it read the head of a COMPOSITE claim - «3 екрани +
   значок на 14», «14 екранів, діалог на 5», «291 оголошення без елемента» - as the count it
   recognises, and the rewrite replaced the whole tag with two words. Two of the three were not even
   the same quantity: cookie-banner's 291 is declarations that match no element. Reverted, and the
   matcher now requires the tag to be EXACTLY number + noun; anything longer is a claim of its own
   and goes to «not reached». Same family as `btn-rank.mjs`'s string replace at 8.31, caught the
   same way - by looking at what the tool wrote.

   **44 numeric tags are named as out of reach rather than passed over**: 13 composite claims, and
   31 corpus counts that need a browser and a different question («106 екземплярів», «470
   лічильників», «5 291 входження»). The composite thirteen still carry whatever they carried; they
   need a person who knows what each sentence means, not a regex.

   **AND A DASH READ AS ZERO HAD ALREADY DESTROYED TWO PUBLISHED NUMBERS, 2026-08-17.** The check
   failed `product-thumb.html` within a minute of its being written: «1 екран» against a registry
   cell that reads «–». The registry was right. `inventory.mjs` parsed that cell as
   `sc ? Number(sc[0]) : 0`, deliberately - the comment beside it said «a missing one reads as 0
   rather than as unknown», which was true while every row carried a number. `product-thumb.css` is
   the row that broke it, because it declares no class of its own and the anchor walk cannot count
   its screens at all. **A limit of the instrument had been flattened into a fact about the
   product** - and `--apply` had already used that zero: `counter.html` went from «19 екранів» to
   «0», `icon.html` from «39» to «0». Both restored, both now reported as **not reached**, which is
   the honest state: nothing in this repository can confirm 19 or 39 today. An instrument that
   cannot say «I do not know» says a number instead.

   **QUESTION I, 2026-08-17: the level is written in FOUR places and only two were being checked.**
   The file declares `(level N)`; `inventory.md` puts its row in one of three tables; `index.css`
   imports it into one of three groups; `design/kit/_nav.js` files its page under one of three
   headings. C and D compared the first two. The ladder is the whole architecture of this stage - an
   atom imported after the molecules can be overridden by them, the exact inversion the order exists
   to prevent - and the last two had never been looked at.

   | file | file says | `index.css` | stand registry |
   |---|---|---|---|
   | `product-thumb.css` | 1 | **2** | 1 |
   | `menu.css` | 2 | **3** | **1** |
   | `upsell.css` | 2 | **3** | **3** |

   A mismatch with a reason written above it is not a defect: `upsell.css` carries four lines saying
   why it imports where it does, `product-thumb.css` carried nothing, so the check asks for the
   comment and reports the two kinds apart. `product-thumb.css` moved into the atom group and
   `tree-diff` over five screens at both widths found every differing row inside the hidden
   `.wf-bar` subtree and none outside it.

   **The other two are the owner's, and they are two different questions.** `menu.css` has three
   placements and three answers - file molecule, import organism, registry atom - and nothing in the
   source says which is right. `upsell.css` has two INDEPENDENT placements agreeing against the
   file: both the import and the registry call the Pro panel an organism, and only its own opening
   comment says molecule.

   Still open under this item: every other published count on the stand - the per-page «N власних
   класів», the census tables, the numbers in `architecture.html`. The shape is proven; the subjects
   are not wired yet.

9. **16 selectors in the shipped component layer have never matched anything.** Found 2026-08-17 by
   `tools/dead-sel.mjs`, built for this question because nothing here was asking it: `inert.mjs`
   asks whether a DECLARATION is overridden and is structurally blind to a selector with no element
   - there is no losing declaration to find. Two had already been caught by hand in one file, and
   the second only because the first was: `coach-order.css` lost `.od-back` at 8.7 by counting
   instances, and kept `.od-line:last-child` four lines below it until 8.52.

   2925 selectors in 84 files (2215 distinct), asked of the browser over 263 pages that load
   `system/index.css`: **16 dead**, 365 conditional with a live host, 6 born at an act (the toast,
   declared with the line that builds it), 4 this engine will not parse (`::-moz-range-*`).

   **Seven of the sixteen are one shape - a comma list completed for symmetry where only one member
   has an element.**

   | file | alive | dead beside it |
   |---|---|---|
   | `button.css` | `.btn--outline .uiv-brand` · `.btn--s .uiv-brand` | `.btn--accent` · `.btn--ghost` · `.btn--l` |
   | `field.css` | `.field-grp > .btn--accent` | `> .btn--outline` · `> .btn--ghost` |
   | `empty-state.css` | `.emptybox .et:first-child` · `.emptybox .es:last-child` | `.empty .et:first-child` · `.empty .es:last-child` |

   The last one is the sharpest, because **the file had already written the rule down four lines
   above**: «`.errbox .et` is never `:first-child` anywhere, and a selector added for it would match
   nothing. An exemption that covers nothing fails as loudly as an undeclared case; so does a rule.»
   Then it wrote two.

   The other nine are not one family and are not one decision:

   | selector | file | what it is |
   |---|---|---|
   | `.pcard.dim .pold` · `.pcard.dim .pcut` | `product-card.css` | dimmed cards exist, struck prices exist, **no card is both** |
   | `.pdp-tabs .tprice:not(:has(.told)) .tnew` | `pdp-tabs.css` | a price with no old price - the demo product always has one |
   | `.skcard:not(:has(.skb))` | `skeleton.css` | a skeleton card with no button block |
   | `.pl-hw .pl-ic:empty` | `spec-table.css` | an icon slot with nothing in it |
   | `.wfh-meta .wfh-loc .uiv-ic:last-child svg` | `header.css` | the host is not there either |
   | `.btn--stack .tl .uiv-ic svg` | `stack-action.css` | the host is not there either |
   | `.resend a` | `field.css` | the block is built by a script and holds no anchor |
   | `.coach .upsell p b` | `upsell.css` | the Pro panel's paragraph lost its bold |

   **«Dead» here means «matched nothing on these 263 pages», never «can never match»**, and the two
   kinds are repaired differently - a rule with no possible host is deleted, a combination the corpus
   never shows is a question about the demo data. The instrument reports the fact and refuses to
   guess; the reading is a person's.

   **CLOSED 2026-08-17: sixteen read, twelve deleted, four kept with a reason. `dead-sel` 0.**

   The twelve deletions each carry the reading beside the rule, and every one of them is a sentence
   about the product rather than about the selector: a brand mark names a third-party provider, and a
   provider is never the one action of a region nor a ghost (`button.css`, three); a control welded
   to the edge of a field is the one that submits it, which is an accent by rank (`field.css`, two);
   `.wfh-loc` holds one mark and the caret belongs to the language menu alone (`header.css`); `.tl`
   is the tab bar's caption and was written into a stacked control as if the two were interchangeable
   (`stack-action.css`); every `.empty` carries a glyph above the title and an action below the body,
   which is what the paragraph four lines up had already worked out (`empty-state.css`, two); the
   panel's bold is real in one of its two paragraph shapes (`upsell.css`).

   Two deletions are worth their own line. **`.resend a`** was four declarations for an anchor that
   is not there: `.resend` holds a countdown in a `<span>`, because during the count there is nothing
   to press, and the live resend link is `<a class="pf-resend">` in `.otp-note`, already drawn by
   `checkout-form.css:50`. The dead rule was that control's ninth-edition twin, one token off, **on
   markup that never existed - so no amount of looking at the screen could have found it.**
   **`.skcard:not(:has(.skb))`** was right the day it was written (8.24, for two named coach screens)
   and the corpus moved out from under it: twelve `.skcard` today, not one without a `.skb`, and on
   the two screens it was written for the word survives only in a comment. That is the case for
   sweeping the whole corpus rather than what a step touched.

   The four kept are declared in `tools/dead-sel.mjs` as `KEPT_ON_PURPOSE`, each with its reason, and
   the control there **fails in both directions**: an entry that goes alive means the case arrived
   and the note must go; an entry naming a selector no file declares means the exemption outlived its
   rule. Three are states of a SHOP the demo catalogue does not contain - a full-price product
   (`pdp-tabs.css`), an out-of-stock product that is also discounted (`product-card.css`, two).
   The fourth is the mirror of the toast: `.pl-hw .pl-ic:empty` is **killed by an act**, because the
   markup ships the slot empty and `design/_nav.js:1461` fills all three on every load, so `:empty`
   is false by the time anything is measured.

   **2925 selectors before, 2913 after, and the live count unchanged at 2534** - which is the proof
   that nothing alive was touched. Pixels: **`tree-diff --dir` over all 88 product screens at both
   widths, 176 comparisons, 0 elements moved.**

   **And the reference had to be built, because `tree-diff HEAD` could not answer this.** Asked
   against HEAD it reports 4 comparisons moved, and all four belong to earlier steps still sitting
   uncommitted in the tree - the border-ownership rewrite on `coach-order` (8.52) and the 560 on
   `coach-verify-loading` (item 2). Worse, with no page named it asks git which `design/*.html`
   changed and gets two, **neither of them affected by a stylesheet edit at all**: a component-layer
   change touches every page that loads it and no html file at all. So the reference is the working
   tree with only the ten stylesheets restored from HEAD, and `--dir` compares against that. A
   comparison whose two sides differ in more than the thing being measured is not a proof.

## List 4 - what stage 09 step 1 found and deliberately did not fix

The pattern step is a refactor, and its acceptance is zero pixels moved. Every value below is a
value the move made VISIBLE; snapping any of them is a separate decision, said out loud in the
form this project requires (variable, value, why), and none of them is taken here. Folding a value
change into a move is exactly how a refactor stops being provable.

**1. The action row is written with five gaps for one job.** `tools/pattern.mjs`: one composition,
70 grey screens and 58 coloured ones, under 53 container names. Of the sixteen that carry a rule,
the gap is `--space-12` ten times, `--space-8` four times, a bare **9px** three times and a bare
**10px** twice, `--space-16` once. **9px and 10px are on no rung** - the ladder is 4 / 8 / 12 / 16 -
and `coach-clients.css` had already written the finding into its own comment beside `.cl-acts`:
«the third number on the four action rows». After the move each deviation is one declaration in
one file, written as `.x.actions{ gap }` so that it outweighs the pattern:

| variable | today | candidate | why it is not decided here |
|---|---|---|---|
| `.coach .cl-acts` gap | 9px | `--space-8` | 1px on four coach screens, and the four rows should agree with each other first |
| `.coach .ccard-acts` gap | 9px | `--space-8` | the same 1px, on the client card |
| `.coach .oc-actions` gap | 9px | `--space-8` | the same 1px, on the order card |
| `.coach .cc-cta` gap | 10px | `--space-12` | 2px, and this row is the screen's own call to action |
| `.coach .od-acts` gap | 10px | `--space-12` | 2px on the coach order |
| `.coach .ord-acts` gap | 10px | `--space-12` | 2px on the coach cabinet |
| `.addr-acts` gap | `--space-8` | `--space-12` | on a rung already; the question is whether an address card's actions are a tighter row on purpose |
| `.aord-actions` gap | `--space-8` | `--space-12` | the same question on the order row |
| `.cshelf .cs-act` gap | `--space-8` | `--space-12` | the same question on the trust shelf |
| `.ci-links` gap | `--space-16` | `--space-12` | the only one that is WIDER than the pattern, and it holds two text links rather than two buttons |

**2. Two action rows were not converted, and both are named rather than left to be noticed.**
`.ceact` and `.cedlg .act` - the client dialog's own row, on eight grey screens and two coloured
ones. Its markup is built by `wireframes/_nav.js`, the shared script BOTH corpora load, and this
stage does not edit the grey corpus. `.sys-acts` - the service page's row, zero coloured
occurrences, so there is nothing to prove with pixels. Stage 12 rebuilds both sets of screens and
should take the pattern then.

**3. The product's page container lives in a file that is not part of the system.**
`.wf-canvas` and `.wf-page` stand on 129 and 122 grey screens and are declared in
`design/_stand.css`, which opens by saying it is «prototype and stand chrome, NOT part of the
system». `.wf-page{ max-width: 1200px; margin: 0 auto; padding: 0 16 40 }` is not chrome - it is
the product's content column, and stage 10 will need it. It was left where it is on purpose: the
file's placement is a recorded decision of step 7.26, and moving product layout out of it is an
owner's call, not a side effect of a pattern step.

**4. The system has no class that means «this is the screen's main action».**
**And two documents of this project disagree in writing.** `DESIGN.md` line 44: «One orange per
view. The accent means exactly one thing: where to press. A second filled orange button on a screen
means the screen has not decided which step is the main one». `button.css` line 20: `.btn--accent`
is «the one action of a REGION». `conventions.md` line 130 sides with the region: «Each zone has one
main action; the screen's main action is a real `<a href>` to the next». The product obeys the
region reading on every listing screen, so **the `DESIGN.md` line is the one that is stale** - and
it is the line a new reader meets first, because it sits under «The rules colour obeys».
The coloured layer has no way to check either reading. Visible `.btn--accent`
reaches 13 on one screen because every product card carries an accent cart button; the grey
layer's own primary marker `dark` reaches 5. The finish is the rank, and the rank is being asked
to mean two different things. Whether the system needs a separate `btn--primary` role, or whether
the rule belongs to zones and stays uncheckable by class, is an owner decision. Rule U8 in
`architecture.md` states the measurement; it does not invent the class.

**5. `.acc-main` is declared by no component file at all.** It stands on 43 grey and 31 coloured
screens as the second half of the account shell, beside `.acc` and `.acc-nav`, which
`account-shell.css` does declare. The same holds for `.stack`, `.navlink`, `.ctrl`, `.frange` and
`.wfh-cabbtn`. None of them is dead - `tools/dead-sel.mjs` asks the opposite question and answers
0 - they are classes the markup wears that no stylesheet in the system names.

**6. The roadmap sidebar's own text is under 4.5:1, in BOTH themes, on every page that carries it.**
`tools/theme.mjs`, measured: `a.nav-top` «Дослідження» **4.14 dark / 4.33 light** against
`rgb(242,241,238)`, 14 occurrences; `a.nav-link` «Чому саме так» the same pair; the row label
«дизайн-процес» the same; and `span.nav-badge-soon` **3.79 / 3.79**. The «light» column is what says
whose fault it is, and it says the theme is innocent: **the defect is older than the dark theme and
lives in `/_nav.css`**, the look of the root registry.

Stage 09 step 3 did not create it, but it did widen its reach by one page: giving `why.html` the
roadmap panel - which the pack requires of a roadmap item - brought a second `design/` page into the
same reading. The walk's subject is `design/`, so it reports two pages; the panel is on every stage
hub in the repository, so the real reach is every one of them.

Not fixed here for a reason that is a rule rather than a preference: `/_nav.css` is the look of the
project registry, owned by no design stage, and its ink is a value. Changing it is «variable ->
value -> why», said out loud by the owner. The measurement is what this step owed.

## List 5 - the self-sufficiency test, stage 09 step 5

The next real page of the product, assembled from the finished system and nothing else: **node 2.2,
Ціль-колекція**, base plus its three states, four files. Chosen by the owner from 54 grey screens
that have no coloured twin, on the measure the pack names - it covers **38 of the 84 components**,
more than any other candidate, and it stands in the flow between two screens that are already
coloured (`index` -> `goal` -> `listing`).

**Zero styles were written on the screen.** The four files carry no `<style>` element and no `style`
attribute; they load `system/index.css` and the stand chrome, exactly like every other product page.
Everything below is what the system could NOT do, recorded rather than drawn by hand.

| What is missing | What needed it | Which level of the system closes it | Priority |
|---|---|---|---|
| **`.gnote`** - the note under the grid that explains the default card order («в наявності first, then …») has no component and no rule anywhere in the system | `goal` - a goal collection sorts differently from a plain listing, and the screen has to say so | component (a quiet note under a block), or a variant of `seo-text` | medium - it is one paragraph on one screen today, and every goal collection will carry it |
| **`.actions` has no inline variant** | `goal-empty` and `goal-error` - the empty state's action row is `inline-flex` and centred, so it shrink-wraps under a centred block. The pattern is `flex`, which stretches | pattern variant (`.actions--inline`) | medium - it is why `.eact` was NOT converted at step 1, and it holds for every empty state in the product |
| **`.ctrl` is declared by no stylesheet** | all four screens, and `listing` before them | component or a deletion - the class is markup nobody styles | low - already recorded as item 5 of list 4, confirmed here on a new screen |

**And one thing that is NOT a system gap, named so it is not mistaken for one.** The view toggle's
«Списком» cell on `goal` is a dead `<span>`, because **`goal-list.html` does not exist in the
product at all**. That is a missing SCREEN and therefore an IA decision, recorded on the
`view-toggle` stand page since stage 08 as the single real defect of that control. The coloured copy
inherits it unchanged; drawing a «disabled» look for it here would be inventing a state, which step
7.31 already refused for the chip on the same grounds.

**The backlog is not empty, and that is the answer the step owed.** Three system gaps and one IA
gap, from a screen that a person would otherwise have called finished.

**Two more, found by the critique pass and by a positive control rather than by eye.**

| What is missing | What needed it | Which level | Priority |
|---|---|---|---|
| **`pagination.css` does not draw its own cells.** `.pages a` gets no box, no border and no size from the component; on `listing` every link was hand-dressed at stage 08 as `btn--outline btn--icon btn--s`. The new screen's pagination therefore renders as bare text, and no map can fix it: the links carry no identity class, so there is no key to read a finish from | `goal` - a goal collection is paginated | component (the pagination should style `.pages a` itself, the way `button.css` refuses to style a bare `.btn`) | **high** - it is the only finding here that makes a control invisible, and it reaches six more coloured screens |
| **The «next page» link has no accessible name.** `<a href="?page=2">›</a>` - a chevron and nothing else | `goal`, and the same markup stands in the grey layer of six other coloured screens | microcopy plus markup, owned by the grey layer | medium |

**The keyboard pass was read against a control, not in isolation, and that changed the report.** The
first reading of `goal` said «78 focusable elements with no focus ring» and a list of hit targets
under 44px. The same probe on `listing`, the accepted twin, answers **78 and the same list** - so
both belong to the shared shell and neither was introduced here. What the control DID isolate is one
delta: three unnamed focusables against the twin's two, and that third one is the pagination chevron
above. A finding that both screens share is a corpus finding; only the difference is news.

**And one that reaches far past this screen, found by the critique's positive control.**
`clone-to-colour.mjs` line 138 always appended **`btn--s`** to every control it ranked - a 40px
button - while the hand-built screens write `btn--accent btn` with no size and get `button.css`'s
own 52px. So the main action of an empty state came out **under the 44px touch target on every
screen the transform ever cloned**, and nothing said so: the button is ranked, visible and
clickable, and only a comparison with a hand-built twin shows it.

The split is clean and it is the proof: `listing-empty`, `listing-error`, `cart-empty`,
`product-oos` - built by hand - carry **0**. `account-empty` carries 5 and `coach-home-empty` 3,
both cloned. Across `design/` the invented size stands on **114 controls over 43 screens**.

The instrument is fixed (the rank is read off the grey layer's `dark`; the SIZE is not the grey
layer's to give) and the four screens of this step were corrected to match their twin. **The other
43 were not touched**: undoing a size on 114 shipped controls is a value change across the corpus,
which is «variable -> value -> why» and the owner's call, not a side effect of a step about
patterns. Every one of them is a main action that a thumb has to hit.

### Withdrawn on verification, and both were mine

The critique's design-review pass disagreed with two rows above, and the source settled it against me
both times. **A withdrawn finding stays visible with its reason, or it comes back next time in the
same words.**

**«`pagination.css` does not draw its own cells» - WITHDRAWN.** The component declares the row, the
disabled state and the fill of the current cell, and draws no box **on purpose**: the cell IS a
button, composed on the screen as `btn--outline btn--icon btn--s`, which is exactly what the accepted
twin `listing.html:184` writes. Nothing was missing from the system; classes were missing from my
screen, together with `aria-current` and a name on the chevron. Measured before the fix: cells of
9.6 x 25.6px of bare text against 40 x 40 on the twin, and Tab drawing Chrome's default blue outline
on a warm neutral ground. Fixed by a pass in `clone-to-colour.mjs`, because the finish map cannot
reach links that carry no identity class.

**«`.gnote` needs a component» - WITHDRAWN, and the opposite is true: the markup had to go.**
`badge.css` records the decision in writing - `.gnote` is a GREY-PROTOTYPE ANNOTATION, «the coloured
clone dropped it, correctly, which is why it renders on 0 of 39 coloured screens» - and the class
left the system at step 8.10. The twin keeps the same rule as an HTML comment, «kept out of the
visible UI». My screen was the fortieth, and the one that rendered it: 16px full-ink text, the
loudest block in the lower half of the page, louder than the SEO body under it. **Ordering a
component for it would have put back into the system exactly what the system had deliberately
removed.** The drop had been done by hand at 8.10, so the transform never learned it; it is a pass
now.

**And one sharpened rather than withdrawn.** The view toggle is worse than «the «Списком» cell is
dead»: on `goal` BOTH cells are `<span>` - the grey original writes them that way while
`wireframes/listing.html` writes both as `<a href>` - so the whole control is out of the Tab order
while still advertising `cursor: pointer`. It is a defect of the frozen grey layer, and it needs the
owner rather than a coloured patch.

## List 6 - the one hole the dark theme opened, stage 09 step 6

`tools/theme.mjs` over 276 of 280 coloured pages, ink against its own ground, threshold 4.5:1.
**35 forms sit under it. 34 of them fail in the LIGHT theme too**, which means they are older than
the theme and belong to A10, the accent-on-pale decision already recorded: `#FF5A00` on a pale ground
is 3.13:1 and every `btn--accent` label inherits it.

**Exactly one form was broken BY the theme, and that is the whole value of running this check:**

| what | light | dark | where |
|---|---|---|---|
| `span.hptag` - the eyebrow of the first home promo tile, «Акція тижня» | **5.45** | **2.97** | `home-buyer` · `home-cart`, 6 instances |

The tile paints its ground with `var(--bg-page)` behind a photo (`banner.css:108`), and the eyebrow
takes `--text-action` on the first tile only (`hero.css:29`). The light pair works because the pale
ground sits under a light photo; in dark the ground inverts and the photo does not, so the ink loses
its footing while the role itself is perfectly paired. **A role can have both halves and still fail:
the pair is about the token, the contrast is about the SURFACE it lands on**, which is the third axis
stage 08 wrote down and this is its first real catch.

Not fixed here. It is a value decision in the form the project requires - variable, value, why - and
it is the owner's: either the eyebrow stops reading `--text-action` on a photo tile, or the photo
tile gets a scrim role of its own. Choosing here would fold a value change into a step about patterns.


## The header search collapses between the shell point and ~1010 - found by the owner, stage 10

**Measured on `design/index.html`, the search input's own width:**

| viewport | `.wfh-search` | the input inside it |
|---|---|---|
| 860 | 121 | **44.5** |
| 900 | 161 | 84.5 |
| 907 | 168 | 91.5 |
| 960 | 221 | 144.5 |
| 1020 | 281 | 204.5 |
| 1280 | 325 | 248.5 |

The placeholder is «Пошук товарів, брендів...» and at 44px the field shows «Пс». The row at 907 holds
logo 65 + nav 198 + search 168 + actions 408 with four gaps, 839 of the 875 available: the search is
the only item with `flex: 1` and no floor, so it absorbs every shortfall alone. It is the same shape
as the restock row's 26px e-mail field, one level up.

**Not fixed in step 4, and the reason is that both repairs are SHELL decisions.**

- **Give the search a floor and let the row wrap** (`flex: 1 1 18rem` + `flex-wrap` on `.wfh-in`).
  Measured consequence: below ~1010 the search takes its own full-width line, which grows the header
  by one row - and three sticky offsets read the header's height as a literal (`.pmini` `top: 88`,
  `.acc-nav` `top: 120`, `.mtoolbar` `top: 57`). They would all need to follow, which is what
  `--shell-top` exists for.
- **Let the action labels go and keep one line.** The four actions take 408px with their words; at
  859 they are already icons only. Deciding where the words come back is a decision about the
  action row, not about the search.

The shell's form was chosen by the owner at step 3 and its height is what three components measure
themselves against, so neither repair belongs inside a component round.

## The bonus action has no bonus icon - noticed by the owner, stage 10

«БОНУСИ / Отримати» in the header action row stands beside «Увійти» (a person), «Обране» (a heart)
and «Кошик» (a cart), and wears a generic container glyph. A set of four marks where three name
their job and one does not reads as a gap rather than as a choice. This is an addition to the icon
set, which is stage 08's territory and `design/kit/icons.html`'s page: a new glyph, its row in the
set, and the same 30-size / 6-weight discipline every other mark in the set carries.

## ~~The split turns on by SCREEN and the frame needs PLACE~~ - CLOSED by the critique repair

**Measured on `design/coach-clients.html`, the split frame and its two columns:**

| viewport | `.clsplit` | rail (fixed `17.5rem`) | detail |
|---|---|---|---|
| 860 | 528 | 280 | **224** |
| 960 | 628 | 280 | 324 |
| 1024 | 692 | 280 | 388 |
| 1280 | 732 | 280 | 428 |
| 1440 and up | 868 | 280 | 564 |

From 860 to about 1010 **the detail is narrower than the list**, and at the point it is 224px -
narrower than a phone. It is not broken: `.cdetails` carries a container threshold at `22rem`, so the
label-and-value rows fold to one column and the panel reads. But the cause is the same one that set
`--grid-col-min-panel` to 19rem instead of 22rem at step 4: the account shell takes its own 268px nav
column, so `.acc-main` at a 860 viewport is a 528px box.

**`@media` asks about the SCREEN; this frame needs an answer about the PLACE.** The ladder's own
answer is `container-type: inline-size` on `.acc-main` and `@container` on `.clsplit`, which would
turn the split on when there is room for it rather than when the window is wide. Two reasons it was
not taken inside step 5, and both are the owner's to weigh:

1. It changes WHEN the split appears, which is a decision said out loud rather than a refactor.
2. The coloured corpus cannot measure it honestly. The stand's own roadmap rail appears at 1076 and
   drops `.acc-main` from 692 back to 528, so a container query would flicker off and on while
   browsing the design copies and be right in the product. The measurement would have to be taken
   with the rail suppressed, which is a change to how the copies are viewed.

Cost if taken: one `container-type` on `.acc-main`, one query moved in `coach-clients.css`, and
`wfClientSplit()` stops reading `--bp-shell-wide` through `matchMedia` and asks the OUTPUT instead -
`getComputedStyle(pane).display !== 'none'` - which is what this repository asks everywhere else.
Check first that nothing `position: fixed` lives inside `.acc-main`: `contain: layout` would
re-anchor it, which is exactly why the page frame could not become a container at round 4.

**CLOSED, and the cost was one line more than the estimate above.** Measured first: zero
`position: fixed` descendants inside `.acc-main` on all three clients screens, so the container was
safe. `.acc-main` had no rule of its own at all - it was a bare grid cell - so `container-type:
inline-size` is the whole of its rule. The estimate was wrong in one place: a BARE `@container` is
not enough, because the place is not monotonic in the viewport. It turned the split on below 860
(no nav column there, so the box is the full 828) and off between 860 and 960 (the shell takes its
268 and the box drops to 528) - the split appeared, vanished and came back, and the sweep caught it
inside one run. The rule is now `@media (min-width: 860px)` with `@container (min-width: 41rem)`
nested inside: the shell first, because a two-pane workspace belongs to the desktop shell, then the
room. The split opens at a 990 viewport with a 354px detail pane, and the 224px is gone.

## The stand's roadmap rail reflows the product page, and now it changes WHICH layout you see

Measured on `design/coach-clients.html`, swept at 10px from 320 to 1600: the split opens at 990
(`.acc-main` 658), **closes at 1080** (`.acc-main` 532) and opens again at 1210 (662). The 1080 drop
is the stand's own roadmap rail appearing at 1076 and pushing the page: the coloured copies are
~216px narrower than production above that width.

**This was always true and it never mattered until now.** Every width this stage measured was
measured with the rail in the page, but with `@media` the rail only shifted pixel numbers. With
`@container` it decides which LAYOUT the page gets, so a viewing aid now has a vote on the product's
composition. In the product there is no rail and the sweep is a single transition at 990.

Three ways out, none of them free:
1. **The rail overlays instead of reflowing.** Correct in principle - it is chrome for looking at the
   product, not part of it - but it would cover content at exactly the widths where it appears.
2. **The rail is suppressed for measurement**, and every instrument opens pages with it off. Cheap
   for the instruments, but then nobody ever LOOKS at what the instruments measure.
3. **Leave it and keep printing it.** What is in place today: `tools/split.mjs` prints every
   transition with the box that caused it, so the flicker is in the output of every run rather than
   in somebody's memory.

## 20 stand pages describe a width the component no longer has - stage 10, owed to step 6

Measured across all 84 component stand pages, comparing the `(min|max-width: Npx)` numbers written on
the page against the numbers the component file actually holds after comments are stripped: **22
pages named a width that is not in their own file, and step 5 repaired the two it touched, leaving
20.**

| page | says | the file holds |
|---|---|---|
| `account-shell` | 640, 959, 960 | 620, 859, 860 |
| `auth-dialog` | 719, 720, 899, 900 | 859, 860 |
| `checkout-form` | 479, 480, 559 | 619, 620, 860 |
| `coach-cabinet` | 520, 640, 720 | 619, 620 |
| `coach-landing` | 559, 980 | 619, 620, 860 |
| `coach-verify` | 520, 760 | 620, 860 |
| `footer` | 479, 720 | 619, 860 |
| `menu` | 859 | 619 |
| `pdp-tabs` | 1180 | 860 |
| `system-page` | 720 | 620, 859 |
| `trust-strip` | 479 | 619, 859, 860 |
| `buy-box`, `city-dialog` | 479 | 619 |
| `hero` | 720 | 860 |
| `address-card`, `button`, `field`, `loyalty-rung`, `product-grid`, `restock-note` | various | the file holds none at all |

**Not all 20 are defects, and that is why this is a list rather than a fix.** A stand page is allowed
to name history - «було 720, стало 640» is a record, and a record may keep the old number. What is not
allowed is a RULE that names it: `coach-clients` held `(min-width: 640px) -> .clist у дві колонки` in
its «Межі» table, presented as the current boundary, four rounds after that number stopped existing.
Separating the two needs a reading of each page, not a regex.

**Nothing checks this today, and the gap has a shape.** `tools/bp.mjs` deliberately excludes the stand
from its subject - «у стенді, і це не предмет: 17» - because a stand page legitimately shows CSS that
is not the product's. So the numbers the stand writes in PROSE are checked by nobody, and stage 10
moved 27 of them. The check is cheap (the comparison above is fifteen lines) and belongs either as a
fifth class in `bp.mjs` with the stand as an explicit second subject, or in `inventory.mjs`, which
already reads every stand page and every component file and already fails on meta drift.
