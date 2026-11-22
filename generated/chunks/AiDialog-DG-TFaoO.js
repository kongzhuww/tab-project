import { d as I, f as s, g as d, h as t, B as K, u as i, t as u, m as r, F as m, i as h, q as b, p as V, v as D } from "./vendor-vue-C-_ocEUS.js";
import { e as n } from "./main-Bo0A62Do.js";
import { o as G } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { C as P } from "./CustomSelect-DWkYhvBA.js";
const E = ["open"], B = { class: "lw-ai-account" }, F = {
  id: "lw-ai-status",
  class: "lw-ai-status",
  role: "status"
}, N = ["hidden"], O = { id: "lw-ai-code" }, $ = ["href"], z = {
  id: "lw-ai-log",
  class: "lw-ai-log",
  role: "log",
  "aria-label": "AI 对话",
  "aria-live": "off"
}, H = { class: "lw-ai-msg-content" }, L = { class: "lw-ai-compose" }, U = ["hidden"], q = { class: "lw-ai-kw-head" }, M = { class: "lw-ai-kw-tools" }, j = {
  id: "lw-ai-kw-tags",
  class: "lw-ai-kw-tags",
  role: "group",
  "aria-label": "知识点词汇列表"
}, J = ["checked", "onChange"], Q = { id: "lw-ai-count" }, R = ["disabled"], lt = /* @__PURE__ */ I({
  __name: "AiDialog",
  setup(W) {
    const l = n.state, f = [
      { value: "gemini-3.6-flash", label: "Gemini 3.6 Flash (Google · 百万上下文 · 免费极速)", icon: "✦" }
    ];
    function k() {
      n.close();
    }
    function y() {
      n.dispatch("connect");
    }
    function C() {
      n.newChat();
    }
    function g() {
      n.extractKeywords();
    }
    function v() {
      n.addSummaryPrompt();
    }
    function x() {
      n.copyChat();
    }
    function w(a) {
      n.selectAllKeywords(a);
    }
    function _(a) {
      n.toggleKeyword(a);
    }
    function A() {
      n.deepDiveKeywords();
    }
    function T() {
      n.stop();
    }
    function c() {
      n.send();
    }
    function S(a) {
      G(a, c);
    }
    return (a, e) => (s(), d("dialog", {
      id: "lw-ai-dialog",
      class: "lw-ai-dialog",
      "aria-labelledby": "lw-ai-title",
      open: i(l).isOpen || void 0
    }, [
      t("header", { class: "lw-ai-head" }, [
        e[4] || (e[4] = t("h2", { id: "lw-ai-title" }, "✦ AI 助手", -1)),
        e[5] || (e[5] = t("small", null, "Gemini 3.6 Flash · ChatGPT / 本机 Codex", -1)),
        t("button", {
          id: "lw-ai-close",
          type: "button",
          title: "关闭并停止 AI 进程",
          "aria-label": "关闭并停止 AI",
          onClick: k
        }, " × ")
      ]),
      t("div", B, [
        K(P, {
          id: "lw-ai-model",
          modelValue: i(l).model,
          "onUpdate:modelValue": e[0] || (e[0] = (o) => i(l).model = o),
          options: f,
          size: "sm",
          style: { "max-width": "380px" }
        }, null, 8, ["modelValue"]),
        t("button", {
          id: "lw-ai-connect",
          type: "button",
          onClick: y
        }, "连接 ChatGPT / Codex")
      ]),
      t("p", F, u(i(l).statusText), 1),
      t("div", {
        id: "lw-ai-auth",
        class: "lw-ai-auth",
        hidden: i(l).authHidden
      }, [
        e[6] || (e[6] = r(" 设备码：", -1)),
        t("code", O, u(i(l).authCode), 1),
        t("a", {
          id: "lw-ai-auth-link",
          href: i(l).authLink,
          target: "_blank",
          rel: "noopener noreferrer"
        }, "打开官方授权页 ↗", 8, $),
        e[7] || (e[7] = t("br", null, null, -1)),
        e[8] || (e[8] = t("small", null, "请你本人登录并输入设备码；如提示不允许设备登录，请先在 ChatGPT 安全设置中开启。设备码不要分享给他人。", -1))
      ], 8, N),
      t("div", z, [
        (s(!0), d(m, null, h(i(l).messages, (o) => (s(), d("div", {
          key: o.id,
          class: b(["lw-ai-msg", `lw-ai-msg-${o.role}`])
        }, [
          t("div", H, u(o.content), 1)
        ], 2))), 128))
      ]),
      t("div", L, [
        t("div", { class: "lw-ai-actions" }, [
          t("button", {
            id: "lw-ai-new",
            type: "button",
            onClick: C
          }, "新对话"),
          t("button", {
            id: "lw-ai-extract-kw",
            type: "button",
            title: "分析文章知识点关键词与通篇大意",
            onClick: g
          }, " ① 提炼大意与关键词 "),
          t("button", {
            id: "lw-ai-summary",
            type: "button",
            onClick: v
          }, "添加分析提示词"),
          e[9] || (e[9] = t("label", { class: "lw-ai-file" }, [
            r(" 导入文本 "),
            t("input", {
              id: "lw-ai-file",
              type: "file",
              accept: ".txt,.srt,.vtt,.md",
              "aria-label": "导入文本或字幕"
            })
          ], -1)),
          t("button", {
            id: "lw-ai-copy",
            type: "button",
            onClick: x
          }, "复制对话")
        ]),
        t("section", {
          id: "lw-ai-kw-shelf",
          class: "lw-ai-kw-shelf",
          hidden: i(l).kwShelfHidden,
          "aria-label": "核心知识点词汇"
        }, [
          t("header", q, [
            e[10] || (e[10] = t("span", null, [
              r("🏷 "),
              t("b", null, "核心知识点词汇"),
              r("（勾选需要深度解析的词汇）：")
            ], -1)),
            t("div", M, [
              t("button", {
                id: "lw-ai-kw-all",
                type: "button",
                onClick: e[1] || (e[1] = (o) => w(!0))
              }, "全选"),
              t("button", {
                id: "lw-ai-kw-none",
                type: "button",
                onClick: e[2] || (e[2] = (o) => w(!1))
              }, "清空")
            ])
          ]),
          t("div", j, [
            (s(!0), d(m, null, h(i(l).keywords, (o, p) => (s(), d("label", {
              key: p,
              class: b(["lw-ai-kw-tag", { active: o.selected }])
            }, [
              t("input", {
                type: "checkbox",
                checked: o.selected,
                onChange: (X) => _(p)
              }, null, 40, J),
              t("span", null, u(o.text), 1)
            ], 2))), 128))
          ]),
          t("footer", { class: "lw-ai-kw-foot" }, [
            t("button", {
              id: "lw-ai-kw-deep-dive",
              type: "button",
              class: "primary lw-ai-btn-deep",
              onClick: A
            }, " ② 深度解析所选词汇 ✦ ")
          ])
        ], 8, U),
        V(t("textarea", {
          id: "lw-ai-input",
          "aria-label": "发送给 AI 的文本",
          placeholder: "粘贴字幕或输入问题… Enter 发送，Shift+Enter 换行；内容仅在点击发送后上传给 OpenAI。",
          spellcheck: "false",
          "onUpdate:modelValue": e[3] || (e[3] = (o) => i(l).inputText = o),
          onKeydown: S
        }, null, 544), [
          [D, i(l).inputText]
        ]),
        t("footer", null, [
          t("span", Q, u(i(l).charCountText), 1),
          t("button", {
            id: "lw-ai-stop",
            type: "button",
            onClick: T
          }, "停止 / 断开"),
          t("button", {
            id: "lw-ai-send",
            class: "primary",
            type: "button",
            disabled: !i(l).inputText.trim() || i(l).isStreaming,
            onClick: c
          }, " 发送 ↵ ", 8, R)
        ]),
        e[11] || (e[11] = t("p", { class: "lw-ai-privacy" }, " 使用 ChatGPT/Codex 订阅额度，不会自动切换付费 API。凭据由本机 Codex 保管；不发送到 VPS。对话不写入插件存储，刷新会丢失；OpenAI 端遵循账号的数据设置。停止会重置模型上下文，需重新连接并新建对话。 ", -1))
      ])
    ], 8, E));
  }
});
export {
  lt as default
};
