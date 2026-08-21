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

   The seventh, G, is announced at its own place below rather than here: the
   frozen `kit.html` carries the same totals in prose, and one claim in two places
   is how this whole item started.

   AND THE EIGHTH, ADDED AT STEP 8.43, WHICH IS THE SAME QUESTION ASKED OF THE
   PLACE A PERSON ACTUALLY READS:

     H  the `kp-meta` strip of every `design/kit/<component>.html`. The registry
        is one copy of «how big is this component»; the stand page is a SECOND,
        and the second copy is the one that drifts. Measured on 2026-08-17, over
        the 75 stand pages that name a component file: **53** wrong line counts,
        **40** wrong selector counts, **19** wrong declaration counts, **37**
        wrong screen counts. Level: **0**, which is what makes the other four
        readable as findings rather than as a broken parser.

        THE VOCABULARY IS READ OFF THE PAGES, NOT INVENTED. `loyalty-rung.html`
        publishes «49 селекторів · 61 правило» and its file measures 67 selectors
        and exactly 61 rules, so the stand already distinguishes the two words and
        this check keeps that distinction: a selector is one comma-separated
        member of a rule head at any nesting depth, a rule is one block.
        `pdp-tabs.html` fixes the other two: 85 lines and 102 declarations, both
        exact today, against a selector count that is not.

        A NUMERIC TAG WHOSE NOUN IS NOT IN THAT VOCABULARY IS REPORTED AS NOT
        REACHED, never passed over. «106 екземплярів», «470 лічильників», «36
        карток» are corpus counts that need a browser and a different question;
        they are listed so the coverage of this check is visible rather than
        assumed.

        AND THE AGREEMENT IS CHECKED WITH THE NUMBER, because these tags are
        render text in Ukrainian and a count that changes changes the ending:
        1 -> рядок, 2-4 -> рядки, 5+ -> рядків, with 11-14 taking the last form
        against the last digit. `button.html` ships «461 рядків» and `chip.html`
        «261 рядків», both of which want «рядок»; `breadcrumb.html` ships «22
        екранів», which wants «екрани».

     node tools/inventory.mjs             coverage, Lines, level, totals, meta
     node tools/inventory.mjs --screens   and the Screens column, in a browser
     node tools/inventory.mjs --measure <component>
       the strip ONE stand page should carry, printed before the page exists.
       Same `measure`, same endings, so a page is written from the file rather
       than from memory and question H has nothing left to catch.
     node tools/inventory.mjs --apply     rewrite every wrong meta number, with
       the ending the new number takes. Writes nothing else, ever - the registry
       and the totals are decisions with prose around them and are fixed by hand.

   Exit is non-zero on any finding, so it composes with the rest of the gate. */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, serve, chrome, pages, topRules } from './lib.mjs';
import { Conn, newSession, visit } from './cdp.mjs';

const SCREENS = process.argv.includes('--screens');
const APPLY = process.argv.includes('--apply');
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
  /* THE LAST TABLE USED TO RUN TO THE END OF THE FILE, and stage 09 walked into
     it: the patterns section is appended below level 3, so its one row was read
     as a thirty-fifth organism and the level check called it diverged. The range
     ends at the next `## ` heading now. This is a latent bug fixed, not a new
     rule - any table appended under the last level would have been swallowed the
     same way, silently, and the count would still have looked like coverage. */
  const nextH = md.slice(s.at + 3).search(/\n## /);
  const hardEnd = nextH === -1 ? md.length : s.at + 3 + nextH;
  const end = Math.min(i + 1 < SECTIONS.length ? SECTIONS[i + 1].at : md.length, hardEnd);
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
    /* AND «–» IS NOT ZERO - corrected at step 8.43, by the check added that day
       reporting a page it had no right to fail. This line used to read «a missing
       one reads as 0 rather than as «unknown»», which was true while every row
       carried a number. `product-thumb.css` is the row that broke it: it declares
       no class of its own, so the anchor walk cannot count its screens at all and
       the cell is a deliberate «–». Flattening that to 0 turned a LIMIT OF THE
       INSTRUMENT into a fact about the product, and question H then demanded that
       the stand page publish «0 екранів» for a component that renders on one.
       `null` here, and every reader of the column decides what to do with it. */
    const cell = cells[cells.length - 3] || '';
    const sc = cell.match(/^\d+/);
    rows.push({ file, level: s.level, lines: Number(cells[cells.length - 2]),
      screens: sc ? Number(sc[0]) : (/^–/.test(cell) ? null : 0), raw: line });
  }
});

