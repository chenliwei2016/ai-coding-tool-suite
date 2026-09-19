---
name: non-functional-testing
description: "Use when running non-functional tests before a release—performance benchmarks, open-source vulnerability scanning, and penetration testing—and producing an NFR report that leadership uses to approve the go-live. Front-load keywords: non-functional testing, performance testing, penetration testing, vulnerability scan, load test, stability, report, NFR, security review."
---

# Non-Functional Testing

Before a release, run non-functional validation on the system — **performance, security vulnerabilities, penetration** — and produce a **non-functional test report** that leadership can review as one basis for approving the go-live. This is a gate independent from functional regression (`regression-release-gate`) — leadership only signs off after seeing this report.

## When to Use (when)

- Non-functional validation is needed before a release: performance meets targets, no high-severity vulnerabilities, penetration passes
- A "leadership will sign off" report is needed as the basis for going live
- Assessing whether a version can withstand real traffic and security attacks

## Inputs (what to bring in)

- Release scope and change surface, target/historical performance baselines
- Production traffic estimates, SLA/SLO, compliance and security requirements
- List of third-party dependencies (for vulnerability scanning)

## Core Steps (process)

1. **Define metrics and targets**: clarify what to measure (performance: TPS/response time/resource usage/stability; security: vulnerability severity; penetration: attack surface), and align on what "passing = X" means
2. **Establish a baseline**: historical or expected baseline; without one, discussing "did it worsen" is meaningless
3. **Performance/load test**: apply load based on estimated traffic, observing throughput, latency, CPU/memory/connection counts, and finding bottlenecks and inflection points
4. **Open-source vulnerability scan**: run third-party dependencies against vulnerability databases, grade by severity, and note CVEs with fixes or mitigations
5. **Penetration test**: drill the attack surface (injection/privilege escalation/authentication/sensitive data) and record exploitability
6. **Grade the conclusion**: classify results into 【Pass】【At risk but shippable (conditional)】【Blocked】
7. **Produce the report**: metrics → data → conclusions → residual risk → whether release conditions are met, handed to leadership for the decision

## Review / Self-Check Checklist

- [ ] Do the metrics have clear targets aligned to a "pass line" (not just raw numbers)?
- [ ] Is there a performance baseline to compare against, answering "did it worsen vs. before"?
- [ ] Are vulnerabilities graded by severity, CVEs traceable, with fix or mitigation recommendations?
- [ ] Does penetration cover the key attack surface rather than going through the motions?
- [ ] Is the conclusion explicit — pass / conditional / blocked — not a vague "seems fine"?
- [ ] Does the report directly support leadership's go-live decision?

## Common Pitfalls

- ❌ Loading tests without a verdict, dumping a pile of TPS numbers but no "meets target or not" judgment
- ❌ No baseline, so the measured numbers can't be interpreted as good or bad
- ❌ Missing stability/capacity/resource trends, only running once in an ideal environment
- ❌ The vulnerability scan only checks "present or not", ignoring severity, exploitability, and whether it hits the release gate
- ❌ The report piles up data without landing a conclusion, leaving leadership unable to decide

## Artifacts

- A non-functional test report covering performance/vulnerabilities/penetration, with clear grading, that directly supports the go-live decision

## Related

- Functional-dimension sign-off → use `regression-release-gate` (non-functional and functional are two independent gates)
- Automating performance runs → reuse `automated-test-suite`'s stability/feedback ideas
- Writing the report → reuse `tech-writing`