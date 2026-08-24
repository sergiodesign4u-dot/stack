/* tools/coverage.mjs - THE COVERAGE MAP, ASKED OF THE REGISTRY INSTEAD OF TYPED.

   Stage 12 promises one thing about the map on `design/overview.html`: «нічого не
   загубилось». That promise is about a DECLARED LIST, so it carries the same
   failure this repository has now met five times in one stage - a list asked in
   one direction only. The map was hand-written, screen by screen, from stage 06
   onwards; by the end of the rollout it named 54 of 141 pages and looked
   complete, because a map that never mentions a screen cannot look incomplete.
   A green row over an unfinished screen and a vanished row over something we
   deliberately did not build lie in exactly the same way.

   SO THE MAP IS GENERATED, AND FROM THE SAME TWO REGISTRIES AS EVERYTHING ELSE:
   `WF_FLOWS` (the whole product, grey) and `DESIGN_NAV` (what exists in colour).
   Nothing in the section between the markers is typed by a person, which is why
   a state added next month appears on the map the same day.

   AND THEN IT IS WALKED, because a generated list still only proves that the
   generator ran. The walk opens every registry entry in a browser and reads the
   OUTPUT: did the page load, does it carry exactly one stand panel, and does the
   rail - which `uivBar()` derives from `DESIGN_NAV`, not from this script - show
   the screen's own states as coloured rather than as grey escapes. Three numbers
   come out of it and all three are printed on the page: «записів N, відкрилось M,
   зі своїми станами K».

   WHAT WOULD TURN THIS GREEN COUNTER RED (asked before it was believed):
     · a name in the registry with no file behind it        -> «не відкрилось»
     · a page that renders two panels, or none              -> «панелей != 1»
     · a state built in grey and never coloured             -> the rail draws it
                                                               `.grey`, K drops
     · a screen deliberately left out with no reason given  -> OUT_OF_SCOPE is
                                                               a declared list too,
                                                               and an entry that
                                                               covers nothing fails
     · a row on the map that no registry knows              -> «зайвий рядок»

     node tools/coverage.mjs           the report and the walk
     node tools/coverage.mjs --apply   walk, then rewrite the section in overview.html
     node tools/coverage.mjs --check   idle control only, no browser, exit 1 on a gap */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, serve, chrome } from './lib.mjs';
import { Conn, newSession, visit } from './cdp.mjs';

function sliceArray(src, name) {
  const m = new RegExp('(?:const|let|var)\\s+' + name + '\\s*=').exec(src);
  if (!m) throw new Error('registry not found: ' + name);
  const j = src.indexOf('[', m.index);
  let d = 0, k = j;
  for (; k < src.length; k++) { if (src[k] === '[') d++; else if (src[k] === ']' && !--d) break; }
  return eval(src.slice(j, k + 1));
}
function sliceObject(src, name) {
  const m = new RegExp('(?:const|let|var)\\s+' + name + '\\s*=').exec(src);
  if (!m) return {};
  const j = src.indexOf('{', m.index);
  let d = 0, k = j;
  for (; k < src.length; k++) { if (src[k] === '{') d++; else if (src[k] === '}' && !--d) break; }
  return eval('(' + src.slice(j, k + 1) + ')');
}

const wf = readFileSync(join(ROOT, 'wireframes/_nav.js'), 'utf8');
const dg = readFileSync(join(ROOT, 'design/_nav.js'), 'utf8');
const WF_FLOWS = sliceArray(wf, 'WF_FLOWS');
const WF_STATE_LABEL = sliceObject(wf, 'WF_STATE_LABEL');
const DESIGN_NAV = sliceArray(dg, 'DESIGN_NAV');
const DESIGN_EXTRA = sliceArray(dg, 'DESIGN_EXTRA');

/* THE DECLARED EXCEPTIONS, AND EACH CARRIES ITS REASON ON THE PAGE. A screen
   left out of the scope stays ON the map as its own state, counted, with the
   decision that put it there - the promise of the stage is «нічого не
   загубилось», not «все зелене».

   12.11: THE LIST IS EMPTY, AND AN EMPTY DECLARED LIST IS ITSELF A CLAIM. It held
   exactly one row for the whole stage - `quiz.html`, the one ПОТІМ screen - and
   batch 6 built it on the owner's separate word, so the row came out. The
   check below is written to be asked both ways whether the list has rows or not:
   an entry whose screen now exists in colour fails as loudly as a screen with no
   row, which is what turned this from a comment into a gate. */
