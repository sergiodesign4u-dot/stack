/* tools/inert.mjs - WHICH PRIVATE RULES CAN GO, DECIDED BY LOADING THE PAGE
   WITHOUT THEM.

   THIS REPLACES `private-css.mjs`, AND THE REASON IS THE WHOLE POINT.

   That probe deleted one rule at a time out of the LOADED document and asked
   whether anything moved. It measured 262 of 1 185 private rules as inert, the
   cut was applied, and `tree-diff.mjs` found 9 movements on 5 screens - a rail
   link turning orange at 390, a page 555px taller at 1280. Two corrections went
   into the probe, both right and neither sufficient, and the remaining gap was
   written down as a HYPOTHESIS: mutating a document that has already loaded and
   whose scripts have already reacted to what they saw is not the same experiment
   as loading one without those rules.

   So this instrument does not test the hypothesis. It removes the difference.
   Every verdict here IS a load: the page is written to disk without the rules,
   fetched by the browser from the beginning, and its computed style compared
   with the same page whole. There is no second opinion to disagree with, because
   the probe and the proof are now the same reading - `snapshotExpr()` in
   `lib.mjs`, the one `tree-diff` uses.

   AND THE SEARCH IS SOUND ABOUT SETS, WHICH THE OLD ONE WAS NOT. «Inertness is
   not additive» was step 6's central finding: `coach-clients-cap` held `.acc-nav`
   and `.acc-link[aria-current="page"]`, neither alone changed anything, and
   losing BOTH turned the rail into the mobile chip strip. So no set is ever
   accepted without having been tested as a set. The whole block is tried first -
   most pages answer in one load - and on a failure the block is halved and each
   chunk is offered on TOP of what is already proven safe, so the accepted set is
   verified whole at every step.

   THE PAGE IS CUT IN PLACE AND PUT BACK. Serving a copy under another name was
   the first design and it is wrong: `design/_nav.js` reads the file name to draw
   the roadmap bar and the sidebar, so the copy would differ from the original in
   the one way this tool must not introduce. The original text is held in memory
   and restored on exit, on ^C and on an exception.

     node tools/inert.mjs                  report, restore, write nothing
     node tools/inert.mjs --apply          and leave the cut in
     node tools/inert.mjs coach-order-loading   just these
     node tools/inert.mjs --shard 2/4      every fourth page, starting at the
       second - four of these run at once, one Chrome and one server each, and
       the walk drops from five hours to about ninety minutes. Safe because a
       page is cut in place and no two pages share a file.
     --json <path> writes { found, dead } - the second list is the pages that
       stopped answering, and it exists because a walk that cannot measure a
       screen must SAY so rather than leave it out of the table.

   Every rule is removed WITH THE NOTE ABOVE IT. A comment explaining a rule that
   is no longer there is worse than no comment, and the notes in this repository
   are long. */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, subject, ROOT, snapshotExpr, topRules, withNotes } from './lib.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const argv = process.argv.slice(2);
const APPLY = argv.includes('--apply');
const VERBOSE = argv.includes('--verbose');
const flagValue = name => { const i = argv.indexOf(name); return i > -1 ? argv[i + 1] : null; };
const JSON_OUT = flagValue('--json');
const SHARD = flagValue('--shard');            // "2/4" - every fourth page, starting at the second
const WIDTHS = [390, 1280];
const M = snapshotExpr();
const T0 = Date.now();
const clock = () => new Date(Date.now() - T0).toISOString().slice(11, 19);

/* THE PARSER MOVED TO lib.mjs ON 2026-08-15, unchanged, because `private.mjs`
   asks the same question of the same blocks and the two must agree on where a
   rule starts and ends. Two parsers over one corpus disagree silently. */

/* ---------------------------------------------------------------- the subject */
/* THE GUARD tree-diff.mjs ALREADY PAID FOR, AND THE THIRD FORM OF IT KILLED FOR
   GOOD. Both earlier versions filtered the flag out by INDEX - «i !== JI» and
   «i !== JI + 1» - which drops argv[0] whenever the flag is absent and JI is -1,
   in silence. The second flag (--shard) would have needed the same three-line
   dance a third time, so the shape goes away instead: walk the list once, skip
   anything starting with «--», and skip the token after a flag that takes a
   value. A rule that scales to the next flag, rather than a fix per flag. */
