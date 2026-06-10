# AARRR Model

**Version:** v1 - pre-research hypotheses
**Product:** Stack - mobile-first sport nutrition store, Ukraine

---

## Acquisition

### Channels and mechanics

- **Coach outreach (direct):** Personal outreach to gym owners and coaches via Instagram DMs, fitness industry Facebook groups, and direct contact at gyms. One coach = potentially 10-30+ active buyers.
- **Organic search (SEO):** Goal-based landing pages targeting Ukrainian search terms: "протеїн для схуднення," "які спортивні добавки купити початківцю," "спортивне харчування для набору маси." Low competition in UA compared to global.
- **Social content (TikTok/Instagram Reels):** Short-form video content from coaches explaining how they use Stack to manage athlete orders. Educational content on product composition and goal matching.
- **Referral from coaches to athletes:** Coach recommends Stack to their clients as the approved store. Athletes arrive with pre-existing trust ("my coach uses this").
- **Paid social:** Meta ads targeting interest in fitness, sport, gym. Broad awareness at launch, narrowed to lookalike once first-party data exists.

### Key hypotheses

1. The coach channel has a significantly higher conversion rate than cold traffic, because the buyer arrives with prior trust from their coach's recommendation.
2. Goal-based SEO landing pages will outperform category pages for beginner acquisition because they match the actual search intent (goal, not product category).
3. Coach outreach is the highest-leverage acquisition tactic at launch because one converted coach unlocks multiple buyers with minimal marginal cost.

### What is unknown

- Actual CAC for coach channel vs. paid social
- Whether Ukrainian gym coaches are reachable via digital channels or primarily through in-person/word-of-mouth
- Competition level for goal-based Ukrainian search terms

### Primary metric

- New coach accounts per month
- Target (hypothesis): 10 new coach accounts per month by month 3

### MVP product decision

Build a dedicated "For Coaches" landing page and sign-up flow from day one. Do not treat coaches as power users of the standard flow - they need their own entry point.

---

## Activation

### Channels and mechanics

- **Goal quiz for beginners:** 3-5 question quiz (goal, experience level, constraints) with immediate personalized product results. No account required. This is the activation moment for the beginner segment.
- **Coach account onboarding:** Streamlined setup of a coach account with ability to add client profiles and build the first multi-client order. The activation event is completing the first order for a client.
- **Product page trust signals:** Composition breakdown, dosage guide, origin and certification visible above the fold. A beginner who lands on a product page and understands it has been activated.
- **"My first stack" bundle:** Pre-built goal bundles (e.g., "Starter fat loss stack," "Starter muscle gain stack") that reduce the decision to one click.

### Key hypotheses

1. The goal quiz will be the primary activation lever for beginners - users who complete it have a 3x higher likelihood of purchasing than those who browse cold.
2. For coaches, activation happens at first multi-client order, not at account creation. The gap between registration and first order is the key friction point.
3. Trust signals (composition, origin, certification) on product pages will reduce bounce rate among beginners more than price or reviews alone.

### What is unknown

- Actual quiz completion rate without seeing a tested version
- Which specific trust signals matter most to Ukrainian buyers (certification? coach recommendation? lab test? local brand vs. import?)
- Whether pre-built bundles or custom guidance performs better for beginners

### Primary metric

- Guided quiz completion rate (beginners); first order completion rate (coaches)
- Target (hypothesis): 40% quiz completion; 60% of registered coaches complete first order within 7 days

### MVP product decision

The goal quiz is a required MVP feature, not a nice-to-have. Ship it before investing heavily in catalog breadth.

---

## Retention

### Channels and mechanics

- **Reorder reminders (email/SMS):** Estimated consumption-based reminders sent 5-7 days before a regular buyer is likely to run out. Opt-in at checkout.
- **"My staples" saved list:** Account feature. One-tap reorder from saved products. Available on mobile web.
- **Coach account retention:** Coaches retain by default if the service is reliable - stock availability, delivery speed, and pricing are the primary drivers. Account dashboard showing client order history is a retention tool.
- **Stock alert:** "Notify me when back in stock" for out-of-stock products. Captures intent and brings buyers back.
- **Order history + repeat order:** Persistent order history with a single "repeat order" action.

### Key hypotheses

1. For regulars, the single biggest retention lever is never being out of stock on their staple products. Stock reliability beats any feature.
2. Coaches who place a second order within 30 days have a retention rate of over 80% at 6 months - the second order is the critical moment.
3. Consumption-based email reminders will have a higher open and conversion rate than promotional emails because they are contextually relevant to the buyer's actual need.

### What is unknown

- Actual consumption cycles for common Ukrainian supplement buyers
- Whether Ukrainian buyers prefer SMS or email for reorder reminders
- How much stock unreliability is a problem with current UA sport nutrition stores (potential differentiation)

### Primary metric

- 30-day repeat purchase rate
- Target (hypothesis): 35% of first-time buyers make a second purchase within 30 days

### MVP product decision

