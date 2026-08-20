/* tools/clone-to-colour.mjs - take a grey screen into the coloured layer.

   This transform has now been run by hand three times - step 8.7 (three coach
   screens), step 8.13 (two empty states), and step 8.14 (the rest of the states
   the grey layer already draws) - and each time it was retyped from memory. Both
   earlier runs shipped a defect that came from the retyping and not from the
   screens:

     8.7   the clone cut each screen's OWN inline script, so `coach-tariff`'s
           cancel dialog could not open - a ReferenceError on a live control.
     8.13  the rule for a plain `class="btn"` was written `class="btn"(?! )`, a
           negative lookahead forbidding the space that ALWAYS follows a closing
           attribute quote. It matched nothing and «До каталогу» rendered as bare
           text, which is exactly the defect step 7.96 found on three coach
           controls: `button.css` has no `.btn` rule, so an unranked button is
           invisible furniture.

   So the transform is a file, and every rule in it says what it is for.

   WHAT IT DOES NOT DO, and this is the important half. It does not touch a word.
   Interface strings belong to `voice/docs/microcopy.md` and the grey screen is
   already carrying the voice's own edition of them; colouring a screen is not an
   occasion to reopen its copy. It does not touch `wireframes/` at all - that
   layer is frozen after stage 05 and colour never lands on it.

     node tools/clone-to-colour.mjs --dry <name> [name...]     report, write nothing
     node tools/clone-to-colour.mjs <name> [name...]           write design/<name>.html
                                                                                */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './lib.mjs';

const HEAD_OLD = '<link rel="stylesheet" href="_wf.css">';
const HEAD_NEW = [
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">',
  '<link rel="stylesheet" href="system/index.css">',
  '<!-- stand chrome only, never part of the system: see design/_stand.css -->',
  '<link rel="stylesheet" href="_stand.css">',
].join('\n');

/* the grey layer loads one script; the coloured layer loads the SAME one first -
   the builder is shared and frozen - then the system and the colour pass on top. */
const SCRIPTS_OLD = '<script src="_nav.js"></script>';
/* THE LIST WAS SHORT BY TWO, and stage 09 step 5 is where that showed. Every
   coloured screen of the listing family loads FIVE of the system's scripts;
   this transform wrote three. `theme.js` applies the stored theme in the head
   before the first paint, so a screen without it flashes light on every load for
   a person who chose dark - and nothing in a settled-page probe can see a flash.
   `menu.js` drives the sort dropdown, so without it the control is furniture.
   Neither absence raises anything: the screen loads, renders and passes every
   gate, and the defect is only visible to someone comparing it with a screen
   that has them. */
const SCRIPTS_NEW = [
  '<script src="../wireframes/_nav.js"></script>',
  '<script src="system/theme.js"></script>',
  '<script src="system/icons.js"></script>',
  '<script src="system/marks.js"></script>',
  '<script src="system/menu.js"></script>',
  '<script src="system/fields.js"></script>',
  '<script src="_nav.js"></script>',
].join('\n');

/* Which colour pass a screen needs is decided by what its own script already
   calls, not by a list of screen names.

   AND THE FIRST VERSION OF THIS TABLE INVENTED A FUNCTION. It paired
   `wfCoachNav(` with `uivCoach()`, which is not a function in this product and
   never has been - the coach screens that were coloured at 7.95 and 8.7 call
   exactly three passes and no fourth. Twelve screens loaded with
   `Uncaught ReferenceError: uivCoach is not defined`. That is the same defect
   `tools/states.mjs` paid three versions to learn and its header warns about by
   name, repeated inside the file that was written to stop hand-typed lists.
   A name that is not read out of the product is a guess wearing a table's
   clothes, so this table is now checked against `design/_nav.js`: every call
   here must exist there as `function <name>(`. */
