---
description: "Initialize a project (Know Your Project): reverse-engineer an unfamiliar or half-handover codebase, produce PROJECT-REVIEW.md, pass the self-check + human-confirmation gates, then auto-generate/update AGENTS.md."
agent: build
---

You are the executor of this phase (build facade). Run **Initialize / Know Your Project**. Follow the
`know-your-project` skill end-to-end, and do not proceed to the **Design** phase until this phase is
complete (a hard gate verifies it).

## What this command does

1. **Load the skill**: load the `know-your-project` skill and follow it. Delegate as needed, e.g.
   `@backend-architect` for backend/architecture reverse-engineering and `@explore` for fast code
   exploration; other roles on demand. You (build) own the orchestration.
2. **Produce the deliverable**: create `PROJECT-REVIEW.md` at the current project root. Its frontmatter
   required fields `entrypoints / architecture / data_model / business_rules / dependencies / risks` must
   all be `yes`; `status: draft`.
3. **Self-check gate (soft)**: go through the skill's tail checklist; when all pass, set the frontmatter
   `status` to `complete`.
4. **Human-confirmation gate**: use the `question` tool to present your understanding (architecture / business
   rules / risks / unknowns), then set `human_confirmed` to `true` once the user confirms. If the user asks
   for changes, revise the REVIEW and confirm again.
5. **Generate/update AGENTS.md**: from the confirmed REVIEW, auto-create or update `AGENTS.md` at the
   current project root (distilling reusable engineering knowledge), noting its source.
6. **Summarize**: report the deliverable path, the two gates that passed, and readiness for the next phase.

## Closing notes

- Phase commands are bound to build: you orchestrate and `@`-delegate subagents inside.
- If the project already has good docs, exploration may be lighter, but still produce the REVIEW and pass both gates.
- Do not discuss **Design** until this phase is complete.