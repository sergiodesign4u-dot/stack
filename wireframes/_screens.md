# Wireframes — Screen × State matrix (`_screens.md`)

**The work order for the wireframe phase.** Not a wireframe itself — no layout here, only
screen names, the job each closes, its place in the flow, and its real states. Every later
step (etalon, states, roll-out, subagents) builds strictly to this table.

- **Scope of this pass:** the **main flow = the beginner conversion path** (JTBD Job 2
  *goal-to-product, guest checkout* + Job 3 *verify product safety*, which lives on the PDP).
  The coach flow (Job 1), reorder (Job 4) and loyalty (Job 6) are **deferred to Step 8** —
  they reuse the same etalon (listing/PDP) and templates.
- **Sources:** `research/docs/flows.md` (Job 2 + Job 3 — states/dead-ends drawn there
  verbatim), `research/docs/jtbd.md`, `research/docs/sitemap.md` + `ia/docs/sitemap.md`
  (node names/numbers), and each node's `ia/docs/pages/*.md` "States" section (role/domain states).
- **States are more than four** (playbook Principle 2): the **system floor** is
  empty · loading · error · success(=base); the **real set** adds role (guest/buyer/coach)
  and domain (out-of-stock, no-address, payment-declined, code-step…) states. `✓` = real,
  `—` = the scenario doesn't produce it. Base(success) is the populated/default view of a screen.
- **Every screen = mobile (360) + desktop** (playbook Principle 3). Not repeated per row.

---

## Main-flow screens (beginner conversion path)

Core spine: **Головна → Ціль-колекція → Картка товару → Кошик → Оформлення → Замовлення оформлено**,
with **Авторизація** as a dialog on the checkout/confirmation, and **Кабінет покупця** as the
account-end of Job 2.

