---
name: feature-implementation
description: "Use when turning a scoped task or ticket into working code that matches the surrounding codebase's style and contract. Front-load keywords: feature implementation, implement feature, write code, complete a ticket, change functionality, code it up, land code."
---

# Feature Implementation

Turn a refined task into runnable code that matches the codebase's existing style and contract.

## When to Use (when)

- Have a clear ticket/requirement and need to turn a plan into code
- Add or modify a feature point within an existing module
- Have a design but are still fuzzy on "what this code should look like"

## Inputs (what to bring in)

- Task description / design doc / acceptance criteria
- Relevant existing code (reference implementations of similar features)

## Core Steps (process)

1. **Read the surrounding contract first**: method signatures, types, callers, exception conventions — don't assume
2. **Mirror existing patterns**: find similar features and follow their style; stay consistent rather than inventing a new one
3. **Implement in small steps**: land one piece of logic at a time, avoiding a single large batch of changes
4. **Verify it compiles**: surface type errors, duplicate imports, and similar issues immediately
5. **Run the relevant tests**: tests affected by the change must pass; add new tests when needed

## Review / Self-Check Checklist

- [ ] Does the implementation hug the surrounding contract without breaking existing behavior?
- [ ] Is style, naming, and structure consistent with surrounding code?
- [ ] Do compilation and the relevant tests pass?
- [ ] Were duplicate code / over-engineering introduced just to be fast?

## Common Pitfalls

- ❌ Diving in without reading the contract, then reworking a lot after the interface changes
- ❌ Skipping the mimicry step and inventing a personal style, only to be asked to rewrite in review
- ❌ Changing a pile at once without compiling or testing, leaving nowhere to isolate problems
- ❌ Copy-pasting N copies instead of extracting shared code (spot duplication with design-code-review)

## Artifacts

- Feature code that is runnable, matches the style and contract, and is backed by tests

## Related

- Boundaries / anti-corruption → reuse `domain-modular-design`
- Self-review → reuse `design-code-review`