<div align="center">

# ai-coding-tool-suite

**Languages:** English | [中文](./README.zh-CN.md)

A **universal AI-assisted coding framework** — a full enterprise development lifecycle driven by opencode
mechanics: `agent` (who runs it), `skill` (how to do it), `command` (trigger a step), `plugin` (hard gate).
Ships bilingually (中文 + English) as reusable content you drop into any project.

</div>

## Overview

Codify battle-tested engineering practices rather than ad-hoc prompting. The framework wires a 7-phase
lifecycle — from onboarding a codebase to shipping and reflecting — into a chain of commands, skills and
hard gates. Every phase independently gates the phase after it; nothing proceeds until the deliverable is
complete, reviewed, and human-confirmed.

## Lifecycle (7 phases, hard-gated)

```
/know-project → know-phase-gate → /design → design-phase-gate → /plan → plan-phase-gate
→ /dev → dev-phase-gate → /test → test-phase-gate → /release → release-phase-gate → /retro
```

| Phase | Command | Skill | Gate (plugin / env) | Deliverable |
|---|---|---|---|---|
| 1 Init / Know Your Project | `/know-project` | `know-your-project` | `know-phase-gate.ts` / `KNOW_PHASE_GATE` | `PROJECT-REVIEW.md` |
| 2 Design (SDD) | `/design` | `design-and-spec` | `design-phase-gate.ts` / `DESIGN_PHASE_GATE` | `DESIGN.md` |
| 3 Plan | `/plan` | `plan-project` | `plan-phase-gate.ts` / `PLAN_PHASE_GATE` | `PLAN.md` |
| 4 Development | `/dev` | `dev-implement` | `dev-phase-gate.ts` / `DEV_PHASE_GATE` | implementation + unit tests |
| 5 Test | `/test` | `test-project` | `test-phase-gate.ts` / `TEST_PHASE_GATE` | `TEST.md` |
| 6 Release / Deploy | `/release` | `release-project` | `release-phase-gate.ts` / `RELEASE_PHASE_GATE` | `RELEASE.md` |
| 7 Retrospective | `/retro` | `retro-evaluate` | *(leaf — no outgoing gate)* | `RETRO.md` |

Each phase: **command → skill → gate**, outputting a frontmatter-flagged deliverable that the next phase's
gate machine-checks. Rework caps keep loops bounded (dev item `K=3`, stage `M=20`).

## Orchestration model

- The only **primary** agents are opencode's built-in `plan` (plan first) and `build` (drive/execute).
- Every custom role agent (`backend/frontend architect · developer`, `quality-assurance`) is `mode: subagent`
  and is only invoked via `@`-mention.
- Each phase is entered through its **command bound to `agent: build`**, whose template makes build orchestrate
  and `@`-delegate the relevant subagents. Pure tooling commands (e.g. `/sync-translation`) stay
  agent-independent.

## Declarative project specs

Anything the framework cannot know about your project is **declarative** — fill it in per project and the
gates read it, never hard-coded:

- `GATE-REQUIREMENTS.md` — requirements gate spec + **performance/security thresholds** (required to design).
- `RELEASE-PLAN.md` — concrete build/verify/deploy/rollback commands per release segment.

## Bilingual layout & keyword policy

Every artifact ships in **both Chinese and English**; pick your team's folder and copy it into your project.

```
project/
├── chinese/   # 中文版 · Chinese edition (author-maintained)
│   └── .opencode/{skills,agents,commands,plugins}
└── english/   # English edition (translated)
    └── .opencode/{skills,agents,commands,plugins}
```

- **Chinese edition**: skill front-load trigger keywords are **bilingual** (中文 + English).
- **English edition**: front-load keywords are **English-only**. The `english/` tree must stay Chinese-free.

## Getting started

```bash
mkdir -p project/.opencode
cp -r english/.opencode/* project/.opencode/     # or: cp -r chinese/.opencode/* project/.opencode/
```

Start at `/know-project`. Gates auto-load from `.opencode/plugins/`; no config wiring needed.

## Project-local tooling

- `commit-translation-gate.ts` — blocks `git commit`/`push` when a file under `chinese/` or `english/` changed
  but its twin did not (scoped to those two trees only). Bypass: `TRANSLATION_GATE=off`.
- `/sync-translation` — inspects changed bilingual files, auto-derives direction, and syncs the twin.

## Testing

`test/` holds a real-opencode E2E harness (T1–T46) validating every gate against a throwaway app:

```bash
bash test/scaffold.sh        # build test/.runtime/app
bash test/run-all.sh         # run all gates (T1–T46)
```

## Maintenance

The **Chinese edition is the author-maintained source of truth**. Keep `chinese/` and `english/` in sync:
same file names/structure — only language and the keyword policy differ.

## Contributing

Improvements and new playbooks welcome in both languages; mirror every addition into the other tree.

## License

MIT. See [LICENSE](./LICENSE).