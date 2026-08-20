# Responsive - the census, the width audit and the component registry

Stage 10, step 1. Three tables and no line of css. The first says **how it is** and it is a
measurement, not an opinion. The second says **how it should be** and it is a decision about the
product, not about pixels. The third says **who will actually do it**, and it is per component,
because adaptation lives in a component and not in a screen.

The order carries weight at both joints. An audit made without the census would have added a third
point beside two already in the code and nobody would have noticed. A registry derived from the
audit instead of from `inventory.md` would silently lose every component that stands only on screens
in the category «the same».

Sections «Shell», «Component behaviour» and «Container thresholds» are empty on purpose and name the
step that fills them.

## A. The census - how it is

Mechanical, by grep, over four corpora whose fate is different.

| corpus | files | point | fluid | container |
|---|---:|---:|---:|---:|
| `design/system/` - the home | 88 | 171 | 121 | 164 |
| `design/*.html` - a foreign place | 92 | 1 | 10 | 12 |
| `design/kit/` - the stand, not the product | 103 | 56 | 115 | 127 |
| `wireframes/` - the frozen witness | 143 | 176 | 210 | 152 |

**53 of the 88 files in `design/system/` already carry an `@media`.** The single `@media` living in a
screen file is `design/overview.html:24`, and that is the stage hub rather than a product screen, so
the ban step 4 writes down is in practice already held.

**What does not exist at all:** `@container` **0** · `container-type` **0** · `clamp()` **0** ·
`rem` inside a media query **0** · any token for width, container or grid **0**. Every boundary is in
`px` and every one of them measures the viewport.

`minmax(` appears 27 times but `auto-fit` / `auto-fill` only 3: most grids in this system carry a
FIXED column count. `ch` appears 6 times in 3 files, so the line measure is almost nowhere.

### The headline number: how many different widths the project holds today

**36 raw values, 27 after mirroring** (`max-width: 859` is the mirror of the 860 boundary),
**18 of them acting in the product**.

| boundary | `design/system/` | `design/*.html` | stand | grey | total |
|---:|---:|---:|---:|---:|---:|
| 0px | 0 | 0 | 1 | 0 | 1 |
| 420px | 1 | 0 | 0 | 0 | 1 |
| 480px | 16 | 0 | 9 | 3 | 28 |
| 481px | 0 | 0 | 0 | 1 | 1 |
| 520px | 1 | 0 | 0 | 1 | 2 |
| 521px | 2 | 0 | 0 | 4 | 6 |
| 560px | 5 | 0 | 1 | 0 | 6 |
| 561px | 0 | 0 | 1 | 6 | 7 |
| 620px | 13 | 0 | 0 | 19 | 32 |
| 621px | 2 | 0 | 0 | 0 | 2 |
| 640px | 9 | 0 | 2 | 11 | 22 |
| 641px | 0 | 0 | 0 | 1 | 1 |
| 700px | 0 | 0 | 0 | 1 | 1 |
| 720px | 23 | 0 | 6 | 21 | 50 |
| 760px | 6 | 0 | 2 | 6 | 14 |
| 761px | 1 | 0 | 0 | 0 | 1 |
| 800px | 0 | 0 | 0 | 2 | 2 |
| 820px | 0 | 0 | 0 | 1 | 1 |
| 860px | 47 | 1 | 26 | 33 | 107 |
| 881px | 0 | 0 | 1 | 0 | 1 |
| 900px | 6 | 0 | 4 | 2 | 12 |
| 921px | 0 | 0 | 1 | 0 | 1 |
| 940px | 4 | 0 | 0 | 32 | 36 |
| 960px | 9 | 0 | 5 | 26 | 40 |
| 980px | 1 | 0 | 0 | 1 | 2 |
| 1040px | 2 | 0 | 0 | 5 | 7 |
| 1180px | 3 | 0 | 1 | 0 | 4 |

**Three seams overlap.** 520, 620 and 760 are each written both as `min-width: N` and as
`max-width: N`, so at exactly N both rules fire. They are not three boundaries, they are three
boundaries written twice with a one pixel fault.

## B. The width audit - how it should be

Corpus: all 141 screens of `wireframes/`, read together with `research/docs/jtbd.md` and
`research/docs/cjm-to-be.md`. The question is not «how do I squeeze a desktop onto a phone» and not
«how do I stretch it», it is **what a wider screen gives the person in the work they are doing here**.

**Idle control: 141 screens in the corpus, 141 rows in the table, 0 without a row.**

| category | screens |
|---|---:|
| THE SAME | 64 |
| WIDER, grid | 24 |
| WIDER, air | 14 |
| NEW BEHAVIOUR | 39 |

**39 is far past the three or four the method expects, and here is the honest reading.** 39 is a
count of SCREENS. The count of BEHAVIOURS is **eight**, and seven of them already stand in the code:

1. the shell changes the carrier of its top-level navigation at 860 (4 screens)
2. the catalogue rail opens from the home screen (1)
3. the mega menu is a flyout instead of a drawer (4)
4. the filter sheet becomes a permanent rail at 860 (9)
5. the PDP puts gallery and buy box side by side and drops the sticky buy bar (4)
6. the cart is a panel instead of a drawer at 620 (3)
7. checkout puts form and summary side by side (3)
8. **split view for the coach flow - MISSING (11 screens)**

Only the eighth is new work, and its source is not a preference: the product's main job says
literally «build a complete order for each client **in one session**», and on a phone the coach walks
back and forth between the client list and that client's basket. It is the candidate for step 5.

