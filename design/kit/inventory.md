# Component inventory

- **Version:** v1.0 (2026-08-04)
- **Shown on:** `design/overview.html`, section "Інвентар"
- **Read from:** all **142** screens in `wireframes/*.html` plus the shared render functions in
  `wireframes/_nav.js` - **not** from the coloured subset. The colour stage narrows what we PAINT,
  never what we KNOW about the product: a system built from the 40 painted screens would be missing
  half its components at rollout.
- **Read by:** stage 08 - the split of `kit.css` into files, the `@import` order in `index.css`, the
  stand groups in `design/kit/_nav.js`, and the build rounds all follow the **level** column.

## How the numbers were taken

A script walks every wireframe and counts **screens that carry the component's anchor class**, then
checks whether the component is also produced by a shared render function. Two rules made the count
honest, and both had to be applied after a first pass produced wrong zeros:

1. **A zero can mean "not present" or "the anchor class was guessed wrong."** Every zero was
   re-checked against the section names in `wireframes/_wf.css` before being written down. Six of
   them were bad guesses (`.pagination` -> `.pgnav`, `.related` -> `.relbox`, `.adr` -> `.addr-card`,
   `.fgrp` -> `.fgroup`, `.plist` for the list view, `.co-radio` for the radio) and one was real.
2. **A component rendered by JavaScript has no `class="..."` literal to find.** The toast is built as
   `t.className = 'wf-toast ...'` inside `wfToast()`, so a markup scan returns zero while the
   component is on every screen at runtime. Those rows say **JS** instead of a screen count.

## Level

`level = 1 + the highest level of what the component CONTAINS`. Level 1 (**atoms**) contains nothing
from the kit; level 2 (**molecules**) contains atoms; level 3 (**organisms**) contains molecules or
is a screen shell. Three is the ceiling: a dialog contains a form and a form is an organism too, but
the fourth rung is patterns, whose criterion is repetition, not nesting. Inside level 3 the ones that
contain no other organism come first.

**Grouping by purpose is not allowed at the top level.** By purpose a button and an auth dialog are
both "forms", and one lives inside the other. Purpose stays a secondary sort inside a level.

## Atoms (level 1)

| Component | Screens | Anchor | Note |
|---|---|---|---|
| Роздільник | 111 | `.sep` | also in the shared header/footer |
| Кнопка | 90 | `.btn` | variants: `.dark` filled, outline, `.on` selected |
| Бейдж / тег | 36 | `.tag` | |
| Кнопка-іконка (у кошик) | 31 | `.cartbtn` | the card's own action |
| Ціна | 30 | `.pnew` `.pold` `.perserv` | carries the locked colour rule: a discounted price takes the accent, a plain one stays ink |
| Мітка наявності | 30 | `.pavail` | honesty via text, not colour |
| Рейтинг | 30 | `.rate` | |
| Обране | 27 | `.fav` | on 7.6 the same corner slot holds delete instead - a different job, not a variant |
| Бейдж знижки | 24 | `.pcut` | |
| Лічильник у бейджі | 17 | `.cnt` `.hbadge` | header counters |
| Перемикач вигляду | 13 | `.vtoggle` | grid / list |
| Скелетон | 9 | `.sk` `.skgrid` | functional loading cue |
| Чип | 5 | `.chip` `.gchip` `.fchip` | filter, goal, active-filter |
| Радіо | 3 | `.co-radio` `.co-opt` | delivery / payment |
| Чекбокс | 2 | `.cb` `.ck` | filters, consent |
| Поле | 1 | `.fld` `.cef` | **kept despite one screen**: form controls are interaction primitives and a system without them is incomplete |
| OTP-комірка | 1 | `.otp` | same exception |
| Статус-пілюля | 1 | `.pill` | order status; also the notification trigger set (7.2/7.3) |

## Molecules (level 2)

