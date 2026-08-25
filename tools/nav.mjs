/* tools/nav.mjs - does the roadmap panel know WHERE IT IS STANDING
   ---------------------------------------------------------------------------
   Owner, 25.08.2026: «нажимаєш по сторінці і воно скролить угору, а я хочу щоб
   фіксувало, де ти зараз». The panel was not marking the current stage and was
   not drawing a single one of the sections its pages declare - on six of the
   seven registry pages that carry it.

   THREE QUESTIONS, AND THE THIRD IS THE ONE NOBODY HAD ASKED:

     A  every page in /_nav.js that carries the panel marks its stage active
     B  a page that declares NAV_SECTIONS renders exactly that many links
     C  ...ASKED OVER file://, because that is the protocol the package promises
     D  the current row is INSIDE the panel's own scroll box, not below its edge
     E  and it is still where you LEFT it after a click - asked ACROSS a real
        navigation, because that is the only place the defect lives

   D AND E ARRIVED SECOND, 25.08.2026, and they cover a different panel too.
   The owner's second report was «панель оновлюється разом зі сторінками і знову
   вгорі»: every screen is its own document, so a panel is rebuilt from zero on
   each click and its scroll box starts at the top. A and B could not see this -
   they ask what the panel SAYS, and the panel was saying it correctly while
   throwing away where the reader stood.

   So the subject widens here from `#sidebar` to BOTH panels of the repository -
   the roadmap (`.nav-roadmap`, 37 pages) and the design system's own rail
   (`#kitnav`, 113 pages) - because the rule is one rule and it is now written in
   two files. A and B stay on the roadmap alone: they are questions about that
   registry. D and E ask everything that has a panel.

   C is the whole point. The cause was `new URL(base, location.href).pathname`
   keeping its percent escapes while `location.pathname` was being decoded, so a
   checkout folder with a SPACE in its name broke the prefix match. Served from
   `/stack/` there is nothing to escape and the panel works perfectly, so every
   check that has ever run against a server was structurally unable to see it -
   and `clone-test.mjs`, which does open these pages from `file://`, asks whether
   a page OPENS, not whether it knows where it is.

   THREE WRONG VERSIONS, KEPT:

   1. The first writing served the pages over http, because every other browser
      instrument here does. It printed a clean sweep on the broken code. A check
      whose transport differs from the promise is not a check of the promise.
   2. The second counted `.nav-section` and called a zero a failure everywhere,
      which fails `index.html` legitimately - the root is not a stage. The root
      is now an EXPLICIT case with its own expectation rather than an exemption
      that quietly swallows a whole class.
   3. The third asked only question A and passed after the decode fix, while the
      root page still declared two sections that landed nowhere. A panel can know
      where it is and still refuse to say it.
   4. The first writing of E parked the target row in the CENTRE of the box. It
      passed on the broken rail, and it had to: the code it was meant to catch
      was `scrollIntoView({block:'center'})`, which centres that same row by
      itself. A check whose expected value is what the defect already produces is
      not a check. The row is now parked near the BOTTOM edge, a place only a
      restored offset can produce.
   5. E compared the landing offset against the raw parked number and called the
      last row of every list a lost place: the two pages draw panels of DIFFERENT
      height, so an offset parked at the foot of the taller one does not exist on
      the shorter and the browser clamps it. The expectation is clamped too.
   6. E compared the landing offset with the number it had parked, and called a
      legitimate correction a lost place. The two pages do not draw the same
      panel - the current row carries its sections with it - so an offset that
      showed a row on A can hide it on B, and the honest 211px nudge that follows
      sits right beside the 300px defect. Asked as a DIFFERENCE between a hot and
      a cold arrival at the same page, the question needs no tolerance at all.
   7. It printed «0 findings, exit 0» having opened nothing: zsh passes `$SUB` as
      ONE argument, no page matched, and an empty subject read as a clean sweep.
      An empty subject is now louder than a finding and exits 2.
   8. The eighth ran D over the roadmap corpus and printed a clean zero. The
      corpus was typed by hand from memory - three of the ten names carried no
      roadmap panel at all, and the 113 pages of the stand, which is where the
      owner was actually standing, were not in it. The subject is read off the
      markup of the whole tree, both ids, and the count is printed.
*/
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { Conn, newSession, visit } from './cdp.mjs';
import { chrome, ROOT } from './lib.mjs';

