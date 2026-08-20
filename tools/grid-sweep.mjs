/* tools/grid-sweep.mjs - the eleventh check: how many columns does a grid actually
   have at every width, and where does that number change?

   THE QUESTION. Stage 10 replaces breakpoints with `auto-fit`, and the promise it
   makes is asymmetric: zero movement at 360, deliberate change wider, every
   difference explained. Neither half can be checked by reading css. `repeat(3,
   1fr)` under a query and `repeat(auto-fit, minmax(180px, 1fr))` are the same
   three columns at ONE width and different everywhere else, and the width where
   they diverge is not written anywhere in either declaration. So the count is
   asked of the OUTPUT: `getComputedStyle(el).gridTemplateColumns` comes back as a
   resolved track list, one px value per column, which is the column count and the
   column width in the same string.

   IT FINDS ITS OWN SUBJECTS. The selectors are read out of the component files -
   every rule that declares `grid-template-columns`, base rules and rules inside a
   query alike - and the pages are read off disk by `pages()`. An instrument handed
   its subject can be handed the wrong one; this one cannot be, and when a rewrite
   deletes a selector the sweep stops reporting it rather than silently sweeping
   the neighbour.

   WRONG VERSION 2: «NOT ON ANY PAGE» WAS ASKED OF HALF THE PAGES. The corpus is
   `design/*.html` minus `kit/`, minus `concept/`, minus the hub - the PRODUCT, on
   purpose, because that is what a width audit is about. The first run then
   printed «`.addr-2col` stands on no coloured page», which read as «dead» and was
   one edit away from being published as a finding. It stands on
   `design/kit/client-dialog.html`, rendered by `wireframes/_nav.js`: a stand page,
   outside the corpus this instrument looks at. A zero from an instrument that
   cannot see the class is not a zero, so a selector missing from the product
   corpus is now looked for in the stand as well, and the answer says which.

   THE WIDTH IS THE MEASURED WIDTH, NEVER THE INTENDED ONE. The pack is explicit:
   a scrollbar turns a requested 360 into an actual 345, and a whole class of
   defect then gets tested at a width where it does not reproduce. Every row
   carries `document.documentElement.clientWidth` as read from the page, and a row
   whose measured width differs from the requested one is printed with a `!`.

   RESIZE, DO NOT RELOAD. 33 widths x 90 pages is 2 970 page loads and roughly two
   hours. The page is loaded once and the viewport is moved under it, which is also
   what a person does when they drag the corner of a window - the very gesture the
   stage says the fluid way has to survive.

   node tools/grid-sweep.mjs                    every grid in the system
   node tools/grid-sweep.mjs goal-tile.css      one component file
   node tools/grid-sweep.mjs --sel .goaltiles   one selector
   node tools/grid-sweep.mjs --step 10          finer than the default 40px      */
import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { Conn, newSession } from './cdp.mjs';
import { serve, chrome, ROOT, pages } from './lib.mjs';

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(n); return i < 0 ? d : argv[i + 1]; };
const ONLY_SEL = flag('--sel', null);
const STEP = +flag('--step', 40);
const FROM = +flag('--from', 320);
const TO = +flag('--to', 1600);
const ONLY_FILE = argv.find(a => a.endsWith('.css')) || null;

const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, '');
const DIRS = ['design/system/components', 'design/system/patterns'];
const files = DIRS.flatMap(d => readdirSync(join(ROOT, d)).filter(f => f.endsWith('.css')).map(f => join(ROOT, d, f)))
  .filter(f => !ONLY_FILE || basename(f) === ONLY_FILE);

/* every selector that decides a track list, wherever it stands */
const subjects = new Map();          // selector -> Set(files)
for (const f of files) {
  const css = strip(readFileSync(f, 'utf8'));
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*grid-template-columns[^{}]*)\}/g)) {
    for (const sel of m[1].split(',')) {
      const s = sel.trim().replace(/\s+/g, ' ');
      if (!s || s.startsWith('@') || s.startsWith('%')) continue;
      if (!subjects.has(s)) subjects.set(s, new Set());
      subjects.get(s).add(basename(f));
    }
  }
}
const SELS = [...subjects.keys()].filter(s => !ONLY_SEL || s === ONLY_SEL);
if (!SELS.length) { console.error('жодного селектора з grid-template-columns не знайдено'); process.exit(2); }

const WIDTHS = [];
for (let w = FROM; w <= TO; w += STEP) WIDTHS.push(w);

const EXPR = sels => `(() => { const out = { w: document.documentElement.clientWidth,
    over: document.documentElement.scrollWidth > document.documentElement.clientWidth };
  ${JSON.stringify(sels)}.forEach(s => { let e; try { e = document.querySelector(s) } catch { return }
    if (!e) return; const r = e.getBoundingClientRect(); if (!r.width) return;
    out[s] = { t: getComputedStyle(e).gridTemplateColumns, bw: +r.width.toFixed(1) }; });
  return JSON.stringify(out); })()`;

const srv = await serve();
const l = await chrome('grid-sweep');
const conn = await Conn.open(l.wsUrl);
const corpus = pages('design').filter(p => !p.startsWith('kit/') && !p.startsWith('concept/') && p !== 'overview');

