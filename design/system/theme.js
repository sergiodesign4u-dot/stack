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

  /* Called by the panel. Returns the mode it landed on, so the caller redraws
     its own label instead of keeping a second copy of the state. */
  window.uivTheme = function (mode) {
    if (!mode) mode = read() === 'dark' ? 'light' : 'dark';
    try { mode === 'dark' ? localStorage.setItem(KEY, 'dark') : localStorage.removeItem(KEY); } catch (e) {}
    apply(mode);
    return mode;
  };

  window.uivThemeNow = function () { return read() === 'dark' ? 'dark' : 'light'; };
})();
