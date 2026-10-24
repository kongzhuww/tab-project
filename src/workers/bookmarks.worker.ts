/**
 * LogicWeaver · Bookmarks & Launcher Fuzzy/Pinyin Search Multi-Core Web Worker (TypeScript 重构版)
 *
 * 核心算法：
 * - 汉语拼音首字母边界分词匹配
 * - 常见中文字典全拼索引
 * - 模糊加权打分匹配
 * - 网站快速分类与多核离线检索
 */

const PINYIN_DICT: Record<string, string> = {
  哔: "bi", 哩: "li", 知: "zhi", 乎: "hu", 淘: "tao", 宝: "bao",
  京: "jing", 东: "dong", 百: "bai", 度: "du", 腾: "teng", 讯: "xun",
  歌: "ge", 谷: "gu", 网: "wang", 易: "yi", 抖: "dou", 音: "yin",
  贴: "tie", 吧: "ba", 简: "jian", 书: "shu", 掘: "jue", 金: "jin",
  豆: "dou", 瓣: "ban", 优: "you", 酷: "ku", 爱: "ai", 奇: "qi",
  艺: "yi", 虎: "hu", 牙: "ya", 斗: "dou", 鱼: "yu", 微: "wei",
  博: "bo", 信: "xin", 语: "yu", 雀: "que", 飞: "fei", 钉: "ding",
  小: "xiao", 黑: "hei", 盒: "he", 站: "zhan", 社: "she", 区: "qu",
  论: "lun", 坛: "tan", 问: "wen", 答: "da", 文: "wen", 档: "dang",
  库: "ku", 仓: "cang", 代: "dai", 码: "ma", 工: "gong", 具: "ju",
  查: "cha", 询: "xun", 找: "zhao", 翻: "fan", 译: "yi", 笔: "bi",
  记: "ji", 备: "bei", 忘: "wang", 录: "lu", 历: "li", 史: "shi",
  盘: "pan", 云: "yun", 测: "ce", 试: "shi", 游: "you", 戏: "xi",
  电: "dian", 脑: "nao", 手: "shou", 机: "ji", 商: "shang", 城: "cheng",
  购: "gou", 物: "wu", 支: "zhi", 付: "fu", 银: "yin", 行: "hang",
  地: "di", 图: "tu", 高: "gao", 德: "de", 天: "tian", 气: "qi",
  日: "ri", 邮: "you", 箱: "xiang", 视: "shi", 频: "pin", 片: "pian",
  直: "zhi", 播: "bo", 新: "xin", 闻: "wen", 资: "zi", 媒: "mei",
  学: "xue", 习: "xi", 课: "ke", 程: "cheng", 大: "da", 中: "zhong",
  国: "guo", 官: "guan", 家: "jia", 公: "gong", 司: "si", 开: "kai",
  发: "fa", 者: "zhe", 引: "yin", 擎: "qing", 前: "qian", 端: "duan",
  后: "hou", 设: "she", 计: "ji", 模: "mo", 型: "xing", 智: "zhi",
  能: "neng", 言: "yan", 生: "sheng", 成: "cheng", 壁: "bi",
  纸: "zhi", 乐: "yue", 放: "fang", 器: "qi"
};

function getCharInitial(char: string): string {
  if (!char) return "";
  if (/[a-zA-Z0-9]/.test(char)) return char.toLowerCase();
  if (PINYIN_DICT[char]) return PINYIN_DICT[char][0];

  const bounds: [string, string][] = [
    ["a", "啊"], ["b", "芭"], ["c", "擦"], ["d", "搭"], ["e", "蛾"],
    ["f", "发"], ["g", "噶"], ["h", "哈"], ["j", "击"], ["k", "喀"],
    ["l", "垃"], ["m", "妈"], ["n", "拿"], ["o", "哦"], ["p", "啪"],
    ["q", "期"], ["r", "然"], ["s", "撒"], ["t", "塌"], ["w", "挖"],
    ["x", "昔"], ["y", "压"], ["z", "匝"]
  ];

  try {
    for (let i = bounds.length - 1; i >= 0; i--) {
      if (char.localeCompare(bounds[i][1], "zh-Hans-CN") >= 0) {
        return bounds[i][0];
      }
    }
  } catch {}
  return "";
}

function getCharPinyin(char: string): string {
  if (!char) return "";
  if (/[a-zA-Z0-9]/.test(char)) return char.toLowerCase();
  return PINYIN_DICT[char] || getCharInitial(char);
}

function buildSearchIndex(text: string): { lower: string; pinyinAcronym: string; pinyinFull: string } {
  const lower = String(text || "").toLowerCase();
  let pinyinAcronym = "";
  let pinyinFull = "";

  for (let i = 0; i < lower.length; i++) {
    const ch = lower[i];
    if (/[a-z0-9]/.test(ch)) {
      pinyinAcronym += ch;
      pinyinFull += ch;
    } else if (/[\u4e00-\u9fa5]/.test(ch)) {
      const init = getCharInitial(ch);
      const py = getCharPinyin(ch);
      pinyinAcronym += init;
      pinyinFull += py;
    }
  }

  return { lower, pinyinAcronym, pinyinFull };
}

