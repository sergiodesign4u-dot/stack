/* tools/dead-sel.mjs - does this selector ever match anything at all?

   THE QUESTION NOTHING IN THIS FOLDER WAS ASKING. `inert.mjs` asks whether a
   DECLARATION is overridden by another rule, and it is structurally blind to a
   selector that never matched: there is no losing declaration to find, because
   there is no element for anything to be declared on. `roles.mjs` asks whether
   the tokens a file reads are the tokens its page lists. `idle.mjs` asks whether
   a class the page NAMES is a class the page SHOWS. None of them can see a rule
   sitting in a shipped stylesheet that has never once painted a pixel.

   TWO WERE FOUND BY HAND, IN THE SAME FILE, AND THAT IS THE WHOLE ARGUMENT.
   `coach-order.css` lost `.od-back` at 8.7 - counted instance by instance in
   both layers, 0 and 0 - and kept `.od-line:last-child` four lines below it,
   which was dead for exactly the same reason and survived because hand counting
   stops when the counter is satisfied. A check rebuilt from memory each step is
   a hand fix; this is the repeatable one.

   HOW THE QUESTION IS ASKED, AND WHY IN THAT ORDER.

   Pass A asks the browser the selector AS WRITTEN, over every page that loads
   the system. A match anywhere is enough - one live element is all a rule needs
   to be doing its job - so a selector goes green on the first page that holds
   it and is never asked again.

   Pass B only runs on what pass A could not place, and it is the SORTING pass,
   the same one `idle.mjs` had to invent: **a rule that only applies during an
   act cannot be found in repose.** `:hover` matches nothing without a pointer,
   `::before` matches nothing ever (querySelector is specified to never return a
   pseudo-element, so asking one is asking a question with a fixed answer), and
   `[data-theme="dark"]` matches nothing until somebody switches the theme. So
   the condition is stripped and the question becomes «does the HOST exist»:

     .coach .cs-save:hover        ->  .coach .cs-save        host exists   OK
     .kp-tag::after               ->  .kp-tag                host exists   OK
     .coach .od-line:last-child   ->  .coach .od-line        host exists - and
                                      this is exactly why the sorting cannot be
                                      the whole answer, see below

   `:last-child` is NOT a condition of an act - it is structural, true or false
   in repose - so it stays in pass A's question and pass A's verdict stands. The
   list of what gets stripped is therefore a list of ACTS and STATES, never of
   structure: strip `:nth-child` and the instrument stops being able to find the
   defect it was built for.

   THE WRONG VERSIONS, WRITTEN DOWN SO THEY ARE NOT REBUILT.

   1. ASKING THE SOURCE INSTEAD OF THE BROWSER. Grepping the class name across
      `design/*.html` looks equivalent and is not, in both directions: half of
      this product's markup is written at runtime by `wfHeader()`, `_nav.js` and
      friends and exists in no html file, so real elements would read as absent;
      and a class sitting in a JS template string that no branch ever renders
      would read as present. `idle.mjs`'s header records the same lesson from the
      other side. The browser is asked because the browser is what paints.

   2. STRIPPING EVERY PSEUDO-CLASS. The first draft treated `:` as the mark of a
      state and stripped all of it. That turns `.od-line:last-child` into
      `.od-line`, which is alive, and the one defect this file exists to find
      reports as healthy. The strip list is enumerated, never pattern-matched.

   3. COUNTING A MATCH ON A PAGE THAT DOES NOT LOAD THE SYSTEM. A class present
      in markup is a class present whether or not a stylesheet ever reached it,
      so `overview.html` and the three concept pages - which are deliberately off
      the system - would lend liveness to rules that never painted on them. The
      corpus is asked, in the browser, whether `system/index.css` is actually in
      `document.styleSheets`, and the pages that answer no are named out loud
      rather than dropped in silence.

   WHAT A VERDICT HERE DOES AND DOES NOT SAY. «МЕРТВИЙ» means «matched nothing on
   these 263 pages», never «can never match». Both kinds turn up in the same
   list and they are repaired differently:

     a rule with no possible host    `.btn--accent .uiv-brand` - the brand mark
                                     only ever sits on the outline finish, so the
                                     accent edition of the line was written by
                                     symmetry and has no element anywhere
     a combination the corpus        `.pcard.dim .pold` - dimmed cards exist and
     never shows                     struck prices exist, and no card in the
                                     product is both at once

   The instrument reports the fact and refuses to guess which it is. The reading
   is a person's, and it is written beside the fix, not here.

   THE IDLE CONTROL, AND IT IS THE ONE THAT MATTERS HERE. Pass B is an exemption
   list, and the cheapest way to turn this gate green is to widen it until
   everything is a state. So the bucket must not be empty: a system with
   seventeen hover finishes and a focus ring on every control HAS rules that
   cannot stand in repose, and if pass B ever reports zero, the stripping broke
   rather than the system got clean. The same for the corpus: pages without the
   system are a declared exception and are counted.

     node tools/dead-sel.mjs                 all 84 components
     node tools/dead-sel.mjs coach-order     only those */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, pages, ROOT, topRules } from './lib.mjs';

