/* tools/headings.mjs - DOES EVERY SCREEN HAVE ONE ACCESSIBLE h1, AND IS ITS
   HEADING LADDER WHOLE?

   Stage 13, step 4. The accessibility checklist may not carry a row whose way of
   checking cannot be named, and one row had none: the roll-out's class 8 reported
   that `coach-client-edit` and `coach-client-edit-confirm` have **no accessible
   h1** - the only `h1` on those two screens sits inside the inert backdrop behind
   the dialog, so a screen reader on the dialog finds no page title at all. That
   was written in prose in `rollout.md` and nothing could re-ask it.

   THREE QUESTIONS, all asked of the rendered DOM rather than of the file, because
   a third of this product's markup is written by `wireframes/_nav.js` at load and
   because INERTNESS is a computed thing:

     A  exactly one h1 per screen that a screen reader can reach. Reachable means:
        not `display:none`, not `visibility:hidden`, not inside `[inert]`, not
        inside `[aria-hidden="true"]`. Zero is the defect class 8 found; more than
        one is a different defect and is reported apart.
     B  the ladder does not skip a rung - an h4 whose nearest heading above is an
        h2. Skipping is a WCAG-adjacent structural fault: it tells a reader there
        is a level that does not exist.
     C  a heading with no text at all, which is worse than no heading, because it
        occupies a rung and says nothing.

   READ AT REST, AND THAT IS THE OPPOSITE OF WHAT map.mjs DOES - deliberately.
   The first writing of this file swept every opener the page declares, the way
   13.3 taught, and immediately reported TWO h1 on `cart` and on `index`: the
   sweep opens every dialog at once, and the auth dialog brings its own h1. That
   is not a state any reader is ever in.

   The cure is the corpus itself. This product models a state as its own DOCUMENT
   - `coach-client-edit.html` IS the screen with the dialog open, `auth-code.html`
   IS the dialog on its code step - so every state that matters is already a page
   at rest, and opening things on top of it manufactures a state the product does
   not have. «How many h1 can a reader reach AT ONCE» is a question about one
   document in one state, and the walk answers it that way.

     node tools/headings.mjs            every screen
     node tools/headings.mjs cart quiz  named screens */
import { readFileSync } from 'node:fs';
import { ROOT, serve, chrome, pages, subject } from './lib.mjs';
import { Conn, newSession, visit } from './cdp.mjs';

const args = process.argv.slice(2);
const PAGES = subject(args).filter(p => !p.startsWith('kit/') && !p.startsWith('concept/') && p !== 'overview');

const EXPR = `(() => {
  const hidden = e => {
    for (let n = e; n; n = n.parentElement) {
      if (n.hasAttribute && (n.hasAttribute('inert') || n.getAttribute('aria-hidden') === 'true')) return true;
      const s = getComputedStyle(n);
      if (s.display === 'none' || s.visibility === 'hidden') return true;
    }
    return false;
  };
  const all = [].slice.call(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
  const live = all.filter(e => !hidden(e));
  const h1 = live.filter(e => e.tagName === 'H1');
  const empty = live.filter(e => !e.textContent.trim())
    .map(e => e.tagName + (e.className ? '.' + String(e.className).split(' ')[0] : ''));
  const skips = [];
  let prev = 0;
  for (const e of live) {
    const lvl = Number(e.tagName[1]);
    if (prev && lvl > prev + 1) skips.push(e.tagName + ' після ' + 'H' + prev +
      ' - ' + e.textContent.trim().slice(0, 24));
    prev = lvl;
  }
  return JSON.stringify({
    total: all.length, live: live.length, h1: h1.length,
    h1text: h1.map(e => e.textContent.trim().slice(0, 40)),
    empty: empty, skips: skips,
  });
})()`;

const srv = await serve();
const l = await chrome('headings');
const conn = await Conn.open(l.wsUrl);
const noH1 = [], manyH1 = [], skipped = [], blank = [];
let walked = 0;
for (const p of PAGES) {
  const s = await newSession(conn);
  const url = `${srv.base}/design/${p}.html`;
  try {
    const v = JSON.parse(await visit(conn, s.sessionId, url, 1280, 900, EXPR, s.inflight));
    walked++;
    if (v.h1 === 0) noH1.push([p, v.total + ' заголовків у розмітці, доступних ' + v.live + ', з них h1 нуль']);
    else if (v.h1 > 1) manyH1.push([p, v.h1 + ': ' + v.h1text.join(' | ')]);
    if (v.skips.length) skipped.push([p, v.skips.slice(0, 2).join(' · ')]);
    if (v.empty.length) blank.push([p, v.empty.slice(0, 3).join(' ')]);
  } catch (e) { noH1.push([p, 'НЕ ВІДКРИВСЯ: ' + String(e.message).slice(0, 40)]); }
  finally { await s.close(); }
}
l.stop(); srv.stop();

const say = (title, list) => { if (!list.length) return;
  console.log('\n' + title + ' (' + list.length + '):');
  for (const [p, w] of list) console.log('  ' + p.padEnd(30) + w); };
say('ЕКРАН БЕЗ ЖОДНОГО ДОСТУПНОГО h1', noH1);
say('БІЛЬШЕ НІЖ ОДИН h1', manyH1);
say('ДРАБИНА ПРОПУСКАЄ ЩАБЕЛЬ', skipped);
say('ЗАГОЛОВОК БЕЗ ТЕКСТУ', blank);

console.log('\nекранів пройдено: ' + walked + ' з ' + PAGES.length +
  ' · без h1: ' + noH1.length + ' · більше одного: ' + manyH1.length +
  ' · пропуск щабля: ' + skipped.length + ' · порожній заголовок: ' + blank.length);
console.log('читано В СПОКОЇ: кожен стан цього продукту вже є окремим документом, ' +
  'тож відкривати щось поверх нього означало б виміряти стан, якого продукт не має');
process.exit(noH1.length || manyH1.length || skipped.length || blank.length ? 1 : 0);
