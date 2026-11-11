import { WE_SHIM_SCRIPT_CONTENT } from "./we-shim";

type WallpaperFile = { path: string; file: Blob; mime?: string };
type WallpaperPack = {
  type: "web" | "video";
  entry?: string;
  files?: WallpaperFile[];
  name?: string;
  properties?: Record<string, any>;
};

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

/**
 * 渲染视频类型壁纸 (原生 4K 硬解、零内存流式播放)
 */
async function renderVideoWallpaper(pack: WallpaperPack): Promise<void> {
  clearUrls();
  const root = document.getElementById("wallpaper-root");
  if (!root) return;
  root.replaceChildren();

  const files = Array.isArray(pack.files) ? pack.files : [];
  // 查找视频文件
  let videoEntry = files.find(f => {
    const p = normalizePath(f.path).toLowerCase();
    return p.endsWith(".mp4") || p.endsWith(".webm") || p.endsWith(".mkv");
  });

  if (!videoEntry && pack.entry) {
    videoEntry = files.find(f => normalizePath(f.path).toLowerCase() === normalizePath(pack.entry!).toLowerCase());
  }

  if (!videoEntry?.file) return;

  const video = document.createElement("video");
  video.id = "we-active-video";
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.setAttribute("webkit-playsinline", "true");
  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "cover";
  video.style.display = "block";
  video.style.pointerEvents = "none";

  const videoUrl = trackUrl(URL.createObjectURL(videoEntry.file));
  video.src = videoUrl;
  root.appendChild(video);

  try {
    await video.play();
  } catch (err) {
    console.warn("[Video Wallpaper] Autoplay warning:", err);
  }
}

/**
 * 渲染 Web 网页类型壁纸 (注入标准 WE 垫片与事件派发器)
 */
async function renderWebWallpaper(pack: WallpaperPack): Promise<void> {
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

  // 注入完整工业级 Wallpaper Engine Web API Shim
  const shimScript = doc.createElement("script");
  shimScript.textContent = WE_SHIM_SCRIPT_CONTENT;
  doc.head.prepend(shimScript);

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
  frame.id = "we-wallpaper-iframe";
  frame.title = pack.name || "Web Wallpaper";
  frame.sandbox.add("allow-scripts", "allow-pointer-lock");
  frame.style.width = "100%";
  frame.style.height = "100%";
  frame.style.border = "none";
  frame.style.display = "block";
  frame.src = trackUrl(URL.createObjectURL(new Blob([`<!doctype html>\n${doc.documentElement.outerHTML}`], { type: "text/html" })));
  root.appendChild(frame);

  // 若随包带有默认属性，等 iframe 挂载完毕后下发初始化配置
  if (pack.properties) {
    frame.addEventListener("load", () => {
      frame.contentWindow?.postMessage({
        type: "WE_USER_PROPERTIES",
        properties: pack.properties,
      }, "*");
    }, { once: true });
  }
}

window.addEventListener("message", (event: MessageEvent<any>) => {
  if (event.source !== window.parent) return;
  const data = event.data;
  if (!data) return;

  // 1. 壁纸加载指令
  if (data.type === "web") {
    void renderWebWallpaper(data).catch(console.error);
    return;
  }
  if (data.type === "video") {
    void renderVideoWallpaper(data).catch(console.error);
    return;
  }

  // 2. 状态透传指令 (转发至内部 iframe 或直接控制视频)
  const iframe = document.querySelector("#we-wallpaper-iframe") as HTMLIFrameElement | null;
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage(data, "*");
  }

  const video = document.querySelector("#we-active-video") as HTMLVideoElement | null;
  if (video && data.type === "WE_SET_PAUSED") {
    if (data.isPaused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }
});

window.addEventListener("pagehide", clearUrls);
