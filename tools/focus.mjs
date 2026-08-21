/* tools/focus.mjs - DOES EVERY CONTROL ANSWER THE KEYBOARD, AND WITH WHOSE RING?

   THE QUESTION. `DESIGN.md` section 7 says the ring is the system's, drawn with
   `--ring-focus-control` or `--ring-focus`, and `focus-visible` never `focus`.
   Seventeen component files declared that; sixty-seven did not. What a control
   showed on Tab therefore depended on which file happened to own it, and nothing
   ever asked. Measured on `coach-clients.html` at 1280 before step 10.6b: of 80
   visible focusables, 51 drew Chrome's own `1px rgb(0, 95, 204)` and TWO drew the
   system ring. That blue is a FIXED value in the user agent - it does not follow
   the dark theme, so a keyboard user on a dark surface gets a blue line on
   near-black.

   WHY THE CSS CANNOT ANSWER THIS. The failure that started it is invisible in any
   grep: `cart-drawer.css` writes `box-shadow: none` on `.cd-foot > .btn--outline`
   to take the outline finish's box off a link-shaped action. That is (0,2,0), the
   same as `.btn--outline:focus-visible` in `button.css`, and cart-drawer loads
   later - so a tie went to source order and the focus ring was deleted, in every
   state, permanently. Two files, both correct on their own, and the defect exists
   only in the resolved output. So the resolved output is what gets asked.

   THE RING MAY LIVE ON AN ANCESTOR, and a check that does not know that reports
   false positives. The header search is a `.field-grp` wrapping a `.field`: the
   input carries no ring by design and the GROUP carries the halo. So each element
   that shows nothing is asked again about its nearest three ancestors before it
   counts as unanswered.

   WRONG VERSION 1: IT READ THE RING IMMEDIATELY AFTER `focus()`. The ring
   TRANSITIONS - `box-shadow .15s` on most controls - so a read at 0ms samples the
   transparent start and calls a correct control unanswered. The first run said 24
   of 111 had no ring; all 24 were mid-transition. The fix is not a longer wait,
   which would put a corpus walk into hours: transitions are switched OFF in the
   page before the walk, because the question is about the resting focus style and
   never about the animation.

   WRONG VERSION 2: IT ENUMERATED FOCUSABLES BY THEIR OWN `display`. That ignores
   ancestors, so every link inside the closed mega menu counted - 342 candidates
   instead of 111, and «no ring» on all of them. `checkVisibility({checkVisibilityCSS,
   checkOpacity})` is the question that has the ancestors in it.

   node tools/focus.mjs                     the named sample, 1280 and 360
   node tools/focus.mjs product cart        these pages
   node tools/focus.mjs --all               every coloured screen (slow)
*/
import { Conn, newSession } from './cdp.mjs';
import { serve, chrome, pages } from './lib.mjs';

const argv = process.argv.slice(2);
const ALL = argv.includes('--all');
const named = argv.filter(a => !a.startsWith('-'));
/* the sample is the busiest screen of each shape, not a random handful */
const SAMPLE = ['index', 'coach-clients', 'coach-session', 'product', 'listing', 'cart', 'account', 'checkout'];
const WIDTHS = [1280, 360];

const EXPR = `(() => {
  /* the resting focus style, not the animation */
  const kill = document.createElement('style');
  kill.textContent = '*,*::before,*::after{ transition: none !important; animation: none !important; }';
  document.head.appendChild(kill);
  const SEL = 'a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"]),summary';
  const all = [...document.querySelectorAll(SEL)].filter(e =>
    e.checkVisibility && e.checkVisibility({ checkVisibilityCSS: true, checkOpacity: true }));
  const ring = e => {
    const cs = getComputedStyle(e);
    const sh = cs.boxShadow || '';
    if (/rgb\\(255, 90, 0\\)/.test(sh)) return 'system';
    if (/rgba\\(255, 90, 0/.test(sh)) return 'field';
    if (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) {
      return /rgb\\(0, 95, 204\\)/.test(cs.outlineColor) ? 'ua' : 'outline';
    }
    return null;
  };
  const out = { total: all.length, notVisible: 0, kinds: {}, unanswered: [], ua: [] };
  for (const e of all) {
    e.focus();
    if (!e.matches(':focus-visible')) { out.notVisible++; continue; }
    let k = ring(e), node = e, hops = 0;
    while (!k && hops < 3 && node.parentElement) { node = node.parentElement; k = ring(node); hops++; }
    if (k === 'ua') { out.ua.push((e.tagName + '.' + e.className).slice(0, 60)); k = 'ua'; }
    if (!k) out.unanswered.push((e.tagName + '.' + (e.className || '(no class)')).slice(0, 60));
    out.kinds[k || 'none'] = (out.kinds[k || 'none'] || 0) + 1;
  }
  kill.remove();
  return JSON.stringify(out);
})()`;

const corpus = ALL ? pages('design').filter(p => !p.startsWith('kit/') && !p.startsWith('concept/') && p !== 'overview')
  : (named.length ? named : SAMPLE);

const srv = await serve();
const l = await chrome('focus');
const conn = await Conn.open(l.wsUrl);
const s = await newSession(conn);

let walked = 0, uaTotal = 0, deadTotal = 0;
const bad = [];
for (const p of corpus) {
  for (const w of WIDTHS) {
    await conn.send('Emulation.setDeviceMetricsOverride',
      { width: w, height: 900, deviceScaleFactor: 1, mobile: false }, s.sessionId);
    const loaded = conn.once('Page.loadEventFired', s.sessionId);
    await conn.send('Page.navigate', { url: `${srv.base}/design/${p}.html` }, s.sessionId);
    await loaded;
    const r = await conn.send('Runtime.evaluate', { expression: EXPR, returnByValue: true }, s.sessionId);
    const v = JSON.parse(r.result.value || '{}');
    walked += v.total - v.notVisible;
    uaTotal += v.ua.length; deadTotal += v.unanswered.length;
    if (v.ua.length) bad.push(`${p}@${w}  ${v.ua.length} контролів у синьому кільці браузера: ${[...new Set(v.ua)].slice(0, 4).join(', ')}`);
    if (v.unanswered.length) bad.push(`${p}@${w}  ${v.unanswered.length} контролів БЕЗ жодного кільця: ${[...new Set(v.unanswered)].slice(0, 4).join(', ')}`);
    if (!ALL) console.log(`  ${p.padEnd(16)}@${String(w).padEnd(5)} фокусованих ${String(v.total - v.notVisible).padStart(3)} · `
      + Object.entries(v.kinds).map(([k, n]) => `${k} ${n}`).join(' · '));
  }
}

if (bad.length) { console.log('\nБЕЗ КІЛЬЦЯ СИСТЕМИ (' + bad.length + '):'); for (const x of bad) console.log('  ' + x); }
console.log(`\n${corpus.length} сторінок × ${WIDTHS.length} ширин · ${walked} контролів пройдено табом · `
  + `у синьому кільці UA: ${uaTotal} · без кільця взагалі: ${deadTotal}`);
l.kill && l.kill();
process.exit(bad.length ? 1 : 0);