| screen | what the person does | category | by what | job or barrier |
|---|---|---|---|---|
| `404` | reads one message and leaves | THE SAME | container | – |
| `500` | reads one message and leaves | THE SAME | container | – |
| `account` | looks over the account: orders, bonuses, addresses | WIDER · grid | fluid (auto-fit) + container | – |
| `account-addresses` | goes through their own list | WIDER · grid | fluid (auto-fit) | – |
| `account-addresses-add` | fills an address form in a dialog | THE SAME | container | – |
| `account-addresses-courier` | fills an address form in a dialog | THE SAME | container | – |
| `account-addresses-delete` | fills an address form in a dialog | THE SAME | container | – |
| `account-addresses-edit` | fills an address form in a dialog | THE SAME | container | – |
| `account-addresses-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `account-addresses-postomat` | fills an address form in a dialog | THE SAME | container | – |
| `account-addresses-viddilennia` | fills an address form in a dialog | THE SAME | container | – |
| `account-empty` | looks over the account: orders, bonuses, addresses | WIDER · grid | fluid (auto-fit) + container | – |
| `account-error` | reads an error and retries | THE SAME | container | – |
| `account-loading` | looks over the account: orders, bonuses, addresses | WIDER · grid | fluid (auto-fit) + container | – |
| `account-loyalty` | goes through their own list | WIDER · grid | fluid (auto-fit) | – |
| `account-loyalty-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `account-loyalty-max` | goes through their own list | WIDER · grid | fluid (auto-fit) | – |
| `account-orders` | goes through their own list | WIDER · grid | fluid (auto-fit) | – |
| `account-orders-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `account-profile` | edits one field of the profile | THE SAME | container | – |
| `account-profile-delete` | edits one field of the profile | THE SAME | container | – |
| `account-profile-email` | edits one field of the profile | THE SAME | container | – |
| `account-profile-lang` | edits one field of the profile | THE SAME | container | – |
| `account-profile-phone` | edits one field of the profile | THE SAME | container | – |
| `account-profile-withemail` | edits one field of the profile | THE SAME | container | – |
| `account-wishlist` | goes through their own list | WIDER · grid | fluid (auto-fit) | – |
| `account-wishlist-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `account-wishlist-many` | goes through their own list | WIDER · grid | fluid (auto-fit) | – |
| `auth` | enters a phone number and the code from the SMS | THE SAME | container ~420 | – |
| `auth-code` | enters a phone number and the code from the SMS | THE SAME | container ~420 | – |
| `auth-error` | enters a phone number and the code from the SMS | THE SAME | container ~420 | – |
| `auth-loading` | enters a phone number and the code from the SMS | THE SAME | container ~420 | – |
| `auth-newuser` | enters a phone number and the code from the SMS | THE SAME | container ~420 | – |
| `brands` | picks a brand or a category from a set of tiles | WIDER · grid | fluid (auto-fit) | – |
| `brands-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `brands-error` | reads an error and retries | THE SAME | container | – |
| `brands-loading` | picks a brand or a category from a set of tiles | WIDER · grid | fluid (auto-fit) | – |
| `cart` | goes through the cart | NEW BEHAVIOUR · in the code | point 620 (panel instead of a drawer) | Job 4, reorder without effort |
| `cart-coach` | goes through the cart | NEW BEHAVIOUR · in the code | point 620 (panel instead of a drawer) | Job 4, reorder without effort |
| `cart-coach-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `cart-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `cart-oos` | goes through the cart | NEW BEHAVIOUR · in the code | point 620 (panel instead of a drawer) | Job 4, reorder without effort |
| `catalog-page` | picks a brand or a category from a set of tiles | WIDER · grid | fluid (auto-fit) | – |
| `catalog-page-error` | reads an error and retries | THE SAME | container | – |
| `catalog-page-loading` | picks a brand or a category from a set of tiles | WIDER · grid | fluid (auto-fit) | – |
| `checkout` | places the order | NEW BEHAVIOUR · in the code | point 860 (form and summary side by side) | Job 2, finish the first purchase without wandering |
| `checkout-declined` | waits, or reads that the payment failed | THE SAME | container | – |
| `checkout-loading` | waits, or reads that the payment failed | THE SAME | container | – |
| `checkout-loggedin` | places the order | NEW BEHAVIOUR · in the code | point 860 (form and summary side by side) | Job 2, finish the first purchase without wandering |
| `checkout-noaddr` | places the order | NEW BEHAVIOUR · in the code | point 860 (form and summary side by side) | Job 2, finish the first purchase without wandering |
| `coach-client` | keeps the client list and opens a profile | NEW BEHAVIOUR · MISSING | point 860, split view list + detail | MAIN JOB, build a complete order for each client in one session |
| `coach-client-edit` | fills or confirms a client card in a dialog | THE SAME | container | – |
| `coach-client-edit-confirm` | fills or confirms a client card in a dialog | THE SAME | container | – |
| `coach-client-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `coach-client-error` | reads an error and retries | THE SAME | container | – |
| `coach-client-loading` | keeps the client list and opens a profile | NEW BEHAVIOUR · MISSING | point 860, split view list + detail | MAIN JOB, build a complete order for each client in one session |
| `coach-client-new` | fills or confirms a client card in a dialog | THE SAME | container | – |
| `coach-clients` | keeps the client list and opens a profile | NEW BEHAVIOUR · MISSING | point 860, split view list + detail | MAIN JOB, build a complete order for each client in one session |
| `coach-clients-cap` | keeps the client list and opens a profile | NEW BEHAVIOUR · MISSING | point 860, split view list + detail | MAIN JOB, build a complete order for each client in one session |
| `coach-clients-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `coach-clients-error` | reads an error and retries | THE SAME | container | – |
| `coach-clients-loading` | keeps the client list and opens a profile | NEW BEHAVIOUR · MISSING | point 860, split view list + detail | MAIN JOB, build a complete order for each client in one session |
| `coach-home` | looks over the coach cabinet | WIDER · grid | fluid (auto-fit) + container | – |
| `coach-home-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `coach-home-error` | reads an error and retries | THE SAME | container | – |
| `coach-home-free` | looks over the coach cabinet | WIDER · grid | fluid (auto-fit) + container | – |
| `coach-home-loading` | looks over the coach cabinet | WIDER · grid | fluid (auto-fit) + container | – |
| `coach-landing` | reads the wholesale landing page | WIDER · grid | fluid + container | – |
| `coach-order` | reads one coach order, client by client | WIDER · grid | fluid + container | – |
| `coach-order-error` | reads an error and retries | THE SAME | container | – |
| `coach-order-loading` | reads one coach order, client by client | WIDER · grid | fluid + container | – |
| `coach-orders` | goes through the list of orders | WIDER · grid | fluid | – |
| `coach-orders-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `coach-orders-error` | reads an error and retries | THE SAME | container | – |
| `coach-orders-loading` | goes through the list of orders | WIDER · grid | fluid | – |
| `coach-session` | builds orders for several clients in one session | NEW BEHAVIOUR · MISSING | point 860, split view clients + that client basket | MAIN JOB, literally: build a complete order for each client in one session |
| `coach-session-addclient` | builds orders for several clients in one session | NEW BEHAVIOUR · MISSING | point 860, split view clients + that client basket | MAIN JOB, literally: build a complete order for each client in one session |
| `coach-session-addempty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `coach-session-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `coach-session-loading` | builds orders for several clients in one session | NEW BEHAVIOUR · MISSING | point 860, split view clients + that client basket | MAIN JOB, literally: build a complete order for each client in one session |
| `coach-session-newclient` | builds orders for several clients in one session | NEW BEHAVIOUR · MISSING | point 860, split view clients + that client basket | MAIN JOB, literally: build a complete order for each client in one session |
| `coach-session-oos` | builds orders for several clients in one session | NEW BEHAVIOUR · MISSING | point 860, split view clients + that client basket | MAIN JOB, literally: build a complete order for each client in one session |
| `coach-session-priceblock` | builds orders for several clients in one session | NEW BEHAVIOUR · MISSING | point 860, split view clients + that client basket | MAIN JOB, literally: build a complete order for each client in one session |
| `coach-tariff` | compares the two tiers side by side | WIDER · grid | fluid (flex-wrap) | – |
| `coach-tariff-cancel` | confirms cancelling the tier in a dialog | THE SAME | container | – |
| `coach-tariff-free` | compares the two tiers side by side | WIDER · grid | fluid (flex-wrap) | – |
| `coach-verify` | applies for wholesale access, waits, reads the answer | THE SAME | container | – |
| `coach-verify-deadend` | applies for wholesale access, waits, reads the answer | THE SAME | container | – |
| `coach-verify-error` | applies for wholesale access, waits, reads the answer | THE SAME | container | – |
| `coach-verify-loading` | applies for wholesale access, waits, reads the answer | THE SAME | container | – |
| `coach-verify-tier` | applies for wholesale access, waits, reads the answer | THE SAME | container | – |
| `coach-wishlist` | goes through the coach wishlist | WIDER · grid | fluid (auto-fit) | – |
| `content-about` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-article` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-blog` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-contacts` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-delivery` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-faq` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-guarantee` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-legal` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-loyalty` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-loyalty-buyer` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-newsletter` | reads that the subscription is confirmed | THE SAME | container | – |
| `content-promo` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-returns` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `content-reviews` | reads continuous prose | WIDER · air | container + line measure in ch | – |
| `goal` | filters the results | NEW BEHAVIOUR · in the code | point 860 (permanent filter rail against a sheet) + fluid grid | Job 3, narrowing to a safe set. Barrier: the filter takes two taps, not seven |
| `goal-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `goal-error` | reads an error and retries | THE SAME | container | – |
| `goal-loading` | filters the results | NEW BEHAVIOUR · in the code | point 860 (permanent filter rail against a sheet) + fluid grid | Job 3, narrowing to a safe set. Barrier: the filter takes two taps, not seven |
| `home-buyer` | enters the product: hero, goals, picks | NEW BEHAVIOUR · in the code | point 860 (shell) + fluid | Job 2, the first confident choice. The header changes the carrier of top-level navigation |
| `home-cart` | enters the product: hero, goals, picks | NEW BEHAVIOUR · in the code | point 860 (shell) + fluid | Job 2, the first confident choice. The header changes the carrier of top-level navigation |
| `home-catalog` | opens the catalogue as a rail of categories | NEW BEHAVIOUR · in the code | point 860 (overlay against rail) | Job 3, entering the catalogue |
| `home-coach` | enters the product: hero, goals, picks | NEW BEHAVIOUR · in the code | point 860 (shell) + fluid | Job 2, the first confident choice. The header changes the carrier of top-level navigation |
| `index` | enters the product: hero, goals, picks | NEW BEHAVIOUR · in the code | point 860 (shell) + fluid | Job 2, the first confident choice. The header changes the carrier of top-level navigation |
| `listing` | filters the results | NEW BEHAVIOUR · in the code | point 860 (permanent filter rail against a sheet) + fluid grid | Job 3, narrowing to a safe set. Barrier: the filter takes two taps, not seven |
| `listing-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `listing-error` | reads an error and retries | THE SAME | container | – |
| `listing-filtered` | filters the results | NEW BEHAVIOUR · in the code | point 860 (permanent filter rail against a sheet) + fluid grid | Job 3, narrowing to a safe set. Barrier: the filter takes two taps, not seven |
| `listing-list` | filters the results | NEW BEHAVIOUR · in the code | point 860 (permanent filter rail against a sheet) + fluid grid | Job 3, narrowing to a safe set. Barrier: the filter takes two taps, not seven |
| `listing-loading` | filters the results | NEW BEHAVIOUR · in the code | point 860 (permanent filter rail against a sheet) + fluid grid | Job 3, narrowing to a safe set. Barrier: the filter takes two taps, not seven |
| `listing-sheet` | filters the results | NEW BEHAVIOUR · in the code | point 860 (permanent filter rail against a sheet) + fluid grid | Job 3, narrowing to a safe set. Barrier: the filter takes two taps, not seven |
| `maintenance` | reads one message and leaves | THE SAME | container | – |
| `megamenu` | opens the catalogue from the header | NEW BEHAVIOUR · in the code | point 860 (flyout against drawer) | Job 3, navigating the catalogue |
| `megamenu-health` | opens the catalogue from the header | NEW BEHAVIOUR · in the code | point 860 (flyout against drawer) | Job 3, navigating the catalogue |
| `megamenu-protein` | opens the catalogue from the header | NEW BEHAVIOUR · in the code | point 860 (flyout against drawer) | Job 3, navigating the catalogue |
| `megamenu-vitamins` | opens the catalogue from the header | NEW BEHAVIOUR · in the code | point 860 (flyout against drawer) | Job 3, navigating the catalogue |
| `order-placed` | reads the confirmation, the number and the next step | THE SAME | container | – |
| `order-placed-account-end` | reads the confirmation, the number and the next step | THE SAME | container | – |
| `product` | studies the product and adds it to the cart | NEW BEHAVIOUR · in the code | point 860 (gallery and buy box side by side, the sticky bar goes) | Job 3 verify safety + Job 5 show the evidence to the athlete |
| `product-coach` | studies the product and adds it to the cart | NEW BEHAVIOUR · in the code | point 860 (gallery and buy box side by side, the sticky bar goes) | Job 3 verify safety + Job 5 show the evidence to the athlete |
| `product-error` | reads an error and retries | THE SAME | container | – |
| `product-loading` | studies the product and adds it to the cart | NEW BEHAVIOUR · in the code | point 860 (gallery and buy box side by side, the sticky bar goes) | Job 3 verify safety + Job 5 show the evidence to the athlete |
| `product-oos` | studies the product and adds it to the cart | NEW BEHAVIOUR · in the code | point 860 (gallery and buy box side by side, the sticky bar goes) | Job 3 verify safety + Job 5 show the evidence to the athlete |
| `product-reviews` | reads the reviews and the certificate | WIDER · air | container + line measure | – |
| `quiz` | answers the questions one at a time | THE SAME | container | – |
| `search` | filters the results | NEW BEHAVIOUR · in the code | point 860 (permanent filter rail against a sheet) + fluid grid | Job 3, narrowing to a safe set. Barrier: the filter takes two taps, not seven |
| `search-empty` | sees an empty state and the one way out of it | THE SAME | container | – |
| `search-loading` | filters the results | NEW BEHAVIOUR · in the code | point 860 (permanent filter rail against a sheet) + fluid grid | Job 3, narrowing to a safe set. Barrier: the filter takes two taps, not seven |
| `search-suggest` | sees suggestions under the search field | THE SAME | container | – |
| `system` | a service index of the prototype, not a product screen | THE SAME | container | – |

