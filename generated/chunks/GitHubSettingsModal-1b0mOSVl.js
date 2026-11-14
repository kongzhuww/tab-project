import { d as j, w as B, K, o as C, j as $, H as q, i as a, e as I, t as p, f as G, l as P, n as Y, q as Q, A as X, b as O, s as L, r as Z } from "./vendor-vue-BkY5-p5y.js";
import { u as ee } from "./useMachine-DdzsCIFB.js";
import { M as te } from "./ModuleSettingsPanel-BK1QTUtr.js";
import { a3 as A, a4 as V, r as se, H as ie, G as F, t as J } from "./search.service-DF5Rt2Wp.js";
import { _ as ae } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const E = "ghArchifyWebhookUrl";
class R extends Error {
}
function oe(t) {
  if (t == null || t === "") return "";
  if (typeof t != "string") throw new R("流水线地址格式无效，请在 GitHub 设置中重新填写。");
  const i = t.trim();
  if (!i) return "";
  let e;
  try {
    e = new URL(i);
  } catch {
    throw new R("请填写完整的 HTTP(S) Webhook 地址。");
  }
  if (!["http:", "https:"].includes(e.protocol) || e.username || e.password || e.search || e.hash)
    throw new R("Webhook 只支持 HTTP(S)，不能包含账号密码、查询参数或片段。");
  if (e.pathname === "/") throw new R("请填写完整的 Webhook 路径，而不是 n8n 控制台根地址。");
  return e.href;
}
function ne(t) {
  let i = t;
  if (typeof i == "string")
    try {
      i = JSON.parse(i);
    } catch {
      i = {};
    }
  const e = i && typeof i == "object" ? i : {}, r = { ...V };
  for (const g of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    typeof e[g] == "string" && (r[g] = e[g]);
  return typeof e.useCustomPrompt == "boolean" && (r.useCustomPrompt = e.useCustomPrompt), r;
}
async function x() {
  let t;
  return typeof chrome < "u" && chrome.storage?.local ? t = await chrome.storage.local.get(["ghUser", "ghToken", A, E]) : t = { ghUser: localStorage.getItem("ghUser"), ghToken: localStorage.getItem("ghToken"), [A]: localStorage.getItem(A), [E]: localStorage.getItem(E) }, { ghUser: typeof t.ghUser == "string" ? t.ghUser : "", ghToken: typeof t.ghToken == "string" ? t.ghToken : "", ai: ne(t[A]), archifyWebhookUrl: typeof t[E] == "string" ? t[E] : "" };
}
async function re(t, i) {
  const e = await x(), r = {};
  if (t.archifyWebhookUrl !== i.archifyWebhookUrl) {
    if (e.archifyWebhookUrl !== i.archifyWebhookUrl) throw new Error("Webhook setting changed in another page");
    e.archifyWebhookUrl = oe(t.archifyWebhookUrl), r[E] = e.archifyWebhookUrl;
  }
  for (const n of ["ghUser", "ghToken"])
    t[n] !== i[n] && (e[n] = t[n].trim(), r[n] = e[n]);
  let g = !1;
  for (const n of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    t.ai[n] !== i.ai[n] && (e.ai[n] = t.ai[n], g = !0);
  if (t.ai.useCustomPrompt !== i.ai.useCustomPrompt && (e.ai.useCustomPrompt = t.ai.useCustomPrompt, g = !0), g && (r[A] = e.ai), typeof chrome < "u" && chrome.storage?.local)
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
const ce = { class: "gh-popover-head" }, he = ["disabled"], ge = {
  key: 1,
  class: "gh-settings-message",
  role: "status"
}, de = ["disabled"], fe = { class: "gh-popover-body" }, pe = { class: "gh-field-list" }, me = { class: "gh-field-item" }, ve = { class: "gh-field-item" }, be = { class: "gh-input-action-wrap" }, _e = ["type"], ye = ["title"], Se = { class: "gh-test-block" }, Te = ["disabled"], ke = {
  key: 0,
  class: "rate"
}, Ee = { class: "gh-popover-foot" }, Ue = ["disabled"], we = /* @__PURE__ */ j({
  __name: "GitHubSettingsModal",
  props: {
    anchor: {},
    visible: { type: Boolean, default: !0 },
    aiRequest: { default: 0 }
  },
  emits: ["close", "account-reload"],
  setup(t, { emit: i }) {
    const e = t, r = i, g = O("account");
    B(() => e.aiRequest, (c) => {
      c && e.visible && (g.value = "ai");
    }, { immediate: !0 });
    const n = O(!1), l = new ue(), U = ee(l), b = L(() => U.value.phase === "testing"), _ = L(() => U.value.phase === "saving"), y = L(() => U.value.phase !== "uninitialized" && U.value.phase !== "failed_load"), d = O(""), m = L(() => U.value.testResult), u = Z({ ghUser: "", ghToken: "", ai: { ...V }, archifyWebhookUrl: "" });
    let S, f = !1, v, H, T = 0;
    const k = O(!1);
    async function N() {
      if (f || !e.visible || y.value || k.value || _.value) return;
      const c = ++T;
      k.value = !0;
      try {
        const s = await x();
        if (f || !e.visible || c !== T) return;
        Object.assign(u, s), S = JSON.parse(JSON.stringify(s)), l.send({ type: "LOAD_SUCCESS" }), d.value = "";
      } catch {
        !f && e.visible && c === T && (l.send({ type: "LOAD_FAILURE", message: "读取设置失败，已禁止保存；请重试读取。" }), d.value = l.message);
      } finally {
        c === T && (k.value = !1);
      }
    }
    function W() {
      clearTimeout(H), H = void 0, v?.abort(), v = void 0, l.isTesting && l.send({ type: "TEST_FAILURE", message: "已取消验证。" });
    }
    B(() => e.visible, (c) => {
      c ? N() : (++T, k.value = !1, W(), n.value = !1);
    }, { immediate: !0, flush: "sync" }), K(() => {
      f = !0, ++T, W();
    });
    async function D() {
      if (f || !e.visible || !y.value || b.value || _.value) return;
      const c = u.ghUser.trim(), s = u.ghToken.trim();
      if (!c && !s) {
        d.value = "请填写用户名或 Token。";
        return;
      }
      if (!l.send({ type: "START_TEST" })) return;
      const o = new AbortController();
      v = o;
      const w = window.setTimeout(() => o.abort(), 1e4);
      H = w;
      try {
        const { data: h, rateLimit: M } = await se(s ? "/user" : `/users/${encodeURIComponent(c)}`, {
          headers: ie(s),
          signal: o.signal,
          timeoutMs: 1e4,
          maxBytes: 131072
        });
        if (!h || typeof h.login != "string" || !h.login || h.login.length > 100 || typeof h.id != "number") throw new F("format", "GitHub 身份响应格式无效。");
        if (f || !e.visible || v !== o) return;
        o.signal.throwIfAborted(), l.send({
          type: "TEST_SUCCESS",
          result: {
            success: !0,
            message: `连接成功：@${h.login}`,
            rateLimit: { remaining: M.remaining ?? 0, limit: M.limit ?? 0 }
          }
        }), !c && !u.ghUser.trim() && u.ghToken.trim() === s && h.login && (u.ghUser = h.login);
      } catch (h) {
        !f && e.visible && v === o && l.send({
          type: "TEST_FAILURE",
          message: h instanceof F ? h.message : "连接已取消或超时，请重试。"
        });
      } finally {
        clearTimeout(w), v === o && (v = void 0, H = void 0);
      }
    }
    async function z() {
      if (f || !e.visible || !y.value || !S || _.value || b.value) return;
      if ((u.ghUser !== S.ghUser || u.ghToken !== S.ghToken) && !u.ghUser.trim() && !u.ghToken.trim()) {
        d.value = "请至少填写用户名或 Token；本面板不执行账号解除绑定。";
        return;
      }
      if (!l.send({ type: "START_SAVE" })) return;
      let s = !1;
      try {
        const o = await re(JSON.parse(JSON.stringify(u)), JSON.parse(JSON.stringify(S)));
        if (s = !0, f) return;
        S = JSON.parse(JSON.stringify(o.settings)), Object.assign(u, o.settings), J.aiConfig = { ...o.settings.ai }, l.send({ type: "SAVE_COMPLETE", message: "设置已保存。" }), d.value = l.message, o.accountChanged && (r("account-reload"), await J.loadGitHub(o.settings.ghUser, o.settings.ghToken), d.value = "设置已保存；仓库读取可能暂停或等待 Star 操作，请查看主页面状态，必要时点击刷新。");
      } catch (o) {
        const w = o instanceof R ? o.message : s ? "设置已保存，但同步失败，请重试。" : "保存失败或其他页面已修改配置，请重新打开面板核对；原配置未确认更新。";
        l.send({ type: "SAVE_FAILURE", message: w }), d.value = w;
      }
    }
    return (c, s) => (C(), $(te, {
      anchor: t.anchor,
      visible: t.visible,
      label: "GitHub 模组偏好设置",
      onClose: s[5] || (s[5] = (o) => r("close"))
    }, {
      default: q(() => [
        a("header", ce, [
          s[6] || (s[6] = a("div", { class: "gh-popover-title-wrap" }, [
            a("span", { class: "gh-popover-badge" }, "⚙️ GitHub 设置")
          ], -1)),
          a("button", {
            type: "button",
            class: "gh-popover-close-btn",
            title: "关闭",
            onClick: s[0] || (s[0] = (o) => r("close"))
          }, "✕")
        ]),
        s[10] || (s[10] = a("p", { class: "gh-settings-message" }, "隐藏面板或离开卡片会保留草稿；关闭整个标签页仍会丢失。", -1)),
        y.value ? G("", !0) : (C(), I("button", {
          key: 0,
          type: "button",
          disabled: k.value || !t.visible,
          onClick: N
        }, p(k.value ? "正在读取…" : "重试读取"), 9, he)),
        d.value ? (C(), I("p", ge, p(d.value), 1)) : G("", !0),
        a("fieldset", {
          class: "gh-settings-fields",
          disabled: !y.value || _.value || b.value
        }, [
          a("main", fe, [
            a("section", pe, [
              a("div", me, [
                s[7] || (s[7] = a("label", { class: "gh-field-label" }, [
                  a("span", null, "用户名"),
                  a("small", { class: "optional" }, "Token 可单独使用")
                ], -1)),
                P(a("input", {
                  "onUpdate:modelValue": s[1] || (s[1] = (o) => u.ghUser = o),
                  type: "text",
                  class: "gh-input",
                  placeholder: "例如：octocat",
                  autocomplete: "off"
                }, null, 512), [
                  [Y, u.ghUser]
                ])
              ]),
              a("div", ve, [
                s[8] || (s[8] = a("label", { class: "gh-field-label" }, [
                  a("span", null, "个人访问令牌 (Token)"),
                  a("small", { class: "optional" }, "5000次/h")
                ], -1)),
                a("div", be, [
                  P(a("input", {
                    "onUpdate:modelValue": s[2] || (s[2] = (o) => u.ghToken = o),
                    type: n.value ? "text" : "password",
                    class: "gh-input",
                    placeholder: "ghp_... / github_pat_...",
                    autocomplete: "off"
                  }, null, 8, _e), [
                    [Q, u.ghToken]
                  ]),
                  a("button", {
                    type: "button",
                    class: "gh-toggle-pwd",
                    title: n.value ? "隐藏" : "显示",
                    onClick: s[3] || (s[3] = (o) => n.value = !n.value)
                  }, p(n.value ? "👁️" : "🔒"), 9, ye)
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
              a("div", Se, [
                a("button", {
                  type: "button",
                  class: "gh-test-btn",
                  disabled: b.value,
                  onClick: D
                }, [
                  a("span", null, p(b.value ? "验证中…" : "⚡ 测试连接"), 1)
                ], 8, Te),
                m.value ? (C(), I("div", {
                  key: 0,
                  class: X(["gh-test-pill", { success: m.value.success, error: !m.value.success }])
                }, [
                  a("span", null, p(m.value.message), 1),
                  m.value.rateLimit ? (C(), I("span", ke, "(" + p(m.value.rateLimit.remaining) + "/" + p(m.value.rateLimit.limit) + ")", 1)) : G("", !0)
                ], 2)) : G("", !0)
              ])
            ])
          ])
        ], 8, de),
        a("footer", Ee, [
          a("button", {
            type: "button",
            class: "gh-btn-cancel",
            onClick: s[4] || (s[4] = (o) => r("close"))
          }, "取消"),
          a("button", {
            type: "button",
            class: "gh-btn-save",
            disabled: !y.value || _.value || b.value,
            onClick: z
          }, p(_.value ? "保存中…" : "保存生效"), 9, Ue)
        ])
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), Ge = /* @__PURE__ */ ae(we, [["__scopeId", "data-v-37408392"]]);
export {
  Ge as default
};
