/** GitHub owns its optional Archify webhook. Never use a personal fallback. */
export const GH_ARCHIFY_WEBHOOK_KEY = "ghArchifyWebhookUrl";
export class ArchifyWebhookConfigError extends Error {}

export function normalizeArchifyWebhookUrl(value: unknown): string {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value !== "string") throw new ArchifyWebhookConfigError("流水线地址格式无效，请在 GitHub 设置中重新填写。");
  const input = value.trim();
  if (!input) return "";
  let url: URL;
  try { url = new URL(input); }
  catch { throw new ArchifyWebhookConfigError("请填写完整的 HTTP(S) Webhook 地址。"); }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new ArchifyWebhookConfigError("Webhook 只支持 HTTP(S)，不能包含账号密码、查询参数或片段。");
  }
  if (url.pathname === "/") throw new ArchifyWebhookConfigError("请填写完整的 Webhook 路径，而不是 n8n 控制台根地址。");
  return url.href;
}

/** Read just the endpoint, not the GitHub token or AI credentials. */
export async function loadArchifyWebhookUrl(): Promise<string> {
  const value = typeof chrome !== "undefined" && chrome.storage?.local
    ? (await chrome.storage.local.get(GH_ARCHIFY_WEBHOOK_KEY))[GH_ARCHIFY_WEBHOOK_KEY]
    : localStorage.getItem(GH_ARCHIFY_WEBHOOK_KEY);
  return normalizeArchifyWebhookUrl(value);
}
