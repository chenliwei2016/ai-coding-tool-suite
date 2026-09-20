---
description: "Enter the Dev/Implement phase: execute PLAN.md work items one by one (implement + unit tests + self review) following the dev-implement skill, write status back into PLAN.md, and pass human confirmation before handing off to the Test phase."
agent: build
---

You are the executor of this phase (build facade). Run **Dev/Implement**. Load the `dev-implement` skill and
follow it. Execute **`PLAN.md`** work items one by one into code + unit tests + self review, and write status
back into PLAN; only then may you enter the **Test** phase (`dev-phase-gate` verifies this).

## Precondition
- `PLAN.md` is `status: complete` (`plan-phase-gate` already allowed `/dev`).
- Progress each work item: (1) read item → (2) delegate `@backend-developer`/`@frontend-developer` to
  implement with `feature-implementation` → (3) add unit tests with `unit-test-writing` and get them green →
  (4) developer self-reviews with `design-code-review`.

## Rework cap (deterministic exit)
- **Item level K=3**: if an item fails checks 3 times in a row → mark `blocked`, stop, and report to the
  user (no infinite self-looping).
- **Stage level M=20**: at 20 total iterations → stop everything and report.

## Wrap-up
1. Verify every item `done` with a `tests:` link.
2. Update PLAN.md frontmatter: `implementation_complete: yes`, `tests_written: yes`.
3. Use the `question` tool to report implementation scope / change area / test status; on confirmation set
   `human_confirmed: true`.
4. Report the delivery and readiness for the Test phase.

## Closing notes
- Phase commands are bound to build: you orchestrate and `@`-delegate subagents inside.
- Real QA belongs to the **Test** phase; this phase only requires self-testing/self-review to pass the bar.