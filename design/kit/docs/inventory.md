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
- **Screens** is how many of the **92 coloured pages** actually carry the component, asked of the
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

## Width - the column stage 10 filled, and it was filled ALL AT ONCE

**`Width` says what each component knows about width, and it is DERIVED, not typed.** Every cell is
read out of the file itself: the `@media` numbers it holds after the comments are stripped, plus
`ramp` when it carries a `clamp()` and `fluid` when it carries `auto-fit`, `auto-fill`, `minmax()`
or `flex-wrap`. `620` and `860` are the two registry points, and a mirror (`619`, `859`) reads as
its point because it is the same decision written from the other side, and `@container` names a
threshold about the PLACE rather than the screen. **The column no longer holds a `step 5` cell:** the
one pair deliberately left off the registry, `coach-session`'s 939/940, was spent by step 5 and folded
onto 859/860, so every cell in the column now names a registry number, a ramp, a fill or a container.

**It was filled after all four rounds and not before, on purpose.** A column filled for one level of
four says «unknown» about the other three in a shape that reads like «nothing to say». Atoms were
closed at round 1, molecules at round 2, organisms at round 3 and the single pattern at round 4;
only then did the column mean the same thing on every row.

**An empty cell here would mean «behaves unknown on a wide screen».** There are none: a component
that deliberately does not adapt carries `–`, which is an answer - its box is set by its own
content and it travels with the container that adapts. 14 atoms, 4 molecules and 2 organisms read
that way, and each one is named in `responsive.md` under its round.

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

| Component | css file | Anchors | Рух | Width | Screens | Lines |
|---|---|---|---|---|---|---|
| Кнопка | `button.css` | `.btn`, `.navbtn`, `.go` | відповідь | ramp | 86 | 621 |
| Меню вибору | `menu.css` | `.menu`, `.menu-trig`, `.menu-val` | відповідь · зв'язок | 620 | 8 | 190 |
| Ціна | `price.css` | `.pnew`, `.pold`, `.perserv` | немає: стану немає | – | 44 | 418 |
| Чип | `chip.css` | `.mgchip`, `.dr-chip`, `.dr-chips` | відповідь | 860 · fluid | 82 | 320 |
| Рядок посилань | `link-row.css` | `.linkrow`, `.seolink`, `.flinks` | відповідь | fluid | 81 | 270 |
| Скелетон | `skeleton.css` | `.skline`, `.skcard`, `.skbtn` | статус | 860 · fluid | 11 | 295 |
| Поле | `field.css` | `.fld`, `.cef`, `.txt-field` | відповідь | – | 85 | 269 |
| Дія стовпчиком | `stack-action.css` | `.btn--stack`, `.ti`, `.tbadge` | відповідь | – | 82 | 218 |
| Чекбокс | `checkbox.css` | `.cb`, `.optin` | відповідь | – | 8 | 210 |
| Радіо | `radio.css` | `.co-radio`, `.co-opt` | відповідь | fluid | 9 | 196 |
| Статус-пілюля | `status-pill.css` | `.oh-status`, `.aord-status`, `.pill` | немає: стану немає | – | 11 | 190 |
| Бейдж | `badge.css` | `.tag`, `.gnote` | немає: стану немає | – | 11 | 180 |
| Бейдж знижки | `discount.css` | `.pcut`, `.wtag` | немає: стану немає | – | 21 | 168 |
| Рейтинг | `rating.css` | `.rate`, `.st` | відповідь | – | 21 | 164 |
| Лічильник кількості | `stepper.css` | `.ctrl` | відповідь | – | 12 | 142 |
| Мітка наявності | `availability.css` | `.pavail` | немає: стану немає | – | 26 | 141 |
| Перемикач вигляду | `view-toggle.css` | `.vtoggle` | відповідь | 860 | 7 | 144 |
| Перемикач | `switch.css` | `.sw` | відповідь | – | 2 | 113 |
| Іконка | `icon.css` | `.uiv-ic`, `.chev` | відповідь | – | – | 89 |
| Мініатюра товару | `product-thumb.css` |  | немає: стану немає | – | – | 83 |
| Лічильник | `counter.css` | `.cnt`, `.hbadge`, `.tbadge` | немає: стану немає | – | – | 62 |
| Обране | `favourite.css` | `.fav`, `.wlrm` | відповідь | – | 20 | 47 |
| OTP-комірка | `otp.css` | `.otp` | відповідь | – | 4 | 35 |