const args = process.argv.slice(2);
const pages = args.filter(a => !a.startsWith('--'));

/* the subject is DECLARED by the markup: a page that carries the empty aside is
   a page that promised to render the panel. Read from disk, not from a list. */
const find = id => execSync(`grep -rl 'id="${id}"' --include='*.html' . | sed 's|^\\./||' | sort`,
  { cwd: ROOT, encoding: 'utf8' }).trim().split('\n').filter(Boolean);
const all = find('sidebar');
const kit = find('kitnav').filter(f => !all.includes(f));
/* THE THIRD PANEL IS NOT IN ANY MARKUP, and that is exactly why two passes of
   this instrument walked past the one the owner was looking at. `.uiv-side` is
   INJECTED by `uivBar()`, so `grep id=` cannot see it - the subject has to come
   from the registry that declares the screens instead. A subject built from one
   kind of evidence is blind to whatever the product builds a different way. */
const navSrcProd = readFileSync(join(ROOT, 'design/_nav.js'), 'utf8');
const prod = [...navSrcProd.slice(navSrcProd.indexOf('var DESIGN_NAV = ['),
    navSrcProd.indexOf('];', navSrcProd.indexOf('var DESIGN_NAV = ['))).matchAll(/'([^']+\.html)'/g)]
  .map(m => 'design/' + m[1]).filter(f => existsSync(join(ROOT, f)));
const given = pages.map(p => p.endsWith('.html') ? p : p + '.html');
const subject = given.length ? given.filter(f => all.includes(f)) : all;
const kitSubject = given.length ? given.filter(f => kit.includes(f)) : kit;
const prodSubject = given.length ? given.filter(f => prod.includes(f)) : prod;
const FULL = args.includes('--full');

/* A ZERO FROM A WALK THAT OPENED NOTHING IS NOT A ZERO, and this instrument
   printed one: `node tools/nav.mjs $SUB` in zsh passes the whole variable as ONE
   argument, no page matched, and the report came back «0 findings, exit 0» on
   code that was broken on purpose. That is the exact shape `CLAUDE.md` bans -
   the counter was green because nothing had been asked. An empty subject is now
   louder than a finding. */
if (!subject.length && !kitSubject.length && !prodSubject.length) {
  console.error('ПРЕДМЕТ ПОРОЖНІЙ: жодна з названих сторінок не несе панелі.\n' +
    (given.length ? '  названо: ' + given.join(' ') + '\n' : '') +
    '  у дереві з панеллю: ' + all.length + ' реєстрових + ' + kit.length + ' стенда + ' + prod.length + ' продукту.\n' +
    '  (zsh не ріже $VAR на слова - передавайте ${=VAR} або самі імена)');
  process.exit(2);
}

/* the registry, read the way a page reads it */
const navSrc = readFileSync(join(ROOT, '_nav.js'), 'utf8');
const regPages = [...navSrc.matchAll(/page:\s*'([^']+\.html)'/g)].map(m => m[1]);

const noActive = [], secMissing = [], notInReg = [], dead = [];
const outOfBox = [], lostPlace = [], skipped = [];
/* THE SAME CHROME EVERY OTHER INSTRUMENT USES, AND DELIBERATELY NOT THE SAME
   TRANSPORT: `serve()` is skipped and the url is `file://`, because the promise
   under test is «open it with no server». */
const br = await chrome('nav');
const conn = await Conn.open(br.wsUrl);
let walked = 0;

/* `visit` returns the expression's value as a STRING, and `newSession` returns a
   whole session object - both learned by reading `accept.mjs` rather than guessed,
   after two runs that reported 37 findings and had measured nothing. A transport
   error that lands in the same list as a real finding is worse than a crash. */
