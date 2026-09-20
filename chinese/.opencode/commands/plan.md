---
description: "进入『计划 (Plan)』阶段：把已确认的 DESIGN.md 拆解为有序、可并行的实施计划，产出 PLAN.md，过人工确认门禁后供『实现』阶段执行。"
agent: build
---

你是本阶段的执行者（build 徽章），执行「计划 (Plan)」。严格把**已确认的 `DESIGN.md`** 转成一份**有序、可并行**的实施计划，交付 `PLAN.md`。完成本阶段后进入「实现」阶段（由 `feature-implementation` 落地）。

前置：`DESIGN.md` 必须已 `status: complete`、`human_confirmed: true`（`design-phase-gate` 会拦 `/plan`，不满足则先回 `design` 阶段）。

## 本命令要做的事（严格按序）

1. **准备输入**：读 `DESIGN.md`（规格权威来源）与 `PROJECT-REVIEW.md`（现状约束），必要时核对 `GATE_REQUIREMENTS.md`（验收口径）。
2. **拆解任务**：把设计切成**离散、可独立评审**的工作项（work items）。每项含：`id`、`标题`、`负责角色`（`@backend-developer` / `@frontend-developer` / `@quality-assurance`，对应前端/后端/测试）、`改动范围`（文件/模块/接口）、`输入与产出`、`验收`（链接到 `DESIGN.md` 的 `acceptance_criteria`）、`依赖`（显式前置项）。
   - 建议先把 `DESIGN.md` 的架构/数据模型/接口分别委派给 `@frontend-architect`/`@backend-architect`，确认任务粒度和可并行边界再落表。
3. **拓扑排序**：按依赖排出**先后顺序**（前置必须先落地），标出关键路径（critical path）；尽量让无依赖的工作项松耦合、可分批。
4. **并行分组**：把互不依赖的工作项归入**并行轨道（parallel tracks）/ 批次（waves）**；每个批次边界设**集成/验收检查点**（过 `@quality-assurance` 或合并点），保证并行不互相阻塞、结果可独立验收。
5. **产出 `PLAN.md`**（工程根）：frontmatter 置 `status: draft`；正文含：`有序批次（waves）`、`并行轨道（parallel tracks）`、`任务清单表`（id/标题/负责角色/依赖/验收/状态）、`关键路径`、`风险与回滚顺序`。
6. **软自检门禁**：逐项核对 —— 每个设计验收标准都至少落到一个任务、任务间依赖无环、并行分组合并点明确。全过后把 `status` 置 `complete`。
7. **人工确认门禁**：用 `question` 工具向你复述计划要点（并行轨道、落地顺序、负责人、关键路径与风险），确认后把 `human_confirmed` 置 `true`。
8. **总结**：汇报 `PLAN.md` 路径、并行轨道数、任务总数、关键路径、下一阶段（实现）可开始。

## 收尾提示

- 阶段命令绑定 build：本命令由你统一调度，内部再 `@` 子代理。
- 并行≠盲跑：没有合并点/验收点的任务不要乱并行；宁可串行也要保证每步可独立回归。
- `DESIGN.md` 未 complete 前，不要进入「计划」讨论。

## 产出物

- `PLAN.md`（有序批次 + 并行轨道 + 任务清单 + 验收映射，`status: complete`、`human_confirmed: true`）