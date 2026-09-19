---
name: automated-test-suite
description: "Use when building or maintaining an automated test suite (API and E2E): layering cases, keeping them stable, repeatable and fast, and guarding against flaky tests. Front-load keywords: automated testing, test suite, API tests, E2E, case layering, stable, not flaky, flaky."
---

# Automated Test Suite

Build and maintain a suite of API/E2E automated tests that is **stable, repeatable, fast to give feedback, and not flaky**. The worst thing about automation is a result that changes on every run — then nobody trusts it anymore.

## When to Use (when)

- Building a new set of API/E2E automated tests
- Maintaining/fixing flaky items in an existing suite
- Deciding what deserves automation and what does not

## Inputs (what to bring in)

- The feature points and API contracts to be automated
- Existing tests, known flaky items, CI/execution environment

## Core Steps (process)

1. **Layer and choose**: unit → API → E2E each has its role; push things down rather than piling them into E2E (E2E is expensive and fragile)
2. **Make each case independent and repeatable**: set up and tear down its own preconditions; do not depend on run order or on data left behind by others
3. **Keep it stable and idempotent**: root out intermittent failures first (waiting, data isolation, clean environments)
4. **Fast feedback**: the suite is fast enough that "run it and get a verdict" beats "wait an hour"
5. **Treat failure-noise**: a flaky case must either be fixed to be stable or be flagged and quarantined; do not let occasional failures mask real ones
6. **Feed regression**: plug into CI and make it one of the inputs to the release gate

## Review / Self-Check Checklist

- [ ] Are the cases layered sensibly? Is anything that belongs in a unit test being crammed into E2E?
- [ ] Is each case independently repeatable, unaffected by order or dirty data?
- [ ] Is it non-flaky — consistent results across repeated runs and stable over time?
- [ ] Is feedback fast? Can a failure message be spotted at a glance?

## Common Pitfalls

- ❌ Dumping everything into E2E — slow and fragile, one small change breaks a wide area
- ❌ Cases depend on execution order and shared data, breaking at the slightest touch
- ❌ Turning a blind eye to occasional failures, eroding trust in the suite and drowning out real failures
- ❌ Using random sleeps to be "fast", which only makes tests less stable

## Artifacts

- An automated test suite that is well layered, stable and repeatable, fast to give feedback, and ready for regression

## Related

- Whether the test code itself is reliable → `feature-implementation` / `unit-test-writing`
- Suite results → feed into `regression-release-gate` as the basis for signing off on a release