/* tools/grey-vars.mjs - THE PRIVATE BLOCKS LEARN THE SYSTEM'S NAMES.
   Step 8.17. Run `node tools/vars.mjs` before and after; it is the verdict.

   Thirty coloured screens carry their own `<style>` block written against the
   GREY layer's variable names, because the clone that coloured them swapped the
   head from `wireframes/_wf.css` to `design/system/index.css` and left the block
   alone. 637 declarations, eight names, and every one of them lands on `inherit`
   in silence - see tools/vars.mjs for why nothing catches it.

   THIS FILE RENAMES. IT DOES NOT MOVE. Relocating 600 lines of private CSS into
   `design/system/components/` is Крок 6, which is scheduled after stage 09 for
   its own reasons; a screen that is broken today does not have to wait for that.
   What changes here is which name a declaration reaches for, never a value and
   never a selector.

   ---- the seven that have one answer ----------------------------------------
   Each of these grey names lands in exactly ONE property family across all 637
   uses, measured before anything was written: --sec is `color` 166 times and
   nothing else, --hair2 is a border 114 times, --fill a background 43. So the
   role is not in doubt and the map below is a rename. The GUARD is what makes it
   safe: a name is only translated inside the property family it was measured in,
   and anything outside is reported rather than guessed. --ink is the one that
   needed the guard - 18 colours, plus one background and one border-bottom that
   mean something else entirely and are in the table below.

   ---- and the one that has two ----------------------------------------------
   `--dark` is the prototype's single stand-in for «selected / primary», which is
   TWO roles once there is colour: `--line-action` / `--bg-action` where it marks
   the thing you chose, `--line-inverse` / `--bg-inverse` where it is a dark
   plate. coach-session.css:661 resolved one such case by reading the markup, and
   this table does the same for the rest - every row is read off a selector or
   off a rule the system already wrote, never off the name. */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './lib.mjs';

const PLAIN = {
  '--sec':   ['--text-secondary', /^color$/],
  '--light': ['--text-muted',     /^color$/],
  '--ink':   ['--text-body',      /^color$/],
  '--hair':  ['--line-hair',      /^border/],
  '--hair2': ['--line-strong',    /^border/],
  '--fill':  ['--bg-sunken',      /^background$/],
  '--fill2': ['--bg-surface',     /^background$/],
};

/* selector ||| property -> token. The comment on each group is its source. */
const TABLE = {
  /* SELECTED / CURRENT. The state class is in the selector, so nothing has to
     be remembered: `.on`, `.now`, `.pro`, `.cur` and `.stop` all say it. */
  '.ac-cli.on|||border-color':        '--line-action',
  '.acgoals button.on|||background':  '--bg-action',
  '.acgoals button.on|||border-color':'--line-action',
  '.cc-goals a.on|||background':      '--bg-action',
  '.cc-goals a.on|||border-color':    '--line-action',
  '.ctab.on|||border-color':          '--line-action',   /* coach-session.css:661, verbatim */
  '.cv-step.on|||border-color':       '--line-action',
  '.cv-step.on .n|||background':      '--bg-action',
  '.cv-step.on .n|||border-color':    '--line-action',
  /* `.stop` is the halted step on coach-verify-deadend, and grey drew it with
     the SAME `--dark` as `.on`. Reading danger into it would be a new decision
     about what a dead end looks like, not a translation of what is there.
     Kept identical to `.on` and logged as the owner's. */
  '.cv-step.stop|||border-color':     '--line-action',
  '.cv-step.stop .n|||background':    '--bg-action',
  '.cv-step.stop .n|||border-color':  '--line-action',
  '.cv-steps2 li.now|||border-color': '--line-action',
  '.cv-steps2 li.now .m|||background':'--bg-action',
  '.cv-steps2 li.now .m|||border-color':'--line-action',
  '.tf-col.on|||border':              '--line-action',
  '.tf-cur|||border':                 '--line-action',   /* «you are on this plan» - the .pages a.on shape */
  /* NOT a selection - a delivery status, and the system already answers it:
     status-pill.css:137 puts `.ord-status.way` on the bonus edge. Taken from
     there rather than decided here. */
  '.ord-status.way|||border-color':   '--line-bonus-soft',

  /* A DARK PLATE. Each one is a box whose own text is white or inverse-muted,
     which is the tell that survives the dead variable: the literal `#fff`
     rendered while the ground did not. */
  '.btn.dark|||background':           '--bg-inverse',
  '.cnew|||background':               '--bg-inverse',   /* coach-cabinet.css:592 gives .cn-s inverse ink */
  '.cnew|||border':                   '--line-inverse',
  '.cv-ok|||border':                  '--line-inverse',
  '.cv-ok .m|||background':           '--bg-inverse',
  '.cv-badge|||border':               '--line-inverse',
  '.tier-flag|||background':          '--bg-inverse',
  '.tier-cta|||border':               '--line-inverse',
  '.tier-cta.dark|||background':      '--bg-inverse',
  '.section-h .n|||background':       '--bg-inverse',
  '.section-h|||border-bottom':       '--line-inverse',
  '.cv-ring|||border-top-color':      '--line-inverse',
  '.sk-spin|||border-top-color':      '--line-inverse',
  /* A progress fill is not an action - nothing is pressed and nothing is
     chosen - so it takes the plate rather than the accent. CLAUDE.md keeps
     `#FF5A00` for the single action colour. */
  '.upsell .ubar i|||background':     '--bg-inverse',
  /* `.pro` IS NOT A STATE, IT IS A VARIANT NAME, and that is the whole
     difference. `.on`, `.now` and `.cur` above say «this is the one you chose or
     the one you are on», which is what --line-action means. `.tier.pro` says
     «this card is the recommended plan» - nobody selected it and nothing is
     pressed. Drawn with the accent first, photographed at 390, and it put a full
     orange rectangle around a card that already carries a dark CTA: two loud
     marks arguing, against principle 4. The ink edge says «this one» without
     spending the action colour, which CLAUDE.md keeps for actions. */
  '.tier.pro|||border-color':         '--line-inverse',

  /* A CHIP EDGE, AND THE SYSTEM HAS TWO ANSWERS FOR IT ALREADY. Grey wrote
     `1.5px solid var(--dark)` for all of these. account-shell.css:59 answered
     `.acc-tier` with `--line-strong`; coach-clients.css answered `.ch-goal`
     with `--line-inverse` and wrote down that the difference «may be real or
     may be two hands ... three chips, two edges, one stage 09 decision». Each
     row below copies whichever answer the system already gave that class, so
     this step adds no third opinion and the stage 09 question stays open. */
  '.acc-tier|||border':               '--line-strong',   /* account-shell.css:59 */
  '.ch-goal|||border':                '--line-inverse',  /* coach-clients.css */
  '.tierchip|||border':               '--line-inverse',
  '.cstat .tierchip|||border':        '--line-inverse',
  '.cs-warn|||border':                '--line-inverse',
  '.cs-warn .wa|||border':            '--line-inverse',
  '.tf-upsell|||border':              '--line-inverse',
  '.upsell|||border':                 '--line-inverse',
};

