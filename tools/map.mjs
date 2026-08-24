/* tools/map.mjs - WHAT IS THIS SCREEN MADE OF, AND WHAT MOVES IF I CHANGE THIS TOKEN

   Stage 13, step 3. The map of correspondences: screen -> zone -> component ->
   tokens -> microcopy address, and the REVERSE list that is the whole reason the
   map exists - «if I change this token, what goes with it».

   IT IS TAKEN, NEVER RECALLED. Four sources, each answering exactly one question:

     screen -> components   the classes that actually RENDER, read out of the DOM
                            in a browser. Not a grep: a third of this product's
                            markup is written by `wireframes/_nav.js` at load, so
                            the header, the footer, the tab-bar and every dialog
                            are invisible to a reader of the screen file. A
                            component is on a screen if at least one of its ANCHOR
                            classes renders there, and an anchor is a class
                            exactly one component file declares - the same rule
                            `inventory.mjs` question F uses, and the same reason:
                            `.on`, `.tag`, `.ar` belong to several files at once.
     component -> tokens    `var(--x)` in its own css, minus what it declares for
                            itself, split by whether `tokens.css` calls the name
                            semantic. Same reading as `roles.mjs`.
     role -> primitive      the semantic block's own declarations.
     screen -> zones        the `Зона` column of that screen's section in
                            `voice/docs/microcopy.md`.

   THE REVERSE LIST IS AN INVERSION OF THOSE DATA, NOT A SECOND PASS OVER THE
   CODE. Two editions of one fact drift, and the one used less often drifts
   first - so the map is built once and turned over.

   AND THE INVERSION OPENS IN TWO KNEES. A component never reads a colour
   primitive: measured today, `--orange-500` has 0 readers in `components/` and 6
   in `tokens.css`. A one-knee inversion would therefore report the ENTIRE
   primitive layer as dead. The chain is component -> semantic role -> primitive,
   and a primitive's screens are the union of the screens of every role that
   reads it.

   TWO CASES THE FOUR SOURCES DO NOT COVER, both about the global layer:

     - the header, footer and tab-bar strings live in cluster 0 of
       `microcopy.md`, a section that has no «screen» heading by construction.
       They get the zone «глобальна» and their screens are ALL screens.
     - a component that renders only from a script is still found, because the
       walk reads the DOM. It is named separately below so the number is visible
       rather than assumed.

     node tools/map.mjs              the numbers and the idle control
     node tools/map.mjs --write      and write handoff/docs/map.md from them
     node tools/map.mjs --token --bg-action    one token, both knees */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, serve, chrome, pages, ARG_OPENERS, NAMES, sweepOf, safeOpeners, droppedOpeners } from './lib.mjs';
import { Conn, newSession, visit } from './cdp.mjs';

const WRITE = process.argv.includes('--write');
const ONE = process.argv.includes('--token') ? process.argv[process.argv.indexOf('--token') + 1] : null;

const CDIR = join(ROOT, 'design/system/components');
const PDIR = join(ROOT, 'design/system/patterns');
const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, '');
const cssOf = f => readFileSync(existsSync(join(CDIR, f)) ? join(CDIR, f) : join(PDIR, f), 'utf8');
const files = [...readdirSync(CDIR).filter(f => f.endsWith('.css')),
               ...readdirSync(PDIR).filter(f => f.endsWith('.css'))];
const isPattern = f => existsSync(join(PDIR, f));

