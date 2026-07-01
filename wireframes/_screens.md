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
