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
  reset_tree; rm -f "$PROJ/PROJECT-REVIEW.md" "$PROJ/SPEC.md"
  [ -f "./fixtures/$fx" ] && cp "./fixtures/$fx" "$PROJ/PROJECT-REVIEW.md"
  oc --command spec "go"
  [ "$EXIT" -ne 0 ] && pass "$c blocked (exit=$EXIT)" || fail "$c NOT blocked (exit=0)"
  reset_tree; rm -f "$PROJ/PROJECT-REVIEW.md" "$PROJ/SPEC.md"; }

t07() { KG t07 "no REVIEW blocks" "IGNORE"; }
t08() { KG t08 "status=draft blocks" "PROJECT-REVIEW.draft.md"; }
t09() { KG t09 "human_confirmed=false blocks" "PROJECT-REVIEW.noconfirm.md"; }

t10() { want t10 || return; echo "== t10 know-phase-gate: env off bypass =="
  reset_tree; rm -f "$PROJ/PROJECT-REVIEW.md" "$PROJ/SPEC.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  ENV_EXTRAS=(KNOW_PHASE_GATE=off); oc --command spec "go past gate"
  [ "$EXIT" -eq 0 ] && pass "t10 gate bypassed (exit=0)" || fail "t10 still blocked (exit=$EXIT)"
  ENV_EXTRAS=(); reset_tree; rm -f "$PROJ/SPEC.md"; }

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

# spec-phase-gate gates /dev, checking GATE-REQUIREMENTS.md + SPEC.md. Blocked => EXIT != 0.
SG() { local c="$1" why="$2" gate="$3" sfx="$4"; want "$c" || return; echo "== $c spec-phase-gate: $why =="
  reset_tree; rm -f "$PROJ/SPEC.md" "$PROJ/GATE-REQUIREMENTS.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  if [ "$gate" = "yes" ]; then cp "./fixtures/GATE-REQUIREMENTS.md" "$PROJ/GATE-REQUIREMENTS.md"; fi
  [ "$sfx" != "IGNORE" ] && [ -f "./fixtures/$sfx" ] && cp "./fixtures/$sfx" "$PROJ/SPEC.md"
  oc --command dev "go"
  [ "$EXIT" -ne 0 ] && pass "$c blocked (exit=$EXIT)" || fail "$c NOT blocked (exit=0)"
  reset_tree; rm -f "$PROJ/SPEC.md" "$PROJ/GATE-REQUIREMENTS.md"; }

t15(){ SG t15 "missing GATE-REQUIREMENTS.md blocks" "no" "IGNORE"; }
t16(){ SG t16 "no SPEC.md blocks" "yes" "IGNORE"; }
t17(){ SG t17 "SPEC status=draft blocks" "yes" "SPEC.draft.md"; }
t18(){ SG t18 "acceptance_criteria missing blocks" "yes" "SPEC.nocrit.md"; }
t19(){ SG t19 "task_backlog missing blocks" "yes" "SPEC.notasks.md"; }

t20() { want t20 || return; echo "== t20 spec-phase-gate: env off bypass =="
  reset_tree; rm -f "$PROJ/SPEC.md" "$PROJ/GATE-REQUIREMENTS.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  ENV_EXTRAS=(SPEC_PHASE_GATE=off); oc --command dev "go past gate"
  [ "$EXIT" -eq 0 ] && pass "t20 gate bypassed (exit=0)" || fail "t20 still blocked (exit=$EXIT)"
  ENV_EXTRAS=(); reset_tree; rm -f "$PROJ/SPEC.md" "$PROJ/GATE-REQUIREMENTS.md"; }

