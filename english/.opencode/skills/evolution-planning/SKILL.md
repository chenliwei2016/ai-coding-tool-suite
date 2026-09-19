---
name: evolution-planning
description: "Use when designing long-term evolvable and replaceable structures, planning refactoring, migrations, or a technology renewal roadmap. Front-load keywords: evolution planning, refactoring, evolution roadmap, migration, technology evolution, long-term structure, refactor, evolution, roadmap, incremental migration."
---

# Evolution Planning

Design long-term structures that are **evolvable and replaceable**, and plan incremental migration rather than a one-time rewrite.

## When to use (when)

- The system must be maintained long-term and you worry about being unable to change it in the future
- You are planning a refactor, migration, or framework/language-version upgrade
- You face the gradual path between "historical baggage" and an "ideal architecture"
- You are preparing the groundwork for replaceability (swapping components/downstream dependencies/storage)

## Input (what to bring in)

- Current state and historical baggage (which are historical decisions that cannot be changed)
- The target structure and desired direction
- Constraints: manpower, cost, compatibility, and the ability to roll back at any time

## Core steps (process)

1. **Respect historical baggage**: First identify which irreversible historical decisions exist, and avoid tearing them down and starting over
2. **Design an evolvable structure**: Make the new structure cheap to replace later (stable interfaces, dependency inversion, anti-corruption layers)
3. **Migrate incrementally**: Advance in small, rollback-able, verifiable steps rather than one-time rewrites
4. **Keep a window open**: During the migration, let the old and new coexist and provide a transition and fallback path
5. **Consolidate a roadmap**: Phased goals, each step verifiable, with clear completion criteria

## Review/self-check checklist

- [ ] Is the new structure cheaper to replace/evolve than the current one?
- [ ] Did you respect irreversible historical decisions instead of blindly tearing them down?
- [ ] Is the migration **phased, rollback-able, and verifiable**?
- [ ] Did you provide transition-period compatibility and a fallback path?

## Common pitfalls

- ❌ Trying to rewrite everything at once, ignoring historical baggage and risk
- ❌ Building only the new structure without leaving a transition and rollback path for old/new coexistence — no way out when something fails
- ❌ No phasing or acceptance criteria → the migration becomes a bottomless pit
- ❌ Focusing only on the "future ideal" while neglecting the business you must ship today

## Outputs

- Evolution goals + phased roadmap + transition/rollback plan + acceptance criteria for each step