# Architecture: the decision sheet for stage 09

Thirty-two stands in `design/kit/` end with the same sentence: «stage 09 starts from this
list, collected in `design/kit/docs/architecture.md`». This is that file, and until step 7.60
it did not exist. Ninety-eight findings were living in 7300 lines of `consolidation.md`, which
is a log and is not read.

**What this is.** Every finding stage 08 measured and deliberately did not fix, folded into
the smallest number of decisions that resolve them. Not a summary of the log: the log records
what happened, this records what is still owed.

**How to use it.** Each decision carries a measurement, what happens if it is left alone, what
it costs to change, and a recommendation. Answer yes or no per line. Nothing here is invented:
every number was read out of the code or the browser on 2026-08-09, and where a number differs
from what an earlier step wrote, the fresh one is used and the drift is named.

**What is not here.** Anything already fixed, and anything this pass measured and found sound.
A short list of the second kind is at the end, so that a shape which merely looks wrong is not
re-opened a fourth time.

---

## A. Values and rules - stage 09

These change pixels. Each is one decision across many files, which is why no single step took
them: a value moves once, by a decision said out loud, never as a side effect.

### A1. `1.5px` - **CLOSED at step 7.62**. It was 33 declarations in 23 files, not 44 in 26

**The count in this file was wrong**, and the instrument is why: a plain `grep 1.5px` counts
prose inside `/* */` as code and matches `11.5px` on the substring. Re-counted with a boundary
and with comments stripped: **33 declarations in 23 of the 78 stylesheets.** Eight of the
missing eleven were comments about the value and two were the `11.5px` font size in
`buy-box.css`.

**Measured three ways at 7.62, because «Chrome draws it as 1px» is a claim about PAINT and the
recommendation that followed was a claim about LAYOUT, which nobody had checked:**

1. `getComputedStyle().borderTopWidth` returns **`1px`** for a declared `1.5px`, at device
   pixel ratio 1, 2 and 3. Chrome resolves it to a used value of 1 before layout ever runs.
2. The layout rect of a `1.5px` box is byte-identical to a `1px` box - `95.156 x 41.594` at all
   three ratios - while a `2px` box is `97.156 x 43.594`.
3. A census of every non-zero border on the 40 coloured screens at two widths returns exactly
   three widths: **1px (34 262), 2px (440), 4px (16)**. `1.5px` appears zero times. The 4px is
   the ring of the two loading spinners, where a border draws a shape and not an edge.

**Done: 1px, 33 declarations in 23 files, plus the rule written into `tokens.css`** - the system
has two line weights, hairline 1px and heavy 2px, and a control that wants a heavier edge asks
for 2px out loud. The A/B was the point of the whole thing: **null pass 0 rows, difference 0
rows.** Nothing on any screen moved, because nothing had ever been drawn.

**What the sweep was not allowed to fold silently.** In one file `1.5px` was an argument rather
than a habit: `checkbox.css` chose it over 1 with a reason written down - «at 18px an unchecked
box is nothing but its outline, and a hairline there reads as a rounded rectangle of nothing».
The reasoning may well be right and the value never did it. The comment is preserved in the
file and the question is now the one open item A1 leaves: **does the 18px checkbox want a 2px
edge?** That is a decision, not a sweep.

**Three claims elsewhere in the code were wrong because of this and are corrected.**
`button.css` computed a button height as `8 + 8 + 14x1.6 + 1.5x2 = 41.4` from the declared
border; the used border is 1 and the sum is 40.4. `order-row.css` said 7.23's change to 1.5
made `.ord-tab` «41 tall instead of 40»; measured in both editions, it is **40.39** and the
border never moved it. `checkbox.css` called its 2px tick «the same weight the box reads next
to»; the box reads 1.

### A2. Breakpoints - **partly closed at step 7.64.** The list was 21 values; it is 18 boundaries

**The reframe the entry was missing.** A boundary at N is written `(min-width: Npx)` on one side
and `(max-width: N-1px)` on the other. Counting 479 and 480 as two values counts one boundary
twice. Parsed properly from the 76 component stylesheets, comments stripped: **116 `@media`
blocks, 112 width features, 18 distinct boundaries.**

| boundary | declarations | files | |
|---|---|---|---|
| **860** | 39 | 15 | the most used boundary in the system, and it is not in the named set |
| 720 | 20 | 9 | named |
| 480 | 13 | 7 | named |
| **620** | 10 | 9 | the second unnamed workhorse |
| 640 | 6 | 4 | |
| 960 | 6 | 3 | |
| 560 | 4 | 4 | |
| 1180 | 3 | 2 | named |
| 760 | 3 | 2 | |
| 420 · 900 · 1040 · 700 · 820 | 1-2 each | | |

