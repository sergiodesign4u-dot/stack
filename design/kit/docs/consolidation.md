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
