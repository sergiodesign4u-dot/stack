/* tools/theme.mjs - THE DARK THEME STRESS TEST, stage 08 step 7.

   The pack states the question this file exists to ask, and it is not the one
   step 5 asked. There the question was about ONE file: «did I just write a
   literal». Here it is about NEIGHBOURHOOD, and on a single component it cannot
   be asked at all: a card separated from the page by a shadow, and a shadow is
   invisible on dark, so the card merged; two roles held different values in
   light and the same one in dark, so two different components became
   indistinguishable. No component is broken and every one reads its role
   correctly - and the system still does not read as a system.

   FOUR CLASSES, in the pack's own order. The first two are answered from the
   source and need no browser; the last two need one, because «merged» is a
   question about rendered pixels, not about declarations.

     1  a role declared in one theme and not the other      source
     2  a component reading a colour PRIMITIVE directly     source
     3  two roles that hold different values in light and   computed
        the same value in dark
     4  an element whose ink fails its own background       computed
        in dark, at the threshold its surface carries

   WHY THE SURFACE DECIDES THE THRESHOLD, and why this file will not guess it:
   ink is 4.5:1 (3:1 when large), fill and line are 3:1 (WCAG 1.4.11). The
   surface a role paints is not derivable from its name - `--bg-rule` is a fill
   that draws a line - so it is read off the one place the project already
   declares it: the `S` table on design/kit/color.html, which pairs every
   semantic role with «ink» / «fill» / «line». One declaration, two readers.

     node tools/theme.mjs            source checks + the browser pass
     node tools/theme.mjs --source   source checks only, no browser            */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, pages, ROOT } from './lib.mjs';

const SOURCE_ONLY = process.argv.includes('--source');
const TOKENS = readFileSync(join(ROOT, 'design/system/tokens.css'), 'utf8');
const strip = s => s.replace(/\/\*[\s\S]*?\*\//g, '');

/* ---------- 1. a role declared in one theme and not the other -------------
   The dark block is one selector, so its body is taken by brace matching from
   the declaration rather than by a regex over the whole file: a regex that
   stops at the first `}` would stop inside the first nested rule and report
   every role after it as missing. */
function block(src, marker) {
  const i = src.indexOf(marker);
  if (i < 0) return '';
  let d = 0, start = -1;
  for (let j = i; j < src.length; j++) {
    if (src[j] === '{') { if (d++ === 0) start = j + 1; }
    else if (src[j] === '}') { if (--d === 0) return src.slice(start, j); }
  }
  return '';
}
const names = t => new Set([...t.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gm)].map(m => m[1]));

const clean = strip(TOKENS);
const dark = names(block(clean, '[data-theme="dark"]'));
/* the light half of a ROLE is whatever the semantic section declares; the
   primitive sections above it are values, and a value has no second theme.
   THE MARKER IS FOUND BEFORE THE COMMENTS ARE STRIPPED, and the first version
   of this file did it the other way round: «SEMANTIC - roles» is itself a
   comment, so after stripping it did not exist, `indexOf` returned -1, and
   `slice(-1)` handed the check the last character of the file. It reported
   «0 roles in :root» and every one of the 86 as missing - which is the only
   reason the bug was visible at all. A checker that answered «3 missing»
   would have been believed.
   AND IT STOPS AT THE END OF ITS OWN `:root`, which the second version did not:
   the dark-side PRIMITIVES live in a `:root` block of their own further down
   the file, so «everything after the marker» swept in 28 values and called each
   one a role missing its light half. A role is what the semantic block
   declares; a primitive has no second theme by definition. */
const semSrc = (() => {
  const s = strip(TOKENS.slice(TOKENS.indexOf('SEMANTIC - roles')));
  let d = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '{') d++;
    else if (s[i] === '}') { if (d === 0) return s.slice(0, i); d--; }
  }
  return s;
})();
const light = names(semSrc);

const onlyLight = [...light].filter(n => !dark.has(n));
const onlyDark = [...dark].filter(n => !light.has(n));

/* ---------- 2. a component reading a colour primitive directly ------------
   Geometry and type primitives are read directly ON PURPOSE - the pack:
   «колір несе роль, геометрія ні». So the pattern is not «var(--primitive)»,
   it is «var(--<a colour primitive>)», and the list of colour primitives is
   read off the file rather than typed. */
