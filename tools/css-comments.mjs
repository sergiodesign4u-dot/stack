/* tools/css-comments.mjs - the orphan comment terminator, caught by a machine.

   THE BUG. An edit inserts a comment END in the middle of an existing comment.
   The prose after it falls outside the comment and the original terminator is
   orphaned. It happened three times in one session.

   WHY IT NEEDS A TOOL AND JAVASCRIPT DOES NOT. In `.js` the file stops parsing
   and `node --check` says so within a second, which is how the first two were
   caught. In CSS **nothing says anything**: there is no parse error, the parser
   drops declarations until it finds its footing and carries on. The third one
   survived to a screen - three plan prices quietly rendering in the wrong face -
   and was found only because a browser check happened to be reading those three.

   The stylesheets in this project carry more prose than most carry rules, which
   is deliberate and is exactly what makes this failure likely. One second of
   checking against a whole class of silent damage.

   CSS ONLY, ON PURPOSE. The first version ran over `.js` too and reported a line
   in `design/_nav.js` that is a regex literal whose last two characters are the
   two that end a comment. Telling a regex from a division sign is the hard part
   of lexing JavaScript, `node --check` already cannot be fooled, and an
   instrument that reports a correct line trains you to ignore it.

     node tools/css-comments.mjs                 every .css in the repo
     node tools/css-comments.mjs path/to/one.css                                */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROOT } from './lib.mjs';

function everyCss(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (e === '.git' || e === 'node_modules') continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) everyCss(p, out);
    else if (e.endsWith('.css')) out.push(p);
  }
  return out;
}

const files = process.argv.length > 2 ? process.argv.slice(2) : everyCss(ROOT);
const OPEN = '/' + '*', CLOSE = '*' + '/';
let bad = 0;

for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const name = relative(ROOT, f) || f;
  /* a tiny state machine: inside a string a comment marker means nothing */
  let i = 0, opens = [], state = 'code', line = 1;
  while (i < src.length) {
    const c = src[i], two = src.slice(i, i + 2);
    if (c === '\n') line++;
    if (state === 'code') {
      if (two === OPEN) { opens.push(line); state = 'block'; i += 2; continue; }
      if (two === CLOSE) { console.log(name + ':' + line + '  ORPHAN ' + CLOSE + ' - a comment ended twice'); bad++; i += 2; continue; }
      if (c === "'" || c === '"') { state = c; i++; continue; }
    } else if (state === 'block') {
      if (two === CLOSE) { opens.pop(); state = 'code'; i += 2; continue; }
    } else {
      if (c === '\\') { i += 2; continue; }
      if (c === state) state = 'code';
    }
    i++;
  }
  if (state === 'block') { console.log(name + ':' + opens[opens.length - 1] + '  UNCLOSED ' + OPEN); bad++; }
}
console.log(bad ? '\n' + bad + ' broken of ' + files.length + ' files'
                : files.length + ' stylesheets, all comments balanced');
process.exit(bad ? 1 : 0);
