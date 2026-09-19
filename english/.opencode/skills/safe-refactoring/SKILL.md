---
name: safe-refactoring
description: "Use when refactoring existing code on a small scale to improve structure without changing behavior or breaking contracts. Front-load keywords: refactor, simplify code, extract duplication, improve structure, safe refactoring, de-duplicate. Distinct from large-scale evolution (use evolution-planning)."
---

# Safe Refactoring

Improve existing code at a small scale: cleaner structure, extraction of duplication, better readability, while **preserving behavior equivalence and not breaking contracts**. This is day-to-day tactical refactoring; for macro long-term evolvable design, use `evolution-planning`.

## When to Use

- Existing code that is copy-pasted in many places, messy in structure, or misleadingly named
- You want to tidy up a local area while implementing a feature
- A hard-to-maintain trouble spot that needs to be refactored without changing behavior

## Inputs (What to Bring In)

- The code to refactor + who calls it (contracts / dependency surface)
- Confirmation that "behavior must stay unchanged"

## Core Steps (Process)

1. **Define the boundary first**: confirm where this code is called from, what the contract is, and don't let the change spill into unrelated areas.
2. **Extract duplication, nothing more**: hoist shared code, delete dead code, but don't casually "modernize" (keep the repo's style).
3. **Keep behavior equivalent**: small changes with small verifications; logical behavior must not change.
4. **Commit in small incremental steps**: one refactor per commit, keeping diffs controllable and traceable.
5. **Run regression**: rely on tests to confirm behavior isn't broken, and add tests as a safety net when needed.

## Review / Self-Check Checklist

- [ ] Is the behavior truly equivalent? Did I quietly change a boundary or an edge-case behavior?
- [ ] Is the change confined to the contract within this scope, without affecting unrelated callers?
- [ ] Does the style match the surroundings, with no "opportunistic modernization" smuggled in?
- [ ] Did the regression tests run?

## Common Pitfalls

- ✗ Silently changing behavior during a refactor, hiding the bug inside the "refactor" commit
- ✗ Losing control of scope, growing the change larger and dragging in unrelated code
- ✗ Introducing a new style/dependency under the cover of refactoring (a red-line zone)
- ✗ Mixing several unrelated refactors into one commit, making the diff large and hard to trace

## Deliverable

- Code with clearer structure, unchanged behavior, intact contracts, and regression coverage

## Related

- Macro evolution / large refactor → use `evolution-planning`