## C. The component registry - who will actually adapt

Corpus: `design/kit/docs/inventory.md`, row by row, grouped by level, and the anchor walk runs in a
BROWSER over the coloured corpus. **This table was rebuilt at step 4 because the first one was
measured wrongly**, three times over, and the wrong instrument is written up in `tools/comp-width.mjs`
and in `docs/decisions.md`:

1. it asked the GREY corpus. The rename map of stage 08 ran on `design/*.html` only, so the system's
   own class names do not exist in the frozen grey layer at all and `button.css` answered **zero
   screens**. The pack's «count on the grey corpus» is right for counting SCREENS and wrong for
   locating a SYSTEM CLASS - a third case the pack does not name;
2. it read `class="..."` out of the source. `icons.js`, `marks.js` and `fields.js` add classes at
   load, and **68 rows of 85** disagreed with the `Screens` column `inventory.mjs` measures live;
3. it took every class token in the file. An anchor is a class **only one file owns**, or the walk
   measures the neighbour: `otp.css`, three rules about a one-time-code field, answered «91 screens»
   because its selectors also name `.field` and `.btn`.

**Four files have no class of their own** - `badge`, `icon`, `product-thumb`, `counter` - so the
counter cannot answer for them at all. They print `–`, never `0`: that false zero is the one this
repository keeps paying for. Their verdict is decided by reading.

**Why this is a separate table and not a consequence of part B.** The audit asks about a SCREEN; the
adaptation lives in a COMPONENT. There is no one-to-one mapping in either direction. A component that
stands only on screens in the category «the same» never appears in the audit at all, and rides
quietly into stage 12.

**Idle control: 85 files on disk, 85 rows, 0 without a row, 0 rows without a file.** Coverage said out
loud: 50 of the 141 grey screens have no coloured twin, so a component standing only there is
invisible to this walk. By construction that cannot happen, and those screens were measured
separately by `dry-run.mjs`.

**The widest-category column barely discriminates at the atom level** and that is a finding, not a
flaw: an atom stands on 85 to 90 of the 91 coloured screens, listing and PDP and cart among them, so
almost every atom reads «new behaviour». What decides an atom's verdict is not the counter but the
question «must this box change with its place», and that is answered by reading.

