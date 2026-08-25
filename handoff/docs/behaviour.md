# Behaviour - what the product DOES, step by step

Stage 13, step 2. This is the one document of the package that no page of `design/` or
`design/kit/` answers. The screens show every state; they do not say what MOVES between them, what
happens on the branch nobody wants, or which of the branches is a deliberate dead end.

**It reads from `design/*.html`, never from `wireframes/`.** The grey prototype has been frozen
since stage 05 and after the roll-out every screen exists in colour with all of its states. The one
sentence about the grey folder belongs on the route (step 5), as history, and it is not repeated
here.

**It documents, it does not decide.** A row that cannot name a source is not written with a
plausible answer - it goes to «НЕ ВИРІШЕНО» at the foot and waits for the owner. Behaviour is
exactly the place where an invented median is invisible: it reads like a specification.

---

## How to read

**Three sources, and there is no fourth.**

| Written as | Means | Answers |
|---|---|---|
| `design/<file>.html` | the screen file, in colour | the state EXISTS in the markup |
| `flows.md · <id>` | a node of a mermaid diagram in `ia/docs/flows.md` | the transition EXISTS in a flow |
| `pages/<cluster>.md` | `ia/docs/pages/<cluster>.md` | the IA node REQUIRES it |

A row may carry more than one, joined by `+`. Every source is resolved mechanically by
`node tools/handoff.mjs` - a screen file that does not exist and a flow id that is not in the
diagram both fail the run.

**Nothing is quoted.** A string a user reads is addressed (`microcopy.md · cluster N · zone`), never
copied: two editions of one sentence is the defect this whole stage exists to prevent. Same for a
number - the token name, not the value. `tools/handoff.mjs` greps for the copy.

**Node ids are the flow's own.** `c3`, `q7`, `so1` are the identifiers written in the mermaid source
of `ia/docs/flows.md`, so any row here can be traced back to the exact line that authorised it.

---

## Roll-call

| Flow in `flows.md` | Described here | Section |
|---|---|---|
| Main Job - coach builds a multi-client order | yes | F1 |
| Job 2 - beginner goal-to-product first purchase | yes | F2 |
| Job 3 - verify product safety before buying | yes | F3 |
| Job 4 - one-tap reorder from order history | yes | F4 |
| Job 6 - loyalty review | yes | F6 |

**5 flows = 5 described + 0 deliberately not.** There is no Job 5 in `flows.md`; the numbering
follows the jobs of `research/docs/jtbd.md`, where job 5 (bulk pricing through the coach) is served
inside the Main Job rather than by a flow of its own.

**Screens are NOT rolled-called here.** The five flows name 34 screen nodes; the product has 141
registered pages. The screen-level roll-call belongs to `map.md` (step 3), which asks about every
page in `design/_nav.js`. Splitting the two questions is deliberate: a flow is about MOVEMENT and a
map is about COMPOSITION, and one document answering both would answer neither completely.

---

## F1. Main Job - the coach builds a multi-client order

Primary persona: Olena. The deepest flow in the product by design, because it is a WORK flow: it
covers sign-in, sign-up with verification, per-client history, client creation, the ordering loop
with two failure branches of its own, and the purchase.

### F1.a Getting in

