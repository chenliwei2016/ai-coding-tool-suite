---
name: non-functional-testing
description: "Use when running non-functional tests before a release—performance benchmarks, open-source vulnerability scanning, and penetration testing—and producing an NFR report that leadership uses to approve the go-live. Front-load keywords: 非功能测试, 性能测试, 渗透测试, 漏洞扫描, 压测, 稳定性, 报告, non-functional testing, performance testing, penetration testing, vulnerability scan, load test, stability, report, NFR, security review."
---

# Non-Functional Testing（非功能测试）

上线前对系统做**性能、安全漏洞、渗透**等非功能性验证，产出一份可交给领导审阅的**非功能测试报告**，作为批准上线的依据之一。这是一道与功能回归（`regression-release-gate`）独立的闸门——领导看着这份报告才放行。

## 适用场景（when）

- 发布前需要非功能验证：性能达标、无高危漏洞、通过渗透
- 需要产出一份"领导肯签字"的上线依据报告
- 评估一个版本能否经受实际流量与安全攻击

## 输入（要拿什么进来）

- 上线范围与变更面、目标/历史性能基线
- 生产环境的流量预估、SLA/SLO、合规与安全要求
- 依赖的三方组件清单（供漏洞扫描）

## 核心步骤（流程）

1. **定指标与目标**：明确要测哪些（性能：TPS/响应时间/资源占用/稳定性；安全：漏洞等级；渗透：攻击面），对齐"合格线=多少"
2. **建立基线**：历史或预期基线，没有基线谈"是否恶化"无意义
3. **性能/压测**：按预估流量加压力，观测吞吐、时延、CPU/内存/连接数，找瓶颈与拐点
4. **开源漏洞扫描**：对三方依赖跑漏洞库比对，按严重级分级，标注 CVE 与修复/规避
5. **渗透测试**：按攻击面（注入/越权/认证/敏感数据）演练，记录可利用性
6. **分级结论**：结果分【通过】【有风险但可带病（附条件）】【阻断】三种
7. **出报告**：指标→数据→结论→残留风险→是否具备上线条件，交付给领导决断

## 评审/自检 checklist

- [ ] 指标有明确目标且对齐了"合格线"吗（不是只报数字）？
- [ ] 有性能基线对比吗，能回答"比之前恶化了吗"？
- [ ] 漏洞按严重级分级、CVE 可追踪、有修复或规避建议吗？
- [ ] 渗透覆盖了关键攻击面，不是走过场？
- [ ] 结论是明确的通过/带病条件/阻断，而非含糊"还行"？
- [ ] 报告能直接支撑领导做上线决策吗？

## 常见坑

- ❌ 只压不出结论，报一堆 TPS 没有"是否达标"的判断
- ❌ 没有基线，压出来的数没法解释好坏
- ❌ 漏了稳定/容量/资源趋势，只在理想环境跑一次
- ❌ 漏洞扫描只看"有没有"，不看等级与是否可被利用/是否触达上线闸
- ❌ 报告堆数据不落结论，领导无从决策

## 产出物

- 覆盖性能/漏洞/渗透、分级明确、可直接支撑上线决策的非功能测试报告

## 关联

- 功能维度放行 → 用 `regression-release-gate`（非功能与功能是两道独立闸）
- 自动化跑性能 → 复用 `automated-test-suite` 的稳定性/反馈思想
- 报告成文 → 复用 `tech-writing`