/**
 * dev-phase-gate — gate plugin for the Dev/Implement phase
 *
 * Purpose: before proceeding to the "Test" phase, require the implementation to be complete.
 * Validates the project-root SPEC.md (whose frontmatter records implementation-complete state).
 *
 * Hard conditions (command.execute.before intercepts /test):
 *   - SPEC.md exists and status == complete
 *   - implementation_complete == yes (all work items done)
 *   - tests_written == yes (each item linked to unit tests)
 *   - human_confirmed == true (implementation confirmed by a human)
 * Any unmet condition -> throw, prompting the user to finish /dev first.
 *
 * Toggle (env DEV_PHASE_GATE): set "off" to disable this gate for the session.
 */
import { readFileSync } from "node:fs";
import { join, isAbsolute } from "node:path";

const NEXT_PHASE = ["test"];
const REQUIRED = ["implementation_complete", "tests_written"];

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
    `[dev-phase-gate] blocked: cannot proceed to the test phase. ${reason}\n` +
      (path ? `  expected ${path} ` : "") +
      `Run /dev to finish implementing SPEC.md work items (implement + tests + self review) and get human confirmation, then retry.`,
  );
}

export default async function devPhaseGate(input: {
  project?: { directory?: string | null };
}) {
  const ws = input?.project?.directory ?? process.cwd();

  return {
    "command.execute.before": async (inp: Record<string, unknown>) => {
      if (process.env.DEV_PHASE_GATE === "off") return;

      const candidates = [
        inp?.name, inp?.command, inp?.slashCommand, inp?.id,
        (inp?.command as any)?.name, (inp?.data as any)?.name,
      ]
        .map((s) => (typeof s === "string" ? s : String(s ?? "")))
        .join(" ");

      if (!isNextPhaseCommand(candidates)) return;

      const base = isAbsolute(ws) ? ws : join(process.cwd(), ws);
      const plan = join(base, "SPEC.md");
      const fm = frontmatter(plan);

      if (!fm) complain(plan, "SPEC.md does not exist or has no frontmatter.");
      if ((fm as any).status !== "complete") complain(plan, "SPEC.md is not marked complete (status != complete).");
      for (const f of REQUIRED) {
        if ((fm as any)[f] !== "yes") complain(plan, `required field '${f}' is not 'yes'.`);
      }
      if ((fm as any).human_confirmed !== "true") complain(plan, "the implementation has not been human-confirmed (human_confirmed != true).");
    },
  };
}