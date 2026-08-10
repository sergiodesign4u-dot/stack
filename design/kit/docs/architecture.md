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

**Not done at 7.64, and it is the part that is a decision.** 560, 620, 640, 760, 960 and 1040
each serve two or more files and each marks a content limit rather than a grid step; folding
them is a layout redesign. `restock-note.css`'s 419 stays with a measured reason written next to
it: at 420, 440, 460 and 479 that row does not wrap and does not overflow, so folding it to 479
would stack a row that fits.

### A2's remainder - **CLOSED at step 7.70. The question was about a set that does not exist**

**The remainder was phrased «does the named set gain 860 and 620, or do the components carry a
written reason each?» There is no named set.** `DESIGN-artifacts.md` contains no breakpoint, no
`@media`, no responsive language, and exactly one three-digit px value in its 111 lines - a
contrast measurement inside an accessibility paragraph. The line in `tokens.css` that said
«`DESIGN-artifacts.md` names three of them» was false, and it was the premise of the whole
question. **Seventh stale reading in this sheet, and the first one whose subject turned out not
to exist at all.**

**So the answer is neither branch: the block in `tokens.css` IS the set, and it always was the
only one.** It is now written as such - eleven boundaries, each with the files that lean on it,
and `[?]` wherever nothing in the source says why the number is what it is. A boundary the
system cannot justify is at least a boundary the system has counted.

**The set re-measured at 7.70: 11 boundaries, 110 width features, 76 stylesheets.** 7.64
recorded «18 boundaries, 112 features»; its own printed table lists 12 after its two folds, so
18 was wrong when it was written.

**One fold was left, and it is 7.64's own rule applied to the case it skipped: 900 to 860.**
That step folded `order-row`'s 820 into 860 because a boundary used by one file with a set
member 40px away is not a decision. `checkout-form.css` was the only user of 900 - four
declarations - and 900 is the same 40px on the other side. **Measured before folding**, at 860,
870, 880 and 899 on all five checkout screens: no sideways scroll, nothing newly clipped, and
the form column comes out **444** beside the money box's fixed 360. The band gets 410 to 584px
**shorter**, because that is what a second column is for. A/B at band widths (840 / 860 / 880 /
899 / 900 / 960): **null 0, 3094 rows on exactly nine page-widths - the three checkout screens
at 860, 880 and 899 - and every property that moved is layout.** Nothing at 840, 900 or 960.

**Nothing else folds.** 560, 620, 640, 760, 960, 1040 each serve two or more files: a boundary
two files agree on is a decision, not drift. 1040 is the one pair that MUST agree - the
catalogue grid and the skeleton that stands in for it - and step 7.68 is what happens when such
a pair drifts apart.

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

### A4. The type scale - **CLOSED at step 7.66.** It was missing a floor, not both ends

**The entry was wrong three ways, and the browser said so.**

1. **«The scale runs `--fs-10` to `--fs-30`»** - it runs to **`--fs-34`**. Nine rungs, all nine
   in use: 10 (30 declarations), 12 (134), 14 (177), 16 (44), 18 (20), 20 (34), 24 (19), 30 (14),
   34 (1).
2. **«Six literals»** - there were **twelve raw `font-size` declarations, eight distinct values**,
   plus thirteen `font-size: 0`, which is not a size but the trick that kills a text node. The
   entry missed `13px`, `11.5px` twice and `60px`, and listed `13.3px`, which **exists nowhere in
   the code** - it is a browser default rendered on a bare input, not a declaration.
3. **«Add the two ends»** - only one end is a rung.

**The floor is real, so it was added.** `--fs-8` now carries three declarations: the label in an
order thumbnail, the one in a certificate thumbnail, and the «Новинка» tag on a list card, which
was written `8.5px`. **Half a pixel is not a step and a scale cannot hold one.**

**The ceiling is not a rung and that is the answer.** Five literals live above 34 and they are
five different jobs, one use each except a coincidence:

| | | |
|---|---|---|
| 36px | `.bb .new` | the live price in the buy box |
| 38px | `.acc .big` | the bonus figure in the account |
| 38px | `.hpromo .hph` | the first promo headline in the hero strip |
| 50px | `.rvbig .n` | the rating figure over the reviews |
| 60px | `.sys-code` | the 404 numeral |

`tokens.css` already states the rule that governs them, written at 5.9 about alphas: **«a value
used once is a value, not a token»**. A display figure is sized to the block it heads, not to a
rung it would share with body copy, and the two 38s are a coincidence between an account and a
hero. Adding `--fs-36` and `--fs-50` would mint tokens with one use each and still leave 38 and
60 outside. They stay literal on purpose, and `tokens.css` is where that purpose is now written.

