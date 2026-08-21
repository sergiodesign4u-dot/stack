/* tools/paths.mjs - DOES THE FILE THIS SENTENCE NAMES STILL EXIST.

   Stage 09 step 6. `CLAUDE.md` is the one file every session reads before doing
   anything, and its line about the value chain named `design/_theme.css` - a file
   that does not exist and, going by the git history, has not existed since the
   stage that wrote the line. Two instruments had just finished a full critique
   pass over the repository and neither reported it: `links.mjs` reads html
   attributes, so a path inside md prose is invisible to it, and Codex was asked
   about status, language and numbers in that file, not about whether its paths
   resolve. A rule file that points at a dead path teaches the dead path.

   THE SUBJECT IS PROSE, NOT MARKUP, and that is what makes it a different
   instrument rather than a flag on the old one. A path in md is written inside
   backticks, has no base directory of its own and is resolved against the
   REPOSITORY, because that is how a human reads it. `design/system/tokens.css`
   is a path; `tokens.css` alone is a NAME, and asking the file system about a
   name would report every generic mention as a defect - which is the failure
   mode this file was written to avoid, not to have.

   WHAT COUNTS AS A PATH: it contains a slash, or it is a dotfile-style name that
   the repository root actually carries. Everything else is prose.

   THE ABSENT FILE IS DECLARED, NOT SILENCED, and it comes in two kinds.
   ONE: it existed and was deleted. `design/kit/kit.css` is named on purpose in
   three documents - it is the middle step of the value line and every token in
   `tokens.css` cites it.
   TWO: it never existed here, and a document says so. Stage 10 step 3 wrote «there
   is no `shell.html` in this project», because the method assumes one; the sentence
   is ABOUT the absence, which is the same shape as `docs/decisions.md` quoting the
   em dash it forbids.
   Both live in KNOWN_GONE with a reason, and KNOWN_GONE has an IDLE CONTROL - an
   entry that no longer appears anywhere is reported as loudly as a dead path,
   because a stale exemption is how a list like this rots.

   TWO WRONG VERSIONS, AND THEY ARE MIRROR IMAGES OF EACH OTHER.
   The first resolved a path against the md's OWN directory, the way `links.mjs`
   resolves an href. That is right for markup and wrong for prose:
   `design/kit/docs/architecture.md` mentioning `design/system/tokens.css` means
   the repository's copy, not `design/kit/docs/design/system/tokens.css`. It
   reported 61 dead paths, every one of them alive.
   The second resolved everything against the REPOSITORY ROOT instead, and broke
   in the opposite direction: it reported 150, and almost every one was a path
   written from a context the sentence had already established -
   `ia/docs/sitemap.md` says `pages/home.md` and means its own `pages/`,
   `docs/decisions.md` says `system/index.css` and means `design/system/`.
   THE ANSWER IS THE ONE `links.mjs` ALREADY WROTE DOWN, and it took a second
   instrument to notice it applies here too: a path in prose is a TAIL, not an
   address. Drop the `../` run, keep the rest, and find the file in this
   repository whose path ENDS with it. One or more survivors and the sentence
   points at something real; none, and the file is gone. Nothing is resolved
   against a directory at all, which is why neither wrong version can come back.

     node tools/paths.mjs        every md in the project
*/
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROOT } from './lib.mjs';

/* path -> why it is named though it is gone. An entry that matches nothing is a defect. */
const KNOWN_GONE = {
  'design/kit/shell.html': 'never existed in this project. The stage 10 method assumes an assembled shell page; responsive.md says out loud that there is none, and the shell lives as header.html + tabbar.html instead',
  'design/kit/kit.css': 'the flat sheet of stage 07, deleted at 8.8; DESIGN.md keeps it in the drawn value chain as a dead middle step, with the reason beside it, because every token in tokens.css cites the declaration it came from',
  'design/system.html': 'tools/README.md quotes it as the 404 an early sweep produced - the sentence is ABOUT the dead path, the same shape as decisions.md quoting the em dash it forbids',
  'home-buyer/cart/coach.html': 'voice/docs/microcopy.md writes three screen names in one shorthand; it is an enumeration, not a path, and no guard on segment shape separates it from a real one without guessing',
  'design/content-loyalty.html': 'backlog.md names it inside the step-6 withdrawals: an isolated audit agent reported a finding on it and the page does not exist - the loyalty screen in colour is account-loyalty.html, and content-loyalty is one of the fifty still grey. The sentence is ABOUT the missing file, the same shape as tools/README.md quoting design/system.html',
  /* the three NAMES stage 06 asked the owner to save the plates under. They came back
     numbered (-1, -2, -3) and a fourth direction appeared that this instruction never
     knew about; the README records both and keeps the instruction as it was given. */
  'design/concept/assets/brand-plate-a.png': 'the name stage 06 asked for; what landed is brand-plate-a-1/-2.png, recorded in the same README',
  'design/concept/assets/brand-plate-b.png': 'the name stage 06 asked for; what landed is brand-plate-b-1/-2.png, recorded in the same README',
  'design/concept/assets/brand-plate-c.png': 'the name stage 06 asked for; what landed is brand-plate-c-1/-2/-3.png, recorded in the same README',
};

