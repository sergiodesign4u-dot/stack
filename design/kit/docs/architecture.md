# Architecture: the decision sheet for stage 09

Forty-seven stands in `design/kit/` end with the same sentence: «stage 09 starts from this
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

### A10. The accent-on-text gate - **enforced for the first time at step 7.81, and the rule is wrong in both directions**

`DESIGN-artifacts.md` locks it: accent on TEXT only from **19px bold**, because `#FF5A00` on
white is 3.13:1, which is AA for large text only. Step 7.74 applied it to the price. **Nothing
else had ever been checked against it.** Measured now on every element the browser paints
`--text-action` that owns visible words - 16 shapes across the 40 coloured screens, each read
against the surface it actually sits on, with alpha composited:

| shape | n | size/weight | surface | ratio | WCAG | the gate |
|---|---|---|---|---|---|---|
| `.badge` «еталон» | 28 | 10/600 | `rgb(255,245,240)` | **2.91** | **fails** | below |
| `.acc-link` «Адреси» | 8 | 14/600 | `rgb(250,249,247)` | **2.97** | **fails** | below |
| `.more` «Читати більше» | 8 | 14/700 | white | **3.13** | **fails** | below |
| `.addr-tag` | 2 | 10/700 | white | **3.13** | **fails** | below |
| `.cbnew` | 2 | 30/600 | `rgb(250,249,247)` | **2.97** | **fails** | below |
| `.hptag` «Акція тижня» | 8 | 12/500 | `rgb(28,28,28)` | 5.45 | passes | below |
| `.big` · `.new` | 8 | 38/600 · 36/600 | white | 3.13 | passes (large) | below |
| eight money shapes | 72 | 20-30 / 700 | white | 3.13 | passes | clears |

**Five shapes fail AA - 48 instances.** The biggest is `.badge`, 28 of them at 10px on a warm
surface.

**And the gate as written is both too strict and too lenient.** `.hptag` is 12/500 and reads at
**5.45:1** because it sits on near-black; the rule forbids it along with everything else, because
the rule talks about SIZE when the thing that decides is the SURFACE. In the other direction,
`.cbnew` is large text by WCAG and still fails, at **2.97**, because it sits on `--bg-surface`
rather than on white - and the rule says nothing about the warm surfaces, which cost 0.16.

**Three ways out, all of them a value decision:** raise the size, drop the accent, or keep it
with a written exception. Not taken by a showcase step - the rule is locked in
`DESIGN-artifacts.md` and it changes out loud, «variable -> value -> why».

---

### A11. The grey prototype scrolls sideways at 720 - **found at 7.84, and the cause named at 7.84 was the wrong one**

**The question was wrong first.** "Is any element wider than the viewport" is not the question:
inside a horizontal scroller that is normal and intended, and the 7.84 sweep counted those. The
question is whether the PAGE scrolls, `documentElement.scrollWidth > innerWidth`. Re-measured that
way at 7.86 across both layers, 182 pages x 5 widths: **137 of 910 pairs scroll, and 129 of them
are exactly the width 720.**

**And the causal test is clean.** Of the 53 pages that pass at 720, **24 have no footer grid at
all** and the other 29 are coloured. No grey page with a footer survives 720; no coloured page
with a footer fails it. The footer is the whole of it.

**The cause, third attempt, measured to the number.** At 720 the same markup lays out as
`254.1 105.6 80.7 74.3 164.2` in grey and `149.8 116.4 92.9 92.9 172.1` in colour. The entire
difference is the FIRST column - 254 against 150 - which is the newsletter column, and its
`min-content` really is 254 in grey and 150 in colour, the input contributing 149 against 26.

**7.84 named `.wff-phone` and that was wrong.** 23px bold with `nowrap` is the outermost element
that *overflows*, not the thing that *causes* it: the phone column measures 164 in grey and
**172 in colour**, so it is wider in the layer that does not break. Naming the outermost
overflowing box as the cause is the same mistake in a different coat as counting scroller
children as overflows: both read the symptom off the screen and stop.

**Still not taken, and now for a better reason.** Both inputs compute `flex: 1 1 0%` and
`min-width: 0px`, so the difference is not in those two declarations and the next measurement has
to be of the input's intrinsic contribution rather than of what it declares. When that is known,
the fix is a **transfer** from the layer that already works, not a value invented here - and
"values move, they are never re-derived" is exactly the rule that says to go and read it.

---

### A12. The organism layer's real defect is that a class name does not say which file owns it

**126 of the system's 913 class names are declared in more than one component file.** Measured at
7.86 by reading all 73 component stylesheets. Some of that is legitimate reuse and says so:
`.uiv-ic` in 21 files is the icon primitive, `.on` in 18 and `.open` in 12 are shared state words,
`.btn--accent` in 4 is the button appearing inside other components. The rest is collision, and
the collisions are all **short generic names**: `.ar` in 7 files, `.x` in 5, `.ct` in 5, `.m` in 4,
then `.ok`, `.ph`, `.ic`, `.sub`, `.ci`, `.tl`, `.cnt`, `.nm`, `.old`, `.bb`, `.lt`.

