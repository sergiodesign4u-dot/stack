/* tools/dupe.mjs - THE SAME DECLARATION BLOCK, WRITTEN TWICE.

   THE QUESTION. A design system's whole claim is that a shape is decided once.
   The way that claim dies is not a big refactor, it is one honest copy: somebody
   needs the visually-hidden pattern in a second place, writes the five
   declarations again because CSS has no way to share them, and leaves a comment
   saying «= .vh». The comment is true the day it is written. Nothing then asks
   whether the two blocks are still equal, and the third copy reads the second as
   precedent rather than the first - which is exactly what happened here: the
   pattern reached `menu.css`, then `header.css`, then an inline `style=` on
   `checkout.html` that was not even a correct copy (`clip: rect(0 0 0 0)`, the
   deprecated form, with `padding`, `margin` and `border` missing).

   WHAT IT ASKS. Every rule in `design/system/` is reduced to its declarations,
   normalised and sorted, so that order and whitespace cannot hide an equality.
   Any block of MIN_DECLS or more that appears in two different files is a
   duplicate and must be declared below, with the reason CSS could not share it.

   BOTH DIRECTIONS, because either alone is half a check:
     - a duplicate with no entry is an undeclared second edition;
     - an entry whose repeat no longer exists covers nothing;
     - an entry whose repeat has DRIFTED from the original is the failure the
       whole check is for - the two blocks were equal once and the comment still
       says so.

   WRONG VERSION 1: IT COMPARED WHOLE RULE TEXTS. Two rules that differ only in a
   trailing comment, or in the order of `padding` and `margin`, are the same
   decision written twice, and comparing text answered «different» for both.
   Normalising to a sorted set of `prop:value` pairs is the only comparison whose
   two sides differ in nothing but the thing being measured.

   WRONG VERSION 2: THE FLOOR WAS TWO DECLARATIONS. That made every
   `display:flex; align-items:center` in the system a finding - 200+ of them, all
   correct, because a two-declaration idiom is not a shared decision, it is a
   sentence in the language. The floor is four: below that a repeat is cheaper to
   read than to name.

   node tools/dupe.mjs            the check
   node tools/dupe.mjs --all      also print every declared repeat and its status
*/
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROOT } from './lib.mjs';

const VERBOSE = process.argv.includes('--all');
/* TWO FLOORS, AND THE SECOND ONE IS WHY THE CHECK IS USABLE. Everything from
   MIN_DECLS up is REPORTED, so nothing is hidden behind a threshold. Only
   FAIL_DECLS and up FAILS the run. A four-declaration repeat is usually an idiom
   of the language rather than a shared decision - `color; font-size; line-height;
   margin` says nothing about a component - and a gate that fails on 81 correct
   idioms is a gate somebody mutes in a week. From six declarations up the two
   blocks are the same OBJECT written twice, and that is a decision somebody has
   to have made. */
const MIN_DECLS = 4;
const FAIL_DECLS = 6;

/* THE DECLARED REPEATS. Each one names WHY plain CSS could not share the block.
   An entry that stops matching, or whose repeat drifts from its original, fails
   the run - the list is not a mute button, it is a set of claims under test. */
const ALLOWED = [
  { sites: [['base.css', '.vh'],
            ['components/header.css', '.wfh-actions .wfh-act .lbl,.wfh-actions .wfh-act .cap']],
    why: 'the hiding is CONDITIONAL - inside @container (max-width: 63rem) and nowhere else. CSS cannot '
       + 'apply a class conditionally, so no markup class can express it and the block is repeated' },
  { sites: [['components/coach-clients.css', '.coach .oc-ph'],
            ['components/coach-session.css', '.coach .qa-ph']],
    why: 'ONE OBJECT UNDER TWO NAMES - the square product-photo frame of step 7.68. Extraction is a '
       + 'component decision, not a repair: it needs a css file, a stand page, a registry row, an '
       + 'inventory row and an @import in its level group. Recorded in backlog.md, section «Six blocks the system writes twice»' },
  { sites: [['components/coach-order.css', '.coach .od-ph'],
            ['components/coach-session.css', '.coach .cl-ph']],
    why: 'the same square photo frame at the larger of its two sizes. Same decision, same backlog section' },
  { sites: [['components/checkout-form.css', '.co-logo::before'],
            ['components/header.css', '.wfh-logo::before']],
    why: 'the wordmark. Checkout deliberately draws its own, because the checkout header is a REDUCED '
       + 'header - it carries no nav, no search and no actions - and reaching into header.css for one '
       + 'glyph would make the reduced header depend on the full one' },
  { sites: [['components/city-dialog.css', '.city-lbl'],
            ['components/nav-drawer.css', '.dr-lbl']],
    why: 'the section label of a mobile panel. Two panels, two files, one shape - and a shared label '
       + 'atom is the honest fix. Recorded in backlog.md, section «Six blocks the system writes twice»' },
  { sites: [['components/footer.css', '.wff-col h4'],
            ['components/header.css', '.wfh-mega .mgt'],
            ['components/info-page.css', '.info-toc .tt']],
    why: 'the column heading of a link list - in the footer, in the mega menu, and since 12.2 over the '
       + 'numbered index of a service page. THE THIRD SITE IS WHY THIS ENTRY IS WORTH MORE THAN A MUTE: '
       + 'the pair was declared when it was a pair, `info-page.css` arrived at batch 3 and the group grew '
       + 'under it, and this check said so on the next run instead of staying green. Three identical '
       + 'blocks is where a caps-label atom stops being a preference - recorded in backlog.md, section '
       + '«Six blocks the system writes twice»' },
];

