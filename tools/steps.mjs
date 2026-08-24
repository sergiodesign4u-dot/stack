/* tools/steps.mjs - THE SEVEN EIGHTHS OF A SCREEN THAT ARE BEHIND A CLICK.
   Stage 12, batch 6.

   Every width instrument in this repository loads a page and measures what it
   finds. `accept.mjs` walks 341 screens at 390 and 360, `width-sweep.mjs` asks
   four questions at 129 widths, `split.mjs` sweeps its declared frames - and all
   three read the document AT REST. On a screen built as an in-page machine that
   is one state of eight, and the other seven are behind a button.

   IT WAS NOT A THEORY. The colour quiz arrived with its footer row overflowing
   at 360 and 390 - 412px of buttons inside a 328 card, taking the whole DOCUMENT
   sideways by 68px - and `width-sweep.mjs quiz` printed «чисто на кожній із 129
   ширин», because at rest the visible step is the intro, whose footer holds one
   button. Three green counters, one of them running 129 times, and none of them
   could see the class.

   THE SUBJECT IS DERIVED, NOT DECLARED, so it is asked both ways for free. A
   step machine is two things at once, and BOTH have to be true:
     - the system declares a visibility switch: a rule `.S{ display: none }` and
       a rule `.S.X{ display: <anything else> }`, so `.X` is what makes an `.S`
       visible;
     - the screen's own tail script toggles `.X` with `classList`.
   A screen that grows a machine is picked up without an edit here; a machine
   that is removed stops being asked the same way. There is no list to go stale.

   WHAT IT ASKS ON EACH STEP is the question `accept.mjs` asks at rest: does the
   DOCUMENT scroll sideways, and if it does, which element inside `.wf-canvas`
   sticks out. The product is `.wf-canvas`; the stand's own panel is not the
   product, which is the boundary `width-sweep.mjs` and `modal-trap.mjs` draw
   too.

   THE WRONG VERSION, AND IT WAS THIS FILE'S OWN FIRST EDITION. It reached every
   step by applying the switch class directly - `.q-step.on`, read off the css -
   which does reach all eight, including the conditional safety step. It reported
   ZERO. Then the repair it was written to verify was reverted, and it reported
   zero again: the defect was still there and the instrument could not see it.

   The reason is the half a switch cannot reach. A step machine moves TWO things:
   the body, which the class shows, and the chrome around it, which the screen's
   own script re-dresses - the label on the next button, whether back and skip
   exist at all. The overflowing row was «Назад · Пропустити · Показати набір →»,
   and none of those three words exists in the markup at rest. Toggling the class
   showed step Q5's body under the intro's one-button footer.

   So the walk is BOTH, and both are counted out loud. It clicks the machine's own
   controls, which is the only thing that dresses the chrome, and it says how many
   steps that reached; whatever the path never visited is then opened by the
   switch and measured with its chrome undressed, and those are counted
   separately. An instrument that shows one layer cannot say «clean» - it can only
   say which layer, and how much of it.

   node tools/steps.mjs              every screen with a machine
   node tools/steps.mjs quiz         only that one
   node tools/steps.mjs --census     also print the machines found and stay green */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, subject, ROOT } from './lib.mjs';

const CENSUS = process.argv.includes('--census');
const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const WIDTHS = [360, 390];

