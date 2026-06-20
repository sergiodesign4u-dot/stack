# User Flows

**Product:** Stack - mobile-first sport nutrition e-commerce, Ukraine
**Version:** v0.1 (2026-06-20)
**Language:** English (markdown research file)
**Depends on:** research/sitemap.md v0.3 (IA: screens + navigation), research/jtbd.md v1.1, research/strategy.md v4
**All screen node names match sitemap.md Section 3 exactly. No screen appears that is not in sitemap.md. Under Question entities and [post-launch] items do not appear.**

---

## Changelog

| Version | Date | Change |
|---------|------|--------|
| v0.1 | 2026-06-20 | Four Mermaid flows: Main Job (coach), Job 2 (beginner goal-to-product), Job 3 (safety verification), Job 4 (one-tap reorder). Decisions, states, and dead ends drawn, not only happy paths. |

---

## Conventions

- `["Screen name"]` is a screen. Every screen name is taken verbatim from sitemap.md Section 3.
- `{"question?"}` is a decision point with `-->|yes|` / `-->|no|` (or named) branches.
- `(["State - ..."])` is a state (empty, loading, error, out of stock), a start point, a success end, or a dead end. The state vocabulary is the set fixed in sitemap.md Section 3 (empty, loading, error, out of stock); no new state types are invented.
- The coach adds products through quick-add inside Multi-client order session, not through the global Catalog and search. Search is therefore not drawn in the coach flow.

---

## Main Job - coach builds a multi-client order in one session and receives the goods reliably (Main JTBD, Decision 1)

Primary persona: Olena. This is the deepest flow by design (it is a work flow). It covers onboarding for a new coach, the per-client ordering loop, and the purchase.

```mermaid
flowchart TD
    s0(["Coach opens Stack"])
    q1{"Logged in as verified coach?"}
    c1["For Coaches page + published pricing"]
    c2["Coach sign-up + social-link verify"]
    q2{"Verification passed?"}
    de1(["Dead end - coach verification failed"])
    c3["Coach account home"]
    c4["Multi-client order session"]
    q3{"Client already in list?"}
    c5["Client list"]
    qE{"Saved client list empty?"}
    se1(["Empty state - no saved clients"])
    q4{"Product in stock?"}
    so1(["Out of stock"])
    q5{"Substitute available?"}
    de2(["Dead end - out of stock, no substitute"])
    q6{"Order line tagged to client?"}
    su1(["Untagged line - assign a client"])
    q7{"Coach-tier price applied?"}
    ee1(["Error state - coach price not applied"])
    q8{"More clients to order for?"}
    c6["Cart"]
    c7["Checkout"]
    sl1(["Loading - processing payment"])
    q9{"Payment successful?"}
    ep1(["Error state - payment declined"])
    q10{"Retry payment?"}
    de3(["Dead end - payment declined, order not placed"])
    c8["Order placed confirmation"]
    ok1(["Success - multi-client order placed and confirmed"])

    s0 --> q1
    q1 -->|no| c1
    c1 --> c2
    c2 --> q2
    q2 -->|no| de1
    q2 -->|yes| c3
    q1 -->|yes| c3
    c3 -->|new order| c4
    c4 --> q3
    q3 -->|no| c5
    c5 --> qE
    qE -->|yes| se1
    qE -->|no| q4
    se1 -->|add first client| q4
    q3 -->|yes| q4
    q4 -->|no| so1
    so1 --> q5
    q5 -->|no| de2
    q5 -->|yes| q6
    q4 -->|yes| q6
    q6 -->|no| su1
    su1 --> q6
    q6 -->|yes| q7
    q7 -->|no| ee1
    ee1 -->|reload| q7
    q7 -->|yes| q8
    q8 -->|yes| q3
    q8 -->|no| c6
    c6 --> c7
    c7 --> sl1
    sl1 --> q9
    q9 -->|no| ep1
    ep1 --> q10
    q10 -->|yes| c7
    q10 -->|no| de3
    q9 -->|yes| c8
    c8 --> ok1
```

