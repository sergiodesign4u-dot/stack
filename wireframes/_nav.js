/* ============================================================
   Stack — Wireframes navigation (_nav.js)
   ONE source of truth (mirrors wireframes/_screens.md).
   Powers: (a) the «Всі екрани» tree on index.html  → wfTree('id')
           (b) the thin prototype bar on each screen → wfBar('file.html')
   Flip built:true / add to builtStates as screens/states are drawn.
   ============================================================ */

const WF_STATE_LABEL = {
  base: 'Базовий', empty: 'Порожньо', loading: 'Завантаження', error: 'Помилка',
  filtered: 'З фільтрами', list: 'Списком', sheet: 'Фільтри (шит)', oos: 'Немає в наявності', reviews: 'Відгуки (Job 3)',
  buyer: 'Покупець', coach: 'Тренер',
  guest: 'Гість', declined: 'Оплата відхилена', noaddr: 'Без адреси', loggedin: 'У кабінеті',
  code: 'Крок коду', newuser: 'Новий користувач', 'account-end': 'З акаунтом',
  tier: 'Вибір тарифу', deadend: 'Глухий кут', cap: 'Ліміт клієнтів',
  addclient: 'Додати клієнта', priceblock: 'Ціна не підтверджена', newclient: 'Новий клієнт', cart: 'Кошик-полиця',
  confirm: 'Підтвердження', suggest: 'Підказки', 'no-results': 'Нічого не знайдено',
  protein: 'Протеїн', health: 'Здоровʼя', vitamins: 'Вітаміни',
  free: 'Тариф Free', cancel: 'Скасування Pro',
  max: 'Максимальний рівень', many: 'Багато (пагінація)',
  add: 'Додати — вибір способу', viddilennia: 'Відділення', postomat: 'Поштомат', courier: 'Кур\'єр',
  edit: 'Редагувати', delete: 'Видалення',
  phone: 'Змінити номер', email: 'Додати e-mail', lang: 'Мова інтерфейсу', withemail: 'E-mail додано'
};

const WF_FLOWS = [
  {
    id: 'f1', name: 'Флоу 1 · Покупець-новачок', status: 'active',
    note: 'Головна → Категорія → Картка товару → Кошик → Оформлення → Замовлення',
    screens: [
      { file: 'home.html',         name: 'Головна',              node: '0.0', built: true,  states: ['buyer','coach','cart'], builtStates: ['buyer','coach','cart'] },
      { file: 'listing.html',      name: 'Категорія (лістинг)',  node: '2.1', built: true,  states: ['filtered','list','sheet','empty','loading','error'], builtStates: ['filtered','list','sheet','empty','loading','error'] },
      { file: 'goal.html',         name: 'Ціль-колекція',        node: '2.2', built: true,  states: ['empty','loading','error'], builtStates: ['empty','loading','error'] },
      { file: 'quiz.html',         name: 'Квіз (підбір за ціллю)', node: '4.x', built: true, states: [], builtStates: [] },
      { file: 'product.html',      name: 'Картка товару',        node: '3.0', built: true,  states: ['loading','error','oos','reviews','coach'], builtStates: ['loading','error','oos','reviews','coach'] },
      { file: 'cart.html',         name: 'Кошик',                node: '6.0', built: true,  states: ['empty','oos'], builtStates: ['empty','oos'] },
      { file: 'checkout.html',     name: 'Оформлення',           node: '6.1', built: true,  states: ['loggedin','noaddr','loading','declined'], builtStates: ['loggedin','noaddr','loading','declined'] },
      { file: 'auth.html',         name: 'Авторизація',          node: '1.x', built: true,  states: ['code','loading','newuser','error'], builtStates: ['code','loading','newuser','error'] },
      { file: 'order-placed.html', name: 'Замовлення оформлено', node: '6.2', built: true,  states: ['account-end'], builtStates: ['account-end'] },
      { file: 'account.html',      name: 'Кабінет покупця',      node: '7.0', built: true,  states: ['empty','loading','error'], builtStates: ['empty','loading','error'] }
    ]
  },
  {
    id: 'f2', name: 'Флоу 2 · Тренер', status: 'active',
    note: 'Для тренерів → стати тренером → кабінет → клієнти → мультиклієнтська сесія → кошик (за клієнтами) → оформлення',
    screens: [
      { file: 'coach-landing.html', name: 'Для тренерів (лендинг)', node: '5.0', built: true,  states: [], builtStates: [] },
      { file: 'coach-verify.html',  name: 'Стати тренером',         node: '5.1', built: true,  states: ['loading','error','deadend','tier'], builtStates: ['loading','error','deadend','tier'] },
      { file: 'coach-home.html',    name: 'Кабінет тренера',        node: '5.2', built: true,  states: ['loading','error'], builtStates: ['loading','error'] },
      { file: 'coach-tariff.html',  name: 'Тариф (керування)',      node: '5.2a', built: true, states: ['free','cancel'], builtStates: ['free','cancel'] },
      { file: 'coach-clients.html', name: 'Клієнти',                node: '5.3', built: true,  states: ['empty','loading','error','cap'], builtStates: ['empty','loading','error','cap'] },
      { file: 'coach-client-new.html', name: 'Новий клієнт',        node: '5.3a', built: true, states: [], builtStates: [] },
      { file: 'coach-client.html',  name: 'Профіль клієнта',        node: '5.4', built: true,  states: ['empty','loading','error'], builtStates: ['empty','loading','error'] },
      { file: 'coach-client-edit.html', name: 'Редагування клієнта', node: '5.4a', built: true, states: ['confirm'], builtStates: ['confirm'] },
      { file: 'coach-session.html', name: 'Мультиклієнтська сесія', node: '5.5', built: true,  states: ['addclient','loading','oos','priceblock','newclient','empty'], builtStates: ['addclient','loading','oos','priceblock','newclient','empty'] },
      { file: 'coach-orders.html',  name: 'Замовлення тренера',     node: '5.6', built: true,  states: ['empty','loading','error'], builtStates: ['empty','loading','error'] },
      { file: 'coach-order.html',   name: 'Деталі замовлення',      node: '5.7', built: true,  states: ['loading','error'], builtStates: ['loading','error'] },
      { file: 'cart-coach.html',    name: 'Кошик (за клієнтами)',   node: '6.0', built: true,  states: ['empty'], builtStates: ['empty'] }
    ]
  },
  {
    id: 'f3', name: 'Каталог та пошук', status: 'active',
    note: 'навігаційні поверхні (не подорож): хаб → категорія · бренди · пошук — точки входу до товарів',
    screens: [
      { file: 'catalog-page.html', name: 'Каталог-хаб',       node: '2.0', built: true, states: ['loading','error'], builtStates: ['loading','error'] },
      { file: 'home-catalog.html', name: 'Рейка категорій з головної (flyout-оверлей)', node: '0.0', built: true, states: [], builtStates: [] },
      { file: 'brands.html',       name: 'Бренди (індекс)',    node: '2.4', built: true, states: ['empty','loading','error'], builtStates: ['empty','loading','error'] },
      { file: 'search.html',       name: 'Пошук',              node: '2.5', built: true, states: ['suggest','empty','loading'], builtStates: ['suggest','empty','loading'] }
    ]
  },
  {
    id: 'f4', name: 'Контент, інфо та лояльність', status: 'active',
    note: 'сервісні / SEO-сторінки (8.x): 7 шаблонів на 13 вузлів — інфо · лояльність · FAQ · блог · акції · відгуки · розсилка',
    screens: [
      { file: 'content-loyalty.html', name: 'Бонусна програма', node: '8.7', built: true, states: ['buyer'], builtStates: ['buyer'] },
      { file: 'content-faq.html',     name: 'FAQ',              node: '8.9', built: true, states: [], builtStates: [] },
      { file: 'content-blog.html',    name: 'Блог',             node: '8.0', built: true, states: [], builtStates: [] },
      { file: 'content-article.html', name: 'Стаття',           node: '8.1', built: true, states: [], builtStates: [] },
      { file: 'content-promo.html',   name: 'Акції',            node: '8.10', built: true, states: [], builtStates: [] },
      { file: 'content-reviews.html', name: 'Відгуки про магазин', node: '8.11', built: true, states: [], builtStates: [] },
      { file: 'content-about.html',   name: 'Про нас',          node: '8.2', built: true, states: [], builtStates: [] },
      { file: 'content-contacts.html',name: 'Контакти',         node: '8.3', built: true, states: [], builtStates: [] },
      { file: 'content-delivery.html',name: 'Доставка й оплата',node: '8.4', built: true, states: [], builtStates: [] },
      { file: 'content-returns.html', name: 'Обмін і повернення',node: '8.5', built: true, states: [], builtStates: [] },
      { file: 'content-legal.html',   name: 'Правова інформація',node: '8.6', built: true, states: [], builtStates: [] },
      { file: 'content-guarantee.html',name:'Гарантія та сертифікати', node: '8.8', built: true, states: [], builtStates: [] },
      { file: 'content-newsletter.html',name:'Розсилка (підтвердження)', node: '8.12', built: true, states: [], builtStates: [] }
    ]
  },
  {
    id: 'f5', name: 'Системні та глобальні', status: 'active',
    note: 'крос-функційне: мега-меню (0.1) + 404 / 500 / тех.роботи (S) + глобальні компоненти (cookie-банер, тости) — демо на system.html',
    screens: [
      { file: 'megamenu.html',    name: 'Мега-меню «Каталог» (оверлей)', node: '0.1', built: true, states: ['protein', 'health', 'vitamins'], builtStates: ['protein', 'health', 'vitamins'] },
      { file: '404.html',         name: 'Сторінку не знайдено (404)', node: 'S', built: true, states: [], builtStates: [] },
      { file: '500.html',         name: 'Помилка сервера (500)',      node: 'S', built: true, states: [], builtStates: [] },
      { file: 'maintenance.html', name: 'Технічні роботи (503)',      node: 'S', built: true, states: [], builtStates: [] },
      { file: 'system.html',      name: 'Глобальні компоненти (cookie · тости)', node: 'S', built: true, states: [], builtStates: [] }
    ]
  },
  {
    id: 'f6', name: 'Кабінет покупця · розділи', status: 'active',
    note: 'розділи кабінету (7.1–7.7) на спільному шеллі (wfAccountNav): замовлення · лояльність · адреси · профіль · обране',
    screens: [
      { file: 'account-orders.html',    name: 'Замовлення',           node: '7.2', built: true, states: ['empty'], builtStates: ['empty'] },
      { file: 'account-loyalty.html',   name: 'Лояльність і бонуси',   node: '7.4', built: true, states: ['empty','max'], builtStates: ['empty','max'] },
      { file: 'account-addresses.html', name: 'Адреси',               node: '7.5', built: true, states: ['empty','add','viddilennia','postomat','courier','edit','delete'], builtStates: ['empty','add','viddilennia','postomat','courier','edit','delete'] },
      { file: 'account-profile.html',   name: 'Профіль',              node: '7.1', built: true, states: ['withemail','phone','email','lang','delete'], builtStates: ['withemail','phone','email','lang','delete'] },
      { file: 'account-wishlist.html',  name: 'Обране',               node: '7.6', built: true, states: ['empty','many'], builtStates: ['empty','many'] }
    ]
  }
];

/* ============================================================
   WF_SITEMAP — the COMPLETE product map by IA cluster (0–8 + system).
   Every product page: `file` = built wireframe (→ links to it, shows view
   count via WF_FLOWS lookup); `ia` = not-yet-built (→ links to its IA spec,
   dashed). Single source for the «Повна карта сайту» block on index.html.
   As screens get built, move an entry from `ia:` to `file:`.
   ============================================================ */
