/**
 * spec-phase-gate —— 规格阶段（Spec/SDD）的门禁插件
 *
 * 目的：在进入「开发 (dev)」阶段前，强制要求规格交付物达标。
 * 校验对象：工程根的 GATE-REQUIREMENTS.md（需求门禁规范）与 SPEC.md（合并后的规格+任务拆解交付物）。
 *
 * 硬性条件（command.execute.before 拦 /dev）：
 *   - GATE-REQUIREMENTS.md 存在（无需求规范不入开发）
 *   - SPEC.md 存在且 status == complete
 *   - 13 个必填字段（8 规格 + 5 任务）== yes（含 reviewed=yes 自动评审）
 *   - human_confirmed == true（一个阶段一次性人工确认）
 * 任一不满足 → throw，提示先完成 /spec。
 *
 * 开关（env SPEC_PHASE_GATE）：设 "off" 则本次会话关闭本门禁。
 */
import { readFileSync, existsSync } from "node:fs";
import { join, isAbsolute } from "node:path";

const NEXT_PHASE = ["dev", "implement"];
const REQUIRED = [
  // design 8
  "scope", "option_analysis", "architecture", "data_model", "interfaces",
  "acceptance_criteria", "non_functional",
  // task breakdown 5
  "ordered_batches", "parallel_tracks", "task_backlog", "dependencies", "acceptance_mapping",
  // auto review
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
    `[spec-phase-gate] blocked: cannot proceed to the dev phase. ${reason}\n` +
      (path ? `  expected ${path} ` : "") +
      `Run /spec to clarify requirements, write SPEC.md (design + task breakdown), review it, and get human confirmation, then retry.`,
  );
}

export default async function specPhaseGate(input: {
  project?: { directory?: string | null };
}) {
  const ws = input?.project?.directory ?? process.cwd();

  return {
    "command.execute.before": async (inp: Record<string, unknown>) => {
      if (process.env.SPEC_PHASE_GATE === "off") return;

      const candidates = [
        inp?.name, inp?.command, inp?.slashCommand, inp?.id,
        (inp?.command as any)?.name, (inp?.data as any)?.name,
      ]
        .map((s) => (typeof s === "string" ? s : String(s ?? "")))
        .join(" ");

      if (!isNextPhaseCommand(candidates)) return;

      const base = isAbsolute(ws) ? ws : join(process.cwd(), ws);
      const gateFile = join(base, "GATE-REQUIREMENTS.md");
      const spec = join(base, "SPEC.md");

      if (!existsSync(gateFile)) complain(gateFile, "GATE-REQUIREMENTS.md (requirements gate spec) does not exist.");

      const fm = frontmatter(spec);
      if (!fm) complain(spec, "SPEC.md does not exist or has no frontmatter.");
      if ((fm as any).status !== "complete") complain(spec, "SPEC.md is not marked complete (status != complete).");
      for (const f of REQUIRED) {
        if ((fm as any)[f] !== "yes") complain(spec, `required field '${f}' is not 'yes'.`);
      }
      if ((fm as any).human_confirmed !== "true") complain(spec, "the spec has not been human-confirmed (human_confirmed != true).");
    },
  };
}