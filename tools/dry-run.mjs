/* tools/dry-run.mjs - can the system build the screens it has never seen?

   THE CHECK THAT REPLACES A ROLLOUT. Stage 08 has no розкотка: a screen is
   assembled once, when the system is finished, and that is stage 12. The rollout
   was the completeness test - the moment a missing component announces itself -
   so the pack puts three cheaper instruments in its place, and this is the third:
   walk the screens that are STILL GREY and ask, class by class, whether anything
   in `design/system/components/` would draw them.

   WHY NOW AND NOT AT 12. A component found here costs one file. The same
   component found at stage 11 drags its states, its pattern, its breakpoints and
   its motion behind it, because those stages will already have run over
   everything else.

   HOW THE QUESTION IS ASKED, AND WHY IT IS NOT A GREP. The grey prototype's
   markup is built at runtime by `wireframes/_nav.js` - the header, the bar, the
   drawers and much of the body exist in no html file - so the classes are read
   off the LOADED page. The answer side is read out of the stylesheets: every
   class any component declares, at any depth. What is left over is the list of
   things the system has no name for.

   WHAT IS NOT A FINDING, AND IT IS DECLARED RATHER THAN FILTERED IN SILENCE:
     - `wf-*` and `uiv-*`: the prototype's own scaffolding and the mark passes.
       They are how the grey layer stands up, not what the product is made of.
     - a class the system declares under ANOTHER component. `.pcard` on an
       article page is product-card.css doing its job; that is coverage, not a
       gap, and the whole point of asking per class rather than per screen.
     - single letters and two-letter names (`h`, `t`, `bd`, `ic`): the grey
       layer's local shorthands inside a block. They are counted separately and
       reported as a number, because a block whose PARENT is uncovered will drag
       them along and a block whose parent is covered will not.

   node tools/dry-run.mjs              every grey screen with no coloured twin
   node tools/dry-run.mjs content-faq  only those */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, ROOT } from './lib.mjs';

