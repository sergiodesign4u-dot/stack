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

/* ---------- 2b. a fill or a line in the dark theme with no hue -------------
   THE OWNER SAW THIS ONE BEFORE ANY INSTRUMENT DID: «шоколадная, но какой-то
   вдруг серый». `--bg-surface` pointed at `#1C1C1C` - the brand's Ink, H0 S0 -
   while the page, the sunken and every hairline around it were H35 S15, so
   every card, the header and the footer plates sat as neutral grey inside a
   warm theme. Nothing was failing: contrast was right, both halves existed, no
   primitive had leaked. The system was correct and the theme still did not look
   like one theme, which is the exact class the pack sends step 7 to find.

   WHY FILL AND LINE AND NOT INK. A word may be neutral - Ink is Ink, and it is
   the same colour in both themes on the grounds that do not move. An AREA
   cannot: it is the theme's own surface, and a surface without the family's hue
   is visible as a patch from across the room.

   THE EXEMPTION IS MEASURED, NOT NAMED - rewritten 2026-08-13, and the rewrite
   is the point. It used to read `/-on(action|ink|photo)/`: a role whose NAME says
   its ground is not a theme surface - the orange, the ink plate, a photograph -
   and none of those move, so neutral there is no mismatch. That was right about
   every role it covered and it was still a list, spelled as a regex. The owner's
   decision to freeze the product-photo stage produced `--bg-photo` `#FFFFFF`,
   which is the SAME claim and does not contain the word «on», and the check
   fired on it - correctly by its own letter, wrongly by its own reasoning.

   The claim those roles are making is «my ground does not move with the theme»,
   and a role that means it says so in the file: ITS TWO HALVES ARE THE SAME
   VALUE. That is now the whole test. Checked against the five roles the old
   pattern covered - `--line-onink`, `--line-onaction`, `--bg-onphoto`,
   `--line-onphoto`, `--text-onaction` - all five are byte-for-byte identical in
   `:root` and in the dark block, so nothing that used to be exempt stops being
   exempt, and no name has to be remembered. A role that carries the word «on» in
   its name and DIFFERENT halves is not exempt any more, which is right: it moves.
   Every exempted role is printed, because an exemption nobody can see covers
   whatever it likes. */
