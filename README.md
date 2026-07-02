# Stack

A mobile-first sport nutrition store for the Ukrainian market, built around coaches and gyms who order for their athletes. Turns a confusing catalog into a clear, trusted path from a person's goal to the right products.

## Live pages

- **Research** — https://sergiodesign4u-dot.github.io/stack/research/research.html
- **Conceptual architecture** — https://sergiodesign4u-dot.github.io/stack/research/concept.html
- **Information architecture** — https://sergiodesign4u-dot.github.io/stack/ia/sitemap.html
- **Wireframes** (clickable prototype) — https://sergiodesign4u-dot.github.io/stack/wireframes/index.html

Each page carries a left-sidebar (docs) or prototype bar (wireframes) that navigates to every sub-page in that area — no need to list them here.

## Project status

| Phase | Status |
|-------|--------|
| Research | Done |
| Information architecture | Done — page-level specs in `ia/docs/` |
| Wireframes | In progress — greyscale clickable prototype (`wireframes/`) |
| Concept · Design system · Components · Handoff | Not started |

## Repository structure

```
research/    - Research phase: visual HTML + source docs (research/docs/ = source of truth)
ia/          - Page-level IA: visual HTML + source docs (ia/docs/ = source of truth)
wireframes/  - Greyscale clickable prototype
playbook/    - Reusable design / IA process playbooks
concept/ tokens/ components/ design-system/ handoff/  - Later phases
```

## Key documents

- [CLAUDE.md](CLAUDE.md) — product brief (JTBD, audience, MVP scope, design principles)
- Research source of truth: [`research/docs/`](research/docs/) — strategy, personas, JTBD, conceptual sitemap & flows
- IA source of truth: [`ia/docs/`](ia/docs/) — full sitemap + per-page specs in [`ia/docs/pages/`](ia/docs/pages/)
- Playbooks: [IA](playbook/design-ia-playbook.md) · [Wireframes](playbook/design-wireframes-playbook.md)