/* ---- the file checks itself before it edits anything -----------------------
   `clone-to-colour.mjs` invented `uivCoach()` and broke twelve screens because
   its table was typed rather than verified. Two checks here: every token has to
   be declared in tokens.css, and every table row has to match something in the
   screens. A row that matches nothing is a typo, and a typo here is silent. */
const TOKENS = readFileSync(join(ROOT, 'design/system/tokens.css'), 'utf8');
const declared = new Set([...TOKENS.matchAll(/(?:^|[;{\s])(--[A-Za-z0-9_-]+)\s*:/g)].map(m => m[1]));
for (const t of [...Object.values(PLAIN).map(v => v[0]), ...Object.values(TABLE)])
  if (!declared.has(t)) throw new Error(`target ${t} is not declared in tokens.css`);

const GREY = Object.keys(PLAIN).concat('--dark');
const used = new Set();
const APPLY = process.argv.includes('--write');
let files = 0, hits = 0;
const left = [];

for (const f of readdirSync(join(ROOT, 'design')).filter(n => n.endsWith('.html'))) {
  const p = join(ROOT, 'design', f);
  const src = readFileSync(p, 'utf8');
  /* A PAGE THAT DECLARES THE NAME ITSELF IS NOT SPEAKING THE GREY LAYER'S
     LANGUAGE - it has its own. `design/overview.html` is the design hub, not a
     product screen: it loads `../_nav.css` and nothing of the system, and line
     14 declares its own `--ink`. The first run of this file renamed seven of its
     uses to `--text-body`, which that page does not have, and turned a page that
     worked into one that did not. Reverted, and the guard is here.
     Read from the page's own blocks, which is the same question `vars.mjs`
     asks - a name is only foreign if nothing the page loads declares it. */
  const own = new Set([...[...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n')
    .matchAll(/(?:^|[;{\s])(--[A-Za-z0-9_-]+)\s*:/gm)].map(m => m[1]));
  let touched = 0;
  const out = src.replace(/(<style[^>]*>)([\s\S]*?)(<\/style>)/g, (_, open, body, close) =>
    open + body.replace(/([^{}]+)\{([^{}]*)\}/g, (whole, selRaw, decls) => {
      /* The comment stays in the file and comes off the SELECTOR, for matching
         only. Six table rows matched nothing on the first run for exactly this:
         `/* big primary CTA *​/ .cnew` is not `.cnew`, and the row that was
         supposed to catch it reported itself as a typo instead - which is the
         self-check doing its job. */
      const sels = selRaw.replace(/\/\*[\s\S]*?\*\//g, ' ').split(',')
        .map(s => s.trim().replace(/\s+/g, ' ')).filter(Boolean);
      const fixed = decls.replace(/([-a-z]+)\s*:\s*([^;]*)/g, (d, prop, val) => {
        if (!GREY.some(g => val.includes('var(' + g + ')'))) return d;
        return prop + ':' + val.replace(/var\(\s*(--[a-z0-9-]+)\s*\)/g, (v, name) => {
          if (!GREY.includes(name) || own.has(name)) return v;
          for (const s of sels) {
            const k = s + '|||' + prop;
            if (TABLE[k]) { used.add(k); touched++; hits++; return 'var(' + TABLE[k] + ')'; }
          }
          const pl = PLAIN[name];
          if (pl && pl[1].test(prop)) { touched++; hits++; return 'var(' + pl[0] + ')'; }
          left.push(f.replace('.html', '') + '  ' + sels[0] + '  ' + prop + ': ' + name);
          return v;
        });
      });
      return selRaw + '{' + fixed + '}';
    }) + close);
  if (touched) { files++; if (APPLY) writeFileSync(p, out); }
}

const unused = Object.keys(TABLE).filter(k => !used.has(k));
console.log((APPLY ? 'WROTE ' : 'DRY   ') + hits + ' names translated across ' + files + ' screens');
if (unused.length) { console.log('\nTABLE ROWS THAT MATCHED NOTHING - a typo, silently:');
  for (const u of unused) console.log('  ' + u); }
if (left.length) { console.log('\nLEFT ALONE, needs a person (' + left.length + '):');
  for (const l of [...new Set(left)]) console.log('  ' + l); }
process.exit(unused.length ? 1 : 0);
