/* tools/width-sweep.mjs - THE HOLE STAGE 10 LEFT OPEN ON PURPOSE: what breaks
   BETWEEN the points, at the widths nobody looked at.

   WHY IT DID NOT EXIST. Stage 10 measured at 360, at 390 and at 1280, and it
   proved a great deal there: `accept.mjs` walks the corpus at the floor,
   `tree-diff.mjs` compares two trees property by property, `grid-sweep.mjs`
   counts columns, `split.mjs` sweeps 129 widths - but only for the FRAMES it
   declares. `responsive.md` says so in its own contract table, and the row it
   marks red is this one: «breaks between the points - not measured». A stage
   whose whole subject is width closed with its main class carrying no findings,
   and that is a hole, not a zero. Three of its four instruments would have
   reported a clean stage.

   WHAT IT ASKS, AND EVERY QUESTION IS ASKED AT EVERY WIDTH.
     1  THE DOCUMENT OVERFLOWS SIDEWAYS. `scrollWidth > clientWidth` on the root.
        `accept.mjs` asks this at two widths; a layout that is clean at 360 and
        at 1280 and opens a scrollbar at 610 is invisible to it, and 610 is a
        width people have.
     2  AN ELEMENT LEAVES THE VIEWPORT. The worst `rect.right - innerWidth` in
        the document, with the element that owns it named. This is the half the
        first question cannot see: a child can hang out over the edge while the
        root reports no scroll, because an ancestor clips it - the pixels are
        gone either way.
     3  THE LINE MEASURE. Running text wider than `--container-text`, which is
        READ OUT of the browser rather than typed here, so the ceiling cannot
        drift from the token. Stage 10 capped five selectors, measured at 1600
        alone; a block can also cross the measure halfway up the ramp.
     4  ONE TOP-LEVEL NAVIGATION CARRIER, ASKED AT EVERY WIDTH. `tab-walk.mjs`
        proved this on four pages at two widths. The failure this class fears -
        the mobile drawer and the desktop bar both live for a band of widths -
        is a failure that exists only BETWEEN two points by definition.

   AND IT NAMES THE EXACT PIXEL. The sweep runs at 10px, which finds the band;
   the band is then bisected to 1px, because «somewhere between 600 and 610» is
   a finding a person cannot act on and «601» is one they can.

   THE FLOOR IS 360 AND THE SWEEP STARTS AT 320. Everything below the floor is
   reported in its own block and does not fail the run: the product has never
   claimed to work there. Printed rather than filtered, because a finding
   silently dropped is indistinguishable from a finding never made - the same
   rule `split.mjs` states for the same reason.

   THE CORPUS IS THE COLOURED ONE, AND THAT IS THE RULE, NOT A SHORTCUT.
   Counting happens on the grey corpus because the whole product is there;
   PROVING happens on the coloured one because that is what renders the system.
   The stand and the three concept pages are not the product and are swept only
   when asked by name. */
import { serve, chrome, pages, ROOT } from './lib.mjs';
import { Conn, newSession } from './cdp.mjs';

const argv = process.argv.slice(2);
const STEP = +(argv[argv.indexOf('--step') + 1] || 10) || 10;
const WITH_STAND = argv.includes('--stand');
const named = argv.filter(a => !a.startsWith('-') && !/^\d+$/.test(a));

/* One expression, asked of one width. Built by join rather than as a template
   literal: this repository has closed a template literal with a backtick inside
   a comment three times in one stage, and the string below quotes css. */
