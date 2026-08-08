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

---

## Step 7.31 - the chip: 503 instances, and the browser was drawing their focus

### The census

Step 7.23 settled the LOOK. Re-counted in the browser at 7.31 - 40 colour screens
x 2 viewports, every instance through `getComputedStyle`: **503 chips, and both rungs
are holding without a single deviation.** 41 / 14 / 600 / 8-12 / 1.5 / pill for a
filter, 41 / 14 / 700 / 8-16 / 1.5 / pill for a segment, 12 / 600 / 4-12 for the mega
menu's smaller rung. Nothing about the look had drifted back. What had never been
done at all was the interaction layer.

| class | tag | keyboard | focus ring |
|---|---|---|---|
| `.dr-chip` `.flink` `.mgchip` `.hero-chips a` | `<a href>` | reachable | **the browser's blue** |
| `.afilter .x` | `<button>` | reachable, and already named | **the browser's blue** |
| `.ptab` (32) | `<span>` | **unreachable** - and it answered a click | - |
| `.ord-tab` (3) | `<span>` | **unreachable** - and it answered nothing at all | - |

**A sweep of every loaded stylesheet for an `outline` or `box-shadow` on any of the
eight names returned an EMPTY LIST.** So every chip a keyboard could reach was
showing `outline: rgb(0, 95, 204) auto 1px` - Chrome's default - on a site that has
had `--ring-focus-control` since step 6.2 and now uses it on the button, the field,
the radio and the link. The chip, the most numerous control on the site, was the
last one still borrowing the browser's.

### What was done

**One focus rule** for the eight names plus the applied filter's ✕, on
`:focus-visible` so a mouse press does not light it up.

**`uivSegments()`** in `design/_nav.js` for the segment rung: `role="tablist"` /
`role="tab"` / `aria-selected` and a roving tabindex, the same shape
`uivRadioGroups` uses. The set takes ONE tab stop, arrows move inside it with
wraparound, Home and End jump to the ends. `tablist` and not `radiogroup` on
purpose: a radio picks a value that goes into the order, a tab switches which
slice of the same list you are looking at - the same line chip.css draws between a
filter and a segment.

**A behaviour change, declared:** `.ord-tab` now answers a press. It did not
before, with a mouse either - measured, not assumed: clicking index 2 left `.on`
exactly where it was. Three filters over the order list that did nothing. The five
lines in `uivPdp` that used to move `.on` for `.ptab` are gone; both families now
go through the one rule, which is how the twin stopped being dead.

**No disabled state, and that is the answer rather than a gap.** Zero chips in the
product carry `disabled`, `.off` or `.disabled`, at either width, on any of the 40
screens. The note left after 7.29 saying the chip should copy `.vopt.off` is
**withdrawn**: `.vopt.off` exists because a flavour can genuinely be out of stock.
A filter that would return nothing is a case the product does not have, and drawing
a state for it here would be inventing one.

### The guard that skipped a whole family

The first draft used `role === 'tablist'` on the parent as its «already done»
flag. The browser then showed `.ord-tabs` with a marked parent and three unmarked
children: **`account-orders.html` already writes `role="tablist"
aria-label="Фільтр замовлень"` into the markup**, so the guard fired on the
author's own attribute and skipped the group. Fixed with a `data-uiv-seg` flag,
which is ours.

It is also the sharpest thing this step found. The grey layer had **declared** a
tablist and never wired one - a role announcing a control that did not exist. So
wiring it is not invented behaviour; it is the markup's own promise, kept.

### The stand stops carrying a second edition of the rule

`design/_nav.js` declares functions and runs nothing at load, so a stand can load
it and take the one rule it needs. `chip.html` does that and calls
`uivSegments()`; the `.ptab` and `.ord-tab` demos on the page are operable, with
the product's code and not a description of it.

The same fix went back into `radio.html`, which since 7.29 had carried a **35-line
miniature re-write of `uivRadioGroups`** - a second edition of a rule, written into
the page that demonstrates the rule. It now loads the real function and supplies
only the one thing a stand genuinely lacks: a click that moves `.on`, because
`uivRadioGroups` selects through `el.click()` precisely so the PRODUCT's own click
handling still runs, and behind a demo there is no product.

### Proof

**A/B against HEAD**, 39 screens x 2 viewports, 21 computed properties per element:
**108 310 elements compared, ZERO differences.** A keyboard and a focus ring are
what this step added, and neither shows at rest - which is exactly what the run had
to demonstrate.

**By keyboard, in the browser.** `.ptab`: one tab stop for four tabs, → 1, → 2,
← 1, End 3, Home 0, click still selects, Tab leaves the group. `.ord-tab`: one tab
stop for three, click now selects (index 2), ← wraps 1 → 0 → 2, Home 0, End 2,
reached by real Tab and showing `rgb(255,255,255) 0 0 0 2px, rgb(255,90,0) 0 0 0
4px` - the system ring, `outline-style: none`. `.flink` reached by 200 real Tab
presses on the listing: same ring, browser blue gone.

**Both stands.** chip: idle **passed, 16 of 16 classes, 2 states**, demos operable,
0 overflow at 360, 0 JS errors. radio: idle **passed, 12 of 12, 4 states**, arrows
run 1 → 2 → 0 and **never visit index 3**, which is the `.off` one, now carrying
`aria-disabled="true"` from the product's own function.

### Found, not fixed

- **`.acc-link` keeps a 1px edge** where the family keeps 1.5, and above 860 it is
  the same segment pill with the same 14 / 700 / 8-16. One pixel of border gives 40
  instead of 41. 7.23 took `.acc-link` out of the family deliberately, so this is
  not corrected silently - the call is the owner's.
- **No `:active`** anywhere in the family: no chip shows the moment of the press.
- **One name instead of eight** - Крок 6, after stage 09.

---

## Step 7.32 - the view toggle and the switch: two selectors that unwrote themselves

Taken together because the registry names them almost the same - «Перемикач вигляду»
and «Перемикач» - and because both were still the raw step-3 split, 24 and 15 lines,
never rebuilt.

### The view toggle: the same control written twice

Counted in the browser across 40 colour screens at 1280 and 390: **7 groups, 14 cells.**

| screens | cell | href | name | keyboard |
|---|---|---|---|---|
| `listing` · `listing-list` · `listing-filtered` · `listing-sheet` | `<a>` | yes, a real navigation | «Сіткою» / «Списком» | native |
| `listing-empty` · `listing-error` · `listing-loading` | `<span>` | none | **none** | **none** |

**AND THE FIRST READING OF IT WAS WRONG.** It looked like the state screens had been
built by copying, and the fix looked like turning six spans into links - which is what
was proposed and approved. Counting the grey layer's thirteen toggle-bearing screens
against how many product cards each holds says something else:

| cards | cell | screens |
|---|---|---|
| > 0 | `<a>`, live | listing 10 · listing-list 7 · listing-filtered 6 · listing-sheet 10 · search 9 |
| 0 | `<span>`, dead | listing-empty · listing-error · listing-loading · goal-empty · goal-error · goal-loading · search-loading |
| **11** | **`<span>`, dead** | **goal** - the only exception |

**A toggle is live exactly when the screen has a list to reorder.** On the seven empty
screens the pair is inert because there is nothing to switch, and that is correct
behaviour rather than carelessness.

**The proposed link would have been a lie with a href on it.** `listing-list.html` is
the ONLY list view in the entire product - no `goal-list`, no `search-list`, no list
twin of any empty, error or loading state. So the «Списком» cell on `listing-empty`
has nowhere honest to point: the one destination available holds **seven products**,
and that screen found none. The change was authorised on my description of it; the
description was wrong, so the change was not made and this is the correction.

**So the spans stay.** What is wrong is not that they are spans, it is that they look
pressable - `cursor: pointer`, full ink, no sign that this half leads nowhere. Drawing
that sign means a disabled state, and step 7.31 refused to invent one for the chip on
the same grounds.

**`goal.html` is the real defect, and the only one:** 11 products, a toggle already
carrying `aria-label="Сіткою"` and `aria-label="Списком"`, and nothing to press -
because `goal-list.html` does not exist. That is a missing screen, IA's to decide.

### A selector that wrote, and two patches that unwrote it

The old file said `.vtoggle span`, which matches **every** span inside the box -
including `.uiv-ic`, the icon's own wrapper. So the wrapper was handed the cell's
padding, the cell's background and the cell's muted ink, and two further rules
existed to take all three back off it:

    .vtoggle .uiv-ic{ background: none; padding: 0 }
    .vtoggle a.on .uiv-ic{ color: var(--text-action) }

`>` says what was meant all along - a cell is a DIRECT CHILD of the box - and both
patches go with it. **Found by deleting the icon rule first and watching the chosen
glyph go grey in the browser.** Inheritance was never what coloured it; the patch was.

### Three visible changes, listed rather than slipped in

1. **The chosen cell's ink, white -> `--text-action`** (14). `--text-oninverse` is
   white and the chosen ground is `--bg-action-selected`, a 10% tint. Nothing was
   invisible today because the cell holds an icon and no words - measured, zero text
   nodes - but a word added there would have been white on near-white.
2. **The hovered cell's glyph, grey -> `--text-action`** (8 reachable cells). The
   hover rule moved the CELL's ink, and the only thing in the cell was an icon being
   painted muted directly by the over-broad selector. Measured at HEAD: on hover the
   ground went to `#FAF9F7` and the glyph stayed grey. **A hover state on 13 screens
   that changed nothing you could see.**
3. **A focus ring** where Chrome's blue outline used to be. The stylesheet sweep for
   an `outline` or `box-shadow` on `.vtoggle` returned empty, exactly as it had for
   the chip at 7.31. Drawn INSIDE, because the box clips its children with
   `overflow: hidden` and an outset ring on a cell would be cut in half by the edge.

### The switch: right in the markup, absent from the tab order

`.sw` has two instances in the colour layer, both on `account-profile`, and its
markup is already correct - `<span class="sw" role="switch" aria-checked="true"
aria-label="Згода на розсилку">`, click wired, track and knob both animating. **The
one thing missing was the tab stop.** 250 Tab presses never landed on it. Third time
this stage has met the shape: `.ord-tabs` at 7.31, the login dialog's links at 7.30.

`uivSwitches()` keys on `[role="switch"]:not([tabindex])`, not on `.sw`. It is the
ROLE that promises a keyboard, so the role carries the fix - and it reaches `.ck-tog`
the day the cookie dialog gets a colour twin, without anyone having to remember this
function exists.

### A probe bug of mine, caught before it became a finding

The first measurement of `.sw` said the class and `aria-checked` flipped while the
track and knob stayed put, and I nearly logged it as a dead control. It was the
**transition**: the read happened immediately after the click and the animation runs
.16s. After 400ms: ground `#FF5A00` -> `#D9D9D9`, knob 21px -> 3px. Fourth probe bug
of this stage and the same lesson each time - the instrument is a suspect too.

### The second switch, and why it is not merged

`.ck-tog`, the cookie dialog's category toggles in cookie-banner.css, is the same
control with every value different: track 42x24 against 44x26, knob 18 against 20,
a 1.5px edge against none, `--bg-inverse` against `--bg-action`, `--bg-sunken`
against `--bg-track`, a `.locked` disabled state against none - **and the classes run
in OPPOSITE directions**, `.sw.off` marking off against `.ck-tog.on` marking on.

**Not merged, and the reason is a count: `.ck-tog` renders ZERO times in the colour
layer.** The cookie dialog is demoed on `wireframes/system.html`, which has no colour
twin. Choosing between 44x26 and 42x24 with only one of them visible would be taking
a number off a page nobody can open. When that screen gets a colour twin the merge is
one line - and `.ck-tog.locked` is the disabled state switch.css should copy, because
here the product genuinely has the case, unlike the chip.

### Proof

**A/B against HEAD**, 39 screens x 2 viewports, 23 computed properties per element.
Every difference is one of the three declared changes, plus `cursor: auto -> pointer`
on `.sw` and its knob (a control that answers a click now says so), plus the icon
wrapper's `transition` shorthand losing a declaration it inherited from a selector
that should never have matched it.

**By keyboard.** The switch: reached by Tab, ring `rgb(255,255,255) 0 0 0 2px,
rgb(255,90,0) 0 0 0 4px`, Space flips it to `aria-checked="false"` with ground
`#D9D9D9` and knob at 3px, Enter flips it back, and the page does not scroll under
it. The view toggle: reached, labelled «Сіткою», inset accent ring, `outline-style:
none`.

**Both stands** rebuilt on real product markup - the toggle's demo takes its glyphs
from `icons.js` instead of typing `▦` and `☰`, and the switch's demo is operable,
loading `design/_nav.js` for `uivSwitches()` rather than copying it. Idle checks
**passed: view-toggle 1 of 1 class and 2 states, switch 2 of 2 and 1 state**. 0
overflow at 360 on both, 0 JS errors.

### Found, not fixed

- **`goal.html` has 11 products and a dead toggle** - because `goal-list.html` does
  not exist. A missing screen, IA's call, not this stage's to draw.
- **Seven inert toggles look pressable.** On an empty screen there is nowhere to go,
  but `cursor: pointer` and full ink do not say so. Saying it needs a disabled state
  the product does not have.
- **Two editions of the switch**, with the class running opposite ways. Waits on a
  colour twin of `system.html`.
- **No `:active`** on either component.

## Step 7.33 - the press: 3 351 controls a finger touches and nothing answers

The atom layer was 21 of 21 by the registry, and by one measure it was not finished
at all. Every state this system had written was a state a MOUSE fires.

### The census

Browser, 39 coloured screens, outermost pressable element only (an icon inside a
button is not a control), and only what a finger can actually reach - hit-testable
box, `pointer-events` on, nothing at `opacity: 0` above it:

```
  11 630   pressable elements in the DOM
   3 854   of them reachable right now
     503   answer a press      13%   every one of them a button
   3 351   answer nothing      87%
```

Then the same walk with `:hover` and `:active` forced in turn, 400ms after each
force so the .15s transition has finished - the probe bug that has now bitten this
stage five times:

```
  96 families
  21   answer both   all buttons: --accent, --outline, --ghost
  52   ANSWER A MOUSE AND NOT A FINGER
  23   answer neither
```

**On a mobile-first product the feedback layer had been written for the secondary
device.** `:hover` appears 131 times across 38 files. `:active` appeared 5 times
across 2, and one of those five is `.btn--lift:active{ transform: none }`, a reset.

### The rule, and it was already in the file

`button.css` had both halves and had never said them in one place:

| control | press answer |
|---|---|
| has a ground | one step toward the accent: `--bg-action-soft`, or `--bg-action-pressed` where the ground is already accent |
| is only type | nothing. «Type that jumps under the finger is worse than no answer», step 7.8 |
| lifts | the lift drops |

**No new value.** Both grounds have been in `tokens.css` since 5.5, named for this
job - `--bg-action-pressed` was extracted then as «the only pressed state in the
product, and it had no name». It has six more now.

### Who took it

