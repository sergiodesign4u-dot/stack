// A minimal CDP driver: launches Chrome headless, walks pages x viewports,
// runs one census expression per load, writes one JSON file per pass.
// Replaces the Playwright MCP server, which is not in this session.
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export async function launch(userDataDir, port) {
  rmSync(userDataDir, { recursive: true, force: true });
  mkdirSync(userDataDir, { recursive: true });
  const proc = spawn(CHROME, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run', '--no-default-browser-check',
    '--disable-extensions', '--disable-background-networking',
    '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=1',
    'about:blank',
  ], { stdio: ['ignore', 'ignore', 'ignore'] });

  let ver = null;
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      ver = await r.json();
      break;
    } catch { await sleep(200); }
  }
  if (!ver) { proc.kill(); throw new Error('chrome did not come up on ' + port); }
  return { proc, wsUrl: ver.webSocketDebuggerUrl };
}

export class Conn {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.handlers = []; }
  static async open(wsUrl) {
    const ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    const c = new Conn(ws);
    ws.onmessage = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id !== undefined && c.pending.has(m.id)) {
        const { res, rej } = c.pending.get(m.id); c.pending.delete(m.id);
        m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
      } else {
        for (const h of c.handlers) h(m);
      }
    };
    return c;
  }
  /* EVERY REQUEST HAS A DEADLINE, AND THE ABSENCE OF ONE COST A NIGHT.
     `once()` below has always had its 20s and resolves `null`; `send()` had
     nothing at all. A reply that never arrives - a message lost on the socket, a
     renderer that stops answering - left the promise in `pending` forever, and
     the whole instrument simply stood there. Measured on 2026-08-15: the full
     `inert` walk lived 3h13m, spent 28.85s of CPU, and printed nothing after the
     first 47 minutes. Chrome was fine, its tab was open, the server answered
     200; node was waiting on a promise that could not settle.
     A hang is the worst failure this folder can have, because it is the one
     shape that never reaches a report: a crash is read, a wrong number is
     argued with, silence is mistaken for work in progress. No CDP call in this
     repository legitimately takes a minute, so the deadline is generous enough
     to never fire by accident and finite enough to always fire. */
  send(method, params = {}, sessionId, timeoutMs = 60000) {
    const id = ++this.id;
    const msg = { id, method, params };
    if (sessionId) msg.sessionId = sessionId;
    this.ws.send(JSON.stringify(msg));
    return new Promise((res, rej) => {
      const t = setTimeout(() => {
        if (!this.pending.has(id)) return;
        this.pending.delete(id);
        rej(new Error('CDP мовчить ' + Math.round(timeoutMs / 1000) + 'с: ' + method));
      }, timeoutMs);
      t.unref?.();
      this.pending.set(id, {
        res: v => { clearTimeout(t); res(v); },
        rej: e => { clearTimeout(t); rej(e); },
      });
    });
  }
  once(method, sessionId, timeoutMs = 20000) {
    return new Promise((res) => {
      const t = setTimeout(() => { drop(); res(null); }, timeoutMs);
      const h = (m) => {
        if (m.method === method && (!sessionId || m.sessionId === sessionId)) {
          clearTimeout(t); drop(); res(m.params);
        }
      };
      const drop = () => { this.handlers = this.handlers.filter(x => x !== h); };
      this.handlers.push(h);
    });
  }
  close() { try { this.ws.close(); } catch {} }
}

/* 7.51: the null pass came back 56 rows and every one of them was an animation
   still running - the skeleton pulse on three *-loading screens (opacity) and
   the auth spinner (transform, and the rect it rounds to). No amount of waiting
   settles those: they never stop. A floor that big hides a real 16-row change
   inside it, so the census now holds every animation at its first frame before
   the document has any nodes. `animation-play-state: paused` from time zero is
   deterministic in a way that pausing later is not, and both passes get it, so
   the comparison is unchanged. */
/* 7.52: FREEZE used to add "transition: none !important" as well. A transition
   only runs when a computed value CHANGES, and nothing changes on a fresh load,
   so it bought no determinism - what it did buy was a "*" rule with !important
   sitting in an inline sheet, which then beat every component's transition in the
   winning-rule solver and reported five live declarations as dead. The instrument
   must not be visible in its own measurement.
   (And no backticks in a comment inside a template literal: that closes it.) */
const FREEZE = `(() => {
  const s = document.createElement('style');
  s.textContent = '*, *::before, *::after { animation-play-state: paused !important;'
    + ' animation-delay: 0s !important;'
    + ' caret-color: transparent !important; }';
  const put = () => (document.head || document.documentElement).appendChild(s);
  if (document.documentElement) put();
  else new MutationObserver((_, o) => { if (document.documentElement) { put(); o.disconnect(); } })
        .observe(document, { childList: true, subtree: true });
})()`;

