/* tools/comp-width.mjs - the tenth check: what does each component know about width,
   and how wide is the widest screen it stands on?

   THE QUESTION. Stage 10 needs one row per COMPONENT, not per screen: the width
   audit is sorted by screen, and a component that stands only on screens in the
   category «the same» never appears in it even once. That component rides into the
   rollout and gets placed somewhere it does not understand. So the registry is
   built here, from `inventory.md`, and every file gets a row.

   WHICH CORPUS, AND THE PACK'S RULE HAS A THIRD CASE.
   The rule says count on `wireframes/` because the whole product is there. That is
   right for counting SCREENS. It is wrong for locating a SYSTEM CLASS, and the
   first writing of this registry got it wrong: it matched the system's anchors
   against the grey corpus with a regex over `class="..."` and reported `button.css`
   on ZERO screens. The grey prototype was frozen at stage 05 and never migrated -
   the rename map of stage 08 step 6 ran on `design/*.html` only - so the system's
   own class names do not exist in the grey layer at all. A question about the
   system's names can only be asked of the coloured corpus.

   AND IT HAS TO BE A BROWSER. The second wrong version stayed static and read
   `class="..."` out of the coloured html: 68 of 85 rows disagreed with the `Screens`
   column that `inventory.mjs --screens` measures, because `icons.js`, `marks.js` and
   `fields.js` add classes at load. A component is worn where the DOM says it is
   worn, not where the source says so.

   AND AN ANCHOR IS A CLASS ONLY ONE FILE OWNS. The third wrong version took every
   class token in the file, descendant parts included, so `otp.css` - three rules
   about a one-time-code field - answered «91 screens», because its selectors also
   name `.field` and `.btn`. `inventory.mjs` had the rule already and this file did
   not: a class written by two component files is nobody's anchor, and asking with it
   measures the neighbour.

   A FILE WITH NO CLASS OF ITS OWN GETS «NO ANSWER», NEVER «ZERO». Four atoms -
   badge, icon, product-thumb, counter - write only classes that another component
   file also writes, so the ownership rule leaves them without a single anchor. The
   walk cannot ask about them at all, and printing «0 screens» there would be the
   exact false zero this repository keeps paying for. They are counted separately and
   named.

   WHAT IT COSTS TO BE HONEST: 50 of the 141 grey screens have no coloured twin, so
   a component standing only there is invisible to this walk. By construction that
   cannot happen - the system's classes are worn by the coloured layer and nowhere
   else - and the grey-only screens were measured separately by `dry-run.mjs`, which
   found 228 classes in 79 families that have no component at all. Both numbers are
   printed, so neither hides.

   node tools/comp-width.mjs             every component, grouped by level
   node tools/comp-width.mjs --md        the same as a markdown table, for responsive.md
   node tools/comp-width.mjs atom        one level: atom | molecule | organism | pattern */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, ROOT, pages } from './lib.mjs';

const ONLY = process.argv.slice(2).filter(a => !a.startsWith('--'))[0] || null;
const MDOUT = process.argv.includes('--md');
const LEV = { atoms: 'atom', molecules: 'molecule', organisms: 'organism', patterns: 'pattern' };
const RANK = { 'THE SAME': 0, 'WIDER': 1, 'NEW BEHAVIOUR': 2 };
const NAME = ['ОДНАКОВО', 'ШИРШЕ', 'НОВА ПОВЕДІНКА'];

/* the audit categories come from the document, not from a second copy here */
const MD = readFileSync(join(ROOT, 'design/kit/docs/responsive.md'), 'utf8');
const CAT = {};
for (const m of MD.matchAll(/^\| `([a-z0-9-]+)` \|[^|]*\| (THE SAME|WIDER|NEW BEHAVIOUR)/gm)) CAT[m[1]] = m[2];
if (Object.keys(CAT).length < 100) { console.error('таблиця аудиту не прочиталась з responsive.md'); process.exit(2); }

const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, '');
const classesOf = f => new Set([...strip(readFileSync(f, 'utf8'))
  .matchAll(/(?:^|[\s,{}>+~])\.([A-Za-z][A-Za-z0-9_-]*)/g)].map(m => m[1]));
/* ownership, the same rule inventory.mjs uses: a class written by two component
   files is nobody's anchor - asking with it measures the neighbour */
const ALLCSS = [
  ...readdirSync(join(ROOT, 'design/system/components')).map(f => join(ROOT, 'design/system/components', f)),
  ...readdirSync(join(ROOT, 'design/system/patterns')).map(f => join(ROOT, 'design/system/patterns', f)),
].filter(f => f.endsWith('.css'));
const owners = {};
for (const f of ALLCSS) for (const c of classesOf(f)) (owners[c] ||= []).push(f);
const anchorsOf = f => [...classesOf(f)].filter(c => owners[c].length === 1);