const CDIR = join(ROOT, 'design/system/components');
/* 9.1: A PATTERN'S SELECTORS ARE ASKED THE SAME QUESTION. Stage 09 put a second
   folder inside the system, and this walk read only the first - so `.actions` and
   its two modifiers, shipped in `index.css` like everything else, were the one
   part of the system nothing checked. A dead selector in a pattern costs exactly
   what a dead selector in a component costs. */
const PDIR = join(ROOT, 'design/system/patterns');
const stripC = s => s.replace(/\/\*[\s\S]*?\*\//g, '');

/* the at-rules that hold selectors, and the ones whose braces hold something
   else entirely - `@keyframes` heads are `from` / `to` / `47%`, and asking the
   browser for `47%` is not a question about the product. */
const NEST = /^@(media|supports|container|layer|scope)\b/;
const SKIP = /^@(keyframes|font-face|property|import|charset|counter-style|page)\b/;

/* every selector the component layer declares, with the line it sits on. Same
   walk and same comma split `inventory.mjs` counts with, so the two instruments
   cannot disagree about the denominator. */
function selectorsOf(file) {
  const css = readFileSync(join(file.startsWith('patterns/') ? PDIR : CDIR,
    file.startsWith('patterns/') ? file.slice(9) : file), 'utf8');
  const out = [];
  const lineAt = i => css.slice(0, i).split('\n').length;
  const walk = (text, base) => {
    for (const s of topRules(text)) {
      const t = text.slice(s.start, s.end);
      const b = t.indexOf('{');
      if (b < 0) continue;
      const head = stripC(t.slice(0, b)).trim();
      if (SKIP.test(head)) continue;
      if (NEST.test(head)) { walk(t.slice(b + 1, t.lastIndexOf('}')), base + s.start + b + 1); continue; }
      if (/^@/.test(head)) continue;
      for (const one of head.split(',').map(x => x.trim()).filter(Boolean))
        out.push({ sel: one, line: lineAt(base + s.start) });
    }
  };
  walk(css, 0);
  return out;
}

/* THE STRIP LIST IS ENUMERATED. Everything here is a condition that exists only
   while something is happening - a pointer is down, a theme is switched, a
   script wrote a class. Structure is not here on purpose: `:first-child`,
   `:last-child`, `:nth-child`, `:only-child`, `:empty`, `:has`, `:not` and `:is`
   are true or false in repose, so they stay in the question. */
const STATE_PC = ['hover', 'active', 'focus', 'focus-visible', 'focus-within',
  'disabled', 'enabled', 'checked', 'indeterminate', 'default', 'placeholder-shown',
  'autofill', 'target', 'visited', 'link', 'any-link', 'user-invalid', 'user-valid',
  'invalid', 'valid', 'in-range', 'out-of-range', 'required', 'optional',
  'read-only', 'read-write', 'open', 'popover-open', 'modal', 'fullscreen', 'defined'];

const SOURCES = ['design/_nav.js', 'wireframes/_nav.js', 'design/system/theme.js',
  'design/system/icons.js', 'design/system/marks.js', 'design/system/fields.js'];
const JS = SOURCES.map(f => { try { return readFileSync(join(ROOT, f), 'utf8'); } catch { return ''; } }).join('\n');
const esc = c => c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
const toggled = c => new RegExp("classList\\.(?:add|toggle|remove)\\(\\s*['\"]" + esc(c) + "['\"]").test(JS);

/* WHAT IS INSIDE PARENTHESES IS NOT TOUCHED, and the first draft touched it.
   `:not(.on)` is an ARGUMENT, not a condition of this element: strip `.on` out
   of it because a script toggles that class and the selector becomes `:not()`,
   which no browser will parse - so the host query throws, the host reads as
   absent, and eleven perfectly healthy `:hover` rules on radios, steppers and
   the view toggle report as dead. The mistake flatters, which is the dangerous
   direction: it produces findings. Stripping happens at paren depth 0 only. */
function outsideParens(sel, fn) {
  let out = '', buf = '', depth = 0;
  for (const ch of sel) {
    if (ch === '(') { if (!depth) { out += fn(buf); buf = ''; } depth++; out += ch; continue; }
    if (ch === ')') { depth--; out += ch; continue; }
    if (depth) { out += ch; continue; }
    buf += ch;
  }
  return out + fn(buf);
}

/* the host of a conditional selector: the same selector with every ACT taken
   off it. Attribute conditions go too - `[aria-expanded="true"]` and
   `[data-theme="dark"]` are written by a script or by the theme switch - and so
   do classes a script toggles, by the signature `idle.mjs` settled on. */
/* `:has()` IS NOT `:not()`, AND THE FIRST WRITING TREATED THEM THE SAME.
   Nothing inside parentheses is stripped, for the `:not(.on)` reason above - and
   that is right for `:not()`, where the argument is a NEGATIVE condition and
   removing it inverts the rule. `:has()` is the opposite: the argument is a
   positive condition on a descendant, so when that argument is nothing but ACT
   pseudo-classes the whole `:has(...)` is itself an act condition, and the honest
   host is the selector with it taken off.
   It cost two false deaths the day step 10.6b wrote its first two of them -
   `.field-grp:has(:focus-visible)` and `.coach .cl-search:has(:focus-visible)`,
   both alive, both reported dead, because a focus condition inside `:has()` can
   no more be found in repose than one outside it.
   ONLY when the argument is pure act. `:has(.real-class)` is structural and stays
   in pass A's question, exactly like `:last-child`: strip that and the instrument
   stops being able to find the defect it was built for. */
const ACT_ONLY_HAS = new RegExp(':has\\(\\s*(?::(?:' + STATE_PC.join('|') + ')\\s*)+\\)', 'g');

function hostOf(sel) {
  sel = sel.replace(ACT_ONLY_HAS, '');
  const cut = seg => seg
    .replace(/::[a-z-]+/g, '')                                   /* pseudo-elements */
    .replace(/:([a-z-]+)/g, (m, name) => STATE_PC.includes(name) ? '' : m)
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\.([a-zA-Z][\w-]*)/g, (m, c) => toggled(c) ? '' : m);
  let s = outsideParens(sel, cut).replace(/\s+/g, ' ').trim();
  s = s.replace(/^[>+~]+|[>+~]+$/g, '').trim();
  return s || '*';
}

