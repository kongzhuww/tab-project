/**
 * BilibiliService — 现代化 B站数据与媒体流纯数据服务 (Pure TypeScript, Zero DOM)
 * 封装 B站用户状态、自建/合集/追番/稍后再看资源路由、收藏夹树拓扑、视频移动/取消收藏及剧场字幕
 */

declare const chrome: any;

export interface BiliUserNav {
  isLogin: boolean;
  mid: number;
  uname: string;
  face: string;
  level: number;
}

export interface BiliFolderData {
  id: number | string;
  fid?: number | string;
  mid?: number;
  title: string;
  media_count: number;
  cur_page?: number;
  isCollected?: boolean;
  isSeason?: boolean;
  isOther?: boolean;
  otherType?: string;
  icon?: string;
  cover?: string;
  upper?: {
    mid: number;
    name: string;
    face?: string;
  };
}

export interface BiliVideoData {
  id: number | string;
  type: number;
  title: string;
  cover: string;
  intro?: string;
  page?: number;
  duration: number;
  upper?: {
    mid: number;
    name: string;
    face?: string;
  };
  cnt_info?: {
    collect?: number;
    play?: number;
    danmaku?: number;
  };
  link?: string;
  bvid: string;
  fav_time?: number;
}

export interface BiliSubtitleCue {
  id?: number | string;
  from: number;
  to: number;
  content: string;
}

export interface BiliDanmakuItem {
  id: string;
  time: number; // 视频内出现时间点（秒）
  timeStr: string; // "01:23"
  mode: number; // 1~3滚动, 4底部, 5顶部
  size: number;
  color: string; // 如 "#ffffff"
  timestamp: number; // 发送时间戳
  pool: number;
  userHash: string;
  text: string;
}

export interface BiliVideoPage {
  cid: number | string;
  page: number;
  part: string;
  duration: number;
}

export interface BiliPlayStreamResult {
  title: string;
  poster: string;
  sources: string[];
  aid: number | string | null;
  bvid: string;
  cid: number | string | null;
  owner: string;
  ownerFace: string;
  ownerMid: number | string | null;
  pubdate: number;
  desc: string;
  views: number;
  danmaku: number;
  likes: number;
  currentQuality: number;
  acceptQuality: number[];
  acceptDescription: string[];
  pages: BiliVideoPage[];
  currentPage: number;
  partTitle: string;
  cached?: boolean;
}

export interface BiliSubtitleDetailResult {
  ok: boolean;
  title?: string;
  bodyText?: string;
  headText?: string;
  lineCount?: number;
  cues: BiliSubtitleCue[];
  aid?: number | string;
  desc?: string;
  viewPoints?: any[];
  reason?: string;
}

export interface BiliCommentItem {
  rpid: string | number;
  mid: number;
  uname: string;
  avatar: string;
  message: string;
  timeText: string;
  like: number;
  rcount?: number;
  pictures?: string[];
  emotes?: Record<string, string>;
  replies?: BiliCommentItem[];
}

export interface BiliFavTreeNode {
  id: string;
  name?: string;
  type: "folder" | "fav";
  children?: BiliFavTreeNode[];
}

export interface BiliOrganizerFolderView {
  id: string;
  title: string;
  count: number;
  kind: "created" | "collected" | "other";
  depth: number;
  group: boolean;
  collapsed: boolean;
  selected: boolean;
  writable: boolean;
}

/**
 * 纯前端原生 MD5 算法实现 (无外部依赖，兼容 Node / Browser)
 */
export function biliMd5(inputStr: string): string {
  function L(x: number, c: number) { return (x << c) | (x >>> (32 - c)); }
  const S = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
  const K = new Array(64).fill(0).map((_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32));
  const bytes = new TextEncoder().encode(inputStr);
  const bitLen = bytes.length * 8;
  const padded = new Uint8Array((Math.floor((bytes.length + 8) / 64) + 1) * 64);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const dv = new DataView(padded.buffer);
  dv.setUint32(padded.length - 8, bitLen >>> 0, true);
  dv.setUint32(padded.length - 4, Math.floor(bitLen / 0x100000000), true);
  let a = 0x67452301, b = 0xefcdab89, c = 0x98badcfe, d = 0x10325476;
  for (let i = 0; i < padded.length; i += 64) {
    const M = new Array(16);
    for (let j = 0; j < 16; j++) M[j] = dv.getUint32(i + j * 4, true);
    let A = a, B = b, C = c, D = d;
    for (let j = 0; j < 64; j++) {
      let F: number, g: number;
      if (j < 16) { F = (B & C) | (~B & D); g = j; }
      else if (j < 32) { F = (D & B) | (~D & C); g = (5 * j + 1) % 16; }
      else if (j < 48) { F = B ^ C ^ D; g = (3 * j + 5) % 16; }
      else { F = C ^ (B | ~D); g = (7 * j) % 16; }
      const tmp = (F + A + K[j] + M[g]) >>> 0;
      A = D; D = C; C = B;
      B = (B + L(tmp, S[j])) >>> 0;
    }
    a = (a + A) >>> 0; b = (b + B) >>> 0; c = (c + C) >>> 0; d = (d + D) >>> 0;
  }
  function le(x: number) {
    let s = "";
    for (let i = 0; i < 4; i++) s += ((x >>> (i * 8)) & 0xff).toString(16).padStart(2, "0");
    return s;
  }
  return le(a) + le(b) + le(c) + le(d);
}

