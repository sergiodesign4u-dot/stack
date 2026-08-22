# Stack - project rules

Rules that must act in the next session. Not a journal and not a status board. **What was done and
why lives in `docs/decisions.md`** (never loaded). **Status lives in `README.md` and `/_nav.js`, and
nowhere else** - a third copy only drifts from the other two. Budget: **200 lines**. A new rule
enters by replacing or generalizing an existing one, never by being added alongside. Over budget is
not "the file got big", it is a signal that two rules inside already contradict each other.

## What Stack is

A mobile-first sport nutrition store for the Ukrainian market, built around the **coach ordering
channel** as its primary business model: coaches and gyms order in bulk for their athletes, while
beginners and regulars are secondary audiences. Ukraine only, fully responsive up to desktop.

## Jobs (selected)

**Primary.** A coach or gym manager builds orders for several athletes at once, each with a different
goal and dosage, and keeps their athletes' trust. **Secondary 1.** A beginner answers a few simple
questions and gets a safe, credible set for one goal. **Secondary 2.** A regular repeats their staples
without rediscovering them. Supporting: verify a product is safe, certified and correctly dosed
(Job 4, the trust job); get bulk pricing through the coach; review loyalty status (Job 6). **The full
wording lives in `research/docs/jtbd.md` and is not re-typed here.**

## Audience

- **Primary - coaches and gyms** (25-45, buying for 5-30+ athletes). Domain experts. They need
  speed, bulk ordering and account management, not guidance. Driver: operational efficiency.
- **Secondary - beginners** (18-35). Low trust, afraid of side effects and wrong dosage; safety and
  credibility signals are critical. **Supporting - regulars** (22-40, the same 2-5 products): already
  converted, driven by one-tap reorder and never running out. Both in `research/docs/personas.md`.

**`primary` decides.** Where two decisions conflict, the coach wins. Secondary scenarios must work,
but the interface is not built around them.

## MVP scope

In: coach ordering flow (saved client list, per-client order tagging, per-client history, coach
tier price) · goal-to-product guidance (6 goal tiles; the quiz is post-launch) · product pages with
trust signals leading, not buried · catalog with smart filtering · reorder from order history ·
checkout and buyer account (orders, addresses, wishlist, loyalty) · **order status notification by
e-mail or SMS** · **a dark theme**.
Out: native app · loyalty gamification · live chat and coach consulting · custom formulation ·
private label. A paid coach tier (Free / Pro) is a **hypothesis**, not a commitment.

## Design principles

1. **Trust first, then sell.** Every page reduces doubt before it invites action. Composition,
   dosage, origin and certification are the lead, not a detail under a fold.
2. **One clear next step.** Never a blank stare; exactly one main action per screen.
3. **The coach is a channel, not an edge case.** Multi-client ordering is a first-class flow.
4. **Calm and confident.** No countdown timers, no urgency, no celebration.
5. **Plain language, deep information.** Everyday words in labels and navigation; depth below.

Conflicts resolve to #1.

## Locked product decisions

1. **Coach model = coach-as-buyer**, not a marketplace or directory: saved client list, per-client
   order tagging, per-client order history. Coach is a **role activated on an existing account**.
2. **Goal guidance = 6 goal tiles** in MVP (Набір маси · Схуднення · Відновлення · Енергія ·
   Імунітет · Витривалість); the quiz dialog is the enriched post-launch version.
3. **Pricing = a published coach tier + buyer loyalty, and buyer loyalty is TWO independent
   mechanisms:** a personal discount on lifetime spend (3 tiers, never expires) and a bonus account
   (~1% accrual, bonuses **expire after 3 months**, ledger shows accrual and burn). All numbers `[?]`.
4. **Reorder = one-tap repeat from order history** in MVP; "my staples" is post-launch.
5. **Auth = one unified passwordless dialog for every role.** Phone-OTP first, secondary Google /
   Apple / e-mail, e-mail also by code. **No password, no forgot-password, no separate coach login.**