| file | selector | instances |
|---|---|---|
| `chip.css` | all eight names, and `.on` separately to `--bg-action-pressed` | 503 |
| `button.css` | `.btn--icon.btn--text:active` | 92 |
| `checkbox.css` | `.optin:active .cb`, `.fopt:active .cb` | 176 |
| `stack-action.css` | `.btn--stack:active` | 238 |
| `radio.css` | `.vopt` `.co-opt` `.pf-lang`, unchosen only | 38 |
| `stepper.css` | `.ci-qty button` `.co-qty button` | 15 |
| `view-toggle.css` | `.vtoggle > a:not(.on)` | 8 |

**`.btn--text` refused a press for a reason about a WORD, and it was governing 92
icon buttons.** `button.css` itself says `--text --icon` gets a 44px box for the
finger, six lines above the refusal that then applied to it. 86 hearts on cards and
6 wishlist crosses had no box state because a rule written for a label reached them.

### Two refusals, written down rather than left as gaps

- **`switch.css`.** The track is 44 x 26 and a fingertip covers it completely, so a
  pressed ground is a state nobody on a phone can see. The .16s toggle IS the
  answer, and a tint would fight it for the same 160ms. `--bg-action-pressed` was
  the obvious value; the control cannot show it.
- **`link-row.css`.** 601 links, the largest single family, and none get a press.
  A text link has no ground, and its answer is the underline drawn AT REST. Written
  into the file so the next pass does not read the gap as an oversight.

### Two more controls still borrowing Chrome's ring

Same sweep, same defect the chip had at 7.31: `.wf-tab` and `.ci-qty button` both
returned `rgb(0, 95, 204) auto 1px` under `:focus-visible`. The tab bar takes the
outset ring (the bar sets no `overflow`), the stepper key an inset one (its frame
clips with `overflow: hidden`).

### The tab bar is the sharpest instance

`.wf-tab` at rest, hovered and pressed returned the identical computed style three
times. Five tabs on 34 screens - the control touched more than any other in this
product - acknowledged nothing. The hover was RIGHT to be absent; the press was the
state a phone paints, and it was missing.

### Verified by tap, not by DevTools

A forced pseudo-state proves the CSS, not the platform. Touch context, 390 x 844,
`hasTouch`, real `touchscreen.tap()`, polling `matches(':active')` every 8ms:

```
  .btn--accent    #FF5A00 -> #E85200      .flink       #FFFFFF -> #FFF9F5
  .ptab <span>    #FFFFFF -> #FFF9F5      .ptab.on     #FF5A00 -> #E85200
  .ord-tab        #FFFFFF -> #FFF9F5      .wf-tab      transparent -> #FFF9F5
  .fopt .cb       transparent -> #FFF9F5  .fopt .cb.on #FF5A00 -> #E85200
  .vopt           transparent -> #FFF9F5  .co-opt      #FFFFFF -> #FFF9F5
  .vtoggle > a    #FFFFFF -> #FFF9F5      .fav         transparent -> #FFF9F5
  .ci-qty button  transparent -> #FFF9F5
  .sw             enters :active, ground unchanged   <- the declared refusal
```

`.sw` is the useful one: it proves a `<span>` DOES take `:active` on a tap, so the
switch's silence is the decision and not a platform gap.

**iOS Safari is `[?]`.** No iOS device in this session. Whether it needs an empty
`touchstart` listener is logged, not guessed.

### The probe bug, and the change it nearly caused

`.ptab` came back never entering `:active` on a tap while `.ord-tab` beside it did.
An empty `touchstart` listener was written into `design/_nav.js` as the fix. It
changed nothing, because nothing was broken: `scrollIntoView` had not moved the page,
the tap landed at `y: 1815` in an 844-tall viewport, and `elementFromPoint` there
returns `null`. **The listener was removed before commit and `_nav.js` is unchanged
in this step.** With the scroll driven properly `.ptab` behaves exactly like its
twin. Fifth probe bug of the stage, first one that nearly shipped as a fix.

### Proof

**A/B against HEAD: 108 994 elements, 39 screens plus the hub, two viewports, cache
cleared between passes. 414 differences in FOUR groups, every one declared:**

| n | what |
|---|---|
| 340 | `.wf-tab` `border-radius: 0 -> 8px` - 5 tabs x 34 screens x 2 viewports |
| 68 | `.wf-drawer` shadow `0 16px 34px/.13 -> --elevation-3` - the drift 7.26 logged |
| 4 | `design/overview.html` `.foot-note a` off the browser's `#0000EE` |
| 2 | `design/overview.html` `.sub a`, same |

Every `:active` and `:focus-visible` rule is invisible at rest, which is what the
zero elsewhere says. 0 overflow at 360 across all 40 screens. 0 JS errors.

### The stands

A press section on all ten touched stands, `:active` into `KIT_STS` where the file
now declares it. Idle checks pass on all ten. `checkbox.html` had been failing at
HEAD - it demoed only the `.fopt` edition and never `.optin`, the very split the
step then found in the CSS - and now shows both side by side.

**Six other stands report themselves incomplete, and were already failing at HEAD:**
`availability` (`in`, `out`), `badge` (`gnote`), `counter` (`wl-count`), `discount`
(`wtag`), `price` (`old`, `cpri`), `status-pill` (`aord-status`). Each belongs to
its own atom's step. Counted here because nobody had counted them.

### The hub was wrong about its own layer

- **`stack-action.html` existed with no card**, so the atom layer read `21 / 21`
  when `index.css` imports 22 files at level 1. Card added, header now `22 / 22`.
- **`menu.css` had no card anywhere**, and `menu.html` was finished. Organisms now
  `1 / 25`, not `0 / 24`.
- **Nine line counts on the hub were stale**, `view-toggle` by 28 lines since 7.32.
  Resynced from the files.

### Also closed

- **`geometry.html`** showed 44 of 49 tokens of its section. `--size-32`, `--size-52`,
  `--size-62`, `--size-64` joined the size ladder and `--ring-focus-control` the ring
  list, with their real counts (1, 6, 0, 1, 8) so the page does not report a live
  token as unread. Idle check now passes.
- **`.wf-drawer`** takes `--elevation-3`. 7.26 measured the drift and left it because
  that step already carried a visible change; this one declares it.

### Found, not fixed

- **The filter panel has no keyboard and no screen reader.** `<label class="fopt">`
  wraps a `<span class="cb">` and NO `<input>`: no role, no `aria-checked`, no tab
  stop. 50 options on `listing.html`, 11 tabbable elements in the whole rail, none of
  them a checkbox - and the control is live, a click moves `cb` to `cb on`. Same
  shape as `.ord-tab` at 7.31 and `.sw` at 7.32, and bigger than the step that found
  it. `uivCheckboxes()` is the shape of the answer.
- **The checkbox atom is declared twice** - `checkbox.css` scoped to `.optin` (1
  instance), `filter-group.css` for `.fopt` (175, 9 rules, level 2). The level-1 file
  holds the rarer one.
- **`.lfav` answers nothing**, while `.fav` and `.wlrm` both answer the cursor.
  `product-card.css` pins its colour with five rules and loads after `button.css`.
  7 instances, the product card's step.
- **The pagination current-page chip cannot show a press** - `.pages a.on` at level 2
  beats `.btn--outline:active` at level 1 on order. It is the page you are already on,
  so arguably correct; noted rather than changed.
- **`product-oos.html` still runs 12px sideways at 860-1076** and the grey
  `wireframes/index.html` 26px at 900. Both verified identical at HEAD, both layout
  work in an organism, neither is this step's.

## Step 7.34 - the filter panel: half a contract, which reads worse than none

Step 7.33 found this and said it was bigger than the step that found it. It was.

### What was there

`design/_nav.js` ALREADY wrote `aria-checked` on every filter option. It never
wrote a ROLE - and `aria-checked` on an element with no role is inert: the
browser drops it. So the file looked handled and the control said nothing. Read
out of the accessibility tree rather than argued about:

```
  before   { role: "LabelText",  name: "",                       checked: undefined }
  after    { role: "checkbox",   name: "В наявності 71",          checked: false }
  after    { role: "checkbox",   name: "Optimum Nutrition 12",    checked: true }
  header   { role: "button",     name: "Тип протеїну",            expanded: true }
```

And it was written ONLY ON A CLICK. Of the 34 options that render already
checked, not one announced it until somebody pressed something.

Counted across 39 coloured screens at 390 and 1280: **700 `.fopt` plus 2
`.optin`, 0 with a role, 0 with `aria-checked` at load, 0 with a tab stop.** The
rail on `listing.html` renders 25 options and holds 11 tabbable elements - six
chips, four number fields, «+ ще 11». None of the 25.

### Three families, and only one of them was the one being looked for

| what | n | had | now |
|---|---|---|---|
| `.fopt` + `.optin` | 351 on 8 screens | nothing | `role="checkbox"` · `tabindex="0"` · `aria-checked` at load · Space |
| `.fgroup > .fh` | 140 | nothing | `role="button"` · `aria-expanded` · Enter and Space |
| `.fgroup` | 140 | nothing | `role="group"` + the name already in its header |

**The group header was a disclosure that told nobody.** Ten per panel, `cursor:
pointer`, and a click really does collapse the group - `wireframes/_nav.js`
toggles `.collapsed`, `filter-group.css` hides the body with `display: none`.
Complete behaviour, missing promise. The grey layer already knows the move:
`toggleCab()` and `toggleLang()` in that same file both write `aria-expanded`.
Two of the product's three disclosures were named; the filter header was not.

The class stays the grey layer's to toggle - this only READS IT BACK. Two
editions of one collapse is the defect this stage exists to remove.

### Space, not Enter, and no roving tabindex

A checkbox answers **Space**; Enter belongs to the primary action, and in the
mobile sheet that action is «Застосувати». The switch took both at 7.32 because
nothing else on its row wanted Enter. Same file, two bindings, and the
difference is what the control stands next to.

**No roving tabindex, and this is where the family parts from the radio.**
`uivRadioGroups` gives a group ONE stop because a radio group is one value.
Twenty-five filters are twenty-five independent answers, so each takes its own:
the rail goes 11 -> 46. That is the cost of the panel being what it is.

### The step made it worse first, and that is how the older bug surfaced

Giving 25 options and 10 headers their tab stops took the CLOSED mobile sheet
from 14 focusable elements to 49. `transform: translateY(100%)` moves a panel off
the bottom of the screen and leaves it visible to everything that is not an eye.

**Measured at HEAD**, 390 wide, `listing.html`, sheet shut: **14 focusable
elements inside it** - the ✕, six chips, four number fields, «+ ще», «Скинути»,
«Застосувати». Tab past the last thing on the page and you walked into a panel
nobody had opened. That predates this stage.

The stops are right; the sheet was wrong. `visibility: hidden` with the exit
delayed past the slide - `.wf-drawer` in nav-drawer.css has carried this exact
edition for the same reason all along.

**Then the same instrument over every overlay, drawer and dialog in the product,
closed, at both viewports:**

```
  HEAD   #fsheet 42   everything else 0
  now    nothing
```

The filter sheet was the single leaky layer, and it is shut.

### Proof

**A/B against HEAD: 108 994 elements, 40 pages x 2 viewports, cache cleared
between passes, 17 properties per element including `visibility` and
`outline-style`.**

```
  2 100 differences
  2 100 inside #fsheet            0 anywhere else on any page
  2 100 are `visibility`          12 also carry the sheet's own `transition`
      0 colour, geometry, type, spacing or shadow
```

An accessibility fix that moves nothing anyone can see is the whole point, and
this is what that looks like when it is measured rather than asserted.

**By keyboard, live.** Rail: Tab reaches an option, ring is
`--ring-focus-control`, Space flips `aria-checked` false -> true -> false with
`.cb` -> `.cb on` -> `.cb`, focus stays put and **the page does not scroll**.
Header: Enter collapses (`aria-expanded` true -> false), the rail's stops drop
46 -> 44 as that group's two options leave the tab order, Space reopens it.
Sheet: opens, 49 reachable, Space toggles inside it, closes, 0 reachable.
Click still works. 75 pages: 0 overflow at 360, 0 JS errors.

### Two gaps this step made and then closed

- **The stand rendered checkboxes a keyboard could not reach** - on the page
  whose subject is that they now can. `checkbox.html` did not load
  `design/_nav.js`. Caught by reading `role` and `tabindex` off the stand's own
  demo, not by looking at it. It loads the product's function now, the shape 7.31
  settled.
- **`.optin` would have shown Chrome's blue ring.** `.fopt` takes its ring in
  filter-group.css next to the panel; the opt-in needed its own line in
  checkbox.css. One instance, and it is the last thing between a person and an
  account.

### Also resynced

**Twenty stand pages carried a stale line count** in their own `kp-meta` row,
`button.html` by 195 lines. Four more on the hub. Both from a script, both
reading the real files.

### Found, not fixed

- **The accessible name carries the count**: «В наявності 71». It reads as one
  phrase to a screen reader. Splitting it needs an `aria-label`, and interface
  strings belong to voice, not here.
- **`wireframes/` keeps the whole defect.** The grey layer builds this panel and
  is frozen after stage 05; this fix lives in `design/_nav.js`, so the colour
  layer has it and the prototype does not. Same split as 7.29, 7.31 and 7.32.
- **The checkbox atom is still declared twice** - `checkbox.css` scoped to
  `.optin` (1 instance), `filter-group.css` for `.fopt` (175). Unchanged by this
  step, which was about behaviour.
- **Six stands still report themselves incomplete**, all failing identically at
  HEAD: `availability`, `badge`, `counter`, `discount`, `price`, `status-pill`.

## Step 7.35 - availability: the atom that only worked inside a card, and a dot typed 107 times

The stand had been reporting this for steps and it read as a stand problem.

### The atom was not an atom

Every rule in `availability.css` was scoped to `.pcard`. So the component
existed only inside a product card - and `design/kit/availability.html`, which
writes `<div class="pavail low">` with no card around it, rendered **black, 16px,
unstyled**. Its idle check said «2 of 5 classes are not on the page at all: in
out» and had said it since the check was written. The classes were on the page.
The scope was the problem.

### Four names for one line, in four files, three of them identical

Counted in the browser across 39 coloured screens:

```
  .pavail    92 on 16 screens   availability.css (L1, inside .pcard)   12/700
  .lavail     7 on  1 screen    product-card.css (L2)                  12/700
  .hd-av      4 on  4 screens   banner.css       (L2)                  12/700
  .bbavail    3 on  3 screens   buy-box.css      (L3)                  14/700
```

The first three agree on **every measured value** and differ only by which box
they stand in. `.bbavail` is a rung up because the PDP is where the decision is
made - the line is read there rather than scanned - and that is the only real
difference in the set, so it is the only one kept as a variant.

**And product-card.css held a dead declaration:** `.lavail.pre, .lavail.out
{ color: --text-secondary }` on line 30, `.lavail.pre { color: --text-info }` on
line 90. The first never rendered. Same shape 7.4 swept 1 038 times.

Names are not renamed - all four are written by markup the frozen grey layer
shares. Крок 6, same line as `.ci-qty` / `.co-qty` and `.wf-tab` / `.wfh-act`.

### The dot had three editions and 107 of them were typed

```
  <div class="pavail in">● В наявності</div>        x107, 17 coloured screens
  .oh-status.ok::before{ content: "● " }            status-pill.css
  .hdots i{ width: 7px; border-radius: circle }     the only one that was a shape
```