Reorder is a free convenience feature in MVP. Ship order history with one-tap repeat, plus an opt-in email reminder at checkout. SMS is a phase-2 addition.

---

## Revenue

### Channels and mechanics

- **Margin on product sales:** Core revenue. Standard e-commerce. Pricing must be competitive with Ukrainian market while sustaining margin.
- **Coach/bulk pricing tier:** A coach account with slightly better pricing (5-10% discount or rebate on volume) is a revenue acquisition tool, not a cost. The incremental volume from a coach account more than offsets the margin reduction.
- **Upsell on quiz results:** Quiz outputs a primary product set plus 1-2 complementary products ("most buyers also add X for better results"). Shown as optional additions, not hard sell.
- **Bundle pricing:** Pre-built goal bundles priced at a slight discount vs. individual items. Increases AOV while helping the buyer.

### Key hypotheses

1. Coach accounts will have a 3-5x higher average order value than individual buyer accounts, making them disproportionately valuable to revenue even at a slight discount.
2. Upselling on quiz results will be more effective than generic "related products" because the recommendations are contextually tied to the stated goal.
3. Bundle pricing will increase AOV for beginners by reducing the paralysis of individual product selection.

### What is unknown

- Actual margin structure on Ukrainian sport nutrition (how much room is there for coach discounts?)
- Whether Ukrainian buyers are receptive to upsells on first visit or find it intrusive
- Competitive price points for common products (whey, creatine, BCAA) in the UA market

### Primary metric

- GMV; average order value (AOV) per segment
- Target (hypothesis): AOV 1,200-2,000 UAH for individual buyers; 4,000-12,000 UAH for coach orders [hypothesis, requires market validation]

### MVP product decision

Ship coach pricing tier from launch. Even a simple "coach code" for a fixed discount is better than nothing - it signals the channel is valued.

---

## Referral

### Channels and mechanics

- **Coach to athletes (organic):** The most natural referral mechanic. A coach recommends Stack to their athletes. No incentive required if the product is good.
- **Coach referral program:** A structured program where a coach earns a rebate or credit for each new buyer who places a first order through their referral link or code. Low cost per acquisition because the referred buyer arrives with high intent.
- **Social sharing of goal results:** After quiz completion or first purchase, an optional "share my goal" card for social - simple, not forced.
- **"Referred by your coach" entry flow:** When a buyer arrives via a coach's referral link, the store shows "Your coach [Name] uses Stack for their athletes. Welcome." - converts the referral into immediate trust.

### Key hypotheses

1. The coach referral mechanic (coach earns rebate per referred buyer) will produce the lowest CAC of any acquisition channel because referred buyers arrive pre-trusted.
2. Organic coach-to-athlete referral will happen naturally without a formal program if the ordering experience for coaches is good enough to generate word of mouth.
3. Social sharing of goal/results will have low uptake unless the share card is visually compelling and requires minimal effort.

### What is unknown

- Whether Ukrainian coaches are comfortable with a formal referral program or prefer informal recommendations
- Optimal referral incentive structure (cash rebate vs. store credit vs. discount)
- Whether buyers referred by a coach have higher LTV than other channels

### Primary metric

- % of new accounts from referral; viral coefficient
- Target (hypothesis): 20% of new accounts from coach referral within 6 months [hypothesis]

### MVP product decision

Ship coach referral links in phase 2 (after coach accounts are stable). In MVP, focus on organic word-of-mouth by making the coach experience excellent.

---

## Summary Metrics Table

| Stage | Primary Metric | Target (hypothesis) | Secondary Metric |
|-------|---------------|--------------------|--------------------|
| Acquisition | New coach accounts / month | 10 by month 3 [?] | Organic traffic from goal-based pages |
| Activation | Quiz completion rate; coach first-order rate | 40% quiz; 60% coach first order in 7 days [?] | Time to first purchase |
| Retention | 30-day repeat purchase rate | 35% [?] | Coach accounts active at 90 days |
| Revenue | GMV; AOV by segment | AOV 1,200-2,000 UAH (individual); 4,000-12,000 UAH (coach) [?] | Gross margin % |
| Referral | % new accounts from referral | 20% within 6 months [?] | Viral coefficient |

All targets marked [?] are hypotheses pending market research and early user interviews.

---

## Key Takeaways

1. **The coach channel is the acquisition wedge.** One coach conversion unlocks multiple buyers. Prioritize coach-specific landing pages, onboarding, and pricing from launch.
2. **Activation is where this product wins or loses.** A beginner who doesn't understand the catalog leaves. The goal quiz is not a nice feature - it is the activation engine.
3. **Retention for regulars is a reliability problem, not a loyalty program problem.** Stock availability, consistent pricing, and fast reorder matter more than points or tiers.
4. **The referral flywheel depends on coach experience quality.** If coaches love the ordering experience, the referral mechanic is nearly free. If they don't, no formal program will fix it.

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-06-10 | Initial pre-research hypotheses. All targets marked [?]. To be validated. |
