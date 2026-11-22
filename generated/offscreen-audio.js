// src/bilibili/playback-request.ts
function playbackDeadline(parent, ms) {
  const controller = new AbortController();
  const abort = () => controller.abort(parent?.reason);
  if (parent?.aborted) abort();
  else parent?.addEventListener("abort", abort, { once: true });
  const timer = setTimeout(() => controller.abort(new DOMException("\u89C6\u9891\u52A0\u8F7D\u8D85\u65F6\uFF0C\u8BF7\u624B\u52A8\u91CD\u8BD5", "TimeoutError")), ms);
  return { signal: controller.signal, dispose() {
    clearTimeout(timer);
    parent?.removeEventListener("abort", abort);
    controller.abort();
  } };
}

// src/services/bilibili.service.ts
function extractReplyEmotes(content) {
  const emotes = {};
  if (content?.emote && typeof content.emote === "object") {
    for (const [key, val] of Object.entries(content.emote)) {
      const u = val?.url || val?.gif_url;
      if (typeof u === "string" && u) {
        emotes[key] = u.replace(/^http:/i, "https:");
      }
    }
  }
  return emotes;
}
function extractReplyMentions(content) {
  const mentions = {};
  if (content?.at_name_to_mid && typeof content.at_name_to_mid === "object") {
    for (const [name, mid] of Object.entries(content.at_name_to_mid)) {
      const cleanName = String(name || "").trim();
      const cleanMid = mid !== void 0 && mid !== null ? String(mid).trim() : "";
      if (cleanName && /^\d+$/.test(cleanMid)) {
        mentions[cleanName] = cleanMid;
      }
    }
  }
  if (Array.isArray(content?.members)) {
    for (const m of content.members) {
      const cleanName = String(m?.uname || "").trim();
      const cleanMid = m?.mid !== void 0 && m?.mid !== null ? String(m.mid).trim() : "";
      if (cleanName && /^\d+$/.test(cleanMid) && !mentions[cleanName]) {
        mentions[cleanName] = cleanMid;
      }
    }
  }
  return mentions;
}
function parseBiliCommentPictures(pictures) {
  if (!Array.isArray(pictures)) return [];
  return pictures.flatMap((picture) => {
    const source = typeof picture === "string" ? picture : picture?.img_src;
    if (typeof source !== "string" || !source.trim()) return [];
    try {
      const url = new URL(source.trim().replace(/^http:/i, "https:").replace(/^\/\//, "https://"));
      return url.protocol === "https:" && !url.username && !url.password ? [url.href] : [];
    } catch {
      return [];
    }
  });
}
function biliMd5(inputStr) {
  function L(x, c2) {
    return x << c2 | x >>> 32 - c2;
  }
  const S = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
  const K = new Array(64).fill(0).map((_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32));
  const bytes = new TextEncoder().encode(inputStr);
  const bitLen = bytes.length * 8;
  const padded = new Uint8Array((Math.floor((bytes.length + 8) / 64) + 1) * 64);
  padded.set(bytes);
  padded[bytes.length] = 128;
  const dv = new DataView(padded.buffer);
  dv.setUint32(padded.length - 8, bitLen >>> 0, true);
  dv.setUint32(padded.length - 4, Math.floor(bitLen / 4294967296), true);
  let a = 1732584193, b = 4023233417, c = 2562383102, d = 271733878;
  for (let i = 0; i < padded.length; i += 64) {
    const M = new Array(16);
    for (let j = 0; j < 16; j++) M[j] = dv.getUint32(i + j * 4, true);
    let A = a, B = b, C = c, D = d;
    for (let j = 0; j < 64; j++) {
      let F, g;
      if (j < 16) {
        F = B & C | ~B & D;
        g = j;
      } else if (j < 32) {
        F = D & B | ~D & C;
        g = (5 * j + 1) % 16;
      } else if (j < 48) {
        F = B ^ C ^ D;
        g = (3 * j + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = 7 * j % 16;
      }
      const tmp = F + A + K[j] + M[g] >>> 0;
      A = D;
      D = C;
      C = B;
      B = B + L(tmp, S[j]) >>> 0;
    }
    a = a + A >>> 0;
    b = b + B >>> 0;
    c = c + C >>> 0;
    d = d + D >>> 0;
  }
  function le(x) {
    let s = "";
    for (let i = 0; i < 4; i++) s += (x >>> i * 8 & 255).toString(16).padStart(2, "0");
    return s;
  }
  return le(a) + le(b) + le(c) + le(d);
}
var WBI_MIXIN_TAB = [
  46,
  47,
  18,
  2,
  53,
  8,
  23,
  32,
  15,
  50,
  10,
  31,
  58,
  3,
  45,
  35,
  27,
  43,
  5,
  49,
  33,
  9,
  42,
  19,
  29,
  28,
  14,
  39,
  12,
  38,
  41,
  13,
  37,
  48,
  7,
  16,
  24,
  55,
  40,
  61,
  26,
  17,
  0,
  1,
  60,
  51,
  30,
  4,
  22,
  25,
  54,
  21,
  56,
  59,
  6,
  63,
  57,
  62,
  11,
  36,
  20,
  34,
  44,
  52
];
function calculateWbiSign(params, ik, sk) {
  const mk = WBI_MIXIN_TAB.map((i) => (ik + sk)[i]).join("").slice(0, 32);
  const wts = Math.round(Date.now() / 1e3);
  const p = { ...params, wts };
  const sortedKeys = Object.keys(p).sort();
  const q = sortedKeys.map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(String(p[k]).replace(/[!'()*]/g, ""))).join("&");
  const w_rid = biliMd5(q + mk);
  return {
    signedQuery: `${q}&w_rid=${w_rid}`,
    w_rid,
    wts
  };
}
var BilibiliFavoritesTreeManager = class _BilibiliFavoritesTreeManager {
  static instance;
  constructor() {
  }
  static getInstance() {
    if (!_BilibiliFavoritesTreeManager.instance) {
      _BilibiliFavoritesTreeManager.instance = new _BilibiliFavoritesTreeManager();
    }
    return _BilibiliFavoritesTreeManager.instance;
  }
  async loadTree() {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const stored = await chrome.storage.local.get("foTree");
        if (stored?.foTree?.children) return stored.foTree;
      } catch {
      }
    }
    if (typeof localStorage !== "undefined") {
      try {
        const str = localStorage.getItem("foTree");
        if (str) {
          const parsed = JSON.parse(str);
          if (parsed?.children) return parsed;
        }
      } catch {
      }
    }
    return { id: "root", type: "folder", children: [] };
  }
  async saveTree(tree) {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        await chrome.storage.local.set({ foTree: tree });
      } catch {
      }
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("foTree", JSON.stringify(tree));
      } catch {
      }
    }
  }
  async loadCollapsedGroups() {
    let list = [];
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const stored = await chrome.storage.local.get("foCollapsedGroupsV1");
        if (Array.isArray(stored?.foCollapsedGroupsV1)) list = stored.foCollapsedGroupsV1.map(String);
      } catch {
      }
    }
    if (!list.length && typeof localStorage !== "undefined") {
      try {
        const str = localStorage.getItem("foCollapsedGroupsV1");
        if (str) {
          const parsed = JSON.parse(str);
          if (Array.isArray(parsed)) list = parsed.map(String);
        }
      } catch {
      }
    }
    return new Set(list);
  }
  async saveCollapsedGroups(groups) {
    const list = Array.from(groups);
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        await chrome.storage.local.set({ foCollapsedGroupsV1: list });
      } catch {
      }
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("foCollapsedGroupsV1", JSON.stringify(list));
      } catch {
      }
    }
  }
  findNode(node, id) {
    if (!node) return null;
    if (String(node.id) === String(id)) return node;
    for (const c of node.children || []) {
      const r = this.findNode(c, id);
      if (r) return r;
    }
    return null;
  }
  findParent(node, id) {
    if (!node) return null;
    for (const c of node.children || []) {
      if (String(c.id) === String(id)) return node;
      const r = this.findParent(c, id);
      if (r) return r;
    }
    return null;
  }
  removeNodeById(node, id) {
    if (!node?.children) return false;
    const i = node.children.findIndex((c) => String(c.id) === String(id));
    if (i >= 0) {
      node.children.splice(i, 1);
      return true;
    }
    for (const c of node.children) {
      if (this.removeNodeById(c, id)) return true;
    }
    return false;
  }
  isDescendant(node, ancestorId) {
    if (!node) return false;
    if (String(node.id) === String(ancestorId)) return true;
    for (const c of node.children || []) {
      if (this.isDescendant(c, ancestorId)) return true;
    }
    return false;
  }
  createGroupNode(name) {
    return {
      id: "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      type: "folder",
      name,
      children: []
    };
  }
  unwrapGroup(tree, id) {
    const parent = this.findParent(tree, id) || tree;
    const index = (parent.children || []).findIndex((node) => String(node.id) === String(id));
    if (index < 0) return false;
    const folder = parent.children[index];
    parent.children.splice(index, 1, ...folder.children || []);
    return true;
  }
  moveNode(tree, sourceId, targetId, mode, fallbackFavName) {
    let source = this.findNode(tree, sourceId);
    if (!source) {
      source = { id: String(sourceId), type: "fav", name: fallbackFavName || "\u6536\u85CF\u5939", children: [] };
    }
    const target = String(targetId) === "root" ? tree : this.findNode(tree, targetId);
    if (!source || !target || source === target || source.type === "folder" && this.isDescendant(source, target.id)) {
      return false;
    }
    this.removeNodeById(tree, source.id);
    if (target === tree || mode === "into" && target.type === "folder") {
      if (!Array.isArray(target.children)) target.children = [];
      target.children.push(source);
    } else {
      const parent = this.findParent(tree, target.id) || tree;
      if (!Array.isArray(parent.children)) parent.children = [];
      const index = Math.max(0, parent.children.findIndex((node) => String(node.id) === String(target.id)));
      parent.children.splice(index + (mode === "after" ? 1 : 0), 0, source);
    }
    return true;
  }
  syncTreeWithFolders(tree, createdFolders) {
    let changed = false;
    const remoteIdMap = /* @__PURE__ */ new Map();
    for (const f of createdFolders) {
      remoteIdMap.set(String(f.id || f.fid), f);
    }
    const cleanup = (node) => {
      if (!node.children) return;
      for (let i = node.children.length - 1; i >= 0; i--) {
        const child = node.children[i];
        if (child.type === "fav") {
          if (!remoteIdMap.has(String(child.id))) {
            node.children.splice(i, 1);
            changed = true;
          } else {
            const remote = remoteIdMap.get(String(child.id));
            if (remote?.title && child.name !== remote.title) {
              child.name = remote.title;
              changed = true;
            }
          }
        } else {
          cleanup(child);
        }
      }
    };
    cleanup(tree);
    const treeFavIds = /* @__PURE__ */ new Set();
    const collectFavIds = (node) => {
      for (const child of node.children || []) {
        if (child.type === "fav") treeFavIds.add(String(child.id));
        else collectFavIds(child);
      }
    };
    collectFavIds(tree);
    if (!tree.children) tree.children = [];
    for (const f of createdFolders) {
      const id = String(f.id || f.fid);
      if (!treeFavIds.has(id)) {
        tree.children.push({
          id,
          type: "fav",
          name: f.title || "\u672A\u547D\u540D\u6536\u85CF\u5939",
          children: []
        });
        changed = true;
      }
    }
    return changed;
  }
  flattenTree(tree, allFolders, collapsedGroups, activeFolderId) {
    const foldersById = new Map((allFolders || []).map((f) => [String(f.id || f.fid), f]));
    const flattened = [];
    const treeFavIds = /* @__PURE__ */ new Set();
    const countTreeFavorites = (node) => (node.children || []).reduce(
      (acc, c) => acc + (c.type === "fav" ? 1 : countTreeFavorites(c)),
      0
    );
    const appendTree = (node, depth = 0) => {
      for (const child of node.children || []) {
        const childId = String(child.id);
        const folder = foldersById.get(childId);
        const isGroup = child.type === "folder";
        if (!isGroup) treeFavIds.add(childId);
        const isCollapsed = isGroup && collapsedGroups.has(childId);
        const isSelected = !isGroup && childId === String(activeFolderId);
        flattened.push({
          id: childId,
          title: String(child.name || folder?.title || "\u672A\u547D\u540D\u6536\u85CF\u5939"),
          count: Number(isGroup ? countTreeFavorites(child) : folder?.media_count || 0),
          kind: folder?.isCollected ? "collected" : folder?.isOther ? "other" : "created",
          depth,
          group: isGroup,
          collapsed: isCollapsed,
          selected: isSelected,
          writable: !isGroup && !folder?.isCollected && !folder?.isOther
        });
        if (isGroup && !isCollapsed) {
          appendTree(child, depth + 1);
        }
      }
    };
    appendTree(tree, 0);
    for (const f of allFolders || []) {
      const fId = String(f.id || f.fid);
      if (flattened.some((item) => !item.group && item.id === fId)) continue;
      if (!f.isCollected && !f.isOther && treeFavIds.has(fId)) continue;
      flattened.push({
        id: fId,
        title: f.title || "\u672A\u547D\u540D\u6536\u85CF",
        count: Number(f.media_count || 0),
        kind: f.isCollected ? "collected" : f.isOther ? "other" : "created",
        depth: 0,
        group: false,
        collapsed: false,
        selected: fId === String(activeFolderId),
        writable: !f.isCollected && !f.isOther
      });
    }
    return flattened;
  }
};
var BilibiliService = class _BilibiliService {
  static instance;
  currentUser = null;
  writeQueue = Promise.resolve();
  lastWriteTime = 0;
  wbiKeysCache = null;
  treeManager = BilibiliFavoritesTreeManager.getInstance();
  constructor() {
  }
  static getInstance() {
    if (!_BilibiliService.instance) {
      _BilibiliService.instance = new _BilibiliService();
    }
    return _BilibiliService.instance;
  }
  /**
   * 底层 B站 API 请求器 (携带凭据与跨域支持)
   */
  async api(url, init = {}) {
    const res = await fetch(url, {
      ...init,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...init.headers || {}
      }
    });
    if (!res.ok) {
      throw Object.assign(new Error(`Bilibili API \u8BF7\u6C42\u5931\u8D25 [${res.status}]: ${res.statusText}`), { status: res.status });
    }
    const json = await res.json();
    if (json.code !== 0 && json.code !== void 0) {
      throw Object.assign(new Error(json.message || json.msg || `Bilibili \u63A5\u53E3\u8FD4\u56DE\u9519\u8BEF\u7801 ${json.code}`), { code: json.code });
    }
    return json.data !== void 0 ? json.data : json;
  }
  /**
   * 从 Chrome Cookies 或 document.cookie 中提取 bili_jct (CSRF)
   */
  async getBiliJct() {
    if (typeof chrome !== "undefined" && chrome.cookies?.get) {
      try {
        for (const u of ["https://bilibili.com", "https://www.bilibili.com", "https://api.bilibili.com"]) {
          const c = await chrome.cookies.get({ url: u, name: "bili_jct" });
          if (c?.value) return c.value;
        }
      } catch {
      }
    }
    if (typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|;\s*)bili_jct=([^;]+)/);
      if (match) return decodeURIComponent(match[1]);
    }
    return "";
  }
  /**
   * 写入限频队列 (默认 650ms 保护间隔)
   */
  async enqueueWrite(taskFn, minInterval = 650) {
    const next = async () => {
      const elapsed = Date.now() - this.lastWriteTime;
      if (elapsed < minInterval) {
        await new Promise((r) => setTimeout(r, minInterval - elapsed));
      }
      try {
        const res = await taskFn();
        this.lastWriteTime = Date.now();
        return res;
      } catch (err) {
        this.lastWriteTime = Date.now();
        throw err;
      }
    };
    const resPromise = this.writeQueue.then(next, next);
    this.writeQueue = resPromise.catch(() => {
    });
    return resPromise;
  }
  formatBiliApiError(code, message) {
    if (code === 11007 || code === -412) return "\u64CD\u4F5C\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u5019\u518D\u8BD5";
    if (code === -101) return "\u8D26\u53F7\u672A\u767B\u5F55\u6216\u767B\u5F55\u6001\u5DF2\u5931\u6548";
    if (code === 11002) return "\u89C6\u9891\u5DF2\u5B58\u5728\u4E8E\u76EE\u6807\u6536\u85CF\u5939";
    if (code === 11003) return "\u6536\u85CF\u5939\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5220\u9664";
    return message || `B\u7AD9\u63A5\u53E3\u8FD4\u56DE\u9519\u8BEF\u7801 ${code}`;
  }
  /**
   * 获取当前登录用户信息
   */
  async getUserNav() {
    const data = await this.api("https://api.bilibili.com/x/web-interface/nav");
    this.currentUser = {
      isLogin: Boolean(data?.isLogin),
      mid: Number(data?.mid || 0),
      uname: String(data?.uname || ""),
      face: String(data?.face || ""),
      level: Number(data?.level_info?.current_level || 0)
    };
    return this.currentUser;
  }
  getCachedUser() {
    return this.currentUser;
  }
  /**
   * 获取用户创建的所有收藏夹
   */
  async getCreatedFolders(upMid) {
    let mid = upMid;
    if (!mid) {
      if (!this.currentUser) await this.getUserNav();
      mid = this.currentUser?.mid;
    }
    if (!mid) throw new Error("\u65E0\u6CD5\u83B7\u53D6 B \u7AD9\u7528\u6237 MID\uFF0C\u8BF7\u5148\u767B\u5F55");
    const data = await this.api(
      `https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${mid}&type=0`
    );
    return data?.list || [];
  }
  /**
   * 获取用户订阅/收藏的公开收藏夹及合集
   */
  async getCollectedFolders(pn = 1, ps = 50, upMid) {
    let mid = upMid;
    if (!mid) {
      if (!this.currentUser) await this.getUserNav();
      mid = this.currentUser?.mid;
    }
    const data = await this.api(
      `https://api.bilibili.com/x/v3/fav/folder/collected/list?pn=${pn}&ps=${ps}&up_mid=${mid || ""}&platform=web`
    );
    const rawCollected = data?.list || [];
    const list = rawCollected.map((c) => ({
      id: c.id,
      fid: c.fid || c.id,
      title: c.title,
      media_count: Number(c.media_count || 0),
      cover: (c.cover || "").replace(/^http:/, "https:"),
      upper: c.upper || { name: c.owner?.name || "UP\u4E3B", mid: c.mid },
      isCollected: true,
      isSeason: c.type === 21 || Boolean(c.season),
      type: c.type
    }));
    return {
      count: Number(data?.count || list.length),
      list
    };
  }
  /**
   * 获取系统虚拟收藏夹 (稍后再看、我的追番、播放历史)
   */
  getOtherFolders() {
    return [
      {
        id: "__history__",
        fid: "__history__",
        title: "\u64AD\u653E\u5386\u53F2",
        media_count: 0,
        icon: "\u{1F4DC}",
        isOther: true,
        otherType: "history"
      },
      {
        id: "__toview__",
        fid: "__toview__",
        title: "\u7A0D\u540E\u518D\u770B",
        media_count: 0,
        icon: "\u23F1\uFE0F",
        isOther: true,
        otherType: "toview"
      },
      {
        id: "__bangumi__",
        fid: "__bangumi__",
        title: "\u6211\u7684\u8FFD\u756A",
        media_count: 0,
        icon: "\u{1F3AC}",
        isOther: true,
        otherType: "bangumi"
      }
    ];
  }
  /**
   * 读取用户最近观看的历史记录
   */
  async getWatchHistory(pn = 1, ps = 24) {
    const data = await this.api(`https://api.bilibili.com/x/v2/history?pn=${pn}&ps=${ps}`);
    const rawList = Array.isArray(data) ? data : data?.list || [];
    const medias = rawList.map((item) => ({
      id: item.aid || item.history?.oid || item.id,
      type: 2,
      title: item.title || item.tag_name || "\u89C6\u9891\u8BB0\u5F55",
      cover: (item.pic || "").replace(/^http:/, "https:"),
      duration: item.duration || 0,
      upper: item.owner ? { mid: item.owner.mid, name: item.owner.name, face: item.owner.face } : item.author ? { mid: item.mid || 0, name: item.author, face: "" } : void 0,
      cnt_info: {
        play: item.stat?.view || 0,
        danmaku: item.stat?.danmaku || 0,
        collect: item.stat?.favorite || 0
      },
      bvid: item.bvid || item.history?.bvid || "",
      fav_time: item.view_at || item.progress
    }));
    return { medias, total: Number(data?.total || medias.length) };
  }
  /**
   * 读取稍后再看列表
   */
  async getToViewVideos() {
    const data = await this.api("https://api.bilibili.com/x/v2/history/toview");
    const rawList = data?.list || [];
    const medias = rawList.map((item) => ({
      id: item.aid || item.id,
      type: 2,
      title: item.title,
      cover: (item.pic || "").replace(/^http:/, "https:"),
      duration: item.duration || 0,
      upper: item.owner ? { mid: item.owner.mid, name: item.owner.name, face: item.owner.face } : void 0,
      cnt_info: {
        play: item.stat?.view || 0,
        danmaku: item.stat?.danmaku || 0,
        collect: item.stat?.favorite || 0
      },
      bvid: item.bvid,
      fav_time: item.add_at || item.progress
    }));
    return { medias, total: Number(data?.count || medias.length) };
  }
  /**
   * 读取我的追番列表
   */
  async getBangumiFollows(pn = 1, ps = 24, upMid) {
    let targetMid = upMid;
    if (!targetMid) {
      if (!this.currentUser) await this.getUserNav();
      targetMid = this.currentUser?.mid;
    }
    const data = await this.api(
      `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=${pn}&ps=${ps}&vmid=${targetMid || ""}`
    );
    const rawList = data?.list || [];
    const medias = rawList.map((item) => ({
      id: item.season_id,
      type: 21,
      title: item.title,
      cover: (item.cover || "").replace(/^http:/, "https:"),
      duration: 0,
      upper: { mid: 0, name: item.season_type_name || "\u756A\u5267", face: "" },
      cnt_info: {
        play: item.stat?.view || 0,
        danmaku: item.stat?.danmaku || 0,
        collect: item.stat?.follow || 0
      },
      link: item.url,
      bvid: item.new_ep?.bvid || "",
      intro: item.evaluate
    }));
    return { medias, total: Number(data?.total || medias.length) };
  }
  /**
   * 读取合集/系列视频
   */
  async getSeasonVideos(seasonId, pn = 1, ps = 24) {
    const data = await this.api(
      `https://api.bilibili.com/x/space/fav/season/list?season_id=${seasonId}&pn=${pn}&ps=${ps}&platform=web`
    );
    const rawList = data?.medias || [];
    return {
      medias: rawList,
      total: Number(data?.info?.media_count || rawList.length)
    };
  }
  /**
   * 统一分页获取视频资源列表 (自动适配自建/合集/稍后再看/追番)
   */
  async getFolderVideos(mediaId, pn = 1, ps = 20, order = "mtime", keyword = "") {
    const idStr = String(mediaId);
    if (idStr === "__history__") {
      const res = await this.getWatchHistory(pn, ps);
      let list = res.medias;
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        list = list.filter((v) => v.title.toLowerCase().includes(q) || v.upper?.name && v.upper.name.toLowerCase().includes(q));
      }
      return {
        info: { title: "\u64AD\u653E\u5386\u53F2", media_count: res.total },
        medias: list,
        hasMore: pn * ps < res.total,
        total: res.total
      };
    }
    if (idStr === "__toview__") {
      const res = await this.getToViewVideos();
      let list = res.medias;
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        list = list.filter((v) => v.title.toLowerCase().includes(q) || v.upper?.name && v.upper.name.toLowerCase().includes(q));
      }
      return {
        info: { title: "\u7A0D\u540E\u518D\u770B", media_count: res.total },
        medias: list.slice((pn - 1) * ps, pn * ps),
        hasMore: pn * ps < list.length,
        total: list.length
      };
    }
    if (idStr === "__bangumi__") {
      const res = await this.getBangumiFollows(pn, ps);
      return {
        info: { title: "\u6211\u7684\u8FFD\u756A", media_count: res.total },
        medias: res.medias,
        hasMore: pn * ps < res.total,
        total: res.total
      };
    }
    if (idStr.startsWith("season:")) {
      const seasonId = idStr.replace("season:", "");
      const res = await this.getSeasonVideos(seasonId, pn, ps);
      return {
        info: { title: "\u5408\u96C6\u5185\u5BB9", media_count: res.total },
        medias: res.medias,
        hasMore: pn * ps < res.total,
        total: res.total
      };
    }
    let url = `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${mediaId}&pn=${pn}&ps=${ps}&order=${order}&platform=web`;
    if (keyword.trim()) {
      url += `&keyword=${encodeURIComponent(keyword.trim())}`;
    }
    const data = await this.api(url);
    const medias = data?.medias || [];
    const hasMore = Boolean(data?.has_more);
    const total = Number(data?.info?.media_count || medias.length);
    return {
      info: data?.info,
      medias,
      hasMore,
      total
    };
  }
  /**
   * 在 B站 创建新的收藏夹
   */
  async createRemoteFolder(title, privacy = 0) {
    const csrf = await this.getBiliJct();
    if (!csrf) return { ok: false, reason: "\u6CA1\u6709\u53D6\u5F97 B\u7AD9 CSRF \u767B\u5F55\u51ED\u636E\uFF0C\u8BF7\u5148\u91CD\u65B0\u767B\u5F55 B\u7AD9" };
    try {
      const body = new URLSearchParams({ title, intro: "", privacy: String(privacy === 0 ? 0 : 1), csrf });
      const response = await fetch("https://api.bilibili.com/x/v3/fav/folder/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: body.toString()
      });
      const payload = await response.json().catch(() => ({}));
      if (payload?.code === 0 && payload.data) return { ok: true, folder: payload.data };
      return { ok: false, reason: payload?.message || `B\u7AD9\u63A5\u53E3 ${payload?.code ?? response.status}` };
    } catch (error) {
      return { ok: false, reason: error?.message || "\u521B\u5EFA B\u7AD9\u6536\u85CF\u5939\u5931\u8D25" };
    }
  }
  /**
   * 移动视频至其他收藏夹 (单项或批量)
   */
  async moveVideo(srcId, tarId, aid, mid) {
    return this.enqueueWrite(async () => {
      const csrf = await this.getBiliJct();
      if (!csrf) return { ok: false, reason: "\u53D6\u4E0D\u5230 csrf\uFF08bili_jct\uFF09" };
      try {
        const resStr = Array.isArray(aid) ? aid.map((id) => String(id).includes(":") ? String(id) : `${id}:2`).join(",") : String(aid).includes(":") ? String(aid) : `${aid}:2`;
        const body = new URLSearchParams({
          src_media_id: String(srcId),
          tar_media_id: String(tarId),
          mid: String(mid || this.currentUser?.mid || ""),
          resources: resStr,
          platform: "web",
          csrf
        });
        const r = await fetch("https://api.bilibili.com/x/v3/fav/resource/move", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: body.toString()
        });
        const j = await r.json();
        if (j.code === 0) return { ok: true };
        return { ok: false, code: j.code, reason: this.formatBiliApiError(j.code, j.message) };
      } catch (e) {
        return { ok: false, reason: e.message || "\u79FB\u52A8\u89C6\u9891\u5931\u8D25" };
      }
    });
  }
  /**
   * 从收藏夹删除视频 (取消收藏)
   */
  async deleteVideo(fid, aid, maxRetries = 2) {
    return this.enqueueWrite(async () => {
      let attempt = 0;
      while (true) {
        attempt++;
        const csrf = await this.getBiliJct();
        if (!csrf) return { ok: false, reason: "\u53D6\u4E0D\u5230 csrf\uFF08bili_jct\uFF09" };
        try {
          const body = new URLSearchParams({
            csrf,
            rid: String(aid),
            type: "2",
            add_media_ids: "",
            del_media_ids: String(fid),
            platform: "web"
          });
          const r = await fetch("https://api.bilibili.com/x/v3/fav/resource/deal", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json"
            },
            body: body.toString()
          });
          const j = await r.json();
          if (j.code === 0) return { ok: true };
          const isFreq = j.code === 11007 || j.code === -412 || /频繁|稍后|频率/.test(j.message || "");
          if (isFreq && attempt <= maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 850 * attempt));
            continue;
          }
          return { ok: false, code: j.code, reason: this.formatBiliApiError(j.code, j.message) };
        } catch (e) {
          if (attempt <= maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 600));
            continue;
          }
          return { ok: false, reason: e.message };
        }
      }
    });
  }
  /**
   * 添加视频到收藏夹
   */
  async addVideoToFavorite(tarId, aid) {
    return this.enqueueWrite(async () => {
      const csrf = await this.getBiliJct();
      if (!csrf) return { ok: false, reason: "\u53D6\u4E0D\u5230 csrf\uFF08bili_jct\uFF09" };
      try {
        const body = new URLSearchParams({
          rid: String(aid),
          type: "2",
          add_media_ids: String(tarId),
          del_media_ids: "",
          platform: "web",
          csrf
        });
        const r = await fetch("https://api.bilibili.com/x/v3/fav/resource/deal", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: body.toString()
        });
        const j = await r.json();
        if (j.code === 0) return { ok: true };
        return { ok: false, code: j.code, reason: this.formatBiliApiError(j.code, j.message) };
      } catch (e) {
        return { ok: false, reason: e.message };
      }
    });
  }
  /**
   * 获取视频详情与分P信息
   */
  async getVideoView(bvid, signal) {
    return this.api(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`, { signal });
  }
  /**
   * 获取视频播放流与音频流地址
   */
  async getPlayUrl(bvid, cid) {
    return this.api(
      `https://api.bilibili.com/x/player/wbi/playurl?bvid=${encodeURIComponent(bvid)}&cid=${cid}&qn=64&fnval=1`
    );
  }
  /**
   * 获取视频外挂字幕或 AI 智能字幕列表
   */
  async getVideoSubtitles(bvid, cid) {
    const data = await this.api(
      `https://api.bilibili.com/x/player/v2?bvid=${encodeURIComponent(bvid)}&cid=${cid}`
    );
    return data?.subtitle?.subtitles || [];
  }
  /**
   * 获取并缓存 Wbi 签名密钥
   */
  async getWbiKeys(signal) {
    signal?.throwIfAborted();
    const now = Date.now();
    if (this.wbiKeysCache && this.wbiKeysCache.expire > now) {
      return { ik: this.wbiKeysCache.ik, sk: this.wbiKeysCache.sk };
    }
    const nav = await this.api("https://api.bilibili.com/x/web-interface/nav", { signal });
    signal?.throwIfAborted();
    const ik = nav?.wbi_img?.img_url?.split("/").pop()?.split(".")[0] || "";
    const sk = nav?.wbi_img?.sub_url?.split("/").pop()?.split(".")[0] || "";
    if (!ik || !sk) {
      throw new Error("\u65E0\u6CD5\u83B7\u53D6 B \u7AD9 WBI \u9274\u6743\u5BC6\u94A5");
    }
    this.wbiKeysCache = { ik, sk, expire: now + 3600 * 1e3 };
    return { ik, sk };
  }
  /**
   * 获取指定清晰度的视频/音频直链播放流 (支持逐级清晰度自动降阶重试与 WBI 签名直链备用获取)
   */
  async fetchPlayStream(bvid, cid, preferredQn = 64, parentSignal) {
    const deadline = playbackDeadline(parentSignal, 18e3);
    const signal = deadline.signal;
    const request = async (url) => {
      for (let round = 0; round < 2; round++) {
        signal.throwIfAborted();
        const attempt = playbackDeadline(signal, 6e3);
        try {
          return await this.api(url, { signal: attempt.signal });
        } catch (error) {
          signal.throwIfAborted();
          const transient = error?.name === "TimeoutError" || error instanceof TypeError;
          if (!transient || round === 1) {
            if ([-352, -403, -101, -111].includes(error?.code) || [403, 412].includes(error?.status)) {
              this.wbiKeysCache = null;
            }
            throw error;
          }
        } finally {
          attempt.dispose();
        }
      }
    };
    const shouldStop = (error) => {
      signal.throwIfAborted();
      if ([401, 403, 412, 429].includes(error?.status) || [-101, -111, -352, -412].includes(error?.code)) {
        this.wbiKeysCache = null;
        throw error;
      }
      if (error?.name === "AbortError") throw error;
    };
    try {
      signal.throwIfAborted();
      const qnQueue = Array.from(/* @__PURE__ */ new Set([preferredQn, 64, 32, 16]));
      let lastData = null;
      let validSources = [];
      let resolvedQuality = preferredQn;
      const extractSources = (data) => {
        if (!data) return [];
        const durl = Array.isArray(data.durl) ? data.durl : Array.isArray(data.result?.durl) ? data.result.durl : [];
        const urls = [];
        for (const item of durl.slice(0, 1)) {
          if (item?.url) urls.push(String(item.url));
          if (Array.isArray(item?.backup_url)) {
            for (const b of item.backup_url) {
              if (b) urls.push(String(b));
            }
          }
        }
        return Array.from(new Set(urls.filter(Boolean).map((u) => u.replace(/^http:/, "https:")))).filter((u) => {
          try {
            const url = new URL(u);
            return url.protocol === "https:" && !url.username && !url.password;
          } catch {
            return false;
          }
        });
      };
      for (const qn of qnQueue) {
        try {
          const idParam = bvid ? `bvid=${encodeURIComponent(bvid)}` : "";
          const play = await request(
            `https://api.bilibili.com/x/player/playurl?${idParam}&cid=${cid}&qn=${qn}&fnval=1&fourk=0&platform=html5&high_quality=1`
          );
          const sources = extractSources(play);
          if (sources.length > 0) {
            lastData = play;
            validSources = sources;
            resolvedQuality = Number(play?.quality || qn);
            break;
          }
        } catch (error) {
          shouldStop(error);
        }
      }
      if (!validSources.length) {
        for (const qn of Array.from(/* @__PURE__ */ new Set([preferredQn, 64, 32]))) {
          try {
            const signing = playbackDeadline(signal, 5e3);
            let keys;
            try {
              keys = await this.getWbiKeys(signing.signal);
            } finally {
              signing.dispose();
            }
            const { ik, sk } = keys;
            const params = { cid, qn, fnval: 1, fourk: 0 };
            if (bvid) params.bvid = bvid;
            const { signedQuery } = calculateWbiSign(params, ik, sk);
            const wbiPlay = await request(
              `https://api.bilibili.com/x/player/wbi/playurl?${signedQuery}`
            );
            const sources = extractSources(wbiPlay);
            if (sources.length > 0) {
              lastData = wbiPlay;
              validSources = sources;
              resolvedQuality = Number(wbiPlay?.quality || qn);
              break;
            }
          } catch (error) {
            shouldStop(error);
          }
        }
      }
      if (!validSources.length) {
        throw new Error("\u672A\u80FD\u83B7\u53D6\u5230\u6709\u6548\u89C6\u9891\u76F4\u94FE\u64AD\u653E\u6D41");
      }
      return {
        sources: validSources,
        quality: resolvedQuality,
        acceptQuality: lastData?.accept_quality || [80, 64, 32, 16],
        acceptDescription: lastData?.accept_description || ["1080P \u9AD8\u6E05", "720P \u9AD8\u6E05", "480P \u6E05\u6670", "360P \u6D41\u7545"]
      };
    } finally {
      deadline.dispose();
    }
  }
  /**
   * 获取音频流：优先提取 DASH 纯音频流 (M4A，体积仅 ~3MB，彻底消除视频冗余与限速)，若无纯音频则降级至 360P 流畅视频流 (极小体积保底)
   */
  async fetchAudioStream(bvid, cid, parentSignal) {
    const deadline = playbackDeadline(parentSignal, 18e3);
    const signal = deadline.signal;
    const request = async (url) => {
      for (let round = 0; round < 2; round++) {
        signal.throwIfAborted();
        const attempt = playbackDeadline(signal, 6e3);
        try {
          return await this.api(url, { signal: attempt.signal });
        } catch (error) {
          signal.throwIfAborted();
          const transient = error?.name === "TimeoutError" || error instanceof TypeError;
          if (!transient || round === 1) {
            if ([-352, -403, -101, -111].includes(error?.code) || [403, 412].includes(error?.status)) {
              this.wbiKeysCache = null;
            }
            throw error;
          }
        } finally {
          attempt.dispose();
        }
      }
    };
    const shouldStop = (error) => {
      signal.throwIfAborted();
      if ([401, 403, 412, 429].includes(error?.status) || [-101, -111, -352, -412].includes(error?.code)) {
        this.wbiKeysCache = null;
        throw error;
      }
      if (error?.name === "AbortError") throw error;
    };
    const extractDashAudio = (data) => {
      const dash = data?.dash || data?.result?.dash;
      const audioList = Array.isArray(dash?.audio) ? dash.audio : [];
      if (!audioList.length) return [];
      const sorted = [...audioList].sort((a, b) => Number(b?.id || 0) - Number(a?.id || 0));
      const urls = [];
      for (const item of sorted) {
        if (item?.baseUrl) urls.push(String(item.baseUrl));
        if (item?.base_url) urls.push(String(item.base_url));
        if (Array.isArray(item?.backupUrl)) {
          for (const b of item.backupUrl) if (b) urls.push(String(b));
        }
        if (Array.isArray(item?.backup_url)) {
          for (const b of item.backup_url) if (b) urls.push(String(b));
        }
      }
      return Array.from(new Set(urls.filter(Boolean).map((u) => u.replace(/^http:/, "https:")))).filter((u) => {
        try {
          const url = new URL(u);
          return url.protocol === "https:" && !url.username && !url.password;
        } catch {
          return false;
        }
      });
    };
    try {
      signal.throwIfAborted();
      try {
        const idParam = bvid ? `bvid=${encodeURIComponent(bvid)}` : "";
        const play = await request(
          `https://api.bilibili.com/x/player/playurl?${idParam}&cid=${cid}&qn=16&fnval=16&fourk=0&platform=html5`
        );
        const dashSources = extractDashAudio(play);
        if (dashSources.length > 0) {
          return { sources: dashSources, isPureAudio: true };
        }
      } catch (error) {
        shouldStop(error);
      }
      try {
        const signing = playbackDeadline(signal, 5e3);
        let keys;
        try {
          keys = await this.getWbiKeys(signing.signal);
        } finally {
          signing.dispose();
        }
        const { ik, sk } = keys;
        const params = { cid, qn: 16, fnval: 16, fourk: 0 };
        if (bvid) params.bvid = bvid;
        const { signedQuery } = calculateWbiSign(params, ik, sk);
        const wbiPlay = await request(`https://api.bilibili.com/x/player/wbi/playurl?${signedQuery}`);
        const dashSources = extractDashAudio(wbiPlay);
        if (dashSources.length > 0) {
          return { sources: dashSources, isPureAudio: true };
        }
      } catch (error) {
        shouldStop(error);
      }
      const stream = await this.fetchPlayStream(bvid, cid, 16, signal);
      return { sources: stream.sources, isPureAudio: false };
    } finally {
      deadline.dispose();
    }
  }
  /**
   * 现代化多源视频流与分P信息自洽解析
   */
  async resolvePlayStream(video, preferredPage = 1, parentSignal) {
    if (video.cachedSourceUrl) {
      return {
        title: video.title || video.bvid || "\u672C\u5730\u7F13\u5B58\u89C6\u9891",
        poster: video.cover || "",
        sources: [video.cachedSourceUrl],
        aid: video.aid || null,
        bvid: video.bvid || "",
        cid: null,
        cached: true,
        owner: video.owner || video.author || "UP\u4E3B",
        ownerFace: video.ownerFace || video.face || "",
        ownerMid: null,
        pubdate: 0,
        desc: video.desc || "\u672C\u5730\u7F13\u5B58\u89C6\u9891",
        views: video.views || 0,
        danmaku: video.danmaku || 0,
        likes: video.likes || 0,
        currentQuality: 0,
        acceptQuality: [],
        acceptDescription: [],
        pages: [],
        currentPage: 1,
        partTitle: ""
      };
    }
    const rawBvid = String(video.bvid || "").trim();
    const rawAid = String(video.aid || "").trim();
    const cleanBvid = rawBvid.startsWith("BV") ? rawBvid : "";
    const cleanAid = rawAid.replace(/^av/i, "") || (!rawBvid.startsWith("BV") ? rawBvid.replace(/^av/i, "") : "");
    const queryParam = cleanBvid ? `bvid=${encodeURIComponent(cleanBvid)}` : `aid=${encodeURIComponent(cleanAid)}`;
    const deadline = playbackDeadline(parentSignal, 2e4);
    const signal = deadline.signal;
    try {
      signal.throwIfAborted();
      const early = video.cid && cleanBvid && preferredPage === 1 ? this.fetchPlayStream(cleanBvid, video.cid, Number(video.preferredQuality || 64), signal).then((value) => ({ value, error: null }), (error) => ({ value: null, error })) : null;
      let data = null;
      try {
        const details = playbackDeadline(signal, 6e3);
        try {
          data = await this.api(`https://api.bilibili.com/x/web-interface/view?${queryParam}`, { signal: details.signal });
        } finally {
          details.dispose();
        }
      } catch {
        signal.throwIfAborted();
      }
      const resolvedBvid = data?.bvid || "";
      const bvid = resolvedBvid.startsWith("BV") ? resolvedBvid : cleanBvid || "";
      const rawPages = Array.isArray(data?.pages) ? data.pages : [];
      const pages = rawPages.map((p) => ({
        cid: p.cid,
        page: p.page,
        part: p.part || `\u7B2C${p.page}\u96C6`,
        duration: p.duration || 0
      }));
      const targetPageIdx = pages.findIndex((p) => p.page === preferredPage);
      const activePageObj = targetPageIdx >= 0 ? pages[targetPageIdx] : pages[0] || null;
      const activeCid = activePageObj?.cid || data?.cid || video.cid;
      if (!activeCid) {
        throw new Error("\u65E0\u6CD5\u83B7\u53D6\u89C6\u9891 CID \u6807\u8BC6");
      }
      const initialQn = Number(video.preferredQuality || 64);
      const earlyResult = early && String(activeCid) === String(video.cid) ? await early : null;
      signal.throwIfAborted();
      const streamInfo = earlyResult && String(activeCid) === String(video.cid) ? earlyResult.value || (() => {
        throw earlyResult.error;
      })() : await this.fetchPlayStream(bvid, activeCid, initialQn, signal);
      return {
        title: data?.title || video.title || bvid,
        poster: String(data?.pic || video.cover || "").replace(/^http:/, "https:"),
        sources: streamInfo.sources,
        aid: data?.aid || video.aid || null,
        bvid,
        cid: activeCid || null,
        owner: data?.owner?.name || video.owner || video.author || "UP\u4E3B",
        ownerFace: data?.owner?.face ? String(data.owner.face).replace(/^http:/, "https:") : video.ownerFace || video.face || "",
        ownerMid: data?.owner?.mid || null,
        pubdate: data?.pubdate || 0,
        desc: data?.desc || video.desc || "\u6682\u65E0\u7B80\u4ECB",
        views: data?.stat?.view || video.views || 0,
        danmaku: data?.stat?.danmaku || video.danmaku || 0,
        likes: data?.stat?.like || video.likes || 0,
        currentQuality: streamInfo.quality,
        acceptQuality: streamInfo.acceptQuality,
        acceptDescription: streamInfo.acceptDescription,
        pages,
        currentPage: activePageObj?.page || 1,
        partTitle: activePageObj?.part || ""
      };
    } finally {
      deadline.dispose();
    }
  }
  /**
   * 纯数据拉取并深度解析视频字幕轨道 (支持 WBI 签名鉴权与多语言挑选)
   */
  async fetchVideoSubtitleDetails(bvid, targetCid, signal) {
    signal?.throwIfAborted();
    const view = await this.api(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`, { signal });
    signal?.throwIfAborted();
    if (signal && !view?.cid) throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u89C6\u9891\u8BE6\u60C5\uFF0C\u8BF7\u91CD\u8BD5");
    if (!view?.cid) return { ok: false, reason: "\u89C6\u9891\u4E0D\u5B58\u5728\u6216\u672A\u767B\u5F55", cues: [] };
    const rawPages = Array.isArray(view?.pages) ? view.pages : [];
    const activePageObj = targetCid ? rawPages.find((p) => p.cid === targetCid) : null;
    const cid = targetCid || view.cid;
    const partTitle = activePageObj?.part ? ` \xB7 P${activePageObj.page} ${activePageObj.part}` : "";
    const { ik, sk } = await this.getWbiKeys(signal);
    signal?.throwIfAborted();
    const { signedQuery } = calculateWbiSign({ bvid, cid }, ik, sk);
    const pj = await this.api(`https://api.bilibili.com/x/player/wbi/v2?${signedQuery}`, { signal });
    signal?.throwIfAborted();
    if (signal && !Array.isArray(pj?.subtitle?.subtitles)) throw new Error("\u5B57\u5E55\u8F68\u9053\u8FD4\u56DE\u5F02\u5E38\u6216\u5F53\u524D\u8D26\u53F7\u65E0\u6743\u8BFB\u53D6");
    const subs = pj?.subtitle?.subtitles || [];
    if (!subs.length) {
      return { ok: false, reason: `\u8BE5\u89C6\u9891${partTitle ? "\uFF08" + partTitle.trim() + "\uFF09" : ""}\u6CA1\u6709\u53EF\u7528\u5B57\u5E55`, cues: [] };
    }
    const pick = subs.find((s) => /zh|中文|汉语|漢語/i.test((s.lan || "") + " " + (s.lan_doc || ""))) || subs[0];
    const rawUrl = pick.subtitle_url || "";
    const subUrl = rawUrl.startsWith("//") ? `https:${rawUrl}` : rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
    const subR = await fetch(subUrl, { signal, credentials: "include", headers: { Accept: "application/json" } });
    if (!subR.ok) throw new Error(`\u5B57\u5E55\u83B7\u53D6\u5931\u8D25: ${subR.status}`);
    const subBuf = await subR.arrayBuffer();
    signal?.throwIfAborted();
    let subJ;
    try {
      subJ = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(subBuf));
    } catch {
      try {
        subJ = JSON.parse(new TextDecoder("gb18030").decode(subBuf));
      } catch {
        subJ = JSON.parse(new TextDecoder("big5").decode(subBuf));
      }
    }
    if (signal && !Array.isArray(subJ?.body)) throw new Error("\u5B57\u5E55\u6B63\u6587\u683C\u5F0F\u5F02\u5E38");
    const body = subJ?.body || [];
    const cues = body.map((item, idx) => ({
      id: `${item.from || 0}_${idx}`,
      from: Number(item.from || 0),
      to: Number(item.to || item.from || 0),
      content: String(item.content || "").trim()
    })).filter((c) => c.content);
    const fullTitle = (view.title || bvid) + partTitle;
    const meta = [];
    meta.push("\u6807\u9898\uFF1A" + fullTitle);
    meta.push("\u5B57\u5E55\u8F68\u9053\uFF1A" + subs.map((s) => s.lan_doc || s.lan || "\u672A\u77E5").join(" / ") + "\uFF08\u5DF2\u9009\uFF1A" + (pick.lan_doc || pick.lan || "\u9ED8\u8BA4") + "\uFF09");
    if (view.owner?.name) meta.push("UP\u4E3B\uFF1A" + view.owner.name);
    if (view.pubdate) {
      const d = new Date(view.pubdate * 1e3);
      meta.push(`\u53D1\u5E03\u65F6\u95F4\uFF1A${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    }
    meta.push("\u94FE\u63A5\uFF1Ahttps://www.bilibili.com/video/" + bvid + (activePageObj?.page ? `?p=${activePageObj.page}` : ""));
    const bodyText = cues.map((c) => c.content).join("\r\n");
    const headText = meta.join("\r\n") + "\r\n\r\n\u2014\u2014\u2014\u2014 \u5B57\u5E55\u6B63\u6587 \u2014\u2014\u2014\u2014\r\n\r\n";
    return {
      ok: true,
      title: fullTitle,
      bodyText,
      headText,
      lineCount: cues.length,
      cues,
      aid: view.aid,
      desc: view.desc || "",
      viewPoints: Array.isArray(pj?.view_points) ? pj.view_points : []
    };
  }
  /**
   * 拉取并解析 B站 JSON 格式字幕流为标准化 Cue 列表
   */
  async fetchSubtitleCues(subtitleUrl) {
    if (!subtitleUrl) return [];
    const targetUrl = subtitleUrl.startsWith("//") ? `https:${subtitleUrl}` : subtitleUrl;
    const res = await fetch(targetUrl);
    if (!res.ok) throw new Error(`\u5B57\u5E55\u83B7\u53D6\u5931\u8D25: ${res.statusText}`);
    const json = await res.json();
    const body = json.body || [];
    return body.map((item) => ({
      from: Number(item.from || 0),
      to: Number(item.to || 0),
      content: String(item.content || "").trim()
    }));
  }
  /**
   * 分页获取视频评论区列表
   */
  async getVideoComments(aid, pn = 1, ps = 20, sort = 2) {
    const data = await this.api(
      `https://api.bilibili.com/x/v2/reply?type=1&oid=${aid}&pn=${pn}&ps=${ps}&sort=${sort}`
    );
    const repliesRaw = data?.replies || [];
    const topObj = data?.top || data?.upper?.top || null;
    const pageObj = data?.page || {};
    const total = Number(pageObj.count || 0);
    const parseComment = (r, isTop = false) => {
      const emotes = extractReplyEmotes(r.content);
      const mentions = extractReplyMentions(r.content);
      const subReplies = Array.isArray(r.replies) ? r.replies.map((sub) => ({
        rpid: sub.rpid,
        mid: Number(sub.mid || 0),
        uname: String(sub.member?.uname || "B\u7AD9\u7528\u6237"),
        avatar: String(sub.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(sub.content?.message || ""),
        timeText: new Date(Number(sub.ctime || 0) * 1e3).toLocaleString(),
        like: Number(sub.like || 0),
        pictures: parseBiliCommentPictures(sub.content?.pictures),
        emotes: extractReplyEmotes(sub.content),
        mentions: extractReplyMentions(sub.content)
      })) : [];
      return {
        rpid: r.rpid,
        mid: Number(r.mid || 0),
        uname: String(r.member?.uname || "\u533F\u540D\u7528\u6237"),
        avatar: String(r.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(r.content?.message || ""),
        timeText: new Date(Number(r.ctime || 0) * 1e3).toLocaleString(),
        like: Number(r.like || 0),
        rcount: Number(r.rcount || 0),
        isTop,
        pictures: parseBiliCommentPictures(r.content?.pictures),
        emotes,
        mentions,
        replies: subReplies
      };
    };
    const comments = [];
    if (pn === 1 && topObj && typeof topObj === "object" && topObj.rpid) {
      comments.push(parseComment(topObj, true));
    }
    const topRpid = topObj?.rpid ? String(topObj.rpid) : "";
    for (const r of repliesRaw) {
      if (topRpid && String(r.rpid) === topRpid) continue;
      comments.push(parseComment(r, false));
    }
    return {
      comments,
      total,
      hasMore: pn * ps < total
    };
  }
  /**
   * 分页获取某条根评论下的子回复（楼中楼）
   */
  async getSubReplies(aid, rootRpid, pn = 1, ps = 10) {
    const data = await this.api(
      `https://api.bilibili.com/x/v2/reply/reply?type=1&oid=${aid}&root=${rootRpid}&pn=${pn}&ps=${ps}`
    );
    const repliesRaw = data?.replies || [];
    const pageObj = data?.page || {};
    const total = Number(pageObj.count || 0);
    const replies = repliesRaw.map((r) => ({
      rpid: r.rpid,
      mid: Number(r.mid || 0),
      uname: String(r.member?.uname || "B\u7AD9\u7528\u6237"),
      avatar: String(r.member?.avatar || "").replace(/^http:/, "https:"),
      message: String(r.content?.message || ""),
      timeText: new Date(Number(r.ctime || 0) * 1e3).toLocaleString(),
      like: Number(r.like || 0),
      pictures: parseBiliCommentPictures(r.content?.pictures),
      emotes: extractReplyEmotes(r.content),
      mentions: extractReplyMentions(r.content)
    }));
    return {
      replies,
      total,
      hasMore: pn * ps < total
    };
  }
  /**
   * 获取视频全量弹幕 XML 并解析为结构化列表
   */
  async getVideoDanmaku(cid) {
    if (!cid) return [];
    try {
      const urls = [
        `https://comment.bilibili.com/${cid}.xml`,
        `https://api.bilibili.com/x/v1/dm/list.so?oid=${cid}`
      ];
      let xmlText = "";
      for (const url of urls) {
        try {
          const resp = await fetch(url);
          if (resp.ok) {
            xmlText = await resp.text();
            if (xmlText && xmlText.includes("<d p=")) break;
          }
        } catch (_) {
        }
      }
      if (!xmlText) return [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlText, "text/xml");
      const dNodes = doc.querySelectorAll("d");
      const list = [];
      dNodes.forEach((node, idx) => {
        const p = node.getAttribute("p") || "";
        const parts = p.split(",");
        const time = parseFloat(parts[0]) || 0;
        const mode = parseInt(parts[1], 10) || 1;
        const size = parseInt(parts[2], 10) || 25;
        const rawColor = parseInt(parts[3], 10) || 16777215;
        const color = `#${rawColor.toString(16).padStart(6, "0")}`;
        const timestamp = parseInt(parts[4], 10) || 0;
        const pool = parseInt(parts[5], 10) || 0;
        const userHash = parts[6] || "";
        const id = parts[7] || String(idx);
        const text = node.textContent?.trim() || "";
        if (text) {
          const m = Math.floor(time / 60);
          const s = Math.floor(time % 60);
          const timeStr = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
          list.push({
            id,
            time,
            timeStr,
            mode,
            size,
            color,
            timestamp,
            pool,
            userHash,
            text
          });
        }
      });
      list.sort((a, b) => a.time - b.time);
      return list;
    } catch (err) {
      console.warn("[BiliService] \u5F39\u5E55\u89E3\u6790\u5931\u8D25:", err);
      return [];
    }
  }
  /**
   * 格式化毫秒或秒为 mm:ss
   */
  formatDuration(seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }
};
var bilibiliService = BilibiliService.getInstance();
var bilibiliFavoritesManager = BilibiliFavoritesTreeManager.getInstance();

// src/music/official-api.ts
var ORIGIN = "https://music.163.com";
async function requestOfficialNetease(endpoint, params = {}, signal) {
  signal?.throwIfAborted();
  let path;
  let values;
  switch (endpoint) {
    case "/login/status":
    case "/user/account":
      path = "/api/nuser/account/get";
      values = {};
      break;
    case "/user/detail":
      path = `/api/v1/user/detail/${encodeURIComponent(String(params.uid))}`;
      values = {};
      break;
    case "/user/playlist":
      path = "/api/user/playlist";
      values = { uid: params.uid, limit: params.limit ?? 100, offset: 0 };
      break;
    case "/playlist/detail":
    case "/playlist/track/all":
      path = "/api/playlist/detail";
      values = { id: params.id, n: 1e3, s: 0 };
      break;
    case "/likelist":
      path = "/api/song/like/get";
      values = { uid: params.uid };
      break;
    case "/cloudsearch":
    case "/search":
      path = "/api/search/get/web";
      values = { s: params.keywords, type: 1, limit: params.limit ?? 60, offset: 0 };
      break;
    case "/lyric":
      path = "/api/song/lyric";
      values = { id: params.id, lv: -1, kv: -1, tv: -1 };
      break;
    case "/song/url":
    case "/song/url/v1":
      path = "/api/song/enhance/player/url";
      values = { ids: JSON.stringify([params.id]), br: 32e4 };
      break;
    default:
      throw new Error("\u6B64\u529F\u80FD\u6682\u672A\u63A5\u5165\u5B98\u7F51\u4F1A\u8BDD\uFF0C\u4E0D\u4F1A\u56DE\u9000\u5230\u7B2C\u4E09\u65B9\u97F3\u4E50\u8282\u70B9\u3002");
  }
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value !== void 0 && value !== null) body.set(key, String(value));
  }
  let response;
  try {
    const url = new URL(ORIGIN + path);
    url.search = body.toString();
    response = await fetch(url, {
      method: "GET",
      credentials: "include",
      redirect: "error",
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(15e3)]) : AbortSignal.timeout(15e3)
    });
  } catch {
    signal?.throwIfAborted();
    throw new Error("\u7F51\u6613\u4E91\u5B98\u7F51\u8BF7\u6C42\u5931\u8D25\u6216\u8D85\u65F6\uFF0C\u8BF7\u786E\u8BA4\u5B98\u7F51\u53EF\u4EE5\u8BBF\u95EE\uFF0C\u5E76\u68C0\u67E5\u6269\u5C55\u7684\u7F51\u7AD9\u8BBF\u95EE\u6743\u9650\u3002");
  }
  if (!response.ok) throw new Error(`\u7F51\u6613\u4E91\u5B98\u7F51\u8FD4\u56DE HTTP ${response.status}\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002`);
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("\u7F51\u6613\u4E91\u5B98\u7F51\u672A\u8FD4\u56DE\u6709\u6548\u6570\u636E\uFF0C\u8BF7\u5728\u5B98\u7F51\u786E\u8BA4\u767B\u5F55\u72B6\u6001\u3002");
  }
  signal?.throwIfAborted();
  if (!data || typeof data !== "object") throw new Error("\u7F51\u6613\u4E91\u5B98\u7F51\u54CD\u5E94\u683C\u5F0F\u65E0\u6548\u3002");
  if (Number(data.code) === 301 || Number(data.code) === 401) {
    throw new Error("\u5B98\u7F51\u4F1A\u8BDD\u672A\u767B\u5F55\u6216\u5DF2\u5931\u6548\uFF0C\u8BF7\u5148\u5728\u540C\u4E00\u6D4F\u89C8\u5668\u7684\u7F51\u6613\u4E91\u5B98\u7F51\u767B\u5F55\u3002");
  }
  if (data.code !== void 0 && Number(data.code) !== 200) {
    throw new Error(`\u7F51\u6613\u4E91\u5B98\u7F51\u672A\u63A5\u53D7\u8BF7\u6C42\uFF08\u72B6\u6001 ${Number(data.code) || "\u672A\u77E5"}\uFF09\uFF0C\u53EF\u80FD\u9700\u8981\u91CD\u65B0\u767B\u5F55\u6216\u9047\u5230\u63A5\u53E3\u9650\u5236\u3002`);
  }
  if ((endpoint === "/playlist/detail" || endpoint === "/playlist/track/all") && !data.playlist && data.result) {
    data.playlist = data.result;
  }
  if (endpoint === "/playlist/track/all") {
    const tracks = data.playlist?.tracks || [];
    const offset = Number(params.offset) || 0;
    return { ...data, songs: tracks.slice(offset, offset + (Number(params.limit) || 500)) };
  }
  return data;
}

