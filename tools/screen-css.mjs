/* tools/screen-css.mjs - THE CONTRACT'S FLOOR, ASKED OF EVERY COLOURED SCREEN.

   WHAT IT IS FOR. Stage 12 hands the same contract to every subagent, and its
   hardest line is «a screen declares no styles of its own»: no `@media`, no
   `transition`, no `animation`, no `@keyframes`, no `<style>` tag, no `style`
   attribute, no hex, no `px` and no font name past a token. Nine marks, zero
   tolerance, and until this file the instrument for them was a grep somebody
   would type differently each time.

   A HAND-TYPED GREP CANNOT CARRY THE EXCEPTIONS, AND THERE ARE TWO. Each is
   declared here with a COUNT rather than a pass, the shape `typo.mjs` uses: a
   mute that says «this file is fine» hides the next real one added beside it,
   while a mute that says «exactly N here» fails the moment either side moves.

     1  A PERCENTAGE ON A BAR. `style="width:82%"` is a VALUE, not a style: a
        static prototype has no server to compute a rating bar or a loyalty bar,
        and a class per percentage would be a scale of one-use names. 20 of
        them, on 8 screens, and the count is checked.
     2  THE HUB. `design/overview.html` is the map of the coloured prototype, not
        a screen of the product, and it declares its own vocabulary because it
        loads no `system/index.css`. Same line CLAUDE.md already draws through
        `kit/` and `concept/`.

   AND THE THIRD EXCEPTION WAS WRITTEN, RUN, AND WITHDRAWN BY ITS OWN IDLE
   CONTROL. The pack names INLINE SVG as the one exception this instrument must
   carry: icons are one inline set by the stage-07 decision and they arrive with
   their own `fill`, `stroke`, `width`, `height` and `viewBox`, so a run without
   the exception would return a legal non-zero on every screen. The first
   version stripped `<svg>...</svg>` and then asked how many bytes it had
   removed. **Zero, on all 91 screens, and on all 142 grey ones.** This product
   has no svg in its markup at all: `uivChrome()` in `design/_nav.js` swaps every
   emoji for an icon AT RUNTIME, so an instrument that reads the source never
   meets one. An exception for a thing that is not there is the cheapest kind of
   false coverage, and it would have hidden the case that matters - a subagent
   hand-writing an icon, which SHOULD fail on `hex` and on `px`, because a screen
   does not draw its own icons in this product.

   COMMENTS ARE NOT CODE, and one screen proves it: `coach-tariff.html` has the
   word `<style>` inside a `<script>` comment, describing what the grey original
   had. A raw text search calls that a style block. Html comments and script
   comments come out before anything is asked.

   THE TENTH MARK, ADDED AT 12.10, AND IT IS THE ONE THE CONTRACT ALREADY
   NAMED. The ban list in `rollout.md` section D has always ended «плюс клас,
   якого немає в системі», and the very next line tells fifty subagents to check
   themselves with `node tools/screen-css.mjs`. THIS FILE NEVER ASKED THAT
   QUESTION. Nine marks were implemented; the tenth was in the prose of the
   contract, in the prose of the skill, and nowhere in code - so «чисто» was a
   true answer to nine tenths of the sentence it was answering, for five batches.
   Found at step 7 by Codex, which read the contract and the instrument side by
   side and noticed they disagreed.

   A CLASS HAS TWO KINDS OF OWNER, AND ONLY ONE OF THEM IS A RULE. It can be
   worn for a declaration (`design/system/**`, or `design/_stand.css`, which a
   coloured screen loads too), or it can be READ - by `design/_nav.js`,
   `wireframes/_nav.js`, `design/system/*.js` or the screen's own tail script -
   in which case it is load-bearing markup and not a style at all. Both are
   reported, separately: a name with neither is inert, and inert is the finding.

   WRONG VERSION 1: the selector index was built with a bare `/\.name/` over the
   stylesheet text. Every class named in a css COMMENT then counted as declared -
   and this system's comments name deleted rules by name, on purpose, dozens of
   times. Comments come out of the css before the index is built, exactly as they
   already come out of the markup.

   WRONG VERSION 2: `class=` was matched, but this product also writes
   `className` in tail scripts and `classList.add('x')` in the shell. Those are
   READERS, not wearers, and putting them in the same bucket made the reader
   list swallow the defect: `qadd-field` came out «has an owner» because the
   substring `field` is read somewhere else entirely. The reader test is anchored
   on the whole token, never on a substring.

     node tools/screen-css.mjs           every coloured screen
     node tools/screen-css.mjs cart      only those
     node tools/screen-css.mjs --list    print every hit, not just the counts   */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, pages } from './lib.mjs';