/* ---- the switches the system declares ---------------------------------- */
const sysCss = (dir => {
  const out = [];
  const walk = d => readdirSync(d, { withFileTypes: true }).forEach(e => {
    const p = join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith('.css')) out.push(readFileSync(p, 'utf8'));
  });
  walk(dir); return out.join('\n');
})(join(ROOT, 'design/system'));
const css = sysCss.replace(/\/\*[\s\S]*?\*\//g, ' ');

const hidden = new Set();
for (const m of css.matchAll(/\.([\w-]+)\s*\{[^}]*display\s*:\s*none/g)) hidden.add(m[1]);
/* `.S.X{ display: <not none> }` - X is the switch that reveals an S */
const SWITCH = new Map();          /* switch class -> Set of hidden base classes */
for (const m of css.matchAll(/\.([\w-]+)\.([\w-]+)\s*\{[^}]*display\s*:\s*(?!none)([\w-]+)/g)) {
  const [, base, sw] = m;
  if (!hidden.has(base)) continue;
  if (!SWITCH.has(sw)) SWITCH.set(sw, new Set());
  SWITCH.get(sw).add(base);
}

/* ---- the screens whose own script toggles one of them ------------------- */
const all = readdirSync(join(ROOT, 'design'))
  .filter(f => f.endsWith('.html')).map(f => f.replace(/\.html$/, ''));
const machines = new Map();
for (const name of all) {
  const html = readFileSync(join(ROOT, 'design', name + '.html'), 'utf8');
  const scripts = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
  if (!scripts) continue;
  for (const [sw, bases] of SWITCH) {
    if (!new RegExp("classList\\.(?:add|toggle|remove)\\(\\s*['\"]" + sw + "['\"]").test(scripts)) continue;
    for (const base of bases) {
      if (!new RegExp('class="[^"]*\\b' + base + '\\b').test(html)) continue;
      if (!machines.has(name)) machines.set(name, []);
      machines.get(name).push({ base, sw });
    }
  }
}

const names = args.length ? subject(args, 'design').map(p => p.replace(/^design\//, '')) : [...machines.keys()];
const subjects = names.filter(n => machines.has(n));

if (CENSUS) {
  console.log('перемикачів видимості в системі: ' + SWITCH.size);
  for (const [n, ms] of machines)
    console.log('  ' + n + '  ' + ms.map(m => '.' + m.base + ' <- .' + m.sw).join(' · '));
}

const expr = m => `(() => {
  const de = document.documentElement;
  const canvas = document.querySelector('.wf-canvas') || document.body;
  const steps = [...document.querySelectorAll('.${m.base}')];
  const idOf = (s, i) => s.id || ('#' + i);
  const measure = (id, how) => {
    const over = de.scrollWidth - de.clientWidth;
    let worst = null;
    if (over > 0) for (const e of canvas.querySelectorAll('*')) {
      const r = e.getBoundingClientRect();
      const past = Math.round(r.right - de.clientWidth);
      if (past > 0 && (!worst || past > worst.past))
        worst = { past, w: Math.round(r.width), sel: e.tagName.toLowerCase() +
          (e.className && typeof e.className === 'string'
            ? '.' + e.className.trim().split(/\\s+/).join('.') : '') };
    }
    return { id, how, over, worst };
  };
  const visible = () => steps.findIndex(s => s.classList.contains('${m.sw}'));
  const out = [], seen = new Set();

  /* 1. the PATH: click the machine's own controls. Answer the first option of a
     step before pressing on, because a gate that refuses to advance is part of
     the product and not something to step around. */
  /* the machine's chrome is the nearest ancestor that holds a control standing
     OUTSIDE every step - the footer of the card, not the step's own body. Walking
     up until that is true is what the first edition got wrong: closest('div')
     on a div.q-step returns the step itself, so the scope never reached the
     footer and the walk stopped on step one. */
  const CTRL = 'button:not([disabled]), [role="radio"], [role="checkbox"]';
  const outside = el => [...el.querySelectorAll(CTRL)].some(b => !steps.some(s => s.contains(b)));
  let scope = steps[0] || document.body;
  while (scope !== document.body && !outside(scope)) scope = scope.parentElement || document.body;
  for (let guard = 0; guard < steps.length * 3; guard++) {
    const i = visible(); if (i < 0) break;
    const id = idOf(steps[i], i);
    if (!seen.has(id)) { seen.add(id); out.push(measure(id, 'клік')); }
    const step = steps[i];
    const opt = step.querySelector('[role="radio"], [role="checkbox"], input[type=radio], input[type=checkbox]');
    if (opt && !(opt.getAttribute('aria-checked') === 'true' || opt.checked)) opt.click();
    const foot = [...scope.querySelectorAll(CTRL)].filter(b => !step.contains(b) && b.offsetParent !== null);
    const next = foot[foot.length - 1];
    if (!next) break;
    next.click();
    if (visible() === i) break;
  }

  /* 2. what the path never reached, opened by the switch. The chrome around it is
     the previous step's, and the row above says so. */
  const was = steps.map(s => s.classList.contains('${m.sw}'));
  for (let i = 0; i < steps.length; i++) {
    const id = idOf(steps[i], i);
    if (seen.has(id)) continue;
    steps.forEach((s, j) => s.classList.toggle('${m.sw}', j === i));
    out.push(measure(id, 'перемикач'));
  }
  steps.forEach((s, j) => s.classList.toggle('${m.sw}', was[j]));
  return JSON.stringify({ total: steps.length, walked: seen.size, rows: out });
})()`;

const srv = await serve(); const l = await chrome('steps'); const conn = await Conn.open(l.wsUrl);
let asked = 0, stepsSeen = 0, bad = 0, walked = 0, offPath = 0;
for (const name of subjects) {
  for (const m of machines.get(name)) {
    for (const W of WIDTHS) {
      const s = await newSession(conn);
      let r = null;
      try {
        r = JSON.parse(await visit(conn, s.sessionId,
          `${srv.base}/design/${name}.html`, W, 900, expr(m), s.inflight));
      } finally { await s.close(); }
      if (!r) continue;
      asked++; stepsSeen += r.rows.length; walked += r.walked; offPath += r.total - r.walked;
      for (const st of r.rows) {
        if (st.over <= 0) continue;
        bad++;
        console.log('  ' + name + '@' + W + '  ' + st.id + '  (' + st.how + ')  документ ширший на ' + st.over +
          (st.worst ? '  <- ' + st.worst.sel + ' (' + st.worst.w + ')' : ''));
      }
    }
  }
}
l.stop(); srv.stop();
console.log('\nекранів із машиною станів: ' + machines.size + ' зі ' + all.length +
  ' · оглянуто кроків: ' + stepsSeen + ' на ' + WIDTHS.join(' і '));
console.log('з них пройдено КЛІКАМИ (хром одягнений): ' + walked +
  ' · відкрито перемикачем (хром чужий): ' + offPath);
console.log('кроків, що женуть документ убік: ' + bad);
if (bad) process.exit(1);
