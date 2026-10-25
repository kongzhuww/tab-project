import { f as z, w as N, o as S, d as O, g as i, h as a, x as w, i as n, t as f, k as I, F as U, z as $, u as b, s as B, b as y, c as V } from "./vendor-vue-BUkfvXUI.js";
import { p as v } from "./main-CweYdEkj.js";
import { _ as W } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const A = { class: "vue-profile-panel-wrapper" }, G = {
  key: 0,
  id: "bili-message-panel",
  class: "bili-message-panel my-info-panel",
  style: { zIndex: 99999 }
}, R = { class: "bili-message-account" }, q = ["src"], F = { id: "bili-message-user" }, H = { class: "tab-manager-body" }, K = {
  key: 0,
  class: "tab-status-box muted small"
}, X = {
  key: 1,
  class: "tab-status-box muted small"
}, Y = {
  key: 2,
  class: "tab-group-container"
}, J = ["onClick"], Q = { class: "grp-toggle-arrow" }, Z = ["src"], ee = {
  key: 1,
  class: "grp-favicon-fallback"
}, te = { class: "grp-domain-title" }, oe = {
  key: 2,
  class: "grp-domain-sub"
}, se = { class: "grp-count-badge" }, ie = {
  key: 0,
  class: "tab-group-items"
}, ae = ["title", "onClick"], ne = ["src"], le = {
  key: 1,
  class: "tab-favicon-fallback"
}, ce = { class: "tab-title-text" }, re = {
  key: 2,
  class: "tab-current-pill"
}, ue = ["onClick"], de = /* @__PURE__ */ z({
  __name: "ProfilePanel",
  setup(me) {
    const h = v.state, _ = y(!1), u = y([]), p = y(/* @__PURE__ */ new Set());
    function k(t) {
      return p.value.has(t);
    }
    function x(t) {
      p.value.has(t) ? p.value.delete(t) : p.value.add(t);
    }
    const T = /* @__PURE__ */ new Set([
      "com.cn",
      "org.cn",
      "net.cn",
      "gov.cn",
      "edu.cn",
      "co.uk",
      "org.uk",
      "gov.uk",
      "ac.uk",
      "co.jp",
      "ne.jp",
      "ac.jp",
      "go.jp",
      "com.hk",
      "org.hk",
      "edu.hk",
      "com.tw",
      "org.tw",
      "club.tw"
    ]);
    function D(t, s = "") {
      try {
        const o = new URL(t), e = o.hostname.toLowerCase();
        if (o.protocol.includes("extension"))
          return {
            domain: "tab-project",
            title: "tab-project 新标签页",
            favIcon: "assets/bilibili.svg"
          };
        if (e === "localhost" || e === "127.0.0.1" || /^192\.168\./.test(e) || /^10\./.test(e) || /^172\.(1[6-9]|2\d|3[01])\./.test(e))
          return { domain: e, title: `局域网服务 (${e})` };
        const l = e.split(".");
        let c = e;
        if (l.length >= 3) {
          const d = `${l[l.length - 2]}.${l[l.length - 1]}`;
          T.has(d) ? c = `${l[l.length - 3]}.${d}` : c = `${l[l.length - 2]}.${l[l.length - 1]}`;
        } else
          c = e;
        let r = "";
        if (c === "bilibili.com") r = "哔哩哔哩 (Bilibili)";
        else if (c === "github.com") r = "GitHub 开发者";
        else if (c === "youtube.com" || c === "youtu.be") r = "YouTube 视界";
        else if (c === "google.com") r = "Google 搜索与云";
        else if (c === "zhihu.com") r = "知乎";
        else if (c === "v2ex.com") r = "V2EX 社区";
        else {
          if (s) {
            const d = s.split(/[\-_|_—|•]/);
            if (d.length > 1) {
              const g = d[d.length - 1].trim();
              g.length >= 2 && g.length <= 15 && (r = g);
            }
          }
          if (!r) {
            const d = c.split(".")[0];
            r = d.charAt(0).toUpperCase() + d.slice(1);
          }
        }
        return { domain: c, title: r };
      } catch {
        return { domain: "other", title: "其它网页" };
      }
    }
    const j = V(() => {
      const t = u.value, s = /* @__PURE__ */ new Map();
      for (const o of t) {
        const { domain: e, title: m, favIcon: l } = D(o.url || "", o.title || "");
        s.has(e) || s.set(e, {
          domain: e,
          domainTitle: m,
          favIconUrl: l || o.favIconUrl || "",
          tabs: []
        }), s.get(e).tabs.push(o);
      }
      return Array.from(s.values()).sort((o, e) => e.tabs.length - o.tabs.length);
    });
    async function C() {
      if (typeof chrome > "u" || !chrome.tabs?.query) {
        u.value = [
          { id: 1, title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili", url: "https://www.bilibili.com", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !1 },
          { id: 2, title: "Rewrite-番剧-全集-高清独家在线观看-bilibili", url: "https://www.bilibili.com/bangumi/play/ep...", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !0 }
        ];
        return;
      }
      _.value = !0;
      try {
        const t = await chrome.tabs.query({ currentWindow: !0 });
        u.value = t || [];
      } catch {
        u.value = [];
      } finally {
        _.value = !1;
      }
    }
    function E(t) {
      typeof chrome < "u" && chrome.tabs?.update && t?.id && (chrome.tabs.update(t.id, { active: !0 }), t.windowId && chrome.windows?.update && chrome.windows.update(t.windowId, { focused: !0 }));
    }
    function L(t) {
      typeof chrome < "u" && chrome.tabs?.remove && t ? chrome.tabs.remove(t).then(() => {
        u.value = u.value.filter((s) => s.id !== t);
      }) : u.value = u.value.filter((s) => s.id !== t);
    }
    N(
      () => h.isOpen,
      (t) => {
        t && C();
      },
      { immediate: !0 }
    ), S(() => v.setMounted(!0)), O(() => {
      v.setMounted(!1);
    });
    function M() {
      C();
    }
    function P() {
      v.closePanel();
    }
    return (t, s) => (i(), a("div", A, [
      w(h).isOpen ? (i(), a("section", G, [
        n("header", null, [
          n("div", R, [
            n("img", {
              id: "bili-message-avatar",
              src: w(h).userAvatar,
              alt: "用户头像",
              referrerpolicy: "no-referrer"
            }, null, 8, q),
            n("h2", F, f(w(h).userName), 1)
          ]),
          s[2] || (s[2] = n("span", { class: "grow" }, null, -1)),
          n("button", {
            id: "bili-message-refresh",
            type: "button",
            title: "刷新标签页",
            onClick: M
          }, "↻"),
          n("button", {
            id: "bili-message-close",
            class: "panel-header-close-btn",
            type: "button",
            title: "关闭面板",
            onClick: I(P, ["stop", "prevent"])
          }, " ✕ ")
        ]),
        n("div", H, [
          _.value ? (i(), a("div", K, [...s[3] || (s[3] = [
            n("span", null, "正在读取打开的标签页…", -1)
          ])])) : u.value.length === 0 ? (i(), a("div", X, [...s[4] || (s[4] = [
            n("span", null, "暂无打开的标签页", -1)
          ])])) : (i(), a("div", Y, [
            (i(!0), a(U, null, $(j.value, (o) => (i(), a("div", {
              key: o.domain,
              class: "tab-group-block"
            }, [
              n("div", {
                class: "tab-group-header",
                onClick: (e) => x(o.domain)
              }, [
                n("span", Q, f(k(o.domain) ? "▶" : "▼"), 1),
                o.favIconUrl && !o.favIconUrl.startsWith("chrome://") ? (i(), a("img", {
                  key: 0,
                  src: o.favIconUrl,
                  class: "grp-favicon",
                  alt: "",
                  loading: "lazy",
                  onError: s[0] || (s[0] = (e) => e.target.style.display = "none")
                }, null, 40, Z)) : (i(), a("span", ee, "🌐")),
                n("strong", te, f(o.domainTitle), 1),
                o.domain !== "tab-project" && o.domain !== o.domainTitle ? (i(), a("small", oe, " (" + f(o.domain) + ") ", 1)) : b("", !0),
                n("span", se, f(o.tabs.length), 1)
              ], 8, J),
              k(o.domain) ? b("", !0) : (i(), a("div", ie, [
                (i(!0), a(U, null, $(o.tabs, (e) => (i(), a("div", {
                  key: e.id,
                  class: B(["tab-tree-row", { "is-active-tab": e.active }]),
                  title: `${e.title}
${e.url}`,
                  onClick: (m) => E(e)
                }, [
                  e.favIconUrl && !e.favIconUrl.startsWith("chrome://") ? (i(), a("img", {
                    key: 0,
                    src: e.favIconUrl,
                    class: "tab-favicon",
                    alt: "",
                    loading: "lazy",
                    onError: s[1] || (s[1] = (m) => m.target.style.display = "none")
                  }, null, 40, ne)) : (i(), a("span", le, "🌐")),
                  n("span", ce, f(e.title || "未命名网页"), 1),
                  e.active ? (i(), a("span", re, "当前")) : b("", !0),
                  n("button", {
                    type: "button",
                    class: "tab-close-btn",
                    title: "关闭此标签页",
                    onClick: I((m) => L(e.id), ["stop"])
                  }, " ✕ ", 8, ue)
                ], 10, ae))), 128))
              ]))
            ]))), 128))
          ]))
        ])
      ])) : b("", !0)
    ]));
  }
}), be = /* @__PURE__ */ W(de, [["__scopeId", "data-v-534e6fe3"]]);
export {
  be as default
};
