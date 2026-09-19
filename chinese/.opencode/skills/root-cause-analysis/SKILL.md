---
name: root-cause-analysis
description: "Use when investigating a bug, incident, or failure to find the fundamental cause and propose a systemic fix, rather than a band-aid. Front-load keywords: 根因分析, 定位问题, 排障, bug 排查, 复盘, 为什么, 定位, 排查, root cause analysis, locate the problem, troubleshooting, bug investigation, why, root cause, debugging, root-cause, incident."
---

# Root Cause Analysis

从现象追溯到根本原因，给出系统性解法，而不是头痛医头。

## 适用场景（when）

- 线上/测试出现 bug、报错、性能问题、异常
- 现象清楚了但说不清为什么
- 反复出现的问题（修了一次又犯）
- 复盘事故，要找"真正该改的地方"

## 输入（要拿什么进来）

- 现象 / 报错 / 复现步骤
- 相关日志、数据、环境信息
- 排查过程中的线索与先验

## 核心步骤（流程）

1. **先复现，再定位**：能稳定复现比堆日志更有价值
2. **沿链路由外向内抽丝剥茧**：从表象逐层追到源头，区分"触发点"与"根因"
3. **验证假设**：不要靠猜，用证据（日志/数据/最小复现）证伪/证实
4. **区分根因与触发点**：触发点是一次性意外，根因是让这意外成为可能的根本缺陷
5. **给系统性解而非补丁**：修复让同类问题不再发生，并给出预防手段

## 评审/自检 checklist

- [ ] 结论是否基于证据，而非猜想？
- [ ] 找到的是"根因"还是只是"这次触发的点"？
- [ ] 修复是否防住了同类问题，还是只补了眼前这一处？
- [ ] 是否补充了回归测试 / 监控 / 预警防止复发？

## 常见坑

- ❌ 看到第一层原因就"修好了"，没追问"为什么会走到这一步"
- ❌ 靠猜/经验下结论，没验证假设
- ❌ 把触发点当根因——修了眼前，同类还会再来
- ❌ 只改代码防御，没加测试/告警，"修好"但无防复发机制

## 产出物

- 根因结论 + 证据链 + 系统性修复方案 + 防复发措施