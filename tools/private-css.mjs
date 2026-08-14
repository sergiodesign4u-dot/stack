/* tools/private-css.mjs - WHICH OF THE PRIVATE RULES ACTUALLY DRAW ANYTHING.

   Step 6's list 2 counted 1 154 rules in the private <style> blocks of 31
   coloured screens, 886 of them touching a class the system already owns. That
   count is a source count: it says the rule EXISTS, not that it CHANGES
   anything. A rule that repeats what the component already declares is a
   deletion nobody has to think about; a rule that contradicts it is a decision.
   Moving both by hand, or moving the first kind as if it were the second, is how
   a migration of this size goes wrong.

   THE TEST IS THE ONLY ONE THAT CANNOT BE ARGUED WITH: delete the rule and ask
   the browser whether anything moved.

     1. for each rule in the private block, take its OWN selector and its OWN
        declared properties
     2. read those properties on the elements that selector matches
     3. sheet.deleteRule(k)
     4. read them again
     5. sheet.insertRule(text, k) - put it back
     6. identical means the rule draws NOTHING and is a free deletion

   THE FIRST VERSION DISABLED THE WHOLE SHEET AT ONCE and then asked which
   selectors matched something that had moved. That attributes rule B's effect
   to rule A whenever both touch the same element, and on these screens nearly
   everything does: it answered «77 of 78 draw» and would have answered that
   about any block at all. Per rule, the same screen answers 5 of 78.

   WHAT THIS IS NOT. It does not say a drawing rule is wrong: a screen is allowed
   to differ from its component, and step 6's job is to decide which differences
   are decisions and which are drift. It says only which rules can be deleted
   with no argument at all, which is the half that needs no decision.

   ONE LIMIT, NAMED: a rule that draws only in a state nobody opened, or only at
   a width not walked, reads as inert here. The walk therefore opens what
   census.mjs opens and runs at both widths - and anything reached by a SCROLL
   is still out of reach, the same limit census.mjs carries.

     node tools/private-css.mjs                 every coloured screen
     node tools/private-css.mjs coach-session-oos    one of them
     node tools/private-css.mjs --json out.json */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, subject, ROOT, ARG_OPENERS, NAMES, sweepOf, safeOpeners } from './lib.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const CLOSED = argv.includes('--closed');
const OUT = argv.includes('--json') ? argv[argv.indexOf('--json') + 1] : null;
const WIDTHS = [390, 1280];
const PAGES = subject(argv.filter(a => a !== OUT && !a.startsWith('--'))).filter(p =>
  !p.startsWith('kit/') && !p.startsWith('concept/'));

/* the pages that have a private block at all - asked of the file, because a page
   without one has nothing to measure and loading it twice proves nothing */
const withBlock = PAGES.filter(p => {
  const t = readFileSync(join(ROOT, 'design', p + '.html'), 'utf8');
  const m = t.match(/<style>([\s\S]*?)<\/style>/);
  return m && m[1].split('\n').length > 3;
});

/* No backtick below this line and above the closing quote. Two files in this
   directory carry that rule and both have been broken by ignoring it. */
