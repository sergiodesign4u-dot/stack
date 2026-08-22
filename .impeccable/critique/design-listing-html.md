# Critique - design/listing.html

Method: dual-agent (A: design review, isolated · B: detector + browser evidence, isolated)
Date: 2026-08-22 · Surface mode: Operate · Applicable maximum: 40 (no heuristic n/a)
Reason this run exists: stage 11 branch B introduced a look that did not exist before
(`@view-transition { navigation: auto }`), and the stage pack requires a critique for it.

## Design Health Score - 20/40

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 1 | `listing-filtered` at 360: `.ltool` hidden, so the only visible count is the H1's `84 товари` over 12 rendered products |
| 2 | Match system / real world | 3 | Domain-native language; but `Під замовлення` carries the same accent cart icon as in-stock, with no lead time |
| 3 | User control and freedom | 1 | On mobile two active filters are an orange `2` and nothing else - `.afilters` (clear-all + removable chips) is `display:none` below 860 |
| 4 | Consistency and standards | 2 | Sheet runs two commit models; card CTA icon-only vs PDP's labelled; count reads 84/12/0 across siblings |
| 5 | Error prevention | 2 | Counts per option and a live `Застосувати (47)` are genuinely good; `Тип протеїну` renders 6 plain links that discard pending checkbox state |
| 6 | Recognition over recall | 1 | Mobile filter state must be remembered; a badge reading "2" is a count, not recognition |
| 7 | Flexibility and efficiency | 1 | No accelerators for the primary persona; 46 focusables before the first product at 1280, no skip link |
| 8 | Aesthetic and minimalist | 3 | Restrained, accent spent on two things; but 12 data points in a 151px card at 360, three pagination mechanisms |
| 9 | Recognise / diagnose / recover | 3 | Excellent empty and error documents; but `listing.html` has no `#wf-toast` node - no in-page error channel |
| 10 | Help and documentation | 3 | The "how to choose" guidance is correct and specific, and sits below 84 products |

## P0 - the view transition ships on values nobody chose

VERIFIED in the project's own instrument (Chrome 151), read from inside a live transition:

    -ua-view-transition-group-anim-root   250ms  linear
    -ua-view-transition-fade-in           250ms  linear
    -ua-view-transition-fade-out          250ms  linear

CORRECTED WHEN THE READING WAS REPEATED BY A REPEATABLE INSTRUMENT (`motion.mjs --view`, written
after this critique): the curve is **`ease`, not `linear`**. A CSS animation spells its curve twice -
`linear` on the effect, which is a default, and the real `animation-timing-function` on every
keyframe. The first reading took the effect and was a true reading of the wrong half. The finding
gets STRONGER, not weaker: `ease` is the precise value this stage removed from 817 of 818 functions.

250ms is not `--dur-fast` (150), not `--dur-base` (220), not `--dur-slow` (330). `view-transition-name`
occurs ZERO times as a declaration in the whole tree (4 matches, all prose or a regex).

This is the exact defect the stage indicts: `motion.md` A2 calls `ease` on 817 of 818 functions "the
value a declaration gets when nobody names one". **Linear at 250ms is the value an animation gets
when nobody names one** - and it is on the single largest arrival in the product, the one feature the
owner personally chose.

