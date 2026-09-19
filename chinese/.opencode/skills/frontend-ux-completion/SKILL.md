---
name: frontend-ux-completion
description: "Use when designing a UI to handle all user-visible states—loading, empty, error, partial failure, disabled, rapid repeated clicks, and accessibility. Front-load keywords: 前端交互, 加载态, 空态, 异常态, 健壮性, 可访问性, 按钮连点, frontend interaction, loading state, empty state, error state, robustness, accessibility, rapid repeated clicks, UX, a11y. A concern unique to the browser where users see every state."
---

# Frontend UX Completion（交互完整态设计）

设计 UI 时把所有"用户能看到的"状态都考虑全并做了：加载、空、异常、部分失败、禁用、边界操作、连点、屏幕可访问。后端不面对"用户看到每个状态"，故为前端专属技能。

## 适用场景（when）

- 开发/评审一个页面或组件，判断它的状态是否齐全
- 处理异步过程、异常、极端数据、交互边界
- 让功能对不同条件的用户与操作都健壮

## 输入（要拿什么进来）

- 面临的加载、为空、报错、部分成功等场景
- 目标用户的设备、网络、辅助功能需求

## 核心步骤（流程）

1. **列全 all 状态**：加载中 / 空数据 / 加载失败 / 部分成功 / 无权限 / 过期链接
2. **加载态做全**：给 loading、骨架屏、进度；加载失败要给错误与重试，而非死等
3. **空态与异常态**：无数据有友好提示与下一步，错误有原因与处置
4. **交互边界**：禁用态、重复连点防抖、可取消、超时处理
5. **可访问性 a11y**：键盘可操作、语义标签、对比度、焦点管理、屏幕阅读可读
6. **极端条件**：慢网络、小屏、缩放、部分资源加载失败

## 评审/自检 checklist

- [ ] 加载/空/异常/部分失败/禁用/无权限这些状态都处理了吗？
- [ ] 失败有原因和重试，不是转圈或白屏？
- [ ] 连点/并发操作被防住或安全处理了吗？
- [ ] 键盘与屏幕阅读可用吗？焦点与语义对吗？
- [ ] 慢网/小屏/异常数据下还健壮吗？

## 常见坑

- ❌ 只有"理想有数据"这一种状态，加载失败就卡 loading
- ❌ 空态白屏，用户不知道是没数据还是出错了
- ❌ 按钮可无限连点，信息被重复提交
- ❌ 只鼠标能点，键盘/读屏用不了；对比度过低看不清

## 产出物

- 各状态齐全、失败有兜底、交互边界健壮、可访问性达标的 UI

## 关联

- 这些状态有没有测到 → 用 `test-design` 的正反边界覆盖
- 性能态（卡顿/慢）→ 用 `frontend-performance-engineering`