const WF_SITEMAP = [
  { cluster: '0 · Глобальне', items: [
    { node: '0.0',  name: 'Головна',                          file: 'home.html' },
    { node: '0.1',  name: 'Мега-меню «Каталог» (оверлей + стани)', file: 'megamenu.html' },
    { node: '0.0',  name: 'Рейка категорій з головної (flyout)', file: 'home-catalog.html' },
    { node: '0.2',  name: 'Футер',                             ia: 'footer.html' },
  ]},
  { cluster: '1 · Авторизація', items: [
    { node: '1.x',  name: 'Авторизація',                       file: 'auth.html' },
  ]},
  { cluster: '2 · Каталог і пошук', items: [
    { node: '2.0',  name: 'Каталог-хаб',                       file: 'catalog-page.html' },
    { node: '2.1',  name: 'Категорія (лістинг)',               file: 'listing.html' },
    { node: '2.2',  name: 'Ціль-колекція',                     file: 'goal.html' },
    { node: '2.4',  name: 'Бренди',                            file: 'brands.html' },
    { node: '2.5',  name: 'Пошук',                             file: 'search.html' },
  ]},
  { cluster: '3 · Товар', items: [
    { node: '3.0',  name: 'Картка товару',                     file: 'product.html' },
  ]},
  { cluster: '4 · Гайд', items: [
    { node: '4.x',  name: 'Квіз (підбір за ціллю)',            file: 'quiz.html' },
  ]},
  { cluster: '5 · Тренер (Job 1)', items: [
    { node: '5.0',  name: 'Для тренерів (лендинг)',            file: 'coach-landing.html' },
    { node: '5.1',  name: 'Стати тренером',                    file: 'coach-verify.html' },
    { node: '5.2',  name: 'Кабінет тренера',                   file: 'coach-home.html' },
    { node: '5.2a', name: 'Тариф (керування)',                 file: 'coach-tariff.html' },
    { node: '5.3',  name: 'Клієнти',                           file: 'coach-clients.html' },
    { node: '5.3a', name: 'Новий клієнт (діалог)',             file: 'coach-client-new.html' },
    { node: '5.4',  name: 'Профіль клієнта',                   file: 'coach-client.html' },
    { node: '5.4a', name: 'Редагування клієнта',               file: 'coach-client-edit.html' },
    { node: '5.5',  name: 'Мультиклієнтська сесія',            file: 'coach-session.html' },
    { node: '5.6',  name: 'Замовлення тренера',                file: 'coach-orders.html' },
    { node: '5.7',  name: 'Деталі замовлення',                 file: 'coach-order.html' },
  ]},
  { cluster: '6 · Кошик і оформлення', items: [
    { node: '6.0',  name: 'Кошик',                             file: 'cart.html' },
    { node: '6.0',  name: 'Кошик тренера (за клієнтами)',      file: 'cart-coach.html' },
    { node: '6.1',  name: 'Оформлення',                        file: 'checkout.html' },
    { node: '6.2',  name: 'Замовлення оформлено',              file: 'order-placed.html' },
  ]},
  { cluster: '7 · Кабінет покупця', items: [
    { node: '7.0',  name: 'Кабінет покупця (огляд)',           file: 'account.html' },
    { node: '7.2',  name: 'Замовлення',                        file: 'account-orders.html' },
    { node: '7.4',  name: 'Лояльність і бонуси',               file: 'account-loyalty.html' },
    { node: '7.5',  name: 'Адреси',                            file: 'account-addresses.html' },
    { node: '7.1',  name: 'Профіль',                           file: 'account-profile.html' },
    { node: '7.6',  name: 'Обране',                            file: 'account-wishlist.html' },
  ]},
  { cluster: '8 · Контент та інфо', items: [
    { node: '8.7',  name: 'Бонусна програма та знижки',        file: 'content-loyalty.html' },
    { node: '8.0',  name: 'Блог',                              file: 'content-blog.html' },
    { node: '8.1',  name: 'Стаття',                            file: 'content-article.html' },
    { node: '8.2',  name: 'Про нас',                           file: 'content-about.html' },
    { node: '8.3',  name: 'Контакти',                          file: 'content-contacts.html' },
    { node: '8.4',  name: 'Доставка й оплата',                 file: 'content-delivery.html' },
    { node: '8.5',  name: 'Обмін і повернення',                file: 'content-returns.html' },
    { node: '8.6',  name: 'Правова інформація',                file: 'content-legal.html' },
    { node: '8.8',  name: 'Гарантія та сертифікати',           file: 'content-guarantee.html' },
    { node: '8.9',  name: 'FAQ',                               file: 'content-faq.html' },
    { node: '8.10', name: 'Акції',                             file: 'content-promo.html' },
    { node: '8.11', name: 'Відгуки магазину',                  file: 'content-reviews.html' },
    { node: '8.12', name: 'Розсилка',                          file: 'content-newsletter.html' },
  ]},
  { cluster: 'S · Системні та глобальні', items: [
    { node: 'S',    name: '404 — не знайдено',                 file: '404.html' },
    { node: 'S',    name: '500 — помилка сервера',             file: '500.html' },
    { node: 'S',    name: 'Технічні роботи (503)',             file: 'maintenance.html' },
    { node: 'S',    name: 'Cookie-банер · Тости',              file: 'system.html' },
  ]},
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

/* (a2) full product sitemap for index.html — every page by cluster; built → wireframe
   (with view count = base + built states), not-built → its IA spec (dashed). */
function wfFullMap(elId) {
  const root = document.getElementById(elId);
  if (!root) return;
  let html = '';
  let built = 0, planned = 0;
  for (const cl of WF_SITEMAP) {
    html += '<div class="sm-cluster"><h3>' + cl.cluster + '</h3><div class="sm-list">';
    for (const it of cl.items) {
      const node = it.node ? ' <span class="node">' + it.node + '</span>' : '';
      if (it.file) {
        built++;
        const f = wfFindScreen(it.file);
        const n = f ? 1 + (f.screen.builtStates ? f.screen.builtStates.length : 0) : 1;
        html += '<a class="sm-item" href="' + it.file + '">' + it.name + node +
          '<span class="cnt" title="екранів зі станами">' + n + '</span></a>';
      } else {
        planned++;
        html += '<a class="sm-item planned" href="../ia/' + it.ia + '">' + it.name + node +
          '<span class="ia">IA</span></a>';
      }
    }
    html += '</div></div>';
  }
  const legend = document.getElementById(elId + '-count');
  if (legend) legend.textContent = built + ' збудовано · ' + planned + ' у специфікації (IA)';
  root.innerHTML = html;
}

/* (b) thin prototype bar. baseFile = the screen's base file; currentState = '' for base */
function wfBar(baseFile, currentState) {
  const found = wfFindScreen(baseFile);
  const bar = document.getElementById('wf-bar');
  if (!bar) return;
  let html = '<a href="index.html">« Всі екрани</a><span class="sepb">·</span>';
  if (found) {
    html += '<span>' + found.flow.name + '</span><span class="sepb">·</span>';
    html += '<span class="cur">' + found.screen.name + ' ' + found.screen.node + '</span>';
    const parts = [];
    parts.push(!currentState ? '<span class="cur">базовий</span>' : '<a href="' + found.screen.file + '">базовий</a>');
    for (const st of found.screen.states) {
      const label = WF_STATE_LABEL[st] || st;
      if (st === currentState) parts.push('<span class="cur">' + label + '</span>');
      else if (found.screen.builtStates.includes(st)) parts.push('<a href="' + wfStateFile(found.screen.file, st) + '">' + label + '</a>');
      else parts.push('<span style="opacity:.4">' + label + '</span>');
    }
    html += '<span class="sepb">·</span><span>Стани:</span> ' + parts.join(' ');
  }
  bar.innerHTML = html;
}

/* ============================================================
   Catalog mega-menu data (node 0.1) — Belok-style.
   Left = 12 top categories; middle = the hovered category's subcategories;
   right = «За ціллю» (6 goals) + all-products. All links are real <a>
   (crawlable, SEO). In the wireframe every category/subcategory routes to
   the shared listing template (listing.html); goals → goal.html; Бренди →
   brands.html. ============================================================ */
const WF_CAT_MENU = [
  { name: 'Протеїн', href: 'listing.html', ic: '🥛', goals: ['Набір маси', 'Схуднення', 'Відновлення'],
    subs: ['Сироватковий (концентрат)', 'Ізолят', 'Гідролізат', 'Казеїн', 'Комплексний', 'Яловичий', 'Рослинний (соя/горох/рис)', 'Яєчний'],
    groups: [
      { label: 'За типом', items: ['Сироватковий (концентрат)', 'Ізолят', 'Гідролізат', 'Казеїн', 'Комплексний', 'Яловичий', 'Рослинний (соя/горох/рис)', 'Яєчний'] },
      { label: 'За формою', items: ['Порошок', 'Готові напої (RTD)'] },
    ] },
  { name: 'Гейнери', href: 'listing.html', ic: '🍚', goals: ['Набір маси'],
    subs: ['Високовуглеводні', 'Збалансовані', 'Вуглеводи / карбо'],
    groups: [
      { label: 'За типом', items: ['Високовуглеводні', 'Збалансовані (білок+вуглеводи)', 'Вуглеводи / карбо (мальтодекстрин, амілопектин)'] },
    ] },
  { name: 'Креатин', href: 'listing.html', ic: '⚗️', goals: ['Набір маси', 'Витривалість / кардіо'],
    subs: ['Моногідрат', 'Creapure®', 'Гідрохлорид (HCl)', 'Kre-Alkalyn', 'Суміш креатинів'],
    groups: [
      { label: 'За типом', items: ['Моногідрат', 'Creapure®', 'Гідрохлорид (HCl)', 'Kre-Alkalyn', 'Суміш креатинів'] },
      { label: 'За формою', items: ['Порошок', 'Капсули / таблетки'] },
    ] },
  { name: 'Амінокислоти', href: 'listing.html', ic: '🧬', goals: ['Набір маси', 'Відновлення', 'Витривалість / кардіо'],
    subs: ['BCAA', 'EAA / комплексні', 'L-глютамін', 'L-аргінін', 'L-цитрулін', 'Бета-аланін', 'Таурин', 'L-лізин'],
    groups: [
      { label: 'За типом', items: ['BCAA', 'EAA / комплексні', 'L-глютамін', 'L-аргінін', 'L-цитрулін', 'Бета-аланін', 'Таурин', 'L-лізин'] },
      { label: 'За формою', items: ['Порошок', 'Капсули', 'Рідкі'] },
    ] },
  { name: 'Передтренувальні та енергія', href: 'listing.html', ic: '⚡', goals: ['Енергія / тонус', 'Набір маси'],
    subs: ['З кофеїном (стим)', 'Без стимуляторів (stim-free)', 'Пампінг / NO-бустери', 'Енергетики, кофеїн, гуарана'],
    groups: [
      { label: 'За типом', items: ['З кофеїном (стим)', 'Без стимуляторів (stim-free)', 'Пампінг / NO-бустери', 'Енергетики, кофеїн, гуарана'] },
    ] },
  { name: 'Жироспалювачі', href: 'listing.html', ic: '🔥', goals: ['Схуднення'],
    subs: ['L-карнітин', 'Термогеніки (комплексні)', 'Ліпотропіки', 'Блокатори (вуглеводів/жирів)'],
    groups: [
      { label: 'За типом', items: ['L-карнітин', 'Термогеніки (комплексні)', 'Ліпотропіки', 'Блокатори (вуглеводів/жирів, хітозан)'] },
    ] },
  { name: 'Ізотоніки та витривалість', href: 'listing.html', ic: '💧', goals: ['Витривалість / кардіо', 'Енергія / тонус'],
    subs: ['Ізотоніки', 'Енергетичні гелі', 'Електроліти / сольові таблетки'],
    groups: [
      { label: 'За типом', items: ['Ізотоніки', 'Енергетичні гелі', 'Електроліти / сольові таблетки'] },
    ] },
  { name: 'Батончики, снеки та харчування', href: 'listing.html', ic: '🍫', goals: ['Схуднення', 'Набір маси'],
    subs: ['Протеїнові батончики', 'Печиво, цукерки, снеки', 'Паста (арахісова/горіхова)', 'Замінники харчування', 'Суперфуди', 'Гранола', 'Сиропи без цукру'],
    groups: [
      { label: 'Снеки та батончики', items: ['Протеїнові батончики (без цукру / високобілкові / вуглеводні)', 'Протеїнове печиво, цукерки, снеки', 'Паста (арахісова / горіхова)'] },
      { label: 'Харчування', items: ['Замінники харчування (meal replacement)', 'Суперфуди', 'Гранола', 'Сиропи без цукру'] },
    ] },
  { name: 'Вітаміни та мінерали', href: 'listing.html', ic: '💊', goals: ['Імунітет / здоровʼя', 'Схуднення', 'Відновлення'],
    subs: ['Комплекси', 'Вітамін D3', 'Вітамін C', 'Група B', 'Магній', 'Цинк', 'Омега-3'],
    groups: [
      { label: 'Комплекси', items: ['Чоловічі', 'Жіночі', 'Універсальні'] },
      { label: 'Окремі вітаміни', items: ['D3', 'C', 'Група B', 'A', 'E'] },
      { label: 'Мінерали', items: ['Магній', 'Цинк', 'Кальцій', 'Залізо', 'Селен'] },
      { label: 'Омега / риб’ячий жир', items: ['Омега-3', 'Омега 3-6-9', 'Омега-3 + D3'] },
    ] },
  { name: 'Здоровʼя', href: 'listing.html', ic: '❤️', goals: ['Відновлення', 'Імунітет / здоровʼя'],
    subs: ['Суглоби та звʼязки', 'Імунітет', 'Сон і нервова система', 'Травлення', 'Серце та судини', 'Печінка', 'Чоловіче здоровʼя', 'Жіноче здоровʼя та краса', 'Адаптогени', 'Антиоксиданти'],
    groups: [
      { label: 'За напрямком', items: ['Суглоби та звʼязки', 'Імунітет', 'Сон і нервова система', 'Травлення', 'Серце та судини', 'Печінка', 'Чоловіче здоровʼя', 'Жіноче здоровʼя та краса', 'Адаптогени', 'Антиоксиданти'] },
    ] },
  { name: 'Аксесуари', href: 'listing.html', ic: '🧴', goals: [],
    subs: ['Шейкери та пляшки', 'Дозатори / таблетниці', 'Атрибутика'],
    groups: [
      { label: 'За типом', items: ['Шейкери та пляшки', 'Дозатори / таблетниці', 'Атрибутика (пояси, лямки, бинти, рукавички, магнезія)'] },
    ] },
  { name: 'Бренди', href: 'brands.html', ic: '🏷️', goals: [], brandIndex: true,
    subs: ['Optimum Nutrition', 'BioTechUSA', 'Myprotein', 'Scitec Nutrition', 'OstroVit', 'Power Pro'],
    groups: [
      { label: 'Популярні бренди', items: ['Optimum Nutrition', 'BioTechUSA', 'Myprotein', 'Scitec Nutrition', 'OstroVit', 'Power Pro'] },
    ] },
];
const WF_GOAL_MENU = [
  { ic: '💪', name: 'Набір маси',            cats: 'Протеїн · Гейнери · Креатин · BCAA/EAA · Передтреники' },
  { ic: '🔥', name: 'Схуднення',             cats: 'Ізолят · Жироспалювачі · L-карнітин · Клітковина · Вітаміни' },
  { ic: '🌿', name: 'Відновлення',           cats: 'BCAA/EAA · Глютамін · Суглоби/колаген · Омега · Магній · Сон' },
  { ic: '⚡', name: 'Енергія / тонус',       cats: 'Передтренувальні · B-вітаміни · Адаптогени · Ізотоніки' },
  { ic: '🛡️', name: 'Імунітет / здоровʼя',   cats: 'Вітаміни C, D3, цинк · Омега · Пробіотики' },
  { ic: '🏃', name: 'Витривалість / кардіо', cats: 'Ізотоніки · Гелі · Електроліти · Бета-аланін' },
];
/* canonical served-cities list (node 0.1a) — 23 controlled oblast centres + large hubs; Crimea/occupied excluded */
const WF_CITIES_POP = ['Київ', 'Харків', 'Дніпро', 'Одеса', 'Львів', 'Запоріжжя', 'Кривий Ріг', 'Миколаїв'];
const WF_CITIES_ALL = ['Вінниця', 'Дніпро', 'Житомир', 'Запоріжжя', 'Івано-Франківськ', 'Камʼянець', 'Київ', 'Кременчук', 'Кривий Ріг', 'Луцьк', 'Львів', 'Миколаїв', 'Одеса', 'Полтава', 'Рівне', 'Суми', 'Тернопіль', 'Ужгород', 'Харків', 'Херсон', 'Хмельницький', 'Черкаси', 'Чернівці', 'Чернігів'];

/* goals middle panel (data-k="g") — the concern lens, shown first by default */
function wfMegaGoalsPanel() {
  let cards = '';
  WF_GOAL_MENU.forEach(g => {
    cards += '<a class="mega-goalcard" href="goal.html"><span class="gi">' + g.ic + '</span>' +
      '<span class="gtx"><b>' + g.name + '</b><span class="gc">' + g.cats + '</span></span></a>';
  });
  return '<div class="mega-panel on" data-k="g"><a class="mph" href="catalog-page.html">Оберіть ціль — підберемо набір →</a>' +
    '<div class="mega-goalgrid">' + cards + '</div></div>';
}
/* one middle panel per category — grouped subcategories + goal chips */
function wfMegaCatPanel(c, i) {
  let grp = '';
  (c.groups || [{ label: '', items: c.subs }]).forEach(g => {
    grp += '<div class="mega-grp">' + (g.label ? '<div class="mgt">' + g.label + '</div>' : '');
    g.items.forEach(it => { grp += '<a class="mega-sub" href="' + c.href + '">' + it + '</a>'; });
    grp += '</div>';
  });
  let goalrow = '';
  if (c.goals && c.goals.length) {
    goalrow = '<div class="mega-goalrow"><span class="mgl">За ціллю:</span>';
    c.goals.forEach(gn => { goalrow += '<a class="mgchip" href="goal.html">' + gn + '</a>'; });
    goalrow += '</div>';
  }
  const head = c.brandIndex ? 'Усі бренди А–Я →' : c.name + ' — усі товари →';
  return '<div class="mega-panel" data-k="' + i + '"><a class="mph" href="' + c.href + '">' + head + '</a>' +
    '<div class="mega-groups">' + grp + '</div>' + goalrow + '</div>';
}
/* Home category rail with a flyout that opens as an OVERLAY (Comfy-home style).
   Shared by home.html (hover-to-open, closed by default) and home-catalog.html
   (opened on «За ціллю» to demo the overlay). Builds rail + flyout from the same
   WF_CAT_MENU/WF_GOAL_MENU as the header mega, so it never drifts.
   opts: { rail, fly, scrim (selectors), open (bool: open «g» by default) } */
function wfHomeRail(opts) {
  opts = opts || {};
  var railEl = document.querySelector(opts.rail || '#home-rail');
  var flyEl = document.querySelector(opts.fly || '#home-fly');
  if (!railEl || !flyEl) return;
  var scrimSel = opts.scrim || '#home-scrim';
  var rail = '<a class="lead on" data-k="g" href="catalog-page.html" onmouseenter="hcFly(\'g\')">✦ За ціллю <span class="ar">›</span></a><div class="rsep"></div>';
  WF_CAT_MENU.forEach(function (c, i) {
    rail += '<a data-k="' + i + '" href="' + c.href + '" onmouseenter="hcFly(\'' + i + '\')"><span class="ic">' + (c.ic || '') + '</span> ' + c.name + ' <span class="ar">›</span></a>';
  });
  railEl.innerHTML = rail;
  var fly = wfMegaGoalsPanel();
  WF_CAT_MENU.forEach(function (c, i) { fly += wfMegaCatPanel(c, i); });
  flyEl.innerHTML = fly;
  window.hcFly = function (k) {
    k = String(k);
    railEl.querySelectorAll('[data-k]').forEach(function (e) { e.classList.toggle('on', e.dataset.k === k); });
    flyEl.querySelectorAll('.mega-panel').forEach(function (e) { e.classList.toggle('on', e.dataset.k === k); });
    flyEl.classList.add('open');
    var s = document.querySelector(scrimSel); if (s) s.classList.add('open');
  };
  window.hcClose = function () {
    flyEl.classList.remove('open');
    var s = document.querySelector(scrimSel); if (s) s.classList.remove('open');
  };
  if (opts.open) hcFly('g');
}
function wfMegaHTML() {
  let cats = '<a class="mega-cat mega-cat-goals on" data-k="g" href="catalog-page.html" onmouseenter="wfMega(\'g\')">✦ За ціллю<span class="ar">›</span></a>';
  let mids = wfMegaGoalsPanel();
  WF_CAT_MENU.forEach((c, i) => {
    cats += '<a class="mega-cat" data-k="' + i + '" href="' + c.href + '" onmouseenter="wfMega(\'' + i + '\')"><span class="mci">' + (c.ic || '') + '</span>' + c.name + '<span class="ar">›</span></a>';
    mids += wfMegaCatPanel(c, i);
  });
  const side = '<div class="mega-side">' +
    '<a class="ms-lead" href="catalog-page.html">Усі товари каталогу →</a>' +
    '<a class="ms-link" href="brands.html">Бренди А–Я</a>' +
    '<a class="ms-link" href="listing.html">Новинки</a>' +
    '<a class="ms-link" href="content-promo.html">Акції та знижки</a>' +
    '<a class="ms-link" href="listing.html">Розпродаж</a>' +
    '<div class="ms-feat"><div class="ms-ph">фото</div><div class="ms-ftag">Хіт місяця</div>' +
    '<div class="ms-fh">Gold Standard 100% Whey</div><div class="ms-fs">від 1 290 ₴ · −15%</div>' +
    '<a class="ms-fb" href="product.html">Дивитися →</a></div></div>';
  return '<div class="wfh-mega" role="menu" aria-label="Каталог">' +
    '<div class="mega-cats">' + cats + '</div>' +
    '<div class="mega-mid">' + mids + '</div>' + side + '</div>';
}
function wfMega(k) {
  k = String(k);
  document.querySelectorAll('.wfh-mega .mega-cat').forEach(el => el.classList.toggle('on', el.dataset.k === k));
  document.querySelectorAll('.wfh-mega .mega-panel').forEach(el => el.classList.toggle('on', el.dataset.k === k));
}
/* mega opens as an overlay (Comfy-style) — dark scrim over the page while open */
function openMega() { var h = document.querySelector('.wfh'); if (h) h.classList.add('mega-open'); var s = document.getElementById('wfh-scrim'); if (s) s.classList.add('open'); }
function closeMega() { var h = document.querySelector('.wfh'); if (h) h.classList.remove('mega-open'); var s = document.getElementById('wfh-scrim'); if (s) s.classList.remove('open'); }

/* city selector dialog (node 0.1a) + mobile menu drawer + open/close */
function wfCityHTML() {
  let pop = ''; WF_CITIES_POP.forEach(c => { pop += '<button class="city-badge" onclick="wfPickCity(\'' + c + '\')">' + c + '</button>'; });
  let az = ''; WF_CITIES_ALL.forEach(c => { az += '<button class="city-az" onclick="wfPickCity(\'' + c + '\')">' + c + '</button>'; });
  return '<div class="wf-ov" id="city-ov" onclick="closeCity()"></div>' +
    '<div class="wf-city" id="city-dlg" role="dialog" aria-modal="true" aria-label="Оберіть місто">' +
    '<div class="wf-city-h">Оберіть місто<button class="x" onclick="closeCity()" aria-label="Закрити">✕</button></div>' +
    '<div class="wf-city-b">' +
    '<input class="city-search" type="search" placeholder="Пошук міста…" aria-label="Пошук міста">' +
    '<div class="city-lbl">Популярні міста</div><div class="city-pop">' + pop + '</div>' +
    '<div class="city-lbl">Усі міста (А–Я)</div><div class="city-list">' + az + '</div>' +
    '<div class="city-note">Доставка Новою Поштою по всій Україні — знайдемо будь-яке місто через пошук.</div>' +
    '</div></div>';
}
function wfDrawerHTML() {
  let goals = ''; WF_GOAL_MENU.forEach(g => { goals += '<a class="dr-chip" href="goal.html"><span>' + g.ic + '</span>' + g.name + '</a>'; });
  let cats = '';
  WF_CAT_MENU.forEach((c, i) => {
    cats += '<div class="dr-catwrap">' +
      '<button class="dr-cat" onclick="toggleDrCat(' + i + ')" aria-expanded="false"><span class="dc-ic">' + (c.ic || '') + '</span>' + c.name + '<span class="ar" id="dra' + i + '">＋</span></button>' +
      '<div class="dr-subs" id="drs' + i + '"><a class="dr-suball" href="' + c.href + '">Усі: ' + c.name + ' →</a>';
    (c.subs || []).forEach(s => { cats += '<a class="dr-sub" href="' + c.href + '">' + s + '</a>'; });
    cats += '</div></div>';
  });
  return '<div class="wf-ov" id="drawer-ov" onclick="closeBurger()"></div>' +
    '<nav class="wf-drawer" id="drawer" aria-label="Меню">' +
    '<div class="dr-h"><span class="dr-logo">Stack</span><button class="x" onclick="closeBurger()" aria-label="Закрити">✕</button></div>' +
    '<div class="dr-b">' +
    '<a class="dr-city" href="#" onclick="closeBurger();openCity();return false">📍 Одеса — змінити місто</a>' +
    '<div class="dr-lbl">За ціллю</div><div class="dr-chips">' + goals + '</div>' +
    '<div class="dr-lbl">Категорії</div>' + cats +
    '<div class="dr-lbl">Ще</div>' +
    '<a class="dr-link strong" href="coach-landing.html">Для тренерів</a>' +
    '<a class="dr-link" href="quiz.html">✦ Квіз — підбір за ціллю</a>' +
    '<a class="dr-link" href="content-promo.html">Акції</a>' +
    '<a class="dr-link" href="brands.html">Бренди</a>' +
    '<a class="dr-link" href="content-delivery.html">Доставка й оплата</a>' +
    '<a class="dr-link" href="content-returns.html">Повернення</a>' +
    '<a class="dr-link" href="content-about.html">Про нас</a>' +
    '<a class="dr-link" href="content-contacts.html">Контакти</a>' +
    '<a class="dr-link" href="account.html">★ Бонуси</a>' +
    '<a class="dr-link" href="auth.html" onclick="closeBurger();openAuth(\'phone\');return false">👤 Увійти / Реєстрація</a>' +
    '</div></nav>';
}
function openCity() { var d = document.getElementById('city-dlg'), o = document.getElementById('city-ov'); if (d) d.classList.add('open'); if (o) o.classList.add('open'); }
function closeCity() { var d = document.getElementById('city-dlg'), o = document.getElementById('city-ov'); if (d) d.classList.remove('open'); if (o) o.classList.remove('open'); }
function wfPickCity(name) { document.querySelectorAll('.wfh-city-lbl').forEach(el => el.textContent = name); closeCity(); }
function openBurger() { var d = document.getElementById('drawer'), o = document.getElementById('drawer-ov'); if (d) d.classList.add('open'); if (o) o.classList.add('open'); }
function closeBurger() { var d = document.getElementById('drawer'), o = document.getElementById('drawer-ov'); if (d) d.classList.remove('open'); if (o) o.classList.remove('open'); }
function toggleDrCat(i) { var s = document.getElementById('drs' + i), a = document.getElementById('dra' + i); if (!s) return; var open = s.classList.toggle('open'); if (a) a.textContent = open ? '－' : '＋'; var b = s.previousElementSibling; if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false'); }

/* ============================================================
   Global system components (node S) — cookie-consent banner + toasts.
   Builders inject into #wf-cookie / #wf-toast placeholders (present only on
   pages that demo them, e.g. system.html). Footer «Змінити згоду» opens the
   settings dialog where present, else routes to system.html.
   Grounded in UA law "On Personal Data Protection": prior consent, reject as
   easy as accept, analytics/marketing opt-in (off by default). ============ */
function wfCookieHTML() {
  const cat = (id, title, desc, locked) =>
    '<label class="ck-cat"><span class="ck-cat-t">' + title + (locked ? ' <span class="ck-lock">🔒</span>' : '') + '<span class="ck-cat-d">' + desc + '</span></span>' +
    '<span class="ck-tog' + (locked ? ' on locked' : '') + '" data-ck="' + id + '" onclick="wfCkTog(this)" role="switch" aria-checked="' + (locked ? 'true' : 'false') + '"><i></i></span></label>';
  return '<div class="wf-cookie" id="cookie-bar" role="region" aria-label="Згода на використання cookie">' +
    '<div class="ck-txt"><b>Ми використовуємо файли cookie.</b> Необхідні — щоб сайт працював (кошик, вхід, безпека). Аналітику й маркетинг вмикаємо <b>лише за вашою згодою</b>. Докладніше — у <a href="content-legal.html">Політиці конфіденційності</a>.</div>' +
    '<div class="ck-acts"><button class="ck-btn" onclick="saveCookiePrefs(\'all\')">Прийняти всі</button>' +
    '<button class="ck-btn" onclick="saveCookiePrefs(\'necessary\')">Тільки необхідні</button>' +
    '<button class="ck-btn ghost" onclick="openCookieSettings()">Налаштувати</button></div></div>' +
    '<div class="wf-ov" id="ckset-ov" onclick="closeCookieSettings()"></div>' +
    '<div class="wf-ckset" id="ckset" role="dialog" aria-modal="true" aria-label="Налаштування cookie">' +
    '<div class="wf-ckset-h">Налаштування cookie<button class="x" onclick="closeCookieSettings()" aria-label="Закрити">✕</button></div>' +
    '<div class="wf-ckset-b">' +
    cat('necessary', 'Необхідні', 'Кошик, авторизація, безпека. Завжди активні.', true) +
    cat('analytics', 'Аналітика', 'Анонімна статистика відвідувань (Mixpanel / PostHog).', false) +
    cat('marketing', 'Маркетинг', 'Персоналізовані пропозиції та ремаркетинг.', false) +
    '<p class="ck-note">Змінити вибір можна будь-коли — посилання «Змінити згоду» у футері. Див. <a href="content-legal.html">Політику конфіденційності</a>.</p>' +
    '</div><div class="wf-ckset-f"><button class="btn" onclick="saveCookiePrefs(\'necessary\')">Тільки необхідні</button>' +
    '<button class="btn dark" onclick="saveCookiePrefs(\'custom\')">Зберегти вибір</button></div></div>';
}
function wfCookie() { const el = document.getElementById('wf-cookie'); if (!el) return; el.innerHTML = wfCookieHTML(); }
function wfCkTog(el) { if (el.classList.contains('locked')) return; const on = el.classList.toggle('on'); el.setAttribute('aria-checked', on ? 'true' : 'false'); }
function openCookieSettings() { const d = document.getElementById('ckset'); if (!d) { location.href = 'system.html'; return; } d.classList.add('open'); const o = document.getElementById('ckset-ov'); if (o) o.classList.add('open'); }
function closeCookieSettings() { const d = document.getElementById('ckset'), o = document.getElementById('ckset-ov'); if (d) d.classList.remove('open'); if (o) o.classList.remove('open'); }
function saveCookiePrefs() { const b = document.getElementById('cookie-bar'); if (b) b.classList.add('hidden'); closeCookieSettings(); wfToast('ok', 'Налаштування cookie збережено'); }
function showCookieBar() { const b = document.getElementById('cookie-bar'); if (b) b.classList.remove('hidden'); }

/* PDP review + question modals — SHARED component (single source of truth). Injected
   into #wf-pdp-modals on the product page AND the product-reviews reference state, so
   they never drift. openReview()/openQuestion() are the triggers. */
function wfPdpModals() {
  const el = document.getElementById('wf-pdp-modals'); if (!el) return;
  el.innerHTML =
    '<div class="wf-ov" id="pm-ov" onclick="closePM()"></div>' +
    '<div class="pm" id="pm-review" role="dialog" aria-modal="true" aria-label="Залишити відгук">' +
    '<div class="pm-h">Залишити відгук<button class="x" onclick="closePM()" aria-label="Закрити">✕</button></div>' +
    '<div class="pm-b"><label>Ваша оцінка</label><div class="pm-stars"><b>★★★★</b>★</div>' +
    '<label>Переваги</label><input type="text" placeholder="Що сподобалось">' +
    '<label>Недоліки</label><input type="text" placeholder="Що можна покращити">' +
    '<label>Відгук</label><textarea placeholder="Ваші враження про товар…"></textarea>' +
    '<label>Ім\'я</label><input type="text" placeholder="Як вас підписати">' +
    '<div class="pm-note">Відгук пройде модерацію. Публікуємо чесно — і схвальні, і критичні.</div></div>' +
    '<div class="pm-f"><button class="btn" onclick="closePM()">Скасувати</button>' +
    '<button class="btn dark" onclick="submitPM(\'Дякуємо! Відгук надіслано на модерацію\')">Надіслати відгук</button></div></div>' +
    '<div class="pm" id="pm-question" role="dialog" aria-modal="true" aria-label="Поставити запитання">' +
    '<div class="pm-h">Поставити запитання<button class="x" onclick="closePM()" aria-label="Закрити">✕</button></div>' +
    '<div class="pm-b"><label>Ваше запитання про товар</label><textarea placeholder="Напр., чи підходить для схуднення?"></textarea>' +
    '<label>E-mail для відповіді</label><input type="email" placeholder="you@email.com">' +
    '<div class="pm-note">Відповідь надішлемо на пошту й опублікуємо в розділі «Питання».</div></div>' +
    '<div class="pm-f"><button class="btn" onclick="closePM()">Скасувати</button>' +
    '<button class="btn dark" onclick="submitPM(\'Дякуємо! Запитання надіслано\')">Надіслати запитання</button></div></div>';
}
function openReview() { var m = document.getElementById('pm-review'), o = document.getElementById('pm-ov'); if (m) m.classList.add('open'); if (o) o.classList.add('open'); }
function openQuestion() { var m = document.getElementById('pm-question'), o = document.getElementById('pm-ov'); if (m) m.classList.add('open'); if (o) o.classList.add('open'); }
function closePM() { document.querySelectorAll('.pm.open').forEach(m => m.classList.remove('open')); var o = document.getElementById('pm-ov'); if (o) o.classList.remove('open'); }
function submitPM(msg) { closePM(); wfToast('ok', msg); }

/* ============================================================
   AUTH DIALOG (node 1.x) — SHARED component (single source of truth).
   Mounted once into <body> on demand (like the scrim). Every «Увійти» trigger
   calls openAuth('phone'); the prototype advances state IN PLACE via
   wfAuthGo(state) — no page reload. Passwordless, phone-OTP-first. States:
   phone (base) · loading · code · error · newuser. The auth*.html files are
   REFERENCE renders (openAuth(state) pinned), so screens never drift. ======= */
const WF_AUTH_PHONE = '+380 67 123 45 67';
function wfAuthMount() {
  if (!document.getElementById('wf-auth')) {
    var ov = document.createElement('div');
    ov.className = 'auth-ov'; ov.id = 'wf-auth';
    ov.setAttribute('aria-label', 'Вхід або реєстрація');
    ov.onclick = function (e) { if (e.target === ov) closeAuth(); };
    document.body.appendChild(ov);
  }
  if (!document.getElementById('wf-toast')) {
    var t = document.createElement('div'); t.id = 'wf-toast'; document.body.appendChild(t); wfToasts();
  }
}
function wfAuthShell(vi, vt, vs, bi, bt1, bt2, inner) {
  return '<div class="auth-modal" role="dialog" aria-modal="true" aria-label="Вхід або реєстрація">' +
    '<aside class="auth-visual" aria-hidden="true"><div class="vlogo">Stack</div>' +
    '<div class="vmid"><div class="vi">' + vi + '</div>спортивне харчування</div>' +
    '<div class="vtag"><b>' + vt + '</b>' + vs + '</div></aside>' +
    '<div class="auth-form"><div class="auth-top"><span class="auth-mlogo">Stack</span>' +
    '<button class="auth-x" onclick="closeAuth()" aria-label="Закрити">✕ Закрити</button></div>' +
    '<div class="auth-banner"><div class="bi">' + bi + '</div><div class="bt"><b>' + bt1 + '</b>' + bt2 + '</div></div>' +
    inner + '</div></div>';
}
function wfAuthFoot(t) { return '<div class="auth-foot">' + t + ' <a onclick="closeAuth()">Повернутися до магазину</a></div>'; }
function wfOtp(vals, err) {
  var b = ''; vals.forEach(function (v, i) {
    var cls = 'box' + (err ? ' err' : (v ? ' on' : ''));
    b += '<input class="' + cls + '" maxlength="1" inputmode="numeric" value="' + v + '" aria-label="Цифра ' + (i + 1) + '">';
  });
  return '<div class="otp" role="group" aria-label="Код із шести цифр">' + b + '</div>';
}
function wfAuthPanel(state) {
  var chg = '<a onclick="wfAuthGo(\'phone\')">Змінити номер</a>';
  if (state === 'loading') {
    return wfAuthShell('🏋️', 'Один акаунт — усе під рукою', 'Замовлення, бонуси, обране та швидке повторне замовлення.', '🏋️', 'Stack', 'Спортивне харчування',
      '<h1 class="auth-h1">Майже готово</h1><p class="auth-sub">Надсилаємо одноразовий код підтвердження.</p>' +
      '<div class="auth-load" role="status" aria-live="polite"><div class="auth-spin" aria-hidden="true"></div>' +
      '<div class="lt">Надсилаємо код у SMS…</div><div class="lp">На номер <b>' + WF_AUTH_PHONE + '</b></div>' +
      '<div class="auth-skel" aria-hidden="true"><div class="sl"></div><div class="sl m"></div></div></div>' +
      '<button class="auth-cta" onclick="wfAuthGo(\'code\')">Код надіслано — ввести →</button>' +
      '<p class="auth-note">🔒 Код діє 5 хвилин. Нікому не повідомляйте його.</p>' +
      '<div class="linkrow"><a onclick="wfAuthGo(\'phone\')">← Змінити номер</a></div>' +
      wfAuthFoot('Не отримали SMS? За кілька секунд зможете надіслати код повторно.'));
  }
  if (state === 'code') {
    return wfAuthShell('🏋️', 'Майже готово', 'Введіть код із SMS, щоб завершити вхід.', '💬', 'Код надіслано', 'SMS на ' + WF_AUTH_PHONE,
      '<h1 class="auth-h1">Введіть код</h1><p class="auth-sub">Ми надіслали SMS із кодом на номер <b>' + WF_AUTH_PHONE + '</b>. ' + chg + '</p>' +
      '<div class="fld"><label>Код підтвердження</label>' + wfOtp(['4', '9', '2', '', '', ''], false) +
      '<div class="otp-note">Код діє 5 хвилин. Введеться автоматично, якщо телефон його підставить.</div></div>' +
      '<button class="auth-cta" onclick="wfAuthGo(\'newuser\')">Підтвердити</button>' +
      '<div class="resend">Не отримали код? <span class="cool">Надіслати ще (0:45)</span></div>' +
      '<div class="linkrow"><a onclick="wfAuthGo(\'phone\')">← Змінити номер</a><a onclick="wfAuthGo(\'error\')">Ввів неправильний код?</a></div>' +
      wfAuthFoot('Якщо номер уже зареєстровано — ви одразу увійдете. Новий номер — попросимо ім\'я.'));
  }
  if (state === 'error') {
    return wfAuthShell('🔒', 'Перевірте код', 'Введіть код ще раз або надішліть новий.', '⚠️', 'Невірний код', 'Спробуйте ще раз',
      '<h1 class="auth-h1">Введіть код</h1><p class="auth-sub">Код для номера <b>' + WF_AUTH_PHONE + '</b>. ' + chg + '</p>' +
      '<div class="fld"><label>Код підтвердження</label>' + wfOtp(['1', '2', '3', '4', '5', '6'], true) +
      '<div class="otp-err" role="alert"><span class="m">⚠️</span><span>Невірний код. Перевірте SMS і спробуйте ще раз.<small>Залишилось спроб: 2. Код діє 5 хвилин.</small></span></div></div>' +
      '<button class="auth-cta" onclick="wfAuthGo(\'code\')">Спробувати ще</button>' +
      '<button class="auth-alt" onclick="wfAuthGo(\'code\')">Надіслати новий код</button>' +
      '<div class="linkrow"><a onclick="wfAuthGo(\'phone\')">← Змінити номер</a><a onclick="wfAuthGo(\'phone\')">Увійти іншим способом</a></div>' +
      wfAuthFoot('Забагато спроб? Зачекайте кілька хвилин або скористайтесь Google / Apple / E-mail.'));
  }
  if (state === 'newuser') {
    return wfAuthShell('🎉', 'Створюємо ваш акаунт', 'Ім\'я — щоб звертатися до вас і підписувати замовлення.', '🎉', 'Номер підтверджено', 'Ще один крок — і готово',
      '<h1 class="auth-h1">Як вас звати?</h1><p class="auth-sub">Створюємо ваш акаунт Stack. Залишилося вказати ім\'я.</p>' +
      '<div class="fld"><label for="wfa-name">Ім\'я</label><input id="wfa-name" class="txt-field" type="text" placeholder="Напр., Вікторія"></div>' +
      '<div class="fld"><label>E-mail <span class="opt">— необов\'язково</span></label><input class="txt-field" type="email" placeholder="you@email.com"></div>' +
      '<label class="optin"><span class="cb"></span><span>Хочу отримувати листи про акції та новинки. Можна вимкнути будь-коли.</span></label>' +
      '<p class="auth-consent">Натискаючи «Продовжити», ви приймаєте <a href="content-legal.html">публічну оферту</a> та <a href="content-legal.html">політику конфіденційності</a> Stack.</p>' +
      '<button class="auth-cta" onclick="wfAuthDone()">Продовжити</button>' +
      '<div class="linkrow"><a onclick="wfAuthGo(\'code\')">← Назад до коду</a></div>' +
      wfAuthFoot('Після цього кроку ви повернетесь туди, де почали — у кошик, обране чи оформлення.'));
  }
  /* phone (base) */
  return wfAuthShell('🏋️', 'Один акаунт — усе під рукою', 'Замовлення, бонуси, обране та швидке повторне замовлення.', '🏋️', 'Stack', 'Спортивне харчування',
    '<h1 class="auth-h1">Вхід або реєстрація</h1><p class="auth-sub">Введіть номер телефону — надішлемо код у SMS. Пароль не потрібен.</p>' +
    '<div class="fld"><label for="wfa-phone">Номер телефону</label><div class="ph-field"><span class="cc">+380</span>' +
    '<input id="wfa-phone" type="tel" inputmode="numeric" placeholder="67 123 45 67" aria-label="Номер телефону"></div></div>' +
    '<button class="auth-cta" onclick="wfAuthGo(\'loading\')">Отримати код</button>' +
    '<p class="auth-consent">Продовжуючи, ви підтверджуєте, що згодні увійти до облікового запису <b>Stack</b> та надаєте згоду на обробку персональних даних згідно з <a href="content-legal.html">публічною офертою</a> та <a href="content-legal.html">політикою конфіденційності</a>.</p>' +
    '<div class="auth-or">або</div>' +
    '<div class="smeths"><button class="sbtn" onclick="wfAuthGo(\'loading\')"><span class="ic">G</span> Продовжити з Google</button>' +
    '<button class="sbtn" onclick="wfAuthGo(\'loading\')"><span class="ic"></span> Продовжити з Apple</button>' +
    '<button class="sbtn" onclick="wfAuthGo(\'loading\')"><span class="ic">@</span> Продовжити з E-mail</button></div>' +
    wfAuthFoot('Уже маєте акаунт чи ні — вхід і реєстрація в одному кроці.'));
}
/* optional destination after a completed sign-up/in (e.g. order-placed → its
   account-end state). openAuth(state, dest); wfAuthDone() navigates there if set,
   otherwise closes in place + toast («return to the triggering action»). */
var wfAuthDest = null;
function openAuth(state, dest) { wfAuthMount(); wfAuthDest = dest || null; wfAuthGo(state || 'phone'); var ov = document.getElementById('wf-auth'); if (ov) ov.classList.add('open'); }
function wfAuthGo(state) { wfAuthMount(); var ov = document.getElementById('wf-auth'); if (ov) { ov.dataset.state = state; ov.innerHTML = wfAuthPanel(state); } }
function closeAuth() { var ov = document.getElementById('wf-auth'); if (ov) ov.classList.remove('open'); }
function wfAuthDone() {
  if (wfAuthDest) { location.href = wfAuthDest; return; }  // explicit twin (e.g. order-placed → account-end)
  closeAuth();
  // No explicit destination → flip THIS page to logged-in in place. The header/footer are
  // role-aware (window.WF_ROLE), so re-rendering them as 'buyer' turns any page into its
  // logged-in state (cabinet dropdown, bonuses, role-aware links) without a duplicate file.
  if (typeof wfHeader === 'function') { try { wfHeader('buyer'); if (typeof wfFooter === 'function') wfFooter(); } catch (e) {} }
  wfToast('ok', 'Вітаємо у Stack! Ви увійшли 🎉');
}

/* ============================================================
   CLIENT EDIT (node 5.4a) — SHARED modal (single source of truth). Injected into
   #wf-client-edit on coach-client.html (inline, over the real profile) AND on the
   reference pages coach-client-edit(.html) / -confirm (pinned over dimmed context),
   so they never drift. Edit form + delete-behind-confirm. Client = Андрій / Набір
   маси (matches coach-client.html). openClientEdit()/openClientDelete()/close. ==== */
function wfClientEdit() {
  const el = document.getElementById('wf-client-edit'); if (!el) return;
  const goals = ['Набір маси', 'Схуднення', 'Відновлення', 'Енергія', 'Імунітет', 'Витривалість'];
  let gbtns = ''; goals.forEach((g, i) => { gbtns += '<button type="button"' + (i === 0 ? ' class="on"' : '') + '>' + g + '</button>'; });
  let gbtnsNew = ''; goals.forEach(g => { gbtnsNew += '<button type="button">' + g + '</button>'; });
  const ceNew =
    '<div class="ceov" id="ce-new" role="dialog" aria-modal="true" aria-label="Новий клієнт"><div class="cemodal">' +
    '<div class="ce-top"><h2>Новий клієнт</h2><button class="ce-x" onclick="closeClientEdit()" aria-label="Закрити">✕</button></div>' +
    '<p class="sub">Додайте клієнта у ваш список. Ім\'я та ціль — обов\'язкові; ціль формує підбір товарів у сесії.</p>' +
    '<div class="cef"><label for="cnn">Ім\'я клієнта</label><input id="cnn" type="text" placeholder="Напр., Андрій"></div>' +
    '<div class="cef"><label>Ціль</label><div class="cegoals">' + gbtnsNew + '</div></div>' +
    '<div class="cef"><label for="cnp">Телефон <span class="opt">— необов\'язково</span></label><input id="cnp" type="tel" inputmode="tel" placeholder="+380 __ ___ __ __"></div>' +
    '<div class="cef"><label for="cnm">E-mail <span class="opt">— необов\'язково</span></label><input id="cnm" type="email" placeholder="you@email.com"></div>' +
    '<div class="cef"><label for="cnnote">Нотатки тренера <span class="opt">— необов\'язково</span></label><textarea id="cnnote" placeholder="Напр., алергія на лактозу; ранкові тренування"></textarea></div>' +
    '<div class="ceact"><button class="btn" onclick="closeClientEdit()">Скасувати</button>' +
    '<button class="btn dark" onclick="createClient()">Додати клієнта</button></div>' +
    '</div></div>';
  el.innerHTML = ceNew +
    '<div class="ceov" id="ce-edit" role="dialog" aria-modal="true" aria-label="Редагувати клієнта"><div class="cemodal">' +
    '<div class="ce-top"><h2>Редагувати клієнта</h2><button class="ce-x" onclick="closeClientEdit()" aria-label="Закрити">✕</button></div>' +
    '<p class="sub">Ім\'я та ціль клієнта. Ціль підбирає товари в сесії й у профілі.</p>' +
    '<div class="cef"><label for="cen">Ім\'я клієнта</label><input id="cen" type="text" value="Андрій"></div>' +
    '<div class="cef"><label>Ціль</label><div class="cegoals">' + gbtns + '</div></div>' +
    '<div class="cef"><label for="cep">Телефон</label><input id="cep" type="tel" inputmode="tel" value="+380 67 123 45 67"></div>' +
    '<div class="cef"><label for="cem">E-mail <span class="opt">— необов\'язково</span></label><input id="cem" type="email" value="andriy.koval@email.com"></div>' +
    '<div class="cef"><label for="cenote">Нотатки тренера</label><textarea id="cenote">Алергія на лактозу; тренування вранці</textarea></div>' +
    '<div class="ceact"><button class="btn" onclick="closeClientEdit()">Скасувати</button>' +
    '<button class="btn dark" onclick="saveClientEdit()">Зберегти зміни</button></div>' +
    '<div class="cedel"><button onclick="openClientDelete()">🗑 Видалити клієнта</button>' +
    '<div class="dn">Клієнта буде вилучено зі списку. Минулі замовлення залишаться в історії.</div></div>' +
    '</div></div>' +
    '<div class="ceov" id="ce-confirm" role="dialog" aria-modal="true" aria-label="Видалити клієнта"><div class="cedlg">' +
    '<div class="ic" aria-hidden="true">🗑</div><h2>Видалити клієнта «Андрій»?</h2>' +
    '<p>Клієнта буде вилучено з вашого списку. Минулі замовлення залишаться в історії замовлень. Цю дію не можна скасувати.</p>' +
    '<div class="act"><button class="btn" onclick="openClientEdit()">Скасувати</button>' +
    '<a class="btn dark" href="coach-clients.html">Видалити клієнта</a></div>' +
    '</div></div>';
}
function openClientEdit() { wfClientEdit(); closeClientEdit(); var e = document.getElementById('ce-edit'); if (e) e.classList.add('open'); }
function openClientNew() { wfClientEdit(); closeClientEdit(); var n = document.getElementById('ce-new'); if (n) n.classList.add('open'); }
function openClientDelete() { var e = document.getElementById('ce-edit'), c = document.getElementById('ce-confirm'); if (e) e.classList.remove('open'); if (c) c.classList.add('open'); }
function closeClientEdit() { document.querySelectorAll('#wf-client-edit .ceov.open').forEach(o => o.classList.remove('open')); }
function saveClientEdit() { closeClientEdit(); wfToast('ok', 'Зміни клієнта збережено'); }
function createClient() { closeClientEdit(); wfToast('ok', 'Клієнта додано до списку'); }

/* SHARED add/edit-address dialog (node 7.5) — a method-first flow: step «choose»
   (Відділення / Поштомат / Кур'єр) → a method-specific form. Same dialog serves
   ADD (openAddr) and EDIT (openAddrEdit — prefilled, «Зберегти зміни» + delete).
   City reuses the global «Оберіть місто» dialog (openCity). Into #wf-addr. */
function wfAddrDialog() {
  var el = document.getElementById('wf-addr'); if (!el) return;
  el.className = '';
  var cityFld = '<div class="cef"><label>Місто</label><button type="button" class="addr-cityfld" onclick="openCity()"><span>📍 Одеса</span><span class="chg">Змінити</span></button></div>';
  var recv = '<div class="addr-2col"><div class="cef"><label>Ім\'я</label><input type="text" value="Вікторія"></div><div class="cef"><label>Прізвище</label><input type="text" value="Коваль"></div></div>' +
             '<div class="cef"><label>Телефон</label><input type="tel" inputmode="tel" value="+380 67 123 45 67"></div>';
  var def = '<label class="addr-check"><input type="checkbox"> Зробити основною адресою</label>';
  var delRow = '<div class="addr-del-row" hidden><button type="button" onclick="openAddrDelete()">🗑 Видалити адресу</button></div>';
  function acts() { return '<div class="ceact"><button type="button" class="btn" onclick="closeAddr()">Скасувати</button><button type="button" class="btn dark addr-save" onclick="saveAddr()">Зберегти адресу</button></div>'; }
  function back() { return '<button type="button" class="addr-back" onclick="addrStep(\'choose\')">‹ Інший спосіб</button>'; }

  el.innerHTML =
    '<div class="ceov" id="addr-dlg" role="dialog" aria-modal="true" aria-label="Адреса доставки"><div class="cemodal addr-modal">' +
    '<div class="ce-top"><h2 id="addr-title">Нова адреса</h2><button class="ce-x" onclick="closeAddr()" aria-label="Закрити">✕</button></div>' +

    '<div class="addr-step" data-step="choose">' +
      '<p class="sub">Оберіть спосіб доставки — далі заповнимо лише потрібні поля.</p>' +
      '<div class="addr-methods">' +
        '<button type="button" class="addr-method" onclick="addrStep(\'vidd\')"><span class="am-ic">📦</span><span class="am-tx"><b>Відділення Нової Пошти</b><i>Забрати у відділенні — за номером або адресою</i></span><span class="am-ar">›</span></button>' +
        '<button type="button" class="addr-method" onclick="addrStep(\'post\')"><span class="am-ic">🔳</span><span class="am-tx"><b>Поштомат Нової Пошти</b><i>Самостійно, цілодобово — за номером поштомата</i></span><span class="am-ar">›</span></button>' +
        '<button type="button" class="addr-method" onclick="addrStep(\'cour\')"><span class="am-ic">🚚</span><span class="am-tx"><b>Кур\'єр Нової Пошти</b><i>Доставка за вашою адресою</i></span><span class="am-ar">›</span></button>' +
      '</div>' +
      '<div class="addr-note">Самовивіз із магазину Stack обирається безпосередньо в кошику під час оформлення — його не треба зберігати тут.</div>' +
    '</div>' +

    '<div class="addr-step" data-step="vidd" hidden>' + back() + cityFld +
      '<div class="cef"><label>Відділення</label><input type="text" placeholder="Почніть вводити номер або вулицю" value="№ 12 — вул. Катерининська, 27"></div>' +
      recv + def + acts() + delRow + '</div>' +

    '<div class="addr-step" data-step="post" hidden>' + back() + cityFld +
      '<div class="cef"><label>Поштомат</label><input type="text" placeholder="Номер поштомата або адреса" value="№ 24857 — просп. Небесної Сотні, 4"></div>' +
      recv + def + acts() + delRow + '</div>' +

    '<div class="addr-step" data-step="cour" hidden>' + back() + cityFld +
      '<div class="cef"><label>Вулиця</label><input type="text" placeholder="Напр., вул. Дерибасівська" value="вул. Дерибасівська"></div>' +
      '<div class="addr-2col"><div class="cef"><label>Будинок</label><input type="text" value="15"></div><div class="cef"><label>Квартира</label><input type="text" value="8"></div></div>' +
      '<div class="cef"><label>Під\'їзд / поверх <span class="opt">— необов\'язково</span></label><input type="text" placeholder="Напр., 2 під\'їзд, 4 поверх"></div>' +
      recv + def + acts() + delRow + '</div>' +

    '</div></div>' +

    '<div class="ceov" id="addr-del" role="dialog" aria-modal="true" aria-label="Видалити адресу"><div class="cedlg">' +
    '<div class="ic" aria-hidden="true">🗑</div><h2>Видалити адресу?</h2>' +
    '<p>Адресу буде вилучено зі збережених. Це не вплине на вже оформлені замовлення.</p>' +
    '<div class="act"><button type="button" class="btn" onclick="closeAddrDelete()">Скасувати</button>' +
    '<button type="button" class="btn dark" onclick="confirmAddrDelete()">Видалити</button></div>' +
    '</div></div>';
}
function addrSetMode(edit) {
  var m = document.querySelector('#addr-dlg .cemodal'); if (!m) return;
  m.classList.toggle('mode-edit', !!edit);
  document.querySelectorAll('#addr-dlg .addr-save').forEach(function (b) { b.textContent = edit ? 'Зберегти зміни' : 'Зберегти адресу'; });
  document.querySelectorAll('#addr-dlg .addr-del-row').forEach(function (r) { r.hidden = !edit; });
}
function openAddr(step) { wfAddrDialog(); addrSetMode(false); var d = document.getElementById('addr-dlg'); if (d) d.classList.add('open'); addrStep(step || 'choose'); }
function openAddrEdit(step) { wfAddrDialog(); addrSetMode(true); var d = document.getElementById('addr-dlg'); if (d) d.classList.add('open'); addrStep(step || 'vidd'); }
function addrStep(s) {
  var m = document.querySelector('#addr-dlg .cemodal');
  var edit = m && m.classList.contains('mode-edit');
  var names = { choose: '', vidd: 'Відділення', post: 'Поштомат', cour: 'Кур\'єр' };
  document.querySelectorAll('#addr-dlg .addr-step').forEach(function (p) { p.hidden = (p.getAttribute('data-step') !== s); });
  var t = document.getElementById('addr-title');
  if (t) t.textContent = (edit ? 'Редагувати адресу' : 'Нова адреса') + (names[s] ? ' · ' + names[s] : '');
}
function closeAddr() { var d = document.getElementById('addr-dlg'); if (d) d.classList.remove('open'); }
function saveAddr() { var m = document.querySelector('#addr-dlg .cemodal'); var edit = m && m.classList.contains('mode-edit'); closeAddr(); wfToast('ok', edit ? 'Зміни адреси збережено' : 'Адресу збережено'); }
function openAddrDelete() { var d = document.getElementById('addr-dlg'), c = document.getElementById('addr-del'); if (d) d.classList.remove('open'); if (c) c.classList.add('open'); }
function closeAddrDelete() { var c = document.getElementById('addr-del'), d = document.getElementById('addr-dlg'); if (c) c.classList.remove('open'); if (d) d.classList.add('open'); }
function confirmAddrDelete() { closeAddrDelete(); closeAddr(); wfToast('ok', 'Адресу видалено'); }
function wfAddrMakeDefault() { wfToast('ok', 'Адресу призначено основною'); }

/* SHARED profile dialogs (node 7.1) — passwordless (auth 1.x): change phone /
   add-or-change e-mail are 2-step OTP flows (enter → code); plus language pick
   and a delete-account danger confirm. Rendered into #wf-profile. */
function wfProfileDialogs() {
  var el = document.getElementById('wf-profile'); if (!el) return;
  el.className = '';
  function otp() { return (typeof wfOtp === 'function') ? wfOtp(['', '', '', '', '', ''], false) : ''; }

  var phone =
    '<div class="ceov" id="pf-phone" role="dialog" aria-modal="true" aria-label="Змінити номер"><div class="cemodal">' +
    '<div class="ce-top"><h2 id="pf-phone-t">Змінити номер телефону</h2><button class="ce-x" onclick="closeProf()" aria-label="Закрити">✕</button></div>' +
    '<div class="pf-dstep" data-s="enter"><p class="sub">Введіть новий номер — надішлемо на нього код у SMS. Пароль не потрібен.</p>' +
      '<div class="cef"><label>Новий номер телефону</label><input type="tel" inputmode="tel" placeholder="+380 __ ___ __ __" value="+380 "></div>' +
      '<div class="ceact"><button type="button" class="btn" onclick="closeProf()">Скасувати</button><button type="button" class="btn dark" onclick="profStep(\'pf-phone\',\'code\')">Отримати код</button></div></div>' +
    '<div class="pf-dstep" data-s="code" hidden><p class="sub">Ми надіслали код у SMS на новий номер. Введіть його, щоб підтвердити зміну.</p>' +
      '<div class="cef"><label>Код підтвердження</label>' + otp() + '<div class="otp-note">Код діє 5 хвилин. <a class="pf-resend" onclick="wfToast(\'info\',\'Код надіслано ще раз\')">Надіслати ще раз</a></div></div>' +
      '<div class="ceact"><button type="button" class="btn" onclick="profStep(\'pf-phone\',\'enter\')">‹ Змінити номер</button><button type="button" class="btn dark" onclick="closeProf();wfToast(\'ok\',\'Номер телефону оновлено\')">Підтвердити</button></div></div>' +
    '</div></div>';

  var email =
    '<div class="ceov" id="pf-email" role="dialog" aria-modal="true" aria-label="E-mail"><div class="cemodal">' +
    '<div class="ce-top"><h2 id="pf-email-t">Додати e-mail</h2><button class="ce-x" onclick="closeProf()" aria-label="Закрити">✕</button></div>' +
    '<div class="pf-dstep" data-s="enter"><p class="sub">Вкажіть e-mail — надішлемо код для підтвердження. Без пароля.</p>' +
      '<div class="cef"><label>E-mail</label><input type="email" placeholder="you@email.com"></div>' +
      '<div class="ceact"><button type="button" class="btn" onclick="closeProf()">Скасувати</button><button type="button" class="btn dark" onclick="profStep(\'pf-email\',\'code\')">Отримати код</button></div></div>' +
    '<div class="pf-dstep" data-s="code" hidden><p class="sub">Ми надіслали код на вашу пошту. Введіть його, щоб підтвердити e-mail.</p>' +
      '<div class="cef"><label>Код підтвердження</label>' + otp() + '<div class="otp-note">Код діє 5 хвилин. <a class="pf-resend" onclick="wfToast(\'info\',\'Код надіслано ще раз\')">Надіслати ще раз</a></div></div>' +
      '<div class="ceact"><button type="button" class="btn" onclick="profStep(\'pf-email\',\'enter\')">‹ Змінити e-mail</button><button type="button" class="btn dark" onclick="closeProf();wfToast(\'ok\',\'E-mail підтверджено\')">Підтвердити</button></div></div>' +
    '</div></div>';

  var langs = ['Українська', 'English'];
  var lrows = ''; langs.forEach(function (l, i) {
    lrows += '<label class="pf-lang' + (i === 0 ? ' on' : '') + '"><input type="radio" name="pf-lang"' + (i === 0 ? ' checked' : '') + '><span>' + l + '</span><span class="rc" aria-hidden="true"></span></label>';
  });
  var lang =
    '<div class="ceov" id="pf-lang" role="dialog" aria-modal="true" aria-label="Мова інтерфейсу"><div class="cemodal">' +
    '<div class="ce-top"><h2>Мова інтерфейсу</h2><button class="ce-x" onclick="closeProf()" aria-label="Закрити">✕</button></div>' +
    '<div class="pf-langs">' + lrows + '</div>' +
    '<div class="ceact"><button type="button" class="btn" onclick="closeProf()">Скасувати</button><button type="button" class="btn dark" onclick="closeProf();wfToast(\'ok\',\'Мову збережено\')">Зберегти</button></div>' +
    '</div></div>';

  var del =
    '<div class="ceov" id="pf-del" role="dialog" aria-modal="true" aria-label="Видалити акаунт"><div class="cedlg">' +
    '<div class="ic" aria-hidden="true">⚠️</div><h2>Видалити акаунт?</h2>' +
    '<p>Буде видалено ваш профіль, збережені адреси, обране та <b>бонуси, що згорять безповоротно</b>. Історія замовлень зберігається за вимогами обліку. Цю дію не можна скасувати.</p>' +
    '<label class="pf-delcheck"><input type="checkbox" id="pf-del-ok" onchange="document.getElementById(\'pf-del-btn\').disabled=!this.checked"> Розумію, що акаунт буде видалено назавжди</label>' +
    '<div class="act"><button type="button" class="btn" onclick="closeProf()">Скасувати</button>' +
    '<button type="button" class="btn dark" id="pf-del-btn" disabled onclick="closeProf();wfToast(\'ok\',\'Запит на видалення прийнято\')">Видалити акаунт</button></div>' +
    '</div></div>';

  el.innerHTML = phone + email + lang + del;
}
function closeProf() { document.querySelectorAll('#wf-profile .ceov.open').forEach(function (o) { o.classList.remove('open'); }); }
function profStep(dlg, s) {
  var d = document.getElementById(dlg); if (!d) return;
  d.querySelectorAll('.pf-dstep').forEach(function (p) { p.hidden = (p.getAttribute('data-s') !== s); });
}
function openProfPhone() { wfProfileDialogs(); closeProf(); profStep('pf-phone', 'enter'); var d = document.getElementById('pf-phone'); if (d) d.classList.add('open'); }
function openProfEmail(mode) {
  wfProfileDialogs(); closeProf(); profStep('pf-email', 'enter');
  var t = document.getElementById('pf-email-t'); if (t) t.textContent = (mode === 'change') ? 'Змінити e-mail' : 'Додати e-mail';
  var d = document.getElementById('pf-email'); if (d) d.classList.add('open');
}
function openProfLang() { wfProfileDialogs(); closeProf(); var d = document.getElementById('pf-lang'); if (d) d.classList.add('open'); }
function openProfDelete() { wfProfileDialogs(); closeProf(); var d = document.getElementById('pf-del'); if (d) d.classList.add('open'); }
function profSave() { wfToast('ok', 'Зміни збережено'); }

/* SHARED account section-nav (node 7.x) — one source for account.html + every
   account-*.html sub-page. active = section key; isCoach swaps «Стати тренером»
   → «Кабінет тренера» (the already-a-coach state). Inject into #acc-nav. */
const WF_ACC_LINKS = [
  { k: 'overview',  href: 'account.html',           ic: '▦', label: 'Огляд' },
  { k: 'orders',    href: 'account-orders.html',     ic: '📦', label: 'Замовлення', ct: '12' },
  { k: 'loyalty',   href: 'account-loyalty.html',    ic: '★', label: 'Лояльність і бонуси' },
  { k: 'wishlist',  href: 'account-wishlist.html',   ic: '♡', label: 'Обране', ct: '8' },
  { k: 'addresses', href: 'account-addresses.html',  ic: '📍', label: 'Адреси', ct: '2' },
  { k: 'profile',   href: 'account-profile.html',    ic: '👤', label: 'Профіль' },
];
function wfAccountNav(active, isCoach) {
  const el = document.getElementById('acc-nav'); if (!el) return;
  el.className = 'acc-nav';
  let links = '';
  WF_ACC_LINKS.forEach(l => {
    const cur = l.k === active ? ' aria-current="page"' : '';
    const ct = l.ct ? '<span class="ct">' + l.ct + '</span>' : '';
    links += '<a class="acc-link" href="' + l.href + '"' + cur + '><span class="ic">' + l.ic + '</span> ' + l.label + ' ' + ct + '<span class="ar">›</span></a>';
  });
  // become-a-coach vs already-a-coach (role active)
  links += isCoach
    ? '<a class="acc-link" href="coach-home.html"><span class="ic">🎓</span> Кабінет тренера <span class="ar">›</span></a>'
    : '<a class="acc-link" href="coach-verify.html"><span class="ic">🎓</span> Стати тренером <span class="ar">›</span></a>';
  links += '<a class="acc-link logout" href="home.html"><span class="ic">⎋</span> Вийти</a>';
  const nm = isCoach ? 'Олена Кравець' : 'Вікторія Коваль';
  const av = isCoach ? 'ОК' : 'ВК';
  const ph = isCoach ? '+380 ** *** 21 09' : '+380 ** *** 45 67';
  el.innerHTML =
    '<div class="acc-prof"><div class="av">' + av + '</div><div class="who">' +
    '<div class="nm">' + nm + '</div><div class="ph">' + ph + '</div>' +
    '<span class="acc-tier">' + (isCoach ? 'Pro · Тренер' : '🥈 Срібний рівень') + '</span></div></div>' +
    '<nav class="acc-links" aria-label="Розділи кабінету">' + links + '</nav>';
}

function wfToasts() { const el = document.getElementById('wf-toast'); if (!el) return; el.className = 'wf-toasts'; el.setAttribute('aria-live', 'polite'); el.innerHTML = ''; }
function wfToast(type, msg) {
  const wrap = document.getElementById('wf-toast'); if (!wrap) return;
  const ic = type === 'ok' ? '✓' : (type === 'error' ? '!' : 'i');
  const t = document.createElement('div');
  t.className = 'wf-toast ' + (type || 'info');
  t.innerHTML = '<span class="tt-ic">' + ic + '</span><span class="tt-m">' + msg + '</span><button class="tt-x" aria-label="Закрити">✕</button>';
  t.querySelector('.tt-x').onclick = () => t.remove();
  wrap.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 250); }, 4200);
}

