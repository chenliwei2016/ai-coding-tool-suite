---
name: test-design
description: "Use when designing a testing set from a requirement or a scope of changes, covering equivalence, boundaries, states and orthogonal combinations. Front-load keywords: 设计测试用例, 测试集, 测试方案, 等价类, 边界值, 用例设计, 覆盖, design test cases, test set, test plan, equivalence classes, boundary values, case design, test design, test case, coverage."
---

# Test Design

从需求/改动范围出发，设计一套成体系的测试集，确保正、反、边界、组合都被覆盖，而不是拍脑袋列几个用例。

## 适用场景（when）

- 拿到一条需求或一批改动，开始设计要测什么
- 评审别人用例覆盖是否完整
- 上线前确认测试范围没漏

## 输入（要拿什么进来）

- 需求/改动描述、涉及的功能域与接口
- 已知的边界值、状态、约束（最大/最小、为空、超长、并发……）

## 核心步骤（流程）

1. **列范围**：把本次要测的功能点、接口、改动面列全
2. **等价类划分**：把输入划分成等价类，每类代表测一个
3. **边界值**：取边界的邻值（上、下、界内、界外）重点测
4. **状态与交互**：业务状态流转、依赖关系都要有覆盖
5. **正交/组合**：多参数的组合用正交去重，避免全组合爆炸
6. **正反边界齐活**：正常路径 + 异常/失败路径 + 边界各自有用例

## 评审/自检 checklist

- [ ] 改动范围内的每个功能点都有覆盖吗？
- [ ] 等价类、边界值、状态、组合都考虑了吗，不是只测 happy path？
- [ ] 异常/失败/极端输入这些"反"路径有用例吗？
- [ ] 有没有漏掉跨功能联动、竞态这类容易被忽视的？

## 常见坑

- ❌ 只测正常路径，边界与异常全靠运气
- ❌ 用例凭感觉列，不知道为何这么选、覆盖在哪
- ❌ 参数组合全靠手填，要么炸要么漏
- ❌ 把"有多少条用例"当 KPI，实际覆盖空洞

## 产出物

- 覆盖面成体系、能说清每类为什么要有、可执行的测试集