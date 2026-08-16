/* tools/lib.mjs - what every instrument in this folder needed and each one used
   to carry its own copy of.

   THE THREE THINGS THAT WERE HARD-CODED, and each of them cost a real failure:

   1. THE SERVER. Every script wrote `http://127.0.0.1:8993` and assumed someone
      had started a static server on that port by hand. A run against a dead
      server does not fail loudly - `visit()` gets a connection error, the census
      expression never runs, and what comes back is an empty pass that reads like
      a clean one. `serve()` starts the server, waits for it to answer, and hands
      back a stop function.
   2. THE PROFILE DIRECTORY. Every script wrote an absolute path into one
      session's job folder, which is why none of them outlived the session that
      wrote them - the whole reason this folder exists.
   3. THE PORT. Two scripts on one port is a silent hang, which happened twice in
      one afternoon. `freePort()` asks the operating system.

   AND THE FOURTH THING, WHICH IS NOT A CONSTANT BUT A LIST. `pages()` reads the
   screens off disk. The scripts used to be handed a shell glob, and on 2026-08-11
   an acceptance run over 135 pages reported «0 failures» after visiting exactly
   one: zsh does not word-split an unquoted parameter expansion, so the whole list
   arrived as a single argument and the walk asked for a page whose name was 135
   names long. It printed a pass. An instrument that takes its subject from the
   caller can be handed the wrong subject; one that finds its own cannot. */
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { readdirSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));

export function freePort() {
  return new Promise((res, rej) => {
    const s = createServer();
    s.once('error', rej);
    s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); });
  });
}

/* NOTHING THIS FOLDER STARTS MAY OUTLIVE THE SCRIPT THAT STARTED IT, and the
   scripts' own `stop()` calls at the foot of each file are not enough: they run
   only on the happy path. A script killed by a timeout, or stopped with ^C, or
   thrown out by an exception leaves its Chrome and its server running - measured
   on 2026-08-11 after an afternoon of runs, **93 Chrome processes and 7 static
   servers** were still up. Stale servers are the worse half: the next run binds a
   fresh port so nothing appears wrong, and the machine quietly accumulates.
   Everything registers here and is torn down on exit, on SIGINT and on SIGTERM. */
const CLEANUP = new Set();
let hooked = false;
function onExit(fn) {
  CLEANUP.add(fn);
  if (hooked) return;
  hooked = true;
  const run = () => { for (const f of CLEANUP) { try { f(); } catch {} } CLEANUP.clear(); };
  process.on('exit', run);
  for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP'])
    process.on(sig, () => { run(); process.exit(130); });
  process.on('uncaughtException', e => { run(); console.error(e); process.exit(1); });
}

/* a scratch profile that cleans itself up, wherever the operating system keeps
   temporary files - never inside the repo, and never inside one session's folder */
export function profile(tag) {
  const dir = mkdtempSync(join(tmpdir(), 'stack-' + tag + '-'));
  const drop = () => { try { rmSync(dir, { recursive: true, force: true }); } catch {} };
  onExit(drop);
  return { dir, drop };
}

/* the repo served over http, because file:// changes what a page can do -
   `fetch`, module scripts and same-origin reads all behave differently, and a
   prototype that passes on file:// has been measured under different rules than
   the one a person opens. */
/* `root` arrives 2026-08-13 for `tools/proof.mjs`, which needs TWO trees served
   at once - the working one and a baseline unpacked out of `git archive` - so
   that before and after can be photographed by one browser in one moment. Every
   other caller passes nothing and gets this repository, exactly as before. */
export async function serve(root = ROOT) {
  const port = await freePort();
  const proc = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'],
    { cwd: root, stdio: ['ignore', 'ignore', 'ignore'] });
  for (let i = 0; i < 100; i++) {
    try { await fetch(`http://127.0.0.1:${port}/`); break; } catch { await sleep(100); }
  }
  const stop = () => { try { proc.kill(); } catch {} };
  onExit(stop);
  return { base: `http://127.0.0.1:${port}`, stop };
}

/* Chrome, torn down the same way and for the same reason. Every script used to
   call `l.proc.kill()` at its foot and nowhere else. */
export async function chrome(tag) {
  const { launch } = await import('./cdp.mjs');
  const prof = profile(tag);
  const l = await launch(prof.dir, await freePort());
  const stop = () => { try { l.proc.kill(); } catch {} };
  onExit(stop);
  return { ...l, stop, profileDir: prof.dir };
}

