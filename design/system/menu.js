/* ============================================================
   design/system/menu.js - the choice menu's behaviour, step 7.2.

   One control, two sources:

     uivMenuFromSelect(select)   the select stays in the DOM and stays the
                                 value; the menu writes back into it and fires
                                 `change`, so a form does not know the
                                 difference and a page with no JS still works.
     uivMenu(trigger, items)     a trigger that already exists in the markup
                                 (the sort control), given a list.

   WHAT A NATIVE SELECT GAVE US FOR FREE AND WHAT WE NOW OWE:

     open on Enter / Space / ArrowDown / ArrowUp
     move with ArrowUp / ArrowDown / Home / End
     jump by typing the first letters (type-ahead, 700ms window)
     choose with Enter / Space, cancel with Escape, close with Tab
     focus returns to the trigger on close, never to the top of the page
     aria-haspopup / aria-expanded on the trigger,
     role=listbox / role=option / aria-selected on the list

   None of that was in the hand-built sort menu this file replaces: it answered
   the mouse and nothing else.
   ============================================================ */

/* the mark comes from icons.js, the one place that owns a glyph. `data-glyph`
   is a convention of the stand pages, not of the system, so it is not used
   here - this file runs on the product. */
function uivMenuIc(key, cls){
  var svg = (typeof uivIconSvg === 'function') ? uivIconSvg(key) : '';
  return '<span class="' + cls + ' uiv-ic" aria-hidden="true">' + svg + '</span>';
}
function uivMenuTick(){ return uivMenuIc('check', 'menu-tick'); }

function uivMenuBuild(host, items, opts){
  opts = opts || {};
  var pop = document.createElement('div');
  pop.className = 'menu-pop';

  var list = document.createElement('div');
  list.className = 'menu-list';
  list.setAttribute('role', 'listbox');
  list.setAttribute('tabindex', '-1');
  if(opts.label) list.setAttribute('aria-label', opts.label);

  items.forEach(function(it, i){
    var o = document.createElement('div');
    o.className = 'menu-opt';
    o.setAttribute('role', 'option');
    o.setAttribute('tabindex', '-1');
    o.dataset.v = it.value;
    o.setAttribute('aria-selected', it.selected ? 'true' : 'false');
    o.innerHTML = '<span class="menu-lbl"></span>' + uivMenuTick();
    o.querySelector('.menu-lbl').textContent = it.label;
    list.appendChild(o);
  });
  pop.appendChild(list);

  if(opts.action){
    var sep = document.createElement('div');
    sep.className = 'menu-sep';
    pop.appendChild(sep);
    var act = document.createElement('button');
    act.type = 'button';
    act.className = 'menu-opt menu-act';
    act.textContent = opts.action.label;
    act.addEventListener('click', function(){
      uivMenuClose(host, true);
      opts.action.run();
    });
    pop.appendChild(act);
  }

  var scrim = document.createElement('div');
  scrim.className = 'menu-scrim';
  host.appendChild(scrim);
  host.appendChild(pop);
  return { pop: pop, list: list };
}

function uivMenuOpts(host){
  return [].slice.call(host.querySelectorAll('.menu-list .menu-opt'));
}

var UIV_MENU_SHEET = window.matchMedia ? window.matchMedia('(max-width: 479px)') : { matches: false };

function uivMenuOpen(host, which){
  var trig = host.querySelector('.menu-trig');
  /* only one menu at a time - two open lists are two answers to one question */
  [].slice.call(document.querySelectorAll('.menu.open')).forEach(function(m){
    if(m !== host) uivMenuClose(m, false);
  });
  host.classList.add('open');
  var pop = host._pop || host.querySelector('.menu-pop');
  var scrim = host._scrim || host.querySelector('.menu-scrim');
  host._pop = pop; host._scrim = scrim;
  /* below 480 the sheet leaves its trigger: the mobile toolbar is a stacking
     context (sticky, z 20), so inside it nothing can rise above the bottom tab
     bar and the sheet opened UNDERNEATH it */
  if(UIV_MENU_SHEET.matches){
    document.body.appendChild(scrim);
    document.body.appendChild(pop);
  }
  pop.classList.add('open');
  scrim.classList.add('open');
  trig.setAttribute('aria-expanded', 'true');
  var opts = uivMenuOpts(host);
  var sel = opts.filter(function(o){ return o.getAttribute('aria-selected') === 'true'; })[0];
  var go = which === 'last' ? opts[opts.length - 1] : (sel || opts[0]);
  if(go) go.focus();
}

