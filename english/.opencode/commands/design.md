---
description: "Enter the Design (SDD) phase: collect requirements, check them against GATE_REQUIREMENTS.md, get requirements sign-off, produce the DESIGN.md spec, and pass the auto-review + human-confirmation gates before the Plan phase."
agent: build
---

You are the executor of this phase (build facade). Run **Design (SDD)**. Follow the `design-and-spec`
skill end-to-end and do not proceed to the **Plan** phase until this phase is complete (verified by
`design-phase-gate`).

## What this command does (in strict order)

1. **Prepare inputs**:
   - Read `PROJECT-REVIEW.md` (delivered by the init phase and confirmed).
   - **Ensure `GATE_REQUIREMENTS.md` exists** at the project root (it defines the "requirements gate
     spec"). If missing, ask the user to provide it first — do not proceed without it.
2. **Collect requirements**: use the `question` tool to gather this design's requirements. No fixed
   format/doc; different projects have different requirement shapes.
3. **Enforce the gate spec**: check the requirements against `GATE_REQUIREMENTS.md` item by item; send
   back for clarification until they pass.
4. **Requirements sign-off**: use the `question` tool to confirm with the user that these requirements
   are good to continue; on confirmation set `DESIGN.md`'s `requirements_sign_off` to `true`.
5. **Write the spec**: produce `DESIGN.md` covering the required fields
   `scope / option_analysis / architecture / data_model / interfaces / acceptance_criteria / non_functional`
   (reusing the architecture/selection/domain/code-review skills), and inline the requirements.
   Delegate `@frontend-architect`/`@backend-architect` to deepen frontend/backend design as needed.
6. **Auto review**: `@quality-assurance` reviews per `design-code-review`; on pass set `reviewed` to `yes`.
7. **Human confirmation**: use the `question` tool to present the design and confirm; on confirmation set
   `human_confirmed` to `true`, and set `DESIGN.md`'s `status` to `complete`.
8. **Summarize**: report the deliverable path, the two reviews and two gates that passed, and readiness
   for the **Plan** phase.

## Closing notes

- Phase commands are bound to build: you orchestrate and `@`-delegate subagents inside.
- If any hard-gate condition is unmet, do not discuss **Plan**.