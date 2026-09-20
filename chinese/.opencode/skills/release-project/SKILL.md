---
name: release-project
description: "Use when entering the release/deploy phase: build, verify in a version-verification environment, pre-prod review, then release to production following the declarative RELEASE-PLAN.md, producing RELEASE.md with a deployed state + human confirmation before handoff to retrospective. Front-load keywords: 发布, 部署, 上线, 投产, 制品, 版本验证, 投产前评审, release, deploy, production, artifact, go-live."
---

# Release / Deploy（发布部署）

驱动**制品构建 → 版本验证环境 → 投产前评审 → 生产**四段。框架**不写死**构建栈或工具——具体每一步用什么命令，一律读工程根的**声明化 `RELEASE-PLAN.md`**；框架只负责按四段推进、记录状态并卡签核，产出 `RELEASE.md`。

## 适用场景（when）

- 进入了「发布 / Release」阶段（由 `/release` 触发）
- 测试已通过（TEST.md `result: pass`）
- 想把制品构建、验证、评审、投产做成一串有门禁的可控流程，无论 node / java / docker / k8s

## 输入（要拿什么进来）

- `TEST.md`（`result: pass`）、`DESIGN.md`、`PLAN.md`
- **`RELEASE-PLAN.md`**（工程根，声明化部署计划，`GATE-*`/`RELEASE-*` 规范族）：四段各做什么/命令/验证点。**项目自定；未定先留白，由 skill 引导你按项目补**

## 核心步骤（流程）

1. **读 `RELEASE-PLAN.md`**：明确四段各自的动作与验证点。
2. **制品构建 (artifact)**：按计划构建产物并记录标识（镜像 tag / commit SHA / 包版本）到 `RELEASE.md` `artifact`。
3. **版本验证环境 (verified)**：把制品部署到版本验证环境并跑验证（冒烟/回归），通过后置 `verified: yes`。
4. **投产前评审 (prereviewed)**：对照 `GATE-REQUIREMENTS.md` 的验收口径做投产前评审，通过后置 `prereviewed: yes`。
5. **发布到生产 (deployed)**：按计划投产（含回滚预案），确认后置 `deployed: yes`。
6. **人工确认**：`question` 汇报制品标识/验证结果/投产情况，确认后置 `human_confirmed: true`、`status: complete`。
7. 完成后可进入「复盘 / Retrospective」（`release-phase-gate` 放行）。

## 产出物：RELEASE-PLAN.md（声明化，项目自填）

```markdown
# RELEASE-PLAN — <工程>

## 1. 制品 (artifact)
构建命令 / 产物标识约定 / 包管理器或镜像 tag 规则：<项目填>

## 2. 版本验证环境 (verify)
环境地址 / 部署命令 / 验证项：<项目填>

## 3. 投产前评审 (pre-review)
评审入口 / 责任人 / 依据口径：<项目填>

## 4. 生产发布 (production)
发布命令 / 回滚预案 / 发布窗口：<项目填>
```

## 产出物：RELEASE.md frontmatter

```markdown
---
status: draft
artifact: no        # 制品标识(如 SHA/tag/版本)
verified: no        # 版本验证环境通过
prereviewed: no     # 投产前评审通过
deployed: no        # 已投产
human_confirmed: false
---
```

## 评审/自检 checklist（软门禁）

- [ ] 已按 `RELEASE-PLAN.md` 完成四段（artifact/verified/prereviewed/deployed）？
- [ ] 制品标识已记录、验证有真实证据？
- [ ] 投产前评审已对照验收口径？
- [ ] 回滚预案已在计划中？
- [ ] 已向用户确认（`human_confirmed: true`、`status: complete`）？

## 常见坑

- ❌ 没有 `RELEASE-PLAN.md` 就硬定命令 → 脱离项目实际
- ❌ 验证走形式、没真实部署到验证环境 → 上线才炸
- ❌ 缺字段提交 → 被 `release-phase-gate` 硬拦
- ❌ 无回滚预案直接投产

## 产出物

- `RELEASE-PLAN.md`（声明化，项目自填）+ `RELEASE.md`（artifact/verified/prereviewed/deployed/human_confirmed 全置位，status: complete）