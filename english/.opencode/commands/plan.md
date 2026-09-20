---
description: "Enter the Plan phase: turn the confirmed DESIGN.md into an ordered, parallelizable implementation plan, produce PLAN.md, and pass the human-confirmation gate before the Implementation phase."
agent: build
---

You are the executor of this phase (build facade). Run **Plan**. Load the `plan-project` skill and follow
it. Turn the **confirmed `DESIGN.md`** into an
**ordered, parallelizable** implementation plan and deliver `PLAN.md`. This completes the Plan phase; the
next phase (Implementation) is executed via `feature-implementation`.

Precondition: `DESIGN.md` must be `status: complete` and `human_confirmed: true` (`design-phase-gate` blocks
`/plan` otherwise — go back to the Design phase if unmet).

## What this command does (in strict order)

1. **Prepare inputs**: read `DESIGN.md` (authoritative spec) and `PROJECT-REVIEW.md` (current-state
   constraints); check `GATE-REQUIREMENTS.md` as needed for the acceptance baseline.
2. **Decompose into work items**: cut the design into **discrete, independently reviewable** tasks. Each
   holds: `id`, `title`, `owner role` (`@backend-developer` / `@frontend-developer` / `@quality-assurance`),
   `change scope` (files/modules/interfaces), `inputs & outputs`, `acceptance` (linked to `DESIGN.md`'s
   `acceptance_criteria`), and `dependencies` (explicit prerequisites).
   - Delegate `DESIGN.md`'s architecture/data-model/interfaces to `@frontend-architect`/`@backend-architect`
     as needed to confirm task granularity and parallel boundaries before writing the table.
3. **Topological order**: order by dependency (prerequisites must land first), marking the **critical path**;
   keep dependency-free work items loosely coupled and batchable.
4. **Parallelize**: group independent work items into **parallel tracks / waves**; put an **integration / acceptance
   checkpoint** at each wave boundary, so parallelism neither blocks others nor ships unverifiable outputs.
5. **Produce `PLAN.md`** (project root): frontmatter `status: draft`; body covers `ordered waves`,
   `parallel tracks`, `task list table` (id/title/owner/dependency/acceptance/status), `critical path`,
   and `risks & rollback order`.
6. **Self-check gate (soft)**: verify every design acceptance criterion maps to at least one task, task
   dependencies form no cycle, and parallel-group merge points are explicit. When all pass, set `status` to
   `complete`.
7. **Human-confirmation gate**: use the `question` tool to present the plan (parallel tracks, landing order,
   owners, critical path, risks); on confirmation set `human_confirmed` to `true`.
8. **Summarize**: report the `PLAN.md` path, number of parallel tracks and tasks, the critical path, and
   readiness for Implementation.

## Closing notes

- Phase commands are bound to build: you orchestrate and `@`-delegate subagents inside.
- Parallelism is not blind concurrency: do not parallelize without a merge/acceptance point; prefer serial
  whenever a step must be independently regressable.
- Do not discuss **Plan** until `DESIGN.md` is complete.

## Deliverable

- `PLAN.md` (ordered waves + parallel tracks + task list + acceptance mapping, `status: complete`,
  `human_confirmed: true`)