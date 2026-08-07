/* ============================================================
   design/system/marks.js - THE two passes that turn a typed sign into a mark
   from the set, and the only edition of them.

   It moved here from design/_nav.js at step 7.11, and the STAND is why - the
   same reason `icons.js` moved out of the same file one step earlier. The
   showcase pages under design/kit/ load `kit/_nav.js`, never the shop's
   runtime, so no pass ever ran on them: measured, the stand was still drawing
   ✕ with the font on `button.html`, ♡ on `kit.html`, −/+ on `stepper.html` and
   ▦/☰ on `view-toggle.html`, while the shop next door drew all four from the
   set. A design system whose specimen differs from the product is the exact
   defect this stage exists to remove, and the fix is not to retype the stand -
   it is one edition, run by both.

   WHAT LIVES HERE: the two maps and the two walks. What does NOT: the glyphs
   (icons.js - this file is the rule, not the drawing) and the region-wide emoji
   swap `uivIcons()`, which is the shop's own chrome and has no meaning on a
   stand page.

   Runs itself on a page that has no `uivChrome` - that is the stand. On a shop
   page `uivChrome()` calls `uivMarks()` last, once it has finished building the
   header, the drawer and the dialogs, because a pass cannot mark a button that
   is not there yet.
   ============================================================ */
/* ITS OWN MAP, and that is not tidiness. `UIV_EMOJI` feeds `UIV_RE`, which
   `uivIcons()` runs over whole REGIONS - the header, the drawer, the footer, the
   tab bar. Putting `→` in there swapped every arrow in the footer's and drawer's
   copy as well: measured on cart-empty.html, 27 marks appeared where the page has
   exactly ZERO trailing arrows on a button. A sign that means «this button leads
   somewhere» is not the same character doing duty inside a sentence, and only the
   first one is ours to replace. */
/* Step 7.11 added `↓` and the two FULLWIDTH signs. `↓` closes «Читати більше»,
   which goes down the page rather than on to the next one. `＋` / `－` close the
   drawer's category rows, and only the fullwidth pair is here: the ASCII `+` and
   `−` are whole controls of their own on the quantity counter, and they belong
   to the sign-only map below, where they are sized as a square and not as
   punctuation. */
var UIV_TRAIL_MARK = { '→':'arrowRight', '↓':'arrowDown', '▾':'chevron', '⌄':'chevron',
                       '›':'caret', '＋':'plus', '－':'minus' };
var UIV_TRAIL_RE = /\s*([→↓▾⌄›＋－])\s*$/;
/* THE ADDRESS IS A CONTROL, NOT A BUTTON - step 7.6. Step 7.5 closed the sign for
   `[class*="btn--"]` and left 20 of them standing, because a mega-menu head, a
   «Докладніше про програму →» and the accordion caret are LINKS. The same sign had
   two drawings again; the seam had just moved one class over. An arrow belongs to
   the sign, not to the button, so the address widens to everything a person can
   press. Body copy is still out of reach - a paragraph is not in this list. */
var UIV_TRAIL_SEL = 'a, button, summary, [role="button"], [class*="btn--"]';

/* THE DEEPEST LAST TEXT, not the last child. The sign turned up in four shapes:
   bare in the control («Для тренерів →»), alone in a span of its own
   (`.dpcity > .dpcar`), nested one box deeper (`.ord-h > .oh-drop > .chev`), and
   at the end of a nested line («…<span class="ms-fb">Дивитися →</span>»). One
   walk covers all four: go down the last child until the text itself, and put the
   mark where that text was. */
function uivTrailLastText(el){
  var n = el;
  while(n && n.nodeType === 1){
    var k = n.lastChild;
    while(k && k.nodeType === 3 && !k.nodeValue.trim()) k = k.previousSibling;
    if(!k) return null;
    n = k;
  }
  return n && n.nodeType === 3 ? n : null;
}