/* ============================================================
   Inherited components rendered once (conventions §7). Inject into
   #wf-header / #wf-footer / #wf-rail / #wf-sheet placeholders.
   ============================================================ */
/* wfHeader(role) — role: undefined/'guest' (default) · 'buyer' · 'coach'.
   Guest → 👤 «Увійти» (opens dialog). Logged-in → 👤 «Кабінет» + dropdown
   (per navigation.md: Кабінет · Замовлення · Адреси · Стати тренером · Вихід;
   coach adds tier chip + Кабінет тренера · Клієнти · Нова сесія, drops «Стати
   тренером»). «Обране» + «Бонуси» stay their own header elements (not in menu). */
function wfHeader(role) {
  role = role || 'guest';
  window.WF_ROLE = role;   // shared so wfFooter() (and any shared nav) can route guest vs logged-in variants
  const isCoach = role === 'coach';
  const loggedIn = isCoach || role === 'buyer';
  // role-aware home target: logged-in pages link to the logged-in home variant
  const homeHref = isCoach ? 'home-coach.html' : (role === 'buyer' ? 'home-buyer.html' : 'home.html');
  const name = isCoach ? 'Олена Кравець' : 'Вікторія Коваль';
  let acctHTML;
  if (!loggedIn) {
    acctHTML = `<a class="wfh-act stack" href="auth.html" onclick="openAuth('phone');return false"><span class="g">👤</span><span class="lbl">Увійти</span></a>`;
  } else {
    let items = `<div class="cab-head"><span class="cab-nm">${name}</span>` +
      (isCoach ? `<span class="cab-tier">PRO</span>` : `<span class="cab-lvl">🥈 Срібний рівень</span>`) + `</div>`;
    if (isCoach) {
      items += `<a href="coach-home.html">Кабінет тренера</a><a href="coach-clients.html">Клієнти</a>` +
        `<a href="coach-session.html">＋ Нова сесія</a><a href="coach-orders.html">Замовлення тренера</a>` +
        `<div class="cab-sep"></div><a href="account.html?r=coach">Мій профіль</a><a href="account-addresses.html?r=coach">Адреси</a>`;
    } else {
      items += `<a href="account.html">Кабінет</a><a href="account.html">Замовлення</a>` +
        `<a href="account.html">Адреси</a><a href="coach-verify.html">Стати тренером</a>`;
    }
    items += `<div class="cab-sep"></div><a href="home.html">Вийти</a>`;
    acctHTML = `<div class="wfh-cab"><button class="wfh-act stack wfh-cabbtn" onclick="toggleCab(event)" aria-haspopup="true" aria-expanded="false">` +
      `<span class="g">👤</span><span class="lbl">Кабінет ▾</span></button>` +
      `<div class="wfh-cabmenu" id="wfh-cabmenu" role="menu">${items}</div></div>`;
  }
  const bonusVal = loggedIn ? '124 ₴' : 'Отримати';  // canonical buyer balance (account 7.4 · Вікторія)
  const el = document.getElementById('wf-header'); if (!el) return;
  el.className = 'wfh';
  el.innerHTML = `
    <div class="wfh-meta"><div class="wfh-in">
      <a class="strongl" href="coach-landing.html">Для тренерів</a><a href="content-promo.html">Акції</a><a href="brands.html">Бренди</a><a href="content-delivery.html">Доставка</a><a href="content-returns.html">Повернення</a><a href="content-about.html">Про нас</a>
      <span class="wfh-sp"></span><a href="#" onclick="openCity();return false">📍 <span class="wfh-city-lbl">Одеса</span> ▾</a><a>Укр ▾</a>
    </div></div>
    <div class="wfh-main wfh-in">
      <button class="wfh-burger" aria-label="Меню" onclick="openBurger()">☰</button>
      <a class="wfh-logo" href="${homeHref}">Stack</a>
      <nav class="wfh-nav" aria-label="Головна навігація">
        <div class="wfh-cat" onmouseenter="openMega()" onmouseleave="closeMega()">
          <a class="navbtn" href="catalog-page.html"><span class="g">▦</span> Каталог <span class="cav">▾</span></a>
          ${wfMegaHTML()}
        </div>
        <a class="navlink" href="quiz.html">✦ Квіз</a>
      </nav>
      <form class="wfh-search" role="search" action="search.html">
        <input type="search" placeholder="Пошук товарів, брендів…" aria-label="Пошук">
        <button class="go" type="submit">Знайти</button>
      </form>
      <div class="wfh-mi">
        <a href="search.html" aria-label="Пошук">🔍</a>
        <a href="account.html" aria-label="Обране">♡</a>
        <a href="cart.html" aria-label="Кошик">🛒</a>
      </div>
      <div class="wfh-actions">
        ${acctHTML}
        <a class="wfh-act stack" href="account.html"><span class="g">♡</span><span class="lbl">Обране</span></a>
        <a class="wfh-act" href="account.html"><span class="g">★</span><span class="t"><span class="cap">Бонуси</span><span class="val">${bonusVal}</span></span></a>
        <a class="wfh-act" href="cart.html"><span class="g">🛒</span><span class="lbl">Кошик</span></a>
      </div>
    </div>
    ${wfCityHTML()}
    ${wfDrawerHTML()}`;
  el.setAttribute('role', 'banner');
  /* body-level scrim (BELOW the sticky header in z-order, above page content) so the
     whole header stays crisp while the page dims when the mega opens */
  if (!document.getElementById('wfh-scrim')) {
    var sc = document.createElement('div');
    sc.id = 'wfh-scrim'; sc.className = 'wfh-scrim'; sc.setAttribute('aria-hidden', 'true');
    sc.onclick = closeMega;
    document.body.appendChild(sc);
  }
}

