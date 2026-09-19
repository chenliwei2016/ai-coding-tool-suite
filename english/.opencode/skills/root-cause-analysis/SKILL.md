---
name: root-cause-analysis
description: "Use when investigating a bug, incident, or failure to find the fundamental cause and propose a systemic fix, rather than a band-aid. Front-load keywords: root cause analysis, locate the problem, troubleshooting, bug investigation, why, root cause, debugging, root-cause, incident."
---

# Root Cause Analysis

Trace from the symptom back to the fundamental cause and deliver a systemic solution, rather than applying a superficial patch.

## When to Use

- A bug, error, performance issue, or anomaly appears in production/testing
- The symptoms are clear but the underlying reason can't be explained
- A problem recurs (fixed once, then resurfaces)
- Reviewing an incident to find "what truly should be changed"

## Inputs (What to Bring In)

- The symptom / error / reproduction steps
- Relevant logs, data, and environment information
- Clues and prior knowledge gathered during the investigation

## Core Steps (Process)

1. **Reproduce first, then localize**: A stable reproduction is worth more than piling up logs.
2. **Trace the chain outward-to-inward**: Work from the surface effect layer by layer back to the source, distinguishing the "trigger" from the "root cause".
3. **Validate hypotheses**: Don't rely on guesses—use evidence (logs / data / minimal repro) to disprove or confirm.
4. **Separate root cause from trigger**: The trigger is a one-off accident; the root cause is the underlying defect that made that accident possible.
5. **Give a systemic fix, not a patch**: Fix so the same class of problem can't recur, and include preventive measures.

## Review / Self-Check Checklist

- [ ] Is the conclusion evidence-based rather than guesswork?
- [ ] Is the finding a true "root cause," or just "the point that triggered it this time"?
- [ ] Does the fix prevent the same class of problem, or only patch the one instance in front of you?
- [ ] Have regression tests / monitoring / alerting been added to prevent recurrence?

## Common Pitfalls

- ✗ Declaring it "fixed" at the first layer of cause without asking "why did it get to this point"
- ✗ Concluding on guesswork/experience without validating the hypothesis
- ✗ Treating the trigger as the root cause—fixing the immediate case while the whole class returns
- ✗ Only defending in code without adding tests/alerts—"fixed" but with no prevention mechanism

## Deliverable

- Root-cause conclusion + evidence chain + systemic fix plan + recurrence-prevention measures