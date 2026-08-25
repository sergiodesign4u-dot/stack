# One-shot - the prompt for adding a feature to Stack

Stage 13, step 7. Copy everything between the rulers into a fresh session, replace the one line in
angle brackets, and send it. It is written for a developer who has never seen this repository and
for Claude in a new session; both need the same three things and neither needs a summary of what
was already built.

**Why it is a prompt and not a chapter.** A chapter is read once and forgotten. This is pasted, and
the things it insists on are exactly the ones a reader skips: that nothing is invented inside a
screen file, that a state is its own document, and that an unregistered screen is a screen nothing
can route to.

---

## THE PROMPT

You are adding one feature to **Stack**, a mobile-first sport nutrition store built around the coach
ordering channel. The repository is a **clickable product, not an application**: no data layer, no
API, no router, no build step and no dependencies. Pages open from the file system.

**The feature: `<name it here, and name its states>`**

### 1. Read these first, from disk, in this order

If a file is already in your context, that is a snapshot taken earlier and it is not the source.

| Read | For |
|---|---|
| `handoff/handoff.html` | where the package ends, which theme is primary, what was deliberately not done |
| `handoff/docs/behaviour.md` | what the product DOES: every flow step by step, every state, every deliberate dead end, and the six questions nobody has answered |
| `handoff/docs/map.md` | what a screen is made of, and the reverse list - if you change a token, what moves with it |
| `handoff/docs/a11y.md` | what is confirmed, what is a debt, and the command behind each |
| `design/system/CLAUDE.md` | the twelve rules of the code you are about to load |
| `design/kit/docs/architecture.md` section J | how a new component, rule, composition, value, adaptation or motion enters the system |
| `voice/docs/voice.md` | the tone. Plain words in labels, depth below; no urgency, no celebration |

Then open the screen nearest to what you are building and read it as a file. It will teach you the
shape faster than any description.

### 2. The file, and its registration

A screen that exists on disk and nowhere else is a screen nothing can route to. Five things, and the
last two are the ones that get skipped:

1. **The file goes flat in `design/`.** No sub-folder. The name is lower-case with hyphens.
2. **Every state is its own FILE**, named `<screen>-<state>.html` - the same suffix vocabulary the
   product already uses: `empty`, `loading`, `error`, `oos`. This is why the product has 141 pages
   and not 50, and it is what makes each state acceptable, screenshotable and linkable.
3. **The head is copied from a neighbouring screen**, not written: `viewport`, `noindex` on a state
   file, the fonts, `system/index.css`, and `_stand.css`, which is stand chrome and never part of
   the system.
4. **A row in `design/_nav.js`**, in the flow group the screen belongs to. Until that row exists,
   `uivFixLinks()` rewrites every link pointing at your screen back to the grey prototype - it asks
   one question, «is this name in `DESIGN_NAV`», and yours is not.
5. **The coverage map at `design/overview.html` will NOT show your screen, and that is not a step you
   forgot.** This sentence used to say the opposite and it was wrong; the first person to follow this
   prompt found it out and it is corrected here rather than quietly. The map is derived from
   `WF_FLOWS` in the frozen grey `wireframes/_nav.js`, and `DESIGN_NAV` only decides whether a row the
   map ALREADY knows is drawn as coloured. **A screen with no grey twin cannot appear on it at all** -
   and `node tools/coverage.mjs --check` still exits 0, still says «all 141», and never mentions you.
   Run it anyway to confirm you broke nothing, and know that its green says nothing about your work.
   Whether the map should be able to hold a post-handoff screen is an open order in
   `design/kit/docs/backlog.md`; do not repair it inside your feature.

The screen carries the design-only rail by calling `uivBar()` in its tail script, exactly as its
neighbours do. It is chrome for whoever reviews, never part of the product. That rail is derived from
`WF_FLOWS` too, so it will not list your screen either - same cause, same answer.

**And if your feature is a new SECTION of an account, it cannot enter the account's own navigation.**
The buyer rail and the coach rail are one list each, `WF_ACC_LINKS` and its coach twin, both inside
the frozen `wireframes/_nav.js`. Call the renderer with a key the list does not hold and it draws
correctly and marks nothing current - which is the honest state. **Do not hand-write the link into
your screen files instead:** «the sidebar has one source» is the rule that would break, and four
hand-written copies are how it stops being true. Order the row and say the section is unreachable
from inside the cabinet until it exists.

### 3. What you may NOT invent, quoted from the rules rather than paraphrased

