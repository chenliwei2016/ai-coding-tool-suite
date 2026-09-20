# AGENTS.md

This is not an app codebase. It distributes OpenCode tooling — skills, agents, commands, a plugin — as reusable content, shipped **bilingually**. There is no runtime, no build, and no test/lint/typecheck to run.

## 项目目标 (Project Goals)

This repo is evolving from a catalog into a **universal AI-assisted coding framework**: the full
enterprise development lifecycle is driven by opencode mechanisms — `agent` (who runs it),
`skill` (how to do it), `command` (trigger a step), `plugin` (hard gate). The framework is
delivered as reusable content (bilingual) that teams drop into their project.

The target lifecycle (overview; later phases will be detailed progressively in future passes):

1. **初始化 / Know Your Project** — reverse-engineer an unfamiliar or half-handover project:
   understand the codebase, produce a defined deliverable, and pass a **self-gate + human-confirmation
   gate** before proceeding. Roughly the on-ramp of `/init`. *(Implemented: `/know-project` command,
   `know-your-project` skill, `know-phase-gate.ts` / `KNOW_PHASE_GATE`.)*
2. **设计 (SDD / Spec)** — turn requirements into a specification; auto + human design review. *(Implemented:
   `/design` command, `design-and-spec` skill, `design-phase-gate.ts` / `DESIGN_PHASE_GATE`. Inputs:
   `PROJECT-REVIEW.md` (from phase 1) + inline requirements gated by project-root `GATE-REQUIREMENTS.md`;
   `DESIGN.md` is the deliverable, hard-gated on `reviewed`, `requirements_sign_off`, `human_confirmed`.)*
3. **计划 — task breakdown** — prioritize the spec into an ordered, parallelizable plan. *(Implemented: `/plan` command,
   `plan-project` skill, `plan-phase-gate.ts` / `PLAN_PHASE_GATE`; `PLAN.md` is the deliverable, hard-gated
   on `reviewed`, `human_confirmed`, with `DESIGN.md` as required input.)*
4. **开发** — spec -> code; unit tests; code review. *(Implemented: `/dev` command, `dev-implement` skill,
   `dev-phase-gate.ts` / `DEV_PHASE_GATE`. Executes PLAN.md work items iteratively and writes status back
   into PLAN.md; hard-gated on `implementation_complete`, `tests_written`, `human_confirmed`. Self-review
   here; real QA belongs to the Test phase. Rework caps: item K=3, stage M=20.)*
5. **测试** — functional (black-box), performance, security, test review; defects flow back to design.
   *(Implemented: `/test` command, `test-project` skill, `test-phase-gate.ts` / `TEST_PHASE_GATE`.
   `TEST.md` is the deliverable (`result: pass`), hard-gated on `functional`/`performance`/`security`/
   `reviewed`/`human_confirmed`. Thresholds reference the project-root `GATE-REQUIREMENTS.md`; defects flow
   into `issues.md`.)*
6. **部署 (release)** — build artifact -> version-verification env -> pre-prod review -> production.
   *(Implemented: `/release` command, `release-project` skill, `release-phase-gate.ts` / `RELEASE_PHASE_GATE`.
   `RELEASE.md` is the deliverable (deployed state), hard-gated on `artifact`/`verified`/`prereviewed`/
   `deployed`/`human_confirmed`. The four segments are **declarative** — concrete build/verify/deploy
   commands come from the project-root `RELEASE-PLAN.md`, never hard-coded.)*
7. **复盘 / 评估 (retrospective)** — optional but high-yield; the Deming/reflection cycle: retain what
   worked, fix what didn't, feed into the next loop. *(Implemented: `/retro` command, `retro-evaluate`
   skill. `RETRO.md` is a **quantified metrics dashboard** per phase (code adoption rate, rework rate,
   defect escape, cycle time, ...) with keep/improve feeding the next loop. Leaf node — no outgoing gate.)*

Each phase ships its own `skill` + (gate/`command`) + where useful an `agent`/`plugin`, so it is
reusable and independently gateable.

**Orchestration convention** (decided): the only primary agents are the built-in `plan` (plan first) and
`build` (drive/execute). Every custom role agent is `mode: subagent` and is only invoked by `@`-mention.
Each phase is entered via a **phase command bound to `agent: build`** (e.g. `/know-project`), whose template
makes build orchestrate and `@`-delegate the relevant subagents. Pure tooling commands (e.g.
`/sync-translation`) stay `agent`-independent so they run under whatever agent is active.
Phase gates are **one plugin + one env per phase** (e.g. `know-phase-gate.ts` / `KNOW_PHASE_GATE=off`),
never merged.

## Layout

