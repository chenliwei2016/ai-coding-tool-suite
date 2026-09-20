---
name: plan-project
description: "Use when entering the plan phase: turn the confirmed DESIGN.md into an ordered, parallelizable implementation plan (PLAN.md) with waves, tracks, and an acceptance mapping, then pass auto + human review before implementation. Front-load keywords: 计划, 排期, 任务分解, 并行, 排序, 关键路径, plan, schedule, task breakdown, parallel, critical path."
---

# Plan Project（计划）

把**已确认的 `DESIGN.md`** 分解为**有序、可并行**的实施计划 `PLAN.md`：按依赖拓扑排序、分组到并行轨道/批次、标注关键路径与回滚顺序，并经过**软自检 + 自动评审 + 人工确认**后才允许进入「实现」阶段。

## 适用场景（when）

- 进入了「计划 / Plan」阶段（由 `/plan` 触发）
- 拿到已确认的规格，需要把它排成可执行的实现顺序
- 想明确"先做什么、哪些可并行、谁负责、如何验收"

## 输入（要拿什么进来）

- `DESIGN.md`（规格权威来源，`status: complete`）
- `PROJECT-REVIEW.md`（现状约束）
- `GATE-REQUIREMENTS.md`（验收口径，可选核对）

## 核心步骤（流程）

1. **读规格**：通读 `DESIGN.md` 的范围/架构/数据/接口/验收标准。
2. **拆解任务**：把设计切成**离散、可独立评审**的工作项（work items）：每项含 `id`、标题、负责角色、改动范围、输入产出、验收（映射到 DESIGN 的 acceptance_criteria）、依赖（显式前置项）。
3. **拓扑排序**：按依赖排出先后，标出**关键路径**；无依赖项松耦合化。
4. **并行分组**：无依赖的工作项归入**并行轨道(parallel tracks)/批次(waves)**；每个批次边界设**集成/验收检查点**，保证可独立回归、并行不互相阻塞。
5. **产出 `PLAN.md`**：frontmatter 置 `status: draft`；正文含批次、并行轨道、任务清单表、关键路径、风险与回滚顺序。
6. **软自检门禁**：每个 DESIGN 验收标准至少落到一个任务；依赖无环；并合并点明确。全过 → `status: complete`。
7. **自动评审**：`@quality-assurance` 审核计划的完整性/可验收性，通过后置 `reviewed: yes`。
8. **人工确认门禁**：`question` 向你复述计划要点（轨道、顺序、负责人、关键路径、风险），确认后置 `human_confirmed: true`。

## 产出物：PLAN.md 模板

```markdown
---
status: draft
ordered_batches: no
parallel_tracks: no
task_backlog: no
dependencies: no
acceptance_mapping: no
reviewed: no
human_confirmed: false
---

# PLAN — <标题>

## 1. 有序批次 (ordered batches / waves)
按依赖排出的实施顺序；标注关键路径。

## 2. 并行轨道 (parallel tracks)
互不依赖、可分头实施的工作项分组；各轨道独立验收。

## 3. 任务清单 (task backlog)
| id | 标题 | 负责角色 | 依赖 | 验收(链接到 DESIGN) | 状态 |

## 4. 依赖与无环 (dependencies)
显式前置项；确认无环。

## 5. 验收映射 (acceptance mapping)
DESIGN 的每条 acceptance_criteria 都至少映射到一个任务。

## 6. 风险与回滚 (risks & rollback)
关键路径上的风险；回滚顺序。
```

## 评审/自检 checklist（软门禁）

- [ ] `DESIGN.md` 已 complete？
- [ ] 每个 DESIGN 验收标准都已落到一个或多个任务？
- [ ] 依赖无环、顺序合理、关键路径已标出？
- [ ] 并行分组的合并点/验收点明确？
- [ ] 六字段（ordered_batches/parallel_tracks/task_backlog/dependencies/acceptance_mapping/reviewed）就绪？
- [ ] 已向用户确认计划（`human_confirmed: true`、`status: complete`）？

## 常见坑

- ❌ 不排序就列任务 → 并行乱跑、互相阻塞
- ❌ 验收标准没有任务承接 → 做完没标准验证
- ❌ 依赖成环 / 关键路径不清 → 延期
- ❌ 缺必填字段提交 → 被 `plan-phase-gate` 硬拦

## 产出物

- `PLAN.md`（六字段就绪、reviewed、human_confirmed 全置位，status: complete）