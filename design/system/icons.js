/* ============================================================
   design/system/icons.js - THE icon set, and the only edition of it.

   It moved here from design/_nav.js, and the kit page is why. A set that lives
   in the stand script can only be SHOWN by copying it, so design/kit/icons.html
   pasted a build-time copy - and the copy drifted: `trash` was written as three
   concatenated strings, the paste captured the first one, and the design system
   displayed a bin with no body while the product rendered the whole glyph. The
   fix is not a better parser, it is one edition: the system owns the glyphs,
   the stand renders them, the showcase reads them at runtime.

   ANATOMY - one rule for the whole set, drawn out on design/kit/icons.html:
     viewBox    0 0 24 24    the module grid
     safe area  2            ink lives in 2..22, measured BY THE INK: the stroke
                             sits outside the contour, so paint runs 0.95 past
                             the geometry of the path
     stroke     1.9          one weight for the set, round cap and join
     colour     currentColor never declared by a glyph, always inherited
   Sizes and the exceptions to the weight (2.4 / 2.6 under 14px) live in
   design/system/components/icon.css - this file is the drawing, not the scale.
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
  /* step 7.5. The head keeps `caret`'s 45 degrees, so the two marks read as one
     family: a caret is the head alone, an arrow is the head on a shaft. Ink runs
     x 3.6..20.4 and y 5.6..18.4, which with the set's 1.9 stroke paints 2.65..21.35
     - inside the safe area, like every other glyph. */
  arrowRight:'<path d="M3.6 12h16.8"/><path d="M14 5.6l6.4 6.4-6.4 6.4"/>',
  bell:'<path d="M6.5 10.5a5.5 5.5 0 0 1 11 0c0 4.8 2 6.3 2 6.3H4.5s2-1.5 2-6.3z"/><path d="M9.8 20a2.3 2.3 0 0 0 4.4 0"/>',
  /* categories */
  jar:'<path d="M6.5 9h11v9.3a1.5 1.5 0 0 1-1.5 1.5H8a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M8 9V6.3A1.3 1.3 0 0 1 9.3 5h5.4A1.3 1.3 0 0 1 16 6.3V9"/><path d="M9.5 13h5"/>',
  cup:'<path d="M6 8h12l-1 10.4a1.6 1.6 0 0 1-1.6 1.6H8.6A1.6 1.6 0 0 1 7 18.4z"/><path d="M8.5 8V6.5A1.5 1.5 0 0 1 10 5h4a1.5 1.5 0 0 1 1.5 1.5V8"/>',
  /* Redrawn 2026-08-05 (owner: «у етой иконки есть брак»). Two counters were closing
     up: the neck was 3 modules wide, so a 1.9 stroke left 1.1 of white inside it, and
     the level line stopped 1.0 short of each wall - close enough for the round caps to
     merge with the walls into a lump instead of a junction. Now the neck is 3.6 wide
     and the line runs wall to wall, which is what a level actually does. */
  flask:'<path d="M9 3.2h6M10.2 3.2v6l-4.6 9.1A2 2 0 0 0 7.6 20.8h8.8a2 2 0 0 0 1.8-2.5L13.8 9.2V3.2"/><path d="M6.5 16.6h11"/>',
  dna:'<path d="M8 3c0 5 8 6 8 9s-8 4-8 9M16 3c0 5-8 6-8 9s8 4 8 9"/><path d="M9 6.3h6M8.6 17.7h6.8M10 9.4h4M10 14.6h4"/>',
  bolt:'<path d="M13 3L6 13h5l-1 8 8-11h-5l1-7z"/>',
  /* Redrawn 2026-08-05 (owner: «не правильно сформирована и размер и сдвиг»). The old
     flame was 9.9 x 13.9 of ink against a set median of 18.5, and it sat 3 modules
     ABOVE the centre - so in the catalogue menu «Жироспалювачі» read as a small mark
     floating over its own line while `bolt` next to it filled the cell. Same drawing,
     scaled 1.42 about the optical centre: 13.3 x 18.9, dy 0.00. `drop` is its
     neighbour in that menu and had the same fault at 11.9 x 15.9 / dy -1.00, so it is
     scaled with it - a column of glyphs is judged against itself, not one at a time. */
  flame:'<path d="M12 3.5c1.4 4.3 5.7 6.1 5.7 11.3a5.7 5.7 0 0 1-11.4 0c0-2.1.7-3.4 1.6-4.3.4 1.4 1.4 2.3 2.4 2.6C9.5 10.2 10.3 6.3 12 3.5z"/>',
  drop:'<path d="M12 3.5c3.7 4.9 6.1 7.8 6.1 11a6.1 6.1 0 0 1-12.2 0c0-3.2 2.4-6.1 6.1-11z"/>',
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
  trash:'<path d="M4.6 6.8h14.8"/><path d="M9.4 6.8V5.2a1.2 1.2 0 0 1 1.2-1.2h2.8a1.2 1.2 0 0 1 1.2 1.2v1.6"/><path d="M6.4 6.8 7.3 19a1.3 1.3 0 0 0 1.3 1.2h6.8a1.3 1.3 0 0 0 1.3-1.2l.9-12.2"/><path d="M10.4 10.2v6M13.6 10.2v6"/>',
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
  viber: { vb:'0 0 176 176', p:'<path d="m129.54 61.54c-.77-3-3-6.42-5.8-9.35-3.44-3.6-7.84-6.53-11.69-7.39a128 128 0 0 0 -48.11 0c-7 1.56-15.77 10-17.48 16.74a92 92 0 0 0 0 39.49c1.38 5.46 7.37 12 13.3 15.14a16.6 16.6 0 0 0 4.18 1.61.65.65 0 0 1 .54.64v19.2a1.06 1.06 0 0 0 1.83.73l9.13-9.35 8.56-8.8a.62.62 0 0 1 .48-.2 129.12 129.12 0 0 0 27.56-2.22c7-1.56 15.77-10 17.49-16.75a92 92 0 0 0 .01-39.49zm-17.24 40.46a14.81 14.81 0 0 1 -6.36 7 14.48 14.48 0 0 1 -2.75.88c-1.07-.33-2.09-.54-3-.94a75.6 75.6 0 0 1 -20.85-12.3 55 55 0 0 1 -5.23-5.13 67.64 67.64 0 0 1 -10-15.27c-1.28-2.6-2.36-5.31-3.46-8-1-2.45.48-5 2-6.82a15.83 15.83 0 0 1 5.37-4 3.44 3.44 0 0 1 4.31 1 56.27 56.27 0 0 1 6.67 9.33 4.45 4.45 0 0 1 -1.25 6c-.5.34-1 .75-1.43 1.13a4.55 4.55 0 0 0 -1.08 1.15 3.13 3.13 0 0 0 -.24 2.78c1.93 5.31 4.86 9.73 9.24 12.84a23.91 23.91 0 0 0 4.76 2.62 7.14 7.14 0 0 0 3.58.87c2.18-.26 2.9-2.66 4.42-3.91a4.19 4.19 0 0 1 5-.22c1.62 1 3.18 2.12 4.74 3.23a52.2 52.2 0 0 1 4.45 3.39 3.54 3.54 0 0 1 1.11 4.37zm-14.36-24a2.11 2.11 0 0 1 -.12-.51 14.07 14.07 0 0 0 -.3-2 5.8 5.8 0 0 0 -2.14-3.36 5.9 5.9 0 0 0 -1.73-.84c-.79-.22-1.62-.16-2.4-.35a1.48 1.48 0 0 1 -1.2-1.71 1.55 1.55 0 0 1 1.63-1.25c4.58.34 8 2.54 8.88 7.45a11.48 11.48 0 0 1 .19 1.38 4 4 0 0 1 0 1.25 1.29 1.29 0 0 1 -1.06 1h-.22a1.5 1.5 0 0 1 -1.53-1.06zm-1.46-12.39a18 18 0 0 0 -4.86-1.49c-.74-.12-1.48-.19-2.22-.29a1.41 1.41 0 0 1 -1.33-1.58 1.39 1.39 0 0 1 1.55-1.37 20.26 20.26 0 0 1 8.43 2.2 17 17 0 0 1 7.45 7.35 19.28 19.28 0 0 1 1.84 5.91 7.54 7.54 0 0 1 .12.81c.05.6.07 1.19.12 1.94v.28a4 4 0 0 1 -.12.88 1.47 1.47 0 0 1 -2.76.14 4.22 4.22 0 0 1 -.15-1.24 16.1 16.1 0 0 0 -1.3-6.5 13.63 13.63 0 0 0 -.67-1.32 14.64 14.64 0 0 0 -6.1-5.72zm16.52 18.44c-1 0-1.49-.85-1.56-1.78-.13-1.83-.23-3.67-.48-5.49a22.34 22.34 0 0 0 -3.14-8.66 23 23 0 0 0 -15.4-10.58c-1.44-.25-2.91-.31-4.36-.47-.92-.09-2.13-.15-2.33-1.3a1.58 1.58 0 0 1 1.55-1.77h1.07a26.54 26.54 0 0 1 21.65 12 26.24 26.24 0 0 1 3.78 9.68c.38 2.17.52 4.39.69 6.59a1.55 1.55 0 0 1 -1.47 1.78z"/><path d="m88 0a88 88 0 1 0 88 88 88 88 0 0 0 -88-88zm50.83 103.13v.12c-2.56 10.39-14.14 21.52-24.77 23.84h-.12a138.13 138.13 0 0 1 -25.94 2.49c-2.54 0-5.1-.08-7.64-.23l-11.74 12.21a4.66 4.66 0 0 1 -8-3.23v-11.59a29.69 29.69 0 0 1 -7.79-3.61c-7.38-4.69-13.78-12.48-15.62-19.88v-.12a101.55 101.55 0 0 1 0-43.69v-.13c2.56-10.38 14.13-21.51 24.79-23.83h.12a137.68 137.68 0 0 1 51.82 0h.12c5.74 1.25 11.75 5.07 16.47 10 4 4.15 7.12 9.1 8.3 13.87v.13a101.55 101.55 0 0 1 0 43.65z"/>' },
