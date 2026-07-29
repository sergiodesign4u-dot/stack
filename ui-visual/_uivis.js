/* ============================================================
   ui-visual · _uivis.js  (Concept, Step 6)
   Thin navigation + presentation layer for the colored copies. The wireframes
   stay grey and own structure/behaviour; these copies own only the visual layer.

   1) uivFixLinks(): the header/footer/rail/sheet injected by ../wireframes/_nav.js
      emit BARE relative hrefs ("catalog-page.html"), which from /ui-visual/ would
      404. Screens already colored here stay internal; every other .html link is
      re-pointed to the grey original in ../wireframes/. No dead ends.
   2) uivBar(): a slim strip back to the language stand + the grey original.
   3) uivChrome(): swaps EVERY wireframe emoji for one coherent Solar-spirit SVG
      icon set (synced to concept/concept.html §07). Covers the header, footer,
      tab bar, the Catalog mega-menu (category + goal icons), and the product-card
      fav / cart / view-toggle. Rating "★ 4.8" stays a text glyph (as in concept).

   Run AFTER wfHeader()/wfFooter()/wfCatalogRail()/wfSheet()/wfBar() have injected.
   ============================================================ */

/* screens that exist here in color (Step 6 = the listing set; Step 7 extends this) */
var UIV_SET = [
  'listing.html', 'listing-empty.html', 'listing-error.html', 'listing-loading.html',
  'listing-filtered.html', 'listing-list.html', 'listing-sheet.html',
  'product.html'
];

