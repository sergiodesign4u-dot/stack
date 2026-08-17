/* _frame.js - the demo frame is a viewport, so it is sized like one.

   ONE FILE WHERE THERE WERE 24 IDENTICAL COPIES, extracted at 8.34 for the same
   reason `_idle.js` was at 8.32: a check or a mechanism retyped into every page
   is the hand fix `CLAUDE.md` bans for the product, applied to the showcase.
   These 24 were byte-identical, which is luck rather than discipline - the idle
   control had drifted into five editions from the same start.

   AND THE COPY CARRIED ONE LIMIT THAT WAS NEVER A DECISION: `querySelector`,
   singular. A stand page could therefore hold exactly one frame, and several
   components need two - `filter-rail` holds the listing rail AND the home rail
   with its flyout, `pdp-tabs` holds a strip and a page grid, `header` has a
   desktop face and a phone face. The second frame on such a page would have
   loaded and then sat unfitted at its default 150px. `querySelectorAll` and a
   per-frame closure; nothing else about the sizing changed.

   Two numbers are read from the frame itself rather than typed here: its content
   height, so a 55px shelf does not sit in 640px of nothing, and the scale that
   makes a 1180-wide viewport fit a narrower column. Scaling does NOT change what
   the media query inside sees - the frame is still 1180 wide to itself, which is
   the whole reason the frame exists.

   ###########################################################################
   AND THE FIRST OF THOSE TWO NUMBERS WAS NEVER READ - step 8.46. The paragraph
   above states the intent, the code never reached it, and the sentence is
   exactly why nobody looked: a 55px shelf DID sit in 640px of nothing.

   THE MECHANISM IS ONE LINE, AND IT IS IN THE DEMO TEMPLATE, NOT HERE. Every
   frame's document carries `body{ min-height: 100vh }` - which is correct and
   necessary, because 18 of the 57 frames hold a dialog, an overlay or a fixed
   panel, and a fixed panel in a document with no viewport has nothing to sit in.
   But `100vh` inside a frame IS the frame's own height, so `body.scrollHeight`
   can never come back smaller than the height the frame already has. The fitter
   read exactly that number. So the frame could GROW and could never SHRINK: it
   settled at whatever `.kp-frame`'s declared `height: 640px` gave it and stayed.

   MEASURED BEFORE THE FIX, all 57 frames on the stand: 18 viewport-bound, 39
   holding flow content, and 13 of those 39 carrying more than 100px of nothing -
   3 930px in total. `price-slider` was the worst at 96px of content in a 704px
   frame; `account-shell-wltop` 147 in 640, `buy-bar` 150 in 640.

   THE QUESTION IS ASKED AT A COLLAPSED SIZE, which is the only way to ask it.
   The frame is set to 80px, the document is asked how tall it wants to be, and
   the height is put back - all inside one synchronous block, so no paint happens
   at 80 and there is no flash. A document whose content is viewport-bound
   answers 80 or less, because a fixed panel contributes nothing to scroll
   height; that answer is the SIGNAL, and those frames keep the old reading and
   their 640. The split measured clean - 18 at or below 80, 39 above 90, nothing
   in between - so the threshold is not a tuned number sitting in a grey band.

   AND THE PROBE HEIGHT WAS CHECKED RATHER THAN CHOSEN, because a fitter that
   reads a number which moves with its own probe is measuring itself. Every one
   of the 57 was asked from three heights - 80, 300 and 1000 - and all 57 answer
   `max(content, probe)`: `account-shell` gives 392 / 392 / 1012, `cart-drawer`
   470 / 470 / 1000, and the viewport-bound ones give the probe back verbatim.
   So the probe is a FLOOR, not a measurement, and 80 is the floor the fitter
   already had in `Math.max(..., 80)`. Anything taller than 80 reads true; a
   1000px probe would have hidden every short frame on the stand, which is
   precisely the bug being fixed here, one order of magnitude larger.

   AFTER: 0 of the 39 flow frames hold more than 100px of nothing. The 13 that
   did: price-slider 704 -> 96, account-shell-wltop 640 -> 147, buy-bar 640 ->
   150, header 503 -> 113, coach-landing-cta 604 -> 279, coach-landing-steps 503
   -> 196, system-page-404 640 -> 376, pdp-tabs 503 -> 256, three cart-drawer
   frames 640 -> 470, cart-drawer-coach 640 -> 493, account-shell 541 -> 392.
   `accept` 240 screens, 0 failures at 390 and 0 at 360; `idle` 76 pages, 0 red.
   ########################################################################### */
(function(){
  var PROBE = 80;      /* the collapsed height the document is asked from */
  var BOUND = 90;      /* at or below this the content is viewport-bound, not short */
  var frames = [].slice.call(document.querySelectorAll('.kp-frame'));
  if (!frames.length) return;
  frames.forEach(function(f){
    var wrap = f.parentNode;
    /* how tall the document wants to be when the frame is NOT already that tall */
    function asked(d){
      var keep = f.style.height;
      f.style.height = PROBE + 'px';
      void d.documentElement.offsetHeight;          /* lay out at the collapsed size */
      var n = Math.max(d.body.scrollHeight, d.documentElement.scrollHeight);
      f.style.height = keep;                        /* back before anything is painted */
      return n;
    }
    function fit(){
      try{
        var d = f.contentDocument; if (!d || !d.body) return;
        var n = asked(d);
        /* viewport-bound: the old reading is the right one, and 640 is its floor */
        var h = n <= BOUND ? Math.max(d.body.scrollHeight, d.documentElement.scrollHeight, 80) : n;
        h = Math.min(h, 2400);
        f.style.height = h + 'px';
        var declared = parseInt(f.dataset.w, 10) || f.offsetWidth;
        var avail = wrap.clientWidth - 26;
        /* 7.87, from the sweep: `min(1, avail/declared)` put a 1180 demo into a 332px
           column at k = 0.28, so 16px body copy drew at 4.5px. A demo nobody can read is
           not a demo. Below 0.62 the frame keeps its size and the wrap scrolls sideways
           instead - a scrollbar is honest, a 4.5px letter is not. */
        var k = Math.min(1, avail / declared);
        if (k < 0.62) k = 0.62;
        f.style.transformOrigin = 'top left';
        f.style.transform = k < 1 ? 'scale(' + k.toFixed(4) + ')' : 'none';
        wrap.style.overflowX = (declared * k > avail) ? 'auto' : 'hidden';
        /* and the height it sets must include the padding and border it sits in, or the
           frame loses its last 2px on every stand - measured on 48 of 48 rows. */
        wrap.style.height = (Math.round(h * k) + 26) + 'px';
      }catch(e){}
    }
    f.addEventListener('load', function(){ fit(); setTimeout(fit, 300); setTimeout(fit, 900); });
    addEventListener('resize', fit);
    if (f.contentDocument && f.contentDocument.readyState === 'complete'){ fit(); setTimeout(fit, 300); }
  });
})();