| level | component | file | screens | widest category | width today |
|---|---|---|---|---|---|
| atom | Кнопка | `button.css` | 90 | NEW BEHAVIOUR | fluid |
| atom | Поле | `field.css` | 89 | NEW BEHAVIOUR | fluid |
| atom | Чип | `chip.css` | 86 | NEW BEHAVIOUR | `@media` 860 · fluid |
| atom | Дія стовпчиком | `stack-action.css` | 86 | NEW BEHAVIOUR | fluid · container |
| atom | Рядок посилань | `link-row.css` | 85 | NEW BEHAVIOUR | fluid |
| atom | Ціна | `price.css` | 45 | NEW BEHAVIOUR | nothing |
| atom | Рейтинг | `rating.css` | 22 | NEW BEHAVIOUR | nothing |
| atom | Мітка наявності | `availability.css` | 22 | NEW BEHAVIOUR | nothing |
| atom | Бейдж знижки | `discount.css` | 21 | NEW BEHAVIOUR | nothing |
| atom | Обране | `favourite.css` | 21 | NEW BEHAVIOUR | nothing |
| atom | Меню вибору | `menu.css` | 12 | NEW BEHAVIOUR | `@media` 619 · fluid · container |
| atom | Скелетон | `skeleton.css` | 12 | NEW BEHAVIOUR | `@media` 620, 959 · fluid · container |
| atom | Чекбокс | `checkbox.css` | 12 | NEW BEHAVIOUR | nothing |
| atom | Лічильник кількості | `stepper.css` | 12 | NEW BEHAVIOUR | nothing |
| atom | Статус-пілюля | `status-pill.css` | 11 | NEW BEHAVIOUR | nothing |
| atom | Перемикач вигляду | `view-toggle.css` | 11 | NEW BEHAVIOUR | `@media` 860 |
| atom | Радіо | `radio.css` | 9 | NEW BEHAVIOUR | fluid |
| atom | OTP-комірка | `otp.css` | 4 | THE SAME | nothing |
| atom | Перемикач | `switch.css` | 2 | THE SAME | nothing |
| atom | Бейдж | `badge.css` | – | no class of its own | nothing |
| atom | Іконка | `icon.css` | – | no class of its own | nothing |
| atom | Мініатюра товару | `product-thumb.css` | – | no class of its own | nothing |
| atom | Лічильник | `counter.css` | – | no class of its own | nothing |
| molecule | Хлібні крихти | `breadcrumb.css` | 91 | NEW BEHAVIOUR | nothing |
| molecule | Заголовок секції | `section-head.css` | 28 | NEW BEHAVIOUR | `@media` 620 · fluid · container |
| molecule | Порожній стан | `empty-state.css` | 27 | NEW BEHAVIOUR | fluid · container |
| molecule | Щабель лояльності | `loyalty-rung.css` | 26 | NEW BEHAVIOUR | `@media` 760 · fluid |
| molecule | Картка товару | `product-card.css` | 22 | NEW BEHAVIOUR | `@media` 559, 619, 859, 860 · fluid · container |
| molecule | Тост | `toast.css` | 20 | NEW BEHAVIOUR | fluid · container |
| molecule | SEO-текст | `seo-text.css` | 17 | NEW BEHAVIOUR | `@media` 759, 760 · container |
| molecule | Відгук | `review-item.css` | 13 | NEW BEHAVIOUR | `@media` 620, 860 · fluid · container |
| molecule | Рядок кошика | `cart-row.css` | 11 | NEW BEHAVIOUR | fluid |
| molecule | Група фільтра | `filter-group.css` | 11 | NEW BEHAVIOUR | nothing |
| molecule | Тулбар | `toolbar.css` | 11 | NEW BEHAVIOUR | `@media` 860 · fluid |
| molecule | Пагінація | `pagination.css` | 9 | NEW BEHAVIOUR | nothing |
| molecule | Банер | `banner.css` | 6 | NEW BEHAVIOUR | `@media` 559, 720 · fluid · container |
| molecule | Картка блогу | `blog-card.css` | 6 | NEW BEHAVIOUR | `@media` 720 |
| molecule | Смуга довіри | `trust-strip.css` | 5 | NEW BEHAVIOUR | `@media` 479, 559, 719, 720, 1180 · fluid · container |
| molecule | Рядок клієнта | `client-row.css` | 5 | NEW BEHAVIOUR | fluid · container |
| molecule | Галерея | `gallery.css` | 4 | NEW BEHAVIOUR | `@media` 859, 860 · fluid · container |
| molecule | Плитка цілі | `goal-tile.css` | 4 | NEW BEHAVIOUR | `@media` 620, 960 · fluid |
| molecule | Логотип бренду | `brand-logo.css` | 4 | NEW BEHAVIOUR | `@media` 620 · fluid · container |
| molecule | Мініатюра сертифіката | `cert-thumb.css` | 3 | NEW BEHAVIOUR | fluid |
| molecule | Картка адреси | `address-card.css` | 3 | WIDER | `@media` 720 · fluid |
| molecule | Схожі товари | `related.css` | 3 | NEW BEHAVIOUR | fluid |
| molecule | Рядок замовлення | `order-row.css` | 2 | WIDER | `@media` 639, 860 · fluid · container |
| molecule | Таблиця складу | `spec-table.css` | 2 | NEW BEHAVIOUR | `@media` 720 · fluid |
| molecule | Блок опису | `desc-block.css` | 2 | NEW BEHAVIOUR | fluid · container |
| molecule | Запитання | `qa-item.css` | 2 | NEW BEHAVIOUR | nothing |
| molecule | Нотатка про поповнення | `restock-note.css` | 2 | NEW BEHAVIOUR | `@media` 419 · fluid · container |
| organism | Хедер | `header.css` | 86 | NEW BEHAVIOUR | `@media` 859, 860 · fluid · container |
| organism | Шухляда меню | `nav-drawer.css` | 86 | NEW BEHAVIOUR | `@media` 860 · fluid |
| organism | Таб-бар | `tabbar.css` | 86 | NEW BEHAVIOUR | `@media` 859 · container |
| organism | Мега-меню | `mega-menu.css` | 86 | NEW BEHAVIOUR | `@media` 859 · fluid · container |
| organism | Діалог міста | `city-dialog.css` | 86 | NEW BEHAVIOUR | `@media` 479 · fluid · container |
| organism | Оверлей | `overlay.css` | 86 | NEW BEHAVIOUR | nothing |
| organism | Футер | `footer.css` | 81 | NEW BEHAVIOUR | `@media` 479, 720 · fluid · container |
| organism | Смуга покупки | `buy-bar.css` | 69 | NEW BEHAVIOUR | `@media` 859, 860 · container |
| organism | Форма чекауту | `checkout-form.css` | 36 | NEW BEHAVIOUR | `@media` 479, 480, 559, 860 · fluid · container |
| organism | Оболонка кабінету | `account-shell.css` | 33 | NEW BEHAVIOUR | `@media` 640, 959, 960 · fluid · container |
| organism | Сітка товарів | `product-grid.css` | 21 | NEW BEHAVIOUR | `@media` 620, 1040 · fluid |
| organism | Рейка фільтрів | `filter-rail.css` | 15 | NEW BEHAVIOUR | `@media` 859, 860 · container |
| organism | Діалог клієнта | `client-dialog.css` | 13 | NEW BEHAVIOUR | `@media` 479 · fluid · container |
| organism | Шит фільтрів | `filter-sheet.css` | 11 | NEW BEHAVIOUR | `@media` 860 |
| organism | Повзунок ціни | `price-slider.css` | 11 | NEW BEHAVIOUR | fluid |
| organism | Клієнти тренера | `coach-clients.css` | 10 | NEW BEHAVIOUR | `@media` 520, 640, 860 · fluid · container |
| organism | Замовлення тренера | `coach-order.css` | 9 | NEW BEHAVIOUR | `@media` 620 · fluid · container |
| organism | Кабінет тренера | `coach-cabinet.css` | 8 | NEW BEHAVIOUR | `@media` 520, 720 · fluid · container |
| organism | Сесія замовлення | `coach-session.css` | 8 | NEW BEHAVIOUR | `@media` 479, 859, 939, 940 · fluid · container |
| organism | Вкладки товару | `pdp-tabs.css` | 8 | NEW BEHAVIOUR | `@media` 860, 1180 · fluid |
| organism | Перевірка тренера | `coach-verify.css` | 5 | THE SAME | `@media` 520, 760 · fluid · container |
| organism | Шухляда кошика | `cart-drawer.css` | 5 | NEW BEHAVIOUR | `@media` 620 · fluid · container |
| organism | Діалог входу | `auth-dialog.css` | 5 | THE SAME | `@media` 719, 720 · fluid · container |
| organism | Головний блок | `hero.css` | 4 | NEW BEHAVIOUR | `@media` 720, 860 · fluid · container |
| organism | Тариф тренера | `coach-tariff.css` | 3 | WIDER | fluid · container |
| organism | Блок покупки | `buy-box.css` | 3 | NEW BEHAVIOUR | `@media` 479, 619 · fluid · container |
| organism | Картка тарифу | `plan-card.css` | 3 | WIDER | `@media` 640 |
| organism | Модалка відгуку | `review-modal.css` | 3 | NEW BEHAVIOUR | container |
| organism | Панель Pro | `upsell.css` | 2 | NEW BEHAVIOUR | fluid |
| organism | Лендинг тренера | `coach-landing.css` | 1 | WIDER | `@media` 559, 620, 860, 980 · fluid · container |
| organism | Обране тренера | `coach-wishlist.css` | 1 | WIDER | nothing |
| organism | Оверлей каталогу | `cat-overlay.css` | 0 | not worn | `@media` 859 · fluid · container |
| organism | Банер cookie | `cookie-banner.css` | 0 | not worn | `@media` 620 · fluid · container |
| organism | Системна сторінка | `system-page.css` | 0 | not worn | `@media` 720, 859 · fluid · container |
| pattern | Ряд дій | `action-row.css` | 15 | NEW BEHAVIOUR | fluid |


## The ladder of three ways

Read top down. A point is taken only when the fluid way physically cannot do it, and the audit
carries the line saying why.

| | fluid | container | point |
|---|---|---|---|
| question | «will the content stretch by itself?» | «is the line too long?» | «is the behaviour different?» |
| mechanism | `clamp()`, `%`, `minmax(auto-fit)`, `flex-wrap`, `aspect-ratio` | `max-width` + `margin-inline: auto` | `@media` (shell) / `@container` (component) |
| how many in this product | no limit | two: `--container-page`, `--container-text` | **two**: `--bp-grid-2col`, `--bp-shell-wide` |
| proved by | drag the width and nothing breaks | a measured line in `ch` | the audit row that says why fluid could not |

## The registry of points

`@media` is evaluated before the cascade of custom properties, so `@media (min-width: var(--bp-...))`
does not work: no error, the rule simply never fires. The query carries the literal and the token is
the source of truth and the registry. That is not two sources - step 6 greps every `@media` in
`design/system/` and each one must give exactly one of these two numbers.

| token | rem | px | what turns on it | where the number came from |
|---|---|---|---|---|
| `--bp-grid-2col` | `38.75rem` | 620 | the row of cards stops being one column | census: 32 occurrences, `product-grid`, `goal-tile`, `review-item`, `section-head`, `coach-order` all turn here |
| `--bp-shell-wide` | `53.75rem` | 860 | the shell changes the carrier of top-level navigation, and six behaviours turn with it | census: 107 occurrences, the densest number in the project |

The other 16 boundaries acting in the product are either mirrors of these two or drift; step 4 moves
them onto these. Both tokens are in `rem` so a point answers the reader's own font size as well as
the window: somebody who set their browser to 20px sits at a «desktop» width with a mobile amount of
text per line.

## The container and the line measure

| token | value | first reader | the rest |
|---|---|---|---|
| `--container-page` | `75rem` (1200px) | `design/_stand.css .wf-page`, the page frame of every coloured screen since stage 07 | `.co-wrap` (1200) and `.cc-wrap` (900) still write their own number; step 4 |
| `--container-text` | `68ch` | `seo-text.css` `.lintro` and `.seotext p` | the `content-*` prose is still grey; stage 12 |

`--grid-col-min` is `12.5rem` (200px), read out of `product-grid.css`, which already wrote
`minmax(min(200px, 100%), 1fr)` by hand. **The number of columns is not a token**: `auto-fill` reads
it off the width, which is why 1100px gets three columns without anyone planning 1100px.

**`--grid-gap` was NOT created, and the omission is a decision.** The gap of a card grid is
`--space-16`, a rung of the spacing ramp. A `--grid-gap` alias would be a second name for one value,
and `tokens.css` already carries the rule that kills it: «a value used once is a value, not a token».

## Typography

The ramp moved from `px` to `rem`, value for value: at the default root of 16px every rung resolves
to the number it held before, so no screen moves by a pixel, and a reader who set their browser font
to 20px now gets a scale that answers them. Recorded in `tokens-audit.md`.

**The ramp itself stays fixed, on purpose.** It is GENERIC: `--fs-30` is worn by a page H1, by the
live price in the hero deal and by the glyph in an empty state. Wrapping a rung in `clamp()` would
make an icon breathe with the viewport. So the fluid size is a separate token, `--fs-display`, with
three named readers - `.lh1`, `.acc-h1`, `.co-h1` - each of which heads a FULL-WIDTH page.
Deliberately not readers: `.bb h1` (a narrow column beside the gallery: sized by its place, so it
belongs to `@container` at step 4), `.auth-h1` and `.coach .cv-h1` (a dialog and a centred form, both
capped near 420-560), and the price, the figure and the two glyphs that wear the 30 rung because 30
is their size.