- **Decision points:** logged in as verified coach; verification passed; client already in list; saved client list empty; product in stock; substitute available; order line tagged to client; coach-tier price applied; more clients to order for; payment successful; retry payment.
- **States:** empty (no saved clients), out of stock, untagged line (must assign a client), error (coach price not applied), loading (processing payment), error (payment declined).
- **Dead ends:** coach verification failed; out of stock with no substitute; payment declined and not retried.
- **Success:** multi-client order placed and confirmed. Each additional client loops back through the client and quick-add steps (breadth), not deeper screens.

---

## Job 2 - beginner goal-to-product first purchase, guest checkout then guest to account (Job 2, Decision 2; account offer per Decision 3/4)

Secondary persona: Viktoriia. The purchase entry is guest (no forced account). The account is offered after the order, because order history and loyalty need an account.

```mermaid
flowchart TD
    b1["Home / goal selector"]
    b2["Goal Collection"]
    b3["Product detail"]
    qa{"Product in stock?"}
    so(["Out of stock"])
    b4["Cart"]
    b5["Checkout"]
    qg{"Check out as guest or register?"}
    b6["Sign in / register"]
    sl(["Loading - processing payment"])
    qp{"Payment successful?"}
    ep(["Error state - payment declined"])
    qr{"Retry payment?"}
    de1(["Dead end - payment declined, order not placed"])
    b7["Order placed confirmation"]
    qac{"Create account now?"}
    b6b["Sign in / register"]
    b8["Buyer account home"]
    okg(["Success - first purchase complete as guest"])
    oka(["Success - purchase complete, account saves history and loyalty"])

    b1 -->|goal tile| b2
    b2 -->|product| b3
    b3 --> qa
    qa -->|no| so
    so -->|back to collection| b2
    qa -->|yes| b4
    b4 -->|checkout| b5
    b5 --> qg
    qg -->|register| b6
    b6 --> b5
    qg -->|guest| sl
    sl --> qp
    qp -->|no| ep
    ep --> qr
    qr -->|yes| b5
    qr -->|no| de1
    qp -->|yes| b7
    b7 --> qac
    qac -->|yes| b6b
    b6b --> b8
    b8 --> oka
    qac -->|no| okg
```

Note: `b6` and `b6b` are the same screen (Sign in / register) in two contexts: before checkout (optional early register) and on the confirmation (the guest to account offer).

- **Decision points:** product in stock; check out as guest or register; payment successful; retry payment; create account now (guest to account).
- **States:** out of stock (returns to Goal Collection for an alternative); loading (processing payment); error (payment declined).
- **Dead ends:** payment declined and not retried.
- **Success:** two ends, both valid. Guest end (purchase complete, no saved history or loyalty) and account end (purchase complete, history and loyalty saved via Buyer account home).

---

## Job 3 - verify product safety before buying (Job 3)

The buyer reads composition, dosage, origin, and certification on Product detail before deciding. If the safety question is not answered, the buyer leaves (OBS-B5). Entry is from either Goal Collection or Catalog and search.

```mermaid
flowchart TD
    j1["Goal Collection"]
    j2["Catalog and search"]
    j3["Product detail"]
    sl(["Loading - trust details"])
    qd{"Trust details loaded?"}
    se(["Error state - details failed to load"])
    qr{"Retry?"}
    q1{"Composition, dosage, origin, certification all clear?"}
    leave(["Dead end - buyer leaves, safety doubt unresolved"])
    q2{"Product in stock?"}
    so(["Out of stock"])
    qsub{"Back to collection for an alternative?"}
    leave2(["Dead end - no in-stock option, buyer leaves"])
    j4["Cart"]
    ok(["Success - product trusted, added to cart"])

    j1 -->|product| j3
    j2 -->|product| j3
    j3 --> sl
    sl --> qd
    qd -->|no| se
    se --> qr
    qr -->|yes| sl
    qr -->|no| leave
    qd -->|yes| q1
    q1 -->|no| leave
    q1 -->|yes| q2
    q2 -->|no| so
    so --> qsub
    qsub -->|yes| j1
    qsub -->|no| leave2
    q2 -->|yes| j4
    j4 --> ok
```

