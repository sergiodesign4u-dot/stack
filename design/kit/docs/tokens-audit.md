# Token audit - the material stage 08 splits

- **Version:** v1.0 (2026-08-04)
- **Shown on:** the row counts below are for the model. The visible place is the "Audit summary"
  block on `design/kit/pixel-proof.html` (step 8), stated as before -> after numbers.
- **Reads:** `wireframes/_wf.css`, `design/kit/kit.css`, `design/kit/kit.html`, `design/_nav.js`,
  all 40 `design/*.html` including state pages, `design/kit/docs/inventory.md`, `DESIGN.md`
- **Read by:** step 2 (`design/system/tokens.css`), step 3 (the split into
  `design/system/components/`), step 4 (what each basics page shows), step 8 (the summary numbers)

## What is different here from the lesson, and why it changes the audit

`kit.css` is **not** a standalone stylesheet in this project. It is a **colour layer over
`wireframes/_wf.css`**: 39 of the 40 coloured screens link both files, structure first, colour
second. `_wf.css` declares 13 custom properties; `kit.css` **redeclares all 13** and adds 7 of its
own.

The owner's decision on 2026-08-04 is **full absorption**: `design/system/` takes both layers, a
component file carries its structure and its colour together, and a screen ends up with **one**
link. So this audit reads **both** stylesheets. Reading only `kit.css` would have described a colour
overlay and called it a system, and step 3 would have split half a product.

`wireframes/` itself is not touched by any of this. It keeps its own `_wf.css` and stays grey - the
duplication is deliberate and is what lets the frozen stage-04 artifact stay frozen.

---

## 1. The variables

20 unique custom properties. 13 exist in both layers (colour overrides grey), 7 are colour-only.
**1 921 uses** across the sources. **0 orphans** - every declared variable is read somewhere.

The **surface** column is the material for step 2's fifth rule: which of the three surfaces the
variable actually paints. It is counted from the CSS property each `var()` feeds, not guessed.

The **origin** column says where the value's origin is recorded - see finding 1.3, none of them
record it beside the declaration.

| Variable | grey `_wf.css` | colour `kit.css` | Uses | Surfaces (ink / fill / line) | Origin |
|---|---|---|---|---|---|
| `--sec` | `#777` | `#5B5B54` | 266 | ink 265, line 1 | `DESIGN.md` |
| `--strong` | `#111` | `#1C1C1C` | 266 | ink 261, line 4, fill 1 | `DESIGN.md` |
| `--hair` | `#e4e4e4` | `#E9E7E2` | 244 | line 238, fill 6 | `DESIGN.md` |
| `--ink` | `#1b1b1b` | `#1C1C1C` | 237 | ink 211, line 17, fill 9 | `DESIGN.md` |
| `--orange` | - | `#FF5A00` | 235 | **ink 127**, line 76, fill 31 | `DESIGN.md` |
| `--hair2` | `#cfcfcf` | `#D9D9D9` | 178 | line 159, ink 13, fill 6 | `DESIGN.md` |
| `--light` | `#999` | `#6E6A62` | 145 | ink 139, line 6 | `DESIGN.md` |
| `--dark` | `#161616` | `#1C1C1C` | 117 | fill 65, line 47, ink 5 | `DESIGN.md` |
| `--fill2` | `#fafafa` | `#FAF9F7` | 72 | fill 71 | `DESIGN.md` |
| `--fill` | `#f4f4f4` | `#F2F0ED` | 68 | fill 66 | `DESIGN.md` |
| `--err` | - | `#C42B1C` | 23 | ink 16, line 7 | `DESIGN.md` |
| `--sh` | `0 1px 2px rgba(0,0,0,.05)` | two-layer shadow | 23 | line 22 | **nowhere** |
| `--ok` | - | `#2E7D46` | 14 | ink 12, line 2 | `DESIGN.md` |
| `--warn` | - | `#8A5A0E` | 11 | ink 10, line 1 | `DESIGN.md` |
| `--faint` | `#8a8a8a` | `#6E6A62` | 7 | ink 7 | `DESIGN.md` |
| `--gold` | - | `#8A5A0E` | 5 | ink 5 | `DESIGN.md` |
| `--r` | `10px` | `12px` | 4 | geometry | **nowhere** |
| `--star` | - | `#F6A800` | 3 | ink 3 | `DESIGN.md` |
| `--info` | - | `#4A5568` | 2 | ink 2 | `DESIGN.md` |
| `--rs` | `6px` | `9px` | 1 | geometry | **nowhere** |

**`--r` and `--rs` are read 4 times and 1 time in a product with 15 distinct radii.** The two radius
tokens exist and the product ignores them - see finding 2.2.

