import { f as _, w as I, a as E, g as b, h, i as o, j as D, q as A, v as x, t as T, u as C, b as f, d as O, I as $, K as B, l as V, x as N } from "./vendor-vue-BUkfvXUI.js";
import { t as S, w as K } from "./module-state-BVJNDzfS.js";
import "./read-session-BWENvNUM.js";
/* empty css                                                                        */
import { M } from "./ModuleSettingsPanel-v0eVtRbB.js";
import { _ as G } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { T as w, t as U } from "./todoist.service-DeCQ21Vr.js";
const P = { class: "calendar-connection" }, W = ["disabled"], j = {
  key: 0,
  role: "status",
  class: "status-msg"
}, p = "gmailOAuthClientId", q = /* @__PURE__ */ _({
  __name: "GoogleCalendarConnection",
  props: {
    visible: { type: Boolean }
  },
  setup(r, { expose: m }) {
    const d = r, c = f(""), n = f(!1), i = f(!1), l = f("");
    let s, v = 0, u = !1;
    async function g() {
      if (!d.visible || i.value || n.value) return;
      const a = ++v;
      try {
        if (typeof chrome > "u" || !chrome.storage?.local) throw new Error();
        const e = await chrome.storage.local.get(p);
        if (u || !d.visible || a !== v) return;
        s = e[p], c.value = typeof s == "string" ? s : "", n.value = !0, l.value = "";
      } catch {
        !u && a === v && (l.value = "配置读取失败，保存已禁用。");
      }
    }
    async function y() {
      if (!d.visible || !n.value || i.value || S.pendingWrites) return !0;
      const a = c.value.trim();
      if (a && !/^\d+-[\w-]+\.apps\.googleusercontent\.com$/i.test(a))
        return l.value = "请输入有效的 Google OAuth Client ID（以 .apps.googleusercontent.com 结尾），或留空使用纯本地模式。", !1;
      if (a === s)
        return l.value = "", !0;
      i.value = !0;
      try {
        return await K(async () => {
          if (!navigator.locks) throw new Error();
          await navigator.locks.request("lw-google-calendar-config", { signal: AbortSignal.timeout(1e4) }, async () => {
            if ((await chrome.storage.local.get(p))[p] !== s) throw new Error();
            a ? await chrome.storage.local.set({ [p]: a }) : await chrome.storage.local.remove(p);
          });
        }), u || (s = a, c.value = a, l.value = a ? "Google 日历 Client ID 已保存" : "已清除 Google 日历绑定（采用纯本地模式）"), !0;
      } catch {
        return u || (l.value = "保存未确认或配置已被修改；草稿保留。"), !1;
      } finally {
        i.value = !1;
      }
    }
    return m({ save: y, load: g }), I(() => d.visible, (a) => {
      a ? g() : ++v;
    }, { immediate: !0 }), E(() => {
      u = !0, ++v, c.value = "", s = void 0;
    }), (a, e) => (b(), h("section", P, [
      e[1] || (e[1] = o("div", { class: "field-label-row" }, [
        o("label", { for: "google-calendar-client-id" }, [
          D(" Google 日历 OAuth Client ID "),
          o("small", { style: { "font-weight": "normal", color: "var(--muted)", "margin-left": "4px" } }, "(可选 · 高级云端同步)")
        ]),
        o("a", {
          href: "https://console.cloud.google.com/apis/credentials",
          target: "_blank",
          rel: "noreferrer",
          class: "api-link"
        }, "🔗 获取 Client ID")
      ], -1)),
      A(o("input", {
        id: "google-calendar-client-id",
        "onUpdate:modelValue": e[0] || (e[0] = (t) => c.value = t),
        disabled: !n.value || i.value,
        autocomplete: "off",
        spellcheck: "false",
        placeholder: "选填；留空不连接 Google 日历"
      }, null, 8, W), [
        [x, c.value]
      ]),
      e[2] || (e[2] = o("p", null, "选填：连接后可读取和管理 Google 日程；留空不启用 Google 日历，不影响 Todoist 的独立账号配置。", -1)),
      l.value ? (b(), h("p", j, T(l.value), 1)) : C("", !0)
    ]));
  }
}), R = /* @__PURE__ */ G(q, [["__scopeId", "data-v-266475d9"]]);
async function Y() {
  if (typeof chrome < "u" && chrome.storage?.local) {
    const r = await chrome.storage.local.get(w);
    return typeof r[w] == "string" ? r[w] : "";
  }
  return localStorage.getItem(w) || "";
}
async function z(r) {
  const m = r.trim();
  if (!m) throw new Error("请输入 Token；此入口不执行解除账号绑定。");
  await U.saveAccountToken(m);
}
const F = { class: "todoist-account-settings" }, H = ["disabled"], J = {
  key: 0,
  role: "status",
  class: "status-msg"
}, L = { style: { "justify-content": "flex-end" } }, Q = ["disabled"], X = /* @__PURE__ */ _({
  __name: "TodoistAccountSettings",
  props: {
    anchor: {},
    visible: { type: Boolean }
  },
  emits: ["close", "accountSaved"],
  setup(r, { emit: m }) {
    const d = r, c = m, n = f(""), i = f(!1), l = f(!1), s = f(""), v = f(null);
    let u = "", g = 0;
    async function y() {
      if (i.value || !d.visible) return;
      const e = ++g;
      try {
        const t = await Y();
        if (e !== g || !d.visible) return;
        u = t, n.value = t, i.value = !0;
      } catch {
        e === g && (s.value = "读取失败，保存禁用，请重新读取。");
      }
    }
    I(() => d.visible, (e) => {
      e ? y() : g++;
    }, { immediate: !0 }), O(() => {
      g++, n.value = "", u = "";
    });
    async function a() {
      if (!(!i.value || l.value || !d.visible)) {
        if (S.pendingWrites) {
          s.value = "任务或配置正在写入，请稍后再保存。";
          return;
        }
        l.value = !0, s.value = "";
        try {
          let e = !1;
          if (n.value !== u && (await z(n.value), u = n.value.trim(), n.value = u, e = !0, c("accountSaved")), v.value?.save) {
            if (!await v.value.save()) throw new Error("Google 日历 Client ID 格式无效，可留空不填");
            e = !0;
          }
          s.value = e ? "✅ 配置已成功保存！" : "配置未变动。";
        } catch (e) {
          s.value = `❌ 保存失败：${e?.message || "请检查输入后重试"}`;
        } finally {
          l.value = !1;
        }
      }
    }
    return (e, t) => (b(), $(N(M), {
      anchor: r.anchor,
      visible: r.visible,
      label: "Todoist 设置",
      onClose: t[2] || (t[2] = (k) => c("close"))
    }, {
      default: B(() => [
        o("div", F, [
          o("header", null, [
            t[3] || (t[3] = o("strong", null, "Todoist 与日程配置", -1)),
            o("button", {
              type: "button",
              "aria-label": "关闭设置",
              onClick: t[0] || (t[0] = (k) => c("close"))
            }, "✕")
          ]),
          t[4] || (t[4] = o("p", null, "配置保存在本地浏览器；连接服务时，必要的账号信息会发送给对应服务。", -1)),
          t[5] || (t[5] = o("div", { class: "field-label-row" }, [
            o("label", { for: "todoist-account-token" }, "Todoist API Token"),
            o("a", {
              href: "https://app.todoist.com/app/settings/integrations/developer",
              target: "_blank",
              rel: "noreferrer",
              class: "api-link"
            }, "🔗 获取 Todoist Token")
          ], -1)),
          A(o("input", {
            id: "todoist-account-token",
            "onUpdate:modelValue": t[1] || (t[1] = (k) => n.value = k),
            type: "password",
            autocomplete: "off",
            disabled: !i.value || l.value,
            placeholder: "请输入你的 Todoist API Token"
          }, null, 8, H), [
            [x, n.value]
          ]),
          V(R, {
            ref_key: "googleCalendarRef",
            ref: v,
            visible: r.visible
          }, null, 8, ["visible"]),
          s.value ? (b(), h("p", J, T(s.value), 1)) : C("", !0),
          i.value ? C("", !0) : (b(), h("button", {
            key: 1,
            type: "button",
            onClick: y
          }, "重新读取")),
          o("footer", L, [
            o("button", {
              type: "button",
              class: "btn-primary-save",
              disabled: !i.value || l.value,
              onClick: a
            }, T(l.value ? "保存中…" : "💾 保存全部配置"), 9, Q)
          ])
        ])
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), ne = /* @__PURE__ */ G(X, [["__scopeId", "data-v-d62d75a6"]]);
export {
  ne as default
};
