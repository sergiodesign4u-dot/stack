/* tools/proof.mjs - take the pixel proof, BOTH halves, in one browser.

   WHY THIS EXISTS, and it is the sentence this repository has written down three
   times already: a check rebuilt from memory each step is a hand fix.
   `design/kit/pixel-proof.html` shows 40 before/after pairs and was shot ONCE, by
   hand, on 2026-08-06. Six named changes landed in the light theme on
   2026-08-13, and the proof could not be re-taken, because nothing knew how it
   had been taken. A proof that goes stale the first time the product moves is a
   screenshot, not a proof.

   WHY IT RE-SHOOTS THE «BEFORE» HALF TOO, which was not the plan and is the
   finding of the step. The first version only re-photographed the working tree
   and compared the result with the stored «after». It reported that all 40
   screens had moved, by 2 to 15 percent, with channel differences up to 255 -
   and the diff map said why: EVERY GLYPH ON EVERY SCREEN was outlined twice.
   That is sub-pixel text rendering, not layout. The 2026-08-06 set was taken in
   an environment nobody recorded - Chrome build, font state, device scale - so
   nothing shot today is comparable with it, and no amount of care at this end
   fixes that.

   The page's own «Як це заміряно» already states the right method: «два дерева,
   один браузер, одна мить». So both halves are taken here, back to back, from
   two servers and one Chrome. BASE is `git archive` of the baseline commit
   unpacked into a temp directory - never into the repository - and it is the
   same commit the page names: the last one before step 1 of stage 08.

   IT FINDS ITS OWN SUBJECT, and the subject is the set that already has a
   baseline: the 40 names in `design/kit/proof/`. `design/` holds 88 coloured
   screens now, and shooting all of them would produce 48 «after» images with
   nothing under them - a wider claim, not a wider proof. Pass names to shoot a
   subset.

   THE FRAME IS READ OFF THE STORED IMAGE, not typed here: every baseline is
   293x633, a 390x844 first screen at scale .75, and the numbers come from the
   JPEG's own header so the pair cannot drift apart by a rounding.

   ANIMATION IS REMOVED, NOT PAUSED - crop.mjs learned this the hard way: cdp.mjs
   pins every animation at frame ZERO for a census, and a page that fades its
   sections in has `opacity: 0` there, so the freeze photographs white paper.

   THE COMPARISON IS BY PIXEL, NOT BY BYTE, and that was the first version too.
   JPEG is lossy and its encoder is Chrome's, so a different Chrome writes
   different bytes for the same picture and a byte check answers «changed» to
   everything - the «instrument that cannot return no» this repository has
   recorded twice. Both images are handed back to the BROWSER, which decodes them
   and counts the pixels whose largest channel difference is over TOL.

     node tools/proof.mjs                    re-take both halves, all 40
     node tools/proof.mjs product cart       just these
     node tools/proof.mjs --against HEAD     what does the WORKING TREE move
                                             against a ref? writes nothing.
*/
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, ROOT } from './lib.mjs';
import { join } from 'node:path';
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const DIR = join(ROOT, 'design/kit/proof');
/* the commit `pixel-proof.html` names as «before»: the last one before step 1 of
   stage 08. It is a constant of the PAGE, so it lives beside the page's data. */
const BASE_REF = '9e44109';
/* TOL: JPEG re-encoding noise sits at 1-3 levels per channel, so 12 is well clear
   of it and well under any real colour move. FLOOR: below a tenth of a percent of
   the screen a difference is a hinting seam, not a decision. Both are printed on
   every run, because a threshold nobody sees decides silently. */
const TOL = 12, FLOOR = 0.1;
/* --map writes a red-on-white picture of WHERE the difference is, beside the
   percentage of HOW MUCH. The percentage says a screen moved; only the map says
   which element, and «every difference is explained by a line of a named list»
   cannot be checked without knowing which element. */
const MAP_DIR = (() => { const i = process.argv.indexOf('--map'); return i > -1 ? process.argv[i + 1] : null; })();
const MAP = MAP_DIR ? 'true' : 'false';

const argv = process.argv.slice(2);
const againstAt = argv.indexOf('--against');
const AGAINST = againstAt > -1 ? argv[againstAt + 1] : null;
const mapAt = argv.indexOf('--map');
const named = argv.filter((a, i) => !a.startsWith('-') && i !== againstAt + 1 && i !== mapAt + 1);

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xFF) { i++; continue; }
    const m = buf[i + 1];
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC)
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