const argv = process.argv.slice(2);
const LIST = argv.includes('--list');
const APPLY = argv.includes('--apply');
const named = argv.filter(a => !a.startsWith('-'));
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HUB = 'overview';
const VALUE_ATTR = /^width:\d+(?:\.\d+)?%$/;      /* exception 1 */
/* 12.8: 20 -> 26. Three subagents of batch 4 hit the idle control at once and
   two of them wrote it up as an order rather than as noise, which is the control
   working: the number is a CLAIM about the corpus, and the corpus grew. The six
   new bars are the five rating distributions of node 8.11 and the tier progress
   of node 8.7. Re-declared by the parent, because a subagent may not re-declare
   a claim about screens it cannot see. */
const DECLARED_VALUES = 26;                        /* and it is a count, not a pass */

/* ---- the tenth mark's two indexes -------------------------------------
   DECLARED = a class that some stylesheet a coloured screen LOADS writes a rule
   for. READ = a class some script mentions by whole token. Anything a screen
   wears and neither index knows is inert markup. */
const cssFiles = [];
(function walk(dir) {
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    if (e.isDirectory()) walk(dir + '/' + e.name);
    else if (e.name.endsWith('.css')) cssFiles.push(dir + '/' + e.name);
  }
})('design/system');
if (existsSync(join(ROOT, 'design/_stand.css'))) cssFiles.push('design/_stand.css');

const DECLARED = new Set();
for (const f of cssFiles) {
  const css = readFileSync(join(ROOT, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, ' ');
  for (const m of css.matchAll(/\.(-?[_a-zA-Z][-_a-zA-Z0-9]*)/g)) DECLARED.add(m[1]);
}

const jsFiles = ['design/_nav.js', 'wireframes/_nav.js']
  .concat(readdirSync(join(ROOT, 'design/system')).filter(f => f.endsWith('.js')).map(f => 'design/system/' + f))
  .filter(f => existsSync(join(ROOT, f)));
let JS = jsFiles.map(f => readFileSync(join(ROOT, f), 'utf8')).join('\n');
const readsClass = tok => new RegExp('[\'"`.\\s]' + tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\'"`\\s)\\]]').test(JS);

const all = pages('design').filter(p => !p.includes('/'));
const subject = named.length ? all.filter(p => named.some(n => p.includes(n))) : all;
const screens = subject.filter(p => p !== HUB);
if (!screens.length) { console.log('обхід не відкрив жодного екрана - предмет порожній'); process.exit(1); }

/* what is asked, after the three exceptions and the two comment kinds are out */
const MARKS = [
  ['@media',      /@media/g],
  ['transition',  /\btransition\s*:/g],
  ['animation',   /\banimation\s*:/g],
  ['@keyframes',  /@keyframes/g],
  ['<style>',     /<style[\s>]/g],
  ['style=',      /\sstyle\s*=/g],
  ['hex',         /#[0-9a-fA-F]{3,8}\b/g],
  ['px',          /\b\d+(?:\.\d+)?px\b/g],
  ['font-family', /font-family/g],
];

const tally = new Map(MARKS.map(([n]) => [n, []]));
let values = 0, valueScreens = new Set(), svgFound = 0;
const inert = new Map(), readOnly = new Map();

for (const p of screens) {
  let s = readFileSync(join(ROOT, 'design', p + '.html'), 'utf8');
  /* the tail script of THIS screen is a reader of THIS screen's markup, so it is
     asked per screen rather than pooled - a class read on `cart` proves nothing
     about the same name sitting inert on `account` */
  const ownJs = (s.match(/<script\b[^>]*>([\s\S]*?)<\/script>/g) || []).join('\n');
  const worn = new Set();
  for (const m of s.replace(/<!--[\s\S]*?-->/g, ' ').matchAll(/\sclass\s*=\s*"([^"]*)"/g))
    for (const tok of m[1].split(/\s+/)) if (tok) worn.add(tok);
  for (const tok of worn) {
    if (DECLARED.has(tok)) continue;
    const own = new RegExp('[\'"`.\\s]' + tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\'"`\\s)\\]]').test(ownJs);
    const bag = (readsClass(tok) || own) ? readOnly : inert;
    if (!bag.has(tok)) bag.set(tok, []);
    bag.get(tok).push(p);
  }
  /* counted, not stripped - see the header. If a screen ever DOES hand-write an
     icon, that is the finding, not the exception. */
  svgFound += (s.match(/<svg[\s>]/g) || []).length;
  s = s.replace(/<!--[\s\S]*?-->/g, ' ');                           /* an html comment is not markup */
  s = s.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/g, (m, body) =>
    m.replace(body, body.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|\s)\/\/[^\n]*/g, ' ')));
  /* the VALUE attributes come out and are counted, not forgiven */
  s = s.replace(/\sstyle\s*=\s*"([^"]*)"/g, (m, body) => {
    if (VALUE_ATTR.test(body.trim())) { values++; valueScreens.add(p); return ' '; }
    return m;
  });
  for (const [name, re] of MARKS) {
    const hits = s.match(re);
    if (hits) tally.get(name).push([p, hits.length]);
  }
}