- `chinese/.opencode/` — Chinese edition. **Author-maintained source of truth.**
- `english/.opencode/` — English edition (translated).
- Both mirror identically: `skills/<name>/SKILL.md`, `agents/*.md`, `commands/*.md`, `plugins/*.ts`.
- `test/` — E2E harness (see "Testing" below). Project-local, not mirrored.
- `README.md` / `README.zh-CN.md` are the human-facing docs (keep in sync too).

## Rules not to break

- **Bilingual parity**: always update both `chinese/.opencode` and `english/.opencode` with the same file names/structure. Chinese is primary; English is a translation of it.
- **`english/` must contain zero CJK characters.** Any Chinese in `english/` is a bug (including inline parentheticals in frontmatter descriptions). Verify: `rg -l '[\u4e00-\u9fff]' english/.opencode` → expect no output.
- **Front-load keyword policy differs by tree** (intentional):
  - `chinese/` skill `description` front-load keywords = bilingual (中文 + English).
  - `english/` skill front-load keywords = **English-only**.
- **Frontmatter fields carry across languages unchanged**: skill `name:`; agent `name:`/`mode:`/`tools:`; command `agent:`. Only the prose body and the keyword policy differ.
- **Double-quote every frontmatter `description:` value** whenever it contains a colon, slash, `@`, etc. (YAML breaks unquoted plain scalars on `: `; lazy but valid values trip parsers). When in doubt, quote it.
- **Commit messages must be written in English.** Even though the Chinese edition is the author-maintained source of truth, commit history stays in English.
- **Skill body template** (mimic when adding one): overview → when/适用场景 → input → core steps → self-check checklist (评审/自检) → common pitfalls (常见坑) → output/产出物.

## Testing (E2E harness)

`test/` holds a real-opencode E2E suite that validates every gate/mechanism in this framework.

- `test/scaffold.sh` — builds a throwaway app at `test/.runtime/app` (gitignored, safe to re-run):
  it copies `chinese/.opencode/` + the root tooling, adds fixture `chinese/`+`english/` pairs and a
  `design.md` stub, and git-inits a baseline.
- `test/run-all.sh` — runs cases **T1–T14** against that app using `opencode run` headless; pass a
  subset, e.g. `bash test/run-all.sh t01 t07`. Uses the default model, `--format json`, `--auto`.
- `test/fixtures/` — canned `PROJECT-REVIEW.*.md` states (ok / draft / nofield / noconfirm).
- Covered: translation gate (block/paired/env-off), `/sync-translation` CJK-free, `/know-project`,
  `know-phase-gate` (missing/draft/unconfirmed/env-off), `qa-gate` (hard-stale/hard-fresh/soft),
  role-agents-subagent static check.

Notes:
- Run `bash test/scaffold.sh` at least once before `run-all.sh`.
- Gate E2E is deterministic on **exit codes** (blocked → non-zero) and git/tree state, NOT on LLM text.
- The `translation-gate` is **scoped to `chinese/` and `english/` only**; `test/` changes never block commits.

## Bilingual-sync enforcement (project-local tooling)

- `.opencode/plugins/commit-translation-gate.ts` — a plugin (auto-loaded, project-level)
  that **blocks `git commit`/`git push`** when a file under `chinese/` or `english/` changed
  but its twin in the other tree did not. Bypass: `TRANSLATION_GATE=off`.
- `.opencode/commands/sync-translation.md` — the `/sync-translation` command that inspects
  changed bilingual files, asks which to sync and in which direction, and translates the
  twin. Use it to fix a one-sided change before committing.
- **Agents should treat the two language trees as one mirrored unit**: when you edit a file
  in `chinese/` or `english/`, keep the twin in sync (edit both, or run `/sync-translation`),
  rather than relying on the commit gate to catch it later.

## Verify commands (non-obvious)

```bash
# english tree must be Chinese-free
rg -l '[\u4e00-\u9fff]' english/.opencode

# trees must be structurally identical
diff <(cd chinese && find . -type f | sort) <(cd english && find . -type f | sort)
```

## Gotchas

- **Directory naming is consistently plural** (matches opencode — it accepts both): `skills/`, `agents/`, `commands/`, `plugins/`. Keep it plural everywhere.
- `plugins/qa-gate.ts` is a standalone Node/TypeScript plugin. There is **no package.json or build step in-repo** (`package.json`/`node_modules` are gitignored). Do not invent tooling or run `tsc`/`npm` setup.
- `.gitignore` is malformed (line 5: `.gitignore# Windows NTFS...` glued together) — copied verbatim from `~/.config`. Leave it, but don't rely on it for project files.
- Framework content lives in `chinese/`+`english/`; project-local tooling (root `.opencode/`, `test/`) is **not** mirrored and never triggers the translation gate.