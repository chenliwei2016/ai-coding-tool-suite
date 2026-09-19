---
name: feature-implementation
description: "Use when turning a scoped task or ticket into working code that matches the surrounding codebase's style and contract. Front-load keywords: 实现功能, 落地实现, 写代码, 完成一条票, 改功能, 编码落地, feature implementation, implement feature, write code, complete a ticket, change functionality, code it up, land code."
---

# Feature Implementation

把一条细化后的任务，落地成可运行、符合既有风格与契约的代码。

## 适用场景（when）

- 一条明确的票/需求，按方案把它写成代码
- 在既有模块内新增或修改一个功能点
- 拿到设计但还不清楚"这段代码要长什么样"

## 输入（要拿什么进来）

- 任务描述 / 设计文档 / 验收标准
- 相关既有代码（同类功能的参考实现）

## 核心步骤（流程）

1. **先读周边契约**：方法签名、类型、调用方、异常约定，别想当然
2. **模仿既有模式**：找到同类功能的写法照着来，保持一致，不发明新风格
3. **小步实现**：一个逻辑一个逻辑落地，避免一次性堆大改动
4. **编译验证**：类型错误、import 重复等问题第一时间暴露
5. **跑相关测试**：改动波及的测试必须过，必要时补新测试

## 评审/自检 checklist

- [ ] 是不是贴着周边契约实现的，没破坏既有行为？
- [ ] 风格、命名、结构是否与周围代码一致？
- [ ] 编译 + 相关测试过了吗？
- [ ] 有没有为了快而引入重复代码 / 过度设计？

## 常见坑

- ❌ 不读契约直接上手，接口变了导致一堆返工
- ❌ 跳过模仿、自创风格，Review 时被要求改
- ❌ 一次改一堆、不编译不测试，最后无处定位问题
- ❌ 复制粘贴 N 份而不是抽复用（识别重复靠 design-code-review）

## 产出物

- 可运行、符合风格与契约、有测试保障的功能代码

## 关联

- 边界/防侵入 → 复用 `domain-modular-design`
- 自查 → 复用 `design-code-review`