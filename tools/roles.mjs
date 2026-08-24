/* tools/roles.mjs - the seventh check: does the stand still describe the file?

   EVERY COMPONENT PAGE PRINTS THE LIST OF TOKENS ITS CSS READS, and all 69 of
   those lists are typed by hand. A list typed by hand about a file that keeps
   changing is a promise nobody renews: on 2026-08-13 one role was split in three
   (`--text-oninverse` kept the inverse surface, `--text-onaction` and
   `--text-onaction-ink` took the accent fill, `--line-onaction` took its line),
   sixteen rules moved, and twelve pages went on printing the old names. Nothing
   in the repository noticed, because nothing was asking.

   The check is deliberately a REPORT, not a rewriter. The primitive column is
   ordered by meaning - `--space-2 --space-4 --space-8 --space-12`, not
   alphabetically - and a generator would flatten that ordering across 69 pages to
   fix twelve. What the page says is the author's; whether it is still TRUE is
   this file's.

   It asks the OUTPUT, not the intention: the left side is every `var(--name)` the
   component file actually contains, the right side is every `<code>--name</code>`
   inside the page's own table. A token declared by the component for itself is
   neither - it is the component's private business, and the page never listed it.

   node tools/roles.mjs            every component that has a page
   node tools/roles.mjs badge chip only those */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ROOT } from './lib.mjs';

const CDIR = join(ROOT, 'design/system/components');
const KDIR = join(ROOT, 'design/kit');
const TOKENS = readFileSync(join(ROOT, 'design/system/tokens.css'), 'utf8');
const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, '');

/* the semantic half of tokens.css, by the same reading theme.mjs uses: the
   marker is itself a comment, so it is found in the RAW text and the block is
   cut at its own closing brace, or the 28 dark-side primitives below it would
   count as roles. */
const semantic = (() => {
  const at = TOKENS.indexOf('SEMANTIC - roles');
  const s = strip(TOKENS.slice(at));
  let d = 0, end = s.length;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '{') d++;
    else if (s[i] === '}') { if (d === 0) { end = i; break; } d--; }
  }
  return new Set([...s.slice(0, end).matchAll(/(?:^|[{;])\s*(--[a-z0-9-]+)\s*:/gm)].map(m => m[1]));
})();

/* 12.10 - `--apply`, AND THE REASON IS IN THIS FILE'S OWN FIRST PARAGRAPH:
   «all of those lists are typed by hand». A list typed by hand drifts, which is
   why this instrument exists - and for two stages the only thing it could do
   about the drift was name it. At the close of the rollout it named 29 of 93
   pages, twelve of them on one component whose listing form batch 4 had just
   written. The set is not a judgement: it is `var(--x)` in the css minus what
   the file declares for itself, split by whether `tokens.css` calls the name
   semantic. Every part of that is derived, so every part of it can be written.

   THE SEVEN PAGES WITH NO TABLE GET ONE, AND THE PLACEMENT IS A DECLARED
   DEFAULT. Seven component pages - every one of them written at batches 4 and 5
   of the rollout - carried no «Токени» section at all, so the convention every
   other component page keeps was true of 86 of 93. Where the section sits varies
   (11th of 13 on `address-card`, 16th of 19 on `button`): there is no rule to
   derive, so a new one is appended LAST and that is said out loud rather than
   dressed as a derivation. Moving it is one cut and paste; not having it is a
   page that documents a component without saying what the component reads. */
const APPLY = process.argv.includes('--apply');
const want = process.argv.slice(2).filter(a => !a.startsWith('-'));
const files = readdirSync(CDIR).filter(f => f.endsWith('.css'))
  .map(f => f.slice(0, -4))
  .filter(n => !want.length || want.includes(n))
  .sort();

let bad = 0, noPage = [], noTable = [];

