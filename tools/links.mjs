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
   kit.

   ---- THE WRONG VERSION, AND IT ANSWERED «0» FOR TWO WEEKS -------------------

   **IT ASKED ONLY `href` AND CALLED THE ANSWER «every link».** Stage 09 step 6,
   and the finding is Codex's: its own scan reported 24 dead paths on pages this
   file had just cleared with «5077 scanned, 0 dead». Twenty-two of the 24 were
   inside `&lt;...&gt;` samples, which is exactly what `blank()` above exists to
   drop - so on hrefs this file was right and the second instrument was wrong.
   The other two were `<img src>`, live, and this file had never looked at a
   `src` at all: line 117 matched `href="([^"]+)"` and nothing else. A picture
   that does not load is not a smaller defect than a page that does not open -
   on `design/kit/brand-logo.html` it fired the component's own fallback on two
   of six boxes, and the stand's measurement table one screen below still read
   «6 / 6», because it was measured on the product.
   THE LESSON IS THE ONE THE HOVER PROBE TAUGHT THE SAME DAY: a zero from an
   instrument that cannot see the class is not a zero. The scan now takes
   `(href|src)` in one pass and prints the `src` half of the count separately,
   so the two can never again hide inside one number. */
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
let scanned = 0, dead = 0, fixed = 0, scannedSrc = 0, deadSrc = 0;
const ambiguous = [], missing = [], byDir = {}, plan = {};

