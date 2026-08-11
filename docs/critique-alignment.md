# Critique log - course alignment (2026-08-04)

Two instruments, sets taken **independently and in full before any merge**: Claude with a browser,
and Codex read-only through the plugin (`write: false`, verified in the job record). The point of the
second instrument is not more eyes - it is that a reviewer who did not produce the material does not
reproduce its blind spots as agreement.

**Radius.** Codex owns what is falsifiable in the source: contradiction between files, orphan without
a parent, promise with no executor, rule violation against `CLAUDE.md`, number without a source.
Claude owns what needs a browser: breaks at 360, overflow, whether a rendered page still says what
its md says. Asking Codex about layout would return a confident invention.

**Verification before every fix.** A finding is re-read in the file before anything is changed; one
that does not hold up stays in this log marked **withdrawn**, with the reason. Deleting it silently
is how the same wrong finding comes back next time in the same words.

---

## Mechanical checks (the instrument, not an opinion)

Run first, because a class that a script catches should never be walked by hand.

| Check | What it asks the OUTPUT | Result |
|---|---|---|
| em dash in output files | the **sign** `—`, not "is the dash correct" | **3 681 found** -> 3 621 replaced, 60 kept |
| markdown surviving in a render | the sign `](` in rendered html | 0 |
| broken relative links | resolve every `href`/`src` from its own directory | 3 345 checked, 0 caused by this work |
| registry idle control | a `page:` row whose file does not exist | 2 -> both **withdrawn**, see D6 |
| section idle control | a declared `NAV_SECTIONS` id with no anchor on the page | 218 declared, 0 orphaned |
| documented token drift | every value in `DESIGN.md` against `kit.css` | 20 checked, 0 drift |

The em dash check earned its keep twice over: it asked for the **sign**, and the sign was in 67 files
nobody would have opened looking for it. The zone breakdown is the finding, not the total - **the
product surfaces were already clean** (8 in `wireframes/*.html`, 9 in `design/*.html`) and the rule
had simply never reached the documentation (1 261 in `ia/*.html`, 961 in `voice/docs`, 603 in
`ia/docs`, 406 in `wireframes/docs`).

**Named exception, with idle control.** A lone em dash inside a table cell (`<td>—</td>`, `| — |`) is
the "no value" mark, not prose - a bare `-` there reads as a hyphen. 52 spans matched the exception,
so the exception covers real cases and is not a decorative line in a rules file.

> **SUPERSEDED at step 8.2, and the reasoning above is not withdrawn - it is answered.** The
> exemption weighed two characters, `—` and `-`, and picked the one that does not read as a minus in
> a column of numbers. That is correct and it is exactly why a third character ends the exemption
> instead of documenting it: `–` U+2013 is not the hyphen, is not banned by `CLAUDE.md`, and already
> lives in the product as the range mark (`А–Я`). All **60** exempted spans became `–` - 34 in
> `<td>`, 26 in `| … |` - which is the same 60 this log counted, arrived at from the other side.
> The five em dashes left in the repository are inside backticks in this file and in
> `design/kit/docs/consolidation.md`, where the character is the subject rather than the text.
>
> **And this exemption was nearly overwritten without being read.** The owner was asked which sign
> an empty cell should carry, answered «я не знаю, дай решение», and the answer was decided from
> first principles - the same two candidates, the same reasoning, the same conclusion about the
> minus. The exemption was found only because the sweep reached the md files and the search results
> printed this paragraph. A rule that lives in a critique log and not in `CLAUDE.md` is a rule the
> next pass re-derives; the dash rule is in `CLAUDE.md` now, in full, and this entry is what it
> replaced.

---

## Findings

Full form: class -> found -> **who found** -> fixed -> withdrawn -> deferred.

