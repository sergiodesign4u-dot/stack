/* ============================================================
   Stack — Wireframes navigation (_nav.js)
   ONE source of truth (mirrors wireframes/_screens.md).
   Powers: (a) the «Всі екрани» tree on index.html  → wfTree('id')
           (b) the thin prototype bar on each screen → wfBar('file.html')
   Flip built:true / add to builtStates as screens/states are drawn.
   ============================================================ */

const WF_STATE_LABEL = {
  base: 'Базовий', empty: 'Порожньо', loading: 'Завантаження', error: 'Помилка',
  filtered: 'З фільтрами', list: 'Списком', oos: 'Немає в наявності', reviews: 'Відгуки (Job 3)',
  buyer: 'Покупець', coach: 'Тренер',
  guest: 'Гість', declined: 'Оплата відхилена', noaddr: 'Без адреси', loggedin: 'У кабінеті',
  code: 'Крок коду', newuser: 'Новий користувач', 'account-end': 'З акаунтом',
  tier: 'Вибір тарифу', deadend: 'Глухий кут', cap: 'Ліміт клієнтів',
  addclient: 'Додати клієнта', priceblock: 'Ціна не підтверджена', untagged: 'Без клієнта',
  confirm: 'Підтвердження', suggest: 'Підказки', 'no-results': 'Нічого не знайдено'
};

const WF_FLOWS = [
  {
    id: 'f1', name: 'Флоу 1 · Покупець-новачок', status: 'active',
    note: 'Головна → Категорія → Картка товару → Кошик → Оформлення → Замовлення',
    screens: [
      { file: 'home.html',         name: 'Головна',              node: '0.0', built: true,  states: ['buyer','coach'], builtStates: ['buyer','coach'] },
      { file: 'listing.html',      name: 'Категорія (лістинг)',  node: '2.1', built: true,  states: ['filtered','list','empty','loading','error'], builtStates: ['filtered','list','empty','loading','error'] },
      { file: 'goal.html',         name: 'Ціль-колекція',        node: '2.2', built: true,  states: ['empty','loading','error'], builtStates: ['empty','loading','error'] },
      { file: 'product.html',      name: 'Картка товару',        node: '3.0', built: true,  states: ['loading','error','oos','reviews'], builtStates: ['loading','error','oos','reviews'] },
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
      { file: 'coach-clients.html', name: 'Клієнти',                node: '5.3', built: true,  states: ['empty','loading','error','cap'], builtStates: ['empty','loading','error','cap'] },
      { file: 'coach-client.html',  name: 'Профіль клієнта',        node: '5.4', built: true,  states: ['empty','loading','error'], builtStates: ['empty','loading','error'] },
      { file: 'coach-client-edit.html', name: 'Редагування клієнта', node: '5.4a', built: true, states: ['confirm'], builtStates: ['confirm'] },
      { file: 'coach-session.html', name: 'Мультиклієнтська сесія', node: '5.5', built: true,  states: ['addclient','loading','oos','priceblock','untagged'], builtStates: ['addclient','loading','oos','priceblock','untagged'] },
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
      { file: 'brands.html',       name: 'Бренди (індекс)',    node: '2.4', built: true, states: ['empty','loading','error'], builtStates: ['empty','loading','error'] },
      { file: 'search.html',       name: 'Пошук',              node: '2.5', built: true, states: ['suggest','empty','loading'], builtStates: ['suggest','empty','loading'] }
    ]
  },
  {
    id: 'f4', name: 'Контент, інфо та лояльність', status: 'active',
    note: 'сервісні / SEO-сторінки (8.x): 7 шаблонів на 13 вузлів — інфо · лояльність · FAQ · блог · акції · відгуки · розсилка',
    screens: [
      { file: 'content-loyalty.html', name: 'Бонусна програма', node: '8.7', built: true, states: [], builtStates: [] },
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
    { node: '0.1',  name: 'Хедер · мега-меню · діалог міста',  ia: 'navigation.html' },
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
    { node: '4.x',  name: 'Квіз-гайд',                         ia: 'quiz.html' },
  ]},
  { cluster: '5 · Тренер (Job 1)', items: [
    { node: '5.0',  name: 'Для тренерів (лендинг)',            file: 'coach-landing.html' },
    { node: '5.1',  name: 'Стати тренером',                    file: 'coach-verify.html' },
    { node: '5.2',  name: 'Кабінет тренера',                   file: 'coach-home.html' },
    { node: '5.3',  name: 'Клієнти',                           file: 'coach-clients.html' },
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
    { node: '7.0',  name: 'Кабінет покупця',                   file: 'account.html' },
    { node: '7.1–7.7', name: 'Профіль · Лояльність · Адреси · Обране (розділи)', ia: 'account.html' },
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
    { node: '',     name: '404 · 500 · Технічні роботи',       ia: 'system.html' },
    { node: '',     name: 'Cookie-банер · Тости',              ia: 'system.html' },
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
   Inherited components rendered once (conventions §7). Inject into
   #wf-header / #wf-footer / #wf-rail / #wf-sheet placeholders.
   ============================================================ */
function wfHeader() {
  const el = document.getElementById('wf-header'); if (!el) return;
  el.className = 'wfh';
  el.innerHTML = `
    <div class="wfh-meta"><div class="wfh-in">
      <a class="strongl" href="coach-landing.html">Для тренерів</a><a href="content-promo.html">Акції</a><a href="brands.html">Бренди</a><a href="content-delivery.html">Доставка</a><a href="content-returns.html">Повернення</a><a href="content-about.html">Про нас</a>
      <span class="wfh-sp"></span><a>📍 Одеса</a><a>Укр</a>
    </div></div>
    <div class="wfh-main wfh-in">
      <button class="wfh-burger" aria-label="Меню">☰</button>
      <a class="wfh-logo" href="home.html">Stack</a>
      <nav class="wfh-nav" aria-label="Головна навігація">
        <a class="navbtn" href="catalog-page.html"><span class="g">▦</span> Каталог</a>
        <a class="navlink" href="goal.html">✦ Квіз</a>
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
        <a class="wfh-act stack" href="auth.html"><span class="g">👤</span><span class="lbl">Увійти</span></a>
        <a class="wfh-act stack" href="account.html"><span class="g">♡</span><span class="lbl">Обране</span></a>
        <a class="wfh-act" href="account.html"><span class="g">★</span><span class="t"><span class="cap">Бонуси</span><span class="val">Отримати</span></span></a>
        <a class="wfh-act" href="cart.html"><span class="g">🛒</span><span class="lbl">Кошик</span></a>
      </div>
    </div>`;
  el.setAttribute('role', 'banner');
}

function wfFooter() {
  const el = document.getElementById('wf-footer'); if (!el) return;
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
      <div class="wff-col"><h4>Покупцям</h4><a href="content-loyalty.html">Знижки та бонуси</a><a href="content-delivery.html">Доставка й оплата</a><a href="content-returns.html">Повернення</a><a href="content-faq.html">FAQ</a></div>
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
      <span>© 2026 Stack. Спортивне харчування в Україні. · <a href="content-legal.html" style="color:inherit;text-decoration:underline">Політика</a> · <a href="content-legal.html" style="color:inherit;text-decoration:underline">Умови</a></span>
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
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
