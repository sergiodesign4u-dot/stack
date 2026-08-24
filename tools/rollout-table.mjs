/* tools/rollout-table.mjs - the estimate of stage 12, generated from the two
   registries rather than typed.

   WHY IT IS A SCRIPT. The table in `rollout.md` is the ONLY place in this
   repository where «screen -> IA node» is written down, stage 13 reads it, and
   the parent substitutes its node column into every subagent contract. A table
   like that typed by hand goes stale the first time a state is added, and it
   goes stale in silence, because nothing downstream can tell a wrong node from
   a right one. Sources: `wireframes/_nav.js` (WF_FLOWS, WF_SITEMAP) and
   `design/_nav.js` (DESIGN_NAV), plus the two file trees.

   WRONG VERSION: the declaration matcher read `const NAME =` only, and
   `DESIGN_NAV` is declared `var`. The run reported the registry missing when it
   was three lines below.

     node tools/rollout-table.mjs           the markdown table
     node tools/rollout-table.mjs --check   compare it with what rollout.md holds */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './lib.mjs';

function sliceArray(src, name) {
  const m = new RegExp('(?:const|let|var)\\s+' + name + '\\s*=').exec(src);
  if (!m) throw new Error('registry not found: ' + name);
  const j = src.indexOf('[', m.index);
  let d = 0, k = j;
  for (; k < src.length; k++) { if (src[k] === '[') d++; else if (src[k] === ']' && !--d) break; }
  return eval(src.slice(j, k + 1));
}
const wf = readFileSync(join(ROOT, 'wireframes/_nav.js'), 'utf8');
const dg = readFileSync(join(ROOT, 'design/_nav.js'), 'utf8');
const WF_FLOWS = sliceArray(wf, 'WF_FLOWS');
const WF_SITEMAP = sliceArray(wf, 'WF_SITEMAP');
const DESIGN_NAV = sliceArray(dg, 'DESIGN_NAV');

/* the only screen the locked product decisions put after launch */
const LATER = new Set(['quiz.html']);
const has = (d, f) => existsSync(join(ROOT, d, f));
const stateFile = (f, st) => f.replace('.html', '-' + st + '.html');

const rows = [];
const seenFile = new Set();
for (const fl of WF_FLOWS) for (const s of fl.screens || []) {
  const stem = s.stateFile || s.file;
  const pages = [s.file, ...(s.builtStates || []).map(st => stateFile(stem, st))];
  const fresh = pages.filter(p => !seenFile.has(p));
  fresh.forEach(p => seenFile.add(p));
  if (!fresh.length) continue;
  const colour = fresh.filter(p => has('design', p));
  rows.push({
    flow: fl.id, node: s.node, name: s.name, file: s.file,
    pages: fresh.length, colour: colour.length, todo: fresh.length - colour.length,
    grey: fresh.every(p => has('wireframes', p)),
    mvp: !LATER.has(s.file),
    state: colour.length === fresh.length ? 'вже в кольорі'
         : colour.length ? 'частково в кольорі' : 'розкочується тут',
    files: fresh.filter(p => !has('design', p)),
  });
}

const N = rows.reduce((a, r) => a + r.pages, 0);
const done = rows.reduce((a, r) => a + r.colour, 0);
const todo = rows.reduce((a, r) => a + r.todo, 0);
const mvpTodo = rows.filter(r => r.mvp).reduce((a, r) => a + r.todo, 0);

const line = r => `| ${r.flow} | ${r.node} | ${r.name} | \`${r.file}\` | ${r.state} | ${r.pages} | ${r.colour} | ${r.todo} | ${r.mvp ? 'MVP' : 'ПОТІМ'} | ${r.grey ? 'є' : '**немає**'} |`;

let out = '| Флоу | Вузол IA | Екран | Файл | Стан | Сторінок | У кольорі | Лишилось | MVP | Сірий оригінал |\n';
out += '|---|---|---|---|---|---:|---:|---:|---|---|\n';
for (const r of rows)
  out += line(r) + '\n';
out += `\n**Сторінок у реєстрі: ${N}** · уже в кольорі: **${done}** · розкочується тут: **${todo}** · з них у MVP-обсязі (K): **${mvpTodo}** · без сірого оригіналу: **${rows.filter(r => !r.grey).length}**\n`;

const noGrey = [];
for (const cl of WF_SITEMAP) for (const it of cl.items) if (!it.file) noGrey.push(`${it.node} ${it.name} -> \`ia/${it.ia}\``);
out += `\n**Вузли без сірого оригіналу (${noGrey.length}), у розкотку не входять:** ${noGrey.join(' · ') || '-'}\n`;

const unreg = rows.flatMap(r => r.files.filter(f => DESIGN_NAV.includes(f)));
if (unreg.length) out += `\n**УВАГА:** ${unreg.length} файлів названо в \`DESIGN_NAV\`, а на диску їх немає: ${unreg.join(' ')}\n`;

/* 12.9: THE SAME LIST, ASKED THE OTHER WAY, AND ONLY ONE WAY HAD EVER BEEN
   ASKED. The line above catches a name in `DESIGN_NAV` with no file behind it -
   which never happens, because a row is added after the file is built. The case
   that DOES happen is the mirror of it: a file on disk that no registry knows.
   Found at 12.9 by a subagent that measured 137 html in `design/` against 132
   names and reported its own four screens as the difference.

   AND `links.mjs` COULD NOT SEE IT, though it was the natural place to look. It
   asks about names that a screen's BODY links to; nothing in the product links
   to a mega-menu state, because the only thing that carries those four is the
   stand's own rail. Its «DESIGN_NAV знає всі 132 імені, на які посилаються
   екрани» was true and useless: a file nobody links to cannot be caught by a
   check about links. The completeness of a declared list is a question about
   the LIST, not about its readers.

   The exception is one file and it is tested rather than trusted: `overview` is
   the hub, it is deliberately outside the screen registry, and if it ever gains
   a row the line below says so instead of quietly covering it. */