/* every flag that takes a value is registered HERE and nowhere else - `--from`
   was added without this line first, and `subject()` immediately answered «НЕМАЄ
   ТАКОЇ СТОРІНКИ design//private/tmp/....json.html». That is the guard doing its
   job out loud, and it is the difference this generalisation bought: the same
   omission under the old index-filtering code would have silently walked one
   page fewer. */
const TAKES_VALUE = new Set(['--json', '--shard', '--from']);
const NAMED = [];
for (let i = 0; i < argv.length; i++) {
  if (TAKES_VALUE.has(argv[i])) { i++; continue; }
  if (argv[i].startsWith('--')) continue;
  NAMED.push(argv[i]);
}
/* AND THE SUBJECT WAS MORE THAN TWICE THE QUESTION, WHICH ONLY COUNTING FOUND.
   `subject()` reads subfolders - it was widened on 2026-08-13 precisely so no
   walk could miss the stand again - so «every design page with a private
   <style>» is **69** pages, of which **31** are product screens. The other 38 are
   the stand's own demos (35) and stage 06's concept record (3), and their
   private blocks are the showcase drawing itself. CLAUDE.md draws that line by
   name («код і вітрина не змішуються»), `backlog.md` cites it for this very
   walk, and step 6's whole number - 886 overriding rules on 31 screens - is
   about the product.
   The hung run of 2026-08-14 was walking all 69 and would have spent more than
   half of five hours cutting CSS out of the stand. Nobody typed that list wrong;
   the default was simply wider than the sentence it was answering.
   `overview` STAYS: it is a design/ page carrying a private block and it is
   inside step 6's published 31. Dropping it would move a number by preference
   rather than by measurement. */
const STAND = argv.includes('--stand');
let PAGES = subject(NAMED, 'design').filter(p => {
  if (!STAND && !NAMED.length && /^(kit|concept)\//.test(p)) return false;
  const s = readFileSync(join(ROOT, 'design', p + '.html'), 'utf8');
  return /<style>[\s\S]*?<\/style>/.test(s);
});
/* SHARDING IS SAFE HERE AND WOULD NOT BE ANYWHERE ELSE IN THIS FOLDER: a page is
   cut IN PLACE, and no two pages share a file. `serve()` and `chrome()` already
   take a free port and a fresh mkdtemp profile each, so shards never collide on
   a port or a browser profile either. Round-robin rather than blocks, because
   the cost of a page is its rule count and those are not spread evenly - the
   coach session screens carry 74 apiece and the cart states carry 5. */
let SHARD_TAG = '';
if (SHARD) {
  const [k, n] = SHARD.split('/').map(Number);
  if (!(k >= 1 && n >= 1 && k <= n)) { console.log('--shard хоче вигляд k/n, наприклад 2/4'); process.exit(2); }
  PAGES = PAGES.filter((_, i) => i % n === k - 1);
  SHARD_TAG = k + '/' + n + ' ';
  console.log('гілка ' + k + ' з ' + n + ': ' + PAGES.length + ' сторінок');
}
if (!PAGES.length) { console.log('жодної сторінки з приватним <style>'); process.exit(0); }

/* ------------------------------------------------- applying a decision already taken

   `--apply` MEASURES AND THEN WRITES, and that is the right default: every
   verdict in this file is a load, and a mode that writes without loading is
   exactly the second code path this tool exists to avoid.
   But re-measuring in order to write costs the same fifty minutes twice, and the
   proof does not depend on it: `tree-diff --dir` compares the computed style of
   every element against the tree as it stood before the cut, so a cut applied
   from a saved decision is proven or refuted by the same gate as a cut applied
   from a fresh one. What re-measuring buys is a second opinion, not the proof.
   The owner asked for the wall clock back on 2026-08-15 and this is the honest
   way to give it: the SAME parser, the SAME `write()`, only the decision loaded
   instead of measured.
   THE GUARD IS THE WHOLE SAFETY OF IT. A saved decision is a list of rule
   INDICES, so it is only meaningful against the exact file it was taken from. If
   the private block has been touched since, the count of top-level rules moves
   and the indices point at neighbours - a silent, plausible, wrong cut. So the
   count is checked per page and a mismatch stops everything before a byte is
   written. */
const FROM = flagValue('--from');
if (FROM) {
  const decision = {};
  for (const path of FROM.split(',')) {
    const j = JSON.parse(readFileSync(path, 'utf8'));
    Object.assign(decision, j.found || j);
  }
  const bad = [];
  const plan = [];
  for (const p of PAGES) {
    const d = decision[p];
    if (!d) continue;
    const file = join(ROOT, 'design', p + '.html');
    const src = readFileSync(file, 'utf8');
    const m = src.match(/<style>([\s\S]*?)<\/style>/);
    const text = m[1], at = m.index + '<style>'.length;
    const spans = withNotes(text, topRules(text)).map((s, i) => ({ ...s, i }));
    if (spans.length !== d.of) { bad.push(p + ': правил у файлі ' + spans.length + ', у рішенні ' + d.of); continue; }
    plan.push({ p, file, src, text, at, spans, drop: new Set(d.drop) });
  }
  if (bad.length) {
    console.log('ФАЙЛ ЗМІНИВСЯ ПІСЛЯ ЗАМІРУ, індекси більше не про нього:');
    for (const b of bad) console.log('  ' + b);
    console.log('нічого не записано. Переміряти: node tools/inert.mjs');
    process.exit(2);
  }
  let n = 0;
  for (const { p, file, src, text, at, spans, drop } of plan) {
    if (!drop.size) { console.log('  ' + p.padEnd(28) + '  0 - нічого знімати'); continue; }
    const kept = [];
    let cursor = 0;
    for (const s of spans) {
      if (!drop.has(s.i)) continue;
      kept.push(text.slice(cursor, s.start));
      cursor = s.end;
    }
    kept.push(text.slice(cursor));
    writeFileSync(file, src.slice(0, at) + kept.join('') + src.slice(at + text.length));
    n += drop.size;
    console.log('  ' + p.padEnd(28) + String(drop.size).padStart(3) + ' з ' + spans.length + ' знято');
  }
  console.log('\n' + plan.length + ' сторінок · знято ' + n + ' правил · ЗАПИСАНО');
  /* NO APOSTROPHE IN THIS STRING, AND THAT IS NOT FUSSINESS. The word here was
     «обовʼязково» with a curly U+02BC, the project's sweep to the ASCII form ran
     over the file, and the result was a single-quoted JS string cut in half:
     «обов'язково». Seventh time in this repository that a text sweep or a
     backtick has broken source - so the text carries no apostrophe to sweep. */
  console.log('доказ береться окремо: node tools/tree-diff.mjs --dir <еталон>, і без нього розріз не доведений');
  process.exit(0);
}

const ORIGINAL = new Map();
const restore = () => { for (const [f, s] of ORIGINAL) { try { writeFileSync(f, s); } catch {} } };
process.on('exit', restore);
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => { restore(); process.exit(130); });

