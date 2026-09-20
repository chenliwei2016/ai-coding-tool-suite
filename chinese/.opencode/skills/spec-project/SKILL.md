---
name: spec-project
description: "Use when entering the spec phase (SDD): clarify requirements, write the SPEC.md specification, then break it into independently implementable/acceptable unit tasks; pass auto + human review before dev. Front-load keywords: 规格, spec, 澄清, clarify, 需求, 任务拆解, 规格驱动, SDD, task breakdown, specification, requirements."
---

# Spec Project（规格过程 / SDD）

把**需求**经**澄清(clarify) → 写规格(spec) → 拆任务(task breakdown)**，产出一份 **`SPEC.md`**（设计 8 字段 + 任务拆解 5 字段），并经过**自动评审 + 一次性人工确认**，才允许进入「开发(dev)」阶段。对齐 SDD/SpecKit 的流水线：`ask → clarify → spec → plan(task breakdown)`。

## 适用场景（when）

- 进入了「规格 / Spec」阶段（由 `/spec` 触发）
- 拿到需求与 `PROJECT-REVIEW.md`，需要产出可照实现与验收的 `SPEC.md`
- 想在写代码前，把方案、取舍、数据、接口、验收、任务切分统统定清楚

## 输入（要拿什么进来）

- `PROJECT-REVIEW.md`（现状，Phase 1 已确认）
- 本次需求（不限定格式）
- **`GATE-REQUIREMENTS.md`**（需求门禁规范 + 性能/安全阈值；缺失先请用户补充）

## 核心步骤（流程，严格按序）

### 子步骤 A：澄清（clarify）
1. 确认输入就绪：`GATE-REQUIREMENTS.md`、`PROJECT-REVIEW.md` 存在。
2. 收集需求（`question`）。
3. **系统性澄清**：用 `question` 对需求的每个含糊点循环追问——**边界/不做什么、歧义、状态与异常、并发/幂等、回滚、NFR 阈值（性能/安全）**。**判停：无遗留歧义**。每步澄清收敛成一个可直接进 spec 的句子。
4. 对照 `GATE-REQUIREMENTS.md` 逐项机控，不达标打回澄清。

### 子步骤 B：写规格（spec）+ 拆任务（task breakdown）
5. **写 `SPEC.md` 规格部分**，覆盖：scope / option_analysis / architecture / data_model / interfaces / acceptance_criteria / non_functional。
6. **拆 unit task**：把 spec 切成**可独立实现、可独立验收**的工作项（含负责角色/依赖/验收映射），覆盖：ordered_batches / parallel_tracks / task_backlog / dependencies / acceptance_mapping。
7. `status: draft`；满足条件后自动评审（`@quality-assurance` 按 `design-code-review`）→ `reviewed: yes`。
8. **一次性人工确认**：`question` 汇报要点；确认后置 `human_confirmed: true`、`status: complete`。

## 产出物：SPEC.md frontmatter

```markdown
---
status: draft
scope: no
option_analysis: no
architecture: no
data_model: no
interfaces: no
acceptance_criteria: no
non_functional: no
ordered_batches: no
parallel_tracks: no
task_backlog: no
dependencies: no
acceptance_mapping: no
reviewed: no
human_confirmed: false
---
```

正文：规格部分（范围/取舍/架构/数据/接口/验收/NFR）+ 任务拆解部分（有序批次/并行轨道/任务清单/依赖/验收映射/关键路径）。

## 评审/自检 checklist（软门禁）

- [ ] Clarify 是否**无遗留歧义**（边界/异常/并发/回滚/NFR 都已确认）？
- [ ] 13 个必填字段（8 规格 + 5 任务）就绪？
- [ ] 每个验收标准都映射到任务（acceptance_mapping）？依赖无环？
- [ ] 自动评审通过（`reviewed: yes`）？
- [ ] 已向用户一次性确认（`human_confirmed: true`、`status: complete`）？

## 常见坑

- ❌ 需求没澄清就写 spec → 把含糊带进实现
- ❌ 只写规格不拆任务 → dev 无从排程/验收
- ❌ 缺必填字段提交 → 被 `spec-phase-gate` 硬拦
- ❌ 规选/取舍不留理由 → 评审难过

## 产出物

- `SPEC.md`（13 字段就绪、reviewed、human_confirmed，status: complete）