#!/usr/bin/env bash
# Builds the scratch E2E project at test/.runtime/app (gitignored) from the
# framework sources. Safe to re-run: it wipes and rebuilds the scratch app.
set -euo pipefail
cd "$(dirname "$0")"
REPO="$(cd .. && pwd)"
APP="$(pwd)/.runtime/app"

rm -rf "$APP"
mkdir -p "$APP"
cp -r "$REPO/chinese/.opencode" "$APP/.opencode"
cp "$REPO/.opencode/plugins/commit-translation-gate.ts" "$APP/.opencode/plugins/"
cp "$REPO/.opencode/commands/sync-translation.md" "$APP/.opencode/commands/"

# stub next-phase command so know-phase-gate has something to intercept
cat > "$APP/.opencode/commands/design.md" << 'EOF'
---
description: "(stub) enter the design phase. Should be blocked until the init phase (PROJECT-REVIEW.md) is complete."
agent: build
---
(stub) Produce a design specification for the project.
EOF

# bilingual fixture pair used by the translation-gate / sync-translation tests
mkdir -p "$APP/chinese" "$APP/english"
printf 'hello chinese doc\n' > "$APP/chinese/doc.md"
printf 'hello english doc\n' > "$APP/english/doc.md"

git -C "$APP" init -q
git -C "$APP" add -A
git -C "$APP" -c user.email=t@t -c user.name=t commit -qm "seed"
echo "scaffolded E2E app at $APP"