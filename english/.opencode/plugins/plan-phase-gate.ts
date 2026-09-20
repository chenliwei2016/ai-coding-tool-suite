/**
 * plan-phase-gate — gate plugin for the Plan phase
 *
 * Purpose: before proceeding to the "Implementation (dev/implement)" phase, require
 * the plan deliverable to be ready. Validates the project-root DESIGN.md (input) and
 * PLAN.md (deliverable).
 *
 * Hard conditions (command.execute.before intercepts /dev or /implement):
 *   - DESIGN.md exists and status == complete (input ready)
 *   - PLAN.md exists and status == complete
 *   - the six required fields (ordered_batches/parallel_tracks/task_backlog/
 *     dependencies/acceptance_mapping/reviewed) == yes (including reviewed=yes)
 *   - human_confirmed == true (plan confirmed by a human)
 * Any unmet condition -> throw, prompting the user to finish /plan first.
 *
 * Toggle (env PLAN_PHASE_GATE): set "off" to disable this gate for the session.
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