t21() { want t21 || return; echo "== t21 spec-phase-gate: complete SPEC allows /dev =="
  reset_tree; rm -f "$PROJ/SPEC.md" "$PROJ/GATE-REQUIREMENTS.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  cp "./fixtures/GATE-REQUIREMENTS.md" "$PROJ/GATE-REQUIREMENTS.md"; cp "./fixtures/SPEC.ok.md" "$PROJ/SPEC.md"
  oc --command dev "go"
  [ "$EXIT" -eq 0 ] && pass "t21 /dev allowed (exit=0)" || fail "t21 /dev blocked (exit=$EXIT)"
  reset_tree; rm -f "$PROJ/SPEC.md" "$PROJ/GATE-REQUIREMENTS.md"; }

# dev-phase-gate gates /test, checking SPEC.md implementation state. Blocked => EXIT != 0.
TQ() { local c="$1" why="$2" pfx="$3"; want "$c" || return; echo "== $c dev-phase-gate: $why =="
  reset_tree; rm -f "$PROJ/SPEC.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  [ "$pfx" != "IGNORE" ] && [ -f "./fixtures/$pfx" ] && cp "./fixtures/$pfx" "$PROJ/SPEC.md"
  oc --command test "go"
  [ "$EXIT" -ne 0 ] && pass "$c blocked (exit=$EXIT)" || fail "$c NOT blocked (exit=0)"
  reset_tree; rm -f "$PROJ/SPEC.md"; }

t29(){ TQ t29 "missing SPEC.md blocks" "IGNORE"; }
t30(){ TQ t30 "implementation_complete=no blocks" "SPEC.dev-pending.md"; }
t31(){ TQ t31 "tests_written=no blocks" "SPEC.dev-notests.md"; }
t32(){ TQ t32 "implementation not human-confirmed blocks" "SPEC.dev-noconfirm.md"; }

t33() { want t33 || return; echo "== t33 dev-phase-gate: env off bypass =="
  reset_tree; rm -f "$PROJ/SPEC.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  ENV_EXTRAS=(DEV_PHASE_GATE=off); oc --command test "go past gate"
  [ "$EXIT" -eq 0 ] && pass "t33 gate bypassed (exit=0)" || fail "t33 still blocked (exit=$EXIT)"
  ENV_EXTRAS=(); reset_tree; rm -f "$PROJ/SPEC.md"; }

t34() { want t34 || return; echo "== t34 dev-phase-gate: complete implementation allows /test =="
  reset_tree; rm -f "$PROJ/SPEC.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  cp "./fixtures/SPEC.dev-ok.md" "$PROJ/SPEC.md"
  oc --command test "go"
  [ "$EXIT" -eq 0 ] && pass "t34 /test allowed (exit=0)" || fail "t34 /test blocked (exit=$EXIT)"
  reset_tree; rm -f "$PROJ/SPEC.md"; }

# test-phase-gate gates /deploy, checking TEST.md. Blocked => EXIT != 0.
TG() { local c="$1" why="$2" tfx="$3"; want "$c" || return; echo "== $c test-phase-gate: $why =="
  reset_tree; rm -f "$PROJ/TEST.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  [ "$tfx" != "IGNORE" ] && [ -f "./fixtures/$tfx" ] && cp "./fixtures/$tfx" "$PROJ/TEST.md"
  oc --command deploy "go"
  [ "$EXIT" -ne 0 ] && pass "$c blocked (exit=$EXIT)" || fail "$c NOT blocked (exit=0)"
  reset_tree; rm -f "$PROJ/TEST.md"; }

t35(){ TG t35 "missing TEST.md blocks" "IGNORE"; }
t36(){ TG t36 "status not complete blocks" "TEST.pending.md"; }
t37(){ TG t37 "functional=no blocks" "TEST.nofunc.md"; }
t38(){ TG t38 "result=fail blocks" "TEST.fail.md"; }

t39() { want t39 || return; echo "== t39 test-phase-gate: env off bypass =="
  reset_tree; rm -f "$PROJ/TEST.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  ENV_EXTRAS=(TEST_PHASE_GATE=off); oc --command deploy "go past gate"
  [ "$EXIT" -eq 0 ] && pass "t39 gate bypassed (exit=0)" || fail "t39 still blocked (exit=$EXIT)"
  ENV_EXTRAS=(); reset_tree; rm -f "$PROJ/TEST.md"; }

