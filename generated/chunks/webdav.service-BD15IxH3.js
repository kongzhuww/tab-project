import { h as te, r as ve, w as Ae } from "./storage-repo-CeKQXDMh.js";
import { c as A, e as F, r as j, a as ae, p as D, S as C, b as X, i as x, B as ke, d as B, f as be } from "./sync.service-CEGuWVnD.js";
const O = ["webdavUrl", "webdavUsername", "webdavPassword", "webdavFilename"], $ = { webdavUrl: "https://dav.jianguoyun.com/dav/LogicWeaver/", webdavUsername: "", webdavPassword: "", webdavFilename: "logicweaver-settings.json" };
async function De() {
  const a = te() ? await ve([...O]) : Object.fromEntries(O.map((t) => [t, localStorage.getItem(t)]));
  return Object.fromEntries(O.map((t) => [t, typeof a[t] == "string" ? a[t] : $[t]]));
}
async function xe(a, t) {
  if (a.webdavUrl.trim()) {
    const r = new URL(a.webdavUrl.trim());
    if (!["https:", "http:"].includes(r.protocol) || r.username || r.password) throw new Error("invalid-url");
  }
  if (/[\\/]/.test(a.webdavFilename)) throw new Error("invalid-filename");
  const e = {};
  for (const r of O)
    a[r] !== t[r] && (e[r] = r === "webdavPassword" ? a[r] : a[r].trim());
  if (Object.keys(e).length)
    if (te()) await Ae(e);
    else for (const [r, o] of Object.entries(e)) localStorage.setItem(r, o);
}
function Be(a) {
  return {
    url: a.webdavUrl.trim() || $.webdavUrl,
    username: a.webdavUsername.trim(),
    password: a.webdavPassword,
    filename: a.webdavFilename.trim() || $.webdavFilename
  };
}
let Q = Promise.resolve();
const Z = 41e3, K = 41999;
function _e(a) {
  const t = Q.then(async () => {
    const e = new URL(a);
    if (!["https:", "http:"].includes(e.protocol) || e.username || e.password)
      throw new Error("WebDAV 地址无效");
    e.hash = "";
    const r = typeof chrome < "u" ? chrome.declarativeNetRequest : void 0, o = typeof chrome < "u" ? chrome.runtime?.id : void 0;
    if (!r?.getSessionRules || !r?.updateSessionRules || !o)
      throw new Error("WebDAV 登录弹窗保护不可用，请在扩展中操作；未发送请求");
    const n = "^" + e.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", i = await r.getSessionRules();
    if (i.find((s) => s.id >= Z && s.id <= K && s.condition?.regexFilter === n && JSON.stringify(s.condition?.initiatorDomains) === JSON.stringify([o]) && JSON.stringify(s.condition?.resourceTypes) === JSON.stringify(["xmlhttprequest"]) && s.action?.type === "modifyHeaders" && s.action?.responseHeaders?.some((c) => c.header.toLowerCase() === "www-authenticate" && c.operation === "remove"))) return;
    const y = new Set(i.map((s) => s.id));
    let d = Z;
    for (; y.has(d) && d <= K; ) d++;
    if (d > K) throw new Error("WebDAV 登录弹窗保护规则已满；未发送请求");
    await r.updateSessionRules({ addRules: [{
      id: d,
      priority: 1,
      action: {
        type: "modifyHeaders",
        responseHeaders: [{ header: "WWW-Authenticate", operation: "remove" }]
      },
      condition: { regexFilter: n, initiatorDomains: [o], resourceTypes: ["xmlhttprequest"] }
    }] });
  });
  return Q = t.catch(() => {
  }), t;
}
async function E(a, t) {
  return await _e(a), fetch(a, { ...t, credentials: "omit", redirect: "error" });
}
function Se(a, t) {
  const e = a && typeof a == "object" ? a : {}, r = t && typeof t == "object" ? t : {}, o = { ...e, ...r };
  for (const s of ["logicweaver_prompt_backpack_v1", "logicweaver_prompt_backpack_categories_v1", "logicweaver_saved_articles_v1", "logicweaver_saved_article_categories_v1"])
    if (e[s] !== void 0 && r[s] !== void 0 && JSON.stringify(e[s]) !== JSON.stringify(r[s]))
      throw new Error("本机和云端背包内容不同；为避免覆盖或恢复已删除内容，未合并。请先分别导出备份。");
  for (const s of ["lw-rss-channels-v1", "msFavoriteSongs", "digitalEmployeesV1"])
    if (e[s] !== void 0 && r[s] !== void 0 && JSON.stringify(e[s]) !== JSON.stringify(r[s]))
      throw new Error("本机和云端的 RSS 订阅、音乐收藏或数字员工不同，请先选择要保留的数据。");
  delete o.youtubeFavoritesV1, delete o.youtubeFavGroupsV1, delete o.showYouTube;
  const n = Array.isArray(e.quickLinks) ? e.quickLinks : [], i = Array.isArray(r.quickLinks) ? r.quickLinks : [];
  for (const s of ["launcherFolders", "launcherPageLabels", "quickLinkGroupSizes", "launcherFolderPositionV1"]) {
    const c = (l) => l && typeof l == "object" && !Array.isArray(l) ? l : {};
    (e[s] !== void 0 || r[s] !== void 0) && (o[s] = { ...c(e[s]), ...c(r[s]) });
  }
  const u = (s) => {
    const c = s.page || "常用网站", l = o.launcherPageLabels?.[c] || c;
    return JSON.stringify([s.url, l === "默认" ? "常用网站" : l, s.group || "常用网站"]);
  }, y = /* @__PURE__ */ new Map();
  for (const s of [...n, ...i]) {
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
        const w = /* @__PURE__ */ new Map(), k = Array.isArray(f.groups) ? f.groups : [], pe = Array.isArray(g.groups) ? g.groups : [];
        k.forEach((h) => {
          h?.id && w.set(h.id, { ...h });
        }), pe.forEach((h) => {
          h?.id && (w.has(h.id) ? w.set(h.id, { ...w.get(h.id), ...h }) : w.set(h.id, { ...h }));
        });
        const ge = f.memberships && typeof f.memberships == "object" && !Array.isArray(f.memberships) ? f.memberships : {}, he = g.memberships && typeof g.memberships == "object" && !Array.isArray(g.memberships) ? g.memberships : {}, S = { ...ge };
        for (const [h, z] of Object.entries(he)) {
          const q = Array.isArray(S[h]) ? S[h] : [], we = Array.isArray(z) ? z : [];
          q.length > 0 ? S[h] = q : S[h] = we;
        }
        const ye = Array.isArray(f.sections) ? f.sections : [], me = Array.isArray(g.sections) ? g.sections : [], Y = Array.from(/* @__PURE__ */ new Set([...ye, ...me]));
        l[p] = {
          version: 1,
          owner: f.owner || g.owner,
          groups: Array.from(w.values()),
          memberships: S,
          sections: Y.length ? Y : ["默认"],
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
const W = "tab-project-webdav-encrypted", J = 6e5, oe = 20 * 1024 * 1024, se = new TextEncoder().encode("tab-project-webdav-encrypted:v1");
function V(a) {
  const t = [];
  for (let e = 0; e < a.length; e += 8192) {
    const r = Math.min(e + 8192, a.length);
    let o = "";
    for (let n = e; n < r; n++) o += String.fromCharCode(a[n]);
    t.push(o);
  }
  return btoa(t.join(""));
}
function N(a, t) {
  if (typeof a != "string" || a.length > Math.ceil(t / 3) * 4 + 4 || a.length % 4 !== 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(a))
    throw new Error("加密备份格式无效");
  let e;
  try {
    e = atob(a);
  } catch {
    throw new Error("加密备份格式无效");
  }
  const r = new Uint8Array(e.length);
  for (let o = 0; o < e.length; o++) r[o] = e.charCodeAt(o);
  return r;
}
async function ne(a, t) {
  const e = await crypto.subtle.importKey("raw", new TextEncoder().encode(a), "PBKDF2", !1, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: t, iterations: J }, e, { name: "AES-GCM", length: 256 }, !1, ["encrypt", "decrypt"]);
}
function Ee(a) {
  return !!(a && typeof a == "object" && a.kind === W);
}
async function Le(a, t) {
  if (!t || t.length < 8) throw new Error("请先设置至少 8 个字符的独立备份口令");
  const e = new TextEncoder().encode(JSON.stringify(a));
  if (e.length > oe) throw new Error("备份超过 20 MB，未上传");
  const r = crypto.getRandomValues(new Uint8Array(16)), o = crypto.getRandomValues(new Uint8Array(12)), n = await ne(t, r), i = await crypto.subtle.encrypt({ name: "AES-GCM", iv: o, additionalData: se, tagLength: 128 }, n, e);
  return { kind: W, version: 1, kdf: "PBKDF2-SHA-256", iterations: J, cipher: "AES-256-GCM", salt: V(r), iv: V(o), ciphertext: V(new Uint8Array(i)) };
}
async function Ue(a, t) {
  if (!t) throw new Error("请先在同步设置中输入备份口令");
  const e = a;
  if (!e || e.kind !== W || e.version !== 1 || e.kdf !== "PBKDF2-SHA-256" || e.iterations !== J || e.cipher !== "AES-256-GCM") throw new Error("加密备份版本或格式不受支持");
  const r = N(e.salt, 16), o = N(e.iv, 12), n = N(e.ciphertext, oe + 16);
  if (r.length !== 16 || o.length !== 12 || n.length < 16) throw new Error("加密备份格式无效");
  try {
    const i = await ne(t, r), u = await crypto.subtle.decrypt({ name: "AES-GCM", iv: o, additionalData: se, tagLength: 128 }, i, n);
    return JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(u));
  } catch {
    throw new Error("备份口令错误或加密文件已损坏；未修改本地或云端数据");
  }
}
const v = "webdavBackupPassphraseV1";
function I() {
  if (typeof chrome > "u" || !chrome.storage?.local || !chrome.storage?.session) throw new Error("需要在浏览器扩展中管理备份口令");
  return { local: chrome.storage.local, session: chrome.storage.session };
}
const T = {
  async get() {
    const { local: a, session: t } = I();
    t.setAccessLevel && await t.setAccessLevel({ accessLevel: "TRUSTED_CONTEXTS" });
    const e = (await t.get(v))[v];
    if (typeof e == "string" && e.length >= 8) return e;
    const r = (await a.get(v))[v];
    return typeof r == "string" && r.length >= 8 ? r : null;
  },
  async remember(a, t) {
    if (a.length < 8) throw new Error("备份口令至少需要 8 个字符");
    const { local: e, session: r } = I();
    r.setAccessLevel && await r.setAccessLevel({ accessLevel: "TRUSTED_CONTEXTS" }), t ? (await e.set({ [v]: a }), await r.remove(v)) : (await r.set({ [v]: a }), await e.remove(v));
  },
  async forget() {
    const { local: a, session: t } = I();
    await t.remove(v), await a.remove(v);
  }
}, R = "multicaSessionV1", L = "multicaCredentialV1";
function ie() {
  if (typeof chrome > "u" || !chrome.storage?.local)
    throw new Error("需要在扩展中访问本机凭据存储");
  return chrome.storage.local;
}
function _(a) {
  const t = a;
  return !!(t && typeof t.token == "string" && t.token.trim() && typeof t.workspaceId == "string" && t.workspaceId.trim());
}
async function Ce(a) {
  const t = typeof navigator < "u" ? navigator.locks : void 0;
  return t ? await t.request("tab-project:multica-credentials", a) : await a();
}
async function ce() {
  const t = (await ie().get(L))[L];
  if (t !== void 0) return _(t) ? t : null;
  const e = chrome.storage?.session;
  if (!e) return null;
  const r = (await e.get(R))[R];
  return _(r) ? r : null;
}
async function Te(a) {
  if (!_(a)) throw new Error("加密备份中的历史连接格式无效");
  return Ce(async () => {
    const t = ie(), e = (await t.get(L))[L], r = chrome.storage?.session ? (await chrome.storage.session.get(R))[R] : void 0;
    return e !== void 0 || r !== void 0 ? "kept" : (await t.set({ [L]: { token: a.token, workspaceId: a.workspaceId } }), "restored");
  });
}
const H = "webdavAutoBaselineV1", G = "webdavAutoEnabledV1", je = "webdavAutoAttemptedV1";
async function le(a) {
  const t = new TextEncoder().encode(A(a)), e = new Uint8Array(await crypto.subtle.digest("SHA-256", t));
  return Array.from(e, (r) => r.toString(16).padStart(2, "0")).join("");
}
async function ue(a) {
  return le({ url: a.url, username: a.username, filename: a.filename || "" });
}
async function U(a, t) {
  return le({ settings: F(a).sanitized, multicaCredential: t || null });
}
async function M() {
  const a = await j(), t = await ce();
  return { settings: a, credential: t, hash: await U(a, t) };
}
function P() {
  if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("本地存储不可用");
  return chrome.storage.local;
}
async function Ke(a) {
  const t = (await P().get(H))[H];
  return !t || typeof t != "object" || typeof t.etag != "string" || !t.etag || typeof t.fileUrl != "string" || !t.fileUrl || !/^[a-f0-9]{64}$/.test(t.localHash || "") || t.configHash !== await ue(a) ? null : t;
}
async function Oe(a, t, e, r) {
  if (!/^[a-f0-9]{64}$/.test(t) || !e || !r) throw new Error("同步基准无效");
  await P().set({ [H]: { configHash: await ue(a), localHash: t, etag: e, fileUrl: r } });
}
async function Ve() {
  return (await P().get(G))[G] === !0;
}
async function Ne(a) {
  await P().set({ [G]: a }), typeof chrome < "u" && chrome.storage?.session && await chrome.storage.session.remove(je);
}
function Ie(a, t, e, r) {
  for (const o of ae)
    if (o.some((n) => a[n] !== void 0 && a[n] !== null && a[n] !== "") && A(o.map((n) => a[n] ?? null)) !== A(o.map((n) => t[n] ?? null)))
      return !0;
  return !!(e && A(e) !== A(r || null));
}
function de(a, t) {
  if (t == null || t === "") return !1;
  if (a == null || a === "") return !0;
  if (Array.isArray(t)) {
    if (!Array.isArray(a)) return !0;
    const e = new Set(a.map((r) => A(r)));
    return t.some((r) => !e.has(A(r)));
  }
  if (typeof t == "object") {
    if (!a || typeof a != "object" || Array.isArray(a)) return !0;
    const e = a, r = t;
    return Object.keys(r).some((o) => de(e[o], r[o]));
  }
  return !1;
}
function Fe(a, t, e) {
  const r = t !== a.localHash, o = e !== a.etag;
  return r ? o ? "conflict" : "upload" : o ? "download" : "unchanged";
}
function $e(a) {
  return `检测到云端备份中有本机缺少或已被修改的背包内容。${a ? `
（云端：提示词 ${a.cloudPrompts} 条、文章 ${a.cloudArticles} 篇；本机：提示词 ${a.localPrompts} 条、文章 ${a.localArticles} 篇）` : ""}

• 若你是刚重装/换机想找回云端数据，请点「取消」，再通过「用云端覆盖本地」或导出备份。
• 若你确认本机当前内容才是最新（含在本机编辑或删除的条目），点击「确定」将以本机状态上传覆盖云端。`;
}
function fe(a, t) {
  for (const e of ae)
    if (e.some((r) => a[r] !== void 0 && a[r] !== null && a[r] !== ""))
      for (const r of e)
        a[r] !== void 0 ? t[r] = a[r] : delete t[r];
  return t;
}
function ee(a, t) {
  return fe(a, Se(a, t));
}
async function re(a, t, e, r) {
  if (!e || !r) return !1;
  try {
    const o = await M(), n = await U(t.settings || {}, t.multicaCredential);
    return o.hash !== n ? !1 : (await Oe(a, o.hash, e, r), !0);
  } catch {
    return !1;
  }
}
class b {
  constructor() {
  }
  static getInstance() {
    return b.instance || (b.instance = new b()), b.instance;
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
        const n = new URL(e), i = decodeURIComponent(n.pathname.replace(/\/+$/, ""));
        if (i === "/dav" || i === "") {
          const u = n.origin;
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
      const r = await E(t, {
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
      const n = await E(o, {
        method: "PROPFIND",
        headers: {
          Authorization: e,
          Depth: "0"
        },
        signal: AbortSignal.timeout(1e4)
      });
      return n.status === 207 || n.status === 200 ? { ok: !0, message: `✓ 坚果云认证成功！同步目标目录: ${new URL(o).pathname}` } : n.status === 401 ? { ok: !1, message: "认证失败 (401): 必须在坚果云网页版【安全选项】中生成“应用专用密码”，不能用登录密码！" } : n.status === 403 ? {
        ok: !1,
        message: "坚果云返回 403: 坚果云根目录不可直接访问或本月免费流量已耗尽。请在地址后追加同步文件夹，如 /dav/我的坚果云/"
      } : n.status === 404 ? { ok: !1, message: "目录不存在 (404)，请在坚果云网页版创建对应文件夹" } : (await E(o, {
        method: "OPTIONS",
        headers: { Authorization: e },
        signal: AbortSignal.timeout(6e3)
      })).ok ? { ok: !0, message: "✓ WebDAV 服务握手成功！" } : { ok: !1, message: `服务器返回状态 HTTP ${n.status}` };
    } catch (n) {
      return { ok: !1, message: `网络连接异常: ${n?.message || "请求超时或受阻"}` };
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
      const n = r.passphrase || await T.get();
      if (!n) return { ok: !1, errorKind: "policy", error: "请先在设置 → 同步中设置备份加密口令" };
      const i = r.preflight || await this.download(t, { passphrase: n });
      if (!i.ok && !i.notFound) return { ok: !1, error: i.error || "无法确认云端备份，未上传" };
      if (i.ok && !i.encrypted && !r.migrateLegacy) return { ok: !1, errorKind: "policy", error: "云端是旧版明文备份；请先使用「迁移旧备份并加密」，未覆盖原文件" };
      if (i.ok && D(i.data, C, { allowCredentials: i.encrypted === !0 }), i.ok && !i.etag) return { ok: !1, errorKind: "policy", error: "服务器未提供 ETag，无法安全防止并发覆盖；未上传" };
      let u;
      if (e && typeof e == "object" && e.settings && typeof e.settings == "object") {
        const { sanitized: m } = F(e.settings);
        u = { ...e, settings: m };
      } else u = await X(F(e).sanitized);
      const y = await Le(u, n), d = JSON.stringify(y), s = i.fileUrl ? this.getCandidateUrls(t).find((m) => m.fileUrl === i.fileUrl) : this.getCandidateUrls(t)[0];
      if (!s) return { ok: !1, error: "无法确定云端备份位置，未上传" };
      const c = this.getAuthHeader(t);
      if (await this.ensureDirectory(s.dirUrl, c), await T.get() !== n) return { ok: !1, error: "备份口令已在其他页面变更；未上传，请重新操作" };
      r.beforePut && await r.beforePut(), o = !0;
      const l = await E(s.fileUrl, { method: "PUT", headers: { Authorization: c, "Content-Type": "application/json; charset=utf-8", ...i.ok ? { "If-Match": i.etag } : { "If-None-Match": "*" } }, body: d, signal: AbortSignal.timeout(2e4) });
      return [200, 201, 204].includes(l.status) ? { ok: !0, byteLength: new TextEncoder().encode(d).length, etag: l.headers.get("etag") || void 0, fileUrl: s.fileUrl } : l.status === 412 || l.status === 409 ? { ok: !1, error: "云端备份已变化，请重新读取后再试；未覆盖" } : { ok: !1, error: `WebDAV 上传失败（HTTP ${l.status}），请检查权限和目录` };
    } catch (n) {
      return { ok: !1, error: o ? "上传结果未确认；可能已生效，请先刷新云端核对，勿重复上传" : n instanceof Error ? n.message : "加密上传失败；未提交云端" };
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
    let n = "";
    for (const i of o)
      try {
        const u = await E(i.fileUrl, {
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
          const s = Ee(d);
          if (s)
            try {
              const c = e.passphrase || await T.get();
              if (!c) return { ok: !1, error: "云端备份已加密；请先在设置 → 同步中输入备份口令" };
              d = await Ue(d, c);
            } catch (c) {
              return { ok: !1, error: c instanceof Error ? c.message : "无法解密云端备份，未修改数据" };
            }
          return x(d) ? { ok: !0, data: d, encrypted: s, fileUrl: i.fileUrl, etag: u.headers.get("etag") } : { ok: !1, error: "云端备份格式无效，未修改本地数据" };
        }
        if (u.status === 401)
          return { ok: !1, error: "坚果云 WebDAV 鉴权失败，请核对账号与应用密码" };
        if (u.status === 403) return { ok: !1, error: "WebDAV 返回 HTTP 403，无法确认云端备份，未修改数据" };
        if (u.status === 404) {
          n = "云端未找到备份文件，请确认是否已先在另一台电脑上执行过备份";
          continue;
        }
        return { ok: !1, error: `读取云端失败（HTTP ${u.status}），未修改数据` };
      } catch {
        return { ok: !1, error: "读取云端失败或超时，未修改数据" };
      }
    return { ok: !1, notFound: !0, error: n || "未找到可恢复的备份文件" };
  }
  /**
   * 一键将本机全部配置与常用网站清洗打包并推送到 WebDAV
   * 支持 mergeRemote: true 先拉取云端无损并集合并，再上传推送（双向安全合并上传）
   */
  async pushCurrentConfig(t, e = {}) {
    try {
      const r = await T.get();
      if (!r) return { ok: !1, errorKind: "policy", error: "请先在设置 → 同步中设置备份加密口令" };
      const o = await this.download(t, { passphrase: r });
      if (!o.ok && !o.notFound) return { ok: !1, error: o.error || "无法读取云端备份，未上传" };
      if (e.expectedRemoteEtag && (!o.ok || o.etag !== e.expectedRemoteEtag || o.fileUrl !== e.expectedRemoteUrl)) return { ok: !1, error: "云端备份已变化，请确认后再同步；未上传" };
      if (o.ok) {
        const p = D(o.data, C, { allowCredentials: o.encrypted === !0 });
        if (e.migrateLegacy && !o.encrypted) {
          const f = x(o.data.settings) ? o.data.settings : o.data, g = /* @__PURE__ */ new Set(["formatVersion", "clientDevice", "deviceId", "deviceName", "exportedAt", "backupKind", "credentialsIncluded", "changeSummary"]);
          if (Object.keys(f).some((k) => !g.has(k) && (!C.includes(k) || f[k] != null && !Object.hasOwn(p.sanitized, k)))) return { ok: !1, errorKind: "policy", error: "旧备份含未知或无法完整迁移的数据；请保留原文件并使用新文件名备份，未覆盖" };
        }
        if (!o.encrypted && !e.migrateLegacy) return { ok: !1, errorKind: "policy", error: "云端是旧版明文备份；请先使用「迁移旧备份并加密」，未覆盖原文件" };
        if (!o.etag) return { ok: !1, errorKind: "policy", error: "服务器未提供 ETag，无法安全防止并发覆盖；未上传" };
      } else if (e.migrateLegacy) return { ok: !1, error: "没有找到旧版明文备份，未上传" };
      if (e.migrateLegacy && o.encrypted) return { ok: !1, error: "云端备份已经加密，无需迁移；未上传" };
      let n = await j();
      if (o.ok && o.encrypted && !e.allowBackpackOverwrite) {
        const p = x(o.data.settings) ? o.data.settings : o.data;
        if (ke.some((f) => Array.isArray(p[f]) && de(n[f], p[f]))) {
          const f = (g, w) => Array.isArray(g[w]) ? g[w].length : 0;
          return {
            ok: !1,
            errorKind: "policy",
            missingCloudBackpack: !0,
            backpackDiff: {
              localPrompts: f(n, "logicweaver_prompt_backpack_v1"),
              cloudPrompts: f(p, "logicweaver_prompt_backpack_v1"),
              localArticles: f(n, "logicweaver_saved_articles_v1"),
              cloudArticles: f(p, "logicweaver_saved_articles_v1")
            },
            error: "本机缺少云端已有的背包内容；未上传，以免覆盖提示词或文章。请先分别导出备份并核对。"
          };
        }
      }
      (e.mergeRemote || e.migrateLegacy) && o.ok && (n = ee(n, o.data.settings || o.data));
      const i = await ce();
      if (e.expectedLocalHash && await U(await j(), i) !== e.expectedLocalHash) return { ok: !1, error: "本地配置已变化，请确认后再同步；未上传" };
      const u = o.encrypted ? o.data?.multicaCredential : void 0;
      if (u !== void 0 && !_(u)) return { ok: !1, error: "云端 Multica 凭证格式无效，未上传" };
      if (i && _(u) && (i.token !== u.token || i.workspaceId !== u.workspaceId)) return { ok: !1, error: "本机与云端 Multica 连接不同；为避免覆盖其他账号，已取消上传。可使用独立的备份文件名" };
      const y = await X(n), d = { ...y, credentialsIncluded: !0, ...i || u ? { multicaCredential: i || u } : {} }, s = e.expectedLocalHash || e.beforeAutoWrite ? async () => {
        if (e.beforeAutoWrite && await e.beforeAutoWrite(), e.expectedLocalHash && (await M()).hash !== e.expectedLocalHash) throw new Error("本地配置已变化，请确认后再同步；未上传");
      } : void 0, c = await this.upload(t, d, { preflight: o, migrateLegacy: e.migrateLegacy, passphrase: r, beforePut: s });
      if (!c.ok) return { ok: !1, error: c.error || "加密上传失败", errorKind: c.errorKind };
      let l = c.etag;
      if (!l) {
        const p = await this.download(t, { passphrase: r });
        p.ok && p.encrypted && p.etag && p.fileUrl === c.fileUrl && await U(p.data.settings || {}, p.data.multicaCredential) === await U(d.settings, d.multicaCredential) && (l = p.etag);
      }
      const m = await re(t, d, l, c.fileUrl);
      return { ok: !0, count: Object.keys(y.settings).length, byteLength: c.byteLength, etag: l, baselineRecorded: m };
    } catch (r) {
      return { ok: !1, errorKind: r instanceof B ? "policy" : "operation", error: r instanceof Error ? r.message : "加密备份失败；未确认上传" };
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
      const n = D(o, C, { allowCredentials: !0 }), i = r.encrypted ? o.multicaCredential : void 0;
      if (i !== void 0 && !_(i)) return { ok: !1, error: "备份中的 Multica 连接格式无效，未恢复任何数据" };
      const u = await j(), y = e.merge ? ee(u, n.sanitized) : fe(u, { ...n.sanitized });
      o = { ...o, settings: y };
      const d = e.expectedLocalHash || e.beforeAutoWrite ? async () => {
        if (e.beforeAutoWrite && await e.beforeAutoWrite(), e.expectedLocalHash && (await M()).hash !== e.expectedLocalHash) throw new Error("本地配置已变化，请确认后再同步；未恢复数据");
      } : void 0, s = await be(o, { allowCredentials: !0, beforeCommit: d });
      let c;
      if (i !== void 0)
        try {
          c = await Te(i);
        } catch {
          return { ok: !1, error: "普通配置已恢复，但历史连接凭据保存失败" };
        }
      const l = await re(t, r.data, r.etag, r.fileUrl);
      return { ok: !0, ...s, credentialResult: c, etag: r.etag || void 0, baselineRecorded: l };
    } catch (r) {
      const o = r?.message || "恢复失败";
      return {
        ok: !1,
        errorKind: r instanceof B || r?.name === "SyncBackupError" ? "policy" : "operation",
        error: r instanceof B || r?.name === "SyncBackupError" ? r.message : `恢复过程发生异常: ${o}`
      };
    }
  }
}
const He = b.getInstance();
export {
  je as A,
  Ve as a,
  He as b,
  ue as c,
  M as d,
  Oe as e,
  Fe as f,
  Ie as g,
  de as h,
  Ne as i,
  xe as j,
  $e as k,
  De as l,
  Ke as r,
  U as s,
  Be as t,
  T as w
};
