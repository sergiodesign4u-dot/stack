# Map - what a screen is made of, and what moves when a token changes

**Generated.** `node tools/map.mjs --write` writes this file from the corpus; nothing in it is
typed, so the map and the instrument cannot disagree. Names only, never values - a value lives
in `design/system/tokens.css` and a second copy here would be exactly the duplicate this stage
exists to prevent.

---

## How it was taken

| Link | Read out of | Why not the obvious way |
|---|---|---|
| screen -> components | the rendered DOM, in a browser, at rest AND after every opener the page declares | a grep of the screen file misses a third of the markup: the header, footer, tab-bar and every dialog are written by `wireframes/_nav.js` at load. And a component that only appears after a click is invisible at rest - `cat-overlay` is the proof |
| component -> tokens | `var()` in its own css, minus what it declares for itself | |
| role -> primitive | the declarations of the semantic block, in both themes | a role whose dark half reads a different primitive would otherwise hide half its chain |
| screen -> zones | the `Зона` column of that screen section in `voice/docs/microcopy.md` | a state screen has no section of its own; it inherits the base screen, because its strings are authored in the shared sections of cluster 0 |

**A component is on a screen if at least one of its ANCHOR classes renders there**, an anchor
being a class exactly one component file declares. Same rule as `inventory.mjs` question F, and
for the same reason: `.on`, `.tag` and `.ar` belong to several files at once and would put every
component on every screen.

---

## Roll-call

| List | Declared | In the map | Deliberately not |
|---|---|---|---|
| screens in `design/_nav.js` | 141 | 141 | 1 - `overview.html`, the coverage map, which describes the registry rather than standing in it |
| component files | 95 | 92 | 3 - counter, icon, product-thumb, which declare no class of their own and cannot be counted by anchor |
| semantic roles | 98 | 96 | 2 - see D |
| primitives | 165 | 158 | 4 - see D |

Panels opened before the measurement: **3679** calls over 141 passes.

---

## A. Screen -> zones -> components

The zone column is a COUNT and an address, not a list: the zones themselves are in
`voice/docs/microcopy.md`, and copying them here would make a second edition of them.

**The global layer is named once and left out of every row.** 8 components render on
all 141 screens, because `wireframes/_nav.js` writes them into every page: auth-dialog, breadcrumb, button, cat-overlay, field, link-row, otp, toast.
Repeating them 141 times would bury what this table is for - what is
SPECIFIC to a screen. The threshold is «on every screen», not a percentage, so nothing is rounded away.

