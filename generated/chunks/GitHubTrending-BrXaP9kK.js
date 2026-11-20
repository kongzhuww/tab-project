import { d as w, w as C, H as D, f as l, g as i, h as e, s as _, u as a, t as r, j as d, F as H, i as S, k as T, m as x, x as L } from "./vendor-vue-BbmU9NUg.js";
import { u as R } from "./useCardActivity-CXFXWuCr.js";
import { g as m, e as $ } from "./github-task-modal-store-BmukMkrV.js";
import { q as A } from "./github.service-mYu1TuZI.js";
import { _ as B } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const G = { class: "vue-github-trending-wrapper" }, M = { class: "gh-trend-header-row" }, N = { class: "gh-trend-controls" }, V = { class: "gh-trend-range-pills" }, z = {
  id: "trend-body",
  class: "gh-trend-body"
}, F = {
  key: 0,
  class: "gh-trend-source"
}, j = {
  key: 1,
  class: "notice"
}, q = {
  key: 2,
  class: "gh-trend-loading"
}, E = {
  key: 3,
  class: "repos"
}, I = ["onClick"], P = { class: "gh-trend-rank-tag" }, U = { class: "name" }, J = {
  key: 0,
  class: "owner"
}, K = ["href"], O = {
  key: 0,
  class: "desc"
}, Q = { class: "meta" }, W = {
  key: 0,
  class: "lang"
}, X = { class: "stars" }, Y = {
  key: 1,
  class: "forks"
}, Z = {
  key: 4,
  class: "gh-trend-empty"
}, tt = /* @__PURE__ */ w({
  __name: "GitHubTrending",
  setup(et) {
    const n = $, { active: p } = R("card-github", "/github.html"), k = L(() => n.fetchedAt ? new Date(n.fetchedAt).toLocaleString() : "");
    let c, u;
    C(p, (o) => {
      c?.abort(), u?.(), u = void 0, o && (c = new AbortController(), u = m.attachView(c.signal));
    }, { immediate: !0, flush: "sync" }), D(() => {
      c?.abort(), u?.();
    });
    function h(o, t) {
      m.switchRange(o, t);
    }
    function v(o) {
      m.selectRepo(o);
    }
    function b(o, t) {
      if (o.target?.closest("a")) return;
      o.preventDefault(), o.stopPropagation(), v(t);
      const g = t.full_name || (t.owner?.login ? `${t.owner.login}/${t.name}` : t.name);
      A.open(g, void 0, t);
    }
    function f(o) {
      return o == null ? "—" : o.toLocaleString();
    }
    return (o, t) => (l(), i("div", G, [
      e("header", M, [
        t[4] || (t[4] = e("div", { class: "gh-trend-title-block" }, [
          e("span", { class: "gh-trend-icon" }, "🔥"),
          e("div", null, [
            e("h3", null, "GitHub 开源发现"),
            e("small", null, "新建仓库搜索 / 第三方趋势快照 · 非实时榜单")
          ])
        ], -1)),
        e("div", N, [
          e("div", V, [
            e("button", {
              type: "button",
              class: _(["gh-trend-pill", { active: a(n).sinceDays === 1 }]),
              onClick: t[0] || (t[0] = (s) => h(1, "近 1 天"))
            }, " ⚡ 近 1 天 ", 2),
            e("button", {
              type: "button",
              class: _(["gh-trend-pill", { active: a(n).sinceDays === 7 }]),
              onClick: t[1] || (t[1] = (s) => h(7, "近 7 天"))
            }, " 📅 近 7 天 ", 2),
            e("button", {
              type: "button",
              class: _(["gh-trend-pill", { active: a(n).sinceDays === 30 }]),
              onClick: t[2] || (t[2] = (s) => h(30, "近 30 天"))
            }, " 🌙 近 30 天 ", 2)
          ])
        ])
      ]),
      e("div", z, [
        a(n).hasLoaded ? (l(), i("p", F, r(a(n).sourceText) + " 本页读取时间：" + r(k.value) + "（不是源数据更新时间）。", 1)) : d("", !0),
        a(n).errorMessage ? (l(), i("p", j, r(a(n).errorMessage), 1)) : d("", !0),
        a(n).isLoading && !a(n).repos.length ? (l(), i("div", q, [...t[5] || (t[5] = [
          e("i", null, null, -1),
          e("span", null, "正在读取公开仓库数据…", -1)
        ])])) : a(n).repos.length ? (l(), i("div", E, [
          (l(!0), i(H, null, S(a(n).repos, (s, g) => (l(), i("div", {
            key: s.html_url + g,
            class: "repo gh-trend-card",
            onClick: (y) => b(y, s)
          }, [
            e("div", P, "#" + r(g + 1), 1),
            e("div", U, [
              s.owner?.login ? (l(), i("span", J, r(s.owner.login) + " / ", 1)) : d("", !0),
              e("a", {
                href: s.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-trend-title-link",
                title: "前往 GitHub 页面",
                onClick: t[3] || (t[3] = T(() => {
                }, ["stop"]))
              }, [
                e("strong", null, r(s.name), 1),
                t[6] || (t[6] = e("span", { class: "gh-trend-out-icon" }, "↗", -1))
              ], 8, K)
            ]),
            s.description ? (l(), i("p", O, r(s.description), 1)) : d("", !0),
            e("div", Q, [
              s.language ? (l(), i("span", W, [
                t[7] || (t[7] = e("i", { class: "lang-dot" }, null, -1)),
                x(r(s.language), 1)
              ])) : d("", !0),
              e("span", X, "★ " + r(f(s.stargazers_count)), 1),
              s.forks_count != null ? (l(), i("span", Y, "⌥ " + r(f(s.forks_count)), 1)) : d("", !0)
            ])
          ], 8, I))), 128))
        ])) : (l(), i("div", Z, [
          e("span", null, r(a(n).hasLoaded ? "当前数据源在所选范围内未返回仓库" : a(n).errorMessage ? "尚无可展示的数据" : "打开后读取"), 1)
        ]))
      ])
    ]));
  }
}), it = /* @__PURE__ */ B(tt, [["__scopeId", "data-v-f3583be0"]]);
export {
  it as default
};
