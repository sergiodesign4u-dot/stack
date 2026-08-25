/* Roadmap navigation - the single registry of every stage and page of the project.
   A page carries an empty <aside id="sidebar"></aside>, declares window.NAV_BASE
   (depth to repo root, e.g. '../'), optionally window.NAV_SECTIONS (its own sections)
   and, when it is not in the registry, window.NAV_ACTIVE + window.NAV_ACTIVE_LABEL.
   Everything else - active / Next / SOON, the accordion, relative links - is computed here.
   The only manual edit is a row in NAV, done:true when a page is ready, and wip:true
   while a stage is being built - the one thing no file in the tree can prove on its own.
   wip is TEMPORARY and is removed by the closing step of the stage that set it.
   Look lives in /_nav.css, never on the page. */

window.NAV = [
  { label: 'Дослідження',                page: 'research/research.html', done: true },

  { label: 'Дослідження людей', children: [
      { label: 'Персони',                page: 'research/personas.html', done: true },
      { label: 'JTBD',                   page: 'research/jtbd.html',     done: true },
      { label: 'CJM · як є',             page: 'research/cjm-as-is.html', done: true  },
      { label: 'CJM · як буде',          page: 'research/cjm-to-be.html', done: true  }
  ]},

  { label: 'Інформаційна архітектура', children: [
      { subhead: 'Базовий шар' },
      { label: 'Флоу',                   page: 'ia/flows.html',         done: true  },
      { label: 'Концепт-карта',          page: 'ia/concept-map.html',   done: true },
      { subhead: 'Детальний шар' },
      { label: 'Карта сайту',            page: 'ia/sitemap.html',       done: true },
      { label: 'Структура',              page: 'ia/structure.html',     done: true  }
  ]},

  { label: 'Вайрфрейми',                 page: 'wireframes/overview.html', done: true },

  { label: 'Голос продукту',             page: 'voice/voice.html',      done: true },

  { label: 'Концепт', children: [
      { label: 'Напрями',                page: 'design/concept/directions.html', done: true },
      { label: 'Мова продукту',          page: 'design/concept/concept.html',    done: true }
  ]},

  /* The kit is stage 07's own output, so it stands in the roadmap rather than as a satellite:
     an unfinished stage has to be visible on the route, not only in the README. */
  { label: 'UI + візуал', children: [
      { label: 'Всі екрани',             page: 'design/overview.html',  done: true },
      { label: 'Кіт компонентів',        page: 'design/kit/kit.html',   done: true  }
  ]},

  /* Step 7.84, and it was a defect in this file rather than a preference.
     `done` means ONE thing everywhere else here: the page exists. These two rows used
     it for a second meaning - «the stage is finished» - and the cost was that
     `design/kit/overview.html`, which has existed and been complete for weeks, rendered
     as a <span>: the whole showcase was unreachable from the sidebar of the project it
     documents. How far a stage has got is shown ON its page (27 / 27 molecules, 0 / 24
     organisms), which is where it can be true; a route is either walkable or it is not.

     Merged under one heading because the tokens are the design system's ground floor and
     not a stage beside it - and split into children so that the half which is built and
     the half which is not stay visible as separate rows, the same shape «Концепт» and
     «UI + візуал» already use. */
  /* 10.4: ONE ROW, AND IT OPENS THE SYSTEM RATHER THAN A PAGE ABOUT IT. This was
     two children - «Токени і компоненти» and «Чому саме так» - and both of those
     pages now stand in the design system's own panel, `design/kit/_nav.js`, where
     «Чому саме так» already lived. A roadmap that repeats the system's table of
     contents is a second copy of it, and a second copy drifts. The roadmap says
     «here is the stage», the panel inside says «here is what is in it». */
  { label: 'Дизайн-система',             page: 'design/kit/overview.html', done: true },

  { label: 'Адаптив',                    page: 'design/kit/responsive.html', done: true },
  { label: 'Анімація',                   page: 'design/kit/motion.html', done: true },
  /* 12.1: the stage started. `page` stays null until step 6 gives it
     `design/index.html`; `wip` is what makes the walk hang «Next» here rather
     than on Хендоф while every one of this stage's pages is still unbuilt.
     12.10, step 6: the page is `index.html` and NOT `overview.html`, which the
     stage pack states and which is not a preference - the hub is already taken
     by «UI + Visual», and two roadmap entries on one page break the active
     highlight. `wip` stays until step 7. */
  { label: 'Розкотка',                   page: 'design/index.html', done: true },
  /* 13.8: `wip` is OFF and the stage is closed. It went on at 13.1 (before any page
     existed) and stayed through 13.5, when the page arrived but the release, the
     prompt and two examinations were still owed - `wip` is the one thing no file in
     the tree can prove about itself. This is the LAST stage, so nothing carries
     «Next» after it, and that is the correct end rather than a missing badge: a
     roadmap that keeps inviting you onward past its own last row does not know it
     finished. */
  { label: 'Хендоф',                     page: 'handoff/handoff.html', done: true }
];

