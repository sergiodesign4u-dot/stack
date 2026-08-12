/* tools/links.mjs - DOES THIS LINK GO ANYWHERE.
   Step 8.18. `node tools/links.mjs` reports, `--write` re-points.

   Four checks stood at the gate and not one of them asked it. Measured on the
   first run: **803 of the 2882 internal hrefs in `design/` resolve to nothing,
   and 0 of the 1579 in `wireframes/` do.** 28% against zero, in a layer that is
   a clone of the other - so every one of them was introduced by the colouring,
   and every one of them was clickable by the owner for weeks.

   `accept.mjs` opens each page and asks five questions about what it finds
   there. None of them is about where a page can take you, and a 404 raises
   nothing on the page that links to it - it happens on the NEXT page, which no
   pass ever visits. That is the blind spot's exact shape: every instrument in
   this folder examines a screen, and a link is the one thing that is not on the
   screen it is written on.

   ---- THE THREE CAUSES, and only one of them is a mistake -------------------

   1. **THE STAND AND ITS DEMO ARE ONE DIRECTORY APART AND SHARE THEIR MARKUP.**
      `design/kit/hero.html` and `design/kit/demo/hero.html` hold the same rail,
      so they hold the same hrefs - and one relative path cannot be right at two
      depths. `design/kit/hero.html:35` writes, IN ONE LINE,
      `../../wireframes/catalog-page.html` (correct from `design/kit/`) and
      `../../listing.html` (which is the repository root, where there is nothing
      but `index.html`). The first was written for this depth, the second was
      copied up from the demo. 650 links, one cause, and it fails in both
      directions: the demo's own `../../wireframes/goal.html` lands in
      `design/wireframes/`, 87 times.
   2. **THE TIRAGE.** 152 coloured screens point at `content-legal.html`,
      `goal.html`, `catalog-page.html` - screens that exist only in grey,
      because 41 of the 142 are still to be coloured. Not a mistake: the link
      was right when the page was cloned and the target has not arrived yet. The
      arithmetic closes exactly - every one of the 152 targets is one of the 41.
   3. **One typo.** `design/overview.html` asked for
      `design/concept/assets/logo-mark.svg` from a file already inside
      `design/`.

   ---- WHAT IT DOES NOT SEE, said out loud -----------------------------------

   **A link the page writes at runtime.** `_nav.js` builds the whole sidebar
   from the registry, and no static reader can resolve it. `<script>` blocks are
   blanked before scanning rather than half-parsed, because a half-parse reports
   `' + n.file + '` as a dead link - which is what the first run did on
   `index.html:227` and `ia/structure.html:188`. The registry's own links stay
   `_nav.js`'s to get right, and `accept.mjs` walks every page it names, so a
   name that does not exist there surfaces as a page that will not load.

   **AN ESCAPED MARKUP SAMPLE IS NOT A LINK, and this one was caught before the
   file was written.** `design/kit/stack-action.html` prints
   `&lt;a ... href="..."&gt;` in its «Розмітка» section, and a raw scan read the
   two of them as dead links - the same shape as `css-comments.mjs` reporting a
   regex literal, and the same lesson: an instrument that reports a correct line
   trains you to ignore it. 16 more hid in comments and code samples across the
   kit. */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { ROOT } from './lib.mjs';