const M = `(() => {
  const own = [].slice.call(document.styleSheets).filter(s => {
    try { return s.ownerNode && s.ownerNode.tagName === 'STYLE' && !s.href; }
    catch (e) { return false; }
  });
  if (!own.length) return JSON.stringify({ none: true });

  /* every property the private block declares, and every selector in it.
     INDEXED, NOT for-of, and the catch below no longer eats the reason: the
     first version walked the rule list with for-of inside a try that returned
     nothing on failure, and the tool reported «0 rules» for a block the browser
     had just said holds 77. A checker that answers zero when it means «I could
     not look» is the same instrument fault this step has already met four
     times, and the swallowing catch is what made it silent. */
  const props = new Set(), sels = [];
  let why = '';
  const walk = rules => {
    for (let k = 0; k < rules.length; k++) {
      const r = rules[k];
      if (r.cssRules && r.cssRules.length) { walk(r.cssRules); continue; }
      if (!r.style) continue;
      for (let i = 0; i < r.style.length; i++) props.add(r.style[i]);
      if (r.selectorText) sels.push(r.selectorText);
    }
  };
  for (let i = 0; i < own.length; i++) {
    try { walk(own[i].cssRules); } catch (e) { why += e.message + '; '; }
  }
  const P = [...props];
  if (!P.length) return JSON.stringify({ blind: true, why: why || 'no declarations found' });

  /* CUMULATIVE, NOT ONE-AT-A-TIME - and the second version of this probe is why.
     Testing each rule alone, with every other rule still in place, answers a
     question nobody asked: «is this rule redundant GIVEN all its neighbours».
     Inertness is not additive. On coach-clients-cap the private block held both
     .acc-nav and .acc-link[aria-current="page"]; each alone changed nothing, and
     removing BOTH turned the mobile rail into the chip rail whose current chip
     account-shell.css paints orange under @media (max-width: 959px). The cut
     shipped, tree-diff caught it on five pages, and the whole set was reverted.

     So the set is built greedily and against a FULL-DOCUMENT snapshot: delete a
     candidate ON TOP of everything already deleted, compare the whole page, and
     put it back the moment anything moves. Full document, because a rule can
     only restyle what it matches but LAYOUT travels - a parent grows when a
     child does, and the parent is not in the selector.

     A rule matching zero elements is deleted without a snapshot: it cannot
     affect anything, and that is the one case where isolation is enough. */
  const shot = () => {
    const els = document.querySelectorAll('*');
    let out = '';
    for (let i = 0; i < els.length; i++) {
      const cs = getComputedStyle(els[i]);
      for (let j = 0; j < P.length; j++) out += cs.getPropertyValue(P[j]) + '|';
    }
    return out;
  };

  const base = shot();
  const live = [], noMatch = [], redundant = [], unreadable = [];
  for (let i = 0; i < own.length; i++) {
    const sheet = own[i];
    let n = 0; try { n = sheet.cssRules.length; } catch (e) { continue; }
    for (let k = n - 1; k >= 0; k--) {          /* backwards: indices below stay put */
      const r = sheet.cssRules[k];
      if (!r.style || !r.selectorText) continue;
      if (!r.style.length) continue;
      let els; try { els = document.querySelectorAll(r.selectorText); }
      catch (e) { unreadable.push(r.selectorText); continue; }
      const text = r.cssText;
      if (!els.length) { sheet.deleteRule(k); noMatch.push(r.selectorText); continue; }
      sheet.deleteRule(k);
      if (shot() === base) { redundant.push(r.selectorText); }
      else { sheet.insertRule(text, k); live.push(r.selectorText); }
    }
  }

  return JSON.stringify({
    props: P.length, selectors: sels.length,
    live: live, noMatch: noMatch, redundant: redundant, unreadable: unreadable
  });
})()`;


/* PROBE B - VALIDATE A SET, not a rule. Probe A walks one width and returns a
   set that is safe AT THAT WIDTH. Two widths give two sets, and their UNION was
   never tested anywhere: at 390 the pass may drop {A,B}, at 1280 {A,C}, and
   {A,B,C} is a configuration no browser was ever asked about. That is exactly
   how the first cut shipped and how tree-diff caught it on five pages.

   So the set found at one width is re-offered at the other: delete all of it,
   compare the whole document, and if anything moved, hand rules back one at a
   time - last first - until the page is still. What survives both widths is the
   only thing that gets written. */
const VALIDATE = list => `(() => {
  const own = [].slice.call(document.styleSheets).filter(s => {
    try { return s.ownerNode && s.ownerNode.tagName === 'STYLE' && !s.href; }
    catch (e) { return false; }
  });
  const want = new Set(${JSON.stringify(list)});
  const props = new Set();
  for (let i = 0; i < own.length; i++) {
    try { for (let k = 0; k < own[i].cssRules.length; k++) {
      const r = own[i].cssRules[k];
      if (r.style) for (let j = 0; j < r.style.length; j++) props.add(r.style[j]);
    } } catch (e) {}
  }
  const P = [...props];
  const shot = () => {
    const els = document.querySelectorAll('*');
    let out = '';
    for (let i = 0; i < els.length; i++) {
      const cs = getComputedStyle(els[i]);
      for (let j = 0; j < P.length; j++) out += cs.getPropertyValue(P[j]) + '|';
    }
    return out;
  };
  const base = shot();
  const removed = [];
  for (let i = 0; i < own.length; i++) {
    const sheet = own[i];
    let n = 0; try { n = sheet.cssRules.length; } catch (e) { continue; }
    for (let k = n - 1; k >= 0; k--) {
      const r = sheet.cssRules[k];
      if (!r.selectorText || !want.has(r.selectorText)) continue;
      removed.push({ sheet: i, k: k, sel: r.selectorText, text: r.cssText });
      sheet.deleteRule(k);
    }
  }
  const back = [];
  while (removed.length && shot() !== base) {
    const last = removed.pop();
    own[last.sheet].insertRule(last.text, last.k);
    back.push(last.sel);
  }
  return JSON.stringify({ back: back, kept: removed.map(x => x.sel) });
})()`;

