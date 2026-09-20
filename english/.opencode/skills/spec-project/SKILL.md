---
name: spec-project
description: "Use when entering the spec phase (SDD): clarify requirements, write the SPEC.md specification, then break it into independently implementable/acceptable unit tasks; pass auto + human review before dev. Front-load keywords: spec, specification, clarfy, requirements, task breakdown, SDD, spec-driven."
---

# Spec Project (SDD spec process)

Turn **requirements** through **clarify → write spec → task breakdown** into a single **`SPEC.md`**
(design 8 fields + task-breakdown 5 fields), then pass **auto review + one human confirmation** before the
**Dev** phase. Mirrors the SDD/SpecKit pipeline: `ask → clarify → spec → plan(task breakdown)`.

## When to use

- You have reached the "Spec" phase (triggered by `/spec`)
- You have requirements and `PROJECT-REVIEW.md`, and need a `SPEC.md` to build against and accept against
- You want to pin down approach, trade-offs, data, interfaces, acceptance, and task split before coding

## Input (what to bring in)

- `PROJECT-REVIEW.md` (current state, confirmed in Phase 1)
- This design's requirements (any shape)
- **`GATE-REQUIREMENTS.md`** (requirements gate spec + performance/security thresholds; ask the user to add if missing)

## Core steps (strict order)

### Sub-step A: Clarify
1. Confirm inputs ready: `GATE-REQUIREMENTS.md`, `PROJECT-REVIEW.md` exist.
2. Collect requirements (via `question`).
3. **Systematic clarification**: loop with `question` over every ambiguity in the requirements — **boundaries /
   non-goals, ambiguity, states & exceptions, concurrency/idempotency, rollback, NFR thresholds
   (performance/security)**. **Stop when no ambiguity remains.** Collapse each clarification into a sentence
   that can go straight into the spec.
4. Check item by item against `GATE-REQUIREMENTS.md`; send back until it passes.

### Sub-step B: Write spec + task breakdown
5. **Write the `SPEC.md` design section** covering: scope / option_analysis / architecture / data_model /
   interfaces / acceptance_criteria / non_functional.
6. **Break into unit tasks**: cut the spec into **independently implementable, independently acceptable**
   work items (owning role / dependencies / acceptance mapping), covering: ordered_batches / parallel_tracks /
   task_backlog / dependencies / acceptance_mapping.
7. `status: draft`; then auto review (`@quality-assurance` per `design-code-review`) → `reviewed: yes`.
8. **One human confirmation**: `question` to present the key points; on confirmation set `human_confirmed: true`,
   `status: complete`.

## Deliverable: SPEC.md frontmatter

```markdown
---
status: draft
scope: no
option_analysis: no
architecture: no
data_model: no
interfaces: no
acceptance_criteria: no
non_functional: no
ordered_batches: no
parallel_tracks: no
task_backlog: no
dependencies: no
acceptance_mapping: no
reviewed: no
human_confirmed: false
---
```

Body: a design section (scope/trade-offs/architecture/data/interfaces/acceptance/NFR) + a task-breakdown
section (ordered batches / parallel tracks / task list / dependencies / acceptance mapping / critical path).

## Self-check checklist (soft gate)

- [ ] Clarify left **no remaining ambiguity** (boundaries/exceptions/concurrency/rollback/NFR all confirmed)?
- [ ] All 13 required fields (8 design + 5 task) ready?
- [ ] Every acceptance criterion mapped to a task (acceptance_mapping)? Dependencies acyclic?
- [ ] Auto review passed (`reviewed: yes`)?
- [ ] One human confirmation done (`human_confirmed: true`, `status: complete`)?

## Common pitfalls

- ❌ Writing the spec without clarifying requirements → ambiguity leaks into implementation
- ❌ Writing the spec but not breaking tasks → dev cannot schedule/accept
- ❌ Submitting with missing required fields → blocked by `spec-phase-gate`
- ❌ Trade-offs with no rationale → fails review

## Output

- `SPEC.md` (13 fields ready, reviewed, human_confirmed, `status: complete`)