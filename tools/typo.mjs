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
import { execFileSync } from 'node:child_process';
import { join, relative } from 'node:path';
import { ROOT } from './lib.mjs';

/* 12.10 - `.py` JOINED THE LIST, AND THE LIST LEARNED TO REPORT WHAT IT DOES
   NOT OPEN. One Python instrument lives in `tools/`, and for the whole project
   this check never opened it: `key-alpha.py` printed the word «myakyi» with a
   MODIFIER LETTER apostrophe (U+02BC) in a line a person reads on every run,
   and the verdict said «усі оголошені» in the same breath. The character is
   named here by its code point and not quoted: a comment that had to be added
   to the exception list below, purely so this file could describe the character
   it bans, would be an exception bought with nothing. The rule about instruments
   is already settled - `.mjs` is in this list because a tool is read by whoever
   builds - and `.py` is the same kind of file in a different language.

   THE DEEPER DEFECT WAS NOT THE MISSING EXTENSION, IT WAS THE SILENCE. A list
   of kinds is a declared list like any other here, and this one could shrink
   the corpus without saying so: the run printed «741 у дереві» as if that were
   the tree. It was the tree AS THIS LIST SEES IT. Now every kind present and
   not opened is counted and printed, so the next kind that lands is visible the
   day it lands instead of on the day somebody greps by hand.

   `.yml` STAYS OUT, and the reason is the one already written below about
   `.playwright-mcp`: those files are a browser tool's own page snapshots, not
   project output, and they hold hundreds of em dashes because the PAGES they
   snapshot are other people's. Opening them would move the report from «13
   quoted» to «hundreds», and every one of those would be noise. */
const EXT = ['.md', '.css', '.js', '.mjs', '.html', '.py'];
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
  { file: 'docs/decisions.md', em: 4, apos: 1, why: 'the record of the sweep that replaced 3 621 of them, quoting both candidates; the one curly apostrophe is 11.4 naming the character it removed' },
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

/* the same walk, asked the OTHER way: what is in the tree that EXT never opens */
const kindsSkipped = new Map();
(function kinds(d) {
  for (const e of readdirSync(join(ROOT, d), { withFileTypes: true })) {
    const p = d === '.' ? e.name : join(d, e.name);
    if (e.isDirectory()) { if (!SKIP_DIR.includes(e.name)) kinds(p); continue; }
    if (EXT.some(x => e.name.endsWith(x))) continue;
    const dot = e.name.lastIndexOf('.');
    const k = dot > 0 ? e.name.slice(dot) : '(без розширення)';
    kindsSkipped.set(k, (kindsSkipped.get(k) || 0) + 1);
  }
})('.');

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
/* ===========================================================================
   THE PARSE GATE - the half this file owed and did not have.

   The apostrophe rule above is a rule about TEXT, and this checker enforces it
   over `.js` and `.mjs` as well. In those two kinds the ASCII apostrophe is not
   a neutral character: inside a single-quoted string it CLOSES the string. A
   blanket replacement therefore has a way of leaving the text rule perfectly
   satisfied and the file unable to run, and nothing here asked the second
   question.

   It is not hypothetical. `tools/dry-run.mjs` shipped that way and stayed broken
   through two stages: `сім'ях` and `ім'я` on two console.log lines, this checker
   green on it every single run, and the instrument itself dead - the whole
   stage-12 entry gate asks it a question it could not answer. `width-sweep.mjs`
   took the same wound at 10.7 and was caught only because it was being written
   at the time.

   So: every executable kind this check opens must still PARSE. `node --check`
   is the authority rather than a regex, because the thing being asked is exactly
   «does the engine accept this», and a regex that approximates the engine would
   be a second grammar to keep in step.

   12.10: AND THE GATE MUST COVER EVERY KIND THE TEXT RULE REWRITES, NOT THE TWO
   IT WAS WRITTEN FOR. `.py` joined `EXT` at 12.10 so the checker would finally
   open `tools/key-alpha.py`; the parse gate still filtered for `.js` and `.mjs`,
   so the very next thing that happened was the author normalising an apostrophe
   inside a single-quoted Python string and breaking the file - the exact wound
   this gate exists to prevent, taken through the door the gate does not watch.
   The list of parsed kinds is now derived from `EXT` rather than typed beside
   it, so a kind added above can never arrive unguarded again.

   The gate carries its own idle control. A rule that covers nothing fails as
   loudly as a broken file: if the walk opened no script at all, the exclusion
   list or the extension list has moved underneath it. */