**Three more literals folded into rungs that already existed:** `.coachbox .cbh` and `.cbsave`
from `11.5px` to `--fs-12`, and `.cbnote` from `13px` to `--fs-14`, which is what every other
note in the product is set at. **Twelve raw declarations became six**, and the six are the five
display figures plus `price.css`'s `.55em`, which is deliberately relative - the currency mark
is a fraction of the price it stands beside, and it measures 11, 13.2, 16.5, 19.8 and 20.9 on
five different prices, correctly.

**One thing this opens.** `.cbh` is now 12, uppercase, Inter, `--ls-caps` - which is the eyebrow
face 7.63 defined, and it could not qualify while its size was off the scale. It does not take
the family's ink: the eyebrow is `--text-muted` and this one is `--text-primary` on a surface
plate inside a bordered box. Whether the coach box is quiet enough for muted is a look, not a
size.

### A5. Numbers where a token exists - **CLOSED at step 7.67.** There were three groups, not one

**Measured.** 948 spacing declarations in the component layer; **1092 of their value parts read
a token.** What was left raw came to **33 declarations**, and they are three different things.

**Group one - a literal where the EXACT token already exists.** Five declarations:
`padding: 16px` standing next to `--space-16`, `margin: 16px 0 4px`, `margin: 16px 0 2px`,
`padding: 3px 8px`, `margin-top: 12px`. **A5 did not mention this group at all**, and it is the
only one that costs nothing: substituted, and the A/B cannot see it.

**Group two - air that refused to say so.** Six declarations in the reassurance banner and one
on the out-of-stock back link: 5, 10, 14, 18, 20, 26. **Every one of them stands one to four
pixels above a rung**, so the rule is **round down to the rung** - one rule instead of six taste
calls, and the panel gets calmer rather than louder, which is design principle 4.
18 to 16, 20 to 16, 14 to 12, 10 to 8, 26 to 24, 5 to 4.

**Group three - clearance, which is not spacing at all.** This is why the rest stays raw, and
it is the part A5 got closest to with «a column width is not a spacing rung». A clearance is
another element's height or width, written as padding so content can slide under it:

| | | |
|---|---|---|
| 132px | `buy-bar.css` | room for the fixed buy bar |
| 100px | `base.css` | room for the fixed header |
| 60px | `base.css`, `cart-drawer.css` | room for the tab bar, and for the drawer footer |
| 310px | `seo-text.css` | room for the bear |
| 150px | `trust-strip.css` | room for the shelf mark |
| 54px | `auth-dialog.css` | room for the close |
| 46px | `product-card.css` | room for the heart |

**A rung would make these wrong, not tidy.** They answer to another element's size and they
change when it does. They are values, not steps, and `tokens.css` now lists them so the next
pass does not read them as drift.

**What is left after all three:** the coach box's own 15/17, 3/7, 7 and 10 - one component drawn
before the scale existed, whose type already moved at 7.66. That is a look, taken with the box
open, not a sweep.

### A6. The product tile - **SHAPE closed at step 7.68, SIZE still open.** It was nine names, not four

**This entry was wrong in both of its claims, and both were wrong the same way A1, A3, A2, A4
and A5 were: counted from a reading of the source, not measured in a browser.**

**Correction 1 - it is nine names in seven files, not four.** Every box in the product that
frames a product photograph, rendered:

| box | rendered | shape | how the size is written | file |
|---|---|---|---|---|
| `.oh-thumbs i` | 34 x 38 | 0.895 | `var(--size-34)` / `var(--size-38)` | `order-row.css` |
| `.cshelf .cs-th` | 40 x 40 | square | `var(--size-40)` | `trust-strip.css` |
| `.aord-thumbs .t` | 46 x 46 | square | `var(--size-46)` | `order-row.css` |
| `.rk-ph` | 46 x 46 | square | `var(--size-46)` | `restock-note.css` |
| `.ob-line .ph` | 52 x 56 | 0.929 | `52px` / `56px` | `order-row.css` |
| `.pcard-l .lph` | 84, 56 under 560 | square | `84px` / `56px` + `aspect-ratio: 1` | `product-card.css` |
| `.co-line .li-img` | 60 x 60 | square | `60px` | `checkout-form.css` |
| `.gal .gthumb` | 70 x 70 | square | `70px` | `gallery.css` |
| `.ci-ph` | 74 x 81.39 | 0.909 | `74px` + `aspect-ratio: 10/11` | `cart-row.css` |

