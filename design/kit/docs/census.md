# Census - what actually stands on the screens

Stage 08, inserted before step 5. Page: `design/kit/census.html`.

## Why it exists

Step 4 wrote 22 atom pages from the **stylesheet**. That is the same mistake stage 07 made
with the inventory, one level up: a page called "button" that documents the class `.btn`
rather than the thing a person calls a button. Counted against the code, `button.css` owns
**3 of the 86 button-shaped rules** in the system; the other 83 live inside `checkout-form`,
`buy-box`, `header`, `cart-row`, `pdp-tabs` and twenty more files and were never named as
buttons at all.

Step 6 rolls the system onto the **102 screens that have no coloured twin**. A rollout does
not decide anything, it multiplies. So the closed set has to be right before it runs, not
after.

## Method

Two sources, because one answers a question the other cannot.

| Source | Screens | Answers |
|---|---|---|
| `wireframes/` | 141 | which **jobs** exist at all - every clickable thing in the product |
| `design/` | 39 | which **forms** are already decided |

Both walked in a browser at **390** and **1280**, because the desktop header, the mega menu
and the filter rail do not exist at mobile width and would have been missed. For every
clickable element the walk records the **computed** style, not the rule that was written.

Computed, not read, is the whole point: `.btn.dark` inside `#coach-banner` is overridden to a
**white** fill, so a class named "dark" renders white. Reading `button.css` hides that;
`getComputedStyle` shows it in one line.

Detection is deliberate: an element counts as a control when it is `a` / `button` / `label` /
`[role=button]` / `[onclick]`, **or** when it introduces `cursor:pointer` that its parent does
not have. The second clause catches divs and spans that act as controls and excludes the
descendants that merely inherit the cursor - which is why an `svg` inside a button is not
counted as a second button.

## Corpus

| | |
|---|---|
| clickable observations | **22 229** |
| screens × viewports | 180 × 2 |
| of them boxy controls (fill or border, 22-84px tall) | 4 593 |
| of them **action buttons** | 464 coloured + 1 656 grey |
| distinct forms after folding on three axes | **24** |

Chips, tabs, thumbnails, option rows, pagination, brand cards and fields are excluded from the
action-button family. They are separate components with their own pages; the button is the
pilot for the method.

## The three axes

**Emphasis** - filled 308, outlined 142, inverse 10. Filled accent means *the* action of the
region and there is one per region. Inverse is the same primary when the surface is dark.

**Content** - label / leading icon + label / label + trailing arrow / icon only (188).
Leading icon = *does something here*. Trailing arrow = *goes from here*. The distinction is
not decoration, it is what the control promises.

**Size** - decided by the container, not by importance: list row takes small, card and form
take medium, buy bar and empty state take large. **Width is not on this axis**: `100%` versus
`auto` is a layout decision, so the button in a product card and the button in the buy bar are
the same button.

**Adjacency** - a fourth axis, and it only switches on in a pair. The header search submit
(`.go`, 34 screens, 1280 only) has **radius 0**: it is welded to the search field and the two
have to read as one rectangle. Nothing else in the family does this.

Side finding, a **name collision**: `.go` is both the header search button and the "in transit"
state on the order status pill (`.oh-status.go`). They do not fight today because both are
scoped, but one name on two unrelated components is a mine under the next refactor.

## Drift inside one family

Measured across the 464 coloured action buttons:

| Property | Distinct values |
|---|---|
| border colour | **4** - `#D9D9D9`×106, accent×61, `#E9E7E2`×40, white×8 |
| radius | 5 - 10px×275, 11px×91, 8px×54, 0px×36, 12px×8 |
| font-size | 11 |
| padding-y | 9 |
| padding-x | 11 |
| border-width | 2 - 1.5px×196, 1px×19 |

The expensive one is not the type scale, it is the **border colour**: an outlined button takes
three different lines for the same role on the same component. That is drift, not a decision.

Consolidation ran at **step 5.5**, not step 8: step 6 multiplies the system by 102 screens, so
fixing after the rollout costs 140 screens instead of 39. A value still changes only through its
owner and only as "variable -> value -> why". The census counts, it does not edit - which is why
the numbers on this page stay at their discovery values and the result sits beside them.

## One job, more than one form

Ten labels are rendered by more than one class or at more than one emphasis. The two that
matter:

- **"Отримати код"** - accent fill in the auth dialog (`.auth-cta`), **ink** fill in checkout
  (`.co-getcode`). One action, two fills, neither explained.
- **"Залишити відгук"** - filled on three product screens, outlined in the account, a plain
  link in the order list (`.ln-review`). The product says a review is the main action where it
  is not left, and a detail where it is.

Also: **"У кошик" is five classes** (`.hd-cta`, `.addcart`, `.tbuy`, `.mba`, `.btn.dark.rk-add`)
across eight screens.

## Work with no form

**9 action buttons** exist in the grey prototype and have never been rendered in colour:

`coach-newcta` (17 instances) · `ch-edit` · `cv-cta` · `tier-cta` · `ck-btn` · `ctab` · `wa` ·
`next` · `rev-google`

Almost all of them are the **coach channel**, which is the primary audience. Plus 23 non-button
controls in the same position: search chips, the brand alphabet index, role tiles, the city
field. If step 6 had started without this list, a form for each would have been improvised
separately on separate screens.

