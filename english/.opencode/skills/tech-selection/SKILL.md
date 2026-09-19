---
name: tech-selection
description: "Use when choosing between candidate solutions, frameworks, libraries, or architectural approaches and need an evidence-based tradeoff decision. Front-load keywords: tech selection, solution comparison, tradeoff, weighing options, selection, compare, pros/cons."
---

# Tech Selection

Make **evidence-based** tradeoffs among multiple candidate solutions/technologies and arrive at a conclusion that is implementable and defensible.

## When to use (when)

- Choosing among frameworks, libraries, middleware, or architectural patterns
- The same requirement has multiple candidate implementation paths that are hard to tell apart
- Making a decision when "more popular in the industry" conflicts with "more suitable for this project"
- You need to explain the selection rationale to the team/reviewers

## Input (what to bring in)

- The decision to be made and the list of candidate solutions
- Real constraints (team skills, cost, compliance, runtime environment, maintenance horizon)
- Dependent context (existing tech stack, established conventions)

## Core steps (process)

1. **Clarify the decision dimensions first**: State the criteria for selection upfront instead of jumping straight to comparing features
2. **Normalize candidates across common dimensions for a fair comparison**: Evaluate all candidates under the same dimensions; avoid judging A on dimension one and B on dimension two
3. **Identify key constraints**: Which are hard constraints (compliance/runtime environment/team) and which are soft constraints you can compromise on
4. **Make a tradeoff, not a list**: Give a conclusion explaining why you chose it, what you gave up, and at what cost
5. **Record the decision rationale**: Write the selection conclusion and rationale into a document so later readers understand "why not the other one"

## Review/self-check checklist

- [ ] Is the decision based on real constraints rather than "popularity" or "being familiar"?
- [ ] Does the evaluation cover easily overlooked aspects such as compliance/maintenance/team skills?
- [ ] Did you give an explicit conclusion + the options you rejected + the rationale? (rather than "anything works / depends")
- [ ] Is the rationale recorded in writing so future readers can trace it back?

## Common pitfalls

- ❌ Looking only at the feature matrix, ignoring "can the team handle it" and "who maintains it long-term"
- ❌ Treating "industry standard / everyone uses it" as the rationale without tying it to your own constraints
- ❌ Shying away from responsibility by saying "anything works" — effectively throwing the decision back at the asker
- ❌ Ending the selection without recording anything, so three months later nobody remembers why you chose this

## Outputs

- Selection conclusion + dimension-by-dimension comparison + explicit tradeoff rationale + decision record