/* A RECORD NAMES HISTORY; A RULE NAMES AN ADDRESS, and that is the whole of the
   subject question. `docs/decisions.md` says `research/docs/flows.md` because
   that is what the file was called on the day the decision was taken, and
   rewriting it would falsify the record. A live document - a rulebook, a spec, a
   registry, a README that tells you where to go - has no such licence: every
   path in it is an instruction, and a dead instruction is a defect.
   So the record files are named out loud rather than filtered by a guess, and
   the list has its own idle control below. 37 of the first run's findings sat in
   these six files and every one of them was correct AS HISTORY. */
const RECORD = [
  'docs/decisions.md',
  'docs/critique-alignment.md',
  'design/kit/docs/consolidation.md',
  'design/kit/docs/pixel-proof.md',
  'wireframes/docs/screens.md',
];
const isRecord = f => RECORD.includes(f) || f.startsWith('docs/playbook/');

const walk = d => readdirSync(d).flatMap(n => {
  if (n === '.git' || n === 'node_modules') return [];
  const p = join(d, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const ALL = walk(ROOT).map(p => relative(ROOT, p));
const MD = ALL.filter(p => p.endsWith('.md')).sort();
const rootNames = new Set(readdirSync(ROOT));

const dead = [], used = new Set(), recorded = [];
let scanned = 0;

for (const f of MD) {
  const src = readFileSync(join(ROOT, f), 'utf8');
  const rec = isRecord(f);
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    for (const m of lines[i].matchAll(/`([^`\n]+)`/g)) {
      let raw = m[1].trim();
      if (/[\s(){}<>|*?]/.test(raw)) continue;          /* a command, a selector, a sentence */
      if (!/\.[a-z0-9]{2,5}$/i.test(raw)) continue;      /* not a file name at all */
      const p = raw.replace(/^(\.\.?\/)+/, '');
      const isPath = p.includes('/') || rootNames.has(p);
      if (!isPath) continue;                             /* a NAME, not a path - prose */
      /* a shorthand enumeration is not a path: `listing-empty/-loading/-error.html`,
         `.acc/.accnav/.snap`, `home-buyer/cart/coach.html`. A real segment never
         starts with `-` and never starts with a dot in the middle of a path. */
      if (p.split('/').slice(1).some(seg => /^[-.]/.test(seg))) continue;
      scanned++;
      if (existsSync(join(ROOT, p))) continue;
      if (ALL.some(x => x === p || x.endsWith('/' + p))) continue;   /* the tail resolves */
      if (KNOWN_GONE[p]) { used.add(p); continue; }
      (rec ? recorded : dead).push(f + ':' + (i + 1) + '  -> ' + raw);
    }
  }
}

const idle = Object.keys(KNOWN_GONE).filter(k => !used.has(k));
const idleRec = RECORD.filter(r => !MD.includes(r));

console.log(MD.length + ' md · ' + scanned + ' шляхів названо · МЕРТВИХ: ' + dead.length);
if (dead.length) { console.log('\nШЛЯХ У ПРОЗІ, ЯКОГО НА ДИСКУ НЕМАЄ:'); for (const d of dead) console.log('  ' + d); }
console.log('\nу файлах-записах, де мертва назва це історія, а не адреса: ' + recorded.length +
  '  (' + RECORD.length + ' файлів + docs/playbook/)');
console.log('\nсвідомо названі відсутні (' + Object.keys(KNOWN_GONE).length + '), зустрілись: ' +
  [...used].length);
for (const [k, why] of Object.entries(KNOWN_GONE)) console.log('  ' + (used.has(k) ? '·' : '!') + ' ' + k + '  - ' + why);
if (idle.length) console.log('\nХОЛОСТИЙ ВИНЯТОК - запис не покриває нічого (' + idle.length + '): ' + idle.join(' '));
if (idleRec.length) console.log('ХОЛОСТИЙ ЗАПИС - файл зі списку RECORD не існує (' + idleRec.length + '): ' + idleRec.join(' '));

process.exit(dead.length || idle.length || idleRec.length ? 1 : 0);
