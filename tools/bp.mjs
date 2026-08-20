/* tools/bp.mjs - the twelfth check: every width the product asks about is a width
   the registry names, and no screen file asks at all.

   THE QUESTION. Stage 10 puts two points in `tokens.css` and then cannot use them:
   `@media (min-width: var(--bp-shell-wide))` does not work, because a media query is
   evaluated before the cascade of custom properties. There is no error - the rule
   simply never fires. So the query has to carry the literal, and the moment it does,
   the token stops being the only source and becomes a source plus a promise. This
   file is what turns the promise back into a source: the registry is READ OUT of
   `tokens.css`, and every `@media` in the product is asked to give one of its numbers.

   AND THE SECOND CLASS IS THE EXPENSIVE ONE. A screen file with its own `@media`
   works, is local, and fails nothing - until stage 12 assembles the rest of the
   product and twenty subagents each invent a number, which is how inline CSS
   scattered at stage 04. It cannot be caught by looking at the rendering, because
   the rendering is correct. It is caught here or not at all.

   WRONG VERSION 1: IT COUNTED FOUR DOCUMENTS AS SCREENS. The first run reported
   eight failures and every one was on `design/concept/concept`, `concept/directions`,
   `concept/logo` or `design/overview` - the three presentation pages of stage 06 and
   the folder hub. They are not product screens and they carry no system class;
   `dead-sel.mjs` and `theme.mjs` both name the same four out loud and for the same
   reason. An instrument that treats a presentation page as a screen reports drift
   that does not exist, and after the second such report a reader stops looking.

   WHAT COUNTS AS A SCREEN FILE. Anything under `design/` that is not
   `design/system/**` and not the stand: a `<style>` block inside `design/*.html`,
   or a stylesheet a screen loads directly. `design/_stand.css` and `design/kit/**`
   are the STAND - they are not the product and they are allowed their own queries,
   which is stated rather than assumed, and the count of what was excused is printed.

   THE MIRROR IS PART OF THE NUMBER. A point at 620 is written `min-width: 620` on
   one side and `max-width: 619` on the other; both are the same decision. 619 and
   859 pass, 621 and 861 do not.

   EVERY DECLARED EXCEPTION IS ITSELF CHECKED. `EXCUSED` below names the numbers
   that are deliberately not on the registry yet and why. An entry that matches
   nothing fails the run exactly as loudly as an undeclared number: a list nobody
   maintains is worse than no list, because it reads as coverage.

   node tools/bp.mjs            every query, product and stand alike
   node tools/bp.mjs --all      also print the queries that pass                   */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { ROOT } from './lib.mjs';

const VERBOSE = process.argv.includes('--all');

/* the registry, read out of the file that owns it */
const TOK = readFileSync(join(ROOT, 'design/system/tokens.css'), 'utf8');
const POINTS = {};
for (const m of TOK.matchAll(/--(bp-[a-z0-9-]+):\s*([\d.]+)rem/g)) POINTS[m[1]] = Math.round(parseFloat(m[2]) * 16);
const NUMS = Object.values(POINTS);
if (!NUMS.length) { console.error('реєстр точок не прочитався з tokens.css'); process.exit(2); }
const OK = new Set([...NUMS, ...NUMS.map(n => n - 1)]);

/* the declared absences, each with a reason and each checked for being real */
/* the three presentation pages of stage 06 plus the folder hub. They are not the
   product and hold no system class - the same four `dead-sel.mjs` and `theme.mjs`
   name. Checked below for being real, like every other declared list here. */
const NOT_PRODUCT = ['design/concept/concept.html', 'design/concept/directions.html',
  'design/concept/logo.html', 'design/overview.html'];
const notProductHit = new Set();

/* 10.5 CLOSED THE ONLY TWO ENTRIES THIS LIST EVER HELD, and the idle control is
   what said so: the moment step 5 folded `coach-session`'s 939/940 onto the shell
   point, the run failed with «оголошений виняток не покриває нічого». That is the
   check working, not breaking - a list that keeps naming numbers nobody writes any
   more reads as coverage and is worse than no list. The entries are removed rather
   than commented out; the record of why they existed is in `responsive.md` and in
   `docs/decisions.md`, which is where history lives.
   The array stays, empty, because the next stage will owe it something. */
const EXCUSED = [];

const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, m => '\n'.repeat((m.match(/\n/g) || []).length));
const lineOf = (s, i) => s.slice(0, i).split('\n').length;

/* every place the product can hold a query */
const walk = (d, out = []) => {
  for (const e of readdirSync(join(ROOT, d), { withFileTypes: true })) {
    if (e.isDirectory()) walk(d + '/' + e.name, out);
    else out.push(d + '/' + e.name);
  }
  return out;
};
const files = walk('design').filter(f => /\.(css|html)$/.test(f));
const isSystem = f => f.startsWith('design/system/');
const isStand = f => f.startsWith('design/kit/') || f === 'design/_stand.css' || f === 'design/_nav.css';

