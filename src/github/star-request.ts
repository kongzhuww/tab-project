import { readGitHubStatus } from "./api-client";

export type GitHubStarResult = { state: "confirmed" } | { state: "rejected"; status: number } | { state: "unknown" };

// Writes are never retried or tied to the visibility signal. Aborting the wait
// does not prove that GitHub did not process the request.
async function requestStatus(url: string, headers: Record<string, string>, method: "PUT" | "DELETE"): Promise<number> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(url, { method, headers, signal: controller.signal, credentials: "omit", redirect: "error" });
    void response.body?.cancel().catch(() => undefined);
    controller.signal.throwIfAborted();
    return response.status;
  } finally {
    clearTimeout(timer);
  }
}

function starUrl(fullName: string): string {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(fullName) || fullName.split("/").some(part => part === "." || part === "..")) {
    throw new Error("Invalid repository name");
  }
  return `https://api.github.com/user/starred/${fullName.split("/").map(encodeURIComponent).join("/")}`;
}

export async function submitGitHubStar(fullName: string, headers: Record<string, string>, starred: boolean): Promise<GitHubStarResult> {
  let url: string;
  try { url = starUrl(fullName); } catch { return { state: "rejected", status: 400 }; }
  try {
    const status = await requestStatus(url, headers, starred ? "PUT" : "DELETE");
    if (status === 204 || (starred && status === 200)) return { state: "confirmed" };
    if (status >= 400 && status < 500 && status !== 408) return { state: "rejected", status };
    return { state: "unknown" };
  } catch { return { state: "unknown" }; }
}

export async function inspectGitHubStar(fullName: string, headers: Record<string, string>, signal: AbortSignal): Promise<boolean> {
  const status = (await readGitHubStatus(starUrl(fullName), { headers, signal, acceptedStatuses: [404] })).status;
  if (status === 204) return true;
  if (status === 404) {
    const repository = starUrl(fullName).replace("/user/starred/", "/repos/");
    if ((await readGitHubStatus(repository, { headers, signal })).status === 200) return false;
  }
  throw new Error("Star status could not be verified");
}