/* Google and Apple sign-in marks. Brand marks again, and Google breaks the rule
   twice over: it is four colours of its own, declared on the paths, because a
   one-colour Google mark is not the Google mark. `root:''` keeps the <svg> free of
   fill="currentColor" so those path fills are what the browser sees.
   A sign-in row that draws them as letters reads as a placeholder - people pick
   these buttons by the mark. */
  google: { vb:'0 0 24 24', root:'', p:'<path fill="#4285F4" d="M21.6 12.23c0-.68-.06-1.34-.18-1.96H12v3.7h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.74 2.98-4.3 2.98-7.26z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.75-5.6-4.1H3.06v2.58A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.4 13.93a6 6 0 0 1 0-3.84V7.5H3.06a10 10 0 0 0 0 9l3.34-2.57z"/><path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.95 2.98 14.7 2 12 2a10 10 0 0 0-8.94 5.5L6.4 10.1c.8-2.36 3-4.11 5.6-4.11z"/>' },
  apple: { vb:'0 0 24 24', p:'<path d="M16.6 12.6c0-2.2 1.8-3.2 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.2-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.6 2.2-1.5 2.7-.4 6.6 1.1 8.8.7 1.1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7 1.9-1 2.6-2.1c.8-1.2 1.2-2.3 1.2-2.4-.1 0-2.2-.9-2.2-3.7z"/><path d="M14.5 6.2c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.6-.9 2.5 1 .1 2-.4 2.6-1.1z"/>' }
};

