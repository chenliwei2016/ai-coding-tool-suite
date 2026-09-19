/**
 * commit-translation-gate — block a git commit when only one language of a
 * bilingual mirror was changed.
 *
 * Purpose: this repo ships every artifact in BOTH languages (chinese/ and
 * english/ are full mirrors). Editing a file in one tree should be mirrored
 * into the other. We cannot hard-enforce translation at every edit, so the gate
 * converges on the commit boundary: if a commit would persist a file in
 * chinese/ or english/ whose twin in the other tree was NOT also changed in the
 * same working tree, it is blocked and the user is pointed at /sync-translation.
 *
 * "Changed" = added / modified / deleted / renamed / untracked (git status).
 * A pair is consistent only when BOTH sides appear in the same change set.
 *
 * Toggle (env TRANSLATION_GATE): "off" disables the gate.
 */
import { spawnSync } from "node:child_process";
import { join, isAbsolute } from "node:path";

const LANG_ROOTS = ["chinese", "english"] as const;
const COMMIT_RE = /\bgit\s+(commit|push)\b/;
const PATH_RE = /^(chinese|english)\/[^\s]+/;

function normalize(p: string): string {
  return p.replace(/\\/g, "/");
}

function siblingRel(rel: string): string {
  const root = rel.split("/")[0];
  const other = root === "chinese" ? "english" : "chinese";
  return other + rel.slice(root.length);
}

function absPath(ws: string, rel: string): string {
  return isAbsolute(rel) ? rel : join(ws, rel);
}

// Parse `git status --porcelain` output into a set of changed relative paths.
function changedPaths(ws: string): Set<string> {
  const res = spawnSync("git", ["status", "--porcelain", "--untracked-files=all"], {
    cwd: ws,
    encoding: "utf8",
  });
  if (res.status !== 0) return new Set();
  const changed = new Set<string>();
  for (const line of res.stdout.split("\n")) {
    if (!line.trim()) continue;
    // strip the 2-char status code ("M ", "??", "R ", " D") and keep the path
    const trimmed = (line.replace(/^\s+/, "")).trim();
    const sp = trimmed.indexOf(" ");
    let path = sp < 0 ? trimmed : trimmed.slice(sp + 1).trim();
    path = path.replace(/^"(.*)"$/, "$1"); // quotes on special paths
    if (path.includes(" -> ")) path = path.split(" -> ").pop()!.trim(); // rename
    if (PATH_RE.test(path)) changed.add(path);
  }
  return changed;
}

export default async function commitTranslationGate(input: {
  project?: { directory?: string | null };
}) {
  const ws = input?.project?.directory ?? process.cwd();

  return {
    "tool.execute.before": async (inp: { tool: string }, output: { args?: Record<string, unknown> }) => {
      if (process.env.TRANSLATION_GATE === "off") return;
      if (inp?.tool !== "bash") return;
      const cmd = String(output?.args?.command ?? output?.args?.text ?? "");
      if (!COMMIT_RE.test(cmd)) return;

      // Snapshot the set of language-path changes that will be committed.
      const changed = changedPaths(ws);
      const langChanges = [...changed].filter((p) => LANG_ROOTS.includes(p.split("/")[0] as never));
      if (langChanges.length === 0) return;

      const oneSided: Array<{ path: string; twin: string }> = [];
      for (const p of langChanges) {
        const twin = siblingRel(p);
        if (!changed.has(twin)) oneSided.push({ path: p, twin });
      }
      if (oneSided.length === 0) return;

      let detail = oneSided.map((o) => `- ${o.path}  (twin: ${o.twin} not changed)`).join("\n");
      throw new Error(
        `[commit-translation-gate] blocked commit: some bilingual files were changed on only ONE language side.\n` +
          `Every chinese/english pair must stay in sync before persisting.\n${detail}\n` +
          `Run /sync-translation to inspect the changes and mirror the other language, then commit again.`,
      );
    },
  };
}