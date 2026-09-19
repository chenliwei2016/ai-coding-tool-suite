---
description: "Sync changed bilingual files into the other language tree. Inspects chinese/ vs english/ changes and asks which files to translate and in which direction."
agent: build
---

You are syncing this repo's bilingual mirror. The repo ships every artifact under BOTH
`chinese/` and `english/`; the two trees must stay in sync. `$ARGUMENTS` may carry a hint
like `/sync-translation chinese->english` or `/sync-translation all`.

## Step 1: find the changed files

Run:

```bash
git status --porcelain --untracked-files=all
```

Collect every changed path that lives under `chinese/` or `english/`. Also include
changes not yet staged:

```bash
git diff --name-only HEAD
```

Merge both lists and drop duplicates.

## Step 2: group into language pairs

For each changed path, derive its twin by swapping the leading `chinese` ⇄ `english`.
Show the user a table with four columns: **changed path**, **twin**, **twin changed?**
(yes/no/exists?), **asymmetry**.

- if a path is changed but its twin is **not** changed -> asymmetric (the reason
  `/sync-translation` exists).
- if both twins are changed -> already paired; only translate if the user asks.

## Step 3: ask what to sync

Use the question tool to ask the user, one short batch:

1. **Which files to sync?** Options: all paired/asymmetric files (recommended) — or let
   them pick a subset.
2. **Direction (source -> target)?** Options: `chinese -> english` or `english -> chinese`
   (recommend the direction matching which side changed), or per-file choices.

Respect an explicit direction passed via `$ARGUMENTS`.

## Step 4: translate and write

For each selected file, in the chosen direction:

- READ the full current content of the **source** language file.
- WRITE a faithful translation into the **twin** (target) file, preserving: YAML frontmatter
  structure, field order, the frontmatter fields that must carry across unchanged
  (skill `name:`; agent `name:`/`mode:`/`tools:`; command `agent:`), markdown headings,
  bullet structures, lists, code fences, and file paths.
- Respect the trigger-keyword policy: `chinese/` front-load keywords stay BILINGUAL
  (中文 + English); `english/` front-load keywords stay **English-only**. Do not alter the
  target tree's keyword policy.
- **The `english/` tree must contain zero Chinese characters.** Verify after writing.

When creating both sides of a brand-new pair, create the two files together.

## Step 5: verify and report

After writing, re-check the target tree stays clean:

```bash
rg -l '[\u4e00-\u9fff]' english/.opencode   # expect no output
```

Then report the synced files and direction. Summarize any files you deliberately left
unchanged and why.