| # | Step | Screen or state | What happens | Source |
|---|---|---|---|---|
| 1 | `s0` | - | the coach opens Stack | `flows.md · s0` |
| 2 | `q1` logged in as a VERIFIED coach? | - | verification, not just sign-in, is the gate: an account with the coach role unverified does not reach the cabinet | `flows.md · q1` + `pages/coach.md` |
| 3 | `q1` yes | `design/coach-home.html` | straight to the coach cabinet | `design/coach-home.html` + `flows.md · c3` |
| 4 | `qacct` has an account? | - | the branch that separates an existing coach from a new one | `flows.md · qacct` |
| 5 | `e1` sign in | `design/auth.html` | ONE dialog for every role, phone-OTP first, Google / Apple / e-mail secondary. No password and no separate coach login exist anywhere in the product | `design/auth.html` + `flows.md · e1` |
| 6 | `slog` | `design/auth-loading.html` | the dialog's own loading step; the panel stays, the step swaps | `design/auth-loading.html` + `flows.md · slog` |
| 7 | `qauth` sign-in successful? | - | | `flows.md · qauth` |
| 8 | `serr` sign-in failed | `design/auth-error.html` | the error lives INSIDE the dialog, on the step that failed. The text is addressed at `microcopy.md` cluster 0, auth dialog | `design/auth-error.html` + `flows.md · serr` |
| 9 | `qretrylogin` retry? | - | yes returns to the dialog, no falls back to the have-an-account branch. Never terminal | `flows.md · qretrylogin` |
| 10 | `c1` no account | `design/coach-landing.html` | the public For Coaches page with the published tier. Every number on it is `[?]` and stays `[?]` | `design/coach-landing.html` + `flows.md · c1` + `pages/coach.md` |
| 11 | `c2` sign-up + verify | `design/coach-verify.html` | the coach role is activated ON AN EXISTING ACCOUNT; this screen collects the social link, it does not create a second identity | `design/coach-verify.html` + `flows.md · c2` |
| 12 | `svrf` | `design/coach-verify-loading.html` | verifying the social link | `design/coach-verify-loading.html` + `flows.md · svrf` |
| 13 | `q2` passed? | - | | `flows.md · q2` |
| 14 | `evf` failed | `design/coach-verify-error.html` | a FIXABLE failure: the link can be resubmitted | `design/coach-verify-error.html` + `flows.md · evf` |
| 15 | `qresub` resubmit? | - | | `flows.md · qresub` |
| 16 | `de1` **dead end** | `design/coach-verify-deadend.html` | verification not passed and the coach declines to resubmit. Terminal ON PURPOSE: there is no manual moderation desk in MVP, so there is nothing to route to. Stated plainly on the screen, not masked as a retry | `design/coach-verify-deadend.html` + `flows.md · de1` |
| 17 | `c3` | `design/coach-home.html` | the cabinet: two entries out of it, «review a client's history» and «new order» | `design/coach-home.html` + `flows.md · c3` |

Empty and failure states of the cabinet itself exist and are not flow nodes: `design/coach-home-empty.html`
(no sessions yet), `design/coach-home-loading.html`, `design/coach-home-error.html`, and
`design/coach-home-free.html` (the account is on the Free tier, so the coach price is not applied).

### F1.b The client's history

| # | Step | Screen or state | What happens | Source |
|---|---|---|---|---|
| 18 | `c5p` review history | `design/coach-client.html` | per-client order history, one of the three things locked decision 1 promises | `design/coach-client.html` + `flows.md · c5p` |
| 19 | `cpl` | `design/coach-client-loading.html` | | `design/coach-client-loading.html` + `flows.md · cpl` |
| 20 | `qcp` loaded? | - | | `flows.md · qcp` |
| 21 | `cperr` | `design/coach-client-error.html` | retry returns to the loading step; there is no dead end on a client's history | `design/coach-client-error.html` + `flows.md · cperr` |
| 22 | `qcphas` any orders? | - | | `flows.md · qcphas` |
| 23 | `cpempty` | `design/coach-client-empty.html` | nothing ordered for this client yet. The empty state does NOT stop the coach - it leads into the ordering session, which is the one action worth offering here | `design/coach-client-empty.html` + `flows.md · cpempty` |

### F1.c The ordering loop