/* PER-LEVEL SUMMARY LINES, AND THEY OUTLIVED THE STAGE BECAUSE NOBODY ASKED.
   Stage 09 step 6, and the finding is Codex's: each level table is followed by a
   line «**N files, M lines.**», and all three had drifted - atoms said 22 files
   and 526 lines against 23 and 4410, organisms said 23 and 1997 against 34 and
   8173. The totals paragraph below was checked from step one and the three lines
   above it were not, so the file could fail its own arithmetic while passing its
   own gate. `--apply` rewrites them from the tables, the same way it rewrites the
   `Lines` column: a summary is a SUM, and nothing that is a sum is typed here. */
const levelSums = [1, 2, 3].map(l => {
  const r = rows.filter(x => x.level === l);
  return { level: l, files: r.length, lines: r.reduce((a, x) => a + (x.lines || 0), 0) };
});
const SUM_RE = /\*\*(\d+)\s+files,\s*([\d\s]+?)\s+lines\.\*\*/g;
const saidSums = [...md.matchAll(SUM_RE)].map(m => ({
  at: m.index, text: m[0], files: Number(m[1]), lines: Number(m[2].replace(/\s/g, '')) }));
const sumsBad = saidSums.length !== 3
  ? ['підсумкових рядків рівня знайдено ' + saidSums.length + ', а рівнів три']
  : saidSums.map((s2, i) => s2.files === levelSums[i].files && s2.lines === levelSums[i].lines ? null
      : 'рівень ' + (i + 1) + ': сказано ' + s2.files + ' файлів / ' + s2.lines + ' рядків, у таблиці '
        + levelSums[i].files + ' / ' + levelSums[i].lines).filter(Boolean);
if (sumsBad.length) console.log('\nПІДСУМОК ПІД ТАБЛИЦЕЮ РІВНЯ РОЗІЙШОВСЯ (' + sumsBad.length + '):\n  ' + sumsBad.join('\n  '));

/* the totals paragraph */
const tot = md.match(/\*\*(\d+)\s+components:\s*(\d+)\s+atoms,\s*(\d+)\s+molecules,\s*(\d+)\s+organisms\.?\*\*/);

const seen = new Set(rows.map(r => r.file));
const noRow = files.filter(f => !seen.has(f));
const noFile = rows.filter(r => !files.includes(r.file));
/* THE SECOND LEVEL OF THE SYSTEM IS ASKED THE SAME QUESTIONS. Stage 09 added
   `design/system/patterns/`, and every question below was written when the system
   had one level: a pattern with no row and no stand page would have passed
   silently, which is exactly the failure this file exists to prevent. */
const PDIR = join(ROOT, 'design/system/patterns');
const patFiles = existsSync(PDIR) ? readdirSync(PDIR).filter(f => f.endsWith('.css')).sort() : [];
const patRows = md.split('\n').filter(l => l.startsWith('| ') && l.includes('patterns/') && l.includes('.css`'))
  .map(l => (l.match(/`patterns\/([a-z0-9-]+\.css)`/) || [])[1]).filter(Boolean);
const patNoRow = patFiles.filter(f => !patRows.includes(f));
const patNoPage = patFiles.filter(f => !existsSync(join(ROOT, 'design/kit', f.replace('.css', '.html'))));
const patRowNoFile = patRows.filter(f => !patFiles.includes(f));

