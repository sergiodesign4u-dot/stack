/* tools/inventory.mjs - IS THE PUBLISHED COUNT STILL TRUE?

   `design/kit/docs/inventory.md` is the registry of the component layer: three
   tables by level, a `Lines` column, and a paragraph at the foot that says «70
   components: 22 atoms, 27 molecules, 21 organisms». Every one of those numbers
   was measured once and typed in, and nothing has asked since. On 2026-08-16 the
   file listed **73** components against **84** on disk, carried two rows for
   files that no longer exist, and its own note about the gap named eight of the
   thirteen missing - the note had drifted too.

   That is backlog item 8 in one sentence: `vars.mjs` and `grey-vars.mjs` ask
   whether a VALUE is still true, `roles.mjs` asks whether a TOKEN LIST is still
   true, and nothing asked it of a COUNT.

   FIVE QUESTIONS, all of them answered from the files rather than from the file's
   own prose:

     A  every `design/system/components/*.css` has a row in a level table
     B  every row points at a file that exists          <- the idle control of A
     C  the row's `Lines` matches the file on disk
     D  the level table a row sits in matches the level the file declares in its
        own opening comment, `(level N)`
     E  the totals paragraph matches the tables it summarises

   AND THE SIXTH, behind a flag because it costs a browser:

     F  the `Screens` column - how many coloured screens actually carry the
        component. It cannot be grepped: a third of this product's markup is
        written by `wireframes/_nav.js` at load, so the question goes to the
        rendered DOM. A component's ANCHOR CLASSES are the ones its own file
        declares and no other component file does; a screen carries the component
        if at least one anchor renders on it. Ambiguous names - `.on`, `.ar`,
        `.tag` - are declared by several files and are excluded by that same rule,
        which is why the count is of anchors rather than of every class.

     node tools/inventory.mjs             coverage, Lines, level, totals
     node tools/inventory.mjs --screens   and the Screens column, in a browser

   Exit is non-zero on any finding, so it composes with the rest of the gate. */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, serve, chrome, pages } from './lib.mjs';
import { Conn, newSession, visit } from './cdp.mjs';

const SCREENS = process.argv.includes('--screens');
const SCREENS_QUIET = false;

const CDIR = join(ROOT, 'design/system/components');
const INV = join(ROOT, 'design/kit/docs/inventory.md');
const md = readFileSync(INV, 'utf8');
const files = readdirSync(CDIR).filter(f => f.endsWith('.css'));

/* the level a component declares about itself, from its first comment */
const levelOf = f => {
  const head = readFileSync(join(CDIR, f), 'utf8').slice(0, 400);
  const m = head.match(/\(level\s*(\d)\)/);
  return m ? Number(m[1]) : null;
};
const linesOf = f => readFileSync(join(CDIR, f), 'utf8').split('\n').length;

