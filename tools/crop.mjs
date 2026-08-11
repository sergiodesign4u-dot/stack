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
import { serve, chrome } from './lib.mjs';
import { writeFileSync } from 'node:fs';

const [W, page, sel, out] = [Number(process.argv[2]), process.argv[3], process.argv[4], process.argv[5]];
if (!W || !page || !sel || !out) {
  console.log('usage: node tools/crop.mjs <width> <page> <selector> <out.png>');
  process.exit(2);
}

const srv = await serve();
const l = await chrome('crop');
const conn = await Conn.open(l.wsUrl);
const s = await newSession(conn);

const r = JSON.parse(await visit(conn, s.sessionId, `${srv.base}/design/${page}.html`, W, 900,
  `(() => { const e = document.querySelector(${JSON.stringify(sel)});
     if(!e) return JSON.stringify(null);
     e.scrollIntoView({block:'center'});
     const b = e.getBoundingClientRect();
     return JSON.stringify({ x: Math.max(0, b.x + scrollX - 14), y: Math.max(0, b.y + scrollY - 14),
       width: Math.min(${W}, b.width + 28), height: b.height + 28 });
   })()`, s.inflight));

if (!r) {
  console.log('NOT FOUND  ' + sel + '  on design/' + page + '.html');
  l.stop(); srv.stop(); process.exit(1);
}
const shot = await conn.send('Page.captureScreenshot',
  { format: 'png', captureBeyondViewport: true, clip: { ...r, scale: 2 } }, s.sessionId);
writeFileSync(out, Buffer.from(shot.data, 'base64'));
console.log(out + '   ' + Math.round(r.width) + ' x ' + Math.round(r.height) + '  @' + W);
l.stop(); srv.stop();
