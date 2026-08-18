/* tools/private.mjs - WHAT IS LEFT IN THE PRIVATE BLOCKS, AND WHERE EACH RULE
   HAS TO GO.

   `inert.mjs` answered «which of these rules do nothing» and 655 of 1 154 left
   on 2026-08-15. The 499 that remain all DO something, so none of them can be
   deleted on the strength of a measurement - each one is either a copy of a class
   the system already owns, which means it moves into that component, or a name
   that exists nowhere else, which is a decision: a component of its own, or gone.

   Step 6 published that split as «886 overriding / 210 local» before the scope
   fix and before the cut, and the word «overriding» was measured as «the system
   owns this class too». That question is still the right one; the corpus under it
   has changed twice since, so it is asked again here rather than subtracted.

   THE DESTINATION IS READ, NOT CHOSEN. A rule belongs to the component that
   already declares its classes, and `design/system/components/*.css` says which
   one that is. A selector whose classes are spread over two components has no
   single home and is reported as a question rather than answered.

   THE SAME PARSER AS `inert.mjs`, imported from `lib.mjs` rather than retyped -
   two parsers over one corpus disagree about where a rule ends, and they do it
   silently.

     node tools/private.mjs              the three lists and the totals
     node tools/private.mjs --by-page    per screen instead of per destination
     node tools/private.mjs --local      only the names the system has never seen
     node tools/private.mjs --diff       WHAT each rule changes, grouped by the
       difference itself - because the differences repeat, and forty rules saying
       15px where the system says 16px are ONE decision, not forty
     node tools/private.mjs --json <p>   the raw record

   It writes nothing. Moving a rule changes what the page renders only if the
   system copy differs from the private one, and that is `tree-diff` territory,
   not this file's. */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { subject, ROOT, topRules, withNotes, braceAfterNotes, privateBlock, outOfPrivateSubject } from './lib.mjs';

const argv = process.argv.slice(2);
const BY_PAGE = argv.includes('--by-page');
const DIFF = argv.includes('--diff');
const ONLY_LOCAL = argv.includes('--local');
const flagValue = name => { const i = argv.indexOf(name); return i > -1 ? argv[i + 1] : null; };
const JSON_OUT = flagValue('--json');
const TAKES_VALUE = new Set(['--json']);
const NAMED = [];
for (let i = 0; i < argv.length; i++) {
  if (TAKES_VALUE.has(argv[i])) { i++; continue; }
  if (argv[i].startsWith('--')) continue;
  NAMED.push(argv[i]);
}

/* the same subject line as inert.mjs, and for the same reason: the stand's
   private blocks are the showcase drawing itself, not the product.

   AND `overview` LEAVES IT ON 2026-08-15, MEASURED RATHER THAN PREFERRED. It was
   kept in yesterday deliberately, on the ground that dropping a page from a
   published count without a measurement is preference. Here is the measurement:
   `design/overview.html` does not link `system/index.css` AT ALL - only
   `../_nav.css` and its own block - so «which private rules override the system»
   is not a question that applies to it. The probe found it from the other end
   too: neutering its `*{ box-sizing: border-box }` moved 392 computed values,
   which cannot happen on a page that has `base.css`, where the same declaration
   sits on line 7.
   It is the stage hub, the same thing as `wireframes/overview.html`, which
   `backlog.md` already excludes by name. Its 33 rules are the hub drawing itself.
   YESTERDAY'S PUBLISHED NUMBERS INCLUDE IT and stay reconstructable: 31 screens,
   1 154 rules, 655 cut - of which the hub was 33 rules and 3 of the cut. Without
   it the subject is 30 screens. */
/* AND THE SUBJECT IS «HAS A RULE», NOT «HAS A <style>» - step 8.42. The two
   were the same thing while the blocks were full and stopped being the same the
   moment the migration started leaving notes where the rules had been. See
   `privateBlock` in lib.mjs for what that cost. The two other outcomes are
   printed rather than dropped: a page holding only a note is the record, a page
   holding only blank lines is residue, and neither is visible if the filter
   simply swallows both. */