let bad = 0;
console.log(`\nПІДЛОГА КОНТРАКТУ - ${screens.length} кольорових екранів (хаб ${HUB} поза предметом)\n`);
for (const [name] of MARKS) {
  const rows = tally.get(name);
  const n = rows.reduce((a, r) => a + r[1], 0);
  console.log(`  ${name.padEnd(14)} ${String(n).padStart(4)}   на ${String(rows.length).padStart(3)} екранах`);
  if (n) bad += n;
  if (n && LIST) for (const [p, c] of rows) console.log(`      ${p} ${c > 1 ? 'x' + c : ''}`);
}

/* THE DECLARED COUNT IS A CLAIM ABOUT THE CORPUS, SO ONLY THE CORPUS CAN ANSWER
   IT - and the first writing did not say so. `DECLARED_VALUES` is 20 over 91
   screens; a run filtered to four of them finds 0, the idle control fired, and
   the run FAILED while reporting «0 знаків повз контракт» in the same breath.

   That is not a small wording bug. The contract in `rollout.md` tells every one
   of fifty subagents to self-check with `node tools/screen-css.mjs <свій екран>`
   and expect «чисто», and by construction no filtered run could ever say it -
   not even one whose screens DO carry the bars: `account-loyalty` alone finds 3
   of the 20. Found by the first subagent of batch 1, which is exactly what the
   first batch is for: a defect of the contract costs twenty screens, and this
   one was in the instrument the contract points at.

   So the assertion applies to the FULL walk. A filtered run still counts and
   still prints, because the number is useful there too - it just cannot be
   compared with a total it is a subset of. */
const FULL = !named.length;
console.log(`\n  оголошений виняток - відсоток на смузі: ${values} на ${valueScreens.size} екранах` +
  (FULL ? '' : `  (предмет звужено - оголошені ${DECLARED_VALUES} перевіряються лише на повному обході)`));
let idle = false;
if (FULL && values !== DECLARED_VALUES) {
  idle = true;
  console.log(`  ХОЛОСТИЙ КОНТРОЛЬ: оголошено ${DECLARED_VALUES}, у корпусі ${values} - або смуга зникла, або хтось написав style= і назвав це значенням`);
}
if (svgFound) {
  idle = true;
  console.log(`  ${svgFound} inline <svg> у розмітці екранів - у цьому продукті іконки малює uivChrome() у рантаймі, тож це намальована руками іконка, а не виняток`);
}
/* ---- the tenth mark's report ---------------------------------------- */
const inertRows = [...inert.entries()].sort((a, b) => b[1].length - a[1].length);
console.log(`\n  10. клас, якого немає в системі: ${inertRows.length} імен на ${inertRows.reduce((a, r) => a + r[1].length, 0)} місцях`);
for (const [tok, ps] of inertRows)
  console.log(`      .${tok.padEnd(16)} ${String(ps.length).padStart(2)} екранів  [${ps.slice(0, 4).join(', ')}${ps.length > 4 ? ', ...' : ''}]`);
console.log(`      правила немає, але скрипт читає (не дефект): ${readOnly.size} імен` +
  (readOnly.size && LIST ? '\n        ' + [...readOnly.keys()].join(' ') : ''));
if (inertRows.length) bad += inertRows.length;

/* ---- and the repair, which is a RULE and not twenty-four hand edits --------
   A name with no rule and no reader cannot change a pixel: that is what «no
   matching selector» means in css. So the removal is safe by construction, and
   it is still proved afterwards rather than asserted - `--apply` re-asks with
   this same instrument, and the gate that follows re-walks the corpus in a
   browser. A name that SHOULD have had a rule does not come here at all: it
   gets the rule in `design/system/`, and then this list is one name shorter by
   itself. That happened once, with `.yes` on `coach-landing`. */
if (APPLY && inertRows.length) {
  const dead = new Set(inertRows.map(r => r[0]));
  let files = 0, slots = 0;
  for (const p of screens) {
    const f = join(ROOT, 'design', p + '.html');
    const src = readFileSync(f, 'utf8');
    let hit = 0;
    const out = src.replace(/(\sclass\s*=\s*")([^"]*)(")/g, (m, a, body, c) => {
      const keep = body.split(/\s+/).filter(t => t && !dead.has(t));
      if (keep.length === body.split(/\s+/).filter(Boolean).length) return m;
      hit += body.split(/\s+/).filter(t => t && dead.has(t)).length;
      return keep.length ? a + keep.join(' ') + c : '';
    });
    if (hit) { writeFileSync(f, out); files++; slots += hit; }
  }
  console.log(`\n  ЗНЯТО: ${slots} місць у ${files} файлах`);
  console.log('\n=== ПЕРЕПИТУЄМО ТИМ САМИМ ПРИЛАДОМ, уже після правок ===');
  const again = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...named], { stdio: 'inherit' });
  process.exit(again.status ?? 1);
}

if (bad) console.log(`\n  ПРОВАЛ: ${bad} знаків повз контракт\n`);
else if (idle) console.log('\n  ЗНАКІВ ПОВЗ КОНТРАКТ НЕМАЄ, але холостий контроль впав - див. вище\n');
else console.log('\n  чисто\n');
process.exit(bad || idle ? 1 : 0);
