/* Roadmap navigation - the single registry of every stage and page of the project.
   A page carries an empty <aside id="sidebar"></aside>, declares window.NAV_BASE
   (depth to repo root, e.g. '../'), optionally window.NAV_SECTIONS (its own sections)
   and, when it is not in the registry, window.NAV_ACTIVE + window.NAV_ACTIVE_LABEL.
   Everything else - active / Next / SOON, the accordion, relative links - is computed here.
   The only manual edit is a row in NAV and done:true when a page is ready.
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
  { label: 'Дизайн-система', children: [
      { label: 'Токени і компоненти',    page: 'design/kit/overview.html', done: true  },
      { label: 'Чому саме так',          page: 'design/kit/why.html',      done: true  }
  ]},

  { label: 'Адаптив',                    page: null },
  { label: 'Анімація',                   page: null },
  { label: 'Хендоф',                     page: null }
];

(function () {
  var base = window.NAV_BASE || './';

  function currentPath() {
    var rootPath = new URL(base, location.href).pathname;
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
  var nextIndex = -1;
  for (var i = 0; i < NAV.length; i++) {
    var ps = pagesOf(NAV[i]);
    if (ps.length === 0 || ps.some(function (p) { return !p.done; })) { nextIndex = i; break; }
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

    NAV.forEach(function (stage, i) {
      var isActive = i === activeIndex;
      var state = stageState(stage);
      var cls = 'nav-item' + (isActive ? ' is-active' : '') +
        (state === 'done' ? ' is-done' : state === 'partial' ? ' is-partial' : ' is-soon');
      html += '<div class="' + cls + '">';

      // ---- top line of the stage ----
      var badge = '';
      if (state !== 'done') {
        badge = i === nextIndex
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
