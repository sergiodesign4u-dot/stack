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
  'account-empty.html', 'account-loading.html', 'account-error.html'
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
  /* coach tier: a graduation cap - the coach badge on the PDP coach state */
  cap:'<path d="M2.8 9.2 12 5l9.2 4.2-9.2 4.2z"/><path d="M6.8 11.5v4.1c0 1.5 2.3 2.6 5.2 2.6s5.2-1.1 5.2-2.6v-4.1"/><path d="M20.6 9.9v4.4"/>',
  /* certificate / document with a verified mark (PDP trust strip) */
  doc:'<path d="M6 3.6h7.4L18 8.2V20a.6.6 0 0 1-.6.6H6a.6.6 0 0 1-.6-.6V4.2A.6.6 0 0 1 6 3.6z"/><path d="M13.2 3.8v4.6h4.6"/><path d="M8.6 14.1l2.1 2.1 4.4-4.6"/>',
  /* auth dialog (node 1.x): the SMS with the code, the one-time-code lock,
     the e-mail method and the confirmed step */
  chat:'<path d="M20.4 11.7c0 3.9-3.8 7-8.4 7-.9 0-1.8-.1-2.6-.3L4.4 20l1.4-3.2c-1.4-1.3-2.2-3.1-2.2-5.1 0-3.9 3.8-7 8.4-7s8.4 3.1 8.4 7z"/>',
  lock:'<rect x="4.6" y="10.3" width="14.8" height="9.7" rx="2.4"/><path d="M8.3 10.3V7.9a3.7 3.7 0 0 1 7.4 0v2.4"/><path d="M12 14.2v2.2"/>',
  mail:'<rect x="3" y="5.4" width="18" height="13.2" rx="2.4"/><path d="M3.7 7.1 12 13l8.3-5.9"/>',
  check:'<path d="M4.8 12.4 9.6 17 19.2 7.4"/>',
  /* cart drawer (node 6.0): removing a line */
  trash:'<path d="M4.6 6.8h14.8"/><path d="M9.4 6.8V5.2a1.2 1.2 0 0 1 1.2-1.2h2.8a1.2 1.2 0 0 1 1.2 1.2v1.6"/>' +
        '<path d="M6.4 6.8 7.3 19a1.3 1.3 0 0 0 1.3 1.2h6.8a1.3 1.3 0 0 0 1.3-1.2l.9-12.2"/>' +
        '<path d="M10.4 10.2v6M13.6 10.2v6"/>',
  /* buyer account (node 7.x): the order parcel, the repeat arrow, leaving a review,
     the receipt download and the way out */
  box:'<path d="M12 3.4 20.3 7.6v8.8L12 20.6 3.7 16.4V7.6z"/><path d="M3.7 7.6 12 11.8l8.3-4.2"/><path d="M12 11.8v8.8"/>',
  refresh:'<path d="M20.2 12a8.2 8.2 0 1 1-2.5-5.9"/><path d="M20.4 4.2v4.6h-4.6"/>',
  pen:'<path d="M15.6 4.9 19 8.3 8.9 18.4l-4.3.9.9-4.3z"/><path d="M13.6 6.9 17 10.3"/>',
  download:'<path d="M12 4v10.4"/><path d="M7.8 10.6 12 14.8l4.2-4.2"/><path d="M4.6 18.8h14.8"/>',
  logout:'<path d="M14.6 7.4V5.2a1.2 1.2 0 0 0-1.2-1.2H5.2A1.2 1.2 0 0 0 4 5.2v13.6a1.2 1.2 0 0 0 1.2 1.2h8.2a1.2 1.2 0 0 0 1.2-1.2v-2.2"/><path d="M9.8 12h10.4"/><path d="M17 8.8 20.2 12 17 15.2"/>'
};
/* Messenger channels (footer «Консультація», contacts 8.3) are BRAND MARKS, not UI icons,
   so they break the outline rule on purpose: a badge - filled disc, glyph knocked out -
   is what a channel looks like everywhere, and at 16px a solid silhouette survives where
   an outline turns to mush (the hand-drawn stroke pair that lived here first proved it).
   Both come from ONE Flaticon set (via the Freepik/Magnific catalogue) so the plane and
   the handset are siblings, not two strangers; the paths carry no fill of their own, so
   the mark takes `currentColor` and rides the link - grey at rest, accent on hover.
   Licence: covered by the project's Freepik subscription; attribution/licence file is an
   operational [?] before public launch, same shelf as the brand logos on the home page. */
