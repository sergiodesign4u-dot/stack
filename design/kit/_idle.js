/* _idle.js - the stand's idle control, in ONE edition.

   Every component page declares `KIT_CLS` (the classes its css file owns) and
   `KIT_STS` (the conditions it can name but not stand live), and a box at the
   bottom says whether the page actually showed them. That check lived inside
   each page as an inline copy - **74 of them** - and the copies had drifted into
   four editions. Three of the four differed only in where a string wrapped, and
   the fourth mattered: `plan-card` and `upsell` carried a version with the
   states clause DELETED, so those two pages could not have reported an unnamed
   state if they had one. That is the shape `CLAUDE.md` bans by name - «a check
   rebuilt from memory each step is a hand fix» - applied to the checker itself.
   One file, included once per page, and the page keeps only its own two lists.

   IT READS THE FRAME TOO, and the honest note is that this was worth far less
   than it looked. Twenty-five pages show their organism in `<iframe
   class="kp-frame">`, and the inline check counted only `.kp-demo` in its own
   document, so the frame's contents were invisible to it. Measured across the
   nineteen red pages: **4 of 162** missing classes live inside a frame - three
   on `toolbar`, `co-wrap` on `checkout-form`. `account-shell`'s frame turned out
   to hold the nav and nothing else, the same three classes the check already
   counted. The other 158 are not hidden anywhere; the pages simply owe them.
   Four is still four, and a page red for a reason that is not true is exactly
   what this pass is about.

   `KIT_EXTRA` is the escape hatch for a page whose classes exist only after an
   act the page can perform on itself: `toast` fires one of each, reads the
   stack, and clears it. A page that cannot perform the act does not get a hatch
   - it declares the condition in `KIT_STS` and names it in words. */
(function(){
  var run = function(){
    var rendered = new Set(), named = new Set();
    var eat = function(e){ if(e.classList) e.classList.forEach(function(c){ rendered.add(c); }); };
    document.querySelectorAll('.kp-demo *').forEach(eat);
    document.querySelectorAll('iframe.kp-frame').forEach(function(f){
      var d = null;
      try { d = f.contentDocument; } catch(err){ d = null; }
      if(d) d.querySelectorAll('body *').forEach(eat);
    });
    if(typeof KIT_EXTRA === 'function') KIT_EXTRA(rendered);

    document.querySelectorAll('code, .kp-code').forEach(function(e){
      (e.textContent.match(/[.]([a-zA-Z][\w-]*)/g) || []).forEach(function(c){ named.add(c.slice(1)); });
      (e.textContent.match(/class="([^"]+)"/g) || []).forEach(function(m){
        m.slice(7, -1).split(/\s+/).forEach(function(c){ named.add(c); });
      });
    });
    var page = document.body.textContent;
    var onlyNamed = KIT_CLS.filter(function(c){ return !rendered.has(c) && named.has(c); });
    var missing = KIT_CLS.filter(function(c){ return !rendered.has(c) && !named.has(c); });
    var missSts = KIT_STS.filter(function(st){ return page.indexOf(st) === -1; });
    var box = document.getElementById('idle');
    if(!box) return;
    var pill = function(a){ return '<code>' + a.join('</code> <code>') + '</code>'; };
    if(!onlyNamed.length && !missing.length && !missSts.length){
      box.innerHTML = '<div class="kp-do"><h4>Пройдено</h4>Усі <b>' + KIT_CLS.length +
        '</b> класів файлу відрендерені в демо, названо станів: <b>' + KIT_STS.length +
        '</b>.</div>';
    } else {
      box.innerHTML = '<div class="kp-gap"><h4>Файл показано не повністю</h4>' +
        (missing.length ? '<p><b>' + missing.length + ' з ' + KIT_CLS.length +
          '</b> класів на сторінці немає взагалі: ' + pill(missing) + '</p>' : '') +
        (onlyNamed.length ? '<p style="margin-top:8px"><b>' + onlyNamed.length +
          '</b> лише названо словами, але не показано в демо: ' + pill(onlyNamed) + '</p>' : '') +
        (missSts.length ? '<p style="margin-top:8px"><b>' + missSts.length + ' з ' + KIT_STS.length +
          '</b> - стільки станів оголошено і не названо: ' + pill(missSts) + '</p>' : '') + '</div>';
    }
  };
  /* AFTER THE PASSES HAVE RUN, never at parse time. This rule was already
     written, on ONE page out of 74: `icon.html`'s copy waited for
     DOMContentLoaded because `marks.js` puts `.uiv-trail` on the mark then, and
     at parse time the check called a class the page renders one it merely names.
     Its own note said «the other kit pages still check at parse time; there it
     changes nothing» - which was true of their demos and not of the rule. The
     check exists to measure what a person SEES, and a person sees the page after
     the passes. A frame loads later still, so a page that has one waits for
     `load`. */
  var ready = function(ev, test){
    if(test()) run(); else window.addEventListener(ev, run);
  };
  if(document.querySelector('iframe.kp-frame'))
    ready('load', function(){ return document.readyState === 'complete'; });
  else
    ready('DOMContentLoaded', function(){ return document.readyState !== 'loading'; });
})();