| # | Step | Screen or state | What happens | Source |
|---|---|---|---|---|
| 24 | `c4` | `design/coach-session.html` | the multi-client session: the coach adds products for several clients WITHOUT leaving it. Products come from quick-add inside the session, never from the global catalogue | `design/coach-session.html` + `flows.md · c4` + `pages/coach.md` |
| 25 | `q3` client already in the list? | - | | `flows.md · q3` |
| 26 | `c5` | `design/coach-clients.html` | the saved client list. States: `-empty`, `-loading`, `-error`, and `-cap` (the list is at its cap) | `design/coach-clients.html` + `flows.md · c5` |
| 27 | `addc` add a client | `design/coach-session-addclient.html` | capture inside the session: name and goal, nothing else. `design/coach-client-new.html` is the same capture reached from the client list, and `design/coach-session-newclient.html` is the session right after the client was added | `design/coach-session-addclient.html` + `flows.md · addc` |
| 28 | `slqa` | `design/coach-session-loading.html` | quick-add catalogue AND the coach-tier price load together, which is why the price has a failure branch of its own two rows below | `design/coach-session-loading.html` + `flows.md · slqa` |
| 29 | `q4` in stock? | - | | `flows.md · q4` |
| 30 | `so1` out of stock | `design/coach-session-oos.html` | | `design/coach-session-oos.html` + `flows.md · so1` |
| 31 | `q5` substitute available? | - | | `flows.md · q5` |
| 32 | `csub` choose a substitute | `design/coach-session-oos.html` | a STEP INSIDE the out-of-stock state, not a screen of its own: the substitute is picked in place and the loop returns to the stock question | `design/coach-session-oos.html` + `flows.md · csub` |
| 33 | `q5` no substitute | - | **skip the line and carry on.** This was a hard dead end in an earlier reading of the flow and is now a recovery: one unavailable product must not cost the coach the whole session | `flows.md · q5` |
| 34 | `q7` coach-tier price applied? | - | the second failure branch of the loop, and the one that is specific to this business model | `flows.md · q7` |
| 35 | `ee1` price not applied | `design/coach-session-priceblock.html` | | `design/coach-session-priceblock.html` + `flows.md · ee1` |
| 36 | `qprice` retry or stop? | - | bounded on purpose: an unbounded retry here is an infinite loop | `flows.md · qprice` |
| 37 | `blockc` stop | `design/coach-session-priceblock.html` | **the session is SAVED and checkout is BLOCKED**, then the coach returns to the cabinet. Nothing is lost and nothing is sold at the wrong price. There is no in-app support path in MVP, so this state has no third exit | `design/coach-session-priceblock.html` + `flows.md · blockc` |
| 38 | `q7` yes | `design/coach-session.html` | the line is tagged to the ACTIVE client automatically. Tagging is not a question the coach is asked | `design/coach-session.html` + `flows.md · q7` |
| 39 | `q8` more clients? | - | yes loops back to the client question - **breadth, not depth.** Each further client repeats the same two steps and never opens a deeper screen | `flows.md · q8` |

The session also carries `design/coach-session-empty.html` (the session has no lines at all) and
`design/coach-session-addempty.html` (the active client has no items yet). Both exist in the markup;
see «Three drifts inside `flows.md`» below for what the diagram says about the second one.

### F1.d Cart to confirmation

| # | Step | Screen or state | What happens | Source |
|---|---|---|---|---|
| 40 | `c6` | `design/cart-coach.html` | the cart GROUPED BY CLIENT - a different screen from the buyer's `design/cart.html`, because the per-client grouping is the coach's whole reason for being here | `design/cart-coach.html` + `flows.md · c6` |
| 41 | `qce` empty? | - | | `flows.md · qce` |
| 42 | `ec` | `design/cart-coach-empty.html` | returns to the SESSION, not to the catalogue: the coach's way back into work is the session | `design/cart-coach-empty.html` + `flows.md · ec` |
| 43 | `c7` | `design/checkout.html` | | `design/checkout.html` + `flows.md · c7` |
| 44 | `addr` address selection | `design/checkout-noaddr.html` | saved addresses are READ; if there are none, the address is captured here. The address book itself is `design/account-addresses.html` with its own six states | `design/checkout-noaddr.html` + `flows.md · addr` |
| 45 | `sl1` | `design/checkout-loading.html` | | `design/checkout-loading.html` + `flows.md · sl1` |
| 46 | `q9` payment successful? | - | | `flows.md · q9` |
| 47 | `ep1` declined | `design/checkout-declined.html` | | `design/checkout-declined.html` + `flows.md · ep1` |
| 48 | `q10` retry? | - | | `flows.md · q10` |
| 49 | `qaband` back to cart or abandon? | - | | `flows.md · qaband` |
| 50 | `de3` **dead end** | - | payment abandoned. **The cart is preserved** - that is the whole content of this dead end, and it is what makes it survivable. No screen of its own: the coach returns to a cart that still holds everything | `flows.md · de3` |
| 51 | `c8` | `design/order-placed.html` | | `design/order-placed.html` + `flows.md · c8` |
| 52 | `ok1` success | `design/order-placed.html` | multi-client order placed and confirmed | `design/order-placed.html` + `flows.md · ok1` |

---

## F2. Job 2 - the beginner's first purchase, guest first

Secondary persona: Viktoriia. **The purchase entry is GUEST.** No account is forced anywhere on the
way to a paid order; the account is offered AFTER the order, because the two things it buys - order
history and loyalty - only exist afterwards.

