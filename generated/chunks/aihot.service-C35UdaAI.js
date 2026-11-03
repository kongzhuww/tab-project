import { b as d } from "./aihot-feed-store-CMoIIxm_.js";
import { s as m } from "./storage-cache.service-BYF2zxXX.js";
const f = "https://aihot.virxact.com/api/v1", y = [
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
class u {
  constructor() {
    this.owner = null, this.request = null, this.attempted = /* @__PURE__ */ new Set(), this.displayed = /* @__PURE__ */ new Map(), this.aihotArticleCache = /* @__PURE__ */ new Map(), this.pendingArticleRequests = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    return u.instance || (u.instance = new u()), u.instance;
  }
  activate(r) {
    this.owner !== r && (this.pause(), this.owner = r, this.detachActions = d.onAction((e, s) => {
      e === "switch-view" ? this.switchView(s) : e === "refresh" ? this.refresh() : e === "change-category" || e === "change-window" ? this.loadFeed() : e === "select-daily-date" && this.loadDaily(s);
    }), this.attempted.has(this.currentKey()) || this.loadCurrent());
  }
  pause(r) {
    r && this.owner !== r || (this.detachActions?.(), this.detachActions = void 0, this.owner = null, this.cancelRead());
  }
  cancelRead() {
    const r = this.request;
    this.request = null, r && (clearTimeout(r.timer), r.controller.abort(), this.attempted.delete(r.key), d.updateState({ isLoading: !1, statusMessage: "读取已暂停，重新进入后继续。" }));
  }
  currentKey() {
    const r = d.state;
    return r.currentView === "leaderboard" ? "aihot_leaderboard_items" : r.currentView === "daily" ? r.activeDailyDate ? `aihot_daily_${r.activeDailyDate}` : "aihot_daily_latest" : `aihot_feed_articles_${r.feedCategory || ""}_${r.feedWindow || "24h"}`;
  }
  async loadCurrent(r = !1) {
    const e = d.state;
    e.currentView === "leaderboard" ? await this.loadLeaderboard(r) : e.currentView === "daily" ? await this.loadDaily(e.activeDailyDate, r) : await this.loadFeed(r);
  }
  async switchView(r) {
    if (!(!this.owner || !["leaderboard", "feed", "daily"].includes(r))) {
      d.updateState({ currentView: r });
      try {
        localStorage.setItem("lw-info-feed-view", r);
      } catch {
      }
      await this.loadCurrent();
    }
  }
  async refresh() {
    this.owner && await this.loadCurrent(!0);
  }
  async read(r, e, s, a, t, o, n) {
    if (!this.owner || d.state.currentView !== r || this.request?.key === e) return;
    this.cancelRead();
    const l = { key: e, controller: new AbortController(), timer: void 0 };
    this.request = l, this.attempted.add(e);
    const h = () => this.request === l && !!this.owner;
    this.displayed.get(r) !== e && (r === "feed" ? d.updateState({ feedArticles: [] }) : r === "daily" && d.updateState({ dailyReport: null }), this.displayed.set(r, e)), d.updateState({ isLoading: !0, errorMessage: "", statusMessage: "正在读取…" });
    try {
      if (!s) {
        const c = await m.get(e);
        if (!h()) return;
        t(c) && (n(c), d.updateState({ statusMessage: "正在显示缓存，检查更新中…" }));
      }
      if (!h()) return;
      l.timer = setTimeout(() => l.controller.abort(), 15e3);
      const i = await o(l.controller.signal);
      if (!h()) return;
      if (l.controller.signal.throwIfAborted(), !t(i)) throw new Error("数据格式不匹配");
      n(i), m.set(e, i, { ttlMs: a }).catch(() => {
      }), d.updateState({ statusMessage: "已获取来源数据。", errorMessage: "" });
    } catch (i) {
      if (!h()) return;
      d.updateState({
        errorMessage: l.controller.signal.aborted ? "读取超时，请手动刷新重试。" : `读取失败：${i instanceof Error ? i.message : "网络异常"}。请手动刷新重试。`,
        statusMessage: "保留当前已读取的数据；没有数据时显示空列表。"
      });
    } finally {
      clearTimeout(l.timer), h() && (this.request = null, d.updateState({ isLoading: !1 }));
    }
  }
  async loadFeed(r = !1) {
    const e = d.state, s = e.feedCategory || "", a = e.feedWindow || "24h";
    await this.read(
      "feed",
      `aihot_feed_articles_${s}_${a}`,
      r,
      900 * 1e3,
      (t) => Array.isArray(t) && t.every((o) => o && typeof o.title == "string" && typeof o.url == "string" && typeof o.sourceName == "string" && typeof o.published == "string" && (o.category === void 0 || typeof o.category == "string")),
      async (t) => {
        const o = new URLSearchParams({ mode: "selected", window: a, limit: "30" });
        s && o.set("category", s);
        const n = await fetch(`${f}/items?${o}`, { headers: { Accept: "application/json" }, signal: t });
        if (!n.ok) throw new Error(`HTTP ${n.status}`);
        const l = await n.json(), h = Array.isArray(l?.items) ? l.items : Array.isArray(l?.data) ? l.data : Array.isArray(l) ? l : null;
        if (!h) throw new Error("资讯响应格式不匹配");
        return h.map((i) => {
          if (!i || typeof i != "object") throw new Error("资讯条目格式不匹配");
          let c = i.published || "最新";
          if (i.publishedAt) {
            const p = new Date(i.publishedAt);
            Number.isFinite(p.getTime()) && (c = `${String(p.getMonth() + 1).padStart(2, "0")}-${String(p.getDate()).padStart(2, "0")} ${String(p.getHours()).padStart(2, "0")}:${String(p.getMinutes()).padStart(2, "0")}`);
          }
          return {
            id: String(i.id || i.externalId || crypto.randomUUID()),
            title: i.title || i.headline || "无标题",
            originalTitle: i.originalTitle || void 0,
            summary: i.summary || i.description || "",
            sourceName: i.source?.name || i.sourceName || i.site || "AI 资讯",
            published: c,
            category: i.category || "综合",
            url: i.links?.aihot || i.links?.original || i.url || i.link || "#",
            raw: i
          };
        });
      },
      (t) => d.updateState({ feedArticles: t })
    );
  }
  parseLeaderboardHtml(r) {
    const e = [];
    if (typeof DOMParser < "u")
      try {
        new DOMParser().parseFromString(r, "text/html").querySelectorAll("tr").forEach((t) => {
          if (t.querySelector("th")) return;
          const o = t.querySelector(".lb-rank-number span")?.textContent?.trim() || "", n = t.querySelector("a.lb-model-entry"), l = n?.querySelector("strong")?.textContent?.trim() || "", h = n?.querySelector("small")?.textContent?.trim() || "", i = t.querySelector(".lb-release-cell time, time")?.textContent?.trim() || "", c = t.querySelectorAll(".lb-price-cell span"), p = c[1]?.textContent?.trim() || c[0]?.textContent?.trim() || "-", g = c[2]?.textContent?.trim() || "-", w = t.querySelector(".lb-score-cell strong")?.textContent?.trim() || "", b = n?.getAttribute("href") ? n.getAttribute("href").startsWith("http") ? n.getAttribute("href") : `https://aihot.virxact.com${n.getAttribute("href")}` : "https://aihot.virxact.com";
          l && e.push({ href: b, rank: o, model: l, provider: h, releaseDate: i, inputPrice: p, outputPrice: g, score: w });
        });
      } catch {
      }
    if (!e.length) {
      const s = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
      let a;
      for (; (a = s.exec(r)) !== null; ) {
        const t = a[1];
        if (t.includes("<th")) continue;
        const o = t.match(/class="lb-rank-number"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/), n = t.match(/<a class="lb-model-entry"[^>]*href="([^"]+)"/), l = t.match(/<strong>([^<]+)<\/strong>/), h = t.match(/<small>([^<]+)<\/small>/), i = t.match(/<time[^>]*>([^<]+)<\/time>/), c = t.match(/class="lb-score-cell"[^>]*><strong>([^<]+)<\/strong>/), p = [...t.matchAll(/class="lb-price-cell"[^>]*><span>([^<]+)<\/span>/g)];
        l && e.push({
          href: n ? n[1].startsWith("http") ? n[1] : `https://aihot.virxact.com${n[1]}` : "https://aihot.virxact.com",
          rank: o ? o[1].trim() : String(e.length + 1),
          model: l[1].trim(),
          provider: h ? h[1].trim() : "权威厂商",
          releaseDate: i ? i[1].trim() : "",
          inputPrice: p[1] ? p[1][1].trim() : p[0] ? p[0][1].trim() : "-",
          outputPrice: p[2] ? p[2][1].trim() : "-",
          score: c ? c[1].trim() : ""
        });
      }
    }
    return e;
  }
  async loadLeaderboard(r = !1) {
    await this.read(
      "leaderboard",
      "aihot_leaderboard_items",
      r,
      1800 * 1e3,
      (e) => Array.isArray(e) && e.every((s) => s && typeof s.model == "string" && typeof s.provider == "string"),
      async (e) => {
        const s = await fetch("https://aihot.virxact.com/leaderboard", { headers: { Accept: "text/html" }, signal: e });
        if (!s.ok) throw new Error(`HTTP ${s.status}`);
        const a = this.parseLeaderboardHtml(await s.text());
        if (!a.length) throw new Error("未识别到榜单，来源页面可能已变更");
        return a;
      },
      (e) => d.updateState({ leaderboard: e })
    );
  }
  async loadDaily(r = "", e = !1) {
    if (r && !/^\d{4}-\d{2}-\d{2}$/.test(r)) return;
    const s = r ? `aihot_daily_${r}` : "aihot_daily_latest";
    await this.read(
      "daily",
      s,
      e,
      3600 * 1e3,
      (a) => {
        const t = a;
        return !!t && (t.report === null || typeof t.report?.date == "string" && Array.isArray(t.report?.sections) && t.report.sections.every((o) => o && Array.isArray(o.items))) && Array.isArray(t.archives) && t.archives.every((o) => o && typeof o.date == "string");
      },
      async (a) => {
        const t = r ? `${f}/dailies/${encodeURIComponent(r)}` : `${f}/dailies/latest`, o = await fetch(t, { headers: { Accept: "application/json" }, signal: a });
        if (!o.ok) throw new Error(`HTTP ${o.status}`);
        const n = await o.json();
        if (!n || !Object.prototype.hasOwnProperty.call(n, "report")) throw new Error("日报响应格式不匹配");
        return { report: n.report, archives: n.archives || [] };
      },
      (a) => d.updateState({ dailyReport: a.report, dailyArchives: a.archives, activeDailyDate: r })
    );
  }
  async fetchArticleContent(r) {
    const e = r.id ? String(r.id) : "", s = `aihot_art_v2_${e}`;
    if (e && this.aihotArticleCache.has(e))
      return this.aihotArticleCache.get(e);
    if (e) {
      const t = await m.get(s);
      if (t)
        return this.aihotArticleCache.set(e, t), t;
    }
    if (e && this.pendingArticleRequests.has(e))
      return this.pendingArticleRequests.get(e);
    if (!e || e.startsWith("fb-")) {
      const o = `<div class="aihot-article-fallback">
        ${r.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${r.summary}</p>` : ""}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 提示：该资讯为实时要闻提炼，您可以查阅上方「AI 导读」，或点击右上角「原文 ↗」直达源网站查看完整图文报道。
        </p>
      </div>`;
      return e && this.aihotArticleCache.set(e, o), o;
    }
    const a = (async () => {
      try {
        const n = new AbortController(), l = setTimeout(() => n.abort(), 6e3);
        let h = await fetch(`https://aihot.virxact.com/items/${e}`, {
          headers: { Accept: "text/html,application/xhtml+xml" },
          signal: n.signal
        });
        if (h.ok || (h = await fetch(`https://aihot.news/items/${e}`, {
          headers: { Accept: "text/html,application/xhtml+xml" },
          signal: n.signal
        })), clearTimeout(l), !h.ok) throw new Error(`HTTP ${h.status}`);
        const i = await h.text(), c = this.extractArticleHtml(i, e);
        if (c && c.length > 20)
          return this.aihotArticleCache.set(e, c), m.set(s, c, { ttlMs: 24 * 3600 * 1e3 }), c;
      } catch (n) {
        console.warn("[AiHotService] fetch article error or timeout:", n?.message);
      }
      const o = `<div class="aihot-article-fallback">
        ${r.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${r.summary}</p>` : ""}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 正文提示：该来源站点未提供公开内联排版或响应超时。核心主旨与要点已由 AI 在上方提炼，点击右上角「原文 ↗」可前往原网站浏览完整细节。
        </p>
      </div>`;
      return this.aihotArticleCache.set(e, o), o;
    })();
    this.pendingArticleRequests.set(e, a);
    try {
      return await a;
    } finally {
      this.pendingArticleRequests.delete(e);
    }
  }
  sanitizeAndProxyArticleHtml(r) {
    if (!r) return "";
    const e = new DOMParser().parseFromString(r, "text/html");
    e.querySelectorAll(y).forEach((a) => a.remove());
    for (const a of e.body.querySelectorAll("*"))
      for (const t of Array.from(a.attributes))
        (/^on/i.test(t.name) || t.name === "srcdoc") && a.removeAttribute(t.name), ["href", "src", "xlink:href"].includes(t.name) && /^\s*(?:javascript|vbscript|data):/i.test(t.value) && a.removeAttribute(t.name);
    let s = e.body.innerHTML;
    return s = s.replace(/src=["'](?:\/api\/img-proxy\?([^"']+))["']/gi, (a, t) => `src="https://aihot.news/api/img-proxy?${t}"`), s = s.replace(/src=["']\/(?!api\/img-proxy)([^"']+)["']/gi, (a, t) => `src="https://aihot.news/${t}"`), s = s.replace(/<img\b(?![^>]*referrerpolicy)/gi, '<img referrerpolicy="no-referrer" loading="lazy"'), s = s.replace(/href=["']\/([^"']+)["']/gi, (a, t) => `href="https://aihot.news/${t}"`), s = s.replace(/<a\b(?![^>]*target)/gi, '<a target="_blank" rel="noreferrer"'), s.trim();
  }
  extractArticleHtml(r, e) {
    if (!r) return "";
    try {
      const s = [
        ...r.matchAll(/<template[^>]*id=["']detail-rich-html-([^"']+)["'][^>]*>([\s\S]*?)<\/template>/gi)
      ];
      if (s.length > 0) {
        let a = s.find((t) => t[1] === `${e}-zh`);
        if (a || (a = s.find((t) => t[1].startsWith(e))), a || (a = s.find((t) => t[2] && t[2].trim().length > 30)), a && a[2] && a[2].trim().length > 20)
          return this.sanitizeAndProxyArticleHtml(a[2]);
      }
    } catch {
    }
    try {
      if (typeof DOMParser < "u") {
        const a = new DOMParser().parseFromString(r, "text/html");
        a.querySelectorAll(y).forEach((o) => o.remove());
        const t = [
          a.querySelector(".dt-article-content"),
          a.getElementById(`detail-article-${e}`),
          a.querySelector(".detail-content"),
          a.querySelector(".article-content"),
          a.querySelector(".prose"),
          a.querySelector("article")
        ];
        for (const o of t) {
          if (!o) continue;
          const n = this.sanitizeAndProxyArticleHtml(o.innerHTML);
          if (n.length > 30) return n;
        }
      }
    } catch {
    }
    try {
      const s = r.match(/self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/gs);
      if (s && s.length) {
        let a = "";
        for (const i of s)
          try {
            const c = i.replace(/^self\.__next_f\.push\(\[1,\s*"/, "").replace(/"\]\)$/, "");
            a += JSON.parse('"' + c + '"') + `
