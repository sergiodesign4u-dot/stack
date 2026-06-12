# AARRR Model

**Version:** v_refresh (updated post-competitive analysis refresh)
**Previous version:** v1 (2026-06-10) - initial pre-research hypotheses
**Product:** Stack - mobile-first sport nutrition store, Ukraine

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-06-10 | Initial pre-research hypotheses. All targets marked [?]. |
| v_refresh | 2026-06-12 | Folded in new competitor findings: GymBeam B2B narrows coach acquisition angle; vansiton.ua Coach Account is a discovery; MyProtein UA = local distributors only (not direct competitor at acquisition stage). Coach channel treated as distinct path throughout. One primary metric and one MVP decision per stage enforced. |

---

## Acquisition

### What new competitor findings change

- **GymBeam UA (2.39M monthly visits) and belok.ua (2.345M) are the top-traffic UA stores.** Any SEO strategy must assume these are the incumbent search winners. Stack enters as a challenger - goal-based SEO is the wedge, not broad category competition.
- **GymBeam has a B2B wholesale program with self-service sign-up.** The coach acquisition pitch must be concrete: Stack offers multi-client cart with saved client profiles - not just better pricing or easier sign-up. The "why Stack vs GymBeam B2B" must be answered in the acquisition message.
- **MyProtein direct shipping to Ukraine is currently suspended.** Products reach Ukrainian buyers through local distributors (5lb.ua, proteininkiev.com). This removes myprotein.com as a direct acquisition competitor in Ukraine. It does NOT remove the UX benchmark - their goal selector is still the reference.
- **Vansiton.ua's Coach Account Program exists.** A third partial coach solution in the UA market. Stack's acquisition message for coaches must differentiate from all three (belok wholesale form, GymBeam B2B retailer flow, vansiton coach account).

### Channels and mechanics

- **Coach outreach (direct):** Personal outreach to gym owners and coaches via Instagram DMs and Telegram fitness communities. One coach = potentially 10-30+ active buyers. Differentiation message: "multi-client ordering with saved client profiles, not a bulk retailer account."
- **Organic search (SEO):** Goal-based landing pages targeting Ukrainian search terms: "протеїн для схуднення," "які спортивні добавки купити початківцю," "спортивне харчування для набору маси." Stack does not compete on broad category terms against belok.ua and GymBeam on day one.
- **Social content (TikTok/Instagram Reels):** Short-form video from coaches explaining how they use Stack to manage athlete orders. Educational content on product composition and goal matching.
- **Coach-referred athletes:** Coach recommends Stack to their clients. Athletes arrive pre-trusted. This is the lowest-cost acquisition channel after the coach is converted.
- **Paid social:** Meta ads targeting fitness interest. Broad awareness at launch; narrowed to lookalike after first-party data exists.

### Discarded options (trace)

Broad category SEO (competing for "спортивне харчування" head terms) was considered and rejected: belok.ua and GymBeam have too much domain authority to displace in the short term. Goal-based long-tail is the correct entry point.

### Key hypotheses

1. The coach channel has a significantly higher conversion rate than cold traffic, because the buyer arrives with prior trust from their coach.
2. Goal-based SEO will outperform category pages for beginner acquisition because it matches actual search intent.
3. Coach outreach is the highest-leverage tactic at launch: one converted coach unlocks multiple buyers with minimal marginal cost.

### What is unknown

- Actual CAC for coach channel vs. paid social
- Whether Ukrainian gym coaches are reachable digitally or primarily through in-person relationships
- Competition level for goal-based Ukrainian search terms

### Primary metric

New coach accounts per month. Target (hypothesis): 10 new coach accounts per month by month 3 [?].

### MVP decision

Build a dedicated "For Coaches" landing page and sign-up flow from day one. Differentiate explicitly from GymBeam B2B (retailer-focused) and belok.ua wholesale (form + callback) with a coach-specific message and tool preview.

---

## Activation

### What new competitor findings change

- **No UA sport nutrition competitor has an interactive goal quiz.** GymBeam UA uses static categories. Belok uses 3 static goal buckets. The quiz is the activation differentiator for beginners. First-mover advantage is confirmed.
- **GymBeam's B2B is self-service (register, activate, shop).** The coach activation benchmark is set by GymBeam: no friction, no callback. Stack must match or exceed this - the activation event for coaches must happen within the session, not after a phone call.
- **Vansiton mentions "expert consultant support."** Human consultation as an activation mechanic is present in the market. Stack's alternative is the quiz + trust signals (scalable vs. human-dependent).

### Channels and mechanics

