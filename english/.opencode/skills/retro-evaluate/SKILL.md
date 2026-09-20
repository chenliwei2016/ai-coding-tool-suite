---
name: retro-evaluate
description: "Use when running an optional but high-yield retrospective after a completed lifecycle: produce RETRO.md with a quantified metrics dashboard per phase and keep/improve lists feeding the next loop, grounded in numbers like code-adoption and rework rate. Front-load keywords: retrospective, retro, evaluate, metrics, adoption rate, rework rate, defect escape, cycle time."
---

# Retro / Evaluate

Run a high-yield retrospective **after a completed lifecycle (init → release)**: produce `RETRO.md`
with a **quantified metrics dashboard** for each phase, keep what worked and fix what didn't, and feed
improvements into the **next loop**. **No conclusion without a number goes into RETRO.md.**

## When to use

- A `release` just completed (`RELEASE.md` `deployed: yes`); wrap up / start the next loop
- You want to quantify whether the AI-assisted workflow actually worked
- You want to bank improvements and avoid repeating mistakes next loop

## Input (what to bring in)

- Per-phase deliverables & state: `PROJECT-REVIEW.md` / `DESIGN.md` / `PLAN.md` (with item retries) /
  `TEST.md` / `RELEASE.md`
- `issues.md` (defect record)
- Use the `knowledge-retrospective` approach to distill

## Core steps

1. **Collect per-phase numbers**: tally quantified metrics from the deliverables above (only count what is
   recorded; mark otherwise N/A).
2. **Build the metrics dashboard**: one number table per phase (see template below).
3. **Extract improvements**: derive a keep/improve list from metric anomalies, each with quantified before/after.
4. **Write `RETRO.md`**: frontmatter `status: draft`; body has the dashboard, keep/improve, and next-loop goals.
5. **Human confirmation**: `question` to present the dashboard and keep/improve; on confirmation set
   `human_confirmed: true`, `status: complete`.
6. **Feed the next loop**: write reusable improvements back into the relevant skill/spec (anti-bloat: pointers only).

## Required default metrics (one table per phase; extend as needed)

| Phase | Quantified metric |
|---|---|
| Init | time to deliver; PROJECT-REVIEW required fields passed first time |
| Design | design-review first-pass rate; requirements sign-off rounds |
| Plan | plan accuracy (estimate vs actual deviation %); acceptance pass rate % |
| Dev | **code adoption rate %** (AI-suggested/generated code actually kept); **rework rate %** (items with retries>0); item first-pass rate % |
| Test | **defect escape rate %** (found in test ÷ total defects); coverage delta; gate first-block count |
| Release | release time; 0 rollback count; verification pass rate |
| Whole chain | cycle time (init→deploy total); per-phase duration; total gate blocks |

## Deliverable: RETRO.md template

```markdown
---
status: draft
metrics_row: no
improvements_row: no
fed_back: no
human_confirmed: false
---

# RETRO — <loop>

## 1. Metrics dashboard
| Phase | Metric | Value | Last loop | Delta |

(one table per phase; mark N/A when no data; no airy conclusions)

## 2. Keep
- What worked and should be maintained (with numbers)

## 3. Improve
- What to change, how, and expected quantified gain

## 4. Next-loop goals
- 1-3 quantified goals for this loop

## 5. Feedback written back
- Written back to which skill / spec (anti-bloat, pointers only)
```

## Self-check checklist (soft gate)

- [ ] Every conclusion backed by a number (else N/A or drop)?
- [ ] Required default metrics (adoption rate, rework rate, defect escape, cycle time) present?
- [ ] Keep/improve have quantified before/after?
- [ ] Next-loop goals quantifiable?
- [ ] `human_confirmed: true`, `status: complete`, `fed_back: yes`?

## Common pitfalls

- ❌ Vague summaries with no numbers → not a real retro
- ❌ Retro only, never actionable → nothing changes; improvements not fed next loop
- ❌ Fabricated/estimated metrics → misleads the next loop

## Output

- `RETRO.md` (quantified metrics dashboard + keep/improve + next-loop goals, `human_confirmed: true`,
  `status: complete`), fed into the next loop