/* D rides along inside the SAME load: geometry costs nothing once the page is
   open, and a second walk over 150 pages to read two rectangles would only be a
   second chance for the two walks to disagree about which page they were on. */
const GEO = `(function(box, cur){
  if(!box) return null;
  var o = { ch: box.clientHeight, sh: box.scrollHeight, st: Math.round(box.scrollTop) };
  o.over = box.scrollHeight > box.clientHeight + 1;
  if(cur){ var b = box.getBoundingClientRect(), c = cur.getBoundingClientRect();
    o.top = Math.round(c.top - b.top); o.bot = Math.round(c.bottom - b.top);
    o.vis = c.top >= b.top - 1 && c.bottom <= b.bottom + 1; }
  else o.nocur = true;
  return o;
})`;
const ROAD_BOX = `document.querySelector('.nav-roadmap')`;
/* the LEAF first, the stage last - the same order the panel itself uses, and for
   the same reason: «where am I» is the page, not the stage it sits in, and the
   stage row is drawn ABOVE it. An instrument asking about a different element
   than the code anchors on would agree with it by luck. */
const ROAD_CUR = `(document.querySelector('.nav-link.is-current') ||
   document.querySelector('.nav-top.is-current') ||
   document.querySelector('.nav-item.is-active > .nav-top'))`;
const KIT_BOX = `document.getElementById('kitnav')`;
const KIT_CUR = `document.querySelector('#kitnav .kn-l.on')`;
const PROD_BOX = `document.querySelector('.uiv-side .us-nav')`;
const PROD_CUR = `(document.querySelector('.us-st.on') || document.querySelector('.us-page.on'))`;

const ASK = `JSON.stringify({
  declared: (window.NAV_SECTIONS || []).length,
  drawn: document.querySelectorAll('.nav-section').length,
  active: document.querySelectorAll('.nav-item.is-active').length,
  anchor: window.NAV_ACTIVE || null,
  rendered: !!document.querySelector('.nav-roadmap'),
  geo: ${GEO}(${ROAD_BOX}, ${ROAD_CUR})
})`;
const ASK_KIT = `JSON.stringify({
  rendered: !!document.querySelector('#kitnav .kn-l'),
  geo: ${GEO}(${KIT_BOX}, ${KIT_CUR})
})`;
const ASK_PROD = `JSON.stringify({
  rendered: !!document.querySelector('.uiv-side .us-page'),
  geo: ${GEO}(${PROD_BOX}, ${PROD_CUR})
})`;

/* E, side A: park the view at a place that only a RESTORED offset can give back.
   TWO CHOICES HERE ARE THE WHOLE CHECK, and the first writing got both wrong.

   WHICH ROW: the one nearest the MIDDLE of the panel's content, never the last.
   The last row of a long rail sits at the ceiling, and at the ceiling «centred»
   and «parked» are the same number - the rail is 4160px, the last item lands
   within 56px either way, and a check that cannot tell 3205 from 3261 is not
   telling you anything about a 300px defect.

   WHERE: just inside the TOP edge. The centre is the one position that could not
   discriminate at all, because the code under test centred that same row by
   itself. Top-parked and centred are half a box apart by construction. */
const PARK = box => `(function(){
  var box = ${box};
  if(!box) return JSON.stringify({skip:'панелі немає'});
  var max = box.scrollHeight - box.clientHeight;
  if(max <= 1) return JSON.stringify({skip:'бокс не прокручується'});
  var here = location.pathname.split('/').pop();
  var b = box.getBoundingClientRect(), mid = box.scrollHeight / 2, best = null, bestD = Infinity;
  box.querySelectorAll('a[href]').forEach(function(a){
    var h = a.getAttribute('href');
    if(!h || h.charAt(0) === '#') return;
    if(h.split('/').pop().split('#')[0] === here) return;
    var top = (a.getBoundingClientRect().top - b.top) + box.scrollTop;
    var d = Math.abs(top - mid);
    if(d < bestD){ bestD = d; best = { a: a, top: top }; }
  });
  if(!best) return JSON.stringify({skip:'у панелі немає посилання на іншу сторінку'});
  box.scrollTop = Math.max(0, Math.min(max, Math.round(best.top - 24)));
  return JSON.stringify({ x: Math.round(box.scrollTop), href: best.a.getAttribute('href') });
})()`;
const READ = (box, cur) => `JSON.stringify({ st: ${box} ? Math.round(${box}.scrollTop) : null, geo: ${GEO}(${box}, ${cur}) })`;

