/* ============================================================
   design/system/marks.js - THE three passes that turn a typed sign into a mark
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

   WHAT LIVES HERE: the three maps, the three walks, and the one address they
   are allowed to reach (`uivMarkHosts`). What does NOT: the glyphs
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

/* ---------- WHERE A SIGN IS ALLOWED TO BE A MARK - step 7.96 ----------------
   `UIV_TRAIL_SEL` is not only a selector, it is an ANSWER: «a sign is a mark
   where a person can press». Step 7.6 widened it once already, from `btn--` to
   every pressable, because a mega-menu head and an accordion caret are links and
   the seam had just moved one class over. The coloured coach flow moves it again,
   and this time out of the pressables altogether. Measured at 390 across the 48
   coloured screens: `<span class="ccard-goal">🎯 Набір маси</span>`,
   `<span class="ord-chip">👤 Марія · Схуднення</span>`,
   `<div class="rbadge">✓ Купив товар</div>`, `<span class="m">✓</span>` in the
   coach's benefit list, `<div class="ic">🗑</div>` in the delete dialog. None of
   them is pressable and every one of them is a LABELLED BOX - an element that
   holds one short label and nothing else.

   So the address is: a control, OR a leaf. A leaf is an element with no element
   children, which is the structural way of saying «this box holds text and
   nothing else» - no list of class names, so a chip added next month is reached
   the day it appears. That is the whole point: nine times in this project a
   question of the form «which things get X» was answered with a hand-written
   list, and everything added later fell outside it.

   ONLY THE TWO SHAPES ANCHORED AT THE START USE IT. `uivTrailMark` keeps the
   narrow control-only address on purpose and the reason is at the top of this
   file: `→` at the END of a leaf is a sentence («…з кожного замовлення →» in the
   account hint), while a mapped sign at the START of a leaf is a mark. The
   anchor is what makes the difference safe, not the address.

   A paragraph is running text by definition, so it is out even when it is a
   leaf. `[data-uiv-keep]` is the one way a box can decline a mark; it has
   exactly one user and it carries its reason there (see `uivToastMarks` in
   design/_nav.js). */
var UIV_PROSE = { P: 1, BLOCKQUOTE: 1, FIGCAPTION: 1 };
function uivMarkHosts(scope){
  var out = [];
  [].slice.call(scope.querySelectorAll('*')).forEach(function(el){
    if(el.hasAttribute('data-uiv-keep')) return;
    if(el.children.length){                 /* a container: only if it is pressable */
      if(el.matches && el.matches(UIV_TRAIL_SEL)) out.push(el);
      return;
    }
    if(UIV_PROSE[el.tagName]) return;
    out.push(el);
  });
  return out;
}

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
  /* step 7.96. The tick had NO ROW AT ALL, in either map, while `icons.js` has
     drawn `check` since 7.11 - so `<span class="m">✓</span>` in the coach's
     benefit list and `<div class="rbadge">✓ Купив товар</div>` on the three
     review screens were the only glyphs on those pages still coming from the
     font. Measured at 390: 10 of them. `⚠️` is here for the same reason and it
     is one decision, not two: `.cedlg .ic` is a 48px disc that holds `🗑` on
     «Видалити клієнта?» and `⚠️` on «Видалити акаунт?». Mapping one and not the
     other would leave two dialogs of one family drawing the same slot from two
     different places, which is the seam this file exists to close. Both forms of
     the warning, with and without the variation selector, because `.trim()` does
     not remove U+FE0F. */
  '✓':'check', '⚠':'alert', '⚠️':'alert',
  /* step 7.96, and it is a TYPO one codepoint wide. `UIV_EMOJI` in design/_nav.js
     has 🔍 U+1F50D; `coach-clients.html` types 🔎 U+1F50E in its search field, so
     the one search glyph in the coach flow was drawn by the font while every
     other search mark in the product came from the set. Both codepoints answer
     to the same drawing here and in `UIV_EMOJI`, so neither spelling can miss
     again. */
  '🔍':'search', '🔎':'search',
  /* step 7.13. `.wlrm` in the wishlist is `<button ...>🗑</button>` - the sign IS
     the whole label, so it belongs in this map like every other one. It was
     missing because the SHOP already drew it from a different place: `UIV_EMOJI`
     in design/_nav.js, which kit pages never load. Measured: 6 trash cans drawn
     from the set on account-wishlist.html, and the same button left as a raw
     emoji on the stand. Two editions of one swap, which is the seam this file
     was created to close - it just had one row missing. */
  '🗑':'trash', '🗑️':'trash',
  /* step 7.99, the coach cabinet - and the same TWO EDITIONS the 🗑 row above
     records, one map further on. `UIV_EMOJI` in design/_nav.js runs over the
     shop's REGIONS, so it reaches the rail and the tab bar; it never reaches
     `<span class="cc pre">🔗</span>`, which is a field prefix in the middle of
     coach-verify's form, and it does not run on a stand page at all. This map
     reaches any leaf whose whole text is the sign, wherever it stands. Both maps
     carry the three chrome glyphs so neither route can be the one that misses,
     and 🔗 is here only: a field prefix is not chrome. */
  '👥':'users', '◈':'gem', '🎽':'cap', '🔗':'link'
};