const srv = await serve();
const l = await chrome('inert' + (SHARD ? SHARD.split('/')[0] : ''));
const conn = await Conn.open(l.wsUrl);

/* THE SECOND LINE OF DEFENCE AGAINST A HANG, and it is not the same as the first.
   `cdp.mjs` now bounds every REQUEST; this bounds the whole READ, which is a
   dozen requests plus two settle loops plus a screenshot. A deadline on the
   parts does not add up to a deadline on the whole.
   A read that dies is retried ONCE with a brand new tab, because the cheap
   failure is a lost message and it does not repeat. A read that dies twice ends
   the PAGE, not the walk: an unmeasurable screen is a line in the report reading
   «не відповіла», which is a result someone can act on. Standing still is not. */
const deadline = (ms, run) => {
  let t;
  return Promise.race([
    run(),
    new Promise((_, rej) => { t = setTimeout(() => rej(new Error('дедлайн ' + Math.round(ms / 1000) + 'с')), ms); t.unref?.(); }),
  ]).finally(() => clearTimeout(t));
};
class PageDead extends Error {}
const twice = async (what, run) => {
  for (let i = 0; i < 2; i++) {
    try { return await deadline(120000, run); }
    catch (e) {
      console.log('      ' + clock() + '  ' + what + ' не відповів: ' + String(e.message).slice(0, 70) +
        (i ? '  - сторінка знімається з обходу' : '  - друга спроба'));
    }
  }
  throw new PageDead(what);
};

/* THE CACHE IS THE WHOLE DIFFICULTY OF THIS TOOL, AND IT ALMOST SANK IT.
   `cdp.mjs` clears the cache once per connection and then RE-ENABLES it, on
   purpose: within one pass the stylesheets never change, and re-fetching the
   webfonts 160 times over the wire is the race that made a null pass non-zero at
   7.51. That optimisation is right for every walk in this folder and fatal for
   the one tool that rewrites a page and asks for the SAME URL again.

   Measured, because guessing at it was how the first run passed: write the cut,
   load, and the browser hands back `styles: [6166]` - the file it already had.
   Load a second time and it finally reports `[0]`. So the first width of every
   test was reading the UNCUT page and answering «nothing moved», which is why
   `coach-verify-tier` came back «the whole block can go» while a screenshot said
   otherwise. An instrument that cannot see its own edit reports that every rule
   is inert, and it reports it in the flattering direction. */
