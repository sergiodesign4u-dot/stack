/* tools/states.mjs - THE WALK THAT OPENS THINGS, and asks the product's own rules.

   This is the instrument that ended an eleven-instance defect class, and it took
   four versions to get there. What it is for: a dialog, a drawer or an overlay
   that rebuilds part of the page LOSES whatever the icon and mark passes had put
   there, because those passes ran once on load. Every one of those was found by
   accident, by a person looking at a screen, which is why the same fix kept being
   written from one instance and kept addressing one instance.

   IT ASKS THE SYSTEM RATHER THAN A LIST OF CHARACTERS. Open a state, then RUN THE
   PASSES AGAIN and see whether anything changes. If a pass reached this state, a
   second run does nothing - every pass in marks.js is idempotent and says so. If
   something moves, a pass did not reach it, and what moved IS the finding. No
   list of characters, no list of components, nothing of mine to go stale: the
   rules are the product's and the verdict is a diff.

   THREE THINGS IT LEARNED THE HARD WAY, all of them recorded because a later
   version of this file will be tempted to undo them:

   1. THE OPENERS ARE NOT A LIST. Three versions carried a hand-typed list of 22
      calls and reported «none» across 32 screens while four states were broken.
      `openClientDlg` and `openClientDel` are not functions in this product - the
      real names are `openClientEdit` and `openClientNew` - so those lines were
      silently skipped on every run, and `wfAuthDone`, which rebuilds the header,
      the drawer, the tab bar and the footer, was never in the list at all. It
      turned out to be losing 585 marks across four screens. An instrument whose
      entry points are typed from memory has the exact defect it exists to find.
      The page is now ASKED what it can open, at runtime, by the product's own
      naming convention. A dialog added next month is walked the day it is added.
   2. IT DOES NOT GIVE UP ON A PAGE. The version before this one broke out of the
      loop the moment a probe came back «no uivMarks here» - which is what a page
      says after it has NAVIGATED. One opener early in the list sends the browser
      somewhere else and every opener after it is skipped in silence. A walk that
      stops early and prints «none» is worse than no walk.
   3. IT RUNS EXACTLY WHAT THE PRODUCT RUNS. The first version added `wf-catov`,
      `addr-dlg`, `wf-profile` and `wf-toast` to the icon regions «to be
      thorough», and thoroughness is the bug: `uivIcons` does not honour
      `data-uiv-keep` - that is a marks.js guard - so running it on the toast drew
      the ✓ that design/_nav.js deliberately leaves typed, and the walk reported a
      documented decision as a defect ten times over.

     node tools/states.mjs [width] [page...]      default 390, every design/*.html */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, subject } from './lib.mjs';

const args = process.argv.slice(2);
const W = /^\d+$/.test(args[0] || '') ? Number(args.shift()) : 390;
const PAGES = subject(args);

const srv = await serve();
const l = await chrome('states');
const conn = await Conn.open(l.wsUrl);

/* A HAND-WRITTEN LIST OF TWO IS STILL A HAND-WRITTEN LIST - step 8.19, and the
   defect is the one point 1 above says this file exists to have fixed. The
   pattern was `open[A-Z]` OR two names typed out, and measured against the
   product's actual globals: **`toggleDrawer` is not a function in either layer**
   - a dead name, exactly like `openClientDlg` before it - while **`toggleBurger`,
   `toggleDrCat` and `toggleLang` are real and were never walked.** Half the typed
   half was wrong and the missing half was three times its size.
   Found sideways, which is the part worth keeping: a census for A10 could not
   find `a.on` «Українська», the accent-coloured current language. It paints
   `rgb(255,90,0)` on every page in the product and lives inside `.wfh-langmenu`,
   which `toggleLang` opens - so its box is 0x0 until something opens it, and
   nothing did. A record has carried it as an accepted contrast exception since
   2026-08-07 while no walk had ever rendered it. */
const AUTO_OPENER = /^(open[A-Z]|toggle[A-Z])/;
/* the few that take an argument stay written out, because a step name cannot be
   guessed - and each is a state of a dialog the enumeration already opens. */
