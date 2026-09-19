---
name: code-debugging
description: "Use when a feature doesn't work or behaves unexpectedly and you need to locate and fix the bug in a local dev environment, at a tactical granularity (not production incident root-causing). Front-load keywords: 调试, 排查bug, 定位问题, 程序不工作, 行为异常, 修复, 排错, debugging, locate and fix, troubleshooting, feature not working, unexpected behavior, fix."
---

# Code Debugging

本地/开发环境下，快速定位并修复一个功能不工作或行为异常的问题。这是战术级排错；线上生产事故的深层根因分析另用 `root-cause-analysis`。

## 适用场景（when）

- 功能报错 / 结果不对 / 行为异常
- 调试本地代码、定位具体哪一行出的问题
- 改了代码导致已有功能失效

## 输入（要拿什么进来）

- 现象描述（报错堆栈 / 预期 vs 实际）
- 复现路径或触发条件
- 相关代码 / 最近的改动

## 核心步骤（流程）

1. **先复现**：拿到稳定复现路径，没有复现就没法确认修好
2. **二分定位**：从现象向前收缩范围，缩小到具体方法/分支/数据
3. **判断根因而非症状**：表象可能只是下游，追到真正的起因
4. **最小改动修复**：只改该改的，不顺手重构（重构走 safe-refactoring）
5. **验证修复**：用复现路径确认修复生效，并检查是否引入回归

## 评审/自检 checklist

- [ ] 能稳定复现了吗？
- [ ] 定位到的是根因而不是把表象绕过去了？
- [ ] 改动是否最小、不波及无关逻辑？
- [ ] 修复已验证，原有功能没退化？

## 常见坑

- ❌ 没复现就乱猜，白改
- ❌ 找到症状就改，根源没断，换个输入又炸
- ❌ 为了修 bug 顺手重构，把简单问题搞复杂
- ❌ 只验证了报错的那条路，没看周边是否回归

## 产出物

- 定位到根因、最小改动修复且验证通过