# Stack - product design language

**Formed from the code on 2026-08-04 (stage 07), and it follows the code rather than fixing it in
place.** This file documents the language **as it is actually built**, checked against
`design/concept/docs/concept.md`; where the build and the concept disagreed, the disagreement is
listed at the bottom rather than smoothed over. The build it reads has MOVED since it was written:
`design/kit/kit.css` was the flat sheet of stage 07 and was **deleted at stage 08 step 8**. The
language now lives in `design/system/tokens.css` (primitive, then semantic, both themes) and one
file per component under `design/system/components/`, with `design/system/patterns/` above them.
This paragraph names where to read, and nothing else here is a status: how far a stage has got is
`README.md`'s and `/_nav.js`'s, and a third copy only drifts from the other two.

`DESIGN-artifacts.md` stays the first source: it holds the **origin** of every value (which brand
plate pixel, which attribute, which user decision). This file holds the value **in force** plus the
rule that governs it. Two files, one line of values, no re-derivation:

```
DESIGN-artifacts.md  ->  design/kit/kit.css  ->  design/system/tokens.css  ->  system/patterns/
   origin of value        the flat sheet of 07     value IN FORCE: primitive        composition
                          DELETED at 8.8           + semantic, both themes          (stage 09)
```

The middle step is kept in the chain because a line of values is a HISTORY, not a pointer: every
value in `tokens.css` carries the comment that says which `kit.css` declaration it came from, and
cutting the dead step out of the diagram would make those comments reference nothing. What must not
happen is reading it as an address - the file is gone, and the value in force is `tokens.css`.

---

## 1. Colour

Read out of the live `:root` - `design/kit/kit.css` when this table was written at stage 07, and
`design/system/tokens.css` since stage 08 step 3, where the same declarations live split into
primitive and semantic with a dark half beside each role. Origin column carried over from
`DESIGN-artifacts.md`.

| Token | Value | Role | Origin |
|---|---|---|---|
| `--ink` | `#1C1C1C` | body text, the default everything | plate pixel |
| `--strong` | `#1C1C1C` | headings, emphasis | plate pixel |
| `--sec` | `#5B5B54` | secondary text, AA on white | picked to pass AA |
| `--light` | `#6E6A62` | meta, tertiary, still AA | **raised from `#999`, which failed AA** |
| `--faint` | `#6E6A62` | brand line, favourite | same raise |
| `--hair` | `#E9E7E2` | hairline | plate pixel |
| `--hair2` | `#D9D9D9` | stronger border (Ash) | plate pixel |
| `--fill` | `#F2F0ED` | warm neutral surface | plate pixel |
| `--fill2` | `#FAF9F7` | lighter zone | derived |
| `--dark` | `#1C1C1C` | header and dark surfaces, **not orange** | decision |
| `--orange` | `#FF5A00` | **the single action / selected accent** | plate pixel, Signal Orange |
| `--ok` | `#2E7D46` | success, calm not celebratory | attribute "calm" |
| `--warn` | `#8A5A0E` | amber for text, AA on white | `#C9821E` failed small text |
| `--err` | `#C42B1C` | serious red, kept apart from the accent | decision |
| `--info` | `#4A5568` | neutral slate | derived |
| `--gold` | `#8A5A0E` | bonus figure | shares the amber value, different role |
| `--star` | `#F6A800` | rating mark **only**, never an action | decision, see below |

### The rules colour obeys

**One orange per REGION, and this line used to say «per view».** The accent means exactly one thing:
where to press. It was written when the only screens in colour were a home page and a listing, where
one region and one view are the same thing - and stage 09 measured the whole coloured corpus and
found the rule false as stated: visible `.btn--accent` runs up to **13** on a single screen, because
a cart row, a client card and a dialog foot each finish their own block. The rule that survived the
measurement is U9's neighbour **U8 in `design/kit/docs/architecture.md` section I**: `btn--accent` is
a FINISH, not the rank «the screen's main action». Two accents inside ONE region still mean the
region has not decided which step is the main one, and that is the half of the old line that holds.