**What it costs, measured.** Across the 22 organisms that render, **78 child classes inside an
organism's root have more than one owner**, so the composition table of every organism stand is
partly unreadable: from the code you cannot say whether a `.ct` inside the account rail belongs to
`account-shell`, `chip`, `client-row`, `counter` or `filter-group`. Worst cases: `hero` 13
ambiguous children, `product-grid` 14, `auth-dialog` 10.

**And it is a floor, not a total.** The census compares stylesheet against stylesheet, never
stylesheet against markup. `.dn` is one owner in the map and two meanings in the product - the
danger note under "Видалити клієнта" in `client-dialog.css`, and `<span class="dn">Нова Пошта</span>`
on three checkout screens with no rule anywhere. A name used in markup by a second component and
never styled there is invisible to this measurement.

**One live consequence, and it was fixed at 7.86:** `footer.css:38` declared
`.fh .ar{ transition:transform .18s ease }`. It matched **280 elements and won on none of them**,
because every one of the 280 sits inside `.fgroup`, where `filter-group.css` says the same thing
20ms longer with one more class. The footer draws no arrow at all. The declaration was in the
wrong file, changed nothing on screen, and only the solver could see it. Removed.

**Not a rename step.** Renaming is Крок 6, after stage 09. What belongs here is the measurement
and the rule it implies: **a component may only declare a name it owns, and a name it does not
own it may only compose.**

---

### A13. Ten of the 24 organisms are not fully in the coloured product, and one is not in it at all

Measured at 7.86, per file, three different facts that had been living as one:

| organism | what is true |
|---|---|
| `system-page` | **16 classes, 0 coloured screens, 0 runtime builders.** Its markup exists on `wireframes/404.html`, `500.html`, `maintenance.html`, `system.html` - four grey screens with no `design/` twin. `index.css` imports the file on all 40 coloured screens and it draws nothing. It also has **no colour block at all**, though its own header promises one |
| `cookie-banner` | 20 classes, 0 coloured screens. The placeholder `id="wf-cookie"` exists on exactly ONE file in the repo, `wireframes/system.html`. The footer still offers «Змінити згоду» on 31 coloured screens, and its handler falls back to `location.href='system.html'`, which `design/` does not have |
| `cat-overlay` | 14 classes, 0 coloured screens, and its markup is in **no html file in either layer**: `wfCatOverlayEnsure()` creates it on the first tap |
| `client-dialog` | `.cedel` cannot reach colour: `wfClientEdit()` is called only from five `wireframes/coach-*.html` |
| `account-shell` | 15 own classes off the coloured layer, and they are **four different kinds**, not one: 11 are the prototype's own screen-registry table (`.wt-*`, built by `wfTree`), 2 exist in no HTML anywhere, 1 is on a single grey screen, 1 is the coach's rail |
| `buy-box` | `.qty` and `.tier` are product decisions left in the file - the stepper the markup's own comment says was dropped, and a tier block superseded by `.coachbox .cbtier` |

**And the fact under all of them.** The coloured layer is **40 screens; the grey prototype is
142**. The 42 coach screens have **no colour at all** - and the coach is this product's primary
audience, the channel CLAUDE.md says decides when two decisions conflict. Six of the 24 organism
files have no colour block whatsoever (`cat-overlay`, `city-dialog`, `client-dialog`,
`cookie-banner`, `nav-drawer`, `system-page`).

**This is a scope decision and it is the owner's**, not a defect to sweep: either the coloured
layer grows to the flows that matter, or the files that serve only grey screens are held until it
does. What must not continue is polishing a component to the pixel on 40 screens while the
primary audience's whole flow has no colour to polish.

---

### A14. A stand was right in words and wrong in pixels - CLOSED at step 7.91, and it took the owner to find it

Step 7.90 took `btn--l` off the cart drawer's primary in `design/cart.html` and
`design/cart-oos.html` - the two product screens that draw the foot - and reported 64 -> 52 with
the height measured on both. The owner opened `design/kit/cart-drawer.html`, the stand for that
organism, and the button was still 64.

Both statements were true. **The stand carries its own copy of the markup**, lifted from
`design/cart.html` when the stand was generated at 7.86, and the demo frame carries a third. A
change written into markup does not travel; a change written into a rule does - which is what
CLAUDE.md already says («fix through a rule, not by hand-editing one file: a hand fix does not
survive the next clone»), and 7.90 wrote a hand fix into two files out of four with a stated
reason. The reason still holds: the size of a control is chosen by its caller, and a component
reaching in to resize an atom is the shape this stage spent eighty-nine steps removing. What was
missing is not the rule but **the check** - nothing in the harness ever asked whether a stand
still matches the product it photographs.

And the worst of it is not the stale pixel. The stand's own prose, three lines under the demo,
already read «L -> M, 64 -> 52». **The page contradicted itself, and the render was the wrong
half.**

**The check, written and run.** For every element carrying a `btn*` class - `design/*.html` on one
side, `design/kit/*.html` and `design/kit/demo/*.html` on the other - key it by its own
distinctive class and compare the set of `btn*` classes. It is a photograph test, not a style
test: it asks whether a stand shows the size and the finish the product shows. It found **three
more, all real, all fixed:**

