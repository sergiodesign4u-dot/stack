/* tools/census.mjs - THE CONTROL CENSUS, AND THIS TIME IT IS AN INSTRUMENT.

   Stage 08 step 6 asks for «два заміри одним приладом»: step 1 walks the corpus
   BEFORE the system and step 6 walks it AFTER, proving every line of the first
   is closed. Opening that step, the prilad was gone. `census.md` produced 22 229
   observations over 180 screens and closes with its own sentence - «the script
   is the artifact, not the table» - and the script was never kept. Only
   `btn-census.json` survived, which is the RESULT.

   So the second measurement could not be «the same instrument» until there was
   one. This file is it, rebuilt from the METHOD as census.md states it, not from
   memory, and it stays in tools/ so the third measurement costs one command.
   Same move as proof.mjs at 7.20, and for the same reason: a half shot in
   conditions nobody recorded cannot be compared with anything.

   WHAT IS COPIED FROM THE SPEC, VERBATIM, AND WHY EACH CLAUSE IS THERE:

   - Two viewports, 390 and 1280. «the desktop header, the mega menu and the
     filter rail do not exist at mobile width and would have been missed». The
     `.go` finding in census.md was withdrawn for exactly this.
   - In a browser, never by grep. The header is injected by `_nav.js` and is not
     in the markup at all.
   - COMPUTED style, not the rule that was written: a class named `dark` renders
     white inside `#coach-banner`, and only getComputedStyle says so.
   - A control is `a` / `button` / `label` / `[role=button]` / `[onclick]`, OR it
     INTRODUCES `cursor:pointer` that its parent does not have. The second clause
     catches divs acting as controls; the word «introduces» is what stops an svg
     inside a button counting as a second button.
   - Boxy control: carries a fill or a border, height 22 to 84.

   WHAT IS NOT REPRODUCED, AND SAID OUT LOUD RATHER THAN TUNED. census.md folds
   the boxy controls into 24 «forms» on four axes and excludes chips, tabs,
   thumbnails, option rows, pagination, brand cards and fields from the action
   family - by a list of classes that was in the lost script and is nowhere in
   the prose. This file therefore reports the RAW layers (controls -> boxy) and
   groups by class, which is what step 6's three lists actually need; the 24-form
   folding stays a fact of step 1's record. Tuning the numbers until they matched
   a published table would prove nothing except that they can be tuned.

     node tools/census.mjs                    both corpora, both widths
     node tools/census.mjs --dir wireframes   one corpus
     node tools/census.mjs --w 390            one width
     node tools/census.mjs --json out.json    keep the raw record  */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, pages, ROOT, ARG_OPENERS, NAMES, sweepOf, safeOpeners, droppedOpeners } from './lib.mjs';
import { writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2);

/* =========================================================================
   --lists <raw.json>  -  THE THREE LISTS OF STEP 6, off the walk that already
   happened. No browser here: the walk is the expensive half and it is done.

   The pack names them and warns that the third is the easy one to miss:
     1  product -> system   a control the system has no rule for
     2  system -> product   the class exists and the screen redraws it anyway
     3  a class nobody wears

   ONE DISTINCTION THIS FILE INSISTS ON, because without it list 1 is noise: a
   control whose SCREEN was never coloured is not a hole in the system. 54 of
   the grey layer's 141 screens have no coloured twin, and every control on them
   is grey by that fact alone. Those are tirage, not gaps, and they are counted
   apart. `rev-google` is the whole argument: one instance, on
   `content-reviews`, a screen nobody has coloured yet. */