const NAV_EXEMPT = new Set(['overview.html']);
const onDisk = readdirSync(join(ROOT, 'design')).filter(f => f.endsWith('.html'));
const orphan = onDisk.filter(f => !DESIGN_NAV.includes(f) && !NAV_EXEMPT.has(f));
const emptyExempt = [...NAV_EXEMPT].filter(f => !onDisk.includes(f) || DESIGN_NAV.includes(f));
out += `\n**Файлів у \`design/\`: ${onDisk.length}** · у \`DESIGN_NAV\`: ${DESIGN_NAV.length} · поза реєстром за оголошеним винятком: ${NAV_EXEMPT.size} (\`${[...NAV_EXEMPT].join('`, `')}\`)\n`;
if (orphan.length) out += `\n**УВАГА:** ${orphan.length} файлів лежать у \`design/\` і не названі в \`DESIGN_NAV\` - \`uivFixLinks()\` не проведе до них жодного посилання, а чіп стану в рейці стенда намалюється сірим: ${orphan.map(f => '`' + f + '`').join(' ')}\n`;
if (emptyExempt.length) out += `\n**УВАГА:** оголошений виняток нікого не покриває (${emptyExempt.join(' ')}) - або файл зник, або він уже в реєстрі, і тоді рядок винятку треба зняти\n`;

/* 12.4: THE CHECK COULD ONLY SEE THE THREE COLUMNS THAT NEVER CHANGE. It asked
   whether `| flow | node | name |` appears in the file - so it was green over a
   table saying «розкочується тут · у кольорі 0 · лишилось 4» for four screens that
   had been in colour for an hour. Flow, node and name are exactly the cells a
   stage cannot stale; state and the two counts are the cells it stales every
   batch. A check that reads only the stable part of a row reports the stability
   of the part it read.
   Now the WHOLE row is compared, and `--apply` rewrites the ones that drifted -
   a row like this is generated, so nothing in it is typed twice. */
const ROLLOUT = join(ROOT, 'design/kit/docs/rollout.md');
const CHECK = process.argv.includes('--check');
const APPLY = process.argv.includes('--apply');
if (CHECK || APPLY) {
  let md = readFileSync(ROLLOUT, 'utf8');
  const head = r => `| ${r.flow} | ${r.node} | ${r.name} |`;
  const missing = [], drifted = [];
  for (const r of rows) {
    const want = line(r);
    if (md.includes(want)) continue;
    const re = new RegExp('^\\| ' + [r.flow, r.node, r.name].map(x =>
      String(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join(' \\| ') + ' \\|.*$', 'm');
    if (!re.test(md)) { missing.push(r); continue; }
    drifted.push(r);
    if (APPLY) md = md.replace(re, want);
  }
  /* 12.9: THE SUMMARY UNDER THE TABLE IS A ROW TOO, AND NOTHING HAD EVER
     COMPARED IT. `--check` walked the rows, found every one of them right, and
     printed «збігається з реєстрами ПОВНИМ РЯДКОМ» while the line beneath them
     still said «уже в кольорі: 91 · розкочується тут: 50 · MVP: 49» - the
     batch-1 numbers, forty-nine screens out of date. Third instrument in this
     stage with the same shape: a check that reads the part it was written for
     reports the health of that part.

     It matters more than the others because of WHICH number it was hiding. The
     true reading is «розкочується тут: 1 · MVP: 0» - the whole MVP scope is in
     colour and only the ПОТІМ screen is left, which is the headline of the
     stage. A summary is a SUM: it is generated here and typed nowhere, exactly
     like the level totals in `inventory.md`. */
  const SUM_RE = /^\*\*Сторінок у реєстрі: .*$/m;
  const wantSum = `**Сторінок у реєстрі: ${N}** · уже в кольорі: **${done}** · розкочується тут: **${todo}** · з них у MVP-обсязі (K): **${mvpTodo}** · без сірого оригіналу: **${rows.filter(r => !r.grey).length}**`;
  const gotSum = (md.match(SUM_RE) || [''])[0];
  const sumBad = gotSum !== wantSum;
  if (sumBad && APPLY) md = md.replace(SUM_RE, wantSum);

  if (APPLY && (drifted.length || sumBad)) writeFileSync(ROLLOUT, md);
  if (sumBad) console.log((APPLY ? 'ПІДСУМОК ПЕРЕПИСАНО' : 'ПІДСУМОК ПІД ТАБЛИЦЕЮ РОЗІЙШОВСЯ') +
    ':\n  у файлі: ' + (gotSum || '- рядка немає взагалі') + '\n  насправді: ' + wantSum);
  if (missing.length) console.log('РЯДКА НЕМАЄ В rollout.md (' + missing.length + '):\n  ' + missing.map(r => r.name).join('\n  '));
  if (drifted.length) console.log((APPLY ? 'ПЕРЕПИСАНО РЯДКІВ' : 'РЯДОК РОЗІЙШОВСЯ ПОЗА ІМЕНЕМ') +
    ' (' + drifted.length + '):\n  ' + drifted.map(r => r.name).join('\n  '));
  if (!missing.length && !drifted.length && !sumBad)
    console.log(`rollout.md збігається з реєстрами ПОВНИМ РЯДКОМ І ПІДСУМКОМ: ${rows.length} екранів, ${N} сторінок`);
  process.exit(missing.length || ((drifted.length || sumBad) && !APPLY) ? 1 : 0);
}

console.log(out);