const read = (p, w) => twice('читання ' + p + ' @' + w, async () => {
  const s = await newSession(conn);
  try {
    await conn.send('Network.setCacheDisabled', { cacheDisabled: true }, s.sessionId);
    return JSON.parse(await visit(conn, s.sessionId, `${srv.base}/design/${p}.html`, w, 900, M, s.inflight));
  } finally { await s.close(); }
});
const same = (a, b) => a.length === b.length && a.every((r, i) => r === b[i]);

/* THE READ IS NOT DETERMINISTIC, AND NOTHING IN THIS FOLDER HAD EVER MEASURED IT.
   Four reads of the SAME unchanged page: `coach-session-priceblock` @390 came
   back 39.19px taller on the fourth, with 78 rows differing - `width` on 56 of
   them. That is the webfont fallback, the very race `cdp.mjs` describes in its
   own settle loop («index.html came back 37.6px taller in one pass than in the
   other five») - the loop waits for the loaded-face count and the root height to
   hold still for five frames, and under load a face still starts after it.

   THE NOISE FLOOR WAS THE REAL REASON THE FIRST RUNS SWUNG: the same two pages
   answered «38 of 41», then «0», then «2». Not a bug in the search - a coin
   inside every comparison.

   Which way it lies matters and is worth writing down: a noisy read makes a
   REMOVAL LOOK DANGEROUS, never safe, because noise differs from the baseline in
   both directions and the tool only ever accepts an exact match. So the cost of
   this was coverage, not damage. It is still fixed rather than tolerated,
   because an instrument whose answer changes between runs teaches nobody
   anything.

   Two guards, and both are cheap because noise is rare. A baseline is read until
   the same answer arrives twice. A difference is re-read once before it is
   believed - a real difference survives the second look, a coin does not. */
async function readStable(p, w) {
  const seen = [];
  for (let i = 0; i < 5; i++) {
    const r = await read(p, w); loads++;
    if (seen.some(x => same(x, r))) return r;
    seen.push(r);
  }
  return null;
}

/* THE THIRD READING, AND IT IS NOT OPTIONAL. The probe and the proof deliberately
   share `snapshotExpr()` so they cannot disagree - and a shared reading has a
   shared blind spot. 40 properties on every element is not «what the page looks
   like», it is a good proxy for it, and the first version of this tool was caught
   by a SCREENSHOT saying «different» while computed style said «identical».
   (That turned out to be the cache, not the property list - but the screenshot is
   what asked the question, and nothing else did.)
   So every accepted set is photographed: the page whole, the page cut, both at
   both widths, and the PNG hashed. Pixels are a different instrument from
   computed style, and a page that survives both has been read twice by two
   different means. The null pass is worth knowing: two shots of an unchanged page
   hash identically, measured over four pages. */
const shot = (p, w) => twice('знімок ' + p + ' @' + w, async () => {
  const s = await newSession(conn);
  try {
  await conn.send('Network.setCacheDisabled', { cacheDisabled: true }, s.sessionId);
  const h = await visit(conn, s.sessionId, `${srv.base}/design/${p}.html`, w, 1200,
    'String(Math.min(8000, document.documentElement.scrollHeight))', s.inflight);
  /* the freeze is right for a census and wrong for a photograph - crop.mjs paid
     three blank crops to learn it. A page that fades its sections in sits at
     `opacity: 0` on frame zero, so removing the animation is what settles it. */
  await conn.send('Runtime.evaluate', { returnByValue: true, expression:
    "(() => { const st = document.createElement('style'); st.textContent = '*, *::before, *::after { animation: none !important; }'; document.head.appendChild(st); })()" }, s.sessionId);
  await new Promise(r => setTimeout(r, 120));
  const png = await conn.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: w, height: Number(h), scale: 1 } }, s.sessionId);
  return h + ':' + createHash('sha256').update(Buffer.from(png.data, 'base64')).digest('hex').slice(0, 12);
  } finally { await s.close(); }
});