| where | the stand said | the product says |
|---|---|---|
| `kit/toolbar.html` | `.mc` as `btn--outline btn--s btn` - **S, 40px** | `btn--outline mc` - **M, 52px**, and BOTH buttons of the row carry `.mc`, which the stand had dropped from the second. The stand's caption said «висота 77» while its demo rendered shorter |
| `kit/restock-note.html` | `.oosbtn` on the contact row's outline submit | `.oosbtn` is the **accent** «🔔 Повідомити про надходження» in `.buyrow`; the contact row's submit carries no name. The stand was showing an outline button under the accent one's name |
| `kit/button.html` | the writing-guide snippet `btn--accent btn--l co-confirm` | `btn--accent btn--l btn--full co-confirm` - the example omitted the width the product actually uses |

**What the check does not do, said out loud:** buttons only; it keys on the first distinctive
class, so an element with none is skipped; and it treats `design/*.html` as «the product», so
markup a script builds at runtime - `cat-overlay`, the city dialog, the toasts - is outside it.
36 product keys carry a button and those are the ones covered. After the four fixes: **0 drift
rows.**

**And the sweep that came out of it: every stand, both widths, asked two questions.** The
7.88 sweep opened the 24 organism stands. This one opened **all 83 pages in `design/kit/`** at 390
and 1280 - 166 loads - and asked of every `.kp-demo` block: does it paint anything, and does
anything inside it sit outside its own box?

**Blank, 3 rows, 2 real:**

- **`icon.html`, the anatomy demo, at both widths.** Three text glyphs - `&#9733; &#9679; &#9662;` -
  inside `.uiv-ic`. Measured: widths 22, 20 and 10, **height zero**, so the demo was 50px of padding
  and nothing else. That is the atom behaving correctly: `.uiv-ic` is `display: flex` with
  `line-height: 0` and takes its size from the **SVG inside it**, which a text character does not
  provide. The page's own first line says «обгортка навколо inline-SVG» - **the demo contradicted
  the lead.** Rebuilt on `data-glyph`, which `icons.js` fills, the same path a glyph takes on a
  shop screen. Fixed.
- **`view-toggle.html` at 390.** `.vtoggle` lives in `.ltool`, the desktop toolbar, which is
  `display: none` below 860 - so on a phone the demo draws nothing and **the product behaves the
  same way**. Not a defect; an unexplained blank. Said on the stand instead of masked.
- `toolbar.html`'s mobile bar was the third, found separately and fixed with a frame (below).

**Container overflow > 4px, 18 rows, and they are five shapes, not eighteen:**

| shape | rows | what it is |
|---|---|---|
| `.sech +8` | 6 | `button`, `qa-item`, `section-head`, both widths. Already in the 7.89 container-fit inventory as a known shape |
| `.lprice-col +37 / +12` | 3 | `product-card`, `discount`, `price` at 390. **A real product defect, not a stand artefact** - below |
| `.btnset +18` | 1 | `button` at 1280, and it is **identical on the HEAD baseline** - 906 client, 924 scroll on BOTH servers. Pre-existing |
| `.lfav +6` | 1 | `product-card` at 1280. The heart's `::after{ inset: -12px -6px -12px -13px }` - the documented 18x20 -> 37x44 touch target reaching outside its own box on purpose |
| unchecked | 7 | `badge` `.lph`, which read **+13 on one pass and +16 on the next** - the only row in the sweep whose number moved, and unexplained, `skeleton` +10 on an unclassed div, `stack-action` `.ti +9`, `trust-strip` `.cs-th +6` (already in the 7.89 list). **Not checked one by one, and said so rather than counted as clean** |

**`.lprice-col` is a product defect and the numbers are the same in both layers.** `.pcard-l` is
`grid-template-columns: 84px 1fr auto auto`; at 559 and below it becomes `56px 1fr`, so its four
children wrap and **the price column lands in the 56px photo track**. Measured on
`design/listing-list.html` at 390 - the product, not a stand: the column's `clientWidth` is **56**
and its `scrollWidth` is **93**, because «1 520 ₴ −15%» needs 93 and the column declares
`white-space: nowrap`. Identical numbers on `design/kit/product-card.html`. It does not scroll the
page - the text paints out over the actions cell beside it - so it has been invisible to every
sweep that asked about the page rather than the box.

**Not fixed here, and deliberately.** Every straightforward repair moves a track that is shared
with the photo row: `minmax(56px, auto)` widens the photo column to 93 and pushes the title 37px
right; `grid-column: 1 / -1` puts the actions on a third row and makes every list card taller.
This is a layout decision with a visible cost either way, it is not a regression from this step,
and inventing it at the end of a step about clone drift is exactly how a value gets into the
system without anybody deciding it. **Stage 09, as a decision.**

**And a blind spot the check has, found while fixing what it found.** It keys an element by its
own distinctive class, so an element whose distinctive class the STAND DROPPED is invisible to it:
`.ltool`'s sort button was spelled `btn--outline btn--s btn` on the stand and
`btn--outline btn--s ctrl` in the product - same render, since neither `.btn` nor `.ctrl` declares
any geometry, but a different name, and the check could not see it because `btn` is filtered out
of the key set. Found by hand. Aligned with the product, together with `.count`, which had lost
`ctrl` the same way.

