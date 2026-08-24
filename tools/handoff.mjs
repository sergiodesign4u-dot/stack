/* tools/handoff.mjs - IS THE HANDOFF A POINTER OR A COPY?

   Stage 13 writes four documents that describe a product they do not own. The
   single rule of the stage is that they REFERENCE rather than duplicate: a
   component and its variant instead of the css, a token name instead of the
   number, an address in `microcopy.md` instead of the sentence a user reads.
   A duplicate is not a shortcut here, it is a second edition - and the second
   edition goes stale in a week and then reads as current, which is worse than
   the gap it filled.

   That rule is prose, and prose has no check under it. This file is the check.

   FIVE QUESTIONS, all asked of the whole `handoff/` tree:

     A  a colour literal (`#rgb`, `#rrggbb`) anywhere in a handoff document
     B  a length in `px`. The registry keeps its widths in `rem` with the token
        named beside them, so a `px` here is by definition a number copied out of
        a file rather than an address into one
     C  a css fragment - a `{ ... }` block, or a bare `property: value;` pair in a
        code span. `var(--token)` is NOT one of these: naming a token is exactly
        what this stage asks for, and a check that forbade it would forbid the
        cure along with the disease
     D  a READY INTERFACE STRING - a «...» fragment that also stands, verbatim, in
        the `Текст` column of `voice/docs/microcopy.md`. The threshold is THREE
        WORDS and it is declared rather than felt: a one-word label («Кошик»,
        «Далі») is also the NAME of the thing, and forbidding it would forbid
        naming screens. What this catches is the class that actually hurts - an
        error message, a hint, a confirmation - copied instead of addressed
     E  every row of `behaviour.md` names a SOURCE, and the source RESOLVES.
        Three sources are legal, exactly as the stage pack says: the screen file
        (`design/<name>.html`), the flow (`flows.md · <node>`) and the IA node
        (`pages/<node>.md`). A row with an empty source is not an error here - it
        is only an error if it is not also listed under «НЕ ВИРІШЕНО», because
        that list is where a row without a source is supposed to go

   AND THE SIXTH, WHICH IS THE IDLE CONTROL OF ALL FIVE:

     F  the roll-call. Flows in `flows.md` = described in `behaviour.md` + named
        as deliberately-not. A missing file is reported as MISSING, never as zero:
        this file runs while the stage is being written, and a zero from a
        question asked of a document that does not exist yet is the one answer an
        instrument may never give.

     node tools/handoff.mjs            all six questions
     node tools/handoff.mjs --strings  what D's subject actually contains */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROOT } from './lib.mjs';

const HO = join(ROOT, 'handoff');
const say = (title, list, fmt) => {
  if (!list.length) return;
  console.log('\n' + title + ' (' + list.length + '):');
  for (const x of list) console.log('  ' + fmt(x));
};

/* ---------- the subject, named before it is measured ---------- */
if (!existsSync(HO)) { console.log('handoff/ ще немає - етап 13 не починався'); process.exit(0); }
const docs = [];
const walk = d => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(md|html)$/.test(e.name)) docs.push(p);
  }
};
walk(HO);
/* ROOT carries a trailing separator, and the first writing of this line took
   slice(ROOT.length + 1) - so every path in every finding read «andoff/docs/...».
   A finding whose address is wrong by one character is a finding a reader cannot
   open. */
const rel = p => relative(ROOT, p);
const mds = docs.filter(p => p.endsWith('.md'));

