<div align="center">

# ai-coding-tool-suite

**Languages:** English | [中文](./README.zh-CN.md)

A suite of AI-assisted software engineering tooling — processes, skills, agents, commands, and plugins — designed for enterprise-grade development workflows.

</div>

## Overview

This repository packages reusable building blocks that help AI coding assistants (such as [opencode](https://opencode.ai)) work in a consistent, reliable way across real-world development tasks. It is built for teams that want codified, battle-tested engineering practices rather than ad-hoc prompting.

## Bilingual layout

Every artifact ships in **both Chinese and English**. Pick the language folder that matches your team and put it in your project.

```
project/
├── chinese/               # 中文版 · Chinese edition (author-maintained)
│   └── .opencode/
│       ├── skills/
│       ├── agents/
│       ├── commands/
│       └── plugins/
└── english/               # English edition (translated)
    └── .opencode/
        ├── skills/
        ├── agents/
        ├── commands/
        └── plugins/
```

| Directory | Description |
| --------- | ----------- |
| `skills/` | Domain-specific playbooks the assistant loads on demand. |
| `agents/` | Role-based agents (backend/frontend architect & developer, QA) with focused instructions. |
| `commands/` | Reusable slash-commands. |
| `plugins/` | Plugins that hook into tooling (e.g. a QA release gate). |

### Trigger keywords policy

- **Chinese edition** (`chinese/`): front-load trigger keywords are **bilingual** (中文 + English) — Chinese authors frequently mix English into their prompts, so both trigger reliably.
- **English edition** (`english/`): front-load keywords are **English-only**, matching how English users actually write.

## Getting started

```
mkdir -p project/.opencode
cp -r english/.opencode/* project/.opencode/
```

Or for a Chinese team: `cp -r chinese/.opencode/* project/.opencode/`. An agent running in the project then picks up the skills, agents, commands, and plugins automatically.

## Maintenance workflow (bilingual syncing)

The **Chinese edition is the author-maintained source of truth**. When Chinese content changes, it is translated into `english/`; when content is authored by an English contributor, it is translated back into `chinese/`. Keep the two trees in sync: same file names, same structure — only the language and the front-load keyword policy differ.

## Contributing

Improvements, bug fixes, and new playbooks are welcome in both languages. Keep each skill self-contained, focused, and testable. If you add content, please mirror it into the other language tree.

## License

Licensed under the MIT License. See [LICENSE](./LICENSE).