---
description: "进入『规格 (Spec/SDD)』阶段：澄清需求(clarify) → 写 SPEC.md → 拆 unit tasks，经自动评审 + 一次性人工确认后放行到『开发』。"
agent: build
---

你是本阶段的执行者（build 徽章），执行「规格 (Spec/SDD)」。加载 `spec-project` 技能并按流程执行。把需求经**澄清 → 写规格 → 拆任务**产出 `SPEC.md`，经自动评审 + **一次性人工确认**后才允许进入「开发」阶段（`spec-phase-gate` 会硬校验）。

## 本命令要做的事（严格按序）

1. **确认输入**：`GATE-REQUIREMENTS.md`、`PROJECT-REVIEW.md` 存在；缺失先补齐。
2. **收需求 + 澄清(clarify)**：用 `question` 收集需求，并对**每个含糊点循环追问**（边界/不做之事、歧义、状态与异常、并发/幂等、回滚、NFR 阈值）。**判停：无遗留歧义**。再对照 `GATE-REQUIREMENTS.md` 机控。
3. **写规格**：产出 `SPEC.md` 规格部分（scope/option_analysis/architecture/data_model/interfaces/acceptance_criteria/non_functional）。建议委派 `@frontend-architect`/`@backend-architect` 深化前端/后端。
4. **拆任务**：把 spec 切成可独立实现/独立验收的 unit tasks（ordered_batches/parallel_tracks/task_backlog/dependencies/acceptance_mapping）。
5. **自动评审**：`@quality-assurance` 按 `design-code-review` 评审 → `reviewed: yes`。
6. **一次性人工确认**：`question` 汇报要点，确认后置 `human_confirmed: true`、`status: complete`。
7. **总结**：汇报 `SPEC.md` 路径与可进入「开发」。

## 收尾提示

- 阶段命令绑定 build：由你统一调度，内部 `@` 子代理。
- 阶段内"写规格"与"拆任务"是两个子步，缺一不可；澄清未闭环不得开始写 spec。