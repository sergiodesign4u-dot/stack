# Page-level IA — Authentication (node 1.x)

- **Node:** 1.x Authentication — **one unified Sign in / Sign up** for every role, presented as a
  **dialog** (modal on desktop, full-screen on mobile). NOT a separate login page, NOT separate
  coach login, NO role tabs (locked decision). This markdown documents **all auth moments and all
  states** on one spec page.
- **Canonical visual:** `ia/auth.html` (Ukrainian, B/W wireframe). This markdown is the source of truth.
- **Job:** remove the gate with the least friction so any persona can act (buy, favourite, reorder,
  leave a review, activate coach). Auth is **role-agnostic** — role (coach) is activated later on an
  existing account (5.1 / 7.7), so a coach never hunts for "where to log in".
- **Sub-nodes (revised 2026-06-30, phone-OTP-first):**
  - **1.0** Sign in / Sign up — **unified dialog, step 1 = phone field (single)** + consent + primary
    «Отримати код» + secondary method buttons (social / email).
  - **1.1** SMS code (OTP) — code entry, resend timer, change-number.
  - **1.2** Profile completion (new user) — name (+ optional email); returning users skip it.
  - **1.3** Email method — secondary; **passwordless one-time code to email** (same 2-step shape).
  - **1.4** Social method — Google / Apple OAuth; new account → soft, skippable «add phone» prompt.
  - **1.5** Success — dialog closes, returns to the **action that triggered it** (cart/checkout/♡/review).
- **Related:** Navigation header «Увійти» `0.1`, Account `7.0`, Coach activation `5.1`/`7.7`,
  Cart/Checkout `6.x`, Wishlist `7.6`, Reviews/Questions on Product `3.1`/`3.2`.

---

## Decisions (recommendations, flagged for review)

- **Unified entry (no split of sign in vs sign up).** The same flow handles both: enter phone → we
  send a code → if the phone is **new** we create the account (then ask name), if **known** we sign in.
  The user never picks "register" vs "login".
- **Phone-OTP-first (the primary path we push).** The first dialog has a **single field — phone
  number** (+380 UA mask) and one primary button **«Отримати код»**. A passwordless SMS code is the
  default mechanism — fastest on mobile, and the phone is the identifier we want for orders + SMS
  reorder reminders (Decision 4).
- **Split layout.** A calm sport-nutrition **visual on one side** (left), the **form on the other**
  (right). On mobile the dialog is full-screen, form-first; the visual collapses to a slim top banner
  or is dropped. Sides are flexible — finalised at the concept stage.
- **Secondary methods are buttons, not fields.** Under a «або» divider: **Google · Apple · E-mail**
  as buttons. Email opens an email variant of the SAME 2-step flow (**passwordless code to email** —
  no password, so no "forgot password"). Social = OAuth.
- **Consent on the first step (no separate checkbox needed for the offer).** Under «Отримати код»:
  «Продовжуючи, ви підтверджуєте, що згодні увійти до облікового запису **Stack** та надаєте згоду на
  обробку персональних даних.» with links to the **оферта** and **політику конфіденційності**.