(function () {
  var base = window.NAV_BASE || './';

  function currentPath() {
    /* BOTH SIDES DECODED, AND ONLY ONE OF THEM WAS - 25.08.2026, owner's report
       «панель не тримає, де ти зараз». `URL().pathname` keeps its percent
       escapes and `location.pathname` was already being decoded, so on any path
       whose folders contain a space the two never shared a prefix:

         rootPath  /Users/.../Claud%20Projects/Stack%20sportpit/
         here      /Users/.../Claud Projects/Stack sportpit/design/overview.html

       `indexOf` then returned -1, `cur` became the whole absolute path, nothing
       matched the registry, and the panel rendered with NO active stage and NONE
       of the sections the page declares - measured on six of the seven pages that
       carry it: `is-active 0`, «секцій оголошено 11, відмальовано 0».

       IT IS INVISIBLE OVER HTTP, which is why it survived to here: the published
       site is served from `/stack/`, a path with nothing to escape, and every
       check that has ever run against a server saw a working panel. It is the
       `file://` half that breaks, and `file://` is exactly what `handoff.html`
       promises - «no build, no server, open it and it works». `clone-test.mjs`
       opens those pages and passed, because it asks whether a page OPENS and not
       whether the page knows where it is.

       Not fixed by encoding `here` instead: a folder named «Мої проєкти» would
       then have to round-trip through two encoders that disagree about which
       characters are safe. Decoding is the direction with one answer. */
    var rootPath = decodeURIComponent(new URL(base, location.href).pathname);
    var here = decodeURIComponent(location.pathname);
    var cur = here.indexOf(rootPath) === 0 ? here.slice(rootPath.length) : here.replace(/^\//, '');
    if (cur === '' || cur.charAt(cur.length - 1) === '/') cur += 'index.html';
    return cur;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var cur = currentPath();
  var anchor = window.NAV_ACTIVE || null;          // page of the registry this satellite belongs to
  var anchorLabel = window.NAV_ACTIVE_LABEL || document.title;

  // pages of a stage, in registry order
  function pagesOf(stage) {
    if (stage.children) return stage.children.filter(function (c) { return c.page; });
    return stage.page ? [stage] : [];
  }

  // which stage are we in - by the current page or by the satellite anchor
  var activeIndex = -1;
  NAV.forEach(function (stage, i) {
    pagesOf(stage).forEach(function (p) {
      if (p.page === cur || (anchor && p.page === anchor)) activeIndex = i;
    });
  });

  // Next is counted by STAGE, not by page: the first stage that is not fully done
  /* 11.2: `|| NAV[i].wip` - a stage can have every page built and still be RUNNING,
     and both open stages are that today. Without this the walk stepped over them
     and hung «Next» on the stage after, so the roadmap invited you to start
     Розкотка while Анімація was on step 2. A stage that is still open IS the next
     one; `wip` is removed by its own closing step and the walk moves on by itself. */
  var nextIndex = -1;
  for (var i = 0; i < NAV.length; i++) {
    var ps = pagesOf(NAV[i]);
    if (ps.length === 0 || NAV[i].wip || ps.some(function (p) { return !p.done; })) { nextIndex = i; break; }
  }

  function stageState(stage) {
    var ps = pagesOf(stage);
    if (ps.length === 0) return 'soon';
    var done = ps.filter(function (p) { return p.done; }).length;
    if (done === 0) return 'soon';
    if (done === ps.length) return 'done';
    return 'partial';
  }

  // collapsed group points at the first READY page, never at a file that does not exist yet
  function collapsedHref(stage) {
    var ps = pagesOf(stage).filter(function (p) { return p.done; });
    return ps.length ? base + ps[0].page : null;
  }

  function sectionsBlock() {
    var secs = window.NAV_SECTIONS;
    if (!secs || !secs.length) return '';
    return '<div class="nav-sections">' + secs.map(function (s) {
      return '<a class="nav-section" href="#' + esc(s.id) + '" data-sec="' + esc(s.id) + '">' + esc(s.label) + '</a>';
    }).join('') + '</div>';
  }

  function satelliteBlock(pagePath) {
    if (!anchor || anchor !== pagePath) return '';
    return '<div class="nav-subitem"><a class="nav-link is-current" href="' +
      esc(location.href.split('#')[0]) + '">' + esc(anchorLabel) + '</a>' + sectionsBlock() + '</div>';
  }

  function render() {
    var html = '<a class="nav-brand" href="' + base + 'index.html">Stack<span>дизайн-процес</span></a>';
    html += '<nav class="nav-roadmap">';

    /* THE ROOT PAGE IS NOT A STAGE, AND ITS SECTIONS HAD NOWHERE TO GO - the same
       day as the decode fix above, and found by the same walk. `index.html`
       declares two sections and `sectionsBlock()` is only ever called from inside
       a stage row, so `activeIndex` is -1 there by design and the two rendered
       nothing. A declared list that covers nothing fails as loudly as an
       undeclared case, so it either goes or it lands: it lands, above the
       roadmap, because the entry point is exactly where a reader most needs to
       know which part of a long page they are looking at. */
    if (activeIndex === -1 && !anchor) html += sectionsBlock();

    NAV.forEach(function (stage, i) {
      var isActive = i === activeIndex;
      var state = stageState(stage);
      var cls = 'nav-item' + (isActive ? ' is-active' : '') +
        (state === 'done' ? ' is-done' : state === 'partial' ? ' is-partial' : ' is-soon');
      html += '<div class="' + cls + '">';

      // ---- top line of the stage ----
      /* 11.1: `|| stage.wip` - a stage whose pages are all built can still be
         OPEN, and stage 10 is exactly that: every page exists, the width sweep
         and the closing ritual do not. Without this the WIP flag on a done row
         rendered NOTHING, so the sidebar said «finished» while README said «in
         progress», and status lives in those two places and must agree. */
      var badge = '';
      if (state !== 'done' || stage.wip) {
        badge = stage.wip
          ? '<span class="nav-badge nav-badge-wip">WIP</span>'
          : i === nextIndex
            ? '<span class="nav-badge nav-badge-next">Next</span>'
            : '<span class="nav-badge nav-badge-soon">Soon</span>';
      }
      var single = !stage.children && stage.page;
      var topHref = single ? (stage.done ? base + stage.page : null) : (isActive ? null : collapsedHref(stage));
      var topCurrent = single && stage.page === cur;

      if (topHref) {
        html += '<a class="nav-top' + (topCurrent ? ' is-current' : '') + '" href="' + esc(topHref) + '">' +
          esc(stage.label) + badge + '</a>';
      } else {
        html += '<div class="nav-top' + (topCurrent ? ' is-current' : '') + '">' + esc(stage.label) + badge + '</div>';
      }

      // ---- children: only the stage we stand in is unfolded ----
      if (isActive && stage.children) {
        html += '<div class="nav-sub">';
        stage.children.forEach(function (c) {
          if (c.subhead) { html += '<div class="nav-subhead">' + esc(c.subhead) + '</div>'; return; }
          var isCur = c.page === cur;
          html += '<div class="nav-subitem' + (c.done ? '' : ' is-soon') + '">';
          if (c.done) {
            html += '<a class="nav-link' + (isCur ? ' is-current' : '') + '" href="' + esc(base + c.page) + '">' + esc(c.label) + '</a>';
          } else {
            html += '<span class="nav-link">' + esc(c.label) + '</span>';
          }
          if (isCur) html += sectionsBlock();
          html += '</div>';
          html += satelliteBlock(c.page);
        });
        html += '</div>';
      } else if (isActive && single) {
        if (topCurrent) html += sectionsBlock();
        var sat = satelliteBlock(stage.page);
        if (sat) html += '<div class="nav-sub">' + sat + '</div>';
      }

      html += '</div>';
    });

    html += '</nav>';

    var aside = document.getElementById('sidebar');
    if (!aside) return;
    aside.innerHTML = html;

    // mobile chrome - rendered here so no page describes it
    if (!document.querySelector('.nav-topbar')) {
      var bar = document.createElement('nav');
      bar.className = 'nav-topbar';
      bar.innerHTML = '<a class="nav-topbar-logo" href="' + base + 'index.html">Stack</a>' +
        '<button class="nav-toggle" aria-label="Меню"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>';
      document.body.insertBefore(bar, document.body.firstChild);
      var scrim = document.createElement('div');
      scrim.className = 'nav-scrim';
      document.body.insertBefore(scrim, document.body.firstChild);
      bar.querySelector('.nav-toggle').addEventListener('click', function () {
        aside.classList.toggle('is-open');
        scrim.classList.toggle('is-open');
      });
      scrim.addEventListener('click', function () {
        aside.classList.remove('is-open');
        scrim.classList.remove('is-open');
      });
    }

    observeSections();
    /* ЛИСТОК ПЕРШИЙ, ЕТАП ОСТАННІЙ, і порядок тут не косметичний. «Де ти зараз»
       це конкретна сторінка - «JTBD», - а не етап, у якому вона лежить. Рядок
       етапу стоїть ВИЩЕ за неї, і коли під поточною сторінкою розгорнуто
       одинадцять секцій, підсунути в бокс рядок етапу означає лишити саму
       сторінку за нижнім краєм. Список, а не список через кому: `querySelector`
       з комами віддає перший у ПОРЯДКУ ДОКУМЕНТА, тобто якраз етап. */
    keepPlace(document.querySelector('.nav-roadmap'), 'stack:nav-roadmap',
      ['.nav-link.is-current', '.nav-top.is-current', '.nav-item.is-active > .nav-top']);
  }

  /* ЩО ТРИМАЄ МІСЦЕ - 25.08.2026, звіт власника: «панель оновлюється разом зі
     сторінками і знову вгорі». Кожен екран це окремий документ, тож панель
     збирається наново на кожен клік, а її скрол-бокс починає з нуля. Заміряно на
     1280x680 через file://: чотири з семи сторінок реєстру не вміщаються
     (`design/overview` 805 проти 596), тобто «вгорі» це місце, якого читач не
     просив, а не нейтральний старт.

     Зсув пам'ятається НА ВКЛАДКУ (`sessionStorage`), і він переживає перехід по
     `file://` - заміряно, обидві половини мають один origin `file://`.
     Відновлюється ДО першого малювання: `innerHTML` і `scrollTop` стоять в одній
     задачі, тож проміжного кадру «вгорі» не існує.

     `scrollTop` НА БОКСІ, А НЕ `scrollIntoView()`. Продукт уже вирішив це одного
     разу (`design/_nav.js`, `uivRailCurrent`): другий скролить КОЖНОГО прокручу-
     ваного предка, а `html` у `design/system/base.css` несе `scroll-behavior:
     smooth`, тож він потягнув би за собою ще й документ - рівно те «і воно
     скролить угору», з якого почалась ця робота. Тут рухається один бокс по
     одній осі.

     І поправка це ПІДСУВ, а не пере-центрування: запам'ятаний зсув, який ховає
     поточний рядок, це той самий дефект з іншого кінця, тож рядок заводиться
     трохи всередину з відступом, і більше не рухається ніщо. Коли не пам'ятається
     нічого - нова вкладка - зберігати немає чого, і рядок центрується.

     ЦЕЙ ТЕКСТ ІСНУЄ В ТРЬОХ ФАЙЛАХ ОДНАКОВИМ ДО СИМВОЛА - тут, у
     `design/kit/_nav.js` і в `design/_nav.js`, бо панелей у репозиторії три, і
     кожна це окремий реєстр зі своїм способом завантаження. Спільного файлу, до
     якого дотягнулись би всі три, немає: кореневі сторінки не вантажать
     дизайн-систему, а екрани продукту не вантажать нічого з кореня. Тому копії
     не заборонені, а ЗВІРЯЮТЬСЯ: `tools/nav.mjs`, питання F, порівнює три тіла
     нормалізованим текстом і падає на першій розбіжності. */
  function keepPlace(box, key, sel){
    if(!box) return;
    var saved = null;
    try { saved = sessionStorage.getItem(key); } catch(e) {}
    if(saved !== null) box.scrollTop = parseInt(saved, 10) || 0;
    var cur = null;
    for(var i = 0; i < sel.length && !cur; i++) cur = box.querySelector(sel[i]);
    if(cur){
      var b = box.getBoundingClientRect(), c = cur.getBoundingClientRect(), pad = 16;
      if(saved === null) box.scrollTop += (c.top - b.top) - (b.height - c.height) / 2;
      else if(c.bottom > b.bottom) box.scrollTop += (c.bottom - b.bottom) + pad;
      else if(c.top < b.top) box.scrollTop -= (b.top - c.top) + pad;
    }
    box.addEventListener('scroll', function(){
      if(box.scrollHeight <= box.clientHeight + 1) return;
      try { sessionStorage.setItem(key, String(Math.round(box.scrollTop))); } catch(e) {}
    });
  }

  function observeSections() {
    var secs = window.NAV_SECTIONS;
    if (!secs || !secs.length || !('IntersectionObserver' in window)) return;
    var links = {};
    document.querySelectorAll('.nav-section').forEach(function (a) { links[a.dataset.sec] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.remove('is-current'); });
        if (links[e.target.id]) links[e.target.id].classList.add('is-current');
      });
    }, { rootMargin: '-10% 0px -75% 0px' });
    secs.forEach(function (s) {
      var el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
