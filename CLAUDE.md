# Stack - project rules

Rules that must act in the next session. Not a journal and not a status board.
**What was done and why lives in `docs/decisions.md`** (never loaded). **Status lives in
`README.md` and `/_nav.js`, and nowhere else** - a third copy only drifts from the other two.
Budget: **200 lines**. A new rule enters by replacing or generalizing an existing one, never
by being added alongside. Over budget is not "the file got big", it is a signal that two rules
inside already contradict each other.

## What Stack is

A mobile-first sport nutrition store for the Ukrainian market, built around the **coach ordering
channel** as its primary business model: coaches and gyms order in bulk for their athletes, while
beginners and regulars are secondary audiences. Ukraine only. Mobile-first, fully responsive,
scaling up to desktop; a native app is out of MVP scope.

Core differentiator: a trusted, guided path from "I want to achieve X" to "here is the safe, right
product set for you" - through the coach as the trusted intermediary, and through transparent
product information (composition, dosage, origin, certification) for the self-guided buyer.

## Jobs (selected)

**Primary.** When I am a coach or gym manager ordering supplements for my clients, I want to quickly
build orders for multiple people with different goals and dosages, so that I can serve my athletes
reliably and keep their trust in my recommendations.

**Secondary 1.** When I am a beginner overwhelmed by the catalog, I want to answer a few simple
questions and get a clear, safe, credible product set for my goal, so that I can start confidently.

**Secondary 2.** When I am a regular buyer running low on my staples, I want to reorder in one or two
taps without rediscovering what I need.

Supporting jobs: verify a product is safe, certified and correctly dosed (Job 4, the trust job);
get bulk pricing through my coach; review loyalty status (Job 6).

## Audience

- **Primary - coaches and gyms** (25-45, buying for 5-30+ athletes). Domain experts. They need
  speed, bulk ordering and account management, not guidance. Driver: operational efficiency.
- **Secondary - beginners** (18-35, little or no knowledge). Low trust, afraid of side effects and
  wrong dosage. Driver: confidence and clarity. Safety and credibility signals are critical.
- **Supporting - regulars** (22-40, same 2-5 products repeatedly). Already converted. Driver:
  convenience and reliability, one-tap reorder, never running out.

**`primary` decides.** Where two decisions conflict, the coach wins. Secondary scenarios must work,
but the interface is not built around them.

## MVP scope

