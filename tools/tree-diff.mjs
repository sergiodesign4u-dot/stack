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

     node tools/tree-diff.mjs HEAD                every changed design page
     node tools/tree-diff.mjs HEAD coach-order-loading   just these
     node tools/tree-diff.mjs --dir /tmp/before   against a directory, not a ref
       - which is what a migration needs: the reference is «the tree five
       minutes ago», and that has no commit to name. */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, ROOT } from './lib.mjs';
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

const P = ['display', 'position', 'width', 'height', 'margin-top', 'margin-right',
  'margin-bottom', 'margin-left', 'padding-top', 'padding-right', 'padding-bottom',
  'padding-left', 'border-top-width', 'border-right-width', 'border-bottom-width',
  'border-left-width', 'border-top-color', 'border-top-style', 'border-radius',
  'background-color', 'background-image', 'color', 'font-size', 'font-weight',
  'font-family', 'line-height', 'letter-spacing', 'text-align', 'text-decoration-line',
  'opacity', 'visibility', 'box-shadow', 'flex-direction', 'justify-content',
  'align-items', 'gap', 'grid-template-columns', 'overflow-x', 'overflow-y', 'z-index'];

/* No backtick between here and the closing quote. */
const M = `(() => {
  const all = document.querySelectorAll('*');
  const P = ${JSON.stringify(P)};
  /* BUILT WITH new RegExp AND NOT A LITERAL, because this whole expression is a
     template literal in the file above: a backslash inside it is consumed
     before the browser ever sees it, so the escapes in /http:\\/\\/127…/ arrive
     as a bare slash and end the regex on the spot. Same family as the backtick
     ban this directory states twice - a literal that is really a string cannot
     hold the syntax of the thing it looks like. */
  const PORT = new RegExp('http://127.0.0.1:[0-9]+', 'g');
  const out = [];
  for (let i = 0; i < all.length; i++) {
    const e = all[i], cs = getComputedStyle(e);
    let row = e.tagName + '.' + (typeof e.className === 'string' ? e.className.trim() : '') + '|';
    for (let j = 0; j < P.length; j++) {
      /* THE ORIGIN IS THE COMPARATOR'S OWN, NOT THE PAGE'S. Two trees mean two
         servers mean two ports, and a computed background-image is absolute:
         url("http://127.0.0.1:55765/...") against url("http://127.0.0.1:55771/...")
         is a difference this tool INTRODUCED and would otherwise report as a
         finding. Every check in this repository that compared two sources has
         hit this shape once; here it is the port. */
      row += cs.getPropertyValue(P[j]).replace(PORT, '@') + '|';
    }
    out.push(row);
  }
  return JSON.stringify(out);
})()`;

const a = await serve(dir);
const b = await serve(ROOT);
const l = await chrome('treediff');
const conn = await Conn.open(l.wsUrl);

let moved = 0, checked = 0, missing = 0;
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
    const diff = [];
    for (let i = 0; i < ra.length; i++) if (ra[i] !== rb[i]) diff.push(i);
    if (diff.length) {
      moved++;
      console.log('  ' + p + ' @' + w + ': зрушило елементів ' + diff.length);
      for (const i of diff.slice(0, 4)) {
        const x = ra[i].split('|'), y = rb[i].split('|');
        const props = P.map((n, k) => x[k + 1] !== y[k + 1] ? n + ' ' + x[k + 1] + ' -> ' + y[k + 1] : null).filter(Boolean);
        console.log('      ' + x[0] + '   ' + props.slice(0, 3).join(' · '));
      }
    }
  }
}
l.stop(); a.stop(); b.stop();
console.log('\n' + PAGES.length + ' сторінок · ' + checked + ' порівнянь (2 ширини) · зрушило: ' + moved +
  (missing ? ' · нових сторінок без пари: ' + missing : ''));
process.exit(moved ? 1 : 0);