export async function newSession(conn) {
  const { targetId } = await conn.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await conn.send('Target.attachToTarget', { targetId, flatten: true });
  await conn.send('Page.enable', {}, sessionId);
  await conn.send('Network.enable', {}, sessionId);
  await conn.send('Runtime.enable', {}, sessionId);
  await conn.send('Page.addScriptToEvaluateOnNewDocument', { source: FREEZE }, sessionId);

  /* 7.52: headless Chrome answers `prefers-reduced-motion: reduce`, so base.css:26
     fires its `*{ transition:none !important }` on every load and the census has
     been reading the exception rather than the default all along. Ask for the
     default explicitly. */
  try {
    await conn.send('Emulation.setEmulatedMedia', { features: [
      { name: 'prefers-reduced-motion', value: 'no-preference' },
      { name: 'prefers-color-scheme', value: 'light' },
    ] }, sessionId);
  } catch {}

  /* 7.51: in-flight request counter. `document.fonts.ready` answers a question
     about the FontFaceSet, not about the network, and under three passes at once
     a webfont still on the wire let one page per run lay out in the fallback and
     settle there. This is the signal that was missing. */
  const inflight = new Set();
  inflight.stamp = 0;
  /* 2026-08-15: AND THE HANDLER USED TO OUTLIVE ITS SESSION. Every session
     pushed one of these and nothing ever took it off, so `conn.handlers` grew by
     one per load and EVERY message from EVERY tab was then run through all of
     them. A walk that opens fifty tabs per screen is quadratic by its thirtieth
     screen, which is the honest reason the `inert` pass slowed to nine minutes a
     page while doing the same work as the first one. It leaked memory too: each
     dead handler holds its `inflight` Set alive.
     The handler now takes itself off when its target detaches, so a caller that
     forgets to tidy up is still tidy. */
  const h = (m) => {
    if (m.method === 'Target.detachedFromTarget' && m.params && m.params.sessionId === sessionId) {
      conn.handlers = conn.handlers.filter(x => x !== h);
      return;
    }
    if (m.sessionId !== sessionId || !m.method.startsWith('Network.')) return;
    inflight.stamp++;
    if (m.method === 'Network.requestWillBeSent') inflight.add(m.params.requestId);
    else if (m.method === 'Network.loadingFinished' || m.method === 'Network.loadingFailed')
      inflight.delete(m.params.requestId);
  };
  conn.handlers.push(h);
  /* and the explicit form, for a caller that closes tabs in a loop: this drops
     the handler BEFORE the round trip rather than one event later. */
  const close = async () => {
    conn.handlers = conn.handlers.filter(x => x !== h);
    try { await conn.send('Target.closeTarget', { targetId }); } catch {}
  };
  return { targetId, sessionId, inflight, close };
}

// One load: fresh cache, fixed viewport, fonts settled, then the expression.
const primed = new WeakSet();

export async function visit(conn, sessionId, url, width, height, expression, inflight) {
  await conn.send('Emulation.setDeviceMetricsOverride',
    { width, height, deviceScaleFactor: 1, mobile: false }, sessionId);
  /* 7.51: the cache used to be cleared before EVERY load. Within one pass the
     stylesheets never change - one Chrome, one server, one tree - so all that
     bought was re-fetching the webfonts 160 times over the wire, which is the
     race that made a null pass non-zero. Clear it once, at the top of the pass,
     and let the cache serve the fonts after that. */
  if (!primed.has(conn)) {
    await conn.send('Network.clearBrowserCache', {}, sessionId);
    await conn.send('Network.setCacheDisabled', { cacheDisabled: true }, sessionId);
    const first = conn.once('Page.loadEventFired', sessionId);
    await conn.send('Page.navigate', { url }, sessionId);
    await first;
    await conn.send('Network.setCacheDisabled', { cacheDisabled: false }, sessionId);
    primed.add(conn);
  }
  const loaded = conn.once('Page.loadEventFired', sessionId);
  await conn.send('Page.navigate', { url }, sessionId);
  await loaded;
  /* Wait for the network to go QUIET, not for the in-flight set to hit zero.
     A request that is cancelled, or served from cache without a finish event,
     leaves an id in the set forever - the first draft of this gate waited on
     that and got through 14 pages in ten minutes. Quiet is the real signal and
     it is bounded. */
  if (inflight) {
    const quiet = 250, cap = 3000;
    let waited = 0, last = inflight.stamp;
    while (waited < cap) {
      await sleep(50); waited += 50;
      if (inflight.stamp !== last) { last = inflight.stamp; waited = 0; continue; }
      if (waited >= quiet && inflight.size === 0) break;
      if (waited >= quiet * 4) break;
    }
  }
  await conn.send('Runtime.evaluate',
    { expression: 'document.fonts.ready.then(()=>1)', awaitPromise: true, returnByValue: true },
    sessionId);
  /* `document.fonts.ready` resolves for the faces that were loading AT THAT MOMENT.
     A face that starts loading a tick later slips through, and the census then reads
     text measured in a fallback: 7.49's null pass caught exactly one such load out of
     160 and it cost 159 sub-pixel rows on one page. So wait until the count of loaded
     faces stops moving across two consecutive frames. */
  /* 7.51: counting loaded faces is a PROXY for the thing we care about, which is
     that layout has stopped moving. Three census passes running at once put the
     machine under enough load that one page in 160 settled its last face after
     the 60-frame budget ran out, and index.html came back 37.6px taller in one
     pass than in the other five - 563 rows of sub-pixel drift in a NULL pass.
     So wait on the height as well as the count, five consecutive frames each,
     with a budget wide enough to survive the contention. */
  await conn.send('Runtime.evaluate', {
    expression: `(async () => {
      const n = () => [...document.fonts].filter(f => f.status === 'loaded').length;
      const h = () => Math.round(document.documentElement.getBoundingClientRect().height * 100);
      const frame = () => new Promise(r => requestAnimationFrame(() => r(1)));
      let pc = -1, ph = -1, same = 0;
      for (let i = 0; i < 240 && same < 5; i++) {
        await frame();
        const c = n(), y = h();
        same = (c === pc && y === ph) ? same + 1 : 0;
        pc = c; ph = y;
      }
      await document.fonts.ready;
      await frame(); await frame();
      return [pc, ph, same];
    })()`,
    awaitPromise: true, returnByValue: true }, sessionId);
  const r = await conn.send('Runtime.evaluate',
    { expression, awaitPromise: true, returnByValue: true }, sessionId);
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 600));
  return r.result.value;
}

export { sleep, writeFileSync };