const PASSES = [
  [/wfAccountNav\s*\(/, 'uivAccount()'],
];
const NAV = readFileSync(join(ROOT, 'design', '_nav.js'), 'utf8');
for (const [, call] of PASSES) {
  const fn = call.replace('()', '');
  if (!new RegExp('function\\s+' + fn + '\\s*\\(').test(NAV))
    throw new Error(`PASSES names ${fn}, which design/_nav.js does not declare`);
}
for (const fn of ['uivFixLinks', 'uivBar', 'uivChrome'])
  if (!new RegExp('function\\s+' + fn + '\\s*\\(').test(NAV))
    throw new Error(`the base passes name ${fn}, which design/_nav.js does not declare`);

export function transform(src, name) {
  const notes = [];
  let s = src;

  if (!s.includes(HEAD_OLD)) notes.push('NO _wf.css LINK - head not swapped');
  s = s.replace(HEAD_OLD, HEAD_NEW);

  if (!s.includes(SCRIPTS_OLD)) notes.push('NO _nav.js TAG - scripts not swapped');
  s = s.replace(SCRIPTS_OLD, SCRIPTS_NEW);

  /* the crumb separator is DRAWN by the coloured stylesheet; a typed one renders
     twice, which is the defect the acceptance gate checks for by name. */
  const seps = (s.match(/<span class="sep">\/<\/span>/g) || []).length;
  s = s.replace(/<span class="sep">\/<\/span>/g, '<span class="sep"></span>');

  /* THE BUTTON RANKS. The grey layer says WHICH control is primary by adding
     `dark`; it never says how a button is drawn, because it draws none. The
     coloured layer's `button.css` has NO `.btn` rule - the finish IS the rank -
     so a control that arrives wearing only `btn` renders as bare text.

     AND THE FIRST VERSION MATCHED WHOLE STRINGS, WHICH LET 36 CONTROLS THROUGH.
     It read `class="btn"` and `class="btn dark"` exactly, so every button
     carrying a utility class beside them - `btn qa-add`, `btn cs-save`,
     `btn dark cs-go` - kept the grey markup and rendered as bare text on 13
     coloured screens. Same shape as the 8.13 lookahead recorded above: a pattern
     tight enough to be right about the case in front of it and wrong about the
     set. It now matches `btn` as a TOKEN, wherever it sits in the attribute.

     THE DEFAULT HERE IS A STARTING RANK, NOT THE DECISION. A state screen must
     take the rank its BASE settled on, and the base often disagrees with `dark`:
     `cs-go`, `co-new` and `cgo-btn` are `dark` in the grey layer and
     `btn--outline` in the coloured base, because the review at 7.95 and 8.7
     decided there is one accent fill per screen and these were not it. Run
     `node tools/btn-rank.mjs` after a clone: it reads the base and overwrites
     this default wherever the base has an answer. */
  const before = (s.match(/class="[^"]*\bbtn\b[^"]*"/g) || [])
    .filter(c => !/\bbtn--/.test(c)).length;
  /* AND `dark` IS INPUT TO THIS TRANSFORM, NOT OUTPUT. It is the grey layer's
     word for «primary» and no stylesheet under `design/` declares `.dark` at
     all, so carrying it into the result wrote a class that paints nothing -
     **105 of them on 57 screens** by 2026-08-15, every one on a control that had
     since been given a real rank. Once the rank has been read off it, the word
     has said everything it has to say. Swept out of what already shipped by
     `btn-rank.mjs`, which owns button class attributes in `design/*.html`. */
  s = s.replace(/class="([^"]*)"/g, (m, cl) => {
    const t = cl.split(/\s+/).filter(Boolean);
    if (!t.includes('btn') || t.some(x => x.startsWith('btn--'))) return m;
    /* THE SIZE WAS INVENTED HERE, and stage 09 step 5 measured what it cost. This
       line added `btn--s` to every control it ranked - a 40px button - while the
       accepted twin `listing-empty.html` writes `btn--accent btn` with no size at
       all and gets `button.css`'s own 52px. So the main action of an empty state
       came out UNDER the 44px touch target on every screen this transform ever
       cloned, and nothing said so: the button is ranked, visible and clickable.
       The rank is read off the grey layer's `dark`; the SIZE is not the grey
       layer's to give, so it is not given. A screen that wants a small control
       says so through `--like`, from a twin that already made that decision. */
    const rank = t.includes('dark') ? ['btn--accent'] : ['btn--outline'];
    return 'class="' + [...rank, ...t.filter(x => x !== 'dark')].join(' ') + '"';
  });
  const left = (s.match(/class="[^"]*\bbtn\b[^"]*"/g) || [])
    .filter(c => !/\bbtn--/.test(c)).length;
  const ranked = before - left;
  if (left) notes.push(`BUTTONS ${before} found, ${ranked} ranked, ${left} STILL BARE`);

  /* a token the split renamed, and the grey layer still speaks the old name */
  s = s.replace(/var\(--strong\)/g, 'var(--text-primary)');

  /* THE SCOPE CLASS IS NOT SET HERE, AND THAT OMISSION COST 23 SCREENS.
     Step 7.95 scoped every selector of the coach components - `.coach .qa-row`,
     360 occurrences across 18 files - and put the class on `<body>` by hand on
     the eleven screens it coloured. This transform reads `wireframes/`, and the
     grey layer has NO body class at all: 142 files, 142 bare `<body>` tags. So
     every state screen cloned at 8.13 and 8.14 arrived outside the scope, and
     the whole coach layer of the system was inert on it - not overridden, not
     outranked, never matching. It looked fine, because the clone brings the grey
     screen's private `<style>` along and that was the only paint on the page.
     It failed the 360 gate on four screens, and the failure was written up as a
     specificity problem, which it was not.
     THE FIX BELONGS TO `tools/scope.mjs`, NOT HERE, and the reason is that this
     file cannot know: the scope is a property of the CSS, not of the markup
     being copied. `scope.mjs` asks the browser whether the class changes
     anything and reads WHOSE scope it is off `wfBar('<base>.html', ...)`. Run
     `node tools/scope.mjs --apply` after any clone. */

  /* THE SCREEN'S OWN SCRIPT IS KEPT WHOLE and the colour passes are APPENDED to
     it. 8.7 replaced the block instead and took a live dialog out with it. */
  const wants = ['uivFixLinks()', 'uivBar()', 'uivChrome()']
    .concat(PASSES.filter(([re]) => re.test(s)).map(([, call]) => call));
  /* APPEND AT THE END OF THE LAST SCRIPT BLOCK, not after `wfBar(...)` on a line
     of its own. The first version anchored on `\n\s*wfBar\(` and warned on all 35
     screens at once, which is the shape of a wrong pattern rather than of 35
     broken files: these screens write `wfFooter(); wfBar('x.html', 'empty');` on
     ONE line, so `wfBar` is never at the start of one. A rule that fails on
     every single input is never telling you about the inputs. */
  const i = s.lastIndexOf('</script>');
  if (i < 0 || !/wfBar\s*\(/.test(s)) notes.push('NO wfBar() - colour passes not appended');
  /* SEMICOLONS BETWEEN THE CALLS. The first write joined on a space and produced
     `uivFixLinks() uivBar() uivChrome();` - a SyntaxError that took out the whole
     inline block, so all 35 screens loaded with zero icons and no colour pass at
     all. The acceptance gate reported every one of them in a single run, which is
     the argument for a gate that walks everything rather than a spot check. */
  else s = s.slice(0, i) + '  ' + wants.join('; ') + ';\n' + s.slice(i);

  return { out: s, notes, seps, buttons: ranked, passes: wants };
}


