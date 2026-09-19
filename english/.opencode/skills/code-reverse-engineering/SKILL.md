---
name: code-reverse-engineering
description: "Use when confronting a foreign, legacy or undocumented codebase and needing to recover business rules, data flows and design intent from the implementation, then distill into understandable knowledge. Front-load keywords: reverse engineering, understand codebase, parse the code, recover business rules, explore the code, business rule extraction."
---

# Code Reverse Engineering

For unfamiliar / legacy / poorly documented codebases, reverse the business rules, data flows, and design intent out of the implementation, and distill them into knowledge that is understandable, explainable, and safe to modify against. It is the "reverse" of `feature-implementation`: forward engineering writes requirements into code; reverse engineering restores code back into requirements.

## When to Use

- Taking over / reading unfamiliar or legacy code with little or no documentation
- Before modifying, migrating, or reviewing behavior built on an old implementation, you first need to understand what it actually does at the business level
- Turning the team's accumulated implementations into knowledge documents

## Inputs (What to Bring In)

- The target codebase / module / a particular implementation
- Known external clues: entry points, callers, comments, tests, deployment environment

## Core Steps (Process)

1. **Survey the skeleton and entry points first**: project structure, module boundaries, main flow entry—don't dive into details right away.
2. **Follow a main path end-to-end**: pick a real feature and trace the full chain from its entry to where data lands / exits.
3. **Converge implementation details into business rules**: constants, branches, validations, state machines, mappings → what business constraint lurks behind each.
4. **Spot conventions and recurring patterns**: repeated structures, naming habits, "written this way everywhere" → often hides a team convention or hard-won lesson.
5. **Produce structured knowledge**: a list of rules / data model / call graph / design intent, each marked with its **supporting evidence**, and distinguish "certain" from "guess".
6. **Cross-validate**: use comments, docs, callers, and tests to corroborate one another and reduce the share of conjecture.

## Review / Self-Check Checklist

- [ ] Did I recover "what it does at the business level," or only restate what the code literally does?
- [ ] Is every conclusion marked with its basis? Are certainties separated from guesses?
- [ ] Does it cover data flow and design intent, not just a list of functions?
- [ ] Was it cross-validated with independent clues, or drawn from only one corner of the code?
- [ ] Can the output support "make changes safely based on this"?

## Common Pitfalls

- ✗ Diving straight into function details, then forgetting it all without forming an overall picture
- ✗ Treating "how the code does it" as "why the business does it," losing the intent
- ✗ Concluding from a single piece of code without cross-validation, mistaking conjecture for fact
- ✗ Producing a stream-of-consciousness log with no distinction of rules / intent / evidence

## Deliverable

- A document that restores the black-box code into business rules and design intent that are understandable, explainable, and safe to modify against

## Related

- Clarify boundaries → reuse `domain-modular-design`
- Write up findings → reuse `tech-writing`
- Judge what should be touched → combine with an assessment of core assets vs. legacy code