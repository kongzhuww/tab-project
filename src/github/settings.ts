import { DEFAULT_GH_AI_CONFIG, GH_AI_CONFIG_KEY, type GitHubAiConfig } from "../services/github.service";
import { GH_ARCHIFY_WEBHOOK_KEY, normalizeArchifyWebhookUrl } from "./workflow-settings";
export interface GitHubModuleSettings { ghUser: string; ghToken: string; ai: GitHubAiConfig; archifyWebhookUrl: string }
export function normalizeGitHubAiConfig(value: unknown): GitHubAiConfig {
  let parsed = value;
  if (typeof parsed === "string") {
    try { parsed = JSON.parse(parsed); } catch { parsed = {}; }
  }
  const source = parsed && typeof parsed === "object" ? parsed as Record<string, unknown> : {};
  const result = { ...DEFAULT_GH_AI_CONFIG };
  for (const key of ["provider", "apiKey", "baseUrl", "model", "customPrompt"] as const) {
    if (typeof source[key] === "string") result[key] = source[key];
  }
  if (typeof source.useCustomPrompt === "boolean") result.useCustomPrompt = source.useCustomPrompt;
  return result;
}
export { loadGitHubAccountSettings } from "./account-settings";
export async function loadGitHubSettings(): Promise<GitHubModuleSettings> {
  let stored: Record<string, unknown>;
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    stored = await chrome.storage.local.get(["ghUser", "ghToken", GH_AI_CONFIG_KEY, GH_ARCHIFY_WEBHOOK_KEY]);
  } else {
    stored = { ghUser: localStorage.getItem("ghUser"), ghToken: localStorage.getItem("ghToken"), [GH_AI_CONFIG_KEY]: localStorage.getItem(GH_AI_CONFIG_KEY), [GH_ARCHIFY_WEBHOOK_KEY]: localStorage.getItem(GH_ARCHIFY_WEBHOOK_KEY) };
  }
  return { ghUser: typeof stored.ghUser === "string" ? stored.ghUser : "", ghToken: typeof stored.ghToken === "string" ? stored.ghToken : "", ai: normalizeGitHubAiConfig(stored[GH_AI_CONFIG_KEY]), archifyWebhookUrl: typeof stored[GH_ARCHIFY_WEBHOOK_KEY] === "string" ? stored[GH_ARCHIFY_WEBHOOK_KEY] : "" };
}
// Write only edited account fields; merge edited AI fields with the latest stored config.
export async function saveGitHubSettings(draft: GitHubModuleSettings, initial: GitHubModuleSettings): Promise<{ accountChanged: boolean; settings: GitHubModuleSettings }> {
  const latest = await loadGitHubSettings();
  const payload: Record<string, unknown> = {};
  if (draft.archifyWebhookUrl !== initial.archifyWebhookUrl) {
    if (latest.archifyWebhookUrl !== initial.archifyWebhookUrl) throw new Error("Webhook setting changed in another page");
    latest.archifyWebhookUrl = normalizeArchifyWebhookUrl(draft.archifyWebhookUrl);
    payload[GH_ARCHIFY_WEBHOOK_KEY] = latest.archifyWebhookUrl;
  }
  for (const key of ["ghUser", "ghToken"] as const) {
    if (draft[key] !== initial[key]) { latest[key] = draft[key].trim(); payload[key] = latest[key]; }
  }
  let aiChanged = false;
  for (const key of ["provider", "apiKey", "baseUrl", "model", "customPrompt"] as const) {
    if (draft.ai[key] !== initial.ai[key]) { latest.ai[key] = draft.ai[key]; aiChanged = true; }
  }
  if (draft.ai.useCustomPrompt !== initial.ai.useCustomPrompt) {
    latest.ai.useCustomPrompt = draft.ai.useCustomPrompt; aiChanged = true;
  }
  if (aiChanged) payload[GH_AI_CONFIG_KEY] = latest.ai;
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    if (Object.keys(payload).length) await chrome.storage.local.set(payload);
  } else {
    for (const [key, value] of Object.entries(payload)) localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  }
  return { accountChanged: "ghUser" in payload || "ghToken" in payload, settings: latest };
}
export async function clearGitHubStarCache(): Promise<void> {
  if (typeof chrome !== "undefined" && chrome.storage?.local) await chrome.storage.local.remove("ghStarredCache");
  else localStorage.removeItem("ghStarredCache");
}
