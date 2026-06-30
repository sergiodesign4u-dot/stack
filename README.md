# Stack

A mobile-first sport nutrition store for the Ukrainian market, built around coaches and gyms who order for their athletes. Turns a confusing catalog into a clear, trusted path from a person's goal to the right products.

**Live pages** — research phase (`/research/`) and detailed IA (`/ia/`):
- https://sergiodesign4u-dot.github.io/stack/research/research.html
- https://sergiodesign4u-dot.github.io/stack/research/personas.html
- https://sergiodesign4u-dot.github.io/stack/research/jtbd.html
- https://sergiodesign4u-dot.github.io/stack/research/concept.html — Conceptual architecture (was `ia.html`: jobs/persona-driven clusters, flows, traceability)
- https://sergiodesign4u-dot.github.io/stack/ia/sitemap.html — Information architecture: full sitemap
- https://sergiodesign4u-dot.github.io/stack/ia/navigation.html — Information architecture: Navigation (header + mobile tabs)
- https://sergiodesign4u-dot.github.io/stack/ia/footer.html — Information architecture: Footer (trust strip + columns + SEO block)
- https://sergiodesign4u-dot.github.io/stack/ia/home.html — Information architecture: Home (goal-selector hero + front doors)
- https://sergiodesign4u-dot.github.io/stack/ia/quiz.html — Information architecture: Quiz (goal-guide dialog, post-launch)
- https://sergiodesign4u-dot.github.io/stack/ia/catalog.html — Information architecture: Catalog structure (store taxonomy)
- https://sergiodesign4u-dot.github.io/stack/ia/catalog-page.html — Information architecture: Catalog (hub / landing, node 2.0)
- https://sergiodesign4u-dot.github.io/stack/ia/category.html — Information architecture: Category / product listing (PLP; shared listing template)
- https://sergiodesign4u-dot.github.io/stack/ia/product.html — Information architecture: Product detail / PDP (node 3.0; trust block + reviews/questions/related; conversion target)
- https://sergiodesign4u-dot.github.io/stack/ia/category-matrix.html — Information architecture: Category content matrix (populates all categories)
- https://sergiodesign4u-dot.github.io/stack/ia/seo.html — Information architecture: SEO methodology & keyword reference (project engine)

---

## Project Status

| Phase | Status |
|-------|--------|
| Research | Done (competitive analysis, benchmark, UX patterns, personas, JTBD, product decisions locked) |
| Wireframes | Not started. Conceptual IA done (`research/concept.html`); detailed page-level IA in progress (`ia/` — sitemap + per-page specs, starting with Header) |
| Concept | Not started |
| Design System | Not started |
| Components | Not started |
| Handoff | Not started |

---

## Repository Structure

```
research/           - Research phase: visual HTML pages + source docs
research/*.html     - Live visual pages (research, personas, jtbd, concept)
research/docs/      - SOURCE OF TRUTH: all research markdown (analysis, benchmarks, UX patterns, personas, JTBD, conceptual IA sitemap & flows, strategy)
research/screens/   - Screenshots captured during research
ia/                 - Detailed page-level IA (Phase 2 prep)
ia/*.html           - Live visual pages (sitemap, header, …)
ia/docs/            - SOURCE OF TRUTH for page-level IA (sitemap.md + pages/*.md)
playbook/           - Reusable, project-agnostic design/IA process playbook
wireframes/         - Low-fidelity wireframes
concept/            - Visual concept and direction
tokens/             - Design tokens
components/         - Component library
design-system/      - Design system documentation
handoff/            - Developer handoff files
```

**Source of truth:** all research markdown lives in `research/docs/`. The `research/*.html` files are the rendered, Ukrainian-language visual summaries of those docs.

**Conceptual architecture (jobs/persona-driven; docs in `research/docs/`):**
- `research/docs/sitemap.md` - product entities, screens grouped in 5 clusters (A-E), navigation model, traceability matrix (jobs to screens, zero defects after two critique rounds)
- `research/docs/flows.md` - 5 user flows as Mermaid diagrams: Main (coach multi-client order), Job 2 (beginner goal-to-product), Job 3 (safety verification), Job 4 (one-tap reorder), Job 6 (loyalty review)
- Live visual summary: https://sergiodesign4u-dot.github.io/stack/research/concept.html

**Detailed information architecture (page-level, Phase 2 prep; docs in `ia/docs/`):**
- `ia/docs/sitemap.md` - full sitemap (structural index; `ia/sitemap.html` is canonical visual)
- `ia/docs/pages/*.md` - per-page IA specs (source of truth): `navigation.md` (header + tabs), `footer.md` (footer + SEO block), `home.md` (home page), `catalog.md` (store taxonomy / structure), `catalog-page.md` (catalog hub, node 2.0), `category.md` (category / product listing — shared listing template), `product.md` (product detail / PDP, node 3.0 + 3.1/3.2/3.3), `category-matrix.md` (content matrix populating all categories), `seo.md` (SEO methodology & keyword engine), `quiz.md` (goal-guide quiz, post-launch)
- Live visual: https://sergiodesign4u-dot.github.io/stack/ia/sitemap.html · https://sergiodesign4u-dot.github.io/stack/ia/navigation.html · https://sergiodesign4u-dot.github.io/stack/ia/footer.html · https://sergiodesign4u-dot.github.io/stack/ia/home.html · https://sergiodesign4u-dot.github.io/stack/ia/catalog.html

---

## Key Documents

- [CLAUDE.md](CLAUDE.md) - Product brief, JTBD, audience, MVP scope, design principles
- [Research: Strategy](research/docs/strategy.md) (migrated from product-model.md)
- [Research: AARRR Model](research/docs/aarrr.md)
- [Research: Competitive Analysis](research/docs/competitive-analysis.md)
- [Research: Benchmark](research/docs/benchmark.md)
- [Research: UX Patterns](research/docs/ux-patterns.md)
- [Research: Master Synthesis](research/docs/master-research.md)
- [Research: Personas](research/docs/personas.md) - [Live page](https://sergiodesign4u-dot.github.io/stack/research/personas.html)
- [Research: JTBD](research/docs/jtbd.md) - [Live page](https://sergiodesign4u-dot.github.io/stack/research/jtbd.html)
- [Conceptual IA: Sitemap](research/docs/sitemap.md) and [User Flows](research/docs/flows.md) - [Live page](https://sergiodesign4u-dot.github.io/stack/research/concept.html)
- [Detailed IA: Sitemap](ia/docs/sitemap.md), [Navigation spec](ia/docs/pages/navigation.md), [Footer spec](ia/docs/pages/footer.md), [Home spec](ia/docs/pages/home.md), [Catalog taxonomy](ia/docs/pages/catalog.md), [Category/listing spec](ia/docs/pages/category.md) - [Live: sitemap](https://sergiodesign4u-dot.github.io/stack/ia/sitemap.html) · [navigation](https://sergiodesign4u-dot.github.io/stack/ia/navigation.html) · [footer](https://sergiodesign4u-dot.github.io/stack/ia/footer.html) · [home](https://sergiodesign4u-dot.github.io/stack/ia/home.html) · [catalog](https://sergiodesign4u-dot.github.io/stack/ia/catalog.html) · [category](https://sergiodesign4u-dot.github.io/stack/ia/category.html)
- [Design & IA Playbook](playbook/design-ia-playbook.md) - reusable methodology
