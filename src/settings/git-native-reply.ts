import { type NativeReply } from "../core/native-protocol";

export interface GitCheckReply extends NativeReply {
  hasUpdate?: boolean;
  localCommit?: string;
  commitDesc?: string;
  latestCommitTitle?: string;
  log?: string;
  warning?: string;
  behindCount?: number;
  aheadCount?: number;
  commitsBehind?: number;
}

export function parseGitCheckReply(reply: NativeReply): GitCheckReply {
  if (!reply.ok) return { ok: false, error: reply.error };
  const invalid = { ok: false, error: "Git 更新状态格式未确认；未应用更新" };
  if (typeof reply.hasUpdate !== "boolean") return invalid;
  for (const key of ["localCommit", "commitDesc", "latestCommitTitle", "log", "warning"]) {
    if (reply[key] !== undefined && typeof reply[key] !== "string") return invalid;
  }
  for (const key of ["behindCount", "aheadCount", "commitsBehind"]) {
    const value = reply[key];
    if (value !== undefined && (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0)) return invalid;
  }
  return { ...reply, hasUpdate: reply.hasUpdate };
}