const HEX = {};
for (const m of strip(TOKENS).matchAll(/(--[a-z0-9-]+)\s*:\s*(#[0-9A-Fa-f]{3,8})\s*;/g)) HEX[m[1]] = m[2];
const sat = hex => {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map(c => c + c).join('');
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  if (mx === mn) return 0;
  return 100 * ((l > .5) ? (mx - mn) / (2 - mx - mn) : (mx - mn) / (mx + mn));
};
const darkBody = block(clean, '[data-theme="dark"]');
/* what each role reads in `:root`, so the dark half can be compared with it */
const LIGHT_PRIM = {};
for (const m of block(clean, ':root').matchAll(/(--[a-z0-9-]+)\s*:\s*var\((--[a-z0-9-]+)\)/g)) LIGHT_PRIM[m[1]] = m[2];
const flat = [], exempt = [];
for (const m of darkBody.matchAll(/(--[a-z0-9-]+)\s*:\s*var\((--[a-z0-9-]+)\)/g)) {
  const [, role, prim] = m;
  if (!/^--(bg|line)-/.test(role)) continue;           /* area only, not ink */
  const v = HEX[prim];
  if (!v) continue;                                     /* rgba/alpha: another question */
  if (sat(v) >= 6) continue;
  /* the same declaration in the light half - identical halves ARE the exemption */
  (LIGHT_PRIM[role] === prim ? exempt : flat).push({ role, prim, v, s: sat(v) });
}
console.log('\n===== 2b. ЗАЛИВКА АБО ЛІНІЯ ТЕМНОЇ ТЕМИ БЕЗ ВІДТІНКУ =====');
if (!flat.length) console.log('   none - кожна площина темної теми несе відтінок родини');
flat.forEach(f => console.log('   ' + f.role.padEnd(24) + f.prim.padEnd(14) + f.v + '   S ' + f.s.toFixed(0) + '%'));
console.log('   звільнено виміром «обидві половини - те саме значення» (' + exempt.length + '): ' +
  (exempt.map(e => e.role).join(' ') || 'НІЧОГО, і це вже привід перечитати правило'));

if (SOURCE_ONLY) process.exit(onlyLight.length + onlyDark.length + leaks.length + flat.length ? 1 : 0);

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
  /* A GROUND THIS PROBE CANNOT SEE MUST BE SAID, NOT GUESSED. It reads
     backgroundColor and nothing else, so a photograph, a gradient or a weave -
     .pl-panel paints its packaging out of two gradients and no colour at all -
     is invisible to it, and the walk then keeps climbing and reports the page
     behind the panel as if it were the panel. That produced 1.02 on «1 мірна
     ложка», text which is perfectly legible on screen. When any layer in the
     stack carries a background-image, the reading is marked and reported apart
     rather than counted as a failure. */
  const ground = e => {
    const stack = [];
    let p = e, img = false;
    while (p) {
      const g = getComputedStyle(p);
      if (g.backgroundImage && g.backgroundImage !== 'none') img = true;
      const c = parse(g.backgroundColor); if (c.a > 0) stack.push(c);
      p = p.parentElement;
    }
    let out = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = stack.length - 1; i >= 0; i--) out = over(stack[i], out);
    return { hex: 'rgb(' + Math.round(out.r) + ', ' + Math.round(out.g) + ', ' + Math.round(out.b) + ')', img: img };
  };
  document.querySelectorAll('*').forEach(e => {
    const r = e.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const t = (e.textContent || '').trim();
    if (!t || e.children.length) return;              /* leaf text only */
    const s = getComputedStyle(e);
    /* INK WITH ZERO ALPHA IS NOT INK. Nine photo slots in this stand carry the
       word «фото» at color:transparent - alt text behind a real photograph,
       drawn by nobody. Read as opaque it comes out black, which is 21.00 on the
       light page and 1.16 on the dark one: two numbers about a word that has
       never been painted. NO BACKTICKS IN HERE: this comment lives inside the
       probe's own template literal, and one backtick ends the string.
       THE TEST IS ON THE FOURTH COMPONENT, NOT ON A PATTERN. Written as a regex
       for «, 0)» at the end it also matched rgb(255, 90, 0) - the accent - and
       quietly removed every orange word on the stand from the measurement,
       including the one real finding on this page. A colour is transparent when
       it HAS an alpha and that alpha is zero; nothing else is. */
    const ch = (s.color.match(/[\\d.]+/g) || []).map(Number);
    if (ch.length > 3 && ch[3] === 0) return;
    /* OPACITY IS PART OF THE INK, and for as long as this probe existed it was
       not. It read the color property and nothing else, so a word set in a
       strong ink and then faded to .62 was graded on the ink it was WRITTEN in
       rather than on the one a person sees. Found 2026-08-14 by an agent
       measuring kit/color: .use at .62 reported 4.75 and gives 2.69, .rg at .72
       reported 8.54 and gives 4.69. Every number this tool has printed for a
       faded element was the wrong number, and it was always the FLATTERING one -
       which from a checker reads exactly like health.
       NO BACKTICKS IN HERE - this comment lives inside the probe's own template
       literal, and the rule is written twice in this file because it has been
       broken twice.
       THE WALK STOPS AT THE GROUND. Opacity fades a whole subtree together, so an
       ancestor that both carries it AND supplies the ground fades ink and ground
       equally and changes nothing between them; only the fade applied BETWEEN the
       ink and its ground counts. That is the shape modelled here. */
    let op = 1;
    /* AND A THING THAT IS NOT SHOWN IS NOT INK EITHER - the same sentence the
       zero-alpha rule above makes, arriving from the second direction the moment
       opacity started counting. Measured on the first corpus run after that
       change: span.tt-m «Перевірка» reported 1.00 on 113 screens, ink exactly
       equal to its ground, which is what a TOAST looks like before it is fired -
       toast.css keeps it in the document at opacity 0 and slides it in. An
       element faded to nothing has no contrast to have, and reporting it as the
       worst defect in the product is the checker inventing 113 of them. */
    for (let q = e; q; q = q.parentElement) {
      const qs = getComputedStyle(q);
      const o = parseFloat(qs.opacity);
      if (o < 1) op *= o;
      if (qs.visibility === 'hidden') return;
      const qb = parse(qs.backgroundColor);
      if (qb.a > 0) break;
    }
    if (op === 0) return;
    const g = ground(e);
    /* the ink a person actually sees: its own alpha, times the fade above it,
       composited onto the ground the walk found */
    const ic = parse(s.color);
    const eff = over({ r: ic.r, g: ic.g, b: ic.b, a: ic.a * op }, parse(g.hex));
    const inkSeen = 'rgb(' + Math.round(eff.r) + ', ' + Math.round(eff.g) + ', ' + Math.round(eff.b) + ')';
    px.push({ sel: e.tagName.toLowerCase() + (e.className && e.className.toString ? '.' + e.className.toString().trim().split(/\\s+/).slice(0,2).join('.') : ''),
              ink: inkSeen, faded: op < 1 ? +op.toFixed(2) : 0,
              bg: g.hex, img: g.img, size: parseFloat(s.fontSize), weight: s.fontWeight,
              txt: t.slice(0, 30) });
  });
  /* WHAT THE PAGE ACTUALLY IS, not what it was asked to be. The uivTheme call
     is a call INTO the page, and a page that does not carry theme.js throws it
     away without a sound - the probe then walks a LIGHT page, calls the reading
     «dark», compares it with itself and reports a perfect result. A checker that
     cannot fail is worse than no checker, so the run says which theme it was
     standing in and the caller refuses the reading when it is the wrong one.
     (And no backtick may enter this comment: it lives inside the probe's own
     template literal, which is the rule written 40 lines below and broken here
     on the first try.) */
  return JSON.stringify({ theme: document.documentElement.getAttribute('data-theme') || 'light',
                          val, px: px.slice(0, 400) });
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

/* THE SUBJECT IS THE WHOLE FOLDER, AND UNTIL 2026-08-13 IT WAS `kit/` ONLY.
   The filter that stood here - «starts with kit/, not kit/demo/, not kit/kit» -
   measured 87 stand pages and never opened one of the 88 PRODUCT screens, which
   are the thing the system exists for. It did not read as an omission, it read
   as a scope: the dark theme is a property of the SYSTEM, so checking the pages
   that document the system sounds like the whole job. It is not. The first run
   after this line changed returned 33 broken shapes on the home screen alone,
   every one of them in the panel a person looks at while browsing the others.
   A subject narrower than the corpus is stated with its count, or it is a lie
   about coverage - the same lesson as the glob that reported «0 failures» over
   135 pages after visiting one. */
const named = process.argv.slice(2).filter(a => !a.startsWith('-'));
const SKIP = ['kit/kit'];
const ALL = pages();
const SUBJ = named.length ? named : ALL.filter(p => !SKIP.includes(p));
if (!named.length)
  console.log('\nпредмет: ' + SUBJ.length + ' сторінок з ' + ALL.length +
    ' у design/  ·  поза предметом за родом: ' + SKIP.join(' '));
/* ---------- THE PANELS ARE OPENED BEFORE THE PAGE IS MEASURED - 2026-08-14 ----
   A POPUP IS 0x0 UNTIL SOMEBODY OPENS IT, and the probe below skips anything
   under 2px, so for as long as this check has existed it has been measuring the
   part of the product that is already on screen. That blind spot has now cost
   twice, both found by a person opening a menu rather than by any instrument:

     step 8.19  `.on` «Українська» inside `.wfh-langmenu` - the accent's LARGEST
                failing shape, 82 instances on 82 of 88 screens at 3.13, carried
                in a record as «accepted» since 2026-08-07 with nothing ever
                drawing it to look.
     step 7.17  the header's account menu - five rows with no mark, a cap in
                brand ink between two accent ones, and four states that had to be
                measured by hand because this tool could not see them.

   THE OPENERS ARE NOT A LIST, and `states.mjs` learned that the expensive way at
   8.19: its hand-written pair of names had one dead entry and missed three real
   ones. Every global matching `open[A-Z]` or `toggle[A-Z]` is called, plus the
   few that take an argument, which cannot be guessed and are written out there.

   ALL AT ONCE, NOT ONE AT A TIME, and that is the difference from `states.mjs`.
   That tool asks «does this state re-render into an unmarked one», so it has to
   isolate each opener. This one asks «does ink read on its ground», and a ground
   is computed by compositing an element's OWN ancestor chain - so two dialogs
   overlapping on the z axis do not disturb each other's answer. One sweep per
   theme instead of two thousand visits.

   IDENTICAL IN BOTH THEMES, which is the whole reason it is safe: the light pass
   and the dark pass run the same sweep on the same page, so anything the sweep
   does that is not about colour cancels out of the difference. A toggle called
   once opens; it is never called twice.

   AN OPENER THAT LEAVES THE PAGE IS DROPPED, and it had to be, because one of
   them does. Measured on home-buyer: 23 globals match the pattern, and after the
   sweep the tab was at `design/system.html` - a 404 - so all three test pages
   came back «the page has no theme». The navigation is asynchronous, so a check
   written inside the sweep sees nothing; it has to be asked afterwards.

   DISCOVERED, NOT LISTED. Each name is tried ONCE, in a session of its own, and
   the verdict is cached by name for the whole run - so the cost is one probe per
   distinct opener in the corpus, not one per opener per page, and a new opener
   added next month is judged the day it appears instead of being missed by a
   list somebody forgot to extend. The dropped names are printed with the result,
   because an exclusion nobody can see excludes whatever it likes. */
const AUTO_OPENER = '/^(open[A-Z]|toggle[A-Z])/';
const ARG_OPENERS = ["wfAuthGo('code')", "catOverlayGoals()", "addrStep('post')",
                     "profStep('pf-phone','enter')", "wfToast('ok','Перевірка')"];
const NAMES = `JSON.stringify(Object.getOwnPropertyNames(window).filter(k => {
  try { return ${AUTO_OPENER}.test(k) && typeof window[k] === 'function'; } catch (e) { return false; }
}))`;
const sweepOf = list => `(() => { let ran = 0;
  for (const call of ${JSON.stringify([])}.concat(${JSON.stringify(list)}))
    { try { (0, eval)(call); ran++; } catch (e) {} }
  return ran; })()`;
/* name -> may it be called at all */
const verdict = new Map();
async function safeOpeners(sess, url, calls) {
  const out = [];
  for (const call of calls) {
    if (!verdict.has(call)) {
      const probe = await newSession(conn);
      await visit(conn, probe.sessionId, url, 1280, 900, '1', probe.inflight);
      await conn.send('Runtime.evaluate', { expression: `(() => { try { ${call} } catch (e) {} })()`, returnByValue: true }, probe.sessionId);
      await new Promise(r => setTimeout(r, 400));
      const here = await conn.send('Runtime.evaluate', { expression: 'location.pathname', returnByValue: true }, probe.sessionId);
      verdict.set(call, String(here.result.value) === new URL(url).pathname);
      await conn.send('Target.closeTarget', { targetId: probe.targetId });
    }
    if (verdict.get(call)) out.push(call);
  }
  return out;
}
const CLOSED = process.argv.includes('--closed');

const srv = await serve();
const l = await chrome('theme');
const conn = await Conn.open(l.wsUrl);

const collapsed = new Map();   /* "roleA|roleB" -> true */
const fails = [];
const unread = [];   /* the ground carries an image: said, not counted */
const dead = [];     /* the probe threw: nothing was measured here */
const safeFor = new Map();     /* page -> the openers that do not leave it */
let opened = 0;
const noSwitch = []; /* the page has no theme to switch: nothing was measured either */
const onSystem = new Set();    /* ...and whether it was ever supposed to have one */
let seenLight = null;

for (const p of SUBJ) {
  const s = await newSession(conn);
  const url = `${srv.base}/design/${p}.html`;
  const out = {};
  for (const theme of ['light', 'dark']) {
    await visit(conn, s.sessionId, url, 1280, 900, '1', s.inflight);
    await conn.send('Runtime.evaluate', { expression: `uivTheme('${theme}')`, returnByValue: true }, s.sessionId);
    if (!CLOSED) {
      if (!safeFor.has(p)) {
        const nm = await conn.send('Runtime.evaluate', { expression: NAMES, returnByValue: true }, s.sessionId);
        const calls = JSON.parse(nm.result.value).map(n => n + '()').concat(ARG_OPENERS);
        safeFor.set(p, await safeOpeners(s, url, calls));
        await visit(conn, s.sessionId, url, 1280, 900, '1', s.inflight);
        await conn.send('Runtime.evaluate', { expression: `uivTheme('${theme}')`, returnByValue: true }, s.sessionId);
      }
      const sw = await conn.send('Runtime.evaluate', { expression: sweepOf(safeFor.get(p)), returnByValue: true }, s.sessionId);
      opened += Number(sw.result.value) || 0;
      await new Promise(r => setTimeout(r, 160));
      /* AND THE THEME IS SET AGAIN AFTERWARDS. Measured on the first run: all
         three test pages came back «the page has no theme», because something in
         the sweep puts the document back the way it found it - a reload keeps the
         address, so the navigation guard above cannot see it. Re-asserting the
         theme costs one call and makes the guard unnecessary for that case; if it
         still does not take, the page is reported as unmeasured, which is what
         that branch has always been for. */
      await conn.send('Runtime.evaluate', { expression: `uivTheme('${theme}')`, returnByValue: true }, s.sessionId);
      await new Promise(r => setTimeout(r, 80));
    }
    await new Promise(r => setTimeout(r, 120));
    if (theme === 'light' && !onSystem.has(p)) {
      /* IS THIS PAGE EVEN ON THE SYSTEM? Asked of the page, not of a list. A
         screen that does not load `system/index.css` has no semantic layer to
         override, so «the page has no theme» is the right answer for it and not
         a finding - `design/overview.html` and the three `concept/` pages are on
         the ROADMAP chrome, `/_nav.css`, exactly like the repository's own
         index.html. Reported apart from the pages that ARE on the system and
         still swallow the switch, because those two things are not the same
         defect and lumping them together buried a real one for a week. */
      const sys = await conn.send('Runtime.evaluate', { returnByValue: true, expression:
        `[...document.styleSheets].some(ss => (ss.href || '').includes('system/index.css'))` }, s.sessionId);
      if (sys.result.value) onSystem.add(p);
    }
    const q = await conn.send('Runtime.evaluate', { expression: PROBE, returnByValue: true }, s.sessionId);
    try { out[theme] = JSON.parse(q.result.value); } catch { out[theme] = null; }
  }
  await conn.send('Target.closeTarget', { targetId: s.targetId });
  if (!out.light || !out.dark) { dead.push(p); process.stdout.write('x'); continue; }
  if (out.dark.theme !== 'dark') { noSwitch.push(p); process.stdout.write('-'); continue; }

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

  /* 4. ink that fails its own ground in dark, at the threshold of its size.

     THE DARK NUMBER ALONE DOES NOT SAY WHOSE FAULT IT IS, and reading it as if
     it did cost a whole round on 2026-08-13: twenty-five rows came back and I
     read all twenty-five as damage the theme had done. Nine of them are photo
     stubs that fail in BOTH themes - the stand draws the word «фото» on a plate
     where the product puts an image, so the theme is innocent and so is the
     product. What separates the two cases is the LIGHT number for the same
     element, and it costs nothing: the probe already ran there. The pairing is
     by index because both runs walk the same DOM in the same order.
       light passes, dark fails  -> the theme broke it, and that is the harvest
       both fail                 -> older than the theme, a finding of its own
       light fails, dark passes  -> the dark end is the healthier one */
  for (let i = 0; i < out.dark.px.length; i++) {
    const e = out.dark.px[i], lit = out.light.px[i];
    const large = e.size >= 24 || (e.size >= 18.66 && Number(e.weight) >= 700);
    const need = large ? 3 : 4.5;
    const got = cr(e.ink, e.bg);
    const litGot = lit && lit.sel === e.sel ? cr(lit.ink, lit.bg) : null;
    if (got < need) (e.img ? unread : fails).push({ page: p, ...e, got, need, litGot });
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
console.log('   колонка «світла» каже, ЧИЯ це провина: пройшла - зламала тема,');
console.log('   провалилась теж - дефект старший за тему і живе окремо');
const byKey = new Map();
for (const f of fails) {
  const k = f.sel + '|' + Math.round(f.got * 100);
  if (!byKey.has(k)) byKey.set(k, { ...f, n: 0, pages: new Set() });
  const e = byKey.get(k); e.n++; e.pages.add(f.page);
}
if (!byKey.size) console.log('   none - кожне чорнило бере свій поріг');
console.log('   темна  світла  поріг  що це');
/* no cap: a list that quietly stops at 40 of 47 reads as «those are all of them»,
   and the seven it drops are indistinguishable from seven that do not exist */
const rows = [...byKey.values()].sort((a, b) => a.got - b.got);
rows.forEach(e => {
  const lit = e.litGot == null ? '  ?  '
    : (e.litGot >= e.need ? ' ' : '!') + e.litGot.toFixed(2).padStart(5);
  console.log('   ' + e.got.toFixed(2).padStart(5) + ' ' + lit + '  /' + String(e.need).padStart(4) +
    '  ' + e.sel.padEnd(28) + String(e.n).padStart(3) + 'x  ' + e.bg.replace(/\s/g, '') +
    '  «' + e.txt + '»  [' + [...e.pages].slice(0, 2).join(', ') + ']');
});
const broke = rows.filter(e => e.litGot != null && e.litGot >= e.need).length;
console.log('   ' + rows.length + ' форм: ' + broke + ' зламала тема, ' +
  (rows.length - broke) + ' провалюються в обох');

/* the idle control on the exemption: an exemption that never fires is a lie
   about coverage just as loudly as a case that was never declared */
console.log('\n   не зміряно (під чорнилом лежить зображення або градієнт): ' + unread.length);
const un = new Map();
for (const f of unread) un.set(f.sel + '|' + f.page, (un.get(f.sel + '|' + f.page) || 0) + 1);
[...un.entries()].slice(0, 12).forEach(([k, n]) =>
  console.log('     ' + k.split('|')[0].padEnd(28) + String(n).padStart(3) + 'x  [' + k.split('|')[1] + ']'));

/* AND THE TWO WAYS A PAGE LEAVES THIS RUN WITHOUT BEING MEASURED. Neither is a
   defect of the theme and both used to be a single character on a progress line,
   which is how «visited 203, measured 175» reads exactly like «measured 203». */
if (!CLOSED) {
  const dropped = [...verdict.entries()].filter(([, ok]) => !ok).map(([c]) => c);
  console.log('\n   відкрито панелей перед заміром: ' + opened + ' викликів на ' + (SUBJ.length * 2) + ' проходів');
  console.log('   відкидано, бо покидають сторінку (' + dropped.length + '): ' +
    (dropped.join(' ') || 'ЖОДНОГО, і це вже привід перечитати правило'));
}
console.log('\n   зміряно: ' + (SUBJ.length - dead.length - noSwitch.length) + ' з ' + SUBJ.length);
if (dead.length) console.log('   проба впала (' + dead.length + '): ' + dead.join(' '));
const offSystem = noSwitch.filter(p => !onSystem.has(p));
const shouldSwitch = noSwitch.filter(p => onSystem.has(p));
if (offSystem.length) console.log('   поза системою за родом, теми й не мусить бути (' + offSystem.length + '): ' + offSystem.join(' '));
if (shouldSwitch.length) console.log('   НА СИСТЕМІ, А ТЕМА НЕ ПЕРЕМИКАЄТЬСЯ (' + shouldSwitch.length + '): ' + shouldSwitch.join(' '));
if (false) console.log('   теми на сторінці немає (' + noSwitch.length + '): ' + noSwitch.join(' '));

l.stop(); srv.stop();
process.exit(onlyLight.length + onlyDark.length + leaks.length + collapsed.size + byKey.size ? 1 : 0);
