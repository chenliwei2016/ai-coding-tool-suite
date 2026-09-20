---
description: "Enter the Test phase: run functional (black-box), performance, and security tests on the implementation, review coverage and conclusions, flow defects into issues.md, produce TEST.md (result pass|fail), and require human confirmation before the Deploy phase."
agent: build
---

You are the executor of this phase (build facade). Run **Test**. Load the `test-project` skill and follow
it. Black-box verify the implementation delivered by `/dev` and produce `TEST.md`; a `result: pass` with
human confirmation is required before entering the **Deploy** phase (verified by `test-phase-gate`).

## What this command does

1. **Read inputs**: `PLAN.md` (implementation list), `DESIGN.md` (acceptance criteria),
   `GATE-REQUIREMENTS.md` (performance/security thresholds), and the code under test.
2. **Functional (black-box)**: delegate `@quality-assurance`; use `test-design`/`exploratory-testing`/
   `automated-test-suite` with **real running** evidence (start service / curl / browser / E2E).
3. **Performance**: `non-functional-testing` benchmarks against `GATE-REQUIREMENTS.md`.
4. **Security**: `non-functional-testing` for vulnerabilities/perimeter against the security pass line
   (no critical / no secret leak is hard).
5. **Defect management**: file defects with `bug-report-writing` and **write them into `issues.md`**
   (back to `/dev` or `/design`).
6. **Test review**: `@quality-assurance` reviews coverage and conclusions.
7. **Produce `TEST.md`**: frontmatter `result: pass|fail`, `defects`, `defects_flowed`.
8. **Human confirmation**: use the `question` tool to report results & defects; on confirmation set
   `human_confirmed: true` (if `fail`, route to `/dev` or `/design` to fix).
9. **Summarize**: when `result: pass`, report readiness for **Deploy**; when `fail`, list defects and destinations.

## Closing notes

- Phase commands are bound to build: you orchestrate and `@`-delegate subagents inside.
- Black-box verification must use **real running** evidence; thresholds reference `GATE-REQUIREMENTS.md`.