function wfFooter() {
  const el = document.getElementById('wf-footer'); if (!el) return;
  // logged-in buyer → personal loyalty variant; guest/coach → generic public landing
  const loyHref = (window.WF_ROLE === 'buyer') ? 'content-loyalty-buyer.html' : 'content-loyalty.html';
  el.className = 'wff';
  el.innerHTML = `
    <div class="wff-trust">
      <div class="wff-tc"><div class="th">Доставка 1–2 дні</div><div class="ts">Нова Пошта по всій Україні</div></div>
      <div class="wff-tc"><div class="th">Гарантія оригіналу</div><div class="ts">Сертифікати на кожен товар</div></div>
      <div class="wff-tc"><div class="th">Оплата як зручно</div><div class="ts">Картка · Apple/Google Pay · при отриманні</div></div>
      <div class="wff-tc"><div class="th">Повернення 14 днів</div><div class="ts">Без зайвих питань</div></div>
    </div>
    <div class="wff-cols">
      <div class="wff-col"><h4>Розсилка</h4>
        <div class="wff-news"><input type="email" placeholder="E-mail для новин та акцій" aria-label="E-mail"><button type="button">OK</button></div>
        <a href="content-reviews.html">★ Підтримайте нас — оцінка в Google</a></div>
      <div class="wff-col"><h4>Stack</h4><a href="content-about.html">Про нас</a><a href="content-contacts.html">Контакти</a><a href="content-blog.html">Блог</a><a href="content-legal.html">Публічна оферта</a><a href="content-legal.html">Політика конфіденційності</a><a href="content-legal.html">Умови використання</a></div>
      <div class="wff-col"><h4>Покупцям</h4><a href="${loyHref}">Знижки та бонуси</a><a href="content-delivery.html">Доставка й оплата</a><a href="content-returns.html">Повернення</a><a href="content-faq.html">FAQ</a></div>
      <div class="wff-col"><h4>Тренерам</h4><a href="coach-landing.html">Для тренерів</a><a href="coach-landing.html">Тарифи Free / Pro</a></div>
      <div class="wff-col"><h4>Консультація</h4><a href="content-contacts.html">0 800 000 000</a><a href="content-contacts.html">Telegram · Viber</a><a href="content-contacts.html">Пн–Нд 9:00–21:00</a></div>
    </div>
    <div class="wff-seo">
      <b>Популярні категорії:</b> Протеїн · Гейнери · Креатин · BCAA · Передтренувальні · Вітаміни ·&nbsp;&nbsp;
      <b>За ціллю:</b> Набір маси · Схуднення · Відновлення · Енергія ·&nbsp;&nbsp;
      <b>Бренди:</b> Optimum Nutrition · BioTechUSA · Myprotein ·&nbsp;&nbsp;
      <b>Міста:</b> Протеїн Київ · Протеїн Одеса · Протеїн Львів
    </div>
    <div class="wff-bot">
      <span>© 2026 Stack. Спортивне харчування в Україні. · <a href="content-legal.html" style="color:inherit;text-decoration:underline">Політика</a> · <a href="content-legal.html" style="color:inherit;text-decoration:underline">Умови</a> · <a href="#" onclick="openCookieSettings();return false" style="color:inherit;text-decoration:underline">Змінити згоду</a></span>
      <span class="wff-soc"><a href="content-contacts.html" style="color:inherit">Instagram</a><a href="content-contacts.html" style="color:inherit">Telegram</a><a href="content-contacts.html" style="color:inherit">YouTube</a></span>
      <span>Visa · Mastercard · Apple Pay · Google Pay</span>
    </div>`;
  el.setAttribute('role', 'contentinfo');
}

