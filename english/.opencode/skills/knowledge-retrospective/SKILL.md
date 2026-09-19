---
name: knowledge-retrospective
description: "Use at the end of any task to review what was learned and write back new knowledge, so future sessions stop re-learning the same things and re-making the same mistakes. Distills new facts/lessons into the correct file with strict anti-bloat rules. Front-load keywords: knowledge retention, retrospective, lessons learned, write back, retention, lessons, record, documentation."
---

# Knowledge Retrospective

The goal is to turn your experience into something **you don't have to relearn next time**, and to write it **only where it belongs** — without polluting or bloating.

## When to use

- After completing a task / fix / review / troubleshooting session
- When you uncovered an unknown mechanism blind spot (build sequencing, deployment pitfalls, hidden framework behavior)
- When you discovered a judgment error ("thought it was fine / thought it was correct" but it wasn't) and want to prevent it next time
- When you confirmed a business/contract fact you previously weren't sure about

## When to trigger

**Actively do one at the end of every task** — typically after the deliverable is done, verification passes, and you're about to wrap up. Treat it as "the last mile," not an optional exercise.

## What to write in each of the three places (clear responsibilities, highest priority)

| Location | Analogy | What to put here | Absolutely NOT here |
| --- | --- | --- | --- |
| **Project root `AGENTS.md`** | This project's "user manual" | Only **project-specific facts**: environment/paths/ports/commands/build & deployment pitfalls/project-level contract facts (field names, interface conventions, how a given module is packaged and shipped) | Generic methodology; role responsibilities; anything that would hold in a different project too |
| **Skill `skills/<name>/SKILL.md`** | A set of **reusable methodology** | Common approach for a class of task: steps, rules, checklists, criteria, anti-patterns. Not bound to a single project; works across projects | Project-specific executable details (paths/commands specific to one project shouldn't enter a skill) |
| **Agent `agents/<name>.md`** | This "role's" code of conduct | The role's identity/responsibilities/principles; **meta-lessons about how the role itself operates** (judgment trade-offs, process discipline, self-reflection) | Project facts; generic methodology |

> Deciding rule of thumb: **"Would I still need it in a different project?" → if yes, it goes into the SKILL; if no, into AGENTS.md. "Is only my role the one that needs it?" → if yes, it goes into the agent file.** If unsure, ask first; better to leave it out than to write it in the wrong place.

## What is worth writing (write-back gating, to prevent bloat)

A new piece of knowledge is written back only when it **simultaneously** meets most of the criteria below:

- 🆕 **New** — not already in the documentation (first `grep` to confirm it isn't a duplicate)
- ✔️ **Verifiable** — confirmed by an actual test/run this time, not a guess or impression
- 🔁 **Reusable** — likely to be needed again later; one-off trivia is not written
- 🎯 **Correct home** — it belongs in the file from the matrix above

**Excluded (do not write)**:

- The obvious and team common knowledge (Vue is component-based, Java must be compiled — writing this is just noise)
- One-off/temporary details (which temporary test port was used today, obsolete tomorrow)
- Content already written elsewhere (on finding a duplicate → merge into the original, don't copy it again)
- Emotional or inconclusive impressions

## Closing process

1. **Ask yourself**: "What did I newly learn this round, and will I use it next time?" Capture in three categories:
   - **Mechanism blind spot** — hidden behavior of some framework/build/deployment
   - **Judgment error** — when did I "assume it was right/fine," where was I actually wrong, and how to avoid it next time
   - **Contract fact** — the real agreements for frontend/backend, interfaces, fields, error codes
2. **Decide the home** — use the matrix above to pick `AGENTS.md` / `SKILL.md` / agent file.
3. **Write it back** — put each item in the right place. Project facts go into that project's AGENTS.md (which may live in another repo); methodology goes into the matching skill as "how to do this class of task"; role-level meta-lessons go into the agent file.
4. **Leave a pointer, don't copy** — the agent file should only point at where the item lives; don't copy a pile of project facts into the agent file.
5. **Format** — write entries in a **searchable** style, with numbering / keyword-heavy section titles (easy to `grep` later), one topic per entry, actionable and executable.

## Self-check checklist

- [ ] **Would the write-back still be needed in a different project?** Yes → skill; No → project AGENTS.md; role-specific → agent file
- [ ] Is it a **test-verified** new thing, not a guess or common knowledge?
- [ ] Did you avoid stuffing project-specific details into the skill / agent file?
- [ ] Are keywords searchable, one topic per entry, and free of redundancy?