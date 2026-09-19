---
name: design-code-review
description: "Use when reviewing a design, PR, or code for real problems in architecture, security, performance, correctness, and maintainability, giving focused feedback. Front-load keywords: 代码评审, 方案评审, 审查, 挑问题, 评审, 审查代码, code review, design review, critique, review, find problems, assess, review code, stakes."
---

# Design & Code Review

评审设计方案与代码，挑出**真正重要**的问题，而非吹毛求疵。

## 适用场景（when）

- 评审别人（或自己）的技术方案、PR、代码提交
- 需要判断某段设计/代码是否值得合入
- 帮团队把关质量与一致性

## 输入（要拿什么进来）

- 待评审的设计或代码
- 上下文：它要解决的问题、约束、既有约定
- 涉及的功能与改动范围

## 核心步骤（流程）

1. **先懂它在解决什么**：不理解意图就review，容易误伤
2. **由重到轻分层看**：先架构与正确性（设计是否成立、逻辑是否对），再安全/性能，最后风格
3. **识别重复与模式**：发现多处同构，提示该抽公共；发现越权/越层，指出职责错位
4. **给可执行反馈**：指出问题的同时给方向，而非只喊"有问题"
5. **区分 blockers 与建议**：明确哪些必须改、哪些是建议，别混为一谈

## 评审/自检 checklist

- [ ] 优先看的是架构/正确性/安全，还是陷进了命名/格式？
- [ ] 是否识别出重复模式（多处同构，该抽公共）？
- [ ] 每条反馈是否给了可执行的方向（而非只批评）？
- [ ] 是否区分"必须改"与"可优化"，避免过度阻塞？

## 常见坑

- ❌ 纠着命名/空行不放，错过真正的架构/安全问题
- ❌ 不理解意图就下结论，误伤合理设计
- ❌ 只输出问题不给解法，反馈不可执行
- ❌ 把什么都当 blocker，团队寸步难行

## 产出物

- 分层级的评审结论：必须改的 / 强烈建议的 / 可优化项