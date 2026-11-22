import { d as Xe, b as h, o as nt, e as Et, w as le, f as n, g as i, h as e, q as F, t as l, j as m, F as V, i as re, k as O, u as o, l as ge, T as Me, n as xe, m as Y, J as qt, p as Ie, v as Pe, I as ys, s as J, x as at, G as Yt, A as tt, B as ut } from "./vendor-vue-C-_ocEUS.js";
import { _ as Ke, o as gs, t as Ct, a as ks } from "./_plugin-vue_export-helper-CUD1GoS1.js";
import { A as _s } from "./AppWindowFrame-DI1NuEhy.js";
/* empty css                                                                             */
import { w as bt } from "./window-manager.store-BoJtJrk7.js";
import { i as $s } from "./images-iAEGNCkx.js";
import { a4 as w, P as Bt, aj as ws, ak as se, al as xt, a2 as c, am as ht, an as Cs, ao as xs, ap as Ss, aq as Ms, ar as mt, as as Nt, at as Ft, au as Lt, av as Xt, aw as Is, ax as Ps, ay as Us, az as Tt, aA as Es, a1 as Ut, j as X, a8 as Ts, a9 as js, ab as Ht, h as Fe, ae as Ds, x as me, aB as As, aC as St, aD as Rs, aE as Mt, aF as dt, aG as Bs, aH as Wt, aI as Ns, aJ as Vt, aK as Fs, aL as Ls, aM as Hs, aN as Ws, aO as Vs, aP as Gs, aQ as Js, aR as zs, aS as Os, aT as qs } from "./search.service-gzbpg5BD.js";
import { C as Ys } from "./ChatPrivateSetup-D-lsH8cj.js";
import { a as Be, c as Xs, b as Gt } from "./bili-favorites-store-DclRPAm4.js";
import { n as Ne, a as Jt } from "./github.service-BkChs4sP.js";
import { t as K, c as It, i as we, a as Ks, b as Qs, d as st, s as Kt, o as Ye, j as zt, l as Pt, e as Zs, f as ea } from "./together-listen.store-BaqEtApu.js";
import { S as Qt, c as Zt } from "./stickers.service-BHqjZdvX.js";
import { w as ft } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-Bk2ztKZ7.js";
const ta = { class: "discord-navigation" }, sa = {
  class: "col-groups-sidebar",
  "aria-label": "聊天空间"
}, aa = { class: "groups-icons-scroll" }, na = {
  key: 0,
  class: "sidebar-badge"
}, ia = ["title", "aria-label", "aria-pressed", "onClick", "onContextmenu"], oa = ["disabled"], la = { class: "chat-context-header" }, ra = { class: "chat-context-header" }, ca = { class: "col-channels-sidebar" }, ua = { class: "channels-header" }, da = { class: "dm-friends-count" }, va = { class: "dm-sessions-list" }, pa = ["title", "onClick"], ma = { class: "dm-avatar-box" }, ba = ["src"], ha = {
  key: 1,
  class: "dm-avatar-char"
}, fa = { class: "dm-item-info" }, ya = { class: "dm-name-row" }, ga = { class: "dm-name-text" }, ka = {
  key: 0,
  class: "dm-owner-badge"
}, _a = { class: "dm-status-row" }, $a = {
  key: 0,
  class: "dm-act-snippet"
}, wa = {
  key: 1,
  class: "dm-status-online"
}, Ca = {
  key: 2,
  class: "dm-status-offline"
}, xa = {
  key: 0,
  class: "dm-empty-state"
}, Sa = { class: "group-brand-info" }, Ma = { class: "group-brand-icon" }, Ia = { class: "group-brand-name" }, Pa = ["aria-expanded"], Ua = { class: "channels-list-wrap" }, Ea = { class: "channel-section-label" }, Ta = ["disabled"], ja = { class: "channels-scroll-inner" }, Da = ["aria-current", "title", "onClick", "onContextmenu"], Aa = { class: "channel-icon" }, Ra = { class: "channel-title" }, Ba = ["aria-label", "disabled", "onClick"], Na = {
  key: 0,
  class: "room-hint"
}, Fa = { class: "manage-dialog-head" }, La = { class: "manage-dialog-title" }, Ha = ["disabled"], Wa = { class: "manage-label" }, Va = ["disabled"], Ga = { class: "manage-label" }, Ja = { class: "emoji-picker-row" }, za = ["disabled"], Oa = { class: "quick-emojis" }, qa = ["onClick"], Ya = {
  key: 0,
  class: "manage-label"
}, Xa = ["disabled"], Ka = {
  key: 1,
  class: "manage-notice",
  role: "status"
}, Qa = { class: "manage-dialog-actions" }, Za = ["disabled"], en = { class: "manage-actions-right" }, tn = ["disabled"], sn = ["disabled"], an = { class: "manage-dialog-head" }, nn = { class: "manage-dialog-title text-danger" }, on = ["disabled"], ln = { class: "delete-dialog-body" }, rn = { class: "delete-dialog-hint" }, cn = {
  key: 0,
  class: "manage-notice",
  role: "status"
}, un = { class: "manage-dialog-actions" }, dn = ["disabled"], vn = ["disabled"], pn = /* @__PURE__ */ Xe({
  __name: "SharedRoomNavigation",
  emits: ["settings"],
  setup(Q, { emit: y }) {
    const D = y, j = J(() => w.role === "owner"), A = h(w.channel.startsWith("dm_") ? "dm" : "spaces"), k = h("hub_main"), I = J(() => w.spaces.find((p) => p.id === k.value) || w.spaces[0]), S = J(() => w.rooms.filter((p) => (p.space || "hub_main") === I.value?.id)), N = h(!1), f = h({
      visible: !1,
      x: 0,
      y: 0,
      space: null
    }), C = h({
      visible: !1,
      x: 0,
      y: 0,
      room: null
    }), _ = h(""), x = h(""), $ = h(""), L = h(""), E = h("💬"), T = h(""), P = h(!1), z = h("");
    let ae = 0;
    const Z = h(null);
    function ee() {
      f.value.visible = !1, C.value.visible = !1, N.value = !1;
    }
    function ue() {
      ee();
    }
    nt(() => {
      window.addEventListener("click", ue);
    }), Et(() => {
      window.removeEventListener("click", ue);
    });
    function H(p) {
      return typeof p == "string" && p.length <= 8 && !/[:/]/.test(p) && p || "🦫";
    }
    const W = J(() => {
      const p = [], r = /* @__PURE__ */ new Set([...w.friends, ...c.friends.map((u) => u.uid)]);
      for (const u of r) {
        if (u === c.currentUser.uid) continue;
        const te = w.members.find((Se) => Se.uid === u), fe = c.friends.find((Se) => Se.uid === u), Ce = te?.name || fe?.name || u, Le = te?.avatar || fe?.avatar || "🦫", He = te?.online ?? !1, ye = te?.activity || c.userActivities[u];
        p.push({
          uid: u,
          name: Ce,
          avatar: Le,
          online: He,
          activity: ye,
          role: te?.role
        });
      }
      return p;
    }), U = J(() => c.friendRequests.filter((p) => p.toUid === c.currentUser.uid && p.status === "pending").length);
    function de() {
      A.value = "dm", ee(), W.value.length && !w.channel.startsWith("dm_") && ht(W.value[0].uid);
    }
    function Ue(p) {
      ht(p);
    }
    le(() => JSON.stringify(Bt.room), () => {
      ae++, _.value = "", Z.value = null, z.value = "", k.value = "hub_main", ee();
    }), le(() => [w.channel, w.rooms.find((p) => p.id === w.channel)?.space], () => {
      if (w.channel.startsWith("dm_"))
        A.value = "dm";
      else {
        A.value = "spaces";
        const p = w.rooms.find((r) => r.id === w.channel);
        p && (k.value = p.space || "hub_main");
      }
    }, { immediate: !0 }), le(() => w.spaces.map((p) => p.id).join(","), () => {
      w.spaces.some((p) => p.id === k.value) || (k.value = w.spaces[0]?.id || "hub_main");
    });
    function R(p) {
      if (A.value = "spaces", ee(), p.id === I.value?.id && !w.channel.startsWith("dm_")) return;
      k.value = p.id;
      const r = w.rooms.find((u) => (u.space || "hub_main") === p.id);
      r ? xt(r.id) : xt("main");
    }
    function ke(p, r) {
      p.preventDefault(), p.stopPropagation(), ee(), f.value = {
        visible: !0,
        x: Math.min(p.clientX, window.innerWidth - 180),
        y: Math.min(p.clientY, window.innerHeight - 150),
        space: r
      };
    }
    function ve(p, r) {
      p.preventDefault(), p.stopPropagation(), ee(), C.value = {
        visible: !0,
        x: Math.min(p.clientX, window.innerWidth - 180),
        y: Math.min(p.clientY, window.innerHeight - 150),
        room: r
      };
    }
    function _e(p) {
      ee(), q(p);
    }
    function pe(p) {
      ee(), p.id !== "hub_main" && (Z.value = {
        type: "space",
        id: p.id,
        name: p.name
      });
    }
    function M(p) {
      ee(), G(p);
    }
    function B(p) {
      ee(), p.id !== "main" && (Z.value = {
        type: "room",
        id: p.id,
        name: p.name
      });
    }
    function G(p) {
      _.value = "room", x.value = p?.id || "", $.value = p?.space || I.value?.id || "hub_main", L.value = p?.name || "", E.value = p?.icon || "💬", T.value = p?.description || "", z.value = "", ee();
    }
    function q(p) {
      _.value = "space", x.value = p?.id || "", $.value = "", L.value = p?.name || "", E.value = p?.icon || "👥", T.value = "", z.value = "", ee();
    }
    async function ne() {
      if (P.value || !L.value.trim()) return;
      const p = ae;
      P.value = !0, z.value = "";
      try {
        _.value === "space" ? await Cs({ name: L.value.trim(), icon: E.value.trim() || "👥" }, x.value || void 0) : await xs({
          name: L.value.trim(),
          icon: E.value.trim() || "💬",
          description: T.value.trim(),
          space: $.value
        }, x.value || void 0), p === ae && (_.value = "");
      } catch {
        p === ae && (z.value = "未确认保存结果，请检查连接和列表，不要重复创建。");
      } finally {
        P.value = !1;
      }
    }
    function he() {
      if (!x.value) return;
      const p = x.value, r = L.value, u = _.value;
      _.value = "", Z.value = {
        type: u,
        id: p,
        name: r
      };
    }
    async function be() {
      if (!Z.value || P.value) return;
      const p = Z.value, r = ae;
      P.value = !0, z.value = "";
      try {
        p.type === "space" ? await Ss(p.id) : await Ms(p.id), r === ae && (Z.value = null);
      } catch {
        r === ae && (z.value = "移除未确认，请检查连接；聊天历史不会被删除。");
      } finally {
        P.value = !1;
      }
    }
    const Ee = J(() => x.value && (_.value === "space" ? x.value !== "hub_main" : x.value !== "main"));
    return (p, r) => (n(), i("div", ta, [
      e("nav", sa, [
        e("div", aa, [
          e("button", {
            type: "button",
            class: F(["group-icon-pill dm-entry-pill", { active: A.value === "dm" }]),
            title: "私信与好友",
            "aria-label": "私信与好友",
            onClick: de
          }, [
            r[28] || (r[28] = e("span", { class: "grp-emoji" }, "💬", -1)),
            U.value > 0 ? (n(), i("span", na, l(U.value), 1)) : m("", !0)
          ], 2),
          r[29] || (r[29] = e("div", { class: "sidebar-divider" }, null, -1)),
          (n(!0), i(V, null, re(o(w).spaces, (u) => (n(), i("button", {
            key: u.id,
            type: "button",
            class: F(["group-icon-pill", { active: A.value === "spaces" && I.value?.id === u.id }]),
            title: `空间：${u.name}${j.value ? "（右键改名/删除）" : ""}`,
            "aria-label": u.name,
            "aria-pressed": A.value === "spaces" && I.value?.id === u.id,
            onClick: (te) => R(u),
            onContextmenu: O((te) => ke(te, u), ["prevent"])
          }, [
            e("span", null, l(u.icon || "👥"), 1)
          ], 42, ia))), 128)),
          j.value && o(w).spacesSupported ? (n(), i("button", {
            key: 0,
            type: "button",
            class: "group-add-btn",
            title: "创建新空间",
            "aria-label": "创建新空间",
            disabled: P.value,
            onClick: r[0] || (r[0] = (u) => q())
          }, " ＋ ", 8, oa)) : m("", !0)
        ]),
        e("button", {
          type: "button",
          class: "sidebar-settings-btn",
          title: "我的资料与连接设置",
          "aria-label": "我的资料与连接设置",
          onClick: r[1] || (r[1] = (u) => D("settings"))
        }, " ⚙ ")
      ]),
      (n(), ge(Me, { to: "body" }, [
        f.value.visible && f.value.space ? (n(), i("div", {
          key: 0,
          class: "chat-context-menu",
          style: xe({ left: `${f.value.x}px`, top: `${f.value.y}px` }),
          onClick: r[4] || (r[4] = O(() => {
          }, ["stop"]))
        }, [
          e("div", la, [
            e("span", null, l(f.value.space.icon || "👥"), 1),
            e("strong", null, l(f.value.space.name), 1)
          ]),
          e("button", {
            type: "button",
            class: "chat-context-item",
            onClick: r[2] || (r[2] = (u) => _e(f.value.space))
          }, [...r[30] || (r[30] = [
            e("span", { class: "chat-context-icon" }, "✏️", -1),
            Y(" 空间改名 / 设置 ", -1)
          ])]),
          f.value.space.id !== "hub_main" ? (n(), i(V, { key: 0 }, [
            r[32] || (r[32] = e("div", { class: "chat-context-divider" }, null, -1)),
            e("button", {
              type: "button",
              class: "chat-context-item text-danger",
              onClick: r[3] || (r[3] = (u) => pe(f.value.space))
            }, [...r[31] || (r[31] = [
              e("span", { class: "chat-context-icon" }, "🗑️", -1),
              Y(" 删除此空间 ", -1)
            ])])
          ], 64)) : m("", !0)
        ], 4)) : m("", !0)
      ])),
      (n(), ge(Me, { to: "body" }, [
        C.value.visible && C.value.room ? (n(), i("div", {
          key: 0,
          class: "chat-context-menu",
          style: xe({ left: `${C.value.x}px`, top: `${C.value.y}px` }),
          onClick: r[7] || (r[7] = O(() => {
          }, ["stop"]))
        }, [
          e("div", ra, [
            e("span", null, l(C.value.room.icon || "💬"), 1),
            e("strong", null, "# " + l(C.value.room.name), 1)
          ]),
          e("button", {
            type: "button",
            class: "chat-context-item",
            onClick: r[5] || (r[5] = (u) => M(C.value.room))
          }, [...r[33] || (r[33] = [
            e("span", { class: "chat-context-icon" }, "✏️", -1),
            Y(" 重命名此房间 ", -1)
          ])]),
          C.value.room.id !== "main" ? (n(), i(V, { key: 0 }, [
            r[35] || (r[35] = e("div", { class: "chat-context-divider" }, null, -1)),
            e("button", {
              type: "button",
              class: "chat-context-item text-danger",
              onClick: r[6] || (r[6] = (u) => B(C.value.room))
            }, [...r[34] || (r[34] = [
              e("span", { class: "chat-context-icon" }, "🗑️", -1),
              Y(" 删除此房间 ", -1)
            ])])
          ], 64)) : m("", !0)
        ], 4)) : m("", !0)
      ])),
      e("aside", ca, [
        A.value === "dm" ? (n(), i(V, { key: 0 }, [
          e("div", ua, [
            r[36] || (r[36] = e("div", { class: "group-brand-info" }, [
              e("span", { class: "group-brand-icon" }, "💬"),
              e("strong", { class: "group-brand-name" }, "私信会话")
            ], -1)),
            e("span", da, l(W.value.length) + " 好友", 1)
          ]),
          e("div", va, [
            (n(!0), i(V, null, re(W.value, (u) => (n(), i("div", {
              key: u.uid,
              class: F(["dm-session-item", { active: o(w).channel === o(ws)(u.uid) }]),
              title: `点击与【${u.name}】私聊`,
              onClick: (te) => Ue(u.uid)
            }, [
              e("div", ma, [
                o(se)(u.avatar) ? (n(), i("img", {
                  key: 0,
                  src: o(se)(u.avatar),
                  class: "dm-avatar-pic",
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer",
                  onError: r[8] || (r[8] = (te) => te.target.style.display = "none")
                }, null, 40, ba)) : (n(), i("span", ha, l(H(u.avatar)), 1)),
                e("span", {
                  class: F(["dm-online-dot", { online: u.online }])
                }, null, 2)
              ]),
              e("div", fa, [
                e("div", ya, [
                  e("span", ga, l(u.name), 1),
                  u.role === "owner" ? (n(), i("span", ka, "群主")) : m("", !0)
                ]),
                e("div", _a, [
                  u.activity?.title ? (n(), i("span", $a, l(u.activity.type === "bilibili" ? "📺" : u.activity.type === "github" ? "🐙" : u.activity.type === "music" ? "🎵" : u.activity.type === "aihot" ? "🔥" : "🌐") + " " + l(u.activity.title), 1)) : u.online ? (n(), i("span", wa, "当前在线")) : (n(), i("span", Ca, "离线"))
                ])
              ])
            ], 10, pa))), 128)),
            W.value.length ? m("", !0) : (n(), i("div", xa, [...r[37] || (r[37] = [
              e("p", null, "暂无好友", -1),
              e("small", null, "在群聊或成员列表中右键点击同学头像，选择「➕ 添加为好友」；通过后即可在此随时私聊。", -1)
            ])]))
          ])
        ], 64)) : (n(), i(V, { key: 1 }, [
          e("div", {
            class: "channels-header",
            onContextmenu: r[10] || (r[10] = O((u) => I.value && ke(u, I.value), ["prevent"]))
          }, [
            e("div", Sa, [
              e("span", Ma, l(I.value?.icon || "🏠"), 1),
              e("strong", Ia, l(I.value?.name || "聊天室"), 1)
            ]),
            j.value ? (n(), i("button", {
              key: 0,
              type: "button",
              class: "group-more-btn",
              title: "空间设置与管理",
              "aria-label": "空间设置与管理",
              "aria-expanded": N.value,
              onClick: r[9] || (r[9] = O((u) => N.value = !N.value, ["stop"]))
            }, "⋮", 8, Pa)) : m("", !0)
          ], 32),
          N.value && j.value ? (n(), i("div", {
            key: 0,
            class: "space-menu",
            onClick: r[14] || (r[14] = O(() => {
            }, ["stop"]))
          }, [
            o(w).spacesSupported ? (n(), i("button", {
              key: 0,
              type: "button",
              onClick: r[11] || (r[11] = (u) => I.value && q(I.value))
            }, "空间设置 / 改名")) : m("", !0),
            o(w).roomsSupported ? (n(), i("button", {
              key: 1,
              type: "button",
              onClick: r[12] || (r[12] = (u) => G())
            }, "创建房间")) : m("", !0),
            e("button", {
              type: "button",
              onClick: r[13] || (r[13] = (u) => {
                N.value = !1, D("settings");
              })
            }, "成员与邀请")
          ])) : m("", !0),
          e("div", Ua, [
            e("div", Ea, [
              r[38] || (r[38] = e("span", null, "房间频道", -1)),
              j.value && o(w).roomsSupported ? (n(), i("button", {
                key: 0,
                type: "button",
                class: "btn-fast-add-ch",
                title: "创建房间",
                "aria-label": "创建房间",
                disabled: P.value,
                onClick: r[15] || (r[15] = (u) => G())
              }, "＋", 8, Ta)) : m("", !0)
            ]),
            e("div", ja, [
              (n(!0), i(V, null, re(S.value, (u) => (n(), i("div", {
                key: u.id,
                class: "channel-line"
              }, [
                e("button", {
                  type: "button",
                  class: F(["channel-item-btn", { active: o(w).channel === u.id }]),
                  "aria-current": o(w).channel === u.id ? "page" : void 0,
                  title: `${u.name}（右键重命名/删除）`,
                  onClick: (te) => o(xt)(u.id),
                  onContextmenu: O((te) => ve(te, u), ["prevent"])
                }, [
                  r[39] || (r[39] = e("span", { class: "channel-prefix" }, "#", -1)),
                  e("span", Aa, l(u.icon), 1),
                  e("span", Ra, l(u.name), 1)
                ], 42, Da),
                e("button", {
                  type: "button",
                  class: "channel-settings-btn",
                  "aria-label": `设置房间：${u.name}`,
                  title: "设置房间",
                  disabled: P.value,
                  onClick: O((te) => ve(te, u), ["stop"])
                }, " ⚙ ", 8, Ba)
              ]))), 128))
            ]),
            S.value.length ? m("", !0) : (n(), i("p", Na, l(o(Bt).room ? "暂无房间，连接后由服主创建。" : "请先加入聊天室。"), 1))
          ]),
          qt(p.$slots, "members", {}, void 0, !0)
        ], 64))
      ]),
      (n(), ge(Me, { to: "body" }, [
        _.value ? (n(), i("div", {
          key: 0,
          class: "chat-modal-backdrop",
          onClick: r[23] || (r[23] = (u) => !P.value && (_.value = ""))
        }, [
          e("div", {
            class: "chat-manage-dialog-card",
            onClick: r[21] || (r[21] = O(() => {
            }, ["stop"])),
            onKeydown: r[22] || (r[22] = ys((u) => !P.value && (_.value = ""), ["esc"]))
          }, [
            e("div", Fa, [
              e("strong", La, l(x.value ? _.value === "space" ? "✏️ 空间改名与设置" : "✏️ 房间改名与设置" : _.value === "space" ? "➕ 创建新空间" : "➕ 创建房间"), 1),
              e("button", {
                type: "button",
                class: "manage-dialog-close",
                disabled: P.value,
                onClick: r[16] || (r[16] = (u) => _.value = "")
              }, "✕", 8, Ha)
            ]),
            e("form", {
              class: "manage-dialog-form",
              onSubmit: O(ne, ["prevent"])
            }, [
              e("label", Wa, [
                r[40] || (r[40] = e("span", null, "名称", -1)),
                Ie(e("input", {
                  "onUpdate:modelValue": r[17] || (r[17] = (u) => L.value = u),
                  class: "manage-input",
                  maxlength: "80",
                  required: "",
                  disabled: P.value,
                  placeholder: "给它起个名字",
                  autofocus: ""
                }, null, 8, Va), [
                  [Pe, L.value]
                ])
              ]),
              e("label", Ga, [
                r[41] || (r[41] = e("span", null, "图标 Emoji", -1)),
                e("div", Ja, [
                  Ie(e("input", {
                    "onUpdate:modelValue": r[18] || (r[18] = (u) => E.value = u),
                    class: "manage-input emoji-input",
                    maxlength: "8",
                    disabled: P.value,
                    placeholder: "Emoji"
                  }, null, 8, za), [
                    [Pe, E.value]
                  ]),
                  e("div", Oa, [
                    (n(!0), i(V, null, re(_.value === "space" ? ["🏠", "🎮", "💻", "☕", "🎵", "📚", "🚀", "🦫"] : ["💬", "🎵", "📺", "🐙", "⚡", "☕", "🎮", "💡"], (u) => (n(), i("button", {
                      key: u,
                      type: "button",
                      class: F(["quick-emoji-btn", { sel: E.value === u }]),
                      onClick: (te) => E.value = u
                    }, l(u), 11, qa))), 128))
                  ])
                ])
              ]),
              _.value === "room" ? (n(), i("label", Ya, [
                r[42] || (r[42] = e("span", null, "房间说明（选填）", -1)),
                Ie(e("textarea", {
                  "onUpdate:modelValue": r[19] || (r[19] = (u) => T.value = u),
                  class: "manage-textarea",
                  maxlength: "500",
                  rows: "2",
                  disabled: P.value,
                  placeholder: "简短描述该房间的主题或规矩"
                }, null, 8, Xa), [
                  [Pe, T.value]
                ])
              ])) : m("", !0),
              z.value ? (n(), i("div", Ka, l(z.value), 1)) : m("", !0),
              e("div", Qa, [
                Ee.value ? (n(), i("button", {
                  key: 0,
                  type: "button",
                  class: "manage-btn-delete",
                  disabled: P.value,
                  onClick: he
                }, " 🗑️ " + l(_.value === "space" ? "删除空间" : "删除房间"), 9, Za)) : m("", !0),
                e("div", en, [
                  e("button", {
                    type: "button",
                    class: "manage-btn-cancel",
                    disabled: P.value,
                    onClick: r[20] || (r[20] = (u) => _.value = "")
                  }, "取消", 8, tn),
                  e("button", {
                    type: "submit",
                    class: "manage-btn-save",
                    disabled: P.value || !L.value.trim()
                  }, l(P.value ? "保存中…" : "保存修改"), 9, sn)
                ])
              ])
            ], 32)
          ], 32)
        ])) : m("", !0)
      ])),
      (n(), ge(Me, { to: "body" }, [
        Z.value ? (n(), i("div", {
          key: 0,
          class: "chat-modal-backdrop",
          onClick: r[27] || (r[27] = (u) => !P.value && (Z.value = null))
        }, [
          e("div", {
            class: "chat-manage-dialog-card delete-confirm-card",
            onClick: r[26] || (r[26] = O(() => {
            }, ["stop"]))
          }, [
            e("div", an, [
              e("strong", nn, " 🗑️ 确认删除" + l(Z.value.type === "space" ? "空间" : "房间") + "？ ", 1),
              e("button", {
                type: "button",
                class: "manage-dialog-close",
                disabled: P.value,
                onClick: r[24] || (r[24] = (u) => Z.value = null)
              }, "✕", 8, on)
            ]),
            e("div", ln, [
              e("p", null, [
                r[43] || (r[43] = Y(" 确定要删除 ", -1)),
                e("strong", null, l(Z.value.type === "space" ? "群空间" : "房间") + "【" + l(Z.value.name) + "】", 1),
                r[44] || (r[44] = Y(" 吗？ ", -1))
              ]),
              e("small", rn, l(Z.value.type === "space" ? "该空间及其包含的所有子房间将停止访问，聊天历史记录仍完整保留在服务器中。" : "所有成员将无法再进入此房间，聊天历史记录仍完整保留在服务器中。"), 1)
            ]),
            z.value ? (n(), i("div", cn, l(z.value), 1)) : m("", !0),
            e("div", un, [
              e("button", {
                type: "button",
                class: "manage-btn-cancel",
                disabled: P.value,
                onClick: r[25] || (r[25] = (u) => Z.value = null)
              }, "取消", 8, dn),
              e("button", {
                type: "button",
                class: "manage-btn-confirm-delete",
                disabled: P.value,
                onClick: be
              }, l(P.value ? "正在删除…" : "确认删除"), 9, vn)
            ])
          ])
        ])) : m("", !0)
      ]))
    ]));
  }
}), mn = /* @__PURE__ */ Ke(pn, [["__scopeId", "data-v-6425d838"]]), bn = { class: "history-tools" }, hn = { class: "history-options" }, fn = ["disabled"], yn = { key: 0 }, gn = {
  key: 1,
  role: "alert"
}, kn = {
  key: 2,
  role: "status"
}, _n = /* @__PURE__ */ Xe({
  __name: "ChatHistoryTools",
  props: {
    container: {}
  },
  setup(Q) {
    const y = Q, D = J(() => Xt(c.currentUser.uid, c.serverUrl, c.currentRoomId)), j = h(!1), A = h(""), k = h(!1);
    le(D, () => {
      k.value = !1, A.value = "", mt.value = !1;
    });
    async function I() {
      if (j.value) return;
      const f = D.value;
      j.value = !0, mt.value = !0;
      try {
        const C = c.messages.find((T) => T.id !== "sys-welcome"), _ = await Is(f, C);
        if (f !== D.value) return;
        const x = new Set(c.messages.map((T) => T.id)), $ = _.filter((T) => !x.has(T.id)), L = y.container?.scrollHeight || 0, E = y.container?.scrollTop || 0;
        c.messages = [...$, ...c.messages], k.value = _.length < 200, A.value = $.length ? `已加载 ${$.length} 条历史` : "没有更早记录", await at(), f === D.value && y.container && (y.container.scrollTop = E + y.container.scrollHeight - L);
      } catch {
        A.value = "读取失败，原记录未删除";
      } finally {
        j.value = !1, mt.value = !1;
      }
    }
    function S(f, C) {
      const _ = URL.createObjectURL(new Blob([JSON.stringify(f, null, 2)], { type: "application/json" })), x = document.createElement("a");
      x.href = _, x.download = C, x.click(), setTimeout(() => URL.revokeObjectURL(_), 1e4);
    }
    async function N() {
      const f = D.value, C = c.messages.map((_) => JSON.parse(JSON.stringify(_)));
      try {
        const _ = await Ps(f), x = new Map(_.map(($) => [$.id, $]));
        for (const $ of C) x.set($.id, $);
        S({ version: 1, scope: JSON.parse(f), messages: [...x.values()] }, "chat-room-history.json"), A.value = "已发起导出；文件包含聊天内容及房间地址，请妥善保管";
      } catch {
        S({ partial: !0, scope: JSON.parse(f), visible: C, pending: Us(f) }, "chat-history-emergency.json"), A.value = "数据库不可读，仅导出当前窗口和待存消息，不是完整归档";
      }
    }
    return (f, C) => (n(), i("div", bn, [
      (n(), i("details", { key: D.value }, [
        C[1] || (C[1] = e("summary", null, "聊天记录", -1)),
        e("div", hn, [
          e("button", {
            type: "button",
            disabled: j.value || k.value,
            onClick: I
          }, l(j.value ? "读取中…" : "加载更早消息"), 9, fn),
          e("button", {
            type: "button",
            onClick: N
          }, "导出聊天记录")
        ])
      ])),
      o(Nt) ? (n(), i("span", yn, l(o(Nt)) + " 条待写入", 1)) : m("", !0),
      o(Ft) ? (n(), i("p", gn, [
        Y(l(o(Ft)) + " ", 1),
        e("button", {
          type: "button",
          onClick: C[0] || (C[0] = //@ts-ignore
          (..._) => o(Lt) && o(Lt)(..._))
        }, "重试保存")
      ])) : m("", !0),
      A.value ? (n(), i("p", kn, l(A.value), 1)) : m("", !0)
    ]));
  }
}), $n = /* @__PURE__ */ Ke(_n, [["__scopeId", "data-v-15869157"]]), wn = ["data-virtual-id"], Cn = /* @__PURE__ */ Xe({
  __name: "MeasuredVirtualList",
  props: {
    items: {},
    scrollHost: {},
    active: { type: Boolean, default: !0 },
    estimate: { default: 100 },
    gap: { default: 0 },
    resetKey: { default: "" }
  },
  setup(Q) {
    const y = Q, D = h(null), j = h(0), A = h(0), k = h(600), I = h(null), S = h(null), N = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
    let C, _, x = 0, $ = 0, L = !0, E = 0, T = null;
    const P = J(() => {
      j.value;
      const M = [0];
      for (const B of y.items) M.push(M[M.length - 1] + (N.get(B.id) ?? y.estimate));
      return M;
    }), z = J(() => new Map(y.items.map((M, B) => [M.id, B])));
    function ae(M) {
      const B = P.value;
      let G = 0, q = y.items.length;
      for (; G < q; ) {
        const ne = G + q >>> 1;
        B[ne + 1] <= M ? G = ne + 1 : q = ne;
      }
      return Math.min(G, Math.max(0, y.items.length - 1));
    }
    const Z = J(() => {
      const M = ae(Math.max(0, A.value - 400)), B = Math.min(y.items.length, ae(A.value + k.value + 400) + 1), G = /* @__PURE__ */ new Set();
      for (let q = M; q < B; q++) G.add(q);
      for (const q of [I.value, S.value]) {
        const ne = q === null ? void 0 : z.value.get(q);
        ne !== void 0 && G.add(ne);
      }
      return [...G].sort((q, ne) => q - ne).map((q) => ({ item: y.items[q], index: q }));
    });
    function ee() {
      x = 0, !(!L || !y.active || document.hidden || !D.value || !T) && (A.value = Math.max(0, T.getBoundingClientRect().top - D.value.getBoundingClientRect().top), k.value = T.clientHeight || 600);
    }
    function ue() {
      !x && L && y.active && !document.hidden && (x = requestAnimationFrame(ee));
    }
    function H() {
      ++$, ue();
    }
    function W(M, B) {
      const G = f.get(M);
      G !== B && (G && C?.unobserve(G), B instanceof HTMLElement ? (f.set(M, B), y.active && !document.hidden && C?.observe(B)) : f.delete(M));
    }
    function U(M) {
      if (!T || !y.active || !L || document.hidden) return;
      const B = T, G = $, q = E, ne = y.items, he = ae(A.value), be = ne[he]?.id, Ee = P.value[he] || 0, p = B.scrollHeight - B.scrollTop - B.clientHeight <= 3;
      let r = !1;
      for (const u of M) {
        const fe = u.target.dataset.virtualId, Ce = u.borderBoxSize?.[0]?.blockSize ?? u.contentRect.height;
        !fe || Ce < 1 || !z.value.has(fe) || Math.abs((N.get(fe) ?? y.estimate) - Ce) > 0.5 && (N.set(fe, Ce), r = !0);
      }
      r && (++j.value, at(() => {
        if (!(!L || q !== E || T !== B || G !== $ || ne !== y.items)) {
          if (p) B.scrollTop = B.scrollHeight;
          else if (be !== void 0) {
            const u = z.value.get(be);
            u !== void 0 && (B.scrollTop += P.value[u] - Ee);
          }
          ue();
        }
      }));
    }
    function de(M) {
      return M.target instanceof Element ? M.target.closest("[data-virtual-id]")?.dataset.virtualId ?? null : null;
    }
    function Ue(M) {
      I.value = de(M);
    }
    function R() {
      at(() => {
        if (!L) return;
        const M = document.activeElement;
        I.value = M && D.value?.contains(M) ? M.closest("[data-virtual-id]")?.dataset.virtualId ?? null : null;
      });
    }
    function ke(M) {
      S.value = de(M);
    }
    function ve() {
      S.value = null;
    }
    function _e() {
      ++E, T?.removeEventListener("scroll", H), _?.disconnect(), C?.disconnect(), cancelAnimationFrame(x), x = 0, T = null;
    }
    function pe() {
      if (_e(), !(!L || !y.active || document.hidden || !y.scrollHost)) {
        T = y.scrollHost, T.addEventListener("scroll", H, { passive: !0 }), _?.observe(T);
        for (const M of f.values()) C?.observe(M);
        ue();
      }
    }
    return le(() => [y.scrollHost, y.active], pe, { flush: "post" }), le(() => y.items, () => {
      const M = new Set(y.items.map((B) => B.id));
      for (const B of N.keys()) M.has(B) || N.delete(B);
      I.value && !M.has(I.value) && (I.value = null), S.value && !M.has(S.value) && (S.value = null), ++j.value, ue();
    }, { flush: "pre" }), le(() => y.resetKey, () => {
      ++E, N.clear(), ++j.value, I.value = null, S.value = null, A.value = 0, ue();
    }), nt(() => {
      C = new ResizeObserver(U), _ = new ResizeObserver(ue), document.addEventListener("visibilitychange", pe), pe();
    }), Yt(() => {
      L = !1, _e(), f.clear(), N.clear(), document.removeEventListener("visibilitychange", pe);
    }), (M, B) => (n(), i("div", {
      ref_key: "canvas",
      ref: D,
      class: "measured-virtual-canvas",
      style: xe({ height: `${P.value[Q.items.length]}px` }),
      onFocusin: Ue,
      onFocusout: R,
      onDragstart: ke,
      onDragend: ve
    }, [
      (n(!0), i(V, null, re(Z.value, (G) => (n(), i("div", {
        key: G.item.id,
        ref_for: !0,
        ref: (q) => W(G.item.id, q),
        class: "measured-virtual-row",
        "data-virtual-id": G.item.id,
        style: xe({ transform: `translateY(${P.value[G.index]}px)`, paddingBottom: G.index === Q.items.length - 1 ? "0px" : `${Q.gap}px` })
      }, [
        qt(M.$slots, "default", {
          item: G.item,
          index: G.index
        }, void 0, !0)
      ], 12, wn))), 128))
    ], 36));
  }
}), xn = /* @__PURE__ */ Ke(Cn, [["__scopeId", "data-v-b7710279"]]);
Tt.imageBytes;
Tt.imageMessageBytes;
const Sn = 25 * 1024 * 1024;
function Ot(Q) {
  return new Promise((y, D) => {
    const j = new FileReader();
    j.onload = () => typeof j.result == "string" ? y(j.result) : D(new Error("图片读取失败")), j.onerror = j.onabort = () => D(new Error("图片读取失败")), j.readAsDataURL(Q);
  });
}
async function Mn(Q) {
  let y = 8;
  for (let D = 0; D < 64 && y + 8 <= Q.size; D++) {
    const j = new Uint8Array(await Q.slice(y, y + 8).arrayBuffer()), A = new DataView(j.buffer).getUint32(0), k = String.fromCharCode(...j.slice(4));
    if (k === "acTL") return !0;
    if (k === "IDAT" || k === "IEND") return !1;
    y += A + 12;
  }
  throw new Error("PNG结构无法确认，请换一张图片，避免误将动图转为静态");
}
async function In(Q, y) {
  if (y && !y.messageTypes.includes("image")) throw new Error(y.reason || "服务端未启用图片消息");
  const D = y?.limits || Tt, j = y?.imageMimeTypes || Es, A = ["image/webp", "image/png", "image/jpeg"].find((C) => j.includes(C));
  if (!Q.size || Q.size > Sn) throw new Error("请选择25MB以内的图片");
  const k = new Uint8Array(await Q.slice(0, 32).arrayBuffer()), I = (C, _) => String.fromCharCode(...k.slice(C, _)), S = I(0, 6) === "GIF87a" || I(0, 6) === "GIF89a" ? "image/gif" : k[0] === 137 && I(1, 4) === "PNG" ? "image/png" : k[0] === 255 && k[1] === 216 && k[2] === 255 ? "image/jpeg" : I(0, 4) === "RIFF" && I(8, 12) === "WEBP" ? "image/webp" : I(0, 2) === "BM" ? "image/bmp" : "";
  if (!S) throw new Error("支持 PNG、JPEG、GIF、WebP、BMP，不支持SVG图片");
  const N = S === "image/gif" || S === "image/webp" && I(12, 16) === "VP8X" && !!(k[20] & 2), f = await createImageBitmap(Q);
  try {
    if (!f.width || !f.height || f.width * f.height > 40 * 1024 * 1024) throw new Error("图片像素过大，请先缩小后发送");
    if (j.includes(S) && Q.size <= D.imageBytes && f.width <= D.imageMaxDimension && f.height <= D.imageMaxDimension && f.width * f.height <= D.imageMaxPixels)
      return Ot(Q.slice(0, Q.size, S));
    if (N || S === "image/png" && await Mn(Q)) throw new Error("动图超过当前服务的大小、尺寸或格式限制；请选择兼容的小动图，不会自动转为静态图");
    if (!A) throw new Error("服务端没有可用于静态图片压缩的兼容格式");
    let C = Math.min(1, 1280 / Math.max(f.width, f.height), D.imageMaxDimension / Math.max(f.width, f.height), Math.sqrt(D.imageMaxPixels / (f.width * f.height)));
    const _ = document.createElement("canvas");
    for (let x = 0; x < 5; x++) {
      _.width = Math.max(1, Math.round(f.width * C)), _.height = Math.max(1, Math.round(f.height * C));
      const $ = _.getContext("2d");
      if (!$) throw new Error("浏览器无法处理这张图片");
      $.drawImage(f, 0, 0, _.width, _.height);
      const L = await new Promise((E) => _.toBlob(E, A, Math.max(0.45, 0.8 - x * 0.08)));
      if (L && j.includes(L.type) && L.size <= D.imageBytes) return Ot(L);
      C *= 0.75;
    }
    throw new Error("图片压缩后仍超限，请先缩小后发送");
  } finally {
    f.close();
  }
}
const Pn = {
  class: "dj-modeless-layer",
  "aria-label": "海狸 DJ 音乐播控台"
}, Un = { class: "dj-head-actions" }, En = {
  class: "dj-source-tabs",
  role: "tablist"
}, Tn = { class: "ownership-left" }, jn = { class: "ownership-icon" }, Dn = { class: "ownership-text" }, An = { key: 0 }, Rn = { key: 1 }, Bn = { key: 2 }, Nn = { key: 3 }, Fn = { class: "ownership-right" }, Ln = {
  key: 0,
  class: "transfer-btn-wrapper"
}, Hn = {
  key: 0,
  class: "transfer-dropdown-menu"
}, Wn = ["onClick"], Vn = {
  key: 0,
  class: "transfer-empty-tip"
}, Gn = { class: "dj-turntable-zone" }, Jn = { class: "vinyl-outer-groove" }, zn = { class: "vinyl-inner-label" }, On = ["src"], qn = { class: "vinyl-fallback-icon" }, Yn = { class: "dj-track-cues" }, Xn = { class: "cue-top-meta" }, Kn = { class: "cue-source-tag" }, Qn = ["disabled"], Zn = ["title"], ei = { class: "cue-track-artist" }, ti = { class: "dj-seek-bar-row" }, si = { class: "dj-time-cur" }, ai = ["value"], ni = { class: "dj-time-dur" }, ii = { class: "dj-ctrl-row" }, oi = ["title"], li = {
  key: 1,
  class: "dj-sync-indicator"
}, ri = { class: "dj-playlist-section" }, ci = {
  key: 0,
  class: "source-panel-box"
}, ui = { class: "dj-tracks-grid" }, di = ["onClick"], vi = { class: "track-seq-num" }, pi = { class: "track-thumb-wrap" }, mi = ["src"], bi = { class: "track-meta" }, hi = ["title"], fi = ["title"], yi = { class: "track-cue-btn" }, gi = {
  key: 0,
  class: "dj-pagination-footer"
}, ki = { class: "dj-page-count-badge" }, _i = { class: "dj-page-btn-group" }, $i = ["disabled"], wi = ["disabled"], Ci = {
  key: 1,
  class: "source-panel-box"
}, xi = {
  key: 0,
  class: "netease-bind-banner"
}, Si = {
  key: 1,
  class: "netease-user-badge-bar"
}, Mi = { class: "user-meta-left" }, Ii = ["src"], Pi = {
  key: 1,
  class: "netease-user-avatar-fallback"
}, Ui = { class: "netease-user-name" }, Ei = {
  key: 0,
  class: "vip-badge"
}, Ti = { class: "netease-user-stat" }, ji = { class: "user-meta-right" }, Di = ["title", "disabled"], Ai = {
  key: 2,
  class: "dj-tracks-grid"
}, Ri = ["onClick"], Bi = { class: "track-seq-num" }, Ni = { class: "track-thumb-wrap" }, Fi = ["src"], Li = { class: "track-meta" }, Hi = ["title"], Wi = ["title"], Vi = {
  key: 0,
  class: "track-duration"
}, Gi = { class: "track-cue-btn" }, Ji = {
  key: 3,
  class: "dj-pagination-footer"
}, zi = { class: "dj-page-count-badge" }, Oi = { class: "dj-page-btn-group" }, qi = ["disabled"], Yi = ["disabled"], Xi = {
  key: 4,
  class: "empty-placeholder-box"
}, Ki = { key: 0 }, Qi = { key: 1 }, Zi = {
  key: 2,
  class: "source-panel-box"
}, eo = { class: "bili-radio-nav-row" }, to = { class: "series-chips-wrap" }, so = ["onClick"], ao = { class: "source-panel-head" }, no = { class: "custom-id-input-wrap" }, io = ["disabled"], oo = {
  key: 0,
  class: "dj-tracks-grid"
}, lo = ["onClick"], ro = { class: "track-thumb-wrap" }, co = ["src"], uo = { class: "track-meta" }, vo = { class: "track-name" }, po = { class: "track-sub" }, mo = { class: "track-cue-btn" }, bo = {
  key: 1,
  class: "empty-placeholder-box"
}, vt = 10, pt = 10, ho = /* @__PURE__ */ Xe({
  __name: "ChatMusicDjDialog",
  setup(Q) {
    const y = h("siren"), D = h(""), j = h(!1), A = h([
      {
        source: "siren",
        trackId: "514584",
        title: "Renegade",
        artist: "Substantial / X.Aratone",
        cover: "https://web.hycdn.cn/siren/pic/20210322/40a13076601806e37c5394049cebc5b1.jpg"
      },
      {
        source: "siren",
        trackId: "880374",
        title: "Speed of Light",
        artist: "DJ Okawari / 二宫爱",
        cover: "https://web.hycdn.cn/siren/pic/20210322/56cbcd1d0093d8ee8ee22bf6d68ab4a6.jpg"
      },
      {
        source: "siren",
        trackId: "306858",
        title: "Boiling Blood",
        artist: "Jason Walsh",
        cover: "https://web.hycdn.cn/siren/pic/20210322/dfe97934b38b1b93ee72e0c5601a79b7.jpg"
      },
      {
        source: "siren",
        trackId: "779437",
        title: "Zone 10⁻⁸",
        artist: "Monster Siren Records",
        cover: "https://web.hycdn.cn/siren/pic/20210322/12b2b9570bb07ffeaff2379660da7711.jpg"
      },
      {
        source: "siren",
        trackId: "514583",
        title: "Sparkling Hydraulics",
        artist: "Monster Siren Records",
        cover: "https://web.hycdn.cn/siren/pic/20210322/18f80a3290a3f0c892c806156066bf46.jpg"
      },
      {
        source: "siren",
        trackId: "125018",
        title: "Requiem",
        artist: "Monster Siren Records",
        cover: "https://web.hycdn.cn/siren/pic/20210322/14db9942c28a5abba48b9dfe2d99e39a.jpg"
      }
    ]), k = h(1), I = J(() => Math.max(1, Math.ceil(A.value.length / vt))), S = J(() => {
      const b = (k.value - 1) * vt;
      return A.value.slice(b, b + vt);
    });
    le(I, (b) => {
      k.value > b && (k.value = Math.max(1, b));
    });
    function N() {
      k.value > 1 && k.value--;
    }
    function f() {
      k.value < I.value && k.value++;
    }
    const C = J(() => X.neteaseUser || Ts.getUser()), _ = h(!1), x = h([]);
    function $() {
      if (!(typeof localStorage > "u"))
        try {
          const b = js(Ht);
          b.length && Array.isArray(b) && b.length && (x.value = b, X.neteaseSongs.length || (X.neteaseSongs = b));
        } catch {
        }
    }
    $();
    const L = J(() => X.neteaseSongs && X.neteaseSongs.length > 0 ? X.neteaseSongs : x.value), E = h(1), T = J(() => Math.max(1, Math.ceil(L.value.length / pt))), P = J(() => {
      const b = (E.value - 1) * pt;
      return L.value.slice(b, b + pt);
    });
    le(T, (b) => {
      E.value > b && (E.value = Math.max(1, b));
    });
    function z() {
      E.value > 1 && E.value--;
    }
    function ae() {
      E.value < T.value && E.value++;
    }
    function Z(b) {
      if (!b || !Number.isFinite(b)) return "";
      const v = Math.floor(b / 1e3), d = Math.floor(v / 60), ie = v % 60;
      return `${d}:${String(ie).padStart(2, "0")}`;
    }
    async function ee() {
      $(), _.value = !0;
      try {
        await Fe.loadNeteaseData();
        const b = (X.neteasePlaylists || []).find(
          (v) => v.name?.includes("喜欢的音乐") || v.specialType === 5
        ) || X.neteasePlaylists[0];
        if (b && await Fe.selectNeteasePlaylist(b), X.neteaseSongs && X.neteaseSongs.length > 0) {
          x.value = X.neteaseSongs;
          try {
            Ds(Ht, X.neteaseSongs);
          } catch {
          }
        } else x.value.length > 0 && (X.neteaseSongs = x.value);
      } catch (b) {
        console.warn("[DJ] 加载网易云喜欢的音乐失败，使用本地缓存:", b), $(), x.value.length > 0 && (X.neteaseSongs = x.value);
      } finally {
        _.value = !1;
      }
    }
    function ue() {
      bt.open("music");
    }
    const H = h("all"), W = h(!1);
    async function U() {
      W.value = !0;
      try {
        await Xs.init();
      } catch (b) {
        console.warn("[DJ] 初始化B站电台失败:", b);
      } finally {
        W.value = !1;
      }
    }
    const de = J(() => {
      if (H.value === "all") {
        const v = /* @__PURE__ */ new Map();
        for (const d of Be.radioSeries)
          for (const ie of d.items || [])
            ie.bvid && !v.has(ie.bvid) && v.set(ie.bvid, ie);
        for (const d of Be.radioQueue || [])
          d.bvid && !v.has(d.bvid) && v.set(d.bvid, d);
        return Array.from(v.values());
      }
      return H.value === "queue" ? Be.radioQueue || [] : Be.radioSeries.find((v) => v.id === H.value)?.items || [];
    });
    function Ue() {
      bt.open("bilibili");
    }
    const R = h(
      K.track || A.value[0]
    );
    le(
      () => K.track,
      (b) => {
        b && (R.value = { ...b });
      },
      { immediate: !0, deep: !0 }
    );
    const ke = h(!1), ve = J(() => (w.members || []).filter((b) => b.uid !== c.currentUser.uid));
    async function _e(b, v) {
      ke.value = !1, await Ks(b, v);
    }
    async function pe() {
      await Qs();
    }
    async function M(b) {
      if (!we.value) {
        Ne.fetch("海狸调音台", "播控已锁定", `当前由【${K.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
        return;
      }
      R.value = { ...b }, await st(b, "switch", !1);
    }
    async function B(b) {
      if (!we.value) {
        Ne.fetch("海狸调音台", "播控已锁定", `当前由【${K.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
        return;
      }
      const v = (b.ar || b.artists || []).map((oe) => typeof oe == "string" ? oe : oe.name).join(" / ") || "网易云歌手", d = b.al?.picUrl || b.album?.picUrl || b.picUrl || b.coverUrl || "", ie = {
        source: "netease",
        trackId: String(b.id),
        title: b.name,
        artist: v,
        cover: d
      };
      R.value = ie, await st(ie, "switch", !1);
    }
    async function G(b) {
      if (!we.value) {
        Ne.fetch("海狸调音台", "播控已锁定", `当前由【${K.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
        return;
      }
      const v = {
        source: "bilibili",
        trackId: b.bvid,
        title: b.title,
        artist: b.author || "B站UP主",
        cover: b.cover || ""
      };
      R.value = v, await st(v, "switch", !1);
    }
    async function q() {
      if (!we.value) {
        const v = Ut.getAudioElement();
        if (v && (v.paused || !X.playing))
          try {
            await v.play(), Ne.fetch("海狸同频", "已恢复本地播放", `正在与【${K.hostName}】同步收听《${R.value.title}》`);
            return;
          } catch (d) {
            console.warn("[DJ] 本地恢复播放失败:", d);
          }
        Ne.fetch("海狸调音台", "播控已锁定", `当前由【${K.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
        return;
      }
      const b = !X.playing;
      Fe.togglePlay(), K.isActive && R.value && await st(R.value, b ? "play" : "pause", !1);
    }
    function ne(b) {
      const v = Number(b.target.value);
      Fe.seek(v);
    }
    async function he() {
      await Kt(!0), It();
    }
    async function be() {
      if (R.value) {
        j.value = !0;
        try {
          await st(R.value, "switch", !0);
        } finally {
          j.value = !1;
        }
      }
    }
    function Ee() {
      const b = D.value.trim();
      if (!b) return;
      const v = b.match(/BV[a-zA-Z0-9]+/i), d = v ? v[0] : b;
      R.value = {
        source: "bilibili",
        trackId: d,
        title: `B站点播 (${d})`,
        artist: "哔哩哔哩视频音频",
        cover: ""
      }, D.value = "";
    }
    function p(b) {
      const v = b.target;
      v && (v.style.display = "none");
    }
    const r = h(60), u = h(60), te = h(!1);
    let fe = 0, Ce = 0, Le = 0, He = 0, ye = 0;
    function Se() {
      ee();
    }
    nt(async () => {
      typeof window < "u" && (r.value = Math.max(20, window.innerWidth - 560 - 30), u.value = Math.max(30, Math.floor((window.innerHeight - 600) / 2)), window.addEventListener("netease:account-updated", Se));
      try {
        const b = await Ut.getSirenSongs();
        if (b && b.length) {
          const v = b.filter((d) => d.coverUrl && d.coverUrl.startsWith("http")).map((d) => ({
            source: "siren",
            trackId: String(d.cid),
            title: d.name,
            artist: (d.artists || []).join(" / ") || "塞壬唱片-MSR",
            cover: d.coverUrl || ""
          }));
          v.length && (A.value = v, R.value.source === "siren" && !R.value.cover && (R.value = v[0]));
        }
      } catch {
      }
      ee(), U();
    }), Et(() => {
      typeof window < "u" && window.removeEventListener("netease:account-updated", Se);
    });
    function it(b) {
      if (b.target?.closest("button, input, a, select, [role='tab']")) return;
      te.value = !0, fe = b.clientX, Ce = b.clientY, Le = r.value, He = u.value;
      const d = b.currentTarget;
      try {
        d?.setPointerCapture(b.pointerId);
      } catch {
      }
      const ie = (We) => {
        if (!te.value) return;
        const yt = We.clientX - fe, Qe = We.clientY - Ce;
        ye && cancelAnimationFrame(ye), ye = requestAnimationFrame(() => {
          const Ze = Math.max(10, window.innerWidth - 200), Te = Math.max(10, window.innerHeight - 150);
          r.value = Math.min(Ze, Math.max(10, Le + yt)), u.value = Math.min(Te, Math.max(10, He + Qe));
        });
      }, oe = (We) => {
        te.value = !1, ye && (cancelAnimationFrame(ye), ye = 0), window.removeEventListener("pointermove", ie), window.removeEventListener("pointerup", oe), window.removeEventListener("pointercancel", oe);
        try {
          d?.releasePointerCapture(We.pointerId);
        } catch {
        }
      };
      window.addEventListener("pointermove", ie, { passive: !0 }), window.addEventListener("pointerup", oe, { once: !0 }), window.addEventListener("pointercancel", oe, { once: !0 });
    }
    return (b, v) => (n(), i("aside", Pn, [
      e("div", {
        class: "dj-deck-dialog",
        style: xe({ left: `${r.value}px`, top: `${u.value}px` })
      }, [
        e("header", {
          class: "dj-deck-header",
          title: "按住此处可自由拖动调音台窗口",
          onPointerdown: it
        }, [
          v[9] || (v[9] = e("div", { class: "dj-title-group" }, [
            e("span", {
              class: "dj-console-icon",
              "aria-hidden": "true"
            }, "🎛️"),
            e("div", null, [
              e("strong", { class: "dj-main-title" }, "海狸 DJ 音乐播控台"),
              e("small", { class: "dj-sub-title" }, "多人同步收听 · 塞壬唱片 / 网易云喜欢的音乐 / B站电台歌单")
            ])
          ], -1)),
          e("div", Un, [
            e("span", {
              class: F(["dj-live-status-pill", { live: o(K).isActive }])
            }, l(o(K).isActive ? "🔴 正在广播中" : "⚪ 待机就绪"), 3),
            e("button", {
              type: "button",
              class: "dj-close-btn",
              title: "关闭调音台",
              onClick: v[0] || (v[0] = //@ts-ignore
              (...d) => o(It) && o(It)(...d))
            }, " ✕ ")
          ])
        ], 32),
        e("nav", En, [
          e("button", {
            type: "button",
            class: F(["dj-source-tab", { active: y.value === "siren" }]),
            onClick: v[1] || (v[1] = (d) => y.value = "siren")
          }, [...v[10] || (v[10] = [
            e("span", { class: "tab-icon" }, "💿", -1),
            e("span", { class: "tab-text" }, "塞壬唱片 (Monster Siren)", -1)
          ])], 2),
          e("button", {
            type: "button",
            class: F(["dj-source-tab", { active: y.value === "netease" }]),
            onClick: v[2] || (v[2] = (d) => y.value = "netease")
          }, [...v[11] || (v[11] = [
            e("span", { class: "tab-icon" }, "🎵", -1),
            e("span", { class: "tab-text" }, "网易云音乐 (NetEase)", -1)
          ])], 2),
          e("button", {
            type: "button",
            class: F(["dj-source-tab", { active: y.value === "bilibili" }]),
            onClick: v[3] || (v[3] = (d) => y.value = "bilibili")
          }, [...v[12] || (v[12] = [
            e("span", { class: "tab-icon" }, "📻", -1),
            e("span", { class: "tab-text" }, "B站电台歌单 (Bilibili Radio)", -1)
          ])], 2)
        ]),
        e("div", {
          class: F(["dj-ownership-bar", { "is-host": o(we), "is-listener": !o(we) }])
        }, [
          e("div", Tn, [
            e("span", jn, l(o(we) ? "👑" : "🎧"), 1),
            e("div", Dn, [
              o(we) ? (n(), i("strong", An, "你是当前 DJ（独家播控权）")) : (n(), i("strong", Rn, "听众同频中 · 当前主持：【" + l(o(K).hostName || "房主") + "】", 1)),
              o(we) ? (n(), i("small", Bn, "你拥有播控权限，切歌与暂停将全员同步")) : (n(), i("small", Nn, "播控已被锁定，交换权力后即可自由切歌"))
            ])
          ]),
          e("div", Fn, [
            o(we) ? (n(), i("div", Ln, [
              e("button", {
                type: "button",
                class: "btn-transfer-control",
                title: "将 DJ 操控权移交给其他听友",
                onClick: v[4] || (v[4] = (d) => ke.value = !ke.value)
              }, " 🤝 移交控制权 ▾ "),
              ke.value ? (n(), i("div", Hn, [
                v[13] || (v[13] = e("div", { class: "transfer-menu-title" }, "移交打碟机给：", -1)),
                (n(!0), i(V, null, re(ve.value, (d) => (n(), i("button", {
                  key: d.uid,
                  type: "button",
                  class: "transfer-peer-item",
                  onClick: (ie) => _e(d.uid, d.name)
                }, [
                  e("span", null, l(d.name), 1),
                  e("small", null, l(d.uid.slice(0, 8)), 1)
                ], 8, Wn))), 128)),
                ve.value.length ? m("", !0) : (n(), i("div", Vn, "暂无其他在线群友"))
              ])) : m("", !0)
            ])) : (n(), i("button", {
              key: 1,
              type: "button",
              class: "btn-claim-control",
              title: "申请接管打碟机成为 DJ",
              onClick: pe
            }, " ⚡ 接管 DJ 操控权 "))
          ])
        ], 2),
        e("section", Gn, [
          e("div", {
            class: F(["dj-vinyl-disc", { spinning: o(K).isActive && o(K).isPlaying }])
          }, [
            e("div", Jn, [
              e("div", zn, [
                R.value.cover ? (n(), i("img", {
                  key: 0,
                  src: o(se)(R.value.cover),
                  class: "vinyl-cover-img",
                  referrerpolicy: "no-referrer",
                  alt: "",
                  onError: p
                }, null, 40, On)) : m("", !0),
                e("span", qn, l(R.value.source === "bilibili" ? "📻" : R.value.source === "netease" ? "🎵" : "💿"), 1),
                v[14] || (v[14] = e("div", { class: "vinyl-center-hole" }, null, -1))
              ])
            ])
          ], 2),
          e("div", Yn, [
            e("div", Xn, [
              e("div", Kn, l(R.value.source === "siren" ? "💿 塞壬官方原声" : R.value.source === "netease" ? "🎵 网易云音乐" : "📻 B站电台音频"), 1),
              e("button", {
                type: "button",
                class: "btn-send-invite-card",
                title: "在群聊中发送一张一起听邀请卡片，拉好友加入",
                disabled: j.value,
                onClick: be
              }, [...v[15] || (v[15] = [
                e("span", null, "✉️ 邀请群友", -1)
              ])], 8, Qn)
            ]),
            e("strong", {
              class: "cue-track-title",
              title: R.value.title
            }, l(R.value.title), 9, Zn),
            e("span", ei, l(R.value.artist), 1),
            e("div", ti, [
              e("span", si, l(o(X).formattedCurrent || "0:00"), 1),
              e("input", {
                type: "range",
                class: "dj-seek-slider",
                min: "0",
                max: "100",
                value: o(X).progressPercent,
                onInput: ne
              }, null, 40, ai),
              e("span", ni, l(o(X).formattedDuration || "0:00"), 1)
            ]),
            e("div", ii, [
              e("button", {
                type: "button",
                class: "dj-play-btn",
                title: o(X).playing ? "暂停" : "播放",
                onClick: q
              }, l(o(X).playing ? "⏸ 暂停" : "▶ 播放"), 9, oi),
              o(K).isActive ? (n(), i("button", {
                key: 0,
                type: "button",
                class: "dj-stop-btn",
                title: "结束当前一起听派对并关闭顶栏",
                onClick: he
              }, " ⏹ 结束派对 ")) : m("", !0),
              o(K).isActive ? (n(), i("span", li, " 🟢 同频中（" + l(o(K).listenersCount) + "人收听 · 切歌自动同步） ", 1)) : m("", !0)
            ])
          ])
        ]),
        e("main", ri, [
          y.value === "siren" ? (n(), i("div", ci, [
            e("div", ui, [
              (n(!0), i(V, null, re(S.value, (d, ie) => (n(), i("div", {
                key: d.trackId,
                class: F(["dj-track-item-card", { selected: R.value.trackId === d.trackId }]),
                onClick: (oe) => M(d)
              }, [
                e("span", vi, l((k.value - 1) * vt + ie + 1), 1),
                e("div", pi, [
                  d.cover ? (n(), i("img", {
                    key: 0,
                    src: o(se)(d.cover),
                    class: "track-thumb",
                    referrerpolicy: "no-referrer",
                    alt: "",
                    onError: p
                  }, null, 40, mi)) : m("", !0),
                  v[16] || (v[16] = e("span", { class: "track-thumb-fallback" }, "💿", -1))
                ]),
                e("div", bi, [
                  e("strong", {
                    class: "track-name",
                    title: d.title
                  }, l(d.title), 9, hi),
                  e("small", {
                    class: "track-sub",
                    title: d.artist
                  }, l(d.artist), 9, fi)
                ]),
                e("span", yi, l(R.value.trackId === d.trackId ? "已装载" : "选曲"), 1)
              ], 10, di))), 128))
            ]),
            I.value > 1 ? (n(), i("footer", gi, [
              e("span", ki, " 第 " + l(k.value) + " / " + l(I.value) + " 页 · 共 " + l(A.value.length) + " 首 ", 1),
              e("div", _i, [
                e("button", {
                  type: "button",
                  class: "btn-page-step",
                  disabled: k.value <= 1,
                  title: "上一页",
                  onClick: N
                }, " ◀ 上一页 ", 8, $i),
                e("button", {
                  type: "button",
                  class: "btn-page-step",
                  disabled: k.value >= I.value,
                  title: "下一页",
                  onClick: f
                }, " 下一页 ▶ ", 8, wi)
              ])
            ])) : m("", !0)
          ])) : y.value === "netease" ? (n(), i("div", Ci, [
            C.value?.nickname ? (n(), i("div", Si, [
              e("div", Mi, [
                C.value?.avatarUrl ? (n(), i("img", {
                  key: 0,
                  src: C.value.avatarUrl,
                  class: "netease-user-avatar",
                  alt: "",
                  referrerpolicy: "no-referrer",
                  onError: p
                }, null, 40, Ii)) : (n(), i("span", Pi, "🎵")),
                e("div", null, [
                  e("strong", Ui, [
                    Y(l(C.value?.nickname || "网易云音乐用户") + " ", 1),
                    C.value?.isVip ? (n(), i("span", Ei, "VIP")) : m("", !0)
                  ]),
                  e("small", Ti, "已载入「我喜欢的音乐」(" + l(L.value.length) + " 首)", 1)
                ])
              ]),
              e("div", ji, [
                e("button", {
                  type: "button",
                  class: "btn-refresh-fav",
                  title: _.value ? "正在刷新…" : "刷新我喜欢的音乐",
                  disabled: _.value,
                  onClick: ee
                }, l(_.value ? "⏳" : "🔄 刷新"), 9, Di)
              ])
            ])) : (n(), i("div", xi, [
              v[17] || (v[17] = e("div", { class: "bind-banner-left" }, [
                e("span", { class: "bind-banner-icon" }, "⚠️"),
                e("div", { class: "bind-banner-text" }, [
                  e("strong", null, "未绑定网易云音乐账户"),
                  e("small", null, "绑定后将在此直接同步展示你的「我喜欢的音乐」私人歌单")
                ])
              ], -1)),
              e("button", {
                type: "button",
                class: "btn-bind-action",
                onClick: ue
              }, " 🔗 立即绑定 / 扫码登录 ")
            ])),
            P.value.length > 0 ? (n(), i("div", Ai, [
              (n(!0), i(V, null, re(P.value, (d, ie) => (n(), i("div", {
                key: d.id,
                class: F(["dj-track-item-card", { selected: R.value.trackId === String(d.id) }]),
                onClick: (oe) => B(d)
              }, [
                e("span", Bi, l((E.value - 1) * pt + ie + 1), 1),
                e("div", Ni, [
                  d.al?.picUrl || d.album?.picUrl || d.picUrl ? (n(), i("img", {
                    key: 0,
                    src: o(se)(d.al?.picUrl || d.album?.picUrl || d.picUrl),
                    class: "track-thumb",
                    referrerpolicy: "no-referrer",
                    alt: "",
                    onError: p
                  }, null, 40, Fi)) : m("", !0),
                  v[18] || (v[18] = e("span", { class: "track-thumb-fallback" }, "🎵", -1))
                ]),
                e("div", Li, [
                  e("strong", {
                    class: "track-name",
                    title: d.name
                  }, l(d.name), 9, Hi),
                  e("small", {
                    class: "track-sub",
                    title: (d.ar || d.artists || []).map((oe) => typeof oe == "string" ? oe : oe.name).join(" / ")
                  }, l((d.ar || d.artists || []).map((oe) => typeof oe == "string" ? oe : oe.name).join(" / ") || "网易云歌手"), 9, Wi)
                ]),
                d.dt ? (n(), i("span", Vi, l(Z(d.dt)), 1)) : m("", !0),
                e("span", Gi, l(R.value.trackId === String(d.id) ? "已装载" : "选曲"), 1)
              ], 10, Ri))), 128))
            ])) : m("", !0),
            T.value > 1 ? (n(), i("footer", Ji, [
              e("span", zi, " 第 " + l(E.value) + " / " + l(T.value) + " 页 · 共 " + l(L.value.length) + " 首 ", 1),
              e("div", Oi, [
                e("button", {
                  type: "button",
                  class: "btn-page-step",
                  disabled: E.value <= 1,
                  title: "上一页",
                  onClick: z
                }, " ◀ 上一页 ", 8, qi),
                e("button", {
                  type: "button",
                  class: "btn-page-step",
                  disabled: E.value >= T.value,
                  title: "下一页",
                  onClick: ae
                }, " 下一页 ▶ ", 8, Yi)
              ])
            ])) : P.value.length ? m("", !0) : (n(), i("div", Xi, [
              v[19] || (v[19] = e("span", { class: "placeholder-icon" }, "🎵", -1)),
              _.value ? (n(), i("p", Ki, "正在从网易云加载「我喜欢的音乐」149 首曲库…")) : (n(), i("p", Qi, "暂无我喜欢的歌曲，点击上方「刷新」或打开网易云模块同步红心曲库"))
            ]))
          ])) : (n(), i("div", Zi, [
            e("div", eo, [
              e("div", to, [
                e("button", {
                  type: "button",
                  class: F(["series-chip", { active: H.value === "all" }]),
                  onClick: v[5] || (v[5] = (d) => H.value = "all")
                }, " 🌟 全部曲目 (" + l(de.value.length) + ") ", 3),
                o(Be).radioQueue?.length ? (n(), i("button", {
                  key: 0,
                  type: "button",
                  class: F(["series-chip", { active: H.value === "queue" }]),
                  onClick: v[6] || (v[6] = (d) => H.value = "queue")
                }, " 📻 当前队列 (" + l(o(Be).radioQueue.length) + ") ", 3)) : m("", !0),
                (n(!0), i(V, null, re(o(Be).radioSeries, (d) => (n(), i("button", {
                  key: d.id,
                  type: "button",
                  class: F(["series-chip", { active: H.value === d.id }]),
                  onClick: (ie) => H.value = d.id
                }, " 📑 " + l(d.name) + " (" + l(d.items?.length || 0) + ") ", 11, so))), 128))
              ]),
              e("button", {
                type: "button",
                class: "btn-open-workspace",
                title: "打开B站收藏夹与电台管理",
                onClick: Ue
              }, " 📺 电台管理 ")
            ]),
            e("div", ao, [
              v[20] || (v[20] = e("span", null, "B站电台歌单曲目（音频格式同频收听）", -1)),
              e("div", no, [
                Ie(e("input", {
                  "onUpdate:modelValue": v[7] || (v[7] = (d) => D.value = d),
                  placeholder: "输入 BV号 点播音频",
                  class: "custom-input",
                  onKeydown: v[8] || (v[8] = (d) => o(gs)(d, Ee))
                }, null, 544), [
                  [Pe, D.value]
                ]),
                e("button", {
                  type: "button",
                  class: "custom-add-btn",
                  disabled: !D.value.trim(),
                  onClick: Ee
                }, " 装载 ", 8, io)
              ])
            ]),
            de.value.length > 0 ? (n(), i("div", oo, [
              (n(!0), i(V, null, re(de.value, (d) => (n(), i("div", {
                key: d.bvid,
                class: F(["dj-track-item-card", { selected: R.value.trackId === d.bvid }]),
                onClick: (ie) => G(d)
              }, [
                e("div", ro, [
                  d.cover ? (n(), i("img", {
                    key: 0,
                    src: o(se)(d.cover),
                    class: "track-thumb",
                    referrerpolicy: "no-referrer",
                    alt: "",
                    onError: p
                  }, null, 40, co)) : m("", !0),
                  v[21] || (v[21] = e("span", { class: "track-thumb-fallback" }, "📻", -1))
                ]),
                e("div", uo, [
                  e("strong", vo, l(d.title), 1),
                  e("small", po, l(d.author || "B站UP主") + " · " + l(d.bvid), 1)
                ]),
                e("span", mo, l(R.value.trackId === d.bvid ? "已装载" : "选曲"), 1)
              ], 10, lo))), 128))
            ])) : (n(), i("div", bo, [
              v[22] || (v[22] = e("span", { class: "placeholder-icon" }, "📻", -1)),
              v[23] || (v[23] = e("p", null, "你的B站电台暂无已保存的歌单曲目", -1)),
              e("button", {
                type: "button",
                class: "btn-bind-action",
                onClick: Ue
              }, " 📺 前往B站模块将收藏夹加入电台 ")
            ]))
          ]))
        ])
      ], 4)
    ]));
  }
}), fo = /* @__PURE__ */ Ke(ho, [["__scopeId", "data-v-06a9ab4f"]]), yo = { class: "sticker-popover-head" }, go = { class: "sticker-head-left" }, ko = { class: "sticker-head-count" }, _o = { class: "sticker-head-actions" }, $o = ["disabled"], wo = { class: "sticker-groups-bar" }, Co = ["disabled"], xo = ["disabled", "onClick"], So = {
  key: 0,
  class: "picker-hint",
  role: "status"
}, Mo = { class: "sticker-grid-wrap" }, Io = {
  key: 0,
  class: "sticker-state-empty"
}, Po = {
  key: 1,
  class: "sticker-state-empty"
}, Uo = {
  key: 2,
  class: "sticker-grid"
}, Eo = ["disabled", "title", "onClick"], To = ["src", "alt"], jo = { class: "sticker-name-tag" }, Do = {
  key: 1,
  class: "picker-pagination",
  "aria-label": "表情包分页"
}, Ao = ["disabled"], Ro = ["disabled"], Bo = /* @__PURE__ */ Xe({
  __name: "ChatStickerPicker",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["close", "select"],
  setup(Q, { emit: y }) {
    const D = Q, j = y, A = Zt(), k = A.state, I = h(!document.hidden), S = h(!1), N = h(""), f = h(null);
    let C = !0, _ = 0;
    const x = () => C && D.active && I.value, $ = new Qt(A, x, ft, 12);
    $.onToast = (H) => {
      C && (N.value = H);
    };
    const L = J(() => k.folders.filter((H) => H.path !== ""));
    let E;
    async function T(H) {
      if (!(!x() || S.value)) {
        N.value = "";
        try {
          await A.dispatch("select-folder", H);
        } catch {
          N.value = "分类读取失败，请刷新图库";
        }
      }
    }
    async function P(H) {
      if (!x() || S.value) return;
      const W = _;
      S.value = !0;
      try {
        const U = await $.readItemBlob(H);
        if (!x() || W !== _) return;
        j("select", U), j("close");
      } catch {
        x() && (N.value = "原图读取失败，请检查图库读取权限");
      } finally {
        C && (S.value = !1);
      }
    }
    async function z(H) {
      const W = H.target, U = Array.from(W.files || []);
      if (W.value = "", !(!x() || S.value || !U.length)) {
        if (U.length > 50) {
          N.value = "一次最多导入50张，请分批选择";
          return;
        }
        S.value = !0;
        try {
          await ft(async () => {
            if (k.storageKind === "indexeddb") await $.saveFilesToIndexedDb(U);
            else {
              const de = $.getActiveTargetHandle();
              if (!de) throw new Error("图库需要重新授权，未转存内置库");
              await $.saveFilesToDir(de.handle, U, de.name);
            }
          }), x() && (N.value = "图片已加入同一图库，未发送聊天消息。");
        } catch {
          x() && (N.value = "保存未完成，可能已有部分图片写入；请核对目录与权限，不要重复导入");
        } finally {
          C && (S.value = !1);
        }
      }
    }
    async function ae() {
      if (!x() || S.value || k.loading) return;
      const H = $.getActiveTargetHandle();
      if (k.storageKind === "directory" && (!H || !await $.ensureHandlePermission(H.handle))) {
        N.value = "图片目录暂不可用，请检查已有目录授权；未更改原有数据";
        return;
      }
      x() && f.value?.click();
    }
    function Z() {
      j("close"), bt.activate("stickers");
    }
    function ee() {
      _++, $.pauseReads(), $.clearBlobUrlCache();
    }
    function ue() {
      I.value = !document.hidden, x() ? $.activate() : ee();
    }
    return le(() => D.active, (H) => {
      H && I.value ? $.activate() : ee();
    }), nt(() => {
      $.enableBoardPaging(), E = $.attachBoard(), $.init(), document.addEventListener("visibilitychange", ue);
    }), Yt(() => {
      C = !1, ee(), E?.(), $.dispose(), document.removeEventListener("visibilitychange", ue);
    }), (H, W) => (n(), i("div", {
      class: "chat-sticker-popover",
      onClick: W[4] || (W[4] = O(() => {
      }, ["stop"]))
    }, [
      e("header", yo, [
        e("div", go, [
          W[5] || (W[5] = e("span", { class: "sticker-head-title" }, "我的表情包", -1)),
          e("span", ko, "(" + l(o(k).totalCount) + ")", 1)
        ]),
        e("div", _o, [
          e("button", {
            type: "button",
            class: "sticker-act-btn",
            disabled: S.value || o(k).loading,
            onClick: ae
          }, "＋ 添加", 8, $o),
          e("button", {
            type: "button",
            class: "sticker-act-btn",
            onClick: Z
          }, "表情库"),
          e("button", {
            type: "button",
            class: "sticker-close-btn",
            "aria-label": "关闭表情面板",
            onClick: W[0] || (W[0] = (U) => j("close"))
          }, "✕")
        ])
      ]),
      e("div", wo, [
        e("button", {
          type: "button",
          class: F(["sticker-group-pill", { active: o(k).activePath === "" }]),
          disabled: S.value || o(k).loading,
          onClick: W[1] || (W[1] = (U) => T(""))
        }, "全部", 10, Co),
        (n(!0), i(V, null, re(L.value, (U) => (n(), i("button", {
          key: U.path,
          type: "button",
          class: F(["sticker-group-pill", { active: o(k).activePath === U.path }]),
          disabled: S.value || o(k).loading,
          onClick: (de) => T(U.path)
        }, l(`${"－".repeat(Math.max(0, U.depth - 1))}${U.name}`), 11, xo))), 128))
      ]),
      W[6] || (W[6] = e("p", { class: "picker-hint" }, "使用本地图库。点击发送；较大静态图会压缩，动图最多1MB。", -1)),
      N.value ? (n(), i("p", So, l(N.value), 1)) : m("", !0),
      e("div", Mo, [
        o(k).loading ? (n(), i("div", Io, "正在读取图库…")) : o(k).items.length ? (n(), i("div", Uo, [
          (n(!0), i(V, null, re(o(k).items, (U) => (n(), i("button", {
            key: U.id,
            type: "button",
            class: "sticker-grid-item",
            disabled: S.value,
            title: "发送图片：" + U.file,
            onClick: (de) => P(U)
          }, [
            U.url ? (n(), i("img", {
              key: 0,
              src: U.url,
              alt: U.file,
              class: "sticker-img",
              loading: "lazy"
            }, null, 8, To)) : m("", !0),
            e("span", jo, l(U.file), 1)
          ], 8, Eo))), 128))
        ])) : (n(), i("div", Po, l(o(k).emptyText || "当前分类没有图片，可点击“添加”导入图片。"), 1))
      ]),
      o(k).totalPages > 1 ? (n(), i("nav", Do, [
        e("button", {
          type: "button",
          disabled: S.value || o(k).loading || o(k).currentPage <= 1,
          onClick: W[2] || (W[2] = (U) => o($).prevPage())
        }, "上一页", 8, Ao),
        e("span", null, l(o(k).currentPage) + " / " + l(o(k).totalPages), 1),
        e("button", {
          type: "button",
          disabled: S.value || o(k).loading || o(k).currentPage >= o(k).totalPages,
          onClick: W[3] || (W[3] = (U) => o($).nextPage())
        }, "下一页", 8, Ro)
      ])) : m("", !0),
      e("input", {
        ref_key: "fileInputRef",
        ref: f,
        type: "file",
        accept: "image/png,image/jpeg,image/gif,image/webp,image/bmp",
        multiple: "",
        hidden: "",
        onChange: z
      }, null, 544)
    ]));
  }
}), No = /* @__PURE__ */ Ke(Bo, [["__scopeId", "data-v-56be9934"]]), Fo = { class: "status-text" }, Lo = ["title"], Ho = { class: "chat-container" }, Wo = {
  key: 0,
  role: "status",
  class: "chat-error-bar"
}, Vo = { class: "chat-error-text" }, Go = { class: "chat-error-actions" }, Jo = {
  key: 1,
  class: "chat-settings-page"
}, zo = { class: "settings-page-header" }, Oo = { class: "settings-page-body" }, qo = { class: "profile-card-right" }, Yo = {
  key: 0,
  class: "chat-profile-feedback",
  role: "status"
}, Xo = ["disabled"], Ko = { class: "settings-card setup-card-wrap" }, Qo = {
  key: 2,
  class: "chat-three-column-layout"
}, Zo = {
  open: "",
  class: "sidebar-room-members"
}, el = { class: "members-scroll-inner" }, tl = { key: 0 }, sl = ["title", "onContextmenu", "onClick"], al = { class: "member-avatar-wrap" }, nl = ["src", "onError"], il = {
  key: 1,
  class: "member-avatar-text"
}, ol = { class: "member-info-col" }, ll = { class: "member-name" }, rl = { class: "col-main-content" }, cl = { class: "current-room-bar" }, ul = { class: "room-title-info" }, dl = { class: "shared-room-description" }, vl = { key: 0 }, pl = { class: "shared-room-description" }, ml = { class: "room-bar-right-actions" }, bl = { class: "notif-bell-wrap" }, hl = {
  key: 0,
  class: "notif-count-badge"
}, fl = { class: "notif-popover-head" }, yl = { class: "notif-popover-body" }, gl = { class: "notif-user-row" }, kl = { class: "notif-avatar" }, _l = { class: "notif-info" }, $l = { class: "notif-name" }, wl = { class: "notif-uid" }, Cl = { class: "notif-action-row" }, xl = ["onClick"], Sl = ["onClick"], Ml = {
  key: 0,
  class: "notif-empty"
}, Il = {
  key: 0,
  class: "party-top-bar"
}, Pl = { class: "party-bar-text" }, Ul = { class: "party-bar-actions" }, El = ["aria-busy"], Tl = {
  key: 0,
  class: "chat-sys-banner"
}, jl = ["title", "onContextmenu"], Dl = ["src", "onError"], Al = { key: 1 }, Rl = { class: "chat-msg-content-wrap" }, Bl = { class: "chat-msg-meta" }, Nl = { class: "chat-sender-name" }, Fl = { class: "chat-msg-time" }, Ll = { class: "chat-message-actions-content" }, Hl = ["onClick"], Wl = ["onClick"], Vl = { class: "chat-msg-delivery-box" }, Gl = ["title", "aria-label"], Jl = ["onClick"], zl = ["src"], Ol = {
  key: 1,
  class: "music-icon"
}, ql = { class: "music-info" }, Yl = { class: "music-title" }, Xl = { class: "music-artist" }, Kl = ["onClick", "onContextmenu"], Ql = { class: "bili-card-title" }, Zl = { class: "bili-card-up-row" }, er = ["src"], tr = { class: "bili-up-name" }, sr = {
  key: 1,
  class: "bili-up-fans"
}, ar = { class: "bili-card-cover-wrap" }, nr = ["src"], ir = {
  key: 0,
  class: "bili-hot-tag"
}, or = { class: "bili-cover-bottom" }, lr = { key: 0 }, rr = { key: 1 }, cr = {
  key: 2,
  class: "chat-series-card"
}, ur = { class: "series-card-head" }, dr = { class: "series-title-row" }, vr = { class: "series-name" }, pr = { class: "series-items-scroll-box" }, mr = ["title", "onClick"], br = { class: "series-item-num" }, hr = ["src"], fr = { class: "series-item-title" }, yr = { class: "series-card-footer" }, gr = ["onClick"], kr = { class: "gh-card-top-row" }, _r = ["src"], $r = {
  key: 1,
  class: "gh-owner-icon"
}, wr = { class: "gh-repo-fullname" }, Cr = { class: "gh-owner-name" }, xr = { class: "gh-repo-name" }, Sr = { class: "gh-card-tags" }, Mr = { class: "gh-tag-pill" }, Ir = { class: "gh-card-desc" }, Pr = { class: "gh-card-footer" }, Ur = { class: "gh-star-stat" }, Er = { class: "gh-lang-stat" }, Tr = { class: "gh-date-stat" }, jr = ["onClick"], Dr = { class: "aihot-card-badge" }, Ar = { class: "aihot-card-title" }, Rr = {
  key: 0,
  class: "aihot-card-summary"
}, Br = { class: "aihot-card-footer" }, Nr = ["onClick"], Fr = { class: "yt-thumb-wrap" }, Lr = ["src"], Hr = { class: "yt-title" }, Wr = { class: "yt-author" }, Vr = {
  key: 6,
  class: "chat-image-bubble"
}, Gr = ["src", "onClick"], Jr = ["onClick"], zr = {
  key: 2,
  class: "chat-unsafe-tip"
}, Or = ["title", "onClick"], qr = { class: "website-card-icon-wrap" }, Yr = ["src"], Xr = {
  key: 1,
  class: "website-card-icon-fallback"
}, Kr = { class: "website-card-info" }, Qr = { class: "website-card-title" }, Zr = { class: "website-card-domain" }, ec = {
  key: 0,
  class: "website-card-note"
}, tc = ["title", "onClick"], sc = { class: "server-invite-icon-wrap" }, ac = { class: "server-invite-icon" }, nc = { class: "server-invite-info" }, ic = { class: "server-invite-head" }, oc = { class: "server-invite-title" }, lc = { class: "server-invite-origin" }, rc = {
  key: 9,
  class: "chat-party-card"
}, cc = { class: "party-card-head" }, uc = { class: "party-source-label" }, dc = { class: "party-card-main" }, vc = { class: "party-cover-wrap" }, pc = ["src"], mc = {
  key: 1,
  class: "party-cover-fallback"
}, bc = { class: "party-meta-info" }, hc = { class: "party-meta-title" }, fc = { class: "party-meta-artist" }, yc = { class: "party-meta-host" }, gc = { class: "party-card-foot" }, kc = ["onClick"], _c = {
  key: 1,
  class: "party-joined-badge"
}, $c = {
  key: 10,
  class: "chat-msg-text"
}, wc = {
  key: 0,
  role: "alert"
}, Cc = {
  key: 1,
  class: "chat-image-error",
  role: "alert"
}, xc = {
  key: 2,
  class: "chat-image-processing",
  role: "status"
}, Sc = { class: "chat-tools-strip" }, Mc = ["title", "disabled"], Ic = { class: "chat-sticker-btn-anchor" }, Pc = ["title", "disabled"], Uc = {
  key: 3,
  class: "chat-pending-image-bar"
}, Ec = { class: "pending-img-wrap" }, Tc = ["src"], jc = { class: "chat-textarea-wrap" }, Dc = ["maxlength"], Ac = ["disabled", "title"], Rc = { class: "user-card-head" }, Bc = { class: "user-card-avatar-wrap" }, Nc = ["src"], Fc = {
  key: 1,
  class: "user-card-avatar-emoji"
}, Lc = { class: "user-card-meta" }, Hc = { class: "user-card-name" }, Wc = { class: "user-card-uid" }, Vc = { class: "user-card-body" }, Gc = { class: "user-status-row" }, Jc = { class: "user-status-text" }, zc = {
  key: 0,
  class: "user-card-friend-action"
}, Oc = {
  key: 1,
  type: "button",
  class: "card-add-friend-btn",
  disabled: ""
}, qc = { class: "user-activity-section" }, Yc = { class: "activity-content-box" }, Xc = { class: "act-icon" }, Kc = { class: "act-details" }, Qc = { class: "act-title" }, Zc = { key: 0 }, eu = { key: 1 }, tu = { key: 2 }, su = { key: 3 }, au = { key: 4 }, nu = { key: 5 }, iu = ["title"], ou = { class: "chat-context-header" }, lu = { style: { "margin-left": "6px", opacity: "0.7" } }, ru = {
  key: 1,
  type: "button",
  class: "chat-context-item",
  disabled: ""
}, cu = { class: "create-room-modal-card" }, uu = { class: "create-room-title" }, du = { class: "create-room-form" }, vu = { class: "icon-selector-row" }, pu = ["onClick"], mu = { class: "create-room-actions" }, bu = ["disabled"], hu = { class: "create-room-modal-card" }, fu = { class: "create-room-title" }, yu = { class: "create-room-form" }, gu = { class: "icon-selector-row" }, ku = ["onClick"], _u = { class: "create-room-actions" }, $u = ["disabled"], wu = { class: "chat-context-header" }, Cu = { class: "chat-context-header" }, xu = { class: "create-room-modal-card" }, Su = { class: "create-room-title" }, Mu = { class: "create-room-form" }, Iu = { class: "icon-selector-row" }, Pu = ["onClick"], Uu = { class: "create-room-actions" }, Eu = ["disabled"], Tu = /* @__PURE__ */ Xe({
  __name: "ChatDialog",
  setup(Q) {
    const y = J(() => Xt(c.currentUser.uid, c.serverUrl, c.currentRoomId)), D = J(() => c.messages.filter((a) => !a.meta?.silentPartySync));
    function j(a) {
      Zs(a);
    }
    function A() {
      we.value ? Kt(!0) : (Pt(), ea());
    }
    function k(a) {
      return typeof a == "string" && a.length <= 32 && !/[:/]/.test(a) && a || "👤";
    }
    const I = J(() => Wt()), S = J(() => {
      const a = f.value.user;
      return a ? a.uid === c.currentUser.uid ? I.value || c.currentUser.activity || Wt() : w.members.find((s) => s.uid === a.uid)?.activity || c.userActivities[a.uid] || a.activity : null;
    }), N = J(() => {
      const a = f.value.user;
      if (!a) return !1;
      if (a.uid === c.currentUser.uid) return !0;
      const t = w.members.find((s) => s.uid === a.uid);
      return t ? t.online : !!a.online;
    }), f = h({
      visible: !1,
      x: 0,
      y: 0,
      user: null
    });
    function C(a, t) {
      a.preventDefault(), a.stopPropagation();
      const s = { ...t }, g = w.members.find((Re) => Re.uid === s.uid);
      g && (g.activity && (s.activity = g.activity), s.online = g.online, s.name = g.name || s.name, s.avatar = g.avatar || s.avatar), s.uid === c.currentUser.uid && I.value ? (s.activity = I.value, s.online = !0) : c.userActivities[s.uid] && (s.activity = c.userActivities[s.uid]), f.value = {
        visible: !0,
        x: a.clientX,
        y: a.clientY,
        user: s
      };
    }
    le(
      () => {
        if (!c.shareActivity) return "";
        const a = I.value;
        return a ? `${a.type}:${a.title}` : "";
      },
      () => {
        c.currentUser.activity = I.value;
      },
      { immediate: !0 }
    );
    function _() {
      f.value.visible = !1, f.value.user = null;
    }
    const x = h(null), $ = h(null);
    function L() {
      x.value?.click();
    }
    const E = h(!1), T = h(!1), P = h("");
    let z = 0, ae = !0;
    le(y, () => {
      z++, $.value = null, P.value = "";
    }), le(() => c.visible, (a) => {
      !a && E.value && z++;
    });
    async function Z(a, t = !1) {
      if (E.value || T.value) return;
      const s = ++z, g = y.value, Re = () => ae && c.visible && !document.hidden && s === z && g === y.value;
      E.value = !0, P.value = "";
      try {
        const qe = await In(a, w.capabilities);
        if (!Re()) return;
        if (t) {
          const fs = await me.sendImageMessage(qe);
          if (!Re()) return;
          fs ? he() : $.value = qe;
        } else $.value = qe;
      } catch (qe) {
        Re() && (P.value = qe?.message || Ct("chat.imageError"));
      } finally {
        ae && (E.value = !1);
      }
    }
    async function ee(a) {
      const t = a.target, s = t.files?.[0];
      t.value = "", s && await Z(s);
    }
    function ue() {
      z++, $.value = null, P.value = "";
    }
    async function H(a) {
      const t = a.clipboardData;
      if (!t) return;
      const s = Array.from(t.items || []).find((g) => g.kind === "file" && g.type.startsWith("image/"))?.getAsFile() || Array.from(t.files || []).find((g) => g.type.startsWith("image/"));
      s && (a.preventDefault(), a.stopPropagation(), await Z(s));
    }
    function W(a) {
      Z(a, !0);
    }
    const U = h({
      visible: !1,
      x: 0,
      y: 0,
      meta: null
    });
    function de(a, t) {
      a.preventDefault(), a.stopPropagation(), U.value = {
        visible: !0,
        x: a.clientX,
        y: a.clientY,
        meta: t
      };
    }
    function Ue() {
      U.value.visible = !1, U.value.meta = null;
    }
    function R(a) {
      const t = U.value.meta;
      if (Ue(), !t) return;
      const s = t.bvid || (t.aid ? `av${t.aid}` : ""), g = s ? `https://www.bilibili.com/video/${s}` : "https://www.bilibili.com";
      a === "play" ? b(t) : a === "open" ? window.open(g, "_blank", "noreferrer") : a === "copy-link" ? navigator.clipboard.writeText(g) : a === "cache" ? Gt.dispatch("organizer-video-action", {
        id: s,
        video: { bvid: s, aid: t.aid, title: t.videoTitle, cover: t.videoCover, url: g },
        action: "cache"
      }) : a === "subtitle" && Gt.dispatch("organizer-video-action", {
        id: s,
        video: { bvid: s, aid: t.aid, title: t.videoTitle, cover: t.videoCover, url: g },
        action: "subtitle"
      });
    }
    function ke(a) {
      a && Jt.openVideo({
        bvid: a.bvid || (a.aid ? `av${a.aid}` : ""),
        aid: a.aid,
        title: a.title,
        cover: a.cover,
        author: a.author
      });
    }
    const ve = h(""), _e = J(() => {
      const a = w.capabilities;
      return a.status === "unknown" || a.status === "incompatible" ? a.reason : $.value && !a.messageTypes.includes("image") ? a.reason || Ct("chat.imageNotEnabled") : ve.value.trim() && !a.messageTypes.includes("text") ? Ct("chat.textNotEnabled") : "";
    }), pe = h(null), M = h(c.currentUser.name), B = h(!1);
    le(M, () => {
      B.value = !1;
    });
    function G() {
      M.value.trim() && (Ns(M.value, c.currentUser.avatar), M.value = c.currentUser.name, at(() => {
        B.value = !0;
      }));
    }
    h(c.currentUser.avatar);
    const q = h(c.serverUrl);
    h(c.shareActivity);
    const ne = h(null);
    function he() {
      at(() => {
        pe.value && (pe.value.scrollTop = pe.value.scrollHeight);
      });
    }
    le(
      () => c.messages.length,
      () => {
        mt.value || he();
      }
    ), le(
      () => c.serverUrl,
      (a) => {
        q.value = a;
      }
    ), le(
      () => c.visible,
      (a) => {
        a && (c.unreadCount = 0, he(), q.value = c.serverUrl, me.connect());
      },
      { immediate: !0 }
    );
    const be = h(!1);
    function Ee() {
      be.value = !be.value;
    }
    async function p(a) {
      if (a)
        try {
          const t = new Qt(Zt(), () => c.visible && !document.hidden, ft, 0);
          t.isBoardPaging = !1;
          try {
            const s = await ft(() => t.saveImageToFavoritesAny(a.startsWith("data:image/") ? { dataUrl: a } : { url: a }));
            if (!s.ok) throw new Error(s.error);
            Ne.fetch("海狸表情包", "收藏成功", "已加入当前图库，未使用 Native Host。");
          } finally {
            t.dispose();
          }
        } catch (t) {
          console.warn("收藏表情失败:", t), Ne.fetch("海狸表情包", "收藏未完成", "无法读取图片数据，请重试。");
        }
    }
    function r() {
      $e(), Je.value = !1, be.value = !1;
    }
    nt(() => {
      he(), window.addEventListener("click", r);
    }), Et(() => {
      ae = !1, z++, window.removeEventListener("click", r);
    });
    async function u() {
      if (E.value || T.value) return;
      if (_e.value) {
        dt.value = _e.value;
        return;
      }
      const a = y.value, t = z, s = $.value, g = ve.value;
      if (s) {
        T.value = !0;
        try {
          if (!await me.sendImageMessage(s)) return;
          t === z && $.value === s && ($.value = null);
        } catch {
          P.value = "图片入队未确认，待发图片已保留，请检查存储";
          return;
        } finally {
          T.value = !1;
        }
      }
      if (!(a !== y.value || !ae)) {
        if (g.trim()) {
          T.value = !0;
          try {
            if (!await me.sendTextMessage(g)) return;
            ae && a === y.value && t === z && ve.value === g && (ve.value = "");
          } catch {
            dt.value = "文字入队未确认，草稿已保留，请检查存储后重试。";
          } finally {
            T.value = !1;
          }
        }
        he();
      }
    }
    function te(a) {
      ks(a) && (a.preventDefault(), u());
    }
    function fe() {
      if (!X.title) return;
      const a = Ut.getState().currentSong;
      me.sendMusicShare({
        musicTitle: X.title,
        musicArtist: X.artist || "未知歌手",
        musicCover: X.coverUrl || "",
        neteaseId: a?.neteaseId,
        sirenCid: a?.cid,
        rawSong: a?.rawSong
      });
    }
    function Ce(a) {
      if (!a) return "";
      try {
        return new URL(a).hostname;
      } catch {
        return a;
      }
    }
    function Le(a) {
      const t = Vt(a?.linkUrl);
      t && window.open(t, "_blank", "noopener,noreferrer");
    }
    async function He(a) {
      if (!a) return;
      const t = String(a.neteaseId || a.sirenCid || a.musicTitle || "");
      ne.value = t;
      try {
        a.rawSong ? await Fe.playNeteaseTrack(a.rawSong) : a.sirenCid ? Fe.playTrack(a.sirenCid) : a.neteaseId && await Fe.playNeteaseTrack({ id: a.neteaseId, name: a.musicTitle, ar: [{ name: a.musicArtist }] });
      } finally {
        setTimeout(() => {
          ne.value === t && (ne.value = null);
        }, 1200);
      }
    }
    function ye(a) {
      const t = Vt(a);
      t && window.open(t, "_blank", "noopener,noreferrer");
    }
    function Se(a) {
      return !!se(a);
    }
    function it(a, t) {
      const s = se(a);
      s && $s.open({
        source: s,
        title: t ? `${t} 发送的图片` : "聊天图片"
      });
    }
    function b(a) {
      a && Jt.openVideo({
        bvid: a.bvid,
        aid: a.aid,
        title: a.videoTitle,
        cover: a.videoCover,
        author: a.upName,
        authorFace: a.upFace,
        mid: a.upMid
      });
    }
    function v(a) {
      a?.repoUrl && ye(a.repoUrl);
    }
    const d = h(null);
    async function ie() {
      if (!(!c.serverUrl || !c.serverUrl.startsWith("http") && !c.serverUrl.startsWith("ws")))
        try {
          const a = c.serverUrl.replace(/^ws/, "http").split("?")[0].replace(/\/ws$/, "") + "/api/quota", t = await fetch(a, { cache: "no-store" });
          t.ok && (d.value = await t.json());
        } catch {
        }
    }
    le(() => c.showProfileEdit, (a) => {
      a && (M.value = c.currentUser.name, B.value = !1, ie());
    });
    const oe = J(() => {
      const a = f.value.user;
      return a?.uid ? a.uid === c.currentUser.uid ? "self" : w.friends.includes(a.uid) || c.friends.some((t) => t.uid === a.uid) ? "mutual" : c.friendRequests.some((t) => (t.toUid === a.uid || t.from.uid === a.uid) && t.status === "pending") ? "pending" : "none" : "none";
    });
    function We() {
      if (!f.value.user) return;
      const a = f.value.user;
      me.sendFriendRequest({
        uid: a.uid,
        name: a.name,
        avatar: a.avatar
      }), c.error = `✓ 已向【${a.name}】发送好友申请！`, setTimeout(() => {
        c.error.startsWith("✓ 已向") && (c.error = "");
      }, 3e3);
    }
    function yt() {
      const a = f.value.user;
      a && (_(), ht(a.uid));
    }
    const Qe = J(() => c.groups.find((a) => a.id === c.currentGroupId) || c.groups[0]), Ze = h(!1), Te = h(""), gt = h("👥");
    function es() {
      Te.value.trim() && (Fs(Te.value, gt.value || "👥"), Te.value = "", Ze.value = !1, me.connect());
    }
    const ot = h(!1), Ve = h(""), kt = h("💬");
    function ts() {
      Ve.value.trim() && (Ls(Ve.value, kt.value || "💬"), Ve.value = "", ot.value = !1, me.connect());
    }
    const je = h({
      visible: !1,
      x: 0,
      y: 0,
      group: null
    }), De = h({
      visible: !1,
      x: 0,
      y: 0,
      channel: null
    });
    function $e() {
      je.value.visible = !1, De.value.visible = !1, ce.value.visible = !1, U.value.visible = !1, Je.value = !1, _();
    }
    const ce = h({
      visible: !1,
      x: 0,
      y: 0,
      member: null
    });
    function jt(a, t) {
      a.preventDefault(), a.stopPropagation(), $e(), ce.value = {
        visible: !0,
        x: Math.min(a.clientX, window.innerWidth - 180),
        y: Math.min(a.clientY, window.innerHeight - 200),
        member: t
      };
    }
    function ss(a) {
      $e(), C({ clientX: ce.value.x, clientY: ce.value.y, preventDefault() {
      }, stopPropagation() {
      } }, a);
    }
    function as(a) {
      $e(), ht(a.uid);
    }
    function ns(a) {
      $e(), me.sendFriendRequest({
        uid: a.uid,
        name: a.name,
        avatar: a.avatar
      }), c.error = `✓ 已向【${a.name}】发送好友申请！`, setTimeout(() => {
        c.error.startsWith("✓ 已向") && (c.error = "");
      }, 3e3);
    }
    async function Dt(a) {
      $e();
      try {
        await Hs(a), c.error = `✓ 已向【${a.name}】发送服务器邀请卡片！`, setTimeout(() => {
          c.error.startsWith("✓ 已向") && (c.error = "");
        }, 3e3);
      } catch (t) {
        c.error = `发送邀请失败：${t.message || t}`, setTimeout(() => {
          c.error.startsWith("发送邀请失败") && (c.error = "");
        }, 4e3);
      }
    }
    async function is(a) {
      if (a?.inviteCode)
        try {
          await Ws(a.inviteCode), c.error = `✓ 成功加入聊天室【${a.inviteServerName || a.inviteRoom}】！`, setTimeout(() => {
            c.error.startsWith("✓ 成功加入") && (c.error = "");
          }, 4e3);
        } catch (t) {
          c.error = `加入聊天室失败：${t.message || t}`;
        }
    }
    function os(a) {
      return w.friends.includes(a) || c.friends.some((t) => t.uid === a && t.status === "mutual");
    }
    function ls(a) {
      return c.friendRequests.some((t) => (t.toUid === a || t.from.uid === a) && t.status === "pending");
    }
    const et = h(!1), _t = h("group"), lt = h(""), $t = h(""), Ae = h(""), Ge = h("💬");
    function rs(a) {
      $e(), _t.value = "group", lt.value = a.id, $t.value = `重命名群空间【${a.name}】`, Ae.value = a.name, Ge.value = a.icon || "👥", et.value = !0;
    }
    function cs(a) {
      $e(), _t.value = "channel", lt.value = a.id, $t.value = `重命名频道【${a.name}】`, Ae.value = a.name, Ge.value = a.icon || "💬", et.value = !0;
    }
    function us() {
      Ae.value.trim() && (_t.value === "group" ? Vs(lt.value, Ae.value, Ge.value) : Gs(c.currentGroupId, lt.value, Ae.value, Ge.value), et.value = !1);
    }
    function ds(a) {
      $e(), Js(c.currentGroupId, a), me.connect();
    }
    function vs(a) {
      $e(), zs(a), me.connect();
    }
    const wt = J(() => w.members), At = h(/* @__PURE__ */ new Set());
    function rt(a) {
      return a.uid === c.currentUser.uid ? c.currentUser.avatar : w.members.find((t) => t.uid === a.uid)?.avatar || a.avatar;
    }
    function ct(a) {
      const t = se(rt(a));
      return At.value.has(t) ? "" : t;
    }
    function Rt(a) {
      At.value.add(se(rt(a)));
    }
    const Je = h(!1), ze = J(() => {
      const a = Os(w.channel);
      if (!a) return null;
      const t = w.members.find((g) => g.uid === a), s = c.friends.find((g) => g.uid === a);
      return {
        uid: a,
        name: t?.name || s?.name || a,
        avatar: t?.avatar || s?.avatar || "🦫",
        online: t?.online ?? !1,
        activity: t?.activity || c.userActivities[a]
      };
    }), Oe = J(() => c.friendRequests.filter((a) => a.toUid === c.currentUser.uid && a.status === "pending"));
    function ps(a) {
      me.respondFriendRequest(a, !0);
    }
    function ms(a) {
      me.respondFriendRequest(a, !1), qs(a.id);
    }
    function bs() {
      bt.close("chat");
    }
    function hs(a) {
      const t = new Date(a), s = String(t.getHours()).padStart(2, "0"), g = String(t.getMinutes()).padStart(2, "0");
      return `${s}:${g}`;
    }
    return (a, t) => (n(), ge(o(_s), {
      "window-id": "chat",
      title: "聊天室",
      icon: "💬",
      visible: o(c).visible,
      "custom-class": "chat-workspace-window",
      "default-width": 760,
      "default-height": 600,
      "min-width": 500,
      "min-height": 460,
      onClose: bs
    }, {
      "header-left": tt(() => [
        e("div", {
          class: F(["chat-status-pill", { online: o(c).connected }])
        }, [
          t[50] || (t[50] = e("span", { class: "status-dot" }, null, -1)),
          e("span", Fo, l(o(c).connected ? "已连接私有服务器" : o(c).connecting ? "同步中…" : o(c).error ? "同步失败" : o(w).status), 1)
        ], 2)
      ]),
      "header-actions": tt(() => [
        e("button", {
          type: "button",
          class: F(["chat-icon-btn", { active: o(c).showProfileEdit }]),
          title: o(c).showProfileEdit ? "返回自习室" : "设置我的昵称与房间配置",
          onClick: t[0] || (t[0] = (s) => o(c).showProfileEdit = !o(c).showProfileEdit)
        }, l(o(c).showProfileEdit ? "💬" : "⚙️"), 11, Lo)
      ]),
      default: tt(() => [
        e("div", Ho, [
          o(c).error ? (n(), i("div", Wo, [
            e("span", Vo, l(o(c).error), 1),
            e("div", Go, [
              e("button", {
                type: "button",
                class: "error-action-btn",
                title: "立即重试连接",
                onClick: t[1] || (t[1] = (s) => o(me).resetReconnectAndConnect())
              }, "🔄 重试"),
              e("button", {
                type: "button",
                class: "error-action-btn",
                title: "打开自习室设置",
                onClick: t[2] || (t[2] = (s) => o(c).showProfileEdit = !0)
              }, "⚙️ 配置"),
              e("button", {
                type: "button",
                class: "error-close-pill",
                title: "隐藏提示",
                onClick: t[3] || (t[3] = (s) => o(c).error = "")
              }, "✕")
            ])
          ])) : m("", !0),
          o(c).showProfileEdit ? (n(), i("div", Jo, [
            e("header", zo, [
              e("button", {
                type: "button",
                class: "modern-back-btn",
                onClick: t[4] || (t[4] = (s) => o(c).showProfileEdit = !1)
              }, [...t[51] || (t[51] = [
                e("span", { class: "back-arrow" }, "←", -1),
                Y(" 返回聊天 ", -1)
              ])]),
              t[52] || (t[52] = e("div", { class: "settings-header-title" }, [
                e("span", { class: "settings-icon" }, "⚙️"),
                e("strong", null, "聊天室与网络配置")
              ], -1))
            ]),
            e("div", Oo, [
              e("form", {
                class: "settings-card chat-profile-card",
                onSubmit: O(G, ["prevent"])
              }, [
                t[53] || (t[53] = e("div", { class: "profile-card-left" }, [
                  e("span", { class: "profile-card-icon" }, "👤"),
                  e("div", { class: "profile-card-label" }, [
                    e("strong", null, "我的聊天昵称"),
                    e("small", null, "在群聊与房间中对好友展示的名字")
                  ])
                ], -1)),
                e("div", qo, [
                  Ie(e("input", {
                    "onUpdate:modelValue": t[5] || (t[5] = (s) => M.value = s),
                    class: "chat-settings-input",
                    maxlength: "100",
                    autocomplete: "off",
                    placeholder: "设置你的聊天昵称"
                  }, null, 512), [
                    [Pe, M.value]
                  ]),
                  B.value ? (n(), i("span", Yo, "✅ 已保存")) : m("", !0),
                  e("button", {
                    type: "submit",
                    class: "settings-save-btn",
                    disabled: !M.value.trim() || M.value.trim() === o(c).currentUser.name
                  }, " 保存 ", 8, Xo)
                ])
              ], 32),
              e("div", Ko, [
                ut(Ys)
              ])
            ])
          ])) : (n(), i("div", Qo, [
            ut(mn, {
              onSettings: t[6] || (t[6] = (s) => o(c).showProfileEdit = !0)
            }, {
              members: tt(() => [
                e("details", Zo, [
                  e("summary", null, "房间成员 · " + l(wt.value.length), 1),
                  e("div", el, [
                    wt.value.length ? m("", !0) : (n(), i("p", tl, l(o(As) ? o(c).error ? "成员列表尚未同步，请重试" : "正在获取成员列表…" : "尚未配置连接，请点击设置或成员与邀请。"), 1)),
                    (n(!0), i(V, null, re(wt.value, (s) => (n(), i("div", {
                      key: s.uid,
                      class: "member-item-row",
                      title: `${s.name}（${s.role === "owner" ? "群主" : "成员"} · 右键更多操作）`,
                      onContextmenu: O((g) => jt(g, s), ["prevent"]),
                      onClick: (g) => jt(g, s)
                    }, [
                      e("div", al, [
                        ct(s) ? (n(), i("img", {
                          key: 0,
                          src: ct(s),
                          class: "member-avatar-img",
                          referrerpolicy: "no-referrer",
                          loading: "lazy",
                          alt: "",
                          onError: (g) => Rt(s)
                        }, null, 40, nl)) : (n(), i("span", il, l(k(rt(s))), 1))
                      ]),
                      e("div", ol, [
                        e("span", ll, l(s.uid === o(c).currentUser.uid ? o(c).currentUser.name : s.name), 1),
                        e("small", null, l(s.role === "owner" ? "群主" : "成员"), 1)
                      ])
                    ], 40, sl))), 128))
                  ])
                ])
              ]),
              _: 1
            }),
            e("div", rl, [
              e("div", cl, [
                e("div", ul, [
                  ze.value ? (n(), i(V, { key: 0 }, [
                    e("strong", null, "💬 与【" + l(ze.value.name) + "】私聊", 1),
                    e("small", dl, [
                      e("span", {
                        class: F(["user-status-dot", { online: ze.value.online }])
                      }, null, 2),
                      Y(" " + l(ze.value.online ? "当前在线" : "离线") + " ", 1),
                      ze.value.activity?.title ? (n(), i("span", vl, " · " + l(ze.value.activity.title), 1)) : m("", !0)
                    ])
                  ], 64)) : (n(), i(V, { key: 1 }, [
                    e("strong", null, l(o(w).rooms.find((s) => s.id === o(w).channel)?.name || "私有聊天室"), 1),
                    e("small", pl, l(o(w).rooms.find((s) => s.id === o(w).channel)?.description), 1)
                  ], 64))
                ]),
                e("div", ml, [
                  e("div", bl, [
                    e("button", {
                      type: "button",
                      class: F(["btn-notif-bell", { "has-unread": Oe.value.length > 0 }]),
                      title: "好友申请通知",
                      onClick: t[7] || (t[7] = O((s) => Je.value = !Je.value, ["stop"]))
                    }, [
                      t[54] || (t[54] = e("span", { class: "notif-icon" }, "🔔", -1)),
                      Oe.value.length > 0 ? (n(), i("span", hl, l(Oe.value.length), 1)) : m("", !0)
                    ], 2),
                    Je.value ? (n(), i("div", {
                      key: 0,
                      class: "notif-dropdown-popover",
                      onClick: t[9] || (t[9] = O(() => {
                      }, ["stop"]))
                    }, [
                      e("div", fl, [
                        e("strong", null, "好友申请 (" + l(Oe.value.length) + ")", 1),
                        e("button", {
                          type: "button",
                          class: "notif-close-btn",
                          onClick: t[8] || (t[8] = O((s) => Je.value = !1, ["stop"]))
                        }, "✕")
                      ]),
                      e("div", yl, [
                        (n(!0), i(V, null, re(Oe.value, (s) => (n(), i("div", {
                          key: s.id,
                          class: "notif-req-card"
                        }, [
                          e("div", gl, [
                            e("span", kl, l(s.from.avatar || "🦫"), 1),
                            e("div", _l, [
                              e("span", $l, l(s.from.name), 1),
                              e("small", wl, l(s.from.uid), 1)
                            ])
                          ]),
                          e("div", Cl, [
                            e("button", {
                              type: "button",
                              class: "notif-btn-accept",
                              onClick: O((g) => ps(s), ["stop"])
                            }, "✓ 同意", 8, xl),
                            e("button", {
                              type: "button",
                              class: "notif-btn-reject",
                              onClick: O((g) => ms(s), ["stop"])
                            }, "忽略", 8, Sl)
                          ])
                        ]))), 128)),
                        Oe.value.length ? m("", !0) : (n(), i("p", Ml, "暂无待处理的好友申请"))
                      ])
                    ])) : m("", !0)
                  ]),
                  e("button", {
                    type: "button",
                    class: "btn-invite-room",
                    title: "在设置中管理独立成员邀请",
                    onClick: t[10] || (t[10] = (s) => o(c).showProfileEdit = !0)
                  }, [...t[55] || (t[55] = [
                    e("span", { class: "invite-icon" }, "🔗", -1),
                    e("span", null, "成员与邀请", -1)
                  ])])
                ])
              ]),
              o(K).isActive && o(K).track ? (n(), i("div", Il, [
                e("div", {
                  class: "party-bar-info",
                  onClick: t[11] || (t[11] = //@ts-ignore
                  (...s) => o(Ye) && o(Ye)(...s))
                }, [
                  e("span", {
                    class: F(["party-disc-icon", { spinning: o(K).isPlaying }])
                  }, "💿", 2),
                  e("div", Pl, [
                    e("strong", null, "一起听：" + l(o(K).track.title), 1),
                    e("small", null, "【" + l(o(K).hostName) + "】正在点播 · " + l(o(K).listenersCount) + " 人收听", 1)
                  ])
                ]),
                e("div", Ul, [
                  o(K).isJoined ? (n(), i("button", {
                    key: 1,
                    type: "button",
                    class: "party-btn-leave",
                    onClick: t[13] || (t[13] = //@ts-ignore
                    (...s) => o(Pt) && o(Pt)(...s))
                  }, " 退出 ")) : (n(), i("button", {
                    key: 0,
                    type: "button",
                    class: "party-btn-join",
                    onClick: t[12] || (t[12] = //@ts-ignore
                    (...s) => o(zt) && o(zt)(...s))
                  }, " 🎧 加入一起听 ")),
                  e("button", {
                    type: "button",
                    class: "party-btn-dj",
                    title: "打开 DJ 播控台",
                    onClick: t[14] || (t[14] = //@ts-ignore
                    (...s) => o(Ye) && o(Ye)(...s))
                  }, " 🎛️ 调音台 "),
                  e("button", {
                    type: "button",
                    class: "party-btn-close",
                    title: "关闭/结束一起听栏",
                    onClick: A
                  }, " ✕ ")
                ])
              ])) : m("", !0),
              e("div", {
                ref_key: "messagesContainer",
                ref: pe,
                class: "chat-messages-area",
                "aria-busy": o(w).syncing
              }, [
                ut(xn, {
                  items: D.value,
                  "scroll-host": pe.value,
                  active: o(c).visible,
                  "reset-key": y.value,
                  estimate: 112,
                  gap: 12
                }, {
                  default: tt(({ item: s }) => [
                    (n(), i("div", {
                      key: s.id,
                      class: F(["chat-msg-row", {
                        "is-me": s.sender.uid === o(c).currentUser.uid,
                        "is-sys": s.type === "system"
                      }])
                    }, [
                      s.type === "system" ? (n(), i("div", Tl, [
                        e("span", null, l(s.content), 1)
                      ])) : (n(), i(V, { key: 1 }, [
                        e("div", {
                          class: "chat-avatar clickable",
                          title: `${s.sender.name} (右键查看状态)`,
                          onContextmenu: (g) => C(g, s.sender)
                        }, [
                          ct(s.sender) ? (n(), i("img", {
                            key: 0,
                            src: ct(s.sender),
                            class: "chat-avatar-img",
                            referrerpolicy: "no-referrer",
                            loading: "lazy",
                            alt: "",
                            onError: (g) => Rt(s.sender)
                          }, null, 40, Dl)) : (n(), i("span", Al, l(k(rt(s.sender))), 1))
                        ], 40, jl),
                        e("div", Rl, [
                          e("div", Bl, [
                            e("span", Nl, l(s.sender.uid === o(c).currentUser.uid ? o(c).currentUser.name : s.sender.name), 1),
                            e("span", Fl, l(hs(s.timestamp)), 1),
                            s.sender.uid === o(c).currentUser.uid ? (n(), i("details", {
                              class: "chat-message-actions",
                              name: "chat-message-actions",
                              key: y.value + s.id
                            }, [
                              t[56] || (t[56] = e("summary", {
                                "aria-label": "消息详情与操作",
                                title: "消息详情与操作"
                              }, "⋯", -1)),
                              e("div", Ll, [
                                e("span", null, l(o(St)(y.value, s.id)), 1),
                                e("button", {
                                  type: "button",
                                  class: "chat-tool-btn",
                                  title: "重新加入本房间待发队列，服务器按消息 ID 去重",
                                  onClick: (g) => o(me).retryMessage(s)
                                }, "重试发送", 8, Hl),
                                e("button", {
                                  type: "button",
                                  class: "chat-tool-btn",
                                  title: "停止自动补发，不撤回已发出的消息",
                                  onClick: (g) => o(Rs)(y.value, s.id)
                                }, "暂停补发", 8, Wl)
                              ])
                            ])) : m("", !0)
                          ]),
                          e("div", Vl, [
                            s.sender.uid === o(c).currentUser.uid && ["sending", "failed"].includes(o(Mt)(y.value, s.id)) ? (n(), i("span", {
                              key: 0,
                              class: F(["chat-delivery-indicator", o(Mt)(y.value, s.id) === "failed" ? "is-failed" : "is-sending"]),
                              role: "status",
                              tabindex: "0",
                              title: o(St)(y.value, s.id),
                              "aria-label": o(St)(y.value, s.id)
                            }, l(o(Mt)(y.value, s.id) === "failed" ? "!" : ""), 11, Gl)) : m("", !0),
                            e("div", {
                              class: F(["chat-msg-bubble", { "is-share-card": ["music", "bilibili", "bili_series", "github", "aihot", "youtube", "website", "server_invite", "music_party"].includes(s.type) }])
                            }, [
                              s.type === "music" ? (n(), i("div", {
                                key: 0,
                                class: "chat-music-card clickable",
                                title: "点击立即在我的音乐播放器中播放这首歌",
                                onClick: (g) => He(s.meta)
                              }, [
                                s.meta?.musicCover ? (n(), i("img", {
                                  key: 0,
                                  referrerpolicy: "no-referrer",
                                  src: o(se)(s.meta.musicCover),
                                  class: "music-cover-img",
                                  alt: ""
                                }, null, 8, zl)) : (n(), i("span", Ol, "🎵")),
                                e("div", ql, [
                                  e("strong", Yl, l(s.meta?.musicTitle), 1),
                                  e("small", Xl, l(s.meta?.musicArtist), 1)
                                ]),
                                e("button", {
                                  type: "button",
                                  class: F(["music-play-btn", { loading: ne.value === String(s.meta?.neteaseId || s.meta?.sirenCid || s.meta?.musicTitle || "") }]),
                                  title: "点击播放"
                                }, [
                                  ne.value === String(s.meta?.neteaseId || s.meta?.sirenCid || s.meta?.musicTitle || "") ? (n(), i(V, { key: 0 }, [
                                    Y("⏳")
                                  ], 64)) : (n(), i(V, { key: 1 }, [
                                    Y("▶")
                                  ], 64))
                                ], 2)
                              ], 8, Jl)) : s.type === "bilibili" ? (n(), i("div", {
                                key: 1,
                                class: "chat-bili-card clickable",
                                title: "左键小窗播放，右键打开操作菜单",
                                onClick: (g) => b(s.meta),
                                onContextmenu: (g) => de(g, s.meta)
                              }, [
                                t[59] || (t[59] = e("div", { class: "bili-card-header" }, [
                                  e("span", { class: "bili-badge-pink" }, "📺 哔哩哔哩")
                                ], -1)),
                                e("div", Ql, l(s.meta?.videoTitle), 1),
                                e("div", Zl, [
                                  s.meta?.upFace ? (n(), i("img", {
                                    key: 0,
                                    referrerpolicy: "no-referrer",
                                    src: o(se)(s.meta.upFace),
                                    class: "bili-up-avatar",
                                    alt: ""
                                  }, null, 8, er)) : m("", !0),
                                  e("span", tr, l(s.meta?.upName), 1),
                                  t[57] || (t[57] = e("span", { class: "bili-up-tag" }, "UP主", -1)),
                                  s.meta?.upFans ? (n(), i("span", sr, l(s.meta?.upFans) + "粉丝", 1)) : m("", !0)
                                ]),
                                e("div", ar, [
                                  e("img", {
                                    referrerpolicy: "no-referrer",
                                    src: o(se)(s.meta?.videoCover),
                                    class: "bili-cover-img",
                                    alt: "",
                                    loading: "lazy"
                                  }, null, 8, nr),
                                  s.meta?.isHot ? (n(), i("span", ir, "B站热门")) : m("", !0),
                                  t[58] || (t[58] = e("div", { class: "bili-play-overlay" }, [
                                    e("span", { class: "bili-play-icon" }, "▶")
                                  ], -1)),
                                  e("div", or, [
                                    e("span", null, l(s.meta?.playCount ? `${s.meta.playCount}播放` : "近期热门"), 1),
                                    s.meta?.likeCount ? (n(), i("span", lr, l(s.meta.likeCount) + "点赞", 1)) : m("", !0),
                                    s.meta?.danmakuCount ? (n(), i("span", rr, l(s.meta.danmakuCount) + "弹幕", 1)) : m("", !0)
                                  ])
                                ])
                              ], 40, Kl)) : s.type === "bili_series" ? (n(), i("div", cr, [
                                e("div", ur, [
                                  e("div", dr, [
                                    t[60] || (t[60] = e("span", { class: "series-icon" }, "📻", -1)),
                                    e("strong", vr, l(s.meta?.seriesName), 1)
                                  ])
                                ]),
                                e("div", pr, [
                                  (n(!0), i(V, null, re(s.meta?.seriesItems || [], (g, Re) => (n(), i("div", {
                                    key: g.bvid || Re,
                                    class: "series-item-row",
                                    title: `点击立即播放：${g.title}`,
                                    onClick: (qe) => ke(g)
                                  }, [
                                    e("span", br, l(Re + 1), 1),
                                    g.cover ? (n(), i("img", {
                                      key: 0,
                                      referrerpolicy: "no-referrer",
                                      src: o(se)(g.cover),
                                      class: "series-item-thumb",
                                      alt: "",
                                      loading: "lazy"
                                    }, null, 8, hr)) : m("", !0),
                                    e("div", fr, l(g.title), 1)
                                  ], 8, mr))), 128))
                                ]),
                                e("div", yr, [
                                  e("span", null, "共 " + l(s.meta?.seriesCount || s.meta?.seriesItems?.length || 0) + " 首音乐 · 点击任意曲目播放", 1)
                                ])
                              ])) : s.type === "github" ? (n(), i("div", {
                                key: 3,
                                class: "chat-github-card clickable",
                                title: "点击在新标签页打开此仓库",
                                onClick: (g) => v(s.meta)
                              }, [
                                e("div", kr, [
                                  s.meta?.repoOwnerAvatar ? (n(), i("img", {
                                    key: 0,
                                    referrerpolicy: "no-referrer",
                                    src: o(se)(s.meta.repoOwnerAvatar),
                                    class: "gh-owner-avatar",
                                    alt: ""
                                  }, null, 8, _r)) : (n(), i("span", $r, "🐙")),
                                  e("span", wr, [
                                    e("span", Cr, l(s.meta?.repoOwner), 1),
                                    t[61] || (t[61] = Y("/", -1)),
                                    e("strong", xr, l(s.meta?.repoName), 1)
                                  ]),
                                  t[62] || (t[62] = e("span", { class: "gh-more-dot" }, "⋮", -1))
                                ]),
                                e("div", Sr, [
                                  e("span", Mr, "+ " + l(s.meta?.repoCategory || "未分类"), 1)
                                ]),
                                e("div", Ir, l(s.meta?.repoDesc), 1),
                                e("div", Pr, [
                                  e("span", Ur, "★ " + l(s.meta?.repoStars || 0), 1),
                                  e("span", Er, l(s.meta?.repoLanguage || "Plain Text"), 1),
                                  e("span", Tr, "更新 " + l(s.meta?.repoUpdatedAt), 1)
                                ])
                              ], 8, gr)) : s.type === "aihot" ? (n(), i("div", {
                                key: 4,
                                class: "chat-aihot-card clickable",
                                title: "点击打开 AI 资讯",
                                onClick: (g) => ye(s.meta?.aihotUrl)
                              }, [
                                e("div", Dr, "🔥 " + l(s.meta?.aihotCategory || "AI 资讯"), 1),
                                e("strong", Ar, l(s.meta?.aihotTitle), 1),
                                s.meta?.aihotSummary ? (n(), i("p", Rr, l(s.meta?.aihotSummary), 1)) : m("", !0),
                                e("div", Br, [
                                  e("span", null, l(s.meta?.aihotSource), 1),
                                  e("span", null, l(s.meta?.aihotDate), 1)
                                ])
                              ], 8, jr)) : s.type === "youtube" ? (n(), i("div", {
                                key: 5,
                                class: "chat-youtube-card clickable",
                                title: "点击在 YouTube 观看",
                                onClick: (g) => ye(s.meta?.youtubeUrl)
                              }, [
                                e("div", Fr, [
                                  s.meta?.youtubeCover ? (n(), i("img", {
                                    key: 0,
                                    referrerpolicy: "no-referrer",
                                    src: o(se)(s.meta.youtubeCover),
                                    class: "yt-thumb",
                                    alt: "",
                                    loading: "lazy"
                                  }, null, 8, Lr)) : m("", !0),
                                  t[63] || (t[63] = e("span", { class: "yt-badge" }, "YouTube", -1))
                                ]),
                                e("strong", Hr, l(s.meta?.youtubeTitle), 1),
                                e("div", Wr, l(s.meta?.youtubeAuthor), 1)
                              ], 8, Nr)) : s.type === "image" ? (n(), i("div", Vr, [
                                Se(s.meta?.imageUrl) ? (n(), i("img", {
                                  key: 0,
                                  referrerpolicy: "no-referrer",
                                  src: o(se)(s.meta?.imageUrl),
                                  class: "chat-sent-image",
                                  alt: "发送的图片",
                                  loading: "lazy",
                                  title: "点击查看大图",
                                  onClick: (g) => it(s.meta?.imageUrl, s.sender?.name)
                                }, null, 8, Gr)) : m("", !0),
                                Se(s.meta?.imageUrl) ? (n(), i("button", {
                                  key: 1,
                                  type: "button",
                                  class: "chat-collect-sticker-btn",
                                  title: "收藏到我的表情包",
                                  onClick: O((g) => p(s.meta?.imageUrl), ["stop"])
                                }, " ⭐ 存为表情 ", 8, Jr)) : (n(), i("div", zr, "⚠️ 非法或不安全的图片协议"))
                              ])) : s.type === "website" ? (n(), i("div", {
                                key: 7,
                                class: "chat-website-card clickable",
                                title: `点击在新标签页打开：${s.meta?.linkUrl || ""}`,
                                onClick: (g) => Le(s.meta)
                              }, [
                                e("div", qr, [
                                  o(se)(s.meta?.linkIcon) ? (n(), i("img", {
                                    key: 0,
                                    src: o(se)(s.meta?.linkIcon),
                                    class: "website-card-icon-img",
                                    alt: "",
                                    loading: "lazy",
                                    referrerpolicy: "no-referrer",
                                    onError: t[15] || (t[15] = (g) => g.target.style.display = "none")
                                  }, null, 40, Yr)) : (n(), i("span", Xr, "🌐"))
                                ]),
                                e("div", Kr, [
                                  e("strong", Qr, l(s.meta?.linkTitle || "常用网站"), 1),
                                  e("span", Zr, l(Ce(s.meta?.linkUrl)), 1),
                                  s.meta?.linkNote ? (n(), i("small", ec, l(s.meta?.linkNote), 1)) : m("", !0)
                                ]),
                                t[64] || (t[64] = e("span", {
                                  class: "website-card-arrow",
                                  "aria-hidden": "true"
                                }, "↗", -1))
                              ], 8, Or)) : s.type === "server_invite" ? (n(), i("div", {
                                key: 8,
                                class: "chat-server-invite-card clickable",
                                title: `点击直接加入聊天室：${s.meta?.inviteServerName || s.meta?.inviteRoom || ""}`,
                                onClick: (g) => is(s.meta)
                              }, [
                                e("div", sc, [
                                  e("span", ac, l(s.meta?.inviteServerIcon || "🏠"), 1)
                                ]),
                                e("div", nc, [
                                  e("div", ic, [
                                    e("strong", oc, "邀请加入：" + l(s.meta?.inviteServerName || s.meta?.inviteRoom), 1),
                                    t[65] || (t[65] = e("span", {
                                      class: "server-invite-arrow",
                                      title: "立即加入"
                                    }, "↗", -1))
                                  ]),
                                  e("span", lc, l(s.meta?.inviteOrigin || "海狸私有服务器"), 1),
                                  t[66] || (t[66] = e("small", { class: "server-invite-hint" }, "点击直接加入此聊天室", -1))
                                ])
                              ], 8, tc)) : s.type === "music_party" ? (n(), i("div", rc, [
                                e("div", cc, [
                                  t[67] || (t[67] = e("span", { class: "party-card-badge" }, "🎧 音乐派对 · 一起听", -1)),
                                  e("span", uc, l(s.meta?.partySource === "bilibili" ? "📺 B站音频" : s.meta?.partySource === "netease" ? "🎵 网易云" : "💿 塞壬唱片"), 1)
                                ]),
                                e("div", dc, [
                                  e("div", vc, [
                                    o(se)(s.meta?.partyCover) ? (n(), i("img", {
                                      key: 0,
                                      src: o(se)(s.meta?.partyCover),
                                      class: "party-cover-img",
                                      referrerpolicy: "no-referrer",
                                      alt: "",
                                      onError: t[16] || (t[16] = (g) => g.target.style.display = "none")
                                    }, null, 40, pc)) : (n(), i("span", mc, "💿")),
                                    t[68] || (t[68] = e("span", { class: "party-play-indicator" }, "▶", -1))
                                  ]),
                                  e("div", bc, [
                                    e("strong", hc, l(s.meta?.partyTitle), 1),
                                    e("span", fc, l(s.meta?.partyArtist), 1),
                                    e("small", yc, "由【" + l(s.sender.name) + "】发起的同频收听", 1)
                                  ])
                                ]),
                                e("div", gc, [
                                  !o(K).isJoined || o(K).track?.trackId !== s.meta?.partyTrackId ? (n(), i("button", {
                                    key: 0,
                                    type: "button",
                                    class: "party-join-btn",
                                    onClick: (g) => j(s)
                                  }, " 🎧 加入一起听 ", 8, kc)) : (n(), i("span", _c, "✓ 正在同步收听中"))
                                ])
                              ])) : (n(), i("div", $c, l(s.content), 1))
                            ], 2)
                          ])
                        ])
                      ], 64))
                    ], 2))
                  ]),
                  _: 1
                }, 8, ["items", "scroll-host", "active", "reset-key"])
              ], 8, El),
              e("div", {
                class: "chat-input-bar",
                onPaste: H
              }, [
                o(dt) ? (n(), i("p", wc, l(o(dt)), 1)) : m("", !0),
                P.value ? (n(), i("p", Cc, l(P.value), 1)) : m("", !0),
                E.value ? (n(), i("p", xc, "正在处理图片…")) : m("", !0),
                e("div", Sc, [
                  ut($n, { container: pe.value }, null, 8, ["container"]),
                  e("button", {
                    type: "button",
                    class: "chat-tool-btn",
                    title: o(w).imageMessagesSupported ? "发送图片（支持截图直接 Ctrl+V 粘贴）" : o(w).capabilities.reason,
                    disabled: E.value || T.value || !o(w).imageMessagesSupported,
                    onClick: L
                  }, " 🖼️ 图片 ", 8, Mc),
                  e("input", {
                    ref_key: "imageInputRef",
                    ref: x,
                    type: "file",
                    accept: "image/png,image/jpeg,image/gif,image/webp,image/bmp",
                    style: { display: "none" },
                    onChange: ee
                  }, null, 544),
                  e("button", {
                    type: "button",
                    class: "chat-tool-btn dj-tool-btn",
                    title: "打开海狸 DJ 音乐播控台（多音源一起听）",
                    onClick: t[17] || (t[17] = //@ts-ignore
                    (...s) => o(Ye) && o(Ye)(...s))
                  }, " 🎛️ 一起听 / DJ "),
                  e("div", Ic, [
                    e("button", {
                      type: "button",
                      class: F(["chat-tool-btn sticker-tool-btn", { "is-active": be.value }]),
                      title: o(w).imageMessagesSupported ? "打开表情包面板，点击即可直接发送" : o(w).capabilities.reason,
                      disabled: !o(w).imageMessagesSupported,
                      onClick: O(Ee, ["stop"])
                    }, " 😜 表情包 ", 10, Pc),
                    be.value ? (n(), ge(No, {
                      key: 0,
                      active: o(c).visible && o(w).imageMessagesSupported && !E.value && !T.value,
                      onClose: t[18] || (t[18] = (s) => be.value = !1),
                      onSelect: W
                    }, null, 8, ["active"])) : m("", !0)
                  ]),
                  o(X).playing && o(X).title ? (n(), i("button", {
                    key: 0,
                    type: "button",
                    class: "chat-tool-btn",
                    title: "分享正在播放的歌曲",
                    onClick: fe
                  }, " 🎵 分享正在听的歌 ")) : m("", !0)
                ]),
                $.value ? (n(), i("div", Uc, [
                  e("div", Ec, [
                    e("img", {
                      referrerpolicy: "no-referrer",
                      src: o(se)($.value),
                      class: "pending-preview-thumb",
                      alt: "待发预览",
                      title: "点击查看大图",
                      style: { cursor: "pointer" },
                      onClick: t[19] || (t[19] = (s) => it($.value, "待发图片"))
                    }, null, 8, Tc),
                    e("button", {
                      type: "button",
                      class: "modal-close-pill pending-del-pill",
                      title: "撤销该图片",
                      onClick: ue
                    }, "✕")
                  ]),
                  t[69] || (t[69] = e("span", { class: "pending-tip" }, "已就绪 · 点击发送或按 Enter 发出", -1))
                ])) : m("", !0),
                e("div", jc, [
                  Ie(e("textarea", {
                    "onUpdate:modelValue": t[20] || (t[20] = (s) => ve.value = s),
                    maxlength: o(Bs),
                    class: "chat-textarea",
                    placeholder: "聊点什么…（支持直接按 Ctrl+V 粘贴截图）",
                    "aria-label": "消息内容，Enter 发送，Shift+Enter 换行",
                    title: "Enter 发送 · Shift+Enter 换行 · 支持 Ctrl+V 粘贴图片",
                    rows: "2",
                    onKeydown: te,
                    onPaste: H
                  }, null, 40, Dc), [
                    [Pe, ve.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "chat-send-btn",
                    disabled: E.value || T.value || !!_e.value || !ve.value.trim() && !$.value,
                    title: _e.value || "发送消息",
                    onClick: u
                  }, " 发送 ", 8, Ac)
                ])
              ], 32)
            ])
          ])),
          (n(), ge(Me, { to: "body" }, [
            f.value.visible && f.value.user ? (n(), i("div", {
              key: 0,
              class: "chat-user-card-modal",
              style: xe({ left: `${Math.min(f.value.x, 600)}px`, top: `${Math.min(f.value.y, 400)}px` }),
              onClick: t[22] || (t[22] = O(() => {
              }, ["stop"]))
            }, [
              e("div", Rc, [
                e("div", Bc, [
                  o(se)(f.value.user.avatar) ? (n(), i("img", {
                    key: 0,
                    src: o(se)(f.value.user.avatar),
                    class: "user-card-avatar-img",
                    referrerpolicy: "no-referrer",
                    alt: ""
                  }, null, 8, Nc)) : (n(), i("span", Fc, l(k(f.value.user.avatar)), 1))
                ]),
                e("div", Lc, [
                  e("strong", Hc, l(f.value.user.name), 1),
                  e("small", Wc, "UID: " + l(f.value.user.uid), 1)
                ]),
                e("button", {
                  type: "button",
                  class: "modal-close-pill",
                  title: "关闭名片",
                  onClick: _
                }, "✕")
              ]),
              e("div", Vc, [
                e("div", Gc, [
                  e("span", {
                    class: F(["user-status-dot", { online: N.value }])
                  }, null, 2),
                  e("span", Jc, l(N.value ? "当前在线" : "离线"), 1)
                ]),
                f.value.user?.uid !== o(c).currentUser.uid ? (n(), i("div", zc, [
                  oe.value === "mutual" ? (n(), i("button", {
                    key: 0,
                    type: "button",
                    class: "card-add-friend-btn active-dm",
                    onClick: yt
                  }, " 💬 发送私聊 ")) : oe.value === "pending" ? (n(), i("button", Oc, " ⏳ 已发申请 · 等待对方确认 ")) : (n(), i("button", {
                    key: 2,
                    type: "button",
                    class: "card-add-friend-btn",
                    onClick: We
                  }, " ➕ 添加为好友 ")),
                  e("button", {
                    type: "button",
                    class: "card-add-friend-btn invite-action-btn",
                    onClick: t[21] || (t[21] = (s) => Dt(f.value.user))
                  }, " 📨 邀请加入服务器卡片 ")
                ])) : m("", !0),
                e("div", qc, [
                  t[72] || (t[72] = e("div", { class: "activity-label" }, "当前动态 (实时同步)", -1)),
                  e("div", Yc, [
                    S.value?.title ? (n(), i(V, { key: 0 }, [
                      e("span", Xc, l(S.value.type === "bilibili" ? "📺" : S.value.type === "github" ? "🐙" : S.value.type === "aihot" ? "🔥" : S.value.type === "youtube" ? "▶️" : "🎵"), 1),
                      e("div", Kc, [
                        e("strong", Qc, l(S.value.title), 1),
                        S.value.type === "bilibili" ? (n(), i("small", Zc, "正在 B站 观看视频")) : S.value.type === "github" ? (n(), i("small", eu, "正在研读代码仓库")) : S.value.type === "aihot" ? (n(), i("small", tu, "正在阅读 AI 热点")) : S.value.type === "youtube" ? (n(), i("small", su, "正在观看 YouTube")) : S.value.type === "music" ? (n(), i("small", au, "正在聆听音乐")) : (n(), i("small", nu, "正在新标签页活动"))
                      ])
                    ], 64)) : (n(), i(V, { key: 1 }, [
                      t[70] || (t[70] = e("span", { class: "act-icon" }, "☕", -1)),
                      t[71] || (t[71] = e("span", { class: "act-idle" }, "正在新标签页摸鱼发呆中…", -1))
                    ], 64))
                  ])
                ])
              ])
            ], 4)) : m("", !0)
          ])),
          (n(), ge(Me, { to: "body" }, [
            U.value.visible && U.value.meta ? (n(), i("div", {
              key: 0,
              class: "chat-context-menu",
              style: xe({ left: `${U.value.x}px`, top: `${U.value.y}px` }),
              onClick: t[28] || (t[28] = O(() => {
              }, ["stop"]))
            }, [
              e("div", {
                class: "chat-context-header",
                title: U.value.meta.videoTitle
              }, l(U.value.meta.videoTitle), 9, iu),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[23] || (t[23] = (s) => R("play"))
              }, [...t[73] || (t[73] = [
                e("span", { class: "chat-context-icon" }, "▶", -1),
                Y(" 小窗播放视频 ", -1)
              ])]),
              t[78] || (t[78] = e("div", { class: "chat-context-divider" }, null, -1)),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[24] || (t[24] = (s) => R("open"))
              }, [...t[74] || (t[74] = [
                e("span", { class: "chat-context-icon" }, "↗", -1),
                Y(" 跳转到 B站 ", -1)
              ])]),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[25] || (t[25] = (s) => R("copy-link"))
              }, [...t[75] || (t[75] = [
                e("span", { class: "chat-context-icon" }, "📋", -1),
                Y(" 复制链接 ", -1)
              ])]),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[26] || (t[26] = (s) => R("cache"))
              }, [...t[76] || (t[76] = [
                e("span", { class: "chat-context-icon" }, "💾", -1),
                Y(" 缓存视频 ", -1)
              ])]),
              t[79] || (t[79] = e("div", { class: "chat-context-divider" }, null, -1)),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[27] || (t[27] = (s) => R("subtitle"))
              }, [...t[77] || (t[77] = [
                e("span", { class: "chat-context-icon" }, "▤", -1),
                Y(" 字幕转文本 ", -1)
              ])])
            ], 4)) : m("", !0)
          ])),
          (n(), ge(Me, { to: "body" }, [
            ce.value.visible && ce.value.member ? (n(), i("div", {
              key: 0,
              class: "chat-context-menu",
              style: xe({ left: `${ce.value.x}px`, top: `${ce.value.y}px` }),
              onClick: t[33] || (t[33] = O(() => {
              }, ["stop"]))
            }, [
              e("div", ou, [
                e("strong", null, l(ce.value.member.name), 1),
                e("small", lu, l(ce.value.member.role === "owner" ? "群主" : "成员"), 1)
              ]),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[29] || (t[29] = (s) => ss(ce.value.member))
              }, [...t[80] || (t[80] = [
                e("span", { class: "chat-context-icon" }, "👤", -1),
                Y(" 查看详细名片 ", -1)
              ])]),
              ce.value.member.uid !== o(c).currentUser.uid ? (n(), i(V, { key: 0 }, [
                t[85] || (t[85] = e("div", { class: "chat-context-divider" }, null, -1)),
                os(ce.value.member.uid) ? (n(), i("button", {
                  key: 0,
                  type: "button",
                  class: "chat-context-item",
                  onClick: t[30] || (t[30] = (s) => as(ce.value.member))
                }, [...t[81] || (t[81] = [
                  e("span", { class: "chat-context-icon" }, "💬", -1),
                  Y(" 发送私聊 ", -1)
                ])])) : ls(ce.value.member.uid) ? (n(), i("button", ru, [...t[82] || (t[82] = [
                  e("span", { class: "chat-context-icon" }, "⏳", -1),
                  Y(" 好友申请处理中 ", -1)
                ])])) : (n(), i("button", {
                  key: 2,
                  type: "button",
                  class: "chat-context-item",
                  onClick: t[31] || (t[31] = (s) => ns(ce.value.member))
                }, [...t[83] || (t[83] = [
                  e("span", { class: "chat-context-icon" }, "➕", -1),
                  Y(" 添加为好友 ", -1)
                ])])),
                o(c).connected && o(w).role === "owner" ? (n(), i("button", {
                  key: 3,
                  type: "button",
                  class: "chat-context-item",
                  onClick: t[32] || (t[32] = (s) => Dt(ce.value.member))
                }, [...t[84] || (t[84] = [
                  e("span", { class: "chat-context-icon" }, "📨", -1),
                  Y(" 邀请加入服务器卡片 ", -1)
                ])])) : m("", !0)
              ], 64)) : m("", !0)
            ], 4)) : m("", !0)
          ])),
          o(K).djModalOpen ? (n(), ge(fo, { key: 3 })) : m("", !0),
          Ze.value ? (n(), i("div", {
            key: 4,
            class: "nonmodal-room-popover",
            onClick: t[36] || (t[36] = O(() => {
            }, ["stop"]))
          }, [
            e("div", cu, [
              e("div", uu, [
                t[86] || (t[86] = e("strong", null, "➕ 创建新大群 / 空间", -1)),
                e("button", {
                  type: "button",
                  class: "modal-close-pill",
                  title: "关闭",
                  onClick: t[34] || (t[34] = (s) => Ze.value = !1)
                }, "✕")
              ]),
              e("div", du, [
                t[87] || (t[87] = e("label", null, "群聊空间名称", -1)),
                Ie(e("input", {
                  "onUpdate:modelValue": t[35] || (t[35] = (s) => Te.value = s),
                  class: "chat-input",
                  placeholder: "例如：计科3班摸鱼基地",
                  maxlength: "20"
                }, null, 512), [
                  [Pe, Te.value]
                ]),
                t[88] || (t[88] = e("label", null, "群聊图标 Emoji", -1)),
                e("div", vu, [
                  (n(), i(V, null, re(["🏠", "🎮", "💻", "☕", "🎵", "📚", "🚀", "🦫"], (s) => e("button", {
                    key: s,
                    type: "button",
                    class: F(["icon-choice-btn", { sel: gt.value === s }]),
                    onClick: (g) => gt.value = s
                  }, l(s), 11, pu)), 64))
                ]),
                e("div", mu, [
                  e("button", {
                    type: "button",
                    class: "chat-btn-primary",
                    disabled: !Te.value.trim(),
                    onClick: es
                  }, "立即创建群聊", 8, bu)
                ])
              ])
            ])
          ])) : m("", !0),
          ot.value ? (n(), i("div", {
            key: 5,
            class: "nonmodal-room-popover",
            onClick: t[39] || (t[39] = O(() => {
            }, ["stop"]))
          }, [
            e("div", hu, [
              e("div", fu, [
                e("strong", null, "➕ 在【" + l(Qe.value?.name) + "】添加房间", 1),
                e("button", {
                  type: "button",
                  class: "modal-close-pill",
                  title: "关闭",
                  onClick: t[37] || (t[37] = (s) => ot.value = !1)
                }, "✕")
              ]),
              e("div", yu, [
                t[89] || (t[89] = e("label", null, "房间名称", -1)),
                Ie(e("input", {
                  "onUpdate:modelValue": t[38] || (t[38] = (s) => Ve.value = s),
                  class: "chat-input",
                  placeholder: "例如：考研打卡、动漫吐槽",
                  maxlength: "15"
                }, null, 512), [
                  [Pe, Ve.value]
                ]),
                t[90] || (t[90] = e("label", null, "房间图标 Emoji", -1)),
                e("div", gu, [
                  (n(), i(V, null, re(["💬", "🎵", "📺", "🐙", "⚡", "☕", "🎮", "💡"], (s) => e("button", {
                    key: s,
                    type: "button",
                    class: F(["icon-choice-btn", { sel: kt.value === s }]),
                    onClick: (g) => kt.value = s
                  }, l(s), 11, ku)), 64))
                ]),
                e("div", _u, [
                  e("button", {
                    type: "button",
                    class: "chat-btn-primary",
                    disabled: !Ve.value.trim(),
                    onClick: ts
                  }, "添加此房间", 8, $u)
                ])
              ])
            ])
          ])) : m("", !0),
          (n(), ge(Me, { to: "body" }, [
            je.value.visible && je.value.group ? (n(), i("div", {
              key: 0,
              class: "chat-context-menu",
              style: xe({ left: `${je.value.x}px`, top: `${je.value.y}px` }),
              onClick: t[43] || (t[43] = O(() => {
              }, ["stop"]))
            }, [
              e("div", wu, l(je.value.group.name), 1),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[40] || (t[40] = (s) => rs(je.value.group))
              }, [...t[91] || (t[91] = [
                e("span", { class: "chat-context-icon" }, "✏️", -1),
                Y(" 重命名此群聊 ", -1)
              ])]),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[41] || (t[41] = (s) => {
                  ot.value = !0, $e();
                })
              }, [...t[92] || (t[92] = [
                e("span", { class: "chat-context-icon" }, "➕", -1),
                Y(" 添加子房间频道 ", -1)
              ])]),
              o(c).groups && o(c).groups.length > 1 ? (n(), i(V, { key: 0 }, [
                t[94] || (t[94] = e("div", { class: "chat-context-divider" }, null, -1)),
                e("button", {
                  type: "button",
                  class: "chat-context-item text-danger",
                  onClick: t[42] || (t[42] = (s) => vs(je.value.group.id))
                }, [...t[93] || (t[93] = [
                  e("span", { class: "chat-context-icon" }, "🗑️", -1),
                  Y(" 删除此群聊空间 ", -1)
                ])])
              ], 64)) : m("", !0)
            ], 4)) : m("", !0)
          ])),
          (n(), ge(Me, { to: "body" }, [
            De.value.visible && De.value.channel ? (n(), i("div", {
              key: 0,
              class: "chat-context-menu",
              style: xe({ left: `${De.value.x}px`, top: `${De.value.y}px` }),
              onClick: t[46] || (t[46] = O(() => {
              }, ["stop"]))
            }, [
              e("div", Cu, " # " + l(De.value.channel.name), 1),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[44] || (t[44] = (s) => cs(De.value.channel))
              }, [...t[95] || (t[95] = [
                e("span", { class: "chat-context-icon" }, "✏️", -1),
                Y(" 重命名房间频道 ", -1)
              ])]),
              Qe.value?.channels && Qe.value.channels.length > 1 ? (n(), i(V, { key: 0 }, [
                t[97] || (t[97] = e("div", { class: "chat-context-divider" }, null, -1)),
                e("button", {
                  type: "button",
                  class: "chat-context-item text-danger",
                  onClick: t[45] || (t[45] = (s) => ds(De.value.channel.id))
                }, [...t[96] || (t[96] = [
                  e("span", { class: "chat-context-icon" }, "🗑️", -1),
                  Y(" 删除此房间 ", -1)
                ])])
              ], 64)) : m("", !0)
            ], 4)) : m("", !0)
          ])),
          et.value ? (n(), i("div", {
            key: 6,
            class: "nonmodal-room-popover",
            onClick: t[49] || (t[49] = O(() => {
            }, ["stop"]))
          }, [
            e("div", xu, [
              e("div", Su, [
                e("strong", null, l($t.value), 1),
                e("button", {
                  type: "button",
                  class: "modal-close-pill",
                  title: "关闭",
                  onClick: t[47] || (t[47] = (s) => et.value = !1)
                }, "✕")
              ]),
              e("div", Mu, [
                t[98] || (t[98] = e("label", null, "新名称", -1)),
                Ie(e("input", {
                  "onUpdate:modelValue": t[48] || (t[48] = (s) => Ae.value = s),
                  class: "chat-input",
                  maxlength: "20",
                  autofocus: ""
                }, null, 512), [
                  [Pe, Ae.value]
                ]),
                t[99] || (t[99] = e("label", null, "图标 Emoji", -1)),
                e("div", Iu, [
                  (n(), i(V, null, re(["🏠", "💬", "🎵", "📺", "🐙", "🎮", "💻", "⚡", "☕", "📚", "🚀", "🦫"], (s) => e("button", {
                    key: s,
                    type: "button",
                    class: F(["icon-choice-btn", { sel: Ge.value === s }]),
                    onClick: (g) => Ge.value = s
                  }, l(s), 11, Pu)), 64))
                ]),
                e("div", Uu, [
                  e("button", {
                    type: "button",
                    class: "chat-btn-primary",
                    disabled: !Ae.value.trim(),
                    onClick: us
                  }, "保存修改", 8, Eu)
                ])
              ])
            ])
          ])) : m("", !0)
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), zu = /* @__PURE__ */ Ke(Tu, [["__scopeId", "data-v-751708d6"]]);
export {
  zu as default
};
