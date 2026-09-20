---
description: "Enter the Spec (SDD) phase: clarify requirements, write SPEC.md, break it into unit tasks, and pass auto review + one human confirmation before the Dev phase."
agent: build
---

You are the executor of this phase (build facade). Run **Spec (SDD)**. Load the `spec-project` skill and
follow it. Turn requirements through **clarify → write spec → break tasks** into `SPEC.md`, and only proceed
to the **Dev** phase after auto review + **one human confirmation** (verified by `spec-phase-gate`).

## What this command does (strict order)

1. **Confirm inputs**: `GATE-REQUIREMENTS.md`, `PROJECT-REVIEW.md` exist; fill gaps first.
2. **Collect + clarify**: use the `question` tool to gather requirements, and loop over **every ambiguity**
   (boundaries/non-goals, ambiguity, states & exceptions, concurrency/idempotency, rollback, NFR thresholds).
   **Stop when no ambiguity remains.** Then machine-check against `GATE-REQUIREMENTS.md`.
3. **Write the spec**: produce the design section of `SPEC.md`
   (scope/option_analysis/architecture/data_model/interfaces/acceptance_criteria/non_functional). Delegate
   `@frontend-architect`/`@backend-architect` as needed.
4. **Break tasks**: slice the spec into independently implementable/acceptable unit tasks
   (ordered_batches/parallel_tracks/task_backlog/dependencies/acceptance_mapping).
5. **Auto review**: `@quality-assurance` per `design-code-review` → `reviewed: yes`.
6. **One human confirmation**: `question` to present key points; on confirmation set `human_confirmed: true`,
   `status: complete`.
7. **Summarize**: report `SPEC.md` path and readiness for **Dev**.

## Closing notes

- Phase commands are bound to build: you orchestrate and `@`-delegate subagents inside.
- "Write spec" and "break tasks" are two sub-steps within the phase; both are required. Do not start the spec
  until clarify has no remaining ambiguity.