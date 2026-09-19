---
name: frontend-performance-engineering
description: "Use when optimizing frontend performance during development—initial load and rendering—regarding bundle size, lazy loading, hydration, LCP/CLS/FPS, and long lists. Front-load keywords: 前端性能, 首屏, 包体, 懒加载, 水合, 长列表, 白屏, 卡顿, frontend performance, first screen, bundle size, lazy loading, hydration, LCP, CLS, FPS, long lists, white screen, performance optimization, bundle, lazy load, jank. Contrast with non-functional-testing which measures and reports rather than improves."
---

# Frontend Performance Engineering（前端性能工程）

在开发期把前端的**首屏加载与渲染性能**做上去：控制包体、按需加载、减少阻塞、优化水合与渲染、处理长列表和卡顿。它是"怎么改快"（开发期），与"测量并出报告"（`non-functional-testing`）触发时机相反，故拆开。

## 适用场景（when）

- 页面首屏慢、白屏久、包体积大
- 滚动卡顿、长列表渲染慢、频繁重排
- 需要在不改产品的前提下把性能指标（LCP/CLS/FPS/包体）提上去

## 输入（要拿什么进来）

- 当前性能现状（测量数据/可感知的卡）
- 页面结构、依赖、渲染方式（SSR/CSR、组件树、资源加载）

## 核心步骤（流程）

1. **先测量后优化**：用真实指标（LCP/CLS/FPS/包体构成）定位瓶颈，别凭感觉优化
2. **控首屏包体**：按需/懒加载、拆包、去掉或外链重型依赖
3. **减少阻塞与关键路径**：内联关键 CSS、延迟非关键资源、减少主线程阻塞
4. **水合/渲染优化**：SSR 水合去重、虚拟列表、避免无谓重渲染
5. **稳定流畅**：降 CLS（布局稳定）、降 FPS 卡顿（动画用合成层）
6. **观测回归**：设性能 budget，防止优化成果被后续改动回退

## 评审/自检 checklist

- [ ] 是带着测量数据优化，还是凭感觉瞎改？
- [ ] 首屏包体/关键路径减下来了吗？重型依赖按需了吗？
- [ ] 水合与重复渲染优化了吗？长列表不卡了吗？
- [ ] CLS（布局抖动）、FPS（动画卡顿）稳重了吗？
- [ ] 有性能 budget/观测防止回退吗？

## 常见坑

- ❌ 不测量直接优化，优化半天不是瓶颈
- ❌ 为了首屏把整个依赖库都拆稀碎，反而更糟
- ❌ 只盯 LCP，忘了 CLS 布局抖动和滚动卡顿
- ❌ 优化完不设 budget，下一个版本又偷偷变慢

## 产出物

- 首屏与渲染更快、稳定流畅、且有观测防回退的前端

## 关联

- 上线前的性能测量/出报告 → 用 `non-functional-testing`
- 状态与渲染正确性 → 用 `frontend-state-flow-design`