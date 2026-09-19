---
name: safe-refactoring
description: "Use when refactoring existing code on a small scale to improve structure without changing behavior or breaking contracts. Front-load keywords: 重构, 简化代码, 抽取重复, 改进结构, 去重复, 收敛, refactor, simplify code, extract duplication, improve structure, safe refactoring, de-duplicate. Distinct from large-scale evolution (use evolution-planning)."
---

# Safe Refactoring

小范围改造存量代码：改善结构、抽重复、提可读性，**保持行为等价、不破坏契约**。这是开发层面的战术重构；宏观长期可演进的设计另用 `evolution-planning`。

## 适用场景（when）

- 遇到复制粘贴多份、结构凌乱、名字误导的既有代码
- 想在实现功能的同时顺手把局部改干净
- 已存在但难以维护的重灾区，需要在不改行为的前提下重构

## 输入（要拿什么进来）

- 要重构的代码 + 它被谁调用（契约/依赖面）
- 对"保持行为不变"的确认

## 核心步骤（流程）

1. **先圈定边界**：确认这段代码被哪些地方调用，契约是什么，别扩到无关区域
2. **提取重复，不做多余**：抓重复抽公共，删死代码，但不顺手"现代化"（保持仓库风格）
3. **保持行为等价**：每步小改小验，逻辑行为不得改变
4. **分步小提交**：一个重构一个提交，diff 可控、可回溯
5. **跑回归**：依靠测试确认没破行为，必要时补测试兜底

## 评审/自检 checklist

- [ ] 行为真的等价吗？有没有悄悄改变边界或异常行为？
- [ ] 改动是否被控制在本范围内的契约里、没波及无关调用方？
- [ ] 风格与周围一致，没有夹带"顺手现代化"？
- [ ] 回归测试跑过了吗？

## 常见坑

- ❌ 重构顺手改行为，bug 被藏进"重构"提交
- ❌ 范围失控，越改越大，牵连一堆无关代码
- ❌ 借着重构引入新风格/新依赖（红线区）
- ❌ 一次提交混入多个无关重构，diff 大、难回溯

## 产出物

- 结构更清晰、行为不变、契约没破、有回归保障的代码

## 关联

- 宏观演进 / 大重构 → 用 `evolution-planning`