if (argv.includes('--lists')) {
  const raw = JSON.parse(readFileSync(argv[argv.indexOf('--lists') + 1], 'utf8'));
  const rec = raw.rec;
  /* COMMENTS, url() AND QUOTED STRINGS ALL GO BEFORE A CLASS IS EXTRACTED, and
     the first run of list 3 says why: it reported svg, jpg, png and html as
     component classes nobody wears. They are not classes at all - they are the
     tails of `url(../../visuals/mascot-gym-a.jpg)` and of
     `a[href="index.html"]`. A dot followed by letters is a class only outside a
     string, and «not preceded by an identifier character» would have been the
     wrong rule: it kills `a.btn` and the second half of `.btn.dark`. */
  const strip = t => t.replace(/\/\*[\s\S]*?\*\//g, ' ')
                      .replace(/url\([^)]*\)/g, ' ')
                      .replace(/"[^"]*"|'[^']*'/g, ' ');

  /* every class a component file styles */
  const owned = new Map();                       /* class -> file */
  const CDIR = join(ROOT, 'design/system/components');
  for (const f of readdirSync(CDIR)) {
    const css = strip(readFileSync(join(CDIR, f), 'utf8'));
    for (const m of css.matchAll(/\.(-?[a-z][a-z0-9_-]*)/gi))
      if (!owned.has(m[1])) owned.set(m[1], f);
  }

  /* every class that RENDERED as a CONTROL, per corpus - list 1 asks about
     controls, so this map is built from the control rows on purpose. */
  const seen = { wireframes: new Map(), design: new Map() };
  for (const r of rec) {
    if (r.cls === '(no class)') continue;
    for (const c of r.cls.split('.')) {
      const m = seen[r.dir]; if (!m) continue;
      if (!m.has(c)) m.set(c, new Set());
      m.get(c).add(r.page);
    }
  }
  /* every class that rendered AT ALL - list 3 asks about anything the product
     wears, clickable or not. */
  const wornBy = { wireframes: new Map(), design: new Map() };
  for (const [k, list] of Object.entries(raw.worn || {})) {
    const i = k.indexOf('|'); const d = k.slice(0, i), pg = k.slice(i + 1);
    const m = wornBy[d]; if (!m) continue;
    for (const c of list) { if (!m.has(c)) m.set(c, new Set()); m.get(c).add(pg); }
  }

  /* THE HUB IS NOT THE PRODUCT, and list 1 found that out by returning exactly
     two «holes»: flowlink and sm-item, both on wireframes/overview.html and
     nowhere else. That page lists the screens, it is not one of them - the same
     line already drawn through kit/ and concept/ on the coloured side, and
     CLAUDE.md draws it by name: «A hub is always overview.html». Excluded here
     rather than in the walk because the walk's raw record should keep every
     observation it took; what a list DECIDES to count is the list's business. */
  const HUB = p => p === 'overview';

  const greyOnly = new Set(pages('wireframes')
    .filter(p => !pages('design').includes(p)));

  console.log('===== СПИСОК 1 - ПРОДУКТ -> СИСТЕМА =====');
  console.log('(контрол рендериться в сірому, а правила в системі немає)');
  const gap = [], tirage = [];
  for (const [c, ps0] of seen.wireframes) {
    if (owned.has(c)) continue;
    if (seen.design.has(c)) continue;
    const ps = [...ps0].filter(p => !HUB(p));
    if (!ps.length) continue;
    (ps.every(p => greyOnly.has(p)) ? tirage : gap).push([c, ps.length]);
  }
  gap.sort((a, b) => b[1] - a[1]); tirage.sort((a, b) => b[1] - a[1]);
  console.log('\nДІРА В СИСТЕМІ - екран у кольорі є, контрола немає (' + gap.length + '):');
  for (const [c, n] of gap.slice(0, 40)) console.log('  ' + c.padEnd(26) + n + ' екранів');
  console.log('\nТИРАЖ, А НЕ ДІРА - усі входження на ще-сірих екранах (' + tirage.length + '):');
  for (const [c, n] of tirage.slice(0, 30)) console.log('  ' + c.padEnd(26) + n + ' екранів');

  console.log('\n\n===== СПИСОК 3 - КЛАС, ЯКОГО НІХТО НЕ НОСИТЬ =====');
  console.log('(правило в компоненті є, у продукті не трапляється жодного разу)');
  /* AND THE LAST CUT, WHICH IS THE ONE THAT MAKES LIST 3 USABLE. Even with the
     opener sweep the walk cannot reach a state that needs a SCROLL (pdp-tabs'
     `stuck`, the header's `uiv-scrolled`) or a later step of a flow the openers
     only start (`auth-load`, `auth-spin`). Calling those dead would delete live
     code. So the question is asked of the SCRIPTS: does anything in the product
     write this class name? Written by a script means reachable and simply not
     reached here; mentioned nowhere at all is the only honest «dead». */
  let js = '';
  for (const f of ['design/_nav.js', 'wireframes/_nav.js', 'design/system/theme.js'])
    { try { js += readFileSync(join(ROOT, f), 'utf8'); } catch (e) {} }
  for (const d of ['design', 'wireframes'])
    for (const f of readdirSync(join(ROOT, d)).filter(x => x.endsWith('.html'))) {
      const t = readFileSync(join(ROOT, d, f), 'utf8');
      for (const m of t.matchAll(/<script>[\s\S]*?<\/script>/g)) js += m[0];
    }
  const scripted = c => new RegExp('["\'\\s.(]' + c.replace(/-/g, '\\-') + '["\'\\s)]').test(js);

  const dead = [], waiting = [], byState = [];
  for (const [c, f] of owned) {
    if (wornBy.design.has(c)) continue;
    if (wornBy.wireframes.has(c)) { waiting.push([c, f]); continue; }
    (scripted(c) ? byState : dead).push([c, f]);
  }
  const group = arr => { const g = {}; for (const [c, f] of arr) (g[f] = g[f] || []).push(c); return g; };
  const gd = group(dead), gw = group(waiting);
  console.log('\nМЕРТВИЙ - не носить ніхто в жодному з двох шарів (' + dead.length + ' у ' +
    Object.keys(gd).length + ' файлах):');
  for (const f of Object.keys(gd).sort((a, b) => gd[b].length - gd[a].length).slice(0, 14))
    console.log('  ' + f.padEnd(24) + String(gd[f].length).padStart(3) + '  ' + gd[f].slice(0, 7).join(' '));
  const gs = group(byState);
  console.log('\nЗА СТАНОМ, ЯКОГО ОБХІД НЕ ДОСЯГ - клас пише скрипт (' + byState.length + '):');
  for (const f of Object.keys(gs).sort((a, b) => gs[b].length - gs[a].length).slice(0, 10))
    console.log('  ' + f.padEnd(24) + String(gs[f].length).padStart(3) + '  ' + gs[f].slice(0, 7).join(' '));
  console.log('\nЧЕКАЄ НА СВІЙ ЕКРАН - носить сірий шар, кольорового екрана ще немає (' +
    waiting.length + '):');
  for (const f of Object.keys(gw).sort((a, b) => gw[b].length - gw[a].length).slice(0, 10))
    console.log('  ' + f.padEnd(24) + String(gw[f].length).padStart(3) + '  ' + gw[f].slice(0, 7).join(' '));
  process.exit(0);
}

