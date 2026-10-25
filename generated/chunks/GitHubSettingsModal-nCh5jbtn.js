import { d as F, x as K, L as Y, o as S, c as Q, w as X, f as t, B as N, e as G, t as y, g as I, l as h, n as O, q as Z, z as A, S as M, m as V, v as ee, b as k, r as te } from "./vendor-vue-CjOHdfe5.js";
import { M as se } from "./ModuleSettingsPanel-CLNk9pD0.js";
import { bu as P, bv as j, V as oe, bw as ae, W as $, K as E } from "./search.service-CzxjlNxM.js";
import { _ as le } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const H = "ghArchifyWebhookUrl";
class W extends Error {
}
function ie(a) {
  if (a == null || a === "") return "";
  if (typeof a != "string") throw new W("流水线地址格式无效，请在 GitHub 设置中重新填写。");
  const n = a.trim();
  if (!n) return "";
  let o;
  try {
    o = new URL(n);
  } catch {
    throw new W("请填写完整的 HTTP(S) Webhook 地址。");
  }
  if (!["http:", "https:"].includes(o.protocol) || o.username || o.password || o.search || o.hash)
    throw new W("Webhook 只支持 HTTP(S)，不能包含账号密码、查询参数或片段。");
  if (o.pathname === "/") throw new W("请填写完整的 Webhook 路径，而不是 n8n 控制台根地址。");
  return o.href;
}
function ne(a) {
  let n = a;
  if (typeof n == "string")
    try {
      n = JSON.parse(n);
    } catch {
      n = {};
    }
  const o = n && typeof n == "object" ? n : {}, r = { ...j };
  for (const u of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    typeof o[u] == "string" && (r[u] = o[u]);
  return typeof o.useCustomPrompt == "boolean" && (r.useCustomPrompt = o.useCustomPrompt), r;
}
async function J() {
  let a;
  return typeof chrome < "u" && chrome.storage?.local ? a = await chrome.storage.local.get(["ghUser", "ghToken", P, H]) : a = { ghUser: localStorage.getItem("ghUser"), ghToken: localStorage.getItem("ghToken"), [P]: localStorage.getItem(P), [H]: localStorage.getItem(H) }, { ghUser: typeof a.ghUser == "string" ? a.ghUser : "", ghToken: typeof a.ghToken == "string" ? a.ghToken : "", ai: ne(a[P]), archifyWebhookUrl: typeof a[H] == "string" ? a[H] : "" };
}
async function re(a, n) {
  const o = await J(), r = {};
  if (a.archifyWebhookUrl !== n.archifyWebhookUrl) {
    if (o.archifyWebhookUrl !== n.archifyWebhookUrl) throw new Error("Webhook setting changed in another page");
    o.archifyWebhookUrl = ie(a.archifyWebhookUrl), r[H] = o.archifyWebhookUrl;
  }
  for (const i of ["ghUser", "ghToken"])
    a[i] !== n[i] && (o[i] = a[i].trim(), r[i] = o[i]);
  let u = !1;
  for (const i of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    a.ai[i] !== n.ai[i] && (o.ai[i] = a.ai[i], u = !0);
  if (a.ai.useCustomPrompt !== n.ai.useCustomPrompt && (o.ai.useCustomPrompt = a.ai.useCustomPrompt, u = !0), u && (r[P] = o.ai), typeof chrome < "u" && chrome.storage?.local)
    Object.keys(r).length && await chrome.storage.local.set(r);
  else
    for (const [i, g] of Object.entries(r)) localStorage.setItem(i, typeof g == "string" ? g : JSON.stringify(g));
  return { accountChanged: "ghUser" in r || "ghToken" in r, settings: o };
}
async function ue() {
  typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.remove("ghStarredCache") : localStorage.removeItem("ghStarredCache");
}
const ce = { class: "gh-popover-head" }, ge = { class: "gh-popover-tabs" }, de = ["disabled"], pe = {
  key: 1,
  class: "gh-settings-message",
  role: "status"
}, he = ["disabled"], fe = { class: "gh-popover-body" }, ve = { class: "gh-field-list" }, me = { class: "gh-field-item" }, be = { class: "gh-field-item" }, ye = { class: "gh-input-action-wrap" }, ke = ["type"], Ue = ["title"], we = { class: "gh-test-block" }, Ce = ["disabled"], Te = {
  key: 0,
  class: "rate"
}, Se = { class: "gh-field-list" }, He = { class: "gh-field-item" }, Ge = { class: "gh-radio-bar" }, Ie = { class: "gh-field-item" }, Oe = { class: "gh-field-item" }, Pe = ["placeholder"], We = { class: "gh-field-item" }, xe = { class: "gh-field-list" }, Ne = { class: "gh-popover-foot" }, Ae = ["disabled"], Ve = /* @__PURE__ */ F({
  __name: "GitHubSettingsModal",
  props: {
    anchor: {},
    visible: { type: Boolean, default: !0 },
    aiRequest: { default: 0 }
  },
  emits: ["close", "account-reload"],
  setup(a, { emit: n }) {
    const o = a, r = n, u = k("account");
    K(() => o.aiRequest, (c) => {
      c && o.visible && (u.value = "ai");
    }, { immediate: !0 });
    const i = k(!1), g = k(!1), f = k(!1), b = k(!1), d = k(""), m = k(null), l = te({ ghUser: "", ghToken: "", ai: { ...j }, archifyWebhookUrl: "" });
    let w, p = !1, U, x, C = 0;
    const T = k(!1);
    async function R() {
      if (p || !o.visible || b.value || T.value || f.value) return;
      const c = ++C;
      T.value = !0;
      try {
        const e = await J();
        if (p || !o.visible || c !== C) return;
        Object.assign(l, e), w = JSON.parse(JSON.stringify(e)), b.value = !0, d.value = "";
      } catch {
        !p && o.visible && c === C && (d.value = "读取设置失败，已禁止保存；请重试读取。");
      } finally {
        c === C && (T.value = !1);
      }
    }
    function _() {
      clearTimeout(x), x = void 0, U?.abort(), U = void 0, g.value = !1;
    }
    K(() => o.visible, (c) => {
      c ? R() : (++C, T.value = !1, _(), i.value = !1);
    }, { immediate: !0, flush: "sync" }), Y(() => {
      p = !0, ++C, _();
    });
    async function q() {
      if (p || !o.visible || !b.value || g.value || f.value) return;
      const c = l.ghUser.trim(), e = l.ghToken.trim();
      if (!c && !e) {
        d.value = "请填写用户名或 Token。";
        return;
      }
      g.value = !0, m.value = null;
      const s = new AbortController();
      U = s;
      const B = window.setTimeout(() => s.abort(), 1e4);
      x = B;
      try {
        const { data: v, rateLimit: L } = await oe(e ? "/user" : `/users/${encodeURIComponent(c)}`, {
          headers: ae(e),
          signal: s.signal,
          timeoutMs: 1e4,
          maxBytes: 131072
        });
        if (!v || typeof v.login != "string" || !v.login || v.login.length > 100 || typeof v.id != "number") throw new $("format", "GitHub 身份响应格式无效。");
        if (p || !o.visible || U !== s) return;
        s.signal.throwIfAborted(), m.value = {
          success: !0,
          message: `连接成功：@${v.login}`,
          rateLimit: { remaining: L.remaining ?? 0, limit: L.limit ?? 0 }
        }, !c && !l.ghUser.trim() && l.ghToken.trim() === e && v.login && (l.ghUser = v.login);
      } catch (v) {
        !p && o.visible && U === s && (m.value = { success: !1, message: v instanceof $ ? v.message : "连接已取消或超时，请重试。" });
      } finally {
        clearTimeout(B), U === s && (U = void 0, x = void 0, g.value = !1);
      }
    }
    async function z() {
      if (p || !o.visible || !b.value || !w || f.value || g.value) return;
      if ((l.ghUser !== w.ghUser || l.ghToken !== w.ghToken) && !l.ghUser.trim() && !l.ghToken.trim()) {
        d.value = "请至少填写用户名或 Token；本面板不执行账号解除绑定。";
        return;
      }
      f.value = !0;
      let e = !1;
      try {
        const s = await re(JSON.parse(JSON.stringify(l)), JSON.parse(JSON.stringify(w)));
        if (e = !0, p) return;
        w = JSON.parse(JSON.stringify(s.settings)), Object.assign(l, s.settings), E.aiConfig = { ...s.settings.ai }, d.value = "设置已保存。", s.accountChanged && (r("account-reload"), await E.loadGitHub(s.settings.ghUser, s.settings.ghToken), d.value = "设置已保存；仓库读取可能暂停或等待 Star 操作，请查看主页面状态，必要时点击刷新。");
      } catch (s) {
        d.value = s instanceof W ? s.message : e ? "设置已保存，但同步失败，请重试。" : "保存失败或其他页面已修改配置，请重新打开面板核对；原配置未确认更新。";
      } finally {
        f.value = !1;
      }
    }
    async function D() {
      if (!(p || !o.visible || !b.value || f.value || g.value)) {
        f.value = !0;
        try {
          const c = await J();
          if (!c.ghUser && !c.ghToken) {
            d.value = "请先保存账号设置。";
            return;
          }
          if (p || (await ue(), p)) return;
          r("account-reload"), await E.loadGitHub(c.ghUser, c.ghToken), d.value = "已提交 Star 缓存清理，分类和备注保留；仓库重读状态请查看主页面。";
        } catch {
          d.value = "清理或同步失败，请重试。";
        } finally {
          f.value = !1;
        }
      }
    }
    return (c, e) => (S(), Q(se, {
      anchor: a.anchor,
      visible: a.visible,
      label: "GitHub 模组偏好设置",
      onClose: e[15] || (e[15] = (s) => r("close"))
    }, {
      default: X(() => [
        t("header", ce, [
          e[16] || (e[16] = t("div", { class: "gh-popover-title-wrap" }, [
            t("span", { class: "gh-popover-badge" }, "⚙️ GitHub 设置")
          ], -1)),
          t("button", {
            type: "button",
            class: "gh-popover-close-btn",
            title: "关闭",
            onClick: e[0] || (e[0] = (s) => r("close"))
          }, "✕")
        ]),
        t("nav", ge, [
          t("button", {
            type: "button",
            class: N(["gh-popover-tab", { active: u.value === "account" }]),
            onClick: e[1] || (e[1] = (s) => u.value = "account")
          }, " 账号与 Token ", 2),
          t("button", {
            type: "button",
            class: N(["gh-popover-tab", { active: u.value === "ai" }]),
            onClick: e[2] || (e[2] = (s) => u.value = "ai")
          }, " AI 研读 ", 2),
          t("button", {
            type: "button",
            class: N(["gh-popover-tab", { active: u.value === "cache" }]),
            onClick: e[3] || (e[3] = (s) => u.value = "cache")
          }, " 缓存维护 ", 2)
        ]),
        e[28] || (e[28] = t("p", { class: "gh-settings-message" }, "隐藏面板或离开卡片会保留草稿；关闭整个标签页仍会丢失。", -1)),
        b.value ? I("", !0) : (S(), G("button", {
          key: 0,
          type: "button",
          disabled: T.value || !a.visible,
          onClick: R
        }, y(T.value ? "正在读取…" : "重试读取"), 9, de)),
        d.value ? (S(), G("p", pe, y(d.value), 1)) : I("", !0),
        t("fieldset", {
          class: "gh-settings-fields",
          disabled: !b.value || f.value || g.value
        }, [
          t("main", fe, [
            h(t("section", ve, [
              t("div", me, [
                e[17] || (e[17] = t("label", { class: "gh-field-label" }, [
                  t("span", null, "用户名"),
                  t("small", { class: "optional" }, "Token 可单独使用")
                ], -1)),
                h(t("input", {
                  "onUpdate:modelValue": e[4] || (e[4] = (s) => l.ghUser = s),
                  type: "text",
                  class: "gh-input",
                  placeholder: "例如：octocat",
                  autocomplete: "off"
                }, null, 512), [
                  [O, l.ghUser]
                ])
              ]),
              t("div", be, [
                e[18] || (e[18] = t("label", { class: "gh-field-label" }, [
                  t("span", null, "个人访问令牌 (Token)"),
                  t("small", { class: "optional" }, "5000次/h")
                ], -1)),
                t("div", ye, [
                  h(t("input", {
                    "onUpdate:modelValue": e[5] || (e[5] = (s) => l.ghToken = s),
                    type: i.value ? "text" : "password",
                    class: "gh-input",
                    placeholder: "ghp_... / github_pat_...",
                    autocomplete: "off"
                  }, null, 8, ke), [
                    [Z, l.ghToken]
                  ]),
                  t("button", {
                    type: "button",
                    class: "gh-toggle-pwd",
                    title: i.value ? "隐藏" : "显示",
                    onClick: e[6] || (e[6] = (s) => i.value = !i.value)
                  }, y(i.value ? "👁️" : "🔒"), 9, Ue)
                ]),
                e[19] || (e[19] = t("div", { class: "gh-hint-row" }, [
                  t("a", {
                    href: "https://github.com/settings/tokens/new?scopes=read:user&description=LogicWeaver-NewTab",
                    target: "_blank",
                    rel: "noopener",
                    class: "gh-link"
                  }, " 申请 Token ↗ ")
                ], -1))
              ]),
              t("div", we, [
                t("button", {
                  type: "button",
                  class: "gh-test-btn",
                  disabled: g.value,
                  onClick: q
                }, [
                  t("span", null, y(g.value ? "验证中…" : "⚡ 测试连接"), 1)
                ], 8, Ce),
                m.value ? (S(), G("div", {
                  key: 0,
                  class: N(["gh-test-pill", { success: m.value.success, error: !m.value.success }])
                }, [
                  t("span", null, y(m.value.message), 1),
                  m.value.rateLimit ? (S(), G("span", Te, "(" + y(m.value.rateLimit.remaining) + "/" + y(m.value.rateLimit.limit) + ")", 1)) : I("", !0)
                ], 2)) : I("", !0)
              ])
            ], 512), [
              [A, u.value === "account"]
            ]),
            h(t("section", Se, [
              t("div", He, [
                e[22] || (e[22] = t("label", { class: "gh-field-label" }, "模型供应商", -1)),
                t("div", Ge, [
                  t("label", null, [
                    h(t("input", {
                      "onUpdate:modelValue": e[7] || (e[7] = (s) => l.ai.provider = s),
                      type: "radio",
                      value: "gemini"
                    }, null, 512), [
                      [M, l.ai.provider]
                    ]),
                    e[20] || (e[20] = V(" Gemini", -1))
                  ]),
                  t("label", null, [
                    h(t("input", {
                      "onUpdate:modelValue": e[8] || (e[8] = (s) => l.ai.provider = s),
                      type: "radio",
                      value: "openai"
                    }, null, 512), [
                      [M, l.ai.provider]
                    ]),
                    e[21] || (e[21] = V(" DeepSeek/OpenAI", -1))
                  ])
                ])
              ]),
              t("div", Ie, [
                e[23] || (e[23] = t("label", { class: "gh-field-label" }, "API Key", -1)),
                h(t("input", {
                  "onUpdate:modelValue": e[9] || (e[9] = (s) => l.ai.apiKey = s),
                  type: "password",
                  class: "gh-input",
                  placeholder: "sk-... / AIzaSy...",
                  autocomplete: "off"
                }, null, 512), [
                  [O, l.ai.apiKey]
                ])
              ]),
              t("div", Oe, [
                e[24] || (e[24] = t("label", { class: "gh-field-label" }, "模型名", -1)),
                h(t("input", {
                  "onUpdate:modelValue": e[10] || (e[10] = (s) => l.ai.model = s),
                  type: "text",
                  class: "gh-input",
                  placeholder: l.ai.provider === "gemini" ? "gemini-3.6-flash" : "deepseek-chat"
                }, null, 8, Pe), [
                  [O, l.ai.model]
                ])
              ]),
              t("div", We, [
                e[25] || (e[25] = t("label", { class: "gh-field-label" }, "Base URL", -1)),
                h(t("input", {
                  "onUpdate:modelValue": e[11] || (e[11] = (s) => l.ai.baseUrl = s),
                  type: "text",
                  class: "gh-input",
                  placeholder: "填写与供应商匹配的 API 地址"
                }, null, 512), [
                  [O, l.ai.baseUrl]
                ])
              ]),
              t("label", null, [
                h(t("input", {
                  "onUpdate:modelValue": e[12] || (e[12] = (s) => l.ai.useCustomPrompt = s),
                  type: "checkbox"
                }, null, 512), [
                  [ee, l.ai.useCustomPrompt]
                ]),
                e[26] || (e[26] = V(" 使用自定义提示词", -1))
              ]),
              l.ai.useCustomPrompt ? h((S(), G("textarea", {
                key: 0,
                "onUpdate:modelValue": e[13] || (e[13] = (s) => l.ai.customPrompt = s),
                class: "gh-input",
                rows: "4",
                "aria-label": "自定义提示词"
              }, null, 512)), [
                [O, l.ai.customPrompt]
              ]) : I("", !0)
            ], 512), [
              [A, u.value === "ai"]
            ]),
            h(t("section", xe, [
              e[27] || (e[27] = t("p", { class: "gh-cache-desc" }, " 若 GitHub 上刚添加了 Star 或更改了仓库信息，可就地清理缓存强制拉取最新数据。 ", -1)),
              t("button", {
                type: "button",
                class: "gh-clear-btn",
                onClick: D
              }, " 🧹 清空本地缓存并全量同步 ")
            ], 512), [
              [A, u.value === "cache"]
            ])
          ])
        ], 8, he),
        t("footer", Ne, [
          t("button", {
            type: "button",
            class: "gh-btn-cancel",
            onClick: e[14] || (e[14] = (s) => r("close"))
          }, "取消"),
          t("button", {
            type: "button",
            class: "gh-btn-save",
            disabled: !b.value || f.value || g.value,
            onClick: z
          }, y(f.value ? "保存中…" : "保存生效"), 9, Ae)
        ])
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), Be = /* @__PURE__ */ le(Ve, [["__scopeId", "data-v-5f2ee312"]]);
export {
  Be as default
};
