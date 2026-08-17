/* demo.mjs - a stand frame, taken off the coloured screen in a browser.

   WHY A TOOL AND NOT A COPY-PASTE. A stand page shows an organism, and an
   organism only exists inside its own scope: `.coach .clh` draws nothing unless
   something above it carries `.coach`. So the frame cannot be a fragment retyped
   by hand - it has to be the product's own markup, standing in the product's own
   ground, loading the product's own entry point. 53 frames under design/kit/demo/
   were built that way one at a time between 7.87 and 8.34b, and each one was a
   hand fix: the markup was read off a screen, pasted, and then drifted the moment
   the screen changed. This reads it at build time instead.

   WHAT IT TAKES AND WHAT IT LEAVES.
     - the markup comes from the LIVE page, after the builders have run, because
       parts of several screens are written by `wfHeader()`, `wfAccountNav()` and
       friends and exist in no file at all;
     - `on*` attributes are stripped: a stand must not act, and `_boot.js` binds
       the real behaviour anyway through the same initialisers the screen calls;
     - document-relative `href` and `src` are lifted two levels, because a frame
       sits at design/kit/demo/ and the screen sits at design/. `uivFixLinks`
       does this for links at runtime; doing it in the file too means the frame
       is correct before a single script runs;
     - the body class is carried over. THIS IS THE WHOLE POINT for the eight
       coach organisms: every one of their selectors is scoped to `.coach`.

   WHAT IT DOES NOT DO. It does not choose the fragment. The selector is named on
   the command line, because which part of a screen is the component is a reading,
   not a measurement, and the wrong guess is a frame that looks right.

     node tools/demo.mjs <screen> <name> --sel '<css>' [--strip '<css>,...']
                                        [--state "<js>"] [--max <px>]

     <screen>   a page in design/, with or without .html
     <name>     the frame written to design/kit/demo/<name>.html
     --sel      what to take. Repeatable; the pieces are concatenated in order.
     --strip    selectors removed from what was taken, for the parts that belong
                to another component (a breadcrumb inside a landing page).
     --state    a call written into the frame as FRAME_STATE, run by _boot.js at
                the one point where the builders exist and the glyph pass has not
                happened yet.
     --max      a max-width wrapper, in px, for an organism that stands in a
                column rather than across the page.
     --pad      a left/right gutter, in px. The screen's own gutter lives in
                `.wf-page` (design/_stand.css), which is stand chrome and may not
                be loaded here - so a block that runs to the page edge in the
                product would run to the FRAME edge without this, and read as a
                bleed the product does not have.
*/
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, serve, chrome } from './lib.mjs';
import { Conn, newSession } from './cdp.mjs';

const argv = process.argv.slice(2);
const flag = (name, all = false) => {
  const out = [];
  argv.forEach((a, i) => { if (a === '--' + name) out.push(argv[i + 1]); });
  return all ? out : out[0];
};
const positional = argv.filter((a, i) => !a.startsWith('--') && !(argv[i - 1] || '').startsWith('--'));
const [screenArg, name] = positional;
const SELS = flag('sel', true);
if (!screenArg || !name || !SELS.length) {
  console.error('вжиток: node tools/demo.mjs <screen> <name> --sel \'<css>\' [--strip ...] [--state "js"] [--max N]');
  process.exit(2);
}
const screen = screenArg.replace(/\.html$/, '');
const STRIP = flag('strip', true);
const STATE = flag('state');
const MAX = flag('max');

const srv = await serve();
const br = await chrome('demo');
const conn = await Conn.open(br.wsUrl);
const { sessionId } = await newSession(conn);

const loaded = conn.once('Page.loadEventFired', sessionId);
await conn.send('Page.navigate', { url: `${srv.base}/design/${screen}.html` }, sessionId);
await loaded;
/* the builders run on load; give the glyph and mark passes their turn before
   reading, or the frame is captured mid-emoji */
await new Promise(r => setTimeout(r, 700));

