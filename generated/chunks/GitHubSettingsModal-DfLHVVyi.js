import { f as z, w as K, a as F, g as S, I as Y, K as Q, i as t, s as I, h as O, t as y, u as P, q as c, v as H, O as X, D as N, P as M, j as x, Q as Z, b as k, r as ee } from "./vendor-vue-BUkfvXUI.js";
import { M as te } from "./ModuleSettingsPanel-v0eVtRbB.js";
import { ag as W, ah as j, ai as se, aj as oe, ak as L, c as V } from "./search.service-CJV_B19X.js";
import { G, n as ae, A as le } from "./GitHubBatchBar.vue_vue_type_script_setup_true_lang-BEl9lBhM.js";
import { _ as ie } from "./_plugin-vue_export-helper-CHgC5LLL.js";
function ne(l) {
  let g = l;
  if (typeof g == "string")
    try {
      g = JSON.parse(g);
    } catch {
      g = {};
    }
  const a = g && typeof g == "object" ? g : {}, r = { ...j };
  for (const i of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    typeof a[i] == "string" && (r[i] = a[i]);
  return typeof a.useCustomPrompt == "boolean" && (r.useCustomPrompt = a.useCustomPrompt), r;
}
async function J() {
  let l;
  return typeof chrome < "u" && chrome.storage?.local ? l = await chrome.storage.local.get(["ghUser", "ghToken", W, G]) : l = { ghUser: localStorage.getItem("ghUser"), ghToken: localStorage.getItem("ghToken"), [W]: localStorage.getItem(W), [G]: localStorage.getItem(G) }, { ghUser: typeof l.ghUser == "string" ? l.ghUser : "", ghToken: typeof l.ghToken == "string" ? l.ghToken : "", ai: ne(l[W]), archifyWebhookUrl: typeof l[G] == "string" ? l[G] : "" };
}
async function re(l, g) {
  const a = await J(), r = {};
  if (l.archifyWebhookUrl !== g.archifyWebhookUrl) {
    if (a.archifyWebhookUrl !== g.archifyWebhookUrl) throw new Error("Webhook setting changed in another page");
    a.archifyWebhookUrl = ae(l.archifyWebhookUrl), r[G] = a.archifyWebhookUrl;
  }
  for (const n of ["ghUser", "ghToken"])
    l[n] !== g[n] && (a[n] = l[n].trim(), r[n] = a[n]);
  let i = !1;
  for (const n of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    l.ai[n] !== g.ai[n] && (a.ai[n] = l.ai[n], i = !0);
  if (l.ai.useCustomPrompt !== g.ai.useCustomPrompt && (a.ai.useCustomPrompt = l.ai.useCustomPrompt, i = !0), i && (r[W] = a.ai), typeof chrome < "u" && chrome.storage?.local)
    Object.keys(r).length && await chrome.storage.local.set(r);
  else
    for (const [n, d] of Object.entries(r)) localStorage.setItem(n, typeof d == "string" ? d : JSON.stringify(d));
  return { accountChanged: "ghUser" in r || "ghToken" in r, settings: a };
}
async function ue() {
  typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.remove("ghStarredCache") : localStorage.removeItem("ghStarredCache");
}
const ge = { class: "gh-popover-head" }, de = { class: "gh-popover-tabs" }, ce = ["disabled"], pe = {
  key: 1,
  class: "gh-settings-message",
  role: "status"
}, ve = ["disabled"], fe = { class: "gh-popover-body" }, he = { class: "gh-field-list" }, me = { class: "gh-field-item" }, be = { class: "gh-field-item" }, ye = { class: "gh-input-action-wrap" }, ke = ["type"], Ue = ["title"], Ce = { class: "gh-test-block" }, we = ["disabled"], Te = {
  key: 0,
  class: "rate"
}, Se = { class: "gh-field-list" }, He = { class: "gh-field-item" }, Ge = { class: "gh-radio-bar" }, Ie = { class: "gh-field-item" }, Oe = { class: "gh-field-item" }, Pe = ["placeholder"], We = { class: "gh-field-item" }, Ae = { class: "gh-field-list" }, Ne = { class: "gh-field-item" }, xe = { class: "gh-field-list" }, Ve = { class: "gh-popover-foot" }, Je = ["disabled"], Ee = /* @__PURE__ */ z({
  __name: "GitHubSettingsModal",
  props: {
    anchor: {},
    visible: { type: Boolean, default: !0 },
    aiRequest: { default: 0 }
  },
  emits: ["close", "account-reload"],
  setup(l, { emit: g }) {
    const a = l, r = g, i = k("account");
    K(() => a.aiRequest, (u) => {
      u && a.visible && (i.value = "ai");
    }, { immediate: !0 });
    const n = k(!1), d = k(!1), f = k(!1), b = k(!1), p = k(""), m = k(null), o = ee({ ghUser: "", ghToken: "", ai: { ...j }, archifyWebhookUrl: "" });
    let C, v = !1, U, A, w = 0;
    const T = k(!1);
    async function E() {
      if (v || !a.visible || b.value || T.value || f.value) return;
      const u = ++w;
      T.value = !0;
      try {
        const e = await J();
        if (v || !a.visible || u !== w) return;
        Object.assign(o, e), C = JSON.parse(JSON.stringify(e)), b.value = !0, p.value = "";
      } catch {
        !v && a.visible && u === w && (p.value = "读取设置失败，已禁止保存；请重试读取。");
      } finally {
        u === w && (T.value = !1);
      }
    }
    function R() {
      clearTimeout(A), A = void 0, U?.abort(), U = void 0, d.value = !1;
    }
    K(() => a.visible, (u) => {
      u ? E() : (++w, T.value = !1, R(), n.value = !1);
    }, { immediate: !0, flush: "sync" }), F(() => {
      v = !0, ++w, R();
    });
    async function D() {
      if (v || !a.visible || !b.value || d.value || f.value) return;
      const u = o.ghUser.trim(), e = o.ghToken.trim();
      if (!u && !e) {
        p.value = "请填写用户名或 Token。";
        return;
      }
      d.value = !0, m.value = null;
      const s = new AbortController();
      U = s;
      const $ = window.setTimeout(() => s.abort(), 1e4);
      A = $;
      try {
        const { data: h, rateLimit: B } = await se(e ? "/user" : `/users/${encodeURIComponent(u)}`, {
          headers: oe(e),
          signal: s.signal,
          timeoutMs: 1e4,
          maxBytes: 131072
        });
        if (!h || typeof h.login != "string" || !h.login || h.login.length > 100 || typeof h.id != "number") throw new L("format", "GitHub 身份响应格式无效。");
        if (v || !a.visible || U !== s) return;
        s.signal.throwIfAborted(), m.value = {
          success: !0,
          message: `连接成功：@${h.login}`,
          rateLimit: { remaining: B.remaining ?? 0, limit: B.limit ?? 0 }
        }, !u && !o.ghUser.trim() && o.ghToken.trim() === e && h.login && (o.ghUser = h.login);
      } catch (h) {
        !v && a.visible && U === s && (m.value = { success: !1, message: h instanceof L ? h.message : "连接已取消或超时，请重试。" });
      } finally {
        clearTimeout($), U === s && (U = void 0, A = void 0, d.value = !1);
      }
    }
    async function q() {
      if (v || !a.visible || !b.value || !C || f.value || d.value) return;
      if ((o.ghUser !== C.ghUser || o.ghToken !== C.ghToken) && !o.ghUser.trim() && !o.ghToken.trim()) {
        p.value = "请至少填写用户名或 Token；本面板不执行账号解除绑定。";
        return;
      }
      f.value = !0;
      let e = !1;
      try {
        const s = await re(JSON.parse(JSON.stringify(o)), JSON.parse(JSON.stringify(C)));
        if (e = !0, v) return;
        C = JSON.parse(JSON.stringify(s.settings)), Object.assign(o, s.settings), V.aiConfig = { ...s.settings.ai }, p.value = "设置已保存。", s.accountChanged && (r("account-reload"), await V.loadGitHub(s.settings.ghUser, s.settings.ghToken), p.value = "设置已保存；仓库读取可能暂停或等待 Star 操作，请查看主页面状态，必要时点击刷新。");
      } catch (s) {
        p.value = s instanceof le ? s.message : e ? "设置已保存，但同步失败，请重试。" : "保存失败或其他页面已修改配置，请重新打开面板核对；原配置未确认更新。";
      } finally {
        f.value = !1;
      }
    }
    async function _() {
      if (!(v || !a.visible || !b.value || f.value || d.value)) {
        f.value = !0;
        try {
          const u = await J();
          if (!u.ghUser && !u.ghToken) {
            p.value = "请先保存账号设置。";
            return;
          }
          if (v || (await ue(), v)) return;
          r("account-reload"), await V.loadGitHub(u.ghUser, u.ghToken), p.value = "已提交 Star 缓存清理，分类和备注保留；仓库重读状态请查看主页面。";
        } catch {
          p.value = "清理或同步失败，请重试。";
        } finally {
          f.value = !1;
        }
      }
    }
    return (u, e) => (S(), Y(te, {
      anchor: l.anchor,
      visible: l.visible,
      label: "GitHub 模组偏好设置",
      onClose: e[17] || (e[17] = (s) => r("close"))
    }, {
      default: Q(() => [
        t("header", ge, [
          e[18] || (e[18] = t("div", { class: "gh-popover-title-wrap" }, [
            t("span", { class: "gh-popover-badge" }, "⚙️ GitHub 设置")
          ], -1)),
          t("button", {
            type: "button",
            class: "gh-popover-close-btn",
            title: "关闭",
            onClick: e[0] || (e[0] = (s) => r("close"))
          }, "✕")
        ]),
        t("nav", de, [
          t("button", {
            type: "button",
            class: I(["gh-popover-tab", { active: i.value === "account" }]),
            onClick: e[1] || (e[1] = (s) => i.value = "account")
          }, " 账号与 Token ", 2),
          t("button", {
            type: "button",
            class: I(["gh-popover-tab", { active: i.value === "ai" }]),
            onClick: e[2] || (e[2] = (s) => i.value = "ai")
          }, " AI 研读 ", 2),
          t("button", {
            type: "button",
            class: I(["gh-popover-tab", { active: i.value === "workflow" }]),
            onClick: e[3] || (e[3] = (s) => i.value = "workflow")
          }, "流水线", 2),
          t("button", {
            type: "button",
            class: I(["gh-popover-tab", { active: i.value === "cache" }]),
            onClick: e[4] || (e[4] = (s) => i.value = "cache")
          }, " 缓存维护 ", 2)
        ]),
        e[33] || (e[33] = t("p", { class: "gh-settings-message" }, "隐藏面板或离开卡片会保留草稿；关闭整个标签页仍会丢失。", -1)),
        b.value ? P("", !0) : (S(), O("button", {
          key: 0,
          type: "button",
          disabled: T.value || !l.visible,
          onClick: E
        }, y(T.value ? "正在读取…" : "重试读取"), 9, ce)),
        p.value ? (S(), O("p", pe, y(p.value), 1)) : P("", !0),
        t("fieldset", {
          class: "gh-settings-fields",
          disabled: !b.value || f.value || d.value
        }, [
          t("main", fe, [
            c(t("section", he, [
              t("div", me, [
                e[19] || (e[19] = t("label", { class: "gh-field-label" }, [
                  t("span", null, "用户名"),
                  t("small", { class: "optional" }, "Token 可单独使用")
                ], -1)),
                c(t("input", {
                  "onUpdate:modelValue": e[5] || (e[5] = (s) => o.ghUser = s),
                  type: "text",
                  class: "gh-input",
                  placeholder: "例如：octocat",
                  autocomplete: "off"
                }, null, 512), [
                  [H, o.ghUser]
                ])
              ]),
              t("div", be, [
                e[20] || (e[20] = t("label", { class: "gh-field-label" }, [
                  t("span", null, "个人访问令牌 (Token)"),
                  t("small", { class: "optional" }, "5000次/h")
                ], -1)),
                t("div", ye, [
                  c(t("input", {
                    "onUpdate:modelValue": e[6] || (e[6] = (s) => o.ghToken = s),
                    type: n.value ? "text" : "password",
                    class: "gh-input",
                    placeholder: "ghp_... / github_pat_...",
                    autocomplete: "off"
                  }, null, 8, ke), [
                    [X, o.ghToken]
                  ]),
                  t("button", {
                    type: "button",
                    class: "gh-toggle-pwd",
                    title: n.value ? "隐藏" : "显示",
                    onClick: e[7] || (e[7] = (s) => n.value = !n.value)
                  }, y(n.value ? "👁️" : "🔒"), 9, Ue)
                ]),
                e[21] || (e[21] = t("div", { class: "gh-hint-row" }, [
                  t("a", {
                    href: "https://github.com/settings/tokens/new?scopes=read:user&description=LogicWeaver-NewTab",
                    target: "_blank",
                    rel: "noopener",
                    class: "gh-link"
                  }, " 申请 Token ↗ ")
                ], -1))
              ]),
              t("div", Ce, [
                t("button", {
                  type: "button",
                  class: "gh-test-btn",
                  disabled: d.value,
                  onClick: D
                }, [
                  t("span", null, y(d.value ? "验证中…" : "⚡ 测试连接"), 1)
                ], 8, we),
                m.value ? (S(), O("div", {
                  key: 0,
                  class: I(["gh-test-pill", { success: m.value.success, error: !m.value.success }])
                }, [
                  t("span", null, y(m.value.message), 1),
                  m.value.rateLimit ? (S(), O("span", Te, "(" + y(m.value.rateLimit.remaining) + "/" + y(m.value.rateLimit.limit) + ")", 1)) : P("", !0)
                ], 2)) : P("", !0)
              ])
            ], 512), [
              [N, i.value === "account"]
            ]),
            c(t("section", Se, [
              t("div", He, [
                e[24] || (e[24] = t("label", { class: "gh-field-label" }, "模型供应商", -1)),
                t("div", Ge, [
                  t("label", null, [
                    c(t("input", {
                      "onUpdate:modelValue": e[8] || (e[8] = (s) => o.ai.provider = s),
                      type: "radio",
                      value: "gemini"
                    }, null, 512), [
                      [M, o.ai.provider]
                    ]),
                    e[22] || (e[22] = x(" Gemini", -1))
                  ]),
                  t("label", null, [
                    c(t("input", {
                      "onUpdate:modelValue": e[9] || (e[9] = (s) => o.ai.provider = s),
                      type: "radio",
                      value: "openai"
                    }, null, 512), [
                      [M, o.ai.provider]
                    ]),
                    e[23] || (e[23] = x(" DeepSeek/OpenAI", -1))
                  ])
                ])
              ]),
              t("div", Ie, [
                e[25] || (e[25] = t("label", { class: "gh-field-label" }, "API Key", -1)),
                c(t("input", {
                  "onUpdate:modelValue": e[10] || (e[10] = (s) => o.ai.apiKey = s),
                  type: "password",
                  class: "gh-input",
                  placeholder: "sk-... / AIzaSy...",
                  autocomplete: "off"
                }, null, 512), [
                  [H, o.ai.apiKey]
                ])
              ]),
              t("div", Oe, [
                e[26] || (e[26] = t("label", { class: "gh-field-label" }, "模型名", -1)),
                c(t("input", {
                  "onUpdate:modelValue": e[11] || (e[11] = (s) => o.ai.model = s),
                  type: "text",
                  class: "gh-input",
                  placeholder: o.ai.provider === "gemini" ? "gemini-3.6-flash" : "deepseek-chat"
                }, null, 8, Pe), [
                  [H, o.ai.model]
                ])
              ]),
              t("div", We, [
                e[27] || (e[27] = t("label", { class: "gh-field-label" }, "Base URL", -1)),
                c(t("input", {
                  "onUpdate:modelValue": e[12] || (e[12] = (s) => o.ai.baseUrl = s),
                  type: "text",
                  class: "gh-input",
                  placeholder: "填写与供应商匹配的 API 地址"
                }, null, 512), [
                  [H, o.ai.baseUrl]
                ])
              ]),
              t("label", null, [
                c(t("input", {
                  "onUpdate:modelValue": e[13] || (e[13] = (s) => o.ai.useCustomPrompt = s),
                  type: "checkbox"
                }, null, 512), [
                  [Z, o.ai.useCustomPrompt]
                ]),
                e[28] || (e[28] = x(" 使用自定义提示词", -1))
              ]),
              o.ai.useCustomPrompt ? c((S(), O("textarea", {
                key: 0,
                "onUpdate:modelValue": e[14] || (e[14] = (s) => o.ai.customPrompt = s),
                class: "gh-input",
                rows: "4",
                "aria-label": "自定义提示词"
              }, null, 512)), [
                [H, o.ai.customPrompt]
              ]) : P("", !0)
            ], 512), [
              [N, i.value === "ai"]
            ]),
            c(t("section", Ae, [
              t("div", Ne, [
                e[29] || (e[29] = t("label", {
                  for: "gh-archify-webhook",
                  class: "gh-field-label"
                }, "Archify → n8n Webhook（可选）", -1)),
                c(t("input", {
                  id: "gh-archify-webhook",
                  "onUpdate:modelValue": e[15] || (e[15] = (s) => o.archifyWebhookUrl = s),
                  type: "text",
                  class: "gh-input",
                  placeholder: "完整 HTTP(S) Webhook 地址；留空关闭",
                  autocomplete: "off",
                  spellcheck: "false"
                }, null, 512), [
                  [H, o.archifyWebhookUrl]
                ])
              ]),
              e[30] || (e[30] = t("p", { class: "gh-cache-desc" }, "保存不连接、不触发流水线。分析窗口点击“发往 n8n”并确认后，才提交仓库名和架构数据到此节点，不携带 GitHub Token 或 AI 密钥。", -1)),
              e[31] || (e[31] = t("p", { class: "gh-cache-desc" }, "不使用私人默认服务器，不纳入普通备份。请使用可信节点，优先 HTTPS；这里不保存 Webhook 认证凭据。", -1))
            ], 512), [
              [N, i.value === "workflow"]
            ]),
            c(t("section", xe, [
              e[32] || (e[32] = t("p", { class: "gh-cache-desc" }, " 若 GitHub 上刚添加了 Star 或更改了仓库信息，可就地清理缓存强制拉取最新数据。 ", -1)),
              t("button", {
                type: "button",
                class: "gh-clear-btn",
                onClick: _
              }, " 🧹 清空本地缓存并全量同步 ")
            ], 512), [
              [N, i.value === "cache"]
            ])
          ])
        ], 8, ve),
        t("footer", Ve, [
          t("button", {
            type: "button",
            class: "gh-btn-cancel",
            onClick: e[16] || (e[16] = (s) => r("close"))
          }, "取消"),
          t("button", {
            type: "button",
            class: "gh-btn-save",
            disabled: !b.value || f.value || d.value,
            onClick: q
          }, y(f.value ? "保存中…" : "保存生效"), 9, Je)
        ])
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), Le = /* @__PURE__ */ ie(Ee, [["__scopeId", "data-v-e74b3301"]]);
export {
  Le as default
};
