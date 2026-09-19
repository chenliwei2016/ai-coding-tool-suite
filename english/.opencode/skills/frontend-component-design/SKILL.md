---
name: frontend-component-design
description: "Use when designing reusable frontend components—their public API (props/events/slots), controlled vs uncontrolled, composition, and reuse boundaries. Front-load keywords: component design, component reuse, props, controlled/uncontrolled, composition, component library, reusable component, compound. Works with the reuse/boundary detection in domain-modular-design."
---

# Frontend Component Design

Design reusable frontend components: pin down the public API (props/events/slots), controlled vs uncontrolled behavior, composition strategy, and reuse boundaries, so a component is safely reused across pages instead of being copied N times. This is the concrete application of the "boundary and reuse" thinking from `domain-modular-design` at the frontend component layer.

## When to use

- The same UI appears in many places; decide whether to extract a component and how to define its interface
- Design a component's public props/events/slots, defaults, and semantics
- Make a component both "works out of the box" and "flexible to extend"

## Inputs

- The scenarios/points of difference where the component is used, who reuses it, and how data flows in and out
- Style conventions from existing components/design language

## Core steps

1. **Confirm it's worth extracting**: look at the differences first; only extract when they're controllable (identify duplication with `domain-modular-design`)
2. **Design the public API**: props with clear semantics, consistent naming, types, and safe defaults; each event/slot has a single responsibility
3. **Controlled vs uncontrolled**: provide a controlled path for state the caller needs to own; default to uncontrolled so it works out of the box
4. **Prefer composition over inheritance**: extend via slots/composition/higher-order patterns rather than building an endlessly-configurable "god component"
5. **Mind the reuse cost**: extracting should make it easier to maintain, not over-abstract for the sake of reuse
6. **Write usage examples**: make it obvious to callers how to use the component and how to adjust the points of difference

## Review/self-check checklist

- [ ] Is extraction worth it? Are differences controlled through parameters rather than a component stuffed with if-else?
- [ ] Are props/event names and semantics clear, typed, with reasonable defaults?
- [ ] Is there a controlled path for state that needs external involvement?
- [ ] Is it extended by composition, or does it bloat into a god component from stacking config options?
- [ ] Is reuse easier to maintain than copy-paste, not abstraction for abstraction's sake?

## Common pitfalls

- ❌ Building a god component with dozens of if-else branches for one or two differences
- ❌ Careless API naming, no types, unsafe defaults that trip up users
- ❌ No controlled path where one is needed, so callers can't take over state
- ❌ No examples, so callers are unsure how to use it and rebuild it themselves

## Deliverables

- A component with a clear API that works out of the box yet is extensible, low reuse cost, and comes with examples

## Related

- Reuse/boundary decisions → use `domain-modular-design`
- Covering all component states → use `frontend-ux-completion`
- State flow inside a component → use `frontend-state-flow-design`