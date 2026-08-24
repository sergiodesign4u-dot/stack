/* tools/clone-test.mjs - DOES THIS REPOSITORY WORK FOR SOMEBODY WHO IS NOT ME?

   Stage 13, step 6. Every other instrument in this folder runs inside the working
   tree, with the author's paths, the author's untracked files and the author's
   habits. Three failures are invisible from in there and fatal from outside:

     - an ABSOLUTE PATH to the machine it was written on. It resolves here and
       nowhere else, and nothing in a normal run ever notices.
     - a file eaten by `.gitignore`. It is on disk, every check opens it, and it
       is not in the repository at all.
     - a dependency on a LOCAL SERVER. Half the instruments here raise one, so a
       page that only works when served looks fine to all of them - and a person
       who clones and double-clicks gets a blank document.

   The test is the plain one: clone HEAD into a temporary directory, open the
   entry points from `file://` with no server and no explanation, and count what
   comes back. `file://` is the point - it is the harshest reading of «works
   without a build», and anything that survives it survives being served too.

   WHAT IT DOES NOT PROVE. It walks the entry points and the handoff route, not
   the whole corpus: 343 pages over `file://` would be a second `accept.mjs` and
   this one is about the PACKAGE rather than about the screens.

     node tools/clone-test.mjs            clone, open, report, remove
     node tools/clone-test.mjs --keep     and leave the clone for a look */
