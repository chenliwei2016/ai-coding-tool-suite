---
name: frontend-state-flow-design
description: "Use when designing the state and data flow of a frontend page—local vs server state, store partitioning, stale data, races, optimistic updates and refills. Front-load keywords: 状态管理, 数据流, 前端状态, 陈旧数据, 竞态, 乐观更新, state management, data flow, store, frontend state, stale data, races, optimistic update, loading. A concern specific to the browser that backend design does not share."
---

# Frontend State & Data Flow Design

设计前端页面里一份数据"从哪来、存哪、怎么失效更新、怎么跨组件共享"，并把陈旧数据、竞态、乐观更新这些浏览器特有的问题设计掉。后端设计中同一问题几乎不存在，故为前端专属技能。

## 适用场景（when）

- 一个新页面/复杂交互，要决定状态放哪个层级、怎么传递
- 区分：本地(临时 UI)状态 vs 服务端数据状态，各自归属与生命周期
- 处理数据刷新、失效、并发、乐观交互时的状态正确性

## 输入（要拿什么进来）

- 页面/功能的数据来源、更新时机、共享范围
- 用户交互（编辑、提交、刷新、多 tab）、既有 store 结构

## 核心步骤（流程）

1. **区分状态性质**：本地 UI 态（弹窗开关、选中项）与后端数据态分开管理，别混。
2. **定归属与共享边界**：一份数据该局部还是提升/下沉到全局，共享范围最小化。
3. **定数据获取与失效**：何时拉取、何时失效重取、缓存与陈旧数据的过期策略。
4. **处理竞态**：连点/并发/响应乱序，防止旧响应覆盖新状态。
5. **处理乐观与回填**：乐观更新要编排回滚/回填，失败有兜底。
6. **还原正确性**：刷新页、跳走再回、多数据源并发时，UI 与后端一致。

## 评审/自检 checklist

- [ ] 本地态与后端态分清楚了吗，没有把临时 UI 态塞进全局 store？
- [ ] 状态共享边界是最小化的吗？
- [ ] 陈旧数据会过期吗？缓存失效策略明确吗？
- [ ] 竞态、乱序响应处理了吗，旧响应不会覆盖新状态？
- [ ] 乐观更新失败会回滚/回填吗，刷新后 UI 与后端一致吗？

## 常见坑

- ❌ 所有状态一把梭进全局 store，跨组件就全局，失效全靠手动清
- ❌ 不设缓存失效，数据过期显示给用户
- ❌ 竞态不管，慢请求晚到把新结果覆盖
- ❌ 乐观更新不回滚，提交失败界面却假装成功

## 产出物

- 局部/服务端状态边界清晰、失效与竞态可控、正确性可预期的状态设计

## 关联

- 组件拆复用 → 用 `frontend-component-design` / `domain-modular-design`
- 跑出问题 → 用 `code-debugging`