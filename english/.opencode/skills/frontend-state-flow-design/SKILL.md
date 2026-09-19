---
name: frontend-state-flow-design
description: "Use when designing the state and data flow of a frontend page—local vs server state, store partitioning, stale data, races, optimistic updates and refills. Front-load keywords: state management, data flow, store, frontend state, stale data, races, optimistic update, loading. A concern specific to the browser that backend design does not share."
---

# Frontend State & Data Flow Design

Design where a piece of data on a frontend page "comes from, where it's stored, how it becomes stale and updates, and how it's shared across components," and design away browser-specific problems like stale data, races, and optimistic updates. The same problem barely exists in backend design, so this is a frontend-specific skill.

## When to use

- A new page/complex interaction where you must decide which layer state lives in and how it's passed
- Distinguish between local (transient UI) state and server-data state, each with its own ownership and lifecycle
- Handle state correctness during data refresh, invalidation, concurrency, and optimistic interactions

## Inputs

- The page/feature's data sources, update timing, and sharing scope
- User interactions (edit, submit, refresh, multiple tabs) and the existing store structure

## Core steps

1. **Distinguish the nature of state**: manage local UI state (dialog toggles, selection) separately from backend data state; don't mix them
2. **Define ownership and sharing boundaries**: decide whether a piece of data stays local or is promoted/delegated to global, keeping the sharing scope minimal
3. **Define data fetching and invalidation**: when to fetch, when to invalidate and refetch, and the expiry policy for cached/stale data
4. **Handle races**: rapid clicks/concurrency/out-of-order responses; prevent stale responses from overwriting new state
5. **Handle optimism and refills**: orchestrate rollback/refill for optimistic updates, with a fallback on failure
6. **Restore correctness**: after page refresh, navigating away and back, or concurrent multi-source updates, keep the UI consistent with the backend

## Review/self-check checklist

- [ ] Are local and backend state clearly separated, without shoving transient UI state into the global store?
- [ ] Is the state-sharing boundary kept minimal?
- [ ] Does stale data expire? Is the cache-invalidation policy clear?
- [ ] Are races and out-of-order responses handled so old responses can't overwrite new state?
- [ ] Do failed optimistic updates roll back/refill, and is the UI consistent with the backend after a refresh?

## Common pitfalls

- ❌ Shoving all state into the global store, going global for any cross-component case, and relying on manual cleanup for invalidation
- ❌ No cache invalidation, showing expired data to users
- ❌ Ignoring races, where a slow request arriving late overwrites newer results
- ❌ No rollback on optimistic updates, so the UI pretends success even when the submission fails

## Deliverables

- A state design with clear local/server boundaries, controllable invalidation and races, and predictable correctness

## Related

- Component extraction/reuse → use `frontend-component-design` / `domain-modular-design`
- When something breaks → use `code-debugging`