**One claim under it turned out to be wrong too.** The toolbar stand said the two bars differ by
20px because of padding, «both hold `btn--s`, i.e. a 40 box». The mobile half was false. Measured
in `design/listing.html`: 57 = 1 dashed hairline + 16 padding + **40** control; 77 = 12 + **52**
control + 12 + 1 hairline. The twenty is 12 of bottom padding plus 12 of a bigger control minus 4
of smaller top padding - and under the arithmetic sits a decision the code makes and never states:
**the phone's toolbar controls are M and the desktop's are S.** The bigger target is on the device
that gets touched. Now written down.

**One value moved with it.** `.cd-cont` still wore `btn--l` after 7.89 turned it into a link. Of
the four things `btn--l` declares - `min-height: 64`, padding, `border-radius: 12`,
`font-size: 18` - the foot's own rule overrode the first three, so **only the font size still
landed**, and on desktop the secondary link read at 18 while the primary above it read at 16.
Variable -> value -> why: `font-size` on the drawer's secondary, **`--fs-18` -> `--fs-16`**,
because the control stopped being a button at 7.89 and a size class that lands one property out of
four is a declaration pretending to be a decision. Measured after: 16px at 320, 360, 390, 430 and
1280.

**The foot, re-measured on the same 700-tall viewport as every earlier number:** 207px in
`cart.html` at all five widths, 254 in `cart-oos.html` with its extra note, primary 52, secondary
39, and `scrollWidth - clientWidth` **0** on the foot, on the drawer and on the page. **The
stand's frame now reads 207 / 52 / 39 - the same three numbers as the product.**


---

### A15. Two defects the owner found on a phone, and both were «which things get X» answered by hand - CLOSED at step 7.92

**«Tapping Каталог does not highlight it», and «the top bar covers the close and back buttons».** Two
reports in one message, two different files, one shape underneath.

**The tab.** `wfCatTabEl()` read `.wf-tab[href="catalog-page.html"]` - an **exact literal href**. In
the coloured layer `uivFixLinks` rewrites that link to a relative path, so the selector matched
nothing and `openCatOverlay()` put `catov-open` on **nothing**. The class was correct, the rule
reading it was correct, and the element never got it. Now the selector reads a **shape**: the tab
that opens the overlay is the tab that **carries its handler**, and no link rewriter can move that.

**And a second half, in `tabbar.css`.** `.catov-open` was read only by `mega-menu.css`, and only for
the WORD's ink. The accent bar was given to `[aria-current="page"]` alone, so even with the class
landing, the tab that had just become current carried no mark of it - while the page underneath
kept its bar and told the reader they were somewhere they had left. Both states are named on one
line now, and the condition is written **once**: the page's own tab is current only while the
overlay is not open. Verified on three screens, open and closed: exactly one bar, on the right tab,
both ways.

**The overlay.** `.wf-catov` was `position: fixed; top: 0; z-index: 49`. The harness's own
`.uiv-topbar` is `fixed; top: 0; height: 40; z-index: 92`. The overlay's ✕ sits at 12..40 -
**entirely underneath it** - and `elementFromPoint` at the ✕'s centre returned the harness bar's
chevron, so a tap opened the screen list instead of closing the catalogue. `--shell-top` exists for
exactly this and `.cart-ov`, `.cart-drawer`, `.auth-ov` and `.wfh` have all read it since step 7.26;
**this panel was left out of that pass.** Fixed with the same fallback the other four use, so the
frozen grey layer stays at 0. After: overlay from 40, ✕ at 52, `elementFromPoint` returns
`BUTTON.cx`.

**That is the fifth and sixth instance of the same shape this stage has found** - after the focus
ring's thirteen selectors, `UIV_SIGN_ONLY`, the Escape handler's eleven calls and `uivIcons`'s six
element ids. A literal and a hand-kept list of panels, and in both cases what was added later fell
outside.

**One number left alone, deliberately.** `.wf-catov{ bottom: 57px }` is the tab bar's height typed
as a constant, and it has drifted: measured at 390, `.wf-tabbar` is **59**. `buy-bar.css` types the
same bar as **61**. Two files, two numbers, one bar - and the bar declares no height of its own, it
is made of paddings. A token for it is a value decision; inventing one inside a bug fix is how a
value enters the system with nobody deciding it. Recorded, stage 09.

---

### A16. The drawer's foot, fourth pass - the owner's shape, and the first one a rule carried on its own (step 7.93)

The owner named the move: «Знижка й бонуси» stood on a line of its own under the total, and a line
of its own costs its own height plus its own margin. It belongs **under the word «Разом»**, in the
same column, with the sum beside both - one row instead of two - and the sum a rung smaller.

**Written on `.cd-foot`, and no markup moved.** `.cd-total` becomes `display: contents`, so its two
children are placed by the foot's own grid: the word in column 1 row 1, the sum in column 2 spanning
both rows and centred against them, the hint in column 1 row 2. Everything else in the foot keeps
the full width it had. **No row gap between the word and the hint** - they are one pair, and a gap
between them would put the pair back where it started; the air below belongs to the action, which
is where `.cd-cont` and `.cd-blocked` have kept theirs all along, so the primary joins them instead
of the foot inventing a second mechanism.

