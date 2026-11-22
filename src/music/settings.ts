import {
  hasExtensionLocalStorage,
  readExtensionStorage,
  writeExtensionStorage,
} from "../core/storage-repo";
import { NETEASE_ENDPOINT_KEY } from "./settings-keys";
export { NETEASE_ENDPOINT_KEY } from "./settings-keys";
export const DEFAULT_NETEASE_ENDPOINT = "http://localhost:3000";

export async function loadEndpoint(): Promise<string> {
  const stored = hasExtensionLocalStorage()
    ? (await readExtensionStorage(NETEASE_ENDPOINT_KEY))[NETEASE_ENDPOINT_KEY]
    : typeof localStorage !== "undefined"
      ? localStorage.getItem(NETEASE_ENDPOINT_KEY)
      : "";
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
  if (hasExtensionLocalStorage()) await writeExtensionStorage({ [NETEASE_ENDPOINT_KEY]: normalized });
  else if (typeof localStorage !== "undefined") localStorage.setItem(NETEASE_ENDPOINT_KEY, normalized);
}

export interface NeteaseProbeResult {
  ok: boolean;
  status?: number;
  count?: number;
  error?: string;
}

export async function probeNeteaseEndpoint(
  endpoint: string,
  fetchFn: typeof fetch = fetch
): Promise<NeteaseProbeResult> {
  try {
    const normalized = (endpoint || DEFAULT_NETEASE_ENDPOINT).trim().replace(/\/+$/, "");
    const targetUrl = new URL(`${normalized}/toplist`).toString();
    const resp = await fetchFn(targetUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(6000),
    });
    if (!resp.ok) {
      return { ok: false, status: resp.status, error: `HTTP ${resp.status}` };
    }
    const data = await resp.json().catch(() => null);
    const list = Array.isArray((data as any)?.list) ? (data as any).list : [];
    return { ok: true, status: resp.status, count: list.length };
  } catch (err: any) {
    return { ok: false, error: err?.message || "连接失败" };
  }
}
