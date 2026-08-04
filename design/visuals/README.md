# Own visuals

The product's own images: one colour treatment, one light, one surface. Generated, not stocked, so
the style is reproducible - a new banner six months from now has to sit next to these without
looking borrowed.

- **Version:** v1.0 (2026-08-04)
- **Shown on:** the screens themselves; the register below is the source of truth for how a new one
  is made.
- **Split from `design/concept/assets/` on 2026-08-04.** The two folders answer different questions.
  `design/concept/assets/` = **how the language was found** (brand plates, logo files, mascot poses and
  faces used as generation references). `visuals/` = **what the product shows** (banners, trust
  photos, blog photos, product renders, brand marks, the auth panel photograph). Anything the buyer
  sees belongs here.

## The recipe

Every image in this folder was generated with **Magnific on Google Nano Banana 2**, 4k, using an
already-approved render as the visual reference so the light matches. Three rules make them one set:

1. **One warm seamless surface** for anything shot "on a table" - the same backdrop as the product
   renders. Product renders themselves come on their own white ground.
2. **One light**: soft key from the upper left, no hard shadow, no coloured rim.
3. **No text baked into the image.** The claim is HTML on a scrim, so it can be translated, edited
   and read by a screen reader. An image with a headline drawn into it is a dead end.

Failing any of the three, regenerate rather than colour-correct: the point is that the recipe
reproduces, not that one file is rescued.

## Register

| File | Where it stands | Note |
|---|---|---|
| `banner-new-a.jpg`, `-b.jpg` | home hero, "Новинки" | b is the alternative crop |
| `banner-promo-a.jpg`, `-b.jpg` | home, promo of the week | wide banner, claim sits left on a warm scrim, **no timer** |
| `trust-cert.jpg` · `trust-delivery.jpg` · `trust-pay.jpg` · `trust-return.jpg` | home trust strip | four of the five mini-banners; each one links to the page that proves it |
| `blog-protein.jpg` · `blog-creatine.jpg` · `blog-goals.jpg` | home blog cards | cropped by height, blended with `multiply` |
| `product-whey.png` · `product-creatine.png` · `product-preworkout.png` | product cards, PDP, kit | the three pack renders that stand in for the whole catalogue |
| `mascot-gym-a.jpg`, `-b.jpg` | auth dialog, left panel | full-bleed photograph, two scrims (light under the wordmark, ink under the promise card) |
| `mascot-face-reassure.png` · `-concern.png` · `-curious.png` | empty states, PDP notes | the mascot answers where a person would |
| `np-mark.png` | delivery rows | Nova Poshta mark |
| `brands/*.png` | home brand showcase | **not ours.** See the warning below. |

## Warning: `brands/`

Those are **other companies' trade marks**, pulled from a competitor's CDN while building the
showcase. They are fine for an internal prototype and **must be replaced with official files before
any public showing**. The six were chosen from our own brand pool (`category-matrix.md`) among the
marks that were actually available; BSN was dropped because a yellow-on-white mark disappears in
greyscale.

They are desaturated by default and regain brand colour on hover: real marks arrive in six different
styles, and desaturation is what makes them one row. The slot is failure-tolerant - `onerror` removes
the image and a wordmark shows instead - so a missing logo degrades rather than breaks.

## Adding one

1. Generate with the recipe above, referencing an existing file for light.
2. Drop it here, add a row to the register with **where it stands**.
3. If it needs a new CSS rule, that rule goes in `kit.css`, never on the page.

An image with no row here, or a row with no screen, is the same defect in two directions.