// src/services/netease.service.ts
var NETEASE_COOKIE_KEY = "neteaseCookie";
var NETEASE_USER_KEY = "neteaseUserInfo";
var NETEASE_LIKES_KEY = "neteaseLikedSongIds";
var NETEASE_RECENT_KEY = "neteaseRecentPlayedSongs";
var NeteaseService = class _NeteaseService {
  static instance;
  user = null;
  likedSongIds = /* @__PURE__ */ new Set();
  recentSongs = [];
  playlistCache = /* @__PURE__ */ new Map();
  pendingRequests = /* @__PURE__ */ new Map();
  storageReady;
  constructor() {
    this.storageReady = this.initStorage();
  }
  whenReady() {
    return this.storageReady;
  }
  static getInstance() {
    if (!_NeteaseService.instance) {
      _NeteaseService.instance = new _NeteaseService();
    }
    return _NeteaseService.instance;
  }
  async initStorage() {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const res = await chrome.storage.local.get([
          NETEASE_USER_KEY,
          NETEASE_LIKES_KEY,
          NETEASE_RECENT_KEY
        ]);
        if (res[NETEASE_USER_KEY]) this.user = res[NETEASE_USER_KEY];
        if (Array.isArray(res[NETEASE_LIKES_KEY])) {
          this.likedSongIds = new Set(res[NETEASE_LIKES_KEY]);
        }
        if (Array.isArray(res[NETEASE_RECENT_KEY])) {
          this.recentSongs = res[NETEASE_RECENT_KEY];
        }
      } catch (err) {
        console.warn("[NeteaseService] Init storage error:", err);
      }
    }
    if (!this.recentSongs.length && typeof localStorage !== "undefined") {
      try {
        const raw = localStorage.getItem(NETEASE_RECENT_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length) {
            this.recentSongs = parsed;
          }
        }
      } catch {
      }
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
    }
  }
  // ==========================================================================
  // HTTP 底层通用请求封装 (带时间戳、Cookie、超时防抖)
  // ==========================================================================
  async request(endpoint, params = {}, signal) {
    return requestOfficialNetease(endpoint, params, signal);
  }
  // ==========================================================================
  // 用户鉴权与状态
  // ==========================================================================
  getUser() {
    return this.user;
  }
  async connectWebsiteAccount() {
    await this.whenReady();
    const data = await requestOfficialNetease("/user/account");
    const profile = data.profile || data.data?.profile;
    const uid = profile?.userId;
    if (!uid || typeof profile?.nickname !== "string") {
      throw new Error("\u672A\u8BFB\u5230\u5B98\u7F51\u8D26\u6237\uFF0C\u8BF7\u5148\u5728\u540C\u4E00\u6D4F\u89C8\u5668\u3001\u540C\u4E00\u8D44\u6599\u7684\u7F51\u6613\u4E91\u5B98\u7F51\u767B\u5F55\uFF0C\u518D\u70B9\u51FB\u8FDE\u63A5\uFF1B\u65E0\u75D5\u7A97\u53E3\u7684\u767B\u5F55\u4E0D\u4F1A\u81EA\u52A8\u5171\u7528\u3002");
    }
    const user = {
      uid,
      nickname: profile.nickname,
      avatarUrl: profile.avatarUrl || "",
      vipType: Number(profile.vipType) || 0,
      isVip: Number(profile.vipType) > 0,
      loggedIn: true
    };
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.set({ [NETEASE_USER_KEY]: user });
    }
    this.user = user;
    this.playlistCache.clear();
    this.likedSongIds.clear();
    if (typeof localStorage !== "undefined") localStorage.removeItem("netease_explicit_logout");
    window.dispatchEvent(new Event("netease:account-updated"));
    return user;
  }
  async fetchUserProfile() {
    try {
      let uid = null;
      let nickname = "\u7F51\u6613\u4E91\u7528\u6237";
      let avatarUrl = "";
      let vipType = 0;
      try {
        const statusRes = await this.request("/login/status");
        const profile = statusRes?.data?.profile || statusRes?.profile;
        const account = statusRes?.data?.account || statusRes?.account;
        uid = profile?.userId || profile?.id || account?.id || account?.userId || null;
        nickname = profile?.nickname || account?.userName || "\u7F51\u6613\u4E91\u7528\u6237";
        avatarUrl = profile?.avatarUrl || "";
        vipType = profile?.vipType || account?.vipType || 0;
      } catch (e1) {
        console.warn("[NeteaseService] /login/status warning:", e1);
      }
      if (!uid) {
        try {
          const accRes = await this.request("/user/account");
          const profile = accRes?.profile;
          const account = accRes?.account;
          uid = profile?.userId || profile?.id || account?.id || account?.userId || null;
          if (profile?.nickname) nickname = profile.nickname;
          if (profile?.avatarUrl) avatarUrl = profile.avatarUrl;
          if (profile?.vipType || account?.vipType) vipType = profile?.vipType || account?.vipType || 0;
        } catch (e2) {
          console.warn("[NeteaseService] /user/account warning:", e2);
        }
      }
      if (uid && (!avatarUrl || nickname === "\u7F51\u6613\u4E91\u7528\u6237")) {
        try {
          const detailRes = await this.request("/user/detail", { uid });
          if (detailRes?.profile) {
            nickname = detailRes.profile.nickname || nickname;
            avatarUrl = detailRes.profile.avatarUrl || avatarUrl;
            vipType = detailRes.profile.vipType || vipType;
          }
        } catch {
        }
      }
      if (uid) {
        this.user = {
          uid,
          nickname,
          avatarUrl,
          vipType,
          isVip: Number(vipType) > 0,
          loggedIn: true
        };
        if (typeof chrome !== "undefined" && chrome.storage?.local) {
          await chrome.storage.local.set({ [NETEASE_USER_KEY]: this.user });
        }
        await this.fetchLikedSongs();
        return this.user;
      }
    } catch (e) {
      console.warn("[NeteaseService] fetchUserProfile failed:", e);
    }
    return null;
  }
  // ==========================================================================
  // Cookie 自动嗅探与应用登录
  // ==========================================================================
  async logout() {
    this.user = null;
    this.playlistCache.clear();
    this.pendingRequests.clear();
    this.likedSongIds.clear();
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.remove([NETEASE_COOKIE_KEY, NETEASE_USER_KEY, NETEASE_LIKES_KEY]);
    }
    window.dispatchEvent(new Event("netease:account-updated"));
  }
  // ==========================================================================
  // 喜欢歌曲管理
  // ==========================================================================
  async fetchLikedSongs() {
    if (!this.user?.uid) return Array.from(this.likedSongIds);
    try {
      const res = await this.request("/likelist", { uid: this.user.uid });
      const ids = res?.ids || [];
      if (ids.length) {
        this.likedSongIds = new Set(ids.map(Number));
        if (typeof chrome !== "undefined" && chrome.storage?.local) {
          await chrome.storage.local.set({ [NETEASE_LIKES_KEY]: Array.from(this.likedSongIds) });
        }
      }
      return Array.from(this.likedSongIds);
    } catch (e) {
      console.warn("[NeteaseService] fetchLikedSongs failed:", e);
      return Array.from(this.likedSongIds);
    }
  }
  getLikedSongIds() {
    return this.likedSongIds;
  }
  isLiked(songId) {
    return this.likedSongIds.has(Number(songId));
  }
  async toggleLikeSong(songId, shouldLike) {
    const id = Number(songId);
    if (!id) return false;
    const targetLike = shouldLike !== void 0 ? shouldLike : !this.likedSongIds.has(id);
    try {
      await this.request("/like", { id, like: targetLike });
      if (targetLike) {
        this.likedSongIds.add(id);
      } else {
        this.likedSongIds.delete(id);
      }
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        await chrome.storage.local.set({ [NETEASE_LIKES_KEY]: Array.from(this.likedSongIds) });
      }
      return true;
    } catch (e) {
      console.warn("[NeteaseService] toggleLikeSong failed:", e);
      return false;
    }
  }
  // ==========================================================================
  // 歌单与歌曲检索
  // ==========================================================================
  async getUserPlaylists(uid) {
    const targetUid = uid || this.user?.uid;
    if (!targetUid) return [];
    try {
      const res = await this.request("/user/playlist", { uid: targetUid, limit: 100 });
      return res?.playlist || [];
    } catch (e) {
      console.warn("[NeteaseService] getUserPlaylists failed:", e);
      return [];
    }
  }
  async getToplists() {
    try {
      const res = await this.request("/toplist");
      return res?.list || [];
    } catch (e) {
      console.warn("[NeteaseService] getToplists failed:", e);
      return [];
    }
  }
  /**
   * 综合歌单获取（自动识别用户状态，登录时返回用户歌单，未登录或为空时返回官方热门榜单）
   */
  async getPlaylists() {
    if (this.user?.loggedIn) {
      const userLists = await this.getUserPlaylists();
      if (userLists && userLists.length) return userLists;
    }
    const topLists = await this.getToplists();
    if (topLists && topLists.length) return topLists;
    return [
      { id: 3778678, name: "\u4E91\u97F3\u4E50\u70ED\u6B4C\u699C", trackCount: 200, coverImgUrl: "https://p1.music.126.net/Gh3G65F3eJ9vP_aQc6t2YQ==/109951165682855118.jpg" },
      { id: 3779629, name: "\u4E91\u97F3\u4E50\u65B0\u6B4C\u699C", trackCount: 100, coverImgUrl: "https://p1.music.126.net/N2HO5xfYEqyvgnqfMrrKPA==/109951165682845667.jpg" },
      { id: 19723756, name: "\u4E91\u97F3\u4E50\u98D9\u5347\u699C", trackCount: 100, coverImgUrl: "https://p1.music.126.net/sBzD11nforcuh1urispgOQ==/109951165682860472.jpg" },
      { id: 2884035, name: "\u7F51\u6613\u539F\u521B\u6B4C\u66F2\u699C", trackCount: 100, coverImgUrl: "https://p1.music.126.net/H4a8b79k8O9Zl_Kx_Yn16Q==/109951165682859758.jpg" }
    ];
  }
  addRecentSong(song) {
    this.recordRecentSong(song);
  }
  async autoDetectAndLogin() {
    if (this.user?.loggedIn) return this.user;
    if (typeof localStorage !== "undefined" && localStorage.getItem("netease_explicit_logout") === "true") {
      return null;
    }
    try {
      return await this.connectWebsiteAccount();
    } catch (e) {
      console.warn("[NeteaseService] autoDetectAndLogin failed:", e);
    }
    return null;
  }
  async getPlaylistTracks(playlistId, targetLimit = 500, offset = 0) {
    if (!playlistId) return [];
    if (this.playlistCache.has(playlistId) && targetLimit >= 500 && offset === 0) {
      const hit = this.playlistCache.get(playlistId);
      if (Date.now() - hit.at < 10 * 60 * 1e3 && hit.songs && hit.songs.length) {
        return hit.songs;
      }
    }
    const requestKey = `${playlistId}_${targetLimit}_${offset}`;
    if (this.pendingRequests.has(requestKey)) {
      return await this.pendingRequests.get(requestKey);
    }
    const requestPromise = (async () => {
      let tracks = [];
      try {
        try {
          const res = await this.request("/playlist/track/all", {
            id: playlistId,
            limit: targetLimit,
            offset
          });
          tracks = res?.songs || [];
        } catch (e1) {
          console.warn("[NeteaseService] /playlist/track/all error, fallback to detail:", e1);
        }
        if (!tracks.length && offset === 0) {
          const detailRes = await this.request("/playlist/detail", { id: playlistId });
          tracks = detailRes?.playlist?.tracks || [];
        }
        if (tracks.length && targetLimit >= 500 && offset === 0) {
          this.playlistCache.set(playlistId, { songs: tracks, at: Date.now() });
        }
      } finally {
        this.pendingRequests.delete(requestKey);
      }
      return tracks;
    })();
    this.pendingRequests.set(requestKey, requestPromise);
    return await requestPromise;
  }
  async searchSongs(keyword, limit = 60) {
    const cleanKw = keyword.trim();
    if (!cleanKw) return [];
    let songs = [];
    try {
      const res = await this.request("/cloudsearch", { keywords: cleanKw, type: 1, limit });
      songs = res?.result?.songs || [];
    } catch (e1) {
      console.warn("[NeteaseService] /cloudsearch failed, fallback to /search:", e1);
    }
    if (!songs.length) {
      try {
        const resLegacy = await this.request("/search", { keywords: cleanKw, limit });
        songs = resLegacy?.result?.songs || [];
      } catch (e2) {
        console.warn("[NeteaseService] /search failed:", e2);
      }
    }
    return songs;
  }
  // ==========================================================================
  // 音源 URL 与 歌词获取
  // ==========================================================================
  async getSongAudioUrl(songId, level = "standard") {
    let audioUrl = "";
    try {
      const res = await this.request("/song/url/v1", { id: songId, level });
      audioUrl = res?.data?.[0]?.url || "";
    } catch {
    }
    if (!audioUrl) {
      try {
        const legacyRes = await this.request("/song/url", { id: songId });
        audioUrl = legacyRes?.data?.[0]?.url || "";
      } catch {
      }
    }
    if (!audioUrl) {
      audioUrl = `https://music.163.com/song/media/outer/url?id=${songId}.mp3`;
    }
    return audioUrl;
  }
  async getSongLyric(songId) {
    try {
      const res = await this.request("/lyric", { id: songId });
      return res?.lrc?.lyric || "";
    } catch {
      return "";
    }
  }
  // ==========================================================================
  // 最近播放记录
  // ==========================================================================
  recordRecentSong(song) {
    if (!song || !song.id) return;
    this.recentSongs = this.recentSongs.filter((s) => String(s.id) !== String(song.id));
    this.recentSongs.unshift(song);
    if (this.recentSongs.length > 50) this.recentSongs = this.recentSongs.slice(0, 50);
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.set({ [NETEASE_RECENT_KEY]: this.recentSongs });
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(NETEASE_RECENT_KEY, JSON.stringify(this.recentSongs));
      } catch {
      }
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
    }
  }
  async clearRecentSongs() {
    await this.whenReady();
    this.recentSongs = [];
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      await chrome.storage.local.remove(NETEASE_RECENT_KEY);
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.removeItem(NETEASE_RECENT_KEY);
      } catch {
      }
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: [] }));
    }
  }
  getRecentSongs() {
    return [...this.recentSongs];
  }
  /**
   * 从网易云官方账户拉取真实的云端最近播放 / 听歌历史记录
   */
  async fetchAccountRecentSongs(limit = 60) {
    try {
      let rawList = [];
      try {
        const res = await this.request("/record/recent/song", { limit });
        if (Array.isArray(res?.data?.list) && res.data.list.length > 0) {
          rawList = res.data.list;
        }
      } catch {
      }
      if (!rawList.length && this.user?.uid) {
        try {
          const recordRes = await this.request("/user/record", { uid: this.user.uid, type: 1 });
          if (Array.isArray(recordRes?.weekData) && recordRes.weekData.length > 0) {
            rawList = recordRes.weekData;
          } else if (Array.isArray(recordRes?.allData) && recordRes.allData.length > 0) {
            rawList = recordRes.allData;
          }
        } catch {
        }
      }
      if (rawList.length > 0) {
        const cloudSongs = rawList.map((item) => {
          const s = item.data || item.song || item;
          if (!s || !s.id) return null;
          return {
            id: s.id,
            name: s.name || s.title || "\u672A\u77E5\u66F2\u76EE",
            artists: s.ar || s.artists || [],
            ar: s.ar || s.artists || [],
            album: s.al || s.album || {},
            al: s.al || s.album || {},
            dt: s.dt || s.duration || 0,
            duration: s.dt || s.duration || 0,
            picUrl: s.al?.picUrl || s.album?.picUrl || s.picUrl || "",
            coverUrl: s.al?.picUrl || s.album?.picUrl || s.picUrl || "",
            playTime: item.playTime || 0
          };
        }).filter(Boolean);
        if (cloudSongs.length > 0) {
          const cloudIds = new Set(cloudSongs.map((s) => String(s.id)));
          const extraLocal = this.recentSongs.filter((s) => !cloudIds.has(String(s.id)));
          this.recentSongs = [...cloudSongs, ...extraLocal].slice(0, 60);
          if (typeof chrome !== "undefined" && chrome.storage?.local) {
            await chrome.storage.local.set({ [NETEASE_RECENT_KEY]: this.recentSongs });
          }
          if (typeof localStorage !== "undefined") {
            try {
              localStorage.setItem(NETEASE_RECENT_KEY, JSON.stringify(this.recentSongs));
            } catch {
            }
          }
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
          }
        }
      }
    } catch (err) {
      console.warn("[NeteaseService] fetchAccountRecentSongs failed:", err);
    }
    return this.recentSongs;
  }
};
var neteaseService = NeteaseService.getInstance();
if (typeof window !== "undefined") {
  window.LogicWeaverNeteaseService = neteaseService;
}