/* a tree at some ref, unpacked OUTSIDE the repository */
function unpack(ref) {
  const dir = mkdtempSync(join(tmpdir(), 'stack-proof-'));
  const tar = execFileSync('git', ['archive', ref], { cwd: ROOT, maxBuffer: 1 << 30 });
  execFileSync('tar', ['-x', '-C', dir], { input: tar, maxBuffer: 1 << 30 });
  return dir;
}

const all = readdirSync(DIR).filter(f => f.endsWith('-before.jpg')).map(f => f.replace('-before.jpg', '')).sort();
const SUBJ = named.length ? named : all;
const missing = SUBJ.filter(n => !all.includes(n));
/* A SCREEN WITH NO STORED BASELINE STILL HAS A «BEFORE», and refusing it was
   this file's own blind spot - found at stage 09 step 6. `--against` writes
   nothing and reads nothing: both halves are shot live, one from the working
   tree and one from a `git archive` of the ref. Yet the subject list was gated
   on `design/kit/proof/`, so the ten coach screens added at 8.48 - the ones the
   pattern step actually converted - answered «немає базового знімка» and the
   proof covered 5 of 15. The frame is the one place a stored image was needed,
   and it is a CONSTANT of the page rather than a property of the file: every
   baseline is 293x633, a 390x844 first screen at scale .75, which is what the
   header above already states. So in `--against` mode a missing baseline takes
   that constant and is named in the run, and only the writing mode still
   insists on a pair it would have to keep consistent. */
const FRAME = { w: 293, h: 633 };
if (missing.length && !AGAINST) { console.log('немає базового знімка (' + missing.length + '): ' + missing.join(' ')); process.exit(2); }

const OTHER_REF = AGAINST || BASE_REF;
console.log('предмет: ' + SUBJ.length + ' екранів з ' + all.length + ' у design/kit/proof/'
  + (AGAINST && missing.length ? '\n  без збереженого базового знімка, кадр за константою 390x844 .75 (' + missing.length + '): ' + missing.join(' ') : ''));
console.log(AGAINST
  ? 'режим: порівняння робочого дерева з ' + AGAINST + ' - на диск не пишеться нічого'
  : 'режим: перезняти обидві половини одним браузером - «до» це git archive ' + BASE_REF);

const otherDir = unpack(OTHER_REF);
const srvWork = await serve();
const srvOther = await serve(otherDir);
const l = await chrome('proof');
const conn = await Conn.open(l.wsUrl);
const s = await newSession(conn);

async function shoot(base, name, vw, vh, scale) {
  await visit(conn, s.sessionId, `${base}/design/${name}.html`, vw, vh, '1', s.inflight);
  await conn.send('Runtime.evaluate', { expression:
    `(() => { const st = document.createElement('style');
       st.textContent = '*, *::before, *::after { animation: none !important; transition: none !important; }';
       document.head.appendChild(st); window.scrollTo(0, 0); })()`, returnByValue: true }, s.sessionId);
  /* SETTLE, and 90ms was not enough - measured. Two runs of `--against HEAD` over
     the same 40 screens reported 21 moved and then 19, with different names in
     the two lists: `.uiv-topbar` differed on some screens and not on others, in
     the same tree. The stand's bar is BUILT by `uivBar()` and its chevron is
     swapped by the mark passes afterwards, so a capture taken while those are
     still running photographs a bar that is half-drawn. A proof that gives two
     answers to one question is not a proof.
     A FIXED WAIT DID NOT FIX IT EITHER - 300ms plus two frames still gave two
     different lists. The bar is not slow, it is LATE: `uivBar()` builds it and
     the mark passes then swap its chevron, and each of those changes the page's
     height, so a screen captured between them has everything below shifted by 8
     pixels. The wait is now on the page's own signature - document height, the
     bar's height, how many svg marks exist - held still for three polls. It asks
     the page whether it has finished rather than guessing how long that takes. */
  await conn.send('Runtime.evaluate', { awaitPromise: true, returnByValue: true, expression:
    `(async () => {
       const sig = () => [document.documentElement.scrollHeight,
                          (document.querySelector('.uiv-topbar') || {}).offsetHeight,
                          document.querySelectorAll('svg').length].join('/');
       let last = '', stable = 0;
       for (let i = 0; i < 40; i++) {
         await new Promise(r => setTimeout(r, 60));
         const now = sig();
         stable = (now === last) ? stable + 1 : 0;
         last = now;
         if (stable >= 3) break;
       }
       await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
     })()` }, s.sessionId);
  const shotRes = await conn.send('Page.captureScreenshot',
    { format: 'jpeg', quality: 82, captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: vw, height: vh, scale } }, s.sessionId);
  return shotRes.data;
}

