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

Codex was launched read-only over the whole repository with the class list above. Its findings are
merged below when the run returns; the "who found" column is the point of keeping the sets apart, and
over a few stages it is the only way to learn whether the second instrument pays for itself instead
of believing that it does.

---

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
