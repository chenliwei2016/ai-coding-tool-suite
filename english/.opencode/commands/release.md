---
description: "Enter the Release/Deploy phase: drive artifact build -> version verification -> pre-prod review -> production per the declarative RELEASE-PLAN.md, produce RELEASE.md (deployed: yes), and pass human confirmation before the retrospective."
agent: build
---

You are the executor of this phase (build facade). Run **Release/Deploy**. Load the `release-project` skill
and follow it. Drive the four segments per the **declarative `RELEASE-PLAN.md`** and produce `RELEASE.md`;
a `deployed: yes` with human confirmation is required before entering the **Retrospective** phase (verified
by `release-phase-gate`).

## What this command does

1. **Read `RELEASE-PLAN.md`**: understand the four segments' actions and verification points (the framework
   does not pin the build stack/tools; commands come from the plan).
2. **Artifact build**: build per the plan and record the artifact id into `RELEASE.md`'s `artifact`.
3. **Version verification env**: deploy to the verification env and verify (smoke/regression); on pass set
   `verified: yes`.
4. **Pre-prod review**: review against `GATE-REQUIREMENTS.md` framing; on pass set `prereviewed: yes`.
5. **Release to production**: deploy per the plan (with rollback); on confirmation set `deployed: yes`.
6. **Human confirmation**: `question` to report artifact / verification / release; on confirmation set
   `human_confirmed: true`, `status: complete`.
7. **Summarize**: report `RELEASE.md` path and readiness for **Retrospective**.

## Closing notes

- Phase commands are bound to build: you orchestrate and `@`-delegate subagents inside.
- Concrete deploy/release commands and verification points come from `RELEASE-PLAN.md`; do not assume tools.