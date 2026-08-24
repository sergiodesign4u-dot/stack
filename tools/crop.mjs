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

     node tools/crop.mjs <width> <page> <selector> <out.png> [--dark]
     node tools/crop.mjs 390 coach-tariff .tf-compare /tmp/t.png
     node tools/crop.mjs 900 kit/badge ".kp-sec:nth-of-type(4) .kp-demo" /tmp/b.png */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, ROOT } from './lib.mjs';
import { join, resolve, relative } from 'node:path';
import { writeFileSync, existsSync } from 'node:fs';

const [W, page, sel, out] = process.argv.slice(2).filter(a => !a.startsWith('--'))
  .map((a, i) => i === 0 ? Number(a) : a);
if (!W || !page || !sel || !out) {
  console.log('usage: node tools/crop.mjs <width> <page> <selector> <out.png>');
  process.exit(2);
}

/* 12.10 - AN INSTRUMENT MAY NOT LEAVE ANYTHING IN THE TREE IT MEASURES. A
   critique subagent, told in three places to write nothing, ran this with the
   arguments a place out and left `content-guarantee` - a 29KB PNG with no
   extension - at the repository ROOT. Nothing stopped it: the fourth argument
   was taken as a path and written to, and a name that is obviously a SCREEN and
   obviously not a `.png` was accepted without comment.

   That is the same shape as everything else in this folder: the failure is
   silent and looks like success, because a screenshot appears and the caller
   never looks at where. Two guards, and both refuse rather than warn - a warning
   on a tool that a subagent runs is read by nobody:

     · the output must end in `.png`. A screen name never does.
     · the output must be OUTSIDE the tree this instrument photographs. An
       instrument that can write into its own subject can change what the next
       run measures. */
const outAbs = resolve(process.cwd(), out);
if (!/\.png$/i.test(out)) {
  console.log('ВІДМОВА: четвертий аргумент це ФАЙЛ призначення, і він мусить закінчуватись на .png - «' +
    out + '\u00BB схоже на ім\u0027я екрана. Порядок: <width> <page> <selector> <out.png>');
  process.exit(2);
}
if (!relative(ROOT, outAbs).startsWith('..')) {
  console.log('ВІДМОВА: ' + outAbs + ' лежить УСЕРЕДИНІ дерева, яке цей прилад фотографує.\n' +
    'Прилад не лишає файлів у власному предметі - віддай шлях поза репозиторієм.');
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
/* 12.10 - `--dark` PHOTOGRAPHS THE OTHER THEME, and it is here because a
   critique agent had to hand-roll the plumbing to ask a question this file
   already had every part of. The product carries no theme switch, so the theme
   is set the way every instrument here sets it: the attribute on `<html>`. It
   goes on BEFORE the rect is read, because a theme can change a box - a border
   that appears, a shadow that grows - and a rect read in one theme and clipped
   in the other is the same class of wrong rect the header of this file is
   already about. */
/* WRONG VERSION, and it photographed a LIGHT page while reporting success:
   setting `data-theme="dark"` on `<html>` before the document loads does
   nothing, because `design/system/theme.js` runs `apply(read())` on every load
   and `apply` REMOVES the attribute whenever the stored mode is not dark. The
   product's switch is the storage key, not the attribute - the attribute is
   what the key produces. So the instrument sets what a PERSON sets and lets the
   product apply it, which is also the only version that keeps working if the
   theme ever gains a third state. */
const DARK = process.argv.includes('--dark');
if (DARK) await conn.send('Page.addScriptToEvaluateOnNewDocument',
  { source: "try{localStorage.setItem('stack-theme','dark')}catch(e){}" +
            "document.documentElement.setAttribute('data-theme','dark')" }, s.sessionId);

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