**Correction 2 - «none is a rung» is false.** Four of the nine are written as ladder tokens
(34, 38, 40, 46, 46) and a fifth, `.ob-line .ph`, was a rung written as a literal. Five are
literals off the ladder: 52 (now a token), 56, 60, 70, 74, 84.

**What the entry never looked at: the big photo.** `.pcard .ph` was `10/11` at the base, `1/1`
inside `@media (max-width:619px)`, and `1` again inside `.pmini` - one element, two shapes,
decided by width. Measured across the product, 91 of its instances rendered square at 171 and
82 rendered 10/11 at 244-246, so the majority of the product's card photos were already square.

**SHAPE - closed. The photograph is 2048 x 2048** (read from the PNG headers of all three), and
every box paints it contained, `center/74%` to `86% no-repeat`. So a frame that is not square
leaves uneven air around a square subject: at 1280, a 196.8 photo inside a 246 x 270.59 box,
24.6 beside it and 36.9 above and below. `10/11` came from `wireframes/_wf.css:482` at stage 04,
**before any photograph existed**, and `DESIGN-artifacts.md` has no entry for it - its origin is
`[?]`. It is a wireframe placeholder that nobody re-decided when the photos landed.

**The rule, written into `tokens.css` under the size ladder: a box that frames a product
photograph is square, because the photograph is.** Five boxes squared - `.pcard .ph`,
`.skcard .skimg`, `.ci-ph`, `.ob-line .ph`, `.oh-thumbs i` - and **two declarations deleted
rather than added**, because the two overrides that already said `1` now restate the base.
Squared on the width and never on the height: width is what a row packs and what a grid column
already states, height is free.

**The defect this closes, which A6 does not mention.** `.skcard .skimg` was `10/11` with no
override, so under 620 the loading skeleton promised a shape the card does not draw: measured at
390, **171 x 188.09 against 171 x 171, a 17px jump on load** - on the phone, where 91 of the
171-wide cards live.

**Not in the rule: a banner is not a tile.** `.hdeal .hd-ph` (fluid, `min-height:180`),
`.cart-behind .ph-card` (150 tall behind the drawer) and `.pd-img` (`16/6`, a description band)
also frame a photograph and are shaped by their slot, not by their subject.

**SIZE - still open, and it is the owner's.** Nine names, eight sizes: 34 / 40 / 46 / 46 / 52 /
56-84 / 60 / 70 / 74. Nothing in the source says why a restock line's tile is 46 and a checkout
line's is 60, so folding them would be taste, not measurement. Two observations that belong to
whoever decides: `.aord-thumbs .t` and `.rk-ph` are the same rule at 46 in two files, and
`.ci-ph` carries `--radius-12` where the other eight carry `--radius-8`.

### A7. Two ways to say «square», two ways to say «the same colour» - **CLOSED at step 7.69.** One half was never a defect and the other was bigger than the number

**Half one - «two ways to say square» is two kinds of box, not two spellings.** Measured over
every component stylesheet: **5 rules say square with `aspect-ratio: 1` and 110 say it with two
equal numbers.** The line between them is not habit. All five `aspect-ratio` rules are boxes
that **do not choose their own width** - `.gal .gmain`, `.pcard .ph` and `.skcard .skimg` have
no width at all, `.ci-ph` takes its 74 from the grid column `article.ci` sets, `.pcard-l .lph`
changes from 84 to 56 at 560. All 110 of the others own one fixed number, and they are glyphs,
avatars, spinners and controls, where `width` + `height` is the only spelling that sizes an
`<svg>` at all. `gallery.css` holds one of each because it holds one fluid box and one 70px
thumbnail. **Applying the recommendation literally would rewrite 110 rules and make most of them
worse.** The rule is written in `tokens.css` and nothing was edited.

**Half two - it is 55 declarations in 21 files, not 22, and 22 is the number on the other side
of the same measurement.** Parsed with shorthands expanded, because the structure side writes
`border: 1px solid var(--line-hair)` and the colour side writes `border-color:
var(--line-hair)` - comparing property names alone finds three:

| | |
|---|---|
| the two sides say the same thing | **55** (34 `border-color`, 9 `border-*-color`, and the rest) |
| the colour side genuinely overrides | **22** |

**What settles it: the restatement covers 16% of the colours, so it cannot be the record of
provenance it was taken for.** The structure side names a colour **328** times; 54 are restated
identically, **274 travel inside a shorthand and are never mentioned in the colour block**.
Only seven files restate everything they name, and each of those names one to three. Completing
the inventory means **adding 274 lines that draw nothing**; the other consistent world is 55
lines shorter, and that is the one taken. A/B: **null 0, difference 0** over 40 screens at four
widths.

