<div align="center">

# ai-coding-tool-suite

**语言：** [English](./README.md) | 中文

一套**通用 AI 辅助编码框架**——用 opencode 机制驱动完整的企业级研发生命周期：`agent`(谁来做)、`skill`(怎么做)、`command`(触发哪一步)、`plugin`(硬门禁)。以**中英双语**打包成可直接放入任意工程的可复用内容。

</div>

## 概述

把"经过实战检验的开发实践"沉淀为约定的工程方法，而不是临时拼凑提示词。框架把**从接手一个代码库到发布上线再到复盘**的 7 个阶段，串成一条"命令 + 技能 + 硬门禁"的链路——每个阶段都**独立门禁下一阶段**，交付物未达标、未评审、未经人工确认，就放行不了。

## 生命周期（7 个阶段，硬门禁串联）

```
/know-project → know-phase-gate → /design → design-phase-gate → /plan → plan-phase-gate
→ /dev → dev-phase-gate → /test → test-phase-gate → /release → release-phase-gate → /retro
```

| 阶段 | 命令 | 技能 | 门禁（插件 / env） | 交付物 |
|---|---|---|---|---|
| 1 初始化 / 认识项目 | `/know-project` | `know-your-project` | `know-phase-gate.ts` / `KNOW_PHASE_GATE` | `PROJECT-REVIEW.md` |
| 2 设计 (SDD / **Spec**) | `/design` | `design-and-spec` | `design-phase-gate.ts` / `DESIGN_PHASE_GATE` | `DESIGN.md` |
| 3 计划 (SDD **task 拆解**) | `/plan` | `plan-project` | `plan-phase-gate.ts` / `PLAN_PHASE_GATE` | `PLAN.md` |
| 4 开发 | `/dev` | `dev-implement` | `dev-phase-gate.ts` / `DEV_PHASE_GATE` | 实现代码 + 单测 |
| 5 测试 | `/test` | `test-project` | `test-phase-gate.ts` / `TEST_PHASE_GATE` | `TEST.md` |
| 6 部署 / 发布 | `/release` | `release-project` | `release-phase-gate.ts` / `RELEASE_PHASE_GATE` | `RELEASE.md` |
| 7 复盘 | `/retro` | `retro-evaluate` | *(叶子节点，无出口门禁)* | `RETRO.md` |

每阶段形态统一为 **命令 → 技能 → 门禁**，产出一份带 frontmatter 状态的交付物，由下一阶段门禁机检。返工有上限（开发 item `K=3`、阶段 `M=20`），不让循环失控。

*SDD 对齐说明：`DESIGN.md` 即 SDD / SpecKit 所称的 **spec**（需求与实现之间的契约）；`PLAN.md` 进一步把它拆成可独立实现的 **unit task**。*

## 编排模型

- **主代理只有两个**：opencode 内置的 `plan`(先规划) 与 `build`(驱动执行)。
- 所有自定义角色代理（后端/前端架构师、开发者、QA）都是 `mode: subagent`，只通过 `@` 调用。
- 每个阶段由其**绑定 `agent: build` 的命令**进入；命令模板让 build 统一调度、`@` 委派相关子代理。纯工具命令（如 `/sync-translation`）保持 agent 无关。

## 声明化项目规范

凡是框架无法预知你工程真实情况的部分，一律**声明化**——由你按项目填写、门禁直接读取，绝不硬编码：

- `GATE-REQUIREMENTS.md` —— 需求门禁规范 + **性能/安全阈值**（设计阶段必需）。
- `RELEASE-PLAN.md` —— 部署各段的构建/验证/投产/回滚具体命令。

## 双语目录结构与关键词策略

每份构件都提供**中文与英文**两种版本；按你团队的语言选目录复制进工程即可。

```
project/
├── chinese/   # 中文版（以作者维护为准）
│   └── .opencode/{skills,agents,commands,plugins}
└── english/   # English edition（英文翻译版）
    └── .opencode/{skills,agents,commands,plugins}
```

- **中文版**：skill 的 front-load 触发关键词保留**中英双语**（中文 + English）。
- **英文版**：触发关键词仅保留**英文**；且 `english/` 目录必须保持零中文。

## 快速开始

```bash
mkdir -p project/.opencode
cp -r chinese/.opencode/* project/.opencode/     # 或：cp -r english/.opencode/* project/.opencode/
```

从 `/know-project` 开始。门禁插件会自动从 `.opencode/plugins/` 加载，无需额外配置。

## 工程级工具

- `commit-translation-gate.ts` —— 当 `chinese/` 或 `english/` 下有文件改动而其 twin 未同步时，拦截 `git commit`/`push`（仅限这两个镜像目录）。旁路：`TRANSLATION_GATE=off`。
- `/sync-translation` —— 检查改动的双语文件、自动判定方向并同步 twin。

## 测试

`test/` 内置一个真实 opencode 的 E2E 测试套（T1–T46），用一次性工程验证每个门禁：

```bash
bash test/scaffold.sh        # 构建 test/.runtime/app
bash test/run-all.sh         # 运行全部门禁用例（T1–T46）
```

## 维护

**中文版是作者维护的主版本。** 保持 `chinese/` 与 `english/` 同步：同名、同结构——仅语言与关键词策略不同。

## 参与贡献

欢迎两种语言提交改进与新工作手册；每项新增都请同步到另一套语言目录。

## 许可证

基于 MIT License 开源。参见 [LICENSE](./LICENSE)。