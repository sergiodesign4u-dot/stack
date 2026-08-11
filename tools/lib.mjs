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
import { readdirSync, mkdtempSync, rmSync } from 'node:fs';
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
export async function serve() {
  const port = await freePort();
  const proc = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1'],
    { cwd: ROOT, stdio: ['ignore', 'ignore', 'ignore'] });
  for (let i = 0; i < 100; i++) {
    try { await fetch(`http://127.0.0.1:${port}/README.md`); break; } catch { await sleep(100); }
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

/* Every screen in a folder, found rather than typed. `index` is included: it is
   the product's home page inside design/, not the repo's entry point. */
export function pages(dir = 'design') {
  return readdirSync(join(ROOT, dir))
    .filter(f => f.endsWith('.html'))
    .map(f => f.slice(0, -5))
    .sort();
}

/* argv after the flags, or every page in `dir` when the caller named none.
   Defaulting to «all of them» rather than to «none» is deliberate: a walk given
   nothing should do the most work, not the least, because the failure mode of
   the other choice is a green run that visited nothing. */
export function subject(argv, dir = 'design') {
  const named = argv.filter(a => !a.startsWith('-'));
  return named.length ? named : pages(dir);
}