**Four boundaries were spelled two ways and three of those overlapped for real** - at exactly
one pixel width, both the narrow rule and the wide rule fired:

- `city-dialog.css` closed at `max-width: 480` while `checkout-form.css` opens at
  `min-width: 480`. Twelve other declarations write the narrow side of that boundary as 479.
- Three files closed at `max-width: 640` while `account-shell.css` opens at `min-width: 640`.
- **`product-card.css` closed at `max-width: 620` while nine declarations open at
  `min-width: 620`** - and this is the one that shows. Measured at exactly 620 on
  `listing.html`: the card came out **286 x 498** while its neighbour one pixel wider is
  286 x 553. At 620 it was drawing a mixture of the narrow and the wide rule. Fixed, and 600,
  619, 621 and 640 are byte-identical before and after.
- The 560 boundary was written `max-width: 559` in one file and `max-width: 560` in three.

**Done at 7.64.** Nine declarations re-spelled to the convention, and afterwards **no value in the system is used as both a `min-width` and a `max-width`** - checked by parsing every `@media` block again, and the two true singletons
that had a set member within 40px folded into it: `banner.css` 700 to 720, `order-row.css` 820
to 860. **Null pass 0 rows; the difference is 3834 rows and every one of them is layout -
position, rect, `grid-template-columns`, gaps. No colour, no type.**

**A2's own list needed correcting too.** It named 559 and 759 as singletons to fold. 559 is the
convention-correct narrow side of the 560 boundary, and 759 is the correct partner of
`min-width: 760` in the same file. Neither is drift.

**Not done, and it is the part that is a decision.** 560, 620, 640, 760, 960 and 1040 each serve
two or more files and each marks a content limit rather than a grid step; folding them is a
layout redesign. `restock-note.css`'s 419 stays with a measured reason written next to it: at
420, 440, 460 and 479 that row does not wrap and does not overflow, so folding it to 479 would
stack a row that fits. **The remainder of A2 is one question: does the named set gain 860 and
620, or do the components that use them carry a written reason each?**

### A9. The only sideways scroll left in the product - found and half fixed at 7.64

**Measured: 40 screens at 21 widths from 360 to 1440, 840 loads. Exactly one screen scrolled
sideways** - `product-oos.html`, in two bands, always the same row: the buy box's
«Повідомити про надходження» plus the wishlist heart.

The mechanism: `.bb .buyrow` had `flex-wrap: wrap` **inside the phone block only**, so above 479
it could not break at all. Its two children need 358 + 52 + 12 = 422, and the buy box column is
303 wide at 480 and 395 at 860.

**Fixed by moving one declaration:** wrap belongs to the row, not to a width - a row allowed to
break costs nothing at the widths where it fits. Measured after: **six of the seven overflowing
widths are gone** (560, 860, 900, 960, 1040 clean; 480 down from 103px to 39px, 520 from 63 to
19). Verified across all six product screens at seven widths: nothing else moved a pixel.

**What is left is not CSS.** At 480 the label's own min-content is 358 inside a 303px column.
`button.css` already states the rule for this: «where no layout can give that room, the label
itself is too long for a button, and that is a wording decision». So the remainder is either a
shorter label or a wider buy-box column between 480 and 620, and both are the owner's.

### A3. The eyebrow - **CLOSED at step 7.63.** The count was right and the reading was not