In: coach ordering flow (saved client list, per-client order tagging, per-client history, coach
tier price) · goal-to-product guidance (6 goal tiles; the quiz is post-launch) · product pages with
trust signals leading, not buried · catalog with smart filtering · reorder from order history ·
checkout and buyer account (orders, addresses, wishlist, loyalty) · **order status notification by
e-mail or SMS** (added to MVP 2026-08-04 from CJM zone Z3: the As-Is bottom is silence during the
wait, and status inside the account only reaches someone who thinks to look. A notification, not a
screen, so the 19 MVP screens are unchanged) · **a dark theme** (added to MVP 2026-08-13, built
2026-08-13 as stage 08 step 7: `[data-theme="dark"]` overrides the semantic block and nothing
else - 4512 role reads and **0** raw colour values in the components are what makes that possible.
The theme is the **stress test** of that claim, not decoration; the switch lives in the stand's
panel, the product's own is stage 08 step 8).

Out: native app · loyalty gamification · live chat and coach consulting · custom formulation ·
private label. A paid coach tier (Free / Pro) is a **hypothesis**, not a commitment.

## Design principles

1. **Trust first, then sell.** Every page reduces doubt before it invites action. Composition,
   dosage, origin and certification are the lead, not a detail under a fold.
2. **One clear next step.** Never a blank stare; exactly one main action per screen.
3. **The coach is a channel, not an edge case.** Multi-client ordering is a first-class flow.
4. **Calm and confident.** No countdown timers, no urgency, no celebration. Serious for people who
   take it seriously.
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
only then say done. `node tools/accept.mjs` is the gate and `tools/states.mjs` the state walk; they
find their own pages, because an instrument handed its subject can be handed the wrong one - a glob
once reported "0 failures" over 135 pages after visiting one. **Fix through a rule, not by
hand-editing one file** - and the same applies to the instrument: a check rebuilt from memory each
step is a hand fix. A repeatable one goes in `tools/` with the wrong versions written beside it.

**Critique runs on two instruments.** Claude and Codex (plugin `codex`, **read-only stated
explicitly**), sets taken independently before any merge, dedup afterwards. Codex owns what is
falsifiable in the source (contradiction between files, orphan without a parent, state absent from
the code, value drifted from its token, broken link). "Breaks at 360" and pixel checks stay with
Claude in a browser. Every critique log carries **who found it** and **withdrawn on verification**
with a reason - a withdrawn finding stays visible, or it returns next time in the same words.

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
  which is the "no value" mark · `—` nowhere in project output. The empty cell was an exemption for
  the em dash until step 8.2, on the true ground that a bare `-` in a column of numbers reads as a
  minus; `–` answers that without needing an exemption. One apostrophe form: `'`. The `ви` form.

## Ownership of text and values

**Text splits by KIND of string, not by stage.** SEO copy (title, description, H1, SEO body) belongs
to the IA node - voice aligns it and syncs it back into `ia/docs/pages/<node>.md`, and the affected
`ia/<node>.html` is rebuilt the same step. Interface strings (buttons, field labels, state text,
toasts) belong to `voice/docs/microcopy.md`; the IA node states WHAT information is needed there, not
the wording. No product string exists in two editions.

**Values move, they are never re-derived.** One line runs through the stages and is not recomputed
once: `DESIGN-artifacts.md` (origin of every value) -> `design/_theme.css` -> `design/kit/kit.css`
(git mv, `:root` byte for byte) -> `design/system/tokens.css` (primitive + semantic). Each step adds
a level, never rewrites what is already there. A value changes only by a decision said out loud as
"variable -> value -> why", never as a side effect of a refactor.

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
wireframes/   stage 04            grey clickable prototype, FROZEN after Voice
voice/        stage 05            voice.md rulebook + microcopy.md inventory
design/       stages 06-09        concept/ (how the language was found) ·
                                  kit/ (kit.css + showcase) · system/ (code) · visuals/
docs/         decisions.md, playbook/
tools/        the instruments: accept · states · css-comments · crop, and their README
```

**`index.html` is the entry point of the folder you opened, and nothing else** - at the repo root it
is the project, inside a stage folder it is the home page of the product. A hub is always
`overview.html` (`wireframes/overview.html`, `design/overview.html`). The one exception by name is
the detail-IA hub `ia/structure.html`, which shows node chips rather than a page list.

**The sidebar has one source.** Structure comes from `/_nav.js`, look from `/_nav.css`. A page
carries an empty `<aside id="sidebar"></aside>`, declares `NAV_BASE`, optionally `NAV_SECTIONS`, and
`NAV_ACTIVE` + `NAV_ACTIVE_LABEL` when it is not in the registry. **A page never describes a `nav-*`
rule.** The only manual edit is a row in the registry and `done: true` when a page is ready;
active / Next / Soon, the accordion and relative links are computed.

**Colour never lands on `wireframes/`.** The grey prototype owns structure, text and states; colour
lives in copies under `design/`, which own the visual layer only. `wireframes/` is frozen after
stage 05 - Voice is the last stage that edits text there.

**A folder is created by its own stage.** No empty folders ahead of the work, no `.gitkeep`: the
route is shown by the registry and the README, not by the file system.

## Pointers

`DESIGN-artifacts.md` - the visual language and the origin of every value (accent `#FF5A00` is the
single action colour, on text from 19px bold - but the SURFACE decides as much as the size, and
five classes ship under AA by the owner's call, 2026-08-12; the price colour rule lives there).
`wireframes/docs/conventions.md` - prototype contract. `voice/docs/voice.md` - the voice rulebook
and the locked wording canon. `ia/docs/` - sitemap and per-page specs. `docs/decisions.md` - why
anything above is the way it is.
