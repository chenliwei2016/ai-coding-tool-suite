---
name: frontend-performance-engineering
description: "Use when optimizing frontend performance during development—initial load and rendering—regarding bundle size, lazy loading, hydration, LCP/CLS/FPS, and long lists. Front-load keywords: frontend performance, first screen, bundle size, lazy loading, hydration, LCP, CLS, FPS, long lists, white screen, performance optimization, bundle, lazy load, jank. Contrast with non-functional-testing which measures and reports rather than improves."
---

# Frontend Performance Engineering

During development, push up the frontend's **initial-load and rendering performance**: control bundle size, load on demand, reduce blocking, optimize hydration and rendering, and handle long lists and jank. Its trigger time ("how to make it faster", during development) is the opposite of `non-functional-testing` ("measure and report"), so the two are split apart.

## When to use

- The first screen loads slowly, there's a long white screen, or the bundle is large
- Scroll janks, long lists render slowly, or there are frequent reflows
- You need to raise performance metrics (LCP/CLS/FPS/bundle size) without changing the product

## Inputs

- Current performance status (measurement data / perceptible jank)
- Page structure, dependencies, and rendering approach (SSR/CSR, component tree, resource loading)

## Core steps

1. **Measure before optimizing**: use real metrics (LCP/CLS/FPS/bundle composition) to locate the bottleneck; don't optimize on gut feeling
2. **Control first-screen bundle**: load on demand/lazy-load, split bundles, remove or externally link heavy dependencies
3. **Reduce blocking and the critical path**: inline critical CSS, defer non-critical resources, reduce main-thread blocking
4. **Hydration/rendering optimization**: dedupe SSR hydration, virtual lists, avoid needless re-renders
5. **Keep it stable and smooth**: lower CLS (layout stability), lower FPS jank (use compositing layers for animations)
6. **Watch for regressions**: set a performance budget to stop later changes from undoing the gains

## Review/self-check checklist

- [ ] Are you optimizing with measurement data, or shooting in the dark?
- [ ] Did first-screen bundle/critical path shrink? Are heavy dependencies loaded on demand?
- [ ] Are hydration and duplicate renders optimized? Do long lists stay smooth?
- [ ] Is CLS (layout shift) and FPS (animation jank) stable?
- [ ] Is there a performance budget/monitoring to prevent regression?

## Common pitfalls

- ❌ Optimizing without measuring, spending all the effort on something that isn't the bottleneck
- ❌ Fragmenting the whole dependency library for the first screen, making things worse
- ❌ Watching only LCP and forgetting CLS layout shift and scroll jank
- ❌ No budget after optimizing, so the next version quietly gets slower again

## Deliverables

- A frontend that loads and renders faster, stays stable and smooth, and has monitoring to prevent regression

## Related

- Pre-release performance measurement/reporting → use `non-functional-testing`
- Correctness of state and rendering → use `frontend-state-flow-design`