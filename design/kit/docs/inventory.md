# Component inventory

- **Version:** v2.0 (2026-08-04)
- **Shown on:** `design/kit/overview.html`, section "Інвентар" (from step 4); `design/overview.html`
- **Read from:** all **142 files** in `wireframes/*.html` (141 screens + the hub) plus the shared
  render functions in `wireframes/_nav.js`, AND - new in v2 - **both stylesheets rule by rule**
  (`wireframes/_wf.css` + `design/kit/kit.css`). The colour stage narrows what we PAINT, never what
  we KNOW about the product.
- **Read by:** stage 08 - the split of the stylesheets into files, the `@import` order in
  `index.css`, the stand groups in `design/kit/_nav.js`, and the build rounds all follow the
  **level** column.

## What v2 corrected, and why the correction was overdue

v1 was built by counting **anchor classes in the wireframe markup** for components someone had
listed. Its own rule - *a zero can mean the anchor class was guessed wrong* - was applied to the
markup and **never to the stylesheet**. Stage 08 step 1 applied it there, and the list did not
survive contact:

- **Six anchors were wrong.** `.chip`, `.gchip`, `.fchip`, `.pill`, `.cdrawer`, `.mfs` and `.ck`
  matched **zero** selectors in either stylesheet. The real classes are `.mgchip` / `.dr-chip` /
  `.hero-chips`, `.oh-status`, `.cart-drawer`, `.fsheet`, and the checkbox is `.cb` alone.
- **The list covered 42% of the CSS.** Mapping every rule of both stylesheets against the 51
  components of v1 left **1 517 lines with no home**: the whole checkout, the desktop buy box, the
  PDP tabs, the gallery, the spec tables, the loyalty ledger, the trust strip, the client dialog.

Nothing in v1 was invented; it simply was never asked to cover the stylesheet, because until stage
08 nothing depended on it doing so. Under the owner's decision to absorb both layers into
`design/system/`, every line has to land in a file or it is lost, so the list is now derived FROM the
stylesheets rather than checked against them. **51 -> 70 components** at step 5, and **84** today -
the layer has kept growing, and until 8.37 nothing was counting.

## How the numbers are taken

**Every number in the three tables below is measured, and `tools/inventory.mjs` re-measures it.**
That sentence was not true until 2026-08-16: the tables were a step-5 snapshot, and when something
finally asked, **66 of 73 `Lines` cells and 58 of 73 `Screens` cells had drifted**, thirteen
components had no row at all and two rows pointed at files that no longer exist.

- **Lines** is the real size of `design/system/components/<file>.css`. Checked on every run.
- **Screens** is how many of the **88 coloured screens** actually carry the component, asked of the
  **rendered DOM** rather than of the markup - a third of this product's chrome is written by
  `wireframes/_nav.js` at load, so a markup scan sees nothing while the component is on every
  screen. The old column carried a `**JS**` annotation for exactly that blindness; the browser walk
  removes the need for it, and the difference is not small - `footer.css` read 1 and measures **77**,
  `tabbar.css` read 0 and measures **82**. Checked by `node tools/inventory.mjs --screens`.
- A component's **anchors** for that count are the classes its own file declares and no other
  component file does. Three components have none - `counter.css`, `icon.css`, `product-thumb.css` -
  because every class they declare is also declared elsewhere, so their Screens cell reads `–`.
  That is a finding about naming, not a gap in the count.
- A screen count is still a bad measure of importance and stands here as context, not as a ranking.

## Level

`level = 1 + the highest level of what the component CONTAINS`. Level 1 (**atoms**) contains nothing
from the kit; level 2 (**molecules**) contains atoms; level 3 (**organisms**) contains molecules or
is a screen shell. Three is the ceiling: a dialog contains a form and a form is an organism too, but
the fourth rung is patterns, whose criterion is repetition, not nesting. Inside level 3 the ones that
contain no other organism come first, and that order is what `index.css` imports by.

**Grouping by purpose is not allowed at the top level.** By purpose a button and an auth dialog are
both "forms", and one lives inside the other. Purpose stays a secondary sort inside a level.

### Seven components exist only inside another one

`rating`, `favourite`, `discount`, `availability`, `cart-button`, `separator` and `mega-menu` have
**no unscoped rule anywhere**: in the source they are only ever `.pcard .rate`, `.crumb .sep`,
`.wfh .mega`. They still get their own file, with the selector kept byte for byte, because the
alternative is the card swallowing six atoms and stage 09 digging them back out of two places at
once. Their component pages say so out loud under "Not in the code -> stage 09": what is missing is
the unscoped base form, not the component.

