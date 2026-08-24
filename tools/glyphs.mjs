/* tools/glyphs.mjs - A MARK THAT THE PASSES DID NOT REACH.

   The product types emojis in its markup and swaps them for icons at runtime:
   `uivChrome()` and its neighbours walk the page on load and replace every
   character the set can draw. The rollout contract tells fifty subagents exactly
   that, in one sentence and without a caveat: «Іконки теж: uivChrome() міняє
   кожну емодзі на іконку набору. Тому inline <svg> у файлі екрана не буває
   взагалі.»

   IT WAS NOT TRUE, AND NOTHING IN tools/ COULD HAVE SAID SO. A source-reading
   instrument sees an emoji on every screen and is right to; a browser instrument
   sees an icon and is right to; neither one asks the only question that matters,
   which is whether a mark SURVIVED the passes. `home-catalog` - built at stage
   12, batch 2 - kept 13 raw emojis in its category rail and 6 in the flyout,
   because `uivHome()` gated the whole pass on `.goaltiles` (an unrelated block
   further down the home) and then looked the rail up by the literal ids
   `home-rail` / `home-fly`, which are that ONE screen's names. A person building
   the screen found it by looking at it. That is the failure mode this folder
   exists to end.

   THE LIST IS THE PRODUCT'S, NOT MINE. `UIV_EMOJI` is read out of the running
   page, so a row added to the map next month is asked about the same day, and a
   row deleted stops being asked. Two questions, and they are opposite:

     1. a character the map KNOWS, still sitting in a text node -> a pass did not
        reach it. This fails the run.
     2. a pictograph the map does NOT know -> a hole in the map, which is the
        shape step 7.99 already had twice (👥, ◈) and which the search subagent
        met again at 12.4 with 🌙 and 🕘, both of which `icons.js` can draw. This
        is counted and named, never silently dropped: a declared list that covers
        nothing must fail as loudly as an undeclared case.

     node tools/glyphs.mjs [width] [page...]      default 1280, every design/*.html */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, subject } from './lib.mjs';

const args = process.argv.slice(2);
const W = /^\d+$/.test(args[0] || '') ? Number(args.shift()) : 1280;
const PAGES = subject(args);

/* The stand panel is not the product: it is drawn by `design/_nav.js` around
   every screen, so a mark inside it would be reported 300 times and belongs to
   whoever builds the stand. `<script>` and `<style>` hold source, not text. */
const EXPR = `(() => {
  if (typeof UIV_EMOJI === 'undefined') return JSON.stringify({ nomap: 1 });
  const keys = Object.keys(UIV_EMOJI);
  const TYPO = '\\u00A9\\u00AE\\u2122';
  const found = {}, unknown = {}, typo = {}, where = {};
  let ei = 0;
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    const p = n.parentElement;
    if (!p || p.closest('.uiv-side') || /^(SCRIPT|STYLE|SVG)$/.test(p.tagName)) continue;
    /* THE EMPTY STATE'S MARK IS AN ILLUSTRATION, NOT AN ICON, and the stylesheet
       says so in two rules rather than in prose: empty-state.css draws .empty .ei
       at fs-30 as the picture itself, and hides the very same class inside
       .emptybox / .errbox at font-size 0 so an icon can take its place. Twenty-four
       coloured screens wear the glyph; three wear a mascot photograph; the iced
       ones already come out clean here. Icing the two whose glyph happens to have a
       row in the map would make two empty states look unlike their twenty-four
       siblings. Excluded by the class, with its count, so an exception that stops
       covering anything is visible. */
    if (p.classList.contains('ei') && getComputedStyle(p).fontSize !== '0px') { ei++; continue; }
    const t = n.nodeValue;
    if (!t.trim()) continue;
    for (const k of keys) if (t.indexOf(k) !== -1) {
      found[k] = (found[k] || 0) + 1;
      if (!where[k]) where[k] = (function(e){ var s2 = [];
        for (var i = 0; e && i < 3; i++, e = e.parentElement)
          s2.unshift(e.tagName.toLowerCase() + (e.className && typeof e.className === 'string'
            ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : ''));
        return s2.join(' > '); })(p);
    }
    /* Extended_Pictographic also owns the copyright, registered and trademark
       signs - typography, not icons, and the first run called eight of them
       holes in the icon map. (No backtick may appear in this comment: it sits
       inside a template literal, and cdp.mjs paid for that lesson once already.)
       They are
       excluded BY CODEPOINT and the exception carries its count, so an exception
       that stops covering anything is visible rather than quiet. */
    const pics = t.match(/\\p{Extended_Pictographic}/gu) || [];
    for (const c of pics) {
      if (TYPO.indexOf(c) !== -1) { typo[c] = (typo[c] || 0) + 1; continue; }
      if (!keys.some(k => k.indexOf(c) !== -1)) unknown[c] = (unknown[c] || 0) + 1;
    }
  }
  return JSON.stringify({ found, unknown, typo, where, ei });
})()`;

const srv = await serve();
const l = await chrome('glyphs');
const conn = await Conn.open(l.wsUrl);

