/* tools/tab-walk.mjs - the ninth check: where does focus actually land?

   THE QUESTION THIS ANSWERS. A shell that changes shape with the width has one
   accessibility failure mode nothing else here can see: the carrier that is no
   longer drawn stays in the tab order. Hidden by opacity, by a negative offset or
   by a zero-size clip, it is invisible to the eye and fully reachable by Tab, so
   a person on a keyboard walks a navigation they cannot see. `accept.mjs` asks
   the OUTPUT about text and overflow, `theme.mjs` asks about colour, and neither
   of them presses a key.

   THE WRONG VERSION, AND IT REPORTED 196.
   The first writing did not press anything. It listed every focusable descendant
   of `.wfh`, filtered by `getComputedStyle().display !== 'none'` on the ELEMENT,
   and called the rest «hidden but focusable»: 196 at 360 and 183 at 1280. Every
   one of them was a false positive. An element under a `display: none` ANCESTOR
   is not in the tab order at all - the browser skips the whole subtree - so what
   the number described was the closed mega-menu, the closed drawer and the
   language dropdown, none of which a keyboard can reach. A count of «not visible»
   is not a count of «reachable while invisible», and only a real walk separates
   them. This file dispatches Tab and reads `document.activeElement`.

   WHAT IT REPORTS, per width:
     - the ordered list of stops, each tagged with the shell region it is in
     - FOCUS ON AN INVISIBLE ELEMENT: `checkVisibility({checkOpacity, checkVisibilityCSS})`
       is false, or the box measures 0 in either axis. This is the defect the file exists for
     - THE SAME ENTRY IN TWO CARRIERS AT ONCE. This one is NOT taken from the walk,
       and the second wrong version is why. Counting repeated labels among the stops
       reported six on the first run - «В обране», «У кошик», «фото» on a listing,
       «У сесію», «Усі клієнти», «Профіль» in the coach cabinet - and every one was
       a control repeated per row, which is what a list is. A duplicate matters when
       the SAME top-level entry is carried by two different carriers at the same
       width, so it is asked as a set intersection of the two carriers, directly
     - a positive `tabindex` anywhere, which would make DOM order and focus order
       disagree and quietly invalidate every other reading here

   node tools/tab-walk.mjs                       index, at 360 and 1280
   node tools/tab-walk.mjs listing coach-home    named pages
   node tools/tab-walk.mjs --widths=360,900 index
   node tools/tab-walk.mjs --stops=40 index      walk further into the page */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome } from './lib.mjs';

const argv = process.argv.slice(2);
const flag = (name, dflt) => {
  const a = argv.find(x => x.startsWith('--' + name + '='));
  return a ? a.split('=')[1] : dflt;
};
const WIDTHS = flag('widths', '360,1280').split(',').map(Number);
const STOPS = Number(flag('stops', 26));
const PAGES = argv.filter(a => !a.startsWith('--'));
if (!PAGES.length) PAGES.push('index');

const READ = `(() => {
  const e = document.activeElement;
  if (!e || e === document.body) return JSON.stringify({ t: 'BODY', v: true, w: 1, h: 1, region: '-' });
  const b = e.getBoundingClientRect();
  const v = e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
  const t = (e.getAttribute('aria-label') || e.textContent || e.tagName).replace(/\\s+/g, ' ').trim().slice(0, 22);
  const region = e.closest('.wfh') ? 'шапка' : e.closest('.wf-tabbar') ? 'таб' : '-';
  return JSON.stringify({ t, v, w: Math.round(b.width), h: Math.round(b.height), region });
})()`;
const POSITIVE = `[...document.querySelectorAll('[tabindex]')].filter(e => +e.getAttribute('tabindex') > 0).length`;
/* the carriers, asked directly: what each one SHOWS at this width, and what both show */
const CARRIERS = `(() => {
  const vis = el => el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && el.getClientRects().length > 0;
  const items = sel => { const r = document.querySelector(sel);
    if (!r || !vis(r)) return null;
    return [...r.querySelectorAll('a[href],button')].filter(vis)
      .map(e => (e.getAttribute('aria-label') || e.textContent || '').replace(/\\s+/g, ' ').trim()).filter(Boolean); };
  const a = items('.wfh'), b = items('.wf-tabbar');
  const both = (a && b) ? a.filter(x => b.some(y => y === x || y.includes(x) || x.includes(y))) : [];
  return JSON.stringify({ header: a, tab: b, both, carriers: [a, b].filter(Boolean).length });
})()`;

const srv = await serve();
const l = await chrome('tab-walk');
const conn = await Conn.open(l.wsUrl);
let fails = 0;

for (const p of PAGES) {
  for (const w of WIDTHS) {
    const s = await newSession(conn);
    await visit(conn, s.sessionId, `${srv.base}/design/${p}.html`, w, 900, '1', s.inflight);
    await conn.send('Runtime.evaluate', { expression: 'document.body.focus(); window.scrollTo(0,0);' }, s.sessionId);
    const pos = (await conn.send('Runtime.evaluate', { expression: POSITIVE, returnByValue: true }, s.sessionId)).result.value;
    const stops = [], blind = [];
    for (let i = 0; i < STOPS; i++) {
      for (const type of ['rawKeyDown', 'keyUp'])
        await conn.send('Input.dispatchKeyEvent',
          { type, key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 }, s.sessionId);
      const d = JSON.parse((await conn.send('Runtime.evaluate', { expression: READ, returnByValue: true }, s.sessionId)).result.value);
      stops.push(d.region === '-' ? d.t : d.region + ':' + d.t);
      if (d.t !== 'BODY' && (!d.v || d.w === 0 || d.h === 0)) blind.push(`${d.t} (видимий=${d.v} ${d.w}x${d.h})`);
    }
    const c = JSON.parse((await conn.send('Runtime.evaluate', { expression: CARRIERS, returnByValue: true }, s.sessionId)).result.value);
    const shell = stops.filter(x => x.startsWith('шапка:') || x.startsWith('таб:')).length;
    console.log(`\n${p} @${w}  зупинок ${stops.length}, з них в оболонці ${shell}`);
    console.log('  ' + stops.join(' -> '));
    console.log(`  фокус на невидимому: ${blind.length}${blind.length ? '  ' + JSON.stringify(blind) : ''}`);
    console.log(`  носіїв навігації видимо: ${c.carriers}  (шапка ${c.header ? c.header.length : 0}, таб-бар ${c.tab ? c.tab.length : 0})`);
    console.log(`  той самий пункт в обох носіях: ${c.both.length}${c.both.length ? '  ' + JSON.stringify(c.both) : ''}`);
    console.log(`  tabindex > 0 на сторінці: ${pos}`);
    fails += blind.length + pos;
    /* the intersection is REPORTED, not counted as a failure: at mobile this product
       carries the cart in both by an IA decision written in navigation.md, and an
       instrument that fails on a decision would only teach its reader to ignore it. */
  }
}
console.log(`\n${PAGES.length} сторінок × ${WIDTHS.length} ширин · знахідок: ${fails}`);
process.exit(fails ? 1 : 0);
