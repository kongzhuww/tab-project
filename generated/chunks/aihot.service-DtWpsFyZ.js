import { a as d } from "./aihot-feed-store-BBHzZC21.js";
import { s as b } from "./storage-cache.service-BYF2zxXX.js";
const v = "https://aihot.news", $ = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function q(f) {
  if (typeof DOMParser > "u") return [];
  const e = new DOMParser().parseFromString(f, "text/html"), a = [];
  for (const n of e.querySelectorAll("table")) {
    const s = n.querySelectorAll("tbody tr[data-slug]");
    if (!s.length) continue;
    const t = Array.from(n.querySelectorAll("thead th"), (o) => (o.textContent || "").replace(/\s+/g, "")), r = t.findIndex((o) => o.includes("输入价格")), h = t.findIndex((o) => o.includes("输出价格")), c = t.findIndex((o) => o.includes("AIHOT评分"));
    if (!(c < 0)) {
      for (const o of s) {
        const i = o.getAttribute("data-slug") || "", l = o.querySelectorAll(":scope > td");
        if (!$.test(i) || l.length <= c) continue;
        const u = l[1]?.querySelector("a strong")?.textContent?.trim() || "", p = l[1]?.querySelector("small")?.textContent?.trim() || "", y = l[0]?.textContent?.trim() || "", g = l[c]?.querySelector("strong")?.textContent?.trim() || "";
        if (!u || !/^\d+$/.test(y) || !g) continue;
        const A = (x) => x < 0 ? "-" : l[x]?.textContent?.trim() || "-";
        a.push({
          href: `${v}/leaderboard/${i}`,
          rank: String(Number(y)),
          model: u,
          provider: p,
          releaseDate: o.querySelector("time")?.textContent?.trim() || "",
          inputPrice: A(r),
          outputPrice: A(h),
          score: g
        });
      }
      if (a.length) break;
    }
  }
  return a;
}
function C(f) {
  if (f === null) return null;
  const e = f;
  if (!e || typeof e.date != "string" || !Array.isArray(e.sections)) throw new Error("日报响应格式不匹配");
  const a = e.sections.map((n) => {
    if (!n || typeof n.label != "string" || !Array.isArray(n.items)) throw new Error("日报分组格式不匹配");
    return { label: n.label, items: n.items.map((s) => {
      if (!s || typeof s.title != "string") throw new Error("日报条目格式不匹配");
      const t = s.links?.aihot || s.links?.original || s.url || "";
      if (typeof t != "string" || !/^https?:\/\//i.test(t)) throw new Error("日报条目链接格式不匹配");
      const r = t.match(/\/items\/([^/?#]+)/);
      return { id: String(s.id || r?.[1] || t), title: s.title, summary: typeof s.summary == "string" ? s.summary : "", sourceName: s.source?.name || s.sourceName || "AI 资讯", published: s.publishedAt || s.published || "", url: t, raw: s };
    }) };
  });
  return {
    date: e.date,
    leadTitle: typeof e.lead?.title == "string" ? e.lead.title : typeof e.leadTitle == "string" ? e.leadTitle : "",
    leadParagraph: typeof e.lead?.leadParagraph == "string" ? e.lead.leadParagraph : typeof e.leadParagraph == "string" ? e.leadParagraph : "",
    links: typeof e.links?.aihot == "string" && /^https?:\/\//i.test(e.links.aihot) ? { aihot: e.links.aihot } : void 0,
    sections: a
  };
}
function M(f) {
  const e = f?.items;
  if (!Array.isArray(e)) throw new Error("日报历史列表格式不匹配");
  return e.filter((a) => typeof a?.date == "string" && /^\d{4}-\d{2}-\d{2}$/.test(a.date)).map((a) => ({ date: a.date }));
}
const w = "https://aihot.virxact.com/api/v1", S = [
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
  activate(e) {
    this.owner !== e && (this.pause(), this.owner = e, this.detachActions = d.onAction((a, n) => {
      a === "switch-view" ? this.switchView(n) : a === "refresh" ? this.refresh() : a === "change-category" || a === "change-window" ? this.loadFeed() : a === "select-daily-date" && this.loadDaily(n);
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
    return e.currentView === "leaderboard" ? "aihot_leaderboard_items" : e.currentView === "daily" ? e.activeDailyDate ? `aihot_daily_v2_${e.activeDailyDate}` : "aihot_daily_v2_latest" : `aihot_feed_articles_${e.feedCategory || ""}_${e.feedWindow || "24h"}`;
  }
  async loadCurrent(e = !1) {
    const a = d.state;
    a.currentView === "leaderboard" ? await this.loadLeaderboard(e) : a.currentView === "daily" ? await this.loadDaily(a.activeDailyDate, e) : await this.loadFeed(e);
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
  async read(e, a, n, s, t, r, h) {
    if (!this.owner || d.state.currentView !== e || this.request?.key === a) return;
    this.cancelRead();
    const c = { key: a, controller: new AbortController(), timer: void 0 };
    this.request = c, this.attempted.add(a);
    const o = () => this.request === c && !!this.owner;
    this.displayed.get(e) !== a && (e === "feed" ? d.updateState({ feedArticles: [] }) : e === "daily" && d.updateState({ dailyReport: null }), this.displayed.set(e, a)), d.updateState({ isLoading: !0, errorMessage: "", statusMessage: "正在读取…" });
    try {
      if (!n) {
        const l = await b.get(a);
        if (!o()) return;
        t(l) && (h(l), d.updateState({ statusMessage: "正在显示缓存，检查更新中…" }));
      }
      if (!o()) return;
      c.timer = setTimeout(() => c.controller.abort(), 15e3);
      const i = await r(c.controller.signal);
      if (!o()) return;
      if (c.controller.signal.throwIfAborted(), !t(i)) throw new Error("数据格式不匹配");
      h(i), b.set(a, i, { ttlMs: s }).catch(() => {
      }), d.updateState({ statusMessage: "已获取来源数据。", errorMessage: "" });
    } catch (i) {
      if (!o()) return;
      d.updateState({
        errorMessage: c.controller.signal.aborted ? "读取超时，请手动刷新重试。" : `读取失败：${i instanceof Error ? i.message : "网络异常"}。请手动刷新重试。`,
        statusMessage: "保留当前已读取的数据；没有数据时显示空列表。"
      });
    } finally {
      clearTimeout(c.timer), o() && (this.request = null, d.updateState({ isLoading: !1 }));
    }
  }
  async loadFeed(e = !1) {
    const a = d.state, n = a.feedCategory || "", s = a.feedWindow || "24h";
    await this.read(
      "feed",
      `aihot_feed_articles_${n}_${s}`,
      e,
      900 * 1e3,
      (t) => Array.isArray(t) && t.every((r) => r && typeof r.title == "string" && typeof r.url == "string" && typeof r.sourceName == "string" && typeof r.published == "string" && (r.category === void 0 || typeof r.category == "string")),
      async (t) => {
        const r = new URLSearchParams({ mode: "selected", window: s, limit: "30" });
        n && r.set("category", n);
        const h = await fetch(`${w}/items?${r}`, { headers: { Accept: "application/json" }, signal: t });
        if (!h.ok) throw new Error(`HTTP ${h.status}`);
        const c = await h.json(), o = Array.isArray(c?.items) ? c.items : Array.isArray(c?.data) ? c.data : Array.isArray(c) ? c : null;
        if (!o) throw new Error("资讯响应格式不匹配");
        return o.map((i) => {
          if (!i || typeof i != "object") throw new Error("资讯条目格式不匹配");
          let l = i.published || "最新";
          if (i.publishedAt) {
            const u = new Date(i.publishedAt);
            Number.isFinite(u.getTime()) && (l = `${String(u.getMonth() + 1).padStart(2, "0")}-${String(u.getDate()).padStart(2, "0")} ${String(u.getHours()).padStart(2, "0")}:${String(u.getMinutes()).padStart(2, "0")}`);
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
      (t) => d.updateState({ feedArticles: t })
    );
  }
  parseLeaderboardHtml(e) {
    const a = q(e);
    if (a.length) return a;
    if (!e.includes("lb-model-entry")) return [];
    const n = [];
    if (typeof DOMParser < "u")
      try {
        new DOMParser().parseFromString(e, "text/html").querySelectorAll("tr").forEach((r) => {
          if (r.querySelector("th")) return;
          const h = r.querySelector(".lb-rank-number span")?.textContent?.trim() || "", c = r.querySelector("a.lb-model-entry"), o = c?.querySelector("strong")?.textContent?.trim() || "", i = c?.querySelector("small")?.textContent?.trim() || "", l = r.querySelector(".lb-release-cell time, time")?.textContent?.trim() || "", u = r.querySelectorAll(".lb-price-cell span"), p = u[1]?.textContent?.trim() || u[0]?.textContent?.trim() || "-", y = u[2]?.textContent?.trim() || "-", g = r.querySelector(".lb-score-cell strong")?.textContent?.trim() || "", A = c?.getAttribute("href") ? c.getAttribute("href").startsWith("http") ? c.getAttribute("href") : `https://aihot.virxact.com${c.getAttribute("href")}` : "https://aihot.virxact.com";
          o && n.push({ href: A, rank: h, model: o, provider: i, releaseDate: l, inputPrice: p, outputPrice: y, score: g });
        });
      } catch {
      }
    if (!n.length) {
      const s = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
      let t;
      for (; (t = s.exec(e)) !== null; ) {
        const r = t[1];
        if (r.includes("<th")) continue;
        const h = r.match(/class="lb-rank-number"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/), c = r.match(/<a class="lb-model-entry"[^>]*href="([^"]+)"/), o = r.match(/<strong>([^<]+)<\/strong>/), i = r.match(/<small>([^<]+)<\/small>/), l = r.match(/<time[^>]*>([^<]+)<\/time>/), u = r.match(/class="lb-score-cell"[^>]*><strong>([^<]+)<\/strong>/), p = [...r.matchAll(/class="lb-price-cell"[^>]*><span>([^<]+)<\/span>/g)];
        o && n.push({
          href: c ? c[1].startsWith("http") ? c[1] : `https://aihot.virxact.com${c[1]}` : "https://aihot.virxact.com",
          rank: h ? h[1].trim() : String(n.length + 1),
          model: o[1].trim(),
          provider: i ? i[1].trim() : "权威厂商",
          releaseDate: l ? l[1].trim() : "",
          inputPrice: p[1] ? p[1][1].trim() : p[0] ? p[0][1].trim() : "-",
          outputPrice: p[2] ? p[2][1].trim() : "-",
          score: u ? u[1].trim() : ""
        });
      }
    }
    return n;
  }
  async loadLeaderboard(e = !1) {
    await this.read(
      "leaderboard",
      "aihot_leaderboard_items",
      e,
      1800 * 1e3,
      (a) => Array.isArray(a) && a.every((n) => n && typeof n.model == "string" && typeof n.provider == "string"),
      async (a) => {
        const n = await fetch("https://aihot.news/leaderboard", { headers: { Accept: "text/html" }, signal: a });
        if (!n.ok) throw new Error(`HTTP ${n.status}`);
        const s = this.parseLeaderboardHtml(await n.text());
        if (!s.length) throw new Error("未识别到榜单，来源页面可能已变更");
        return s;
      },
      (a) => d.updateState({ leaderboard: a })
    );
  }
  async loadDaily(e = "", a = !1) {
    if (e && !/^\d{4}-\d{2}-\d{2}$/.test(e)) return;
    const n = e ? `aihot_daily_v2_${e}` : "aihot_daily_v2_latest";
    await this.read(
      "daily",
      n,
      a,
      3600 * 1e3,
      (s) => {
        const t = s;
        return !!t && (t.report === null || typeof t.report?.date == "string" && Array.isArray(t.report?.sections) && t.report.sections.every((r) => r && Array.isArray(r.items))) && Array.isArray(t.archives) && t.archives.every((r) => r && typeof r.date == "string") && typeof t.archiveWarning == "string";
      },
      async (s) => {
        const t = e ? `${w}/dailies/${encodeURIComponent(e)}` : `${w}/dailies/latest`, r = fetch(t, { headers: { Accept: "application/json" }, signal: s }).then(async (i) => {
          if (!i.ok) throw new Error(`HTTP ${i.status}`);
          const l = await i.json();
          if (!l || !Object.prototype.hasOwnProperty.call(l, "report")) throw new Error("日报响应格式不匹配");
          return C(l.report);
        }), h = fetch(`${w}/dailies`, { headers: { Accept: "application/json" }, signal: s }).then(async (i) => {
          if (!i.ok) throw new Error(`HTTP ${i.status}`);
          return M(await i.json());
        }), [c, o] = await Promise.allSettled([r, h]);
        if (s.throwIfAborted(), c.status === "rejected") throw c.reason;
        return { report: c.value, archives: o.status === "fulfilled" ? o.value : [...d.state.dailyArchives], archiveWarning: o.status === "rejected" ? "历史日期读取失败，可刷新重试。" : "" };
      },
      (s) => d.updateState({ dailyReport: s.report, dailyArchives: s.archives, dailyArchiveWarning: s.archiveWarning, activeDailyDate: e })
    );
  }
  async fetchArticleContent(e) {
    const a = e.id ? String(e.id) : "", n = `aihot_art_v3_${a}`;
    if (a && this.aihotArticleCache.has(a))
      return this.aihotArticleCache.get(a);
    if (a) {
      const t = await b.get(n);
      if (t)
        return this.aihotArticleCache.set(a, t), t;
    }
    if (a && this.pendingArticleRequests.has(a))
      return this.pendingArticleRequests.get(a);
    if (!a || a.startsWith("fb-")) {
      const r = `<div class="aihot-article-fallback">
        ${e.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${e.summary}</p>` : ""}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 提示：该资讯为实时要闻提炼，您可以查阅上方「AI 导读」，或点击右上角「原文 ↗」直达源网站查看完整图文报道。
        </p>
      </div>`;
      return a && this.aihotArticleCache.set(a, r), r;
    }
    const s = (async () => {
      try {
        const h = new AbortController(), c = setTimeout(() => h.abort(), 6e3);
        let o = await fetch(`https://aihot.virxact.com/items/${a}`, {
          headers: { Accept: "text/html,application/xhtml+xml" },
          signal: h.signal
        });
        if (o.ok || (o = await fetch(`https://aihot.news/items/${a}`, {
          headers: { Accept: "text/html,application/xhtml+xml" },
          signal: h.signal
        })), clearTimeout(c), !o.ok) throw new Error(`HTTP ${o.status}`);
        const i = await o.text(), l = this.extractArticleHtml(i, a);
        if (l && l.length > 20)
          return this.aihotArticleCache.set(a, l), b.set(n, l, { ttlMs: 24 * 3600 * 1e3 }), l;
      } catch (h) {
        console.warn("[AiHotService] fetch article error or timeout:", h?.message);
      }
      const r = `<div class="aihot-article-fallback">
        ${e.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${e.summary}</p>` : ""}
        <p class="muted small" style="margin-top:12px;padding:12px 14px;background:rgba(56,189,248,0.06);border-left:3px solid #38bdf8;border-radius:6px;line-height:1.6;">
          💡 正文提示：该来源站点未提供公开内联排版或响应超时。核心主旨与要点已由 AI 在上方提炼，点击右上角「原文 ↗」可前往原网站浏览完整细节。
        </p>
      </div>`;
      return this.aihotArticleCache.set(a, r), r;
    })();
    this.pendingArticleRequests.set(a, s);
    try {
      return await s;
    } finally {
      this.pendingArticleRequests.delete(a);
    }
  }
  sanitizeAndProxyArticleHtml(e) {
    if (!e) return "";
    const a = new DOMParser().parseFromString(e, "text/html");
    a.querySelectorAll(S).forEach((t) => t.remove());
    for (const t of a.body.querySelectorAll("*"))
      for (const r of Array.from(t.attributes))
        (/^on/i.test(r.name) || r.name === "srcdoc") && t.removeAttribute(r.name), ["href", "src", "xlink:href"].includes(r.name) && /^\s*(?:javascript|vbscript|data):/i.test(r.value) && t.removeAttribute(r.name);
    const n = (t) => {
      if (!t) return "";
      try {
        const r = t.match(/[?&]u=([^&]+)/);
        if (r)
          return decodeURIComponent(r[1]);
      } catch {
      }
      return t.startsWith("/") ? `https://aihot.news${t}` : t;
    }, s = (t) => t ? t.split(",").map((r) => {
      const h = r.trim();
      if (!h) return "";
      const c = h.split(/\s+/), o = c[0], i = n(o);
      return c.length > 1 ? `${i} ${c[1]}` : i;
    }).filter(Boolean).join(", ") : "";
    return a.querySelectorAll("img").forEach((t) => {
      const r = t.getAttribute("src");
      r && t.setAttribute("src", n(r));
      const h = t.getAttribute("srcset");
      h && t.setAttribute("srcset", s(h));
      const c = t.getAttribute("data-src") || t.getAttribute("data-original");
      c && (!r || r.startsWith("data:image/svg") || r.startsWith("data:image/gif")) && t.setAttribute("src", n(c)), t.setAttribute("referrerpolicy", "no-referrer"), t.setAttribute("loading", "lazy"), t.style.maxWidth = "100%", t.style.height = "auto", t.style.borderRadius = "8px";
    }), a.querySelectorAll("source").forEach((t) => {
      const r = t.getAttribute("srcset");
      r && t.setAttribute("srcset", s(r));
    }), a.querySelectorAll("a").forEach((t) => {
      const r = t.getAttribute("href");
      r && r.startsWith("/") && t.setAttribute("href", `https://aihot.news${r}`), t.setAttribute("target", "_blank"), t.setAttribute("rel", "noreferrer noopener");
    }), a.body.innerHTML.trim();
  }
  extractArticleHtml(e, a) {
    if (!e) return "";
    try {
      const n = e.match(/streamController\.enqueue\(([\s\S]*?)\);<\/script>/g);
      if (n)
        for (const s of n) {
          const t = s.match(/streamController\.enqueue\(([\s\S]*?)\);<\/script>/);
          if (!t) continue;
          const r = t[1].trim();
          try {
            const h = JSON.parse(r), c = typeof h == "string" ? JSON.parse(h) : h;
            if (Array.isArray(c)) {
              for (const o of c)
                if (typeof o == "string" && (o.includes("<figure") || o.includes("<p>")) && o.length > 50) {
                  const i = this.sanitizeAndProxyArticleHtml(o);
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
        ...e.matchAll(/<template[^>]*id=["']detail-rich-html-([^"']+)["'][^>]*>([\s\S]*?)<\/template>/gi)
      ];
      if (n.length > 0) {
        let s = n.find((t) => t[1] === `${a}-zh`);
        if (s || (s = n.find((t) => t[1].startsWith(a))), s || (s = n.find((t) => t[2] && t[2].trim().length > 30)), s && s[2] && s[2].trim().length > 20)
          return this.sanitizeAndProxyArticleHtml(s[2]);
      }
    } catch {
    }
    try {
      if (typeof DOMParser < "u") {
        const s = new DOMParser().parseFromString(e, "text/html");
        s.querySelectorAll(S).forEach((r) => r.remove());
        const t = [
          s.querySelector(".dt-article-content"),
          s.getElementById(`detail-article-${a}`),
          s.querySelector(".detail-content"),
          s.querySelector(".article-content"),
          s.querySelector(".prose"),
          s.querySelector("article")
        ];
        for (const r of t) {
          if (!r) continue;
          const h = this.sanitizeAndProxyArticleHtml(r.innerHTML);
          if (h.length > 30) return h;
        }
      }
    } catch {
    }
    try {
      const n = e.match(/self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/gs);
      if (n && n.length) {
        let s = "";
        for (const i of n)
          try {
            const l = i.replace(/^self\.__next_f\.push\(\[1,\s*"/, "").replace(/"\]\)$/, "");
            s += JSON.parse('"' + l + '"') + `
`;
          } catch {
            s += i + `
`;
          }
        const t = s.match(/"zh":\s*(\[[^\]]+\])/), r = s.match(/"original":\s*(\[[^\]]+\])/), h = s.match(/"dt-quoted-text[^"]*",\{"children":\s*"([^"]+)"/), c = [...s.matchAll(/"fullSrc":"([^"]+)"/g)].map((i) => i[1]), o = [];
        if (t)
          try {
            const i = JSON.parse(t[1]);
            Array.isArray(i) && i.length && o.push('<div class="aihot-rsc-tweet-zh">' + i.map((l) => `<p style="margin-bottom:12px;line-height:1.75;">${l}</p>`).join("") + "</div>");
          } catch {
          }
        if (h && h[1] && o.push(`<blockquote style="margin:12px 0;padding:10px 14px;border-left:3px solid #38bdf8;background:rgba(56,189,248,0.06);border-radius:6px;line-height:1.6;">${h[1]}</blockquote>`), c.length) {
          const i = c.map((l) => `<img src="${l.startsWith("http") ? l : "https://aihot.news" + (l.startsWith("/") ? l : "/" + l)}" style="max-width:100%;border-radius:8px;margin:8px 0;" referrerpolicy="no-referrer" loading="lazy" />`).join("");
          o.push(`<div class="aihot-rsc-media">${i}</div>`);
        }
        if (r && !t)
          try {
            const i = JSON.parse(r[1]);
            Array.isArray(i) && i.length && o.push('<div class="aihot-rsc-tweet-orig" style="color:var(--muted);">' + i.map((l) => `<p style="margin-bottom:12px;line-height:1.75;">${l}</p>`).join("") + "</div>");
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
const _ = m.getInstance();
export {
  m as AiHotService,
  w as DEFAULT_AIHOT_API,
  _ as aiHotService
};
