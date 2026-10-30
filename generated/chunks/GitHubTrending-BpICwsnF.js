import { d as w, x as L, L as T, o as a, e as l, f as e, B as h, u as o, t as r, g as d, F as D, h as H, i as S, m as x, s as R } from "./vendor-vue-DokqDua_.js";
import { u as A } from "./useCardActivity-D5KsJv29.js";
import { g as _, i as B } from "./main-DMEcdWtY.js";
import { A as G } from "./search.service-DGqXHLyU.js";
import { _ as $ } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const M = { class: "vue-github-trending-wrapper" }, N = { class: "gh-trend-header-row" }, V = { class: "gh-trend-controls" }, z = { class: "gh-trend-range-pills" }, F = ["disabled"], E = {
  id: "trend-body",
  class: "gh-trend-body"
}, I = {
  key: 0,
  class: "gh-trend-source"
}, P = {
  key: 1,
  class: "notice"
}, U = {
  key: 2,
  class: "gh-trend-loading"
}, j = {
  key: 3,
  class: "repos"
}, q = ["onClick"], J = { class: "gh-trend-rank-tag" }, K = { class: "name" }, O = {
  key: 0,
  class: "owner"
}, Q = ["href"], W = {
  key: 0,
  class: "desc"
}, X = { class: "meta" }, Y = {
  key: 0,
  class: "lang"
}, Z = { class: "stars" }, tt = {
  key: 1,
  class: "forks"
}, et = {
  key: 4,
  class: "gh-trend-empty"
}, st = /* @__PURE__ */ w({
  __name: "GitHubTrending",
  setup(nt) {
    const s = B, { active: m } = A("card-github", "/github.html"), b = R(() => s.fetchedAt ? new Date(s.fetchedAt).toLocaleString() : "");
    let c, u;
    L(m, (i) => {
      c?.abort(), u?.(), u = void 0, i && (c = new AbortController(), u = _.attachView(c.signal));
    }, { immediate: !0, flush: "sync" }), T(() => {
      c?.abort(), u?.();
    });
    function f(i, t) {
      _.switchRange(i, t);
    }
    function k() {
      _.refresh();
    }
    function v(i) {
      _.selectRepo(i);
    }
    function y(i, t) {
      if (i.target?.closest("a")) return;
      i.preventDefault(), i.stopPropagation(), v(t);
      const g = t.full_name || (t.owner?.login ? `${t.owner.login}/${t.name}` : t.name);
      G.open(g, void 0, t);
    }
    function p(i) {
      return i == null ? "—" : i.toLocaleString();
    }
    return (i, t) => (a(), l("div", M, [
      e("header", N, [
        t[5] || (t[5] = e("div", { class: "gh-trend-title-block" }, [
          e("span", { class: "gh-trend-icon" }, "🔥"),
          e("div", null, [
            e("h3", null, "GitHub 开源发现"),
            e("small", null, "新建仓库搜索 / 第三方趋势快照 · 非实时榜单")
          ])
        ], -1)),
        e("div", V, [
          e("div", z, [
            e("button", {
              type: "button",
              class: h(["gh-trend-pill", { active: o(s).sinceDays === 1 }]),
              onClick: t[0] || (t[0] = (n) => f(1, "近 1 天"))
            }, " ⚡ 近 1 天 ", 2),
            e("button", {
              type: "button",
              class: h(["gh-trend-pill", { active: o(s).sinceDays === 7 }]),
              onClick: t[1] || (t[1] = (n) => f(7, "近 7 天"))
            }, " 📅 近 7 天 ", 2),
            e("button", {
              type: "button",
              class: h(["gh-trend-pill", { active: o(s).sinceDays === 30 }]),
              onClick: t[2] || (t[2] = (n) => f(30, "近 30 天"))
            }, " 🌙 近 30 天 ", 2)
          ]),
          e("button", {
            class: "gh-trend-refresh-btn",
            type: "button",
            disabled: o(s).isLoading,
            title: "重新读取公开数据源，不使用 GitHub 账号或 Token",
            onClick: k
          }, [
            e("span", {
              class: h({ spinning: o(s).isLoading })
            }, "↻", 2),
            t[4] || (t[4] = e("b", null, "刷新", -1))
          ], 8, F)
        ])
      ]),
      e("div", E, [
        o(s).hasLoaded ? (a(), l("p", I, r(o(s).sourceText) + " 本页读取时间：" + r(b.value) + "（不是源数据更新时间）。", 1)) : d("", !0),
        o(s).errorMessage ? (a(), l("p", P, r(o(s).errorMessage), 1)) : d("", !0),
        o(s).isLoading && !o(s).repos.length ? (a(), l("div", U, [...t[6] || (t[6] = [
          e("i", null, null, -1),
          e("span", null, "正在读取公开仓库数据…", -1)
        ])])) : o(s).repos.length ? (a(), l("div", j, [
          (a(!0), l(D, null, H(o(s).repos, (n, g) => (a(), l("div", {
            key: n.html_url + g,
            class: "repo gh-trend-card",
            onClick: (C) => y(C, n)
          }, [
            e("div", J, "#" + r(g + 1), 1),
            e("div", K, [
              n.owner?.login ? (a(), l("span", O, r(n.owner.login) + " / ", 1)) : d("", !0),
              e("a", {
                href: n.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-trend-title-link",
                title: "前往 GitHub 页面",
                onClick: t[3] || (t[3] = S(() => {
                }, ["stop"]))
              }, [
                e("strong", null, r(n.name), 1),
                t[7] || (t[7] = e("span", { class: "gh-trend-out-icon" }, "↗", -1))
              ], 8, Q)
            ]),
            n.description ? (a(), l("p", W, r(n.description), 1)) : d("", !0),
            e("div", X, [
              n.language ? (a(), l("span", Y, [
                t[8] || (t[8] = e("i", { class: "lang-dot" }, null, -1)),
                x(r(n.language), 1)
              ])) : d("", !0),
              e("span", Z, "★ " + r(p(n.stargazers_count)), 1),
              n.forks_count != null ? (a(), l("span", tt, "⌥ " + r(p(n.forks_count)), 1)) : d("", !0)
            ])
          ], 8, q))), 128))
        ])) : (a(), l("div", et, [
          e("span", null, r(o(s).hasLoaded ? "当前数据源在所选范围内未返回仓库" : o(s).errorMessage ? "尚无可展示的数据" : "打开后读取，或点击刷新"), 1)
        ]))
      ])
    ]));
  }
}), dt = /* @__PURE__ */ $(st, [["__scopeId", "data-v-c2a6b55f"]]);
export {
  dt as default
};
