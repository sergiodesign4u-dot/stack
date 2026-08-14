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
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
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
  if (!tbl) { noTable.push(name); continue; }
  const listed = new Set([...tbl[0].matchAll(/<code>(--[a-z0-9-]+)<\/code>/g)].map(m => m[1]));

  const missing = [...reads].filter(t => !listed.has(t)).sort();
  const extra = [...listed].filter(t => !reads.has(t)).sort();
  if (!missing.length && !extra.length) continue;

  bad++;
  console.log('\n' + name + '.html');
  const kind = t => (semantic.has(t) ? 'роль     ' : 'примітив ');
  missing.forEach(t => console.log('   немає на сторінці   ' + kind(t) + t));
  extra.forEach(t => console.log('   немає у файлі        ' + kind(t) + t));
}

console.log('\n' + files.length + ' компонентів  ·  розійшлось: ' + bad);
/* THE IDLE CONTROL. A component with no page and a page with no table are both
   holes this check would otherwise pass over in silence, and silence is what it
   exists to end. */
if (noPage.length) console.log('без сторінки (' + noPage.length + '): ' + noPage.join(' '));
if (noTable.length) console.log('сторінка без таблиці (' + noTable.length + '): ' + noTable.join(' '));
process.exit(bad ? 1 : 0);