Why a typed sign is the same defect steps 7.8-7.12 closed for the button:

| | measured |
|---|---|
| it is read aloud | a screen reader says «black circle В наявності» |
| it has no size of its own | Inter's `●` is **5.16px** of ink at the 12px rung and **6.02px** at 14px - one meaning, two sizes, nobody chose either |
| nothing can tell it from the word | not a selector, not a style - which is why taking it out of the text IS the fix |

**6px, one value, derived not picked:** 5.16 and 6.02 are what the glyph gave at
the two rungs and 6 is the whole number between them. The 12px rung gains 0.84px
of dot, the 14px rung gives up 0.02.

`currentColor`, so the dot follows the state without a second colour rule - four
states, four selectors, not eight. The gap is `--space-4`, which is what the
space character was already producing: measured 3.9px ink-to-word.

**The order pills took the same shape** - `.oh-status` (4) and `.aord-status`
(1). One dot, one declaration, four families.

### The A/B caught a declaration dropped in the move

`.bbavail` carried `font-family: 'Inter', sans-serif` in buy-box.css, and it was
not decoration: it sits inside `.bbmeta`, which is **monospace**. The line came
off with the block, and the first A/B pass showed the PDP's availability line in
mono and **8.5px wider**. The atom declares the family now - the other three
inherit body type and would never have noticed, which is exactly why the atom
should say it rather than depend on where it was put.

`--font-body`, not the literal: the token carries the system fallbacks after
Inter, the literal had only `sans-serif`. **Seven more components still write
that literal** - counted, not fixed here.

### Not merged, and said out loud

`.ci-oostag` in cart-row.css states the same fact and has a different SHAPE: a
pill, 10px IBM Plex Mono, sunken ground, hairline. One instance, one screen.
Merging means deciding whether the shelf label becomes a pill or the cart row
gives up its tag - a look decision with a single instance behind it.

### Proof

**A/B against HEAD: 108 994 elements, 40 pages x 2 viewports, cache cleared
between passes. 233 differences in 22 groups:**

| n | what |
|---|---|
| 212 | `TXT: ● X -> X` - the typed dot leaving the text on all six families |
| 8 | `.oh-status` three states, width -4.4px |
| 6 | `.bbavail` font-family literal -> token, width -1.8px |
| 6 | `.bbmeta` narrows with the line inside it |
| 4 | `.oh-thumbs` shifts 4.36px, laid out after the pill |
| 2 | `.aord-status` width -4.4px |
| 1 | `.auth-spin` 64x64 -> 59x59 - the spinner sampled mid-rotation, the noise this stage has logged four times |

The width change is the dot's footprint: **14.25px** before the word (glyph
advance 11.41 + space 2.84) became **10px** (6 + 4). Every group is that one
change seen from a different element.

**Colour, weight, size, line-height, radius, shadow and padding: unchanged
everywhere.** 75 pages: 0 overflow at 360, 0 JS errors.

### The stand

Rebuilt on real markup: four states rendered, four names side by side, both
rungs, the order pills sharing the dot, the cart tag standing next to the atom it
did not merge with. Idle check **13 of 13**, and `availability` leaves the list
of six stands that report themselves incomplete - five left, all failing
identically at HEAD.

### Found, not fixed

- **`wireframes/` keeps all 107 typed dots.** The grey layer is frozen after
  stage 05, so the character came out of the colour layer only. Same split as
  7.29, 7.31, 7.32 and 7.34.
- **Seven components still write `'Inter', sans-serif` as a literal** instead of
  `--font-body`: buy-box (3), cart-row, checkout-form, discount, loyalty-rung (2).
- **`--text-info` has exactly 2 uses and both are this component** (`.pavail.pre`,
  `.lavail.pre`). Whether a role with one reader is a role is a stage 09 question,
  and it was already on that list.

---

## Step 7.36 - the price: eight surfaces, sixteen names, and a locked rule written eight times

**Instrument:** Claude, in a browser. 39 coloured screens at 390 and 1280, computed
styles only, plus a counterfactual A/B against HEAD over 108 994 elements with the
cache cleared between passes.

### Where the step started

The atom shelf read 22/22, and five stands still reported themselves incomplete.
Reading them out gave three different diagnoses, not five bugs:

- **`badge.css` holds `.gnote` and `.gnote` is not a badge.** It is a grey-prototype
  annotation - `wireframes/listing.html:173`, «↑ Порядок карток (за замовч.)...» -
  and the coloured clone dropped it correctly, which is why no coloured screen
  renders it. The product's real badges are `.tag`/`.tag-pop`/`.tag-new` in
  product-card.css and address-card.css, all scoped, none of them in badge.css.
- **`counter.css` holds `.wl-count`, `discount.css` holds `.wtag`, `price.css` holds
  `.cprice`** - three names with **0** instances in colour, all of them grey-only
  because the coach flow and the wishlist have no coloured twin. The colour layer is
  **40 of 142 screens**.
- **The demos were right and the files were wrong.** Every one of these stands
  renders the product's real names - `.pnew`, `.pold`, `.pcut`, `.tag`, `.cnt` - and
  measured at 16px/400/#1C1C1C/transparent, the inherited body value. `.hbadge` is a
  ghost: 0 rules anywhere, 0 instances anywhere, present only in the counter demo.

The product itself was intact: swept all 39 screens for a money or badge element
computing to the body default and found none.

### The census

Eight surfaces, the same three lines in the same order on every one of them:

```
[struck]  1 520 ₴   −15%
[live]    1 290 ₴
```

| surface | live | struck | cut | held by | level |
|---|---|---|---|---|---|
| grid card | `.pnew` 92 | `.pold` 22 | `.pcut` 22 | product-card.css | 2 |
| list card | `.lprice` 7 | `.lold` 2 | `.lcut` 2 | product-card.css | 2 |
| home deal | `.hd-new` 4 | `.hd-old` 4 | `.hd-cut` 4 | banner.css | 2 |
| PDP buy box | `.new` 3 | `.old` 2 | `.cut` 2 | buy-box.css | 3 |
| PDP shelf | `.tnew` 2 | `.told` 2 | `.tcut` 2 | pdp-tabs.css | 3 |
| mobile buy bar | `.mbp b` 3 | `.mold` 3 | `.mcut` 3 | buy-bar.css | 3 |
| cart row | `.ci-sum` 6 | `.ci-old` 2 | `.ci-cut` 2 | cart-row.css | 2 |
| checkout line | `.li-sum` 9 | `.li-old` 3 | `.li-cut` 3 | checkout-form.css | 3 |

**Sixteen names for two facts**, and `price.css` declared none of them. Two of the
names are `.new` and `.old`, which are not names.

**And the locked owner rule had eight editions.** DESIGN-artifacts.md:61, locked
2026-07-29: «a price that is REDUCED is set in Signal Orange; a price with no
discount stays ink», line 65: «implemented data-driven via `:has()` on the struck old
price, **so the colour cannot drift from the fact**». It was one rule in kit.css. The
step-3 split turned it into eight, one per file. Eight copies of a rule whose whole
purpose is that it cannot drift.

Plus a ninth line nobody had connected to it: `.bb.retailref:has(.old) .new{ ink }`,
the coach PDP, where the struck figure is the retail reference and orange would claim
a saving that is not the fact. It sat in buy-box.css with no stated reason.

### What was measured to disagree

- **The struck price had three weights.** 400 on `.pold` `.lold` `.hd-old` `.old`
  (30 elements), 500 on `.ci-old` `.li-old` (5), 600 on `.told` `.mold` (5). Nobody
  chose the split: `.told` inherited the 600 that `.tprice` declares for its block.
- **The live price had two weights at one size.** All of 20px, and 800 on `.pnew`
  `.lprice` (99), 700 on `.ci-sum` `.li-sum` `.tnew` `.mbp b` (20).
- **`.hd-old` was the only struck price of eight without `tabular-nums`.**
  banner.css wrote the mono family on line 76 and `font-variant-numeric` on line 78 -
  to its own sibling, one line apart.
- **The ₴ kerning was on the container, not the figure.** `-.24em` declared on
  `.tprice` (16px) resolved to -3.84px and was inherited by a 12px struck price and a
  20px live one alike. The list card had none at all: product-card.css:72 lists
  `.pcard` and not `.pcard-l`.
- **A dead declaration.** `.pcard-l .lprice` carried `color: var(--text-primary)` on
  product-card.css:34 and `var(--text-body)` on line 84 - same selector, same file,
  and only the second ever rendered. Third of its kind this stage.
- **`--text-price-was` is a token with 0 rendered uses.** Its comment claimed 10.
  Exactly one selector read it - `.cprice .old` - and `.cprice` renders nowhere.

### The rule

`price.css` (22 -> 212 lines) declares what is the same on all nine surfaces and
nothing that is not: the mono family and tabular digits, the kerning **on the figure**,
the struck price's grey / 400 / strike, the live price's ink and its 800 at 20px, and
the owner rule as **one selector list** with its one exception named beside it.

Size stays with the surface, and that is not laziness: 20px in a cart row and 36px in
a buy box are two decisions about the same fact, and both are right.

`--fw-regular: 400` was added to tokens.css. The system has always used 400 and never
named it, because 400 is what you get by writing nothing - and the struck price is the
one place that has to say it out loud, since inside `.tprice` «unset» means 600.

The atom does **not** read `--text-price-was`. `#AAAAAA` is 2.32:1 on white, and what
a thing used to cost is a fact a person checks the discount against, not decoration.
All 40 struck prices already render `--text-muted` at 5.2:1. The token's comment now
states the measured truth and it stays declared until stage 09 rules on it, so that
removing it is a decision rather than a side effect.

### Refused, and said out loud

- **The live price above 20px keeps its own weight** (home deal 30/700, buy box
  36/600). One surface each, and a heavy weight at display size is not the same
  optical decision as a heavy weight at 20. Ranking display weights is a stage 09
  typography question; inventing a ladder to make a table look tidy is the exact side
  effect this project forbids.
- **The `-N%` chip is not in this step.** It is discount.css's atom and it has eight
  names too, split three ways: `.pcut` `.tcut` `.mcut` in mono (27 instances),
  `.lcut` `.hd-cut` `.cut` `.ci-cut` `.li-cut` in Inter (13), against
  DESIGN-artifacts.md:77 which puts every price figure in mono. `.cut` is the only one
  at 800 where the other seven are 700; `.tcut` the only one padded 2/4 where the rest
  are 2/8. Two of the Inter ones write the literal `'Inter', sans-serif`. Measured
  here so the next step starts with it done.
- **`.perserv` not unified.** The card writes `<b>18 ₴</b> / порція` - words in the
  body face, figure in mono, which is what the locked line actually asks for. The PDP
  writes the whole string in mono with no `<b>` at all. Making them one needs a `<b>`
  in the PDP markup and a call on whether the bonus belongs on that line, and the
  second is IA's.
- **Names not renamed.** All sixteen come from markup the frozen grey layer shares.
  Крок 6, with `.new` / `.old` / `.cut` at the front of the queue.

### The error this step made, and how it was caught

The first A/B came back with **3 092 differences** and the direction was wrong: every
price on every screen had gone from IBM Plex Mono to Inter, from `tabular-nums` to
`normal`, from 800 to 400. Cause: two of the explanatory comments in `price.css` were
appended **after** a `*/` that had already closed the block, so the file carried two
stray `*/` and the parser threw away everything that followed. The atom was not
overriding the molecules - it was not being read at all.

Caught by the A/B in the same pass, which is the whole reason the pass exists: the
sweep before it (stands only, no baseline) reported the stand as fine, because the
stand was ALSO unstyled and so nothing looked out of place. A balance check now runs
over every stylesheet as part of the pass. It found one more, pre-existing and
harmless: `stack-action.css` has 16 `*/` to 15 `/*` at HEAD as well.

### A/B, after the fix

**108 994 elements, 40 pages x 2 viewports, cache cleared between passes: 206
differences, and every one of them is money.** The six that fell outside the money
class are unclassed `<b>` elements, which is the mobile buy bar's live price - it has
no class of its own.

| what changed | where | count |
|---|---|---|
| live price 20px 700 -> 800 | `.ci-sum` `.li-sum` `.tnew` `.mbp b` | 20 |
| struck price 500/600 -> 400 | `.ci-old` `.li-old` `.told` `.mold` | 10 |
| `.hd-old` gains `tabular-nums` | home deal | 4 |
| kerning now computed on the figure, not the block | `.told` `.ci-old` `.li-old` `.mold` `.hd-old` | 13 |
| kerning reaches the list card at all | `.lprice` `.lold` | 9 |
| `.uiv-cur` follows its parent (`font-weight: inherit`) | everywhere | 54 |
| `.mbp` container 600 -> 400, inert - no child reads it | buy bar | 6 |

Colour is unchanged on every price on every screen. Family unchanged - all still
mono. Size, line-height, radius, padding and background unchanged everywhere.

**40 screens at 360: 0 overflow, 0 JS errors. 35 stands at 360: 0 overflow, 0 JS
errors.**

### The stand

Rebuilt on product markup: all nine surfaces, each as a pair - with a struck price
and without - so the `:has()` rule is **read rather than described**. Verified in the
browser: orange where the struck price is present, ink where it is not, ink in the
coach's `.bb.retailref` even though the struck price is there.

`.kp-2col` and `.kp-lbl` were added to `_page.css` rather than to the page. `.kp-grid`
auto-fills and would reflow a pair into three columns, which silently breaks the
comparison the demo exists to make.

**And the stand found one more scope defect on its way up.** `.hdeal .hd-price` and
`.hdeal .hd-oldline` in banner.css are the price block's internal stacking - struck
line above, live figure below - scoped to the deal card. Standing on its own the block
collapsed into one line, which is the availability defect one level down. Both names
exist only inside a deal, so unscoping costs nothing and buys the block the right to
exist outside its card. Proved by the A/B: adding `display`, `flex-direction`, `margin`
and `gap` to the compared properties returned **the same 206 differences** - the
`.hdeal` qualifier had been doing no work at all.

`.cprice .old{ display:block }` went to client-row.css with the rest of that row's
layout: the coach row is a right-hand column with room for one line, so its struck
price stacks under the live one where every other surface puts it above.

Idle check: **22 of 22**. `price` leaves the incomplete list; four remain - `badge`,
`counter`, `discount`, `status-pill`, all failing for the reasons censused above.

### Found, not fixed

- **`36px` is a literal in buy-box.css.** There is no `--fs-36` and the buy box is the
  only thing in the product that asks for one. Stage 09.
- **The gate's own figures in DESIGN-artifacts.md are stale.** It lists «card 22 /
  mobile 19, list 21, buy box 36, shelf 19, buy bar 19»; the browser renders 24/20,
  20, 36, 20, 20. The gate itself holds - every rung clears 19px bold - but the
  numbers drifted. That file has an owner and is not edited here.
- **Five components still write `'Inter', sans-serif` as a literal**: buy-box (3),
  cart-row, checkout-form, discount, loyalty-rung (2). Two of them are the `-N%` chip
  and come off in the discount step.
- **`stack-action.css` has one unbalanced `*/`**, pre-existing at HEAD and harmless in
  practice - the stand passes 9/9.
