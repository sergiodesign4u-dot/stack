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
   the whole reason the frame exists. */
(function(){
  var frames = [].slice.call(document.querySelectorAll('.kp-frame'));
  if (!frames.length) return;
  frames.forEach(function(f){
    var wrap = f.parentNode;
    function fit(){
      try{
        var d = f.contentDocument; if (!d || !d.body) return;
        var h = Math.max(d.body.scrollHeight, d.documentElement.scrollHeight, 80);
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