/* the three tables, keyed by the level their heading declares */
const SECTIONS = [...md.matchAll(/^## .*?\(level (\d)\)\s*$/gm)]
  .map(m => ({ level: Number(m[1]), at: m.index }));
if (SECTIONS.length !== 3) {
  console.log('НЕ ЗНАЙДЕНО ТРЬОХ ТАБЛИЦЬ РІВНІВ - файл змінив форму, перевірка не застосовна');
  process.exit(1);
}
const rows = [];
SECTIONS.forEach((s, i) => {
  const end = i + 1 < SECTIONS.length ? SECTIONS[i + 1].at : md.length;
  for (const line of md.slice(s.at, end).split('\n')) {
    if (!line.startsWith('| ') || !line.includes('.css`')) continue;
    const cells = line.split('|').map(x => x.trim());
    const file = (line.match(/`([a-z0-9-]+\.css)`/) || [])[1];
    if (!file) continue;
    /* `| Component | css file | Anchors | Screens | Lines |` - the two numeric
       columns are counted from the right, so a component name with a pipe in it
       cannot shift them. The Screens cell used to read `31 + **JS**`, and the
       annotation was there because the old count was a grep that could not see
       markup a script writes; the browser walk sees it, so the cell is now a
       plain number and a missing one reads as 0 rather than as «unknown». */
    const sc = (cells[cells.length - 3] || '').match(/^\d+/);
    rows.push({ file, level: s.level, lines: Number(cells[cells.length - 2]),
      screens: sc ? Number(sc[0]) : 0, raw: line });
  }
});

/* the totals paragraph */
const tot = md.match(/\*\*(\d+)\s+components:\s*(\d+)\s+atoms,\s*(\d+)\s+molecules,\s*(\d+)\s+organisms\.?\*\*/);

const seen = new Set(rows.map(r => r.file));
const noRow = files.filter(f => !seen.has(f));
const noFile = rows.filter(r => !files.includes(r.file));
const wrongLines = rows.filter(r => files.includes(r.file) && r.lines !== linesOf(r.file));
const wrongLevel = rows.filter(r => files.includes(r.file) && levelOf(r.file) !== null && levelOf(r.file) !== r.level);
const noLevelDeclared = files.filter(f => levelOf(f) === null);

const say = (title, list, fmt) => {
  if (!list.length) return;
  console.log('\n' + title + ' (' + list.length + '):');
  for (const x of list) console.log('  ' + fmt(x));
};
say('НЕМАЄ РЯДКА В ІНВЕНТАРІ', noRow, f => f.padEnd(24) + 'рівень ' + (levelOf(f) ?? '?') + ' · ' + linesOf(f) + ' рядків');
say('РЯДОК ПРО ФАЙЛ, ЯКОГО НЕМАЄ', noFile, r => r.file);
say('КОЛОНКА Lines РОЗІЙШЛАСЬ', wrongLines, r => r.file.padEnd(24) + 'у файлі ' + r.lines + ' · на диску ' + linesOf(r.file));
say('РІВЕНЬ РОЗІЙШОВСЯ З ТИМ, ЩО КОМПОНЕНТ КАЖЕ ПРО СЕБЕ', wrongLevel,
  r => r.file.padEnd(24) + 'у таблиці ' + r.level + ' · у файлі ' + levelOf(r.file));
say('КОМПОНЕНТ НЕ ОГОЛОШУЄ СВІЙ РІВЕНЬ', noLevelDeclared, f => f);

/* ---------- F: the Screens column, in a browser ---------- */
const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, '');
const classesOf = f => new Set([...strip(readFileSync(join(CDIR, f), 'utf8'))
  .matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map(m => m[1]));
const owners = {};
for (const f of files) for (const c of classesOf(f)) (owners[c] ||= []).push(f);
/* an ANCHOR is a class exactly one component file declares */
const anchorsOf = f => [...classesOf(f)].filter(c => owners[c].length === 1);

let wrongScreens = [], noAnchor = [];
if (SCREENS) {
  const EXPR = `(() => { var s = new Set();
    document.querySelectorAll('body *').forEach(function(e){
      if (e.classList) e.classList.forEach(function(c){ s.add(c); }); });
    return JSON.stringify([...s]); })()`;
  const srv = await serve();
  const l = await chrome('inv');
  const conn = await Conn.open(l.wsUrl);
  const corpus = pages('design').filter(p => !p.startsWith('kit/') && !p.startsWith('concept/'));
  const perScreen = [];
  for (const p of corpus) {
    const s = await newSession(conn);
    try { perScreen.push(new Set(JSON.parse(await visit(conn, s.sessionId,
      `${srv.base}/design/${p}.html`, 1280, 900, EXPR, s.inflight)))); }
    catch { } finally { await s.close(); }
  }
  l.stop(); srv.stop();
  const real = {};
  for (const f of files) {
    const a = anchorsOf(f);
    if (!a.length) { noAnchor.push(f); continue; }
    real[f] = perScreen.filter(set => a.some(c => set.has(c))).length;
  }
  wrongScreens = rows.filter(r => r.file in real && r.screens !== real[r.file])
    .map(r => ({ ...r, real: real[r.file] }));
  say('КОЛОНКА Screens РОЗІЙШЛАСЬ', wrongScreens,
    r => r.file.padEnd(24) + 'у файлі ' + r.screens + ' · зміряно ' + r.real +
      '  (' + perScreen.length + ' кольорових екранів)');
  /* A component whose every class is also declared elsewhere cannot be counted,
     and that is a finding about NAMING rather than a gap in the table - so it does
     not fail the run by itself. What fails is the pair going out of step: the cell
     for such a component must read `–` (the project's «no value» mark), and a `–`
     against a component that DOES have anchors is a stale exemption. Without that
     second half the dash would be a place to hide a number nobody wants to take. */
  const dashed = new Set(rows.filter(r => /^–/.test((r.raw.split('|').map(x => x.trim()))[4] || '')).map(r => r.file));
  const dashBad = [
    ...noAnchor.filter(f => !dashed.has(f)).map(f => [f, 'не має власних імен, а в колонці не «–»']),
    ...[...dashed].filter(f => !noAnchor.includes(f)).map(f => [f, 'у колонці «–», але власні імена є']),
  ];
  say('КОМПОНЕНТ БЕЗ ЖОДНОГО ВЛАСНОГО ІМЕНІ - рахувати нічим, у колонці «–»', noAnchor, f => f);
  say('ПРОЧЕРК І ДІЙСНІСТЬ РОЗІЙШЛИСЬ', dashBad, ([f, why]) => f.padEnd(24) + why);
  noAnchor = dashBad;
  if (!SCREENS_QUIET) console.log('\nзміряно по ' + perScreen.length + ' кольорових екранах');
}

/* ---------- G: the same claim in its second place ----------
   `design/kit/kit.html` is the FROZEN smoke test of stage 07 and publishes the
   same triple in prose. Frozen is a decision about the page, not a licence for a
   number to be wrong: CLAUDE.md's «md is alive, html does not freeze» allows a
   visible «updated after publication» block instead of a rebuild, and this asks
   that the block exists and carries today's numbers. One claim in two places is
   how this whole item started. */
const KIT = join(ROOT, 'design/kit/kit.html');
const kitHtml = readFileSync(KIT, 'utf8');

const counts = [1, 2, 3].map(l => rows.filter(r => r.level === l).length);
let totalsBad = null;
if (!tot) totalsBad = 'абзацу підсумків не знайдено';
else {
  const said = [Number(tot[2]), Number(tot[3]), Number(tot[4])];
  const bad = said.some((n, i) => n !== counts[i]) || Number(tot[1]) !== rows.length;
  if (bad) totalsBad = 'сказано ' + tot[1] + ' (' + said.join('/') + '), у таблицях ' +
    rows.length + ' (' + counts.join('/') + ')';
}
if (totalsBad) console.log('\nПІДСУМКОВИЙ АБЗАЦ РОЗІЙШОВСЯ З ТАБЛИЦЯМИ:\n  ' + totalsBad);

/* `\w` is ASCII-only in JavaScript, so a Cyrillic ending has to be spelled out -
   the first writing of this line failed on «організми» and reported a page that
   was in fact correct, which is the one failure mode an instrument may not have. */
const UK = '[\\u0400-\\u04FF]*';
const want = new RegExp('<b>' + rows.length + ' компонент' + UK + ':\\s*' + counts[0] +
  ' атом' + UK + ',\\s*' + counts[1] + ' молекул' + UK + ',\\s*' + counts[2] +
  ' організм' + UK + '</b>');
const kitBad = want.test(kitHtml) ? null :
  'kit.html не несе сьогоднішнього числа ' + rows.length + ' (' + counts.join('/') + ')';
if (kitBad) console.log('\nДРУГЕ МІСЦЕ ТОГО САМОГО ТВЕРДЖЕННЯ:\n  ' + kitBad);

console.log('\n' + files.length + ' файлів компонентів · рядків у таблицях: ' + rows.length +
  ' (' + counts.join('/') + ')' +
  ' · без рядка: ' + noRow.length + ' · рядок без файла: ' + noFile.length +
  ' · Lines розійшлось: ' + wrongLines.length + ' · рівень розійшовся: ' + wrongLevel.length +
  ' · без рівня у файлі: ' + noLevelDeclared.length);
console.log(SCREENS ? 'колонка Screens зміряна в браузері' :
  'колонка Screens НЕ перевірена - потрібен прапорець --screens (обхід корпусу браузером)');

process.exit(noRow.length || noFile.length || wrongLines.length || wrongLevel.length ||
  noLevelDeclared.length || totalsBad || kitBad || wrongScreens.length || noAnchor.length ? 1 : 0);
