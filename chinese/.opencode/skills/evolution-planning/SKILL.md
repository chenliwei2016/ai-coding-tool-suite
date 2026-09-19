---
name: evolution-planning
description: "Use when designing long-term evolvable and replaceable structures, planning refactoring, migrations, or a technology renewal roadmap. Front-load keywords: 演进规划, 重构, 演进路线, 迁移, 技术演进, 长期结构, 渐进改造, evolution planning, refactoring, evolution roadmap, migration, technology evolution, long-term structure, refactor, evolution, roadmap, incremental migration."
---

# Evolution Planning

设计**可演进、可替换**的长期结构，规划渐进改造而非一次性重写。

## 适用场景（when）

- 系统要长期维护，担心未来改不动
- 计划重构、迁移、升级框架/语言版本
- 面对"历史包袱"与"理想架构"之间的渐进路径
- 为可替换性做铺垫（换组件/换下游/换存储）

## 输入（要拿什么进来）

- 现状与历史包袱（哪些是不能动的历史决策）
- 目标结构与期望方向
- 约束：人力、成本、兼容性、可随时回滚

## 核心步骤（流程）

1. **尊重历史包袱**：先搞清哪些是不可逆的历史决策，避免推翻重来
2. **设计可演进结构**：让新结构便于低成本替换（接口稳定、依赖反转、防腐层）
3. **渐进式改造**：小步、可回滚、可验证地推进，而非一次性重写
4. **保留窗口**：改造期间新旧共存，提供过渡与回退路径
5. **沉淀路线图**：分阶段目标、每步可验收、明确的完成标准

## 评审/自检 checklist

- [ ] 新结构是否比现状更**低成本可替换**/演进？
- [ ] 是否尊重了不可逆的历史决策，而非盲目推翻？
- [ ] 改造是否可**分步、可回滚、可验证**？
- [ ] 是否提供了过渡期兼容与回退路径？

## 常见坑

- ❌ 想一步到位重写，无视历史包袱与风险
- ❌ 只建新结构，没留新旧过渡与回滚路径，出事没法退
- ❌ 没有分阶段与验收，改造变成无底洞
- ❌ 只顾"未来理想"，忽略了当下要交付的业务

## 产出物

- 演进目标 + 分阶段路线图 + 过渡/回退方案 + 每步验收标准