const EXPR = [
  '(() => {',
  '  const de = document.documentElement, vw = window.innerWidth;',
  '  const ceil = parseFloat(getComputedStyle(de).getPropertyValue("--container-text")) || 0;',
  /* WRONG VERSION 1: THE FIRST RUN MEASURED THE HARNESS. Every coloured page
     carries the stand navigator, and the sweep dutifully reported `NAV.us-nav`
     over the reading measure and «4 navigation carriers» - findings about the
     scaffolding this repository builds its pages inside, on a run whose subject
     is the product. The same class Codex found in stage 11, where
     `design/_stand.css` sat in neither census corpus. The boundary is not a
     typed exclusion list: the product is what stands inside `.wf-canvas`, the
     harness is everything else, and the page itself says which is which. */
  '  const root = document.querySelector(".wf-canvas") || document.body;',
  '  const bare = !document.querySelector(".wf-canvas");',
  /* WRONG VERSION 3: `ch` WAS APPROXIMATED WITH A CANVAS. `measureText("0")` is
     close to the CSS `ch` advance and not equal to it, and the first run turned
     that gap into three findings reading «68.5ch against 68» - a defect made of
     the instrument's own rounding. A unit is measured with itself: a probe span
     carrying the element's font and `width: 1ch` reports what the browser means
     by `ch`, and no tolerance has to be invented to cover the difference. */
  '  const probe = document.createElement("span");',
  '  probe.style.cssText = "position:absolute;visibility:hidden;width:1ch;padding:0;border:0";',
  '  document.body.appendChild(probe);',
  '  const chCache = new Map();',
  '  const chOf = (f) => { if (!chCache.has(f)) { probe.style.font = f; chCache.set(f, probe.getBoundingClientRect().width || 0); } return chCache.get(f); };',
  /* WRONG VERSION 10: ONE OFFENDER PER WIDTH MEANS A FIX REVEALS THE NEXT ONE.
     The first writing kept only the WORST element at each width, so capping
     `.qans` on `product` immediately surfaced `.simple`, which had been standing
     behind it the whole time. An instrument that has to be run, fixed and run
     again to see one layer deeper is an instrument that cannot tell «clean» from
     «one more round to go», and the round count is invisible in its own output.
     Every element over the ceiling is collected now, keyed by owner. */
  '  let worst = null, railWorst = null, carriers = 0;',
  '  const measures = new Map();',
  '  for (const el of root.querySelectorAll("*")) {',
  '    const cs = getComputedStyle(el);',
  '    if (cs.display === "none" || cs.visibility === "hidden") continue;',
  '    const r = el.getBoundingClientRect();',
  '    if (r.width === 0 && r.height === 0) continue;',
  /* WRONG VERSION 12: THE INSIDE OF AN SVG IS NOT LAYOUT. Once the rail was
     separated out, a `rect` surfaced on `account-wishlist` reading 356px past the
     edge. It is a drawing instruction inside an `<svg>`, living in the svg's own
     coordinate space, and the browser clips it to the svg box anyway. The element
     that has a layout box is the `<svg>` itself, and that one is still asked. */
  '    if (el.ownerSVGElement) continue;',
  /* 2: out of the viewport. Fixed and sticky chrome that parks itself off-screen
     is a technique, not a break, so an element the author moved out with a
     transform is judged by where it RENDERS, which is what the rect already says. */
  '    const over = Math.max(r.right - vw, -r.left);',
  /* WRONG VERSION 11: A RAIL IS NOT A BREAK. Once wrong version 10 let every
     owner have its own edge, this class went from 1 finding to 15 - and the new
     fourteen are `A.hpromo` on the home strip and `A.acc-link` in the account
     nav, both of which live inside a container that scrolls sideways ON PURPOSE.
     An item reaching past the edge of a horizontal rail is how a rail looks; the
     content is one swipe away, not lost. What the first class means is «cut off
     and unreachable», so an element whose scrollable ancestor scrolls X is
     counted apart rather than dropped - a finding silently filtered is
     indistinguishable from a finding never made. */
  '    let rail = false;',
  '    for (let a = el.parentElement; a && a !== root.parentElement; a = a.parentElement) {',
  '      const ov = getComputedStyle(a).overflowX;',
  '      if (ov === "auto" || ov === "scroll") { rail = true; break; }',
  '      if (ov === "hidden" || ov === "clip") break;',
  '    }',
  '    if (over > 1 && rail && (!railWorst || over > railWorst.over)) railWorst = { over: +over.toFixed(1), tag: el.tagName, cls: (typeof el.className === "string" ? el.className : "").split(" ").filter(Boolean).slice(0, 3).join(".") };',
  '    if (over > 1 && !rail && (!worst || over > worst.over)) {',
  '      worst = { over: +over.toFixed(1), tag: el.tagName,',
  '        cls: (typeof el.className === "string" ? el.className : "").split(" ").filter(Boolean).slice(0, 3).join("."),',
  '        w: +r.width.toFixed(1) };',
  '    }',
  /* 3: running text. A LEAF of prose - an element whose own text is long and
     whose children carry none - because asking a wrapper measures the wrapper. */
  '    if (ceil) {',
  '      const t = (el.textContent || "").trim();',
  /* WRONG VERSION 2: A COLUMN OF LINKS IS NOT RUNNING TEXT. «A leaf of prose» was
     read as «long text, no long child», and a footer column of eight short links
     satisfies both - so `DIV.wff-col` was reported as a line 68 characters long
     that nobody reads as a line. Prose is judged by what carries its characters:
     if most of them sit inside links or list items, it is navigation. */
  '      const linked = Array.from(el.querySelectorAll("a, li")).reduce((n, c) => n + (c.textContent || "").trim().length, 0);',
  /* WRONG VERSION 7: A CONTROL IS NOT PROSE EITHER. Wrong version 2 excluded a
     block whose text sits INSIDE links; it did not exclude a block that IS one.
     `BUTTON.ord-h` - the header of an order row, a control a person clicks and
     never reads as a line - was reported over the reading measure. */
  '      const ctrl = /^(A|BUTTON|SUMMARY|LABEL|OPTION)$/.test(el.tagName);',
  /* WRONG VERSION 8: A SHELL WITH NOTHING IN IT BECAME A LEAF OF PROSE. «No child
     carries long text» is true of a container whose children are all short - a
     four-column grid row, a summary made of label/value pairs, and worst of all
     `MAIN.wf-page` on the two LOADING screens, where the skeleton has no text at
     all and the page shell itself was reported as a 118-character line. The test
     is not about the children; it is about where the characters PHYSICALLY ARE.
     Prose keeps its own text in its own direct text nodes. */
  '      const ownText = Array.from(el.childNodes).filter(n => n.nodeType === 3)',
  '        .reduce((n, c) => n + (c.textContent || "").trim().length, 0);',
  /* WRONG VERSION 9, AND IT IS THE ONE THAT WOULD HAVE BEEN ACTED ON. The measure
     was taken of the BOX and the measure is about the LINE. `DIV.qans` was
     reported at 132.3ch and its text is «Магазин: ~72 порції по 30 г.» - twenty
     eight characters sitting in a wide box, wrapping zero times and reading
     perfectly. A box wider than the measure is only a defect when the text
     actually FILLS it, so the text must be at least as long as the box is wide.
     Found by opening all 21 findings by hand at their widest, which is the step
     that separates a reading from a repair. */
  '      if (!ctrl && t.length > 80 && linked < t.length * 0.5 && ownText >= t.length * 0.5 && t.length >= r.width / (chOf(cs.font || (cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily)) || 1)) {',
  '        const ch = chOf(cs.font || (cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily));',
  '        if (ch > 0) {',
  '          const chars = r.width / ch;',
  '          if (chars > ceil + 0.5) {',
  '            const rec = { chars: +chars.toFixed(1), ceil,',
  '              cls: (typeof el.className === "string" ? el.className : "").split(" ").filter(Boolean).slice(0, 2).join("."),',
  '              tag: el.tagName };',
  '            const k = rec.tag + "." + rec.cls;',
  '            if (!measures.has(k) || measures.get(k).chars < rec.chars) measures.set(k, rec);',
  '          }',
  '        }',
  '      }',
  '    }',
  '  }',
  /* 4: THE CARRIERS, AND WRONG VERSION 5 IS THAT THIS QUESTION WAS RE-DERIVED.
     The first writing counted every top-level `nav` in the document and reported
     «2 carriers» on 34 pages at 860px - which is `--bp-shell-wide`, where the
     account shell adds its section nav beside the header. Two `nav` elements is
     not a defect; it is valid markup and the shape the shell fork chose. The
     question `tab-walk.mjs` actually asks is narrower and is the one that
     matters: the SAME ENTRY carried by two carriers at once, asked as a set
     intersection of the two NAMED carriers, `.wfh` and `.wf-tabbar`. A second
     definition of a question this repository has already defined is a second
     answer waiting to disagree with the first, so it is taken from there
     verbatim. What this file adds is not a better question - it is the same
     question at 129 widths instead of two, which is exactly where a carrier
     that lives for a band of widths hides. */
  '  const vis = el => el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && el.getClientRects().length > 0;',
  '  const items = sel => { const r = document.querySelector(sel); if (!r || !vis(r)) return null;',
  '    return [...r.querySelectorAll("a[href],button")].filter(vis)',
  '      .map(e => (e.getAttribute("aria-label") || e.textContent || "").replace(/\\s+/g, " ").trim()).filter(Boolean); };',
  '  const A = items(".wfh"), B = items(".wf-tabbar");',
  '  const both = (A && B) ? A.filter(x => B.some(y => y === x || y.includes(x) || x.includes(y))) : [];',
  '  carriers = [A, B].filter(Boolean).length;',
  '  const dup = both.slice(0, 4);',
  '  probe.remove();',
  '  const ms = [...measures.values()].sort((a, b) => b.chars - a.chars);',
  '  return JSON.stringify({ scroll: +(de.scrollWidth - de.clientWidth).toFixed(1), vw, worst, railWorst, ms, carriers, dup, bare });',
  '})()',
].join('\n');

