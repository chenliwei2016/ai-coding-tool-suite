---
name: dev-implement
description: "Use when entering the implementation (development) phase: execute PLAN.md work items iteratively — implement, write unit tests, self-review — and write status back into PLAN.md; then pass the dev gate (human confirmation) before testing. Front-load keywords: implement, develop, feature implementation, unit test, self review, write code, development."
---

# Dev / Implement (Development)

Execute **`PLAN.md`** work items one by one into **code + unit tests + self-review**, and **write each
item's status back into PLAN.md**. This is a **multi-round iterative** phase: take one work item, read →
implement → unit-test → self-review → mark done; only move on when it passes. Real QA happens later in the
**Test** phase.

## When to use

- You have reached the "Dev / Implement" phase (triggered by `/dev`)
- You have a `PLAN.md` (with `implementation_complete: no`) and are about to write code
- You want steady progress with one item per closed loop, advancing only after self-review passes

## Input (what to bring in)

- `PLAN.md` (task_backlog with states, `DESIGN.md` refs, critical path)
- `DESIGN.md` / `PROJECT-REVIEW.md` (spec and current state)

## Core steps (loop over items)

For each work item:

1. **Read the item**: scope, owning role, dependencies, acceptance (linked to DESIGN's acceptance_criteria).
2. **Implement**: hand to `@backend-developer` / `@frontend-developer`; use `feature-implementation` and
   follow existing style/contracts.
3. **Write unit tests**: use `unit-test-writing` for the changed/new logic; run them to green (a red test
   counts as a rework).
4. **Self-review**: the developer runs `design-code-review`'s self-check; any unmet item → rework.
5. **Write status back**: on pass, mark the item `done` in PLAN.md with a `tests:` link (unit-test path).
   Otherwise increment `retries`.
6. **Move to the next item** until all are done.

**Rework cap (deterministic exit — no infinite loop)**:
- Item level `K=3`: if an item's checks are unmet (red tests / self-review fail) for `retries == 3`
  consecutive rounds → mark `blocked` and stop to raise it with you (scope unclear? design change needed?
  technically infeasible?) — do not keep looping on it.
- Stage level `M=20`: when total /dev auto-iterations reach 20 → stop everything, report progress, and wait
  for your call.

## Wrap-up (all items done)

1. Verify: every item `done` with a `tests:` link.
2. Update PLAN.md frontmatter: `implementation_complete: yes`, `tests_written: yes`.
3. Human confirmation: use the `question` tool to report implementation scope / change area / test status; on
   confirmation set `human_confirmed: true`.
4. Done → you may enter the **Test** phase (`dev-phase-gate` validates the fields above).

## Self-check checklist (each item + at phase end)

- [ ] Every item `done` with a `tests:` link (unit tests passing)?
- [ ] Developer self-review (design-code-review checklist) fully passed?
- [ ] Changes follow existing style/contracts (feature-implementation)?
- [ ] Any `blocked` / `retries >= 3` unresolved item?
- [ ] `implementation_complete: yes`, `tests_written: yes`, `human_confirmed: true`?

## Common pitfalls

- ❌ Starting work without reading the item/acceptance → wrong direction
- ❌ Writing code with no unit tests → `dev-phase-gate` blocks the test phase
- ❌ Treating self-review as a formality and not running tests → defects leak to testing
- ❌ Endlessly fixing one item without a cap → should `blocked` and report instead

## Output

- Implementation done + unit tests + PLAN.md items written back as `done`/`tests:`, `implementation_complete: yes`,
  `human_confirmed: true`