| # | Step | Screen or state | What happens | Source |
|---|---|---|---|---|
| 1 | `b1` | `design/index.html` | home with the six goal tiles. The tiles are the MVP goal guidance; the quiz dialog is the enriched post-launch version of the same job | `design/index.html` + `flows.md · b1` + `pages/home.md` |
| 2 | `b2` goal tile | `design/goal.html` | | `design/goal.html` + `flows.md · b2` |
| 3 | `gcl` | `design/goal-loading.html` | | `design/goal-loading.html` + `flows.md · gcl` |
| 4 | `qgcl` loaded? | - | | `flows.md · qgcl` |
| 5 | `gcerr` | `design/goal-error.html` | retry returns to loading | `design/goal-error.html` + `flows.md · gcerr` |
| 6 | `qgc` any IN-STOCK products? | - | the question is about stock, not about existence: a collection full of sold-out products is empty for this purpose | `flows.md · qgc` |
| 7 | `gce` | `design/goal-empty.html` | routes back to the goal selector to try another goal, never to a blank page | `design/goal-empty.html` + `flows.md · gce` |
| 8 | `b3` open a product | `design/product.html` | | `design/product.html` + `flows.md · b3` + `pages/product.md` |
| 9 | `qa` in stock? | - | | `flows.md · qa` |
| 10 | `so` out of stock | `design/product-oos.html` | back to the collection. **The back-in-stock REQUEST is drawn - it has been since stage 08** (`.notifyrow`, a contact field and a button). What is post-launch is everything after it: no confirmation state, no list of what a buyer is waiting for, no reminder. This row said «is NOT drawn here» until the second handoff exam built the feature and found the form already standing | `design/product-oos.html` + `flows.md · so` |
| 11 | `b4` add to cart | `design/cart.html` | | `design/cart.html` + `flows.md · b4` + `pages/cart.md` |
| 12 | `qce2` empty? | - | | `flows.md · qce2` |
| 13 | `ec2` | `design/cart-empty.html` | back to discovery, meaning the goal selector | `design/cart-empty.html` + `flows.md · ec2` |
| 14 | `b5` | `design/checkout.html` | | `design/checkout.html` + `flows.md · b5` |
| 15 | `qg` guest or register? | - | **the fork the whole flow is built around.** Both branches reach address selection; neither is a wall | `flows.md · qg` |
| 16 | `b6` register | `design/auth.html` | the same one dialog as everywhere else | `design/auth.html` + `flows.md · b6` |
| 17 | `slog2` | `design/auth-loading.html` | | `design/auth-loading.html` + `flows.md · slog2` |
| 18 | `qauth2` successful? | - | | `flows.md · qauth2` |
| 19 | `serr2` | `design/auth-error.html` | | `design/auth-error.html` + `flows.md · serr2` |
| 20 | `qrl2` retry or CONTINUE AS GUEST? | - | a failed sign-in at checkout never blocks the purchase: the guest path is still open one row below | `flows.md · qrl2` |
| 21 | `addr2` | `design/checkout-noaddr.html` | | `design/checkout-noaddr.html` + `flows.md · addr2` |
| 22 | `sl` | `design/checkout-loading.html` | | `design/checkout-loading.html` + `flows.md · sl` |
| 23 | `qp` payment successful? | - | | `flows.md · qp` |
| 24 | `ep` declined | `design/checkout-declined.html` | | `design/checkout-declined.html` + `flows.md · ep` |
| 25 | `qr` retry? | - | | `flows.md · qr` |
| 26 | `qaband2` back to cart or abandon? | - | | `flows.md · qaband2` |
| 27 | `de1` **dead end** | - | payment abandoned, cart preserved | `flows.md · de1` |
| 28 | `b7` | `design/order-placed.html` | | `design/order-placed.html` + `flows.md · b7` |
| 29 | `qac` create an account NOW? | - | offered here and only here. Declining is a legitimate end, not a failure | `flows.md · qac` |
| 30 | `b6b` yes | `design/auth.html` | the same dialog in its second context. `design/auth-newuser.html` is the step a first-time account sees | `design/auth.html` + `flows.md · b6b` |
| 31 | `b8` | `design/account.html` | | `design/account.html` + `flows.md · b8` + `pages/account.md` |
| 32 | `oka` success (account) | `design/order-placed-account-end.html` | purchase complete AND history and loyalty are saved | `design/order-placed-account-end.html` + `flows.md · oka` |
| 33 | `okg` success (guest) | `design/order-placed.html` | purchase complete, no saved history and no loyalty. **Both ends are valid** and the flow says so | `design/order-placed.html` + `flows.md · okg` |

