/* design/kit/_nav.js - the ONE registry of the stand.

   Structure lives here, look lives in _page.css, and a page never describes a
   kn-* rule. The only manual edit is a row below and `done:true` when its page
   exists; active state, counts and relative links are computed.

   A PAGE OF THE STAND DECLARES NOTHING - not even its own name. It carries an
   empty `<aside id="kitnav">` and loads this file. Step 7.19 removed the 33
   `KIT_ACTIVE` lines that said out loud what the file name already said, after
   one of them was copied wrong. See the derivation at the foot of the file.

   A not-done row renders as a <span>, not an <a>. That is deliberate and it is
   the same convention the roadmap uses: a component that has a css file but no
   page yet has to be VISIBLE on the route, because that is what says the stand
   is unfinished. Hiding it would make the panel look complete and lie.

   No em dash in this file. */
window.KIT_NAV = [
 {
  "label": "Система",
  "items": [
   {
    "label": "Огляд",
    "page": "overview.html",
    "done": true
   },
   {
    "label": "Чому саме так",
    "page": "why.html",
    "done": true
   }
  ]
 },
 {
  "label": "Основи",
  "items": [
   {
    "label": "Колір",
    "page": "color.html",
    "done": true
   },
   {
    "label": "Типографіка",
    "page": "typography.html",
    "done": true
   },
   {
    "label": "Геометрія",
    "page": "geometry.html",
    "done": true
   },
   {
    "label": "Адаптив",
    "page": "responsive.html",
    "done": true
   },
   {
    "label": "Рух",
    "page": "motion.html",
    "done": true
   },
   {
    "label": "Набір іконок",
    "page": "icons.html",
    "done": true
   }
  ]
 },
 {
  "label": "Атоми",
  "items": [
   {
    "label": "Кнопка",
    "page": "button.html",
    "done": true
   },
   {
    "label": "Поле",
    "page": "field.html",
    "done": true
   },
   {
    "label": "Меню вибору",
    "page": "menu.html",
    "done": true
   },
   {
    "label": "Обране",
    "page": "favourite.html",
    "done": true
   },
   {
    "label": "Іконка",
    "page": "icon.html",
    "done": true
   },
   {
    "label": "Дія стовпчиком",
    "page": "stack-action.html",
    "done": true
   },
   {
    "label": "OTP-комірка",
    "page": "otp.html",
    "done": true
   },
   {
    "label": "Чип",
    "page": "chip.html",
    "done": true
   },
   {
    "label": "Рейтинг",
    "page": "rating.html",
    "done": true
   },
   {
    "label": "Скелетон",
    "page": "skeleton.html",
    "done": true
   },
   {
    "label": "Радіо",
    "page": "radio.html",
    "done": true
   },
   {
    "label": "Перемикач вигляду",
    "page": "view-toggle.html",
    "done": true
   },
   {
    "label": "Рядок посилань",
    "page": "link-row.html",
    "done": true
   },
   {
    "label": "Мітка наявності",
    "page": "availability.html",
    "done": true
   },
   {
    "label": "Статус-пілюля",
    "page": "status-pill.html",
    "done": true
   },
   {
    "label": "Бейдж знижки",
    "page": "discount.html",
    "done": true
   },
   {
    "label": "Чекбокс",
    "page": "checkbox.html",
    "done": true
   },
   {
    "label": "Перемикач",
    "page": "switch.html",
    "done": true
   },
   {
    "label": "Лічильник кількості",
    "page": "stepper.html",
    "done": true
   },
   {
    "label": "Ціна",
    "page": "price.html",
    "done": true
   },
   {
    "label": "Лічильник",
    "page": "counter.html",
    "done": true
   },
   {
    "label": "Бейдж",
    "page": "badge.html",
    "done": true
   },
   {
    "label": "Мініатюра товару",
    "page": "product-thumb.html",
    "done": true
   }
  ]
 },
 {
  "label": "Молекули",
  "items": [
   {
    "label": "Картка товару",
    "page": "product-card.html",
    "done": true
   },
   {
    "label": "Банер",
    "page": "banner.html",
    "done": true
   },
   {
    "label": "Таблиця складу",
    "page": "spec-table.html",
    "done": true
   },
   {
    "label": "Смуга довіри",
    "page": "trust-strip.html",
    "done": true
   },
   {
    "label": "Щабель лояльності",
    "page": "loyalty-rung.html",
    "done": true
   },
   {
    "label": "Відгук",
    "page": "review-item.html",
    "done": true
   },
   {
    "label": "Рядок замовлення",
    "page": "order-row.html",
    "done": true
   },
   {
    "label": "Рядок кошика",
    "page": "cart-row.html",
    "done": true
   },
   {
    "label": "Галерея",
    "page": "gallery.html",
    "done": true
   },
   {
    "label": "Порожній стан",
    "page": "empty-state.html",
    "done": true
   },
   {
    "label": "Нотатка про поповнення",
    "page": "restock-note.html",
    "done": true
   },
   {
    "label": "Картка адреси",
    "page": "address-card.html",
    "done": true
   },
   {
    "label": "Група фільтра",
    "page": "filter-group.html",
    "done": true
   },
   {
    "label": "Тулбар",
    "page": "toolbar.html",
    "done": true
   },
   {
    "label": "Заголовок секції",
    "page": "section-head.html",
    "done": true
   },
   {
    "label": "Рядок клієнта",
    "page": "client-row.html",
    "done": true
   },
   {
    "label": "Плитка цілі",
    "page": "goal-tile.html",
    "done": true
   },
   {
    "label": "Картка блогу",
    "page": "blog-card.html",
    "done": true
   },
   {
    "label": "Пагінація",
    "page": "pagination.html",
    "done": true
   },
   {
    "label": "Логотип бренду",
    "page": "brand-logo.html",
    "done": true
   },
   {
    "label": "Тост",
    "page": "toast.html",
    "done": true
   },
   {
    "label": "Мініатюра сертифіката",
    "page": "cert-thumb.html",
    "done": true
   },
   {
    "label": "Блок опису",
    "page": "desc-block.html",
    "done": true
   },
   {
    "label": "SEO-текст",
    "page": "seo-text.html",
    "done": true
   },
   {
    "label": "Хлібні крихти",
    "page": "breadcrumb.html",
    "done": true
   },
   {
    "label": "Запитання",
    "page": "qa-item.html",
    "done": true
   },
   {
    "label": "Схожі товари",
    "page": "related.html",
    "done": true
   }
  ]
 },
 {
  "label": "Організми",
  "items": [
   {
    "label": "Форма чекауту",
    "page": "checkout-form.html",
    "done": true
   },
   {
    "label": "Хедер",
    "page": "header.html",
    "done": true
   },
   {
    "label": "Блок покупки",
    "page": "buy-box.html",
    "done": true
   },
   {
    "label": "Оболонка кабінету",
    "page": "account-shell.html",
    "done": true
   },
   {
    "label": "Діалог входу",
    "page": "auth-dialog.html",
    "done": true
   },
   {
    "label": "Шухляда кошика",
    "page": "cart-drawer.html",
    "done": true
   },
   {
    "label": "Шухляда меню",
    "page": "nav-drawer.html",
    "done": true
   },
   {
    "label": "Вкладки товару",
    "page": "pdp-tabs.html",
    "done": true
   },
   {
    "label": "Модалка відгуку",
    "page": "review-modal.html",
    "done": true
   },
   {
    "label": "Футер",
    "page": "footer.html",
    "done": true
   },
   {
    "label": "Рейка фільтрів",
    "page": "filter-rail.html",
    "done": true
   },
   {
    "label": "Мега-меню",
    "page": "mega-menu.html",
    "done": true
   },
   {
    "label": "Банер cookie",
    "page": "cookie-banner.html",
    "done": true
   },
   {
    "label": "Смуга покупки",
    "page": "buy-bar.html",
    "done": true
   },
   {
    "label": "Головний блок",
    "page": "hero.html",
    "done": true
   },
   {
    "label": "Системна сторінка",
    "page": "system-page.html",
    "done": true
   },
   {
    "label": "Повзунок ціни",
    "page": "price-slider.html",
    "done": true
   },
   {
    "label": "Діалог міста",
    "page": "city-dialog.html",
    "done": true
   },
   {
    "label": "Діалог клієнта",
    "page": "client-dialog.html",
    "done": true
   },
   {
    "label": "Таб-бар",
    "page": "tabbar.html",
    "done": true
   },
   {
    "label": "Сітка товарів",
    "page": "product-grid.html",
    "done": true
   },
   {
    "label": "Шит фільтрів",
    "page": "filter-sheet.html",
    "done": true
   },
   {
    "label": "Оверлей",
    "page": "overlay.html",
    "done": true
   },
   {
    "label": "Оверлей каталогу",
    "page": "cat-overlay.html",
    "done": true
   },
   {
    "label": "Панель Pro",
    "page": "upsell.html",
    "done": true
   },
   {
    "label": "Картка тарифу",
    "page": "plan-card.html",
    "done": true
   },
   {
    "label": "Лендинг тренера",
    "page": "coach-landing.html",
    "done": true
   },
   {
    "label": "Перевірка тренера",
    "page": "coach-verify.html",
    "done": true
   },
   {
    "label": "Кабінет тренера",
    "page": "coach-cabinet.html",
    "done": true
   },
   {
    "label": "Клієнти тренера",
    "page": "coach-clients.html",
    "done": true
   },
   {
    "label": "Сесія замовлення",
    "page": "coach-session.html",
    "done": true
   },
   {
    "label": "Замовлення тренера",
    "page": "coach-order.html",
    "done": true
   },
   {
    "label": "Тариф тренера",
    "page": "coach-tariff.html",
    "done": true
   },
   {
    "label": "Обране тренера",
    "page": "coach-wishlist.html",
    "done": true
   }
  ]
 },
 {
  "label": "Патерни",
  "items": [
   {
    "label": "Коли брати патерн",
    "page": "patterns.html",
    "done": true
   },
   {
    "label": "Ряд дій",
    "page": "action-row.html",
    "done": true
   }
  ]
 },
 {
  "label": "Перепис",
  "items": [
   {
    "label": "Кнопки",
    "page": "census.html",
    "done": true
   },
   {
    "label": "Поля",
    "page": "census-field.html",
    "done": true
   },
   {
    "label": "Рядок посилань",
    "page": "census-link.html",
    "done": true
   },
   {
    "label": "Картки",
    "page": "census-card.html",
    "done": true
   },
   {
    "label": "Чипи",
    "page": "census-chip.html",
    "done": true
   },
   {
    "label": "Іконки",
    "page": "census-icon.html",
    "done": true
   }
  ]
 },
 {
  "label": "Перевірка",
  "items": [
   {
    "label": "Архітектура",
    "page": "architecture.html",
    "done": true
   },
   {
    "label": "Піксельний доказ",
    "page": "pixel-proof.html",
    "done": true
   },
   {
    "label": "Що лишилось",
    "page": "backlog.html",
    "done": true
   }
  ]
 }
];

