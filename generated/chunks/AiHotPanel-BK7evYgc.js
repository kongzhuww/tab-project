import { d as F, b as f, B as L, C as P, o as r, e as n, i as l, A as _, F as k, g as E, t as u, l as j, n as M, f as y, m as x, s as B } from "./vendor-vue-BrDsOMg2.js";
import { b as U } from "./aihot-feed-store-Djr3w-4z.js";
import { DEFAULT_AIHOT_API as V } from "./aihot.service-CWLwNpcK.js";
import { _ as q } from "./_plugin-vue_export-helper-Do3lP4W5.js";
const z = {
  class: "article-browser",
  "aria-label": "AI Hot 文章"
}, O = ["disabled"], R = { class: "layout" }, G = { "aria-label": "资讯分类" }, J = ["onClick"], K = { class: "toolbar" }, Q = {
  key: 0,
  class: "hint"
}, W = {
  key: 1,
  class: "hint",
  role: "alert"
}, X = {
  key: 2,
  class: "hint"
}, Y = { class: "grid" }, Z = ["draggable", "onDragstart"], ee = { class: "meta" }, te = ["disabled", "onClick"], ae = /* @__PURE__ */ F({
  __name: "AiHotPanel",
  props: {
    selected: {},
    disabled: { type: Boolean }
  },
  emits: ["close", "select", "dragStart", "dragEnd"],
  setup(h, { emit: H }) {
    const w = h, m = H, p = f([...U.feedArticles]), g = f(!1), v = f(""), A = f(""), d = f("");
    let i = null;
    const I = B(() => [...new Set(p.value.map((t) => t.category).filter((t) => !!t))]), $ = B(() => {
      const t = A.value.trim().toLowerCase();
      return p.value.filter((e) => (!d.value || e.category === d.value) && (!t || `${e.title} ${e.summary || ""}`.toLowerCase().includes(t)));
    });
    function S(t) {
      return w.selected.some((e) => e.url === t.url && e.title === t.title);
    }
    function N(t, e) {
      if (w.disabled) {
        t.preventDefault();
        return;
      }
      t.dataTransfer?.setData("application/x-tab-project-article", "article"), t.dataTransfer && (t.dataTransfer.effectAllowed = "copy"), m("dragStart", e);
    }
    async function C() {
      i?.abort();
      const t = new AbortController();
      i = t, g.value = !0, v.value = "";
      const e = setTimeout(() => t.abort(), 15e3);
      try {
        const a = new URLSearchParams({ mode: "selected", window: "24h", limit: "30" }), c = await fetch(`${V}/items?${a}`, { headers: { Accept: "application/json" }, signal: t.signal });
        if (!c.ok) throw new Error(`HTTP ${c.status}`);
        const o = await c.json(), T = Array.isArray(o?.items) ? o.items : Array.isArray(o?.data) ? o.data : Array.isArray(o) ? o : null;
        if (!T) throw new Error("资讯响应格式不匹配");
        if (t !== i) return;
        p.value = T.filter((s) => s && typeof s == "object").map((s) => {
          let D = s.published || "最新";
          if (s.publishedAt) {
            const b = new Date(s.publishedAt);
            Number.isFinite(b.getTime()) && (D = `${String(b.getMonth() + 1).padStart(2, "0")}-${String(b.getDate()).padStart(2, "0")} ${String(b.getHours()).padStart(2, "0")}:${String(b.getMinutes()).padStart(2, "0")}`);
          }
          return { id: String(s.id || s.externalId || ""), title: s.title || s.headline || "无标题", summary: s.summary || s.description || "", sourceName: s.source?.name || s.sourceName || s.site || "AI 资讯", published: D, category: s.category || "综合", url: s.links?.aihot || s.links?.original || s.url || s.link || "" };
        });
      } catch (a) {
        t === i && (v.value = t.signal.aborted ? "读取超时，请刷新重试。" : `读取失败：${a instanceof Error ? a.message : "网络异常"}`);
      } finally {
        clearTimeout(e), t === i && (g.value = !1, i = null);
      }
    }
    return L(() => {
      C();
    }), P(() => {
      i?.abort(), i = null, m("dragEnd");
    }), (t, e) => (r(), n("section", z, [
      l("header", null, [
        e[4] || (e[4] = l("div", null, [
          l("strong", null, "AI Hot 资讯"),
          l("small", null, "点击添加或拖到上方输入框 · 最近 24 小时")
        ], -1)),
        l("div", null, [
          l("button", {
            type: "button",
            disabled: g.value,
            onClick: C
          }, "↻ 刷新", 8, O),
          l("button", {
            type: "button",
            "aria-label": "关闭资源浏览",
            onClick: e[0] || (e[0] = (a) => m("close"))
          }, "✕")
        ])
      ]),
      l("div", R, [
        l("nav", G, [
          e[5] || (e[5] = l("small", null, "资讯分类", -1)),
          l("button", {
            type: "button",
            class: _({ active: !d.value }),
            onClick: e[1] || (e[1] = (a) => d.value = "")
          }, "全部资讯", 2),
          (r(!0), n(k, null, E(I.value, (a) => (r(), n("button", {
            key: a,
            type: "button",
            class: _({ active: d.value === a }),
            onClick: (c) => d.value = a
          }, u(a), 11, J))), 128))
        ]),
        l("main", null, [
          l("div", K, [
            l("strong", null, u(d.value || "精选资讯"), 1),
            j(l("input", {
              "onUpdate:modelValue": e[2] || (e[2] = (a) => A.value = a),
              type: "search",
              placeholder: "搜索已加载资讯",
              "aria-label": "筛选资讯"
            }, null, 512), [
              [M, A.value]
            ])
          ]),
          g.value && !p.value.length ? (r(), n("p", Q, "正在读取文章…")) : y("", !0),
          v.value ? (r(), n("p", W, [
            x(u(v.value), 1),
            p.value.length ? (r(), n(k, { key: 0 }, [
              x(" 当前显示已有数据。")
            ], 64)) : y("", !0)
          ])) : y("", !0),
          !g.value && !v.value && !$.value.length ? (r(), n("p", X, "暂无匹配文章。")) : y("", !0),
          l("div", Y, [
            (r(!0), n(k, null, E($.value, (a, c) => (r(), n("article", {
              key: `${a.id}-${c}`,
              class: _(["article", { selected: S(a) }]),
              draggable: !h.disabled,
              onDragstart: (o) => N(o, a),
              onDragend: e[3] || (e[3] = (o) => m("dragEnd"))
            }, [
              l("strong", null, u(a.title), 1),
              l("p", null, u(a.summary), 1),
              l("div", ee, u(a.sourceName) + " · " + u(a.published), 1),
              l("button", {
                type: "button",
                disabled: h.disabled,
                onClick: (o) => m("select", a)
              }, u(S(a) ? "✓ 已添加" : "＋ 添加"), 9, te)
            ], 42, Z))), 128))
          ])
        ])
      ]),
      e[6] || (e[6] = l("footer", null, "文章元信息会随消息发送，请检查敏感内容。", -1))
    ]));
  }
}), ne = /* @__PURE__ */ q(ae, [["__scopeId", "data-v-e28a1b00"]]);
export {
  ne as default
};