const CDIR = join(ROOT, 'design/system/components');
const stripC = s => s.replace(/\/\*[\s\S]*?\*\//g, '');

/* every class name any component declares, at any depth of any selector */
const KNOWN = new Map();
for (const f of readdirSync(CDIR).filter(x => x.endsWith('.css'))) {
  const css = stripC(readFileSync(join(CDIR, f), 'utf8'));
  for (const m of css.matchAll(/\.([a-zA-Z][\w-]*)/g)) {
    if (!KNOWN.has(m[1])) KNOWN.set(m[1], f.slice(0, -4));
  }
}
for (const f of ['base.css', 'tokens.css']) {
  try {
    for (const m of stripC(readFileSync(join(ROOT, 'design/system', f), 'utf8')).matchAll(/\.([a-zA-Z][\w-]*)/g))
      if (!KNOWN.has(m[1])) KNOWN.set(m[1], f.slice(0, -4));
  } catch {}
}

const SCAFFOLD = /^(wf-|uiv-|sk|is-|js-)/;
/* the grey layer's local shorthands inside a block: they ride their parent */
const SHORTHAND = c => c.length <= 2;

/* THE THIRD «NOT A FINDING», AND THE FIRST VERSION OF IT WAS CIRCULAR.
   The body-wide walk turned up four families on 52 to 54 screens - `sepb`,
   `navlink`, `stack`, `wfh-cabbtn|city-lbl|lang-code` - which look like the
   biggest gaps in the system and are not gaps: they are the GREY prototype's own
   header and footer, and the coloured layer builds its chrome differently.

   THE WRONG TEST WAS «does this class appear anywhere in design/». It dropped
   233 classes and took `info-*`, `op-*`, `loy-*`, `art-*` and the whole quiz with
   them - because a screen that has never been coloured has no class in `design/`
   BY CONSTRUCTION. The question and the exclusion were the same question, which
   is the check whose both sides come from one source, in a new costume.

   THE TEST THAT IS NOT CIRCULAR: does this class also appear on a grey screen
   that ALREADY HAS a coloured twin? Those screens are answered territory - the
   system was built against them - so a class living there and declared nowhere is
   chrome the colour layer dropped, or a dead name the transform carries. A class
   that appears ONLY on never-coloured screens is the real question.
   The corpus of answered screens is walked in the same browser pass, so both
   sides are read the same way. */

/* the subject: a grey screen with no coloured twin. A screen that HAS one is not
   a question about the system - it has already been answered by a clone. */
const allGrey = readdirSync(join(ROOT, 'wireframes')).filter(f => f.endsWith('.html'))
  .map(f => f.slice(0, -5))
  .filter(n => n !== 'index' && n !== 'overview')
  .sort();
const grey = allGrey.filter(n => !existsSync(join(ROOT, 'design', n + '.html')));
const ANSWERED = allGrey.filter(n => existsSync(join(ROOT, 'design', n + '.html')));

const want = process.argv.slice(2).filter(a => !a.startsWith('-'));
const SUBJ = want.length ? grey.filter(n => want.includes(n)) : grey;
if (!SUBJ.length) { console.log('НЕМАЄ ТАКОГО СІРОГО ЕКРАНА: ' + want.join(' ')); process.exit(2); }

const srv = await serve();
const l = await chrome('dry-run');
const conn = await Conn.open(l.wsUrl);

/* THE WHOLE BODY, NOT `<main>`, AND THE FIRST DRAFT READ `<main>`. It looked
   right - the product is what is inside the page - and it was blind to exactly
   the components that are hardest to build: an overlay, a drawer, a dialog and a
   sheet all live OUTSIDE `<main>`, appended to `<body>`. `search-suggest` came
   back with nothing at all while its markup holds 68 `ov-*` classes, and the
   screen simply did not appear in the report. A walk that looks in one place is
   the same defect as a finder that reads one directory level; it just fails
   somewhere nobody thinks to look.
   `<body>` it is, and the scaffolding is dropped by name rather than by
   location. */
const EXPR = `(() => {
  const out = new Set();
  document.body.querySelectorAll('*').forEach(n => n.classList && n.classList.forEach(c => out.add(c)));
  return JSON.stringify([...out]);
})()`;

/* first the answered territory, so «already dropped» is a measurement rather
   than a list. Sampled, not walked whole: these screens share one chrome and one
   builder, and 25 of them show every class the other 60 do - checked by taking
   40 and finding the same set. */
const ANSWERED_CLS = new Set();
for (const p of ANSWERED.filter((_, i) => i % 2 === 0)) {
  const s2 = await newSession(conn);
  try {
    JSON.parse(await visit(conn, s2.sessionId, `${srv.base}/wireframes/${p}.html`, 390, 900, EXPR, s2.inflight))
      .forEach(c => ANSWERED_CLS.add(c));
  } finally { await s2.close(); }
}

const gap = new Map();       /* class -> screens that use it */
const dropped = new Set();
const shorthand = new Map();
let visited = 0;
for (const p of SUBJ) {
  const s = await newSession(conn);
  let cls = [];
  try {
    cls = JSON.parse(await visit(conn, s.sessionId, `${srv.base}/wireframes/${p}.html`, 390, 900, EXPR, s.inflight));
  } finally { await s.close(); }
  visited++;
  for (const c of cls) {
    if (SCAFFOLD.test(c) || KNOWN.has(c)) continue;
    if (ANSWERED_CLS.has(c)) { dropped.add(c); continue; }
    const bag = SHORTHAND(c) ? shorthand : gap;
    if (!bag.has(c)) bag.set(c, []);
    bag.get(c).push(p);
  }
}
l.stop(); srv.stop();

/* a family is a prefix up to the first dash, which is how this prototype names:
   `art-hero` and `art-body` are one block, `legal-sec` and `legal-tabs` another */
const fam = new Map();
for (const [c, pages] of gap) {
  const k = c.includes('-') ? c.split('-')[0] : c;
  if (!fam.has(k)) fam.set(k, { cls: [], pages: new Set() });
  fam.get(k).cls.push(c);
  pages.forEach(p => fam.get(k).pages.add(p));
}
const rows = [...fam.entries()].sort((a, b) =>
  b[1].pages.size - a[1].pages.size || b[1].cls.length - a[1].cls.length);

for (const [k, v] of rows) {
  console.log('\n== ' + k + '-*   ' + v.cls.length + ' класів · ' + v.pages.size + ' екранів');
  console.log('   ' + v.cls.sort().join(' '));
  console.log('   ' + [...v.pages].sort().join(' '));
}

console.log('\n' + visited + ' сірих екранів без кольорового двійника · система знає ' + KNOWN.size + ' класів');
/* THE APOSTROPHE RULE MET JAVASCRIPT, AND JAVASCRIPT LOST. These two lines
   read `сім'ях` and `ім'я` until 12.1: a blanket replacement of the curly
   apostrophe with the ASCII one closed the single-quoted string mid-word and
   this file stopped parsing. `typo.mjs` was green on it the whole time - the
   apostrophe form was correct, the file just no longer ran. Reworded rather
   than escaped, the same repair `width-sweep.mjs` took at 10.7, and the
   missing half is now a gate inside `typo.mjs`: a .js or .mjs it opens must
   still parse. */
console.log('без компонента: ' + gap.size + ' класів у ' + rows.length + ' родинах');
console.log('коротких імен (1-2 літери, локальні всередині блоку): ' + shorthand.size +
  ' - вони їдуть за своїм батьком і окремим питанням не є');
console.log('уже на відповіданій території (хромованість або мертва назва трансформації): ' + dropped.size);
if (!dropped.size)
  console.log('ХОЛОСТИЙ КОНТРОЛЬ ВПАВ: жодного класу лише-в-сірому, хоча прототип має спільну хромованість');
