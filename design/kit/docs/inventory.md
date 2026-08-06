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
stylesheets rather than checked against them. **51 -> 70 components.**

## How the numbers are taken

- **Lines** is the real size of `design/system/components/<file>.css` after the split: structure from
  `_wf.css` and colour from `kit.css`, in that order, selectors unchanged.
- **Screens** counts wireframe files carrying any of the component's anchor classes in markup.
  **JS** means the component is also (or only) produced by a render function in
  `wireframes/_nav.js`, where a markup scan finds nothing while the component is on every screen at
  runtime. That is why a screen count is a bad measure of importance and stands here as context, not
  as a ranking.

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
| Поле | `field.css` | `.fld`, `.cef`, `.txt-field` | 7 + **JS** | 59 |
| Кнопка | `button.css` | `.btn`, `.navbtn`, `.go` | 92 + **JS** | 42 |
| OTP-комірка | `otp.css` | `.otp` | **JS** | 34 |
| Чип | `chip.css` | `.mgchip`, `.dr-chip`, `.dr-chips` | 6 + **JS** | 33 |
| Скелетон | `skeleton.css` | `.sk`, `.skgrid`, `.skcard` | 11 | 31 |
| Радіо | `radio.css` | `.co-radio`, `.co-opt` | 3 + **JS** | 31 |
| Перемикач вигляду | `view-toggle.css` | `.vtoggle` | 13 | 28 |
| Кнопка-іконка (у кошик) | `cart-button.css` | `.cartbtn` | 31 + **JS** | 27 |
| Рядок посилань | `link-row.css` | `.linkrow`, `.seolink`, `.flinks` | **JS** | 25 |
| Рейтинг | `rating.css` | `.rate`, `.st` | 32 + **JS** | 24 |
| Мітка наявності | `availability.css` | `.pavail` | 30 | 23 |
| Обране | `favourite.css` | `.fav`, `.wlrm` | 30 + **JS** | 21 |
| Статус-пілюля | `status-pill.css` | `.oh-status`, `.aord-status`, `.pill` | 3 | 21 |
| Бейдж знижки | `discount.css` | `.pcut`, `.wtag` | 34 | 18 |
| Чекбокс | `checkbox.css` | `.cb`, `.optin` | 2 + **JS** | 18 |
| Перемикач | `switch.css` | `.sw` | 9 + **JS** | 17 |
| Лічильник кількості | `stepper.css` | `.ctrl` | 13 | 16 |
| Іконка | `icon.css` | `.uiv-ic`, `.chev` | 4 | 15 |
| Ціна | `price.css` | `.pnew`, `.pold`, `.perserv` | 40 | 13 |
| Лічильник у бейджі | `counter.css` | `.cnt`, `.hbadge`, `.tbadge` | 18 + **JS** | 12 |
| Бейдж / тег | `badge.css` | `.tag`, `.gnote` | 36 | 9 |
| Роздільник | `separator.css` | `.sep`, `.sepb` | 111 + **JS** | 9 |

> **Оновлено після публікації (крок 6.2).** `cart-button.css` більше немає: іконкова
> кнопка стала обробкою в `button.css`, а рядок вище описує стан до того кроку. Чому саме
> так - у `consolidation.md`.


**22 files, 526 lines.**

## Molecules (level 2)

| Component | css file | Anchors | Screens | Lines |
|---|---|---|---|---|
| Картка товару | `product-card.css` | `.pcard`, `.packlabel` | 32 + **JS** | 143 |
| Банер | `banner.css` | `.banner`, `.tbanner`, `.tbanners` | 13 + **JS** | 126 |
| Таблиця складу | `spec-table.css` | `.spectbl`, `.ctable`, `.dl` | 4 | 121 |
| Смуга довіри | `trust-strip.css` | `.trustsec`, `.truststrip`, `.tsx` | 4 | 104 |
| Щабель лояльності | `loyalty-rung.css` | `.lrung`, `.lbar`, `.loy` | 37 | 83 |
| Рядок замовлення | `order-row.css` | `.oh`, `.ocard`, `.aord` | 11 | 70 |
| Відгук | `review-item.css` | `.rvitem`, `.rvbody`, `.rvmeta` | 6 + **JS** | 68 |
| Рядок кошика | `cart-row.css` | `.ci` | 3 + **JS** | 67 |
| Порожній стан | `empty-state.css` | `.emptybox`, `.es`, `.empty` | 34 + **JS** | 61 |
| Картка адреси | `address-card.css` | `.addr`, `.addr-card`, `.addr-list` | 9 + **JS** | 56 |
| Галерея | `gallery.css` | `.gal`, `.pmini` | 5 | 56 |
| Група фільтра | `filter-group.css` | `.fgroup`, `.fopt`, `.frange` | **JS** | 51 |
| Тулбар | `toolbar.css` | `.ltool`, `.mtoolbar`, `.listing` | 13 + **JS** | 38 |
| Заголовок секції | `section-head.css` | `.sech`, `.relh`, `.rvhead` | 58 | 36 |
| Рядок клієнта | `client-row.css` | `.cg`, `.coachbn` | 8 + **JS** | 31 |
| Плитка цілі | `goal-tile.css` | `.gcard`, `.gtile`, `.goaltiles` | 4 | 29 |
| Картка блогу | `blog-card.css` | `.blogcard`, `.blogrow` | 6 | 28 |
| Нотатка про поповнення | `restock-note.css` | `.restock`, `.rk` | 3 | 26 |
| Пагінація | `pagination.css` | `.pgnav`, `.loadmore`, `.pages` | 12 + **JS** | 24 |
| Логотип бренду | `brand-logo.css` | `.brandbox`, `.brandrow` | 4 | 22 |
| Тост | `toast.css` | `.wf-toast`, `.wf-toasts` | **JS** | 21 |
| Мініатюра сертифіката | `cert-thumb.css` | `.certthumb`, `.certbox` | 3 | 21 |
| Блок опису | `desc-block.css` | `.pdesc`, `.pd` | 2 | 19 |
| SEO-текст | `seo-text.css` | `.seotext` | 21 | 18 |
| Хлібні крихти | `breadcrumb.css` | `.crumb` | 111 | 16 |
| Запитання і відповідь | `qa-item.css` | `.qaitem` | 2 | 16 |
| Схожі товари | `related.css` | `.relbox`, `.relrow` | 9 | 15 |

