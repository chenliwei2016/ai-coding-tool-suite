---
name: test-design
description: "Use when designing a testing set from a requirement or a scope of changes, covering equivalence, boundaries, states and orthogonal combinations. Front-load keywords: design test cases, test set, test plan, equivalence classes, boundary values, case design, test design, test case, coverage."
---

# Test Design

Starting from a requirement or a scope of changes, design a systematic test set that ensures positive, negative, boundary, and combination paths are all covered — not just a handful of off-the-cuff cases.

## When to Use (when)

- Have a requirement or a batch of changes and need to start designing what to test
- Reviewing whether someone else's cases have complete coverage
- Confirming the test scope has no gaps before a release

## Inputs (what to bring in)

- Requirement/change description, plus the affected functional domains and APIs
- Known boundary values, states, and constraints (max/min, empty, oversized, concurrency, …)

## Core Steps (process)

1. **List the scope**: enumerate all the feature points, APIs, and changed surfaces for this round
2. **Partition equivalence classes**: split inputs into equivalence classes, testing one representative of each
3. **Boundary values**: focus on the neighbors of the boundary (upper, lower, inside, outside)
4. **States and interactions**: cover business state transitions and dependency relationships
5. **Orthogonal/combination**: deduplicate multi-parameter combinations with orthogonal arrays to avoid a combination explosion
6. **Positive, negative, and boundary all covered**: normal path + exception/failure path + boundary each have their own cases

## Review / Self-Check Checklist

- [ ] Is every feature point in the scope covered?
- [ ] Are equivalence classes, boundary values, states, and combinations all considered, not just the happy path?
- [ ] Are exception/failure/extreme-input "negative" paths covered?
- [ ] Were easily overlooked areas like cross-feature interactions and race conditions missed?

## Common Pitfalls

- ❌ Testing only the happy path, leaving boundaries and exceptions to luck
- ❌ Listing cases by feel, with no idea why each is chosen or where its coverage lies
- ❌ Filling in parameter combinations by hand, which either explodes or leaves gaps
- ❌ Treating "how many cases" as a KPI while actual coverage is hollow

## Artifacts

- An executable test set that covers the system systematically, where the rationale for each type of case is clear