for (const f of HTML) {
  const abs = join(ROOT, f);
  const src = readFileSync(abs, 'utf8');
  const scan = blank(src);
  const edits = [];
  for (const m of scan.matchAll(/(href|src)="([^"]+)"/g)) {
    const attr = m[1], raw = m[2];
    if (/^(https?:|mailto:|tel:|#|data:|javascript:)/.test(raw)) continue;
    const path = raw.split('#')[0].split('?')[0];
    if (!path) continue;
    scanned++; if (attr === 'src') scannedSrc++;
    if (existsSync(resolve(dirname(abs), path))) continue;
    dead++; if (attr === 'src') deadSrc++;
    byDir[dirname(f)] = (byDir[dirname(f)] || 0) + 1;
    const line = src.slice(0, m.index).split('\n').length;
    const { cands } = resolveTail(dirname(f), path);
    if (cands.length === 0) { missing.push(f + ':' + line + '  -> ' + raw); continue; }
    if (cands.length > 1) { ambiguous.push(f + ':' + line + '  -> ' + raw + '   [' + cands.join(' | ') + ']'); continue; }
    /* `relative()` writes the path, nobody types it. It returns `listing.html`
       for a sibling and `../wireframes/goal.html` for a jump - both already the
       forms this repository uses, so nothing is prepended on top of them. */
    const to = relative(dirname(abs), join(ROOT, cands[0])) + raw.slice(path.length);
    edits.push([m.index, m[0].length, attr + '="' + to + '"']);
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

console.log((APPLY ? 'WROTE ' : 'DRY   ') + scanned + ' internal href+src, ' + dead + ' dead, ' + fixed + ' re-pointed'
  + '   (of those, src: ' + scannedSrc + ' scanned, ' + deadSrc + ' dead)');
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
/* ===========================================================================
   THE LINK THAT IS ALIVE AND STILL WRONG - added at stage 12, batch 1.

   `uivFixLinks()` in `design/_nav.js` re-points a link to a screen that has no
   coloured copy so it lands in the grey layer - «no dead ends». It deliberately
   SKIPS anything already written as `../`, because that is how a screen names
   the grey original on purpose. Both halves are right, and together they leave a
   hole: a link somebody hard-coded as `../wireframes/x.html` while `x` was grey
   keeps pointing at grey forever, even after `x` is coloured and registered.
   Nothing is dead, so this walk was silent about it.

   It is not hypothetical and it is not rare: batch 1 coloured three coach
   screens and instantly stranded EIGHT such links on seven already-accepted
   screens plus the split-view renderer inside `design/_nav.js`. A coach in the
   coloured prototype stepped out of colour by an ordinary tap - which is exactly
   the defect step 8.7 fixed by hand for «Обране», «Тариф» and «Деталі», coming
   back because nothing was asking the question.

   Every batch of stage 12 creates a fresh crop of these, so it is a rule rather
   than a repair. THE HUB IS EXCLUDED BY NAME: `design/overview.html` links to
   `../wireframes/overview.html` on purpose - it is the map of the grey layer,
   not a screen of the product, and it is the same line CLAUDE.md already draws.
   =========================================================================== */
const HUB = 'overview.html';
/* WRONG VERSION, AND IT PRINTED A CLEAN ZERO. The first writing called
   `walk('design')` and then skipped any name containing a slash - a guard
   copied from `pages()`, which returns bare stems. `walk()` returns PATHS, so
   every single file carried a slash and every single file was skipped. The
   check reported nothing on a corpus where eight were waiting, and it kept
   reporting nothing with a defect deliberately injected. `HTML` is already the
   relative list this file builds at the top, so it is used instead of a second
   walk with a second set of assumptions. */
/* 12.4: AND NOW IT CAN CLOSE WHAT IT FINDS. The pass reported 36 of these and
   had no repair, so the only way to act on it was by hand, one file at a time -
   which is how the 36 got there. A rewrite is safe in a way the report is not:
   the target is only touched when design/<name>.html EXISTS, so the worst case
   is a link that already resolved resolving to the same page in colour. The hub
   stays excluded, and so does anything inside a comment, because the body is
   stripped of comments before it is read. */
const stale = [], rewrote = [];
for (const rel of HTML) {
  if (!/^design\/[^/]+\.html$/.test(rel)) continue;
  const raw = readFileSync(join(ROOT, rel), 'utf8');
  const body = raw.replace(/<!--[\s\S]*?-->/g, ' ');
  const hits = new Set();
  for (const m of body.matchAll(/href="\.\.\/wireframes\/([^"#?]+\.html)/g)) {
    if (m[1] === HUB) continue;
    if (existsSync(join(ROOT, 'design', m[1]))) { stale.push(`${rel}  ->  ${m[1]}`); hits.add(m[1]); }
  }
  if (APPLY && hits.size) {
    let out = raw, n = 0;
    for (const name of hits) {
      const re = new RegExp('href="\\.\\./wireframes/' + name.replace('.', '\\.') + '(?=["#?])', 'g');
      out = out.replace(re, () => { n++; return 'href="' + name; });
    }
    if (n) { writeFileSync(join(ROOT, rel), out); rewrote.push(rel + '  ' + n); }
  }
}
/* ---------- THE CLASS THIS FILE COULD NOT SEE, AND IT REPORTED A CLEAN ZERO
   OVER SEVENTEEN BROKEN LINKS ---------------------------------------------
   Found at 12.8 by a subagent that opened its own screens in a browser after
   `uivFixLinks()` had run, which is a thing no reader of the source can do.

   THE TWO HALVES ASK DIFFERENT QUESTIONS. `uivFixLinks()` in `design/_nav.js`
   decides by MEMBERSHIP: a link is kept internal when its file name is in
   `DESIGN_NAV`, and sent to `../wireframes/` when it is not. The pass above
   decides by EXISTENCE: it only looks at hrefs already written `../wireframes/`
   and asks whether a coloured twin sits on disk. Between those two questions
   lies the exact state every screen passes through - the file EXISTS and is NOT
   yet registered - and in that state the source says `content-blog.html`, the
   pass never examines it because it carries no `../` prefix, and the browser
   quietly rewrites it to grey. Thirteen links on one screen, four on another,
   and this file printed «0 stale».

   A registry row is not bookkeeping here; it is what makes a link work. So the
   question is asked the way the PAGE asks it, out of `DESIGN_NAV` itself rather
   than re-derived, for the same reason `width-sweep.mjs` takes the carrier
   question from `tab-walk.mjs` verbatim: a second definition is a second answer
   waiting to disagree with the first. */
const NAVSRC = readFileSync(join(ROOT, 'design/_nav.js'), 'utf8');
const navArr = (() => {
  const i = NAVSRC.indexOf('DESIGN_NAV');
  if (i < 0) return null;
  const j = NAVSRC.indexOf('[', i), k = NAVSRC.indexOf('];', j);
  if (j < 0 || k < 0) return null;
  try { return eval(NAVSRC.slice(j, k + 1)); } catch { return null; }
})();
const unreg = [];
if (!navArr) {
  console.log('\nХОЛОСТИЙ КОНТРОЛЬ: DESIGN_NAV не прочитано з design/_nav.js - перевірка «веде в сіре через реєстр» НЕ ставилась');
} else {
  /* the hub is coloured and is not a screen: `design/_nav.js` declares it in
     `DESIGN_EXTRA` and `uivFixLinks()` reads both lists, so this check reads
     both too rather than keeping a second copy of the same exception. */
  const extra = (() => {
    const i = NAVSRC.indexOf('DESIGN_EXTRA');
    if (i < 0) return [];
    const j = NAVSRC.indexOf('[', i), k = NAVSRC.indexOf('];', j);
    try { return eval(NAVSRC.slice(j, k + 1)); } catch { return []; }
  })();
  const inNav = new Set([...navArr, ...extra]);
  for (const rel of HTML) {
    if (!/^design\/[^/]+\.html$/.test(rel)) continue;
    const body = readFileSync(join(ROOT, rel), 'utf8').replace(/<!--[\s\S]*?-->/g, ' ');
    const seen = new Map();
    /* WRONG VERSION 1 OF THIS CHECK, AND IT STOLE ITS NEIGHBOUR'S FINDINGS.
       The first pattern barred `/` only from the FIRST character, so
       `../wireframes/content-faq.html` matched and 36 of its 43 findings were
       the pass below's, reported a second time under a different name. This
       class is about a BARE name - the only form `uivFixLinks()` rewrites - so
       no slash may appear anywhere in it. A check that overlaps the one beside
       it does not add a question; it doubles an answer. */
    for (const m of body.matchAll(/href="([^":#/?][^":#/?]*\.html)(?=["#?])/g)) {
      const name = m[1];
      if (inNav.has(name)) continue;
      if (!existsSync(join(ROOT, 'design', name))) continue;   // genuinely grey-only: the rewrite is correct
      seen.set(name, (seen.get(name) || 0) + 1);
    }
    for (const [name, n] of seen) unreg.push(rel + '  ->  ' + name + '   ' + n + '×');
  }
  if (unreg.length) {
    console.log('\nКОЛІР Є, АЛЕ РЕЄСТР ПРО НЬОГО НЕ ЗНАЄ (' + unreg.length + ') - uivFixLinks відправить ці посилання в сіре В БРАУЗЕРІ, хоча в джерелі вони внутрішні:');
    for (const x of unreg) console.log('  ' + x);
  } else {
    console.log('через реєстр у сіре не веде жодне посилання: DESIGN_NAV знає всі ' + navArr.length + ' кольорових імен, на які посилаються екрани');
  }
}

if (!HTML.some(r => /^design\/[^/]+\.html$/.test(r)))
  console.log('ХОЛОСТИЙ КОНТРОЛЬ: обхід не відкрив жодного екрана в design/ - список файлів змінився');
if (stale.length) {
  console.log('\nЖИВЕ, АЛЕ ВЕДЕ В СІРЕ, ХОЧА КОЛІР УЖЕ Є (' + stale.length + ') - uivFixLinks це не полагодить, бо `../` пропускається навмисно:');
  for (const x of [...new Set(stale)]) console.log('  ' + x);
}

process.exit(dead || unreg.length || (stale.length && !rewrote.length) ? 1 : 0);