| # | Screen (node) | Type | Job (jtbd.md) | Flow position (flows.md) | Base | Empty | Loading | Error | Role / domain states (real, extra) |
|---|---------------|------|---------------|--------------------------|:----:|:-----:|:-------:|:-----:|-------------------------------------|
| 1 | **Головна / goal selector** (0.0) | page | Job 2 front door (beginner's "one clear step"); return path for buyer/coach | Job 2 `b1` — entry | ✓ | — | — | — | **guest / buyer / coach** personal strip (state-based block, home.md) |
| 2 | **Ціль-колекція** (2.2) *[listing template, goal scope]* | page | Job 2 discovery: goal → curated safe set | Job 2 `b2` (gcl/qgc) | ✓ | ✓ *no in-stock products → try another goal* | ✓ *loading collection* | ✓ *failed to load → retry* | filter/sort applied; card availability (в наявності/мало/під замовлення/OOS→🔔); OOS product in grid |
| 3 | **Категорія / листинг** (2.1) — **ETALON** *[shared listing template]* | page | Job 3 browse entry; the workhorse PLP | Job 3 `j2` (Catalog and search) | ✓ | ✓ *no results / empty filter combo* | ✓ | ✓ | filter-applied; mobile filter bottom-sheet (transient); OOS cards→🔔; availability-first sort |
| 4 | **Картка товару / PDP** (3.0) | page | **Job 2** add-to-cart **+ Job 3** verify safety (trust block, reviews, certificate) | Job 2 `b3`; Job 3 `j3` | ✓ | — *(page not "empty"; reviews-empty is a sub-state)* | ✓ *loading trust details* (Job 3 `sl`) | ✓ *details failed → retry* (Job 3 `se`) | **out-of-stock → «Повідомити» + back-to-collection**; variant/pill OOS (disabled); **reviews + certificate content** (Job 3 `rev`); reviews-empty; coach CTA «Додати клієнту» (coach role) |
| 5 | **Кошик** (6.0) | dialog (drawer) | convergence; Job 2/3 | Job 2 `b4` | ✓ | ✓ *cart empty → back to discovery* | — *(opens instantly)* | — | **item went OOS in cart** (flag/remove); coach = grouped-by-client (coach role, Step 8) |
| 6 | **Оформлення** (6.1) | page (sectioned) | convergence purchase | Job 2 `b5`; `addr`; `sl`; `ep` | ✓ | — *(empty routes to empty-cart)* | ✓ *processing payment* | ✓ *payment declined → retry / back to cart* | **guest vs logged-in contact** (role); **no saved address** → capture; bonus module (logged-in buyer, 4 sub-states) — n/a for guest; **payment abandoned → back to cart, preserved** |
| 7 | **Авторизація / sign in–register** (1.x) | dialog | account creation; passwordless | Job 2 `b6`/`b6b` (optional register + guest→account offer) | ✓ *(phone step)* | — | ✓ *sending code / signing in* (`slog2`) | ✓ *sign-in failed / code wrong·expired·rate-limit* (`serr2`) | **step states:** phone → code → new-user name; social OAuth (Google/Apple/E-mail); resend cooldown / attempts; success returns to triggering action |
| 8 | **Замовлення оформлено** (6.2) | state (success page) | Job 2 success end + account offer | Job 2 `b7` | ✓ *(this screen **is** the success)* | — | — | — | **guest end** (offer «створити акаунт») vs **account end**; next-steps (відстежити · мої замовлення → repeat) |
| 9 | **Кабінет покупця / account home** (7.0) | page (private) | Job 2 account-end (history + loyalty saved) | Job 2 `b8` (account branch) | ✓ *(dashboard)* | ✓ *just-registered → no orders yet* | ✓ *loading snapshot* | ✓ *failed to load* | buyer-only; **private → noindex** (no SEO); deep-links to orders/loyalty/addresses (Job 4/6 entries) |

---

## Etalon note

- **Quality etalon = the shared listing template**, built first as **Категорія (2.1)** (the most
  general instance). **Ціль-колекція (2.2)** is a *scope variant* of the same template — build 2.1
  fully (all state pages), then 2.2 reuses it with goal H1/scope + its own empty/loading/error.
- The same listing template also serves **Каталог-all (2.0)**, **Бренд (2.4)**, **Пошук (2.5)** and
  the **SEO-city variant (2.1a)** — those are **Step 8 roll-out**, not the first flow.

## Deferred to Step 8 (roll-out) — listed so nothing is forgotten

- **Coach flow (Job 1):** Для тренерів (5.0) · Стати тренером/verify (5.1) · Кабінет тренера (5.2) ·
  Клієнти + профіль клієнта (5.3/5.4) · Мультиклієнтська сесія (5.5) · Кошик coach-grouped (6.0 role).
- **Reorder (Job 4):** Замовлення (7.2) · Деталі замовлення + повтор (7.3).
- **Loyalty (Job 6):** Лояльність і бонуси (7.4).
- **Other listing instances:** Каталог-hub (2.0) · Бренди-index (2.4) · Пошук results+overlay (2.5) · city (2.1a).
- **Content/legal (8.x):** info-page template + loyalty landing (8.7) + FAQ (8.9) + blog + promo + reviews + newsletter.
- **System/global:** 404 · 500 · maintenance · cookie-consent banner · toasts (from `system.md`).
- **Inherited global components** (rendered once, included everywhere): Header/nav (0.1) · Footer (0.2) ·
  Product card · Filter panel · City dialog (0.1a).

---

## Flow 2 — Coach workspace (Main Job 1) · matrix

Built as **Step 8 for the coach flow** (not a new run of the method): the etalon + shared
components + Flow-1 primitives (listing/PDP card, cart drawer, checkout, auth, account shell)
are **reused**. The one genuinely-new screen is **5.5 Мультиклієнтська сесія** — hand-built
first as the coach-flow **reference**, then the rest fan out via subagents cloning it.

- **Scope:** JTBD **Job 1** (Decision 1) — coach builds a multi-client order in one session.
- **Sources:** `ia/docs/pages/coach.md` (cluster spec), `research/docs/flows.md` "Main Job"
  (states/branches drawn verbatim), `ia/docs/sitemap.md` (5.x nodes).
- **SEO/privacy:** landing 5.0 = `index,follow`; work zone 5.1–5.5 + coach cart = `noindex,nofollow`.

| # | Screen (node) | file | Type | Reuses | Base | States (real) |
|---|---------------|------|------|--------|:----:|----------------|
| 1 | **Для тренерів** landing (5.0) | `coach-landing.html` | page (public) | home/content patterns | ✓ | guest CTA → auth (1.x) |
| 2 | **Стати тренером** / verify (5.1) | `coach-verify.html` | flow (dialog/page) | auth modal + states | ✓ *(role request)* | **loading** (verifying link) · **error** (failed → resubmit) · **deadend** (no wholesale, stays buyer) · **tier** (Free instant / Pro choice) |
| 3 | **Кабінет тренера** (5.2) | `coach-home.html` | page (private) | **account shell** (7.x) coach-mode | ✓ *(dashboard + «＋ Нова сесія»)* | loading · error |
| 4 | **Клієнти** (5.3) | `coach-clients.html` | page (private) | account shell + list | ✓ | **empty** (no clients) · loading · error · **cap** (Free client cap → Pro upsell) |
| 5 | **Профіль клієнта** (5.4) | `coach-client.html` | page (private) | account + order rows (Job 4 repeat) | ✓ | **empty** (nothing ordered yet) · loading · error |
| 5a | **Редагування клієнта** (5.4a) | `coach-client-edit.html` | dialog (modal over profile) | add-client capture modal + form fields | ✓ *(edit: name/goal/notes over dimmed profile)* | **confirm** (delete-client dialog → remove from list, keep past orders) |
| 6 | **Мультиклієнтська сесія** (5.5) ★ | `coach-session.html` | page (private) | listing quick-add + card + new session components | ✓ *(client tabs + active panel + summary)* | **addclient** (capture name+goal) · **loading** (quick-add stock+tier price) · **oos** (substitute/skip) · **priceblock** (tier price unresolved → session saved, checkout blocked) · **untagged** (assign/discard line) |
| 7 | **Замовлення тренера** (5.6) | `coach-orders.html` | page (private) | account shell + order rows (Job 4 repeat) | ✓ *(list of multi-client orders → Деталі 5.7 / ↻ Повторити 6.0)* | **empty** (no orders) · loading · error |
| 8 | **Деталі замовлення** (5.7) | `coach-order.html` | page (private) | order recap grouped by client (= cart 6.0 grouping) | ✓ *(header + per-client sections + grand total + per-client repeat)* | loading · error *(no empty — order always has lines)* |
| 9 | **Кошик — за клієнтами** (6.0 coach) | `cart-coach.html` | dialog (drawer) | **cart drawer** + per-client grouping | ✓ *(grouped by client, single delivery to coach)* | empty (→ back to session) |
| — | Checkout (6.1) · Order placed (6.2) | **reuse** `checkout.html` / `order-placed.html` | — | Flow-1 checkout/confirmation (single delivery to coach; breakdown kept in order) | — | — |

**New shared components** introduced by 5.5 (added to `_wf.css`, reused by `cart-coach`):
client **tabs** with per-client subtotals · **per-client order group** · **in-session quick-add**
row · **coach-tier price line** (tier price vs struck retail). NOT the global search.

**Per-client loop (flows.md Main Job) — recoveries, never terminal:** select/add client →
quick-add (loads stock + coach price) → *stock?* OOS → substitute / skip line → *tier price?*
unresolved → session saved, checkout **blocked** → *tagged?* untagged → assign / discard →
*more clients?* → Cart (grouped) → Checkout → address → payment. Deliberate dead ends only:
verification failed + resubmit declined (`coach-verify` deadend); payment abandoned (Flow-1).

---

## Flow 3 — Каталог та пошук (навігаційні поверхні) · matrix (built 2026-07-02)

Not a journey — the standalone catalog/search entry surfaces. Reuse the shared header/footer,
canonical card, and (for search) the listing template + filter rail. Registered as WF_FLOWS `f3`
and flipped `ia:`→`file:` in `WF_SITEMAP` (so the «Повна карта сайту» shows them built).

| # | Screen (node) | File | Type | Reuse / notes | States built |
|---|---|---|---|---|---|
| 1 | **Каталог-хаб** (2.0) | `catalog-page.html` | hub (tiles) | 6 goal tiles + 12 category tiles + popular row (canonical card) + SEO. NOT a listing. No filter/grid. | loading · error |
| 2 | **Бренди / індекс** (2.4) | `brands.html` | index (A–Z grid) | toolbar (search·country·category·A–Z) + popular + A–Z brand cards (logo·name·country·count) + «А–Я (UA)» group; 24 real brands from `category-matrix.md`; card → brand listing (2.1). Indexable. | empty (search no-match) · loading · error |
| 3 | **Пошук** (2.5) | `search.html` | overlay + results | results = shared listing template (relevance sort, `<mark>` match highlight, load-more only, noindex); `search-suggest` = autocomplete overlay (recent·popular·completions·categories/brands·product previews); `search-empty` = no-results w/ correction + goals + popular (never dead end). | suggest · empty (no-results) · loading |

**New pattern:** the full sitemap is now data-driven — `WF_SITEMAP` + `wfFullMap()` in `_nav.js`;
building a screen = move its entry `ia:`→`file:` (+ add to a WF_FLOWS group for the count/bar).

---

## Flow 4 — Контент, інфо та лояльність (8.x) · matrix (built 2026-07-02)

13 nodes → **7-template system** (per `content.md`), NOT 13 bespoke layouts. All base-only (service/SEO
pages). Registered as WF_FLOWS `f4`; WF_SITEMAP cluster 8 = 13 `file:` entries. All indexable except
newsletter. Loyalty hand-built (Job 6); the other 12 fanned out via 2 subagents (info-variants + misc).

| Node | File | Template | Notes |
|---|---|---|---|
| 8.7 | `content-loyalty.html` | **Loyalty landing** | public, Job 6 — 2 mechanisms (3-tier lifetime discount 🥉−3/🥈−5/🥇−8% + ~1% bonus, 3-mo expiry, movement table w/ burn) + FAQ + CTA; numbers [?] |
| 8.2 | `content-about.html` | Info page (A) | who/принципи/якість |
| 8.3 | `content-contacts.html` | Info + **contacts block** | phone/hours/email/messengers/map + form; single source with footer |
| 8.4 | `content-delivery.html` | Info + TOC | НП/кур'єр/самовивіз + оплата |
| 8.5 | `content-returns.html` | Info + TOC | 14 днів + step process |
| 8.6 | `content-legal.html` | Info, **legal variant** | anchored оферта/політика/умови, no TOC |
| 8.8 | `content-guarantee.html` | Info + **certificate gallery** | trust row + viewable certs (same as PDP «Сертифікація») |
| 8.9 | `content-faq.html` | **FAQ accordion** | shop FAQ, distinct from product Q&A (3.2) |
| 8.0 | `content-blog.html` | **Blog listing** | tags/search/cards/pagination |
| 8.1 | `content-article.html` | **Article** | simple-answer-first + related products (→3.0) |
| 8.10 | `content-promo.html` | **Promo listing** | **calm, no timers** (Principle 4) — «діє до <дата>» |
| 8.11 | `content-reviews.html` | **Shop reviews** | AggregateRating(Org) + review cards; distinct from product reviews (3.1) |
| 8.12 | `content-newsletter.html` | **State/component** | subscription-confirmed page, **noindex** |

**Latent 404 fixed:** footer/PDP/consent links used a never-built `content.html`; a text→target rewire
remapped **75 anchors** to the specific pages above (0 `content.html` left). Meta-bar links given hrefs.
**Remaining IA-only after this:** quiz 4.x · system pages (404/500/cookie/toasts) · account sub-sections
7.1–7.7 · header/footer components (0.1/0.2, live in `_nav.js`).

---

## State-page count (main flow, for Step 3/5/6 planning)

Base pages: 9. Extra state pages (each a separate `<screen>-<state>.html`, playbook §Artifacts):
- Ціль-колекція: empty · loading · error (+ reuses listing states)
- Категорія (etalon): empty · loading · error · filter-applied
- PDP: loading · error · oos · reviews (Job 3) · [coach CTA — Step 8]
- Кошик: empty · oos-item
- Оформлення: guest vs logged-in · loading(payment) · error(declined) · no-address
- Авторизація: code-step · newuser-step · loading · error
- Замовлення оформлено: guest-end vs account-end
- Кабінет покупця: empty · loading · error

≈ 30 pages for the beginner flow. Confirms Step 8 must fan out via subagents for the rest.

---

## Rules honoured (from the playbook)

- No screen without a **job** and a **flow position** (all 9 have both).
- **Success not marked automatically** — only where a distinct "it worked" screen exists
  (Замовлення оформлено is the true success screen; other "Base" cols = populated/default view).
- States taken from `flows.md` (explicit) + spec role/domain states — none invented.
- Every **empty/error** state must get a **visible exit** at build time (Step 5+), reconciled to `flows.md`.

**Next step → Step 2:** write `wireframes/_conventions.md` (the contract), inheriting the existing
B/W CSS/tokens + unified sidebar + 360/desktop viewports + A–E text source. Then Step 3: the etalon (Категорія 2.1).

---

## Крок 11 — Interactive global nav + Quiz (2026-07-02)

Made the prototype's navigation actually work (clickable), per user ask «мега меню, квиз, и так далее».

**Mega-menu (node 0.1)** — in `_nav.js` `wfHeader()`, so it's on every page. Belok-style:
- data: `WF_CAT_MENU` (12 categories × subcategories) + `WF_GOAL_MENU` (6 goals).
- `wfMegaHTML()` renders left 12 cats + middle 12 sub-panels + right «За ціллю» + «Усі товари».
- `wfMega(i)` switches the active category on `onmouseenter`; opens on `.wfh-cat:hover` (CSS).
- All links real `<a>` (SEO). Categories/subs → `listing.html`; goals → `goal.html`; Бренди → `brands.html`; «Усі товари» → `catalog-page.html`. Desktop-only (inside `.wfh-nav`, hidden < 860).

**City dialog (node 0.1a)** — `wfCityHTML()` + `openCity`/`closeCity`/`wfPickCity`. Off the 📍 chip
(meta bar) and the drawer. Search + 8 popular badges (`WF_CITIES_POP`) + full А–Я 24 cities
(`WF_CITIES_ALL`) + NP delivery note. Pick → writes into `.wfh-city-lbl`.

**Mobile burger drawer** — `wfDrawerHTML()` + `openBurger`/`closeBurger`; ☰ was a dead button.
Left slide-in: city · «За ціллю» chips · 12 category links · meta links (Для тренерів/Квіз/Акції/
Бренди/Доставка/Повернення/Про нас/Контакти/Бонуси/Увійти). Desktop-hidden.

**Quiz (node 4.x, `quiz.html`)** — built by subagent to `ia/docs/pages/quiz.md`. Real stepped
`role=dialog` flow (~560px card / full-screen mobile): intro (4.0) → Q1 goal (required, gates «Далі»)
→ Q2 experience → Q3 frequency → Q4 constraints (multi) → **safety insert (conditional: only if
meds/chronic checked)** → Q5 format/budget → result (4.2): «Ваш стартовий набір для [ціль]» + rationale
chips + 4 canonical `.pcard` products each with «Чому тут:…» + «Додати весь набір у кошик · 4 009 ₴»
(→ cart.html) + «Переглянути всю колекцію» (→ goal.html) + inline email-save + «Це не медична порада».
Registered WF_FLOWS `f1` + WF_SITEMAP 4.x (ia→file). Entry points rewired goal.html→quiz.html: header
«✦ Квіз», home hero «Пройти квіз», catalog-hub «→ Квіз».

**Verified** (Playwright, 1280 + 390): mega opens + category-switch (Протеїн→Креатин middle updates),
city dialog (popular + А–Я), mobile drawer, full quiz run (intro→Q1 gate→skip Q2–Q5→result 4 cards).
Full map now **«36 збудовано · 5 у специфікації»**.

**Still IA-only (5):** system pages (404/500/maintenance/cookie/toasts → `ia/system.html`) · account
sub-sections 7.1–7.7 (sections within `account.html`) · header/footer components (live in `_nav.js`) ·
logged-in account dropdown (static proto header = guest state).

---

## Крок 12 — System pages & global components (2026-07-02)

Node S. Cross-cutting things needed before wireframes, per `ia/docs/pages/system.md`.

**Pages built:**
- `404.html` — full page (header/footer) + search + quick links (На головну · Каталог · Підбір за
  ціллю · Акції · Підтримка) + recovery (популярні розділи chips + 4 canonical product cards). Never a
  dead end. HTTP 404 + noindex (meta). Never soft-404 (200).
- `500.html` — MINIMAL, backend-independent (no `wfHeader`/`wfFooter` — the backend may be down): logo
  + «500» + «Оновити» / «На головну» / «Підтримка» + support line. noindex.
- `maintenance.html` — minimal, planned state; note «HTTP 503 · Retry-After» (temporary, not
  disappearance). Calm, no countdown timer (Principle 4).

**Global components (in `_nav.js`, injected via placeholders):**
- **Cookie-consent banner** (`wfCookie()` → `#wf-cookie`) — UA law: prior consent (inaction ≠ consent),
  three **equal-weight** actions «Прийняти всі / Тільки необхідні / Налаштувати» (reject as easy as
  accept). Settings dialog: **Необхідні** 🔒 locked-on, **Аналітика** + **Маркетинг** opt-in OFF by
  default. `openCookieSettings`/`closeCookieSettings`/`wfCkTog`/`saveCookiePrefs`/`showCookieBar`. Footer
  bottom-bar gained **«Змінити згоду»** (opens the dialog where present, else → system.html).
- **Toasts** (`wfToasts()` → `#wf-toast`; `wfToast(type,msg)`) — ok / error / info, bottom-centre,
  auto-dismiss ~4.2 s + close, `aria-live="polite"`, greyscale (error = outline). Critical → dialog, not
  toast. Icon circle + message + ✕.

**Demo:** `system.html` = component gallery (noindex) — 3 state-page cards (link to 404/500/maintenance
with HTTP codes) + a live cookie banner + «Показати банер знову»/«Налаштувати» + 3 toast triggers +
removed-product 301/410 [?] note.

**Registered:** WF_FLOWS group `f5` (Системні та глобальні: 404 · 500 · maintenance · system) +
WF_SITEMAP cluster S flipped ia→file (4 entries). **Verified** (Playwright 1280): hub, cookie banner +
settings (necessary locked / analytics-marketing opt-in), save→banner hides + toast, toasts ok/err/info
(static-render screenshot; live `wfToast` confirmed via evaluate — element is `position:fixed
bottom:22px z:70`, on-screen, icon+close, `tt-in` fade 0→1 over .22s), 404 full page, 500 minimal.
Toast is hard to catch in a static screenshot because auto-dismiss (4.2 s) < MCP round-trip; verify via
`browser_evaluate` bounding-rect, not a plain screenshot.

Full map now **«40 збудовано · 3 у специфікації»**.

**Remaining IA-only (3):** navigation/footer components (0.1/0.2 — live in `_nav.js`, no standalone
page) · account sub-sections 7.1–7.7 (sections within `account.html`) · logged-in account dropdown
(static proto header = guest state).

---

## Крок 13 — Logged-in account dropdown (2026-07-02)

Built the last interactive nav element from `navigation.md` — the header account zone by auth/role.

**`wfHeader(role)`** — `role`: `'guest'` (default → all existing pages unchanged) · `'buyer'` · `'coach'`.
- **Guest:** 👤 «Увійти» → `auth.html` dialog (unchanged); Бонуси = «Отримати».
- **Logged-in:** 👤 «Кабінет ▾» button opens a right-aligned dropdown (`.wfh-cabmenu`), Бонуси shows a
  balance «240 ₴», «Обране»/«Бонуси» stay their own header elements (NOT in the menu, per spec).
  - **buyer:** header = «Вікторія Коваль» + 🥈 Срібний рівень → Кабінет · Замовлення · Адреси ·
    Стати тренером (→ `coach-verify.html`) · Вийти.
  - **coach:** header = «Олена Кравець» + PRO chip → Кабінет тренера · Клієнти · ＋Нова сесія ·
    Замовлення тренера · (sep) · Мій профіль · Адреси · (sep) · Вийти. «Стати тренером» dropped
    (role active).

**Interactions:** `toggleCab(e)` (stopPropagation + aria-expanded), `closeCab()`, close on
click-outside (`.wfh-cab`) and ESC. CSS: `.wfh-cab`/`.wfh-cabmenu`/`.cab-head`/`.cab-tier`/`.cab-lvl`/
`.cab-sep` in `_wf.css`.

**Wired (sed):** `account*.html` → `wfHeader('buyer')` (4 pages) · all coach cabinet pages
(`coach-home/clients/client/client-edit/session/orders/order*` + `cart-coach*`) → `wfHeader('coach')`
(29). `coach-landing` (public) + `coach-verify` (pre-activation) stay guest. Counts: buyer 4 · coach 29 ·
guest-default 61. This also **fixes the Крок-10 drift** where logged-in areas rendered the guest header.

**Verified** (Playwright 1280): buyer dropdown on `account.html` (Кабінет ▾ + 🥈 + 5 items, no
Обране/Бонуси in menu, Бонуси header = 240 ₴), coach dropdown on `coach-home.html` (Олена Кравець + PRO +
coach items + profile/addresses, no «Стати тренером»). No broken links, syntax OK. Full map unchanged
(«40 збудовано · 3 у специфікації» — the dropdown is a header state of node 0.1, not a new page).

**Remaining IA-only:** navigation/footer components (0.1/0.2 — live in `_nav.js`, no standalone page) ·
account sub-sections 7.1–7.7 (sections within `account.html`). The clickable prototype's navigation is
now feature-complete.

---

## Крок 14 — Сквозной клик-QA всього прототипу (2026-07-02)

**Phase A — static integrity audit** (script over all 102 html + `_nav.js`; traces href/action/
`location.href` → local .html, builds link graph, checks WF_FLOWS/WF_SITEMAP):
- **BROKEN local links: 0** · **ORPHAN pages: 0** · **registered-but-missing (WF_FLOWS/SITEMAP): 0**.
- Static `<a href="#">` without onclick: **1 fixed + 8 accepted.**
  - **Fixed:** `product-oos.html` rating link `★ 4.8 · 126 відгуків` → was dead `#`, now `product.html#rev`
    (OOS variant has no reviews section; routes to the canonical PDP reviews — matches product.html).
  - **Accepted (8):** `content-guarantee.html` `.cert` tiles — «Переглянути ⤢» certificate documents.
    These open a PDF asset in production (out of wireframe scope), not a page. Kept as placeholders.

**Phase B — interactive journey QA** (Playwright 1280, clicking real elements, not URL-typing):
- **Flow 1 (beginner):** home → goal tile → goal.html → product card → product.html → «У кошик» →
  cart.html → checkout CTA → checkout.html → «Підтвердити» → checkout-loading.html → «Оплату
  підтверджено» → order-placed.html. ✓ every hop.
- **Flow 2 (coach):** coach-home.html → «Нова сесія» (page CTA) → coach-session.html → cart-coach.html →
  «Оформити» → checkout.html (converges to shared checkout). ✓
- **Catalog surfaces:** catalog-page.html → category tile → listing.html ✓; header search submit →
  search.html ✓.
- **Auth:** header «Увійти» → auth.html ✓.
- **Interactive components** (verified earlier this session): Catalog mega-menu + hover category-switch ·
  city dialog · mobile drawer · quiz full run (intro→Q1 gate→Q2–Q5→result) · cookie banner + settings +
  save→toast · toasts ok/err/info · logged-in dropdown (buyer + coach). ✓
- Console: only `favicon.ico` 404 across all pages (no favicon asset) — harmless, not a code error.

**Verdict:** прототип цілісний — 0 битих посилань, 0 сиріт, усі головні флоу проходяться кліком до
кінця. Audit script kept at `scratchpad/qa_audit.py` (re-runnable).

---

## Крок 15 — Мега-меню: повна проробка (2026-07-02)

Початок фази детального полірування вайрфреймів (колір/концепт — пізніше, за сигналом користувача).
Перша ціль — мега-меню «Каталог»: структура, повне наповнення, стани.

**Дані (`_nav.js`) з `catalog.md`:** `WF_CAT_MENU` тепер має ПОВНУ таксономію — усі 12 категорій ×
повні підкатегорії, згруповані (`groups`: «За типом» / «За формою» / концерн), + `goals` (цілі
категорії) + `ic` (іконка). `WF_GOAL_MENU` + маппінг goal→категорії (`cats`).

**Рендер (goals-first, рішення 2026-07-01):** ліва рейка = **✦ За ціллю** (перша) + 12 категорій;
середина міняється при наведенні — категорія → згруповані колонки підкатегорій + рядок чипів «За
ціллю»; «За ціллю» → 6 карток-концернів. **Нова права панель** (утиліта + featured): Усі товари ·
Бренди А–Я · Новинки · Акції · Розпродаж + картка «Хіт місяця». `wfMega(k)` — data-key (`'g'` + індекси).
Ширина 940px, три зони, ліва/середина скроляться (max-height 74vh).

**Мобільний:** бургер-drawer → **2-рівневий акордеон** (`toggleDrCat` — тап на категорію розкриває її
підкатегорії + «Усі: {категорія}»). «За ціллю» чипи зверху.

**`megamenu.html`** (нова, спека+стани, noindex): §01 анатомія (3 зони) · §02 закріплене живе мега
(інтерактивне, наведення перемикає) · §03 мокапи мобільного drilldown L0/L1 · §04 **повна таблиця
наповнення — генерується з `WF_CAT_MENU`** (спека не розходиться з живим меню) · §05 6 станів.

**Реєстрація:** WF_FLOWS `f5` (+megamenu) · WF_SITEMAP 0.1 (ia→file). **Verified** 1280 (goals default +
Вітаміни groups) + 390 (drawer accordion). 0 broken / 0 orphans. Full map **«41 збудовано · 2 у
специфікації»** (лишилось: футер 0.2 у `_nav.js` · розділи акаунта 7.1–7.7 у `account.html`).

---

## Крок 16 — Мега-меню як реальний ОВЕРЛЕЙ + `megamenu.html` перероблено (2026-07-02)

За запитом користувача: `megamenu.html` — не IA-звід, а **реальний вайрфрейм відкритого меню** (як
сторінки auth-діалогу), і саме меню — **оверлей (як у Comfy)**.

**Мега як оверлей (усі сторінки, `_nav.js`):** відкриття «Каталог» затемнює сторінку **scrim'ом**
(`.wfh-scrim`, rgba .44, top:104px) + панель над ним. `openMega`/`closeMega` перемикають `.mega-open`
на `.wfh`; закриття — mouse-leave / клік по scrim / ESC. `.mega-pinned` тримає відкритим для демо.
Підтверджено `elementFromPoint` — scrim реально поверх усього контенту нижче шапки.

**`megamenu.html` (перероблено):** реальний відкритий оверлей над затемненою faux-головною
(hero-рейка + промо + товари позаду). Стани через прото-бар: **base = Цілі**, +
`megamenu-protein.html` / `megamenu-health.html` / `megamenu-vitamins.html` (стан = на якій категорії
відкрито меню). Наведення на рейку перемикає середину наживо; state-файли лише пресетять активний пункт
на завантаженні. Реєстрація: WF_FLOWS f5 megamenu states `['protein','health','vitamins']`.

**`home-catalog.html` (новий артефакт):** рейка категорій з головної (`.hrail`) відкриває **flyout-панель
оверлеєм** (Comfy-home) — ліва рейка постійна, наведення відкриває панель праворуч над затемненою
сторінкою. Реюз `WF_CAT_MENU` + `wfMegaGoalsPanel`/`wfMegaCatPanel` (не розходиться з меню). WF_FLOWS f3,
WF_SITEMAP 0.0.

**IA:** описову структуру записано в `ia/docs/pages/navigation.md` (§«Realized in the wireframe») —
goals-first ліва рейка, права = утиліта+featured (не «За ціллю»), overlay, мобільний акордеон.

**Verified** 1280 (Цілі + Протеїн; scrim поверх контенту) + попередньо 390 (drawer). 0 broken / 0
orphans / 0 registered-missing (107 файлів). Full map **«42 збудовано · 2 у специфікації»**.

**Fix (2026-07-02):** mega overlay «поплыло» на десктопі — scrim мав хардкод `top:104px`, а реальна
шапка = 120px, тож тёмна смуга різала низ шапки + білий фон шапки просвічував scrim у пробілах. Фікс:
scrim винесено на **body-level**, `inset:0`, `z-index:20` (нижче sticky-шапки 30, вище контенту 0) — уся
шапка завжди чітка, сторінка затемнюється, без прив'язки до висоти. `openMega/closeMega` тогл `.open`
на scrim; демо — `.pinned`. Те саме застосовано до `home-catalog.html` (`.hc-scrim` inset:0 z-20,
`.hc-nav` z-25). Підтверджено `elementFromPoint` (шапка/мета/праві кнопки — не scrim; контент — scrim).

---

## Крок 17 — Батч правок за фідбеком: PDP · кабінет · coach-state · спільні модалки (2026-07-02)

**PDP (`product.html`):** прибрано ціну тренера з покупецького виду (щоб не чекали дешевшого) — лише
для coach-режиму; «У кошик» відцентровано; дві кнопки «Залишити відгук» → одна велика; «Залишити відгук»
+ «Поставити запитання» тепер **відкривають модалки на сторінці** — SHARED-компонент `wfPdpModals`
(`_nav.js`) + `.pm` стилі (`_wf.css`), той самий і на `product-reviews.html` (референс) → не розходяться.

**Кабінет покупця:** усе бокове меню + dashboard-кнопки тепер ведуть на реальні розділи. Сайдбар
винесено у спільний компонент **`wfAccountNav(active, isCoach)`** (`_nav.js`); шелл-CSS `.acc*` перенесено
з `account.html` у `_wf.css`. Побудовано **5 розділів** (субагент, спільний шелл): `account-orders`
(7.2, список + статуси + ↻Повторити) · `account-loyalty` (7.4, 2 механізми + ledger нарахувань/згорянь,
Job 6) · `account-addresses` (7.5) · `account-profile` (7.1, passwordless) · `account-wishlist` (7.6).
WF_FLOWS `f6` + WF_SITEMAP 7.x (ia→file).

**Coach «вже тренер» (нове стан-рішення):** з кабінету тренера «Профіль / акаунт покупця» →
`account.html?r=coach` → показує **«Ви вже тренер ✓ → Перейти в кабінет тренера»** (не жене повторно через
верифікацію). Шелл (`wfHeader`+`wfAccountNav`) перемикається в coach-режим (Олена · Pro·Тренер · пункт
«Кабінет тренера»). Той самий `?r=coach` підхоплюють усі account-розділи (напр. coach-дропдаун «Адреси»).

**Патерн модалок (узгоджено з користувачем, до підтвердження):** модалка = один спільний компонент у
`_nav.js`; сторінка вставляє placeholder + виклик → відкривається інлайн; референс-сторінка кличе ТОЙ
САМИЙ компонент. Один опис = і інлайн, і еталон, завжди в синхроні. Наступний кандидат — авторизація-діалог.

**Verified** 1280: account buyer (сайдбар-компонент, живі лінки), `?r=coach` (вже-тренер), account-loyalty.
0 broken / 0 orphans (112 файлів). Full map оновлюється (account 7.x → files).

## Крок 18 — Авторизація-діалог як SHARED-компонент (2026-07-02)

Другий екземпляр узгодженого патерну модалок (після `wfPdpModals`), тепер для **авторизації (1.x)**.

**Спільний компонент `wfAuth()` (`_nav.js`) + auth-CSS у `_wf.css`:** увесь `.auth-*`/`.otp*`/`.ph-field`/
`.txt-field`/`.smeths`/`.sbtn`/`.optin`/`.auth-load` виніс з 5 inline-`<style>` у `_wf.css` (одна копія).
Діалог **монтується в `<body>` на вимогу** (`wfAuthMount`, як скрим) + гарантує хост тостів → `openAuth()`
працює на **будь-якій** сторінці без per-page плейсхолдерів. `.auth-ov` прихований (`display:none`),
`.open` показує; власний бекдроп `rgba(18,18,18,.55)` z60 (над хедером z30 — `elementFromPoint` підтвердив).

**State-machine (прототип, БЕЗ перезавантаження):** `wfAuthGo(state)` перемальовує панель inline —
`phone` (база) → `loading` → `code` → `error` → `newuser` → `wfAuthDone()` (закриває + тост «Вітаємо у
Stack! Ви увійшли»). passwordless, phone-OTP-first, split-layout. Кнопки/лінки всередині ведуть по станах
(«Отримати код»→loading, «Ввів неправильний код?»→error, «Змінити номер»→phone тощо). ESC + клік-поза = закрити.

**Тригери «Увійти» → `openAuth('phone')` in-context (замість переходу на `auth.html`):** хедер-гість,
мобільний drawer (+`closeBurger()`), home personal-strip, coach-landing, order-placed, content-loyalty (×3).
`href="auth.html"` лишили як fallback (`return false`).

**Референс-сторінки перероблено:** `auth.html`(phone) · `auth-code` · `auth-loading` · `auth-newuser` ·
`auth-error` — тепер мінімальні: хедер + `openAuth('<state>')` рендерить ТОЙ САМИЙ компонент запіненим
(як `megamenu.html`). Inline-стилі/розмітку діалогу прибрано → екрани не розходяться з живим діалогом.

**Verified:** повний прогін станів на home (клік хедер-«Увійти» → phone→loading→code→error→newuser→done+тост,
URL не змінюється), reference `auth-loading` (pinned loading + бар «Авторизація 1.x»), мобілка 390 (банер +
фул-скрин), drawer-тригер (закриває drawer + відкриває auth). 0 broken / 0 orphans (112 файлів).

## Крок 19 — Довели список патерну модалок: фільтр-шит · клієнт-модалка · coach-PDP (2026-07-02)

Три пункти «дальше» з Кроку 18, усі за тим самим SHARED inline+reference патерном.

**1. Фільтр bottom-sheet (`wfSheet`) → +reference.** Inline-частина вже була спільна (`#wf-sheet` на
11 сторінках listing/goal/search). Додав **reference-стан** `listing-sheet.html` — той самий `wfSheet()`
запінений через `openSheet()` над лістингом (мобільний, ≤860px). Зареєстрував стан `sheet` у listing
(WF_FLOWS + WF_STATE_LABEL «Фільтри (шит)»). Verified 390: шит відкритий, foot Скинути/Застосувати(47).

**2. `coach-client-edit` (5.4a) → інлайн-модалка.** Виніс edit+delete-confirm у SHARED **`wfClientEdit()`**
(`_nav.js`) + CSS `.ceov/.cemodal/.cef/.cegoals/.cedlg` у `_wf.css`. `coach-client.html`: кнопка
«Редагувати клієнта» → `openClientEdit()` **інлайн над реальним профілем** (не окрема сторінка); «Видалити»
→ `openClientDelete()` (confirm) → `coach-clients.html`; save/cancel → `closeClientEdit()` (+тост). Сторінки
`coach-client-edit.html`/`-confirm.html` стали REFERENCE — рендерять ТОЙ САМИЙ компонент запіненим над
димованим `.ce-behind`. ESC/клік-поза закривають. Verified 1280: edit inline (URL не змінюється) → confirm.

**3. Coach-режим PDP `product-coach.html` (стан 3.0 `coach`).** Копія `product.html` з: `wfHeader('coach')`;
**гуртова ціна тренера** повернена (роздріб 1 290 ₴ закреслено → «🎓 Гуртова ціна тренера · Pro 1 090 ₴,
−200 ₴/шт») — та, що прибрали для покупця в Кроку 17; **пікер «Додати клієнту»** (Андрій/Марія/Ігор/новий);
CTA «У кошик»→**«Додати клієнту»**→`coach-session.html` (і в buyrow, і в sticky-барі, і в компактному
sticky-price «1 090 ₴ гурт»). Зареєстрував стан `coach` у product (WF_FLOWS). Verified 1280.

**Verified разом:** 0 broken / 0 orphans (114 файлів, +2). Спільні компоненти тепер: `wfPdpModals`,
`wfAuth`, `wfClientEdit`, `wfSheet`, `wfCity`, `wfCookie`, `wfAccountNav`, mega/drawer.

## Крок 20 — Сквозний клік-QA всього прототипу (2026-07-02)

Багатошаровий прогін, усе зелене:

1. **Статичний граф ссилок** (`scratchpad/qa_audit.py`): **0** битих / **0** сиріт / **0** зареєстрованих-
   але-відсутніх (114 файлів).
2. **Резолюція обробників** (новий `scratchpad/qa_handlers.py`): усі `on*="fn()"` резолвляться у визначені
   функції. Єдині «флаги» — ложні: `hcFly` (визначена як `window.hcFly=`) + `PDF (` всередині рядка тоста.
3. **Console-свип усіх 114 сторінок** (тимчасовий iframe-harness + Playwright console): **0 JS-помилок** на
   завантаженні (лише favicon 404). Тобто `wfHeader/wfFooter/wfBar/wfCatalogRail/wfSheet/openAuth/...` резолвляться скрізь.
4. **Інтерактивний smoke оверлеїв** (open→state→close): мега, місто, бургер-дровер, auth-діалог, кабінет-
   дропдаун, cookie-банер + налаштування + тумблер + save(ховає бар), тости (ok/err/info), PDP відгук/питання,
   клієнт-модалка edit→confirm, фільтр-шит — **усі відкриваються й закриваються**.
5. **Досяжність обох флоу**: 14 хопів (home→listing→product→cart→checkout→order-placed→account + coach-
   landing→verify→home→clients→client→session→cart-coach) — усі **HTTP 200**. Картки лістингу → product.html.
6. **Фікс:** 8 плейсхолдерів сертифікатів на `content-guarantee.html` були `href="#"` без дії → тепер
   **клікабельні** (тост «Сертифікат відкриється як PDF (демо)», +`wfToasts` хост). Дед-кнопок тепер **0**.

Разом: 0 битих, 0 сиріт, 0 дед-кнопок, 0 JS-помилок, обидва флоу проходяться, всі оверлеї працюють.

## Крок 21 — Аудит «відповідності макетів»: хедери-стани · тариф · діалоги клієнта (2026-07-02)

Знайдені користувачем невідповідності по всьому прототипу — виправлено + добудовано.

**1. Хедер-роль не відповідала стану сторінки** (гостьовий «Увійти» на залогінених екранах):
`order-placed-account-end` (акаунт створено) → `wfHeader('buyer')`; `home-buyer` → `buyer`;
`home-coach` → `coach`; `coach-verify` + 4 стани (loading/error/deadend/tier) → `buyer` (флоу входить із
кабінету покупця: крихти «Головна › Кабінет › Стати тренером» = залогінений). checkout має власний
спрощений хедер (не баг).

**2. order-placed: реєстрація не міняла стан.** «Створити акаунт» відкривав auth, але фінальне
«Продовжити» лише закривало діалог (лишався базовий стан). Додав **опційний пункт призначення** в auth:
`openAuth(state, dest)` + `wfAuthDest`; `wfAuthDone()` тепер веде на `dest`, якщо заданий. order-placed
«Створити акаунт» → `openAuth('phone','order-placed-account-end.html')` → після реєстрації переходить на
стан «З акаунтом». (Інші тригери без dest — як раніше: закрити + тост.)

**3. coach-verify «Тип»** (субагент): «Персональний (тренер)» тепер **перший і вибраний за замовчуванням**
(був «Зал»).

**4. coach-home «Керувати тарифом» вів на крок 3 реєстрації** (`coach-verify-tier`). Побудував окрему
**сторінку керування тарифом `coach-tariff.html` (node 5.2a)**: поточний тариф Pro (99 ₴/міс [?], дата
списання, що входить) + діалог **«Скасувати підписку Pro»** → `coach-tariff-free`; порівняння Free/Pro.
Стани: **`free`** (Free активний → «Активувати Pro» → назад на Pro) + **`cancel`** (діалог відкритий).
Перепривʼязав обидва входи в `coach-home` (сайдбар «Тариф» + «Керувати тарифом»).

**5. coach-client не показував полів із модалки.** Предзаповнив спільну `wfClientEdit` канонічними даними
Андрія (тел./e-mail/нотатки) і додав на сторінку блок **«Дані клієнта»** (Ціль · Телефон · E-mail ·
Нотатки) — синхронно з модалкою.

**6. coach-clients «Додати клієнта» вів у сесію.** Розширив `wfClientEdit` **режимом створення** (`#ce-new`
+ `openClientNew()`/`createClient()`): порожня форма «Новий клієнт», інлайн на `coach-clients` («＋ Додати
клієнта») + REFERENCE-сторінка **`coach-client-new.html` (node 5.3a)** над димованим списком.

Реєстрація: WF_FLOWS f2 (+5.2a, +5.3a) · WF_SITEMAP кластер 5 · WF_STATE_LABEL (free/cancel).
**Verified 1280:** order-placed→реєстрація→account-end (URL міняється, хедер «Кабінет»); coach-verify
buyer+Персональний; home-buyer/home-coach залогінені; діалог «Новий клієнт» інлайн; блок «Дані клієнта»
= модалка; coach-tariff Pro + cancel-діалог + coach-home лінк. Аудит: 0 битих / 0 сиріт / 0 дед-кнопок /
0 JS-помилок (118 файлів, +4).

## Крок 22 (2026-07-02) — IA-coherence + polish (post-compact, user-driven)
**IA fix «A» — прибрано «untagged».** Сесія тренера — **client-first**: активна вкладка = клієнт, тож
рядок quick-add автоприв'язується і не може бути «без клієнта». Видалено `coach-session-untagged.html` +
вузли `q6/su1/qtag` з `flows.md` v0.4 (q7→q8), `coach.md`, `sitemap.md`, `concept.html` (Mermaid),
`ia/coach.html` (таблиця recovery). Заміна — два реальні краї:
- **coach-session-newclient.html** (стан `newclient` «Новий клієнт») — щойно доданий клієнт із 0 позицій;
  діалог «Додати клієнта» на `coach-session-addclient` тепер веде сюди (префіл Ігор/Витривалість).
- **coach-session-empty.html** (стан `empty` «Порожньо») — 0 клієнтів, «＋ Додати першого клієнта».
- Ідея «C» (bulk «Додати кільком клієнтам») — відкладено користувачем на потім, НЕ побудовано.

**Квіз (4.x) — компактні картки набору.** Важкі PLP-картки → `.qsc` (мініатюра·бренд·назва·1 рядок
«чому»·ціна+＋), 4 в ряд через `:has(#step-result.on){max-width:760px}`, мобілка 2×2, висота ~276px.

**home.html — рейка категорій = flyout ОВЕРЛЕЙ.** Винесено `wfHomeRail()` у `_nav.js` + спільні
`.hrail-fly`/`.hrail-scrim` у `_wf.css`; home.html відкриває flyout по ховеру над scrim; `home-catalog.html`
+ `home-buyer`/`home-coach` переведені на ту саму функцію (без дрейфу). Полірування за фідбеком: непрозорий
білий фон `.hrail` (був прозорий над scrim), пункти вирівняно вліво як `.mega-cat` (стрілка → правий край),
flyout на всю висоту рейки (top:0/bottom:0) — успадковує вигляд мега-меню.

**home — стан «cart-shelf»** (`home-cart.html`, стан `cart`, ia/home.md §Cart shelf): полиця непорожнього
кошика під героєм (к-сть·сума·мініатюри·Переглянути кошик/Оформити) над стрічкою покупця. `.cshelf` у `_wf.css`.

**goal — бредкрамс.** Прибрано зайвий «Цілі» (і він, і «Каталог» вели на catalog-page) →
`Головна/Каталог/Схуднення` на goal + 3 станах (loading/error/empty).

Реєстрація: WF_FLOWS f2 (coach-session states +newclient/empty) · home states +cart · WF_STATE_LABEL
(newclient/cart). **120 файлів; аудит 0 битих / 0 сиріт / 0 дед-кнопок / 0 JS-помилок.** Перевірено 1280+390.
Коміти: 40d653b (A) · 82581d5 (квіз) · 0f12478 (flyout) · 1f09c79 (cart-shelf+polish).
