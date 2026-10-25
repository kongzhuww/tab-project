import { f as V, r as S, w as x, a as B, g as c, I as j, K as N, i as s, k as G, j as K, q as k, v as w, t as m, h as g, u as A, b, c as M } from "./vendor-vue-BUkfvXUI.js";
import { M as T } from "./ModuleSettingsPanel-v0eVtRbB.js";
import { P as I, V as h, W as E } from "./search.service-BNKrftAD.js";
import { _ as U } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const D = ["disabled"], H = { type: "submit" }, _ = ["disabled"], $ = { key: 1 }, q = {
  key: 2,
  role: "status"
}, W = /* @__PURE__ */ V({
  __name: "PricingSettingsPanel",
  props: {
    anchor: {},
    visible: { type: Boolean, default: !0 }
  },
  emits: ["close", "saved"],
  setup(p, { emit: C }) {
    const v = p, y = C, i = S({ artificialAnalysisApiKey: "", openRouterApiKey: "" }), d = S({ ...i }), n = b(!1), o = b(!1), u = b(!1), r = b(""), O = M(() => I.some((t) => i[t] !== d[t]));
    let a = !1, f = 0;
    async function P() {
      if (a || !v.visible || o.value || n.value || u.value) return;
      const t = ++f;
      o.value = !0;
      try {
        const e = await h();
        if (a || !v.visible || t !== f) return;
        Object.assign(d, e), Object.assign(i, e), n.value = !0, r.value = "";
      } catch {
        !a && v.visible && t === f && (r.value = "配置读取失败，未启用保存。可以重试读取。");
      } finally {
        t === f && (o.value = !1);
      }
    }
    x(() => v.visible, (t) => {
      t ? n.value || P() : (++f, o.value = !1);
    }, { immediate: !0, flush: "sync" });
    async function R() {
      if (!v.visible || !n.value || u.value || a) return;
      const t = { ...i }, e = { ...d };
      u.value = !0;
      try {
        const l = await E(t, e);
        if (a) return;
        Object.assign(d, l), Object.assign(i, l), r.value = "配置已保存。OpenRouter 同时供 GitHub AI 使用；保存不代表接口连通或已接入实时数据。", y("saved");
      } catch {
        a || (r.value = "保存或读取结果未确认，草稿保留；请核对后再操作，未自动重试。");
      } finally {
        a || (u.value = !1);
      }
    }
    return B(() => {
      a = !0, ++f;
      for (const t of I)
        i[t] = "", d[t] = "";
    }), (t, e) => (c(), j(T, {
      anchor: p.anchor,
      visible: p.visible,
      label: "模型数据设置",
      onClose: e[3] || (e[3] = (l) => y("close"))
    }, {
      default: N(() => [
        s("form", {
          class: "pricing-settings",
          onSubmit: G(R, ["prevent"])
        }, [
          s("header", null, [
            e[4] || (e[4] = s("strong", null, "模型数据设置", -1)),
            s("button", {
              type: "button",
              "aria-label": "隐藏设置，保留草稿",
              onClick: e[0] || (e[0] = (l) => y("close"))
            }, "✕")
          ]),
          s("fieldset", {
            disabled: !n.value || u.value
          }, [
            s("label", null, [
              e[5] || (e[5] = K("Artificial Analysis API Key", -1)),
              k(s("input", {
                "onUpdate:modelValue": e[1] || (e[1] = (l) => i.artificialAnalysisApiKey = l),
                type: "password",
                autocomplete: "off"
              }, null, 512), [
                [w, i.artificialAnalysisApiKey]
              ])
            ]),
            s("label", null, [
              e[6] || (e[6] = K("OpenRouter API Key", -1)),
              k(s("input", {
                "onUpdate:modelValue": e[2] || (e[2] = (l) => i.openRouterApiKey = l),
                type: "password",
                autocomplete: "off"
              }, null, 512), [
                [w, i.openRouterApiKey]
              ])
            ]),
            e[7] || (e[7] = s("p", null, "沿用现有存储键，不复制密钥。OpenRouter 是共享凭据，GitHub 的 AI 回退仍可读取它。", -1)),
            s("button", H, m(u.value ? "正在保存…" : "保存配置"), 1)
          ], 8, D),
          n.value ? A("", !0) : (c(), g("button", {
            key: 0,
            type: "button",
            disabled: o.value || !p.visible,
            onClick: P
          }, m(o.value ? "正在读取…" : "重试读取"), 9, _)),
          O.value ? (c(), g("p", $, "未保存更改；隐藏面板或离开卡片会保留草稿，关闭整个页面仍会丢失。")) : A("", !0),
          r.value ? (c(), g("p", q, m(r.value), 1)) : A("", !0)
        ], 32)
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), L = /* @__PURE__ */ U(W, [["__scopeId", "data-v-671677fa"]]);
export {
  L as default
};