const walk = (d, out = []) => {
  for (const e of readdirSync(join(ROOT, d), { withFileTypes: true }))
    e.isDirectory() ? walk(join(d, e.name), out) : e.name.endsWith('.css') && out.push(join(d, e.name));
  return out;
};
const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, m => '\n'.repeat((m.match(/\n/g) || []).length));
const lineOf = (s, i) => s.slice(0, i).split('\n').length;

/* a block is its declarations, normalised: lower-cased property, whitespace
   collapsed inside the value, sorted, joined. Nothing else survives. */
const normalise = body => {
  const decls = body.split(';').map(d => d.trim()).filter(Boolean)
    .map(d => {
      const c = d.indexOf(':');
      if (c === -1) return null;
      return d.slice(0, c).trim().toLowerCase() + ':' + d.slice(c + 1).trim().replace(/\s+/g, ' ');
    }).filter(Boolean);
  return { key: [...decls].sort().join(';'), n: decls.length };
};

const blocks = [];
for (const f of walk('design/system')) {
  const src = strip(readFileSync(join(ROOT, f), 'utf8'));
  /* top-level and nested rules alike: any `selector { declarations }` whose body
     holds no nested brace. An at-rule's own body is skipped by that test and its
     children are matched on their own, which is what we want - the header's
     repeat lives inside a container query. */
  for (const m of src.matchAll(/([^{}@][^{}]*?)\{([^{}]*)\}/g)) {
    const sel = m[1].trim().replace(/\s*\n\s*/g, '').replace(/\s*,\s*/g, ',');
    if (!sel || sel.startsWith('@')) continue;
    const { key, n } = normalise(m[2]);
    if (n < MIN_DECLS) continue;
    blocks.push({ file: relative(join(ROOT, 'design/system'), join(ROOT, f)), sel, key, n, ln: lineOf(src, m.index) });
  }
}

const byKey = new Map();
for (const b of blocks) { if (!byKey.has(b.key)) byKey.set(b.key, []); byKey.get(b.key).push(b); }

const bad = [];
const census = [];
for (const [key, list] of byKey) {
  const files = new Set(list.map(b => b.file));
  if (files.size < 2) continue;
  const n = list[0].n;
  const entry = ALLOWED.find(a => a.sites.some(([f, s]) => list.some(b => b.file === f && b.sel === s)));
  if (entry) {
    entry.key = key;
    entry.found = a => 0;
    entry.hits = entry.sites.map(([f, s]) => list.find(b => b.file === f && b.sel === s) || null);
    /* a declared group must cover EVERY site the duplicate actually has - a repeat
       that grew a third home is not the group that was declared */
    const undeclared = list.filter(b => !entry.sites.some(([f, s]) => f === b.file && s === b.sel));
    for (const b of undeclared)
      bad.push(`${b.file}:${b.ln}  ${b.sel}  - оголошена група виросла: цей сайт у ній не названий`);
    continue;
  }
  if (n >= FAIL_DECLS) {
    for (const b of list)
      bad.push(`${b.file}:${b.ln}  ${b.sel}  (${n} оголошень)  - той самий блок стоїть у `
        + list.filter(x => x !== b).map(x => `${x.file}:${x.ln}`).join(', ') + '  · незадекларована друга редакція');
  } else {
    census.push({ n, sites: list.map(b => `${b.file}:${b.ln} ${b.sel}`) });
  }
}

/* the idle control and the drift control, on the same declared list */
for (const a of ALLOWED) {
  if (!a.hits) { bad.push(`оголошена група [${a.sites.map(s => s.join(' ')).join(' | ')}] не знайшлась як однаковий блок - `
    + 'або сайт зник, або блоки РОЗІЙШЛИСЬ і коментар про рівність уже неправдивий'); continue; }
  a.hits.forEach((h, i) => { if (!h) bad.push(`${a.sites[i].join(' ')} - оголошений сайт групи більше не існує: запис не покриває нічого`); });
}

if (bad.length) { console.log('\nПОВТОРЕНИЙ БЛОК ОГОЛОШЕНЬ (' + bad.length + '):'); for (const x of bad) console.log('  ' + x); }
if (VERBOSE || !bad.length) {
  console.log(`\nоголошені групи (${ALLOWED.length}), кожна перевірена на існування кожного сайта і на рівність блоків:`);
  for (const a of ALLOWED)
    console.log(`  ${a.sites.map(s => s.join(' ')).join('  =  ')}\n    ${a.hits && a.hits.every(Boolean) ? 'рівні' : 'НЕ ПІДТВЕРДЖЕНО'} - ${a.why}`);
}
const idiom = census.reduce((s, c) => s + c.sites.length, 0);
console.log(`\nповторів від ${MIN_DECLS} до ${FAIL_DECLS - 1} оголошень: ${census.length} груп, ${idiom} місць - `
  + 'це ідіоми мови, не спільні рішення, і вони не валять прогін. Список: node tools/dupe.mjs --census');
if (process.argv.includes('--census'))
  for (const c of census.sort((a, b) => b.n - a.n)) console.log(`  ${c.n}  ${c.sites.join('  =  ')}`);
console.log(`\n${blocks.length} блоків від ${MIN_DECLS} оголошень у ${new Set(blocks.map(b => b.file)).size} файлах системи · `
  + `однакових у різних файлах: ${[...byKey.values()].filter(l => new Set(l.map(b => b.file)).size > 1).length} · `
  + `валять прогін: ${bad.length}`);
process.exit(bad.length ? 1 : 0);
