/* ============================================================
   design/system/fields.js - the field's own behaviour, and so far it holds one
   rule: A FIELD WHOSE VALUE IS A NUMBER TAKES DIGITS AND NOTHING ELSE.

   Why this is code and not a note in the spec: the three ways a product usually
   "does" this are all hints, and none of them refuses a letter.

     inputmode="numeric"  picks the keypad on a touch device. On a desktop, on a
                          hardware keyboard, and on paste it does nothing at all.
     type="tel"           picks a keypad too and restricts nothing - `tel` is a
                          text field by spec, because phone numbers hold +, -, ( ).
     type="number"        refuses most letters but lets `e`, `E`, `+`, `-` and `.`
                          through, because it accepts scientific notation.

   Measured on the coloured screens before this file existed: 35 fields whose
   value is a number, five different declarations between them, and not one of
   them stopped a letter. So the rule is enforced at the input itself, on the two
   events that can put a character into a field - a keystroke and a paste.

   WHICH FIELDS - step 7. The address used to be a list of three component names
   (`.otp .box`, `.in.uiv-num`, `input[type=tel]`), which is the same defect the
   CSS had: a rule that only reaches the places somebody remembered to name. A
   fourth numeric field written tomorrow would have taken letters and nobody
   would have been told.

   The address is now the DECLARATION the markup already makes about the value:

     input[type="number"]        the two ends of the price filter
     input[type="tel"]           a phone number
     input[inputmode="numeric"]  a digit of an SMS code, and anything else that
     input[inputmode="tel"]      asks for a numeric keypad

   That is a statement about the VALUE, not about the look, which is why the
   guard does NOT read `.field--mono`: mono is how a number is set, not proof
   that the value is one.

   And deliberately NOT the branch field ("Відділення / поштомат - номер або
   назва"): it declares no numeric keyboard, because a number may appear in it
   but its value is not a number. "A field where a digit can occur" and "a field
   whose value is a number" are different things, and only the second one may
   refuse letters.

   The phone keeps `+` and the space: the checkout and the coach dialog hold the
   whole number as `+380 67 123 45 67`, while the auth dialog holds only the nine
   digits after its own `+380` cell.

   Delegated on the document on purpose - the auth dialog, the client dialog and
   the filter sheet are built by script long after this file runs, and a pass that
   walks the DOM once would miss every one of them.
   ============================================================ */
var UIV_NUMERIC_SEL = 'input[type="number"], input[type="tel"], ' +
                      'input[inputmode="numeric"], input[inputmode="tel"]';

function uivNumericKeep(el, s){
  /* a phone is written with a plus and spaces; a code and a price are not */
  return el.type === 'tel' ? s.replace(/[^\d+ ]/g, '') : s.replace(/\D/g, '');
}
function uivNumericTidy(el, s){
  /* only after a paste: dropping «тел. +38 (067) 123-45-67» down to its digits
     leaves the holes where the words were, and a phone that begins with a space
     is not a value anybody typed */
  return el.type === 'tel' ? s.replace(/\s+/g, ' ').trim() : s;
}

/* ------------------------------------------------------------------
   RULE 2: a phone field groups its digits while they are typed.

   Measured before this existed: four phone fields in the product, and exactly
   ONE of them grouped - the auth dialog, because `wfAuthDigits()` in the grey
   script binds to `id="wfa-phone"`. The checkout, the coach's client dialog and
   the showcase's own demo showed `324234234`, a string nobody recognises as
   their number. The behaviour was right; its address was wrong. A rule attached
   to one id is not a component rule, it is that screen's private habit.

   Ukraine only (a locked product decision), so the shape is fixed: the country
   code 380 and nine digits after it, read as `XX XXX XX XX`. Two placements:

     the field sits after a `.cc` cell    the cell holds +380, the field holds
                                          the nine digits: «32 423 42 34»
     the field holds the whole number     it prints its own prefix:
                                          «+380 32 423 42 34»

   The caret is kept by counting digits, not characters: reformatting rewrites
   the whole value, and a caret restored by character index jumps every time a
   space appears in front of it. */
function uivPhoneShape(el){
  var box = el.closest ? el.closest('.ph-field') : null;
  return (box && box.querySelector('.cc')) ? 'national' : 'whole';
}
function uivPhoneRender(digits, shape){
  var d = digits;
  var out = d.slice(0, 2);
  if(d.length > 2) out += ' ' + d.slice(2, 5);
  if(d.length > 5) out += ' ' + d.slice(5, 7);
  if(d.length > 7) out += ' ' + d.slice(7, 9);
  return shape === 'whole' ? ('+380' + (out ? ' ' + out : '')) : out;
}
/* The nine digits, whatever the person actually typed or pasted. People write
   the same number four ways - «+380 67…», «+38 (067)…», «067…», «67…» - and all
   four mean one number, so the field accepts all four and stores one. Stripping
   is safe in both shapes: no Ukrainian operator code begins with 380 or with 0. */
