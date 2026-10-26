/**
 * LogicWeaver 新标签页 - 后台微服务中枢 (TypeScript 现代架构版)
 *
 * 统一调度：
 * - Bilibili DeclarativeNetRequest 防盗链动态网络规则
 * - 图片搜索与跨域防盗链提取代理
 * - 标签页智能生命周期、单例去重与原生空标签页自动清除
 */

import { initBilibiliNetRules, syncYouTubeNetRules, removeLegacyGlobalNetRule } from "./dnr";
import {
  initNotificationListeners,
  enableStickerSidePanel,
  flashBadge
} from "./notifications";
import {
  dedupeLogicWeaverNewTab,
  bookmarkCurrentTab,
  cleanupOrReplaceNativeNewTabs,
  initTabWatcher,
  openOrFocusNewTab
} from "./tab-manager";
import { handleSearchWebImages, handleFetchSiteImages } from "./image-proxy";

declare const chrome: any;

// 1. 初始化各领域核心微模块与监听器
initBilibiliNetRules();
initNotificationListeners();
// Retire persisted alarms from the removed mail/social feeds. Never clear other modules.
for (const name of ["gmail-inbox-poll", "x-account-poll"]) {
  chrome.alarms.clear(name).catch(() => console.warn("[Migration] Could not clear retired feed alarm"));
}
initTabWatcher();
initContextMenu();

// 监听扩展全局快捷键（例如 Alt+H 回到新标签页）
if (typeof chrome !== "undefined" && chrome.commands?.onCommand) {
  chrome.commands.onCommand.addListener((command: string) => {
    if (command === "focus-newtab") {
      void openOrFocusNewTab();
    }
  });
}

function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
  }
  return btoa(binary);
}

function cleanBiliImageUrl(rawUrl: string): string {
  let u = rawUrl.trim();
  if (u.startsWith("//")) u = "https:" + u;

  // 1. 如果路径中包含 .gif，不管后面跟了什么 @...avif 还是 @...webp，强力还原为原始动图 .gif
  const gifMatch = u.match(/(https?:\/\/[^?#]+?\.gif)(?:@[^?#]*)?(?:\?[^#]*)?$/i);
  if (gifMatch) {
    return gifMatch[1];
  }

  // 2. 如果包含 hdslb.com/bfs/
  if (u.includes("hdslb.com/bfs/")) {
    // 移除尾部 @... 裁剪/转码参数 (包括 @...webp, @...avif 等)
    u = u.replace(/@[^/?#]+$/i, "");
    // 如果剥离后还是以 .avif 结尾，尝试还原前面的真实扩展名 (.png/.jpg/.gif)
    const embeddedExtMatch = u.match(/^(https?:\/\/.+?\.(?:png|jpe?g|gif))\.avif$/i);
    if (embeddedExtMatch) {
      return embeddedExtMatch[1];
    }
  }

  return u;
}

function detectImageFormatByMagic(bytes: Uint8Array): { ext: string; isAvif: boolean } {
  // GIF: GIF87a 或 GIF89a
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
    return { ext: "gif", isAvif: false };
  }
  // PNG: \x89PNG
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { ext: "png", isAvif: false };
  }
  // JPEG: \xff\xd8\xff
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { ext: "jpg", isAvif: false };
  }
  // WEBP: RIFF....WEBP
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return { ext: "webp", isAvif: false };
  }
  // AVIF: ....ftypavif / ftypavis
  const headerStr = String.fromCharCode.apply(null, Array.from(bytes.slice(0, 16)));
  if (headerStr.includes("ftypavif") || headerStr.includes("ftypavis")) {
    return { ext: "avif", isAvif: true };
  }
  return { ext: "png", isAvif: false };
}

async function convertAvifToPngDataUrl(buffer: ArrayBuffer): Promise<string> {
  try {
    const blob = new Blob([buffer], { type: "image/avif" });
    const bitmap = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(bitmap, 0, 0);
      bitmap.close();
      const pngBlob = await canvas.convertToBlob({ type: "image/png" });
      const pngBuffer = await pngBlob.arrayBuffer();
      return `data:image/png;base64,${bufferToBase64(pngBuffer)}`;
    }
  } catch (_) {}
  return `data:image/png;base64,${bufferToBase64(buffer)}`;
}