const OUT_OF_SCOPE = {};

const stateFile = (f, st) => f.replace('.html', '-' + st + '.html');
const label = st => WF_STATE_LABEL[st] || st;

/* one row per SCREEN, its pages listed; the same derivation rollout-table.mjs
   uses, so the two can never disagree about what the product is */
const rows = [];
const seen = new Set();
for (const fl of WF_FLOWS) for (const s of fl.screens || []) {
  const stem = s.stateFile || s.file;
  const pages = [{ st: null, file: s.file }]
    .concat((s.builtStates || []).map(st => ({ st, file: stateFile(stem, st) })));
  const fresh = pages.filter(p => !seen.has(p.file));
  fresh.forEach(p => seen.add(p.file));
  if (!fresh.length) continue;
  for (const p of fresh) p.colour = existsSync(join(ROOT, 'design', p.file));
  rows.push({ flow: fl.id, flowName: fl.name, node: s.node, name: s.name,
              file: s.file, pages: fresh, out: OUT_OF_SCOPE[s.file] || null });
}

const ALL = rows.flatMap(r => r.pages);
const N = ALL.length;
const inColour = ALL.filter(p => p.colour).length;
const outRows = rows.filter(r => r.out);
const outPages = outRows.reduce((a, r) => a + r.pages.length, 0);

