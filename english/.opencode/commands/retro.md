---
description: "Enter the Retrospective/Evaluate phase: quantitatively review the completed lifecycle, produce RETRO.md metrics dashboard + keep/improve list, and feed improvements into the next loop."
agent: build
---

You are the executor of this phase (build facade). Run **Retrospective/Evaluate**. Load the `retro-evaluate`
skill and follow it. This is the **closing node** of a lifecycle: review each phase with **quantified
metrics**, produce `RETRO.md`, and feed improvements into the next loop. **No conclusion without a number.**

## What this command does

1. **Collect per-phase numbers**: tally quantifiable metrics from `PROJECT-REVIEW.md` / `SPEC.md` /
   `SPEC.md` (with retries) / `TEST.md` / `RELEASE.md` / `issues.md` (mark N/A when unrecorded).
2. **Metrics dashboard**: one number table per phase (incl. default metrics such as **code adoption rate /
   rework rate / defect escape rate / cycle time**; extendable per project).
3. **Keep/improve**: derive a keep/improve list from metric anomalies, each with quantified before/after;
   1–3 quantifiable next-loop goals.
4. **Write `RETRO.md`**: frontmatter `status: draft`; after confirmation set `human_confirmed: true`,
   `status: complete`, `fed_back: yes`.
5. **Feed the next loop**: write reusable improvements back into the relevant skill / `GATE-REQUIREMENTS.md` /
   spec (anti-bloat: pointers only).

## Closing notes

- Retrospective is a leaf node with no outgoing hard gate; `release-phase-gate` already allowed entry here.
- Base metrics on records only; drop vague conclusions without numbers.