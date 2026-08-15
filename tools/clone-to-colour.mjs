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
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
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
const SCRIPTS_NEW = [
  '<script src="../wireframes/_nav.js"></script>',
  '<script src="system/icons.js"></script>',
  '<script src="system/marks.js"></script>',
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
  s = s.replace(/class="([^"]*)"/g, (m, cl) => {
    const t = cl.split(/\s+/).filter(Boolean);
    if (!t.includes('btn') || t.some(x => x.startsWith('btn--'))) return m;
    const rank = t.includes('dark') ? ['btn--accent', 'btn--s'] : ['btn--outline', 'btn--s'];
    return 'class="' + [...rank, ...t].join(' ') + '"';
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

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const names = args.filter(a => !a.startsWith('-'));
if (!names.length) { console.log('usage: node tools/clone-to-colour.mjs [--dry] <name>...'); process.exit(2); }

let bad = 0;
for (const n of names) {
  const src = join(ROOT, 'wireframes', n + '.html');
  const dst = join(ROOT, 'design', n + '.html');
  if (!existsSync(src)) { console.log(`SKIP  ${n}  no grey original`); bad++; continue; }
  if (existsSync(dst) && !dry) { console.log(`SKIP  ${n}  design/ copy already exists`); continue; }
  const r = transform(readFileSync(src, 'utf8'), n);
  if (r.notes.length) bad++;
  if (!dry) writeFileSync(dst, r.out);
  console.log((r.notes.length ? 'WARN  ' : 'ok    ') + n.padEnd(28)
    + `seps=${String(r.seps).padEnd(2)} btns=${String(r.buttons).padEnd(2)} passes=${r.passes.length}`
    + (r.notes.length ? '   ' + r.notes.join(' | ') : ''));
}
console.log('\n' + names.length + ' screens, ' + bad + ' with warnings' + (dry ? '  (dry run, nothing written)' : ''));
process.exit(bad ? 1 : 0);