/* THE OUTLINE IS THE RIGHT DEFAULT FOR A SIGN, INCLUDING THE STAR - step 7.27.
   Tried the opposite here first: `name === 'star' ? uivStarSvg() : ...`, so that
   the review modal's picker would come out filled like every other rating. It
   filled one more thing than intended - «Знижки та бонуси» in the account nav,
   which is a ★ too - and icons.js has already written down why that is wrong:
   «outline for a nav chip, filled for a rating». This function cannot tell the
   two apart, because the glyph does not carry the answer, the context does. So
   the default stays outline and the picker is wired where the rest of the
   rating swaps live, in design/_nav.js. */
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
  uivMarkHosts(scope).forEach(function(c){
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

/* ---------- A SIGN THAT LEADS A LABEL - step 7.96, the THIRD shape ----------
   `UIV_SIGN_ONLY` fires when the sign is the WHOLE label; `UIV_TRAIL_MARK` when
   it closes one. A sign that OPENS one was in neither map, so it was in neither
   pass, and the font drew it. Counted at 390 across the 48 coloured screens
   before this existed: 80 signs that HAVE a drawing were still coming from the
   font, and 60 of them were this shape - «＋ Додати клієнта», «🗑 Видалити
   адресу», «↻ У сесію», «🎯 Набір маси», «👤 Марія · Схуднення», «📍 Одеса»,
   «✓ Купив товар». (Another 8 were a sign ALONE in a leaf box, which is
   `UIV_SIGN_ONLY` reaching further than a control; the last 12 were the coach's
   own section rail, and that one is a missing CALL, not a missing map - see
   `uivChrome` in design/_nav.js.) The
   header comment of this file counted 100 close buttons, 32 counter steps and 15
   rating stars before 7.11 closed the first two shapes. This is the third, and
   the same sentence applies: a 🗑 from whatever face the machine happens to have
   is not a decision anyone made.

   PUNCTUATION IS NOT A SIGN, and at the START of a label that rule has to work
   harder than at the end, because the characters that open a string are exactly
   the ones that mean something else. Three guards, and all three must hold:

     1. THE GLYPH IS IN THIS MAP. `＋` U+FF0B is here; ASCII `+` is NOT, because
        «+38 067…» is a phone number and «+13 ₴ бонус» is an amount. `−` and `-`
        are not here either: a leading dash is a dash. The map is the entire
        rule, exactly as the two maps above say about themselves.
     2. THE SIGN IS THE FIRST CHARACTER of the box's own text. `overview.html`
        describes a screen as «тариф Pro, кабінет і «＋ Нова сесія»» - a mapped
        glyph, inside a leaf, in running prose. The `^` anchor is what leaves it
        alone, and it is the reason this pass is safe on a leaf at all.
     3. WHAT FOLLOWS IS WHITESPACE AND THEN A LETTER. `\p{L}`, never `\p{N}`:
        «★ 4.8» is a rating and it has its own gold finish in design/_nav.js;
        «× 1 од.» is arithmetic. A digit after a sign means the sign is being
        read as a value, not as a mark.

   THE SPACE STAYS, and that is the opposite of what `uivTrailMark` does two
   screens up. A trailing mark eats its space because a control is a flex row
   whose `gap` already sets it off on that side, and because `.uiv-ic.uiv-trail`
   in icon.css hands it a `margin-left` when nobody else does. A leading mark has
   no such rule and must not need one - this pass may not ask a stylesheet to
   change - so it keeps the space the author typed: in a chip, a badge or a
   heading that space is the only thing between the mark and the label, and
   inside a flex row it costs nothing, because white space at the start of a line
   box is collapsed away before it is painted. Walked at 390 across every host
   shape this reaches - `.btn--accent`, `.btn--outline`, `.btn--text.ci-lnk`,
   `.city-chip`, `.ccard-goal`, `.ord-chip`, `.cl-tag`, `.rbadge`, `h3` - and the
   gap reads the same as the marks `uivCart` has been placing by hand since 6.x,
   which is the control the two routes now share on `cart` and `cart-coach`. */
var UIV_LEAD_MARK = { '＋':'plus', '🗑️':'trash', '🗑':'trash', '↻':'refresh',
                      '📍':'pin', '🎯':'target', '👤':'user', '✓':'check',
                      '🔎':'search', '🔍':'search', '🔔':'bell', '⚠️':'alert', '⚠':'alert' };
var UIV_LEAD_RE = new RegExp('^(\\s*)(' + Object.keys(UIV_LEAD_MARK)
  .sort(function(a, b){ return b.length - a.length; })   /* 🗑️ before 🗑, or FE0F is left behind */
  .join('|') + ')\\s+\\p{L}', 'u');

/* THE DEEPEST FIRST TEXT - the mirror of `uivTrailLastText`, and idempotent by
   the same construction. Once the mark is in, the box's first child is a
   `<span class="uiv-ic">` whose own first child is an `<svg>` and then a
   `<path>`, so the walk runs out of children and returns null. A box that
   already carries its mark is stepped over without a flag being kept anywhere. */
function uivLeadFirstText(el){
  var n = el;
  while(n && n.nodeType === 1){
    var k = n.firstChild;
    while(k && k.nodeType === 3 && !k.nodeValue.trim()) k = k.nextSibling;
    if(!k) return null;
    n = k;
  }
  return n && n.nodeType === 3 ? n : null;
}

function uivLeadMark(root){
  var scope = root || document;
  if(!scope.querySelectorAll) return;
  uivMarkHosts(scope).forEach(function(c){
    /* the stand's own bar is not the store - the same line `uivCurrency` draws */
    if(c.closest && c.closest('.uiv-side, .uiv-topbar')) return;
    var t = uivLeadFirstText(c);
    if(!t) return;
    var m = UIV_LEAD_RE.exec(t.nodeValue);
    if(!m) return;
    var svg = uivIconSvg(UIV_LEAD_MARK[m[2]]);
    if(!svg) return;
    /* drop the sign and any space in FRONT of it; keep the run behind it */
    t.nodeValue = t.nodeValue.slice(m[1].length + m[2].length);
    t.parentElement.insertAdjacentHTML('afterbegin', '<span class="uiv-ic">' + svg + '</span>');
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

/* THREE passes now, in the order that matters: the two ends of a label first -
   the mark that closes it, then the mark that opens it - and a box whose sign IS
   its whole label is what is LEFT once both ends have been taken. */
function uivMarks(root){
  uivTrailMark(root);
  uivLeadMark(root);
  uivSignMark(root);
  uivWrapDrCat();
}

/* the stand has no `uivChrome`, so nothing would ever call the passes there */
if(typeof document !== 'undefined'){
  document.addEventListener('DOMContentLoaded', function(){
    if(typeof uivChrome !== 'function') uivMarks();
  });
}
