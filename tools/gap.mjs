/* tools/gap.mjs - THE DISTANCE BETWEEN TWO ELEMENTS, not the margin declared on one.

   Every other browser instrument here compares COMPUTED STYLE - `inert.mjs`,
   `tree-diff.mjs`, `private.mjs --diff` all read `getComputedStyle` on a fixed
   property set. That is the right question for «did this rule change anything
   the engine resolved», and it is blind to one whole class of nothing:

     MARGIN COLLAPSE. Two adjacent block siblings do not add their facing
     margins, the larger wins outright. `coach-clients-loading` declared
     `margin-bottom: 4px` on `.cl-sub` next to `.skclist`'s `margin-top: 18px`.
     Measured gap with the rule: 18px. Without it: 18px. Computed
     `margin-bottom` either way: 4px. So the rule was alive to every instrument
     in this folder and dead on the screen, and it survived a cut that removed
     655 of its neighbours.

   The same blindness covers the other cases where a declared number resolves to
   no distance: a margin on an inline element (vertical margins do not apply), a
   margin inside a flex or grid container (no collapse, but the container's own
   `gap` may already exceed it), and a bottom margin on a last child whose parent
   has padding.

   WHAT THIS IS NOT. It does not walk a page and find its own subjects - it is
   given pairs, because «which two elements should be a known distance apart» is
   a question about the design and not about the document. It is the instrument
   you reach for when a rule LOOKS live and you want to know whether anyone can
   see it.

     node tools/gap.mjs '[["coach-clients-loading",".cl-sub",".skclist"]]'
     node tools/gap.mjs '[[page, selA, selB], ...]'  [--width 390,1280]

   Prints, per width: the measured distance, and the two facing margins that did
   or did not produce it. A distance that is smaller than either margin is a
   collapse; a distance equal to the larger is the collapse resolving normally. */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, ROOT } from './lib.mjs';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const WI = argv.indexOf('--width');
const WIDTHS = WI < 0 ? [390, 1280] : argv[WI + 1].split(',').map(Number);
const raw = argv.filter((a, i) => a !== '--width' && (WI < 0 || i !== WI + 1))[0];
if (!raw) {
  console.log('usage: node tools/gap.mjs \'[["page",".a",".b"]]\' [--width 390,1280]');
  process.exit(2);
}
let PAIRS;
try { PAIRS = JSON.parse(raw); } catch (e) {
  console.log('перший аргумент має бути JSON-масивом трійок [сторінка, селектор, селектор]');
  process.exit(2);
}

/* THE SAME «ASK THE FILESYSTEM» AS crop.mjs, and for the same reason: a page
   name that silently resolves to a file which does not exist comes back as a
   missing element, which reads exactly like «the selector is wrong». */
const resolve = (p) => existsSync(join(ROOT, 'design', p + '.html')) ? 'design/' + p : p;

const srv = await serve();
const l = await chrome('gap');
const conn = await Conn.open(l.wsUrl);
let bad = 0;
for (const w of WIDTHS) {
  console.log('\n════ ' + w + 'px');
  for (const [page, a, b] of PAIRS) {
    const rel = resolve(page);
    if (!existsSync(join(ROOT, rel + '.html'))) {
      console.log('  ' + page.padEnd(26) + 'НЕМАЄ ТАКОЇ СТОРІНКИ ' + rel + '.html');
      bad++; continue;
    }
    const EXPR = `(() => {
      const A = document.querySelector(${JSON.stringify(a)});
      const B = document.querySelector(${JSON.stringify(b)});
      if (!A || !B) return JSON.stringify({ miss: !A ? ${JSON.stringify(a)} : ${JSON.stringify(b)} });
      const ra = A.getBoundingClientRect(), rb = B.getBoundingClientRect();
      const ca = getComputedStyle(A), cb = getComputedStyle(B);
      return JSON.stringify({
        gap: Math.round((rb.top - ra.bottom) * 100) / 100,
        mb: ca.marginBottom, mt: cb.marginTop,
        disp: getComputedStyle(A.parentElement).display,
      });
    })()`;
    const s = await newSession(conn);
    let r;
    try { r = JSON.parse(await visit(conn, s.sessionId, `${srv.base}/${rel}.html`, w, 900, EXPR, s.inflight)); }
    finally { await s.close(); }
    if (r.miss) { console.log('  ' + page.padEnd(26) + 'НЕ ЗНАЙДЕНО ' + r.miss); bad++; continue; }
    const nums = [r.mb, r.mt].map(x => parseFloat(x) || 0);
    const note = r.gap < Math.max(...nums) ? '  <- менше за більший маргін'
      : (nums[0] && nums[1] && r.gap === Math.max(...nums) ? '  <- маргіни схлопнулись' : '');
    console.log('  ' + page.padEnd(26) + a + ' -> ' + b + '   проміжок ' + r.gap + 'px' +
      '   (знизу ' + r.mb + ', зверху ' + r.mt + ', батько ' + r.disp + ')' + note);
  }
}
l.stop(); srv.stop();
process.exit(bad ? 2 : 0);
