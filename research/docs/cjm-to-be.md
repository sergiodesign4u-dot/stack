# CJM To-Be - how Olena orders with Stack

- **Version:** v1.0 (2026-08-04)
- **Shown on:** `research/cjm-to-be.html`
- **Reads:** `cjm-as-is.md` v1.0 (every row below traces to a zone there), `jtbd.md` v1.2,
  `personas.md` v1.2, decisions 1-5 in `CLAUDE.md`
- **Read by:** `ia/docs/concept-map.md` (screens trace to a phase), `ia/docs/flows.md`,
  `voice/docs/voice.md` (phase -> target emotion -> how it sounds), `ia/docs/blocks.md`

## Rule of this document

**To-Be follows the rule of design, not of research.** Every feature traces to an As-Is barrier or to
a job. **A feature that traces to nothing is cut** - not parked, not "nice to have later". The
asymmetry is deliberate: As-Is may not invent an emotion, To-Be may not invent a reason.

To-Be **refines** the MVP core already locked in `CLAUDE.md` and `concept-map.md`. It does not fork it.
Where it disagrees with the locked scope, that is said out loud in "Where To-Be argues with the scope".

## The journey, phase by phase

| # | Phase | What Stack does | Traces to | Target emotion |
|---|---|---|---|---|
| 1 | Trigger | order history per client + repeat from the last order; **no push, no reminder in MVP** | Z4; job "never have a client run out" | neutral, in control |
| 2 | Open a session | cabinet in coach mode -> one big **"+ Нова сесія"** | Z4 | -> +1 the tool knows what she came for |
| 3 | Pick or add a client | client tabs; adding a client is inside the session, not a separate trip | Z4 | +1 |
| 4 | Fill this client's set | **in-session quick-add** (not global search), goals of that client drive selection, **coach tier price on the line** next to the struck retail price, live availability | Z4, **Z5** | +2 the price is a number, not a conversation |
| 5 | Next client | tabs with per-client subtotals; an empty tab is a recovery, not an error | Z4 | +1 |
| 6 | Session summary -> cart | cart **grouped by client**, per-client subtotals kept into the order | Z4 | +2 the split she used to do twice is done once, by the tool |
| 7 | Checkout | one page, published tier price, **single delivery to the coach**, no manager call anywhere on the path | **Z5**, Z6 | +2 |
| 8 | Waiting | honest order status **plus a message on every status change** - the store reaches out, she does not have to go and look | **Z3** | 0 instead of -3: not delight, the removal of silence |
| 9 | Receive and split | order in history **grouped by client**, so unpacking follows the same split as ordering | Z1, Z4 | +1 |
| 10 | Face the athlete | **viewable certificate**, composition and origin on the product page; reviews with answers; a claim has an address | **Z1, Z2** | +2 she can answer the question instead of absorbing it |

## Feature tracing - what is in, and why

| Feature | Traces to | Verdict |
|---|---|---|
| Multi-client session with client tabs (5.5) | Z4, main job | **in, MVP** |
| Saved client list + client profile with goals (5.3, 5.4) | Z4 | **in, MVP** |
| Per-client order history + per-client repeat | Z4, phase 1 | **in, MVP** |
| Coach tier price shown as a number, before registration (5.0) | Z5; `personas.md` trust trigger "transparent, published pricing" | **in, MVP** |
| Self-service role activation, no callback (5.1) | Z5, Z6; trust blocker "form + callback + waiting period" | **in, MVP** |
| Live availability on the line, out of stock is a state not a surprise | Z5, phase 3 As-Is | **in, MVP** |
| Cart grouped by client, single delivery to the coach (6.0) | Z4 | **in, MVP** |
| Honest order status in history (7.2, 7.3) | **Z3** | **in, MVP** |
| Viewable certificate + composition + dosage + origin, leading the PDP (3.0) | **Z2**, ESJ-3, job 4 | **in, MVP** |
| Reviews with store answers, questions block (3.1, 3.2) | Z1, Z2 | **in, MVP** |
| Goal tiles as the beginner front door (0.0) | job 2 - a different persona, kept because the same catalogue serves both | **in, MVP** |
| Loyalty: lifetime-spend tier + bonus ledger with burn (7.4) | job 6; `personas.md` "cumulative discount" is what belok already trains coaches to expect | **in, MVP** |
| **Proactive order status notification (e-mail / SMS on status change)** | **Z3** directly - "никто даже не звонил", "никто не предупредил за столько дней" | **in, MVP** - owner's decision 2026-08-04, option A |
| Quiz (4.x) | job 2, iteration | **later** - the locked scope already says so |
| "My staples" list | job 3, iteration | **later** |
| Back-in-stock e-mail | job 3 | **later** |

