---
name: test-project
description: "Use when entering the test phase: verify implementation with functional (black-box), performance, and security testing, review coverage and conclusions, manage defects back to design/dev, and produce TEST.md with a pass/fail result + human confirmation before deployment. Front-load keywords: 测试, 功能测试, 黑盒, 性能测试, 安全测试, 测试评审, 缺陷回流, test, functional, black-box, performance, security, QA."
---

# Test Project（测试）

对 `/dev` 交付的实现做**黑盒**验证：**功能（黑盒）/性能/安全**三类测试 + **测试评审** + **缺陷管理（回流）**，产出结论 `TEST.md`；`result: pass` 且经人工确认后才允许进入「部署」阶段。

## 适用场景（when）

- 进入了「测试 / Test」阶段（由 `/test` 触发）
- 实现已交付（PLAN.md `implementation_complete: yes`）
- 想在发布前确认功能正确、性能达标、无明显安全风险，并把缺陷交给正确环节修复

## 输入（要拿什么进来）

- `PLAN.md`（实现清单）、`DESIGN.md`（验收口径）、被测代码
- **`GATE-REQUIREMENTS.md`（性能/安全阈值规范，泛化可配置）**——含性能基准与安全通过线；缺失则先请用户补充（沿用 GATE 前缀规范族）

## 核心步骤（流程）

1. **读输入**：明确被测范围、验收口径、性能/安全阈值（`GATE-REQUIREMENTS.md`）。
2. **功能测试（黑盒）**：`@quality-assurance` 用 `test-design`、`exploratory-testing`、`automated-test-suite` 做黑盒验证——拉**真实运行**的实测证据（启动服务/调用接口/跑 E2E），不只信代码。
3. **性能测试**：`non-functional-testing` 跑基准，对照 `GATE-REQUIREMENTS.md` 的阈值（有基准数据即可，阈值为规范）。
4. **安全测试**：`non-functional-testing` 做漏洞/渗透，对照安全通过线（**无高危漏洞/无密钥泄漏**为硬性）。
5. **缺陷管理**：发现缺陷 → 用 `bug-report-writing` 落地缺陷单，**写进 `issues.md`**（走 QA 流程回流到 `/dev` 或 `/design`）。
6. **测试评审**：`@quality-assurance` 复核测试覆盖、结论与缺陷清单。
7. **产出 `TEST.md`**：frontmatter 置 `result: pass` 或 `fail`，`defects` 记录数量与去向。
8. **人工确认**：用 `question` 汇报测试结论与缺陷；确认后置 `human_confirmed: true`。全绿 `pass` 才可进「部署」。

## 产出物：TEST.md 模板

```markdown
---
status: draft
result: draft          # pass | fail
functional: no
performance: no
security: no
defects: none          # none | <count>
defects_flowed: no     # 缺陷是否已回流 issues.md
reviewed: no
human_confirmed: false
---

# TEST — <标题>

## 1. 被测范围 (scope)
PLAN 实现项与验收口径。

## 2. 功能测试（黑盒）
实测证据（启动服务/curl/浏览器/E2E）、通过率。

## 3. 性能测试
基准数据 vs GATE-REQUIREMENTS 阈值。

## 4. 安全测试
漏洞/渗透结果 vs 安全通过线。

## 5. 缺陷与回流 (defects)
缺陷清单、去向（/dev 或 /design）、是否已写入 issues.md。

## 6. 测试评审
@quality-assurance 对覆盖与结论的复核。
```

## 评审/自检 checklist（软门禁）

- [ ] 拉**真实运行**证据做黑盒验证（不只信代码）？
- [ ] 性能/安全已对照 `GATE-REQUIREMENTS.md` 阈值？
- [ ] 缺陷已落地缺陷单并写进 `issues.md`（`defects_flowed: yes`）？
- [ ] `functional/performance/security` 三字段、`reviewed` 就绪？
- [ ] 结论 `result: pass|fail` 明确，且已向用户确认（`human_confirmed: true`）？

## 常见坑

- ❌ 只跑存量测试当验证，没测新增逻辑黑盒行为
- ❌ 性能/安全无阈值口径 → 结论无依据（应引 `GATE-REQUIREMENTS.md`）
- ❌ 发现缺陷不回流、不写 issues.md → 缺陷丢失
- ❌ 结论模棱两可 → 门禁无法放行

## 产出物

- `TEST.md`（result=pass、三字段就绪、reviewed、human_confirmed 全置位，status: complete）