/* The anatomy as code. A glyph is a body; the frame around it is fixed, and it
   is fixed in ONE place - the stand, the showcase and any later consumer build
   their markup from here, they do not retype the attributes. */
function uivIconSvg(key){
  if(!UIV_P[key]) return '';
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + UIV_P[key] + '</svg>';
}
function uivBrandSvg(key){
  var b = UIV_BRAND[key];
  if(!b) return '';
  /* `root` overrides the default fill: a mark that carries its own colours (Google)
     must not have currentColor sitting above them */
  /* the mark names itself, so CSS can size it by its own ink - see icon.css */
  return '<svg viewBox="' + b.vb + '" data-mark="' + key + '"' +
    (b.root === undefined ? ' fill="currentColor"' : b.root) +
    ' aria-hidden="true">' + b.p + '</svg>';
}

/* The rating star is the SAME glyph as the chrome star, filled. One drawing, two
   finishes: outline for a nav chip, filled for a rating - a second path would be a
   second star to keep in sync. Colour comes from --star, never from the glyph. */
function uivStarSvg(){
  return '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" ' +
    'stroke-width="1.9" stroke-linejoin="round" aria-hidden="true">' + UIV_P.star + '</svg>';
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
function uivTierSvg(level){
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
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + fill +
    '<path d="M5.9 7h12.2v10.5a3 3 0 0 1-3 3H8.9a3 3 0 0 1-3-3z"/>' +
    '<path d="M8.9 3.6h6.2a1.1 1.1 0 0 1 1.1 1.1V7H7.8V4.7a1.1 1.1 0 0 1 1.1-1.1z"/>' +
    '</svg>';
}
/* the level is also a class on the wrapper (t0..t3 carry the metal), so the clamp
   has to be readable from outside - one arithmetic, not two */
function uivTierLevel(level){ return Math.max(0, Math.min(3, level || 0)); }
