---
name: know-your-project
description: "Use when initializing a project (init / onboarding / know your project): reverse-engineer an unfamiliar or half-handover codebase, produce the PROJECT-REVIEW.md deliverable, and pass the self + human-confirmation gates before moving to the design phase. Front-load keywords: 初始化, 认识项目, 接项目, 反向工程, 摸清项目, onboarding, know your project, reverse engineer, init."
---

# Know Your Project（初始化）

把一个陌生/半道接手的项目摸清：从代码/文档出发还原业务、架构、数据、入口与风险，产出一份标准化的 `PROJECT-REVIEW.md`，并经过**软（自检）+ 硬（人工确认/阶段推进门禁）**两道闸后才算完成，进入「设计」阶段。

## 适用场景（when）

- 全新工程或完全没有 `AGENTS.md` / 文档不全的一堆代码
- 半道接手、交接信息缺失，需要快速建立正确认知
- 想在动手设计/开发前确认"我们对项目的理解一致"

## 输入（要拿什么进来）

- 工程根目录（你的工作区）
- 已有的 `README*` / `AGENTS.md` / `opencode.json` / 构建配置（若有，先读，节省时间）
- 没有则从代码本身出发

## 核心步骤（流程）

1. **先探现状**：读 README/AGENTS/构建配置；不存在就从目录结构和入口文件开始。
2. **分层还原**（可委派 `@explore` 快速扫，`@backend-architect`/`@frontend-architect` 按架构方向深化）：
   - 入口点/启动方式、路由/页面
   - 模块边界、依赖方向、分层
   - 数据模型/存储/schema/迁移
   - 外部依赖、配置项、环境变量（**不记录真实密钥**）
3. **反向还原业务规则**：从实现推导业务规则与约束；**推断点显式标注"疑"**，不把猜测当事实。
4. **汇总风险与未知**：技术债、缺文档、高优先坑；以及**待人工确认项**清单。
5. **产出 `PROJECT-REVIEW.md`**：使用下方模板，六条必填字段全部 `yes`；`status: draft`。
6. **自检门禁（软）**：逐项过 checklist；全过后 `status → complete`。
7. **人工确认门禁**：用 `question` 向你复述要点；你确认后 `human_confirmed → true`。（阶段硬门禁会校验这两处状态。）

## 产出物：PROJECT-REVIEW.md 模板

```markdown
---
project: <工程名>
status: draft            # 自检通过后置 complete
entrypoints: no          # 必填
architecture: no         # 必填
data_model: no           # 必填
business_rules: no       # 必填
dependencies: no         # 必填
risks: no                # 必填
human_confirmed: no      # 人工确认后置 true
---

# PROJECT-REVIEW — <工程名>

## 1. 项目概览
一句话业务目标；技术栈/语言/框架；运行时。

## 2. 架构与分层
- 入口点（CLI/server/启动文件）
- 模块边界、依赖方向、部署拓扑

## 3. 数据模型
- 存储/DB/schema/表/迁移；读写路径

## 4. 业务规则还原
- 从实现还原的规则与约束；推断点标注"疑"

## 5. 外部依赖与配置
- 第三方服务、配置项、环境变量（不含真实密钥）

## 6. 构建/测试/部署
- 构建命令、测试命令、CI/部署流程

## 7. 风险与未知
- 技术债、缺文档、高优先坑
- 待人工确认项（逐条列出）

## 8. 自检声明
- 六个必填字段是否全 yes；探索覆盖了什么、跳过了什么
```

> 完成后：依据确认的 REVIEW 在当前工程根生成/更新 `AGENTS.md`，沉淀可复用认知。

## 评审/自检 checklist（软门禁）

- [ ] `PROJECT-REVIEW.md` 已在工程根生成？
- [ ] 六项必填（entrypoints/architecture/data_model/business_rules/dependencies/risks）全 `yes`？
- [ ] 推断点已标注"疑"，未把猜测当事实？
- [ ] "待人工确认项"已列出？
- [ ] `status` 已置 `complete`，且已向用户复述要点并获确认（`human_confirmed: true`）？

## 常见坑

- ❌ 一上来就写代码/设计，没先反向工程 → 认知错位、返工
- ❌ 把推断当事实、不标"疑" → 误导后续阶段
- ❌ 缺字段也提交 → 被 `know-phase-gate` 硬拦，进不了规格阶段
- ❌ 记录真实密钥/敏感信息进 REVIEW

## 产出物

- `PROJECT-REVIEW.md`（六字段全 yes、human_confirmed: true）
- 根据它生成的 `AGENTS.md`
- `@` 委派完成探索的子代理贡献（记录在案）