# Block bank by page type

- **Version:** v1.0 (2026-08-04)
- **Shown on:** `ia/structure.html`, section `#blocks` (registered in `NAV_SECTIONS`).
- **What it answers:** what a page of this type is made of, in what order, and **on whose authority**.
  Until this file existed, a node spec said "content blocks: 1 -> 2 -> ..." and did not say where the
  list came from. A model without a source does not stop, it returns the median of everything it has
  seen - hero, filter, cards, pagination - and that only becomes visible at the wireframe stage, when
  the structure is already rolled out.
- **Built by TYPE, not by node.** Eighteen nodes are eight types, so the pass is one per type.

## Sources

Two sources answering two different questions, the same split as competitors vs benchmark at the
research stage:

| Half | Source | Answers |
|---|---|---|
| **Domain truth** | competitors from `research/docs/competitors.md`, opened live with Playwright on 2026-08-04: `belok.ua` home, `/sportivnoye-pitaniye/protein/` listing, `/100-whey-gold-standard/` PDP | what they actually sell in **our** category and what holds a person there |
| **Craft truth** | Refero, searched by page type and job, not by industry | how a page of this type is built in best-in-class outside the category |

**Which half was thin, said out loud.** The craft half is complete for listing, product detail and
checkout (New Balance, shop.app, DoorDash, adidas, ASOS, Xbox, Prose). For **account, content and
dialog** types the Refero pass returned mostly off-target screens, so those three rows lean on the
domain half plus our own research; that is named per type below rather than hidden.

**One input is missing entirely: `research/docs/cjm-as-is.md`.** The CJM stage has not run yet, so
the "barrier" column is traced to `personas.md` pains and `jtbd.md` instead of to a CJM phase. When
stage 02+ lands, this column is re-checked against the real As-Is barriers - that check is the first
step of the CJM close, not an optional pass.

## Filling rules

1. **A block that traces to nothing is not taken.** Every row points at a job, a barrier, or an SEO
   requirement. An orphan block is cut, exactly like an orphan feature in a To-Be backlog.
2. **"Where we are better" is filled, not skipped.** Empty on every row of a type means we collected
   someone's median, and that is said out loud instead of quietly shipped.
3. **A reference is an input, not an output.** A composition that matches one source one-to-one is a
   copy, and is marked as such.
4. **MVP or later on every block.** Without it a denser IA silently doubles the size of stages 04,
   07 and 08.

Legend: **J1** coach multi-client order · **J2** beginner goal to product · **J3** restock ·
**J4** verify safety, composition, certification · **J6** loyalty. `[?]` = needs real data.

---

## Type A - Home (node 0.0)

Domain source: belok.ua home, block order as measured: hero slider -> "Ми рекомендуємо" brand rail ->
"Вигідні пропозиції" product rail (discount badge, struck price, **per-serving price**) -> **"По цілям"**
goal navigation (Набрати масу / Спалити жир / ... each with its own subcategories) -> about-the-company
trust text -> blog rail -> Instagram rail -> SEO text (H1 + 5 H2) -> **FAQ accordion** -> footer.

| # | Block | Traces to | Source | Where we are better | Scope |
|---|---|---|---|---|---|
| 1 | Goal selector hero, 6 tiles | J2; beginner pain "overwhelming catalog, unfamiliar terminology" (`personas.md` OBS-B2) | belok has goal navigation but **below the fold, after two commercial rails**; vansiton.ua is the only other with goal navigation | the goal is the **hero**, not a mid-page rail: the beginner's one clear step is the first thing on the page | MVP |
| 2 | State-based personal strip (guest hidden / buyer repeat order / coach new session) | J3, J1 | none of the five competitors changes the home page by role | the home page answers "who is this" before it sells | MVP |
| 3 | Trust band, 5 mini-banners each linking to the page that proves it | J4; beginner fear of fakes and side effects | belok states advantages in a text block; **its certificates page is empty** (`competitors.md`) | every claim is a link to its proof, so the band is also an internal-linking surface | MVP |
| 4 | Visible "Для тренерів" block | J1; principle 3 | belok, GymBeam, mega-mass, vansiton all hide wholesale behind a footer link or a form | the coach door is on the home page, not in the footer | MVP |
| 5 | Popular categories rail | J3; navigation | all five | with goal tags on the tiles, so a category is also reachable by concern | MVP |
| 6 | Product rail, canonical card with per-serving price | J3; price comparison | belok shows **per-serving price** on the card - the strongest thing they do | we keep it and add availability-first ordering | MVP |
| 7 | Promo / brands / blog | discovery | all five | promo card is calm, **no countdown** (principle 4) | MVP |
| 8 | SEO text + FAQ | organic entry | belok: H1 + 5 H2 + FAQ accordion at the bottom | same structure, shorter, question-shaped per `seo.md` | MVP |