**Accent on text only from 19px bold.** `#FF5A00` on white is **3.13:1**. Consequences, all visible
in the build: the price takes the accent at 22px/800 and never at 13px; a state caption never takes
it; where a small label must be marked, the accent lives in a border or a 2px marker instead of the
type. **Two amendments, 2026-08-12 (A10 closed, owner's call).** The ground is no longer WCAG - the
owner accepts sub-AA accent text for this shop, so the rule stands on what it always really was:
the accent is the loudest thing here, so it is spent on large type or not at all. And **the surface
decides as much as the size** - on the inverse ground the accent reads 5.45 and is allowed at any
size, on a warm surface it loses 0.16 and a 30px mark can still miss. Five classes ship under AA,
named and measured in `DESIGN-artifacts.md`.

**The price colour is driven by data, not by hand.** A price **with a discount** takes the accent; a
price without one stays ink. Implemented with `:has()` on the struck old price, so the colour cannot
drift from the fact. Consequences: out of stock carries no accent; in coach mode the live figure is
the **tier** price and the retail block is reference.

**The rating star is deliberately yellow, not orange.** It is a mark of a *review*, not of an action.
Sharing the accent would make "someone rated this" look like "press here". It sits next to the figure
that carries the value (4.8), so the 3:1 non-text threshold does not apply to it.

**`--gold` and `--warn` share a value and stay two tokens.** One is the bonus figure, the other is a
warning; they can diverge later and the code should not have to be rewritten when they do. Two roles,
two tokens, even at the same value.

## 2. Typography

| Face | Where | Why |
|---|---|---|
| **Oswald** 500/600/700 | H1, section headings, logo wordmark, empty-state headings | condensed, athletic, holds a long Ukrainian headline without shrinking |
| **Inter** 400-700 | everything else | neutral workhorse, wide Cyrillic coverage |
| **IBM Plex Mono** 500/600 | prices, counters, phone, code, OTP, any figure that must line up | `tabular-nums`: a figure that changes must not move its neighbours |

Headline letter-spacing `-.01em` on Oswald. No third display face; a fourth weight is a smell.

## 3. Geometry

| Token | Value | Use |
|---|---|---|
| `--r` | `12px` | cards, panels, dialogs |
| `--rs` | `9px` | inputs, chips, small controls |
| `--sh` | `0 1px 2px rgba(20,20,15,.05), 0 10px 30px rgba(20,20,15,.05)` | the only shadow |

One shadow for the whole product. Depth is a rare signal: if everything floats, nothing does.

## 4. Icons

One set for the whole product: **Solar**, inline SVG, `currentColor`. Brand marks (Telegram, Viber)
are an exception and are **badges, not interface icons** - a filled disc with a knocked-out glyph,
because at 16px an outline mark collapses. They carry no brand colour: grey at rest, accent on hover.

## 5. Motion

Almost none, by decision. Transitions are 150-220ms on colour, background and transform. The spinner
is the only continuous animation and it respects `prefers-reduced-motion`. No entrance animation on
content: the calm principle applies to movement too.

## 6. Where the build disagreed with the concept

Kept as a table because the layout is the living truth and each attribute needs a reason.

| Attribute in `concept.md` | What the build does | Resolution |
|---|---|---|
| "the accent carries the state" | states are said by fill + colour + a 2px marker, never by weight | **build wins.** A 600->800 switch widens the label and a long name takes a second line, so the list jumps under the cursor. Metrics stay untouched. |
| "medal marks the loyalty tier" | a **filling jar** marks it | **build wins.** A medal says "you competed"; a tier is not a competition. The jar is the shape of the product the shop sells, and the mechanic is literally in the drawing. |
| "gold leads the loyalty story" | orange leads it, amber is kept for **burn** only | **build wins.** All-amber made the whole story brown, and `#8A5A0E` next to bronze read as the same metal. Amber now means "watch this". |

## 7. State tokens, and both halves of every one

A state is a TOKEN, never a style written into a component class: `:hover` reads a `*-hover` role,
`:focus-visible` reads a ring, disabled reads a mark. No new hex and no new number appears inside a
class, which is why a theme change is three lines here instead of forty edits across the components.

**Every state token has a value in both themes, and the pair is NOT a mirror.** Contrast is measured
against the opposite ground, so the dark side takes a stronger tint rather than the same one. The
values below are read out of the built page in a browser, in both themes, not transcribed from the
source.

| Token | Light | Dark | vs page, light | vs page, dark |
|---|---|---|---|---|
| `--bg-action` | `#FF5A00` | `#FF5A00` | 3.13 | 6.32 |
| `--bg-action-pressed` | `#E85200` | `#C74700` | 3.72 | 4.07 |
| `--bg-action-hover` | `#FFF1E8` | `#391600` | 1.11 | 1.21 |
| `--bg-action-selected` | `rgba(255,90,0,.10)` | `rgba(255,90,0,.10)` | tint over the ground | tint over the ground |
| `--line-control` | `#1C1C1C` | `#FAF9F7` | 17.04 | 18.78 |
| `--line-control-hover` | `#6E6A62` | `#95856C` | 5.38 | 5.51 |
| `--line-action` | `#FF5A00` | `#FF5A00` | 3.13 | 6.32 |
| `--mark-inactive` | `#D9D9D9` | `#39332A` | 1.41 | 1.58 |
| `--mark-disabled` | `#CCCCCC` | `#5B5B54` | 1.61 | 2.89 |
| `--ring-focus` | 3px of `--tint-orange-15` | 3px of `--tint-orange-45` | a composite, see below | a composite, see below |
| `--ring-focus-control` | 2px page + 4px `--line-action` | 2px page + 4px `--line-action` | 3.13 | 6.32 |

**Which rows the 3:1 non-text threshold actually judges.** Lines and rings, because they are the
boundary a person has to perceive: `--line-control` and `--line-control-hover` clear it in both
themes by a wide margin, and **the focus ring on a control clears it too, because its outer band IS
`--line-action`: 3.13 light and 6.32 dark**. The FILLS are a different question - a hover wash and a
selected tint are not asked to be perceivable against the page on their own; the element they sit
under keeps its own border and its own label, and that is what carries the boundary. The disabled
mark is deliberately the lowest number in the table: dimming is its whole job.

`--ring-focus` is a 3px halo of an alpha tint on a field rather than a solid band, so its ratio is a
composite over whatever ground the field sits on and no single number is written here rather than a
wrong one being written confidently. The CONTROL ring is the one the keyboard path depends on, and
it is measured.

**`focus-visible`, never `focus`.** The ring is for the person moving by Tab and in the way of the
person who clicked.

## 8. Contribution to the system

**New appears in `design/system/` first, then on the screen. Never the other way round.** A screen
declares no styles of its own; what it lacks is an order for the system rather than an exception on
the page. In addresses:

- a **component** - `design/system/components/<name>.css` plus its page in `design/kit/` with all
  five blocks, a row in `design/kit/_nav.js` in its own LEVEL group, a row in `inventory.md` with
  that level, and an `@import` into its own level group in `index.css`, not at the end of the file.
  Missing any of the five means the component is not finished.
- a **rule of use** - a row in `architecture.md`, section «Правила вживання», with «taken from»
  filled in, plus an «Обмеження» sub-item on every component page the rule names.
- a **composition** - three named screens make it a file in `design/system/patterns/` with a page and
  a registry row; two leave it as markup in the candidates table on `patterns.html`.
- a **value** - into `tokens.css` at its own level, a colour role semantic and a raw value primitive,
  a state token in both themes at once.

The full version with its reasons is `design/kit/docs/architecture.md`, section J, visible on
`design/kit/architecture.html`; the ten-line version that a new session reads on entering the folder
is `design/system/CLAUDE.md`.

## 9. Sources

`DESIGN-artifacts.md` (origin of values) · `design/concept/docs/concept.md` (attributes and taste) ·
`design/concept/docs/references.md` · `design/kit/kit.css` (the code this file was read from at
stage 07; deleted at 8.8, and the values moved to `design/system/tokens.css` unchanged) ·
`design/kit/docs/inventory.md` (what the language has to dress) · `docs/decisions.md` sections 4-8.