| # | Class | Finding | Who found | Status |
|---|---|---|---|---|
| **D1** | rule violation | The "no em dash in output files" rule had never been applied to documentation: 3 681 occurrences in 71 files, while the product surfaces were already clean. | Claude (script) | **fixed** - 3 621 replaced, 60 exempted by a named rule |
| **D2** | contradiction | The inventory published **50 components / 14 organisms** on three surfaces; counting the rows gives **51 / 15**. | Claude | **fixed** in `inventory.md`, `kit.html`, `overview.html` |
| **D3** | number without a source | "**12** components exist only as render functions" - counting gives **9** only-JS, plus 2 that are also in markup, so 11 come out of that file. The number had been estimated, not counted. | Claude | **fixed** on all three surfaces |
| **D4** | contradiction, inflated | "the footer stands on **all 142 screens**" - `wfFooter` is called on **129**; dialogs, system pages and the hub carry no page chrome. The claim was the right shape and the wrong number, which is the hardest kind to notice. | Claude | **fixed**; also `142 screens` -> `142 files (141 screens + the hub)`, because one of the files **is** the hub |
| **D5** | orphan / promise | 18 IA node pages carry 3-14 `<section id>` each and declared **no** `NAV_SECTIONS`, so the panel could not show them. The rule "under the active page - its sections" was unenforced on the largest group of pages in the project. | Claude | **fixed** - sections wired from each page's own `<h2>`; 218 declared, 0 orphaned |
| **D6** | idle control false positive | Registry rows `design/kit/overview.html` and `design/kit/why.html` point at files that do not exist. | Claude (script) | **withdrawn.** Verified in `_nav.js`: the renderer emits `<a href>` only when `done: true`, otherwise a `<span>`. A not-done row is the **route**, not a promise of a file. The check needed the refinement, not the registry. |
| **D7** | realignment damage | Moving `_theme.css` -> `kit/kit.css` put the file one directory deeper and silently broke **43 relative `url()`** inside it: product renders, banners, trust photos, the auth photograph. | Claude (browser) | **fixed** - caught as 404s in the console, not in any diff |

### Codex set

Launched read-only over the whole repository with the class list above (`write: false` in the job
record). **20 findings, and the second instrument paid for itself on the first run:** 15 were real
and outside the Claude set, and most of them were **damage this realignment caused** - stale paths,
roles renamed in code but not in prose, promises the move created and did not keep.

| # | Class | Finding | Who found | Status |
|---|---|---|---|---|
| **X1** | orphan | **`ia/flows.html` declared `NAV_SECTIONS` twice.** The split from `concept-map.html` carried over its trailing script block, so the page also declared `sitemap`, `matrix`, `navigation` - none of which exist on it - and the **second declaration wins**. | Codex | **fixed** - and see "the instrument had the same blind spot" below |
| **X2** | orphan | 17 references to paths this move renamed survived: `research/docs/flows.md`, `research/docs/sitemap.md`, `research/concept.html`, `playbook/`, `concept/docs/`, `concept/assets/`. The first sweep only caught the un-prefixed forms. | Codex | **fixed** in 19 files |
| **X3** | contradiction | `wireframes/docs/conventions.md` still gave **`index.html` the hub role** - the exact swap this alignment made. Code moved, prose did not. | Codex | **fixed**, with the swap named in place |
| **X4** | contradiction | Stage pages described **finished work as still ahead**: `wireframes/overview.html` listed built flows under "далі", `design/overview.html` called `index.html` "reserved for a future colour home page" and stage 07 "still to come" while README says Done. | Codex | **fixed** on both |
| **X5** | orphan | Three documents pointed at `research/sitemap png example/` - a directory **deliberately deleted** in c87b2a6 ("stale Crypto Bets sitemap example"). A pointer outlived its target by months. | Codex | **fixed** in all three |
| **X6** | contradiction | `design/concept/assets/README.md` still listed `mascot-face-*.png` and `np-mark.png`, which this pass moved to `design/visuals/`. | Codex | **fixed** - listed with "moved, generated here" |
| **X7** | contradiction | The notification scope was written **both** ways: "a message on **every** status change" and "which transitions are worth a message `[?]`". | Codex | **fixed** - the trigger is a transition, the subset is `[?]` |
| **X8** | promise without executor | Two documents handed the notification wording to `voice/docs/microcopy.md`; **that set did not exist there**. A promise this pass created and did not keep. | Codex | **fixed** - `microcopy.md` Розділ H, drafted to the phase-8 tone, with the transition set marked `[?]` |
| **X9** | contradiction | The Free coach cap was stated as **2** in one line of `coach.md` and **2-3 `[?]`** four lines later. | Codex | **fixed** in the spec; the wireframe instance is deferred (frozen zone) |
| **X10** | number without `[?]` | Delivery tariffs (`від 50 ₴`, `від 70 ₴`, `1-2 дні`) written as exact figures, while `CLAUDE.md` lists delivery tariffs among the numbers that must carry `[?]`. | Codex | **fixed** in `cart.md` and `product.md` |
| **X11** | number without `[?]` | Consumption cycles shown as "вистачає приблизно на 30 / 100 днів" while the same spec admits the trigger data is `[?]`. | Codex | **deferred** - the bare numbers live in the frozen wireframe; the spec already marks them |
| **X12** | contradiction | Retention "over 80% at 6 months" carries `[?] Unvalidated` in `personas.md` and is stated as **fact** in `aarrr.md`. | Codex | **fixed** in `aarrr.md` |
| **X13** | rule violation | Two IA pages described their own `.nav-grid` / `.nav-card` / `.nav-name` / `.nav-desc` - the prefix `/_nav.css` reserves. | Codex | **fixed** - renamed out of the namespace in `concept-map.html`; in `flows.html` the rules were **dead** (0 markup) and were deleted |
| **X14** | rule violation | `wireframes/docs/critique.md` is partly Ukrainian; internal md is English and `wireframes/docs/` is not one of the two exception zones. | Codex | **deferred** - a 400-line journal; translating it is a task, not a fix, and it is named here rather than excused |
| **X15** | orphan | Six address state pages and four receipt links carry `href="#…"` fragments with no matching id. The base page does the same actions with real `onclick` handlers. | Codex | **deferred** - pre-existing, inside the zone frozen after Voice |
| **X16** | screen counts | `142 screens` / `40 coloured screens` count the hub as a screen; the registries hold 141 and 39. | **both** | **already fixed** by D4 before this run returned - Codex read a snapshot taken six minutes earlier |
| **X17** | rule violation | `wireframes/overview.html` declares `--d-accent:#2d5a3d` - "colour landing in wireframes". | Codex | **withdrawn.** Verified: the variable is **declared and never used** (0 `var(--d-accent)` on the page), so no colour lands anywhere. It is docs chrome for the hub, which carries the roadmap sidebar. The idle declaration was removed anyway - a variable nothing reads is its own small defect. |

