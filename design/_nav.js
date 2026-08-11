/* ============================================================
   ui-visual · _nav.js  (Concept, Step 6)
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
var DESIGN_NAV = [
  'listing.html', 'listing-empty.html', 'listing-error.html', 'listing-loading.html',
  'listing-filtered.html', 'listing-list.html', 'listing-sheet.html',
  'product.html', 'product-loading.html', 'product-error.html', 'product-oos.html',
  'product-reviews.html', 'product-coach.html',
  'auth.html', 'auth-loading.html', 'auth-code.html', 'auth-error.html', 'auth-newuser.html',
  'cart.html', 'cart-empty.html', 'cart-oos.html',
  'checkout.html', 'checkout-loggedin.html', 'checkout-noaddr.html',
  'checkout-loading.html', 'checkout-declined.html',
  'index.html', 'home-buyer.html', 'home-coach.html', 'home-cart.html',
  'account.html', 'account-orders.html', 'account-loyalty.html', 'account-addresses.html',
  'account-profile.html', 'account-wishlist.html',
  'account-empty.html', 'account-loading.html', 'account-error.html',
  /* step 7.95, the owner's A13 decision: eight screens of the coach flow. Six are
     the destinations the product's own coach navigation names, two are named by
     the locked product decisions in CLAUDE.md. Without this list a link between
     two coloured coach screens is rewritten back into the grey prototype, which
     is what `uivFixLinks` is for. */
  'coach-landing.html', 'coach-home.html', 'coach-clients.html', 'coach-session.html',
  'coach-orders.html', 'coach-client.html', 'cart-coach.html', 'coach-verify.html'
];

function uivFixLinks(){
  var inSet = {};
  DESIGN_NAV.forEach(function(f){ inSet[f] = 1; });
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

/* The icon set is NOT here any more - design/system/icons.js owns it, together
   with the anatomy (viewBox 24, safe area 2, stroke 1.9, currentColor). The
   stand only decides WHERE a glyph goes; what it looks like is the system's.
   Every screen loads system/icons.js before this file.

   If one forgets to, say so out loud: without this guard the first uivWrap()
   throws a ReferenceError and the whole stand dies with no glyphs, no header
   and no reason on screen. */
if(typeof UIV_P === 'undefined'){
  console.error('[stand] design/system/icons.js is not loaded, so this screen has no icon set. ' +
    'A screen loads <script src="system/icons.js"> BEFORE _nav.js.');
  window.UIV_P = {}; window.UIV_BRAND = {};
  window.uivIconSvg = function(){ return ''; };
  window.uivBrandSvg = function(){ return ''; };
}
/* every wireframe glyph that appears in the chrome/menus/cards → its icon key.
   ★ is only mapped for the chrome (Бонуси); card rating ★ is never touched. */
var UIV_EMOJI = {
  '🏠':'home','👤':'user','♡':'heart','♥':'heart','❤️':'heart','☆':'star','★':'star',
  /* 🔎 U+1F50E is a row this map was missing, one codepoint from the 🔍 U+1F50D
     beside it - step 7.96. `coach-clients.html` types the tilted lens in its
     search field, so the coach flow drew its one search mark with the font while
     every other search mark in the product came from the set. Both spellings
     answer to one drawing, here and in `UIV_SIGN_ONLY`. */
  '🛒':'cart','🔍':'search','🔎':'search','📍':'pin','☰':'burger','▦':'grid','▾':'chevron','▲':'chevUp','›':'caret','🔔':'bell',
  '🥛':'jar','🍚':'cup','⚗️':'flask','🧬':'dna','⚡':'bolt','🔥':'flame','💧':'drop','🍫':'bar',
  '💊':'capsule','🧴':'dumbbell','🏷️':'tag','🌿':'leaf','🛡️':'shield','💪':'trending','🏃':'pulse',
  '🎯':'target','✦':'spark','🎓':'cap',
  /* THE COACH CABINET, step 7.99. Three rows, and only one of them is a new
     drawing decision.
     👥 «Клієнти» and ◈ «Тариф» are the two rows of the coach rail that had no map
     row anywhere, so they rendered as a raw emoji and a raw lozenge beside five
     siblings drawn from the set. `users` and `gem` are drawn in icons.js and the
     reasoning for each is there.
     🎽 IS NOT A NEW MARK, IT IS A SECOND ONE. The coach's tab bar points at
     coach-home.html and drew a running shirt; the buyer account rail points at
     THE SAME coach-home.html and has drawn 🎓 since it was built (see
     wfAccountNav, isCoach). One destination with two marks in two navigations a
     coach uses in the same session - so the tab takes the mark that was already
     the coach's, and no glyph is added. The grey layer keeps its shirt: frozen
     since stage 05, and this map is exactly the place where the colour layer is
     allowed to disagree with it. */
  '👥':'users','◈':'gem','🎽':'cap',
  '✈️':'telegram','✈':'telegram','📲':'viber',
  /* account (7.x) */
  '📦':'box','↻':'refresh','⎋':'logout','✎':'pen','⭳':'download','⌄':'chevron',
  '⚠️':'alert','⚠':'alert','✓':'check','🗑️':'trash','🗑':'trash'
};
var UIV_RE = new RegExp('(' + Object.keys(UIV_EMOJI)
  .sort(function(a,b){ return b.length - a.length; })
  .join('|') + ')');

function uivWrap(key){
  /* brand marks are filled badges with their own viewBox - everything else is our 24px stroke set */
  if(UIV_BRAND[key]) return '<span class="uiv-ic uiv-brand">' + uivBrandSvg(key) + '</span>';
  var svg = uivIconSvg(key);
  return svg ? '<span class="uiv-ic">' + svg + '</span>' : '';
}
/* the filled rating star is a VARIANT of the set's star, not a second glyph -
   design/system/icons.js draws it; the stand only repeats it n times */
function uivStars(n){
  var out = '';
  for(var i = 0; i < (n || 1); i++) out += '<span class="uiv-ic uiv-star">' + uivStarSvg() + '</span>';
  return out;
}
/* A RADIO THAT A KEYBOARD CAN REACH - step 7.29.
   Measured across 40 screens: 21 delivery and payment rows and 17 flavour
   options, and not one of them was reachable. `.co-opt` is a `<label>` pointing
   at no input; `.vopt` is a `<span>`. No role, no tabindex, nothing announced.
   The checkout could not be completed without a mouse.

   The product already had the answer in two places and used it in neither: the
   language picker keeps a real `input[type=radio]` inside its label, and the
   review modal's star picker is built with `role="radiogroup"` by
   `wireframes/_nav.js`. This borrows the second, because the first needs new
   markup and the markup is the frozen layer's.

   ROVING TABINDEX, which is what a radio group is: the SET takes one tab stop,
   the arrows move inside it. A group of five options that each took a stop would
   make the checkout longer to cross by keyboard than by mouse.

   Selection goes through `.click()` rather than through a class, so whatever the
   page already does on a click - recalculate the total, open the sub-row - still
   runs. This file adds a way in; it does not take over what happens next. */
function uivRadioGroups(){
  var sets = [];
  [['.co-opt', '.co-opt'], ['.vopts', '.vopt']].forEach(function(pair){
    var items = [].slice.call(document.querySelectorAll(pair[1]));
    var byParent = new Map();
    items.forEach(function(el){
      var p = el.parentElement; if(!p) return;
      if(!byParent.has(p)) byParent.set(p, []);
      byParent.get(p).push(el);
    });
    byParent.forEach(function(list, parent){ if(list.length > 1) sets.push({ parent: parent, list: list }); });
  });

  sets.forEach(function(set){
    if(set.parent.getAttribute('role') === 'radiogroup') return;   /* already done */
    set.parent.setAttribute('role', 'radiogroup');

    var enabled = function(el){ return !el.classList.contains('off'); };
    var mark = function(){
      var chosen = set.list.filter(function(el){ return el.classList.contains('on'); })[0];
      var stop = chosen && enabled(chosen) ? chosen : set.list.filter(enabled)[0];
      set.list.forEach(function(el){
        el.setAttribute('role', 'radio');
        el.setAttribute('aria-checked', el.classList.contains('on') ? 'true' : 'false');
        if(!enabled(el)){ el.setAttribute('aria-disabled', 'true'); el.setAttribute('tabindex', '-1'); }
        else el.setAttribute('tabindex', el === stop ? '0' : '-1');
      });
    };
    mark();

    var move = function(from, step){
      var pool = set.list.filter(enabled);
      var i = pool.indexOf(from);
      if(i < 0) return;
      var next = pool[(i + step + pool.length) % pool.length];
      next.click();
      mark();
      next.focus();
    };

    set.parent.addEventListener('keydown', function(e){
      var el = e.target.closest ? e.target.closest('.co-opt, .vopt') : null;
      if(!el || set.list.indexOf(el) < 0) return;
      if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){ e.preventDefault(); move(el, 1); }
      else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){ e.preventDefault(); move(el, -1); }
      else if(e.key === ' ' || e.key === 'Enter'){
        if(!enabled(el)) return;
        e.preventDefault(); el.click(); mark();
      }
    });
    /* a mouse press moves the group's single tab stop too, or the next Tab would
       land on whatever was chosen when the page loaded */
    set.parent.addEventListener('click', function(){ setTimeout(mark, 0); });
  });
}

