---
name: automated-test-suite
description: "Use when building or maintaining an automated test suite (API and E2E): layering cases, keeping them stable, repeatable and fast, and guarding against flaky tests. Front-load keywords: 自动化测试, 测试套件, 接口自动化, 用例分层, 稳定, 不脆弱, automated testing, test suite, API tests, E2E, case layering, stable, not flaky, flaky."
---

# Automated Test Suite

搭建并把维护一套接口/E2E 自动化用例，让它**稳定、可重复、反馈快、不矫情（flaky）**。自动化最怕的是——跑一次变一次结果，没人再信它。

## 适用场景（when）

- 新建一套接口/E2E 自动化用例
- 维护/修复既有用例套件里的不稳定项
- 决定哪些该自动化、哪些不值得

## 输入（要拿什么进来）

- 要被自动化的功能点、接口契约
- 已有用例、已知的 flaky 项、CI/执行环境

## 核心步骤（流程）

1. **分层取舍**：单测→接口→E2E 各司其职，能下沉的不堆到 E2E（E2E 贵且脆）
2. **每用例独立可重复**：前置自建自清，不依赖跑的顺序、不依赖别人留下的数据
3. **保持稳定与幂等**：间断性失败优先根治（等待、数据隔离、干净环境）
4. **快速反馈**：套件足够快，让"跑了就有结论"而不是"等一小时"
5. **失败即噪音治理**：flaky 用例要么修稳定，要么先标注隔离，别让偶发失败掩盖真问题
6. **纳入回归**：进 CI，成为 release gate 的输入之一

## 评审/自检 checklist

- [ ] 用例分层合理吗？该单测处理的有没有被硬塞进 E2E？
- [ ] 每个用例可独立重复吗，会不会受顺序/脏数据影响？
- [ ] 有不 flaky 吗——反复跑结果一致、稳得住？
- [ ] 反馈快不快？失败信息能否一眼定位？

## 常见坑

- ❌ 全堆 E2E，跑得慢又脆，改一点崩一片
- ❌ 用例依赖执行顺序和共享数据，一碰就挂
- ❌ 偶发失败视而不见，套件失信，真失败被淹没
- ❌ 为求快乱 sleep，反而更不稳定

## 产出物

- 分层合理、稳定可重复、反馈快、可进回归的自动化用例套件

## 关联

- 写用例代码靠不靠谱 → `feature-implementation` / `unit-test-writing`
- 套件结果 → 喂给 `regression-release-gate` 做放行依据