| Component | Screens | Anchor | Note |
|---|---|---|---|
| Хлібні крихти | 111 | `.crumb` | |
| Картка товару | 32 | `.pcard` | **the canonical card.** Variant `.pcard-l` (list view) on 1 screen: same zones in a different arrangement, so a variant, not a component |
| Порожній стан | 27 | `.emptybox` `.es` | canonical + `.mini` inside a card |
| Заголовок секції | 23 | `.sech` | |
| SEO-текст | 21 | `.seotext` | always expanded - hidden text is not indexed |
| Тулбар | 13 | `.ltool` `.mtoolbar` | desktop + mobile sticky |
| Пагінація | 12 | `.pgnav` `.loadmore` | load-more **and** crawlable numbers |
| Схожі товари | 9 | `.relbox` `.relrow` | |
| Картка адреси | 7 | `.addr-card` | |
| Картка блогу | 6 | `.blogcard` | |
| Банер | 6 | `.banner` `.tbanner` `.hdeal` | trust mini-banners, promo, deal of the day |
| Рядок замовлення | 5 | `.oh` `.ocard` | collapsed row -> full detail |
| Щабель лояльності | 5 | `.lrung` | four states: done / now / next / locked |
| Плитка цілі | 4 | `.gcard` `.gtile` | |
| Логотип бренду | 4 | `.brandbox` | desaturated by default |
| Рядок кошика | 3 | `.ci` | |
| Тост | **JS** | `.wf-toast` | built by `wfToast()`; on every screen with the placeholder |
| Група фільтра | **JS** | `.fgroup` | collapsible, rail and sheet share it |

## Organisms (level 3)

Ones that contain no other organism come first.

| Component | Screens | Anchor | Note |
|---|---|---|---|
| Сітка товарів | 30 | `.prow` `.prow2` | holds the canonical card |
| Рейка фільтрів | 12 | `.frail` | desktop |
| Шухляда кошика | 6 | `.cdrawer` | quick view only; coach variant grouped by client |
| Липка смуга покупки | 3 | `.mbuybar` | carries the whole price fact on mobile |
| Модалка відгуку | 1 | `.pm` | shared by review and question |
| Мобільний шит фільтрів | **JS** | `.mfs` | |
| Оверлей діалогу | **JS** | `.wf-ov` | generic; city dialog and drawer share it |
| Діалог міста | **JS** | `.wf-city` | node 0.1a |
| Діалог авторизації | **JS** | `.auth-modal` | node 1.x, opened from any "Увійти" |
| Банер cookie | **JS** | `.wf-cookie` | node S |
| Мобільний таб-бар | **JS** | `.wf-tabbar` | primary mobile navigation |
| Футер | **JS** | `.wff` | node 0.2 |
| Оболонка кабінету | 44 | `.acc` | contains nav + panel; buyer and coach modes |
| Хедер | 5 + **JS** | `.wfh` | node 0.1; contains the mega menu |
| Мега-меню | 5 + **JS** | `.mega` | contains chips, cards, utility panel |

## One-off (not components)

Kept out of the kit deliberately, so the kit does not grow a shelf for things used once: the system
gallery chrome (`.sys-*`), the 404 / 500 / maintenance layouts, the prototype bar and screen tree
(`.wf-bar`, `.wf-canvas` - scaffolding of the prototype, not of the product), and the concept-stand
blocks. If one of them appears a second time it stops being one-off and enters the table above.

## What the inventory says about the product

- **50 components: 18 atoms, 18 molecules, 14 organisms.**
- **12 of them exist only as render functions** in `wireframes/_nav.js` - header, footer, tab bar,
  overlays, dialogs, toast, cookie banner, filter group. That is the shared chrome, and it is the
  reason the count of screens is a bad measure of importance: the footer scores zero in markup and
  stands on all 142 screens.
- The heaviest single component by reach is the **canonical product card**: 32 screens directly, plus
  every screen that renders a grid. Stage 08 splits `kit.css` starting from the atoms it is made of,
  not from the card itself.
