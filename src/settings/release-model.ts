export const RELEASE_API = "https://api.github.com/repos/kongzhuww/tab-project-next/releases";
export interface ReleaseAsset { id: number; name: string; size: number; browser_download_url: string }
export interface ReleaseInfo { tag_name: string; name: string; body: string; assets: ReleaseAsset[] }
export function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" ? value as Record<string, unknown> : {};
}
export function parseRelease(value: unknown): ReleaseInfo {
  const data = record(value);
  if (typeof data.tag_name !== "string" || !/^v?\d+(?:\.\d+){1,3}$/i.test(data.tag_name)) {
    throw new Error("发行版版本号无效，无法比较更新");
  }
  const assets: ReleaseAsset[] = [];
  for (const item of Array.isArray(data.assets) ? data.assets : []) {
    const asset = record(item);
    if (typeof asset.id !== "number" || !Number.isSafeInteger(asset.id) || asset.id <= 0 ||
        typeof asset.name !== "string" || !/^[\w.() -]+\.zip$/i.test(asset.name) ||
        typeof asset.size !== "number" || !Number.isSafeInteger(asset.size) || asset.size < 0) continue;
    let url: URL;
    try { url = new URL(String(asset.browser_download_url)); } catch { continue; }
    if (url.origin !== "https://github.com" || url.username || url.password ||
        !url.pathname.startsWith("/kongzhuww/tab-project-next/releases/download/")) continue;
    assets.push({ id: asset.id, name: asset.name, size: asset.size, browser_download_url: url.href });
  }
  return { tag_name: data.tag_name, name: typeof data.name === "string" ? data.name : "",
    body: typeof data.body === "string" ? data.body : "", assets };
}
export function compareVersions(left: string, right: string): number {
  const parse = (value: string) => {
    if (!/^v?\d+(?:\.\d+){1,3}$/i.test(value)) throw new Error("版本号格式无效");
    return value.replace(/^v/i, "").split(".").map(Number);
  };
  const a = parse(left), b = parse(right);
  for (let index = 0; index < Math.max(a.length, b.length); index++) {
    const delta = (a[index] || 0) - (b[index] || 0);
    if (delta) return Math.sign(delta);
  }
  return 0;
}
export function selectExtensionAsset(release: ReleaseInfo): ReleaseAsset | undefined {
  // Never download a source archive or an unrelated asset as the extension installer.
  return release.assets.find(asset => /-extension\.zip$/i.test(asset.name));
}