async function saveImageToFavoritesFolder(param: { url?: string; dataUrl?: string }): Promise<{ ok: boolean; fileName?: string; error?: string }> {
  try {
    let finalDataUrl = param.dataUrl;
    let ext = "png";
    const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
    const randomSuffix = crypto.randomUUID().slice(0, 6);

    if (!finalDataUrl && param.url) {
      const cleanUrl = cleanBiliImageUrl(param.url);
      try {
        const headers: Record<string, string> = {
          "Accept": "image/gif,image/png,image/jpeg,image/webp,*/*;q=0.8"
        };
        if (cleanUrl.includes("hdslb.com") || cleanUrl.includes("bilibili.com")) {
          headers["Referer"] = "https://www.bilibili.com/";
        } else if (cleanUrl.includes("qq.com") || cleanUrl.includes("qpic.cn")) {
          headers["Referer"] = "https://im.qq.com/";
        }

        const resp = await fetch(cleanUrl, {
          headers,
          referrerPolicy: "no-referrer"
        });
        if (resp.ok) {
          const buffer = await resp.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          const magic = detectImageFormatByMagic(bytes);

          if (magic.isAvif) {
            finalDataUrl = await convertAvifToPngDataUrl(buffer);
            ext = "png";
          } else {
            ext = magic.ext;
            const mime = magic.ext === "gif" ? "image/gif" : magic.ext === "jpg" ? "image/jpeg" : magic.ext === "webp" ? "image/webp" : "image/png";
            finalDataUrl = `data:${mime};base64,${bufferToBase64(buffer)}`;
          }
        }
      } catch (fetchErr) {
        console.warn("[saveImageToFavoritesFolder] Fetch 预解析失败，回退到原生下载引擎:", fetchErr);
      }

      // 如果 Fetch 失败（如跨域或严格防盗链），直接通过原生 chrome.downloads.download 兜底
      if (!finalDataUrl) {
        const extMatch = cleanUrl.match(/\.(png|jpe?g|gif|webp|bmp)/i);
        const fileExt = extMatch ? extMatch[1].toLowerCase() : "jpg";
        const fileName = `${stamp}-${randomSuffix}.${fileExt}`;

        await chrome.downloads.download({
          url: cleanUrl,
          filename: `新标签页/收藏夹/${fileName}`,
          saveAs: false,
          conflictAction: "uniquify"
        });

        flashBadge("OK", "#10b981");
        return { ok: true, fileName };
      }
    } else if (finalDataUrl) {
      // 提取 base64 前 32 字节检测真实格式
      const base64Part = finalDataUrl.split(",")[1] || "";
      const rawHeader = atob(base64Part.slice(0, 48));
      const bytes = new Uint8Array(rawHeader.length);
      for (let i = 0; i < rawHeader.length; i++) bytes[i] = rawHeader.charCodeAt(i);
      const magic = detectImageFormatByMagic(bytes);
      if (magic.isAvif) {
        const binStr = atob(base64Part);
        const buf = new Uint8Array(binStr.length);
        for (let i = 0; i < binStr.length; i++) buf[i] = binStr.charCodeAt(i);
        finalDataUrl = await convertAvifToPngDataUrl(buf.buffer);
        ext = "png";
      } else {
        ext = magic.ext;
      }
    }

    if (!finalDataUrl) throw new Error("未能获取图片有效数据");

    const fileName = `${stamp}-${randomSuffix}.${ext}`;

    await chrome.downloads.download({
      url: finalDataUrl,
      filename: `新标签页/收藏夹/${fileName}`,
      saveAs: false,
      conflictAction: "uniquify"
    });

    flashBadge("OK", "#10b981");
    return { ok: true, fileName };
  } catch (err: any) {
    flashBadge("ERR", "#ef4444");
    return { ok: false, error: err?.message || "写入文件失败" };
  }
}

(globalThis as any).saveImageToFavoritesFolder = saveImageToFavoritesFolder;

function initContextMenu(): void {
  if (!chrome.contextMenus) return;
  try {
    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        id: "lw-save-image-to-fav",
        title: "📥 保存图片到「收藏夹」",
        contexts: ["image"]
      });
    });
  } catch {}
}

chrome.contextMenus?.onClicked?.addListener?.(async (info: any) => {
  if (info.menuItemId === "lw-save-image-to-fav") {
    await saveImageToFavoritesFolder({ url: info.srcUrl });
  }
});

