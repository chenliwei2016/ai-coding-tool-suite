---
name: bug-report-writing
description: "Use when writing a defect/ticket that others can reproduce and triage: clear repro steps, environment, expected vs actual, and priority/severity. Front-load keywords: 缺陷单, 提bug, 报障, 复现步骤, 优先级, 严重度, 提单, 缺陷报告, defect ticket, file a bug, bug report, report issue, reproduction steps, priority, severity, create ticket."
---

# Bug Report Writing

把一次发现的问题写成一条别人不用你解释就能复现、能定位、能分清轻重缓急的缺陷单。产出是"可行动的门票"，不是"现象描述"。

## 适用场景（when）

- 发现缺陷要提工单/缺陷单
- 让开发不追着问"怎么复现"就能开工
- 上报问题并说清该多紧急、影响多大

## 输入（要拿什么进来）

- 现象、触发路径、实际 vs 预期
- 环境信息、涉及版本/数据、影响面

## 核心步骤（流程）

1. **标题即摘要**：一眼看清"哪个功能、什么问题"
2. **给稳定复现步骤**：操作、输入、环境按顺序写，别人照做能复现
3. **预期 vs 实际**：明确"本该是什么"和"实际是什么"
4. **给环境与线索**：系统/版本、库/数据、日志/截图/报错，帮快速定位
5. **定优先级与严重度**：影响面 × 紧急度，分轻重
6. **补影响随手记**：波及哪些用户/功能，方便排期

## 评审/自检 checklist

- [ ] 别人照着复现步骤能复现出来，而不是一堆"好像"？
- [ ] 预期 vs 实际、环境、线索都给了吗？
- [ ] 优先级 / 严重度有依据吗（影响面 × 紧急度）？
- [ ] 是"可行动的 ticket"，还是只有一句"哪坏了"？

## 常见坑

- ❌ 只写"这里坏了"，没复现步骤，开发全靠猜
- ❌ 预期/实际不写清，是 bug 还是用法问题分不清
- ❌ 缺环境/数据/日志线索，定位成本拖高
- ❌ 所有缺陷都"最紧急"，等于没有优先级

## 产出物

- 可复现、可定位、优先级明确、可行动排期的缺陷单