/* listing filter rail (category «Протеїн»); Тип = subcategory links, rest = facets.
   checked = array of facet labels to render as active (e.g. ['Optimum Nutrition','В наявності']). */
function wfCatalogRail(checked) {
  const el = document.getElementById('wf-rail'); if (!el) return;
  checked = checked || [];
  const opt = (label, ct) => `<label class="fopt"><span class="cb${checked.includes(label) ? ' on' : ''}"></span> ${label} <span class="ct">${ct}</span></label>`;
  el.className = 'frail';
  el.setAttribute('aria-label', 'Фільтри');
  el.innerHTML = `
    <div class="fgroup"><div class="fh">Тип протеїну <span class="ar">▾</span></div>
      <div class="flinks">
        <a class="flink" href="listing.html">Концентрат <span class="ct">31</span></a>
        <a class="flink" href="listing.html">Ізолят <span class="ct">18</span></a>
        <a class="flink" href="listing.html">Гідролізат <span class="ct">5</span></a>
        <a class="flink" href="listing.html">Казеїн <span class="ct">9</span></a>
        <a class="flink" href="listing.html">Комплексний <span class="ct">14</span></a>
        <a class="flink" href="listing.html">Рослинний <span class="ct">6</span></a>
      </div>
    </div>
    <div class="fgroup"><div class="fh">Наявність <span class="ar">▾</span></div>
      ${opt('В наявності', 71)}${opt('Під замовлення', 13)}
    </div>
    <div class="fgroup"><div class="fh">Ціна, ₴ <span class="ar">▾</span></div>
      <div class="frange"></div>
      <div class="frow"><span class="in">800</span><span class="in">1500</span></div>
    </div>
    <div class="fgroup"><div class="fh">Бренд <span class="ar">▾</span></div>
      ${opt('Optimum Nutrition', 12)}${opt('BioTechUSA', 9)}${opt('Myprotein', 7)}${opt('Scitec Nutrition', 6)}${opt('OstroVit', 8)}
      <div class="fmore">+ ще 11 ▾ · 🔍 пошук бренду</div>
    </div>
    <div class="fgroup"><div class="fh">Ціль <span class="ar">▾</span></div>
      ${opt('Набір маси', 52)}${opt('Схуднення', 23)}${opt('Відновлення', 18)}
    </div>
    <div class="fgroup"><div class="fh">Смак <span class="ar">▾</span></div>
      ${opt('Шоколад', 58)}${opt('Ваніль', 44)}${opt('Полуниця', 31)}${opt('Без смаку', 9)}
    </div>
    <div class="fgroup"><div class="fh">Країна <span class="ar">▾</span></div>
      ${opt('США', 28)}${opt('Німеччина', 9)}${opt('Україна', 16)}
    </div>
    <div class="fgroup"><div class="fh">Форма випуску <span class="ar">▾</span></div>
      ${opt('Порошок', 68)}${opt('Готовий напій (RTD)', 6)}${opt('Капсули / таблетки', 4)}
    </div>
    <div class="fgroup"><div class="fh">Фасування, вага <span class="ar">▾</span></div>
      ${opt('до 1 кг', 22)}${opt('1–2 кг', 39)}${opt('2 кг і більше', 17)}
    </div>
    <div class="fgroup"><div class="fh">Сертифікація <span class="ar">▾</span></div>
      ${opt('Сертифікат відповідності', 84)}${opt('Лаб. тести (Informed Sport)', 7)}
    </div>`;
}

