# Stack

A mobile-first sport nutrition store for the Ukrainian market, built around the **coach ordering
channel**: coaches and gyms order in bulk for their athletes, each athlete with a different goal and
dosage. Beginners and regulars are the secondary audiences. Thirteen stages of design engineering,
from research to handoff, every one of them visible in a browser.

## Three links

| | |
|---|---|
| **Repository** | https://github.com/sergiodesign4u-dot/stack |
| **The product** | https://sergiodesign4u-dot.github.io/stack/design/index.html - 141 coloured screens with their states, clickable |
| **The design system** | https://sergiodesign4u-dot.github.io/stack/design/kit/overview.html - every component as a card, each with its own page |

**Start here:** [the handoff page](handoff/handoff.html). It answers the four questions no other page
does - where the package ends, which theme is primary, who decides after the handover, and what was
deliberately not done.

**The project route:** https://sergiodesign4u-dot.github.io/stack/ - every stage and its status.
Each page carries the same left sidebar, rendered from one registry (`/_nav.js`), so there is no
page list to maintain here.

## Status

| # | Stage | Status | Where |
|---|-------|--------|-------|
| 01 | Foundation research | Done | [research.html](research/research.html) |
| 02 | Personas + JTBD | Done | [personas](research/personas.html) · [jtbd](research/jtbd.html) |
| 02+ | CJM, as-is and to-be | Done | [as-is](research/cjm-as-is.html) · [to-be](research/cjm-to-be.html) |
| 03 | Information architecture | Done - base layer and detail layer | [flows](ia/flows.html) · [sitemap](ia/sitemap.html) |
| 04 | Wireframes | Done - grey clickable prototype, frozen since stage 05 | [overview](wireframes/overview.html) |
| 05 | Voice | Done - rulebook plus microcopy inventory | [voice.html](voice/voice.html) |
| 06 | Concept | Done - the visual language on two screens | [concept](design/concept/concept.html) |
| 07 | UI + visual | Done - the component kit and its inventory | [kit](design/kit/kit.html) |
| 08 | Tokens + components | Done - two token levels, a dark theme over the semantic block, a stand page per component | [showcase](design/kit/overview.html) |
| 09 | Patterns | Done - compositions the product repeats, and the rule for taking one | [patterns](design/kit/patterns.html) |
| 10 | Responsive | Done - two breakpoints in `rem`, named by the change and not by a device | [responsive](design/kit/responsive.html) |
| 11 | Animation | Done - three durations, three curves, all through tokens; reduced motion by overriding the same tokens | [motion](design/kit/motion.html) |
| 12 | Rollout | Done - the whole MVP scope is in colour, the coverage map green for the first time | [all screens](design/overview.html) |
| 13 | Handoff | **In progress** - steps 1 to 5 done: the audit, the behaviour spec, the map, the accessibility checklist and this page. Steps 6 to 8 owe the release, the one-shot prompt and two examination runs | [handoff](handoff/handoff.html) |

This table is the only status board in the repository. `/_nav.js` carries the same state as a
registry; a third copy would only drift from the other two.

## The handoff package

Four documents that no page of the product or of the system answers. Each one references code rather
than duplicating it: a component and its variant instead of the css, a token name instead of the
number, an address in `microcopy.md` instead of the sentence a user reads.

- **[behaviour.md](handoff/docs/behaviour.md)** - what the product DOES: every flow step by step,
  every state, every deliberate dead end. 152 rows, each naming its source, plus six questions that
  no file in the repository answers and that were not filled with a plausible median.
- **[map.md](handoff/docs/map.md)** - what each screen is made of, and the reverse list: if I change
  this token, what moves. Generated from the corpus, so the map and the instrument cannot disagree.
- **[a11y.md](handoff/docs/a11y.md)** - 26 rows, 18 confirmed by a run and 8 debts. «Confirmed»
  means a command that was run, never a memory of the stage that wrote the rule.
- **[onboarding-gaps.md](handoff/docs/onboarding-gaps.md)** - what a reader with a clean context
  could not understand, and what they understood WRONGLY, which is the more expensive half.

## Repository

```
_nav.js  _nav.css  index.html    roadmap registry, its look, and the entry point
research/     stages 01, 02, 02+   research, competitors, benchmark, AARRR, UX patterns,
                                   personas, JTBD, CJM
ia/           stage 03             base layer (flows, concept map) + detail layer
                                   (sitemap, structure, per-node specs)
wireframes/   stage 04             grey clickable prototype, frozen after Voice
voice/        stage 05             voice rulebook + microcopy inventory
design/       stages 06-12         concept/, system/, kit/, and the coloured product flat in the root
handoff/      stage 13             the four documents above + handoff.html
docs/         decisions.md (why anything is the way it is) + playbook/
tools/        the checks a step runs before it says done - see tools/README.md
```

Each stage folder holds its sources of truth in `docs/` and its html visualisation flat in the root.
`index.html` is always the home page of the folder you opened; a hub is always `overview.html`.

**There is no build.** No `package.json`, no dependencies, no bundler. Pages open from the file
system; the instruments in `tools/` raise their own static server and drive Chrome over CDP.

**One thing that surprises everyone:** every coloured screen loads `../wireframes/_nav.js`. The grey
folder is frozen but it is not dead - it is the runtime that renders the header, the footer, the
tab-bar and every dialog. Deleting it breaks all 141 pages. The reasoning is in
[behaviour.md](handoff/docs/behaviour.md), section «The runtime».

## The design system

- **[Why it is the way it is](design/kit/why.html)** - the guide. Where the visual language came
  from, how the values reached the tokens, how to use the system and how to grow it.
- **[The showcase](design/kit/overview.html)** - every component as a card, grouped by the ladder of
  levels; each card opens a page with anatomy, variants, when to use, rule and anti-rule, and states
  in both themes.
- **[Architecture and the rules](design/kit/architecture.html)** - the decision sheet, the rules of
  use (section I) and the contribution rule (section J).
- **[Backlog](design/kit/backlog.html)** - what the system could not do, and what was found and
  deliberately not fixed.

**The contribution rule, in one line:** new appears in `design/system/` first, then on the screen,
never the other way round. A screen declares no styles of its own; what it lacks is an order for the
system, and it takes six things to fill that order - the css, a stand page, a registry row, an
inventory row, an `@import` in its own level group, and a card in the hub.

## Before any step says done

`node tools/accept.mjs` walks every screen at 390 and looks for sideways scroll, a console error, an
em dash, a curly apostrophe and a doubled breadcrumb. `node tools/handoff.mjs` asks whether the
handoff still references rather than duplicates. Neither needs a server started or a page list typed:
each finds its own. The whole set, with what each one is for and every wrong version it went
through, is in [tools/README.md](tools/README.md).

## Key documents

- [CLAUDE.md](CLAUDE.md) - the project rules in force (200-line budget)
- [AGENTS.md](AGENTS.md) - entry point for an external reviewer
- [docs/decisions.md](docs/decisions.md) - decision records and the build journal
- [DESIGN-artifacts.md](DESIGN-artifacts.md) - the visual language and the origin of every value
- Sources of truth: [`research/docs/`](research/docs/) · [`ia/docs/`](ia/docs/) ·
  [`wireframes/docs/`](wireframes/docs/) · [`voice/docs/`](voice/docs/) ·
  [`handoff/docs/`](handoff/docs/)