`;
          } catch {
            a += i + `
`;
          }
        const t = a.match(/"zh":\s*(\[[^\]]+\])/), o = a.match(/"original":\s*(\[[^\]]+\])/), n = a.match(/"dt-quoted-text[^"]*",\{"children":\s*"([^"]+)"/), l = [...a.matchAll(/"fullSrc":"([^"]+)"/g)].map((i) => i[1]), h = [];
        if (t)
          try {
            const i = JSON.parse(t[1]);
            Array.isArray(i) && i.length && h.push('<div class="aihot-rsc-tweet-zh">' + i.map((c) => `<p style="margin-bottom:12px;line-height:1.75;">${c}</p>`).join("") + "</div>");
          } catch {
          }
        if (n && n[1] && h.push(`<blockquote style="margin:12px 0;padding:10px 14px;border-left:3px solid #38bdf8;background:rgba(56,189,248,0.06);border-radius:6px;line-height:1.6;">${n[1]}</blockquote>`), l.length) {
          const i = l.map((c) => `<img src="${c.startsWith("http") ? c : "https://aihot.news" + (c.startsWith("/") ? c : "/" + c)}" style="max-width:100%;border-radius:8px;margin:8px 0;" referrerpolicy="no-referrer" loading="lazy" />`).join("");
          h.push(`<div class="aihot-rsc-media">${i}</div>`);
        }
        if (o && !t)
          try {
            const i = JSON.parse(o[1]);
            Array.isArray(i) && i.length && h.push('<div class="aihot-rsc-tweet-orig" style="color:var(--muted);">' + i.map((c) => `<p style="margin-bottom:12px;line-height:1.75;">${c}</p>`).join("") + "</div>");
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
const S = u.getInstance();
export {
  u as AiHotService,
  f as DEFAULT_AIHOT_API,
  S as aiHotService
};