**Every number that needs real data stays `[?]`** - coach tier %, loyalty thresholds, accrual rate,
consumption cycles, AOV, delivery tariffs. An invented number poisons every stage below it.

## How work runs

**Step by step, not autonomously.** One step, then show the result and wait. Missing input stops the
step; it is not replaced by a median. Before step 1 each stage checks that the files it reads really
exist and lists what is missing.

**Nothing is invented, everything is read out.** Cite the source of each fact; no source means `[?]`.
Competitor facts come from a page opened in this session, never from memory.

**Acceptance is in the browser, not in a table.** Open it, walk every state, narrow to 360px, and
only then say done. The instruments live in `tools/`, whose README is their index; they find their
own pages **and reach them the way a visitor does** - a handed subject can be the wrong one, and a
door only the driver has measures a different product. **Fix through a rule, not by hand-editing one
file**; a check rebuilt from memory is a hand fix, a repeatable one goes in `tools/` with its wrong
versions. **A repair applied by rule still has to know the KIND of every file it opens.**

**Ask the OUTPUT, and ask it of the whole corpus.** A rule stated in a comment has no check under it,
and **a claim about the corpus goes stale in silence** - the event that stales it happens in another
file - so it is re-asked, not re-read. **A comparison whose two sides differ in more than the thing
being measured is not a proof:** name the reference by hand when the tree holds earlier work, and
read the whole report - one read through `tail` is not a read.

**A zero from an instrument that cannot see the class is not a zero.** Before a green counter is
believed, name what would turn it red: a check that has never failed has not been shown to work.
Every declared list gets the same test - an allow-list, a registry row or an exception that covers
nothing fails as loudly as an undeclared case. **A repair is re-checked by the instrument that found
the defect**, because a repair stales its own neighbours. **A number nobody maintains is removed,
not corrected.** **And an instrument that shows one layer at a time cannot say «clean»** - only «one
more round», and the round count is invisible in its own output.

**A path named in prose is a TAIL, not an address** (`tools/paths.mjs`): it resolves against the
tree, not against the folder it was typed in. **A record names history, a rule names an address** -
`docs/decisions.md` may keep a file's old name, this file may not.

**Critique runs on two instruments.** Claude and Codex (plugin `codex`, **read-only stated
explicitly**), sets taken independently, dedup afterwards. Codex owns what is falsifiable in the
source; "breaks at 360" and pixel checks stay with Claude in a browser. Every critique log carries
**who found it** and **withdrawn on verification** with a reason, or the finding returns next time
in the same words.

**A repeated prompt is a rule.** Typing the same instruction a third time means it belongs in this
file, called by a trigger word.

## Language and typography

- Internal md (this file, `*/docs/*.md`) - **English**. Exception, because these are real interface
  strings: SEO copy inside `ia/docs/pages/*.md`, and the dictionary, examples and banned phrases in
  `voice/docs/*.md`.
- Chat - Russian / Ukrainian. Html pages - **Ukrainian** (local market, set once, inherited).
- Registry labels in `/_nav.js` are render text: same language as the pages. Mixed language in the
  sidebar is a defect.
- **Three dashes, three jobs.** `-` inside a sentence · `–` a range (`А–Я`) and an empty table cell,
  which is the "no value" mark · `—` nowhere in project output. One apostrophe form: `'`. The `ви`
  form.

## Ownership of text and values

**Text splits by KIND of string, not by stage.** SEO copy (title, description, H1, SEO body) belongs
to the IA node - voice aligns it and syncs it back into `ia/docs/pages/<node>.md`, and the affected
`ia/<node>.html` is rebuilt the same step. Interface strings (buttons, field labels, state text,
toasts) belong to `voice/docs/microcopy.md`; the IA node states WHAT information is needed there, not
the wording. No product string exists in two editions.