## Atoms (level 1)

| Component | css file | Anchors | Screens | Lines |
|---|---|---|---|---|
| Кнопка | `button.css` | `.btn`, `.navbtn`, `.go` | 86 | 561 |
| Ціна | `price.css` | `.pnew`, `.pold`, `.perserv` | 44 | 418 |
| Чип | `chip.css` | `.mgchip`, `.dr-chip`, `.dr-chips` | 82 | 312 |
| Рядок посилань | `link-row.css` | `.linkrow`, `.seolink`, `.flinks` | 81 | 270 |
| Скелетон | `skeleton.css` | `.skline`, `.skcard`, `.skbtn` | 11 | 259 |
| Поле | `field.css` | `.fld`, `.cef`, `.txt-field` | 85 | 249 |
| Дія стовпчиком | `stack-action.css` | `.btn--stack`, `.ti`, `.tbadge` | 82 | 213 |
| Чекбокс | `checkbox.css` | `.cb`, `.optin` | 8 | 210 |
| Радіо | `radio.css` | `.co-radio`, `.co-opt` | 9 | 196 |
| Статус-пілюля | `status-pill.css` | `.oh-status`, `.aord-status`, `.pill` | 11 | 183 |
| Бейдж | `badge.css` | `.tag`, `.gnote` | 11 | 180 |
| Бейдж знижки | `discount.css` | `.pcut`, `.wtag` | 21 | 168 |
| Рейтинг | `rating.css` | `.rate`, `.st` | 21 | 164 |
| Лічильник кількості | `stepper.css` | `.ctrl` | 12 | 142 |
| Мітка наявності | `availability.css` | `.pavail` | 26 | 141 |
| Перемикач вигляду | `view-toggle.css` | `.vtoggle` | 7 | 139 |
| Перемикач | `switch.css` | `.sw` | 2 | 99 |
| Іконка | `icon.css` | `.uiv-ic`, `.chev` | – | 89 |
| Мініатюра товару | `product-thumb.css` |  | – | 68 |
| Лічильник | `counter.css` | `.cnt`, `.hbadge`, `.tbadge` | – | 62 |
| Обране | `favourite.css` | `.fav`, `.wlrm` | 20 | 47 |
| OTP-комірка | `otp.css` | `.otp` | 4 | 35 |

> **Оновлено після публікації (крок 6.2).** `cart-button.css` більше немає: іконкова
> кнопка стала обробкою в `button.css`, а рядок вище описує стан до того кроку. Чому саме
> так - у `consolidation.md`.


**22 files, 526 lines.**

## Molecules (level 2)

| Component | css file | Anchors | Screens | Lines |
|---|---|---|---|---|
| Картка товару | `product-card.css` | `.pcard`, `.packlabel` | 21 | 360 |
| Банер | `banner.css` | `.banner`, `.tbanner`, `.tbanners` | 6 | 232 |
| Рядок замовлення | `order-row.css` | `.oh`, `.ocard`, `.aord` | 2 | 208 |
| Смуга довіри | `trust-strip.css` | `.trustsec`, `.truststrip`, `.tsx` | 5 | 201 |
| Таблиця складу | `spec-table.css` | `.spectbl`, `.ctable`, `.dl` | 2 | 180 |
| Рядок кошика | `cart-row.css` | `.ci` | 11 | 154 |
| Порожній стан | `empty-state.css` | `.emptybox`, `.errbox`, `.empty` | 19 | 146 |
| Меню вибору | `menu.css` | `.menu`, `.menu-trig`, `.menu-val` | 8 | 150 |
| Рядок клієнта | `client-row.css` | `.cg`, `.coachbn` | 6 | 145 |
| Відгук | `review-item.css` | `.rvitem`, `.rvbody`, `.rvmeta` | 3 | 133 |
| Галерея | `gallery.css` | `.gal`, `.pmini` | 4 | 122 |
| Блок опису | `desc-block.css` | `.pdesc`, `.pd` | 2 | 118 |
| Щабель лояльності | `loyalty-rung.css` | `.lrung`, `.lbar`, `.loy` | 26 | 118 |
| Запитання | `qa-item.css` | `.qaitem` | 2 | 104 |
| Нотатка про поповнення | `restock-note.css` | `.restock`, `.rk` | 2 | 103 |
| Мініатюра сертифіката | `cert-thumb.css` | `.certthumb`, `.certbox` | 3 | 101 |
| Група фільтра | `filter-group.css` | `.fgroup`, `.fopt`, `.frange` | 7 | 99 |
| SEO-текст | `seo-text.css` | `.seotext` | 12 | 80 |
| Хлібні крихти | `breadcrumb.css` | `.crumb` | 87 | 78 |
| Заголовок секції | `section-head.css` | `.sech`, `.relh`, `.rvhead` | 24 | 77 |
| Картка адреси | `address-card.css` | `.addr`, `.addr-card`, `.addr-list` | 3 | 76 |
| Панель Pro | `upsell.css` | `.upsell`, `.ubar`, `.ulist`, `.uacts` | 2 | 83 |
| Пагінація | `pagination.css` | `.pgnav`, `.loadmore`, `.pages` | 8 | 70 |
| Тулбар | `toolbar.css` | `.ltool`, `.mtoolbar`, `.listing` | 7 | 55 |
| Плитка цілі | `goal-tile.css` | `.gcard`, `.gtile`, `.goaltiles` | 4 | 50 |
| Тост | `toast.css` | `.wf-toast`, `.wf-toasts` | 20 | 42 |
| Картка блогу | `blog-card.css` | `.blogcard`, `.blogrow` | 6 | 31 |
| Логотип бренду | `brand-logo.css` | `.brandbox`, `.brandrow` | 4 | 26 |
| Схожі товари | `related.css` | `.relbox`, `.relrow` | 2 | 14 |

