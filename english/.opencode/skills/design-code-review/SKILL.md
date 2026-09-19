---
name: design-code-review
description: "Use when reviewing a design, PR, or code for real problems in architecture, security, performance, correctness, and maintainability, giving focused feedback. Front-load keywords: code review, design review, critique, review, find problems, assess, review code, stakes."
---

# Design & Code Review

Review design proposals and code, surfacing the problems that **actually matter** rather than nitpicking.

## When to use

- Reviewing someone else's (or your own) technical proposal, PR, or code commit
- Judging whether a piece of design/code is worth merging
- Helping the team gate quality and consistency

## Inputs (what to bring in)

- The design or code under review
- Context: the problem it solves, constraints, and existing conventions
- The features and scope of changes involved

## Core steps (process)

1. **First understand what it solves** — reviewing without understanding the intent tends to cause collateral damage
2. **Layered review from heavy to light** — start with architecture and correctness (does the design hold up, is the logic sound), then security/performance, and finally style
3. **Spot duplication and patterns** — finding multiple isomorphic spots suggests extracting shared code; spotting hair-pointer/layer violations points to misplaced responsibilities
4. **Give actionable feedback** — point at the problem and suggest a direction, rather than just shouting "there's a problem"
5. **Separate blockers from suggestions** — make clear what must change versus what is a suggestion; don't blur the two

## Review/self-check checklist

- [ ] Did you look first at architecture/correctness/security, or get stuck on naming/formatting?
- [ ] Did you identify repeated patterns (multiple isomorphic spots that warrant shared extraction)?
- [ ] Does each piece of feedback offer an actionable direction, not just criticism?
- [ ] Did you distinguish "must change" from "could optimize" to avoid over-blocking?

## Common pitfalls

- ❌ Fixating on naming/blank lines and missing the real architecture/security problems
- ❌ Reaching conclusions without understanding the intent, unfairly rejecting reasonable design
- ❌ Outputting problems without solutions, leaving feedback unactionable
- ❌ Treating everything as a blocker, grinding the team to a halt

## Output

- A prioritized review conclusion: must-change / strongly recommended / optimization opportunities