From `design/system/CLAUDE.md`, rule 7: **motion lives in a token, a component or a pattern, and
`transition`, `animation` and `@keyframes` are FORBIDDEN in a screen file.**

From rule 11: **a screen file never carries an `@media`. Ever.** Adaptation lives in a token, a
component, a pattern or the shell. Every `@media` in the system gives one of the two registry
numbers, `--bp-grid-2col` (620, mirror 619) or `--bp-shell-wide` (860, mirror 859).

From rule 10: **NEW APPEARS IN THE SYSTEM FIRST, THEN ON THE SCREEN. Never the other way round.**

Also forbidden in a screen file: a `style` element, a `style` attribute, any colour written out, any
length written out instead of a token, and any class the system does not declare.

**But read the ban correctly, because the flat version of it is worse than no prompt at all.** It
forbids **inventing inside a screen file**. It does not forbid GROWTH. Those are two steps:

- inside the screen file you invent nothing;
- what is missing appears in the SYSTEM first, with its full set, and only then goes on the screen.

A developer who reads only «create no new components» will either stop for ever or do it in the
screen file, and both are worse than the thing the rule protects.

### 4. When something is missing

**Stop and order it. Do not draw it.** The order has a shape, and a component is not finished until
all six parts exist - `design/kit/docs/architecture.md` section J spells them out: the css with its
states in both themes, a stand page, a row in `design/kit/_nav.js` in its own level group, a row in
`design/kit/docs/inventory.md` with its level, an `@import` in its own level group in
`design/system/index.css`, and a card in the hub `design/kit/overview.html`.

If the missing thing is a VALUE, it is a token of its level in `design/system/tokens.css`, in both
themes only if it is a colour. If it is a rule of use, it is a row in section I. If you cannot
order it because the decision is not yours, write it into `design/kit/docs/backlog.md` and say so
out loud - that IS the correct outcome, and the backlog is read.

### 5. The text

**No string is written twice.** Interface text - buttons, labels, state text, toasts - belongs to
`voice/docs/microcopy.md`; find the cluster for your screen and take the wording from there. SEO
copy - title, description, H1, the SEO body - belongs to the IA node in `ia/docs/pages/`. Names,
prices and dates come from the canonical data named once for the whole product in
`design/kit/docs/rollout.md`, section C. **A screen that did not exist at stage 05 has no cluster in that inventory** - it was taken from the
142 grey pages and stops there - so expect to find nothing for a genuinely new surface, and do not
read the silence as permission. Quote every string the corpus already fixes (a button, a state, a
stock label: they exist and are canon), and for the ones with no owner, write them to `voice.md`'s
rules, **mark them in the order as PROPOSALS rather than canon**, and order the cluster. `[?]` is not
the escape here: it is the mark for a NUMBER that needs real data, and a heading carrying it would be
a blank stare and would fail `headings.mjs`.

Every number that needs real data stays `[?]`. An invented number poisons every stage below it.

### 6. Before you say it is done

```
node tools/screen-css.mjs <your screens>     the ten marks a screen file may not carry
node tools/accept.mjs 390 <your screens>     overflow, console error, typography, accessible names
node tools/accept.mjs 360 <your screens>     and the same at the narrow floor, measured
node tools/links.mjs                         does every link go anywhere
node tools/coverage.mjs --check              is the screen on the map
node tools/headings.mjs <your screens>       one reachable h1, and a ladder with no missing rung
```

**Name every state file explicitly on the command line.** `accept.mjs` matches a subject by its exact
name and `screen-css.mjs` by substring, so one base name means «one screen» to the first gate and
«all four» to the second - and the first would report a clean run over a quarter of your work.

Then open it in a browser and walk **every state**, in both themes, and narrow the window to the
floor. Acceptance is in the browser, not in a table. Two of the defects found in the first run of
this prompt were found by eye after every gate above was green: a price breaking between the figure
and the currency sign at the floor, and a loading skeleton promising fewer rows than the loaded state
delivers.

---

## What this prompt does NOT cover, and where that is written

- **The behaviour of your feature** - which branches exist, which of them is a deliberate dead end,
  what a retry retries. `behaviour.md` is the shape to follow; if your feature adds a branch that no
  file answers, it goes into that document's «НЕ ВИРІШЕНО» list rather than into your judgement.
- **Which token to take** - `map.md` section C answers it backwards: pick the token, see what
  already moves with it.
- **The accessibility floor** - `a11y.md` names the command behind every row. Eight of its rows are
  debts today, and a new screen must not add to them.