function wfSheet() {
  const el = document.getElementById('wf-sheet'); if (!el) return;
  el.innerHTML = `
    <div class="fsheet-ov" id="fsheet-ov" onclick="closeSheet()"></div>
    <div class="fsheet" id="fsheet" role="dialog" aria-modal="true" aria-label="Фільтри">
      <div class="fsheet-h">Фільтри <button class="x" onclick="closeSheet()" aria-label="Закрити">✕</button></div>
      <div style="padding:4px 0">
        <div class="fgroup"><div class="fh">Тип протеїну</div>
          <div class="flinks">
            <a class="flink" href="listing.html">Концентрат <span class="ct">31</span></a>
            <a class="flink" href="listing.html">Ізолят <span class="ct">18</span></a>
            <a class="flink" href="listing.html">Казеїн <span class="ct">9</span></a>
          </div>
        </div>
        <div class="fgroup"><div class="fh">Наявність</div>
          <label class="fopt"><span class="cb on"></span> В наявності <span class="ct">71</span></label>
          <label class="fopt"><span class="cb"></span> Під замовлення <span class="ct">13</span></label>
        </div>
        <div class="fgroup"><div class="fh">Ціна, ₴</div><div class="frange"></div><div class="frow"><span class="in">800</span><span class="in">1500</span></div></div>
        <div class="fgroup"><div class="fh">Бренд · Ціль · Смак · Країна · Форма · Фасування</div>
          <label class="fopt"><span class="cb on"></span> Optimum Nutrition <span class="ct">12</span></label>
          <label class="fopt"><span class="cb"></span> Набір маси <span class="ct">52</span></label>
          <label class="fopt"><span class="cb"></span> Порошок <span class="ct">68</span></label>
        </div>
      </div>
      <div class="fsheet-foot">
        <a class="btn" href="listing.html">Скинути</a>
        <button class="btn dark" onclick="closeSheet()">Застосувати (47)</button>
      </div>
    </div>`;
}
function openSheet() { document.getElementById('fsheet').classList.add('open'); document.getElementById('fsheet-ov').classList.add('open'); }
function closeSheet() { const s = document.getElementById('fsheet'), o = document.getElementById('fsheet-ov'); if (s) s.classList.remove('open'); if (o) o.classList.remove('open'); }
/* logged-in account dropdown (navigation.md) */
function toggleCab(e) { if (e) e.stopPropagation(); const m = document.getElementById('wfh-cabmenu'); if (!m) return; const open = m.classList.toggle('open'); const b = m.parentElement.querySelector('.wfh-cabbtn'); if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false'); }
function closeCab() { const m = document.getElementById('wfh-cabmenu'); if (!m) return; m.classList.remove('open'); const b = m.parentElement.querySelector('.wfh-cabbtn'); if (b) b.setAttribute('aria-expanded', 'false'); }
document.addEventListener('click', e => { const cab = document.getElementById('wfh-cabmenu'); if (cab && cab.classList.contains('open') && !e.target.closest('.wfh-cab')) closeCab(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeSheet(); closeCity(); closeBurger(); closeCookieSettings(); closeCab(); closeMega(); closeAuth(); if (typeof closeClientEdit === 'function') closeClientEdit(); if (typeof closePM === 'function') closePM(); } });
