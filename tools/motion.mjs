/* tools/motion.mjs - WHAT MOVES IN THIS PRODUCT TODAY, ASKED TWICE

   THE QUESTION. Stage 11 puts three durations and three curves into tokens. It
   cannot do that on top of what is already there without knowing what is already
   there, and «what is already there» has two different answers. The css says one
   thing; the cascade resolves another. A shorthand written once in a component
   file lands on forty elements, an `all` picks up properties nobody listed, and a
   declaration that loses a specificity tie is in the source and in no frame.

   SO THE CENSUS IS TAKEN FROM BOTH ENDS.
   --source  reads every stylesheet and every <style> block, by hand, with line
             numbers. This half can name a FILE, which the browser cannot.
   --output  resolves the corpus in Chrome and reads the computed style of every
             element that actually moves. This half can name a NUMBER that is
             true, which the source cannot.
   Neither replaces the other and the totals are not expected to match: a
   declaration with no element and an element with no declaration are both real
   findings, and each half is blind to one of them.

   FULL RECORDS, GROUPED AFTERWARDS. The walk does not collapse a mover into a
   key while reading it. Equality between 0.15s and 150ms and .15s is a decision
   about the product, and a decision taken inside the reader is a decision nobody
   can review: the run stores the raw spelling, the resolved ms and the owner, and
   groups them at the end, where the grouping can be printed and argued with.

   FOUR CORPORA, AND THEIR FATES DIFFER - which is why they are counted apart and
   never summed into one number:
     system    design/system/**.css        THE HOME. Motion belongs here.
     screens   design/*.html               A WRONG PLACE. Cut at step 3, and the
                                           ban goes into design/system/CLAUDE.md.
     stand     design/kit/**.html, _page.css   THE SHOWCASE, not the product. Its
                                           motion may stay and is not product law.
     frozen    wireframes/**.html          READ-ONLY since stage 05. Counted so
                                           the number exists, never touched.

   WRONG VERSION 1: IT COUNTED EVERY TIME VALUE IN THE FILE. `\d+ms` over a
   stylesheet also matches a `--dur`-shaped comment, a `steps(4)` and any number
   ending in s inside a content string, and on the first run `design/system/`
   reported durations that no transition had ever carried. Times are now read
   only out of the declarations that can hold one, and the declaration is named
   beside every value.

   WRONG VERSION 2: THE OUTPUT HALF ASKED ONLY THE INTERACTIVE ELEMENTS. It took
   the focusable selector from `focus.mjs` because that walk was already written,
   and it therefore could not see a skeleton, an overlay, a toast or a panel -
   which is to say it was blind to two of the three jobs, STATUS and CONNECTION,
   and could only ever have found RESPONSE. Every element in the document is
   asked now, and the ones that do not move are dropped after the reading, not
   before it.

   WRONG VERSION 4: IT TOOK EVERY OTHER TIME VALUE AS THE DURATION. A shorthand
   holds duration and delay in that order, so the reader kept the even indices -
   which is right for `a .15s .3s` and wrong for `a .15s, b .22s`, where both
   times are durations of different parts. The first run reported 11 durations
   over 103 occurrences and had silently dropped the second half of every
   multi-part shorthand in the product. Commas are split at depth zero now
   (`cubic-bezier(.4, 0, .2, 1)` is one part, not four) and the first time in a
   PART is its duration, the rest its delay.

   WRONG VERSION 5: IT READ COMMENTS AS CODE, IN BOTH HALVES. This repo comments
   heavily and quotes its own class names while doing it, so `patterns/action-row.css`
   was reported as carrying an `invalid` state on the strength of `.err-btns`
   written inside a comment listing the thirteen container names the pattern
   replaced. The same hole was open on the census: a rule quoted in a comment
   counts as a declaration, and a stage that decides three durations from those
   counts decides them from prose. Comments are blanked before either question is
   asked - blanked, not deleted, so the line numbers still point at the rule.

   WRONG VERSION 6: THE STATE LIST WAS A LIST TYPED FROM MEMORY. It asked about
   `[aria-selected]` and `.is-current` and did NOT ask about `[aria-current]`,
   which is the attribute this product actually uses - so `tabbar.css`, whose
   whole job is to mark the page you are standing on, was reported as having no
   state at all and would have gone into the «motion is not taken here» pile
   with a straight face. An under-reading list fails silently in the direction
   that looks like a clean result, which is the direction nothing checks. Every
   name in STATES was re-derived from the corpus rather than from habit.

   WRONG VERSION 7, AND IT APPEARED THE MOMENT THE STAGE STARTED WORKING. The
   curve counter read `\bease\b`, and `var(--ease-standard)` contains the word
   «ease» between two word boundaries. So every declaration converted onto the
   registry was counted as one more `ease` in the product: after two rounds the
   file said 133 where the census had started at 131, and the number went UP
   while the corpus got tidier. A `var()` reference is not a value; it is blanked
   before either the times or the curves are read, which is the comment rule one
   level down.

   AND ONE WRONG SENTENCE RATHER THAN A WRONG VERSION, corrected at 11.5. Step 3
   reported that «Chrome zeroes every transition itself under the reduced-motion
   emulation», which is why the token-swap probe was invented. Chrome does not.
   `base.css` carried `@media (prefers-reduced-motion: reduce){ *{ transition:
   none !important } }` from stage 07, headless Chrome answers `reduce` by
   default, and `cdp.mjs` had said exactly that in its own comment for two stages.
   The swap was the right instrument for a different reason - it separates a token
   reader from a literal, which no reduce pass can do - but the diagnosis beside it
   named the wrong cause, and a wrong cause left standing is how the next stage
   repeats the measurement and believes the same answer.

   WRONG VERSION 3: IT READ THE RESTING PAGE AND CALLED THAT THE PRODUCT. A
   transition declared on `:hover` is in the computed style of the resting element
   too (the property list and the duration are there, waiting), so this half does
   NOT need to hover - but an element inside a closed dialog is `display:none` and
   its computed style is still readable, so the count included movers no one can
   reach. Visibility is now recorded per element rather than filtered, because
   «declared on something invisible» is a finding of its own and dropping it would
   have hidden it.

   IDLE CONTROL. Every corpus declared above must match at least one file, and
   every property class the run declares (expensive, cheap, all) must be reachable
   - a class that can never fire is a green counter over an empty set. The run
   fails loudly if a corpus resolves to nothing.

   --states  is the SECOND corpus of the inventory of moments, and it exists
   because the first one cannot see it. A flow map never names the hover of a
   button: it describes the path between screens, so an inventory taken from
   screens finds CONNECTION and STATUS in full and finds RESPONSE almost not at
   all - and RESPONSE is nearly the whole of the atom rung. So the registry of
   states is read straight out of `inventory.md`, row by row, and every row gets
   a verdict whether or not any screen mentioned it. An absent row and an empty
   row are different things, and it is the absent one that slips through.

   node tools/motion.mjs                 both halves
   node tools/motion.mjs --source        the source half only, no browser
   node tools/motion.mjs --output        the browser half only
   node tools/motion.mjs --full          print every record, not the summary
   node tools/motion.mjs --states        the state registry, corpus B2 of step 1
   node tools/motion.mjs --surfaces     every surface whose APPEARANCE is a display switch
*/
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { Conn, newSession } from './cdp.mjs';
import { serve, chrome, ROOT, topRules } from './lib.mjs';

const argv = process.argv.slice(2);
const SRC_ONLY = argv.includes('--source');
const OUT_ONLY = argv.includes('--output');
const FULL = argv.includes('--full');

/* ---------- the corpora, declared, and each one idle-controlled ---------- */
const walk = (d, ext) => {
  const abs = join(ROOT, d);
  if (!existsSync(abs)) return [];
  return readdirSync(abs, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(d + '/' + e.name, ext)
      : ext.some(x => e.name.endsWith(x)) ? [d + '/' + e.name] : []);
};

/* WRONG VERSION 9, AND CODEX FOUND IT AT STEP 6 - the corpora had a HOLE between
   them. `system` walks `design/system/**.css` and `screens` walks `design/**.html`,
   so a stylesheet standing at the ROOT of `design/` is in neither. `_stand.css` is
   exactly that: the harness around every coloured screen, loaded by 91 of them,
   and it carried four literal durations and two layout animations while the census
   printed «screens: 1 file with motion» and «animates layout: 1». Four stages of
   numbers described a corpus that was missing a file moving on ninety-one pages.
   The reduce audit found the literals because that half asks the OUTPUT; the
   LAYOUT count is a source question, and only a corpus that includes the file can
   answer it. `harness` is its own key rather than being folded into `system`,
   because it is not the design system: it is the developer's shell around the
   product, and a number that mixes the two lies in a quieter way. */
const CORPORA = {
  system:  () => walk('design/system', ['.css']),
  /* AND THE FILTER WAS WRONG ON THE FIRST WRITING, which is the same fault one
     level down: `design/_stand.css` splits into TWO parts, not three, so the
     first version of this line excluded the only file it was written for and
     included `design/kit/_page.css`, which the stand corpus already holds. It
     reported «harness: 1 file, 0 with motion» - a corpus that looks measured and
     covers nothing. Depth 2 is the root of `design/`. */
  harness: () => walk('design', ['.css']).filter(p => p.split('/').length === 2),
  screens: () => walk('design', ['.html']).filter(p => !p.startsWith('design/kit/') && !p.startsWith('design/concept/')),
  stand:   () => [...walk('design/kit', ['.html']), ...walk('design/kit', ['.css'])],
  frozen:  () => walk('wireframes', ['.html', '.css']),
};

/* ---------- the source half ---------- */

/* the declarations that can carry a time or a curve, and nothing else - wrong
   version 1 read the whole file and invented durations out of comments */
const DECL = /(^|[;{\s])(transition|transition-duration|transition-property|transition-timing-function|transition-delay|animation|animation-name|animation-duration|animation-timing-function|animation-iteration-count|animation-delay|scroll-behavior|view-transition-name)\s*:\s*([^;}]+)/gi;
const TIME = /(?:^|[\s,(])(-?\d*\.?\d+)(ms|s)(?![a-z])/gi;
const EASE = /\b(linear|ease-in-out|ease-in|ease-out|ease|step-start|step-end)\b|(cubic-bezier|steps|linear)\s*\([^)]*\)/gi;
/* a property that costs layout, and the two that cost only paint - named apart
   because the pack decides them differently: layout is a defect, paint is a
   question put to the owner by name */
const LAYOUT = /\b(width|height|min-width|min-height|max-width|max-height|top|left|right|bottom|margin|margin-top|margin-right|margin-bottom|margin-left|padding|padding-top|padding-right|padding-bottom|padding-left|inset|flex|flex-basis|font-size|line-height|grid-template-columns|gap)\b/;
/* WRONG VERSION 8, and step 4 is what exposed it: `opacity` stood in BOTH lists.
   It was counted as paint-heavy and as cheap at the same time, so the two
   counters overlapped on the one property the pack names cheap by name. It cost
   nothing while the product barely used opacity; the moment step 4 put an
   opacity transition on twenty surfaces, «animates something expensive to paint»
   jumped from 73 to 107 and every one of the new ones was the cheapest thing in
   css. Opacity is composited, not painted - it belongs in CHEAP only, and step
   5's frame-cost table would have been built on the inflated number. */
const PAINT = /\b(box-shadow|filter|backdrop-filter|background|background-color|border-color|color|outline|outline-color|border-radius)\b/;
const CHEAP = /\b(transform|opacity)\b/;

