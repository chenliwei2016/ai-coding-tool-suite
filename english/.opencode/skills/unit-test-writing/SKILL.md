---
name: unit-test-writing
description: "Use when writing tests for newly added or modified logic to ensure the code itself is covered, not just relying on existing tests passing. Front-load keywords: write unit tests, unit test, add test coverage, test coverage, test case, self-test."
---

# Unit Test Writing

Add reliable tests for newly added/modified logic so that "the code I wrote is itself covered", not merely "the existing tests haven't regressed". This comes straight from a hard lesson: we only made sure the 324 existing tests didn't regress, and never wrote a single line of test for the new method.

## When to Use (when)

- Business logic was added or modified, and methods, branches, and boundaries need to be verified
- Self-testing before committing code
- Adding regression cases after fixing a bug

## Inputs (what to bring in)

- The methods, branches, boundaries, and exception paths touched by this change
- Existing test style and framework conventions

## Core Steps (process)

1. **List the points under test**: enumerate the must-test items for the new logic's branches, boundaries, exceptions, empty values, and critical values
2. **Cover the new logic, not just the old**: the priority is testing "what's new this time", not just running old tests for an all-green pass
3. **Write minimal, readable cases**: one case asserts one thing, and the name states the scenario clearly
4. **Verify both correct and error paths**: test normal returns as well as exceptions/boundaries
5. **Run and prove it actually works**: temporarily break the code and watch the case go red — only a case that can go red counts

## Review / Self-Check Checklist

- [ ] Does every new/modified branch and boundary have a corresponding assertion?
- [ ] Are the cases real, not just assembled to pass the eye test?
- [ ] Was comfort taken from "no regression in the old tests" while coverage of the new logic was missed?
- [ ] Can each case's name (English DisplayName) say what scenario it tests?

## Common Pitfalls

- ❌ Only running the existing tests for an all-green result, leaving the new method with zero coverage — half done
- ❌ Stuffing a pile of assertions into one case, so you can't tell where it failed
- ❌ Testing an overly idealized path, missing all boundaries/exceptions/empty values
- ❌ Writing cases whose assertions are always true, making them nothing but a formality

## Artifacts

- Test cases that cover the new logic and are readable and effective (break and they go red)