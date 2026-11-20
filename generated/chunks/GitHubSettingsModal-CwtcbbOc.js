import { d as z, w as B, H as $, f as C, l as K, B as q, h as i, g as I, t as f, j as G, p as P, v as Y, S as Q, s as X, b as O, x as L, r as Z } from "./vendor-vue-BbmU9NUg.js";
import { u as ee } from "./useMachine-DhSfBarp.js";
import { M as te } from "./ModuleSettingsPanel-vvDFMs_E.js";
import { U as A, V as J, D as se, y as ie, G as V, m as F } from "./github.service-mYu1TuZI.js";
import { _ as ae } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const U = "ghArchifyWebhookUrl";
class R extends Error {
}
function oe(s) {
  if (s == null || s === "") return "";
  if (typeof s != "string") throw new R("流水线地址格式无效，请在 GitHub 设置中重新填写。");
  const a = s.trim();
  if (!a) return "";
  let e;
  try {
    e = new URL(a);
  } catch {
    throw new R("请填写完整的 HTTP(S) Webhook 地址。");
  }
  if (!["http:", "https:"].includes(e.protocol) || e.username || e.password || e.search || e.hash)
    throw new R("Webhook 只支持 HTTP(S)，不能包含账号密码、查询参数或片段。");
  if (e.pathname === "/") throw new R("请填写完整的 Webhook 路径，而不是 n8n 控制台根地址。");
  return e.href;
}
function ne(s) {
  let a = s;
  if (typeof a == "string")
    try {
      a = JSON.parse(a);
    } catch {
      a = {};
    }
  const e = a && typeof a == "object" ? a : {}, r = { ...J };
  for (const c of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    typeof e[c] == "string" && (r[c] = e[c]);
  return typeof e.useCustomPrompt == "boolean" && (r.useCustomPrompt = e.useCustomPrompt), r;
}
async function x() {
  let s;
  return typeof chrome < "u" && chrome.storage?.local ? s = await chrome.storage.local.get(["ghUser", "ghToken", A, U]) : s = { ghUser: localStorage.getItem("ghUser"), ghToken: localStorage.getItem("ghToken"), [A]: localStorage.getItem(A), [U]: localStorage.getItem(U) }, { ghUser: typeof s.ghUser == "string" ? s.ghUser : "", ghToken: typeof s.ghToken == "string" ? s.ghToken : "", ai: ne(s[A]), archifyWebhookUrl: typeof s[U] == "string" ? s[U] : "" };
}
async function re(s, a) {
  const e = await x(), r = {};
  if (s.archifyWebhookUrl !== a.archifyWebhookUrl) {
    if (e.archifyWebhookUrl !== a.archifyWebhookUrl) throw new Error("Webhook setting changed in another page");
    e.archifyWebhookUrl = oe(s.archifyWebhookUrl), r[U] = e.archifyWebhookUrl;
  }
  for (const n of ["ghUser", "ghToken"])
    s[n] !== a[n] && (e[n] = s[n].trim(), r[n] = e[n]);
  let c = !1;
  for (const n of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    s.ai[n] !== a.ai[n] && (e.ai[n] = s.ai[n], c = !0);
  if (s.ai.useCustomPrompt !== a.ai.useCustomPrompt && (e.ai.useCustomPrompt = s.ai.useCustomPrompt, c = !0), c && (r[A] = e.ai), typeof chrome < "u" && chrome.storage?.local)
    Object.keys(r).length && await chrome.storage.local.set(r);
  else
    for (const [n, l] of Object.entries(r)) localStorage.setItem(n, typeof l == "string" ? l : JSON.stringify(l));
  return { accountChanged: "ghUser" in r || "ghToken" in r, settings: e };
}
const le = {
  phase: "uninitialized",
  message: "",
  testResult: null
};
class ue {
  constructor() {
    this._state = { ...le }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.githubSettings = this);
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
  subscribe(a) {
    return this._listeners.add(a), () => {
      this._listeners.delete(a);
    };
  }
  _setState(a) {
    this._state = a;
    for (const e of this._listeners)
      e(a);
  }
  send(a) {
    const e = this._state;
    switch (a.type) {
      case "LOAD_SUCCESS":
        return this._setState({
          phase: "idle",
          message: "",
          testResult: null
        }), !0;
      case "LOAD_FAILURE":
        return this._setState({
          phase: "failed_load",
          message: a.message,
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
          testResult: a.result
        }), !0;
      case "TEST_FAILURE":
        return this._setState({
          ...e,
          phase: "idle",
          testResult: { success: !1, message: a.message }
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
          message: a.message
        }), !0;
      case "SAVE_FAILURE":
        return this._setState({
          ...e,
          phase: "idle",
          message: a.message
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
const ge = { class: "gh-popover-head" }, he = ["disabled"], ce = {
  key: 1,
  class: "gh-settings-message",
  role: "status"
}, de = ["disabled"], pe = { class: "gh-popover-body" }, fe = { class: "gh-field-list" }, me = { class: "gh-field-item" }, ve = { class: "gh-field-item" }, be = { class: "gh-input-action-wrap" }, _e = ["type"], ye = ["aria-label", "aria-pressed"], Se = { class: "gh-test-block" }, Te = ["disabled"], ke = {
  key: 0,
  class: "rate"
}, Ue = { class: "gh-popover-foot" }, Ee = ["disabled"], we = /* @__PURE__ */ z({
  __name: "GitHubSettingsModal",
  props: {
    anchor: {},
    visible: { type: Boolean, default: !0 },
    aiRequest: { default: 0 }
  },
  emits: ["close", "account-reload"],
  setup(s, { emit: a }) {
    const e = s, r = a, c = O("account");
    B(() => e.aiRequest, (g) => {
      g && e.visible && (c.value = "ai");
    }, { immediate: !0 });
    const n = O(!1), l = new ue(), E = ee(l), b = L(() => E.value.phase === "testing"), _ = L(() => E.value.phase === "saving"), y = L(() => E.value.phase !== "uninitialized" && E.value.phase !== "failed_load"), d = O(""), m = L(() => E.value.testResult), u = Z({ ghUser: "", ghToken: "", ai: { ...J }, archifyWebhookUrl: "" });
    let S, p = !1, v, H, T = 0;
    const k = O(!1);
    async function N() {
      if (p || !e.visible || y.value || k.value || _.value) return;
      const g = ++T;
      k.value = !0;
      try {
        const t = await x();
        if (p || !e.visible || g !== T) return;
        Object.assign(u, t), S = JSON.parse(JSON.stringify(t)), l.send({ type: "LOAD_SUCCESS" }), d.value = "";
      } catch {
        !p && e.visible && g === T && (l.send({ type: "LOAD_FAILURE", message: "读取设置失败，已禁止保存；请重试读取。" }), d.value = l.message);
      } finally {
        g === T && (k.value = !1);
      }
    }
    function W() {
      clearTimeout(H), H = void 0, v?.abort(), v = void 0, l.isTesting && l.send({ type: "TEST_FAILURE", message: "已取消验证。" });
    }
    B(() => e.visible, (g) => {
      g ? N() : (++T, k.value = !1, W(), n.value = !1);
    }, { immediate: !0, flush: "sync" }), $(() => {
      p = !0, ++T, W();
    });
    async function D() {
      if (p || !e.visible || !y.value || b.value || _.value) return;
      const g = u.ghUser.trim(), t = u.ghToken.trim();
      if (!g && !t) {
        d.value = "请填写用户名或 Token。";
        return;
      }
      if (!l.send({ type: "START_TEST" })) return;
      const o = new AbortController();
      v = o;
      const w = window.setTimeout(() => o.abort(), 1e4);
      H = w;
      try {
        const { data: h, rateLimit: M } = await se(t ? "/user" : `/users/${encodeURIComponent(g)}`, {
          headers: ie(t),
          signal: o.signal,
          timeoutMs: 1e4,
          maxBytes: 131072
        });
        if (!h || typeof h.login != "string" || !h.login || h.login.length > 100 || typeof h.id != "number") throw new V("format", "GitHub 身份响应格式无效。");
        if (p || !e.visible || v !== o) return;
        o.signal.throwIfAborted(), l.send({
          type: "TEST_SUCCESS",
          result: {
            success: !0,
            message: `连接成功：@${h.login}`,
            rateLimit: { remaining: M.remaining ?? 0, limit: M.limit ?? 0 }
          }
        }), !g && !u.ghUser.trim() && u.ghToken.trim() === t && h.login && (u.ghUser = h.login);
      } catch (h) {
        !p && e.visible && v === o && l.send({
          type: "TEST_FAILURE",
          message: h instanceof V ? h.message : "连接已取消或超时，请重试。"
        });
      } finally {
        clearTimeout(w), v === o && (v = void 0, H = void 0);
      }
    }
    async function j() {
      if (p || !e.visible || !y.value || !S || _.value || b.value) return;
      if ((u.ghUser !== S.ghUser || u.ghToken !== S.ghToken) && !u.ghUser.trim() && !u.ghToken.trim()) {
        d.value = "请至少填写用户名或 Token；本面板不执行账号解除绑定。";
        return;
      }
      if (!l.send({ type: "START_SAVE" })) return;
      let t = !1;
      try {
        const o = await re(JSON.parse(JSON.stringify(u)), JSON.parse(JSON.stringify(S)));
        if (t = !0, p) return;
        S = JSON.parse(JSON.stringify(o.settings)), Object.assign(u, o.settings), F.aiConfig = { ...o.settings.ai }, l.send({ type: "SAVE_COMPLETE", message: "设置已保存。" }), d.value = l.message, o.accountChanged && (r("account-reload"), await F.loadGitHub(o.settings.ghUser, o.settings.ghToken), d.value = "设置已保存；仓库读取可能暂停或等待 Star 操作，请查看主页面状态，必要时点击刷新。");
      } catch (o) {
        const w = o instanceof R ? o.message : t ? "设置已保存，但同步失败，请重试。" : "保存失败或其他页面已修改配置，请重新打开面板核对；原配置未确认更新。";
        l.send({ type: "SAVE_FAILURE", message: w }), d.value = w;
      }
    }
    return (g, t) => (C(), K(te, {
      anchor: s.anchor,
      visible: s.visible,
      label: "GitHub 模组偏好设置",
      onClose: t[5] || (t[5] = (o) => r("close"))
    }, {
      default: q(() => [
        i("header", ge, [
          t[6] || (t[6] = i("div", { class: "gh-popover-title-wrap" }, [
            i("span", {
              class: "gh-popover-icon",
              "aria-hidden": "true"
            }, "GH"),
            i("div", null, [
              i("h2", { class: "gh-popover-badge" }, "GitHub 设置"),
              i("p", { class: "gh-popover-subtitle" }, "管理账号与访问凭据")
            ])
          ], -1)),
          i("button", {
            type: "button",
            class: "gh-popover-close-btn",
            title: "关闭",
            onClick: t[0] || (t[0] = (o) => r("close"))
          }, "✕")
        ]),
        t[11] || (t[11] = i("p", { class: "gh-draft-hint" }, "更改会保留在草稿中，关闭标签页前请保存。", -1)),
        y.value ? G("", !0) : (C(), I("button", {
          key: 0,
          type: "button",
          disabled: k.value || !s.visible,
          onClick: N
        }, f(k.value ? "正在读取…" : "重试读取"), 9, he)),
        d.value ? (C(), I("p", ce, f(d.value), 1)) : G("", !0),
        i("fieldset", {
          class: "gh-settings-fields",
          disabled: !y.value || _.value || b.value
        }, [
          i("main", pe, [
            i("section", fe, [
              i("div", me, [
                t[7] || (t[7] = i("label", {
                  class: "gh-field-label",
                  for: "gh-settings-user"
                }, [
                  i("span", null, "用户名"),
                  i("small", { class: "optional" }, "Token 可单独使用")
                ], -1)),
                P(i("input", {
                  id: "gh-settings-user",
                  "onUpdate:modelValue": t[1] || (t[1] = (o) => u.ghUser = o),
                  type: "text",
                  class: "gh-input",
                  placeholder: "例如：octocat",
                  autocomplete: "off"
                }, null, 512), [
                  [Y, u.ghUser]
                ])
              ]),
              i("div", ve, [
                t[8] || (t[8] = i("label", {
                  class: "gh-field-label",
                  for: "gh-settings-token"
                }, [
                  i("span", null, "个人访问令牌"),
                  i("small", { class: "optional" }, "Token")
                ], -1)),
                i("div", be, [
                  P(i("input", {
                    id: "gh-settings-token",
                    "onUpdate:modelValue": t[2] || (t[2] = (o) => u.ghToken = o),
                    type: n.value ? "text" : "password",
                    class: "gh-input",
                    placeholder: "ghp_... / github_pat_...",
                    autocomplete: "off"
                  }, null, 8, _e), [
                    [Q, u.ghToken]
                  ]),
                  i("button", {
                    type: "button",
                    class: "gh-toggle-pwd",
                    "aria-label": n.value ? "隐藏令牌" : "显示令牌",
                    "aria-pressed": n.value,
                    onClick: t[3] || (t[3] = (o) => n.value = !n.value)
                  }, f(n.value ? "隐藏" : "显示"), 9, ye)
                ]),
                t[9] || (t[9] = i("p", { class: "gh-token-hint" }, "用于读取收藏和提高请求额度，本地分类无需 Lists 写权限。", -1)),
                t[10] || (t[10] = i("a", {
                  href: "https://github.com/settings/tokens",
                  target: "_blank",
                  rel: "noopener",
                  class: "gh-link"
                }, "管理 GitHub Token ↗", -1))
              ]),
              i("div", Se, [
                i("button", {
                  type: "button",
                  class: "gh-test-btn",
                  disabled: b.value,
                  onClick: D
                }, [
                  i("span", null, f(b.value ? "验证中…" : "测试连接"), 1)
                ], 8, Te),
                m.value ? (C(), I("div", {
                  key: 0,
                  class: X(["gh-test-pill", { success: m.value.success, error: !m.value.success }])
                }, [
                  i("span", null, f(m.value.message), 1),
                  m.value.rateLimit ? (C(), I("span", ke, "(" + f(m.value.rateLimit.remaining) + "/" + f(m.value.rateLimit.limit) + ")", 1)) : G("", !0)
                ], 2)) : G("", !0)
              ])
            ])
          ])
        ], 8, de),
        i("footer", Ue, [
          i("button", {
            type: "button",
            class: "gh-btn-cancel",
            onClick: t[4] || (t[4] = (o) => r("close"))
          }, "取消"),
          i("button", {
            type: "button",
            class: "gh-btn-save",
            disabled: !y.value || _.value || b.value,
            onClick: j
          }, f(_.value ? "保存中…" : "保存生效"), 9, Ee)
        ])
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), Ge = /* @__PURE__ */ ae(we, [["__scopeId", "data-v-3d89586f"]]);
export {
  Ge as default
};
