/* tools/btn-rank.mjs - A CONTROL WEARING ONLY `btn` RENDERS AS BARE TEXT.

   `button.css` has no `.btn` rule at all. THE FINISH IS THE RANK: `btn--accent`,
   `btn--outline`, `btn--ghost`, `btn--text`, plus a size. An element that arrives
   carrying `btn` and nothing else gets no background, no border, no padding and
   no focus ring - it is invisible furniture, and it still reads as a link to a
   screen reader, so nothing but a pair of eyes on the page catches it.

   `clone-to-colour.mjs` ranks the buttons it clones, and its rule matched
   `class="btn"` and `class="btn dark"` as WHOLE STRINGS. Every control carrying a
   utility class beside them slipped through: `btn qa-add`, `btn cs-save`,
   `btn dark cs-go`, 36 of them across 13 screens. Same family as the 8.13
   lookahead that file already records - a pattern tight enough to be right about
   the case in front of it and wrong about the set.

   THE RANK IS READ OFF THE BASE SCREEN, NEVER CHOSEN HERE, and that is the whole
   design. The grey layer marks a primary action `dark`, and the coloured base
   screens did NOT all keep it: `cs-go`, `co-new` and `cgo-btn` are `dark` in
   `wireframes/` and `btn--outline` in the coloured base, because the review of
   the coach flow at 7.95 and 8.7 decided there is ONE accent fill per screen and
   these were not it. A state screen must not reopen a decision its base already
   took, so the rank is copied from the base and the `dark` token is left where it
   lies - removing those is a sweep of its own.

   Which screen is whose base is written in the screen: `wfBar('<base>.html',
   '<state>')`, the same reading `scope.mjs` uses. The base control is found by a
   SHARED UTILITY CLASS and only when the match is unique; zero matches or two
   are reported rather than guessed.

     node tools/btn-rank.mjs            report
     node tools/btn-rank.mjs --apply    and write the ranks in

   Exit is non-zero while any control is still unranked, so it composes with the
   rest of the gate. */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './lib.mjs';

const APPLY = process.argv.includes('--apply');
const DIR = join(ROOT, 'design');

const NAMES = readdirSync(DIR).filter(f => f.endsWith('.html')).map(f => f.slice(0, -5));
const SRC = Object.fromEntries(NAMES.map(n => [n, readFileSync(join(DIR, n + '.html'), 'utf8')]));

const toks = a => a.split(/\s+/).filter(Boolean);
const ranked = t => t.some(x => x.startsWith('btn--'));
const isBtn = t => t.includes('btn') && !ranked(t);
/* `dark` is the grey layer's word for «primary» and sits on dozens of controls,
   so it identifies nothing. `btn` is the thing being looked for. */
const utility = t => t.filter(x => x !== 'btn' && x !== 'dark');

