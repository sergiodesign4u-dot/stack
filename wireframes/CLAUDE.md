# wireframes/ - the grey contract (read this before touching anything here)

1. Grey and immutable. Colour never lands in this folder. It lives in copies under `design/`, which own the visual layer and nothing else. Voice is the last stage that edits text here; after it this folder is frozen.
2. Structure, text and states belong to this folder. A colour copy that changes any of the three is a defect, not a variant.
3. `_wf.css` is the single source of appearance. Inline CSS on a screen is allowed only as a genuine one-off and only through `var()`. Anything that repeats on two or more screens moves into `_wf.css`.
4. Global chrome (header, footer, filter rail, bottom sheet) is rendered from `_nav.js`, not typed into pages. Voice edits those strings there, so a page that hardcodes them silently drifts from the whole product.
5. `index.html` is the product home screen and `overview.html` is the all-screens hub. Never swap the two.
6. Nothing is invented here. A block, page or state that appears first in a wireframe is an IA defect: fix the node in `ia/docs/` upward, then render it.
7. Full contract: `docs/conventions.md`. Screen and state matrix: `docs/screens.md`. Screen registry: `_nav.js`.