const ARG_OPENERS = [
  ['auth code',     "wfAuthGo('code')"],
  ['auth newuser',  "wfAuthGo('newuser')"],
  ['auth error',    "wfAuthGo('error')"],
  ['auth done',     "wfAuthDone()"],
  ['cat goals',     "catOverlayGoals()"],
  ['addr post',     "addrStep('post')"],
  ['addr cour',     "addrStep('cour')"],
  ['profile phone', "profStep('pf-phone','enter')"],
  ['toast',         "wfToast('ok','Перевірка')"],
];

const RERUN = `(() => {
  if(typeof uivMarks !== 'function') return JSON.stringify({ skip: 1 });
  const before = document.querySelectorAll('svg').length;
  const txt = document.body.innerText;
  uivMarks(document.body);
  /* EXACTLY THE SIX REGIONS uivChrome PASSES TO uivIcons, and not one more. */
  if(typeof uivIcons === 'function')
    ['wf-header','drawer','wf-footer','wf-tabbar','wf-rail','wf-sheet']
      .forEach(id => { const e = document.getElementById(id); if(e) uivIcons(e); });
  const after = document.querySelectorAll('svg').length;
  if(after === before) return JSON.stringify({ moved: 0 });
  const gone = [];
  const t2 = document.body.innerText;
  const counts = s => { const m = {}; for(const c of s) m[c] = (m[c]||0)+1; return m; };
  const a = counts(txt), b = counts(t2);
  for(const c in a) if((b[c]||0) < a[c] && !/[\\p{L}\\p{N}\\s]/u.test(c)) gone.push(c + '×' + (a[c]-(b[c]||0)));
  return JSON.stringify({ moved: after - before, gone });
})()`;

const found = [];
for (const p of PAGES) {
  const s = await newSession(conn);
  const url = `${srv.base}/design/${p}.html`;
  await visit(conn, s.sessionId, url, W, 900, '1', s.inflight);
  const names = await conn.send('Runtime.evaluate', { expression:
    `JSON.stringify(Object.getOwnPropertyNames(window).filter(function(k){
        try { return ${AUTO_OPENER}.test(k) && typeof window[k] === 'function'; } catch(e){ return false; }
      }))`, returnByValue: true }, s.sessionId);
  const OPENERS = JSON.parse(names.result.value).map(n => [n, n + '()']).concat(ARG_OPENERS);
  for (const [label, call] of OPENERS) {
    const here = await conn.send('Runtime.evaluate', {
      expression: `location.pathname + (typeof uivMarks === 'function' ? '' : ' NOJS')`, returnByValue: true }, s.sessionId);
    if (!String(here.result.value).endsWith(`/design/${p}.html`) || String(here.result.value).includes('NOJS'))
      await visit(conn, s.sessionId, url, W, 900, '1', s.inflight);
    const r = await conn.send('Runtime.evaluate', {
      expression: `(()=>{ try { ${call}; return 'ran'; } catch(e){ return 'skip'; } })()`, returnByValue: true }, s.sessionId);
    if (r.result.value !== 'ran') continue;
    await new Promise(x => setTimeout(x, 220));
    const q = await conn.send('Runtime.evaluate', { expression: RERUN, returnByValue: true }, s.sessionId);
    let d; try { d = JSON.parse(q.result.value); } catch { continue; }
    if (d.skip) continue;
    if (d.moved) found.push({ page: p, label, moved: d.moved, gone: d.gone });
  }
  await conn.send('Target.closeTarget', { targetId: s.targetId });
  process.stdout.write('.');
}
console.log('\n\n===== A STATE NO PASS REACHED (re-running the passes changed it) =====');
if (!found.length) console.log('none - every state this walk can open is already marked');
const byLabel = {};
for (const f of found) {
  const k = f.label;
  byLabel[k] = byLabel[k] || { moved: 0, pages: new Set(), gone: new Set() };
  byLabel[k].moved += f.moved; byLabel[k].pages.add(f.page);
  (f.gone || []).forEach(g => byLabel[k].gone.add(g));
}
for (const k of Object.keys(byLabel).sort((a, b) => byLabel[b].moved - byLabel[a].moved))
  console.log(k.padEnd(18) + '+' + String(byLabel[k].moved).padStart(4) + ' marks   ' +
    [...byLabel[k].gone].slice(0, 8).join(' ') + '   [' + [...byLabel[k].pages].slice(0, 4).join(', ') + ']');
l.stop(); srv.stop();
process.exit(found.length ? 1 : 0);