> **Оновлено після публікації (крок 6.2).** `cart-button.css` більше немає: іконкова
> кнопка стала обробкою в `button.css`, а рядок вище описує стан до того кроку. Чому саме
> так - у `consolidation.md`.


**23 files, 4565 lines.**

## Molecules (level 2)

| Component | css file | Anchors | Рух | Width | Screens | Lines |
|---|---|---|---|---|---|---|
| Картка товару | `product-card.css` | `.pcard`, `.packlabel` | відповідь | 620 · 860 · fluid | 21 | 383 |
| Банер | `banner.css` | `.banner`, `.tbanner`, `.tbanners` | відповідь | 620 · ramp · fluid | 6 | 269 |
| Рядок замовлення | `order-row.css` | `.oh`, `.ocard`, `.aord` | відповідь · зв'язок | 620 · 860 · fluid | 2 | 254 |
| Смуга довіри | `trust-strip.css` | `.trustsec`, `.truststrip`, `.tsx` | відповідь | 620 · 860 · ramp · fluid | 5 | 225 |
| Таблиця складу | `spec-table.css` | `.spectbl`, `.ctable`, `.dl` | немає: стану немає | 620 · fluid | 2 | 195 |
| Рядок кошика | `cart-row.css` | `.ci` | відповідь | fluid | 11 | 169 |
| Порожній стан | `empty-state.css` | `.emptybox`, `.errbox`, `.empty` | немає: стану немає | fluid | 19 | 157 |
| Рядок клієнта | `client-row.css` | `.cg`, `.coachbn` | немає: стан hover - це зміна тла рядка списку; рух тут сказав би, що рядок кудись іде, а він лишається | fluid | 6 | 145 |
| Відгук | `review-item.css` | `.rvitem`, `.rvbody`, `.rvmeta` | немає: стану немає | 620 · 860 · fluid | 3 | 133 |
| Галерея | `gallery.css` | `.gal`, `.pmini` | відповідь | 860 | 4 | 131 |
| Блок опису | `desc-block.css` | `.pdesc`, `.pd` | немає: стану немає | – | 2 | 118 |
| Щабель лояльності | `loyalty-rung.css` | `.lrung`, `.lbar`, `.loy` | відповідь | fluid | 26 | 134 |
| Запитання | `qa-item.css` | `.qaitem` | немає: стану немає | – | 2 | 104 |
| Нотатка про поповнення | `restock-note.css` | `.restock`, `.rk` | немає: стану немає | fluid | 2 | 133 |
| Мініатюра сертифіката | `cert-thumb.css` | `.certthumb`, `.certbox` | відповідь | fluid | 3 | 101 |
| Група фільтра | `filter-group.css` | `.fgroup`, `.fopt`, `.frange` | відповідь | – | 7 | 99 |
| SEO-текст | `seo-text.css` | `.seotext` | відповідь | 860 | 12 | 91 |
| Хлібні крихти | `breadcrumb.css` | `.crumb` | відповідь | – | 87 | 78 |
| Заголовок секції | `section-head.css` | `.sech`, `.relh`, `.rvhead` | відповідь | 620 · fluid | 24 | 92 |
| Картка адреси | `address-card.css` | `.addr`, `.addr-card`, `.addr-list` | немає: те саме, що рядок клієнта - hover міняє тло картки в списку, не її місце | fluid | 3 | 94 |
| Пагінація | `pagination.css` | `.pgnav`, `.loadmore`, `.pages` | немає: disabled і busy це ЗАБОРОНА і ОЧІКУВАННЯ, а не відповідь на дію; рух на забороненому контролі читається як спрацювало | – | 8 | 70 |
| Тулбар | `toolbar.css` | `.ltool`, `.mtoolbar`, `.listing` | немає: стану немає | 860 · fluid | 7 | 63 |
| Плитка цілі | `goal-tile.css` | `.gcard`, `.gtile`, `.goaltiles` | відповідь | 620 · 860 · fluid | 4 | 58 |
| Тост | `toast.css` | `.wf-toast`, `.wf-toasts` | зв'язок | – | 20 | 76 |
| Картка блогу | `blog-card.css` | `.blogcard`, `.blogrow` | відповідь | 620 | 6 | 37 |
| Логотип бренду | `brand-logo.css` | `.brandbox`, `.brandrow` | відповідь | 620 | 4 | 26 |
| Схожі товари | `related.css` | `.relbox`, `.relrow` | відповідь | fluid | 2 | 14 |