/* PREFIX, NOT SKIP, AND `../` IS THE CASE THAT PROVED IT - step 8.47.
   The first cut skipped any path already starting with `../`, on the reading that
   a path that already climbs is already correct. It is not: it climbs from
   `design/`, and the frame stands two levels deeper. `../wireframes/x.html` has to
   become `../../../wireframes/x.html` - and prefixing `../../` gives exactly that,
   the same prefix that turns `account.html` into `../../account.html`. One rule
   covers both, and normalisation does the rest.
   `links.mjs` is what said so, on the first run after the frames were built: two
   consent links on the verify frames pointed at a folder that does not exist from
   where they stand. `uivFixLinks` repairs it at runtime, which is exactly why the
   file could stay wrong and look right. */
const expr = `(() => {
  const sels = ${JSON.stringify(SELS)}, strip = ${JSON.stringify(STRIP)};
  const box = document.createElement('div');
  const missing = [];
  for (const s of sels) {
    const found = document.querySelectorAll(s);
    if (!found.length) { missing.push(s); continue; }
    found.forEach(n => box.appendChild(n.cloneNode(true)));
  }
  for (const s of strip) box.querySelectorAll(s).forEach(n => n.remove());
  box.querySelectorAll('*').forEach(n => {
    for (const a of [...n.attributes]) if (/^on/i.test(a.name)) n.removeAttribute(a.name);
    for (const a of ['href', 'src']) {
      const v = n.getAttribute && n.getAttribute(a);
      /* PREFIX, NOT SKIP - see the note beside this file's expression. */
      if (v && !/^(https?:|data:|mailto:|tel:|#|\\/)/.test(v)) n.setAttribute(a, '../../' + v);
    }
  });
  return JSON.stringify({ html: box.innerHTML, cls: document.body.className, missing,
    took: sels.length, kept: box.children.length });
})()`;
const r = await conn.send('Runtime.evaluate', { expression: expr, returnByValue: true }, sessionId);
const got = JSON.parse(r.result.value);

srv.stop(); br.stop();

if (got.missing.length) {
  console.error('НЕ ЗНАЙДЕНО на ' + screen + ': ' + got.missing.join(' '));
  process.exit(1);
}

const title = flag('title') || name;
const PAD = flag('pad');
const box = [MAX && `max-width:${MAX}px`, MAX && 'margin:0 auto',
  PAD && `padding:0 ${PAD}px`].filter(Boolean).join(';');
const open = box ? `<div style="${box}">` : '';
const close = box ? '</div>' : '';
const out = `<!doctype html>
<html lang="uk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
<!-- the frame loads the product's entry point and nothing of the showcase -->
<link rel="stylesheet" href="../../system/index.css">
<style>
  /* the frame IS the viewport, so a fixed panel has nothing to escape into */
  html,body{ margin:0; padding:0; background:var(--bg-page); }
  body{ min-height:100vh; }
</style>
</head>
<body${got.cls ? ` class="${got.cls}"` : ''}>
<!-- Built by tools/demo.mjs off design/${screen}.html - not retyped. The body class
     is the screen's own: an organism scoped to it draws nothing without it. -->
${open}${got.html}${close}
${STATE ? `<script>function FRAME_STATE(){ ${STATE} }</script>\n` : ''}<!-- The frame loads exactly what a coloured product screen loads, in the same order,
     and calls the same initialisers. Anything less and the demo is a photograph. -->
<script src="../../../wireframes/_nav.js"></script>
<script src="../../system/theme.js"></script>
<script src="../../system/icons.js"></script>
<script src="../../system/marks.js"></script>
<script src="../../system/fields.js"></script>
<script src="../../system/menu.js"></script>
<script src="../../_nav.js"></script>
<script src="_boot.js"></script>
</body>
</html>
`;
writeFileSync(join(ROOT, 'design/kit/demo', name + '.html'), out);
console.log(`design/kit/demo/${name}.html  ·  body="${got.cls}"  ·  узято ${got.kept} вузлів за ${got.took} селектор(ами)`);
