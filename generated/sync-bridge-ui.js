import { d as w, o as b, e as f, f as o, m, l as v, n as y, B, t as U, g as x, b as l, O as D } from "./chunks/vendor-vue-DokqDua_.js";
const I = { class: "card" }, C = {
  class: "step-box",
  style: { background: "rgba(99,102,241,.06)", "border-color": "rgba(99,102,241,.25)" }
}, $ = { class: "bridge-form" }, V = ["disabled"], j = ["disabled"], A = /* @__PURE__ */ w({
  __name: "SyncBridgeApp",
  setup(M) {
    const r = l(""), a = l(""), i = l(!1), u = l(""), d = l("");
    function s(e, t = "") {
      u.value = e, d.value = t;
    }
    async function p(e) {
      if (!e.ok) throw new Error(`服务返回 HTTP ${e.status}`);
      return e.json();
    }
    async function T() {
      if (!i.value) {
        i.value = !0, s("正在查询本地同步池…");
        try {
          const e = await p(await fetch("/api/sync-pull", { cache: "no-store" }));
          e && !e.empty ? s(`✓ 电脑同步池中已有配置数据！
Todoist Token: ${e.todoistToken ? "已配置" : "未配置"}
B站 UID: ${e.biliUserMid || "未配置"}
手机端现在点击「过继配置」即可继承设置。`, "success") : s("电脑同步池目前为空。若确需过继凭据，可在本页明确填写并推送；普通备份不提供 Token。", "error");
        } catch (e) {
          s(`连接服务失败：${e?.message || "未知错误"}`, "error");
        } finally {
          i.value = !1;
        }
      }
    }
    async function g() {
      if (i.value) return;
      const e = r.value.trim(), t = a.value.trim();
      if (!e && !t) {
        s("请至少输入 Todoist Token 或 B站 UID 中的一项。", "error");
        return;
      }
      i.value = !0, s("正在直推到同步池…");
      try {
        const n = {};
        e && (n.todoistToken = e), t && (n.biliUserMid = t);
        const c = await p(await fetch("/api/sync-push", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(n)
        }));
        c?.ok ? (r.value = "", s("✓ 已推送到手机同步池，请在手机上过继配置。", "success")) : s(`推送失败：${c?.error || "未知原因"}`, "error");
      } catch (n) {
        s(`推送异常：${n?.message || "未知错误"}`, "error");
      } finally {
        i.value = !1;
      }
    }
    return (e, t) => (b(), f("div", I, [
      t[6] || (t[6] = o("div", { style: { "font-size": "44px", "margin-bottom": "8px" } }, "📲 ⇄ 💻", -1)),
      t[7] || (t[7] = o("h1", null, "电脑配置过继到手机 App", -1)),
      t[8] || (t[8] = o("p", null, "这是单独的凭据过继功能，不是普通备份。点击直推会把下方手动填写的 Token / UID 明文送到本机同步池，再供手机接收；仅在你信任此服务时使用。", -1)),
      t[9] || (t[9] = o("div", { class: "step-box" }, [
        o("b", null, "普通备份不携带凭据："),
        o("br"),
        m(" 全局设置不再读取账号与 Token，Dock「同步备份」也不导出它们。"),
        o("br"),
        m(" 如确需过继，可在下方明确填写并直推，再到手机接收；这里不会自动读取模块凭据。 ")
      ], -1)),
      o("div", C, [
        t[4] || (t[4] = o("b", null, "直接填写并推送到手机", -1)),
        t[5] || (t[5] = o("br", null, null, -1)),
        o("div", $, [
          t[2] || (t[2] = o("label", { for: "direct-todoist-token" }, "Todoist API Token：", -1)),
          v(o("input", {
            id: "direct-todoist-token",
            "onUpdate:modelValue": t[0] || (t[0] = (n) => r.value = n),
            type: "password",
            autocomplete: "off",
            placeholder: "粘贴 Todoist Token"
          }, null, 512), [
            [y, r.value]
          ]),
          t[3] || (t[3] = o("label", { for: "direct-bili-mid" }, "B站用户 UID：", -1)),
          v(o("input", {
            id: "direct-bili-mid",
            "onUpdate:modelValue": t[1] || (t[1] = (n) => a.value = n),
            type: "text",
            autocomplete: "off",
            inputmode: "numeric",
            placeholder: "例如个人主页链接中的 UID"
          }, null, 512), [
            [y, a.value]
          ]),
          o("button", {
            class: "btn",
            type: "button",
            disabled: i.value,
            onClick: g
          }, "🚀 立即直推到手机端", 8, V)
        ])
      ]),
      o("button", {
        class: "btn secondary",
        type: "button",
        disabled: i.value,
        onClick: T
      }, "🔍 检查当前电脑同步池状态", 8, j),
      u.value ? (b(), f("div", {
        key: 0,
        class: B(["status", d.value]),
        role: "status",
        "aria-live": "polite"
      }, U(u.value), 3)) : x("", !0)
    ]));
  }
}), k = document.getElementById("vue-sync-bridge-root");
k && D(A).mount(k);