**27 files, 1366 lines.**

## Organisms (level 3)

| Component | css file | Anchors | Screens | Lines |
|---|---|---|---|---|
| Форма чекауту | `checkout-form.css` | `.co`, `.smeths`, `.pf` | 17 + **JS** | 331 |
| Хедер | `header.css` | `.wfh` | 5 + **JS** | 185 |
| Оболонка кабінету | `account-shell.css` | `.acc`, `.acard`, `.abonus` | 45 + **JS** | 173 |
| Діалог авторизації | `auth-dialog.css` | `.auth-modal`, `.auth` | **JS** | 172 |
| Блок покупки | `buy-box.css` | `.bb` | 4 | 148 |
| Шухляда кошика | `cart-drawer.css` | `.cart-drawer`, `.cart-behind`, `.cd` | 6 + **JS** | 108 |
| Вкладки картки товару | `pdp-tabs.css` | `.pdp`, `.ptab`, `.ptabs` | 8 + **JS** | 80 |
| Модалка відгуку | `review-modal.css` | `.pm` | 1 + **JS** | 69 |
| Рейка фільтрів | `filter-rail.css` | `.frail`, `.hrail` | 21 + **JS** | 57 |
| Футер | `footer.css` | `.wff`, `.fh` | 1 + **JS** | 46 |
| Мега-меню | `mega-menu.css` | `.mega`, `.catov` | 5 + **JS** | 44 |
| Банер cookie | `cookie-banner.css` | `.wf-cookie`, `.wf-ckset`, `.ck` | **JS** | 42 |
| Липка смуга покупки | `buy-bar.css` | `.mbuybar` | 3 | 41 |
| Головний блок | `hero.css` | `.hero`, `.hvert`, `.hside` | 14 | 41 |
| Повзунок ціни | `price-slider.css` | `.uiv-slider`, `.uiv-track`, `.uiv-fill` | 0 | 33 |
| Системна сторінка | `system-page.css` | `.sys`, `.syscard`, `.sysdemo` | 4 | 33 |
| Діалог міста | `city-dialog.css` | `.wf-city`, `.city` | 4 + **JS** | 29 |
| Діалог клієнта | `client-dialog.css` | `.cemodal`, `.cedlg`, `.ce` | 2 + **JS** | 27 |
| Мобільний таб-бар | `tabbar.css` | `.wf-tab`, `.wf-tabbar` | **JS** | 25 |
| Мобільний шит фільтрів | `filter-sheet.css` | `.fsheet` | **JS** | 23 |
| Сітка товарів | `product-grid.css` | `.prow`, `.prow2`, `.plist` | 31 | 22 |
| Оверлей діалогу | `overlay.css` | `.wf-ov`, `.ceov` | **JS** | 16 |

**22 files, 1745 lines.**

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

- **70 components: 22 atoms, 27 molecules, 21 organisms.** Every one has a css file in
  `design/system/components/`; the page and the registry row arrive at step 4.
- **The heaviest file is `checkout-form.css`.** Checkout is a quarter of the product's CSS and had
  no component at all in v1 - it was the single biggest hole the correction closed.
- **11 components come out of `wireframes/_nav.js`** rather than markup - the shared chrome. The
  footer scores zero in a markup scan and renders on **129** screens.
- The heaviest single component by reach is still the **canonical product card**, and the split
  starts from the atoms it is made of, not from the card itself.
