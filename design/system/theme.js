/* design/system/theme.js - the theme, applied BEFORE the first paint.

   Why this is a file in <head> and not a line in the nav panel. The panel is
   rendered by design/kit/_nav.js, which loads at the END of the body: by then
   the page has already painted, so a theme applied there arrives as a FLASH of
   the light theme on every load. The pack names exactly this: «перевір, що він
   застосовує тему до першого рендера (data-theme на <html>, вибір у
   localStorage), щоб сторінка не блимала світлим».

   It lives in `system/` and not in `kit/` for the same reason `tokens.css`
   does: the theme belongs to the system, and the product will load this same
   file when its own switcher goes in at step 8. The kit's panel only CALLS it.

   TWO STATES, NOT THREE, and the missing one is deliberate. An `auto` mode
   following `prefers-color-scheme` would need the whole dark block declared a
   SECOND time inside a media query - 85 roles duplicated, and CSS gives no way
   to share one declaration block between a selector and a media query. Two
   copies of 85 values diverge on the first edit, which is the defect this file
   exists downstream of. The pack asks for the attribute and localStorage, and
   that is what this is. */
(function () {
  var KEY = 'stack-theme';
  var read = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };

  function apply(mode) {
    var el = document.documentElement;
    if (mode === 'dark') el.setAttribute('data-theme', 'dark');
    else el.removeAttribute('data-theme');
  }

  apply(read());

  /* 11.5 - THE THEME SWITCH IS THE ONLY MOMENT IN THIS PRODUCT WHERE HALF THE
     DOCUMENT MOVES AT ONCE, and nobody ordered it. Measured on `listing.html`:
     2006 elements, of which 463 carry a colour transition, and flipping
     `[data-theme]` starts every one of them - 32.1ms of style recalculation in
     one go, and 150ms of animating a palette. Those transitions were written for
     HOVER; the whole page cross-fading is a side effect of 463 hover rules, which
     is the same argument that removed `transition: all`.
     The class is put on for ONE frame. `requestAnimationFrame` twice, because the
     first callback runs BEFORE the style change has been painted - taking the
     class off there would let the transitions start after all. The second one
     runs after the new palette is on screen, which is when it is safe again. */
  function still(fn) {
    var el = document.documentElement;
    el.classList.add('uiv-theming');
    fn();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.remove('uiv-theming'); });
    });
  }

  /* Called by the panel. Returns the mode it landed on, so the caller redraws
     its own label instead of keeping a second copy of the state. */
  window.uivTheme = function (mode) {
    if (!mode) mode = read() === 'dark' ? 'light' : 'dark';
    try { mode === 'dark' ? localStorage.setItem(KEY, 'dark') : localStorage.removeItem(KEY); } catch (e) {}
    still(function () { apply(mode); });
    return mode;
  };

  window.uivThemeNow = function () { return read() === 'dark' ? 'dark' : 'light'; };
})();