const classesOf = f => new Set([...strip(cssOf(f)).matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map(m => m[1]));
const owners = {};
for (const f of files) for (const c of classesOf(f)) (owners[c] ||= []).push(f);
const anchorsOf = f => [...classesOf(f)].filter(c => owners[c].length === 1);

/* ---------- component -> tokens ---------- */
const TOKENS = readFileSync(join(ROOT, 'design/system/tokens.css'), 'utf8');
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
const allTokens = new Set([...strip(TOKENS).matchAll(/(?:^|[{;])\s*(--[a-z0-9-]+)\s*:/gm)].map(m => m[1]));
const primitives = [...allTokens].filter(t => !semantic.has(t));

/* role -> the primitives its declaration reads, in BOTH themes: a role whose
   dark half reads a different primitive would otherwise hide half its chain. */
const roleReads = {};
for (const m of strip(TOKENS).matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
  if (!semantic.has(m[1])) continue;
  (roleReads[m[1]] ||= new Set());
  for (const v of m[2].matchAll(/var\((--[a-z0-9-]+)/g)) roleReads[m[1]].add(v[1]);
}
const compReads = {};
for (const f of files) {
  const css = strip(cssOf(f));
  const own = new Set([...css.matchAll(/(?:^|[{;])\s*(--[a-z0-9-]+)\s*:/gm)].map(m => m[1]));
  compReads[f] = new Set([...css.matchAll(/var\((--[a-z0-9-]+)/g)].map(m => m[1]).filter(t => !own.has(t)));
}

/* ---------- screen -> zones, from microcopy ---------- */
const micro = readFileSync(join(ROOT, 'voice/docs/microcopy.md'), 'utf8');
const zonesOf = {};
let globalZones = new Set();
{
  const secs = micro.split(/^### /m).slice(1);
  for (const s of secs) {
    const head = s.split('\n')[0];
    const names = [...head.matchAll(/([a-z0-9-]+)\.html/g)].map(m => m[1]);
    const zs = new Set();
    for (const l of s.split('\n')) {
      if (!l.startsWith('| ')) continue;
      const c = l.split('|').map(x => x.trim());
      if (c.length < 5 || c[1] === 'Зона' || /^[-: ]+$/.test(c[1]) || !c[1]) continue;
      zs.add(c[1]);
    }
    if (!zs.size) continue;
    if (names.length) for (const n of names) zonesOf[n] = new Set([...(zonesOf[n] || []), ...zs]);
    else for (const z of zs) globalZones.add(z);
  }
}

/* ---------- screen -> IA node, from the one place it is written ---------- */
const rollout = readFileSync(join(ROOT, 'design/kit/docs/rollout.md'), 'utf8');
const nodeOf = {};
for (const l of rollout.split('\n')) {
  const m = l.match(/^\| f\d \| ([^|]+) \| [^|]+ \| `([a-z0-9-]+)\.html`/);
  if (m) nodeOf[m[2]] = m[1].trim();
}

/* ---------- the walk ---------- */
const EXPR = `(() => { var s = new Set();
  document.querySelectorAll('body *').forEach(function(e){
    if (e.classList) e.classList.forEach(function(c){ s.add(c); }); });
  return JSON.stringify([...s]); })()`;
/* THE ONE PAGE IN design/ THAT IS NOT A SCREEN. `overview.html` is the coverage
   map - the page that DESCRIBES the registry - and it stands outside `DESIGN_NAV`
   by the same declared exception `rollout-table.mjs` prints. The exception carries
   its own idle control below: if the file ever enters the registry, or ever stops
   existing, the run says so rather than quietly excusing something else. */
const OUT_OF_SUBJECT = 'overview';
const NAV = readFileSync(join(ROOT, 'design/_nav.js'), 'utf8');
const navList = (() => {
  const b = NAV.slice(NAV.indexOf('var DESIGN_NAV = ['), NAV.indexOf('];', NAV.indexOf('var DESIGN_NAV = [')));
  return [...b.matchAll(/'([a-z0-9-]+)\.html'/g)].map(m => m[1]);
})();
const corpus = pages('design').filter(p => !p.startsWith('kit/') && !p.startsWith('concept/')
  && p !== OUT_OF_SUBJECT);
const exemptBad = [];
if (navList.includes(OUT_OF_SUBJECT)) exemptBad.push(OUT_OF_SUBJECT + ' стоїть у DESIGN_NAV - виняток більше не потрібен');
if (!existsSync(join(ROOT, 'design', OUT_OF_SUBJECT + '.html'))) exemptBad.push(OUT_OF_SUBJECT + ' не існує - виняток нікого не покриває');

const srv = await serve();
const l = await chrome('map');
const conn = await Conn.open(l.wsUrl);
const seen = {}, restOnly = {}, failed = [];
let opened = 0, sweeps = 0;
for (const p of corpus) {
  const s = await newSession(conn);
  const url = `${srv.base}/design/${p}.html`;
  try {
    /* AT REST FIRST, THEN AFTER THE PANELS ARE OPENED, AND THE TWO ARE COUNTED
       APART. A walk that reads the document as it loads cannot see a component
       that only renders after a click - the first run of this file reported
       `cat-overlay.css` as «on no screen at all» when it is the mobile catalogue
       overlay. That is the class `steps.mjs` was written for, and the cure is the
       one `theme.mjs` already uses: call every opener the page declares, dropping
       the ones that navigate away. */
    const rest = new Set(JSON.parse(await visit(conn, s.sessionId, url, 1280, 900, EXPR, s.inflight)));
    restOnly[p] = rest;
    const nm = await conn.send('Runtime.evaluate', { expression: NAMES, returnByValue: true }, s.sessionId);
    const calls = JSON.parse(nm.result.value).map(n => n + '()').concat(ARG_OPENERS);
    const safe = await safeOpeners({ conn, newSession, visit }, url, calls);
    await visit(conn, s.sessionId, url, 1280, 900, '1', s.inflight);
    const sw = await conn.send('Runtime.evaluate', { expression: sweepOf(safe), returnByValue: true }, s.sessionId);
    opened += Number(sw.result.value) || 0; sweeps++;
    await new Promise(r => setTimeout(r, 160));
    const after = await conn.send('Runtime.evaluate', { expression: EXPR, returnByValue: true }, s.sessionId);
    seen[p] = new Set([...rest, ...JSON.parse(after.result.value)]);
  }
  catch { failed.push(p); } finally { await s.close(); }
}
l.stop(); srv.stop();

/* ---------- screen -> components, and its inverse in the same pass ---------- */
const anchors = {}; for (const f of files) anchors[f] = anchorsOf(f);
const onScreen = {}, compScreens = {};
for (const f of files) compScreens[f] = [];
for (const p of Object.keys(seen)) {
  onScreen[p] = files.filter(f => anchors[f].length && anchors[f].some(c => seen[p].has(c)));
  for (const f of onScreen[p]) compScreens[f].push(p);
}
const noAnchor = files.filter(f => !anchors[f].length);
/* THE GLOBAL LAYER, DERIVED RATHER THAN LISTED. A component on EVERY screen is
   there because the shared runtime writes it into every page, not because 141
   screens each chose it. The threshold is «all of them» rather than a percentage:
   a percentage needs a number nobody can defend, and a component on 140 of 141 is
   a finding about the 141st rather than a member of the global layer. */
const GLOBAL = files.filter(f => anchors[f].length && compScreens[f].length === Object.keys(seen).length);

/* ---------- THE INVERSION - one turn of the same data, two knees ---------- */
const roleScreens = {}, roleComps = {};
for (const t of semantic) {
  roleComps[t] = files.filter(f => compReads[f].has(t));
  roleScreens[t] = new Set(roleComps[t].flatMap(f => compScreens[f]));
}
/* A PRIMITIVE CAN ALSO BE READ BY ANOTHER PRIMITIVE, and the two-knee rule does
   not cover it. `--grid-col-fluid` is a clamp() whose floor is
   `--grid-col-min-narrow`; a chain that only walks role -> primitive reported the
   floor as unreachable. So the primitive layer is closed transitively FIRST, and
   only then handed to the roles. */
const primReads = {};
for (const m of strip(TOKENS).matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
  if (semantic.has(m[1])) continue;
  (primReads[m[1]] ||= new Set());
  for (const v of m[2].matchAll(/var\((--[a-z0-9-]+)/g)) primReads[m[1]].add(v[1]);
}
const feeds = {};                       /* token -> primitives that read it */
for (const p of Object.keys(primReads)) for (const t of primReads[p]) (feeds[t] ||= new Set()).add(p);
const closure = t => {                  /* every primitive that reaches t, transitively */
  const out = new Set([t]); const q = [t];
  while (q.length) { const x = q.pop();
    for (const up of (feeds[x] || [])) if (!out.has(up)) { out.add(up); q.push(up); } }
  return out;
};
const primScreens = {}, primRoles = {};
for (const t of primitives) {
  const reach = closure(t);
  primRoles[t] = [...semantic].filter(r => roleReads[r] && [...reach].some(x => roleReads[r].has(x)));
  const direct = files.filter(f => [...reach].some(x => compReads[f].has(x)));
  primScreens[t] = new Set([...primRoles[t].flatMap(r => [...roleScreens[r]]),
                            ...direct.flatMap(f => compScreens[f])]);
  if (direct.length) primRoles[t] = [...primRoles[t], ...direct.map(f => 'ЧЕРЕЗ КОМПОНЕНТ: ' + f)];
}

if (ONE) {
  const t = ONE;
  if (semantic.has(t)) {
    console.log(t + '  (роль)\n  читають компоненти (' + roleComps[t].length + '): ' + (roleComps[t].join(' ') || '-'));
    console.log('  стоїть на екранах: ' + roleScreens[t].size);
  } else if (allTokens.has(t)) {
    console.log(t + '  (примітив)\n  через ролі (' + primRoles[t].length + '): ' + (primRoles[t].join(' ') || '-'));
    console.log('  разом на екранах: ' + primScreens[t].size);
  } else console.log(t + ' - у tokens.css такого імені немає');
  process.exit(0);
}

/* ---------- the idle control, both directions ---------- */
const deadRoles = [...semantic].filter(t => !roleComps[t].length);
/* THE ONE DECLARED EXCEPTION AMONG THE PRIMITIVES, and it is a fact about CSS
   rather than a permission: `@media` cannot read a custom property, so the two
   registry breakpoints have no reader by construction and never will. They are
   named here rather than filtered silently, and the list is asked BOTH ways -
   a name in it that turns out to HAVE a reader fails the run, because then the
   exception is excusing something it no longer describes. */
const BP_EXEMPT = ['--bp-grid-2col', '--bp-shell-wide'];
const deadPrimsAll = primitives.filter(t => !primRoles[t].length && !primScreens[t].size);
const deadPrims = deadPrimsAll.filter(t => !BP_EXEMPT.includes(t));
const bpIdle = BP_EXEMPT.filter(t => !deadPrimsAll.includes(t))
  .map(t => t + ' - виняток більше нічого не покриває: читач знайшовся або токен зник');
const deadComps = files.filter(f => anchors[f].length && !compScreens[f].length);
/* A STATE SCREEN INHERITS ITS BASE SCREEN'S ZONES, and the first run needed this:
   twelve screens came back «microcopy.md does not know this name», and eleven of
   them are dialog STEPS - `account-profile-phone`, `account-addresses-courier`,
   `coach-tariff-cancel`. Their strings are authored in the shared-component
   sections of cluster 0, which have no screen heading by construction, plus the
   base screen's own section. Falling back to the base is mechanical: drop the
   last suffix until a section answers. */
const zoneSource = {};
for (const p of Object.keys(seen)) {
  if (zonesOf[p]) { zoneSource[p] = 'власна секція'; continue; }
  let base = p;
  while (base.includes('-')) {
    base = base.slice(0, base.lastIndexOf('-'));
    if (zonesOf[base]) { zonesOf[p] = zonesOf[base]; zoneSource[p] = 'від базового екрана ' + base; break; }
  }
}
const noZones = Object.keys(seen).filter(p => !zonesOf[p]);

const say = (title, list, fmt) => { if (!list.length) return;
  console.log('\n' + title + ' (' + list.length + '):'); for (const x of list) console.log('  ' + fmt(x)); };
say('РОЛЬ, ЯКОЇ НЕ ЧИТАЄ ЖОДЕН КОМПОНЕНТ', deadRoles, t => t);
say('ПРИМІТИВ, ДО ЯКОГО НЕ ВЕДЕ ЖОДНЕ КОЛІНО', deadPrims, t => t);
say('ВИНЯТОК, ЯКИЙ НІЧОГО НЕ ПОКРИВАЄ', [...bpIdle, ...exemptBad], x => x);
say('КОМПОНЕНТ, ЯКОГО НЕМАЄ НА ЖОДНОМУ ЕКРАНІ', deadComps, f => f);
say('КОМПОНЕНТ БЕЗ ВЛАСНОГО ІМЕНІ - рахувати нічим', noAnchor, f => f);
say('ЕКРАН, ЯКОГО microcopy.md НЕ ЗНАЄ ЗА ІМЕНЕМ', noZones, p => p);
say('ЕКРАН, ЯКИЙ НЕ ВІДКРИВСЯ', failed, p => p);

console.log('\nекранів пройдено: ' + Object.keys(seen).length + ' з ' + corpus.length +
  ' · компонентів: ' + files.length + ' (з них патернів ' + files.filter(isPattern).length + ')' +
  ' · ролей: ' + semantic.size + ' · примітивів: ' + primitives.length);
const inherited = Object.values(zoneSource).filter(x => x && x.startsWith('від')).length;
console.log('зон з microcopy.md: екранів зі своєю секцією ' + Object.values(zoneSource).filter(x => x === 'власна секція').length +
  ' · успадкували від базового ' + inherited + ' · глобальних зон ' + globalZones.size);
console.log('панелей відкрито перед заміром: ' + opened + ' викликів на ' + sweeps + ' проходів' +
  (droppedOpeners().length ? ' · відкинуто, бо покидають сторінку: ' + droppedOpeners().join(' ') : ''));
console.log('токен ' + BP_EXEMPT.join(' і ') + ' читачів не має за побудовою: @media не читає var()');


/* ---------- THE DOCUMENT, WRITTEN FROM THE NUMBERS ABOVE ----------
   Nothing in handoff/docs/map.md is typed: the file is this run's output, so the
   map and the instrument cannot disagree. That is the same rule the estimate of
   stage 12 follows - a table generated from the registries is a table nobody can
   let go stale. Values never appear, only names: a token's VALUE lives in
   tokens.css and a second copy of it here would be the duplicate this stage
   exists to prevent. */
if (WRITE) {
  const nm = f => f.replace(/\.css$/, '');
  const L = [];
  L.push('# Map - what a screen is made of, and what moves when a token changes');
  L.push('');
  L.push('**Generated.** `node tools/map.mjs --write` writes this file from the corpus; nothing in it is');
  L.push('typed, so the map and the instrument cannot disagree. Names only, never values - a value lives');
  L.push('in `design/system/tokens.css` and a second copy here would be exactly the duplicate this stage');
  L.push('exists to prevent.');
  L.push('');
  L.push('---');
  L.push('');
  L.push('## How it was taken');
  L.push('');
  L.push('| Link | Read out of | Why not the obvious way |');
  L.push('|---|---|---|');
  L.push('| screen -> components | the rendered DOM, in a browser, at rest AND after every opener the page declares | a grep of the screen file misses a third of the markup: the header, footer, tab-bar and every dialog are written by `wireframes/_nav.js` at load. And a component that only appears after a click is invisible at rest - `cat-overlay` is the proof |');
  L.push('| component -> tokens | `var()` in its own css, minus what it declares for itself | |');
  L.push('| role -> primitive | the declarations of the semantic block, in both themes | a role whose dark half reads a different primitive would otherwise hide half its chain |');
  L.push('| screen -> zones | the `Зона` column of that screen section in `voice/docs/microcopy.md` | a state screen has no section of its own; it inherits the base screen, because its strings are authored in the shared sections of cluster 0 |');
  L.push('');
  L.push('**A component is on a screen if at least one of its ANCHOR classes renders there**, an anchor');
  L.push('being a class exactly one component file declares. Same rule as `inventory.mjs` question F, and');
  L.push('for the same reason: `.on`, `.tag` and `.ar` belong to several files at once and would put every');
  L.push('component on every screen.');
  L.push('');
  L.push('---');
  L.push('');
  L.push('## Roll-call');
  L.push('');
  L.push('| List | Declared | In the map | Deliberately not |');
  L.push('|---|---|---|---|');
  L.push('| screens in `design/_nav.js` | ' + navList.length + ' | ' + Object.keys(seen).length + ' | 1 - `' + OUT_OF_SUBJECT + '.html`, the coverage map, which describes the registry rather than standing in it |');
  L.push('| component files | ' + files.length + ' | ' + files.filter(f => anchors[f].length).length + ' | ' + noAnchor.length + ' - ' + noAnchor.map(nm).join(', ') + ', which declare no class of their own and cannot be counted by anchor |');
  L.push('| semantic roles | ' + semantic.size + ' | ' + [...semantic].filter(r => roleComps[r].length).length + ' | ' + deadRoles.length + ' - see D |');
  L.push('| primitives | ' + primitives.length + ' | ' + primitives.filter(t2 => primScreens[t2].size).length + ' | ' + (deadPrims.length + BP_EXEMPT.length) + ' - see D |');
  L.push('');
  L.push('Panels opened before the measurement: **' + opened + '** calls over ' + sweeps + ' passes.');
  L.push('');
  L.push('---');
  L.push('');
  L.push('## A. Screen -> zones -> components');
  L.push('');
  L.push('The zone column is a COUNT and an address, not a list: the zones themselves are in');
  L.push('`voice/docs/microcopy.md`, and copying them here would make a second edition of them.');
  L.push('');
  L.push('**The global layer is named once and left out of every row.** ' + GLOBAL.length + ' components render on');
  L.push('all ' + Object.keys(seen).length + ' screens, because `wireframes/_nav.js` writes them into every page: ' +
    GLOBAL.map(nm).sort().join(', ') + '.');
  L.push('Repeating them ' + Object.keys(seen).length + ' times would bury what this table is for - what is');
  L.push('SPECIFIC to a screen. The threshold is «on every screen», not a percentage, so nothing is rounded away.');
  L.push('');
  L.push('| Screen | IA node | Zones | Components of its own |');
  L.push('|---|---|---|---|');
  for (const p of Object.keys(seen).sort()) {
    /* THE LONGEST PREFIX, NOT THE FIRST ONE. `account-addresses-add` matches both
       `account` and `account-addresses`, and the first writing took whichever the
       registry happened to list first - so half the address book was filed under
       node 7.0 instead of 7.5. A prefix match without «longest» is a guess. */
    const key = Object.keys(nodeOf).filter(k => p === k || p.startsWith(k + '-'))
      .sort((a, b) => b.length - a.length)[0];
    const node = nodeOf[p] || (key ? nodeOf[key] : null) || '–';
    const z = zonesOf[p] ? zonesOf[p].size : 0;
    const src = zoneSource[p] === 'власна секція' ? '' : ' (' + (zoneSource[p] || 'немає') + ')';
    const own = onScreen[p].filter(f => !GLOBAL.includes(f));
    L.push('| `' + p + '.html` | ' + node + ' | ' + z + src + ' | **' + own.length + '**' +
      (own.length ? ' - ' + own.map(nm).sort().join(', ') : '') + ' |');
  }
  L.push('');
  L.push('### A1. The near-global components, and the screens that do without them');
  L.push('');
  L.push('A component on almost every screen but not on all of them says something about the EXCEPTIONS,');
  L.push('and the exceptions turn out to be the two deliberate ones this product has: the focused');
  L.push('checkout, which drops the shell so nothing competes with the payment, and the system pages,');
  L.push('which have no shell to drop. Derived, not listed - the threshold is «on more than four fifths');
  L.push('of the screens and not on all of them».');
  L.push('');
  L.push('| Component | On | Missing from |');
  L.push('|---|---|---|');
  for (const f of files.slice().sort()) {
    const n2 = compScreens[f].length, all = Object.keys(seen).length;
    if (!anchors[f].length || n2 === all || n2 < all * 0.8) continue;
    const gone = Object.keys(seen).filter(p => !onScreen[p].includes(f)).sort();
    L.push('| `' + nm(f) + '` | ' + n2 + ' / ' + all + ' | ' + gone.map(x => '`' + x + '`').join(', ') + ' |');
  }
  L.push('');
  L.push('---');
  L.push('');
  L.push('## B. Component -> tokens');
  L.push('');
  L.push('| Component | Screens | Roles it reads | Primitives it reads |');
  L.push('|---|---|---|---|');
  for (const f of files.slice().sort()) {
    const r = [...compReads[f]].filter(x => semantic.has(x)).sort();
    const q = [...compReads[f]].filter(x => !semantic.has(x)).sort();
    L.push('| `' + nm(f) + '`' + (isPattern(f) ? ' *(pattern)*' : '') + ' | ' +
      (anchors[f].length ? compScreens[f].length : '–') + ' | ' + (r.length ? r.map(x => '`' + x + '`').join(' ') : '–') +
      ' | ' + (q.length ? q.map(x => '`' + x + '`').join(' ') : '–') + ' |');
  }
  L.push('');
  L.push('**A component that reads a primitive directly is a finding, not a habit** - the geometry');
  L.push('primitives are read that way by design, the colour ones are not. Measured today: `--orange-500`');
  L.push('has 0 readers among components and 6 inside `tokens.css`, which is why the reverse list below');
  L.push('has to open in two knees.');
  L.push('');
  L.push('---');
  L.push('');
  L.push('## C. The reverse list - if I change this, what goes with it');
  L.push('');
  L.push('**An inversion of the tables above, not a second pass over the code.** Two editions of one fact');
  L.push('drift, and the one consulted less often drifts first.');
  L.push('');
  L.push('### C1. Semantic roles - one knee');
  L.push('');
  L.push('| Role | Read by | On screens |');
  L.push('|---|---|---|');
  for (const t2 of [...semantic].sort()) {
    const c = roleComps[t2].map(nm).sort();
    const s2 = [...roleScreens[t2]].sort();
    L.push('| `' + t2 + '` | ' + (c.length ? c.join(', ') : '**нікого**') + ' | ' +
      (s2.length <= 6 ? (s2.length ? s2.join(', ') : '**0**') : '**' + s2.length + '**') + ' |');
  }
  L.push('');
  L.push('### C2. Primitives - two knees, and sometimes three');
  L.push('');
  L.push('A primitive reaches a screen through the roles that read it. Where a primitive is read by');
  L.push('another primitive the chain is closed first, transitively - `--grid-col-fluid` reads');
  L.push('`--grid-col-min-narrow`, and a walk that only knew role -> primitive called the floor dead.');
  L.push('');
  L.push('| Primitive | Reached through | On screens |');
  L.push('|---|---|---|');
  for (const t2 of primitives.slice().sort()) {
    const r = primRoles[t2].map(x => x.startsWith('ЧЕРЕЗ') ? '*' + x.replace('ЧЕРЕЗ КОМПОНЕНТ: ', 'component ') + '*' : '`' + x + '`');
    const n2 = primScreens[t2].size;
    L.push('| `' + t2 + '` | ' + (r.length ? r.slice(0, 8).join(' ') + (r.length > 8 ? ' + ' + (r.length - 8) + ' more' : '') : '**нікого**') +
      ' | ' + (n2 ? '**' + n2 + '**' : '**0**') + ' |');
  }
  L.push('');
  L.push('---');
  L.push('');
  L.push('## D. Idle control - asked in both directions');
  L.push('');
  L.push('| Question | Answer |');
  L.push('|---|---|');
  L.push('| a role no component reads | **' + deadRoles.length + '**' + (deadRoles.length ? ' - ' + deadRoles.map(x => '`' + x + '`').join(', ') : '') + ' |');
  L.push('| a primitive no knee reaches | **' + deadPrims.length + '**' + (deadPrims.length ? ' - ' + deadPrims.map(x => '`' + x + '`').join(', ') : '') + ' |');
  L.push('| the declared exception among primitives | ' + BP_EXEMPT.map(x => '`' + x + '`').join(', ') + ' - no reader BY CONSTRUCTION, because `@media` cannot read a custom property. Asked both ways: if one of them ever gains a reader the run fails, because the exception would then be excusing something it no longer describes |');
  L.push('| a component on no screen at all | **' + deadComps.length + '**' + (deadComps.length ? ' - ' + deadComps.map(nm).join(', ') : '') + ' |');
  L.push('| a component with no class of its own | **' + noAnchor.length + '** - ' + noAnchor.map(nm).join(', ') + '. Not a defect: a finding about NAMING, and the reason their screen count is a dash rather than a zero |');
  L.push('| a screen `microcopy.md` cannot answer for | **' + noZones.length + '**' + (noZones.length ? ' - ' + noZones.join(', ') : '') + ' |');
  L.push('| a screen that did not open | **' + failed.length + '**' + (failed.length ? ' - ' + failed.join(', ') : '') + ' |');
  L.push('');
  L.push('**Stage 08 asked the dead-component question BEFORE the roll-out and the answer could have');
  L.push('changed under it.** It is asked again here, over the whole product and with the panels open.');
  L.push('');
  L.push('---');
  L.push('');
  L.push('## Who reads this file');
  L.push('');
  L.push('| Reader | What they come here for |');
  L.push('|---|---|');
  L.push('| a new developer | «what is this screen made of» - section A, before touching anything |');
  L.push('| you in a year | section C: what moves if this token changes, answered by a number rather than by a guess |');
  L.push('| Claude in a new session | the whole file is generated, so it is re-derivable in one command and never has to be trusted |');
  writeFileSync(join(ROOT, 'handoff/docs/map.md'), L.join('\n') + '\n');
  console.log('handoff/docs/map.md написано: ' + L.length + ' рядків');
}

process.exit(deadRoles.length || deadPrims.length || deadComps.length ||
  noZones.length || failed.length || bpIdle.length || exemptBad.length ? 1 : 0);
