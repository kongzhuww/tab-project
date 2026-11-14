import { r as C, e as N, p as O, S as L, a as Y, i as R, B as ge, d as D, b as he } from "./sync.service-DU_NQoTG.js";
import { m as F, v as P } from "./multica.service-C7XZpV6O.js";
const T = ["webdavUrl", "webdavUsername", "webdavPassword", "webdavFilename"], I = { webdavUrl: "https://dav.jianguoyun.com/dav/LogicWeaver/", webdavUsername: "", webdavPassword: "", webdavFilename: "logicweaver-settings.json" };
async function Le() {
  const a = typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([...T]) : Object.fromEntries(T.map((t) => [t, localStorage.getItem(t)]));
  return Object.fromEntries(T.map((t) => [t, typeof a[t] == "string" ? a[t] : I[t]]));
}
async function Ue(a, t) {
  if (a.webdavUrl.trim()) {
    const r = new URL(a.webdavUrl.trim());
    if (!["https:", "http:"].includes(r.protocol) || r.username || r.password) throw new Error("invalid-url");
  }
  if (/[\\/]/.test(a.webdavFilename)) throw new Error("invalid-filename");
  const e = {};
  for (const r of T)
    a[r] !== t[r] && (e[r] = r === "webdavPassword" ? a[r] : a[r].trim());
  if (Object.keys(e).length)
    if (typeof chrome < "u" && chrome.storage?.local) await chrome.storage.local.set(e);
    else for (const [r, o] of Object.entries(e)) localStorage.setItem(r, o);
}
function Ce(a) {
  return { url: a.webdavUrl || I.webdavUrl, username: a.webdavUsername, password: a.webdavPassword, filename: a.webdavFilename || I.webdavFilename };
}
let X = Promise.resolve();
const Z = 41e3, V = 41999;
function ye(a) {
  const t = X.then(async () => {
    const e = new URL(a);
    if (!["https:", "http:"].includes(e.protocol) || e.username || e.password)
      throw new Error("WebDAV 地址无效");
    e.hash = "";
    const r = typeof chrome < "u" ? chrome.declarativeNetRequest : void 0, o = typeof chrome < "u" ? chrome.runtime?.id : void 0;
    if (!r?.getSessionRules || !r?.updateSessionRules || !o)
      throw new Error("WebDAV 登录弹窗保护不可用，请在扩展中操作；未发送请求");
    const i = "^" + e.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", n = await r.getSessionRules();
    if (n.find((s) => s.id >= Z && s.id <= V && s.condition?.regexFilter === i && JSON.stringify(s.condition?.initiatorDomains) === JSON.stringify([o]) && JSON.stringify(s.condition?.resourceTypes) === JSON.stringify(["xmlhttprequest"]) && s.action?.type === "modifyHeaders" && s.action?.responseHeaders?.some((c) => c.header.toLowerCase() === "www-authenticate" && c.operation === "remove"))) return;
    const y = new Set(n.map((s) => s.id));
    let d = Z;
    for (; y.has(d) && d <= V; ) d++;
    if (d > V) throw new Error("WebDAV 登录弹窗保护规则已满；未发送请求");
    await r.updateSessionRules({ addRules: [{
      id: d,
      priority: 1,
      action: {
        type: "modifyHeaders",
        responseHeaders: [{ header: "WWW-Authenticate", operation: "remove" }]
      },
      condition: { regexFilter: i, initiatorDomains: [o], resourceTypes: ["xmlhttprequest"] }
    }] });
  });
  return X = t.catch(() => {
  }), t;
}
async function S(a, t) {
  return await ye(a), fetch(a, { ...t, credentials: "omit", redirect: "error" });
}
function me(a, t) {
  const e = a && typeof a == "object" ? a : {}, r = t && typeof t == "object" ? t : {}, o = { ...e, ...r };
  for (const s of ["logicweaver_prompt_backpack_v1", "logicweaver_prompt_backpack_categories_v1", "logicweaver_saved_articles_v1", "logicweaver_saved_article_categories_v1"])
    if (e[s] !== void 0 && r[s] !== void 0 && JSON.stringify(e[s]) !== JSON.stringify(r[s]))
      throw new Error("本机和云端背包内容不同；为避免覆盖或恢复已删除内容，未合并。请先分别导出备份。");
  delete o.youtubeFavoritesV1, delete o.youtubeFavGroupsV1, delete o.showYouTube;
  const i = Array.isArray(e.quickLinks) ? e.quickLinks : [], n = Array.isArray(r.quickLinks) ? r.quickLinks : [];
  for (const s of ["launcherFolders", "launcherPageLabels", "quickLinkGroupSizes", "launcherFolderPositionV1"]) {
    const c = (l) => l && typeof l == "object" && !Array.isArray(l) ? l : {};
    (e[s] !== void 0 || r[s] !== void 0) && (o[s] = { ...c(e[s]), ...c(r[s]) });
  }
  const u = (s) => {
    const c = s.page || "常用网站", l = o.launcherPageLabels?.[c] || c;
    return JSON.stringify([s.url, l === "默认" ? "常用网站" : l, s.group || "常用网站"]);
  }, y = /* @__PURE__ */ new Map();
  for (const s of [...i, ...n]) {
    if (!s?.url || typeof s.url != "string") continue;
    const c = u(s), l = y.get(c);
    y.set(c, l ? { ...l, ...s, id: l.id || s.id } : { ...s });
  }
  const d = /* @__PURE__ */ new Set();
  if (o.quickLinks = Array.from(y.values()).map((s) => {
    const c = String(s.id || "sync-link");
    let l = c;
    for (let m = 2; d.has(l); m++) l = `${c}-sync-${m}`;
    return d.add(l), { ...s, id: l };
  }), (e.launcherPages !== void 0 || r.launcherPages !== void 0 || o.quickLinks.length) && (o.launcherPages = Array.from(/* @__PURE__ */ new Set([
    ...Array.isArray(e.launcherPages) ? e.launcherPages : [],
    ...Array.isArray(r.launcherPages) ? r.launcherPages : [],
    ...o.quickLinks.map((s) => s.page || "常用网站"),
    ...Object.values(o.launcherFolders || {}).map((s) => s?.page || "常用网站")
  ]))), e.ghLocalStarGroupsV1 || r.ghLocalStarGroupsV1) {
    const s = typeof e.ghLocalStarGroupsV1 == "object" && e.ghLocalStarGroupsV1 && !Array.isArray(e.ghLocalStarGroupsV1) ? e.ghLocalStarGroupsV1 : {}, c = typeof r.ghLocalStarGroupsV1 == "object" && r.ghLocalStarGroupsV1 && !Array.isArray(r.ghLocalStarGroupsV1) ? r.ghLocalStarGroupsV1 : {}, l = { ...s, ...c }, m = /* @__PURE__ */ new Set([...Object.keys(s), ...Object.keys(c)]);
    for (const p of m) {
      const f = s[p], g = c[p];
      if (f && g && typeof f == "object" && typeof g == "object") {
        const b = /* @__PURE__ */ new Map(), v = Array.isArray(f.groups) ? f.groups : [], ce = Array.isArray(g.groups) ? g.groups : [];
        v.forEach((h) => {
          h?.id && b.set(h.id, { ...h });
        }), ce.forEach((h) => {
          h?.id && (b.has(h.id) ? b.set(h.id, { ...b.get(h.id), ...h }) : b.set(h.id, { ...h }));
        });
        const le = f.memberships && typeof f.memberships == "object" && !Array.isArray(f.memberships) ? f.memberships : {}, ue = g.memberships && typeof g.memberships == "object" && !Array.isArray(g.memberships) ? g.memberships : {}, _ = { ...le };
        for (const [h, z] of Object.entries(ue)) {
          const q = Array.isArray(_[h]) ? _[h] : [], pe = Array.isArray(z) ? z : [];
          q.length > 0 ? _[h] = q : _[h] = pe;
        }
        const de = Array.isArray(f.sections) ? f.sections : [], fe = Array.isArray(g.sections) ? g.sections : [], J = Array.from(/* @__PURE__ */ new Set([...de, ...fe]));
        l[p] = {
          version: 1,
          owner: f.owner || g.owner,
          groups: Array.from(b.values()),
          memberships: _,
          sections: J.length ? J : ["默认"],
          activeSection: g.activeSection || f.activeSection || "默认"
        };
      }
    }
    o.ghLocalStarGroupsV1 = l;
  }
  if (e.gh_my_repo_groups_v2 || r.gh_my_repo_groups_v2) {
    const s = Array.isArray(e.gh_my_repo_groups_v2) ? e.gh_my_repo_groups_v2 : [], c = Array.isArray(r.gh_my_repo_groups_v2) ? r.gh_my_repo_groups_v2 : [];
    o.gh_my_repo_groups_v2 = Array.from(/* @__PURE__ */ new Set([...s, ...c]));
  }
  if (e.gh_my_repo_groups_map_v2 || r.gh_my_repo_groups_map_v2) {
    const s = typeof e.gh_my_repo_groups_map_v2 == "object" && e.gh_my_repo_groups_map_v2 && !Array.isArray(e.gh_my_repo_groups_map_v2) ? e.gh_my_repo_groups_map_v2 : {}, c = typeof r.gh_my_repo_groups_map_v2 == "object" && r.gh_my_repo_groups_map_v2 && !Array.isArray(r.gh_my_repo_groups_map_v2) ? r.gh_my_repo_groups_map_v2 : {}, l = { ...s };
    for (const [m, p] of Object.entries(c)) {
      const f = Array.isArray(l[m]) ? l[m] : [], g = Array.isArray(p) ? p : [];
      l[m] = Array.from(/* @__PURE__ */ new Set([...f, ...g]));
    }
    o.gh_my_repo_groups_map_v2 = l;
  }
  return o;
}
const M = "tab-project-webdav-encrypted", W = 6e5, re = 20 * 1024 * 1024, te = new TextEncoder().encode("tab-project-webdav-encrypted:v1");
function x(a) {
  let t = "";
  for (let e = 0; e < a.length; e += 8192) t += String.fromCharCode(...a.subarray(e, e + 8192));
  return btoa(t);
}
function K(a, t) {
  if (typeof a != "string" || a.length > Math.ceil(t / 3) * 4 + 4 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(a)) throw new Error("加密备份格式无效");
  let e;
  try {
    e = atob(a);
  } catch {
    throw new Error("加密备份格式无效");
  }
  return Uint8Array.from(e, (r) => r.charCodeAt(0));
}
async function ae(a, t) {
  const e = await crypto.subtle.importKey("raw", new TextEncoder().encode(a), "PBKDF2", !1, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: t, iterations: W }, e, { name: "AES-GCM", length: 256 }, !1, ["encrypt", "decrypt"]);
}
function we(a) {
  return !!(a && typeof a == "object" && a.kind === M);
}
async function Ae(a, t) {
  if (!t || t.length < 8) throw new Error("请先设置至少 8 个字符的独立备份口令");
  const e = new TextEncoder().encode(JSON.stringify(a));
  if (e.length > re) throw new Error("备份超过 20 MB，未上传");
  const r = crypto.getRandomValues(new Uint8Array(16)), o = crypto.getRandomValues(new Uint8Array(12)), i = await ae(t, r), n = await crypto.subtle.encrypt({ name: "AES-GCM", iv: o, additionalData: te, tagLength: 128 }, i, e);
  return { kind: M, version: 1, kdf: "PBKDF2-SHA-256", iterations: W, cipher: "AES-256-GCM", salt: x(r), iv: x(o), ciphertext: x(new Uint8Array(n)) };
}
async function be(a, t) {
  if (!t) throw new Error("请先在同步设置中输入备份口令");
  const e = a;
  if (!e || e.kind !== M || e.version !== 1 || e.kdf !== "PBKDF2-SHA-256" || e.iterations !== W || e.cipher !== "AES-256-GCM") throw new Error("加密备份版本或格式不受支持");
  const r = K(e.salt, 16), o = K(e.iv, 12), i = K(e.ciphertext, re + 16);
  if (r.length !== 16 || o.length !== 12 || i.length < 16) throw new Error("加密备份格式无效");
  try {
    const n = await ae(t, r), u = await crypto.subtle.decrypt({ name: "AES-GCM", iv: o, additionalData: te, tagLength: 128 }, n, i);
    return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(u));
  } catch {
    throw new Error("备份口令错误或加密文件已损坏；未修改本地或云端数据");
  }
}
const w = "webdavBackupPassphraseV1";
function B() {
  if (typeof chrome > "u" || !chrome.storage?.local || !chrome.storage?.session) throw new Error("需要在浏览器扩展中管理备份口令");
  return { local: chrome.storage.local, session: chrome.storage.session };
}
const U = {
  async get() {
    const { local: a, session: t } = B();
    t.setAccessLevel && await t.setAccessLevel({ accessLevel: "TRUSTED_CONTEXTS" });
    const e = (await t.get(w))[w];
    if (typeof e == "string" && e.length >= 8) return e;
    const r = (await a.get(w))[w];
    return typeof r == "string" && r.length >= 8 ? r : null;
  },
  async remember(a, t) {
    if (a.length < 8) throw new Error("备份口令至少需要 8 个字符");
    const { local: e, session: r } = B();
    r.setAccessLevel && await r.setAccessLevel({ accessLevel: "TRUSTED_CONTEXTS" }), t ? (await e.set({ [w]: a }), await r.remove(w)) : (await r.set({ [w]: a }), await e.remove(w));
  },
  async forget() {
    const { local: a, session: t } = B();
    await t.remove(w), await a.remove(w);
  }
}, H = "webdavAutoBaselineV1", $ = "webdavAutoEnabledV1", ve = "webdavAutoAttemptedV1";
function A(a) {
  if (a === null || typeof a != "object") return JSON.stringify(a) ?? "null";
  if (Array.isArray(a)) return `[${a.map(A).join(",")}]`;
  const t = a;
  return `{${Object.keys(t).sort().filter((e) => t[e] !== void 0).map((e) => `${JSON.stringify(e)}:${A(t[e])}`).join(",")}}`;
}
async function oe(a) {
  const t = new TextEncoder().encode(A(a)), e = new Uint8Array(await crypto.subtle.digest("SHA-256", t));
  return Array.from(e, (r) => r.toString(16).padStart(2, "0")).join("");
}
async function se(a) {
  return oe({ url: a.url, username: a.username, filename: a.filename || "" });
}
async function E(a, t) {
  return oe({ settings: N(a).sanitized, multicaCredential: t || null });
}
async function G() {
  const a = await C(), t = await F.credentialForEncryptedBackup();
  return { settings: a, credential: t, hash: await E(a, t) };
}
function j() {
  if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("本地存储不可用");
  return chrome.storage.local;
}
async function Te(a) {
  const t = (await j().get(H))[H];
  return !t || typeof t != "object" || typeof t.etag != "string" || !t.etag || typeof t.fileUrl != "string" || !t.fileUrl || !/^[a-f0-9]{64}$/.test(t.localHash || "") || t.configHash !== await se(a) ? null : t;
}
async function ke(a, t, e, r) {
  if (!/^[a-f0-9]{64}$/.test(t) || !e || !r) throw new Error("同步基准无效");
  await j().set({ [H]: { configHash: await se(a), localHash: t, etag: e, fileUrl: r } });
}
async function je() {
  return (await j().get($))[$] === !0;
}
async function Oe(a) {
  await j().set({ [$]: a }), typeof chrome < "u" && chrome.storage?.session && await chrome.storage.session.remove(ve);
}
function Re(a, t, e, r) {
  const o = [["ghUser", "ghToken"], ["todoistToken", "todoistActiveProjectIdV1"], ["lw_private_chat_v1"], ["googleCalendarSessionTokenV1"], ["lw_webdav_config"]];
  for (const i of o)
    if (i.some((n) => a[n] !== void 0 && a[n] !== null && a[n] !== "") && A(i.map((n) => a[n] ?? null)) !== A(i.map((n) => t[n] ?? null)))
      return !0;
  return !!(e && A(e) !== A(r || null));
}
function ne(a, t) {
  if (t == null || t === "") return !1;
  if (a == null || a === "") return !0;
  if (Array.isArray(t)) {
    if (!Array.isArray(a)) return !0;
    const e = new Set(a.map(A));
    return t.some((r) => !e.has(A(r)));
  }
  if (typeof t == "object") {
    if (!a || typeof a != "object" || Array.isArray(a)) return !0;
    const e = a, r = t;
    return Object.keys(r).some((o) => ne(e[o], r[o]));
  }
  return !1;
}
function De(a, t, e) {
  const r = t !== a.localHash, o = e !== a.etag;
  return r ? o ? "conflict" : "upload" : o ? "download" : "unchanged";
}
const _e = [["ghUser", "ghToken"], ["todoistToken", "todoistActiveProjectIdV1"], ["lw_private_chat_v1"], ["googleCalendarSessionTokenV1"], ["lw_webdav_config"]];
function ie(a, t) {
  for (const e of _e)
    if (e.some((r) => a[r] !== void 0 && a[r] !== null && a[r] !== ""))
      for (const r of e)
        a[r] !== void 0 ? t[r] = a[r] : delete t[r];
  return t;
}
function Q(a, t) {
  return ie(a, me(a, t));
}
async function ee(a, t, e, r) {
  if (!e || !r) return !1;
  try {
    const o = await G(), i = await E(t.settings || {}, t.multicaCredential);
    return o.hash !== i ? !1 : (await ke(a, o.hash, e, r), !0);
  } catch {
    return !1;
  }
}
class k {
  constructor() {
  }
  static getInstance() {
    return k.instance || (k.instance = new k()), k.instance;
  }
  /**
   * 生成 Base64 Basic Auth 凭据
   */
  getAuthHeader(t) {
    const e = `${t.username}:${t.password}`;
    try {
      return `Basic ${btoa(unescape(encodeURIComponent(e)))}`;
    } catch {
      return `Basic ${btoa(e)}`;
    }
  }
  /**
   * 规范化与提取坚果云可用的目录候选列表
   * 核心原因：坚果云 WebDAV 严禁在根目录 /dav/ 直接创建文件，否则服务器必然返回 HTTP 403 Forbidden！
   */
  getCandidateUrls(t) {
    let e = (t.url || "https://dav.jianguoyun.com/dav/").trim();
    e.endsWith("/") || (e += "/");
    const r = (t.filename || "logicweaver-settings.json").trim().replace(/^\//, "");
    if (e.includes("dav.jianguoyun.com"))
      try {
        const i = new URL(e), n = decodeURIComponent(i.pathname.replace(/\/+$/, ""));
        if (n === "/dav" || n === "") {
          const u = i.origin;
          return [
            {
              dirUrl: `${u}/dav/%E6%88%91%E7%9A%84%E5%9D%9A%E6%9E%9C%E4%BA%91/`,
              fileUrl: `${u}/dav/%E6%88%91%E7%9A%84%E5%9D%9A%E6%9E%9C%E4%BA%91/${r}`
            },
            {
              dirUrl: `${u}/dav/LogicWeaver/`,
              fileUrl: `${u}/dav/LogicWeaver/${r}`
            }
          ];
        }
      } catch {
      }
    return [
      {
        dirUrl: e,
        fileUrl: e + r
      }
    ];
  }
  /**
   * 拼接最终完整的文件远程 URL（取首选候选）
   */
  getFullFileUrl(t) {
    return this.getCandidateUrls(t)[0].fileUrl;
  }
  /**
   * 确保 WebDAV 目录存在（使用 MKCOL 创建集合目录）
   */
  async ensureDirectory(t, e) {
    try {
      const r = await S(t, {
        method: "MKCOL",
        headers: { Authorization: e },
        signal: AbortSignal.timeout(6e3)
      });
      return r.status === 201 || r.status === 405 || r.ok;
    } catch {
      return !1;
    }
  }
  /**
   * 测试 WebDAV 连通性
   */
  async testConnection(t) {
    if (!t.url || !t.username || !t.password)
      return { ok: !1, message: "请完整填写 WebDAV 服务器地址、账号和应用密码" };
    const e = this.getAuthHeader(t), o = this.getCandidateUrls(t)[0].dirUrl;
    try {
      await this.ensureDirectory(o, e);
      const i = await S(o, {
        method: "PROPFIND",
        headers: {
          Authorization: e,
          Depth: "0"
        },
        signal: AbortSignal.timeout(1e4)
      });
      return i.status === 207 || i.status === 200 ? { ok: !0, message: `✓ 坚果云认证成功！同步目标目录: ${new URL(o).pathname}` } : i.status === 401 ? { ok: !1, message: "认证失败 (401): 必须在坚果云网页版【安全选项】中生成“应用专用密码”，不能用登录密码！" } : i.status === 403 ? {
        ok: !1,
        message: "坚果云返回 403: 坚果云根目录不可直接访问或本月免费流量已耗尽。请在地址后追加同步文件夹，如 /dav/我的坚果云/"
      } : i.status === 404 ? { ok: !1, message: "目录不存在 (404)，请在坚果云网页版创建对应文件夹" } : (await S(o, {
        method: "OPTIONS",
        headers: { Authorization: e },
        signal: AbortSignal.timeout(6e3)
      })).ok ? { ok: !0, message: "✓ WebDAV 服务握手成功！" } : { ok: !1, message: `服务器返回状态 HTTP ${i.status}` };
    } catch (i) {
      return { ok: !1, message: `网络连接异常: ${i?.message || "请求超时或受阻"}` };
    }
  }
  /**
   * 上传配置到 WebDAV (PUT)
   * 包含自动 MKCOL 目录创建与坚果云 403 智能回退
   */
  async upload(t, e, r = {}) {
    if (!t.url || !t.username || !t.password) return { ok: !1, error: "请先填写 WebDAV 连接设置" };
    let o = !1;
    try {
      const i = r.passphrase || await U.get();
      if (!i) return { ok: !1, errorKind: "policy", error: "请先在设置 → 同步中设置备份加密口令" };
      const n = r.preflight || await this.download(t, { passphrase: i });
      if (!n.ok && !n.notFound) return { ok: !1, error: n.error || "无法确认云端备份，未上传" };
      if (n.ok && !n.encrypted && !r.migrateLegacy) return { ok: !1, errorKind: "policy", error: "云端是旧版明文备份；请先使用「迁移旧备份并加密」，未覆盖原文件" };
      if (n.ok && O(n.data, L, { allowCredentials: n.encrypted === !0 }), n.ok && !n.etag) return { ok: !1, errorKind: "policy", error: "服务器未提供 ETag，无法安全防止并发覆盖；未上传" };
      let u;
      if (e && typeof e == "object" && e.settings && typeof e.settings == "object") {
        const { sanitized: m } = N(e.settings);
        u = { ...e, settings: m };
      } else u = await Y(N(e).sanitized);
      const y = await Ae(u, i), d = JSON.stringify(y), s = n.fileUrl ? this.getCandidateUrls(t).find((m) => m.fileUrl === n.fileUrl) : this.getCandidateUrls(t)[0];
      if (!s) return { ok: !1, error: "无法确定云端备份位置，未上传" };
      const c = this.getAuthHeader(t);
      if (await this.ensureDirectory(s.dirUrl, c), await U.get() !== i) return { ok: !1, error: "备份口令已在其他页面变更；未上传，请重新操作" };
      r.beforePut && await r.beforePut(), o = !0;
      const l = await S(s.fileUrl, { method: "PUT", headers: { Authorization: c, "Content-Type": "application/json; charset=utf-8", ...n.ok ? { "If-Match": n.etag } : { "If-None-Match": "*" } }, body: d, signal: AbortSignal.timeout(2e4) });
      return [200, 201, 204].includes(l.status) ? { ok: !0, byteLength: new TextEncoder().encode(d).length, etag: l.headers.get("etag") || void 0, fileUrl: s.fileUrl } : l.status === 412 || l.status === 409 ? { ok: !1, error: "云端备份已变化，请重新读取后再试；未覆盖" } : { ok: !1, error: `WebDAV 上传失败（HTTP ${l.status}），请检查权限和目录` };
    } catch (i) {
      return { ok: !1, error: o ? "上传结果未确认；可能已生效，请先刷新云端核对，勿重复上传" : i instanceof Error ? i.message : "加密上传失败；未提交云端" };
    }
  }
  /**
   * 从 WebDAV 下载配置 (GET)
   * 支持多候选目录智能查找
   */
  async download(t, e = {}) {
    if (!t.url || !t.username || !t.password)
      return { ok: !1, error: "请先在设置中填写坚果云 WebDAV 账号与应用密码" };
    const r = this.getAuthHeader(t), o = this.getCandidateUrls(t);
    let i = "";
    for (const n of o)
      try {
        const u = await S(n.fileUrl, {
          method: "GET",
          headers: {
            Authorization: r,
            Accept: "application/json, text/plain, */*"
          },
          signal: AbortSignal.timeout(15e3)
        });
        if (u.status === 200) {
          const y = await u.text();
          if (y.length > 30 * 1024 * 1024) return { ok: !1, error: "云端备份过大，未读取或修改本地数据" };
          let d;
          try {
            d = JSON.parse(y), typeof d == "string" && (d = JSON.parse(d));
          } catch {
            return { ok: !1, error: "云端备份格式无效，未修改本地数据" };
          }
          const s = we(d);
          if (s)
            try {
              const c = e.passphrase || await U.get();
              if (!c) return { ok: !1, error: "云端备份已加密；请先在设置 → 同步中输入备份口令" };
              d = await be(d, c);
            } catch (c) {
              return { ok: !1, error: c instanceof Error ? c.message : "无法解密云端备份，未修改数据" };
            }
          return R(d) ? { ok: !0, data: d, encrypted: s, fileUrl: n.fileUrl, etag: u.headers.get("etag") } : { ok: !1, error: "云端备份格式无效，未修改本地数据" };
        }
        if (u.status === 401)
          return { ok: !1, error: "坚果云 WebDAV 鉴权失败，请核对账号与应用密码" };
        if (u.status === 403) return { ok: !1, error: "WebDAV 返回 HTTP 403，无法确认云端备份，未修改数据" };
        if (u.status === 404) {
          i = "云端未找到备份文件，请确认是否已先在另一台电脑上执行过备份";
          continue;
        }
        return { ok: !1, error: `读取云端失败（HTTP ${u.status}），未修改数据` };
      } catch {
        return { ok: !1, error: "读取云端失败或超时，未修改数据" };
      }
    return { ok: !1, notFound: !0, error: i || "未找到可恢复的备份文件" };
  }
  /**
   * 一键将本机全部配置与常用网站清洗打包并推送到 WebDAV
   * 支持 mergeRemote: true 先拉取云端无损并集合并，再上传推送（双向安全合并上传）
   */
  async pushCurrentConfig(t, e = {}) {
    try {
      const r = await U.get();
      if (!r) return { ok: !1, errorKind: "policy", error: "请先在设置 → 同步中设置备份加密口令" };
      const o = await this.download(t, { passphrase: r });
      if (!o.ok && !o.notFound) return { ok: !1, error: o.error || "无法读取云端备份，未上传" };
      if (e.expectedRemoteEtag && (!o.ok || o.etag !== e.expectedRemoteEtag || o.fileUrl !== e.expectedRemoteUrl)) return { ok: !1, error: "云端备份已变化，请确认后再同步；未上传" };
      if (o.ok) {
        const p = O(o.data, L, { allowCredentials: o.encrypted === !0 });
        if (e.migrateLegacy && !o.encrypted) {
          const f = R(o.data.settings) ? o.data.settings : o.data, g = /* @__PURE__ */ new Set(["formatVersion", "clientDevice", "deviceId", "deviceName", "exportedAt", "backupKind", "credentialsIncluded", "changeSummary"]);
          if (Object.keys(f).some((v) => !g.has(v) && (!L.includes(v) || f[v] != null && !Object.hasOwn(p.sanitized, v)))) return { ok: !1, errorKind: "policy", error: "旧备份含未知或无法完整迁移的数据；请保留原文件并使用新文件名备份，未覆盖" };
        }
        if (!o.encrypted && !e.migrateLegacy) return { ok: !1, errorKind: "policy", error: "云端是旧版明文备份；请先使用「迁移旧备份并加密」，未覆盖原文件" };
        if (!o.etag) return { ok: !1, errorKind: "policy", error: "服务器未提供 ETag，无法安全防止并发覆盖；未上传" };
      } else if (e.migrateLegacy) return { ok: !1, error: "没有找到旧版明文备份，未上传" };
      if (e.migrateLegacy && o.encrypted) return { ok: !1, error: "云端备份已经加密，无需迁移；未上传" };
      let i = await C();
      if (o.ok && o.encrypted) {
        const p = R(o.data.settings) ? o.data.settings : o.data;
        if (ge.some((f) => Array.isArray(p[f]) && ne(i[f], p[f])))
          return { ok: !1, errorKind: "policy", error: "本机缺少云端已有的背包内容；未上传，以免覆盖提示词或文章。请先分别导出备份并核对。" };
      }
      (e.mergeRemote || e.migrateLegacy) && o.ok && (i = Q(i, o.data.settings || o.data));
      const n = await F.credentialForEncryptedBackup();
      if (e.expectedLocalHash && await E(await C(), n) !== e.expectedLocalHash) return { ok: !1, error: "本地配置已变化，请确认后再同步；未上传" };
      const u = o.encrypted ? o.data?.multicaCredential : void 0;
      if (u !== void 0 && !P(u)) return { ok: !1, error: "云端 Multica 凭证格式无效，未上传" };
      if (n && P(u) && (n.token !== u.token || n.workspaceId !== u.workspaceId)) return { ok: !1, error: "本机与云端 Multica 连接不同；为避免覆盖其他账号，已取消上传。可使用独立的备份文件名" };
      const y = await Y(i), d = { ...y, credentialsIncluded: !0, ...n || u ? { multicaCredential: n || u } : {} }, s = e.expectedLocalHash || e.beforeAutoWrite ? async () => {
        if (e.beforeAutoWrite && await e.beforeAutoWrite(), e.expectedLocalHash && (await G()).hash !== e.expectedLocalHash) throw new Error("本地配置已变化，请确认后再同步；未上传");
      } : void 0, c = await this.upload(t, d, { preflight: o, migrateLegacy: e.migrateLegacy, passphrase: r, beforePut: s });
      if (!c.ok) return { ok: !1, error: c.error || "加密上传失败", errorKind: c.errorKind };
      let l = c.etag;
      if (!l) {
        const p = await this.download(t, { passphrase: r });
        p.ok && p.encrypted && p.etag && p.fileUrl === c.fileUrl && await E(p.data.settings || {}, p.data.multicaCredential) === await E(d.settings, d.multicaCredential) && (l = p.etag);
      }
      const m = await ee(t, d, l, c.fileUrl);
      return { ok: !0, count: Object.keys(y.settings).length, byteLength: c.byteLength, etag: l, baselineRecorded: m };
    } catch (r) {
      return { ok: !1, errorKind: r instanceof D ? "policy" : "operation", error: r instanceof Error ? r.message : "加密备份失败；未确认上传" };
    }
  }
  /**
   * 一键从 WebDAV 拉取配置并对齐恢复到本地
   */
  async pullCurrentConfig(t, e = {}) {
    try {
      const r = await this.download(t);
      if (!r.ok || !r.data)
        return { ok: !1, error: r.error || "未在服务器找到对应备份文件" };
      if (!r.encrypted) return { ok: !1, errorKind: "policy", error: "云端为旧版明文备份；请先通过「迁移旧备份并加密」确认迁移，未恢复数据" };
      if (e.expectedRemoteEtag && (r.etag !== e.expectedRemoteEtag || r.fileUrl !== e.expectedRemoteUrl)) return { ok: !1, error: "云端备份已变化，请确认后再同步；未恢复数据" };
      let o = r.data;
      const i = O(o, L, { allowCredentials: !0 }), n = r.encrypted ? o.multicaCredential : void 0;
      if (n !== void 0 && !P(n)) return { ok: !1, error: "备份中的 Multica 连接格式无效，未恢复任何数据" };
      const u = await C(), y = e.merge ? Q(u, i.sanitized) : ie(u, { ...i.sanitized });
      o = { ...o, settings: y };
      const d = e.expectedLocalHash || e.beforeAutoWrite ? async () => {
        if (e.beforeAutoWrite && await e.beforeAutoWrite(), e.expectedLocalHash && (await G()).hash !== e.expectedLocalHash) throw new Error("本地配置已变化，请确认后再同步；未恢复数据");
      } : void 0, s = await he(o, { allowCredentials: !0, beforeCommit: d });
      let c;
      if (n !== void 0)
        try {
          c = await F.restoreEncryptedCredential(n);
        } catch {
          return { ok: !1, error: "普通配置已恢复，但 Multica 连接保存失败；请在工作台检查后重试连接" };
        }
      const l = await ee(t, r.data, r.etag, r.fileUrl);
      return { ok: !0, ...s, credentialResult: c, etag: r.etag || void 0, baselineRecorded: l };
    } catch (r) {
      const o = r?.message || "恢复失败";
      return {
        ok: !1,
        errorKind: r instanceof D || r?.name === "SyncBackupError" ? "policy" : "operation",
        error: r instanceof D || r?.name === "SyncBackupError" ? r.message : `恢复过程发生异常: ${o}`
      };
    }
  }
}
const Pe = k.getInstance();
export {
  ve as A,
  je as a,
  Pe as b,
  Ue as c,
  se as d,
  G as e,
  E as f,
  ke as g,
  De as h,
  Re as i,
  ne as j,
  Le as l,
  Te as r,
  Oe as s,
  Ce as t,
  U as w
};
