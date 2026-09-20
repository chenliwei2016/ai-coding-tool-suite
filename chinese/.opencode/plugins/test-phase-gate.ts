/**
 * test-phase-gate —— 测试阶段（Test）的门禁插件
 *
 * 目的：在进入「部署（deploy/release）」阶段前，强制要求测试结论达标。
 * 校验对象：工程根的 TEST.md。
 *
 * 硬性条件（command.execute.before 拦 /deploy 或 /release）：
 *   - TEST.md 存在且 status == complete
 *   - result == pass（测试通过；fail 必须回流修复）
 *   - functional/performance/security == yes
 *   - reviewed == yes（测试评审通过）
 *   - human_confirmed == true（测试结论已人工确认）
 * 任一不满足 → throw，提示先完成 /test（或回流修复后再测）。
 *
 * 开关（env TEST_PHASE_GATE）：设 "off" 则本次会话关闭本门禁。
 */
import { readFileSync } from "node:fs";
import { join, isAbsolute } from "node:path";

const NEXT_PHASE = ["deploy", "release"];
const REQUIRED = ["functional", "performance", "security", "reviewed"];

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
    `[test-phase-gate] blocked: cannot proceed to the deploy phase. ${reason}\n` +
      (path ? `  expected ${path} ` : "") +
      `Run /test to produce TEST.md (result: pass), review it, and get human confirmation, then retry.`,
  );
}

export default async function testPhaseGate(input: {
  project?: { directory?: string | null };
}) {
  const ws = input?.project?.directory ?? process.cwd();

  return {
    "command.execute.before": async (inp: Record<string, unknown>) => {
      if (process.env.TEST_PHASE_GATE === "off") return;

      const candidates = [
        inp?.name, inp?.command, inp?.slashCommand, inp?.id,
        (inp?.command as any)?.name, (inp?.data as any)?.name,
      ]
        .map((s) => (typeof s === "string" ? s : String(s ?? "")))
        .join(" ");

      if (!isNextPhaseCommand(candidates)) return;

      const base = isAbsolute(ws) ? ws : join(process.cwd(), ws);
      const test = join(base, "TEST.md");
      const fm = frontmatter(test);

      if (!fm) complain(test, "TEST.md does not exist or has no frontmatter.");
      if ((fm as any).status !== "complete") complain(test, "TEST.md is not marked complete (status != complete).");
      if ((fm as any).result !== "pass") complain(test, "TEST.md result is not 'pass'.");
      for (const f of REQUIRED) {
        if ((fm as any)[f] !== "yes") complain(test, `required field '${f}' is not 'yes'.`);
      }
      if ((fm as any).human_confirmed !== "true") complain(test, "the test conclusion has not been human-confirmed (human_confirmed != true).");
    },
  };
}