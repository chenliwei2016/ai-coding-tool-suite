#!/usr/bin/env bash
# E2E suite for ai-coding-tool-suite mechanisms, using REAL opencode.
# Usage: PROJ=<dir> bash run-all.sh [case..]
set -u
cd "$(dirname "$0")"
source ./lib.sh
RUN_SELECTED="${*:-ALL}"
want() { [ "$RUN_SELECTED" = "ALL" ] && return 0; local x; for x in "$@"; do case " $RUN_SELECTED " in *" $x "*) return 0;; esac; done; return 1; }

t01() { want t01 || return; echo "== t01 translation-gate: one-sided block =="
  reset_tree; before=$(head_short)
  oc "Append a line to ./chinese/doc.md only. Then execute EXACTLY this bash command and report its output: git commit -am t01block"
  [ "$(head_short)" = "$before" ] && pass "t01 HEAD unchanged (blocked)" || fail "t01 HEAD moved (should be blocked)"
  reset_tree; }

t02() { want t02 || return; echo "== t02 translation-gate: paired pass =="
  reset_tree; before=$(head_short)
  oc "Append a line to BOTH ./chinese/doc.md and ./english/doc.md. Then execute EXACTLY this bash command: git commit -am t02pass"
  [ "$(head_short)" != "$before" ] && pass "t02 HEAD advanced" || fail "t02 HEAD unchanged (paired should pass)"
  reset_tree; }

t03() { want t03 || return; echo "== t03 translation-gate: env off bypass =="
  reset_tree; before=$(head_short)
  ENV_EXTRAS=(TRANSLATION_GATE=off); oc "Append a line to ./chinese/doc.md only. Then execute EXACTLY this bash command: git commit -am t03off"
  ENV_EXTRAS=()
  [ "$(head_short)" != "$before" ] && pass "t03 HEAD advanced (bypassed)" || fail "t03 HEAD unchanged"
  reset_tree; }

t04() { want t04 || return; echo "== t04 sync-translation: chinese->english, CJK-free =="
  reset_tree; printf 'hello chinese doc\n新的中文内容\n' > "$PROJ/chinese/doc.md"
  oc --command sync-translation "sync"
  grep -qP '[\x{4e00}-\x{9fff}]' "$PROJ/english/doc.md" && fail "t04 english has CJK" || pass "t04 english CJK-free"
  reset_tree; }

t05() { want t05 || return; echo "== t05 sync-translation: english->chinese =="
  reset_tree; printf 'hello english doc\nappended english line\n' > "$PROJ/english/doc.md"
  oc --command sync-translation "reverse english->chinese"
  reset_tree; }

t06() { want t06 || return; echo "== t06 /know-project happy path =="
  reset_tree; rm -f "$PROJ/PROJECT-REVIEW.md" "$PROJ/AGENTS.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  oc --command know-project "demo project"
  [ -f "$PROJ/PROJECT-REVIEW.md" ] && grep -q '^status: complete' "$PROJ/PROJECT-REVIEW.md" && pass "t06 REVIEW complete" || fail "t06 REVIEW missing/not complete"
  [ -f "$PROJ/AGENTS.md" ] && pass "t06 AGENTS.md generated" || fail "t06 AGENTS.md missing"
  rm -f "$PROJ/PROJECT-REVIEW.md" "$PROJ/AGENTS.md"; }

KG() { local c="$1" why="$2" fx="$3"; want "$c" || return; echo "== $c know-phase-gate: $why =="
  reset_tree; rm -f "$PROJ/PROJECT-REVIEW.md" "$PROJ/DESIGN.md"
  [ -f "$(dirname "$0")/../fixtures/$fx" ] && cp "$(dirname "$0")/../fixtures/$fx" "$PROJ/PROJECT-REVIEW.md"
  oc --command design "go"
  [ "$EXIT" -ne 0 ] && pass "$c blocked (exit=$EXIT)" || fail "$c NOT blocked (exit=0)"
  reset_tree; rm -f "$PROJ/PROJECT-REVIEW.md" "$PROJ/DESIGN.md"; }

t07() { KG t07 "no REVIEW blocks" "IGNORE"; }
t08() { KG t08 "status=draft blocks" "PROJECT-REVIEW.draft.md"; }
t09() { KG t09 "human_confirmed=false blocks" "PROJECT-REVIEW.noconfirm.md"; }

t10() { want t10 || return; echo "== t10 know-phase-gate: env off bypass =="
  reset_tree; rm -f "$PROJ/PROJECT-REVIEW.md" "$PROJ/DESIGN.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  ENV_EXTRAS=(KNOW_PHASE_GATE=off); oc --command design "go past gate"
  [ "$EXIT" -eq 0 ] && pass "t10 gate bypassed (exit=0)" || fail "t10 still blocked (exit=$EXIT)"
  ENV_EXTRAS=(); reset_tree; rm -f "$PROJ/DESIGN.md"; }

t11() { want t11 || return; echo "== t11 qa-gate: hard + stale issues block edit =="
  reset_tree; printf 'old\n' > "$PROJ/issues.md"; touch -d '3 hours ago' "$PROJ/issues.md"
  git -C "$PROJ" add -A; git -C "$PROJ" commit -qm "stale" 2>/dev/null || true
  ENV_EXTRAS=(QA_GATE=hard); oc "Edit ./chinese/doc.md to append 'QAEDIT'"
  ENV_EXTRAS=()
  [ -n "$(doc_status)" ] && fail "t11 edit allowed (gate did not block)" || pass "t11 edit blocked"
  reset_tree; rm -f "$PROJ/issues.md"; }

t12() { want t12 || return; echo "== t12 qa-gate: hard + fresh issues pass =="
  reset_tree; printf 'today registration\n' > "$PROJ/issues.md"
  git -C "$PROJ" add -A; git -C "$PROJ" commit -qm "fresh" 2>/dev/null || true
  ENV_EXTRAS=(QA_GATE=hard); oc "Edit ./chinese/doc.md to append 'QAALLOW'"
  ENV_EXTRAS=()
  [ -n "$(doc_status)" ] && pass "t12 edit allowed" || fail "t12 edit blocked (should pass)"
  reset_tree; rm -f "$PROJ/issues.md"; }

t13() { want t13 || return; echo "== t13 qa-gate: soft mode does not block =="
  reset_tree; printf 'x\n' > "$PROJ/issues.md"
  git -C "$PROJ" add -A; git -C "$PROJ" commit -qm "x" 2>/dev/null || true
  ENV_EXTRAS=(QA_GATE=soft); oc "Edit ./chinese/doc.md to append 'QASOFT'"
  ENV_EXTRAS=()
  [ -n "$(doc_status)" ] && pass "t13 edit allowed" || fail "t13 edit blocked (unexpected)"
  reset_tree; rm -f "$PROJ/issues.md"; }

t14() { want t14 || return; echo "== t14 role agents subagent-only (static) =="
  if grep -Rl '^mode: primary' "$PROJ/.opencode/agents/" 2>/dev/null | grep -q .; then fail "t14 found primary custom agent"; else pass "t14 no primary custom agent"; fi }

echo "== running suite against $PROJ (model: ${MODEL:-default}) =="
t14; t01; t02; t03; t07; t08; t09; t10; t11; t12; t13; t04; t05; t06
echo "== done =="