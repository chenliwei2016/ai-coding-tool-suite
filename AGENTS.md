# AGENTS.md

This is not an app codebase. It distributes OpenCode tooling — skills, agents, commands, a plugin — as reusable content, shipped **bilingually**. There is no runtime, no build, and no test/lint/typecheck to run.

## Layout

- `chinese/.opencode/` — Chinese edition. **Author-maintained source of truth.**
- `english/.opencode/` — English edition (translated).
- Both mirror identically: `skills/<name>/SKILL.md`, `agents/*.md`, `commands/*.md`, `plugins/*.ts`.
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
- Repo state: single initial commit; most content is currently untracked until `git add` is run.