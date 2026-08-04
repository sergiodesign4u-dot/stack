# CJM As-Is - how Olena orders today

- **Version:** v1.0 (2026-08-04)
- **Shown on:** `research/cjm-as-is.html`
- **Reads:** `personas.md` v1.2 (Persona 1), `jtbd.md` v1.2 (Product Main Job), `competitors.md` v3
- **Read by:** `cjm-to-be.md` (every To-Be feature traces back to a barrier here), `ia/docs/flows.md`
  (screen steps trace to a phase, not to a single job), `voice/docs/voice.md` (phase -> target
  emotion -> how it sounds), `ia/docs/blocks.md` (the "traces to" column)

## Focus

**One persona, one job.** Olena, the coach who already has a supplier (Persona 1, PRIMARY) x the
product main job: *build a complete order for each client in one session from a trusted supplier and
receive the products reliably, without losing professional credibility*.

Chosen because `primary` decides: if Stack cannot convert Olena the business model fails
(`personas.md`, "Why primary"). Her switching likelihood is **LOW** - she has a working system, even
if imperfect. That is the thing this map has to explain: not what is broken, but what she puts up
with and why she still stays.

## Rule of this document

**As-Is follows the rule of research, not of design.** Every emotion comes from a source opened in
this session. Where there is no source, the cell says `[?]` and the curve has a **gap** - it is not
drawn in. A painted emotion here would become a designed feature in To-Be, and nobody would ever
find out it was invented.

## Sources mined (2026-08-04)

| # | Source | Opened | What it gives |
|---|---|---|---|
| S1 | `fitness-shop.ua/optovyj-prajs-dlja-vykupa` - wholesale ordering page | 2026-08-04 | the literal As-Is mechanics: **price list is an .xlsx** (`Prays-opt-fitness-shop.xlsx`, updated 04.08.2026), minimum order **5 000 UAH**, three steps - download and mark quantities, fill the table at the end of the file, e-mail it and **"наші менеджери зв'яжеться з Вами"**. Not self-service. |
| S2 | `hotline.ua/ua/yp/23704/reviews/` - belok.ua store reviews, 125 total | 2026-08-04 | dated verbatim buyer accounts of shipping, support, authenticity. All time: 93 recommend / 25 do not. Last 12 months: 2 reviews, **both negative**. |
| S3 | `belok.ua` home, `/protein/` listing, `/100-whey-gold-standard/` PDP | 2026-08-04 | what the retail path shows and what it does not (no dosage block, no certificate) |

Quotes are kept in the original language of the review.

## Phases, goals, actions, emotions

Scale -3 (worst) to +3. **A phase with no source has no value** - that is the gap, and it is listed
in "What stayed unknown".

### 1. Trigger - a client starts a block or runs low

- **Goal:** notice in time, before the athlete runs out.
- **Actions:** remembers, or the athlete writes to her.
- **Emotion:** `[?]` - no source. Nothing found on how a coach learns that a client is running out.

### 2. Gather needs - who takes what

- **Goal:** turn eight to twenty-five people into one list.
- **Actions:** spreadsheet, messages, memory. **The specific tool is `[?]`** (`personas.md` marks it
  unconfirmed, and a targeted search on 2026-08-04 found only generic Google Sheets training
  templates, nothing about supplements per client).
- **Emotion:** `[?]` - no source.
- **Structural fact, CONFIRMED (S1):** the supplier's file has **no per-client dimension at all** -
  it is one flat price list with a quantity column. Whatever she uses to keep "who this is for", it
  lives outside the supplier's system. This is a barrier without an emotion attached, and it is
  still the strongest one for the design.

### 3. Price list and availability

- **Goal:** find out what things cost today and what is in stock.
- **Actions (S1, verbatim):** "Завантажте прайс. Позначте в ньому кількість товару" - download the
  .xlsx, mark quantities; the sheet totals and discounts itself. Minimum order 5 000 UAH.
- **Emotion: -1.** It works, and that is why she stays. But the file is dated (updated daily at
  best), and **stock is not in it** - availability is only confirmed later, by the manager (S1,
  step 3). She is planning against a number she cannot verify.

### 4. Assemble the order per client

