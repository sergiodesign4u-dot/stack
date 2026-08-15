/* tools/scope.mjs - DOES EVERY SCREEN CARRY THE SCOPE ITS COMPONENTS ARE
   WRITTEN AGAINST.

   Step 7.95 moved eight private stylesheets of the coach flow into
   `design/system/components/`, and every selector in them was scoped:
   `.coach .qa-row`, `.coach .cnew`, 360 of them across 18 files. The scope class
   was put on the eleven screens of that step by hand, on `<body>`.

   Nothing else ever put it anywhere. `tools/clone-to-colour.mjs` takes a screen
   out of `wireframes/`, and the grey layer has NO body class at all - 142 files,
   142 bare `<body>` tags - so every state screen coloured at 8.13 and 8.14
   arrived without it. On those screens the whole coach layer of the system is
   INERT: not overridden, not losing on specificity, simply never matching.

   That is why the private blocks on them looked like «overrides» in step 6's
   second list and are not: they are the only paint on the page. And it is why
   `accept.mjs 360` fails on four of them - `coach-session.css` answers the phone
   with `@media (max-width: 479px)` and the screen never hears it.

   A MISSING SCOPE IS INVISIBLE TO EVERY OTHER CHECK IN THIS FOLDER, and that is
   the point of a tool of its own. `vars` and `grey-vars` read declarations,
   `roles` reads values, `links` reads hrefs, `accept` reads the rendered page and
   sees something that renders. Nothing asks «is this page inside the scope its
   own components need», because the answer is not in any file - it is in the
   difference between the page with the class and the page without it.

   So the question is put to the browser as a difference, never as a name list:
   add the class, read the computed style of every element, take it away, read
   again. A page that MOVES is a page the scope belongs on. A page that does not
   move does not need it, whatever it is called - `home-coach.html` shows a coach
   price to a buyer and is not inside the coach cabinet.

     node tools/scope.mjs                 walk design/, report
     node tools/scope.mjs --apply         and write the class into what moved
     node tools/scope.mjs --w 1280        at the other width
     node tools/scope.mjs coach-home-empty  just these

   THE SWEEP LIVES HERE AND NOT IN THE TRANSFORM. `clone-to-colour.mjs` reads a
   grey file and cannot know: the scope is a property of the CSS, not of the
   markup it is cloning. Its note says so and points here. */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, subject, ROOT, STYLE_PROPS } from './lib.mjs';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const APPLY = argv.includes('--apply');
const WI = argv.indexOf('--w');
const W = WI > -1 ? Number(argv[WI + 1]) : 390;
const rest = WI > -1 ? argv.filter((a, i) => i !== WI && i !== WI + 1) : argv;
const PAGES = subject(rest, 'design');

/* THE SCOPE CLASSES ARE READ OFF THE PAGES, NEVER TYPED. Whatever the coloured
   layer already writes on a `<body>` is a scope by definition; a name typed here
   would be a guess wearing a table's clothes, which is the fault clone-to-colour
   paid for once with `uivCoach()`. */
