import { f as S, g as o, h as s, i as t, q as p, y as I, x as i, t as d, j as u, F as h, z as b, s as f, v as D } from "./vendor-vue-BUkfvXUI.js";
import { e as n } from "./main-CweYdEkj.js";
const G = ["open"], K = { class: "lw-ai-account" }, P = {
  id: "lw-ai-status",
  class: "lw-ai-status",
  role: "status"
}, V = ["hidden"], E = { id: "lw-ai-code" }, F = ["href"], $ = {
  id: "lw-ai-log",
  class: "lw-ai-log",
  role: "log",
  "aria-label": "AI 对话",
  "aria-live": "off"
}, B = { class: "lw-ai-msg-content" }, N = { class: "lw-ai-compose" }, O = ["hidden"], z = { class: "lw-ai-kw-head" }, H = { class: "lw-ai-kw-tools" }, L = {
  id: "lw-ai-kw-tags",
  class: "lw-ai-kw-tags",
  role: "group",
  "aria-label": "知识点词汇列表"
}, M = ["checked", "onChange"], U = { id: "lw-ai-count" }, j = ["disabled"], W = /* @__PURE__ */ S({
  __name: "AiDialog",
  setup(q) {
    const l = n.state;
    function m() {
      n.close();
    }
    function k() {
      n.dispatch("connect");
    }
    function y() {
      n.newChat();
    }
    function C() {
      n.extractKeywords();
    }
    function g() {
      n.addSummaryPrompt();
    }
    function v() {
      n.copyChat();
    }
    function w(r) {
      n.selectAllKeywords(r);
    }
    function x(r) {
      n.toggleKeyword(r);
    }
    function _() {
      n.deepDiveKeywords();
    }
    function A() {
      n.stop();
    }
    function T() {
      n.send();
    }
    return (r, e) => (o(), s("dialog", {
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
          onClick: m
        }, " × ")
      ]),
      t("div", K, [
        p(t("select", {
          id: "lw-ai-model",
          "aria-label": "AI 模型",
          "onUpdate:modelValue": e[0] || (e[0] = (a) => i(l).model = a)
        }, [...e[6] || (e[6] = [
          t("option", {
            value: "gemini-3.6-flash",
            selected: ""
          }, "✦ Gemini 3.6 Flash (Google · 百万上下文 · 免费极速)", -1)
        ])], 512), [
          [I, i(l).model]
        ]),
        t("button", {
          id: "lw-ai-connect",
          type: "button",
          onClick: k
        }, "连接 ChatGPT / Codex")
      ]),
      t("p", P, d(i(l).statusText), 1),
      t("div", {
        id: "lw-ai-auth",
        class: "lw-ai-auth",
        hidden: i(l).authHidden
      }, [
        e[7] || (e[7] = u(" 设备码：", -1)),
        t("code", E, d(i(l).authCode), 1),
        t("a", {
          id: "lw-ai-auth-link",
          href: i(l).authLink,
          target: "_blank",
          rel: "noopener noreferrer"
        }, "打开官方授权页 ↗", 8, F),
        e[8] || (e[8] = t("br", null, null, -1)),
        e[9] || (e[9] = t("small", null, "请你本人登录并输入设备码；如提示不允许设备登录，请先在 ChatGPT 安全设置中开启。设备码不要分享给他人。", -1))
      ], 8, V),
      t("div", $, [
        (o(!0), s(h, null, b(i(l).messages, (a) => (o(), s("div", {
          key: a.id,
          class: f(["lw-ai-msg", `lw-ai-msg-${a.role}`])
        }, [
          t("div", B, d(a.content), 1)
        ], 2))), 128))
      ]),
      t("div", N, [
        t("div", { class: "lw-ai-actions" }, [
          t("button", {
            id: "lw-ai-new",
            type: "button",
            onClick: y
          }, "新对话"),
          t("button", {
            id: "lw-ai-extract-kw",
            type: "button",
            title: "分析文章知识点关键词与通篇大意",
            onClick: C
          }, " ① 提炼大意与关键词 "),
          t("button", {
            id: "lw-ai-summary",
            type: "button",
            onClick: g
          }, "添加分析提示词"),
          e[10] || (e[10] = t("label", { class: "lw-ai-file" }, [
            u(" 导入文本 "),
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
            onClick: v
          }, "复制对话")
        ]),
        t("section", {
          id: "lw-ai-kw-shelf",
          class: "lw-ai-kw-shelf",
          hidden: i(l).kwShelfHidden,
          "aria-label": "核心知识点词汇"
        }, [
          t("header", z, [
            e[11] || (e[11] = t("span", null, [
              u("🏷 "),
              t("b", null, "核心知识点词汇"),
              u("（勾选需要深度解析的词汇）：")
            ], -1)),
            t("div", H, [
              t("button", {
                id: "lw-ai-kw-all",
                type: "button",
                onClick: e[1] || (e[1] = (a) => w(!0))
              }, "全选"),
              t("button", {
                id: "lw-ai-kw-none",
                type: "button",
                onClick: e[2] || (e[2] = (a) => w(!1))
              }, "清空")
            ])
          ]),
          t("div", L, [
            (o(!0), s(h, null, b(i(l).keywords, (a, c) => (o(), s("label", {
              key: c,
              class: f(["lw-ai-kw-tag", { active: a.selected }])
            }, [
              t("input", {
                type: "checkbox",
                checked: a.selected,
                onChange: (J) => x(c)
              }, null, 40, M),
              t("span", null, d(a.text), 1)
            ], 2))), 128))
          ]),
          t("footer", { class: "lw-ai-kw-foot" }, [
            t("button", {
              id: "lw-ai-kw-deep-dive",
              type: "button",
              class: "primary lw-ai-btn-deep",
              onClick: _
            }, " ② 深度解析所选词汇 ✦ ")
          ])
        ], 8, O),
        p(t("textarea", {
          id: "lw-ai-input",
          "aria-label": "发送给 AI 的文本",
          placeholder: "粘贴字幕或输入问题… Enter 发送，Shift+Enter 换行；内容仅在点击发送后上传给 OpenAI。",
          spellcheck: "false",
          "onUpdate:modelValue": e[3] || (e[3] = (a) => i(l).inputText = a)
        }, null, 512), [
          [D, i(l).inputText]
        ]),
        t("footer", null, [
          t("span", U, d(i(l).charCountText), 1),
          t("button", {
            id: "lw-ai-stop",
            type: "button",
            onClick: A
          }, "停止 / 断开"),
          t("button", {
            id: "lw-ai-send",
            class: "primary",
            type: "button",
            disabled: !i(l).inputText.trim() || i(l).isStreaming,
            onClick: T
          }, " 发送 ↵ ", 8, j)
        ]),
        e[12] || (e[12] = t("p", { class: "lw-ai-privacy" }, " 使用 ChatGPT/Codex 订阅额度，不会自动切换付费 API。凭据由本机 Codex 保管；不发送到 VPS。对话不写入插件存储，刷新会丢失；OpenAI 端遵循账号的数据设置。停止会重置模型上下文，需重新连接并新建对话。 ", -1))
      ])
    ], 8, G));
  }
});
export {
  W as default
};