- **`.hbadge` is a ghost** in the counter stand's demo: 0 rules, 0 instances.
- **The coach flow has no coloured twin** - 102 of 142 grey screens do not. Крок 6.

---

## Step 7.36b - the discount chip, and a regression the previous step's filter hid

**Instrument:** Claude, in a browser. 39 coloured screens at 390 and 1280, computed
styles only, A/B against HEAD over 108 994 elements with the cache cleared between
passes.

### The census

One chip, eight names, 40 instances. Colour was the only thing that had never
drifted:

| name | | family | size | weight | line-height | padding |
|---|---|---|---|---|---|---|
| `.pcut` | 22 | **Mono** | 10 | 700 | 16 | 2/8 |
| `.lcut` | 2 | Inter | 10 | 700 | 16 | 2/8 |
| `.hd-cut` | 4 | Inter | 12 | 700 | 19.2 | 2/8 |
| `.cut` | 2 | Inter | 12 | **800** | 19.2 | 2/8 |
| `.tcut` | 2 | Inter | 12 | 700 | 12 | **2/4** |
| `.mcut` | 3 | **Mono** | 12 | 700 | 12 | 2/8, ls **-.01em** |
| `.ci-cut` | 2 | Inter | 12 | 700 | 15.6 | 2/8 |
| `.li-cut` | 3 | Inter | 12 | 700 | 15.6 | 2/8 |

`--text-danger` on `--bg-discount` with radius 4 on all eight. Two families, two
weights, two paddings, and **four line-heights - which for a chip means four
heights**, because a chip's height is its line-height plus its padding. 16, 19.2,
15.6 and 12, and nobody chose any of them but the last: 1.6 is the page's body
leading and 1.3 is a cart row's, inherited by a chip that never asked. Same shape as
`.told` inheriting 600 from `.tprice` one step ago.

### The regression 7.36 shipped, and why its A/B did not stop it

Step 7.36 took `font-family` off `.pdp-tabs .tprice`, which `.tcut` had been
inheriting - so the PDP shelf's chip went from IBM Plex Mono to Inter. The A/B **saw
it**: it is in the 206. It was not read, because `.tcut` was inside the money class
the sweep was filtering FOR, and «206 differences, every one of them money» was
reported as a clean result.

The filter was the defect, not the value. A class that is expected to change is still
a class whose changes have to be read one by one; «expected to change» and «changed
the way I expected» are different claims. The 7.36 log and commit both say the
sweep came back clean, and on this one element it did not.

### The rule

`discount.css` (17 -> 117 lines) declares the chip: mono figures, `--fw-bold`,
`--lh-flat`, the ground, the ink, radius 4, padding 2/8, **and a size**.

The size is where this differs from price.css on purpose. A price has four rungs, 20
to 36, each a real decision about a surface. The chip has two, and 10 is only the two
cards being dense - so 12 is the chip's own number and the cards override it. The
stand is what settled that: rendered on its own, six of the eight came out at 16px,
because their 12 was written as `.hdeal .hd-cut`, `.mbuybar .mbp .mcut` and so on.
Six copies of one number, and the chip could not stand up without one of six
ancestors around it.

**The face follows what is written in the chip, not which chip it is.** The cut
carries a figure, so it takes the mono face DESIGN-artifacts.md:77 gives every price
figure. The tier variant carries a word - «гурт» - so it takes `--font-body`.
`.mcut.ttier` had been setting that word in a typeface chosen for digits.

`.ttier` came here from pdp-tabs.css, where it had been declared inside a
«moved off the screen» block, alongside the chip it modifies but two files away from
it. `.wtag` - the coach session's ninth name, 0 rendered instances - is named here
for the reason `.cprice` is named in price.css.

### Declared, and what the A/B returned

**108 994 elements, 40 pages x 2 viewports, cache cleared between passes: 80
differences, all 40 chips at both widths, and nothing else at all.**

| change | chips |
|---|---|
| Inter -> Mono | `.lcut` `.hd-cut` `.cut` `.ci-cut` `.li-cut` 13, plus `.tcut` 2 put back |
| line-height -> `--lh-flat` | `.pcut` 22, `.lcut` 2, `.hd-cut` 4, `.cut` 2, `.ci-cut` 2, `.li-cut` 3 |
| weight 800 -> 700 | `.cut` 2 |
| padding 2/4 -> 2/8 | `.tcut` 2 |
| letter-spacing off | `.mcut` 3 |
| tier variant -> `--font-body` | `.mcut.ttier` 1 |

Measured box: the 12px chip goes 49x23 -> 45x16, the 10px one 43x20 -> 40x14. That
reflows the rows around it - a cart row is 190 -> 186 - which is the 181 «non-chip»
rows an earlier pass counted before the box dimensions were split out of the compare.
With box size excluded, **zero** non-chip style changes.

Colour, ground and radius unchanged on all 40, which is what they always were.

**40 screens at 360: 0 overflow, 0 JS errors. 35 stands at 360: same.**

### Caught by the A/B in this step

`.pcut`'s 10px lived in **discount.css**, not on the card - the atom file knowing how
dense a product card is. Rewriting the file dropped it and the chip went to 16px on
19 cards. It is in product-card.css now, next to `.pcard-l .lcut`, which had always
said the same 10 in the right place.

discount.css also carried `@media (max-width:620px){ .pcard .pcut{ font-size:
var(--fs-10); padding: 2px 8px } }` - both values identical to the base rule, so the
query never changed anything. Dropped, not moved.

### The stand

Rebuilt on product markup: all eight surfaces in one grid, so the two sizes and the
one chip are read side by side; the tier variant with all three of its names,
including the grey-only `.wtag`. Idle check **10 of 10**.

Three stands still report themselves incomplete - `badge`, `counter`,
`status-pill` - and the reason is the same one censused at 7.36: their file declares
a name the colour layer never renders.

### Found, not fixed

- **Four `'Inter', sans-serif` literals left**: buy-box (3, two of them inside a
  `font:` shorthand), loyalty-rung (2). Was seven; the chip took two and price.css
  took one.
- **Two shapes for the tier chip** - `.ttier` on a sunken ground, `.wtag` with a
  border. Merging is a look decision with 2 rendered instances behind it and waits
  for the coach flow to have a colour layer.
- **Eight names.** Крок 6, `.cut` at the front of the queue with `.new` and `.old`.
- **No threshold rule**: the system does not know from what percentage a discount is
  worth showing at all. Stage 09, and it was already on that list.

---

## Step 7.37 - the last three stands: a badge, a pill and a counter

**Instrument:** Claude, in a browser. 39 coloured screens at 390 and 1280, computed
styles only, A/B against HEAD over 108 994 elements with the cache cleared between
passes.

Three stands had been reporting themselves unshown since Крок 3 and all three had the
same cause, censused at 7.36: **the file declared a name the colour layer never
renders**. This step closes them, and each turned out to be a different kind of
mistake underneath.

### badge.css - the file held no badge

`.gnote` is not a badge. It is a **grey-prototype annotation**:
`wireframes/listing.html:173`, «↑ Порядок карток (за замовч.): спершу в наявності...»,
a note to whoever reads the prototype. The coloured clone dropped it, correctly, which
is why it renders on 0 of 39 screens. Scaffolding got swept into the system at the
step-3 split and sat there wearing the file's name. Deleted - `wireframes/_wf.css`
still declares it for the grey layer that does use it.

The real badges were in product-card.css, scoped: `.tag-pop` 18, `.tag-new` 8.

**`.tag` alone is not a badge in this product, and that is measured.** 27 elements
carry `.tag`; 26 also carry a kind; the 27th is `.aaddr .adef .tag`, the word «За
замовчуванням» in an address card - no ground, no border, static, an eyebrow. The
`.ci` defect from step 7.21, a fourth time this stage. So the file names
`.tag.tag-pop, .tag.tag-new`: precise today because a badge always says which kind
it is, and the rename is Крок 6's.

**A dead pair went with it.** `.pcard .tag` declared a white ground with a hairline
border, overridden two lines down by both kinds - it had never rendered. The list
card carried the same dead white edition, and that one **did** render the moment the
atom took over, because `.pcard-l .lph .tag` at (0,3,0) beats `.tag.tag-pop` at
(0,2,0): both list badges went white-with-a-hairline. Caught by the A/B, fixed by
leaving that selector only what is the card's - where the badge sits and how small
it is on a 56-84px photo.

### status-pill.css - one shape, four names, and a green drawn two ways

| | | size | padding | file |
|---|---|---|---|---|
| `.oh-status` | 4 | 12 | 4/12 | here |
| `.rbadge` | 7 | 10 | 2/8 | review-item.css |
| `.aord-status` | 1 | **12** | **2/8** | here |
| `.ci-oostag` | 1 | **10** | **4/12** | cart-row.css |

All four: 1px border, `--radius-pill`, a tinted ground. They agreed on the geometry
that is hard to guess and disagreed on the four values that are easy - the signature
of four people drawing one thing separately.

**Two rungs, and they were already in the product.** 12px is the pill of a row that
is mostly about the status; 10px rides inside something else. Padding follows the
rung, which is how `.oh-status` and `.rbadge` already worked. `.aord-status` and
`.ci-oostag` were the two that crossed the ladder, one each way.

**`.rbadge` is a status.** «✓ Купив товар» reports the state of a review - the
purchase behind it is verified - in the same green `.oh-status.ok` uses, one file
away. Its name was the only thing making it look like a different component.

**One green.** `--bg-success-soft` is `rgba(46,125,70,.07)` and its own comment reads
«the fill of the success pill». `.rbadge` filled with `--bg-success` (#F1F8F3, the
success *plate*) and bordered with `--line-success-soft`, the pill's border - half of
one and half of the other. The difference is under a percent of luminance, which is
exactly why it survived: nobody could see it, and the system said two things anyway.

**`.ci-oostag` arrives from 7.35's open list.** That step refused to merge it with the
availability LINE and gave the reason - «it is a different shape: a pill». The pill's
own step is where that shape gets owned. Its mono uppercase at 500 stays and is
argued rather than inherited: it is the only pill in the set carrying bad news about
something the person already chose, and shouting it would make the row read as an
error instead of a fact to act on.

**Not merged, and the line is drawn:** `.city-badge`, 272 instances on 34 screens, is
the same pill geometry and is a CONTROL - a city you press, with a hover. Shape
shared with a control is the button's argument, not this file's.

### counter.css - 470 of them, and the file declared the one nobody sees

`.wl-count`, the wishlist count, on a screen that exists only in `wireframes/`. The
470 a person actually reads were in six other files:

| | | | |
|---|---|---|---|
| `.fopt .ct` | 350 | filter-group.css | Mono 12/400 |
| `.flink .ct` | 84 | chip.css | **Inter** 12/600 |
| `.acc-link .ct` | 21 | account-shell.css | Mono 12/800, in a pill |
| `.lh1 .cnt` | 5 | section-head.css | Mono 16/600 |
| `.co-sec-h .cnt` | 3 | checkout-form.css | Mono 14/500 |

Colour never drifted - `--text-muted` on all of them, which is the whole of a
counter's meaning: it is never the point of the row it sits in. Two faces, five
weights, three sizes did.

**`.flink .ct` is the one real defect**: a count, two pixels from 350 identical
counts, and the only one in the body face. chip.css gave it a size and a colour and no
family, so it took the page's.

**Size and weight stay with the surface, and unlike the discount chip this is not a
near-tie to be broken:** 12 beside a filter option, 14 in a checkout section head and
16 inside a listing H1 are three rungs of type, each set by what the count stands next
to. Ranking them would mean redesigning three headings to tidy one atom. The atom
fixes the face, because a count is the same KIND of thing at every rung.

**`.hbadge` was a ghost.** The counter stand rendered it in its demo; 0 rules anywhere
in the system, 0 instances anywhere in the product. It was never a class, only a word
someone wrote in a showcase.

**Not merged:** `.coachbn .ct` in client-row.css is `.ct` again and is the coach
banner's HEADLINE - 24px display type in white. One name, two meanings, a fifth time
this stage. It renders on 0 coloured screens, so the atom cannot collide with it
today. Крок 6.

### A/B

**108 994 elements, 40 pages x 2 viewports, cache cleared between passes: 1 008
differences, and every one of them is in one of the three families. Zero outside.**

| change | count |
|---|---|
| `.ct` / `.cnt` gain tabular figures | 916 |
| `.flink .ct` Inter -> Mono | 96 of those |
| `.tag-pop` / `.tag-new` line-height 16 -> 13 (`--lh-snug`) | 52 |
| `.rbadge` ground, one green, line-height | 14 |
| `.oh-status` line-height 19.2 -> 15.6 | 8 |
| `.aord-status` padding 2/8 -> 4/12, line-height | 2 |
| `.ci-oostag` padding 4/12 -> 2/8, line-height | 2 |
| list-card badge radius 4 -> pill, line-height | 4 |

Colour is unchanged on every counter, every badge ground is unchanged, and the three
pill state colours are unchanged. What moved is height and face.

**40 screens at 360: 0 overflow, 0 JS errors. All 35 stands: idle check passed, 0
overflow, 0 JS errors** - the first pass of this stage where no stand reports itself
incomplete.

### Found, not fixed

- **`.rbadge` has a typed `✓` in its markup**, the same defect the availability dot
  was at 7.35. Unlike the dot it is inside an interface string - «✓ Купив товар» - and
  strings belong to voice, not to this file. Reported, not rewritten.
- **8.5px is a literal** on the list card's badge: there is no token between 8 and 10,
  and a 56px photo is the only thing that asks for one.
- **No «скасовано» state** - the code has three and an order's path has at least four
  ends.
- **No zero rule** for the counter: the system does not know whether to show «0» or
  hide the row.
- **Four `'Inter', sans-serif` literals** left: buy-box (3, two inside a `font:`
  shorthand), loyalty-rung (2).
- **Five names to rename at Крок 6**, all one-name-two-meanings: `.tag`, `.ct`,
  `.cut`, `.new`, `.old`.

---

## Step 7.38 - the checkbox: an atom a molecule was overwriting

Both of this step's findings came from the owner looking at the counter stand and
saying two things: that its anatomy demo is a checkbox carrying a counter rather
than a counter, and that the checkbox in it does not work. Both were right, and the
second one had a bigger cause behind it.

**Measured:** 201 checkboxes - `.fopt` 200 in the filter panel, `.optin` 1 in the
sign-up dialog. There is no `<input>` behind either; the markup is built by
`wireframes/_nav.js:1780` and `design/_nav.js` gives it role, tab stop,
`aria-checked` and Space (7.34).

### The atom was being overwritten by a molecule

filter-group.css - level 2 - wrote `.fopt .cb, .optin .cb` and
`.fopt .cb.on::after, .optin .cb.on::after`. **It reached past its own component
and restyled the atom's class by name.** So every declaration checkbox.css made
about the square was dead: its 18px, its `--line-strong` border and its tick
rendered nowhere, on either name.

### And the tick had two editions, of which one ever drew

| | tick | colour | placement | rendered |
|---|---|---|---|---|
| checkbox.css | a typed `✓`, 12px | `--text-oninverse` | `top:-2 left:3`, by eye | **never** |
| filter-group.css | drawn: 5x9, borders 0/2/2/0, turned 45° | `--line-onink` | `translate(-50%,-58%)` | always |