const bodyScope = src => new Set(((src.match(/<body class="([^"]+)"/) || [, ''])[1]).split(/\s+/).filter(Boolean));
const SRC = Object.fromEntries(readdirSync(join(ROOT, 'design'))
  .filter(f => f.endsWith('.html'))
  .map(f => [f.slice(0, -5), readFileSync(join(ROOT, 'design', f), 'utf8')]));
const SCOPES = [...new Set(Object.values(SRC).flatMap(s => [...bodyScope(s)]))].sort();

/* WHOSE SCOPE A SCREEN INHERITS IS WRITTEN IN THE SCREEN, and this is the rule
   the transform is missing rather than a list. Every state screen ends its
   script with wfBar('<base>.html', '<state>') and every base names ITSELF:
   `coach-session.html` says wfBar('coach-session.html'). So the clone knows its
   original, and a state wears exactly the scope its base wears.

   Read out, never typed. The alternative offered itself and was wrong: pairing
   the scope with wfHeader('coach') / wfCoachNav( catches 36 screens and misses
   three that carry the class already - cart-coach, coach-landing, coach-verify
   are coach screens without the coach rail. A signal that disagrees with the
   product on three of eleven is a guess. */
const BASE = p => ((SRC[p] || '').match(/wfBar\(\s*'([^']+)\.html'/) || [, null])[1];

if (!SCOPES.length) { console.log('ЖОДНОГО скоупа на <body> у design/ - перевіряти нема чого'); process.exit(2); }

/* THE IDLE CONTROL OF THE DECLARED LIST. A scope nobody's stylesheet mentions is
   not «a spare»: it is a class worn on every page of a flow for nothing, and a
   list that can never fail is a list nobody reads. */
const CSS = readdirSync(join(ROOT, 'design/system/components'))
  .map(f => readFileSync(join(ROOT, 'design/system/components', f), 'utf8')).join('\n');
const orphan = SCOPES.filter(s => !new RegExp('\\.' + s + '\\b').test(CSS));
if (orphan.length) { console.log('СКОУП, ЯКОГО НЕМА В ЖОДНОМУ КОМПОНЕНТІ: ' + orphan.join(' ')); process.exit(2); }

/* No backtick between here and the closing quote. */
const M = (scope) => `(() => {
  const SC = ${JSON.stringify(scope)};
  const P = ${JSON.stringify(STYLE_PROPS)};
  const body = document.body;
  const had = body.classList.contains(SC);

  /* INDEXED LOOPS OVER CSSRuleList, never for...of. private-css.mjs reported
     «0 rules» for a block of 77 exactly that way, inside a try that ate it.

     AND @import IS NOT A GROUPING RULE. The first version tested r.cssRules and
     recursed on it, which is right for @media and wrong for @import: an import
     carries its sheet on r.styleSheet, has no selectorText, and was therefore
     skipped in silence. design/system/index.css is NOTHING BUT imports, so
     every component sheet in the product was invisible and the count came back
     «0 selectors» on a page that moved 87 elements. The two numbers disagreeing
     is what exposed it - a single number would have read as a clean pass.

     AND A STYLE RULE HAS cssRules AS WELL, WHICH IS THE WHOLE BUG. Since CSS
     Nesting, CSSStyleRule implements CSSGroupingRule: every plain rule carries
     an EMPTY CSSRuleList, and an empty CSSRuleList is TRUTHY. The second
     version therefore tested r.cssRules first and recursed into nothing for
     every single style rule in the product, 84 imports deep, and still came
     back «0 selectors». Ask for selectorText first, and recurse on LENGTH
     rather than on existence. */
  const blind = [];
  const sels = [];
  const RE = new RegExp('\\\\.' + SC + '(?![a-zA-Z0-9_-])');
  const walk = (rules) => {
    for (let i = 0; i < rules.length; i++) {
      const r = rules[i];
      if (r.styleSheet) { read(r.styleSheet); continue; }
      if (r.selectorText) {
        const parts = r.selectorText.split(',');
        for (let j = 0; j < parts.length; j++) {
          const s = parts[j].trim();
          if (RE.test(s)) sels.push(s);
        }
      }
      if (r.cssRules && r.cssRules.length) walk(r.cssRules);
    }
  };
  const read = (sh) => {
    let rules = null;
    try { rules = sh.cssRules; } catch (e) { rules = null; }
    /* a cross-origin sheet is UNREADABLE BY DESIGN, not a fault: the webfont
       css comes from fonts.googleapis.com and holds no selector of ours. Only
       a same-origin sheet we cannot read is worth a word. */
    if (!rules) { if (!sh.href || sh.href.indexOf(location.origin) === 0) blind.push(sh.href || 'inline'); return; }
    walk(rules);
  };
  for (let i = 0; i < document.styleSheets.length; i++) read(document.styleSheets[i]);

  const snap = () => {
    const all = document.querySelectorAll('*');
    const out = [];
    for (let i = 0; i < all.length; i++) {
      const cs = getComputedStyle(all[i]);
      let row = '';
      for (let j = 0; j < P.length; j++) row += cs.getPropertyValue(P[j]) + '|';
      out.push(row);
    }
    return out;
  };

  body.classList.remove(SC);
  const off = snap();
  body.classList.add(SC);
  const on = snap();

  /* WHICH SELECTORS ACTUALLY BITE, read with the class on. A page can already
     be scoped by a wrapper div - the stand shows components that way - and then
     the selector matches while the body class changes nothing. Counting matches
     alone would call that page broken. */
  const hit = [];
  let els = 0;
  for (const s of [...new Set(sels)]) {
    let n = 0;
    try { n = document.querySelectorAll(s).length; } catch (e) { n = -1; }
    if (n > 0) { hit.push(s + ' x' + n); els += n; }
  }
  if (!had) body.classList.remove(SC);

  let moved = 0;
  for (let i = 0; i < off.length && i < on.length; i++) if (off[i] !== on[i]) moved++;
  return JSON.stringify({ had, blind, sel: hit.length, els, moved,
    elements: off.length, top: hit.slice(0, 5) });
})()`;

const srv = await serve();
const l = await chrome('scope');
const conn = await Conn.open(l.wsUrl);

const rows = [];
for (const p of PAGES) {
  for (const sc of SCOPES) {
    const s = await newSession(conn);
    const r = JSON.parse(await visit(conn, s.sessionId, `${srv.base}/design/${p}.html`, W, 900, M(sc), s.inflight));
    await conn.send('Target.closeTarget', { targetId: s.targetId });
    if (r.blind.length) console.log('  СЛІПА ТАБЛИЦЯ СТИЛІВ на ' + p + ': ' + r.blind.join(' '));
    if (r.moved || r.had) rows.push({ p, sc, ...r });
  }
}
l.stop(); srv.stop();

/* THE MEASUREMENT AND THE DECISION ARE TWO DIFFERENT QUESTIONS, and keeping
   them apart is the whole reason this reads as two lists. «Does the class
   change anything» is answered by the browser. «Does the class BELONG here» is
   answered by the base screen. A page that moves and does not inherit is not a
   defect of the page - it is evidence that the scope is holding two meanings of
   one class name apart, and painting it would be the damage, not the fix. */
const inherits = r => {
  const b = BASE(r.p);
  return b && b !== r.p && SRC[b] !== undefined && bodyScope(SRC[b]).has(r.sc);
};
const moved = rows.filter(r => !r.had && r.moved > 0);
const missing = moved.filter(inherits);
const foreign = moved.filter(r => !inherits(r));
const idle = rows.filter(r => r.had && r.moved === 0);
/* AND THE REAL DEFECT IS THE OTHER DIRECTION, which nothing had been asking.
   A screen wearing a scope its BASE does not wear is a screen claiming a flow it
   is not in - that is a mistake. A screen wearing a scope its base wears, on
   which no scoped selector happens to bite today, is a NAMESPACE and nothing
   more. Until 2026-08-15 the second was failing this gate and the first was not
   being asked at all. */
const wrongFlow = rows.filter(r => r.had && BASE(r.p) && BASE(r.p) !== r.p &&
  !bodyScope(SRC[BASE(r.p)] || '').has(r.sc));

const line = r => '  ' + r.p.padEnd(30) + '.' + r.sc.padEnd(8) +
  'зрушить ' + String(r.moved).padStart(4) + ' з ' + String(r.elements).padEnd(5) +
  ' · селекторів ' + String(r.sel).padStart(3) + ' на ' + r.els + ' елементах';

if (missing.length) {
  console.log('\nСКОУПА НЕМА, А БАЗА ЙОГО НОСИТЬ (' + missing.length + '):');
  for (const r of missing.sort((a, b) => b.moved - a.moved)) console.log(line(r));
}
if (foreign.length) {
  console.log('\nЗМІНИТЬСЯ, АЛЕ СКОУП НЕ ЇХНІЙ (' + foreign.length +
    ') - тут одне й те саме ім\'я класу означає інше, і саме це скоуп і розводить:');
  for (const r of foreign.sort((a, b) => b.moved - a.moved))
    console.log(line(r) + '   база: ' + (BASE(r.p) || 'немає wfBar'));
}
if (wrongFlow.length) {
  console.log('\nСКОУП ЧУЖОГО ПОТОКУ (' + wrongFlow.length + ') - база його не носить:');
  for (const r of wrongFlow) console.log('  ' + r.p.padEnd(30) + '.' + r.sc + '   база: ' + BASE(r.p));
}
if (idle.length) {
  /* 2026-08-15, THE OWNER'S CALL ON `cart-coach`, AND IT IS NOT A SHRUG.
     The one rule that used `.coach` there was `.coach .ci:last-child`, moved to
     `.cd-group .ci:last-child` at step 7.96 with its reason written into
     cart-drawer.css: `.coach` was not a guard, because every coloured coach
     screen carries it, so the rule reached whatever wore `.ci` anywhere in the
     flow. Nothing is broken on that screen - it renders exactly as designed, and
     the rule that needed a guard got a correct one.
     `cart-coach` IS a coach screen (locked product decision 1: the cart with
     per-client tagging), the scope is written from the base by rule rather than
     by hand, and stripping it would leave the single coach screen without the
     namespace - so the next scoped selector would silently miss it. That is the
     23-screen defect this stage has already paid for once. A namespace that
     catches nothing today costs one class token; a namespace missing from one
     screen costs a class of silent bugs.
     So this list REPORTS and does not fail. What fails is the list above it. */
  console.log('\nСКОУП НІЧОГО НЕ ЛОВИТЬ (' + idle.length + ') - неймспейс потоку, не дефект:');
  for (const r of idle) console.log('  ' + r.p.padEnd(30) + '.' + r.sc);
}

if (APPLY && missing.length) {
  let wrote = 0;
  for (const r of missing) {
    const f = join(ROOT, 'design', r.p + '.html');
    const src = readFileSync(f, 'utf8');
    /* only a BARE <body> is written to. A body that already carries a class is
       a decision somebody made, and a sweep does not overwrite one. */
    if (!/<body>/.test(src)) { console.log('  ПРОПУЩЕНО, <body> уже з класом: ' + r.p); continue; }
    writeFileSync(f, src.replace('<body>', '<body class="' + r.sc + '">'));
    wrote++;
  }
  console.log('\nзаписано скоуп на ' + wrote + ' сторінках');
}

console.log('\n' + PAGES.length + ' сторінок @' + W + ' · скоупи: ' + SCOPES.map(s => '.' + s).join(' ') +
  ' · без свого скоупа: ' + missing.length + ' · чужий скоуп зачепив би: ' + foreign.length +
  ' · скоуп чужого потоку: ' + wrongFlow.length + ' · нічого не ловить: ' + idle.length);
process.exit(missing.length || wrongFlow.length ? 1 : 0);