### Cut, with the reason

| Cut | Why |
|---|---|
| Coach dashboard with athlete analytics | traces to no As-Is barrier and to no job. HYP-2 (tracking an athlete's intake) is a hypothetical job with no confirmed source. |
| Chat with a manager inside the cabinet | Z6 says the good part of today is a person - but the answer to "a person does not scale" is not to rebuild the phone call. It is to make the tool answer without one. Consulting is also out of MVP by decision. |
| Coach referral link for athletes | HYP-1, hypothetical job, no source. |
| Client-facing portal where the athlete sees their own set | traces to no barrier of Olena's; invents a second product. |
| Push notifications | native app is out of MVP scope. |

## Where To-Be argued with the locked scope - resolved

**One disagreement, and it was a real one.** The locked MVP had no **proactive notification of order
status**, while Z3 is one of the three deepest low points in the As-Is map, backed by two independent
reviews. Honest status inside the account (phase 8) removes the silence only for a coach who thinks
to go and look - and the two sourced quotes are precisely about nobody reaching out.

**Decision (owner, 2026-08-04): option A.** Order status change -> e-mail or SMS enters the MVP. It
is a notification, not a screen, so **no IA node is added and the 19 MVP screens do not change**; it
closes the third-deepest barrier of the map.

What this obliges, named here so it is not discovered later:

| Obligation | Where it lands |
|---|---|
| Status transitions have to be a defined set, because a notification fires on a transition | `ia/docs/pages/account.md` 7.2 / 7.3, the same status vocabulary the history already shows |
| Order placed (6.2) states which channel will be used and when | `ia/docs/pages/cart.md` 6.2 |
| The text of each notification is a product string, so it belongs to the voice inventory | `voice/docs/microcopy.md`, tone from the phase-8 row: honest, dated, no celebration |
| An opt-out has to exist for a channel a person did not ask for | `[?]` - whether it is a profile toggle (7.1) or an unsubscribe link in the message itself is not decided here |
| Which transitions are worth a message, and SMS cost per order | `[?]` - operational, needs real delivery and pricing data |

**The notification is the first MVP item this project added for a reason found in the field rather
than decided at the desk.** That is the whole point of the stage.

## Backlog

Refines the MVP core from `CLAUDE.md` and `concept-map.md`; it does not create a second scope.

| Priority | Item | Traces to | Where it lands |
|---|---|---|---|
| P0 | everything marked "in, MVP" above | Z1-Z6 | already in the 19 MVP screens |
| P0 | **order status notification (e-mail / SMS)** | **Z3** | **in MVP, decided 2026-08-04**; not a screen, so the screen count is unchanged. Obligations listed above. |
| P2 | quiz | job 2 | later, node 4.x |
| P2 | "my staples" | job 3 | later |
| P2 | back-in-stock e-mail | job 3 | later |
| P3 | coach analytics, referral, athlete portal | nothing | **cut**, kept here only so they are not re-proposed |

## Critique

| # | Finding | Verdict | Action |
|---|---|---|---|
| C1 | Phase 8 target emotion is 0, not +2. Is a neutral target a design failure? | **No, it is the honest one.** Removing silence brings her to neutral; a delivery date is not delightful, it is expected. Claiming +2 here would be exactly the "painted emotion" the As-Is rule bans, just moved one document over. | Kept at 0 |
| C2 | Z6 ("what is good today is a person") has no feature against it | **True, and it is deliberate.** No single feature closes it; it is closed by the sum of phases 4, 7, 8 and 10 - the tool answering without a call. Recorded as a cross-cutting requirement rather than a fake row. | Kept as a note |
| C3 | Goal tiles trace to job 2, which belongs to a different persona than this map's focus | **Correct.** Flagged rather than smuggled: this map is Olena x main job, and the tiles are in scope because the catalogue is shared, not because this journey needs them. | Marked in the table |
| C4 | Is "live availability" real, or a promise against operational data we do not have? | **A promise with a known dependency.** Catalogue freshness is the standing operational `[?]` (`CLAUDE.md`). The screen state exists either way - "мало" and "під замовлення" are designed - but the accuracy behind it is not this stage's to guarantee. | Kept, dependency named |
| C5 | Every "in, MVP" row was already in the locked scope. Did To-Be change anything? | **One thing, and it is named:** the notification question. Everything else this map did was supply the *reason* - each MVP feature now points at a sourced barrier instead of at a founder decision. That was the actual gap. | Stated here |
