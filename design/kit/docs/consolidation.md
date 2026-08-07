# Consolidation - step 5.5

The one step in this stage where a value is allowed to change. It runs **after** step 5 (which
proved zero pixels moved) and **before** step 6 (which multiplies the system by 102 screens).
Every decision is stated as variable -> value -> why, and the diff is measured, not assumed.

## What changed, measured

Post-step-5 state versus now, 39 screens at 390px, 47 244 elements:

| | |
|---|---|
| elements touched | **3 087** (6.5%) |
| declarations changed | **10 638** |
| radius | 9 878 |
| icon stroke-width | 457 |
| font-size | 176 |
| height (consequence of font-size) | 86 |
| border colour | 27 |
| top / gap / width / line-height (consequence) | 14 |

**No other property moved.** That is the check: a consolidation that touches a property nobody
decided to touch is a bug, not a consolidation.

## 1. Radius: thirteen steps to four

Was 13 radius tokens plus 4 literals in the CSS - a list, not a system.

**Scale: `4 / 8 / 12 / 16`**, plus `pill` and `circle`.

*Why these four:* 8, 12 and 14 are the three most-used radii in the product, and 4 carries every
small mark. `4 / 8 / 12 / 16` is the even ladder those sit on.

*Why ties go down* (10 -> 8, 14 -> 12, 6 -> 4): principle 4, calm and serious. Less rounding
reads as a tool, more rounding reads as a toy.

The removed steps are **deleted from `tokens.css`, not deprecated**. A step that cannot be named
cannot be used by accident, and that is the only thing that keeps a scale a scale. If a design
ever needs 10px again it argues for a fifth step out loud, and every 10px in the product moves
with it.

212 declarations rewritten, including four literal radii that never went through a token at all.

## 2. Hairline: the drift was smaller than the census suggested

The census reported 14 different card borders. Counted in the **system** (the census counted the
grey prototype too, and counted width and colour together), the drift is four declarations:
`--grey-dd` x3 and `--grey-f0` x1, sitting beside `--line-hair` (225 uses) and `--line-strong`
(159). Those four moved to the nearest role. The two declared roles now carry every hairline.

Correction worth keeping: **the census over-stated this one.** It counted `1px #E9E7E2` and
`1.5px #E9E7E2` as two different borders, which is width drift, not colour drift.

## 3. Icon: one stroke, two named exceptions

Three glyphs in `design/_nav.js` were drawn at `stroke-width 1.5` and `1.7` while 1 931 were at
`1.9`. Unified to 1.9.

Two exceptions stay and are now written down: the header caret (12px) and the language mark
(10px) use 2.4 and 2.6. Stroke width is in viewBox units, so a 24-unit icon drawn at 10px
renders its 1.9 stroke at 0.79px - a hairline that disappears. Compensating at very small sizes
is correct practice, not drift, and the rule is: **one stroke at every size the scale allows;
below 14px the stroke compensates.**

The 30 rendered icon sizes are **not** consolidated here. Most of them are `1.05em` resolving
against different text sizes, which is the icon doing what it should - growing with its label. A
standalone-icon size scale belongs with the state work in stage 09.

## 4. Field: 16px on mobile, everywhere

The census found 136 of 166 text inputs set below 16px. iOS Safari zooms the whole page when a
focused field is under 16px, so on a mobile-first product that fired on every checkout field.

*Variable -> value -> why:* every text-entry field -> `--fs-16` at `max-width: 859px` -> below
16px iOS zooms; above 860px there is no zoom to trigger, so the designed sizes stand.

Each component carries its own rule, in its own file: `checkout-form`, `field`, `header`,
`footer`, `review-modal`, `system-page`, `buy-box`. A bare element rule in `base.css` cannot win
against a component class, and `!important` would hide the conflict instead of naming it.

**67 of 67 visible text fields on the 39 screens are now 16px or more at 360.** Two knock-on
fixes were needed and both are recorded in `restock-note.css`: the notify field got
`min-width: 0` (a flex item defaults to `min-width: auto` and refused to shrink), and below
420px the notify row stacks - because the answer is to stack, not to shrink the field back under
16 or truncate the button's verb.

## What was deliberately not done

**Merging the duplicate button classes** (`.addcart` / `.btn` / `.mba` for "У кошик", and four
more pairs). It is a pure naming win with zero visual change, but the class names are shared with
`wireframes/`, which is frozen after Voice. Renaming in `design/` only would desync the grey and
coloured layers, and that costs more than the duplication. It belongs to a refactor that touches
both layers at once.

**Focus ring, `disabled`, `required`, `aria-invalid`.** These are states, not values. `--color-focus`
was deliberately not invented at step 2 and the whole state set is on the stage-09 list. The census
page for the field states the hole in numbers so stage 09 starts from evidence.

**Link affordance.** 3 164 of 3 404 links carry no underline and no accent. That is a rule to
write, not a value to change: *links in a list are not underlined, links inside running text
are*. Recorded on the link-row census page; the code change belongs with the text work.

## Re-checked after

No screen scrolls sideways at 360 or at 1280. All generated stand pages rebuilt against the new
token list, and no component asks for a radius step that no longer exists.


---

# Round two - the three items that were left open

## Outlined button: one line role

`--line-strong` on every outlined **action button**; `--line-hair` stays what its name says - the
hairline that divides things inside a surface.

*Why:* the line of a button is the **edge of a control**, and an edge is not a divider. Two
declared roles used interchangeably on one component is not drift of a value, it is an
unanswered question about the role, and this is the answer.

Seven rules moved: `.auth-x`, `.cd-x`, `.sbtn`, `.co-soc`, `.cd-cont`, `.cd-empty .btn`,
`.co-err-acts .btn`. Verified in the browser: **0 outlined buttons still on the hairline**.

Cards (`.brandbox`), gallery thumbs (`.gthumb`), option rows (`.co-opt`) and the city dropdown
keep `--line-hair` - they are surfaces and choices, not controls, which is exactly the
distinction the rule draws.

## Eleven duplicate colours merged

Rule: **the primitive a semantic role reads survives**, because that is the one the system is
built on; where neither has a role, the more-read survives. The loser's references are
repointed and its token is deleted, so the pair cannot come back.

| Merged away | Into | Why |
|---|---|---|
| `--red-100` | `--red-50` | `--bg-danger` reads red-50; red-100 had 8 direct reads bypassing it |
| `--amber-25` `--amber-75` `--amber-100` | `--amber-50` | four creams inside ΔL 2, one of them ΔL **0**; `--bg-warning` reads amber-50 |
| `--amber-300` | `--amber-200` | ΔL 1 |
| `--warm-150` | `--warm-200` | ΔL 2 on the one real ramp; 150 was a single direct read |
| `--grey-f1` `--grey-f2` `--grey-f3` `--grey-ee` | `--grey-ec` | four cold greys inside ΔL 2 |
| `--grey-cf` | `--grey-cc` | ΔL 1 |

22 references repointed, 11 tokens deleted, plus `--grey-f0` which step 5.5 had already orphaned.
**Primitives: 49 -> 37.**

## The last unsized field

The price filter's number input (`.frow .in.uiv-num`, 14 instances) never had a font-size and
rendered at `13.3333px`, the browser default.

*Variable -> value -> why:* `.frow .in.uiv-num` -> `--fs-13` -> the smallest size the system
already declares for a field (the header search). Going below the system's own minimum would be
inventing a step. On mobile it joins the 16px rule like every other field.

**0 of 51 desktop fields on the browser default. 0 of 35 mobile fields under 16px. No screen
scrolls sideways.**


## Spacing on an 8px grid

**Scale: `2 · 4 · 8 · 12 · 16 · 24 · 32 · 40`** - an 8px grid from 8 up, 4px half-steps below
16, and 2px for the optical nudge. Was **27 steps** standing 1px apart from 1 to 18.

*Why it needed doing even though nothing was dead:* every one of the 27 was read - 1 494 reads
in all - so this was never about unused tokens. It was about the **rung**. A ladder with 1px
rungs forbids nothing: when 11, 12 and 13 all exist, whatever number a hand types is already
"in the scale". The count of steps is not the problem; the distance between them is.

*Why ties go UP* (6 -> 8, 10 -> 12, 14 -> 16, 20 -> 24) - the opposite of the radius rule at
the same step, and deliberately so: for a corner, less rounding reads as more serious; for
spacing, more room reads as calmer. Principle 4 is served by air **between** things and by tight
corners **on** them.

**937 declarations moved, 19 steps deleted.** Measured against the state before this change,
39 screens at 390px:

| | |
|---|---|
| elements touched | **16 921** of 47 244 (36%) |
| declarations changed | **47 270** |
| padding | 24 892 |
| gap (row + column) | 10 877 |
| height / width | 6 609 |
| margin | 4 782 |
| top / right / bottom / left | 110 |

`font-size`, `color`, `background-color`, `border-color` and `border-radius` were also read on
every element and **do not appear in the list at all**. That is the check: a spacing
consolidation that moves a colour is not a spacing consolidation.

No screen scrolls sideways at 360 or 1280.


## Typography, move one: the half-pixel steps

Six of the 26 sizes were halves - `9.5`, `10.5`, `11.5`, `12.5`, `13.5`, `14.5`. They existed
because a hand typed a half pixel, not because a design asked for one, and on a non-retina screen
a half pixel is rendered as blur.

Each snapped to the nearer whole; a tie went to the **more-read neighbour**, because the step the
product already leans on is the one that should survive. Nothing crossed a neighbour, so the
reading hierarchy did not move.

| | | | |
|---|---|---|---|
| `9.5` (5) | -> `10` | `12.5` (78) | -> `13` |
| `10.5` (31) | -> `11` | `13.5` (30) | -> `13` |
| `11.5` (47) | -> `12` | `14.5` (19) | -> `14` |

**210 declarations moved, 6 steps deleted: 26 -> 20.** Measured on 39 screens at 390px:
16 396 elements (35%), 32 833 declarations - `font-size` 15 196, `line-height` 11 516 (a
consequence: an unitless leading recomputes from the new size), `height` 4 723, `width` 1 393.
No colour, no radius, no padding.

### Withdrawn: merging the two body leadings

`--lh-loose` (1.55) and `--lh-body` (1.5) look like a duplicate, and I merged them. Then measured:
**31 193 computed line-heights moved**. One of the twelve readers of `1.55` is `body` itself, so
the merge quietly re-set the reading rhythm of the entire product - on text nobody asked to touch.

A base leading is a decision about reading. A decision is not made as a by-product of tidying.
Restored, and the token now carries a comment saying the two are kept apart on purpose. The record
stays visible, or the same "optimisation" comes back next time in the same words.

### Still open: 20 steps is not yet a scale

The ladder now prints the **ratio to the step below**, and in the 10-16 range the neighbours sit at
**1.06-1.08** - where the eye sees no difference. A real scale would hold about 1.15-1.2 and land
on roughly nine steps.

Not done, and not by omission. Spacing can be rounded and the air changes; a type size cannot be
rounded without changing **what a person reads as most important on the screen**. The most-read
size in the product is `13px` (205 reads after the merge), and any scale that discards it owes an
explanation first. That decision needs an eye on a live screen, not arithmetic, so it stands named
on the typography page instead of being done quietly.


---

# Step 5.6 - typography closed, and the leaks it exposed

The owner's call, so the leading merge that was withdrawn a step earlier is now made
deliberately rather than as a by-product.

## Font size: 26 -> 9

**`10 · 12 · 14 · 16 · 18 · 20 · 24 · 30 · 34`** - even numbers, and every neighbour holds a
ratio of at least **1.10**, so the scale clears the check its own page prints (the ladder flags
anything under 1.08 as a rounding error; there were **12** such pairs before, there are **0**
now).

Ties go **up** - 13 -> 14, 11 -> 12, 15 -> 16, 17 -> 18, 19 -> 20, 22 -> 24. Same direction as
spacing, the opposite of radius: for text bigger is easier to read, so the product's meta type
growing 1px is a gain, not a cost.

Above 34 there are no steps on purpose: 38, 44, 50 and 60 stand once each on a marketing block,
and a size used once is a measurement, not a rung.

## Leading: 6 tokens + 15 literals -> 3

**`1 · 1.3 · 1.6`.** Leadings 0.05 apart are not two decisions. The base rhythm moved from 1.55
to **1.6** - this time deliberately and out loud, which is exactly the difference from the merge
that was withdrawn one step earlier.

## Letter-spacing: it was not in the system at all

The product carried **117 literal letter-spacings in 16 values** and the token file had none.
Four steps, named by the job, because tracking is never a free number - it compensates for
**size** and for **case**, and there are only four cases here:

| | | |
|---|---|---|
| `--ls-display` | `-.02em` | an Oswald heading |
| `--ls-lead` | `-.01em` | a large line |
| `--ls-caps` | `.04em` | an uppercase label |
| `--ls-eyebrow` | `.08em` | the tiny uppercase overline |

Also found and routed while looking: **41 literal line-heights** (1.35, 1.4, 1.15…), **13 literal
font-sizes** inside the scale's range, and **3 literal `font-weight: 600`**. The token list said
the system was tidy; the components said otherwise.

## Type by purpose

The scale says **which** sizes exist. The new section on the typography page says **where** they
stand: ten roles - page title, section head, product name, body, button, field label, field, inline
link, meta, uppercase eyebrow - each measured from 15 real screens, with a live specimen and a
**variants** column.

That column is the point. **A role with more than one variant is not yet a role**, it is two
decisions under one name. The worst is the inline link: **274 instances, 5 different sets** - the
same finding the link census made, from the other end.

## Measured

39 screens at 390px, against the state before this step:

| | |
|---|---|
| elements touched | **39 995** of 47 244 (85%) |
| declarations changed | **80 466** |
| font-size | 33 058 |
| line-height | 31 635 (consequence: an unitless leading recomputes from the new size) |
| height / width | 13 909 |
| letter-spacing | 1 831 |
| margin / gap | 33 |

No colour, no radius, no padding. No screen scrolls sideways at 360 or 1280.


## Icons: the cell has an anatomy now, and the anatomy is checked

`design/kit/icons.html` was a sheet of 48 pictures. It is now the grid with its rules, and every
number on it is measured in the browser from the real paths - the ink box of each glyph, its
distance from the safe area, its optical centre.

**The cell:** `24 x 24` (`viewBox 0 0 24 24` on the whole set), a **safe area of 2** so ink lives
in `2..22`, and the optical centre marked. Three rules that are easy to get wrong and are now
written down:

- The stroke sits **outside** the contour, so ink runs `0.95` past the path geometry. The safe
  area is checked against **ink**, not against the curve - otherwise half a stroke eats it.
- **Optical centre, not geometric.** A glyph with a heavy bottom is centred by eye.
- **Terminals on the grid**, or a 16px render blurs them onto a half pixel.

**Optical balance:** measured across all 48 glyphs, the ink box runs from **13.9** to **21.9**
with a median of **18.5**. So the set's working field is **18.5** modules of 24, not the full 20
the safe area allows - and the **8.0** modules between the smallest glyph and the largest are the
optical correction, not carelessness. A circle inscribed in the same box as a square looks
smaller, so an even-sized set would look uneven.

**What the audit found:**

- **5 glyphs cross the safe area** - `spark` (1.05..22.95 on both axes), `card`, `cart`, `cap`,
  `bell`. Each is drawn on its grid on the page, so the number and the evidence sit together.
- **10 glyphs are off centre by more than half a module.** Some of that is correct optical
  correction and some is an oversight, and only an eye on the grid tells them apart - so the page
  says "list to review", not "list of defects".

### The eleventh was not a glyph, it was a copy

The first run of this audit reported **11** off centre, with `trash` at `dy -6.60` - an offset far
too large to be a drawing decision. It was not one. `trash` is written in the source as three
concatenated strings; the generator lifted the set out of `design/_nav.js` with a regex, the regex
stopped at the first string, and the showcase drew a lid with no bin while the product drew the
whole glyph. The design system was describing an icon the product does not have.

The fix is not a better regex, it is **ownership**. The set, the anatomy and both markup builders
moved into **`design/system/icons.js`**; `design/_nav.js` keeps only the emoji map and the DOM walk
and builds its markup from `uivIconSvg()`; the 39 coloured screens load `system/icons.js` before
the stand script; and `design/kit/icons.html` loads that same file and **renders and measures the
live set in the browser**. There is no second edition to drift, and the numbers on the page cannot
go stale - they are computed when the page opens, from the glyphs the product uses.

Proof, same instrument as step 5: 80 screen x viewport pairs, **96 422** element signatures,
**7 336** rendered glyphs. Glyph markup identical one for one, zero elements changed or removed,
and exactly **+1** element per screen - the new `<script>` tag itself.

Re-measured on the whole glyph, `trash` sits at `dx 0.00 / dy +0.10` and is not on either audit
list. The measurement itself also got stricter: a client rect of an SVG shape is its **fill** box,
so the page adds half of each shape's own stroke back (and nothing for a shape drawn with
`stroke:none`), which is what "ink" means. Same numbers as the first audit - 13.9 to 21.9, median
18.5 - now derived from the live set instead of a JSON file.

### Second sweep: the glyphs that were never in the registry

The owner found the next hole the only way it could be found - **by not seeing the loyalty jar in
the design system**. It was not in `UIV_P` at all: it is drawn by its own builder, because it is
the one glyph in the product that *shows* something rather than naming it (the fill level is the
rank). Pulling that thread found three more families living in the stand script:

| Family | What it is | Where it went |
|---|---|---|
| loyalty jar, 4 levels | a **state** glyph: fill = rank, colour = metal | `uivTierSvg(lv)` in the system |
| filled rating star | a **variant** of the set's star, not a second star | `uivStarSvg()` in the system |
| Google, Apple | brand marks, Google in its own four colours | `UIV_BRAND` beside Telegram and Viber |
| the PDP certificate seal | built its own `<svg>` around `UIV_P.shield` | calls `uivIconSvg('shield')` |

`uivBrandSvg` learned an optional `root`, because a mark that carries its own colours must not get
`fill="currentColor"` above them - and because the markup had to come out byte for byte identical.

The split is now one sentence: **the system owns what a glyph looks like, the stand owns where it
goes.** The stand kept the wrapper that carries state (`.uiv-tier.t0..t3` holds the metal) and the
DOM walk that swaps emoji for glyphs.

One rule fell out of showing them: colour belongs on the **cell**, not on the `svg`. The showcase
had `.igrid svg{color:...}`, which beat both the tier class and the rating role and painted every
jar black. Same class of defect as the one in step 5 - a rule written one level too deep.

### Three glyphs redrawn

Also owner-found, and both faults were visible in one screenshot of the catalogue menu:

- **`flame`** was 9.9 x 13.9 of ink against a set median of 18.5, and its centre sat **3 modules
  high**. In the menu, "Жироспалювачі" read as a small mark floating over its own line while
  `bolt` next to it filled the cell. Same drawing, scaled **1.42** about the optical centre:
  13.3 x 18.9, `dy 0.00`.
- **`drop`** is its neighbour in that menu with the same fault (11.9 x 15.9, `dy -1.00`), so it was
  scaled with it. A column of glyphs is judged against itself, not one at a time.
- **`flask`** had two counters closing up: the neck was 3 modules wide, so a 1.9 stroke left 1.1 of
  white inside it, and the level line stopped 1.0 short of each wall - close enough for the round
  caps to merge with the walls into a lump instead of a junction. Neck 3.6, line wall to wall.

The off-centre list went from 10 to **8**.

Proof for both changes at once: 78 screen x viewport pairs, **7 334** rendered glyphs. Exactly
**584** svg elements changed, and every one of them is a glyph that was *meant* to change -
`flame` 296, `flask` 144, `drop` 144, zero others. The jar (84 instances), the star and the brand
marks came out identical, and the element count did not move on a single screen. On three screens
walked element by element, all 39 differences are `svg` or `path` of those three glyphs and
nothing else - so the redraw changed the drawing and not one line of layout.

**Still open, and stated on the page:** there is no size scale for an icon standing without a
label; 41 icon-only buttons have no `aria-label`; the stand's own screens panel draws a 16x16
chevron of its own (stand chrome, not product, so it stays); and the safe-area check runs **when
the page is opened**, so a new glyph is audited automatically but nothing stops it from being
committed broken.

---

# Step 5.9 - the role layer gets the jobs it was missing

Asked as a check ("is everything assembled, do the pages take the semantics?"), answered by two
instruments, and the check turned into the work.

## What the check found

Static, over `design/system/**/*.css`: a component read a **role 2 069 times** and a **raw value
211 times** - 145 direct primitive reads plus 66 `rgba()` literals in 24 files.

Measured, over 39 screens x 2 widths (16 325 visible elements per width): **115 computed colours in
the product were not in the palette at all**, and another 1 663 belonged to the stand's own chrome,
which is not the product and does not count.

The two agree, and neither is about carelessness. Look at *what* was read raw: `--grey-bb` x21,
`--grey-ec` x13, `--grey-aa` x10, the scrims, the tints. **These are jobs the semantic layer never
named** - the quiet mark, the skeleton, the struck price, the scrim, the veil over a photograph,
the soft status plates. A component that has no role to read reads a value, and a component that
reads a value cannot be re-themed. That is exactly what step 7 does, so this is a blocker, not a
tidy-up.

## What was decided

**20 primitives and 34 roles added; 154 sites in 45 files rewritten.** Every role is named for the
JOB, which means one primitive can sit under two roles on purpose: `--red-50` is `--bg-danger` and
`--bg-discount`, and a dark theme moves them apart. The full list with its reasoning is in
`tokens.css` under "step 5.9"; the page that shows it is `design/kit/color.html`.

The consolidations inside it:

| Job | Was | Now |
|---|---|---|
| the scrim under a dialog | **seven** values: .25 .36 .44 .46 .50 .52 .52 | `--scrim-overlay`, one: **.52** |
| the quiet mark | `#BBBBBB` in 21 places | `--mark-faint` |
| the skeleton bar | `#ECECEC` in 13 places | `--bg-skeleton` on `--warm-200` |
| the struck price | `#AAAAAA` in 10 places | `--text-price-was` |
| the veil over a photograph | four gradient stops as literals | `--veil-surface`, `--veil-page`, `--veil-inverse` |
| soft status plates | 9 rgba literals | `--bg/--line-success-soft`, `-bonus-soft`, `-danger-soft` |
| cool greys used as text | `#444` `#555` `#666` `#111` | merged into `--text-secondary` / `--text-muted` / `--text-primary` |

A **veil is not a scrim**, and the first run of this step proved why the distinction has to be in
the names: the map folded `rgba(247,243,236,.86)` - the middle stop of the veil over a banner
photograph - into `--bg-surface`, which is opaque, and the photograph disappeared behind a plate.
A scrim hides the layer behind it; a veil keeps it visible and only takes enough contrast out of it
for type to sit there. Two jobs, two families.

## Result

**Role reads 2 199, direct primitive reads 42** - and all 42 are inside `box-shadow`, which is the
next pass, plus the two loyalty metals where the value *is* the meaning. Flat colour no longer has
a single unnamed value in the system.

Pixels: **95 814** records over 78 screen x viewport pairs. **547** elements moved on 34 screens,
and **only colour moved** - fill 186, line 301, ink 278, gradient 6. Layout, shadow and type did
not move once. Only the properties that were decided.

## Two bugs in my own tools, both caught by measuring

**A rule that fired on the wrong job.** The gallery floor is a radial gradient at 7% ink; the map
sent it to `--bg-sunken`, an opaque surface. The diff showed a `background-image` change on three
screens and the role became `--shadow-floor` instead. A shadow is not a surface.

**A comment ate a declaration.** The applier split a rule body on `property:value` pairs - and a
comment sentence containing "surface:" looks exactly like a property, so its "value" swallowed the
real `background:` up to the next semicolon. Four declarations in `spec-table.css` were silently
skipped, and the run still reported "all occurrences matched". Comments are now masked with spaces
before splitting, so offsets survive and prose cannot pose as code. The lesson is the same one the
pixel proof taught in step 5: **a check that cannot fail is not a check** - what caught this was the
audit re-run after the apply, not the applier's own report.

## Next

`box-shadow`: 97 declarations, **47 distinct values**, no ladder. Focus rings are in there too
(`0 0 0 3px` of an orange tint x6), and a ring is not an elevation. That is the second pass and the
last thing between the system and the dark theme.

---

# Step 6.0 - depth becomes a ladder

The second half of the same job. Flat colour got its roles at step 5.9; `box-shadow` was the last
property in the system where the decision was taken again in every component.

## What it was

**97 declarations, 47 distinct values.** The same flyout stood at `12/30`, `14/34`, `16/36` and
`18/44` in four files. Dialogs stood at `20/50`, `24/64`, `28/70` and `6/24` - four heights for one
statement, "this is instead of the page". A shadow answers exactly one question - how far off the
surface is this thing - so the answer has to be a scale.

## What it is

**12 levels and 3 rings**, named for the job, and three of the twelve are not heights at all:

| Level | Job |
|---|---|
| `--elevation-1` | a card at rest (22 uses, unchanged) |
| `--elevation-2` | the raise under the cursor - was four values doing one thing |
| `--elevation-3` | a layer that opens over the page and stays attached to it: menu, flyout |
| `--elevation-4` | a layer that takes the page away: dialog, toast, cookie set-up |
| `--elevation-mark` | a small mark sitting ON an image, where the ground is unknown |
| `--elevation-control` | a control lifting on a light page - weaker on purpose |
| `--elevation-knob` / `-knob-active` | the knob on its track, and the knob while dragged |
| `--elevation-action-hover` | accent-tinted lift, because the thing it lifts is the action |
| `--elevation-bar-top` / `-bar-bottom` | a bar casts from its own edge: the tab bar upward, the header downward |
| `--elevation-drawer` | the cart drawer casts sideways |
| `--ring-focus` / `--ring-danger` / `--ring-onink` | a state drawn as a halo |

**Rings are not elevations, and that is the point of pulling them out.** `0 0 0 3px` is not a
distance. Keeping the focus ring on a ladder of heights would say a focused field is *higher* than
the one beside it.

**Inset shadows were left alone.** All 16 already read `--line-*` roles, because an inset shadow
here is a border drawn as a shadow, and its job is a line.

## Result

Distinct `box-shadow` values in the system: **47 -> 27**, and of those 27, twelve are `inset`
line compositions and five are `none`. Depth itself now has one vocabulary.

Pixels: **307** elements moved on 34 screens, and **every one of them moved only `box-shadow`**.
Layout, colour and type did not move once - the same guarantee as step 5.9, from the other side.

Four duplicate declarations were removed on the way: the same selector declared its shadow twice,
once in the structure block and once in the colour block. That is this project's own file
convention and it was invisible while the two values differed; once both resolved to the same role
the duplicate said nothing, and two copies of one decision drift apart on the next edit.

## The colour layer, finished

With both passes in: components read a **role 2 240 times** and a raw value **3 times** - and all
three are deliberate. Two are the loyalty metals (`--brown-600`, `--slate-400`), where the value
*is* the meaning. The third was an inset white ring that is now `--line-onink`, same value, so the
count is **2 241 / 2**.

**Zero colour literals remain in any component.** Every colour and every shadow in the product is
now named by a role, which is the precondition step 7 needs: a dark theme overrides the semantic
block and nothing else.

## Caught by the page, not by me

The geometry page carries an idle control - it lists what `tokens.css` declares in its section and
no block on the page shows. Adding the ladder made the **colour** page fail it: my ownership regex
excluded `--elevation-[2-9]` and the ladder has named levels (`--elevation-mark`, `-knob`,
`-bar-top`), so eight tokens were declared and shown nowhere. The rule is now "anything but
`--elevation-1` belongs to geometry". A page that can prove itself incomplete is worth more than a
page that looks finished.

## Two defects the owner found on the pages themselves

**The ladder was not casting anything.** The depth block rendered as a run of text -
`elevation-1картка в спокої0 1px 2px…` - because its CSS was appended to the wrong constant: it
landed in the colour page's style block and then, on the second attempt, *above* the geometry
page's `<style>` tag, which makes it text in the body rather than a rule. A showcase whose whole
argument is "a level is shown by being cast, not described" was describing. Fixed, and the swatches
now carry their own shadow.

**The read counters were lying.** Half the alpha chips said "not read" - `--scrim-ink-10`,
`--tint-orange-15`, the veils - while the product leans on every one of them. The counter looked
for five prefixes (`text|bg|line|mark|elevation`) and for a value that *starts* with `var(`, so it
saw neither the families added at 5.9 (`--scrim-overlay`, `--veil-*`, `--fade-*`, `--ring-*`) nor a
role whose value is not a bare var - and every rung of the depth ladder is
`0 10px 28px var(--scrim-ink-10)`. It now counts any `var()` inside any custom property.

That mattered beyond the label: a false "not read" is exactly the evidence someone would use to
delete a token the whole product depends on.

## What the honest counter then showed: 14 dead primitives

With the counter fixed, **14 primitives really were unread** - every one of them replaced during
5.9 and 6.0, and every one verified to have zero `var()` references anywhere in the system, the
stand, the kit or the screens before deletion:

`--black` `--grey-11` `--grey-44` `--grey-55` `--grey-66` `--grey-dd` `--grey-ec` `--grey-fa`
`--green-200` `--red-200` `--scrim-ink-05` `--scrim-black-05` `--scrim-black-44` `--scrim-charcoal`

Deleted, not deprecated, for the reason step 5.5 gave when it deleted radius steps: a value that
cannot be named cannot be used by accident. **Primitives: 51 -> 37 again**, and the colour page now
shows **58 chips with not one "not read" among them**.

One more rule fell out of it: a ramp on the page may not name a token by hand. `--black` was
hard-coded into the grey ramp, so deleting the token left a ghost chip with no value. Every ramp is
now filtered against what the file actually declares.

---

# Atoms: the pages learn to check themselves

The stage opened with the owner's verdict on `design/kit/button.html` - "not complete, very
abstract, this is not a system". The census answered it for the *content*. This step answers it for
the *page*: every atom page now audits itself against the file it claims to document.

## Three things were wrong before a single word was rewritten

**Every derived number was stale.** All 22 pages were generated before the role layer and the
depth ladder, so their token tables counted a system that no longer exists. Rebuilt.

**The role/primitive split was the five-prefix bug again** - the same one the colour page had.
`--scrim-overlay`, `--veil-*`, `--fade-*` and `--ring-*` were all filed under "primitive", which is
the exact opposite of what they are. The rule is now structural and cannot go stale: **a role is a
token whose own value names another token; a primitive is one that names a value.**

**And the comment-eats-declaration bug, for the third time in this stage** - here it filed
`--bg-skeleton` as a primitive, because a comment sentence containing "…: seven values" reads as
`property: value` to a regex and its "value" swallows the next declaration. Masking comments before
parsing CSS with a regex is now done in all three tools. Three appearances is not bad luck, it is a
missing habit.

## The self-check

Each component page now carries a **Холостий контроль**: the classes and states its CSS declares,
against what the page actually puts in front of a person. Everything visible counts as shown - a
rendered demo, a class in the markup block, a class named in any `<code>`.

The measure had to be made honest first. A file styles other components' children
(`.pcard .fav{...}`), and demanding the card on the favourite's page is wrong, so only the
**subject** of a rule - the rightmost compound - is required; foreign context is listed separately
and excused.

First run, before any page was fixed: **9 of 22 passed**. The 13 failures are the answer to
"abstract": `button` never showed an icon inside a button though its own axis table talks about
leading icons; `otp` showed neither its error cell nor its note; `chip` showed no selected state;
`radio` was missing 6 of its 8 classes.

## Field, rebuilt

The page showed two text inputs and a **hand-drawn imitation** of a required field: a `<div>` with
`border-radius:10px` inline - a radius the system deleted at step 5.5, on an element that is not a
field. A showcase that draws the component instead of rendering it proves nothing.

Now it renders all six real forms with product strings: the phone field with its country cell, the
label with the optional mark, the resend timer, the client textarea, the two number fields of the
price filter, and the profile row. All 13 classes and 4 states present, nothing inline but the
demo's own grid.

**And the rebuild found a hole in the system, not in the page.** The demo first showed an error
state - and `field.css` has none. The red border exists twice in the product and both times a
foreign component invented it for itself: `.otp .box.err` and `.pm-b input.err`. So the field that
takes the phone number and the address cannot show that it is wrong. The invented state is gone
from the demo and the finding is now on the page, in "Не в коді".

That is the point of the self-check: it does not make pages look finished, it makes them able to
say what is missing.

## A field whose value is a number takes digits and nothing else

Asked for as a rule for fields, and it turned out to be a rule the product did not have in any
form. Measured first, on the coloured screens: **35 fields whose value is a number**, carrying
**five different declarations** between them - and not one of them refused a letter.

The three usual ways to "do" this are all hints:

| | |
|---|---|
| `inputmode="numeric"` | picks the keypad on a touch device. On a desktop, on a hardware keyboard and on paste it does nothing |
| `type="tel"` | picks a keypad and restricts nothing - `tel` is a text field by spec, because numbers hold `+ - ( )` |
| `type="number"` | refuses most letters but lets `e`, `E`, `+`, `-` and `.` through, because it accepts scientific notation |

So the rule is enforced at the input, on the only two events that can put a character into a
field: **a keystroke and a paste**. It lives in **`design/system/fields.js`** - with the icons,
this is the second thing the system owns beyond CSS, and for the same reason: it is what the
component *is*, not where it goes.

**Which fields, and the distinction that decides it.** Only those whose value IS a number: the OTP
cell, the two ends of the price filter, the phone. Deliberately **not** the branch field
("Відділення / поштомат - номер або назва"): it is full of digits, but its value is not a number,
and a filter there would refuse half the addresses. *A field where a digit can occur* and *a field
whose value is a number* are different things, and only the second may refuse letters.

**A keystroke is refused, a paste is cleaned.** Refusing the character - rather than accepting it
and stripping it afterwards - keeps the caret still and never lets the value be briefly wrong. But
a paste is not refused: people paste the code with the whole SMS sentence around it, so
`Ваш код 4821, нікому його не кажіть` becomes `4821` and `тел. +38 (067) 123-45-67` becomes
`+38 067 1234567`. The phone keeps `+` and spaces; a code and a price do not.

It also sets what the markup was missing: `inputmode`, `pattern`, and `autocomplete="one-time-code"`
on the OTP cell so the OS offers the code that just arrived. All of it on first focus, delegated on
the document - the auth dialog, the client dialog and the filter sheet are built by script long
after any load-time pass would have run.

Verified by typing on the real screens: `a5b` into an OTP cell leaves `5`; `+380 67abcХ12` into the
checkout phone leaves `+380 6712`; `1e5-0abc` into the price leaves `150`; and
`Дерибасівська 12` into the branch field is untouched, which is the case that proves the rule is
about the value and not about the digits.

**Named, not built:** a code pasted into the first OTP cell still leaves one digit instead of
filling all four. That is the OTP cell's job - the field already did its own by dropping everything
that was not a digit - and it is on the OTP page's gap list.

### Why the same field behaved two ways

Spotted by the owner side by side: the showcase typed `4544534353`, the auth screen typed
`32 423 42 34`. Measured across the product - **four phone fields, exactly one of them grouped.**

The grouping was written as `wfAuthDigits()` in the grey script, bound to `id="wfa-phone"`. The
behaviour was right; its **address** was wrong. A rule attached to one id is not a component rule,
it is that screen's private habit - which is why the checkout phone, the coach's client dialog and
the showcase's own demo all showed a string nobody recognises as their number.

The rule moved into `design/system/fields.js` next to the digits-only one, in two shapes because
the markup has two: a field after a `.cc` cell holds the nine digits (`67 123 45 67`), a field
holding the whole number prints its own prefix (`+380 67 123 45 67`).

**One number, four ways of writing it.** People type `67…`, `067…`, `380 67…`, or paste
`тел. +38 (067) 123-45-67`. All four mean the same number, so the field accepts all four and stores
one. Stripping a leading `380` or `0` is safe: no Ukrainian operator code begins with either.

Two things the measurement caught that reading the code would not have:

- **The order of listeners is part of the rule.** `wfAuthDigits` truncates to nine digits with no
  idea the first three might be a country code, so running after it meant formatting a number it had
  already cut - `067 123 45 67` came out as `06 712 34 56`. The system's pass is now on **capture**,
  so it normalises first and the old pass finds nothing left to do.
- **A field's own printed prefix is not something the person typed.** Typing `380 67…` into a
  whole-number field produced `+380 38 067 12 34`, because the normaliser stripped the `380` it had
  printed itself and left the typed one. The printed prefix is removed before normalising now.

Verified by typing and pasting on the screens and on the showcase page: all four fields, all four
ways of writing a number, one result.

**Named, not fixed:** the grey `wfAuthDigits()` still runs. Two pieces of code do one job, and they
now agree - but the duplicate stays until the grey layer can be edited.

### Button, and a sharper measure

The self-check was too kind. It counted a class as "shown" if the page named it anywhere - in the
markup block, in a `<code>` inside a sentence. But naming a class is describing the file; the whole
point of a showcase is to **render** it. The check now reports two levels: **rendered in a demo**,
and **only named in words**. Nine pages that passed the first version fail the second, which is the
correct answer.

**Button showed three buttons, and one of them was not its own.** `.loadmore` is declared by
`pagination.css` - a foreign button on this page made the file look bigger than it is. Five of the
file's own forms were nowhere: the social sign-in button with its icon cell, the coach's «new
client» CTA, the goal hint, the filter's «show all».

Now all six render with product strings, and the icon cell earns its place in the anatomy: `.ic` is
a fixed 20px whatever sits inside it - **Google in its own four colours, Apple in the ink colour** -
so two brand marks with nothing in common line up on the same left edge. Measured on the page:
cell 20x20, Google `#4285F4` intact, Apple `rgb(28,28,28)`, fill `#FF5A00`, outline
`--line-strong`, hint `--text-secondary`.

Two claims were checked against the code rather than repeated. Both held: `.btn.dark:hover` really
does exist in three editions (`opacity:.93`, `filter:brightness(.92)`, and a border/ink swap in two
more files), and `.sbtn` really is the only form with a complete press - hover lifts it by 1px with
`--elevation-control`, `:active` puts it back. That went onto the page as the states section, and
the three editions went onto the gap list as a defect rather than a description.

**22 atoms: 4 pass, 18 to go.** The list is the work, and it is now generated by the pages
themselves rather than by an opinion about them.

### The Apple mark looked small, and the numbers said it was not

Owner, on the two sign-in buttons: Apple reads smaller than Google and out of proportion. The
declarations looked innocent - 18px against 19px, five percent apart. Measured by **ink**, the gap
was four times that:

| mark | fills its viewBox | ink at the old size |
|---|---|---|
| telegram / viber | 100% - the disc IS the mark | 16.0 |
| google | 83% | 15.8 |
| apple | 72% | **13.0** |

Same lesson as the icon set, one level up: **equal box is not equal size**. A mark with more air in
its viewBox has to be given a bigger box to carry the same ink.

So the component now declares the **ink** it wants and each mark derives its own box from the share
it fills - factors `24/20` and `24/17.3`, measured on the paths. The rule lives in `icon.css`, once,
and the two components that had been sizing marks by hand (`button.css`, `checkout-form.css`) each
say one thing: `--brand-ink: var(--fs-16)`.

For that to work a mark has to be nameable, so `uivBrandSvg()` now writes `data-mark` on the svg -
which also means the showcase stopped pasting the Google and Apple paths into its own demo and
builds them from `design/system/icons.js`, like a screen does. A page holding its own copy of the
marks was the same second-edition problem the icons step spent two rounds deleting.

Result, measured on the auth screen, the checkout and the showcase: **both marks, 16.0px of ink**,
in boxes of 19.2 and 22.2. The buttons did not change height.

One thing the fix surfaced: the icon slot was a fixed 20px, so Apple's new 22.2px box hung 1.1px
out of it on each side - centred, invisible today, and broken the moment that slot gets a ground of
its own. The slot now fits its mark with a 20px floor.

## Is it global? Checked, and it was not

Asked plainly - are these fixes everywhere, or only on the page we were looking at. The answer had
to be measured, and measuring found a hole.

**The showcase had two head templates.** The component and basics pages are built by
`kitgen.HEAD`; the census pages and the family pages had their own copy, written earlier. So the
behaviour files added to one head reached 23 of 34 stand pages, and eleven - including
`census-icon.html`, a page whose whole subject is the glyph set - loaded no glyphs at all. Both
copies now carry the same two lines, and the reason is written next to them.

Coverage after, verified by loading each page and asking it what it has:

| layer | files | system css | glyph set | field rules |
|---|---|---|---|---|
| `design/` screens | 39 | 39 | 39 | 39 |
| `design/kit/` stand | 34 | 34 | **33** | **33** |
| `wireframes/` grey | 142 | 0 | 0 | 0 |

The one stand page without them is `kit.html`, the stage-07 kit kept deliberately as a frozen
smoke test - it has no glyph and no field to apply them to, and giving it the new files would spoil
exactly what it is for.

**The grey layer is zero on purpose.** `wireframes/` owns structure and behaviour and is frozen
after Voice; the coloured layer owns the visual. That boundary is why the phone in the grey
prototype still formats through its own `wfAuthDigits()` while every coloured screen and every
stand page formats through the system. Named, not hidden.

And the count that matters - how many editions of each thing exist:

| | editions | where |
|---|---|---|
| the glyph set (48 paths) | **1** | `design/system/icons.js` |
| the Google and Apple marks | **1** | same file |
| brand mark sizing | **1 rule** | `icon.css`; two components only name the ink |
| the field's rules | **1** | `design/system/fields.js` |
| tokens | **1** | `design/system/tokens.css` |

That is the whole point of the last three steps: a fix lands in one file, and every layer that is
allowed to see it, sees it.

---

# Step 6.1 - the button becomes a set, starting with the header

The owner's brief: buttons are not all in the kit, they live inside molecules too, and they have to
be gathered everywhere before anything is decided. So they were measured everywhere first.

## The corpus

**8 523 clickable controls** on the 39 coloured screens at two widths, folded into **89 button
forms**. Stand chrome and things that only look like buttons - filter chips, size options, tabs,
thumbnails, brand cards - are excluded and counted separately; they are components of their own.

**39 files declare a button.** `button.css` is one of them. That is the finding in a single number:
the atom was not a file, it was a habit repeated in forty places.

The scatter, by file: `checkout-form` 20 forms, `account-shell` 18, `order-row` 15, `banner` /
`cart-drawer` / `cookie-banner` / `review-modal` 14 each.

## The same look under different names

| finish | classes drawing it |
|---|---|
| accent, r8, 14px | `.navbtn` x34 · `.on` x10 · `.rk-add` x4 · `.addr-add` x2 · `.ob-repeat` x2 · `.pf-save` x2 |
| outline, r8, 16px | `.numbtn` x68 · `.auth-x` x10 · `.cd-x` x6 · `.oosback` x2 |
| outline, r8, 14px | 24 with **no class at all** · `.mc` x14 · `.loadmore` x14 · `.co-city` x4 |
| ghost, r100 | `.acc-link` x48 · 32 with no class · `.logout` x8 |

The sharpest one: **the bonus button in the header and the close button of a dialog are the same
form** - outline, 46 tall, r8, 16px. One look doing two opposite jobs.

## The set

Five finishes, and the question they answer is always the same - how loud is this action next to
the ones beside it: **accent · outline · ghost · text · icon**.

Three sizes, and they are **padding and type, not a fixed height**, because a button that wraps has
to be allowed to grow; `min-height` carries the touch target: **S 8/12 14px min34 · M 12/16 16px
min44 · L 16/24 18px min52**.

The ladder is not invented: the measured heights cluster at 34, 40-47, 49-54 and 59-64, so
**34 / 44 / 52 / 62** covers every cluster with no step moving more than 3px. `--size-52` and
`--size-62` were added for the two rungs the scale was missing.

**Width is not a size.** 47 forms are auto, 7 are full - full is the exception, and it never changes
which finish a button has.

**Class names are not renamed and will not be.** They are shared with the frozen grey prototype, so
renaming in one layer only would desync the two. The set is applied to the names that exist.

## The header, done first

Four forms, 191 instances, and the row now says one thing at a time:

- **Каталог** stays the only loud thing - accent, icon and label. **The chevron is gone**: the
  button already goes to the pressed fill while the mega menu is open, so the mark repeated a state
  the fill was already carrying. Verified: rest `#FF5A00`, open `#E85200`, chevron `display:none`.
- **Квіз, Бонуси, Кошик, Увійти, Обране** are all **ghost** now - nothing at rest, a warm ground and
  accent ink under the cursor. Before this, Увійти had the ground, Квіз had bare text, and the two
  counters had outlines: three finishes for five neighbours in one row.

`header.css` lost eight visual declarations plus the four rules that dressed and rotated the
chevron; it keeps position, width and the mega-menu state. **A conflict is removed at the source,
not out-specified** - the first attempt put the set in `button.css` and left the old declarations in
`header.css`, which loads later, so nothing changed on screen. The rule from step 5 holds: order is
part of a rule.

## The button page now shows the scope, not an opinion about it

The census existed only in a chat answer until this step. It is now on
`design/kit/button.html`, generated from `design/kit/docs/btn-census.json` - the file the browser
walk wrote - so the page cannot claim a number the measurement does not have.

**Two new sections.** The **set**: five finishes, each rendered through the class the product
actually uses for it, because the set is applied to the names that exist and showing it through an
invented class would show something the product does not have. The **census**: all 89 forms with
count, owner file, height, radius, width mode and states; the rows where three or more classes
share one look are tinted, the ones with no state at all are flagged red. 57 rows tinted, 26
flagged.

Building the demo taught the page something it now says out loud: **three of the five finishes
would not render at all without their context.** `.navbtn` needs `.wfh-nav`, `.go` needs
`.wfh-search`, and the mobile toolbar's `.mc` is `display:none` above 860, so it cannot be shown on
a desktop page at all. That is not a demo detail - it is the fact that a part of this product's
buttons exist only inside their own block, which is exactly why the set has to be applied by name
rather than by adding a new class to markup nobody may edit.

## Step 6.2 - the footer, and the state column that was lying

### What the footer actually has

Measured on `design/product.html` at 1280 and 360: **41 clickable things in one footer, and exactly
one of them is a button.**

- `.wff-news button` **«Підписатись»** - the only action. 58 instances, one per footer.
- 39 links: 14 column links, `.wff-phone`, two `.wff-msg`, 16 `.seolink`, three social, three legal.
- 1 action wearing a link: **«Змінити згоду»** is `<a href="#" onclick="openCookieSettings()">`.

So the answer to "are the footer's text buttons in scope" is **no, they are links** - a button is an
action, a link is a place. The one real button is now in the set, and the one impostor is written
down as a defect instead of being restyled to look like what it is not.

### The one button, joined to the set

`.wff-news button` was the only accent button in the product **declared outside `button.css`**, and
it showed: its own **4px radius** - the single 4 on any control anywhere - its own 12px type, a
**1px** border where every other button has 1.5, and **no state at all**.

It now takes the accent finish at size S. `footer.css` declares nothing about it any more; the
CSSOM says its only owners are `base.css` and `button.css`. The field welded to it followed the
radius to 8: a pair in one row cannot round differently.

**Two states join the accent finish, and neither existed on any button in the product:**

- `:active` reads **`--bg-action-pressed`**, a role that already existed and was read exactly once -
  the catalogue button with the mega menu open. It was named "the pressed accent" and then used as a
  variant. It is a state, so now it is one.
- `:focus-visible` reads a new **`--ring-focus-control`** = `0 0 0 2px var(--bg-page), 0 0 0 4px
  var(--line-action)`. `--ring-focus` is a tint halo drawn *inside* the edge: right on a white
  field, invisible on an orange fill, because the halo and the fill are the same colour. A control's
  ring is drawn *outside* it - a gap in the page colour, then the accent line.

Hover was deliberately left as `opacity:.93`. Three components repaint `.btn.dark` on an inverted
ground and each cancels that hover with `opacity:1`; changing the axis here would quietly break all
three.

**Proof that nothing else moved:** the same walk before and after - 39 screens, two viewports, 8 428
controls - produces one single difference. 58 elements leave the `h37` bucket and land in `h41`. No
other key changes, and the total is identical.

### The state column was wrong in both directions

The census read states by text match: a class name and a `:hover` found in the same file counted as
a state. That is not a state, that is a coincidence of two strings.

- **Under-reported.** `.wff-msg` (116) and `.wff-phone` (58) hover through `.wff-col a:hover` - a
  rule that never names either class.
- **Over-reported.** `.btn` has no `:hover` anywhere in the system. The 7 instances that do react
  are inside `.pstrip`, whose local rule hovers `.btn:not(.dark)`. The census said the outline
  button had a hover; the outline button has none.

The column is now measured in the browser: every rule whose **subject** - the rightmost compound -
carries a state pseudo is stripped of that pseudo and run through `querySelectorAll` on the live
screen. If the element comes back, the state is real for that element, cascade and context
included. A pseudo on an ancestor (`.card:hover .btn`) is not the button's state and is not counted.

Coverage is counted **per instance**, so a state that only exists in one container is printed as
what it is: `.btn` shows **7 з 58**. **25 rows changed.** Forms with no state at all: **7** among
the action buttons, not 26.

Two bugs of my own, found by this pass and fixed:

- `document.styleSheets` gives the aggregator's `@import` rules, not the imported rules. Walking
  them without following `rule.styleSheet` found **5** state rules instead of **175**.
- The stand's own self-check read `:focus-visible` as `:focus`, because the alternation listed
  `:focus` before the longer name.

### Left standing, with numbers

- **14 footer links are 30px tall.** The set's own floor for a dense row is 34 and the touch minimum
  is 44. This is a link, not a button, so it is not fixed here - it is the accessibility pass at
  step 8, and it costs +196px of footer height on mobile.
- **Six footer links carry an inline `style`** (`color:inherit`, `text-decoration:underline`).
  Inline beats every token, so this is a finished wall standing in front of the dark theme.
- **«Змінити згоду» is a button written as a link.** The markup lives in the frozen grey `_nav.js`,
  so it is fixed when that layer is unfrozen, not before.
- **The newsletter placeholder truncates** at 1280 - the string needs ~164px and the column gives
  ~135. It truncated before this step too; the fix is either a shorter string (voice) or a wider
  column, and that is a decision, not a value.

## Step 6.2b - the icon buttons

### What was there

