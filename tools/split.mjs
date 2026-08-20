/* tools/split.mjs - the twelfth check: does the split view actually split, and does
   every screen that could carry it carry it?

   THE QUESTION. Stage 10 step 5 is the only place in the stage where a LOOK appears
   that did not exist before: above `--bp-shell-wide` a list of records and one open
   record stand side by side. That is two claims at once - the frame really has two
   columns, and the two panes really sit in them - and neither is visible in the
   css, because the frame is one column of `minmax()` in the base rule and two under
   a query, and whether a child landed in the second column is a fact about the
   OUTPUT. So both are asked of `getBoundingClientRect`.

   AND THE ROLL-CALL IS THE OTHER HALF. A split that works on one screen and is
   missing on its six siblings is worse than no split: the coach meets it, learns
   it, and then it disappears on the screen where the session is loading. So the
   instrument also walks the whole product corpus and fails on any page that CARRIES
   THE LIST but stands outside a frame. That is the check that would have caught the
   seven session screens this step converted, and it is the one that will catch the
   eighth when somebody adds it.

   WRONG VERSION 1: THE ROLL-CALL WAS A GREP OVER THE SOURCE. The seven session
   screens were first rolled by grepping the html for the two class names and
   comparing their line numbers. It answered correctly there - and would answer
   «no split» on three of the four clients screens, which have one. `wfClientSplit()`
   builds the frame at load, so on those screens neither class exists in the file at
   all. A question about STRUCTURE can only be asked of the DOM; the source is the
   input to the structure, not the structure.

   WRONG VERSION 2: THE PROBE INJECTED THE LAYOUT IT WAS MEASURING. The first
   measurement of the session grid pushed an override stylesheet into the page to
   force the wide arrangement instead of moving the viewport, and then measured its
   own injection: it reported the client rail at 320 and the basket at 488 with the
   two swapped, and a `qa-row 324 > 258` clip that does not exist at any width. A
   probe that changes the page is measuring the probe. Nothing is injected here; the
   viewport moves and the page is left alone.

   WRONG VERSION 3: IT ASSERTED WHERE THE SPLIT TURNS ON, AND THAT WAS NEVER THE
   PROPERTY. The first version asked four widths - the point minus one, the point,
   the point plus forty, 1440 - and failed anything that was not one column below
   `--bp-shell-wide` and two at it. That model is a media query written into the
   instrument, and the moment the clients frame started asking about its PLACE the
   check failed nine times on a frame that was behaving correctly. Worse, it could
   not have caught the defect that actually shipped in that change: a bare
   `@container` turned the split ON below 860 and OFF between 860 and 960, because
   the shell takes a nav column there and the box is NOT monotonic in the viewport.
   Four probes never saw it.

   SO IT ASKS THE RULE, NOT THE POINT. Each frame declares the condition it claims -
   «two columns exactly when the viewport is at least X and my box is at least Y» -
   and the sweep walks 320 to 1600 in 10px steps checking that the frame is a pure
   FUNCTION of those two numbers at every width. A frame that opens where its own
   condition says it should not, or stays shut where it should open, fails and the
   width is named. Every transition is printed with the box that caused it, so a
   split that flickers cannot hide behind a clean summary line: the flicker is the
   output, and whether it is legal is then a question about the box, which is on the
   same line.

   THE NUMBERS ARE READ FROM THE PAGE, NEVER TYPED. `--bp-shell-wide` is asked of
   `:root` at runtime, so this file holds no copy of 860 and cannot drift from the
   registry `tools/bp.mjs` guards.

   THE REGISTRY BELOW HAS AN IDLE CONTROL ON BOTH SIDES. A declared frame found on
   no page fails as loudly as a page that carries a list outside a frame - a row
   that covers nothing reads as coverage and is worse than no row.

   node tools/split.mjs                 both frames, the whole product corpus
   node tools/split.mjs --frame .clsplit    one of them
   node tools/split.mjs -v              print every measured width, not just the seam */
import { Conn, newSession } from './cdp.mjs';
import { serve, chrome, pages } from './lib.mjs';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('-v');
const ONLY = (i => i < 0 ? null : argv[i + 1])(argv.indexOf('--frame'));

/* WHAT A SPLIT IS, in the two places step 5 built one. `list` is the pane that
   holds the many, `pane` the one that holds the one; `stack` names an element that
   below the point stands in the flow and above it joins the left column. */
/* `minBox` is the frame's own declared condition, in rem, or null when the frame
   asks about the screen alone. `box` names the element the container query measures. */
const FRAMES = [
  { name: 'клієнти', frame: '.clsplit', list: '.clist', pane: '.cldetail',
    box: '.acc-main', minBox: 41 },
  { name: 'сесія',   frame: '.cs-grid', list: '.ctabs', pane: '.cs-panel',
    box: null, minBox: null },
];
const SUBJ = FRAMES.filter(f => !ONLY || f.frame === ONLY);
if (!SUBJ.length) { console.error(`немає такої рамки: ${ONLY}`); process.exit(2); }