for (const rel of subject) {
  if (!existsSync(join(ROOT, rel))) { dead.push([rel, 'файла немає']); continue; }
  const ses = await newSession(conn);
  let r;
  try {
    r = JSON.parse(await visit(conn, ses.sessionId, 'file://' + join(ROOT, rel), 1280, 900, ASK, ses.inflight));
  } catch (e) {
    dead.push([rel, String(e.message).slice(0, 60)]);
    await conn.send('Target.closeTarget', { targetId: ses.targetId });
    continue;
  }
  walked++;
  if (!r || !r.rendered) dead.push([rel, 'панель не відмалювалась']);
  else {
    const isRoot = rel === 'index.html';
    const inReg = regPages.includes(rel) || (r.anchor && regPages.includes(r.anchor));
    /* A - the stage. The root is not one and says so; everything else must be. */
    if (!isRoot && !r.active) noActive.push([rel, inReg ? 'є в реєстрі, але не позначена' : 'немає в реєстрі і не сателіт']);
    if (!isRoot && !inReg) notInReg.push([rel, 'ані рядка в /_nav.js, ані NAV_ACTIVE']);
    /* B - the sections. Declared and drawn are two numbers and they are equal. */
    if (r.declared !== r.drawn) secMissing.push([rel, 'оголошено ' + r.declared + ', відмальовано ' + r.drawn]);
    /* D - the current row inside the box. A page with no current row is the root
       and the satellites, and they are not asked: there is nothing to keep. */
    if (r.geo && !r.geo.nocur && r.geo.vis === false)
      outOfBox.push([rel, 'рядок ' + r.geo.top + '..' + r.geo.bot + ' при боксі ' + r.geo.ch]);
  }
  await conn.send('Target.closeTarget', { targetId: ses.targetId });
}

/* ---- D over the stand's own rail: 113 pages, one registry, one rule ---- */
let walkedKit = 0;
for (const rel of kitSubject) {
  const ses = await newSession(conn);
  let r;
  try {
    r = JSON.parse(await visit(conn, ses.sessionId, 'file://' + join(ROOT, rel), 1280, 900, ASK_KIT, ses.inflight));
  } catch (e) {
    dead.push([rel, String(e.message).slice(0, 60)]);
    await conn.send('Target.closeTarget', { targetId: ses.targetId });
    continue;
  }
  walkedKit++;
  if (!r || !r.rendered) dead.push([rel, 'рейка не відмалювалась']);
  else if (r.geo && !r.geo.nocur && r.geo.vis === false)
    outOfBox.push([rel, 'рядок ' + r.geo.top + '..' + r.geo.bot + ' при боксі ' + r.geo.ch]);
  await conn.send('Target.closeTarget', { targetId: ses.targetId });
}

/* ---- D over the product's own screen navigator: 143 screens, injected ---- */
let walkedProd = 0;
for (const rel of prodSubject) {
  const ses = await newSession(conn);
  let r;
  try {
    r = JSON.parse(await visit(conn, ses.sessionId, 'file://' + join(ROOT, rel), 1280, 900, ASK_PROD, ses.inflight));
  } catch (e) {
    dead.push([rel, String(e.message).slice(0, 60)]);
    await conn.send('Target.closeTarget', { targetId: ses.targetId });
    continue;
  }
  walkedProd++;
  if (!r || !r.rendered) dead.push([rel, 'навігатор екранів не відмалювався']);
  else if (r.geo && !r.geo.nocur && r.geo.vis === false)
    outOfBox.push([rel, 'рядок ' + r.geo.top + '..' + r.geo.bot + ' при боксі ' + r.geo.ch]);
  await conn.send('Target.closeTarget', { targetId: ses.targetId });
}