`font-size` is never switched at a point.

## The shell - form A, chosen by the owner at step 3

The shell is **the header plus the carrier of top-level navigation plus the page container**. The
form it takes on a wide screen is not a taste: it is read out of the navigation model of stage 03a
(`ia/docs/pages/navigation.md`, node 0.1) by three questions.

| question | answer | what follows |
|---|---|---|
| how many top-level entries | **five**, locked 2026-06-29: Головна · Каталог · Кошик · Обране · Акаунт. Search is deliberately NOT a tab - it lives in the persistent top bar, which frees a slot | five or fewer is the criterion for **form A** |
| is there a second level that must stay visible | in the GLOBAL navigation, no: the catalogue is a flyout, not a permanent tree. The one permanent second level in the product is the **filter rail** from 860, and it belongs to the page | a left rail is not needed, and on a listing it would be a SECOND left column |
| does any screen take side space for new behaviour | **yes**: the coach split view, 11 screens, the step 5 candidate, wants the left column for the client list | the second argument against a rail: the shell would collide with the split view |

**Decision: A.** The entries move into the header and the tab bar is not rendered above the point.
Nothing had to be built - **that form was already in the code**; the step named it, measured it and
wrote it down. The whole change lives in `header.css` and `tabbar.css` and in no screen file.

### What changes at the point, and it is the registry's number

`--bp-shell-wide`, 860. Below it: the tab bar carries the five entries, the header carries the
utilities, **5 focusable entries in the header**. From it: the tab bar is `display: none`, the meta
bar appears, the main menu, the search field and the action zone open, the burger and the mobile icon
row hide, **17 focusable entries in the header**. Neither shell file carries any other number: `859`
is the mirror of the same boundary, and the `899` still visible in `header.css` lives only inside a
comment about a rule removed at 7.25.

### Exactly one carrier, measured rather than asserted

`tools/tab-walk.mjs` presses Tab and reads `document.activeElement`. At **1280** there is **one**
carrier - the header, 17 entries - and the tab bar yields zero focusable stops, because
`display: none` takes it out of the accessibility tree along with the pixels. At **360** there are
two carriers **by role**: the bar is the primary navigation, the header is utilities. **Focus on an
invisible element: 0** at both widths, no positive `tabindex` anywhere, focus order matches visual
order.

**Two entries stand in both carriers at mobile.** «Кошик» is an IA decision - `navigation.md` says «a
slim top bar kept for logo, search and cart» - so the duplicate is deliberate, and it is still a
duplicate in the accessibility tree. «Обране» is **not** in the specification, which names the logo,
search and the cart. That is a finding about the IA, and fixing it in css is forbidden here: how many
entries there are and where they live was decided at stage 03a. **This stage does not revise the
navigation model** - the same entries, the same order, the same states; only the layout of the shell
changes.

### There is no `shell.html` in this project, and that is said out loud

The method assumes an assembled `design/kit/shell.html`. It does not exist here and never has: the
shell lives as two components with their own pages, `header.html` and `tabbar.html`, and both now
carry a «behaviour on width» sub-item in their anatomy block. The live shell in both forms stands in
the «Оболонка» section of `responsive.html`, as two iframes of the real product page at 360 and at
1100. Adding a third page only to display it would have created an artifact with no reader.

## Component behaviour on width

Step 4 runs level by level from the bottom up. **Round 1, atoms, is closed. Rounds 2 to 4 -
molecules, organisms, patterns - are not.** The column «behaviour on width» lands in `inventory.md`
when all four rounds are done: a column filled for one level of four says «unknown» about the other
three in a shape that reads like «nothing to say».

### Round 1: atoms. N = 23, M = 9 adapt, K = 14 deliberately do not. M + K = N

**The roll-call is taken from the registry above and not from the width audit**, because the audit is
sorted by screen and an atom that stands only on «the same» screens never appears in it.

| what happened | atoms |
|---|---|
| already fluid, nothing changed | `field` · `link-row` · `radio` · `stack-action` |
| **the query disappeared into a ramp** | `button`: `@media (max-width: 479px)` gone; the horizontal padding is `clamp()`, 12px at 360 and 16px from 860, and the `font-size` switch on `.btn--l` went with it, because this stage forbids switching a size at a point |
| **the query folded onto a registered point** | `menu`: 479 became 619, the mirror of `--bp-grid-2col`. An open dropdown becoming a full-screen sheet is a BEHAVIOUR, so it stays a point; the only question was which of the product's two |
| **three queries became one, and a defect went with them** | `skeleton`: 620 / 959 / 1040 became `auto-fill` on the same two floors `product-grid.css` uses. On 1280 the real grid gives **three columns of 248px** and the skeleton was drawing **four of 185** - a promise the page never kept. Both now give 248 x 3 to the pixel |
| **the rule moved to its owner** | `status-pill`: `@media (max-width: 639px){ .oh-status{ grid-area: stat } }` moved into `order-row.css`, whose own query at the same width declares the `grid-template-areas` that make `stat` mean anything. Cut, not copied. The atom now carries no width rule at all |
| kept, as a named screen-scope exception | `chip` · `view-toggle`, both on `--bp-shell-wide`. See below |
| **deliberately do not adapt (14)** | `price` · `rating` · `availability` · `discount` · `favourite` · `checkbox` · `stepper` · `otp` · `switch` · `status-pill` · `badge` · `icon` · `product-thumb` · `counter`. One reason for all of them: an inline mark's box is set by its own content - a price, a star row, a discount, a heart, a tick - and it travels with the container that adapts. The last four were decided by reading, because the counter cannot answer for a file with no class of its own |

**Measured, and the promise is asymmetric.** At 360, `tools/tree-diff.mjs` over **all 92 coloured
pages against a baseline differing only in this round: 0 boxes moved.** At 1280 three pages moved -
`listing-loading`, `goal-loading` and `account-loading` - and all three are the skeleton grid coming
into agreement with the grid it promises, which is the row «listing / goal = new behaviour, fluid
grid» of the audit.

### Screen-scope exceptions outside the shell - exactly two, and both on a registered point

The stage says a component measures its CONTAINER and only the shell measures the viewport. Two rules
break that on purpose, and both are here so the check at step 6 can tell them from an oversight.

| file | rule | why a container query cannot ask this |
|---|---|---|
| `chip.css` | `@media (min-width: 860px){ .hero-chips{ display: none } }` | the goal chips hide not because their box got wide, but because from 860 the goal TILES are visible on the same screen and the chips would be a second copy of the same six goals. That is a fact about what the SCREEN shows |
| `view-toggle.css` | `@media (min-width: 860px){ .vtoggle{ display: inline-flex } }` | the grid/list toggle exists only from the shell point, because below it the listing has one column and there is nothing to toggle between. A fact about the screen's layout, not about the toggle's box |

### Round 2: molecules. N = 27, M = 23 adapt, K = 4 deliberately do not. M + K = N

**The roll-call was a proposal, and the measurement overruled a third of it.** Seven files were put
forward as `auto-fit` candidates on the reading that a query saying «now three columns» is a query a
fluid grid can absorb. Four of them cannot be absorbed, and the reason is the same in all four:
`repeat(auto-fit, minmax(F, 1fr))` fills the row, and a FIXED number of items has balanced
arrangements only at its divisors. Six goal tiles want 2, 3 or 6 and never 4+2 or 5+1; six brand
logos want 3 or 6; three blog cards want 1 or 3. No floor exists that gives the divisors and skips
the rest, so the ladder's first rung genuinely cannot do it and the point stays. `tools/grid-sweep.mjs`
is the instrument that said so, and it was written for this round.

| what happened | molecules |
|---|---|
| **the query disappeared into `auto-fit`** | `address-card` `.addr-list` (720 gone) · `loyalty-rung` `.loy-two` (760 gone) · `banner` `.tbanners` (720 gone). All three have a variable or two-item count, so filling the row is exact rather than approximate. The first two read a new token, the third writes an `8rem` literal because it is its only reader |
| **the query disappeared into the base rule** | `restock-note`: 419 gone. `flex-wrap` came up out of the query and the field carries a `13rem` basis, so the row breaks its own line. See the defect below |
| **three sizes stepped at a point and now ramp** | `banner .recbanner`: gap, portrait and `font-size` all stepped at 559. Each ramp ends on the value that stood there before - `--space-12`/`--space-16`, 68/92, `--fs-18`/`--fs-20` - so both ends are unmoved and only the 200px between them stopped being a cliff. `.hpromo`'s `min-height` left its query the same way |
| **folded onto a registered point** | `goal-tile` 960 -> 860 · `blog-card` 720 -> 620 · `spec-table` 720 -> 620 · `banner .hbanners` and `.hpromo` 720 -> 620 · `product-card` 559 -> 619 · `order-row` 639 -> 619 |
| **already on a registered point** | `section-head` 620 · `review-item` 620 + 860 · `gallery` 859/860 · `brand-logo` 620 · `order-row .ob-grid` 860 · `product-card` 619, 859/860 · `toolbar` 860, whose three separate blocks became one |
| **already fluid, nothing to change** | `empty-state` · `toast` · `cart-row` · `client-row` · `cert-thumb` · `desc-block` · `related` |
| **held for the owner (2)** | `trust-strip` (479, 559, 719, 720, 1180) and `seo-text` (759, 760). Three open questions, below |
| **deliberately do not adapt (4)** | `breadcrumb` · `pagination` · `filter-group` · `qa-item` - and measured rather than read |