/* Every screen in a folder, found rather than typed - AND THE FOLDER HAS
   SUBFOLDERS. Until 2026-08-13 this read ONE directory level, so `design/` meant
   the 88 product screens and nothing else: the stand's 87 pages, its 25 demos
   and the 3 concept pages were outside every walk that trusted this function.
   The gate printed «88 screens, failures: 0» over a folder holding 203, and the
   sentence a person read was «the product passes».
   The first run that could see them found two defects on pages no gate had ever
   opened: a gutted <script> block on both concept pages, six blank lines where
   the declarations were and one surviving call to them («sections is not
   defined»), and 53px of sideways scroll at 390 from a contrast table with no
   scroll box. Both had been published since stage 06.
   A finder that looks one level deep is the same defect as a list typed from
   memory - point 1 of states.mjs, again. It just fails somewhere nobody thinks
   to look, and reports a number that sounds like coverage.
   `index` is included: it is the product's home page inside design/, not the
   repo's entry point. */
export function pages(dir = 'design') {
  const walk = d => readdirSync(join(ROOT, d), { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(d + '/' + e.name)
      : e.name.endsWith('.html') ? [(d + '/' + e.name).slice(dir.length + 1, -5)] : []);
  return walk(dir).sort();
}

/* argv after the flags, or every page in `dir` when the caller named none.
   Defaulting to «all of them» rather than to «none» is deliberate: a walk given
   nothing should do the most work, not the least, because the failure mode of
   the other choice is a green run that visited nothing. */
/* AND A NAME THAT IS NOT A PAGE STOPS THE RUN - 2026-08-14, found by an agent
   probing the checker rather than the product: `node tools/accept.mjs kit/zzz-nope`
   printed «OK  kit/zzz-nope  over=0 em=0 curly=0» and «204 screens failures: 0».
   A 404 loads as an empty document, and every question this walk asks about an
   empty document answers «clean». That is the same family as the glob which
   reported 0 failures over 135 pages after visiting one, and as the check whose
   both sides came from one source: an instrument that cannot say «no» is not
   evidence. The filesystem knows, so it is asked. */
export function subject(argv, dir = 'design') {
  const named = argv.filter(a => !a.startsWith('-'));
  if (!named.length) return pages(dir);
  const missing = named.filter(n => !existsSync(join(ROOT, dir, n + '.html')));
  if (missing.length) {
    console.log('НЕМАЄ ТАКОЇ СТОРІНКИ (' + missing.length + '): ' +
      missing.map(m => dir + '/' + m + '.html').join(' '));
    process.exit(2);
  }
  return named;
}

/* THE PROPERTY SET EVERY VISUAL COMPARISON ASKS ABOUT. Born in `tree-diff.mjs`
   at step 6 and needed verbatim by `scope.mjs` the next day, so it lives here
   rather than in two files: a list retyped into a second instrument is the same
   hand fix this repository bans for pages.

   Deliberately WIDE - box, type, colour, layout - because the whole point of a
   comparison is to catch what the author did not think to look at. Deliberately
   NOT «all properties»: those include a hundred that never differ and would
   triple the cost of every run for nothing. */
/* WIDENED 2026-08-14, AND THE HOLE IT CLOSED WAS EMBARRASSING: the list carried
   `border-top-color` and `border-top-style` and NOT the other three sides. A rule
   that repaints only the bottom edge of a row - which is most of what a list of
   rows is made of - moved nothing this could see. `coach-clients-cap` is where it
   surfaced: computed style blessed a 46-rule cut that a screenshot refused, and
   the properties that actually moved were `border-bottom-color` x39,
   `border-left-color` x39, `border-right-color` x39.
   The additions are the INDEPENDENT ones only. `block-size`, `inline-size`,
   `padding-block-*` and `border-block-*` also showed up in that measurement and
   are aliases of what is already here; `column-rule-color`, `text-emphasis-color`
   and `-webkit-text-fill-color` default to `currentColor` and move whenever
   `color` does. Adding an alias costs a column and proves nothing. */
export const STYLE_PROPS = ['display', 'position', 'width', 'height', 'margin-top',
  'margin-right', 'margin-bottom', 'margin-left', 'padding-top', 'padding-right',
  'padding-bottom', 'padding-left', 'border-top-width', 'border-right-width',
  'border-bottom-width', 'border-left-width', 'border-top-color', 'border-right-color',
  'border-bottom-color', 'border-left-color', 'border-top-style', 'border-right-style',
  'border-bottom-style', 'border-left-style',
  'border-radius', 'background-color', 'background-image', 'background-position',
  'background-size', 'background-repeat', 'color', 'font-size',
  'font-weight', 'font-family', 'font-style', 'line-height', 'letter-spacing', 'text-align',
  'text-decoration-line', 'text-decoration-color', 'text-decoration-thickness',
  'text-transform', 'text-indent', 'text-shadow', 'white-space', 'word-break',
  'list-style-type', 'vertical-align', 'float', 'transform', 'filter',
  'outline-color', 'outline-style', 'outline-width',
  'opacity', 'visibility', 'box-shadow', 'flex-direction', 'flex-wrap',
  'flex-grow', 'flex-shrink', 'flex-basis', 'align-self', 'order',
  'justify-content', 'align-items', 'gap', 'grid-template-columns', 'grid-template-rows',
  'max-width', 'min-width', 'max-height', 'min-height', 'box-sizing', 'object-fit',
  'top', 'right', 'bottom', 'left', 'content', 'fill', 'stroke',
  'overflow-x', 'overflow-y', 'z-index'];

/* THE SNAPSHOT ITSELF, and it belongs here for the same reason the list does.
   `tree-diff.mjs` compares two trees, `inert.mjs` compares one page against the
   same page with rules cut out of it, and «what a page looks like, as a string»
   has to be ONE reading or the two instruments can disagree about the answer
   while agreeing about the question. That disagreement is exactly what step 6
   spent a day on.

   No backtick between here and the closing quote. */
export const snapshotExpr = () => `(() => {
  const all = document.querySelectorAll('*');
  const P = ${JSON.stringify(STYLE_PROPS)};
  /* BUILT WITH new RegExp AND NOT A LITERAL, because this whole expression is a
     template literal in the file above: a backslash inside it is consumed
     before the browser ever sees it, so the escapes in /http:\\/\\/127…/ arrive
     as a bare slash and end the regex on the spot. Same family as the backtick
     ban this directory states three times - a literal that is really a string
     cannot hold the syntax of the thing it looks like. */
  const PORT = new RegExp('http://127.0.0.1:[0-9]+', 'g');
  const out = [];
  /* AND ::before / ::after ARE READ, which they were not until 2026-08-14.
     querySelectorAll cannot see a pseudo-element, and this codebase draws with
     them constantly - the check mark in every feature list, every crumb
     separator, every content: "✓". A change confined to a pseudo-element was
     invisible to a comparator whose whole job is «did anything move».
     Three rows per element instead of one; the number of loads does not change.
     NO BACKTICK IN THIS COMMENT: it lives inside a template literal, and this is
     the sixth time that has been learned in this repository. */
  for (let i = 0; i < all.length * 3; i++) {
    const e = all[(i / 3) | 0], k = i % 3;
    const cs = getComputedStyle(e, k === 0 ? null : (k === 1 ? '::before' : '::after'));
    let row = e.tagName + '.' + (typeof e.className === 'string' ? e.className.trim() : '') +
      (k === 0 ? '' : (k === 1 ? '::before' : '::after')) + '|';
    for (let j = 0; j < P.length; j++) {
      /* THE ORIGIN IS THE COMPARATOR'S OWN, NOT THE PAGE'S. Two trees mean two
         servers mean two ports, and a computed background-image is absolute:
         url("http://127.0.0.1:55765/...") against url("http://127.0.0.1:55771/...")
         is a difference the tool INTRODUCED and would otherwise report as a
         finding. Every check in this repository that compared two sources has
         hit this shape once; here it is the port. */
      row += cs.getPropertyValue(P[j]).replace(PORT, '@') + '|';
    }
    out.push(row);
  }
  return JSON.stringify(out);
})()`;

/* ============================================================================
   THE OPENER SWEEP - shared, because it was born in theme.mjs at step 7.21 and
   census.mjs needed the identical thing at step 6. Retyping it into a second
   file is the hand fix this repository bans for instruments as loudly as for
   pages, so it lives here and both import it.

   A popup is 0x0 until somebody opens it, and any walk that only reads what is
   already on screen is blind to every dialog, drawer, mega menu and overlay in
   the product. That blind spot has cost three times now: `.on` «Українська» at
   8.19, the account menu at 7.17, and the category overlay at step 6, where a
   census called twelve live classes dead because nothing had opened the thing
   that wears them.

   AN OPENER THAT LEAVES THE PAGE IS DISCOVERED, NOT LISTED - openCookieSettings()
   falls back to a file that does not exist under design/, and the navigation is
   asynchronous, so a check written inside the sweep sees nothing. Each name is
   tried once in a session of its own and the verdict is cached by name. */
export const AUTO_OPENER = '/^(open[A-Z]|toggle[A-Z])/';
export const ARG_OPENERS = ["wfAuthGo('code')", "catOverlayGoals()", "addrStep('post')",
                     "profStep('pf-phone','enter')", "wfToast('ok','Перевірка')"];
export const NAMES = `JSON.stringify(Object.getOwnPropertyNames(window).filter(k => {
  try { return ${AUTO_OPENER}.test(k) && typeof window[k] === 'function'; } catch (e) { return false; }
}))`;
export const sweepOf = list => `(() => { let ran = 0;
  for (const call of ${JSON.stringify(list)})
    { try { (0, eval)(call); ran++; } catch (e) {} }
  return ran; })()`;

/* name -> may it be called at all. One map per process, shared by every caller.
   Exposed through a reader rather than the map itself: the dropped names have to
   be PRINTED with every result - «an exclusion nobody can see excludes whatever
   it likes» - and a caller that has to remember to filter would eventually not. */
const verdict = new Map();
export const droppedOpeners = () =>
  [...verdict.entries()].filter(([, ok]) => !ok).map(([c]) => c);
export async function safeOpeners(deps, url, calls) {
  const { conn, newSession, visit } = deps;
  const out = [];
  for (const call of calls) {
    if (!verdict.has(call)) {
      const probe = await newSession(conn);
      await visit(conn, probe.sessionId, url, 1280, 900, '1', probe.inflight);
      await conn.send('Runtime.evaluate', { expression: `(() => { try { ${call} } catch (e) {} })()`, returnByValue: true }, probe.sessionId);
      await new Promise(r => setTimeout(r, 400));
      const here = await conn.send('Runtime.evaluate', { expression: 'location.pathname', returnByValue: true }, probe.sessionId);
      verdict.set(call, String(here.result.value) === new URL(url).pathname);
      await conn.send('Target.closeTarget', { targetId: probe.targetId });
    }
    if (verdict.get(call)) out.push(call);
  }
  return out;
}

/* ---------------------------------------------------------------- the CSS parser
   ONE PARSER, TWO INSTRUMENTS. `inert.mjs` cuts private rules and `private.mjs`
   classifies them, and both have to agree on where a rule STARTS and ENDS or
   their numbers describe different corpora. A list retyped into a second
   instrument is the hand fix this repository bans for pages; a parser retyped is
   worse, because the disagreement is silent.

   A CSS rule is found by counting braces, and the two things that break a brace
   counter are comments and strings: `content: "}"` and a note holding a brace
   both close a block that was never open. Both are skipped as units. */
export function topRules(css) {
  const out = [];
  let i = 0, start = null, depth = 0;
  while (i < css.length) {
    const c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      const j = css.indexOf('*/', i + 2);
      i = j < 0 ? css.length : j + 2;
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < css.length && css[j] !== c) { if (css[j] === '\\') j++; j++; }
      i = j + 1;
      continue;
    }
    if (depth === 0 && start === null && !/\s/.test(c)) start = i;
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0 && start !== null) { out.push({ start, end: i + 1 }); start = null; } }
    else if (c === ';' && depth === 0 && start !== null) { out.push({ start, end: i + 1 }); start = null; }
    i++;
  }
  return out;
}