for (const name of files) {
  const page = join(KDIR, name + '.html');
  if (!existsSync(page)) { noPage.push(name); continue; }
  const css = readFileSync(join(CDIR, name + '.css'), 'utf8');
  const body = strip(css);

  /* what the component declares for ITSELF is not a token it reads */
  /* A COMPONENT'S OWN VARIABLE IS NOT A TOKEN IT READS, and the anchor decided
     that by line position instead of by syntax. `^\s*` only saw a declaration
     that starts its own line, so `icon.css:64` - `.uiv-brand{ --brand-ink: 1.05em;
     display:inline-flex; ...}`, the declaration sharing the line with its
     selector - was counted as a token read, and `icon.html` was reported adrift
     for correctly saying it is not one. Found 2026-08-14 by an agent that
     believed the page over the checker and went to look. A declaration begins
     after `{` or `;` or a line start; that is the whole rule. */
  const own = new Set([...body.matchAll(/(?:^|[{;])\s*(--[a-z0-9-]+)\s*:/gm)].map(m => m[1]));
  const reads = new Set([...body.matchAll(/var\(\s*(--[a-z0-9-]+)/g)]
    .map(m => m[1]).filter(t => !own.has(t)));

  const html = readFileSync(page, 'utf8');
  const tbl = html.match(/Семантичні ролі[\s\S]*?<\/table>/);
  if (!tbl) {
    noTable.push(name);
    if (!APPLY) continue;
    const r = [...reads].filter(t => semantic.has(t)).sort();
    const q = [...reads].filter(t => !semantic.has(t)).sort();
    const c = l => l.map(t => '<code>' + t + '</code>').join(' ');
    const sec = '\n<section class="kp-sec"><div class="kp-sh">Токени</div>\n' +
      '<p class="kp-p">Прочитані з <code>' + name + '.css</code>: <b>' + r.length +
      '</b> семантичних ролей і <b>' + q.length + '</b> примітивів. Список виводить ' +
      '<code>node tools/roles.mjs ' + name + '</code> з самого файла, тож він не може розійтися з ним.</p>\n' +
      '<div class="kp-scroll"><table class="kp-tbl"><thead><tr><th>Семантичні ролі (' + r.length +
      ')</th><th>Примітиви (' + q.length + ')</th></tr></thead><tbody><tr><td>' + c(r) +
      '</td><td>' + c(q) + '</td></tr></tbody></table></div></section>\n';
    writeFileSync(page, html.replace(/\n<\/main>/, sec + '</main>'));
    console.log('\n' + name + '.html\n   -> розділу «Токени» не було, додано в кінець: ' +
      r.length + ' ролей, ' + q.length + ' примітивів');
    continue;
  }
  const listed = new Set([...tbl[0].matchAll(/<code>(--[a-z0-9-]+)<\/code>/g)].map(m => m[1]));

  const missing = [...reads].filter(t => !listed.has(t)).sort();
  const extra = [...listed].filter(t => !reads.has(t)).sort();
  if (!missing.length && !extra.length) continue;

  bad++;
  console.log('\n' + name + '.html');
  const kind = t => (semantic.has(t) ? 'роль     ' : 'примітив ');
  missing.forEach(t => console.log('   немає на сторінці   ' + kind(t) + t));
  extra.forEach(t => console.log('   немає у файлі        ' + kind(t) + t));

  if (!APPLY) continue;
  /* the table is rewritten whole: both cells, both headings, and the count in
     the sentence above it. Nothing here is preserved from the old edition,
     because everything in it is derived from the two files. */
  const rolesList = [...reads].filter(t => semantic.has(t)).sort();
  const primList = [...reads].filter(t => !semantic.has(t)).sort();
  const cell = list => list.map(t => '<code>' + t + '</code>').join(' ');
  const table = 'Семантичні ролі (' + rolesList.length + ')</th><th>Примітиви (' +
    primList.length + ')</th></tr></thead><tbody><tr><td>' + cell(rolesList) +
    '</td><td>' + cell(primList) + '</td></tr></tbody></table>';
  let out = html.replace(/Семантичні ролі[\s\S]*?<\/table>/, table);
  /* the lead sentence carries the same two numbers and drifted with the table */
  out = out.replace(/(Прочитані з <code>[^<]*<\/code>:\s*)<b>\d+<\/b>(\s*семантич\S*\s*ро\S*\s*і\s*)<b>\d+<\/b>/,
    (m, a, mid) => a + '<b>' + rolesList.length + '</b>' + mid + '<b>' + primList.length + '</b>');
  writeFileSync(page, out);
  console.log('   -> переписано: ' + rolesList.length + ' ролей, ' + primList.length + ' примітивів');
}

console.log('\n' + files.length + ' компонентів  ·  розійшлось: ' + bad);
/* THE IDLE CONTROL. A component with no page and a page with no table are both
   holes this check would otherwise pass over in silence, and silence is what it
   exists to end. */
if (noPage.length) console.log('без сторінки (' + noPage.length + '): ' + noPage.join(' '));
if (noTable.length) console.log('сторінка без таблиці (' + noTable.length + '): ' + noTable.join(' '));
if (APPLY && (bad || noTable.length)) {
  console.log('\n=== ПЕРЕПИТУЄМО ТИМ САМИМ ПРИЛАДОМ, уже після правок ===');
  const again = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...want], { stdio: 'inherit' });
  process.exit(again.status ?? 1);
}
process.exit(bad || noTable.length ? 1 : 0);
