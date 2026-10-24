const t = ["webdavUrl", "webdavUsername", "webdavPassword", "webdavFilename"], n = { webdavUrl: "https://dav.jianguoyun.com/dav/LogicWeaver/", webdavUsername: "", webdavPassword: "", webdavFilename: "logicweaver-settings.json" };
async function l() {
  const e = typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([...t]) : Object.fromEntries(t.map((o) => [o, localStorage.getItem(o)]));
  return Object.fromEntries(t.map((o) => [o, typeof e[o] == "string" ? e[o] : n[o]]));
}
async function i(e, o) {
  if (e.webdavUrl.trim()) {
    const a = new URL(e.webdavUrl.trim());
    if (!["https:", "http:"].includes(a.protocol) || a.username || a.password) throw new Error("invalid-url");
  }
  if (/[\\/]/.test(e.webdavFilename)) throw new Error("invalid-filename");
  const r = {};
  for (const a of t)
    e[a] !== o[a] && (r[a] = a === "webdavPassword" ? e[a] : e[a].trim());
  if (Object.keys(r).length)
    if (typeof chrome < "u" && chrome.storage?.local) await chrome.storage.local.set(r);
    else for (const [a, s] of Object.entries(r)) localStorage.setItem(a, s);
}
function c(e) {
  return { url: e.webdavUrl || n.webdavUrl, username: e.webdavUsername, password: e.webdavPassword, filename: e.webdavFilename || n.webdavFilename };
}
export {
  t as WEBDAV_SETTINGS_KEYS,
  l as loadWebDavSettings,
  i as saveWebDavSettings,
  c as toWebDavConfig
};
