/* The motion row of a stand page's «Токени» table, rebuilt FROM the component's
   css rather than edited by hand. `roles.mjs` is the check; this is the repair,
   and it is a rule so the next step does not retype fifteen tables. */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { readdirSync } from 'node:fs';
const ROOT = '/Users/sergiyshevchenko/Claud Projects/Stack sportpit/';
const decomment = css => css.replace(/\/\*[\s\S]*?\*\//g, '');
const MOTION = /--(dur|ease|move)-[a-z]+/g;
let touched = 0, added = 0;
for (const dir of ['design/system/components/', 'design/system/patterns/']) {
  for (const f of readdirSync(ROOT + dir).filter(x => x.endsWith('.css'))) {
    const name = f.replace('.css', '');
    const page = ROOT + 'design/kit/' + name + '.html';
    if (!existsSync(page)) continue;
    const css = decomment(readFileSync(ROOT + dir + f, 'utf8'));
    const used = [...new Set((css.match(MOTION) || []))].sort();
    let html = readFileSync(page, 'utf8');
    const cells = used.map(t => `<code>${t}</code>`).join(' ');
    const row = `<tr><td><span class="kp-none">–</span></td><td>${cells}</td></tr>`;
    /* the existing motion row: the only <tr> whose first cell is the em-less dash
       AND whose second cell holds a motion token */
    const re = /<tr><td><span class="kp-none">–<\/span><\/td><td>((?:<code>--(?:dur|ease|move)-[a-z]+<\/code>\s*)+)<\/td><\/tr>/;
    if (re.test(html)) {
      const now = html.match(re)[0];
      if (now === row) continue;
      html = html.replace(re, row); touched++;
    } else {
      if (!used.length) continue;
      /* no motion row yet - put one at the end of the Токени table body */
      const i = html.indexOf('kp-sh">Токени');
      if (i < 0) { console.log('  ! no token table:', name); continue; }
      const j = html.indexOf('</tbody>', i);
      if (j < 0) { console.log('  ! no tbody:', name); continue; }
      html = html.slice(0, j) + row + '\n' + html.slice(j); added++;
    }
    writeFileSync(page, html);
    console.log((used.length ? '  ' : '  - ') + name.padEnd(18), used.join(' '));
  }
}
console.log(`\n  рядків переписано: ${touched} · додано: ${added}`);
