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

/* ------------------------------------------------------------------
   RULE 3: SIX CELLS ARE ONE FIELD - step 7.15.

   A code from an SMS is one value. The markup has to be six inputs, because one
   box per digit is what the person is asked to read back, but nothing about that
   makes it six fields, and the moment it behaves like six the control is broken:
   type a digit, then reach for the mouse, click the next box, type, click, type.
   Six digits, five clicks.

   Measured before this file took the job: the auth dialog DID advance - one line
   inside `wfAuthDigits()` in the grey runtime, bound to `#wf-auth`. So the
   behaviour existed on exactly one screen out of the places the component
   appears, and both showcase pages had none of it at all: on `otp.html` and in
   the `field.html` demo every cell had to be clicked. The behaviour was right;
   its address was wrong, which is the same sentence rule 2 above had to write
   about the phone.

   WHAT «NEXT» MEANS. The next FREE cell, not simply the next one. Filling an
   empty group left to right the two are identical; they differ when somebody
   comes back to fix the third digit of six, and there sending them to the end
   of the group would be wrong. Same rule backwards on Backspace.

   AND CLICKING ANYWHERE LANDS WHERE THE WORK IS. Click the fifth box of an empty
   group and the caret goes to the first - there is nothing to type in the fifth
   yet. Click a box that already holds a digit and it stays, because that is
   somebody correcting one digit on purpose.

   WHAT IS NOT HERE. Refusing a letter is rule 1 above and already covers these
   cells (`inputmode="numeric"`). `autocomplete="one-time-code"` is set on first
   focus by rule 1 as well, so the OS may offer the code from the SMS - and when
   it does, it arrives as a PASTE of six digits into one cell, which is why the
   paste below distributes rather than truncates. */
var UIV_OTP_SEL = '.otp .box';

function uivOtpGroup(cell){
  var g = cell.closest ? cell.closest('.otp') : null;
  return g ? [].slice.call(g.querySelectorAll('.box')) : [cell];
}
function uivOtpGo(cells, from, dir){
  /* the first EMPTY cell in that direction; if there is none, the adjacent one,
     so a full group can still be walked and overwritten */
  var i, step = dir > 0 ? 1 : -1;
  for(i = from + step; i >= 0 && i < cells.length; i += step){
    if(!cells[i].value) return cells[i];
  }
  return cells[from + step] || null;
}
function uivOtpFocus(el){
  if(!el) return;
  el.focus();
  /* select, so the next digit REPLACES instead of being refused by maxlength */
  try{ el.select(); }catch(e){}
}
/* One value spread over the boxes: used by a paste and by the OS filling the
   code. It has to fire `input` on every cell it writes, because that is the
   event the auth dialog listens to; the flag is what stops each of those from
   re-running the advance below and racing this loop. Returns the cell the
   person should be left in. */
function uivOtpSpread(cells, from, digits){
  var group = cells[0].closest('.otp');
  if(group) group.dataset.uivFill = '1';
  var i, k = 0;
  for(i = from; i < cells.length && k < digits.length; i++, k++){
    cells[i].value = digits.charAt(k);
    cells[i].dispatchEvent(new Event('input', { bubbles: true, cancelable: false }));
  }
  if(group) delete group.dataset.uivFill;
  return cells[Math.min(i, cells.length - 1)];
}

(function(){
  var is = function(el){ return el && el.matches && el.matches(UIV_NUMERIC_SEL); };
  var isOtp = function(el){ return el && el.matches && el.matches(UIV_OTP_SEL); };

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
    /* A CODE PASTED INTO ONE CELL BELONGS TO THE GROUP - rule 3. Without this
       the generic path below cuts it to `maxlength`, i.e. to one digit, and
       «Ваш код 4821» leaves a lone 4 and five empty boxes. Measured: that is
       exactly what happened, and `field.html` had it logged as this component's
       job rather than the field's. It is still the field's file, but it is the
       GROUP's rule, which is why it lives beside the other two. */
    if(isOtp(el)){
      var code = raw.replace(/\D/g, '');
      e.preventDefault();
      if(!code) return;
      var cells = uivOtpGroup(el);
      uivOtpFocus(uivOtpSpread(cells, cells.indexOf(el), code));
      return;
    }
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

  /* ---- rule 3, the OTP group ---------------------------------------------
     CAPTURE, and for a reason worth stating. The auth dialog binds its own
     `input` listener on each cell, and the first thing that listener does is
     `value.slice(0, 1)`. A listener on the element runs before one delegated on
     the document, so by bubble time the OS's six-digit autofill would already
     have been cut to one digit and the other five lost. Running first, this sees
     what actually arrived. */
  document.addEventListener('input', function(e){
    var el = e.target;
    if(!isOtp(el)) return;
    /* `.on` says «this cell holds a digit» - a property of the cell, so it is
       the group's business and not one screen's. The auth dialog also sets it;
       both write the same class from the same value, so nothing fights.

       ABOVE the fill guard, not below it. Measured with it below: a pasted code
       landed in all six boxes and none of them went ink, because every cell the
       spread writes is announced by an `input` the guard then turns away. The
       guard exists to stop the FOCUS from racing the loop, not to stop a cell
       from saying what it holds. */
    el.classList.toggle('on', !!el.value);
    var group = el.closest('.otp');
    if(group && group.dataset.uivFill) return;      /* uivOtpSpread is mid-loop */
    if(!el.value) return;                            /* a delete, not a digit */
    var cells = uivOtpGroup(el);
    /* the OS filling the code, or an IME, can put the WHOLE code in one cell
       even with maxlength=1 - so a long value is a code, not a digit */
    if(el.value.length > 1){
      var d = el.value.replace(/\D/g, '');
      el.value = '';
      uivOtpFocus(uivOtpSpread(cells, cells.indexOf(el), d));
      return;
    }
    uivOtpFocus(uivOtpGo(cells, cells.indexOf(el), 1));
  }, true);

  document.addEventListener('keydown', function(e){
    var el = e.target;
    if(!isOtp(el)) return;
    var cells = uivOtpGroup(el), i = cells.indexOf(el);
    if(e.key === 'Backspace'){
      /* a cell with a digit clears itself and stays - one press, one digit
         gone. Only an already-empty cell hands the press to its neighbour,
         which is what makes holding Backspace walk the group backwards. */
      if(el.value) return;
      var prev = cells[i - 1];
      if(!prev) return;
      e.preventDefault();
      prev.value = '';
      prev.dispatchEvent(new Event('input', { bubbles: true }));
      uivOtpFocus(prev);
      return;
    }
    if(e.key === 'ArrowLeft' && cells[i - 1]){ e.preventDefault(); uivOtpFocus(cells[i - 1]); return; }
    if(e.key === 'ArrowRight' && cells[i + 1]){ e.preventDefault(); uivOtpFocus(cells[i + 1]); return; }
  });

  /* Clicking anywhere in the group lands where the work is. Only when the cell
     is EMPTY: a click on a digit is somebody correcting that digit on purpose,
     and moving them off it would be the control arguing with them. */
  document.addEventListener('focusin', function(e){
    var el = e.target;
    if(!isOtp(el)) return;
    var cells = uivOtpGroup(el), i = cells.indexOf(el);
    if(el.value){ try{ el.select(); }catch(err){} return; }
    for(var k = 0; k < i; k++){
      if(!cells[k].value){ uivOtpFocus(cells[k]); return; }
    }
  });
})();