- **Goal quiz for beginners:** 3-5 question quiz (goal, experience level, constraints) with immediate personalized product results. No account required. Activation event: reaching the quiz results page with a curated product set.
- **Coach account onboarding:** Streamlined setup with ability to add client profiles and build the first multi-client order. Activation event: first multi-client order placed within 7 days of registration.
- **Product page trust signals:** Composition breakdown, dosage guide, origin and certification visible above the fold. A beginner who lands on a product page and understands it has been activated.
- **"My first stack" bundle:** Pre-built goal bundles (e.g., "Starter fat loss stack") that reduce the decision to one action.

### Key hypotheses

1. The goal quiz will be the primary activation lever for beginners - users who complete it have a 3x higher likelihood of purchasing than those who browse cold.
2. For coaches, activation happens at first multi-client order, not at account creation. The gap between registration and first order is the key friction point.
3. Trust signals (composition, origin, certification) on product pages will reduce bounce rate among beginners more than price or reviews alone.

### What is unknown

- Actual quiz completion rate without a tested version
- Which trust signals matter most to Ukrainian buyers
- Whether pre-built bundles or custom guidance performs better for beginners

### Primary metric

Quiz completion rate (beginners). Target (hypothesis): 40% quiz completion [?]. Coach first-order rate is the secondary metric: 60% of registered coaches complete first order within 7 days [?].

### MVP decision

The goal quiz is a required MVP feature, not optional. Ship it before investing heavily in catalog breadth. The activation story depends on it.

---

## Retention

### What new competitor findings change

- **GymBeam's B2B self-service creates stickiness through convenience, not a loyalty program.** The coach retention model to beat is: reliable supply + easy reordering. Stack must match this baseline and add client management to exceed it.
- **Liki24's cashback program (SOFT) is the best local reference for loyalty mechanics.** No UA sport nutrition store has a comparable loyalty or smart reorder system. Stack's email/SMS reminders are a meaningful differentiator.
- **Belok's cumulative discount system (belok.ua/ua/sistema-skidok/) is a retention mechanic for regulars.** Stack does not need to copy this in MVP, but should be aware that experienced buyers will compare lifetime discount expectations.

### Channels and mechanics

- **Reorder reminders (email/SMS):** Consumption-estimated reminders sent 5-7 days before a regular buyer is likely to run out. Opt-in at checkout. This is a free convenience feature, not a paid tier.
- **"My Staples" saved list:** One-tap reorder from saved products. Account feature. Available on mobile web.
- **Coach account retention:** Coaches retain if the service is reliable. Stock availability, delivery speed, and pricing are primary drivers. Account dashboard showing client order history is the retention tool.
- **Stock alert:** "Notify me when back in stock" for out-of-stock products. Captures intent and brings buyers back.
- **Order history + repeat order:** Persistent order history with a single "repeat order" action.

### Key hypotheses

1. For regulars, the single biggest retention lever is never being out of stock on staple products. Stock reliability beats any feature.
2. Coaches who place a second order within 30 days have a retention rate over 80% at 6 months - the second order is the critical moment.
3. Consumption-based email reminders have a higher open and conversion rate than promotional emails because they are contextually relevant.

### What is unknown

- Actual consumption cycles for common Ukrainian supplement buyers
- Whether Ukrainian buyers prefer SMS or email for reorder reminders
- How much stock unreliability is a real problem with current UA stores

### Primary metric

30-day repeat purchase rate. Target (hypothesis): 35% of first-time buyers make a second purchase within 30 days [?].

### MVP decision

Reorder is a FREE convenience feature in MVP. Ship order history with one-tap repeat + opt-in email reminder at checkout. SMS is a phase-2 addition. Do not build a subscription tier in MVP.

---

## Revenue

### What new competitor findings change

- **GymBeam's B2B model sets a floor for coach pricing expectations.** Coaches already know that bulk buying yields discounts. Stack's coach pricing must be competitive with GymBeam B2B. The differentiation is the tool (client management), not the price alone.
- **Vansiton ISO 22000:2005 and own-brand manufacturing.** Vansiton competes on quality + price for own-brand products. Stack (as a multi-brand store) competes on curation, guidance, and coach tools - not on lowest price.
- **No UA sport nutrition store has upsell on quiz results.** This is a unique revenue mechanic Stack can introduce.

### Channels and mechanics

- **Margin on product sales:** Core revenue. Standard e-commerce. Pricing must be competitive with Ukrainian market while sustaining margin.
- **Coach/bulk pricing tier:** A coach account with slightly better pricing (5-10% discount or rebate on volume) is a revenue acquisition tool. The incremental volume from a coach account offsets the margin reduction.
- **Upsell on quiz results:** Quiz outputs a primary product set plus 1-2 complementary products. Shown as optional additions.
- **Bundle pricing:** Pre-built goal bundles priced at a slight discount vs. individual items. Increases AOV while helping the buyer.