const missed = {}, stand = {}, holes = {}, standHoles = {}, nomap = [];
let seen = 0, typoN = 0, eiN = 0;
for (const p of PAGES) {
  const s = await newSession(conn);
  try {
    const r = JSON.parse(await visit(conn, s.sessionId,
      `${srv.base}/design/${p}.html`, W, 900, EXPR, s.inflight));
    seen++;
    if (r.nomap) { nomap.push(p); continue; }
    const isStand = p.startsWith('kit/') || p.startsWith('concept/');
    const bag = isStand ? stand : missed;
    for (const k in r.found) {
      (bag[k] ||= { n: 0, pages: [], at: '' });
      bag[k].n += r.found[k]; bag[k].pages.push(p);
      if (!bag[k].at && r.where[k]) bag[k].at = r.where[k];
    }
    /* 12.10: THE SECOND CLASS NEEDED THE SAME SPLIT THE FIRST ONE ALREADY HAD,
       and for exactly the reason written above class 1b. `kit/pixel-proof` prints
       a before/after table of the very characters this check hunts - four of them
       - so every full run reported four holes in `UIV_EMOJI` that are not holes
       at all, and a real hole on a product screen would have arrived fifth in a
       list already three-quarters noise. Class 1 was split at 12.4 and class 2
       was left whole; the omission survived because the stand quoted nothing back
       then. Named, counted, and out of the verdict - the same treatment, not a
       new one. */
    for (const c in r.unknown) {
      const bag = isStand ? standHoles : holes;
      (bag[c] ||= { n: 0, pages: [] });
      bag[c].n += r.unknown[c]; bag[c].pages.push(p);
    }
    for (const c in r.typo) typoN += r.typo[c];
    eiN += r.ei || 0;
  } catch { }
  finally { await s.close(); }
  process.stdout.write('.');
}
l.stop(); srv.stop();

const rows = o => Object.keys(o).sort((a, b) => o[b].n - o[a].n).map(k =>
  '  ' + k.padEnd(4) + String(o[k].n).padStart(4) + 'x  на ' + o[k].pages.length +
  ' сторінках  [' + o[k].pages.slice(0, 4).join(', ') + ']' + (o[k].at ? '\n        ' + o[k].at : ''));

console.log('\n\n===== 1. ЗНАК, ЯКИЙ КАРТА ЗНАЄ, А ПРОХІД НЕ ДІСТАВ =====');
console.log(Object.keys(missed).length ? rows(missed).join('\n')
  : '   none - жоден намальований знак не лишився літерою');

/* The stand is not the product. Its pages QUOTE glyphs on purpose - pixel-proof
   prints a before/after table of them, backlog quotes them in prose, and a
   component page shows the character its own pass replaces. Counting those as
   misses would bury the two that matter under twenty that do not; dropping them
   silently would hide a real miss on a stand page. So: named, counted, and out
   of the verdict. */
console.log('\n===== 1b. ТЕ САМЕ НА СТОРІНКАХ СТЕНДА - документація, не продукт =====');
console.log(Object.keys(stand).length
  ? '   ' + Object.keys(stand).length + ' знаків, ' +
    Object.values(stand).reduce((a, x) => a + x.n, 0) + ' входжень (стенд цитує знак навмисно)'
  : '   none');

console.log('\n===== 2. ПІКТОГРАМА, ЯКОЇ НЕМАЄ В КАРТІ =====');
console.log('   (дірка в оголошеному списку: малюнок може бути, рядка немає)');
console.log(Object.keys(holes).length ? rows(holes).join('\n')
  : '   none - кожна піктограма корпусу має рядок у UIV_EMOJI');

console.log('\n===== 2b. ТЕ САМЕ НА СТОРІНКАХ СТЕНДА =====');
console.log(Object.keys(standHoles).length
  ? '   ' + Object.keys(standHoles).length + ' піктограм, ' +
    Object.values(standHoles).reduce((a, x) => a + x.n, 0) +
    ' входжень (стенд друкує таблицю «до / після» саме з цих знаків)\n' + rows(standHoles).join('\n')
  : '   none');

/* 12.10: AND THE TWO EXCEPTION COUNTS ARE CLAIMS ABOUT THE CORPUS, so only the
   corpus may answer them - the same defect `screen-css.mjs` had at batch 1 and
   `rollout-table.mjs` at 12.9, met here for the third time in one stage. A run
   filtered to one page found `eiN` 0 and `typoN` 0 and printed «ВИНЯТОК НІЧОГО
   НЕ ПОКРИВАЄ» twice, over a corpus where they cover 1 and 431. A filtered run
   still prints both numbers, because they are useful there too; it just may not
   compare them with a total they are a subset of. */
const FULL = !args.length;
const exc = (label, n) => console.log('   виняток «' + label + '»: ' + n + ' входжень' +
  (n ? '' : FULL ? ' - ВИНЯТОК НІЧОГО НЕ ПОКРИВАЄ, його треба зняти'
                 : '  (предмет звужено - порожнеча тут нічого не означає)'));
console.log('');
exc('знак порожнього стану - ілюстрація', eiN);
exc('типографіка, не іконка (© ® ™)', typoN);

console.log('\nзміряно сторінок: ' + seen + ' з ' + PAGES.length +
  (nomap.length ? '  ·  без карти на сторінці: ' + nomap.length + ' (' + nomap.slice(0, 3).join(', ') + ')' : ''));
process.exit(Object.keys(missed).length ? 1 : 0);