Same family as the availability dot at 7.35 and the badge's star at 7.37, and here
both existed at once. The drawn one wins **by file order**, which is not a decision -
though it is the right one on the merits: a typed `✓` is read aloud, cannot take a
stroke weight, and lands where the font puts it rather than where the box wants it.

filter-group.css also carried a **third** dead edition in its structure block: a 15px
box with a `--mark-faint` border and its own typed `✓`, all three overridden by the
same file's colour block twelve lines down.

### The rule

checkbox.css (81 -> 125 lines) owns the control: two row rungs, the box, the drawn
tick, hover, press and the focus ring. filter-group.css keeps the option's place in
the group (`margin-top: 12`) and the counter's place in the option
(`margin-left: auto`). `.optin`'s margins went to auth-dialog.css, where the dialog
that spaces it lives.

**Two rungs, and they are a real difference rather than drift.** A filter option is
one line, so its box sits on the centre line with 8px of gap; a consent is a
paragraph that wraps, so its box sits on the FIRST line with 12. Hover now reaches
the label on both - `.fopt` had it, `.optin` never did, 200 against 1.

### A/B

**108 994 elements, 40 pages x 2 viewports, cache cleared between passes: 0 changes
on all 201 checkboxes.** The only four differences in the whole sweep are the auth
and checkout spinners' rotation angle, sampled a frame apart.

Pixel-for-pixel identical is the right outcome here: the defect was never that
something looked wrong, it was that the system said three things and drew one.

### The counter stand

Its anatomy showed a `.fopt` row - a checkbox that happens to carry a counter - and
showed it dead, because the page never loaded `design/_nav.js`. The anatomy is a
counter now (`.lh1 .cnt`), the filter option kept its place in the five-places grid
where it is labelled as what it is, and the page loads the product's own behaviour so
that control is live: measured `role=checkbox tabindex=0 aria-checked=false`.

---

## Step 7.39 - breadcrumbs, and a separator that was never an atom

### separator.css is deleted

One rule - `.crumb .sep{ color; margin }` - a **level-1 component scoped to a
level-2 one**. The same shape availability.css had before 7.35 and price.css before
7.36, in its smallest possible form.

Measured before deleting: **47 separators in the coloured markup, 0 of them outside a
`.crumb`.** A mark that cannot exist without its parent is part of its parent.

The kit registry loses an atom and gains its first molecule, which is the honest
count: **atoms 22/22 -> 21/21, molecules 0/27 -> 1/27.** `separator.html` is gone and
`breadcrumb.html` is built - the registry had been carrying a `done: false` row for
it since Крок 4.

### The slash was typed 47 times

`<span class="sep">/</span>`, once per gap, across 22 coloured screens - the same
defect as the 107 `●` at 7.35. Drawn from CSS now, one place, one value. The grey
layer keeps its 211: frozen since stage 05.

### The states

The owner asked for hover and an inactive state. **Hover already existed and was
right** - the word goes accent over .15s, the same line every link in the system
takes. **There is no inactive crumb**, confirmed against all 14: every crumb but the
last is a link, and a level that cannot be reached would not be in the trail. What
was actually missing:

- **A focus ring.** 14 crumbs, every one a live link, and not one showed anything to
  a keyboard - Chrome's own outline does not appear either, because base.css sets
  `outline: none` on links. `--ring-focus-control`, `:focus-visible`, the same ring
  the button, field, chip, radio and checkbox take.
- **`aria-current="page"` on the last crumb.** It is a `<span>`, so nothing told a
  screen reader which of the three is the page the person is standing on.
- **`aria-hidden` on the separator.** A reader was saying «Головна слеш Протеїн слеш
  Whey».

Both attributes are set by `uivCrumbs()` in `design/_nav.js`, because the markup is
built by the frozen grey layer - the same mechanism `uivCheckboxes()` and
`uivDisclosures()` use.

**No press state, and that is 7.33's refusal repeated rather than forgotten:** 601
text links in this product have no ground to darken, and giving this one a tint would
make it the only link in the system that flashes.

### Found, not fixed

- **No behaviour for a long name at 360** - «Whey Gold Standard 100% Protein» wraps
  the crumb to two lines and there is no rule about it.
- **`.cur` shares its name** with the current page marker in the prototype's own
  state bar (`.wf-bar .cur`). No live collision - the selector is scoped to
  `.crumb` - but the name is shared. Крок 6.
- **No schema.org BreadcrumbList.** Breadcrumbs are the most direct hierarchy signal
  a search engine gets, and there is no markup for it yet.

---

## Step 7.40 - the literal font stacks, and two things a shorthand was hiding

The open item said «four `'Inter', sans-serif` literals left». **The real count was
nine, in four files**, and I had counted only the ones that said Inter - the mono and
Oswald stacks were written the same way and never got counted. Corrected here.

| file | what was written |
|---|---|
| buy-box.css | `'Inter', sans-serif` · `font: 700 11.5px/1 'Inter', sans-serif` · `'IBM Plex Mono', ui-monospace, monospace` · `font: 700 11.5px/1 'IBM Plex Mono', …` · `font: 400 13px/1.55 'Inter', sans-serif` |
| loyalty-rung.css | `'Inter', sans-serif` x2 |
| review-item.css | `'Oswald', sans-serif` |
| cert-thumb.css | `font: 600 10px/1 'IBM Plex Mono', …` |

**The literal is not the token.** `'Inter', sans-serif` is Inter and then nothing;
`--font-body` is Inter plus `-apple-system`, `BlinkMacSystemFont`, `system-ui`. The
difference only shows when Inter has not loaded - which is exactly the moment a
loyalty rung or a price note has to stay legible - and until then the two look
identical, which is why five of these survived four consolidation steps.

### The `font:` shorthand is what hid them, and it hid two more things

Five of the nine were inside `font: <weight> <size>/<leading> <stack>`. A shorthand
names four properties at once and **resets every font property it does not name**, so
a stack written inside it does not look like a stack to anything scanning for one.
Split into longhand, and each one gave something up:

**1. A leading step 5.6 had deleted.** `.coachbox .cbnote` carried `/1.55`. 1.55 is
the base rhythm this system HAD before step 5.6 moved it to 1.6 and said so out loud
- «three leadings, and 1.55 to 1.6 deliberately this time, because air is calmer».
That sweep replaced every `line-height` it could see. It could not see this one:
inside `font:` a leading is a slash and a number, not a property. Measured: 20.15px ->
20.8px on one note.

**Checked afterwards: there is no leading left in the component layer outside the
three tokens** - the only two other values are `line-height: 0` on the icon wrapper,
which is correct, because an icon box must not carry a text line box.

**2. `font-variant-numeric` switched off on a figure.** `.coachbox .cbsave` is the
coach's saving, set in `--font-mono` inside a block that asks for tabular figures -
and the shorthand was resetting it to `normal` on every render. Splitting it restored
what its own family is there for. Measured: `tab=normal -> tabular-nums`.

### A/B

**108 994 elements, 40 pages x 2 viewports, cache cleared between passes: 174
differences, and nothing unexpected.**

- **156** are the fallback stack gaining its system faces, every one of them an
  inherited consequence - `.rn` `.rs` and their svg children, `.dpp.free`, `.cbh`,
  `.cbtier`, `.cbnote`. **The rendered face does not change**: Inter is loaded and is
  still first. What changed is where the browser lands if it is not.
- **2** are `.cbsave` gaining tabular figures.
- **16** are the 1.55 -> 1.6 leading and its knock-on: `.coachbox` grows 1.95px at
  390 and 1.3px at 1280, which propagates to the page height. One element, one
  screen.

**40 screens at 360: 0 overflow, 0 JS errors. All 35 stands: idle check passed.**

### NOT done, and this is the important part of the step

The sweep also matched **every literal `px` in the component layer against every
token value**, and reported 120-odd "matches". Almost all of them are **coincidences
of value, not semantic matches**: `width: 18px` on an svg matching `--fs-18`, a 4px
bar height matching `--space-4`, a 12px offset matching `--fs-12`. Replacing those
would give an icon its width from a font-size token, which is worse than a literal -
it reads as a decision nobody made. The project's own rule says a value changes only
by a decision said out loud as «variable -> value -> why», never as a side effect of
a refactor. So: measured, not replaced.

### Found, not fixed

**The type scale is missing both of its ends.** Eleven font sizes in the component
layer are not a rung of it, and they are not scattered noise - they are two clusters:

| above the top rung (34) | 38 x2 (`.acc-h1`, `.hpromo .hph`) · 50 (`.rvbig .n`) · 60 (`.sys-code`) · 36 (`.bb .new`) |
| below or between the bottom rungs | 8 x2 (`.oh-thumbs i`, `.cshelf .cs-th`) · 8.5 (list-card badge) · 11.5 x2 (coachbox) · 13 (coach note) |

The scale runs 10, 12, 14, 16, 18, 20, 24, 30, 34 - nine rungs that cover text and
stop where display type begins. Five display sizes and six sub-10 marks live outside
it. Adding rungs is a values decision with an owner, so it is reported to stage 09
rather than invented here.

---

## Step 7.41: the audit of the foundations and the atoms

Not a component step. The atom list is finished at 21/21, so this walks the whole
level-1 layer and the two files under it - `tokens.css` and `base.css` - against the
40 coloured screens, in both directions: is everything the system declares actually
rendered, and is everything rendered actually declared.

**Two instruments, sets taken independently.** Claude: a source sweep plus a browser
census (7 512 atom-class instances, 39 screens x 2 viewports). Codex: read-only,
stated explicitly, given the same scope and told to report only what is falsifiable
in the source. Merged afterwards. Every finding below carries who found it.

### The measurement lesson, first, because it voided a whole pass

**The first census was measured against a stale browser cache and every conclusion
from it was wrong.** It reported that `badge.css` parsed 1 rule instead of 5 and that
`counter.css`'s own `.ct, .cnt` rule was absent from the cascade - which read as a
catastrophic parse failure and was in fact Chrome serving pre-7.37 copies of two
files. With `Network.clearBrowserCache` + `setCacheDisabled` the badge renders exactly
what its atom declares: 10/800, uppercase, `--ls-caps`, pill, ink ground, white label,
4/12 padding.

The project already has this rule and it is written down for A/B. It is now written
down for **any** browser census: a measurement taken over a cache is a measurement of
the cache. Everything below was re-taken clean.

### Found

**1. A rule the parser drops, and the stacked action has no hover.**
`stack-action.css:116-119`. Found by BOTH instruments independently: Claude by the
stylesheet balance check (16 `*/` against 15 `/*`), Codex by reading the bytes.

A comment closes at line 116, two lines of prose keep going, and line 118 ends them
with a second `*/`. The parser takes everything from the prose to the next brace as
one selector, so the rule after it is discarded:

```
   ...loads later - checked in the browser, not counted on paper. */   <- closes here
   The caret inside «Кабінет ▾» comes along without a word from anyone: it is
   `currentColor` inside the caption, so it follows what the caption follows. */
.btn--stack:hover .lbl, .btn--stack:hover .tl{ color: inherit; }       <- never parsed
```

Proved in the browser rather than on paper: the file has **12 rule bodies on disk and
the CSSOM holds 11**, and the winning-rule solver for `.wfh-act.stack .lbl` returns
**an empty list of hover rules**. The caption of every stacked action - the header's
account and cart buttons, and the phone's five tab captions on 34 screens - does not
answer the cursor. Same defect class as `price.css` at 7.36, and my own balance check
at 7.40 called this one «harmless». It was not.

**2. The list card's heart has no hover, the grid card's does.**
Found by Codex, verified by Claude against the parsed CSSOM.

Two things at once, which is why it survived. The grid heart is
`class="btn--text btn--icon fav"` and reaches `.btn--icon.btn--text:hover` (0,3,0);
the list heart is `class="btn--text lfav"` with **no `.btn--icon`**, so the only
hover rule it can reach is `.btn--text:hover` (0,2,0) - and `product-card.css:69`
sets `.pcard-l .lfav:not(.on){ color: var(--text-secondary) }` at (0,3,0), which
beats it at rest. Solver output: grid `hoverWins: true`, list `hoverWins: false`.
One control, two cards, one of them acknowledges the cursor.

**3. One cart counter, three renderings.**
Claude, in the browser. The same number lives twice in the header markup and takes a
different face from each parent, plus a third face where neither parent matches:

| where | selector | ground | label | visible |
|---|---|---|---|---|
| phone icon row | `.wfh-mi .hb` | `--bg-inverse` | white | to 859 |
| desktop stacked action | `.btn--stack .g .hb` | `--bg-action` | ink | from 860 |
| desktop number button | `.wfh-act.numbtn .g .hb` | none | ink, 14px | cart.html |

Both of the first two carry the literal «6» on `account-addresses.html` at the same
moment; which one a person sees is decided by the width of their screen. The third is
not a badge at all: `.numbtn` is `.btn--outline`, so `.btn--stack .hb` does not match
it and `.wfh-mi .hb` does not either, and the count renders as bare text.
`header.css:147` says the menu badge stays because it is «a different placement» -
the placement is `top:-6px; right:-4px` in both files. What differs is the colour.

**4. The bonus ledger loses a column at 360, silently.**
Claude, in the browser. `account-loyalty.html`: `.led-wrap` is 313 wide and carries
`overflow-x: hidden`; `table.led` measures 411 (116 + 121 + 87 + 87). «Баланс» is
clipped and there is no way to reach it - `hidden`, not `auto`, so the page does not
even scroll. The one screen of 39 that overflows at 360. Out of this step's scope
(the ledger is an organism), reported rather than fixed.

**5. `--size-62` is declared and nothing reads it.**
Claude. `tokens.css:269`, zero `var()` readers anywhere in the repo. It was minted at
step 6.1 from the measured button clusters (34 / 44 / 52 / 62) and superseded at 6.7,
whose own comment says «64 and not the 62 above», and then left standing. The scale's
own rule, four lines further down the same file: a step that cannot be named cannot
be used by accident, and that is the only thing that keeps a scale a scale.

**6. `--text-price-was` is declared and nothing reads it.** Both instruments.
Known since 7.36, deliberate, waiting on stage 09 for a said-out-loud removal.

**7. Ten class names now carry two meanings.** Claude, from the census.
The six already on the Крок 6 list - `.tag`, `.ct`, `.cur`, `.cut`, `.new`, `.old` -
plus four the census added, each proved by two fingerprints that share no property:

> Corrected at 7.42. This list first said eleven and opened with `.hb`, on the
> strength of a 14/700 fingerprint with no pill. Chasing it down for the fix showed
> that element is the SAME counter in a parent no rule reached, not a second
> meaning. `.hb` is finding 3, not finding 7, and the rename list is ten.

| name | one meaning | the other |
|---|---|---|
| `.x` | the dialog close, 20px ghost button | a 12/800 muted glyph |
| `.tl` | the stacked caption, 12/600 | the checkout total label, 16/800 |
| `.s` | the short skeleton bar | 14px secondary text on `product-coach` |
| `.lbl` | the stacked caption, 12/600 secondary | a 14/700 ink form label |

