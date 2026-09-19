---
description: "Sync changed bilingual files into the other language tree. Auto-detects which side changed, derives the direction, and asks you to confirm before translating."
---

You are syncing this repo's bilingual mirror. Every artifact ships under BOTH `chinese/`
and `english/`. `$ARGUMENTS` may carry a hint like `/sync-translation all` or
`/sync-translation chinese->english`.

## Step 1: find changed files

Run:

```bash
git status --porcelain --untracked-files=all
```

and also include changes not yet staged:

```bash
git diff --name-only HEAD
```

Merge, dedupe, and keep only paths under `chinese/` or `english/`. If none changed, say
so and stop.

## Step 2: derive the direction per pair

For each changed path, swap the leading `chinese` ⇄ `english` to get its twin. Determine
the direction automatically:

- `chinese/` changed but its `english/` twin **not** changed → **chinese -> english**.
- `english/` changed but its `chinese/` twin **not** changed → **english -> chinese**.
- both changed → already paired; no direction needed (leave alone unless asked).

If directions conflict across files, prefer the direction given in `$ARGUMENTS`; otherwise
use the majority and flag the conflicts.

## Step 3: confirm with the user (one short question)

Show a compact summary: the changed file(s), each twin, and the derived direction(s). Then
ask a single confirmation with the question tool, e.g.:

- "Sync N file(s) `chinese -> english` and translate the twin(s)?" → Confirm / Skip
- (if more than one direction) include both and let them pick to confirm all or a subset.

Respect an explicit direction in `$ARGUMENTS`. Do not run a long multi-part questionnaire.

## Step 4: translate and write

For each file to sync, in the derived direction:

- READ the full current content of the **source** language file.
- WRITE a faithful translation into the **twin**, preserving: YAML frontmatter structure,
  field order, the fields that carry across unchanged (skill `name:`; agent
  `name:`/`mode:`/`tools:`; command `agent:`), markdown headings, lists, code fences, paths.
- Respect the keyword policy: `chinese/` front-load keywords stay BILINGUAL; `english/`
  front-load keywords stay **English-only**. Do not alter the target tree's policy.
- **`english/` must contain zero Chinese characters.** Verify after writing.

## Step 5: verify and report

```bash
rg -l '[\u4e00-\u9fff]' english/.opencode   # expect no output
```

Report the synced files and direction, and any files you left unchanged and why.