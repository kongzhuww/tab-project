import { N as $ } from "./vendor-vue-_upDT3S_.js";
import { s as S } from "./storage-cache.service-BYF2zxXX.js";
const y = $({
  currentView: "feed",
  leaderboard: [],
  leaderboardSearch: "",
  leaderboardProvider: "",
  feedArticles: [],
  feedCategory: "",
  feedWindow: "24h",
  dailyReport: null,
  dailyArchives: [],
  dailyArchiveWarning: "",
  activeDailyDate: "",
  isLoading: !1,
  errorMessage: "",
  statusMessage: ""
}), x = /* @__PURE__ */ new Set(), u = {
  get state() {
    return y;
  },
  updateState(h) {
    (h.leaderboard || h.feedArticles || h.dailyReport) && h.errorMessage === void 0 && (h.errorMessage = ""), Object.assign(y, h);
  },
  switchView(h) {
    y.currentView = h, this.dispatch("switch-view", h);
  },
  refresh() {
    this.dispatch("refresh");
  },
  setLeaderboard(h) {
    y.leaderboard = h;
  },
  setFeedArticles(h) {
    y.feedArticles = h;
  },
  setDailyReport(h, t = []) {
    y.dailyReport = h, t.length && (y.dailyArchives = t);
  },
  onAction(h) {
    return x.add(h), () => {
      x.delete(h);
    };
  },
  dispatch(h, t) {
    for (const s of x)
      try {
        s(h, t);
      } catch (n) {
        console.error("[AihotFeed] Action error:", n);
      }
  }
}, M = "https://aihot.news", C = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function _(h) {
  if (typeof DOMParser > "u") return [];
  const t = new DOMParser().parseFromString(h, "text/html"), s = [];
  for (const n of t.querySelectorAll("table")) {
    const a = n.querySelectorAll("tbody tr[data-slug]");
    if (!a.length) continue;
    const e = Array.from(n.querySelectorAll("thead th"), (c) => (c.textContent || "").replace(/\s+/g, "")), r = e.findIndex((c) => c.includes("输入价格")), d = e.findIndex((c) => c.includes("输出价格")), o = e.findIndex((c) => c.includes("AIHOT评分"));
    if (!(o < 0)) {
      for (const c of a) {
        const i = c.getAttribute("data-slug") || "", l = c.querySelectorAll(":scope > td");
        if (!C.test(i) || l.length <= o) continue;
        const f = l[1]?.querySelector("a strong")?.textContent?.trim() || "", p = l[1]?.querySelector("small")?.textContent?.trim() || "", A = l[0]?.textContent?.trim() || "", w = l[o]?.querySelector("strong")?.textContent?.trim() || "";
        if (!f || !/^\d+$/.test(A) || !w) continue;
        const b = (v) => v < 0 ? "-" : l[v]?.textContent?.trim() || "-";
        s.push({
          href: `${M}/leaderboard/${i}`,
          rank: String(Number(A)),
          model: f,
          provider: p,
          releaseDate: c.querySelector("time")?.textContent?.trim() || "",
          inputPrice: b(r),
          outputPrice: b(d),
          score: w
        });
      }
      if (s.length) break;
    }
  }
  return s;
}
function k(h) {
  if (h === null) return null;
  const t = h;
  if (!t || typeof t.date != "string" || !Array.isArray(t.sections)) throw new Error("日报响应格式不匹配");
  const s = t.sections.map((n) => {
    if (!n || typeof n.label != "string" || !Array.isArray(n.items)) throw new Error("日报分组格式不匹配");
    return { label: n.label, items: n.items.map((a) => {
      if (!a || typeof a.title != "string") throw new Error("日报条目格式不匹配");
      const e = a.links?.aihot || a.links?.original || a.url || "";
      if (typeof e != "string" || !/^https?:\/\//i.test(e)) throw new Error("日报条目链接格式不匹配");
      const r = e.match(/\/items\/([^/?#]+)/);
      return { id: String(a.id || r?.[1] || e), title: a.title, summary: typeof a.summary == "string" ? a.summary : "", sourceName: a.source?.name || a.sourceName || "AI 资讯", published: a.publishedAt || a.published || "", url: e, raw: a };
    }) };
  });
  return {
    date: t.date,
    leadTitle: typeof t.lead?.title == "string" ? t.lead.title : typeof t.leadTitle == "string" ? t.leadTitle : "",
    leadParagraph: typeof t.lead?.leadParagraph == "string" ? t.lead.leadParagraph : typeof t.leadParagraph == "string" ? t.leadParagraph : "",
    links: typeof t.links?.aihot == "string" && /^https?:\/\//i.test(t.links.aihot) ? { aihot: t.links.aihot } : void 0,
    sections: s
  };
}
function P(h) {
  const t = h?.items;
  if (!Array.isArray(t)) throw new Error("日报历史列表格式不匹配");
  return t.filter((s) => typeof s?.date == "string" && /^\d{4}-\d{2}-\d{2}$/.test(s.date)).map((s) => ({ date: s.date }));
}
const g = "https://aihot.news/api/v1", q = [
  "aside",
  "nav",
  "script",
  "style",
  "link",
  "meta",
  "iframe",
  "object",
  "embed",
  "form",
  "button",
  "input",
  "select",
  "textarea",
  ".dt-aside",
  ".dt-outline",
  ".dt-outline-list",
  ".detail-mobile-only",
  ".detail-reading-tail",
  ".dt-tags-wrap",
  ".dt-share-wrap",
  "[data-detail-aside]",
  ".dt-detail-reason"
].join(", ");
class m {
  constructor() {
    this.owner = null, this.request = null, this.attempted = /* @__PURE__ */ new Set(), this.displayed = /* @__PURE__ */ new Map(), this.aihotArticleCache = /* @__PURE__ */ new Map(), this.pendingArticleRequests = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    return m.instance || (m.instance = new m()), m.instance;
  }
  activate(t) {
    this.owner !== t && (this.pause(), this.owner = t, this.detachActions = u.onAction((s, n) => {
      s === "switch-view" ? this.switchView(n) : s === "refresh" ? this.refresh() : s === "change-category" || s === "change-window" ? this.loadFeed() : s === "select-daily-date" && this.loadDaily(n);
    }), this.attempted.has(this.currentKey()) || this.loadCurrent());
  }
  pause(t) {
    t && this.owner !== t || (this.detachActions?.(), this.detachActions = void 0, this.owner = null, this.cancelRead());
  }
  cancelRead() {
    const t = this.request;
    this.request = null, t && (clearTimeout(t.timer), t.controller.abort(), this.attempted.delete(t.key), u.updateState({ isLoading: !1, statusMessage: "读取已暂停，重新进入后继续。" }));
  }
  currentKey() {
    const t = u.state;
    return t.currentView === "leaderboard" ? "aihot_leaderboard_items" : t.currentView === "daily" ? t.activeDailyDate ? `aihot_daily_v2_${t.activeDailyDate}` : "aihot_daily_v2_latest" : `aihot_feed_articles_${t.feedCategory || ""}_${t.feedWindow || "24h"}`;
  }
  async loadCurrent(t = !1) {
    const s = u.state;
    s.currentView === "leaderboard" ? await this.loadLeaderboard(t) : s.currentView === "daily" ? await this.loadDaily(s.activeDailyDate, t) : await this.loadFeed(t);
  }
  async switchView(t) {
    if (!(!this.owner || !["leaderboard", "feed", "daily"].includes(t))) {
      u.updateState({ currentView: t });
      try {
        localStorage.setItem("lw-info-feed-view", t);
      } catch {
      }
      await this.loadCurrent();
    }
  }
  async refresh() {
    this.owner && await this.loadCurrent(!0);
  }
  async read(t, s, n, a, e, r, d) {
    if (!this.owner || u.state.currentView !== t || this.request?.key === s) return;
    this.cancelRead();
    const o = { key: s, controller: new AbortController(), timer: void 0 };
    this.request = o, this.attempted.add(s);
    const c = () => this.request === o && !!this.owner;
    this.displayed.get(t) !== s && (t === "feed" ? u.updateState({ feedArticles: [] }) : t === "daily" && u.updateState({ dailyReport: null }), this.displayed.set(t, s)), u.updateState({ isLoading: !0, errorMessage: "", statusMessage: "正在读取…" });
    try {
      if (!n) {
        const l = await S.get(s);
        if (!c()) return;
        e(l) && (d(l), u.updateState({ statusMessage: "正在显示缓存，检查更新中…" }));
      }
      if (!c()) return;
      o.timer = setTimeout(() => o.controller.abort(), 15e3);
      const i = await r(o.controller.signal);
      if (!c()) return;
      if (o.controller.signal.throwIfAborted(), !e(i)) throw new Error("数据格式不匹配");
      d(i), S.set(s, i, { ttlMs: a }).catch(() => {
      }), u.updateState({ statusMessage: "已获取来源数据。", errorMessage: "" });
    } catch (i) {
      if (!c()) return;
      u.updateState({
        errorMessage: o.controller.signal.aborted ? "读取超时，请手动刷新重试。" : `读取失败：${i instanceof Error ? i.message : "网络异常"}。请手动刷新重试。`,
        statusMessage: "保留当前已读取的数据；没有数据时显示空列表。"
      });
    } finally {
      clearTimeout(o.timer), c() && (this.request = null, u.updateState({ isLoading: !1 }));
    }
  }
  async loadFeed(t = !1) {
    const s = u.state, n = s.feedCategory || "", a = s.feedWindow || "24h";
    await this.read(
      "feed",
      `aihot_feed_articles_${n}_${a}`,
      t,
      900 * 1e3,
      (e) => Array.isArray(e) && e.every((r) => r && typeof r.title == "string" && typeof r.url == "string" && typeof r.sourceName == "string" && typeof r.published == "string" && (r.category === void 0 || typeof r.category == "string")),
      async (e) => {
        const r = new URLSearchParams({ mode: "selected", window: a, limit: "30" });
        n && r.set("category", n);
        const d = await fetch(`${g}/items?${r}`, { headers: { Accept: "application/json" }, signal: e });
        if (!d.ok) throw new Error(`HTTP ${d.status}`);
        const o = await d.json(), c = Array.isArray(o?.items) ? o.items : Array.isArray(o?.data) ? o.data : Array.isArray(o) ? o : null;
        if (!c) throw new Error("资讯响应格式不匹配");
        return c.map((i) => {
          if (!i || typeof i != "object") throw new Error("资讯条目格式不匹配");
          let l = i.published || "最新";
          if (i.publishedAt) {
            const f = new Date(i.publishedAt);
            Number.isFinite(f.getTime()) && (l = `${String(f.getMonth() + 1).padStart(2, "0")}-${String(f.getDate()).padStart(2, "0")} ${String(f.getHours()).padStart(2, "0")}:${String(f.getMinutes()).padStart(2, "0")}`);
          }
          return {
            id: String(i.id || i.externalId || crypto.randomUUID()),
            title: i.title || i.headline || "无标题",
            originalTitle: i.originalTitle || void 0,
            summary: i.summary || i.description || "",
            sourceName: i.source?.name || i.sourceName || i.site || "AI 资讯",
            published: l,
            category: i.category || "综合",
            url: i.links?.aihot || i.links?.original || i.url || i.link || "#",
            raw: i
          };
        });
      },
      (e) => u.updateState({ feedArticles: e })
    );
  }
  async fetchQuickSelectedItems(t = 24, s) {
    const { fetchAiHotQuickSelectedItems: n } = await import("./aihot-quick-DwT3k9XG.js");
    return n(t, s, g);
  }
  parseLeaderboardHtml(t) {
    const s = _(t);
    if (s.length) return s;
    if (!t.includes("lb-model-entry")) return [];
    const n = [];
    if (typeof DOMParser < "u")
      try {
        new DOMParser().parseFromString(t, "text/html").querySelectorAll("tr").forEach((r) => {
          if (r.querySelector("th")) return;
          const d = r.querySelector(".lb-rank-number span")?.textContent?.trim() || "", o = r.querySelector("a.lb-model-entry"), c = o?.querySelector("strong")?.textContent?.trim() || "", i = o?.querySelector("small")?.textContent?.trim() || "", l = r.querySelector(".lb-release-cell time, time")?.textContent?.trim() || "", f = r.querySelectorAll(".lb-price-cell span"), p = f[1]?.textContent?.trim() || f[0]?.textContent?.trim() || "-", A = f[2]?.textContent?.trim() || "-", w = r.querySelector(".lb-score-cell strong")?.textContent?.trim() || "", b = o?.getAttribute("href") ? o.getAttribute("href").startsWith("http") ? o.getAttribute("href") : `https://aihot.news${o.getAttribute("href")}` : "https://aihot.news";
          c && n.push({ href: b, rank: d, model: c, provider: i, releaseDate: l, inputPrice: p, outputPrice: A, score: w });
        });
      } catch {
      }
    if (!n.length) {
      const a = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
      let e;
      for (; (e = a.exec(t)) !== null; ) {
        const r = e[1];
        if (r.includes("<th")) continue;
        const d = r.match(/class="lb-rank-number"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/), o = r.match(/<a class="lb-model-entry"[^>]*href="([^"]+)"/), c = r.match(/<strong>([^<]+)<\/strong>/), i = r.match(/<small>([^<]+)<\/small>/), l = r.match(/<time[^>]*>([^<]+)<\/time>/), f = r.match(/class="lb-score-cell"[^>]*><strong>([^<]+)<\/strong>/), p = [...r.matchAll(/class="lb-price-cell"[^>]*><span>([^<]+)<\/span>/g)];
        c && n.push({
          href: o ? o[1].startsWith("http") ? o[1] : `https://aihot.news${o[1]}` : "https://aihot.news",
          rank: d ? d[1].trim() : String(n.length + 1),
          model: c[1].trim(),
          provider: i ? i[1].trim() : "权威厂商",
          releaseDate: l ? l[1].trim() : "",
          inputPrice: p[1] ? p[1][1].trim() : p[0] ? p[0][1].trim() : "-",
          outputPrice: p[2] ? p[2][1].trim() : "-",
          score: f ? f[1].trim() : ""
        });
      }
    }
    return n;
  }
  async loadLeaderboard(t = !1) {
    await this.read(
      "leaderboard",
      "aihot_leaderboard_items",
      t,
      1800 * 1e3,
      (s) => Array.isArray(s) && s.every((n) => n && typeof n.model == "string" && typeof n.provider == "string"),
      async (s) => {
        const n = await fetch("https://aihot.news/leaderboard", { headers: { Accept: "text/html" }, signal: s });
        if (!n.ok) throw new Error(`HTTP ${n.status}`);
        const a = this.parseLeaderboardHtml(await n.text());
        if (!a.length) throw new Error("未识别到榜单，来源页面可能已变更");
        return a;
      },
      (s) => u.updateState({ leaderboard: s })
    );
  }
  async loadDaily(t = "", s = !1) {
    if (t && !/^\d{4}-\d{2}-\d{2}$/.test(t)) return;
    const n = t ? `aihot_daily_v2_${t}` : "aihot_daily_v2_latest";
    await this.read(
      "daily",
      n,
      s,
      3600 * 1e3,
      (a) => {
        const e = a;
        return !!e && (e.report === null || typeof e.report?.date == "string" && Array.isArray(e.report?.sections) && e.report.sections.every((r) => r && Array.isArray(r.items))) && Array.isArray(e.archives) && e.archives.every((r) => r && typeof r.date == "string") && typeof e.archiveWarning == "string";
      },
      async (a) => {
        const e = t ? `${g}/dailies/${encodeURIComponent(t)}` : `${g}/dailies/latest`, r = fetch(e, { headers: { Accept: "application/json" }, signal: a }).then(async (i) => {
          if (!i.ok) throw new Error(`HTTP ${i.status}`);
          const l = await i.json();
          if (!l || !Object.prototype.hasOwnProperty.call(l, "report")) throw new Error("日报响应格式不匹配");
          return k(l.report);
        }), d = fetch(`${g}/dailies`, { headers: { Accept: "application/json" }, signal: a }).then(async (i) => {
          if (!i.ok) throw new Error(`HTTP ${i.status}`);
          return P(await i.json());
        }), [o, c] = await Promise.allSettled([r, d]);
        if (a.throwIfAborted(), o.status === "rejected") throw o.reason;
        return { report: o.value, archives: c.status === "fulfilled" ? c.value : [...u.state.dailyArchives], archiveWarning: c.status === "rejected" ? "历史日期读取失败，可刷新重试。" : "" };
      },
      (a) => u.updateState({ dailyReport: a.report, dailyArchives: a.archives, dailyArchiveWarning: a.archiveWarning, activeDailyDate: t })
    );
  }
  async fetchArticleContent(t) {
    const s = t.id ? String(t.id) : "", n = `aihot_art_v3_${s}`;
    if (s && this.aihotArticleCache.has(s))
      return this.aihotArticleCache.get(s);
    if (s) {
      const e = await S.get(n);
      if (e)
        return this.aihotArticleCache.set(s, e), e;
    }
    if (s && this.pendingArticleRequests.has(s))
      return this.pendingArticleRequests.get(s);
    if (!s || s.startsWith("fb-")) {
      const r = `<div class="aihot-article-fallback">
        ${t.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${t.summary}</p>` : ""}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 提示：该资讯为实时要闻提炼，您可以查阅上方「AI 导读」，或点击右上角「原文 ↗」直达源网站查看完整图文报道。
        </p>
      </div>`;
      return s && this.aihotArticleCache.set(s, r), r;
    }
    const a = (async () => {
      try {
        const d = new AbortController(), o = setTimeout(() => d.abort(), 6e3), c = await fetch(`https://aihot.news/items/${s}`, {
          headers: { Accept: "text/html,application/xhtml+xml" },
          signal: d.signal
        });
        if (clearTimeout(o), !c.ok) throw new Error(`HTTP ${c.status}`);
        const i = await c.text(), l = this.extractArticleHtml(i, s);
        if (l && l.length > 20)
          return this.aihotArticleCache.set(s, l), S.set(n, l, { ttlMs: 24 * 3600 * 1e3 }), l;
      } catch (d) {
        console.warn("[AiHotService] fetch article error or timeout:", d?.message);
      }
      const r = `<div class="aihot-article-fallback">
        ${t.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${t.summary}</p>` : ""}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 正文提示：该来源站点未提供公开内联排版或响应超时。核心主旨与要点已由 AI 在上方提炼，点击右上角「原文 ↗」可前往原网站浏览完整细节。
        </p>
      </div>`;
      return this.aihotArticleCache.set(s, r), r;
    })();
    this.pendingArticleRequests.set(s, a);
    try {
      return await a;
    } finally {
      this.pendingArticleRequests.delete(s);
    }
  }
  sanitizeAndProxyArticleHtml(t) {
    if (!t) return "";
    const s = new DOMParser().parseFromString(t, "text/html");
    s.querySelectorAll(q).forEach((e) => e.remove());
    for (const e of s.body.querySelectorAll("*"))
      for (const r of Array.from(e.attributes))
        (/^on/i.test(r.name) || r.name === "srcdoc") && e.removeAttribute(r.name), ["href", "src", "xlink:href"].includes(r.name) && /^\s*(?:javascript|vbscript|data):/i.test(r.value) && e.removeAttribute(r.name);
    const n = (e) => {
      if (!e) return "";
      try {
        const r = e.match(/[?&]u=([^&]+)/);
        if (r)
          return decodeURIComponent(r[1]);
      } catch {
      }
      return e.startsWith("/") ? `https://aihot.news${e}` : e;
    }, a = (e) => e ? e.split(",").map((r) => {
      const d = r.trim();
      if (!d) return "";
      const o = d.split(/\s+/), c = o[0], i = n(c);
      return o.length > 1 ? `${i} ${o[1]}` : i;
    }).filter(Boolean).join(", ") : "";
    return s.querySelectorAll("img").forEach((e) => {
      const r = e.getAttribute("src");
      r && e.setAttribute("src", n(r));
      const d = e.getAttribute("srcset");
      d && e.setAttribute("srcset", a(d));
      const o = e.getAttribute("data-src") || e.getAttribute("data-original");
      o && (!r || r.startsWith("data:image/svg") || r.startsWith("data:image/gif")) && e.setAttribute("src", n(o)), e.setAttribute("referrerpolicy", "no-referrer"), e.setAttribute("loading", "lazy"), e.style.maxWidth = "100%", e.style.height = "auto", e.style.borderRadius = "8px";
    }), s.querySelectorAll("source").forEach((e) => {
      const r = e.getAttribute("srcset");
      r && e.setAttribute("srcset", a(r));
    }), s.querySelectorAll("a").forEach((e) => {
      const r = e.getAttribute("href");
      r && r.startsWith("/") && e.setAttribute("href", `https://aihot.news${r}`), e.setAttribute("target", "_blank"), e.setAttribute("rel", "noreferrer noopener");
    }), s.body.innerHTML.trim();
  }
  extractArticleHtml(t, s) {
    if (!t) return "";
    try {
      const n = t.match(/streamController\.enqueue\(([\s\S]*?)\);<\/script>/g);
      if (n)
        for (const a of n) {
          const e = a.match(/streamController\.enqueue\(([\s\S]*?)\);<\/script>/);
          if (!e) continue;
          const r = e[1].trim();
          try {
            const d = JSON.parse(r), o = typeof d == "string" ? JSON.parse(d) : d;
            if (Array.isArray(o)) {
              for (const c of o)
                if (typeof c == "string" && (c.includes("<figure") || c.includes("<p>")) && c.length > 50) {
                  const i = this.sanitizeAndProxyArticleHtml(c);
                  if (i.length > 30) return i;
                }
            }
          } catch {
          }
        }
    } catch {
    }
    try {
      const n = [
        ...t.matchAll(/<template[^>]*id=["']detail-rich-html-([^"']+)["'][^>]*>([\s\S]*?)<\/template>/gi)
      ];
      if (n.length > 0) {
        let a = n.find((e) => e[1] === `${s}-zh`);
        if (a || (a = n.find((e) => e[1].startsWith(s))), a || (a = n.find((e) => e[2] && e[2].trim().length > 30)), a && a[2] && a[2].trim().length > 20)
          return this.sanitizeAndProxyArticleHtml(a[2]);
      }
    } catch {
    }
    try {
      if (typeof DOMParser < "u") {
        const a = new DOMParser().parseFromString(t, "text/html");
        a.querySelectorAll(q).forEach((r) => r.remove());
        const e = [
          a.querySelector(".dt-article-content"),
          a.getElementById(`detail-article-${s}`),
          a.querySelector(".detail-content"),
          a.querySelector(".article-content"),
          a.querySelector(".prose"),
          a.querySelector("article")
        ];
        for (const r of e) {
          if (!r) continue;
          const d = this.sanitizeAndProxyArticleHtml(r.innerHTML);
          if (d.length > 30) return d;
        }
      }
    } catch {
    }
    try {
      const n = t.match(/self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/gs);
      if (n && n.length) {
        let a = "";
        for (const i of n)
          try {
            const l = i.replace(/^self\.__next_f\.push\(\[1,\s*"/, "").replace(/"\]\)$/, "");
            a += JSON.parse('"' + l + '"') + `
`;
          } catch {
            a += i + `
`;
          }
        const e = a.match(/"zh":\s*(\[[^\]]+\])/), r = a.match(/"original":\s*(\[[^\]]+\])/), d = a.match(/"dt-quoted-text[^"]*",\{"children":\s*"([^"]+)"/), o = [...a.matchAll(/"fullSrc":"([^"]+)"/g)].map((i) => i[1]), c = [];
        if (e)
          try {
            const i = JSON.parse(e[1]);
            Array.isArray(i) && i.length && c.push('<div class="aihot-rsc-tweet-zh">' + i.map((l) => `<p style="margin-bottom:12px;line-height:1.75;">${l}</p>`).join("") + "</div>");
          } catch {
          }
        if (d && d[1] && c.push(`<blockquote style="margin:12px 0;padding:10px 14px;border-left:3px solid #38bdf8;background:rgba(56,189,248,0.06);border-radius:6px;line-height:1.6;">${d[1]}</blockquote>`), o.length) {
          const i = o.map((l) => `<img src="${l.startsWith("http") ? l : "https://aihot.news" + (l.startsWith("/") ? l : "/" + l)}" style="max-width:100%;border-radius:8px;margin:8px 0;" referrerpolicy="no-referrer" loading="lazy" />`).join("");
          c.push(`<div class="aihot-rsc-media">${i}</div>`);
        }
        if (r && !e)
          try {
            const i = JSON.parse(r[1]);
            Array.isArray(i) && i.length && c.push('<div class="aihot-rsc-tweet-orig" style="color:var(--muted);">' + i.map((l) => `<p style="margin-bottom:12px;line-height:1.75;">${l}</p>`).join("") + "</div>");
          } catch {
          }
        if (c.length)
          return this.sanitizeAndProxyArticleHtml(c.join(""));
      }
    } catch {
    }
    return "";
  }
}
const T = m.getInstance(), R = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AiHotService: m,
  DEFAULT_AIHOT_API: g,
  aiHotService: T
}, Symbol.toStringTag, { value: "Module" }));
export {
  g as D,
  u as a,
  T as b,
  y as c,
  R as d
};