const srv = await serve();
const l = await chrome('private');
const conn = await Conn.open(l.wsUrl);

const rows = [];
let rejected = 0;
const safeFor = new Map();
for (const p of withBlock) {
  const url = `${srv.base}/design/${p}.html`;
  const live = new Set(), noMatch = new Set(), redundant = new Set();
  let sels = 0, moved = 0;
  for (const w of WIDTHS) {
    const s = await newSession(conn);
    try {
      await visit(conn, s.sessionId, url, w, 900, '1', s.inflight);
      if (!CLOSED && !safeFor.has(p)) {
        const nm = await conn.send('Runtime.evaluate', { expression: NAMES, returnByValue: true }, s.sessionId);
        const calls = JSON.parse(nm.result.value).map(n => n + '()').concat(ARG_OPENERS);
        safeFor.set(p, await safeOpeners({ conn, newSession, visit }, url, calls));
        await visit(conn, s.sessionId, url, w, 900, '1', s.inflight);
      }
      if (!CLOSED) {
        await conn.send('Runtime.evaluate', { expression: sweepOf(safeFor.get(p)), returnByValue: true }, s.sessionId);
        await new Promise(r => setTimeout(r, 140));
      }
      const res = await conn.send('Runtime.evaluate', { expression: M, returnByValue: true }, s.sessionId);
      if (res.exceptionDetails) throw new Error(res.exceptionDetails.exception
        ? res.exceptionDetails.exception.description.split('\n')[0] : 'probe threw');
      const d = JSON.parse(res.result.value);
      if (d.blind) throw new Error('probe could not read the block: ' + d.why);
      if (!d.none) {
        sels = Math.max(sels, d.selectors);
        d.live.forEach(x => live.add(x));
        (d.noMatch || []).forEach(x => noMatch.add(x));
        (d.redundant || []).forEach(x => redundant.add(x));
        (d.unreadable || []).forEach(x => live.add(x));
      }
    } catch (e) { console.log('\n  ' + p + ' @' + w + ': ' + e.message); }
    await conn.send('Target.closeTarget', { targetId: s.targetId });
  }
  /* a selector that draws at ONE width draws, full stop - and one that matched
     something at either width is not a no-match either */
  for (const x of live) { noMatch.delete(x); redundant.delete(x); }
  for (const x of redundant) noMatch.delete(x);

  /* AND THE UNION IS OFFERED BACK TO BOTH WIDTHS, because neither pass has seen
     it. Anything the validation hands back leaves the set for good. */
  let set = [...noMatch, ...redundant];
  for (const w of WIDTHS) {
    if (!set.length) break;
    const s2 = await newSession(conn);
    try {
      await visit(conn, s2.sessionId, url, w, 900, '1', s2.inflight);
      const res = await conn.send('Runtime.evaluate',
        { expression: VALIDATE(set), returnByValue: true }, s2.sessionId);
      const d = JSON.parse(res.result.value);
      if (d.back.length) {
        for (const b of d.back) { noMatch.delete(b); redundant.delete(b); }
        set = [...noMatch, ...redundant];
        rejected += d.back.length;
      }
    } catch (e) { console.log('\n  ' + p + ' звірка @' + w + ': ' + e.message); }
    await conn.send('Target.closeTarget', { targetId: s2.targetId });
  }
  rows.push({ page: p, selectors: sels, live: live.size,
              noMatch: [...noMatch], redundant: [...redundant] });
  process.stdout.write('.');
}
l.stop(); srv.stop();