- **Decision points:** trust details loaded; retry; composition/dosage/origin/certification all clear; product in stock; back to collection for an alternative.
- **States:** loading (trust details); error (details failed to load); out of stock.
- **Dead ends:** buyer leaves with safety doubt unresolved; no in-stock option and the buyer leaves.
- **Success:** product is trusted and added to Cart.

---

## Job 4 - one-tap reorder from order history (Job 4, Decision 4)

Supporting persona: Andriy. He repeats a previous order in one tap. He must be signed in to have an order history.

```mermaid
flowchart TD
    r0(["Andriy wants to restock"])
    q1{"Logged in?"}
    r2["Sign in / register"]
    r1["Buyer account home"]
    r3["Order history"]
    qe{"Any past orders?"}
    se(["Empty state - no past orders to repeat"])
    exit(["Exit - shop via Home / goal selector"])
    r4["Order detail + Repeat order"]
    q2{"All previous items in stock?"}
    so(["Out of stock - one or more staples"])
    q3{"Remove unavailable and continue?"}
    deo(["Dead end - staple out of stock, no substitute"])
    r5["Cart"]
    r6["Checkout"]
    sl(["Loading - processing payment"])
    q4{"Payment successful?"}
    ep(["Error state - payment declined"])
    q5{"Retry payment?"}
    dep(["Dead end - payment declined, reorder not placed"])
    r7["Order placed confirmation"]
    ok(["Success - staples reordered in one tap"])

    r0 --> q1
    q1 -->|no| r2
    r2 --> r1
    q1 -->|yes| r1
    r1 -->|order history| r3
    r3 --> qe
    qe -->|no| se
    se --> exit
    qe -->|yes| r4
    r4 -->|repeat order| q2
    q2 -->|no| so
    so --> q3
    q3 -->|no| deo
    q3 -->|yes| r5
    q2 -->|yes| r5
    r5 --> r6
    r6 --> sl
    sl --> q4
    q4 -->|no| ep
    ep --> q5
    q5 -->|yes| r6
    q5 -->|no| dep
    q4 -->|yes| r7
    r7 --> ok
```

- **Decision points:** logged in; any past orders; all previous items in stock; remove unavailable and continue; payment successful; retry payment.
- **States:** empty (no past orders to repeat); out of stock (one or more staples); loading (processing payment); error (payment declined).
- **Dead ends:** staple out of stock with no substitute; payment declined and not retried. Empty order history is a soft exit to the shopping path (Home / goal selector), not a hard dead end.
- **Success:** staples reordered in one tap and confirmed.

---

## Integrity check

- Every screen node in all four flows is one of the confirmed screens in sitemap.md Section 3: Home / goal selector, Goal Collection, Catalog and search, Product detail, Cart, Checkout, Order placed confirmation, For Coaches page + published pricing, Coach sign-up + social-link verify, Coach account home, Client list, Multi-client order session, Order history, Order detail + Repeat order, Sign in / register, Buyer account home.
- No new screen was needed, so sitemap.md Section 3 was not modified. If a later flow needs a screen that is not listed there, that screen is added to sitemap.md (IA) with a job tag first, and only then kept in a flow.
- No Under Question entity (referral link, adherence tracker, paid subscription, client portal, invoice export) and no [post-launch] item (guided quiz, My Staples list, stockout email reminder) appears in any flow.
- States are limited to the set fixed in sitemap.md Section 3: empty, loading, error, out of stock.

---

## Sources

- research/sitemap.md v0.3 (IA: entities, screens, navigation)
- research/jtbd.md v1.1
- research/strategy.md v4
- research/personas.md v1.2
