---
name: ux-ui-agent-skills
description: Comprehensive expert UX/UI design system skill suite including design-tokens, design-component, design-code, design-review, a11y-audit, apply-aesthetic, redesign, migrate-design-system, prototype, and ux-writing.
---

# UX/UI Expert Agent Skills

Refer to the complete repository in [ux-ui-agent-skills](file:///Users/divyansh/Documents/GitHub/Frontend%20Pipeline/skills/ux-ui-agent-skills).

## Available Command Skills
- `/design-tokens`: Generate / extend / validate DTCG tokens, palettes, multi-brand theming
- `/design-component`: Spec a component (anatomy, variants, 8 states, a11y)
- `/design-code`: Generate code for any framework via the Adapter Protocol
- `/design-review`: Score a design (6 dimensions + Nielsen) with a findings table
- `/a11y-audit`: WCAG 2.2 audit + contrast checks
- `/apply-aesthetic`: Apply an archetype or one of 138 design systems
- `/redesign`: Audit-first upgrade of an existing UI without breaking it
- `/migrate-design-system`: Map to/from Material 3, Apple HIG, shadcn, Radix, etc.
- `/prototype`: Move up the fidelity ladder + plan usability testing
- `/ux-writing`: Write/review buttons, errors, empty states, microcopy

## Verification Protocol & Quality Gates
1. Zero emoji in generated UI code/text.
2. Measure contrast ratios with automated scripts (`contrast.py`, `verify_states.mjs`).
3. Verification across all 8 component states (default, hover, focus, active, disabled, loading, error, success).
4. Responsive overflow verification down to 280px viewports.