/* both pictures decoded by the browser that drew them */
async function diff(aData, bData) {
  const q = await conn.send('Runtime.evaluate', { awaitPromise: true, returnByValue: true, expression:
    `(async () => {
       const load = src => new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = src; });
       const a = await load('data:image/jpeg;base64,' + ${JSON.stringify(aData)});
       const b = await load('data:image/jpeg;base64,' + ${JSON.stringify(bData)});
       if (a.width !== b.width || a.height !== b.height) return JSON.stringify({ pct: 100, worst: 255 });
       const c = document.createElement('canvas'); c.width = a.width; c.height = a.height;
       const x = c.getContext('2d', { willReadFrequently: true });
       x.drawImage(a, 0, 0); const A = x.getImageData(0, 0, c.width, c.height).data;
       x.clearRect(0, 0, c.width, c.height);
       x.drawImage(b, 0, 0); const B = x.getImageData(0, 0, c.width, c.height).data;
       let n = 0, w = 0;
       for (let i = 0; i < A.length; i += 4) {
         const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i+1] - B[i+1]), Math.abs(A[i+2] - B[i+2]));
         if (d > w) w = d;
         if (d > ${TOL}) n++;
       }
       let map = '';
       if (${MAP}) {
         const D = x.createImageData(c.width, c.height);
         for (let i = 0; i < A.length; i += 4) {
           const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i+1] - B[i+1]), Math.abs(A[i+2] - B[i+2]));
           const on = d > ${TOL};
           D.data[i] = on ? 255 : 245; D.data[i+1] = on ? 0 : 245; D.data[i+2] = on ? 0 : 245; D.data[i+3] = 255;
         }
         x.putImageData(D, 0, 0);
         map = c.toDataURL('image/png').split(',')[1];
       }
       /* WHERE, AND WHAT. A percentage says a screen moved; the rule on
          pixel-proof.html is that every difference is explained by a line of a
          named list, and that cannot be checked without knowing which ELEMENT
          moved. The changed pixels are grouped into rectangles by a flood fill
          over a coarse grid - 8px cells, so a word is one region and not forty -
          and each region's centre is handed back in PAGE coordinates. */
       const CELL = 8, gw = Math.ceil(c.width / CELL), gh = Math.ceil(c.height / CELL);
       const grid = new Uint8Array(gw * gh);
       for (let i = 0; i < A.length; i += 4) {
         const d = Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i+1] - B[i+1]), Math.abs(A[i+2] - B[i+2]));
         if (d <= ${TOL}) continue;
         const px = (i / 4) % c.width, py = Math.floor((i / 4) / c.width);
         grid[Math.floor(py / CELL) * gw + Math.floor(px / CELL)] = 1;
       }
       const regions = [];
       for (let g = 0; g < grid.length; g++) {
         if (grid[g] !== 1) continue;
         const q = [g]; grid[g] = 2;
         let x0 = gw, x1 = 0, y0 = gh, y1 = 0, cells = 0;
         while (q.length) {
           const k = q.pop(); cells++;
           const kx = k % gw, ky = Math.floor(k / gw);
           if (kx < x0) x0 = kx; if (kx > x1) x1 = kx;
           if (ky < y0) y0 = ky; if (ky > y1) y1 = ky;
           for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]) {
             const nx = kx + dx, ny = ky + dy;
             if (nx < 0 || ny < 0 || nx >= gw || ny >= gh) continue;
             const nk = ny * gw + nx;
             if (grid[nk] === 1) { grid[nk] = 2; q.push(nk); }
           }
         }
         regions.push({ cells, x: (x0 + x1 + 1) * CELL / 2, y: (y0 + y1 + 1) * CELL / 2,
                        w: (x1 - x0 + 1) * CELL, h: (y1 - y0 + 1) * CELL });
       }
       regions.sort((p, r) => r.cells - p.cells);
       return JSON.stringify({ pct: 100 * n / (A.length / 4), worst: w, map, regions: regions.slice(0, 6) });
     })()` }, s.sessionId);
  return JSON.parse(q.result.value);
}