### Finding 1.1 - one variable, three surfaces

`--ink`, `--orange`, `--hair2` and `--dark` each paint **all three** surfaces. That is the defect the
surface rule exists for: ink is checked at 4.5:1, fill and line at 3:1, and a single name cannot
carry two thresholds. Step 2 splits these by surface.

### Finding 1.2 - the accent is text 127 times, and it is the weakest contrast in the product

`--orange` `#FF5A00` on white is **3.13:1**. `DESIGN-artifacts.md` locks the rule: **accent on text is
allowed only from 19px bold**. The variable is fed to `color:` **127 times**. Whether every one of
those is 19px bold is not measured here - it is a step-8 check with a number, and it is the single
biggest reason this stage splits `--color-action` (fill and line, 3:1) from the ink role.

### Finding 1.3 - origin: 0 beside the declaration, 17 in `DESIGN.md`, 3 nowhere

**Corrected by the second instrument.** The first pass read the trailing comments in `kit.css`
(`/* hairline */`, `/* secondary text, AA on white */`) as origin and reported 17 of 20 as covered.
Codex checked each declaration and found the distinction: those are **role** comments. Not one of the
20 carries an origin comment beside its declaration - the file header delegates origin to another
file (`kit.css:4-8`).

| Where origin actually lives | Count |
|---|---|
| beside the declaration in `kit.css` | **0 of 20** |
| in `DESIGN.md` (plate pixel / attribute / decision / derived) | 17 of 20 |
| **nowhere in either file** | **3** - `--r`, `--rs`, `--sh` |

`DESIGN.md` lists the three geometry values with a use but its geometry table has **no origin
column** (`DESIGN.md:77`). Values from nowhere. Named for the owner, not invented over.

Step 2 carries the origin into `tokens.css` as a comment beside each token, which is where the
lesson wants the chain to end. The delegation to `DESIGN.md` was a break in that chain that survived
because nothing had to read it until now.

### Finding 1.5 - the colour layer is not only colour (Codex)

`kit.css` presents itself as a colour overlay. Codex compared the two layers selector by selector
and found **204 pairs where the same selector sets the same property to a different value** - and
they are **geometry and typography**, not colour:

| Selector | Property | grey | colour |
|---|---|---|---|
| `.auth-modal` | border-radius | 16px | 18px |
| `.auth-cta` | border-radius / font-size | 10px / 15px | 11px / 17px |
| `.bb .addcart` | border-radius | 9px | 11px |
| `.blogcard` | border-radius | 12px | 14px |
| `.co-confirm` | radius / font-size / padding | 10px / 15px / 15px | 12px / 17px / 16px |
| `.ci-ph` | border-radius | 9px | 11px |
| ... 198 more | | | |

This matters for step 3 in a way nothing else in this audit does. When both layers merge into one
component file, **the colour layer's value has to stay last** or the radius reverts and the pixel
proof fails on 204 counts. The merge is not "concatenate the two files per component" - it is
"structure first, colour second, in that order, inside each file".

It is also the honest description of what stage 07 did: the visual refinement of the product lives
as 204 overrides, not as a set of tokens. That is exactly the debt this stage is here to pay.

### Finding 1.4 - two pairs share a value and are two roles

- `--warn` and `--gold` are both `#8A5A0E`. Warning text and the bonus figure. They can diverge.
- `--light` and `--faint` are both `#6E6A62`. Meta text and the brand line.

Both pairs stay **two tokens** in step 2 (rule 3: two purposes, two tokens, even at one value).

---

## 2. Values written past a variable

A hex written literally where a variable already holds that exact value. **89 occurrences.**

| Zone | Count | Reading |
|---|---|---|
| `design/kit/kit.html` (stand) | 30 | the stand, not the product - lowest cost |
| `design/kit/kit.css` (colour) | 28 | **the kit writes its own token's value by hand** |
| `wireframes/_wf.css` (grey) | 19 | pre-dates the colour stage; enters the system under decision B |
| `design/*.html` (screens) | 12 | **the worst class**: a value frozen onto a screen |

The heaviest single case: `#6e6a62` (`--light` / `--faint`) written out 12 times, `#ff5a00`
(`--orange`) 12 times, `#1c1c1c` (`--ink` / `--strong` / `--dark`) 11 times.

### Finding 2.2 - the radius tokens exist and the product writes the number instead (Codex)

`--r` and `--rs` are read **5 times between them**. Codex counted the literal radius values written
past them: **319 occurrences.**