### Key hypotheses

1. Coach accounts will have a 3-5x higher average order value than individual buyer accounts.
2. Upselling on quiz results will be more effective than generic "related products" because the recommendations are contextually tied to the stated goal.
3. Bundle pricing will increase AOV for beginners by reducing paralysis of individual product selection.

### What is unknown

- Actual margin structure on Ukrainian sport nutrition
- Whether Ukrainian buyers are receptive to upsells on first visit
- Competitive price points for common products vs. GymBeam and belok.ua

### Primary metric

GMV and average order value (AOV) per segment. Targets (hypotheses): AOV 1,200-2,000 UAH for individual buyers; 4,000-12,000 UAH for coach orders [?].

### MVP decision

Ship coach pricing tier from launch. Even a simple coach code for a fixed discount signals the channel is valued. Do not wait for a full loyalty system.

---

## Referral

### What new competitor findings change

- **GymBeam has a referral-like B2B program where wholesalers resell.** This is structurally different from a coach-to-athlete referral. GymBeam's B2B partners are retailers; Stack's referrers are coaches who trust their athletes to the store. The trust mechanism is different and more personal.
- **Huel's "Give 25% Get 25%" referral in primary nav** is the best-in-class aspirational reference. Stack does not need to match this in MVP, but it shows the referral mechanic can be prominent, not buried.

### Channels and mechanics

- **Coach to athletes (organic):** The most natural referral mechanic. A coach recommends Stack to athletes. No incentive required if the product is good.
- **Coach referral program:** A coach earns a rebate or credit for each new buyer who places a first order through their referral link. Low CAC because the referred buyer arrives with high intent.
- **"Referred by your coach" entry flow:** When a buyer arrives via a coach's referral link, the store shows "Your coach [Name] uses Stack for their athletes. Welcome." Converts the referral into immediate trust.
- **Social sharing of goal results:** Optional share card after quiz completion or first purchase.

### Key hypotheses

1. The coach referral mechanic will produce the lowest CAC of any acquisition channel because referred buyers arrive pre-trusted.
2. Organic coach-to-athlete referral will happen naturally without a formal program if the coach ordering experience is excellent.
3. Social sharing of goal results will have low uptake unless the share card is visually compelling.

### What is unknown

- Whether Ukrainian coaches are comfortable with a formal referral program or prefer informal recommendations
- Optimal referral incentive (cash rebate vs. store credit vs. discount)
- Whether buyers referred by a coach have higher LTV

### Primary metric

Percentage of new accounts from coach referral. Target (hypothesis): 20% of new accounts from coach referral within 6 months [?].

### MVP decision

Ship coach referral links in phase 2, after coach accounts are stable and validated. In MVP, focus on excellent coach experience first. Organic word-of-mouth is the MVP referral strategy.

---

## Summary Metrics Table

| Stage | Primary Metric | Target (hypothesis) | MVP Decision |
|-------|---------------|--------------------|-----------------------|
| Acquisition | New coach accounts / month | 10 by month 3 [?] | Dedicated "For Coaches" landing page from day 1, differentiating from GymBeam B2B |
| Activation | Quiz completion rate | 40% quiz; 60% coach first order in 7 days [?] | Goal quiz is required MVP feature - ship before catalog breadth |
| Retention | 30-day repeat purchase rate | 35% [?] | Email reorder reminder (free convenience); no subscription in MVP |
| Revenue | GMV; AOV by segment | 1,200-2,000 UAH individual; 4,000-12,000 UAH coach [?] | Coach pricing tier from launch; even a simple discount code |
| Referral | % new accounts from referral | 20% within 6 months [?] | Organic word-of-mouth in MVP; formal referral links in phase 2 |

All targets marked [?] are hypotheses pending market validation.

---

## Key Takeaways

1. **The coach channel is the acquisition wedge - but the pitch must be specific.** GymBeam B2B and vansiton.ua Coach Account both exist. Stack's pitch to coaches is: multi-client cart, saved client profiles, and a community identity. Not just better pricing or easier sign-up.
2. **Activation is where this product wins or loses.** The goal quiz is the activation engine for beginners. For coaches, the first multi-client order is the activation event. Both must happen within the session, not after a callback.
3. **Retention for regulars is a reliability problem, not a loyalty program problem.** Stock availability, consistent pricing, and fast reorder matter more than points or tiers.
4. **The referral flywheel depends on coach experience quality.** If coaches love the ordering experience, the referral mechanic is nearly free. Formal program comes after experience is validated.