**27 files, 1366 lines.**

## Organisms (level 3)

| Component | css file | Anchors | Screens | Lines |
|---|---|---|---|---|
| Кабінет тренера | `coach-cabinet.css` | `.cstat`, `.cnote`, `.csub` | 8 | 929 |
| Перевірка тренера | `coach-verify.css` | `.cv-wrap`, `.cv-steps`, `.cv-step` | 5 | 865 |
| Сесія замовлення | `coach-session.css` | `.cs-wrap`, `.cs-top`, `.cs-meta` | 8 | 850 |
| Клієнти тренера | `coach-clients.css` | `.cl-top`, `.cl-h1`, `.ch-name` | 10 | 621 |
| Лендинг тренера | `coach-landing.css` | `.clh`, `.kicker`, `.clh-cta` | 1 | 520 |
| Тариф тренера | `coach-tariff.css` | `.tf-lead`, `.tf-cur`, `.tf-cur-h` | 3 | 422 |
| Замовлення тренера | `coach-order.css` | `.od-wrap`, `.od-head`, `.od-head-t` | 3 | 401 |
| Форма чекауту | `checkout-form.css` | `.co`, `.smeths`, `.pf` | 26 | 367 |
| Хедер | `header.css` | `.wfh` | 82 | 354 |
| Блок покупки | `buy-box.css` | `.bb` | 4 | 290 |
| Картка тарифу | `plan-card.css` | `.tier`, `.tf-col`, `.tiers`, `.tf-compare` | 3 | 260 |
| Обране тренера | `coach-wishlist.css` | `.cw-note` | 1 | 254 |
| Оболонка кабінету | `account-shell.css` | `.acc`, `.acard`, `.abonus` | 33 | 240 |
| Шухляда кошика | `cart-drawer.css` | `.cart-drawer`, `.cart-behind`, `.cd` | 5 | 216 |
| Діалог входу | `auth-dialog.css` | `.auth-modal`, `.auth` | 5 | 178 |
| Діалог клієнта | `client-dialog.css` | `.cemodal`, `.cedlg`, `.ce` | 13 | 101 |
| Оверлей каталогу | `cat-overlay.css` | `.wf-catov`, `.wf-catov-h`, `.ctitle` | 0 | 97 |
| Смуга покупки | `buy-bar.css` | `.mbuybar` | 3 | 96 |
| Вкладки товару | `pdp-tabs.css` | `.pdp`, `.ptab`, `.ptabs` | 8 | 85 |
| Шит фільтрів | `filter-sheet.css` | `.fsheet` | 7 | 80 |
| Футер | `footer.css` | `.wff`, `.fh` | 77 | 79 |
| Шухляда меню | `nav-drawer.css` | `.wf-drawer`, `.dr-lock`, `.dr-b` | 82 | 75 |
| Таб-бар | `tabbar.css` | `.wf-tab`, `.wf-tabbar` | 82 | 73 |
| Модалка відгуку | `review-modal.css` | `.pm` | 3 | 59 |
| Рейка фільтрів | `filter-rail.css` | `.frail`, `.hrail` | 11 | 57 |
| Головний блок | `hero.css` | `.hero`, `.hvert`, `.hside` | 4 | 54 |
| Мега-меню | `mega-menu.css` | `.mega`, `.catov` | 82 | 43 |
| Банер cookie | `cookie-banner.css` | `.wf-cookie`, `.wf-ckset`, `.ck` | 0 | 42 |
| Діалог міста | `city-dialog.css` | `.wf-city`, `.city` | 82 | 38 |
| Системна сторінка | `system-page.css` | `.sys`, `.syscard`, `.sysdemo` | 0 | 38 |
| Повзунок ціни | `price-slider.css` | `.uiv-slider`, `.uiv-track`, `.uiv-fill` | 7 | 33 |
| Сітка товарів | `product-grid.css` | `.prow`, `.prow2`, `.plist` | 20 | 22 |
| Оверлей | `overlay.css` | `.wf-ov`, `.ceov` | 82 | 16 |

