import { d as j, w as M, K as z, o as w, j as K, H as $, i as a, e as H, t as p, f as I, l as B, n as q, q as Y, A as Q, b as G, s as O, r as X } from "./vendor-vue-9b0eS4bW.js";
import { M as Z } from "./ModuleSettingsPanel-C3mEmssd.js";
import { a3 as C, a4 as J, r as ee, H as te, G as P, t as F } from "./search.service-wriY3nvN.js";
import { _ as se } from "./_plugin-vue_export-helper-BxikU0LD.js";
const E = "ghArchifyWebhookUrl";
class A extends Error {
}
function ie(t) {
  if (t == null || t === "") return "";
  if (typeof t != "string") throw new A("流水线地址格式无效，请在 GitHub 设置中重新填写。");
  const i = t.trim();
  if (!i) return "";
  let e;
  try {
    e = new URL(i);
  } catch {
    throw new A("请填写完整的 HTTP(S) Webhook 地址。");
  }
  if (!["http:", "https:"].includes(e.protocol) || e.username || e.password || e.search || e.hash)
    throw new A("Webhook 只支持 HTTP(S)，不能包含账号密码、查询参数或片段。");
  if (e.pathname === "/") throw new A("请填写完整的 Webhook 路径，而不是 n8n 控制台根地址。");
  return e.href;
}
function ae(t) {
  let i = t;
  if (typeof i == "string")
    try {
      i = JSON.parse(i);
    } catch {
      i = {};
    }
  const e = i && typeof i == "object" ? i : {}, l = { ...J };
  for (const h of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    typeof e[h] == "string" && (l[h] = e[h]);
  return typeof e.useCustomPrompt == "boolean" && (l.useCustomPrompt = e.useCustomPrompt), l;
}
async function V() {
  let t;
  return typeof chrome < "u" && chrome.storage?.local ? t = await chrome.storage.local.get(["ghUser", "ghToken", C, E]) : t = { ghUser: localStorage.getItem("ghUser"), ghToken: localStorage.getItem("ghToken"), [C]: localStorage.getItem(C), [E]: localStorage.getItem(E) }, { ghUser: typeof t.ghUser == "string" ? t.ghUser : "", ghToken: typeof t.ghToken == "string" ? t.ghToken : "", ai: ae(t[C]), archifyWebhookUrl: typeof t[E] == "string" ? t[E] : "" };
}
async function oe(t, i) {
  const e = await V(), l = {};
  if (t.archifyWebhookUrl !== i.archifyWebhookUrl) {
    if (e.archifyWebhookUrl !== i.archifyWebhookUrl) throw new Error("Webhook setting changed in another page");
    e.archifyWebhookUrl = ie(t.archifyWebhookUrl), l[E] = e.archifyWebhookUrl;
  }
  for (const n of ["ghUser", "ghToken"])
    t[n] !== i[n] && (e[n] = t[n].trim(), l[n] = e[n]);
  let h = !1;
  for (const n of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    t.ai[n] !== i.ai[n] && (e.ai[n] = t.ai[n], h = !0);
  if (t.ai.useCustomPrompt !== i.ai.useCustomPrompt && (e.ai.useCustomPrompt = t.ai.useCustomPrompt, h = !0), h && (l[C] = e.ai), typeof chrome < "u" && chrome.storage?.local)
    Object.keys(l).length && await chrome.storage.local.set(l);
  else
    for (const [n, r] of Object.entries(l)) localStorage.setItem(n, typeof r == "string" ? r : JSON.stringify(r));
  return { accountChanged: "ghUser" in l || "ghToken" in l, settings: e };
}
const ne = {
  phase: "uninitialized",
  message: "",
  testResult: null
};
class re {
  constructor() {
    this._state = { ...ne }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.githubSettings = this);
  }
  get state() {
    return this._state;
  }
  get phase() {
    return this._state.phase;
  }
  get isReady() {
    return this._state.phase !== "uninitialized" && this._state.phase !== "failed_load";
  }
  get isTesting() {
    return this._state.phase === "testing";
  }
  get isSaving() {
    return this._state.phase === "saving";
  }
  get isBusy() {
    return this._state.phase === "testing" || this._state.phase === "saving";
  }
  get message() {
    return this._state.message;
  }
  get testResult() {
    return this._state.testResult;
  }
  subscribe(i) {
    return this._listeners.add(i), () => {
      this._listeners.delete(i);
    };
  }
  _setState(i) {
    this._state = i;
    for (const e of this._listeners)
      e(i);
  }
  send(i) {
    const e = this._state;
    switch (i.type) {
      case "LOAD_SUCCESS":
        return this._setState({
          phase: "idle",
          message: "",
          testResult: null
        }), !0;
      case "LOAD_FAILURE":
        return this._setState({
          phase: "failed_load",
          message: i.message,
          testResult: null
        }), !0;
      case "START_TEST":
        return !this.isReady || this.isBusy ? !1 : (this._setState({
          ...e,
          phase: "testing",
          testResult: null
        }), !0);
      case "TEST_SUCCESS":
        return this._setState({
          ...e,
          phase: "idle",
          testResult: i.result
        }), !0;
      case "TEST_FAILURE":
        return this._setState({
          ...e,
          phase: "idle",
          testResult: { success: !1, message: i.message }
        }), !0;
      case "START_SAVE":
        return !this.isReady || this.isBusy ? !1 : (this._setState({
          ...e,
          phase: "saving"
        }), !0);
      case "SAVE_COMPLETE":
        return this._setState({
          ...e,
          phase: "idle",
          message: i.message
        }), !0;
      case "SAVE_FAILURE":
        return this._setState({
          ...e,
          phase: "idle",
          message: i.message
        }), !0;
      case "RESET_MESSAGE":
        return this._setState({
          ...e,
          message: ""
        }), !0;
      default:
        return !1;
    }
  }
}
const le = { class: "gh-popover-head" }, ue = ["disabled"], ce = {
  key: 1,
  class: "gh-settings-message",
  role: "status"
}, ge = ["disabled"], he = { class: "gh-popover-body" }, de = { class: "gh-field-list" }, fe = { class: "gh-field-item" }, pe = { class: "gh-field-item" }, me = { class: "gh-input-action-wrap" }, be = ["type"], ve = ["title"], _e = { class: "gh-test-block" }, ye = ["disabled"], Se = {
  key: 0,
  class: "rate"
}, Te = { class: "gh-popover-foot" }, ke = ["disabled"], Ee = /* @__PURE__ */ j({
  __name: "GitHubSettingsModal",
  props: {
    anchor: {},
    visible: { type: Boolean, default: !0 },
    aiRequest: { default: 0 }
  },
  emits: ["close", "account-reload"],
  setup(t, { emit: i }) {
    const e = t, l = i, h = G("account");
    M(() => e.aiRequest, (c) => {
      c && e.visible && (h.value = "ai");
    }, { immediate: !0 });
    const n = G(!1), r = new re(), v = O(() => r.isTesting), _ = O(() => r.isSaving), y = O(() => r.isReady), d = G(""), m = O(() => r.testResult), u = X({ ghUser: "", ghToken: "", ai: { ...J }, archifyWebhookUrl: "" });
    let S, f = !1, b, R, T = 0;
    const k = G(!1);
    async function L() {
      if (f || !e.visible || y.value || k.value || _.value) return;
      const c = ++T;
      k.value = !0;
      try {
        const s = await V();
        if (f || !e.visible || c !== T) return;
        Object.assign(u, s), S = JSON.parse(JSON.stringify(s)), r.send({ type: "LOAD_SUCCESS" }), d.value = "";
      } catch {
        !f && e.visible && c === T && (r.send({ type: "LOAD_FAILURE", message: "读取设置失败，已禁止保存；请重试读取。" }), d.value = r.message);
      } finally {
        c === T && (k.value = !1);
      }
    }
    function N() {
      clearTimeout(R), R = void 0, b?.abort(), b = void 0, r.isTesting && r.send({ type: "TEST_FAILURE", message: "已取消验证。" });
    }
    M(() => e.visible, (c) => {
      c ? L() : (++T, k.value = !1, N(), n.value = !1);
    }, { immediate: !0, flush: "sync" }), z(() => {
      f = !0, ++T, N();
    });
    async function x() {
      if (f || !e.visible || !y.value || v.value || _.value) return;
      const c = u.ghUser.trim(), s = u.ghToken.trim();
      if (!c && !s) {
        d.value = "请填写用户名或 Token。";
        return;
      }
      if (!r.send({ type: "START_TEST" })) return;
      const o = new AbortController();
      b = o;
      const U = window.setTimeout(() => o.abort(), 1e4);
      R = U;
      try {
        const { data: g, rateLimit: W } = await ee(s ? "/user" : `/users/${encodeURIComponent(c)}`, {
          headers: te(s),
          signal: o.signal,
          timeoutMs: 1e4,
          maxBytes: 131072
        });
        if (!g || typeof g.login != "string" || !g.login || g.login.length > 100 || typeof g.id != "number") throw new P("format", "GitHub 身份响应格式无效。");
        if (f || !e.visible || b !== o) return;
        o.signal.throwIfAborted(), r.send({
          type: "TEST_SUCCESS",
          result: {
            success: !0,
            message: `连接成功：@${g.login}`,
            rateLimit: { remaining: W.remaining ?? 0, limit: W.limit ?? 0 }
          }
        }), !c && !u.ghUser.trim() && u.ghToken.trim() === s && g.login && (u.ghUser = g.login);
      } catch (g) {
        !f && e.visible && b === o && r.send({
          type: "TEST_FAILURE",
          message: g instanceof P ? g.message : "连接已取消或超时，请重试。"
        });
      } finally {
        clearTimeout(U), b === o && (b = void 0, R = void 0);
      }
    }
    async function D() {
      if (f || !e.visible || !y.value || !S || _.value || v.value) return;
      if ((u.ghUser !== S.ghUser || u.ghToken !== S.ghToken) && !u.ghUser.trim() && !u.ghToken.trim()) {
        d.value = "请至少填写用户名或 Token；本面板不执行账号解除绑定。";
        return;
      }
      if (!r.send({ type: "START_SAVE" })) return;
      let s = !1;
      try {
        const o = await oe(JSON.parse(JSON.stringify(u)), JSON.parse(JSON.stringify(S)));
        if (s = !0, f) return;
        S = JSON.parse(JSON.stringify(o.settings)), Object.assign(u, o.settings), F.aiConfig = { ...o.settings.ai }, r.send({ type: "SAVE_COMPLETE", message: "设置已保存。" }), d.value = r.message, o.accountChanged && (l("account-reload"), await F.loadGitHub(o.settings.ghUser, o.settings.ghToken), d.value = "设置已保存；仓库读取可能暂停或等待 Star 操作，请查看主页面状态，必要时点击刷新。");
      } catch (o) {
        const U = o instanceof A ? o.message : s ? "设置已保存，但同步失败，请重试。" : "保存失败或其他页面已修改配置，请重新打开面板核对；原配置未确认更新。";
        r.send({ type: "SAVE_FAILURE", message: U }), d.value = U;
      }
    }
    return (c, s) => (w(), K(Z, {
      anchor: t.anchor,
      visible: t.visible,
      label: "GitHub 模组偏好设置",
      onClose: s[5] || (s[5] = (o) => l("close"))
    }, {
      default: $(() => [
        a("header", le, [
          s[6] || (s[6] = a("div", { class: "gh-popover-title-wrap" }, [
            a("span", { class: "gh-popover-badge" }, "⚙️ GitHub 设置")
          ], -1)),
          a("button", {
            type: "button",
            class: "gh-popover-close-btn",
            title: "关闭",
            onClick: s[0] || (s[0] = (o) => l("close"))
          }, "✕")
        ]),
        s[10] || (s[10] = a("p", { class: "gh-settings-message" }, "隐藏面板或离开卡片会保留草稿；关闭整个标签页仍会丢失。", -1)),
        y.value ? I("", !0) : (w(), H("button", {
          key: 0,
          type: "button",
          disabled: k.value || !t.visible,
          onClick: L
        }, p(k.value ? "正在读取…" : "重试读取"), 9, ue)),
        d.value ? (w(), H("p", ce, p(d.value), 1)) : I("", !0),
        a("fieldset", {
          class: "gh-settings-fields",
          disabled: !y.value || _.value || v.value
        }, [
          a("main", he, [
            a("section", de, [
              a("div", fe, [
                s[7] || (s[7] = a("label", { class: "gh-field-label" }, [
                  a("span", null, "用户名"),
                  a("small", { class: "optional" }, "Token 可单独使用")
                ], -1)),
                B(a("input", {
                  "onUpdate:modelValue": s[1] || (s[1] = (o) => u.ghUser = o),
                  type: "text",
                  class: "gh-input",
                  placeholder: "例如：octocat",
                  autocomplete: "off"
                }, null, 512), [
                  [q, u.ghUser]
                ])
              ]),
              a("div", pe, [
                s[8] || (s[8] = a("label", { class: "gh-field-label" }, [
                  a("span", null, "个人访问令牌 (Token)"),
                  a("small", { class: "optional" }, "5000次/h")
                ], -1)),
                a("div", me, [
                  B(a("input", {
                    "onUpdate:modelValue": s[2] || (s[2] = (o) => u.ghToken = o),
                    type: n.value ? "text" : "password",
                    class: "gh-input",
                    placeholder: "ghp_... / github_pat_...",
                    autocomplete: "off"
                  }, null, 8, be), [
                    [Y, u.ghToken]
                  ]),
                  a("button", {
                    type: "button",
                    class: "gh-toggle-pwd",
                    title: n.value ? "隐藏" : "显示",
                    onClick: s[3] || (s[3] = (o) => n.value = !n.value)
                  }, p(n.value ? "👁️" : "🔒"), 9, ve)
                ]),
                s[9] || (s[9] = a("div", { class: "gh-hint-row" }, [
                  a("a", {
                    href: "https://github.com/settings/tokens",
                    target: "_blank",
                    rel: "noopener",
                    class: "gh-link"
                  }, " 管理 GitHub Token ↗ "),
                  a("span", { style: { "font-size": "11px", color: "var(--muted)", "margin-left": "8px" } }, "（用于读取收藏、提高请求额度；本地分类不需要 Lists 写权限）")
                ], -1))
              ]),
              a("div", _e, [
                a("button", {
                  type: "button",
                  class: "gh-test-btn",
                  disabled: v.value,
                  onClick: x
                }, [
                  a("span", null, p(v.value ? "验证中…" : "⚡ 测试连接"), 1)
                ], 8, ye),
                m.value ? (w(), H("div", {
                  key: 0,
                  class: Q(["gh-test-pill", { success: m.value.success, error: !m.value.success }])
                }, [
                  a("span", null, p(m.value.message), 1),
                  m.value.rateLimit ? (w(), H("span", Se, "(" + p(m.value.rateLimit.remaining) + "/" + p(m.value.rateLimit.limit) + ")", 1)) : I("", !0)
                ], 2)) : I("", !0)
              ])
            ])
          ])
        ], 8, ge),
        a("footer", Te, [
          a("button", {
            type: "button",
            class: "gh-btn-cancel",
            onClick: s[4] || (s[4] = (o) => l("close"))
          }, "取消"),
          a("button", {
            type: "button",
            class: "gh-btn-save",
            disabled: !y.value || _.value || v.value,
            onClick: D
          }, p(_.value ? "保存中…" : "保存生效"), 9, ke)
        ])
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), Re = /* @__PURE__ */ se(Ee, [["__scopeId", "data-v-350a47ba"]]);
export {
  Re as default
};
