import { a as d } from "./aihot-feed-store-BezpyKYJ.js";
import { s as A } from "./storage-cache.service-BYF2zxXX.js";
const v = "https://aihot.news", q = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function $(S) {
  if (typeof DOMParser > "u") return [];
  const s = new DOMParser().parseFromString(S, "text/html"), r = [];
  for (const n of s.querySelectorAll("table")) {
    const i = n.querySelectorAll("tbody tr[data-slug]");
    if (!i.length) continue;
    const t = Array.from(n.querySelectorAll("thead th"), (o) => (o.textContent || "").replace(/\s+/g, "")), e = t.findIndex((o) => o.includes("输入价格")), l = t.findIndex((o) => o.includes("输出价格")), c = t.findIndex((o) => o.includes("AIHOT评分"));
    if (!(c < 0)) {
      for (const o of i) {
        const a = o.getAttribute("data-slug") || "", h = o.querySelectorAll(":scope > td");
        if (!q.test(a) || h.length <= c) continue;
        const u = h[1]?.querySelector("a strong")?.textContent?.trim() || "", p = h[1]?.querySelector("small")?.textContent?.trim() || "", m = h[0]?.textContent?.trim() || "", y = h[c]?.querySelector("strong")?.textContent?.trim() || "";
        if (!u || !/^\d+$/.test(m) || !y) continue;
        const g = (w) => w < 0 ? "-" : h[w]?.textContent?.trim() || "-";
        r.push({
          href: `${v}/leaderboard/${a}`,
          rank: String(Number(m)),
          model: u,
          provider: p,
          releaseDate: o.querySelector("time")?.textContent?.trim() || "",
          inputPrice: g(e),
          outputPrice: g(l),
          score: y
        });
      }
      if (r.length) break;
    }
  }
  return r;
}
const b = "https://aihot.virxact.com/api/v1", x = [
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
class f {
  constructor() {
    this.owner = null, this.request = null, this.attempted = /* @__PURE__ */ new Set(), this.displayed = /* @__PURE__ */ new Map(), this.aihotArticleCache = /* @__PURE__ */ new Map(), this.pendingArticleRequests = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    return f.instance || (f.instance = new f()), f.instance;
  }
  activate(s) {
    this.owner !== s && (this.pause(), this.owner = s, this.detachActions = d.onAction((r, n) => {
      r === "switch-view" ? this.switchView(n) : r === "refresh" ? this.refresh() : r === "change-category" || r === "change-window" ? this.loadFeed() : r === "select-daily-date" && this.loadDaily(n);
    }), this.attempted.has(this.currentKey()) || this.loadCurrent());
  }
  pause(s) {
    s && this.owner !== s || (this.detachActions?.(), this.detachActions = void 0, this.owner = null, this.cancelRead());
  }
  cancelRead() {
    const s = this.request;
    this.request = null, s && (clearTimeout(s.timer), s.controller.abort(), this.attempted.delete(s.key), d.updateState({ isLoading: !1, statusMessage: "读取已暂停，重新进入后继续。" }));
  }
  currentKey() {
    const s = d.state;
    return s.currentView === "leaderboard" ? "aihot_leaderboard_items" : s.currentView === "daily" ? s.activeDailyDate ? `aihot_daily_${s.activeDailyDate}` : "aihot_daily_latest" : `aihot_feed_articles_${s.feedCategory || ""}_${s.feedWindow || "24h"}`;
  }
  async loadCurrent(s = !1) {
    const r = d.state;
    r.currentView === "leaderboard" ? await this.loadLeaderboard(s) : r.currentView === "daily" ? await this.loadDaily(r.activeDailyDate, s) : await this.loadFeed(s);
  }
  async switchView(s) {
    if (!(!this.owner || !["leaderboard", "feed", "daily"].includes(s))) {
      d.updateState({ currentView: s });
      try {
        localStorage.setItem("lw-info-feed-view", s);
      } catch {
      }
      await this.loadCurrent();
    }
  }
  async refresh() {
    this.owner && await this.loadCurrent(!0);
  }
  async read(s, r, n, i, t, e, l) {
    if (!this.owner || d.state.currentView !== s || this.request?.key === r) return;
    this.cancelRead();
    const c = { key: r, controller: new AbortController(), timer: void 0 };
    this.request = c, this.attempted.add(r);
    const o = () => this.request === c && !!this.owner;
    this.displayed.get(s) !== r && (s === "feed" ? d.updateState({ feedArticles: [] }) : s === "daily" && d.updateState({ dailyReport: null }), this.displayed.set(s, r)), d.updateState({ isLoading: !0, errorMessage: "", statusMessage: "正在读取…" });
    try {
      if (!n) {
        const h = await A.get(r);
        if (!o()) return;
        t(h) && (l(h), d.updateState({ statusMessage: "正在显示缓存，检查更新中…" }));
      }
      if (!o()) return;
      c.timer = setTimeout(() => c.controller.abort(), 15e3);
      const a = await e(c.controller.signal);
      if (!o()) return;
      if (c.controller.signal.throwIfAborted(), !t(a)) throw new Error("数据格式不匹配");
      l(a), A.set(r, a, { ttlMs: i }).catch(() => {
      }), d.updateState({ statusMessage: "已获取来源数据。", errorMessage: "" });
    } catch (a) {
      if (!o()) return;
      d.updateState({
        errorMessage: c.controller.signal.aborted ? "读取超时，请手动刷新重试。" : `读取失败：${a instanceof Error ? a.message : "网络异常"}。请手动刷新重试。`,
        statusMessage: "保留当前已读取的数据；没有数据时显示空列表。"
      });
    } finally {
      clearTimeout(c.timer), o() && (this.request = null, d.updateState({ isLoading: !1 }));
    }
  }
  async loadFeed(s = !1) {
    const r = d.state, n = r.feedCategory || "", i = r.feedWindow || "24h";
    await this.read(
      "feed",
      `aihot_feed_articles_${n}_${i}`,
      s,
      900 * 1e3,
      (t) => Array.isArray(t) && t.every((e) => e && typeof e.title == "string" && typeof e.url == "string" && typeof e.sourceName == "string" && typeof e.published == "string" && (e.category === void 0 || typeof e.category == "string")),
      async (t) => {
        const e = new URLSearchParams({ mode: "selected", window: i, limit: "30" });
        n && e.set("category", n);
        const l = await fetch(`${b}/items?${e}`, { headers: { Accept: "application/json" }, signal: t });
        if (!l.ok) throw new Error(`HTTP ${l.status}`);
        const c = await l.json(), o = Array.isArray(c?.items) ? c.items : Array.isArray(c?.data) ? c.data : Array.isArray(c) ? c : null;
        if (!o) throw new Error("资讯响应格式不匹配");
        return o.map((a) => {
          if (!a || typeof a != "object") throw new Error("资讯条目格式不匹配");
          let h = a.published || "最新";
          if (a.publishedAt) {
            const u = new Date(a.publishedAt);
            Number.isFinite(u.getTime()) && (h = `${String(u.getMonth() + 1).padStart(2, "0")}-${String(u.getDate()).padStart(2, "0")} ${String(u.getHours()).padStart(2, "0")}:${String(u.getMinutes()).padStart(2, "0")}`);
          }
          return {
            id: String(a.id || a.externalId || crypto.randomUUID()),
            title: a.title || a.headline || "无标题",
            originalTitle: a.originalTitle || void 0,
            summary: a.summary || a.description || "",
            sourceName: a.source?.name || a.sourceName || a.site || "AI 资讯",
            published: h,
            category: a.category || "综合",
            url: a.links?.aihot || a.links?.original || a.url || a.link || "#",
            raw: a
          };
        });
      },
      (t) => d.updateState({ feedArticles: t })
    );
  }
  parseLeaderboardHtml(s) {
    const r = $(s);
    if (r.length) return r;
    if (!s.includes("lb-model-entry")) return [];
    const n = [];
    if (typeof DOMParser < "u")
      try {
        new DOMParser().parseFromString(s, "text/html").querySelectorAll("tr").forEach((e) => {
          if (e.querySelector("th")) return;
          const l = e.querySelector(".lb-rank-number span")?.textContent?.trim() || "", c = e.querySelector("a.lb-model-entry"), o = c?.querySelector("strong")?.textContent?.trim() || "", a = c?.querySelector("small")?.textContent?.trim() || "", h = e.querySelector(".lb-release-cell time, time")?.textContent?.trim() || "", u = e.querySelectorAll(".lb-price-cell span"), p = u[1]?.textContent?.trim() || u[0]?.textContent?.trim() || "-", m = u[2]?.textContent?.trim() || "-", y = e.querySelector(".lb-score-cell strong")?.textContent?.trim() || "", g = c?.getAttribute("href") ? c.getAttribute("href").startsWith("http") ? c.getAttribute("href") : `https://aihot.virxact.com${c.getAttribute("href")}` : "https://aihot.virxact.com";
          o && n.push({ href: g, rank: l, model: o, provider: a, releaseDate: h, inputPrice: p, outputPrice: m, score: y });
        });
      } catch {
      }
    if (!n.length) {
      const i = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
      let t;
      for (; (t = i.exec(s)) !== null; ) {
        const e = t[1];
        if (e.includes("<th")) continue;
        const l = e.match(/class="lb-rank-number"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/), c = e.match(/<a class="lb-model-entry"[^>]*href="([^"]+)"/), o = e.match(/<strong>([^<]+)<\/strong>/), a = e.match(/<small>([^<]+)<\/small>/), h = e.match(/<time[^>]*>([^<]+)<\/time>/), u = e.match(/class="lb-score-cell"[^>]*><strong>([^<]+)<\/strong>/), p = [...e.matchAll(/class="lb-price-cell"[^>]*><span>([^<]+)<\/span>/g)];
        o && n.push({
          href: c ? c[1].startsWith("http") ? c[1] : `https://aihot.virxact.com${c[1]}` : "https://aihot.virxact.com",
          rank: l ? l[1].trim() : String(n.length + 1),
          model: o[1].trim(),
          provider: a ? a[1].trim() : "权威厂商",
          releaseDate: h ? h[1].trim() : "",
          inputPrice: p[1] ? p[1][1].trim() : p[0] ? p[0][1].trim() : "-",
          outputPrice: p[2] ? p[2][1].trim() : "-",
          score: u ? u[1].trim() : ""
        });
      }
    }
    return n;
  }
  async loadLeaderboard(s = !1) {
    await this.read(
      "leaderboard",
      "aihot_leaderboard_items",
      s,
      1800 * 1e3,
      (r) => Array.isArray(r) && r.every((n) => n && typeof n.model == "string" && typeof n.provider == "string"),
      async (r) => {
        const n = await fetch("https://aihot.news/leaderboard", { headers: { Accept: "text/html" }, signal: r });
        if (!n.ok) throw new Error(`HTTP ${n.status}`);
        const i = this.parseLeaderboardHtml(await n.text());
        if (!i.length) throw new Error("未识别到榜单，来源页面可能已变更");
        return i;
      },
      (r) => d.updateState({ leaderboard: r })
    );
  }
  async loadDaily(s = "", r = !1) {
    if (s && !/^\d{4}-\d{2}-\d{2}$/.test(s)) return;
    const n = s ? `aihot_daily_${s}` : "aihot_daily_latest";
    await this.read(
      "daily",
      n,
      r,
      3600 * 1e3,
      (i) => {
        const t = i;
        return !!t && (t.report === null || typeof t.report?.date == "string" && Array.isArray(t.report?.sections) && t.report.sections.every((e) => e && Array.isArray(e.items))) && Array.isArray(t.archives) && t.archives.every((e) => e && typeof e.date == "string");
      },
      async (i) => {
        const t = s ? `${b}/dailies/${encodeURIComponent(s)}` : `${b}/dailies/latest`, e = await fetch(t, { headers: { Accept: "application/json" }, signal: i });
        if (!e.ok) throw new Error(`HTTP ${e.status}`);
        const l = await e.json();
        if (!l || !Object.prototype.hasOwnProperty.call(l, "report")) throw new Error("日报响应格式不匹配");
        return { report: l.report, archives: l.archives || [] };
      },
      (i) => d.updateState({ dailyReport: i.report, dailyArchives: i.archives, activeDailyDate: s })
    );
  }
  async fetchArticleContent(s) {
    const r = s.id ? String(s.id) : "", n = `aihot_art_v3_${r}`;
    if (r && this.aihotArticleCache.has(r))
      return this.aihotArticleCache.get(r);
    if (r) {
      const t = await A.get(n);
      if (t)
        return this.aihotArticleCache.set(r, t), t;
    }
    if (r && this.pendingArticleRequests.has(r))
      return this.pendingArticleRequests.get(r);
    if (!r || r.startsWith("fb-")) {
      const e = `<div class="aihot-article-fallback">
        ${s.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${s.summary}</p>` : ""}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 提示：该资讯为实时要闻提炼，您可以查阅上方「AI 导读」，或点击右上角「原文 ↗」直达源网站查看完整图文报道。
        </p>
      </div>`;
      return r && this.aihotArticleCache.set(r, e), e;
    }
    const i = (async () => {
      try {
        const l = new AbortController(), c = setTimeout(() => l.abort(), 6e3);
        let o = await fetch(`https://aihot.virxact.com/items/${r}`, {
          headers: { Accept: "text/html,application/xhtml+xml" },
          signal: l.signal
        });
        if (o.ok || (o = await fetch(`https://aihot.news/items/${r}`, {
          headers: { Accept: "text/html,application/xhtml+xml" },
          signal: l.signal
        })), clearTimeout(c), !o.ok) throw new Error(`HTTP ${o.status}`);
        const a = await o.text(), h = this.extractArticleHtml(a, r);
        if (h && h.length > 20)
          return this.aihotArticleCache.set(r, h), A.set(n, h, { ttlMs: 24 * 3600 * 1e3 }), h;
      } catch (l) {
        console.warn("[AiHotService] fetch article error or timeout:", l?.message);
      }
      const e = `<div class="aihot-article-fallback">
        ${s.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${s.summary}</p>` : ""}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 正文提示：该来源站点未提供公开内联排版或响应超时。核心主旨与要点已由 AI 在上方提炼，点击右上角「原文 ↗」可前往原网站浏览完整细节。
        </p>
      </div>`;
      return this.aihotArticleCache.set(r, e), e;
    })();
    this.pendingArticleRequests.set(r, i);
    try {
      return await i;
    } finally {
      this.pendingArticleRequests.delete(r);
    }
  }
  sanitizeAndProxyArticleHtml(s) {
    if (!s) return "";
    const r = new DOMParser().parseFromString(s, "text/html");
    r.querySelectorAll(x).forEach((t) => t.remove());
    for (const t of r.body.querySelectorAll("*"))
      for (const e of Array.from(t.attributes))
        (/^on/i.test(e.name) || e.name === "srcdoc") && t.removeAttribute(e.name), ["href", "src", "xlink:href"].includes(e.name) && /^\s*(?:javascript|vbscript|data):/i.test(e.value) && t.removeAttribute(e.name);
    const n = (t) => {
      if (!t) return "";
      try {
        const e = t.match(/[?&]u=([^&]+)/);
        if (e)
          return decodeURIComponent(e[1]);
      } catch {
      }
      return t.startsWith("/") ? `https://aihot.news${t}` : t;
    }, i = (t) => t ? t.split(",").map((e) => {
      const l = e.trim();
      if (!l) return "";
      const c = l.split(/\s+/), o = c[0], a = n(o);
      return c.length > 1 ? `${a} ${c[1]}` : a;
    }).filter(Boolean).join(", ") : "";
    return r.querySelectorAll("img").forEach((t) => {
      const e = t.getAttribute("src");
      e && t.setAttribute("src", n(e));
      const l = t.getAttribute("srcset");
      l && t.setAttribute("srcset", i(l));
      const c = t.getAttribute("data-src") || t.getAttribute("data-original");
      c && (!e || e.startsWith("data:image/svg") || e.startsWith("data:image/gif")) && t.setAttribute("src", n(c)), t.setAttribute("referrerpolicy", "no-referrer"), t.setAttribute("loading", "lazy"), t.style.maxWidth = "100%", t.style.height = "auto", t.style.borderRadius = "8px";
    }), r.querySelectorAll("source").forEach((t) => {
      const e = t.getAttribute("srcset");
      e && t.setAttribute("srcset", i(e));
    }), r.querySelectorAll("a").forEach((t) => {
      const e = t.getAttribute("href");
      e && e.startsWith("/") && t.setAttribute("href", `https://aihot.news${e}`), t.setAttribute("target", "_blank"), t.setAttribute("rel", "noreferrer noopener");
    }), r.body.innerHTML.trim();
  }
  extractArticleHtml(s, r) {
    if (!s) return "";
    try {
      const n = s.match(/streamController\.enqueue\(([\s\S]*?)\);<\/script>/g);
      if (n)
        for (const i of n) {
          const t = i.match(/streamController\.enqueue\(([\s\S]*?)\);<\/script>/);
          if (!t) continue;
          const e = t[1].trim();
          try {
            const l = JSON.parse(e), c = typeof l == "string" ? JSON.parse(l) : l;
            if (Array.isArray(c)) {
              for (const o of c)
                if (typeof o == "string" && (o.includes("<figure") || o.includes("<p>")) && o.length > 50) {
                  const a = this.sanitizeAndProxyArticleHtml(o);
                  if (a.length > 30) return a;
                }
            }
          } catch {
          }
        }
    } catch {
    }
    try {
      const n = [
        ...s.matchAll(/<template[^>]*id=["']detail-rich-html-([^"']+)["'][^>]*>([\s\S]*?)<\/template>/gi)
      ];
      if (n.length > 0) {
        let i = n.find((t) => t[1] === `${r}-zh`);
        if (i || (i = n.find((t) => t[1].startsWith(r))), i || (i = n.find((t) => t[2] && t[2].trim().length > 30)), i && i[2] && i[2].trim().length > 20)
          return this.sanitizeAndProxyArticleHtml(i[2]);
      }
    } catch {
    }
    try {
      if (typeof DOMParser < "u") {
        const i = new DOMParser().parseFromString(s, "text/html");
        i.querySelectorAll(x).forEach((e) => e.remove());
        const t = [
          i.querySelector(".dt-article-content"),
          i.getElementById(`detail-article-${r}`),
          i.querySelector(".detail-content"),
          i.querySelector(".article-content"),
          i.querySelector(".prose"),
          i.querySelector("article")
        ];
        for (const e of t) {
          if (!e) continue;
          const l = this.sanitizeAndProxyArticleHtml(e.innerHTML);
          if (l.length > 30) return l;
        }
      }
    } catch {
    }
    try {
      const n = s.match(/self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/gs);
      if (n && n.length) {
        let i = "";
        for (const a of n)
          try {
            const h = a.replace(/^self\.__next_f\.push\(\[1,\s*"/, "").replace(/"\]\)$/, "");
            i += JSON.parse('"' + h + '"') + `
`;
          } catch {
            i += a + `
`;
          }
        const t = i.match(/"zh":\s*(\[[^\]]+\])/), e = i.match(/"original":\s*(\[[^\]]+\])/), l = i.match(/"dt-quoted-text[^"]*",\{"children":\s*"([^"]+)"/), c = [...i.matchAll(/"fullSrc":"([^"]+)"/g)].map((a) => a[1]), o = [];
        if (t)
          try {
            const a = JSON.parse(t[1]);
            Array.isArray(a) && a.length && o.push('<div class="aihot-rsc-tweet-zh">' + a.map((h) => `<p style="margin-bottom:12px;line-height:1.75;">${h}</p>`).join("") + "</div>");
          } catch {
          }
        if (l && l[1] && o.push(`<blockquote style="margin:12px 0;padding:10px 14px;border-left:3px solid #38bdf8;background:rgba(56,189,248,0.06);border-radius:6px;line-height:1.6;">${l[1]}</blockquote>`), c.length) {
          const a = c.map((h) => `<img src="${h.startsWith("http") ? h : "https://aihot.news" + (h.startsWith("/") ? h : "/" + h)}" style="max-width:100%;border-radius:8px;margin:8px 0;" referrerpolicy="no-referrer" loading="lazy" />`).join("");
          o.push(`<div class="aihot-rsc-media">${a}</div>`);
        }
        if (e && !t)
          try {
            const a = JSON.parse(e[1]);
            Array.isArray(a) && a.length && o.push('<div class="aihot-rsc-tweet-orig" style="color:var(--muted);">' + a.map((h) => `<p style="margin-bottom:12px;line-height:1.75;">${h}</p>`).join("") + "</div>");
          } catch {
          }
        if (o.length)
          return this.sanitizeAndProxyArticleHtml(o.join(""));
      }
    } catch {
    }
    return "";
  }
}
const k = f.getInstance();
export {
  f as AiHotService,
  b as DEFAULT_AIHOT_API,
  k as aiHotService
};