/* A SWITCH THAT A KEYBOARD CAN REACH - step 7.32.
   `.sw` on the profile screen is `<span class="sw" role="switch"
   aria-checked="true" aria-label="Згода на розсилку">`. Everything a screen
   reader needs is there, the click is wired, and both the track and the knob
   animate. The one thing missing is a tab stop, so the whole thing is reachable
   by nothing but a mouse: 250 Tab presses on `account-profile` never landed on
   it. Third time this stage has met the same shape - a control fully declared in
   the markup and absent from the tab order, after `.ord-tabs` at 7.31 and the
   login dialog's links at 7.30.

   Keyed on `[role="switch"]`, not on `.sw`, and that is deliberate. It is the
   ROLE that promises a keyboard, so the role is what should carry the fix -
   which also reaches `.ck-tog`, the cookie dialog's toggles, the day that dialog
   gets a colour twin, without anyone having to remember this function exists.

   Space and Enter go through `.click()` so that whatever the page does on a
   click - flip the class, sync `aria-checked` - is the one edition that runs.
   `preventDefault` on Space, or the page scrolls under the switch. */
function uivSwitches(root){
  var page = root || document;
  [].slice.call(page.querySelectorAll('[role="switch"]:not([tabindex])')).forEach(function(el){
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function(e){
      if(e.key !== ' ' && e.key !== 'Enter') return;
      e.preventDefault();
      el.click();
    });
  });
}

/* A SEGMENT THAT A KEYBOARD CAN REACH - step 7.31.
   The segment rung of the chip: `.ptab` on the four home screens, `.ord-tab` in
   the order history. Both are `<span>`, both look pressable, and neither had a
   role, a tab stop or a key binding. 35 instances.

   They were not equally broken, and the difference is the finding. `.ptab`
   answered a click, because five lines further down this file used to move `.on`
   for it - «a tab that never moves reads as broken» was the comment. `.ord-tab`
   is the same control one rung along and had nothing at all: three filters over
   an order list, «Усі · Доставлені · В дорозі», and pressing them with a mouse
   did nothing either. Measured, not assumed: clicking index 2 left `.on` exactly
   where it was.

   So this pass does two things and both are declared. It moves the click
   handling out of `uivPdp` into one rule for the rung, which is why `.ord-tab`
   now answers a press at all - a behaviour change, not a consolidation. And it
   adds the keyboard: ROVING TABINDEX, exactly as `uivRadioGroups` does, because
   a segment is the same promise as a radio - exactly one of the set is on. Three
   filters that each took a tab stop would cost more to cross than they save.

   `role="tablist"` / `role="tab"` / `aria-selected` rather than radiogroup: a
   radio picks a value that goes into the order, a tab switches which slice of
   the same list you are looking at. Same mechanics, different promise, and the
   line between them is the one chip.css draws between a filter and a segment. */
function uivSegments(root){
  var page = root || document;
  ['.ptab', '.ord-tab'].forEach(function(sel){
    var items = [].slice.call(page.querySelectorAll(sel));
    var byParent = new Map();
    items.forEach(function(el){
      var p = el.parentElement; if(!p) return;
      if(!byParent.has(p)) byParent.set(p, []);
      byParent.get(p).push(el);
    });
    byParent.forEach(function(list, parent){
      if(list.length < 2) return;
      /* The «already done» flag is OURS, not the role - and that distinction cost
         a pass. The first draft guarded on `role === 'tablist'`, which read as
         safe until the browser showed `.ord-tabs` with a marked parent and three
         unmarked children: `account-orders.html` ALREADY writes
         `role="tablist" aria-label="Фільтр замовлень"` into the markup, so the
         guard fired on the author's own attribute and skipped the whole group.
         Which is also the sharpest thing found here - the grey layer had declared
         a tablist and never wired one, so the role was announcing a control that
         did not exist. Wiring it completes what the markup already promises. */
      if(parent.dataset.uivSeg) return;
      parent.dataset.uivSeg = '1';
      parent.setAttribute('role', 'tablist');

      var mark = function(){
        var chosen = list.filter(function(el){ return el.classList.contains('on'); })[0] || list[0];
        list.forEach(function(el){
          el.setAttribute('role', 'tab');
          el.setAttribute('aria-selected', el.classList.contains('on') ? 'true' : 'false');
          el.setAttribute('tabindex', el === chosen ? '0' : '-1');
        });
      };
      var choose = function(el){
        list.forEach(function(x){ x.classList.remove('on'); });
        el.classList.add('on');
        mark();
      };
      mark();

      parent.addEventListener('click', function(e){
        var el = e.target.closest ? e.target.closest(sel) : null;
        if(!el || list.indexOf(el) < 0) return;
        choose(el);
      });
      parent.addEventListener('keydown', function(e){
        var el = e.target.closest ? e.target.closest(sel) : null;
        if(!el || list.indexOf(el) < 0) return;
        var i = list.indexOf(el), next = null;
        if(e.key === 'ArrowRight' || e.key === 'ArrowDown') next = list[(i + 1) % list.length];
        else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = list[(i - 1 + list.length) % list.length];
        else if(e.key === 'Home') next = list[0];
        else if(e.key === 'End') next = list[list.length - 1];
        else if(e.key === ' ' || e.key === 'Enter'){ e.preventDefault(); choose(el); return; }
        if(!next) return;
        e.preventDefault();
        choose(next);      /* a tab follows the arrow, the way a radio does */
        next.focus();
      });
    });
  });
}

/* A LINK THAT A KEYBOARD CAN REACH - step 7.30.
   `<a onclick="...">` with NO href. It looks like a link, it is pressed like a
   link, and it is invisible to a keyboard: an anchor without href takes no
   focus. Verified two ways on auth-code.html - .focus() called directly on each
   was refused, and 120 tab stops landed on the close button and every OTP cell
   without once reaching a link.

   Four of them are the login dialog's whole navigation: «← Змінити номер»,
   «Ввів неправильний код?», «Увійти іншим способом» and «Повернутися до
   магазину». Locked decision 5 sends coach, buyer and beginner through that one
   dialog, so this was the login flow having no keyboard path at all - the same
   defect 7.29 found in the checkout, in the screen before it.

   None of the four goes anywhere: three switch the dialog's step, the fourth
   closes it. So they are BUTTONS, and the fix says so - role="button" and a tab
   stop. An href="#" would have been the shorter fix and the wrong one: it
   announces a destination that does not exist and pushes a history entry on
   every press.

   The rule is written as a shape, not as a list of four, so an `<a onclick>`
   added later is reached the day it appears. */
