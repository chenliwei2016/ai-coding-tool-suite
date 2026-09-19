---
name: exploratory-testing
description: "Use when searching for bugs without a fixed script, being suspicious of everything, going beyond designed cases toward negative paths, abnormal and extreme inputs. Front-load keywords: exploratory testing, find bugs, suspicious, negative path, click around, abnormal input."
---

# Exploratory Testing

Hunt for defects deliberately without following a preset script, staying suspicious of everything. Writing test cases answers "what should the happy-path tests cover"; exploratory testing asks "where might it be hiding a problem." The triggers and mindset differ, so they're treated separately here.

## When to use

- Main flows are tested and you want to actively dig into boundaries and hidden issues
- A change introduces new risk and you suspect existing behavior is broken
- Cases can't cover it, yet you keep feeling "there's something lurking here"

## Inputs (what to bring in)

- The system/feature and the modules it depends on
- Known error-prone spots, historical pitfalls, and the changed surface

## Core steps (process)

1. **Question assumptions** — don't assume "users will use it as designed"; think about using it counter-intuitively
2. **Probe negative paths and extreme inputs** — abnormal, oversized, empty, special characters, out-of-bounds values, illegal states
3. **Cross-cutting interactions and ordering** — cross-feature, cross-page, repeated actions, disorder, rapid clicking
4. **Concurrency/races** — two entry points at once, interrupting with a refresh
5. **Follow the trail** — when something feels off, dig along the vine; don't just record the symptom

## Review/self-check checklist

- [ ] Am I actively hunting for problems, or just walking through the normal path once?
- [ ] Have I tried negative paths, extreme inputs, and abnormal states?
- [ ] Did I check the hidden areas: cross-feature interactions, races, ordering dependencies?
- [ ] When I found an issue, did I chase it to concrete repro and root-cause clues instead of stopping at "seems wrong"?

## Common pitfalls

- ❌ Slipping back into verifying "it works normally" instead of digging
- ❌ Testing only the inputs the design allows, so all of the user's nasty behavior goes unexercised
- ❌ Spotting an anomaly but not digging deeper, recording "it seemed to flicker" and moving on
- ❌ Mixing this with test-design, so there's neither a script nor an internal suspicion checklist

## Output

- Hidden defects that preset cases struggle to catch, with repro clues and root-cause direction

## Related

- Suspect dug up → use `code-debugging` / `root-cause-analysis` to locate the root cause
- Record the finding → use `bug-report-writing`