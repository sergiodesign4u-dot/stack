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

/* ---------------------------------------------------------------- the dead `dark`

   `dark` IS THE GREY LAYER'S WORD FOR «PRIMARY», AND IN COLOUR IT PAINTS NOTHING.
   `wireframes/_wf.css:583` declares `.btn.dark{ background: var(--dark) }`; no
   stylesheet under `design/` declares `.dark` at all - the three mentions in
   `tokens.css`, `button.css` and `filter-sheet.css` are comments recording that
   it used to matter, and `design/kit/_page.css` has `.kp-demo.dark`, which is the
   stand's own demo canvas and not this class on a product control.

   IT IS INPUT TO THE TRANSFORM, NOT OUTPUT. `clone-to-colour.mjs` reads `dark`
   to decide whether a cloned control starts as `btn--accent` or `btn--outline`,
   and then used to carry it through into the result, where it means nothing. The
   token is dropped there now, so a fresh clone never produces one, and this sweep
   is what clears the ones already written - the file said above that «removing
   those is a sweep of its own», and this is it.

   THE GUARD IS WHAT MAKES IT SAFE, and it is the whole reason this is not a
   `sed`. A `dark` is only dead once the RANK has replaced it: the element carries
   a `btn--*`. Anything else wearing the word is reported and left alone, because
   a word can be reused, and a sweep that cannot say «not this one» is a sweep
   that will one day take a live class with it. */
/* IT RUNS AFTER THE RANKS ARE WRITTEN, AND THE ORDER IS LOAD-BEARING. A control
   arriving as `btn dark cs-go` is unranked, so this sweep must not see it until
   the rank has been added - otherwise one `--apply` ranks it and leaves the now
   dead `dark` behind, and the tool needs a second run to converge. Reading the
   sweep off the UPDATED sources makes one run enough. */
const darkSweep = () => {
  const rows = [], keep = [];
  for (const p of NAMES) {
    for (const m of attrs(SRC[p])) {
      const t = toks(m[1]);
      if (!t.includes('dark')) continue;
      if (ranked(t)) rows.push({ p, was: m[1], now: t.filter(x => x !== 'dark').join(' ') });
      else keep.push({ p, was: m[1] });
    }
  }
  return { rows, keep };
};

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
    SRC[p] = s;
    writeFileSync(join(DIR, p + '.html'), s);
    wrote++;
  }
  console.log('\nпереписано ' + done.length + ' контролів на ' + wrote + ' сторінках');
}

const dark = darkSweep();
if (dark.keep.length) {
  console.log('\n`dark` НЕ НА КНОПЦІ З РАНГОМ (' + dark.keep.length + ') - не чіпаю, це може бути живе:');
  for (const r of dark.keep) console.log('  ' + r.p.padEnd(28) + '"' + r.was + '"');
}
let darkLeft = dark.rows.length;
if (dark.rows.length) {
  const pages = new Set(dark.rows.map(r => r.p));
  console.log('\nМЕРТВИЙ `dark` (' + dark.rows.length + ' на ' + pages.size + ' сторінках), ранг уже його заступив');
  if (APPLY) {
    for (const p of pages) {
      let s = SRC[p];
      for (const r of dark.rows.filter(x => x.p === p))
        s = s.split('class="' + r.was + '"').join('class="' + r.now + '"');
      SRC[p] = s;
      writeFileSync(join(DIR, p + '.html'), s);
    }
    console.log('знято ' + dark.rows.length + ' на ' + pages.size + ' сторінках');
    /* the count that matters is what is LEFT, not what fired - the same lesson
       the DECIDED control above already paid for */
    darkLeft = darkSweep().rows.length;
  }
}

