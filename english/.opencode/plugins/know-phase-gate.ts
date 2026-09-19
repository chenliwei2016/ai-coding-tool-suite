/**
 * know-phase-gate — gate plugin for the Init (Know Your Project) phase
 *
 * Purpose: before proceeding to the "Design" phase, require the init deliverable
 * PROJECT-REVIEW.md to be complete. If it is missing, not marked complete, or not
 * human-confirmed, block the action that enters the design phase.
 *
 * Hook: command.execute.before — when the command about to run is the next-phase
 * entry (/design), verify the PROJECT-REVIEW.md frontmatter at the project root:
 *   - exists and status == complete
 *   - the six required fields
 *     (entrypoints/architecture/data_model/business_rules/dependencies/risks) == yes
 *   - human_confirmed == true (human-confirmation gate)
 * Any unmet condition -> throw, prompting the user to finish /know-project first.
 *
 * Toggle (env KNOW_PHASE_GATE): set "off" to disable this gate for the session.
 */
import { readFileSync } from "node:fs";
import { join, isAbsolute } from "node:path";

const NEXT_PHASE = ["design"];
const REQUIRED = [
  "entrypoints",
  "architecture",
  "data_model",
  "business_rules",
  "dependencies",
  "risks",
];

function isDesignCommand(s: string): boolean {
  if (!s) return false;
  return NEXT_PHASE.some((k) => s.toLowerCase() === "/" + k || s.toLowerCase() === k || s.includes("/" + k));
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