**27 files, 3449 lines.**

## Organisms (level 3)

| Component | css file | Anchors | Рух | Width | Screens | Lines |
|---|---|---|---|---|---|---|
| Кабінет тренера | `coach-cabinet.css` | `.cstat`, `.cnote`, `.csub` | немає: стану немає | 620 · fluid | 8 | 972 |
| Перевірка тренера | `coach-verify.css` | `.cv-wrap`, `.cv-steps`, `.cv-step` | немає: open тут перемикає КРОК майстра всередині сторінки, а не поверхню; крок не приходить нізвідки | 620 · 860 · fluid | 5 | 916 |
| Сесія замовлення | `coach-session.css` | `.cs-wrap`, `.cs-top`, `.cs-meta` | немає: open розкриває секцію кошика сесії; висоту не анімуємо (розкладка щокадру в списку), а проявлення без зсуву тут нічого не повідомляє | 620 · 860 · fluid | 8 | 889 |
| Клієнти тренера | `coach-clients.css` | `.cl-top`, `.cl-h1`, `.ch-name` | зв'язок | 620 · 860 · fluid · @container | 10 | 863 |
| Лендинг тренера | `coach-landing.css` | `.clh`, `.kicker`, `.clh-cta` | немає: стану немає | 620 · 860 · fluid | 1 | 537 |
| Тариф тренера | `coach-tariff.css` | `.tf-lead`, `.tf-cur`, `.tf-cur-h` | немає: стану немає | fluid | 3 | 426 |
| Замовлення тренера | `coach-order.css` | `.od-wrap`, `.od-head`, `.od-head-t` | немає: стану немає | 620 · fluid | 3 | 448 |
| Форма чекауту | `checkout-form.css` | `.co`, `.smeths`, `.pf` | відповідь · статус | 620 · 860 · ramp · fluid | 26 | 386 |
| Хедер | `header.css` | `.wfh` | відповідь · зв'язок | 860 · @container · fluid | 82 | 435 |
| Блок покупки | `buy-box.css` | `.bb` | немає: hover належить кнопкам усередині (button.css), сам блок нерухомий - він не контрол, а місце | 620 · fluid | 4 | 292 |
| Картка тарифу | `plan-card.css` | `.tier`, `.tf-col`, `.tiers`, `.tf-compare` | немає: open це вибір тарифу, тобто СТАН вибору; його несе рамка й колір, і рух додав би святкування, якого забороняє Принцип 4 | 620 | 3 | 261 |
| Обране тренера | `coach-wishlist.css` | `.cw-note` | немає: стану немає | – | 1 | 278 |
| Оболонка кабінету | `account-shell.css` | `.acc`, `.acard`, `.abonus` | відповідь | 620 · 860 · fluid | 33 | 294 |
| Шухляда кошика | `cart-drawer.css` | `.cart-drawer`, `.cart-behind`, `.cd` | немає: hover і focus-vis належать рядкам усередині; сама шухляда їде transform-ом на власному рівні і тому не має тут другого запису | 620 | 5 | 228 |
| Діалог входу | `auth-dialog.css` | `.auth-modal`, `.auth` | зв'язок · статус | 860 | 5 | 218 |
| Діалог клієнта | `client-dialog.css` | `.cemodal`, `.cedlg`, `.ce` | немає: стану немає | 620 | 13 | 115 |
| Оверлей каталогу | `cat-overlay.css` | `.wf-catov`, `.wf-catov-h`, `.ctitle` | зв'язок | 860 | 0 | 121 |
| Смуга покупки | `buy-bar.css` | `.mbuybar` | немає: стану немає | 860 | 3 | 96 |
| Вкладки товару | `pdp-tabs.css` | `.pdp`, `.ptab`, `.ptabs` | відповідь | 860 · ramp · fluid | 8 | 95 |
| Шит фільтрів | `filter-sheet.css` | `.fsheet` | зв'язок | 860 | 7 | 94 |
| Футер | `footer.css` | `.wff`, `.fh` | відповідь | 620 · 860 · fluid | 77 | 84 |
| Шухляда меню | `nav-drawer.css` | `.wf-drawer`, `.dr-lock`, `.dr-b` | зв'язок | 860 | 82 | 99 |
| Таб-бар | `tabbar.css` | `.wf-tab`, `.wf-tabbar` | немає: selected це мітка сторінки, на якій ви стоїте; вона не приходить і не йде, вона просто є | 860 | 82 | 80 |
| Модалка відгуку | `review-modal.css` | `.pm` | зв'язок · відповідь | – | 3 | 88 |
| Рейка фільтрів | `filter-rail.css` | `.frail`, `.hrail` | відповідь · зв'язок | 860 | 11 | 89 |
| Головний блок | `hero.css` | `.hero`, `.hvert`, `.hside` | відповідь | 860 · ramp | 4 | 62 |
| Мега-меню | `mega-menu.css` | `.mega`, `.catov` | відповідь | 860 · fluid | 82 | 56 |
| Банер cookie | `cookie-banner.css` | `.wf-cookie`, `.wf-ckset`, `.ck` | зв'язок · відповідь | 620 · fluid | 0 | 84 |
| Діалог міста | `city-dialog.css` | `.wf-city`, `.city` | зв'язок | 620 · fluid | 82 | 65 |
| Системна сторінка | `system-page.css` | `.sys`, `.syscard`, `.sysdemo` | немає: стану немає | 620 · 860 · fluid | 0 | 42 |
| Повзунок ціни | `price-slider.css` | `.uiv-slider`, `.uiv-track`, `.uiv-fill` | відповідь | – | 7 | 33 |
| Сітка товарів | `product-grid.css` | `.prow`, `.prow2`, `.plist` | немає: стану немає | fluid | 20 | 34 |
| Оверлей | `overlay.css` | `.wf-ov`, `.ceov` | зв'язок | – | 82 | 38 |
| Панель Pro | `upsell.css` | `.upsell`, `.ubar`, `.ulist`, `.uacts` | немає: стану немає | – | 2 | 102 |

