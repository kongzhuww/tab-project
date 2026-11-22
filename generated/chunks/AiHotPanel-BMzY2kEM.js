import { d as j, b as f, o as F, G as L, f as r, g as n, h as l, q as A, F as k, i as E, t as u, p as P, v as q, j as y, m as x, s as H } from "./vendor-vue-C-_ocEUS.js";
import { b as M } from "./aihot-feed-store-C5Cd4xns.js";
import { DEFAULT_AIHOT_API as U } from "./aihot.service-BPfLNnTQ.js";
import { _ as V } from "./_plugin-vue_export-helper-CUD1GoS1.js";
const z = {
  class: "article-browser",
  "aria-label": "AI Hot 文章"
}, G = ["disabled"], O = { class: "layout" }, R = { "aria-label": "资讯分类" }, J = ["onClick"], K = { class: "toolbar" }, Q = {
  key: 0,
  class: "hint"
}, W = {
  key: 1,
  class: "hint",
  role: "alert"
}, X = {
  key: 2,
  class: "hint"
}, Y = { class: "grid" }, Z = ["draggable", "onDragstart"], ee = { class: "meta" }, te = ["disabled", "onClick"], ae = /* @__PURE__ */ j({
  __name: "AiHotPanel",
  props: {
    selected: {},
    disabled: { type: Boolean }
  },
  emits: ["close", "select", "dragStart", "dragEnd"],
  setup(h, { emit: I }) {
    const w = h, m = I, p = f([...M.feedArticles]), g = f(!1), v = f(""), _ = f(""), d = f("");
    let i = null;
    const N = H(() => [...new Set(p.value.map((t) => t.category).filter((t) => !!t))]), $ = H(() => {
      const t = _.value.trim().toLowerCase();
      return p.value.filter((e) => (!d.value || e.category === d.value) && (!t || `${e.title} ${e.summary || ""}`.toLowerCase().includes(t)));
    });
    function S(t) {
      return w.selected.some((e) => e.url === t.url && e.title === t.title);
    }
    function B(t, e) {
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
        const a = new URLSearchParams({ mode: "selected", window: "24h", limit: "30" }), c = await fetch(`${U}/items?${a}`, { headers: { Accept: "application/json" }, signal: t.signal });
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
    return F(() => {
      C();
    }), L(() => {
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
          }, "↻ 刷新", 8, G),
          l("button", {
            type: "button",
            "aria-label": "关闭资源浏览",
            onClick: e[0] || (e[0] = (a) => m("close"))
          }, "✕")
        ])
      ]),
      l("div", O, [
        l("nav", R, [
          e[5] || (e[5] = l("small", null, "资讯分类", -1)),
          l("button", {
            type: "button",
            class: A({ active: !d.value }),
            onClick: e[1] || (e[1] = (a) => d.value = "")
          }, "全部资讯", 2),
          (r(!0), n(k, null, E(N.value, (a) => (r(), n("button", {
            key: a,
            type: "button",
            class: A({ active: d.value === a }),
            onClick: (c) => d.value = a
          }, u(a), 11, J))), 128))
        ]),
        l("main", null, [
          l("div", K, [
            l("strong", null, u(d.value || "精选资讯"), 1),
            P(l("input", {
              "onUpdate:modelValue": e[2] || (e[2] = (a) => _.value = a),
              type: "search",
              placeholder: "搜索已加载资讯",
              "aria-label": "筛选资讯"
            }, null, 512), [
              [q, _.value]
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
              class: A(["article", { selected: S(a) }]),
              draggable: !h.disabled,
              onDragstart: (o) => B(o, a),
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
}), ne = /* @__PURE__ */ V(ae, [["__scopeId", "data-v-e28a1b00"]]);
export {
  ne as default
};