/* THE ONE EXEMPTION A MEASUREMENT CANNOT DERIVE: an element that does not exist
   on a loaded page because a script CREATES it at the moment of an act. Pass B
   cannot help - there is no host to strip down to, the host is the thing that is
   missing - so this is declared by a person, with the line of code that builds
   it, and the control below fails if a declaration stops covering anything.

   `idle.mjs` deliberately refused the `className = '...'` signature, on the
   ground that there it always dresses a node the script just created, which is
   markup and can be shown in repose. That is the same fact read for the opposite
   question, and both readings are right: a created node CAN be put on a stand
   page (so it owes a demo), and it CANNOT be found on a loaded product screen
   (so it is not dead). */
const BORN_AT_AN_ACT = {
  'toast.css': 'the stack is an empty placeholder until wfToast() builds a strip inside it - '
    + 'wireframes/_nav.js:1242, `t.className = "wf-toast " + (type || "info")`. '
    + 'The stand page reaches these through KIT_EXTRA, which fires one of each and clears it.',
};

/* THE SECOND DECLARED EXEMPTION, AND IT IS THE ONE THAT CAN ROT INTO A DUMPING
   GROUND. A verdict here says «matched nothing on these 263 pages», never «can
   never match», and three of the sixteen the first sweep found are the second
   kind: a rule for a state of the SHOP that this catalogue's demo data does not
   contain. Deleting those would be repairing the product to suit the fixture.

   So they are kept, one selector at a time, with the reason - and the control
   below fails in BOTH directions. An entry that no longer reports dead means the
   case has arrived and the note has to go; an entry naming a selector the file
   no longer declares means the exemption outlived its rule. A list that can only
   grow is not an exemption, it is a silence.

   `.pl-hw .pl-ic:empty` is a different animal in the same cage and is written
   out where it lives: the toast is BORN at an act, that slot is KILLED by one. */
