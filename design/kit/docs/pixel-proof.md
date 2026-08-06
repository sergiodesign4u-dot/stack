# Pixel proof - step 5

The 39 coloured screens moved from two stylesheets (`wireframes/_wf.css` +
`design/kit/kit.css`) to one system link (`design/system/index.css`), and `kit.css` was
deleted. This file is the evidence that nothing moved on screen, and the list of what had to
be fixed to make that true.

## Result

| | |
|---|---|
| screen × viewport pairs | **78** (39 screens, 390 and 1280) |
| element fingerprints compared | **94 488** |
| properties per element | 65 computed + bounding box |
| **differences** | **0** |

A fingerprint is `tag | class | 65 computed properties | rounded x,y,w,h`, hashed. Animations
and transitions are frozen with an injected `*{animation:none;transition:none}` before reading,
identically on both sides.

## How the proof is taken

Both states are served **from the same origin at the same time**: the pre-migration copy lives
under `/_before` (a symlink to a scratch copy of `design/`), the migrated one under `/design`.
Same-origin matters - the walk reads `iframe.contentDocument`, which a second port would block.
`background-image` resolves to an absolute URL, so `localhost:<port>` and `/_before` are
normalised out of the signature before hashing.

The server sends `Cache-Control: no-store`. That is not a detail: **the first run of this proof
returned a perfect zero for the wrong reason** - the browser replayed the cached old HTML and
CSS, so it compared the old state with itself. The give-away was the `<link>` list still naming
`kit.css` after the file was deleted. A proof that cannot fail is not a proof.

## What the proof caught

Eight defects, none of which is visible in a file diff.

**1. A class rule parked in `base.css`.** `base.css` loads above every atom, so
`.uiv-tc-ic svg` (24px) lost a same-specificity tie to `.uiv-ic svg` (1.05em) in `icon.css` and
the footer trust icon shrank to 15.75px, shifting every element below it on four screens.
Fixed by rule: **base.css holds only what belongs to no component**; every class rule moved to
its owner (`footer`, `rating`, `toolbar`, `loyalty-rung`, `cart-drawer`).

**2. A token that cannot be negated.** The step-3 tokenizer turned `-5px` into
`-var(--space-5)`. CSS drops the whole declaration, so `.sech .all` lost its negative margin.
`calc(-1 * var(--space-5))` is the only legal form. 2 occurrences.

**3. Page-local `<style>` blocks on three screens.** `product-coach`, `product-oos` and
`product-reviews` carried 64 lines of their own CSS using the stage-07 variable names, so
deleting `kit.css` killed them outright: the coach panel, the OOS notify field and the reviews
recovery banner all lost their frame and colour. The rules moved into the components that own
them (`buy-box`, `pdp-tabs`, `gallery`, `restock-note`, `review-item`), with the old names
translated to semantic roles **by measured value**.

**4. The same defect in inline attributes.** 12 `style=""` attributes across 8 screens
referenced `--sec`, `--light`, `--strong`. Same translation, same rule: **a screen writes no
CSS anywhere - not a file, not a `<style>`, not an attribute.**

**5. A grouped selector spanning components.**
`.rk-ph, .aord-thumbs .t, .oh-thumbs i, .ob-line .ph{...}` landed whole in `restock-note.css`,
which drags `.ob-line .ph` above its own rule in `account-shell.css`. The order-line photos
turned grey. Each fragment now sits in its owner's file.

**6. Order is part of a rule, not just the file.** `.cart-ov` moved out of `base.css` and was
appended at the **end** of `cart-drawer.css`, landing after `@media{ .cart-ov{top:40px} }` and
resetting the scrim to the top of the viewport. A moved rule keeps its position: structure into
the structure block, colour at the head of the colour block.

**7. An injected stylesheet races layout code.** `_stand.css` was first injected by
`design/_nav.js` so a screen would keep exactly one `<link>`. But `wfBar()` reads
`offsetHeight` to publish `--wfbar-h`, and it ran before the injected sheet applied - the cart
drawer sat 23px low. **A stylesheet that layout code measures is declared in the head.** The
screens now carry two links and say why: the system, and the stand chrome.

**8. A destructive write pattern.** `open(f,"w").write(open(f).read() + x)` truncates the file
before the read runs. Five component files were emptied this way mid-step and restored from the
`/_before` copy. Read first, then write.

## What a screen looks like now

```html
<link rel="stylesheet" href="system/index.css">
<!-- stand chrome only, never part of the system: see design/_stand.css -->
<link rel="stylesheet" href="_stand.css">
```

No `_wf.css`, no `kit.css`, no `<style>` block, no CSS in an attribute. `design/system/` is the
product; `_stand.css` is the walking frame around it and can be dropped without touching a
single product rule.

## Repeating it

The harness lives in the browser, not in a file: the walk, the hash and the diff are three
`page.evaluate` calls against the no-store server (`scratchpad/nocache_server.py`). Step 6 must
re-run it after the rollout, and step 8 renders it as `pixel-proof.html`.

**Second run - the icon set moves into the system.** `UIV_P` left `design/_nav.js` for
`design/system/icons.js` and the 39 screens gained a `<script>` for it, so the proof was taken
again: **80** screen x viewport pairs, **96 422** element signatures, **7 336** rendered glyphs.
Glyph markup identical one for one, zero elements changed or removed, and exactly **+1** element
per screen - the new `<script>` tag itself, which is a DOM element and therefore shows up in the
walk. Two notes for the next run: compare as a **multiset**, because one inserted element shifts
every index after it and a positional diff then reports the whole page as changed; and take the
before state in the **same browser session**, because there is no `/_before` copy for a change
that has not been committed yet.
