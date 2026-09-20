/**
 * release-phase-gate — gate plugin for the Release/Deploy phase
 *
 * Purpose: before proceeding to the "Retrospective" phase, require the release to be deployed and
 * human-confirmed. Validates the project-root RELEASE-PLAN.md (declarative plan) and RELEASE.md (deliverable).
 *
 * Hard conditions (command.execute.before intercepts /retro):
 *   - RELEASE-PLAN.md exists (declarative plan; ask the user to fill it if missing)
 *   - RELEASE.md exists and status == complete
 *   - artifact / verified / prereviewed / deployed == yes
 *   - human_confirmed == true (release confirmed by a human)
 * Any unmet condition -> throw, prompting the user to finish /release first.
 *
 * Toggle (env RELEASE_PHASE_GATE): set "off" to disable this gate for the session.
 */
import { readFileSync, existsSync } from "node:fs";
import { join, isAbsolute } from "node:path";

const NEXT_PHASE = ["retro", "retrospective"];
const REQUIRED = ["artifact", "verified", "prereviewed", "deployed"];

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
    `[release-phase-gate] blocked: cannot proceed to the retrospective phase. ${reason}\n` +
      (path ? `  expected ${path} ` : "") +
      `Run /release to build + verify + pre-review + deploy to production (RELEASE.md), get human confirmation, then retry.`,
  );
}

export default async function releasePhaseGate(input: {
  project?: { directory?: string | null };
}) {
  const ws = input?.project?.directory ?? process.cwd();

  return {
    "command.execute.before": async (inp: Record<string, unknown>) => {
      if (process.env.RELEASE_PHASE_GATE === "off") return;

      const candidates = [
        inp?.name, inp?.command, inp?.slashCommand, inp?.id,
        (inp?.command as any)?.name, (inp?.data as any)?.name,
      ]
        .map((s) => (typeof s === "string" ? s : String(s ?? "")))
        .join(" ");

      if (!isNextPhaseCommand(candidates)) return;

      const base = isAbsolute(ws) ? ws : join(process.cwd(), ws);
      const plan = join(base, "RELEASE-PLAN.md");
      const release = join(base, "RELEASE.md");

      if (!existsSync(plan)) complain(plan, "RELEASE-PLAN.md (declarative release plan) does not exist.");

      const fm = frontmatter(release);
      if (!fm) complain(release, "RELEASE.md does not exist or has no frontmatter.");
      if ((fm as any).status !== "complete") complain(release, "RELEASE.md is not marked complete (status != complete).");
      for (const f of REQUIRED) {
        if ((fm as any)[f] !== "yes") complain(release, `required field '${f}' is not 'yes'.`);
      }
      if ((fm as any).human_confirmed !== "true") complain(release, "the release has not been human-confirmed (human_confirmed != true).");
    },
  };
}