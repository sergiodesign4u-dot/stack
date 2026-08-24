/* tools/idle.mjs - the stand's own idle control, read back and sorted.

   EVERY COMPONENT PAGE CHECKS ITSELF against its file: `KIT_CLS` lists the
   classes the css declares, the page renders a demo, and a box at the bottom
   says whether every class was actually shown. Nineteen of those boxes were RED
   and had been red for days, because the verdict was drawn in a browser and no
   gate ever looked at it. `accept.mjs` reads the pass/fail at 8.31b; this file
   answers the next question - WHAT is missing, and is the page even at fault.

   The sorting question is the whole instrument: **a class a script adds at the
   moment of an act cannot be rendered in repose.** Showing it would mean faking
   it, which is banned by the same rule as an invented role, so it belongs in
   `KIT_STS`, where the control asks whether the page NAMES the state instead.
   Everything else is a demo the page owes.

   THE WRONG VERSION, and it was wrong in the direction that flatters: the first
   edition asked «does this class string appear in a JS file?» - `classList.add`
   OR `class="x"` inside a script. It reported 70 states and 109 demos over
   nineteen pages. Reading the evidence line by line, 23 of the 26 on the seven
   smallest pages were `class="x"` inside a TEMPLATE STRING, and in this
   repository that means nothing at all: `wireframes/_nav.js` is the builder of
   the grey prototype, so most of the product's markup lives inside JS string
   literals. Markup is markup wherever it is stored - the stand can render it in
   repose - and the question had quietly become «where does this file live».
   Three of the twenty-six were real: `dr-lock`, `catov-open`, `hidden`.

   So the signature is narrow and falsifiable: `classList.add|toggle|remove('x')`
   on an element that already exists. `.className = '...'` is NOT included - in
   this repo it always dresses a node the same script just created, which is
   markup again.

   AND THE LIST HAS AN IDLE CONTROL, because it is a declared exemption and the
   cheapest way to turn this gate green is to park a class in `KIT_STS` that
   nothing toggles.

   THE FIRST EDITION OF THAT CONTROL WAS ALSO WRONG, and it took one run to see:
   it asked every entry «does a script toggle you» and flagged **143** across 61
   pages. `KIT_STS` is not a list of runtime classes - it is the page's list of
   conditions it can NAME but not stand live, and it holds five kinds:
   pseudo-classes (`:hover`, `::placeholder`), media queries (`min-width: 860px`),
   attributes (`[disabled]`, `aria-busy`), classes the product writes at runtime
   (`mode-edit`), and plain prose («нуль відгуків»). Asking a media query about
   `classList` is not a control, it is noise, and noise in a gate is how the
   nineteen red boxes went unread in the first place.

   So the control narrows to the ONLY kind that could be parked there to silence
   this gate: a bare identifier which the component's own css declares as a class
   and which no script ever toggles. That is 8 entries in the whole stand, and it
   finds 2.

   node tools/idle.mjs              every stand page
   node tools/idle.mjs button chip  only those */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, subject, ROOT } from './lib.mjs';

const SOURCES = ['design/_nav.js', 'wireframes/_nav.js', 'design/system/theme.js',
  'design/system/icons.js', 'design/system/marks.js', 'design/system/fields.js'];
const JS = SOURCES.map(f => {
  try { return readFileSync(join(ROOT, f), 'utf8'); } catch { return ''; }
}).join('\n');

const esc = c => c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
const toggled = c =>
  new RegExp("classList\\.(?:add|toggle|remove)\\(\\s*['\"]" + esc(c) + "['\"]").test(JS);

/* the parked-exemption test, narrowed as the header says: a bare identifier the
   component's own file declares as a class. Everything else in KIT_STS is a
   condition of another kind and this question does not apply to it. */
const cssOf = name => {
  try { return readFileSync(join(ROOT, 'design/system/components', name + '.css'), 'utf8'); }
  catch { return ''; }
};
const parkedIn = (name, sts) => {
  const css = cssOf(name);
  return sts.filter(e => /^[a-z][\w-]*$/.test(e)
    && new RegExp('\\.' + esc(e) + '(?![\\w-])').test(css) && !toggled(e));
};

/* THE PAGE'S OWN WORDS, not a second implementation of its logic. The verdict
   box already names every class it is unhappy about, in <code> pills under a
   sentence that says which kind of unhappy. Re-deriving the three sets here
   would be a check whose both sides come from one source. */