/* AND THE EXCLUSIONS MOVED TO lib.mjs ON 2026-08-17, step 8.48 - the two names
   above were the half `inert.mjs` did not share, and the two walks answered the
   same question differently for two days without either saying so. See
   `outOfPrivateSubject` there for what that cost and why it only showed at zero. */
const NOTE_ONLY = [], BLANK = [], DROPPED = [];
const PAGES = subject(NAMED, 'design').filter(p => {
  if (!NAMED.length) {
    const why = outOfPrivateSubject(p);
    if (why) {
      const b0 = privateBlock(readFileSync(join(ROOT, 'design', p + '.html'), 'utf8'));
      if (b0 && b0.rules) DROPPED.push(p + '  (' + b0.rules + ')');
      return false;
    }
  }
  const b = privateBlock(readFileSync(join(ROOT, 'design', p + '.html'), 'utf8'));
  if (!b) return false;
  if (b.rules) return true;
  (b.note ? NOTE_ONLY : BLANK).push(p);
  return false;
});
const TAIL = () => {
  console.log('ще ' + NOTE_ONLY.length + ' сторінок несуть <style> ЛИШЕ із запискою про те, ' +
    'що звідти пішло і куди - це запис, а не борг.');
  console.log('порожніх оболонок <style> без жодного слова: ' + BLANK.length +
    (BLANK.length ? '  ' + BLANK.join(' ') : ''));
  console.log('поза предметом, із правилами: ' + DROPPED.length +
    (DROPPED.length ? ' - вітрина і хаб, той самий список, що в inert.mjs' : ' –'));
};
if (!PAGES.length) { console.log('жодної сторінки з приватним ПРАВИЛОМ'); TAIL(); process.exit(0); }

/* ------------------------------------------------ what the system already owns

   A class is «owned» when a component file DECLARES it - it appears in a
   selector on the left of a brace. A class that only ever appears in a comment
   is not owned, which is why the selector text is taken from the parser rather
   than from a grep over the whole file: `button.css` discusses `.dark` at length
   and declares it nowhere, and a grep would have called that ownership. */
/* A MODIFIER DOES NOT NAME A COMPONENT - step 8.23, and it had been handing out
   wrong homes quietly. `classesOf` reads every class in a selector, so
   `.loy .lrung.now` registered `.now` as loyalty-rung.css's, and a private
   `.cv-steps2 li.now` - a checklist on the verification screen, with nothing
   whatever to do with a loyalty tier - came back as «one home: loyalty-rung.css».
   The report then reads as an instruction to move it there.
   The rule: within one compound (`.lrung.now`, `.ci.oos`, `.btn--outline.btn`),
   only the FIRST class names the thing; the rest qualify it. Across the
   descendant combinator every compound still counts, because `.loy .lrung` means
   this file owns both names. Adjectives - `.now`, `.on`, `.off`, `.oos`, `.done`,
   `.open` - are shared vocabulary across twenty files, and any of them matching
   as a home is noise dressed as an answer. */
const SYS = join(ROOT, 'design/system/components');
const owner = new Map();          // class -> Set(file)
/* WHERE the file declares it, so «one home» can be checked rather than believed
   - step 8.26. `buy-box.css` declares `.bb .tier`, a wholesale-price badge INSIDE
   the buy box; `coach-verify-tier` has `.tier`, a whole plan card. The verdict
   «one home: buy-box.css» is true about the name and useless about the object,
   and nothing in the output said which selector produced it. The verdict is
   unchanged and the GROUND is now printed under it. Same repair as tree-diff's
   roll-up: do not soften the answer, show what it rests on. */
const ownerSel = new Map();       // class|file -> first declaring selector
const classesOf = sel => sel.split(/[\s>+~,]+/).filter(Boolean)
  .map(part => (part.match(/\.(-?[_a-zA-Z][\w-]*)/) || [])[1])
  .filter(Boolean);