---

## F3. Job 3 - verifying that the product is safe

The trust job, and the one design principle #1 is written for. The buyer reads composition, dosage,
origin and certification BEFORE deciding. Entry is from a goal collection or from search.

| # | Step | Screen or state | What happens | Source |
|---|---|---|---|---|
| 1 | `j1` | `design/goal.html` | entry one | `design/goal.html` + `flows.md · j1` |
| 2 | `j2` | `design/search.html` | entry two. `design/search-suggest.html` is the same screen with the suggestion overlay open | `design/search.html` + `flows.md · j2` + `pages/search.md` |
| 3 | `csl` | `design/search-loading.html` | | `design/search-loading.html` + `flows.md · csl` |
| 4 | `qcsl` loaded? | - | | `flows.md · qcsl` |
| 5 | `cserr` search failed | **no coloured screen** | the flow declares the state and the product does not carry it. `design/listing-error.html` is the CATEGORY listing's error (node 2.1), a different screen, and pointing this row at it would be the exact substitution this document exists to prevent. See «НЕ ВИРІШЕНО» D1 | `flows.md · cserr` |
| 6 | `qcs` any results? | - | | `flows.md · qcs` |
| 7 | `cse` | `design/search-empty.html` | empty results carry SUGGESTIONS, so the screen is never a blank stare | `design/search-empty.html` + `flows.md · cse` |
| 8 | `j3` | `design/product.html` | | `design/product.html` + `flows.md · j3` + `pages/product.md` |
| 9 | `sl` | `design/product-loading.html` | the trust details load; the screen is not usable for this job until they do | `design/product-loading.html` + `flows.md · sl` |
| 10 | `qd` loaded? | - | | `flows.md · qd` |
| 11 | `se` | `design/product-error.html` | | `design/product-error.html` + `flows.md · se` |
| 12 | `qr` retry? | - | | `flows.md · qr` |
| 13 | `q1` composition, dosage, origin, certification ALL clear? | `design/product.html` | four facts, and the branch fires if ANY of them is unclear | `design/product.html` + `flows.md · q1` |
| 14 | `rev` reviews and certificate | `design/product-reviews.html` | the second chance happens ON THE SAME SCREEN. The buyer is not sent somewhere else to be reassured | `design/product-reviews.html` + `flows.md · rev` |
| 15 | `qrev` reassured? | - | | `flows.md · qrev` |
| 16 | `leave` **dead end** | - | the buyer leaves with the doubt unresolved. **An accepted lost sale, written down rather than masked** - there is no third attempt to persuade | `flows.md · leave` |
| 17 | `q2` in stock? | - | asked AFTER trust, never before: the order of these two questions is the trust principle in the flow | `flows.md · q2` |
| 18 | `so` | `design/product-oos.html` | the same screen, and the same half-present notify request - see F2 row 10 | `design/product-oos.html` + `flows.md · so` |
| 19 | `qsub` back to the collection? | - | | `flows.md · qsub` |
| 20 | `leave2` **dead end** | - | no in-stock option, the buyer leaves | `flows.md · leave2` |
| 21 | `j4` | `design/cart.html` | | `design/cart.html` + `flows.md · j4` |
| 22 | `ok` success | `design/cart.html` | trusted, and in the cart | `design/cart.html` + `flows.md · ok` |

---

## F4. Job 4 - one-tap reorder

Supporting persona: Andriy. The whole point is the ONE TAP: the repeat fires from a row of the order
history without opening anything.

