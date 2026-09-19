---
name: code-reverse-engineering
description: "Use when confronting a foreign, legacy or undocumented codebase and needing to recover business rules, data flows and design intent from the implementation, then distill into understandable knowledge. Front-load keywords: 逆向, 反向工程, 读懂代码, 解析代码, 还原业务规则, 探索代码, reverse engineering, understand codebase, parse the code, recover business rules, explore the code, business rule extraction."
---

# Code Reverse Engineering

把陌生 / 历史 / 文档缺失的代码仓库，从实现反推出业务规则、数据流转与设计意图，沉淀成可理解、可解释、可据此修改的知识。是 `feature-implementation` 的"反向"：正向是把需求写进代码，逆向是把代码还原成需求。

## 适用场景（when）

- 接手 / 阅读陌生或历史代码，没有或极少文档
- 要基于一段旧实现去修改、迁移、评审前，先弄清它业务上到底在干什么
- 把团队沉淀的实现整理成知识文档

## 输入（要拿什么进来）

- 目标代码仓库 / 模块 / 一段实现
- 已知的外部线索：入口、调用方、注释、测试、部署环境

## 核心步骤（流程）

1. **先摸骨架与入口**：项目结构、模块边界、主流程入口——别一上来钻进细节
2. **沿主路径顺藤摸瓜**：选一条真实功能，从入口追到数据落地/出口的完整链路
3. **从实现细节收敛业务规则**：常量、判断分支、各种校验、状态机、映射 → 背后是哪条业务约束
4. **识别约定与通用模式**：重复结构、命名习惯、"处处这么写" → 往往藏着团队的一种约定或沉淀
5. **产出结构化知识**：规则清单 / 数据模型 / 调用关系 / 设计意图，逐条标注**推断依据**，并区分"确定 vs 猜测"
6. **交叉验证**：用注释、文档、调用方、测试互相印证，压低臆测比例

## 评审/自检 checklist

- [ ] 是还原了"业务上在干嘛"，还是只复述了代码在干什么？
- [ ] 每一条结论都标注了依据么？确定的和猜测的分开了么？
- [ ] 覆盖了数据流转与设计意图，不只是函数列表？
- [ ] 用独立线索交叉验证过，还是只凭一个角落的代码？
- [ ] 产出能支撑"据此安全修改"吗？

## 常见坑

- ❌ 一头扎进函数细节，看完忘光、没形成整体图景
- ❌ 把"代码怎么做的"当"业务为什么这么做"，丢了意图
- ❌ 凭一份代码就下结论，不交叉验证，把臆测当事实
- ❌ 产出是流水账，没有规则/意图/依据的区分

## 产出物

- 把黑盒代码还原成可理解、可解释、可据此修改的业务规则与设计意图文档

## 关联

- 摸边界 → 复用 `domain-modular-design`
- 结果成文 → 复用 `tech-writing`
- 判断屏上该不该动 → 结合对核心资产 vs 历史代码的判断