**The numbers.** Before the round the molecule level held **37 queries over 14 distinct widths**, four
of them in the registry. After it: **30 queries over 11 widths**, and every one of the seven that is
still off-registry stands in the two held files. Nothing else at this level asks about a width the
registry does not name.

**The four that do not adapt were measured, because the instrument that called them «no mechanism»
looks for five markers of the fluid way and inline text is not one of them.**

- `breadcrumb`, 91 screens, the most worn molecule in the product: at 360 the trail wraps to a second
  line on exactly **7 of 72 coloured pages** - the three `coach-order` screens and the four `product`
  screens, 47.2 -> 66.4px - and overflows on none. A trail of inline spans wraps because inline text
  wraps. That is its answer to width and it is the right one.
- `pagination`: zero reflow on all 9 pages. `.pages` is 87.2px and `.loadmore` 169.6px at 360 and at
  1280 alike; they are sized by their own content.
- `filter-group`: at 360 the group has **no box at all** (0x0) and at 1280 it is 238 x 345.7. `.ltool`
  is `display: none` below 860, so on a phone the groups live in the filter sheet. Its PLACE adapts.
- `qa-item`: 157.8 -> 113px, the text rewrapping. Nothing to declare.

**The defect this round found, in a file that had refused to be touched.** `restock-note` carried a
`max-width: 419` query and a comment from step 7.64 defending it: «at 420, 440, 460 and 479 this row
does NOT wrap, its two children come out 26 + 350». Those numbers are the defect, not the proof. The
button wears `btn--full`, its `width: 100%` won on the flex line, and the e-mail field was **26 pixels
wide from 420 all the way to 1600** - measured on `product-oos`: 26 + 350 at 420, 26 + 410 at 480,
26 + 650 at 720. The query below 419 was hiding it, so nothing ever asked. The number is replaced by
the content floor the old comment said it stood for, and at and below 419 the row renders exactly as
before.

**The page container is not monotonic in the viewport width, and `auto-fit` is what exposed it.** The
first floor written for `--grid-col-min-panel` was 22rem. It agreed with the query it replaced at 360
and at 1280 - the two widths anyone looks at - and the sweep found it wrong in between: the account
shell takes its own nav column at 960 and leaves the address list a 628px box, where a 352 floor fits
one card and the query fitted two. At 19rem every column count the query gave is reproduced and one
is added that the query refused: two cards from a 656px window instead of one. A media query asks the
window and cannot see the 216px the shell took; a fluid floor asks the box and cannot help seeing it.

**Measured, and the promise is asymmetric.** `tools/tree-diff.mjs` over all 92 coloured pages against
a baseline differing only in this round's ten files, at 360 and 1280: **6 differences in 184
comparisons**, and every one is named.

| where | what | is it a pixel? |
|---|---|---|
| `.tbanners` @1280, 4 home pages | the computed track list gained two `0px` entries | no. The five real tracks are 196.797 x4 + 196.812 before and after. `auto-fit` collapses the tracks it has no item for and the computed value still lists them |
| `product-oos` @360 | `flex-basis` `0%` -> `208px` on the field and `100%` -> `208px` on the button | no. Both boxes measure 328 x 44 and 328 x 64 before and after |
| `product-oos` @1280 | the field 26px -> 284px, the button 542px -> 284px | **yes, and it is the repair above** |

At 360 not one box moved. Everything else this round changed lives BETWEEN the two widths - 440-719
for the trust banners, 560-619 for the list card, 620-719 for the hero, the blog row and the panel,
656-719 for the two account grids - which is exactly the ground a two-width comparison cannot see and
`grid-sweep` can.

**Three questions are held, and two files with them.**

| question | what is blocked | why it is not mine |
|---|---|---|
| the mascot's number | `seo-text` 759/760, `trust-strip` 1180 | one behaviour - «the mascot appears when there is room beside the text» - written as two unrelated numbers, neither in the registry. It is a question about the PLACE, so `@container` is the honest mechanism and these would be the system's first two container thresholds; folding both onto 860 is the other answer. Picking one silently would invent a design decision |
| the trust strip's separators | `trust-strip` 479, 719, 720 | the strip goes 1 -> 2 -> 4 columns and the hairlines between cells are `nth-child` box-shadows that must KNOW the column count. `auto-fit` makes that count unknowable to CSS. Either the two points stay and fold onto 620/860, or the hairlines are redrawn as a cell border so the count stops mattering - and that changes how the lines are drawn, which needs a pixel check |
| `.cs-act` at 559 | `trust-strip` 559 | it is an action row wrapping, and `patterns/action-row.css` has owned `display: flex` and the wrap for 53 container names since step 9.1. The rule looks like it belongs to round 4, not to this one |

**And one thing is said out loud rather than fixed.** `.listing{ grid-template-columns: 240px 1fr }`
lives in `toolbar.css` and is the listing SCREEN's frame, not the toolbar's. It is legal where it
stands - a component file may carry a query, a screen file may not - but it belongs with the shell of
step 3. Moving it is an organism-round question, and moving it quietly inside a molecule round would
hide it.

**And one finding was withdrawn before it was published, by the rule this repository keeps paying
to relearn.** The sweep reported `.addr-2col`, declared in `address-card.css`, on no coloured page,
which reads as dead. It is not: it stands on `design/kit/client-dialog.html`, a STAND page, and this
instrument's corpus is the product on purpose. A zero from an instrument that cannot see the class is
not a zero. `grid-sweep.mjs` now looks in the stand for anything the product corpus missed and says
which of the two it found, and the wrong version is written in its header.


### Round 3: organisms. N = 34, M = 32 adapt, K = 2 deliberately do not. M + K = N