### The instrument had the same blind spot as the material

X1 is the finding worth keeping. My section idle-control used `re.search`, which returns the **first**
match - so it validated the first `NAV_SECTIONS` block and never saw that a second one existed and
won at runtime. The check reported "218 declared, 0 orphaned" and was **structurally incapable** of
seeing the defect it was written to catch.

Fixed in the instrument, not just in the page: it now walks **every** declaration, flags duplicate
`NAV_SECTIONS` / `NAV_BASE`, and flags the same registry file loaded twice. That last rule needed one
more pass of its own - comparing file **names** called 41 pages defective, because loading
`../wireframes/_nav.js` **and** `./_nav.js` is the design. Resolving the paths first dropped it to
zero. An instrument that cries wolf stops being read, which is the same failure as one that stays
silent.

---

## Does the second instrument pay for itself

First run, so this is one data point, not a trend - but it is the point of keeping the column.

| | Claude | Codex | Both |
|---|---|---|---|
| Findings | 7 | 20 | 1 (screen counts) |
| Real and fixed | 6 | 15 | - |
| Withdrawn on verification | 1 | 1 | - |
| Deferred | 0 | 3 | - |

**The two sets barely overlap, and the reason is structural.** Claude found what a browser and a
counter show: broken images, wrong totals, sections that never render. Codex found what only a reader
of the whole source sees: a role renamed in code but not in prose, a pointer outliving its target by
months, a promise this pass created and did not keep. Neither list is a subset of the other.

**Most of Codex's haul was damage this realignment caused** - which is exactly what it was pointed at,
and exactly what the instrument that did the moving is worst placed to see. That is the argument for
the second instrument stated as a fact instead of as a principle.

## What this log says about the checks themselves

- **A zero from a script is not evidence until the anchor is verified.** The first inventory pass
  produced seven zeros; six were wrong class names and one was real. The rule now lives in
  `inventory.md`: re-check every zero against the stylesheet's own section names.
- **Three of the seven findings are numbers that were plausible.** 50 instead of 51, 12 instead of 9,
  142 instead of 129 - none of them looks wrong on the page, and none would have been caught by
  reading. They were caught by counting, which is the argument for keeping the mechanical pass in
  front of the human one.
- **The most expensive finding was invisible in the diff.** D7 was a working file, a clean `git mv`,
  and 43 dead images - visible only in a browser console. That is the whole reason acceptance
  happens on the screen and not in a table.
