/* tools/crop.mjs - one element, photographed.

   Numbers say a box is 44 tall. Only a picture says the pill still sits beside
   the word - which is exactly the defect a whole step of correct measurements
   missed once, when a margin was deleted and every number still read right.

   TWO THINGS THAT MADE IT RETURN BLANK PAPER, both worth keeping written down
   because the failure is silent and looks like an empty component:

   1. `Page.captureScreenshot` clips in PAGE coordinates, not viewport ones. A
      rect read from `getBoundingClientRect()` after scrolling is neither.
   2. Even with the right rect, a clip outside the CURRENT viewport is not
      painted without `captureBeyondViewport: true` - and base.css sets
      `scroll-behavior: smooth`, so `scrollIntoView` has not finished moving
      anything by the time the rect is read. With the flag the scroll is
      irrelevant, which is why the scroll is left in but no longer relied on.

   A screenshot tool that returns white on a wrong rect is the same class of
   instrument as a hover test that cannot say «the cursor missed».

     node tools/crop.mjs <width> <page> <selector> <out.png>
     node tools/crop.mjs 390 coach-tariff .tf-compare /tmp/t.png
     node tools/crop.mjs 900 kit/badge ".kp-sec:nth-of-type(4) .kp-demo" /tmp/b.png */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, ROOT } from './lib.mjs';
import { join } from 'node:path';
import { writeFileSync, existsSync } from 'node:fs';

const [W, page, sel, out] = [Number(process.argv[2]), process.argv[3], process.argv[4], process.argv[5]];
if (!W || !page || !sel || !out) {
  console.log('usage: node tools/crop.mjs <width> <page> <selector> <out.png>');
  process.exit(2);
}

const srv = await serve();
const l = await chrome('crop');
const conn = await Conn.open(l.wsUrl);
const s = await newSession(conn);

/* A PAGE OUTSIDE design/ IS STILL A PAGE, and the first two tries at saying so
   were both wrong. The original hard-coded `design/<name>.html`, so
   `voice/microcopy` silently resolved to a file that does not exist and came
   back as blank paper - the same white-on-a-wrong-target failure this file's
   header already warns about, from a second cause. The fix after that read «a
   name with a slash is a path from the root», which promptly broke
   `kit/pagination` - a form that had worked for the whole session, because it IS
   under design/. Two guesses about where a file lives, two wrong.
   ASK THE FILESYSTEM. It knows, and neither of us did. */
const rel = existsSync(join(ROOT, 'design', page + '.html')) ? 'design/' + page : page;
const url = `${srv.base}/${rel}.html`;
if (!existsSync(join(ROOT, rel + '.html'))) {
  console.log('NO SUCH PAGE  ' + rel + '.html');
  process.exit(2);
}
const r = JSON.parse(await visit(conn, s.sessionId, url, W, 900,
  `(() => { const e = document.querySelector(${JSON.stringify(sel)});
     if(!e) return JSON.stringify(null);
     e.scrollIntoView({block:'center'});
     const b = e.getBoundingClientRect();
     return JSON.stringify({ x: Math.max(0, b.x + scrollX - 14), y: Math.max(0, b.y + scrollY - 14),
       width: Math.min(${W}, b.width + 28), height: b.height + 28 });
   })()`, s.inflight));

if (!r) {
  console.log('NOT FOUND  ' + sel + '  on ' + url);
  l.stop(); srv.stop(); process.exit(1);
}
/* THE FREEZE IS RIGHT FOR A CENSUS AND WRONG FOR A PHOTOGRAPH, and this is the
   third separate cause of a blank crop found in one session.
   `cdp.mjs` pins every animation at its FIRST FRAME on purpose - a before/after
   pass otherwise returns 56 rows of skeleton pulse, and its header explains why.
   But a page that fades its sections in has `opacity: 0` at frame zero, so the
   freeze holds the whole page invisible: measured on `voice/microcopy.html`,
   five elements carry `fadeUp`, `animation-play-state: paused`, `opacity: 0` -
   the `<h1>` inside them computes opacity 1 and still photographs as white paper,
   because its ANCESTOR section is the transparent one.
   A screenshot wants the settled page, not frame zero. Removing the animation
   entirely is what settles it: the element falls back to its own static style,
   which is where the animation was going to land. This runs AFTER the census
   expression, so nothing measured is affected. */
await conn.send('Runtime.evaluate', { expression:
  `(() => { const st = document.createElement('style');
     st.textContent = '*, *::before, *::after { animation: none !important; }';
     document.head.appendChild(st); })()`, returnByValue: true }, s.sessionId);
await new Promise(r => setTimeout(r, 60));
const shot = await conn.send('Page.captureScreenshot',
  { format: 'png', captureBeyondViewport: true, clip: { ...r, scale: 2 } }, s.sessionId);
writeFileSync(out, Buffer.from(shot.data, 'base64'));
console.log(out + '   ' + Math.round(r.width) + ' x ' + Math.round(r.height) + '  @' + W);
l.stop(); srv.stop();