function uivPhoneDigits(raw){
  var d = raw.replace(/\D/g, '');
  if(d.indexOf('380') === 0) d = d.slice(3);
  if(d.length > 9 && d.charAt(0) === '0') d = d.slice(1);
  return d.slice(0, 9);
}
function uivPhoneFormat(el){
  var shape = uivPhoneShape(el);
  var pos = el.selectionStart;
  var raw = el.value;
  var before = pos === null ? -1 : (raw.slice(0, pos).match(/\d/g) || []).length;
  /* the prefix this field printed itself is not something the person typed, so
     it is taken off before normalising - otherwise a typed «380…» hides behind
     the printed «+380» and survives as part of the number */
  var typedPart = raw, skipped = 0;
  if(shape === 'whole' && raw.indexOf('+380') === 0){ typedPart = raw.slice(4); skipped = 3; }
  var all = typedPart.replace(/\D/g, '');
  var d = uivPhoneDigits(typedPart);
  /* the caret counts digits, so it moves by however many the front lost */
  if(before >= 0) before = Math.max(0, before - skipped - (all.length - d.length));
  var out = uivPhoneRender(d, shape);
  if(out === el.value) return;
  el.value = out;
  if(before < 0) return;
  /* put the caret after the same digit it was after */
  var seen = 0, i = 0;
  if(shape === 'whole'){ i = 4; seen = 0; }        /* skip «+380 » */
  for(; i < out.length && seen < before; i++) if(/\d/.test(out[i])) seen++;
  try{ el.selectionStart = el.selectionEnd = i; }catch(e){}
}

(function(){
  var is = function(el){ return el && el.matches && el.matches(UIV_NUMERIC_SEL); };

  /* the keyboard hint is set on first focus, so a field built by script at any
     later moment still gets it, and the markup stays free of the same three
     attributes repeated forty times */
  document.addEventListener('focusin', function(e){
    var el = e.target;
    if(!is(el) || el.dataset.uivNum) return;
    el.dataset.uivNum = '1';
    el.setAttribute('inputmode', 'numeric');
    if(el.type !== 'number') el.setAttribute('pattern', el.type === 'tel' ? '[0-9+ ]*' : '[0-9]*');
    /* the SMS code arrives while the field is open - let the OS offer it */
    if(el.closest('.otp')) el.setAttribute('autocomplete', 'one-time-code');
  }, true);

  /* a keystroke: refuse the character instead of accepting it and cleaning up
     afterwards, so the caret never jumps and the value is never briefly wrong */
  document.addEventListener('beforeinput', function(e){
    var el = e.target;
    if(!is(el) || e.data == null) return;
    if(uivNumericKeep(el, e.data) !== e.data) e.preventDefault();
  }, true);

  /* a paste: do not refuse it - people paste the code out of the SMS with its
     whole sentence around it. Take the digits and drop the rest. */
  document.addEventListener('paste', function(e){
    var el = e.target;
    if(!is(el)) return;
    var raw = (e.clipboardData || window.clipboardData).getData('text') || '';
    var keep = uivNumericTidy(el, uivNumericKeep(el, raw));
    if(keep === raw) return;
    e.preventDefault();
    if(!keep) return;
    if(el.maxLength > 0) keep = keep.slice(0, el.maxLength);
    var s = el.selectionStart, t = el.selectionEnd;
    if(s === null || el.type === 'number'){ el.value = keep; }
    else { el.value = el.value.slice(0, s) + keep + el.value.slice(t);
           el.selectionStart = el.selectionEnd = s + keep.length; }
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, true);

  /* grouping runs after the value has changed, on the same event any script
     would listen to - so a field the auth dialog already formats gets the same
     string twice and nothing moves */
  /* CAPTURE, so this runs before any listener bound on the element itself. The
     auth dialog still has its own `wfAuthDigits`, which truncates to nine digits
     with no idea that the first three might be a country code - running after it
     would mean formatting a number it had already cut. Running first leaves it a
     value that is already nine digits and correct, so its pass changes nothing. */
  document.addEventListener('input', function(e){
    var el = e.target;
    if(el && el.matches && el.matches('input[type="tel"]')) uivPhoneFormat(el);
  }, true);
})();
