/**
 * plan-phase-gate —— 计划阶段（Plan）的门禁插件
 *
 * 目的：在进入「实现（dev/implement）」阶段前，强制要求计划交付物达标。
 * 校验对象：工程根的 DESIGN.md（输入）与 PLAN.md（交付物）。
 *
 * 硬性条件（command.execute.before 拦 /dev 或 /implement）：
 *   - DESIGN.md 存在且 status == complete（输入就绪）
 *   - PLAN.md 存在且 status == complete
 *   - 六个必填字段（ordered_batches/parallel_tracks/task_backlog/
 *     dependencies/acceptance_mapping/reviewed）== yes（含 reviewed=yes 自动评审）
 *   - human_confirmed == true（计划已人工确认）
 * 任一不满足 → throw，提示先完成 /plan。
 *
 * 开关（env PLAN_PHASE_GATE）：设 "off" 则本次会话关闭本门禁。
 */
import { readFileSync, existsSync } from "node:fs";
import { join, isAbsolute } from "node:path";

const NEXT_PHASE = ["dev", "implement"];
const REQUIRED = [
  "ordered_batches",
  "parallel_tracks",
  "task_backlog",
  "dependencies",
  "acceptance_mapping",
  "reviewed",
];

function isNextPhaseCommand(s: string): boolean {
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
    `[plan-phase-gate] blocked: cannot proceed to the implementation phase. ${reason}\n` +
      (path ? `  expected ${path} ` : "") +
      `Run /plan to produce PLAN.md (from the confirmed DESIGN.md), pass auto + human review, then retry.`,
  );
}

export default async function planPhaseGate(input: {
  project?: { directory?: string | null };
}) {
  const ws = input?.project?.directory ?? process.cwd();

  return {
    "command.execute.before": async (inp: Record<string, unknown>) => {
      if (process.env.PLAN_PHASE_GATE === "off") return;

      const candidates = [
        inp?.name, inp?.command, inp?.slashCommand, inp?.id,
        (inp?.command as any)?.name, (inp?.data as any)?.name,
      ]
        .map((s) => (typeof s === "string" ? s : String(s ?? "")))
        .join(" ");

      if (!isNextPhaseCommand(candidates)) return;

      const base = isAbsolute(ws) ? ws : join(process.cwd(), ws);
      const design = join(base, "DESIGN.md");
      const plan = join(base, "PLAN.md");

      const dfm = frontmatter(design);
      if (!dfm) complain(design, "DESIGN.md (input spec) does not exist.");
      if ((dfm as any).status !== "complete") complain(design, "DESIGN.md is not complete (input for planning).");

      const fm = frontmatter(plan);
      if (!fm) complain(plan, "PLAN.md does not exist or has no frontmatter.");
      if ((fm as any).status !== "complete") complain(plan, "PLAN.md is not marked complete (status != complete).");
      for (const f of REQUIRED) {
        if ((fm as any)[f] !== "yes") complain(plan, `required field '${f}' is not 'yes'.`);
      }
      if ((fm as any).human_confirmed !== "true") complain(plan, "the plan has not been human-confirmed (human_confirmed != true).");
    },
  };
}