const moved = [], same = [], skipped = [];
for (const name of SUBJ) {
  const dim = all.includes(name)
    ? jpegSize(readFileSync(join(DIR, name + '-before.jpg')))
    : FRAME;
  if (!dim) { skipped.push(name + ' (базовий знімок не читається)'); process.stdout.write('x'); continue; }
  if (!existsSync(join(ROOT, 'design', name + '.html'))) { skipped.push(name + ' (немає сторінки)'); process.stdout.write('x'); continue; }
  const scale = dim.w / 390;
  const vw = Math.round(dim.w / scale), vh = Math.round(dim.h / scale);

  const other = await shoot(srvOther.base, name, vw, vh, scale);
  const work  = await shoot(srvWork.base,  name, vw, vh, scale);
  const d = await diff(other, work);
  if (MAP_DIR && d.map && d.pct >= FLOOR) {
    mkdirSync(MAP_DIR, { recursive: true });
    writeFileSync(join(MAP_DIR, name + '-diff.png'), Buffer.from(d.map, 'base64'));
  }

  if (!AGAINST) {
    writeFileSync(join(DIR, name + '-before.jpg'), Buffer.from(other, 'base64'));
    writeFileSync(join(DIR, name + '-after.jpg'),  Buffer.from(work,  'base64'));
  }
  /* the element under each region, asked of the page that is still open */
  if (d.pct >= FLOOR && d.regions && d.regions.length) {
    const pts = d.regions.filter(r => r.cells >= 2).map(r => [Math.round(r.x / scale), Math.round(r.y / scale)]);
    const q = await conn.send('Runtime.evaluate', { returnByValue: true, expression:
      `JSON.stringify(${JSON.stringify(pts)}.map(([x, y]) => {
         const e = document.elementFromPoint(x, y);
         if (!e) return '(порожньо)';
         const nm = n => n.tagName.toLowerCase() + (n.className && n.className.toString ? '.' + n.className.toString().trim().split(/\\s+/).slice(0, 2).join('.') : '');
         return nm(e) + (e.parentElement ? ' < ' + nm(e.parentElement) : '');
       }))` }, s.sessionId);
    d.what = JSON.parse(q.result.value);
  }
  (d.pct >= FLOOR ? moved : same).push({ name, ...d });
  process.stdout.write(d.pct >= FLOOR ? '#' : '.');
}

console.log('\n');
console.log('   поріг: піксель зрушений від різниці ' + TOL + ' на канал, екран - від ' + FLOOR + '% зрушених пікселів');
console.log('   без різниці: ' + same.length +
  (same.length ? '   (найгучніший ' + same.reduce((a, b) => Math.max(a, b.pct), 0).toFixed(3) + '%)' : ''));
if (moved.length) {
  console.log('   ' + (AGAINST ? 'ЗРУШИЛО ПРОТИ ' + AGAINST : 'РІЗНИЦЯ ПРОТИ ' + BASE_REF) + ' (' + moved.length + '):');
  for (const m of moved) {
    console.log('      ' + m.name.padEnd(22) + m.pct.toFixed(2).padStart(6) + '%   найбільший канал ' + m.worst);
    (m.what || []).forEach((w, i) => console.log('         ' + String(m.regions[i].w) + 'x' + m.regions[i].h + '  ' + w));
  }
}
if (skipped.length) console.log('   пропущено (' + skipped.length + '): ' + skipped.join(', '));
console.log('\n   ' + (AGAINST ? 'на диск не записано нічого' : 'записано в design/kit/proof/*-{before,after}.jpg'));
console.log('   ЩО ДАЛІ: кожна різниця мусить пояснюватись рядком з іменованого списку');
console.log('   на pixel-proof.html. Різниця без рядка - це дефект, а не рух.');

l.stop(); srvWork.stop(); srvOther.stop();
try { rmSync(otherDir, { recursive: true, force: true }); } catch {}