Measured on the 39 coloured screens at two widths: **15 icon-only forms, 506 instances, seven
different boxes** - 18×20, 21×32, 26, 34, 40, 44, 54 - while the anatomy on the button's own page
promises a 44px touch minimum. Both statements cannot be true at once.

| | box | ground | where |
|---|---|---|---|
| `.fav` 166 | 26 | none, and a `border-radius:50%` nobody can see | card photo |
| `.cartbtn` 188 | 44 / 40 at ≤620 | accent | card |
| `.wfh-mi a` 86 | 21×32 | none | mobile header |
| `.lfav` 14 | **18×20** | none | list card |
| `.wlrm` 12 | 26 | none | wishlist card |
| pager 10 | 34 | outline | listing |
| `.wish` 6 | 54 | outline | buy row |

### The rule

**The ink stays whatever the mark needs. The target is never below 44.** Two ways to get there, and
which one applies is decided by the layout, not by taste:

- **the box grows** where the control is positioned rather than laid out. The heart is absolute at
  top/right 12 with a 26 box; at 44 the same optical centre is top/right 3. `12 - (44-26)/2 = 3`.
  Nothing moves on screen and the tap area is 2.9× bigger. Verified: the mark's centre is 26px from
  the card's top and right edge before and after.
- **`::after` extends** where the control stands in a row and a bigger box would push its
  neighbours. It costs nothing in layout, and it is sized from the **measured gap** so it stops
  short of the next control instead of overlapping it: pager 8 → `inset:-5px` (44×44), header icons
  16 → `inset:-6px -8px` (37×44), the list heart 12 → `inset:-12px -6px -12px -13px` (37×44).

All four were verified with `elementFromPoint` in the browser: the pager takes a click 4px outside
its own edge and refuses one at 7px, where `.pgnav` starts.

`.lfav` ends at **37** wide, not 44: the list row has 12px of gap and the card cannot widen without
moving its own columns. 37 is what the row has, and it is written down instead of being rounded up
in a comment.

### `cart-button.css` is gone

The file said the same thing twice - once for `.pcard`, once for `.pcard-l` - and said it in the
card's context, though nothing about that button is the card's. It is now the accent icon finish in
`button.css`, under one `.cartbtn`. The one rule that really was somebody else's - «already in the
cart» - moved to `checkout-form.css`, because that state belongs to the upsell and the button only
wears it.

Folding the two card types into one selector first shrank the LIST card's button from 44 to 40 at
≤620, since the media query no longer said which card it meant. **The walk caught it: 6 buttons
moved with no reason behind them.** The query now names `.pcard`, and the reason is written next to
it - at 620 the grid card is half a phone wide; the list card is full width and keeps 44.

The stand is 82 rows instead of 83, and 31 done instead of 32. The atom was the button all along.

### `favourite.css` was three stylesheets in one

The same selector was declared three times in a row and each one undid the one above: a 30px circle
with a white ground, then a 34px circle with a photo-safe ground, then `width:auto; height:auto;
border:none; background:none`. Only the third was ever visible, so the product had a bare 26×26 mark
whose stylesheet described a bordered circle - and `border-radius:50%` survived all three rounds
with nothing left to round.

It now holds one rule: where the mark sits and what it says by colour. Its box and its target are
the icon finish.

### Proof

The same walk before and after - 39 screens, two viewports, 8 428 controls - gives **six
differences and no others**: `fav` 166, `fav.on` 6 and `wlrm` 12 move from a 26 box to a 44 box.
Every other key is identical in count, radius and ground.

### Left standing

- **10 pager arrows have no accessible name.** They are icon-only and carry neither `aria-label` nor
  text. The older note on this page said 41 - that number counted the grey prototype too; on the
  coloured screens it is 10.
- **`checkout.html` overflows 11px at 360.** Toggling every rule from this step off leaves it
  unchanged, so it is older than today and belongs to the step-8 pass.
- **The view toggle's halves are 35 tall.** They are a segmented control, not a button, and
  extending them vertically would reach into the toolbar row above - a decision, not a value.

## Step 6.3 - the outline finish, and the role question from 5.5

### The owner's call first

**БОНУСИ and КОШИК get their border back.** Step 6.1 folded the whole header row into ghost;
these two are the header's counters, they carry a number, and a number needs an edge to sit in. They
are now outline, and their hover is the one they had before 6.1, restored verbatim: the edge goes to
ink, a warm ground comes up, and the label stays ink instead of turning accent. Ghost keeps Квіз,
Увійти, Обране and Мій кабінет - the plain actions standing beside them.

### What the outline family looked like

Measured on the 39 coloured screens at two widths: 12 named forms, 121 instances, 11 files.

| | |
|---|---|
| border width | 1.5 almost everywhere, **1** in the pager and `.ob-collapse` |
| border colour | `--line-strong` in most, `--line-hair` in others |
| label colour | ink in nine forms, `--text-secondary` in five - and nothing marks those five as quieter |
| hover | **six different editions**, and `.btn` itself had none: of its 58 instances the 7 that reacted did so through `.pstrip .btn:not(.dark):hover`, a local rule on the home page |

### The role question, answered

Step 5.5 refused to fold `--line-strong` and `--line-hair` on the button and said so out loud: it is
not a value drift, it is an unanswered question - **is a button's line the edge of a control, or a
hairline inside a surface?**

**It is a control edge.** A hairline separates things lying on one plate; a button is a thing you
press, and its edge has to hold against the plate rather than blend into it. So the outline finish
is `1.5px solid var(--line-strong)`, one label colour (ink), and one hover.

The hover is not invented either - it is the idiom the product had already written in four separate
places (`.pstrip`, `.cshelf`, the pager, the coach banner): **the edge and the label go accent.**
`:active` fills with `--bg-action-soft`, `:focus-visible` takes `--ring-focus-control`.

### Named exceptions, each with its reason

- **`.sbtn` and `.co-soc`** lift on `--elevation-control` instead of turning accent. One decision,
  not two: both names are the same control - «sign in with Google / Apple», one in the auth dialog,
  one in checkout.
- **`.auth-x` and `.cd-x`** are out of this finish entirely. They are the ✕ of a dialog: an outline
  box with no label, so their finish is the icon one - the mark stays quiet and hovering lifts a warm
  ground. A close is not the action of the screen it closes.
- **`.wfh-act.numbtn`** keeps the hover named above, by the owner's decision.

### What was deleted

Local editions of the outline's colour, border or hover, removed **at the source** rather than
out-specified: `banner.css`, `trust-strip.css`, `pagination.css` (which held «Показати ще» three
times over and the pager's hover twice), `buy-box.css`, `cart-drawer.css`, `toolbar.css` (the same
hover written twice, the second cancelling the first), `auth-dialog.css`, `checkout-form.css`,
`review-modal.css`.

One trap on the way, and the walk caught it: deleting the colour block's `--line-strong` from
`pagination.css` let the older **structure** block win, and `.loadmore` would have taken an ink
border. When a file declares the same thing twice, removing the later copy promotes the earlier one -
so both go.

### Proof

The same walk before and after - 39 screens, two viewports, 8 428 controls - gives **six differences
at rest** and no others:

| | |
|---|---|
| `.wfh-act.numbtn` 68 | border transparent → `--line-strong` (the owner's call) |
| pager 10 | border 1px → 1.5px |
| `.wish` 6 | label secondary → ink |
| `.btn.cd-cont` 4 | label secondary → ink |
| `.btn.gh` 2 | label secondary → ink |
| `.btn` 1 | label secondary → ink |

**States, measured after:** 19 census rows gained one. Forms with no state at all among the action
buttons: **3** - `.on` in the gallery, `.ord-h`, and `.cd-blocked`, which is a disabled button living
under the name of a variant. It was 26 when this step opened.

### The stand's own check found two of my bugs again

- The page's self-check counted a class inside `:not()` as a class the file styles, so
  `.pages a:not(.on)` made it demand a demo of `.on` - it asked the page to render an absence.
- Two demo cells rendered 0×0: `.mc` and `.ob-collapse` exist only below 860, their own block is
  `display:none` above it. They are shown anyway now, each with that written under it, because the
  page has to show the whole file.

## Step 6.4 - the text finish, and the line between a button and a link

### The split first, because it decides almost everything

**2 850** elements on the coloured screens carry neither a ground nor a border. Read out of their own
markup - `<button>`, `onclick`, `role="button"`, or an `href` that leads somewhere - they divide:

| | |
|---|---|
| **542** | actions |
| **2 308** | links |

A link is not a button. It belongs to the `link-row` component, and the rule on the button's own page
has said so since step 5: **a button is a deed, a link is a place.** So this finish covers **seven
names and about sixty instances**, and the rest of that pile is deliberately left where it is.

**Checked and found to be links, so the question is closed:** «Усі 6 →» (26), «Читати більше ↓» (4),
«Залишити відгук» (3), «Очистити все» (2), «Завантажити квитанцію» (1), «Скасувати та повернутись»
(1).

Two of those deserve a note. **«Читати більше ↓» is an in-page anchor** - `href="#seo"` - so the
arrow is honest: it goes down the same page. And **«Очистити все» is a deed by its job and a link by
its construction**: in a prototype with no back end, "clear the filters" IS the unfiltered page. That
is a note for the build, not a defect of the design.

### The finish

Colour and behaviour only. There is no box to size, so **the type stays with the context** - 12px in
the utility bar, 14px in a form row. What is one for all of them: **ink, accent under the cursor, a
focus ring.**

**The underline is a rule, not a taste.** It goes on where the button stands **inside a sentence**,
because nothing else there says it is a control; it stays off in a row of controls, where the
position already says it. Today: two names carry it, five do not. Before this step the underline was
on six forms and off five with nothing separating them.

**No `:active`.** A text button has no ground to press; the only thing left to move is the type
itself, and type that jumps under the finger is worse than no answer at all.

**Two named exceptions.** `.pf-dangerbtn` goes to `--text-danger` on hover instead of the accent - a
destructive action stays quiet until you go for it, and it was already written that way.
`.wfh-loc` and `.wfh-lang` («Одеса», «Укр») take only the focus ring: that utility bar declares one
colour and one hover for its whole row, and a control standing in a row does not get to be louder
than the row. Its hover is the accent anyway, so the idiom already matched - what it lacked was the
keyboard.

### Deleted

`.fmore` was declared **four times** in `button.css` with its hover written **twice, identically**.
`.ci-lnk` had its hover written twice in `cart-row.css`, and the second cancelled the first: one
added an underline, the next removed it. `.pf-actbtn`, `.pf-dangerbtn` and `.co-toggle` gave up
everything the finish now carries.

### Proof

Same walk, before and after: 39 screens, two viewports, 8 428 controls. **Four differences at rest**,
all of them the same one: `.ci-lnk` (22) and `.pf-dangerbtn` (2) go from `--text-secondary` to ink.
Nothing else moved, and no screen gained horizontal scroll.

**States:** 5 more census rows gained one. Among the action buttons **3** remain with no state at all
- `.on` in the gallery, `.ord-h`, `.cd-blocked` - down from 26 when this series opened.

### Left standing

- **`.fmore` is not a button for the keyboard.** «+ ще 11 брендів» is a `<div>` with no `role` and no
  `tabindex`: it looks like an action, works like one with a mouse, and does not exist for a keyboard
  or a screen reader. The markup is in the frozen grey layer.
- **`.cd-blocked`** is still a disabled button living under the name of a variant.

## Step 6.5 - disabled is a state, not a variant

### What was there

Six controls on the coloured screens are off, and they wore **two different looks - both of which
turned out to be right, and unwritten:**

| | | |
|---|---|---|
| `button[disabled]` × 4 | the − and + of a quantity stepper | no plate to grey out, so only the mark goes pale: `--mark-disabled`, cursor `not-allowed` |
| `.cd-blocked` × 2 | «Оформити замовлення» with an out-of-stock line in the cart | a boxed button, so the box itself goes quiet: `--bg-sunken`, hairline, muted label |

So the product already agreed with itself about what OFF looks like. It just never said it out loud,
and it said it through a **class** - and a class is a variant, while this is the same button, now
unavailable.

### The rule

It hangs on the **attribute** from here on: `[disabled]` where the tag allows it and
`[aria-disabled="true"]` where the markup is an `<a>` or a `<span>` - which is also the only version
a screen reader can hear. Two shapes, exactly the two the product already had: a control **with** a
box loses its ground and its line; a control **without** one only goes pale.

`.cd-blocked` stays in the selector list because the grey prototype is frozen and the class is still
in its markup. It already carries `aria-disabled="true"`, so the day that layer thaws the class can
go and nothing in the system changes.

**These rules stand last in `button.css` on purpose.** Every finish above declares its hover, active
and focus at the same specificity, so being last is what lets a control that is off answer nothing at
all - without a single `!important`.

### Proof

Same walk, before and after: 8 428 controls, **one difference at rest**, and it is invisible - the
stepper's zero-width border colour resolves to `transparent` instead of `currentColor`. The visible
change is the one that was intended and is not in that list because it happens on one screen:
`.cd-blocked`'s border goes from `--line-strong` to `--line-hair`, because a control that is off does
not hold a strong edge.

Two traps on the way, both caught by measuring instead of trusting the edit:

- removing the colour block's `.cd-blocked` rule took its `font-size` and `padding` with it - the
  button silently grew from `12/16` to `12/24` until the walk showed it;
- `cart-drawer.css` loads after `button.css`, so its `border: 1.5px solid var(--line-strong)`
  shorthand kept overriding the state's colour. The file now declares `border-width` and
  `border-style` and leaves the colour to the state.

### Where the set stands now

**Five finishes and four states, all measured, all applied to the names that exist.** The census
counts **3** action forms with no state at all - down from 26 when this series opened - and the third
of those three is in the list by mistake: `.cd-blocked` *is* the disabled state, so it cannot have a
hover of its own. Two are real.

| | |
|---|---|
| accent | `:hover` `:active` `:focus-visible` `:disabled` |
| outline | `:hover` `:active` `:focus-visible` `:disabled` |
| ghost | `:hover` `:disabled` |
| text | `:hover` `:focus-visible` `:disabled` |
| icon | `:hover` `:active` `:focus-visible` `:disabled` |

### Left standing

- **`.on` in the gallery** and **`.ord-h`** - two forms with no state at all.
- **`.fmore` is not a button for the keyboard** - a `<div>` with no `role` and no `tabindex`.
- **`checkout.html` overflows 11px at 360** - older than this whole series, proven by toggling.
- The frozen-markup list: «Змінити згоду» written as a link, six inline `style` attributes in the
  footer, 10 unnamed pager arrows.

## Step 6.6 - the size ladder stops being a comment

The owner looked at the set on the page and said it plainly: this is still bad. And it was. Five
finishes had been applied on top of a drift that nobody had touched - **the size**.

### What the measurement said

Among the action buttons alone: **25 different heights, 13 paddings, 5 type sizes, 4 radii**, set by
**75 rules spread over 23 component files**. The ladder `S / M / L` existed only in the comment at
the top of `button.css`. Five finishes on top of that do not make a set - they make five ways to be
inconsistent.

You could see it in one screen of the stand: «У кошик» at 20px next to «Знайти» at 14, «Деталі та
ТТН» bigger than the accent button beside it, and «Згорнути» with no radius at all.

### The rule

    S   8/12 · 14px · min 34 · r8     a dense row: header, toolbar, promo strip, a card's actions
    M  12/16 · 16px · min 44 · r8     the default, and the touch minimum
    L  16/24 · 18px · min 52 · r12    the one action of a whole screen

**M is the default and is written first**, so S and L only have to name the exceptions. A context
selector (`.pstrip .btn`) outweighs the plain name, which is exactly the mechanic the ladder needs:
a button is small **because of where it stands**, not because someone typed a smaller padding that
day.

**The radius follows the size** - and that is the last piece of the answer step 5.5 could not give:
8 for a control, 12 for the one button that is itself a panel, which is only ever the L one.
`--radius-4` no longer appears on a control anywhere.

**Height is not in the ladder.** `min-height` is a floor for the touch target; the real height comes
out of padding and type, so a button that wraps grows instead of clipping.

### What it cost and what it gave

**122 size declarations deleted from 20 component files.** A component file now declares no padding,
no type and no radius for a button - only where it stands, how wide it is, and its own margins.

Measured after, over 574 button instances on 39 screens at two widths:

| | |
|---|---|
| S `8/12 · 14 · r8` | 451 |
| M `12/16 · 16 · r8` | 62 |
| L `16/24 · 18 · r12` | 59 |
| off the ladder | **2** - and they are `.oh-status.go`, a status pill that happens to share the class name `.go` with the search button. Not a button. |

Heights went **25 → 18**, paddings **13 → 4**, radii **4 → 3**. The heights that remain are the
honest ones: a button that wrapped at 360, an icon button's square box, and the header row's pinned
46.

### Three defects the ladder exposed, all fixed

- **The checkout scrolled sideways at 360.** It had done so before this step by 11px and the size
  change pushed it to 51 - which finally made it worth chasing. The cause was three layers deep: a
  `1fr` grid track takes its floor from the min-content of what stands in it, and the social sign-in
  pair could not shrink. Now `minmax(0, 1fr)`, and `min-width: 0` on the pair and on the field welded
  to «Отримати код». **No screen in the product scrolls sideways at 360 any more.**
- **Folding `.mba` into M** made the buy bar's only action the same size as a card button. It is L:
  it is the one action of that screen.
- **`font: inherit` on `.ob-collapse`** silently reset the ladder's type back to 16px. The shorthand
  sets every font property, including the one the set had just decided. It now sets `font-family`
  only.

### Left standing

- `.oh-status.go` shares a class name with a button and is a pill. A rename is a grey-layer change.
- `.acc-link` (124) is a pill-shaped nav chip in the account menu, not a button - it stays with the
  link row.

---

## Step 6.7 - the button becomes one class

The owner stopped the work at 6.6 and said the buttons were still wrong. They were, and the
previous six steps are why: **they consolidated the rules and left the names alone.** This file
said so out loud, in `button.css`, as a decision: *"class names are not renamed here and will not
be: they are shared with the frozen grey prototype."* That decision was wrong.

### What the measurement said

Every button on the 39 coloured screens, grouped not by its class but by **how it actually
renders** - ground, border, ink, type, weight, padding, radius, minimum height:

| | |
|---|---|
| button instances | **704** |
| distinct class names | **56** |
| distinct renderings | **44** |
| renderings a closed set of 5 finishes x 3 sizes can produce | **about 10** |

Five finishes laid over 56 bespoke names are not a set. They are five ways of being inconsistent,
and the file proved it: adding a button meant adding a 57th name to five different selector lists.

What the owner saw on the page was every symptom of that at once. All of it was real:

- **«Каталог» is 41.4px tall.** Not one button in the product had a whole-pixel height:
  `8 + 8 + 14x1.6 + 1.5x2 = 41.4`. The reading line-height (`--lh-airy`) was doing the sizing, and
  the `min-height: 34` written under it **never fired once**.
- **A button on two lines.** `.auth-alt` («Надіслати новий код») sat in L. It is the second action
  of the auth dialog; the first is «Отримати код». The same mistake as `.mba` at 6.6, made twice.
- **A button with a ground under it.** `.bb .dpcity` painted its own `--bg-surface` and a 1px
  border in `buy-box.css`, which loads after `button.css`. The outline finish never reached it.
- **A grey square under the heart.** That one is the demo, not the product: `.fav`'s rule was
  written as `.pcard .fav`, so the page had to draw a card for the mark to exist at all. Which is
  the diagnosis, not the excuse - the icon finish belonged to the card, not to the button.
- **Three buttons that look the same.** Same finish, same size, three weights: **400 / 600 / 700**.
  And the accent family was split between a 1.5px border and none, so the same button was two
  different outer sizes depending on which name it happened to have.
- **Two «Отримати код», two grounds.** Black (`--bg-inverse`) in checkout, accent orange in the
  auth dialog.

### The API

```html
<button class="btn--accent btn--l btn--full">Оплатити карткою</button>
<a      class="btn--outline">Деталі та ТТН</a>
<a      class="btn--ghost btn--s">Квіз</a>
<button class="btn--accent btn--icon" aria-label="У кошик">…</button>
Номер підтверджено. <button class="btn--text btn--inline">Змінити</button> будь-коли.
```

**The finish IS the button.** There is no base class: the four finishes carry the box, the type
and the focus ring between them, and a size or a width on its own does nothing. Size is `--s` or
`--l` or nothing (M). `--full`, `--icon`, `--inline`, `--danger`, `--lift` are the rest.

A base class named `btn` was written first and then measured, which is how it was caught:
`wireframes/_wf.css` declares `.btn` of its own, and the moment `_nav.js` started emitting the
base class, **191 controls in the frozen grey prototype repainted**. Dropping the base class put
that back to **0 of 2872 elements changed** - the grey layer renders identically, pixel for pixel,
with the API classes sitting on its markup doing nothing at all until stage 09 comes for it.

**The old names stay in the markup and stop being a look.** They are the hook a component uses to
say WHERE its button stands - margin, flex, position, min-width. Two layers force this anyway: the
header, footer, drawer and auth dialog are built at runtime by `wireframes/_nav.js`, which the
frozen grey prototype shares. Adding a class there is safe in both directions; renaming would
break the grey layer, which never loads `button.css`.

**The height is a number.** The label runs at `--lh-snug`, the height is `min-height`, and a label
that wraps still grows past it - which is what a minimum means.

| | padding | type | height | radius |
|---|---|---|---|---|
| **S** | 8/12 | 14 | **40** | 8 |
| **M** | 12/16 | 16 | **52** | 8 |
| **L** | 16/24 | 18 | **64** | 12 |

An equal 12px rung, and nothing moved more than 1.4px from where it already was. `--size-64` is
new; 62 existed and was not used, because the measured L was 63.8 and the largest action of a
screen should round up rather than lose two pixels.

**Every boxed finish carries the same 1.5px border** - the accent one in its own colour, the ghost
one transparent - so the outer box is identical across finishes and swapping one moves nothing.

### The result, measured the same way

| | before | after |
|---|---|---|
| class names / API combinations | 56 | **22** |
| distinct renderings | 44 | **23** |
| declarations of button look in component files | - | **314 removed, from 24 files** |
| buttons carrying the API | - | **798** on 39 screens |
| screens scrolling sideways at 360 | 0 | **0** |

The 23 are not drift. Fifteen combinations render exactly one way. The rest are **states** -
`[disabled]`, `.on` (the page you are standing on), `.fav.on` (saved) - and the text finish, which
renders five ways **by rule**: it has no box, so the sentence around it decides the type.

### Decided along the way

- **Dialog footers are M.** All 31 `.btn` / `.btn dark` pairs in `_nav.js` are a quiet «Скасувати»
  beside a loud confirm. L is reserved for the one action of a whole SCREEN, which a dialog is not.
  This moved `.pm-f` and `.fsheet-foot` from S to M.
- **Two black grounds became accent.** `.co-getcode` and `.coach-newcta` were the last two
  `--bg-inverse` buttons in the product. There is no black finish in the set.
- **Every close is a ghost icon.** `.auth-x` and `.cd-x` had an outline box, the drawer and sheet
  closes had none, and their ink was two different greys. One quiet mark, a warm ground on hover:
  a close is not the action of the screen it closes. The ✕ ink is 20 everywhere - one was at 16.
- **The pager is an icon button.** 34px box with a 1px border and an `::after` stretching it to a
  44 target, replaced by a 40 box that IS the target.
- **The coach banner CTA is outline by class**, not by an `#coach-banner .btn.dark` override. That
  ID rule was the exact pattern this step exists to remove.
- **L loses 8px of side padding below 480.** Giving the accent finish its border was enough to push
  «Підтвердити замовлення» onto a second line at 360. The type stays 18; the air does not.

### Two exceptions, both written down

- **`.lfav`** in a list card keeps its own 18x20 box and its `::after` target: the row gives 12px of
  gap and has nowhere to take 40 from. Because it has no `--icon`, its quiet ink is stated locally.
- **`.ltool .count`** («Знайдено: 24 товари») is a LABEL that shared the `.ctrl` class with the sort
  button and was borrowing its box. It now states its own.

### Still open

- `.oh-status.go` shares a class name with the search button. A rename is a grey-layer change.
- The grey prototype's markup now carries API classes it does not use. That is deliberate and it is
  what **Крок 6** is for: the roll-out onto `wireframes/`, `ui-visual/` and `ia/` after stage 09.

---

## Step 6.8 - a button never wraps, and the set shows everything

Three things the owner named after 6.7, and one bug found while chasing them.

### A button never wraps

A label on two lines is not a long button - it is a button that does not fit where it was put.
So `white-space: nowrap`, and then every consequence measured on the 39 coloured screens at 1280
and 360. Eight buttons were folding their label; after the rule, four of them would have spilled
out of their container instead, and each got a real fix rather than a shorter word:

- **THE PHONE STEP.** Below 480 every size gives back one step of side air, and L also drops to
  the M type - 18 is a desktop luxury, and a label that has to be read is worth more than the air
  around it. Height and vertical padding do not move: the touch target is not negotiable.
- **The out-of-stock buy row stacks.** In stock the row is «У кошик» + the heart and both fit; out
  of stock the action is «Повідомити про надходження», which needs the whole 328px of a phone
  column. Sharing the row with a 54px heart was pushing the buy box to **371px and scrolling the
  whole page sideways by 42**.
- **The processing card gives its side padding to the button inside it** below 480.
- **One label was shortened**, and it is the one that is not product copy: the stand's forward
  affordance on the processing screen, «Оплату підтверджено - продовжити →» → «Оплату
  підтверджено →». The arrow already says «продовжити». The comment above it in the markup says
  what it is: in the product this screen auto-redirects and the control does not exist.

Measured after: **0 buttons wrap, 0 overflow, 0 screens scroll sideways** - at 1280 and at 360.

### The two counters of the header

- **Left aligned.** Their two lines read as a column, so they start from the button's left edge and
  not from the centre every other label gets. The cart carries a sum and a count here, two values
  of different lengths - centred, the button would shift as the number changes.
- **The star became the honey jar** (owner's call). The jar is already the store's own reward shape:
  the loyalty rung uses it and it fills as lifetime spend grows. In the header it stands EMPTY on
  purpose - a fill level means a TIER, and the header is a way in, not a rank.
- **All four states were already built** and are now shown: «Бонуси / Отримати» with no balance,
  «Бонуси / 124 ₴» with one; «Кошик» alone when empty, «Кошик / 1 520 ₴» with a count chip when not.

### The set shows everything

The page carried a representative sample. It now carries **the whole inventory**: all 25 class
combinations the 39 screens actually use, generated from the browser walk, each with a real label,
the hooks behind it and the number of instances. A combination that is not on that page is not on
the site.

### The bug found on the way

The owner could not open a screen to show a cart state, and the reason was real: the home node is
`index.html` (a stage folder's index IS its home page), so `wfStateFile` built `index-buyer.html`,
`index-coach.html`, `index-cart.html` - **three files that have never existed**. The state files
were built as `home-*`. The registry entry now carries `stateFile: 'home.html'`, the stem the state
names derive from. Dead links across the grey prototype and the coloured screens: **3 → 0**.

---

## Step 6.9 - a mark beside a word

The owner asked why the set has «icon only» and «text only» and nothing in between, when the site
is full of buttons that carry both - and in Figma a button component enumerates exactly that:
`icon: none / left / right`.

**The form is real.** Measured on the 39 coloured screens: **17 forms, 243 instances** put a mark
next to a label - «Каталог» with the grid, «Бонуси» with the jar, «В обране» with the heart,
«Продовжити з Google» with the brand mark, «Одеса ▾» with a caret.

**It needs no class**, and that is the honest half of the answer. The button is an `inline-flex`
with a `gap`, so a mark written before the label stands on the left and one written after it stands
on the right. `.btn--icon-left` would declare nothing; this stage's rule is that a class exists when
it says something the cascade cannot. In Figma the property is a property because Figma has no
document order to read - in css the markup already said it.

**What it did need was the rule underneath, and there was none.** Next to the SAME 14px label the
mark's ink measured **15, 17, 18, 19 and 21** - five sizes decided by five component files, and the
biggest of them came from a `font-size` on a wrapper span that nobody thought of as sizing an icon:
`.uiv-ic svg` is `1.05em`, so `.wfh-act.stack .g{ font-size: 20 }` silently meant «this heart is 21».

Now the button decides, on the same ladder the icon-only button already used:

| | label | mark ink |
|---|---|---|
| **S** | 14 | **18** |
| **M** | 16 | **20** |
| **L** | 18 | **24** |
| **text** | inherited | **1.15em** - no box, so the sentence decides both |

A brand mark declares its INK and derives its own box from the share of the viewBox it fills, which
icon.css already computed: Apple is a silhouette with air around it, Google a glyph, and an equal
box would give them unequal ink.

**And the two sides are not the same thing**, which is the part worth writing down:

- a mark **before** the label is a **noun** - it names the thing the button acts on, and the button
  still reads without it;
- a mark **after** the label is **punctuation** - a caret that says «this opens», an arrow that says
  «this goes on». It follows the LABEL's size, not the ladder, because it belongs to the sentence.
  That is why `▾` on «Одеса» is 13px and correct.

**11 declarations deleted** from header.css, checkout-form.css, cart-row.css, buy-box.css and
product-card.css - every place a component was sizing a mark inside a button.

One consequence had to be paid for: the city chooser in checkout grew 5px of mark and stopped
fitting a 247px phone column. Below 480 it now wears the set's **S** size - a component may pick
which size of the set it wears, it may not invent one.

Measured after: **0 wraps, 0 overflow, 0 sideways scroll** at 1280 and 360, and the ink next to a
14px label is one number instead of five.

---

## Step 6.10 - a value that is not a token is not a value

Three findings from the owner, all on the набір page, and one of them turned out to be the cause of
the other two.

### The set page was ugly because two of its values did not exist

`design/kit/button.html` asked for `var(--space-20)` in a `gap` shorthand and `var(--fs-11)` on the
source line. **Neither token exists.** An invalid value in CSS does not fall back to something near
it - it drops **the whole declaration**. So:

- the inventory grid had **no gap at all** (measured: two columns of 355px inside a 710px box, the
  columns touching);
- the source line - the least important of the three lines in a cell - rendered at the **16px it
  inherited**, larger and darker than the class row it is a footnote to.

Nothing in the file looked wrong when read. The browser is the only place this is visible, which is
exactly why acceptance happens there.

**A sweep for the same defect across the whole system found six more**, in five component files:
`--fs-11-5`, `--fs-14-5` (twice), `--fs-12-5` (twice), `--fs-13-5`. Six real screens were rendering
type at the size they inherited rather than the size the file names: `.auth-consent` and `.auth-sub`
in the auth dialog, `.bb .simple` on the PDP, `.cd-oosnote` in the cart drawer, `.cedlg p` in the
client dialog, `.fullcomp` in the spec table. Every one of them was **larger** than intended, up to
4.5px.

Each is snapped to the nearest rung of the real scale, said out loud rather than invented:
11.5 -> **12**, 12.5 -> **12**, 13.5 -> **14**, 14.5 -> **14**. The half-step sizes came from inline
`font-size:13.5px` in the coloured screens, which is a leftover of the visual layer and not a scale;
the scale is 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 34 and has no half rungs.

**The check itself is the deliverable**: every `var(--x)` without a fallback, matched against every
custom property the system defines. It runs in a second and should run before any acceptance pass.

### Two hearts that looked identical

The owner: «why are there duplicates - one used 89 times and one 3 times, and they look the same?»

They were not duplicates. One is `.fav`, the other `.fav.on` - **saved**. It looked identical
because saved was written **three times in three files**, and none of the three was reachable from
the kit page:

| file | selector | what it said |
|---|---|---|
| favourite.css | `.pcard .fav.on` | ink |
| product-card.css | `.pcard-l .fav.on`, `.pcard-l .lfav.on` | ink + fill + stroke |
| buy-box.css | `.bb .wish.on` | ink + fill + border |

One meaning, three property sets, each valid only inside the card it was written for. The same heart
said «saved» differently depending on where it stood.

Now it is one state in `button.css`, beside `off`: **an engaged mark takes the action ink and fills
itself**, and the outline finish couples its border to that ink exactly as it already does on hover.
The three editions are deleted. `.pcard-l .lfav` keeps its quiet ink - it is the one bare mark that
cannot afford a 44 box, because it stands in flow rather than on a photo - but as `:not(.on)`, so a
component can no longer out-specify a state.

**The pager keeps its own `.on`** and deliberately does not read this rule: there «engaged» means
«you are standing on this page», which is a filled square, not a filled mark. One class name, two
meanings - a rename that belongs to the grey layer and is logged, not done.

### The header jumped 25px when a number arrived

Measured at 1280, the four counter states were: «Бонуси / Отримати» **124**, «Бонуси / 124 ₴**»
98.6**, «Кошик» **100**, «Кошик / 1 520 ₴» **103**. The header moved every time a balance or a cart
sum appeared, and the `min-width: 96px` that was supposed to prevent it sat **below all four**, so
it never bound anything.

The floor is now **124** - the widest **empty** state. Empty is the state whose width is fixed by
copy rather than by data, so it is the only one that can set a floor. All four states now measure
exactly 124, on all 68 counter instances across the 39 screens. If «Отримати» is ever re-worded,
that number is re-measured.

### The набір page now reads on the matrix's grammar

Label pinned to the top (`align-items: start`, which the matrix had and this block did not - that is
why the descriptor floated to the middle of a tall row), **two declared columns** instead of
`auto-fill` letting caption length decide how many columns a row got, and `grid-template-rows:
subgrid` so the three lines of a cell - plate, class row, source - stand on one line across the
whole row whatever height the button is.

Measured after: **0 wraps, 0 overflow, 0 sideways scroll** at 1280 and 360; all six re-tokenised
lines render at their intended size; the three saved hearts and the runtime toggle in the buy box
render identically to before the consolidation.

---

## Step 6.11 - what the colour layer never received

The owner, on the quiz invitation under the six goal tiles: make the button smaller, take the size
from the system, and make the sentence smaller and nicer.

Measured first. The block was not a row at all: `.goalcta` computed `display: block`, no gap, no
margin - the button and the sentence were two inline boxes with a space character between them, and
the "gap" in the screenshot was that space. The sentence measured **16px near-black**: it had no
rule of its own and inherited the body.

The cause is the same shape as step 6.10's dead tokens, one level up. `.goalcta` and `.goalcta
.hint` **exist only in `wireframes/_wf.css`** and were never carried into `design/system` at the
step-3 split. The grey prototype has them; the colour layer does not; nothing anywhere says so.

### The audit that follows from it

Every class the grey prototype styles, that appears on a coloured screen, and that has **no rule at
all** in `design/system`: **13**.

Ten of them are correct - `.co-confirm`, `.loadmore`, `.navlink`, `.notify`, `.pf-actbtn`, `.sbtn`,
`.gh`, `.wfh-cabbtn` are the old names step 6.7 emptied on purpose (the look moved to the API class,
the name stayed as a hook that says WHERE the button stands), and `.coach-newcta` / `.cn-plus`
belong to a coach screen that exists only in the grey prototype so far.

**Three were real losses**, and two of them are on live coloured screens:

| class | grey said | colour rendered | now |
|---|---|---|---|
| `.goalcta` | flex row, gap 10, margin-top 14 | `display:block`, no gap | flex, gap 12, margin-top 16 |
| `.goalcta .hint` | 12.5 / secondary | **16 / near-black** | 14 / secondary |
| `.fmore` | 12 / tertiary / margin-top 9 | **16 / near-black** | 12 / secondary / margin-top 8 |

`.fmore` is «+ ще 11 · пошук бренду» under a long filter list - it was rendering **louder than the
14px options it extends**, in 14 places across the listing screens.

### Three decisions, said out loud

1. **The quiz button steps down L -> M.** L is «the single action of the screen». Here that action is
   the six tiles; the quiz is the alternative for someone who cannot pick one, so it takes the
   default size. 64 -> **52**, label 18 -> **16**, on all four home screens.
2. **The hint is 14 secondary**, not the 12 that a mechanical snap of 12.5 would give. `.lintro`,
   the supporting line 20px above it inside this same block, is 14 secondary; two supporting lines
   of one block at two sizes is noise, and the hint is a full sentence, not a caption.
3. **`.fmore` keeps grey's 12 but comes back as SECONDARY, not tertiary.** Tertiary is
   `--text-muted`, which is what an OFF control wears in this system; a live control must not wear
   the disabled ink.

### A note on the instrument

The first 360 pass reported ten screens overflowing by up to 1711px and nineteen wrapped buttons.
None of it was real: 39 iframes x ~70 stylesheets exhausted the connection pool
(`ERR_INSUFFICIENT_RESOURCES`), so those screens rendered with no CSS at all. The harness now loads
in batches of four and disposes each frame before the next. **A measurement that disagrees with the
last one is a claim about the instrument until proven otherwise.**

Measured after, batched, both viewports: **0 sideways scroll, 0 wraps** on all 39 screens; the CTA
is identical on all four home screens (52 / 16 / 14, one row at 1280, stacked at 360); all 14
`.fmore` at 12 secondary.

---

## Step 7 - the field

The same treatment the button got at 6.7, on the atom next down the list.

### The census, before

Browser walk of the 39 coloured screens: **101 fields, 14 names, 14 looks.** Names and looks came
out equal, so there were no duplicate names here - and that was the only good news.

**66 of 101 were set in Arial.** A field does not inherit `font-family`; it has to be told, and three
files of fourteen told it. The two most used fields of the product - the header search (34) and the
footer newsletter (29) - were not in Inter, and their ink was pure `#000`, a colour the palette does
not contain.

**Nine heights for one atom:** 37 · 40 · 44 · 45 · 46 · 47 · 60 · 61 · 64. Four of them - 44, 45, 46,
47 - are the same intent, a form field, written in four files with four paddings. Borders in three
widths (0 / 1 / 1.5), radii in three (0 / 8 / 12), type in five sizes (12 / 14 / **15** / 16 / 24),
and 15 is not a rung of the scale - it arrived inside a `font:` shorthand that also hard-coded the
family.

**The states barely existed:**

| state | of 101 fields |
|---|---|
| focus | 72 (29 of them got whatever the browser draws) |
| hover | **6** |
| placeholder colour | **9** |
| disabled | **0** |

Zero. The button got its off state at 6.7; the field had none anywhere. The error state existed
twice, both times in someone else's file - `.otp .box.err` and `.pm-b input.err` - so two components
invented it separately and the field people type a phone number into could not show it at all.

### The API

```
.field                 the control - input, textarea, select
.field--s      40      a dense row: header search, newsletter, the number in a filter
(silent)       44      any form field - the touch minimum, and the box the icon button wears
.field--mono           the value is a number or a code
.field--err / .err     the edge and the halo, never the typed text
[disabled]             a state, not a variant - the button's tokens, for the button's reason
.field-grp             a field with something attached: +380, a lens, a button
```

Two rungs and no third, because nothing in the product occupies one. `.field-grp` replaces two
hand-built constructions (`.wfh-search`, `.ph-field`) that had different radii and different focus.

Three things the group had to be taught, each found by measuring rather than by reading:

1. `align-items: stretch`, not centre - a field that gives up its own box shrinks to one line, and
   its clickable area measured **34 inside a 40 box**.
2. `.field-grp > *{ min-height: 0 }` - a child that keeps its own minimum pushes the box past its
   rung. Measured **43 and 45** where the ladder says 40 and 44.
3. A button inside a group drops its border, and the `+380` prefix takes the field's line box - the
   last 0.2 and 0.6 of a pixel came from those two.

### What moved

- **89 fields** now hang on the API (the 12 OTP cells keep their own atom).
- Markup: `wireframes/_nav.js` (the shared runtime, 35 tags), `design/*.html` (12), `design/_nav.js`
  (the price inputs, built at runtime).
- **57 look declarations removed** from header.css, footer.css, checkout-form.css, buy-box.css,
  restock-note.css and review-modal.css. Two `font:` shorthands with hard-coded families died with
  them; three more survive in `.coachbox`, which is not a field and is logged for its own step.
- `.notifyrow` gets `align-items: center`: stretch had made its field **64**, a height no rung of the
  set has, borrowed from whatever stood beside it.

### The grey prototype

Proved unchanged rather than checked by eye: `wireframes/_wf.css` contains **zero** `.field*`
selectors and **zero** attribute selectors on `class`, and a diff of the shared runtime with every
`class="…"` masked is **identical** - this step added class tokens and nothing else.

### Measured after

Every field on all 39 screens, at 1280 and at 360: heights are **40 · 44 · 60** (OTP) **· 80**
(textarea) and nothing else; fonts are **Inter (74) and IBM Plex Mono (27)**, no Arial; ink is one
value plus the OTP error red; **0 sideways scroll, 0 wraps**.

### Step 7, after the owner walked the stand

Two findings, both real, and the first one was the more interesting.

**1. A mono field took letters.** The page's own antirule says the restriction follows the VALUE, not
the look - and the demo proved the rule was not enforced where the look was. The cause was in
`design/system/fields.js`: the guard's address was a list of three component names,

    var UIV_NUMERIC_SEL = '.otp .box, .in.uiv-num, input[type="tel"]';

which is exactly the defect step 7 had just removed from the CSS - a rule that reaches only the
places somebody remembered to name. A fourth numeric field written tomorrow would have taken letters
and nobody would have been told.

The address is now the declaration the markup already makes about the value:

    input[type="number"], input[type="tel"], input[inputmode="numeric"], input[inputmode="tel"]

That is a statement about the value, not about the look, which is why the guard deliberately does
**not** read `.field--mono`: mono is how a number is set, not proof that the value is one. The branch
field ("Відділення / поштомат") declares no numeric keyboard and still takes anything, which is the
whole point.

Verified with real keystrokes, not synthetic events - a dispatched `keydown` never fires
`beforeinput`, so the first test passed a field that was in fact unguarded:

| field | typed | value |
|---|---|---|
| price on the stand (`inputmode="numeric"`) | `1` `a` `5` | `15` |
| price filter in the product (`type="number"`) | `9` `e` `0` | `90` - `e` refused, which `type=number` alone allows |
| OTP cell | `q` | empty, and it still carries `autocomplete="one-time-code"` |
| street (no numeric declaration) | `a` | `a` |

**2. The textarea was standing in the «вимкнене» row and working.** An authoring error on the stand,
and the kind that matters: a set page that shows a live control under the label «off» teaches the
wrong thing. `багаторядкове` is its own row now - textarea 80 and select 44, the same box - and the
off row carries two genuinely disabled controls, an input and a textarea.

### Step 7.1 - the select's caret, and what a «dropdown» is not

The owner, on the new `select` cell of the set page: is that only about the box, or should dropdowns
be shown here too?

Measured first. The product has **one** `<select>` (the coach's client picker) and **five** controls
that open a menu (sort, language, cabinet, mega, city). They are not the same thing:

- a **select is a field** - its value leaves with the form, so it wears the field's box;
- a **menu opened by a button** returns nothing to a form; it changes the view or navigates. That is
  a button plus a menu, a different atom, and it does not belong on this page.

What the measurement also showed: `appearance` was `auto`, so the select was wearing **the browser's
own caret** - a mark nobody in this system decided, off the ink ladder of step 6.9, and drawn
differently on every platform. On `product-coach` it stood 150px above OUR caret on the city
chooser: two «choose something» controls with two different marks on one screen.

The closed state is ours now: `appearance: none`, 40px of room on the right (12 padding + 20 mark +
8 gap), and the same chevron drawing as `icons.js` (`M6 9.5l6 6 6-6`, 1.9 round). It is a background
image, so it cannot take `currentColor` - its ink is frozen in a token, `--field-caret`, and the dark
theme redefines that one line.

**The open list stays native on purpose.** No CSS styles a `<select>` popup, and the native list is
the one that works as a wheel on a phone and answers a screen reader. We own the closed state; the
platform owns the open one. Said out loud on the page rather than left as a gap.

**Logged, not done:** the caret now exists in two drawings - the svg chevron (icon.css, and this
select) and the typographic `▾` / `⌄` in 38 places of the runtime markup. Step 6.9 settled the SIZE
of a mark after a label; it did not settle whether that mark is a glyph or a character. That is its
own small step, because it touches `wireframes/_nav.js` in many places at once.

---

## Step 7.2 - the choice menu

The owner: can the select open the way our dropdowns do?

Yes - but the honest answer needed the measurement first. **What we were about to copy answered
the mouse and nothing else.** The sort control was ~25 lines in `design/_nav.js`: a list of buttons,
a click listener, an outside-click listener. No keyboard, no Escape, no focus return, no
`role`/`aria-expanded` - and on a phone it did not exist at all: the «Популярні ▾» button of the
mobile toolbar opened nothing, so **sorting at 360 was impossible**. A native `<select>` has every
one of those for free.

So the work was not «make the select custom», it was **one atom that both use**, or the product ends
up with two implementations of the same control - the defect this whole stage removes.

### The shape

```
design/system/components/menu.css     the look: popup, option, tick, separator, sheet
design/system/menu.js                 the behaviour: keyboard, ARIA, focus, portal

uivMenuFromSelect(select)   the select STAYS in the DOM and stays the value; the
                            menu writes back into it and fires `change`, so a form
                            does not know the difference and a page with no JS works
uivMenu(trigger, items)     a trigger that already exists in the markup (sort)
```

**An action is not a value.** «+ Новий клієнт…» leaves the listbox and becomes a button under a
separator. That is the reason the picker could not stay a native select: choosing that option would
have meant «the value is New client», which is false.

Keyboard, all of it new: ↓/↑ open on the chosen row (↑ on the last), ↑/↓/Home/End move, letters jump
(type-ahead, 700ms), Enter/Space choose, Esc closes and returns focus to the trigger, Tab closes.
Roles: `aria-haspopup="listbox"` + `aria-expanded` on the trigger, `role="listbox"` on the list,
`role="option"` + `aria-selected` on the rows.

### Four things the browser taught us, each by measurement

1. **The arrow was read twice.** ArrowDown on the trigger opened the menu AND stepped one row past
   the chosen one, because the same keydown bubbled from the trigger to the host. `stopPropagation`
   in the trigger's branch.
2. **`select.remove(element)` deletes the wrong option.** The API takes an INDEX; an element coerces
   to NaN -> 0, so removing the action row removed the first client. Measured: the select's value was
   the second client while the trigger showed the first.
3. **The sheet opened under the bottom tab bar.** `.mtoolbar` is sticky with `z-index: 20`, which is
   a stacking context - inside it no z-index of ours can rise above the tab bar's 50. Below 480 the
   popup and its scrim are moved to `<body>` while open and put back on close, which is also why the
   open state hangs on the popup itself (`.menu-pop.open`).
4. **The picker's trigger grew the form row by 4px.** A button's padding (12/16) made the box 48
   where the field ladder says 44. A menu built FROM a field keeps the FIELD's rung - 44, 16px, and
   the medium weight the select already carried (`font: 500 15px/1.2`).

### What moved

- `uivSort()` rewritten: it now says only what the options are and what happens on a pick; the list,
  the roles and the keyboard belong to the atom. The desktop and the mobile trigger are one control
  in two frames - choosing in either updates both.
- **The sort trigger became a `<button>`** on 7 listing screens. It was a `<span>`, which cannot take
  focus - that is a fact, not a preference. Logged for the Крок 6 roll-out back into the grey layer.
- 6 dead rules deleted from `toolbar.css` (`.uiv-sortmenu`, `.uiv-sopt` and friends).
- `menu.css` registered in `index.css`; `menu.js` loaded by the 8 screens that own a menu.
- New stand page `design/kit/menu.html`, registered in the kit as an atom.

Measured after, both viewports, all 39 screens: **0 sideways scroll, 0 wraps**, 15 menus built,
every list a `listbox`, the field-kind trigger 44 at 1280 and at 360, and nothing left of the old
hand-built menu anywhere.

---

## Step 7.3 - the button, second pass: what the stand did not say

The owner opened three buttons on the site and could not find them on the stand: `btn--text all`
(«Усі товари →»), the L action that measures 18 in the kit and 16 on the product page, and the big
accent button with an arrow on its right («Для тренерів →»). Every one of the three turned out to be
a complaint about the **stand**, not about the component, and the fourth question - "buttons are the
hardest thing to keep in correspondence with the pages" - turned out to have a mechanical answer.

Re-measured with the browser, 39 coloured screens, both viewports: **657 visible buttons at 1280,
485 at 360; 22 class combinations**. Accent 235, outline 159, text 153, ghost 110; icon-only 224.

### The three questions

**1. `btn--text all` IS in the system; its type and its ink are not.** The text finish declares
`font-size: inherit`, `font-weight: inherit` and one colour, so every text button is really dressed
by its component. Measured: **57 text buttons, three sizes (12 / 14 / 18) and two inks**, decided by
four component files. The stand showed one specimen of a thing that has five, which is why looking
for it failed. The five are now on the page with their owners and their counts.

**2. 18 versus 16 is a rule, not drift.** `.addcart` on product.html measures 18px/64 at 1280 and
16px/64 at 360 - the phone step written at 6.8, because a button may not wrap and three labels did
not fit in a 328px column. The rule was right and documented in `button.css`; the stand showed **one
viewport**, so it was showing half a component. There is now a size table with both columns.

**3. The arrow is a character, not a mark.** **34** buttons end in a typographic sign (32 `→`, 2
`▾`) and **not one** uses the icon component; the only real trailing marks are the **8** menu
triggers `menu.js` builds. And that is correct: a leading mark is a noun and takes the size ladder
(18 / 20 / 24), a trailing sign is punctuation and must grow with the label - which `→` does by
itself. What was wrong is that the stand described the form in a table and never showed it. It is a
specimen now. Still open: the caret is drawn twice - `▾` as a letter on `.dpcity` (2), a chevron from
`icons.js` on the 8 triggers.

### The mechanical answer to the fourth question

`design/system/components/*.css` each hold **two blocks** - structure from `wireframes/_wf.css` and
colour from `design/kit/kit.css` - concatenated at step 3, never merged. So one selector is written
twice in one file, and where both blocks set the SAME property the first one never renders.

Counted across the 50 component files: **582 dead declarations**. Reading a component file top-down
gives a number the browser does not use, 582 times. That is the machine that produced the drift the
owner keeps finding by eye:

- `.bb .wish` said **50** in the structure block and **54** in the colour block, while the class on
  the element (`btn--icon btn--l`) says **52**. The stand's caption already claimed 52. Fixed: the
  component declares no box at all now, and the heart measures 52.
- `.ci-lnk` said **12**, rendered **14**. One declaration now, and it is 14.
- `.pf-act` said `--text-primary`, then `--text-body` - the same value under two names. Gone.
- `.sech .all` said `--text-primary`, then `--text-secondary`. One line now, secondary, which is
  what the browser was drawing all along.

**The rest were swept the same day** - see step 7.4 below. The check is falsifiable in source (same
file, same selector, same media, same property, different value), so it belongs to the Codex half of
the critique.

### Two more the measurement found on its own

**The inventory did not close in both directions.** `btn--outline btn--icon btn--s` (the pager, 22
instances on 5 screens) was on the site and not on the stand. Added, with the note that its `.on`
means "you are standing on this page" - a filled square, not a saved mark.

**A brand mark was setting a button's height.** On auth.html «Продовжити з Google» measured 55.8 and
«Продовжити з Apple» 59.6 - two identical controls one under the other, 3.8px apart, both over the M
rung of 52. Each mark oversizes its own svg to keep the INK equal (the 6.9 rule), so the svg was the
tallest thing in the button. `.uiv-brand` now has a box pinned to `--brand-ink` and the
`vertical-align: middle` that `.uiv-ic` always had and it never did. All three buttons measure 52.

### The stand's own false sentence

The variants table said the inverted finish exists and that `.btn.dark` renders white. Measured:
**34** elements carry `.dark` and **zero** render inverted - the inverted fill belonged to the grey
prototype and never crossed into colour. One of the 34 is legitimate (`.fsheet-foot .btn.dark{ flex:
2 }`, a layout hook); the other 33 are dead classes, to be removed with the Крок 6 markup roll-out.
The table now says what the browser says.

### The instrument note

The first verification pass showed the heart still at 54 after the rule was deleted: the browser was
replaying the `@import`ed stylesheets from its own cache, and a `Cache-Control: no-store` server does
not evict what is already in memory. `Network.clearBrowserCache` over CDP before every measurement
pass. Same family as the batched-iframe trap: **a measurement that disagrees with the last one is a
claim about the instrument until proven otherwise.**

### Left open for the owner

The text finish stands on the minority: **14px in 43 of 57** and secondary ink in **42 of 57**, yet
the base declares `inherit` and `--text-body`. Giving `btn--text` a base of 14 / secondary and
leaving `inherit` to `btn--inline` would delete three of the four component declarations. It costs:
15 cart links move from body ink to secondary, and the list-card heart's mark shrinks from 18.4 to
16.1 because it is measured in `em`. Not done - a value moves only by a decision said out loud.

Also logged: the header row holds a 40 field beside 46 buttons (`.wfh-actions .wfh-act`), and 46 is
on no button rung. It is the natural height of a two-line S button, so the number is not arbitrary -
but it is not named either.

---

## Step 7.4 - the sweep: 1038 dead declarations out of 49 files

Step 7.3 named the machine; this step turned it off. Every file under `design/system/` was walked,
and every declaration that a LATER rule with the same selector, the same file and the same media
condition sets again was cut out. Same selector means same specificity, so the later one always wins
for every element that matches: deleting the earlier one cannot move a pixel, and the whole point of
the step is to prove that rather than to claim it.

**Cut: 1038 declarations** - 571 where the two values differed (the file said one number and the
browser drew another) and 467 where they were identical (the same value written twice). **159 rules
were left holding nothing and were removed whole.** `design/system` went from **5041 to 4860 lines**.

The sweep refuses one case on purpose: where the EARLIER declaration carries `!important` and the
later one does not, the earlier wins and cutting it would change the render. Zero such pairs turned
up, but the rule is in the tool, not in somebody's memory.

### The acceptance, and it is the whole point

The proof is not that the diff looks small. It is a **computed-style snapshot of everything**:

- **73 pages** - all 39 coloured screens AND all 34 stand pages, because both load the same
  `system/index.css` and a showcase that is not proved proves nothing.
- **two viewports**, 1280 and 360.
- for every element, **75 computed properties plus the exact geometry** (width, height, x, y at 1/100
  of a pixel), hashed. **62 514 elements** at 1280.

Before the sweep, the same pass was run **twice with nothing changed in between**, to find out what
the instrument does on its own. It is not silent: **14 elements on 5 loading screens** differ every
time, all of them carrying `.skpulse`, the skeleton animation, sampled at different moments.

After the sweep the diff is **byte for byte that same list** - same 5 pages, same element indices, at
both viewports. Nothing else moved anywhere.

Of the 59 distinct properties cut, 58 are either read by the snapshot directly or are shorthands
whose longhands it reads. The one exception was checked by hand: `html{ scroll-padding-top }` said 96
in the structure block and 100 in the colour block, and 96 never applied.

### The tool's own bug, which the render diff did NOT catch

The first run of the sweep left four files with a `/*` that never closes. The rule that removes an
emptied block used `[^{}]*?` for the selector, and a negated class crosses newlines - so it matched
from the middle of the COMMENT above the block down to the block's closing brace and swallowed the
comment's `*/` with it. The computed-style diff came back clean, because the wreckage sat at the end
of each file and an unterminated comment simply runs to EOF.

It was caught by a second check that reads the FILE rather than the page: braces balanced, no comment
marker left over after stripping every `/* */` pair. Then the whole sweep was thrown away, the CSS
restored from the tar taken before it, the selector pinned to a single line with no comment marker in
it, and the sweep run again from the top.

**A render diff proves the render. It does not prove the file.** Two checks, not one.

### Swept out with them

Five files carried a `/* mobile field size (step 5.5) */` comment above an `@media (max-width: 859px)`
block that had been empty since the rule moved into `base.css`. The comment described a rule that was
not there. One line now, pointing at where the rule lives.

### What remains true after

Both checkers report **0 dead declarations**. Braces balanced and no stray comment marker in all 74
files. No JS error, no 404, and no sideways scroll at 1280 or 360 on the fourteen pages sampled by
hand on top of the full sweep.

---

## Step 7.5 - the arrow becomes a mark, and the specimen gets its hover back

Two owner findings, one small and one that reversed a decision written three steps earlier.

### «Усі товари» had no hover on the stand

On the site the control answers the cursor - accent ink on a warm plate, from `.sech .all:hover`.
On the stand it did not, and the reason was the specimen: it had been pulled out of its component
into a row of samples and given an inline colour, which no `:hover` rule can outrank. The stand was
showing a control that does not react while the product's does.

The section head is now shown WHOLE, as its own component, inside the demo. Measured on both: at
rest `rgb(91,91,84)` on transparent, on hover `rgb(255,90,0)` on `rgb(250,249,247)` - identical.
**A specimen out of its component is not the component.**

### «А не краще зробити стрілки іконками?» - yes, and the earlier answer was wrong

Step 7.3 wrote that the trailing `→` should stay a typed character, because a character grows with
its label for free. That argument was incomplete, and one fact breaks it:

**`→` is U+2192, so it is part of the LABEL and a screen reader says it out loud.** «Усі товари →»
is announced as «Усі товари, стрілка вправо» - a direction read as if it were a word. A mark with
`aria-hidden` is silent, which is what a decoration owes. And the character's one advantage, growing
with its label, is something `1.15em` in `button.css` already does.

So the 34 signs are marks now: `arrowRight` joins the set in `icons.js`, drawn on the same anatomy
(viewBox 24, safe area 2, stroke 1.9) with `caret`'s 45-degree head, so a caret reads as the head
alone and an arrow as the head on a shaft. `.dpcar` is gone with the `▾` it used to shrink to 10px -
the caret is no longer drawn twice.

**Addressed by the control and the position:** any button whose label ENDS with a mapped sign,
wherever it stands. Same correction the numeric-field guard got at step 7.

### Three things the browser corrected, all in this one step

1. **`:last-child` fires on a LEADING mark.** CSS counts ELEMENT children, and a button's label is a
   bare text node - so in `<a><span class="uiv-ic">…</span>Квіз</a>` the leading mark is also the
   last element child. Measured: the 34 header nav links dropped their mark from 18 to 16.1. CSS
   cannot see a text node, so the side has to be stated: `.uiv-trail`, written by whoever puts the
   mark there. This is the one place where step 6.9's «the markup already says which side» does not
   hold, and the page now says so.
2. **A global map has a global blast radius.** Putting `→` into `UIV_EMOJI` also fed `UIV_RE`, which
   `uivIcons()` runs over whole regions - header, drawer, footer, tab bar. Measured on
   cart-empty.html: **27 marks appeared** on a page that has exactly zero trailing arrows on a
   button. The trailing pass has its own map now. A sign that means «this button leads somewhere» is
   not the same character doing duty inside a sentence.
3. **The snapshot harness was measuring at viewport 0.** Every computed-style pass so far called
   `walk(0, …)`, and that number is the IFRAME WIDTH: `innerWidth` was 0, `body` was 0 wide. Both
   sides of the step 7.4 diff were equally degenerate, so the comparison held - but it only exercised
   the rules that are live at width 0, which is every non-media rule and every `max-width` rule, and
   **not the `min-width` ones**. So the 7.4 sweep was redone from the tar at a real **1280**: restore
   the pre-sweep css, snapshot, apply, snapshot, diff. Result: the same 14 skeleton-animation
   elements on the same 5 loading screens and nothing else, at 1280 as at 0.

### Measured after, 73 pages, real 1280 and real 360

**0** sideways scroll. **0** typographic signs left at the end of any button label. **285** leading
marks, all on the size ladder (S 18 · M 20 · L 24, and 1.15em where the text finish sets the type).
**48** trailing marks - up from 8 - every one of them at **1.15em** of its own label: 14 -> 16.1,
16 -> 18.4, 18 -> 20.7. Two positions, two rules, both now in code rather than in a paragraph.

### Step 7.5 - two owner questions after the fact

**«Where in the product are the inline text buttons?»** All four are on ONE screen - the profile card
in the account: «Змінити - код у SMS» beside the phone, «Додати - код на пошту» beside the e-mail,
«Змінити» beside the language, «Видалити акаунт» at the foot. The kit's count was right (3 + 1); what
it did not say was WHERE, and it says it now. They were also missing from the step-7.3 table of the
text finish's five renderings, because they carry a second class and are counted under a different
API key. Text finish, whole: **61**.

**And the measurement contradicts the code.** `btn--inline` is declared for a button standing INSIDE
a sentence, and `button.css` adds «in a row of controls the position already says it». Measured on
all four: three sit in `.pf-row`, a flex with `space-between`, pinned right, with no word beside them
in that node; the fourth stands alone in its own block. **Not one is inside a sentence**, and the
product has no true in-sentence use at all - so the underline `btn--inline` draws is decoration the
system's own rule does not ask for. The neighbour by job is `.sech .all`: 28 text actions in the same
position, no underline, hover doing the work. **Not changed** - it is a decision about the look.

**«Are the mega-menu links buttons?»** No, and correctly so. Measured with the panel open: **143
links, zero buttons** - every item is an `<a href>` that goes to another page and changes nothing,
which is the step-6.4 rule for what a button is not.

**But the arrow now splits along the wrong seam.** Re-measured after 7.5 across the 73 pages: **20
trailing signs remain and not one is on a button** - «Докладніше про програму →» (6), «Усі покупки →»
(5), «Як це працює →» (1), `▾` in `.chev` (8), plus the mega-menu column heads. All links, so the
pass never sees them: it is addressed at `[class*="btn--"]`. The same sign still has two drawings;
the split just moved one class over. The arrow does not belong to the button, it belongs to the SIGN,
so the address has to widen from the button to the **control** (`a`, `button`) - not to yet another
list of names. Left for the link atom, where the decision about a link's look belongs.

---

## Step 7.6 - the underline off, and the arrow moved from the button to the control

Two owner decisions, taken after step 7.5 measured what was actually there.

### The underline is off

`btn--inline` is removed from the four profile actions. Measured after: the underline is gone on all
four, and nothing else moved - the ink stays `rgb(28,28,28)` at rest and the hover still goes accent
`rgb(255,90,0)`. The neighbour by job, `.sech .all`, has worked that way all along on 28 controls.

`btn--inline` now has **zero uses in the product**. It stays declared, like `btn--ghost` at M, and the
stand says so out loud instead of showing it as something the product has.

### The arrow is addressed at the control, not at the button

The pass moved from `[class*="btn--"]` to `a, button, summary, [role="button"]`. Not to another list
of names, and not to text: a paragraph is not in that list, so body copy stays copy. That closes the
20 signs 7.5 left standing - the mega-menu column heads, «Докладніше про програму →», «Усі покупки
→», «Як це працює →», the accordion `▾`.

**The size rule moved with it, out of `button.css` and into `icon.css`.** Punctuation cannot be one
size on a button and another on a link, so there is one line now - `.uiv-ic.uiv-trail svg{ 1.15em }` -
and it wins over the button's size ladder on order, because `icon.css` is imported after
`button.css`. That ordering is stated in both files rather than left to be discovered.

### Four things the browser corrected, again in one step

1. **The sign hides in four shapes, not two.** Bare in the control («Для тренерів →»), alone in a span
   of its own (`.dpcity > .dpcar`), one box deeper (`.ord-h > .oh-drop > .chev`), and at the end of a
   nested line (`…<span class="ms-fb">Дивитися →</span>`). One walk down the last child to the text
   itself covers all four; the earlier version handled two and silently skipped the others.
2. **The box around the sign must survive.** `.oh-drop` is a 30x30 bordered square with a hover of its
   own, and the `.chev` inside it is rotated when the row opens. The first version replaced the last
   ELEMENT, which would have taken the box and the rotation with it. Now the letter is swapped in
   place and the class, the transition and the transform stay.
3. **A sign that IS the whole label is not trailing.** The pager's «›» is an icon-only control, and
   without a guard it would have been re-sized as punctuation. One line: if nothing is left of the
   label after the sign, it is not a label with punctuation.
4. **The mark had no space of its own.** It is placed with the space in front of it removed, because a
   button is a flex row whose `gap` sets it off - and a link is not, so on the mega-menu head the
   arrow landed flush against the last letter. The space is the mark's now
   (`.uiv-ic.uiv-trail{ margin-left: var(--space-4) }`), and the button gives it back because its gap
   already does the job. The «give it back» rule names both classes on purpose: at equal specificity
   `icon.css` would win on order.

### Measured after, 73 pages, real 1280 and real 360

**0** sideways scroll · **0** typographic signs left on any control · **120** visible trailing marks
at 1280 and **68** at 360, and **every one of them at exactly 1.15em** of its own label - one number,
one place · **285 / 251** leading marks, ladder untouched (S 18 · M 20 · L 24) · `btn--inline` present
on the stand only · no JS error.

### Step 7.7 - three defects that are about the control, not the look

Answering «is anything left on the buttons» with a sweep rather than a memory. Nothing was wrong with
any rendering: 0 labels wrapped, 0 links used as actions. Three controls were broken in a way the eye
cannot catch.

1. **«+ ще 11» in the filter rail was a `<div>`** - 7 of them, one per listing screen. It looks like a
   control and cannot be focused or pressed by a keyboard at all. The same defect the sort trigger had
   at 7.2. It is now a `<button type="button">`, and because it is built by `wireframes/_nav.js`, the
   SHARED runtime, the fix lands in both layers at once - no divergence to carry back at Крок 6.
   Measured on both after: colour 12px `#5B5B54` inline-flex 19.2 tall with the system's focus ring;
   grey 12px `#999` inline-block 18.6 tall with the browser's outline. Neither moved.
2. **The pager's «next» had no name.** The caret has been a mark with `aria-hidden` since long before
   this move, and nobody put an `aria-label` on the control, so a screen reader announced NOTHING. 5
   of them, 4 `<a>` and 1 `<button>`. Named «Наступна сторінка» - a new interface string, so it wants
   a line in `voice/docs/microcopy.md`.
3. **The blocked checkout in the cart drawer could not be reached.** `<span role="button"
   aria-disabled="true">` with no `tabindex`. The whole point of `aria-disabled` rather than
   `disabled` is that the control STAYS focusable, so the person can arrive at it and hear why it is
   blocked; without a tabindex they never arrive. `tabindex="0"` added.

**Found while fixing, same control, same one attribute:** the pager marked the page you are standing
on with a filled square and told a screen reader nothing about it. `aria-current="page"` on all 5.

Measured after, 73 pages at 1280 and 360: **0** icon controls without a name (was 5), **0** controls
unreachable by keyboard (was 8), 0 sideways scroll, 0 typographic signs left, every trailing mark
still 1.15em, no JS error.

Still open and still the owner's: the text finish standing on the minority (14px in 43 of 57,
secondary ink in 42 of 57), the header row's 46 beside a 40 field, and the 34 dead `.dark` classes
that go with the Крок 6 markup roll-out.

## Step 7.8 - one number, five owners; and the ladder that had a second ladder

Both of the questions step 7.7 left open were answered by counting, and one of the two answers
reversed the recommendation I had written down.

### The unit was wrong, and the wrong unit gave the wrong advice

7.7 reported the text finish as «14px in 43 of 57, secondary ink in 42 of 57» and proposed a base of
14 / secondary. Both halves of that count were **instances**, and the product has 83 identical hearts
on product cards. They carry `btn--text` for its ink and outvoted everything else.

Recounted by **class combination** over the 39 coloured screens: 163 elements, 12 combinations.

- **7 combinations carry a label. All 7 render 14px.** Not one of them inherits it: `section-head`,
  `cart-row`, `checkout-form` (twice) and `address-card` each write `var(--fs-14)` by hand. Five
  files, one value, and `font-size: inherit` in `button.css` deciding nothing in any of them.
- **6 of those 7 are primary ink.** The single exception is `.sech .all`. So the base ink
  (`--text-body`) was already right and the 7.7 proposal would have made 12 cart links wrong.
- The other 5 combinations have no label: `.fav` / `.wlrm` / `.fav.on` are `--icon` (box 44 and glyph
  20, both absolute - the font size under them is inert), `.lfav` is 18, `.fmore` is 12.

Done: `.btn--text{ font-size: var(--fs-14) }` and the five repeats deleted. Weight stays on `inherit`
because nobody measured it. **The stand moved and the product did not** - which was the point. The
`btn--text` specimens on `design/kit/button.html` were drawing at 16 because the demo box around them
is 16, so the showcase was showing the text button LARGER than the shop does. That is the same
«18 on the stand, 16 on the product» gap the owner opened step 7 with, in the other direction.

### 46 was the only height of its kind in the system

`.wfh-actions .wfh-act{ height: var(--size-46) }` in `header.css` beat the atom's `min-height: 40` on
136 controls across all 34 pages that have a header. `--size-46` held no other control anywhere -
only spinners and thumbnails.

**The clamp itself is right**, and that is why it stayed. With the clamp off: `.numbtn` measured 40
and 43 (one carries a two-line cap/value, one a plain label) and `.stack` measured 60.6 and 63,
because it is a COLUMN - mark over label. Four heights in one row is what a clamp is for. Only the
number was wrong, and the right one was already in the system: **44**, the finger minimum, which
`btn--icon`, `field.css` and `menu.css` all stand on, and which the cart mark in that very row uses.
Measured at 44 on every header page: content sits flush, 0px past the border box. At 40 it would not
fit. The search shell came up to meet it (40 -> 44), so the whole bar is one height now; it reads
`field-grp--s`, whose only job is 40, so that is an override in `header.css` and not a change of
rung - the small field is still 40 everywhere else. Dropping `--s` from the markup belongs to Крок 6,
because the markup is in the shared `wireframes/_nav.js`.

`box-sizing: border-box` left with the 46: `base.css` sets it on `*`.

### The ladder has two ladders, and the stand said only one

Measured, 39 screens: **504** boxed buttons, **233** on the label ladder 40 / 52 / 64. The other 271
are **eight kinds**, and seven of the eight are two numbers:

| height | × | who | why |
|---|---|---|---|
| 44 | 101 | `.cartbtn`, `.cartbtn.notify`, `.co-getcode`, `.menu-trig` | `btn--icon` has its own ladder 40 / 44 / 52 - a square has no label to measure a width from. Already stated in `button.css`; the stand's axis table did not repeat it. |
| 46 -> 44 | 136 | the three header actions | above |
| 37 -> 41 | 34 | `.go`, the header search submit | **not a defect**: the button sits INSIDE the field and takes its inner face, 44 minus 1.5 border twice. The same shape of rule as the text finish taking its size from the sentence - it was simply never written down. |

### Proof

Baseline taken before the edits, 73 pages x 2 viewports = 146 page-states, 135 256 elements, 33
computed properties plus exact geometry. Browser cache cleared over CDP between the passes, because a
`no-store` server does not evict what is already in the browser's memory cache.

What moved: the header row (search shell 40 -> 44, its input and `.go` 37 -> 41, the three actions
46 -> 44, the header 114.2 -> 112.2, and each page 2px shorter), the `btn--text` specimens on the
stand (16 -> 14, deliberately), and 92 icon hearts whose computed font-size went 16 -> 14 **with no
geometry change at all**, because their box and glyph are absolute. Nothing else. The `skpulse` and
spinner elements that differ are the instrument's own animation noise, the same set as in 7.4.

Not one text button in the product moved by a pixel.

### Withdrawn on verification

- «`.go` is 37, under the 40 tap minimum» - **withdrawn**. It is the inner face of a 40 (now 44)
  shell and the shell is the target.
- «`.dark` should be swept» - **withdrawn as new**. The stand's axis table already recorded, at step
  7.3, that one of the 34 is a live layout hook (`.fsheet-foot .btn.dark{ flex: 2 }`, on markup that
  `wireframes/_nav.js` injects) and the other 33 go with the Крок 6 roll-out. Re-verified, unchanged.
- «`btn` without `--` may be dead» - **withdrawn**. 11 container rules in the colour layer hook on it
  for layout, and zero controls carry `btn` without a `btn--*` finish.

## Step 7.9 - the two legacy names stop meaning anything

`btn` and `dark` came from the grey layer. In the colour layer neither paints, and step 7.3 already
recorded that all 34 `.dark` render as ordinary accent. What kept them alive was **twelve CSS rules**
that still hooked on them - eleven on `.btn`, one on `.btn.dark`. That is what made the pair a trap
rather than dead weight:

- the stand had to carry a footnote - «33 of the 34 are dead, one is not» - the kind of caveat that
  is read once and then acted against;
- and the markup sweep at Крок 6 could not run without breaking layout in twelve places, so it kept
  being deferred, which is how a leftover becomes permanent.

**All twelve said the same thing: how a control shares a row.** Eight of the nine containers hold
exactly two controls and nothing else - outline plus accent, a footer whose whole purpose is the
pair. So the rule moved to the container, where it owes nothing to any class on the child and cannot
be forgotten by whoever writes the next dialog:

| was | is |
|---|---|
| `.co-err-acts .btn` · `.ceact .btn` · `.cedlg .act .btn` · `.wf-ckset-f .btn` · `.pm-f .btn` · `.cshelf .cs-act .btn` · `.fsheet-foot .btn` | `> *{ flex: 1 }` |
| `.fsheet-foot .btn.dark{ flex: 2 }` | `.fsheet-foot .btn--accent{ flex: 2 }` |
| `.notifyrow input, .notifyrow .btn{ flex: 1 1 100% }` | `.notifyrow > *{ flex: 1 1 100% }` |
| `.cd-empty .btn{ margin-top }` | `.cd-empty > .btn--accent, .cd-empty > .btn--outline` - the one container with mixed children (mark, heading, copy, then the two actions), so `> *` would space the copy too |

`> *` was not a new idiom: `auth-dialog`, `banner`, `field` and `hero` already used it. `:is()` would
have read better in the mixed case and was rejected for the opposite reason - zero uses in the system
so far, and a selector idiom is not worth introducing for one line.

### Two of the twelve turned out to be dead

- `.cd-empty .btn{ width: 100% }` - both actions already carry `btn--full`, and `.btn--full{ width:
  100% }`.
- `.notifyrow .btn{ white-space: nowrap }` - `button.css` already forbids a wrap on all four
  finishes.

**A second species of dead declaration**, and one the step 7.4 sweep could not see: that sweep caught
duplicates under the SAME selector, and these are a component repeating what the ATOM already said,
under a different selector. Two found by accident while doing something else, which is the usual sign
there are more. Worth its own pass.

### Proof

Both classes stripped off every element in the browser and the computed styles diffed - 73 pages x 2
viewports = 146 page-states, 262 `btn` and 138 `dark` removed, 37 properties plus x/y/width/height.

**0 elements moved.**

The counterfactual, because a green result proves nothing on its own: the same test run against the
pre-7.9 stylesheets, cache cleared between passes, moved **117 elements on 30 of the 146 page-states**
- the flex shares in seven footers, the double share in the filter sheet, and the empty drawer's
spacing. So the rules were doing real work, and now the container does it.

Крок 6 can now sweep both names out of the markup mechanically: 99 `btn` and 53 `dark` in
`design/*.html`, plus the ones emitted by the shared `wireframes/_nav.js`, where only ADDING a class
is safe - the grey layer still paints `.btn.dark` (`_wf.css:583`, 149 occurrences) and stays frozen.

## Step 7.10 - the button that was not in the button system

Found by the owner, from a screenshot: `<a class="more" href="#seo">Читати більше ↓</a>` in the lead
paragraph of a listing. Measured: `<a>`, **inline**, 14px, **700**, accent. An action written as
words INSIDE a sentence - which is the one thing `btn--text btn--inline` is declared for, and exactly
what step 7.6 wrote on the stand does not exist in the product.

**That claim was wrong, and the method is what was wrong, not the arithmetic.** 7.6 measured the
elements that already CARRIED `btn--inline` and concluded from them, instead of looking for the
elements that should carry it. A census of a class can only ever confirm the class; it cannot find
what was never labelled. Four of them, on the four listing pages, and this is the only true
`--inline` in the shop.

Done: `class="btn--text btn--inline more"` on all four.

### The paragraph moved with it

`.lintro` and `.lintro .more` were in `loyalty-rung.css`. `.lintro` stands on 11 pages - index,
three home, seven listing - and on **no loyalty screen at all**. The step-3 split put them there
because that is where they sat in `_wf.css`, and a file name that lies about its contents is worse
than a long file.

They now live in `seo-text.css`, and that is not «somewhere else», it is the right owner: **the SEO
text has two ends** - the lead paragraph under the H1 and the full block carrying `id="seo"` at the
foot of the same page - and `href="#seo"` is the link between them. One feature, one file.

`white-space: nowrap` was dropped on the way: `button.css` already forbids a wrap on all four
finishes. Third instance of «the component repeats what the atom already said», after `.cd-empty` and
`.notifyrow` in 7.9. That pass is now clearly worth running.

### Proof

73 pages x 2 viewports, x/y/width/height plus 18 computed properties.

**Exactly four elements moved: the four links themselves.** `display` `inline` -> `inline-flex` (the
box takes the full line height, 17 -> 22.4; the baseline does not move), `text-decoration` `none` ->
`underline`. The paragraph did not reflow - still 44.8 tall - and nothing else on any page moved, so
carrying the rules from one file to another lost no cascade race. Everything else in the diff is the
usual instrument noise: skeletons and the two spinners.

### Left open, and it is not about this button alone

The ink. 14px bold in accent is **3.13:1** on white, and `DESIGN-artifacts.md` gates accent on TEXT
at 19px bold. The gate was written for the price and applied only there. Step 7.12.

## Step 7.11 - the signs that were still characters, and how the check was wrong

The owner's screenshot of «Читати більше ↓» ended with a question that was really about the check:
steps 7.6 and 7.7 had both reported «no typographic signs left». Both had verified with a regular
expression built from the list I wrote myself - `→ ▾ ⌄ ›` - so the check could only ever confirm the
list. **A census of a set you defined cannot find what is outside it.**

Asked the opposite way - ANY character closing a control label that is not a letter, a digit or
ordinary punctuation - six more signs came back:

| sign | x | where |
|---|---|---|
| `＋` U+FF0B | 408 on 34 pages | `.dr-cat`, the drawer's category rows - whose LEADING mark was already an svg |
| `✕` U+2715 | 100 | every close button, and the header burger's open state |
| `−` `+` | 32 | the quantity counter |
| `★` U+2605 | 15 on 3 pages | the rating picker in the review form, while `uiv-star` existed |
| `↓` U+2193 | 4 | the owner's «Читати більше ↓» |
| `▦` `☰` | 2 | the view toggle's specimen |

Four glyphs added to `icons.js` - `close`, `plus`, `minus`, `arrowDown` - to the set's anatomy
(viewBox 24, ink inside 2..22, stroke 1.9). `minus` is `plus` without the upright on purpose: the
pair has to read as one control changing state.

### Three things the pass had to learn

**A sign can be the whole control.** `uivTrailMark` skips those by design and says so - a sign that
is the entire label is not punctuation, it is the control, and takes the square's size. 7.6 stopped
at that line and never came back. A second pass, `uivSignMark`, picks them up.

**A control can hold two signs and show one.** The header burger is `<span class="bi-open">☰</span>
<span class="bi-close">✕</span>` with css showing one box or the other. The first version of the pass
asked «does this control already contain an svg», saw the ☰ that `uivIcons` had drawn long ago, and
walked away leaving the ✕ - the state you only see once the drawer is open. 34 pages. The question
belongs to the BOX that holds the sign, not to the control.

**A toggle writes over the drawing.** `toggleDrCat` sets `a.textContent = open ? '－' : '＋'`, which
lives in the shared `wireframes/_nav.js`. Wrapped from the colour side instead of edited there, so
the grey layer keeps its characters. First attempt re-ran `uivTrailMark` and did nothing: writing
`textContent` removes the drawing but leaves the box's CLASSES, so the pass's own «already done»
guard turned it away. Measured, then fixed by swapping the sign directly.

### The stand was drawing with the font

Found while checking: `design/kit/*.html` load `kit/_nav.js`, never the shop's runtime, so **no pass
had ever run on the showcase**. It was still drawing ✕ on `button.html`, ♡ on `kit.html`, −/+ on
`stepper.html` and ▦/☰ on `view-toggle.html` - with the font, while the shop next door drew all four
from the set. A design system whose specimen differs from the product is the defect this stage
exists to remove.

So the two passes moved to **`design/system/marks.js`** - the same move `icons.js` made one step
earlier, for the same reason: one edition, run by both layers. 72 pages gained the script tag next to
`icons.js`; `kit.html` gained `icons.js` too, having never loaded it.

### Punctuation is not a sign

Left alone on purpose, and the map is the whole rule: «Creapure®» keeps its trademark (72), «+ Новий
клієнт…» keeps its ellipsis (2), «Омега-3 + D3» and «Знижки до −25%» keep their arithmetic. The stand
chrome's own `→` and `↗` stay too - `.uiv-side` and `.uiv-topbar` are the tool, not the store, the
same line `uivCurrency` draws.

### Proof

73 pages x 2 viewports = 146 page-states: **0 signs left on any control**, 0 sideways scroll, 0 JS
errors. The drawer toggle walked by hand at 390: plus -> minus -> plus, a drawing every time, and the
burger's ✕ drawn in its open state.

---

## Step 7.16 - the two icon pages stop being one name, and a rule that never worked

**Asked:** why does `design/kit/icon.html` exist when `design/kit/icons.html` already describes the
icons? **Answered by measuring both:** they are different subjects and the split is right - `icons.html`
is the SET (which glyphs exist, optical balance, weight, brand marks), `icon.html` is the WRAPPER
(`icon.css` - the box a glyph stands in). Same split the kit already makes between «Основи -> Колір»
and the components that wear colour. Deleting the atom page would move the trailing-mark rule and the
brand-ink arithmetic onto a page whose subject is glyphs.

Three things were broken, and none of them was the split.

**The sidebar could not tell them apart.** Three rows: `Перепис -> Іконки`, `Основи -> Іконки`,
`Атоми -> Іконка`. Renamed the middle one to «Набір іконок». The census row keeps «Іконки» - its own
group heading already says Перепис, and a second one inside it is noise.

**Four rules were stated twice.** Size in a line, size on its own, weight, colour - both pages said all
four in their own words. Split by owner: the SET answers for how a glyph is DRAWN (weight, the 2.4/2.6
compensation under 14px, optical balance), the WRAPPER for how it STANDS (`1.05em`, `currentColor`, the
trailing mark, the brand box). Each page now points at the other instead of restating.

**The atom page understated itself tenfold.** It said «34 рядки, 4 екрани» about `icon.css`. Measured
on live pages: the file is 80 lines and `.uiv-ic` is on **39 screens of 39** - every one - at **5 291**
instances, the most-used class in the system. Plus `.uiv-ic.uiv-trail` 1 562 and `.uiv-brand` 62 on 31
screens. The «4 screens» was counted in `wireframes/` and against two anchors out of four. Two of the
four rules the file declares had no specimen at all - the trailing mark and the brand ink - and both
are on the page now, live.

### `.uiv-sort` deleted, and one half of it was worse than dead

Step 7.2 replaced the hand-built sort control with the menu atom. The class survived in two files.
`icon.css` had two ordinary dead rules. `toolbar.css` had something else: 7.2 removed the block and
left the SELECTOR standing on its own line. A comment is not a rule, so the parser read through it and
joined the orphan to the next selector:

    .uiv-sort.open .uiv-sort{ position:relative; cursor:pointer; user-select:none; }

a descendant that could never match, which is exactly why nothing broke and nobody noticed. Both files
are clean; the class is in zero html and zero scripts.

### The brand-ink rule had been inert since it was written

Found while building the specimen: all four brand marks drew at the same size. Measured on `auth.html`
- `--brand-ink: 20px` and google, apple, telegram, viber all drawn at exactly **20**. The equal box the
whole rule exists to avoid. Google asked for `calc(20px * 1.2)` = 24 and was handed 20.

One missing word. `.uiv-brand` is an `inline-flex` box pinned to `--brand-ink`, so the svg inside it is
a FLEX ITEM, and a flex item shrinks by default - 24 does not fit a 20px line. `overflow: visible` gave
the drawing permission to be PAINTED outside the box; it never gave it permission to BE bigger. That is
`flex: none`.

| | before | after |
|---|---|---|
| auth.html google / apple | 20 / 20 | **24 / 27.8** |
| auth.html button height | 52 | **52** |
| checkout.html google / apple | 18 / 18 | **21.6 / 25** |
| checkout.html button height | 40 | **40** |

The button height is the one thing step 7.3 was defending, and it did not move. Counterfactual: put
`flex-shrink` back and all four collapse to the box again.

**And the fix exposed a second defect.** The footer's messenger marks wear both classes,
`uiv-ic uiv-brand`, and `footer.css` set `svg{ width:16px }` - reaching past the component to the
drawing while the box stayed at 1.05em = 14.7. The same `flex-shrink` had been hiding the
disagreement. The contract is the one `button.css` states: **the caller says how much INK, `icon.css`
does the sum.** The footer says `--brand-ink: 16px` now; box and drawing are both 16 and the row did
not move.

### The idle check was measuring the wrong moment

On `icon.html` only, and it made the page lie about itself: `.uiv-trail` is put on the mark by
`system/marks.js`, which waits for `DOMContentLoaded`, while the check ran at parse time - so a class
the page renders was reported as one it only names. The check now runs after the passes. The other 31
kit pages still check at parse time, where it changes nothing because their demos carry their classes
in the markup.

---

## Step 7.17 - the stacked header action gets its own rhythm

**Asked:** «Увійти» and «Обране» in the header - are they in the system, and can the icons be bigger
with some air above and below?

**In the system:** yes, and half-documented. The finish is `btn--ghost btn--s` from `button.css`, the
stacked layout is `.wfh-act.stack` in `header.css`, and the button census counts 55 of them. What it
has no specimen for is the Хедер page, which is an organism and not built yet.

**What the eye caught, in numbers.** Measured before the change:

    glyph 18 · gap 8 · label 12      air above 1.2, air below 1.2

The declared padding is 8 and none of it survived: content came to 41.6 in a box pinned to 44 by the
row rule from step 7.8, so the box kept 2.4px and split it. **The gap inside the control was six times
the air around it** - proximity said the mark and its caption belong together less than either belongs
to the button's edge. Grouping read backwards, which is what an eye notices without being able to name.

The 44 is not negotiable - 7.8 unified the whole header row on it and proved it - so the air comes out
of the gap, where the surplus was. `20 + 2 + 12 = 34` leaves **5 above and 5 below**.

`.wfh-act.stack` is a different control from `.numbtn` and already said so by declaring its own type
size (12 against the row's 14); it now declares its own mark size too. 20 is the set's M rung, not a
new number. The row buttons keep 18, because there the mark stands beside a 14px label rather than
above a caption.

**One more, found in the same pass:** «Кабінет ▾» came out with 1px of air where «Увійти» beside it had
5. Its caret is a trailing mark at 1.15em - right in a line of text, wrong in a budgeted caption, where
13.8px in a 12px line grew the box and ate the air. In a stacked caption the caret is the caption's own
size. Measured after: 4.6 / 5 / 5 across the three, all boxes 44.

Walked at 1280 and 1024 on four coloured screens plus the grey layer: every `.wfh-act` still 44, 0
sideways scroll, 0 JS errors, and the grey prototype untouched.

---

## Step 7.18 - the stacked action turns out to be an atom, and it was written twice

**The correction that started it.** I had said the specimen for «Увійти» / «Обране» belongs to the
Хедер page, which is an organism and not built. Wrong, and wrong in a way worth keeping: the kit is
built from small to large, so a control that is an ATOM cannot be waiting on an organism. Asking what
this control actually is turned up the real defect.

**It was declared twice, in two organisms, under two vocabularies:**

| | control | mark | caption | counter | file |
|---|---|---|---|---|---|
| header | `.wfh-act.stack` | `.g` | `.lbl` | `.hb` | header.css |
| tab bar | `.wf-tab` | `.ti` | `.tl` | `.tbadge` | tabbar.css |

Neither name says what the thing IS - a mark above a caption - and that is exactly why nobody could
see it was one control.

**The convincing number is the one that agreed.** Both had `gap: 2px`. Step 7.17 derived that 2 from
the header's 44px budget without ever looking at the tab bar, where it had been sitting for months.
Two independent passes over one control landing on the same number is not a coincidence. The caption
matched too: 12px, semibold, at rest.

**And what had already drifted**, because two editions always do:

| axis | header | tab bar | merged |
|---|---|---|---|
| glyph | 20 | **21** | **20**, owner - a rung of the set; 21 was `1.05em` on a 20px emoji |
| caption ink | `--text-secondary` | **`--text-muted`** | **`--text-secondary`**, owner |
| caption leading | flat | **19.2px inherited** | flat - a caption under a mark is one line by definition |

`components/stack-action.css` holds the shape, the mark, the caption and the counter. Each organism
keeps what it alone knows: the header its 44 row, the tab bar its fixed bar, equal fifths, safe area
and `[aria-current]`. **Both vocabularies, one rule set** - the part names are not renamed because
`.g` / `.lbl` / `.ti` / `.tl` also live in the frozen grey layer, so the atom answers to both and the
rename is a Крок 6 item. Same shape as `.ci-qty, .co-qty` at 7.13.

### Three things the browser caught that the file could not

**The caption collapsed to 3px.** The atom took the tab bar's `overflow: hidden` (its ellipsis, for a
word in a fifth of a phone screen) and carried it into the header, where the control is a fixed 44
with 8px padding - a 28px padding box against a pair that needs 34. `overflow: hidden` also switches
a flex item's automatic minimum size to zero, so flex shrank the only item that would let it and the
word was clipped to a sliver. `flex: none` on both parts; the pair overflows the padding box
symmetrically instead, which is what it did before the atom existed.

**The header's row label was reaching the stacked caption.** `.wfh-act .lbl` is 14/bold and unscoped,
and header.css loads after stack-action.css - so at an equal-specificity tie the organism would have
overridden the atom it is supposed to be reading. Scoped to `.numbtn`.

**The active tab lost its emphasis.** The caption used to take its colour by inheritance, so
`[aria-current]` recolouring the control recoloured the word for free. The atom pins the caption, which
is right for the eight resting instances and wrong for the one that is current: measured after the
merge, all five captions came out identical and the current tab had only its accent bar left. The tab
bar says it now, at a specificity that beats the atom, on purpose.

One consequence stated rather than slipped in: the tab's resting ink went `--text-muted` ->
`--text-secondary`, because the atom holds the caption at secondary and a mark that leads cannot be
the faintest thing in its own control.

### Proof

| | header (>=1024) | tab bar (<=859) | whose |
|---|---|---|---|
| direction · gap · glyph | column · 2 · 20 | column · 2 · 20 | atom |
| caption | 12 / 600 / #5B5B54 | 12 / 600 / #5B5B54 | atom |
| box height | 44 | 50 | organism |
| air above / below | 5 / 5 | 8 / 8 | organism |
| active | none | accent bar + ink 800 caption | organism |

0 sideways scroll at 1280, 1024, 390 and 360; 0 JS errors; the grey layer untouched, since it loads
neither `button.css` nor this atom. `design/kit/stack-action.html` is registered in АТОМИ and its own
idle check reports «Пройдено» - all 9 classes of the file rendered.

## Step 7.19: the stand was lighting the wrong row, and the reason was a copied value

Reported from the browser: `design/kit/stack-action.html` open, «Дія стовпчиком» in the heading, and
the sidebar highlighting **«Обране»**.

### What it actually was

Not a nav bug. `stack-action.html` was built from `favourite.html` at step 7.18, and it inherited the
line the source page carried:

```html
<script>var KIT_ACTIVE = 'favourite';</script>
```

Every page of the stand had one - 33 of them - and every one of them was the page's own file name
written a second time by hand. The registry's own head has said since it was written that "active
state, counts and relative links are computed". Two of the three were. The third was declared, and a
declared value that duplicates a fact the runtime can already see is a value waiting to be copied
wrong. It took 33 pages and one clone for that to happen.

This is the same defect as `.ctrl .cap` at 7.13 and the two icon rules at 7.16, in a different
material: **one fact, two editions, and nothing keeping them equal.**

### The rule

The file name decides, and it cannot be wrong - it IS the page. `KIT_ACTIVE` survives for one case
only, and it is the case the root `/_nav.js` already names for `NAV_ACTIVE`: a satellite page the
registry does not list, saying which row it belongs under. It is consulted **only when the file name
matches no row**, so a stale copy can no longer beat the truth - the truth is checked first.

Then the 33 dead declarations were swept, because a dead value left in place is a value the next
clone will copy.

### Proof

The counterfactual first, since a green result on its own proves nothing. The exact stale line was
put back into `stack-action.html` and the page reloaded:

| | declared | lit |
|---|---|---|
| before 7.19 | `favourite` | **Обране** - the reported defect |
| after 7.19, same stale line | `favourite` | **Дія стовпчиком** |

The fix heals the defect rather than retyping the string past it. The line was then removed with the
other 32.

The satellite branch was checked too, on a throwaway page outside the registry declaring
`KIT_ACTIVE = 'favourite'`: it lights «Обране», as it should, and the page was deleted.

All 33 registered pages walked in the browser: **0 lighting the wrong row, 0 with more or fewer than
one row lit, 0 still declaring `KIT_ACTIVE`, 0 sideways scroll at 1280, 0 JS errors.** The four demos
of `stack-action.html` re-measured unchanged - 44 / 44 / 44 / 50, column, gap 2, glyph 20, caption
12 / 600 / #5B5B54.

## Step 7.20: under the cursor, half the control moved

Reported from the stand: "I would add a hover effect" - looking at the anatomy of «Дія стовпчиком».

### Two findings, and the first one was the stand's own fault

The four specimens in the anatomy carried `pointer-events: none`, so hovering them did nothing at
all. A stand that shows a control's shape and hides its behaviour is showing half a component. The
inline style is gone and all four are live.

Which made the second finding visible. Measured in the header at 1280:

| | ground | mark | caption |
|---|---|---|---|
| at rest | transparent | #1C1C1C | #5B5B54 |
| hover, before | #FAF9F7 | **#FF5A00** | #5B5B54 - **did not move** |
| hover, after | #FAF9F7 | **#FF5A00** | **#FF5A00** |

**Not damage from the merge, and it matters that this is said accurately.** `git show HEAD` on the
pre-7.18 `header.css` has `.wfh-act.stack .lbl{ … color: var(--text-secondary); }` - the caption was
pinned before the atom existed. The tab bar's caption did inherit, but the tab bar has no hover at
all to inherit from (the button census lists `.wf-tab` under «немає»). So nowhere in the product did
the word ever move with its mark.

### The rule

The pin is right at rest and wrong under the cursor. A caption under a mark is part of the control's
NAME - that is the whole reason it is held at `--text-secondary` and not at muted - and a name cannot
stay behind while the thing it names lights up.

```css
.btn--stack:hover .lbl, .btn--stack:hover .tl{ color: inherit; }
```

`inherit`, not a named colour: the caption takes whatever ink the finish decided on, and the atom
never has to know which finish it was given. The caption also gets its own `transition: color .15s`,
because a pinned colour does not ride the control's transition and the word would otherwise snap
while the mark above it fades.

**Where nothing happens is also correct.** A tab bar has no finish and declares no hover ink, so
`inherit` returns the resting colour and the tab does not move - measured on all five. That is the
phone's bar: a hover state there is a state no phone will ever paint. If the owner wants one, it is
one line in `tabbar.css`, and it is the tab bar's line to write, not the atom's.

### Proof

| | rest | hover |
|---|---|---|
| header «Обране» (index) | ground transparent · mark #1C1C1C · caption #5B5B54 · 72x44 | #FAF9F7 · #FF5A00 · **#FF5A00** · 72x44 |
| header «Кабінет ▾» (account) | ... · caret #5B5B54 · 88x44 | #FAF9F7 · #FF5A00 · **caret #FF5A00** · 88x44 |
| tab, resting (390) | #5B5B54 / 600 · 74x50 | **identical** |
| tab, `[aria-current]` (390) | #1C1C1C / 800 · 74x50 | **identical** |

The caret follows without a word from anyone - it is `currentColor` inside the caption. No box moved
by a pixel in any state, so nothing reflows on hover. The counter badge is untouched. The two boxed
`.numbtn` counters are untouched, which matters because step 6.3 decided on purpose that their label
does NOT turn accent: that decision is about a different finish and still stands, at 124px wide with
`#1C1C1C` / `#5B5B54` unchanged.

### And one language defect swept on the way

The stands' idle check printed «усі **1** станів названі» - broken Ukrainian on the eight pages that
declare exactly one state. The template now reads «названо станів: N», which is right for any number,
and the failure branch with it. Fixed on all 22 pages that carry the script - and the script being
pasted into 22 pages is itself a Крок 6 item, noted here rather than fixed in passing.

All 33 stands re-walked: 0 wrong nav rows, 0 sideways scroll at 1280, 0 JS errors, and every idle
check reading grammatically. The grey layer loads `_wf.css` only and never sees this file.

## Step 7.21: two letters, two meanings, and nothing that knew the difference

Reported from the phone: `design/index.html` at 360x852, tab bar → «Каталог» → the catalogue
overlay, where every mark sat ON the first letter of its label and every row wore a short grey dash
underneath.

### What it was

`.ci` is used by the product for **two different things**:

| markup | what it is | where |
|---|---|---|
| `<article class="ci">` | a row of the cart, 14 in the product | `design/*.html` |
| `<span class="ci">` | the mark of a row in the mobile catalogue overlay | built by `wireframes/_nav.js` |

`cart-row.css` claimed the bare class, so the cart row's rule - a grid with a 74px column, 16px of
vertical padding and a bottom hairline - also landed on a 24px icon box. Measured on the overlay at
360 before the fix:

| | before | after |
|---|---|---|
| `.ci` box | 24 wide, **52 tall** | 24 x 29 |
| its child | stretched to the **74px** column, drawing centred at x=44 | drawing at its own left |
| label starts at | 52 | 52 |
| mark → label | **−10px, i.e. overlapping** | **+15px** |
| stray dash under each row | 13 of them (the rule's `border-bottom`) | **0** |
| row height | 85 | 62 |
| rows visible on one screen | 9 | 13 |

The overlay's other two levels had it too - the goal list and «Усі товари: …» both use `.ci`.

### The rule

```css
article.ci{ … }
```

Scoped by ELEMENT rather than by a new class, because the markup already says which is which and it
says it in both layers at once: a cart row is an `<article>` in all 14 places, a mark is a `<span>`.
Adding a class would mean editing `wireframes/`, frozen since stage 05. Same defect as `.uiv-sort`
at 7.16 and `.ctrl .cap` at 7.13, in its most literal form: one name, two meanings.

**Older than this file, and said out loud rather than quietly inherited.** `wireframes/_wf.css:1626`
carries the same bare `.ci`, and the grey prototype shows the same overlap and the same dash -
verified in the browser at 360. It arrived here at the step-3 split, which copied selectors unchanged
on purpose. The grey twin was reported here and closed on the owner's word the same day - see below.

### Proof

The counterfactual first: the scope was rolled back to `.ci`, the cache cleared and the same three
measurements taken again - overlap returned at −10, `.ci` 52 tall, the dash back on all 13 rows.
Restored, and the cart re-measured on both sides:

| | 360 | 1280 |
|---|---|---|
| first three rows, height | 208 / 186 / 179 | 190 / 186 / 179 |
| columns | `74px 212px` | `74px 302px` |
| padding · hairline · thumbnail | 16px 0 · 1px · 74 | 16px 0 · 1px · 74 |

Identical before and after, to the pixel, on every row. The cart drawer's rows still read
`74px 302px` with a 74px thumbnail. All three levels of the overlay walked at 360: marks clear of
their labels, no stray dashes, `display` back to block, padding 0.

### 7.21b: the grey twin, closed on the owner's word

The colour layer had been fixed and the grey one left with the defect, because structure belongs to
`wireframes/` and that folder is frozen. The owner said close it, so `_wf.css:1626` got the same
scope - `article.ci` - and the same reason in the grey file's own idiom, five lines rather than
twenty-three, because that is how that file talks.

Measured on `wireframes/index.html` at 360, the catalogue overlay:

| | before | after |
|---|---|---|
| `.ci` box | 24 x **61** | 24 x 28 |
| `display` · padding · hairline | grid · 16px 0 · 1px | block · 0 · 0 |
| mark sits at | 44 → 62 | 19 → 37 |
| label starts at | 53 | 53 |
| mark → label | **−9, overlapping** | **+16** |
| stray dashes | **13** | **0** |
| row height | 90 | 57 |

The goal level and the «Усі товари: …» row were carrying it too, and both came right with the same
line: gap +15, no border, row 84.

Nothing else moved. The three grey pages that hold cart rows walked at 360 and 1280 -
`cart.html` 195 / 177 / 171 and `cart-oos.html` and `cart-coach.html` - every row still a grid,
columns `74px 206px` at 360 and `74px 296px` at 1280, gap 13, padding 16px 0, hairline 1px,
thumbnail 74 (66 on the coach page, which is its own layout). `.ci.oos` still dims to .5. The cart
drawer's rows still read `74px 296px`. 0 sideways scroll, 0 JS errors.

**Both layers now say the same thing about the same class**, which is the point: the design system
could not be right about `.ci` while the prototype it was split from was wrong about it. A count that
holds either way - 16 `<article class="ci">` across both layers, 4 `<span class="ci">` in `_nav.js`,
and no third case.

## Step 7.22: the stand against the product, axis by axis

Asked directly: does «Дія стовпчиком» on the stand show what the product actually draws? Measured
rather than eyeballed - stand at 1280, header at 1280, tab bar at 390:

| | stand | header | tab bar |
|---|---|---|---|
| box | 72x44 · 92x44 | 72x44 · 88x44 | 74x50 |
| padding | 8px 12px | 8px 12px | 8px 2px |
| gap · glyph · stroke | 2 · 20 · 1.9 | 2 · 20 · 1.9 | 2 · 20 · 1.9 |
| caption | 12 / 600 / #5B5B54 | 12 / 600 / #5B5B54 | 12 / 600 / #5B5B54 |
| air above / below | 5 / 5 | 5 / 5 | 8 / 8 |
| counter | 15x15 · 10/800 · offset −11,−6 · #FF5A00 on #1C1C1C · white 2px ring | identical | - |

The drawings were compared as PATH DATA, not by eye: the heart, the person and the cart carry the
same `d`, the same viewBox, the same fill and the same stroke width in all three places. The stand
is not a picture of the component, it is the component.

### What the stand did NOT show

The one thing the product's tab bar wears on every screen and the stand only described in prose:
**the active tab.** Four specimens, none of them current, while the phone always has exactly one.

So a fifth was added - `class="btn--stack wf-tab" aria-current="page"`. It works on a 1280 stand page
because the `[aria-current]` rules live in tabbar.css OUTSIDE the `max-width: 859px` query; only the
bar's layout is inside it. Measured, stand against product:

| | stand, 5th specimen | product, «Головна» at 390 |
|---|---|---|
| box · glyph | 74x50 · 20 | 74x50 · 20 |
| caption | 12 / **800** / #1C1C1C | 12 / **800** / #1C1C1C |
| accent bar | 26 x 3, #FF5A00 | 26 x 3, #FF5A00 |

The prose beside it names the owner of each half: the atom gives `position: relative`, which is what
the bar counts its top from; the bar and the ink are the tab bar's, in tabbar.css. A header action
has no such state, because it is never «current».

Idle check still «Пройдено», 0 sideways scroll at 1280, 0 JS errors.

## Step 7.23: the chip - eight names, six files, one pill

Asked to fix `design/kit/chip.html` against the real UI. The stand was wrong about the component,
but only because the component was wrong about itself.

### The census

Counted in the browser across 17 colour screens at 1280 and 390, every instance read through
`getComputedStyle`:

| class | count | file before | where |
|---|---|---|---|
| `.dr-chip` | **96** | chip.css | drawer goals |
| `.flink` | 60 | link-row.css | filter options, «Концентрат 31» |
| `.mgchip` | 42 | header.css | mega-menu categories |
| `.hero-chips a` | 32 | chip.css | the phone's category rail |
| `.ptab` | 32 | pdp-tabs.css | product and collection tabs |
| `.acc-link` | 28 | account-shell.css | account tabs, a pill only from 860 |
| `.ord-tab` | 6 | order-row.css | order filters |
| `.cegoals button` | 6 | chip.css | goal picker in the coach dialog |

Same control, same job - press a word to choose - and six files each grown their own edition.

### What had drifted

| axis | before | after |
|---|---|---|
| edge | 1.5 everywhere except `.ord-tab`, at 1 | **1.5**; the order filter is 41 tall instead of 40 |
| resting ink | `--text-body` except `.ord-tab`, at `--text-secondary` | **`--text-body`** - a choice not yet made is not muted |
| hover | accent edge + accent word · ink edge + body word · accent edge + BODY word · **none at all on `.dr-chip`** | **one edition**, and the 96-instance family got a hover for the first time |
| weight / padding | 600/12 and 700/16 mixed | **two rungs, and they are real** |

The two rungs survived the merge because they answer different questions. A FILTER is one of many,
pressed in any combination: 600, padding 12 - at 700 a column of ten options reads as a wall. A
SEGMENT is a set where exactly one is on: 700, padding 16, because the eye has to find the current
one without reading. The mega menu keeps a small rung, 12/600 and 29 tall, because a mega column is
dense and its chips sit under a heading rather than on their own.

### Selected: four editions, chosen on contrast

| edition | count | contrast on #FF5A00 | verdict |
|---|---|---|---|
| accent fill + **ink** label (`.acc-link`) | 28 | **5.45:1** | **chosen** - largest family, only accent edition that passes AA |
| accent fill + white label (`.ptab.on`) | 8 | 3.13:1 | below AA at 14px |
| white ground + accent edge and label (`.ord-tab.on`) | 2 | 3.13:1 | below AA at 14px |
| ink fill + white label (`.cegoals button.on`) | 6 | 15.9:1 | passes, but then the action colour no longer marks the choice |

Owner's call. Three editions brought to the first, and all three are **visible changes**: the product
tabs lost their white label, the order filter lost its outline look, the coach dialog's goal lost its
black fill.

### What did not move

`.acc-link` stayed in `account-shell.css` on purpose: it is a full-width row with a hairline that
only BECOMES a pill from 860, so its shape is the shell's sentence. Its selected state was already
the one now shared, so nothing about it changed. `.afilter` also stayed apart - it is not a choice
but a RECEIPT, saying a filter is already on and offering to take it off, which is why it is quieter
and why it is the only member carrying a ✕.

### Proof

Measured after, on the product: `.flink` 41 · 14/600 · 1.5 #D9D9D9 (unchanged); `.ord-tab` 41 ·
14/700 · ink #1C1C1C; `.ord-tab.on` and `.ptab.on` both accent fill · accent edge · #1C1C1C label;
`.mgchip` 29 · 12/600 · 4px 12px (unchanged); `.dr-chip` and `.hero-chips a` 41 · 14/600 (unchanged),
and `.dr-chip` now answers the cursor - edge and word to #FF5A00. 0 JS errors.

One bug caught in the browser while writing the file: with the size left to the rungs rather than the
shape, `.ord-tab` inherited the page's 16px and came out 45 tall instead of 41. Rung M is the default
now, declared on the shape, so no member can be sizeless.

### The stand

Rebuilt on real product markup: the census table, the drift table, the contrast table, the family in
one row, and demos for all 15 classes the file declares. Idle check «Пройдено», 0 sideways scroll at
1280 and 360, 0 em dash, 0 JS errors.

Two things the page now says out loud that it did not before: `.ptab` (16 in markup) and `.ord-tab`
(3) are `<span>` without `role` or `tabindex` - they look like controls, change the screen, and
cannot be reached from a keyboard; and the chip has no focus ring at all, though the system has had
`--ring-focus-control` since step 6.2. Both are markup work and both wait for Крок 6.

## Step 7.24: three marks in the account rail had been drawn at 0x0

Reported from the screen: in the account rail «Огляд», «Знижки та бонуси» and «Обране» had no mark
at all, while «Замовлення», «Адреси», «Профіль», «Стати тренером» and «Вийти» did.

### Why five worked and three did not

`marks.js` has TWO output shapes, and only one of them makes a wrapper:

    a sign inside a box   ->  <span class="ic"><span class="uiv-ic"><svg></span></span>
    a sign IS the box     ->  <span class="ic uiv-ic"><svg></span>     the host takes the class

`account-shell.css` sized the drawing as `.acc-link .ic .uiv-ic svg{ width:18px }` - a selector that
reaches THROUGH a wrapper - so it matched the first shape and missed the second. The second shape
then fell back to `.uiv-ic svg{ width:1.05em }` in icon.css, and `.ic` zeroes its own font-size to
kill the emoji fallback, so 1.05 x 0 = **0**.

The three that vanished are the three whose sign is swapped in place: `▦` grid, `★` star, `♡` heart.
The five that survived arrive wrapped.

Measured with a detector rather than by eye - every `<svg>` on 23 colour screens at 1280 and 390
whose computed width is under 2px and which is not inside something hidden. It returned **42 hits and
one owner**: `.acc-link > .ic.uiv-ic`, across all seven account pages. Nowhere else in the product.

**Older than this session.** `git show HEAD` has both halves: `▦ ★ ♡` were already in
`UIV_SIGN_ONLY`, and the wrapper-dependent rule is unchanged since it was written. `font-size: 0`
arrived at step 7.3-7.6 (`25ca246`), which is when the marks went dark - they have been invisible
since, and were noticed now.

### The rule

    .acc-link .ic svg{ width:18px; height:18px; }

Name the svg, which is the one thing both shapes have. A component that fixes an icon's size must
size the DRAWING, not a wrapper somebody else may or may not create - the same lesson `footer.css`
learned at 7.16 from the other side, where it reached past `.uiv-brand` to set an svg the wrapper was
supposed to derive.

### Proof

All seven account pages at 1280 and 390: **0 marks under 2px, 0 zero-width svg anywhere on the page,
0 sideways scroll.** All eight rows read 18x18 - three unwrapped, five wrapped, and no longer possible
to tell which is which by looking. The current row keeps its accent mark and its inset bar.

## Step 7.25: two defects, one cause - the canvas is narrower than the viewport

Both open items turned out to be the same sentence said twice: **the product switches layouts on
`@media`, which reads the VIEWPORT, while the product lives in a canvas that may be narrower.**

### The measurement

`design/_stand.css` showed the screen panel from 900 and pushed the canvas with
`margin-left: 216px`. So from 900 the header drew its `>=860` desktop row inside a canvas of
viewport-216:

| viewport | canvas | action row past the page | page scrolls sideways |
|---|---|---|---|
| 880 | 865 | fits | no |
| **900** | **669** | **+61** | **yes** |
| 920 | 689 | +41 | yes |
| 940 | 709 | +21 | yes |
| 960 | 729 | +1 | yes |

The mega menu had the same cause and a longer reach: 940 wide, hung off the «Каталог» button, its
own `max-width: 94vw` measured against the viewport rather than the canvas, and a grid whose columns
could not shrink below 226 + 420 + 196 = 842. At a 900 window its right edge stood at 1155 against a
page 885 wide - **255px unreachable, the third column entirely**, and `scrollTo` would not move the
page to reveal it. It fitted only from about 1264.

### Two rules

**1076, and the number is 216 + 860.** 860 is the width at which the product itself says its desktop
layout fits, so the panel may not appear until the canvas still has that much. Below it the shell
already had an answer - the 40px top bar - so nothing new was invented, one threshold moved.

`@media(max-width:899px){ .wfh{ top:40px } }` moved OUT of `header.css` into `_stand.css` on the way.
That 40 is the stand's top bar, not anything the product has, and it was pinned to the shell's old
number - when the shell moved, the product's sticky header would have stayed behind.

**The panel belongs to the row, not to one button.** `.wfh-cat` is `position: static` now and
`.wfh-main` is the containing block, so the mega reads `left: 16 / right: 16 / max-width: 940` and
measures itself against the header row - which IS the canvas minus its padding, in any shell and in
none. `minmax(420px, 1fr)` became `minmax(0, 1fr)`, because a floor no max-width can get under is
what turns "narrow the panel" into "overflow the page".

The hover bridge moved from `.wfh-cat::after` to `.wfh-cat .navbtn::after` - the button is exactly
the width `.wfh-cat` used to be, so the geometry is unchanged - and grew 12 -> 24, because the panel
now hangs off the row and the mouse has the row's 16 of bottom padding to cross before the panel's 8
of gap. Walked with the mouse in 4px steps from the button to the panel: **0 steps where the menu
closed**, and it still closes when the pointer leaves sideways.

### Proof

11 screens x 7 widths (360, 860, 900, 1024, 1076, 1280, 1440), menu closed and open: **77 checks,
0 failures, 0 JS errors.** Sideways scroll 0 everywhere. The mega now narrows instead of overflowing -
813 wide at a 845 canvas, up to its 940 ceiling - and the shell swaps at exactly 1076, with the
sticky header's top following it, 40 below and 0 above.

**The grey layer still has the mega half of this**, untouched, because it loads `_wf.css` and none of
these files: at 900 its panel runs 26px past and the page scrolls with it. Reported, not fixed -
structure is the frozen layer's own, and one line closes it whenever its owner says so.

---

## Step 7.26 - the frame stops drawing the product, and the product stops knowing the frame's numbers

The owner asked one question about 7.25: why is there CSS in `design/_stand.css` at all - everything
for the UI belongs in `design/system/components/`, and from there onto a stand page and into the
sidebar. Reading the file to answer it turned up two separate faults, one of them live.

### What `_stand.css` is, and what it was doing

Its own first line, written at 25ca246: «prototype and stand chrome, NOT part of the system». It
draws the frame around the screenshot - the 216px screen panel, the black top bar, the canvas. A
product screen still carries exactly one stylesheet of its own, `design/system/index.css`, and this
is a second `<link>` that only the preview loads.

But 44 of its 147 lines were not chrome:

| lines | what | where it went |
|---|---|---|
| 9-17 | `.wf-drawer` - the phone's burger menu | `components/nav-drawer.css` |
| 18-45 | `.wf-catov*` - the catalogue overlay | `components/cat-overlay.css` |
| 141-147 | the colour and size of their marks, and the chip's | the three files that own those controls |

The first screen a customer taps on a phone was filed under «chrome», invisible to anybody reading
`design/system/components/` to find out what the product is made of. And it was split further still:
the goal chip's shape was declared in `chip.css` and the colour of its mark 150 lines away here;
`.dr-cat`'s rows were in `cart-drawer.css` and its shell here, two files sharing a `dr-` prefix and
nothing else - different trigger, different side of the screen, different content.

`nav-drawer.css` and `cat-overlay.css` exist now, `html.dr-lock` and the whole `.dr-*` block left
`cart-drawer.css` for the first of them (`dr-lock` is added only by `openBurger()`), and the chip's
mark went home to `chip.css`. Class names are unchanged: `wireframes/_nav.js` builds this markup and
the frozen grey layer runs the same script, so adding a file is safe and renaming is not - the same
line 7.23 drew for `.dr-chip`.

### The live fault: four files holding a fifth file's number

`--shell-top` / `--shell-left`, declared once in `_stand.css`, 0 when there is no stand.

Before this step the stand's geometry was copied into four product components as literals - 216, 40,
899, 900 - each with its own media query:

```
header.css        @media(max-width:899px){ .wfh{ top:40px } }              (moved out at 7.25)
auth-dialog.css   @media(min-width:900px){ .auth-ov{ left:216px } }
                  @media(max-width:899px){ .auth-ov{ top:40px } }
cart-drawer.css   @media(max-width:899px){ .cart-ov,.cart-drawer{ top:40px } }
checkout-form.css @media(min-width:900px){ body:has(.co-head){ padding-left:216px } }
                  @media(max-width:899px){ body:has(.co-head){ padding-top:40px } }
```

**Step 7.25 moved the shell to 1076 and every one of those copies stayed at 899.** Measured at a 1000
viewport before the fix:

| screen | expected | measured |
|---|---|---|
| `auth.html` `.auth-ov` | left 0, top 40 | **left 216, top 0** - pushed right of a panel that is not there, and started under the bar |
| `cart.html` `.cart-drawer` | top 40 | **top 0**, bar bottom 40 - the drawer opened under the top bar |
| `checkout.html` `body` | padding 0 / 40 | **216 / 0** - 216 of empty space on the left, header under the bar |

That is what «all css in the components» is for, and it is also what it is not for: the rule stays in
the component, the number does not. `header.css` says `top: var(--shell-top, 0px)` and owns the
sentence; `_stand.css` says what `--shell-top` is and owns the number; off the stand it is 0 and
every one of those rules is a no-op. `checkout-form.css` lost both blocks outright - they were never
about the checkout, only about the one flow that has no `.wf-canvas` for the frame to push.

`--wfbar-h` folded into `--shell-top` in `cart-drawer.css`. Both named the same thing, but `--wfbar-h`
is published by the GREY prototype's bar, which the colour layer hides outright, so in `design/` it
was permanently 0 and the real compensation was the hard `top:40px` above. The grey layer keeps its
own name, untouched.

### One visible change, said out loud

`--mark-faint`, `#cbcbcb` -> `#BBBBBB`, on the chevron of the catalogue overlay's rows.

Three rows in that overlay carry the same sign. Two were a raw `#cbcbcb` in a system file and the
third asked for `var(--grey-bb)` = `#BBBBBB` - the file contradicting itself, not a judgement call.
The semantic token already exists and is named for exactly this job: `--mark-faint`, «the quiet mark:
a chevron on a row», 21 uses. All three read it now and two go one step darker.

`.wf-drawer`'s shadow is NOT changed and is logged as drift instead: `0 16px 34px / .13` against
`--elevation-3`'s `0 14px 34px / .12`, two numbers apart from the token that describes exactly this
job. Nothing in the file contradicts it, so it waits for a measurement rather than a refactor.

### Proof

**The eviction changed nothing.** HEAD served on one port, the working tree on another, the same
probe run against both at 360: burger drawer opened and the catalogue overlay walked to its goal
panel, 60+ computed properties compared - geometry, shadow, transform, visibility, every row's type
and padding, every mark's colour and svg size. **One difference, and it is the declared one:**
`.wf-catov-row .car` `rgb(203,203,203)` -> `rgb(187,187,187)`. Everything else byte-identical.

**The seam works.** 4 screens x 8 widths (360, 800, 900, 1000, 1075, 1076, 1200, 1440): **32 checks,
0 failures, 0 JS errors.** The tokens flip at exactly 1076 - `40px / 0px` below, `0px / 216px` above -
and the auth dialog, the cart drawer, the checkout body and the sticky header all follow in one move.
No modal under the bar, no header under the panel, no sideways scroll.

**Nothing else moved.** 10 screens x 7 widths, menu closed and open: 70 checks, the only sideways
scroll is `product-oos.html`, 12px at 860-1076, **identical at HEAD** - a `btn--outline btn--icon
btn--l wish` sticking 12 past the page. Pre-existing, found here, not fixed here.

### On the stand

`components/nav-drawer.css` and `components/cat-overlay.css` are rows in `design/kit/_nav.js` -
«Шухляда меню» and «Оверлей каталогу», both `done: false`. The kit sidebar counter reads **33 / 86**
and the organism section of `overview.html` reads **0 / 24**. That grid was rebuilt in the same step,
because its line counts were claims about files that had changed under it: header 179 -> 250,
account-shell 172 -> 181, auth-dialog 158 -> 164, cart-drawer 102 -> 112, footer 63 -> 70,
tabbar 24 -> 41, filter-sheet 21 -> 28, checkout-form 311 -> 313, buy-box 163 -> 165.

The two stand pages themselves are not written: organisms are 0 of 24, and the tier has not started.

---

## Step 7.27 - the rating: one mark, four sizes, five files, and a stand showing markup the product does not have

The owner opened `design/kit/rating.html` and said it looked frightening. It did, and for a reason
the page could not have shown by accident: **the specimen was not the product.**

    stand    <div class="rate"><span class="uiv-star">★</span> <span class="st">4.8</span> · 126 відгуків</div>
    product  <div class="rate"><span class="st"><span class="uiv-ic uiv-star"><svg…></span><b>4.8</b></span> · 126 відгуків</div>

Three differences and every one of them visible: the star stood BESIDE `.st` instead of inside it,
so no rule ever reached it; it was a ★ typed in a text face, not the icon set's drawing; and the
figure was `.st` itself rather than `.st > b`, which is where the product's mono 900 lands. The page
had been describing a control nobody had built.

### The census

40 colour screens at 1280 and 390, in the browser. **142 star marks on 17 of them**, and five files
shaping them:

| family | file before 7.27 | n | screens | row | star |
|---|---|---|---|---|---|
| `.pcard .rate .st` | rating.css + product-card.css | 90 | 16 | 12 | 13 |
| `.rvbig .starrow` | review-item.css | 15 | 3 | 14 | 18 |
| `.pm-stars .pmst` | review-modal.css | 15 | 3 | 30 | 31.5 |
| `.rvmeta .rstars` | review-item.css | 7 | 3 | 14 | 15 |
| `.pcard-l .lmeta .st` | rating.css + product-card.css | 6 | 1 | 12 | 13 |
| `.tbanners` banner 5 | banner.css | 4 | 4 | 14 | **14** |
| `.bb .bbrate .st` | rating.css | 3 | 3 | 14 | 15 |
| `.co-accrual .star` | checkout-form.css | 2 | 2 | 16 | **typed** |

### Three of the four sizes were one rule nobody had written down

`product-card.css` said 13 in a 12px row. `rating.css` said 15 in a 14px row. Two files, two authors,
one arithmetic: **the row's size plus one pixel.** The reading is that a star's ink does not fill its
box the way a digit fills its own, so a star given exactly the digit's size reads smaller than the
digit beside it - which is what both authors were correcting for.

Written down once as `calc(1em + 1px)` it reproduces 13 and 15 exactly, and it carries to every star
not yet placed. `.rvbig .starrow` keeps 18 as an explicit override: 18 in a 14px row is not a
near-miss, it is a five-star display row standing beside a 50px figure. The picker keeps `1.05em`
from icon.css, because there the star is not a figure's companion - it IS the control, which is the
distinction marks.js already draws at step 7.11.

### Three visible changes, each declared before it was made

**1. The trust banner's star, 14 -> 15.** Four instances, one banner, a 14px row - the same row size
at which the buy box and the review row both drew 15. Nothing distinguished it. It now takes the one
rule instead of its own number.

**2. The checkout's bonus star, typed -> drawn.** The last ★ on the site painted by the font, and
every earlier pass explains why it survived: `marks.js` walks CONTROLS and this is a span in a div;
the three `uivStarify` calls in `design/_nav.js` are named after ratings and a bonus is not a rating.
Same glyph, same drawing. Fixed in `_nav.js` beside the three that were already there, not by hand in
two html files.

**3. The review modal's picker, outline -> filled.** `icons.js` states the rule at the head of
`uivStarSvg`: «the rating star is the SAME glyph as the chrome star, filled. One drawing, two
finishes: outline for a nav chip, filled for a rating.» The one place a star is a whole control came
out as five outlines among 140 filled stars, and pressing one turned it into a gold outline. The rule
was already written; that path was not following it.

**And the first attempt at 3 was wrong, which the before/after run caught.** Making `uivSignSwap`
draw every ★ filled also filled «Знижки та бонуси» in the account nav - a ★ too, and a nav chip,
which by the same sentence must stay an outline. The glyph does not carry the answer; the context
does. So `marks.js` keeps the outline default and the picker is wired in `design/_nav.js`, where the
rest of the rating swaps live. Found on 2148 measured keys, not by eye.

One change was made and then **taken back**: merging `.rvmeta .rstars` into the family's rule turned
its `display: flex` into `inline-flex` on 6 review rows. The two render the same box in a block
column, but it was not declared, and a consolidation that changes something it did not declare is not
one. Put back exactly as found; whether they ever become one line is a Крок 6 question with a
measurement attached.

### What moved

Into `rating.css` (32 -> 115 lines): the 13px rule from `product-card.css`, the 14px rule from
`banner.css`, `.rvmeta .rstars` and `.rvbig .starrow` from `review-item.css`, and the whole picker -
shape and four colour rules - from `review-modal.css`. A control that SETS a rating is the rating's
own business; the modal decides where it stands.

Out of `rating.css`: `.pcard-l .lprice`, `.pcard-l .lold` and `.pcard-l .lmeta b` went to `price.css`.
All three had been sitting inside one shared `font-mono` declaration since the step-3 split, and the
rating's own stand had been reporting two of them in its idle check every time anybody opened it:
«2 of 5 classes are not on the page at all - lold lprice». Two more lines went without replacement: a
media query that set the value the rule already had, and the one figure of the family reading
`--text-primary` where the other three read `--text-body` (both are `var(--warm-900)`, so a token
change with no pixel behind it).

### Proof

**Before and after, HEAD on one port and the working tree on another. 2148 keys - every svg on every
screen plus every rating element, at 1280 and 390. Seven differences, and all seven are the three
changes above.** Zero JS errors. The card star stayed 13 through the rewrite, which is the whole
point of `calc(1em + 1px)`: 96 instances moved from a hard number to a rule without moving a pixel.

### The stand

Rebuilt from the census. Real markup, knot for knot. The size table with all four rungs and a
specimen of each. **The three states that are in the code** - the old page said «there is no state
but the base one», and the browser found `★ - · новинка` (6 instances on 6 screens, a product with no
reviews yet) and the empty `.rate` the skeleton leaves behind, held open by `min-height: 15px` so the
card below it does not jump. A pressable picker, because a state you cannot reach is a claim, not a
demo. A contrast table saying out loud that the gold star is 2.00:1 and is allowed to be, because the
figure beside it carries the fact.

Idle check: **passed** - all 8 classes of the file rendered in a demo, 3 states named.

One thing the stand now admits about itself: three of the four figure rules are scoped to a container
(`.pcard`, `.bb`, `.rvmeta`), so a rating outside a card, a buy box or a review row loses its mono
and falls back to Inter. Measured here - the first draft of the demo stood as a bare `<div class="rate">`
and its figure came out Inter 700. A level-1 atom that cannot stand on its own; unscoping it is a
Крок 6 item, with `.rstars` -> `.st` beside it.

The overview's line counts were rebuilt too, and 17 of them were stale: button 358 -> 415, chip
32 -> 161, icon 46 -> 88, stepper 3 -> 100, cart-row 63 -> 82, seo-text 17 -> 45 and eleven more.

### 7.27, re-check on the owner's word: one more leftover, and it was the dead one

Asked to look again at whether everything had actually landed. Static sweep of every component file
for a rating selector turned up `product-card.css`:

```
.pcard .pnew, .pcard .pold, .pcard .pcut, .pcard .perserv b, .pcard .rate .st,
.pcard .bonus, .pages a, .pages button, .lh1 .cnt{ font-family:var(--font-mono); … }
```

`.pcard .rate .st` in a shared declaration with the card's prices - and `product-card.css` is level 2
while `rating.css` is level 1, so at equal specificity **this line won and the identical rule
rating.css had just been given for the same selector was dead on arrival.** The consolidation had
moved the fact and left the winning copy behind: exactly the failure the step exists to prevent, one
file away from where it was being fixed.

Removed. The rating's figure is mono because it is a rating, not because it sits on a card - the same
sentence that sent `.lprice`, `.lold` and `.lmeta b` the other way. What stays in that list is the
card's own (prices, bonus, pager numbers); those belong in price.css by the same argument and are a
Крок 6 item.

**Re-verification after the removal.** 12 named assertions against the product at 1280 and 360 - one
per family, checking face, star size and fill - plus a sweep of all 40 screens at both widths:
**80 checks, 0 failures, 0 JS errors.** 142 stars at 1280 and **0 of them typed**. All four rungs
where they belong: 13 on the card and the list row, 15 in the buy box, the review row and the trust
banner, 18 in the five-star summary, 32 in the picker, every one `fill="currentColor"`. The account
nav's star is an outline on all eight links. The list card's three prices are still mono after their
move to price.css.

**The grey layer is untouched and still has its own editions** - `wireframes/_wf.css` draws the card
rating at 11.5px, the picker at 27px and no drawn star anywhere. That is the frozen layer working as
designed, not drift: it owns structure and states, the colour layer owns the look.

---

## Step 7.28 - the skeleton: one bar written six times, and a pulse that could not be stopped

Same method as the rating, same shape of answer. And the same first finding: **the stand was showing
markup the product does not have.**

The old specimen was `<div class="skcardbox"><div class="skcard">…` - a box inside a card, which
happens in the product exactly never; they are two different patterns, the account grid and the
catalogue grid. That nesting is where the double border in the screenshot came from. The grid around
it carried `style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px"`, so what the page
demonstrated was an inline style sitting on top of `.skgrid`, not `.skgrid`. And nothing in the demo
carried `.skpulse`, while the anatomy underneath named the pulse as one of its two parts.

### The census

40 colour screens at 1280 and 390: **140 skeleton elements, 22 class signatures, 5 loading screens.**
The bar - the most-used piece - was written six times in four files:

| name | file | n | height | s | m | l |
|---|---|---|---|---|---|---|
| `.skline` | skeleton.css | 78 | 10px | 50% | 72% | 90% |
| `.co-skel .sl` | checkout-form.css | 3 | **11px** | **46%** | 72% | - |
| `.auth-skel .sl` | auth-dialog.css | 2 | **11px** | - | **70%** | - |
| `.acc-subsk` | account-shell.css | 1 | **12px** | - | - | - |
| `.acc-h1sk` | account-shell.css | 1 | 24px | - | - | - |
| `.skcardbox .skline` | skeleton.css | - | 10px | its own ground, overridden | | |

### The heights are four numbers, not a rule

The rating's four star sizes turned out to be one arithmetic nobody had written down. This one is
not: measured by loading each screen twice, once as the skeleton and once as the content -

    .skline    10px  where `.pcard .nm` goes   16 / 20.8   0.63
    .acc-h1sk  24px  where `.acc-h1` goes      30 / 48     0.80
    .acc-subsk 12px  where `.acc-sub` goes     14 / 22.4   0.86

No ladder, no ratio. So the rule is stated instead of discovered: **a skeleton bar is not the height
of the text, it is a mark saying «a line goes here»**, and a mark that says the same thing three times
should say it at one size. The line is 10 everywhere - which 78 of the 84 bars already were - and the
only bar keeping its own number is the one standing for a HEADING, a different sentence.

### Three visible changes

| what | was | now | how many |
|---|---|---|---|
| bar height, `.sl` and `.acc-subsk` | 11px, 12px | 10px | 6 bars |
| `.co-skel .sl.s` | 46% | 50% | 1 |
| `.auth-skel .sl.m` | 70% | 72% | 1 |

Two files disagreeing by two percent about the same grey rectangle is not a decision anybody made.
The two narrow columns (checkout, auth dialog) came down 2px each as a consequence of their bars, and
the auth dialog with them - derived, not separate.

### The pulse stops now

`@media (prefers-reduced-motion: reduce)` was missing, and this is the one component on the site whose
whole job is to move. A loading hint must not be the thing that makes somebody ill. Added: the shape
stays, the breathing stops, opacity settles at .78 - mid-cycle, so the state still reads as «not yet».
Verified in the browser under an emulated reduce preference, on the stand and on the product.

And the stand now says what the old one never did: **`.skpulse` is a MODIFIER, and it goes on a real
component.** Eight of the 22 census signatures are a live component wearing this one class - `.bb`,
`.gmain`, `.gthumb`, `.acc-nav`, `.acc-cardgrid`, `.skgrid`. Opacity on the parent, so nothing inside
needs to know it is loading. That is why it is a bare class and not something scoped to this file's
own shapes, and it was the single biggest thing the page had been leaving out.

### A token that never painted a skeleton

`--bg-skeleton` = `#E9E7E2`. Three declarations named it - `.acc-h1sk`, `.acc-subsk`,
`.skcardbox .skline` - and all three were overridden back to `--bg-sunken` by one later line in
account-shell.css that reached across two other files to do it. Every one of the 140 measured
elements came out `#F2F0ED`. What the token actually paints: two hatch backgrounds and one hairline,
none of them a skeleton.

The dead declarations are gone. **The token's NAME is left exactly as it is** - renaming it is a
decision said out loud by its owner, not a side effect of a refactor.

### Proof

Before and after, HEAD on one port and the working tree on another, 15 screens at 1280 and 390:
**122 keys, 15 differences, and every one of them is one of the three declared changes or its direct
consequence.** `.skline`, `.skcard`, `.skimg`, `.skb`, `.skcardbox`, `.skgrid`, `.skpulse`,
`.acc-h1sk`, `.acc-cardgrid` and the three surviving `--bg-skeleton` users: no diff at all. Zero JS
errors.

The stand: rebuilt on real markup, `.skgrid` drawing its own four columns at 1440 and two at 390 with
no inline style over it, all three bar widths, both card patterns side by side, the three changed
bars shown as specimens, and the reduced-motion branch named. Idle check **passed** - all 16 classes
of the file rendered in a demo, 1 state named. No sideways scroll at 1440 or 390.

### 7.28b - the rename, on the owner's word

`--bg-skeleton` -> **`--bg-hatch`**, and one of its three users went to `--line-hair` instead.

The name was minted at step 2, when `#ECECEC` in 13 places was merged onto `--warm-200` and called the
loading placeholder bar. By 7.28 the browser said it painted no bar at all. What it actually drew:

| where | what | now reads |
|---|---|---|
| `.auth-visual` | diagonal hatch behind the dialog's visual panel | `--bg-hatch` |
| `.wfh-mega .ms-ph` | diagonal hatch in the mega menu's photo slot | `--bg-hatch` |
| `.fgroup` | a hairline under a filter group | `--line-hair` |

The hairline is the part worth pausing on: `--bg-skeleton` and `--line-hair` are **the same
`--warm-200`**, and the primitive's own note calls that value «plate pixel - the hairline». So a
hairline had been reading a background token for no reason anybody chose, and 217 other lines already
said the right name. Zero pixels change; one name stops lying.

The remaining two are a hatch, so the token keeps the value and takes the name of what it draws.
Deleted rather than aliased, which is the rule this file already follows: «a value that cannot be
named cannot be used» - the same reason fourteen primitives were deleted when the role layer landed.

**Proof that a rename is only a rename.** The working tree copied, and in the copy the rename alone
reverted - four edits, nothing else. Both served, 17 screens x 2 viewports, comparing every element's
background, background-image, four border colours, two border widths and ink, with the origin
stripped out of image URLs so the port number does not poison the hash: **48 240 elements, 0
differences, 0 JS errors.** (The first pass showed 24 - every one of them the absolute URL of
`mascot-gym-a.jpg` carrying a different port. The tool was wrong, not the code.)

Renamed on the stand too, because a token's name is a published string: the swatch and the usage map
on `color.html`, the same map on `typography.html` and `geometry.html`, and the section on
`skeleton.html` that told this story. `color.html`'s history row still names the old token - it is
describing what happened at step 2 and has to. Its idle check reads **passed, all 126 tokens of the
section shown**.

Found and not fixed, unrelated to this step: `geometry.html`'s idle check reports 5 tokens declared
in the file and not shown on the page - `--size-62`, `--size-52`, `--ring-focus-control` and two more.
Pre-existing.

### 7.28c - the skeleton re-checked on the product

12 named assertions against the product at 1280 and 360, one per family, plus a sweep of all 40
screens at both widths: **106 checks, 0 failures, 0 JS errors, 140 skeleton elements at 1280.**

The card lines measure **exactly 90 / 72 / 50 percent** of their container. The first pass reported
those three as failures; the probe was dividing by the parent's BORDER box while `width: 90%` is a
share of its CONTENT box, and `.skb` has 12 of padding on each side. Third time this session a tool
has been wrong where the code was right - after the port number inside a background-image URL and the
`.on` class that is always present on the item the arrow just moved to. Worth naming as a pattern:
**a failing assertion is a claim about the probe as much as about the page.**

Everything else landed: heights 10 and 24, radius 4 and 12, `#F2F0ED`, `--elevation-1` on the box,
`skpulse` on the buy box and the gallery, and **reduced-motion holding at `none / 0.78` on all three
loading screens.** Two skeleton rules remain outside skeleton.css - `gallery.css` saying what its own
photo slots look like while wearing `.skpulse` - and that is the pattern this step documented rather
than a leftover: the modifier is the skeleton's, what a component looks like wearing it is the
component's. The grey layer is untouched.

---

## Step 7.29 - the radio: three families in three files, and none of them reachable by keyboard

The line this file draws, and it decides everything else: **a chip filters a VIEW, a radio picks a
VALUE.** Press a chip and what you see changes; press a radio and what you buy changes. That is why
`.vopt` - the flavour picker - is a radio and not a ninth chip, decided by the owner at this step.

### The census

40 colour screens at 1280 and 390: **83 elements, 40 controls, 5 screens.** One job, three files, and
each disagreed with the other two about nearly everything:

| axis | `.co-opt` (21) | `.vopt` (17) | `.pf-lang` (2) |
|---|---|---|---|
| file | radio.css | buy-box.css | checkout-form.css |
| radius | 12 | 8 | 12 |
| padding | 12/16 | 8/12 | **16/16** |
| resting edge | `--line-hair` | `--line-strong` | `--line-strong` |
| hover | `--line-strong` | `--line-inverse` | **none** |
| chosen edge | `--line-action` | `--line-action` | **`--line-inverse`** |
| chosen ground | `--bg-action-soft` | `--bg-page` | **`--bg-sunken`** |
| the circle | 18x18 | none | **20x20** |
| unavailable | none | `.off` | none |
| real input | no | no | **yes** |

**Two rungs are real.** A radio standing alone in a column, with a title and a reason under it, is a
ROW: it carries what people actually choose by - the price, the wait - so it needs the circle, and a
quiet edge, because it has the page to itself. A radio standing shoulder to shoulder in a set of four
is COMPACT: no room for a circle, so the edge itself carries the state, which is why it starts one
step darker. Everything else in that table was three files disagreeing.

### Three visible changes, all on one control

`.pf-lang`, the language picker, two instances in the coach's client dialog: onto the row rung's
padding and resting edge, and onto the accent for «chosen» - edge, ground and circle. Two families of
three already said the accent, and the design principle says the same: the accent is the single
action colour. So the third comes to them.

### The thing that was actually broken

**Not one of the 38 controls could be reached by a keyboard.** `.co-opt` is a `<label>` pointing at no
input; `.vopt` is a `<span>`. No role, no tabindex, nothing announced. **The checkout could not be
completed without a mouse** - and the checkout is the screen with 21 of them.

The product already had the answer twice and used it in neither place: the language picker keeps a
real `input[type=radio]`, and the review modal's star picker is built with `role="radiogroup"` in
`wireframes/_nav.js`. The second was borrowed, because the first needs new markup and the markup
belongs to the frozen layer.

`uivRadioGroups()` in `design/_nav.js`: roving tabindex (the SET takes one tab stop, the arrows move
inside it), `role`, `aria-checked`, `aria-disabled`, arrows in both axes with wraparound, Space and
Enter, and `.off` skipped. **Selection goes through `.click()`**, so everything the page already does
on a click still happens - this file adds a way in, it does not take over what happens next.

**The first version of the call sat inside `uivPdp()`**, the product page's own pass, so the checkout
got nothing. Caught by pressing Tab in the browser. Moved into `uivChrome()`, which runs on every
page, after `uivMarks()`.

`radio.css` gained the focus ring it never had: `--ring-focus-control`, which has existed since step
6.2 and no radio read, because until now there was nothing to focus.

### Proof

**Before and after against HEAD**, 12 screens x 2 viewports, every radio element's box, border,
radius, ground, ink, padding, gap, type, shadow and `::after`: **90 keys, 3 differences, and all three
are the declared `.pf-lang` changes.** `.co-opt`, `.co-radio`, `.vopt`, `.vopts` - no diff at all.

**In the browser, by keyboard:** two groups on the checkout, one tab stop each, one checked each; ↓
moves focus and the choice together, ↑ comes back, exactly one tab stop throughout, focus ring on;
Tab leaves the group entirely (lands on the city button). On the PDP, the group containing the
out-of-stock size walks 0 → 1 → 2 → 0 → 1 and **never visits index 3**, and Space on it does nothing.
And the whole point: **an arrow on the checkout changes the delivery and recalculates the total -
3 999 → 4 019 → 3 939 ₴ - exactly as the mouse does.** 0 JS errors.

**The stand** is rebuilt on real markup and is itself operable: two groups wired by the same rules in
miniature, because a demo you cannot reach with Tab describes a component instead of showing it. Idle
check **passed - all 12 classes rendered in a demo, 4 states named.** The old page's numbers are
corrected on it: the touch target is **599x71**, not «44px», and the circle is 18, not 16.

---

## Step 7.30 - the link row: thirteen editions, one of them written by an attribute

### The census

Counted in the browser across 40 colour screens at 1280, every element whose computed
`text-decoration-line` contains `underline`: **124 links, thirteen editions, six files.**

| × | selector | who drew it | where |
|---|---|---|---|
| **87** | no class | **inline `style=`** in `wireframes/_nav.js:1766` | footer legal row |
| 24 | `.co-foot-links a` | checkout-form.css | checkout footer |
| 6 | `.linkrow a` | link-row.css | login dialog |
| 5 | `.auth-foot a` | auth-dialog.css | «Повернутися до магазину» |
| 4 | `.auth-consent a` | auth-dialog.css | oferta / policy |
| 4 | `.promo .ps a` | banner.css | «Усі акції» |
| 3 | `.ln-review` | account-shell.css | «Залишити відгук» |
| 2 | `.auth-sub a` | auth-dialog.css | «Змінити номер» |
| 2 | `.co-help a` | checkout-form.css | checkout help |
| 2 | `.co-consent a` | checkout-form.css | checkout consent |
| 2 | `.afilters .clear` | chip.css | «Очистити все» |
| 1 | `.ob-receipt` | account-shell.css | «Завантажити квитанцію» |
| 1 | `.co-proc-cancel` | checkout-form.css | cancel payment |
| 3 | `overview.html` | **nothing** | browser default `#0000EE` |

**The most repeated link on the site was the one no stylesheet could reach.** 87 of the 124 were
drawn by `style="color:inherit;text-decoration:underline"` typed into a render function - on 129
screens. Rule 3 of `wireframes/CLAUDE.md` says anything repeating on two or more screens moves into
`_wf.css`; this repeated on 129. The span gained `class="wff-legal"`, `_wf.css` gained the grey rule
byte for byte, and link-row.css gained the colour.

### The rule

**QUIET** is the link that has to be there and does not want to be pressed: legal, consent, help,
«Скасувати». `--text-secondary`, underline in `--line-strong`, hover to `--text-body`.
**LOUD** is the link that IS the action: «Залишити відгук», «Усі акції», «Змінити номер»,
«Очистити все». `--text-body`, `--fw-bold`, underline in `currentColor`, hover to `--text-action`
with the underline moving too.

The component keeps `display`, `gap`, `margin` and `font-size`; this file sets no `font-size` on
anything except the row itself. That is why `.ln-review` still lives half in account-shell.css.

### Two values said out loud, and both were the same argument

| | 600 / `--line-strong` | 700 / ink |
|---|---|---|
| font-weight | 8 | 10 |
| underline colour | 8 | 10 |

**The 8 are the same 8 both times** - `.linkrow a` and `.auth-sub a`, the two families the login
dialog draws. So this was not two disagreements, it was one file disagreeing with the site. Decided
**700 on ink**, because that is what makes the loud rung legible AS a control at 12px, where 5 of its
18 instances live.

**The underline figure could not be read from the source.** banner.css declared
`text-decoration-color: var(--line-strong)` for `.promo .ps a`, which by the CSS text puts those 4
with the 8 and flips the answer to 12-against-6. In the browser they were ink: the markup carried an
inline `text-decoration: underline`, and the **shorthand resets `text-decoration-color` to
`currentColor`** - which no stylesheet can outrank. Read from the source, the wrong rung wins.

### Declared changes

1. `.linkrow a` (6) - 600 → 700, `--text-secondary` → `--text-body`, underline `--line-strong` → ink.
2. `.auth-sub a` (2) - 600 → 700, underline `--line-strong` → ink, `cursor: auto` → `pointer`.
3. `.wff-legal a` (87) - `--text-muted` → `--text-secondary`, underline own-colour → `--line-strong`.
4. **Not planned; the A/B found it.** `.co-consent a` (2) and `.co-foot-links a` (24) carried
   `text-decoration-color` and **no `text-decoration`** - painting the colour of an underline that
   did not exist. Joining the quiet rung gives them the underline. Kept rather than reverted: both do
   a job the site already underlines elsewhere, and `.co-consent a` is word for word the sentence
   `.auth-consent a` underlines in the dialog. Written down rather than left in the diff - the same
   line 7.27 drew over `.rvmeta .rstars`.

### The `!important` that was not decoration - a defect I introduced and the A/B caught

The first draft deleted two `!important` from `.promo .ps a` with a comment saying they beat nothing.
**The comment was wrong.** They were beating `style="...color:#111"` typed into four home screens -
the one thing specificity cannot outrank. The A/B returned **8 links and the 32 icon marks inheriting
their colour at `#111` instead of `#1C1C1C`**. Fixed by removing the inline style from all eight
files and giving `_wf.css` the grey rule (`#111` is `var(--strong)` to the byte), not by putting the
`!important` back. An `!important` is a note that something upstream is wrong; deleting the note
without reading it puts the bug back. The comment in banner.css now says so.

### What was actually broken: the login dialog had no keyboard path

Four links carry the dialog's whole navigation - «← Змінити номер», «Ввів неправильний код?»,
«Увійти іншим способом», «Повернутися до магазину» - and all four are `<a onclick>` **with no
`href`**. An anchor without href takes no focus. Verified twice: `.focus()` called directly on each
was refused, and 120 tab stops on `auth-code.html` landed on the close button and every OTP cell
without once reaching a link. Locked decision 5 sends coach, buyer and beginner through this one
dialog. Same defect class 7.29 found in the checkout, in the screen before it.

`uivDeadLinks()` in `design/_nav.js` gives every `a[onclick]:not([href])` a `role="button"`,
`tabindex="0"` and Enter / Space. Written as a shape, not a list of four. Called from `uivChrome()`
and again from `uivAuthPaint()`, because each dialog step replaces its own innerHTML.

**Roles were not enough, and the second half is in another file.** After the fix Tab reached the
first of the four and then sat on `input.box` for 41 consecutive stops - of which there are six.
`fields.js` had a focus trap: the rule «a click on an empty cell lands where the work is» is written
on `focusin`, and `focusin` cannot tell a click from a Tab, so every forward Tab was dragged back to
the first empty cell. Three of the four links stand below the code field in the DOM, so none of them
was reachable. Fixed in `fields.js` with a `pointerdown` flag that `focusin` reads and clears. Out of
this atom's scope and taken anyway, because without it this step's own deliverable does not exist.

### Proof

**A/B against HEAD**, 39 screens x 2 viewports, 22 computed properties per element:
**108 310 elements compared, 266 differences in 14 groups, and every group is one of the declared
changes above** - the rest of each group being `transition`, which appears wherever the hover is new.
No element changed that was not a link.

`opacity` was in the property list on the first pass and came back with 22 differences, all on
`.skpulse`, all in the fourth decimal - a running animation read a millisecond apart on the two
ports. It is not a comparable property and was dropped rather than explained away.

**In the browser, by keyboard:** the login dialog now runs close → «Змінити номер» → six code cells,
once each → «Підтвердити» → «← Змінити номер» → «Ввів неправильний код?» → «Повернутися до магазину».
Focus ring `--ring-focus-control` on all four. Enter on «← Змінити номер» changes the dialog step.
The mouse rule still holds - a click on the 6th cell lands on the 4th, the first empty one - and
arrows and type-to-advance are unchanged.

**At 360:** the stand and five product screens, 0px of sideways scroll.

**The stand** is rebuilt on real product markup - every one of the thirteen families rendered live,
not described. Idle check **passed: all 15 classes rendered in a demo, 2 states named.** Its old lead
(«у футері, під формою, у згоді») and its anatomy demo were both invented: `.linkrow` appears only in
the login dialog, 6 times, and the demo was a hand-drawn copy of a footer row `link-row.css` did not
own.

### Found, not fixed

- **3 links on `design/overview.html`** render at the browser's default `#0000EE`. The hub is not a
  product screen, so it stays on the list rather than in this step.
- **3 inline `style="color:inherit"`** on `.wff-soc` - the same defect as the legal row, but that is
  footer navigation, not a link row. Belongs to the footer component's own step.
- **15 selectors where there should be 2 classes.** `.tlink` / `.tlink--loud` is the Крок 6 shape;
  renaming breaks the frozen grey layer, so it waits for after stage 09.
- **No `:visited` anywhere on the site.** Stage 09.

### 7.30b - two questions on the rebuilt stand, and both were defects

Asked on the finished page, not found by a probe. Both are what a stand is for.

**«87 без класу - is that still true?»** The census table showed only the BEFORE state, so a reader
could not tell whether 87 links were still unreachable by CSS. They are not: the wrapper gained
`class="wff-legal"` and the selector is `.wff-legal a`. The `<a>` elements themselves are still
classless **on purpose** - all 87 are drawn by one render function, a class on the parent is enough
for the selector to exist, and 87 attributes in the markup would exist only in order to be 87. The
defect was the rule living in an attribute, not the absence of a class on each anchor. The table now
carries a **стало** column so it says which of the thirteen went where, and to which rung.

**«Why are there chips on the link-row stand?»** Because `link-row.css` was drawing a row of chips.
`.flink` became a chip at step 7.23 - it moved into chip.css whole, 60 instances of the same pill as
`.dr-chip` - but its ROW, `.flinks`, was left behind in the text link's file. And chip.css already
held the same three declarations **twice**, as `.dr-chips` and `.cegoals`. So one row was written
three times in two files, and the third copy was in the wrong component entirely.

`.dr-chips, .cegoals, .flinks` is now one line in chip.css, with `.flinks`'s own `margin-top` on a
second. `link-row.css` holds text links and nothing else - 159 lines, 14 classes, 9 tokens.

**This was only visible because the stand had just been rebuilt on real markup.** On a list of class
names `.flinks` reads like a row of links; rendered, it is two orange pills sitting under a paragraph
about SEO copy. No census would have caught it - the count of underlined links inside `.flinks` is
zero, which is exactly why it never appeared in the table above.

**Proof:** 6 listing screens x 2 viewports, **22 848 elements, 36 differences - all 36 are the
declared `.wff-legal a` colour change**, none from the move. `.flinks` on listing.html renders
`flex / wrap / gap 8px / margin-top 8px` over 6 children, as it did at HEAD. Idle checks: link-row
**passed, 14 of 14**; chip **passed, 16 of 16** - `.flinks` added to its stand and to the family
table there, so the class is shown where it now lives.