**Deliberately not taken:** Instagram rail (belok has one) - it traces to no job of ours and no barrier.

---

## Type B - Index / hub (nodes 2.0 Catalog, 2.4 Brands)

A hub is navigation, not a listing. Craft source: Refero catalog hubs (shop.app category chips,
DoorDash category strip). Domain: belok has no catalog hub at all - its "Каталог" goes straight to a
listing.

| # | Block | Traces to | Source | Where we are better | Scope |
|---|---|---|---|---|---|
| 1 | Breadcrumb + H1 + short intro | SEO, orientation | Refero | | MVP |
| 2 | 6 goal tiles | J2 | our own decision 2 | the hub opens with concern, not with taxonomy | MVP |
| 3 | 12 category tiles with subcategory hints | navigation | Refero, DoorDash category strip | a hint under the tile, so the second click is chosen not guessed | MVP |
| 4 | Popular / A-Z index (brands) | J3, known-item | Refero A-Z indexes | brand cards carry country and product count, which is a trust signal in this category | MVP |
| 5 | SEO text | organic entry | belok listing tails | | MVP |

**Note:** a hub is a distinct type from a listing on purpose. Merging them is what belok does, and it
is why their catalog entry point cannot rank for a navigational query.

---

## Type C - Listing / PLP (2.1 category, 2.2 goal, 2.4 brand, 2.5 search, 2.1a city)

Domain source: belok.ua `/protein/`, measured order: breadcrumb -> H1 -> **filter rail** (КАТЕГОРІЇ
subcategories, ЦІНА range, ЗНИЖКА) + product grid (card = discount badge, name, **brand + country**,
review count, struck price, live price, **per-serving price**, "Купити") -> phone CTA strip ->
"Інші покупці рекомендують" -> SEO text with **10 H2** -> footer -> "корисні статті" blog links.

Craft source: New Balance (left accordion filter rail + 4-column grid, hideable rail), shop.app
(filter chips + active-filter row + sort dropdown), DoorDash (quick-add on the card, stock badge).

| # | Block | Traces to | Source | Where we are better | Scope |
|---|---|---|---|---|---|
| 1 | Breadcrumb | SEO, orientation | both | | MVP |
| 2 | H1 + collapsible trust intro + result count | SEO; J4 | belok H1; count from Refero | the intro is collapsible, so it serves SEO without pushing the grid down | MVP |
| 3 | Subcategory chips + **goal chips** | J2 | belok has subcategories in the rail only | goal chips put the concern lens on the listing itself | MVP |
| 4 | Toolbar: sort, view, active-filter chips | control | shop.app | active filters are removable chips, not a hidden state | MVP |
| 5 | Filter rail (desktop) / bottom sheet (mobile) | J3 | New Balance rail; belok rail is category+price+discount only | our facets come from `catalog.md` (form, serving, brand, country, goal), so filtering matches how the product is actually chosen | MVP |
| 6 | Product grid, canonical card + availability states + quick-add + wishlist | J3, J2 | belok card; DoorDash quick-add and stock badge | **availability-first default order** (in stock -> to order -> out of stock last), and out of stock says "Повідомимо, коли зʼявиться" instead of hiding the item | MVP |
| 7 | Load-more **plus** crawlable numbered pagination | SEO | Refero uses load-more; belok listing has no visible pagination | both, because load-more alone makes deep pages uncrawlable | MVP |
| 8 | SEO text, unique per category, + FAQ | organic entry | belok 10 H2 tail | shorter and answer-shaped; ready copy per category lives in `category-matrix.md` | MVP |
| 9 | Related brands / categories | internal linking | belok "корисні статті" | | MVP |

**Deliberately not taken:** the phone CTA strip in the middle of the grid (belok) - it interrupts the
scan without serving a job of ours.

**One shared template** serves all five listing scopes; only H1, data scope and the SEO block differ.

---

## Type D - Product detail (node 3.0)

