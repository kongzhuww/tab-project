declare const chrome: any;

// Session rules survive worker suspension, but never change normal website logins.
// Serialize allocation so concurrent WebDAV requests cannot overwrite each other's rule.
let ruleQueue: Promise<void> = Promise.resolve();
const FIRST_RULE_ID = 41000;
const LAST_RULE_ID = 41999;

export function ensureWebDavAuthRule(target: string): Promise<void> {
  const operation = ruleQueue.then(async () => {
    const url = new URL(target);
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) {
      throw new Error("WebDAV 地址无效");
    }
    url.hash = "";
    const api = typeof chrome !== "undefined" ? chrome.declarativeNetRequest : undefined;
    const extensionId = typeof chrome !== "undefined" ? chrome.runtime?.id : undefined;
    if (!api?.getSessionRules || !api?.updateSessionRules || !extensionId) {
      throw new Error("WebDAV 登录弹窗保护不可用，请在扩展中操作；未发送请求");
    }
    const regexFilter = "^" + url.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$";
    const rules = await api.getSessionRules();
    const matching = rules.find((rule: any) =>
      rule.id >= FIRST_RULE_ID && rule.id <= LAST_RULE_ID &&
      rule.condition?.regexFilter === regexFilter &&
      JSON.stringify(rule.condition?.initiatorDomains) === JSON.stringify([extensionId]) &&
      JSON.stringify(rule.condition?.resourceTypes) === JSON.stringify(["xmlhttprequest"]) &&
      rule.action?.type === "modifyHeaders" &&
      rule.action?.responseHeaders?.some((header: any) =>
        header.header.toLowerCase() === "www-authenticate" && header.operation === "remove"));
    if (matching) return;
    const used = new Set(rules.map((rule: any) => rule.id));
    let id = FIRST_RULE_ID;
    while (used.has(id) && id <= LAST_RULE_ID) id++;
    if (id > LAST_RULE_ID) throw new Error("WebDAV 登录弹窗保护规则已满；未发送请求");
    await api.updateSessionRules({ addRules: [{
      id,
      priority: 1,
      action: {
        type: "modifyHeaders",
        responseHeaders: [{ header: "WWW-Authenticate", operation: "remove" }]
      },
      condition: { regexFilter, initiatorDomains: [extensionId], resourceTypes: ["xmlhttprequest"] }
    }] });
  });
  ruleQueue = operation.catch(() => {});
  return operation;
}

export async function webDavFetch(target: string, init: RequestInit): Promise<Response> {
  await ensureWebDavAuthRule(target);
  // Redirects must not escape the protected URL or forward credentials elsewhere.
  return fetch(target, { ...init, credentials: "omit", redirect: "error" });
}
