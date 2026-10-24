/**
 * LogicWeaver 新标签页 - Bilibili DeclarativeNetRequest 防盗链动态网络规则 (TypeScript 模块)
 */

declare const chrome: any;

/** Old download code installed a persistent all-site UA/Referer override. Remove only our known rule. */
export async function removeLegacyGlobalNetRule(): Promise<void> {
  if (!chrome.declarativeNetRequest) throw new Error("网络规则接口不可用，旧规则清理未确认");
  await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [88991] });
}

export async function initBilibiliNetRules(): Promise<void> {
  if (!chrome.declarativeNetRequest || !chrome.runtime?.id) return;
  // Migration must run before the existing-rule fast path, including worker cold starts.
  try { await removeLegacyGlobalNetRule(); }
  catch { console.error("[LogicWeaver] 旧全站请求头规则清理失败；请检查扩展状态。"); return; }
  const extId = chrome.runtime.id;
  const RULE_ID_BILI_API = 2001;
  const RULE_ID_BILI_VIDEO = 2002;
  const RULE_ID_BILI_VIDEO_CN = 2003;
  const RULE_ID_BILI_HDSLB = 2004;

  // 幂等防御：若规则已存在且有效，直接跳过写盘，避免 SW 每次冷启动重复写入
  try {
    if (chrome.declarativeNetRequest.getDynamicRules) {
      const existing = await chrome.declarativeNetRequest.getDynamicRules();
      const existingIds = new Set((existing || []).map((r: any) => r.id));
      if (
        existingIds.has(RULE_ID_BILI_API) &&
        existingIds.has(RULE_ID_BILI_VIDEO) &&
        existingIds.has(RULE_ID_BILI_VIDEO_CN) &&
        existingIds.has(RULE_ID_BILI_HDSLB)
      ) {
        return;
      }
    }
  } catch {}

  const rules = [
    {
      id: RULE_ID_BILI_API,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          { header: "Referer", operation: "set", value: "https://www.bilibili.com/" },
          { header: "Origin", operation: "set", value: "https://www.bilibili.com" }
        ]
      },
      condition: {
        urlFilter: "||bilibili.com/",
        initiatorDomains: [extId],
        excludedInitiatorDomains: ["bilibili.com"],
        resourceTypes: ["xmlhttprequest", "media", "other"]
      }
    },
    {
      id: RULE_ID_BILI_VIDEO,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          { header: "Referer", operation: "set", value: "https://www.bilibili.com/" },
          { header: "Origin", operation: "set", value: "https://www.bilibili.com" }
        ]
      },
      condition: {
        urlFilter: "||bilivideo.com/",
        initiatorDomains: [extId],
        excludedInitiatorDomains: ["bilibili.com"],
        resourceTypes: ["xmlhttprequest", "media", "other"]
      }
    },
    {
      id: RULE_ID_BILI_VIDEO_CN,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          { header: "Referer", operation: "set", value: "https://www.bilibili.com/" },
          { header: "Origin", operation: "set", value: "https://www.bilibili.com" }
        ]
      },
      condition: {
        urlFilter: "||bilivideo.cn/",
        initiatorDomains: [extId],
        excludedInitiatorDomains: ["bilibili.com"],
        resourceTypes: ["xmlhttprequest", "media", "other"]
      }
    },
    {
      id: RULE_ID_BILI_HDSLB,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [
          { header: "Referer", operation: "set", value: "https://www.bilibili.com/" },
          { header: "Origin", operation: "set", value: "https://www.bilibili.com" }
        ]
      },
      condition: {
        urlFilter: "||hdslb.com/",
        initiatorDomains: [extId],
        resourceTypes: ["xmlhttprequest", "image", "other"]
      }
    }
  ];

  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID_BILI_API, RULE_ID_BILI_VIDEO, RULE_ID_BILI_VIDEO_CN, RULE_ID_BILI_HDSLB],
      addRules: rules
    });
  } catch (err) {
    console.warn("Bilibili DNR rules update failed:", err);
  }
}

const RULE_ID_YOUTUBE_COOKIE = 3001;

export async function syncYouTubeNetRules(): Promise<boolean> {
  if (!chrome.declarativeNetRequest) return false;
  try {
    // 移除手动注入 Cookie 规则，避免因拼接残缺 Cookie 导致 Google 登录校验失效重定向
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID_YOUTUBE_COOKIE]
    });
    return true;
  } catch {
    return false;
  }
}