/* ---- F: three panels, one mechanism, and it lives in three files ---------
   There is no file all three registries can reach - the root pages do not load
   the design system and the product screens load nothing from the root - so the
   copies are not forbidden, they are COMPARED. Normalised to whitespace, because
   indentation legitimately differs: one of the three sits inside an IIFE. */
const KEEP = [['_nav.js'], ['design/kit/_nav.js'], ['design/_nav.js']].map(([f]) => {
  const src = readFileSync(join(ROOT, f), 'utf8');
  const i = src.indexOf('function keepPlace(');
  if (i < 0) return [f, null];
  let d = 0, j = src.indexOf('{', i);
  for (let k = j; k < src.length; k++) {
    if (src[k] === '{') d++;
    else if (src[k] === '}') { d--; if (!d) { j = k + 1; break; } }
  }
  return [f, src.slice(i, j).replace(/\s+/g, ' ').trim()];
});
const missing = KEEP.filter(([, b]) => !b).map(([f]) => [f, 'механізму немає в файлі']);
const drift = KEEP.filter(([, b]) => b && b !== KEEP.find(([, x]) => x)[1])
  .filter(([f]) => f !== KEEP.find(([, x]) => x)[0])
  .map(([f]) => [f, 'тіло розійшлось із ' + KEEP.find(([, x]) => x)[0]]);

/* ---- E: does the place survive a CLICK ----------------------------------
   Two loads in ONE tab, which is the only shape that asks the real question:
   sessionStorage is per tab, and a fresh target would answer «no» for a reason
   that has nothing to do with the panel. The height is 680 rather than 900
   because that is where the roadmap box was measured to overflow - at 900 it
   fits, and a box that cannot scroll cannot lose your place. */
const pairSubject = [
  ...subject,
  /* one page per group of the stand rather than all 113: the rail is ONE file
     rendering ONE registry, so the 113 differ only in which row is current.
     Both numbers are printed below - a cap that is not said out loud reads as
     coverage it never had. `--full` asks every one of them. */
  ...(FULL || given.length ? kitSubject : kitGroupSample()),
  /* the product rail is one registry too, and 143 screens of it. Every twelfth
     entry unless --full, spread across the flows rather than clustered at the
     top, and both numbers print. */
  ...(FULL || given.length ? prodSubject : prodSubject.filter((_, i) => i % 12 === 0)),
];
function kitGroupSample() {
  const src = readFileSync(join(ROOT, 'design/kit/_nav.js'), 'utf8');
  const body = src.slice(src.indexOf('window.KIT_NAV = ['));
  const groups = JSON.parse(body.slice(body.indexOf('['), body.indexOf('\n];') + 2));
  return groups.map(g => (g.items.find(i => i.done) || {}).page)
    .filter(Boolean).map(f => 'design/kit/' + f).filter(f => kitSubject.includes(f));
}
let pairsAsked = 0;
/* the cold arrival is its own TAB, opened and closed for the reading, because
   sessionStorage is per tab and a tab that has walked anywhere is not cold. The
   result is cached by page: the same target turns up as the neighbour of several
   pages, and its cold landing does not depend on who asked. */