/* which pages carry which selector - one load each, at the widest width */
const s0 = await newSession(conn);
await conn.send('Emulation.setDeviceMetricsOverride', { width: TO, height: 900, deviceScaleFactor: 1, mobile: false }, s0.sessionId);
const carries = new Map();           // selector -> [page]
for (const p of corpus) {
  const loaded = conn.once('Page.loadEventFired', s0.sessionId);
  await conn.send('Page.navigate', { url: `${srv.base}/design/${p}.html` }, s0.sessionId);
  await loaded;
  const r = await conn.send('Runtime.evaluate', { expression: EXPR(SELS), returnByValue: true }, s0.sessionId);
  const o = JSON.parse(r.result.value || '{}');
  for (const s of SELS) if (o[s]) { if (!carries.has(s)) carries.set(s, []); carries.get(s).push(p); }
}
/* the second corpus, and it is only asked about what the first one missed */
const orphans = SELS.filter(x => !carries.has(x));
const inStand = new Map();
if (orphans.length) {
  for (const p of pages('design').filter(x => x.startsWith('kit/'))) {
    const loaded = conn.once('Page.loadEventFired', s0.sessionId);
    await conn.send('Page.navigate', { url: `${srv.base}/design/${p}.html` }, s0.sessionId);
    await loaded;
    const r = await conn.send('Runtime.evaluate', { expression: EXPR(orphans), returnByValue: true }, s0.sessionId);
    const o = JSON.parse(r.result.value || '{}');
    for (const x of orphans) if (o[x]) { if (!inStand.has(x)) inStand.set(x, []); inStand.get(x).push(p); }
  }
}
await s0.close();

/* the sweep itself: one load per page, the viewport moves under it */
const need = new Map();              // page -> [selector]
for (const [s, ps] of carries) for (const p of ps) { if (!need.has(p)) need.set(p, []); need.get(p).push(s); }
const track = new Map();             // selector -> page -> [{w, cols, first, over}]
const s1 = await newSession(conn);
for (const [p, sels] of need) {
  const loaded = conn.once('Page.loadEventFired', s1.sessionId);
  await conn.send('Emulation.setDeviceMetricsOverride', { width: WIDTHS[0], height: 900, deviceScaleFactor: 1, mobile: false }, s1.sessionId);
  await conn.send('Page.navigate', { url: `${srv.base}/design/${p}.html` }, s1.sessionId);
  await loaded;
  for (const w of WIDTHS) {
    await conn.send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: false }, s1.sessionId);
    const r = await conn.send('Runtime.evaluate', { expression: EXPR(sels), awaitPromise: true, returnByValue: true }, s1.sessionId);
    const o = JSON.parse(r.result.value || '{}');
    for (const s of sels) {
      if (!o[s]) continue;
      /* WRONG VERSION 1, caught on the molecule round: `auto-fit` COLLAPSES the
         tracks it has no item for, and `getComputedStyle` still lists them, as
         `0px`. Counting the raw list said the five trust banners stood in eight
         columns at 1360. A collapsed track is not a column. */
      const tracks = o[s].t.split(/\s+/).filter(t => t && t !== '0px');
      if (!track.has(s)) track.set(s, new Map());
      if (!track.get(s).has(p)) track.get(s).set(p, []);
      track.get(s).get(p).push({ req: w, w: o.w, cols: tracks.length, first: tracks[0], bw: o[s].bw, over: o.over });
    }
  }
}
await s1.close();
l.stop(); srv.stop();

let mism = 0, overs = 0; const bad = [], scroll = [];
for (const s of SELS) {
  const byPage = track.get(s);
  if (!byPage) {
    const st = inStand.get(s);
    console.log(`\n${s}   [${[...subjects.get(s)].join(', ')}]`);
    console.log(st ? `  не на продукті, лише у стенді: ${st.join(', ')}`
                   : `  НЕ ЗНАЙДЕНО ні на продукті, ні у стенді - кандидат у мертві`);
    continue; }
  console.log(`\n${s}   [${[...subjects.get(s)].join(', ')}]  ${byPage.size} стор.`);
  /* pages whose transition list is identical are one answer, printed once */
  const shape = new Map();
  for (const [p, rows] of byPage) {
    const tr = [];
    for (let i = 0; i < rows.length; i++) {
      if (i === 0 || rows[i].cols !== rows[i - 1].cols) tr.push(`${rows[i].cols}к від ${rows[i].w} (кол ${rows[i].first}, бокс ${rows[i].bw})`);
      if (rows[i].req !== rows[i].w) { mism++; bad.push(`${p} задано ${rows[i].req}, заміряно ${rows[i].w}`); }
      if (rows[i].over) { overs++; scroll.push(`${p} @${rows[i].w}`); }
    }
    const key = tr.join(' · ');
    if (!shape.has(key)) shape.set(key, []);
    shape.get(key).push(p);
  }
  for (const [k, ps] of [...shape].sort((a, b) => b[1].length - a[1].length))
    console.log(`  ${k}\n      ${ps.length} стор.: ${ps.slice(0, 6).join(', ')}${ps.length > 6 ? ` +${ps.length - 6}` : ''}`);
}
console.log(`\nселекторів: ${SELS.length} · зі сторінкою: ${track.size} · ширин на сторінку: ${WIDTHS.length} (${FROM}-${TO} кроком ${STEP})`);
console.log(`заміряна ширина розійшлась із заданою: ${mism}  ·  горизонтальний скрол: ${overs}`);
/* a count with no address is not a finding: name the widths, or the next reader
   has to re-run the sweep by hand to learn where to look */
for (const b of [...new Set(bad)].slice(0, 20)) console.log(`  ширина: ${b}`);
for (const b of [...new Set(scroll)].slice(0, 20)) console.log(`  скрол: ${b}`);
process.exit(mism ? 1 : 0);
