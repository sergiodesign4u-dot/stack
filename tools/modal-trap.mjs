/* tools/modal-trap.mjs - IS THE PAGE BEHIND AN OPEN MODAL STILL REACHABLE BY
   KEYBOARD. Stage 12, batch 1.

   `tab-walk.mjs` asks «is focus landing on something INVISIBLE». This asks the
   other half: «while a dialog is open, how much of the page behind it is still
   in the tab order». Everything this finds is perfectly visible - it is just
   behind a modal that declares itself modal - so the first instrument's zero
   says nothing at all about this class.

   THE FIRST RUN: 26 screens open a dialog at load, and on all 26 the page behind
   stayed tabbable, 91 to 118 controls each. `uivInert()` in `design/_nav.js` is
   the repair.

   THE SUBJECT IS THE PRODUCT, NOT THE HARNESS - and the first version of this
   file did not draw that line, so after the repair it still reported «26 of 26»
   while the product background was fully inert. What it was counting was
   `.uiv-side`, the stand's own navigation panel, which MUST stay reachable: 31
   of the 32 remaining stops on `cart.html`, and the 32nd is the scrim's own
   close link, which is the dialog's affordance rather than the page behind it.
   Same boundary `width-sweep.mjs` draws: `.wf-canvas` is the product, everything
   else on the page is the stand. */
import { Conn, newSession, visit } from './cdp.mjs';
import { serve, chrome, pages } from './lib.mjs';
const srv = await serve(); const l = await chrome('modal'); const conn = await Conn.open(l.wsUrl);
const EXPR = `(() => {
  const openDlg = [...document.querySelectorAll('[role="dialog"],[aria-modal="true"]')]
    .filter(d => d.offsetParent !== null || getComputedStyle(d).display !== 'none');
  if (!openDlg.length) return JSON.stringify(null);
  const F = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';
  const all = [...document.querySelectorAll(F)].filter(e => {
    if (e.closest('[inert]')) return false;
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden';
  });
  const inside = all.filter(e => openDlg.some(d => d.contains(e)));
  /* the product's background only: stand chrome is not the page behind the modal */
  const canvas = document.querySelector('.wf-canvas');
  const behind = all.filter(e => !openDlg.some(d => d.contains(e)) && canvas && canvas.contains(e));
  return JSON.stringify({ dlg: openDlg.length, inside: inside.length, behind: behind.length,
    ah: behind.filter(e => e.closest('[aria-hidden="true"]')).length });
})()`;
const rows = [];
for (const p of pages('design')) {
  if (p.includes('/')) continue;
  const s = await newSession(conn);
  let r; try { r = JSON.parse(await visit(conn, s.sessionId, `${srv.base}/design/${p}.html`, 1280, 900, EXPR, s.inflight)); } catch { r = null; }
  await conn.send('Target.closeTarget', { targetId: s.targetId });
  if (r) rows.push([p, r]);
}
rows.sort((a, b) => b[1].behind - a[1].behind);
console.log(`екранів з відкритим діалогом на завантаженні: ${rows.length}\n`);
console.log('екран'.padEnd(32), 'у діалозі', 'позаду', 'з них під aria-hidden');
for (const [p, r] of rows)
  console.log(p.padEnd(32), String(r.inside).padStart(8), String(r.behind).padStart(7), String(r.ah).padStart(18));
const bad = rows.filter(([, r]) => r.behind > 0);
console.log(`\nсторінка позаду лишається в tab-порядку: ${bad.length} з ${rows.length}`);
if (!rows.length) console.log('ХОЛОСТИЙ КОНТРОЛЬ: жодного відкритого діалога на завантаженні - у продукті їх 26, тож обхід зламано');
process.exit(bad.length || !rows.length ? 1 : 0);
