---
name: regression-release-gate
description: "Use before a release to decide whether it can ship: verifying changed scope is tested and nothing regressed, then giving a release-block decision. Front-load keywords: regression, release acceptance, release gate, release sign-off, ship, block, rejection, smoke test, acceptance."
---

# Regression & Release Gate

The final gate before a release: verify that the full scope of changes is tested and that nothing has regressed, then give an unambiguous **ship / block** decision. The key is "produce a decision," not "keep running more cases."

## When to use

- Acceptance checkpoint before preparing to release/deploy
- Deciding whether a version can ship
- Smoke test + regression confirmation + closing judgment

## Inputs (what to bring in)

- The actual scope of changes in this release (commit/change list)
- The test suites already run with their results, plus leftover unresolved items

## Core steps (process)

1. **Align on the changed scope** — what actually changed this time; don't rely on "it doesn't feel like much"
2. **Scope ↔ coverage check** — for each changed point, find the corresponding test/verification; anything untested is risk
3. **Smoke test the main flow** — get the core primary flow passing first, then talk regression
4. **Regression confirmation** — confirm related old features haven't degraded; test everything that could regress
5. **Triage remaining items** — among unresolved items, distinguish "safe to ship with an acknowledged defect" from "must block"
6. **Give the verdict** — state explicitly "ship / ship with conditions / block," write down the basis, and don't be ambiguous

## Review/self-check checklist

- [ ] Is the scope-coverage check actually aligned, or based on feel?
- [ ] Did you regression-test the affected old features, not just smoke the new ones?
- [ ] Are remaining items triaged, and the conditions for "ship with a known defect" written down?
- [ ] Is the conclusion a clear ship/block, or a vague "should be fine"?

## Common pitfalls

- ❌ Focusing only on new features while the old features affected by the change get no regression
- ❌ Hand-waving every leftover item with "should be fine," making the gate meaningless
- ❌ Ambiguous conclusions, so responsibility is unclear when problems surface after launch
- ❌ Treating "we ran a lot of cases" as the basis for shipping, instead of "all changes are covered"

## Output

- An evidence-based ship/block decision plus triaged leftover items, traceable and accountable