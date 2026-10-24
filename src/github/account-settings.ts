// Leaf account reader: no service/store imports and no network or storage on import.
// Callers must keep credentials out of view state, logs, cache keys and non-GitHub requests.
export async function loadGitHubAccountSettings(): Promise<{ ghUser: string; ghToken: string }> {
  const stored = typeof chrome !== "undefined" && chrome.storage?.local
    ? await chrome.storage.local.get(["ghUser", "ghToken"])
    : { ghUser: localStorage.getItem("ghUser"), ghToken: localStorage.getItem("ghToken") };
  return { ghUser: typeof stored.ghUser === "string" ? stored.ghUser : "", ghToken: typeof stored.ghToken === "string" ? stored.ghToken : "" };
}