const walk = d => readdirSync(d).flatMap(n => {
  if (n === '.git' || n === 'node_modules') return [];
  const p = join(d, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const ALL = walk(ROOT).map(p => relative(ROOT, p));
const HTML = ALL.filter(p => p.endsWith('.html')).sort();

/* BLANKING KEEPS THE LENGTH, and that is not tidiness - it is what makes the
   write safe. The scan runs on the blanked copy and the edit lands on the real
   one, so the two have to agree on every offset; a `<script>` collapsed to a
   single space shifts everything after it and the splice writes into the middle
   of the next tag. Measured before this was fixed: three files in `design/`
   carry an href literal BOTH live and inside a blanked region -
   `coach-clients.html` has `coach-session.html` 3 times live of 4 - so a
   string-level replace would have edited the copy inside the comment as well.
   None of those three was dead this time. Next time is not a plan. */
const pad = m => m.replace(/[^\n]/g, ' ');
const blank = s => s
  .replace(/&lt;[\s\S]*?&gt;/g, pad)           /* a printed markup sample */
  .replace(/<!--[\s\S]*?-->/g, pad)            /* a commented-out block */
  .replace(/<script[\s\S]*?<\/script>/gi, pad);/* a link built at runtime */

/* ---- WHERE A DEAD HREF WAS TRYING TO GO -----------------------------------
   Never a typed table of corrections. The href already says what it wants -
   `../../wireframes/goal.html` names both a layer and a file,
   `content-legal.html` names a file and means «next to me» - so the answer is:
   drop the `../` run, keep the rest as a TAIL, and find the file in this
   repository whose path ends with it. One candidate is the answer. Several, and
   the linking file's own top-level folder decides first, then `wireframes/` -
   which is not a preference invented here but the one the kit already renders
   193 times, deliberately, for screens that have no coloured edition yet. That
   order is what keeps `catalog-page.html` off `ia/catalog-page.html`, which is
   an IA specification page and not a screen at all.
   MORE THAN ONE SURVIVOR AND IT WRITES NOTHING. A tiebreak typed into this file
   would be the hand-written list the whole folder exists to avoid. */
function resolveTail(fromDir, href) {
  const tail = href.replace(/^(\.\/|\.\.\/)+/, '');
  if (!tail) return { tail, cands: [] };
  const cands = ALL.filter(p => p === tail || p.endsWith('/' + tail));
  if (cands.length < 2) return { tail, cands };
  const mine = fromDir.split('/')[0];
  const same = cands.filter(p => p.split('/')[0] === mine);
  if (same.length === 1) return { tail, cands: same };
  const pool = same.length ? same : cands;
  const grey = pool.filter(p => p.split('/')[0] === 'wireframes');
  return { tail, cands: grey.length === 1 ? grey : pool };
}

const APPLY = process.argv.includes('--write');
let scanned = 0, dead = 0, fixed = 0;
const ambiguous = [], missing = [], byDir = {}, plan = {};

for (const f of HTML) {
  const abs = join(ROOT, f);
  const src = readFileSync(abs, 'utf8');
  const scan = blank(src);
  const edits = [];
  for (const m of scan.matchAll(/href="([^"]+)"/g)) {
    const raw = m[1];
    if (/^(https?:|mailto:|tel:|#|data:|javascript:)/.test(raw)) continue;
    const path = raw.split('#')[0].split('?')[0];
    if (!path) continue;
    scanned++;
    if (existsSync(resolve(dirname(abs), path))) continue;
    dead++;
    byDir[dirname(f)] = (byDir[dirname(f)] || 0) + 1;
    const line = src.slice(0, m.index).split('\n').length;
    const { cands } = resolveTail(dirname(f), path);
    if (cands.length === 0) { missing.push(f + ':' + line + '  -> ' + raw); continue; }
    if (cands.length > 1) { ambiguous.push(f + ':' + line + '  -> ' + raw + '   [' + cands.join(' | ') + ']'); continue; }
    /* `relative()` writes the path, nobody types it. It returns `listing.html`
       for a sibling and `../wireframes/goal.html` for a jump - both already the
       forms this repository uses, so nothing is prepended on top of them. */
    const to = relative(dirname(abs), join(ROOT, cands[0])) + raw.slice(path.length);
    edits.push([m.index, m[0].length, 'href="' + to + '"']);
    const k = dirname(f) + '  ' + raw + '   ->   ' + to;
    plan[k] = (plan[k] || 0) + 1;
  }
  if (!edits.length) continue;
  /* THE GREY LAYER IS FROZEN and has nothing to fix anyway - 0 dead of 1579.
     The guard is here so that stays true if this is ever run after a change. */
  if (!f.startsWith('design/')) {
    for (const e of edits) missing.push(f + '  ' + e[2] + '   [outside design/, not written]');
    continue;
  }
  fixed += edits.length;
  if (!APPLY) continue;
  let out = src;
  for (const [at, len, text] of edits.reverse()) out = out.slice(0, at) + text + out.slice(at + len);
  writeFileSync(abs, out);
}

console.log((APPLY ? 'WROTE ' : 'DRY   ') + scanned + ' internal hrefs, ' + dead + ' dead, ' + fixed + ' re-pointed');
if (dead) {
  console.log('\nby directory:');
  for (const [d, n] of Object.entries(byDir).sort((a, b) => b[1] - a[1])) console.log('  ' + String(n).padStart(4) + '  ' + d);
}
/* «803 re-pointed» IS NOT A RESULT - it is a count, and this folder has been
   lied to by a count before: `vars.mjs` matched 43 imports on a file with 43
   imports and captured the wrong bytes every time. The distinct rewrites print
   so the answer can be read rather than trusted - 56 of them behind the 803. */
if (Object.keys(plan).length) {
  console.log('\nthe rewrite, distinct (' + Object.keys(plan).length + '):');
  for (const [k, n] of Object.entries(plan).sort((a, b) => b[1] - a[1])) console.log('  ' + String(n).padStart(4) + '  ' + k);
}
if (ambiguous.length) {
  console.log('\nAMBIGUOUS - more than one file answers, nothing written (' + ambiguous.length + '):');
  for (const a of [...new Set(ambiguous)]) console.log('  ' + a);
}
if (missing.length) {
  console.log('\nNO SUCH FILE ANYWHERE (' + missing.length + '):');
  for (const m of [...new Set(missing)]) console.log('  ' + m);
}
process.exit(dead ? 1 : 0);
