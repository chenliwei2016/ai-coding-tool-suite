#!/usr/bin/env bash
# Shared helpers for the opencode gate E2E suite.
set -u
TEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJ="${PROJ:-$TEST_DIR/.runtime/app}"
OPENCODE_BIN="${OPENCODE_BIN:-opencode}"
MODEL="${MODEL:-}"
TIMEOUT="${TIMEOUT:-240}"
ENV_EXTRAS=()

# oc <opencode-run-args...>  — headless run in $PROJ. Sets OUT and EXIT.
oc() {
  local model_args=(); [ -n "$MODEL" ] && model_args+=(--model "$MODEL")
  local prefix=(); for e in "${ENV_EXTRAS[@]}"; do prefix+=(env "$e"); done
  OUT="$(cd "$PROJ" && "${prefix[@]}" timeout "$TIMEOUT" "$OPENCODE_BIN" run --dir "$PROJ" --format json --auto "${model_args[@]}" "$@" 2>&1)"; EXIT=$?
}

reset_tree(){ git -C "$PROJ" checkout -q -- chinese english 2>/dev/null || true; git -C "$PROJ" clean -fdq chinese english 2>/dev/null || true; }
head_short(){ git -C "$PROJ" rev-parse --short HEAD; }
doc_status(){ git -C "$PROJ" status --porcelain -- chinese/doc.md; }

pass(){ echo "PASS  | $1"; }
fail(){ echo "FAIL  | $1"; }
has(){ printf '%s' "$1" | grep -q -- "$2"; }