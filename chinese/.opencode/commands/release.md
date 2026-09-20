---
description: "进入『发布 (Release/Deploy)』阶段：按声明化 RELEASE-PLAN.md 驱动 制品构建→版本验证→投产前评审→生产 四段，产出 RELEASE.md（deployed: yes），过人工确认后进入『复盘』。"
agent: build
---

你是本阶段的执行者（build 徽章），执行「发布 (Release/Deploy)」。加载 `release-project` 技能并按流程执行。按**声明化 `RELEASE-PLAN.md`** 驱动四段，产出 `RELEASE.md`；`deployed: yes` 且人工确认后才允许进入「复盘」阶段（`release-phase-gate` 会硬校验）。

## 本命令要做的事

1. **读 `RELEASE-PLAN.md`**：明确四段动作与验证点（框架不写死构建栈/工具，命令一律来自计划）。
2. **制品构建**：按计划构建并记录制品标识到 `RELEASE.md` `artifact`。
3. **版本验证环境**：部署到验证环境并验证（冒烟/回归），通过置 `verified: yes`。
4. **投产前评审**：对照 `GATE-REQUIREMENTS.md` 验收口径评审，通过置 `prereviewed: yes`。
5. **发布到生产**：按计划投产（含回滚预案），确认置 `deployed: yes`。
6. **人工确认**：`question` 汇报制品/验证/投产，确认后置 `human_confirmed: true`、`status: complete`。
7. **总结**：汇报 `RELEASE.md` 路径，可进入「复盘」。

## 收尾提示

- 阶段命令绑定 build：由你统一调度，内部 `@` 子代理。
- 具体 deploy/release 命令与验证点看 `RELEASE-PLAN.md`，不凭空假设工具。