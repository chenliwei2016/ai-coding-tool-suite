---
name: frontend-ux-completion
description: "Use when designing a UI to handle all user-visible states—loading, empty, error, partial failure, disabled, rapid repeated clicks, and accessibility. Front-load keywords: frontend interaction, loading state, empty state, error state, robustness, accessibility, rapid repeated clicks, UX, a11y. A concern unique to the browser where users see every state."
---

# Frontend UX Completion

When designing a UI, consider and implement every state "the user can see": loading, empty, error, partial failure, disabled, boundary operations, rapid repeated clicks, and screen accessibility. The backend doesn't face "users seeing every state," so this is a frontend-specific skill.

## When to use

- Developing/reviewing a page or component and judging whether its states are complete
- Handling async processes, exceptions, extreme data, and interaction boundaries
- Making a feature robust for users and operations under different conditions

## Inputs

- The scenarios you face: loading, empty, errors, partial success, etc.
- Target users' devices, networks, and accessibility needs

## Core steps

1. **List all states**: loading / empty data / load failure / partial success / no permission / expired link
2. **Complete the loading state**: show loading, skeleton screens, and progress; on load failure show an error and retry rather than waiting forever
3. **Empty and error states**: friendly hints and next steps when there's no data; cause and remedy for errors
4. **Interaction boundaries**: disabled states, debouncing rapid repeated clicks, cancellability, timeout handling
5. **Accessibility (a11y)**: keyboard operable, semantic labels, contrast, focus management, readable by screen readers
6. **Extreme conditions**: slow networks, small screens, zoom, and partial resource-load failures

## Review/self-check checklist

- [ ] Are loading/empty/error/partial-failure/disabled/no-permission states all handled?
- [ ] Do failures show a reason and retry, instead of a spinner or white screen?
- [ ] Are rapid clicks/concurrent operations prevented or handled safely?
- [ ] Is it usable with keyboard and screen readers? Is focus/semantics correct?
- [ ] Is it robust under slow networks, small screens, and abnormal data?

## Common pitfalls

- ❌ Handling only the "ideal has-data" state, so a load failure gets stuck on the loading spinner
- ❌ A blank empty state, leaving users unsure whether there's no data or an error
- ❌ A button that allows endless rapid clicking, submitting the same info repeatedly
- ❌ Works only with a mouse; keyboard/screen reader unusable; contrast too low to read

## Deliverables

- A UI with all states covered, fallbacks on failure, robust interaction boundaries, and accessibility that meets standards

## Related

- Were these states tested? → use the positive/negative boundary coverage in `test-design`
- Performance states (jank/slowness) → use `frontend-performance-engineering`