**The count holds.** `--ls-caps` really is 32 declarations in 18 component files. (A repo-wide
grep returns 39 in 20; the extra seven are `design/_stand.css` and `design/kit/_page.css`, the
showcase's own chrome, which is not a product component.)

**Two things in the entry above were wrong, and only the browser could say so.**

1. **«The family is one idea» - it is four.** Counted by instance on the 40 coloured screens:
   355 elements carry the caps tracking, in 27 forms. They are the eyebrow (14 forms), the tag
   on a plate at 10px (8 forms), display caps in Oswald (3 forms), and emphasis inside running
   text where the capitals are in the WORDS and not in a `text-transform` (2 forms). One face
   over all 32 would have turned the avatar initials, the «Новинка» tag and the allergen line
   into section headings.
2. **«14 of the 32 use exactly it» - no.** By instance, 12 / black / muted / uppercase was 32 of
   355, about 9%. The two loudest renderings were the footer heading (145 instances, ink
   `--text-primary`) and the drawer label (102, `--text-secondary`), both of them global chrome
   repeating on every screen.

**And A3 counted only half the family.** There is a second tracking token, `--ls-eyebrow`
(.08em) - the one actually named «eyebrow» - used by six more declarations in five component
files. A3 never mentions it.

**Done.** The two tokens are now two voices, and each is used by one:

- **`--ls-caps` .04em - the eyebrow.** Inter, 12, black, uppercase, `--text-muted`. Small
  service text that names the block under it. Nine declarations moved to it: the footer heading
  and the drawer, city and account labels changed ink; four table and label rules changed weight
  from bold to black; `.pm-rw` came over from the other token entirely.
- **`--ls-eyebrow` .08em - the system caption.** Monospace, 12, uppercase, `--text-muted`. The
  «або» divider in checkout and in auth, the auth visual's line, the promo tag. After 7.63 every
  user of this token is monospace.

**The rule that decided the ink is measured, not chosen:** every eyebrow in the product labels
something set at 14px or more in a darker ink. The footer heading was the only one as dark as
the content it named.

**Exceptions kept, each with a reason in `tokens.css`:** the inverse ink where the ground is
ink, the 10px tag family, the Oswald display caps, and the two prose emphases.

### A8. `--fw-black` rendered as `--fw-bold` - **CLOSED at step 7.65, the owner's call**

**Measured at 7.63.** Every page requests `family=Inter:wght@400;500;600;700`. There is no 800
face, so Chrome falls back to the nearest loaded weight and does not synthesise. The same 12px
uppercase string, weight by weight: **400 = 221.094 · 500 = 223.281 · 600 = 225.469 ·
700 = 227.656 · 800 = 227.656 · 900 = 227.656.** From 700 upward the number stops moving.

**87 declarations in 38 component files** rode on it, second only to `--fw-bold` at 99. One page
of eighty-nine asked for 800 - `design/overview.html`, the showcase hub.

**Answered: `--fw-black: 700`.** The system has four weights and the code now says the number
the screen draws. Zero visible change; the A/B returns the computed `font-weight` rows and
nothing else.

**The name stays, and that is part of the answer.** Two semantic names on one value is normally
this project's own defect - «one idea, two names», section B1 - and `tokens.css` already carries
the exception that governs it: `--bg-discount` and `--bg-danger` are both `--red-50` on purpose,
because a discount is not an error. Same shape here. `--fw-bold` means «this is emphasis»;
`--fw-black` means «this is the heaviest thing in its block», and 87 declarations were written
with the second meaning. Collapsing the name would throw that intent away and turn the other
branch back into a decision about 87 declarations.

**So the other branch stays one line.** Add 800 to the font request across the 89 pages, set the
token back to 800, and the register the type was written for arrives everywhere at once. That is
a look and not a repair, and it belongs to stage 09 with the type stand open.

### A4. The type scale is missing both ends

**Measured.** The scale runs `--fs-10` to `--fs-30`. Written as literals outside it: `50px`
(the rating figure), `36px` and `38px` (buy box, loyalty), `8.5px` and `8px` (badge, thumbnail
label), `13.3px` (the browser default on a bare input).

- **Leave it.** Six literals, each meaning «bigger than the scale goes» or «smaller».
- **Change it.** Add `--fs-8` and `--fs-36` / `--fs-50`, or round the literals into the scale.

**Recommendation: add the two ends and round `8.5` to `8` and `38` to `36`.** The 50 is a
display figure and deserves its own token rather than a rounding.

### A5. Values written as numbers where the file next to them uses a token

**Measured.** `18 / 20 / 10 / 26 / 92 / 5 / 68` in the reassurance banner, `12px` and `14px` in
the restock note, `9%` and `74%` in the gallery, `46px` in `.recbanner .rbear`, `116px` and
`292px` and `420px` and `440px` and `540px` and `580px` in four grids, `70px` on a gallery
thumbnail, `52 x 56` on an order line tile.

The space scale is 2 / 4 / 8 / 12 / 16 / 24 / 32 / 40. **Eighteen, twenty, ten, twenty-six and
five are not on it and cannot be tokenised without moving pixels.**

**Recommendation: leave the grid widths as numbers** - a column width is not a spacing rung -
**and decide the five in the banner**, which are the only ones that mean «space» while refusing
to say it in the system's words.

### A6. Four sizes of one product tile

**Measured.** The same «small square with a product photo» is 46 (dashboard preview), 34x38
(order row), 52x56 (order line), 70 (gallery thumbnail). Three are not square. None is a rung
of the size ladder (34 / 38 / 40 / 44 / 46 / 52 / 62).

**Recommendation: two sizes, not four** - a list tile and a gallery tile - and both square.

### A7. Two ways to say «square», two ways to say «the same colour»

**Measured.** `aspect-ratio: 1` on the gallery frame, `70px x 70px` on its thumbnail, in one
file. Separately: the border colour is named in the structure rule and again in the colour
rule, from the same token, in 22 places - the stage-08 split, on purpose.

**Recommendation: `aspect-ratio` everywhere a box is square by intent.** For the 22 split
pairs, **decide once whether the system keeps restating a value to record its provenance.**
Step 7.57 restored one such pair after 7.55 deleted it by accident; the pass has since treated
the duplication as the file's contract. If that is right, it should be written in
`tokens.css`; if not, all 22 go together.

---

## B. Names - Крок 6, after stage 09

Renaming is not a value decision and it moves pixels only by accident. It waits until the
visual language is settled.

### B1. One idea under two names

| the idea | first name | second name | where |
|---|---|---|---|
| an order shown as a row | `.aord-*` (1 instance) | `.oh-*` / `.ord-*` (4) | `account.html` / `account-orders.html` |
| the «default» tag on an address | `.adef .tag` (1) | `.addr-tag` (3) | same two screens |
| the eyebrow | 22 selectors | - | 18 files, see A3 |
| the product tile | `.t` · `i` · `.ph` · `.gthumb` | - | four files |

### B2. One name under two ideas

`.cb` is the checkbox square **and** a certificate block. `.sr` is an order summary row **and**
the prefix of `.sr-live`, a screen-reader live region. `.ci` is an article in the cart **and**
a span elsewhere. `.tag`, `.ct`, `.cur`, `.new`, `.old`, `.cut` each carry two meanings. Ten
names, all measured at 7.36 - 7.39.

### B3. Classes that exist in markup and in no stylesheet

`.ob-main` and `.ob-side`, four instances each on `account-orders.html`, no rule in any file.
They are grid cells and the grid places them, so nothing is broken - but someone looking for
why the left column behaves as it does will look for a rule that is not there.

### B4. Buttons outside the button set - found at 7.61

Step 6.7 replaced 56 bespoke button names with one closed set, and 7.61's census says the set
is not yet closed. Counting only controls whose word is a removal: **17 of them carry no class
from `button.css` at all.** Two forms hold all seventeen - the line remove inside
`.co-line .li-acts`, which `checkout-form.css` paints by hand in six declarations, and the ✕ on
a filter chip. Neither is destructive in the sense of section C, so neither is a defect anyone
can see; both are the exact shape 6.7 existed to end, and a census that asks the same question
of every other word will find more.

**Recommendation for all of B: one pass, one list, after stage 09.** Nothing in it is urgent
and every rename touches both layers. B4 is the one to do first inside that pass: it is a
finish handed to a control that already has one written by hand, not a rename.

---

## C. States that do not exist

Twelve findings across the pass name a state that no screen draws. They are not CSS work: they
are screens, and they belong to whoever decides scope.

| state | where it would go | what happens now |
|---|---|---|
| no reviews yet | `product-reviews.html` | the rating summary has nothing to summarise |
| no purchase history | the restock note on `account.html` | a new buyer sees a block with no rows |
| no addresses | `account-addresses.html` | the list renders empty with no words |
| no orders | `account-orders.html` | the tabs remain above nothing |
| no photo | the gallery | the frame shows «фото товару» in faint ink |
| no composition data | the spec table | the table renders with empty cells |
| section is empty | any `.sech` | 37 heads, 28 exits, nothing says what an empty section shows |
| signal not confirmed | the trust strip | no certificate on the batch and the strip still claims one |
| maximum tier reached | the loyalty rung | exists in grey, not in colour |
| empty bonus ledger | the loyalty ledger | exists in grey, not in colour |
| order cancelled | the order row | the code has three states, the path has at least four |
| ~~irreversible action~~ | ~~«Видалити адресу» and any delete~~ | **CLOSED at step 7.61** |

**Recommendation was: the last one first**, because a destructive action that looks like every
other button is the only entry here that can cost a person something. **Done at 7.61.** The
finish exists: `.btn--danger` is a modifier over `--outline` and `--text`, taking the danger
family that six other components already use, and it lands on the ten controls whose press
cannot be undone. Measured after: nine instances on two of the forty coloured screens, the box
unmoved (140x52 before and after), the grey prototype unmoved, and the confirmation that ships
`disabled` still grey in all four states.

The confirmation DIALOG the recommendation also asked for turned out to exist already, in three
places, built by `wireframes/_nav.js` - `#addr-del`, `#ce-confirm` and the profile one. What was
missing was only the finish. Eleven remaining rows above stay open.

---

## D. Numbers that are `[?]`

`CLAUDE.md` says an invented number poisons every stage below it. These are the ones the
interface currently shows:

- **the consumption cycle** - «зазвичай вистачає на ~30 днів» on the restock note
- **loyalty tier thresholds, the discount percentages and the accrual rate** - every figure on
  the loyalty screen
- **the coach tier percentage**
- **delivery tariffs**

They are drawn as real text on real screens. Before launch each needs a source or a visible
`[?]`.

---

## E. Accessibility, measured

- **The filter panel has no keyboard and no screen reader on the grey side.** The coloured
  layer's `design/_nav.js` gives the 201 checkbox rows a role, a tab stop, `aria-checked` and
  Space (7.34); `wireframes/` keeps the whole defect.
- **Two checkbox mechanisms.** The system's checkbox is a `<span class="cb">` with no input
  behind it, scripted into a control. Two places use a real `<input type="checkbox">` instead -
  the address dialog and the profile delete confirmation - and they draw the operating system's
  box. Neither file says which is canonical. **This is a decision, not a defect.**
- **Gallery thumbnails cannot be reached from a keyboard.** `_nav.js` gives them
  `role="button"` and an `aria-label` and no `tabindex`.
- **Five rules key on a Ukrainian `aria-label` string**: four in `empty-state.css`
  (`section[aria-label="Результати"]`, `section[aria-label="Помилка"]`) and one in
  `section-head.css` (`section[aria-label="Опис"]`). Rename the label and the layout changes.
- **No `:visited` anywhere**, and **no `:active` on chips, switches or the pagination chip**.
- **The accessible name carries a count**: «В наявності 71» reads as one string.

---

## F. Closable in code, today

Two items, both small, both moving pixels, both waiting on a word. **Both closed at step
7.60**, the same step that wrote this file; the A/B measured exactly the two predicted moves
and nothing else - `account-empty.html` +8.00px tall, `account.html` -10.00px.

1. **`design/account-empty.html:81`** carries `style="padding:20px 14px"` on an
   `.emptybox mini`. An inline style outranks every stylesheet, and 20 and 14 are on no scale.
   Removing it returns the component's own `--space-24 / --space-16`. **Visible: that one box
   grows 4px on top and 2px at the sides.**
2. **`.rk-item:first-of-type`** in `restock-note.css` matches nothing - the first `DIV` in the
   card is `.ah`, the header. The neighbouring `:last-child` proves the symmetry was intended.
   The selector that would work is `.rk-lead + .rk-item`. **Visible: the first restock row
   tightens by 10px at the top.** The same off-by-one silently drives the photo alternation,
   which works by accident.

---

## G. Not open - measured and sound, do not re-open

This pass twice spent steps on a shape that turned out to be the system working as designed.
Recorded here so it does not happen a third time.

- **A value stated in the structure section and again in the colour section is not a
  duplicate.** It is the stage-08 split and every file header says so. 22 such pairs. Steps
  7.55 and 7.56 read them as doubled media blocks and 7.57 undid it.
- **A grouped rule followed by a rule for one of its names is not a duplicate.** 32 such pairs.
- **A declaration beaten by its own modifier is not dead.** `.emptybox.mini` over `.emptybox`,
  `:nth-child` over a base tile, `.oh-thumbs i.more` over `.oh-thumbs i`.
- **A declaration beaten by an inline style the script sets is not dead** when the script
  supplies data the stylesheet cannot know - the gallery thumbnails take four different crops
  of one photograph from `_nav.js:918`.
- **`--size-40` is a rung of the ladder.** Step 7.58 called a 40px button «off the ladder»; it
  is `.btn--s` exactly.
- **The grey prototype is not a frozen archive.** All 40 coloured screens load
  `wireframes/_nav.js` for their behaviour. Editing it is a structure change, which is what
  `wireframes/` owns.

---

## H. Housekeeping

- **167 non-standard apostrophes** outside `design/`: `voice` 81, `ia` 44, `research` 24,
  `wireframes` 18. `design/` is clean of both U+2019 and U+02BC.
- **Nine `'Inter', sans-serif` literals** in seven files where `--font-body` exists.
- **75 inline `style=` attributes** in `design/*.html`. Most are data - a rating bar's width, a
  skeleton's height - and belong in markup. The one that is not is item F1.
- **`stack-action.css` has one unbalanced `*/`**, pre-existing at HEAD and harmless.
- **`DESIGN-artifacts.md` figures are stale** - it still lists «card 22 / …» from before 7.36.

---

*Written at step 7.60. Every measurement re-taken on 2026-08-09; where it differs from what an
earlier step recorded, the earlier number is named in the log entry for that step. The stands
point here; this file points at nothing - it is the end of the chain, and the next thing that
happens to it is a decision.*