**Variable -> value -> why:** `font-size` of the sum, **`--fs-30` -> `--fs-24`**. 24 is the rung the
scale already has below 30 - the next one down, not a number chosen here. The sum stops being the
tallest thing in the foot and sits level with the two lines beside it, which is what lets the row
absorb the hint.

| | height | share of an 800-tall phone |
|---|---|---|
| before 7.88 | 256px | 32% |
| 7.89, the secondary becomes a link | 219px | 27% |
| 7.90, the primary L -> M | 207px | 26% |
| **7.93, the foot becomes the grid** | **181px** | **22.6%** |

Out-of-stock 227 with its blocked action. At 320 the foot is 200 because the hint wraps to two
lines. `scrollWidth - clientWidth` is 0 on the foot, the drawer and the page at 320, 360, 390, 430
and 1280.

**And the stand's frame read 181 the moment the rule changed** - four files draw this foot and not
one of them was edited. That is the whole of A14 stated in the positive.


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
| a bordered word you press that opens a filtered listing | `.flink` (12) | `.relbox` (10) | `listing.html`, both on the same screen |

**The last row, measured side by side at 7.80.** Border colour, background, font size and family
are identical - `rgb(217,217,217)`, white, 14, Inter - and five things are not: 131x40 against
93x48, padding 8/12 against 12/16, radius **100** (a pill) against **8** (a rectangle), weight 600
against 700, ink `rgb(28,28,28)` against `rgb(91,91,84)`. Both are `<a href="listing.html">`.
There is a case for the difference - the rail narrows THIS list, the footer sends you to another -
and **nothing in the source makes it**, so from the files it reads as drift and from the screen it
reads as two shapes of one thing on one page.

### B2. One name under two ideas

`.cb` is the checkbox square **and** a certificate block. `.sr` is an order summary row **and**
the prefix of `.sr-live`, a screen-reader live region. `.ci` is an article in the cart **and**
a span elsewhere. `.tag`, `.ct`, `.cur`, `.new`, `.old`, `.cut` each carry two meanings. Ten
names, all measured at 7.36 - 7.39.

### B3. Classes that exist in markup and in no stylesheet

`.ob-main` and `.ob-side`, four instances each on `account-orders.html`, no rule in any file.
They are grid cells and the grid places them, so nothing is broken - but someone looking for
why the left column behaves as it does will look for a rule that is not there.

**Two more, measured at steps 7.76 and 7.77.** The shape is the same and so is the verdict:
the ELEMENT does the work, the NAME does nothing.

| class | instances | where | what the element does |
|---|---|---|---|
| `.pd-block` | 8 on 2 screens | `product`, `product-coach` | it is the flex item `.pdesc` puts 32 between; the class is never read |
| `.loadmore` | 7 on 7 screens | every listing, the PDP reviews teaser, `product-reviews` | it is `btn--outline` plus a hook for a script that is not written yet |

`.loadmore` is the softer of the two: a hook for behaviour that is coming is a defensible reason
for a class with no rule, and `tokens.css:585` even names it in a comment. `.pd-block` has no
such excuse - four of them, styled by nobody, on the two most-read screens in the shop.

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

Twenty-five findings across the pass name a state that no screen draws - twelve up to step 7.74,
six from the stands built at 7.75 - 7.77, three from 7.78 - 7.80 and four from the last five
molecules at 7.81 - 7.83. They are not CSS work: they are screens, and
they belong to whoever decides scope.

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
| no description | the description block, `product` | the block is simply absent and no rule says who hides it |
| no questions yet | the Q&A section, `product` | the head renders over nothing |
| question not answered yet | `.qaitem` | every answer in the code is the shop's; «waiting» has no look and no words |
| last page reached | the pager | the «next» arrow on page 4 of 4 looks and presses exactly like page 1's |
| «Показати ще» after the press | the pager | neither a loading state nor an «that is all» state exists |
| nothing matched the filter | the filter rail, `listing-empty` | the rail looks identical and no facet is marked as the one that emptied the result |
| no certificate on this batch | the trust strip and its thumbnail | the sheet with its seal is drawn whether or not a document exists behind it |
| no brand logo loaded | the brand row | six words in boxes read as a broken block and nothing notices |
| a toast that must not be missed | the toast | 4.2 seconds and `aria-live="polite"`; an error that blocks checkout can be neither seen nor heard |
| «Знайдено: 0» | the catalog toolbar | the bar over an empty result looks exactly like the bar over a full one |
| this goal is the one you chose | the goal tiles | the tile leaves no trace; coming back, a person starts again |
| you are already a coach | the coach banner | «Ви тренер?» is shown to everyone, including a coach |
| no category description | the SEO block | the block stays, with its heading and nothing under it |
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
missing was only the finish. **Twenty-four remaining rows above stay open.**

The six added at 7.75 - 7.77 have a pattern the first twelve did not: **five of the six are the
FAR end of a list.** No description, no questions, no answer yet, the last page, «that is all».
The pass has been good at the empty beginning of a thing and blind to its end - and the end is
where a person is when they have already read everything and still have not decided.

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

