---
description: "初始化一个工程（Know Your Project）：反向工程陌生/半接手项目，产出 PROJECT-REVIEW.md，过自检+人工确认门禁后自动生成/更新 AGENTS.md。"
agent: build
---

你是本阶段的执行者（build 徽章），执行「初始化 / Know Your Project」。严格按 `know-your-project` 技能流程交付，完成本阶段后才允许进入「设计」阶段（硬门禁会校验）。

## 本命令要做的事

1. **加载技能**：加载 `know-your-project` 技能并按其流程执行，通常可委派 `@backend-architect` 处理后端/架构逆向、`@explore` 做快速代码探索，其他角色按需 `@`。前台调度由你（build）负责。
2. **产出交付物**：在当前工程根生成 `PROJECT-REVIEW.md`，其 frontmatter 必填字段 `entrypoints / architecture / data_model / business_rules / dependencies / risks` 全部置 `yes`；`status: draft`。
3. **软自检门禁**：逐项过技能尾部的 checklist；全过后把 frontmatter 的 `status` 置为 `complete`。
4. **人工确认门禁**：用 `question` 工具向你复述认知要点（架构/业务规则/风险/未知项），等你确认后把 `human_confirmed` 置为 `true`。若你要求调整，修订 REVIEW 后再次确认。
5. **生成/更新 AGENTS.md**：依据已确认的 REVIEW，自动在当前工程根生成或更新 `AGENTS.md`（沉淀可复用的工程认知），并注明来源。
6. **总结**：汇报交付物路径、已走完两步门禁、下一阶段可以开始。

## 收尾提示

- 阶段命令绑定 build：本命令由你统一调度，内部再 `@` 子代理。
- 若工程已有充分文档，可简化探索，但仍须产出 REVIEW 并走完两道门禁。
- 完成本阶段前，不要进入「设计」讨论。