/* tools/typo.mjs - THE TYPOGRAPHIC CONTRACT, ASKED OF THE WHOLE CORPUS.

   THE HOLE THIS FILLS. `CLAUDE.md` says three dashes have three jobs and that
   U+2014 appears NOWHERE in project output, and one apostrophe form is allowed.
   Both rules were enforced - on RENDERED SCREENS, by `accept.mjs`, in a browser.
   That is where they were easy to check, not where the rule says. An em dash in
   an md, in a css comment, or inside a js string that renders on a page
   `accept.mjs` never opens was unasked for the whole project.

   It matters more than it sounds. Every md here is read by whoever builds next,
   and `docs/decisions.md` is the file the handoff stage reads as the record. A
   rule enforced on one surface out of four is a rule the corpus is slowly
   drifting away from in the three nobody looks at.

   WHAT IT ASKS. Every `.md`, `.css`, `.js`, `.mjs` and `.html` in the tree, minus
   what is not project output by KIND (see NOT_OUTPUT, itself checked):
     - U+2014 EM DASH, which belongs nowhere;
     - U+2019, U+2018 and U+02BC - the curly and modifier apostrophes. The
       product uses the ASCII one.

   THIS FILE CONTAINS NEITHER CHARACTER AS A LITERAL. Both are built from their
   code points, and every mention above is by NAME. A checker that has to declare
   itself as an exception has given itself the one mute nobody will ever question,
   and it stops being able to demonstrate the class on its own author.

   THE EXCEPTIONS CARRY A COUNT, NOT A PASS. Six files legitimately contain an em
   dash because the sentence is ABOUT the em dash - `CLAUDE.md` stating the rule,
   `accept.mjs` holding the character it searches for, `decisions.md` quoting the
   form it replaced. A file-level mute would then hide a real one added next to
   the quotation, which is the likeliest way this class ever returns. So each
   entry declares HOW MANY, and any change either way fails the run.

   WRONG VERSION: THE FIRST DRAFT SKIPPED `tools/`. The argument was that the
   instruments are not product. But `accept.mjs` holds the em dash as a literal it
   searches for, and skipping the folder means the one file that is guaranteed to
   contain the character is the one file never asked about it - so the check could
   never have been shown to work on its own author.
*/
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROOT } from './lib.mjs';

const EXT = ['.md', '.css', '.js', '.mjs', '.html'];
const SKIP_DIR = ['.git', 'node_modules'];

/* NOT PROJECT OUTPUT BY KIND, and the list is checked like every other list here:
   a folder named below that does not exist, or exists and holds nothing this
   check would have looked at, fails the run. */
const NOT_OUTPUT = [
  { dir: '.impeccable', why: 'the critique tool writes its own reports here - it is the instrument talking, not the project' },
];
/* `.playwright-mcp` WAS on that list and came straight back off it: the folder
   holds only .log, .png and .yml, none of which this check opens, so the entry
   covered nothing and the idle control said so on the first run. An exclusion for
   a folder that was never included is the cheapest kind of false coverage. */

const EM = String.fromCharCode(0x2014);
const APOS = new RegExp('[' + String.fromCharCode(0x2019, 0x2018, 0x02BC) + ']', 'g');

/* every entry is a CLAIM: this file holds exactly N of them, and every one is a
   quotation of the rule rather than a use of it */
const QUOTED = [
  { file: 'CLAUDE.md', em: 1, apos: 0, why: 'the rule itself, in «Language and typography»' },
  { file: 'tools/README.md', em: 1, apos: 0, why: 'the table of what accept.mjs asks each page' },
  { file: 'tools/accept.mjs', em: 1, apos: 0, why: 'the literal the browser check searches for' },
  { file: 'tools/grey-vars.mjs', em: 0, apos: 1, why: 'the character class of apostrophes the transform normalises' },
  { file: 'tools/inert.mjs', em: 0, apos: 1, why: 'the same character class' },
  { file: 'docs/decisions.md', em: 4, apos: 0, why: 'the record of the sweep that replaced 3 621 of them, quoting both candidates' },
  { file: 'docs/critique-alignment.md', em: 4, apos: 0, why: 'the named exception with its idle control, quoting the table-cell form' },
  { file: 'design/kit/docs/consolidation.md', em: 2, apos: 0, why: 'the same exception quoted where it was applied' },
];

const walk = (d, out = []) => {
  for (const e of readdirSync(join(ROOT, d), { withFileTypes: true })) {
    const p = d === '.' ? e.name : join(d, e.name);
    if (e.isDirectory()) { if (!SKIP_DIR.includes(e.name)) walk(p, out); }
    else if (EXT.some(x => e.name.endsWith(x))) out.push(p);
  }
  return out;
};

const all = walk('.');
const skipped = [];
const files = all.filter(f => {
  const hit = NOT_OUTPUT.find(n => f === n.dir || f.startsWith(n.dir + '/'));
  if (hit) { hit.hit = (hit.hit || 0) + 1; skipped.push(f); return false; }
  return true;
});

const bad = [];
const found = new Map();
for (const f of files) {
  const t = readFileSync(join(ROOT, f), 'utf8');
  const em = t.split(EM).length - 1;
  const apos = (t.match(APOS) || []).length;
  if (em || apos) found.set(f, { em, apos });
}
for (const [f, c] of found) {
  const q = QUOTED.find(x => x.file === f);
  if (!q) {
    if (c.em) bad.push(`${f}  ${c.em}x U+2014 - em dash не буває ніде в output проєкту, і цей файл не оголошений як цитата правила`);
    if (c.apos) bad.push(`${f}  ${c.apos}x кучерявий апостроф - у продукті одна форма, '`);
    continue;
  }
  q.hit = true;
  if (c.em !== q.em) bad.push(`${f}  оголошено ${q.em} цитат U+2014, у файлі ${c.em} - зміна в обидва боки це відмова: нову справжню тире додано поруч із цитатою, або цитата зникла`);
  if (c.apos !== q.apos) bad.push(`${f}  оголошено ${q.apos} апострофів, у файлі ${c.apos}`);
}
/* the idle control on both declared lists */
for (const q of QUOTED)
  if (!q.hit) bad.push(`${q.file}  оголошено як цитату правила (${q.em}x em dash, ${q.apos}x апостроф), а в файлі немає жодного - запис не покриває нічого`);
for (const n of NOT_OUTPUT)
  if (!n.hit) bad.push(`${n.dir}  оголошено «не output проєкту», а тека або відсутня, або не має жодного файла, який ця перевірка взагалі відкриває`);

if (bad.length) { console.log('\nТИПОГРАФІЧНИЙ КОНТРАКТ (' + bad.length + '):'); for (const x of bad) console.log('  ' + x); }
console.log(`\n${files.length} файлів output (${all.length} у дереві, ${skipped.length} не output за родом: ${NOT_OUTPUT.map(n => n.dir).join(', ')})`);
console.log(`U+2014: ${[...found.values()].reduce((a, c) => a + c.em, 0)} у ${[...found.values()].filter(c => c.em).length} файлах, усі оголошені цитати правила`);
console.log(`кучерявий апостроф: ${[...found.values()].reduce((a, c) => a + c.apos, 0)} у ${[...found.values()].filter(c => c.apos).length} файлах, усі оголошені`);
process.exit(bad.length ? 1 : 0);