**23 files, 1997 lines.**

### Three things this table did not say, found at 8.29 and closed at 8.37

All three were the same defect wearing three faces: **a declared list with no idle control.**

1. **Eight coach components were not in this inventory at all** - and the note that said so had
   drifted too: the real gap was **thirteen**, the other five being `cat-overlay.css`, `menu.css`,
   `nav-drawer.css`, `product-thumb.css` and `stack-action.css`. An inventory that does not list
   thirteen of its files is not an inventory, it is a snapshot of one afternoon. All thirteen have
   rows now, and `tools/inventory.mjs` fails the run if a fourteenth ever appears without one.
2. **`upsell.css` was filed as a molecule here and called «рівень 3» in its own file header**, with
   its stand page's eyebrow saying «рівень 2». Three published claims, and the header was the odd
   one out. **The ladder settles it, not the count of witnesses:** the panel is a bordered block
   with a heading, a line of text and one `btn--accent` - atoms only, so level 2. The header is
   corrected in the file, with the reasoning beside it. THE IMPORT GROUP PROVES NOTHING either way,
   and that stands as the finding it was: the coach group in `index.css` is a SCOPE group, not a
   level group, so any file put there loses the one place its level was readable.
3. **The «Lines» column was a step-5 snapshot** - and so was `Screens`, which nobody had suspected.
   66 of 73 line counts and 58 of 73 screen counts were wrong, some of them by an order of
   magnitude in the direction that flatters a grep: `header.css` read 5 screens and carries 82.
   The files did not gain rules, they gained the comments that record why the rules are what they
   are, which is the intended growth measured against a number nobody re-asked. **This was backlog
   item 8, and `tools/inventory.mjs` is its answer:** `vars.mjs` and `grey-vars.mjs` ask whether a
   VALUE is still true, `roles.mjs` whether a TOKEN LIST is, and now something asks it of a COUNT.

## One-off (not components)

Kept out of the kit deliberately, so the kit does not grow a shelf for things used once: the
prototype bar and screen tree (`.wf-bar`, `.wf-canvas`, `.wf-page` - scaffolding of the prototype,
not of the product), the `design/` screen panel (`.uiv-side`, `.us-*`) and the concept-stand blocks.
These live in **`design/_stand.css`**, injected by `design/_nav.js`, and never enter
`design/system/`: a product screen carries exactly one stylesheet link of its own. If one of them
appears in the product a second time it stops being one-off and enters the table above.

The 404 / 500 / maintenance layouts moved the other way. v1 called them one-off; they are **screens
of the product**, so they are now `system-page.css` at level 3.

## What the inventory says about the product

- **84 components: 22 atoms, 29 molecules, 33 organisms.** Every one has a css file in
  `design/system/components/`, and `tools/inventory.mjs` fails if that stops being true. The number
  read 70 from step 5 until 2026-08-16, which is fourteen components of drift in one column.
- **The heaviest file is `checkout-form.css`.** Checkout is a quarter of the product's CSS and had
  no component at all in v1 - it was the single biggest hole the correction closed.
- **11 components come out of `wireframes/_nav.js`** rather than markup - the shared chrome. The
  footer scores zero in a markup scan and renders on **129** screens.
- The heaviest single component by reach is still the **canonical product card**, and the split
  starts from the atoms it is made of, not from the card itself.
