---
name: exploratory-testing
description: "Use when searching for bugs without a fixed script, being suspicious of everything, going beyond designed cases toward negative paths, abnormal and extreme inputs. Front-load keywords: 探索性测试, 找缺陷, 怀疑, 负路径, 乱点, 异常输入, 挖 Bug, exploratory testing, find bugs, suspicious, negative path, click around, abnormal input."
---

# Exploratory Testing

不照预设剧本、带着怀疑去主动找缺陷。写用例是"证明它对的路径该测什么"，探索性测试是"它哪里可能藏着毛病"。两者触发时机与心智不同，故拆开。

## 适用场景（when）

- 主流程测完，主动去挖边界和隐藏问题
- 变更引入新风险，怀疑既有功能被破坏
- 用例覆盖不到却总觉得"这里有隐患"

## 输入（要拿什么进来）

- 系统/功能与它依赖的模块
- 已知的易错点、历史坑、变更面

## 核心步骤（流程）

1. **怀疑假设**：别默认"用户会按设计用"，想反着用
2. **钻负路径与极端输入**：异常、超长、空、特殊字符、边界外、非法状态
3. **交叉联动与顺序**：跨功能、跨页面、重复操作、乱序、快速连点
4. **并发/竞态**：两个入口同时、刷新打断
5. **跟着线索深挖**：一个不对劲就顺藤摸瓜，别只记下现象

## 评审/自检 checklist

- [ ] 是主动找问题，还是顺着正常流程走了一遍？
- [ ] 负路径、极端输入、异常状态都试了吗？
- [ ] 有没有跨功能联动、竞态、顺序依赖这些隐藏区？
- [ ] 发现问题有没有追到具体复现和根因线索，而不是停在"好像不对"？

## 常见坑

- ❌ 说白了又回到验证"正常能用"，没在挖
- ❌ 只测设计允许的输入，用户的可恶行为全躲过
- ❌ 发现异常不深挖，记个"似乎闪了一下"就没下文
- ❌ 和 test-design 混着做，没剧本也没脑内的怀疑清单

## 产出物

- 预设用例难以抓到的隐藏缺陷，附复现线索与根因方向

## 关联

- 钻出嫌疑 → 用 `code-debugging` / `root-cause-analysis` 定位到根因
- 记发现 → 用 `bug-report-writing`