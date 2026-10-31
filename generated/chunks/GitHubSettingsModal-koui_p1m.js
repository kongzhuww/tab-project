import { d as j, y as x, M as K, o as _, e as V, w as q, g as o, f as O, t as v, h as W, m as J, p as z, s as D, C as F, b, r as Y } from "./vendor-vue-wIH4jcna.js";
import { M as Q } from "./ModuleSettingsPanel-B2LUyzyF.js";
import { a0 as S, a1 as R, r as X, E as Z, G as A, t as L } from "./search.service-B8FaDQLd.js";
import { _ as ee } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const C = "ghArchifyWebhookUrl";
class H extends Error {
}
function te(s) {
  if (s == null || s === "") return "";
  if (typeof s != "string") throw new H("流水线地址格式无效，请在 GitHub 设置中重新填写。");
  const n = s.trim();
  if (!n) return "";
  let e;
  try {
    e = new URL(n);
  } catch {
    throw new H("请填写完整的 HTTP(S) Webhook 地址。");
  }
  if (!["http:", "https:"].includes(e.protocol) || e.username || e.password || e.search || e.hash)
    throw new H("Webhook 只支持 HTTP(S)，不能包含账号密码、查询参数或片段。");
  if (e.pathname === "/") throw new H("请填写完整的 Webhook 路径，而不是 n8n 控制台根地址。");
  return e.href;
}
function se(s) {
  let n = s;
  if (typeof n == "string")
    try {
      n = JSON.parse(n);
    } catch {
      n = {};
    }
  const e = n && typeof n == "object" ? n : {}, l = { ...R };
  for (const f of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    typeof e[f] == "string" && (l[f] = e[f]);
  return typeof e.useCustomPrompt == "boolean" && (l.useCustomPrompt = e.useCustomPrompt), l;
}
async function B() {
  let s;
  return typeof chrome < "u" && chrome.storage?.local ? s = await chrome.storage.local.get(["ghUser", "ghToken", S, C]) : s = { ghUser: localStorage.getItem("ghUser"), ghToken: localStorage.getItem("ghToken"), [S]: localStorage.getItem(S), [C]: localStorage.getItem(C) }, { ghUser: typeof s.ghUser == "string" ? s.ghUser : "", ghToken: typeof s.ghToken == "string" ? s.ghToken : "", ai: se(s[S]), archifyWebhookUrl: typeof s[C] == "string" ? s[C] : "" };
}
async function oe(s, n) {
  const e = await B(), l = {};
  if (s.archifyWebhookUrl !== n.archifyWebhookUrl) {
    if (e.archifyWebhookUrl !== n.archifyWebhookUrl) throw new Error("Webhook setting changed in another page");
    e.archifyWebhookUrl = te(s.archifyWebhookUrl), l[C] = e.archifyWebhookUrl;
  }
  for (const i of ["ghUser", "ghToken"])
    s[i] !== n[i] && (e[i] = s[i].trim(), l[i] = e[i]);
  let f = !1;
  for (const i of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    s.ai[i] !== n.ai[i] && (e.ai[i] = s.ai[i], f = !0);
  if (s.ai.useCustomPrompt !== n.ai.useCustomPrompt && (e.ai.useCustomPrompt = s.ai.useCustomPrompt, f = !0), f && (l[S] = e.ai), typeof chrome < "u" && chrome.storage?.local)
    Object.keys(l).length && await chrome.storage.local.set(l);
  else
    for (const [i, u] of Object.entries(l)) localStorage.setItem(i, typeof u == "string" ? u : JSON.stringify(u));
  return { accountChanged: "ghUser" in l || "ghToken" in l, settings: e };
}
const ae = { class: "gh-popover-head" }, ie = ["disabled"], ne = {
  key: 1,
  class: "gh-settings-message",
  role: "status"
}, le = ["disabled"], re = { class: "gh-popover-body" }, ue = { class: "gh-field-list" }, ce = { class: "gh-field-item" }, ge = { class: "gh-field-item" }, he = { class: "gh-input-action-wrap" }, fe = ["type"], de = ["title"], me = { class: "gh-test-block" }, pe = ["disabled"], ve = {
  key: 0,
  class: "rate"
}, be = { class: "gh-popover-foot" }, ye = ["disabled"], ke = /* @__PURE__ */ j({
  __name: "GitHubSettingsModal",
  props: {
    anchor: {},
    visible: { type: Boolean, default: !0 },
    aiRequest: { default: 0 }
  },
  emits: ["close", "account-reload"],
  setup(s, { emit: n }) {
    const e = s, l = n, f = b("account");
    x(() => e.aiRequest, (c) => {
      c && e.visible && (f.value = "ai");
    }, { immediate: !0 });
    const i = b(!1), u = b(!1), p = b(!1), y = b(!1), d = b(""), h = b(null), r = Y({ ghUser: "", ghToken: "", ai: { ...R }, archifyWebhookUrl: "" });
    let w, m = !1, k, G, T = 0;
    const U = b(!1);
    async function N() {
      if (m || !e.visible || y.value || U.value || p.value) return;
      const c = ++T;
      U.value = !0;
      try {
        const t = await B();
        if (m || !e.visible || c !== T) return;
        Object.assign(r, t), w = JSON.parse(JSON.stringify(t)), y.value = !0, d.value = "";
      } catch {
        !m && e.visible && c === T && (d.value = "读取设置失败，已禁止保存；请重试读取。");
      } finally {
        c === T && (U.value = !1);
      }
    }
    function I() {
      clearTimeout(G), G = void 0, k?.abort(), k = void 0, u.value = !1;
    }
    x(() => e.visible, (c) => {
      c ? N() : (++T, U.value = !1, I(), i.value = !1);
    }, { immediate: !0, flush: "sync" }), K(() => {
      m = !0, ++T, I();
    });
    async function M() {
      if (m || !e.visible || !y.value || u.value || p.value) return;
      const c = r.ghUser.trim(), t = r.ghToken.trim();
      if (!c && !t) {
        d.value = "请填写用户名或 Token。";
        return;
      }
      u.value = !0, h.value = null;
      const a = new AbortController();
      k = a;
      const E = window.setTimeout(() => a.abort(), 1e4);
      G = E;
      try {
        const { data: g, rateLimit: P } = await X(t ? "/user" : `/users/${encodeURIComponent(c)}`, {
          headers: Z(t),
          signal: a.signal,
          timeoutMs: 1e4,
          maxBytes: 131072
        });
        if (!g || typeof g.login != "string" || !g.login || g.login.length > 100 || typeof g.id != "number") throw new A("format", "GitHub 身份响应格式无效。");
        if (m || !e.visible || k !== a) return;
        a.signal.throwIfAborted(), h.value = {
          success: !0,
          message: `连接成功：@${g.login}`,
          rateLimit: { remaining: P.remaining ?? 0, limit: P.limit ?? 0 }
        }, !c && !r.ghUser.trim() && r.ghToken.trim() === t && g.login && (r.ghUser = g.login);
      } catch (g) {
        !m && e.visible && k === a && (h.value = { success: !1, message: g instanceof A ? g.message : "连接已取消或超时，请重试。" });
      } finally {
        clearTimeout(E), k === a && (k = void 0, G = void 0, u.value = !1);
      }
    }
    async function $() {
      if (m || !e.visible || !y.value || !w || p.value || u.value) return;
      if ((r.ghUser !== w.ghUser || r.ghToken !== w.ghToken) && !r.ghUser.trim() && !r.ghToken.trim()) {
        d.value = "请至少填写用户名或 Token；本面板不执行账号解除绑定。";
        return;
      }
      p.value = !0;
      let t = !1;
      try {
        const a = await oe(JSON.parse(JSON.stringify(r)), JSON.parse(JSON.stringify(w)));
        if (t = !0, m) return;
        w = JSON.parse(JSON.stringify(a.settings)), Object.assign(r, a.settings), L.aiConfig = { ...a.settings.ai }, d.value = "设置已保存。", a.accountChanged && (l("account-reload"), await L.loadGitHub(a.settings.ghUser, a.settings.ghToken), d.value = "设置已保存；仓库读取可能暂停或等待 Star 操作，请查看主页面状态，必要时点击刷新。");
      } catch (a) {
        d.value = a instanceof H ? a.message : t ? "设置已保存，但同步失败，请重试。" : "保存失败或其他页面已修改配置，请重新打开面板核对；原配置未确认更新。";
      } finally {
        p.value = !1;
      }
    }
    return (c, t) => (_(), V(Q, {
      anchor: s.anchor,
      visible: s.visible,
      label: "GitHub 模组偏好设置",
      onClose: t[5] || (t[5] = (a) => l("close"))
    }, {
      default: q(() => [
        o("header", ae, [
          t[6] || (t[6] = o("div", { class: "gh-popover-title-wrap" }, [
            o("span", { class: "gh-popover-badge" }, "⚙️ GitHub 设置")
          ], -1)),
          o("button", {
            type: "button",
            class: "gh-popover-close-btn",
            title: "关闭",
            onClick: t[0] || (t[0] = (a) => l("close"))
          }, "✕")
        ]),
        t[10] || (t[10] = o("p", { class: "gh-settings-message" }, "隐藏面板或离开卡片会保留草稿；关闭整个标签页仍会丢失。", -1)),
        y.value ? W("", !0) : (_(), O("button", {
          key: 0,
          type: "button",
          disabled: U.value || !s.visible,
          onClick: N
        }, v(U.value ? "正在读取…" : "重试读取"), 9, ie)),
        d.value ? (_(), O("p", ne, v(d.value), 1)) : W("", !0),
        o("fieldset", {
          class: "gh-settings-fields",
          disabled: !y.value || p.value || u.value
        }, [
          o("main", re, [
            o("section", ue, [
              o("div", ce, [
                t[7] || (t[7] = o("label", { class: "gh-field-label" }, [
                  o("span", null, "用户名"),
                  o("small", { class: "optional" }, "Token 可单独使用")
                ], -1)),
                J(o("input", {
                  "onUpdate:modelValue": t[1] || (t[1] = (a) => r.ghUser = a),
                  type: "text",
                  class: "gh-input",
                  placeholder: "例如：octocat",
                  autocomplete: "off"
                }, null, 512), [
                  [z, r.ghUser]
                ])
              ]),
              o("div", ge, [
                t[8] || (t[8] = o("label", { class: "gh-field-label" }, [
                  o("span", null, "个人访问令牌 (Token)"),
                  o("small", { class: "optional" }, "5000次/h")
                ], -1)),
                o("div", he, [
                  J(o("input", {
                    "onUpdate:modelValue": t[2] || (t[2] = (a) => r.ghToken = a),
                    type: i.value ? "text" : "password",
                    class: "gh-input",
                    placeholder: "ghp_... / github_pat_...",
                    autocomplete: "off"
                  }, null, 8, fe), [
                    [D, r.ghToken]
                  ]),
                  o("button", {
                    type: "button",
                    class: "gh-toggle-pwd",
                    title: i.value ? "隐藏" : "显示",
                    onClick: t[3] || (t[3] = (a) => i.value = !i.value)
                  }, v(i.value ? "👁️" : "🔒"), 9, de)
                ]),
                t[9] || (t[9] = o("div", { class: "gh-hint-row" }, [
                  o("a", {
                    href: "https://github.com/settings/tokens/new?scopes=user&description=LogicWeaver-NewTab",
                    target: "_blank",
                    rel: "noopener",
                    class: "gh-link"
                  }, " 申请具备 user 权限的 Token ↗ "),
                  o("span", { style: { "font-size": "11px", color: "var(--muted)", "margin-left": "8px" } }, "（用于读取与管理 GitHub 官方 Lists 列表）")
                ], -1))
              ]),
              o("div", me, [
                o("button", {
                  type: "button",
                  class: "gh-test-btn",
                  disabled: u.value,
                  onClick: M
                }, [
                  o("span", null, v(u.value ? "验证中…" : "⚡ 测试连接"), 1)
                ], 8, pe),
                h.value ? (_(), O("div", {
                  key: 0,
                  class: F(["gh-test-pill", { success: h.value.success, error: !h.value.success }])
                }, [
                  o("span", null, v(h.value.message), 1),
                  h.value.rateLimit ? (_(), O("span", ve, "(" + v(h.value.rateLimit.remaining) + "/" + v(h.value.rateLimit.limit) + ")", 1)) : W("", !0)
                ], 2)) : W("", !0)
              ])
            ])
          ])
        ], 8, le),
        o("footer", be, [
          o("button", {
            type: "button",
            class: "gh-btn-cancel",
            onClick: t[4] || (t[4] = (a) => l("close"))
          }, "取消"),
          o("button", {
            type: "button",
            class: "gh-btn-save",
            disabled: !y.value || p.value || u.value,
            onClick: $
          }, v(p.value ? "保存中…" : "保存生效"), 9, ye)
        ])
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), _e = /* @__PURE__ */ ee(ke, [["__scopeId", "data-v-133dffee"]]);
export {
  _e as default
};