| Screen | IA node | Zones | Components of its own |
|---|---|---|---|
| `404.html` | S | 3 | **18** - availability, badge, checkout-form, chip, city-dialog, favourite, footer, header, mega-menu, nav-drawer, overlay, price, product-card, rating, section-head, stack-action, system-page, tabbar |
| `500.html` | S | 1 | **2** - action-row, system-page |
| `account.html` | 7.0 | 10 | **21** - account-shell, address-card, availability, checkout-form, chip, city-dialog, favourite, footer, header, loyalty-rung, mega-menu, nav-drawer, order-row, overlay, price, product-card, rating, restock-note, section-head, stack-action, tabbar |
| `account-addresses.html` | 7.5 | 9 | **13** - account-shell, address-card, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `account-addresses-add.html` | 7.5 | 7 | **13** - account-shell, address-card, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `account-addresses-courier.html` | 7.5 | 9 (від базового екрана account-addresses) | **13** - account-shell, address-card, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `account-addresses-delete.html` | 7.5 | 9 (від базового екрана account-addresses) | **13** - account-shell, address-card, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `account-addresses-edit.html` | 7.5 | 9 (від базового екрана account-addresses) | **13** - account-shell, address-card, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `account-addresses-empty.html` | 7.5 | 2 | **14** - account-shell, address-card, chip, city-dialog, client-dialog, empty-state, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `account-addresses-postomat.html` | 7.5 | 9 (від базового екрана account-addresses) | **13** - account-shell, address-card, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `account-addresses-viddilennia.html` | 7.5 | 9 (від базового екрана account-addresses) | **13** - account-shell, address-card, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `account-empty.html` | 7.0 | 8 | **13** - account-shell, chip, city-dialog, empty-state, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, price, stack-action, tabbar |
| `account-error.html` | 7.0 | 2 | **12** - account-shell, chip, city-dialog, empty-state, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `account-loading.html` | 7.0 | 1 | **12** - account-shell, chip, city-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, skeleton, stack-action, tabbar |
| `account-loyalty.html` | 7.4 | 6 | **13** - account-shell, chip, city-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, price, section-head, stack-action, tabbar |
| `account-loyalty-empty.html` | 7.4 | 3 | **13** - account-shell, chip, city-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, price, section-head, stack-action, tabbar |
| `account-loyalty-max.html` | 7.4 | 1 | **13** - account-shell, chip, city-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, price, section-head, stack-action, tabbar |
| `account-orders.html` | 7.2 | 13 | **12** - account-shell, chip, city-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, order-row, overlay, stack-action, tabbar |
| `account-orders-empty.html` | 7.2 | 3 | **12** - account-shell, chip, city-dialog, empty-state, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `account-profile.html` | 7.1 | 11 | **15** - account-shell, checkout-form, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, radio, stack-action, switch, tabbar |
| `account-profile-delete.html` | 7.1 | 11 (від базового екрана account-profile) | **15** - account-shell, checkout-form, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, radio, stack-action, switch, tabbar |
| `account-profile-email.html` | 7.1 | 11 (від базового екрана account-profile) | **15** - account-shell, checkout-form, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, radio, stack-action, switch, tabbar |
| `account-profile-lang.html` | 7.1 | 11 (від базового екрана account-profile) | **15** - account-shell, checkout-form, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, radio, stack-action, switch, tabbar |
| `account-profile-phone.html` | 7.1 | 11 (від базового екрана account-profile) | **15** - account-shell, checkout-form, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, radio, stack-action, switch, tabbar |
| `account-profile-withemail.html` | 7.1 | 1 | **15** - account-shell, checkout-form, chip, city-dialog, client-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, radio, stack-action, switch, tabbar |
| `account-wishlist.html` | 7.6 | 4 | **17** - account-shell, availability, checkout-form, chip, city-dialog, favourite, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, price, product-card, rating, stack-action, tabbar |
| `account-wishlist-empty.html` | 7.6 | 1 | **12** - account-shell, chip, city-dialog, empty-state, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `account-wishlist-many.html` | 7.6 | 3 | **18** - account-shell, availability, checkout-form, chip, city-dialog, favourite, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, pagination, price, product-card, rating, stack-action, tabbar |
| `auth.html` | 1.x | 5 | **9** - checkout-form, chip, city-dialog, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `auth-code.html` | 1.x | 5 | **8** - chip, city-dialog, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `auth-error.html` | 1.x | 5 | **8** - chip, city-dialog, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `auth-loading.html` | 1.x | 5 | **9** - chip, city-dialog, header, mega-menu, nav-drawer, overlay, skeleton, stack-action, tabbar |
| `auth-newuser.html` | 1.x | 5 | **9** - checkbox, chip, city-dialog, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `brands.html` | 2.4 | 8 | **15** - badge, brand-logo, chip, city-dialog, footer, header, mega-menu, nav-drawer, nav-tile, overlay, section-head, seo-text, stack-action, tabbar, toolbar |
| `brands-empty.html` | 2.4 | 2 | **11** - chip, city-dialog, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar, toolbar |
| `brands-error.html` | 2.4 | 1 | **10** - chip, city-dialog, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `brands-loading.html` | 2.4 | 1 | **11** - chip, city-dialog, footer, header, mega-menu, nav-drawer, overlay, skeleton, stack-action, tabbar, toolbar |
| `cart.html` | 6.0 | 6 | **14** - cart-drawer, cart-row, chip, city-dialog, discount, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, stepper, tabbar |
| `cart-coach.html` | 6.0 | 7 | **15** - cart-drawer, cart-row, chip, city-dialog, client-row, discount, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, stepper, tabbar |
| `cart-coach-empty.html` | 6.0 | 3 | **10** - cart-drawer, chip, city-dialog, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `cart-empty.html` | 6.0 | 3 | **10** - cart-drawer, chip, city-dialog, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `cart-oos.html` | 6.0 | 6 | **14** - cart-drawer, cart-row, chip, city-dialog, discount, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, stepper, tabbar |
| `catalog-page.html` | 2.0 | 9 | **20** - availability, badge, checkout-form, chip, city-dialog, favourite, footer, goal-tile, header, mega-menu, nav-drawer, nav-tile, overlay, price, product-card, rating, section-head, seo-text, stack-action, tabbar |
| `catalog-page-error.html` | 2.0 | 3 | **10** - chip, city-dialog, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `catalog-page-loading.html` | 2.0 | 3 | **10** - chip, city-dialog, footer, header, mega-menu, nav-drawer, overlay, skeleton, stack-action, tabbar |
| `checkout.html` | 6.1 | 17 | **10** - availability, checkout-form, client-dialog, discount, favourite, price, product-card, radio, rating, stepper |
| `checkout-declined.html` | 6.1 | 6 | **3** - checkout-form, loyalty-rung, price |
| `checkout-loading.html` | 6.1 | 3 | **2** - checkout-form, skeleton |
| `checkout-loggedin.html` | 6.1 | 9 | **11** - availability, checkout-form, client-dialog, discount, favourite, loyalty-rung, price, product-card, radio, rating, stepper |
| `checkout-noaddr.html` | 6.1 | 8 | **11** - availability, checkout-form, client-dialog, discount, favourite, loyalty-rung, price, product-card, radio, rating, stepper |
| `coach-client.html` | 5.4 | 12 | **14** - chip, city-dialog, client-dialog, coach-clients, discount, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, status-pill, tabbar |
| `coach-client-edit.html` | 5.4a | 2 | **14** - chip, city-dialog, client-dialog, coach-clients, discount, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, status-pill, tabbar |
| `coach-client-edit-confirm.html` | 5.4a | 1 | **14** - chip, city-dialog, client-dialog, coach-clients, discount, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, status-pill, tabbar |
| `coach-client-empty.html` | 5.4 | 5 | **11** - chip, city-dialog, coach-clients, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-client-error.html` | 5.4 | 4 | **11** - chip, city-dialog, coach-clients, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-client-loading.html` | 5.4 | 5 | **11** - chip, city-dialog, coach-clients, footer, header, mega-menu, nav-drawer, overlay, skeleton, stack-action, tabbar |
| `coach-client-new.html` | 5.3a | 1 | **13** - account-shell, action-row, chip, city-dialog, client-dialog, coach-clients, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-clients.html` | 5.3 | 9 | **14** - account-shell, action-row, chip, city-dialog, client-dialog, coach-clients, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-clients-cap.html` | 5.3 | 6 | **14** - account-shell, action-row, chip, city-dialog, coach-clients, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar, upsell |
| `coach-clients-empty.html` | 5.3 | 3 | **12** - account-shell, chip, city-dialog, coach-clients, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-clients-error.html` | 5.3 | 3 | **12** - account-shell, chip, city-dialog, coach-clients, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-clients-loading.html` | 5.3 | 3 | **14** - account-shell, action-row, chip, city-dialog, coach-clients, empty-state, footer, header, mega-menu, nav-drawer, overlay, skeleton, stack-action, tabbar |
| `coach-home.html` | 5.2 | 8 | **19** - account-shell, availability, checkout-form, chip, city-dialog, coach-cabinet, favourite, footer, header, mega-menu, nav-drawer, overlay, price, product-card, rating, section-head, stack-action, status-pill, tabbar |
| `coach-home-empty.html` | 5.2 | 7 | **12** - account-shell, chip, city-dialog, coach-cabinet, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-home-error.html` | 5.2 | 2 | **10** - chip, city-dialog, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-home-free.html` | 5.2 | 2 | **19** - account-shell, availability, checkout-form, chip, city-dialog, coach-cabinet, favourite, footer, header, mega-menu, nav-drawer, overlay, price, product-card, rating, section-head, stack-action, status-pill, tabbar |
| `coach-home-loading.html` | 5.2 | 2 | **11** - account-shell, chip, city-dialog, footer, header, mega-menu, nav-drawer, overlay, skeleton, stack-action, tabbar |
| `coach-landing.html` | 5.0 | 15 | **13** - banner, chip, city-dialog, coach-landing, footer, header, mega-menu, nav-drawer, overlay, section-head, seo-text, stack-action, tabbar |
| `coach-order.html` | 5.7 | 10 | **13** - chip, city-dialog, coach-order, discount, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, status-pill, tabbar |
| `coach-order-error.html` | 5.7 | 2 | **11** - chip, city-dialog, coach-order, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-order-loading.html` | 5.7 | 2 | **11** - chip, city-dialog, coach-order, footer, header, mega-menu, nav-drawer, overlay, skeleton, stack-action, tabbar |
| `coach-orders.html` | 5.6 | 10 | **13** - account-shell, chip, city-dialog, coach-cabinet, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, status-pill, tabbar |
| `coach-orders-empty.html` | 5.6 | 5 | **12** - account-shell, chip, city-dialog, coach-cabinet, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-orders-error.html` | 5.6 | 2 | **12** - account-shell, chip, city-dialog, coach-cabinet, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-orders-loading.html` | 5.6 | 2 | **12** - account-shell, chip, city-dialog, coach-cabinet, footer, header, mega-menu, nav-drawer, overlay, skeleton, stack-action, tabbar |
| `coach-session.html` | 5.5 | 14 | **15** - availability, cart-row, chip, city-dialog, coach-session, discount, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, stepper, tabbar |
| `coach-session-addclient.html` | 5.5 | 1 | **18** - availability, cart-row, chip, city-dialog, client-dialog, coach-cabinet, coach-clients, coach-session, discount, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, stepper, tabbar |
| `coach-session-addempty.html` | 5.5 | 2 | **17** - availability, cart-row, chip, city-dialog, client-dialog, coach-session, discount, empty-state, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, stepper, tabbar |
| `coach-session-empty.html` | 5.5 | 5 | **13** - cart-row, chip, city-dialog, coach-session, empty-state, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, tabbar |
| `coach-session-loading.html` | 5.5 | 2 | **15** - cart-row, chip, city-dialog, coach-session, discount, footer, header, mega-menu, nav-drawer, overlay, price, skeleton, stack-action, stepper, tabbar |
| `coach-session-newclient.html` | 5.5 | 10 | **14** - cart-row, chip, city-dialog, coach-session, discount, empty-state, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, tabbar |
| `coach-session-oos.html` | 5.5 | 7 | **15** - availability, cart-row, chip, city-dialog, coach-session, discount, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, stepper, tabbar |
| `coach-session-priceblock.html` | 5.5 | 6 | **16** - availability, cart-row, chip, city-dialog, client-row, coach-session, discount, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, stepper, tabbar |
| `coach-tariff.html` | 5.2a | 5 | **15** - account-shell, chip, city-dialog, client-dialog, coach-tariff, footer, header, mega-menu, nav-drawer, overlay, plan-card, price, stack-action, status-pill, tabbar |
| `coach-tariff-cancel.html` | 5.2a | 5 (від базового екрана coach-tariff) | **15** - account-shell, chip, city-dialog, client-dialog, coach-tariff, footer, header, mega-menu, nav-drawer, overlay, plan-card, price, stack-action, status-pill, tabbar |
| `coach-tariff-free.html` | 5.2a | 4 | **14** - account-shell, chip, city-dialog, coach-tariff, footer, header, mega-menu, nav-drawer, overlay, price, stack-action, status-pill, tabbar, upsell |
| `coach-verify.html` | 5.1 | 4 | **12** - chip, city-dialog, coach-verify, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, radio, stack-action, tabbar |
| `coach-verify-deadend.html` | 5.1 | 5 | **11** - chip, city-dialog, coach-verify, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-verify-error.html` | 5.1 | 4 | **11** - chip, city-dialog, coach-verify, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-verify-loading.html` | 5.1 | 5 | **12** - action-row, chip, city-dialog, coach-verify, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `coach-verify-tier.html` | 5.1 | 7 | **13** - chip, city-dialog, coach-verify, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, plan-card, price, stack-action, tabbar |
| `coach-wishlist.html` | 5.8 | 8 | **17** - account-shell, availability, checkout-form, chip, city-dialog, coach-wishlist, favourite, footer, header, mega-menu, nav-drawer, overlay, price, product-card, rating, stack-action, tabbar |
| `content-about.html` | 8.2 | 7 | **11** - chip, city-dialog, footer, header, info-page, mega-menu, nav-drawer, overlay, related, stack-action, tabbar |
| `content-article.html` | 8.1 | 6 | **18** - article, availability, badge, checkout-form, chip, city-dialog, favourite, footer, header, mega-menu, nav-drawer, overlay, price, product-card, rating, section-head, stack-action, tabbar |
| `content-blog.html` | 8.0 | 7 | **13** - blog-card, chip, city-dialog, footer, header, mega-menu, nav-drawer, overlay, pagination, seo-text, stack-action, tabbar, toolbar |
| `content-contacts.html` | 8.3 | 6 | **12** - chip, city-dialog, contacts-block, footer, header, info-page, mega-menu, nav-drawer, overlay, related, stack-action, tabbar |
| `content-delivery.html` | 8.4 | 9 | **11** - chip, city-dialog, footer, header, info-page, mega-menu, nav-drawer, overlay, related, stack-action, tabbar |
| `content-faq.html` | 8.9 | 11 | **11** - chip, city-dialog, faq-page, footer, header, mega-menu, nav-drawer, overlay, seo-text, stack-action, tabbar |
| `content-guarantee.html` | 8.8 | 6 | **12** - cert-thumb, chip, city-dialog, footer, header, info-page, mega-menu, nav-drawer, overlay, related, stack-action, tabbar |
| `content-legal.html` | 8.6 | 7 | **11** - chip, city-dialog, footer, header, info-page, mega-menu, nav-drawer, overlay, related, stack-action, tabbar |
| `content-loyalty.html` | 8.7 | 7 | **15** - account-shell, action-row, chip, city-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, qa-item, section-head, seo-text, stack-action, tabbar |
| `content-loyalty-buyer.html` | 8.7 | 9 | **16** - account-shell, action-row, chip, city-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, overlay, price, qa-item, section-head, seo-text, stack-action, tabbar |
| `content-newsletter.html` | 8.12 | 4 | **12** - action-row, chip, city-dialog, footer, header, mega-menu, nav-drawer, newsletter, overlay, stack-action, system-page, tabbar |
| `content-promo.html` | 8.10 | 4 | **11** - chip, city-dialog, footer, header, mega-menu, nav-drawer, overlay, promo-card, seo-text, stack-action, tabbar |
| `content-returns.html` | 8.5 | 9 | **11** - chip, city-dialog, footer, header, info-page, mega-menu, nav-drawer, overlay, related, stack-action, tabbar |
| `content-reviews.html` | 8.11 | 7 | **16** - action-row, chip, city-dialog, footer, header, mega-menu, nav-drawer, overlay, pagination, rating, review-item, section-head, seo-text, stack-action, status-pill, tabbar |
| `goal.html` | 2.2 | 10 | **27** - availability, badge, checkbox, checkout-form, chip, city-dialog, favourite, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, pagination, price, price-slider, product-card, rating, related, seo-text, stack-action, tabbar, toolbar, view-toggle |
| `goal-empty.html` | 2.2 | 3 | **19** - checkbox, chip, city-dialog, empty-state, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, price-slider, seo-text, stack-action, tabbar, toolbar, view-toggle |
| `goal-error.html` | 2.2 | 2 | **18** - checkbox, chip, city-dialog, empty-state, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, price-slider, stack-action, tabbar, toolbar, view-toggle |
| `goal-loading.html` | 2.2 | 2 | **18** - checkbox, chip, city-dialog, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, price-slider, skeleton, stack-action, tabbar, toolbar, view-toggle |
| `home-buyer.html` | – | 2 | **28** - availability, badge, banner, blog-card, brand-logo, checkout-form, chip, city-dialog, client-row, discount, favourite, filter-rail, footer, goal-tile, header, hero, loyalty-rung, mega-menu, nav-drawer, overlay, pdp-tabs, price, product-card, rating, section-head, seo-text, stack-action, tabbar |
| `home-cart.html` | – | 1 | **29** - availability, badge, banner, blog-card, brand-logo, checkout-form, chip, city-dialog, client-row, discount, favourite, filter-rail, footer, goal-tile, header, hero, loyalty-rung, mega-menu, nav-drawer, overlay, pdp-tabs, price, product-card, rating, section-head, seo-text, stack-action, tabbar, trust-strip |
| `home-catalog.html` | 0.0 | 5 | **20** - availability, badge, banner, checkout-form, chip, city-dialog, favourite, filter-rail, footer, header, hero, mega-menu, nav-drawer, overlay, price, product-card, rating, section-head, stack-action, tabbar |
| `home-coach.html` | – | 2 | **27** - availability, badge, banner, blog-card, brand-logo, checkout-form, chip, city-dialog, client-row, discount, favourite, filter-rail, footer, goal-tile, header, hero, mega-menu, nav-drawer, overlay, pdp-tabs, price, product-card, rating, section-head, seo-text, stack-action, tabbar |
| `index.html` | 0.0 | 161 | **27** - availability, badge, banner, blog-card, brand-logo, checkout-form, chip, city-dialog, client-row, discount, favourite, filter-rail, footer, goal-tile, header, hero, mega-menu, nav-drawer, overlay, pdp-tabs, price, product-card, rating, section-head, seo-text, stack-action, tabbar |
| `listing.html` | 2.1 | 9 | **27** - availability, badge, checkbox, checkout-form, chip, city-dialog, favourite, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, pagination, price, price-slider, product-card, rating, related, seo-text, stack-action, tabbar, toolbar, view-toggle |
| `listing-empty.html` | 2.1 | 5 | **19** - checkbox, chip, city-dialog, empty-state, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, price-slider, seo-text, stack-action, tabbar, toolbar, view-toggle |
| `listing-error.html` | 2.1 | 2 | **18** - checkbox, chip, city-dialog, empty-state, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, price-slider, stack-action, tabbar, toolbar, view-toggle |
| `listing-filtered.html` | 2.1 | 6 | **26** - availability, badge, checkbox, checkout-form, chip, city-dialog, favourite, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, pagination, price, price-slider, product-card, rating, seo-text, stack-action, tabbar, toolbar, view-toggle |
| `listing-list.html` | 2.1 | 2 | **26** - availability, badge, checkbox, checkout-form, chip, city-dialog, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, pagination, price, price-slider, product-card, product-grid, rating, seo-text, stack-action, tabbar, toolbar, view-toggle |
| `listing-loading.html` | 2.1 | 2 | **18** - checkbox, chip, city-dialog, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, price-slider, skeleton, stack-action, tabbar, toolbar, view-toggle |
| `listing-sheet.html` | 2.1 | 9 (від базового екрана listing) | **27** - availability, badge, checkbox, checkout-form, chip, city-dialog, favourite, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, pagination, price, price-slider, product-card, rating, related, seo-text, stack-action, tabbar, toolbar, view-toggle |
| `maintenance.html` | S | 1 | **2** - action-row, system-page |
| `megamenu.html` | 0.1 | 4 | **20** - availability, badge, banner, checkout-form, chip, city-dialog, favourite, filter-rail, footer, header, hero, mega-menu, nav-drawer, overlay, price, product-card, rating, section-head, stack-action, tabbar |
| `megamenu-health.html` | 0.1 | 4 | **20** - availability, badge, banner, checkout-form, chip, city-dialog, favourite, filter-rail, footer, header, hero, mega-menu, nav-drawer, overlay, price, product-card, rating, section-head, stack-action, tabbar |
| `megamenu-protein.html` | 0.1 | 4 | **20** - availability, badge, banner, checkout-form, chip, city-dialog, favourite, filter-rail, footer, header, hero, mega-menu, nav-drawer, overlay, price, product-card, rating, section-head, stack-action, tabbar |
| `megamenu-vitamins.html` | 0.1 | 4 | **20** - availability, badge, banner, checkout-form, chip, city-dialog, favourite, filter-rail, footer, header, hero, mega-menu, nav-drawer, overlay, price, product-card, rating, section-head, stack-action, tabbar |
| `order-placed.html` | 6.2 | 7 | **13** - action-row, chip, city-dialog, footer, header, mega-menu, nav-drawer, order-placed, overlay, price, rating, stack-action, tabbar |
| `order-placed-account-end.html` | 6.2 | 6 | **14** - action-row, chip, city-dialog, footer, header, loyalty-rung, mega-menu, nav-drawer, order-placed, overlay, price, rating, stack-action, tabbar |
| `product.html` | 3.0 | 30 | **33** - availability, badge, blog-card, buy-bar, buy-box, cert-thumb, checkout-form, chip, city-dialog, desc-block, discount, favourite, footer, gallery, header, mega-menu, nav-drawer, overlay, pagination, pdp-tabs, price, product-card, qa-item, radio, rating, review-item, review-modal, section-head, spec-table, stack-action, status-pill, tabbar, trust-strip |
| `product-coach.html` | 3.0 | 7 | **34** - availability, badge, blog-card, buy-bar, buy-box, cert-thumb, checkout-form, chip, city-dialog, desc-block, discount, favourite, footer, gallery, header, mega-menu, menu, nav-drawer, overlay, pagination, pdp-tabs, price, product-card, qa-item, radio, rating, review-item, review-modal, section-head, spec-table, stack-action, status-pill, tabbar, trust-strip |
| `product-error.html` | 3.0 | 2 | **10** - chip, city-dialog, empty-state, footer, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `product-loading.html` | 3.0 | 12 | **12** - chip, city-dialog, footer, gallery, header, mega-menu, nav-drawer, overlay, pdp-tabs, skeleton, stack-action, tabbar |
| `product-oos.html` | 3.0 | 10 | **23** - availability, badge, buy-box, checkout-form, chip, city-dialog, favourite, footer, gallery, header, mega-menu, nav-drawer, overlay, pdp-tabs, price, product-card, radio, rating, restock-note, section-head, stack-action, tabbar, trust-strip |
| `product-reviews.html` | 3.0 | 10 | **24** - availability, banner, buy-bar, cert-thumb, checkout-form, chip, city-dialog, favourite, footer, header, mega-menu, nav-drawer, overlay, pagination, price, product-card, rating, review-item, review-modal, section-head, stack-action, status-pill, tabbar, trust-strip |
| `quiz.html` | 4.x | 11 | **16** - badge, checkbox, chip, city-dialog, footer, header, mega-menu, nav-drawer, overlay, price, product-card, quiz, radio, section-head, stack-action, tabbar |
| `search.html` | 2.5 | 7 | **25** - availability, badge, checkbox, checkout-form, chip, city-dialog, favourite, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, pagination, price, price-slider, product-card, rating, stack-action, tabbar, toolbar, view-toggle |
| `search-empty.html` | 2.5 | 7 | **11** - chip, city-dialog, empty-state, footer, goal-tile, header, mega-menu, nav-drawer, overlay, stack-action, tabbar |
| `search-loading.html` | 2.5 | 5 | **18** - checkbox, chip, city-dialog, filter-group, filter-rail, filter-sheet, footer, header, mega-menu, menu, nav-drawer, overlay, price-slider, skeleton, stack-action, tabbar, toolbar, view-toggle |
| `search-suggest.html` | 2.5 | 8 | **10** - chip, city-dialog, footer, header, mega-menu, nav-drawer, overlay, search-overlay, stack-action, tabbar |
| `system.html` | S | 9 | **12** - chip, city-dialog, cookie-banner, footer, header, mega-menu, nav-drawer, overlay, seo-text, stack-action, system-page, tabbar |

### A1. The near-global components, and the screens that do without them

A component on almost every screen but not on all of them says something about the EXCEPTIONS,
and the exceptions turn out to be the two deliberate ones this product has: the focused
checkout, which drops the shell so nothing competes with the payment, and the system pages,
which have no shell to drop. Derived, not listed - the threshold is «on more than four fifths
of the screens and not on all of them».

| Component | On | Missing from |
|---|---|---|
| `chip` | 134 / 141 | `500`, `checkout`, `checkout-declined`, `checkout-loading`, `checkout-loggedin`, `checkout-noaddr`, `maintenance` |
| `city-dialog` | 134 / 141 | `500`, `checkout`, `checkout-declined`, `checkout-loading`, `checkout-loggedin`, `checkout-noaddr`, `maintenance` |
| `footer` | 129 / 141 | `500`, `auth`, `auth-code`, `auth-error`, `auth-loading`, `auth-newuser`, `checkout`, `checkout-declined`, `checkout-loading`, `checkout-loggedin`, `checkout-noaddr`, `maintenance` |
| `header` | 134 / 141 | `500`, `checkout`, `checkout-declined`, `checkout-loading`, `checkout-loggedin`, `checkout-noaddr`, `maintenance` |
| `mega-menu` | 134 / 141 | `500`, `checkout`, `checkout-declined`, `checkout-loading`, `checkout-loggedin`, `checkout-noaddr`, `maintenance` |
| `nav-drawer` | 134 / 141 | `500`, `checkout`, `checkout-declined`, `checkout-loading`, `checkout-loggedin`, `checkout-noaddr`, `maintenance` |
| `overlay` | 134 / 141 | `500`, `checkout`, `checkout-declined`, `checkout-loading`, `checkout-loggedin`, `checkout-noaddr`, `maintenance` |
| `stack-action` | 134 / 141 | `500`, `checkout`, `checkout-declined`, `checkout-loading`, `checkout-loggedin`, `checkout-noaddr`, `maintenance` |
| `tabbar` | 134 / 141 | `500`, `checkout`, `checkout-declined`, `checkout-loading`, `checkout-loggedin`, `checkout-noaddr`, `maintenance` |

---

## B. Component -> tokens

| Component | Screens | Roles it reads | Primitives it reads |
|---|---|---|---|
| `account-shell` | 46 | `--bg-action` `--bg-page` `--bg-sunken` `--bg-surface` `--elevation-1` `--line-action` `--line-hair` `--line-onaction` `--line-strong` `--mark-faint` `--text-action` `--text-body` `--text-danger` `--text-muted` `--text-onaction-ink` `--text-primary` `--text-secondary` `--text-warning` | `--container-text` `--dur-fast` `--ease-standard` `--font-display` `--font-mono` `--fs-12` `--fs-14` `--fs-16` `--fs-20` `--fs-display` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-flat` `--ls-caps` `--ls-lead` `--radius-12` `--radius-8` `--radius-circle` `--radius-pill` `--size-20` `--size-44` `--space-12` `--space-16` `--space-2` `--space-24` `--space-32` `--space-4` `--space-8` |
| `action-row` *(pattern)* | 13 | – | `--space-12` |
| `address-card` | 9 | `--bg-page` `--bg-sunken` `--bg-surface` `--elevation-1` `--line-action` `--line-hair` `--line-inverse` `--line-strong` `--mark-faint` `--text-action` `--text-body` `--text-primary` `--text-secondary` | `--container-text` `--fs-10` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-24` `--fw-black` `--fw-bold` `--fw-semibold` `--grid-col-min-panel` `--lh-airy` `--ls-caps` `--radius-12` `--radius-8` `--space-12` `--space-16` `--space-2` `--space-4` `--space-8` |
| `article` | 1 | `--bg-page` `--bg-sunken` `--elevation-1` `--line-hair` `--line-strong` `--text-action` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--container-text` `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fw-black` `--fw-bold` `--fw-semibold` `--grid-col-min` `--grid-gap-fluid` `--lh-airy` `--lh-snug` `--radius-12` `--radius-8` `--space-12` `--space-16` `--space-24` `--space-32` `--space-4` `--space-8` |
| `auth-dialog` | 141 | `--bg-hatch` `--bg-page` `--bg-rule` `--bg-sunken` `--bg-surface` `--elevation-4` `--elevation-mark` `--fade-inverse` `--fade-page` `--line-action` `--line-danger` `--line-hair` `--line-onphoto` `--line-success` `--scrim-overlay` `--text-action` `--text-body` `--text-danger` `--text-muted` `--text-primary` `--text-secondary` `--text-success` `--veil-inverse` `--veil-page` | `--container-text` `--dur-cycle` `--dur-slow` `--ease-cycle` `--ease-enter` `--ease-exit` `--font-display` `--font-mono` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fs-24` `--fs-30` `--fs-34` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-airy` `--lh-flat` `--ls-display` `--ls-eyebrow` `--ls-lead` `--move-md` `--radius-12` `--radius-16` `--radius-8` `--radius-circle` `--shell-left` `--shell-top` `--size-40` `--size-46` `--space-12` `--space-16` `--space-24` `--space-32` `--space-4` `--space-40` `--space-8` |
| `availability` | 36 | `--text-info` `--text-secondary` `--text-success` `--text-warning` | `--font-body` `--fs-12` `--fs-14` `--fw-bold` `--radius-circle` `--space-4` `--space-8` |
| `badge` | 23 | `--bg-action` `--bg-inverse` `--bg-page` `--elevation-mark` `--line-strong` `--text-action` `--text-onaction-ink` `--text-oninverse` `--text-primary` | `--fs-10` `--fw-black` `--lh-flat` `--lh-snug` `--ls-caps` `--radius-pill` `--space-12` `--space-2` `--space-4` `--space-8` |
| `banner` | 11 | `--bg-action` `--bg-page` `--bg-sunken` `--bg-surface` `--bg-track` `--elevation-1` `--elevation-2` `--fade-surface` `--line-action` `--line-hair` `--text-action` `--text-body` `--text-brandline` `--text-onaction` `--text-primary` `--text-secondary` `--veil-surface` `--veil-surface-mid` | `--dur-fast` `--ease-standard` `--font-display` `--font-mono` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fs-24` `--fs-30` `--fw-black` `--fw-bold` `--fw-medium` `--fw-semibold` `--lh-airy` `--lh-flat` `--lh-snug` `--ls-caps` `--ls-eyebrow` `--ls-lead` `--radius-12` `--radius-16` `--radius-circle` `--space-12` `--space-16` `--space-2` `--space-24` `--space-32` `--space-4` `--space-8` |
| `blog-card` | 7 | `--bg-media` `--bg-page` `--bg-sunken` `--elevation-1` `--elevation-2` `--line-hair` `--text-body` `--text-onmedia` `--text-primary` `--text-secondary` | `--container-text` `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fs-16` `--fw-black` `--fw-bold` `--grid-col-min-panel` `--grid-gap-fluid` `--lh-airy` `--lh-snug` `--radius-12` `--radius-pill` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` `--space-8` |
| `brand-logo` | 5 | `--bg-page` `--line-action` `--line-hair` `--text-body` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-14` `--fw-bold` `--radius-12` `--size-52` `--space-12` `--space-16` |
| `breadcrumb` | 141 | `--mark-disabled` `--ring-focus-control` `--text-action` `--text-muted` `--text-primary` | `--dur-fast` `--ease-standard` `--fs-12` `--fw-bold` `--radius-4` `--space-12` `--space-16` `--space-8` |
| `button` | 141 | `--bg-action` `--bg-action-pressed` `--bg-action-soft` `--bg-danger` `--bg-danger-soft` `--bg-page` `--bg-sunken` `--bg-surface` `--elevation-control` `--line-action` `--line-danger` `--line-hair` `--line-strong` `--mark-disabled` `--ring-focus-control` `--text-action` `--text-body` `--text-danger` `--text-muted` `--text-onaction` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-14` `--fs-16` `--fs-18` `--fw-bold` `--lh-snug` `--radius-12` `--radius-8` `--size-20` `--size-24` `--size-40` `--size-44` `--size-52` `--size-64` `--space-12` `--space-16` `--space-24` `--space-4` `--space-8` |
| `buy-bar` | 3 | `--bg-page` `--elevation-bar-top` `--line-hair` `--text-body` | `--fs-12` `--fs-20` `--lh-flat` `--space-12` `--space-16` `--space-8` |
| `buy-box` | 3 | `--bg-inverse` `--bg-page` `--bg-save` `--bg-sunken` `--bg-surface` `--line-hair` `--line-inverse` `--mark-inactive` `--text-action` `--text-body` `--text-danger` `--text-muted` `--text-primary` `--text-secondary` `--text-success` | `--container-text` `--font-body` `--font-display` `--font-mono` `--fs-10` `--fs-12` `--fs-14` `--fs-30` `--fw-black` `--fw-bold` `--fw-regular` `--fw-semibold` `--lh-airy` `--lh-flat` `--lh-snug` `--ls-caps` `--ls-display` `--ls-lead` `--radius-12` `--radius-16` `--radius-4` `--radius-8` `--size-34` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` `--space-8` |
| `cart-drawer` | 5 | `--bg-page` `--bg-surface` `--bg-warning` `--elevation-1` `--elevation-bar-top` `--elevation-drawer` `--line-hair` `--line-notice` `--line-strong` `--scrim-overlay` `--text-action` `--text-body` `--text-muted` `--text-secondary` `--text-warning` | `--container-page` `--container-text` `--font-display` `--font-mono` `--fs-12` `--fs-14` `--fs-16` `--fs-20` `--fs-24` `--fw-bold` `--fw-medium` `--fw-semibold` `--lh-airy` `--lh-flat` `--ls-lead` `--radius-12` `--radius-circle` `--shell-top` `--size-38` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` `--space-40` `--space-8` |
| `cart-row` | 11 | `--bg-page` `--line-hair` `--text-action` `--text-body` `--text-brandline` `--text-muted` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-10` `--fs-12` `--fs-14` `--fs-20` `--fw-bold` `--fw-medium` `--fw-semibold` `--lh-snug` `--radius-8` `--space-12` `--space-16` `--space-2` `--space-4` `--space-8` |
| `cat-overlay` | 141 | `--bg-page` `--bg-surface` `--line-hair` `--mark-faint` `--text-action` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--dur-slow` `--ease-enter` `--ease-exit` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-flat` `--lh-snug` `--shell-top` `--size-24` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` |
| `cert-thumb` | 4 | `--bg-media` `--bg-page` `--bg-rule` `--line-action` `--line-hair` `--line-media` `--line-strong` `--text-body` `--text-muted` `--text-onmedia` `--text-primary` `--text-secondary` | `--container-text` `--dur-fast` `--ease-standard` `--font-mono` `--fs-10` `--fs-12` `--fs-14` `--fw-bold` `--fw-semibold` `--grid-col-fluid` `--grid-gap-fluid` `--lh-flat` `--ls-caps` `--radius-12` `--radius-4` `--radius-8` `--radius-pill` `--space-12` `--space-16` `--space-2` `--space-4` `--space-8` |
| `checkbox` | 15 | `--bg-action` `--bg-action-pressed` `--bg-action-soft` `--bg-page` `--line-action` `--line-onaction` `--line-strong` `--ring-focus-control` `--text-action` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-14` `--radius-4` `--space-12` `--space-2` `--space-8` |
| `checkout-form` | 40 | `--bg-action` `--bg-action-soft` `--bg-inverse` `--bg-notice` `--bg-page` `--bg-rule` `--bg-surface` `--bg-track` `--bg-warning` `--elevation-1` `--elevation-knob` `--line-action` `--line-danger` `--line-hair` `--line-inverse` `--line-notice` `--line-strong` `--line-warning` `--mark-rating` `--text-action` `--text-body` `--text-bonus` `--text-danger` `--text-muted` `--text-oninverse` `--text-primary` `--text-secondary` `--text-success` `--text-warning` | `--container-page` `--container-text` `--dur-cycle` `--dur-fast` `--ease-cycle` `--ease-standard` `--font-display` `--font-mono` `--fs-10` `--fs-12` `--fs-14` `--fs-16` `--fs-20` `--fs-24` `--fs-30` `--fs-display` `--fw-black` `--fw-bold` `--fw-medium` `--fw-semibold` `--lh-airy` `--lh-flat` `--lh-snug` `--ls-caps` `--ls-display` `--ls-eyebrow` `--ls-lead` `--radius-12` `--radius-16` `--radius-8` `--radius-circle` `--radius-pill` `--size-24` `--size-26` `--size-38` `--size-46` `--size-52` `--space-12` `--space-16` `--space-2` `--space-24` `--space-32` `--space-4` `--space-40` `--space-8` |
| `chip` | 134 | `--bg-action` `--bg-action-pressed` `--bg-action-soft` `--bg-page` `--bg-sunken` `--line-action` `--line-hair` `--line-strong` `--ring-focus-control` `--text-action` `--text-body` `--text-muted` `--text-onaction-ink` `--text-primary` | `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fw-black` `--fw-bold` `--fw-semibold` `--radius-pill` `--shell-header-h` `--shell-top-live` `--size-32` `--space-12` `--space-16` `--space-4` `--space-8` |
| `city-dialog` | 134 | `--bg-page` `--elevation-4` `--line-hair` `--line-inverse` `--line-strong` `--text-body` `--text-muted` `--text-primary` | `--dur-slow` `--ease-enter` `--ease-exit` `--fs-12` `--fs-14` `--fs-18` `--fs-20` `--fw-black` `--fw-bold` `--lh-airy` `--ls-caps` `--move-md` `--radius-12` `--radius-8` `--radius-pill` `--space-12` `--space-16` `--space-24` `--space-4` `--space-8` |
| `client-dialog` | 26 | `--bg-page` `--elevation-4` `--line-hair` `--line-inverse` `--line-strong` `--text-muted` `--text-primary` `--text-secondary` | `--fs-12` `--fs-14` `--fs-18` `--fs-20` `--fs-24` `--fw-black` `--fw-semibold` `--lh-airy` `--lh-flat` `--radius-12` `--radius-circle` `--space-12` `--space-16` `--space-2` `--space-24` `--space-8` |
| `client-row` | 6 | `--bg-inverse` `--bg-surface` `--line-action` `--line-hair` `--line-inverse` `--line-oninverse-soft` `--text-body` `--text-muted` `--text-oninverse` `--text-oninverse-muted` `--text-primary` `--text-secondary` | `--font-body` `--font-display` `--font-mono` `--fs-12` `--fs-14` `--fs-16` `--fs-20` `--fs-24` `--fw-black` `--fw-bold` `--fw-medium` `--fw-semibold` `--lh-airy` `--lh-snug` `--ls-lead` `--radius-12` `--radius-16` `--space-12` `--space-16` `--space-2` `--space-24` `--space-32` `--space-4` `--space-8` |
| `coach-cabinet` | 8 | `--bg-action` `--bg-page` `--bg-sunken` `--bg-surface` `--line-action` `--line-hair` `--line-inverse` `--line-onaction` `--line-strong` `--text-body` `--text-muted` `--text-onaction` `--text-primary` `--text-secondary` | `--container-text` `--font-mono` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-24` `--fw-black` `--fw-bold` `--fw-semibold` `--radius-12` `--radius-circle` `--radius-pill` `--size-40` `--size-46` `--space-12` `--space-16` `--space-2` `--space-4` `--space-8` |
| `coach-clients` | 13 | `--bg-page` `--bg-sunken` `--elevation-1` `--line-action` `--line-hair` `--line-inverse` `--line-strong` `--ring-focus` `--ring-focus-control` `--text-muted` `--text-primary` `--text-secondary` | `--container-text` `--dur-base` `--dur-fast` `--ease-enter` `--ease-standard` `--font-display` `--fs-12` `--fs-14` `--fs-16` `--fs-30` `--fs-8` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-airy` `--lh-snug` `--ls-caps` `--ls-lead` `--move-md` `--radius-12` `--radius-4` `--radius-8` `--radius-circle` `--radius-pill` `--size-40` `--size-44` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` `--space-8` |
| `coach-landing` | 1 | `--bg-hatch` `--bg-inverse` `--bg-page` `--bg-surface` `--line-hair` `--line-inverse` `--mark-faint` `--text-body` `--text-muted` `--text-oninverse` `--text-primary` `--text-secondary` | `--container-text` `--font-display` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-24` `--fs-34` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-airy` `--lh-snug` `--ls-caps` `--ls-lead` `--radius-12` `--radius-16` `--radius-circle` `--radius-pill` `--size-30` `--space-12` `--space-16` `--space-32` `--space-4` `--space-40` `--space-8` |
| `coach-order` | 3 | `--bg-sunken` `--bg-surface` `--line-hair` `--line-strong` `--text-muted` `--text-primary` `--text-secondary` | `--fs-12` `--fs-14` `--fs-16` `--fs-20` `--fs-24` `--fw-black` `--fw-bold` `--fw-regular` `--fw-semibold` `--lh-snug` `--ls-caps` `--ls-lead` `--radius-12` `--radius-8` `--size-44` `--size-52` `--space-12` `--space-16` `--space-2` |
| `coach-session` | 8 | `--bg-page` `--bg-sunken` `--bg-surface` `--line-action` `--line-hair` `--line-inverse` `--line-strong` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--container-page` `--container-text` `--font-display` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-24` `--fs-8` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-airy` `--lh-snug` `--ls-lead` `--radius-12` `--radius-8` `--radius-pill` `--size-44` `--size-52` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` `--space-8` |
| `coach-tariff` | 3 | `--line-hair` `--line-inverse` `--text-muted` `--text-primary` `--text-secondary` | `--container-text` `--fs-12` `--fs-14` `--fs-16` `--fs-24` `--fw-black` `--fw-semibold` `--ls-lead` `--radius-12` `--space-12` `--space-16` `--space-24` `--space-4` |
| `coach-verify` | 5 | `--bg-action` `--bg-page` `--bg-success-soft` `--bg-sunken` `--bg-surface` `--line-action` `--line-danger` `--line-hair` `--line-strong` `--line-success` `--line-success-soft` `--text-body` `--text-danger` `--text-muted` `--text-onaction` `--text-primary` `--text-secondary` `--text-success` | `--container-text` `--font-display` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fs-24` `--fs-30` `--fw-black` `--fw-bold` `--fw-semibold` `--ls-display` `--ls-lead` `--radius-12` `--radius-16` `--radius-8` `--radius-circle` `--size-46` `--size-52` `--space-12` `--space-16` `--space-2` `--space-24` `--space-32` `--space-4` `--space-8` |
| `coach-wishlist` | 1 | `--line-strong` `--text-primary` `--text-secondary` | `--container-text` `--fs-14` `--radius-8` `--space-12` |
| `contacts-block` | 1 | `--bg-media` `--bg-page` `--line-hair` `--line-media` `--text-onmedia` `--text-primary` `--text-secondary` | `--fs-12` `--fs-16` `--fw-bold` `--lh-airy` `--radius-12` `--radius-4` `--size-20` `--space-12` `--space-16` `--space-2` `--space-4` `--space-8` |
| `cookie-banner` | 1 | `--bg-inverse` `--bg-page` `--bg-sunken` `--elevation-4` `--elevation-bar-top` `--line-hair` `--line-inverse` `--line-strong` `--text-muted` `--text-primary` `--text-secondary` | `--dur-fast` `--dur-slow` `--ease-enter` `--ease-exit` `--fs-12` `--fs-14` `--fs-16` `--fs-20` `--fw-black` `--fw-bold` `--fw-medium` `--lh-airy` `--move-md` `--radius-12` `--radius-8` `--radius-circle` `--radius-pill` `--size-24` `--space-12` `--space-16` `--space-24` `--space-4` `--space-8` |
| `counter` | – | `--text-muted` | `--font-mono` |
| `desc-block` | 2 | `--bg-page` `--line-hair` `--text-body` `--text-muted` `--text-primary` | `--container-text` `--fs-16` `--lh-airy` `--radius-12` `--space-12` `--space-32` |
| `discount` | 23 | `--bg-discount` `--bg-sunken` `--text-danger` `--text-secondary` | `--font-body` `--font-mono` `--fs-10` `--fs-12` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-flat` `--radius-4` `--space-2` `--space-4` `--space-8` |
| `empty-state` | 29 | `--bg-danger-soft` `--bg-surface` `--line-danger-soft` `--line-hair` `--line-strong` `--text-action` `--text-body` `--text-danger` `--text-muted` `--text-primary` `--text-secondary` | `--font-display` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fs-24` `--fs-30` `--fw-black` `--fw-semibold` `--lh-airy` `--radius-12` `--radius-circle` `--size-34` `--space-12` `--space-16` `--space-24` `--space-4` `--space-40` `--space-8` |
| `faq-page` | 1 | `--bg-page` `--bg-sunken` `--bg-surface` `--line-hair` `--line-strong` `--text-action` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--container-text` `--dur-fast` `--ease-standard` `--fs-14` `--fs-16` `--fs-18` `--fw-black` `--fw-bold` `--lh-airy` `--radius-12` `--radius-8` `--size-30` `--space-12` `--space-16` `--space-2` `--space-32` `--space-8` |
| `favourite` | 30 | – | `--size-44` |
| `field` | 141 | `--bg-page` `--bg-sunken` `--bg-surface` `--field-caret` `--line-action` `--line-control-filled` `--line-control-hover` `--line-danger` `--line-hair` `--line-strong` `--mark-disabled` `--ring-danger` `--ring-focus` `--text-body` `--text-muted` `--text-secondary` | `--dur-fast` `--ease-standard` `--font-mono` `--fs-12` `--fs-14` `--fs-16` `--fw-bold` `--fw-semibold` `--lh-snug` `--radius-12` `--size-20` `--size-40` `--size-44` `--space-12` `--space-16` `--space-2` `--space-8` |
| `filter-group` | 13 | `--line-hair` `--ring-focus-control` `--text-action` `--text-body` `--text-muted` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fw-bold` `--radius-4` `--space-12` `--space-16` `--space-8` |
| `filter-rail` | 22 | `--bg-page` `--bg-surface` `--elevation-1` `--elevation-3` `--line-action` `--line-hair` `--line-inverse` `--mark-faint` `--scrim-overlay` `--text-action` `--text-body` `--text-primary` `--text-secondary` | `--dur-base` `--dur-fast` `--ease-enter` `--ease-exit` `--ease-standard` `--fs-14` `--fw-black` `--fw-bold` `--fw-semibold` `--move-md` `--radius-12` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` `--space-8` |
| `filter-sheet` | 13 | `--bg-page` `--line-hair` `--scrim-overlay` `--text-primary` | `--dur-slow` `--ease-enter` `--ease-exit` `--fs-16` `--fs-20` `--fw-black` `--radius-16` `--space-12` `--space-16` |
| `footer` | 129 | `--bg-page` `--bg-surface` `--line-hair` `--text-action` `--text-muted` `--text-primary` `--text-secondary` | `--container-page` `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fs-24` `--fw-black` `--lh-airy` `--lh-flat` `--ls-caps` `--ls-display` `--radius-12` `--size-24` `--space-12` `--space-16` `--space-2` `--space-24` `--space-32` `--space-4` `--space-8` |
| `gallery` | 4 | `--bg-photo` `--bg-photo-far` `--bg-photo-mark` `--bg-sunken` `--elevation-mark` `--fade-photo` `--line-action` `--line-hair` `--mark-faint` `--shadow-floor` `--text-action` `--text-photo-mark` | `--dur-fast` `--ease-standard` `--fs-10` `--fw-black` `--lh-flat` `--ls-caps` `--radius-16` `--radius-8` `--radius-pill` `--space-12` `--space-4` `--space-8` |
| `goal-tile` | 6 | `--bg-action-hover` `--bg-page` `--bg-sunken` `--elevation-1` `--elevation-2` `--line-action` `--line-hair` `--line-strong` `--text-action` `--text-body` `--text-muted` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fw-bold` `--lh-airy` `--radius-16` `--radius-8` `--radius-circle` `--size-20` `--size-26` `--size-34` `--space-12` `--space-16` `--space-2` `--space-8` |
| `header` | 134 | `--bg-hatch` `--bg-inverse` `--bg-page` `--bg-sunken` `--bg-surface` `--elevation-3` `--elevation-action-hover` `--elevation-bar-bottom` `--line-action` `--line-hair` `--line-inverse` `--line-strong` `--mark-faint` `--ring-focus` `--scrim-overlay` `--text-action` `--text-body` `--text-danger` `--text-muted` `--text-oninverse` `--text-primary` `--text-secondary` | `--container-page` `--dur-base` `--dur-fast` `--dur-slow` `--ease-enter` `--ease-exit` `--ease-standard` `--font-display` `--fs-10` `--fs-12` `--fs-14` `--fs-20` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-flat` `--lh-snug` `--ls-caps` `--ls-display` `--radius-12` `--radius-4` `--radius-8` `--radius-pill` `--shell-top` `--size-20` `--size-44` `--space-12` `--space-16` `--space-2` `--space-4` `--space-8` |
| `hero` | 9 | `--bg-media` `--bg-page` `--elevation-1` `--elevation-2` `--fade-surface` `--line-hair` `--line-media` `--text-action` `--text-body` `--text-onmedia` `--text-onmedia-muted` `--text-secondary` `--veil-surface` `--veil-surface-mid` | `--dur-fast` `--ease-standard` `--font-display` `--fs-12` `--fs-18` `--fw-semibold` `--ls-lead` `--radius-16` `--space-12` `--space-16` `--space-2` `--space-4` `--space-8` |
| `icon` | – | – | `--dur-fast` `--ease-standard` `--lh-flat` `--space-4` |
| `info-page` | 6 | `--bg-inverse` `--bg-page` `--bg-sunken` `--bg-surface` `--line-hair` `--line-strong` `--text-action` `--text-body` `--text-muted` `--text-oninverse` `--text-primary` `--text-secondary` | `--container-text` `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fs-24` `--fs-34` `--fw-black` `--fw-bold` `--fw-semibold` `--grid-col-fluid` `--grid-col-min-panel` `--grid-gap-fluid` `--lh-airy` `--lh-flat` `--ls-caps` `--ls-lead` `--radius-12` `--radius-16` `--radius-circle` `--size-20` `--size-32` `--space-12` `--space-16` `--space-2` `--space-24` `--space-32` `--space-4` `--space-40` `--space-8` |
| `link-row` | 141 | `--line-strong` `--ring-focus-control` `--text-action` `--text-body` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-14` `--fw-bold` `--radius-4` `--size-44` `--space-16` |
| `loyalty-rung` | 39 | `--bg-action` `--bg-bonus-soft` `--bg-inverse` `--bg-page` `--bg-sunken` `--bg-surface` `--elevation-1` `--line-action` `--line-hair` `--line-strong` `--mark-tier-bronze` `--mark-tier-silver` `--text-action` `--text-body` `--text-bonus` `--text-muted` `--text-primary` `--text-secondary` `--text-success` `--text-warning` | `--container-text` `--dur-fast` `--ease-standard` `--font-body` `--font-display` `--font-mono` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fw-black` `--fw-bold` `--fw-semibold` `--grid-col-min-panel` `--lh-airy` `--ls-caps` `--radius-12` `--radius-16` `--radius-8` `--radius-pill` `--size-26` `--space-12` `--space-16` `--space-2` `--space-24` `--space-32` `--space-4` `--space-8` |
| `mega-menu` | 134 | `--bg-page` `--bg-surface` `--line-action` `--line-hair` `--line-strong` `--mark-faint` `--text-action` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fs-18` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-snug` `--radius-8` `--size-24` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` `--space-8` |
| `menu` | 14 | `--bg-page` `--bg-rule` `--bg-sunken` `--elevation-3` `--elevation-4` `--line-strong` `--ring-focus-control` `--scrim-overlay` `--text-action` `--text-body` `--text-muted` | `--dur-base` `--dur-fast` `--ease-enter` `--ease-exit` `--ease-standard` `--fs-14` `--fs-16` `--fw-medium` `--fw-semibold` `--lh-snug` `--radius-12` `--radius-16` `--radius-8` `--radius-pill` `--size-20` `--size-44` `--size-52` `--space-12` `--space-24` `--space-4` `--space-8` |
| `nav-drawer` | 134 | `--bg-page` `--elevation-3` `--line-hair` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--dr-top` `--dur-base` `--dur-slow` `--ease-enter` `--ease-exit` `--fs-12` `--fs-14` `--fs-16` `--fw-black` `--fw-bold` `--fw-semibold` `--ls-caps` `--size-20` `--space-12` `--space-16` `--space-2` `--space-32` `--space-8` |
| `nav-tile` | 2 | `--bg-page` `--elevation-1` `--line-action` `--line-hair` `--line-strong` `--text-action` `--text-muted` `--text-primary` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fw-bold` `--grid-col-fluid` `--grid-gap-fluid` `--lh-airy` `--radius-12` `--size-32` `--space-12` `--space-8` |
| `newsletter` | 1 | `--bg-page` `--bg-sunken` `--elevation-1` `--line-strong` `--text-action` `--text-muted` `--text-primary` `--text-secondary` | `--container-text` `--dur-fast` `--ease-standard` `--font-mono` `--fs-12` `--fs-24` `--fw-black` `--fw-bold` `--lh-airy` `--ls-caps` `--radius-12` `--radius-16` `--radius-circle` `--size-46` `--space-16` `--space-24` `--space-32` `--space-4` `--space-8` |
| `order-placed` | 2 | `--bg-success-soft` `--bg-sunken` `--bg-surface` `--line-hair` `--line-strong` `--line-success` `--line-success-soft` `--text-muted` `--text-primary` `--text-secondary` `--text-success` | `--container-text` `--fs-12` `--fs-14` `--fs-16` `--fs-20` `--fs-24` `--fs-30` `--fs-8` `--fw-black` `--fw-bold` `--fw-regular` `--fw-semibold` `--lh-airy` `--lh-snug` `--ls-caps` `--ls-lead` `--radius-12` `--radius-8` `--radius-circle` `--size-52` `--size-64` `--space-12` `--space-16` `--space-2` `--space-24` `--space-32` `--space-4` `--space-8` |
| `order-row` | 2 | `--bg-bonus-soft` `--bg-page` `--bg-sunken` `--bg-surface` `--elevation-1` `--line-action` `--line-bonus-soft` `--line-hair` `--line-strong` `--mark-faint` `--text-action` `--text-body` `--text-bonus` `--text-muted` `--text-primary` `--text-secondary` `--text-warning` | `--dur-base` `--dur-fast` `--ease-enter` `--ease-exit` `--ease-standard` `--font-mono` `--fs-10` `--fs-12` `--fs-14` `--fs-16` `--fs-8` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-snug` `--ls-caps` `--radius-12` `--radius-8` `--size-30` `--size-40` `--size-52` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` `--space-8` |
| `otp` | 141 | `--bg-danger` `--bg-page` `--line-action` `--line-danger` `--line-danger-soft` `--line-inverse` `--line-strong` `--ring-focus` `--text-body` `--text-danger` `--text-secondary` | `--dur-fast` `--ease-standard` `--font-mono` `--fs-12` `--fs-14` `--fs-16` `--fs-24` `--fw-medium` `--fw-semibold` `--lh-flat` `--radius-12` `--space-12` `--space-16` `--space-2` `--space-4` `--space-8` |
| `overlay` | 134 | `--scrim-overlay` | `--dur-slow` `--ease-enter` `--ease-exit` `--space-24` |
| `pagination` | 12 | `--bg-action` `--text-onaction` | `--space-16` `--space-24` `--space-8` |
| `pdp-tabs` | 8 | `--bg-action` `--bg-inverse` `--bg-page` `--elevation-2` `--line-hair` `--text-body` `--text-onaction` `--text-oninverse` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fs-16` `--fs-20` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-flat` `--radius-4` `--radius-8` `--shelf-h` `--shelf-top` `--space-12` `--space-16` `--space-2` `--space-24` `--space-40` `--space-8` |
| `plan-card` | 3 | `--bg-surface` `--line-action` `--line-inverse` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--fs-12` `--fs-14` `--fs-16` `--fs-20` `--fw-black` `--fw-semibold` `--space-12` `--space-16` `--space-24` `--space-4` `--space-8` |
| `price-slider` | 13 | `--bg-action` `--bg-track` `--elevation-knob` `--elevation-knob-active` `--line-onaction` | `--dur-fast` `--ease-standard` `--radius-4` `--radius-circle` `--size-20` `--space-12` `--space-16` `--space-4` |
| `price` | 60 | `--text-action` `--text-body` `--text-muted` | `--font-mono` `--fw-black` `--fw-regular` |
| `product-card` | 32 | `--bg-media` `--bg-page` `--elevation-1` `--elevation-2` `--line-action` `--line-hair` `--mark-faint` `--text-action` `--text-body` `--text-bonus` `--text-brandline` `--text-primary` `--text-secondary` | `--dur-fast` `--ease-standard` `--font-mono` `--fs-10` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fs-24` `--fs-8` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-flat` `--lh-snug` `--ls-lead` `--move-sm` `--radius-12` `--radius-8` `--size-20` `--size-44` `--space-12` `--space-16` `--space-2` `--space-4` `--space-8` |
| `product-grid` | 1 | – | `--grid-col-fluid` `--grid-gap-fluid` `--space-12` |
| `product-thumb` | – | `--bg-page` `--bg-sunken` `--line-hair` `--mark-faint` | `--fs-10` `--radius-8` `--size-40` `--size-52` |
| `promo-card` | 1 | `--bg-media` `--bg-page` `--bg-sunken` `--elevation-1` `--elevation-2` `--line-hair` `--text-muted` `--text-onmedia` `--text-primary` `--text-secondary` | `--container-text` `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fs-18` `--fw-black` `--fw-bold` `--grid-col-min-panel` `--grid-gap-fluid` `--lh-airy` `--lh-snug` `--radius-12` `--radius-pill` `--space-12` `--space-16` `--space-24` `--space-4` `--space-8` |
| `qa-item` | 4 | `--bg-surface` `--line-action` `--line-hair` `--text-body` `--text-primary` | `--container-text` `--fs-14` `--fs-16` `--fw-bold` `--radius-8` `--space-12` `--space-16` `--space-8` |
| `quiz` | 1 | `--bg-action` `--bg-notice` `--bg-page` `--bg-sunken` `--bg-track` `--elevation-4` `--line-hair` `--line-notice` `--line-strong` `--text-action` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--container-text` `--dur-base` `--dur-fast` `--ease-standard` `--fs-10` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fs-24` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-snug` `--ls-caps` `--ls-lead` `--radius-12` `--radius-16` `--radius-4` `--radius-8` `--radius-circle` `--radius-pill` `--scrim-ink-10` `--size-30` `--size-38` `--size-40` `--size-52` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` `--space-40` `--space-8` |
| `radio` | 14 | `--bg-action` `--bg-action-soft` `--bg-page` `--line-action` `--line-hair` `--line-inverse` `--line-strong` `--ring-focus-control` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--dur-fast` `--ease-standard` `--font-mono` `--fs-12` `--fs-14` `--fw-bold` `--fw-medium` `--fw-semibold` `--radius-12` `--radius-8` `--radius-circle` `--space-12` `--space-16` `--space-2` `--space-4` `--space-8` |
| `rating` | 34 | `--line-action` `--mark-inactive` `--mark-rating` `--text-body` `--text-muted` | `--dur-fast` `--ease-standard` `--font-mono` `--fs-12` `--fs-14` `--fs-30` `--fw-bold` `--lh-flat` `--radius-4` `--space-2` `--space-4` `--space-8` |
| `related` | 9 | `--bg-page` `--line-action` `--line-strong` `--text-action` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-14` `--fw-bold` `--radius-8` `--space-12` `--space-16` `--space-8` |
| `restock-note` | 2 | `--line-hair` `--text-body` `--text-secondary` | `--container-text` `--font-mono` `--fs-12` `--fs-14` `--fw-bold` `--lh-airy` `--lh-snug` `--space-12` `--space-2` `--space-4` |
| `review-item` | 4 | `--bg-inverse` `--bg-rule` `--bg-surface` `--line-action` `--line-hair` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--container-text` `--font-display` `--font-mono` `--fs-12` `--fs-14` `--fw-black` `--fw-bold` `--lh-airy` `--lh-flat` `--ls-caps` `--radius-12` `--radius-4` `--radius-8` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` `--space-8` |
| `review-modal` | 3 | `--bg-page` `--bg-surface` `--elevation-4` `--line-hair` `--text-body` `--text-danger` `--text-muted` `--text-primary` `--text-secondary` | `--dur-fast` `--dur-slow` `--ease-enter` `--ease-exit` `--ease-standard` `--font-display` `--font-mono` `--fs-12` `--fs-14` `--fs-20` `--fs-30` `--fw-black` `--fw-bold` `--fw-medium` `--fw-semibold` `--lh-airy` `--lh-flat` `--ls-caps` `--ls-lead` `--move-md` `--move-sm` `--radius-16` `--radius-8` `--size-40` `--space-12` `--space-16` `--space-24` `--space-4` `--space-8` |
| `search-overlay` | 1 | `--bg-page` `--bg-sunken` `--bg-surface` `--elevation-4` `--line-action` `--line-hair` `--line-strong` `--mark-faint` `--scrim-overlay` `--text-action` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--dr-top` `--dur-fast` `--ease-standard` `--fs-10` `--fs-12` `--fs-14` `--fs-16` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-snug` `--ls-caps` `--radius-12` `--radius-8` `--shell-top` `--size-20` `--size-46` `--space-12` `--space-16` `--space-40` `--space-8` |
| `section-head` | 28 | `--bg-surface` `--line-hair` `--text-action` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--dur-fast` `--ease-standard` `--font-display` `--fs-12` `--fs-16` `--fs-24` `--fs-display` `--fw-black` `--fw-bold` `--fw-medium` `--fw-semibold` `--ls-caps` `--ls-display` `--ls-lead` `--radius-8` `--space-12` `--space-16` `--space-24` `--space-32` `--space-4` `--space-8` |
| `seo-text` | 21 | `--bg-sunken` `--line-hair` `--text-action` `--text-primary` `--text-secondary` | `--container-text` `--dur-fast` `--ease-standard` `--font-display` `--fs-14` `--fs-18` `--fw-black` `--fw-bold` `--lh-airy` `--ls-lead` `--radius-12` `--space-12` `--space-16` `--space-24` `--space-8` |
| `skeleton` | 15 | `--bg-sunken` `--elevation-1` `--line-hair` `--text-muted` | `--dur-cycle` `--ease-cycle` `--fs-12` `--grid-col-fluid` `--grid-gap-fluid` `--radius-12` `--radius-4` `--radius-8` `--size-24` `--size-30` `--size-40` `--size-46` `--size-52` `--size-64` `--space-12` `--space-16` `--space-2` `--space-24` `--space-8` |
| `spec-table` | 2 | `--bg-inverse` `--bg-inverse-soft` `--bg-inverse-tint` `--bg-notice` `--bg-surface` `--fade-page` `--line-hair` `--line-inverse` `--line-notice` `--line-oninverse-soft` `--line-strong` `--text-body` `--text-muted` `--text-oninverse` `--text-oninverse-muted` `--text-primary` `--text-secondary` `--text-warning` | `--container-text` `--font-display` `--font-mono` `--fs-12` `--fs-14` `--fs-24` `--fw-black` `--fw-bold` `--fw-semibold` `--lh-airy` `--lh-flat` `--lh-snug` `--ls-caps` `--ls-lead` `--radius-12` `--radius-4` `--radius-8` `--size-26` `--space-12` `--space-16` `--space-2` `--space-24` `--space-4` `--space-8` |
| `stack-action` | 134 | `--bg-action` `--bg-action-soft` `--ring-focus-control` `--ring-onink` `--text-onaction-ink` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-10` `--fs-12` `--fw-black` `--fw-semibold` `--lh-flat` `--radius-8` `--radius-pill` `--size-20` `--space-2` `--space-4` |
| `status-pill` | 14 | `--bg-bonus-soft` `--bg-success-soft` `--bg-sunken` `--bg-surface` `--line-bonus-soft` `--line-strong` `--line-success-soft` `--text-secondary` `--text-success` `--text-warning` | `--font-mono` `--fs-10` `--fs-12` `--fw-black` `--fw-medium` `--lh-snug` `--ls-caps` `--radius-pill` `--space-12` `--space-2` `--space-4` `--space-8` |
| `stepper` | 12 | `--bg-action-soft` `--bg-surface` `--line-action` `--line-control-hover` `--line-strong` `--mark-disabled` `--ring-focus` `--text-action` `--text-body` | `--dur-fast` `--ease-standard` `--font-mono` `--fs-14` `--fs-16` `--fw-semibold` `--radius-8` `--size-30` `--size-32` `--size-34` |
| `switch` | 6 | `--bg-action` `--bg-page` `--bg-track` `--ring-focus-control` | `--dur-fast` `--ease-standard` `--radius-circle` `--radius-pill` `--size-20` `--size-26` `--size-44` |
| `system-page` | 5 | `--line-hair` `--text-action` `--text-muted` `--text-primary` `--text-secondary` | `--dur-fast` `--ease-standard` `--fs-12` `--fs-14` `--fs-16` `--fs-24` `--fs-34` `--fw-black` `--fw-bold` `--lh-airy` `--lh-flat` `--ls-display` `--radius-12` `--space-12` `--space-16` `--space-24` `--space-4` `--space-40` `--space-8` |
| `tabbar` | 134 | `--bg-action` `--bg-page` `--elevation-bar-top` `--line-hair` `--text-body` `--text-secondary` | `--fw-black` `--radius-4` `--size-26` `--space-2` `--space-4` `--space-8` |
| `toast` | 141 | `--bg-inverse` `--bg-page` `--elevation-4` `--line-onink` `--text-oninverse` `--text-primary` | `--dur-base` `--dur-slow` `--ease-enter` `--ease-exit` `--fs-12` `--fs-14` `--fw-black` `--move-md` `--move-sm` `--radius-8` `--radius-circle` `--size-20` `--space-12` `--space-16` `--space-8` |
| `toolbar` | 17 | `--bg-action` `--bg-page` `--line-hair` `--line-strong` `--text-muted` `--text-onaction-ink` | `--fs-12` `--fs-14` `--fw-black` `--fw-semibold` `--radius-8` `--radius-pill` `--shell-header-h` `--shell-top-live` `--size-40` `--space-12` `--space-16` `--space-2` `--space-8` |
| `trust-strip` | 5 | `--bg-action` `--bg-onphoto` `--bg-page` `--bg-sunken` `--bg-surface` `--elevation-1` `--elevation-control` `--line-action` `--line-hair` `--line-inverse` `--text-action` `--text-body` `--text-muted` `--text-onaction-ink` `--text-primary` `--text-secondary` | `--container-text` `--dur-fast` `--ease-standard` `--font-display` `--font-mono` `--fs-10` `--fs-12` `--fs-14` `--fs-16` `--fs-18` `--fs-20` `--fs-8` `--fw-black` `--fw-semibold` `--lh-snug` `--ls-lead` `--radius-12` `--radius-16` `--radius-8` `--radius-circle` `--radius-pill` `--size-20` `--size-30` `--size-38` `--size-40` `--size-44` `--space-12` `--space-16` `--space-2` `--space-24` `--space-32` `--space-4` `--space-8` |
| `upsell` | 2 | `--bg-action` `--bg-sunken` `--bg-surface` `--line-action` `--text-body` `--text-muted` `--text-primary` `--text-secondary` | `--container-text` `--fs-12` `--fs-14` `--fs-16` `--fw-black` `--lh-airy` `--radius-12` `--space-12` `--space-2` `--space-4` `--space-8` |
| `view-toggle` | 13 | `--bg-action-selected` `--bg-action-soft` `--bg-page` `--bg-surface` `--line-action` `--line-strong` `--text-action` `--text-muted` | `--dur-fast` `--ease-standard` `--fs-14` `--radius-8` `--space-12` `--space-8` |

