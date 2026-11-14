import { d as E, B as T, o, e as u, i as e, F as g, l as A, n as U, R as N, g as D, t as m, f as $, A as h, b as r, m as M, j, k as q, h as V } from "./vendor-vue-BkY5-p5y.js";
import { l as I, f as H, s as x, c as L } from "./MulticaDialog-B8YIPz1e.js";
import { m as S } from "./multica.service-C7XZpV6O.js";
import { _ as z } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const R = { class: "multica-settings" }, G = {
  key: 0,
  role: "status"
}, J = ["disabled"], O = ["value"], Q = ["disabled"], W = { class: "actions" }, X = ["disabled"], Y = ["disabled"], Z = { key: 0 }, ee = { key: 1 }, le = {
  key: 3,
  role: "status",
  class: "note"
}, te = /* @__PURE__ */ E({
  __name: "MulticaSettings",
  emits: ["connectionChanged", "busyChanged"],
  setup(P, { emit: K }) {
    const C = K, b = r(!0), c = r(""), p = r([]), i = r(""), f = r([]), y = r([]), t = r(!1), d = r(!1), k = r("");
    async function w(_, s = !1) {
      if (!d.value) {
        d.value = !0, s && C("busyChanged", !0), k.value = "";
        try {
          await _();
        } catch (n) {
          k.value = n instanceof Error ? n.message : "操作失败";
        } finally {
          d.value = !1, s && C("busyChanged", !1);
        }
      }
    }
    async function B() {
      await w(async () => {
        p.value = await S.workspaces(c.value), i.value = p.value[0]?.id || "", i.value || (k.value = "该账号没有可用工作区");
      });
    }
    async function v() {
      const _ = await S.info();
      i.value = _.workspaceId, f.value = _.runtimes, y.value = _.agents.filter((s) => !s.archived_at), t.value = !0;
    }
    async function l() {
      await w(async () => {
        await S.connect(c.value, i.value), c.value = "", p.value = [], t.value = !0, C("connectionChanged"), C("busyChanged", !1), await v(), k.value = "已连接 Multica";
      }, !0);
    }
    async function a() {
      await w(async () => {
        await S.disconnect(), t.value = !1, f.value = [], y.value = [], i.value = "", c.value = "", C("connectionChanged"), k.value = "已断开；如需吊销令牌，请在 Multica 设置中操作。";
      }, !0);
    }
    return T(() => {
      w(async () => {
        await S.isConnected() && (t.value = !0, await v());
      }).finally(() => {
        b.value = !1;
      });
    }), (_, s) => (o(), u("div", R, [
      s[8] || (s[8] = e("p", null, "连接 Multica 云端后，可以查看运行时，并将 AI Hot 文章派给智能体。", -1)),
      s[9] || (s[9] = e("p", { class: "note" }, "个人访问令牌拥有账号权限。连接后保存在本机扩展存储中，重启后可继续使用；请勿分享给他人。旧会话会尝试迁移，如仍需登录请重新连接一次。", -1)),
      b.value ? (o(), u("p", G, "正在读取连接状态…")) : t.value ? (o(), u(g, { key: 2 }, [
        e("div", W, [
          s[5] || (s[5] = e("strong", null, "● 已连接", -1)),
          e("button", {
            type: "button",
            disabled: d.value,
            onClick: s[2] || (s[2] = (n) => w(v))
          }, "刷新", 8, X),
          e("button", {
            type: "button",
            disabled: d.value,
            onClick: a
          }, "断开", 8, Y)
        ]),
        s[6] || (s[6] = e("h3", null, "运行时", -1)),
        f.value.length ? $("", !0) : (o(), u("p", Z, "没有可显示的运行时。")),
        (o(!0), u(g, null, D(f.value, (n) => (o(), u("div", {
          key: n.id,
          class: "row"
        }, [
          e("span", null, [
            e("strong", null, m(n.name), 1),
            e("small", null, m(n.provider || n.device_info), 1)
          ]),
          e("span", {
            class: h(n.status === "online" ? "online" : "offline")
          }, m(n.status === "online" ? "在线" : "离线"), 3)
        ]))), 128)),
        s[7] || (s[7] = e("h3", null, "智能体", -1)),
        y.value.length ? $("", !0) : (o(), u("p", ee, "没有可用的智能体。")),
        (o(!0), u(g, null, D(y.value, (n) => (o(), u("div", {
          key: n.id,
          class: "row"
        }, [
          e("span", null, [
            e("strong", null, m(n.name), 1),
            e("small", null, m(n.model || "默认模型"), 1)
          ]),
          e("span", null, m(f.value.find((F) => F.id === n.runtime_id)?.name || "未绑定运行时"), 1)
        ]))), 128))
      ], 64)) : (o(), u(g, { key: 1 }, [
        s[4] || (s[4] = e("label", { for: "multica-token" }, "Multica 个人访问令牌", -1)),
        A(e("input", {
          id: "multica-token",
          "onUpdate:modelValue": s[0] || (s[0] = (n) => c.value = n),
          type: "password",
          autocomplete: "off",
          placeholder: "在 Multica 设置 → API Token 创建"
        }, null, 512), [
          [U, c.value]
        ]),
        e("button", {
          type: "button",
          disabled: d.value || !c.value.trim(),
          onClick: B
        }, "读取工作区", 8, J),
        p.value.length ? (o(), u(g, { key: 0 }, [
          s[3] || (s[3] = e("label", { for: "multica-workspace" }, "选择工作区", -1)),
          A(e("select", {
            id: "multica-workspace",
            "onUpdate:modelValue": s[1] || (s[1] = (n) => i.value = n)
          }, [
            (o(!0), u(g, null, D(p.value, (n) => (o(), u("option", {
              key: n.id,
              value: n.id
            }, m(n.name || n.slug || n.id), 9, O))), 128))
          ], 512), [
            [N, i.value]
          ]),
          e("button", {
            type: "button",
            disabled: d.value || !i.value,
            onClick: l
          }, "连接", 8, Q)
        ], 64)) : $("", !0)
      ], 64)),
      k.value ? (o(), u("p", le, m(k.value), 1)) : $("", !0)
    ]));
  }
}), ae = /* @__PURE__ */ z(te, [["__scopeId", "data-v-8f42a0dc"]]), se = {
  class: "settings-dialog",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "ai-settings-title"
}, ne = { class: "nav" }, oe = ["disabled"], ue = ["disabled"], ie = { id: "ai-settings-title" }, de = ["disabled"], ve = { class: "form-card" }, re = ["disabled", "placeholder"], ce = { class: "model-row" }, pe = ["disabled"], fe = {
  key: 0,
  value: ""
}, ye = ["value"], me = ["disabled"], be = { class: "actions" }, ke = ["disabled"], ge = ["disabled"], Ce = {
  key: 0,
  class: "note",
  role: "status"
}, we = /* @__PURE__ */ E({
  __name: "AiSettings",
  props: {
    initialTab: {}
  },
  emits: ["close", "connectionChanged", "configChanged", "busyChanged"],
  setup(P, { emit: K }) {
    const C = P, b = K, c = r(C.initialTab), p = r(""), i = r(""), f = r([]), y = r(!1), t = r(!1), d = r("");
    T(async () => {
      try {
        const v = await I();
        y.value = !!v.key, i.value = v.model, f.value = v.models, v.key && k();
      } catch {
        d.value = "读取本机设置失败。";
      }
    });
    async function k() {
      if (!t.value) {
        t.value = !0, d.value = "";
        try {
          const v = await I(), l = p.value.trim() || v.key, a = await H(l);
          f.value = a, a.includes(i.value) || (i.value = a[0]), !p.value.trim() && l === (await I()).key && (await x(l, i.value, a), b("configChanged")), d.value = `已获取 ${a.length} 个模型。`;
        } catch (v) {
          d.value = v instanceof Error ? v.message : "获取模型失败";
        } finally {
          t.value = !1;
        }
      }
    }
    async function w() {
      if (!t.value) {
        t.value = !0, d.value = "";
        try {
          const v = await I();
          if (!f.value.includes(i.value)) throw new Error("请先获取模型并选择一个可用模型。");
          await x(p.value || v.key, i.value, f.value), p.value = "", y.value = !0, d.value = "设置已保存在本机。", b("configChanged");
        } catch (v) {
          d.value = v instanceof Error ? v.message : "保存失败";
        } finally {
          t.value = !1;
        }
      }
    }
    async function B() {
      if (!t.value) {
        t.value = !0;
        try {
          await L(), p.value = "", y.value = !1, d.value = "已从本机移除 Key，不会删除聊天记录；如需吊销请前往 DeepSeek。", b("configChanged");
        } catch {
          d.value = "移除失败，请重试。";
        } finally {
          t.value = !1;
        }
      }
    }
    return (v, l) => (o(), u("div", {
      class: "settings-overlay",
      onClick: l[8] || (l[8] = V((a) => !t.value && b("close"), ["self"])),
      onKeydown: l[9] || (l[9] = q(V((a) => !t.value && b("close"), ["stop"]), ["esc"]))
    }, [
      e("section", se, [
        e("aside", ne, [
          l[12] || (l[12] = e("div", { class: "nav-heading" }, [
            e("span", null, "✦"),
            e("div", null, [
              e("strong", null, "AI 工作台"),
              e("small", null, "服务与连接设置")
            ])
          ], -1)),
          l[13] || (l[13] = e("p", null, "服务提供商", -1)),
          e("button", {
            type: "button",
            disabled: t.value,
            class: h({ selected: c.value === "deepseek" }),
            onClick: l[0] || (l[0] = (a) => c.value = "deepseek")
          }, [...l[10] || (l[10] = [
            e("span", { class: "provider-icon" }, "D", -1),
            M(" DeepSeek ", -1),
            e("i", null, "API", -1)
          ])], 10, oe),
          e("button", {
            type: "button",
            disabled: t.value,
            class: h({ selected: c.value === "multica" }),
            onClick: l[1] || (l[1] = (a) => c.value = "multica")
          }, [...l[11] || (l[11] = [
            e("span", { class: "provider-icon multica" }, "✦", -1),
            M(" Multica ", -1),
            e("i", null, "工作区", -1)
          ])], 10, ue),
          l[14] || (l[14] = e("small", { class: "nav-foot" }, "后续将支持更多厂商", -1))
        ]),
        e("main", null, [
          e("header", null, [
            e("div", null, [
              e("small", null, "服务设置 / " + m(c.value === "deepseek" ? "DeepSeek" : "Multica"), 1),
              e("h2", ie, m(c.value === "deepseek" ? "DeepSeek API" : "Multica 连接"), 1)
            ]),
            e("button", {
              class: "close",
              type: "button",
              disabled: t.value,
              "aria-label": "关闭设置",
              onClick: l[2] || (l[2] = (a) => b("close"))
            }, "✕", 8, de)
          ]),
          c.value === "deepseek" ? (o(), u(g, { key: 0 }, [
            l[20] || (l[20] = e("p", { class: "intro" }, "使用自己的 API Key 直接连接 DeepSeek。对话独立于 Multica，不具备文件或命令操作能力。", -1)),
            e("div", {
              class: h(["status", { ready: y.value }])
            }, [
              l[15] || (l[15] = e("span", null, null, -1)),
              M(m(y.value ? "已在本机保存 Key" : "尚未配置 Key"), 1)
            ], 2),
            e("section", ve, [
              l[16] || (l[16] = e("label", { for: "byok-key" }, "API Key", -1)),
              A(e("input", {
                id: "byok-key",
                "onUpdate:modelValue": l[3] || (l[3] = (a) => p.value = a),
                type: "password",
                autocomplete: "off",
                disabled: t.value,
                placeholder: y.value ? "已保存；留空保留现有 Key" : "输入 DeepSeek API Key",
                onInput: l[4] || (l[4] = (a) => {
                  f.value = [], i.value = "";
                })
              }, null, 40, re), [
                [U, p.value]
              ]),
              l[17] || (l[17] = e("p", null, "Key 仅保存在此浏览器扩展的本地存储，不进入普通同步备份；它并非硬件安全存储，请像密码一样保护。", -1)),
              l[18] || (l[18] = e("label", { for: "byok-model" }, "默认模型", -1)),
              e("div", ce, [
                A(e("select", {
                  id: "byok-model",
                  "onUpdate:modelValue": l[5] || (l[5] = (a) => i.value = a),
                  disabled: t.value || !f.value.length
                }, [
                  f.value.length ? $("", !0) : (o(), u("option", fe, "请先获取模型列表")),
                  (o(!0), u(g, null, D(f.value, (a) => (o(), u("option", {
                    key: a,
                    value: a
                  }, m(a), 9, ye))), 128))
                ], 8, pe), [
                  [N, i.value]
                ]),
                e("button", {
                  type: "button",
                  disabled: t.value || !y.value && !p.value.trim(),
                  onClick: k
                }, m(t.value ? "获取中…" : "获取模型"), 9, me)
              ]),
              l[19] || (l[19] = e("p", null, "从 DeepSeek 官方接口获取；不支持的模型可刷新列表。", -1)),
              e("div", be, [
                e("button", {
                  class: "primary",
                  type: "button",
                  disabled: t.value || !y.value && !p.value.trim() || !f.value.includes(i.value),
                  onClick: w
                }, "保存设置", 8, ke),
                y.value ? (o(), u("button", {
                  key: 0,
                  type: "button",
                  disabled: t.value,
                  onClick: B
                }, "移除本机 Key", 8, ge)) : $("", !0)
              ])
            ]),
            l[21] || (l[21] = e("div", { class: "info" }, [
              M("发送消息将由 DeepSeek 按 API 价格计费。对话内容会发送给 DeepSeek；聊天记录仅保存在本机。"),
              e("a", {
                href: "https://api-docs.deepseek.com/quick_start/pricing",
                target: "_blank",
                rel: "noreferrer"
              }, "查看官方价格 ↗")
            ], -1)),
            d.value ? (o(), u("p", Ce, m(d.value), 1)) : $("", !0)
          ], 64)) : (o(), j(ae, {
            key: 1,
            onConnectionChanged: l[6] || (l[6] = (a) => b("connectionChanged")),
            onBusyChanged: l[7] || (l[7] = (a) => {
              t.value = a, b("busyChanged", a);
            })
          }))
        ])
      ])
    ], 32));
  }
}), Ie = /* @__PURE__ */ z(we, [["__scopeId", "data-v-ff4d632d"]]);
export {
  Ie as default
};
