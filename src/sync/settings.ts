import type { WebDavConfig } from "../services/webdav.service";
export const WEBDAV_SETTINGS_KEYS = ["webdavUrl", "webdavUsername", "webdavPassword", "webdavFilename"] as const;
export type WebDavSettings = Record<typeof WEBDAV_SETTINGS_KEYS[number], string>;
const DEFAULTS: WebDavSettings = { webdavUrl: "https://dav.jianguoyun.com/dav/LogicWeaver/", webdavUsername: "", webdavPassword: "", webdavFilename: "logicweaver-settings.json" };
export async function loadWebDavSettings(): Promise<WebDavSettings> {
  const stored = typeof chrome !== "undefined" && chrome.storage?.local
    ? await chrome.storage.local.get([...WEBDAV_SETTINGS_KEYS])
    : Object.fromEntries(WEBDAV_SETTINGS_KEYS.map(key => [key, localStorage.getItem(key)]));
  return Object.fromEntries(WEBDAV_SETTINGS_KEYS.map(key => [key, typeof stored[key] === "string" ? stored[key] : DEFAULTS[key]])) as WebDavSettings;
}
export async function saveWebDavSettings(draft: WebDavSettings, initial: WebDavSettings): Promise<void> {
  if (draft.webdavUrl.trim()) {
    const url = new URL(draft.webdavUrl.trim());
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error("invalid-url");
  }
  if (/[\\/]/.test(draft.webdavFilename)) throw new Error("invalid-filename");
  const payload: Partial<WebDavSettings> = {};
  for (const key of WEBDAV_SETTINGS_KEYS) {
    if (draft[key] !== initial[key]) payload[key] = key === "webdavPassword" ? draft[key] : draft[key].trim();
  }
  if (!Object.keys(payload).length) return;
  if (typeof chrome !== "undefined" && chrome.storage?.local) await chrome.storage.local.set(payload);
  else for (const [key, value] of Object.entries(payload)) localStorage.setItem(key, value);
}
export function toWebDavConfig(settings: WebDavSettings): WebDavConfig {
  return { url: settings.webdavUrl || DEFAULTS.webdavUrl, username: settings.webdavUsername, password: settings.webdavPassword, filename: settings.webdavFilename || DEFAULTS.webdavFilename };
}