**8. `.addr-tag` is accent ink at 10px, and it is not in the recorded list.**
Claude. `DESIGN-artifacts.md:66` records the 2026-08-07 measurement of accent text
under 19px and names five controls kept knowingly. Measured on its real ground here:
`#FF5A00` on `#FFFFFF`, 10px/800, **3.13:1** - the smallest accent text in the
product, and a sixth control the record does not mention.

**9. The chevron has no size of its own.** Claude. `.chev` renders five ways; the
16 instances of `.chev.uiv-ic.uiv-trail` come out **Oswald 18px** because
`.uiv-ic svg{ width: 1em }` and the mark is sitting inside display type. An icon
sized only by inheritance follows whatever face it lands in.

**10. `.pf-val` has four editions on one screen.** Claude. `account-profile.html`:
mono 16/700 ink, Inter 16/600 secondary, Inter 16/700 ink, Inter 14/700 ink. One
field value, four looks, one page.

**11. `.chip` has zero instances in the coloured markup.** Claude. The atom file is
named for a class the product never writes; what it actually dresses are `.flink`,
`.dr-chip`, `.mgchip` and `.afilter`.

### Withdrawn on verification, with the reason

- **`badge.css` and `counter.css` are not in the cascade** - Claude. The stale cache
  above. Both parse and both win where they should.
- **`.skpulse` is declared twice with contradictory values** - Claude. It is the
  `prefers-reduced-motion` pair; the rule parser used for the sweep stripped `@media`
  wrappers and flattened them into one scope.
- **`--fs-11` and `--space-20` are read and never declared** - Claude. Both occur
  inside prose and an HTML comment in `design/kit/button.html`, not in a live `var()`.
- **`--dr-top`, `--shelf-h`, `--shelf-top`, `--uiv-side-h` are read and never
  declared** - Claude. Each is published at runtime by `_nav.js` and each `var()` in
  the source carries a fallback.
- **`--scrim-white-70` is dead** - Codex. It has exactly one reader,
  `design/_stand.css:124`, which is outside `design/system` where Codex searched. Not
  dead; but its only reader is the stand's own chrome and not the product.
- **`.afilters .clear` is split across two atom files** - Codex. True and deliberate,
  argued at `chip.css:261-263`: the ink, the weight and the underline belong to the
  link atom, the size belongs to the row it stands in. The same shape as the price's
  size-per-surface rule from 7.36.

### Clean

- **73 files on disk, 73 imported by `index.css`.** No orphan, nothing missing,
  21 / 27 / 25 by level.
- **195 tokens declared, none declared twice.** Twelve groups of roles share one
  primitive and every group is argued in the file as one value doing two jobs.
- **0 JavaScript errors** across 78 page loads.
- **39 of 40 screens clean at 360**, the exception being finding 4.
- **The accent gate holds where it was measured.** 115 instances of `#FF5A00` on text
  below 19px bold; **79 of them are the `₴` mark**, which is `.55em` of a figure that
  clears the gate itself. The independent strings are the set already recorded on
  2026-08-07 as an owner's call, plus finding 8.
- **The price, the discount chip, the badge, the pill, the counter, the checkbox and
  the breadcrumb all render what their atom declares**, re-verified after the cache
  was cleared. Availability keeps its four states, the pill its three, the checkbox
  its two.

### Nothing was changed

This step measures. Findings 1, 2 and 3 each move pixels on screens a person uses, so
each is a step of its own with its own declaration and its own A/B, not a side effect
of an audit.

---

## Step 7.42: three defects the audit found, and the measurement that had to be fixed first

Findings 1, 2 and 3 of step 7.41. Nothing else from that list is touched: the two
dead tokens and the type scale are values decisions for stage 09, the ten names are
Крок 6 by rule, and the loyalty ledger's clipped column is an organism.

### The A/B had to be repaired before it could say anything

The first pass came back with **282 differences** and a long tail of one-pixel box
changes on elements this step never named: an `h2` doubling its height on
`overview.html`, `.wfh-logo` growing 8px, `.seolink` losing a pixel of line box. The
second, with `document.fonts.ready` awaited, came back with **260** - a different
tail on a different page.

That tail is the webfonts. The cache is cleared between passes for correctness, so
Google Fonts is re-fetched each time, and whether Oswald has swapped in by the time
the measurement runs is a race. So the pass was run **three times: HEAD, HEAD again,
then the working tree** - and the first two give the noise floor:

| | differences |
|---|---|
| HEAD vs HEAD, identical procedure | **1** (`.co-spin`, the running spinner) |
| HEAD vs working tree | **176** |

**A number without a null run is not a measurement.** Both are now part of the pass:
`document.fonts.ready` before reading, and HEAD against itself before HEAD against
the change. 108 994 elements, 40 pages x 2 viewports.

### The 176, and they are two elements

- **`SPAN.g` x136** - `position: static -> relative` on the number button's glyph,
  and the `top`/`right`/box readings that follow from it. Nothing visible: it is the
  corner the badge now hangs on.
- **`SPAN.hb` x38** - the counter badge taking one face. Ground `#1C1C1C -> #FF5A00`,
  label `#FFFFFF -> #1C1C1C`, and on the number button a bare `9x18` run of text
  becoming a `15x15` pill.
- **2** are `.auth-spin` and `.co-spin`, which are inside the noise floor.

**Zero differences anywhere else.** The header does not move: `.wfh-actions` measures
433x44 and `.numbtn` 124x44 on both sides, because the glyph was already a fixed
18x18 box and the count never contributed width to it.

### Hover is not a resting state, so the A/B cannot see findings 1 and 2

`page.hover` does not raise `:hover` in this headless context - `el.matches(':hover')`
returned false on a control that demonstrably has the state. So both were verified
the way 7.41 found them: a solver that walks the parsed CSSOM, collects every rule
matching the element with the state pseudo stripped, and ranks them by specificity
and order. Run against both ports:

| | HEAD | working tree |
|---|---|---|
| `.wfh-act.stack .lbl` | no hover rule exists | `.btn--stack:hover .lbl` (0,3,0) -> `inherit`, **wins** |
| `.wf-tab .tl` | no hover rule exists | rule exists, resolves to `inherit`, and `.wf-tab` declares no hover ink, so the computed colour does not move |
| `.wf-tab[aria-current] .tl` | `tabbar.css` (0,3,0) wins | `tabbar.css` still wins on order, ink-800 kept |
| `.pcard-l .lfav` | `.btn--text:hover` (0,2,0), **loses** to the rest rule (0,3,0) | `.pcard-l .lfav:not(.on):hover` (0,4,0), **wins** |

The tab bar behaving in three different ways there is not three decisions - it is one
rule, `inherit`, read against three grounds. That is what the block in
stack-action.css claimed in prose for two steps while the rule it described was not
in the cascade.

### What each fix was

**1. `stack-action.css`: one comment closer deleted.** The paragraph closed itself
four lines early, the two lines after it stood in open code, and the closer below
them was a stray - so the parser swallowed the selector of the next rule. Twelve rule
bodies on disk, eleven in the browser. Writing the note about it fell into the same
trap once: a closer typed inside a comment ends the comment, so a file cannot quote
one while explaining it. **All 78 stylesheets now balance, which they had not done
since before this stage.**

**2. `product-card.css`: the state that was left behind when the rest was copied.**
button.css states the quiet ink and its hover on two adjacent lines; this surface
carried the first and not the second. One line added at (0,4,0), beside the line that
caused it. **The press is refused and the refusal is written into the file**: 7.33
gave icon buttons a pressed ground because they have a 40px box, and this heart
deliberately has none.

**3. The counter badge: the face keyed on the class, the placement left with each
parent.** Four parents, three faces, and on a phone two of them were on screen at
once carrying the same number. The accent pill is what stays, and the ground is the
argument: `.wfh` measures `#FFFFFF`, so the ink edition was a dark mark on a light
bar wearing a white ring minted to cut marks out of dark ones. `header.css` keeps
where the badge hangs and gains the two lines the number button needed - a
positioning context on its glyph, and a corner.

### After

**39 screens at 360: no element escapes the viewport. 0 JavaScript errors** across
78 page loads and all 23 stands. The `stack-action` stand renders `.hb` and
`.tbadge` at 15x15 on `--bg-action`, which is now one rule instead of three.

Unchanged and still open from 7.41: the ledger column clipped at 360 (finding 4), the
two dead tokens (5, 6), the ten names (7), `.addr-tag` at 3.13:1 (8), the chevron
with no size of its own (9), `.pf-val`'s four editions (10) and `.chip` with no
instances (11).

---

## Step 7.43: the card that was two cards

The first molecule after the breadcrumb, and the one every atom step kept walking
into: 7.36 left the price's owner rule here, 7.36b the discount chip's 10px, 7.37 a
badge that went white when the atom took over, 7.42 the list heart's hover. Four
steps patched the line they tripped over. This one looks at the card.

**198 of them on 17 of 39 coloured screens** - 184 grid and 14 list - which makes it
the most repeated surface in the product after the price itself.

### The rule

**Two variants of one card are one component with one anatomy.** A part that does
the same job in both takes the same face and the same states. What may differ is
density and layout, and only where the surface argues for it.

### Found

**1. A selector that matched nothing, and it was a state.**
`.pcard-l .nm` - a list card's title is `.lnm`. Measured over 23 screens x 3 widths:
**zero elements**, on both lines, the transition and the hover. So the accent on
hover was a grid-card behaviour the file believed it had given to both, and the
largest word in a list row - the thing a finger aims at - did not answer the cursor.

Third instance this stage of one shape: **a rule written for two names where only
one of them exists.** The list heart at 7.42, the counter's parents at 7.42, the
title here. All three were found by asking the browser which selectors match
nothing, and none of them by reading the file.

**2. The two cards answered the cursor with two different sentences.**

| under the cursor | grid | list, before | list, now |
|---|---|---|---|
| edge | `--line-action` | `--line-strong` | `--line-action` |
| title | `--text-action` | nothing (dead selector) | `--text-action` |
| shadow | 1 -> 2 | none -> 2 | unchanged |
| lift | `translateY(-3px)` | none | none, and it is a refusal |
| photograph | 80% -> 86% | does not move | does not move |

The edge is the card's own «this one», and the system has exactly one colour for
that. **The other three stay**, and each is the surface arguing rather than drift: a
column of raised strips reads as a broken list rather than as depth, fourteen
resting shadows in a row is noise, and an 84px thumbnail has nowhere to swell into.

**3. `--text-brandline` existed for this line and the grid card was not taking it.**
The grid read `--text-muted`, the list read the role - while the token's own comment
in tokens.css names `.pcard .pbrand` as one of its seven readers, which was not
true. Same `--warm-600` today, so nothing moves; what changes is that the brand line
can go its own way later without dragging every tertiary caption with it, which is
the only reason a second name for one value is worth having.

**4. Two declarations that were dead the day they were written.** `.pcard.dim .ph{
opacity: .5 }` written twice, and `.pcard-l .lnm{ color: var(--text-body) }` written
twice - same property, same value, one file. And `.pcard:hover` was two halves in
two places with the whole colour block between them; it is one rule now.

**5. `.pcard-l .fav .uiv-ic` and its svg matched nothing** - the list heart is
`.lfav`. Both were in a selector list beside the name that does exist, so the file
had been describing a control that is not there.

**6. `.packlabel` was not a card, and the stand's idle check is what said so.**
Two of this file's 33 classes could not be rendered in a card demo because they are
not a card: `.packlabel` is the `<figure>` around the pack shot on the PDP. It
renders on `product.html` and `product-coach.html`, **0 times inside a `.pcard`**,
and the 38 rules for everything INSIDE it were already in spec-table.css. The
wrapper has gone there too. Values untouched: measured after the move, the figure
still reads `16px 0 0` and its caption 12px `--text-muted` at `margin-top: 8`.

This is what the idle check was built for and the first time it has moved a class
between files. Same family as `.gnote` at 7.37 and `.sep` at 7.39.

### A/B

**163 491 elements, 40 pages x THREE viewports (390 / 620 / 1280)** - the third
width added because the card has two breakpoints of its own, 620 for the grid and
560 for the list, and a two-width pass never looks between them.

| | differences |
|---|---|
| HEAD vs HEAD, identical procedure | **33** - every one `.skpulse` opacity mid-breath, plus the two spinners |
| HEAD vs working tree | **57** |

The noise floor grew because `opacity` joined the compared properties and the
skeleton's pulse is a running animation. Subtracting it: **21 real differences, all
of them `A.lnm` gaining `transition-property: color` where it had the initial
`all`** - the list title's transition arriving. Seven cards x three widths.

Everything else in the step is a hover state, a same-value role swap or dead code,
so **the A/B seeing nothing else is the result, not the absence of one.** The hover
work was verified with the CSSOM solver against both ports instead:

| | HEAD | working tree |
|---|---|---|
| `.pcard-l .lnm` colour | hover **NONE** | `--text-action` |
| `.pcard-l` edge | `--line-strong` | `--line-action` |
| `.pcard .nm`, `.pcard` | unchanged | unchanged |
| `.pcard .pbrand` | `--text-muted` | `--text-brandline` |
| selectors in the file | 58 | **53** |

### The stand

`design/kit/product-card.html`, the showcase's **second molecule**. Built on the
card markup copied line for line out of `listing.html` and `listing-list.html`, and
it loads `design/_nav.js` so the badge, the cart glyph and the photograph arrive the
way they do on a screen rather than being drawn by the page.

Three demos - grid, list, and a `.dim` card that is out of stock - and the idle
check passes: **all 32 classes rendered, 3 states named.** 360: no overflow, 0 JS
errors. All 24 stands still pass their own check.

Registry and hub updated: molecules **2 / 27**.

### Found, not fixed

**The badge's face is derived from its Ukrainian wording at runtime.**
`design/_nav.js:444` reads the text of `.pcard .ph .tag` and adds `tag-pop` or
`tag-new` by regex - `/нов/` and `/попул|хіт|хит|бестсел/`. In the markup **all 26
badges are bare**: `<span class="tag">`. Two consequences, both measured: without
JavaScript all 26 render as unstyled text pinned to the corner of a photograph,
because the card gives them `position: absolute` and nothing else; and a new word
that the regex does not know - «Вибір покупців» - silently loses its pill. An
interface string is deciding a visual state, and this project separates those two
layers on purpose: strings belong to `voice/docs/microcopy.md`, and what a thing
looks like belongs to the component. Writing the kind into the markup is a sweep
across six screens, which is Крок 6's shape rather than this step's.

Still open on this component: the list badge's 8.5px (the last off-scale size in the
file), no rule for how many badges a card may carry, and `.nm` and `.tag` each
carrying two meanings in the product.

---

## Step 7.44: the banner, which is the home page's stylesheet

Third molecule. The card gave it a yardstick for «grid against list»; what the
banner gave back is that the card is the odd one out on something else entirely.

### The census

**banner.css holds SIX unrelated blocks and every one of them renders on exactly
four screens** - `home-buyer`, `home-cart`, `home-coach`, `index` - which are one
screen in four states. Measured at 390, 720 and 1280 across all 39 coloured
screens; nothing here appears anywhere else.