## Withdrawn on verification

**`.go` - not a gap, and the error was mine.** Grepping the static HTML for "Знайти" returned
zero, and I reported the search button as having no decided form. The header is injected by
`design/_nav.js`, so it is not in the markup at all, and the desktop header does not exist at
390px. The browser pass at 1280 finds it on **34 coloured screens**: accent fill, white ink,
radius 0. Two rules follow, and both are now in the method: the census is taken **in a
browser**, never by grep, and **always at two widths**.

**`.tbuy` - not a defect.** The census reported that the shelf "У кошик" on the product tabs
has a form in grey and none in colour. Checked in the browser: in colour it is `display:none`
and switched on by `.stuck`, a class the scroll handler adds. The form exists, it is behind a
state, and a static walk cannot see a state. Withdrawn. The record stays visible, or the same
finding returns next time in the same words.

## What it changes

The button page stops being theory: its variant block is now a closed set with counters and
screen lists, and its anti-rule names a real contradiction instead of a hypothetical one. The
demo lost `.btn.on`, a variant that has **no rule anywhere in the system** and rendered
identically to the base - invented by me at step 4 and killed by the census.

The same walk reruns for the next family. The script is the artifact, not the table.

---

# The other four families

Same method, second walk: fields, icons and card surfaces are not clickable, so the first pass
missed them by construction. 9 725 more records over the same 180 screens. Pages:
`census-field.html`, `census-link.html`, `census-card.html`, `census-chip.html`,
`census-icon.html`.

## Field - 466 instances, 20 forms

Three findings, each checkable:

1. **No field in the product is marked.** Across 196 visible fields: `required` **0**,
   `disabled` **0**, `aria-invalid` **0**. The red error border exists (12 instances) but only as
   a class. A screen reader never learns a field failed, and checkout is where the money is.
2. **136 of 166 text inputs are set below 16px.** iOS Safari zooms the page on focus under
   16px. On a mobile-first product that fires on the primary device, on every checkout field.
3. **28 inputs have no font-size at all** and render at `13.3333px`, the browser default. A
   value nobody decided, which changes when the browser changes.

Drift: 8 borders, 7 radii, 7 sizes, 9 paddings. 13 field classes exist only in grey
(`bsearch`, `cl-search`, `co-search`, `blog-search`, `sys-search`, `cnt-field`, `qadd-field`,
`link-field`, `cv-consent`, `q-opt`…) - search, coach and content again.

## Link row - 3 404 instances, 41 forms

The most numerous component in the product, seven times the button, and it carries more forms
than button, field and chip combined: **15 font sizes**, 5 colours.

**3 164 of 3 404 links are not marked as links at all** - no underline, no accent colour, the
same ink as the paragraph beside them. Only 232 are underlined (the legal row in the footer)
and 8 use the accent. Position is the sole affordance.

That does not need an immediate fix - a catalog list does read by position. It needs a decision
written down: *links in a list are not underlined, links inside running text are*. Today
running text is not underlined either.

## Card - 1 075 instances, 40 surfaces

7 radii on one role: the product card takes `14px`, the block beside it `12px`, the goal tile
`16px`. None of those numbers is a decision; they accumulated. Shadow sits on 557 surfaces and
is absent on 518, so "raised" and "flat" are not separated by any rule.

## Chip - 313 instances, 15 forms

**The chip is a pill in one place and a rectangle in another**: `100px` on 180 instances,
`0` / `8` / `9px` on the rest. A catalog filter is round, a flavour option on the product card
is square, and nothing explains the difference.

**Selected is shown two ways**: accent fill (`.on`, `.ptab`) and accent border without fill
(`.vopt`). Same question, two answers.

## Icon - 2 431 visible, one set

`viewBox 0 0 24 24` on 2 315 of them, so the library is genuinely one. But they are drawn at
**30 different sizes** and **6 stroke widths** (1.9 dominant, plus 1, 1.5, 1.7, 2.4, 2.6).
Fractional sizes like `13.6` and `19.9` are `em` off a neighbour's font-size, which means the
icon's size is decided by whatever text happens to sit next to it. Three or four steps would
cover everything.

Colour is the one thing that works: 14 resolved colours, all inherited through `currentColor`.
No icon declares a colour of its own.

## What consolidation now has to decide

One pass, all families, because the same value repeats across them:

| Decision | Touches |
|---|---|
| one hairline colour | button 3, card 14, field 8, chip 3 |
| one radius scale | button 5, card 7, field 7, chip 4 |
| one icon size scale + one stroke | icon 30 sizes, 6 strokes |
| `required` / `aria-invalid` / `:focus` | every field |
| link affordance rule | 3 404 links |
| merge duplicate classes | 5 button pairs |

Consolidating per family would put the same decision through six times.

---

# Read this before the numbers above

Every count on this page and on the five family pages is a **snapshot of discovery**, taken
before step 5.5 changed anything. It is deliberately not rewritten: the numbers are the reason
the decisions were made, and a census that silently updates itself loses the finding.

What each family looks like **after** the consolidation is on the same page, in the section
"Після зведення (крок 5.5)" - was, now, and the decision in one row. Where a family was left
alone (links), the page says so and why.

The decision itself also lives on the component page, in "Що зведено": button, chip, field,
icon and cart-button. A decision that exists only in a log is a decision nobody applies.