const PARSERS = {
  '.js':  f => execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' }),
  '.mjs': f => execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' }),
  '.py':  f => execFileSync('python3', ['-c', 'import ast,io,sys; ast.parse(io.open(sys.argv[1],encoding="utf-8").read())', f], { stdio: 'pipe' }),
};
const parsedExt = EXT.filter(x => PARSERS[x]);
const unguarded = EXT.filter(x => !PARSERS[x] && !['.md', '.css', '.html'].includes(x));
if (unguarded.length)
  bad.push(`гейт парсингу не має парсера для ${unguarded.join(' ')} - розширення додали в EXT, а правило про апостроф уже переписує ці файли`);
const scripts = files.filter(f => parsedExt.some(x => f.endsWith(x)));
for (const f of scripts) {
  const ext = parsedExt.find(x => f.endsWith(x));
  try { PARSERS[ext](join(ROOT, f)); }
  catch (e) {
    const msg = String(e.stderr || e.message).split('\n').filter(l => /Error/.test(l)).pop() || 'не парситься';
    bad.push(`${f}  НЕ ПАРСИТЬСЯ: ${msg.trim()} - правило про апостроф виконане, а файл не запускається`);
  }
}
if (!scripts.length)
  bad.push('гейт парсингу не відкрив жодного скрипта - або список розширень, або список винятків змінився');

/* the idle control on both declared lists */
for (const q of QUOTED)
  if (!q.hit) bad.push(`${q.file}  оголошено як цитату правила (${q.em}x em dash, ${q.apos}x апостроф), а в файлі немає жодного - запис не покриває нічого`);
for (const n of NOT_OUTPUT)
  if (!n.hit) bad.push(`${n.dir}  оголошено «не output проєкту», а тека або відсутня, або не має жодного файла, який ця перевірка взагалі відкриває`);

if (bad.length) { console.log('\nТИПОГРАФІЧНИЙ КОНТРАКТ (' + bad.length + '):'); for (const x of bad) console.log('  ' + x); }
console.log(`\n${files.length} файлів output (у дереві ${all.length} файлів цих розширень: ${EXT.join(' ')}, ${skipped.length} не output за родом: ${NOT_OUTPUT.map(n => n.dir).join(', ')})`);
console.log('  НЕ ВІДКРИВАЄМО ЗА РОДОМ ФАЙЛА: ' + [...kindsSkipped.entries()].sort((a, b) => b[1] - a[1])
  .map(([k, n]) => k + ' ' + n).join(' · ') + '  - список розширень це теж оголошений список, і мовчазний він рівно доти, доки не з\'явиться новий рід');
/* 12.9: THE SUMMARY SAID «усі оголошені» WHATEVER THE RUN HAD JUST FOUND, and
   it printed that sentence in the same breath as a per-file line naming an
   UNdeclared file. Five times in one stage the author read the green summary,
   believed it, and shipped a curly apostrophe that `accept.mjs` then caught in a
   browser two steps later. A verdict that cannot say «no» is not a verdict, and
   a run whose last line contradicts its own findings trains the reader to stop
   reading the ones above it. The count now names how many of the files carrying
   the mark are actually declared, and says so only when it is true. */
const undeclEm = bad.filter(b => /U\+2014/.test(b)).length;
const undeclAp = bad.filter(b => /кучерявий апостроф/.test(b)).length;
console.log(`U+2014: ${[...found.values()].reduce((a, c) => a + c.em, 0)} у ${[...found.values()].filter(c => c.em).length} файлах` +
  (undeclEm ? ` - і ${undeclEm} з них НЕ оголошені, див. вище` : ', усі оголошені цитати правила'));
console.log(`парситься: ${scripts.length} ${parsedExt.join('/')}, усі` + (bad.some(b => /НЕ ПАРСИТЬСЯ/.test(b)) ? ' - НІ, див. вище' : ''));
console.log(`кучерявий апостроф: ${[...found.values()].reduce((a, c) => a + c.apos, 0)} у ${[...found.values()].filter(c => c.apos).length} файлах` +
  (undeclAp ? ` - і ${undeclAp} з них НЕ оголошені, див. вище` : ', усі оголошені'));
process.exit(bad.length ? 1 : 0);
