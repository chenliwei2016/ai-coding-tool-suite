---
name: bug-report-writing
description: "Use when writing a defect/ticket that others can reproduce and triage: clear repro steps, environment, expected vs actual, and priority/severity. Front-load keywords: defect ticket, file a bug, bug report, report issue, reproduction steps, priority, severity, create ticket."
---

# Bug Report Writing

Turn a discovered problem into a defect ticket that others can reproduce, investigate, and triage without any explanation from you. The output is an "actionable ticket," not a "description of the symptom."

## When to use

- You found a defect and need to file a ticket/defect report
- You want developers to start work without chasing you for "how do I reproduce it"
- You need to report an issue and state clearly how urgent it is and how large the impact

## Inputs (what to bring in)

- The symptom, the triggering path, actual vs expected
- Environment info, implicated versions/data, and blast radius

## Core steps (process)

1. **Title equals summary** — at a glance you can see "which feature, what problem"
2. **Give stable repro steps** — write actions, inputs, and environment in order so others can reproduce by following along
3. **Expected vs actual** — make explicit "what should have happened" and "what actually happened"
4. **Provide environment and clues** — system/version, libraries/data, logs/screenshots/errors to help locate it quickly
5. **Set priority and severity** — blast radius × urgency, so issues are ranked
6. **Jot down impact in passing** — which users/features are affected, to aid scheduling

## Review/self-check checklist

- [ ] Can someone reproduce it by following the steps, rather than a pile of "it seems like"?
- [ ] Did you provide expected vs actual, environment, and clues?
- [ ] Is there a basis for priority/severity (blast radius × urgency)?
- [ ] Is it an "actionable ticket" or just a single sentence about "what broke"?

## Common pitfalls

- ❌ Writing only "this is broken" with no repro steps, so developers guess at everything
- ❌ Expected/actual not stated clearly, so it's unclear whether this is a bug or a usage problem
- ❌ Missing environment/data/log clues, driving up the cost of locating the defect
- ❌ Marking every defect "most urgent," which in effect means there's no priority at all

## Output

- A defect ticket that is reproducible, locatable, clearly prioritized, and actionable for scheduling