- **Two stylesheets were writing words somebody hears - NEW, found and CLOSED at step 7.79.**
  Generated content goes into the accessibility tree, so a `content:` string is not only a
  drawing. Swept the whole system: **eight stylesheets draw a string with `content`, and exactly
  two of the eight are spoken.**

  | file | string | the control came out named | |
  |---|---|---|---|
  | `cert-thumb.css:17` | «PDF» | «переглянути сертифікат (PDF) **PDF**» | **spoken** |
  | `badge.css:69` | `★` | «фото **★** ПОПУЛЯРНЕ», twice on `listing.html` | **spoken** |
  | `badge.css:70` | `✦` | - | silent |
  | `order-row.css:108` | «Детальніше» | - | silent |
  | `breadcrumb.css:36` | `/` | - | silent |
  | `buy-box.css:80` | `·` | - | silent |
  | `gallery.css:40` | `★` | - | silent |
  | `header.css:27` | `✓` | - | silent |

  Both fixed with the alternative-text form - `content: "PDF" / ""` - which empties what the
  tree gets and touches no pixel: verified property by property on both servers (10px, IBM Plex
  Mono, left 14, bottom 14, 1px edge, padding 4/8 for one; 106x21 box, `rgb(255,90,0)`, 10px for
  the other), and the names are «переглянути сертифікат (PDF)» and «фото ПОПУЛЯРНЕ» again.

  **The rule that separates the two columns is NOT in the source.** Both spoken ones sit inside
  a link - but so does the `✦` one line below the star, and that is silent; and the same `★` in
  `gallery.css` is silent because nothing above it is a link. `[?]`, measured per instance rather
  than reasoned, and re-measurable the same way: read the owning control's name, switch `content`
  off, read it again.

  **«Детальніше» is silent and that does not make it right.** A whole Ukrainian interface word
  lives in `order-row.css`, appears only below 639px, and by the project's own rule interface
  strings belong to `voice/docs/microcopy.md` with no second edition anywhere. Moving it is a
  structure change in two layers - filed under B, Крок 6.

- **The tab-driven pass the entry above asked for, run at 7.79 on three components.**
  `.relbox`, `.brandbox` and `.certthumb` were focused by pressing Tab rather than by script, and
  `:focus-visible` genuinely matched on all three. All three take Chrome's default
  `rgb(0, 95, 204)` and carry no `box-shadow`. That is the 66% made concrete: three link
  components, three browser rings, and the system's own ring declared and unused.

- **Eight panels no keyboard could reach - NEW, found and CLOSED at step 7.85.** The
  first step on the organisms went to the eleven that do not exist at rest. Measured with
  a real keyboard on the eight that render: focus moved into the panel **0 of 8 times**,
  five Tabs put **0 of 40** stops inside, and Escape reached **6 of 8**. Four of them carry
  `aria-modal="true"` while the keyboard walks through the page behind; the city dialog has
  34 focusable controls and none was reachable without a mouse.

  Fixed with one pass keyed on a **shape** - `.open` + `position: fixed` + non-zero height
  + at least one visible focusable - measured against every `.open` element the product can
  produce before it was written: it catches the eight panels and correctly leaves out three
  scrims, two inline menus and the language dropdown. After: **40 of 40** tab stops inside,
  **8 of 8** closed by Escape, and focus returned to the exact control that opened it.

  **It does not add `role` or `aria-modal` to the five panels without them** - `.wf-drawer`
  is a `<nav>`, and calling it a dialog is a semantic decision. Four combinations of role
  and modal across regions doing the same job: still open, and now the only part left.

- **The mechanism behind the 66%, found at 7.82 - the ring is opt-in BY NAME.** Read out of the
  stylesheets: **24 rules declare a focus ring**, and they cover every button finish, chips,
  checkboxes, radios, the switch, the stepper, the field, OTP, breadcrumb links, menu options,
  the view toggle, favourite, rating, stack-action, the filter-group header and the price slider.
  Links are covered by `link-row.css` through **a hand-written list of thirteen selectors**.

  So a component that carries no `btn--*` finish and is not on that list gets the browser's ring
  by default. That is not a preference anyone expressed - it is what an enumerated list does to
  everything added after it was written. **Five components are outside it today:** `.gtile` (48
  instances), `.blogcard` (36), `.relbox` (10), `.brandbox` (24), `.certthumb` (3). On
  `index.html` a goal tile and the button forty pixels below it draw two different rings, and
  only one of them is the system's.

  **Still the owner's**, because replacing a ring is visible. But the question is now sharper
  than «does the product draw its own ring»: it is **«does the ring belong to a shape or to a
  list»** - and if to a shape, the shape is «anything focusable that is not a plain paragraph
  link».

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
  **7.76 sharpened the test and it is worth stating as a question:** is the inline value DATA,
  or is it LOOK? The script wrote five properties onto `.pd-img`; one named which photograph
  (data, and it stays) and four named how the box is drawn (look, and they moved to
  `desc-block.css`). Three of the four merely repeated the stylesheet. The fourth,
  `background-size: auto 84%`, contradicted it - the file said `contain` and had never once
  drawn it. That is the real cost: not a dead line, but a stylesheet that reads as false.
