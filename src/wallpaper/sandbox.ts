import { buildWeShimScript } from "./we-shim";

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
  return String(path || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "").toLowerCase();
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

let latestProperties: Record<string, any> | null = null;
let latestIsPaused = false;

/**
 * 渲染视频类型壁纸 (原生 4K 硬解、零内存流式播放)
 */
async function renderVideoWallpaper(pack: WallpaperPack): Promise<void> {
  clearUrls();
  const root = document.getElementById("wallpaper-root");
  if (!root) return;
  root.replaceChildren();

  const files = Array.isArray(pack.files) ? pack.files : [];
  let videoEntry = files.find(f => {
    const p = normalizePath(f.path);
    return p.endsWith(".mp4") || p.endsWith(".webm") || p.endsWith(".mkv");
  });

  if (!videoEntry && pack.entry) {
    videoEntry = files.find(f => normalizePath(f.path) === normalizePath(pack.entry!));
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
 * 渲染 Web 网页类型壁纸 (脚本样式全内联、data-src 重写、支持 autoplay)
 */
async function renderWebWallpaper(pack: WallpaperPack): Promise<void> {
  clearUrls();
  const root = document.getElementById("wallpaper-root");
  if (!root) return;
  root.replaceChildren();
  if (typeof pack.entry !== "string") return;

  const entryPath = pack.entry;
  const files = Array.isArray(pack.files) ? pack.files : [];
  const byPath = new Map<string, WallpaperFile>();
  const assetMap: Record<string, string> = {};

  // 为每个资产文件生成全局 Blob URL 映射表，彻底解决 JS 运行时相对路径 404
  for (const f of files) {
    const norm = normalizePath(f.path);
    byPath.set(norm, f);
    if (f.file instanceof Blob) {
      const blobUrl = trackUrl(URL.createObjectURL(new Blob([f.file], { type: f.mime || f.file.type || "application/octet-stream" })));
      assetMap[norm] = blobUrl;
    }
  }

  function getUrl(fromPath: string, target: string): string {
    const key = resolvePath(fromPath, target);
    return assetMap[key] || target;
  }

  function rewriteCss(input: string, fromPath: string): string {
    let css = String(input || "");
    for (const match of [...css.matchAll(/url\(([^)]+)\)/gi)]) {
      const rawUrl = match[1].trim().replace(/^['"]|['"]$/g, "");
      const resolved = getUrl(fromPath, rawUrl);
      css = css.replace(match[0], `url(${JSON.stringify(resolved)})`);
    }
    return css;
  }

  function rewriteAttr(doc: Document, selector: string, attr: string, fromPath: string): void {
    for (const node of doc.querySelectorAll(selector)) {
      const value = node.getAttribute(attr);
      if (value) node.setAttribute(attr, getUrl(fromPath, value));
    }
  }

  const entry = byPath.get(normalizePath(entryPath));
  if (!entry?.file || !(entry.file instanceof Blob)) return;

  const doc = new DOMParser().parseFromString(await entry.file.text(), "text/html");

  // 计算入口文件所在目录作为 base
  const entryDir = normalizePath(entryPath).split("/").slice(0, -1).join("/");

  // 1. 注入全功能 Wallpaper Engine Web API Shim (带默认属性与内存 Storage)
  const shimScript = doc.createElement("script");
  shimScript.textContent = buildWeShimScript(assetMap, entryDir, pack.properties || {});
  doc.head.prepend(shimScript);

  // 2. 将外部样式表纯内联注入，绕过沙盒 CSP 外部网络限制
  for (const node of doc.querySelectorAll('link[rel~="stylesheet"][href]')) {
    const href = node.getAttribute("href") || "";
    const cssEntry = byPath.get(resolvePath(entryPath, href));
    if (cssEntry?.file instanceof Blob) {
      const css = rewriteCss(await cssEntry.file.text(), cssEntry.path);
      const styleEl = doc.createElement("style");
      styleEl.textContent = css;
      node.parentNode?.replaceChild(styleEl, node);
    }
  }

  // 3. 将外部脚本 (如 wp.js 等) 纯内联注入，彻底杜绝 blob: 外部脚本 CSP 拦截
  for (const node of Array.from(doc.querySelectorAll('script[src]'))) {
    const src = node.getAttribute("src") || "";
    const scriptEntry = byPath.get(resolvePath(entryPath, src));
    if (scriptEntry?.file instanceof Blob) {
      const scriptContent = await scriptEntry.file.text();
      const inlineScript = doc.createElement("script");
      inlineScript.textContent = scriptContent;
      node.parentNode?.replaceChild(inlineScript, node);
    }
  }

  // 4. 重写常用媒体属性 src 与 data-src (解决 HALOFLUX 中 audio[data-src] 映射问题)
  rewriteAttr(doc, "img[src],source[src],video[src],audio[src]", "src", entryPath);
  rewriteAttr(doc, "audio[data-src],video[data-src],img[data-src]", "data-src", entryPath);
  rewriteAttr(doc, "link[href]", "href", entryPath);
  for (const node of doc.querySelectorAll("[style]")) node.setAttribute("style", rewriteCss(node.getAttribute("style") || "", entryPath));
  for (const node of doc.querySelectorAll("style")) node.textContent = rewriteCss(node.textContent || "", entryPath);

  const frame = document.createElement("iframe");
  frame.id = "we-wallpaper-iframe";
  frame.title = pack.name || "Web Wallpaper";
  frame.sandbox.add("allow-scripts", "allow-pointer-lock", "allow-same-origin");
  frame.setAttribute("allow", "autoplay *");
  (frame as any).allow = "autoplay";
  frame.style.width = "100%";
  frame.style.height = "100%";
  frame.style.border = "none";
  frame.style.display = "block";
  frame.src = trackUrl(URL.createObjectURL(new Blob([`<!doctype html>\n${doc.documentElement.outerHTML}`], { type: "text/html" })));

  latestProperties = pack.properties || null;

  // 内层 iframe 挂载完成后立即补齐配置与状态，防止消息断路
  frame.addEventListener("load", () => {
    if (latestProperties) {
      frame.contentWindow?.postMessage({
        type: "WE_USER_PROPERTIES",
        properties: latestProperties,
      }, "*");
    }
    if (latestIsPaused) {
      frame.contentWindow?.postMessage({
        type: "WE_SET_PAUSED",
        isPaused: true,
      }, "*");
    }
  }, { once: true });

  root.appendChild(frame);
}

// 消息转发总线：将来自父页面的所有控制、鼠标事件与音频频谱零延迟透传给内层 iframe
window.addEventListener("message", (event: MessageEvent<any>) => {
  if (event.source !== window.parent) return;
  const data = event.data;
  if (!data) return;

  // 1. 壁纸加载指令
  if (data.type === "web") {
    try {
      window.parent.postMessage({ type: "WE_SANDBOX_ACK" }, "*");
    } catch (_) {}
    void renderWebWallpaper(data).catch(console.error);
    return;
  }
  if (data.type === "video") {
    try {
      window.parent.postMessage({ type: "WE_SANDBOX_ACK" }, "*");
    } catch (_) {}
    void renderVideoWallpaper(data).catch(console.error);
    return;
  }

  // 2. 状态透传与直达桥接
  if (data.type === "WE_USER_PROPERTIES") {
    latestProperties = data.properties;
  }
  if (data.type === "WE_SET_PAUSED") {
    latestIsPaused = Boolean(data.isPaused);
    const video = document.querySelector("#we-active-video") as HTMLVideoElement | null;
    if (video) {
      if (latestIsPaused) video.pause();
      else video.play().catch(() => {});
    }
  }

  const iframe = document.querySelector("#we-wallpaper-iframe") as HTMLIFrameElement | null;
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage(data, "*");
  }
});

window.addEventListener("pagehide", clearUrls);

// 主动向父窗口通知沙盒已就绪
try {
  window.parent.postMessage({ type: "WE_SANDBOX_READY" }, "*");
} catch (_) {}
