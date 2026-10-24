export const FIRECRAWL_ENDPOINT_KEY = "firecrawlApiUrl";
export async function loadEndpoint(): Promise<string> {
  const value = typeof chrome !== "undefined" && chrome.storage?.local
    ? (await chrome.storage.local.get(FIRECRAWL_ENDPOINT_KEY))[FIRECRAWL_ENDPOINT_KEY]
    : localStorage.getItem(FIRECRAWL_ENDPOINT_KEY);
  return typeof value === "string" ? value.trim().replace(/\/+$/, "") : "";
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
  if (typeof chrome !== "undefined" && chrome.storage?.local) await chrome.storage.local.set({ [FIRECRAWL_ENDPOINT_KEY]: normalized });
  else localStorage.setItem(FIRECRAWL_ENDPOINT_KEY, normalized);
}
