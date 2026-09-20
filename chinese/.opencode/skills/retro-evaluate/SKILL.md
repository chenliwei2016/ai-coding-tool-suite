---
name: retro-evaluate
description: "Use when running an optional but high-yield retrospective after a completed lifecycle: produce RETRO.md with a quantified metrics dashboard per phase and keep/improve lists feeding the next loop, grounded in numbers like code-adoption and rework rate. Front-load keywords: 复盘, 评估, 指标, 代码采用率, 返工率, 门禁, 缺陷逃逸, 周期, retrospective, retro, metrics, adoption rate."
---

# Retro / Evaluate（复盘评估）

在一条生命周期（init→release）**完成后**做高产出复盘：产出 `RETRO.md`，用**可量化的数字指标看板**观察每个阶段，"好的保留、坏的改进"，并把改进 feed 进**下一轮**循环。**没有数字的结论不写进 RETRO.md。**

## 适用场景（when）

- 刚完成 `release`（`RELEASE.md` `deployed: yes`），准备收尾/进入下一轮
- 想量化评估整条 AI 编码流程"到底有效没有"
- 想沉淀改进，避免下轮重犯

## 输入（要拿什么进来）

- 各阶段产物与状态：`PROJECT-REVIEW.md` / `DESIGN.md` / `PLAN.md`（含 item retries）/ `TEST.md` / `RELEASE.md`
- `issues.md`（缺陷记录）
- 借助 `knowledge-retrospective` 方法沉淀

## 核心步骤（流程）

1. **收集各阶段数字**：从上面交付物里把能量化的指标统计出来（有记录才算，没记录标 N/A）。
2. **建立指标看板**：每阶段一张数字表，见下款模板。
3. **提炼改进**：由指标异常推导"保留(P)/改进(A)"清单，每条必须带前后量化对比。
4. **落盘 `RETRO.md`**：frontmatter 置 `status: draft`；正文含指标看板、P/A 清单、下轮目标。
5. **人工确认**：`question` 汇报看板与 P/A，确认后置 `human_confirmed: true`、`status: complete`。
6. **feed 下一轮**：把可复用改进写回相应 skill/规范（防膨胀，只留指针）。

## 必备缺省指标（每阶段一张，项目可扩展）

| 阶段 | 量化指标 |
|---|---|
| 初始化 | 产出耗时；PROJECT-REVIEW 必填字段一次通过数 |
| 设计 | 设计评审一次通过率；需求 sign-off 轮次 |
| 计划 | 计划准确度（预估 vs 实际耗时偏差 %）；验收全过率 % |
| 开发 | **代码采用率 %**（AI 生成/建议被实际保留比例）；**返工率 %**（retries>0 的 item 占比）；item 一次通过率 % |
| 测试 | **缺陷逃逸率 %**（测试阶段才发现 ÷ 总缺陷）；测试覆盖率增量；门禁首拦次数 |
| 发布 | 发布耗时；上线后 0 回滚次数；验证通过率 |
| 全链 | 周期时间（init→deploy 总耗时）；各阶段耗时；门禁总拦截数 |

## 产出物：RETRO.md 模板

```markdown
---
status: draft
metrics_row: no
improvements_row: no
fed_back: no
human_confirmed: false
---

# RETRO — <循环>

## 1. 指标看板 (metrics dashboard)
| 阶段 | 指标 | 数值 | 上一轮 | 差异 |

(每个阶段一张；无数据的标 N/A，不空泛下结论)

## 2. 保留 (keep)
- 做得好的、下轮要维持的（带数字）

## 3. 改进 (improve)
- 要改的、怎么改、预期量化收益

## 4. 下轮目标
- 1~3 个可量化的本轮目标

## 5. 沉淀回写
- 已写回哪些 skill / 规范（防膨胀，只留指针）
```

## 评审/自检 checklist（软门禁）

- [ ] 每个结论是否都带**数字**（否则 N/A 或删）？
- [ ] 必备缺省指标（含代码采用率、返工率、缺陷逃逸率、周期）是否都有了？
- [ ] 保留/改进是否有前后量化对比？
- [ ] 下轮目标是否可量化？
- [ ] `human_confirmed: true`、`status: complete`、`fed_back: yes`？

## 常见坑

- ❌ 空泛总结、没有数字 → 不算有效复盘
- ❌ 只复盘不落地 → 改不动；改进没回写下一轮
- ❌ 造假指标 / 凭感觉估算 → 误导下轮

## 产出物

- `RETRO.md`（量化指标看板 + 保留/改进 + 下轮目标，`human_confirmed: true`、`status: complete`），并 feed 进下一轮