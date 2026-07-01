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
  code: 'Крок коду', newuser: 'Новий користувач', 'account-end': 'З акаунтом'
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
      <a class="strongl">Для тренерів</a><a>Акції</a><a>Бренди</a><a>Доставка</a><a>Повернення</a>
      <span class="wfh-sp"></span><a>📍 Одеса</a><a>Укр</a>
    </div></div>
    <div class="wfh-main wfh-in">
      <button class="wfh-burger" aria-label="Меню">☰</button>
      <a class="wfh-logo" href="home.html">Stack</a>
      <nav class="wfh-nav" aria-label="Головна навігація">
        <a class="navbtn" href="catalog-page.html"><span class="g">▦</span> Каталог</a>
        <a class="navlink" href="#">Цілі ▾</a>
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
      <div class="wff-col"><h4>Stack</h4><a href="content.html">Про нас</a><a href="content.html">Контакти</a><a href="content.html">Блог</a><a href="content.html">Публічна оферта</a></div>
      <div class="wff-col"><h4>Покупцям</h4><a href="content.html">Знижки та бонуси</a><a href="content.html">Доставка й оплата</a><a href="content.html">Повернення</a><a href="content.html">FAQ</a></div>
      <div class="wff-col"><h4>Тренерам</h4><a href="coach.html">Для тренерів</a><a href="coach.html">Тарифи Free / Pro</a></div>
      <div class="wff-col"><h4>Консультація</h4><a href="content.html">0 800 000 000</a><a href="content.html">Telegram · Viber</a><a href="content.html">Пн–Нд 9:00–21:00</a></div>
    </div>
    <div class="wff-seo">
      <b>Популярні категорії:</b> Протеїн · Гейнери · Креатин · BCAA · Передтренувальні · Вітаміни ·&nbsp;&nbsp;
      <b>За ціллю:</b> Набір маси · Схуднення · Відновлення · Енергія ·&nbsp;&nbsp;
      <b>Бренди:</b> Optimum Nutrition · BioTechUSA · Myprotein ·&nbsp;&nbsp;
      <b>Міста:</b> Протеїн Київ · Протеїн Одеса · Протеїн Львів
    </div>
    <div class="wff-bot"><span>© 2026 Stack. Спортивне харчування в Україні.</span><span>Visa · Mastercard · Apple Pay · Google Pay</span></div>`;
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
        <div class="fgroup"><div class="fh">Бренд · Ціль · Смак · Країна</div>
          <label class="fopt"><span class="cb on"></span> Optimum Nutrition <span class="ct">12</span></label>
          <label class="fopt"><span class="cb"></span> Набір маси <span class="ct">52</span></label>
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