const INV = readFileSync(join(ROOT, 'design/kit/docs/inventory.md'), 'utf8');
const rows = []; let level = null; const seen = new Set();
for (const ln of INV.split('\n')) {
  const lm = ln.match(/^#+\s*(Atoms|Molecules|Organisms|Patterns)/i);
  if (lm) level = LEV[lm[1].toLowerCase()];
  const m = ln.match(/^\|\s*([^|]+?)\s*\|\s*`([^`]*\.css)`\s*\|/);
  if (!m || !level) continue;
  const file = basename(m[2]);
  if (seen.has(file)) continue;
  const p = ['design/system/components/', 'design/system/patterns/'].map(d => join(ROOT, d, file)).find(existsSync);
  if (!p) continue;
  seen.add(file);
  rows.push({ level, name: m[1].trim(), file, path: p, anchors: anchorsOf(p) });
}
const disk = [...readdirSync(join(ROOT, 'design/system/components')), ...readdirSync(join(ROOT, 'design/system/patterns'))]
  .filter(f => f.endsWith('.css'));
const missing = disk.filter(f => !seen.has(f));

const EXPR = `(() => { const s = new Set();
  document.querySelectorAll('body *').forEach(e => { if (e.classList) e.classList.forEach(c => s.add(c)); });
  return JSON.stringify([...s]); })()`;

const srv = await serve();
const l = await chrome('comp-width');
const conn = await Conn.open(l.wsUrl);
const corpus = pages('design').filter(p => !p.startsWith('kit/') && !p.startsWith('concept/') && p !== 'overview');
const worn = [];
for (const p of corpus) {
  const s = await newSession(conn);
  try { worn.push({ p, set: new Set(JSON.parse(await visit(conn, s.sessionId, `${srv.base}/design/${p}.html`, 1280, 900, EXPR, s.inflight))) }); }
  catch { } finally { await s.close?.(); }
}
l.stop(); srv.stop();

const noCat = new Set();
for (const r of rows) {
  const on = r.anchors.length ? worn.filter(w => r.anchors.some(a => w.set.has(a))) : [];
  r.screens = r.anchors.length ? on.length : null;
  let top = -1;
  for (const w of on) { const c = CAT[w.p]; if (c === undefined) { noCat.add(w.p); continue; } top = Math.max(top, RANK[c]); }
  r.top = top;
  const css = strip(readFileSync(r.path, 'utf8'));
  r.media = [...new Set([...css.matchAll(/@media[^{]*?(\d+)px/g)].map(m => +m[1]))].sort((a, b) => a - b);
  r.container = /@container/.test(css);
  r.fluid = /minmax\(|auto-fi|flex-wrap|aspect-ratio|width\s*:\s*\d+(\.\d+)?%/.test(css);
  r.box = /max-width|margin-inline|\d+ch\b/.test(css);
}

const LEVELS = ['atom', 'molecule', 'organism', 'pattern'];
if (MDOUT) {
  console.log('| level | component | file | screens | widest category | width today |');
  console.log('|---|---|---|---|---|---|');
  for (const lv of LEVELS) for (const r of rows.filter(x => x.level === lv).sort((a, b) => (b.screens ?? -1) - (a.screens ?? -1))) {
    const how = [r.media.length ? '`@media` ' + r.media.join(', ') : null, r.container ? '`@container`' : null,
      r.fluid ? 'fluid' : null, r.box ? 'container' : null].filter(Boolean).join(' · ') || 'nothing';
    const cat = r.screens === null ? 'no class of its own' : r.top >= 0 ? ['THE SAME', 'WIDER', 'NEW BEHAVIOUR'][r.top] : 'not worn';
    console.log(`| ${lv} | ${r.name} | \`${r.file}\` | ${r.screens === null ? '–' : r.screens} | ${cat} | ${how} |`);
  }
  process.exit(0);
}
for (const lv of LEVELS) {
  const set = rows.filter(r => r.level === lv);
  if (!set.length || (ONLY && ONLY !== lv)) continue;
  console.log(`\n--- ${lv} (${set.length}) ---`);
  console.log(`${'файл'.padEnd(24)} ${'екр'.padStart(4)} ${'найширша'.padEnd(16)} ${'@media сьогодні'.padEnd(22)} плинне контейнер`);
  for (const r of set.sort((a, b) => b.screens - a.screens))
    console.log(`${r.file.padEnd(24)} ${(r.screens === null ? '  ?' : String(r.screens)).padStart(4)} ` +
      `${(r.screens === null ? 'БЕЗ СВОГО КЛАСУ' : r.top >= 0 ? NAME[r.top] : 'НЕ СТОЇТЬ').padEnd(16)} ` +
      `${(r.media.join(',') || '-').padEnd(22)} ${(r.fluid ? 'так' : '-').padEnd(6)} ${r.box ? 'так' : '-'}${r.container ? ' @container' : ''}`);
}
const shown = ONLY ? rows.filter(r => r.level === ONLY) : rows;
const adapts = shown.filter(r => r.media.length || r.fluid || r.box || r.container).length;
console.log(`\nкорпус: ${worn.length} кольорових екранів у браузері  ·  без кольорового двійника: ${141 - worn.length} сірих (їх міряє dry-run.mjs)`);
console.log(`рядків: ${shown.length}  ·  адаптується сьогодні: ${adapts}  ·  не адаптується: ${shown.length - adapts}  ·  @container у системі: ${rows.filter(r => r.container).length}`);
const blind = rows.filter(r => r.screens === null);
console.log(`без власного класу, лічильник не відповідає: ${blind.length}${blind.length ? '  ' + blind.map(r => r.file).join(', ') : ''}`);
console.log(`файлів на диску без рядка: ${missing.length}${missing.length ? '  ' + missing.join(', ') : ''}`);
if (noCat.size) console.log(`кольорових екранів без рядка в аудиті: ${noCat.size}  ${[...noCat].join(', ')}`);
process.exit(missing.length || noCat.size ? 1 : 0);