const opt = (n, d) => { const i = argv.indexOf('--' + n); return i > -1 ? argv[i + 1] : d; };
const DIRS = opt('dir') ? [opt('dir')] : ['wireframes', 'design'];
const WIDTHS = opt('w') ? [Number(opt('w'))] : [390, 1280];
const OUT = opt('json');

/* No backtick may appear below this line and above the closing quote - one
   backtick ends the template literal and the file stops being JavaScript. The
   rule is written twice in tools/theme.mjs because it has been broken twice. */
const M = `(() => {
  const px = v => Math.round(parseFloat(v) || 0);
  const rows = [];
  const all = document.querySelectorAll('*');
  for (const e of all) {
    const s = getComputedStyle(e);
    const tag = e.tagName.toLowerCase();
    const named = tag === 'a' || tag === 'button' || tag === 'label' ||
                  e.getAttribute('role') === 'button' || e.hasAttribute('onclick');
    let pointer = false;
    if (!named && s.cursor === 'pointer') {
      const p = e.parentElement;
      pointer = !p || getComputedStyle(p).cursor !== 'pointer';
    }
    if (!named && !pointer) continue;
    const r = e.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (s.visibility === 'hidden' || s.display === 'none') continue;

    const bg = s.backgroundColor;
    const filled = bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
    const bw = px(s.borderTopWidth) + px(s.borderRightWidth) +
               px(s.borderBottomWidth) + px(s.borderLeftWidth);
    const h = Math.round(r.height);
    const boxy = (filled || bw > 0) && h >= 22 && h <= 84;

    const cls = (typeof e.className === 'string' && e.className.trim())
      ? e.className.trim().split(/\\s+/).sort().join('.') : '(no class)';
    rows.push({
      tag: tag, cls: cls, boxy: boxy ? 1 : 0, named: named ? 1 : 0,
      h: h, w: Math.round(r.width),
      bg: bg, bc: s.borderTopColor, bw: px(s.borderTopWidth),
      rad: s.borderTopLeftRadius, fs: s.fontSize, fw: s.fontWeight,
      col: s.color, pad: px(s.paddingTop) + '/' + px(s.paddingRight),
      txt: (e.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 40)
    });
  }
  /* EVERY CLASS ON THE PAGE, not only the ones a CONTROL wears - and the first
     run of list 3 is why this line exists. The map was built from the control
     rows alone, so «a class the product never wears» was really «a class no
     CLICKABLE element wears», and it called 962 classes dead - coach, wfh and
     cs-wrap among them, the wrapper of the whole coach cabinet. A number that
     large out of a checker is not a finding, it is a confession.
     And the comment you are reading broke this file on its first write, with
     backticks around those three names: the ban is stated eight lines up, and
     theme.mjs states it twice because it has been broken twice. Three now.

     THE LOOP ALSO USED TO SKIP display:none, and that skip cost the step its
     fourth wrong answer AND a wasted 35-minute walk. menu-pop came out dead;
     asked straight, the browser answers TWO of them on design/listing.html -
     design/system/menu.js builds the popup at wire time and CSS hides it until
     it opens. List 3 asks whether the product ever WEARS a class, not whether
     it is painted at load, so the skip was answering a neighbouring question.
     That is the shape of every error this instrument has made: 962 dead from
     reading only control rows, svg/jpg/png/html from the tails of url(), 35
     states from not opening anything, menu-pop from not counting the hidden.

     And the paragraph above broke the file a SECOND time, on the same rule as
     the paragraph before it - four backticks, in the sentence explaining the
     previous break. There is no backtick anywhere in this literal now, and the
     way to keep it that way is to write CSS and code names bare. */
  const cls = new Set();
  for (const e of document.querySelectorAll('[class]')) {
    const cn = typeof e.className === 'string' ? e.className : '';
    for (const c of cn.trim().split(/\\s+/)) if (c) cls.add(c);
  }
  return JSON.stringify({ rows: rows, cls: [...cls] });
})()`;

