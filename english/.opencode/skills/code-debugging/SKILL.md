---
name: code-debugging
description: "Use when a feature doesn't work or behaves unexpectedly and you need to locate and fix the bug in a local dev environment, at a tactical granularity (not production incident root-causing). Front-load keywords: debugging, locate and fix, troubleshooting, feature not working, unexpected behavior, fix."
---

# Code Debugging

In a local/dev environment, quickly locate and fix a feature that isn't working or behaves unexpectedly. This is tactical-level troubleshooting; for in-depth root-cause analysis of production incidents, use `root-cause-analysis` instead.

## When to Use

- A feature errors out / returns wrong results / behaves oddly
- Debugging local code and pinpointing exactly which line has the problem
- A change broke existing functionality

## Inputs (What to Bring In)

- Description of the symptom (error stack trace / expected vs. actual)
- A reproducible path or triggering conditions
- The relevant code / recent changes

## Core Steps (Process)

1. **Reproduce it first**: Establish a stable reproduction path; without a repro you can't confirm a fix works.
2. **Bisect to localize**: Narrow the range from the symptom inward until you reach the specific method/branch/data.
3. **Find the root cause, not the symptom**: The visible effect may just be downstream—trace to the real trigger.
4. **Fix with minimal change**: Change only what must change; don't refactor along the way (refactoring belongs under safe-refactoring).
5. **Verify the fix**: Use the reproduction path to confirm the fix works, and check that it doesn't introduce regressions.

## Review / Self-Check Checklist

- [ ] Can I reproduce it reliably?
- [ ] Is the root cause being fixed, rather than just working around the symptom?
- [ ] Is the change minimal and does it avoid touching unrelated logic?
- [ ] Is the fix verified, with no regressions to existing functionality?

## Common Pitfalls

- ✗ Guessing without reproducing, wasting effort on empty changes
- ✗ Patching the symptom instead of the cause—the root stays, so another input blows up again
- ✗ Refactoring along the way just to fix a bug, turning a simple problem complicated
- ✗ Verifying only the erroring path and overlooking regressions in surrounding code

## Deliverable

- A fix that reaches the root cause with minimal changes and has been verified to pass