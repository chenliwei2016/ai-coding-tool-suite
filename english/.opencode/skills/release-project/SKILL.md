---
name: release-project
description: "Use when entering the release/deploy phase: build, verify in a version-verification environment, pre-prod review, then release to production following the declarative RELEASE-PLAN.md, producing RELEASE.md with a deployed state + human confirmation before handoff to retrospective. Front-load keywords: release, deploy, production, artifact, go-live, version verification, pre-prod review."
---

# Release / Deploy

Drive the four segments: **artifact build → version-verification environment → pre-prod review →
production**. The framework does **not** pin down the build stack or tools; every concrete command comes
from the project-root declarative **`RELEASE-PLAN.md`**. The framework only advances the segments, records
state, and keeps the sign-offs, producing `RELEASE.md`.

## When to use

- You have reached the "Release" phase (triggered by `/release`)
- Tests passed (TEST.md `result: pass`)
- You want artifact build / verification / review / production as a gated, controllable sequence,
  regardless of node / java / docker / k8s

## Input (what to bring in)

- `TEST.md` (`result: pass`), `DESIGN.md`, `PLAN.md`
- **`RELEASE-PLAN.md`** (project root, declarative release plan, part of the `GATE-*`/`RELEASE-*` spec
  family): what each segment does / its commands / verification points. **Project-defined; leave blank if
  not decided, and let the skill guide you to fill per project**

## Core steps

1. **Read `RELEASE-PLAN.md`**: understand each segment's actions and verification points.
2. **Artifact build**: build per the plan and record the artifact id (image tag / commit SHA / package
   version) into `RELEASE.md`'s `artifact`.
3. **Version verification env**: deploy the artifact to the verification env and run checks (smoke/regression);
   on pass set `verified: yes`.
4. **Pre-prod review**: review against the `GATE-REQUIREMENTS.md` acceptance framing; on pass set
   `prereviewed: yes`.
5. **Release to production**: deploy per the plan (with rollback); on confirmation set `deployed: yes`.
6. **Human confirmation**: `question` to report artifact id / verification / release status; on confirmation
   set `human_confirmed: true`, `status: complete`.
7. Now you may proceed to **Retrospective** (allowed by `release-phase-gate`).

## Deliverable: RELEASE-PLAN.md (declarative, project-defined)

```markdown
# RELEASE-PLAN — <project>

## 1. Artifact
Build command / artifact-id convention / package-manager or image-tag rule: <project fills>

## 2. Version verification env
Environment address / deploy commands / verification items: <project fills>

## 3. Pre-prod review
Review entry / owner / basis: <project fills>

## 4. Production release
Release command / rollback plan / release window: <project fills>
```

## Deliverable: RELEASE.md frontmatter

```markdown
---
status: draft
artifact: no        # artifact id (SHA/tag/version)
verified: no        # passed in the verification env
prereviewed: no     # passed pre-prod review
deployed: no        # released to production
human_confirmed: false
---
```

## Self-check checklist (soft gate)

- [ ] All four segments done per `RELEASE-PLAN.md` (artifact/verified/prereviewed/deployed)?
- [ ] Artifact id recorded and verification has real evidence?
- [ ] Pre-prod review done against the acceptance framing?
- [ ] Rollback plan present in the plan?
- [ ] Confirmed with the user (`human_confirmed: true`, `status: complete`)?

## Common pitfalls

- ❌ Hard-coding commands without `RELEASE-PLAN.md` → detached from the project
- ❌ Perfunctory verification, not actually deploying to the verification env → breaks on go-live
- ❌ Missing fields at submit → blocked by `release-phase-gate`
- ❌ Releasing to production with no rollback plan

## Output

- `RELEASE-PLAN.md` (declarative, project-defined) + `RELEASE.md` (artifact/verified/prereviewed/deployed/ human_confirmed all set, `status: complete`)