// B站 Wbi 混淆表与计算
export const WBI_MIXIN_TAB = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
  33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61,
  26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36,
  20, 34, 44, 52
];

export function calculateWbiSign(params: Record<string, any>, ik: string, sk: string): { signedQuery: string; w_rid: string; wts: number } {
  const mk = WBI_MIXIN_TAB.map((i) => (ik + sk)[i]).join("").slice(0, 32);
  const wts = Math.round(Date.now() / 1000);
  const p: Record<string, any> = { ...params, wts };
  const sortedKeys = Object.keys(p).sort();
  const q = sortedKeys
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(String(p[k]).replace(/[!'()*]/g, "")))
    .join("&");
  const w_rid = biliMd5(q + mk);
  return {
    signedQuery: `${q}&w_rid=${w_rid}`,
    w_rid,
    wts
  };
}

export function parseSrtToPlainText(srt: string): string {
  const lines = srt.replace(/^\uFEFF/, "").split(/\r?\n/);
  const out: string[] = [];
  let buf: string[] = [];
  const flush = () => {
    const text = buf
      .filter((l) => !/^\d+$/.test(l) && !l.includes("-->") && !/^(WEBVTT|Kind:|Language:)/i.test(l))
      .join("\r\n")
      .trim();
    if (text) out.push(text);
    buf = [];
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (line === "") flush();
    else buf.push(line);
  }
  flush();
  return out.join("\r\n");
}

export function extractSubtitlesFromText(text: string, filename = ""): string {
  const ext = (filename || "").split(".").pop()?.toLowerCase();
  // 1) JSON（B站字幕：{"body":[{"from":..,"content":"..."}]}）
  if (ext === "json" || /^\s*[\[{]/.test(text)) {
    try {
      const j = JSON.parse(text);
      const body = j?.body || j?.data?.body || (Array.isArray(j) ? j : null);
      if (Array.isArray(body) && body.length) {
        const lines = body.map((b: any) => (b && typeof b === "object" ? b.content : String(b))).filter((s: any) => s && String(s).trim());
        if (lines.length) return lines.join("\r\n");
      }
    } catch {}
  }
  // 2) ASS（[Events] 段的 Dialogue: 行）
  if (text.includes("[Events]")) {
    const dialogues = text.split(/\r?\n/).filter((l) => /^Dialogue:/i.test(l));
    if (dialogues.length) {
      const lines = dialogues.map((l) => {
        const content = l.split(",").slice(9).join(",").replace(/\{[^}]*\}/g, "").replace(/\\N/g, "\r\n").trim();
        return content;
      }).filter(Boolean);
      if (lines.length) return lines.join("\r\n");
    }
  }
  // 3) SRT / VTT
  return parseSrtToPlainText(text);
}

export function getBiliQualityShortLabel(qn: number | string): string {
  const num = Number(qn);
  if (num >= 120) return "4K";
  if (num === 116) return "1080P60";
  if (num === 112) return "1080P+";
  if (num === 80) return "1080P";
  if (num === 74) return "720P60";
  if (num === 64) return "720P";
  if (num === 32) return "480P";
  if (num === 16) return "360P";
  return num > 0 ? `${num}P` : "清晰度";
}

export function getBiliQualityFullLabel(qn: number | string, desc = ""): string {
  if (desc && typeof desc === "string" && desc.trim()) return desc.trim();
  const num = Number(qn);
  if (num >= 120) return "超清 4K";
  if (num === 116) return "高清 1080P 60帧";
  if (num === 112) return "高清 1080P+ 高码率";
  if (num === 80) return "高清 1080P";
  if (num === 74) return "高码率 720P 60帧";
  if (num === 64) return "高清 720P";
  if (num === 32) return "清晰 480P";
  if (num === 16) return "流畅 360P";
  return `${num}P`;
}

const BILI_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export class BilibiliFavoritesTreeManager {
  private static instance: BilibiliFavoritesTreeManager;
  private constructor() {}

  public static getInstance(): BilibiliFavoritesTreeManager {
    if (!BilibiliFavoritesTreeManager.instance) {
      BilibiliFavoritesTreeManager.instance = new BilibiliFavoritesTreeManager();
    }
    return BilibiliFavoritesTreeManager.instance;
  }

  public async loadTree(): Promise<BiliFavTreeNode> {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const stored = await chrome.storage.local.get("foTree");
        if (stored?.foTree?.children) return stored.foTree;
      } catch {}
    }
    if (typeof localStorage !== "undefined") {
      try {
        const str = localStorage.getItem("foTree");
        if (str) {
          const parsed = JSON.parse(str);
          if (parsed?.children) return parsed;
        }
      } catch {}
    }
    return { id: "root", type: "folder", children: [] };
  }

  public async saveTree(tree: BiliFavTreeNode): Promise<void> {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        await chrome.storage.local.set({ foTree: tree });
      } catch {}
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("foTree", JSON.stringify(tree));
      } catch {}
    }
  }

  public async loadCollapsedGroups(): Promise<Set<string>> {
    let list: string[] = [];
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        const stored = await chrome.storage.local.get("foCollapsedGroupsV1");
        if (Array.isArray(stored?.foCollapsedGroupsV1)) list = stored.foCollapsedGroupsV1.map(String);
      } catch {}
    }
    if (!list.length && typeof localStorage !== "undefined") {
      try {
        const str = localStorage.getItem("foCollapsedGroupsV1");
        if (str) {
          const parsed = JSON.parse(str);
          if (Array.isArray(parsed)) list = parsed.map(String);
        }
      } catch {}
    }
    return new Set(list);
  }

  public async saveCollapsedGroups(groups: Set<string>): Promise<void> {
    const list = Array.from(groups);
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      try {
        await chrome.storage.local.set({ foCollapsedGroupsV1: list });
      } catch {}
    }
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("foCollapsedGroupsV1", JSON.stringify(list));
      } catch {}
    }
  }

  public findNode(node: BiliFavTreeNode | null, id: string): BiliFavTreeNode | null {
    if (!node) return null;
    if (String(node.id) === String(id)) return node;
    for (const c of node.children || []) {
      const r = this.findNode(c, id);
      if (r) return r;
    }
    return null;
  }

  public findParent(node: BiliFavTreeNode | null, id: string): BiliFavTreeNode | null {
    if (!node) return null;
    for (const c of node.children || []) {
      if (String(c.id) === String(id)) return node;
      const r = this.findParent(c, id);
      if (r) return r;
    }
    return null;
  }

  public removeNodeById(node: BiliFavTreeNode, id: string): boolean {
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

  public isDescendant(node: BiliFavTreeNode | null, ancestorId: string): boolean {
    if (!node) return false;
    if (String(node.id) === String(ancestorId)) return true;
    for (const c of node.children || []) {
      if (this.isDescendant(c, ancestorId)) return true;
    }
    return false;
  }

  public createGroupNode(name: string): BiliFavTreeNode {
    return {
      id: "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      type: "folder",
      name,
      children: []
    };
  }

  public unwrapGroup(tree: BiliFavTreeNode, id: string): boolean {
    const parent = this.findParent(tree, id) || tree;
    const index = (parent.children || []).findIndex((node) => String(node.id) === String(id));
    if (index < 0) return false;
    const folder = parent.children![index];
    parent.children!.splice(index, 1, ...(folder.children || []));
    return true;
  }

  public moveNode(
    tree: BiliFavTreeNode,
    sourceId: string,
    targetId: string,
    mode: "before" | "after" | "into",
    fallbackFavName?: string
  ): boolean {
    let source = this.findNode(tree, sourceId);
    if (!source) {
      source = { id: String(sourceId), type: "fav", name: fallbackFavName || "收藏夹", children: [] };
    }
    const target = String(targetId) === "root" ? tree : this.findNode(tree, targetId);
    if (!source || !target || source === target || (source.type === "folder" && this.isDescendant(source, target.id))) {
      return false;
    }

    this.removeNodeById(tree, source.id);
    if (target === tree || (mode === "into" && target.type === "folder")) {
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

  public syncTreeWithFolders(tree: BiliFavTreeNode, createdFolders: any[]): boolean {
    let changed = false;
    const remoteIdMap = new Map<string, any>();
    for (const f of createdFolders) {
      remoteIdMap.set(String(f.id || f.fid), f);
    }

    // 1. 递归清理已在远程删除的收藏夹 (保留本地分组)
    const cleanup = (node: BiliFavTreeNode) => {
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

    // 2. 收集树中现存的收藏夹 ID
    const treeFavIds = new Set<string>();
    const collectFavIds = (node: BiliFavTreeNode) => {
      for (const child of node.children || []) {
        if (child.type === "fav") treeFavIds.add(String(child.id));
        else collectFavIds(child);
      }
    };
    collectFavIds(tree);

    // 3. 将未在树中的自建收藏夹追加到根节点
    if (!tree.children) tree.children = [];
    for (const f of createdFolders) {
      const id = String(f.id || f.fid);
      if (!treeFavIds.has(id)) {
        tree.children.push({
          id,
          type: "fav",
          name: f.title || "未命名收藏夹",
          children: []
        });
        changed = true;
      }
    }

    return changed;
  }

  public flattenTree(
    tree: BiliFavTreeNode,
    allFolders: any[],
    collapsedGroups: Set<string>,
    activeFolderId: string
  ): BiliOrganizerFolderView[] {
    const foldersById = new Map<string, any>((allFolders || []).map((f) => [String(f.id || f.fid), f]));
    const flattened: BiliOrganizerFolderView[] = [];
    const treeFavIds = new Set<string>();

    const countTreeFavorites = (node: BiliFavTreeNode): number =>
      (node.children || []).reduce(
        (acc, c) => acc + (c.type === "fav" ? 1 : countTreeFavorites(c)),
        0
      );

    const appendTree = (node: BiliFavTreeNode, depth = 0) => {
      for (const child of node.children || []) {
        const childId = String(child.id);
        const folder = foldersById.get(childId);
        const isGroup = child.type === "folder";
        if (!isGroup) treeFavIds.add(childId);

        const isCollapsed = isGroup && collapsedGroups.has(childId);
        const isSelected = !isGroup && childId === String(activeFolderId);

        flattened.push({
          id: childId,
          title: String(child.name || folder?.title || "未命名收藏夹"),
          count: Number(isGroup ? countTreeFavorites(child) : (folder?.media_count || 0)),
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
        title: f.title || "未命名收藏",
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
}

export class BilibiliService {
  private static instance: BilibiliService;
  private currentUser: BiliUserNav | null = null;
  private writeQueue: Promise<any> = Promise.resolve();
  private lastWriteTime = 0;
  private wbiKeysCache: { ik: string; sk: string; expire: number } | null = null;
  public readonly treeManager = BilibiliFavoritesTreeManager.getInstance();

  private constructor() {}

  public static getInstance(): BilibiliService {
    if (!BilibiliService.instance) {
      BilibiliService.instance = new BilibiliService();
    }
    return BilibiliService.instance;
  }

  /**
   * 底层 B站 API 请求器 (携带凭据与跨域支持)
   */
  public async api<T = any>(url: string, init: RequestInit = {}): Promise<T> {
    const res = await fetch(url, {
      ...init,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(init.headers || {})
      }
    });

    if (!res.ok) {
      throw new Error(`Bilibili API 请求失败 [${res.status}]: ${res.statusText}`);
    }

    const json = await res.json();
    if (json.code !== 0 && json.code !== undefined) {
      throw new Error(json.message || json.msg || `Bilibili 接口返回错误码 ${json.code}`);
    }

    return json.data !== undefined ? json.data : json;
  }

  /**
   * 从 Chrome Cookies 或 document.cookie 中提取 bili_jct (CSRF)
   */
  public async getBiliJct(): Promise<string> {
    if (typeof chrome !== "undefined" && chrome.cookies?.get) {
      try {
        for (const u of ["https://bilibili.com", "https://www.bilibili.com", "https://api.bilibili.com"]) {
          const c = await chrome.cookies.get({ url: u, name: "bili_jct" });
          if (c?.value) return c.value;
        }
      } catch {}
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
  public async enqueueWrite<T>(taskFn: () => Promise<T>, minInterval = 650): Promise<T> {
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
    this.writeQueue = resPromise.catch(() => {});
    return resPromise;
  }

  public formatBiliApiError(code: number, message?: string): string {
    if (code === 11007 || code === -412) return "操作过于频繁，请稍候再试";
    if (code === -101) return "账号未登录或登录态已失效";
    if (code === 11002) return "视频已存在于目标收藏夹";
    if (code === 11003) return "收藏夹不存在或已被删除";
    return message || `B站接口返回错误码 ${code}`;
  }

  /**
   * 获取当前登录用户信息
   */
  public async getUserNav(): Promise<BiliUserNav> {
    const data = await this.api<any>("https://api.bilibili.com/x/web-interface/nav");
    this.currentUser = {
      isLogin: Boolean(data?.isLogin),
      mid: Number(data?.mid || 0),
      uname: String(data?.uname || ""),
      face: String(data?.face || ""),
      level: Number(data?.level_info?.current_level || 0)
    };
    return this.currentUser;
  }

  public getCachedUser(): BiliUserNav | null {
    return this.currentUser;
  }

  /**
   * 获取用户创建的所有收藏夹
   */
  public async getCreatedFolders(upMid?: number): Promise<BiliFolderData[]> {
    let mid = upMid;
    if (!mid) {
      if (!this.currentUser) await this.getUserNav();
      mid = this.currentUser?.mid;
    }
    if (!mid) throw new Error("无法获取 B 站用户 MID，请先登录");

    const data = await this.api<any>(
      `https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${mid}&type=0`
    );
    return data?.list || [];
  }

  /**
   * 获取用户订阅/收藏的公开收藏夹及合集
   */
  public async getCollectedFolders(pn = 1, ps = 50, upMid?: number): Promise<{ count: number; list: BiliFolderData[] }> {
    let mid = upMid;
    if (!mid) {
      if (!this.currentUser) await this.getUserNav();
      mid = this.currentUser?.mid;
    }
    const data = await this.api<any>(
      `https://api.bilibili.com/x/v3/fav/folder/collected/list?pn=${pn}&ps=${ps}&up_mid=${mid || ""}&platform=web`
    );
    const rawCollected = data?.list || [];
    const list: BiliFolderData[] = rawCollected.map((c: any) => ({
      id: c.id,
      fid: c.fid || c.id,
      title: c.title,
      media_count: Number(c.media_count || 0),
      cover: (c.cover || "").replace(/^http:/, "https:"),
      upper: c.upper || { name: c.owner?.name || "UP主", mid: c.mid },
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
   * 获取系统虚拟收藏夹 (稍后再看、我的追番)
   */
  public getOtherFolders(): BiliFolderData[] {
    return [
      {
        id: "__toview__",
        fid: "__toview__",
        title: "稍后再看",
        media_count: 0,
        icon: "⏱️",
        isOther: true,
        otherType: "toview"
      },
      {
        id: "__bangumi__",
        fid: "__bangumi__",
        title: "我的追番",
        media_count: 0,
        icon: "🎬",
        isOther: true,
        otherType: "bangumi"
      }
    ];
  }

  /**
   * 读取稍后再看列表
   */
  public async getToViewVideos(): Promise<{ medias: BiliVideoData[]; total: number }> {
    const data = await this.api<any>("https://api.bilibili.com/x/v2/history/toview");
    const rawList = data?.list || [];
    const medias: BiliVideoData[] = rawList.map((item: any) => ({
      id: item.aid || item.id,
      type: 2,
      title: item.title,
      cover: (item.pic || "").replace(/^http:/, "https:"),
      duration: item.duration || 0,
      upper: item.owner ? { mid: item.owner.mid, name: item.owner.name, face: item.owner.face } : undefined,
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
  public async getBangumiFollows(pn = 1, ps = 24, upMid?: number): Promise<{ medias: BiliVideoData[]; total: number }> {
    let targetMid = upMid;
    if (!targetMid) {
      if (!this.currentUser) await this.getUserNav();
      targetMid = this.currentUser?.mid;
    }
    const data = await this.api<any>(
      `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=${pn}&ps=${ps}&vmid=${targetMid || ""}`
    );
    const rawList = data?.list || [];
    const medias: BiliVideoData[] = rawList.map((item: any) => ({
      id: item.season_id,
      type: 21,
      title: item.title,
      cover: (item.cover || "").replace(/^http:/, "https:"),
      duration: 0,
      upper: { mid: 0, name: item.season_type_name || "番剧", face: "" },
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
  public async getSeasonVideos(seasonId: string | number, pn = 1, ps = 24): Promise<{ medias: BiliVideoData[]; total: number }> {
    const data = await this.api<any>(
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
  public async getFolderVideos(
    mediaId: number | string,
    pn = 1,
    ps = 20,
    order = "mtime",
    keyword = ""
  ): Promise<{ info: any; medias: BiliVideoData[]; hasMore: boolean; total: number }> {
    const idStr = String(mediaId);

    if (idStr === "__toview__") {
      const res = await this.getToViewVideos();
      let list = res.medias;
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        list = list.filter((v) => v.title.toLowerCase().includes(q) || (v.upper?.name && v.upper.name.toLowerCase().includes(q)));
      }
      return {
        info: { title: "稍后再看", media_count: res.total },
        medias: list.slice((pn - 1) * ps, pn * ps),
        hasMore: pn * ps < list.length,
        total: list.length
      };
    }

    if (idStr === "__bangumi__") {
      const res = await this.getBangumiFollows(pn, ps);
      return {
        info: { title: "我的追番", media_count: res.total },
        medias: res.medias,
        hasMore: pn * ps < res.total,
        total: res.total
      };
    }

    if (idStr.startsWith("season:")) {
      const seasonId = idStr.replace("season:", "");
      const res = await this.getSeasonVideos(seasonId, pn, ps);
      return {
        info: { title: "合集内容", media_count: res.total },
        medias: res.medias,
        hasMore: pn * ps < res.total,
        total: res.total
      };
    }

    // 默认 B站 收藏夹接口
    let url = `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${mediaId}&pn=${pn}&ps=${ps}&order=${order}&platform=web`;
    if (keyword.trim()) {
      url += `&keyword=${encodeURIComponent(keyword.trim())}`;
    }
    const data = await this.api<any>(url);
    const medias: BiliVideoData[] = data?.medias || [];
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
  public async createRemoteFolder(title: string, privacy = 0): Promise<{ ok: boolean; folder?: any; reason?: string }> {
    const csrf = await this.getBiliJct();
    if (!csrf) return { ok: false, reason: "没有取得 B站 CSRF 登录凭据，请先重新登录 B站" };

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
      return { ok: false, reason: payload?.message || `B站接口 ${payload?.code ?? response.status}` };
    } catch (error: any) {
      return { ok: false, reason: error?.message || "创建 B站收藏夹失败" };
    }
  }

  /**
   * 移动视频至其他收藏夹 (单项或批量)
   */
  public async moveVideo(
    srcId: string | number,
    tarId: string | number,
    aid: string | number | (string | number)[],
    mid?: number
  ): Promise<{ ok: boolean; code?: number; reason?: string }> {
    return this.enqueueWrite(async () => {
      const csrf = await this.getBiliJct();
      if (!csrf) return { ok: false, reason: "取不到 csrf（bili_jct）" };
      try {
        const resStr = Array.isArray(aid)
          ? aid.map((id) => (String(id).includes(":") ? String(id) : `${id}:2`)).join(",")
          : (String(aid).includes(":") ? String(aid) : `${aid}:2`);
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
      } catch (e: any) {
        return { ok: false, reason: e.message || "移动视频失败" };
      }
    });
  }

  /**
   * 从收藏夹删除视频 (取消收藏)
   */
  public async deleteVideo(
    fid: string | number,
    aid: string | number,
    maxRetries = 2
  ): Promise<{ ok: boolean; code?: number; reason?: string }> {
    return this.enqueueWrite(async () => {
      let attempt = 0;
      while (true) {
        attempt++;
        const csrf = await this.getBiliJct();
        if (!csrf) return { ok: false, reason: "取不到 csrf（bili_jct）" };
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
        } catch (e: any) {
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
  public async addVideoToFavorite(
    tarId: string | number,
    aid: string | number
  ): Promise<{ ok: boolean; code?: number; reason?: string }> {
    return this.enqueueWrite(async () => {
      const csrf = await this.getBiliJct();
      if (!csrf) return { ok: false, reason: "取不到 csrf（bili_jct）" };
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
      } catch (e: any) {
        return { ok: false, reason: e.message };
      }
    });
  }

  /**
   * 获取视频详情与分P信息
   */
  public async getVideoView(bvid: string): Promise<any> {
    return this.api<any>(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`);
  }

  /**
   * 获取视频播放流与音频流地址
   */
  public async getPlayUrl(bvid: string, cid: number | string): Promise<any> {
    return this.api<any>(
      `https://api.bilibili.com/x/player/wbi/playurl?bvid=${encodeURIComponent(bvid)}&cid=${cid}&qn=64&fnval=1`
    );
  }

  /**
   * 获取视频外挂字幕或 AI 智能字幕列表
   */
  public async getVideoSubtitles(bvid: string, cid: number | string): Promise<any[]> {
    const data = await this.api<any>(
      `https://api.bilibili.com/x/player/v2?bvid=${encodeURIComponent(bvid)}&cid=${cid}`
    );
    return data?.subtitle?.subtitles || [];
  }

  /**
   * 获取并缓存 Wbi 签名密钥
   */
  public async getWbiKeys(signal?: AbortSignal): Promise<{ ik: string; sk: string }> {
    signal?.throwIfAborted();
    const now = Date.now();
    if (this.wbiKeysCache && this.wbiKeysCache.expire > now) {
      return { ik: this.wbiKeysCache.ik, sk: this.wbiKeysCache.sk };
    }
    const nav = await this.api<any>("https://api.bilibili.com/x/web-interface/nav", { signal });
    signal?.throwIfAborted();
    const ik = nav?.wbi_img?.img_url?.split("/").pop()?.split(".")[0] || "";
    const sk = nav?.wbi_img?.sub_url?.split("/").pop()?.split(".")[0] || "";
    if (!ik || !sk) {
      throw new Error("无法获取 B 站 WBI 鉴权密钥");
    }
    this.wbiKeysCache = { ik, sk, expire: now + 3600 * 1000 };
    return { ik, sk };
  }

  /**
   * 获取指定清晰度的视频/音频直链播放流 (支持逐级清晰度自动降阶重试与 WBI 签名直链备用获取)
   */
  public async fetchPlayStream(
    bvid: string,
    cid: number | string,
    preferredQn = 64
  ): Promise<{ sources: string[]; quality: number; acceptQuality: number[]; acceptDescription: string[] }> {
    const qnQueue = Array.from(new Set([preferredQn, 64, 32, 16]));
    let lastData: any = null;
    let validSources: string[] = [];
    let resolvedQuality = preferredQn;

    const extractSources = (data: any): string[] => {
      if (!data) return [];
      const durl = Array.isArray(data.durl) ? data.durl : (Array.isArray(data.result?.durl) ? data.result.durl : []);
      const urls: string[] = [];
      for (const item of durl) {
        if (item?.url) urls.push(String(item.url));
        if (Array.isArray(item?.backup_url)) {
          for (const b of item.backup_url) {
            if (b) urls.push(String(b));
          }
        }
      }
      return Array.from(new Set(urls.filter(Boolean))).map((u) => u.replace(/^http:/, "https:"));
    };

    // 1. 常规接口尝试 (逐级清晰度重试，禁用 fourk 避免权限阻断)
    for (const qn of qnQueue) {
      try {
        const idParam = bvid ? `bvid=${encodeURIComponent(bvid)}` : "";
        const play = await this.api<any>(
          `https://api.bilibili.com/x/player/playurl?${idParam}&cid=${cid}&qn=${qn}&fnval=1&fourk=0&platform=html5&high_quality=1`
        );
        const sources = extractSources(play);
        if (sources.length > 0) {
          lastData = play;
          validSources = sources;
          resolvedQuality = Number(play?.quality || qn);
          break;
        }
      } catch {
        // 继续下一清晰度重试
      }
    }

    // 2. 如果常规 playurl 未能提取到直链，尝试使用 WBI 签名请求
    if (!validSources.length) {
      for (const qn of [preferredQn, 64, 32]) {
        try {
          const { ik, sk } = await this.getWbiKeys();
          const params: Record<string, any> = { cid, qn, fnval: 1, fourk: 0 };
          if (bvid) params.bvid = bvid;
          const { signedQuery } = calculateWbiSign(params, ik, sk);
          const wbiPlay = await this.api<any>(
            `https://api.bilibili.com/x/player/wbi/playurl?${signedQuery}`
          );
          const sources = extractSources(wbiPlay);
          if (sources.length > 0) {
            lastData = wbiPlay;
            validSources = sources;
            resolvedQuality = Number(wbiPlay?.quality || qn);
            break;
          }
        } catch {
          // 忽略并继续
        }
      }
    }

    if (!validSources.length) {
      throw new Error("未能获取到有效视频直链播放流");
    }

    return {
      sources: validSources,
      quality: resolvedQuality,
      acceptQuality: lastData?.accept_quality || [80, 64, 32, 16],
      acceptDescription: lastData?.accept_description || ["1080P 高清", "720P 高清", "480P 清晰", "360P 流畅"]
    };
  }

  /**
   * 现代化多源视频流与分P信息自洽解析
   */
  public async resolvePlayStream(
    video: {
      bvid?: string;
      aid?: string | number;
      cid?: number | string;
      title?: string;
      cover?: string;
      cachedSourceUrl?: string;
      preferredQuality?: number;
      owner?: string;
      author?: string;
      face?: string;
      ownerFace?: string;
      desc?: string;
      views?: number;
      danmaku?: number;
      likes?: number;
    },
    preferredPage = 1
  ): Promise<BiliPlayStreamResult> {
    if (video.cachedSourceUrl) {
      return {
        title: video.title || video.bvid || "本地缓存视频",
        poster: video.cover || "",
        sources: [video.cachedSourceUrl],
        aid: video.aid || null,
        bvid: video.bvid || "",
        cid: null,
        cached: true,
        owner: video.owner || video.author || "UP主",
        ownerFace: video.ownerFace || video.face || "",
        ownerMid: null,
        pubdate: 0,
        desc: video.desc || "本地缓存视频",
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

    // 规范化 BV/AV 标识：只有 "BV" 开头的才是有效 bvid，其余走 aid 路径
    const rawBvid = String(video.bvid || "").trim();
    const rawAid = String(video.aid || "").trim();
    const cleanBvid = rawBvid.startsWith("BV") ? rawBvid : "";
    const cleanAid = rawAid.replace(/^av/i, "") || (!rawBvid.startsWith("BV") ? rawBvid.replace(/^av/i, "") : "");
    const queryParam = cleanBvid ? `bvid=${encodeURIComponent(cleanBvid)}` : `aid=${encodeURIComponent(cleanAid)}`;
    let data: any = null;
    try {
      data = await this.api<any>(`https://api.bilibili.com/x/web-interface/view?${queryParam}`);
    } catch {
      // 容错处理
    }

    const resolvedBvid = data?.bvid || "";
    const bvid = resolvedBvid.startsWith("BV") ? resolvedBvid : (cleanBvid || "");
    const rawPages: any[] = Array.isArray(data?.pages) ? data.pages : [];
    const pages: BiliVideoPage[] = rawPages.map((p: any) => ({
      cid: p.cid,
      page: p.page,
      part: p.part || `第${p.page}集`,
      duration: p.duration || 0
    }));

    const targetPageIdx = pages.findIndex((p) => p.page === preferredPage);
    const activePageObj = targetPageIdx >= 0 ? pages[targetPageIdx] : (pages[0] || null);
    const activeCid = activePageObj?.cid || data?.cid || video.cid;
    if (!activeCid) {
      throw new Error("无法获取视频 CID 标识");
    }

    const initialQn = Number(video.preferredQuality || 64);
    const streamInfo = await this.fetchPlayStream(bvid, activeCid, initialQn);

    return {
      title: data?.title || video.title || bvid,
      poster: String(data?.pic || video.cover || "").replace(/^http:/, "https:"),
      sources: streamInfo.sources,
      aid: data?.aid || video.aid || null,
      bvid,
      cid: activeCid || null,
      owner: data?.owner?.name || video.owner || video.author || "UP主",
      ownerFace: data?.owner?.face ? String(data.owner.face).replace(/^http:/, "https:") : (video.ownerFace || video.face || ""),
      ownerMid: data?.owner?.mid || null,
      pubdate: data?.pubdate || 0,
      desc: data?.desc || video.desc || "暂无简介",
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
  }

  /**
   * 纯数据拉取并深度解析视频字幕轨道 (支持 WBI 签名鉴权与多语言挑选)
   */
  public async fetchVideoSubtitleDetails(
    bvid: string,
    targetCid?: number | string,
    signal?: AbortSignal
  ): Promise<BiliSubtitleDetailResult> {
    signal?.throwIfAborted();
    const view = await this.api<any>(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`, { signal });
    signal?.throwIfAborted();
    if (signal && !view?.cid) throw new Error("无法读取视频详情，请重试");
    if (!view?.cid) return { ok: false, reason: "视频不存在或未登录", cues: [] };
    const rawPages = Array.isArray(view?.pages) ? view.pages : [];
    const activePageObj = targetCid ? rawPages.find((p: any) => p.cid === targetCid) : null;
    const cid = targetCid || view.cid;
    const partTitle = activePageObj?.part ? ` · P${activePageObj.page} ${activePageObj.part}` : "";

    const { ik, sk } = await this.getWbiKeys(signal);
    signal?.throwIfAborted();
    const { signedQuery } = calculateWbiSign({ bvid, cid }, ik, sk);
    const pj = await this.api<any>(`https://api.bilibili.com/x/player/wbi/v2?${signedQuery}`, { signal });
    signal?.throwIfAborted();
    if (signal && !Array.isArray(pj?.subtitle?.subtitles)) throw new Error("字幕轨道返回异常或当前账号无权读取");
    const subs: any[] = pj?.subtitle?.subtitles || [];
    if (!subs.length) {
      return { ok: false, reason: `该视频${partTitle ? "（" + partTitle.trim() + "）" : ""}没有可用字幕`, cues: [] };
    }

    const pick = subs.find((s: any) => /zh|中文|汉语|漢語/i.test((s.lan || "") + " " + (s.lan_doc || ""))) || subs[0];
    const rawUrl = pick.subtitle_url || "";
    const subUrl = rawUrl.startsWith("//") ? `https:${rawUrl}` : (rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);

    const subR = await fetch(subUrl, { signal, credentials: "include", headers: { Accept: "application/json" } });
    if (!subR.ok) throw new Error(`字幕获取失败: ${subR.status}`);
    const subBuf = await subR.arrayBuffer();
    signal?.throwIfAborted();
    let subJ: any;
    try {
      subJ = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(subBuf));
    } catch {
      try {
        subJ = JSON.parse(new TextDecoder("gb18030").decode(subBuf));
      } catch {
        subJ = JSON.parse(new TextDecoder("big5").decode(subBuf));
      }
    }

    if (signal && !Array.isArray(subJ?.body)) throw new Error("字幕正文格式异常");
    const body: any[] = subJ?.body || [];
    const cues: BiliSubtitleCue[] = body.map((item: any, idx: number) => ({
      id: `${item.from || 0}_${idx}`,
      from: Number(item.from || 0),
      to: Number(item.to || item.from || 0),
      content: String(item.content || "").trim()
    })).filter((c) => c.content);

    const fullTitle = (view.title || bvid) + partTitle;
    const meta: string[] = [];
    meta.push("标题：" + fullTitle);
    meta.push("字幕轨道：" + subs.map((s: any) => s.lan_doc || s.lan || "未知").join(" / ") + "（已选：" + (pick.lan_doc || pick.lan || "默认") + "）");
    if (view.owner?.name) meta.push("UP主：" + view.owner.name);
    if (view.pubdate) {
      const d = new Date(view.pubdate * 1000);
      meta.push(`发布时间：${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    }
    meta.push("链接：https://www.bilibili.com/video/" + bvid + (activePageObj?.page ? `?p=${activePageObj.page}` : ""));

    const bodyText = cues.map((c) => c.content).join("\r\n");
    const headText = meta.join("\r\n") + "\r\n\r\n———— 字幕正文 ————\r\n\r\n";

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
  public async fetchSubtitleCues(subtitleUrl: string): Promise<BiliSubtitleCue[]> {
    if (!subtitleUrl) return [];
    const targetUrl = subtitleUrl.startsWith("//") ? `https:${subtitleUrl}` : subtitleUrl;
    const res = await fetch(targetUrl);
    if (!res.ok) throw new Error(`字幕获取失败: ${res.statusText}`);
    const json = await res.json();
    const body = json.body || [];
    return body.map((item: any) => ({
      from: Number(item.from || 0),
      to: Number(item.to || 0),
      content: String(item.content || "").trim()
    }));
  }

  /**
   * 分页获取视频评论区列表
   */
  public async getVideoComments(
    aid: number | string,
    pn = 1,
    ps = 20,
    sort = 2
  ): Promise<{ comments: BiliCommentItem[]; total: number; hasMore: boolean }> {
    const data = await this.api<any>(
      `https://api.bilibili.com/x/v2/reply?type=1&oid=${aid}&pn=${pn}&ps=${ps}&sort=${sort}`
    );
    const repliesRaw = data?.replies || [];
    const pageObj = data?.page || {};
    const total = Number(pageObj.count || 0);

    const comments: BiliCommentItem[] = repliesRaw.map((r: any) => {
      const emotes: Record<string, string> = {};
      if (r.content?.emote && typeof r.content.emote === "object") {
        for (const [key, val] of Object.entries(r.content.emote)) {
          const u = (val as any)?.url;
          if (typeof u === "string" && u) {
            emotes[key] = u.replace(/^http:/, "https:");
          }
        }
      }
      const subReplies = Array.isArray(r.replies)
        ? r.replies.map((sub: any) => ({
            rpid: sub.rpid,
            mid: Number(sub.mid || 0),
            uname: String(sub.member?.uname || "B站用户"),
            avatar: String(sub.member?.avatar || "").replace(/^http:/, "https:"),
            message: String(sub.content?.message || ""),
            timeText: new Date(Number(sub.ctime || 0) * 1000).toLocaleString(),
            like: Number(sub.like || 0)
          }))
        : [];
      return {
        rpid: r.rpid,
        mid: Number(r.mid || 0),
        uname: String(r.member?.uname || "匿名用户"),
        avatar: String(r.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(r.content?.message || ""),
        timeText: new Date(Number(r.ctime || 0) * 1000).toLocaleString(),
        like: Number(r.like || 0),
        rcount: Number(r.rcount || 0),
        pictures: (r.content?.pictures || []).map((p: any) => String(p.img_src || "").replace(/^http:/, "https:")),
        emotes,
        replies: subReplies
      };
    });

    return {
      comments,
      total,
      hasMore: pn * ps < total
    };
  }

  /**
   * 分页获取某条根评论下的子回复（楼中楼）
   */
  public async getSubReplies(
    aid: number | string,
    rootRpid: number | string,
    pn = 1,
    ps = 10
  ): Promise<{ replies: BiliCommentItem[]; total: number; hasMore: boolean }> {
    const data = await this.api<any>(
      `https://api.bilibili.com/x/v2/reply/reply?type=1&oid=${aid}&root=${rootRpid}&pn=${pn}&ps=${ps}`
    );
    const repliesRaw = data?.replies || [];
    const pageObj = data?.page || {};
    const total = Number(pageObj.count || 0);

    const replies: BiliCommentItem[] = repliesRaw.map((r: any) => {
      const emotes: Record<string, string> = {};
      if (r.content?.emote && typeof r.content.emote === "object") {
        for (const [key, val] of Object.entries(r.content.emote)) {
          const u = (val as any)?.url;
          if (typeof u === "string" && u) {
            emotes[key] = u.replace(/^http:/, "https:");
          }
        }
      }
      return {
        rpid: r.rpid,
        mid: Number(r.mid || 0),
        uname: String(r.member?.uname || "B站用户"),
        avatar: String(r.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(r.content?.message || ""),
        timeText: new Date(Number(r.ctime || 0) * 1000).toLocaleString(),
        like: Number(r.like || 0),
        emotes
      };
    });

    return {
      replies,
      total,
      hasMore: pn * ps < total
    };
  }

  /**
   * 获取视频全量弹幕 XML 并解析为结构化列表
   */
  public async getVideoDanmaku(cid: number | string): Promise<BiliDanmakuItem[]> {
    if (!cid) return [];
    try {
      // 优先从 comment.bilibili.com 请求 XML 格式弹幕，免鉴权且包含完整分段
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
        } catch (_) {}
      }
      if (!xmlText) return [];

      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlText, "text/xml");
      const dNodes = doc.querySelectorAll("d");
      const list: BiliDanmakuItem[] = [];

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

      // 按视频内时间戳升序排序
      list.sort((a, b) => a.time - b.time);
      return list;
    } catch (err) {
      console.warn("[BiliService] 弹幕解析失败:", err);
      return [];
    }
  }

  /**
   * 格式化毫秒或秒为 mm:ss
   */
  public formatDuration(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }
}

export const bilibiliService = BilibiliService.getInstance();
export const bilibiliFavoritesManager = BilibiliFavoritesTreeManager.getInstance();