/* AND THE PHOTOGRAPH FLICKERS TOO, WHICH ONLY A NULL PASS COULD SAY. Three
   consecutive pages came back «pixels disagree» during the first full walk, and
   shooting each of them THREE TIMES with nothing changed produced two different
   hashes on an idle machine - the very pairs the guard had just reported as a
   finding. So the second reading had the same coin in it as the first, and it
   was rejecting real removals rather than catching bad ones.
   Same remedy, and it belongs on every reading this file makes: shoot until the
   same hash arrives twice. `coach-clients-cap` is the page that keeps its
   rejection after this - stable in the null pass, different when cut. */
async function shotSet(p, w) {
  /* A SET, NOT A SETTLED VALUE - because some pages are genuinely BIMODAL.
     `coach-home-empty` @1280 alternates between two hashes with nothing changed,
     so «shoot until one repeats» settles on whichever came twice first: the whole
     side landed on one, the cut side on the other, and the guard called that a
     finding. Take three shots of each side and ask whether the two sets INTERSECT.
     A real change makes them disjoint; a coin cannot. */
  const seen = new Set();
  for (let i = 0; i < 3; i++) { seen.add(await shot(p, w)); loads++; }
  return seen;
}
const intersects = (a, b) => [...a].some(x => b.has(x));

/* AND THE GUARD THAT WOULD HAVE CAUGHT IT, run once before any verdict: cut a
   page to nothing, ask the browser how long its private stylesheet is, and stop
   if the answer has not changed. Every check in this folder that could not say
   «no» said «clean» instead. */
async function assertCutIsVisible(p) {
  const file = join(ROOT, 'design', p + '.html');
  const src = readFileSync(file, 'utf8');
  const m = src.match(/<style>([\s\S]*?)<\/style>/);
  const LEN = 'JSON.stringify([...document.querySelectorAll(\'style\')].map(s => s.textContent.length))';
  const ask = async () => {
    const s = await newSession(conn);
    try {
      await conn.send('Network.setCacheDisabled', { cacheDisabled: true }, s.sessionId);
      const out = JSON.parse(await visit(conn, s.sessionId, `${srv.base}/design/${p}.html`, 390, 900, LEN, s.inflight));
      return out[0];
    } finally { await s.close(); }
  };
  const whole = await ask();
  writeFileSync(file, src.slice(0, m.index) + '<style></style>' + src.slice(m.index + m[0].length));
  const empty = await ask();
  writeFileSync(file, src);
  const back = await ask();
  if (!(whole > 0 && empty === 0 && back === whole)) {
    console.log('ПРИЛАД НЕ БАЧИТЬ ВЛАСНОЇ ПРАВКИ: ' + p + ' -> ' + whole + ' / ' + empty + ' / ' + back);
    console.log('без цього кожне правило звітується як інертне, і саме в приємний бік. Зупинка.');
    l.stop(); srv.stop(); process.exit(2);
  }
  console.log('контроль: правку видно (' + whole + ' -> ' + empty + ' -> ' + back + ')');
}
await assertCutIsVisible(PAGES[0]);

let loads = 0, totalRules = 0, totalDropped = 0;
const FOUND = {};
const report = [];
const DEAD = [];

