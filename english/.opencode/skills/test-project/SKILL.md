---
name: test-project
description: "Use when entering the test phase: verify implementation with functional (black-box), performance, and security testing, review coverage and conclusions, manage defects back to design/dev, and produce TEST.md with a pass/fail result + human confirmation before deployment. Front-load keywords: test, functional, black-box, performance, security, QA, test review, defect flow."
---

# Test Project (Test)

Black-box verify the implementation delivered by `/dev`: **functional (black-box) / performance / security**
testing + **test review** + **defect management (backflow)**, producing `TEST.md`; a `result: pass` with
human confirmation is required before entering the **Deploy** phase.

## When to use

- You have reached the "Test" phase (triggered by `/test`)
- Implementation is delivered (SPEC.md `implementation_complete: yes`)
- You want to confirm correctness, acceptable performance, and no obvious security risk before release,
  and route defects to the right place

## Input (what to bring in)

- `SPEC.md` (implementation list), `SPEC.md` (acceptance criteria), the code under test
- **`GATE-REQUIREMENTS.md` (configurable performance/security thresholds)** — performance baseline and
  security pass line; ask the user to add it if missing (part of the GATE-prefixed spec family)

## Core steps

1. **Read inputs**: confirm the scope under test, acceptance criteria, and performance/security thresholds
   (`GATE-REQUIREMENTS.md`).
2. **Functional (black-box)**: `@quality-assurance` uses `test-design`, `exploratory-testing`,
   `automated-test-suite` — verify against the **real running** system (start service / call APIs / run E2E),
   not just code.
3. **Performance**: `non-functional-testing` benchmarks against `GATE-REQUIREMENTS.md` thresholds (baseline
   data is enough; thresholds come from the spec).
4. **Security**: `non-functional-testing` finds vulnerabilities/perimeter weaknesses against the security pass
   line (**no critical vulns / no secret leak** is hard).
5. **Defect management**: for found defects, file them with `bug-report-writing` and **write them into
   `issues.md`** (QA flow back to `/dev` or `/spec`).
6. **Test review**: `@quality-assurance` reviews coverage, conclusions, and the defect list.
7. **Produce `TEST.md`**: frontmatter `result: pass` or `fail`, `defects` records count and destination.
8. **Human confirmation**: use the `question` tool to report results & defects; on confirmation set
   `human_confirmed: true`. Only `result: pass` may proceed to **Deploy**.

## Deliverable: TEST.md template

```markdown
---
status: draft
result: draft          # pass | fail
functional: no
performance: no
security: no
defects: none          # none | <count>
defects_flowed: no     # whether defects were flowed into issues.md
reviewed: no
human_confirmed: false
---

# TEST — <title>

## 1. Scope under test
PLAN items and acceptance criteria.

## 2. Functional (black-box)
Live evidence (start service / curl / browser / E2E), pass rate.

## 3. Performance
Baseline data vs GATE-REQUIREMENTS thresholds.

## 4. Security
Vulnerability/perimeter results vs the security pass line.

## 5. Defects & backflow
Defect list, destinations (/dev or /spec), whether written into issues.md.

## 6. Test review
@quality-assurance review of coverage and conclusions.
```

## Self-check checklist (soft gate)

- [ ] Black-box verification uses **real running** evidence, not just code?
- [ ] Performance/security checked against `GATE-REQUIREMENTS.md` thresholds?
- [ ] Defects filed and written into `issues.md` (`defects_flowed: yes`)?
- [ ] `functional/performance/security` fields and `reviewed` ready?
- [ ] Conclusion `result: pass|fail` explicit and confirmed with the user (`human_confirmed: true`)?

## Common pitfalls

- ❌ Relying only on existing tests instead of black-box testing the new logic
- ❌ Performance/security with no threshold baseline → unsupported conclusions (reference `GATE-REQUIREMENTS.md`)
- ❌ Finding defects but not flowing them back / into `issues.md` → defects get lost
- ❌ Ambiguous conclusion → the gate cannot release

## Output

- `TEST.md` (result=pass, three fields ready, reviewed, human_confirmed set, `status: complete`)