/* ---------------------------------------------------- THE RANK THAT DISAGREES
   Step 8.31, and it is this tool's own blind spot one variant deeper. Everything
   above asks «is there a rank?». It never asked «is it the BASE's rank?», so a
   control wearing the wrong size passed every run in silence.

   What that cost, measured at 390: the sticky bar's action on the coach ordering
   session - «У кошик →», the one act the whole flow leads to - is
   `btn--accent btn--l btn` on the base, 64.00 tall, and `btn--accent btn--s btn`
   on SIX of its state screens, 40.00 tall. Under the 44px touch floor, on the
   primary audience's daily screen, on six screens at once. The tool had already
   decided this exact control once, by hand, in DECIDED - `coach-session-priceblock`
   `.blocked` takes «the bar action of the base» - and could not see that its six
   neighbours were asking the same question.

   THE TEST IS THE SAME ONE THE RANKING ABOVE USES: match by utility class against
   the base, and act only when the base holds ONE answer. What is added is that the
   control may already be ranked - and then the disagreement is the finding.
   A control the base does not carry at all is not reported: a state has controls a
   base does not have, and that is what a state IS.

   AND THE FIRST WRITING OF IT FOUND NOTHING, WHICH IS THE INTERESTING PART. The
   control that prompted it - the session bar's «У кошик →» - wears
   `btn--accent btn--s btn` and NOTHING ELSE: no utility class at all, because what
   identifies it is the block it sits in, `.cs-bar`. A tool that reads class
   attributes out of source has no parents, so it reported 0 and the defect stood.
   The second key is the DESTINATION. `<a href="cart-coach.html">` is what that
   control is: the same flow, going to the same place, twice, at two sizes. Where a
   control has no class of its own, its href is the only thing about it that is
   still the same fact on the base and on the state.
   WHAT THIS STILL CANNOT SEE, said rather than papered over: a control with
   neither a utility class nor an href - a `<button>` identified only by its
   container. That one needs a browser and a parent, and it is not guessed at from
   here. */
const RANKS = new Set(['btn--accent', 'btn--outline', 'btn--ghost', 'btn--text']);
const SIZES = new Set(['btn--s', 'btn--l', 'btn--icon', 'btn--full']);
const rankOf = t => t.filter(x => RANKS.has(x) || SIZES.has(x)).sort().join(' ');