function uivDeadLinks(){
  var dead = [].slice.call(document.querySelectorAll('a[onclick]:not([href])'));
  dead.forEach(function(a){
    if(a.getAttribute('role')) return;                 /* already done */
    a.setAttribute('role', 'button');
    a.setAttribute('tabindex', '0');
    a.addEventListener('keydown', function(e){
      if(e.key !== ' ' && e.key !== 'Enter') return;
      e.preventDefault();                              /* Space would scroll the page */
      a.click();
    });
  });
  return dead.length;
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
/* A MARK AT THE END OF A LABEL - step 7.5.

   Measured before this existed: 34 buttons ended in a typographic sign - 32 `→`
   and 2 `▾` - and NOT ONE of them used the icon set, while the only real trailing
   marks in the product were the 8 chevrons `menu.js` builds. Three drawings for
   two meanings.

   Why a character was not good enough, and this is the part that decided it:
   `→` is U+2192, so it is part of the LABEL, and a screen reader reads it out.
   «Усі товари →» is announced as «Усі товари, стрілка вправо» - a direction
   spoken as if it were a word. An `aria-hidden` svg is silent, which is what a
   decoration should be. The argument for keeping the character was that it grows
   with its label; but `1.15em` in button.css already does exactly that, so the
   character's one advantage was something the set had anyway.

   ADDRESSED BY THE CONTROL AND THE POSITION, not by a list of component names:
   any button whose label ENDS with a mapped sign, wherever it stands. The same
   correction the numeric-field guard got at step 7 - a rule that only reaches the
   places somebody remembered to name is the defect, not the fix. */
/* THE TWO MARK PASSES MOVED TO design/system/marks.js at step 7.11 - the stand
   loads that file too, and until it did, the showcase drew ✕ ♡ −/+ ▦ ☰ with the
   font while the shop drew them from the set. `uivChrome()` calls `uivMarks()`
   at its end. */

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
  /* PDP state pages carry two content glyphs of their own: the OOS «🔔 Повідомити»
     button and the coach-tier header (🎓). Scoped per element - no other body copy
     is ever touched by the icon swap. */
  document.querySelectorAll('.oosbtn, .coachbox .cbh').forEach(uivIcons);
  /* the Бонуси counter carries the honey jar, not a star (owner, step 6.8). The
     jar is already the store's own reward shape - the loyalty rung uses it, and
     it fills as lifetime spend grows. Here it stands EMPTY on purpose: a fill
     level means a tier, and the header is a way in, not a rank. */
  document.querySelectorAll('.wfh-act.numbtn[href*="loyalty"] .g').forEach(function(g){
    if(g.dataset.uivJar) return; g.dataset.uivJar = '1';
    var badge = g.querySelector('.hb');
    g.innerHTML = '<span class="uiv-ic">' + uivTierSvg(0) + '</span>';
    if(badge) g.appendChild(badge);
  });
  /* product-card fav heart (♡) → outline heart icon; grid uses .fav, list uses .lfav */
  document.querySelectorAll('.fav, .lfav').forEach(function(b){
    if(/[♡♥]/.test(b.textContent)) b.innerHTML = uivWrap('heart');
  });
  /* card rating "★ 4.8" → the same filled gold star as the PDP (one rating look) */
  document.querySelectorAll('.pcard .rate .st, .pcard-l .lmeta .st').forEach(function(el){
    uivStarify(el, 1);
  });
  /* THE LAST ★ DRAWN BY THE FONT - step 7.27. Counted in the browser across 40
     screens: 343 stars, 339 from the icon set and 4 from whatever face the
     machine happens to have - all four the checkout's bonus star. It was missed
     by every earlier pass for a reason each pass states about itself: marks.js
     walks CONTROLS, and this is a span inside a div; the three starify calls
     above and below name ratings, and a bonus is not a rating. It is the same
     glyph either way, so it takes the same drawing. */
  document.querySelectorAll('.co-accrual .star').forEach(function(el){
    if(/[★☆]/.test(el.textContent)) uivStarify(el, 1);
  });
  /* mega-menu "Вибір місяця" card → a real product photo. ui-visual only:
     greyscale keeps the «фото» placeholder in _nav.js untouched. */
  document.querySelectorAll('.ms-feat .ms-ph').forEach(function(ph){
    if(ph.dataset.uiv) return; ph.dataset.uiv = '1';
    ph.innerHTML = '<img src="visuals/product-whey.png" alt="Gold Standard 100% Whey">';
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
  /* the auth dialog is opened from the header of EVERY page, so the colour layer
     hooks it everywhere - not only on the auth reference renders */
  uivAuth();
  uivFav();
  uivPatchMenus();
  uivTiers();
  uivCurrency();
  /* LAST, so they see the buttons every pass above has finished building - the
     auth dialog's CTA and the menu triggers among them. Trailing first, because
     a control whose sign is its whole label is what is LEFT after that pass has
     taken every mark that closes a label. */
  uivMarks();
  /* step 7.78, and it has to be here rather than in the presentation block: it
     wraps `wfToast`, and it wraps it so that a toast fired ten minutes from now
     gets the pass that has already run. See the note above the function. */
  uivToastMarks();
  /* AFTER `uivMarks`, and on EVERY page - step 7.29. The first version of this
     call sat inside `uivPdp()`, which is the product page's own pass, so the
     checkout - the screen with 21 of the 38 radios and the only one you cannot
     finish without them - got nothing. Caught by pressing Tab in the browser:
     `[role=radiogroup] [role=radio][tabindex="0"]` did not exist there.
     After the marks, because a group's tab stop is decided from what is on the
     page, and until `uivMarks` has run some of those controls are still being
     rebuilt underneath. */
  uivRadioGroups();
  /* step 7.30, and it must run AFTER `uivAuth`: the login dialog rebuilds its
     whole innerHTML on every step, so the four links this reaches do not exist
     until that pass has hooked `wfAuthGo`. Same reason it is a shape and not a
     list - each step draws a new set of them. */
  uivDeadLinks();
  /* step 7.31, and on EVERY page for the same reason 7.29 learned the hard way:
     the shelf tabs are on the four home screens and the order filters are in the
     account, so a call sitting inside either screen's own pass would miss the
     other. `.ord-tabs` is injected by `wfAccountNav`, which runs before this. */
  uivSegments();
  /* step 7.32. The profile screen's switch is written into the page, not injected,
     so any pass would find it - but keying on the role means the call has to sit
     where every page runs, or a switch added to another screen later would be
     silently left out. Same reason 7.29 moved `uivRadioGroups` here. */
  uivSwitches();
  /* step 7.34, and it moved DOWN here from the presentation block above. It used
     to be a click behaviour and nothing else, so it could run anywhere; now it
     also decides who gets a tab stop, and that belongs with the other three
     passes that decide the same thing - which is the lesson 7.29 wrote down
     after the checkout got none. Both panels are static markup from the grey
     layer, so nothing above rebuilds them; the pass is idempotent either way. */
  uivCheckboxes();
  uivDisclosures();
  uivCrumbs();
  /* step 7.96 - A PASS RUNS WHERE THE THING IT PAINTS IS, NOT WHERE SOMEBODY
     REMEMBERED TO CALL IT. `uivAccount()` used to be a line in nine screens'
     init, and eleven screens carry `#acc-nav`: the eight buyer ones that call it
     and the three coach ones (`coach-home`, `coach-clients`, `coach-orders`)
     that call `uivFixLinks(); uivBar(); uivChrome();` and nothing else.
     Measured at 1280 before this line existed: the buyer's rail drew 8 marks of
     8, the coach's drew 2 of 7. The two that did draw were caught by
     `uivSignMark` - a different pass - because `▦` and `♡` happen to be in
     `UIV_SIGN_ONLY`; the other five sat in a 20px slot at `font-size: 0` holding
     a raw glyph and no svg. An empty box where a mark should be.

     ADDING THE CALL TO THREE MORE SCREENS WOULD BE THE SAME LIST ONE ENTRY
     LONGER, and the next coach screen with a rail would be wrong again - which
     is how this project has answered «which things get X» nine times running.
     A presence test cannot go stale: the pass asks whether the region is on the
     page, and the page answers. The nine screens that still name it in their
     own init are harmless - see the guard on `uivAccount` itself.

     LAST, and not with the other region walks at the top, because that is where
     the call already stood relative to `uivChrome`: the rating star, the fav
     heart and the tier jars must be real icons before the blanket emoji swap
     runs over the account panel, or it takes them. Moving the call kept its
     position in the order; it only stopped depending on being typed out. */
  uivAccount();
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

/* STEP 7.78 - THE TOAST IS THE ONE REGION NO PASS HAS EVER REACHED, and it is the
   same shape as `uivPatchMenus` above: a piece of interface built on demand, long
   after `uivMarks()` finished. The difference is that the overlay at least gets
   rebuilt by a named builder this file can see, while a toast is created by
   `wireframes/_nav.js:1213 wfToast()` at the moment somebody saves an address or
   fails a form.

   Measured on `cart.html`: every other close control on that screen - the drawer's
   ✕ and the dialog's - carries `.uiv-ic svg` from the set. The toast's carried the
   CHARACTER, from whatever face the machine happens to have. Running `uivMarks()`
   over the container by hand turned it into the set's mark, which is the whole
   proof that nothing was missing except the call.

   Wrapped rather than observed, for the same reason `uivPatchMenus` wraps: the
   builder is one named function, and a wrapper says «after this, mark it» in one
   line, where a MutationObserver would say it for anything that ever lands in that
   container. `uivMarks` is idempotent - it steps over a control that already holds
   a drawing - so a toast marked twice is a toast marked once.

   THE STATUS GLYPH IS NOT TOUCHED and that is deliberate. `✓ ! i` are not in
   `UIV_SIGN_ONLY`, and adding them is not a one-line change: the set has `check`
   and `alert`, and it has NO info mark. Two of three would leave the info toast
   the only one still typed, which is a worse state than three of three. Written
   down as a question, not answered by a sweep - the same discipline `marks.js`
   states for its own maps.

   STEP 7.96 GAVE THAT NOTE TEETH. `✓` now HAS a row in `UIV_SIGN_ONLY` - it had
   to, because the tick is the whole label of ten boxes on the coach and review
   screens and `icons.js` has drawn `check` since 7.11 - and `.tt-ic` is a leaf
   box, so the widened address in `marks.js` reaches it. Without the line below
   the ok toast would quietly start drawing from the set while the error and info
   toasts kept their `!` and `i`, which is the exact state the paragraph above
   argued against, arrived at as a side effect rather than as a decision.
   `data-uiv-keep` is how a box declines a mark. It has ONE user, it is this one,
   and the day `icons.js` gains an `info` glyph the honest fix is to map all
   three and delete this line - not to widen it. */
function uivToastMarks(){
  var fn = window.wfToast;
  if(typeof fn !== 'function' || fn.__uiv) return;
  window.wfToast = function(){
    var r = fn.apply(this, arguments);
    var wrap = document.getElementById('wf-toast');
    var t = wrap && wrap.lastElementChild;
    if(!t) return r;
    var st = t.querySelector('.tt-ic');
    if(st) st.setAttribute('data-uiv-keep', '');
    if(typeof uivMarks === 'function') uivMarks(t);
    return r;
  };
  window.wfToast.__uiv = 1;
}

/* make the filter checkboxes interactive: a click on a .fopt row toggles its .cb
   square (rail + mobile sheet; delegated so it also covers any re-rendered rows).

   STEP 7.34 - AND HALF OF THE CONTRACT WAS MISSING, WHICH IS WORSE THAN NONE.
   This function already wrote `aria-checked`. It never wrote a ROLE, and
   `aria-checked` on an element with no role is inert - the browser drops it, and
   a screen reader is told nothing at all. Read out of the accessibility tree
   rather than argued about: one filter option came back

       { role: "LabelText", name: "", checked: undefined }

   A piece of label text. Not a checkbox, no name, no state. And it was written
   only ON A CLICK, so of the 34 options that render already checked, not one
   announced it until somebody pressed something.

   Counted in the browser across 39 coloured screens at 390 and 1280: 700 `.fopt`
   plus 2 `.optin`, 0 with a role, 0 with `aria-checked` at load, 0 with a tab
   stop. The rail on `listing.html` renders 25 options and holds 11 tabbable
   elements: six chips, four number fields and «+ ще 11». None of the 25.

   THE SHAPE, NOT A LIST: a `<label>` that owns a `.cb` and no real control. The
   day one of these gets a real `<input>` it needs nothing from here and this
   pass steps over it.

   SPACE, AND NOT ENTER. A checkbox answers Space; Enter belongs to the primary
   action, and in the mobile sheet that action is «Застосувати». The switch took
   both at 7.32 because there is nothing else on that row to take Enter. Same
   file, two bindings, and the difference is what the control stands next to.

   NO ROVING TABINDEX, and this is where the family parts from the radio next
   door. `uivRadioGroups` gives a group ONE stop because a radio group is one
   value. Twenty-five filters are twenty-five independent answers, so each takes
   its own stop - the rail goes from 11 to 46. That is the cost of the panel
   being what it is, not a defect to tune away. */
function uivCheckboxes(){
  var mark = function(lbl){
    var cb = lbl.querySelector('.cb');
    if(cb) lbl.setAttribute('aria-checked', cb.classList.contains('on') ? 'true' : 'false');
  };
  [].slice.call(document.querySelectorAll('label.fopt, label.optin')).forEach(function(lbl){
    if(lbl.querySelector('input, select, textarea')) return;   /* a real control needs none of this */
    if(!lbl.querySelector('.cb')) return;
    if(!lbl.getAttribute('role')) lbl.setAttribute('role', 'checkbox');
    if(!lbl.hasAttribute('tabindex')) lbl.setAttribute('tabindex', '0');
    /* step 7.72 - THE NAME WAS A RUN-ON. `architecture.md` E: «the accessible
       name carries a count - "В наявності 71" reads as one string». Measured on
       `listing-filtered.html`: the row's name came out exactly that, because
       `wireframes/_nav.js:1791` builds `<label class="fopt"><span class="cb">
       </span> LABEL <span class="ct">N</span></label>` and a label's name is its
       whole text. Announced, that is «в наявності сімдесят один», which sounds
       like a value and not like a tally.
       Fixed with a COMMA and nothing else. The count is hidden from the name and
       put back into an explicit label built from the same two visible strings -
       no new word is invented here, because interface wording belongs to
       `voice/docs/microcopy.md` and not to a behaviour file. A version that says
       «71 товар» would read better and needs a plural rule (71 товар, 13
       товарів) and therefore a decision from voice; this one loses nothing and
       waits for it. */
    var ct = lbl.querySelector('.ct');
    if(ct && !lbl.hasAttribute('aria-label')){
      var count = ct.textContent.trim();
      var words = lbl.textContent.replace(count, '').replace(/\s+/g, ' ').trim();
      if(words && count){
        ct.setAttribute('aria-hidden', 'true');
        lbl.setAttribute('aria-label', words + ', ' + count);
      }
    }
    mark(lbl);                                                 /* AT LOAD, not on the first click */
  });
  if(document.body.dataset.uivCb) return;
  document.body.dataset.uivCb = '1';
  document.addEventListener('click', function(e){
    /* filter facets AND the auth opt-in - one checkbox, one behaviour */
    var lbl = e.target.closest ? e.target.closest('.fopt, .optin') : null;
    if(!lbl) return;
    var cb = lbl.querySelector('.cb');
    if(!cb) return;
    e.preventDefault();
    cb.classList.toggle('on');
    mark(lbl);
  });
  document.addEventListener('keydown', function(e){
    if(e.key !== ' ' && e.key !== 'Spacebar') return;
    var lbl = e.target && e.target.closest ? e.target.closest('.fopt, .optin') : null;
    if(!lbl || !lbl.querySelector('.cb')) return;
    e.preventDefault();          /* or the page scrolls out from under the panel */
    lbl.click();
  });
}

/* step 7.34 - THE GROUP HEADER IS A DISCLOSURE AND SAID SO TO NOBODY.

   Ten `.fh` per panel, `cursor: pointer`, and a click really does collapse the
   group: `wireframes/_nav.js` toggles `.collapsed` and `filter-group.css` hides
   the body with `display: none`. So the behaviour is complete and the promise is
   missing - a `<div>` with no role, no tab stop and no `aria-expanded`.

   The grey layer already knows this move: `toggleCab()` and `toggleLang()` in the
   same file both write `aria-expanded` on their triggers. Two of three disclosures
   in the product were told; the filter header was not.

   THE CLASS IS TOGGLED BY THE GREY LAYER, SO THIS ONLY READS IT BACK. That file
   loads first, so its listener runs first, and by the time this one fires the
   class is already what it is going to be. Nothing here toggles anything: two
   editions of one collapse is exactly the defect this stage keeps removing.

   Enter AND Space, unlike the checkbox above: a disclosure is a button, and a
   button takes both. `display: none` on the collapsed body is what keeps its
   options out of the tab order while the group is shut - checked, not assumed. */
var UIV_FH_SEQ = 0;
function uivDisclosures(){
  [].slice.call(document.querySelectorAll('.fgroup > .fh')).forEach(function(fh){
    var grp = fh.parentElement;
    if(!fh.getAttribute('role')) fh.setAttribute('role', 'button');
    if(!fh.hasAttribute('tabindex')) fh.setAttribute('tabindex', '0');
    fh.setAttribute('aria-expanded', grp.classList.contains('collapsed') ? 'false' : 'true');
    /* the group takes its name from the words already in the header - no string
       is invented here, and interface strings belong to voice either way */
    if(!grp.getAttribute('role')){
      if(!fh.id) fh.id = 'uiv-fh-' + (++UIV_FH_SEQ);
      grp.setAttribute('role', 'group');
      grp.setAttribute('aria-labelledby', fh.id);
    }
  });
  if(document.body.dataset.uivDisc) return;
  document.body.dataset.uivDisc = '1';
  document.addEventListener('click', function(e){
    var fh = e.target.closest ? e.target.closest('.fgroup > .fh') : null;
    if(!fh) return;
    fh.setAttribute('aria-expanded',
      fh.parentElement.classList.contains('collapsed') ? 'false' : 'true');
  });
  document.addEventListener('keydown', function(e){
    if(e.key !== ' ' && e.key !== 'Spacebar' && e.key !== 'Enter') return;
    var fh = e.target && e.target.closest ? e.target.closest('.fgroup > .fh') : null;
    if(!fh) return;
    e.preventDefault();
    fh.click();
  });
}

/* BREADCRUMBS: two things the markup cannot say - step 7.39.
   The trail is `<nav class="crumb"><a>Головна</a><span class="sep"></span>
   <a>Кабінет</a><span class="sep"></span><span class="cur">Адреси</span></nav>`,
   built by the frozen grey layer, so neither can be added by hand.

   1. THE LAST CRUMB IS A `<span>`. It looks like the end of the line and reads
      like one more word: nothing told a screen reader which of the three is the
      page a person is standing on. `aria-current="page"` is the one attribute
      that says it, and it is what the account rail already uses on its own
      current link.

   2. THE SEPARATOR WAS BEING READ ALOUD. «Головна слеш Кабінет слеш Адреси».
      The slash is punctuation drawn by CSS now (breadcrumb.css), and
      `aria-hidden` is what keeps a decoration out of the reading.

   3. AND THE SLASH CAME BACK DOUBLE - step 7.99, owner: «какой двойной слеш в
      кабинете тренера везде». Step 7.39 moved the glyph into CSS
      (`.sep::before{ content: '/' }`) and swept the 47 typed slashes out of the
      coloured markup THAT EXISTED THAT DAY. The grey layer kept its own 211,
      frozen since stage 05 - which is right, and which is also the whole
      problem: the eight coloured coach screens arrived at 7.95 as clones of that
      frozen layer, brought the typed `<span class="sep">/</span>` with them, and
      the CSS added the second one. Measured at 390: 13 of them, on all seven
      coach pages that carry a trail.
      A sweep of those seven files would read as a fix and would not be one - the
      next screen cloned from the grey layer arrives with the same slash, and it
      is the same shape as the nine times this project answered «which things get
      X» with a hand-written list. So the rule is stated once, here, where the
      colour layer already reconciles itself with what the frozen markup says:
      the separator's glyph comes from CSS, so whatever character the markup put
      inside the box is a second edition of it and goes. The box stays - it is
      what carries the ::before and the 8px on each side.

   Idempotent, and it runs after any pass that rebuilds a page's chrome. */
function uivCrumbs(){
  [].slice.call(document.querySelectorAll('.crumb')).forEach(function(nav){
    var cur = nav.querySelector('.cur');
    if(cur && !cur.hasAttribute('aria-current')) cur.setAttribute('aria-current', 'page');
    [].slice.call(nav.querySelectorAll('.sep')).forEach(function(sep){
      if(!sep.hasAttribute('aria-hidden')) sep.setAttribute('aria-hidden', 'true');
      if(sep.textContent !== '') sep.textContent = '';
    });
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
    var mkNum = function(old){ var i = document.createElement('input'); i.type = 'number'; i.className = 'field field--s field--mono in uiv-num'; i.min = MIN; i.max = MAX; i.step = STEP; if(old) old.parentNode.replaceChild(i, old); return i; };
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
  img.src = 'concept/assets/mascot-pose-present.png';
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
var UIV_PDP_SHOT = 'visuals/product-whey.png';
/* the 4 gallery views: same render, different framing (one product, one shot) */
var UIV_PDP_VIEWS = [
  { s: 1,    p: 'center 50%' },   /* уся банка */
  { s: 1.55, p: 'center 22%' },   /* кришка й горло */
  { s: 1.75, p: 'center 60%' },   /* етикетка зблизька */
  { s: 1.3,  p: 'center 86%' }    /* низ банки */
];
/* description blocks: formula · dosage · mixing · storage → the renders we have */
var UIV_PDP_DESC = [
  'visuals/product-whey.png',
  'visuals/product-creatine.png',
  'visuals/product-preworkout.png',
  'concept/assets/mascot-pose-product.png'
];

/* the section tabs: pinned to the header's real bottom edge, and flagged .stuck the
   moment they get there (that is when the shelf, its shadow and the price + buy
   button appear - see .pdp-tabs in kit/kit.css) */
function uivPdpTabs(){
  var tabs = document.querySelector('.pdp-tabs');
  var header = document.getElementById('wf-header');
  if(!tabs || !header || tabs.dataset.uivStick) return;
  tabs.dataset.uivStick = '1';
  var tick = function(){
    var top = Math.round(header.getBoundingClientRect().bottom);
    if(top < 0) top = 0;
    tabs.style.top = top + 'px';
    /* the shelf background is a FIXED pseudo-element (see kit/kit.css), so it needs
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
  /* the reviews-recovery state (3.0 · reviews) is a PDP page with no gallery and no buy
     box at all - the polish below (stars, trust icons, certificate seal, ₴) still has to
     run there, so the whole page is the fallback root and the gallery steps are guarded */
  var root = pdp || document.querySelector('main.wf-page');
  if(!root || root.dataset.uiv) return;
  root.dataset.uiv = '1';
  uivPdpTabs();

  /* gallery: real photo in the main frame, thumbs = crops of the same shot */
  var main = pdp && pdp.querySelector('.gmain');
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
      /* step 7.72 - IT SAID «BUTTON» TO A KEYBOARD THAT COULD NEVER REACH IT.
         `architecture.md` E: «gallery thumbnails cannot be reached from a
         keyboard - `_nav.js` gives them `role="button"` and an `aria-label` and
         no `tabindex`». Measured before the fix on the three product screens:
         12 thumbnails, 12 with the role, 12 with a label, 0 with a tab stop and
         0 with a key handler. A role is a promise about what a control does, and
         this one had been announcing a button nobody could press.
         (The four on `product-loading.html` are `.skpulse` skeletons and this
         block never touches them - a placeholder must not be focusable, and
         that is why they carry no role either.)
         `tabindex="0"` on each rather than the roving pattern `uivSegments`
         uses: those are TABS over one panel, where arrow keys are the promise;
         these declare themselves buttons, and four buttons in a row are four
         tab stops. Changing the role to `tab` would read better and is a
         behaviour decision, not a repair. */
      t.setAttribute('tabindex', '0');
      var press = function(){
        thumbs.forEach(function(x){ x.classList.remove('on'); });
        t.classList.add('on');
        img.style.transform = 'scale(' + v.s + ')';
        img.style.objectPosition = v.p;
      };
      t.addEventListener('click', press);
      t.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){ e.preventDefault(); press(); }
      });
    });
  }

  /* variant groups: the label carries the CHOSEN value («Смак: Подвійний шоколад»),
     so the current pick is readable without scanning the pills - and picking another
     one actually switches, label included. Sold-out options stay unpickable. */
  root.querySelectorAll('.vgroup').forEach(function(g){
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
  var wish = root.querySelector('.wish');
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
  /* the five-button picker: the one rating you PRESS, and the only star that was
     still coming out as an outline - step 7.27. marks.js swaps a sign that is a
     whole control, and its finish is the outline, correctly: the same ★ is also
     «Знижки та бонуси» in the account nav, and icons.js says «outline for a nav
     chip, filled for a rating». Only the context knows which, so the rating says
     so here, beside the three swaps above.
     NOT `uivStarify`: that wraps the mark in `.uiv-star`, which paints gold, and
     four of these five must stay `--mark-inactive` until they are chosen. Only
     the drawing changes; the colour is the picker's own state. */
  document.querySelectorAll('.pm-stars .pmst').forEach(function(b){
    b.innerHTML = '<span class="uiv-ic">' + uivStarSvg() + '</span>';
  });

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
    bear.src = 'concept/assets/mascot-pose-present.png';
    bear.alt = '';
    bwrap.appendChild(bear);
    band.appendChild(bwrap);
  }

  /* «фото складу на упаковці»: the pack render + an honest caption (see kit/kit.css) */
  var onpack = document.querySelector('.onpack');
  if(onpack) onpack.textContent = 'фото складу на упаковці';

  /* certificate tile → a document with a verified seal (the label stays the link) */
  var cert = document.querySelector('.certthumb');
  if(cert && !cert.querySelector('.uiv-seal')){
    var seal = document.createElement('span');
    seal.className = 'uiv-seal';
    seal.innerHTML = uivIconSvg('shield');
    cert.appendChild(seal);
  }

  /* description: product imagery instead of dashed «зображення» boxes.
     7.76: this used to set five inline properties. Four of them were the box's
     LOOK - the border style, the background position, the repeat and the 84%
     size - and a look written from a script is invisible to the stylesheet that
     claims to own it. All four moved to `desc-block.css` unchanged. What is left
     is the one thing a script is the right place for: which photograph. */
  document.querySelectorAll('.pdesc .pd-img').forEach(function(box, i){
    box.style.backgroundImage = 'url(' + UIV_PDP_DESC[i % UIV_PDP_DESC.length] + ')';
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
  uivCurrency(root);
  uivCurrency(document.querySelector('.mbuybar'));
  uivCurrency(document.querySelector('.pdp-tabs'));
}

/* ============================================================
   AUTH DIALOG (node 1.x) - colour layer of the SHARED wfAuth() component.
   The dialog itself is built once in ../wireframes/_nav.js and is re-rendered
   from scratch on every step (wfAuthGo replaces the overlay's innerHTML), so a
   one-shot paint would survive exactly one click. uivAuth() therefore WRAPS the
   step function: _nav.js keeps owning the states, the colour layer just repaints
   after each of them. Nothing here changes structure or copy.
   ============================================================ */
var UIV_AUTH_ICON = { phone: 'user', loading: 'clock', code: 'chat', error: 'alert', newuser: 'check' };
/* Google and Apple are BRAND marks and live with the other brand marks in
   design/system/icons.js. The stand keeps only the constants the auth dialog reads. */
var UIV_GOOGLE = uivBrandSvg('google');
var UIV_APPLE = uivBrandSvg('apple');
function uivAuthPaint(state){
  var ov = document.getElementById('wf-auth');
  if(!ov) return;
  var st = state || ov.dataset.state || 'phone';
  var key = UIV_AUTH_ICON[st] || 'user';
  /* the state glyph, twice: the brand panel (desktop) and the mobile banner */
  var vi = ov.querySelector('.auth-visual .vi'); if(vi) vi.innerHTML = uivWrap(key);
  var bi = ov.querySelector('.auth-banner .bi'); if(bi) bi.innerHTML = uivWrap(key);
  /* the brand panel is a full-bleed photograph (see kit/kit.css §AUTH) - the mascot is
     IN the picture, so nothing is injected into the panel any more. */
  /* the two lone content glyphs of the dialog: the code-lifetime note and the
     inline error mark. Scoped per element - no other copy is touched. */
  var note = ov.querySelector('.auth-note');
  if(note && /🔒/.test(note.textContent)){
    note.innerHTML = uivWrap('lock') + note.innerHTML.replace('🔒', '');
  }
  var errm = ov.querySelector('.otp-err .m');
  if(errm) errm.innerHTML = uivWrap('alert');
  /* the secondary methods get their real marks. Keyed on the BUTTON'S LABEL, never on
     the glyph inside the chip: after the first paint that glyph is already an <svg> and
     an empty textContent used to match the Apple branch, so E-mail inherited the apple. */
  ov.querySelectorAll('.sbtn').forEach(function(b){
    var ic = b.querySelector('.ic');
    if(!ic || ic.dataset.uiv) return;
    ic.dataset.uiv = '1';
    var t = b.textContent || '';
    if(/Google/i.test(t)) ic.innerHTML = '<span class="uiv-brand">' + UIV_GOOGLE + '</span>';
    else if(/Apple/i.test(t)) ic.innerHTML = '<span class="uiv-brand uiv-apple">' + UIV_APPLE + '</span>';
    else if(/e-?mail/i.test(t)) ic.innerHTML = uivWrap('mail');
  });
  /* step 7.30: every step of this dialog replaces its own innerHTML, so the
     links that carry its navigation are new elements each time and the pass in
     `uivChrome` only ever saw the first step's. Reached here, on every repaint. */
  if(typeof uivDeadLinks === 'function') uivDeadLinks();
  /* step 7.96, AND IT IS THE SENTENCE ABOVE WORD FOR WORD - which is how it went
     unnoticed for six steps. 7.30 wrote «every step replaces its own innerHTML»
     about the links and fixed the links; the MARKS pass has exactly the same
     problem and was not brought along. Measured on `account-addresses.html`:
     at load the dialog's «Закрити» draws `close` from the set, and after one
     `wfAuthGo('code')` the same button holds a typed ✕ again - a control that is
     right until somebody uses it. Locked decision 5 sends the coach, the buyer
     and the beginner through this one dialog, so that is every role and every
     step but the first. `uivMarks` is idempotent, so repainting a step that is
     already marked costs a walk and changes nothing. */
  if(typeof uivMarks === 'function') uivMarks(ov);
}
function uivAuth(){
  if(!window.__uivAuth && typeof window.wfAuthGo === 'function'){
    window.__uivAuth = 1;
    var step = window.wfAuthGo;
    window.wfAuthGo = function(s){ step(s); uivAuthPaint(s); };
  }
  uivAuthPaint();
}

/* ============================================================
   CART DRAWER (node 6.0) - colour layer of the quick view. Structure, states and
   the qty/remove behaviour stay in the grey layer (_wf.css §CART DRAWER, wfCart in
   ../wireframes/_nav.js); this only swaps the placeholder glyphs for the icon set
   and keeps the ₴ sized after a recalculation rewrites a figure.
   ============================================================ */
function uivCart(){
  var drawer = document.querySelector('.cart-drawer');
  if(!drawer || drawer.dataset.uiv) return;
  drawer.dataset.uiv = '1';
  /* the two line actions + the OOS notify link: icon, then the label */
  drawer.querySelectorAll('.ci-lnk').forEach(function(l){
    var t = (l.textContent || '').trim();
    var key = /обране/.test(t) ? 'heart' : (/Видалити/.test(t) ? 'trash' : (/Повідом/.test(t) ? 'bell' : ''));
    if(!key) return;
    /* strip the leading glyph by CODE POINT, not by a character class: 🗑 is a
       surrogate pair and [🗑] would eat only half of it, leaving a stray mark */
    l.innerHTML = uivWrap(key) + '<span>' + t.replace(/^[^\p{L}\p{N}]+/u, '') + '</span>';
  });
  /* empty cart: the mascot answers, exactly as it does on an empty listing */
  var ei = drawer.querySelector('.cd-empty .ei');
  if(ei && /🛒/.test(ei.textContent)){
    ei.innerHTML = '<img src="visuals/mascot-face-reassure.png" alt="">';
  }
  /* the unavailable-line note gets the caution triangle, not the error glyph */
  var note = drawer.querySelector('.cd-oosnote');
  if(note && !note.querySelector('.uiv-ic')){
    var s = document.createElement('span');
    s.innerHTML = uivWrap('alert');
    if(s.firstChild) note.insertBefore(s.firstChild, note.firstChild);
  }
  /* every figure the stepper rewrites loses its ₴ span, so re-size after each pass */
  if(!window.__uivCartSum && typeof window.wfCartRecalc === 'function'){
    window.__uivCartSum = 1;
    var recalc = window.wfCartRecalc;
    window.wfCartRecalc = function(d){ recalc(d); uivCurrency(d || drawer); };
  }
  uivCurrency(drawer);
}

/* ============================================================
   CHECKOUT (node 6.1) - colour layer. Structure, states and the whole money
   arithmetic stay in the grey layer (_wf.css §CHECKOUT, wfCheckout in _nav.js);
   this swaps placeholder glyphs for the icon set and keeps the ₴ sized after a
   recalculation (or an upsell add) rewrites a figure.
   ============================================================ */
function uivCheckoutPaint(root){
  /* line actions + any line added by the upsell after the first pass */
  root.querySelectorAll('.li-acts button').forEach(function(b){
    if(b.dataset.uiv) return;
    b.dataset.uiv = '1';
    var t = (b.textContent || '').trim();
    var key = /обране/.test(t) ? 'heart' : (/Видалити/.test(t) ? 'trash' : '');
    if(!key) return;
    b.innerHTML = uivWrap(key) + '<span>' + t.replace(/^[^\p{L}\p{N}]+/u, '') + '</span>';
  });
  /* an add-on already in the order: the cart glyph becomes a confirmation mark */
  root.querySelectorAll('.co-upsell .cartbtn.done').forEach(function(b){
    if(b.dataset.uivDone) return;
    b.dataset.uivDone = '1';
    b.innerHTML = uivWrap('check');
  });
  uivCurrency(root);
}
function uivCheckout(){
  var root = document.querySelector('.co-wrap');
  var proc = document.querySelector('.co-proc, .co-err');
  /* the two lone glyphs of the terminal states: the lock note and the declined mark */
  [document.querySelector('.co-proc-note'), document.querySelector('.co-trust')].forEach(function(el){
    if(el && /🔒/.test(el.textContent)) el.innerHTML = uivWrap('lock') + el.innerHTML.replace('🔒', '');
  });
  var mark = document.querySelector('.co-err-mark');
  if(mark && !mark.querySelector('.uiv-ic')) mark.innerHTML = uivWrap('alert');
  if(proc) uivCurrency(proc);
  if(!root || root.dataset.uiv) return;
  root.dataset.uiv = '1';
  /* the section header cart glyph, the city pin, and the «no saved address» note */
  root.querySelectorAll('.co-sec-h, .co-city, .co-saved').forEach(uivIcons);
  var noaddr = root.querySelector('.co-noaddr');
  if(noaddr && !noaddr.querySelector('.uiv-ic')){
    var s = document.createElement('span');
    s.innerHTML = uivWrap('alert');
    if(s.firstChild) noaddr.insertBefore(s.firstChild, noaddr.firstChild);
  }
  /* sign-in methods get their real brand marks, keyed on the LABEL (see uivAuthPaint) */
  root.querySelectorAll('.co-soc').forEach(function(b){
    if(b.dataset.uiv) return;
    b.dataset.uiv = '1';
    var t = b.textContent || '', mk = '';
    if(/Google/i.test(t)) mk = '<span class="uiv-brand">' + UIV_GOOGLE + '</span>';
    else if(/Apple/i.test(t)) mk = '<span class="uiv-brand uiv-apple">' + UIV_APPLE + '</span>';
    else if(/e-?mail/i.test(t)) mk = uivWrap('mail');
    if(mk) b.innerHTML = mk + '<span>' + t.trim() + '</span>';
  });
  /* every figure the money column rewrites loses its ₴ span - repaint after each pass */
  if(!window.__uivCo && typeof window.wfCheckoutRecalc === 'function'){
    window.__uivCo = 1;
    var recalc = window.wfCheckoutRecalc;
    window.wfCheckoutRecalc = function(r){ recalc(r); uivCheckoutPaint(r || root); };
  }
  uivCheckoutPaint(root);
}

/* ============================================================
   HOME (node 0.0) - colour layer. The grey layer owns the blocks, the copy and the
   role states; this only fills the placeholders the wireframe left as grey squares:
   a goal icon in every tile, an icon on every trust fact, the rail's category marks,
   and the cart-shelf glyph. Goal icons are read from WF_GOAL_MENU, so the tiles can
   never disagree with the mega-menu about which icon a goal has.
   ============================================================ */
function uivHome(){
  var page = document.querySelector('.wf-page');
  if(!page || !page.querySelector('.goaltiles') || page.dataset.uivHome) return;
  page.dataset.uivHome = '1';

  /* category rail + its flyout (built by wfHomeRail before this runs) */
  ['home-rail', 'home-fly'].forEach(function(id){ uivIcons(document.getElementById(id)); });

  /* goal tiles: the empty .gph square becomes the goal's own icon */
  var goals = (typeof WF_GOAL_MENU !== 'undefined') ? WF_GOAL_MENU : [];
  page.querySelectorAll('.gtile').forEach(function(t){
    var ph = t.querySelector('.gph'), lbl = t.querySelector('.gt');
    if(!ph || !lbl || ph.firstChild) return;
    var name = lbl.textContent.trim();
    var g = goals.filter(function(x){ return x.name === name; })[0];
    var key = g ? UIV_EMOJI[g.ic] : null;
    if(key) ph.innerHTML = uivWrap(key);
  });

  /* the reviews banner keeps the same gold star as every other rating in the product */
  var rb = page.querySelector('.tbanners .tbn:nth-child(5) .tbx b');
  if(rb && /[★☆]/.test(rb.textContent)) uivStarify(rb, 1);

  /* cart shelf (return path): the trolley glyph → the icon set */
  var ci = page.querySelector('.cshelf .cs-ico');
  if(ci && /🛒/.test(ci.textContent)) ci.innerHTML = uivWrap('cart');

  /* step 7.31: the shelf tabs used to be wired here, five lines that moved `.on`
     on a click. They now go through `uivSegments()`, which does the same and adds
     the keyboard - and, more to the point, reaches `.ord-tab` as well, which is
     the same rung of the same control and had neither. */

  uivCurrency(page);
}

/* ============================================================
   ACCOUNT (node 7.x). Thin on purpose: the shell, the cards and every state
   already live in _wf.css, so the colour layer only has to reach the two regions
   that carry glyphs - the section nav (injected by wfAccountNav or wfCoachNav,
   so uivChrome's fixed id list never sees it) and the content panel. It runs at
   the END of uivChrome, so the rating star, the fav heart and the tier jars are
   already real icons by then and the blanket swap can no longer take them.

   CALLED BY PRESENCE, NOT BY A LIST - step 7.96. The reason is written out at
   the call site in uivChrome(); the guard below is the other half of it. Nine
   screens still say `uivChrome(); uivAccount();` in their own init, which is now
   one call too many rather than one call short, so the pass has to be free the
   second time. It was already idempotent in effect - `uivIcons` finds no emoji
   left to swap and `uivTiers` finds no tier glyph - but «in effect» is a thing
   that stops being true quietly, so it is stated.
   ============================================================ */
function uivAccount(){
  var slots = document.querySelectorAll('#acc-nav, .acc-main');
  if(!slots.length || document.body.dataset.uivAcc) return;
  document.body.dataset.uivAcc = '1';
  slots.forEach(uivIcons);
  /* tier marks inside the freshly-iconed nav chip (uivChrome ran before it existed) */
  uivTiers(document.getElementById('acc-nav'));
  /* 7.6: emptying the wishlist builds its empty box AFTER this pass, and the theme hides
     the raw glyph (.emptybox .ei is font-size:0, the mark is an injected icon) - so paint
     the box the grey layer just made, the same wrap trick as wfCartRecalc. */
  if(!window.__uivWl && typeof window.wfWishlistEmpty === 'function'){
    window.__uivWl = 1;
    var mkEmpty = window.wfWishlistEmpty;
    window.wfWishlistEmpty = function(grid){
      mkEmpty(grid);
      var box = document.querySelector('.acc-main .emptybox');
      if(box) uivIcons(box);
    };
  }
}

/* The loyalty jar lives in design/system/icons.js with the rest of the set - it is
   a product glyph with four states, not a stand decoration. Here it only gets its
   wrapper: the class carries the metal, the svg carries the drawing. */
function uivTier(level){
  var lv = uivTierLevel(level);
  return '<span class="uiv-ic uiv-tier t' + lv + '">' + uivTierSvg(lv) + '</span>';
}
var UIV_TIER_EMOJI = { '\u{1FAD9}': 0, '🥉': 1, '🥈': 2, '🥇': 3 };
var UIV_TIER_RE = /(\u{1FAD9}|🥉|🥈|🥇)/u;
/* the tier mark appears in body copy, not only in the chrome (personal strip, account,
   the checkout discount row), so this walks the page the way uivCurrency does */
function uivTiers(root){
  var scope = root || document.body;
  if(!scope) return;
  var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null);
  var hits = [], n;
  while((n = walker.nextNode())){
    if(!UIV_TIER_RE.test(n.nodeValue)) continue;
    if(n.parentElement && n.parentElement.closest('.uiv-side, .uiv-topbar')) continue;
    hits.push(n);
  }
  hits.forEach(function(tn){
    var frag = document.createDocumentFragment();
    tn.nodeValue.split(UIV_TIER_RE).forEach(function(part){
      if(!part) return;
      /* 7.48: this was `if(UIV_TIER_EMOJI[part])`, and the base tier maps to 0,
         which is falsy. So three tiers out of four became the system icon and the
         fourth stayed a raw emoji - on `account-empty.html`, the screen a buyer
         sees before their first order. `in` asks the question the code meant to
         ask: is this emoji in the table, not is its level non-zero. */
      if(part in UIV_TIER_EMOJI){
        var w = document.createElement('span');
        w.innerHTML = uivTier(UIV_TIER_EMOJI[part]);
        if(w.firstChild) frag.appendChild(w.firstChild);
      } else frag.appendChild(document.createTextNode(part));
    });
    tn.parentNode.replaceChild(frag, tn);
  });
}

/* the sort control - step 7.2. It used to be built here by hand: a list of
   buttons, a click listener, and nothing else - no keyboard, no Escape, no
   focus return, no roles. And on a phone the «Популярні» button of the mobile
   toolbar opened NOTHING, so sorting at 360 was impossible.

   Both triggers now hand the work to the menu atom, which is the same atom the
   coach's client picker uses. The list, the roles and the keyboard live in
   design/system/menu.js; this function only says what the options are and what
   happens when one is chosen. */
var UIV_SORTS = ['Популярні', 'Спочатку дешевші', 'Спочатку дорожчі', 'Новинки', 'За рейтингом', 'Зі знижкою'];
function uivSort(){
  if(typeof uivMenu !== 'function') return;
  var trigs = [].slice.call(document.querySelectorAll('.ltool .ctrl, .mtoolbar .mc'))
    .filter(function(t){ return t.querySelector('.menu-val'); });
  trigs.forEach(function(trig, k){
    var cur = trig.querySelector('.menu-val').textContent.trim();
    var items = UIV_SORTS.map(function(v){
      return { value: v, label: v, selected: v === cur };
    });
    uivMenu(trig, items, {
      label: 'Сортування',
      /* the desktop control sits at the right end of its row, so its list opens
         to the left edge of the trigger and cannot run off the page */
      right: trig.classList.contains('ctrl'),
      onPick: function(v){
        /* every sort trigger on the screen shows the same answer - the desktop
           one and the mobile one are one control in two frames */
        [].slice.call(document.querySelectorAll('.menu-val')).forEach(function(el){
          if(el.closest('.ltool, .mtoolbar')) el.textContent = v;
        });
        [].slice.call(document.querySelectorAll('.ltool .ctrl, .mtoolbar .mc')).forEach(function(t){
          var host = t.closest('.menu');
          if(!host) return;
          [].slice.call(host.querySelectorAll('.menu-opt')).forEach(function(o){
            o.setAttribute('aria-selected', o.dataset.v === v ? 'true' : 'false');
          });
        });
      }
    });
  });
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
   bars). Top button → усі екрани (overview.html); below, the current flow
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

  /* the rail lists EVERY screen already colored here (derived from DESIGN_NAV, so it can
     never drift from the real set), grouped by flow. The screen you are on expands
     into its states; the others stay one link each, so jumping листинг → картка
     товару never goes through «Усі екрани». */
  var seen = {}, screens = [];
  DESIGN_NAV.forEach(function(file){
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
      var colored = DESIGN_NAV.indexOf(s.file) >= 0;
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
        '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</button>' +
    '<div class="uiv-sidescrim" onclick="uivCloseSide()"></div>' +
    '<aside class="uiv-side">' +
      '<div class="us-top">' +
        '<a class="us-all" href="overview.html">Усі екрани <span aria-hidden="true">→</span></a>' +
        '<div class="us-tagrow"><span class="uiv-tag">ui-visual</span>' +
          '<span class="us-cap">кольорова копія мови</span></div>' +
      '</div>' +
      '<nav class="us-nav">' + states + '</nav>' +
      '<div class="us-foot">' +
        '<a href="concept/concept.html">← Мова продукту (Концепт)</a>' +
        '<a href="../wireframes/' + cur + '">Сірий оригінал ↗</a>' +
      '</div>' +
    '</aside>';

  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  var frag = document.createDocumentFragment();
  while(tmp.firstChild) frag.appendChild(tmp.firstChild);
  document.body.appendChild(frag);
}