/* ---------- D's dictionary, built once ---------- */
const micro = readFileSync(join(ROOT, 'voice/docs/microcopy.md'), 'utf8');
const uiStrings = new Set();
for (const l of micro.split('\n')) {
  if (!l.startsWith('| ')) continue;
  const cells = l.split('|').map(x => x.trim());
  if (cells.length < 5) continue;
  const s = cells[3].replace(/`[^`]*`/g, ' ').replace(/\[[A-Z?]+\]/g, ' ').trim();
  if (s.split(/\s+/).filter(Boolean).length >= 3) uiStrings.add(s);
}
if (process.argv.includes('--strings')) {
  console.log('рядків інтерфейсу від трьох слів у microcopy.md: ' + uiStrings.size);
  for (const s of [...uiStrings].sort().slice(0, 40)) console.log('  ' + s);
  process.exit(0);
}

/* ---------- A, B, C, D ---------- */
/* the css properties that are ONE word. Everything else this check recognises
   carries a hyphen, which is the reason the list can stay this short. It is an
   inclusion list, not an exemption: an entry that never fires costs a reader
   nothing, while a MISSING entry lets a declaration through - so the failure
   mode of this list is a quiet miss, and that is what `--strings` and the
   counter below are for. */
const BARE_CSS = new Set(['display', 'color', 'gap', 'width', 'height', 'padding', 'margin',
  'position', 'content', 'opacity', 'transform', 'transition', 'animation', 'background',
  'border', 'font', 'flex', 'grid', 'top', 'left', 'right', 'bottom', 'inset', 'overflow',
  'cursor', 'filter', 'order', 'visibility', 'z-index', 'clear', 'float', 'outline']);
const hex = [], px = [], css = [], copied = [];
/* a fenced block is code by definition and the rules above are about PROSE that
   pretends to be a reference. There are no fenced blocks in these documents by
   design, and if one appears it is itself the finding - so nothing is stripped
   and nothing is excused. */
for (const p of mds) {
  const lines = readFileSync(p, 'utf8').split('\n');
  lines.forEach((l, i) => {
    const at = rel(p) + ':' + (i + 1);
    for (const m of l.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) hex.push([at, m[0]]);
    for (const m of l.matchAll(/\b\d+(?:\.\d+)?px\b/g)) px.push([at, m[0]]);
    /* a css BLOCK, or a declaration inside a code span. `var(--x)` on its own is
       an address and is left alone; a declaration that CONTAINS a var() is still
       a declaration and is not. */
    for (const m of l.matchAll(/\{[^{}]*:[^{}]*\}/g)) css.push([at, m[0].slice(0, 50)]);
    /* A DECLARATION IS RECOGNISED BY ITS PROPERTY, NOT BY THE COLON. The first
       writing asked for «word: anything» inside a code span and its first find was
       `wip: true` - a row of the roadmap registry, written about in prose, in a
       document that contains no css at all. A rule whose first catch is a false
       one teaches the next reader to scroll past it.
       A css property either carries a hyphen or is one of the bare words below,
       and `data-` / `aria-` are attributes rather than properties. */
    for (const m of l.matchAll(/`([a-z][a-z-]*)\s*:\s*([^`]+)`/g)) {
      const prop = m[1];
      if (/^(data|aria)-/.test(prop)) continue;
      if (!prop.includes('-') && !BARE_CSS.has(prop)) continue;
      css.push([at, m[0].slice(0, 50)]);
    }
    for (const m of l.matchAll(/«([^»]{8,})»/g)) {
      const s = m[1].trim();
      if (uiStrings.has(s)) copied.push([at, s]);
    }
  });
}
say('КОЛІР ЛІТЕРАЛОМ', hex, ([at, s]) => at.padEnd(34) + s);
say('ДОВЖИНА В px', px, ([at, s]) => at.padEnd(34) + s);
say('ШМАТОК CSS ЗАМІСТЬ АДРЕСИ', css, ([at, s]) => at.padEnd(34) + s);
say('ГОТОВИЙ РЯДОК ІНТЕРФЕЙСУ ЗАМІСТЬ КЛЮЧА', copied, ([at, s]) => at.padEnd(34) + '«' + s + '»');