**34 files, 8920 lines.**

### Three things this table did not say, found at 8.29 and closed at 8.37

All three were the same defect wearing three faces: **a declared list with no idle control.**

1. **Eight coach components were not in this inventory at all** - and the note that said so had
   drifted too: the real gap was **thirteen**, the other five being `cat-overlay.css`, `menu.css`,
   `nav-drawer.css`, `product-thumb.css` and `stack-action.css`. An inventory that does not list
   thirteen of its files is not an inventory, it is a snapshot of one afternoon. All thirteen have
   rows now, and `tools/inventory.mjs` fails the run if a fourteenth ever appears without one.
2. **`upsell.css` was filed as a molecule here and called «рівень 3» in its own file header**, with
   its stand page's eyebrow saying «рівень 2». Three published claims, and the header was the odd
   one out. The ladder was read at 8.37 and gave level 2: the panel is a bordered block with a
   heading, a line of text and one `btn--accent` - atoms only. **THE OWNER OVERRULED THAT AT 8.57,
   and the file, the stand page and this table all sit at level 3 today.** The argument that lost is
   kept in the file header rather than deleted, because the shape of the disagreement is the useful
   part: nesting alone makes the panel a molecule, and the owner ranked it instead as a
   self-contained block of the coach flow - something the coach meets whole, not a part another
   component assembles. This paragraph said «the header is corrected in the file» for two stages
   after that stopped being true, which is the same failure it was written to record: **a note about
   a decision outlives the decision, and the note is what the next reader believes.** THE IMPORT
   GROUP PROVES NOTHING either way, and that stands as the finding it was: the coach group in
   `index.css` is a SCOPE group, not a level group, so any file put there loses the one place its
   level was readable - which is why the owner's call rested on one agreeing placement, not two.