const esc0 = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ==== the idle control on the two declared lists ==================== */
const problems = [];
/* 1. an exception that covers nothing must fail as loudly as an undeclared case */
for (const f in OUT_OF_SCOPE) {
  if (!rows.some(r => r.file === f)) problems.push(`OUT_OF_SCOPE називає \`${f}\`, а такого екрана немає в жодному флоу`);
  else if (existsSync(join(ROOT, 'design', f))) problems.push(`OUT_OF_SCOPE називає \`${f}\`, а кольорова копія вже існує - рядок винятку треба зняти`);
}
/* 2. a page in colour that is out of scope, or a page in scope with no colour */
for (const r of rows) for (const p of r.pages) {
  if (r.out && p.colour) problems.push(`\`${p.file}\` поза обсягом, а файл у design/ є`);
  if (!r.out && !p.colour) problems.push(`\`${p.file}\` в обсязі, а кольорової копії немає і причини не названо`);
  if (p.colour && !DESIGN_NAV.includes(p.file)) problems.push(`\`${p.file}\` у кольорі, але DESIGN_NAV його не знає`);
}
/* 3. every registry entry has to be ON the map, and nothing else may be */
const OV = join(ROOT, 'design/overview.html');
const ovSrc = readFileSync(OV, 'utf8');
const ovBody = ovSrc.split('<main')[1] || '';
const linked = new Set([...ovBody.matchAll(/href="([^"#?]+\.html)/g)].map(m => m[1]));
const known = new Set([...ALL.map(p => p.file), ...DESIGN_EXTRA, ...DESIGN_NAV]);
/* 12.10, ON THE FIRST GREEN RUN OF THIS FILE: a page that is out of scope is
   deliberately NOT a link - that is the whole point of drawing it as a struck
   `.miss` span with its reason beside it - so it can never appear in `linked`,
   and the check reported it as «не на карті» while it sat in the middle of the
   map. A red that means nothing trains the reader to skip the reds that do,
   which is the same failure as a green that means nothing, read backwards.
   An out-of-scope screen is therefore asked the question it CAN answer: is its
   row on the page at all. */
const outOnMap = [], outOffMap = [];
for (const r of outRows) (ovBody.includes(esc0(r.name)) ? outOnMap : outOffMap).push(r);
const notOnMap = ALL.filter(p => !linked.has(p.file) && !OUT_OF_SCOPE[rows.find(r => r.pages.includes(p)).file]);
const strayOnMap = [...linked].filter(h => !h.startsWith('..') && !h.includes('/') && !known.has(h));

/* ==== the section, rendered ========================================= */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function section(walk) {
  const w = walk
    ? `<p class="sub">Обхід приладом <code>node tools/coverage.mjs</code>, ${walk.width}px: <b>записів ${N}</b> · ` +
      `<b>відкрилось ${walk.opened}</b> · <b>зі своїми станами ${walk.withStates}</b> з ${rows.length - outRows.length} екранів обсягу. ` +
      `Панель на сторінці рівно одна: ${walk.onePanel} з ${walk.opened}. ` +
      `Не відкрилось ${N - walk.opened} - це ${outPages === N - walk.opened ? 'рівно ті сторінки, що поза обсягом' : '<b>більше, ніж поза обсягом</b>'}.</p>`
    : '<p class="sub">Обхід не проганявся.</p>';
  let h = `\n  <h2 class="sech2" id="coverage">Карта покриття - усі ${N} сторінок</h2>\n`;
  h += `  <p class="sub">Ця таблиця не набрана руками: <code>tools/coverage.mjs</code> виводить її з <code>WF_FLOWS</code> (весь продукт,\n` +
       `    сірий) і <code>DESIGN_NAV</code> (те, що існує в кольорі), і переписує розділ між маркерами. Зелене стоїть на тому, що\n` +
       `    увійшло в <b>обсяг</b>; свідомо не зроблене лишається окремим станом <b>з причиною</b> і рахується числом, бо обіцянка\n` +
       `    етапу це «нічого не загубилось», а не «все зелене».</p>\n`;
  h += '  ' + w + '\n';
  for (const fl of WF_FLOWS) {
    const rs = rows.filter(r => r.flow === fl.id);
    if (!rs.length) continue;
    const pg = rs.reduce((a, r) => a + r.pages.length, 0);
    const col = rs.reduce((a, r) => a + r.pages.filter(p => p.colour).length, 0);
    h += `\n  <div class="section-h">\n    <span class="n">${esc(fl.id)}</span>\n    <h2>${esc(fl.name)}</h2>\n` +
         `    <span class="hint">${rs.length} екранів · ${pg} сторінок · у кольорі ${col}</span>\n  </div>\n`;
    h += '  <div class="invtab">\n    <table>\n      <thead><tr><th>Вузол</th><th>Екран</th><th>Сторінки</th><th>Стан</th></tr></thead>\n      <tbody>\n';
    for (const r of rs) {
      const cells = r.pages.map(p => p.colour
        ? `<a href="${p.file}">${esc(p.st ? label(p.st) : 'база')}</a>`
        : `<span class="miss">${esc(p.st ? label(p.st) : 'база')}</span>`).join(' · ');
      const verdict = r.out
        ? `<b>поза обсягом</b> - ${esc(r.out)}`
        : `у кольорі ${r.pages.length} з ${r.pages.length}`;
      h += `        <tr><td>${esc(r.node)}</td><td>${esc(r.name)}</td><td>${cells}</td><td>${verdict}</td></tr>\n`;
    }
    h += '      </tbody>\n    </table>\n  </div>\n';
  }
  h += `\n  <p class="foot-note"><b>Разом: ${N} сторінок у реєстрі</b> · у кольорі <b>${inColour}</b> · поза обсягом <b>${outPages}</b>` +
       ` (${outRows.map(r => esc(r.name)).join(', ')}) · без причини <b>0</b>. Реєстр кольорового прототипу` +
       ` (<code>DESIGN_NAV</code>) називає ${DESIGN_NAV.length} імен плюс ${DESIGN_EXTRA.length} оголошений виняток` +
       ` (<code>${DESIGN_EXTRA.map(esc).join('</code>, <code>')}</code> - хаб, і він навмисно поза реєстром екранів).</p>\n`;
  return h;
}

/* ==== the walk ====================================================== */
const EXPR = `(() => {
  const cur = document.querySelector('.us-page.on');
  const sts = Array.prototype.slice.call(document.querySelectorAll('.us-states .us-st'));
  return JSON.stringify({
    title: (document.title || '').trim(),
    rails: document.querySelectorAll('aside.uiv-side').length,
    docRails: document.querySelectorAll('aside#sidebar').length,
    body: document.body ? document.body.children.length : 0,
    lang: document.documentElement.getAttribute('lang') || '',
    vp: !!document.querySelector('meta[name="viewport"]'),
    node: cur && cur.querySelector('.nd') ? cur.querySelector('.nd').textContent.trim() : null,
    st: sts.map(function(e){ return { l: e.textContent.trim(),
      off: e.classList.contains('off'), grey: e.classList.contains('grey') }; })
  });
})()`;

const APPLY = process.argv.includes('--apply');
const CHECK = process.argv.includes('--check');
let walk = null;

if (!CHECK) {
  const W = 1280;
  const srv = await serve();
  const l = await chrome('coverage');
  const conn = await Conn.open(l.wsUrl);
  const bad = [], twoPanels = [], noVp = [], greyStates = [];
  let opened = 0, onePanel = 0, withStates = 0;
  for (const r of rows) for (const p of r.pages) {
    if (!p.colour) continue;
    const s = await newSession(conn);
    let d = null;
    try {
      d = JSON.parse(await visit(conn, s.sessionId, `${srv.base}/design/${p.file}`, W, 900, EXPR, s.inflight));
    } catch { }
    finally { await s.close(); }
    if (!d || !d.title || !d.body) { bad.push(p.file); process.stdout.write('!'); continue; }
    opened++;
    if (d.rails + d.docRails === 1) onePanel++; else twoPanels.push(`${p.file} (${d.rails + d.docRails})`);
    if (!d.vp) noVp.push(p.file);
    if (p.st === null && !r.out) {
      const dead = d.st.filter(x => x.off || x.grey);
      if (!dead.length) withStates++;
      else greyStates.push(`${p.file}: ${dead.map(x => x.l).join(', ')}`);
    }
    process.stdout.write('.');
  }
  l.stop(); srv.stop();
  walk = { width: W, opened, onePanel, withStates, bad, twoPanels, noVp, greyStates };
  console.log('\n');
  console.log(`===== ОБХІД РЕЄСТРУ =====`);
  console.log(`   записів ${N} · відкрилось ${opened} · зі своїми станами ${withStates} з ${rows.length - outRows.length}`);
  console.log(`   панель рівно одна: ${onePanel} з ${opened}`);
  if (bad.length) console.log(`   НЕ ВІДКРИЛОСЬ (${bad.length}): ${bad.join(' ')}`);
  if (twoPanels.length) console.log(`   ПАНЕЛЕЙ НЕ ОДНА (${twoPanels.length}): ${twoPanels.join(' ')}`);
  if (noVp.length) console.log(`   БЕЗ viewport (${noVp.length}): ${noVp.join(' ')}`);
  if (greyStates.length) console.log(`   СТАН, ЯКИЙ РЕЙКА МАЛЮЄ СІРИМ (${greyStates.length}):\n     ` + greyStates.join('\n     '));
  else console.log(`   стану, який рейка малює сірим або вимкненим: 0`);
  walk.fail = bad.length + twoPanels.length + noVp.length + greyStates.length;
}

console.log('\n===== КАРТА ЯК ЗАДЕКЛАРОВАНИЙ СПИСОК =====');
console.log(`   сторінок у реєстрі: ${N} · у кольорі: ${inColour} · поза обсягом з причиною: ${outPages}`);
console.log(`   ${notOnMap.length ? 'НЕ НА КАРТІ (' + notOnMap.length + '): ' + notOnMap.map(p => p.file).join(' ') : 'на карті всі ' + N}`);
console.log(`   ${strayOnMap.length ? 'ЗАЙВИЙ РЯДОК НА КАРТІ (' + strayOnMap.length + '): ' + strayOnMap.join(' ') : 'зайвих рядків на карті немає'}`);
console.log(`   поза обсягом, але РЯДОК на карті стоїть: ${outOnMap.length} з ${outRows.length}` +
  (outOffMap.length ? ' - НЕМАЄ РЯДКА: ' + outOffMap.map(r => r.name).join(', ') : ''));
if (problems.length) console.log('   ПРОБЛЕМИ СПИСКІВ (' + problems.length + '):\n     ' + problems.join('\n     '));
else console.log('   обидва оголошені списки покривають рівно те, що називають');

if (APPLY) {
  const A = '<!-- coverage:start -->', B = '<!-- coverage:end -->';
  let src = readFileSync(OV, 'utf8');
  const block = A + section(walk) + '  ' + B;
  if (src.includes(A) && src.includes(B))
    src = src.slice(0, src.indexOf(A)) + block + src.slice(src.indexOf(B) + B.length);
  else
    src = src.replace('</main>', block + '\n</main>');
  writeFileSync(OV, src);
  console.log('\nрозділ «Карта покриття» переписано в design/overview.html');
}

const fail = notOnMap.length + strayOnMap.length + outOffMap.length + problems.length + (walk ? (APPLY ? 0 : walk.fail) : 0);
process.exit(fail ? 1 : 0);