function uivFixLinks(){
  var inSet = {};
  UIV_SET.forEach(function(f){ inSet[f] = 1; });
  document.querySelectorAll('a[href]').forEach(function(a){
    var raw = a.getAttribute('href');
    if(!raw) return;
    if(/^(https?:|#|mailto:|tel:|\.\.\/|\/)/.test(raw)) return;   // external, anchor, or already relative
    var base = raw.split('#')[0].split('?')[0];
    if(!/\.html$/.test(base)) return;
    if(inSet[base]) return;                       // colored screen, keep internal
    a.setAttribute('href', '../wireframes/' + raw); // grey original, no dead end
  });
}

/* ============================================================
   Icon system - one coherent Solar-spirit set (stroke 1.9, round joins),
   the same language as concept/concept.html. Path bodies only; viewBox 24.
   ============================================================ */
var UIV_P = {
  home:'<path d="M4 11.4 12 4l8 7.4"/><path d="M6 10.2V20h12v-9.8"/>',
  user:'<circle cx="12" cy="7.6" r="3.4"/><path d="M5.2 20c.4-3.7 3.3-5.9 6.8-5.9s6.4 2.2 6.8 5.9"/>',
  heart:'<path d="M12 20.2C4 15.3 3.6 10.3 3.6 9.1 3.6 6.6 5.5 5 7.6 5c1.7 0 3.3 1 4.4 2.7C13.1 6 14.7 5 16.4 5c2.1 0 4 1.6 4 4.1 0 1.2-.4 6.2-8.4 11.1z"/>',
  star:'<path d="M12 3.6l2.6 5.2 5.7.8-4.1 4 1 5.7-5.2-2.7-5.1 2.7 1-5.7-4.2-4 5.7-.8z"/>',
  target:'<circle cx="12" cy="12" r="8.3"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".7" fill="currentColor" stroke="none"/>',
  spark:'<path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z"/>',
  cart:'<path d="M2.6 4h2.1l1.9 10.2a1.7 1.7 0 0 0 1.7 1.4h8.1a1.7 1.7 0 0 0 1.7-1.3L19.9 7.2H6.1"/><circle cx="9" cy="19.6" r="1.5"/><circle cx="17.2" cy="19.6" r="1.5"/>',
  search:'<circle cx="11" cy="11" r="6.8"/><path d="M20.5 20.5l-4.4-4.4"/>',
  pin:'<path d="M12 21c4.5-4.2 6.8-7.3 6.8-10.5A6.8 6.8 0 0 0 5.2 10.5C5.2 13.7 7.5 16.8 12 21z"/><circle cx="12" cy="10.4" r="2.5"/>',
  burger:'<path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"/>',
  list:'<path d="M8.5 6.5h12M8.5 12h12M8.5 17.5h12"/><circle cx="4.3" cy="6.5" r="1.15"/><circle cx="4.3" cy="12" r="1.15"/><circle cx="4.3" cy="17.5" r="1.15"/>',
  grid:'<rect x="3.6" y="3.6" width="6.8" height="6.8" rx="1.8"/><rect x="13.6" y="3.6" width="6.8" height="6.8" rx="1.8"/><rect x="3.6" y="13.6" width="6.8" height="6.8" rx="1.8"/><rect x="13.6" y="13.6" width="6.8" height="6.8" rx="1.8"/>',
  chevron:'<path d="M6 9.5l6 6 6-6"/>',
  chevUp:'<path d="M6 14.5l6-6 6 6"/>',
  caret:'<path d="M9.5 6l6 6-6 6"/>',
  bell:'<path d="M6.5 10.5a5.5 5.5 0 0 1 11 0c0 4.8 2 6.3 2 6.3H4.5s2-1.5 2-6.3z"/><path d="M9.8 20a2.3 2.3 0 0 0 4.4 0"/>',
  /* categories */
  jar:'<path d="M6.5 9h11v9.3a1.5 1.5 0 0 1-1.5 1.5H8a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M8 9V6.3A1.3 1.3 0 0 1 9.3 5h5.4A1.3 1.3 0 0 1 16 6.3V9"/><path d="M9.5 13h5"/>',
  cup:'<path d="M6 8h12l-1 10.4a1.6 1.6 0 0 1-1.6 1.6H8.6A1.6 1.6 0 0 1 7 18.4z"/><path d="M8.5 8V6.5A1.5 1.5 0 0 1 10 5h4a1.5 1.5 0 0 1 1.5 1.5V8"/>',
  flask:'<path d="M9.5 3h5M10.5 3v5.6l-4.3 8.2A1.8 1.8 0 0 0 7.8 20.5h8.4a1.8 1.8 0 0 0 1.6-2.7L13.5 8.6V3"/><path d="M8.4 14.5h7.2"/>',
  dna:'<path d="M8 3c0 5 8 6 8 9s-8 4-8 9M16 3c0 5-8 6-8 9s8 4 8 9"/><path d="M9 6.3h6M8.6 17.7h6.8M10 9.4h4M10 14.6h4"/>',
  bolt:'<path d="M13 3L6 13h5l-1 8 8-11h-5l1-7z"/>',
  flame:'<path d="M12 3c1 3 4 4.3 4 8a4 4 0 0 1-8 0c0-1.5.5-2.4 1.1-3 .3 1 1 1.6 1.7 1.8C10.2 7.7 10.8 5 12 3z"/>',
  drop:'<path d="M12 4c3 4 5 6.4 5 9a5 5 0 0 1-10 0c0-2.6 2-5 5-9z"/>',
  bar:'<rect x="3.5" y="8" width="17" height="8" rx="2"/><path d="M8.7 8v8M13 8v8"/>',
  capsule:'<rect x="4.5" y="9" width="15" height="6" rx="3" transform="rotate(-32 12 12)"/><path d="M9.6 8.1l4.8 7.8"/>',
  dumbbell:'<path d="M6.5 8.5v7M17.5 8.5v7M4 10v4M20 10v4M6.5 12h11"/>',
  tag:'<path d="M4 11.5V4.5A.5.5 0 0 1 4.5 4h7l8.5 8.5a1 1 0 0 1 0 1.4l-6.1 6.1a1 1 0 0 1-1.4 0z"/><circle cx="8.2" cy="8.2" r="1.4"/>',
  leaf:'<path d="M5 19C5 11 11 5.4 20 5c.2 8.6-5.4 14.6-15 14z"/><path d="M8.6 16.4c2.2-3 5-5.2 8.4-6.6"/>',
  shield:'<path d="M12 3l7 2.5v5.4c0 4.5-3 7.4-7 9.6-4-2.2-7-5.1-7-9.6V5.5L12 3z"/><path d="M8.9 11.7l2.1 2.1 4.1-4.3"/>',
  trending:'<path d="M4 16l5-5 3.5 3.5L20 7"/><path d="M15 7h5v5"/>',
  pulse:'<path d="M3.5 12h4l2-5 3 10 2.5-5H21"/>',
  /* footer trust strip */
  truck:'<path d="M3 6.5h11v8.5H3z"/><path d="M14 9h3.6l2.9 3v3H14"/><circle cx="7" cy="17.5" r="1.9"/><circle cx="17" cy="17.5" r="1.9"/>',
  card:'<rect x="2.5" y="5.5" width="19" height="13" rx="2.5"/><path d="M2.5 10h19"/><path d="M6 14.5h4"/>',
  ret:'<path d="M9.5 5L5 9.5 9.5 14"/><path d="M5 9.5h9.2a5.3 5.3 0 0 1 0 10.6H8"/>',
  clock:'<circle cx="12" cy="12" r="8.3"/><path d="M12 7.4V12l3.2 2"/>',
  /* allergen warning: a triangle, not the error glyph - it cautions, it is not a failure */
  alert:'<path d="M12 4.3 21 19.7H3z"/><path d="M12 10.2v4.1"/><circle cx="12" cy="17" r=".95" fill="currentColor" stroke="none"/>',
  /* certificate / document with a verified mark (PDP trust strip) */
  doc:'<path d="M6 3.6h7.4L18 8.2V20a.6.6 0 0 1-.6.6H6a.6.6 0 0 1-.6-.6V4.2A.6.6 0 0 1 6 3.6z"/><path d="M13.2 3.8v4.6h4.6"/><path d="M8.6 14.1l2.1 2.1 4.4-4.6"/>'
};
/* every wireframe glyph that appears in the chrome/menus/cards → its icon key.
   ★ is only mapped for the chrome (Бонуси); card rating ★ is never touched. */
var UIV_EMOJI = {
  '🏠':'home','👤':'user','♡':'heart','♥':'heart','❤️':'heart','☆':'star','★':'star',
  '🛒':'cart','🔍':'search','📍':'pin','☰':'burger','▦':'grid','▾':'chevron','▲':'chevUp','›':'caret','🔔':'bell',
  '🥛':'jar','🍚':'cup','⚗️':'flask','🧬':'dna','⚡':'bolt','🔥':'flame','💧':'drop','🍫':'bar',
  '💊':'capsule','🧴':'dumbbell','🏷️':'tag','🌿':'leaf','🛡️':'shield','💪':'trending','🏃':'pulse',
  '🎯':'target','✦':'spark'
};
var UIV_RE = new RegExp('(' + Object.keys(UIV_EMOJI)
  .sort(function(a,b){ return b.length - a.length; })
  .join('|') + ')');

function uivWrap(key){
  if(!UIV_P[key]) return '';
  return '<span class="uiv-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + UIV_P[key] + '</svg></span>';
}
/* rating star: the UIV_P.star above is the outline chrome icon (Бонуси); a RATING
   wants a filled glyph, so it gets its own builder. Colour comes from --star. */
function uivStars(n){
  var out = '';
  for(var i = 0; i < (n || 1); i++){
    out += '<span class="uiv-ic uiv-star"><svg viewBox="0 0 24 24" fill="currentColor" ' +
      'stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true">' +
      UIV_P.star + '</svg></span>';
  }
  return out;
}
/* swap a leading ★ for the gold star, keep the figure after it */
function uivStarify(el, n){
  if(!el || el.querySelector('.uiv-star')) return;
  var rest = el.textContent.replace(/[★☆]/g, '').trim();
  el.innerHTML = uivStars(n) + (rest ? '<b>' + rest + '</b>' : '');
}
/* ₴ at full size next to a 36px figure reads as a second glyph competing with the
   number; at half size it becomes a unit mark and the price reads as one shape.
   Only on BIG figures - below 17px (struck prices, fine print) it would disappear. */
function uivCurrency(root){
  var scope = root === undefined ? document.body : root;
  if(!scope) return;
  var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null);
  var hits = [], n;
  while((n = walker.nextNode())){
    if(n.nodeValue.indexOf('₴') === -1) continue;
    var p = n.parentElement;
    if(!p || p.classList.contains('uiv-cur')) continue;
    if(p.closest('.uiv-side, .uiv-topbar')) continue;   /* the tool chrome, not the store */
    if(parseFloat(getComputedStyle(p).fontSize) < 17) continue;
    hits.push(n);
  }
  hits.forEach(function(tn){
    var frag = document.createDocumentFragment();
    tn.nodeValue.split('₴').forEach(function(part, i){
      if(i){ var s = document.createElement('span'); s.className = 'uiv-cur'; s.textContent = '₴'; frag.appendChild(s); }
      if(part) frag.appendChild(document.createTextNode(part));
    });
    tn.parentNode.replaceChild(frag, tn);
  });
}
/* walk text nodes under root, swap any mapped emoji for its SVG icon */
function uivIcons(root){
  if(!root) return;
  var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  var hits = [], n;
  while((n = walker.nextNode())){ if(UIV_RE.test(n.nodeValue)) hits.push(n); }
  hits.forEach(function(tn){
    var parts = tn.nodeValue.split(UIV_RE);
    var frag = document.createDocumentFragment();
    parts.forEach(function(p){
      if(!p) return;
      if(UIV_EMOJI[p]){ var s = document.createElement('span'); s.innerHTML = uivWrap(UIV_EMOJI[p]); if(s.firstChild) frag.appendChild(s.firstChild); }
      else frag.appendChild(document.createTextNode(p));
    });
    tn.parentNode.replaceChild(frag, tn);
  });
}
function uivChrome(){
  /* the JS-injected regions that carry emoji: header (+ mega + city dialog),
     the mobile menu panel (#drawer - lives on <body> since it unfolds under the
     header), footer, mobile tab bar, the filter rail, and the mobile filter sheet */
  ['wf-header', 'drawer', 'wf-footer', 'wf-tabbar', 'wf-rail', 'wf-sheet'].forEach(function(id){
    uivIcons(document.getElementById(id));
  });
  /* content controls that carry a lone glyph - the sort button chevron and the
     pager "next" caret. Scoped per element so the view-toggle (☰ → list, handled
     below) is never caught by the global ☰ → burger mapping. */
  document.querySelectorAll('.ltool .ctrl, .mtoolbar .mc, .pages').forEach(uivIcons);
  /* product-card fav heart (♡) → outline heart icon; grid uses .fav, list uses .lfav */
  document.querySelectorAll('.fav, .lfav').forEach(function(b){
    if(/[♡♥]/.test(b.textContent)) b.innerHTML = uivWrap('heart');
  });
  /* card rating "★ 4.8" → the same filled gold star as the PDP (one rating look) */
  document.querySelectorAll('.pcard .rate .st, .pcard-l .lmeta .st').forEach(function(el){
    uivStarify(el, 1);
  });
  /* mega-menu "Вибір місяця" card → a real product photo. ui-visual only:
     greyscale keeps the «фото» placeholder in _nav.js untouched. */
  document.querySelectorAll('.ms-feat .ms-ph').forEach(function(ph){
    if(ph.dataset.uiv) return; ph.dataset.uiv = '1';
    ph.innerHTML = '<img src="../concept/assets/product-whey.png" alt="Gold Standard 100% Whey">';
  });
  /* product-card corner badge → a typed chip: Популярне = dark + ★, Новинка = accent + ✦ */
  document.querySelectorAll('.pcard .ph .tag, .pcard-l .lph .tag').forEach(function(t){
    var s = (t.textContent || '').trim().toLowerCase();
    if(/нов/.test(s)) t.classList.add('tag-new');
    else if(/попул|хіт|хит|бестсел/.test(s)) t.classList.add('tag-pop');
  });
  /* product-card action button → cart, or a bell when it's the OOS "notify" variant */
  document.querySelectorAll('.cartbtn').forEach(function(b){
    b.innerHTML = uivWrap(b.classList.contains('notify') ? 'bell' : 'cart');
  });
  /* list/grid view toggle glyphs → matching icons */
  document.querySelectorAll('.vtoggle a, .vtoggle span').forEach(function(el){
    var t = (el.textContent || '').trim();
    if(t === '▦') el.innerHTML = uivWrap('grid');
    else if(t === '☰') el.innerHTML = uivWrap('list');
  });
  /* presentation enhancers (beyond icon swaps) */
  uivFooterIcons();
  uivLinkifySeo();
  uivMascot();
  uivSort();
  uivPriceSlider();
  uivStickyHeader();
  uivAnchorScroll();
  uivCheckboxes();
  uivFav();
  uivPatchMenus();
  uivCurrency();
}

/* make the product-card heart interactive: a click toggles the .on (filled) state
   in place, without following the card link (delegated → covers re-rendered cards). */
function uivFav(){
  if(document.body.dataset.uivFav) return;
  document.body.dataset.uivFav = '1';
  document.addEventListener('click', function(e){
    var b = e.target.closest ? e.target.closest('.fav, .lfav') : null;
    if(!b) return;
    e.preventDefault();
    var on = b.classList.toggle('on');
    b.setAttribute('aria-label', on ? 'В обраному' : 'В обране');
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

/* the mobile catalog overlay (#wf-catov) is (re)built on demand by _nav.js AFTER
   uivChrome already ran, so its category/goal emoji arrive un-iconified. Wrap the
   three _nav.js builders so the overlay body gets re-iconified after each render. */
function uivPatchMenus(){
  var bodyIcons = function(){ uivIcons(document.getElementById('wf-catov-body')); };
  ['catOverlayL0', 'catOverlayCat', 'catOverlayGoals'].forEach(function(name){
    var fn = window[name];
    if(typeof fn !== 'function' || fn.__uiv) return;
    window[name] = function(){ var r = fn.apply(this, arguments); bodyIcons(); return r; };
    window[name].__uiv = 1;
  });
}

/* make the filter checkboxes interactive: a click on a .fopt row toggles its .cb
   square (rail + mobile sheet; delegated so it also covers any re-rendered rows). */
function uivCheckboxes(){
  if(document.body.dataset.uivCb) return;
  document.body.dataset.uivCb = '1';
  document.addEventListener('click', function(e){
    var lbl = e.target.closest ? e.target.closest('.fopt') : null;
    if(!lbl) return;
    var cb = lbl.querySelector('.cb');
    if(!cb) return;
    e.preventDefault();
    cb.classList.toggle('on');
  });
}

/* the static .frange bars → real draggable dual-thumb sliders with an orange
   fill between the handles; the two .frow labels become synced number inputs */
function uivPriceSlider(){
  var MIN = 0, MAX = 3000, STEP = 10;
  document.querySelectorAll('.frange').forEach(function(bar){
    if(bar.dataset.uiv) return;
    bar.dataset.uiv = '1';
    var grp = bar.parentNode;
    var row = grp ? grp.querySelector('.frow') : null;
    var ins = row ? [].slice.call(row.querySelectorAll('.in')) : [];
    var num = function(el, dflt){ if(!el) return dflt; var v = parseInt((el.textContent || el.value || '').replace(/\D/g, ''), 10); return isNaN(v) ? dflt : v; };
    var lo = num(ins[0], 800), hi = num(ins[1], 1500);
    lo = Math.max(MIN, Math.min(MAX, lo)); hi = Math.max(MIN, Math.min(MAX, hi));
    if(lo > hi - STEP) lo = hi - STEP;

    bar.classList.add('uiv-slider');
    bar.innerHTML =
      '<div class="uiv-track"></div><div class="uiv-fill"></div>' +
      '<input type="range" class="uiv-rmin" min="' + MIN + '" max="' + MAX + '" step="' + STEP + '" value="' + lo + '" aria-label="Ціна від">' +
      '<input type="range" class="uiv-rmax" min="' + MIN + '" max="' + MAX + '" step="' + STEP + '" value="' + hi + '" aria-label="Ціна до">';
    var rmin = bar.querySelector('.uiv-rmin'), rmax = bar.querySelector('.uiv-rmax'), fill = bar.querySelector('.uiv-fill');

    /* swap the two static .frow labels for editable number inputs */
    var mkNum = function(old){ var i = document.createElement('input'); i.type = 'number'; i.className = 'in uiv-num'; i.min = MIN; i.max = MAX; i.step = STEP; if(old) old.parentNode.replaceChild(i, old); return i; };
    var nmin = ins[0] ? mkNum(ins[0]) : null, nmax = ins[1] ? mkNum(ins[1]) : null;

    var pct = function(v){ return ((v - MIN) / (MAX - MIN)) * 100; };
    var paint = function(){
      var a = +rmin.value, b = +rmax.value;
      fill.style.left = pct(a) + '%';
      fill.style.width = (pct(b) - pct(a)) + '%';
      rmin.style.zIndex = (a > (MIN + MAX) / 2) ? 6 : 3;  /* keep the low thumb grabbable when they overlap */
      rmax.style.zIndex = 4;
      if(nmin && document.activeElement !== nmin) nmin.value = a;
      if(nmax && document.activeElement !== nmax) nmax.value = b;
    };
    rmin.addEventListener('input', function(){ if(+rmin.value > +rmax.value - STEP) rmin.value = +rmax.value - STEP; paint(); });
    rmax.addEventListener('input', function(){ if(+rmax.value < +rmin.value + STEP) rmax.value = +rmin.value + STEP; paint(); });
    var clampNum = function(){
      var a = Math.max(MIN, Math.min(MAX, parseInt(nmin.value, 10) || MIN));
      var b = Math.max(MIN, Math.min(MAX, parseInt(nmax.value, 10) || MAX));
      if(a > b - STEP) a = b - STEP;
      rmin.value = a; rmax.value = b; paint();
    };
    if(nmin) nmin.addEventListener('change', clampNum);
    if(nmax) nmax.addEventListener('change', clampNum);
    paint();
  });
}

/* header condenses on scroll: full (with meta links) at the top, collapsed +
   shadowed once it sticks. Toggles .uiv-scrolled past the meta-bar height. */
function uivStickyHeader(){
  var h = document.getElementById('wf-header');
  if(!h || h.dataset.uivsticky) return;
  h.dataset.uivsticky = '1';
  var meta = h.querySelector('.wfh-meta');
  var base = meta ? meta.offsetHeight : 34;
  if(base < 10) base = 34;                 /* page opened already scrolled: meta is collapsed */
  /* HYSTERESIS (fix 2026-07-27): collapsing the meta row removes ~34px of page height,
     the content under the cursor jumps up, and the browser's scroll anchoring corrects
     scrollY by about the same amount - with a single threshold that lands you back on
     the other side of it and the header flickers open/closed forever. Two thresholds
     with a dead band in between make the state impossible to bounce out of. */
  var down = base + 12, up = Math.max(4, base - 16);
  var tick = function(){
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    var on = h.classList.contains('uiv-scrolled');
    if(!on && y > down) h.classList.add('uiv-scrolled');
    else if(on && y < up) h.classList.remove('uiv-scrolled');
  };
  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick);
  tick();
}

/* in-page anchor links (e.g. «Читати більше» → #seo) smooth-scroll with an offset that
   clears the sticky header. The header condenses past the meta-bar height as you scroll,
   so when the destination is below that fold point, subtract the meta height (content
   shifts up by exactly that when it collapses). Works from any start scroll position. */
function uivAnchorScroll(){
  if(document.body.dataset.uivAnchor) return;
  document.body.dataset.uivAnchor = '1';
  document.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if(!a) return;
    var href = a.getAttribute('href');
    if(!href || href.length < 2) return;              // skip bare "#" buttons
    var target = document.querySelector(href);
    if(!target) return;
    e.preventDefault();
    var h = document.getElementById('wf-header');
    var meta = h ? h.querySelector('.wfh-meta') : null;
    var metaH = (meta && h && !h.classList.contains('uiv-scrolled')) ? meta.offsetHeight : 0;
    var want = 100;                                   // collapsed header (~79) + a calm gap
    var dest = target.getBoundingClientRect().top + window.scrollY - want;
    if(dest > (metaH || 34)) dest -= metaH;           // header collapses there → content rises by metaH
    window.scrollTo({ top: Math.max(0, dest), behavior: 'smooth' });
    if(history.replaceState) history.replaceState(null, '', href);
  });
}

/* footer trust strip → a leading Solar icon per item */
function uivFooterIcons(){
  var set = ['truck', 'shield', 'card', 'ret'];
  document.querySelectorAll('.wff-trust .wff-tc').forEach(function(tc, i){
    if(tc.querySelector('.uiv-tc-ic')) return;
    var s = document.createElement('span');
    s.className = 'uiv-tc-ic';
    s.innerHTML = uivWrap(set[i] || 'shield');
    tc.insertBefore(s, tc.firstChild);
  });
}

/* footer SEO block → make each category/goal/brand/city name a real link */
function uivLinkifySeo(){
  var seo = document.querySelector('.wff-seo');
  if(!seo || seo.dataset.uiv) return;
  seo.dataset.uiv = '1';
  [].slice.call(seo.childNodes).forEach(function(node){
    if(node.nodeType !== 3 || !/[^\s· ]/.test(node.nodeValue)) return;
    var html = node.nodeValue.replace(/([^· ]+)/g, function(m){
      var t = m.trim(); if(!t) return m;
      var lead = m.match(/^\s*/)[0], trail = m.match(/\s*$/)[0];
      return lead + '<a class="seolink" href="../wireframes/listing.html">' + t.replace(/</g, '&lt;') + '</a>' + trail;
    });
    var span = document.createElement('span');
    span.innerHTML = html;
    node.parentNode.replaceChild(span, node);
  });
}

/* calm brand mascot on the right of the category SEO block (desktop only, CSS) */
function uivMascot(){
  var seo = document.querySelector('.seotext');
  if(!seo || seo.querySelector('.uiv-bear')) return;
  var img = document.createElement('img');
  img.className = 'uiv-bear';
  img.src = '../concept/assets/mascot-pose-present.png';
  img.alt = '';
  img.setAttribute('aria-hidden', 'true');
  seo.appendChild(img);
}

/* ============================================================
   PDP (node 3.0) - the visual layer of the product page. The grey wireframe
   ships typed placeholders («фото товару», «зображення», «переглянути сертифікат»);
   here they become the real objects the trust job needs: a product gallery with
   working thumbs, the composition photographed on the pack, a certificate that
   looks like a document, and a Solar icon on every proof in the trust strip.
   ============================================================ */
var UIV_PDP_SHOT = '../concept/assets/product-whey.png';
/* the 4 gallery views: same render, different framing (one product, one shot) */
var UIV_PDP_VIEWS = [
  { s: 1,    p: 'center 50%' },   /* уся банка */
  { s: 1.55, p: 'center 22%' },   /* кришка й горло */
  { s: 1.75, p: 'center 60%' },   /* етикетка зблизька */
  { s: 1.3,  p: 'center 86%' }    /* низ банки */
];
/* description blocks: formula · dosage · mixing · storage → the renders we have */
var UIV_PDP_DESC = [
  '../concept/assets/product-whey.png',
  '../concept/assets/product-creatine.png',
  '../concept/assets/product-preworkout.png',
  '../concept/assets/mascot-pose-product.png'
];

/* the section tabs: pinned to the header's real bottom edge, and flagged .stuck the
   moment they get there (that is when the shelf, its shadow and the price + buy
   button appear - see .pdp-tabs in _theme.css) */
function uivPdpTabs(){
  var tabs = document.querySelector('.pdp-tabs');
  var header = document.getElementById('wf-header');
  if(!tabs || !header || tabs.dataset.uivStick) return;
  tabs.dataset.uivStick = '1';
  var tick = function(){
    var top = Math.round(header.getBoundingClientRect().bottom);
    if(top < 0) top = 0;
    tabs.style.top = top + 'px';
    /* the shelf background is a FIXED pseudo-element (see _theme.css), so it needs
       the same edge in viewport coordinates plus the strip's own height */
    tabs.style.setProperty('--shelf-top', top + 'px');
    tabs.style.setProperty('--shelf-h', tabs.offsetHeight + 'px');
    var stuck = Math.round(tabs.getBoundingClientRect().top) <= top + 1;
    tabs.classList.toggle('stuck', stuck);
    document.body.classList.toggle('pdp-stuck', stuck);
  };
  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick);
  /* the header condenses over ~0.22s and fires no scroll events while it animates, so
     the shelf would hang at the old offset for a moment (a visible seam / overlap).
     Follow the header for the length of the transition instead. */
  var follow = function(){
    var t0 = null;
    var step = function(ts){
      if(t0 === null) t0 = ts;
      tick();
      if(ts - t0 < 400) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  var meta = header.querySelector('.wfh-meta');
  if(meta){
    meta.addEventListener('transitionrun', follow);
    meta.addEventListener('transitionend', tick);
  }
  tick();
}

function uivPdp(){
  var pdp = document.querySelector('.pdp');
  if(!pdp || pdp.dataset.uiv) return;
  pdp.dataset.uiv = '1';
  uivPdpTabs();

  /* gallery: real photo in the main frame, thumbs = crops of the same shot */
  var main = pdp.querySelector('.gmain');
  if(main){
    var tag = main.querySelector('.gtag');
    var img = document.createElement('img');
    img.src = UIV_PDP_SHOT;
    img.alt = 'Gold Standard 100% Whey 2270 г';
    main.textContent = '';
    main.appendChild(img);
    if(tag) main.appendChild(tag);
    var thumbs = [].slice.call(pdp.querySelectorAll('.gthumb'));
    thumbs.forEach(function(t, i){
      var v = UIV_PDP_VIEWS[i] || UIV_PDP_VIEWS[0];
      t.style.backgroundImage = 'url(' + UIV_PDP_SHOT + ')';
      t.style.backgroundSize = (74 * v.s) + '%';
      t.style.backgroundPosition = v.p;
      t.setAttribute('role', 'button');
      t.setAttribute('aria-label', 'Фото ' + (i + 1));
      t.addEventListener('click', function(){
        thumbs.forEach(function(x){ x.classList.remove('on'); });
        t.classList.add('on');
        img.style.transform = 'scale(' + v.s + ')';
        img.style.objectPosition = v.p;
      });
    });
  }

  /* variant groups: the label carries the CHOSEN value («Смак: Подвійний шоколад»),
     so the current pick is readable without scanning the pills - and picking another
     one actually switches, label included. Sold-out options stay unpickable. */
  pdp.querySelectorAll('.vgroup').forEach(function(g){
    var lbl = g.querySelector('.vlbl'), opts = [].slice.call(g.querySelectorAll('.vopt'));
    if(!lbl || !opts.length) return;
    var sel = document.createElement('span');
    sel.className = 'vsel';
    lbl.appendChild(sel);
    var paint = function(){
      var on = g.querySelector('.vopt.on');
      sel.textContent = on ? on.textContent.trim() : '';
    };
    opts.forEach(function(o){
      if(o.classList.contains('off')) return;         /* немає в наявності - не обирається */
      o.style.cursor = 'pointer';
      o.addEventListener('click', function(){
        opts.forEach(function(x){ x.classList.remove('on'); });
        o.classList.add('on');
        paint();
      });
    });
    paint();
  });

  /* wishlist heart → the icon set; filled orange once added (mirrors the card fav) */
  var wish = pdp.querySelector('.wish');
  if(wish && /[♡♥]/.test(wish.textContent)){
    wish.innerHTML = uivWrap('heart');
    wish.addEventListener('click', function(){ wish.classList.toggle('on'); });
  }

  /* ratings → filled gold star: buy box, the 4.8 summary block, every review row */
  uivStarify(document.querySelector('.bb .bbrate .st'), 1);
  var rvb = document.querySelector('.rvbig .s');
  if(rvb && !rvb.querySelector('.uiv-star')){
    rvb.innerHTML = rvb.innerHTML.replace(/[★☆]+/, '<span class="starrow">' + uivStars(5) + '</span>');
  }
  document.querySelectorAll('.rvmeta .rstars').forEach(function(el){ uivStarify(el, 1); });

  /* trust band: one Solar icon per proof + the mascot leaning in from the right */
  var tsIcons = ['shield', 'doc', 'truck', 'ret'];
  document.querySelectorAll('.truststrip .tsx').forEach(function(tc, i){
    if(tc.querySelector('.uiv-ic')) return;
    var s = document.createElement('span');
    s.innerHTML = uivWrap(tsIcons[i] || 'shield');
    if(s.firstChild) tc.insertBefore(s.firstChild, tc.firstChild);
  });
  /* the bear sits in a clipping wrapper: it crops the body at the panel's bottom
     edge while the head stays whole above the panel (see .uiv-bearwrap) */
  var band = document.querySelector('.truststrip');
  if(band && !band.querySelector('.uiv-trustbear')){
    var bwrap = document.createElement('div');
    bwrap.className = 'uiv-bearwrap';
    bwrap.setAttribute('aria-hidden', 'true');
    var bear = document.createElement('img');
    bear.className = 'uiv-trustbear';
    bear.src = '../concept/assets/mascot-pose-present.png';
    bear.alt = '';
    bwrap.appendChild(bear);
    band.appendChild(bwrap);
  }

  /* «фото складу на упаковці»: the pack render + an honest caption (see _theme.css) */
  var onpack = document.querySelector('.onpack');
  if(onpack) onpack.textContent = 'фото складу на упаковці';

  /* certificate tile → a document with a verified seal (the label stays the link) */
  var cert = document.querySelector('.certthumb');
  if(cert && !cert.querySelector('.uiv-seal')){
    var seal = document.createElement('span');
    seal.className = 'uiv-seal';
    seal.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + UIV_P.shield + '</svg>';
    cert.appendChild(seal);
  }

  /* description: product imagery instead of dashed «зображення» boxes */
  document.querySelectorAll('.pdesc .pd-img').forEach(function(box, i){
    var src = UIV_PDP_DESC[i % UIV_PDP_DESC.length];
    /* white floor: the renders ship with their own soft studio backdrop, so any warm
       fill under them would read as a grey box around the product */
    box.style.backgroundImage = 'url(' + src + ')';
    box.style.backgroundSize = 'auto 84%';
    box.style.backgroundPosition = 'center';
    box.style.backgroundRepeat = 'no-repeat';
    box.style.borderStyle = 'solid';
    box.textContent = '';
  });

  /* allergen callout gets the warning triangle */
  var algic = document.querySelector('.allerg .algic');
  if(algic && !algic.firstChild) algic.innerHTML = uivWrap('alert');

  /* pack label: prepare-in-three-steps icons */
  var plIcons = ['jar', 'cup', 'clock'];   /* мірна ложка з банки · шейкер · час */
  document.querySelectorAll('.packlabel .pl-ic').forEach(function(el, i){
    el.innerHTML = uivWrap(plIcons[i] || 'cup');
  });
  /* delivery rows: the two Нова Пошта rows keep their carrier mark (.np, set in the
     markup), pickup gets the location pin */
  document.querySelectorAll('.dpblk .dpic:not(.np)').forEach(function(el){
    el.innerHTML = uivWrap('pin');
  });

  /* PDP prices are built/rewritten above, so shrink their ₴ after the fact */
  uivCurrency(pdp);
  uivCurrency(document.querySelector('.mbuybar'));
  uivCurrency(document.querySelector('.pdp-tabs'));
}

/* the sort control → a real switchable dropdown */
var UIV_SORTS = ['Популярні', 'Спочатку дешевші', 'Спочатку дорожчі', 'Новинки', 'За рейтингом', 'Зі знижкою'];
function uivSort(){
  var ctrl = [].slice.call(document.querySelectorAll('.ltool .ctrl')).filter(function(c){ return /Сортування/.test(c.textContent); })[0];
  if(!ctrl || ctrl.dataset.uiv) return;
  ctrl.dataset.uiv = '1';
  ctrl.classList.add('uiv-sort');
  var menu = document.createElement('div');
  menu.className = 'uiv-sortmenu';
  menu.innerHTML = UIV_SORTS.map(function(s, i){
    return '<button type="button" class="uiv-sopt' + (i === 0 ? ' on' : '') + '" data-v="' + s + '">' + s + '</button>';
  }).join('');
  ctrl.appendChild(menu);
  ctrl.addEventListener('click', function(e){
    if(e.target.closest('.uiv-sortmenu')) return;
    ctrl.classList.toggle('open');
  });
  menu.querySelectorAll('.uiv-sopt').forEach(function(b){
    b.addEventListener('click', function(){
      menu.querySelectorAll('.uiv-sopt').forEach(function(x){ x.classList.remove('on'); });
      b.classList.add('on');
      [].slice.call(ctrl.childNodes).forEach(function(n){ if(n.nodeType === 3 && n.nodeValue.trim()) n.nodeValue = ' ' + b.dataset.v + ' '; });
      ctrl.classList.remove('open');
    });
  });
  document.addEventListener('click', function(e){ if(!ctrl.contains(e.target)) ctrl.classList.remove('open'); });
}

/* reverse lookup: resolve the current file to its flow + screen + state via
   the shared WF_FLOWS/wfStateFile from _nav.js. State files are named
   base-<state>.html (e.g. listing-empty.html), so a page maps back to its
   base screen + the active state. Returns null for pages not in WF_FLOWS. */
function uivFindScreen(cur){
  if(typeof WF_FLOWS === 'undefined' || typeof wfStateFile !== 'function') return null;
  for(var fi = 0; fi < WF_FLOWS.length; fi++){
    var fl = WF_FLOWS[fi], scr = fl.screens || [];
    for(var si = 0; si < scr.length; si++){
      var sc = scr[si];
      if(sc.file === cur) return { flow: fl, screen: sc, state: null };
      var sts = sc.states || [];
      for(var ti = 0; ti < sts.length; ti++){
        if(wfStateFile(sc.file, sts[ti]) === cur) return { flow: fl, screen: sc, state: sts[ti] };
      }
    }
  }
  return null;
}

/* the ui-visual prototype navigator: a LEFT rail (replaces the two old top
   bars). Top button → усі екрани (screens.html); below, the current flow
   page + every state as vertical links (current highlighted, unbuilt dimmed);
   foot = back to the language stand + the grey original of this page. */
/* Narrow view: the rail is a PUSH-DOWN panel, so the store canvas is offset by the
   panel's real height (--uiv-side-h) instead of being covered by it. Measured before
   every open (content differs per screen) and kept in sync on resize / orientation. */
function uivSideMeasure(){
  var s = document.querySelector('.uiv-side');
  if(!s) return;
  /* the panel is clamped by max-height and its nav scrolls, so scrollHeight would
     report the clamp - unclamp it for one frame to read the natural height */
  var mh = s.style.maxHeight, tr = s.style.transition;
  s.style.transition = 'none';
  s.style.maxHeight = 'none';
  var nat = s.scrollHeight;
  s.style.maxHeight = mh;
  void s.offsetHeight;                 /* flush, so restoring never animates */
  s.style.transition = tr;
  var h = Math.min(nat, Math.max(0, window.innerHeight - 40));
  document.documentElement.style.setProperty('--uiv-side-h', h + 'px');
}
function uivToggleSide(){ uivSideMeasure(); document.body.classList.toggle('uiv-side-open'); }
function uivCloseSide(){ document.body.classList.remove('uiv-side-open'); }
window.addEventListener('resize', function(){
  if(document.body.classList.contains('uiv-side-open')) uivSideMeasure();
});
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') uivCloseSide(); });

function uivBar(){
  if(document.querySelector('.uiv-side')) return;
  var cur = (location.pathname.split('/').pop() || 'listing.html');
  var f = uivFindScreen(cur);

  /* the rail lists EVERY screen already colored here (derived from UIV_SET, so it can
     never drift from the real set), grouped by flow. The screen you are on expands
     into its states; the others stay one link each, so jumping листинг → картка
     товару never goes through «Усі екрани». */
  var seen = {}, screens = [];
  UIV_SET.forEach(function(file){
    var r = uivFindScreen(file);
    if(!r || seen[r.screen.file]) return;
    seen[r.screen.file] = 1;
    screens.push(r);
  });
  if(f && !seen[f.screen.file]) screens.push(f);   /* a not-yet-registered page still shows itself */

  function uivStatesHTML(scr, activeState){
    var list = [{ st: 'base', file: scr.file, on: true, cur: (activeState === null) }];
    (scr.states || []).forEach(function(st){
      list.push({
        st: st,
        file: wfStateFile(scr.file, st),
        on: (scr.builtStates || []).indexOf(st) >= 0,
        cur: (activeState === st)
      });
    });
    return list.map(function(s){
      var label = (typeof WF_STATE_LABEL !== 'undefined' && WF_STATE_LABEL[s.st]) ? WF_STATE_LABEL[s.st] : s.st;
      var colored = UIV_SET.indexOf(s.file) >= 0;
      var cls = 'us-st' + (s.cur ? ' on' : '') + (!s.on ? ' off' : '') + (s.on && !colored ? ' grey' : '');
      if(s.cur) return '<span class="' + cls + '" aria-current="page">' + label + '</span>';
      if(!s.on) return '<span class="' + cls + '">' + label + '</span>';
      /* built in grey but not yet colored → open the grey original, never a 404 */
      var href = colored ? s.file : '../wireframes/' + s.file;
      return '<a class="' + cls + '" href="' + href + '">' + label + (colored ? '' : ' <span class="gr">↗</span>') + '</a>';
    }).join('');
  }

  var states = '', lastFlow = '';
  screens.forEach(function(r){
    var isCur = !!f && r.screen.file === f.screen.file;
    if(r.flow.name !== lastFlow){
      states += '<div class="us-flow">' + r.flow.name + '</div>';
      lastFlow = r.flow.name;
    }
    states += '<a class="us-page' + (isCur ? ' on' : '') + '" href="' + r.screen.file + '">' +
      r.screen.name + ' <span class="nd">' + r.screen.node + '</span></a>';
    if(isCur) states += '<div class="us-states">' + uivStatesHTML(f.screen, f.state) + '</div>';
  });

  var html =
    '<button class="uiv-topbar" type="button" aria-label="Екрани" ' +
      'onclick="uivToggleSide()">' +
      '<span class="ut-l"><span class="uiv-tag">ui-visual</span><span class="ut-label">Екрани</span></span>' +
      '<svg class="ut-chev" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
        '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</button>' +
    '<div class="uiv-sidescrim" onclick="uivCloseSide()"></div>' +
    '<aside class="uiv-side">' +
      '<div class="us-top">' +
        '<a class="us-all" href="screens.html">Усі екрани <span aria-hidden="true">→</span></a>' +
        '<div class="us-tagrow"><span class="uiv-tag">ui-visual</span>' +
          '<span class="us-cap">кольорова копія мови</span></div>' +
      '</div>' +
      '<nav class="us-nav">' + states + '</nav>' +
      '<div class="us-foot">' +
        '<a href="../concept/concept.html">← Мова продукту (Концепт)</a>' +
        '<a href="../wireframes/' + cur + '">Сірий оригінал ↗</a>' +
      '</div>' +
    '</aside>';

  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  var frag = document.createDocumentFragment();
  while(tmp.firstChild) frag.appendChild(tmp.firstChild);
  document.body.appendChild(frag);
}