**Two things that look like restatements and stay, both found by the A/B rather than by
reading.** A colour after a **reset**: `.acc-links` carries the shorthand in structure, `border:
0` in a `max-width: 959px` query - which returns the colour to currentColor - and the colour
block puts `--line-hair` back. Nothing paints there, the width is 0, but the line is a
restoration and a rule that removes duplicates must not remove restorations. And a colour that
**differs**: the 22 are the whole point of the block - `--line-strong` relaxing to
`--line-hair` in seven places, the mega menu's top edge going `--line-inverse` to
`--line-action` in three.

**The 73 in `product-card.css` was the file count.** That comment says «all 73 such pairs»;
there are 73 component stylesheets, 45 of which have a colour section. Corrected in place.

**Opened by this step and CLOSED at 7.71, and there were 17 of them, not 11.** A declaration
inside a `@media` that restates, value for value, what the base rule above already has in force.
7.69 found 11 because it was looking only inside the colour section and comparing only against
the colour section's own base; the pass of its own re-measured across the whole file and across
both halves: **17 in 8 files** - `product-card` 5, `order-row` 3, `trust-strip` 3,
`account-shell` 2, `banner` 1, `buy-box` 1, `spec-table` 1, `menu` 1. **A/B: null 0, difference
0.** A query that changes nothing reads as a decision about that width and is not one.

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
- **Gallery thumbnails cannot be reached from a keyboard** - **CLOSED at step 7.72.** Measured
  before the fix on the three product screens: **12 thumbnails, 12 with `role="button"`, 12 with
  an `aria-label`, 0 with a tab stop and 0 with a key handler.** A role is a promise about what
  a control does, and this one announced a button nobody could press. The four on
  `product-loading.html` are `.skpulse` skeletons with no role and no focus **on purpose** - a
  placeholder must not be focusable. Given `tabindex="0"` and Enter/Space. Verified by keyboard:
  before, `.focus()` returned index **-1** and Enter did nothing; after, focus lands on the
  third thumbnail and Enter moves `on` from 0 to 2 while the main photo's `transform` goes from
  `none` to `1.75`. **Not converted to `role="tab"`**, which would read more accurately - that
  is a behaviour decision, not a repair.
- **Five rules key on a Ukrainian `aria-label` string** - **CLOSED at step 7.73, and they were
  asking the wrong question.** An interface sentence used as a selector, and voice owns that
  sentence. What they were reaching for, measured: `.ei` appears **seven** times in the product
  and four of them are an emoji glyph - a box, a heart, a warning, a trolley. The other three
  hold a **photograph**, every one of those three is inside one of the two labelled sections,
  and no `.empty .ei` anywhere else is. The label was standing in for one plain fact - **this
  illustration contains an image** - and `:has(img)` says it, cannot be broken by a rename and
  needs no class. The `.sech` rule was the same shape: `desc-block.css:14` already gives
  `.pdesc` the identical `max-width:800px; margin-inline:auto`, so the rule means «the head of
  the description column takes the column's measure», and `.sech:has(+ .pdesc)` says that.
  **A/B: null 0, difference 0.**

  **What the two label rules were hiding.** They were byte-identical apart from two numbers -
  126/118 and `--space-8`/`--space-4` - for the same round face, in the same box, doing the same
  job, from two assets that are both **1024 x 1024 with the same framing**. The shared rule takes
  118 and `--space-4`, which two of the three already draw; the third keeps its own in one line
  and one class, so nothing moved. **Whether that line should exist is the owner's** - it is A6's
  shape at a smaller scale: one idea, two numbers, no stated reason.
- **No `:visited` anywhere** - still true. **«No `:active` on chips» is FALSE**: `chip.css:153`
  carries `.chip:active, .dr-chip:active, .hero-chips a:active, .flink:active, .mgchip:active,
  .ptab:active, .ord-tab:active, .cegoals button:active, .afilter .x:active`, and `:220` the
  same set in `.on`. A later step closed it and did not update this line. It stays true for the
  **switch** (`switch.css` has no `:active` at all) and for pagination.
- **The accessible name carries a count** - **CLOSED at step 7.72.** Confirmed to the letter:
  `wireframes/_nav.js:1791` builds `<label class="fopt"><span class="cb"></span> LABEL <span
  class="ct">N</span></label>` and a label's accessible name is its whole text. Announced, that
  is «в наявності сімдесят один» - a value, not a tally. **Fixed with a comma and nothing else:**
  the count is hidden from the name and put back into an explicit `aria-label` assembled from
  the same two visible strings. **No word is invented here** - interface wording belongs to
  `voice/docs/microcopy.md`, not to a behaviour file; the edition that says «71 товар» reads
  better, needs a plural rule (71 товар, 13 товарів) and therefore waits on voice. Measured
  after: **50 filter rows, all 50 named, «В наявності, 71»**, visible text unchanged.