const coldSeen = new Map();
for (const rel of pairSubject) {
  const isKit = kitSubject.includes(rel), isProd = prodSubject.includes(rel);
  const box = isKit ? KIT_BOX : isProd ? PROD_BOX : ROAD_BOX;
  const cur = isKit ? KIT_CUR : isProd ? PROD_CUR : ROAD_CUR;
  const ses = await newSession(conn);
  let a;
  try {
    a = JSON.parse(await visit(conn, ses.sessionId, 'file://' + join(ROOT, rel), 1280, 680, PARK(box), ses.inflight));
  } catch (e) {
    dead.push([rel, 'E: ' + String(e.message).slice(0, 50)]);
    await conn.send('Target.closeTarget', { targetId: ses.targetId });
    continue;
  }
  if (a.skip) { skipped.push([rel, a.skip]); await conn.send('Target.closeTarget', { targetId: ses.targetId }); continue; }
  if (a.x <= 2) { skipped.push([rel, 'місце для паркування збіглося з нулем']); await conn.send('Target.closeTarget', { targetId: ses.targetId }); continue; }
  const to = relResolve(rel, a.href);
  if (!existsSync(join(ROOT, to))) { skipped.push([rel, 'посилання нікуди не веде: ' + a.href]); await conn.send('Target.closeTarget', { targetId: ses.targetId }); continue; }
  /* A roadmap link legitimately leaves the panel corpus - «Розкотка» opens the
     PRODUCT, which carries its own chrome and no roadmap. That is a page E does
     not ask about, and it is said out loud rather than dropped. Whether a page
     that DOES declare the panel renders it is question A's, asked on the whole
     corpus a hundred lines above; a missing panel there still lands in «не
     зміряно». */
  if (!all.includes(to) && !kit.includes(to) && !prod.includes(to)) { skipped.push([rel + ' -> ' + to, 'сторінка панелі не оголошує - поза предметом E']); await conn.send('Target.closeTarget', { targetId: ses.targetId }); continue; }
  /* AND THE TARGET MUST WEAR THE SAME PANEL. «Розкотка» opens the product from
     the roadmap, and that is a step between two DIFFERENT panels with two
     different keys - there is no offset to carry, and reading the roadmap's box
     on a page that does not have one reported «панель немає» as if the panel had
     failed. A pair whose two ends are not the same panel is not this question. */
  const kindOf = f => kit.includes(f) ? 'kit' : prod.includes(f) ? 'prod' : 'road';
  if (kindOf(to) !== kindOf(rel)) { skipped.push([rel + ' -> ' + to, 'веде на ІНШУ панель (' + kindOf(rel) + ' -> ' + kindOf(to) + ') - ключ інший, переносити нічого']); await conn.send('Target.closeTarget', { targetId: ses.targetId }); continue; }
  let b;
  try {
    b = JSON.parse(await visit(conn, ses.sessionId, 'file://' + join(ROOT, to), 1280, 680, READ(box, cur), ses.inflight));
  } catch (e) {
    dead.push([to, 'E: ' + String(e.message).slice(0, 50)]);
    await conn.send('Target.closeTarget', { targetId: ses.targetId });
    continue;
  }
  /* THE PROMISE IS ASKED AS A DIFFERENCE, AND THAT IS WHY IT NEEDS NO TOLERANCE.
     Comparing the landing offset with the parked number does not work and the
     first writing proved it: the two pages do not draw the SAME panel. The
     current row carries its own sections with it, so rows above the target sit
     at one height on A and another on B, and an offset that showed the row on A
     can legitimately need a nudge on B - 211px of honest correction, sitting
     right next to the 300px defect it was supposed to separate.

     So page B is opened TWICE: once in the tab that walked in from A (hot), once
     in a tab that has never seen it (cold). A panel that keeps your place cannot
     land in the same spot as one that ignores it. Equal means the walk-in bought
     nothing, whatever the number is. */
  const cold = coldSeen.get(to) !== undefined ? coldSeen.get(to) : await (async () => {
    const c = await newSession(conn);
    const v = JSON.parse(await visit(conn, c.sessionId, 'file://' + join(ROOT, to), 1280, 680, READ(box, cur), c.inflight));
    await conn.send('Target.closeTarget', { targetId: c.targetId });
    coldSeen.set(to, v);
    return v;
  })();
  /* A panel that FITS lands at zero however you arrive, and that is not a lost
     place - there is no place. Said out loud rather than counted as a pass:
     seven of the registry pages are like this at this height. */
  if (b.geo && b.geo.over === false) { skipped.push([rel + ' -> ' + to, 'панель там уміщається - тримати нічого']); await conn.send('Target.closeTarget', { targetId: ses.targetId }); continue; }
  pairsAsked++;
  if (b.st === null) dead.push([to, 'E: панелі немає після переходу']);
  else if (Math.abs(b.st - cold.st) <= 2)
    lostPlace.push([rel + ' -> ' + to, 'лишили на ' + a.x + ', а прийшли туди ж, куди й з чистої вкладки: ' + b.st]);
  else if (b.geo && !b.geo.nocur && b.geo.vis === false)
    lostPlace.push([rel + ' -> ' + to, 'місце втримано (' + b.st + '), але поточний рядок за краєм']);
  await conn.send('Target.closeTarget', { targetId: ses.targetId });
}
function relResolve(from, href) {
  const parts = from.split('/').slice(0, -1).concat(href.split('#')[0].split('/'));
  const out = [];
  for (const seg of parts) {
    if (seg === '.' || seg === '') continue;
    if (seg === '..') out.pop(); else out.push(seg);
  }
  return out.join('/');
}
br.stop();

