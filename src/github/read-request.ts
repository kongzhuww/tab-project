import { readGitHubJson } from "./api-client";

// Compatibility adapter. The only GitHub read transport lives in api-client.ts.
export async function readGitHubResponse(url: string, headers: Record<string, string>, parent: AbortSignal): Promise<{ data: any; link: string }> {
  return readGitHubJson<any>(url, { headers, signal: parent });
}

export function waitGitHubRead(ms: number, signal: AbortSignal): Promise<void> {
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const abort = () => { clearTimeout(timer); signal.removeEventListener("abort", abort); reject(new DOMException("Read cancelled", "AbortError")); };
    const timer = setTimeout(() => { signal.removeEventListener("abort", abort); resolve(); }, ms);
    signal.addEventListener("abort", abort, { once: true });
  });
}
