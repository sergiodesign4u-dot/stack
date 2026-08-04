# Lean UX Canvas v2 (Jeff Gothelf)

- **Version:** v1.0
- **Shown on:** `research/research.html`, section `#canvas` (registered in `NAV_SECTIONS` as
  "Lean UX"), placed at the top as the executive summary of the research.
- **Built from:** `strategy.md`, `aarrr.md`, `competitors.md`, `research.md`.
- **Written down as a source of truth on 2026-08-04.** The canvas had been rendered on the page
  since the research phase but had no md behind it, so it was the one research artifact that could
  only be edited in html. Content here matches the page.

Every number that needs real data stays `[?]`.

---

## 01. Business problem

Ukrainian sport nutrition stores are built for a buyer who already knows what to look for. There is
no interactive goal quiz, no self-service tooling for coaches, no composition transparency at card
level. The beginner leaves the page. The coach orders by hand through forms or phone calls. The
regular buyer searches for the same product from scratch every time.

## 02. Business outcomes

| Outcome | Target |
|---|---|
| Bounce on product pages | under 5% |
| Share of GMV from coach accounts, 6 months | 40% `[?]` |
| Goal quiz completion | 40% `[?]` |
| Repeat purchase within 30 days | 35% `[?]` |

## 03. Users

- **Primary:** coaches and gyms (25-45) ordering for their athletes.
- **Secondary:** beginners (18-35) lost in the catalog.
- **Supporting:** regular buyers (22-40) restocking.

Behaviour, not demography, splits them. Full profiles: `personas.md`.

## 04. User outcomes and benefits

- **Coach:** ordered for every client in one session, reliably and fast.
- **Beginner:** I know what is safe and what fits my goal.
- **Regular:** I never run out, with no extra steps or decisions.

## 05. Solutions

- Multi-client cart with saved athlete profiles.
- Goal quiz: 3-5 questions, a checked product set at the end.
- Product card: composition, dosage, origin, certification - **above the price**.
- Email / SMS reminders plus one-tap repeat order.

## 06. Hypotheses

| If we build | We believe | Because |
|---|---|---|
| the goal quiz | beginner conversion rises | the barrier is the catalog, not the price |
| the multi-client cart | coach repeat orders exceed 80% in 90 days `[?]` | a reliable supplier is a high switching cost |
| price and composition transparency | bounce falls | the main barrier is fear about safety, not price |

## 07. What is the most important thing to learn first

**Will coaches switch to Stack for a better experience for themselves and their athletes, when the
price stays inside the market range?** belok.ua, GymBeam UA, mega-mass.ua and vansiton.ua already
run some form of B2B or wholesale infrastructure. The question is no longer "will coaches order
online" - some already do. The question is whether Stack's experience is better by enough to justify
the move. If the only reason to switch is price, the bet loses: competitors have larger volume and
lower cost of goods.

Answered in part by the founder coach interviews (June 2026) and it moved the strategy: **price is a
gate, not hygiene.** A workable wholesale price is the precondition for a coach to consider Stack at
all; among price-acceptable suppliers the ordering experience is what wins and retains. Whether Stack
can meet a coach-acceptable price at launch volume stays `[?]`. See `strategy.md` v5.

## 08. Least amount of work to learn it

Interviews with coaches in two groups, before any code.

- **Group 1:** already buying through a wholesale or B2B program (belok.ua `/opt/`, GymBeam B2B,
  mega-mass.ua, vansiton.ua).
- **Group 2:** coaches with no permanent supplier, ordering ad hoc.

For both: what would actually make you move to a new supplier - the ordering experience and what it
gives your athletes, or unit price alone? What does "better for the athletes" mean to you in practice?