- **A shorthand's `background-image: none` beaten by per-position photographs is a fallback,
  not a dead line.** `blog-card.css .blogcard .bim` matches 36 times and wins the image never,
  because all three blog cards have their own `:nth-child` photograph. It is what a fourth card
  would get. Measured at 7.75 and deliberately left alone.
- **Five boundaries measured at their own widths and found SOUND - 7.81.** 620 and 960 for the
  goal tiles, 720 for the blog row, 860 for the two toolbars and the catalog rail, 760 for the
  SEO block and its mascot. One width either side of every one of them: **every rule flips
  exactly on its own pixel and no width draws a mixture of the narrow and the wide rule.** This
  is what 7.64 had to fix in the product card at 620, where the card came out 286x498 instead of
  286x553. Do not re-open on suspicion; re-measure with band widths if at all.
- **`:nth-child` and `:nth-of-type` are not interchangeable, and the system uses both correctly
  once each.** `blog-card.css` counts with `:nth-child` and its direct children are all
  `.blogcard`, so position and count agree. `restock-note.css` counts with `:nth-of-type` and
  its card also holds a header `div`, so the alternation is off by one and holds by accident
  (item F2). Same technique, opposite outcome - a reason not to sweep either one.
- **The census driver stops every animation, and it stops the solver too - 7.86.** `cdp.mjs`
  injects `*, *::before, *::after { animation-play-state: paused !important; animation-delay: 0s
  !important }` at document-start; step 7.51 put it there so the null pass would stop coming back
  56 rows of moving frames. The cost was never written down: **no claim about motion can be made
  with this instrument**, and the never-win solver, which runs through the same driver, reports
  the harness's own rule as the winner over every `animation-*` declaration in the product. Four
  of the 193 never-win entries were that and nothing else. A control animation created in the page
  at measurement time reads `paused` as well - which is how it was caught.
- **"Is an element wider than the viewport" is the wrong question - 7.86.** Inside a horizontal
  scroller it is supposed to be. The question that matches what a person experiences is
  `documentElement.scrollWidth > innerWidth`. Asking the wrong one inflated A11 and, worse, pointed
  at the wrong element for two steps.
- **A census that groups by prefix must be told every prefix - 7.86.** The token families in the
  harvest were written from memory and missed six of them, so `--scrim-*`, `--veil-*`, `--fade-*`,
  `--tint-*`, `--ring-*` and `--fill-*` fell into NEITHER column of every generated tokens table:
  `overlay.css`, whose whole existence rests on `--scrim-overlay`, read as "0 semantic roles".
  Prefixes were counted out of `tokens.css` afterwards, not recalled.
- **A frame must not redraw the thing it frames - 7.86.** The first stand rule for panels laid
  them out in flow (`position: static; inset: auto`) so they could not cover the page. Eleven of
  them collapsed to zero height, because a panel positioned by `inset: 0` has no height of its own
  once the position is taken away. The mechanism that works leaves every declaration alone: a
  transformed ancestor becomes the containing block for a fixed descendant. It does not catch
  `94vw` / `86vh`, and the stand says so rather than pretending.
- **The fourth hand-written list, and the first one that was still costing pixels - 7.87.**
  `uivIcons` walks six named element ids and nothing else, so any block outside them keeps
  the prototype's emoji. Measured on the client dialog: **12 text glyphs**, three of them
  visible at rest. After asking it to walk the body instead, 10 of the 12 became marks and
  **two did not** - `🔳` and `🚚` are in no map at all, which is a gap in the SET, not in
  the pass. Same shape as the focus ring's thirteen selectors, `UIV_SIGN_ONLY`, and the
  Escape handler's eleven calls.
- **A value that goes into code is syntax; a value that goes into an attribute is text - 7.87.**
  `wireframes/_nav.js` built `onclick="wfPickCity('...')"` by pasting a city name into a JS
  string inside an HTML attribute. One of the twenty-four cities is «Кам'янець», and its
  apostrophe closed the string: clicking it threw on all 34 screens that carry the dialog.
  Escaping the quote would have fixed that one name; the value now goes into `data-city` and
  a single delegated listener reads it back, so nothing a city can be called is syntax again.
- **A binder guards itself with a flag, and lifted markup carries the flag - 7.87.** Every
  `wf*` and `uiv*` initialiser writes `data-wfcart` / `data-wfqty` / `data-uiv*` on the element
  it has wired. Markup lifted from a running page carries that flag, so in a fresh frame the
  binder returned before wiring anything and the steppers drew perfectly and answered nothing.
  **A demo that shows a control without running its binder shows something the product does
  not have.** Stripping the flags brought 6 of 6 steppers back; the checkout also needed its
  `.co-wrap` root, because the binder roots one level above the subtree that was lifted.
- **A frame that scales to fit stops being legible before it stops fitting - 7.87.**
  `min(1, avail/declared)` put an 1180 demo into a 332px column at k = 0.28, drawing 16px body
  copy at **4.5px**. There is a floor now at 0.62 and the wrap scrolls sideways below it: a
  scrollbar is honest, a 4.5px letter is not. The same script forgot the padding it sits in and
  clipped the last **2px off all 48 rows**.