const srv = await serve();
const l = await chrome('width-sweep');
const conn = await Conn.open(l.wsUrl);
const s = await newSession(conn);

const all = pages('design');
const product = all.filter(p => !p.startsWith('kit/') && !p.startsWith('concept/') && p !== 'overview');
const corpus = named.length ? named : (WITH_STAND ? all : product);

const setW = w => conn.send('Emulation.setDeviceMetricsOverride',
  { width: w, height: 900, deviceScaleFactor: 1, mobile: false }, s.sessionId);
const read = async () => {
  const r = await conn.send('Runtime.evaluate', { expression: EXPR, returnByValue: true }, s.sessionId);
  if (r.exceptionDetails) return null;
  return JSON.parse(r.result.value || 'null');
};

const WIDTHS = []; for (let w = 320; w <= 1600; w += STEP) WIDTHS.push(w);
if (WIDTHS[WIDTHS.length - 1] !== 1600) WIDTHS.push(1600);
const FLOOR = 360;

/* THE FOUR CLASSES, declared here so the idle control has a list to test: a class
   that reports nothing has to be a class that CAN report something.
   EVERY CLASS ANSWERS IN OWNERS, not in a boolean. Wrong version 10 is why: a
   class that reports only its worst offender per width cannot tell «clean» from
   «one more round to go», and the round count is invisible in its own output.
   `owners(o)` returns one entry per thing that is wrong at this width, keyed by
   who owns it, so a page with four uncapped paragraphs reports four rows on the
   first run instead of one row four runs in a row. */
