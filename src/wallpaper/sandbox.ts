type WallpaperFile = { path: string; file: Blob; mime?: string };
type WallpaperPack = { type: "web"; entry?: string; files?: WallpaperFile[]; name?: string };

let activeUrls: string[] = [];
function trackUrl(url: string): string { activeUrls.push(url); return url; }
function clearUrls(): void {
  for (const url of activeUrls) URL.revokeObjectURL(url);
  activeUrls = [];
}
function normalizePath(path: string): string {
  return String(path || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
}
function resolvePath(fromPath: string, target: string): string {
  const raw = String(target || "").trim().replace(/^['"]|['"]$/g, "");
  if (!raw || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(raw)) return "";
  const [pathname] = raw.split(/[?#]/);
  if (!pathname) return "";
  const base = raw.startsWith("/") ? "" : normalizePath(fromPath).split("/").slice(0, -1).join("/");
  const parts = `${base ? `${base}/` : ""}${pathname.replace(/^\/+/, "")}`.split("/");
  const stack: string[] = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") stack.pop();
    else stack.push(part);
  }
  return stack.join("/").toLowerCase();
}

async function renderWallpaper(pack: WallpaperPack): Promise<void> {
  clearUrls();
  const root = document.getElementById("wallpaper-root");
  if (!root) return;
  root.replaceChildren();
  if (typeof pack.entry !== "string") return;
  const entryPath = pack.entry;
  const byPath = new Map((Array.isArray(pack.files) ? pack.files : []).map((entry) => [normalizePath(entry.path).toLowerCase(), entry]));
  const urls = new Map<string, string>();
  async function getUrl(fromPath: string, target: string): Promise<string> {
    const key = resolvePath(fromPath, target);
    const entry = byPath.get(key);
    if (!entry?.file || !(entry.file instanceof Blob)) return target;
    if (!urls.has(key)) urls.set(key, trackUrl(URL.createObjectURL(new Blob([entry.file], { type: entry.mime || entry.file.type || "application/octet-stream" }))));
    return urls.get(key)!;
  }
  async function rewriteCss(input: string, fromPath: string): Promise<string> {
    let css = String(input || "");
    for (const match of [...css.matchAll(/url\(([^)]+)\)/gi)]) {
      const url = await getUrl(fromPath, match[1].trim());
      css = css.replace(match[0], `url(${JSON.stringify(url)})`);
    }
    return css;
  }
  async function rewriteAttr(doc: Document, selector: string, attr: string, fromPath: string): Promise<void> {
    for (const node of doc.querySelectorAll(selector)) {
      const value = node.getAttribute(attr);
      if (value) node.setAttribute(attr, await getUrl(fromPath, value));
    }
  }

  const entry = byPath.get(normalizePath(entryPath).toLowerCase());
  if (!entry?.file || !(entry.file instanceof Blob)) return;
  const doc = new DOMParser().parseFromString(await entry.file.text(), "text/html");
  const api = doc.createElement("script");
  api.textContent = "window.wallpaperPropertyListener=window.wallpaperPropertyListener||{};window.wallpaperRegisterAudioListener=window.wallpaperRegisterAudioListener||function(){};";
  doc.head.prepend(api);
  for (const node of doc.querySelectorAll('link[rel~="stylesheet"][href]')) {
    const href = node.getAttribute("href") || "";
    const cssEntry = byPath.get(resolvePath(entryPath, href));
    if (cssEntry?.file instanceof Blob) {
      const css = await rewriteCss(await cssEntry.file.text(), cssEntry.path);
      node.setAttribute("href", trackUrl(URL.createObjectURL(new Blob([css], { type: "text/css" }))));
    }
  }
  await rewriteAttr(doc, "img[src],script[src],source[src],video[src],audio[src]", "src", entryPath);
  await rewriteAttr(doc, "link[href]", "href", entryPath);
  for (const node of doc.querySelectorAll("[style]")) node.setAttribute("style", await rewriteCss(node.getAttribute("style") || "", entryPath));
  for (const node of doc.querySelectorAll("style")) node.textContent = await rewriteCss(node.textContent || "", entryPath);

  const frame = document.createElement("iframe");
  frame.title = pack.name || "Web Wallpaper";
  frame.sandbox.add("allow-scripts", "allow-pointer-lock");
  frame.src = trackUrl(URL.createObjectURL(new Blob([`<!doctype html>\n${doc.documentElement.outerHTML}`], { type: "text/html" })));
  root.appendChild(frame);
}

window.addEventListener("message", (event: MessageEvent<WallpaperPack>) => {
  // Only the containing extension page may supply a wallpaper bundle.
  if (event.source === window.parent && event.data?.type === "web") void renderWallpaper(event.data).catch(console.error);
});
window.addEventListener("pagehide", clearUrls);
