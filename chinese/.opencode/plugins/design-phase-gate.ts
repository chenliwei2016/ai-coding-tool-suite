/**
 * design-phase-gate —— 设计阶段（Design/SDD）的门禁插件
 *
 * 目的：在进入「计划」阶段前，强制要求设计交付物达标。
 * 校验对象：工程根的 GATE_REQUIREMENTS.md（需求门禁规范）与 DESIGN.md。
 *
 * 硬性条件（command.execute.before 拦 /plan）：
 *   - GATE_REQUIREMENTS.md 必须存在（无需求规范不入计划）
 *   - DESIGN.md 存在且 status == complete
 *   - 八个必填字段（scope/option_analysis/architecture/data_model/interfaces/
 *     acceptance_criteria/non_functional/reviewed）== yes（含 reviewed=yes 自动评审）
 *   - requirements_sign_off == true（需求已 sign-off）
 *   - human_confirmed == true（设计已人工确认）
 * 任一不满足 → throw，提示先完成 /design。
 *
 * 开关（env DESIGN_PHASE_GATE）：设 "off" 则本次会话关闭本门禁。
 */
import { readFileSync, existsSync } from "node:fs";
import { join, isAbsolute } from "node:path";

const NEXT_PHASE = ["plan"];
const REQUIRED = [
  "scope",
  "option_analysis",
  "architecture",
  "data_model",
  "interfaces",
  "acceptance_criteria",
  "non_functional",
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
    `[design-phase-gate] blocked: cannot proceed to the plan phase. ${reason}\n` +
      (path ? `  expected ${path} ` : "") +
      `Run /design to collect+sign-off requirements, produce DESIGN.md, and pass auto + human review, then retry.`,
  );
}

export default async function designPhaseGate(input: {
  project?: { directory?: string | null };
}) {
  const ws = input?.project?.directory ?? process.cwd();

  return {
    "command.execute.before": async (inp: Record<string, unknown>) => {
      if (process.env.DESIGN_PHASE_GATE === "off") return;

      const candidates = [
        inp?.name, inp?.command, inp?.slashCommand, inp?.id,
        (inp?.command as any)?.name, (inp?.data as any)?.name,
      ]
        .map((s) => (typeof s === "string" ? s : String(s ?? "")))
        .join(" ");

      if (!isNextPhaseCommand(candidates)) return;

      const base = isAbsolute(ws) ? ws : join(process.cwd(), ws);
      const gateFile = join(base, "GATE_REQUIREMENTS.md");
      const design = join(base, "DESIGN.md");

      if (!existsSync(gateFile)) complain(gateFile, "GATE_REQUIREMENTS.md (requirements gate spec) does not exist.");

      const fm = frontmatter(design);
      if (!fm) complain(design, "DESIGN.md does not exist or has no frontmatter.");
      if ((fm as any).status !== "complete") complain(design, "DESIGN.md is not marked complete (status != complete).");
      for (const f of REQUIRED) {
        if ((fm as any)[f] !== "yes") complain(design, `required field '${f}' is not 'yes'.`);
      }
      if ((fm as any).requirements_sign_off !== "true") complain(design, "requirements are not signed off (requirements_sign_off != true).");
      if ((fm as any).human_confirmed !== "true") complain(design, "the design has not been human-confirmed (human_confirmed != true).");
    },
  };
}