| # | Step | Screen or state | What happens | Source |
|---|---|---|---|---|
| 1 | `r0` | - | Andriy wants to restock | `flows.md · r0` |
| 2 | `q1` logged in? | - | an order history requires an account; this is the one place in the buyer's world where sign-in is unavoidable | `flows.md · q1` |
| 3 | `r2` | `design/auth.html` | | `design/auth.html` + `flows.md · r2` |
| 4 | `slog3` | `design/auth-loading.html` | | `design/auth-loading.html` + `flows.md · slog3` |
| 5 | `qauth3` successful? | - | | `flows.md · qauth3` |
| 6 | `serr3` | `design/auth-error.html` | | `design/auth-error.html` + `flows.md · serr3` |
| 7 | `qrl3` retry? | - | no leads to a SOFT EXIT into the shopping path, not to a dead end | `flows.md · qrl3` |
| 8 | `r1` | `design/account.html` | | `design/account.html` + `flows.md · r1` + `pages/account.md` |
| 9 | `r3` | `design/account-orders.html` | | `design/account-orders.html` + `flows.md · r3` |
| 10 | `qe` any past orders? | - | | `flows.md · qe` |
| 11 | `se` | `design/account-orders-empty.html` | nothing to repeat yet | `design/account-orders-empty.html` + `flows.md · se` |
| 12 | `exit` soft exit | `design/index.html` | shop via the goal selector. Explicitly NOT a dead end | `design/index.html` + `flows.md · exit` |
| 13 | `qrepeat` repeat from the row, or open the detail? | - | | `flows.md · qrepeat` |
| 14 | `r4` order detail + repeat | `design/account-orders.html` | **there is no separate order-detail screen for the buyer.** IA nodes 7.2 and 7.3 are merged into one accordion: a history row expands to the full detail in place. The coach's `design/coach-order.html` is a different node (5.7) and is grouped by client | `design/account-orders.html` + `flows.md · r4` + `pages/account.md` |
| 15 | `q2` all previous items in stock? | - | | `flows.md · q2` |
| 16 | `so` one or more staples out | `design/cart-oos.html` | | `design/cart-oos.html` + `flows.md · so` |
| 17 | `q3` remove the unavailable and continue? | - | | `flows.md · q3` |
| 18 | `qfind` back to history, or search for it? | - | two recoveries, and both are real screens | `flows.md · qfind` |
| 19 | `csf` | `design/search.html` | | `design/search.html` + `flows.md · csf` |
| 20 | `r5` | `design/cart.html` | | `design/cart.html` + `flows.md · r5` |
| 21 | `qce4` empty? | - | | `flows.md · qce4` |
| 22 | `ec4` | `design/cart-empty.html` | back to the ORDER HISTORY, not to the catalogue: for this job the history is the discovery surface | `design/cart-empty.html` + `flows.md · ec4` |
| 23 | `r6` | `design/checkout.html` | `design/checkout-loggedin.html` is the same screen for a signed-in buyer, which this job always is | `design/checkout-loggedin.html` + `flows.md · r6` |
| 24 | `addr4` | `design/checkout-noaddr.html` | | `design/checkout-noaddr.html` + `flows.md · addr4` |
| 25 | `sl` | `design/checkout-loading.html` | | `design/checkout-loading.html` + `flows.md · sl` |
| 26 | `q4` payment successful? | - | | `flows.md · q4` |
| 27 | `ep` declined | `design/checkout-declined.html` | | `design/checkout-declined.html` + `flows.md · ep` |
| 28 | `q5` retry? | - | | `flows.md · q5` |
| 29 | `qaband4` back to cart or abandon? | - | | `flows.md · qaband4` |
| 30 | `dep` **dead end** | - | payment abandoned, cart preserved | `flows.md · dep` |
| 31 | `r7` | `design/order-placed.html` | | `design/order-placed.html` + `flows.md · r7` |
| 32 | `ok` success | `design/order-placed.html` | | `design/order-placed.html` + `flows.md · ok` |

---

## F6. Job 6 - reading the loyalty status

Read-only by design: enter, see, leave. **No loyalty mechanics are drawn**, because every threshold
and every percentage is `[?]` and an invented number here would poison the checkout below it.

| # | Step | Screen or state | What happens | Source |
|---|---|---|---|---|
| 1 | `ch` | `design/coach-home.html` | entry one, the coach - the PRIMARY reader of this screen | `design/coach-home.html` + `flows.md · ch` |
| 2 | `bh` | `design/account.html` | entry two, the regular buyer | `design/account.html` + `flows.md · bh` |
| 3 | `ls` | `design/account-loyalty.html` | the two independent mechanisms of locked decision 3 - a lifetime-spend discount that never expires, and a bonus account that does - are shown as two, never merged into one number | `design/account-loyalty.html` + `flows.md · ls` + `pages/account.md` |
| 4 | `lsl` loading | **no coloured screen** | see «НЕ ВИРІШЕНО» D1 | `flows.md · lsl` |
| 5 | `qll` loaded? | - | | `flows.md · qll` |
| 6 | `lserr` failed | **no coloured screen** | the flow says retry returns to loading; neither step has a file. See «НЕ ВИРІШЕНО» D1 | `flows.md · lserr` |
| 7 | `qlhas` anything accumulated? | - | | `flows.md · qlhas` |
| 8 | `lsempty` | `design/account-loyalty-empty.html` | nothing accumulated yet | `design/account-loyalty-empty.html` + `flows.md · lsempty` |
| 9 | `back` | `design/account.html` | **every path returns to the account home the reader came from.** There are no dead ends in this flow at all | `design/account.html` + `flows.md · back` |