Domain source: belok.ua PDP, measured order: breadcrumb -> sticky tab nav (Про товар · Опис · Склад ·
Аналоги · Відгуки 137) -> gallery + buy-box (brand, **country**, price, per-serving) -> **Доставка**
block (Нова Пошта відділення / кур'єр / поштомат, 1-2 days, from 50 UAH) -> **Оплата** block ->
**Опис** (very long) -> **Склад** table, with a note that serving size varies by flavour -> Аналоги
rail -> **Відгуки with a store reply under every review**.

Craft source: Prose ingredient page (ingredient grid with benefit text + a **certification band**).

| # | Block | Traces to | Source | Where we are better | Scope |
|---|---|---|---|---|---|
| 1 | Breadcrumb + sticky tab nav | orientation on a long page | belok | | MVP |
| 2 | Gallery + buy-box: H1, brand + country, rating, availability, **one-line plain "what it is for"**, price + per-serving + **coach tier price**, variant pills, single "У кошик" + wishlist | J2, J1, J3 | belok buy-box; per-serving is theirs | the plain one-line answer (principle 5) and the **coach tier price on the card**, which no competitor shows without a login | MVP |
| 3 | **Trust block directly under the buy-box**: Склад (per serving) · Дозування · Походження · **Сертифікація as a viewable certificate** | **J4**, the trust job | belok has Склад but **below a very long Опис**, no dosage block, and an **empty certificates page** | this is the single biggest difference in the project: trust leads, it is not buried, and certification is a real document, not a claim | MVP |
| 4 | Доставка (rows + city chip) + Оплата | conversion barrier "when and how much" | belok, both blocks on the PDP | the city chip binds delivery to the chosen city instead of a generic table | MVP |
| 5 | Опис | J2 | belok | after the trust block, not before it (principle 1) | MVP |
| 6 | Характеристики mirroring catalog facets | J3 | belok | mirrors `catalog.md`, so a spec and a filter can never disagree | MVP |
| 7 | 3.1 Відгуки with rating breakdown + leave review | J4 recovery | belok, **including the store reply under each review** | replies stay, but de-celebrated per the voice rulebook | MVP |
| 8 | 3.2 Питання | J4 | none of the five | a question is a barrier stated out loud; answering it publicly is cheaper than losing the sale | MVP |
| 9 | 3.3 Схожі / з цим купують | discovery | belok "Аналоги" | | MVP |
| 10 | Sticky mobile buy-bar carrying the whole price fact | mobile conversion | Refero | | MVP |

---

## Type E - Cart and checkout (nodes 6.0, 6.1, 6.2)

Craft source: adidas (two-column, left form sections Contact / Address / Shipping / Payment, right
"Your Order" summary + promo + thumbnail), ASOS, New Balance (split layout), Xbox (step indicator).
Domain: belok checkout is behind the cart and was not opened - **that half is missing for this type**,
and the row below says so.

| # | Block | Traces to | Source | Where we are better | Scope |
|---|---|---|---|---|---|
| 1 | Cart = right-side drawer, pure quick view: lines + qty + "Разом" only | J1, J3 | Refero side-sheet carts (DoorDash) | no discount or delivery breakdown in the drawer: the drawer answers "what did I take", the page answers "what do I pay" | MVP |
| 2 | Coach cart grouped by client with per-client subtotals | **J1** | no competitor has this | the whole reason the coach channel works | MVP |
| 3 | Checkout = one sectioned page, simplified header (logo + support phone) | conversion | adidas, ASOS: sectioned, not a wizard | fewer funnel exits, and no step indicator to make a short flow feel long | MVP |
| 4 | Left column: Контакт (guest leads with passwordless phone) -> Ваше замовлення -> Доставка -> Оплата | conversion; auth decision 5 | adidas order of sections | the account is created by the code the buyer already entered, so there is no separate registration step | MVP |
| 5 | Right column: money only, compact, so "Підтвердити" is always in view | conversion | adidas / New Balance summary sidebar | left is input, right is decision - which is also why the only filled accent on the page is the confirm button | MVP |
| 6 | Bonus module, 4 states, **only at checkout** | **J6** | GymBeam has points, belok has a cumulative discount; neither explains the mechanics in the flow | accrual is shown next to the button ("нарахуємо +N"), so loyalty is visible where it is earned | MVP |
| 7 | Upsell "Не забудьте додати", full width under the sections | AOV | Refero | on the canonical product card, not a bespoke component | MVP |
| 8 | 6.2 Order placed + next steps | anxiety after payment | all | routes into order history, which is where the repeat order lives (J3) | MVP |

**Missing half:** belok / GymBeam checkout is behind a cart and a login, so the domain half here is
our own research plus the craft half. Marked, not silently filled.

---

## Type F - Account and coach workspace (nodes 7.x, 5.x)

Refero pass returned mostly off-target screens for this type; the composition leans on our own
research and on what competitors publish about their programs.

| # | Block | Traces to | Source | Where we are better | Scope |
|---|---|---|---|---|---|
| 1 | One shell: desktop section nav + panel, mobile menu-hub | orientation | Refero account patterns (Product Hunt tabs) | the section set equals the header dropdown, so there is one mental model | MVP |
| 2 | Overview: bonuses, last order with "Повторити", wishlist, addresses, loyalty progress | **J3, J6** | belok cumulative discount; GymBeam points | the repeat button is on the dashboard, not three clicks deep | MVP |
| 3 | Orders list -> detail -> one-tap repeat with honest out-of-stock handling | **J3** | no UA competitor has smart reorder (`personas.md` OBS-R2) | the whole secondary job 3 | MVP |
| 4 | Loyalty: 3-tier lifetime discount + bonus ledger showing accrual **and burn** | **J6** | belok publishes tiers (5% at 10K, 10% at 50K, 12-month window); GymBeam points | the burn line is shown, because a bonus that expires silently is a trust loss, not a retention driver. Numbers `[?]` | MVP |
| 5 | Addresses, profile (passwordless), wishlist | utility | | profile has no password to lose | MVP |
| 6 | Coach 5.5 multi-client session: client tabs, in-session quick-add, tier price, tag to client | **J1** | belok, GymBeam, mega-mass, vansiton: all **form or phone**, none self-service per client | the primary job, and the only self-service per-client ordering in the market | MVP |
| 7 | Coach 5.3 / 5.4 clients and client profile, per-client history | **J1** | none | | MVP |
| 8 | Coach onboarding 5.0 landing + 5.1 verification with Free / Pro | J1 acquisition | GymBeam self-service B2B is the closest | published tiers instead of "prices on request", which is the market's default. Numbers `[?]` | MVP |

---

## Type G - Content and info (nodes 8.0-8.12)

Seven templates, not thirteen layouts. Domain source: belok FAQ accordion and advantages block;
craft half thin for this type.

| # | Block | Traces to | Source | Where we are better | Scope |
|---|---|---|---|---|---|
| 1 | Info page A: breadcrumb -> H1 + date -> TOC when long -> prose -> related | trust, legal | all | one template covers About, Contacts, Delivery, Returns, Legal, Guarantee | MVP |
| 2 | Guarantee page with a **certificate gallery** | **J4** | belok's certificates page is **empty** | the proof behind the trust band, and the target of the PDP "Сертифікація" link | MVP |
| 3 | Loyalty explainer landing 8.7 with both mechanisms + worked example + FAQ | **J6** | belok publishes the discount ladder as a page | both mechanisms explained with a movement example, because a bonus nobody understands is not a driver | MVP |
| 4 | FAQ accordion + FAQPage schema | organic entry, doubt | belok FAQ on home and listing | separate from product Q&A 3.2 | MVP |
| 5 | Blog listing + article with related products | discovery, organic | belok blog rail and "корисні статті" | article links into the product, closing the loop | MVP |
| 6 | Promo page, **no timers** | offers | all five use urgency | calm by decision (principle 4) | MVP |
| 7 | Store reviews, separate from product reviews | trust | belok has product reviews only | | MVP |
| 8 | Newsletter as a footer component with double opt-in | retention | all | welcome-discount value `[?]` | MVP |

---

## Type H - Dialog (nodes 1.x auth, 0.1a city, 4.x quiz, filter sheet)

| # | Block | Traces to | Source | Where we are better | Scope |
|---|---|---|---|---|---|
| 1 | Auth: split layout, phone field + consent + "Отримати код", secondary methods under a divider | decision 5 | Refero auth patterns | passwordless for every role, so there is no password to recover and no separate coach login | MVP |
| 2 | Auth returns to the triggering action | flow recovery | Refero | | MVP |
| 3 | City dialog: search + popular badges + full A-Z | delivery, SEO city pages | belok has a city selector in the header | one canonical list feeds delivery, the dialog and the footer city pages | MVP |
| 4 | Filter bottom sheet on mobile | J3 | shop.app, New Balance | | MVP |
| 5 | Quiz: intro -> 5 questions -> conditional safety insert -> **curated set = a filtered goal collection**, not one product | J2 | no UA competitor has a quiz | the result is a collection with a stated rationale, so the beginner keeps a choice instead of being handed one product | **later** |

---

## Open questions

- `cjm-as-is.md` barriers, once stage 02+ runs, re-checked against the "traces to" column of every type.
- Craft half for account, content and dialog types is thin; a second Refero pass by job rather than by
  page type would close it.
- belok / GymBeam checkout was not opened (behind cart and login), so type E has one source.
- Faceted-navigation index whitelist for type C, first city landings, per-category copy: operational `[?]`.