const say = (title, list, fmt) => {
  console.log('\n===== ' + title + ' =====');
  if (!list.length) { console.log('   none'); return; }
  list.forEach(x => console.log('  ' + fmt(x)));
};
say('СТОРІНКА РЕЄСТРУ, ЯКУ ПАНЕЛЬ НЕ ПОЗНАЧИЛА', noActive, ([p, w]) => p.padEnd(34) + w);
say('ОГОЛОШЕНІ СЕКЦІЇ, ЯКІ НЕ ВІДМАЛЮВАЛИСЬ', secMissing, ([p, w]) => p.padEnd(34) + w);
say('СТОРІНКА З ПАНЕЛЛЮ, ЯКОЇ НЕМАЄ В РЕЄСТРІ', notInReg, ([p, w]) => p.padEnd(34) + w);
say('ПОТОЧНИЙ РЯДОК ЗА КРАЄМ СВОГО БОКСА', outOfBox, ([p, w]) => p.padEnd(34) + w);
say('МІСЦЕ, ЯКЕ НЕ ПЕРЕЖИЛО КЛІК', lostPlace, ([p, w]) => p.padEnd(58) + ' ' + w);
say('МЕХАНІЗМ РОЗІЙШОВСЯ МІЖ ПАНЕЛЯМИ', drift.concat(missing), ([p, w]) => p.padEnd(34) + w);
say('НЕ ЗМІРЯНО', dead, ([p, w]) => p.padEnd(34) + w);
say('ПАРУ НЕ ПИТАЛИ, І ОСЬ ЧОМУ', skipped, ([p, w]) => p.padEnd(58) + ' ' + w);

console.log('\nA·B·C   сторінок реєстру з панеллю: ' + subject.length + ' · пройдено: ' + walked);
console.log('D       рейка стенда: ' + kitSubject.length + ' · пройдено: ' + walkedKit +
  ' · навігатор продукту: ' + prodSubject.length + ' · пройдено: ' + walkedProd +
  '  (усього з панеллю: ' + (subject.length + kitSubject.length + prodSubject.length) + ')');
console.log('F       примірників механізму знайдено: ' + KEEP.filter(([, b]) => b).length +
  ' з 3 · розбіжностей: ' + (drift.length + missing.length));
console.log('E       пар зіграно: ' + pairsAsked + ' з ' + pairSubject.length + ' запитаних' +
  (FULL ? '' : ' · рейка стенда по ОДНІЙ сторінці на групу, навігатор продукту кожен 12-й;' +
   ' повний обхід усіх ' + (kitSubject.length + prodSubject.length) + ' - прапорець --full'));
console.log('протокол: file:// (той, який обіцяє handoff.html)');
const bad = noActive.length + secMissing.length + notInReg.length + dead.length +
  outOfBox.length + lostPlace.length + drift.length + missing.length;
console.log('знахідок: ' + bad);
process.exit(bad ? 1 : 0);
