---
name: know-your-project
description: "Use when initializing a project (init / onboarding / know your project): reverse-engineer an unfamiliar or half-handover codebase, produce the PROJECT-REVIEW.md deliverable, and pass the self + human-confirmation gates before moving to the design phase. Front-load keywords: project onboarding, know your project, reverse engineer, init, understand the codebase."
---

# Know Your Project (Init)

Understand a project you are unfamiliar with or inherited halfway: recover business, architecture, data,
entry points, and risks from code/docs, produce a standardized `PROJECT-REVIEW.md`, and pass both the
**soft (self-check)** and **human-confirmation / stage-progress** gates before finishing and moving to the
**Design** phase.

## When to use

- A brand-new project or a pile of code with no `AGENTS.md` or sparse docs
- Picking up a project mid-way with missing handover, needing quick, correct understanding
- Wanting to confirm everyone is aligned on the project before design/implementation

## Input (what to bring in)

- The project root (your workspace)
- Any existing `README*` / `AGENTS.md` / `opencode.json` / build config (read these first to save time)
- Otherwise start from the code itself

## Core steps

1. **Survey the current state**: read README/AGENTS/build config; if absent, start from the directory
   structure and entry files.
2. **Restore it layer by layer** (delegate `@explore` for fast scans; `@backend-architect`/`@frontend-architect`
   to go deeper on architecture):
   - entry points / startup / routes — pages
   - module boundaries, dependency direction, layering
   - data model / storage / schema / migrations
   - external dependencies, config, env vars (**never record real secrets**)
3. **Reverse-engineer business rules**: derive rules and constraints from the implementation; **mark inferences
   with "?"** — never present guesses as facts.
4. **Collect risks and unknowns**: tech debt, missing docs, high-priority pitfalls; plus a **"needs human
   confirmation"** list.
5. **Produce `PROJECT-REVIEW.md`**: use the template below; all six required fields `yes`; `status: draft`.
6. **Self-check gate (soft)**: go through the checklist; when all pass set `status → complete`.
7. **Human-confirmation gate**: use the `question` tool to present the key points; on confirmation set
   `human_confirmed → true`. (The phase hard gate verifies both.)

## Deliverable: PROJECT-REVIEW.md template

```markdown
---
project: <project name>
status: draft            # set to complete once self-check passes
entrypoints: no          # required
architecture: no         # required
data_model: no           # required
business_rules: no       # required
dependencies: no         # required
risks: no                # required
human_confirmed: no      # set to true once the user confirms
---

# PROJECT-REVIEW — <project name>

## 1. Project overview
One-line business goal; stack / language / framework; runtime.

## 2. Architecture & layering
- Entry points (CLI/server/startup files)
- Module boundaries, dependency direction, deployment topology

## 3. Data model
- Storage/DB/schema/tables/migrations; read & write paths

## 4. Business rules (recovered)
- Rules and constraints recovered from the implementation; mark inferences with "?"

## 5. External dependencies & config
- Third-party services, config keys, env vars (no real secrets)

## 6. Build/test/deploy
- Build commands, test commands, CI/deploy flow

## 7. Risks & unknowns
- Tech debt, missing docs, high-priority pitfalls
- Items needing human confirmation (listed one by one)

## 8. Self-check declaration
- Whether all six required fields are yes; what exploration covered vs skipped

```

> Afterward: from the confirmed REVIEW, generate/update `AGENTS.md` at the project root to distill reusable knowledge.

## Self-check checklist (soft gate)

- [ ] `PROJECT-REVIEW.md` created at the project root?
- [ ] All six required fields (entrypoints/architecture/data_model/business_rules/dependencies/risks) set to `yes`?
- [ ] Inferences marked with "?", guesses not presented as fact?
- [ ] "Needs human confirmation" list included?
- [ ] `status` set to `complete`, key points presented to the user, and `human_confirmed: true`?

## Common pitfalls

- ❌ Starting to code/design before reverse-engineering → misaligned understanding, rework
- ❌ Presenting inferences as fact without marking them → misleads later phases
- ❌ Submitting with missing fields → blocked by `know-phase-gate`, cannot reach design
- ❌ Recording real secrets/sensitive info in the REVIEW

## Output

- `PROJECT-REVIEW.md` (all six fields `yes`, `human_confirmed: true`)
- An `AGENTS.md` generated from it
- Recorded contribution from subagents delegated for exploration