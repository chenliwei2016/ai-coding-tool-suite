---
name: domain-modular-design
description: "Use when splitting a system into modules, defining responsibility boundaries, interfaces, or doing domain modeling, to keep components decoupled. Front-load keywords: domain modeling, module splitting, responsibility boundaries, interface design, decoupling, anti-corruption boundary, domain, modular, module boundary, interface."
---

# Domain & Modular Design

Break a system into modules with clear responsibilities, well-defined boundaries, and stable interfaces, so the code does not rot.

## When to use (when)

- Initial division of modules / submodules / package structure
- Defining interfaces between modules, dependency direction, and calling contracts
- Refactoring a module that has already become a tangled mess
- Judging which module/layer a piece of logic belongs to

## Input (what to bring in)

- Business capability map / domain concepts
- Existing modules and their responsibilities
- Desired degree of coupling and extension points

## Core steps (process)

1. **Understand the current state and existing boundaries first**: Understand how responsibilities and conventions are currently divided before designing — don't start from scratch
2. **Divide modules by responsibility/domain rather than by technology**: Related responsibilities cohere within a module; keep coupling low across modules
3. **Make dependency direction explicit**: Define "who may depend on whom" to avoid circular dependencies
4. **Design stable interfaces**: Keep the external interface of a module simple and stable so internal implementation can vary freely
5. **Apply anti-corruption**: Prevent external changes (e.g., third-party/detail implementations) from seeping into core business logic

## Review/self-check checklist

- [ ] Are modules divided by "responsibility/domain" rather than mistakenly by "technical layer/file type"?
- [ ] Is dependency direction consistent and acyclic?
- [ ] Is the external interface stable and minimal?
- [ ] Can "one requirement change be handled in just one module"? (rather than rippling across many)
- [ ] Does the new module reuse existing boundaries and naming conventions?

## Common pitfalls

- ❌ Designing without looking at existing boundaries → the new division fights existing patterns
- ❌ The interface exposes internal details, so any changes to the internals break the callers
- ❌ Not applying anti-corruption where needed → third-party details penetrate all the way into the business layer
- ❌ Circular dependencies between modules → one change ripples through the whole system

## Outputs

- Module/boundary/interface description, dependency relationships, and a concrete write-up of responsibility assignment