const KEPT_ON_PURPOSE = {
  '.pdp-tabs .tprice:not(:has(.told)) .tnew':
    'a product at full price - every product in this catalogue is discounted, so every '
    + '.tprice has a .told. Without the line a full-price figure sits on grid row 2 with an '
    + 'empty row above it.',
  '.pcard.dim .pold':
    'an out-of-stock product that is also discounted. Dimmed cards exist, struck prices exist, '
    + 'no card in the demo catalogue is both.',
  '.pcard.dim .pcut':
    'the discount chip on the same card, same reason.',
  '.pl-hw .pl-ic:empty':
    'KILLED by an act, the mirror of the toast: the markup ships the slot empty and '
    + 'design/_nav.js:1461 fills all three on every load, so :empty is false by the time '
    + 'anything is measured. Between the two moments this rule is the slot\'s only box.',
};

const want = process.argv.slice(2).filter(a => !a.startsWith('-'));
const files = [...readdirSync(CDIR).filter(f => f.endsWith('.css')).sort(),
  ...(existsSync(PDIR) ? readdirSync(PDIR).filter(f => f.endsWith('.css')).sort().map(f => 'patterns/' + f) : [])]
  .filter(f => !want.length || want.includes(f.replace(/^patterns\//, '').slice(0, -4)));
if (!files.length) { console.log('НЕМАЄ ТАКОГО КОМПОНЕНТА: ' + want.join(' ')); process.exit(2); }

const all = [];
for (const f of files) for (const e of selectorsOf(f)) all.push({ file: f, ...e });

/* one probe per DISTINCT selector text - `.coach .od-line` declared in two files
   is one question - and the answer is fanned back out at the end. */
const uniq = [...new Set(all.map(e => e.sel))];
const host = new Map(uniq.map(s => [s, hostOf(s)]));
const probes = [...new Set([...uniq, ...host.values()])];

const CORPUS = pages('design');
const srv = await serve();
const l = await chrome('dead-sel');
const conn = await Conn.open(l.wsUrl);

const alive = new Set();
const refused = new Set();
const firstOn = new Map();
const noSystem = [];
let visited = 0;

/* NO EARLY EXIT WHEN EVERY PROBE HAS GONE GREEN, and that is not an oversight.
   The corpus census is half of this instrument's own honesty - a page without
   the system has to be NAMED, and a walk that stops at page 47 because it is
   satisfied has not looked at pages 48 to 267 and cannot say anything about
   them. Stopping early was the first draft, and it reported «0 pages without
   the system» on a repository that has four. The per-page work still shrinks:
   only selectors still unplaced are asked. */
for (const p of CORPUS) {
  const left = probes.filter(s => !alive.has(s) && !refused.has(s));
  const expr = `(() => {
    const on = [...document.styleSheets].some(s => s.href && /system\\/index\\.css/.test(s.href));
    if (!on) return JSON.stringify({ on: false, hit: [], bad: [] });
    const sels = ${JSON.stringify(left)}, hit = [], bad = [];
    for (const s of sels) { try { if (document.querySelector(s)) hit.push(s); } catch (e) { bad.push(s); } }
    return JSON.stringify({ on: true, hit, bad });
  })()`;
  const s = await newSession(conn);
  let r = null;
  try {
    r = JSON.parse(await visit(conn, s.sessionId, `${srv.base}/design/${p}.html`, 1280, 900, expr, s.inflight));
  } finally { await s.close(); }
  if (!r) continue;
  if (!r.on) { noSystem.push(p); continue; }
  visited++;
  for (const h of r.hit) { alive.add(h); if (!firstOn.has(h)) firstOn.set(h, p); }
  for (const h of r.bad) refused.add(h);
}
l.stop(); srv.stop();

/* six verdicts, and every selector gets exactly one */
const dead = [], conditional = [], unasked = [], born = [], kept = [];
for (const e of all) {
  if (alive.has(e.sel)) continue;
  if (refused.has(e.sel)) { unasked.push(e); continue; }
  if (BORN_AT_AN_ACT[e.file]) { born.push(e); continue; }
  if (KEPT_ON_PURPOSE[e.sel]) { kept.push(e); continue; }
  const h = host.get(e.sel);
  if (h !== e.sel && alive.has(h)) conditional.push({ ...e, host: h });
  else dead.push({ ...e, host: h });
}

let last = '';
for (const d of dead) {
  if (d.file !== last) { console.log('\n== ' + d.file); last = d.file; }
  console.log('   МЕРТВИЙ  ' + d.sel + '   (рядок ' + d.line + ')' +
    (d.host !== d.sel ? '   господар теж не знайшовся: ' + d.host : ''));
}

if (unasked.length) console.log('\nцей рушій не приймає селектор, питання не про нього (' +
  unasked.length + '): ' + unasked.map(u => u.file + ':' + u.line + ' ' + u.sel).join(' · '));

console.log('\n' + all.length + ' селекторів у ' + files.length + ' файлах · різних: ' + uniq.length);
console.log('живих як написано: ' +
  (all.length - dead.length - conditional.length - unasked.length - born.length - kept.length) +
  ' · умова, господар є: ' + conditional.length +
  ' · народжується в акті: ' + born.length + ' · лишено свідомо: ' + kept.length +
  ' · МЕРТВИХ: ' + dead.length);
console.log('корпус: ' + visited + ' сторінок із системою');

/* THE IDLE CONTROLS. Both exemptions are declared, so both are counted, and a
   zero in either is a broken instrument rather than a clean system. The first
   one is asked only of the FULL sweep: a single file may honestly declare no
   state at all - `coach-order.css` declares none - and failing it there would
   teach the reader to ignore the line. */
const FULL = !want.length;
if (FULL && !conditional.length)
  console.log('ХОЛОСТИЙ КОНТРОЛЬ ВПАВ: жодної умовної форми. Система має ховери й кільця фокусу,'
    + ' тож нуль тут означає, що зрізання зламалось, а не що правил не стало');
if (!FULL) console.log('умовний контроль не питається на підмножині: один файл має право не мати станів');
if (!noSystem.length)
  console.log('ХОЛОСТИЙ КОНТРОЛЬ ВПАВ: жодної сторінки без системи, хоча концепт-сторінки й хаб етапу її не підключають');
else console.log('без системи, питання не про них (' + noSystem.length + '): ' + noSystem.join(' '));

/* the third exemption, and it is a hand-written one, so it is the one most
   likely to rot: a file declared «born at an act» that turns out to have every
   selector alive is a declaration covering nothing. */
const emptyDecl = Object.keys(BORN_AT_AN_ACT)
  .filter(f => (!want.length || want.includes(f.slice(0, -4))) && !born.some(b => b.file === f));
if (emptyDecl.length)
  console.log('ПОРОЖНЄ ОГОЛОШЕННЯ - усі селектори знайшлись, виняток нічого не вкриває (' +
    emptyDecl.length + '): ' + emptyDecl.join(' '));

/* the kept list fails in both directions, and only the FULL sweep can ask: on a
   subset the other files are simply not in the corpus of declared selectors. */
const declared = new Set(all.map(e => e.sel));
const woken = FULL ? Object.keys(KEPT_ON_PURPOSE).filter(s => alive.has(s)) : [];
const orphan = FULL ? Object.keys(KEPT_ON_PURPOSE).filter(s => !declared.has(s)) : [];
if (woken.length)
  console.log('ЛИШЕНЕ СВІДОМО ОЖИЛО - випадок настав, нотатку час прибрати (' +
    woken.length + '): ' + woken.join(' · '));
if (orphan.length)
  console.log('ЛИШЕНЕ СВІДОМО ПЕРЕЖИЛО СВОЄ ПРАВИЛО - файл більше не оголошує цей селектор (' +
    orphan.length + '): ' + orphan.join(' · '));

process.exit(dead.length || emptyDecl.length || woken.length || orphan.length ||
  (FULL && !conditional.length) || !noSystem.length ? 1 : 0);
