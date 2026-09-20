---
description: "进入『测试 (Test)』阶段：对实现做功能(黑盒)/性能/安全测试，复核覆盖与结论，缺陷回流 issues.md，产出 TEST.md（result: pass|fail），过人工确认后才允许进入『部署』。"
agent: build
---

你是本阶段的执行者（build 徽章），执行「测试 (Test)」。加载 `test-project` 技能并按其流程执行。对 `/dev` 交付的实现做**黑盒**验证，产出 `TEST.md`；`result: pass` 且人工确认后才允许进入「部署」阶段（`test-phase-gate` 会硬校验）。

## 本命令要做的事

1. **读输入**：`SPEC.md`（实现清单）、`SPEC.md`（验收口径）、`GATE-REQUIREMENTS.md`（性能/安全阈值）与被测代码。
2. **功能测试（黑盒）**：委派 `@quality-assurance`，用 `test-design`/`exploratory-testing`/`automated-test-suite`，拉**真实运行**的证据（启动服务/curl/浏览器/E2E）。
3. **性能测试**：`non-functional-testing` 跑基准，对照 `GATE-REQUIREMENTS.md` 阈值。
4. **安全测试**：`non-functional-testing` 做漏洞/渗透，对照安全通过线（无高危/无密钥泄漏为硬性）。
5. **缺陷管理**：发现缺陷 → `bug-report-writing` 落地缺陷单并**写入 `issues.md`**（回流 `/dev` 或 `/spec`）。
6. **测试评审**：`@quality-assurance` 复核覆盖与结论。
7. **产出 `TEST.md`**：frontmatter `result: pass|fail`、`defects`、`defects_flowed`。
8. **人工确认**：用 `question` 汇报结论与缺陷；确认后置 `human_confirmed: true`（`fail` 则按回流去 `/dev`/`/spec` 修）。
9. **总结**：`result: pass` 时汇报可进入「部署」；`fail` 时列出缺陷与回流去向。

## 收尾提示

- 阶段命令绑定 build：由你统一调度，内部 `@` 子代理。
- 黑盒验证必须基于**真实运行**证据；阈值口径引用 `GATE-REQUIREMENTS.md`。