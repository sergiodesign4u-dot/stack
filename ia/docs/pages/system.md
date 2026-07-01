# Page-level IA — System pages & global components

- **Scope:** cross-cutting things needed **before wireframes** that belong to no single cluster:
  **404 / errors**, **500**, **maintenance**, the **cookie-consent banner** (Ukrainian law), and
  **toasts / notifications**.
- **Canonical visual:** `ia/system.html`. This markdown is the source of truth.
- **Tone:** the brand principles — calm (Principle 4, no timers/pressure) and always **one clear next
  step** (no dead ends).

## 404 — page not found

A **full page** (inherits header/footer), not a bare screen. Gives an immediate **search field** +
**quick links** (На головну · Каталог · За ціллю · Акції · Підтримка) so the user doesn't leave. **HTTP
404** (never a soft-404 with status 200) + `noindex`. Search reuses the 2.5 component. A 404 on a former
product also shows **related products / the category it belonged to** (recovery, like OOS on the PDP).

## 500 / maintenance

- **500** — «Щось пішло не так» + Refresh / Home / Support. **Minimal template** independent of the
  backend (which may itself be down). HTTP 500, noindex.
- **Maintenance** — «Ненадовго на технічних роботах» + support contacts. HTTP **503 + `Retry-After`**
  so search engines treat it as temporary, not site disappearance. A planned state, not a crash.

## Cookie-consent banner (Ukrainian law)

Grounded in the **Law of Ukraine "On Personal Data Protection"**: cookies may be set **only after
consent** (not by default on landing — inaction ≠ consent); the user must be able to read the privacy
policy first. Draft **Law No. 8153** (adopted at first reading, Nov 2024) moves toward a GDPR-style model
(explicit consent + strictly-necessary exceptions). Therefore:

- **Banner** before any non-essential cookie: short text + link to **Privacy policy (8.6)** + three
  **equal-weight** actions — **«Прийняти всі» / «Тільки необхідні» (= reject optional) / «Налаштувати»**.
  Rejecting is as easy as accepting. Doesn't block browsing, but until a choice is made **no analytics /
  marketing cookies fire**.
- **Settings dialog** — categories: **Необхідні** (always on, 🔒 — cart/auth/security), **Аналітика**
  (Mixpanel/PostHog, anonymized), **Маркетинг** — the last two **off by default (opt-in)**. Save choice
  (~6–12 mo) + a **«Змінити згоду»** link in the footer.
- Aligned with the auth **consent text (1.x)** and the **Privacy policy (8.6)**. Technically: load only
  strictly-necessary scripts before consent; analytics/pixels after opt-in. Exact retention period +
  provider list + final texts are **[?]** (lawyer + tech scope; watch Law 8153).

## Toasts / notifications (global component)

Lightweight feedback for actions: add to cart/wishlist, save address, subscribe, review submitted,
repeat order, errors. Three types — **ok / error / info**. **Auto-dismiss** (~3–5 s) + close;
`aria-live="polite"`. Critical decisions use a **dialog**, not a toast. Calm — no toast spam.

## Technical / SEO

| State | HTTP | Indexation / notes |
|-------|------|--------------------|
| 404 | `404` | noindex; full page with search + links; never soft-404 (200) |
| 500 | `500` | minimal backend-independent template, noindex |
| Maintenance | `503` + `Retry-After` | temporary, not disappearance |
| Cookie banner | — | component; only necessary scripts before consent; policy 8.6 |
| Toasts | — | component; aria-live; SEO-neutral |
| Removed product | `301` / `410` | 301 to the category (better than 404) or 410 if gone for good — operational rule [?] |

## Locked (2026-07-01)

1. **404 = full page** (header/footer) with search + quick links; HTTP 404 + noindex; never a dead end.
2. **500 / maintenance** minimal templates; maintenance = **503 + Retry-After**.
3. **Cookie = prior consent** (UA law): banner before non-essential cookies; reject as easy as accept;
   categories opt-in (analytics/marketing off by default); necessary always on; policy (8.6) linked;
   «Змінити згоду» in the footer.
4. **Toasts** — global ok/err/info, auto-dismiss, aria-live; critical → dialog, not toast.
5. Calm tone (Principle 4), no timers/pressure.

## Open questions [?]

- **Cookie:** exact consent-retention period, provider list (analytics/pixels), final copy — lawyer + tech
  scope; track the fate of Law No. 8153.
- **Removed product:** 301-to-category vs 410 rule — operational.
- **Toast** duration + queue (how many at once) — design detail.
- **Localization** (uk/ru) of system pages — align with i18n.