var UIV_BRAND = {
  telegram: { vb:'0 0 176 176', p:'<path d="m123.33 62.35-44.63 36.48-2.1 1.72a2.27 2.27 0 0 0 -.84 1.48l-.47 3.88-1.29 10.9a.5.5 0 0 1 -1 .09l-3.63-10.9-3.75-11.15a2.24 2.24 0 0 1 1.08-2.66l46.44-26.62 8.74-5c1.27-.74 2.57.86 1.45 1.78z"/><path d="m88 0a88 88 0 1 0 88 88 88 88 0 0 0 -88-88zm54.89 50.94-17.18 75.91c-.81 3.56-5.33 5.17-8.5 3l-25.94-17.6-13.21 12.49a4.54 4.54 0 0 1 -7.32-1.62l-4.77-14-4.77-14-25.57-7a3.32 3.32 0 0 1 -.29-6.41l98.78-35.59 1.82-.65c3.83-1.34 7.79 1.76 6.95 5.47z"/>' },
  viber: { vb:'0 0 176 176', p:'<path d="m129.54 61.54c-.77-3-3-6.42-5.8-9.35-3.44-3.6-7.84-6.53-11.69-7.39a128 128 0 0 0 -48.11 0c-7 1.56-15.77 10-17.48 16.74a92 92 0 0 0 0 39.49c1.38 5.46 7.37 12 13.3 15.14a16.6 16.6 0 0 0 4.18 1.61.65.65 0 0 1 .54.64v19.2a1.06 1.06 0 0 0 1.83.73l9.13-9.35 8.56-8.8a.62.62 0 0 1 .48-.2 129.12 129.12 0 0 0 27.56-2.22c7-1.56 15.77-10 17.49-16.75a92 92 0 0 0 .01-39.49zm-17.24 40.46a14.81 14.81 0 0 1 -6.36 7 14.48 14.48 0 0 1 -2.75.88c-1.07-.33-2.09-.54-3-.94a75.6 75.6 0 0 1 -20.85-12.3 55 55 0 0 1 -5.23-5.13 67.64 67.64 0 0 1 -10-15.27c-1.28-2.6-2.36-5.31-3.46-8-1-2.45.48-5 2-6.82a15.83 15.83 0 0 1 5.37-4 3.44 3.44 0 0 1 4.31 1 56.27 56.27 0 0 1 6.67 9.33 4.45 4.45 0 0 1 -1.25 6c-.5.34-1 .75-1.43 1.13a4.55 4.55 0 0 0 -1.08 1.15 3.13 3.13 0 0 0 -.24 2.78c1.93 5.31 4.86 9.73 9.24 12.84a23.91 23.91 0 0 0 4.76 2.62 7.14 7.14 0 0 0 3.58.87c2.18-.26 2.9-2.66 4.42-3.91a4.19 4.19 0 0 1 5-.22c1.62 1 3.18 2.12 4.74 3.23a52.2 52.2 0 0 1 4.45 3.39 3.54 3.54 0 0 1 1.11 4.37zm-14.36-24a2.11 2.11 0 0 1 -.12-.51 14.07 14.07 0 0 0 -.3-2 5.8 5.8 0 0 0 -2.14-3.36 5.9 5.9 0 0 0 -1.73-.84c-.79-.22-1.62-.16-2.4-.35a1.48 1.48 0 0 1 -1.2-1.71 1.55 1.55 0 0 1 1.63-1.25c4.58.34 8 2.54 8.88 7.45a11.48 11.48 0 0 1 .19 1.38 4 4 0 0 1 0 1.25 1.29 1.29 0 0 1 -1.06 1h-.22a1.5 1.5 0 0 1 -1.53-1.06zm-1.46-12.39a18 18 0 0 0 -4.86-1.49c-.74-.12-1.48-.19-2.22-.29a1.41 1.41 0 0 1 -1.33-1.58 1.39 1.39 0 0 1 1.55-1.37 20.26 20.26 0 0 1 8.43 2.2 17 17 0 0 1 7.45 7.35 19.28 19.28 0 0 1 1.84 5.91 7.54 7.54 0 0 1 .12.81c.05.6.07 1.19.12 1.94v.28a4 4 0 0 1 -.12.88 1.47 1.47 0 0 1 -2.76.14 4.22 4.22 0 0 1 -.15-1.24 16.1 16.1 0 0 0 -1.3-6.5 13.63 13.63 0 0 0 -.67-1.32 14.64 14.64 0 0 0 -6.1-5.72zm16.52 18.44c-1 0-1.49-.85-1.56-1.78-.13-1.83-.23-3.67-.48-5.49a22.34 22.34 0 0 0 -3.14-8.66 23 23 0 0 0 -15.4-10.58c-1.44-.25-2.91-.31-4.36-.47-.92-.09-2.13-.15-2.33-1.3a1.58 1.58 0 0 1 1.55-1.77h1.07a26.54 26.54 0 0 1 21.65 12 26.24 26.24 0 0 1 3.78 9.68c.38 2.17.52 4.39.69 6.59a1.55 1.55 0 0 1 -1.47 1.78z"/><path d="m88 0a88 88 0 1 0 88 88 88 88 0 0 0 -88-88zm50.83 103.13v.12c-2.56 10.39-14.14 21.52-24.77 23.84h-.12a138.13 138.13 0 0 1 -25.94 2.49c-2.54 0-5.1-.08-7.64-.23l-11.74 12.21a4.66 4.66 0 0 1 -8-3.23v-11.59a29.69 29.69 0 0 1 -7.79-3.61c-7.38-4.69-13.78-12.48-15.62-19.88v-.12a101.55 101.55 0 0 1 0-43.69v-.13c2.56-10.38 14.13-21.51 24.79-23.83h.12a137.68 137.68 0 0 1 51.82 0h.12c5.74 1.25 11.75 5.07 16.47 10 4 4.15 7.12 9.1 8.3 13.87v.13a101.55 101.55 0 0 1 0 43.65z"/>' }
};
/* every wireframe glyph that appears in the chrome/menus/cards → its icon key.
   ★ is only mapped for the chrome (Бонуси); card rating ★ is never touched. */