| Literal | Times | | Literal | Times |
|---|---|---|---|---|
| `10px` | 63 | | `9px` | 22 |
| `12px` | 51 | | `4px` | 20 |
| `8px` | 49 | | `5px` | 15 |
| `14px` | 49 | | `6px` | 11 |
| `11px` | 31 | | `7px` | 8 |

`11px` is the tell: it appears **31 times and only in `kit.css`**. It is the colour layer nudging
radii up by one pixel across the auth dialog, the buy box, the cart and the checkout - the same 204
overrides of finding 1.5, seen from the value side. The radius scale of this product is not `--r` and
`--rs`; it is ten numbers, and the two tokens are a fossil of an intention.

Primitive collects all ten at step 2. **Nothing is merged there** - merging radii is a look change
and would break the pixel proof. The merge proposal goes to step 8, after "unchanged" has a
definition.

### Finding 2.3 - there is no font-family variable at all (Codex)

Neither `:root` declares one. So the four spellings of the Inter stack (finding 4.1) are not
"written past a variable" - there was no variable to write past. Three font primitives are created
at step 2, and that is a value getting a name, not a new value.

### Finding 2.1 - the most used colour in the product has no variable at all

`#ffffff` appears **232 times** and is not a token in either layer. White is the page background, the
card fill, the label on every orange action and the surface of every dialog. Under decision B it
becomes a primitive at step 2, and the two roles it serves (page background, ink on a dark or accent
fill) become two semantic tokens. This is not a new value - it is an existing value finally getting
a name.

---

## 3. Drift

Two kinds, and only the first is drift.

**3.1 Real drift - the same role at two nearly equal values.** 33 hex literals sit within 20/255 of a
variable's value in the same chroma class. The ones that matter:

| Literal | Hits | Against | Where | Verdict |
|---|---|---|---|---|
| `#111111` | 7 | `--strong` (`#111` grey, `#1C1C1C` colour) | 4 on screens, 2 grey, 1 colour | a screen writing `#111` gets the **pre-colour** value |
| `#bbbbbb` | 22 | `--hair2` `#cfcfcf` | grey only | enters the system under decision B |
| `#aaaaaa` | 10 | `--light` `#999` | grey only | same |
| `#ececec` `#dddddd` `#cccccc` `#cbcbcb` `#f1f1f1` `#f2f2f2` `#f3f3f3` `#f0f0f0` `#eeeeee` | 24 total | `--hair` / `--hair2` / `--fill` | grey only | nine neutrals for two roles |
| `#fbbc05` | 1 | `--star` `#F6A800` | `design/_nav.js` | Google yellow next to the rating gold |
| `#f7f6f3` `#f2f0eb` `#e5e2db` `#1a1916` `#6b6760` `#e8f0ea` | 6 | various | screens, 1 hit each | one-off values frozen onto a screen |

