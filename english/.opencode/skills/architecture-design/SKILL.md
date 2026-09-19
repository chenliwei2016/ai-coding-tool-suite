---
name: architecture-design
description: "Use when turning requirements or ideas into system architecture and technical design, including layering, components, data model, or calling relationships. Front-load keywords: architecture design, overall solution, layering, components, technical approach, architecture, design, decomposition, system design."
---

# Architecture Design

Turn vague requirements or ideas into a structured, implementable system technical approach.

## When to use (when)

- You take on a feature or requirement and need to produce an overall technical approach
- You need to implement the same capability across **multiple objects** (decision: one implementation vs. extracting a shared layer)
- You need to split modules, define layers, design components, and calling relationships
- You need to decide between "hardcoding a bunch of branches" and "parameterized/abstracted design"
- You change structures such as trees, navigation, or layout that **cut across all pages**

## Input (what to bring in)

- Requirements/business goals, constraints, and acceptance criteria
- Existing code structure and established patterns (explore first — don't design from scratch)
- The scope and impact of the change

## Core steps (process)

1. **Understand the current state before acting**: Read the relevant code, identify existing patterns and conventions, and clarify the scope of the change
2. **Identify duplication**: Find "implementations that are structurally identical across multiple objects" and prioritize extracting a reusable unit over copying N copies
3. **Think before doing**: Restate your understanding of the business/current state before acting, list open questions, and confirm important approaches with the user first
4. **Prefer parameterization over hardcoding**: For dimensions that "scale to multiple types/elements with a clear growth direction", design for dynamic adaptation by parameter/type rather than hardcoded branches
5. **Control the granularity of change**: For cross-cutting changes (trees/navigation/layout), assess impact first and proceed in small steps

## Review/self-check checklist

- [ ] Did you reuse existing capabilities instead of reinventing the wheel?
- [ ] Is the shared implementation genuinely general (still holds in another scenario), or is it over-abstraction?
- [ ] Multiple-identical-objects → did you extract a reusable component/function (instead of copying)?
- [ ] Extensible dimensions → did you parameterize rather than hardcode (e.g., field-level labels/enum mappings)?
- [ ] Cross-cutting structural change → did you list the impact and proceed in small steps?

## Common pitfalls

- ❌ Jumping straight into code without first understanding the current state → conflicts with existing patterns, rework
- ❌ Copy-pasting N copies → a common problem has to be fixed in N places; not extracting one means everyone has to change with it
- ❌ Hardcoding branches for "multiple types/elements with a clear growth direction" → adding a new type means adding branches everywhere, getting messier each time
- ❌ Over-generalizing → abstracting for its own sake, adding unnecessary complexity

## Outputs

- Technical approach/design document (including scope, structure, tradeoffs, implementation steps, acceptance criteria)
- Explanation of the reusable unit extracted and how it is reused