const bad = [], seenNums = new Set(), passed = [];
let standQ = 0, varQ = 0, screenQ = 0;

for (const f of files) {
  const raw = readFileSync(join(ROOT, f), 'utf8');
  /* in an html file only what is inside a <style> block is css */
  const chunks = f.endsWith('.html')
    ? [...raw.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => ({ text: m[1], off: m.index }))
    : [{ text: raw, off: 0 }];
  for (const c of chunks) {
    const css = strip(c.text);
    for (const m of css.matchAll(/@media([^{]*)\{/g)) {
      const cond = m[1];
      const ln = lineOf(c.text, m.index);
      if (/var\(/.test(cond)) {
        varQ++;
        bad.push({ f, ln, why: '`var()` у медіазапиті - правило не спрацює НІКОЛИ і помилки не буде', txt: cond.trim() });
        continue;
      }
      const nums = [...cond.matchAll(/(\d+)px/g)].map(x => +x[1]);
      if (!nums.length) continue;                       // print, hover, orientation - not our subject
      if (isStand(f)) { standQ += nums.length; continue; }
      if (NOT_PRODUCT.includes(f)) { notProductHit.add(f); continue; }
      if (!isSystem(f)) {
        screenQ += nums.length;
        bad.push({ f, ln, why: 'ФАЙЛ ЕКРАНА НЕСЕ @media - адаптація живе в токені, компоненті, патерні або оболонці', txt: cond.trim() });
        continue;
      }
      for (const n of nums) {
        seenNums.add(n);
        if (OK.has(n)) { passed.push({ f, ln, n }); continue; }
        const ex = EXCUSED.find(e => e.n === n && basename(f) === e.file);
        if (ex) { ex.hit = (ex.hit || 0) + 1; continue; }
        bad.push({ f, ln, why: `число ${n} немає в реєстрі точок`, txt: cond.trim() });
      }
    }
  }
}

/* @container without a container-type declared anywhere is the same silent class */
const sysCss = walk('design/system').filter(f => f.endsWith('.css'));
const hasType = sysCss.some(f => /container-type\s*:/.test(strip(readFileSync(join(ROOT, f), 'utf8'))));
const containerUsers = sysCss.filter(f => /@container/.test(strip(readFileSync(join(ROOT, f), 'utf8'))));
if (containerUsers.length && !hasType)
  bad.push({ f: containerUsers.join(', '), ln: 0, why: '@container без жодного оголошеного container-type - компонент тихо завжди виглядає як у широкому місці', txt: '' });

for (const f of NOT_PRODUCT) {
  if (!existsSync(join(ROOT, f)))
    bad.push({ f, ln: 0, why: 'оголошено «не продукт», а файла немає - список показує покриття, якого нема', txt: '' });
  else if (!notProductHit.has(f))
    bad.push({ f, ln: 0, why: 'оголошено «не продукт», але жодного @media не несе - запис не покриває нічого', txt: '' });
}
const idle = EXCUSED.filter(e => !e.hit);
for (const e of idle) bad.push({ f: e.file, ln: 0, why: `оголошений виняток ${e.n} не покриває нічого - список, що читається як покриття`, txt: '' });

console.log(`\nреєстр із tokens.css: ` + Object.entries(POINTS).map(([k, v]) => `--${k} = ${v} (дзеркало ${v - 1})`).join(' · '));
console.log(`файлів переглянуто: ${files.length} · запитів у системі: ${passed.length + bad.length} · у стенді, і це не предмет: ${standQ}`);
console.log(`не продукт за родом (${NOT_PRODUCT.length}), і кожен перевірений: ` +
  NOT_PRODUCT.map(f => basename(f) + (notProductHit.has(f) ? '' : ' НЕ ЗУСТРІВСЯ')).join(' · '));
if (EXCUSED.length) {
  console.log(`\nоголошені винятки (${EXCUSED.length}), кожен перевірений на те, що він реальний:`);
  for (const e of EXCUSED) console.log(`  ${e.n}  ${e.file}  ${e.hit ? 'зустрівся ' + e.hit + 'x' : 'НЕ ЗУСТРІВСЯ'}  - ${e.why}`);
}
if (VERBOSE) for (const p of passed) console.log(`  ok  ${p.f}:${p.ln}  ${p.n}`);
if (bad.length) {
  console.log(`\nПРОВАЛИ (${bad.length}):`);
  for (const b of bad) console.log(`  ${b.f}${b.ln ? ':' + b.ln : ''}\n      ${b.why}${b.txt ? '\n      ' + b.txt : ''}`);
} else {
  console.log(`\nчисто: кожен @media продукту дає число реєстру, жоден файл екрана не несе запиту, жодного var() у запиті`);
}
process.exit(bad.length ? 1 : 0);