const attrs = src => [...src.matchAll(/class="([^"]*)"/g)];
const base = p => ((SRC[p] || '').match(/wfBar\(\s*'([^']+)\.html'/) || [, null])[1];

/* THE TWO THE PRODUCT CANNOT ANSWER, decided out loud, each with its neighbour.
   A map like this is the thing this repository normally bans, so it carries the
   ban's own remedy: every entry is checked against the file below, and an entry
   that has stopped matching FAILS THE RUN. An exception nobody can see excludes
   whatever it likes. */
const DECIDED = [
  { page: 'cart-coach-empty', has: 'cont', add: ['btn--outline', 'btn--s'],
    why: 'the secondary beside `btn--accent btn--s btn dark`; the private rule ' +
         '`.cd-empty .btn.cont{ border-color: --line-strong }` is the grey layer saying OUTLINE, ' +
         'and the buyer\'s own `cart-empty` ranks its secondary the same way' },
  { page: 'coach-session-priceblock', has: 'blocked', add: ['btn--accent', 'btn--l'],
    why: 'the bar action of the base is `btn--accent btn--l btn dark`, and this is that same ' +
         'action DISABLED: the element already carries aria-disabled="true", which button.css ' +
         'answers for every rank' },
];

const rows = [];
for (const p of NAMES) {
  for (const m of attrs(SRC[p])) {
    const t = toks(m[1]);
    if (!isBtn(t)) continue;
    const u = utility(t);
    const b = base(p);

    /* THE PRODUCT ANSWERS FIRST AND THE DECISION ONLY FILLS WHAT IT CANNOT.
       The first version asked the map first, and its `blocked` entry then ate
       `btn cs-go blocked` as well - handing the bottom bar's accent to the
       sidebar's outline, because both wear the word. A fallback that runs before
       the evidence is not a fallback. */
    let add = null, from = null;
    if (b && b !== p && SRC[b]) {
      /* COLLAPSE ON EQUALITY, NOT ON COUNT. Three identical `btn qa-add` rows in
         the base are one answer repeated, not three answers in conflict, and the
         first version called all 16 of them ambiguous. Take the set first, then
         ask whether it holds one thing. */
      const cand = [...new Set(attrs(SRC[b]).map(x => toks(x[1]))
        .filter(bt => ranked(bt) && utility(bt).some(x => u.includes(x)))
        .map(bt => bt.join(' ')))];
      if (cand.length === 1) { add = toks(cand[0]).filter(x => !t.includes(x)); from = b; }
      else if (cand.length > 1) from = 'у базі ' + cand.length + ' різних відповідей';
      else from = 'у базі збігів немає';
    } else from = b === p ? 'це сама база' : 'бази немає';

    if (!add) {
      const d = DECIDED.find(x => x.page === p && t.includes(x.has));
      if (d) { add = d.add; from = 'рішення'; d.hit = (d.hit || 0) + 1; }
    }

    rows.push({ p, was: m[1], t, add, from,
      now: add ? [...add, ...t].join(' ') : null });
  }
}

/* THE IDLE CONTROL IS «IS THE DECISION STILL VISIBLE», NOT «DID IT FIRE».
   The first version failed an entry that stopped firing - which is what happens
   to EVERY entry the moment --apply does its work, so the gate would have gone
   red forever one run after it went green. What has to stay true is the record:
   the control is still on that page, and it still wears the rank the decision
   gave it. Overwrite the rank by hand and this says so. */
/* SOME, not every: `blocked` is worn twice on `coach-session-priceblock` - the
   sidebar's `cs-go blocked`, which the base answered with `btn--outline`, and the
   bar's, which is this decision. A token names a family; the rank names the one. */
const stale = DECIDED.filter(d => !attrs(SRC[d.page] || '').map(x => toks(x[1]))
  .some(t => t.includes('btn') && t.includes(d.has) && d.add.every(a => t.includes(a))));
if (stale.length) {
  console.log('РІШЕННЯ, ЯКОГО БІЛЬШЕ НЕ ВИДНО В ПРОДУКТІ (' + stale.length + '):');
  for (const d of stale) console.log('  ' + d.page + ' .' + d.has + ' -> ' + d.add.join(' '));
}
const idle = stale;

const done = rows.filter(r => r.add), open = rows.filter(r => !r.add);
if (done.length) {
  console.log('\nРАНГ ЧИТАЄТЬСЯ З БАЗИ (' + done.length + '):');
  for (const r of done)
    console.log('  ' + r.p.padEnd(28) + '"' + r.was + '"' + ' '.repeat(Math.max(1, 24 - r.was.length)) +
      '-> "' + r.now + '"   ' + r.from);
}
if (open.length) {
  console.log('\nБЕЗ РАНГУ Й БЕЗ ВІДПОВІДІ (' + open.length + '):');
  for (const r of open) console.log('  ' + r.p.padEnd(28) + '"' + r.was + '"   ' + r.from);
}

if (APPLY && done.length) {
  let wrote = 0;
  for (const p of new Set(done.map(r => r.p))) {
    let s = SRC[p];
    for (const r of done.filter(x => x.p === p))
      s = s.split('class="' + r.was + '"').join('class="' + r.now + '"');
    writeFileSync(join(DIR, p + '.html'), s);
    wrote++;
  }
  console.log('\nпереписано ' + done.length + ' контролів на ' + wrote + ' сторінках');
}

console.log('\n' + NAMES.length + ' сторінок · без рангу: ' + rows.length +
  ' · читається з бази: ' + done.length + ' · без відповіді: ' + open.length);
process.exit(open.length || idle.length ? 1 : 0);