const collect = (css, file) => {
  for (const s of topRules(css)) {
    const text = css.slice(s.start, s.end);
    const head = text.slice(0, text.indexOf('{'));
    if (/^\s*@/.test(head)) {                      // @media / @supports: go inside
      const inner = text.slice(text.indexOf('{') + 1, text.lastIndexOf('}'));
      collect(inner, file);
      continue;
    }
    for (const c of classesOf(head)) {
      if (!owner.has(c)) owner.set(c, new Set());
      owner.get(c).add(file);
      const k = c + '|' + file;
      if (!ownerSel.has(k)) ownerSel.set(k, head.split(',')[0].replace(/\s+/g, ' ').trim());
    }
  }
};
for (const f of readdirSync(SYS).filter(f => f.endsWith('.css')))
  collect(readFileSync(join(SYS, f), 'utf8'), f);
for (const f of ['base.css', 'tokens.css'])
  { try { collect(readFileSync(join(ROOT, 'design/system', f), 'utf8'), f); } catch {} }

/* ------------------------------------------------------------ the private rules */
const rows = [];
const walk = (css, page, media) => {
  for (const s of withNotes(css, topRules(css))) {
    const text = css.slice(s.start, s.end);
    /* 8.31 - NOT `indexOf`, because the span now carries its note and this
       repository writes css inside its notes. See `braceAfterNotes` in lib.mjs
       for the paragraph that was being read as a selector. */
    const brace = braceAfterNotes(text);
    /* THE SELECTOR IS WHAT IS LEFT AFTER THE COMMENTS ARE TAKEN OUT, and the
       first version cut at the LAST comment terminator in the whole span - which
       lands inside the declaration block whenever a rule carries a trailing note,
       so the selector came back empty and the fallback handed back
       comment-plus-selector. Sixteen rules then failed to join with the browser
       measurement and were filed under a heading that looked like an answer.
       Strip comments, then read.
       (And writing the terminator itself into this note closed it early on the
       first try - the same shape as the backtick, one line further down.) */
    const head = text.slice(0, brace).replace(/\/\*[\s\S]*?\*\//g, '').trim();
    if (/^@/.test(head)) {
      const cond = head.replace(/\s+/g, ' ');
      walk(text.slice(brace + 1, text.lastIndexOf('}')), page, media ? media + ' + ' + cond : cond);
      continue;
    }
    if (brace < 0) continue;                        // a bare declaration, not a rule
    const cls = [...new Set(classesOf(head))];
    const files = new Set();
    const ground = [];
    let unknown = 0;
    for (const c of cls) {
      const o = owner.get(c);
      if (o) { for (const f of o) { files.add(f); ground.push(ownerSel.get(c + '|' + f)); } }
      else unknown++;
    }
    rows.push({ page, sel: head.replace(/\s+/g, ' '), media, cls, unknown,
      files: [...files], ground: [...new Set(ground)],
      kind: !cls.length ? 'без класу' : unknown === cls.length ? 'локальне'
        : files.size === 1 ? 'один компонент' : unknown ? 'частково нове' : 'кілька компонентів' });
  }
};
for (const p of PAGES) {
  const src = readFileSync(join(ROOT, 'design', p + '.html'), 'utf8');
  const m = src.match(/<style>([\s\S]*?)<\/style>/);
  walk(m[1], p, null);
}

/* ------------------------------------------------- what each rule actually CHANGES

   THE SOURCE SAYS WHERE A RULE COULD GO; ONLY THE BROWSER SAYS WHAT IT DOES.
   `inert.mjs` already proved every one of these 498 changes something - anything
   that agreed with the system was inert and left in the 655. So the question here
   is not «does it differ» but «HOW», and the answer has to be the same reading
   the cascade gives, not the text of the declaration: a private `font-size: 15px`
   against a system `var(--fs-15)` is not a difference at all.

   THE MEASUREMENT IS A TOGGLE, NOT A RELOAD. Point the rule's selector at
   something that matches nothing, read the same elements again, put it back. What
   moves is exactly what that rule contributes over the system, per property, per
   element - 498 toggles inside 31 loads instead of 498 reloads.

   AND THE MUTATION THAT SANK `private-css.mjs` IS NOT THIS ONE, which has to be
   said plainly because it looks identical. That probe MUTATED A LOADED DOCUMENT
   TO DECIDE REMOVABILITY, and the page scripts had already reacted to what they
   saw, so its verdict disagreed with a fresh load. Nothing here decides
   removability - `inert.mjs` did that from loads, and this only ATTRIBUTES a
   difference for a person to read. A toggle cannot be wrong about which property
   a rule sets.

   GROUPED BY THE DIFFERENCE, WHICH IS THE ENTIRE POINT. Forty rules saying 15px
   where the system says 16px are one decision, and the shape of the work is
   invisible while they are counted one at a time. */
if (DIFF) {
  const { Conn, newSession, visit } = await import('./cdp.mjs');
  const { serve, chrome } = await import('./lib.mjs');

  const EXPR = expected => `(() => {
    const inline = [...document.styleSheets].filter(s => !s.href);
    let sheet = null;
    for (const s of inline) { try { if (s.cssRules.length === ${expected}) { sheet = s; break; } } catch (e) {} }
    if (!sheet) return JSON.stringify({ error: 'приватний блок не впізнано серед ' + inline.length + ' інлайнових' });
    const out = [];
    const scan = (rule, path) => {
      if (rule.selectorText === undefined) {
        if (rule.cssRules) for (let i = 0; i < rule.cssRules.length; i++) scan(rule.cssRules[i], path + '>' + i);
        return;
      }
      let els = [];
      try { els = [...document.querySelectorAll(rule.selectorText)]; } catch (e) { return; }
      const props = [];
      for (let i = 0; i < rule.style.length; i++) props.push(rule.style[i]);
      const sel = rule.selectorText;
      if (!els.length || !props.length) { out.push({ sel, path, matched: els.length, deltas: [] }); return; }
      const read = () => els.map(el => { const cs = getComputedStyle(el); return props.map(p => cs.getPropertyValue(p)); });
      const mine = read();
      try { rule.selectorText = '.__stack_none__'; } catch (e) { return; }
      const theirs = read();
      const inkOf = els.map(el => getComputedStyle(el).color);
      rule.selectorText = sel;
      /* IS THE SYSTEM SIDE A DECISION OR AN ABSENCE? That is the whole question
         behind this walk. When the value without the private rule is the CSS
         INITIAL value, the system is not overridden - it never said anything, and
         the private block is the only thing drawing that element. A gap is grown
         into the component; a conflict is adjudicated. Two different jobs.
         The initial of a border side colour is currentColor, so it is compared
         against the element's own computed colour rather than a constant.
         NO BACKTICK IN THIS COMMENT: it lives inside a template literal, and this
         is the SEVENTH time that has been learned in this repository. The gate
         that catches it is node --check over tools/*.mjs, which is why that now
         runs with the others. */
      const INIT = { 'border-top-width': '0px', 'border-right-width': '0px', 'border-bottom-width': '0px', 'border-left-width': '0px',
        'border-top-style': 'none', 'border-right-style': 'none', 'border-bottom-style': 'none', 'border-left-style': 'none',
        'border-top-left-radius': '0px', 'border-top-right-radius': '0px', 'border-bottom-right-radius': '0px', 'border-bottom-left-radius': '0px',
        'margin-top': '0px', 'margin-right': '0px', 'margin-bottom': '0px', 'margin-left': '0px',
        'padding-top': '0px', 'padding-right': '0px', 'padding-bottom': '0px', 'padding-left': '0px',
        'top': 'auto', 'right': 'auto', 'bottom': 'auto', 'left': 'auto',
        'row-gap': 'normal', 'column-gap': 'normal', 'display': 'block', 'position': 'static',
        'background-color': 'rgba(0, 0, 0, 0)', 'box-sizing': 'content-box', 'align-items': 'normal',
        'justify-content': 'normal', 'flex-direction': 'row', 'flex-wrap': 'nowrap', 'text-align': 'start',
        'white-space': 'normal', 'overflow-x': 'visible', 'overflow-y': 'visible', 'opacity': '1',
        'text-transform': 'none', 'letter-spacing': 'normal', 'text-decoration-line': 'none',
        'min-width': 'auto', 'min-height': 'auto', 'max-width': 'none', 'max-height': 'none',
        'flex-grow': '0', 'flex-shrink': '1', 'flex-basis': 'auto', 'transform': 'none', 'box-shadow': 'none' };
      const isInitial = (prop, val, ink) => /^border-(top|right|bottom|left)-color$/.test(prop)
        ? val === ink : INIT[prop] === val;
      const deltas = [];
      for (let e = 0; e < els.length; e++) for (let k = 0; k < props.length; k++)
        if (mine[e][k] !== theirs[e][k])
          deltas.push([props[k], theirs[e][k], mine[e][k], isInitial(props[k], theirs[e][k], inkOf[e]) ? 1 : 0]);
      out.push({ sel, path, matched: els.length, deltas });
    };
    for (let i = 0; i < sheet.cssRules.length; i++) scan(sheet.cssRules[i], String(i));
    return JSON.stringify({ rules: out });
  })()`;

  const srv = await serve();
  const l = await chrome('pdiff');
  const conn = await Conn.open(l.wsUrl);
  const group = new Map();          // "prop|system|private" -> { n, pages:Set, sels:Set }
  const ruleIndex = new Map();      // page||selector -> { page, sel, deltas }
  const noMatch = [];
  const failed = [];
  let measured = 0, changing = 0;

  for (const p of PAGES) {
    const src = readFileSync(join(ROOT, 'design', p + '.html'), 'utf8');
    const text = src.match(/<style>([\s\S]*?)<\/style>/)[1];
    const expected = topRules(text).length;
    /* BOTH WIDTHS, and the first run proved why. Measured at 390 only, 35 rules
       came back changing nothing at all - which contradicts `inert.mjs`, whose
       load-based verdict had already removed everything inert. The rules were
       inside `@media (min-width: ...)`: real at 1280 and dead at 390. A walk that
       reads one width does not describe this corpus, and it reports the flattering
       direction - fewer differences than there are. */
    const seen = new Set();
    for (const w of [390, 1280]) {
      const s = await newSession(conn);
      let res;
      try {
        res = JSON.parse(await visit(conn, s.sessionId, `${srv.base}/design/${p}.html`, w, 900, EXPR(expected), s.inflight));
      } finally { await s.close(); }
      if (res.error) { if (w === 390) failed.push(p + ': ' + res.error); continue; }
      for (const r of res.rules) {
        if (w === 390) measured++;
        if (!r.matched) { if (w === 390) noMatch.push(p + '  ' + r.sel); continue; }
        if (!r.deltas.length) continue;
        if (!seen.has(r.path)) { seen.add(r.path); changing++; }
        {
          const k = p + '||' + r.sel.replace(/\s+/g, '').toLowerCase();
          const prev = ruleIndex.get(k);
          if (prev) prev.deltas.push(...r.deltas);
          else ruleIndex.set(k, { page: p, sel: r.sel, deltas: [...r.deltas] });
        }
        for (const [prop, sys, mine, gap] of r.deltas) {
          const key = prop + ' | ' + sys + ' -> ' + mine;
          if (!group.has(key)) group.set(key, { n: 0, pages: new Set(), sels: new Set(), gap: 0 });
          const g = group.get(key);
          g.n++; g.pages.add(p); g.sels.add(r.sel); g.gap += gap;
        }
      }
    }
  }
  l.stop(); srv.stop();

  /* THE IDLE CONTROL OF THIS WALK: a private rule that matches NOTHING on its own
     page. `inert.mjs` removed 215 of those as clone residue, so the number here
     should be small - a large one means the sheet being read is not the one
     being counted. */
  if (failed.length) {
    console.log('\nПРИВАТНИЙ БЛОК НЕ ВПІЗНАНО (' + failed.length + ') - міряти нема чого:');
    for (const f of failed) console.log('  ' + f);
  }
  if (noMatch.length) {
    console.log('\nПРАВИЛО НІ З ЧИМ НЕ ЗБІГЛОСЬ (' + noMatch.length + '):');
    for (const f of noMatch.slice(0, 12)) console.log('  ' + f);
    if (noMatch.length > 12) console.log('  ... ще ' + (noMatch.length - 12));
  }

  /* ------------------------------------------------ pile 1: pure growth
     A rule whose EVERY difference is a gap is not an override at all - the system
     is silent on every property it sets, so moving it into the component adds
     behaviour where there was none rather than resolving a disagreement. That is
     the cheapest pile and the one to start from, and it is only knowable by
     joining the source classification (where the rule could live) with the
     browser measurement (what it actually does). Neither half knows it alone. */
  const norm = x => x.replace(/\s+/g, '').toLowerCase();
  const byKey = new Map();
  for (const r of rows) byKey.set(r.page + '||' + norm(r.sel), r);
  const pure = [], mixedRules = [];
  for (const [key, r] of ruleIndex) {
    if (!r.deltas.length) continue;
    const src = byKey.get(key);
    (r.deltas.every(d => d[3]) ? pure : mixedRules).push({ ...r, src });
  }
  /* THE JOIN HAS TO SAY WHEN IT FAILS. A rule measured in the browser that finds
     no row in the source classification is not «other», it is the instrument
     losing track of a rule, and 16 of them silently filed under a heading nobody
     would question is exactly the shape this stage keeps paying for. */
  const orphan = pure.filter(r => !r.src);
  if (orphan.length) {
    console.log('\nЗІСТАВИТИ З ДЖЕРЕЛОМ НЕ ВДАЛОСЬ (' + orphan.length + '):');
    for (const r of orphan.slice(0, 16)) console.log('  ' + r.page.padEnd(26) + r.sel);
  }
  const dest = new Map();
  for (const r of pure) {
    const d = r.src && r.src.kind === 'один компонент' ? r.src.files[0]
      : r.src ? r.src.kind : 'селектор не зіставився';
    if (!dest.has(d)) dest.set(d, []);
    dest.get(d).push(r);
  }
  console.log('\nКУПА 1 - ПРАВИЛА, У ЯКИХ КОЖНА РІЗНИЦЯ Є ДІРОЮ (' + pure.length + ' з ' +
    (pure.length + mixedRules.length) + '): система мовчить про все, що вони кажуть');
  for (const [d, list] of [...dest].sort((a, b) => b[1].length - a[1].length)) {
    console.log('  ' + String(list.length).padStart(3) + '  -> ' + d);
    if (d.endsWith('.css')) for (const r of list)
      console.log('        ' + r.page.padEnd(26) + r.sel + '   [' +
        [...new Set(r.deltas.map(x => x[0]))].join(' ') + ']');
  }

  const sorted = [...group].sort((a, b) => b[1].n - a[1].n);
  let gapN = 0, allN = 0;
  for (const [, g] of group) { gapN += g.gap; allN += g.n; }
  console.log('\nРІЗНИЦІ, ЗГРУПОВАНІ ЗА САМОЮ РІЗНИЦЕЮ (' + group.size + ' різних).');
  console.log('«діра» = без цього правила властивість має ПОЧАТКОВЕ значення, тобто система про неї не говорить взагалі.');
  for (const [key, g] of sorted.slice(0, 40))
    console.log('  ' + String(g.n).padStart(4) + ' x  ' + String(g.pages.size).padStart(2) + ' стор  ' +
      (g.gap === g.n ? 'ДІРА    ' : g.gap ? 'змішано ' : 'конфлікт') + '  ' + key);
  if (sorted.length > 40) console.log('  ... ще ' + (sorted.length - 40) + ' різниць');
  console.log('\nдіра проти конфлікту: ' + gapN + ' з ' + allN + ' спостережень (' +
    Math.round(100 * gapN / allN) + '%) - система про них мовчить, а не сперечається');

  const props = new Map();
  for (const [key, g] of group) {
    const prop = key.slice(0, key.indexOf(' | '));
    props.set(prop, (props.get(prop) || 0) + g.n);
  }
  console.log('\nЗА ВЛАСТИВІСТЮ:');
  for (const [prop, n] of [...props].sort((a, b) => b[1] - a[1]).slice(0, 20))
    console.log('  ' + String(n).padStart(4) + '  ' + prop);

  console.log('\n' + PAGES.length + ' сторінок · правил зміряно: ' + measured +
    ' · з них щось міняють: ' + changing + ' · різних різниць: ' + group.size +
    ' · різних властивостей: ' + props.size);
  TAIL();
  if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify([...group].map(([k, g]) =>
    ({ diff: k, n: g.n, pages: [...g.pages], sels: [...g.sels] })), null, 1));
  process.exit(0);
}

