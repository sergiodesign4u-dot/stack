# Stack

A mobile-first sport nutrition store for the Ukrainian market, built around coaches and gyms who order for their athletes. Turns a confusing catalog into a clear, trusted path from a person's goal to the right products.

**Live research pages** (now served from `/research/`):
- https://sergiodesign4u-dot.github.io/stack/research/research.html
- https://sergiodesign4u-dot.github.io/stack/research/personas.html
- https://sergiodesign4u-dot.github.io/stack/research/jtbd.html
- https://sergiodesign4u-dot.github.io/stack/research/ia.html

---

## Project Status

| Phase | Status |
|-------|--------|
| Research | Done (competitive analysis, benchmark, UX patterns, personas, JTBD, product decisions locked) |
| Wireframes | Not started (IA prep done: sitemap, 5 user flows, traceability matrix - see ia.html) |
| Concept | Not started |
| Design System | Not started |
| Components | Not started |
| Handoff | Not started |

---

## Repository Structure

```
research/           - Research phase: visual HTML pages + source docs
research/*.html     - Live visual pages (research, personas, jtbd, ia)
research/docs/      - SOURCE OF TRUTH: all research markdown (analysis, benchmarks, UX patterns, personas, JTBD, IA sitemap & flows, strategy)
research/screens/   - Screenshots captured during research
wireframes/         - Low-fidelity wireframes
concept/            - Visual concept and direction
tokens/             - Design tokens
components/         - Component library
design-system/      - Design system documentation
handoff/            - Developer handoff files
```

**Source of truth:** all research markdown lives in `research/docs/`. The `research/*.html` files are the rendered, Ukrainian-language visual summaries of those docs.

**Information architecture (Phase 2 prep, docs in `research/docs/`):**
- `research/docs/sitemap.md` - IA: product entities, screens grouped in 5 clusters (A-E), navigation model, and the traceability matrix (jobs to screens, zero defects after two critique rounds)
- `research/docs/flows.md` - 5 user flows as Mermaid diagrams: Main (coach multi-client order), Job 2 (beginner goal-to-product), Job 3 (safety verification), Job 4 (one-tap reorder), Job 6 (loyalty review)
- Live visual summary: https://sergiodesign4u-dot.github.io/stack/research/ia.html

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
- [IA: Sitemap](research/docs/sitemap.md) and [IA: User Flows](research/docs/flows.md) - [Live page](https://sergiodesign4u-dot.github.io/stack/research/ia.html)
