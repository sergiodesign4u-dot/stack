/* _boot.js - what a demo frame runs, in ONE file where there were 33 copies.

   A frame loads exactly what a coloured product screen loads, in the same order,
   and calls the same initialisers. Anything less and the demo is a photograph:
   the price slider, the checkboxes and the switch are all JS-driven, and a stand
   that shows them without their behaviour shows something the product does not
   have. Extracted at 8.34b, the third such extraction of the day after
   `_idle.js` and `_frame.js` - all three were the same shape, one mechanism
   retyped into every page that needed it.

   7.87 wrote the list, and its reason still holds: the first edition was all
   `uiv*` and the steppers stayed dead, because the behaviour of the cart and the
   checkout is bound by `wf*` functions in the prototype layer - `wfCart` wants a
   `.cart-drawer` holding `.ci[data-unit]` and binds a delegated click on it.
   Both families, in the order a screen calls them.

   A FRAME THAT SHOWS A STATE the page does not open by itself declares
   `FRAME_STATE` before this script - `wfAuthGo('error')`, `catOverlayGoals()`,
   `wfHomeRail({open: true})`. It is called at ONE exact point: after the
   initialisers, so the builders it needs exist, and BEFORE the icon and mark
   passes, so the markup it creates gets its glyphs like everything else. Running
   it at the end instead leaves a freshly built panel in emoji - which is the
   defect 7.78 fixed for the toast and 7.87 for the catalogue overlay, and it
   would have come back here by placement alone. */
(function(){
  var init = ['wfCart','wfCheckout','wfAuth','wfPdpModals','wfAddrDialog','wfProfileDialogs',
              'wfToasts','uivFixLinks','uivChrome','uivCurrency','uivPriceSlider','uivCheckboxes',
              'uivSwitches','uivSegments','uivRadioGroups','uivDisclosures','uivFav','uivCrumbs',
              'uivCart','uivCheckout','uivPdp','uivPdpTabs','uivStickyHeader','uivPatchMenus',
              'uivToastMarks','uivDeadLinks','uivFooterIcons','uivMascot','uivAnchorScroll'];
  init.forEach(function(n){ try{ if (typeof window[n] === 'function') window[n](); }catch(e){} });
  if (typeof FRAME_STATE === 'function') { try { FRAME_STATE(); } catch(e) {} }
  /* 7.87: `uivIcons` walks six named ids and nothing else, so a demo that has none of
     them keeps its emoji. That is the FOURTH hand-written list that pass found -
     after the focus ring's thirteen selectors, `UIV_SIGN_ONLY`, and the Escape handler's
     eleven calls. Here the frame simply asks it to walk the whole body. */
  try { if (typeof uivIcons === 'function') uivIcons(document.body); } catch(e) {}
  try { if (typeof uivMarks === 'function') uivMarks(document.body); } catch(e) {}

  /* AND THE ASSETS A BUILDER WRITES BY HAND, found at 8.34b by the empty cart
     drawing a broken image. Four builders in `design/_nav.js` write a
     DOCUMENT-relative path into an element they create - `visuals/product-whey.png`
     (:563), `concept/assets/mascot-pose-present.png` (:1228 and :1425),
     `visuals/mascot-face-reassure.png` (:1566). On a coloured screen that is
     correct, because the screen sits in `design/`. A frame sits two levels deeper,
     so the same string resolves into `design/kit/demo/visuals/...` and 404s.
     `uivFixLinks` solves exactly this for `<a href>` and only for those.
     The rewrite is deliberately narrow: only a src with no scheme, no leading
     slash and no `../`, which is precisely the shape a builder types. */
  document.querySelectorAll('img[src]').forEach(function(im){
    var raw = im.getAttribute('src');
    if (!raw || /^(https?:|data:|\/|\.\.\/)/.test(raw)) return;
    im.setAttribute('src', '../../' + raw);
  });

  /* A stand must not navigate: the checkout's «Отримати код» is a submit button, and
     pressing the first control a reader reaches blanked the demo. */
  document.querySelectorAll('form').forEach(function(f){
    f.addEventListener('submit', function(e){ e.preventDefault(); });
  });
})();
