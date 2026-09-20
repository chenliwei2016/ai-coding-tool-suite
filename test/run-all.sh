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
  [ -f "./fixtures/$fx" ] && cp "./fixtures/$fx" "$PROJ/PROJECT-REVIEW.md"
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

# design-phase-gate gates /plan. Blocked => EXIT != 0.
DG() { local c="$1" why="$2" gate="$3" dfx="$4"; want "$c" || return; echo "== $c design-phase-gate: $why =="
  reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/GATE_REQUIREMENTS.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  if [ "$gate" = "yes" ]; then cp "./fixtures/GATE_REQUIREMENTS.md" "$PROJ/GATE_REQUIREMENTS.md"; fi
  [ "$dfx" != "IGNORE" ] && [ -f "./fixtures/$dfx" ] && cp "./fixtures/$dfx" "$PROJ/DESIGN.md"
  oc --command plan "go"
  [ "$EXIT" -ne 0 ] && pass "$c blocked (exit=$EXIT)" || fail "$c NOT blocked (exit=0)"
  reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/GATE_REQUIREMENTS.md"; }

t15(){ DG t15 "missing GATE_REQUIREMENTS.md blocks" "no" "IGNORE"; }
t16(){ DG t16 "no DESIGN.md blocks" "yes" "IGNORE"; }
t17(){ DG t17 "status=draft blocks" "yes" "DESIGN.draft.md"; }
t18(){ DG t18 "reviewed=no blocks" "yes" "DESIGN.nofield.md"; }
t19(){ DG t19 "requirements not signed off blocks" "yes" "DESIGN.nosignoff.md"; }

t20() { want t20 || return; echo "== t20 design-phase-gate: env off bypass =="
  reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/GATE_REQUIREMENTS.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  ENV_EXTRAS=(DESIGN_PHASE_GATE=off); oc --command plan "go past gate"
  [ "$EXIT" -eq 0 ] && pass "t20 gate bypassed (exit=0)" || fail "t20 still blocked (exit=$EXIT)"
  ENV_EXTRAS=(); reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/GATE_REQUIREMENTS.md"; }

t22() { want t22 || return; echo "== t22 design-phase-gate: complete DESIGN allows /plan =="
  reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/GATE_REQUIREMENTS.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  cp "./fixtures/GATE_REQUIREMENTS.md" "$PROJ/GATE_REQUIREMENTS.md"
  cp "./fixtures/DESIGN.ok.md" "$PROJ/DESIGN.md"
  oc --command plan "go"
  [ "$EXIT" -eq 0 ] && pass "t22 /plan allowed (exit=0)" || fail "t22 /plan blocked (exit=$EXIT)"
  reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/GATE_REQUIREMENTS.md"; }

# plan-phase-gate gates /dev. Blocked => EXIT != 0.
PG() { local c="$1" why="$2" dfx="$3" pfx="$4"; want "$c" || return; echo "== $c plan-phase-gate: $why =="
  reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/PLAN.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  [ "$dfx" != "IGNORE" ] && [ -f "./fixtures/$dfx" ] && cp "./fixtures/$dfx" "$PROJ/DESIGN.md"
  [ "$pfx" != "IGNORE" ] && [ -f "./fixtures/$pfx" ] && cp "./fixtures/$pfx" "$PROJ/PLAN.md"
  oc --command dev "go"
  [ "$EXIT" -ne 0 ] && pass "$c blocked (exit=$EXIT)" || fail "$c NOT blocked (exit=0)"
  reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/PLAN.md"; }

t23(){ PG t23 "missing PLAN.md blocks" "IGNORE" "IGNORE"; }
t24(){ PG t24 "DESIGN not complete blocks" "DESIGN.nofield.md" "IGNORE"; }
t25(){ PG t25 "PLAN status=draft blocks" "DESIGN.ok.md" "PLAN.draft.md"; }
t26(){ PG t26 "PLAN reviewed=no blocks" "DESIGN.ok.md" "PLAN.nofield.md"; }

t27() { want t27 || return; echo "== t27 plan-phase-gate: env off bypass =="
  reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/PLAN.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  ENV_EXTRAS=(PLAN_PHASE_GATE=off); oc --command dev "go past gate"
  [ "$EXIT" -eq 0 ] && pass "t27 gate bypassed (exit=0)" || fail "t27 still blocked (exit=$EXIT)"
  ENV_EXTRAS=(); reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/PLAN.md"; }

t28() { want t28 || return; echo "== t28 plan-phase-gate: complete PLAN + DESIGN allows /dev =="
  reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/PLAN.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  cp "./fixtures/DESIGN.ok.md" "$PROJ/DESIGN.md"; cp "./fixtures/PLAN.ok.md" "$PROJ/PLAN.md"
  oc --command dev "go"
  [ "$EXIT" -eq 0 ] && pass "t28 /dev allowed (exit=0)" || fail "t28 /dev blocked (exit=$EXIT)"
  reset_tree; rm -f "$PROJ/DESIGN.md" "$PROJ/PLAN.md"; }

echo "== running suite against $PROJ (model: ${MODEL:-default}) =="
t14; t01; t02; t03; t07; t08; t09; t10; t11; t12; t13; t04; t05; t06; t15; t16; t17; t18; t19; t20; t22; t23; t24; t25; t26; t27; t28
echo "== done =="