---
name: frontend-component-design
description: "Use when designing reusable frontend components—their public API (props/events/slots), controlled vs uncontrolled, composition, and reuse boundaries. Front-load keywords: 组件设计, 组件复用, 受控非受控, 组合, 组件库, component design, component reuse, props, controlled/uncontrolled, composition, component library, reusable component, compound. Works with the reuse/boundary detection in domain-modular-design."
---

# Frontend Component Design（组件设计）

设计可复用的前端组件：把公开 API（props/事件/插槽）、受控/非受控、组合方式、复用边界定清楚，让组件在多个页面被安全复用而不是复制 N 份。是 `domain-modular-design`"边界与复用"思想在前端组件这一层的具体落地。

## 适用场景（when）

- 发现同一 UI 出现在多处，决定要不要抽组件、怎么定接口
- 设计一个组件的对外 props/事件/插槽、默认值、语义
- 让组件兼顾"开箱即用"与"灵活扩展"

## 输入（要拿什么进来）

- 该组件被用的场景/差异点、被谁复用、数据怎么进来怎么通知出去
- 既有组件/设计语言的风格约定

## 核心步骤（流程）

1. **确认值不值得抽**：先看差异点，差异可控才抽（识别重复用 `domain-modular-design`）
2. **对外 API 设计**：props 语义明确、命名一致、有类型、默认值安全；事件/插槽职责单一
3. **受控 vs 非受控**：对需要外部接管的状态提供受控能力，默认非受控开箱即用
4. **组合优于继承**：用插槽/组合/高阶方式扩展，不做无止境加配置项的"上帝组件"
5. **关注复用成本**：抽出来要更好维护，别为复用而过度抽象
6. **写用法示例**：让调用方一看就懂怎么用、差异点怎么调

## 评审/自检 checklist

- [ ] 值得抽吗？差异点通过参数可控，而不是一个组件塞满 if-else？
- [ ] props/事件命名与语义清晰、有类型和合理默认值吗？
- [ ] 需要外部介入的状态提供受控路径了吗？
- [ ] 是靠组合扩展，还是堆配置项膨胀成上帝组件？
- [ ] 复用比复制更好维护，不是为抽象而抽象？

## 常见坑

- ❌ 为一两处差异做成几十个 if-else 的上帝组件
- ❌ API 命名随性、无类型、默认值不安全，用起来踩坑
- ❌ 该受控的没有受控路径，调用方无法接管状态
- ❌ 没写示例，调用方不确定怎么用，弃用自己去复刻

## 产出物

- API 清晰、开箱即用又能扩展、复用成本低、有示例的组件

## 关联

- 复用/边界判断 → 用 `domain-modular-design`
- 组件各状态做全 → 用 `frontend-ux-completion`
- 组件里状态流转 → 用 `frontend-state-flow-design`