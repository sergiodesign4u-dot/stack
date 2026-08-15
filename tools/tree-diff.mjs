/* tools/tree-diff.mjs - DID THE WORKING TREE MOVE ANYTHING, ELEMENT BY ELEMENT.

   `proof.mjs` answers the same question in pixels, but only for the 40 screens
   that have a baseline JPEG. Step 6 cuts CSS on 31 screens that have none, and
   the risk being checked is not «is the rule inert» - private-css.mjs measured
   that per rule - it is «did the CUT itself mangle the file». A regex that eats
   one closing brace produces valid CSS with the wrong meaning, and every source
   check would still pass.

   So: git archive the reference into its own tree, serve both, open both in ONE
   Chrome at the same widths, and compare the COMPUTED style of every element,
   in document order, on a fixed property set. Identical means nothing moved.

   The property set is deliberately wide - box, type, colour, layout - because
   the whole point is to catch what the author did not think to look at. It is
   not «all properties»: those include a hundred that never differ and would
   triple the cost for nothing.

   POSITIVE CONTROL FIRST, ALWAYS. Run it against a page you know moved before
   trusting a zero: `coach-home-empty` answers «11 elements at 390, 12 at 1280»
   for the accent change of 7.26. A comparator that cannot say «moved» cannot
   testify to «did not».

   AND THIS COMPARATOR HAS A NOISE FLOOR, WHICH NOTHING HAD EVER MEASURED. Read
   the SAME unchanged page four times and the answers are not always equal:
   `coach-session-priceblock` @390 came back 39.19px taller on one read of four,
   78 rows differing, `width` on 56 of them. It is the webfont fallback - the
   race the settle loop in `cdp.mjs` is written against and does not always win
   under load.
   So a SMALL non-zero from this tool is a question, not a verdict: re-run it.
   That applies backwards as well - the «9 movements on 5 screens» that reverted
   the private-css cut at step 6 were taken with this reading, and some of those
   nine may have been the coin. `inert.mjs` answers the same question by reading
   until two reads agree; this one does not, because it walks each page once by
   design.

     node tools/tree-diff.mjs HEAD                every changed design page
     node tools/tree-diff.mjs HEAD coach-order-loading   just these
     node tools/tree-diff.mjs --dir /tmp/before   against a directory, not a ref
       - which is what a migration needs: the reference is «the tree five
       minutes ago», and that has no commit to name. */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, ROOT, STYLE_PROPS, snapshotExpr } from './lib.mjs';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const DIRI = argv.indexOf('--dir');
const FIXED = DIRI > -1 ? argv[DIRI + 1] : null;
/* the guard matters: with no --dir, DIRI is -1 and «i !== DIRI + 1» quietly
   drops argv[0], so `tree-diff HEAD coach-home-empty` made the PAGE the ref and
   git answered «bad revision». An off-by-one that only fires when the flag is
   absent is exactly the branch nobody tries. */
const rest = DIRI > -1 ? argv.filter((a, i) => i !== DIRI && i !== DIRI + 1) : argv;
const REF = FIXED ? null : (rest[0] || 'HEAD');
let PAGES = FIXED ? rest : rest.slice(1);

