# Rollout - the journal of stage 12

- **Page:** `design/overview.html`, section «Розкотка» (`NAV_SECTIONS` row `rollout`)
- **Read by:** stage 13. This file holds the ONLY written «screen -> IA node» map in the
  repository, and the handoff reads it to build its behaviour spec. The subagent questions at the
  foot become the first draft of `onboarding-gaps.md`.
- **Language:** section D is the text fifty subagents receive verbatim, so it stays in the language
  of the session (Ukrainian). Everything around it is English, like every other md here. That
  exception is declared in `CLAUDE.md` for interface strings and it is the same reason: a text that
  is going to be USED is not a text about the work.

---

## A. The estimate, and it covers the WHOLE product

Generated, not typed: `node tools/rollout-table.mjs`. The temptation is to subtract what is already
coloured and list only the rest, but then the table stops being a map of the product - and a map is
exactly what the node column makes it. Nothing else in this repository writes «screen -> node» down.

| Флоу | Вузол IA | Екран | Файл | Стан | Сторінок | У кольорі | Лишилось | MVP | Сірий оригінал |
|---|---|---|---|---|---:|---:|---:|---|---|
| f1 | 0.0 | Головна | `index.html` | вже в кольорі | 4 | 4 | 0 | MVP | є |
| f1 | 2.1 | Категорія (лістинг) | `listing.html` | вже в кольорі | 7 | 7 | 0 | MVP | є |
| f1 | 2.2 | Ціль-колекція | `goal.html` | вже в кольорі | 4 | 4 | 0 | MVP | є |
| f1 | 4.x | Квіз (підбір за ціллю) | `quiz.html` | вже в кольорі | 1 | 1 | 0 | ПОТІМ | є |
| f1 | 3.0 | Картка товару | `product.html` | вже в кольорі | 6 | 6 | 0 | MVP | є |
| f1 | 6.0 | Кошик | `cart.html` | вже в кольорі | 3 | 3 | 0 | MVP | є |
| f1 | 6.1 | Оформлення | `checkout.html` | вже в кольорі | 5 | 5 | 0 | MVP | є |
| f1 | 1.x | Авторизація | `auth.html` | вже в кольорі | 5 | 5 | 0 | MVP | є |
| f1 | 6.2 | Замовлення оформлено | `order-placed.html` | вже в кольорі | 2 | 2 | 0 | MVP | є |
| f1 | 7.0 | Кабінет покупця | `account.html` | вже в кольорі | 4 | 4 | 0 | MVP | є |
| f2 | 5.0 | Для тренерів (лендинг) | `coach-landing.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f2 | 5.1 | Стати тренером | `coach-verify.html` | вже в кольорі | 5 | 5 | 0 | MVP | є |
| f2 | 5.2 | Кабінет тренера | `coach-home.html` | вже в кольорі | 5 | 5 | 0 | MVP | є |
| f2 | 5.2a | Тариф (керування) | `coach-tariff.html` | вже в кольорі | 3 | 3 | 0 | MVP | є |
| f2 | 5.3 | Клієнти | `coach-clients.html` | вже в кольорі | 5 | 5 | 0 | MVP | є |
| f2 | 5.3a | Новий клієнт | `coach-client-new.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f2 | 5.4 | Профіль клієнта | `coach-client.html` | вже в кольорі | 4 | 4 | 0 | MVP | є |
| f2 | 5.4a | Редагування клієнта | `coach-client-edit.html` | вже в кольорі | 2 | 2 | 0 | MVP | є |
| f2 | 5.5 | Мультиклієнтська сесія | `coach-session.html` | вже в кольорі | 8 | 8 | 0 | MVP | є |
| f2 | 5.6 | Замовлення тренера | `coach-orders.html` | вже в кольорі | 4 | 4 | 0 | MVP | є |
| f2 | 5.8 | Обране тренера | `coach-wishlist.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f2 | 5.7 | Деталі замовлення | `coach-order.html` | вже в кольорі | 3 | 3 | 0 | MVP | є |
| f2 | 6.0 | Кошик (за клієнтами) | `cart-coach.html` | вже в кольорі | 2 | 2 | 0 | MVP | є |
| f3 | 2.0 | Каталог-хаб | `catalog-page.html` | вже в кольорі | 3 | 3 | 0 | MVP | є |
| f3 | 0.0 | Рейка категорій з головної (flyout-оверлей) | `home-catalog.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f3 | 2.4 | Бренди (індекс) | `brands.html` | вже в кольорі | 4 | 4 | 0 | MVP | є |
| f3 | 2.5 | Пошук | `search.html` | вже в кольорі | 4 | 4 | 0 | MVP | є |
| f4 | 8.7 | Бонусна програма | `content-loyalty.html` | вже в кольорі | 2 | 2 | 0 | MVP | є |
| f4 | 8.9 | FAQ | `content-faq.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f4 | 8.0 | Блог | `content-blog.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f4 | 8.1 | Стаття | `content-article.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f4 | 8.10 | Акції | `content-promo.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f4 | 8.11 | Відгуки про магазин | `content-reviews.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f4 | 8.2 | Про нас | `content-about.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f4 | 8.3 | Контакти | `content-contacts.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f4 | 8.4 | Доставка й оплата | `content-delivery.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f4 | 8.5 | Повернення | `content-returns.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f4 | 8.6 | Правова інформація | `content-legal.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f4 | 8.8 | Гарантія та сертифікати | `content-guarantee.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f4 | 8.12 | Розсилка (підтвердження) | `content-newsletter.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f5 | 0.1 | Мега-меню «Каталог» (оверлей) | `megamenu.html` | вже в кольорі | 4 | 4 | 0 | MVP | є |
| f5 | S | Сторінку не знайдено (404) | `404.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f5 | S | Помилка сервера (500) | `500.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f5 | S | Технічні роботи (503) | `maintenance.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f5 | S | Глобальні компоненти (cookie · тости) | `system.html` | вже в кольорі | 1 | 1 | 0 | MVP | є |
| f6 | 7.2 | Замовлення | `account-orders.html` | вже в кольорі | 2 | 2 | 0 | MVP | є |
| f6 | 7.4 | Знижки та бонуси | `account-loyalty.html` | вже в кольорі | 3 | 3 | 0 | MVP | є |
| f6 | 7.5 | Адреси | `account-addresses.html` | вже в кольорі | 8 | 8 | 0 | MVP | є |
| f6 | 7.1 | Профіль | `account-profile.html` | вже в кольорі | 6 | 6 | 0 | MVP | є |
| f6 | 7.6 | Обране | `account-wishlist.html` | вже в кольорі | 3 | 3 | 0 | MVP | є |

**Сторінок у реєстрі: 141** · уже в кольорі: **141** · розкочується тут: **0** · з них у MVP-обсязі (K): **0** · без сірого оригіналу: **0**

**Вузли без сірого оригіналу (1), у розкотку не входять:** 0.2 Футер -> `ia/footer.html`

**The one node with no grey original is `0.2 Футер`, and it is not a page.** The footer is a render
function inside `wireframes/_nav.js` and it stands on every screen; there is nothing to roll out and
nothing to design. No second branch is needed here, and none is taken: a node with no wireframe
would mean unfreezing `wireframes/`, which is a decision outside this stage.

**K = 49 of 50.** The only ПОТІМ screen in the whole remainder is the quiz (4.x), which locked
decision 2 puts after launch. The owner's call at step 1: the MVP volume goes first in five batches
and the quiz is a sixth round on its own word.

**12.11: THE SIXTH ROUND RAN, SO K = 50 OF 50.** The owner gave the separate word after the stage
had closed at 140 of 141. The screen exists, the registry row is written, `OUT_OF_SCOPE` in
`tools/coverage.mjs` is now an EMPTY declared list, and the coverage map is green on 141 of 141 for
the first time. What the round cost is in section E: one component, one badge form, two ladder
joins and four instrument repairs - which is the same proportion the whole stage found.

---

## B. The batches, cut by flow

Not alphabetically and not into equal piles. Screens of one flow share patterns, states and
canonical data; split across batches they drift in details nobody sees one at a time.

| # | Batch | Screens / pages | Main pattern | What it is for |
|---|---|---:|---|---|
| 1 | States on painted bases | 5 / 15 | account shell + modal | **the contract gate** |
| 2 | Catalog and search (f3) | 4 / 12 | the listing template + toolbar | the shared template under four scopes |
| 3 | The info template (f4a) | 6 / 6 | `info-page` | six subjects, one body |
| 4 | The rest of content (f4b) | 7 / 8 | card feed + accordion | seven one-offs |
| 5 | System and global (f5) | 4 / 8 | overlay + minimal page | the pages with no header |
| 6 | Quiz (12.11) | 1 / 1 | stepped dialog | a separate round, on the owner's word · **done** |

**Batch 1 is deliberately made of screens whose BASE is already coloured** - addresses x6, profile
x4, order-placed x2, new client, edit client x2. No new component is expected in it, so anything
that fails there is the contract failing, not the system. That is what the pack wants of a first
batch: a defect of appearance costs one screen, a defect of the contract costs twenty.

Batch composition, file by file:

- **1** `account-addresses-{add,viddilennia,postomat,courier,edit,delete}` · `account-profile-{phone,email,lang,delete}` · `order-placed` + `-account-end` · `coach-client-new` · `coach-client-edit` + `-confirm`
- **2** `catalog-page` + `-loading` + `-error` · `home-catalog` · `brands` + `-empty` + `-loading` + `-error` · `search` + `-suggest` + `-empty` + `-loading`
- **3** `content-{about,contacts,delivery,returns,legal,guarantee}`
- **4** `content-loyalty` + `-buyer` · `content-{faq,blog,article,promo,reviews,newsletter}`
- **5** `megamenu` + `-protein` + `-health` + `-vitamins` · `404` · `500` · `maintenance` · `system`
- **6** `quiz`

---

## C. Canonical data, named ONCE for the whole stage

Derived, not invented. Sources: the constants in `wireframes/_nav.js`, `wireframes/docs/
conventions.md`, and the grey screens themselves. **Agents read this list and nothing else** - two
sources of canonical data without a rule of precedence produce exactly the drift the list exists to
prevent.

| What | Value | Source |
|---|---|---|
| Cart badge | **3** | `WF_CART_COUNT`, `wireframes/_nav.js` |
| Favourites badge | **6** | `WF_FAV_COUNT`, and it is the 6 cards on `account-wishlist` |
| Phone for every OTP screen | **+380 67 123 45 67** (see the two forms below) | `WF_AUTH_PHONE` |
| Buyer | **Вікторія Коваль**, 🥈 Срібний рівень, **-5%** | `wfHeader('buyer')`, 18 grey screens |
| Buyer bonus balance | **124 ₴** on the account, **240 ₴** in the header, **18 ₴ згорять 20.09.2026** | `account.html`, `account-loyalty.html` |
| Coach | **Олена Кравець**, chip **PRO** | `wfHeader('coach')` |
| Coach tier figures | **~99 ₴/міс**, **до 3 клієнтів** on Free - every one of them carries `[?]` | `CLAUDE.md`, locked decision 3 |
| City | **Одеса** (the saved one), 8 popular + 24 in the А-Я list | `WF_CITIES_POP`, `WF_CITIES_ALL` |
| Taxonomy | **12 categories**, **6 goals** | `WF_CAT_MENU`, `WF_GOAL_MENU` |
| Brands | **24 distinct**, 29 cards on `brands.html` (five stand twice, in «популярні» and in А-Я) | `ia/docs/pages/category-matrix.md` |
| The four canonical products | Gold Standard 100% Whey 2270 г **1 520 ₴ струк -15% -> 1 290 ₴** · Iso Whey Zero 908 г · Creatine Monohydrate 500 г · Hyper Mass 4000 г | `wireframes/404.html`, `index.html`, `listing.html` |
| Order | **№1024** | `order-placed.html` |
| Quiz set | four products, **4 009 ₴** | `quiz.html` |
| Promo deadlines | до 20 липня · до 31 липня · до 15 серпня | `content-promo.html` |
| Delivery, and it is THREE tariffs | відділення Нової Пошти **від 50 ₴** · кур'єр до дверей **від 70 ₴** · самовивіз **безкоштовно**. The saved address is «Нова Пошта, відділення № 12», Одеса | `design/checkout.html`, measured |
| Phone, and it has TWO forms | masked **`+380 ** *** 45 67`** wherever it is DISPLAYED (48 places), full `+380 67 123 45 67` only where it is being ENTERED or confirmed (7) | `WF_AUTH_PHONE` + the corpus |

> **THIS TABLE'S FIRST EDITION WAS ITSELF THE DRIFT IT EXISTS TO PREVENT**, and batch 1
> caught it. It carried «Gold Standard 1 480 ₴» - 1 480 is `Casein Pro 1816 г`, and Gold Standard is
> 1 520 struck to 1 290 on 73 files against 20. It carried one delivery figure where the product has
> three tariffs. It carried one phone form where the product has two, and the masked one is used
> seven times more often. Every one of the three was written by reading a screen instead of asking
> the corpus, which is exactly the mistake the section forbids to fifty agents. Corrected by
> measurement; the wrong values stay written here so the correction cannot quietly disappear.

**Every figure that needs real data keeps `[?]`, and it wears `.qmark`.** That is not a style
decision: `CLAUDE.md` says an invented number poisons every stage below it, and the mark is how the
screen says so out loud. Eight of them were inline styles until step 2 of this stage.

---

## D. КОНТРАКТ СУБАГЕНТА

> Цей розділ передається дослівно. Батько підставляє в нього п'ять значень перед КОЖНИМ запуском:
> імена екранів і станів, ВУЗОЛ IA на кожен екран (колонка з розділу A), канонічні дані (розділ C),
> шлях на конкретний екран-приклад і мову продукту. Нічого з цього агент не вгадує.

### Що ти робиш

Ти збираєш кольорову копію готового сірого екрана. Ти нічого не проєктуєш і нічого не малюєш:
структура і склад блоків уже вирішені на етапі 04, текст - на етапі 05, вигляд - на етапах 06-11.
Твоя робота - вдягнути готове в готове.

### Що читаєш обов'язково

- `wireframes/<свій екран>.html` - структура, склад блоків, стани. **read-only, жодного символу**
- `wireframes/_nav.js` - шапка, футер, рейка фільтрів і шит НЕ лежать у html екрана: їх малюють
  рендер-функції звідси. Без цього файлу сірий екран неповний
- `wireframes/docs/conventions.md` - правила сірого шару: що є станом, що глобалом
- `voice/docs/microcopy.md` - **власник інтерфейсних рядків**: кнопки, підписи полів, тексти станів
- `ia/docs/pages/<вузол>.md` - SEO-копія. Вузол тобі названо, шукати за здогадом не треба
- `design/kit/docs/responsive.md` - рядок аудиту СВОГО екрана: «однаково / ширше / нова поведінка»
- `design/kit/docs/motion.md`, розділ **J** - зріз «екран -> моменти». Якщо твого екрана там немає,
  виведи моменти з компонентів і патернів, що на ньому стоять, за колонкою «Рух» в `inventory.md`.
  **Жодного нового моменту не вигадуй**
- `design/kit/docs/architecture.md`, розділ «Правила вживання»
- `design/kit/<компонент>.html` тих компонентів, що стоять на твоєму екрані - блоки «Коли вживати»
  і «Обмеження». Саме вони не дають узяти не той компонент
- `design/system/CLAUDE.md` - дві заборони, дослівно
- екран-приклад, який тобі названо - повний зразок збірки

### Каркас файлу

**Екранів-довідок може бути ДВА, і батько мусить назвати обидва.** Один - для шапки файлу і
розмітки панелі; його називає підстановка 4. Другий - для ТІЛА, і потрібен він лише тоді, коли тіло
сірого оригіналу вже зібране в кольорі на іншому екрані. Додано на 12.9 за знахідкою агента: йому
назвали `design/index.html`, чия герой-зона істотно повніша за сіре тіло мега-меню, а справжня
довідка - `design/home-catalog.html`, чиє тіло збігається з сірим один-в-один. Агент знайшов її
пошуком; наступний зібрав би тіло наново і розійшовся б із двійником у дрібницях, яких поодинці не
видно. **Правило: якщо тіло сірого вже існує в кольорі - довідка це ВОНО, а не index родини.**

Шапку сторінки копіюєш з екрана-приклада **дослівно**, разом з іменами глобалів і шляхами:

```
<!doctype html> · <html lang="uk"> · <meta charset>
<meta name="viewport" content="width=device-width, initial-scale=1">   ОБОВ'ЯЗКОВО
<meta name="robots" content="noindex">        усі екрани design/ - це стенд
<title>...(wireframe X.Y)</title>             форма з екрана-приклада
три <link> на шрифти · <link rel="stylesheet" href="system/index.css"> · <link href="_stand.css">
```

**`<meta name="description">` тут НЕМАЄ, і це рішення, а не пропуск.** Пак етапу називає в каркасі
«`title` і `description` з вузла IA», і на кроці 7 Codex поставив питання прямо: 0 зі 140 кольорових
екранів несуть його, 0 зі 141 сірого теж. Причина в тому, ЧИЙ це рядок. Кожна сторінка `design/`
несе `noindex` - це стенд, а не магазин, - тож description тут не має жодної SEO-функції й був би
просто носієм чужого рядка. А власник у цього рядка вже є: SEO-копія належить вузлу IA
(`ia/docs/pages/<вузол>.md`), і правило проєкту каже, що **жодного продуктового рядка не існує у двох
редакціях**. Копія в html була б другою редакцією без механізму синхронізації.

Але половина цього рішення - справжня діра, і вона названа числом у розділі F: **description існує
лише в 6 із 18 файлів `ia/docs/pages/` і лише на 4 з 22 сторінок `ia/*.html`**. Тобто в дванадцяти
вузлів рядка немає НІДЕ. Це борг етапу 03, який розкотка не має права закрити вигадуванням, і він
іде в хендофф разом із восьма вузлами без блоку A-E.

Тіло:

```
<div class="wf-bar" id="wf-bar"></div>
<div class="wf-canvas">
  <header id="wf-header"></header>
  <main class="wf-page"> ... тут твій екран ... </main>
  <footer id="wf-footer"></footer>
</div>
<плейсхолдери оверлеїв - ТІЛЬКИ ті, які твій сірий оригінал справді має>
```

**ПЛЕЙСХОЛДЕРИ НЕ УНІВЕРСАЛЬНІ, І ПЕРША РЕДАКЦІЯ ЦЬОГО РЯДКА БУЛА ЛІСТИНГОВОЮ.** Вона писала
`<div id="wf-sheet"></div>` як частину каркаса. `wf-sheet` це мобільний шит ФІЛЬТРІВ; він стоїть на
21 з 99 кольорових екранів, і в жодного екрана кабінету його немає. Екрани кабінету закінчуються
`<div id="wf-addr"></div>` + `<div id="wf-toast"></div>`, екрани тренера - `<div id="wf-client-edit"></div>`
+ `<div id="wf-toast"></div>`. **Бери рівно ті плейсхолдери, які має твій сірий оригінал** - агент,
що виконав перший каркас буквально, написав би порожній контейнер, якого ніщо не заповнює, і
пропустив два, які працюють.

**І `.wf-canvas` теж не універсальний: 88 з 99 екранів його носять, 11 - ні** (родини чекауту й
авторизації, за правилом U2: оболонка не з'являється у флоу чекауту). Тому екран-приклад мусить
бути СВОЄЇ родини; батько, який дав чекаут як приклад екранові з повною оболонкою, дав два різні
тіла в одній інструкції.

Хвіст - скрипти і рядок ініціалізації з екрана-приклада, з іменем СВОГО базового файлу в `wfBar()`.

**Оболонку ти не пишеш.** Шапка, футер, рейка і шит - порожні плейсхолдери, які заповнює
`wireframes/_nav.js` у рантаймі. Іконки теж - але **лише в ОБОЛОНЦІ**, і перша редакція цього рядка
казала інакше. Вона казала «`uivChrome()` міняє кожну емодзі на іконку набору», і вісімнадцять
агентів прочитали це як правду про весь екран. **Це неправда про `<main>`:** `uivIcons()` викликається
на шести id хрому, на драверах, на оверлеях і на рейці головної - і на `.wf-page` не викликається
ніколи. Зміряно на кроці 7: емодзі в тілі сторінки лишається шрифтовою емодзі. Тому inline `<svg>` у
файлі екрана все одно не буває взагалі - але не тому, що пас його з'їсть, а тому, що екран не малює
власних іконок у цьому продукті.

**Панель стенда ти теж не пишеш.** Її ставить `design/_nav.js` через `uivBar()`.

### Заборонено у файлі екрана - дев'ять знаків, нульова толерантність

`@media` · `transition` · `animation` · `@keyframes` · тег `<style>` · атрибут `style` · будь-який
hex · будь-який `px` · назва шрифту.

Виняток рівно ОДИН і він оголошений: `style="width:NN%"` на смузі рейтингу або лояльності. Відсоток
це ЗНАЧЕННЯ - у статичного прототипу немає сервера, щоб його порахувати.

Перевіряєш себе сам: `node tools/screen-css.mjs <свій екран>`. Має бути «чисто».

### Що робиш при браку

Компонента, варіанта, стану, токена або рядка тексту немає - **зупиняєшся** і здаєш замовлення
рядком: «чого бракує -> на якому екрані -> у якій зоні -> що каже сірий оригінал». Не малюєш, не
підбираєш схоже, не лишаєш порожнє місце. **І не лишаєш напівзібраного файлу в `design/`:** чернетку
видаляєш. Напівзібраний екран потрапляє в реєстр і в карту покриття і виглядає готовим.

Заводить компонент батько, централізовано, і аж тоді екран збирає НОВИЙ агент за тим самим
контрактом плюс рядком «компонент тепер у системі».

### Ще п'ять правил, які інакше доведеться вгадувати

1. **Патерн ПІДКЛЮЧАЄТЬСЯ, а не збирається.** Композиція з `patterns/` уже несе адаптив і рух
   усередині. Два контроли поруч - це `class="actions"`, а не власний flex.
2. **Структура з сірого екрана, текст із файлу.** Розбіжність між ними - зупинка і питання до
   батька, а не тихий вибір однієї з двох редакцій.
2a. **А якщо сірий СТАН розійшовся зі своєю сірою БАЗОЮ - виграє база, і ти доповідаєш дельту.**
   Це не гіпотеза: у партії 1 шість станів `account-addresses` несуть тіло, старіше за власну
   базу - дві картки адрес замість трьох, `<a href="#">` замість справжніх `onclick`, і немає
   рядка-підказки про місто. `wireframes/` заморожений з етапу 05, тож полагодити це вгору по
   ланцюгу не можна; лагодиться в кольоровій копії, а розбіжність називається вголос. Правило
   те саме, що система вже двічі застосувала до себе на кроці 2: **сторінка стану погоджується
   зі своєю базою, а не навпаки.**
3. **Усі внутрішні `href` ведуть на `design/`-версії.** На `wireframes/` не веде жоден лінк у тілі
   екрана: сірий оригінал доступний з панелі, і це робить `_nav.js`.
4. **Ім'я файлу стану - той самий суфікс, що в сірого оригіналу**, один-в-один.
5. **SEO-копію з вузла IA береш дослівно.** Трапився в ній em dash - це дефект етапу 03b: ставиш як
   є і здаєш рядком у списку питань.

### Чого ти не робиш

Приймання. Браузер, заміряні 360, обидві теми і `/impeccable critique` - це робота батька.

### Що здаєш

Список зроблених файлів · перекличку своїх екранів і станів числом · список замовлень на систему ·
**список питань, які довелось поставити** · рядки тексту, яких не знайшов у `microcopy.md`.

Останні два найцінніші, і саме їх найлегше не зібрати: агент, який мовчки здогадався, виглядає
ефективнішим за того, що спитав, і коштує дорожче.

---

## E. The journal of additions

Every row carries the column that matters more than the component: **why the stage-07 inventory did
not see it.** The system was built against an inventory of the WHOLE product, so an addition here is
a signal about that inventory.

| Step | What | Level | Why the inventory of stage 07 did not see it |
|---|---|---|---|
| 12.11 | `quiz.css` - the stepped dialog of node 4.x | 3 | **`wireframes/_wf.css` has zero rules for `q-*`.** The whole dialog lives in that one screen's own `<style>` block - 80 classes, of which the shared grey sheet declares 21 - and an inventory derived from the shared sheet cannot meet a screen that styles itself. It was also the one ПОТІМ screen, so no agent of the five batches ever ordered it. |
| 12.11 | `.qsc` in `product-card.css` - the third rung, the compact set card | 2 | Same reason, one layer down: the rung is drawn inside the quiz's private block. Stage 04 wrote the decision in `screens.md` in one line - «важкі PLP-картки -> `.qsc`» - and a stylesheet-derived inventory reads stylesheets, not screen notes. |
| 12.11 | `.tag.tag-base` in `badge.css` - the third badge form | 1 | The badge census was read out of `.pcard .ph .tag` across 51 coloured screens. «Основа» stands on `.qsc`, which was outside that selector AND outside `uivChrome()`'s text-to-form pass, so a bare `class="tag"` there matched no rule at all. The word has been in the product since stage 04 and in no inventory. |
| 12.11 | `.cnt-row .cap, .q-eyebrow` moved into `section-head.css` - the brow's bold rung | 2 | Not an inventory miss but a DUPLICATE, and the gate caught it the hour the fourth edition landed: the same six declarations were written in `section-head.css` (7.50 folded two of them), `contacts-block.css` (batch 5) and `quiz.css` (batch 6). `dupe.mjs` failed the run at six declarations. Two weights, one edition, in the file that owns brows. |
| 12.11 | `.q-opt` and `.q-pill` joined `radio.css`; `.q-opt .cb` joined `checkbox.css` | 1 | Nothing was added - 25 of the 59 names the grey screen carries were READ off the ladder instead of drawn a second time. `radio.css` wrote the instruction for its own growth at 7.96 («one name added to a selector list, never a rename»); this is the fourth and fifth time it collected. |
| 12.2 | `.qmark` in `base.css` - the mark for a number nobody has yet | utility | It was never a rule. Eight `[?]` marks were written as `style="color:var(--text-muted)"` on a bare span, on four coloured screens. An inline attribute is in no stylesheet, and `inventory.md` v2 is derived from stylesheets. |
| 12.2 | `info-page.css` - the body of a service page | 3 | **`wireframes/_wf.css` has zero rules for `info-*`.** The grey layer draws those six pages with bare structure and no styling at all, so a list built by mapping every RULE onto a component had nothing to map. A class with no rule is invisible to a stylesheet-derived inventory by construction. |
| 12.2 | `.skline--h1 --price --fig --variant --cta --trust --kicker --sep` in `skeleton.css` | 1 | Sixteen inline geometry attributes on three loading screens. `skeleton.css` states in its own comment that «an inline style beats any rule written here» - and could not see the ones that were beating it. |
| 12.2 | `.acard--coach`, `.cstat--free`, `.cstat--up`, `.pf-val--label`, `.pf-val--empty`, `.co-city .note` | 2-3 | Variants of components that already existed, written on the screen instead of in the file. Every one is a STATE of its component - the Free tier, the empty e-mail, the city not yet chosen - and a state written on a screen is a state the stand page cannot show. |
| 12.3 | `order-placed.css` - the body of node 6.2 | 3 | **`architecture.md` A19 named `op-*` and parked it**: «that screen's work, and stages 09 to 12 will do it without touching the system». A screen may not carry styles of its own. Both sentences are true only if 6.2 assembles from components that exist, and the result plate never did. The inventory saw the classes; what it did not see is that A19's disposal of them was unbuildable. |
| 12.3 | `.actions--stack` in `patterns/action-row.css` | pattern | Not missed at all - **the pattern file had already named `.op-steps`** in its list of 53 container names, in the group «TEN carry no rule at all... they are stage 12's, which rebuilds those screens in colour anyway». This is the first of the ten to arrive. |
| 12.3 | `uivInert()` in `design/_nav.js` | colour layer | Nothing was asking. The dialogs are drawn at runtime by the frozen grey layer, so no source walk meets them, and `tab-walk.mjs` - the one instrument that presses a key - asks whether focus lands on something INVISIBLE. Everything here is visible. 26 screens of 26. |

| 12.4 | `nav-tile.css` - the tile that opens a scope of the catalogue | 2 | **The same reason as `info-page.css`, on two screens at once**: `wireframes/_wf.css` has no rule for `chub-*` or for `b*`. Both screens carry their whole tile layout in their own `<style>` block, which is legal in the grey layer and invisible to a stylesheet-derived inventory. What makes this row worth more than the component: **two agents who did not know of each other ordered it in different words** - «brand card» and «category tile» - and the two grey blocks declare the same shell byte for byte. Two files here would have been the drift central ordering exists to prevent, and nothing would have caught it. |
| 12.4 | `search-overlay.css` - the suggestions panel | 3 | Same construction (no `ov-*` rule in the grey sheet), plus a second half: `backlog.md` had been parking `ov-row`, `ov-cb`, `ov-prod`, `ov-chip` and `ov-all` since stage 08 as «tirage, not gaps... they close when their screens are coloured». The inventory did not miss them; it deferred them, and this is the screen. |
| 12.4 | `mark` in `base.css` | utility | **No rule anywhere** - not in `design/system/`, not in `_stand.css`, not in the grey `wireframes/_wf.css`. The tag stands on 2 grey files and 0 coloured ones, so a stylesheet-derived inventory had nothing to derive. Left alone, the coloured search would have highlighted with the browser default yellow - the only yellow in a product that has none. |
| 12.4 | `.chips` (a public row name), `.chip--letter`, `.chip.off`, `.chip--fill` in `chip.css` | 1 | The file had THREE private names for a row of chips (`.dr-chips`, `.cegoals`, `.flinks`), each owned by one place, and a fourth private name would have been the same line written a fourth time. And `.chip.off` is a case the file had already written down: «THERE IS NO DISABLED CHIP IN THE PRODUCT... When the case appears, `.vopt.off` is still the shape to copy.» Fourteen of twenty-six letters on `brands` have no brand. The inventory cannot see a case that has not happened yet - which is why the file wrote the answer instead. |
| 12.4 | `.toolbar--all` in `toolbar.css` | 2 | The file holds a PAIR split at 860 and rule U6 says «one toolbar per screen». `brands` has a third case neither half serves: the same row at 360 and at 1280, no media query at all. Invisible to any audit, because both halves are legal css and the screen looks intentional at whatever width you open it. |
| 12.4 | `.sech--rule` in `section-head.css` | 2 | A rung BELOW the section head, thirteen times on one screen. Nothing in the inventory describes depth; it describes components. |
| 12.4 | `.gtile--row` in `goal-tile.css` | 2 | Ordered twice in one round, for two screens, and the hint line is why it is a variant rather than a re-use: dropping it would have been a loss of text dressed as a re-use. |
| 12.4 | `.behind` in `overlay.css` | 3 | The THIRD instance of «the page under an overlay», and the first that is a treatment rather than a body. `.cart-behind` and `.ce-behind` describe the CONTENT standing behind; this one describes what is done to it, whatever it is. Section F had carried the pair as an open question since batch 1; the third case is what settled it. |
| 12.4 | `.field-grp > .lead` in `field.css` | 1 | The file names the shape in its own prose («the lens and the button around a search») and has no rule for the mark that LEADS it. Four hand-written editions of that shell already exist in the product and `coach-clients.css` lists them as «Крок 6». The inventory counted the four; it had no way to say that the fifth should not be written. |
| 12.4 | `.sklogo`, `.skgrid + .skgrid`, `.sech + .skgrid` in `skeleton.css` | 1 | `.skimg` is `aspect-ratio: 1` because every photograph in this product is square; a brand's logo box is wide and low. And the gap between two skeleton grids was two inline `margin-top` attributes - the same shape 12.2 closed for `.acc-cardgrid + .skgrid`. |
| 12.4 | `.brandbox--card` in `brand-logo.css` | 1 | A size, and size is anatomy: written in `nav-tile.css` it would have been one file reaching into another's. |

| 12.8 | `article.css` - the body of node 8.1 | 3 | **`wireframes/_wf.css` has no rule for `art-*`.** Same construction as `info-page.css` and `nav-tile.css`, and by the fourth file of this batch it stops being an excuse and becomes the finding: **every screen of the f4 group styles itself in its own `<style>` block**, so an inventory derived from the shared stylesheet was blind to the whole group at once - seven screens, not one component. |
| 12.8 | `faq-page.css` - the shop FAQ, node 8.9 | 3 | Same blindness, plus a second half worth the row: the system HAD a disclosure (`.trustsec`) and the inventory records it as one component on one screen. What no inventory can record is that a disclosure which stands OPEN and one which stands CLOSED are two jobs - principle 1 requires the trust block to be open, and an FAQ that opened by default would stop being a scannable list. |
| 12.8 | `promo-card.css` - the promotion card, node 8.10 | 2 | Same blindness for `pcard-promo`. And the other side of the same coin: `product-card.css` listed `.hpromo`, `.blogcard` and `.certthumb` among the things it is NOT back at stage 08, so the system already knew media cards come in several kinds. What the inventory did not say is that one of those kinds was missing from it entirely. |
| 12.8 | `newsletter.css` - node 8.12 | 3 | Same blindness for `nl-*`. The row is worth keeping for what it refuses: `order-placed.css` draws the identical shape, and its plate is in the SUCCESS family because money changed hands. Borrowing it would have told the visitor a purchase completed. **Same shape, different claim, and the claim lives in the roles** - which is a thing a shape-based inventory cannot record at all. |
| 12.8 | the listing form in `blog-card.css` | 2 | Not a miss: the file drew the three-card teaser of the home page and node 8.0 is the same card on the page that exists FOR it. Two sizes of one idea. What the inventory could not see is the name collision underneath - the grey layer calls BOTH this card and a brand card `.bcard`, which is why the listing form keeps this file's own `b*` family and the collision dies with the grey layer. |
| 12.8 | the node 8.7 forms in `loyalty-rung.css` | 2 | **The most useful row of the batch, and it is mostly a row about what was NOT added.** The grey block for 8.7 declares seventeen names; read against the already-coloured node 7.4, all but three exist under other names - the ledger is `table.led`, the mechanism card is `.acard` + `.mech-kicker`, the FAQ is `.qaitem`, the whole `me-*` family is `.lt` + `.lbar` + `.ls` beside `.big` + `.u` + `.warn`. The owner's ruling that the ledger belongs to 7.4 AND 8.7 is what forced the comparison; without it, seventeen classes would have been published as new. |
| 12.8 | `.lintro` NOT added, four times | – | **A declared list that covers nothing fails as loudly as an undeclared case, and so does a component ordered four times over.** Four screens of this batch each declared a page lead under a private name - `faq-lead`, `blog-lead`, `promo-lead`, `rev-lead`. `seo-text.css` describes `.lintro` in its own words as «the lead paragraph directly under the H1 of a listing» and already carries it on eleven pages. One decision, five writings, and only central ordering could see it - the four screens never meet. Node 8.11 needed NO new css at all as a result. |

| 12.9 | `.e404` in `system-page.css` - the error that KEEPS its chrome | 3 | Not a miss, a shape the file had only half of. It drew `.sys-min`, a bare centred column at 78vh with no header and no footer, which is right for 500 and maintenance - the store itself failed, and a nav bar would offer doors that do not open. 404 is the opposite and the grey says so in its own comment: «never a dead end». The store works, one address does not. `.sys-min` cannot be re-used with the chrome switched on: `78vh` plus `justify-content: center` pushes the whole page off the fold. **The inventory records components, not which of two problems the visitor has.** |
| 12.9 | `.sys-code--mark` in `system-page.css` | 3 | It closes an inline style the grey could not avoid: `maintenance.html` writes `style="font-size:44px"` on `.sys-code`, because a wrench at 60 is not a number at 60 - a digit carries its weight in the stroke, a pictograph in its box. 44 is not invented here, it is the TOP of `--fs-display`. An inline attribute is in no stylesheet, so a stylesheet-derived inventory could not see it - the same reason `.qmark` was missing at 12.2. |
| 12.9 | `.chips--center` in `chip.css` | 1 | One declaration, and a MODIFIER rather than a second row. `.chips` has no justification, which is right everywhere it stands today: a filter row, an A-Z strip and a jump bar all begin at the start of their column. Node S puts the same row under a centred error block, where a left-aligned row of recovery links reads as a list that lost its heading. |
| 12.9 | six chip forms finally SHOWN, not added | – | `.chips`, `.chips--sticky`, `.chip--letter`, `.chip--fill` and `.chip.off` were published at 12.4 and their stand page never demonstrated one of them - `idle.mjs` called it «винне демо» on six classes at once. A component whose page cannot show a form has met the five-part rule on paper and failed it in the browser, which is the same gap between the source and the output this stage keeps paying for. |

### Batch 1, the roll call

**15 pages = 15 done + 0 deliberately not.** Five agents, one of which stopped and ordered instead of
drawing; its screens were rebuilt by a sixth after the component was placed.

Components put into the product for the FIRST time by this batch, checked against `inventory.md`:
`client-dialog.css` (13 screens in the inventory, and until now **not one coloured screen had ever
opened it** - `.cedel`, `.dn` and the whole `.cedlg` half had never reached colour at all) ·
`overlay.css`'s open scrim, for the same reason · `order-placed.css` and `.actions--stack`, both on
their first two screens.

Gates at close: `accept` 300/0 at 390 and 300/0 at 360 · `screen-css` nine marks at 0 over 107
screens · `links` 5442 with 0 dead and 0 alive-but-grey · `width-sweep` clean above the floor on all
161 widths · `modal-trap` 0 of 26 · `btn-rank` 0 unranked · `dupe` 0 failing · `css-comments`
balanced · `typo` 0 · `inventory` 86 components with 0 drift · `rollout-table --check` matches.

### The floor before the fan-out, measured

The owner's decision at step 1 was to clean all 91 coloured screens before any subagent copies from
them, rather than only the templates.

| Mark | Before | After |
|---|---:|---:|
| `style=` attribute | 102 on 38 screens | **20**, all of them the declared percentage exception |
| `<style>` tag | 31 (30 real, all comment-only) | **0** |
| `px` literal | 92 | **0** |
| `@media` · `transition` · `animation` · `@keyframes` · hex · font-family | 0 | **0** |

The 30 comment-only blocks were not deleted - each held the record of what left that screen at steps
8.30-8.42, and all 30 are kept verbatim in `consolidation.md`. The instrument is
`tools/screen-css.mjs`, and it is the gate every batch is measured with.

**Two rules were written, measured, and withdrawn by the measurement.** `section[role="alert"] >
.empty` reached three error screens where one had asked, and `.acard .ah .lnk` would have moved five
links on the base screen to match one on its own state page. The check that missed the first was a
regex looking for `<div class="empty"` after the `<section>` tag: two of the three screens have an
html COMMENT between them, and the `>` combinator does not see comments while a text search does.
**The reach of a rule is a question for the DOM.**

---

### Batch 4, the roll call

**8 pages = 8 done + 0 deliberately not.** Three agents, three screens each except the loyalty pair,
and **not one of them stopped to order a component.** That is the first round of this stage where
nobody did, and it is not luck: the parent read the grey blocks against the already-coloured node 7.4
BEFORE the fan-out and handed each agent a reuse map. Seventeen private names on node 8.7 alone
resolved to three real additions.

Components put into the product for the FIRST time by this batch: `article.css`, `faq-page.css`,
`promo-card.css`, `newsletter.css`, the listing form of `blog-card.css`, and the node-8.7 forms of
`loyalty-rung.css`. Component layer 89 -> **93**.

**What the agents measured in the parent's day-old work - seven findings, every one real.**
`.loy-hero` did not centre its own heading (546px of dead space at 1280, because `.lh1` is a flex row
with no justification and the stand demo's heading happened to be long enough to hide it) · the
personal band's action row had zero air above it · «ваш рівень» wrapped inside its chip at 390 and
grew the rung from 70 to 89 · `.art-hero` drew the WORD «фото» at 686x386 on a finished page, alone
among the media frames of the coloured layer · `.lintro` had no air under it on two screens, and
escaped notice on two others only as a SIDE EFFECT of a neighbour's padding · `faq-page.css` said in
prose that its group headings were `section-head`'s while declaring them three lines below · and
`DECLARED_VALUES` in `screen-css.mjs` was 20 against a corpus of 26.

**And one finding about an instrument that no reader of source could have made.** An agent opened its
own finished screen in a browser AFTER `uivFixLinks()` ran and counted **13 links on `content-blog`
and 4 on `content-article` rewritten to `../wireframes/`** - while `links.mjs` printed «0 stale».
The two halves ask different questions: the page decides by MEMBERSHIP of `DESIGN_NAV`, the
instrument decided by EXISTENCE on disk, and between those questions lies the exact state every
screen passes through from the moment it is written until its registry row is added. The instrument
now asks the page's question, out of `DESIGN_NAV` itself rather than re-derived.

---

### Batch 5, the roll call

**8 pages = 8 done + 0 deliberately not.** Three agents in two rounds: one built the four mega-menu
states, one stopped on three of its four screens and ordered instead of drawing, and a third built
those three once the orders were in the system. **The round that stopped is the batch's best
outcome** - the contract doing exactly what batch 1 was designed to prove it does.

Components put into the product for the FIRST time by this batch: `cookie-banner.css` and
`toast.css`. Until `system.html` was coloured, `wfCookie()` was called by exactly ONE file in the
whole tree and it was grey - so `.ck-tog`, whose motion `motion.md` marked «cannot be proved by
pixels... proof at stage 12», is drawn on a product screen for the first time here.

**What batch 5 needed from the system was almost nothing, and the reason is the finding.** Only two
classes in the whole f5 family were unknown, both on `404`. These screens carry no `<style>` block
of their own - they are drawn by the shared `wireframes/_wf.css` - which is precisely why the
stage-07 inventory SAW them and could not see the f4 group at all. **The two batches are the same
experiment run twice with the variable flipped.**

**Three defects the agents measured, and one had been shipping since stage 08.** `.sys-search .go` -
the welded submit - is drawn by the grey sheet and by nothing in colour: the split promised
«selectors are unchanged» and this one did not survive it, so «Знайти» hung in its box with no
ground, no padding and no weight. Repaired by handing the shell to `.field-grp`, which takes the four
hand-written editions `field.css` complains about down to three. `.sys-code--mark` was written by the
PARENT one hour earlier as `--fs-display`, a clamp, so the wrench rendered 30px on a phone against
the grey's 44 while its twin digit sits at 60 on every width. And the quiet line under the actions
had no rule at all: without the grey's inline it is four pixels of air instead of eighteen, so the
inline was a lost rule rather than decoration.

---

## F. Subagent questions

Every agent of the fan-out reads the documentation of stages 08-11 with a clean context and sees it
for the first time. What an agent had to ask, or had to guess at, is a defect of THAT documentation
and a direct input to stage 13. Collected here, never answered-and-forgotten.

**Batch 1: 5 agents, 15 pages, 34 questions.** Sorted by what each one is a defect OF, because that
is what stage 13 needs - not a list of things agents wanted to know, but a list of places the
documentation could not answer.

**Batch 6: 1 agent, 1 page, 7 questions, and the shape of them is the stage's own finding one more
time.** Two were about a badge form that no selector reached; one was about whether a keyboard rule
belongs to the screen or to the rung; one was a false claim in the markup (`aria-modal="true"` with
60 controls behind it); two were documentation gone stale about a screen it names (`motion.md`
section J names `rating.css` on a screen with no rating; `responsive.md` says «THE SAME» about a
screen whose component carries a registered behaviour change at 620); and one was a defect the agent
MEASURED and could not fix - the footer row overflowing the phone by 68px on a step behind a click,
which three width instruments had called clean. All seven were acted on in the same step.

**Batch 2: 4 agents in round one (three of which stopped and ordered rather than drew), 3 in round
two, 13 pages, 27 questions.** The shape of the round is itself the finding: **three of four
agents delivered ZERO files on the first pass** and a full order list instead, which is the contract
working as written. What they measured afterwards is below.

**Batch 4: 3 agents, 8 pages, 23 questions, 0 rounds two.** The classes below are what stage 13
inherits; five of them are the same class a previous batch already opened, and the repeat is the
finding.

**AF, sixth through twelfth node: `ia/docs/pages/` has no SEO A-E block for 8.0, 8.1, 8.7, 8.9, 8.10,
8.11 or 8.12.** `content.md` specifies the thirteen nodes as a template system and defers with «every
indexed page carries the full A-E block (per `seo.md`)»; `seo.md` names Blog once, as a keyword
pattern, and never names the rest. **The frozen grey screen is therefore the de facto source of SEO
copy for the whole 8.x family** - 105 of 107 titles in this product came from there. Nothing was
invented; this is a hole, and after four batches it is the largest single one.

**AH, three instances in one batch, and all three were the PARENT's stand pages.** The showcase and
the product disagreed about the delivery-cost answer (the stand demoed three tariff figures the
product deliberately keeps at `[?]`), about the newsletter's second exit («У кабінет» against
microcopy's «На головну») and about the blog card's foot (an invented reading time against «Читати
->»). A stand page is written the day its component is, and the screen arrives a day later; the
demo is not the corpus. All three repaired the same step they were reported.

**A rule written in a screen's comment is invisible to the next agent AND WRONG.** `content-about.html`
carries the only statement anywhere of the emoji policy for the 8.x family: «uivChrome() does not
enter `<main>`». Two agents found it and followed it; the third measured that `marks.js` walks the
whole document and had already swapped its `★` for the icon set's outline star. So node 8.9 renders
one line icon beside five colour emoji in a single row of six. The rule the code follows is not the
rule the comment states, and no document states either.

**`motion.md` section J is derived from grey class names and is wrong on at least four screens.**
`content-promo` is listed with `product-card.css` (no product card on it) and `banner.css` (which
declares `.hbanners`/`.hpromo` and never a bare `.banner`), and does NOT name `promo-card.css`, the
component that actually moves there; `content-article` lists `hero.css` off `.art-hero` and does not
name `article.css`. The rows were derived before those two files existed, by substring. Independently
confirmed by two agents. The instrument is `tools/screen-moments.mjs`.

**`responsive.md`'s fourteen `content-*` rows carry one identical sentence**, «reads continuous prose
| WIDER · air | container + line measure in ch» - including `content-newsletter`, which does none of
those things, and contradicting `blog-card.css` and `promo-card.css`, which both cite the same file
as saying «WIDER · grid». A row that is identical on fourteen screens is a template default dressed
as a per-screen audit. **This is the `one-line opt-in buys a MECHANISM, not its values` rule in
another material.**

**`microcopy.md` section A is the PRE-VOICE edition in specific cells, and reading it literally would
reinstate the tone principle 4 bans.** Two cells of node 8.7 are the old copy and one of them is
marked `[CHEER]` by the file itself - a candidate FOR rewriting, not a string to install. Two more
cells (nodes 8.11 and 8.12) are stale against the product. The contract says «interface strings from
`microcopy.md` by key»; on these five cells the grey screen is newer than the file that owns text.

**A live dead control on the one page whose whole job is trust.** Node 8.11's «Залишити відгук» has
no behaviour: the IA node says «dialog like 3.1a», and no such dialog exists for 8.11 - `openReview()`
draws the PRODUCT PAGE's modal set, whose content is about a product. The grey button carries no
handler either. Built as a button with no handler, named here rather than invented.

**The system has no unscoped card title.** Every 18px display heading is scoped to its own component
(`.loy .lt`, `.led-head h2`, `.hvert .hvt`, `.trustsec > summary`), and `.sech h2` carries a 32px top
margin that cannot open a 16px-padded card. Node 8.7's mechanism card was resolved by putting `.loy`
on both cards - a scope carried for a single declaration. `architecture.md` does not name a card
title.

**And one number is now a proven contradiction rather than a discrepancy.** `design/account-loyalty.html`
(node 7.4) shows 18 400 ₴ spent with «до Золота ще 6 600 ₴» while its own ladder prints the Золото
threshold at 15 000 ₴ - a buyer 3 400 ₴ PAST the threshold whose card still says Срібло. Node 8.7 says
8 400 ₴, and 8 400 + 6 600 = 15 000 closes. The arithmetic names 7.4 as the file to correct. Owner's
call, and it is the only one this batch could not take.

**Batch 5: 3 agents, 8 pages, 19 questions, and one round that delivered zero files on purpose.**

**A declared list was still only ever asked in ONE direction, and this is the third instrument in
one stage with that shape.** `rollout-table.mjs` checked «a name in `DESIGN_NAV` with no file behind
it» - which cannot happen, because a row is added after the file is built - and never asked the
mirror, which happens every batch. An agent measured 137 html in `design/` against 132 names and
reported its own four screens as the difference. **And `links.mjs` could not have caught it**: it
asks about names a screen's BODY links to, and nothing in the product links to a mega-menu state,
because the only carrier is the stand's own rail. Its green counter was true and useless. **The
completeness of a declared list is a question about the LIST, not about its readers.**

**A COLOURED PAGE THAT IS NOT A SCREEN had no way to say so.** `uivFixLinks()` asks one question -
is this name in `DESIGN_NAV`? - and that registry drives the stand rail, so putting the hub in it
would list `overview` among the product's screens. Left out, the hub is treated as grey: node S's
breadcrumb resolved to `../wireframes/overview.html` on a finished page. The defect had nowhere to
show before, because **until batch 5 no coloured screen linked to the hub at all.** Closed with
`DESIGN_EXTRA`, which `links.mjs` reads rather than copying.

**A verdict that could not say «no», and it cost five repeats of one mistake.** `typo.mjs` printed
«кучерявий апостроф: N у M файлах, усі оголошені» whatever the run had just found - in the same
breath as a per-file line naming an UNdeclared file. Five times in this stage the parent read the
green summary, believed it, and shipped a curly apostrophe that `accept.mjs` then caught in a browser
two steps later. **A run whose last line contradicts its own findings trains the reader to stop
reading the ones above it.**

**The rank of the ONLY action on a screen has no rule.** `btn-rank.mjs` and `clone-to-colour.mjs`
both say the rank is read from the grey and never chosen here, so a bare `btn` becomes
`btn--outline`. But on `maintenance` that is the single action on the page, and principle 2 says «one
clear next step»; the kit's own demo draws it as an accent. Nothing says which wins. The mechanical
rule was taken and the question is the owner's.

**Accessible names have no owner.** «Швидкі посилання» has zero rows in `microcopy.md`; the three
error titles are there but as CARD headings on `system.html`, not as region names. Batch 4 found the
same on three landmark labels of the mega-menu. Two batches, one gap: `microcopy.md` owns interface
strings and an `aria-label` is one, but nothing says so and the rows do not exist. **The same hole
made a ruling leak**: correcting the 500 H1 to «Щось пішло не так» left `aria-label="Помилка
сервера"` on the same element saying something else, and only the agent's report caught it.

**A field is a rung LARGER on the phone than on the desktop and nowhere is that written as intent.**
Measured: the 404 search field is 16px at 360 and 390 and 14px at 1280, because `base.css` raises
every search input against iOS zoom. `.field--s` is declared `--fs-14`. It reads as correct and is
recorded nowhere.

**And node S has no SEO block either** - `ia/docs/pages/system.md` gives HTTP codes, tone and locked
decisions, and no A-E. Eighth node in two batches, and `<title>` for a service page still has no
owner.

### Batch 2, and its own classes

**AA. The agents measured defects in the system work that had just been written for them - four, all real.**
Not documentation questions: findings about css and js delivered the same day, each with numbers.
`.toolbar--all` promised a row it could not draw (`.field-grp` carries `width: 100%`, so it took the
whole line at every width: 96px tall at 620, 860 and 1280 against 44 repaired). `.gtile--row`
inherited a grid it cannot stand in (`1fr` is `minmax(auto, 1fr)` and the hint carries unbreakable
words: six tiles at six widths, spread 8px at 1280; and six columns from 860, which is right for a
centred word and impossible for a row that also carries a mark and a sentence). `.nt-ic` came out as
twelve raw emoji, because `uivIcons()` walks six chrome ids and a tile grid is not one of them. And
the tile itself could not legally hold a link. **The lesson for stage 13 is not the four defects but
that a builder with a browser found what the author with a stylesheet did not.**

**AB. The grey layer's own markup is invalid, and only a parsed DOM says so.**
The grey category tile is `<a class="chub-cat">` with three more `<a>` inside it. The agent dumped
the parsed DOM rather than reading the source: Chrome splits one tile into an anchor, an empty
duplicate anchor and a loose `.nt-sub` OUTSIDE the grid - twelve tiles would render as twenty-four
grid children. Repaired in colour (the tile now has two forms, and only the one whose NAME is the
anchor may hold links), named here, and `wireframes/` untouched.

**AC. A per-screen initialisation line is load-bearing and nothing checks it.**
`cart-coach-empty.html` never called `uivCart()`: five screens carry a cart drawer and four called
the pass, so its empty state kept a raw glyph where `cart-drawer.css` expects the mascot - invisible
in a screenshot, invisible in the source. Repaired by making the three remaining family hooks fire
by PRESENCE, as three others already did. **An agent declined to type such a line into its own file
when it hit the same class again**, which is the right instinct arriving from a clean context.

**AD. A list of options that cannot contain the current one.**
`UIV_SORTS` had no «Релевантні», the default sort of the search named by three sources. The menu
opened with six options and none marked current. It was written from the catalogue toolbar, where
relevance is not offered - the same failure shape as an opener list typed from memory.

**AE. `microcopy.md` was behind its own product in 74 cells**, reported independently by all three
agents. Measured rather than eyeballed: «Хіт» has 0 occurrences in `wireframes/` and 0 in `design/`
against 40 and 28 for «Популярне». **One of them was load-bearing** - `uivHome()` matches the goal
tile's text against `WF_GOAL_MENU` verbatim, so the spelling «Енергія / тонус» would have left three
tiles of six with no icon. Synced; sections E and F of that file deliberately untouched.

**AF. Neither IA node of this batch has an SEO body.** `brands.md` and `catalog-page.md` both give
rules and a pointer («Full A-E per seo.md») where the contract tells the agent to take copy
verbatim. Three agents took the grey and reported it. Nobody owns a stand page's `<title>` either:
measured, 105 of 107 coloured titles are the grey's verbatim.

**AG. Two error editions and no document says which is the rule.** `listing-error` and
`product-error` put a mascot photograph in `.ei`; twenty-five other coloured empty and error states
keep the glyph. `brands-error` carries no `role="alert"` where `listing-error` and `goal-error` do.

**AH. The kit page and the css it documents can disagree the day after.** `goal-tile.html` documents
neither `.gtile--row` nor its parts; `kit/nav-tile.html` shipped the invalid nesting it was meant to
document, and an agent copied it. A stand page is a claim about a file and nothing compares the two.

### A. The instrument the contract points at - 3 agents, independently

The self-check `node tools/screen-css.mjs <свій екран>` could never say «чисто»: the declared
percentage-bar exception is a whole-corpus count and the idle control compared it against the
filtered subject. One agent measured it on four subjects including the already accepted
`coach-clients`. Another proved the counter could go red before trusting its green, and only then
saw that the green was unreachable. **Fixed.** Kept here because three independent finds on one
defect is the shape a fan-out is FOR.

### B. The contract's own text - 5 findings, all repaired

| what | why it was wrong |
|---|---|
| the example screen for 6.2 | `checkout.html` is one of 11 screens in 99 with no `.wf-canvas`; the target had a full shell. Two sentences of the contract then produced two different bodies |
| the body skeleton | it named `#wf-sheet` - the mobile FILTER sheet, on 21 screens of 99 and no account screen. Written by reading `listing.html` |
| where the `uiv*` tail goes | the contract said «grey init line + tail»; in the coloured base the tail is a SEPARATE line after the demo JS. One agent resolved it by finding the precedent (`listing-sheet`) rather than asking |
| the `delete` init line | the parent's brief gave one call; the grey original does two (`openAddrEdit('vidd'); openAddrDelete();`), and with one the confirm sits over the WRONG dialog. Corrected by the agent against three sources |
| `wfAddrDialog()` is not idempotent | it rewrites `#wf-addr`, so placing it after the state call silently closes the dialog. «Copy the example verbatim» and «take the grey init line» point at different lines here |

### C. Nobody owns it - the gaps stage 13 inherits

- **A state page's `<title>`.** Node 7.1 is a declared A-E exception (noindex, no schema), so neither
  `microcopy.md` nor `ia/docs/pages/account.md` holds those four strings. Taken verbatim from grey.
- **`microcopy.md` is BEHIND its own product.** Four rows on node 6.2 (H1, two hero subtitles, the
  name of the bonus section) and one on `coach-clients` (a button the coloured base deleted). The
  file's own header explains it: «TEXT-COLLECTION only - no rewriting». It is an inventory taken
  BEFORE the voice pass, and the grey layer moved on. **The owner of interface strings stands behind
  the product it owns**, in at least five places.
- **`architecture.md` A19 against the ban on screen styles.** A19 parks `op-*` as «that screen's
  work, stages 09-12 will do it without touching the system»; a screen may not carry styles.
  Resolvable only if the screen assembles from components that exist - and the result plate did not.
- **`kit/client-dialog.html` «Обмеження»** says the dialog's action row is «not converted yet»; what
  is unconverted is the CONTAINER, not the buttons. A reader with clean context must open the script.

### D. The screen file cannot say what the screen shows - 3 agents

On 10 of batch 1's 15 pages the SUBJECT of the screen is one token in the init line
(`openAddr('choose')`, `openProfPhone()`, `openClientNew()`); the `<main>` holds the page behind it.
`motion.md` section J admits the same thing about itself, and J under-reports every one of these
screens for the same reason: it is derived from what stands in the html, and the dialog does not
stand there. Three agents had to read `wireframes/_nav.js` to learn what their own screen renders.

### E. Two answers to one problem, and neither is written as the rule

The placeholder behind a modal: `cart.html` lifted `.cart-behind` INTO the system
(`cart-drawer.css`), `coach-client-edit` left `.ce-behind` in the screen's own `<style>` block. Two
screens, two decisions, and no document says which is the rule.

### F. Accessibility, and the corpus was worse than the screen

Reported as «`aria-hidden` covers 9 focusable controls on my two screens». Asked of the whole
corpus: **26 screens open a dialog at load and all 26 left the page behind it in the tab order**.
Repaired with `uivInert()`. Two more remain open and are stage 13's:
- **no accessible `<h1>`** on the two 5.4a screens - the only `h1` is inside the inert backdrop, and
  the dialog's own heading is an `h2`. The dialog markup is in the frozen grey layer.
- the auth and checkout families have no `.wf-canvas`, so the rule does nothing there - correct
  today, because their modal IS the page, and worth re-asking if that ever changes.

### G. Defects in the frozen grey, named out loud and repaired in colour

`openClientDelete()` builds nothing (0 `.ceov`, so the grey confirm screen is blank) · three of six
address state titles lack their `· <state>` suffix · all six carry the SAME head comment saying
«STATE: add» · «Товари (4)» over three lines, against locked decision 10 · the 6.2 phone mask ends
`12 34` where the buyer's number ends `45 67`.

### H. Satisfied in the FILE, violated in the FRAME

Two agents wrote `href="coach-client-new.html"` per rule 3 and watched `uivFixLinks()` rewrite it to
`../wireframes/` at runtime, because the parent had not registered the screen yet. The contract does
not say which of the two is the question. **Registration is part of the gate, not after it** - and
it does not fix links hard-coded as `../`, which is now a permanent pass in `links.mjs`.

### The whole set, deduped into classes - this is what stage 13 actually inherits

Five batches, eighteen agents, 43 pages and **123 questions**. Sorted by batch above, because that is
how they arrived; sorted here by what each one is a defect OF, because that is what a handoff needs.
Nine classes. Every one of them has more than one instance, and the repeat is the finding: a class
that fired once is an accident, a class that fired five times is a shape.

| # | Class | Instances | Where it now stands |
|---|---|---:|---|
| 1 | **A green counter that could not see its own class.** A declared list asked in ONE direction, or a claim about the corpus answered by a subset of it | 11 | `links` (name in registry vs file on disk) · `rollout-table` (both ways, and its own summary line) · `typo` (a verdict that could not say no, and an extension list that never said what it skips) · `dead-sel` (an act can be an attribute) · `screen-css` (a declared count measured on a filtered subject) · `bp` (an `EXCUSED` array naming numbers nobody writes) · `glyphs` (a map the passes did not reach, and its own two exceptions asserted on a filtered subject) · `coverage` (the map itself: 54 of 141, and a map that never mentions a screen cannot look incomplete) · **`theme` (all three `visit()` calls hard-coded 1280, so «0 broken by the theme» meant «0 at 1280» - and it hid a real 2.97:1 in a block that exists only below 859)** · **`paths` (two «declared gone» entries for files this very stage BUILT)** · **`key-alpha` (the transform existed and no check did, so two PNGs shipped with no alpha channel at all)**. **All eleven closed** |
| 2 | **The instrument the contract points at does not ask the contract's question** | 2 | `screen-css.mjs` could never print «чисто» on a filtered subject, found by three agents independently · and its **tenth mark did not exist**: the ban list has said «плюс клас, якого немає в системі» since batch 1, the very next line sends fifty agents to this instrument, and nine of ten marks were implemented. Found at step 7 by Codex reading the contract and the instrument side by side. **Both closed**; the tenth mark found 24 names on 101 places |
| 3 | **A product string with two editions and one owner who is behind it** | 5 | `microcopy.md` behind the product in 74 cells (batch 2), 5 more (batch 4), 4 rows on node 6.2 (batch 1) · **`aria-label` has no owner at all** - two batches, one gap · **`<title>` for a service page has no owner** - node S · **the SEO A-E block is missing for eight nodes**, so the frozen grey is the de facto source of 105 of 107 coloured titles · **and `description` exists in 6 of 18 `ia/docs/pages/*.md` and on 4 of 22 `ia/*.html`**, which means twelve nodes have that string NOWHERE - asked at step 7 by Codex, which measured 0 of 140 coloured heads carrying one and 0 of 141 grey. **Open, and this is the largest single hole in the handoff** |
| 4 | **A per-screen audit derived by substring from grey class names** | 2 | `motion.md` section J wrong on at least four screens, confirmed independently by two agents · `responsive.md`'s fourteen `content-*` rows carrying one identical sentence, contradicted by the two components that cite them. Both are the *«a one-line opt-in buys a MECHANISM, not its values»* rule in another material. **Open** |
| 5 | **A rule that exists only in prose, with no check under it** | 4 | the emoji policy for the whole 8.x family stated in ONE screen's html comment - and stated wrongly · the tenth mark (class 2) · `architecture.md` A19 against the ban on screen styles · **and the emoji map measured exhaustively at step 7**: `glyphs.mjs` over 341 pages finds **20 pictographs on 12 product screens with no row in `UIV_EMOJI`**, 30 occurrences, almost all on the 8.x family. **Twelve of the twenty already have a drawing in `icons.js`** and are pure missing rows - 🕘/⏱ `clock`, 💳 `card`, 💬 `chat`, ↩ `ret`, ✅ `check`, ✉ `mail`, 🚚 `truck`, 📄 `doc`, 🔄 `refresh`, 🔗 `link`, 🔒 `lock`. **Eight need a drawing decision**: 🗓 🛠 🤝 📞 🗺 📱 💵 💰. Not taken here, because a rollout decides nothing - but the open question is no longer «the map under-claims», it is two named lists. **Two closed, A19 and the map open** |
| 6 | **Satisfied in the FILE, violated in the FRAME** | 3 | two agents wrote a correct `href` and watched `uivFixLinks()` rewrite it, because registration comes after the gate · the hub was treated as grey by the same pass, closed with `DESIGN_EXTRA` · and at 12.10 the rail on the **product's home page** drew all three of its own states as grey escapes to files that exist in neither tree, because this copy of the screen lookup dropped `stateFile`. **All three closed.** None of the three is visible in the source, and `links.mjs` cannot see any of them: the rail is injected at runtime |
| 7 | **A class came across from the grey and its rule did not** | 24 names / 101 places | Found by the tenth mark. Twenty-three were inert - the rule had been deleted at stage 08 and the name stayed - and **one was a real regression**: `.cmp .yes` on `coach-landing`, the three Pro cells that answer the comparison, which stopped being bold and stopped arguing. The nineteen were removed by rule, the one got its rule in the system, and the instrument re-asked itself. **Closed** |
| 8 | **Accessibility with no owner in any document** | 4 | 26 screens left the page behind a dialog in the tab order (closed with `uivInert()`) · no accessible `<h1>` on the two 5.4a screens, because the only `h1` is inside the inert backdrop and the dialog markup is frozen · `aria-label` ownership (class 3) · a ruling that leaked, correcting an `h1` and leaving the `aria-label` on the same element saying something else. **One closed, three open** |
| 9 | **A number or a rank that only the owner can rule on** | 5 | node 7.4 shows 18 400 ₴ against its own ladder's 15 000 · the rank of the only action on `maintenance` · three dots for two slides · the 35 one-job-two-emphases labels · `.starrow` worn by zero screens while both review pages type five stars. **All five open, all five named rather than invented** |

**What the shape of the set says.** Sixty-two of the 123 questions are classes 1 and 2 - **defects of the
instruments, not of the screens**. That is the stage's own finding about itself: the fan-out did not
mainly discover that the documentation was thin, it discovered that the checks under the documentation
were asking half of their own question and reporting the half they asked. The other half of the set is
class 3, and it has one shape too: **every string that has no owner ends up owned by the frozen grey
layer**, which is the one layer nobody may edit.