function uivMenuClose(host, refocus){
  if(!host.classList.contains('open')) return;
  host.classList.remove('open');
  var pop = host._pop, scrim = host._scrim;
  if(pop){ pop.classList.remove('open'); host.appendChild(pop); }
  if(scrim){ scrim.classList.remove('open'); host.appendChild(scrim); }
  var trig = host.querySelector('.menu-trig');
  trig.setAttribute('aria-expanded', 'false');
  if(refocus) trig.focus();
}

function uivMenuPick(host, opt){
  if(!opt) return;
  uivMenuOpts(host).forEach(function(o){ o.setAttribute('aria-selected', 'false'); });
  opt.setAttribute('aria-selected', 'true');
  var val = host.querySelector('.menu-val');
  if(val) val.textContent = opt.querySelector('.menu-lbl').textContent;
  var src = host.querySelector('.menu-src');
  if(src){ src.value = opt.dataset.v; src.dispatchEvent(new Event('change', { bubbles: true })); }
  if(host._uivPick) host._uivPick(opt.dataset.v, opt);
  uivMenuClose(host, true);
}

function uivMenuWire(host){
  var trig = host.querySelector('.menu-trig');
  trig.setAttribute('aria-haspopup', 'listbox');
  trig.setAttribute('aria-expanded', 'false');

  trig.addEventListener('click', function(e){
    e.preventDefault();
    if(host.classList.contains('open')) uivMenuClose(host, true);
    else uivMenuOpen(host);
  });
  trig.addEventListener('keydown', function(e){
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
      e.preventDefault();
      /* stop here: the same keydown bubbles to the host, and the host's own
         handler would read the arrow a second time and step one row past the
         one that is chosen. Measured: ArrowDown landed on row 2. */
      e.stopPropagation();
      uivMenuOpen(host, e.key === 'ArrowUp' ? 'last' : null);
    }
  });

  var typed = '', timer = null;
  var onKey = function(e){
    if(!host.classList.contains('open')) return;
    var opts = uivMenuOpts(host);
    var i = opts.indexOf(document.activeElement);
    var move = function(j){
      e.preventDefault();
      var t = opts[Math.max(0, Math.min(opts.length - 1, j))];
      if(t) t.focus();
    };
    if(e.key === 'ArrowDown') return move(i < 0 ? 0 : i + 1);
    if(e.key === 'ArrowUp')   return move(i < 0 ? opts.length - 1 : i - 1);
    if(e.key === 'Home')      return move(0);
    if(e.key === 'End')       return move(opts.length - 1);
    if(e.key === 'Escape'){ e.preventDefault(); return uivMenuClose(host, true); }
    if(e.key === 'Tab')       return uivMenuClose(host, false);
    if(e.key === 'Enter' || e.key === ' '){
      if(document.activeElement && document.activeElement.classList.contains('menu-opt')
         && !document.activeElement.classList.contains('menu-act')){
        e.preventDefault();
        return uivMenuPick(host, document.activeElement);
      }
      return;
    }
    /* type-ahead: the letters a person types jump to the first row that starts
       with them, exactly as a native select does */
    if(e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey){
      typed += e.key.toLowerCase();
      clearTimeout(timer);
      timer = setTimeout(function(){ typed = ''; }, 700);
      var hit = opts.filter(function(o){
        return o.textContent.trim().toLowerCase().indexOf(typed) === 0;
      })[0];
      if(hit){ e.preventDefault(); hit.focus(); }
    }
  };
  host.addEventListener('keydown', onKey);

  /* CLICK and KEYDOWN are bound to the popup as well as to the host: while the
     sheet is open the popup is a child of <body>, so an event inside it never
     reaches the menu it belongs to. */
  var onClick = function(e){
    var o = e.target.closest('.menu-opt');
    if(o && !o.classList.contains('menu-act')) uivMenuPick(host, o);
    if(e.target.classList.contains('menu-scrim')) uivMenuClose(host, true);
  };
  host.addEventListener('click', onClick);
  host._pop = host.querySelector('.menu-pop');
  host._scrim = host.querySelector('.menu-scrim');
  host._pop.addEventListener('click', onClick);
  host._scrim.addEventListener('click', function(){ uivMenuClose(host, true); });
  host._pop.addEventListener('keydown', onKey);
}