function matchScore(targetText: string, query: string): number {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  const { lower, pinyinAcronym, pinyinFull } = buildSearchIndex(targetText);

  if (lower === q) return 1000;
  if (lower.startsWith(q)) return 800;
  if (lower.includes(q)) return 600 - lower.indexOf(q);

  if (pinyinAcronym.startsWith(q)) return 500;
  if (pinyinAcronym.includes(q)) return 400 - pinyinAcronym.indexOf(q);

  if (pinyinFull.startsWith(q)) return 300;
  if (pinyinFull.includes(q)) return 200 - pinyinFull.indexOf(q);

  let qIdx = 0;
  for (let i = 0; i < lower.length && qIdx < q.length; i++) {
    if (lower[i] === q[qIdx]) qIdx++;
  }
  if (qIdx === q.length) return 100;

  return 0;
}

interface IndexedBookmark {
  id: string;
  title: string;
  url: string;
  folder?: string;
  lower: string;
  pinyinAcronym: string;
  pinyinFull: string;
}

let indexedBookmarks: IndexedBookmark[] = [];

function flattenBookmarkTree(nodes: any[], path: string[] = [], out: IndexedBookmark[] = []): IndexedBookmark[] {
  for (const node of nodes || []) {
    const curPath = node.title ? [...path, node.title] : path;
    if (node.url && !node.url.startsWith("javascript:")) {
      const { lower, pinyinAcronym, pinyinFull } = buildSearchIndex(node.title || "");
      out.push({
        id: String(node.id),
        title: String(node.title || node.url),
        url: String(node.url),
        folder: curPath.slice(0, -1).join(" / ") || "书签",
        lower,
        pinyinAcronym,
        pinyinFull
      });
    }
    if (node.children) {
      flattenBookmarkTree(node.children, curPath, out);
    }
  }
  return out;
}

function matchItemScore(item: IndexedBookmark, query: string): number {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  const { lower, pinyinAcronym, pinyinFull, url } = item;

  if (lower === q) return 1000;
  if (lower.startsWith(q)) return 800;
  if (lower.includes(q)) return 600 - lower.indexOf(q);

  if (pinyinAcronym.startsWith(q)) return 500;
  if (pinyinAcronym.includes(q)) return 400 - pinyinAcronym.indexOf(q);

  if (pinyinFull.startsWith(q)) return 300;
  if (pinyinFull.includes(q)) return 200 - pinyinFull.indexOf(q);

  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes(q)) return 150 - Math.min(50, lowerUrl.indexOf(q));

  let qIdx = 0;
  for (let i = 0; i < lower.length && qIdx < q.length; i++) {
    if (lower[i] === q[qIdx]) qIdx++;
  }
  if (qIdx === q.length) return 100;

  return 0;
}

export function searchBookmarksList(items: any[], query: string, limit = 50): any[] {
  if (!query) return items.slice(0, limit);
  const scored: { item: any; score: number }[] = [];

  for (const item of items) {
    const titleScore = matchScore(item.title || "", query);
    const urlScore = matchScore(item.url || "", query) * 0.7;
    const best = Math.max(titleScore, urlScore);
    if (best > 0) {
      scored.push({ item, score: best });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}

// Web Worker 消息响应监听
if (typeof self !== "undefined" && typeof (self as any).postMessage === "function") {
  self.addEventListener("message", (event: MessageEvent) => {
    const { id, type, payload } = event.data || {};
    try {
      if (type === "INDEX_BOOKMARKS") {
        const tree = Array.isArray(payload?.tree) ? payload.tree : [payload?.tree].filter(Boolean);
        indexedBookmarks = flattenBookmarkTree(tree);
        (self as any).postMessage({
          id,
          type,
          result: { ok: true, count: indexedBookmarks.length }
        });
        return;
      }

      if (type === "SEARCH_BOOKMARKS") {
        const { items, query, limit } = payload || {};
        const q = String(query || "").trim();
        const max = Number(limit) || 30;

        // 若传入了独立 items，则临时匹配
        if (Array.isArray(items) && items.length > 0) {
          const result = searchBookmarksList(items, q, max);
          (self as any).postMessage({ id, type, result });
          return;
        }

        // 默认使用 Worker 预先建立的高性能分词索引匹配
        if (!q) {
          (self as any).postMessage({ id, type, result: indexedBookmarks.slice(0, max) });
          return;
        }

        const scored: { item: IndexedBookmark; score: number }[] = [];
        for (const item of indexedBookmarks) {
          const score = matchItemScore(item, q);
          if (score > 0) {
            scored.push({ item, score });
          }
        }

        scored.sort((a, b) => b.score - a.score);
        const result = scored.slice(0, max).map((s) => ({
          id: s.item.id,
          title: s.item.title,
          url: s.item.url,
          folder: s.item.folder
        }));

        (self as any).postMessage({ id, type, result });
        return;
      }

      if (type === "STATS") {
        (self as any).postMessage({
          id,
          type,
          result: { count: indexedBookmarks.length, ready: true }
        });
        return;
      }

      (self as any).postMessage({ id, type, error: `Unknown worker message type: ${type}` });
    } catch (err: any) {
      (self as any).postMessage({ id, type, error: err?.message || String(err) });
    }
  });
}