/* ---------------------------------------------------------------------- report */
const by = k => rows.reduce((a, r) => ((a[r[k]] = (a[r[k]] || 0) + 1), a), {});
const kinds = by('kind');

if (ONLY_LOCAL || !BY_PAGE) {
  const local = rows.filter(r => r.kind === 'локальне');
  /* HOW MANY SCREENS WEAR THE NAME decides what a local rule is: a class on one
     screen is a page's own furniture and a candidate for deletion; a class on
     several is a component the system never got. The count is taken over the
     GREY layer as well, because that is the whole corpus - `design/` holds 88
     screens of 142 and a name can be waiting for its colour. */
  const wear = new Map();
  const seen = [];
  for (const dir of ['design', 'wireframes']) {
    for (const f of readdirSync(join(ROOT, dir)).filter(x => x.endsWith('.html'))) {
      const s = readFileSync(join(ROOT, dir, f), 'utf8');
      seen.push([dir + '/' + f, s]);
    }
  }
  for (const r of local) for (const c of r.cls) {
    if (wear.has(c)) continue;
    const re = new RegExp('class="[^"]*\\b' + c.replace(/[-]/g, '\\-') + '\\b[^"]*"');
    wear.set(c, seen.filter(([, s]) => re.test(s)).length);
  }
  const byClass = new Map();
  for (const r of local) for (const c of r.cls) {
    if (!byClass.has(c)) byClass.set(c, { rules: 0, pages: new Set(), wear: wear.get(c) || 0 });
    const e = byClass.get(c); e.rules++; e.pages.add(r.page);
  }
  console.log('\nЛОКАЛЬНІ ІМЕНА - система їх не оголошує ніде (' + local.length + ' правил, ' +
    byClass.size + ' класів):');
  const sorted = [...byClass].sort((a, b) => b[1].wear - a[1].wear || b[1].rules - a[1].rules);
  for (const [c, e] of sorted.slice(0, ONLY_LOCAL ? 500 : 30))
    console.log('  .' + c.padEnd(22) + String(e.rules).padStart(3) + ' правил · ' +
      String(e.pages.size).padStart(2) + ' сторінок блоку · носять ' + String(e.wear).padStart(3) + ' екранів корпусу');
  if (!ONLY_LOCAL && sorted.length > 30) console.log('  ... ще ' + (sorted.length - 30) + ' класів, показати: --local');
}

