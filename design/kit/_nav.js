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
    "done": false
   },
   {
    "label": "Смуга довіри",
    "page": "trust-strip.html",
    "done": false
   },
   {
    "label": "Щабель лояльності",
    "page": "loyalty-rung.html",
    "done": false
   },
   {
    "label": "Відгук",
    "page": "review-item.html",
    "done": false
   },
   {
    "label": "Рядок замовлення",
    "page": "order-row.html",
    "done": false
   },
   {
    "label": "Рядок кошика",
    "page": "cart-row.html",
    "done": true
   },
   {
    "label": "Галерея",
    "page": "gallery.html",
    "done": false
   },
   {
    "label": "Порожній стан",
    "page": "empty-state.html",
    "done": false
   },
   {
    "label": "Нотатка про поповнення",
    "page": "restock-note.html",
    "done": false
   },
   {
    "label": "Картка адреси",
    "page": "address-card.html",
    "done": false
   },
   {
    "label": "Група фільтра",
    "page": "filter-group.html",
    "done": false
   },
   {
    "label": "Тулбар",
    "page": "toolbar.html",
    "done": false
   },
   {
    "label": "Заголовок секції",
    "page": "section-head.html",
    "done": false
   },
   {
    "label": "Рядок клієнта",
    "page": "client-row.html",
    "done": false
   },
   {
    "label": "Плитка цілі",
    "page": "goal-tile.html",
    "done": false
   },
   {
    "label": "Картка блогу",
    "page": "blog-card.html",
    "done": false
   },
   {
    "label": "Пагінація",
    "page": "pagination.html",
    "done": false
   },
   {
    "label": "Логотип бренду",
    "page": "brand-logo.html",
    "done": false
   },
   {
    "label": "Тост",
    "page": "toast.html",
    "done": false
   },
   {
    "label": "Мініатюра сертифіката",
    "page": "cert-thumb.html",
    "done": false
   },
   {
    "label": "Блок опису",
    "page": "desc-block.html",
    "done": false
   },
   {
    "label": "SEO-текст",
    "page": "seo-text.html",
    "done": false
   },
   {
    "label": "Хлібні крихти",
    "page": "breadcrumb.html",
    "done": true
   },
   {
    "label": "Запитання",
    "page": "qa-item.html",
    "done": false
   },
   {
    "label": "Схожі товари",
    "page": "related.html",
    "done": false
   }
  ]
 },
 {
  "label": "Організми",
  "items": [
   {
    "label": "Форма чекауту",
    "page": "checkout-form.html",
    "done": false
   },
   {
    "label": "Хедер",
    "page": "header.html",
    "done": false
   },
   {
    "label": "Блок покупки",
    "page": "buy-box.html",
    "done": false
   },
   {
    "label": "Оболонка кабінету",
    "page": "account-shell.html",
    "done": false
   },
   {
    "label": "Діалог входу",
    "page": "auth-dialog.html",
    "done": false
   },
   {
    "label": "Шухляда кошика",
    "page": "cart-drawer.html",
    "done": false
   },
   {
    "label": "Шухляда меню",
    "page": "nav-drawer.html",
    "done": false
   },
   {
    "label": "Вкладки товару",
    "page": "pdp-tabs.html",
    "done": false
   },
   {
    "label": "Модалка відгуку",
    "page": "review-modal.html",
    "done": false
   },
   {
    "label": "Футер",
    "page": "footer.html",
    "done": false
   },
   {
    "label": "Рейка фільтрів",
    "page": "filter-rail.html",
    "done": false
   },
   {
    "label": "Мега-меню",
    "page": "mega-menu.html",
    "done": false
   },
   {
    "label": "Банер cookie",
    "page": "cookie-banner.html",
    "done": false
   },
   {
    "label": "Смуга покупки",
    "page": "buy-bar.html",
    "done": false
   },
   {
    "label": "Головний блок",
    "page": "hero.html",
    "done": false
   },
   {
    "label": "Системна сторінка",
    "page": "system-page.html",
    "done": false
   },
   {
    "label": "Повзунок ціни",
    "page": "price-slider.html",
    "done": false
   },
   {
    "label": "Діалог міста",
    "page": "city-dialog.html",
    "done": false
   },
   {
    "label": "Діалог клієнта",
    "page": "client-dialog.html",
    "done": false
   },
   {
    "label": "Таб-бар",
    "page": "tabbar.html",
    "done": false
   },
   {
    "label": "Сітка товарів",
    "page": "product-grid.html",
    "done": false
   },
   {
    "label": "Шит фільтрів",
    "page": "filter-sheet.html",
    "done": false
   },
   {
    "label": "Оверлей",
    "page": "overlay.html",
    "done": false
   },
   {
    "label": "Оверлей каталогу",
    "page": "cat-overlay.html",
    "done": false
   }
  ]
 },
 {
  "label": "Перевірка",
  "items": [
   {
    "label": "Архітектура",
    "page": "architecture.html",
    "done": false
   },
   {
    "label": "Піксельний доказ",
    "page": "pixel-proof.html",
    "done": false
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
  var h = '<a class="kn-back" href="overview.html">&#8592; Вся система</a>' +
          '<div class="kn-t">Дизайн-система</div>' +
          '<div class="kn-sub">' + done + ' / ' + total + ' сторінок</div>';
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
    });
    h += '</div>';
  });
  nav.innerHTML = h;
  var cur = nav.querySelector('.kn-l.on');
  if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'center' });
})();
