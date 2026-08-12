# Stack - product design language

**Formed from the code on 2026-08-04 (stage 07).** This file documents the language **as it is
actually built** in `design/kit/kit.css`, checked against `design/concept/docs/concept.md`. Where the
build and the concept disagreed, the disagreement is listed at the bottom rather than smoothed over.

`DESIGN-artifacts.md` stays the first source: it holds the **origin** of every value (which brand
plate pixel, which attribute, which user decision). This file holds the value **in force** plus the
rule that governs it. Two files, one line of values, no re-derivation:

```
DESIGN-artifacts.md  ->  design/kit/kit.css  ->  design/system/tokens.css
   origin of value          value in force        primitive + semantic (stage 08)
```

---

## 1. Colour

Read out of the live `:root` in `kit.css`. Origin column carried over from `DESIGN-artifacts.md`.

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

**One orange per view.** The accent means exactly one thing: where to press. A second filled orange
button on a screen means the screen has not decided which step is the main one.

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

## 7. Sources

`DESIGN-artifacts.md` (origin of values) · `design/concept/docs/concept.md` (attributes and taste) ·
`design/concept/docs/references.md` · `design/kit/kit.css` (the code this file was read from) ·
`design/kit/docs/inventory.md` (what the language has to dress) · `docs/decisions.md` sections 4-8.