/* A COMMENT IS NOT CODE, and this file learned it twice - see wrong version 5.
   Blanking rather than deleting, because the line number beside every record is
   the whole value of the source half: a comment removed shifts every line under
   it and the census starts naming the wrong rule. */
const decomment = css => css.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '));

/* split on commas that are not inside brackets - cubic-bezier(.4, 0, .2, 1)
   is ONE part and splitting it produces four durations that do not exist */
const splitTop = v => {
  const out = []; let depth = 0, cur = '';
  for (const ch of v) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out;
};

const styleBlocks = (text, file) => {
  if (!file.endsWith('.html')) return [{ css: text, lineOffset: 0 }];
  const out = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(text))) {
    out.push({ css: m[1], lineOffset: text.slice(0, m.index).split('\n').length - 1 });
  }
  /* inline style="" attributes can hold a transition too, and stage 04 proved
     this product writes them */
  const inl = /style\s*=\s*"([^"]*(?:transition|animation)[^"]*)"/gi;
  while ((m = inl.exec(text))) {
    out.push({ css: '.inline{' + m[1] + '}', lineOffset: text.slice(0, m.index).split('\n').length - 1 });
  }
  return out;
};

function scanSource() {
  const records = [];
  const keyframes = [];
  const reduceBlocks = [];
  const perCorpus = {};

  for (const [corpus, list] of Object.entries(CORPORA)) {
    const files = list();
    if (!files.length) {
      console.error(`ХОЛОСТИЙ КОНТРОЛЬ ВПАВ: корпус «${corpus}» не дав жодного файлу. Перевір адресу, а не результат.`);
      process.exit(2);
    }
    perCorpus[corpus] = { files: files.length, withMotion: new Set() };

    for (const f of files) {
      const text = readFileSync(join(ROOT, f), 'utf8');
      for (const { css: raw, lineOffset } of styleBlocks(text, f)) {
        const css = decomment(raw);
        for (const km of css.matchAll(/@keyframes\s+([A-Za-z0-9_-]+)/g)) {
          keyframes.push({ corpus, file: f, name: km[1],
            line: lineOffset + css.slice(0, km.index).split('\n').length });
          perCorpus[corpus].withMotion.add(f);
        }
        for (const rm of css.matchAll(/@media[^{]*prefers-reduced-motion[^{]*/gi)) {
          reduceBlocks.push({ corpus, file: f,
            line: lineOffset + css.slice(0, rm.index).split('\n').length });
        }
        DECL.lastIndex = 0;
        let m;
        while ((m = DECL.exec(css))) {
          const prop = m[2].toLowerCase();
          const value = m[3].trim().replace(/\s+/g, ' ');
          const line = lineOffset + css.slice(0, m.index).split('\n').length;
          const bare = value.replace(/var\(\s*--[a-z0-9-]+\s*\)/gi, ' ');
          /* PER COMMA-PART, never by index parity - wrong version 4 below.
             In `transition: a .15s, b .22s` both times are DURATIONS of
             different parts; in `transition: a .15s .3s` the second is a
             DELAY of the same part. Only the shape of the part can tell
             them apart, so the part is what gets read. */
          const times = splitTop(bare).flatMap(part => {
            const ts = [...part.matchAll(TIME)];
            return ts.map((t, i) => ({
              raw: t[1] + t[2],
              ms: t[2] === 'ms' ? parseFloat(t[1]) : parseFloat(t[1]) * 1000,
              kind: i === 0 ? 'duration' : 'delay',
              part: part.trim(),
            }));
          });
          /* `var(--ease-standard)` contains the word «ease», and `\bease\b`
             matches inside it: the moment the stage started converting files,
             the curve counter began counting TOKEN NAMES as curves and the
             number went UP while the product got tidier. A var() reference is
             not a value, so it is blanked before the value is read - the same
             reasoning as blanking comments, one level down. */
          const eases = [...bare.matchAll(EASE)].map(e => e[0]);
          records.push({
            corpus, file: f, line, prop, value,
            times, eases,
            isAll: /(^|[\s,])all([\s,]|$)/.test(value) && /^transition(-property)?$/.test(prop),
            layout: /^transition(-property)?$/.test(prop) && LAYOUT.test(value),
            paint: /^transition(-property)?$/.test(prop) && PAINT.test(value),
            cheap: /^transition(-property)?$/.test(prop) && CHEAP.test(value),
          });
          perCorpus[corpus].withMotion.add(f);
        }
      }
    }
  }
  return { records, keyframes, reduceBlocks, perCorpus };
}

/* ---------- the browser half ---------- */

/* every element, full record, dropped afterwards rather than filtered before */
const EXPR = `(() => {
  const out = [];
  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el);
    const td = cs.transitionDuration || '0s';
    const an = cs.animationName || 'none';
    const moves = td.split(',').some(v => parseFloat(v) > 0) || an !== 'none';
    if (!moves) continue;
    out.push({
      tag: el.tagName.toLowerCase(),
      cls: (el.getAttribute('class') || '').slice(0, 70),
      tp: cs.transitionProperty, td, tf: cs.transitionTimingFunction,
      an, ad: cs.animationDuration, af: cs.animationTimingFunction,
      ai: cs.animationIterationCount,
      seen: !!(el.checkVisibility && el.checkVisibility({ checkVisibilityCSS: true, checkOpacity: true })),
    });
  }
  return JSON.stringify(out);
})()`;

async function scanOutput() {
  const screens = CORPORA.screens().map(p => p.replace(/^design\//, '').replace(/\.html$/, ''));
  const stands = CORPORA.stand().filter(p => p.endsWith('.html'))
    .map(p => p.replace(/^design\//, '').replace(/\.html$/, ''));
  const corpus = [...screens.map(p => ({ corpus: 'screens', p })),
                  ...stands.map(p => ({ corpus: 'stand', p }))];

  const srv = await serve();
  const l = await chrome('motion');
  const conn = await Conn.open(l.wsUrl);
  const s = await newSession(conn);
  await conn.send('Emulation.setDeviceMetricsOverride',
    { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, s.sessionId);

  const rows = [];
  let n = 0;
  for (const { corpus: c, p } of corpus) {
    const loaded = conn.once('Page.loadEventFired', s.sessionId);
    await conn.send('Page.navigate', { url: `${srv.base}/design/${p}.html` }, s.sessionId);
    await loaded;
    const r = await conn.send('Runtime.evaluate', { expression: EXPR, returnByValue: true }, s.sessionId);
    for (const rec of JSON.parse(r.result.value || '[]')) rows.push({ ...rec, page: p, corpus: c });
    if (++n % 25 === 0) console.log(`  ... ${n}/${corpus.length} сторінок`);
  }
  l.kill && l.kill();
  srv.stop && srv.stop();
  return { rows, pages: corpus.length };
}

/* ---------- reporting ---------- */

const tally = (arr, key) => {
  const m = new Map();
  for (const x of arr) { const k = key(x); m.set(k, (m.get(k) || 0) + 1); }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

function reportSource(src) {
  const { records, keyframes, reduceBlocks, perCorpus } = src;
  console.log('\n=== A1 - ДЖЕРЕЛО (grep по файлах) ===\n');
  for (const [c, v] of Object.entries(perCorpus)) {
    console.log(`  ${c.padEnd(9)} файлів ${String(v.files).padStart(4)} · з рухом ${String(v.withMotion.size).padStart(3)}`);
  }

  const byCorpus = c => records.filter(r => r.corpus === c);
  /* THE HARNESS COUNTS AS PRODUCT HERE, and it is labelled rather than folded in
     silently: it is not the design system, but it loads on 91 coloured screens,
     so a layout animation inside it costs a person exactly what one inside a
     component costs. Excluding it is how it stayed invisible for four stages. */
  const product = records.filter(r => r.corpus === 'system' || r.corpus === 'screens' || r.corpus === 'harness');

  console.log('\n  ГОЛОВНІ ЧИСЛА (корпус ПРОДУКТУ: system + screens + harness; стенд і заморожений окремо)\n');

  const durs = product.flatMap(r => r.times.filter(t => t.kind === 'duration'));
  const delays = product.flatMap(r => r.times.filter(t => t.kind === 'delay'));
  const byRaw = tally(durs, d => d.raw);
  const byMs = tally(durs, d => d.ms + 'ms');
  console.log(`  різних тривалостей за ЗНАЧЕННЯМ: ${byMs.length}`);
  for (const [k, n] of byMs) console.log(`      ${k.padStart(8)}  ×${n}`);
  console.log(`  різних тривалостей за НАПИСАННЯМ: ${byRaw.length}  (${byRaw.map(([k, n]) => k + '×' + n).join(' · ')})`);
  console.log(`  затримок (delay), окремо від тривалостей: ${delays.length}`
    + (delays.length ? '  ' + tally(delays, d => d.raw).map(([k, n]) => k + '×' + n).join(' · ') : ''));

  const eases = product.flatMap(r => r.eases);
  const byEase = tally(eases, e => e.toLowerCase());
  console.log(`\n  різних кривих: ${byEase.length}`);
  for (const [k, n] of byEase) console.log(`      ${k.padEnd(28)} ×${n}`);

  const all = product.filter(r => r.isAll);
  const layout = product.filter(r => r.layout);
  const paint = product.filter(r => r.paint && !r.layout);
  const cheap = product.filter(r => r.cheap);
  console.log(`\n  transition: all             ${all.length}`);
  console.log(`  анімують ДОРОГУ (розкладка) ${layout.length}`);
  console.log(`  анімують ДОРОГУ (малювання) ${paint.length}`);
  console.log(`  анімують transform/opacity  ${cheap.length}`);
  console.log(`  @keyframes у продукті       ${keyframes.filter(k => k.corpus === 'system' || k.corpus === 'screens' || k.corpus === 'harness').length}`
    + `  (${[...new Set(keyframes.filter(k => k.corpus !== 'stand' && k.corpus !== 'frozen').map(k => k.name))].join(', ') || '-'})`);
  console.log(`  блоків prefers-reduced-motion у продукті  ${reduceBlocks.filter(r => r.corpus === 'system' || r.corpus === 'screens').length}`
    + `  у файлах: ${[...new Set(reduceBlocks.filter(r => r.corpus === 'system').map(r => r.file.split('/').pop()))].join(', ') || '-'}`);

  if (all.length) { console.log('\n  ДЕ САМЕ transition: all'); for (const r of all) console.log(`      ${r.file}:${r.line}  ${r.prop}: ${r.value}`); }
  if (layout.length) {
    console.log('\n  ДЕ САМЕ анімується розкладка');
    for (const r of layout) console.log(`      ${r.file}:${r.line}  ${r.prop}: ${r.value.slice(0, 80)}`);
  }
  const inScreens = byCorpus('screens');
  if (inScreens.length) {
    console.log(`\n  РУХ У ФАЙЛІ ЕКРАНА (заборонений з кроку 6): ${inScreens.length} оголошень`);
    for (const r of inScreens) console.log(`      ${r.file}:${r.line}  ${r.prop}: ${r.value.slice(0, 70)}`);
  }
  console.log(`\n  стенд (не продукт): ${byCorpus('stand').length} оголошень · заморожений корпус: ${byCorpus('frozen').length} оголошень, не чіпаємо`);

  if (FULL) {
    console.log('\n  ПОВНИЙ ПЕРЕПИС ДЖЕРЕЛА');
    for (const r of product) console.log(`      ${r.corpus.padEnd(8)} ${r.file}:${r.line}  ${r.prop}: ${r.value.slice(0, 90)}`);
  }
}

function reportOutput(out) {
  const { rows, pages } = out;
  console.log('\n=== A2 - ВИХІД (обчислений стиль у браузері, 1280) ===\n');
  const prod = rows.filter(r => r.corpus === 'screens');
  const stand = rows.filter(r => r.corpus === 'stand');
  console.log(`  сторінок пройдено ${pages} · елементів, що рухаються: ${rows.length}  (екрани ${prod.length} · стенд ${stand.length})`);
  console.log(`  з них НЕВИДИМИХ у момент зняття: ${prod.filter(r => !r.seen).length} на екранах`);

  const durs = prod.flatMap(r => r.td.split(',').map(v => v.trim()).filter(v => parseFloat(v) > 0));
  const byDur = tally(durs, d => d);
  console.log(`\n  різних тривалостей У ВИХОДІ: ${byDur.length}`);
  for (const [k, n] of byDur) console.log(`      ${k.padStart(8)}  ×${n}`);

  /* the animation half of the output, counted apart: a @keyframes duration lives
     in animationDuration and NOT in transitionDuration, so a report that tallies
     only the second one says the product has fewer durations than it has - the
     source half named .9s and 1.1s and this table had lost both */
  const adurs = prod.filter(r => r.an !== 'none')
    .flatMap(r => r.ad.split(',').map(v => v.trim()).filter(v => parseFloat(v) > 0));
  const byAdur = tally(adurs, d => d);
  console.log(`\n  тривалості ЦИКЛІВ (@keyframes), окремо: ${byAdur.length}`
    + (byAdur.length ? '  ' + byAdur.map(([k, n]) => `${k}×${n}`).join(' · ') : ' - жодного'));
  console.log(`  РАЗОМ різних тривалостей у виході: ${new Set([...byDur.map(d => d[0]), ...byAdur.map(d => d[0])]).size}`);

  const fns = prod.flatMap(r => r.tf.split(/,(?![^(]*\))/).map(v => v.trim()).filter(Boolean));
  const byFn = tally(fns, f => f);
  console.log(`\n  різних кривих У ВИХОДІ: ${byFn.length}`);
  for (const [k, n] of byFn) console.log(`      ${k.padEnd(32)} ×${n}`);

  const anims = prod.filter(r => r.an !== 'none');
  console.log(`\n  елементів з @keyframes-анімацією: ${anims.length}`
    + `  (${[...new Set(anims.map(a => a.an))].join(', ') || '-'})`);

  const props = prod.flatMap(r => r.tp.split(',').map(v => v.trim()));
  const byProp = tally(props, p => p);
  console.log(`\n  властивості в переходах (top 14 з ${byProp.length}):`);
  for (const [k, n] of byProp.slice(0, 14)) console.log(`      ${k.padEnd(24)} ×${n}`);
  const expensive = byProp.filter(([p]) => LAYOUT.test(p));
  console.log(`  з них коштують РОЗКЛАДКУ: ${expensive.map(([p, n]) => p + '×' + n).join(' · ') || 'жодної'}`);

  console.log('\n  ЗА РОЛЛЮ - однакова роль мусить мати однакове число');
  const role = r => {
    const c = r.cls;
    if (/\bbtn\b|\bbtn--|navbtn|\bgo\b|cartbtn/.test(c)) return 'кнопка';
    if (/field|input|txt-|co-input|otp/.test(c)) return 'поле';
    if (/card\b|pcard|blogcard|clcard/.test(c)) return 'картка';
    if (/link|flink|dr-link/.test(c)) return 'посилання';
    if (/chip|fopt|tab\b|toggle|switch|check|radio/.test(c)) return 'перемикач';
    if (/sk[a-z]*|skel/.test(c)) return 'скелетон';
    if (/toast|overlay|drawer|sheet|dialog|modal/.test(c)) return 'поверхня';
    return 'інше';
  };
  const groups = new Map();
  for (const r of prod) {
    const k = role(r);
    if (!groups.has(k)) groups.set(k, new Map());
    for (const d of r.td.split(',').map(v => v.trim()).filter(v => parseFloat(v) > 0)) {
      groups.get(k).set(d, (groups.get(k).get(d) || 0) + 1);
    }
  }
  for (const [k, m] of [...groups].sort((a, b) => b[1].size - a[1].size)) {
    const list = [...m.entries()].sort((a, b) => b[1] - a[1]).map(([d, n]) => `${d}×${n}`).join(' · ');
    console.log(`      ${k.padEnd(11)} ${m.size} різних: ${list}`);
  }
  /* «інше» carrying the most durations is not an answer, it is the question
     unopened: a bucket that holds eight numbers hides exactly what the grouping
     was built to show. Its biggest carriers are named so the next reading can
     give them a role or rule them out. */
  const rest = prod.filter(r => role(r) === 'інше');
  const byCls = tally(rest, r => (r.cls.split(/\s+/)[0] || r.tag));
  console.log(`      з «інше» (${rest.length} елементів) найбільші носії:`);
  for (const [k, n] of byCls.slice(0, 10)) {
    const ds = [...new Set(rest.filter(r => (r.cls.split(/\s+/)[0] || r.tag) === k)
      .flatMap(r => r.td.split(',').map(v => v.trim()).filter(v => parseFloat(v) > 0)))];
    console.log(`          ${('.' + k).slice(0, 26).padEnd(27)} ×${String(n).padStart(5)}  ${ds.join(' ')}`);
  }

  if (FULL) {
    console.log('\n  ПОВНИЙ ПЕРЕПИС ВИХОДУ');
    for (const r of prod) console.log(`      ${r.page.padEnd(24)} ${r.tag}.${r.cls.slice(0, 34).padEnd(34)} ${r.td.padEnd(24)} ${r.tf.slice(0, 30)} ${r.an}`);
  }
}

/* ---------- the state registry, corpus B2 ---------- */

/* the states a component can actually be in, read out of its own file. The
   STAND PAGE is the place a person reads them; the css is where they are true,
   and the two are asked together so that a page describing a state its file no
   longer holds shows up as the mismatch it is (stage 10 found 22 pages doing
   exactly that about width). */
const STATES = [
  ['hover',     /:hover\b/],
  ['focus-vis', /:focus-visible\b/],
  ['focus',     /:focus\b(?!-visible)/],
  ['active',    /:active\b/],
  ['disabled',  /:disabled\b|\[disabled\]|\[aria-disabled/],
  ['checked',   /:checked\b|\[aria-checked|\[aria-pressed/],
  ['open',      /\[aria-expanded|\[open\]|\.is-open|\.open\b|\.on\b/],
  ['selected',  /\[aria-selected|\[aria-current|\.is-current|\.current\b|\.sel\b/],
  ['busy',      /\[aria-busy|\.loading\b|skpulse|\.sk[a-z]/],
  ['invalid',   /:invalid\b|\[aria-invalid|\.err\b|\.error\b|--err/],
];

function reportStates() {
  const md = readFileSync(join(ROOT, 'design/kit/docs/inventory.md'), 'utf8').split('\n');
  let level = '-';
  const rows = [];
  for (const line of md) {
    const h = line.match(/^##+\s+(.*)$/);
    if (h) {
      const t = h[1].toLowerCase();
      level = /atom/.test(t) ? 'atom' : /molecule/.test(t) ? 'molecule'
        : /organism/.test(t) ? 'organism' : /pattern|патерн/.test(t) ? 'pattern' : level;
      continue;
    }
    const m = line.match(/^\|\s*([^|]+?)\s*\|\s*`([^`]+\.css)`\s*\|/);
    if (!m) continue;
    rows.push({ name: m[1].trim(), file: m[2].trim(), level });
  }
  if (!rows.length) { console.error('ХОЛОСТИЙ КОНТРОЛЬ ВПАВ: inventory.md не дав жодного рядка компонента.'); process.exit(2); }

  const out = [];
  let missing = 0;
  for (const r of rows) {
    const rel = r.file.includes('/') ? `design/system/${r.file}` : `design/system/components/${r.file}`;
    const abs = join(ROOT, rel);
    if (!existsSync(abs)) { console.error(`  РЯДОК БЕЗ ФАЙЛУ: ${r.name} -> ${rel}`); missing++; continue; }
    const css = decomment(readFileSync(abs, 'utf8'));
    const has = STATES.filter(([, re]) => re.test(css)).map(([n]) => n);
    const stand = join(ROOT, 'design/kit/' + r.file.split('/').pop().replace('.css', '.html'));
    const moves = /(^|[;{\s])(transition|animation)\s*:/.test(css);
    out.push({ ...r, has, stand: existsSync(stand), moves });
  }
  if (missing) { console.error(`ХОЛОСТИЙ КОНТРОЛЬ ВПАВ: ${missing} рядків інвентаря не мають файлу.`); process.exit(2); }

  console.log('\n=== B2 - РЕЄСТР СТАНІВ (корпус ВІДПОВІДІ) ===\n');
  const order = ['atom', 'molecule', 'organism', 'pattern', '-'];
  for (const lv of order) {
    const g = out.filter(r => r.level === lv);
    if (!g.length) continue;
    const withState = g.filter(r => r.has.length).length;
    const withMove = g.filter(r => r.moves).length;
    console.log(`  ${lv.toUpperCase()}  компонентів ${g.length} · мають хоч один стан ${withState} · вже рухаються ${withMove}`);
    for (const r of g) {
      console.log(`      ${(r.has.length ? ' ' : '!')} ${r.name.slice(0, 22).padEnd(23)} ${r.file.split('/').pop().padEnd(22)}`
        + `${r.moves ? 'рух' : '   '}  ${r.has.join(' ') || 'СТАНІВ НЕМАЄ'}`);
    }
  }
  const noState = out.filter(r => !r.has.length);
  const noMove = out.filter(r => r.has.length && !r.moves);
  console.log(`\n  РАЗОМ: ${out.length} рядків інвентаря, вердикт на кожному.`);
  console.log(`  без жодного стану (кандидат у «рух не береться»): ${noState.length}`
    + (noState.length ? ' - ' + noState.map(r => r.name).join(', ') : ''));
  console.log(`  МАЮТЬ СТАН І НЕ РУХАЮТЬСЯ (робота ВІДПОВІДЬ, ще не зроблена): ${noMove.length}`);
  for (const [n, re] of STATES) {
    const k = out.filter(r => r.has.includes(n)).length;
    console.log(`      стан ${n.padEnd(10)} у ${String(k).padStart(3)} компонентах`);
  }
  const noStand = out.filter(r => !r.stand);
  console.log(`  рядків без сторінки стенда: ${noStand.length}${noStand.length ? ' - ' + noStand.map(r => r.name).join(', ') : ''}`);
}

/* ---------- the level roll-call, step 3 ---------- */

/* WRONG VERSION 1 OF THE ROLL-CALL: IT MEASURED THE PAGE, NOT THE COMPONENT.
   It read every moving element on a component's stand page, so `price` was
   reported as MOVING on 0.18s - a number `price.css` does not contain, borrowed
   from the product card standing in its own demo two blocks down. Three of the
   four «surprises» in the first run were other components.
   AND THE OBVIOUS FIX WAS ALSO WRONG: scoping by the Anchors column of
   `inventory.md` gives `.btn`, `.navbtn`, `.go` for the button - and `.btn`
   matches NOTHING in this product, because the transition lives on the finishes
   (`.btn--accent, .btn--outline, .btn--ghost, .btn--text`) and the markup wears
   those without a base class. A maintained list was two steps away from the
   truth; the file itself is zero steps away. The scope is now every selector the
   component's OWN css declares, with its pseudo-classes stripped so it matches
   at rest.

   WRONG VERSION 2, AND IT IS THE ONE WORTH READING TWICE. The proof that a
   component READS THE REGISTRY was taken by emulating
   `prefers-reduced-motion: reduce` and checking that its duration collapsed.
   Every component passed. Then the same probe was pointed at `product-card`,
   which carries a bare `.18s` literal and reads no token at all:

     NORMAL  .pcard  transitionDuration «0.18s, 0.18s, 0.18s»   token 150ms
     REDUCE  .pcard  transitionDuration «0s»                    token 1ms

   CHROME ZEROES EVERY TRANSITION ITSELF UNDER THAT EMULATION. So the pass could
   not distinguish a component that obeys the token from one that ignores it: it
   returned «no motion anywhere» for both and the run printed «every value
   disappeared, therefore it came from a token», which was a sentence about
   nothing. A green counter over an empty set, which is the exact failure this
   repository writes into every instrument it owns - and it took pointing the
   probe at a case that MUST fail to see it.

   WHAT PROVES IT INSTEAD: SWAP THE TOKEN. The page is loaded once, the movers
   are read, `--dur-fast/base/slow` are then overridden on `:root` with three
   values that appear nowhere in the product, and the same elements are read
   again. An element that follows the swap was reading `var()`; an element that
   does not move carries its own number. There is no ambiguity left and no
   emulation involved.

   The `reduce` emulation keeps its own job at step 5, with its limit written
   down: it can prove that NOTHING moves, and it can never prove WHY. */
async function reportRoll(level) {
  const md = readFileSync(join(ROOT, 'design/kit/docs/inventory.md'), 'utf8').split('\n');
  let lv = '-';
  const rows = [];
  for (const line of md) {
    const h = line.match(/^##+\s+(.*)$/);
    if (h) {
      const t = h[1].toLowerCase();
      lv = /atom/.test(t) ? 'atom' : /molecule/.test(t) ? 'molecule'
        : /organism/.test(t) ? 'organism' : /pattern|патерн/.test(t) ? 'pattern' : lv;
      continue;
    }
    const m = line.match(/^\|\s*([^|]+?)\s*\|\s*`([^`]+\.css)`\s*\|/);
    if (m && lv === level) rows.push({ name: m[1].trim(), file: m[2].trim() });
  }
  if (!rows.length) { console.error(`ХОЛОСТИЙ КОНТРОЛЬ ВПАВ: рівень «${level}» не дав жодного рядка.`); process.exit(2); }

  /* the component's own selectors, taken out of its own file */
  const scopeOf = (cssFile) => {
    const abs = join(ROOT, cssFile.includes('/') ? `design/system/${cssFile}` : `design/system/components/${cssFile}`);
    if (!existsSync(abs)) return [];
    const css = decomment(readFileSync(abs, 'utf8'));
    const sels = new Set();
    for (const span of topRules(css)) {
      const text = css.slice(span.start, span.end);
      const brace = text.indexOf('{');
      if (brace < 0) continue;
      const prelude = text.slice(0, brace).trim();
      if (prelude.startsWith('@')) continue;
      for (let sel of prelude.split(',')) {
        sel = sel.trim()
          .replace(/::[a-z-]+(\([^)]*\))?/g, '')      // a pseudo-element cannot be queried
          .replace(/:(hover|focus|focus-visible|focus-within|active|checked|disabled|invalid|valid|indeterminate|target|visited|link)\b/g, '')
          .replace(/\s+/g, ' ').trim();
        if (sel && !sel.includes('@')) sels.add(sel);
      }
    }
    return [...sels];
  };

  /* three values that appear nowhere in this product, so a match is not a
     coincidence and a miss is not a rounding */
  const SWAP = { fast: '7.77s', base: '8.88s', slow: '9.99s' };

  const exprFor = (sels) => `(() => {
    const SEL = ${JSON.stringify(sels)};
    const seen = new Set();
    /* THE STAND SHOWS SOME ORGANISMS INSIDE A SAME-ORIGIN <iframe> - every coach
       component does, through demo/*.html - and a query on the top document
       finds none of them. Wrong version 3 of this walk reported «no own selector
       matched, verdict impossible» for eight components in a row, which was at
       least honest about not knowing; a walk that had answered «does not move»
       would have closed the round on an empty set. The frames are walked too. */
    const docs = [document];
    for (const f of document.querySelectorAll('iframe')) {
      try { if (f.contentDocument) docs.push(f.contentDocument); } catch (e) {}
    }
    for (const d of docs) for (const s of SEL) { try { d.querySelectorAll(s).forEach(e => seen.add(e)); } catch (e) {} }
    const els = [...seen];
    /* THE PSEUDO-ELEMENT IS WHERE SOME COMPONENTS KEEP THEIR MOTION, and the
       scope strips the pseudo part to make the selector queryable - so the walk
       read the HOST, which has no transition, and reported «does not move» for
       two components that do. pdp-tabs animates the opacity of its own ::before
       shelf; price-slider animates ::-webkit-slider-thumb, a VENDOR pseudo that
       getComputedStyle cannot read at all. The two standard ones are read here;
       the vendor one is named as a limit rather than answered, and the file is
       asked instead.
       (No backticks in this comment on purpose: it lives inside a template
       literal, and the first one closed the string.) */
    const durOf = (cs) => (cs.transitionDuration || '0s').split(',').map(v => parseFloat(v));
    const read = () => els.map(el => {
      const cs = getComputedStyle(el);
      const b = getComputedStyle(el, '::before'), a = getComputedStyle(el, '::after');
      const all = [durOf(cs), durOf(b), durOf(a)];
      const pick = all.find(x => x.some(v => v > 0)) || all[0];
      const which = all.indexOf(pick) === 1 ? '::before' : all.indexOf(pick) === 2 ? '::after' : '';
      const src = which === '::before' ? b : which === '::after' ? a : cs;
      return { d: pick, p: src.transitionProperty, an: cs.animationName, ad: cs.animationDuration, which };
    });
    const before = read();
    const css = ':root{--dur-fast:${SWAP.fast};--dur-base:${SWAP.base};--dur-slow:${SWAP.slow};}';
    const styles = docs.map(d => {
      const st = d.createElement('style'); st.textContent = css;
      (d.head || d.documentElement).appendChild(st); return st;
    });
    const after = read();
    for (const st of styles) st.remove();
    const SW = [7.77, 8.88, 9.99];
    const out = [];
    for (let i = 0; i < els.length; i++) {
      const b = before[i], a = after[i];
      const max = Math.max(0, ...b.d.filter(v => v > 0));
      if (!max && b.an === 'none') continue;
      /* every positive duration of this element followed the swap, or it did not */
      const parts = b.d.map((v, k) => ({ v, after: a.d[k] }));
      const moved = parts.filter(x => x.v > 0);
      const followed = moved.length > 0 && moved.every(x => SW.includes(+x.after.toFixed(2)));
      const stuck = moved.filter(x => !SW.includes(+x.after.toFixed(2))).map(x => x.v + 's');
      out.push({ cls: (els[i].getAttribute('class') || els[i].tagName).slice(0, 40) + (b.which || ''),
                 max, props: b.p, an: b.an, ad: b.ad, followed, stuck: [...new Set(stuck)] });
      /* the class list travels with the finding: a stuck element inside this
         component's scope is very often ANOTHER component's declaration winning
         on a shared element, and a number with no carrier cannot be attributed */
    }
    return JSON.stringify({ scope: els.length, movers: out });
  })()`;

  const srv = await serve();
  const l = await chrome('roll');
  const conn = await Conn.open(l.wsUrl);
  const s = await newSession(conn);
  await conn.send('Emulation.setDeviceMetricsOverride',
    { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, s.sessionId);

  const read = async (page, sels) => {
    const loaded = conn.once('Page.loadEventFired', s.sessionId);
    await conn.send('Page.navigate', { url: `${srv.base}/design/kit/${page}.html` }, s.sessionId);
    await loaded;
    const r = await conn.send('Runtime.evaluate', { expression: exprFor(sels), returnByValue: true }, s.sessionId);
    return JSON.parse((r.result && r.result.value) || '{"scope":0,"movers":[]}');
  };

  console.log(`\n=== ПЕРЕКЛИЧКА РІВНЯ: ${level.toUpperCase()} ===\n`);
  const results = [];
  for (const r of rows) {
    const page = r.file.split('/').pop().replace('.css', '');
    const sels = scopeOf(r.file);
    const { scope, movers } = await read(page, sels);
    const durs = [...new Set(movers.map(x => x.max).filter(v => v > 0))].sort((a, b) => a - b);
    const cycles = [...new Set(movers.filter(x => x.an !== 'none').map(x => x.an + ' ' + x.ad))];
    const literal = [...new Set(movers.filter(x => x.max > 0 && !x.followed).flatMap(x => x.stuck))];
    const carriers = [...new Set(movers.filter(x => x.max > 0 && !x.followed).map(x => x.cls))].slice(0, 4);
    /* AND THE FILE IS ASKED SEPARATELY FROM THE PAGE. What fails a round is a
       literal in the component's OWN declarations; a literal reaching one of its
       elements from another file is a real finding and belongs to the round that
       owns that file, so it is printed and carried, not counted as this one's. */
    const ownAbs = join(ROOT, r.file.includes('/') ? `design/system/${r.file}` : `design/system/components/${r.file}`);
    const ownCss = existsSync(ownAbs) ? decomment(readFileSync(ownAbs, 'utf8')) : '';
    const ownLit = [...ownCss.matchAll(/transition[a-z-]*\s*:\s*([^;}]+)/g)]
      .map(m => m[1].replace(/var\(\s*--[a-z0-9-]+\s*\)/gi, ' '))
      .filter(v => /(?<![\w-])(?!0+(\.0+)?m?s)\d*\.?\d+m?s(?![a-z])/.test(v));
    const ownDecl = /transition[a-z-]*\s*:/.test(ownCss) || /animation[a-z-]*\s*:/.test(ownCss);
    results.push({ name: r.name, page, sels: sels.length, scope, durs, cycles,
                   movers: movers.filter(x => x.max > 0).length, literal, carriers,
                   ownLit: ownLit.length, ownDecl });
  }
  l.kill && l.kill();
  srv.stop && srv.stop();

  let moves = 0, still = 0, bad = [], carried = [];
  for (const r of results) {
    const verdict = r.durs.length ? 'РУХАЄТЬСЯ' : (r.cycles.length ? 'ЦИКЛ' : 'не рухається');
    if (r.durs.length || r.cycles.length) moves++; else still++;
    console.log(`  ${verdict.padEnd(12)} ${r.name.slice(0, 22).padEnd(23)} ${r.page.padEnd(16)}`
      + `елементів ${String(r.scope).padStart(4)} рух ${String(r.movers).padStart(4)}  `
      + `${(r.durs.join('/') || '-').padEnd(10)} `
      + (r.ownLit ? 'ЛІТЕРАЛ У ФАЙЛІ' : r.literal.length ? 'чуже: ' + r.literal.join(' ') : r.durs.length ? 'читає реєстр' : '')
      + (r.cycles.length ? '  цикл: ' + r.cycles.join(' ') : ''));
    if (r.ownLit) bad.push(`${r.name} (${r.page}): ${r.ownLit} оголошень власного файлу несуть число, а не var()`);
    else if (r.literal.length) carried.push(`${r.name} (${r.page}): ${r.literal.join(', ')} приходить з ЧУЖОГО файлу на ${r.carriers.join(', ')}`);
    if (r.ownDecl && !r.durs.length && !r.cycles.length) carried.push(`${r.name} (${r.page}): файл ОГОЛОШУЄ рух, на сторінці його не видно - вендорний псевдоелемент або стан, якого стенд не показує`);
    /* a component whose own selectors match NOTHING on its own stand page cannot
       be given a verdict at all, and «no movers» would read as a decision */
    if (!r.scope) bad.push(`${r.name} (${r.page}): жоден власний селектор не збігся на стенді - вердикт неможливий`);
  }
  console.log(`\n  N = ${results.length} · M (рухається) = ${moves} · K (свідомо ні) = ${still} · M + K = ${moves + still}`);
  if (moves + still !== results.length) { console.log('  РАУНД НЕ ЗАКРИТИЙ: числа не сходяться'); process.exit(1); }
  if (carried.length) {
    console.log('\n  НЕСЕТЬСЯ В НАСТУПНИЙ РАУНД (' + carried.length + ') - чужий літерал на спільному елементі:');
    for (const c of carried) console.log('    ' + c);
  }
  if (bad.length) { console.log('\n  ЛІТЕРАЛ У ВЛАСНОМУ ФАЙЛІ (' + bad.length + '):'); for (const b of bad) console.log('    ' + b); process.exit(1); }
  console.log(`\n  ПІДМІНА ТОКЕНА: власні оголошення рівня пішли за ${SWAP.fast}/${SWAP.base}/${SWAP.slow}, отже читається var(), а не число у файлі`);
}

/* ---------- surfaces: what an ordinary transition cannot see at all ----------
   STEP 4 ASKS A QUESTION STEP 3 COULD NOT. A component that reads `--dur-fast`
   passes the roll-call and still does not move, because the property it changes
   is `display`, and `display` is a DISCRETE property: it has no midpoint, so a
   transition has nothing to interpolate. Every dialog, overlay, menu and
   accordion in this product opens that way. The roll-call was right about every
   one of them and the screen was still instant.

   WRONG VERSION 1 - IT ASSUMED THE MARKER STANDS ON THE VISIBLE SIDE. The first
   writing looked for a rule whose selector carries `.open` and whose body sets a
   visible `display`, which is the shape of eighteen of them. It is not the shape
   of `cookie-banner.css`: `.wf-cookie.hidden{ display: none }` is a surface that
   is on by default and is taken AWAY by its state class. The banner is the one
   surface every visitor sees, and it was the one the instrument could not see.
   The list is now read from both ends, and the count went 19 -> 20.

   WHAT IT CANNOT ANSWER, said here rather than found later: it reads the source,
   so a surface whose `display` is switched from javascript - `element.style` or
   the `hidden` attribute - is invisible to it. The split view's `#clDetailBody`
   is exactly that case, it is handled by hand in `coach-clients.css`, and it is
   written into `motion.md` beside this number so the two do not drift apart. */
function reportSurfaces() {
  const files = CORPORA.system().filter(f => /\/(components|patterns)\//.test(f));
  const rows = [];
  for (const rel of files) {
    const css = decomment(readFileSync(join(ROOT, rel), 'utf8'));
    const re = /([^{}]+)\{([^{}]*)\}/g; let m;
    while ((m = re.exec(css))) {
      const sel = m[1].trim().replace(/\s+/g, ' ');
      const body = m[2];
      const d = body.match(/display\s*:\s*([a-z-]+)/);
      if (!d) continue;
      const marker = /\.(open|on|show|active|hidden|is-[a-z-]+|visible)\b|\[aria-(expanded|selected|current)|\[data-open|\[hidden\]/.test(sel);
      if (!marker) continue;
      const hiddenSide = /\.(hidden|is-hidden)\b|\[hidden\]/.test(sel);
      if (d[1] === 'none' && !hiddenSide) continue;
      if (d[1] !== 'none' && hiddenSide) continue;
      const line = css.slice(0, m.index).split('\n').length;
      /* WRONG VERSION 2 - THE VERDICT WAS PER FILE AND THE QUESTION IS PER RULE.
         The first writing asked whether `allow-discrete` appeared ANYWHERE in the
         stylesheet, so `header.css`, which holds three surfaces, would have
         reported all three answered the moment ONE of them was. Two of the three
         files here carry more than one surface. It asks about the ELEMENT now:
         is there a rule in this file whose selector names this surface's own
         class AND whose body carries `allow-discrete`. Verified by taking the
         pair off `.menu-tick` and watching the line go red while its nineteen
         neighbours stayed green - a check that has never failed has not been
         shown to work. */
      /* WRONG VERSION 3 - «THE SURFACE'S OWN CLASS» IS NOT THE LAST CLASS IN THE
         SELECTOR. Taking the last one read `.wf-cookie.hidden` as `.hidden` and
         `.wfh-mega .mega-panel.on` as `.on` - the STATE marker, which no rule is
         ever written against on its own - and reported three answered surfaces as
         unanswered. The element is the last DESCENDANT step; its own name is the
         FIRST class inside that step, and everything after it is state. */
      const lastStep = sel.split(',')[0].trim().split(/\s+/).pop();
      const key = (lastStep.match(/\.[a-zA-Z][\w-]*/) || [sel])[0];
      const answered = new RegExp('[^{}]*\\' + key + '[^{}]*\\{[^{}]*allow-discrete').test(css);
      rows.push({ rel: rel.split('/').pop(), line, sel, key, val: d[1], side: hiddenSide ? 'знята класом' : 'дана класом', answered });
    }
  }
  console.log("\nПОВЕРХНІ, ЩО З'ЯВЛЯЮТЬСЯ ПЕРЕМИКАННЯМ display\n");
  console.log('  всього: ' + rows.length + ', з них із відповіддю (allow-discrete + @starting-style): ' +
    rows.filter(r => r.answered).length);
  console.log('');
  for (const r of rows)
    console.log(`  ${r.answered ? '+' : '-'} ${r.rel}:${r.line}  ${r.sel}  ->  display:${r.val}  (${r.side})`);
  const open = rows.filter(r => !r.answered);
  console.log('\n  без відповіді: ' + open.length);
  return open.length;
}

/* ---------- the same twenty surfaces, asked of the BROWSER ------------------
   `--surfaces` reads css and can say only «the pair is written». Whether the
   browser INTERPOLATED is a different question, and it is the one that matters:
   `allow-discrete` without a matching `@starting-style` parses, passes every
   source check, and still jumps. This mode adds the state class on a real screen
   and samples the element 30ms later - opacity strictly between 0 and 1 is the
   proof, because a jump has no midpoint by definition.

   WRONG VERSION 1 - `requestAnimationFrame` NEVER FIRED. The first writing
   sampled frames with rAF inside an async expression and hung until it was
   killed, twice. A target opened with `Target.createTarget` is not the visible
   tab, and Chrome does not run animation frames for one that is not being
   presented. `setTimeout` is answered by the same event loop whether the page is
   drawn or not, and it is what a duration measures against anyway.

   WHAT IT STILL CANNOT ANSWER, NAMED HERE RATHER THAN LEFT AS A LOW NUMBER,
   because step 5 owns the full computed-style walk and inherits this list:
   (1) THE STATE ON AN ANCESTOR. `.ord.open .ord-body` and
   `.menu-opt[aria-selected] .menu-tick` are switched by a class on the PARENT;
   this probe puts the state on the element it measures, so it toggles a class
   the markup never uses and reads a surface nothing opened.
   (2) A SURFACE INSIDE A CLOSED SURFACE. `.mega-panel` and `.dr-subs` only
   transition once the mega menu and the drawer are themselves open - a closed
   ancestor is not rendered, and an element that is not rendered has no frame to
   start from. The ancestor has to be opened first, in order.
   (3) A DIALOG NOTHING HAS BUILT. Ten surfaces are written into the DOM on
   demand by the shared script and the `open*` sweep does not reach all of them.
   Every one of these prints its own line and is counted apart from «did not
   interpolate»: an unreachable surface and a broken one must never share a
   number.

   WRONG VERSION 2 - IT ASKED A PAGE THAT DOES NOT CARRY THE SURFACE. Two of the
   four cases in the first run answered «not on this page», and a probe that
   reports absence looks exactly like a probe that reports «does not move». Each
   surface now FINDS a screen that carries its class rather than being handed
   one - the same rule the rest of `tools/` already lives by. */
async function reportLive() {
  const { serve, chrome, NAMES, ARG_OPENERS, sweepOf } = await import('./lib.mjs');
  const { Conn, newSession } = await import('./cdp.mjs');
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  /* which screen carries which surface, found and not typed */
  const screens = CORPORA.screens();
  const html = new Map(screens.map(f => [f, readFileSync(join(ROOT, f), 'utf8')]));
  /* WRONG VERSION 3 - IT READ THE WRONG SHARED SCRIPT. `design/_nav.js` is the
     COLOURED layer's own script; every coloured screen also loads
     `../wireframes/_nav.js`, and that frozen file is where the dialogs, the
     overlays, the city picker and the cookie banner are actually built. Reading
     one of the two reported «no screen carries this class» for eleven surfaces
     that stand on every page in the product. */
  const shared = ['wireframes/_nav.js', 'design/_nav.js']
    .map(f => readFileSync(join(ROOT, f), 'utf8')).join('\n');

  const list = [];
  {
    const files = CORPORA.system().filter(f => /\/(components|patterns)\//.test(f));
    for (const rel of files) {
      const css = decomment(readFileSync(join(ROOT, rel), 'utf8'));
      const re = /([^{}]+)\{([^{}]*)\}/g; let m;
      while ((m = re.exec(css))) {
        const sel = m[1].trim().replace(/\s+/g, ' ');
        const body = m[2];
        const d = body.match(/display\s*:\s*([a-z-]+)/);
        if (!d) continue;
        if (!/\.(open|on|show|active|hidden|is-[a-z-]+|visible)\b|\[aria-(expanded|selected|current)|\[data-open|\[hidden\]/.test(sel)) continue;
        const hiddenSide = /\.(hidden|is-hidden)\b|\[hidden\]/.test(sel);
        if ((d[1] === 'none') !== hiddenSide) continue;
        const lastStep = sel.split(',')[0].trim().split(/\s+/).pop();
        const key = (lastStep.match(/\.[a-zA-Z][\w-]*/) || [''])[0];
        /* WRONG VERSION 6 - «THE SECOND CLASS» IS NOT THE STATE. `.hrail-fly.wfh-mega.open`
           has three: the element, a co-class it shares with the mega menu, and
           the state. Taking the second one toggled `wfh-mega` - the class that
           gives the flyout its whole appearance - and the probe measured a
           surface it had just dismantled. The state is the LAST class, which is
           also the only one the markup ever adds and removes. */
        const state = (lastStep.match(/\.[a-zA-Z][\w-]*/g) || []).slice(-1)[0];
        if (!key || !state) continue;
        list.push({ rel: rel.split('/').pop(), sel, key: key.slice(1), state: state.slice(1) });
      }
    }
  }

  const { base } = await serve();
  const l = await chrome('motion-live');
  const conn = await Conn.open(l.wsUrl);
  const s = await newSession(conn);
  /* THE THIRD QUESTION OF STEP 5, and it is the one whose failure is the most
     serious of the stage: reducing motion must not cancel the STATE. With
     `--reduce` the same walk runs under the emulation and the reading that
     matters is the SETTLED one - a surface must still end up visible. An element
     that stops appearing at all under `reduce` is a worse defect than any amount
     of unwanted animation. */
  const REDUCED = argv.includes('--reduce');
  if (REDUCED) await conn.send('Emulation.setEmulatedMedia', { features: [
    { name: 'prefers-reduced-motion', value: 'reduce' },
    { name: 'prefers-color-scheme', value: 'light' },
  ] }, s.sessionId);
  const ev = async (expression) => {
    const r = await conn.send('Runtime.evaluate', { expression, returnByValue: true }, s.sessionId);
    if (r.exceptionDetails) return 'ERR';
    return r.result.value;
  };

  console.log('\nТІ САМІ ПОВЕРХНІ, ЗАПИТАНІ В БРАУЗЕРА\n');
  let moved = 0, jumped = 0, notFound = 0, current = null;
  for (const it of list) {
    /* the screen is found: the class must be in the page or in the shared script */
    const inShared = shared.includes(it.key);
    const page = inShared ? 'design/index.html'
      : screens.find(f => html.get(f).includes(it.key));
    if (!page) { console.log(`  ?  ${it.rel}  .${it.key}  жодного екрана з цим класом`); notFound++; continue; }
    if (page !== current) {
      const load = conn.once('Page.loadEventFired', s.sessionId);
      await conn.send('Emulation.setDeviceMetricsOverride',
        { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, s.sessionId);
      await conn.send('Page.navigate', { url: base + '/' + page }, s.sessionId);
      await load; await sleep(600);
      current = page;
    }
    const q = JSON.stringify('.' + it.key);
    let has = await ev(`!!document.querySelector(${q})`);
    if (has !== true) {
      /* WRONG VERSION 5: A DIALOG IS NOT IN THE DOM UNTIL SOMETHING BUILDS IT.
         `.pm`, `.wfh-cabmenu` and `.wf-catov` are written by the shared script on
         demand, so «not in the DOM» meant «nobody has opened it yet», and the
         probe read that as a missing surface. The product's own openers are run
         first - the same list every other instrument in `tools/` uses. */
      const names = await ev(NAMES);
      const calls = [...JSON.parse(names || '[]'), ...ARG_OPENERS];
      await ev(sweepOf(calls));
      await sleep(400);
      has = await ev(`!!document.querySelector(${q})`);
    }
    if (has !== true) { console.log(`  ?  ${it.rel}  .${it.key}  клас у джерелі ${page}, елемента в DOM немає навіть після відкривачів`); notFound++; continue; }
    /* WRONG VERSION 4, AND IT IS THE ONE THAT WOULD HAVE BEEN BELIEVED. The
       first writing added the state class and then removed it on the next line -
       two calls where the second undoes the first - so every surface was sampled
       while CLOSED. It reported «did not interpolate» for three surfaces that do,
       which is a green counter's exact opposite and just as false: the number was
       about the probe, not about the product. The surface is now put into its
       closed state, given a frame to settle there, and only then opened. */
    const hiddenSide = it.state === 'hidden';
    const on  = `document.querySelector(${q}).classList.${hiddenSide ? 'remove' : 'add'}(${JSON.stringify(it.state)})`;
    const off = `document.querySelector(${q}).classList.${hiddenSide ? 'add' : 'remove'}(${JSON.stringify(it.state)})`;
    /* WRONG VERSION 7: 60ms IS NOT LONG ENOUGH TO BE CLOSED. The exit transition
       runs for up to `--dur-slow`, so re-opening after 60ms starts the entry from
       whatever opacity the exit had reached - near 1 - and the sample says «did
       not interpolate» about a surface that interpolates perfectly. Wait longer
       than the longest duration in the system before asking it to arrive. */
    await ev(off);
    await sleep(500);
    await ev(on);
    await sleep(30);
    const mid = await ev(`+getComputedStyle(document.querySelector(${q})).opacity`);
    await sleep(500);
    const end = await ev(`+getComputedStyle(document.querySelector(${q})).opacity`);
    const display = await ev(`getComputedStyle(document.querySelector(${q})).display`);
    if (REDUCED) {
      /* the sign here is the opposite one: nothing may still be moving, and the
         surface must nevertheless have ARRIVED */
      const ok = end > 0.999 && display !== 'none';
      const still = typeof mid === 'number' && mid > 0.001 && mid < 0.999;
      if (ok && !still) moved++; else jumped++;
      console.log(`  ${ok && !still ? '+' : '-'}  ${it.rel}  .${it.key}.${it.state}  +30мс: ${typeof mid === 'number' ? mid.toFixed(3) : mid}  осіло: ${end} · display ${display}   (${page.split('/').pop()})`);
      continue;
    }
    const interpolated = typeof mid === 'number' && mid > 0.001 && mid < 0.999;
    if (interpolated) moved++; else jumped++;
    console.log(`  ${interpolated ? '+' : '-'}  ${it.rel}  .${it.key}.${it.state}  +30мс: ${typeof mid === 'number' ? mid.toFixed(3) : mid}  осіло: ${end}   (${page.split('/').pop()})`);
  }
  console.log(REDUCED
    ? `\n  прийшло без руху: ${moved} · дефектів (рухалось або не прийшло): ${jumped} · не знайдено: ${notFound}`
    : `\n  інтерполювало: ${moved} · вискочило: ${jumped} · не знайдено: ${notFound}`);
  l.stop();
  return jumped;
}

/* ---------- the reduce audit: element by element, and with no net under it ----
   STEP 5's OWN INSTRUMENT. The block in `tokens.css` was written at step 2; this
   asks whether it actually REACHES every element that moves. Two passes over the
   same pages in the same browser - once with `prefers-reduced-motion:
   no-preference`, once with `reduce` - reading `transitionDuration`,
   `animationDuration`, `animationName` and `animationIterationCount` off every
   element and every pseudo-element that has any of them.

   THE SIGN IS ONE FOR THE WHOLE STAGE: in the second pass the value must be NO
   MOTION, that is `0s` or `1ms`. Not exactly zero - `1ms` IS the value the token
   override writes, so demanding zero would fail every element that worked. A
   defect is anything GREATER than 1ms.

   AND IT ONLY MEANS SOMETHING WITHOUT THE SAFETY NET. `base.css` carried
   `@media (prefers-reduced-motion: reduce){ *{ transition: none !important } }`
   from stage 07 until 11.5. Under it every element in the product reports no
   transition whether or not it reads a token, so this walk would have returned
   «0 defects» over a system that could be entirely made of literals. It was
   removed before this was first run, and it is what turned the run red.

   WRONG VERSION 1: IT ASKED ONLY `document.querySelectorAll('*')`. Three of the
   product's animations live on pseudo-elements - the tabs' `::before`, the
   checkout knob's `::after` - and a fourth on a vendor pseudo `getComputedStyle`
   cannot read at all. An audit blind to those reports a clean product and leaves
   its own blind spot at zero.
   WRONG VERSION 2: IT COUNTED A CYCLE AS A DEFECT. `animation: none` at `reduce`
   is the CORRECT closure for a `@keyframes` loop - a pulse at 1ms is a flicker -
   so the reading to fail on is a cycle whose duration merely shrank. The two are
   told apart by `animationName`: `none` is closed, a surviving name with a
   duration over 1ms is open. */
async function reportReduce() {
  const { serve, chrome } = await import('./lib.mjs');
  const { Conn, newSession } = await import('./cdp.mjs');
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const EXPR = `(() => {
    const out = [];
    const seen = new Map();
    const look = (el, pseudo) => {
      const cs = getComputedStyle(el, pseudo);
      const td = (cs.transitionDuration || '0s').split(',').map(v => parseFloat(v) * (v.includes('ms') ? 1 : 1000));
      const ad = (cs.animationDuration || '0s').split(',').map(v => parseFloat(v) * (v.includes('ms') ? 1 : 1000));
      const t = Math.max(0, ...td.filter(n => !isNaN(n)));
      const a = Math.max(0, ...ad.filter(n => !isNaN(n)));
      if (t <= 0 && a <= 0) return;
      const key = (el.tagName + '.' + (typeof el.className === 'string' ? el.className : '')).slice(0, 90) + (pseudo || '');
      const rec = { key, t, a, name: cs.animationName, iter: cs.animationIterationCount };
      const had = seen.get(key);
      if (!had || had.t < t || had.a < a) seen.set(key, rec);
    };
    for (const el of document.querySelectorAll('*')) { look(el, null); look(el, '::before'); look(el, '::after'); }
    for (const v of seen.values()) out.push(v);
    return JSON.stringify(out);
  })()`;

  const { base } = await serve();
  const l = await chrome('reduce');
  const conn = await Conn.open(l.wsUrl);
  const pages = [...CORPORA.screens(), ...CORPORA.stand().filter(p => p.endsWith('.html'))];

  const pass = async (value) => {
    const s = await newSession(conn);
    await conn.send('Emulation.setEmulatedMedia', { features: [
      { name: 'prefers-reduced-motion', value },
      { name: 'prefers-color-scheme', value: 'light' },
    ] }, s.sessionId);
    const map = new Map();
    for (const page of pages) {
      const load = conn.once('Page.loadEventFired', s.sessionId);
      await conn.send('Emulation.setDeviceMetricsOverride',
        { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, s.sessionId);
      await conn.send('Page.navigate', { url: base + '/' + page }, s.sessionId);
      await load; await sleep(120);
      const r = await conn.send('Runtime.evaluate', { expression: EXPR, returnByValue: true }, s.sessionId);
      if (r.exceptionDetails) continue;
      for (const rec of JSON.parse(r.result.value || '[]')) {
        const k = page + ' | ' + rec.key;
        const had = map.get(k);
        if (!had || had.t < rec.t || had.a < rec.a) map.set(k, rec);
      }
    }
    await s.close();
    return map;
  };

  console.log('\nЗНЯТТЯ ДВІЧІ: звичайно і з емуляцією prefers-reduced-motion: reduce');
  console.log('  сторінок: ' + pages.length + '\n');
  const normal = await pass('no-preference');
  const reduced = await pass('reduce');

  const bad = [];
  for (const [k, r] of reduced) {
    const cycleClosed = r.name === 'none' || r.a <= 1;
    const worst = Math.max(r.t, cycleClosed ? 0 : r.a);
    if (worst > 1) bad.push([k, normal.get(k), r]);
  }
  console.log('  елементів із рухом у звичайному проході: ' + normal.size);
  console.log('  з них при reduce БІЛЬШЕ за 1ms: ' + bad.length);
  if (bad.length) {
    console.log('\n  ЩО НЕ ЧИТАЄ ТОКЕН:');
    const byKey = new Map();
    for (const [k, n, r] of bad) {
      const short = k.split(' | ')[1];
      if (!byKey.has(short)) byKey.set(short, { pages: 0, n, r });
      byKey.get(short).pages++;
    }
    for (const [key, v] of [...byKey.entries()].sort((a, b) => b[1].pages - a[1].pages))
      console.log(`    ${String(v.pages).padStart(3)} стор.  ${key}   без reduce ${v.n ? v.n.t + '/' + v.n.a : '-'}  ·  з reduce ${v.r.t}/${v.r.a} (${v.r.name})`);
  } else {
    console.log('\n  жоден елемент не лишився рухомим - і це заміряно БЕЗ страхувальної сітки на *');
  }
  l.stop();
  return bad.length;
}

/* ---------- the computed-style table, grouped by ROLE, in two viewports -------
   THE MAIN INSTRUMENT OF STEP 6, and its whole value is the GROUPING. In the
   files, 180ms on one component and 220ms on the one beside it look the same;
   in one column under one role they are visibly two systems. A table sorted by
   file can never show that, which is why this one is sorted by job.

   THE ROLE IS NOT GUESSED FROM THE NUMBER, which would make the check circular.
   Every element is mapped to the component that OWNS it - by the selectors that
   component's own file declares, the same scoping the roll-call of step 3 uses -
   and the job is then read out of the «Рух» column of `inventory.md`, which is a
   document a person maintains.

   TWO VIEWPORTS, AND 360 IS MEASURED RATHER THAN INTENDED. Duration does not
   depend on width, but direction and amplitude do: a panel that slides in from
   the side on a desktop is the whole screen at 360. `clientWidth === 360` is
   asserted before the walk, and `scrollWidth > clientWidth` is read beside every
   reading - a movement that opens a horizontal scrollbar for the MIDDLE of its
   transition and closes it at the end is invisible to any resting measurement. */
function ownSelectors() {
  const files = CORPORA.system().filter(f => /\/(components|patterns)\//.test(f));
  const out = {};
  for (const rel of files) {
    const css = decomment(readFileSync(join(ROOT, rel), 'utf8'));
    const sels = new Set();
    const re = /([^{}]+)\{([^{}]*)\}/g; let m;
    while ((m = re.exec(css))) {
      if (!/transition|animation/.test(m[2])) continue;
      for (const part of m[1].split(',')) {
        const clean = part.trim()
          .replace(/::[a-z-]+(\([^)]*\))?/g, '')
          .replace(/:(hover|focus|focus-visible|active|not|has|is|where|first-child|last-child|last-of-type|checked|disabled)(\([^)]*\))?/g, '')
          .replace(/\s+/g, ' ').trim();
        if (clean && clean !== '*') sels.add(clean);
      }
    }
    if (sels.size) out[rel.split('/').pop()] = [...sels];
  }
  return out;
}

/* WHO OWNS A CYCLE IS NOT A SELECTOR QUESTION - 11.6. The first table read
   `gallery.css` as carrying 150 AND 1100ms, which would have been a role drift
   worth a defect row. It is an attribution artifact: `.gmain.skpulse` matches a
   selector in `gallery.css` AND wears the skeleton's animation, and the lookup
   takes the first file that matches. An ANIMATION has an exact owner - the file
   that declares its `@keyframes` - so it is attributed by name and never by
   selector. Anything the roll-call could not place stays «нічий» rather than
   being given to the nearest plausible file. */
function keyframeOwners() {
  const files = [...CORPORA.system(), ...CORPORA.harness()];
  const out = {};
  for (const rel of files) {
    const css = decomment(readFileSync(join(ROOT, rel), 'utf8'));
    for (const m of css.matchAll(/@keyframes\s+([\w-]+)/g)) out[m[1]] = rel.split('/').pop();
  }
  return out;
}

function jobsFromInventory() {
  const md = readFileSync(join(ROOT, 'design/kit/docs/inventory.md'), 'utf8');
  const out = {};
  for (const line of md.split('\n')) {
    if (!line.startsWith('|') || !line.includes('`')) continue;
    const cells = line.split('|');
    if (cells.length < 8) continue;
    const f = (cells[2].match(/`([a-z0-9-]+\.css)`/) || [])[1];
    if (!f) continue;
    out[f] = cells[cells.length - 5].trim();
  }
  return out;
}

async function reportTable() {
  const { serve, chrome } = await import('./lib.mjs');
  const { Conn, newSession } = await import('./cdp.mjs');
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const owners = ownSelectors();
  const jobs = jobsFromInventory();
  const kf = keyframeOwners();

  const EXPR = (ownersJson, kfJson) => `(() => {
    const owners = ${ownersJson};
    const kf = ${kfJson};
    const rows = [];
    const width = document.documentElement.clientWidth;
    const overflow = document.documentElement.scrollWidth > width;
    const who = (el) => {
      for (const [file, sels] of Object.entries(owners))
        for (const sel of sels) { try { if (el.matches(sel)) return file; } catch (e) {} }
      return null;
    };
    const read = (el, pseudo) => {
      const cs = getComputedStyle(el, pseudo);
      const dur = (cs.transitionDuration || '0s');
      const adur = (cs.animationDuration || '0s');
      const t = Math.max(0, ...dur.split(',').map(v => parseFloat(v) * (v.includes('ms') ? 1 : 1000)).filter(n => !isNaN(n)));
      const a = Math.max(0, ...adur.split(',').map(v => parseFloat(v) * (v.includes('ms') ? 1 : 1000)).filter(n => !isNaN(n)));
      if (t <= 0 && a <= 0) return;
      /* a cycle belongs to whoever declares its keyframes, and to nobody else */
      /* ...unless the keyframe is one the SHARED file declares. uivspin moved
         into base.css at step 4 precisely because two components share it, so
         attributing by keyframe there would take both spinners away from the
         components that own them and file them under nobody. The keyframe
         answers WHOSE cycle it is only while a component declares it.
         NO BACKTICKS IN THIS COMMENT, AND THAT IS THE THIRD TIME THIS STAGE HAS
         PAID FOR IT: the block sits inside a template literal, so one backtick
         closes the string and the file stops parsing. A comment that is data has
         to obey the syntax of the string it lives in. */
      const kfOwner = (a > 0 && cs.animationName) ? kf[cs.animationName] : null;
      const owner = (kfOwner && kfOwner !== 'base.css') ? kfOwner : who(el);
      rows.push({ file: owner, t, a, tf: cs.transitionTimingFunction, af: cs.animationTimingFunction,
        prop: cs.transitionProperty, name: cs.animationName, iter: cs.animationIterationCount, pseudo: pseudo || '' });
    };
    for (const el of document.querySelectorAll('*')) { read(el, null); read(el, '::before'); read(el, '::after'); }
    return JSON.stringify({ width, overflow, rows });
  })()`;

  const { base } = await serve();
  const l = await chrome('table');
  const conn = await Conn.open(l.wsUrl);
  const pages = [...CORPORA.screens(), ...CORPORA.stand().filter(p => p.endsWith('.html'))];
  const ownersJson = JSON.stringify(owners);
  const kfJson = JSON.stringify(kf);

  const walk = async (w) => {
    const s = await newSession(conn);
    const acc = { widthSeen: new Set(), overflowPages: [], byFile: new Map(), durs: new Map(), curves: new Map(), unowned: new Map() };
    for (const page of pages) {
      const load = conn.once('Page.loadEventFired', s.sessionId);
      await conn.send('Emulation.setDeviceMetricsOverride',
        { width: w, height: 900, deviceScaleFactor: 1, mobile: w === 360 }, s.sessionId);
      await conn.send('Page.navigate', { url: base + '/' + page }, s.sessionId);
      await load; await sleep(110);
      const r = await conn.send('Runtime.evaluate', { expression: EXPR(ownersJson, kfJson), returnByValue: true }, s.sessionId);
      if (r.exceptionDetails) continue;
      const got = JSON.parse(r.result.value);
      acc.widthSeen.add(got.width);
      if (got.overflow) acc.overflowPages.push(page);
      for (const row of got.rows) {
        const key = row.file || ('НІЧИЙ: ' + row.prop.slice(0, 40));
        if (!acc.byFile.has(key)) acc.byFile.set(key, { durs: new Set(), curves: new Set(), n: 0 });
        const rec = acc.byFile.get(key);
        rec.n++;
        if (row.t > 0) { rec.durs.add(row.t); acc.durs.set(row.t, (acc.durs.get(row.t) || 0) + 1); rec.curves.add(row.tf); acc.curves.set(row.tf, (acc.curves.get(row.tf) || 0) + 1); }
        if (row.a > 0) { rec.durs.add(row.a); acc.durs.set(row.a, (acc.durs.get(row.a) || 0) + 1); rec.curves.add(row.af); acc.curves.set(row.af, (acc.curves.get(row.af) || 0) + 1); }
        if (!row.file) acc.unowned.set(key, (acc.unowned.get(key) || 0) + 1);
      }
    }
    await s.close();
    return acc;
  };

  for (const w of [360, 1280]) {
    const acc = await walk(w);
    console.log(`\n===== ${w}px · ${pages.length} сторінок =====`);
    console.log('  clientWidth, який справді був: ' + [...acc.widthSeen].join(', ') +
      (acc.widthSeen.size === 1 && [...acc.widthSeen][0] === w ? '  (звірено)' : '  <-- НЕ ТЕ, ЩО ПРОСИЛИ'));
    console.log('  сторінок із горизонтальним скролом у спокої: ' + acc.overflowPages.length);

    /* one role, one number - the whole point of the table */
    const byJob = new Map();
    for (const [file, rec] of acc.byFile) {
      const job = jobs[file] || (file.startsWith('НІЧИЙ') ? 'поза компонентом' : '–');
      if (!byJob.has(job)) byJob.set(job, new Map());
      byJob.get(job).set(file, rec);
    }
    console.log('\n  ЗА РОЛЛЮ (робота з колонки «Рух» inventory.md):');
    for (const [job, files] of [...byJob.entries()].sort()) {
      const all = new Set();
      for (const rec of files.values()) for (const d of rec.durs) all.add(d);
      console.log(`\n    ${job}  -  файлів ${files.size}, різних тривалостей ${all.size}: ${[...all].sort((a,b)=>a-b).join(', ')}ms`);
      for (const [file, rec] of [...files.entries()].sort())
        console.log(`        ${file.padEnd(24)} ${String(rec.n).padStart(5)} елементів  ${[...rec.durs].sort((a,b)=>a-b).join('/')}ms`);
    }
    console.log('\n  УСІ ТРИВАЛОСТІ, ЩО СПРАВДІ РЕНДЕРЯТЬСЯ (' + acc.durs.size + '):');
    for (const [d, n] of [...acc.durs.entries()].sort((a, b) => a[0] - b[0])) console.log(`    ${String(d).padStart(6)}ms  x${n}`);
    console.log('  УСІ КРИВІ (' + acc.curves.size + '):');
    for (const [c, n] of [...acc.curves.entries()].sort((a, b) => b[1] - a[1])) console.log(`    ${c.padEnd(46)} x${n}`);
  }
  l.stop();
}

/* ---------- the transition BETWEEN two documents, read from inside it -------
   WHY THIS MODE EXISTS, AND WHY IT IS LATE. Every other question in this file is
   asked of an ELEMENT: the walk resolves the corpus and reads computed style off
   `document.querySelectorAll("*")`. The crossfade between two documents does not
   live on an element. It lives on `::view-transition-old(root)` and its two
   siblings - a pseudo-element tree the browser builds at the start of a
   navigation and destroys when it lands, which exists for a quarter of a second
   and is in no document at rest. So the census could report four durations and a
   clean sheet while the largest arrival in the product rendered a fifth number,
   and it did: 250ms linear, the browser default, on every navigation in the
   product, for two whole steps. A GREEN COUNTER THAT CANNOT SEE THE CLASS IS NOT
   A ZERO - the rule is in CLAUDE.md, and this is the stage paying it.

   HOW IT IS CAUGHT. `Page.addScriptToEvaluateOnNewDocument` runs before any page
   script, so the listener is installed in the INCOMING document before it starts
   revealing. `pagereveal` hands over the ViewTransition object; after its `ready`
   promise the pseudo-element animations are live and `document.getAnimations()`
   returns them. Three readings are kept for each, not one, because a CSS
   animation spells its curve in more than one place and choosing between them
   inside the reader is a decision nobody can review.

   AND IT IS FALSIFIED, not trusted. `--view` ends by re-running the same
   navigation with `--dur-slow` redefined to 7.77s. If the measured duration does
   not become 7770ms, the pseudo-element is not reading the token and the pass
   that just went green went green on a literal that happened to match.

   WRONG VERSION 1: IT MEASURED THE FIRST NAVIGATION. A cross-document view
   transition needs an OLD document that opted in, and the first load of the
   browser has none - so the first run reported «no transition» and would have
   been read as «the rule is dead». Two navigations are made and only the second
   is measured; the first one is named in the output so nobody can mistake which.

   WRONG VERSION 2: IT TOOK THE PAIR FROM MY HAND. `listing.html` then
   `product.html`, typed in because that is the pair the critique named. An
   instrument handed its subject can be handed the wrong one: the corpus is asked
   for the first screen, and the SECOND page is a link that page really carries,
   read out of its own markup. */
async function reportView() {
  const { serve, chrome } = await import('./lib.mjs');
  const { Conn, newSession } = await import('./cdp.mjs');
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const CAPTURE = [
    'window.__vt = "no pagereveal";',
    'addEventListener("pagereveal", async (e) => {',
    '  if (!e.viewTransition) { window.__vt = "no viewTransition on the event"; return; }',
    '  try { await e.viewTransition.ready; } catch (err) { window.__vt = "ready rejected: " + err; return; }',
    '  window.__vt = document.getAnimations().map(a => {',
    '    var eff = a.effect, ct = eff ? eff.getComputedTiming() : {}, t = eff ? eff.getTiming() : {};',
    '    var kf = [];',
    '    try { kf = eff.getKeyframes().map(k => k.easing).filter(Boolean); } catch (err) {}',
    '    return { name: a.animationName || "(not a CSS animation)",',
    '             pseudo: (eff && eff.pseudoElement) || "(none)",',
    '             dur: ct.duration, timingEasing: t.easing, kfEasing: kf.join(" | ") };',
    '  });',
    '});',
  ].join('\n');

  const tokensExpr = '(() => { var cs = getComputedStyle(document.documentElement);'
    + ' var out = {}; for (var k of ["--dur-fast","--dur-base","--dur-slow","--dur-cycle",'
    + '"--ease-standard","--ease-enter","--ease-exit","--ease-cycle"]) out[k] = cs.getPropertyValue(k).trim();'
    + ' return JSON.stringify(out); })()';

  const linksExpr = '(() => [...document.querySelectorAll("a[href]")].map(a => a.getAttribute("href"))'
    + '.filter(h => /^[^/#?:]+\\.html$/.test(h)))()';

  const { base } = await serve();
  const l = await chrome('view');
  const conn = await Conn.open(l.wsUrl);

  const run = async ({ reduce = false, swap = null }) => {
    const s = await newSession(conn);
    await conn.send('Emulation.setEmulatedMedia', { features: [
      { name: 'prefers-reduced-motion', value: reduce ? 'reduce' : 'no-preference' },
      { name: 'prefers-color-scheme', value: 'light' },
    ] }, s.sessionId);
    let source = CAPTURE;
    if (swap) source += '\n' + [
      'document.addEventListener("DOMContentLoaded", () => {',
      '  var st = document.createElement("style");',
      '  st.textContent = ":root{ ' + swap + ' }";',
      '  document.head.appendChild(st);',
      '});',
    ].join('\n');
    await conn.send('Page.addScriptToEvaluateOnNewDocument', { source }, s.sessionId);
    await conn.send('Emulation.setDeviceMetricsOverride',
      { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, s.sessionId);

    const go = async (url) => {
      const load = conn.once('Page.loadEventFired', s.sessionId);
      await conn.send('Page.navigate', { url }, s.sessionId);
      await load; await sleep(150);
    };

    const first = CORPORA.screens()[0];
    await go(base + '/' + first);
    const tk = JSON.parse((await conn.send('Runtime.evaluate',
      { expression: tokensExpr, returnByValue: true }, s.sessionId)).result.value);
    const hrefs = (await conn.send('Runtime.evaluate',
      { expression: linksExpr, returnByValue: true }, s.sessionId)).result.value || [];
    const inCorpus = new Set(CORPORA.screens().map(p => p.split('/').pop()));
    const second = hrefs.find(h => inCorpus.has(h) && h !== first.split('/').pop());
    if (!second) { await s.close(); return { err: 'на ' + first + ' немає посилання в корпус' }; }

    /* WRONG VERSION 3: THE SECOND NAVIGATION WAS ALSO `Page.navigate`. A
       cross-document view transition is skipped for a navigation the BROWSER
       started - a typed url, a reload, and a CDP `Page.navigate`, which is the
       same class. So the instrument drove the product in a way no visitor can
       and read «no viewTransition on the event», which is a true reading of a
       false situation. The second hop is now the real anchor being clicked. */
    {
      const load = conn.once('Page.loadEventFired', s.sessionId);
      await conn.send('Runtime.evaluate', { expression:
        '[...document.querySelectorAll("a[href]")].find(a => a.getAttribute("href") === '
        + JSON.stringify(second) + ').click()' }, s.sessionId);
      await load; await sleep(150);
    }
    const vt = (await conn.send('Runtime.evaluate',
      { expression: 'JSON.stringify(window.__vt)', returnByValue: true }, s.sessionId)).result.value;
    await s.close();
    return { tk, first, second, vt: JSON.parse(vt || 'null') };
  };

  const ms = v => typeof v === 'number' ? Math.round(v) : v;
  const toMs = str => {
    const m = /^([\d.]+)(ms|s)$/.exec(String(str).trim());
    return m ? Math.round(parseFloat(m[1]) * (m[2] === 's' ? 1000 : 1)) : NaN;
  };

  console.log('\nПЕРЕХІД МІЖ ДВОМА ДОКУМЕНТАМИ, ЗНЯТИЙ ЗСЕРЕДИНИ ПЕРЕХОДУ');
  const a = await run({});
  if (a.err) { console.log('  ' + a.err); l.stop(); return 1; }
  console.log('  навігація: ' + a.first + '  ->  ' + a.second + '   (перша, немірена: about:blank -> ' + a.first + ')');

  const reg = new Map();
  for (const [k, v] of Object.entries(a.tk)) if (k.startsWith('--dur')) reg.set(toMs(v), k);
  /* WRONG VERSION 4: THE CURVE WAS COMPARED AS A STRING. `tokens.css` spells the
     standard curve `cubic-bezier(.48, .04, .52, .96)` and the browser hands back
     `cubic-bezier(0.48, 0.04, 0.52, 0.96)`. The two sides differed in a leading
     zero, so a run in which every curve was already correct printed five lines of
     ПОЗА РЕЄСТРОМ - a comparison whose sides differ in more than the thing being
     measured, which CLAUDE.md says is not a proof. Both sides are normalised to
     numbers now. */
  const norm = v => String(v).trim().toLowerCase().replace(/\s+/g, '')
    .replace(/cubic-bezier\(([^)]*)\)/, (_, n) =>
      'cubic-bezier(' + n.split(',').map(x => String(parseFloat(x))).join(',') + ')');
  const curves = new Map();
  for (const [k, v] of Object.entries(a.tk)) if (k.startsWith('--ease')) curves.set(norm(v), k);
  /* AND THE CURVE IS CHECKED AGAINST ITS ROLE, not merely against the registry.
     `linear` IS a registry value - it is `--ease-cycle`, the curve a rotation
     takes - so a check that only asked «is this spelling in the table» would have
     passed the browser default that started this whole repair. What leaves takes
     the exit curve, what arrives takes the enter curve, and the group, which
     morphs a box rather than an opacity, takes the symmetric one. */
  const ROLE = { old: '--ease-exit', new: '--ease-enter', group: '--ease-standard' };
  console.log('  реєстр тривалостей: ' + [...reg].map(([n, k]) => k + '=' + n + 'ms').join(' · '));

  if (!Array.isArray(a.vt)) { console.log('\n  ПЕРЕХІД НЕ ЗАПУСТИВСЯ: ' + a.vt); l.stop(); return 1; }
  console.log('\n  анімацій у переході: ' + a.vt.length);
  let bad = 0;
  for (const r of a.vt) {
    const dOk = reg.has(ms(r.dur));
    /* WRONG VERSION 5, ONE LINE AFTER 4: a CSS animation spells the curve on
       EVERY keyframe, so the capture handed back «curve | curve» and the
       normaliser rewrote the first of the two. The reading was right and the
       string was two of it. One curve per part, and the parts are compared. */
    const kfs = [...new Set(String(r.kfEasing || '').split('|').map(norm).filter(Boolean))];
    const spell = [...kfs, norm(r.timingEasing)].filter(x => x && x !== 'linear');
    const seen = spell[0] || 'linear';
    const token = curves.get(seen);
    const want = ROLE[(/::view-transition-(old|new|group)\b/.exec(r.pseudo) || [])[1]] || null;
    const cOk = !!token && (!want || token === want);
    if (!dOk || !cOk) bad++;
    console.log('    ' + (dOk && cOk ? 'ok ' : 'НІ ') + r.pseudo.padEnd(34)
      + String(ms(r.dur)).padStart(5) + 'ms ' + (dOk ? '(' + reg.get(ms(r.dur)) + ')' : '(ПОЗА РЕЄСТРОМ)')
      + '  ' + (token || seen) + (cOk ? '' : ' (ТРЕБА ' + want + ')')
      + '  ' + r.name);
  }
  console.log('  поза реєстром: ' + bad);

  console.log('\n  ЩО ПЕРЕХІД НЕСЕ. view-transition-name у дереві: '
    + [...CORPORA.system(), ...CORPORA.screens()].reduce((n, rel) => {
        const txt = /\.css$/.test(rel) ? decomment(readFileSync(join(ROOT, rel), 'utf8'))
                                       : readFileSync(join(ROOT, rel), 'utf8');
        return n + (txt.match(/view-transition-name\s*:/g) || []).length;
      }, 0) + ' оголошень - тобто анімується один знімок сторінки цілком, без спадкоємності елементів.');

  const b = await run({ reduce: true });
  const still = Array.isArray(b.vt) ? b.vt.filter(r => ms(r.dur) > 1) : [];
  console.log('\n  З ЕМУЛЯЦІЄЮ prefers-reduced-motion: reduce');
  console.log('    ' + (Array.isArray(b.vt) ? 'анімацій: ' + b.vt.length + ', з них довших за 1ms: ' + still.length
                                            : String(b.vt)));
  for (const r of still) console.log('      НІ ' + r.pseudo + ' ' + ms(r.dur) + 'ms');

  const c = await run({ swap: '--dur-slow: 7.77s;' });
  const swapped = Array.isArray(c.vt) ? c.vt.map(r => ms(r.dur)) : [];
  const proved = swapped.length > 0 && swapped.every(n => n === 7770);
  console.log('\n  ПІДМІНА ТОКЕНА (--dur-slow: 7.77s), щоб читач токена відрізнявся від літерала');
  console.log('    зміряно: ' + (swapped.join('ms, ') || '-') + 'ms  ->  '
    + (proved ? 'усі три поїхали за токеном' : 'НІ: щось у переході не читає --dur-slow'));

  l.stop();
  return bad + still.length + (proved ? 0 : 1);
}

/* ---------- run ---------- */
const STATES_ONLY = argv.includes('--states');
if (argv.includes('--table')) { await reportTable(); process.exit(0); }
if (argv.includes('--view')) { const n = await reportView(); process.exit(n ? 1 : 0); }
const SURFACES = argv.includes('--surfaces');
const REDUCE = argv.includes('--reduce');
if (REDUCE && !SURFACES) { const n = await reportReduce(); process.exit(n ? 1 : 0); }
const LIVE = argv.includes('--live');
if (SURFACES && LIVE) { await reportLive(); process.exit(0); }
if (SURFACES) { reportSurfaces(); process.exit(0); }
const ROLL = argv.includes('--roll') ? (argv[argv.indexOf('--roll') + 1] || 'atom') : null;
if (ROLL) { await reportRoll(ROLL); process.exit(0); }
if (STATES_ONLY) { reportStates(); process.exit(0); }
if (!OUT_ONLY) reportSource(scanSource());
if (!SRC_ONLY) reportOutput(await scanOutput());
console.log('');