**3.2 Not drift - pale tints that are their own values.** `#fdf4f2` (error surface), `#f1f8f3`
(success surface), `#fcf8f1` `#fbf6ec` `#fff9f5` `#fbf7ef` (warm accent surfaces), `#eadfcb`,
`#f0cfc9`, `#cde4d5`, `#e85200` (the accent's pressed state). These are distinct decisions, not
sloppy copies of `--fill`. They become primitives at step 2 and several of them become the surface
half of a semantic pair (`--bg-success`, `--bg-danger`, `--bg-action-soft`).

**Nothing in section 3 is consolidated in this step.** The lesson allows exactly one place where a
value may change, and it runs through the owner: step 2 shows the list `variable -> values that
existed -> value that stays -> what was displaced -> why`, waits, and only then merges.

---

## 4. The raw scales primitive has to collect

Counted over both stylesheets. This is the honest measure of how much a "system" was actually a
system before today.

| Scale | Distinct values | The tail |
|---|---|---|
| spacing (padding / margin / gap) | **45** | 12, 16, 14, 10, 6, 8, 9px carry the load; 7, 11, 13, 15, 17, 22, 26, 34px are one-offs |
| border-radius | **15** | 10, 12, 8, 14px plus `100px` pill and `50%` circle; 3, 5, 7, 11, 18px are noise |
| font-size | **38** | 13, 12, 12.5, 14, 11.5px lead; half-pixel sizes (10.5, 11.5, 12.5, 13.5, 14.5, 9.5) are a scale that grew by nudging |
| font-weight | 5 | 700, 800, 600, 500 + one `inherit` |
| font-family | 8 declarations | Oswald, Inter, IBM Plex Mono - but **Inter is written four different ways** |

### Finding 4.1 - the font stack is written four ways

`'Inter', sans-serif` · `'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif` ·
`'Inter',system-ui,sans-serif` · `'Inter', system-ui, sans-serif`. One primitive
`--font-body` ends it. Same for the mono and display stacks.

### Finding 4.2 - 45 spacing values is not a scale

A scale is what the product can be built from. 45 values is what the product was built *with*.
Primitive collects all 45 at step 2 **without merging any of them** (that is a look change and would
break the pixel test); the merge proposal goes to step 8 as a named list, after the pixel proof has
locked what "unchanged" means.

---

## 5. List one - candidates for semantic roles

Read out of the surface counts in section 1, not taken from another design system. A role earns a
token when it **repeats**, can **diverge** from its neighbour, and paints **exactly one surface**.

### Ink (threshold 4.5:1, or 3:1 from 24px / 19px bold)

| Proposed role | Points at | Seen in |
|---|---|---|
| `--text-primary` | `--strong` `#1C1C1C` | 261 uses - every heading and body line |
| `--text-body` | `--ink` `#1C1C1C` | 211 uses - same value as primary today, different job: one is emphasis, one is running text |
| `--text-secondary` | `--sec` `#5B5B54` | 265 uses - captions, meta, helper lines |
| `--text-muted` | `--light` `#6E6A62` | 139 uses - tertiary meta |
| `--text-brandline` | `--faint` `#6E6A62` | 7 uses - same value as muted, different job |
| `--text-action` | `--orange` `#FF5A00` | **127 uses, 3.13:1** - carries the 19px-bold rule in its comment |
| `--text-success` | `--ok` `#2E7D46` | 12 |
| `--text-warning` | `--warn` `#8A5A0E` | 10 |
| `--text-danger` | `--err` `#C42B1C` | 16 |
| `--text-bonus` | `--gold` `#8A5A0E` | 5 - same value as warning, different job |
| `--text-info` | `--info` `#4A5568` | 2 - **one place only**, see below |
| `--text-oninverse` | `#ffffff` | the label on every dark and every orange fill |

### Fill (threshold 3:1, WCAG 1.4.11)

| Proposed role | Points at | Seen in |
|---|---|---|
| `--bg-page` | `#ffffff` | the untokenised 232 |
| `--bg-surface` | `--fill2` `#FAF9F7` | 71 - cards, panels |
| `--bg-sunken` | `--fill` `#F2F0ED` | 66 - rails, chips, zones |
| `--bg-inverse` | `--dark` `#1C1C1C` | 65 - header, dark surfaces |
| `--bg-action` | `--orange` `#FF5A00` | 31 - the single action fill |

### Line (threshold 3:1)

| Proposed role | Points at | Seen in |
|---|---|---|
| `--line-hair` | `--hair` `#E9E7E2` | 238 - the hairline everywhere |
| `--line-strong` | `--hair2` `#D9D9D9` | 159 - control borders |
| `--line-action` | `--orange` | 76 - selected state |
| `--line-inverse` | `--dark` | 47 |
| `--shadow-1` | `--sh` | 22 - the only shadow in the product |

### Colours standing in exactly one place - NOT roles yet

Rule four: one use does not prove a role. These stay **primitive** and go to step 8 for a decision.

- `--info` `#4A5568` - 2 uses. A neutral slate that never repeated.
- `--star` `#F6A800` - 3 uses, and its own comment already says it is decorative, never an action.
- `#e85200` - the accent's pressed state, 2 uses.
- `#f0cfc9`, `#cde4d5`, `#eadfcb`, `#f0e0c2` - one tint each.

### Named absence

`--color-focus` does not exist in the code and is **not invented here**. Neither is a full state set
(hover exists in places, active and disabled do not). Both go on the component pages as
"Not in the code -> stage 09" and are collected into `architecture.md` at step 8.

---

## 6. List two - the split into files

### The gate this list had to pass first

`inventory.md` was built at stage 07 by counting **anchor classes in the wireframe markup**. Its own
"How the numbers were taken" section carries the rule *a zero can mean the anchor class was guessed
wrong* - and that rule was applied to the markup and **never to the stylesheet**. Checking it now:

- `.chip`, `.gchip`, `.fchip` - **0 selectors** in either stylesheet. The real classes are `.mgchip`,
  `.dr-chip`, `.hero-chips`, `.afilter`.
- `.pill` - **0**. The real class is `.oh-status` / `.aord-status`.
- `.cdrawer` - **0**. The real class is `.cart-drawer` plus the `.cd-*` family.
- `.mfs` - **0**. The real class is `.fsheet`.
- `.ck` - **0**. The checkbox is `.cb`; `.ck-*` is the cookie settings panel.
- `.sep` - **1** selector, and it is `.crumb .sep`.

**And the list was not complete.** Mapping every rule of both stylesheets against the 51 inventory
components left **1 517 lines - 58 percent of the product's CSS - with no home**: the whole checkout
(`.co-*`, 254 lines), the desktop buy box (`.bb-*`), the PDP tabs, the gallery, the spec tables, the
loyalty ledger, the trust strip, the client dialog. None of it was wrong in the inventory; it simply
was never asked to cover the stylesheet, because at stage 07 nothing depended on it doing so.

Under decision B every line has to land somewhere or it is lost and the pixel test fails at step 5.
So the inventory is corrected and extended here.

### Result: 70 component files, 51 -> 70

**22 atoms, 27 molecules, 21 organisms.** 2 530 of 2 601 mapped lines land in a component
(1 220 from `_wf.css`, 1 310 from `kit.css`); 71 lines go to `tokens.css` and `base.css`; 80 lines
are **not product** and do not enter `design/system/` at all.

**Assignment rule, stated so step 3 is mechanical.** The **outermost** anchor in a descendant
selector owns the rule, because that is its cascade context: `.wfh-nav .navbtn` is the header's
override of a button, not a button rule, and it has to sit below `button.css` to win. **Exception:**
when the inner component has no unscoped rule anywhere in either stylesheet, the nested rule is its
**only** definition and goes to its own file. That exception is what gives `rating`, `favourite`,
`discount`, `availability`, `cart-button`, `separator` and `mega-menu` a file at all - all seven exist
only as `.pcard …` or `.wfh …`. Without it the card would have swallowed six atoms, which is exactly
the failure the lesson names. **Selectors are not rewritten. Only the file changes.**

#### Atoms (level 1) - 22 files, `@import` first

| File | Rules | Lines | from `_wf` | from `kit` |
|---|---|---|---|---|
| `field.css` | 42 | 48 | 23 | 25 |
| `button.css` | 29 | 32 | 11 | 21 |
| `otp.css` | 19 | 24 | 11 | 13 |
| `radio.css` | 20 | 21 | 11 | 10 |
| `chip.css` | 17 | 18 | 12 | 6 |
| `view-toggle.css` | 15 | 15 | 3 | 12 |
| `link-row.css` | 15 | 15 | 5 | 10 |
| `cart-button.css` | 14 | 14 | 5 | 9 |
| `skeleton.css` | 12 | 12 | 10 | 2 |
| `favourite.css` | 9 | 11 | 2 | 9 |
| `availability.css` | 10 | 10 | 5 | 5 |
| `rating.css` | 8 | 10 | 3 | 7 |
| `checkbox.css` | 8 | 8 | 4 | 4 |
| `status-pill.css` | 8 | 8 | 3 | 5 |
| `switch.css` | 7 | 7 | 4 | 3 |
| `stepper.css` | 6 | 6 | 3 | 3 |
| `discount.css` | 5 | 5 | 2 | 3 |
| `icon.css` | 5 | 5 | 1 | 4 |
| `price.css` | 3 | 3 | 2 | 1 |
| `counter.css` | 2 | 2 | 1 | 1 |
| `separator.css` | 2 | 2 | 2 | 0 |
| `badge.css` | 1 | 1 | 1 | 0 |

> **Оновлено після публікації (крок 6.2).** `cart-button.css` більше немає: іконкова
> кнопка стала обробкою в `button.css`, а рядок вище описує стан до того кроку. Чому саме
> так - у `consolidation.md`.


#### Molecules (level 2) - 27 files

| File | Rules | Lines | from `_wf` | from `kit` |
|---|---|---|---|---|
| `product-card.css` | 105 | 111 | 34 | 77 |
| `banner.css` | 83 | 104 | 43 | 61 |
| `spec-table.css` | 81 | 103 | 44 | 59 |
| `loyalty-rung.css` | 69 | 70 | 37 | 33 |
| `trust-strip.css` | 59 | 68 | 22 | 46 |
| `cart-row.css` | 51 | 57 | 25 | 32 |
| `review-item.css` | 48 | 51 | 27 | 24 |
| `order-row.css` | 44 | 45 | 26 | 19 |
| `empty-state.css` | 39 | 45 | 20 | 25 |
| `address-card.css` | 43 | 43 | 35 | 8 |
| `filter-group.css` | 38 | 40 | 16 | 24 |
| `gallery.css` | 18 | 25 | 7 | 18 |
| `section-head.css` | 22 | 23 | 9 | 14 |
| `client-row.css` | 19 | 21 | 9 | 12 |
| `toolbar.css` | 17 | 19 | 7 | 12 |
| `restock-note.css` | 15 | 16 | 10 | 6 |
| `blog-card.css` | 14 | 15 | 6 | 9 |
| `pagination.css` | 14 | 14 | 5 | 9 |
| `goal-tile.css` | 11 | 13 | 5 | 8 |
| `toast.css` | 9 | 12 | 12 | 0 |
| `cert-thumb.css` | 7 | 11 | 2 | 9 |
| `brand-logo.css` | 7 | 9 | 2 | 7 |
| `desc-block.css` | 8 | 9 | 4 | 5 |
| `breadcrumb.css` | 6 | 6 | 3 | 3 |
| `qa-item.css` | 5 | 6 | 3 | 3 |
| `related.css` | 5 | 5 | 2 | 3 |
| `seo-text.css` | 5 | 5 | 3 | 2 |

#### Organisms (level 3) - 21 files, `@import` last

Ones that contain no other organism first; the four that do (overlay, city dialog, client dialog,
auth dialog, cookie banner) close the file.

| File | Rules | Lines | from `_wf` | from `kit` |
|---|---|---|---|---|
| `checkout-form.css` | 275 | 297 | 138 | 159 |
| `header.css` | 143 | 158 | 91 | 67 |
| `buy-box.css` | 99 | 119 | 47 | 72 |
| `account-shell.css` | 98 | 101 | 63 | 38 |
| `cart-drawer.css` | 83 | 93 | 51 | 42 |
| `review-modal.css` | 51 | 59 | 27 | 32 |
| `pdp-tabs.css` | 36 | 49 | 18 | 31 |
| `filter-rail.css` | 28 | 32 | 18 | 14 |
| `mega-menu.css` | 31 | 31 | 23 | 8 |
| `footer.css` | 24 | 25 | 18 | 7 |
| `hero.css` | 21 | 25 | 8 | 17 |
| `buy-bar.css` | 14 | 20 | 8 | 12 |
| `filter-sheet.css` | 10 | 10 | 9 | 1 |
| `tabbar.css` | 3 | 4 | 1 | 3 |
| `product-grid.css` | 3 | 3 | 2 | 1 |
| `auth-dialog.css` | 78 | 103 | 44 | 59 |
| `cookie-banner.css` | 27 | 31 | 31 | 0 |
| `client-dialog.css` | 17 | 19 | 19 | 0 |
| `city-dialog.css` | 15 | 18 | 18 | 0 |
| `price-slider.css` | 13 | 24 | 0 | 24 |
| `overlay.css` | 5 | 6 | 5 | 1 |

#### `base.css` - 71 lines that belong to no component

`:root` (41 lines, goes to `tokens.css`), the reset (`*`, `html`, `body`, `a`, `button`, `img`), the
scroll-padding and overflow-anchor rules, the native control reset, and a handful of one-line icon
wrappers (`.uiv-star`, `.uiv-tier`, `.uiv-tc-ic`, `.cart-ov`).

#### Not product - 80 lines that do NOT enter `design/system/`

`.uiv-side` and `.us-*` (the `design/_nav.js` screen panel), `.sys-*`, `.syscard`, `.sysdemo`,
`.wf-canvas`, `.wf-bar`, `.wf-page`, `.wf-states`, `.wf-catov`. Prototype and stand chrome. Per the
lesson these are stand styles: they belong in `design/kit/_page.css` and in `design/_nav.js`'s own
sheet, never in a component file. The 404 / 500 / maintenance layouts stay in the inventory's
"one-off" list, unchanged.

---

## 7. List three - what each basics page shows

| Page | Shows | Source |
|---|---|---|
| `color.html` | primitive palette (all colour values incl. the 232-hit white), the semantic roles by surface, contrast pairs measured, both themes side by side | `tokens.css` |
| `typography.html` | the three families (one stack each, the four Inter spellings collapsed), the 38 sizes as the scale they became, 4 weights, line-heights, live samples in Ukrainian from `microcopy.md` | `tokens.css` + `base.css` |
| `geometry.html` | the 45 spacings shown as spacing, the 15 radii shown as corners, control heights, the page frame from `base.css` | `tokens.css` + `base.css` |
| `icons.html` | the Solar inline SVG set built by `_nav.js`, with names and sizes | `base.css` + `icon.css` |

**Material that does not fit the four pages:** exactly one - the shadow `--sh`, the only shadow in
the product. It goes on `geometry.html` under "depth", because it is a geometric property of a
surface here and not a colour decision. Nothing else is left over: after step 4 there is no token
and no class that no page shows.

---

## 8. Numbers for the step-8 summary

| Measure | Before (stage 07) | After (target, stage 08) |
|---|---|---|
| stylesheets a screen links | 2 | **1** |
| CSS files in the system | 2 flat | 1 tokens + 1 base + 1 index + **70 components** |
| custom properties | 20, one flat `:root`, 13 of them shadowing a second `:root` | primitive + semantic, two levels, no shadowing |
| colours with no variable | `#ffffff` x232 and 33 drift literals | 0 |
| colour literals written past their own variable | 89 | 0 |
| radius literals written past `--r` / `--rs` | **319** | 0 |
| cross-layer overrides of the same selector+property | **204** | 0 - merged in order inside one file |
| variables whose origin is recorded beside the declaration | **0 of 20** | 20 of 20 or named `[?]` |
| variables with no origin anywhere | 3 (`--r`, `--rs`, `--sh`) | 0 or named `[?]` |
| orphan variables | 0 | 0 |
| distinct spacing / radius / font-size values | 45 / 15 / 38 | unchanged at step 5 (pixel proof), merge proposal at step 8 |
| font-family stacks written by hand | 8 declarations, Inter spelled 4 ways, 0 variables | 3 primitives |
| components with a css file, a page and a registry row | 0 | 70 |
| inventory rows | 51 | 70 |
| product CSS with no component home | 1 517 lines (58%) | 0 |

## 8.1 Two instruments - who found what

Both sets were taken in full and independently before either was read against the other, per
`CLAUDE.md`. Codex ran read-only through the plugin (`write: false` in the job record) over both
stylesheets, `kit.html`, `design/_nav.js` and all 40 coloured screens.

| # | Finding | Who found | Status |
|---|---|---|---|
| **1** | surface split - `--ink`, `--orange`, `--hair2`, `--dark` each paint all three surfaces | Claude | the material for step 2's fifth rule |
| **2** | the accent is fed to `color:` 127 times at 3.13:1 | Claude | measured at step 8 against the 19px-bold rule |
| **3** | `#ffffff` used 232 times and is not a token in either layer | Claude | becomes a primitive at step 2 |
| **4** | the inventory's anchors are wrong in 6 places, and its 51 components cover 42% of the CSS | Claude | inventory corrected and extended to 70 here |
| **5** | 45 spacings / 15 radii / 38 font sizes; Inter written 4 ways | Claude | primitive collects, merge proposal at step 8 |
| **6** | **204 selector+property pairs where the colour layer silently redoes geometry and typography** | **Codex** | fixes the merge ORDER for step 3 |
| **7** | **319 radius literals written past `--r` / `--rs`, which are read 5 times total** | **Codex** | primitive collects all ten values |
| **8** | **no font-family variable exists in either `:root`** | **Codex** | sharpens finding 5: nothing to write past |
| **9** | **origin is beside 0 of 20 declarations, not 17** - the trailing comments are role, not origin | **Codex** | **corrects Claude's finding 1.3** |
| **10** | exact file:line for `#111` past `--strong` on 4 home screens and `index.html` | **Codex** | fixed at step 5 with the migration |
| 11 | 89 colour literals past their own variable | both | - |
| 12 | 0 orphan variables | both | - |
| 13 | 3 variables with no origin anywhere: `--r`, `--rs`, `--sh` | both | question 2 to the owner |

**What the split says.** Claude's set is what a counter and a browser show: surfaces, contrast,
coverage, scale size. Codex's set is what only a reader of both files side by side sees - that the
"colour layer" quietly restyles geometry, that two radius tokens are decorative, and that a comment
this audit read as origin was a role. Finding 9 is the one worth keeping: the first instrument read
its own material generously, and only the instrument that did not write it noticed.

Nothing was withdrawn on verification in this round. Finding 9 is a **correction**, not a withdrawal:
the class was real, the count was wrong, and the wrong count was Claude's.

## 9. What this audit needs from the owner before step 2

1. **Drift consolidation.** The list in section 3 changes values, and it is the one place in the
   stage where that is allowed. Step 2 opens with the table `variable -> values that existed ->
   value that stays -> what was displaced -> why` and waits. Findings 2.2 and 1.5 are **not** in that
   table: 319 radius literals and 204 cross-layer overrides get collected as they are, because
   merging them would move pixels and the proof at step 5 has to mean something first.
2. **Three values with no origin** - `--r`, `--rs`, `--sh` (finding 1.3). Either you name where they
   came from, or they go into `tokens.css` carrying `[?]`. Given finding 2.2 there is a third
   option worth saying out loud: `--r` and `--rs` are read 5 times in the whole product and the real
   radius scale is ten literals. They may not deserve to survive as tokens at all.
3. **The inventory grew 51 -> 70** (section 6). That is 19 more component pages at step 4 and 19
   more rows in the registry. It is not a padding of the list: every one of the 19 is a block that
   already exists in the product and had nowhere to live.

---

## 10. Stage 10 step 2 - the values this stage changed on purpose

The rule is one for the whole pipeline: a value never changes silently. Every line here is
`variable -> was -> became -> why`, and the pixel proof at step 6 is checked against this list. The
promise this stage makes is **asymmetric**: at 360 nothing moves at all, because the mobile layout is
the base of a mobile-first product and it was not supposed to change; on wide widths the look changes
on purpose, and every difference has to point back at a row here or at a row of the width audit in
`responsive.md`.

### 10.1 The type ramp moved from `px` to `rem`

| variable | was | became | why |
|---|---|---|---|
| `--fs-8` | `8px` | `0.5rem` | ten rungs, one reason |
| `--fs-10` | `10px` | `0.625rem` | |
| `--fs-12` | `12px` | `0.75rem` | |
| `--fs-14` | `14px` | `0.875rem` | |
| `--fs-16` | `16px` | `1rem` | |
| `--fs-18` | `18px` | `1.125rem` | |
| `--fs-20` | `20px` | `1.25rem` | |
| `--fs-24` | `24px` | `1.5rem` | |
| `--fs-30` | `30px` | `1.875rem` | |
| `--fs-34` | `34px` | `2.125rem` | |

**Why.** At the default root of 16px every rung resolves to the same number it held before, so the
change is invisible to a reader on defaults and the pixel proof at 360 gives zero. What it buys is
the reader who set their browser font to 20px: in `px` the whole scale ignored them and they got the
tight mobile measure on a wide monitor. This is WCAG 1.4.4 territory, and it is the cheapest half of
this stage.

**The names keep their px figure** because that figure IS the rung. Renaming ten tokens to
`--fs-0-875` would cost every reader in the system and buy nothing.

### 10.2 A fluid page heading, and the ramp deliberately left fixed

| variable | was | became | why |
|---|---|---|---|
| `--fs-display` | did not exist | `clamp(1.875rem, 1.58rem + 1.3vw, 2.75rem)` | 30px on a phone, 44px from 1440 up |
| `.lh1` | `var(--fs-30)` | `var(--fs-display)` | the listing family H1 |
| `.acc-h1` | `var(--fs-30)` | `var(--fs-display)` | the account H1 |
| `.co-h1` | `var(--fs-30)` | `var(--fs-display)` | the checkout H1 |

**Why a separate token instead of a fluid rung.** The ramp is generic: `--fs-30` is worn by a page
H1, by `.hdeal .hd-new` (the live price in the hero deal) and by `.empty .ei` (a glyph). Wrapping the
rung in `clamp()` would have made an icon breathe with the viewport, which is not a size decision
anybody took.

**Why these three readers and not the others.** All three head a full-width page, which is the only
place a viewport-fluid size is honest. `.bb h1` is the PDP title in a narrow column beside the
gallery: it is sized by its PLACE, not by the screen, so it belongs to `@container` at step 4.
`.auth-h1` and `.coach .cv-h1` sit in a dialog and a centred form capped near 420-560; a heading that
grows with the window inside a box that does not is a defect, not an adaptation.

**Both ends in `rem`, and the middle carries a `rem` term.** A pure `vw` middle ignores the reader's
font size and stops the page scaling under zoom, which fails WCAG 1.4.4. The knee sits at exactly
360px: `1.58rem + 1.3vw` resolves to 29.96px there, just under the 30px floor, so at 360 the clamp
returns the floor. Measured with `tools/tree-diff.mjs --widths=360` against a baseline that differed
in these seven files and nothing else: **0 boxes moved.** At 1280 the same three headings read
41.92px, and that is the intended change.

### 10.3 The line measure stopped being a pixel figure

| variable | was | became | why |
|---|---|---|---|
| `--container-text` | did not exist | `68ch` | inside the 60-75 characters the eye holds |
| `.lintro` `max-width` | `760px` | `var(--container-text)` | 760px at 14px is about 95 characters |
| `.seotext p` `max-width` | none at all | `var(--container-text)` | it ran the full 1200 of the page frame |
| `--container-page` | did not exist | `75rem` | 1200px, the figure `.wf-page` already wrote |
| `.wf-page` `max-width` | `1200px` | `var(--container-page)` | the page frame stops writing its own number |
| `--grid-col-min` | did not exist | `12.5rem` | 200px, the figure `product-grid.css` already wrote |

At 360 neither figure binds - the column is 328 wide - so the mobile layout does not move. On wide
widths the prose narrows from 1200 to 600.578px, and that difference is explained by the audit row
«WIDER, air» in `responsive.md`.
