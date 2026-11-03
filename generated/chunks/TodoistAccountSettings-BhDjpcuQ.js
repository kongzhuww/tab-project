import { d as S, w as A, z as B, o as y, e as C, f as x, h as o, t as r, u as s, n as I, q as E, g as _, i as T, b as p } from "./vendor-vue-FFI3kJnP.js";
import { t as M } from "./module-state-GmAjQSzX.js";
import "./window-manager.store-BD4IokhA.js";
import { t, _ as V } from "./_plugin-vue_export-helper-CVWGtx1v.js";
/* empty css                                                                        */
import { M as D } from "./ModuleSettingsPanel-C7Z6A-5y.js";
import { e as b, t as N } from "./todoist.service-CDSsgWpW.js";
async function O() {
  if (typeof chrome < "u" && chrome.storage?.local) {
    const n = await chrome.storage.local.get(b);
    return typeof n[b] == "string" ? n[b] : "";
  }
  return localStorage.getItem(b) || "";
}
async function P(n) {
  const f = n.trim();
  if (!f) throw new Error("请输入 Token；此入口不执行解除账号绑定。");
  await N.saveAccountToken(f);
}
const U = { class: "todoist-account-settings" }, F = ["aria-label"], K = { class: "field-label-row" }, $ = {
  href: "https://app.todoist.com/app/settings/integrations/developer",
  target: "_blank",
  rel: "noreferrer",
  class: "api-link"
}, j = ["disabled", "placeholder"], q = {
  key: 0,
  role: "status",
  class: "status-msg"
}, z = { style: { "justify-content": "flex-end" } }, L = ["disabled"], W = /* @__PURE__ */ S({
  __name: "TodoistAccountSettings",
  props: {
    anchor: {},
    visible: { type: Boolean }
  },
  emits: ["close", "accountSaved"],
  setup(n, { emit: f }) {
    const m = n, g = f, i = p(""), c = p(!1), u = p(!1), l = p("");
    let d = "", v = 0;
    async function k() {
      if (c.value || !m.visible) return;
      const a = ++v;
      try {
        const e = await O();
        if (a !== v || !m.visible) return;
        d = e, i.value = e, c.value = !0;
      } catch {
        a === v && (l.value = t("todoist.account.readFailed"));
      }
    }
    A(() => m.visible, (a) => {
      a ? k() : v++;
    }, { immediate: !0 }), B(() => {
      v++, i.value = "", d = "";
    });
    async function w() {
      if (!(!c.value || u.value || !m.visible)) {
        if (M.pendingWrites) {
          l.value = t("todoist.account.writingBusy");
          return;
        }
        u.value = !0, l.value = "";
        try {
          let a = !1;
          i.value !== d && (await P(i.value), d = i.value.trim(), i.value = d, a = !0, g("accountSaved")), l.value = a ? t("todoist.account.saveSuccess") : t("todoist.account.saveUnchanged");
        } catch (a) {
          l.value = t("todoist.account.saveFailed", { msg: a?.message || t("todoist.account.checkInput") });
        } finally {
          u.value = !1;
        }
      }
    }
    return (a, e) => (y(), C(s(D), {
      anchor: n.anchor,
      visible: n.visible,
      label: s(t)("todoist.account.settingsLabel"),
      onClose: e[2] || (e[2] = (h) => g("close"))
    }, {
      default: x(() => [
        o("div", U, [
          o("header", null, [
            o("strong", null, r(s(t)("todoist.account.title")), 1),
            o("button", {
              type: "button",
              "aria-label": s(t)("common.close"),
              onClick: e[0] || (e[0] = (h) => g("close"))
            }, "✕", 8, F)
          ]),
          o("p", null, r(s(t)("todoist.account.notice")), 1),
          o("div", K, [
            e[3] || (e[3] = o("label", { for: "todoist-account-token" }, "Todoist API Token", -1)),
            o("a", $, r(s(t)("todoist.account.getToken")), 1)
          ]),
          I(o("input", {
            id: "todoist-account-token",
            "onUpdate:modelValue": e[1] || (e[1] = (h) => i.value = h),
            type: "password",
            autocomplete: "off",
            disabled: !c.value || u.value,
            placeholder: s(t)("todoist.account.tokenPlaceholder")
          }, null, 8, j), [
            [E, i.value]
          ]),
          l.value ? (y(), _("p", q, r(l.value), 1)) : T("", !0),
          c.value ? T("", !0) : (y(), _("button", {
            key: 1,
            type: "button",
            onClick: k
          }, r(s(t)("todoist.account.reload")), 1)),
          o("footer", z, [
            o("button", {
              type: "button",
              class: "btn-primary-save",
              disabled: !c.value || u.value,
              onClick: w
            }, r(u.value ? s(t)("todoist.account.saving") : s(t)("todoist.account.saveBtn")), 9, L)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor", "visible", "label"]));
  }
}), Z = /* @__PURE__ */ V(W, [["__scopeId", "data-v-6868b0dc"]]);
export {
  Z as default
};
