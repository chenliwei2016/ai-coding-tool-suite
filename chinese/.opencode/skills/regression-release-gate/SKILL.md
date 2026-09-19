---
name: regression-release-gate
description: "Use before a release to decide whether it can ship: verifying changed scope is tested and nothing regressed, then giving a release-block decision. Front-load keywords: 回归, 发布验收, 上线把关, 放行, 打回, 验收, 冒烟, regression, release acceptance, release gate, release sign-off, ship, block, rejection, smoke test, acceptance."
---

# Regression & Release Gate

发布前最后一道闸：核对改动范围是否都测了、是否产生回归，然后给出**放行 / 打回**的明确结论。关键是"出结论"，不是"继续跑用例"。

## 适用场景（when）

- 准备发布/上线前的验收把关
- 判断一个版本是否可以放行
- 冒烟测试 + 回归确认 + 收尾判定

## 输入（要拿什么进来）

- 本次发布的实际改动范围（提交/变更清单）
- 已跑的测试集与执行结果、遗留的未决项

## 核心步骤（流程）

1. **拉齐改动范围**：本次到底改了什么，别用"感觉没改多少"
2. **范围↔覆盖核对**：每个改动点，找到对应的测试/验证，漏测的就是风险
3. **冒烟主链路**：核心主流程先通，再谈回归
4. **回归确认**：相关旧功能没有退化，会回归的都要测
5. **遗留项分级**：未决项里区分"可带病上线"与"必须打回"
6. **给出结论**：明确"放行 / 有条件放行 / 打回"，并写清依据，不模棱两可

## 评审/自检 checklist

- [ ] 改动范围覆盖核对真的对齐了吗，还是凭感觉？
- [ ] 回归相关旧功能测了吗，不只是新功能冒烟？
- [ ] 遗留项有分级、"可带病"的条件写清了吗？
- [ ] 结论是明确的放行/打回，还是含糊的"应该没问题"？

## 常见坑

- ❌ 只盯新功能，改动牵连的旧功能没人回
- ❌ 任何遗留都用"应该没问题"带过，闸门形同虚设
- ❌ 结论含糊，上线后出问题责任不清
- ❌ 把"测了很多条"当放行依据，而不是"改动都覆盖了"

## 产出物

- 有依据的放行/打回结论 + 分级遗留项，可追溯可负责