- **Goal:** one order, split by person, so nothing gets mixed up.
- **Actions:** marks quantities in the shared sheet; keeps the per-client split somewhere else.
- **Emotion:** `[?]` for how it feels.
- **Barrier, CONFIRMED (S1 + `competitors.md` v3):** **no supplier has a multi-client cart or saved
  client profiles.** The split by person is her private work, done twice - once in her own file,
  once again when the box arrives.

### 5. Send and wait for the manager

- **Goal:** hand the order over and get a confirmation.
- **Actions (S1, verbatim):** "Заповнений прайс надішліть нам на e-mail. Після отримання від Вас
  листа, наші менеджери зв'яжеться з Вами."
- **Emotion: -1.** The order is out of her hands and nothing is confirmed. `competitors.md` v3:
  **none of eight identified suppliers publishes pricing publicly** - the price she will actually
  pay is still a conversation, not a number.

### 6. The manager call - corrections

- **Goal:** close the gaps: out of stock, price changed, delivery conditions.
- **Emotion: -2.** Source S2, Alex_Mark, 18.10.2022, order 276791:
  > "У магазина клиент-ориентированность 0 (ноль) по 10 бальной шкале... Менеджер: -Нет! Товар со
  > скидкой НЕТ! (достаточно грубовато, скажем так)"

  The store's reply confirms the rule existed - "На сайте красным текстом написано" - which is the
  shape of the barrier: **the condition was on the page, the buyer met it on the phone.** For a coach
  this lands on top of a per-client plan she has already promised to people.

### 7. Payment and waiting

- **Goal:** get the goods by the date she promised her athletes.
- **Emotion: -3.** Two sources, four years apart, same failure:
  > Михаил Морозов, 22.06.2022: "товар который был заказан заранее чтобы успеть к определенному
  > числу (ко Дню рождения) до сих пор не был отправлен... непонятно почему... **никто не предупредил
  > за столько дней**."

  > Кайзер Билл, 24.12.2021, order 233347: "Второй день подряд не могут привезти заказ... Сейчас
  > 15:30 **никто даже не звонил**."

  The pain is not the delay. It is **silence during the delay** - she cannot tell her athlete
  anything, and the credibility that ESJ-1 protects is spent on someone else's logistics.

### 8. Receive and split

- **Goal:** unpack, check, hand each athlete their part.
- **Emotion: -3.** Source S2, Yevhennn, 16.07.2026, order 677538 - the most recent review on the page:
  > "Товар приїхав у відкритій, пошкодженій упаковці, яку заклеїли скотчем і завернули в сміттєвий
  > пакет. Після звернення в підтримку магазину мене просто проігнорували. Нікому не раджу мати
  > справу з цим магазином. Найгірший сервіс."

  The store replied that its cameras show the jar left undamaged and that the buyer never sent the
  photo; the buyer answered that he did, to their Telegram bot. **The mechanism of the low point is
  not the damage - it is that the claim had nowhere to land.**

### 9. Handle the problem in front of the athlete

- **Goal:** answer "is this real" without losing face.
- **Emotion: -3.** Source S2, Елена Андрейченко, 22.02.2026:
  > "продают не оригинальный продукт, пломба не соответствует оригиналу"

  Store reply, verbatim:
  > "Продаємо оригінальну продукцію із заводу. **Це виключно ваша суб'єктивна, помилкова думка**"

  This is ESJ-3 measured in the wild: the doubt is **dismissed rather than resolved**. Nothing on
  belok's side can settle it - their certificates page is empty (`competitors.md` v3, confirmed
  again on 2026-08-04). The coach is left holding the question in front of her client.

### The positive peaks, and where they come from

Both high points in the whole corpus are **people, not tools**:

> traxtor, 16.11.2021: "Являюсь клиентом магазина уже лет 5. Всегда все отлично. А если вдруг,
> возникают нюансы - **ребята всегда идут на встречу**!"

> Арни Шварц, 03.04.2023: "магазин великий і вибір дуже широкий, ціни приємні, **консультанту Сергію
> особиста подяка за професійну консультацію**!"

**Emotion: +2.** This is the finding that matters most for Stack. Olena's low switching likelihood is
not inertia about a file - it is a relationship with a manager who picks up the phone. A self-service
tool does not only have to beat the spreadsheet; it has to carry what the person on the phone was
carrying: someone answers, someone takes responsibility, someone remembers who I am.

