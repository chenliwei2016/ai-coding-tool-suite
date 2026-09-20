---
name: dev-implement
description: "Use when entering the implementation (development) phase: execute PLAN.md work items iteratively — implement, write unit tests, self-review — and write status back into PLAN.md; then pass the dev gate (human confirmation) before testing. Front-load keywords: 开发, 实现, 写代码, 单测, 自评, implement, develop, feature implementation, unit test, self review."
---

# Dev / Implement（开发实现）

把 **`PLAN.md`** 的任务逐项**落地为代码 + 单测 + 自评**，并**把每项状态写回 PLAN.md**。这是**多轮迭代**阶段：一次做一个 work item，读取→实现→单测→自评→标记；过关才进入下一项。真正的质检交给之后的「测试」阶段。

## 适用场景（when）

- 进入了「开发 / Implement」阶段（由 `/dev` 触发）
- 拿到 `PLAN.md`（`implementation_complete: no`）要开始写代码
- 想按"每项一个闭环，过自检再继续"稳定推进

## 输入（要拿什么进来）

- `PLAN.md`（含 task_backlog 与状态、`DESIGN.md` 引用、关键路径）
- `DESIGN.md` / `PROJECT-REVIEW.md`（规格与现状）

## 核心步骤（流程：逐 item 循环）

每处理一个 work item：

1. **读 item**：范围、负责角色、依赖、验收（链接到 DESIGN 的 acceptance_criteria）。
2. **实现**：交给对应 `@backend-developer` / `@frontend-developer`，用 `feature-implementation` 落地，遵循既有风格与契约。
3. **写单测**：用 `unit-test-writing` 为新增/修改逻辑补测试；跑该测试确认绿（红则计返工）。
4. **自评**：开发者按 `design-code-review` 的自检清单自评；有未过项 → 返工。
5. **标记写回**：通过 → 在 PLAN.md 该项把 `selected by role` 状态置为 `done` 并附 `tests:`（关联单测路径）。返工计数 `retries +→`。
6. **推进下一 item**，直到所有 item 完成。

**返工上限（确定性出口，不无限循环）**：
- item 级 `K=3`：同一 item 校验未过（单测红 / 自评未过）连续 `retries == 3` → 标 `blocked`，停下来上报给你（范围不清？设计要改？技术上不可行？），不在该项自转。
- 阶段级 `M=20`：整个 /dev 自动迭代次数合计达到 20 → 全部停下，向你汇报进展，等你定夺。

## 收尾（全部 item 完成）

1. 校验：所有 item `done` 且都带 `tests:`。
2. 更新 PLAN.md frontmatter：`implementation_complete: yes`、`tests_written: yes`。
3. 人工确认：用 `question` 向你汇报实现要点/改动范围/单测情况，确认后置 `human_confirmed: true`。
4. 完成 → 可进入「测试」阶段（`dev-phase-gate` 会校验以上字段）。

## 评审/自检 checklist（每 item + 阶段末）

- [ ] 每个 item 是否 `done` 且带 `tests:` 关联（单测通过）？
- [ ] 开发者自评（design-code-review 自检）是否全过？
- [ ] 改动是否符合既有风格与契约（feature-implementation）？
- [ ] 是否有 `blocked`/`retries>=3` 未决项？
- [ ] `implementation_complete: yes`、`tests_written: yes`、`human_confirmed: true`？

## 常见坑

- ❌ 不读 item/验收就动手 → 做偏
- ❌ 只写代码不补单测 → `dev-phase-gate` 不给过测试阶段
- ❌ 自评走过场、不真正跑测试 → 缺陷流到测试阶段
- ❌ 单个 item 反复修不封顶 → 应 `blocked` 上报，别无限自转

## 产出物

- 实现完成 + 单测 + PLAN.md 每项 `done`/`tests:` 写回、`implementation_complete: yes`、`human_confirmed: true`