/* tools/vars.mjs - EVERY `var(--x)` THE COLOURED LAYER SPEAKS, AND WHETHER THE
   SYSTEM ANSWERS.

   An undefined custom property is the quietest failure CSS has. `var(--dark)`
   with nothing declaring `--dark` does not fall back to black and does not
   raise anything: the whole declaration becomes invalid at computed-value time,
   so the property lands on `inherit` (or its initial value) and the browser says
   nothing at all. `background: var(--dark)` disappears. `color: #fff` on the
   same element, being a literal, survives. The result is white ink on white
   paper, drawn exactly as instructed, with no error anywhere.

   That is how `coach-verify-tier` lost both of its cards. The screen carries its
   own `<style>` block written against the GREY layer's names - `--dark`,
   `--hair2`, `--sec`, `--light`, `--ink`, `--fill` - and the clone that made it
   coloured swapped the stylesheet link from `wireframes/_wf.css` to
   `design/system/index.css`, where those names do not exist. The head was
   translated; the private block was not.

   So the question this file asks is not «is the CSS valid» - it always is - but
   «does every name a coloured screen uses have a declaration in the sheets that
   screen actually loads». Both halves are read off disk, neither is typed here.

     node tools/vars.mjs                 every design/*.html and design/kit/*.html
     node tools/vars.mjs coach-verify-tier                       named screens   */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { ROOT, subject } from './lib.mjs';

/* Names declared by a stylesheet, and names it asks for. A declaration is
   `--x:` at the head of a declaration; a use is `var(--x`. The two patterns
   overlap on a line like `--a: var(--b)`, which is correct - it both declares
   and asks. */
const DECL = /(^|[;{\s])(--[A-Za-z0-9_-]+)\s*:/g;
const USE = /var\(\s*(--[A-Za-z0-9_-]+)/g;

/* THE COMMENTS HAD TO GO FIRST, and they are most of these files. Every
   component stylesheet here explains what the grey layer used to say, quoting
   `var(--dark)`, `--hair2`, `--strong` and `--fs-13-5` in prose - so an
   uncommented scan reported all nine of the grey names as orphans on all 174
   screens, which is every screen there is. A check that fires everywhere is
   describing itself, not the product. */
const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, ' ');

/* `var(--x, something)` CARRIES ITS OWN ANSWER. An undeclared name with a
   fallback draws the fallback and is not a defect; only the bare form is. */
function names(text, re) {
  const out = new Set();
  let m; re.lastIndex = 0;
  while ((m = re.exec(text))) out.add(m[m.length - 1]);
  return out;
}
const USE_BARE = /var\(\s*(--[A-Za-z0-9_-]+)\s*\)/g;

/* Every stylesheet a page pulls in, followed through @import, plus its own
   inline blocks. A page that loads nothing local is a page this check cannot
   judge, and it says so rather than passing it. */
/* `@import[^;]*["']([^"']+)["']` was the first version of the line below, and it
   was wrong in the way that is hardest to notice: it MATCHED 43 times on
   `index.css`, which has 43 imports, and every capture was `;\n@import `. A
   greedy `[^;]*` pushes the opening quote as far right as it can, so the pattern
   settled on the CLOSING quote of one import and the OPENING quote of the next,
   and the filename in between was never read. The count was right, the content
   was garbage, and the check then declared 86 screens broken over tokens that
   are declared exactly where they should be. A match count is not a result. */
const IMPORT = /@import\s+(?:url\(\s*)?["']([^"']+)["']/g;

function sheetsOf(htmlPath) {
  const html = readFileSync(htmlPath, 'utf8');
  const dir = dirname(htmlPath);
  const files = [];
  for (const m of html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)) {
    if (/^https?:/.test(m[1])) continue;
    files.push(resolve(dir, m[1]));
  }
  const seen = new Set(), text = [];
  const walk = f => {
    if (seen.has(f) || !existsSync(f)) return;
    seen.add(f);
    const s = readFileSync(f, 'utf8');
    text.push(s);
    for (const m of s.matchAll(IMPORT)) walk(resolve(dirname(f), m[1]));
  };
  for (const f of files) walk(f);
  /* A custom property does not have to come from a stylesheet. `--p` is written
     on the element by the markup and `--uiv-side-h` by `_nav.js` at runtime, and
     both are declarations as far as the cascade is concerned. A check that reads
     only .css calls them orphans and is wrong twice over. */
  const inline = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
  const attrs = [...html.matchAll(/style="([^"]*)"/g)].map(m => m[1]).join(';');
  const js = [];
  for (const m of html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)) {
    if (/^https?:/.test(m[1])) continue;
    const f = resolve(dir, m[1]);
    if (existsSync(f)) js.push(readFileSync(f, 'utf8'));
  }
  js.push(...[...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]));
  const setProp = [...js.join('\n').matchAll(/setProperty\(\s*['"](--[A-Za-z0-9_-]+)/g)].map(m => m[1] + ':').join(';');
  return { linked: text.join('\n'), inline, extra: attrs + ';' + setProp, nLinked: seen.size };
}

const args = process.argv.slice(2);
const named = args.filter(a => !a.startsWith('-'));
const SCREENS = named.length
  ? named.map(n => (n.includes('/') ? n : 'design/' + n) + '.html')
  : [...readdirSync(join(ROOT, 'design')).filter(f => f.endsWith('.html')).map(f => 'design/' + f),
     ...readdirSync(join(ROOT, 'design/kit')).filter(f => f.endsWith('.html')).map(f => 'design/kit/' + f)].sort();

let bad = 0, checked = 0;
const tally = new Map();
for (const rel of SCREENS) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) { console.log('MISS ' + rel); bad++; continue; }
  const { linked, inline, extra, nLinked } = sheetsOf(p);
  if (!nLinked) { console.log('SKIP ' + rel + '  (loads no local stylesheet)'); continue; }
  checked++;
  const L = strip(linked), I = strip(inline);
  const declared = new Set([...names(L, DECL), ...names(I, DECL), ...names(extra, DECL)]);
  const used = new Set([...names(L, USE_BARE), ...names(I, USE_BARE)]);
  const orphan = [...used].filter(n => !declared.has(n)).sort();
  if (!orphan.length) continue;
  bad++;
  for (const n of orphan) tally.set(n, (tally.get(n) || 0) + 1);
  console.log('FAIL ' + rel.replace('design/', '').padEnd(30) + orphan.length + ' undeclared: ' + orphan.join(' '));
}
if (tally.size) {
  console.log('\nby name:');
  for (const [n, c] of [...tally].sort((a, b) => b[1] - a[1])) console.log('  ' + n.padEnd(24) + c + ' screens');
}
console.log('\n' + checked + ' screens read  failures: ' + bad);
process.exit(bad ? 1 : 0);
