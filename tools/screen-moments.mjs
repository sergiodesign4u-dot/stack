/* tools/screen-moments.mjs - ЕКРАН -> МОМЕНТИ, вироблено, а не вигадано.
   ------------------------------------------------------------------------
   Стаття 11.6. Інвентар моментів відсортований за ПОДІЯМИ, а розкотка на етапі
   12 питатиме про ЕКРАН, і рядка з його іменем у такій таблиці немає за
   побудовою. Цей зріз збирається механічно: беруться якорі компонентів з
   `inventory.md`, шукаються в розмітці кожного екрана СІРОГО корпусу (він і є
   продуктом: 142 екрани проти 92 кольорових), і кожен знайдений компонент
   приносить із собою свій рядок «Рух».

   ЧОМУ СІРИЙ КОРПУС. Кольоровий це вибірка. Етап 12 збирає решту, тож рядок
   потрібен саме на ті екрани, яких у кольорі ще немає - інакше таблиця покриває
   те, що вже зроблено, і мовчить про те, заради чого її пишуть.

   СПІЛЬНІ КОМПОНЕНТИ НАЗИВАЮТЬСЯ ОДИН РАЗ. Хедер, футер, таб-бар, тост, оверлеї
   і діалоги малює `wireframes/_nav.js` на КОЖНОМУ екрані. Якби вони входили в
   кожен рядок, таблиця з 142 рядків складалась би на три чверті з однієї й тієї
   самої фрази, і рядок екрана перестав би читатись. Вони винесені в шапку
   розділу, а рядок екрана несе те, що є ТІЛЬКИ на ньому.

   ХИБНА ВЕРСІЯ 1: ЯКОРІ БРАЛИСЬ ЯК Є, І ОДНОСИМВОЛЬНІ ЗБІГАЛИСЬ ЗІ ВСІМ.
   `.h`, `.on`, `.cnt` як підрядок трапляються всередині сотні інших класів, тож
   перший прогін давав 40 компонентів на кожному екрані. Клас шукається як ЦІЛЕ
   слово всередині атрибута class, а не як підрядок файла.

   ХИБНА ВЕРСІЯ 2: «ЕКРАН БЕЗ МОМЕНТІВ» ПИСАВСЯ ПОРОЖНІМ РЯДКОМ. Порожньо і
   «руху немає» виглядають однаково, а значать різне: перше це недогляд приладу,
   друге це вердикт. Тепер такий екран отримує явне «руху немає» і причину. */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './lib.mjs';

const inv = readFileSync(join(ROOT, 'design/kit/docs/inventory.md'), 'utf8');
const comps = [];
for (const line of inv.split('\n')) {
  if (!line.startsWith('|') || !line.includes('`')) continue;
  const cells = line.split('|');
  if (cells.length < 8) continue;
  const file = (cells[2].match(/`([a-z0-9-]+\.css)`/) || [])[1];
  if (!file) continue;
  const anchors = [...cells[3].matchAll(/`\.([a-zA-Z][\w-]*)`/g)].map(m => m[1]);
  const job = cells[cells.length - 5].trim();
  comps.push({ file, name: cells[1].trim(), anchors, job });
}

const moving = comps.filter(c => !c.job.startsWith('немає'));
const shared = new Set(['header.css', 'footer.css', 'tabbar.css', 'toast.css', 'overlay.css',
  'auth-dialog.css', 'city-dialog.css', 'cookie-banner.css', 'nav-drawer.css', 'mega-menu.css',
  'cat-overlay.css', 'review-modal.css', 'menu.css', 'filter-sheet.css', 'client-dialog.css']);

const screens = readdirSync(join(ROOT, 'wireframes'))
  .filter(f => f.endsWith('.html')).sort();

const hasClass = (html, cls) =>
  new RegExp('class="[^"]*(^|[\\s"])' + cls.replace(/[-]/g, '\\-') + '($|[\\s"])', 'i').test(html)
  || new RegExp('\\bclass="[^"]*\\b' + cls.replace(/[-]/g, '\\-') + '\\b', 'i').test(html);

const rows = [];
for (const f of screens) {
  const html = readFileSync(join(ROOT, 'wireframes/' + f), 'utf8');
  const own = moving.filter(c => !shared.has(c.file) && c.anchors.some(a => hasClass(html, a)));
  rows.push({ screen: f, own });
}

const lines = [];
lines.push('| екран | моменти, що є ТІЛЬКИ на ньому |');
lines.push('|---|---|');
for (const r of rows) {
  const cell = r.own.length
    ? r.own.map(c => `${c.name} (\`${c.file}\`, ${c.job})`).join(' · ')
    : '**руху немає** - на екрані стоять лише спільні компоненти шапки й підвалу, і всі їхні моменти перелічені вище';
  lines.push(`| \`${r.screen}\` | ${cell} |`);
}
const out = lines.join('\n');
if (process.argv.includes('--write')) {
  const p = join(ROOT, 'design/kit/docs/motion.md');
  let md = readFileSync(p, 'utf8');
  const START = '<!-- ЕКРАН -> МОМЕНТИ: генерується tools/screen-moments.mjs --write -->';
  const END = '<!-- /ЕКРАН -> МОМЕНТИ -->';
  const block = START + '\n\n' + out + '\n\n' + END;
  md = md.includes(START)
    ? md.replace(new RegExp(START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), block)
    : md.trimEnd() + '\n\n' + block + '\n';
  writeFileSync(p, md);
  console.log('записано в motion.md');
}
console.log(`\nекранів: ${rows.length} · із власними моментами: ${rows.filter(r => r.own.length).length} · «руху немає»: ${rows.filter(r => !r.own.length).length}`);
console.log(`компонентів із роботою: ${moving.length}, з них спільних (названі один раз): ${moving.filter(c => shared.has(c.file)).length}`);
