/* tools/accept.mjs - THE GATE. Nothing is «done» until this returns zero.

   CLAUDE.md: «Acceptance is in the browser, not in a table. Open it, walk every
   state, narrow to 360px, and only then say done.» This is the browser half of
   that sentence, run over every screen at once.

   Five questions per page, and each one is here because it was a real defect
   somebody found by eye after a step said it was finished:

     sideways scroll   documentElement.scrollWidth - clientWidth must be 0
     console error     any uncaught error or console.error during load
     em dash           `-` in a sentence, `–` for a range and an empty cell,
                       `—` NOWHERE in project output (CLAUDE.md)
     curly apostrophe  one apostrophe form in the product: `'`
     doubled separator the crumb draws its slash in CSS; a typed one shows twice

   THE CRUMB CHECK ASKS «IS IT DRAWN TWICE», NOT «IS IT TYPED», and that is the
   whole difference between an instrument and a nuisance. `ia/*.html` type their
   slash and load no stylesheet that draws one - measured, `::before` is `none`
   and the box is 3.55 wide - so they are correct, and an earlier version of this
   file called five of them a failure. A check that reports a correct page trains
   you to stop reading its output.

     node tools/accept.mjs [width] [page...]      default 390, every design/*.html
     node tools/accept.mjs 1280 account coach-home                                */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, subject } from './lib.mjs';

const args = process.argv.slice(2);
const W = /^\d+$/.test(args[0] || '') ? Number(args.shift()) : 390;
const PAGES = subject(args);

const srv = await serve();
const l = await chrome('accept');
const conn = await Conn.open(l.wsUrl);

const ERRS = `window.__errs=[];addEventListener('error',e=>window.__errs.push(String(e.message)));
 (function(){var oe=console.error;console.error=function(){try{window.__errs.push([].join.call(arguments,' '))}catch(e){};oe.apply(console,arguments)};})();`;

const M = `(() => {
  const de = document.documentElement;
  const t = document.body.innerText;
  const nav = document.querySelector('.crumb');
  let crumbBad = null;
  if(nav){
    const typed = [].slice.call(nav.querySelectorAll('.sep')).filter(s => {
      if(s.textContent === '') return false;
      const c = getComputedStyle(s, '::before').content;
      return c && c !== 'none' && c !== 'normal';
    }).length;
    if(typed) crumbBad = typed + ' doubled sep';
  }
  return JSON.stringify({
    over: de.scrollWidth - de.clientWidth,
    errs: (window.__errs||[]).slice(0,2),
    em: (t.match(/\\u2014/g)||[]).length,
    curly: (t.match(/[\\u2019\\u02BC]/g)||[]).length,
    crumbBad: crumbBad,
    svg: document.querySelectorAll('svg').length
  });
})()`;

let bad = 0;
for (const p of PAGES) {
  const s = await newSession(conn);
  await conn.send('Page.addScriptToEvaluateOnNewDocument', { source: ERRS }, s.sessionId);
  const d = JSON.parse(await visit(conn, s.sessionId, `${srv.base}/design/${p}.html`, W, 844, M, s.inflight));
  const ok = d.over === 0 && !d.errs.length && d.em === 0 && d.curly === 0 && !d.crumbBad;
  if (!ok) bad++;
  console.log((ok ? 'OK   ' : 'FAIL ') + p.padEnd(20) + 'over=' + String(d.over).padEnd(4) + 'em=' + String(d.em).padEnd(3)
    + 'curly=' + String(d.curly).padEnd(3) + 'svg=' + String(d.svg).padEnd(4)
    + (d.crumbBad ? ' CRUMB:' + d.crumbBad : '') + (d.errs.length ? ' ERR:' + JSON.stringify(d.errs) : ''));
  await conn.send('Target.closeTarget', { targetId: s.targetId });
}
console.log('\n@' + W + '  ' + PAGES.length + ' screens  failures: ' + bad);
l.stop(); srv.stop();
process.exit(bad ? 1 : 0);
