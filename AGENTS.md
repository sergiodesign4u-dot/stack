# AGENTS.md

The rules of this repository live in **`CLAUDE.md`** at the root. Read it first. Without it any
edit here is a median, not a decision of this project.

## What this repository is

Not an application: a **design process for a product**, run stage by stage. Stack is a mobile-first
sport nutrition store for the Ukrainian market, built around the coach ordering channel. Each stage
owns a folder with two outputs - md sources of truth in `docs/`, and an html visualization flat in
the folder root. Nothing here executes; the material is text and markup, and it is checked as text
and markup.

Route: `research/` (research, personas, JTBD, CJM) -> `ia/` (base + detail information architecture)
-> `wireframes/` (grey clickable prototype) -> `voice/` (product voice) -> `design/` (concept, colour,
kit, system). Status of every stage: `README.md` and `/_nav.js`, nowhere else.

## Hard rules

1. **Audit is read-only.** Findings come back as a list with `file:line` proof. Edits are made by the
   repository owner after an explicit go-ahead. Do not edit files unless asked in plain words.
2. **A finding without proof is not a finding.** Every claim quotes a line that really exists in the
   file. Does not hold up on re-reading - it is not submitted.
3. **General advice is noise.** "Add examples", "structure it better", "consider automation" - not
   wanted. Only falsifiable discrepancies: a quote contradicting another quote, a promise with no
   executor, a number that does not match its own source.
4. **Deliberate decisions of the project are not defects.** Grey wireframes that are never coloured
   in place (colour lives in copies under `design/`); one shared registry `/_nav.js` instead of a
   sidebar per page; `index.html` = the home page of a folder while `overview.html` = its hub;
   Ukrainian on html pages and English in internal md; every number that needs real data marked `[?]`.
   These are written down in `CLAUDE.md` and `docs/decisions.md` - read the reason there before
   reporting them.
5. **Where to look for the reason.** `CLAUDE.md` = rules in force. `docs/decisions.md` = what was
   decided, why, and what was rejected. `wireframes/docs/conventions.md`, `voice/docs/voice.md`,
   `ia/docs/` = the rules of their own zone.
6. **Answer in Ukrainian.**