/* ---------------------------------------------------------------- --like ----
   A CONTROL THAT NEVER GOT `btn` IS INVISIBLE TO `btn-rank.mjs`, and stage 09
   step 5 walked straight into it. That checker asks «which control wearing `btn`
   has no finish»; it cannot ask «which control SHOULD be wearing one and is
   not». Cloning `goal` produced a screen whose every control - the filter
   buttons, the favourite, the cart button - carried its product class and
   nothing else, so `button.css` painted none of them and the checker reported
   «без рангу: 0». Zero, because it was looking at an empty set.

   THE FINISH IS STILL NOT CHOSEN HERE. `--like <screen>` names an ALREADY
   COLOURED screen of the same template, and the map is read off it: for every
   class attribute, the finish tokens (`btn--*`, sizes) keyed by the remaining
   utility classes. `goal` is the listing template with a goal scope - that
   relation is recorded in `wireframes/docs/screens.md`, which says 2.2 «reuses
   it with goal H1/scope + its own empty/loading/error» - so `listing` is its
   reference and the finishes come from a screen that was accepted.

   AND IT NEVER OVERWRITES. An element that already carries a `btn--*` is left
   alone and reported, because a screen is allowed to disagree with its base:
   `btn-rank.mjs` records three such decisions on `home-*`, where `.pt` keeps
   `btn--outline` while `index` draws `btn--accent`. A map that overwrites would
   erase exactly the decisions this repository writes down. */
