import { f as z, w as K, a as F, g as w, I as Y, K as Q, i as t, s as A, h as H, t as y, u as I, q as v, v as O, O as X, D as x, P as M, j as W, Q as Z, b as k, r as ee } from "./vendor-vue-BUkfvXUI.js";
import { M as te } from "./ModuleSettingsPanel-v0eVtRbB.js";
import { af as P, ag as L, ah as se, ai as oe, aj as $, c as V } from "./search.service-BE0VV64-.js";
import { G, n as ae, A as le } from "./GitHubBatchBar.vue_vue_type_script_setup_true_lang-DBsDDGNp.js";
import { _ as ie } from "./_plugin-vue_export-helper-CHgC5LLL.js";
function ne(l) {
  let g = l;
  if (typeof g == "string")
    try {
      g = JSON.parse(g);
    } catch {
      g = {};
    }
  const a = g && typeof g == "object" ? g : {}, n = { ...L };
  for (const r of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    typeof a[r] == "string" && (n[r] = a[r]);
  return typeof a.useCustomPrompt == "boolean" && (n.useCustomPrompt = a.useCustomPrompt), n;
}
async function J() {
  let l;
  return typeof chrome < "u" && chrome.storage?.local ? l = await chrome.storage.local.get(["ghUser", "ghToken", P, G]) : l = { ghUser: localStorage.getItem("ghUser"), ghToken: localStorage.getItem("ghToken"), [P]: localStorage.getItem(P), [G]: localStorage.getItem(G) }, { ghUser: typeof l.ghUser == "string" ? l.ghUser : "", ghToken: typeof l.ghToken == "string" ? l.ghToken : "", ai: ne(l[P]), archifyWebhookUrl: typeof l[G] == "string" ? l[G] : "" };
}
async function re(l, g) {
  const a = await J(), n = {};
  if (l.archifyWebhookUrl !== g.archifyWebhookUrl) {
    if (a.archifyWebhookUrl !== g.archifyWebhookUrl) throw new Error("Webhook setting changed in another page");
    a.archifyWebhookUrl = ae(l.archifyWebhookUrl), n[G] = a.archifyWebhookUrl;
  }
  for (const i of ["ghUser", "ghToken"])
    l[i] !== g[i] && (a[i] = l[i].trim(), n[i] = a[i]);
  let r = !1;
  for (const i of ["provider", "apiKey", "baseUrl", "model", "customPrompt"])
    l.ai[i] !== g.ai[i] && (a.ai[i] = l.ai[i], r = !0);
  if (l.ai.useCustomPrompt !== g.ai.useCustomPrompt && (a.ai.useCustomPrompt = l.ai.useCustomPrompt, r = !0), r && (n[P] = a.ai), typeof chrome < "u" && chrome.storage?.local)
    Object.keys(n).length && await chrome.storage.local.set(n);
  else
    for (const [i, c] of Object.entries(n)) localStorage.setItem(i, typeof c == "string" ? c : JSON.stringify(c));
  return { accountChanged: "ghUser" in n || "ghToken" in n, settings: a };
}
async function ue() {
  typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.remove("ghStarredCache") : localStorage.removeItem("ghStarredCache");
}
const ge = { class: "gh-popover-head" }, ce = { class: "gh-popover-tabs" }, de = ["disabled"], pe = {
  key: 1,
  class: "gh-settings-message",
  role: "status"
}, ve = ["disabled"], fe = { class: "gh-popover-body" }, he = { class: "gh-field-list" }, me = { class: "gh-field-item" }, be = { class: "gh-field-item" }, ye = { class: "gh-input-action-wrap" }, ke = ["type"], Ue = ["title"], Ce = { class: "gh-test-block" }, Te = ["disabled"], Se = {
  key: 0,
  class: "rate"
}, we = { class: "gh-field-list" }, Ge = { class: "gh-field-item" }, He = { class: "gh-radio-bar" }, Ie = { class: "gh-field-item" }, Oe = { class: "gh-field-item" }, Pe = ["placeholder"], Ne = { class: "gh-field-item" }, Ae = { class: "gh-field-list" }, xe = { class: "gh-popover-foot" }, We = ["disabled"], Ve = /* @__PURE__ */ z({
  __name: "GitHubSettingsModal",
  props: {
    anchor: {},
    visible: { type: Boolean, default: !0 },
    aiRequest: { default: 0 }
  },
  emits: ["close", "account-reload"],
  setup(l, { emit: g }) {
    const a = l, n = g, r = k("account");
    K(() => a.aiRequest, (u) => {
      u && a.visible && (r.value = "ai");
    }, { immediate: !0 });
    const i = k(!1), c = k(!1), f = k(!1), b = k(!1), d = k(""), m = k(null), o = ee({ ghUser: "", ghToken: "", ai: { ...L }, archifyWebhookUrl: "" });
    let C, p = !1, U, N, T = 0;
    const S = k(!1);
    async function _() {
      if (p || !a.visible || b.value || S.value || f.value) return;
      const u = ++T;
      S.value = !0;
      try {
        const e = await J();
        if (p || !a.visible || u !== T) return;
        Object.assign(o, e), C = JSON.parse(JSON.stringify(e)), b.value = !0, d.value = "";
      } catch {
        !p && a.visible && u === T && (d.value = "读取设置失败，已禁止保存；请重试读取。");
      } finally {
        u === T && (S.value = !1);
      }
    }
    function E() {
      clearTimeout(N), N = void 0, U?.abort(), U = void 0, c.value = !1;
    }
    K(() => a.visible, (u) => {
      u ? _() : (++T, S.value = !1, E(), i.value = !1);
    }, { immediate: !0, flush: "sync" }), F(() => {
      p = !0, ++T, E();
    });
    async function j() {
      if (p || !a.visible || !b.value || c.value || f.value) return;
      const u = o.ghUser.trim(), e = o.ghToken.trim();
      if (!u && !e) {
        d.value = "请填写用户名或 Token。";
        return;
      }
      c.value = !0, m.value = null;
      const s = new AbortController();
      U = s;
      const R = window.setTimeout(() => s.abort(), 1e4);
      N = R;
      try {
        const { data: h, rateLimit: B } = await se(e ? "/user" : `/users/${encodeURIComponent(u)}`, {
          headers: oe(e),
          signal: s.signal,
          timeoutMs: 1e4,
          maxBytes: 131072
        });
        if (!h || typeof h.login != "string" || !h.login || h.login.length > 100 || typeof h.id != "number") throw new $("format", "GitHub 身份响应格式无效。");
        if (p || !a.visible || U !== s) return;
        s.signal.throwIfAborted(), m.value = {
          success: !0,
          message: `连接成功：@${h.login}`,
          rateLimit: { remaining: B.remaining ?? 0, limit: B.limit ?? 0 }
        }, !u && !o.ghUser.trim() && o.ghToken.trim() === e && h.login && (o.ghUser = h.login);
      } catch (h) {
        !p && a.visible && U === s && (m.value = { success: !1, message: h instanceof $ ? h.message : "连接已取消或超时，请重试。" });
      } finally {
        clearTimeout(R), U === s && (U = void 0, N = void 0, c.value = !1);
      }
    }
    async function D() {
      if (p || !a.visible || !b.value || !C || f.value || c.value) return;
      if ((o.ghUser !== C.ghUser || o.ghToken !== C.ghToken) && !o.ghUser.trim() && !o.ghToken.trim()) {
        d.value = "请至少填写用户名或 Token；本面板不执行账号解除绑定。";
        return;
      }
      f.value = !0;
      let e = !1;
      try {
        const s = await re(JSON.parse(JSON.stringify(o)), JSON.parse(JSON.stringify(C)));
        if (e = !0, p) return;
        C = JSON.parse(JSON.stringify(s.settings)), Object.assign(o, s.settings), V.aiConfig = { ...s.settings.ai }, d.value = "设置已保存。", s.accountChanged && (n("account-reload"), await V.loadGitHub(s.settings.ghUser, s.settings.ghToken), d.value = "设置已保存；仓库读取可能暂停或等待 Star 操作，请查看主页面状态，必要时点击刷新。");
      } catch (s) {
        d.value = s instanceof le ? s.message : e ? "设置已保存，但同步失败，请重试。" : "保存失败或其他页面已修改配置，请重新打开面板核对；原配置未确认更新。";
      } finally {
        f.value = !1;
      }
    }
    async function q() {
      if (!(p || !a.visible || !b.value || f.value || c.value)) {
        f.value = !0;
        try {
          const u = await J();
          if (!u.ghUser && !u.ghToken) {
            d.value = "请先保存账号设置。";
            return;
          }
          if (p || (await ue(), p)) return;
          n("account-reload"), await V.loadGitHub(u.ghUser, u.ghToken), d.value = "已提交 Star 缓存清理，分类和备注保留；仓库重读状态请查看主页面。";
        } catch {
          d.value = "清理或同步失败，请重试。";
        } finally {
          f.value = !1;
        }
      }
    }
    return (u, e) => (w(), Y(te, {
      anchor: l.anchor,
      visible: l.visible,
      label: "GitHub 模组偏好设置",
      onClose: e[15] || (e[15] = (s) => n("close"))
    }, {
      default: Q(() => [
        t("header", ge, [
          e[16] || (e[16] = t("div", { class: "gh-popover-title-wrap" }, [
            t("span", { class: "gh-popover-badge" }, "⚙️ GitHub 设置")
          ], -1)),
          t("button", {
            type: "button",
            class: "gh-popover-close-btn",
            title: "关闭",
            onClick: e[0] || (e[0] = (s) => n("close"))
          }, "✕")
        ]),
        t("nav", ce, [
          t("button", {
            type: "button",
            class: A(["gh-popover-tab", { active: r.value === "account" }]),
            onClick: e[1] || (e[1] = (s) => r.value = "account")
          }, " 账号与 Token ", 2),
          t("button", {
            type: "button",
            class: A(["gh-popover-tab", { active: r.value === "ai" }]),
            onClick: e[2] || (e[2] = (s) => r.value = "ai")
          }, " AI 研读 ", 2),
          t("button", {
            type: "button",
            class: A(["gh-popover-tab", { active: r.value === "cache" }]),
            onClick: e[3] || (e[3] = (s) => r.value = "cache")
          }, " 缓存维护 ", 2)
        ]),
        e[28] || (e[28] = t("p", { class: "gh-settings-message" }, "隐藏面板或离开卡片会保留草稿；关闭整个标签页仍会丢失。", -1)),
        b.value ? I("", !0) : (w(), H("button", {
          key: 0,
          type: "button",
          disabled: S.value || !l.visible,
          onClick: _
        }, y(S.value ? "正在读取…" : "重试读取"), 9, de)),
        d.value ? (w(), H("p", pe, y(d.value), 1)) : I("", !0),
        t("fieldset", {
          class: "gh-settings-fields",
          disabled: !b.value || f.value || c.value
        }, [
          t("main", fe, [
            v(t("section", he, [
              t("div", me, [
                e[17] || (e[17] = t("label", { class: "gh-field-label" }, [
                  t("span", null, "用户名"),
                  t("small", { class: "optional" }, "Token 可单独使用")
                ], -1)),
                v(t("input", {
                  "onUpdate:modelValue": e[4] || (e[4] = (s) => o.ghUser = s),
                  type: "text",
                  class: "gh-input",
                  placeholder: "例如：octocat",
                  autocomplete: "off"
                }, null, 512), [
                  [O, o.ghUser]
                ])
              ]),
              t("div", be, [
                e[18] || (e[18] = t("label", { class: "gh-field-label" }, [
                  t("span", null, "个人访问令牌 (Token)"),
                  t("small", { class: "optional" }, "5000次/h")
                ], -1)),
                t("div", ye, [
                  v(t("input", {
                    "onUpdate:modelValue": e[5] || (e[5] = (s) => o.ghToken = s),
                    type: i.value ? "text" : "password",
                    class: "gh-input",
                    placeholder: "ghp_... / github_pat_...",
                    autocomplete: "off"
                  }, null, 8, ke), [
                    [X, o.ghToken]
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
              t("div", Ce, [
                t("button", {
                  type: "button",
                  class: "gh-test-btn",
                  disabled: c.value,
                  onClick: j
                }, [
                  t("span", null, y(c.value ? "验证中…" : "⚡ 测试连接"), 1)
                ], 8, Te),
                m.value ? (w(), H("div", {
                  key: 0,
                  class: A(["gh-test-pill", { success: m.value.success, error: !m.value.success }])
                }, [
                  t("span", null, y(m.value.message), 1),
                  m.value.rateLimit ? (w(), H("span", Se, "(" + y(m.value.rateLimit.remaining) + "/" + y(m.value.rateLimit.limit) + ")", 1)) : I("", !0)
                ], 2)) : I("", !0)
              ])
            ], 512), [
              [x, r.value === "account"]
            ]),
            v(t("section", we, [
              t("div", Ge, [
                e[22] || (e[22] = t("label", { class: "gh-field-label" }, "模型供应商", -1)),
                t("div", He, [
                  t("label", null, [
                    v(t("input", {
                      "onUpdate:modelValue": e[7] || (e[7] = (s) => o.ai.provider = s),
                      type: "radio",
                      value: "gemini"
                    }, null, 512), [
                      [M, o.ai.provider]
                    ]),
                    e[20] || (e[20] = W(" Gemini", -1))
                  ]),
                  t("label", null, [
                    v(t("input", {
                      "onUpdate:modelValue": e[8] || (e[8] = (s) => o.ai.provider = s),
                      type: "radio",
                      value: "openai"
                    }, null, 512), [
                      [M, o.ai.provider]
                    ]),
                    e[21] || (e[21] = W(" DeepSeek/OpenAI", -1))
                  ])
                ])
              ]),
              t("div", Ie, [
                e[23] || (e[23] = t("label", { class: "gh-field-label" }, "API Key", -1)),
                v(t("input", {
                  "onUpdate:modelValue": e[9] || (e[9] = (s) => o.ai.apiKey = s),
                  type: "password",
                  class: "gh-input",
                  placeholder: "sk-... / AIzaSy...",
                  autocomplete: "off"
                }, null, 512), [
                  [O, o.ai.apiKey]
                ])
              ]),
              t("div", Oe, [
                e[24] || (e[24] = t("label", { class: "gh-field-label" }, "模型名", -1)),
                v(t("input", {
                  "onUpdate:modelValue": e[10] || (e[10] = (s) => o.ai.model = s),
                  type: "text",
                  class: "gh-input",
                  placeholder: o.ai.provider === "gemini" ? "gemini-3.6-flash" : "deepseek-chat"
                }, null, 8, Pe), [
                  [O, o.ai.model]
                ])
              ]),
              t("div", Ne, [
                e[25] || (e[25] = t("label", { class: "gh-field-label" }, "Base URL", -1)),
                v(t("input", {
                  "onUpdate:modelValue": e[11] || (e[11] = (s) => o.ai.baseUrl = s),
                  type: "text",
                  class: "gh-input",
                  placeholder: "填写与供应商匹配的 API 地址"
                }, null, 512), [
                  [O, o.ai.baseUrl]
                ])
              ]),
              t("label", null, [
                v(t("input", {
                  "onUpdate:modelValue": e[12] || (e[12] = (s) => o.ai.useCustomPrompt = s),
                  type: "checkbox"
                }, null, 512), [
                  [Z, o.ai.useCustomPrompt]
                ]),
                e[26] || (e[26] = W(" 使用自定义提示词", -1))
              ]),
              o.ai.useCustomPrompt ? v((w(), H("textarea", {
                key: 0,
                "onUpdate:modelValue": e[13] || (e[13] = (s) => o.ai.customPrompt = s),
                class: "gh-input",
                rows: "4",
                "aria-label": "自定义提示词"
              }, null, 512)), [
                [O, o.ai.customPrompt]
              ]) : I("", !0)
            ], 512), [
              [x, r.value === "ai"]
            ]),
            v(t("section", Ae, [
              e[27] || (e[27] = t("p", { class: "gh-cache-desc" }, " 若 GitHub 上刚添加了 Star 或更改了仓库信息，可就地清理缓存强制拉取最新数据。 ", -1)),
              t("button", {
                type: "button",
                class: "gh-clear-btn",
                onClick: q
              }, " 🧹 清空本地缓存并全量同步 ")
            ], 512), [
              [x, r.value === "cache"]
            ])
          ])
        ], 8, ve),
        t("footer", xe, [
          t("button", {
            type: "button",
            class: "gh-btn-cancel",
            onClick: e[14] || (e[14] = (s) => n("close"))
          }, "取消"),
          t("button", {
            type: "button",
            class: "gh-btn-save",
            disabled: !b.value || f.value || c.value,
            onClick: D
          }, y(f.value ? "保存中…" : "保存生效"), 9, We)
        ])
      ]),
      _: 1
    }, 8, ["anchor", "visible"]));
  }
}), Ke = /* @__PURE__ */ ie(Ve, [["__scopeId", "data-v-5f2ee312"]]);
export {
  Ke as default
};
