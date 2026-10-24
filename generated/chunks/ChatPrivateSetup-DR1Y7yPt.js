import { f as Q, b as i, w as S, g as o, h as n, i as s, t as r, x as a, u as v, s as F, m as C, j as g, q as A, v as U, F as R, z as O } from "./vendor-vue-BUkfvXUI.js";
import { Q as c, z as d, E as P, W as B, X as q, Y as H, Z as J, _ as W } from "./search.service-CJV_B19X.js";
import { _ as X } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const Y = { class: "private-setup" }, Z = { class: "setup-heading-bar" }, G = { class: "heading-title-group" }, K = { class: "heading-title" }, ss = {
  key: 0,
  class: "heading-room-name"
}, ts = { class: "status-text" }, as = {
  key: 0,
  class: "hint-welcome-tip"
}, es = { class: "setup-accordion-item" }, os = { class: "accordion-body" }, ns = { class: "uid-display-row" }, ls = {
  class: "uid-code",
  title: "点击即可全选复制"
}, is = ["open"], rs = { class: "accordion-summary" }, ds = { class: "summary-left" }, us = { class: "summary-text-wrap" }, vs = { class: "summary-title" }, cs = { class: "accordion-body" }, ms = { class: "invite-input-group" }, ps = { class: "input-label-row" }, bs = { class: "action-row" }, ys = ["disabled"], gs = {
  key: 0,
  class: "invite-preview-card"
}, fs = { class: "preview-text" }, ws = {
  key: 0,
  class: "switch-warning-tip"
}, _s = ["disabled"], ks = {
  key: 1,
  class: "setup-accordion-item"
}, Is = { class: "accordion-body" }, Ds = { class: "form-field" }, xs = { class: "action-row" }, Cs = ["disabled"], Ps = ["disabled"], hs = ["disabled"], Es = {
  key: 0,
  class: "empty-members-tip"
}, Vs = {
  key: 1,
  class: "members-manager-list"
}, Ts = { class: "member-manage-info" }, $s = { class: "member-manage-name" }, Ss = { class: "member-manage-uid" }, As = { class: "member-manage-actions" }, Us = ["disabled", "onClick"], Rs = ["disabled"], Bs = { class: "setup-accordion-item" }, Ls = { class: "accordion-body" }, Ms = { class: "setup-steps-modern" }, Ns = { class: "step-content" }, js = {
  key: 2,
  class: "setup-notice-banner",
  role: "status"
}, zs = /* @__PURE__ */ Q({
  __name: "ChatPrivateSetup",
  setup(Qs) {
    const p = i(""), b = i(""), u = i(""), m = i(!1), I = i(""), D = i(""), y = i(""), f = i([]), h = i(!1), w = i(!1), x = i(!c.room), L = i(!1);
    async function E() {
      try {
        await navigator.clipboard.writeText(d.currentUser.uid), w.value = !0, setTimeout(() => {
          w.value = !1;
        }, 2e3);
      } catch {
        u.value = "复制失败，请展开聊天 ID 后手动复制。";
      }
    }
    let _ = 0;
    S(() => JSON.stringify(c.room), () => {
      _++, p.value = b.value = D.value = y.value = "", f.value = [], h.value = !1, L.value = !1, x.value = !c.room;
    }), S(p, () => {
      b.value = "";
    });
    async function k(l) {
      if (!m.value) {
        m.value = !0, u.value = "";
        try {
          await l();
        } catch {
          u.value = "操作未确认，请检查连接。生成邀请超时后，先刷新成员列表，不要重复生成。";
        } finally {
          m.value = !1;
        }
      }
    }
    function T() {
      b.value = "", u.value = "";
      try {
        const l = B(p.value.trim());
        if (l.uid !== d.currentUser.uid) {
          u.value = `这份邀请不属于你：邀请绑定 ID 为 ${l.uid}，你的聊天 ID 为 ${d.currentUser.uid}。请让服主为你重新生成；服主本人请使用自己的服主邀请。`;
          return;
        }
        b.value = `${new URL(l.origin).host} · 房间 ${l.room}。邀请与你的聊天 ID 完全匹配，请确认信任这台服务器。`;
      } catch {
        u.value = "邀请不完整或格式不正确，请复制以 BEAVER-PRIVATE1: 开头的整段内容。";
      }
    }
    async function M() {
      if (B(p.value.trim()).uid !== d.currentUser.uid) {
        T();
        return;
      }
      await q(p.value.trim()), p.value = b.value = "", x.value = !1, u.value = "邀请已保存，正在尝试连接。连接结果以上方状态为准。";
    }
    async function V() {
      const l = _, t = await H();
      l === _ && Array.isArray(t) && (f.value = t, h.value = !0);
    }
    async function N() {
      const l = _, t = await J(I.value.trim(), "海狸群友");
      l === _ && (D.value = t, u.value = "专属邀请已生成，有效期 30 天。请复制并私发给这位朋友。", await V());
    }
    async function j() {
      await navigator.clipboard.writeText(D.value), u.value = "邀请已复制到剪贴板，请私发给对应朋友，切勿公开。";
    }
    async function z() {
      await W(y.value), y.value = "", await V();
    }
    return (l, t) => (o(), n("section", Y, [
      s("div", Z, [
        s("div", G, [
          t[9] || (t[9] = s("span", { class: "heading-icon" }, "📡", -1)),
          s("div", null, [
            s("strong", K, r(a(c).room ? "当前私有聊天室" : "开始加入聊天室"), 1),
            a(c).room ? (o(), n("small", ss, r(a(c).room.room ? `房间：${a(c).room.room}` : "未连接房间"), 1)) : v("", !0)
          ])
        ]),
        s("div", {
          class: F(["setup-status-badge", {
            "is-owner": a(d).connected && a(P).role === "owner",
            "is-connected": a(d).connected && a(P).role !== "owner",
            "is-connecting": a(d).connecting,
            "is-disconnected": !a(d).connected && !a(d).connecting
          }])
        }, [
          t[10] || (t[10] = s("span", { class: "status-dot" }, null, -1)),
          s("span", ts, r(a(d).connected ? a(P).role === "owner" ? "已连接 · 👑 服主" : "已连接 · 💬 成员" : a(d).connecting ? "正在连接…" : a(c).room ? "尚未连接" : "尚未加入"), 1)
        ], 2)
      ]),
      a(c).room ? v("", !0) : (o(), n("p", as, " 💡 有朋友发给你的专属邀请，可展开下方“加入朋友的聊天室”进行绑定；若想自建开服，可查阅“自建服务说明”。 ")),
      s("details", es, [
        t[13] || (t[13] = C('<summary class="accordion-summary" data-v-28b22a82><div class="summary-left" data-v-28b22a82><span class="accordion-icon" data-v-28b22a82>🆔</span><div class="summary-text-wrap" data-v-28b22a82><strong class="summary-title" data-v-28b22a82>我的聊天 ID</strong><small class="summary-sub" data-v-28b22a82>让服主知道邀请谁 · 本机唯一身份码</small></div></div><span class="chevron-arrow" data-v-28b22a82>›</span></summary>', 1)),
        s("div", os, [
          t[11] || (t[11] = s("p", { class: "body-tip" }, "这是当前浏览器的聊天 ID，用于服主生成绑定你的专属邀请。ID 本身不是密码或访问凭据，邀请中才包含授权 Token。", -1)),
          s("div", ns, [
            s("code", ls, r(a(d).currentUser.uid), 1),
            s("button", {
              type: "button",
              class: "btn-copy-uid",
              onClick: E
            }, r(w.value ? "✅ 已复制" : "📋 复制我的 ID"), 1)
          ]),
          t[12] || (t[12] = s("small", { class: "field-footnote" }, "💡 换浏览器或重置数据可能产生新 ID；ID 改变后，请让服主为新 ID 生成邀请，原邀请不能用于其他 ID。", -1))
        ])
      ]),
      s("details", {
        class: "setup-accordion-item",
        open: x.value,
        onToggle: t[2] || (t[2] = (e) => x.value = e.target.open)
      }, [
        s("summary", rs, [
          s("div", ds, [
            t[15] || (t[15] = s("span", { class: "accordion-icon" }, "✉️", -1)),
            s("div", us, [
              s("strong", vs, r(a(c).room ? "使用另一份邀请 / 切换房间" : "加入朋友的聊天室"), 1),
              t[14] || (t[14] = s("small", { class: "summary-sub" }, "粘贴服主为你生成的专属加入邀请凭据", -1))
            ])
          ]),
          t[16] || (t[16] = s("span", { class: "chevron-arrow" }, "›", -1))
        ]),
        s("div", cs, [
          t[20] || (t[20] = s("p", { class: "body-tip" }, [
            g("先把你的聊天 ID 发给朋友，服主生成专属邀请后，将整段 "),
            s("code", null, "BEAVER-PRIVATE1:"),
            g(" 凭据粘贴于此。")
          ], -1)),
          s("div", ms, [
            s("div", ps, [
              t[17] || (t[17] = s("span", { class: "field-label-text" }, "你的专属邀请密钥", -1)),
              s("button", {
                type: "button",
                class: "btn-text-link",
                onClick: E
              }, r(w.value ? "✅ ID 已复制" : "复制我的聊天 ID 给服主"), 1)
            ]),
            A(s("input", {
              "onUpdate:modelValue": t[0] || (t[0] = (e) => p.value = e),
              type: "password",
              class: "setup-modern-input",
              autocomplete: "off",
              placeholder: "粘贴 BEAVER-PRIVATE1: 开头的完整邀请"
            }, null, 512), [
              [U, p.value]
            ])
          ]),
          s("div", bs, [
            s("button", {
              type: "button",
              class: "btn-modern-secondary",
              disabled: m.value || !p.value.trim(),
              onClick: T
            }, " 🔍 检查邀请 ", 8, ys),
            t[18] || (t[18] = s("small", { class: "action-hint" }, "仅在本机安全校验与解析，不会立即发起网络连接。", -1))
          ]),
          b.value ? (o(), n("div", gs, [
            s("div", fs, [
              t[19] || (t[19] = s("span", { class: "preview-icon" }, "🌐", -1)),
              s("p", null, r(b.value), 1)
            ]),
            a(c).room ? (o(), n("small", ws, "⚠️ 确认连接后将切换至新聊天室，原房间本地消息仍会妥善归档保留。")) : v("", !0),
            s("button", {
              type: "button",
              class: "btn-modern-primary",
              disabled: m.value,
              onClick: t[1] || (t[1] = (e) => k(M))
            }, " 🚀 确认并立即连接 ", 8, _s)
          ])) : v("", !0)
        ])
      ], 40, is),
      a(P).role === "owner" ? (o(), n("details", ks, [
        t[24] || (t[24] = C('<summary class="accordion-summary" data-v-28b22a82><div class="summary-left" data-v-28b22a82><span class="accordion-icon" data-v-28b22a82>👥</span><div class="summary-text-wrap" data-v-28b22a82><strong class="summary-title" data-v-28b22a82>邀请与管理房间成员</strong><small class="summary-sub" data-v-28b22a82>服主专用 · 一人一码定向发信，保障私密性</small></div></div><span class="chevron-arrow" data-v-28b22a82>›</span></summary>', 1)),
        s("div", Is, [
          t[23] || (t[23] = s("p", { class: "body-tip" }, "让朋友复制他的聊天 ID 给你，在此输入后生成一份 30 天有效的专属邀请，绝不要把服主自己的邀请公开出去。", -1)),
          s("div", Ds, [
            t[21] || (t[21] = s("label", null, "朋友的聊天 ID", -1)),
            A(s("input", {
              "onUpdate:modelValue": t[3] || (t[3] = (e) => I.value = e),
              class: "setup-modern-input",
              maxlength: "160",
              placeholder: "粘贴朋友发来的专属 ID"
            }, null, 512), [
              [U, I.value]
            ])
          ]),
          s("div", xs, [
            s("button", {
              type: "button",
              class: "btn-modern-primary",
              disabled: m.value || !I.value.trim(),
              onClick: t[4] || (t[4] = (e) => k(N))
            }, " ✨ 生成专属邀请 ", 8, Cs),
            D.value ? (o(), n("button", {
              key: 0,
              type: "button",
              class: "btn-modern-success",
              disabled: m.value,
              onClick: t[5] || (t[5] = (e) => k(j))
            }, " 📋 复制邀请给朋友 ", 8, Ps)) : v("", !0),
            s("button", {
              type: "button",
              class: "btn-modern-secondary",
              disabled: m.value,
              onClick: t[6] || (t[6] = (e) => k(V))
            }, " 🔄 刷新成员列表 ", 8, hs)
          ]),
          h.value && !f.value.length ? (o(), n("div", Es, " 暂无受邀成员，生成邀请发送给好友后即可在此管理。 ")) : v("", !0),
          f.value.length ? (o(), n("div", Vs, [
            (o(!0), n(R, null, O(f.value, (e) => (o(), n("div", {
              key: e.id,
              class: "member-manage-row"
            }, [
              s("div", Ts, [
                s("strong", $s, r(e.name), 1),
                s("small", Ss, r(e.revoked ? "已撤销访问权限" : e.uid), 1)
              ]),
              s("div", As, [
                !e.revoked && y.value !== e.id ? (o(), n("button", {
                  key: 0,
                  type: "button",
                  class: "btn-revoke-step",
                  disabled: m.value,
                  onClick: ($) => y.value = e.id
                }, " 撤销 ", 8, Us)) : v("", !0),
                y.value === e.id ? (o(), n(R, { key: 1 }, [
                  t[22] || (t[22] = s("span", { class: "revoke-confirm-text" }, "确定撤销？", -1)),
                  s("button", {
                    type: "button",
                    class: "btn-revoke-danger",
                    disabled: m.value,
                    onClick: t[7] || (t[7] = ($) => k(z))
                  }, "确认", 8, Rs),
                  s("button", {
                    type: "button",
                    class: "btn-cancel-flat",
                    onClick: t[8] || (t[8] = ($) => y.value = "")
                  }, "取消")
                ], 64)) : v("", !0)
              ])
            ]))), 128))
          ])) : v("", !0)
        ])
      ])) : v("", !0),
      s("details", Bs, [
        t[31] || (t[31] = C('<summary class="accordion-summary" data-v-28b22a82><div class="summary-left" data-v-28b22a82><span class="accordion-icon" data-v-28b22a82>🛠️</span><div class="summary-text-wrap" data-v-28b22a82><strong class="summary-title" data-v-28b22a82>我想自建聊天室</strong><small class="summary-sub" data-v-28b22a82>基于轻量 Python / SQLite 的自建服务指南</small></div></div><span class="chevron-arrow" data-v-28b22a82>›</span></summary>', 1)),
        s("div", Ls, [
          t[30] || (t[30] = s("p", { class: "body-tip" }, "创建聊天室仅需一台普通的 Linux VPS 或低配云服务器，轻量级 Python 标准库即可跑通，数据完全由你自主掌管。", -1)),
          s("ol", Ms, [
            t[28] || (t[28] = C('<li data-v-28b22a82><div class="step-num" data-v-28b22a82>1</div><div class="step-content" data-v-28b22a82><strong data-v-28b22a82>准备云服务器环境</strong><span data-v-28b22a82>需要 Python 3.12+ 与 SQLite 环境，对外开放端口并通过 Nginx 配置 HTTPS 证书保障安全传输。</span></div></li><li data-v-28b22a82><div class="step-num" data-v-28b22a82>2</div><div class="step-content" data-v-28b22a82><strong data-v-28b22a82>部署聊天服务程序</strong><span data-v-28b22a82>参考项目源码 <code data-v-28b22a82>server/private-chat/README.md</code>，主程序为 <code data-v-28b22a82>server.py</code>，零重量依赖，开箱即用。</span></div></li>', 2)),
            s("li", null, [
              t[27] || (t[27] = s("div", { class: "step-num" }, "3", -1)),
              s("div", Ns, [
                t[25] || (t[25] = s("strong", null, "初始化服主专属身份", -1)),
                t[26] || (t[26] = s("span", null, [
                  g("复制你上方的“我的聊天 ID”，运行 "),
                  s("code", null, "python bootstrap.py"),
                  g(" 生成服主私钥与专属连接邀请。")
                ], -1)),
                s("button", {
                  type: "button",
                  class: "btn-modern-secondary btn-step-copy",
                  onClick: E
                }, r(w.value ? "✅ ID 已复制" : "📋 复制我的聊天 ID"), 1)
              ])
            ]),
            t[29] || (t[29] = s("li", null, [
              s("div", { class: "step-num" }, "4"),
              s("div", { class: "step-content" }, [
                s("strong", null, "服主导入邀请开服"),
                s("span", null, [
                  g("把服务器生成的 "),
                  s("code", null, "owner-invite.txt"),
                  g(" 粘贴至上方“使用另一份邀请”中，连接后即获得全权服主控制台！")
                ])
              ])
            ], -1))
          ])
        ])
      ]),
      u.value ? (o(), n("div", js, [
        t[32] || (t[32] = s("span", { class: "notice-icon" }, "💬", -1)),
        s("span", null, r(u.value), 1)
      ])) : v("", !0),
      t[33] || (t[33] = s("footer", { class: "privacy-footer-box" }, [
        s("span", { class: "privacy-shield-icon" }, "🛡️"),
        s("p", { class: "privacy-text" }, [
          s("strong", null, "安全说明"),
          g("：聊天内容直接保存在服主自建的私有服务器上，未提供端到端加密。请只加入你信任的朋友开办的聊天室，切勿在不熟悉的公共房间中发送敏感凭证。 ")
        ])
      ], -1))
    ]));
  }
}), Hs = /* @__PURE__ */ X(zs, [["__scopeId", "data-v-28b22a82"]]);
export {
  Hs as C
};
