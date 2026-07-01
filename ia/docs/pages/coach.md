# Page-level IA — Coach workspace (node 5.x, PRIMARY Job 1)

- **Node:** 5.x — Coach workspace. One artifact covering the whole cluster: **5.0 For-Coaches landing**
  (public), **5.1 Become-a-coach** (verify + tier flow), **5.2 Coach home**, **5.3 Clients**, **5.4
  Client profile**, **5.5 Multi-client order session** (the core). Like `product.md`/`account.md`,
  the whole cluster is one spec.
- **Type:** public landing (5.0) + private work shell (5.2–5.5) + flow (5.1).
- **Canonical visual:** `ia/coach.html`. This markdown is the source of truth.
- **Job:** **Job 1 — PRIMARY** (Decision 1). The deepest flow by design — it is a **work flow**, not
  to be flattened (coach = ~8 taps for a 2-client order).
- **Flow source:** `research/docs/flows.md` — "Main Job — coach builds a multi-client order in one
  session" (persona Olena).
- **Model:** **coach-as-buyer** — a coach is a buyer who orders for clients, **not** a marketplace /
  directory of coaches (consultation is out of MVP scope).

## Nodes

1. **«Для тренерів» landing (5.0)** — **public, indexable** front door (from header + footer). Value
   prop for Olena (**build a multi-client order in one session**, wholesale price, reliable supply) +
   **Free / Pro comparison** + CTA «Стати тренером» (guest → auth 1.x first). Strategy v5: **price is
   the gate**, experience wins on top of it.
2. **Стати тренером (5.1)** — role **activated on top of an existing account** (not a separate login);
   entered from landing 5.0 **or** account 7.7. Steps: sign-in if guest → role request (name/brand,
   city, type) → **social-link verification** (Instagram / gym site → «перевіряємо») → **tier choice**
   (Free instant / Pro subscription) → Coach home. Verification states: waiting · failed→resubmit ·
   **deliberate dead end** (link doesn't confirm → no wholesale access, shop stays as a buyer) · verified.
3. **Кабінет тренера / home (5.2)** — the **account shell (7.x) in coach mode**: tier chip on top,
   the big **«＋ Нова сесія замовлення»** primary CTA (→ 5.5), clients summary, recent orders, coach
   wishlist (shared 7.6). Left nav = the coach «Кабінет» dropdown (Navigation 0.1). Coach loyalty =
   the **published tier** (Decision 3), separate from the buyer's personal loyalty.
4. **Клієнти (5.3) + Профіль клієнта (5.4)** — the core of Decision 1: **saved client list + per-client
   order tagging + per-client order history**. A client's **goal** drives product selection in the
   session. From a profile: **repeat a client's previous order** (Job 4 in a coach context) or start a
   session for that client. States: loading / empty / error for client history. Free tier caps clients
   at **2–3 [?]** → soft upsell to Pro.
5. **Мультиклієнтська сесія замовлення (5.5) — ★ the differentiator.** Client tabs on top (each with a
   per-client subtotal) + active-client panel (their goals → **in-session quick-add** → order lines
   with **coach-tier price** vs struck retail + qty + tag-to-client) + **session summary** (per-client
   subtotals + grand total + «Перейти в кошик»). **The coach adds products via in-session quick-add,
   NOT the global search.** → **Cart with per-client grouping (6.0)** → Checkout (6.x).
   **Per-client loop (flows.md):** select/add client → quick-add (loads stock + coach-tier price) →
   **stock?** OOS → choose substitute / skip line → **tier price?** unresolved → session saved,
   **checkout blocked** → **tagged to client?** untagged → assign or discard line → **more clients?** →
   Cart → Checkout → address → payment. Recoverable problems route back; never a terminal.

## States

- Guest taps «Стати тренером» → auth (1.0) then flow 5.1.
- Returning coach → sign-in → Coach home (5.2); sign-in error → retry.
- Verification: waiting (non-blocking) · failed → resubmit · dead end (no wholesale) · verified.
- Free client cap (2–3 [?]) → soft Pro upsell on adding the next client.
- Session OOS line → substitute / skip (doesn't block the rest).
- **Tier price not applied → session saved, checkout blocked** until confirmed.
- Untagged line → assign client or discard (untagged never reaches the cart).
- Client history: loading (skeleton) · empty · error → retry.

## SEO / privacy (mixed)

- **5.0 landing** — `index, follow`; H1 «Спортивне харчування оптом для тренерів» [?]; Title/Description
  for «спортпіт оптом / для тренерів / гуртові ціни»; Organization + BreadcrumbList; full A–E block;
  internal links from header/footer.
- **5.1–5.5 work zone** — `noindex, nofollow`, **no schema** (private data: clients, tier prices).
- URLs: `/for-coaches` (public) · `/coach`, `/coach/clients`, `/coach/session` (private).
- A11y: client tabs = tablist/tab/tabpanel; session keyboard-operable; tier price + stock announced.

## Locked (2026-07-01)

1. **Coach-as-buyer** (Decision 1): saved clients + tag-to-client + per-client history. Not a marketplace.
2. **Role on top of the account** (no separate login); entry from landing 5.0 or account 7.7.
3. **Coach home = account shell** in coach mode + big «Нова сесія» action.
4. **In-session quick-add** (not global search); **coach-tier price** on every line.
5. **Cart groups by client** (6.0). Flow depth is intentional (work flow), not flattened.
6. **Recovery, not dead ends:** OOS → substitute/skip; tier price unresolved → saved + checkout
   blocked; untagged line → assign/discard.
7. **Landing indexable**, work zone **noindex**.

## Open questions [?]

- **Free/Pro tiers:** Pro price, Free client cap (2–3?), wholesale-discount size — unit economics and
  the coach **price gate**.
- **Wholesale price at launch volume** — whether it clears the coach's gate at all (strategy v5, the
  main risk).
- **Social-link verification** — manual/automated, who moderates — operational process.
- **Cart/Checkout (6.x)** with per-client grouping — not yet page-level (next cluster).
- **Pro analytics / priority stock alerts** — post-launch, scope [?].