import { existsSync, rmSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { ROOT, chrome } from './lib.mjs';
import { Conn, newSession, visit } from './cdp.mjs';

const KEEP = process.argv.includes('--keep');
const DEST = join(tmpdir(), 'stack-clone-test');
const say = (title, list, fmt) => { if (!list.length) return;
  console.log('\n' + title + ' (' + list.length + '):'); for (const x of list) console.log('  ' + fmt(x)); };

if (existsSync(DEST)) rmSync(DEST, { recursive: true, force: true });
execFileSync('git', ['clone', '--quiet', ROOT, DEST], { stdio: 'pipe' });
const head = execFileSync('git', ['-C', DEST, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
const tags = execFileSync('git', ['-C', DEST, 'tag', '-l'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
console.log('клон: ' + DEST + '  ·  HEAD ' + head + '  ·  тегів у клоні: ' + tags.length +
  (tags.length ? ' (' + tags.join(' ') + ')' : ''));

/* ---------- 1. what did NOT come with it ---------- */
const walk = (base, d = '') => readdirSync(join(base, d), { withFileTypes: true }).flatMap(e => {
  if (e.name === '.git' || e.name === 'node_modules') return [];
  const p = d ? d + '/' + e.name : e.name;
  return e.isDirectory() ? walk(base, p) : [p];
});
const here = new Set(walk(ROOT));
const there = new Set(walk(DEST));
/* A FILE THE CLONE LACKS IS ONLY A FINDING IF GIT DID NOT MEAN TO LEAVE IT.
   The first run reported 103, and 100 of them were `.playwright-mcp/` logs and
   other declared-ignored output - which is `.gitignore` doing its job, not a
   package missing a part. The question is asked of git rather than guessed: a
   file the tree has, the clone lacks, and `check-ignore` does NOT claim, was
   simply never committed, and that is the failure a person with only the clone
   would meet. The ignored ones are counted so the filter cannot go quiet. */
const absent = [...here].filter(f => !there.has(f));
let ignored = [];
try {
  const r = execFileSync('git', ['-C', ROOT, 'check-ignore', '--stdin'],
    { input: absent.join('\n'), encoding: 'utf8' });
  ignored = r.split('\n').filter(Boolean);
} catch (e) { ignored = (e.stdout || '').split('\n').filter(Boolean); }
const ignoredSet = new Set(ignored);
const missing = absent.filter(f => !ignoredSet.has(f));
say('Є В РОБОЧОМУ ДЕРЕВІ І НЕМАЄ В КЛОНІ', missing.slice(0, 20), f => f);
if (missing.length > 20) console.log('  ... і ще ' + (missing.length - 20));

/* ---------- 2. an address that only exists on one machine ---------- */
/* THE FIRST WRITING MATCHED A SLASH-SEPARATED ENUMERATION. `footer/header/home/
   product/account` in a playbook sentence contains «/home/product/» and was
   reported as an absolute path. A path TOKEN starts where a word does not: at the
   beginning of a line, or after a quote, a space, a bracket or an equals sign. */
const HOME = /(?:^|["'`\s(=,])(\/(?:Users|home)\/[a-z0-9._-]+\/)/gim;
const abs = [];
for (const f of there) {
  if (!/\.(md|css|js|mjs|html|py|json|yml)$/.test(f)) continue;
  const t = readFileSync(join(DEST, f), 'utf8');
  for (const m of t.matchAll(HOME)) {
    const line = t.slice(0, m.index).split('\n').length;
    abs.push([f + ':' + line, m[1]]);
  }
}
say('АБСОЛЮТНИЙ ШЛЯХ ДО ЧИЄЇСЬ МАШИНИ', abs, ([at, s]) => at.padEnd(40) + s);

/* ---------- 3. a build that is not there ---------- */
const build = ['package.json', 'yarn.lock', 'pnpm-lock.yaml', 'Makefile', 'vite.config.js']
  .filter(f => there.has(f));
console.log('\nфайлів у клоні: ' + there.size + ' · у робочому дереві: ' + here.size +
  ' · лишилось поза клоном: ' + absent.length + ', з них оголошено в .gitignore: ' + ignoredSet.size +
  ' · НЕ ДОЇХАЛО без причини: ' + missing.length + ' · збіркових файлів: ' + build.length +
  (build.length ? ' (' + build.join(' ') + ')' : ' - збірки немає, як і обіцяно'));

/* ---------- 4. open it the way a visitor does: file://, no server ---------- */
/* THREE KINDS OF PAGE, THREE CARRIERS, and the first writing asked all of them
   for `#sidebar`. It then reported «no panel» on `design/index.html` and
   `design/kit/overview.html` - the first is a PRODUCT screen and carries the
   product's own header and tab-bar rather than the roadmap panel, and the second
   is the kit, whose panel is `#kitnav`. Two findings, neither about the product:
   a comparison whose two sides differ in more than the thing measured. */
const ROUTE = [
  { p: 'index.html',                what: '#sidebar a, #sidebar span',   kind: 'роадмеп' },
  { p: 'handoff/handoff.html',      what: '#sidebar a, #sidebar span',   kind: 'роадмеп' },
  { p: 'wireframes/overview.html',  what: '#sidebar a, #sidebar span',   kind: 'роадмеп' },
  { p: 'design/kit/overview.html',  what: '#kitnav a, #kitnav span',     kind: 'вітрина' },
  { p: 'design/index.html',         what: 'header a, .wf-tabbar a, .tabbar a', kind: 'екран продукту' },
];
const EXPR = w => `JSON.stringify({
  title: document.title,
  sidebar: document.querySelectorAll(${JSON.stringify(w)}).length,
  body: document.body ? document.body.innerText.trim().length : 0,
  errs: (window.__e || []).slice(0, 3) })`;
const l = await chrome('clone');
const conn = await Conn.open(l.wsUrl);
const blank = [], noPanel = [], broke = [];
for (const { p, what, kind } of ROUTE) {
  const s = await newSession(conn);
  try {
    await conn.send('Runtime.evaluate', { expression: 'window.__e=[];', returnByValue: true }, s.sessionId);
    const v = JSON.parse(await visit(conn, s.sessionId, 'file://' + join(DEST, p), 1280, 900, EXPR(what), s.inflight));
    const short = v.body < 400;
    console.log('  ' + p.padEnd(28) + kind.padEnd(15) + 'тексту ' + String(v.body).padStart(6) +
      ' · навігація ' + String(v.sidebar).padStart(3) + ' · ' + (v.title || 'БЕЗ TITLE'));
    if (short) blank.push([p, v.body + ' символів тексту']);
    if (!v.sidebar) noPanel.push([p, kind + ': навігація не намалювалась з file:// - скрипт не доїхав або шлях не той']);
  } catch (e) { broke.push([p, String(e.message).slice(0, 60)]); }
  finally { await s.close(); }
}
l.stop();
say('СТОРІНКА ВІДКРИЛАСЬ ПОРОЖНЬОЮ', blank, ([p, w]) => p.padEnd(30) + w);
say('ПАНЕЛІ НЕМАЄ', noPanel, ([p, w]) => p.padEnd(30) + w);
say('НЕ ВІДКРИЛАСЬ ВЗАГАЛІ', broke, ([p, w]) => p.padEnd(30) + w);

if (!KEEP) rmSync(DEST, { recursive: true, force: true });
console.log('\nмаршрут пройдено з file:// без сервера: ' + (ROUTE.length - broke.length) + ' з ' + ROUTE.length +
  (KEEP ? '  ·  клон лишено: ' + DEST : '  ·  клон прибрано'));
process.exit(missing.length || abs.length || blank.length || noPanel.length || broke.length ? 1 : 0);