/* DOES THE HUB STILL ROUTE TO EVERYTHING THE REGISTRY LISTS? Nothing asked, and
   the answer at stage 09 was no: `overview.html` carried 73 component cards for
   84 files and its own heading said «Організми 24 / 24» about a group of 34. The
   heading was true the afternoon it was typed. Eleven components were added
   afterwards - the eight coach organisms among them - and every one of them
   edited a DIFFERENT file, which is why the stale claim never raised anything.
   A hub that misses a card does not 404 and does not look broken: it looks
   finished, which is the more expensive failure. */
const HUB = join(ROOT, 'design/kit/overview.html');
const hubHtml = readFileSync(HUB, 'utf8');
const hubCards = new Set([...hubHtml.matchAll(/class="kp-card" href="([a-z0-9-]+)\.html"/g)].map(m => m[1]));
const regPages = [];
const navEarly = readFileSync(join(ROOT, 'design/kit/_nav.js'), 'utf8');
for (const m of navEarly.matchAll(/"page":\s*"([a-z0-9-]+)\.html"/g)) regPages.push(m[1]);
const hubMissing = [...new Set(regPages)].filter(x => !hubCards.has(x));
const hubOrphan = [...hubCards].filter(x => !regPages.includes(x));
/* the headings count their own group, and they are a second claim about the same
   set - so they are asked separately rather than trusted */
const hubHeads = [...hubHtml.matchAll(/<div class="kp-sh">([^<]+)<b>(\d+) \/ (\d+)<\/b><\/div>([\s\S]*?)<\/section>/g)]
  .map(m => ({ name: m[1].trim(), said: Number(m[2]), real: (m[4].match(/class="kp-card"/g) || []).length }))
  .filter(h => h.said !== h.real);

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
say('СТОРІНКА РЕЄСТРУ БЕЗ КАРТКИ В ХАБІ', hubMissing, x => x + '.html');
say('КАРТКА В ХАБІ БЕЗ РЯДКА В РЕЄСТРІ', hubOrphan, x => x + '.html');
say('ЗАГОЛОВОК ХАБА РАХУЄ НЕ ТЕ', hubHeads, h => h.name + ' каже ' + h.said + ', карток ' + h.real);
say('ПАТЕРН БЕЗ РЯДКА В ІНВЕНТАРІ', patNoRow, f => f);
say('ПАТЕРН БЕЗ СТОРІНКИ СТЕНДА', patNoPage, f => f);
say('РЯДОК ПАТЕРНА БЕЗ ФАЙЛА', patRowNoFile, f => f);
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

/* ---------- H: the meta strip of every stand page ----------
   The page says WHICH component it describes - the css path is a tag of its own
   in the same strip - so the subject is taken from the page rather than guessed
   off its file name. A page that names no component file is not a component page
   and is counted out loud below. */
const kitDir = join(ROOT, 'design/kit');
const NOUNS = {
  lines:  ['рядок', 'рядки', 'рядків'],
  sels:   ['селектор', 'селектори', 'селекторів'],
  rules:  ['правило', 'правила', 'правил'],
  decls:  ['оголошення', 'оголошення', 'оголошень'],
  screens:['екран', 'екрани', 'екранів'],
};
/* 1 -> singular, 2-4 -> paucal, everything else -> genitive plural, and the
   teens take the last form against their last digit. Written out rather than
   borrowed: this is the ending on a number a person reads. */
const form = (n, kind) => {
  const f = NOUNS[kind], a = Math.abs(n) % 100, b = a % 10;
  if (a > 10 && a < 20) return f[2];
  if (b === 1) return f[0];
  if (b >= 2 && b <= 4) return f[1];
  return f[2];
};
const NOUN_RE = { lines: /^рядо?к|^рядкі?в|^рядки/, sels: /^селектор/, rules: /^правил/,
  decls: /^оголошен/, screens: /^екран/ };
