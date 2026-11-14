import { b as T } from "./aihot-feed-store-BezpyKYJ.js";
import { DEFAULT_AIHOT_API as H } from "./aihot.service-2r4DeX5F.js";
import { d as I, b as y, B as N, K as B, o as n, e as l, i as s, f as d, m as f, t as u, F as S, g as E, A as F } from "./vendor-vue-BkY5-p5y.js";
import { _ as P } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const x = {
  class: "article-panel",
  "aria-label": "AI Hot 文章"
}, D = { class: "panel-tools" }, j = ["disabled"], L = { class: "article-list" }, M = {
  key: 0,
  class: "hint"
}, U = {
  key: 1,
  class: "hint",
  role: "alert"
}, V = {
  key: 2,
  class: "hint"
}, q = ["onClick"], z = { class: "rank" }, K = { class: "article-body" }, O = {
  key: 0,
  class: "summary"
}, R = { class: "meta" }, G = {
  key: 0,
  class: "check"
}, J = /* @__PURE__ */ I({
  __name: "AiHotPanel",
  props: {
    selected: {}
  },
  emits: ["close", "select"],
  setup($, { emit: w }) {
    const C = $, g = w, m = y([...T.feedArticles]), p = y(!1), _ = y("");
    let r = null;
    function b(a) {
      return C.selected.some((o) => o.url === a.url && o.title === a.title);
    }
    async function v() {
      r?.abort();
      const a = new AbortController();
      r = a, p.value = !0, _.value = "";
      const o = setTimeout(() => a.abort(), 15e3);
      try {
        const t = new URLSearchParams({ mode: "selected", window: "24h", limit: "30" }), c = await fetch(`${H}/items?${t}`, { headers: { Accept: "application/json" }, signal: a.signal });
        if (!c.ok) throw new Error(`HTTP ${c.status}`);
        const i = await c.json(), A = Array.isArray(i?.items) ? i.items : Array.isArray(i?.data) ? i.data : Array.isArray(i) ? i : null;
        if (!A) throw new Error("资讯响应格式不匹配");
        if (a !== r) return;
        m.value = A.filter((e) => e && typeof e == "object").map((e) => {
          let k = e.published || "最新";
          if (e.publishedAt) {
            const h = new Date(e.publishedAt);
            Number.isFinite(h.getTime()) && (k = `${String(h.getMonth() + 1).padStart(2, "0")}-${String(h.getDate()).padStart(2, "0")} ${String(h.getHours()).padStart(2, "0")}:${String(h.getMinutes()).padStart(2, "0")}`);
          }
          return { id: String(e.id || e.externalId || ""), title: e.title || e.headline || "无标题", summary: e.summary || e.description || "", sourceName: e.source?.name || e.sourceName || e.site || "AI 资讯", published: k, category: e.category || "综合", url: e.links?.aihot || e.links?.original || e.url || e.link || "" };
        });
      } catch (t) {
        a === r && (_.value = a.signal.aborted ? "读取超时，请刷新重试。" : `读取失败：${t instanceof Error ? t.message : "网络异常"}`);
      } finally {
        clearTimeout(o), a === r && (p.value = !1, r = null);
      }
    }
    return N(() => {
      v();
    }), B(() => {
      r?.abort(), r = null;
    }), (a, o) => (n(), l("aside", x, [
      s("header", null, [
        o[1] || (o[1] = s("div", null, [
          s("strong", null, "✦ AI Hot 文章"),
          s("small", null, "选择文章，添加到当前消息")
        ], -1)),
        s("button", {
          type: "button",
          "aria-label": "关闭文章侧栏",
          onClick: o[0] || (o[0] = (t) => g("close"))
        }, "✕")
      ]),
      s("div", D, [
        o[2] || (o[2] = s("span", null, "精选资讯 · 最近 24 小时", -1)),
        s("button", {
          type: "button",
          disabled: p.value,
          onClick: v
        }, "↻ 刷新", 8, j)
      ]),
      s("div", L, [
        p.value && !m.value.length ? (n(), l("p", M, "正在读取文章…")) : d("", !0),
        _.value ? (n(), l("p", U, [
          f(u(_.value), 1),
          m.value.length ? (n(), l(S, { key: 0 }, [
            f(" 当前显示已有数据。")
          ], 64)) : d("", !0)
        ])) : d("", !0),
        !p.value && !_.value && !m.value.length ? (n(), l("p", V, "暂无文章")) : d("", !0),
        (n(!0), l(S, null, E(m.value, (t, c) => (n(), l("button", {
          key: `${t.id}-${c}`,
          type: "button",
          class: F(["article", { selected: b(t) }]),
          onClick: (i) => g("select", t)
        }, [
          s("span", z, u(c + 1), 1),
          s("span", K, [
            s("strong", null, u(t.title), 1),
            t.summary ? (n(), l("span", O, u(t.summary), 1)) : d("", !0),
            s("span", R, [
              s("span", null, u(t.category), 1),
              f(" " + u(t.sourceName) + " ", 1),
              s("time", null, u(t.published), 1)
            ])
          ]),
          b(t) ? (n(), l("span", G, "✓")) : d("", !0)
        ], 10, q))), 128))
      ])
    ]));
  }
}), Z = /* @__PURE__ */ P(J, [["__scopeId", "data-v-181291f7"]]);
export {
  Z as default
};