for (const p of PAGES) {
  const file = join(ROOT, 'design', p + '.html');
  const src = readFileSync(file, 'utf8');
  ORIGINAL.set(file, src);

  const m = src.match(/<style>([\s\S]*?)<\/style>/);
  const text = m[1], at = m.index + '<style>'.length;
  const spans = withNotes(text, topRules(text)).map((s, i) => ({ ...s, i }));
  totalRules += spans.length;
  if (!spans.length) continue;

  const holder = { at, length: text.length };
  const write = drop => {
    const kept = [];
    let cursor = 0;
    for (const s of spans) {
      if (!drop.has(s.i)) continue;
      kept.push(text.slice(cursor, s.start));
      cursor = s.end;
    }
    kept.push(text.slice(cursor));
    writeFileSync(file, src.slice(0, holder.at) + kept.join('') + src.slice(holder.at + holder.length));
  };

  /* THE LOG HAS TO MOVE WHILE THE WORK MOVES, and until 2026-08-15 it did not:
     one line was printed when a page FINISHED, so a screen that takes nine
     minutes and a screen that has hung look identical from the outside for nine
     minutes. That is what let a dead walk pass for a working one all night. The
     heartbeat below is the cheapest possible answer - a line per trial, with the
     clock on it - and it is what any watcher should be reading. */
  console.log('  ' + clock() + '  ' + SHARD_TAG + p + ': ' + spans.length + ' правил, беру еталон');
  try {
  const base = {};
  let unstable = false;
  for (const w of WIDTHS) { base[w] = await readStable(p, w); if (!base[w]) unstable = true; }
  if (unstable) { console.log('  ' + p.padEnd(28) + 'ЕТАЛОН НЕ СТІЙКИЙ - сторінка пропущена'); continue; }

  let trials = 0;
  const test = async drop => {
    write(drop);
    trials++;
    console.log('      ' + clock() + '  проба ' + trials + ': ' + drop.size + ' правил, завантажень ' + loads);
    for (const w of WIDTHS) {
      let now = await read(p, w); loads++;
      /* re-read before believing a difference: a real one survives, a coin does not */
      if (!same(base[w], now)) { now = await read(p, w); loads++; }
      if (!same(base[w], now)) {
        writeFileSync(file, src);
        if (VERBOSE) console.log('      x ' + [...drop].join(',') + ' @' + w + ' -> ' +
          (now.length !== base[w].length ? 'елементів ' + base[w].length + ' -> ' + now.length
            : 'зрушило ' + now.filter((r, i) => r !== base[w][i]).length));
        return false;
      }
    }
    writeFileSync(file, src);
    if (VERBOSE) console.log('      ok ' + [...drop].join(','));
    return true;
  };

  const all = new Set(spans.map(s => s.i));
  let safe = new Set();
  if (await test(all)) safe = all;
  else {
    /* HALVE AND OFFER ON TOP OF WHAT IS ALREADY PROVEN. Never «A passed and B
       passed, so A+B passes» - that is the sentence step 6 paid for. */
    let size = Math.ceil(spans.length / 2);
    while (size >= 1) {
      for (let k = 0; k < spans.length; k += size) {
        const chunk = spans.slice(k, k + size).map(s => s.i).filter(i => !safe.has(i));
        if (!chunk.length) continue;
        const trial = new Set([...safe, ...chunk]);
        if (await test(trial)) safe = trial;
      }
      if (size === 1) break;
      size = Math.ceil(size / 2);
    }
  }

  /* THE PIXEL CONFIRMATION, and a page that fails it keeps its rules. */
  let pix = '';
  const styleDrop = [...safe].sort((x, y) => x - y);
  if (safe.size) {
    const whole = {}, cutp = {};
    for (const w of WIDTHS) whole[w] = await shotSet(p, w);
    write(safe);
    for (const w of WIDTHS) cutp[w] = await shotSet(p, w);
    writeFileSync(file, src);
    const bad = WIDTHS.filter(w => !intersects(whole[w], cutp[w]));
    if (bad.length) { pix = '   ПІКСЕЛІ НЕ ЗІЙШЛИСЬ ' + bad.map(w => '@' + w + ' ' + [...whole[w]].map(x=>x.slice(-6)).join(',') + ' / ' + [...cutp[w]].map(x=>x.slice(-6)).join(',')).join('  ') + ' - лишаємо як є'; safe = new Set(); }
    else pix = '   пікселі збіглись';

  }

  FOUND[p] = { of: spans.length, drop: [...safe].sort((x, y) => x - y), styleDrop, pix };
  totalDropped += safe.size;
  if (safe.size) {
    report.push({ p, of: spans.length, n: safe.size });
    if (APPLY) { write(safe); ORIGINAL.delete(file); }
  }
  console.log('  ' + p.padEnd(28) + String(safe.size).padStart(3) + ' з ' + String(spans.length).padEnd(3) +
    ' правил можна зняти' + (safe.size === spans.length && spans.length ? '   (увесь блок)' : '') + pix);
  } catch (e) {
    if (!(e instanceof PageDead)) throw e;
    /* the page goes back whole and the walk goes on. A screen nobody could
       measure is a NAMED hole in the report, not a silence in it. */
    writeFileSync(file, src);
    DEAD.push(p);
    console.log('  ' + p.padEnd(28) + 'НЕ ВІДПОВІЛА - сторінка лишається як є');
  }
}

l.stop(); srv.stop();
if (!APPLY) restore();
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify({ found: FOUND, dead: DEAD }, null, 1));

console.log('\n' + PAGES.length + ' сторінок · ' + totalRules + ' приватних правил · знімається ' +
  totalDropped + ' · завантажень: ' + loads + ' · за ' + clock() +
  (DEAD.length ? ' · НЕ ВІДПОВІЛИ: ' + DEAD.join(', ') : '') +
  (APPLY ? '  ЗАПИСАНО' : '  (нічого не записано)'));
