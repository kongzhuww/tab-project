import { d as Q, b as T, w as X, o as ae, G as ee, f as l, g as n, u as t, h as a, t as r, F as V, i as O, j as h, k as K, p as Y, v as J, s as M, q as p, l as se, m as G } from "./vendor-vue-_upDT3S_.js";
import { u as oe } from "./useCardActivity-CIWQA7rX.js";
import { b as D, c as ie, a as H } from "./aihot.service-PIUO0HmZ.js";
import { a as re } from "./store-CVDmnbEi.js";
import { f as le } from "./search.service-I5ZPPxGy.js";
import { t as d, _ as ne, c as j } from "./_plugin-vue_export-helper-DtNgUcga.js";
function Z(L, e) {
  try {
    const f = new URL(L, e);
    return (f.protocol === "https:" || f.protocol === "http:") && !f.username && !f.password ? f.href : "";
  } catch {
    return "";
  }
}
function N(L, e) {
  return Array.from(L.children).find((f) => f.localName.toLowerCase() === e);
}
function de(L, e) {
  const f = new DOMParser().parseFromString(L, "application/xml");
  if (f.querySelector("parsererror")) throw new Error("RSS / Atom 格式无效");
  const I = f.documentElement, _ = I.localName.toLowerCase(), v = _ === "rss" ? N(I, "channel") : I;
  if (!v || !["rss", "feed", "rdf"].includes(_)) throw new Error("不是 RSS 或 Atom 订阅");
  return Array.from(v.children).filter((y) => ["item", "entry"].includes(y.localName.toLowerCase())).map((y) => {
    const A = Array.from(y.children).filter((C) => C.localName.toLowerCase() === "link").find((C) => !C.getAttribute("rel") || C.getAttribute("rel") === "alternate"), m = A?.getAttribute("href") || A?.textContent || "", x = Z(m.trim(), e), S = (N(y, "title")?.textContent || "").trim(), k = (N(y, "summary")?.textContent || N(y, "description")?.textContent || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(), $ = (N(y, "published")?.textContent || N(y, "updated")?.textContent || N(y, "pubdate")?.textContent || "").trim();
    return { title: S, url: x, summary: k, published: $ };
  }).filter((y) => y.title && y.url);
}
const ue = ["aria-label"], ce = { class: "rss-toolbar" }, he = { for: "rss-channel-select" }, ve = ["value"], pe = ["value"], fe = ["disabled"], ye = ["placeholder", "aria-label"], be = ["placeholder", "aria-label"], me = { type: "submit" }, ge = {
  key: 1,
  class: "notice",
  role: "alert"
}, _e = {
  key: 0,
  class: "muted small",
  role: "status"
}, we = {
  key: 1,
  class: "aihot-grid"
}, ke = ["href"], Ce = { style: { "min-width": "0", flex: "1" } }, Ae = { class: "aihot-t" }, Se = {
  key: 0,
  class: "aihot-s"
}, $e = { class: "aihot-m" }, Ve = {
  key: 0,
  class: "muted small"
}, U = "lw-rss-channels-v1", W = "lw-rss-selected-v1", Le = /* @__PURE__ */ Q({
  __name: "RssChannels",
  props: {
    active: { type: Boolean }
  },
  emits: ["custom-selected"],
  setup(L, { emit: e }) {
    const f = L, I = e;
    function _() {
      try {
        const u = JSON.parse(localStorage.getItem(U) || "[]");
        return Array.isArray(u) ? u.filter((c) => typeof c?.name == "string" && Z(c.url) === c.url) : [];
      } catch {
        return [];
      }
    }
    const v = T(_()), w = T(localStorage.getItem(W) || "");
    v.value.some((u) => u.url === w.value) || (w.value = "");
    const y = T(""), P = T(""), A = T(!1), m = T(""), x = T(!1), S = T([]), k = M(() => v.value.find((u) => u.url === w.value));
    let $ = null;
    function C(u) {
      w.value = u;
      try {
        localStorage.setItem(W, u);
      } catch {
      }
    }
    function F() {
      const u = Z(P.value.trim());
      if (!u) {
        m.value = d("rss.invalidUrl");
        return;
      }
      if (v.value.some((s) => s.url === u)) {
        m.value = d("rss.duplicate");
        return;
      }
      const c = { name: y.value.trim() || new URL(u).hostname, url: u }, o = [...v.value, c];
      try {
        localStorage.setItem(U, JSON.stringify(o));
      } catch {
        m.value = d("rss.saveError");
        return;
      }
      v.value = o, y.value = "", P.value = "", A.value = !1, m.value = "", C(u);
    }
    function z() {
      if (!k.value) return;
      const u = v.value.filter((c) => c.url !== w.value);
      try {
        localStorage.setItem(U, JSON.stringify(u));
      } catch {
        m.value = d("rss.saveError");
        return;
      }
      v.value = u, C("");
    }
    async function q() {
      if ($?.abort(), !f.active || !k.value) return;
      const u = new AbortController();
      $ = u, x.value = !0, m.value = "", S.value = [];
      try {
        const c = await fetch(k.value.url, { signal: u.signal, credentials: "omit" });
        if (!c.ok) throw new Error(`HTTP ${c.status}`);
        const o = de(await c.text(), c.url || k.value.url);
        u.signal.aborted || (S.value = o);
      } catch (c) {
        u.signal.aborted || (m.value = `${d("rss.loadError")}: ${c instanceof Error ? c.message : ""}`);
      } finally {
        $ === u && ($ = null, x.value = !1);
      }
    }
    X([w, () => f.active], ([u, c]) => {
      I("custom-selected", !!u), $?.abort(), $ = null, x.value = !1, S.value = [], m.value = "", u && c && q();
    }, { immediate: !0 });
    function B() {
      v.value = _();
      const u = localStorage.getItem(W) || "";
      w.value = v.value.some((c) => c.url === u) ? u : "";
    }
    function E(u) {
      u.storageArea === localStorage && (u.key === U || u.key === W) && B();
    }
    function R(u) {
      const c = u.detail;
      c && (Object.hasOwn(c, U) || Object.hasOwn(c, W)) && B();
    }
    return ae(() => {
      window.addEventListener("storage", E), window.addEventListener("logicweaver:sync-restored", R);
    }), ee(() => {
      $?.abort(), window.removeEventListener("storage", E), window.removeEventListener("logicweaver:sync-restored", R);
    }), (u, c) => (l(), n("section", {
      class: "rss-channels",
      "aria-label": t(d)("rss.channels")
    }, [
      a("div", ce, [
        a("label", he, r(t(d)("rss.channels")), 1),
        a("select", {
          id: "rss-channel-select",
          value: w.value,
          onChange: c[0] || (c[0] = (o) => C(o.target.value))
        }, [
          c[4] || (c[4] = a("option", { value: "" }, "AI HOT", -1)),
          (l(!0), n(V, null, O(v.value, (o) => (l(), n("option", {
            key: o.url,
            value: o.url
          }, r(o.name), 9, pe))), 128))
        ], 40, ve),
        a("button", {
          type: "button",
          onClick: c[1] || (c[1] = (o) => A.value = !A.value)
        }, r(t(d)("rss.add")), 1),
        k.value ? (l(), n("button", {
          key: 0,
          type: "button",
          onClick: z
        }, r(t(d)("rss.remove")), 1)) : h("", !0),
        k.value ? (l(), n("button", {
          key: 1,
          type: "button",
          disabled: x.value || !L.active,
          onClick: q
        }, r(t(d)("rss.refresh")), 9, fe)) : h("", !0)
      ]),
      A.value ? (l(), n("form", {
        key: 0,
        class: "rss-form",
        onSubmit: K(F, ["prevent"])
      }, [
        Y(a("input", {
          "onUpdate:modelValue": c[2] || (c[2] = (o) => y.value = o),
          placeholder: t(d)("rss.name"),
          "aria-label": t(d)("rss.name")
        }, null, 8, ye), [
          [J, y.value]
        ]),
        Y(a("input", {
          "onUpdate:modelValue": c[3] || (c[3] = (o) => P.value = o),
          type: "url",
          required: "",
          placeholder: t(d)("rss.url"),
          "aria-label": t(d)("rss.url")
        }, null, 8, be), [
          [J, P.value]
        ]),
        a("button", me, r(t(d)("rss.save")), 1)
      ], 32)) : h("", !0),
      m.value ? (l(), n("p", ge, r(m.value), 1)) : h("", !0),
      k.value ? (l(), n(V, { key: 2 }, [
        x.value ? (l(), n("p", _e, r(t(d)("rss.loading")), 1)) : (l(), n("div", we, [
          (l(!0), n(V, null, O(S.value, (o, s) => (l(), n("a", {
            key: o.url + s,
            class: "aihot-item",
            href: o.url,
            target: "_blank",
            rel: "noopener noreferrer"
          }, [
            a("div", Ce, [
              a("div", Ae, r(o.title), 1),
              o.summary ? (l(), n("p", Se, r(o.summary), 1)) : h("", !0),
              a("div", $e, [
                a("span", null, r(k.value.name), 1),
                a("time", null, r(o.published), 1)
              ])
            ])
          ], 8, ke))), 128)),
          !S.value.length && !m.value ? (l(), n("p", Ve, r(t(d)("rss.empty")), 1)) : h("", !0)
        ]))
      ], 64)) : h("", !0)
    ], 8, ue));
  }
}), xe = /* @__PURE__ */ ne(Le, [["__scopeId", "data-v-bb63f8d9"]]), Ee = ["inert"], Re = { class: "aihot-workspace" }, Te = ["aria-label"], De = { class: "aihot-nav-wrap" }, Ie = ["aria-pressed"], Pe = { class: "aihot-nav-main" }, Ne = { class: "aihot-nav-copy" }, Me = { class: "aihot-nav-wrap" }, Oe = ["aria-pressed"], Fe = { class: "aihot-nav-main" }, Be = { class: "aihot-nav-copy" }, He = { class: "aihot-nav-wrap" }, Ue = ["aria-pressed"], We = { class: "aihot-nav-main" }, qe = { class: "aihot-nav-copy" }, ze = { class: "aihot-main" }, Ge = { class: "card-head" }, je = { id: "aihot-title" }, Ke = ["title", "disabled"], Ye = {
  key: 1,
  id: "aihot-subbar",
  class: "aihot-subbar"
}, Je = {
  class: "aihot-pills",
  id: "aihot-lb-provider-pills"
}, Ze = { class: "aihot-subbar-right" }, Qe = ["placeholder"], Xe = {
  class: "aihot-pills",
  id: "aihot-cat-pills"
}, et = { class: "aihot-subbar-right" }, tt = {
  class: "aihot-pills",
  id: "aihot-window-pills"
}, at = {
  key: 2,
  class: "muted small",
  role: "status"
}, st = {
  key: 3,
  class: "notice",
  role: "status"
}, ot = {
  key: 4,
  id: "aihot-body"
}, it = {
  key: 0,
  class: "notice"
}, rt = {
  key: 1,
  class: "muted small"
}, lt = {
  key: 2,
  class: "aihot-lb-list"
}, nt = ["href"], dt = { class: "aihot-lb-model" }, ut = { class: "aihot-lb-name" }, ct = { class: "aihot-lb-provider" }, ht = {
  class: "aihot-lb-score",
  title: "AIHOT 共识评分"
}, vt = {
  class: "aihot-lb-date aihot-lb-col-hide-mobile",
  title: "上线日期"
}, pt = {
  class: "aihot-lb-price aihot-lb-col-hide-mobile",
  title: "API 价格（¥/百万Token）"
}, ft = {
  key: 0,
  class: "muted small"
}, yt = {
  key: 3,
  class: "aihot-grid"
}, bt = ["href", "onClick"], mt = { style: { "min-width": "0", flex: "1" } }, gt = { class: "aihot-t" }, _t = {
  key: 0,
  class: "aihot-s"
}, wt = { class: "aihot-m" }, kt = {
  key: 0,
  class: "aihot-tag",
  style: { "margin-right": "6px" }
}, Ct = {
  key: 0,
  class: "muted small"
}, At = {
  key: 4,
  class: "aihot-daily-wrap"
}, St = {
  key: 0,
  class: "daily-news-days"
}, $t = ["onClick"], Vt = {
  key: 1,
  class: "muted small",
  role: "status"
}, Lt = {
  key: 2,
  class: "muted small"
}, xt = {
  key: 3,
  class: "aihot-daily-lead"
}, Et = { style: { display: "flex", "align-items": "center", "justify-content": "space-between", gap: "8px", "margin-bottom": "8px" } }, Rt = { style: { margin: "0" } }, Tt = ["href"], Dt = {
  key: 0,
  style: { "font-weight": "600", color: "var(--heading)", "margin-bottom": "4px" }
}, It = {
  key: 1,
  style: { "line-height": "1.6" }
}, Pt = {
  key: 2,
  class: "muted small"
}, Nt = { class: "aihot-daily-group-title" }, Mt = { class: "aihot-grid" }, Ot = ["href", "onClick"], Ft = { style: { "min-width": "0", flex: "1" } }, Bt = { class: "aihot-t" }, Ht = {
  key: 0,
  class: "aihot-s"
}, Ut = { class: "aihot-m" }, Wt = { key: 0 }, Zt = /* @__PURE__ */ Q({
  __name: "AihotFeed",
  setup(L) {
    const e = ie, { active: f, standalone: I } = oe("daily-aihot", "/aihot.html"), _ = /* @__PURE__ */ Symbol("aihot-feed-view"), v = T(!1);
    let w = !1;
    X(f, (o) => {
      if (!o) {
        D.pause(_);
        return;
      }
      if (!w) {
        w = !0, e.currentView = I ? "leaderboard" : "feed";
        try {
          const s = localStorage.getItem("lw-info-feed-view");
          (s === "leaderboard" || s === "feed" || s === "daily") && (e.currentView = s);
          const i = localStorage.getItem("lw-aihot-feed-cat");
          i && ["ai-models", "ai-products", "industry", "paper", "tip"].includes(i) && (e.feedCategory = i), localStorage.getItem("lw-aihot-feed-window") === "7d" && (e.feedWindow = "7d");
        } catch {
        }
      }
      (e.currentView !== "feed" || !v.value) && D.activate(_);
    }, { immediate: !0, flush: "sync" }), ee(() => {
      D.pause(_);
    });
    const y = M(() => {
      switch (e.currentView) {
        case "leaderboard":
          return d("aihot.view.leaderboard");
        case "feed":
          return d("aihot.view.feed");
        case "daily":
          return d("aihot.view.daily");
        default:
          return d("aihot.view.default");
      }
    }), P = M(() => e.statusMessage === "已获取来源数据。" ? d("aihot.status.dataFetched") : e.statusMessage === "正在显示缓存，检查更新中…" ? d("aihot.status.showingCache") : e.statusMessage === "保留当前已读取的数据；没有数据时显示空列表。" ? d("aihot.status.retainedData") : e.statusMessage), A = M(() => {
      let o = e.leaderboard;
      if (e.leaderboardProvider) {
        const s = e.leaderboardProvider.toLowerCase();
        o = o.filter((i) => i.provider.toLowerCase().includes(s));
      }
      if (e.leaderboardSearch) {
        const s = e.leaderboardSearch.trim().toLowerCase();
        o = o.filter(
          (i) => i.model.toLowerCase().includes(s) || i.provider.toLowerCase().includes(s)
        );
      }
      return o;
    }), m = {
      "ai-models": "模型发布",
      "ai-products": "产品动态",
      industry: "行业动态",
      paper: "学术论文",
      tip: "观点教程"
    }, x = M(() => {
      if (!e.feedCategory) return e.feedArticles;
      const o = e.feedCategory.toLowerCase(), s = m[o] || "", i = e.feedArticles.filter((g) => {
        const b = (g.category || "").toLowerCase();
        return b === o || s && b.includes(s) || o && b.includes(o);
      });
      return i.length ? i : e.feedArticles;
    }), S = M(() => {
      const o = x.value;
      return j.value !== "en" ? o : [...o].sort((s, i) => {
        const g = !!(s.originalTitle && /[a-zA-Z]{3,}/.test(s.originalTitle)), b = !!(i.originalTitle && /[a-zA-Z]{3,}/.test(i.originalTitle));
        return g && !b ? -1 : !g && b ? 1 : 0;
      });
    });
    function k(o) {
      return j.value === "en" && o.originalTitle ? o.originalTitle : o.title;
    }
    function $(o) {
      const s = o.sourceName || "AI HOT";
      return j.value === "en" && s.includes("：") ? s.split("：")[0].trim() : s;
    }
    const C = M(() => e.currentView === "leaderboard" ? A.value.length > 0 : e.currentView === "feed" ? S.value.length > 0 : e.currentView === "daily" ? !!e.dailyReport : !1);
    function F(o) {
      o !== "feed" && v.value && (v.value = !1, D.activate(_)), D.switchView(o);
    }
    function z(o) {
      v.value = o, !(!f.value || e.currentView !== "feed") && (o ? D.pause(_) : D.activate(_));
    }
    function q() {
      D.refresh();
    }
    function B(o) {
      const s = window;
      if (typeof s.openAiHotArticle == "function") {
        s.openAiHotArticle(o.raw || o, o.url);
        return;
      }
      re.openArticle(
        {
          id: o.id,
          title: o.title,
          summary: o.summary,
          sourceName: o.sourceName,
          published: o.published,
          url: o.url
        },
        ""
      ), H.dispatch("select-article", o);
    }
    function E(o) {
      e.leaderboardProvider = o, H.dispatch("select-provider", o);
    }
    function R(o) {
      e.feedCategory = o, H.dispatch("change-category", o);
      try {
        localStorage.setItem("lw-aihot-feed-cat", o);
      } catch {
      }
    }
    function u(o) {
      e.feedWindow = o, H.dispatch("change-window", o);
      try {
        localStorage.setItem("lw-aihot-feed-window", o);
      } catch {
      }
    }
    function c(o) {
      e.activeDailyDate = o, H.dispatch("select-daily-date", o);
    }
    return (o, s) => (l(), n("div", {
      class: "vue-aihot-wrapper",
      inert: !t(f)
    }, [
      a("section", {
        id: "daily-aihot",
        class: p(["card wide", { "card-fullscreen": t(le).activeId === "daily-aihot" }])
      }, [
        a("div", Re, [
          a("nav", {
            id: "aihot-tabs",
            class: "aihot-tabs",
            "aria-label": t(d)("aihot.nav.label")
          }, [
            a("div", De, [
              a("button", {
                type: "button",
                "data-view": "leaderboard",
                class: p(["aihot-nav-card rank", { active: t(e).currentView === "leaderboard" }]),
                "aria-pressed": t(e).currentView === "leaderboard",
                onClick: s[0] || (s[0] = (i) => F("leaderboard"))
              }, [
                a("span", Pe, [
                  s[19] || (s[19] = a("span", {
                    class: "aihot-nav-icon",
                    "aria-hidden": "true"
                  }, "🏆", -1)),
                  a("span", Ne, [
                    a("strong", null, r(t(d)("aihot.nav.rank")), 1),
                    a("small", null, r(t(d)("aihot.nav.rankDesc")), 1)
                  ])
                ]),
                s[20] || (s[20] = a("span", { class: "aihot-nav-badge" }, "RANK", -1))
              ], 10, Ie)
            ]),
            a("div", Me, [
              a("button", {
                type: "button",
                "data-view": "feed",
                class: p(["aihot-nav-card feed", { active: t(e).currentView === "feed" }]),
                "aria-pressed": t(e).currentView === "feed",
                onClick: s[1] || (s[1] = (i) => F("feed"))
              }, [
                a("span", Fe, [
                  s[21] || (s[21] = a("span", {
                    class: "aihot-nav-icon",
                    "aria-hidden": "true"
                  }, "✦", -1)),
                  a("span", Be, [
                    a("strong", null, r(t(d)("aihot.nav.feed")), 1),
                    a("small", null, r(t(d)("aihot.nav.feedDesc")), 1)
                  ])
                ]),
                s[22] || (s[22] = a("span", { class: "aihot-nav-badge" }, "NEWS", -1))
              ], 10, Oe)
            ]),
            a("div", He, [
              a("button", {
                type: "button",
                "data-view": "daily",
                class: p(["aihot-nav-card daily", { active: t(e).currentView === "daily" }]),
                "aria-pressed": t(e).currentView === "daily",
                onClick: s[2] || (s[2] = (i) => F("daily"))
              }, [
                a("span", We, [
                  s[23] || (s[23] = a("span", {
                    class: "aihot-nav-icon",
                    "aria-hidden": "true"
                  }, "📰", -1)),
                  a("span", qe, [
                    a("strong", null, r(t(d)("aihot.nav.daily")), 1),
                    a("small", null, r(t(d)("aihot.nav.dailyDesc")), 1)
                  ])
                ]),
                s[24] || (s[24] = a("span", { class: "aihot-nav-badge" }, "DAILY", -1))
              ], 10, Ue)
            ])
          ], 8, Te),
          a("main", ze, [
            a("header", Ge, [
              s[25] || (s[25] = a("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#34d399,#38bdf8)" }
              }, null, -1)),
              a("h2", je, r(y.value), 1),
              !v.value || t(e).currentView !== "feed" ? (l(), n("button", {
                key: 0,
                id: "aihot-refresh",
                class: "icon-btn",
                title: t(d)("aihot.refreshTip"),
                disabled: !t(f) || t(e).isLoading,
                type: "button",
                onClick: q
              }, "↻", 8, Ke)) : h("", !0)
            ]),
            t(e).currentView === "feed" ? (l(), se(xe, {
              key: 0,
              active: t(f),
              onCustomSelected: z
            }, null, 8, ["active"])) : h("", !0),
            t(e).currentView === "leaderboard" || t(e).currentView === "feed" && !v.value ? (l(), n("div", Ye, [
              t(e).currentView === "leaderboard" ? (l(), n(V, { key: 0 }, [
                a("div", Je, [
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: !t(e).leaderboardProvider }]),
                    onClick: s[3] || (s[3] = (i) => E(""))
                  }, r(t(d)("aihot.allProviders")), 3),
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: t(e).leaderboardProvider === "Anthropic" }]),
                    onClick: s[4] || (s[4] = (i) => E("Anthropic"))
                  }, " Anthropic ", 2),
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: t(e).leaderboardProvider === "OpenAI" }]),
                    onClick: s[5] || (s[5] = (i) => E("OpenAI"))
                  }, " OpenAI ", 2),
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: t(e).leaderboardProvider === "Meta" }]),
                    onClick: s[6] || (s[6] = (i) => E("Meta"))
                  }, " Meta ", 2),
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: t(e).leaderboardProvider === "Google" }]),
                    onClick: s[7] || (s[7] = (i) => E("Google"))
                  }, " Google ", 2),
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: t(e).leaderboardProvider === "DeepSeek" }]),
                    onClick: s[8] || (s[8] = (i) => E("DeepSeek"))
                  }, " DeepSeek ", 2)
                ]),
                a("div", Ze, [
                  Y(a("input", {
                    type: "text",
                    class: "aihot-search-input",
                    id: "aihot-lb-search",
                    placeholder: t(d)("aihot.searchPlaceholder"),
                    "onUpdate:modelValue": s[9] || (s[9] = (i) => t(e).leaderboardSearch = i)
                  }, null, 8, Qe), [
                    [J, t(e).leaderboardSearch]
                  ])
                ])
              ], 64)) : t(e).currentView === "feed" ? (l(), n(V, { key: 1 }, [
                a("div", Xe, [
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: !t(e).feedCategory }]),
                    onClick: s[10] || (s[10] = (i) => R(""))
                  }, r(t(d)("aihot.category.all")), 3),
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: t(e).feedCategory === "ai-models" }]),
                    onClick: s[11] || (s[11] = (i) => R("ai-models"))
                  }, r(t(d)("aihot.category.models")), 3),
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: t(e).feedCategory === "ai-products" }]),
                    onClick: s[12] || (s[12] = (i) => R("ai-products"))
                  }, r(t(d)("aihot.category.products")), 3),
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: t(e).feedCategory === "industry" }]),
                    onClick: s[13] || (s[13] = (i) => R("industry"))
                  }, r(t(d)("aihot.category.industry")), 3),
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: t(e).feedCategory === "paper" }]),
                    onClick: s[14] || (s[14] = (i) => R("paper"))
                  }, r(t(d)("aihot.category.paper")), 3),
                  a("button", {
                    type: "button",
                    class: p(["aihot-pill", { active: t(e).feedCategory === "tip" }]),
                    onClick: s[15] || (s[15] = (i) => R("tip"))
                  }, r(t(d)("aihot.category.tip")), 3)
                ]),
                a("div", et, [
                  a("div", tt, [
                    a("button", {
                      type: "button",
                      class: p(["aihot-pill", { active: t(e).feedWindow === "24h" }]),
                      onClick: s[16] || (s[16] = (i) => u("24h"))
                    }, r(t(d)("aihot.window.24h")), 3),
                    a("button", {
                      type: "button",
                      class: p(["aihot-pill", { active: t(e).feedWindow === "7d" }]),
                      onClick: s[17] || (s[17] = (i) => u("7d"))
                    }, r(t(d)("aihot.window.7d")), 3)
                  ])
                ])
              ], 64)) : h("", !0)
            ])) : h("", !0),
            !v.value && t(e).statusMessage ? (l(), n("p", at, r(P.value), 1)) : h("", !0),
            !v.value && t(e).errorMessage && C.value ? (l(), n("p", st, r(t(e).errorMessage), 1)) : h("", !0),
            v.value ? h("", !0) : (l(), n("div", ot, [
              t(e).errorMessage && !C.value ? (l(), n("p", it, r(t(e).errorMessage), 1)) : t(e).isLoading && !C.value ? (l(), n("p", rt, r(t(d)("aihot.loading")), 1)) : t(e).currentView === "leaderboard" ? (l(), n("div", lt, [
                (l(!0), n(V, null, O(A.value, (i, g) => (l(), n("a", {
                  key: i.model + g,
                  href: i.href,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "aihot-lb-row"
                }, [
                  a("div", {
                    class: p(["aihot-lb-rank", {
                      "rank-1": i.rank === "1",
                      "rank-2": i.rank === "2",
                      "rank-3": i.rank === "3"
                    }])
                  }, r(i.rank), 3),
                  a("div", dt, [
                    a("div", ut, r(i.model), 1),
                    a("div", ct, r(i.provider || "权威厂商"), 1)
                  ]),
                  a("div", ht, " ★ " + r(i.score || "-"), 1),
                  a("div", vt, r(i.releaseDate || "-"), 1),
                  a("div", pt, [
                    a("div", null, [
                      s[26] || (s[26] = G("入 ", -1)),
                      a("strong", null, r(i.inputPrice || "-"), 1)
                    ]),
                    a("div", null, [
                      s[27] || (s[27] = G("出 ", -1)),
                      a("strong", null, r(i.outputPrice || "-"), 1)
                    ])
                  ]),
                  s[28] || (s[28] = a("div", { style: { "text-align": "right" } }, [
                    a("span", {
                      class: "aihot-btn",
                      style: { "font-size": "10.5px" }
                    }, "详情 ↗")
                  ], -1))
                ], 8, nt))), 128)),
                A.value.length ? h("", !0) : (l(), n("p", ft, " 没有找到与 “" + r(t(e).leaderboardSearch) + "” 匹配的模型。 ", 1))
              ])) : t(e).currentView === "feed" ? (l(), n("div", yt, [
                (l(!0), n(V, null, O(S.value, (i, g) => (l(), n("a", {
                  key: i.id || i.title + g,
                  href: i.url,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "aihot-item",
                  onClick: K((b) => B(i), ["prevent"])
                }, [
                  a("span", {
                    class: p(["aihot-rank", { top: g < 3 }])
                  }, r(g + 1), 3),
                  a("div", mt, [
                    a("div", gt, r(k(i)), 1),
                    i.summary ? (l(), n("p", _t, r(i.summary), 1)) : h("", !0),
                    a("div", wt, [
                      a("span", null, [
                        i.category ? (l(), n("span", kt, r(i.category), 1)) : h("", !0),
                        G(" " + r($(i)), 1)
                      ]),
                      a("time", null, r(i.published), 1)
                    ])
                  ])
                ], 8, bt))), 128)),
                S.value.length ? h("", !0) : (l(), n("p", Ct, r(t(d)("aihot.emptyFeed")), 1))
              ])) : t(e).currentView === "daily" ? (l(), n("div", At, [
                t(e).dailyArchives.length ? (l(), n("div", St, [
                  a("button", {
                    type: "button",
                    class: p({ active: !t(e).activeDailyDate }),
                    onClick: s[18] || (s[18] = (i) => c(""))
                  }, "最新", 2),
                  (l(!0), n(V, null, O(t(e).dailyArchives, (i) => (l(), n("button", {
                    key: i.date,
                    type: "button",
                    class: p({ active: i.date === t(e).activeDailyDate }),
                    onClick: (g) => c(i.date)
                  }, r(i.date.slice(5)), 11, $t))), 128))
                ])) : h("", !0),
                t(e).dailyArchiveWarning ? (l(), n("p", Vt, r(t(e).dailyArchiveWarning), 1)) : h("", !0),
                !t(e).dailyReport && !t(e).isLoading ? (l(), n("p", Lt, "暂无当日日报内容。")) : h("", !0),
                t(e).dailyReport ? (l(), n("div", xt, [
                  a("div", Et, [
                    a("h3", Rt, "📅 AIHOT 官方行业晨报 · " + r(t(e).dailyReport.date), 1),
                    t(e).dailyReport.links?.aihot ? (l(), n("a", {
                      key: 0,
                      href: t(e).dailyReport.links.aihot,
                      target: "_blank",
                      rel: "noreferrer",
                      class: "aihot-btn"
                    }, " 查看官方网页 ↗ ", 8, Tt)) : h("", !0)
                  ]),
                  t(e).dailyReport.leadTitle ? (l(), n("p", Dt, r(t(e).dailyReport.leadTitle), 1)) : h("", !0),
                  t(e).dailyReport.leadParagraph ? (l(), n("p", It, r(t(e).dailyReport.leadParagraph), 1)) : t(e).dailyReport.sections.length ? h("", !0) : (l(), n("p", Pt, "官方本期暂无更多内容。"))
                ])) : h("", !0),
                (l(!0), n(V, null, O(t(e).dailyReport?.sections || [], (i, g) => (l(), n("div", {
                  key: i.label + g,
                  class: "aihot-daily-group"
                }, [
                  a("div", Nt, r(i.label), 1),
                  a("div", Mt, [
                    (l(!0), n(V, null, O(i.items, (b, te) => (l(), n("a", {
                      key: b.id || b.title + te,
                      href: b.url,
                      target: "_blank",
                      rel: "noreferrer",
                      class: "aihot-item",
                      onClick: K((qt) => B(b), ["prevent"])
                    }, [
                      a("div", Ft, [
                        a("div", Bt, r(b.title), 1),
                        b.summary ? (l(), n("p", Ht, r(b.summary), 1)) : h("", !0),
                        a("div", Ut, [
                          a("span", null, r(b.sourceName), 1),
                          b.published ? (l(), n("time", Wt, r(b.published), 1)) : h("", !0)
                        ])
                      ])
                    ], 8, Ot))), 128))
                  ])
                ]))), 128))
              ])) : h("", !0)
            ]))
          ])
        ])
      ], 2)
    ], 8, Ee));
  }
});
export {
  Zt as default
};