**Values move, they are never re-derived.** One line runs through the stages and is not recomputed
once: `DESIGN-artifacts.md` (origin of every value) -> `design/system/tokens.css`, primitive then
semantic; each step adds a level, never rewrites it. A value changes only by a decision said out
loud as "variable -> value -> why", never as a side effect of a refactor - and **a geometric
relation is written as the relation, not the number it resolves to.** **A one-line opt-in buys a
MECHANISM, not its values:** what it renders is a default dressed as a decision.

**`personas.md` has one writer** - CJM step 4. Other stages read it read-only; a contradiction is
reported back into the persona as a finding, not patched silently and not re-described locally.

**md is alive, html does not freeze.** Change an md that already has a published page, and the same
step rebuilds the affected section of that page. Cannot rebuild - put a visible "updated after
publication" block on it and say so out loud.

**Every md gets a visible place on html** - its own page, a named section (registered in
`NAV_SECTIONS`), or a satellite page declaring `NAV_ACTIVE`. An artifact nobody can see in a browser
does not exist for whoever makes the decision. Service files (`CLAUDE.md`, `AGENTS.md`, `README.md`,
`docs/decisions.md`, `tools/`) need no page - they are read by whoever builds, not by whoever decides.

## Repository shape

```
/_nav.js /_nav.css /index.html   roadmap registry + look + entry point of the project
research/     stages 01, 02, 02+  research.md · competitors · benchmark · aarrr · ux-patterns
                                  personas · jtbd · cjm-as-is · cjm-to-be
ia/           stage 03            base layer (flows, concept-map) + detail layer (sitemap,
                                  structure, blocks, docs/pages/<node>.md + ia/<node>.html)
wireframes/   stage 04            grey prototype, FROZEN after Voice; docs/conventions.md is its contract
voice/        stage 05            voice.md rulebook + microcopy.md inventory
design/       stages 06-09        concept/ · kit/ (showcase + docs) · system/ (code) · visuals/
docs/         decisions.md, playbook/
tools/        the instruments and their README, which is their index
```

**`index.html` is the entry point of the folder you opened, and nothing else** - at the repo root it
is the project, inside a stage folder it is the home page of the product. A hub is always
`overview.html`; the one exception by name is the detail-IA hub `ia/structure.html`.

**The sidebar has one source.** Structure comes from `/_nav.js`, look from `/_nav.css`. A page
carries an empty `<aside id="sidebar"></aside>`, declares `NAV_BASE`, optionally `NAV_SECTIONS`, and
`NAV_ACTIVE` + `NAV_ACTIVE_LABEL` when it is not in the registry. **A page never describes a `nav-*`
rule.** The only manual edit is a row in the registry and `done: true` when a page is ready;
active / Next / Soon, the accordion and relative links are computed.

**Colour never lands on `wireframes/`.** The grey prototype owns structure, text and states; colour
lives in copies under `design/`, which own the visual layer only. **Counting happens on the grey
corpus** (the whole product), **proving happens on the coloured one** (a selection); neither replaces
the other, and a share measured on the selection is not a share of the product.

**A folder is created by its own stage** - no empty folders ahead of the work, no `.gitkeep`.

## Contribution to the system

**New appears in `design/system/` first, then on the screen, never the other way round.** A screen
declares no styles of its own; what it lacks is an order for the system and goes to `backlog.md`.
«Залишаємо» about a VALUE -> a token of its level in `tokens.css`, **both themes only if it is a
COLOUR** (a duration, a curve and a width are not, and take no pair); about a COMPONENT ->
`components/<name>.css` plus its page, registry row, inventory row and `@import`, all four **in its
own LEVEL group**; about a COMPOSITION -> `patterns/<name>.css` plus its page, from three named
screens. Addresses: `architecture.md` J; in code: `design/system/CLAUDE.md`.

## Pointers

`DESIGN-artifacts.md` - the visual language. `design/kit/docs/architecture.md` - the decision sheet,
the rules of use and the contribution rule; **a ladder is read by JOB, not by shape**.
`docs/decisions.md` - why anything above is the way it is.