const EXPR = `(() => {
  var box = document.getElementById('idle');
  if (!box || typeof KIT_CLS === 'undefined') return JSON.stringify(null);
  var pills = function(mark){
    var p = [].slice.call(box.querySelectorAll('p')).filter(function(x){
      return x.textContent.indexOf(mark) > -1; })[0];
    return p ? [].slice.call(p.querySelectorAll('code')).map(function(c){ return c.textContent; }) : [];
  };
  return JSON.stringify({
    ok: !/не повністю/.test(box.textContent),
    missing:   pills('немає взагалі'),
    onlyNamed: pills('лише названо'),
    missSts:   pills('станів оголошено'),
    total: KIT_CLS.length,
    cls: KIT_CLS,
    sts: (typeof KIT_STS === 'undefined' ? [] : KIT_STS),
  });
})()`;

/* 12.6: AND IT NEVER ASKED THE OTHER HALF. This file asks «is everything the page
   DECLARED actually shown» - and a page declares its own list, so a page that
   forgets a class is green about the classes it remembered. Measured the day it
   was found: info-page.css held 21 classes and kit-info-page.html declared 4,
   after the file grew by seven rules in one batch. The run printed «89 сторінок,
   червоних 0». A stand page can lose seventeen classes of twenty-one and pass.
   That is the exact shape CLAUDE.md forbids: a declared list that covers nothing
   must fail as loudly as an undeclared case. So the declaration is now measured
   against the FILE, not only against the demo.
   AN ANCHOR, NOT EVERY CLASS. A component legitimately styles names it does not
   own - .tag inside a tile, .btn inside a form - and demanding those in
   KIT_CLS would turn every borrowed name into a defect. The question is only
   about names this file and no other component declares, which is the same
   definition inventory.mjs uses for its Screens walk. */
const CDIR = join(ROOT, 'design/system/components');
const cssFiles = readdirSync(CDIR).filter(f => f.endsWith('.css'));
const stripCss = t => t.replace(/\/\*[\s\S]*?\*\//g, ' ');
const classesOf = f => new Set([...stripCss(readFileSync(join(CDIR, f), 'utf8'))
  .matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map(m => m[1]));
const owners = {};
for (const f of cssFiles) for (const c of classesOf(f)) (owners[c] ||= []).push(f);
const anchorsOf = f => [...classesOf(f)].filter(c => owners[c].length === 1);

const names = subject(process.argv.slice(2), 'design/kit');
const srv = await serve();
const l = await chrome('idle');
const conn = await Conn.open(l.wsUrl);

let declared = 0, red = 0, states = 0, demos = 0, fake = 0, unnamed = 0;
let behind = 0;
for (const p of names) {
  const s = await newSession(conn);
  let r = null;
  try {
    r = JSON.parse(await visit(conn, s.sessionId,
      `${srv.base}/design/kit/${p}.html`, 390, 900, EXPR, s.inflight));
  } finally { await s.close(); }
  if (!r) continue;
  declared++;

  const parked = parkedIn(p.split('/').pop(), r.sts);
  /* the reverse question: does the declaration still cover the file */
  const cssName = p.replace(/^kit\//, '').replace(/\.html$/, '') + '.css';
  const uncovered = cssFiles.includes(cssName)
    ? anchorsOf(cssName).filter(c => !(r.cls || []).includes(c)).sort()
    : [];
  behind += uncovered.length;

  const all = [...r.missing, ...r.onlyNamed];
  if (r.ok && !parked.length && !uncovered.length) continue;
  red++;

  const isSt = all.filter(toggled), owed = all.filter(c => !toggled(c));
  states += isSt.length; demos += owed.length;
  fake += parked.length; unnamed += r.missSts.length;

  console.log('== ' + p + '  (' + all.length + ' з ' + r.total + ')');
  if (isSt.length) console.log('   стан, у спокої не існує (' + isSt.length + '): ' + isSt.join(' '));
  if (owed.length) console.log('   винне демо (' + owed.length + '): ' + owed.join(' '));
  if (r.missSts.length) console.log('   оголошено станом і не названо (' + r.missSts.length + '): ' + r.missSts.join(' '));
  if (parked.length) console.log('   ПОРОЖНІЙ ВИНЯТОК - жоден скрипт не пише (' + parked.length + '): ' + parked.join(' '));
  if (uncovered.length) console.log('   ОГОЛОШЕННЯ ВІДСТАЛО ВІД ФАЙЛА (' + uncovered.length +
    ') - є в css, немає в KIT_CLS: ' + uncovered.join(' '));
}
l.stop(); srv.stop();

console.log('\n' + declared + ' сторінок зі своїм контролем · червоних: ' + red);
console.log('стан: ' + states + ' · винне демо: ' + demos +
  ' · стан не названо: ' + unnamed + ' · порожній виняток: ' + fake +
  ' · оголошення відстало: ' + behind);
if (red) process.exit(1);
