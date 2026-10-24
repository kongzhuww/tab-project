/** Native Messaging envelope only; command-specific payloads still need domain validation. */
export interface NativeRequest extends Record<string, unknown> {
  command: string;
}
export interface NativeReply extends Record<string, unknown> {
  ok: boolean;
  error?: string;
}

export function nativeRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

export function parseNativeReply(value: unknown): NativeReply {
  const reply = nativeRecord(value);
  if (!reply || typeof reply.ok !== "boolean") {
    return { ok: false, error: "原生响应格式未确认；未自动重试" };
  }
  // No truthy coercion: e.g. "false" must never become running=true.
  for (const key of ["running", "already", "online", "launched", "copied", "deleted", "found", "cloudSynced"]) {
    if (reply[key] !== undefined && typeof reply[key] !== "boolean") {
      return { ok: false, error: "原生响应状态格式未确认；未自动重试" };
    }
  }
  if (reply.error !== undefined && typeof reply.error !== "string") {
    return { ok: false, error: "原生响应错误字段格式未确认；未自动重试" };
  }
  // Preserve command payloads (including numeric stopped counts) without inventing flags.
  return { ...reply, ok: reply.ok, ...(reply.ok === false && !reply.error ? { error: "原生请求失败；未自动重试" } : {}) };
}