if (BY_PAGE) {
  console.log('\nЗА СТОРІНКАМИ:');
  for (const p of PAGES) {
    const mine = rows.filter(r => r.page === p);
    if (!mine.length) continue;
    const k = mine.reduce((a, r) => ((a[r.kind] = (a[r.kind] || 0) + 1), a), {});
    console.log('  ' + p.padEnd(28) + String(mine.length).padStart(3) + '  ' +
      Object.entries(k).map(([n, v]) => n + ' ' + v).join(' · '));
  }
} else {
  const dest = new Map();
  for (const r of rows) if (r.kind === 'один компонент') {
    const f = r.files[0];
    dest.set(f, (dest.get(f) || 0) + 1);
  }
  console.log('\nМАЮТЬ ОДИН ДІМ У СИСТЕМІ (' + (kinds['один компонент'] || 0) + ' правил):');
  for (const [f, n] of [...dest].sort((a, b) => b[1] - a[1])) {
    console.log('  ' + String(n).padStart(3) + '  -> ' + f);
    /* the ground under the verdict: which selector in that file put the class
       there. «one home» is a claim about a NAME, and a name can be shared by two
       different objects - see the header. */
    const mine = rows.filter(r => r.kind === 'один компонент' && r.files[0] === f);
    for (const g of [...new Set(mine.flatMap(r => r.ground || []))].slice(0, 4))
      console.log('        бо ' + f + ' оголошує  ' + g);
  }
}

console.log('\n' + PAGES.length + ' сторінок · ' + rows.length + ' правил · ' +
  Object.entries(kinds).map(([k, v]) => k + ': ' + v).join(' · '));
TAIL();
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(rows, null, 1));