3. **The «Lines» column was a step-5 snapshot** - and so was `Screens`, which nobody had suspected.
   66 of 73 line counts and 58 of 73 screen counts were wrong, some of them by an order of
   magnitude in the direction that flatters a grep: `header.css` read 5 screens and carries 82.
   The files did not gain rules, they gained the comments that record why the rules are what they
   are, which is the intended growth measured against a number nobody re-asked. **This was backlog
   item 8, and `tools/inventory.mjs` is its answer:** `vars.mjs` and `grey-vars.mjs` ask whether a
   VALUE is still true, `roles.mjs` whether a TOKEN LIST is, and now something asks it of a COUNT.

## Patterns - the level above a component (stage 09)

The inventory now describes BOTH levels of the system, not only the components. A pattern is a
stable composition of components that the product repeats on three or more screens; it declares
composition only and no colour, and it imports after every component in `index.css`.

| Патерн | css | Сторінка стенда | З чого зібраний | Екрани `design/` | Сірих екранів | Правил |
|---|---|---|---|---|---|---|
| Ряд дій | `patterns/action-row.css` | `kit/action-row.html` | – | `button.css` + `--space-12` | 15 | 70 | 4 |

**Where the 15 coloured screens are**, and the list is the pattern's proof of existence rather than
an illustration: `account` · `account-addresses` · `cart` · `cart-coach` · `cart-oos` ·
`coach-client` · `coach-client-loading` · `coach-clients` · `coach-clients-cap` ·
`coach-clients-loading` · `coach-landing` · `coach-order` · `coach-orders` ·
`coach-verify-loading` · `home-cart`.

**Thirteen container names carry it**, and their own component files kept only what differs:
`.uacts` `.cv-btnrow` `.clh-cta` `.addr-acts` `.aord-actions` `.od-acts` `.ord-acts` `.cl-acts`
`.ccard-acts` `.cc-cta` `.oc-actions` `.cs-act` `.ci-links`. Two more were measured and NOT
converted, and both are named in `backlog.md` list 4 rather than left to be noticed: `.ceact` and
`.cedlg .act`, whose markup is built by `wireframes/_nav.js` - the shared script both corpora load,
and the grey corpus is not edited by this stage - and `.sys-acts`, which has zero coloured
occurrences and so has nothing to prove with pixels.

**51 compositions stand on exactly two screens**; `kit/patterns.html` shows the **eight** nearest to a third occurrence, named one by one, and says so on the page. They are not
patterns and they are not lost: a composition that happened twice stays markup and waits for a third
occurrence. Half of them live on screens that are still grey, so stage 12 will supply the third by
itself.

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

- **84 components: 23 atoms, 27 molecules, 34 organisms.** Every one has a css file in
  `design/system/components/`, and `tools/inventory.mjs` fails if that stops being true. The number
  read 70 from step 5 until 2026-08-16, which is fourteen components of drift in one column.
- **The heaviest file is `checkout-form.css`.** Checkout is a quarter of the product's CSS and had
  no component at all in v1 - it was the single biggest hole the correction closed.
- **11 components come out of `wireframes/_nav.js`** rather than markup - the shared chrome. The
  footer scores zero in a markup scan and renders on **129** screens.
- The heaviest single component by reach is still the **canonical product card**, and the split
  starts from the atoms it is made of, not from the card itself.
