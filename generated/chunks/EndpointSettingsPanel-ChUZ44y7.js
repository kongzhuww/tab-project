import { d as w, L as h, D as g, o as m, e as k, f as x, h as t, k as B, t as c, p as U, n as C, q as L, g as M, i as S, b as d } from "./vendor-vue-FFI3kJnP.js";
import { M as E } from "./ModuleSettingsPanel-C7Z6A-5y.js";
import { _ as R } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const V = ["disabled"], D = {
  key: 0,
  role: "status"
}, N = /* @__PURE__ */ w({
  __name: "EndpointSettingsPanel",
  props: {
    anchor: {},
    label: {},
    hint: {},
    load: { type: Function },
    save: { type: Function },
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(l, { emit: b }) {
    const v = l, p = b, n = d("");
    let i = "";
    const f = d(!1), r = d(!1), u = d("");
    let o = !1;
    h(() => {
      o = !0;
    }), g(async () => {
      try {
        const s = await v.load();
        if (o) return;
        i = s, n.value = i, f.value = !0;
      } catch {
        if (o) return;
        u.value = "配置读取失败，已禁用保存。请关闭后重试。";
      }
    });
    async function y() {
      if (!(o || !f.value || r.value)) {
        r.value = !0;
        try {
          const s = n.value.trim();
          if (s) {
            const a = new URL(s);
            if (!["http:", "https:"].includes(a.protocol) || a.username || a.password) throw new Error("invalid-endpoint");
          }
          n.value !== i && await v.save(s);
          const e = await v.load();
          if (o) return;
          i = e, n.value = i, u.value = "节点配置已保存，没有发起网络请求。";
        } catch {
          if (o) return;
          u.value = "保存或重读失败，请检查 URL；不允许在 URL 中嵌入账号密码。关闭后重读确认。";
        } finally {
          r.value = !1;
        }
      }
    }
    return (s, e) => (m(), k(E, {
      anchor: l.anchor,
      label: l.label,
      visible: l.visible ?? !0,
      onClose: e[2] || (e[2] = (a) => p("close"))
    }, {
      default: x(() => [
        t("form", {
          class: "endpoint-settings",
          onSubmit: B(y, ["prevent"])
        }, [
          t("header", null, [
            t("strong", null, c(l.label), 1),
            t("button", {
              type: "button",
              "aria-label": "关闭设置",
              onClick: e[0] || (e[0] = (a) => p("close"))
            }, "✕")
          ]),
          t("fieldset", {
            disabled: !f.value || r.value
          }, [
            t("label", null, [
              e[3] || (e[3] = U("服务节点 URL", -1)),
              C(t("input", {
                "onUpdate:modelValue": e[1] || (e[1] = (a) => n.value = a),
                type: "url",
                autocomplete: "off"
              }, null, 512), [
                [L, n.value]
              ])
            ]),
            t("p", null, c(l.hint), 1),
            e[4] || (e[4] = t("button", { type: "submit" }, "保存节点", -1))
          ], 8, V),
          u.value ? (m(), M("p", D, c(u.value), 1)) : S("", !0)
        ], 32)
      ]),
      _: 1
    }, 8, ["anchor", "label", "visible"]));
  }
}), $ = /* @__PURE__ */ R(N, [["__scopeId", "data-v-e3bfe1d5"]]);
export {
  $ as default
};