/* THE SUBJECT IS THE PRODUCT, NOT THE STAND, and the first smoke run proved why
   the line has to be drawn in code. `pages('design')` answers 204, because it
   walks `design/kit/` and `design/concept/` too - and a census that counts the
   stand's own demo buttons is measuring the showcase of the system with the
   instrument built to measure its subject. «Код і вітрина не змішуються» is the
   stage's rule; here it decides a number. 204 -> 87 screens plus the hub. */
const product = dir => pages(dir).filter(p => !p.startsWith('kit/') && !p.startsWith('concept/'));

const srv = await serve();
const l = await chrome('census');
const conn = await Conn.open(l.wsUrl);

const rec = [];                       /* one row per observation */
const worn = {};                      /* dir|page -> every class rendered there */
const safeFor = new Map();            /* dir|page -> openers that do not leave it */
let loads = 0, opened = 0, missing = 0;
for (const dir of DIRS) {
  const PS = product(dir);
  for (const w of WIDTHS) {
    process.stdout.write('\n' + dir + ' @' + w + ' ');
    for (const p of PS) {
      const s = await newSession(conn);
      let got = { rows: [], cls: [] };
      const url = `${srv.base}/${dir}/${p}.html`;
      try {
        /* THE SWEEP RUNS BEFORE THE READ, and list 3 is why. Without it the walk
           called twelve classes of cat-overlay.css dead, plus the language menu,
           the account menu, the toast and pdp-tabs' `stuck` - every one of them
           alive and simply not open. census.md withdrew exactly this finding once
           already, about `.tbuy`: «the form exists, it is behind a state, and a
           static walk cannot see a state». */
        await visit(conn, s.sessionId, url, w, 900, '1', s.inflight);
        if (!safeFor.has(dir + '|' + p)) {
          const nm = await conn.send('Runtime.evaluate', { expression: NAMES, returnByValue: true }, s.sessionId);
          const calls = JSON.parse(nm.result.value).map(n => n + '()').concat(ARG_OPENERS);
          safeFor.set(dir + '|' + p, await safeOpeners({ conn, newSession, visit }, url, calls));
          await visit(conn, s.sessionId, url, w, 900, '1', s.inflight);
        }
        const sw = await conn.send('Runtime.evaluate', { expression: sweepOf(safeFor.get(dir + '|' + p)), returnByValue: true }, s.sessionId);
        opened += Number(sw.result.value) || 0;
        await new Promise(r => setTimeout(r, 160));
        const res = await conn.send('Runtime.evaluate', { expression: M, returnByValue: true }, s.sessionId);
        got = JSON.parse(res.result.value);
      } catch (e) { missing++; }
      for (const r of got.rows) { r.dir = dir; r.w_vp = w; r.page = p; rec.push(r); }
      const key = dir + '|' + p;
      if (!worn[key]) worn[key] = new Set();
      for (const c of got.cls) worn[key].add(c);
      await conn.send('Target.closeTarget', { targetId: s.targetId });
      loads++;
      if (loads % 20 === 0) process.stdout.write('.');
    }
  }
}
l.stop(); srv.stop();