const EXPR = frames => `(() => {
  const root = getComputedStyle(document.documentElement);
  const rem = parseFloat(root.fontSize) || 16;
  const raw = root.getPropertyValue('--bp-shell-wide').trim();
  const out = { w: document.documentElement.clientWidth,
    point: /rem$/.test(raw) ? parseFloat(raw) * rem : parseFloat(raw),
    over: document.documentElement.scrollWidth > document.documentElement.clientWidth, f: {} };
  ${JSON.stringify(frames)}.forEach(d => {
    const fr = document.querySelector(d.frame);
    const li = document.querySelector(d.list);
    if (!fr && !li) return;
    const box = e => { if (!e) return null; const r = e.getBoundingClientRect();
      return { l: +r.left.toFixed(1), r: +r.right.toFixed(1), w: +r.width.toFixed(1),
               t: +r.top.toFixed(1), b: +r.bottom.toFixed(1) }; };
    const pa = fr ? fr.querySelector(d.pane) : null;
    /* clipped = a box whose own content is wider than the box, anywhere in the frame */
    let clip = null;
    if (fr) for (const e of fr.querySelectorAll('*')) {
      if (e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflowX === 'visible') {
        clip = (e.className || e.tagName) + ' ' + e.scrollWidth + '>' + e.clientWidth; break; } }
    out.f[d.frame] = { has: !!fr, inFrame: !!(li && li.closest(d.frame)),
      cols: fr ? getComputedStyle(fr).gridTemplateColumns : null,
      paneDisplay: pa ? getComputedStyle(pa).display : null,
      list: box(li), pane: box(pa), clip,
      boxW: d.box && document.querySelector(d.box)
        ? +document.querySelector(d.box).getBoundingClientRect().width.toFixed(1) : null };
  });
  return JSON.stringify(out); })()`;

const srv = await serve();
const l = await chrome('split');
const conn = await Conn.open(l.wsUrl);
const corpus = pages('design').filter(p => !p.startsWith('kit/') && !p.startsWith('concept/') && p !== 'overview');
const s = await newSession(conn);

const visit = async (p, w) => {
  await conn.send('Emulation.setDeviceMetricsOverride',
    { width: w, height: 900, deviceScaleFactor: 1, mobile: false }, s.sessionId);
  const loaded = conn.once('Page.loadEventFired', s.sessionId);
  await conn.send('Page.navigate', { url: `${srv.base}/design/${p}.html` }, s.sessionId);
  await loaded;
  const r = await conn.send('Runtime.evaluate', { expression: EXPR(SUBJ), awaitPromise: true, returnByValue: true }, s.sessionId);
  return JSON.parse(r.result.value || '{}');
};

/* pass one: who carries what, asked at the widest width so nothing is display:none */
const carries = new Map(SUBJ.map(f => [f.frame, []]));
const loose = [];
for (const p of corpus) {
  const o = await visit(p, 1440);
  for (const d of SUBJ) {
    const g = o.f[d.frame]; if (!g) continue;
    if (g.has && g.inFrame) carries.get(d.frame).push(p);
    else loose.push(`${p}   ${d.list} поза ${d.frame}${g.has ? ' (рамка є, список не в ній)' : ''}`);
  }
}

/* pass two: the sweep. Every 10px from 320 to 1600, one load per page, the viewport
   moving under it - a resize is what a person does to a window, and it is also the
   only way a transition BETWEEN two probes cannot hide. */
const WIDTHS = []; for (let w = 320; w <= 1600; w += 10) WIDTHS.push(w);
/* THE SWEEP STARTS AT 320 AND THE PRODUCT'S FLOOR IS 360, so a clip between them is
   REPORTED and does not fail the run. 360 is not invented here: it is the width
   `accept.mjs` walks the whole corpus at, and the width the pipeline's own rule calls
   a measured 360. Below it the product has never claimed to work. The block is
   printed separately rather than filtered away, because a finding that is silently
   dropped is indistinguishable from a finding that was never made. */
const FLOOR = 360;
const belowFloor = [];
const probe = [];
for (const [frame, ps] of carries) {
  const d = SUBJ.find(x => x.frame === frame);
  for (const p of ps) {
    await visit(p, WIDTHS[0]);
    const rows = [];
    for (const w of WIDTHS) {
      await conn.send('Emulation.setDeviceMetricsOverride',
        { width: w, height: 900, deviceScaleFactor: 1, mobile: false }, s.sessionId);
      const r = await conn.send('Runtime.evaluate',
        { expression: EXPR(SUBJ), awaitPromise: true, returnByValue: true }, s.sessionId);
      rows.push({ req: w, o: JSON.parse(r.result.value || '{}') });
    }
    probe.push({ frame, name: d.name, p, d, rows });
  }
}
await s.close(); l.stop(); srv.stop();