/* ---------- E: the source column of behaviour.md ---------- */
const BEH = join(HO, 'docs/behaviour.md');
const noSrc = [], badSrc = [];
let behRows = 0, behMissing = !existsSync(BEH);
if (!behMissing) {
  const text = readFileSync(BEH, 'utf8');
  /* «НЕ ВИРІШЕНО» is a section, and a row inside it is a row that has ALREADY
     been declared sourceless. Asking the same row twice would make the list the
     defect it exists to record. */
  const cut = (text.match(/^##.*(?:НЕ ВИРІШЕНО|NOT DECIDED)/m) || {}).index ?? -1;
  const body = cut < 0 ? text : text.slice(0, cut);
  const undecided = cut < 0 ? '' : text.slice(cut);
  const designFiles = new Set(readdirSync(join(ROOT, 'design')).filter(f => f.endsWith('.html')));
  const flowsMd = readFileSync(join(ROOT, 'ia/docs/flows.md'), 'utf8');
  /* A SPEC TABLE IS ONE WHOSE LAST COLUMN IS «Source», AND THE FIRST WRITING OF
     THIS ASKED EVERY TABLE IN THE FILE. It then reported the legend that EXPLAINS
     the three sources as ten rows with sources that do not resolve - «Answers»,
     «Section», «F1». Ten findings, none of them about the product. A check that
     cannot tell its subject from the prose describing its subject reports the
     prose. The header row declares the table's kind, so it is read first. */
  let inSpec = false;
  body.split('\n').forEach((l, i) => {
    if (!l.startsWith('| ')) { if (!l.trim()) inSpec = false; return; }
    const cells = l.split('|').map(x => x.trim()).filter((x, k, a) => k > 0 && k < a.length - 1);
    if (/^\|\s*[-: ]+\|/.test(l)) return;
    if (cells.length < 2) return;
    if (/^Source$/i.test(cells[cells.length - 1])) { inSpec = true; return; }
    if (!inSpec) return;
    const first = cells[0];
    behRows++;
    const src = cells[cells.length - 1];
    const at = 'behaviour.md:' + (i + 1);
    if (!src || src === '–') { noSrc.push([at, first]); return; }
    for (const one of src.split(/\s*\+\s*/)) {
      const s = one.replace(/`/g, '').trim();
      let ok = false;
      const d = s.match(/^design\/([a-z0-9-]+\.html)$/);
      const g = s.match(/^pages\/([a-z0-9.x-]+)\.md$/);
      const fl = s.match(/^flows\.md(?:\s*·\s*(\S+))?$/);
      if (d) ok = designFiles.has(d[1]);
      else if (g) ok = existsSync(join(ROOT, 'ia/docs/pages', g[1] + '.md'));
      else if (fl) ok = !fl[1] || new RegExp('(^|\\s)' + fl[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\[({]').test(flowsMd);
      if (!ok) badSrc.push([at, s]);
    }
  });
  /* ONLY THE FIRST TABLE UNDER THE HEADING. The section also carries the
     «who reads this file» table below it, and counting every row after the
     heading published «10» for a list of six - a wrong number in the one line a
     reader would quote. */
  const undecidedBlock = cut < 0 ? '' : (undecided.replace(/^## /, '').split(/^## /m)[0]);
  const undecidedRows = Math.max(0, undecidedBlock.split('\n').filter(l => l.startsWith('| ') && !/^\|\s*[-: ]+\|/.test(l)).length - 1);
  console.log('\nbehaviour.md: рядків спеки ' + behRows + ' · без джерела ' + noSrc.length +
    ' · у списку «НЕ ВИРІШЕНО» ' + undecidedRows);
}
say('РЯДОК СПЕКИ БЕЗ ДЖЕРЕЛА', noSrc, ([at, s]) => at.padEnd(20) + s);
say('ДЖЕРЕЛО, ЯКОГО НЕМАЄ', badSrc, ([at, s]) => at.padEnd(20) + s);

/* ---------- G: the map's roll-call, asked of the registry ----------
   `map.md` is generated by `tools/map.mjs`, so its CONTENT cannot go wrong
   without the instrument going wrong. What can go wrong is the file being older
   than the registry - a screen added after the last run. That is one comparison
   and it costs no browser: every screen in `design/_nav.js` has a row in section
   A, and every row in section A is a screen in `design/_nav.js`. Asked both ways,
   because a map with an extra row and a map with a missing one are the same
   defect from opposite sides. */
const MAP = join(HO, 'docs/map.md');
const mapMissing = !existsSync(MAP);
const mapNoRow = [], mapGhost = [];
if (!mapMissing) {
  const text = readFileSync(MAP, 'utf8');
  const nav = readFileSync(join(ROOT, 'design/_nav.js'), 'utf8');
  const b = nav.slice(nav.indexOf('var DESIGN_NAV = ['), nav.indexOf('];', nav.indexOf('var DESIGN_NAV = [')));
  const navList = [...b.matchAll(/'([a-z0-9-]+)\.html'/g)].map(m => m[1]);
  const rows = new Set([...text.matchAll(/^\| `([a-z0-9-]+)\.html` \|/gm)].map(m => m[1]));
  for (const p of navList) if (!rows.has(p)) mapNoRow.push(p);
  for (const p of rows) if (!navList.includes(p)) mapGhost.push(p);
  console.log('\nmap.md: екранів у DESIGN_NAV ' + navList.length + ' · рядків у розділі A ' + rows.size +
    ' · без рядка ' + mapNoRow.length + ' · рядок без екрана ' + mapGhost.length);
}
say('ЕКРАН БЕЗ РЯДКА В КАРТІ', mapNoRow, p => p + '.html');
say('РЯДОК КАРТИ БЕЗ ЕКРАНА В РЕЄСТРІ', mapGhost, p => p + '.html');

/* ---------- I: THE ROUTE, MEASURED IN CLICKS ----------
   The stage pack asks for «no more than two clicks from the root index.html to
   any artefact of the handoff», and a sentence like that is worth nothing unless
   something counts. It is countable here because the route has exactly two legs:

     click 1  the SIDEBAR. Every page in this project carries the same panel,
              rendered from the one registry in /_nav.js, so every registry row
              is one click from anywhere - including the root index.html, which
              does not link to handoff.html directly and does not need to.
     click 2  a link on the page that click 1 opened.

   So the check is: handoff.html stands in the registry, and every artefact under
   handoff/ is linked FROM handoff.html. A file that exists in the folder and is
   named by nobody is the failure this catches - it would be an artefact with no
   reader, which is the same class as an md with no visible place.

   And the second half of the pack's sentence, asked here because it is about the
   same page: the sign «](» in the assembled html is zero. A markdown link pasted
   into html renders as literal text and reads like a typo the author did not see. */
const HTML = join(HO, 'handoff.html');
const pageMissing = !existsSync(HTML);
const unlinked = [], mdInHtml = [];
let inRegistry = false, linkedFrom = 0;
if (!pageMissing) {
  const page = readFileSync(HTML, 'utf8');
  const nav = readFileSync(join(ROOT, '_nav.js'), 'utf8');
  inRegistry = /page:\s*'handoff\/handoff\.html'/.test(nav);
  const hrefs = new Set([...page.matchAll(/href="([^"]+)"/g)].map(m => m[1].split('#')[0]));
  linkedFrom = [...hrefs].filter(h => /^docs\//.test(h)).length;
  for (const f of docs) {
    const r = rel(f).replace(/^handoff\//, '');
    if (r === 'handoff.html') continue;
    if (!hrefs.has(r)) unlinked.push(r);
  }
  const md = (page.match(/\]\(/g) || []).length;
  if (md) mdInHtml.push(['handoff.html', md + ' x «](» - розмітка md усередині html']);
  console.log('\nмаршрут: handoff.html у реєстрі ' + (inRegistry ? 'ТАК' : 'НІ') +
    ' (клік 1) · документів, на які він веде: ' + linkedFrom +
    ' (клік 2) · артефактів без посилання: ' + unlinked.length);
}
say('АРТЕФАКТ У handoff/, НА ЯКИЙ НЕ ВЕДЕ handoff.html', unlinked, x => x);
say('РОЗМІТКА MD УСЕРЕДИНІ HTML', mdInHtml, ([f, w]) => f.padEnd(16) + w);
if (!pageMissing && !inRegistry)
  console.log('\nhandoff.html НЕ В РЕЄСТРІ /_nav.js - до нього немає першого кліка нізвідки');

/* ---------- H: every a11y row has a WAY TO CHECK, and it exists ----------
   The stage pack's sentence is the whole of this question: «a point for which an
   instrument cannot be named never gets CONFIRMED». A checklist row without a way
   to check is not a confirmation and not a plan - it looks like work that was
   done and is not, which is the most expensive shape a document can take.

   Three things are asked of every row: the «how to check» cell is not empty, the
   command it names is a file that EXISTS in tools/, and the status is one of
   exactly two words. A third status - «частково», «здебільшого» - is how a debt
   becomes invisible, so anything that is not one of the two fails. */
const A11Y = join(HO, 'docs/a11y.md');
const a11yMissing = !existsSync(A11Y);
const noWay = [], ghostTool = [], badStatus = [];
let a11yRows = 0, confirmed = 0, debts = 0;
if (!a11yMissing) {
  const text = readFileSync(A11Y, 'utf8');
  let inTable = false;
  for (const l of text.split('\n')) {
    if (!l.startsWith('| ')) { if (!l.trim()) inTable = false; continue; }
    const cells = l.split('|').map(x => x.trim()).filter((x, k, a) => k > 0 && k < a.length - 1);
    if (/^\|\s*[-: ]+\|/.test(l)) continue;
    if (cells.length < 4) continue;
    if (/^Status$/i.test(cells[cells.length - 1])) { inTable = true; continue; }
    if (!inTable) continue;
    a11yRows++;
    const id = cells[0];
    const how = cells[cells.length - 2], status = cells[cells.length - 1];
    if (!how || how === '–') noWay.push([id, 'колонка «як перевірити» порожня']);
    else {
      const tools = [...how.matchAll(/(?:node|python3)\s+(tools\/[a-z0-9-]+\.(?:mjs|py))/g)].map(m => m[1]);
      if (!tools.length) noWay.push([id, 'у колонці немає жодної команди: ' + how.slice(0, 50)]);
      for (const tl of tools) if (!existsSync(join(ROOT, tl))) ghostTool.push([id, tl]);
    }
    const ok = /підтверджено/.test(status), dg = /борг/.test(status);
    if (ok && !dg) confirmed++;
    else if (dg && !ok) debts++;
    else badStatus.push([id, status.slice(0, 60)]);
  }
  console.log('\na11y.md: рядків ' + a11yRows + ' · підтверджено ' + confirmed + ' · борг ' + debts +
    ' · без способу перевірити ' + noWay.length + ' · названий прилад не існує ' + ghostTool.length +
    ' · статус не з двох ' + badStatus.length);
}
say('РЯДОК ДОСТУПНОСТІ БЕЗ СПОСОБУ ПЕРЕВІРИТИ', noWay, ([i, w]) => i.padEnd(6) + w);
say('НАЗВАНИЙ ПРИЛАД НЕ ІСНУЄ', ghostTool, ([i, w]) => i.padEnd(6) + w);
say('СТАТУС НЕ З ДВОХ ЗНАЧЕНЬ', badStatus, ([i, w]) => i.padEnd(6) + w);

/* ---------- F: the roll-call ---------- */
const flowsMd = readFileSync(join(ROOT, 'ia/docs/flows.md'), 'utf8');
const flows = flowsMd.split(/^## /m).slice(1).filter(s => /```mermaid/.test(s)).map(s => s.split('\n')[0].trim());
let described = [], notYet = [];
if (!behMissing) {
  const text = readFileSync(BEH, 'utf8');
  for (const f of flows) {
    const key = f.split(' - ')[0].trim();
    (new RegExp('\\b' + key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(text) ? described : notYet).push(key);
  }
}
console.log('\nфлоу у flows.md: ' + flows.length +
  (behMissing ? '  ·  behaviour.md ЩЕ НЕМАЄ - перекличку ставити нема з чим'
              : '  ·  описано ' + described.length + ' · не названо ' + notYet.length));
say('ФЛОУ, ЯКОГО behaviour.md НЕ НАЗИВАЄ', notYet, x => x);

console.log('\nдокументів у handoff/: ' + docs.length + ' (' + mds.length + ' md)' +
  '  ·  словник D: ' + uiStrings.size + ' рядків від трьох слів' +
  (behMissing ? '  ·  behaviour.md ЩЕ НЕМАЄ' : ''));

/* THREE VERDICTS, NOT TWO, and the third is why. Questions E and F have no
   subject until `behaviour.md` exists, and the first writing of this line let
   that run hand back 0 - a clean bill from an instrument that had not looked at
   anything. «A zero from an instrument that cannot see the class is not a zero»
   is the repository's own sentence and this was a live example of it inside the
   file meant to enforce it.
     0  asked everything, found nothing
     1  found something
     2  could not ask - the subject is not on disk yet */
if (behMissing || mapMissing || a11yMissing || pageMissing) {
  console.log('\nВЕРДИКТ: 2 - предмет неповний' +
    (behMissing ? ', behaviour.md немає (E і F)' : '') + (mapMissing ? ', map.md немає (G)' : '') +
    (a11yMissing ? ', a11y.md немає (H)' : '') + (pageMissing ? ', handoff.html немає (I)' : ''));
  process.exit(2);
}
process.exit(hex.length || px.length || css.length || copied.length ||
  noSrc.length || badSrc.length || notYet.length || mapNoRow.length || mapGhost.length ||
  noWay.length || ghostTool.length || badStatus.length ||
  unlinked.length || mdInHtml.length || !inRegistry ? 1 : 0);