/* WHERE THE SELECTOR ENDS, ONCE THE NOTE IS PART OF THE SPAN. `withNotes` grows a
   span backwards over its comment, so `text.indexOf('{')` no longer finds the
   rule's own brace - it finds the first brace ANYWHERE in the span, and this
   repository writes css examples inside its notes constantly. Step 8.31:
   `coach-session-empty`'s note quotes `.cs-empty .btn{ padding: 13px 24px }`, and
   `private.mjs` read the whole paragraph as a selector and filed it under
   «частково нове». A comment counted as a rule inflates every total the file
   prints, and it does it silently.
   The skipping is `topRules`'s own, which is the point: one parser, one answer to
   «is this position inside a comment». */
export function braceAfterNotes(text) {
  let i = 0;
  while (i < text.length) {
    if (text[i] === '/' && text[i + 1] === '*') {
      const j = text.indexOf('*/', i + 2);
      i = j < 0 ? text.length : j + 2;
      continue;
    }
    if (text[i] === '{') return i;
    i++;
  }
  return -1;
}

/* THE NOTE BELONGS TO THE RULE. A span is grown backwards over any comment
   blocks that sit between it and the rule before it, separated by whitespace
   only - which is how every note in this repository is written. A comment that
   explains a rule nobody can find is the worst of the three possible states. */
export function withNotes(css, spans) {
  let floor = 0;
  return spans.map(s => {
    let a = s.start;
    for (;;) {
      const head = css.slice(floor, a);
      const m = head.match(/\/\*[\s\S]*?\*\/\s*$/);
      if (!m) break;
      a = floor + m.index;
    }
    floor = s.end;
    return { ...s, start: a };
  });
}
