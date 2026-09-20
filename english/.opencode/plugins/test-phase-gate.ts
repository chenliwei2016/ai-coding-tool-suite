/**
 * test-phase-gate — gate plugin for the Test phase
 *
 * Purpose: before proceeding to the "Deploy (deploy/release)" phase, require the test
 * conclusion to be ready. Validates the project-root TEST.md.
 *
 * Hard conditions (command.execute.before intercepts /deploy or /release):
 *   - TEST.md exists and status == complete
 *   - result == pass (tests passed; fail must flow back for fixing)
 *   - functional/performance/security == yes
 *   - reviewed == yes (test review passed)
 *   - human_confirmed == true (test conclusion confirmed by a human)
 * Any unmet condition -> throw, prompting the user to finish /test (or flow back and retest).
 *
 * Toggle (env TEST_PHASE_GATE): set "off" to disable this gate for the session.
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