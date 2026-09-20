---
name: design-and-spec
description: "Use when entering the design (SDD) phase: collect requirements and check them against GATE-REQUIREMENTS.md, get requirements sign-off, turn them into a DESIGN.md specification, and pass auto + human review before the plan phase. Front-load keywords: design, specification, spec, requirements, SDD, technical design, design review."
---

# Design & Spec (Design / SDD)

Turn **requirements** into a structured, buildable `DESIGN.md` specification, and only proceed to the
**Plan** phase after passing **requirements sign-off + gate-spec check + auto review + human confirmation**.
Two inputs: `PROJECT-REVIEW.md` (current state) and **this design's requirements** (what to build; no
fixed format).

> **SDD terminology alignment**: this phase's `DESIGN.md` is what SDD / SpecKit call a **spec** — the
> contract between "requirements" and "implementation" that you build against and accept against. Writing
> the spec already does a coarse requirements split (scope / acceptance criteria); the next phase
> (`plan-project`) further breaks it into **independently implementable, independently acceptable unit tasks**
> (SDD's tasks). Both phases "split", just at different grains — from coarse (scope/acceptance) to fine
> (submittable tasks).

## When to use

- You have reached the "Design / SDD" phase (triggered by `/design`)
- You have requirements or a business goal and need a reviewable technical spec
- You want to pin down approach, trade-offs, data, interfaces, and acceptance criteria before coding

## Input (what to bring in)

- `PROJECT-REVIEW.md` (confirmed in Phase 1; if absent, do Phase 1 first)
- This design's requirements (user's spoken words / docs / existing spec — any shape)
- **`GATE-REQUIREMENTS.md`** (project root — defines the "requirements gate spec"; ask the user to add it if missing)

## Core steps (strict order)

1. **Confirm inputs ready**: `GATE-REQUIREMENTS.md` exists; `PROJECT-REVIEW.md` exists. Fill gaps first.
2. **Collect requirements**: use the `question` tool to gather "what to design". No fixed template;
   different projects have different shapes.
3. **Enforce the gate spec**: check the requirements item by item against `GATE-REQUIREMENTS.md`.
   Send back for clarification until they pass.
4. **Requirements sign-off**: `question` to confirm "requirements are good to continue"; on confirmation set
   `requirements_sign_off: true`.
5. **Produce `DESIGN.md`**: cover the eight required fields and **inline the raw requirements**:
   - scope · option_analysis (reuse `tech-selection`)
   - architecture (reuse `architecture-design`, `domain-modular-design`)
   - data_model · interfaces · acceptance_criteria · non_functional (reuse `non-functional-testing`)
   - status: draft
6. **Auto review**: `@quality-assurance` reviews per `design-code-review`; on pass set `reviewed: yes`.
7. **Human confirmation (design)**: `question` to present the design and confirm; on confirmation set
   `human_confirmed: true`, `status: complete`.

## Deliverable: DESIGN.md template

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
reviewed: no
requirements_sign_off: false
human_confirmed: false
---

# DESIGN — <title>

## 0. Requirements (inlined)
Raw requirements and source.

## 1. Scope
- What is / is not in scope; boundaries

## 2. Option analysis
- Candidates, trade-offs, choice rationale (reuse tech-selection)

## 3. Architecture
- Layering/modules/components/call graph/deployment (architecture-design, domain-modular-design)

## 4. Data model
- Storage/tables/schema/migrations; read & write paths

## 5. Interfaces
- External API/contracts/events; how it connects to existing code

## 6. Acceptance criteria
- Verifiable pass conditions

## 7. Non-functional
- Performance/security/operability goals and baselines (non-functional-testing)

## 8. Review record
- @quality-assurance auto-review conclusion; human confirmation conclusion
```

## Self-check checklist (soft gate)

- [ ] `GATE-REQUIREMENTS.md` exists and the requirements passed its item-by-item check?
- [ ] Requirements signed off (`requirements_sign_off: true`)?
- [ ] All eight required fields (scope/option_analysis/architecture/data_model/interfaces/acceptance_criteria/non_functional/reviewed) ready?
- [ ] Requirements inlined into DESIGN.md?
- [ ] `@quality-assurance` auto-review passed (`reviewed: yes`)?
- [ ] Design confirmed with the user (`human_confirmed: true`, `status: complete`)?

## Common pitfalls

- ❌ Designing without requirements → directionless; or forcing it without `GATE-REQUIREMENTS.md`
- ❌ Proceeding without requirements sign-off → rework
- ❌ Writing inferences/trade-offs without rationale → fails review
- ❌ Submitting with missing required fields → blocked by `design-phase-gate`, cannot reach the plan phase

## Output

- `DESIGN.md` (eight fields ready, reviewed, requirements_sign_off, human_confirmed all set, `status: complete`)