/* pattern.mjs - does a composition repeat, and on how many SCREENS.
   Stage 09 step 1 asks two things of one walk: what stands on three or more
   screens (a pattern) and what never happens twice on one screen (a prohibition).
   One pass, both harvests, because they are the same counter read in opposite
   directions.

   THE COUNTER RUNS ON THE GREY CORPUS AND THE PROOF ON THE COLOUR ONE, so the
   walk visits both and reports them in separate columns. `wireframes/` holds the
   whole product (142 screens since stage 04); `design/` holds the sample that
   moved to colour (88). A composition standing on three of five coloured screens
   is «almost everywhere in a sample», not a pattern - trap three of this stage.

   THE TWO CORPORA SHARE A CLASS VOCABULARY, which is why one signature can be
   asked of both: `design/listing.html` writes the same `.pcard > .ph .bd` as
   `wireframes/listing.html` and adds `btn--text btn--icon` on the controls
   inside it. Those additions belong to the system, not to the composition, so
   the signature drops them - otherwise every coloured screen would read as a
   different composition from its own grey original.

   THREE THINGS ARE MEASURED, and the second exists because the first was wrong.

   comp  - the full ordered child sequence of a named container. Exact, and
           BRITTLE: one extra child on one screen splits one composition into
           two. The first version of this file had only this measure, and the
           «section head followed by a row of cards» composition came back as
           four separate rows of four screens each instead of one of sixteen.
   pair  - every ADJACENT pair of named children under a named container. What
           actually survives a screen that has one block more than its neighbour.
   cls   - how many times each class occurs on each screen. This is the
           prohibition counter: a class whose maximum is 1 on every screen of
           the corpus is a candidate for «never more than one per screen».

   A MODIFIER IS NOT A DIFFERENT BRICK, and the first two versions of this file
   thought it was. Version one kept `btn--accent` whole, so the coloured screen
   and its own grey original read as two different compositions. Version two
   dropped every `btn--*` outright - and that was worse in the one place it
   mattered most: stage 08 renamed the grey `.btn.dark` to `.btn--accent`, so the
   drop left the child with NO class at all, the pair rule threw it away as
   unnamed, and «a row of two actions» came back as 81 grey screens against 0 in
   colour. The composition had not moved; the instrument had stopped seeing it.
   Now any class carrying `--` collapses to its base (`btn--accent` and `btn` are
   both `btn`, `field--s` is `field`, `menu--right` is `menu`) and the grey
   corpus's own primary marker `dark` is dropped beside `is-` and `has-`.
   A pattern is a composition of BRICKS; which variant of a brick a screen picked
   is the brick's business and is documented on its own stand page.

   ASKED OF THE DOM, NOT OF THE SOURCE. The sidebar is injected by `_nav.js` on
   load and would otherwise be the most repeated composition in the project, on
   all 230 screens; it is skipped by subtree. `.wf-bar` is the prototype's own
   state-switch strip rather than product markup, and is skipped for the same
   reason: it is chrome of the instrument, not of the product. */

import { writeFileSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { serve, chrome, pages, ROOT } from './lib.mjs';
import { Conn, newSession, visit } from './cdp.mjs';

function probe() {
  var DROPRE = /^(is-|has-|dark$|on$|off$|open$|active$|hidden$|show$|shown$|selected$|current$|cur$|done$|err$|ok$|wait$)/;
  function sig(el) {
    var raw = el.getAttribute('class') || '';
    var seen = {}, list = [];
    var parts = raw.trim().split(/\s+/);
    for (var i = 0; i < parts.length; i++) {
      var c = parts[i];
      if (!c || DROPRE.test(c)) continue;
      var base = c.indexOf('--') > 0 ? c.slice(0, c.indexOf('--')) : c;
      if (seen[base]) continue;
      seen[base] = 1; list.push(base);
    }
    list.sort();
    return el.tagName.toLowerCase() + (list.length ? '.' + list.join('.') : '');
  }
  var comp = {}, pair = {}, cls = {}, raw = {}, rawv = {};
  var all = document.body.querySelectorAll('*');
  for (var i = 0; i < all.length; i++) {
    var el = all[i];
    if (el.closest('#sidebar') || el.closest('.wf-bar')) continue;
    /* THE PROHIBITION COUNTER NEEDS THE UNNORMALISED NAME, and the normalised one
       cannot answer its question. «Never more than one `.btn--accent` per screen»
       is THE rule this substep exists to find, and the signature above folds
       `btn--accent` into `btn` on purpose - a pattern does not care which variant
       of a brick a screen picked, and a usage rule cares about nothing else. */
    var rawcls = (el.getAttribute('class') || '').trim().split(/\s+/);
    /* PRESENCE IS NOT VISIBILITY, and the difference is the whole answer on some
       screens. `account-profile` carries SEVEN elements marked `dark`, the grey
       layer's primary marker - and four of them are the confirm buttons of three
       dialogs that are closed. A rule read off presence would say «this screen has
       seven main actions» about a screen that shows three. Both readings are kept:
       `raw` counts what is in the document, `rawv` what has a box on it right now,
       and a class whose two numbers differ is a class that lives in an overlay. */
    var vis = el.getClientRects().length > 0;
    for (var rr = 0; rr < rawcls.length; rr++)
      if (rawcls[rr]) {
        raw[rawcls[rr]] = (raw[rawcls[rr]] || 0) + 1;
        if (vis) rawv[rawcls[rr]] = (rawv[rawcls[rr]] || 0) + 1;
      }

    var sown = sig(el);
    if (sown.indexOf('.') >= 0) {
      var own = sown.slice(sown.indexOf('.') + 1).split('.');
      for (var c = 0; c < own.length; c++) cls[own[c]] = (cls[own[c]] || 0) + 1;
    }

    var kids = [];
    for (var j = 0; j < el.children.length; j++) {
      var t = el.children[j].tagName;
      if (t === 'SCRIPT' || t === 'STYLE' || t === 'TEMPLATE') continue;
      kids.push(el.children[j]);
    }
    if (kids.length < 2) continue;
    var pSig = sig(el);
    if (pSig.indexOf('.') < 0) continue;              /* an unnamed container is structure, not composition */
    var kSigs = [], named = 0;
    for (var k = 0; k < kids.length; k++) {
      var s = sig(kids[k]);
      if (s.indexOf('.') >= 0) named++;
      kSigs.push(s);
    }
    if (named < 2) continue;                          /* one named child beside plain tags is not a composition */

    var run = [];
    for (var m = 0; m < kSigs.length; m++) {
      if (run.length && run[run.length - 1].s === kSigs[m]) run[run.length - 1].n++;
      else run.push({ s: kSigs[m], n: 1 });
    }
    var body = run.map(function (r) { return r.n > 1 ? r.s + '+' : r.s; }).join(' ');
    var ck = pSig + ' > ' + body;
    comp[ck] = (comp[ck] || 0) + 1;

    /* A RUN IS A PAIR TOO, and leaving it out hid the commonest composition in
       the product. Two buttons standing side by side collapse to one run of two,
       the adjacent-pair loop below never fires on a single run, and «a row of two
       actions» came back as 28 screens instead of 76. */
    for (var w = 0; w < run.length; w++) {
      if (run[w].n < 2 || run[w].s.indexOf('.') < 0) continue;
      var sk = pSig + ' > ' + run[w].s + ' | ' + run[w].s;
      pair[sk] = (pair[sk] || 0) + 1;
    }
    for (var q = 0; q + 1 < run.length; q++) {
      if (run[q].s.indexOf('.') < 0 || run[q + 1].s.indexOf('.') < 0) continue;
      var pk = pSig + ' > ' + (run[q].n > 1 ? run[q].s + '+' : run[q].s) +
        ' | ' + (run[q + 1].n > 1 ? run[q + 1].s + '+' : run[q + 1].s);
      pair[pk] = (pair[pk] || 0) + 1;
    }
  }
  return JSON.stringify({ comp: comp, pair: pair, cls: cls, raw: raw, rawv: rawv });
}

const EXPR = '(' + probe.toString() + ')()';

/* WHO OWNS A CLASS. A composition of bricks is a composition only if the bricks
   come from more than one brick. `.pcard > .ph .bd` is not a pattern - it is what
   `product-card.css` is made of, and the file that declares all three says so.
   The first draft had no such filter and reported 268 compositions on three or
   more screens, most of them the inside of a card: a threshold that returns a
   quarter of the corpus has measured nothing. */
function owners() {
  const map = new Map();
  const dir = join(ROOT, 'design/system/components');
  for (const f of readdirSync(dir).filter(n => n.endsWith('.css'))) {
    const css = readFileSync(join(dir, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const block of css.split('}')) {
      const sel = block.split('{')[0];
      if (!sel) continue;
      for (const m of sel.matchAll(/\.([A-Za-z][\w-]*)/g)) {
        if (!map.has(m[1])) map.set(m[1], new Set());
        map.get(m[1]).add(f.slice(0, -4));
      }
    }
  }
  return map;
}

/* WHAT THE SCREEN WRITES, AND WHAT A SCRIPT WRITES FOR IT.
   `wireframes/_nav.js` builds the header, the footer, the mega menu, the nav
   drawer, the city dialog and the tab bar, and BOTH corpora load it - a coloured
   screen pulls `../wireframes/_nav.js` first and then overrides parts of it with
   `design/_nav.js`. So those compositions stand on 134 of 142 grey screens and
   77 of 88 coloured ones while existing in exactly ONE place already: a function.
   Carving a pattern out of them would move a rule from one single source to
   another and call it progress.
   They are separated mechanically rather than by a list of names: a class that
   the DOM carries and the page's own source file never mentions was put there by
   a script. A composition all of whose classes are injected on every screen it
   appears on is chrome; anything else is markup the screens repeat by hand, and
   that is what this step is hunting. */
function injectedClasses(dir, page) {
  const src = readFileSync(join(ROOT, dir, page + '.html'), 'utf8');
  const have = new Set();
  for (const m of src.matchAll(/class\s*=\s*"([^"]*)"/g))
    for (const c of m[1].trim().split(/\s+/)) if (c) have.add(c.indexOf('--') > 0 ? c.slice(0, c.indexOf('--')) : c);
  return have;
}

const classesOf = key => [...key.matchAll(/\.([A-Za-z][\w-]*)/g)].map(m => m[1]);
const top = dir => pages(dir).filter(p => !p.includes('/'));

const args = process.argv.slice(2);
const width = Number((args.find(a => a.startsWith('--width=')) || '--width=390').split('=')[1]);
const minScreens = Number((args.find(a => a.startsWith('--min=')) || '--min=3').split('=')[1]);
const mode = (args.find(a => a.startsWith('--mode=')) || '--mode=pair').split('=')[1];
const jsonOut = (args.find(a => a.startsWith('--json=')) || '').split('=')[1];
const from = (args.find(a => a.startsWith('--from=')) || '').split('=')[1];
const showScreens = args.includes('--screens');

const grey = top('wireframes'), colour = top('design');
let data;

if (from) {
  data = JSON.parse(readFileSync(from, 'utf8'));
} else {
  const srv = await serve();
  const br = await chrome('pattern');
  const conn = await Conn.open(br.wsUrl);
  const { sessionId, inflight } = await newSession(conn);
  const acc = { comp: {}, pair: {}, cls: {}, raw: {}, rawv: {} };
  const add = (kind, key, dir, page, n) => {
    const bag = acc[kind];
    if (!bag[key]) bag[key] = { grey: {}, colour: {} };
    bag[key][dir === 'wireframes' ? 'grey' : 'colour'][page] = n;
  };
  for (const [dir, list] of [['wireframes', grey], ['design', colour]]) {
    for (const p of list) {
      let raw;
      try { raw = await visit(conn, sessionId, srv.base + '/' + dir + '/' + p + '.html', width, 900, EXPR, inflight); }
      catch (e) { console.log('FAIL ' + dir + '/' + p + '  ' + e.message); continue; }
      let m; try { m = JSON.parse(raw); } catch { console.log('BAD JSON ' + dir + '/' + p); continue; }
      for (const kind of ['comp', 'pair', 'cls', 'raw', 'rawv'])
        for (const key of Object.keys(m[kind])) add(kind, key, dir, p, m[kind][key]);
    }
  }
  br.stop(); srv.stop();
  data = acc;
}

if (jsonOut) { writeFileSync(jsonOut, JSON.stringify(data)); console.log('written ' + jsonOut); }

const own = owners();

/* per class: on how many screens it was in the source, and on how many it was not */
const srcHave = new Map();
for (const [dir, list] of [['wireframes', grey], ['design', colour]])
  for (const p of list) srcHave.set(dir + '/' + p, injectedClasses(dir, p));
const clsInj = new Map();
for (const [c, r] of Object.entries(data.cls)) {
  let inSrc = 0, total = 0;
  for (const [dir, key] of [['wireframes', 'grey'], ['design', 'colour']])
    for (const p of Object.keys(r[key])) { total++; if (srcHave.get(dir + '/' + p)?.has(c)) inSrc++; }
  clsInj.set(c, total && inSrc === 0);
}
/* CHROME IS DECIDED BY THE CONTAINER, and the first rule asked the whole key.
   It asked «is every class here injected» and answered «no» for the entire
   header, because `btn` and `field` are also written by hand on other screens:
   one shared class name was enough to let 66 chrome rows back in as findings.
   The container is the right subject - if the element the composition hangs off
   was put there by a script, so was the composition. `div.wf-canvas` stays out of
   chrome on purpose: the canvas is written by every page, and the fact that it
   holds an injected header and footer is exactly what makes the page shell a
   composition rather than a component. */
const isChrome = key => classesOf(key.split(' > ')[0]).some(c => clsInj.get(c));

console.log('corpus  grey ' + grey.length + ' screens  ·  colour ' + colour.length + ' screens  ·  width ' + width +
  '  ·  classes owned by a component file ' + own.size);

if (mode === 'cls' || mode === 'raw' || mode === 'rawv') {
  /* THE PROHIBITION COUNTER, and it is read backwards: a class whose maximum on
     any one screen is 1, over every screen it stands on, has never once been
     doubled. That is a CANDIDATE for a rule, not a rule - the difference between
     a real one and a class that simply has not repeated yet is a judgement, and
     the owner makes it. */
  const rows = Object.entries(data[mode]).map(([c, r]) => {
    const g = Object.values(r.grey), d = Object.values(r.colour);
    const gm = g.length ? Math.max(...g) : 0, dm = d.length ? Math.max(...d) : 0;
    return { c, greyScreens: g.length, greyMax: gm, colourScreens: d.length, colourMax: dm,
      owner: [...(own.get(c) || [])].sort().join(',') };
  }).filter(r => r.greyScreens >= minScreens && r.greyMax === 1 && r.colourMax <= 1)
    .sort((a, b) => b.greyScreens - a.greyScreens);
  console.log('classes never doubled on any one screen, standing on ' + minScreens + '+ grey screens: ' + rows.length);
  for (const r of rows)
    console.log(String(r.greyScreens).padStart(4) + ' grey /' + String(r.colourScreens).padStart(3) +
      ' colour   .' + r.c + '   [' + (r.owner || 'no component') + ']' + (clsInj.get(r.c) ? '  (script)' : ''));
} else {
  const bag = data[mode];
  const rows = Object.entries(bag).map(([key, r]) => {
    const cls = classesOf(key);
    let inter = null;
    for (const c of cls) {
      const set = own.get(c);
      if (!set) { inter = new Set(); break; }
      inter = inter === null ? new Set(set) : new Set([...inter].filter(x => set.has(x)));
      if (!inter.size) break;
    }
    return { key,
      greyScreens: Object.keys(r.grey).length, colourScreens: Object.keys(r.colour).length,
      greyN: Object.values(r.grey).reduce((a, b) => a + b, 0),
      grey: Object.keys(r.grey).sort(), colour: Object.keys(r.colour).sort(),
      inside: inter && inter.size ? [...inter].sort() : [],
      span: [...new Set(cls.flatMap(c => [...(own.get(c) || [])]))].sort(),
      unowned: [...new Set(cls.filter(c => !own.has(c)))] };
  }).sort((a, b) => b.greyScreens - a.greyScreens || b.greyN - a.greyN);

  const wanted = rows.filter(r => r.greyScreens >= minScreens);
  const chrome = wanted.filter(r => isChrome(r.key));
  const internal = wanted.filter(r => !isChrome(r.key) && r.inside.length);
  const spanning = wanted.filter(r => !isChrome(r.key) && !r.inside.length);
  console.log('mode ' + mode + '  ·  distinct ' + rows.length + '  ·  on ' + minScreens + '+ grey screens ' +
    wanted.length + ' (written by a script ' + chrome.length + ', one component\'s own anatomy ' +
    internal.length + ', markup the screens repeat ' + spanning.length + ')' +
    '  ·  on exactly 2 ' + rows.filter(r => r.greyScreens === 2 && !r.inside.length).length +
    '  ·  on 1 ' + rows.filter(r => r.greyScreens === 1).length +
    '  ·  colour only ' + rows.filter(r => r.greyScreens === 0).length);
  for (const r of spanning) {
    console.log(String(r.greyScreens).padStart(3) + ' grey /' + String(r.colourScreens).padStart(3) + ' colour  x' +
      String(r.greyN).padStart(4) + '   ' + r.key);
    console.log('        [' + (r.span.join(', ') || '-') + ']' +
      (r.unowned.length ? '  no component: ' + r.unowned.join(' ') : ''));
    if (showScreens) {
      console.log('        grey: ' + r.grey.join(' '));
      if (r.colour.length) console.log('      colour: ' + r.colour.join(' '));
    }
  }
}
