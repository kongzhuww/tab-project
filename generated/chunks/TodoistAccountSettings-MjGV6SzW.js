import { d as w, x as S, y as _, o as b, c as A, w as x, f as t, l as C, n as B, e as g, t as k, g as T, u as I, b as v } from "./vendor-vue-DokqDua_.js";
import { t as E } from "./module-state-Dt_XKbbf.js";
import "./window-manager.store-D_Nuf9-p.js";
/* empty css                                                                        */
import { M } from "./ModuleSettingsPanel-CJRtzfbF.js";
import { e as f, t as V } from "./todoist.service-CycKrQ6Y.js";
import { _ as D } from "./_plugin-vue_export-helper-CHgC5LLL.js";
async function N() {
  if (typeof chrome < "u" && chrome.storage?.local) {
    const a = await chrome.storage.local.get(f);
    return typeof a[f] == "string" ? a[f] : "";
  }
  return localStorage.getItem(f) || "";
}
async function O(a) {
  const c = a.trim();
  if (!c) throw new Error("请输入 Token；此入口不执行解除账号绑定。");
  await V.saveAccountToken(c);
}
const P = { class: "todoist-account-settings" }, $ = ["disabled"], K = {
  key: 0,
  role: "status",
  class: "status-msg"
}, U = { style: { "justify-content": "flex-end" } }, j = ["disabled"], W = /* @__PURE__ */ w({
  __name: "TodoistAccountSettings",
  props: {
    anchor: {},
    visible: { type: Boolean }
  },
  emits: ["close", "accountSaved"],
  setup(a, { emit: c }) {
    const d = a, m = c, s = v(""), l = v(!1), i = v(!1), n = v("");
    let r = "", u = 0;
    async function y() {
      if (l.value || !d.visible) return;
      const o = ++u;
      try {
        const e = await N();
        if (o !== u || !d.visible) return;
        r = e, s.value = e, l.value = !0;
      } catch {
        o === u && (n.value = "读取失败，保存禁用，请重新读取。");
      }
    }
    S(() => d.visible, (o) => {
      o ? y() : u++;
    }, { immediate: !0 }), _(() => {
      u++, s.value = "", r = "";
    });
    async function h() {
      if (!(!l.value || i.value || !d.visible)) {
        if (E.pendingWrites) {
          n.value = "任务或配置正在写入，请稍后再保存。";
          return;
        }
        i.value = !0, n.value = "";
        try {
          let o = !1;
          s.value !== r && (await O(s.value), r = s.value.trim(), s.value = r, o = !0, m("accountSaved")), n.value = o ? "✅ 配置已成功保存！" : "配置未变动。";
        } catch (o) {
          n.value = `❌ 保存失败：${o?.message || "请检查输入后重试"}`;
        } finally {
          i.value = !1;
        }
      }
    }
    return (o, e) => (b(), A(I(M), {
      anchor: a.anchor,
      visible: a.visible,
      label: "Todoist 设置",
      onClose: e[2] || (e[2] = (p) => m("close"))
    }, {
      default: x(() => [
        t("div", P, [
          t("header", null, [
            e[3] || (e[3] = t("strong", null, "Todoist 与日程配置", -1)),
            t("button", {
              type: "button",
              "aria-label": "关闭设置",
              onClick: e[0] || (e[0] = (p) => m("close"))
            }, "✕")
          ]),
          e[4] || (e[4] = t("p", null, "配置保存在本地浏览器；连接服务时，必要的账号信息会发送给对应服务。", -1)),
          e[5] || (e[5] = t("div", { class: "field-label-row" }, [
            t("label", { for: "todoist-account-token" }, "Todoist API Token"),
            t("a", {
              href: "https://app.todoist.com/app/settings/integrations/developer",
              target: "_blank",
              rel: "noreferrer",
              class: "api-link"
            }, "🔗 获取 Todoist Token")
          ], -1)),
          C(t("input", {
            id: "todoist-account-token",
            "onUpdate:modelValue": e[1] || (e[1] = (p) => s.value = p),
            type: "password",
            autocomplete: "off",
            disabled: !l.value || i.value,
            placeholder: "请输入你的 Todoist API Token"
          }, null, 8, $), [
            [B, s.value]
          ]),
          n.value ? (b(), g("p", K, k(n.value), 1)) : T("", !0),
          l.value ? T("", !0) : (b(), g("button", {
            key: 1,
            type: "button",
            onClick: y
          }, "重新读取")),
          t("footer", U, [
            t("button", {
              type: "button",
              class: "btn-primary-save",
              disabled: !l.value || i.value,
              onClick: h
            }, k(i.value ? "保存中…" : "💾 保存全部配置"), 9, j)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), L = /* @__PURE__ */ D(W, [["__scopeId", "data-v-c3cad5b9"]]);
export {
  L as default
};