`design/account-loyalty-max.html` is the top tier reached - a state of the screen, and not a node of
the flow, because the flow's only question is «is anything accumulated».
The public explainer is a different pair of screens: `design/content-loyalty.html` for a visitor and
`design/content-loyalty-buyer.html` for a signed-in one.

---

## V. Validation - what the product actually enforces

Measured on the coloured corpus, not recalled. This section is short on purpose: **almost nothing is
enforced, and that is the finding, not an omission of this document.**

| # | Rule | Where in the code | What it does | Source |
|---|---|---|---|---|
| V1 | a field whose value is a NUMBER takes digits and nothing else | `design/system/fields.js` | enforced on the two events that can put a character into a field, a keystroke and a paste. The address is the markup's own declaration - `type="number"`, `type="tel"`, `inputmode="numeric"` - and not a list of component names, so a numeric field written tomorrow is covered without being added anywhere | `design/checkout.html` |
| V2 | a cart line quantity is at most two digits | `design/cart.html` | `maxlength` on the counter input; six screens carry it - cart, cart with an out-of-stock line, the coach cart, and three checkout states | `design/cart.html` + `design/cart-coach.html` |
| V3 | an OTP digit is one character, numeric keypad | `design/auth-code.html` | the code step of the auth dialog. The dialog's markup is rendered by the shared script, not by the screen file - see «The runtime» below | `design/auth-code.html` |
| V4 | the goal step of the quiz must be answered | `design/quiz.html` | announced to assistive technology only. There is no visible enforcement and no error state for a skipped step | `design/quiz.html` + `pages/quiz.md` |

**Everything else is unwritten.** In 141 coloured pages there is not one HTML `required`; the single
occurrence is the aria attribute in V4. No phone format, no e-mail format, no minimum or maximum on
any field, no required-ness on the address form, the client capture, the contacts form or the
newsletter form. The failure STATES exist as screens - `design/auth-error.html`,
`design/coach-verify-error.html`, `design/checkout-declined.html` - but what makes them fire is
written in no file in this repository. That is «НЕ ВИРІШЕНО» D2, and it is an owner decision, not a
gap for the next developer to fill with a guess.

---

## The runtime - and the one thing about it that nobody would guess

**Every coloured screen loads `../wireframes/_nav.js`.** The grey folder is frozen, but it is not
dead: it is the RUNTIME. It renders the header, the mega-menu, the mobile tab-bar, the footer, the
cookie banner, the toasts, the auth dialog, the address dialog, the profile dialogs, the client
dialogs, both sidenavs, the filter rail and the filter sheet. `design/_nav.js` runs after it and
repaints what it drew - marks, brand glyphs, theme switch, link repair.

This matters to three readers at once, and it is the reason the sentence is here rather than in a
footnote:

- **it is why several screens carry form controls that a grep of the screen file cannot find.** The
  auth dialog's fields are in the shared script, so `design/auth.html` looks like a screen with no
  inputs and is not one.
- **it is why «`wireframes/` is frozen history» is only half true.** Deleting the folder does not
  remove a historical artefact, it breaks all 141 pages. The route on `handoff.html` names the folder
  once as history; this row is the other half and belongs to behaviour.
- **it is why a state can be a STEP of a dialog rather than a file.** `wfAuthGo` swaps the dialog's
  own step; `design/_nav.js` wraps that function so the colour layer repaints after each swap. Five
  auth screens exist as files for acceptance, and at runtime they are one dialog.

Order of the five scripts on every screen: the grey runtime, then `theme.js` (which applies the
stored theme before paint), `icons.js`, `marks.js`, `fields.js`, and `design/_nav.js` last.

### The shell, and the seven screens that drop it

Measured by `tools/map.mjs`, section A1 of `map.md`: eight components render on all 141 screens, and
the header, the tab-bar, the footer and the mega-menu render on 134. **The seven exceptions are two
deliberate decisions and they are not written down anywhere else.**

