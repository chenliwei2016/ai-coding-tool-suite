---
name: plan-project
description: "Use when entering the plan phase: turn the confirmed DESIGN.md into an ordered, parallelizable implementation plan (PLAN.md) with waves, tracks, and an acceptance mapping, then pass auto + human review before implementation. Front-load keywords: plan, schedule, task breakdown, parallel, sequencing, critical path."
---

# Plan Project (Plan)

Turn the **confirmed `DESIGN.md`** into an **ordered, parallelizable implementation plan** `PLAN.md`:
topologically sort by dependency, group into parallel tracks/waves, mark the critical path and
rollback order, and pass **self-check + auto review + human confirmation** before the Implementation phase.

## When to use

- You have reached the "Plan" phase (triggered by `/plan`)
- You have a confirmed spec and need an executable implementation order
- You want to make explicit: what first, what can run in parallel, who owns what, and how to accept it

## Input (what to bring in)

- `DESIGN.md` (authoritative spec, `status: complete`)
- `PROJECT-REVIEW.md` (current-state constraints)
- `GATE_REQUIREMENTS.md` (acceptance framing, optional cross-check)

## Core steps

1. **Read the spec**: go through DESIGN.md's scope/architecture/data/interfaces/acceptance criteria.
2. **Decompose tasks**: split the design into discrete, independently reviewable work items, each with
   `id`, title, owning role, scope of change, inputs/outputs, acceptance (mapped to DESIGN's
   acceptance_criteria), and explicit dependencies.
3. **Topologically sort**: order by dependency, mark the **critical path**; decouple independent items.
4. **Group into parallel tracks**: put non-dependent items into **parallel tracks / waves**; each wave
   boundary has an **integration/acceptance checkpoint** so work is independently regressable.
5. **Produce `PLAN.md`**: frontmatter `status: draft`; body has waves, parallel tracks, task table,
   critical path, risks and rollback order.
6. **Self-check (soft)**: every DESIGN acceptance criterion maps to at least one task; dependencies
   acyclic; track merge points explicit. On pass set `status: complete`.
7. **Auto review**: `@quality-assurance` reviews completeness/acceptability; on pass set `reviewed: yes`.
8. **Human confirmation**: `question` to present tracks/order/owners/critical path/risks; on confirmation
   set `human_confirmed: true`.

## Deliverable: PLAN.md template

```markdown
---
status: draft
ordered_batches: no
parallel_tracks: no
task_backlog: no
dependencies: no
acceptance_mapping: no
reviewed: no
human_confirmed: false
---

# PLAN — <title>

## 1. Ordered batches (waves)
Implementation order by dependency; marked critical path.

## 2. Parallel tracks
Groups of non-dependent work that can proceed in parallel; each independently accepted.

## 3. Task backlog
| id | title | owning role | dependencies | acceptance (link to DESIGN) | status |

## 4. Dependencies (acyclic)
Explicit predecessors; confirmed acyclic.

## 5. Acceptance mapping
Every DESIGN acceptance_criteria maps to at least one task.

## 6. Risks & rollback
Risks on the critical path; rollback order.
```

## Self-check checklist (soft gate)

- [ ] `DESIGN.md` complete?
- [ ] Every DESIGN acceptance criterion mapped to one or more tasks?
- [ ] Dependencies acyclic, order sound, critical path marked?
- [ ] Track merge/acceptance checkpoints explicit?
- [ ] Six fields (ordered_batches/parallel_tracks/task_backlog/dependencies/acceptance_mapping/reviewed) ready?
- [ ] Plan confirmed with the user (`human_confirmed: true`, `status: complete`)?

## Common pitfalls

- ❌ Listing tasks without order → parallel chaos, mutual blocking
- ❌ Acceptance criteria with no owning task → nothing to verify against
- ❌ Cyclic dependencies / unclear critical path → delays
- ❌ Submitting with missing required fields → blocked by `plan-phase-gate`

## Output

- `PLAN.md` (six fields ready, reviewed, human_confirmed set, `status: complete`)