- **Calm, one clear step (principles #2, #4).** One field, one button per step; no anxiety, no forced
  marketing opt-in. A newsletter opt-in, if any, is a soft optional checkbox, not a gate.
- **Returns to context.** On success the dialog closes and the user lands back on exactly what they
  were doing (the gated action resumes). Auth never strands the user on a blank page (principle #2).

---

## Flow (unified, phone-first)

```
[Entry: «Увійти» / gated action]
        ↓ opens dialog
1.0 Phone step ── enter phone ──► «Отримати код»
        │                              ↓ (SMS sent)
        │                         1.1 OTP step ── enter code
        │                              ├─ known phone ─────────────► 1.5 Success → resume action
        │                              └─ new phone ──► 1.2 Name ──► 1.5 Success → resume action
        ├─ «або» → Google / Apple → OAuth → (new? soft add-phone) ─► 1.5 Success
        └─ «або» → E-mail → 1.3 email → code to email → (new? 1.2 Name) ─► 1.5 Success
```

Entry points (all open the same 1.0 dialog): header «Увійти» (👤), tab «Акаунт» (guest), ♡ Обране,
checkout (6.x), «Залишити відгук» / «Поставити запитання» (3.1/3.2), For-Coaches CTA (5.0 → after
auth, activate role 5.1).

## Block order — the dialog (mobile-first within the modal)
1. **Visual panel** — sport-nutrition image (atmospheric; left on desktop, slim/への top or dropped on mobile).
2. **Form panel:**
   - **Title** «Вхід або реєстрація» + one-line subtitle («Введіть номер — надішлемо код у SMS»).
   - **Phone field** (single; +380 prefix mask) — the only input on step 1.
   - **Primary CTA** «Отримати код».
   - **Consent text** (offer + personal-data) with links.
   - **«або» divider.**
   - **Secondary buttons:** Google · Apple · E-mail.
   - (Close ✕ / back where applicable.)

## States
| State | Behaviour |
|---|---|
| 1.0 Default (phone) | Single phone field, «Отримати код» primary, consent, social/email buttons. |
| Invalid phone | Inline validation (red field + «Введіть коректний номер»); CTA disabled until valid. |
| Loading (sending SMS) | CTA spinner «Надсилаємо код…»; field locked. |
| 1.1 OTP entry | 4–6 code boxes; auto-advance; auto-submit on full code; «Змінити номер» link. |
| OTP wrong | Boxes red + «Невірний код, спробуйте ще»; attempts counter. |
| OTP resend timer | «Надіслати код повторно через 0:59» → enabled «Надіслати ще раз» after countdown. |
| Rate-limited / too many attempts | «Забагато спроб. Спробуйте за N хв» + offer email/social as fallback. |
| New user → 1.2 Name | After code: «Як вас звати?» name field (+ optional email); then success. |
| Returning user | Code verified → straight to 1.5 success (no name step). |
| 1.3 Email method | Email field → code to email (same 2-step); same new/returning branch. |
| 1.4 Social method | OAuth (Google/Apple); new account → soft, skippable «Додайте номер телефону» prompt. |
| SMS / network error | «Не вдалося надіслати код» + retry + fallback (email/social); never a dead end. |
| 1.5 Success | Dialog closes; **returns to the triggering action** (cart/checkout/♡/review/coach activation). |
| Gated-action context | Title adapts to context, e.g. «Увійдіть, щоб додати в обране» / «…щоб оформити замовлення». |
| Coach path | Same unified auth; after success the **role activation** (5.1) runs separately (verification). |

---

## SEO / technical / security (this page is NOT a content/SEO page)

- **No indexation, no rich SEO.** Auth is a **dialog/utility**, not a landing page. Any fallback URL
  (e.g. `/login`) is **`noindex, follow`**, canonical to home, minimal markup. **No Product/FAQ/etc.
  schema.** This is the deliberate exception to the A–E SEO method used on content pages.
- **Security / mechanics (mark real values [?], set at build):**
  - OTP: 4–6 digits, **short expiry** (e.g. 5 min [?]), **limited attempts**, **resend cooldown**
    (e.g. 60 s [?]), **rate-limit per phone/IP** to stop SMS-bombing/abuse.
  - Passwordless by default (phone + email both code-based) → no password storage, no reset flow.
  - Social OAuth via the chosen provider; account-linking if the same phone/email already exists
    (merge, don't duplicate).
  - Consent + offer acceptance is **logged** (timestamp, version of terms) for legal traceability.
  - Accessibility: focus moves into the dialog on open, **focus trap**, ESC closes (and cancels the
    pending auth), focus returns to the trigger; OTP inputs are labelled and paste-friendly; the
    code field is `inputmode="numeric"` / `autocomplete="one-time-code"`.

## Mobile (360px)
Full-screen sheet, form-first; visual reduced to a slim top banner or dropped. Phone field large,
numeric keypad; «Отримати код» full-width sticky at the bottom of the sheet. OTP step uses the
numeric keypad with SMS autofill (`one-time-code`). Social/email buttons stack full-width.

---

## Locked (draft) / open
**Locked (draft, 2026-06-30):** unified Sign in / Sign up as a **dialog** (no separate page, no coach
login, no role tabs); **phone-OTP-first** with a **single phone field** on step 1 + «Отримати код»;
**consent/offer text** under the CTA (links to оферта + privacy); **split layout** (visual one side,
form the other); secondary methods = **Google · Apple · E-mail buttons**; **email is passwordless
(code to email)** → no password / no forgot-password; **social** OAuth with a soft skippable add-phone
prompt for new accounts; SMS code with **expiry + attempts + resend cooldown + rate-limit**;
**returns to the triggering action** on success; auth is **role-agnostic** (coach role activated later,
5.1/7.7); page is **noindex**, no rich-SEO/schema.

**Supersedes:** the earlier email/password-first sketch (old 1.0 email+password · 1.2 Forgot password
· 1.5 Reset password). With passwordless, the forgot/reset-password nodes are dropped.

**Still [?] (operational / data, not IA):**
- OTP length, expiry, resend cooldown, attempt/rate-limit thresholds — security/ops tuning.
- SMS gateway choice + cost; UA gateway vs Twilio (tech-stack hypothesis).
- Which social providers ship at launch (Google + Apple recommended; Facebook optional).
- Whether email method is code-based (recommended) or password-based — confirm with stakeholders.
- Newsletter opt-in placement (soft, optional) and welcome-discount value [?] (ties to 8.12).