const RANKS = new Set(['btn--accent', 'btn--outline', 'btn--ghost', 'btn--text', 'btn--danger']);
const EXTRAS = new Set(['btn--s', 'btn--l', 'btn--icon', 'btn--full', 'btn--inline', 'btn--stack', 'btn']);
const isFinish = c => RANKS.has(c) || EXTRAS.has(c);
/* A STATE IS NOT AN IDENTITY, and the first version of this map forgot it.
   `listing.html` carries both `class="btn--outline btn--icon btn--s on"` and
   `class="on"` - a ranked control that happens to be current, and the view
   toggle's active cell. Keyed on the bare word, the map read the first as the
   definition of «on» and painted the second with it: a view-toggle cell became
   a small outline icon button on four screens. The key is built from identity
   classes only, and a key that empties out is not a key. */
/* AND A VARIANT IS NOT A STATE EITHER, which the first list got wrong in the
   other direction: it put `notify` among the states, so `.cartbtn` and
   `.cartbtn.notify` collapsed into one key carrying two finishes and the whole
   entry was dropped as ambiguous - leaving every cart button on the new screen
   unranked, which is the very defect this map exists to prevent. `notify` changes
   what the control DOES («tell me when it is back» instead of «add to cart») and
   it takes `btn--outline` for that reason. Only genuinely transient words are
   states here. */
const STATE = new Set(['on', 'off', 'open', 'active', 'current', 'cur', 'selected',
  'done', 'err', 'ok', 'wait']);
const keyOf = t => t.filter(c => !isFinish(c) && !STATE.has(c)).sort().join(' ');

function finishMap(html) {
  const seen = new Map(), bad = new Set();
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    const t = m[1].split(/\s+/).filter(Boolean);
    const fin = t.filter(isFinish);
    if (!fin.some(x => RANKS.has(x))) continue;
    const key = keyOf(t);
    if (!key) continue;
    const val = fin.join(' ');
    /* AN AMBIGUOUS KEY IS DROPPED, NOT GUESSED. One identity wearing two finishes
       on the reference means the finish depends on something this map cannot see,
       and first-wins would ship that guess to every screen it touches. */
    if (seen.has(key) && seen.get(key) !== val) { bad.add(key); continue; }
    seen.set(key, val);
  }
  for (const k of bad) seen.delete(k);
  const map = new Map([...seen].map(([k, v]) => [k, v.split(' ')]));
  map.ambiguous = [...bad];
  return map;
}

function applyFinish(html, map, log, page) {
  return html.replace(/class="([^"]*)"/g, (whole, val) => {
    const t = val.split(/\s+/).filter(Boolean);
    if (t.some(c => RANKS.has(c))) return whole;          /* the screen already decided */
    const key = keyOf(t);
    const fin = key ? map.get(key) : null;
    if (!fin) return whole;
    log.push(page + '  .' + key.replace(/ /g, '.') + '  ->  ' + fin.join(' '));
    return 'class="' + fin.join(' ') + ' ' + t.filter(c => c !== 'btn').join(' ') + '"';
  });
}


/* ------------------------------------------------------- THE MENU CONTROL ----
   THE GREY LAYER DRAWS A DROPDOWN AS TEXT WITH AN ARROW TYPED AFTER IT, and the
   coloured layer has a component for it. `<span class="ctrl">Сортування: Популярні ▾</span>`
   is not a control: it cannot be focused, cannot be reached by Tab and announces
   nothing. Every coloured screen of this family writes the same three things
   instead - a real `<button type="button">`, the current value inside
   `<span class="menu-val">`, and no typed arrow, because `menu.css` draws the
   chevron and `menu.js` opens the list.

   The transform is narrow on purpose: it fires only on an element that already
   carries `ctrl` or `mc` AND ends in the typed `▾`. A wider rule would turn
   every label on the screen into a button. */