let dir;
if (FIXED) {
  dir = FIXED;
  if (!PAGES.length) PAGES = readdirSync(join(ROOT, 'design'))
    .filter(f => f.endsWith('.html')).map(f => f.replace(/\.html$/, ''));
} else {
  if (!PAGES.length) {
    PAGES = execFileSync('git', ['diff', '--name-only', REF, '--', 'design'], { cwd: ROOT })
      .toString().trim().split('\n')
      .filter(f => /^design\/[^/]+\.html$/.test(f))
      .map(f => f.replace(/^design\//, '').replace(/\.html$/, ''));
  }
  dir = mkdtempSync(join(tmpdir(), 'stack-tree-'));
  execFileSync('tar', ['-x', '-C', dir],
    { input: execFileSync('git', ['archive', REF], { cwd: ROOT, maxBuffer: 1 << 30 }), maxBuffer: 1 << 30 });
}
if (!PAGES.length) { console.log('нічого порівнювати: жодна сторінка design/*.html не змінилась'); process.exit(0); }

/* the list moved to lib.mjs at step 6.1, unchanged, because scope.mjs asks the
   same question of one page that this asks of two trees */
const P = STYLE_PROPS;

/* the snapshot moved to lib.mjs at step 6.2 - inert.mjs asks the same
   question of one page that this asks of two trees, and two readings of «what
   this page looks like» is how two instruments come to disagree. */
const M = snapshotExpr();

const a = await serve(dir);
const b = await serve(ROOT);
const l = await chrome('treediff');
const conn = await Conn.open(l.wsUrl);

let moved = 0, checked = 0, missing = 0, renames = 0;
for (const p of PAGES) {
  if (!existsSync(join(dir, 'design', p + '.html'))) { missing++; console.log('  нова сторінка, порівнювати нема з чим: ' + p); continue; }
  for (const w of [390, 1280]) {
    /* ONE SESSION AT A TIME, opened and closed. The first version made both
       tabs before visiting either and hung with no output at all - two live
       targets sharing one connection while the first is still loading is not a
       thing this harness promises, and nothing in it says otherwise loudly
       enough to have been noticed from the outside. */
    const read = async (srv) => {
      const s = await newSession(conn);
      const out = JSON.parse(await visit(conn, s.sessionId, `${srv.base}/design/${p}.html`, w, 900, M, s.inflight));
      await conn.send('Target.closeTarget', { targetId: s.targetId });
      return out;
    };
    const ra = await read(a);
    const rb = await read(b);
    checked++;
    if (ra.length !== rb.length) {
      moved++; console.log('  ' + p + ' @' + w + ': елементів ' + ra.length + ' -> ' + rb.length);
      continue;
    }
    /* A RENAME IS NOT A MOVE, AND UNTIL 2026-08-15 THIS COULD NOT TELL THEM APART.
       Every row begins with `TAG.className`, so changing a class - which is what
       half the repairs in this stage DO - made the row string differ while all 85
       properties stayed identical. Sweeping a dead `dark` off 105 controls came
       back as «114 comparisons, 114 moved» with an empty property list under
       every one of them, and a reader who trusted the headline would have
       reverted a correct change.
       They are genuinely different findings and both are worth seeing: a moved
       property is a visual regression, a renamed row is the markup edit you meant
       to make. So the count of MOVED is properties only, and renames are said out
       loud beside it rather than folded in or hidden. */
    const diff = [], renamed = [];
    for (let i = 0; i < ra.length; i++) {
      if (ra[i] === rb[i]) continue;
      const x = ra[i].split('|'), y = rb[i].split('|');
      (P.some((n, k) => x[k + 1] !== y[k + 1]) ? diff : renamed).push(i);
    }
    if (renamed.length) renames += renamed.length;
    if (diff.length) {
      moved++;
      console.log('  ' + p + ' @' + w + ': зрушило елементів ' + diff.length +
        (renamed.length ? ' (плюс ' + renamed.length + ' лише перейменованих)' : ''));
      for (const i of diff.slice(0, 4)) {
        const x = ra[i].split('|'), y = rb[i].split('|');
        const props = P.map((n, k) => x[k + 1] !== y[k + 1] ? n + ' ' + x[k + 1] + ' -> ' + y[k + 1] : null).filter(Boolean);
        console.log('      ' + x[0] + '   ' + props.slice(0, 3).join(' · '));
      }
    } else if (renamed.length) {
      console.log('  ' + p + ' @' + w + ': ' + renamed.length + ' рядків перейменовано, жодна властивість не зрушила');
      const i = renamed[0];
      console.log('      ' + ra[i].split('|')[0] + '  ->  ' + rb[i].split('|')[0]);
    }
  }
}
l.stop(); a.stop(); b.stop();
console.log('\n' + PAGES.length + ' сторінок · ' + checked + ' порівнянь (2 ширини) · зрушило: ' + moved +
  (renames ? ' · перейменовано рядків: ' + renames : '') +
  (missing ? ' · нових сторінок без пари: ' + missing : ''));
/* A WALK THAT COMPARED NOTHING IS NOT A PASS, and until 2026-08-15 it exited 0.
   Found by a shell mistake rather than by thought: zsh does not word-split an
   unquoted `$PAGES`, so 31 names arrived as ONE argument, every one of them was
   «a new page with nothing to compare against», and the foot of the run read
   «зрушило: 0» with a success code. The proof of a 655-rule cut would have been
   a green line over zero comparisons.
   This is the same family as the glob that reported «0 failures» over 135 pages
   after visiting one, and as `accept.mjs` blessing `kit/zzz-nope`: an instrument
   that cannot say «no» is not evidence. */
if (!checked) {
  console.log('ЖОДНОГО ПОРІВНЯННЯ НЕ ЗРОБЛЕНО - це не «нічого не зрушило», це відсутність доказу.');
  process.exit(2);
}
process.exit(moved ? 1 : 0);
