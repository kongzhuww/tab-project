import { NETEASE_ENDPOINT_KEY } from "./settings-keys";
export { NETEASE_ENDPOINT_KEY } from "./settings-keys";
export const DEFAULT_NETEASE_ENDPOINT = "http://localhost:3000";

export async function loadEndpoint(): Promise<string> {
  const stored = typeof chrome !== "undefined" && chrome.storage?.local
    ? (await chrome.storage.local.get(NETEASE_ENDPOINT_KEY))[NETEASE_ENDPOINT_KEY]
    : localStorage.getItem(NETEASE_ENDPOINT_KEY);
  if (typeof stored === "string" && stored.trim()) return stored.trim().replace(/\/+$/, "");
  return DEFAULT_NETEASE_ENDPOINT;
}
export function validateEndpoint(value: string): string {
  const normalized = value.trim().replace(/\/+$/, "");
  if (normalized) {
    const url = new URL(normalized);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error("invalid-endpoint");
  }
  return normalized;
}
export async function saveEndpoint(value: string): Promise<void> {
  const normalized = validateEndpoint(value);
  if (typeof chrome !== "undefined" && chrome.storage?.local) await chrome.storage.local.set({ [NETEASE_ENDPOINT_KEY]: normalized });
  else localStorage.setItem(NETEASE_ENDPOINT_KEY, normalized);
}