/* a click anywhere else closes whatever is open - registered once */
document.addEventListener('click', function(e){
  [].slice.call(document.querySelectorAll('.menu.open')).forEach(function(m){
    if(!m.contains(e.target)) uivMenuClose(m, false);
  });
});

/* ---- source 1: a <select> already in the markup ------------------------- */
function uivMenuFromSelect(sel, opts){
  if(!sel || sel.dataset.uivMenu) return null;
  opts = opts || {};
  sel.dataset.uivMenu = '1';

  var host = document.createElement('div');
  host.className = 'menu menu--field';
  sel.parentNode.insertBefore(host, sel);
  host.appendChild(sel);
  /* 10.6b: `vh` comes from base.css, `menu-src` stays as the MARKER menu.js
     queries. Before this the marker also carried its own copy of the five
     visually-hidden declarations in menu.css - the first of what became three. */
  sel.classList.add('menu-src', 'vh');
  sel.setAttribute('tabindex', '-1');
  sel.setAttribute('aria-hidden', 'true');

  var items = [].slice.call(sel.options).map(function(o){
    return { value: o.value || o.text, label: o.text, selected: o.selected };
  });
  /* an option that is an ACTION, not a value - «+ Новий клієнт…». A native
     select cannot say this, which is the whole reason this menu exists. */
  var action = null;
  if(opts.actionMatch){
    var idx = items.findIndex(function(it){ return opts.actionMatch.test(it.label); });
    if(idx >= 0){
      action = { label: items[idx].label, run: opts.onAction || function(){} };
      items.splice(idx, 1);
      /* remove(index), not remove(element): passing the option itself coerces
         to NaN -> 0 and deletes the FIRST option. Measured - the select's
         value became the second client while the trigger showed the first. */
      sel.remove(idx);
    }
  }

  var trig = document.createElement('button');
  trig.type = 'button';
  trig.className = 'btn--outline menu-trig';
  trig.style.width = '100%';
  var lab = sel.getAttribute('aria-label') || '';
  if(lab) trig.setAttribute('aria-label', lab);
  var cur = items.filter(function(i){ return i.selected; })[0] || items[0];
  trig.innerHTML = '<span class="menu-val"></span>' + uivMenuIc('chevron', 'menu-car uiv-trail');
  trig.querySelector('.menu-val').textContent = cur ? cur.label : '';
  trig.style.justifyContent = 'space-between';
  host.insertBefore(trig, sel);

  uivMenuBuild(host, items, { label: lab, action: action });
  uivMenuWire(host);
  return host;
}

/* ---- source 2: a trigger that already exists ---------------------------- */
function uivMenu(trig, items, opts){
  opts = opts || {};
  if(!trig || trig.dataset.uivMenu) return null;
  trig.dataset.uivMenu = '1';

  var host = document.createElement('div');
  host.className = 'menu' + (opts.right ? ' menu--right' : '');
  trig.parentNode.insertBefore(host, trig);
  host.appendChild(trig);
  trig.classList.add('menu-trig');
  host._uivPick = opts.onPick || null;
  /* the trigger came from the markup, so it may not have a caret yet - the
     mark belongs to the control, not to whoever wrote the button */
  if(!trig.querySelector('.menu-car')) trig.insertAdjacentHTML('beforeend', uivMenuIc('chevron', 'menu-car uiv-trail'));

  uivMenuBuild(host, items, { label: opts.label || null });
  uivMenuWire(host);
  return host;
}
