/**
 * qa-gate —— QA 工作流门禁插件
 *
 * 目的：让"先登记 issue 再动手"这条编排时序真正可强制（command 只能引导）。
 *
 * 两个钩子：
 *  1. chat.message          —— 柔性提醒：消息命中"问题类"关键词时，往该条消息注入一条
 *                             系统级提醒（synthetic part），引导模型先按 QA 流程登记。
 *  2. tool.execute.before   —— 强制闸：对 task/edit/write/bash 等"动手解决"的工具，
 *                             若当前工程 issues.md 在开关窗口内没有登记，则直接中断。
 *
 * 开关（环境变量 QA_GATE）：
 *  - hard（默认）：真警察，issues 没登记就拦截 tool 执行
 *  - soft：只注入提醒，不拦截，不打扰日常探索
 *  - off：完全禁用，插件转为 no-op
 * 窗口（QA_GATE_WINDOW_MINUTES，默认 30）：issues.md 最后修改时间距今超过该值视为"未登记"。
 */
import { statSync } from "node:fs";
import { join } from "node:path";

const KEYWORDS = [
  "白屏", "报错", "异常", "bug", "不行", "没生效", "坏了", "崩溃",
  "修复", "问题", "缺陷", "失败", "error", "exception", "怎么回事", "为什么",
];

const SOLVING_TOOLS = new Set(["task", "edit", "write", "bash", "patch", "apply_patch"]);

const REMINDER =
  "【QA 流程提醒】这个问题属于“问题类”诉求。按工作流，第一步应先把问题登记进当前工程根 " +
  "issues.md（子问题粒度，含期望/复现/归属），再按归属 @frontend-architect / @backend-architect 定方案、分派实施、验收。" +
  "可运行 /report <问题描述> 一键登记并分派。登记完成前，不要讨论方案或动手改。";

function mode(): "soft" | "hard" | "off" {
  const v = (process.env.QA_GATE || "hard").toLowerCase();
  return v === "hard" ? "hard" : v === "off" ? "off" : "soft";
}

function windowMinutes(): number {
  const n = Number.parseInt(process.env.QA_GATE_WINDOW_MINUTES || "30", 10);
  return Number.isFinite(n) && n > 0 ? n : 30;
}

function issuesFile(directory: string | null | undefined): string | null {
  return directory ? join(directory, "issues.md") : null;
}

// issues.md 是否存在，且最后修改时间在窗口内（视为"近期有登记"）
function isRecentlyRegistered(file: string, winMin: number): boolean {
  try {
    const st = statSync(file);
    return Date.now() - st.mtimeMs <= winMin * 60_000;
  } catch {
    return false;
  }
}

export const qaGateRule = {
  key: "qa-gate",
};

export default async function qaGate(input: { project?: { directory?: string | null } }) {
  const dir = input?.project?.directory;
  const file = issuesFile(dir);

  return {
    /** 柔性提醒（soft）。命中关键词时给模型注入一条"先登记"的系统提示。 */
    "chat.message": async (
      _inp: { sessionID: string; messageID?: string },
      out: { parts: any[] },
    ) => {
      if (mode() === "off") return;
      const text = (Array.isArray(out?.parts) && out.parts.map((p) => p?.text ?? "").join(" ") || "")
        .toLowerCase();
      if (!KEYWORDS.some((k) => text.includes(k.toLowerCase()))) return;
      if (mode() === "soft" && file && isRecentlyRegistered(file, windowMinutes())) return;

      out.parts.push({
        id: `qa-gate-${Date.now()}`,
        sessionID: _inp.sessionID,
        messageID: _inp.messageID,
        type: "text",
        text: REMINDER,
        synthetic: true,
      });
    },

    /** 强制闸（hard）。对"动手解决"类工具，issues 未登记则中断。 */
    "tool.execute.before": async (inp: { tool: string }) => {
      if (mode() !== "hard") return;
      if (!SOLVING_TOOLS.has(inp.tool)) return;
      if (file && isRecentlyRegistered(file, windowMinutes())) return;

      throw new Error(
        "【QA 门禁】当前工程的 issues.md 没有近期登记记录，阻止本次动手。请先运行 " +
        "/report <问题描述> 登记并分派，完成后再重试。",
      );
    },
  };
}