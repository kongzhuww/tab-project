import { b as d } from "./aihot-feed-store-B0pGDp7E.js";
import { s as m } from "./storage-cache.service-BYF2zxXX.js";
const f = "https://aihot.virxact.com/api/v1";
class u {
  constructor() {
    this.owner = null, this.request = null, this.attempted = /* @__PURE__ */ new Set(), this.displayed = /* @__PURE__ */ new Map(), this.aihotArticleCache = /* @__PURE__ */ new Map(), this.pendingArticleRequests = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    return u.instance || (u.instance = new u()), u.instance;
  }
  activate(e) {
    this.owner !== e && (this.pause(), this.owner = e, this.detachActions = d.onAction((t, o) => {
      t === "switch-view" ? this.switchView(o) : t === "refresh" ? this.refresh() : t === "change-category" || t === "change-window" ? this.loadFeed() : t === "select-daily-date" && this.loadDaily(o);
    }), this.attempted.has(this.currentKey()) || this.loadCurrent());
  }
  pause(e) {
    e && this.owner !== e || (this.detachActions?.(), this.detachActions = void 0, this.owner = null, this.cancelRead());
  }
  cancelRead() {
    const e = this.request;
    this.request = null, e && (clearTimeout(e.timer), e.controller.abort(), this.attempted.delete(e.key), d.updateState({ isLoading: !1, statusMessage: "读取已暂停，重新进入后继续。" }));
  }
  currentKey() {
    const e = d.state;
    return e.currentView === "leaderboard" ? "aihot_leaderboard_items" : e.currentView === "daily" ? e.activeDailyDate ? `aihot_daily_${e.activeDailyDate}` : "aihot_daily_latest" : `aihot_feed_articles_${e.feedCategory || ""}_${e.feedWindow || "24h"}`;
  }
  async loadCurrent(e = !1) {
    const t = d.state;
    t.currentView === "leaderboard" ? await this.loadLeaderboard(e) : t.currentView === "daily" ? await this.loadDaily(t.activeDailyDate, e) : await this.loadFeed(e);
  }
  async switchView(e) {
    if (!(!this.owner || !["leaderboard", "feed", "daily"].includes(e))) {
      d.updateState({ currentView: e });
      try {
        localStorage.setItem("lw-info-feed-view", e);
      } catch {
      }
      await this.loadCurrent();
    }
  }
  async refresh() {
    this.owner && await this.loadCurrent(!0);
  }
  async read(e, t, o, i, r, s, l) {
    if (!this.owner || d.state.currentView !== e || this.request?.key === t) return;
    this.cancelRead();
    const n = { key: t, controller: new AbortController(), timer: void 0 };
    this.request = n, this.attempted.add(t);
    const h = () => this.request === n && !!this.owner;
    this.displayed.get(e) !== t && (e === "feed" ? d.updateState({ feedArticles: [] }) : e === "daily" && d.updateState({ dailyReport: null }), this.displayed.set(e, t)), d.updateState({ isLoading: !0, errorMessage: "", statusMessage: "正在读取…" });
    try {
      if (!o) {
        const c = await m.get(t);
        if (!h()) return;
        r(c) && (l(c), d.updateState({ statusMessage: "正在显示缓存，检查更新中…" }));
      }
      if (!h()) return;
      n.timer = setTimeout(() => n.controller.abort(), 15e3);
      const a = await s(n.controller.signal);
      if (!h()) return;
      if (n.controller.signal.throwIfAborted(), !r(a)) throw new Error("数据格式不匹配");
      l(a), m.set(t, a, { ttlMs: i }).catch(() => {
      }), d.updateState({ statusMessage: "已获取来源数据。", errorMessage: "" });
    } catch (a) {
      if (!h()) return;
      d.updateState({
        errorMessage: n.controller.signal.aborted ? "读取超时，请手动刷新重试。" : `读取失败：${a instanceof Error ? a.message : "网络异常"}。请手动刷新重试。`,
        statusMessage: "保留当前已读取的数据；没有数据时显示空列表。"
      });
    } finally {
      clearTimeout(n.timer), h() && (this.request = null, d.updateState({ isLoading: !1 }));
    }
  }
  async loadFeed(e = !1) {
    const t = d.state, o = t.feedCategory || "", i = t.feedWindow || "24h";
    await this.read(
      "feed",
      `aihot_feed_articles_${o}_${i}`,
      e,
      900 * 1e3,
      (r) => Array.isArray(r) && r.every((s) => s && typeof s.title == "string" && typeof s.url == "string" && typeof s.sourceName == "string" && typeof s.published == "string" && (s.category === void 0 || typeof s.category == "string")),
      async (r) => {
        const s = new URLSearchParams({ mode: "selected", window: i, limit: "30" });
        o && s.set("category", o);
        const l = await fetch(`${f}/items?${s}`, { headers: { Accept: "application/json" }, signal: r });
        if (!l.ok) throw new Error(`HTTP ${l.status}`);
        const n = await l.json(), h = Array.isArray(n?.items) ? n.items : Array.isArray(n?.data) ? n.data : Array.isArray(n) ? n : null;
        if (!h) throw new Error("资讯响应格式不匹配");
        return h.map((a) => {
          if (!a || typeof a != "object") throw new Error("资讯条目格式不匹配");
          let c = a.published || "最新";
          if (a.publishedAt) {
            const p = new Date(a.publishedAt);
            Number.isFinite(p.getTime()) && (c = `${String(p.getMonth() + 1).padStart(2, "0")}-${String(p.getDate()).padStart(2, "0")} ${String(p.getHours()).padStart(2, "0")}:${String(p.getMinutes()).padStart(2, "0")}`);
          }
          return {
            id: String(a.id || a.externalId || crypto.randomUUID()),
            title: a.title || a.headline || "无标题",
            summary: a.summary || a.description || "",
            sourceName: a.source?.name || a.sourceName || a.site || "AI 资讯",
            published: c,
            category: a.category || "综合",
            url: a.links?.aihot || a.links?.original || a.url || a.link || "#",
            raw: a
          };
        });
      },
      (r) => d.updateState({ feedArticles: r })
    );
  }
  parseLeaderboardHtml(e) {
    const t = [];
    if (typeof DOMParser < "u")
      try {
        new DOMParser().parseFromString(e, "text/html").querySelectorAll("tr").forEach((r) => {
          if (r.querySelector("th")) return;
          const s = r.querySelector(".lb-rank-number span")?.textContent?.trim() || "", l = r.querySelector("a.lb-model-entry"), n = l?.querySelector("strong")?.textContent?.trim() || "", h = l?.querySelector("small")?.textContent?.trim() || "", a = r.querySelector(".lb-release-cell time, time")?.textContent?.trim() || "", c = r.querySelectorAll(".lb-price-cell span"), p = c[1]?.textContent?.trim() || c[0]?.textContent?.trim() || "-", g = c[2]?.textContent?.trim() || "-", y = r.querySelector(".lb-score-cell strong")?.textContent?.trim() || "", w = l?.getAttribute("href") ? l.getAttribute("href").startsWith("http") ? l.getAttribute("href") : `https://aihot.virxact.com${l.getAttribute("href")}` : "https://aihot.virxact.com";
          n && t.push({ href: w, rank: s, model: n, provider: h, releaseDate: a, inputPrice: p, outputPrice: g, score: y });
        });
      } catch {
      }
    if (!t.length) {
      const o = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
      let i;
      for (; (i = o.exec(e)) !== null; ) {
        const r = i[1];
        if (r.includes("<th")) continue;
        const s = r.match(/class="lb-rank-number"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/), l = r.match(/<a class="lb-model-entry"[^>]*href="([^"]+)"/), n = r.match(/<strong>([^<]+)<\/strong>/), h = r.match(/<small>([^<]+)<\/small>/), a = r.match(/<time[^>]*>([^<]+)<\/time>/), c = r.match(/class="lb-score-cell"[^>]*><strong>([^<]+)<\/strong>/), p = [...r.matchAll(/class="lb-price-cell"[^>]*><span>([^<]+)<\/span>/g)];
        n && t.push({
          href: l ? l[1].startsWith("http") ? l[1] : `https://aihot.virxact.com${l[1]}` : "https://aihot.virxact.com",
          rank: s ? s[1].trim() : String(t.length + 1),
          model: n[1].trim(),
          provider: h ? h[1].trim() : "权威厂商",
          releaseDate: a ? a[1].trim() : "",
          inputPrice: p[1] ? p[1][1].trim() : p[0] ? p[0][1].trim() : "-",
          outputPrice: p[2] ? p[2][1].trim() : "-",
          score: c ? c[1].trim() : ""
        });
      }
    }
    return t;
  }
  async loadLeaderboard(e = !1) {
    await this.read(
      "leaderboard",
      "aihot_leaderboard_items",
      e,
      1800 * 1e3,
      (t) => Array.isArray(t) && t.every((o) => o && typeof o.model == "string" && typeof o.provider == "string"),
      async (t) => {
        const o = await fetch("https://aihot.virxact.com/leaderboard", { headers: { Accept: "text/html" }, signal: t });
        if (!o.ok) throw new Error(`HTTP ${o.status}`);
        const i = this.parseLeaderboardHtml(await o.text());
        if (!i.length) throw new Error("未识别到榜单，来源页面可能已变更");
        return i;
      },
      (t) => d.updateState({ leaderboard: t })
    );
  }
  async loadDaily(e = "", t = !1) {
    if (e && !/^\d{4}-\d{2}-\d{2}$/.test(e)) return;
    const o = e ? `aihot_daily_${e}` : "aihot_daily_latest";
    await this.read(
      "daily",
      o,
      t,
      3600 * 1e3,
      (i) => {
        const r = i;
        return !!r && (r.report === null || typeof r.report?.date == "string" && Array.isArray(r.report?.sections) && r.report.sections.every((s) => s && Array.isArray(s.items))) && Array.isArray(r.archives) && r.archives.every((s) => s && typeof s.date == "string");
      },
      async (i) => {
        const r = e ? `${f}/dailies/${encodeURIComponent(e)}` : `${f}/dailies/latest`, s = await fetch(r, { headers: { Accept: "application/json" }, signal: i });
        if (!s.ok) throw new Error(`HTTP ${s.status}`);
        const l = await s.json();
        if (!l || !Object.prototype.hasOwnProperty.call(l, "report")) throw new Error("日报响应格式不匹配");
        return { report: l.report, archives: l.archives || [] };
      },
      (i) => d.updateState({ dailyReport: i.report, dailyArchives: i.archives, activeDailyDate: e })
    );
  }
  async fetchArticleContent(e) {
    const t = e.id ? String(e.id) : "";
    if (t && this.aihotArticleCache.has(t))
      return this.aihotArticleCache.get(t);
    if (t) {
      const i = await m.get(`aihot_art_${t}`);
      if (i)
        return this.aihotArticleCache.set(t, i), i;
    }
    if (t && this.pendingArticleRequests.has(t))
      return this.pendingArticleRequests.get(t);
    if (!t || t.startsWith("fb-")) {
      const r = `<div class="aihot-article-fallback">
        ${e.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${e.summary}</p>` : ""}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 提示：该资讯为实时要闻提炼，您可以查阅上方「AI 导读」，或点击右上角「原文 ↗」直达源网站查看完整图文报道。
        </p>
      </div>`;
      return t && this.aihotArticleCache.set(t, r), r;
    }
    const o = (async () => {
      try {
        const s = new AbortController(), l = setTimeout(() => s.abort(), 6e3);
        let n = await fetch(`https://aihot.virxact.com/items/${t}`, {
          headers: { Accept: "text/html,application/xhtml+xml" },
          signal: s.signal
        });
        if (n.ok || (n = await fetch(`https://aihot.news/items/${t}`, {
          headers: { Accept: "text/html,application/xhtml+xml" },
          signal: s.signal
        })), clearTimeout(l), !n.ok) throw new Error(`HTTP ${n.status}`);
        const h = await n.text(), a = this.extractArticleHtml(h, t);
        if (a && a.length > 20)
          return this.aihotArticleCache.set(t, a), m.set(`aihot_art_${t}`, a, { ttlMs: 24 * 3600 * 1e3 }), a;
      } catch (s) {
        console.warn("[AiHotService] fetch article error or timeout:", s?.message);
      }
      const r = `<div class="aihot-article-fallback">
        ${e.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${e.summary}</p>` : ""}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 正文提示：该来源站点未提供公开内联排版或响应超时。核心主旨与要点已由 AI 在上方提炼，点击右上角「原文 ↗」可前往原网站浏览完整细节。
        </p>
      </div>`;
      return this.aihotArticleCache.set(t, r), r;
    })();
    this.pendingArticleRequests.set(t, o);
    try {
      return await o;
    } finally {
      this.pendingArticleRequests.delete(t);
    }
  }
  sanitizeAndProxyArticleHtml(e) {
    if (!e) return "";
    let t = e;
    return t = t.replace(/<aside[\s\S]*?<\/aside>/gi, ""), t = t.replace(/<div class="[^"]*(?:dt-aside|dt-outline|detail-reading-tail|dt-tags-wrap)[^"]*"[\s\S]*?<\/div>/gi, ""), t = t.replace(/<ol class="[^"]*dt-outline-list[^"]*"[\s\S]*?<\/ol>/gi, ""), t = t.replace(/src=["'](?:\/api\/img-proxy\?([^"']+))["']/gi, (o, i) => `src="https://aihot.news/api/img-proxy?${i}"`), t = t.replace(/src=["']\/(?!api\/img-proxy)([^"']+)["']/gi, (o, i) => `src="https://aihot.news/${i}"`), t = t.replace(/<img\b(?![^>]*referrerpolicy)/gi, '<img referrerpolicy="no-referrer" loading="lazy"'), t = t.replace(/href=["']\/([^"']+)["']/gi, (o, i) => `href="https://aihot.news/${i}"`), t = t.replace(/<a\b(?![^>]*target)/gi, '<a target="_blank" rel="noreferrer"'), t.trim();
  }
  extractArticleHtml(e, t) {
    if (!e) return "";
    try {
      const o = [
        ...e.matchAll(/<template[^>]*id=["']detail-rich-html-([^"']+)["'][^>]*>([\s\S]*?)<\/template>/gi)
      ];
      if (o.length > 0) {
        let i = o.find((r) => r[1] === `${t}-zh`);
        if (i || (i = o.find((r) => r[1].startsWith(t))), i || (i = o.find((r) => r[2] && r[2].trim().length > 30)), i && i[2] && i[2].trim().length > 20)
          return this.sanitizeAndProxyArticleHtml(i[2]);
      }
    } catch {
    }
    try {
      if (typeof DOMParser < "u") {
        const i = new DOMParser().parseFromString(e, "text/html");
        i.querySelectorAll(
          "aside, .dt-aside, .dt-outline, .dt-outline-list, .detail-mobile-only, .detail-reading-tail, .dt-tags-wrap, .dt-share-wrap, [data-detail-aside], .dt-detail-reason"
        ).forEach((s) => s.remove());
        const r = i.querySelector(
          `.dt-article-content, #detail-article-${t}, .detail-content, .article-content, .prose, article`
        );
        if (r) {
          const s = r.innerHTML;
          if (s && s.trim().length > 30)
            return this.sanitizeAndProxyArticleHtml(s);
        }
      }
    } catch {
    }
    try {
      const o = e.match(/self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/gs);
      if (o && o.length) {
        let i = "";
        for (const a of o)
          try {
            const c = a.replace(/^self\.__next_f\.push\(\[1,\s*"/, "").replace(/"\]\)$/, "");
            i += JSON.parse('"' + c + '"') + `
`;
          } catch {
            i += a + `
`;
          }
        const r = i.match(/"zh":\s*(\[[^\]]+\])/), s = i.match(/"original":\s*(\[[^\]]+\])/), l = i.match(/"dt-quoted-text[^"]*",\{"children":\s*"([^"]+)"/), n = [...i.matchAll(/"fullSrc":"([^"]+)"/g)].map((a) => a[1]), h = [];
        if (r)
          try {
            const a = JSON.parse(r[1]);
            Array.isArray(a) && a.length && h.push('<div class="aihot-rsc-tweet-zh">' + a.map((c) => `<p style="margin-bottom:12px;line-height:1.75;">${c}</p>`).join("") + "</div>");
          } catch {
          }
        if (l && l[1] && h.push(`<blockquote style="margin:12px 0;padding:10px 14px;border-left:3px solid #38bdf8;background:rgba(56,189,248,0.06);border-radius:6px;line-height:1.6;">${l[1]}</blockquote>`), n.length) {
          const a = n.map((c) => `<img src="${c.startsWith("http") ? c : "https://aihot.news" + (c.startsWith("/") ? c : "/" + c)}" style="max-width:100%;border-radius:8px;margin:8px 0;" referrerpolicy="no-referrer" loading="lazy" />`).join("");
          h.push(`<div class="aihot-rsc-media">${a}</div>`);
        }
        if (s && !r)
          try {
            const a = JSON.parse(s[1]);
            Array.isArray(a) && a.length && h.push('<div class="aihot-rsc-tweet-orig" style="color:var(--muted);">' + a.map((c) => `<p style="margin-bottom:12px;line-height:1.75;">${c}</p>`).join("") + "</div>");
          } catch {
          }
        if (h.length)
          return this.sanitizeAndProxyArticleHtml(h.join(""));
      }
    } catch {
    }
    return "";
  }
}
const x = u.getInstance();
export {
  u as AiHotService,
  f as DEFAULT_AIHOT_API,
  x as aiHotService
};