| Screens | What they drop | Why it is right |
|---|---|---|
| `design/checkout.html` and its four states | header, tab-bar, footer, mega-menu, drawer | the focused checkout. Nothing on the screen competes with the payment, which is why the only way out of it is the flow's own back-to-cart |
| `design/500.html`, `design/maintenance.html` | the same | **the backend is down, so a header full of working links would promise something false.** This is the reason `design/404.html` KEEPS the full shell: on a 404 the site works and only the address is wrong |
| the five `design/auth-*.html` | footer only | the dialog is the screen; a footer under it would offer an exit from a step that has one already |

The 404-versus-500 split is the part a new developer would get backwards, because the three system
pages look like one family and are two.

---

## Three drifts inside `flows.md` itself

Found by writing this document, which is what a spec pass is for: reading a diagram row by row
against the product asks it questions no reader of the prose ever asks.

| # | Drift | Evidence | Verdict |
|---|---|---|---|
| D-a | the Main Job's prose lists **20 decision points** and its diagram holds **18** | «order line tagged to client» and «assign client or discard line» appear in the bullet list and in no node. The diagram's own edge out of `q7` reads «yes, auto-tagged to active client» - tagging is automatic and is not a question | the prose is a leftover of an older reading. `behaviour.md` follows the DIAGRAM, and F1 row 38 says tagging is automatic |
| D-b | the Main Job's prose lists a state «empty - active client has no items yet» that the diagram does not carry | the state exists in the product as `design/coach-session-addempty.html` | the product and the prose agree; the DIAGRAM is the one missing it. Recorded, not patched |
| D-c | three state nodes have no coloured screen | `cserr` (search failed), `lsl` and `lserr` (loyalty loading and failed). Every other state node of every flow resolves to a file | «НЕ ВИРІШЕНО» D1 |
| D-d | `flows.md` and `concept-map.md` give the SAME entity number to two different features | `flows.md` calls the back-in-stock reminder «Decision 4, entity E10»; `concept-map.md` registers E10 three times as **My Staples List** and files the stockout reminder as «a notification rather than a screen» | the entity register owns entity numbers, so `concept-map.md` wins and `flows.md` carries the wrong attribution. Found by the second handoff exam; reported, not patched |

None of the three is repaired here. `ia/docs/flows.md` belongs to stage 03 and `design/` is closed
after stage 12; a stage that documents does not quietly edit what it documents. All three carry a
row in `handoff/docs/onboarding-gaps.md` instead.

---

## НЕ ВИРІШЕНО - rows that could not name a source

Every row below was refused entry into the spec above because no file in this repository answers it.
Each needs a decision by the owner, and none of them is filled with a plausible median.

| # | Question | Why it cannot be answered here | Who decides |
|---|---|---|---|
| D1 | three flow states have no coloured screen - search failed, loyalty loading, loyalty failed | the flow declares them and `sitemap.md` registers them; the roll-out built no file. Either the screens are built (a product change after stage 12 was accepted) or the flow drops them, and both are decisions | owner |
| D2 | every validation rule beyond the four in section V | required-ness, phone and e-mail format, field lengths, and what exactly makes each error state fire. Nothing in the repository states any of them, and a guess here would read like a specification | owner |
| D3 | what a retry actually retries | «retry» is an edge label in all five flows. Whether it re-requests the same call, re-opens the step, or reloads the screen is nowhere stated. The screens show the states before and after and say nothing about the middle | owner |
| D4 | how long the coach's session survives being blocked | `blockc` saves the session and blocks checkout. Nothing says whether the saved session expires, and if so when | owner |
| D5 | what «cart preserved» means after an abandoned payment | all three dead ends promise it. Whether it survives a browser close, a sign-out, or a different device is not written | owner |
| D6 | the numbers behind loyalty and the coach tier | discount thresholds, accrual rate, bonus lifetime, the coach tier percentage. Locked decision 3 keeps all of them `[?]` on purpose, and they are `[?]` in the product too | owner, with real data |

**6 rows. 0 of them invented an answer.**

---

## Who reads this file

| Reader | What they come here for |
|---|---|
| a new developer | «what happens when this fails» - every branch, and which of them is deliberately terminal |
| you in a year | why a dead end is a dead end, and why the coach cart is a different screen from the buyer's |
| Claude in a new session | the source column: every claim traceable to a file, so nothing here has to be re-derived |