function menuControls(html, log, page) {
  let n = 0;
  html = html.replace(/<span class="([^"]*\bctrl\b[^"]*)">([\s\S]*?)<\/span>\s*(?=<)/g, (whole, cls, inner) => {
    if (!/\u25BE/.test(inner)) return whole;
    const cap = (inner.match(/<span class="cap">[\s\S]*?<\/span>/) || [''])[0];
    const val = inner.replace(/<span class="cap">[\s\S]*?<\/span>/, '').replace(/\u25BE/, '').trim();
    n++; log.push(page + '  span.ctrl -> button + menu-val  «' + val + '»');
    return '<button class="' + cls + '" type="button">' + cap + (cap ? ' ' : '') +
           '<span class="menu-val">' + val + '</span></button>';
  });
  html = html.replace(/<button class="([^"]*\bmc\b[^"]*)"([^>]*)>([^<]*\u25BE[^<]*)<\/button>/g, (whole, cls, rest, inner) => {
    const val = inner.replace(/\u25BE/, '').trim();
    n++; log.push(page + '  button.mc -> menu-val  «' + val + '»');
    const attrs = /type=/.test(rest) ? rest : rest + ' type="button"';
    return '<button class="' + cls + '"' + attrs + '><span class="menu-val">' + val + '</span></button>';
  });
  return { html, n };
}


/* ------------------------------------------------- THE MARK, TYPED AND DRAWN --
   THE GREY LAYER TYPES THE DOT, THE COLOURED LAYER DRAWS IT, and for four
   screens this transform shipped both. `wireframes/goal.html` writes
   `<div class="pavail in">● В наявності</div>`; `availability.css` draws that dot
   in a `::before`, so the coloured copy showed two - eleven times on one screen.
   `accept.mjs` caught it («dot=11 DOT:.pavail ●») because it asks the OUTPUT:
   an element whose own first text node starts with a mark AND whose `::before`
   has content is drawing it twice.

   WHICH CLASSES DRAW A MARK IS READ OUT OF THE STYLESHEETS, never listed here.
   A typed list would be right about `.pavail` today and wrong about the next
   component that grows a `::before` - the same failure mode as every hand-typed
   subject this repository has already paid for. */
function markClasses() {
  const set = new Set();
  const dir = join(ROOT, 'design/system/components');
  for (const f of readdirSync(dir).filter(x => x.endsWith('.css'))) {
    const css = readFileSync(join(dir, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const m of css.matchAll(/([^{}]+)::(?:before|after)\s*\{([^{}]*)\}/g)) {
      if (!/content\s*:/.test(m[2])) continue;
      const parts = m[1].split(',');
      for (const sel of parts) {
        const cls = [...sel.matchAll(/\.([A-Za-z][\w-]*)/g)].map(x => x[1]);
        if (cls.length) set.add(cls[cls.length - 1]);
      }
    }
  }
  return set;
}

function stripTypedMarks(html, set, log, page) {
  return html.replace(/(<[a-z]+[^>]*\sclass="([^"]*)"[^>]*>)\s*([\u25CF\u2713\u00B7\u2715])\s*/g,
    (whole, tag, cls, mark) => {
      if (!cls.split(/\s+/).some(c => set.has(c))) return whole;
      log.push(page + '  .' + cls.split(/\s+/)[0] + '  typed ' + mark + ' removed, the stylesheet draws it');
      return tag;
    });
}


/* ------------------------------------------- THE GREY LAYER'S OWN ANNOTATION --
   `.gnote` IS A NOTE TO WHOEVER READS THE PROTOTYPE, NOT A LINE OF THE PRODUCT.
   `badge.css` says so in writing and says what was done about it: «the coloured
   clone dropped it, correctly, which is why it renders on 0 of 39 coloured
   screens», and the class left the system at step 8.10. The accepted twin keeps
   the same rule as an HTML COMMENT - `listing.html:178`, «kept out of the visible
   UI». But the DROP had been done by hand, so this transform never learned it,
   and stage 09 step 5 shipped the annotation to a customer: 16px full-ink text,
   the loudest block in the lower half of the page, louder than the SEO body it
   sat above. One coloured screen out of forty rendered it - the new one.
   It becomes the comment the twin already carries. */
function dropGreyNotes(html, log, page) {
  return html.replace(/[ \t]*<p class="gnote">([\s\S]*?)<\/p>\s*/g, (whole, inner) => {
    log.push(page + '  .gnote -> comment (grey-layer annotation, badge.css 8.10)');
    return '      <!-- ' + inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 220) +
           '\n           Rule lives in the IA; kept out of the visible UI. -->\n';
  });
}