const stripC = s => s.replace(/\/\*[\s\S]*?\*\//g, '');
const measure = file => {
  const css = readFileSync(join(ROOT, file), 'utf8');
  let rules = 0, sels = 0, decls = 0;
  const walk = text => {
    for (const s of topRules(text)) {
      const t = text.slice(s.start, s.end);
      const b = t.indexOf('{');
      if (b < 0) continue;
      const head = stripC(t.slice(0, b)).trim();
      if (/^@/.test(head)) { walk(t.slice(b + 1, t.lastIndexOf('}'))); continue; }
      rules++;
      sels += head.split(',').filter(x => x.trim()).length;
      decls += stripC(t.slice(b + 1, t.lastIndexOf('}'))).split(';').filter(x => x.trim()).length;
    }
  };
  walk(css);
  return { lines: css.split('\n').length, sels, rules, decls };
};

/* ONE COMPONENT, ON DEMAND - the strip its stand page should carry.
   Added at step 8.45, building the first of the eight coach organisms. The strip
   is the only thing on a stand page that is not prose, and until now it was typed
   by hand and caught afterwards by question H - which is the expensive half, since
   catching it after publication means editing a file that is already read. The
   number now comes off the file BEFORE the page exists, from the same `measure`
   the check uses, with the same endings. Screens comes from the registry and keeps
   its «–»: a component with no anchor of its own cannot be counted here either. */
if (process.argv.includes('--measure')) {
  const arg = process.argv[process.argv.indexOf('--measure') + 1] || '';
  const file = arg.replace(/^.*\//, '').replace(/\.css$/, '') + '.css';
  const g = measure('design/system/components/' + file);
  const row = rows.find(r => r.file === file);
  const tag = (n, k) => n + ' ' + form(n, k);
  console.log([
    'рівень ' + levelOf(file),
    'design/system/components/' + file,
    tag(g.lines, 'lines'), tag(g.sels, 'sels'), tag(g.rules, 'rules'), tag(g.decls, 'decls'),
    !row ? 'НЕМАЄ РЯДКА В inventory.md'
         : row.screens === null ? '– екранів (у реєстрі прочерк, якорів немає)'
         : tag(row.screens, 'screens'),
  ].join('  ·  '));
  process.exit(0);
}

const metaBad = [], metaForm = [], metaUnreached = [], metaNoComponent = [];
/* page -> its component file, taken from the page's own meta strip, so question I
   can ask about the stand registry without guessing a file name from a page name */
const metaFileOf = new Map();
let metaPages = 0, metaTags = 0;
for (const f of readdirSync(kitDir).filter(x => x.endsWith('.html')).sort()) {
  const html = readFileSync(join(kitDir, f), 'utf8');
  const m = html.match(/<div class="kp-meta">([\s\S]*?)<\/div>/);
  const page = f.replace(/\.html$/, '');
  if (!m) { metaNoComponent.push(page + '  (немає kp-meta)'); continue; }
  const tags = [...m[1].matchAll(/<span class="kp-tag">([\s\S]*?)<\/span>/g)]
    .map(x => x[1].replace(/<[^>]+>/g, '').trim());
  const file = tags.find(x => /^design\/system\/components\/[a-z0-9-]+\.css$/.test(x));
  if (!file || !files.includes(file.split('/').pop())) { metaNoComponent.push(page); continue; }
  metaFileOf.set(page, file.split('/').pop());
  metaPages++;
  const base = file.split('/').pop();
  const got = measure(file);
  const row = rows.find(r => r.file === base);
  const truth = { ...got, screens: row ? row.screens : null };
  for (const tag of tags) {
    /* THE WHOLE TAG, OR NOTHING - and the first draft of this line anchored only
       at the start, which was wrong in a way that only writing showed. It matched
       the head of a COMPOSITE claim - «3 екрани + значок на 14», «14 екранів,
       діалог на 5», «291 оголошення без елемента» - read the leading number as
       the count it recognises, and `--apply` replaced the entire tag with two
       words, deleting the rest of the sentence. Two of those three were not even
       about the same quantity: cookie-banner's 291 is declarations that match no
       element, which is not this file's declaration count at all.
       A composite tag is a claim of its own, so it goes to «not reached» and a
       person decides it. Requiring the tag to be EXACTLY number + noun is the
       only form this check can rewrite without reading Ukrainian. */
    const num = tag.match(/^([\d ]+)\s+(\S+)$/);
    if (!/^[\d ]+\s+\S/.test(tag)) continue;
    metaTags++;
    if (!num) { metaUnreached.push(page.padEnd(20) + tag + '  (складений тег)'); continue; }
    const n = Number(num[1].replace(/ /g, ''));
    const noun = num[2];
    const kind = Object.keys(NOUN_RE).find(k => NOUN_RE[k].test(noun));
    if (!kind) { metaUnreached.push(page.padEnd(20) + tag); continue; }
    if (kind === 'screens' && truth.screens === null) {
      metaUnreached.push(page.padEnd(20) + tag + (row ? '  (у реєстрі «–»: власних імен немає, рахувати нічим)'
        : '  (немає рядка в реєстрі)')); continue;
    }
    if (n !== truth[kind]) metaBad.push([page, base, tag, kind, n, truth[kind]]);
    else if (noun !== form(n, kind)) metaForm.push([page, base, tag, kind, n, truth[kind]]);
  }
}
say('META СТЕНДА РОЗІЙШЛАСЬ ІЗ ФАЙЛОМ', metaBad,
  ([p, , tag, kind, , t]) => p.padEnd(20) + ('«' + tag + '»').padEnd(22) + '-> ' + t + ' ' + form(t, kind));
say('ЧИСЛО ПРАВИЛЬНЕ, ЗАКІНЧЕННЯ НІ', metaForm,
  ([p, , tag, kind, n]) => p.padEnd(20) + ('«' + tag + '»').padEnd(22) + '-> ' + n + ' ' + form(n, kind));
say('ЧИСЛОВИЙ ТЕГ, ЯКОГО ЦЯ ПЕРЕВІРКА НЕ ДІСТАЄ', metaUnreached, x => x);

/* ---------- H2: the WIDTHS a stand page names, against the widths its file holds
   Stage 10 moved 27 acting boundaries and nobody noticed that the stand still
   described the old ones: 20 of the 84 component pages named a width their own file
   no longer had - `account-shell` said 640/959/960 against 620/859/860, `auth-dialog`
   said 719/720/899/900 against 859/860. `bp.mjs` cannot see this, and deliberately:
   it excludes the stand from its subject because a stand page legitimately SHOWS css
   that is not the product's. So the prose the stand writes about width was checked by
   nobody, and it is the documentation of the system.

   TWO CLASSES ARE LEGAL AND BOTH ARE DECLARED, so neither can quietly swallow a real
   drift. A stand page may name HISTORY - «Було `@media (min-width: 720px)`» is a
   record, and a record keeps its old number - and three pages style their own demo
   tables with their own queries, which are the STAND's layout and not the component's.
   Everything else is a page describing a system that no longer exists.

   THE LISTS BELOW ARE IDLE-CONTROLLED. A page named here that no longer carries any
   ghost fails the run exactly as loudly as an undeclared one: a permission that covers
   nothing reads as coverage. */
const WIDTH_HISTORY = ['account-shell', 'address-card', 'auth-dialog', 'buy-box',
  'loyalty-rung', 'product-grid', 'restock-note', 'trust-strip'];
const WIDTH_STAND_OWN = ['button', 'field', 'menu'];
const widthsOf = t => new Set([...t.matchAll(/\((?:min|max)-width:\s*(\d+)px/g)].map(m => m[1]));
const widthBad = [], widthIdle = [];
for (const f of readdirSync(kitDir).filter(x => x.endsWith('.html')).sort()) {
  const page = f.replace(/\.html$/, '');
  const cssPath = join(ROOT, 'design/system/components', page + '.css');
  if (!existsSync(cssPath)) continue;
  const real = widthsOf(readFileSync(cssPath, 'utf8').replace(/\/\*[\s\S]*?\*\//g, ''));
  const said = widthsOf(readFileSync(join(kitDir, f), 'utf8'));
  const ghosts = [...said].filter(w => !real.has(w));
  const excused = WIDTH_HISTORY.includes(page) || WIDTH_STAND_OWN.includes(page);
  if (ghosts.length && !excused) widthBad.push(page.padEnd(20) + 'каже ' + ghosts.sort((a, b) => a - b).join(',') +
    '   у файлі ' + ([...real].sort((a, b) => a - b).join(',') || 'нема'));
  if (!ghosts.length && excused) widthIdle.push(page + '  (у списку дозволених, але привидів немає)');
}
say('СТЕНД ОПИСУЄ ШИРИНУ, ЯКОЇ У ФАЙЛІ НЕМАЄ', widthBad, x => x);
say('ДОЗВІЛ, ЯКИЙ НІЧОГО НЕ ПОКРИВАЄ', widthIdle, x => x);
console.log('ширини стенда: ' + (widthBad.length + widthIdle.length === 0
  ? 'чисто · ' + WIDTH_HISTORY.length + ' сторінок називають історію, ' + WIDTH_STAND_OWN.length + ' стилюють власне демо, і кожен запис покриває бодай один привид'
  : 'ПРОВАЛІВ ' + (widthBad.length + widthIdle.length)));
console.log('\nсторінок стенда з компонентом: ' + metaPages + ' · числових тегів на них: ' + metaTags +
  ' · поза предметом (не сторінка компонента): ' + metaNoComponent.length);

/* ---------- I: the level is written in FOUR places, and only two were checked
   Step 8.43. The file declares `(level N)` in its opening comment; `inventory.md`
   puts its row in one of three tables (question D); `index.css` imports it into
   one of three groups; and `design/kit/_nav.js` lists its page under one of three
   headings. The ladder is the whole architecture of this stage - an atom imported
   after the molecules can be overridden by them, which is the inversion the order
   exists to prevent - and nothing had ever compared the last two.
   Found on the first run: `product-thumb.css` (level 1) imported inside the
   molecule group, `menu.css` (level 2) imported inside the organism group and
   listed under Атоми on the stand, `upsell.css` (level 2) placed at organism by
   BOTH the import and the registry.
   A MISMATCH WITH A REASON WRITTEN ABOVE IT IS NOT A DEFECT. `upsell.css` carries
   four lines saying why it imports where it does; `product-thumb.css` and
   `menu.css` carry nothing. So the check asks for the comment, which is how this
   repository declares every other exception, and reports the two kinds apart. */
const idx = readFileSync(join(ROOT, 'design/system/index.css'), 'utf8').split('\n');
const importBad = [], importSaid = [];
let grp = null;
for (let i = 0; i < idx.length; i++) {
  const g = idx[i].match(/---- level (\d)/);
  if (g) { grp = Number(g[1]); continue; }
  const m = idx[i].match(/@import 'components\/([a-z0-9-]+\.css)'/);
  if (!m || grp === null) continue;
  const lvl = levelOf(m[1]);
  if (lvl === null || lvl === grp) continue;
  const above = idx.slice(Math.max(0, i - 8), i).join('\n');
  (/\*\//.test(above.trimEnd()) ? importSaid : importBad)
    .push([m[1], 'файл каже рівень ' + lvl + ', імпорт у групі ' + grp, i + 1]);
}
say('IMPORT НЕ В СВОЇЙ ГРУПІ РІВНЯ, І ПРИЧИНИ НЕ НАПИСАНО', importBad,
  ([f, why, ln]) => f.padEnd(22) + why + '   index.css:' + ln);
say('IMPORT НЕ В СВОЇЙ ГРУПІ, ПРИЧИНА НАПИСАНА ПОРУЧ', importSaid,
  ([f, why, ln]) => f.padEnd(22) + why + '   index.css:' + ln);

/* the fourth place: the heading the stand's own registry files the page under */
const navSrc = readFileSync(join(ROOT, 'design/kit/_nav.js'), 'utf8');
const NAVGRP = { 'Атоми': 1, 'Молекули': 2, 'Організми': 3 };
const navBad = [];
let ng = null, navPages = 0;
for (const line of navSrc.split('\n')) {
  const g = line.match(/"label":\s*"(Атоми|Молекули|Організми)"/);
  if (g) { ng = NAVGRP[g[1]]; continue; }
  const p = line.match(/"page":\s*"([a-z0-9-]+)\.html"/);
  if (!p || ng === null) continue;
  const css = metaFileOf.get(p[1]);
  if (!css) continue;
  navPages++;
  const lvl = levelOf(css);
  if (lvl !== null && lvl !== ng) navBad.push([p[1], 'у реєстрі стенда група ' + ng + ', файл каже рівень ' + lvl]);
}
say('ГРУПА В РЕЄСТРІ СТЕНДА РОЗІЙШЛАСЬ ІЗ РІВНЕМ ФАЙЛА', navBad, ([p, why]) => p.padEnd(22) + why);
console.log('сторінок у групах реєстру стенда: ' + navPages + ' · розійшлось: ' + navBad.length +
  ' · імпортів не у своїй групі: ' + importBad.length + ' без причини, ' + importSaid.length + ' з причиною');

if (APPLY) {
  /* THE `Lines` COLUMN IS REWRITTEN HERE TOO, and until stage 09 it was not.
     `--apply` fixed the stand pages' meta tags and left the table that feeds this
     very check untouched, so the run that «applied everything» still reported ten
     wrong numbers on its next pass. A repair that cannot close its own finding is
     a half-instrument: the number comes off disk, and this is the only place that
     knows both halves. Only the last numeric cell of a matched row is touched. */
  if (wrongLines.length) {
    let text = md, n = 0;
    for (const r of wrongLines) {
      const truth = linesOf(r.file);
      const re = new RegExp('^(\\|[^\\n]*`' + r.file.replace('.', '\\.') + '`[^\\n]*\\|\\s*)' + r.lines + '(\\s*\\|\\s*)$', 'm');
      if (re.test(text)) { text = text.replace(re, '$1' + truth + '$2'); n++; }
    }
    if (n) { writeFileSync(join(ROOT, 'design/kit/docs/inventory.md'), text); console.log('Lines переписано: ' + n); }
  }

  /* the three per-level summary lines, from the tables as they stand on disk.
     Read back rather than reused: the `Lines` rewrite above may have just moved
     them, and a sum computed before that write would put a fresh wrong number
     where an old wrong number was. */
  if (sumsBad.length && saidSums.length === 3) {
    let text = readFileSync(INV, 'utf8');
    const fresh = [...text.matchAll(SUM_RE)];
    const cur = [1, 2, 3].map(l => {
      const r = rows.filter(x => x.level === l);
      return { files: r.length, lines: r.reduce((a, x) => a + (linesOf(x.file) || x.lines || 0), 0) };
    });
    let n = 0;
    for (let i = fresh.length - 1; i >= 0; i--) {
      const want2 = '**' + cur[i].files + ' files, ' + cur[i].lines + ' lines.**';
      if (fresh[i][0] === want2) continue;
      text = text.slice(0, fresh[i].index) + want2 + text.slice(fresh[i].index + fresh[i][0].length);
      n++;
    }
    if (n) { writeFileSync(INV, text); console.log('підсумків рівня переписано: ' + n); }
  }

  /* THE SECOND VISIBLE PLACE OF THE SAME CLAIM, repaired rather than only
     reported. `kit.html` is the frozen stage-07 smoke page, and the rule for a
     frozen page is not «leave it wrong» but «carry a visible updated-after-
     publication block» - it already does, and the block held the OLD split
     22/29/33 while the md it quotes had moved to 23/27/34. A block that goes
     stale is worse than no block: it is a second edition claiming to be current. */
  if (kitBad) {
    const kre = new RegExp('<b>' + rows.length + ' компонент' + UK + ':\\s*\\d+ атом' + UK +
      ',\\s*\\d+ молекул' + UK + ',\\s*\\d+ організм' + UK + '</b>');
    const m2 = kitHtml.match(kre);
    if (m2) {
      const to = '<b>' + rows.length + ' компоненти:\n      ' + counts[0] + ' атоми, ' +
        counts[1] + ' молекул, ' + counts[2] + ' організми</b>';
      writeFileSync(KIT, kitHtml.replace(m2[0], to));
      console.log('kit.html переписано: ' + m2[0].replace(/\s+/g, ' ') + '  ->  ' + to.replace(/\s+/g, ' '));
    }
  }

  /* the totals paragraph, for the same reason and by the same rule. It was
     REPORTED from step one and never repaired, so «сказано 84 (22/29/33)» could
     be read out on every run for a week without anything closing it. */
  if (totalsBad && tot) {
    let text = readFileSync(INV, 'utf8');
    const want2 = '**' + rows.length + ' components: ' + counts[0] + ' atoms, ' +
      counts[1] + ' molecules, ' + counts[2] + ' organisms.**';
    if (text.includes(tot[0]) && tot[0] !== want2) {
      writeFileSync(INV, text.replace(tot[0], want2));
      console.log('підсумковий абзац переписано: ' + tot[0] + '  ->  ' + want2);
    }
  }

  const byPage = new Map();
  for (const x of [...metaBad, ...metaForm]) {
    if (!byPage.has(x[0])) byPage.set(x[0], []);
    byPage.get(x[0]).push(x);
  }
  let written = 0;
  for (const [page, list] of byPage) {
    const p = join(kitDir, page + '.html');
    const html = readFileSync(p, 'utf8');
    /* THE REWRITE HAPPENS INSIDE THE meta BLOCK AND NOWHERE ELSE. A whole-file
       `replace` would take the first `<span class="kp-tag">…` anywhere in the
       page, and these pages quote their own markup in code blocks - the same
       shape as `btn-rank.mjs`'s string replace at 8.31, which upsized a second
       control per page and was caught by its own next run. Cut the block out,
       edit it, put it back at the same offset. */
    const mm = html.match(/<div class="kp-meta">([\s\S]*?)<\/div>/);
    let block = mm[0];
    for (const [, , tag, kind, , truth] of list) {
      /* plain digits, no thousands separator: every number this rewrites is a
         count of lines, selectors, declarations or screens, and the largest in
         the corpus is 561. A locale separator would put an invisible NBSP into
         render text, which is the class of byte `accept` has to grep for. */
      const want = String(truth) + ' ' + form(truth, kind);
      const from = '<span class="kp-tag">' + tag + '</span>';
      if (!block.includes(from)) { console.log('  НЕ ЗНАЙДЕНО ТЕГА, пропущено: ' + page + ' «' + tag + '»'); continue; }
      block = block.replace(from, '<span class="kp-tag">' + want + '</span>');
    }
    writeFileSync(p, html.slice(0, mm.index) + block + html.slice(mm.index + mm[0].length));
    written++;
  }
  console.log('переписано сторінок: ' + written);
}

console.log('\n' + files.length + ' файлів компонентів · рядків у таблицях: ' + rows.length +
  ' (' + counts.join('/') + ')' +
  ' · без рядка: ' + noRow.length + ' · рядок без файла: ' + noFile.length +
  ' · Lines розійшлось: ' + wrongLines.length + ' · рівень розійшовся: ' + wrongLevel.length +
  ' · без рівня у файлі: ' + noLevelDeclared.length);
console.log(SCREENS ? 'колонка Screens зміряна в браузері' :
  'колонка Screens НЕ перевірена - потрібен прапорець --screens (обхід корпусу браузером)');

process.exit(noRow.length || noFile.length || wrongLines.length || wrongLevel.length ||
  noLevelDeclared.length || totalsBad || sumsBad.length || kitBad || wrongScreens.length || noAnchor.length ? 1 : 0);