function uivTrailMark(root){
  var scope = root || document;
  if(!scope.querySelectorAll) return;
  [].slice.call(scope.querySelectorAll(UIV_TRAIL_SEL)).forEach(function(c){
    /* the stand's own bar is not the store - the same line `uivCurrency` draws */
    if(c.closest && c.closest('.uiv-side, .uiv-topbar')) return;
    if(c.querySelector('.uiv-trail')) return;                 /* already done */
    /* A SIGN THAT IS THE WHOLE LABEL IS NOT TRAILING - it is an icon control, and
       its mark takes the square's size, not a label's. The pager's «›» is exactly
       that, and without this line it would have been re-sized as punctuation. */
    if(!c.textContent.replace(UIV_TRAIL_RE, '').trim()) return;

    var t = uivTrailLastText(c);
    if(!t) return;
    var m = UIV_TRAIL_RE.exec(t.nodeValue);
    if(!m || !UIV_TRAIL_MARK[m[1]]) return;
    var svg = uivIconSvg(UIV_TRAIL_MARK[m[1]]);
    if(!svg) return;

    /* the space in front of the sign goes with it: a control is a flex row with a
       `gap`, so a kept space would set the mark twice as far out as the rest of
       the set */
    t.nodeValue = t.nodeValue.slice(0, m.index);
    var host = t.parentElement;
    if(!host.textContent.trim() && host !== c){
      /* THE SIGN HAD A BOX OF ITS OWN (`.dpcar`, `.chev`) - keep the box, swap the
         letter. `.chev` is rotated when its row opens, and replacing the element
         would have taken the rotation with it. Such a mark is sized by ITS BOX,
         not by a label, so it is punctuation only when that box is a direct child
         of the control. */
      host.innerHTML = svg;
      host.classList.add('uiv-ic');
      if(host.parentElement === c) host.classList.add('uiv-trail');
      return;
    }
    /* THE SIGN CLOSED A LINE, so the mark is that line's punctuation wherever the
       line is - straight in the control («Для тренерів →») or one span deep
       («…<span class="ms-fb">Дивитися →</span>»). Both are trailing, and asking
       whether the span happens to be a direct child of the control answered a
       different question: measured, «Дивитися →» came out at 1.05em with no space
       while every other arrow was 1.15em with one. */
    host.insertAdjacentHTML('beforeend', '<span class="uiv-ic uiv-trail">' + svg + '</span>');
  });
}

/* ---------- A SIGN THAT IS THE WHOLE CONTROL - step 7.11 --------------------
   `uivTrailMark` walks away from these on purpose, and says so: a sign that is
   the entire label is not punctuation, it is the control, and its mark takes the
   square's size rather than a label's. Step 7.6 stopped at that line and never
   came back - so 100 close buttons, 32 counter steps and 15 rating stars went on
   being drawn by the FONT while everything around them was drawn by the set. A ✕
   from whatever face the machine happens to have is not a decision anyone made.

   HOW THIS WAS FOUND is the part worth keeping. Steps 7.6 and 7.7 both reported
   «no typographic signs left», and both checked with a regular expression built
   from the list I had written myself - so the check could only ever confirm the
   list, never the page. Found by asking the opposite question instead: ANY
   character closing a label that is not a letter, a digit or ordinary
   punctuation. Six more signs came back, and the largest had 408 instances.

   PUNCTUATION IS NOT A SIGN. «+ Новий клієнт…» keeps its ellipsis and
   «Creapure®» keeps its trademark - those belong to the WORD, not to the
   control. The map below is the entire rule; anything outside it is left alone,
   which is the same discipline `UIV_TRAIL_MARK` follows and the reason neither
   map is allowed to grow by guesswork. */
var UIV_SIGN_ONLY = {
  '✕':'close', '×':'close', '✖':'close', '⨯':'close',
  '＋':'plus', '+':'plus', '－':'minus', '−':'minus',
  '★':'star', '☆':'star', '♥':'heart', '♡':'heart',
  '▦':'grid', '☰':'list',
  /* step 7.13. `.wlrm` in the wishlist is `<button ...>🗑</button>` - the sign IS
     the whole label, so it belongs in this map like every other one. It was
     missing because the SHOP already drew it from a different place: `UIV_EMOJI`
     in design/_nav.js, which kit pages never load. Measured: 6 trash cans drawn
     from the set on account-wishlist.html, and the same button left as a raw
     emoji on the stand. Two editions of one swap, which is the seam this file
     was created to close - it just had one row missing. */
  '🗑':'trash', '🗑️':'trash'
};