| block | per screen | what it is |
|---|---|---|
| `.hbanners` `.hslider` `.hpromo` `.hdots` | 1 · 1 · **3** · 1 | the promo slider |
| `.hdeal` | 1 | a deal card |
| `.pstrip` | 1 | the «sign in» strip |
| `.tbanners` `.tbn` | 1 · **5** | five trust banners |
| `.promo` | 1 | a wide block under a photo veil |
| `.tband` | **0** in colour | live in the grey layer, see below |

This is not a component, it is the home page's stylesheet. **Splitting it into six
is not this step's**: the registry, the showcase and the molecule count all key off
the file name, and folding the deal's names into the card's is a markup sweep. Both
are Крок 6. What this step does is stop the file lying about what it holds, and take
the facts that are wrong rather than merely crowded.

### The deal is a third product card

Its parts map onto `.pcard` one for one - badge, photograph, brand, name,
availability, price, meta, action - and **the atoms already know**: 7.35 took its
availability, 7.36 its price and 7.36b its chip, each by adding an `hd-` name to an
atom's selector list.

**The molecule did not know.** Its brand line was still reading `--text-muted` a day
after 7.43 gave the grid card `--text-brandline` for the same line, while the
token's own comment names three readers and only the list card was taking it. All
three take it now. Same value, no pixels.

Said out loud and not done: the product's name here is set in the display face,
Oswald 20/600, where both cards set it in the body face at Inter 16/600. One string,
one job, three faces. That is a typography decision with an owner in stage 09.

### The lift was -2 everywhere and -3 on the card alone

Read out of the parsed CSSOM across the whole system:

| lift | who |
|---|---|
| -1px | `.btn--lift`, `.pm-stars .pmst` |
| **-2px** | `.hpromo`, `.hdeal`, `.tbanners .tbn`, `.blogcard`, `.certthumb`, `.gal .gthumb`, `.gtile`, `.hvert`, `.tsx .uiv-ic` - **nine surfaces in eight files** |
| **-3px** | `.pcard` - **one** |

Step 6.0 turned the DEPTH under the cursor into a scale for exactly this reason. The
lift answers the same question - «this is the one you are on» - and stayed one value
plus one exception. Variable: how far a surface rises under the cursor. Value:
**-2px**. Why: nine against one is not a decision about cards, it is the sweep that
never happened. `.pcard` is -2 now.

### Three dead selectors gone, and two findings withdrawn

`.pstrip .thumbs` and `.pstrip .thumb`: counted every `.pstrip` in the repository -
eight, four coloured and four grey - and **not one contains a thumbnail**. The strip
is a sentence, a spacer and a button. `_wf.css` carries the same two dead rules and
keeps them: it is frozen.

`.hdeal .hd-meta b`: `.hd-meta` is a span carrying «18 ₴ / порція · +13 ₴ бонус» as
plain text in both layers. There is no `<b>` in it and never was.

**Withdrawn: `.tband` is not dead.** The census said 0 instances and that is true of
the coloured layer only - it is live in `wireframes/coach-landing.html` with its
structure in `_wf.css`, and what is here is the colour half waiting for a coloured
twin. The coach flow is 102 of the 142 grey screens that do not have one yet.
Deleting it now would mean re-deriving it from the grey layer at Крок 6. Kept, with
the reason in the file. **The stand renders the first coloured `.tband` there is.**

**Withdrawn: the 38px is not this file's.** The declaration for this step listed
`.hpromo .hph` at 38 as the banner's off-scale size. Building the stand showed
otherwise: `banner.css` gives the slide's heading `--fs-24`, and the literal `38px`
comes from `hero.css:26`. Which leads to the real finding.

### An organism paints a molecule by position

```
/* hero.css - level 3 */
.hstrip > .hpromo:nth-child(1){ background:var(--bg-inverse); border-color:var(--line-inverse); }
.hstrip > .hpromo:nth-child(1) .hph{ color:var(--text-oninverse); font-size:38px; }
```

Measured on `index.html`: slide 1 is ink-ground with a **38px white** heading and an
accent eyebrow; slides 2 and 3 are white with a photograph and a **24px ink**
heading. **The face of a slide is decided by its place in the strip, not by its
markup.** Swap the slides and a different one goes dark.

Same shape as the checkbox at 7.38, one level up: there a molecule restyled an
atom's class by name, here an organism restyles a molecule's parts by position. Not
fixed here - whether this is a `.hpromo--lead` variant or two different components
is stage 09's call, and the stand shows both faces side by side so the question is
in front of whoever makes it.

### A/B

**163 491 elements, 40 pages x 3 viewports**, run three times.

| | differences |
|---|---|
| HEAD vs HEAD | **1** (`.auth-spin`) |
| HEAD vs working tree | **3** - and all three are `.co-spin` and `.auth-spin` |

**Zero real differences.** Every change in the step is a hover state, a same-value
role swap or dead code, which is what was declared before the edits were made.

### The stand

`design/kit/banner.html`, the showcase's **third molecule**. Built on markup copied
line for line out of `index.html`, and it shows the slide **twice**: alone, which is
the face `banner.css` declares, and inside `.hstrip`, which is the face `hero.css`
gives it. Seven demos in all, including the first coloured `.tband` in the product.

Idle check passes: **all 30 classes rendered, 3 states named.** 360: no overflow, 0
JS errors. All 25 stands pass. Molecules **3 / 27**.

### Found, not fixed

- **Three eyebrow / heading / subline stacks with nothing in common but the display
  face.** Eyebrows: Mono 12/500 on the slide against Oswald 20/700 on the deal.
  Headings: 38 / 30 / 24 / 20. Sublines: two at 14/400 with **different leadings**,
  one of which declares none and inherits 1.6 from `body`.
- **Five surfaces, two radii, three shadows, no rule**: `.hpromo` 16/shadow,
  `.hdeal` 16/shadow, `.tbn` **12**/shadow, `.promo` 16/**none**, `.pstrip`
  **12**/**none**.
- **The two figures in `.hd-meta` are unmarked** - «18 ₴ / порція · +13 ₴ бонус»
  runs as plain text, where the card gives the same two values a `<b>` and the mono
  face. A question for the markup and the IA, not a line of CSS.

---

## Step 7.45: the cart row, and the set of five closes

Fourth molecule, and the smallest taken so far: 30 selectors, **six rows on two
screens** (`cart`, `cart-oos`). Its value is not its size - it is that the row is
where «one product under several names» finally becomes countable.

### One product, five sets of names

| role | grid | list | deal | cart | checkout |
|---|---|---|---|---|---|
| photograph | `.ph` | `.lph` | `.hd-ph` | `.ci-ph` | `.li-img` |
| brand | `.pbrand` | `.lbrand` | `.hd-brand` | `.ci-brand` | - |
| name | `.nm` | `.lnm` | `.hd-nm` | `.ci-nm` | `.li-nm` |
| price | `.pnew` | `.lprice` | `.hd-new` | `.ci-sum` | `.li-sum` |
| struck price | `.pold` | `.lold` | `.hd-old` | `.ci-old` | `.li-old` |

**The atoms already merged this.** One selector list in price.css names all sixteen
price names, discount.css all eight chip names, availability.css all four. What
diverges is the molecules, each in its own file.

**And the cart and the checkout already agree on the numbers**: the name is 14/600
`--text-body` in both, the price 20px `--text-body` `--lh-snug` in both. Two files,
two name sets, the same values. Folding them into one product row is Крок 6.

**Checked and NOT a defect:** the checkout name has no hover where the cart name
does - because `.li-nm` is a `<div>`, not a link. On the checkout the product is not
clicked. That is not a fifth instance of «a rule written for two names», of which
this stage has now found four.

### The brand line, third of three, and the set closes

tokens.css names three readers for `--text-brandline`: `.pcard .pbrand`,
`.ci-brand`, `.hdeal .hd-brand`. Until three steps ago **not one of them took it** -
all three read `--text-muted`, and the only line in the product actually reading the
role was `.pcard-l .lbrand`, which the comment does not mention. 7.43 fixed the
first, 7.44 the second, this is the third. Same `--warm-600`, no pixels; a brand
line is now one decision in four places instead of four.

### The product that is not there: two values became one

| | before | after |
|---|---|---|
| `.ci.oos` photograph + name + price | **.45** | **.5** |
| `.pcard.dim` photograph + price row | .5 | .5 |
| `.pcard-l.dim` photograph + price | .5 | .5 |

One meaning on one kind of surface, two values in two files. Variable: how far a
product that cannot be bought is faded. Value: **.5**. Why: two readers against one,
and nothing distinguishes a dimmed row from a dimmed card. `.oosgal .gmain img`
keeps its .85 and is not in the set - one large photograph on the product page,
muted by blending rather than by fading.

### Two dead selectors

`.ci-lnk.on` and its svg rule: an «on» state for the row's own links with no markup
in **either** layer - not one in `design/`, not one in `wireframes/`, and `_wf.css`
never carried the rule at all. A colour-layer invention that arrived with the split
and never had anything to paint. Unlike `.tband` at 7.44, which is a colour half
waiting for its grey twin, this one has no twin to wait for.

### A/B

**163 491 elements, 40 pages x 3 viewports** (390 / 860 / 1280), run three times.

| | differences |
|---|---|
| HEAD vs HEAD | **36** - every one `.skpulse` opacity mid-breath |
| HEAD vs working tree | **45** |

Subtracting the floor: **9 real differences, all of them `.ci.oos` going .45 -> .5**
- `.ci-ph`, `.ci-nm` and `.ci-price`, three rows on one screen, three viewports.
Exactly what was declared before the edits; the brand role is a same-value swap and
the deleted rules were dead.

### The stand

`design/kit/cart-row.html`, the showcase's **fourth molecule**. Two demos on markup
copied line for line out of `cart.html`: a live row and an `.oos` one. Idle check
passes: **all 17 classes rendered, 3 states named.** 360: no overflow, 0 JS errors.
All 26 stands pass. Molecules **4 / 27**.

The stand also carries the five-name table above, because that is now the through
line of the molecule pass and it belongs where a person can see it rather than only
in this log.

### Found, not fixed

- **The per-serving price in two names and two faces**: `.ci-per` is 12/500 muted
  here, `.perserv` on the card is `--text-secondary` with a `<b>` in the mono face.
  One figure, two typographies - the same class of question as `.hd-meta` at 7.44.
- **No state for «quantity above what is left»** - the counter accepts any number
  and the row says nothing.
- **No rule for what happens to a row after «remove»** - vanish, fade, or stay with
  an undo. A question for the IA and the microcopy, not for CSS.
- **`.ci` still carries two meanings** - an `<article>` in the cart and a `<span>`
  mark in the catalogue overlay. 7.21 separated them BY ELEMENT because the markup
  already says which is which in both layers; the second meaning renders 0 times in
  colour (the overlay is opened by JS). The guard stays. Крок 6 renames.

---

## Step 7.46: the spec table, and a correction to two earlier steps

Fifth molecule. 64 selectors, no dead ones, **two screens** - `product` and
`product-coach` - and it is the most important component in the product by
principle 1: composition, dosage, origin and allergens are how trust is proved
rather than claimed.

### It is not one table. It is three, plus a mock of the pack

| `.ctable` | composition: substance, per serving, % DV |
| `.spectbl` | specs: key and value, zebra |
| `.pl-t` | nutrition facts INSIDE the pack-label mock |
| `.pl-*` + `.packlabel` | a dark packaging panel: its own table, a three-up «how to use», the ingredient list and a footer with the batch |

Same shape as the banner at 7.44: an organism filed under a molecule's name.
Splitting it is Крок 6, for the same reason.

### Three tables, three ways of saying «this cell is a number»

| `.ctable td:nth-child(2), td:nth-child(3)` | **by column index** |
| `.spectbl td b` | **by markup** |
| `.pl-t td:last-child` | **by position** |

Three tables in one file and three different ways to say the same thing. **A
positional selector breaks the moment a column is added**: put «per 100 g» between
the first and the second and the mono face slides onto the substance name. The
markup way does not have that failure. Reconciling them means agreeing on how the
markup is written, so it goes to stage 09 rather than being decided here.

### The correction: tabular-nums does nothing on a monospaced face

**Measured in the browser rather than reasoned.** The string `1111 8888` at 20px:

| IBM Plex Mono | **108px** with `tabular-nums`, **108px** without |
| Inter | **109.13px** with, **87.66px** without |

Every glyph in a monospaced font is the same width by definition, so the property
has nothing to change there.

This corrects two earlier steps. **7.36** wrote that `.hd-old` was «the only struck
price of eight rendering proportional digits» and **7.40** that `.cbsave` «gained
tabular figures». The inconsistency each found was real - one selector in a set
saying something its siblings did not - but **the visible consequence they claimed
was not**. The declarations are harmless; the A/B rows they produced were changes in
computed style with no rendered effect. Neither step's edit is wrong; the reason
given for it was.

**What does change a figure's width is `word-spacing`**, and the system has
**20 selectors in 11 files with four values**: -0.1em, -0.16em, -0.2em, -0.24em.
Inside this file alone, `.ctable`'s figures are kerned -0.24em while `.spectbl td b`
and `.pl-t td:last-child` are not kerned at all. A ladder with no rungs, and a
values decision with an owner in stage 09.

### Two dead pieces, and one class in the wrong file

**An `@media (min-width: 720px)` block was declared twice, byte for byte** - once in
the structure section and once in the colour section, the same four declarations on
`.pl-panel` and the same one on `.pl-foot`. Read out of the CSSOM: two identical
blocks in the style tree.

The surviving one is the LATER one, and not by preference: `.pl-panel`'s base rule
sits between them and sets `gap: var(--space-16)`, so at equal specificity only the
block after it still wins the gap at 720. Deleting the wrong one would have moved
the panel's gutter from 24 to 16. Verified after: gap 24, two columns, `.pl-foot`
still `1 / -1`.

**`.spectbl td{ border-bottom-color: var(--line-hair) }`** restated what the
structure block four rules up already says as `border-bottom: 1px solid
var(--line-hair)`.

**`.dl` / `.dk` / `.dv` went to order-row.css.** They are not a spec table: measured
across 39 coloured screens, **19 instances, every one on `account-orders.html`**
inside `.ob-del < .ob-side < .ob-grid < .ord-body`, and **0 on `product.html`**. A
key over a value - «Спосіб доставки» above «Нова Пошта · відділення» - which takes
the same 12/caps/`--ls-caps` eyebrow the tables' `th` takes, which is why it looked
at home there. What it is not is a column header.

**This is the second time the stand's idle check has moved a class between files**:
7.43 sent `.packlabel` here out of product-card.css, and this step sends the
definition list out. Values untouched both times; order-row.css loads earlier than
this file and nothing else declares `.dl`, so the cascade does not move. Verified
after: 19 rows, key 12px muted uppercase at 0.48px, value 14px ink 600 at
`margin-top: 4` - identical to before.

### A/B