(function () {
  var nav = document.getElementById('kitnav');
  if (!nav) return;
  /* THE ACTIVE ROW IS COMPUTED, NOT DECLARED - step 7.19.
     The head of this file has said "active state ... computed" since it was
     written, and it was not: every page hand-declared `KIT_ACTIVE`, a copy of
     its own file name. A copied value drifts, and it did - `stack-action.html`
     was built from `favourite.html` and inherited `KIT_ACTIVE = 'favourite'`,
     so the stand lit «Обране» while showing «Дія стовпчиком».

     So the file name decides, and it cannot be wrong: it IS the page. The
     declaration is kept only for a page the registry does not list - the same
     rule the root `/_nav.js` states for `NAV_ACTIVE` - and it is consulted
     ONLY when the file name matches no row. A stale copy can no longer beat
     the truth, because the truth is checked first. */
  var file = (location.pathname.split('/').pop() || 'overview.html').replace(/\.html$/, '');
  var known = false;
  window.KIT_NAV.forEach(function (g) {
    g.items.forEach(function (i) { if (i.page.replace('.html', '') === file) known = true; });
  });
  var active = known ? file : (window.KIT_ACTIVE || '');
  var total = 0, done = 0;
  window.KIT_NAV.forEach(function (g) {
    g.items.forEach(function (i) { total++; if (i.done) done++; });
  });
  /* THE THEME SWITCH BELONGS TO THE PANEL, THE THEME ITSELF DOES NOT - the
     pack, step 4: «перемикачі теми свої на кожній поверхні: у design/kit/_nav.js
     на кроці 4... у design/_nav.js на кроці 8. Кореневий /_nav.js не чіпаємо».
     The button only CALLS `uivTheme()` from design/system/theme.js, which has
     already applied the stored choice from <head> - before the first paint, so
     the page never flashes light. A switch that lived here alone would flash on
     every load, because this file runs at the end of the body. */
  /* 10.4: THE PANEL LEARNED TO SHOW THE SECTIONS OF THE PAGE IT IS ON, and until
     it did, three of the longest pages in this system could not live here at all.
     `overview.html`, `why.html` and `responsive.html` carried the ROADMAP sidebar -
     which does render `NAV_SECTIONS` - so opening «Адаптив» from inside the design
     system threw the reader out of the design system. Moving them here without this
     would have traded one defect for another: `responsive.html` alone has ten
     sections. The classes are `kn-s`, not the root panel's `nav-section`: kit pages
     load `_page.css` and never `_nav.css`, so borrowing the root's names would have
     styled nothing. The panel keeps one visual language, its own. */
  function sectionsBlock() {
    var secs = window.NAV_SECTIONS;
    if (!secs || !secs.length) return '';
    return '<div class="kn-ss">' + secs.map(function (s) {
      return '<a class="kn-s" href="#' + String(s.id).replace(/[<>&"]/g, '') +
        '" data-sec="' + String(s.id).replace(/[<>&"]/g, '') + '">' +
        String(s.label).replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</a>';
    }).join('') + '</div>';
  }

  function observeSections() {
    var secs = window.NAV_SECTIONS;
    if (!secs || !secs.length || !('IntersectionObserver' in window)) return;
    var links = {};
    nav.querySelectorAll('.kn-s').forEach(function (a) { links[a.dataset.sec] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.remove('is-current'); });
        if (links[e.target.id]) links[e.target.id].classList.add('is-current');
      });
    }, { rootMargin: '-10% 0px -75% 0px' });
    secs.forEach(function (s) { var el = document.getElementById(s.id); if (el) io.observe(el); });
  }

  var mode = (typeof uivThemeNow === 'function') ? uivThemeNow() : 'light';
  var h = '<a class="kn-back" href="../../index.html">&#8592; Дизайн-процес</a>' +
          '<div class="kn-t">Дизайн-система</div>' +
          '<div class="kn-sub">' + done + ' / ' + total + ' сторінок</div>' +
          '<button class="kn-theme" type="button" id="knTheme" aria-pressed="' + (mode === 'dark') + '">' +
            '<span class="kn-theme-i" aria-hidden="true"></span>' +
            '<span class="kn-theme-t">' + (mode === 'dark' ? 'Темна тема' : 'Світла тема') + '</span>' +
          '</button>';
  window.KIT_NAV.forEach(function (g) {
    var d = g.items.filter(function (i) { return i.done; }).length;
    h += '<div class="kn-g"><div class="kn-gh"><span>' + g.label + '</span><i>' +
         d + '/' + g.items.length + '</i></div>';
    g.items.forEach(function (i) {
      var slug = i.page.replace('.html', '');
      var on = (slug === active) ? ' on' : '';
      h += i.done
        ? '<a class="kn-l' + on + '" href="' + i.page + '">' + i.label + '</a>'
        : '<span class="kn-l" style="opacity:.45;cursor:default">' + i.label + '</span>';
      if (on) h += sectionsBlock();
    });
    h += '</div>';
  });
  nav.innerHTML = h;
  /* AND THEN MARK IT - step 8.21, found by the state walk the first time it
     could see this stand. `&#8592;` in the back link is a typed character that
     `uivMarks` turns into the `arrowLeft` glyph (marks.js:341, «← and ‹ are here
     and nowhere else»), and this nav renders AFTER `uivChrome()` has already run
     on the page, so nothing had ever marked it: 112 stand pages drew the arrow
     in the body font while the product beside them drew it from the set. The
     pass is idempotent, so calling it on our own subtree costs nothing and
     survives a re-render. */
  if (typeof uivMarks === 'function') uivMarks(nav);
  observeSections();
  var tb = nav.querySelector('#knTheme');
  if (tb && typeof uivTheme === 'function') tb.addEventListener('click', function () {
    var m = uivTheme();
    tb.setAttribute('aria-pressed', m === 'dark');
    tb.querySelector('.kn-theme-t').textContent = m === 'dark' ? 'Темна тема' : 'Світла тема';
  });
  var cur = nav.querySelector('.kn-l.on');
  if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'center' });
})();