- **How focus is painted - NEW, found at 7.72.** The new tab stops made it worth asking what
  draws focus anywhere. Census over the 40 screens, **visible elements only: 3898 focusable.**
  The system's own ring on **1244 (32%)**, Chrome's default blue on **2591 (66%)**, nothing on
  63. **The first run of this census returned 14 989 elements and «74% with no ring»** - almost
  all of it the closed mega menu and the closed drawer, because a hidden element cannot be
  focused and its computed style is a default. Corrected in the instrument. **The real finding
  is the 66%:** the system declares `--ring-focus` and `--ring-focus-control` and two thirds of
  its focusable elements take the browser's. The 63 are NOT claimed as a defect: a programmatic
  `.focus()` legitimately suppresses `:focus-visible` on some elements, so they need a
  Tab-driven pass, which is a different instrument.

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

- **Non-standard apostrophes** - **CLOSED at step 7.74.** It was **168, not 167**, and
  `design/` was **not** clean: one sits in `kit/docs/btn-census.json`, inside a recorded
  measurement string. The rest are `voice` 81, `ia` 44, `research` 24, `wireframes` 18, and every
  one of them is inside Ukrainian prose - *з_явиться, п_ять, обов_язковий, зв_язки* (the `_` standing for U+02BC) - where U+02BC
  is a common typographic choice and the project's rule says otherwise. `voice/microcopy.html`
  had already flagged the split in its own words: «Здоров'я» проти «Здоров_я» з U+02BC (різний апостроф!).
  Replaced character by character: **168 replacements in 34 files, 158 changed lines, and on
  every line the only difference is the apostrophe** - verified by comparing the minus and plus
  sides of the diff. None left anywhere in the repository.

- **`'Inter', sans-serif` literals** - **ALREADY CLOSED, and this entry was wrong in both
  halves.** Not «nine in seven files where `--font-body` exists» but **nine in five files, and
  `--font-body` exists in none of them.** Seven are on `design/concept/*` pages, which do **not**
  load `system/index.css` - only `_nav.css` and the font from Google - so there the literal is
  the only way to say it. The other two are **prose inside `<code>`**, on this sheet's own page
  and on the «Наявність» stand, describing the finding. **No component file carries it any
  more**: some later step folded them and the record still said otherwise in three places -
  here, on `architecture.html`, and on a stand that was **telling a reader something false**.
  Corrected in all three.

- **74 inline `style=` attributes**, not 75, in 23 files - most in `account-loading` (12) and
  `product-loading` (7), which are skeleton heights. The judgement «most are data and belong in
  markup» stands; the one that is not was item F1.

- **`stack-action.css` has one unbalanced `*/`** - **FALSE.** The file is balanced, 15 `/*`
  against 15 `*/`, and the structural check every step has run since 7.68 returns zero
  unbalanced across all 76 stylesheets. The line was either stale or never true.

- **`DESIGN-artifacts.md` figures** - **CLOSED at step 7.74. The conclusion holds and every
  figure was stale.** The gate - accent on a price only from 19px bold - is intact. Measured on
  all **eight** carriers, taken from the **one** rule that paints a price with the accent
  (`price.css:166-174`) rather than from guessed selectors:

  | carrier | 390 | 1280 |
  |---|---|---|
  | grid card | 20/700 | **24**/700 |
  | list card | 20/700 | 20/700 |
  | deal | 30/700 | 30/700 |
  | buy box | 36/**600** | 36/600 |
  | pdp tab | 20/700 | 20/700 |
  | buy bar | 20/700 | 20/700 |
  | cart row | 20/700 | 20/700 |
  | checkout line | 20/700 | 20/700 |

  **Of the five figures the doc named, one survived** - «buy box 36». «shelf 19» names a carrier
  that no longer exists, and three real ones - the pdp tab, the cart row, the checkout line - are
  missing from the list. The buy box clears the gate **by size and not by weight**: 600 is not
  bold, but 36px is large text by WCAG regardless of weight.

---

*Written at step 7.60. Every measurement re-taken on 2026-08-09; where it differs from what an
earlier step recorded, the earlier number is named in the log entry for that step. The stands
point here; this file points at nothing - it is the end of the chain, and the next thing that
happens to it is a decision.*
