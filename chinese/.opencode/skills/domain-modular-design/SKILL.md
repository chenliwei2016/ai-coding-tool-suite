---
name: domain-modular-design
description: "Use when splitting a system into modules, defining responsibility boundaries, interfaces, or doing domain modeling, to keep components decoupled. Front-load keywords: 领域建模, 模块划分, 职责边界, 接口设计, 解耦, 防腐边界, domain modeling, module splitting, responsibility boundaries, interface design, decoupling, anti-corruption boundary, domain, modular, module boundary, interface."
---

# Domain & Modular Design

把系统拆分成职责清晰、边界明确、接口稳定的模块，避免代码腐化。

## 适用场景（when）

- 初次划分模块 / 子模块 / 包结构
- 定义模块间接口、依赖方向、调用契约
- 重构一个已经"乱成一团"的模块
- 判断某段逻辑属于哪个模块/哪层

## 输入（要拿什么进来）

- 业务能力地图 / 领域概念
- 现有代码的模块与职责
- 期望的耦合度与扩展点

## 核心步骤（流程）

1. **先摸清现状与既有边界**：理解现有代码的职责划分与约定，再动手设计，别凭空另起炉灶
2. **按职责/领域而非按技术**划分模块：同类职责内聚，跨模块低耦合
3. **明确依赖方向**：定义好"谁能依赖谁"，避免循环依赖
4. **设计稳定接口**：模块对外接口简洁稳定，内部实现可自由变化
5. **防腐**：阻止外部变化（如第三方/细节实现）渗入核心业务

## 评审/自检 checklist

- [ ] 模块划分是按"职责/领域"，还是误按了"技术层/文件类型"？
- [ ] 依赖方向是否一致、无环？
- [ ] 对外接口是否稳定、最小？
- [ ] 是否做到"改动一个需求只动一个模块"？（而非牵连多个）
- [ ] 新模块是否复用了既有边界与命名约定？

## 常见坑

- ❌ 没看现有边界就设计，新划分和存量模式打架
- ❌ 接口暴露内部细节，稍一变内部实现就破坏调用方
- ❌ 该防腐的没防腐，第三方细节一路穿透到业务层
- ❌ 模块间循环依赖，牵一发动全身

## 产出物

- 模块/边界/接口说明，依赖关系，职责归属的落地描述