**119 940 elements, 27 pages x 3 viewports** (390 / **720** / 1280 - 720 because
that is the pack panel's own breakpoint), run three times.

| | differences |
|---|---|
| HEAD vs HEAD | **0** |
| HEAD vs working tree | **0** |

Pixel-identical, which is the whole outcome of a step whose every change was dead
code or a move. The loading screens were left out of the page list this time, which
is why the floor is 0 rather than the skeleton pulse's usual 30-odd.

### The stand

`design/kit/spec-table.html`, the showcase's **fifth molecule**. Five demos on
markup copied line for line out of `product.html`, including the whole pack label.
`uivPdp()` cannot run on a stand - its root is `main.wf-page` and a stand is
`main.kp-main` - so the page repeats the two lines it needs from the same source,
`uivWrap()`, declared at `design/_nav.js:81`, rather than pasting the paths.
[corrected at 7.47: this line said `design/system/icons.js`, which does not declare it]

Idle check passes: **all 22 classes rendered, 3 states named.** 360: no overflow, 0
JS errors. All 27 stands pass. Molecules **5 / 27**.

### Withdrawn on verification

**`.pl-hw .pl-ic:empty` is not dead.** Three icons, zero empty today because
`_nav.js` fills them - but without JavaScript the rule draws a 26x26 bordered box
where each icon would be. A fallback, not a leftover.

### Found, not fixed

- **Two greys for two table headers**: `.ctable th` takes `--text-muted`, `.pl-t th`
  takes `--text-secondary`, at the same 12px, 700, uppercase and `--ls-caps`. One
  reader each, no majority - so it is a values decision, not a licence to invent.
- **No «no data» state.** If a product has no composition filled in, the table
  simply does not render and the page says nothing. For a product whose first
  principle is trust, an empty composition is not emptiness - it is a signal.

## Step 7.47: the trust strip, and a rule that could not reach the phone

Sixth molecule. **42 selectors, 66 rules, 463 declarations, no dead ones**, and
three blocks that do not belong together: the strip of four micro-signals under the
price, the accordion of the trust block below it, and the cart shelf on the home
page. Four coloured screens.

Measured across all 40 coloured screens at 360 and 1280: the strip renders **3
times** (`product`, `product-oos`, `product-coach`) with **12 tiles**, the accordion
**8 sections** on two screens, the seal **3 times** (`product-reviews` joins - it
has the certificate without the strip), the shelf **once**, on `home-cart`.

### The instrument changed, and the floor got better

The Playwright MCP server disappeared mid-step and did not come back after a
restart. The census now runs on a **CDP driver over the system Chrome**, written for
this step: launch headless with a throwaway profile, attach a session, and per load
set device metrics, clear the cache, disable it, navigate, await `document.fonts.ready`,
await two animation frames, then read.

**The null pass is now 0 diffs**, HEAD against HEAD, across 40 pages x 3 widths x
every element x 51 computed properties plus rect. The old floor was 30-odd rows of
skeleton pulse. Every row in the A/B below is therefore real, with nothing to argue
about.

One artifact had to be named rather than ignored: the two servers differ by port, so
every computed `background-image` differs as a string - **730 rows that are the
number 8992 against 8993**. Normalised, not filtered by hand.

### The defect: a media block that stood above the rules it had to beat

`@media (max-width: 479px)` sat **above** the four base `.tsx` rules. Three of its
five declarations won anyway, because their own bases sit higher still. The two
about the icon did not: `.tsx .uiv-ic` here and `.tsx .uiv-ic` there are both
(0,2,0), the later one takes it, and the later one was the 44px desktop box.

| declaration | its base sits | before | after |
| `.truststrip{ grid-template-columns: 1fr }` | above the block | worked | works |
| `.tsx{ padding: 12px }` | above the block | worked | works |
| `.tsx:nth-child(even), :nth-child(4){ box-shadow: none }` | above the block | worked | works |
| `.tsx .uiv-ic{ --size-38 }` | **below the block** | **silent, drew 44** | **38** |
| `.tsx .uiv-ic svg{ --size-20 }` | **below the block** | **silent, drew 23** | **20** |

Measured on `product.html` at 360 and 390 before the move: 44x44 box, 23px glyph,
where the block asks for 38 and 20. The boundary was checked on its own: **479 gives
38, 480 gives 44**, 720 turns the grid into four columns. Nothing new was written.
The block is where it can act.

| on 360 | before | after |
| icon box | 44x44 | **38x38** |
| glyph | 23x23 | **20x20** |
| text column | 230px | **236px** |
| tile height | 68px | **66.38px** |
| strip height | 290px | **283.5px** |

**The six pixels the icon gave up went to the label**: the text column did not
narrow, it widened. That was the rule's point, and nobody had seen it for three
stages.

**Third in three steps.** A declaration that exists and never reaches the browser:
7.42 a stray comment closer swallowing the rule under it, 7.46 the same `@media`
block declared twice, 7.47 the block in the wrong place. None of the three is
findable by reading the file; all three were found by asking the browser.

### The counter on the shelf, and the rule for it is written down

`.cshelf .cs-th .q` wore `--text-oninverse`. `DESIGN-artifacts.md` carries the
locked rule «Label on an orange fill = white, at every size» AND the line directly
under it: small orange things that are **not** buttons - badges, counters, the
«Новинка» tag - keep the **ink** label, because there orange is a marker, not an
action, and ink stays crisp at 10-12px.

This is a counter on a marker at 10px, so it is the second sentence. Measured:
white on `#FF5A00` is **3.13:1**, ink is **5.45:1**.

**And it is the only one.** Read out of the parsed CSSOM: **18 selectors in 11
files** paint `--bg-action` and name a label colour, and the split follows the
written rule exactly - buttons take white (`.btn--accent`, `.hd-cta`, `.tbuy`,
`.pages a.on`), marks take ink (`.tag-new`, `.chip.on`, `.ptab.on`, `.hb`,
`.tbadge`, `.acc-link[aria-current]`, `.mtoolbar .mc .b`). One exception, here.

**Not merged into the counter atom, and said out loud**: `.hb`/`.tbadge` is 15x15 in
the body face with a white ring, this is 16x16 in mono with none. Two counters,
close but not the same shape; folding the geometry is Крок 6's.

### The A/B

Three passes: HEAD, HEAD again, working tree. **Null: 0.** A/B after normalising the
port: **1645 declaration-level diffs on exactly 6 scopes.**

| `product@360`, `product-coach@360`, `product-oos@360` | 645 + 645 + 325 |
| `home-cart@360`, `@720`, `@1280` | 10 each |

Nothing at 720 or 1280 on any product screen - the block stayed inside its own
`max-width: 479px`. On the product screens the rows are four icons, their SVG
internals, and **570 elements below the strip moving up by exactly 6.5px**: one
reflow, not many. On `home-cart`, two badges x 5 rows each: `color` plus the four
`border-*-color` shadows it casts, because the badge sets no border colour and
those computed values follow `color`. One declaration, five rows.

### The stand

`design/kit/trust-strip.html`, the showcase's **sixth molecule**. Markup copied line
for line out of `product.html` and `home-cart.html`. `uivPdp()` cannot run here
either, so the page repeats the four lines it needs from that same source and puts
them **after `../_nav.js`**, which is where `uivWrap()` is declared - run any
earlier and the page throws, which is how the placement was found.

Idle check passes: **all 18 classes rendered, 3 states named.** 360: no overflow, 0
JS errors, and the stand's own icon renders at 38 because the stand loads the same
`index.css` the product does. All 39 stands re-checked at 360 and 1280: no overflow,
no idle failure, no exception. Molecules **6 / 27**.

### A correction to 7.46

The 7.46 entry and the spec-table stand both said the stand takes `uivWrap()` «out
of `design/system/icons.js`». It is declared at **`design/_nav.js:81`**; `icons.js`
does not declare it. The code was right, the citation was not. Both are fixed.

### Who found it

Both defects are Claude's, in a browser, and both are of the falsifiable kind Codex
owns - a value drifted from its written rule, and a declaration the source contains
but the style tree does not honour. Codex was not run on this step; the pair belongs
in the next audit round rather than being claimed as a two-instrument result.

### Found, not fixed

- **The cart shelf is filed under the wrong component.** `.cshelf` is a block of the
  home page, not a trust signal: 11 selectors, one screen, `home-cart`. By 7.44's own
  logic its place is `banner.css`, which that step named the home page's stylesheet.
  A decision, so it is declared rather than done as a side effect of this one.
- **The mascot's wrapper is declared in another component's file.** `.uiv-bearwrap`
  has exactly one producer - `design/_nav.js:997`, which appends it to `.truststrip`
  - and its two rules sit in `empty-state.css`. Same class of question as
  `.packlabel` at 7.43 and `.dl`/`.dk`/`.dv` at 7.46.
- **Glyph sizes as literals.** 23px for the strip's icon above 480, 22px for the
  shelf's trolley, 17px for the seal - three numbers beside the `--size-*` scale the
  rest of the file uses.
- **No «signal not confirmed» state.** With no certificate on the batch the strip
  still says «Сертифікат». A question for IA and microcopy, not for CSS.

## Step 7.48: the loyalty rung, and a column the phone could not reach

Seventh molecule. **49 selectors, 61 rules**, three coloured screens for the ladder
(`account`, `account-loyalty`, `account-empty`), one for the ledger, and the tier
mark on **14 screens** of the account and the checkout.

### The component was picked by the browser, not by feel

Before choosing, every remaining component file was swept: **73 files, 1554
selectors**, each run against all 40 coloured screens at two widths.

Three files answer nothing at rest - `cookie-banner` (27 of 27), `cat-overlay`
(26 of 26), `toast` (8 of 9) - and that is correct rather than broken: all three are
opened by JavaScript. `client-row` looked like the richest target at 8 of 11, but the
file itself already records why at 7.36: the coach's screens exist only in grey, so
a stand for it would be an invention.

### The defect: overflow hidden on a table wider than the phone

`.led-wrap` carried `overflow: hidden`, and the ledger's table does not fit a phone.

| width | wrapper | table | of the 87px «Баланс» column |
| 360 | 328 | 411 | **3px visible** |
| 390 | 358 | 411 | 33 visible |
| 430 | 398 | 411 | 72 visible |
| 720+ | 688 | 686 | fits |

**And it could not be scrolled to** - that is what `hidden` does. Proved with a real
touch swipe through `Input.synthesizeScrollGesture`, because the obvious test lies:
**assigning `scrollLeft` works even under `overflow: hidden`**, so the first
measurement showed HEAD and the working tree behaving identically and proved nothing.
Under a real gesture at 360: HEAD stays at `scrollLeft` 0 with 3px of the column
visible; the working tree reaches 85 and shows all 87.

Variable: how a table wider than its wrapper behaves. Value: **it scrolls**. Why: the
alternative is that the buyer cannot see their own bonus balance on the device the
store is built for first. Not an invented pattern - `overflow-x: auto` with the
scrollbar suppressed is what account-shell.css, chip.css, hero.css and pdp-tabs.css
already do. `overflow-y` is pinned to `hidden` on purpose: `auto` on one axis forces
the other off `visible`.

**The correction to the backlog**: the finding was recorded as «313px holding a
411px table». It is **328**; the old number was measured another way.

### The second half was found in acceptance, not declared

The head and the footnote are children of the wrapper, so the moment the wrapper
scrolled they travelled with the table: measured at 360 after a swipe, the panel's
own title «Рух бонусів» sat at **-68** and was off the screen exactly when the
balance arrived. `position: sticky; left: 0` on `.led-head` and `.led-note` pins them
at **+1** while the table moves underneath. Only the table was ever meant to move.

This was not in the declaration. It is in the step because shipping the first half
alone would have traded one defect for another.

### The third thing, and it is not CSS

The sweep listed `.uiv-tier.t0` among the selectors that match nothing, and the
declaration called it a state no screen shows. **That was wrong, and acceptance
caught it.** The screen exists - `account-empty.html` carries the base tier three
times. What hid it is one line in `design/_nav.js`:

    if(UIV_TIER_EMOJI[part]){

`UIV_TIER_EMOJI` maps the base tier to **0**, which is falsy in JavaScript. So three
metals out of four became the system glyph and the fourth stayed a raw colour emoji -
on the screen a buyer sees **before their first order**. Measured before: 3 raw emoji
on the page, 0 instances of `.uiv-tier.t0`. After `if(part in UIV_TIER_EMOJI)`: 0 raw,
3 marks.

The other three unmatched selectors ARE colour halves waiting for a grey twin:
`.lbar.maxed i` has `wireframes/account-loyalty-max.html` and `_wf.css:1307`,
`.led-empty` has `wireframes/account-loyalty-empty.html` and `_wf.css:1325-1326`. The
same shape as `.tband` at 7.44. Nothing was deleted.

### The A/B, and a limit of the instrument

Null pass **0** across 40 pages x 4 widths (360, 390, 720, 1280 - 390 joined because
the defect lives there).

`account-loyalty`: **3 rows per width**, `overflow-x` on `.led-wrap` and `position` on
`.led-head` and `.led-note`. No geometry moved.

`account-empty` first reported **1397 rows per width**, and that number is an artifact
of the census, not of the page. Rows are keyed `TAG.classes#seq`, so inserting three
icons renumbers every `svg` and `path` after them. Re-compared as a **multiset of
digests per tag+class**, which insertion cannot disturb: at 1280 **nothing was
restyled at all** - 0 digests gone, 12 new, exactly span + svg + 2 paths x 3 - and the
page height is identical to the pixel. At 390 the page grew **3.39px**, the mark being
slightly taller than the emoji it replaced.

**The rule this adds: when a step changes the DOM, a sequence-keyed diff overstates
it. Compare multisets.**

### The stand

`design/kit/loyalty-rung.html`, the showcase's **seventh molecule**. Idle check
passes: **19 of 19 classes, 9 states named.** Both grey-only states are shown with
the markup taken from `wireframes/`, and labelled as grey-only rather than presented
as if they shipped.

The stand failed its own check twice before it passed, and both were the stand's
fault, not the component's: `.loy-two` was never rendered, and a four-rung ladder
overflowed 360 by 5px. The second one was the better lesson - **the ladder always has
exactly three rungs**, because the programme has three tiers, so a four-state row was
not a smaller version of the product, it was a thing the product cannot produce. It
is now two real ladders from two real screens.

All 40 stands re-checked at 360 and 1280: no overflow, no idle failure, no exception.
Molecules **7 / 27**.

### Who found it

All three are Claude's, in a browser. The tier-0 bug is exactly Codex's kind - a
falsifiable contradiction in the source - and it was found by measuring instead, so
it is logged as one instrument, not two.

### Found, not fixed

- **Two coloured screens are missing.** «Maximum tier» and «empty ledger» exist in
  grey with no coloured twin. Not a values decision - work that has not been done.
- **The ledger gives no sign that it scrolls.** The scrollbar is suppressed, as in the
  other four scrollers, so the only cue is three visible pixels of a column. Whether
  that needs an edge fade is a stage-09 question and not one to answer with an
  invented shadow.
- **Eleven curly apostrophes** are left in the repo against the one form the rules
  name: 4 in `wireframes/` (frozen), 1 in `ia/`, 6 in `voice/`. `design/` is clean.
  It belongs to voice and IA, not to a component step.
- **Every number here is `[?]`** - tier thresholds, discount percentages, the accrual
  rate, the three months to expiry. Correct until there is real data, and the stand
  says so out loud rather than drawing something plausible.