- **The drawer's primary is M, not L - the owner's call at 7.90, said as a value.**
  `btn--l` -> `btn--accent` on `.cd-cta` and `.cd-fix`. Variable: the size class in the
  markup of `design/cart.html` and `design/cart-oos.html`. Value: 64px -> 52px. Why: the
  drawer's foot is a fixed strip on a phone, and the whole of it went 256 -> 219 -> 207,
  32% -> 26% of an 800-tall screen. The empty drawer's «Обрати ціль» stays L - different
  slot, centred in `.cd-body`, not competing with anything.
- **Ask the ROW, not the item - 7.88, and it cost a shipped defect.** Step 7.86 put the
  cart drawer's two actions side by side and reported no overflow. It had asked each
  BUTTON whether its own text fitted; both said yes. The row was never asked. At 390 the
  foot is 388 wide inside its padding and the two buttons need 222 + 8 + 209 = **439**:
  `1fr auto` gives each track its own min-content and the grid walks 51px past the edge.
  An element that fits its own content can sit in a box that does not fit it, and
  `scrollWidth - clientWidth` on the CONTAINER is the only question that catches it.
- **The inventory that question produces, and what it is not - 7.89.** Asked of every
  container on every coloured screen, every grey screen and every demo frame, 594 page x
  width rows: **340 rows carry at least one box narrower than its content**. It is an
  UPPER BOUND, not a defect list. 357 of the counts are two shapes - a link over by 4px
  and a link over by 8px - and the first large one checked by hand, `.acc-links` at 390,
  turned out to be a legitimate `overflow-x: auto` rail. What the sweep does prove is the
  negative it was built for: `.cd-foot` appears in none of the 594 rows.
- **The standard census widths cannot see a breakpoint band.** 360 and 1280 make a rule inside
  `(min-width: 620px)` look dead whenever a `(min-width: 960px)` rule for the same selector
  exists: at 1280 the second one wins, at 360 neither applies, and nothing measures the band
  between. The 7.75 solver reported `goal-tile.css @620 .goaltiles{ grid-template-columns }` as
  «matched 4, won 0»; it wins on every width from 620 to 959, which is most phones held
  sideways and every small tablet. Same lesson 7.70 learned with a different instrument: **a
  band needs its own widths.**
- **`--size-40` is a rung of the ladder.** Step 7.58 called a 40px button «off the ladder»; it
  is `.btn--s` exactly.
- **The grey prototype is not a frozen archive.** All 40 coloured screens load
  `wireframes/_nav.js` for their behaviour. Editing it is a structure change, which is what
  `wireframes/` owns.
- **And it is not outside acceptance either - 7.84.** For nine steps the sweep reported «no
  sideways scroll» on 356, then 372, then 408 pairs, and not one of them was a grey screen. A
  360-wide overflow sat in `wireframes/` the whole time. **A check that does not open a folder
  cannot clear it**, and saying «no overflow» while meaning «no overflow in the half I looked at»
  is the kind of true sentence that does the work of a false one.
- **`done` in a registry means «the page exists», not «the stage is finished».** Using it for the
  second meaning made `design/kit/overview.html` - complete, and edited daily - render as a
  `<span>`, so the showcase was unreachable from the sidebar of the project it documents. How far
  a stage has got belongs ON its page. Fixed at 7.84.
- **«Which things get X» keeps being answered with a hand-written list, and everything
  added after the list falls outside it.** Three times in this pass, in three different
  files: the focus ring through thirteen selectors in `link-row.css` (7.82), the sign map
  `UIV_SIGN_ONLY` which is why the toast's ✕ was drawn by the font (7.78), and the Escape
  handler's eleven calls by name, which is why two panels could not be closed at all
  (7.85). **A list is the right tool only where the members cannot be described** - and
  each of these three could: measure the shape, test the shape against everything the
  product can produce, then key the rule on it.
- **A fix in markup does not travel; a fix in a rule does.** The kit holds a second and a third
  copy of every organism's markup - the stand and its demo frame, both lifted from a product
  screen when the stand was generated. Change the product screen by hand and the copies stay where
  they were, which is how a page came to state «64 -> 52» in prose three lines above a button
  rendering 64. Either the change goes into a rule, or the copies are re-synced in the same step
  and something says so. The check now exists and asks one question: **does every button in a
  stand wear the size and the finish it wears in the product?** Four drift rows the first time it
  ran, in four different files, one of them found by the owner first (7.91).
- **A transitioned property has no single value at the moment of the change.** Sampled the instant
  a class lands, `getComputedStyle` returns the value the transition is coming FROM - so the tab
  bar's caption read «wrong» while the bar and the weight beside it read «right», which looks
  exactly like one declaration of a block landing and its neighbour not. `.tl` declares
  `transition: color .15s` two files up, on purpose. At t=400 both were correct and the rule had
  never been wrong. Any sweep that reads computed style straight after a state change reads the
  old one (7.92).
- **`NAV_ACTIVE` is for pages OUTSIDE the registry.** A page that is in the registry and also
  declares itself a satellite draws its own row twice. The two had been cancelling each other out
  under the wrong `done` flag; correcting one exposed the other.

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
