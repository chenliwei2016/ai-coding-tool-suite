/**
 * spec-phase-gate — gate plugin for the Spec (SDD) phase
 *
 * Purpose: before proceeding to the "Dev" phase, require the spec deliverable to be ready.
 * Validates the project-root GATE-REQUIREMENTS.md and SPEC.md (merged design + task-breakdown deliverable).
 *
 * Hard conditions (command.execute.before intercepts /dev):
 *   - GATE-REQUIREMENTS.md exists (no requirements gate spec -> no dev)
 *   - SPEC.md exists and status == complete
 *   - the 13 required fields (8 design + 5 task) == yes (including reviewed=yes from auto review)
 *   - human_confirmed == true (one human confirmation per phase)
 * Any unmet condition -> throw, prompting the user to finish /spec first.
 *
 * Toggle (env SPEC_PHASE_GATE): set "off" to disable this gate for the session.
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