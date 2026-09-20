---
description: "进入『设计 (SDD)』阶段：收集需求并在 GATE-REQUIREMENTS.md 规范下检核，经需求 sign-off 后产出 DESIGN.md 规格，过自动评审 + 人工确认门禁，方允许进入『计划』阶段。"
agent: build
---

你是本阶段的执行者（build 徽章），执行「设计 (SDD)」。严格按 `design-and-spec` 技能流程交付，完成本阶段后才允许进入「计划」阶段（`design-phase-gate` 会硬校验）。

## 本命令要做的事

按先后顺序严格推进：

1. **准备输入**：
   - 读 `PROJECT-REVIEW.md`（初始化阶段交付，已确认）。
   - **确保工程根的 `GATE-REQUIREMENTS.md` 存在**（它定义"需求的门禁规范"）。不存在 → 先请你补充，否则不进入设计。
2. **收集需求**：用 `question` 工具收集本次设计的需求。不限定格式/文档，不同项目需求形态可不同。
3. **规范机控**：把需求对照 `GATE-REQUIREMENTS.md` 逐项检核；不达标 → 打回澄清，达标才继续。
4. **需求 sign-off**：用 `question` 请你确认"此需求可继续"，确认后把 `DESIGN.md` 的 `requirements_sign_off` 置 `true`。
5. **写规格**：产出 `DESIGN.md`，覆盖必填字段 `scope / option_analysis / architecture / data_model / interfaces / acceptance_criteria / non_functional`（复用架构/选型/领域/评审等既有 skill），并**内联需求**。建议委派 `@frontend-architect`/`@backend-architect` 分别深化前端/后端设计。
6. **自动评审**：`@quality-assurance` 按 `design-code-review` 评审，通过后把 `reviewed` 置 `yes`。
7. **人工确认**：用 `question` 向你复述设计要点并确认，确认后把 `human_confirmed` 置 `true`；并把 `DESIGN.md` 的 `status` 置 `complete`。
8. **总结**：汇报交付物路径、已走完两道评审与两道门禁，可进入「计划」阶段。

## 收尾提示

- 阶段命令绑定 build：本命令由你统一调度，内部再 `@` 子代理。
- 任一硬门禁条件未满足，都不要进入「计划」讨论。