let fails = 0;
const say = m => console.log(m);

for (const d of SUBJ) {
  const ps = carries.get(d.frame);
  console.log(`\n${d.name}  ${d.frame}  <-  ${d.list} + ${d.pane}   ${ps.length} стор.`);
  console.log(d.minBox
    ? `  правило: дві колонки рівно тоді, коли в'юпорт >= точки І ${d.box} >= ${d.minBox}rem`
    : `  правило: дві колонки рівно тоді, коли в'юпорт >= точки`);
  /* IDLE CONTROL, side one: a declared frame nobody carries */
  if (!ps.length) { fails++; console.log(`  ПРОВАЛ: оголошена рамка ${d.frame} не стоїть на жодній сторінці продукту`); continue; }

  const shape = new Map();
  for (const r of probe.filter(x => x.frame === d.frame)) {
    const line = [];
    let prev = null;
    for (const { req, o } of r.rows) {
      const g = o.f[d.frame]; if (!g) continue;
      const rem = 16;
      const tracks = (g.cols || '').split(/\s+/).filter(t => t && t !== '0px');
      const two  = tracks.length === 2;
      const side = g.list && g.pane && g.pane.w > 0 && g.list.r <= g.pane.l + 1;

      if (req !== o.w) { fails++; say(`  ПРОВАЛ ${r.p}: задано ${req}, заміряно ${o.w}`); }
      if (o.w < FLOOR) {
        if (o.over) belowFloor.push(`${r.p} @${o.w}: горизонтальна прокрутка`);
        if (g.clip) belowFloor.push(`${r.p} @${o.w}: обрізано ${g.clip}`);
      } else {
        if (o.over)  { fails++; say(`  ПРОВАЛ ${r.p} @${o.w}: горизонтальна прокрутка сторінки`); }
        if (g.clip)  { fails++; say(`  ПРОВАЛ ${r.p} @${o.w}: обрізано ${g.clip}`); }
      }

      /* THE RULE, asked as a rule: two columns exactly when both gates open */
      const shellOpen = o.w >= o.point;
      const boxOpen   = d.minBox === null ? true : (g.boxW !== null && g.boxW >= d.minBox * rem);
      const want = shellOpen && boxOpen;
      if (two !== want) {
        fails++;
        say(`  ПРОВАЛ ${r.p} @${o.w}: колонок ${tracks.length}, а правило каже ${want ? 2 : 1}`
          + ` (оболонка ${shellOpen ? 'відкрита' : 'закрита'}, бокс ${g.boxW === null ? '-' : g.boxW}`
          + `${d.minBox ? ' проти ' + d.minBox * rem : ''})`);
      }
      if (two && !side) { fails++; say(`  ПРОВАЛ ${r.p} @${o.w}: дві колонки, а панелі поруч немає`); }
      if (!two && g.paneDisplay && g.paneDisplay !== 'none' && d.pane === '.cldetail') {
        fails++; say(`  ПРОВАЛ ${r.p} @${o.w}: одна колонка, а панель не прихована`); }

      /* every transition is PRINTED with the box that caused it - a split that
         flickers cannot hide behind a clean summary line */
      if (prev !== null && two !== prev) {
        line.push(`${o.w}: ${prev ? 2 : 1}->${two ? 2 : 1}к (бокс ${g.boxW === null ? '-' : Math.round(g.boxW)})`);
      }
      prev = two;
    }
    const key = line.length ? line.join(' · ') : 'жодного переходу на 320-1600';
    if (!shape.has(key)) shape.set(key, []);
    shape.get(key).push(r.p);
  }
  for (const [k, ps2] of [...shape].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  переходи: ${k}`);
    console.log(`    ${VERBOSE ? ps2.join(', ') : ps2.length + ' стор.: ' + ps2.slice(0, 6).join(', ') + (ps2.length > 6 ? ' …' : '')}`);
  }
}

/* IDLE CONTROL, side two: the list stands somewhere and no frame holds it */
console.log('');
if (loose.length) { fails += loose.length; console.log(`носій без рамки (${loose.length}):`); loose.forEach(x => console.log('  ПРОВАЛ ' + x)); }
else console.log('носій без рамки: 0 - кожна сторінка зі списком стоїть у своїй рамці');

console.log('');
if (belowFloor.length) {
  console.log(`нижче підлоги ${FLOOR}, не валить прогін (${belowFloor.length}):`);
  belowFloor.forEach(x => console.log('  ' + x));
} else console.log(`нижче підлоги ${FLOOR}: 0`);

console.log(`\nкорпус ${corpus.length} стор. · 129 ширин на сторінку, крок 10px · стенд і концепт не предмет`);
console.log(fails ? `\nПРОВАЛІВ: ${fails}` : `\nчисто: кожна рамка - функція від свого правила на кожній із 129 ширин, нічого не обрізано`);
process.exit(fails ? 1 : 0);