const primColour = new Set([...strip(TOKENS.slice(0, TOKENS.indexOf('SEMANTIC - roles')))
  .matchAll(/^\s*(--[a-z0-9-]+)\s*:\s*(#|rgba?\(|hsla?\()/gm)].map(m => m[1]));

const CDIR = join(ROOT, 'design/system/components');
const leaks = [];
for (const f of readdirSync(CDIR).filter(n => n.endsWith('.css'))) {
  const src = strip(readFileSync(join(CDIR, f), 'utf8'));
  src.split('\n').forEach((ln, i) => {
    for (const m of ln.matchAll(/var\((--[a-z0-9-]+)/g))
      if (primColour.has(m[1])) leaks.push({ file: f, line: i + 1, token: m[1], text: ln.trim().slice(0, 96) });
  });
}

console.log('===== 1. РОЛЬ, У ЯКОЇ ПАРИ НЕМАЄ В ДРУГІЙ ТЕМІ =====');
console.log('   semantic у :root: ' + light.size + '   у [data-theme="dark"]: ' + dark.size);
if (!onlyLight.length && !onlyDark.length) console.log('   none - у кожної ролі є обидві половини');
onlyLight.forEach(n => console.log('   лише світла: ' + n));
onlyDark.forEach(n => console.log('   лише темна:  ' + n));

console.log('\n===== 2. КОМПОНЕНТ ЧИТАЄ КОЛІРНИЙ ПРИМІТИВ НАПРЯМУ =====');
if (!leaks.length) console.log('   none - кожен колір у компонентах іде через роль');
leaks.forEach(l => console.log('   ' + (l.file + ':' + l.line).padEnd(34) + l.token.padEnd(16) + l.text));

if (SOURCE_ONLY) process.exit(onlyLight.length + onlyDark.length + leaks.length ? 1 : 0);

/* ---------- 3 and 4: the computed half ------------------------------------
   Both questions are asked of the SAME page twice, once per theme, and the
   answer is a DIFFERENCE between the two runs. Nothing here is compared to a
   list of expected colours: a list would go stale the first time a token moved. */
const SURF = (() => {
  /* the ink/fill/line table, read off color.html where it already lives */
  const html = readFileSync(join(ROOT, 'design/kit/color.html'), 'utf8');
  const m = html.match(/var S=(\[[\s\S]*?\]);/);
  const out = {};
  if (m) for (const [, kind, role] of m[1].matchAll(/\["(ink|fill|line)",\s*"(--[a-z0-9-]+)"/g)) out[role] = kind;
  return out;
})();

const SURF_KIND = SURF;

const PROBE = `(() => {
  const CS = getComputedStyle(document.documentElement);
  const roles = ${JSON.stringify(Object.keys(SURF))};
  const val = {};
  roles.forEach(r => { val[r] = CS.getPropertyValue(r).trim(); });
  /* every element that paints, with the ground it actually sits on */
  const px = [];
  /* THE GROUND IS COMPOSITED, NOT «the first non-transparent ancestor», and the
     first version of this probe was the latter. Half the roles in this system
     are tinted plates - background: rgba(56,154,86,.07) - and taking that rgba
     as if it were solid returns the pill's own hue as its own ground, so ink
     and ground come out identical and the check reports 1.00 on a pill that is
     perfectly readable. Nine of its first twenty findings were that bug. An
     alpha ground has to be painted over what is behind it before it can be
     measured. */
  const parse = s => { const n = (s.match(/[\\d.]+/g) || []).map(Number);
    return { r: n[0] || 0, g: n[1] || 0, b: n[2] || 0, a: n.length > 3 ? n[3] : 1 }; };
  const over = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a),
                            b: f.b * f.a + b.b * (1 - f.a), a: 1 });
  const ground = e => {
    const stack = [];
    let p = e;
    while (p) { const c = parse(getComputedStyle(p).backgroundColor); if (c.a > 0) stack.push(c); p = p.parentElement; }
    let out = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = stack.length - 1; i >= 0; i--) out = over(stack[i], out);
    return 'rgb(' + Math.round(out.r) + ', ' + Math.round(out.g) + ', ' + Math.round(out.b) + ')';
  };
  document.querySelectorAll('*').forEach(e => {
    const r = e.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const t = (e.textContent || '').trim();
    if (!t || e.children.length) return;              /* leaf text only */
    const s = getComputedStyle(e);
    px.push({ sel: e.tagName.toLowerCase() + (e.className && e.className.toString ? '.' + e.className.toString().trim().split(/\\s+/).slice(0,2).join('.') : ''),
              ink: s.color, bg: ground(e), size: parseFloat(s.fontSize), weight: s.fontWeight,
              txt: t.slice(0, 30) });
  });
  return JSON.stringify({ val, px: px.slice(0, 400) });
})()`;

const cr = (a, b) => {
  const rgb = s => (s.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
  const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const Y = c => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  const x = Y(rgb(a)), y = Y(rgb(b));
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

/* `kit/kit.html` is out of subject BY KIND, not by convenience: the pack calls
   it «ЗАМОРОЖЕНИЙ смоук етапу 07 на ../system/index.css». It is a snapshot of
   what stage 07 looked like, kept deliberately unchanged, and it assumes a light
   ground in its own markup. Eleven of this check's findings came from it, and
   every one of them would be a lie about the system. */
const SUBJ = pages().filter(p => p.startsWith('kit/') && !p.startsWith('kit/demo/') && p !== 'kit/kit');
const srv = await serve();
const l = await chrome('theme');
const conn = await Conn.open(l.wsUrl);

const collapsed = new Map();   /* "roleA|roleB" -> true */
const fails = [];
let seenLight = null;

for (const p of SUBJ) {
  const s = await newSession(conn);
  const url = `${srv.base}/design/${p}.html`;
  const out = {};
  for (const theme of ['light', 'dark']) {
    await visit(conn, s.sessionId, url, 1280, 900, '1', s.inflight);
    await conn.send('Runtime.evaluate', { expression: `uivTheme('${theme}')`, returnByValue: true }, s.sessionId);
    await new Promise(r => setTimeout(r, 120));
    const q = await conn.send('Runtime.evaluate', { expression: PROBE, returnByValue: true }, s.sessionId);
    try { out[theme] = JSON.parse(q.result.value); } catch { out[theme] = null; }
  }
  await conn.send('Target.closeTarget', { targetId: s.targetId });
  if (!out.light || !out.dark) { process.stdout.write('x'); continue; }

  /* 3. roles that held two values in light and one in dark */
  if (!seenLight) {
    seenLight = true;
    const L = out.light.val, D = out.dark.val, keys = Object.keys(L);
    for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) {
      const a = keys[i], b = keys[j];
      if (!L[a] || !L[b] || !D[a] || !D[b]) continue;
      /* ONLY WITHIN ONE SURFACE. Two roles have to stay distinguishable from
         each other when they can be SEEN side by side, and an ink is never seen
         beside a fill as the same thing: --text-oninverse holding the value of
         --bg-surface is not a collapse, it is ink for one ground that happens to
         equal the fill of another. Comparing across surfaces produced two
         findings out of three, both false. */
      if (SURF_KIND[a] !== SURF_KIND[b]) continue;
      if (L[a] !== L[b] && D[a] === D[b]) collapsed.set(a + ' + ' + b, D[a]);
    }
  }

  /* 4. ink that fails its own ground in dark, at the threshold of its size */
  for (const e of out.dark.px) {
    const large = e.size >= 24 || (e.size >= 18.66 && Number(e.weight) >= 700);
    const need = large ? 3 : 4.5;
    const got = cr(e.ink, e.bg);
    if (got < need) fails.push({ page: p, ...e, got, need });
  }
  process.stdout.write('.');
}

console.log('\n\n===== 3. КАНДИДАТИ: ДВІ РОЛІ ОДНІЄЇ ПОВЕРХНІ ЗІЙШЛИСЬ У ТЕМНІЙ =====');
console.log('   (кандидати, не дефекти: правилом це стає лише тоді, коли обидві ролі');
console.log('    видно ОДНОЧАСНО - «тож два різні компоненти стали невідрізнюваними»)');
if (!collapsed.size) console.log('   none - жодна пара ролей не злилась');
[...collapsed.entries()].forEach(([k, v]) => console.log('   ' + k.padEnd(52) + '-> ' + v));

console.log('\n===== 4. ЧОРНИЛО, ЯКЕ ПРОВАЛЮЄ СВОЄ ТЛО В ТЕМНІЙ =====');
console.log('   (ґрунт складається з альфою; те, що стоїть на ФОТО або на ґрунті,');
console.log('    якого демо стенду не дає, цей прилад прочитати не може)');
const byKey = new Map();
for (const f of fails) {
  const k = f.sel + '|' + Math.round(f.got * 100);
  if (!byKey.has(k)) byKey.set(k, { ...f, n: 0, pages: new Set() });
  const e = byKey.get(k); e.n++; e.pages.add(f.page);
}
if (!byKey.size) console.log('   none - кожне чорнило бере свій поріг');
[...byKey.values()].sort((a, b) => a.got - b.got).slice(0, 25).forEach(e =>
  console.log('   ' + e.got.toFixed(2).padStart(5) + ' / ' + e.need + '  ' + e.sel.padEnd(30) +
    String(e.n).padStart(4) + 'x  «' + e.txt + '»  [' + [...e.pages].slice(0, 2).join(', ') + ']'));

l.stop(); srv.stop();
process.exit(onlyLight.length + onlyDark.length + leaks.length + collapsed.size + byKey.size ? 1 : 0);