## Emotional curve

| Phase | 1 Trigger | 2 Gather | 3 Price list | 4 Assemble | 5 Send | 6 Manager | 7 Waiting | 8 Receive | 9 Face the athlete |
|---|---|---|---|---|---|---|---|---|---|
| Value | `[?]` | `[?]` | -1 | `[?]` | -1 | -2 | **-3** | **-3** | **-3** |
| Source | none | none | S1 | none | S1 | S2 | S2 x2 | S2 | S2 |

**The bottom is phases 7-9** - and all three are after the money is paid. Everything that decides
whether Olena stays with a supplier happens **after the order**, not during it. A store that competes
on catalogue and price is competing in phases 3-5, where her emotion is only mildly negative.

## Growth zones

Ordered by the depth of the low point they sit on, not by how easy they are.

| # | Zone | Sits on | Evidence |
|---|---|---|---|
| **Z1** | The claim has nowhere to land | phase 8, -3 | Yevhennn: support ignored him, the store answered with its cameras and the buyer with his screenshot |
| **Z2** | Doubt about authenticity is dismissed, not resolved | phase 9, -3 | Елена Андрейченко + store reply "ваша помилкова думка"; belok certificates page empty |
| **Z3** | Silence during the wait | phase 7, -3 | Морозов "никто не предупредил", Кайзер Билл "никто даже не звонил" |
| **Z4** | No per-client dimension anywhere in the supplier's system | phase 4, `[?]` emotion, CONFIRMED barrier | S1 flat price list; `competitors.md` v3 gap |
| **Z5** | Stock and price are not knowable without a person | phases 3, 5, 6 | S1 three-step flow; no supplier publishes prices |
| **Z6** | What is good today is a person, and a person does not scale | positive peak +2 | traxtor, Арни Шварц |

## What stayed unknown

Four cells of this map have no source, and no To-Be feature may be justified by them alone:

1. **Phase 1** - how a coach learns a client is running low. `[?]`
2. **Phase 2** - what she keeps client needs in (spreadsheet / messenger / memory). `[?]` in
   `personas.md`, and a targeted search on 2026-08-04 returned only generic training templates.
3. **Phase 4** - how assembling the order per client actually feels. The barrier is confirmed; the
   emotion is not.
4. **The magnitude** of the credibility need (ESJ-1) against price sensitivity. `[?]` since `jtbd.md`.

The cheapest way to close all four is the interview already specified in `lean-ux-canvas.md` §08 -
two groups of coaches, before any code.

## Critique

| # | Finding | Verdict | Action |
|---|---|---|---|
| C1 | Reviews on hotline are retail buyers, not coaches. Do they describe Olena's journey? | **Partly.** Phases 7, 8, 9 are supplier behaviour and do not change with the buyer's role; the coach carries the same failure plus an athlete waiting. Phases 2 and 4 are coach-only and have no source - which is exactly why they are `[?]`. | Kept, with the limit stated here |
| C2 | Two of the strongest quotes are from 2021-2022. Still current? | **Yes, and that is the point.** The 2026-07-16 review shows the same shape (damage plus support silence) four years later; the last 12 months are 2 reviews, both negative. | Kept, dates shown on every quote |
| C3 | The wholesale mechanics come from fitness-shop.ua, not from belok, whose wholesale is a callback form | **Correct, and named.** belok's `/opt/` publishes no terms at all (`competitors.md` v3), so the concrete As-Is steps had to come from a supplier that publishes them. That makes S1 the *better* case, not the worse one: even the transparent supplier is Excel plus e-mail plus a manager. | Kept, source named per phase |
| C4 | Is the +2 peak really a finding, or a nice observation? | **A finding.** It reframes the design problem: the tool must replace a relationship, not a spreadsheet. It is the reason To-Be cannot stop at "faster ordering". | Promoted to Z6 |
| C5 | Curve has four gaps out of nine phases. Is the map usable? | **Yes, and the gaps are the deliverable.** Every low point that To-Be will act on (7, 8, 9) is sourced. The gaps sit in the phases that only an interview can fill, and they are named. | Kept |
