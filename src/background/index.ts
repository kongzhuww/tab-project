/**
 * LogicWeaver 新标签页 - 后台微服务中枢 (TypeScript 现代架构版)
 *
 * 统一调度：
 * - Bilibili DeclarativeNetRequest 防盗链动态网络规则
 * - 图片搜索与跨域防盗链提取代理
 * - 标签页智能生命周期、单例去重与浏览器默认空白页（edge://newtab）自动接管
 *
 * 架构声明：
 * - 本扩展为纯前端 Chromium Manifest V3 架构，已彻底移除 Native Messaging、Native Host 及伴侣进程。
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
  cleanupOrReplaceBrowserDefaultNewTabs,
  initTabWatcher,
  openOrFocusNewTab
} from "./tab-manager";
import { handleSearchWebImages, handleFetchSiteImages } from "./image-proxy";
import { acquireImageSlot, fetchImageBytes, mediaUrl, MAX_IMAGE_BYTES, MAX_IMAGE_PIXELS, validateImagePixels } from "./media-fetch";
import { initTodoistBackgroundSync, syncTodoistInBackground } from "./todoist-sync";

declare const chrome: any;

// 1. 初始化各领域核心微模块与监听器
initBilibiliNetRules();
initNotificationListeners();
initTodoistBackgroundSync();
// Retire persisted alarms from the removed mail/social feeds. Never clear other modules.
for (const name of ["gmail-inbox-poll", "x-account-poll"]) {
  chrome.alarms.clear(name).catch(() => console.warn("[Migration] Could not clear retired feed alarm"));
}
initTabWatcher();
initContextMenu();

// 监听扩展全局快捷键（例如 Alt+H 回到新标签页）
if (typeof chrome !== "undefined" && chrome.commands?.onCommand) {
  chrome.commands.onCommand.addListener((command: string, tab?: { windowId?: number }) => {
    if (command === "focus-newtab") void openOrFocusNewTab();
    if (command === "open-side-panel" || command === "_execute_side_panel") {
      const failed = () => { void flashBadge("ERR", "#ef4444"); console.warn("[SidePanel] Could not open panel from keyboard command."); };
      // Call directly in the command gesture when the browser supplies the active tab.
      if (Number.isInteger(tab?.windowId) && tab!.windowId! >= 0) {
        chrome.sidePanel.open({ windowId: tab!.windowId }).catch(failed);
      } else {
        chrome.windows.getLastFocused().then((win: { id?: number }) => {
          if (!Number.isInteger(win.id)) throw new Error("No active browser window");
          return chrome.sidePanel.open({ windowId: win.id });
        }).catch(failed);
      }
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
  throw new Error("不支持的图片格式");
}

async function convertAvifToPngDataUrl(buffer: ArrayBuffer): Promise<string> {
  const bitmap = await createImageBitmap(new Blob([buffer], { type: "image/avif" }));
  try {
    if (bitmap.width * bitmap.height > MAX_IMAGE_PIXELS || bitmap.width > 16384 || bitmap.height > 16384)
      throw new Error("图片尺寸过大");
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("图片转换不可用");
    ctx.drawImage(bitmap, 0, 0);
    const pngBlob = await canvas.convertToBlob({ type: "image/png" });
    if (pngBlob.size > MAX_IMAGE_BYTES) throw new Error("转换后的图片超过 12 MiB 限制");
    return `data:image/png;base64,${bufferToBase64(await pngBlob.arrayBuffer())}`;
  } finally { bitmap.close(); }
}

async function saveImageToFavoritesFolder(param: { url?: string; dataUrl?: string }): Promise<{ ok: boolean; fileName?: string; error?: string }> {
  let release: (() => void) | undefined;
  try {
    release = acquireImageSlot();
    let buffer: ArrayBuffer;
    if (param.dataUrl) {
      if (param.dataUrl.length > Math.ceil(MAX_IMAGE_BYTES / 3) * 4 + 128 ||
          !/^data:image\/(?:png|jpeg|gif|webp|avif);base64,/i.test(param.dataUrl)) throw new Error("图片格式无效或超过 12 MiB 限制");
      const raw = atob(param.dataUrl.slice(param.dataUrl.indexOf(",") + 1));
      if (raw.length > MAX_IMAGE_BYTES) throw new Error("图片超过 12 MiB 限制");
      buffer = Uint8Array.from(raw, char => char.charCodeAt(0)).buffer;
    } else if (param.url) {
      buffer = await fetchImageBytes(cleanBiliImageUrl(param.url));
    } else throw new Error("图片地址为空");
    const magic = detectImageFormatByMagic(new Uint8Array(buffer));
    const mime = magic.ext === "jpg" ? "image/jpeg" : "image/" + magic.ext;
    await validateImagePixels(buffer, mime);
    const dataUrl = magic.isAvif ? await convertAvifToPngDataUrl(buffer) : `data:${mime};base64,${bufferToBase64(buffer)}`;
    const ext = magic.isAvif ? "png" : magic.ext;
    const fileName = `${new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)}-${crypto.randomUUID().slice(0, 6)}.${ext}`;
    await chrome.downloads.download({ url: dataUrl, filename: `新标签页/收藏夹/${fileName}`, saveAs: false, conflictAction: "uniquify" });
    flashBadge("DL", "#10b981");
    return { ok: true, fileName };
  } catch (error) {
    flashBadge("ERR", "#ef4444");
    return { ok: false, error: error instanceof Error ? error.message : "图片下载未创建" };
  } finally { release?.(); }
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

        const downloadUrl = mediaUrl(url);
        const downloadId = await chrome.downloads.download({
          url: downloadUrl, filename: fileName, saveAs: false, conflictAction: "uniquify"
        });
        // Accepted by the download manager, not completion. Never buffer videos in this worker.

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

  // J. 清理重启扩展时残留的浏览器默认空白标签页（如 edge://newtab / chrome://newtab）
  // 历史兼容命名 cleanupNativeTabs 指的是浏览器厂商自带的默认空白标签页，不代表当前 Native Host 功能仍存在
  if (message?.type === "cleanupNativeTabs" || message?.type === "cleanupBrowserDefaultTabs") {
    cleanupOrReplaceBrowserDefaultNewTabs().then(() => sendResponse({ ok: true }));
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
      let release: (() => void) | undefined;
      try {
        release = acquireImageSlot();
        const buffer = await fetchImageBytes(cleanBiliImageUrl(rawUrl));
        const magic = detectImageFormatByMagic(new Uint8Array(buffer));
        const mime = magic.ext === "jpg" ? "image/jpeg" : "image/" + magic.ext;
        await validateImagePixels(buffer, mime);
        const dataUrl = magic.isAvif ? await convertAvifToPngDataUrl(buffer) : `data:${mime};base64,${bufferToBase64(buffer)}`;
        sendResponse({ ok: true, dataUrl, isPng: magic.isAvif || magic.ext === "png" });
      } catch (error) {
        sendResponse({ ok: false, error: error instanceof Error ? error.message : "图片读取失败" });
      } finally { release?.(); }
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
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 200);
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 1000);
  setTimeout(() => void syncTodoistInBackground(), 3000);
});

chrome.runtime.onStartup?.addListener?.(() => {
  enableStickerSidePanel();
  initBilibiliNetRules();
  syncYouTubeNetRules();
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 200);
  setTimeout(cleanupOrReplaceBrowserDefaultNewTabs, 1000);
  setTimeout(() => void syncTodoistInBackground(), 3000);
});