rows.sort((a, b) => (b.noMatch.length + b.redundant.length) - (a.noMatch.length + a.redundant.length));
const tot = rows.reduce((s, r) => s + r.selectors, 0);
const nm = rows.reduce((s, r) => s + r.noMatch.length, 0);
const rd = rows.reduce((s, r) => s + r.redundant.length, 0);
console.log('\n\n===== ПРИВАТНІ ПРАВИЛА: ЩО З НИХ МАЛЮЄ =====');
console.log('  екранів із приватним блоком        ' + String(withBlock.length).padStart(6));
console.log('  правил у них разом                 ' + String(tot).padStart(6));
console.log('  МАЛЮЮТЬ                            ' + String(tot - nm - rd).padStart(6));
console.log('  НІЧОГО НЕ ЛОВЛЯТЬ на своїй сторінці' + String(nm).padStart(6) + '   (залишок від клону)');
console.log('  ЗАЙВІ - ловлять, але нічого не міняють' + String(rd).padStart(4) + '   (копія того, що вже каже система)');
if (rejected) console.log('  повернуто звіркою набору           ' + String(rejected).padStart(6) + '   (поодинці безпечні, разом ні)');
console.log('\n  за екраном (не ловлять / зайві / усіх):');
for (const r of rows) console.log('  ' + r.page.padEnd(26) +
  String(r.noMatch.length).padStart(4) + ' /' + String(r.redundant.length).padStart(4) +
  ' /' + String(r.selectors).padStart(5));
if (OUT) { writeFileSync(OUT, JSON.stringify(rows, null, 1)); console.log('\nсирий запис: ' + OUT); }

/* --apply - CUT THE RULES THE MEASUREMENT JUST CLEARED, and nothing else.
   Both kinds are safe by construction: one matches no element on its own page,
   the other matches and moves no value. Only TOP-LEVEL rules are touched -
   everything inside @media is blanked before the scan and put back untouched,
   because that is where the responsive behaviour lives and stage 10 owns it.
   Verified before writing, on all 31 pages: each of the 262 selectors occurs
   exactly ONCE at top level in its own block, so «delete by selector» has no
   second candidate to pick wrong. */
if (process.argv.includes('--apply')) {
  let cut = 0, pages = 0;
  for (const r of rows) {
    const want = new Set([...r.noMatch, ...r.redundant].map(x => x.replace(/\s+/g, ' ')));
    if (!want.size) continue;
    const file = join(ROOT, 'design', r.page + '.html');
    const html = readFileSync(file, 'utf8');
    const m = html.match(/<style>([\s\S]*?)<\/style>/);
    if (!m) continue;
    const css = m[1];
    /* mask comments and @media so the scanner sees only top-level rules */
    const mask = css.replace(/\/\*[\s\S]*?\*\//g, c => c.replace(/[^\n]/g, ' '))
      .replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, c => c.replace(/[^\n]/g, ' '));
    const keep = [];
    let i = 0, n = 0;
    const re = /([^{}]*)\{([^{}]*)\}/g;
    let mm;
    while ((mm = re.exec(mask))) {
      const sel = mm[1].trim().replace(/\s+/g, ' ');
      if (!sel) continue;
      if (!want.has(sel)) continue;
      keep.push([mm.index + mm[1].length - mm[1].trimStart().length + (mm[1].length - mm[1].trimStart().length ? 0 : 0), mm.index, re.lastIndex]);
      n++;
    }
    if (!n) continue;
    /* rebuild from the ORIGINAL css using the offsets found in the mask -
       the mask is the same length as the source by construction */
    let out = '', prev = 0;
    for (const [, st, en] of keep) {
      out += css.slice(prev, st);
      prev = en;
    }
    out += css.slice(prev);
    out = out.replace(/\n{3,}/g, '\n\n');
    const note = '\n/* ' + n + ' правил вирізано кроком 6 (tools/private-css.mjs): ' +
      r.noMatch.length + ' не ловили на цій сторінці жодного елемента - залишок від клону, ' +
      r.redundant.length + ' ловили й не міняли жодного значення - копія того, що вже каже система. ' +
      'Вимір: видалити правило й перечитати ті самі властивості на тих самих елементах. ' +
      'Правила всередині @media не чіпані. */\n';
    writeFileSync(file, html.replace(m[0], '<style>' + note + out + '</style>'));
    cut += n; pages++;
  }
  console.log('\nВИРІЗАНО: ' + cut + ' правил на ' + pages + ' сторінках');
}