/* ---- the layers, in the order census.md names them ---------------------- */
const by = (f, pred) => rec.filter(pred || (() => true))
  .reduce((m, r) => (m[f(r)] = (m[f(r)] || 0) + 1, m), {});
const line = (k, v) => '  ' + String(k).padEnd(34) + String(v).padStart(7);

console.log('\n\n===== КОРПУС =====');
console.log(line('завантажень (екран x ширина)', loads));
if (missing) console.log(line('сторінок, що не відкрились', missing));
console.log(line('відкрито панелей перед читанням', opened));
console.log(line('відкинуто, бо покидають сторінку', droppedOpeners().join(' ') || 'ЖОДНОГО'));
console.log(line('спостережень клікабельного', rec.length));
for (const dir of DIRS)
  console.log(line('  з них ' + dir, rec.filter(r => r.dir === dir).length));
const boxy = rec.filter(r => r.boxy);
console.log(line('з них коробчастих (заливка або', ''));
console.log(line('  рамка, висота 22-84)', boxy.length));
for (const dir of DIRS)
  console.log(line('  з них ' + dir, boxy.filter(r => r.dir === dir).length));

/* ---- дрейф усередині сім'ї, як його рахує census.md --------------------- */
const drift = (f, set) => Object.entries(by(f, r => r.boxy && set(r)))
  .sort((a, b) => b[1] - a[1]);
for (const dir of DIRS) {
  const inDir = r => r.dir === dir;
  console.log('\n===== ДРЕЙФ У КОРОБЧАСТИХ: ' + dir + ' =====');
  for (const [name, f] of [['колір рамки', r => r.bc], ['радіус', r => r.rad],
                           ['кегль', r => r.fs], ['товщина рамки', r => r.bw + 'px'],
                           ['паддінг', r => r.pad]]) {
    const d = drift(f, inDir);
    console.log(line(name + ' - різних значень', d.length));
  }
}

const wornOut = {};
for (const k of Object.keys(worn)) wornOut[k] = [...worn[k]];
if (OUT) { writeFileSync(OUT, JSON.stringify({ measured: rec.length, loads, rec, worn: wornOut }, null, 0));
  console.log('\nсирий запис: ' + OUT); }
process.exit(0);
