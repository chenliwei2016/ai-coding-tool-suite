---
description: "进入『开发 (Dev/Implement)』阶段：按 dev-implement 技能逐项执行 SPEC.md 的 work items（实现+单测+自评），把状态写回 SPEC.md，过人工确认后交付给『测试』阶段。"
agent: build
---

你是本阶段的执行者（build 徽章），执行「开发 (Dev/Implement)」。加载 `dev-implement` 技能并按其流程执行。逐项把 **`SPEC.md`** 的任务落地为代码 + 单测 + 自评，并把状态写回 PLAN，完成后才允许进入「测试」阶段（`dev-phase-gate` 会硬校验）。

## 前置
- `SPEC.md` 已 `status: complete`（`spec-phase-gate` 已放行 `/dev`）。
- 逐个 work item 推进：(1) 读 item → (2) 委派 `@backend-developer`/`@frontend-developer` 用 `feature-implementation` 实现 → (3) `unit-test-writing` 补单测并跑绿 → (4) 开发者按 `design-code-review` 自评。

## 返工上限（确定性出口）
- **item 级 K=3**：同一 item 校验未过连续 3 次 → 标 `blocked`，停下向我上报（不无限自转）。
- **阶段级 M=20**：总迭代达 20 → 全部停下汇报。

## 收尾
1. 校验所有 item `done` 且带 `tests:`。
2. 更新 SPEC.md frontmatter：`implementation_complete: yes`、`tests_written: yes`。
3. 用 `question` 向我汇报实现要点/改动范围/单测情况，确认后置 `human_confirmed: true`。
4. 汇报交付与下一阶段（测试）可开始。

## 收尾提示
- 阶段命令绑定 build：由你统一调度，内部 `@` 子代理。
- 真正质检属「测试」阶段，本阶段只需**自测自评**达标。