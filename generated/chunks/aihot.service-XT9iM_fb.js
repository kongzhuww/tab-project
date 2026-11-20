import { a as h } from "./aihot-feed-store-Q9eysfNQ.js";
import { s as w } from "./storage-cache.service-BYF2zxXX.js";
const v = "https://aihot.news", q = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function $(f) {
  if (typeof DOMParser > "u") return [];
  const e = new DOMParser().parseFromString(f, "text/html"), s = [];
  for (const n of e.querySelectorAll("table")) {
    const a = n.querySelectorAll("tbody tr[data-slug]");
    if (!a.length) continue;
    const t = Array.from(n.querySelectorAll("thead th"), (c) => (c.textContent || "").replace(/\s+/g, "")), r = t.findIndex((c) => c.includes("输入价格")), d = t.findIndex((c) => c.includes("输出价格")), o = t.findIndex((c) => c.includes("AIHOT评分"));
    if (!(o < 0)) {
      for (const c of a) {
        const i = c.getAttribute("data-slug") || "", l = c.querySelectorAll(":scope > td");
        if (!q.test(i) || l.length <= o) continue;
        const u = l[1]?.querySelector("a strong")?.textContent?.trim() || "", p = l[1]?.querySelector("small")?.textContent?.trim() || "", m = l[0]?.textContent?.trim() || "", g = l[o]?.querySelector("strong")?.textContent?.trim() || "";
        if (!u || !/^\d+$/.test(m) || !g) continue;
        const A = (x) => x < 0 ? "-" : l[x]?.textContent?.trim() || "-";
        s.push({
          href: `${v}/leaderboard/${i}`,
          rank: String(Number(m)),
          model: u,
          provider: p,
          releaseDate: c.querySelector("time")?.textContent?.trim() || "",
          inputPrice: A(r),
          outputPrice: A(d),
          score: g
        });
      }
      if (s.length) break;
    }
  }
  return s;
}
function C(f) {
  if (f === null) return null;
  const e = f;
  if (!e || typeof e.date != "string" || !Array.isArray(e.sections)) throw new Error("日报响应格式不匹配");
  const s = e.sections.map((n) => {
    if (!n || typeof n.label != "string" || !Array.isArray(n.items)) throw new Error("日报分组格式不匹配");
    return { label: n.label, items: n.items.map((a) => {
      if (!a || typeof a.title != "string") throw new Error("日报条目格式不匹配");
      const t = a.links?.aihot || a.links?.original || a.url || "";
      if (typeof t != "string" || !/^https?:\/\//i.test(t)) throw new Error("日报条目链接格式不匹配");
      const r = t.match(/\/items\/([^/?#]+)/);
      return { id: String(a.id || r?.[1] || t), title: a.title, summary: typeof a.summary == "string" ? a.summary : "", sourceName: a.source?.name || a.sourceName || "AI 资讯", published: a.publishedAt || a.published || "", url: t, raw: a };
    }) };
  });
  return {
    date: e.date,
    leadTitle: typeof e.lead?.title == "string" ? e.lead.title : typeof e.leadTitle == "string" ? e.leadTitle : "",
    leadParagraph: typeof e.lead?.leadParagraph == "string" ? e.lead.leadParagraph : typeof e.leadParagraph == "string" ? e.leadParagraph : "",
    links: typeof e.links?.aihot == "string" && /^https?:\/\//i.test(e.links.aihot) ? { aihot: e.links.aihot } : void 0,
    sections: s
  };
}
function M(f) {
  const e = f?.items;
  if (!Array.isArray(e)) throw new Error("日报历史列表格式不匹配");
  return e.filter((s) => typeof s?.date == "string" && /^\d{4}-\d{2}-\d{2}$/.test(s.date)).map((s) => ({ date: s.date }));
}
const b = "https://aihot.news/api/v1", S = [
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
class y {
  constructor() {
    this.owner = null, this.request = null, this.attempted = /* @__PURE__ */ new Set(), this.displayed = /* @__PURE__ */ new Map(), this.aihotArticleCache = /* @__PURE__ */ new Map(), this.pendingArticleRequests = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    return y.instance || (y.instance = new y()), y.instance;
  }
  activate(e) {
    this.owner !== e && (this.pause(), this.owner = e, this.detachActions = h.onAction((s, n) => {
      s === "switch-view" ? this.switchView(n) : s === "refresh" ? this.refresh() : s === "change-category" || s === "change-window" ? this.loadFeed() : s === "select-daily-date" && this.loadDaily(n);
    }), this.attempted.has(this.currentKey()) || this.loadCurrent());
  }
  pause(e) {
    e && this.owner !== e || (this.detachActions?.(), this.detachActions = void 0, this.owner = null, this.cancelRead());
  }
  cancelRead() {
    const e = this.request;
    this.request = null, e && (clearTimeout(e.timer), e.controller.abort(), this.attempted.delete(e.key), h.updateState({ isLoading: !1, statusMessage: "读取已暂停，重新进入后继续。" }));
  }
  currentKey() {
    const e = h.state;
    return e.currentView === "leaderboard" ? "aihot_leaderboard_items" : e.currentView === "daily" ? e.activeDailyDate ? `aihot_daily_v2_${e.activeDailyDate}` : "aihot_daily_v2_latest" : `aihot_feed_articles_${e.feedCategory || ""}_${e.feedWindow || "24h"}`;
  }
  async loadCurrent(e = !1) {
    const s = h.state;
    s.currentView === "leaderboard" ? await this.loadLeaderboard(e) : s.currentView === "daily" ? await this.loadDaily(s.activeDailyDate, e) : await this.loadFeed(e);
  }
  async switchView(e) {
    if (!(!this.owner || !["leaderboard", "feed", "daily"].includes(e))) {
      h.updateState({ currentView: e });
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
  async read(e, s, n, a, t, r, d) {
    if (!this.owner || h.state.currentView !== e || this.request?.key === s) return;
    this.cancelRead();
    const o = { key: s, controller: new AbortController(), timer: void 0 };
    this.request = o, this.attempted.add(s);
    const c = () => this.request === o && !!this.owner;
    this.displayed.get(e) !== s && (e === "feed" ? h.updateState({ feedArticles: [] }) : e === "daily" && h.updateState({ dailyReport: null }), this.displayed.set(e, s)), h.updateState({ isLoading: !0, errorMessage: "", statusMessage: "正在读取…" });
    try {
      if (!n) {
        const l = await w.get(s);
        if (!c()) return;
        t(l) && (d(l), h.updateState({ statusMessage: "正在显示缓存，检查更新中…" }));
      }
      if (!c()) return;
      o.timer = setTimeout(() => o.controller.abort(), 15e3);
      const i = await r(o.controller.signal);
      if (!c()) return;
      if (o.controller.signal.throwIfAborted(), !t(i)) throw new Error("数据格式不匹配");
      d(i), w.set(s, i, { ttlMs: a }).catch(() => {
      }), h.updateState({ statusMessage: "已获取来源数据。", errorMessage: "" });
    } catch (i) {
      if (!c()) return;
      h.updateState({
        errorMessage: o.controller.signal.aborted ? "读取超时，请手动刷新重试。" : `读取失败：${i instanceof Error ? i.message : "网络异常"}。请手动刷新重试。`,
        statusMessage: "保留当前已读取的数据；没有数据时显示空列表。"
      });
    } finally {
      clearTimeout(o.timer), c() && (this.request = null, h.updateState({ isLoading: !1 }));
    }
  }
  async loadFeed(e = !1) {
    const s = h.state, n = s.feedCategory || "", a = s.feedWindow || "24h";
    await this.read(
      "feed",
      `aihot_feed_articles_${n}_${a}`,
      e,
      900 * 1e3,
      (t) => Array.isArray(t) && t.every((r) => r && typeof r.title == "string" && typeof r.url == "string" && typeof r.sourceName == "string" && typeof r.published == "string" && (r.category === void 0 || typeof r.category == "string")),
      async (t) => {
        const r = new URLSearchParams({ mode: "selected", window: a, limit: "30" });
        n && r.set("category", n);
        const d = await fetch(`${b}/items?${r}`, { headers: { Accept: "application/json" }, signal: t });
        if (!d.ok) throw new Error(`HTTP ${d.status}`);
        const o = await d.json(), c = Array.isArray(o?.items) ? o.items : Array.isArray(o?.data) ? o.data : Array.isArray(o) ? o : null;
        if (!c) throw new Error("资讯响应格式不匹配");
        return c.map((i) => {
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
      (t) => h.updateState({ feedArticles: t })
    );
  }
  parseLeaderboardHtml(e) {
    const s = $(e);
    if (s.length) return s;
    if (!e.includes("lb-model-entry")) return [];
    const n = [];
    if (typeof DOMParser < "u")
      try {
        new DOMParser().parseFromString(e, "text/html").querySelectorAll("tr").forEach((r) => {
          if (r.querySelector("th")) return;
          const d = r.querySelector(".lb-rank-number span")?.textContent?.trim() || "", o = r.querySelector("a.lb-model-entry"), c = o?.querySelector("strong")?.textContent?.trim() || "", i = o?.querySelector("small")?.textContent?.trim() || "", l = r.querySelector(".lb-release-cell time, time")?.textContent?.trim() || "", u = r.querySelectorAll(".lb-price-cell span"), p = u[1]?.textContent?.trim() || u[0]?.textContent?.trim() || "-", m = u[2]?.textContent?.trim() || "-", g = r.querySelector(".lb-score-cell strong")?.textContent?.trim() || "", A = o?.getAttribute("href") ? o.getAttribute("href").startsWith("http") ? o.getAttribute("href") : `https://aihot.news${o.getAttribute("href")}` : "https://aihot.news";
          c && n.push({ href: A, rank: d, model: c, provider: i, releaseDate: l, inputPrice: p, outputPrice: m, score: g });
        });
      } catch {
      }
    if (!n.length) {
      const a = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
      let t;
      for (; (t = a.exec(e)) !== null; ) {
        const r = t[1];
        if (r.includes("<th")) continue;
        const d = r.match(/class="lb-rank-number"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/), o = r.match(/<a class="lb-model-entry"[^>]*href="([^"]+)"/), c = r.match(/<strong>([^<]+)<\/strong>/), i = r.match(/<small>([^<]+)<\/small>/), l = r.match(/<time[^>]*>([^<]+)<\/time>/), u = r.match(/class="lb-score-cell"[^>]*><strong>([^<]+)<\/strong>/), p = [...r.matchAll(/class="lb-price-cell"[^>]*><span>([^<]+)<\/span>/g)];
        c && n.push({
          href: o ? o[1].startsWith("http") ? o[1] : `https://aihot.news${o[1]}` : "https://aihot.news",
          rank: d ? d[1].trim() : String(n.length + 1),
          model: c[1].trim(),
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
      (s) => Array.isArray(s) && s.every((n) => n && typeof n.model == "string" && typeof n.provider == "string"),
      async (s) => {
        const n = await fetch("https://aihot.news/leaderboard", { headers: { Accept: "text/html" }, signal: s });
        if (!n.ok) throw new Error(`HTTP ${n.status}`);
        const a = this.parseLeaderboardHtml(await n.text());
        if (!a.length) throw new Error("未识别到榜单，来源页面可能已变更");
        return a;
      },
      (s) => h.updateState({ leaderboard: s })
    );
  }
  async loadDaily(e = "", s = !1) {
    if (e && !/^\d{4}-\d{2}-\d{2}$/.test(e)) return;
    const n = e ? `aihot_daily_v2_${e}` : "aihot_daily_v2_latest";
    await this.read(
      "daily",
      n,
      s,
      3600 * 1e3,
      (a) => {
        const t = a;
        return !!t && (t.report === null || typeof t.report?.date == "string" && Array.isArray(t.report?.sections) && t.report.sections.every((r) => r && Array.isArray(r.items))) && Array.isArray(t.archives) && t.archives.every((r) => r && typeof r.date == "string") && typeof t.archiveWarning == "string";
      },
      async (a) => {
        const t = e ? `${b}/dailies/${encodeURIComponent(e)}` : `${b}/dailies/latest`, r = fetch(t, { headers: { Accept: "application/json" }, signal: a }).then(async (i) => {
          if (!i.ok) throw new Error(`HTTP ${i.status}`);
          const l = await i.json();
          if (!l || !Object.prototype.hasOwnProperty.call(l, "report")) throw new Error("日报响应格式不匹配");
          return C(l.report);
        }), d = fetch(`${b}/dailies`, { headers: { Accept: "application/json" }, signal: a }).then(async (i) => {
          if (!i.ok) throw new Error(`HTTP ${i.status}`);
          return M(await i.json());
        }), [o, c] = await Promise.allSettled([r, d]);
        if (a.throwIfAborted(), o.status === "rejected") throw o.reason;
        return { report: o.value, archives: c.status === "fulfilled" ? c.value : [...h.state.dailyArchives], archiveWarning: c.status === "rejected" ? "历史日期读取失败，可刷新重试。" : "" };
      },
      (a) => h.updateState({ dailyReport: a.report, dailyArchives: a.archives, dailyArchiveWarning: a.archiveWarning, activeDailyDate: e })
    );
  }
  async fetchArticleContent(e) {
    const s = e.id ? String(e.id) : "", n = `aihot_art_v3_${s}`;
    if (s && this.aihotArticleCache.has(s))
      return this.aihotArticleCache.get(s);
    if (s) {
      const t = await w.get(n);
      if (t)
        return this.aihotArticleCache.set(s, t), t;
    }
    if (s && this.pendingArticleRequests.has(s))
      return this.pendingArticleRequests.get(s);
    if (!s || s.startsWith("fb-")) {
      const r = `<div class="aihot-article-fallback">
        ${e.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${e.summary}</p>` : ""}
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
          return this.aihotArticleCache.set(s, l), w.set(n, l, { ttlMs: 24 * 3600 * 1e3 }), l;
      } catch (d) {
        console.warn("[AiHotService] fetch article error or timeout:", d?.message);
      }
      const r = `<div class="aihot-article-fallback">
        ${e.summary ? `<p style="line-height:1.75;font-size:14.5px;color:var(--text);margin-bottom:14px;">${e.summary}</p>` : ""}
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
  sanitizeAndProxyArticleHtml(e) {
    if (!e) return "";
    const s = new DOMParser().parseFromString(e, "text/html");
    s.querySelectorAll(S).forEach((t) => t.remove());
    for (const t of s.body.querySelectorAll("*"))
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
    }, a = (t) => t ? t.split(",").map((r) => {
      const d = r.trim();
      if (!d) return "";
      const o = d.split(/\s+/), c = o[0], i = n(c);
      return o.length > 1 ? `${i} ${o[1]}` : i;
    }).filter(Boolean).join(", ") : "";
    return s.querySelectorAll("img").forEach((t) => {
      const r = t.getAttribute("src");
      r && t.setAttribute("src", n(r));
      const d = t.getAttribute("srcset");
      d && t.setAttribute("srcset", a(d));
      const o = t.getAttribute("data-src") || t.getAttribute("data-original");
      o && (!r || r.startsWith("data:image/svg") || r.startsWith("data:image/gif")) && t.setAttribute("src", n(o)), t.setAttribute("referrerpolicy", "no-referrer"), t.setAttribute("loading", "lazy"), t.style.maxWidth = "100%", t.style.height = "auto", t.style.borderRadius = "8px";
    }), s.querySelectorAll("source").forEach((t) => {
      const r = t.getAttribute("srcset");
      r && t.setAttribute("srcset", a(r));
    }), s.querySelectorAll("a").forEach((t) => {
      const r = t.getAttribute("href");
      r && r.startsWith("/") && t.setAttribute("href", `https://aihot.news${r}`), t.setAttribute("target", "_blank"), t.setAttribute("rel", "noreferrer noopener");
    }), s.body.innerHTML.trim();
  }
  extractArticleHtml(e, s) {
    if (!e) return "";
    try {
      const n = e.match(/streamController\.enqueue\(([\s\S]*?)\);<\/script>/g);
      if (n)
        for (const a of n) {
          const t = a.match(/streamController\.enqueue\(([\s\S]*?)\);<\/script>/);
          if (!t) continue;
          const r = t[1].trim();
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
        ...e.matchAll(/<template[^>]*id=["']detail-rich-html-([^"']+)["'][^>]*>([\s\S]*?)<\/template>/gi)
      ];
      if (n.length > 0) {
        let a = n.find((t) => t[1] === `${s}-zh`);
        if (a || (a = n.find((t) => t[1].startsWith(s))), a || (a = n.find((t) => t[2] && t[2].trim().length > 30)), a && a[2] && a[2].trim().length > 20)
          return this.sanitizeAndProxyArticleHtml(a[2]);
      }
    } catch {
    }
    try {
      if (typeof DOMParser < "u") {
        const a = new DOMParser().parseFromString(e, "text/html");
        a.querySelectorAll(S).forEach((r) => r.remove());
        const t = [
          a.querySelector(".dt-article-content"),
          a.getElementById(`detail-article-${s}`),
          a.querySelector(".detail-content"),
          a.querySelector(".article-content"),
          a.querySelector(".prose"),
          a.querySelector("article")
        ];
        for (const r of t) {
          if (!r) continue;
          const d = this.sanitizeAndProxyArticleHtml(r.innerHTML);
          if (d.length > 30) return d;
        }
      }
    } catch {
    }
    try {
      const n = e.match(/self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/gs);
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
        const t = a.match(/"zh":\s*(\[[^\]]+\])/), r = a.match(/"original":\s*(\[[^\]]+\])/), d = a.match(/"dt-quoted-text[^"]*",\{"children":\s*"([^"]+)"/), o = [...a.matchAll(/"fullSrc":"([^"]+)"/g)].map((i) => i[1]), c = [];
        if (t)
          try {
            const i = JSON.parse(t[1]);
            Array.isArray(i) && i.length && c.push('<div class="aihot-rsc-tweet-zh">' + i.map((l) => `<p style="margin-bottom:12px;line-height:1.75;">${l}</p>`).join("") + "</div>");
          } catch {
          }
        if (d && d[1] && c.push(`<blockquote style="margin:12px 0;padding:10px 14px;border-left:3px solid #38bdf8;background:rgba(56,189,248,0.06);border-radius:6px;line-height:1.6;">${d[1]}</blockquote>`), o.length) {
          const i = o.map((l) => `<img src="${l.startsWith("http") ? l : "https://aihot.news" + (l.startsWith("/") ? l : "/" + l)}" style="max-width:100%;border-radius:8px;margin:8px 0;" referrerpolicy="no-referrer" loading="lazy" />`).join("");
          c.push(`<div class="aihot-rsc-media">${i}</div>`);
        }
        if (r && !t)
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
const _ = y.getInstance();
export {
  y as AiHotService,
  b as DEFAULT_AIHOT_API,
  _ as aiHotService
};
