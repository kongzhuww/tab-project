(() => {
  // src/workers/bookmarks.worker.ts
  var PINYIN_DICT = {
    \u54D4: "bi",
    \u54E9: "li",
    \u77E5: "zhi",
    \u4E4E: "hu",
    \u6DD8: "tao",
    \u5B9D: "bao",
    \u4EAC: "jing",
    \u4E1C: "dong",
    \u767E: "bai",
    \u5EA6: "du",
    \u817E: "teng",
    \u8BAF: "xun",
    \u6B4C: "ge",
    \u8C37: "gu",
    \u7F51: "wang",
    \u6613: "yi",
    \u6296: "dou",
    \u97F3: "yin",
    \u8D34: "tie",
    \u5427: "ba",
    \u7B80: "jian",
    \u4E66: "shu",
    \u6398: "jue",
    \u91D1: "jin",
    \u8C46: "dou",
    \u74E3: "ban",
    \u4F18: "you",
    \u9177: "ku",
    \u7231: "ai",
    \u5947: "qi",
    \u827A: "yi",
    \u864E: "hu",
    \u7259: "ya",
    \u6597: "dou",
    \u9C7C: "yu",
    \u5FAE: "wei",
    \u535A: "bo",
    \u4FE1: "xin",
    \u8BED: "yu",
    \u96C0: "que",
    \u98DE: "fei",
    \u9489: "ding",
    \u5C0F: "xiao",
    \u9ED1: "hei",
    \u76D2: "he",
    \u7AD9: "zhan",
    \u793E: "she",
    \u533A: "qu",
    \u8BBA: "lun",
    \u575B: "tan",
    \u95EE: "wen",
    \u7B54: "da",
    \u6587: "wen",
    \u6863: "dang",
    \u5E93: "ku",
    \u4ED3: "cang",
    \u4EE3: "dai",
    \u7801: "ma",
    \u5DE5: "gong",
    \u5177: "ju",
    \u67E5: "cha",
    \u8BE2: "xun",
    \u627E: "zhao",
    \u7FFB: "fan",
    \u8BD1: "yi",
    \u7B14: "bi",
    \u8BB0: "ji",
    \u5907: "bei",
    \u5FD8: "wang",
    \u5F55: "lu",
    \u5386: "li",
    \u53F2: "shi",
    \u76D8: "pan",
    \u4E91: "yun",
    \u6D4B: "ce",
    \u8BD5: "shi",
    \u6E38: "you",
    \u620F: "xi",
    \u7535: "dian",
    \u8111: "nao",
    \u624B: "shou",
    \u673A: "ji",
    \u5546: "shang",
    \u57CE: "cheng",
    \u8D2D: "gou",
    \u7269: "wu",
    \u652F: "zhi",
    \u4ED8: "fu",
    \u94F6: "yin",
    \u884C: "hang",
    \u5730: "di",
    \u56FE: "tu",
    \u9AD8: "gao",
    \u5FB7: "de",
    \u5929: "tian",
    \u6C14: "qi",
    \u65E5: "ri",
    \u90AE: "you",
    \u7BB1: "xiang",
    \u89C6: "shi",
    \u9891: "pin",
    \u7247: "pian",
    \u76F4: "zhi",
    \u64AD: "bo",
    \u65B0: "xin",
    \u95FB: "wen",
    \u8D44: "zi",
    \u5A92: "mei",
    \u5B66: "xue",
    \u4E60: "xi",
    \u8BFE: "ke",
    \u7A0B: "cheng",
    \u5927: "da",
    \u4E2D: "zhong",
    \u56FD: "guo",
    \u5B98: "guan",
    \u5BB6: "jia",
    \u516C: "gong",
    \u53F8: "si",
    \u5F00: "kai",
    \u53D1: "fa",
    \u8005: "zhe",
    \u5F15: "yin",
    \u64CE: "qing",
    \u524D: "qian",
    \u7AEF: "duan",
    \u540E: "hou",
    \u8BBE: "she",
    \u8BA1: "ji",
    \u6A21: "mo",
    \u578B: "xing",
    \u667A: "zhi",
    \u80FD: "neng",
    \u8A00: "yan",
    \u751F: "sheng",
    \u6210: "cheng",
    \u58C1: "bi",
    \u7EB8: "zhi",
    \u4E50: "yue",
    \u653E: "fang",
    \u5668: "qi"
  };
  function getCharInitial(char) {
    if (!char) return "";
    if (/[a-zA-Z0-9]/.test(char)) return char.toLowerCase();
    if (PINYIN_DICT[char]) return PINYIN_DICT[char][0];
    const bounds = [
      ["a", "\u554A"],
      ["b", "\u82AD"],
      ["c", "\u64E6"],
      ["d", "\u642D"],
      ["e", "\u86FE"],
      ["f", "\u53D1"],
      ["g", "\u5676"],
      ["h", "\u54C8"],
      ["j", "\u51FB"],
      ["k", "\u5580"],
      ["l", "\u5783"],
      ["m", "\u5988"],
      ["n", "\u62FF"],
      ["o", "\u54E6"],
      ["p", "\u556A"],
      ["q", "\u671F"],
      ["r", "\u7136"],
      ["s", "\u6492"],
      ["t", "\u584C"],
      ["w", "\u6316"],
      ["x", "\u6614"],
      ["y", "\u538B"],
      ["z", "\u531D"]
    ];
    try {
      for (let i = bounds.length - 1; i >= 0; i--) {
        if (char.localeCompare(bounds[i][1], "zh-Hans-CN") >= 0) {
          return bounds[i][0];
        }
      }
    } catch {
    }
    return "";
  }
  function getCharPinyin(char) {
    if (!char) return "";
    if (/[a-zA-Z0-9]/.test(char)) return char.toLowerCase();
    return PINYIN_DICT[char] || getCharInitial(char);
  }
  function buildSearchIndex(text) {
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
  function matchScore(targetText, query) {
    if (!query) return 1;
    const q = query.toLowerCase().trim();
    const { lower, pinyinAcronym, pinyinFull } = buildSearchIndex(targetText);
    if (lower === q) return 1e3;
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
  var indexedBookmarks = [];
  function flattenBookmarkTree(nodes, path = [], out = []) {
    for (const node of nodes || []) {
      const curPath = node.title ? [...path, node.title] : path;
      if (node.url && !node.url.startsWith("javascript:")) {
        const { lower, pinyinAcronym, pinyinFull } = buildSearchIndex(node.title || "");
        out.push({
          id: String(node.id),
          title: String(node.title || node.url),
          url: String(node.url),
          folder: curPath.slice(0, -1).join(" / ") || "\u4E66\u7B7E",
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
  function matchItemScore(item, query) {
    if (!query) return 1;
    const q = query.toLowerCase().trim();
    const { lower, pinyinAcronym, pinyinFull, url } = item;
    if (lower === q) return 1e3;
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
  function searchBookmarksList(items, query, limit = 50) {
    if (!query) return items.slice(0, limit);
    const scored = [];
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
  if (typeof self !== "undefined" && typeof self.postMessage === "function") {
    self.addEventListener("message", (event) => {
      const { id, type, payload } = event.data || {};
      try {
        if (type === "INDEX_BOOKMARKS") {
          const tree = Array.isArray(payload?.tree) ? payload.tree : [payload?.tree].filter(Boolean);
          indexedBookmarks = flattenBookmarkTree(tree);
          self.postMessage({
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
          if (Array.isArray(items) && items.length > 0) {
            const result2 = searchBookmarksList(items, q, max);
            self.postMessage({ id, type, result: result2 });
            return;
          }
          if (!q) {
            self.postMessage({ id, type, result: indexedBookmarks.slice(0, max) });
            return;
          }
          const scored = [];
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
          self.postMessage({ id, type, result });
          return;
        }
        if (type === "STATS") {
          self.postMessage({
            id,
            type,
            result: { count: indexedBookmarks.length, ready: true }
          });
          return;
        }
        self.postMessage({ id, type, error: `Unknown worker message type: ${type}` });
      } catch (err) {
        self.postMessage({ id, type, error: err?.message || String(err) });
      }
    });
  }
})();