const CLASSES = {
  scroll: { name: 'документ гортається вбік',
    owners: o => o.scroll > 1 ? [{ k: 'document', v: o.scroll, det: '+' + o.scroll + 'px' }] : [] },
  outside: { name: 'елемент за межею екрана',
    owners: o => o.worst ? [{ k: o.worst.tag + '.' + o.worst.cls, v: o.worst.over,
      det: '+' + o.worst.over + 'px  ' + o.worst.tag + (o.worst.cls ? '.' + o.worst.cls : '') }] : [] },
  measure: { name: 'рядок довший за міру читання',
    owners: o => (o.ms || []).map(m => ({ k: m.tag + '.' + m.cls, v: m.chars,
      det: m.chars + 'ch проти ' + m.ceil + '  ' + m.tag + (m.cls ? '.' + m.cls : '') })) },
  carriers: { name: 'той самий пункт у двох носіях',
    owners: o => (o.dup || []).length ? [{ k: 'both', v: o.dup.length,
      det: 'носіїв ' + o.carriers + ', спільні ' + JSON.stringify(o.dup) }] : [] },
  rail: { name: 'виходить за край, але У РЕЙЛІ',
    owners: o => o.railWorst ? [{ k: o.railWorst.tag + '.' + o.railWorst.cls, v: o.railWorst.over,
      det: '+' + o.railWorst.over + 'px  ' + o.railWorst.tag + (o.railWorst.cls ? '.' + o.railWorst.cls : '') }] : [] },
};

const barePages2 = [];
const findings = [];   // above the floor
const below = [];      // 320..359, reported apart
let swept = 0, blind = 0;