/* --------------------------------------------------- THE PAGINATION CELL ------
   `pagination.css` DRAWS NO CELL, AND THAT IS DELIBERATE. It declares the row
   (`display:flex; gap`), the disabled state and the fill of the current cell -
   because the cell IS a button, composed on the screen as
   `btn--outline btn--icon btn--s`. The finish map above cannot reach it: these
   links carry no identity class at all, so there is no key to read a finish
   from, and the first reading of this called it a hole in the component. It is
   not; it is classes the clone never wrote. Measured on the new screen against
   the twin: cells of 9.6 x 25.6px of bare text against 40 x 40, no
   `aria-current` on the current page, no name on the chevron, and Tab drawing
   Chrome's default blue outline on a warm neutral ground. */
function paginationCells(html, log, page) {
  return html.replace(/<div class="pages">([\s\S]*?)<\/div>/g, (whole, inner) => {
    let n = 0;
    const out = inner.replace(/<a([^>]*)>([\s\S]*?)<\/a>/g, (a, attrs, text) => {
      if (/class="/.test(attrs)) {
        attrs = attrs.replace(/class="([^"]*)"/, (c, v) =>
          'class="btn--outline btn--icon btn--s ' + v + '"' + (/\bon\b/.test(v) ? ' aria-current="page"' : ''));
      } else {
        attrs = ' class="btn--outline btn--icon btn--s"' + attrs;
      }
      const bare = text.replace(/<[^>]+>/g, '').trim();
      if (!/[0-9A-Za-zА-Яа-яІіЇїЄєҐґ]/.test(bare) && !/aria-label/.test(attrs))
        attrs += ' aria-label="' + (/\u2039|\u2190/.test(bare) ? 'Попередня сторінка' : 'Наступна сторінка') + '"';
      n++;
      return '<a' + attrs + '>' + text + '</a>';
    });
    if (n) log.push(page + '  .pages: ' + n + ' cells given the button finish, name and aria-current');
    return '<div class="pages">' + out + '</div>';
  });
}

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const LI = args.indexOf('--like');
const LIKE = LI > -1 ? args[LI + 1] : null;
const names = args.filter((a, i) => !a.startsWith('-') && i !== LI + 1);
const MAP = LIKE ? finishMap(readFileSync(join(ROOT, 'design', LIKE + '.html'), 'utf8')) : null;
const MARKED = markClasses();
const FLOG = [];
if (!names.length) { console.log('usage: node tools/clone-to-colour.mjs [--dry] <name>...'); process.exit(2); }

let bad = 0;
for (const n of names) {
  const src = join(ROOT, 'wireframes', n + '.html');
  const dst = join(ROOT, 'design', n + '.html');
  if (!existsSync(src)) { console.log(`SKIP  ${n}  no grey original`); bad++; continue; }
  if (existsSync(dst) && !dry) { console.log(`SKIP  ${n}  design/ copy already exists`); continue; }
  const r = transform(readFileSync(src, 'utf8'), n);
  if (MAP) r.out = applyFinish(r.out, MAP, FLOG, n);
  if (MAP) { const mr = menuControls(r.out, FLOG, n); r.out = mr.html; }
  r.out = stripTypedMarks(r.out, MARKED, FLOG, n);
  r.out = dropGreyNotes(r.out, FLOG, n);
  r.out = paginationCells(r.out, FLOG, n);
  if (r.notes.length) bad++;
  if (!dry) writeFileSync(dst, r.out);
  console.log((r.notes.length ? 'WARN  ' : 'ok    ') + n.padEnd(28)
    + `seps=${String(r.seps).padEnd(2)} btns=${String(r.buttons).padEnd(2)} passes=${r.passes.length}`
    + (r.notes.length ? '   ' + r.notes.join(' | ') : ''));
}
if (MAP) {
  console.log('\nfinish read off design/' + LIKE + '.html - ' + MAP.size + ' keys, ' + FLOG.length + ' controls ranked'
    + (MAP.ambiguous.length ? ', dropped as ambiguous: ' + MAP.ambiguous.join(' | ') : ''));
  for (const l of FLOG) console.log('   ' + l);
}
console.log('\n' + names.length + ' screens, ' + bad + ' with warnings' + (dry ? '  (dry run, nothing written)' : ''));
process.exit(bad ? 1 : 0);
