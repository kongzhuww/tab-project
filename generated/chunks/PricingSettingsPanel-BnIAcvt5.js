import { d as R, r as S, x as B, L as V, o as c, c as N, w as j, f as s, i as G, m as w, l as I, n as K, t as y, e as g, g as A, b, s as M } from "./vendor-vue-DokqDua_.js";
import { M as T } from "./ModuleSettingsPanel-CJRtzfbF.js";
import { P as k, aI as E, aJ as U } from "./view-styles-CoGPhW6D.js";
import { _ as h } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const D = ["disabled"], H = { type: "submit" }, _ = ["disabled"], $ = { key: 1 }, J = {
  key: 2,
  role: "status"
}, L = /* @__PURE__ */ R({
  __name: "PricingSettingsPanel",
  props: {
    anchor: {},
    visible: { type: Boolean, default: !0 }
  },
  emits: ["close", "saved"],
  setup(p, { emit: x }) {
    const f = p, m = x, i = S({ artificialAnalysisApiKey: "", openRouterApiKey: "" }), v = S({ ...i }), n = b(!1), o = b(!1), u = b(!1), r = b(""), C = M(() => k.some((t) => i[t] !== v[t]));
    let a = !1, d = 0;
    async function P() {
      if (a || !f.visible || o.value || n.value || u.value) return;
      const t = ++d;
      o.value = !0;
      try {
        const e = await E();
        if (a || !f.visible || t !== d) return;
        Object.assign(v, e), Object.assign(i, e), n.value = !0, r.value = "";
      } catch {
        !a && f.visible && t === d && (r.value = "配置读取失败，未启用保存。可以重试读取。");
      } finally {
        t === d && (o.value = !1);
      }
    }
    B(() => f.visible, (t) => {
      t ? n.value || P() : (++d, o.value = !1);
    }, { immediate: !0, flush: "sync" });
    async function O() {
      if (!f.visible || !n.value || u.value || a) return;
      const t = { ...i }, e = { ...v };
      u.value = !0;
      try {
        const l = await U(t, e);
        if (a) return;
        Object.assign(v, l), Object.assign(i, l), r.value = "配置已保存。OpenRouter 同时供 GitHub AI 使用；保存不代表接口连通或已接入实时数据。", m("saved");
      } catch {
        a || (r.value = "保存或读取结果未确认，草稿保留；请核对后再操作，未自动重试。");
      } finally {
        a || (u.value = !1);
      }
    }
    return V(() => {
      a = !0, ++d;
      for (const t of k)
        i[t] = "", v[t] = "";
    }), (t, e) => (c(), N(T, {
      anchor: p.anchor,
      visible: p.visible,
      label: "模型数据设置",
      onClose: e[3] || (e[3] = (l) => m("close"))
    }, {
      default: j(() => [
        s("form", {
          class: "pricing-settings",
          onSubmit: G(O, ["prevent"])
        }, [
          s("header", null, [
            e[4] || (e[4] = s("strong", null, "模型数据设置", -1)),
            s("button", {
              type: "button",
              "aria-label": "隐藏设置，保留草稿",
              onClick: e[0] || (e[0] = (l) => m("close"))
            }, "✕")
          ]),
          s("fieldset", {
            disabled: !n.value || u.value
          }, [
            s("label", null, [
              e[5] || (e[5] = w("Artificial Analysis API Key", -1)),
              I(s("input", {
                "onUpdate:modelValue": e[1] || (e[1] = (l) => i.artificialAnalysisApiKey = l),
                type: "password",
                autocomplete: "off"
              }, null, 512), [
                [K, i.artificialAnalysisApiKey]
              ])
            ]),
            s("label", null, [
              e[6] || (e[6] = w("OpenRouter API Key", -1)),
              I(s("input", {
                "onUpdate:modelValue": e[2] || (e[2] = (l) => i.openRouterApiKey = l),
                type: "password",
                autocomplete: "off"
              }, null, 512), [
                [K, i.openRouterApiKey]
              ])
            ]),
            e[7] || (e[7] = s("p", null, "沿用现有存储键，不复制密钥。OpenRouter 是共享凭据，GitHub 的 AI 回退仍可读取它。", -1)),
            s("button", H, y(u.value ? "正在保存…" : "保存配置"), 1)
          ], 8, D),
          n.value ? A("", !0) : (c(), g("button", {
            key: 0,
            type: "button",
            disabled: o.value || !p.visible,
            onClick: P
          }, y(o.value ? "正在读取…" : "重试读取"), 9, _)),
          C.value ? (c(), g("p", $, "未保存更改；隐藏面板或离开卡片会保留草稿，关闭整个页面仍会丢失。")) : A("", !0),
          r.value ? (c(), g("p", J, y(r.value), 1)) : A("", !0)
        ], 32)
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), Q = /* @__PURE__ */ h(L, [["__scopeId", "data-v-671677fa"]]);
export {
  Q as default
};