**The heaviest level of the four, and it halved twice over.** Before the round the 34 organism files
held **86 queries over 19 distinct widths, 15 of them off the registry** - more than the atom and
molecule levels together. After it: **80 queries over 7 widths, 3 off-registry**, and all three stand
in the two files held on purpose. Across the whole of `design/system/` the count is now **117 queries
on 13 widths**, and every off-registry number lives in exactly four files: `trust-strip` and
`seo-text` (the molecule round's three owner questions), `coach-session` (step 5) and `pdp-tabs`
(paired with the mascot).

| what happened | organisms |
|---|---|
| **two queries deleted because they never drew** | `product-grid`. See below - this is the round's largest finding |
| **the query disappeared into a ramp** | `product-grid` and `skeleton` (the floor switch became `--grid-col-fluid`) · `hero` (`min-height` 130/164) · `checkout-form` (a `font-size`, a glyph and a side padding) |
| **the second shell folded onto the first** | `account-shell`: 960/959 -> 860/859, and 640 -> 620. `skeleton`'s owed 959 travelled with it |
| **folded onto a registered point** | `auth-dialog` 720/719 -> 860/859 (eight blocks) · `coach-verify` 760 -> 860, 520 -> 620 · `footer` 479 -> 619, 720 -> 860 · `coach-landing` 980 -> 860, 559 -> 619 · `coach-clients` 640 -> 620, 520 -> 619 · `coach-cabinet` 720 -> 620, 520 -> 619 · `plan-card` 640 -> 620 · `system-page` 720 -> 620 · `buy-box` 479 -> 619 (five blocks) · `city-dialog`, `client-dialog`, `coach-session` 479 -> 619 · `checkout-form` 559 -> 619, 480 -> 620 |
| **already on a registered point** | `header` · `nav-drawer` · `tabbar` · `mega-menu` · `filter-rail` · `filter-sheet` · `buy-bar` · `cart-drawer` · `coach-order` · `cat-overlay` · `cookie-banner` |
| **already fluid or held by a container** | `price-slider` · `coach-tariff` · `review-modal` · `upsell` |
| **held on purpose (2 numbers, 2 files)** | `coach-session` 939/940 - the coach split-view, which belongs to step 5 · `pdp-tabs` 1180 - the same number as the held mascot |
| **deliberately do not adapt (2)** | `overlay` · `coach-wishlist` |

**The largest finding: `product-grid` carried two dead queries and a grid that ran backwards.**

The structure half of the file wrote `repeat(3, 1fr)` at 620 and `repeat(4, 1fr)` at 1040. The colour
half re-declares `.prow` further down with equal specificity, so it won at every width and **neither
of those two rules ever painted**. Step 1's census counted 1040 among the boundaries acting in the
product; it was not acting. Nothing but asking the OUTPUT could have said so - `getComputedStyle`
never once returned four equal tracks.

And underneath them the live grid was losing a column as the window grew. Measured on ten pages:
**1 column at 320, 2 at 360, 3 at 520, 2 at 620, 3 at 680, 4 at 880.** At 620 the floor jumps from
150 to 200 and a 588px box stops fitting three. No single floor repairs it - keeping three at 620
needs 185 or less and keeping four at 1280 needs 194 or more - so the SWITCH is the defect, and a
ramp replaces it: `--grid-col-fluid` and `--grid-gap-fluid`, both read by `product-grid.css` and
`skeleton.css`, which is what earns them names. The card row now reads 1 -> 2 (360) -> 3 (580) ->
4 (880) -> 5 (1320), monotonic, and 360 and 1280 are unmoved. The price is stated: the 3-column state
at 520-619, three cards of 154.7px, becomes two of 244.

This defect predates the stage entirely - the two floors and the dead pair both came out of the
stage-08 split - and it survived stages 07, 08 and 09 because a two-width comparison at 360 and 1280
cannot see a dip at 620.

**The account is a second shell, and folding it was a decision taken by default.** From its point the
account grows a 268px nav column and below it the same links become a horizontal scroller. The number
was 960, in no registry. The pack allows a third point, but only as a decision the owner says out
loud, and none was said, so it folded onto `--bp-shell-wide`. Measured first: at 860 the nav column
stays 268 and the content column comes out 528 against today's 628, with no new clipping. **The pair
had to move together** - `.acc-links` is a scroller below the point and a bordered card above it, so
folding one half alone puts a 1253px strip inside a 268px column - and `skeleton`'s 959, left owed by
round 1 for exactly that reason, moved with it.

**Where a fold had two candidates, the measurement chose.** `auth-dialog` went to 860 rather than 620
because at 620 the modal is capped by the window and the two panes come out 243.8 and 310.3 - the
form column ends up NARROWER than the single-pane form it replaced (618) - while at 860 they are
349.4 and 444.6. `coach-verify` went to 860 for the same kind of reason and a harder one: forcing
`.cv-split` into a row at 620 CLIPS `.opt-tiles`, 324 into 319. Its tiles went the other way, to 620,
where they measure 174.7 and clip nothing.

**Three zeros were read rather than believed.** `comp-width.mjs` reports `cat-overlay`, `cookie-banner`
and `system-page` standing on zero screens, and none of the three is dead. The first two are born in
an act - `_nav.js` puts them in on an event, so they are not in the DOM the walk measures. The third
has one screen, `wireframes/system.html`, which has no coloured twin at all. Three zeros, three
different reasons, and not one of them «delete the file».

**Measured, and the promise held asymmetric.** See the table below.

### Round 4: patterns. N = 1, M = 1, K = 0 - and the four held files were resolved with it

**The shortest round of the four, and the reason is a result rather than an omission.**
`patterns/action-row.css` is the system's only pattern and it holds **zero media queries**:
`flex-wrap: wrap` has been in its base rule since step 9.1, and `.actions--even` says «share the
width» with a markup modifier rather than with a number. A composition assembled from components
that already understand width has no width answer of its own to give.

**One rule was checked and deliberately left where it was.** `.cs-act` in `trust-strip.css` takes
the whole line below the point and splits it evenly - and the second half of that IS
`.actions--even`. A markup modifier cannot be switched on by width without a query, so the rule
stays with its container, folded onto 619.

### The four held files, and what the measurement decided

| file | was | is | why |
|---|---|---|---|
| `seo-text` | 760 / 759 | 860 / 859 | the mascot beside the SEO text folds cleanly: at 860 the text column measures **500 against 400 at 760 today**, nothing clips |
| `pdp-tabs` | 1180 | gone | 1180 did exactly one thing - widen the right column from 540 to 580. A 40px step is a SIZE, so it ramps between the two values that stood there. 248 + 540 at 860 and 312 + 580 at 1180, before and after |
| `trust-strip` | 479, 559, 719 / 720, 1180 | 619, 619, 859 / 860, 860 + two ramps | see below |
| `coach-session` | 939 / 940 | **still held** | the coach split-view. The width audit named it the one genuinely new behaviour of this stage, which is step 5's subject |

**The trust strip is where the mascot refused to fold, and the measurement said so before the
edit.** Forced on at 860 with its full 150px reserve, the four cells come out 167 wide and **two of
them clip their text**. The reserve is what the strip gives up, so the reserve is what ramps: 108px
at 860, 150px at 1180, with the mascot's own crop box ramping alongside (108 -> 180) because a
180px bear would otherwise hang 72px over the fourth cell. At 860 the cells then measure 177.5 and
clip nothing; at 1180 both are back to their full size. The crop box exists to crop this bear, so
cropping it harder where there is less room is the mechanism doing its job.

**And the strip's column counts stay POINTS, which is the ladder answering «no» for a reason worth
writing down.** The hairlines between cells are `nth-child` box-shadows, so they have to KNOW the
column count - and `auto-fit` is precisely the mechanism that makes it unknowable to CSS.
Redrawing them as a cell border was the other route and was not taken: it changes how every line in
the strip is painted, and this round's acceptance is measured in pixels.

**A third point was the other answer to the mascot, twice, and it was not taken.** The pack allows
one, but only as a decision the owner says out loud. The owner was asked at two roll-calls.

### Where the system stands after four rounds

**116 queries on SIX widths**, across every file in `design/system/`: 619, 620, 859, 860 - and the
pair 939 / 940 that step 5 owns. That is the whole of it. The census of step 1 found **27 different
width values acting in the product and not one token for any of them**; what is left is two tokens,
their two mirrors, and one deliberately deferred behaviour.

`tools/bp.mjs` is what keeps it that way: it reads the registry out of `tokens.css` and asks every
query in the product to give one of its numbers, fails on an `@media` inside a screen file, on
`var()` inside a query, and on `@container` with no `container-type` anywhere. All four classes were
proved to fail by being introduced on purpose and reverted. Every declared list in it - the excused
numbers, the four documents that are not product - is itself checked for covering something.

**The ban is written in two places**, as the pack requires: `design/system/CLAUDE.md` rules 11 and
12, and `architecture.md` section J, «A new ADAPTATION». Rule 12 is the one no grep can see and
every reader needs: **a COUNT and a BEHAVIOUR may step at a point, a SIZE may not.**

## Step 5 - the new behaviour, and it is the only one the stage builds

The audit named eight behaviours for the wide width and seven were already standing in code after
round 4. The eighth is this one: **split view in the coach flow, 39 screens in the audit and 11 in
this behaviour.** The source is not a preference. The primary job says literally «build a complete
order for each client in one session», and on a phone the coach walks back and forth between the
list of clients and one client's basket, losing the place each time.

**The threshold for a split view is not the pattern threshold and the pack says so.** A pattern needs
three screens; a split view needs *two or more list-and-detail pairs, or one pair of the main flow*,
because it drags in a new state, focus management and history. Both conditions hold here, and the
two pairs are different questions rather than the same one twice:

| pair | the many | the one | frame |
|---|---|---|---|
| clients | `.clist`, saved clients | `.cldetail`, that client's goal, contacts, notes | `.clsplit` |
| session | `.ctabs`, the clients in this session | `.cs-panel`, that client's basket | `.cs-grid` |

### The detail screen is NOT cancelled, and that is the pack's rule rather than a courtesy

`coach-client.html` keeps its own URL, its own breadcrumbs and its SEO block A-E. Below the point
«Профіль» is a plain link to it, exactly as before; above the point the same record ALSO appears
beside the list. A shared link still opens the full screen. The split adds a second way to see a
client, it does not replace the first one.

### The panel opens EMPTY, and the string is new product copy

There is no «nothing is selected» on a one-screen-at-a-time flow: you are either in the list or in a
client. The split invents the state, so it is written by `voice.md`'s rules and lives in
`microcopy.md` with the other interface strings - six rows, and `voice.html` was rebuilt the same
step. Auto-selecting the first client was the other option and was not taken: it puts a record on
screen nobody asked for, and on a list whose order changes it is a different record every visit.

### The frame and the panel have ONE edition, and it is a function

Three clients screens carry the same list. A panel copy-pasted into three files is three editions,
and the third drifts first - so `wfClientSplit()` in `design/_nav.js` finds `.clist`, wraps it in
`.clsplit` and builds `.cldetail` itself. A screen calls the function and states nothing about width.

**No list means no split, and that is the rule rather than an omission.** `coach-clients-empty` and
`coach-clients-error` have no cards, so there is nothing to stand a client beside and the emptybox
keeps its full width. `coach-clients-loading` DOES get the frame, because without it the page jumps
at 860 the moment data arrives: the list would fold from its own columns into a rail and a panel
would appear from nowhere. The skeleton variant is read off `aria-busy`, not off the file name.

Three product links moved out of the html and into that function - `coach-client.html`,
`coach-session.html`, `../wireframes/coach-client-edit.html` - and `tools/links.mjs` cannot see a
link a page writes at runtime, which its own header states. All three targets are still written
statically on other product pages, so no path lost its check; the count moved 5346 -> 5343 and every
one of the three is still resolved from somewhere else.

### The session pair closed the last off-registry number in the system

`coach-session.css` held 940 and 939 through all four rounds, deliberately: they were step 5's to
spend. The client strip moved INSIDE `.cs-grid` on all eight session screens, and from
`--bp-shell-wide` it becomes a vertical rail in a left `20rem` column with the session total under
it - the total summarises exactly that list - while the active client's basket takes the rest. The
tab's 1px overhang, which exists to glue a tab to the panel below it, is switched off in the rail,
where there is no panel below it to glue to.

**`tools/bp.mjs` then failed, and that is the idle control working.** Its `EXCUSED` array still named
939 and 940 after those numbers stopped existing, and a list that names what nobody writes reads as
coverage. The array is empty now. **The system is 117 queries on FOUR widths - 619, 620, 859, 860 -
and nothing else**, against the 27 different acting widths and zero tokens the census found at step 1.

### What it measures, after the critique repaired it

The split no longer turns on at the shell's point. It asks two questions in the order they rank -
`@media (min-width: 860px)` first, because a two-pane workspace belongs to the DESKTOP SHELL, and
`@container (min-width: 41rem)` inside it, because even in that shell the room is not guaranteed.

**41rem is a derivation, not a device.** The smallest panel worth opening is the width at which
`.cd-row` still holds label and value side by side, which is this file's own container threshold,
22rem. Add the rail and the gap: `17.5rem + 1.5rem + 22rem = 41rem`. The relation is written in the
comment because the query cannot hold it - `@container`, like `@media`, resolves before custom
properties, so `calc()` and `var()` are both unavailable in the condition.

| | before the critique | after |
|---|---|---|
| turns on at | 860 viewport | **990** viewport, where `.acc-main` first reaches 658 |
| detail pane there | **224px**, narrower than the 280 rail | **354px**, wider than the rail's floor |
| what decides | the window | the box the shell actually leaves |

**The bare container query was WRONG first, and the instrument caught it inside one run.** Asking
only `@container` turned the split ON below 860 and OFF between 860 and 960: below 860 the shell has
no nav column, so `.acc-main` is the full 828 and the test passes; at 860 the shell takes its 268 and
the box drops to 528. The split appeared, vanished and came back. **The place is not monotonic in the
viewport** - the same fact that forced `--grid-col-min-panel` down to 19rem at step 4 - and a single
container gate cannot see it. Hence two gates.

**What remains, and it is the stand's, not the product's.** Swept at 10px from 320 to 1600 the
coloured copy transitions three times: on at 990 (box 658), OFF at 1080 (box 532), on again at 1210
(box 662). The 1080 drop is the STAND's own roadmap rail appearing and reflowing the page. In the
product there is no such rail and the sweep is one transition at 990. The instrument prints every
transition with the box that caused it, so this cannot quietly become normal; the rail itself is
listed in `backlog.md` as the thing that would remove it.

The session pair, measured on `coach-session`: 859 keeps the full-width strip above the panel; 860
gives `320 rail | 488 basket`; 900 `320 | 528`; 1280 `320 | 692`; 1440 `320 | 828`. Nothing clips at
any width. **On a phone nothing changed at all**, which is the right answer there: one client is
visible at a time anyway.

### What found the defect that no instrument found

`.cldetail-empty` was a private rule in `coach-clients.css` - dashed border, `radius-12`, centred -
which is `.emptybox.mini` spelled a second time inside another component's file. The price was paid
immediately and in silence: the markup already carried `.et` and `.es`, but `empty-state.css` writes
them as `.emptybox .et`, so under a private parent they matched nothing. Heading and body rendered at
the same size and read as one paragraph, on a screen every instrument called clean, because **no
instrument asks whether a heading looks like a heading.** It was found by opening the page. The state
is now `.emptybox mini` and the private rule is deleted rather than corrected.

### The instrument: `tools/split.mjs`

A split makes two claims at once - the frame really has two columns, and the two panes really sit in
them - and neither is visible in css, so both are asked of `getBoundingClientRect`. The other half is
the roll-call: it walks the whole product corpus and fails on any page that carries the LIST and
stands outside a frame, which is the check that would have caught the seven session screens this step
converted and the one that will catch the eighth when somebody adds it.

Five failure classes, each introduced on purpose and reverted:

| class | proved by | what it printed |
|---|---|---|
| carrier outside its frame | moving `.ctabs` back out on `coach-session-oos` | `.ctabs поза .cs-grid (рамка є, список не в ній)` |
| a declared frame nobody carries | renaming `.clsplit` to `.no-such-frame` in the registry | `оголошена рамка не стоїть на жодній сторінці продукту` |
| one column above the point | dropping the second track from `.cs-grid` | `широка ширина, а колонок 1` |
| clipping inside the frame | the same edit | `обрізано ctabs 118>0` |
| the page scrolls sideways | `min-width: 1700px` on `.cldetail` | `горизонтальна прокрутка сторінки` |

Two wrong versions are written in its header. The roll-call was first a **grep over the source** - it
answered correctly on the session screens and would answer «no split» on three of the four clients
screens, which have one, because `wfClientSplit()` builds their frame at load and neither class exists
in those files at all. And the first session measurement **injected the layout it was measuring**: it
pushed an override stylesheet in instead of moving the viewport, then reported the rail at 320 and the
basket at 488 with the two swapped, plus a `qa-row 324 > 258` clip that exists at no width.

## Container thresholds

**Empty after round 1, and that is the answer rather than an omission.** No atom needed one: an
atom's box is set by its own content, so it has no place-dependent behaviour to describe. The one
atom that looked like a candidate - `status-pill` reflowing at 639 - turned out not to be reflowing
at all: the ROW reflows and hands the pill a grid area, so the rule went to `order-row.css` and the
threshold belongs to the organism round.

**Empty after all four rounds, and that is the answer.** No molecule needed a container query
either: every place-dependent behaviour at this level turned out to be either a fixed item count
(which a point states better than a container does) or a fill (which `auto-fit` states without any
threshold at all). The single genuine candidate is the mascot - `seo-text` and `trust-strip` showing
a figure when there is room beside the text - and that is the first of the three questions held for
the owner above.

**Round 4 closed it without one, and the one real candidate was measured rather than assumed.** The
mascot is a question about the PLACE - «is there room beside the text» - and `@container` is the
honest mechanism for it. It was not taken, and the reason is mechanical rather than aesthetic:
`container-type: inline-size` implies `contain: layout`, which makes the element a containing block
for every `position: fixed` descendant. The only placer available is the page frame, and twelve
component files put fixed elements inside it - the buy bar, the drawers, the toasts, the cookie
banner. Declaring the container there would have re-anchored all of them to fix a decoration.
So the section stays empty, `tools/bp.mjs` fails the run on `@container` without a `container-type`
anywhere, and the day a placer exists that holds nothing fixed, the mascot is the first candidate.

**Step 5 opened it, with exactly one entry, and it is the placer rule working rather than an
exception to it.**

| threshold | declared on | asked by | what changes |
|---|---|---|---|
| `22rem` | `.coach .cdetails` | `.coach .cd-row` | the label-and-value rows fold from `160px 1fr` to one column |
| `41rem` | `.acc-main` (`account-shell.css`) | `.coach .clsplit` | the split opens, inside `@media (min-width: 860px)`. Added by the critique repair; the number is `17.5 + 1.5 + 22`, the rail plus the gap plus the smallest panel worth opening |

`.cdetails` could be a container where the page frame could not, and the difference is the whole
rule: it holds no `position: fixed` descendant, so `contain: layout` re-anchors nothing. And the
question is genuinely about the PLACE - the same client data card stands full width on
`coach-client.html` and in a 224px pane beside the list, and `@media` cannot tell those apart because
both happen at the same viewport width. **The block stands AFTER the base rule it overrides**: same
specificity, later declaration wins, and the first writing put it above and drew nothing at all. The
measurement that caught it read «265 into 190, unchanged».

### Numbers still owed to a later round

| number | file | why it is still there |
|---|---|---|
| `max-width: 959` | `skeleton.css` | the chip strip width, already carrying a `[?]`. It mirrors `account-shell.css`'s 960, which is the account shell's own boundary and belongs to the organism round; resolving one without the other would split a pair |
| `max-width: 639` | `order-row.css` | **CLOSED at round 2, and the debt had been misfiled.** `order-row` is a molecule, not an organism, so the number was owed to round 2 rather than to round 3. Folded onto 619, the mirror of `--bp-grid-2col`, on both of the file's blocks |
| 7 numbers | `trust-strip.css`, `seo-text.css` | held on three owner questions, listed under round 2. They are the only off-registry widths left at the molecule level |
