/**
 * know-phase-gate —— 初始化阶段（Know Your Project）的门禁插件
 *
 * 目的：在进入「设计」阶段前，强制要求初始化交付物 PROJECT-REVIEW.md 已达标。
 * 若缺失、状态未 complete、或未经人工确认，则拦下「进入设计阶段」的动作。
 *
 * 钩子：command.execute.before —— 当即将执行的命令是下一阶段入口（/design）时，
 * 校验当前工程根 PROJECT-REVIEW.md 的 frontmatter：
 *   - 存在且 status == complete
 *   - 六必填字段（entrypoints/architecture/data_model/business_rules/dependencies/risks）== yes
 *   - human_confirmed == true（人工确认门禁）
 * 任一不满足 → throw 拦截，并提示先完成 /know-project。
 *
 * 开关（env KNOW_PHASE_GATE）：设 "off" 则本次会话关闭本门禁。
 */
import { readFileSync } from "node:fs";
import { join, isAbsolute } from "node:path";

const NEXT_PHASE = ["design"];            // 下一阶段命令关键词，命中即需要本阶段门禁
const REQUIRED = [
  "entrypoints",
  "architecture",
  "data_model",
  "business_rules",
  "dependencies",
  "risks",
];

function isDesignCommand(s: string): boolean {
  const t = (s || "").toLowerCase().trim();
  if (!t) return false;
  return NEXT_PHASE.some((k) => t === "/" + k || t === k || t.includes("/" + k));
}

function frontmatter(path: string): Record<string, string> | null {
  try {
    const text = readFileSync(path, "utf8");
    const m = text.match(/^---\n([\s\S]*?)\n---/);
    if (!m) return null;
    const out: Record<string, string> = {};
    for (const line of m[1].split("\n")) {
      const kv = line.match(/^\s*([A-Za-z_]+):\s*(.*)$/);
      if (kv) out[kv[1].trim()] = kv[2].trim();
    }
    return out;
  } catch {
    return null;
  }
}

function complain(path: string | null, reason: string): never {
  throw new Error(
    `[know-phase-gate] blocked: cannot proceed to the design phase. ${reason}\n` +
      (path ? `  expected ${path} ` : "") +
      `Run /know-project to produce PROJECT-REVIEW.md, pass the self + human-confirmation gates, then retry.`,
  );
}

export default async function knowPhaseGate(input: {
  project?: { directory?: string | null };
}) {
  const ws = input?.project?.directory ?? process.cwd();

  return {
    "command.execute.before": async (inp: Record<string, unknown>) => {
      if (process.env.KNOW_PHASE_GATE === "off") return;

      // 尽量从多种可能的输入字段里取命令名
      const candidates = [
        inp?.name,
        inp?.command,
        inp?.slashCommand,
        inp?.id,
        (inp?.command as any)?.name,
        (inp?.data as any)?.name,
      ]
        .map((s) => (typeof s === "string" ? s : String(s ?? "")))
        .join(" ");

      if (!isDesignCommand(candidates)) return;

      const review = join(isAbsolute(ws) ? ws : join(process.cwd(), ws), "PROJECT-REVIEW.md");
      const fm = frontmatter(review);

      if (!fm) complain(review, "PROJECT-REVIEW.md does not exist or has no frontmatter.");
      if ((fm as any).status !== "complete") complain(review, "PROJECT-REVIEW.md is not marked complete (status != complete).");
      for (const f of REQUIRED) {
        if ((fm as any)[f] !== "yes") complain(review, `required field '${f}' is not 'yes'.`);
      }
      if ((fm as any).human_confirmed !== "true") complain(review, "the project has not been human-confirmed (human_confirmed != true).");
    },
  };
}