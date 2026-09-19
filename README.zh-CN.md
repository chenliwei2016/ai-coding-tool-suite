<div align="center">

# ai-coding-tool-suite

**语言：** [English](./README.md) | 中文

一套面向企业级研发流程的 AI 软件工程工具——流程、技能(skills)、代理(agents)、命令(command)与插件(plugins)。

</div>

## 概述

本仓库把可复用的工程构件打包到一起，帮助 AI 编码助手（例如 [opencode](https://opencode.ai)）在各类真实研发任务中以一致、可靠的方式工作。它面向希望采用"沉淀好的、经过实战检验的开发实践"而非"临时拼凑提示词"的团队。

## 双语目录结构

每份构件都同时提供**中文与英文**两种版本。按你团队的语言选择对应目录，复制进你的工程即可。

```
project/
├── chinese/               # 中文版（以作者维护为准）
│   └── .opencode/
│       ├── skills/
│       ├── agents/
│       ├── commands/
│       └── plugins/
└── english/               # English edition（英文翻译版）
    └── .opencode/
        ├── skills/
        ├── agents/
        ├── commands/
        └── plugins/
```

| 目录 | 说明 |
| ---- | ---- |
| `skills/` | 按需加载的领域化工作手册。 |
| `agents/` | 角色化代理（后端/前端架构师与开发者、QA），带聚焦指令。 |
| `commands/` | 可复用的斜杠命令。 |
| `plugins/` | 接入工具链的插件（例如 QA 发布闸口）。 |

### 触发关键词策略

- **中文版**（`chinese/`）：front-load 触发关键词保留**中英双语**（中文 + English）——中文作者常在中英文里混写，因此两套都能可靠触发。
- **英文版**（`english/`）：触发关键词仅保留**英文**，与英文用户的实际书写习惯一致。

## 快速开始

```bash
mkdir -p project/.opencode
cp -r chinese/.opencode/* project/.opencode/
```

英文团队可用 `cp -r english/.opencode/* project/.opencode/`。运行在工程里的代理会自动识别 skills、agents、commands 与 plugins。

## 维护工作流（双语同步）

**中文版是作者维护的主版本。** 中文内容变更后翻译进 `english/`；若内容由英文贡献者撰写，则反译回 `chinese/`。两份目录树需保持同步：同名、同结构——仅语言与触发关键词策略不同。

## 参与贡献

欢迎两种语言下提交改进、缺陷修复与新的工作手册。请保持每个 skill 自包含、聚焦且可测试；新增内容请同步到另一套语言目录。

## 许可证

基于 MIT License 开源。参见 [LICENSE](./LICENSE)。