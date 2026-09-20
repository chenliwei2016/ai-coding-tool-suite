---
description: "进入『复盘 (Retrospective/Evaluate)』：对刚完成的整条生命周期做量化复盘，产出 RETRO.md 指标看板 + 保留/改进清单，并把改进 feed 进下一轮。"
agent: build
---

你是本阶段的执行者（build 徽章），执行「复盘 (Retrospective/Evaluate)」。加载 `retro-evaluate` 技能并按流程执行。这是一条生命周期的**收尾节点**：用**数字指标**复盘每个阶段，产出 `RETRO.md`，把改进 feed 进下一轮。**没有数字的结论不写。**

## 本命令要做的事

1. **收集各阶段数字**：从 `PROJECT-REVIEW.md` / `SPEC.md` / `SPEC.md`(含 retries) / `TEST.md` / `RELEASE.md` / `issues.md` 统计可量化指标（没记录标 N/A）。
2. **指标看板**：每阶段一张数字表（含**代码采用率 / 返工率 / 缺陷逃逸率 / 周期时间**等缺省指标，项目可扩展）。
3. **保留/改进**：由指标异常推导「保留(P)/改进(A)」清单，每条带前后量化对比；下轮目标 1~3 个可量化项。
4. **落盘 `RETRO.md`**：frontmatter `status: draft`；经你确认后置 `human_confirmed: true`、`status: complete`、`fed_back: yes`。
5. **feed 下一轮**：把可复用改进写回相应 skill / `GATE-REQUIREMENTS.md` / 规范（防膨胀，只留指针）。

## 收尾提示

- 复盘是叶子节点，无"拦下一步"硬门禁；`release-phase-gate` 已放行到本阶段。
- 指标以记录为准，不臆造；空泛无数字的结论一律删。