**A component that reads a primitive directly is a finding, not a habit** - the geometry
primitives are read that way by design, the colour ones are not. Measured today: `--orange-500`
has 0 readers among components and 6 inside `tokens.css`, which is why the reverse list below
has to open in two knees.

---

## C. The reverse list - if I change this, what goes with it

**An inversion of the tables above, not a second pass over the code.** Two editions of one fact
drift, and the one consulted less often drifts first.

### C1. Semantic roles - one knee

| Role | Read by | On screens |
|---|---|---|
| `--bg-action` | account-shell, badge, banner, button, checkbox, checkout-form, chip, coach-cabinet, coach-verify, loyalty-rung, pagination, pdp-tabs, price-slider, quiz, radio, stack-action, switch, tabbar, toolbar, trust-strip, upsell | **141** |
| `--bg-action-hover` | goal-tile | catalog-page, home-buyer, home-cart, home-coach, index, search-empty |
| `--bg-action-pressed` | button, checkbox, chip | **141** |
| `--bg-action-selected` | view-toggle | **13** |
| `--bg-action-soft` | button, checkbox, checkout-form, chip, radio, stack-action, stepper, view-toggle | **141** |
| `--bg-bonus-soft` | loyalty-rung, order-row, status-pill | **53** |
| `--bg-danger` | button, otp | **141** |
| `--bg-danger-soft` | button, empty-state | **141** |
| `--bg-discount` | discount | **23** |
| `--bg-hatch` | auth-dialog, coach-landing, header | **141** |
| `--bg-inverse` | badge, buy-box, checkout-form, client-row, coach-landing, cookie-banner, header, info-page, loyalty-rung, pdp-tabs, review-item, spec-table, toast | **141** |
| `--bg-inverse-soft` | spec-table | product, product-coach |
| `--bg-inverse-tint` | spec-table | product, product-coach |
| `--bg-media` | blog-card, cert-thumb, contacts-block, hero, product-card, promo-card | **36** |
| `--bg-notice` | checkout-form, quiz, spec-table | **41** |
| `--bg-onphoto` | trust-strip | home-cart, product, product-coach, product-oos, product-reviews |
| `--bg-page` | account-shell, address-card, article, auth-dialog, badge, banner, blog-card, brand-logo, button, buy-bar, buy-box, cart-drawer, cart-row, cat-overlay, cert-thumb, checkbox, checkout-form, chip, city-dialog, client-dialog, coach-cabinet, coach-clients, coach-landing, coach-session, coach-verify, contacts-block, cookie-banner, desc-block, faq-page, field, filter-rail, filter-sheet, footer, goal-tile, header, hero, info-page, loyalty-rung, mega-menu, menu, nav-drawer, nav-tile, newsletter, order-row, otp, pdp-tabs, product-card, product-thumb, promo-card, quiz, radio, related, review-modal, search-overlay, switch, tabbar, toast, toolbar, trust-strip, view-toggle | **141** |
| `--bg-photo` | gallery | product, product-coach, product-loading, product-oos |
| `--bg-photo-far` | gallery | product, product-coach, product-loading, product-oos |
| `--bg-photo-mark` | gallery | product, product-coach, product-loading, product-oos |
| `--bg-rule` | auth-dialog, cert-thumb, checkout-form, menu, review-item | **141** |
| `--bg-save` | buy-box | product, product-coach, product-oos |
| `--bg-success` | **нікого** | **0** |
| `--bg-success-soft` | coach-verify, order-placed, status-pill | **21** |
| `--bg-sunken` | account-shell, address-card, article, auth-dialog, banner, blog-card, button, buy-box, chip, coach-cabinet, coach-clients, coach-order, coach-session, coach-verify, cookie-banner, discount, faq-page, field, gallery, goal-tile, header, info-page, loyalty-rung, menu, newsletter, order-placed, order-row, product-thumb, promo-card, quiz, search-overlay, seo-text, skeleton, status-pill, trust-strip, upsell | **141** |
| `--bg-surface` | account-shell, address-card, auth-dialog, banner, button, buy-box, cart-drawer, cat-overlay, checkout-form, client-row, coach-cabinet, coach-landing, coach-order, coach-session, coach-verify, empty-state, faq-page, field, filter-rail, footer, header, info-page, loyalty-rung, mega-menu, order-placed, order-row, plan-card, qa-item, review-item, review-modal, search-overlay, section-head, spec-table, status-pill, stepper, trust-strip, upsell, view-toggle | **141** |
| `--bg-track` | banner, checkout-form, price-slider, quiz, switch | **49** |
| `--bg-warning` | cart-drawer, checkout-form | **45** |
| `--elevation-1` | account-shell, address-card, article, banner, blog-card, cart-drawer, checkout-form, coach-clients, filter-rail, goal-tile, hero, loyalty-rung, nav-tile, newsletter, order-row, product-card, promo-card, skeleton, trust-strip | **112** |
| `--elevation-2` | banner, blog-card, goal-tile, hero, pdp-tabs, product-card, promo-card | **37** |
| `--elevation-3` | filter-rail, header, menu, nav-drawer | **134** |
| `--elevation-4` | auth-dialog, city-dialog, client-dialog, cookie-banner, menu, quiz, review-modal, search-overlay, toast | **141** |
| `--elevation-action-hover` | header | **134** |
| `--elevation-bar-bottom` | header | **134** |
| `--elevation-bar-top` | buy-bar, cart-drawer, cookie-banner, tabbar | **134** |
| `--elevation-control` | button, trust-strip | **141** |
| `--elevation-drawer` | cart-drawer | cart, cart-coach, cart-coach-empty, cart-empty, cart-oos |
| `--elevation-knob` | checkout-form, price-slider | **47** |
| `--elevation-knob-active` | price-slider | **13** |
| `--elevation-mark` | auth-dialog, badge, gallery | **141** |
| `--fade-inverse` | auth-dialog | **141** |
| `--fade-page` | auth-dialog, spec-table | **141** |
| `--fade-photo` | gallery | product, product-coach, product-loading, product-oos |
| `--fade-surface` | banner, hero | **11** |
| `--field-caret` | field | **141** |
| `--line-action` | account-shell, address-card, auth-dialog, banner, brand-logo, button, cert-thumb, checkbox, checkout-form, chip, client-row, coach-cabinet, coach-clients, coach-session, coach-verify, field, filter-rail, gallery, goal-tile, header, loyalty-rung, mega-menu, nav-tile, order-row, otp, plan-card, product-card, qa-item, radio, rating, related, review-item, search-overlay, stepper, trust-strip, upsell, view-toggle | **141** |
| `--line-bonus-soft` | order-row, status-pill | **16** |
| `--line-control-filled` | field | **141** |
| `--line-control-hover` | field, stepper | **141** |
| `--line-danger` | auth-dialog, button, checkout-form, coach-verify, field, otp | **141** |
| `--line-danger-soft` | empty-state, otp | **141** |
| `--line-hair` | account-shell, address-card, article, auth-dialog, banner, blog-card, brand-logo, button, buy-bar, buy-box, cart-drawer, cart-row, cat-overlay, cert-thumb, checkout-form, chip, city-dialog, client-dialog, client-row, coach-cabinet, coach-clients, coach-landing, coach-order, coach-session, coach-tariff, coach-verify, contacts-block, cookie-banner, desc-block, empty-state, faq-page, field, filter-group, filter-rail, filter-sheet, footer, gallery, goal-tile, header, hero, info-page, loyalty-rung, mega-menu, nav-drawer, nav-tile, order-placed, order-row, pdp-tabs, product-card, product-thumb, promo-card, qa-item, quiz, radio, restock-note, review-item, review-modal, search-overlay, section-head, seo-text, skeleton, spec-table, system-page, tabbar, toolbar, trust-strip | **141** |
| `--line-inverse` | address-card, buy-box, checkout-form, city-dialog, client-dialog, client-row, coach-cabinet, coach-clients, coach-landing, coach-session, coach-tariff, cookie-banner, filter-rail, header, otp, plan-card, radio, spec-table, trust-strip | **141** |
| `--line-media` | cert-thumb, contacts-block, hero | **14** |
| `--line-notice` | cart-drawer, checkout-form, quiz, spec-table | **46** |
| `--line-onaction` | account-shell, checkbox, coach-cabinet, price-slider | **62** |
| `--line-onink` | toast | **141** |
| `--line-oninverse-soft` | client-row, spec-table | **8** |
| `--line-onphoto` | auth-dialog | **141** |
| `--line-strong` | account-shell, address-card, article, badge, button, cart-drawer, cert-thumb, checkbox, checkout-form, chip, city-dialog, client-dialog, coach-cabinet, coach-clients, coach-order, coach-session, coach-verify, coach-wishlist, cookie-banner, empty-state, faq-page, field, goal-tile, header, info-page, link-row, loyalty-rung, mega-menu, menu, nav-tile, newsletter, order-placed, order-row, otp, quiz, radio, related, search-overlay, spec-table, status-pill, stepper, toolbar, view-toggle | **141** |
| `--line-success` | auth-dialog, coach-verify, order-placed | **141** |
| `--line-success-soft` | coach-verify, order-placed, status-pill | **21** |
| `--line-warning` | checkout-form | **40** |
| `--mark-disabled` | breadcrumb, button, field, stepper | **141** |
| `--mark-faint` | account-shell, address-card, cat-overlay, coach-landing, filter-rail, gallery, header, mega-menu, order-row, product-card, product-thumb, search-overlay | **141** |
| `--mark-inactive` | buy-box, rating | **34** |
| `--mark-rating` | checkout-form, rating | **43** |
| `--mark-tier-bronze` | loyalty-rung | **39** |
| `--mark-tier-silver` | loyalty-rung | **39** |
| `--ring-danger` | field | **141** |
| `--ring-focus` | coach-clients, field, header, otp, stepper | **141** |
| `--ring-focus-control` | breadcrumb, button, checkbox, chip, coach-clients, filter-group, link-row, menu, radio, stack-action, switch | **141** |
| `--ring-onink` | stack-action | **134** |
| `--scrim-overlay` | auth-dialog, cart-drawer, filter-rail, filter-sheet, header, menu, overlay, search-overlay | **141** |
| `--shadow-floor` | gallery | product, product-coach, product-loading, product-oos |
| `--text-action` | account-shell, address-card, article, auth-dialog, badge, banner, breadcrumb, button, buy-box, cart-drawer, cart-row, cat-overlay, checkbox, checkout-form, chip, empty-state, faq-page, filter-group, filter-rail, footer, gallery, goal-tile, header, hero, info-page, link-row, loyalty-rung, mega-menu, menu, nav-tile, newsletter, order-row, price, product-card, quiz, related, search-overlay, section-head, seo-text, stepper, system-page, trust-strip, view-toggle | **141** |
| `--text-body` | account-shell, address-card, article, auth-dialog, banner, blog-card, brand-logo, button, buy-bar, buy-box, cart-drawer, cart-row, cat-overlay, cert-thumb, checkout-form, chip, city-dialog, client-row, coach-cabinet, coach-landing, coach-session, coach-verify, desc-block, empty-state, faq-page, field, filter-group, filter-rail, goal-tile, header, hero, info-page, link-row, loyalty-rung, mega-menu, menu, nav-drawer, order-row, otp, pdp-tabs, plan-card, price, product-card, qa-item, quiz, radio, rating, restock-note, review-item, review-modal, search-overlay, section-head, spec-table, stepper, tabbar, trust-strip, upsell | **141** |
| `--text-bonus` | checkout-form, loyalty-rung, order-row, product-card | **66** |
| `--text-brandline` | banner, cart-row, product-card | **44** |
| `--text-danger` | account-shell, auth-dialog, button, buy-box, checkout-form, coach-verify, discount, empty-state, header, otp, review-modal | **141** |
| `--text-info` | availability | **36** |
| `--text-muted` | account-shell, article, auth-dialog, breadcrumb, button, buy-box, cart-drawer, cart-row, cat-overlay, cert-thumb, checkout-form, chip, city-dialog, client-dialog, client-row, coach-cabinet, coach-clients, coach-landing, coach-order, coach-session, coach-tariff, coach-verify, cookie-banner, counter, desc-block, empty-state, faq-page, field, filter-group, footer, goal-tile, header, info-page, loyalty-rung, mega-menu, menu, nav-drawer, nav-tile, newsletter, order-placed, order-row, plan-card, price, promo-card, quiz, radio, rating, review-item, review-modal, search-overlay, section-head, skeleton, spec-table, system-page, toolbar, trust-strip, upsell, view-toggle | **141** |
| `--text-onaction` | banner, button, coach-cabinet, coach-verify, pagination, pdp-tabs | **141** |
| `--text-onaction-ink` | account-shell, badge, chip, stack-action, toolbar, trust-strip | **134** |
| `--text-oninverse` | badge, checkout-form, client-row, coach-landing, header, info-page, pdp-tabs, spec-table, toast | **141** |
| `--text-oninverse-muted` | client-row, spec-table | **8** |
| `--text-onmedia` | blog-card, cert-thumb, contacts-block, hero, promo-card | **16** |
| `--text-onmedia-muted` | hero | **9** |
| `--text-photo-mark` | gallery | product, product-coach, product-loading, product-oos |
| `--text-price-was` | **нікого** | **0** |
| `--text-primary` | account-shell, address-card, article, auth-dialog, badge, banner, blog-card, breadcrumb, buy-box, cat-overlay, cert-thumb, checkout-form, chip, city-dialog, client-dialog, client-row, coach-cabinet, coach-clients, coach-landing, coach-order, coach-session, coach-tariff, coach-verify, coach-wishlist, contacts-block, cookie-banner, desc-block, empty-state, faq-page, filter-rail, filter-sheet, footer, header, info-page, loyalty-rung, mega-menu, nav-drawer, nav-tile, newsletter, order-placed, order-row, plan-card, product-card, promo-card, qa-item, quiz, radio, review-item, review-modal, search-overlay, section-head, seo-text, spec-table, system-page, toast, trust-strip, upsell | **141** |
| `--text-secondary` | account-shell, address-card, article, auth-dialog, availability, banner, blog-card, brand-logo, button, buy-box, cart-drawer, cart-row, cat-overlay, cert-thumb, checkbox, checkout-form, client-dialog, client-row, coach-cabinet, coach-clients, coach-landing, coach-order, coach-session, coach-tariff, coach-verify, coach-wishlist, contacts-block, cookie-banner, discount, empty-state, faq-page, field, filter-group, filter-rail, footer, goal-tile, header, hero, info-page, link-row, loyalty-rung, mega-menu, nav-drawer, nav-tile, newsletter, order-placed, order-row, otp, pdp-tabs, plan-card, product-card, promo-card, quiz, radio, related, restock-note, review-item, review-modal, search-overlay, section-head, seo-text, spec-table, stack-action, status-pill, system-page, tabbar, trust-strip, upsell | **141** |
| `--text-success` | auth-dialog, availability, buy-box, checkout-form, coach-verify, loyalty-rung, order-placed, status-pill | **141** |
| `--text-warning` | account-shell, availability, cart-drawer, checkout-form, loyalty-rung, order-row, spec-table, status-pill | **95** |
| `--veil-inverse` | auth-dialog | **141** |
| `--veil-page` | auth-dialog | **141** |
| `--veil-surface` | banner, hero | **11** |
| `--veil-surface-mid` | banner, hero | **11** |

