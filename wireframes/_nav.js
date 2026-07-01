/* ============================================================
   Stack — Wireframes navigation (_nav.js)
   ONE source of truth (mirrors wireframes/_screens.md).
   Powers: (a) the «Всі екрани» tree on index.html  → wfTree('id')
           (b) the thin prototype bar on each screen → wfBar('file.html')
   Flip built:true / add to builtStates as screens/states are drawn.
   ============================================================ */

const WF_STATE_LABEL = {
  base: 'Базовий', empty: 'Порожньо', loading: 'Завантаження', error: 'Помилка',
  filtered: 'З фільтром', oos: 'Немає в наявності', reviews: 'Відгуки (Job 3)',
  guest: 'Гість', declined: 'Оплата відхилена', noaddr: 'Без адреси',
  code: 'Крок коду', newuser: 'Новий користувач', 'account-end': 'З акаунтом'
};

const WF_FLOWS = [
  {
    id: 'f1', name: 'Флоу 1 · Покупець-новачок', status: 'active',
    note: 'Головна → Категорія → Картка товару → Кошик → Оформлення → Замовлення',
    screens: [
      { file: 'home.html',         name: 'Головна',              node: '0.0', built: false, states: ['empty','loading','error'], builtStates: [] },
      { file: 'listing.html',      name: 'Категорія (лістинг)',  node: '2.1', built: true,  states: ['empty','loading','error','filtered'], builtStates: [] },
      { file: 'goal.html',         name: 'Ціль-колекція',        node: '2.2', built: false, states: ['empty','loading','error'], builtStates: [] },
      { file: 'product.html',      name: 'Картка товару',        node: '3.0', built: false, states: ['loading','error','oos','reviews'], builtStates: [] },
      { file: 'cart.html',         name: 'Кошик',                node: '6.0', built: false, states: ['empty','oos'], builtStates: [] },
      { file: 'checkout.html',     name: 'Оформлення',           node: '6.1', built: false, states: ['guest','loading','declined','noaddr'], builtStates: [] },
      { file: 'auth.html',         name: 'Авторизація',          node: '1.x', built: false, states: ['code','newuser','loading','error'], builtStates: [] },
      { file: 'order-placed.html', name: 'Замовлення оформлено', node: '6.2', built: false, states: ['account-end'], builtStates: [] },
      { file: 'account.html',      name: 'Кабінет покупця',      node: '7.0', built: false, states: ['empty','loading','error'], builtStates: [] }
    ]
  },
  {
    id: 'f2', name: 'Флоу 2 · Тренер', status: 'soon',
    note: 'Кабінет тренера → мультиклієнтська сесія → кошик (за клієнтами) → оформлення',
    screens: []
  }
];

/* helper: state file name, e.g. wfStateFile('listing.html','empty') → 'listing-empty.html' */
function wfStateFile(file, state) {
  if (state === 'base') return file;
  return file.replace('.html', '-' + state + '.html');
}
function wfFindScreen(file) {
  for (const fl of WF_FLOWS) for (const s of (fl.screens || [])) if (s.file === file) return { flow: fl, screen: s };
  return null;
}

/* (a) full tree for index.html */
function wfTree(elId) {
  const root = document.getElementById(elId);
  if (!root) return;
  let html = '';
  for (const fl of WF_FLOWS) {
    html += '<div class="wt-flow">';
    html += '<div class="wt-fh" id="' + fl.id + '">' + fl.name +
      (fl.status === 'soon' ? ' <span class="soon">скоро</span>' : '') +
      '<span class="wt-fnote">' + fl.note + '</span></div>';
    for (const s of (fl.screens || [])) {
      html += '<div class="wt-screen">';
      const nm = '<span class="node">' + s.node + '</span>';
      html += s.built
        ? '<a class="wt-sname" href="' + s.file + '">' + s.name + nm + '</a>'
        : '<span class="wt-sname planned">' + s.name + nm + '</span>';
      html += '<div class="wt-states">';
      // base
      html += s.built
        ? '<a class="wt-st base" href="' + s.file + '">Базовий</a>'
        : '<span class="wt-st base planned">Базовий</span>';
      for (const st of s.states) {
        const built = s.builtStates.includes(st);
        html += built
          ? '<a class="wt-st" href="' + wfStateFile(s.file, st) + '">' + (WF_STATE_LABEL[st] || st) + '</a>'
          : '<span class="wt-st planned">' + (WF_STATE_LABEL[st] || st) + '</span>';
      }
      html += '</div></div>';
    }
    if (!(fl.screens || []).length) html += '<div class="wt-screen"><span class="wt-sname planned">Екрани зʼявляться на цьому етапі</span></div>';
    html += '</div>';
  }
  root.innerHTML = html;
}

/* (b) thin prototype bar for a screen */
function wfBar(currentFile) {
  const found = wfFindScreen(currentFile);
  const bar = document.getElementById('wf-bar');
  if (!bar) return;
  let html = '<a href="index.html">« Всі екрани</a><span class="sepb">·</span>';
  if (found) {
    html += '<span>' + found.flow.name + '</span><span class="sepb">·</span>';
    html += '<span class="cur">' + found.screen.name + ' ' + found.screen.node + '</span>';
    const sib = found.screen.states.filter(st => found.screen.builtStates.includes(st));
    if (sib.length) {
      html += '<span class="sepb">·</span><span>Стани:</span> <a href="' + found.screen.file + '">базовий</a>';
      for (const st of sib) html += ' <a href="' + wfStateFile(found.screen.file, st) + '">' + (WF_STATE_LABEL[st] || st) + '</a>';
    }
  }
  bar.innerHTML = html;
}