// src/offscreen/audio-host.ts
var MONSTER_SIREN_API = "https://monster-siren.hypergryph.com/api";
function broadcastState(source, state) {
  try {
    const res = chrome.runtime?.sendMessage?.({ type: "offscreen-audio:state", source, state });
    if (res && typeof res.catch === "function") res.catch(() => {
    });
  } catch {
  }
}
var musicAudio = new Audio();
musicAudio.crossOrigin = "anonymous";
musicAudio.preload = "none";
var musicLyrics = [];
var musicPlayVersion = 0;
var musicLastBroadcast = 0;
var musicState = {
  playing: false,
  currentSong: null,
  currentTime: 0,
  duration: 0,
  mode: "shuffle",
  queue: [],
  queueIndex: -1,
  currentLyric: ""
};
function parseMusicLyrics(raw) {
  return raw.split(/\r?\n/).flatMap((line) => {
    const matches = [...line.matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]/g)];
    const text = line.replace(/\[[^\]]*\]/g, "").trim();
    return text ? matches.map((m) => ({ time: Number(m[1]) * 60 + Number(m[2]), text })) : [];
  }).sort((a, b) => a.time - b.time);
}
function updateMusicLyric() {
  let text = "";
  for (const line of musicLyrics) {
    if (line.time > musicState.currentTime) break;
    text = line.text;
  }
  musicState.currentLyric = text;
}
function emitMusicState(force = false) {
  const now = Date.now();
  if (!force && now - musicLastBroadcast < 380) return;
  musicLastBroadcast = now;
  broadcastState("music", { ...musicState });
}
function pauseBiliIfActive() {
  if (!biliAudio.paused || biliActive) {
    biliAudio.pause();
    emitBiliState(true);
  }
}
function pauseMusicIfActive() {
  if (!musicAudio.paused || musicState.playing) {
    musicAudio.pause();
    musicState.playing = false;
    emitMusicState(true);
  }
}
async function resolveAndPlayMusicSong(song, autoplay = true) {
  pauseBiliIfActive();
  const version = ++musicPlayVersion;
  musicState.currentSong = song;
  musicState.currentTime = 0;
  musicState.duration = 0;
  musicLyrics = [];
  musicState.currentLyric = "";
  if (musicState.queue.some((s) => !!s.isNetease !== !!song.isNetease)) {
    musicState.queue = [];
  }
  const existingIdx = musicState.queue.findIndex((s) => String(s.cid) === String(song.cid));
  if (existingIdx === -1) {
    musicState.queue = [...musicState.queue, song];
    musicState.queueIndex = musicState.queue.length - 1;
  } else {
    musicState.queueIndex = existingIdx;
  }
  emitMusicState(true);
  try {
    let playUrl = "";
    if (song.isNetease && song.neteaseId) {
      void neteaseService.getSongLyric(song.neteaseId).then((raw) => {
        if (version !== musicPlayVersion) return;
        musicLyrics = parseMusicLyrics(raw);
        updateMusicLyric();
        emitMusicState(true);
      });
      playUrl = await neteaseService.getSongAudioUrl(song.neteaseId);
    } else {
      const res = await fetch(`${MONSTER_SIREN_API}/song/${song.cid}`, { headers: { Accept: "application/json" } });
      const json = await res.json();
      playUrl = json.data?.sourceUrl || "";
      const lyricUrl = json.data?.lyricUrl;
      if (lyricUrl) {
        void fetch(lyricUrl).then((r) => r.ok ? r.text() : "").then((raw) => {
          if (version !== musicPlayVersion) return;
          musicLyrics = parseMusicLyrics(raw);
          updateMusicLyric();
          emitMusicState(true);
        }).catch(() => {
        });
      }
    }
    if (version !== musicPlayVersion || !playUrl) return;
    musicAudio.src = playUrl;
    if (autoplay) await musicAudio.play();
    if (version !== musicPlayVersion) return;
    musicState.playing = !musicAudio.paused;
    emitMusicState(true);
  } catch (err) {
    if (version === musicPlayVersion) {
      console.warn("[OffscreenAudio] \u97F3\u4E50\u64AD\u653E\u5931\u8D25", err);
      musicState.playing = false;
      emitMusicState(true);
    }
  }
}
function advanceMusic(step) {
  const queue = musicState.queue;
  if (!queue.length) return;
  let nextIdx = 0;
  if (musicState.mode === "shuffle" && queue.length > 1) {
    nextIdx = Math.floor(Math.random() * queue.length);
    if (nextIdx === musicState.queueIndex) nextIdx = (musicState.queueIndex + 1) % queue.length;
  } else if (step > 0) {
    nextIdx = (musicState.queueIndex + 1) % queue.length;
  } else {
    nextIdx = (musicState.queueIndex - 1 + queue.length) % queue.length;
  }
  const target = queue[nextIdx];
  if (target) void resolveAndPlayMusicSong(target, true);
}
musicAudio.addEventListener("timeupdate", () => {
  musicState.currentTime = musicAudio.currentTime || 0;
  if (Number.isFinite(musicAudio.duration)) musicState.duration = musicAudio.duration;
  updateMusicLyric();
  emitMusicState(false);
});
musicAudio.addEventListener("loadedmetadata", () => {
  if (Number.isFinite(musicAudio.duration)) musicState.duration = musicAudio.duration;
  emitMusicState(true);
});
musicAudio.addEventListener("play", () => {
  pauseBiliIfActive();
  musicState.playing = true;
  emitMusicState(true);
});
musicAudio.addEventListener("pause", () => {
  musicState.playing = false;
  emitMusicState(true);
});
musicAudio.addEventListener("ended", () => {
  if (musicState.mode === "one") {
    musicAudio.currentTime = 0;
    void musicAudio.play().catch(() => {
    });
  } else {
    advanceMusic(1);
  }
});
var biliAudio = new Audio();
biliAudio.preload = "auto";
var biliActive = false;
var biliLoading = false;
var biliName = "B\u7AD9\u7535\u53F0";
var biliItems = [];
var biliIndex = -1;
var biliTrack = null;
var biliGeneration = 0;
var biliError = "";
var biliMode = "order";
var biliSources = [];
var biliTriedSources = /* @__PURE__ */ new Set();
var biliResumePos = null;
var biliLastProgressTime = 0;
var biliLastProgressTs = Date.now();
var biliLastBufferEnd = 0;
var biliFailoverTimer = null;
var biliLastBroadcast = 0;
function stopBiliWatchdog() {
  if (biliFailoverTimer !== null) {
    clearInterval(biliFailoverTimer);
    biliFailoverTimer = null;
  }
}
function getBiliSnapshot() {
  const duration = biliAudio.duration && Number.isFinite(biliAudio.duration) ? biliAudio.duration : biliTrack?.duration || 0;
  return {
    active: biliActive,
    loading: biliLoading,
    name: biliName,
    items: biliItems,
    index: biliIndex,
    track: biliTrack,
    currentTime: biliAudio.currentTime || 0,
    duration,
    playing: Boolean(!biliAudio.paused && !biliAudio.ended && biliActive),
    error: biliError,
    mode: biliMode
  };
}
function emitBiliState(force = false) {
  const now = Date.now();
  if (!force && now - biliLastBroadcast < 380) return;
  biliLastBroadcast = now;
  broadcastState("bili", getBiliSnapshot());
}
function advanceBiliFailover() {
  if (!biliActive || !biliTrack) return;
  const nextUrl = biliSources.find((u) => !biliTriedSources.has(u) && /^https?:\/\//i.test(u));
  if (!nextUrl || biliTriedSources.size >= 3) {
    stopBiliWatchdog();
    biliError = "\u97F3\u9891\u8FDE\u63A5\u4E2D\u65AD\uFF0C\u5DF2\u5C1D\u8BD5\u6240\u6709\u5907\u7528\u7EBF\u8DEF";
    emitBiliState(true);
    return;
  }
  biliTriedSources.add(nextUrl);
  biliResumePos = {
    time: Number.isFinite(biliAudio.currentTime) ? biliAudio.currentTime : 0,
    paused: biliAudio.paused
  };
  biliError = "\u7F51\u7EDC\u6CE2\u52A8\uFF0C\u6B63\u5728\u5207\u6362\u5907\u7528\u7EBF\u8DEF\u2026";
  emitBiliState(true);
  biliAudio.src = nextUrl;
  biliAudio.load();
  if (!biliResumePos.paused) {
    void biliAudio.play().catch(() => {
    });
  }
}
function startBiliWatchdog() {
  stopBiliWatchdog();
  biliLastProgressTs = Date.now();
  biliLastProgressTime = biliAudio.currentTime || 0;
  biliLastBufferEnd = biliAudio.buffered.length ? biliAudio.buffered.end(biliAudio.buffered.length - 1) : 0;
  biliFailoverTimer = setInterval(() => {
    if (!biliActive || biliAudio.paused || biliAudio.ended) {
      biliLastProgressTs = Date.now();
      return;
    }
    const curTime = biliAudio.currentTime;
    const bufEnd = biliAudio.buffered.length ? biliAudio.buffered.end(biliAudio.buffered.length - 1) : 0;
    if (curTime !== biliLastProgressTime || bufEnd > biliLastBufferEnd) {
      biliLastProgressTs = Date.now();
      biliLastProgressTime = curTime;
      biliLastBufferEnd = bufEnd;
      if (biliError === "\u7F51\u7EDC\u6CE2\u52A8\uFF0C\u6B63\u5728\u5207\u6362\u5907\u7528\u7EBF\u8DEF\u2026") {
        biliError = "";
        emitBiliState(true);
      }
      return;
    }
    if (Date.now() - biliLastProgressTs >= 8e3 && biliAudio.readyState < 3) {
      advanceBiliFailover();
    }
  }, 1e3);
}
async function resolveBiliTrack(item) {
  if (item.streamUrl || item.url) return item;
  const view = await bilibiliService.getVideoView(item.bvid);
  if (!view?.cid) throw new Error("\u89C6\u9891\u4FE1\u606F\u4E0D\u53EF\u7528");
  const stream = await bilibiliService.fetchAudioStream(item.bvid, view.cid);
  if (!stream.sources.length) throw new Error("\u6CA1\u6709\u53D6\u5F97\u89C6\u9891\u64AD\u653E\u5730\u5740");
  return {
    ...item,
    title: view.title || item.title,
    cover: String(view.pic || item.cover || "").replace(/^http:/, "https:"),
    upper: view.owner?.name || item.upper || item.author || "Bilibili",
    duration: Number(view.duration || item.duration || 0),
    cid: view.cid,
    streamUrl: stream.sources[0],
    streamUrls: stream.sources
  };
}
async function playBiliIndex(nextIndex, autoplay = true) {
  if (!biliItems.length) return;
  pauseMusicIfActive();
  const current = ++biliGeneration;
  biliIndex = (nextIndex % biliItems.length + biliItems.length) % biliItems.length;
  biliLoading = true;
  biliActive = true;
  biliError = "";
  stopBiliWatchdog();
  biliResumePos = null;
  biliAudio.pause();
  emitBiliState(true);
  try {
    const next = await resolveBiliTrack(biliItems[biliIndex]);
    if (current !== biliGeneration) return;
    biliTrack = next;
    const sources = next.streamUrls?.length ? next.streamUrls : next.streamUrl || next.url ? [next.streamUrl || next.url] : [];
    const url = sources[0];
    if (!url) throw new Error("\u6CA1\u6709\u53D6\u5F97\u89C6\u9891\u64AD\u653E\u5730\u5740");
    biliSources = sources;
    biliTriedSources = /* @__PURE__ */ new Set([url]);
    biliAudio.src = url;
    startBiliWatchdog();
    if (autoplay) {
      void biliAudio.play().catch((err) => console.warn("[OffscreenAudio] B\u7AD9\u7535\u53F0\u64AD\u653E\u5931\u8D25", err));
    }
    if (next.bvid && !next.cues?.length) {
      void bilibiliService.fetchVideoSubtitleDetails(next.bvid, next.cid).then((sub) => {
        if (current === biliGeneration && sub.ok && biliTrack) {
          biliTrack = { ...biliTrack, cues: sub.cues };
          emitBiliState(true);
        }
      }).catch(() => {
      });
    }
  } catch (err) {
    if (current !== biliGeneration) return;
    biliActive = false;
    biliError = err instanceof Error ? err.message : "\u64AD\u653E\u5931\u8D25";
  } finally {
    if (current === biliGeneration) {
      biliLoading = false;
      emitBiliState(true);
    }
  }
}
function advanceBili(step) {
  if (!biliItems.length) return;
  if (biliMode === "shuffle" && biliItems.length > 1) {
    let nextIdx = Math.floor(Math.random() * biliItems.length);
    if (nextIdx === biliIndex) nextIdx = (biliIndex + 1) % biliItems.length;
    void playBiliIndex(nextIdx, true);
  } else {
    void playBiliIndex(biliIndex + step, true);
  }
}
biliAudio.addEventListener("timeupdate", () => {
  biliLastProgressTs = Date.now();
  biliLastProgressTime = biliAudio.currentTime;
  if (biliError === "\u7F51\u7EDC\u6CE2\u52A8\uFF0C\u6B63\u5728\u5207\u6362\u5907\u7528\u7EBF\u8DEF\u2026") biliError = "";
  emitBiliState(false);
});
biliAudio.addEventListener("loadedmetadata", () => {
  if (biliResumePos) {
    const resume = biliResumePos;
    biliResumePos = null;
    if (resume.time > 0 && resume.time < (biliAudio.duration || Infinity)) {
      try {
        biliAudio.currentTime = resume.time;
      } catch {
      }
    }
    if (!resume.paused) void biliAudio.play().catch(() => {
    });
  }
  emitBiliState(true);
});
biliAudio.addEventListener("play", () => {
  pauseMusicIfActive();
  emitBiliState(true);
});
biliAudio.addEventListener("pause", () => emitBiliState(true));
biliAudio.addEventListener("error", () => {
  if (biliActive && biliAudio.error) advanceBiliFailover();
});
biliAudio.addEventListener("ended", () => {
  if (biliMode === "one") {
    biliAudio.currentTime = 0;
    void biliAudio.play().catch(() => {
    });
    emitBiliState(true);
  } else {
    advanceBili(1);
  }
});
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "offscreen-audio:get-state") {
    sendResponse({
      ok: true,
      music: musicState.currentSong || musicState.queue.length ? { ...musicState } : null,
      bili: biliActive || biliItems.length ? getBiliSnapshot() : null
    });
    return true;
  }
  if (message?.type !== "offscreen-audio:command") return false;
  const { target, action, payload } = message;
  if (target === "music") {
    if (action === "play-url") {
      pauseBiliIfActive();
      const version = ++musicPlayVersion;
      musicState.currentSong = payload.song || null;
      musicState.queue = Array.isArray(payload.queue) ? payload.queue : [];
      musicState.queueIndex = typeof payload.queueIndex === "number" ? payload.queueIndex : -1;
      if (payload.mode) musicState.mode = payload.mode;
      musicLyrics = Array.isArray(payload.lyrics) ? payload.lyrics : [];
      musicState.currentTime = 0;
      musicState.duration = 0;
      updateMusicLyric();
      if (payload.url) {
        musicAudio.src = payload.url;
        if (payload.autoplay !== false) {
          void musicAudio.play().then(() => {
            if (version === musicPlayVersion) {
              musicState.playing = !musicAudio.paused;
              emitMusicState(true);
            }
          }).catch(() => emitMusicState(true));
        }
      }
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "set-lyrics") {
      musicLyrics = Array.isArray(payload?.lyrics) ? payload.lyrics : [];
      updateMusicLyric();
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "set-queue") {
      if (Array.isArray(payload?.queue)) musicState.queue = payload.queue;
      if (typeof payload?.queueIndex === "number") musicState.queueIndex = payload.queueIndex;
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "set-mode") {
      musicState.mode = payload?.mode || musicState.mode;
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "toggle") {
      if (!musicAudio.paused) musicAudio.pause();
      else if (musicAudio.src) {
        pauseBiliIfActive();
        void musicAudio.play().catch(() => {
        });
      }
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "pause") {
      musicAudio.pause();
      emitMusicState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "seek") {
      if (Number.isFinite(musicAudio.duration) && musicAudio.duration > 0) {
        musicAudio.currentTime = Math.min(100, Math.max(0, Number(payload?.percent) || 0)) / 100 * musicAudio.duration;
        updateMusicLyric();
        emitMusicState(true);
      }
      sendResponse({ ok: true });
      return true;
    }
    if (action === "next") {
      advanceMusic(1);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "prev") {
      advanceMusic(-1);
      sendResponse({ ok: true });
      return true;
    }
  }
  if (target === "bili") {
    if (action === "play-queue") {
      biliName = payload?.name || "B\u7AD9\u7535\u53F0";
      biliItems = Array.isArray(payload?.items) ? payload.items : [];
      if (payload?.mode) biliMode = payload.mode;
      void playBiliIndex(Number(payload?.startIndex) || 0, payload?.autoplay !== false);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "play-resolved") {
      pauseMusicIfActive();
      ++biliGeneration;
      biliName = payload?.name || "B\u7AD9\u7535\u53F0";
      biliItems = Array.isArray(payload?.items) ? payload.items : [];
      biliIndex = Number(payload?.index) || 0;
      biliTrack = payload?.track || null;
      biliActive = true;
      biliLoading = false;
      biliError = "";
      if (payload?.mode) biliMode = payload.mode;
      const sources = Array.isArray(payload?.sources) ? payload.sources : [];
      if (sources[0]) {
        biliSources = sources;
        biliTriedSources = /* @__PURE__ */ new Set([sources[0]]);
        biliAudio.src = sources[0];
        startBiliWatchdog();
        if (payload?.autoplay !== false) void biliAudio.play().catch(() => {
        });
      }
      emitBiliState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "play-at") {
      void playBiliIndex(Number(payload?.index) || 0, true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "set-mode") {
      if (payload?.mode) biliMode = payload.mode;
      emitBiliState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "toggle") {
      if (!biliActive && !biliAudio.src) {
        if (biliItems.length > 0) void playBiliIndex(biliIndex >= 0 ? biliIndex : 0, true);
      } else if (biliAudio.paused) {
        pauseMusicIfActive();
        void biliAudio.play().catch(() => {
        });
      } else {
        biliAudio.pause();
      }
      emitBiliState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "pause") {
      biliAudio.pause();
      emitBiliState(true);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "seek") {
      if (Number.isFinite(biliAudio.duration) && biliAudio.duration > 0) {
        biliAudio.currentTime = Math.min(100, Math.max(0, Number(payload?.percent) || 0)) / 100 * biliAudio.duration;
        emitBiliState(true);
      }
      sendResponse({ ok: true });
      return true;
    }
    if (action === "next") {
      advanceBili(1);
      sendResponse({ ok: true });
      return true;
    }
    if (action === "prev") {
      advanceBili(-1);
      sendResponse({ ok: true });
      return true;
    }
  }
  sendResponse({ ok: false });
  return true;
});
