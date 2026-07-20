/* ============================================================
   ui-visual · _uivis.js  (Concept, Step 6)
   Thin navigation layer for the colored copies. The wireframes stay grey
   and own structure/behaviour; these copies own only the visual layer.

   1) uivFixLinks(): the header/footer/rail/sheet injected by ../wireframes/_nav.js
      emit BARE relative hrefs ("catalog-page.html"), which from /ui-visual/ would
      404. Screens that are already colored here stay internal; every other .html
      link is re-pointed to the grey original in ../wireframes/. So a colored screen
      never dead-ends, and un-colored screens open as the honest grey wireframe.
   2) uivBar(): a slim strip back to the language stand + the grey original,
      optionally a sibling colored screen.

   Run BOTH after wfHeader()/wfFooter()/wfCatalogRail()/wfSheet()/wfBar() have injected.
   ============================================================ */

/* screens that exist here in color (Step 6 = the listing set; Step 7 extends this) */
var UIV_SET = [
  'listing.html', 'listing-empty.html', 'listing-error.html', 'listing-loading.html',
  'listing-filtered.html', 'listing-list.html', 'listing-sheet.html'
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

function uivBar(sibling){
  if(document.querySelector('.uiv-bar')) return;
  var cur = (location.pathname.split('/').pop() || 'listing.html');
  var sib = sibling ? '<span class="sepb">·</span><a href="' + sibling.href + '">' + sibling.label + ' →</a>' : '';
  var el = document.createElement('div');
  el.className = 'uiv-bar';
  el.innerHTML =
    '<span class="uiv-tag">ui-visual</span><span>кольорова копія мови</span>' +
    '<span class="sepb">·</span><a href="../concept/concept.html">← Мова продукту (Концепт)</a>' +
    sib +
    '<span class="sepb">·</span><a href="../wireframes/' + cur + '">сірий оригінал ↗</a>';
  document.body.insertBefore(el, document.body.firstChild);
}