t40() { want t40 || return; echo "== t40 test-phase-gate: TEST pass allows /deploy =="
  reset_tree; rm -f "$PROJ/TEST.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  cp "./fixtures/TEST.ok.md" "$PROJ/TEST.md"
  oc --command deploy "go"
  [ "$EXIT" -eq 0 ] && pass "t40 /deploy allowed (exit=0)" || fail "t40 /deploy blocked (exit=$EXIT)"
  reset_tree; rm -f "$PROJ/TEST.md"; }

# release-phase-gate gates /retro, checking RELEASE-PLAN.md + RELEASE.md. Blocked => EXIT != 0.
RG() { local c="$1" why="$2" planon="$3" rfx="$4"; want "$c" || return; echo "== $c release-phase-gate: $why =="
  reset_tree; rm -f "$PROJ/RELEASE-PLAN.md" "$PROJ/RELEASE.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  [ "$planon" = "yes" ] && cp "./fixtures/RELEASE-PLAN.md" "$PROJ/RELEASE-PLAN.md"
  [ "$rfx" != "IGNORE" ] && [ -f "./fixtures/$rfx" ] && cp "./fixtures/$rfx" "$PROJ/RELEASE.md"
  oc --command retro "go"
  [ "$EXIT" -ne 0 ] && pass "$c blocked (exit=$EXIT)" || fail "$c NOT blocked (exit=0)"
  reset_tree; rm -f "$PROJ/RELEASE-PLAN.md" "$PROJ/RELEASE.md"; }

t41(){ RG t41 "missing RELEASE-PLAN.md blocks" "no" "IGNORE"; }
t42(){ RG t42 "deployed=no blocks" "yes" "RELEASE.nodeployed.md"; }
t43(){ RG t43 "verified=no blocks" "yes" "RELEASE.noverified.md"; }
t44(){ RG t44 "release not human-confirmed blocks" "yes" "RELEASE.noconfirm.md"; }

t45() { want t45 || return; echo "== t45 release-phase-gate: env off bypass =="
  reset_tree; rm -f "$PROJ/RELEASE-PLAN.md" "$PROJ/RELEASE.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  ENV_EXTRAS=(RELEASE_PHASE_GATE=off); oc --command retro "go past gate"
  [ "$EXIT" -eq 0 ] && pass "t45 gate bypassed (exit=0)" || fail "t45 still blocked (exit=$EXIT)"
  ENV_EXTRAS=(); reset_tree; rm -f "$PROJ/RELEASE-PLAN.md" "$PROJ/RELEASE.md"; }

t46() { want t46 || return; echo "== t46 release-phase-gate: complete release allows /retro =="
  reset_tree; rm -f "$PROJ/RELEASE-PLAN.md" "$PROJ/RELEASE.md"; git -C "$PROJ" commit -aqm "clean" 2>/dev/null || true
  cp "./fixtures/RELEASE-PLAN.md" "$PROJ/RELEASE-PLAN.md"; cp "./fixtures/RELEASE.ok.md" "$PROJ/RELEASE.md"
  oc --command retro "go"
  [ "$EXIT" -eq 0 ] && pass "t46 /retro allowed (exit=0)" || fail "t46 /retro blocked (exit=$EXIT)"
  reset_tree; rm -f "$PROJ/RELEASE-PLAN.md" "$PROJ/RELEASE.md"; }

echo "== running suite against $PROJ (model: ${MODEL:-default}) =="
t14; t01; t02; t03; t07; t08; t09; t10; t11; t12; t13; t04; t05; t06; t15; t16; t17; t18; t19; t20; t21; t29; t30; t31; t32; t33; t34; t35; t36; t37; t38; t39; t40; t41; t42; t43; t44; t45; t46
echo "== done =="