function uivSignSwap(host, name, wrap){
  var svg = uivIconSvg(name);
  if(!svg) return false;
  if(wrap) host.innerHTML = '<span class="uiv-ic">' + svg + '</span>';
  else { host.innerHTML = svg; host.classList.add('uiv-ic'); }
  return true;
}

/* A CONTROL CAN HOLD TWO SIGNS AND SHOW ONE - step 7.11, second pass. The first
   version asked «does this control already contain an svg» and stopped there,
   which is one question too coarse. The header burger is
   `<button><span class="bi-open">☰</span><span class="bi-close">✕</span></button>`
   and css shows one box or the other: `uivIcons` had drawn the ☰ long ago, so the
   guard saw a drawing and walked away, leaving the ✕ - the state you only see
   once the drawer is open - typed. Measured: 34 pages, every one of them.
   So the question is asked of the BOX that holds the sign, not of the control. */
function uivSignMark(root){
  var scope = root || document;
  if(!scope.querySelectorAll) return;
  [].slice.call(scope.querySelectorAll(UIV_TRAIL_SEL)).forEach(function(c){
    if(c.closest && c.closest('.uiv-side, .uiv-topbar')) return;

    /* the sign IS the control - `<button aria-label="Закрити">✕</button>` */
    if(!c.querySelector('svg') && UIV_SIGN_ONLY[c.textContent.trim()]){
      var t = uivTrailLastText(c);
      var host = t ? t.parentElement : c;
      uivSignSwap(host, UIV_SIGN_ONLY[c.textContent.trim()], host === c);
      return;
    }
    /* or a STATE BOX inside it is, and its siblings are already drawn */
    [].slice.call(c.querySelectorAll('*')).forEach(function(b){
      if(b.querySelector('svg') || b.classList.contains('uiv-ic')) return;
      var nm = UIV_SIGN_ONLY[b.textContent.trim()];
      if(nm) uivSignSwap(b, nm, false);
    });
  });
}

/* THE DRAWER'S CATEGORY MARK IS A TOGGLE, and the toggle writes `textContent` -
   which wipes the drawing and puts the character back the first time anyone
   opens a row. The handler lives in `wireframes/_nav.js`, shared with the frozen
   grey layer, so it is wrapped here rather than edited there: the grey prototype
   keeps its ＋ and －, and the colour layer redraws after every switch. */
function uivWrapDrCat(){
  if(typeof window.toggleDrCat !== 'function' || window.toggleDrCat.uivWrapped) return;
  var orig = window.toggleDrCat;
  var wrapped = function(i){
    orig.apply(this, arguments);
    var a = document.getElementById('dra' + i);
    /* NOT `uivTrailMark` again - measured, and it did nothing. The handler writes
       `textContent`, which takes the drawing out of the box but leaves the box's
       CLASSES on it, so the pass's own «already done» guard (`.uiv-trail` is
       present) sent it straight back. The box is known here, and so is the sign
       now in it, so the swap is direct. */
    if(a){
      var nm = UIV_SIGN_ONLY[(a.textContent || '').trim()];
      if(nm) uivSignSwap(a, nm, false);
    }
  };
  wrapped.uivWrapped = true;
  window.toggleDrCat = wrapped;
}

/* both passes, in the order that matters: a control whose sign IS its whole
   label is what is LEFT after every mark that closes a label has been taken */
function uivMarks(root){
  uivTrailMark(root);
  uivSignMark(root);
  uivWrapDrCat();
}

/* the stand has no `uivChrome`, so nothing would ever call the passes there */
if(typeof document !== 'undefined'){
  document.addEventListener('DOMContentLoaded', function(){
    if(typeof uivChrome !== 'function') uivMarks();
  });
}