const disagree = [];
for (const p of NAMES) {
  const b = base(p);
  if (!b || b === p || !SRC[b]) continue;
  for (const m of attrs(SRC[p])) {
    const t = toks(m[1]);
    if (!ranked(t)) continue;                       // the unranked are the section above
    const u = utility(t).filter(x => !RANKS.has(x) && !SIZES.has(x));
    let cand;
    if (u.length) {
      cand = [...new Set(attrs(SRC[b]).map(x => toks(x[1]))
        .filter(bt => ranked(bt) && utility(bt).filter(x => !RANKS.has(x) && !SIZES.has(x)).some(x => u.includes(x)))
        .map(bt => rankOf(bt)))];
    } else {
      /* no class of its own - ask the destination. `m.index` is where the class
         attribute sits, and the href of the same tag is within a short reach of it. */
      const near = SRC[p].slice(Math.max(0, m.index - 120), m.index + 200);
      const href = (near.match(/href="([^"]+)"/) || [])[1];
      if (!href) continue;
      /* AND THE DESTINATION ALONE IS NOT THE CONTROL. First writing matched on
         href only and reported `coach-client-empty` - «＋ Нова сесія» to
         coach-session.html - against `coach-client`'s. Same words, same
         destination, and NOT the same control: the base's stands alone in
         `.cc-cta` at the default size, the state's sits in an empty state's
         `.eact`, where `btn--s` is what empty-state.css's own demos write. The
         same destination in two different containers is two controls, and writing
         one onto the other would have shrunk a standalone CTA into a row control.
         So the container has to agree too - the nearest class attribute before
         the control, which for the case this section exists for is `cs-bar` on
         both sides. It is a source-level stand-in for a parent, and it is named
         as one: a control whose real parent carries no class is invisible to it. */
      const holder = t2 => { const a = [...t2.matchAll(/class="([^"]*)"/g)]; return a.length > 1 ? a[a.length - 2][1] : null; };
      const mine = holder(SRC[p].slice(Math.max(0, m.index - 400), m.index + 8));
      if (!mine) continue;
      /* THE SLOT FIRST, THE DESTINATION ONLY AS A TIEBREAK - and that ordering is
         the difference between finding five of six and finding six. The session
         bar's action on `coach-session-empty` goes to `coach-session-addclient`
         rather than to the cart, because an empty session has nothing to send;
         it is the SAME SLOT doing a different job, and a destination key cannot
         see that. What a slot is worth is the slot's decision. */
      const inHolder = bt => ranked(bt) && !utility(bt).filter(y => !RANKS.has(y) && !SIZES.has(y)).length;
      const bySlot = attrs(SRC[b]).map(x => [x, toks(x[1])])
        .filter(([x, bt]) => inHolder(bt) && holder(SRC[b].slice(Math.max(0, x.index - 400), x.index + 8)) === mine);
      let pick = bySlot;
      if (bySlot.length > 1) pick = bySlot.filter(([x]) =>
        (SRC[b].slice(Math.max(0, x.index - 120), x.index + 200).match(/href="([^"]+)"/) || [])[1] === href);
      cand = [...new Set(pick.map(([, bt]) => rankOf(bt)))];
      u.push('у .' + mine);
    }
    if (cand.length !== 1) continue;                // no single answer in the base
    if (cand[0] === rankOf(t)) continue;            // agrees
    /* A SIZE THAT DISAGREES IS A DEFECT; A FINISH THAT DISAGREES IS A DECISION.
       Size is a touch target and the weight of one control - 40 against 64 is a
       measurement, and the smaller one is under the 44 floor. Finish is «what this
       screen RECOMMENDS», and design principle 2 says that is the screen's own to
       choose: an empty state may well put the accent on the act the base treats as
       secondary. So the two are separated here rather than swept together, and
       only the first is written by `--apply`. */
    const fin = x => x.split(' ').filter(y => RANKS.has(y)).join(' ');
    const kind = fin(cand[0]) === fin(rankOf(t)) ? 'size' : 'finish';
    disagree.push({ p, b, was: m[1], at: m.index, hook: u.join(' '), want: cand[0], have: rankOf(t), kind });
  }
}

const sized = disagree.filter(d => d.kind === 'size');
const finished = disagree.filter(d => d.kind === 'finish');
const show = (title, list) => {
  if (!list.length) return;
  console.log('\n' + title + ' (' + list.length + '):');
  for (const d of list)
    console.log('  ' + d.p.padEnd(28) + d.hook.padEnd(34) + d.have + '  ->  ' + d.want + '   (база ' + d.b + ')');
};
show('РОЗМІР, ЩО НЕ ЗБІГАЄТЬСЯ З БАЗОЮ - це дефект', sized);
show('ФІНІШ, ЩО НЕ ЗБІГАЄТЬСЯ З БАЗОЮ - це РІШЕННЯ, не пишу', finished);
if (finished.length) console.log('  (принцип 2: що екран радить, вирішує екран. Прилад показує, не зводить.)');
if (sized.length) {
  if (APPLY) {
    const byPage = {};
    for (const d of sized) (byPage[d.p] ||= []).push(d);
    let wrote = 0;
    /* BY POSITION, AND THE FIRST WRITING WAS BY STRING - which replaced EVERY
       control on the page wearing that exact class attribute. On five session
       screens `class="btn--accent btn--s btn"` is worn by the bar's action AND by
       «Знайти» in the quick-add field, so upsizing the bar upsized the field's
       button with it. The next plain run reported those five as fresh size
       disagreements against `.qadd-field`, which is the idle control doing its job
       and is the only reason this is a paragraph rather than a shipped defect.
       Descending order, so an earlier splice cannot move a later index. */
    for (const [pg, ds] of Object.entries(byPage)) {
      let src = SRC[pg];
      for (const d of [...ds].sort((a, c) => c.at - a.at)) {
        const keep = toks(d.was).filter(x => !RANKS.has(x) && !SIZES.has(x));
        const next = [...d.want.split(' '), ...keep].join(' ');
        const head = 'class="' + d.was + '"';
        if (src.slice(d.at, d.at + head.length) !== head) {
          console.log('  ! ' + pg + ': позиція зрушила, не пишу');
          continue;
        }
        src = src.slice(0, d.at) + 'class="' + next + '"' + src.slice(d.at + head.length);
      }
      writeFileSync(join(DIR, pg + '.html'), src);
      SRC[pg] = src; wrote++;
    }
    console.log('переписано ' + sized.length + ' контролів на ' + wrote + ' сторінках');
  }
}

console.log('\n' + NAMES.length + ' сторінок · без рангу: ' + rows.length +
  ' · читається з бази: ' + done.length + ' · без відповіді: ' + open.length +
  ' · мертвий dark: ' + darkLeft + ' · розмір проти бази: ' + (APPLY ? 0 : sized.length) + ' · фініш проти бази: ' + finished.length);
/* a finish disagreement does NOT fail the run - it is a question for the
   owner, and a gate that goes red on an open question stops being read. */
process.exit(open.length || idle.length || darkLeft || (!APPLY && sized.length) ? 1 : 0);
