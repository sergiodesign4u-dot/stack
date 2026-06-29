# UX Patterns

**Research date:** 2026-06-10
**Based on:** validated product model v2, competitive analysis, benchmark

---

## 1. Behavioral Patterns from the Validated Audience

These are the core behavioral patterns observed across all three segments, grounded in the competitive analysis and benchmark findings.

### Pattern 1: Goal-before-product (MOST CRITICAL - primary entry point)

Buyers do not arrive knowing what product they need. They arrive knowing what outcome they want. The most common sequence: "I want to lose weight" - not "I want CLA + L-carnitine + thermogenic." This is true for both beginners (who genuinely don't know products) and for coaches (who know products but think in client outcomes first, then translate).

**Why this is the entry point:** Every top-performing aspirational competitor (Myprotein, Huel, Bulk, Thorne) uses goal-as-navigation as the primary discovery path. Liki24 - the strongest local reference - uses symptom-as-navigation. The Ukrainian market has zero sport nutrition stores with a real interactive goal path. The entry point is the product differentiator.

**Evidence:** Myprotein 6-goal selector (https://us.myprotein.com/c/goal-selector/), Huel Choose Your Goal (https://huel.com/pages/choose-your-goal), Liki24 Symptoms category (https://liki24.com/), Bulk 4-goal homepage tiles (https://bulk.com/).

### Pattern 2: Safety verification before purchase decision

Non-expert buyers pause before adding to cart to verify safety. This pause happens at the product page and can result in leaving to search for information externally. If the store doesn't answer the safety question on the product page, the buyer leaves - and may not come back.

**Evidence:** Thorne's 4-rounds-of-testing architecture (https://www.thorne.com/nsf-certified-for-sport), Bulk's batch-level Informed Sport certification (https://www.bulk.com/uk/sports-nutrition/informed-sport). Belok.ua's empty certificates page (https://belok.ua/ua/serteficates/) is the counter-evidence: a store that recognized the need but left it unresolved.

### Pattern 3: Coach-as-intermediary (primary segment behavior)

Coaches do not shop for themselves. They shop for a list of clients, each with different goals, weights, training schedules, and budgets. The shopping session is fundamentally different: multi-person, multi-goal, potentially multi-cart. No Ukrainian store accommodates this. The closest local reference is belok.ua's wholesale form (https://belok.ua/ua/opt/), which requires a callback - not self-service.

**Implication:** The coach needs a persistent client list, not just a larger cart. The UX pattern is closer to a B2B order management tool than a standard e-commerce cart.

### Pattern 4: Repeat buying with minimal friction

Regular buyers already know exactly what they want. Every re-navigation through the catalog is friction they don't want to pay. The behavioral pattern is: land on account or saved list, confirm stock, one tap, done. This pattern is already established in adjacent categories (pharmacy reorder on Liki24, grocery apps) - buyers have been trained to expect it.

**Evidence:** Liki24 search history (https://liki24.com/), Bulk Boost subscription (https://help.bulk.com/hc/en-gb/articles/23536492662289-Bulk-Boost). Belok.ua cumulative discount is a loyalty mechanic, not a reorder mechanic - the distinction matters (https://belok.ua/ua/sistema-skidok/).

### Pattern 5: Trust built through visible professional credibility

Ukrainian buyers in particular are sensitive to "who stands behind this." Physical store presence, named experts, federation partnerships, and coach endorsements are more culturally legible trust signals than certifications or clinical trials. Belok.ua's federation partnership and named athlete sponsorships (https://belok.ua/ua/what-is-belok-ua/) outperform an empty certificates page in the local market. International certifications (NSF, Informed Sport) are a secondary trust layer once the primary "who are you" question is answered.

---

## 2. Five Fundamentally Different UX Patterns

### Pattern A: Goal Selector (Curation by Objective)

**How it works:** The store presents a small set of goals (typically 4-6) as the primary navigation entry point. Selecting a goal leads to a curated collection of products relevant to that goal. No knowledge of product names required. The collection is pre-filtered and pre-ranked.

**Where it is used:** Myprotein (6 goals: Cardio, Balanced, Stronger, Build Muscle, Lose Weight, Elite - https://us.myprotein.com/c/goal-selector/), Bulk (4 goals on homepage: Build Muscle, Health, Weight Loss, Endurance - https://bulk.com/), Huel (4 goals: Lose weight, More protein, Eat healthy, On-the-go - https://huel.com/pages/choose-your-goal).

**Goal-to-product guidance:** Excellent. The shortest path from intent to relevant products.

**Coach/multi-client case:** Partial. A coach can navigate to "Build Muscle" for one client and "Weight Loss" for another, but must do so sequentially in separate sessions. No multi-client context.

**When it fits:** When the product catalog is large and segment-based. When the primary buyer persona does not know product terminology. When goals are stable and universal (not highly personalized).

**When it breaks:** When goals are too broad (all products fit all goals), when the buyer needs to express a concern or problem rather than a fitness goal (the beginner who says "I get tired" not "I want endurance"), or when professional buyers need to manage multi-person orders.

---

### Pattern B: Guided Quiz (Personalized Recommendation Engine)

**How it works:** A short conversational quiz (3-7 questions) gathers the buyer's goal, experience level, constraints (diet, allergies), and budget. The result is a personalized, named product set or ranked recommendation list. The buyer does not browse - they are guided.

**Where it is used:** Huel ("Which Huel is right for you?" quiz - https://huel.com/pages/which-huel-survey), Thorne (Taia AI advisor at https://www.thorne.com/featured/taia - conversational AI version of the same pattern), multiple supplement brands using Octane/Octillion-style quiz platforms.

**Goal-to-product guidance:** Excellent, best-in-class for first-time buyers. Personalized results reduce abandonment.

**Coach/multi-client case:** Poor. A quiz is designed for one person answering questions about themselves. A coach managing 10 clients cannot run the quiz 10 times per session.

**When it fits:** Primary acquisition path for beginners and non-experts. Most effective for first-purchase conversion. Best paired with a goal selector for repeat visitors who already know what they need.

**When it breaks:** For returning buyers (friction, not help), for professional buyers (no multi-client context), and when the quiz is too long or asks for information the buyer does not have (body weight, training frequency).

---

### Pattern C: Symptom/Concern Navigation (Problem-First Discovery)

**How it works:** Navigation is organized around problems, concerns, or situations the buyer recognizes in their life - not product categories and not abstract fitness goals. Examples: "I get tired quickly," "I want to recover faster after training," "I lose muscle when I diet." The buyer recognizes their situation and is led to the relevant products.

**Where it is used:** Liki24 "Симптоми" navigation (https://liki24.com/) - the strongest Ukrainian example. Apteka24.ua's search-by-active-substance (a structural equivalent). Thorne's health test results and conditions navigation.

**Goal-to-product guidance:** Excellent for the sub-segment of beginners who cannot yet frame their need as a fitness goal.

**Coach/multi-client case:** Low direct utility for coaches (coaches know what products their athletes need).

**When it fits:** As a secondary discovery path for beginners who cannot relate to "Build Muscle" or "Lose Weight" as concepts. High relevance for the "I don't even know what category I am in" buyer. Ukrainian market has a proven user base for this pattern via Liki24.

**When it breaks:** For buyers who already know what they want (adds unnecessary steps), and as a primary navigation structure for a sport nutrition store (fitness goals are more natural entry points for most buyers than clinical symptom language).

---

### Pattern D: Coach Account / B2B Order Management

**How it works:** A dedicated account type for professionals. A coach creates a client list (with each client's profile: goal, weight, dietary constraints, budget). When ordering, the coach selects a client or builds an order "for client X" with pre-populated product recommendations. The cart supports multiple client contexts simultaneously or sequentially. Bulk pricing, invoice export, and order history per client are standard features.

**Where it is used:** Belok.ua's wholesale form (https://belok.ua/ua/opt/) is the rudimentary local version - form-based, requires callback. Myprotein trade accounts (listed in footer) and Thorne professional tools (https://www.thorne.com) are the aspirational references. B2B supplement platforms like Fullscript (US) and Wellevate (US) are the gold standard for practitioner-ordering but are not direct references for the Ukrainian market.

**Goal-to-product guidance:** Not directly applicable - coaches already know the products.

**Coach/multi-client case:** Excellent - this is the specific pattern designed for this use case.

**When it fits:** As the primary interface for Segment 1 (coaches, gyms, team managers). Must exist alongside the standard consumer flow, not replace it.

**When it breaks:** For consumers (overwhelming), and when the B2B tooling is so complex that it requires training. The goal is self-service within 5 minutes of registration - not an enterprise procurement tool.

---

### Pattern E: "Always in Stock" / Reorder-First Account

**How it works:** The account homepage is not an order history - it is a "My Staples" list: the buyer's regular products with stock status, estimated reorder date, and a single-tap add-to-cart. Email/SMS reminders are triggered by estimated consumption (based on purchase date and container size). The goal is to make reorder invisible - it happens before the buyer runs out, with zero navigation.

**Where it is used:** Liki24 search history (partial reference), Bulk Boost subscription (https://help.bulk.com/hc/en-gb/articles/23536492662289-Bulk-Boost), Thorne subscribe-and-save. Subscription apps (HelloFresh, Dollar Shave Club) are conceptual references for the pattern.

**Goal-to-product guidance:** Not applicable - this pattern serves buyers who already know their products.

**Coach/multi-client case:** Moderate - a coach's "staples" list could contain standing orders for their most common client types.

**When it fits:** As the default account experience for Segment 3 (regulars). In MVP: email/SMS reminder + one-tap order repeat from history. Subscription tier = open question for later phase.

**When it breaks:** For first-time buyers (no staples list yet), for buyers with irregular or goal-dependent stacks, and as a primary acquisition pattern (it only works after the first purchase).

---

## 3. Pattern Selection

### Primary Choice: Goal Selector as Entry Point + Quiz as Deeper Path

The primary UX pattern for Stack is the **Goal Selector** as the homepage entry point, with a **Guided Quiz** available for buyers who want a more personalized recommendation.

**Reason 1 (tied to JTBD):** The beginner's primary JTBD is "turn my vague goal into a safe, clear product set." The goal selector addresses this in 2 clicks. It is the shortest validated path from buyer intent to relevant products.

**Reason 2 (tied to audience):** The Ukrainian sport nutrition market has no interactive goal-to-product path (competitive analysis finding). Every competitor uses static category pages. The goal selector creates a real differentiation point that is both visible and functional.

**Reason 3 (tied to competitor gap):** Liki24 has already educated Ukrainian buyers in the "navigate by what you need, not by what the catalog is called" behavior pattern via symptom navigation. Stack can apply this pattern to sport nutrition - it is not a foreign concept to the target market.

### Alternative Under Condition X: Symptom/Concern Navigation as Secondary Path

If a buyer cannot map themselves to a fitness goal tile ("I don't want to build muscle or lose fat - I just want more energy"), the symptom/concern path is the alternative entry point. Use it as a secondary navigation option labeled "Not sure what you need?" rather than as the primary path.

**When to activate this alternative:** When A/B testing shows that goal tiles alone have a significant drop-off for the "general wellness" or "energy/recovery" sub-segment who do not identify as athletes.

### Pattern That Does NOT Fit: Subscription-First Purchase

As established in the benchmark (research/benchmark.md, Section 6), the subscription-first model used by AG1 and Thorne is not viable for the Ukrainian market at MVP stage. Ukrainian e-commerce buyers have low subscription trust due to billing complexity and limited consumer protection expectations around recurring charges. Subscription is a retention mechanic for a later phase - not a first-purchase experience.

**Why explicitly called out:** The reorder problem is real and validated. The temptation is to solve it with subscription (a proven mechanism internationally). But applying subscription as the primary reorder path in the UA market would increase bounce rate and abandonment at the purchase decision point. The correct MVP solution is email/SMS reminder + one-tap repeat order from history.

---

## Sources

- https://us.myprotein.com/c/goal-selector/
- https://huel.com/pages/choose-your-goal
- https://huel.com/pages/which-huel-survey
- https://bulk.com/
- https://www.thorne.com/featured/taia
- https://www.thorne.com/nsf-certified-for-sport
- https://liki24.com/
- https://qubstudio.com/blog/internship-ux-improvement-of-liki24/
- https://belok.ua/ua/opt/
- https://belok.ua/ua/sistema-skidok/
- https://belok.ua/ua/serteficates/
- https://belok.ua/ua/what-is-belok-ua/
- https://www.bulk.com/uk/sports-nutrition/informed-sport
- https://help.bulk.com/hc/en-gb/articles/23536492662289-Bulk-Boost
- https://drinkag1.com/