for (const p of corpus) {
  const loaded = conn.once('Page.loadEventFired', s.sessionId);
  await setW(WIDTHS[0]);
  await conn.send('Page.navigate', { url: srv.base + '/design/' + p + '.html' }, s.sessionId);
  await loaded;

  const rows = [];
  for (const w of WIDTHS) { await setW(w); const o = await read(); rows.push({ w, o }); }
  if (rows.some(r => !r.o)) { blind++; continue; }
  swept++;
  if (rows[0].o.bare) barePages2.push(p);

  for (const [key, cl] of Object.entries(CLASSES)) {
    /* one edge per OWNER. A paragraph that crosses the measure, is reflowed under
       it by the next breakpoint and crosses again is ONE finding carrying two
       widths - wrong version 4 - and two different paragraphs are two findings
       even when they cross at the same pixel. */
    const seen = new Map();   // owner -> { ats: [], peak, det }
    let prevKeys = new Set();
    for (const { w, o } of rows) {
      const now = cl.owners(o);
      const nowKeys = new Set(now.map(x => x.k));
      for (const own of now) {
        if (prevKeys.has(own.k)) continue;
        /* bisect the 10px band down to the pixel FOR THIS OWNER: «somewhere
           between 600 and 610» is not a finding a person can act on. */
        let lo = Math.max(320, w - STEP + 1), hi = w;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          await setW(mid); const om = await read();
          if (om && cl.owners(om).some(x => x.k === own.k)) hi = mid; else lo = mid + 1;
        }
        if (!seen.has(own.k)) seen.set(own.k, { ats: [], peak: null, det: own.det });
        seen.get(own.k).ats.push(lo);
      }
      prevKeys = nowKeys;
    }
    /* the peak belongs to the OWNER the row is printed beside - wrong version 6 -
       and it is read off the whole sweep rather than off the crossing, where the
       reading is always barely over by construction. */
    for (const [k, rec] of seen) {
      for (const { o } of rows)
        for (const own of cl.owners(o))
          if (own.k === k && (rec.peak == null || own.v > rec.peak)) { rec.peak = own.v; rec.det = own.det; }
      const at = rec.ats[0];
      (at < FLOOR ? below : findings).push({ page: p, cls: key, name: cl.name, at, ats: rec.ats,
        peak: rec.peak, det: rec.det, owner: k });
    }
  }
}
await s.close(); l.stop(); srv.stop();

const line = (r) => {
  const more = r.ats && r.ats.length > 1 ? '  (перетинів ' + r.ats.length + ': ' + r.ats.join(', ') + ')' : '';
  const peak = r.peak != null && r.cls !== 'carriers' ? '  пік ' + r.peak : '';
  return '  ' + String(r.at).padStart(4) + 'px  ' + r.name.padEnd(28) + r.page.padEnd(28) + r.det + peak + more;
};

console.log('\nОБХІД ШИРИН 320-1600, крок ' + STEP + 'px, з бісекцією до пікселя');
console.log('  сторінок: ' + swept + (blind ? '  ·  не прочитано: ' + blind : '') + '  ·  ширин на сторінку: ' + WIDTHS.length);
console.log('  корпус: ' + (named.length ? 'названо рукою' : WITH_STAND ? 'кольоровий + стенд' : 'кольоровий продукт (стенд і концепт не предмет)'));

console.log('\nЗА КЛАСАМИ, і нуль тут теж називається числом:');
for (const [key, cl] of Object.entries(CLASSES))
  console.log('  ' + String(findings.filter(f => f.cls === key).length).padStart(4) + '  ' + cl.name
    + (below.filter(f => f.cls === key).length ? '   (+' + below.filter(f => f.cls === key).length + ' нижче підлоги)' : ''));

if (findings.length) {
  console.log('\nВІД 360 І ВИЩЕ - це провали:');
  findings.sort((a, b) => a.at - b.at).forEach(r => console.log(line(r)));
}
if (below.length) {
  console.log('\nНИЖЧЕ ПІДЛОГИ 360 - друкується, не валить: продукт там ніколи не обіцяв працювати');
  below.sort((a, b) => a.at - b.at).forEach(r => console.log(line(r)));
}
const hard = findings.filter(f => f.cls !== 'rail');
if (!hard.length) console.log('\nчисто вище підлоги на кожній із ' + WIDTHS.length + ' ширин (рейли не рахуються провалом і надруковані вище)');
process.exit(hard.length ? 1 : 0);