var UIV_EMOJI = {
  '🏠':'home','👤':'user','♡':'heart','♥':'heart','❤️':'heart','☆':'star','★':'star',
  '🛒':'cart','🔍':'search','📍':'pin','☰':'burger','▦':'grid','▾':'chevron','▲':'chevUp','›':'caret','🔔':'bell',
  '🥛':'jar','🍚':'cup','⚗️':'flask','🧬':'dna','⚡':'bolt','🔥':'flame','💧':'drop','🍫':'bar',
  '💊':'capsule','🧴':'dumbbell','🏷️':'tag','🌿':'leaf','🛡️':'shield','💪':'trending','🏃':'pulse',
  '🎯':'target','✦':'spark','🎓':'cap',
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
  if(UIV_BRAND[key]){
    return '<span class="uiv-ic uiv-brand"><svg viewBox="' + UIV_BRAND[key].vb + '" fill="currentColor" ' +
      'aria-hidden="true">' + UIV_BRAND[key].p + '</svg></span>';
  }
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
  /* PDP state pages carry two content glyphs of their own: the OOS «🔔 Повідомити»
     button and the coach-tier header (🎓). Scoped per element - no other body copy
     is ever touched by the icon swap. */
  document.querySelectorAll('.oosbtn, .coachbox .cbh').forEach(uivIcons);
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
  uivCheckboxes();
  /* the auth dialog is opened from the header of EVERY page, so the colour layer
     hooks it everywhere - not only on the auth reference renders */
  uivAuth();
  uivFav();
  uivPatchMenus();
  uivTiers();
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
    /* filter facets AND the auth opt-in - one checkbox, one behaviour */
    var lbl = e.target.closest ? e.target.closest('.fopt, .optin') : null;
    if(!lbl) return;
    var cb = lbl.querySelector('.cb');
    if(!cb) return;
    e.preventDefault();
    var on = cb.classList.toggle('on');
    lbl.setAttribute('aria-checked', on ? 'true' : 'false');
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
/* Google and Apple marks are BRAND marks, not part of the Solar set - they live here,
   next to the only place that uses them, so the icon set stays the project's own
   language. A sign-in row that draws them as letters reads as a placeholder; people
   pick these buttons by the mark. (The wireframe glyph  is also a blank box outside
   Apple's own system font.) */
var UIV_GOOGLE = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
  '<path fill="#4285F4" d="M21.6 12.23c0-.68-.06-1.34-.18-1.96H12v3.7h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.74 2.98-4.3 2.98-7.26z"/>' +
  '<path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.75-5.6-4.1H3.06v2.58A10 10 0 0 0 12 22z"/>' +
  '<path fill="#FBBC05" d="M6.4 13.93a6 6 0 0 1 0-3.84V7.5H3.06a10 10 0 0 0 0 9l3.34-2.57z"/>' +
  '<path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.95 2.98 14.7 2 12 2a10 10 0 0 0-8.94 5.5L6.4 10.1c.8-2.36 3-4.11 5.6-4.11z"/></svg>';
var UIV_APPLE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
  '<path d="M16.6 12.6c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.2-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.6 2.2-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7 1.9-1 2.6-2.1c.8-1.2 1.2-2.3 1.2-2.4-.1 0-2.2-.9-2.2-3.7z"/>' +
  '<path d="M14.5 6.2c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.6-.9 2.5 1 .1 2-.4 2.6-1.1z"/></svg>';
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

  /* product tabs answer a click (like the listing's sort control): the data behind
     them is fixed in a wireframe, but a tab that never moves reads as broken */
  var tabs = [].slice.call(page.querySelectorAll('.ptab'));
  tabs.forEach(function(t){
    t.addEventListener('click', function(){
      tabs.forEach(function(x){ x.classList.remove('on'); });
      t.classList.add('on');
    });
  });

  uivCurrency(page);
}

