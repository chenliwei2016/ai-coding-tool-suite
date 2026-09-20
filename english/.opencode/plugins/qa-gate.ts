/**
 * qa-gate — QA workflow gate plugin
 *
 * Purpose: make the "register the issue before acting" orchestration sequence
 * actually enforceable (a command can only guide).
 *
 * Two hooks:
 *  1. chat.message          — soft reminder: when a message hits a "problem-type"
 *                             keyword, inject a system-level reminder (synthetic
 *                             part) guiding the model to register per the QA flow first.
 *  2. tool.execute.before   — hard gate: for "get-your-hands-dirty" tools like
 *                             task/edit/write/bash, if the current project's
 *                             issues.md has no registration within the toggle window,
 *                             block the call outright.
 *
 * Toggle (environment variable QA_GATE):
 *  - soft (default): only inject reminders, never block, and don't disturb daily exploration
 *  - hard: real gatekeeper, blocks tool execution when issues aren't registered
 *  - off: fully disabled; plugin becomes a no-op
 * Window (QA_GATE_WINDOW_MINUTES, default 30): if issues.md was last modified longer ago
 * than this value, it counts as "not registered."
 */
import { statSync } from "node:fs";
import { join } from "node:path";

const KEYWORDS = [
  "white screen", "error", "exception", "bug", "not working", "doesn't work", "broken", "crash",
  "fix", "issue", "defect", "failure", "error", "exception", "what's happening", "why",
];

const SOLVING_TOOLS = new Set(["task", "edit", "write", "bash", "patch", "apply_patch"]);

const REMINDER =
  "QA flow reminder: This is a “problem-type” request. Per the workflow, the first step is to " +
  "register the problem in the current project root " +
  "issues.md (subproblem granularity, including expected/repro/ownership), then decide the solution via " +
  "@frontend-architect / @backend-architect by ownership, assign, implement, and verify." +
  "You can run /report <problem description> to register and assign in one go. Do not discuss solutions " +
  "or start making changes before registration is complete.";

function mode(): "soft" | "hard" | "off" {
  const v = (process.env.QA_GATE || "soft").toLowerCase();
  return v === "hard" ? "hard" : v === "off" ? "off" : "soft";
}

function windowMinutes(): number {
  const n = Number.parseInt(process.env.QA_GATE_WINDOW_MINUTES || "30", 10);
  return Number.isFinite(n) && n > 0 ? n : 30;
}

function issuesFile(directory: string | null | undefined): string | null {
  return directory ? join(directory, "issues.md") : null;
}

// issues.md exists and was last modified within the window (treated as "recently registered")
function isRecentlyRegistered(file: string, winMin: number): boolean {
  try {
    const st = statSync(file);
    return Date.now() - st.mtimeMs <= winMin * 60_000;
  } catch {
    return false;
  }
}

export default async function qaGate(input: { project?: { directory?: string | null } }) {
  const dir = input?.project?.directory;
  const file = issuesFile(dir);

  return {
    /** Soft reminder. On a keyword hit, inject a "register first" system prompt for the model. */
    "chat.message": async (
      _inp: { sessionID: string; messageID?: string },
      out: { parts: any[] },
    ) => {
      if (mode() === "off") return;
      const text = (Array.isArray(out?.parts) && out.parts.map((p) => p?.text ?? "").join(" ") || "")
        .toLowerCase();
      if (!KEYWORDS.some((k) => text.includes(k.toLowerCase()))) return;
      if (mode() === "soft" && file && isRecentlyRegistered(file, windowMinutes())) return;

      out.parts.push({
        id: `qa-gate-${Date.now()}`,
        sessionID: _inp.sessionID,
        messageID: _inp.messageID,
        type: "text",
        text: REMINDER,
        synthetic: true,
      });
    },

    /** Hard gate. Blocks hands-on tools when issues aren't registered. */
    "tool.execute.before": async (inp: { tool: string }) => {
      if (mode() !== "hard") return;
      if (!SOLVING_TOOLS.has(inp.tool)) return;
      if (file && isRecentlyRegistered(file, windowMinutes())) return;

      throw new Error(
        "QA gate: The current project's issues.md has no recent registration record; " +
        "blocking this change. Please run /report <problem description> to register and assign, " +
        "then retry after it completes.",
      );
    },
  };
}