Two honest outcomes, and the owner picks:
1. Override the root pseudo-elements onto the registry (`--dur-base`/`--ease-exit` out,
   `--dur-slow`/`--ease-enter` in), add both rows to `motion.md` section D with their origin, and give
   the transition something to carry (`view-transition-name` on the card photo and name, matching the
   PDP's gallery and H1) so `listing -> product` becomes a real CONNECTION move.
2. Take branch A after all and delete the rule. A 250ms linear cross-fade that fires identically on
   `listing -> product` (a real move), `listing -> ?page=2` (the same page) and five related links
   pointing at `listing.html` itself is worse than no transition.

## P0 - mobile filtered listing states the wrong count and offers no way out

`.afilters` and `.ltool` are both `display:none` below 860. H1 says `84 товари` over 12 products.
`listing-empty.html` gets it right (`0 товарів`), which proves it is a page never re-checked, not a
convention.

## P1 - the listing's primary action is silent

`listing.html` never calls `wfToasts()` and has no `#wf-toast` node; ten `.cartbtn` have no handler.
The toast infrastructure is finished and tuned this stage. The highest-frequency RESPONSE moment in
the product has no answer.

## P1 - the filter sheet runs two commit models at once

`Тип протеїну` = 6 plain `<a href>`; every other group waits for `Застосувати`. Tapping the former
discards the latter with no warning. That is the coach's exact working pattern.

## P1 - product-card metadata drops below the legibility floor on mobile

VERIFIED independently twice: **52 elements with text under 11px at 390, 10 at 1280** (50 and 9
excluding stand chrome). `.pbrand`, `.perserv`, `.bonus`, `.pold`, `<b>` price-per-serving all
measure 12px at desktop and **10px on the mobile-first target**. The stage-10 ramp's narrow end went
below the floor.

## P2 - the card promises trust it does not carry, and no coach price exists on any of 92 screens

## P3 - `ПОПУЛЯРНЕ` renders uppercase, the exact string `voice.md` bans by name

## Withdrawn on verification

- `@view-transition` reported ABSENT from `document.styleSheets` - **false negative of the probe**: a
  `CSSImportRule` keeps its rules on `.styleSheet`, not `.cssRules`, and this product puts 100% of
  its css behind one `@import` chain. Two independent walks made the same error. The rule is live:
  `base.css :: CSSViewTransitionRule`.
- `em-dash-overuse` on `motion.html` - 0 U+2014 in the file; the rule's regex counts `--token` names.
- 2 `layout-transition` on `motion.html` - documentation prose inside `<code>`, no style applied.
- 24 `text-occlusion` - the collapsed stand-chrome navigator, clipped as intended.
- `low-contrast` white on `#FF5A00` = 3.13:1 - real, and already recorded as a pre-existing debt by
  `theme.mjs` ("27 forms fail in both themes"). Confirmation from a third instrument, not new.

## Instrument findings about the instruments

- The CLI detector reads only the HTML handed to it and follows neither `<link>` nor `@import`. Same
  page, same moment: **CLI 1 finding, in-browser detector 84**. On a corpus where 100% of styling is
  external, that is a zero from an instrument that cannot see the class.
- The in-browser detector logs 86 lines under a header claiming 84 - it undercounts its own output.
- **The stage's own census cannot see the stage's flagship feature.** `motion.mjs` reads
  `transitionDuration` and `animationDuration` off elements; a view transition lives on
  pseudo-elements that exist only during a navigation. The green counter was never asked the one
  question this stage exists to ask.

## Resolution - step 6, the same day

**P0 view transition: outcome 1, values only.** `base.css` now names all three root pseudo-elements
on the registry - `--dur-slow` on all three (a whole document arriving is an APPEARANCE and takes the
top rung, 80ms slower than the browser default, said out loud), `--ease-exit` on what leaves,
`--ease-enter` on what arrives, `--ease-standard` on the group. The `reduce` block was widened from
`(*)` to `(*)` plus `(root)`, because the new rules raised the specificity the override has to beat.

Measured after the repair by `motion.mjs --view`, which did not exist when this critique ran:

    ok ::view-transition-group(root)  330ms (--dur-slow)  --ease-standard  -ua-view-transition-group-anim-root
    ok ::view-transition-new(root)    330ms (--dur-slow)  --ease-enter     -ua-view-transition-fade-in
    ok ::view-transition-new(root)    330ms (--dur-slow)  --ease-enter     -ua-mix-blend-mode-plus-lighter
    ok ::view-transition-old(root)    330ms (--dur-slow)  --ease-exit      -ua-view-transition-fade-out
    ok ::view-transition-old(root)    330ms (--dur-slow)  --ease-exit      -ua-mix-blend-mode-plus-lighter
    поза реєстром: 0 · при reduce анімацій 0 · підміна --dur-slow на 7.77s -> усі 5 поїхали за токеном

Falsified before it was believed: with the override commented out the same run prints 5 lines of
ПОЗА РЕЄСТРОМ at 250ms `ease`. A check that has never failed has not been shown to work.

**The second half of outcome 1 - `view-transition-name` for element continuity - is NOT taken, and
the reason is a measured constraint rather than a preference.** A `view-transition-name` must be
unique per document; a listing renders 12 product cards, so one declaration in `product-card.css`
would produce 12 duplicates and Chrome skips the whole transition rather than half of it. Unique
per-card names cannot come from a component stylesheet, and they cannot come from a screen file
either - stage 11 bans motion declarations there. It is an order for the system, filed in
`backlog.md`, not a line to add here.

**The other four findings are NOT stage-11 repairs and were not made silently.** The mobile filtered
count, the silent cart, the sheet's two commit models and the sub-11px type live in content, in
`wireframes/` (frozen since stage 05) and in the responsive ramp of stage 10. They are filed as
rows with their evidence; the owner decides when they run.