### C2. Primitives - two knees, and sometimes three

A primitive reaches a screen through the roles that read it. Where a primitive is read by
another primitive the chain is closed first, transitively - `--grid-col-fluid` reads
`--grid-col-min-narrow`, and a walk that only knew role -> primitive called the floor dead.

| Primitive | Reached through | On screens |
|---|---|---|
| `--amber-200` | `--line-notice` | **46** |
| `--amber-50` | `--bg-warning` `--bg-notice` | **46** |
| `--amber-500` | `--text-warning` `--text-bonus` `--line-warning` | **96** |
| `--amber-700` | `--text-warning` `--text-bonus` `--line-warning` | **96** |
| `--amber-800` | `--line-notice` | **46** |
| `--amber-950` | `--bg-warning` `--bg-notice` | **46** |
| `--bp-grid-2col` | **нікого** | **0** |
| `--bp-shell-wide` | **нікого** | **0** |
| `--brown-600` | `--mark-tier-bronze` | **39** |
| `--charcoal` | `--text-primary` `--text-body` `--text-oninverse` `--text-onaction-ink` `--bg-inverse` `--bg-media` `--line-media` `--line-inverse` + 2 more | **141** |
| `--container-page` | *component cart-drawer.css* *component checkout-form.css* *component coach-session.css* *component footer.css* *component header.css* | **139** |
| `--container-text` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component blog-card.css* *component buy-box.css* *component cart-drawer.css* *component cert-thumb.css* + 23 more | **141** |
| `--dur-base` | *component coach-clients.css* *component filter-rail.css* *component header.css* *component menu.css* *component nav-drawer.css* *component order-row.css* *component quiz.css* *component toast.css* | **141** |
| `--dur-cycle` | *component auth-dialog.css* *component checkout-form.css* *component skeleton.css* | **141** |
| `--dur-fast` | *component account-shell.css* *component article.css* *component banner.css* *component blog-card.css* *component brand-logo.css* *component breadcrumb.css* *component button.css* *component cart-row.css* + 43 more | **141** |
| `--dur-slow` | *component auth-dialog.css* *component cat-overlay.css* *component city-dialog.css* *component cookie-banner.css* *component filter-sheet.css* *component header.css* *component nav-drawer.css* *component overlay.css* + 2 more | **141** |
| `--ease-cycle` | *component auth-dialog.css* *component checkout-form.css* *component skeleton.css* | **141** |
| `--ease-enter` | *component auth-dialog.css* *component cat-overlay.css* *component city-dialog.css* *component coach-clients.css* *component cookie-banner.css* *component filter-rail.css* *component filter-sheet.css* *component header.css* + 6 more | **141** |
| `--ease-exit` | *component auth-dialog.css* *component cat-overlay.css* *component city-dialog.css* *component cookie-banner.css* *component filter-rail.css* *component filter-sheet.css* *component header.css* *component menu.css* + 5 more | **141** |
| `--ease-standard` | *component account-shell.css* *component article.css* *component banner.css* *component blog-card.css* *component brand-logo.css* *component breadcrumb.css* *component button.css* *component cart-row.css* + 42 more | **141** |
| `--fade-dark-0` | `--fade-page` | **141** |
| `--fade-ink-0` | `--fade-photo` `--fade-inverse` | **141** |
| `--fade-light-0` | `--fade-inverse` | **141** |
| `--fade-surface-dark-0` | `--fade-surface` | **11** |
| `--fade-warm-0` | `--fade-surface` | **11** |
| `--fade-white-0` | `--fade-page` | **141** |
| `--font-body` | *component availability.css* *component buy-box.css* *component client-row.css* *component discount.css* *component loyalty-rung.css* | **77** |
| `--font-display` | *component account-shell.css* *component auth-dialog.css* *component banner.css* *component buy-box.css* *component cart-drawer.css* *component checkout-form.css* *component client-row.css* *component coach-clients.css* + 13 more | **141** |
| `--font-mono` | *component account-shell.css* *component auth-dialog.css* *component banner.css* *component buy-box.css* *component cart-drawer.css* *component cert-thumb.css* *component checkout-form.css* *component client-row.css* + 19 more | **141** |
| `--fs-10` | *component address-card.css* *component badge.css* *component buy-box.css* *component cart-row.css* *component cert-thumb.css* *component checkout-form.css* *component discount.css* *component gallery.css* + 9 more | **139** |
| `--fs-12` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component availability.css* *component banner.css* *component blog-card.css* *component breadcrumb.css* + 58 more | **141** |
| `--fs-14` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component availability.css* *component banner.css* *component blog-card.css* *component brand-logo.css* + 61 more | **141** |
| `--fs-16` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component banner.css* *component blog-card.css* *component button.css* *component cart-drawer.css* + 35 more | **141** |
| `--fs-18` | *component address-card.css* *component article.css* *component auth-dialog.css* *component banner.css* *component button.css* *component cat-overlay.css* *component city-dialog.css* *component client-dialog.css* + 15 more | **141** |
| `--fs-20` | *component account-shell.css* *component article.css* *component auth-dialog.css* *component banner.css* *component buy-bar.css* *component cart-drawer.css* *component cart-row.css* *component cat-overlay.css* + 19 more | **141** |
| `--fs-24` | *component address-card.css* *component auth-dialog.css* *component banner.css* *component cart-drawer.css* *component checkout-form.css* *component client-dialog.css* *component client-row.css* *component coach-cabinet.css* + 16 more | **141** |
| `--fs-30` | *component auth-dialog.css* *component banner.css* *component buy-box.css* *component checkout-form.css* *component coach-clients.css* *component coach-verify.css* *component empty-state.css* *component order-placed.css* + 2 more | **141** |
| `--fs-34` | *component auth-dialog.css* *component coach-landing.css* *component info-page.css* *component system-page.css* | **141** |
| `--fs-8` | *component coach-clients.css* *component coach-session.css* *component order-placed.css* *component order-row.css* *component product-card.css* *component trust-strip.css* | **55** |
| `--fs-display` | *component account-shell.css* *component checkout-form.css* *component section-head.css* | **78** |
| `--fw-black` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component badge.css* *component banner.css* *component blog-card.css* *component buy-box.css* + 49 more | **141** |
| `--fw-bold` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component availability.css* *component banner.css* *component blog-card.css* *component brand-logo.css* + 51 more | **141** |
| `--fw-medium` | *component banner.css* *component cart-drawer.css* *component cart-row.css* *component checkout-form.css* *component client-row.css* *component cookie-banner.css* *component menu.css* *component otp.css* + 4 more | **141** |
| `--fw-regular` | *component buy-box.css* *component coach-order.css* *component order-placed.css* *component price.css* | **62** |
| `--fw-semibold` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component banner.css* *component buy-box.css* *component cart-drawer.css* *component cart-row.css* + 40 more | **141** |
| `--gold-500` | `--mark-rating` | **43** |
| `--green-400` | `--text-success` `--line-success` | **141** |
| `--green-50` | `--bg-success` | **0** |
| `--green-600` | `--text-success` `--line-success` | **141** |
| `--green-950` | `--bg-success` | **0** |
| `--grey-24` | `--bg-inverse-soft` | **2** |
| `--grey-aa` | `--text-price-was` | **0** |
| `--grey-bb` | `--mark-faint` | **141** |
| `--grey-cc` | `--mark-disabled` | **141** |
| `--grid-col-fluid` | *component cert-thumb.css* *component info-page.css* *component nav-tile.css* *component product-grid.css* *component skeleton.css* | **27** |
| `--grid-col-min` | *component article.css* *component cert-thumb.css* *component info-page.css* *component nav-tile.css* *component product-grid.css* *component skeleton.css* | **28** |
| `--grid-col-min-narrow` | *component cert-thumb.css* *component info-page.css* *component nav-tile.css* *component product-grid.css* *component skeleton.css* | **27** |
| `--grid-col-min-panel` | *component address-card.css* *component blog-card.css* *component info-page.css* *component loyalty-rung.css* *component promo-card.css* | **51** |
| `--grid-gap-fluid` | *component article.css* *component blog-card.css* *component cert-thumb.css* *component info-page.css* *component nav-tile.css* *component product-grid.css* *component promo-card.css* *component skeleton.css* | **34** |
| `--lh-airy` | *component address-card.css* *component article.css* *component auth-dialog.css* *component banner.css* *component blog-card.css* *component buy-box.css* *component cart-drawer.css* *component checkout-form.css* + 26 more | **141** |
| `--lh-flat` | *component account-shell.css* *component auth-dialog.css* *component badge.css* *component banner.css* *component buy-bar.css* *component buy-box.css* *component cart-drawer.css* *component cat-overlay.css* + 18 more | **141** |
| `--lh-snug` | *component article.css* *component badge.css* *component banner.css* *component blog-card.css* *component button.css* *component buy-box.css* *component cart-row.css* *component cat-overlay.css* + 20 more | **141** |
| `--ls-caps` | *component account-shell.css* *component address-card.css* *component badge.css* *component banner.css* *component buy-box.css* *component cert-thumb.css* *component checkout-form.css* *component city-dialog.css* + 19 more | **139** |
| `--ls-display` | *component auth-dialog.css* *component buy-box.css* *component checkout-form.css* *component coach-verify.css* *component footer.css* *component header.css* *component section-head.css* *component system-page.css* | **141** |
| `--ls-eyebrow` | *component auth-dialog.css* *component banner.css* *component checkout-form.css* | **141** |
| `--ls-lead` | *component account-shell.css* *component auth-dialog.css* *component banner.css* *component buy-box.css* *component cart-drawer.css* *component checkout-form.css* *component client-row.css* *component coach-clients.css* + 15 more | **141** |
| `--move-md` | *component auth-dialog.css* *component city-dialog.css* *component coach-clients.css* *component cookie-banner.css* *component filter-rail.css* *component review-modal.css* *component toast.css* | **141** |
| `--move-sm` | *component product-card.css* *component review-modal.css* *component toast.css* | **141** |
| `--orange-25` | `--bg-action-soft` | **141** |
| `--orange-50` | `--bg-action-hover` | **6** |
| `--orange-500` | `--text-action` `--bg-action` `--line-action` | **141** |
| `--orange-600` | `--bg-action-pressed` | **141** |
| `--orange-700` | `--bg-action-pressed` | **141** |
| `--orange-900` | `--bg-action-hover` | **6** |
| `--orange-950` | `--bg-action-soft` | **141** |
| `--radius-12` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component banner.css* *component blog-card.css* *component brand-logo.css* *component button.css* + 43 more | **141** |
| `--radius-16` | *component auth-dialog.css* *component banner.css* *component buy-box.css* *component checkout-form.css* *component client-row.css* *component coach-landing.css* *component coach-verify.css* *component filter-sheet.css* + 10 more | **141** |
| `--radius-4` | *component breadcrumb.css* *component buy-box.css* *component cert-thumb.css* *component checkbox.css* *component coach-clients.css* *component contacts-block.css* *component discount.css* *component filter-group.css* + 10 more | **141** |
| `--radius-8` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component button.css* *component buy-box.css* *component cart-row.css* *component cert-thumb.css* + 36 more | **141** |
| `--radius-circle` | *component account-shell.css* *component auth-dialog.css* *component availability.css* *component banner.css* *component cart-drawer.css* *component checkout-form.css* *component client-dialog.css* *component coach-cabinet.css* + 15 more | **141** |
| `--radius-pill` | *component account-shell.css* *component badge.css* *component blog-card.css* *component cert-thumb.css* *component checkout-form.css* *component chip.css* *component city-dialog.css* *component coach-cabinet.css* + 15 more | **139** |
| `--red-400` | `--text-danger` `--line-danger` | **141** |
| `--red-50` | `--bg-danger` `--bg-discount` `--bg-save` | **141** |
| `--red-600` | `--text-danger` `--line-danger` | **141** |
| `--red-950` | `--bg-danger` `--bg-discount` `--bg-save` | **141** |
| `--scrim-black-12` | `--elevation-1` `--elevation-3` | **139** |
| `--scrim-black-22` | `--elevation-1` `--elevation-2` `--elevation-4` `--elevation-control` `--elevation-bar-top` `--elevation-bar-bottom` | **141** |
| `--scrim-black-40` | `--elevation-3` `--elevation-mark` `--elevation-knob` | **141** |
| `--scrim-black-52` | `--elevation-4` `--elevation-drawer` `--scrim-overlay` | **141** |
| `--scrim-ink-07` | `--elevation-control` `--elevation-bar-top` `--elevation-bar-bottom` `--shadow-floor` | **141** |
| `--scrim-ink-10` | `--elevation-2` `--bg-inverse-tint` *component quiz.css* | **37** |
| `--scrim-ink-16` | `--elevation-mark` | **141** |
| `--scrim-ink-22` | `--elevation-knob` `--elevation-drawer` `--line-oninverse-soft` | **53** |
| `--scrim-ink-52` | `--scrim-overlay` | **141** |
| `--scrim-ink-75` | `--text-oninverse-muted` | **8** |
| `--scrim-white-10` | `--bg-inverse-tint` | **2** |
| `--scrim-white-20` | `--line-oninverse-soft` | **8** |
| `--scrim-white-50` | `--line-onphoto` | **141** |
| `--scrim-white-66` | `--text-onmedia-muted` `--text-oninverse-muted` | **13** |
| `--scrim-white-70` | **нікого** | **0** |
| `--scrim-white-94` | `--bg-onphoto` | **5** |
| `--shadow-1` | `--elevation-1` | **112** |
| `--size-20` | *component account-shell.css* *component button.css* *component contacts-block.css* *component field.css* *component goal-tile.css* *component header.css* *component info-page.css* *component menu.css* + 8 more | **141** |
| `--size-24` | *component button.css* *component cat-overlay.css* *component checkout-form.css* *component cookie-banner.css* *component footer.css* *component mega-menu.css* *component skeleton.css* | **141** |
| `--size-26` | *component checkout-form.css* *component goal-tile.css* *component loyalty-rung.css* *component spec-table.css* *component switch.css* *component tabbar.css* | **139** |
| `--size-30` | *component coach-landing.css* *component faq-page.css* *component order-row.css* *component quiz.css* *component skeleton.css* *component stepper.css* *component trust-strip.css* | **36** |
| `--size-32` | *component chip.css* *component info-page.css* *component nav-tile.css* *component stepper.css* | **137** |
| `--size-34` | *component buy-box.css* *component empty-state.css* *component goal-tile.css* *component stepper.css* | **48** |
| `--size-38` | *component cart-drawer.css* *component checkout-form.css* *component quiz.css* *component trust-strip.css* | **46** |
| `--size-40` | *component auth-dialog.css* *component button.css* *component coach-cabinet.css* *component coach-clients.css* *component field.css* *component order-row.css* *component product-thumb.css* *component quiz.css* + 4 more | **141** |
| `--size-44` | *component account-shell.css* *component button.css* *component coach-clients.css* *component coach-order.css* *component coach-session.css* *component favourite.css* *component field.css* *component header.css* + 5 more | **141** |
| `--size-46` | *component auth-dialog.css* *component checkout-form.css* *component coach-cabinet.css* *component coach-verify.css* *component newsletter.css* *component search-overlay.css* *component skeleton.css* | **141** |
| `--size-52` | *component brand-logo.css* *component button.css* *component checkout-form.css* *component coach-order.css* *component coach-session.css* *component coach-verify.css* *component menu.css* *component order-placed.css* + 4 more | **141** |
| `--size-64` | *component button.css* *component order-placed.css* *component skeleton.css* | **141** |
| `--slate-300` | `--text-info` | **36** |
| `--slate-400` | `--mark-tier-silver` | **39** |
| `--slate-600` | `--text-info` | **36** |
| `--space-12` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component badge.css* *component banner.css* *component blog-card.css* *component brand-logo.css* + 71 more | **141** |
| `--space-16` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component banner.css* *component blog-card.css* *component brand-logo.css* *component breadcrumb.css* + 63 more | **141** |
| `--space-2` | *component account-shell.css* *component address-card.css* *component badge.css* *component banner.css* *component blog-card.css* *component buy-box.css* *component cart-drawer.css* *component cart-row.css* + 42 more | **141** |
| `--space-24` | *component account-shell.css* *component article.css* *component auth-dialog.css* *component banner.css* *component blog-card.css* *component button.css* *component buy-box.css* *component cart-drawer.css* + 34 more | **141** |
| `--space-32` | *component account-shell.css* *component article.css* *component auth-dialog.css* *component banner.css* *component checkout-form.css* *component client-row.css* *component coach-landing.css* *component coach-verify.css* + 10 more | **141** |
| `--space-4` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component availability.css* *component badge.css* *component banner.css* *component blog-card.css* + 52 more | **141** |
| `--space-40` | *component auth-dialog.css* *component cart-drawer.css* *component checkout-form.css* *component coach-landing.css* *component empty-state.css* *component info-page.css* *component pdp-tabs.css* *component quiz.css* + 2 more | **141** |
| `--space-8` | *component account-shell.css* *component address-card.css* *component article.css* *component auth-dialog.css* *component availability.css* *component badge.css* *component banner.css* *component blog-card.css* + 66 more | **141** |
| `--tint-amber-06` | `--bg-bonus-soft` | **53** |
| `--tint-amber-30` | `--line-bonus-soft` | **16** |
| `--tint-amber-d-06` | `--bg-bonus-soft` | **53** |
| `--tint-amber-d-30` | `--line-bonus-soft` | **16** |
| `--tint-green-07` | `--bg-success-soft` | **21** |
| `--tint-green-35` | `--line-success-soft` | **21** |
| `--tint-green-d-07` | `--bg-success-soft` | **21** |
| `--tint-green-d-35` | `--line-success-soft` | **21** |
| `--tint-orange-10` | `--elevation-action-hover` `--bg-action-selected` | **134** |
| `--tint-orange-15` | `--elevation-action-hover` `--ring-focus` | **141** |
| `--tint-orange-45` | `--elevation-knob-active` `--ring-focus` | **141** |
| `--tint-red-04` | `--bg-danger-soft` | **141** |
| `--tint-red-10` | `--ring-danger` | **141** |
| `--tint-red-30` | `--line-danger-soft` | **141** |
| `--tint-red-d-04` | `--bg-danger-soft` | **141** |
| `--tint-red-d-10` | **нікого** | **0** |
| `--tint-red-d-30` | `--ring-danger` `--line-danger-soft` | **141** |
| `--veil-dark-86` | `--veil-surface-mid` | **11** |
| `--veil-dark-90` | `--veil-page` | **141** |
| `--veil-dark-96` | `--veil-surface` | **11** |
| `--veil-ink-42` | `--veil-inverse` | **141** |
| `--veil-light-42` | `--veil-inverse` | **141** |
| `--veil-warm-86` | `--veil-surface-mid` | **11** |
| `--veil-warm-96` | `--veil-surface` | **11** |
| `--veil-white-90` | `--veil-page` | **141** |
| `--warm-100` | `--bg-sunken` | **141** |
| `--warm-150` | `--bg-inverse-soft` | **2** |
| `--warm-200` | `--bg-rule` `--line-hair` `--bg-hatch` | **141** |
| `--warm-300` | `--bg-track` `--line-strong` `--mark-inactive` | **141** |
| `--warm-400` | `--text-secondary` `--line-control-filled` | **141** |
| `--warm-50` | `--text-primary` `--text-body` `--bg-surface` `--bg-inverse` `--line-inverse` `--bg-photo-far` | **141** |
| `--warm-500` | `--text-muted` `--text-brandline` `--line-control-hover` | **141** |
| `--warm-600` | `--text-muted` `--text-brandline` `--line-control-hover` `--mark-faint` `--text-price-was` | **141** |
| `--warm-700` | `--text-secondary` `--line-control-filled` `--mark-disabled` | **141** |
| `--warm-750` | `--bg-track` `--line-strong` `--mark-inactive` | **141** |
| `--warm-800` | `--bg-rule` `--line-hair` `--bg-hatch` | **141** |
| `--warm-850` | `--bg-sunken` | **141** |
| `--warm-900` | `--bg-surface` | **141** |
| `--warm-950` | `--bg-page` `--line-onink` | **141** |
| `--white` | `--text-oninverse` `--text-onaction` `--bg-page` `--text-onmedia` `--ring-onink` `--bg-photo` `--text-photo-mark` `--line-onink` + 1 more | **141** |

---

## D. Idle control - asked in both directions

| Question | Answer |
|---|---|
| a role no component reads | **2** - `--bg-success`, `--text-price-was` |
| a primitive no knee reaches | **2** - `--scrim-white-70`, `--tint-red-d-10` |
| the declared exception among primitives | `--bp-grid-2col`, `--bp-shell-wide` - no reader BY CONSTRUCTION, because `@media` cannot read a custom property. Asked both ways: if one of them ever gains a reader the run fails, because the exception would then be excusing something it no longer describes |
| a component on no screen at all | **0** |
| a component with no class of its own | **3** - counter, icon, product-thumb. Not a defect: a finding about NAMING, and the reason their screen count is a dash rather than a zero |
| a screen `microcopy.md` cannot answer for | **0** |
| a screen that did not open | **0** |

**Stage 08 asked the dead-component question BEFORE the roll-out and the answer could have
changed under it.** It is asked again here, over the whole product and with the panels open.

---

## Who reads this file

| Reader | What they come here for |
|---|---|
| a new developer | «what is this screen made of» - section A, before touching anything |
| you in a year | section C: what moves if this token changes, answered by a number rather than by a guess |
| Claude in a new session | the whole file is generated, so it is re-derivable in one command and never has to be trusted |