/* ============================================================
   ACCOUNT (node 7.x). Thin on purpose: the shell, the cards and every state
   already live in _wf.css, so the colour layer only has to reach the two regions
   that carry glyphs - the section nav (injected by wfAccountNav, so uivChrome's
   fixed id list never sees it) and the content panel. It runs AFTER uivChrome, so
   the rating star, the fav heart and the tier jars are already real icons by then
   and the blanket swap can no longer take them.
   ============================================================ */
function uivAccount(){
  document.querySelectorAll('#acc-nav, .acc-main').forEach(uivIcons);
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

/* Withdrawn 2026-07-31 (owner: «а чого іконка золота злетіла? стала порожня?»).
   The pass emptied the jar of any tier the buyer had not reached yet - which broke the
   mark, because the jar's FILL LEVEL already carries which tier it is (low / mid / high).
   Emptying it to mean «not yours» loaded one variable with two meanings, so «Золото»
   stopped looking like gold and started looking like an icon that failed to load.
   The rule now: fill = rank, colour = metal, and the STATE is the rung's job -
   border, ground and the status word under it. Level 0 (the empty jar) stays what it
   always was: no tier at all, on a brand-new account. */

/* ============================================================
   LOYALTY TIER MARK - a honey jar that fills up (owner's call 2026-07-30).
   The wireframe used the 🥉🥈🥇 medal emoji: three unrelated pictograms in someone
   else's drawing style, and a medal says «you competed», which is not what a loyalty
   tier is. A honey jar says it in our own language: the bear's own reward, shaped
   like the tub the store actually sells, and the mechanic is literally a level that
   fills - lifetime spend fills the jar. One shape, three fills, three metals.
   Colours are the AA-safe end of each metal, because the mark carries meaning.
   ============================================================ */
function uivTier(level){
  /* level 0 = no tier yet (a brand-new account): the same jar, EMPTY. The mechanic is
     the picture - lifetime spend fills it - so «nothing bought yet» has to be an empty
     jar, not a bronze one the buyer has not earned. */
  var lv = Math.max(0, Math.min(3, level || 0));
  var fill = '';
  if(lv > 0){
    var top = [15.8, 12.6, 8.8][lv - 1];
    var h = (19.6 - top).toFixed(1);
    /* the honey sits UNDER the outline, so the jar's own line always closes over it */
    fill = '<rect x="6.8" y="' + top + '" width="10.4" height="' + h + '" rx="1.4" fill="currentColor" stroke="none"/>';
  }
  return '<span class="uiv-ic uiv-tier t' + lv + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + fill +
    '<path d="M5.9 7h12.2v10.5a3 3 0 0 1-3 3H8.9a3 3 0 0 1-3-3z"/>' +
    '<path d="M8.9 3.6h6.2a1.1 1.1 0 0 1 1.1 1.1V7H7.8V4.7a1.1 1.1 0 0 1 1.1-1.1z"/>' +
    '</svg></span>';
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
      if(UIV_TIER_EMOJI[part]){
        var w = document.createElement('span');
        w.innerHTML = uivTier(UIV_TIER_EMOJI[part]);
        if(w.firstChild) frag.appendChild(w.firstChild);
      } else frag.appendChild(document.createTextNode(part));
    });
    tn.parentNode.replaceChild(frag, tn);
  });
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
        '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
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
