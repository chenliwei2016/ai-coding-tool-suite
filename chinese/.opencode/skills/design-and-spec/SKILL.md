---
name: design-and-spec
description: "Use when entering the design (SDD) phase: collect requirements and check them against GATE-REQUIREMENTS.md, get requirements sign-off, turn them into a DESIGN.md specification, and pass auto + human review before the plan phase. Front-load keywords: 设计, 需求转规格, SDD, 技术方案, 设计评审, design, specification, spec, requirements."
---

# Design & Spec（设计/SDD）

把**需求**转化为结构化、可落地的 `DESIGN.md` 规格，并经过**需求 sign-off + 规范机控 + 自动评审 + 人工确认**后，才允许进入「计划」阶段。输入有两个：`PROJECT-REVIEW.md`（现状）与**本次需求**（要做什么，不限定固定格式）。

> **SDD 术语对齐**：本阶段的 `DESIGN.md` 即 SDD / SpecKit 所称的 **spec（规格）**——它落在"需求"与"实现"之间，是照着实现与验收的契约。**写 spec 时已含需求初切**（scope/验收标准）；下一阶段 `plan-project` 会把它**进一步细拆成可独立实现、可独立验收的 unit task**（SDD 的 task）。两个阶段都在"拆"，只是粒度从粗（scope/验收）到细（可提交的 task）。

## 适用场景（when）

- 进入了「设计 / SDD」阶段（由 `/design` 触发）
- 拿到需求或业务目标，需要产出可评审的技术规格
- 想在写代码前，把方案、取舍、数据、接口、验收标准定清楚

## 输入（要拿什么进来）

- `PROJECT-REVIEW.md`（Phase 1 已确认；无则先做 Phase 1）
- 本次需求（用户口述/文档/既有 spec 皆可，不限定格式）
- **`GATE-REQUIREMENTS.md`**（工程根，定义"需求门禁规范"；缺失则先请用户补充）

## 核心步骤（流程，严格按序）

1. **确认输入就绪**：`GATE-REQUIREMENTS.md` 存在；`PROJECT-REVIEW.md` 存在。缺失 → 先补齐。
2. **收集需求**：用 `question` 工具收集"要设计什么"。不套死格式；不同项目形态不同。
3. **规范机控**：把需求逐项对照 `GATE-REQUIREMENTS.md` 检核。不达标 → 打回澄清，达标才继续。
4. **需求 sign-off**：`question` 请你确认"此需求可继续"，确认后置 `requirements_sign_off: true`。
5. **产出 `DESIGN.md`**：覆盖八个必填字段，并**内联需求**原文：
   - scope（范围/需求）· option_analysis（候选与取舍，复用 `tech-selection`）
   - architecture（架构，复用 `architecture-design`、`domain-modular-design`）
   - data_model（数据模型）· interfaces（对外接口/契约）
   - acceptance_criteria（验收标准）· non_functional（NFR，复用 `non-functional-testing`）
   - status: draft
6. **自动评审**：`@quality-assurance` 按 `design-code-review` 评审；通过后置 `reviewed: yes`。
7. **人工确认（设计）**：`question` 向你复述设计要点并确认；确认后置 `human_confirmed: true`、`status: complete`。

## 产出物：DESIGN.md 模板

```markdown
---
status: draft
scope: no
option_analysis: no
architecture: no
data_model: no
interfaces: no
acceptance_criteria: no
non_functional: no
reviewed: no
requirements_sign_off: false
human_confirmed: false
---

# DESIGN — <标题>

## 0. 需求（内联）
本次需求原文与来源。

## 1. 范围 (scope)
- 本次要做什么/不做什么；边界

## 2. 候选与取舍 (option analysis)
- 候选方案、权衡、选型理由（复用 tech-selection）

## 3. 架构 (architecture)
- 分层/模块/组件/调用关系/部署（复用 architecture-design, domain-modular-design）

## 4. 数据模型 (data model)
- 存储/表/schema/迁移；读写路径

## 5. 接口 (interfaces)
- 对外 API/契约/事件；与现有代码的衔接

## 6. 验收标准 (acceptance criteria)
- 可验证的通过条件

## 7. 非功能 (non-functional)
- 性能/安全/可运营目标与口径（复用 non-functional-testing）

## 8. 评审记录
- @quality-assurance 自动评审结论；人工确认结论
```

## 评审/自检 checklist（软门禁）

- [ ] `GATE-REQUIREMENTS.md` 存在，且需求已按其逐项检核通过？
- [ ] 需求已 sign-off（`requirements_sign_off: true`）？
- [ ] 八个必填字段（scope/option_analysis/architecture/data_model/interfaces/acceptance_criteria/non_functional/reviewed）就绪？
- [ ] 需求已内联进 DESIGN.md？
- [ ] `@quality-assurance` 自动评审通过（`reviewed: yes`）？
- [ ] 已向用户确认设计（`human_confirmed: true`、`status: complete`）？

## 常见坑

- ❌ 没有需求就设计 → 无的放矢；无 `GATE-REQUIREMENTS.md` 也硬做
- ❌ 需求不 sign-off 就往下 → 返工
- ❌ 把推断/取舍不留理由写进规格 → 评审难通过
- ❌ 缺必填字段提交 → 被 `design-phase-gate` 硬拦，进不了计划阶段

## 产出物

- `DESIGN.md`（八字段就绪、reviewed、requirements_sign_off、human_confirmed 全置位，status: complete）