// 2. 统一全局消息分发路由
chrome.runtime.onMessage.addListener((message: any, sender: any, sendResponse: (res: any) => void) => {
  // A. 新标签页智能单例去重
  if (message?.type === "dedupeLogicWeaverNewTab") {
    dedupeLogicWeaverNewTab(sender, sendResponse);
    return true;
  }

  // C. 核心：保存图片直入「新标签页/收藏夹」
  if (message?.type === "saveToFavorites") {
    saveImageToFavoritesFolder(message).then(sendResponse);
    return true;
  }

  // D. 核心：下载 B 站视频直落「新标签页/缓存视频」
  if (message?.type === "downloadBiliVideo") {
    (async () => {
      try {
        const { url, fileName } = message;
        if (!url || !fileName) throw new Error("缺少下载参数");

        // Never modify browser-wide UA/Referer for a download. Existing extension-scoped
        // Bilibili rules cover the fetch fallback; abort if legacy rule cleanup fails.
        await removeLegacyGlobalNetRule();

        let downloadId: number | null = null;
        try {
          downloadId = await chrome.downloads.download({
            url,
            filename: fileName,
            saveAs: false,
            conflictAction: "uniquify"
          });
        } catch (downloadErr: any) {
          // 若底层直链下载异常，采用 Service Worker fetch 流式拉取（受扩展白名单与 DNR 保护）
          const resp = await fetch(url, { referrerPolicy: "no-referrer" });
          if (!resp.ok) throw new Error(`视频流下载响应码 ${resp.status}`);
          const buffer = await resp.arrayBuffer();
          const base64 = bufferToBase64(buffer);
          downloadId = await chrome.downloads.download({
            url: `data:video/mp4;base64,${base64}`,
            filename: fileName,
            saveAs: false,
            conflictAction: "uniquify"
          });
        }

        flashBadge("DL", "#10b981");
        return { ok: true, downloadId };
      } catch (err: any) {
        flashBadge("ERR", "#ef4444");
        return { ok: false, error: err?.message || "视频下载失败" };
      }
    })().then(sendResponse);
    return true;
  }
  // E. 快捷将当前页面收藏为书签
  if (message?.type === "bookmarkCurrentPage") {
    (async () => {
      let targetTab = message?.tab;
      const targetPage = message?.targetPage || "常用网站";
      if (!targetTab || !targetTab.url) {
        try {
          const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
          if (tabs && tabs.length && tabs[0]?.url) targetTab = tabs[0];
        } catch {}
      }
      if (!targetTab || !targetTab.url) {
        try {
          const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tabs && tabs.length && tabs[0]?.url) targetTab = tabs[0];
        } catch {}
      }
      return bookmarkCurrentTab(targetTab, targetPage);
    })()
      .then(sendResponse)
      .catch((err) => {
        sendResponse({ ok: false, error: err?.message || "保存失败" });
      });
    return true;
  }

// F. 社群与通知手动立即抓取（已清理废弃第三方订阅管道）

  // I. 网络图片跨域搜索代理与图标提取
  if (message?.type === "searchWebImages") {
    return handleSearchWebImages(message, sendResponse);
  }
  if (message?.type === "fetchSiteImages") {
    return handleFetchSiteImages(message, sendResponse);
  }

  // J. 清理重启扩展时残留的原生新建标签页
  if (message?.type === "cleanupNativeTabs") {
    cleanupOrReplaceNativeNewTabs().then(() => sendResponse({ ok: true }));
    return true;
  }

  // K. 图片复制跨域代理：从 background 拉取图片并以 base64 格式返回，彻底消除前端 CORS 与防盗链限制
  if (message?.type === "fetchImageForClipboard") {
    const rawUrl = String(message?.url || "").trim();
    if (!rawUrl) {
      sendResponse({ ok: false, error: "图片链接为空" });
      return false;
    }
    (async () => {
      const candidates = [rawUrl];
      if (rawUrl.startsWith("https://")) {
        candidates.push(rawUrl.replace(/^https:\/\//i, "http://"));
      } else if (rawUrl.startsWith("http://")) {
        candidates.push(rawUrl.replace(/^http:\/\//i, "https://"));
      }

      for (const curUrl of candidates) {
        try {
          const cleanUrl = cleanBiliImageUrl(curUrl);
          const resp = await fetch(cleanUrl, {
            referrerPolicy: "no-referrer"
          });
          if (!resp.ok) continue;
          const buffer = await resp.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          const magic = detectImageFormatByMagic(bytes);

          let finalDataUrl = "";
          let isPng = false;
          if (magic.isAvif) {
            finalDataUrl = await convertAvifToPngDataUrl(buffer);
            isPng = true;
          } else {
            isPng = magic.ext === "png";
            const mime = magic.ext === "gif" ? "image/gif" : magic.ext === "jpg" ? "image/jpeg" : magic.ext === "webp" ? "image/webp" : "image/png";
            finalDataUrl = `data:${mime};base64,${bufferToBase64(buffer)}`;
          }
          sendResponse({ ok: true, dataUrl: finalDataUrl, isPng });
          return;
        } catch {
          // 当前候选地址拉取失败，尝试下一候选
        }
      }
      sendResponse({ ok: false, error: "图片拉取失败" });
    })();
    return true;
  }

  // L. YouTube 登录凭据与网络注入规则动态同步
  if (message?.type === "syncYouTubeNetRules") {
    syncYouTubeNetRules().then((ok) => sendResponse({ ok }));
    return true;
  }

  // M. 核心：通过拥有完整 host_permissions 的 Background Service Worker 原生拉取 YouTube
  if (message?.type === "fetchYouTubeHtml") {
    (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 25000);
      try {
        const url = message.url || "https://www.youtube.com/";
        const resp = await fetch(url, {
          credentials: "include",
          signal: controller.signal,
          headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
          }
        });
        clearTimeout(timer);
        const html = await resp.text();
        sendResponse({
          ok: resp.ok,
          status: resp.status,
          finalUrl: resp.url,
          html
        });
      } catch (err: any) {
        clearTimeout(timer);
        sendResponse({ ok: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }

  // M2. 核心 InnerTube API 代理（带 SAPISID 算法流鉴权与原生搜索）
  if (message?.type === "fetchYouTubeInnerTube") {
    (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);
      try {
        const endpoint = message.endpoint || "browse";
        const customPayload = message.payload || {};

        // 提取当前浏览器已登录的 SAPISID / __Secure-3PAPISID 构造官方鉴权
        let authHeader = "";
        try {
          const ytCookies = await chrome.cookies?.getAll?.({ domain: ".youtube.com" }) || [];
          const sapisidCookie = ytCookies.find((c: any) => c.name === "SAPISID" || c.name === "__Secure-3PAPISID" || c.name === "__Secure-1PAPISID");
          if (sapisidCookie?.value) {
            const time = Math.floor(Date.now() / 1000);
            const encoder = new TextEncoder();
            const data = encoder.encode(`${time} ${sapisidCookie.value} https://www.youtube.com`);
            const hashBuffer = await crypto.subtle.digest("SHA-1", data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
            authHeader = `SAPISIDHASH ${time}_${hashHex}`;
          }
        } catch {}

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "X-YouTube-Client-Name": "1",
          "X-YouTube-Client-Version": "2.20240301.00.00",
          "Origin": "https://www.youtube.com",
          "Referer": "https://www.youtube.com/",
          "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7"
        };
        if (authHeader) {
          headers["Authorization"] = authHeader;
          headers["X-Origin"] = "https://www.youtube.com";
        }

        const body = {
          context: {
            client: {
              clientName: "WEB",
              clientVersion: "2.20240301.00.00",
              hl: "zh-CN",
              gl: "JP",
              utcOffsetMinutes: 480
            }
          },
          ...customPayload
        };

        const resp = await fetch(`https://www.youtube.com/youtubei/v1/${endpoint}?prettyPrint=false`, {
          method: "POST",
          headers,
          credentials: "include",
          signal: controller.signal,
          body: JSON.stringify(body)
        });
        clearTimeout(timer);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();
        sendResponse({ ok: true, data: json });
      } catch (err: any) {
        clearTimeout(timer);
        sendResponse({ ok: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }

  // N. 诊断 YouTube Cookie 与账号状态
  if (message?.type === "debugYouTubeCookies") {
    (async () => {
      try {
        const ytCookies = await chrome.cookies?.getAll?.({ domain: ".youtube.com" }) || [];
        const gCookies = await chrome.cookies?.getAll?.({ domain: ".google.com" }) || [];
        const ytNames = ytCookies.map((c: any) => c.name);
        const gNames = gCookies.map((c: any) => c.name);
        const hasLogin = ytNames.includes("LOGIN_INFO") || ytNames.includes("SAPISID") || ytNames.includes("SID");
        sendResponse({
          ok: true,
          ytCount: ytCookies.length,
          ytNames,
          gCount: gCookies.length,
          gNames,
          hasLogin
        });
      } catch (err: any) {
        sendResponse({ ok: false, error: err?.message || String(err) });
      }
    })();
    return true;
  }
});

// 3. 安装与启动生命周期初始化

chrome.runtime.onInstalled?.addListener?.(() => {
  enableStickerSidePanel();
  initBilibiliNetRules();
  syncYouTubeNetRules();
  setTimeout(cleanupOrReplaceNativeNewTabs, 200);
  setTimeout(cleanupOrReplaceNativeNewTabs, 1000);
});

chrome.runtime.onStartup?.addListener?.(() => {
  enableStickerSidePanel();
  initBilibiliNetRules();
  syncYouTubeNetRules();
  setTimeout(cleanupOrReplaceNativeNewTabs, 200);
  setTimeout(cleanupOrReplaceNativeNewTabs, 1000);
});
