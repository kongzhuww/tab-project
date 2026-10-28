import { d as Xe, b as h, C as it, y as Pt, x as re, o as n, e as i, f as e, B as L, t as l, g as m, F as W, h as ce, i as J, u as o, c as ke, j as Ie, A as Se, m as Y, I as Ot, l as Ue, n as Pe, k as qt, s as z, G as at, L as Yt, w as tt, D as dt } from "./vendor-vue-DokqDua_.js";
import { A as ys } from "./AppWindowFrame-D05mPlSe.js";
/* empty css                                                                             */
import { w as nt } from "./window-manager.store-D_Nuf9-p.js";
import { i as gs } from "./images-DKKVKjaO.js";
import { Q as C, a3 as ks, a4 as te, a5 as wt, J as Bt, a6 as ht, a7 as _s, a8 as $s, a9 as Cs, aa as ws, N as c, ab as Rt, ac as Ft, ad as Nt, ae as bt, af as xs, ag as Ss, ah as Ms, ai as Xt, aj as Et, ak as Is, M as Ut, k as X, U as Us, X as Lt, h as Ne, _ as Ps, n as Fe, B as me, al as Es, am as xt, an as Ts, ao as St, ap as vt, aq as js, d as Ht, ar as Ds, as as Wt, at as As, au as Bs, av as Rs, aw as Fs, ax as Ns, ay as Ls, az as Hs, aA as Ws, aB as Vs, aC as Vt, aD as zs } from "./view-styles-DcR4NtZM.js";
import { C as Gs } from "./ChatPrivateSetup-BHu7mmX6.js";
import { _ as Ke } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { c as Re, e as Js, b as zt } from "./bili-favorites-store-CkNb4gnf.js";
import { t as K, c as Mt, i as we, a as Os, b as qs, d as st, s as Kt, o as Ye, j as Gt, l as It, e as Ys, f as Xs } from "./together-listen.store-CVLDFDeQ.js";
import { Q as Ks } from "./search.service-D8BPpHmG.js";
import { e as Qt, w as ft, d as Zt, s as Qs } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
const Zs = { class: "discord-navigation" }, ea = {
  class: "col-groups-sidebar",
  "aria-label": "聊天空间"
}, ta = { class: "groups-icons-scroll" }, sa = {
  key: 0,
  class: "sidebar-badge"
}, aa = ["title", "aria-label", "aria-pressed", "onClick", "onContextmenu"], na = ["disabled"], ia = { class: "chat-context-header" }, oa = { class: "chat-context-header" }, la = { class: "col-channels-sidebar" }, ra = { class: "channels-header" }, ca = { class: "dm-friends-count" }, ua = { class: "dm-sessions-list" }, da = ["title", "onClick"], va = { class: "dm-avatar-box" }, pa = ["src"], ma = {
  key: 1,
  class: "dm-avatar-char"
}, ba = { class: "dm-item-info" }, ha = { class: "dm-name-row" }, fa = { class: "dm-name-text" }, ya = {
  key: 0,
  class: "dm-owner-badge"
}, ga = { class: "dm-status-row" }, ka = {
  key: 0,
  class: "dm-act-snippet"
}, _a = {
  key: 1,
  class: "dm-status-online"
}, $a = {
  key: 2,
  class: "dm-status-offline"
}, Ca = {
  key: 0,
  class: "dm-empty-state"
}, wa = { class: "group-brand-info" }, xa = { class: "group-brand-icon" }, Sa = { class: "group-brand-name" }, Ma = ["aria-expanded"], Ia = { class: "channels-list-wrap" }, Ua = { class: "channel-section-label" }, Pa = ["disabled"], Ea = { class: "channels-scroll-inner" }, Ta = ["aria-current", "title", "onClick", "onContextmenu"], ja = { class: "channel-icon" }, Da = { class: "channel-title" }, Aa = ["aria-label", "disabled", "onClick"], Ba = {
  key: 0,
  class: "room-hint"
}, Ra = { class: "manage-dialog-head" }, Fa = { class: "manage-dialog-title" }, Na = ["disabled"], La = { class: "manage-label" }, Ha = ["disabled"], Wa = { class: "manage-label" }, Va = { class: "emoji-picker-row" }, za = ["disabled"], Ga = { class: "quick-emojis" }, Ja = ["onClick"], Oa = {
  key: 0,
  class: "manage-label"
}, qa = ["disabled"], Ya = {
  key: 1,
  class: "manage-notice",
  role: "status"
}, Xa = { class: "manage-dialog-actions" }, Ka = ["disabled"], Qa = { class: "manage-actions-right" }, Za = ["disabled"], en = ["disabled"], tn = { class: "manage-dialog-head" }, sn = { class: "manage-dialog-title text-danger" }, an = ["disabled"], nn = { class: "delete-dialog-body" }, on = { class: "delete-dialog-hint" }, ln = {
  key: 0,
  class: "manage-notice",
  role: "status"
}, rn = { class: "manage-dialog-actions" }, cn = ["disabled"], un = ["disabled"], dn = /* @__PURE__ */ Xe({
  __name: "SharedRoomNavigation",
  emits: ["settings"],
  setup(Q, { emit: y }) {
    const j = y, P = z(() => C.role === "owner"), D = h(C.channel.startsWith("dm_") ? "dm" : "spaces"), k = h("hub_main"), I = z(() => C.spaces.find((p) => p.id === k.value) || C.spaces[0]), S = z(() => C.rooms.filter((p) => (p.space || "hub_main") === I.value?.id)), N = h(!1), f = h({
      visible: !1,
      x: 0,
      y: 0,
      space: null
    }), w = h({
      visible: !1,
      x: 0,
      y: 0,
      room: null
    }), _ = h(""), x = h(""), $ = h(""), H = h(""), E = h("💬"), T = h(""), U = h(!1), G = h("");
    let ae = 0;
    const Z = h(null);
    function se() {
      f.value.visible = !1, w.value.visible = !1, N.value = !1;
    }
    function ue() {
      se();
    }
    it(() => {
      window.addEventListener("click", ue);
    }), Pt(() => {
      window.removeEventListener("click", ue);
    });
    function le(p) {
      return typeof p == "string" && p.length <= 8 && !/[:/]/.test(p) && p || "🦫";
    }
    const O = z(() => {
      const p = [], r = /* @__PURE__ */ new Set([...C.friends, ...c.friends.map((u) => u.uid)]);
      for (const u of r) {
        if (u === c.currentUser.uid) continue;
        const ee = C.members.find((Me) => Me.uid === u), ye = c.friends.find((Me) => Me.uid === u), xe = ee?.name || ye?.name || u, Le = ee?.avatar || ye?.avatar || "🦫", He = ee?.online ?? !1, ge = ee?.activity || c.userActivities[u];
        p.push({
          uid: u,
          name: xe,
          avatar: Le,
          online: He,
          activity: ge,
          role: ee?.role
        });
      }
      return p;
    }), A = z(() => c.friendRequests.filter((p) => p.toUid === c.currentUser.uid && p.status === "pending").length);
    function R() {
      D.value = "dm", se(), O.value.length && !C.channel.startsWith("dm_") && ht(O.value[0].uid);
    }
    function be(p) {
      ht(p);
    }
    re(() => JSON.stringify(Bt.room), () => {
      ae++, _.value = "", Z.value = null, G.value = "", k.value = "hub_main", se();
    }), re(() => [C.channel, C.rooms.find((p) => p.id === C.channel)?.space], () => {
      if (C.channel.startsWith("dm_"))
        D.value = "dm";
      else {
        D.value = "spaces";
        const p = C.rooms.find((r) => r.id === C.channel);
        p && (k.value = p.space || "hub_main");
      }
    }, { immediate: !0 }), re(() => C.spaces.map((p) => p.id).join(","), () => {
      C.spaces.some((p) => p.id === k.value) || (k.value = C.spaces[0]?.id || "hub_main");
    });
    function B(p) {
      if (D.value = "spaces", se(), p.id === I.value?.id && !C.channel.startsWith("dm_")) return;
      k.value = p.id;
      const r = C.rooms.find((u) => (u.space || "hub_main") === p.id);
      r ? wt(r.id) : wt("main");
    }
    function _e(p, r) {
      p.preventDefault(), p.stopPropagation(), se(), f.value = {
        visible: !0,
        x: Math.min(p.clientX, window.innerWidth - 180),
        y: Math.min(p.clientY, window.innerHeight - 150),
        space: r
      };
    }
    function ve(p, r) {
      p.preventDefault(), p.stopPropagation(), se(), w.value = {
        visible: !0,
        x: Math.min(p.clientX, window.innerWidth - 180),
        y: Math.min(p.clientY, window.innerHeight - 150),
        room: r
      };
    }
    function $e(p) {
      se(), q(p);
    }
    function pe(p) {
      se(), p.id !== "hub_main" && (Z.value = {
        type: "space",
        id: p.id,
        name: p.name
      });
    }
    function M(p) {
      se(), V(p);
    }
    function F(p) {
      se(), p.id !== "main" && (Z.value = {
        type: "room",
        id: p.id,
        name: p.name
      });
    }
    function V(p) {
      _.value = "room", x.value = p?.id || "", $.value = p?.space || I.value?.id || "hub_main", H.value = p?.name || "", E.value = p?.icon || "💬", T.value = p?.description || "", G.value = "", se();
    }
    function q(p) {
      _.value = "space", x.value = p?.id || "", $.value = "", H.value = p?.name || "", E.value = p?.icon || "👥", T.value = "", G.value = "", se();
    }
    async function ne() {
      if (U.value || !H.value.trim()) return;
      const p = ae;
      U.value = !0, G.value = "";
      try {
        _.value === "space" ? await _s({ name: H.value.trim(), icon: E.value.trim() || "👥" }, x.value || void 0) : await $s({
          name: H.value.trim(),
          icon: E.value.trim() || "💬",
          description: T.value.trim(),
          space: $.value
        }, x.value || void 0), p === ae && (_.value = "");
      } catch {
        p === ae && (G.value = "未确认保存结果，请检查连接和列表，不要重复创建。");
      } finally {
        U.value = !1;
      }
    }
    function fe() {
      if (!x.value) return;
      const p = x.value, r = H.value, u = _.value;
      _.value = "", Z.value = {
        type: u,
        id: p,
        name: r
      };
    }
    async function he() {
      if (!Z.value || U.value) return;
      const p = Z.value, r = ae;
      U.value = !0, G.value = "";
      try {
        p.type === "space" ? await Cs(p.id) : await ws(p.id), r === ae && (Z.value = null);
      } catch {
        r === ae && (G.value = "移除未确认，请检查连接；聊天历史不会被删除。");
      } finally {
        U.value = !1;
      }
    }
    const Ee = z(() => x.value && (_.value === "space" ? x.value !== "hub_main" : x.value !== "main"));
    return (p, r) => (n(), i("div", Zs, [
      e("nav", ea, [
        e("div", ta, [
          e("button", {
            type: "button",
            class: L(["group-icon-pill dm-entry-pill", { active: D.value === "dm" }]),
            title: "私信与好友",
            "aria-label": "私信与好友",
            onClick: R
          }, [
            r[28] || (r[28] = e("span", { class: "grp-emoji" }, "💬", -1)),
            A.value > 0 ? (n(), i("span", sa, l(A.value), 1)) : m("", !0)
          ], 2),
          r[29] || (r[29] = e("div", { class: "sidebar-divider" }, null, -1)),
          (n(!0), i(W, null, ce(o(C).spaces, (u) => (n(), i("button", {
            key: u.id,
            type: "button",
            class: L(["group-icon-pill", { active: D.value === "spaces" && I.value?.id === u.id }]),
            title: `空间：${u.name}${P.value ? "（右键改名/删除）" : ""}`,
            "aria-label": u.name,
            "aria-pressed": D.value === "spaces" && I.value?.id === u.id,
            onClick: (ee) => B(u),
            onContextmenu: J((ee) => _e(ee, u), ["prevent"])
          }, [
            e("span", null, l(u.icon || "👥"), 1)
          ], 42, aa))), 128)),
          P.value && o(C).spacesSupported ? (n(), i("button", {
            key: 0,
            type: "button",
            class: "group-add-btn",
            title: "创建新空间",
            "aria-label": "创建新空间",
            disabled: U.value,
            onClick: r[0] || (r[0] = (u) => q())
          }, " ＋ ", 8, na)) : m("", !0)
        ]),
        e("button", {
          type: "button",
          class: "sidebar-settings-btn",
          title: "我的资料与连接设置",
          "aria-label": "我的资料与连接设置",
          onClick: r[1] || (r[1] = (u) => j("settings"))
        }, " ⚙ ")
      ]),
      (n(), ke(Ie, { to: "body" }, [
        f.value.visible && f.value.space ? (n(), i("div", {
          key: 0,
          class: "chat-context-menu",
          style: Se({ left: `${f.value.x}px`, top: `${f.value.y}px` }),
          onClick: r[4] || (r[4] = J(() => {
          }, ["stop"]))
        }, [
          e("div", ia, [
            e("span", null, l(f.value.space.icon || "👥"), 1),
            e("strong", null, l(f.value.space.name), 1)
          ]),
          e("button", {
            type: "button",
            class: "chat-context-item",
            onClick: r[2] || (r[2] = (u) => $e(f.value.space))
          }, [...r[30] || (r[30] = [
            e("span", { class: "chat-context-icon" }, "✏️", -1),
            Y(" 空间改名 / 设置 ", -1)
          ])]),
          f.value.space.id !== "hub_main" ? (n(), i(W, { key: 0 }, [
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
      (n(), ke(Ie, { to: "body" }, [
        w.value.visible && w.value.room ? (n(), i("div", {
          key: 0,
          class: "chat-context-menu",
          style: Se({ left: `${w.value.x}px`, top: `${w.value.y}px` }),
          onClick: r[7] || (r[7] = J(() => {
          }, ["stop"]))
        }, [
          e("div", oa, [
            e("span", null, l(w.value.room.icon || "💬"), 1),
            e("strong", null, "# " + l(w.value.room.name), 1)
          ]),
          e("button", {
            type: "button",
            class: "chat-context-item",
            onClick: r[5] || (r[5] = (u) => M(w.value.room))
          }, [...r[33] || (r[33] = [
            e("span", { class: "chat-context-icon" }, "✏️", -1),
            Y(" 重命名此房间 ", -1)
          ])]),
          w.value.room.id !== "main" ? (n(), i(W, { key: 0 }, [
            r[35] || (r[35] = e("div", { class: "chat-context-divider" }, null, -1)),
            e("button", {
              type: "button",
              class: "chat-context-item text-danger",
              onClick: r[6] || (r[6] = (u) => F(w.value.room))
            }, [...r[34] || (r[34] = [
              e("span", { class: "chat-context-icon" }, "🗑️", -1),
              Y(" 删除此房间 ", -1)
            ])])
          ], 64)) : m("", !0)
        ], 4)) : m("", !0)
      ])),
      e("aside", la, [
        D.value === "dm" ? (n(), i(W, { key: 0 }, [
          e("div", ra, [
            r[36] || (r[36] = e("div", { class: "group-brand-info" }, [
              e("span", { class: "group-brand-icon" }, "💬"),
              e("strong", { class: "group-brand-name" }, "私信会话")
            ], -1)),
            e("span", ca, l(O.value.length) + " 好友", 1)
          ]),
          e("div", ua, [
            (n(!0), i(W, null, ce(O.value, (u) => (n(), i("div", {
              key: u.uid,
              class: L(["dm-session-item", { active: o(C).channel === o(ks)(u.uid) }]),
              title: `点击与【${u.name}】私聊`,
              onClick: (ee) => be(u.uid)
            }, [
              e("div", va, [
                o(te)(u.avatar) ? (n(), i("img", {
                  key: 0,
                  src: o(te)(u.avatar),
                  class: "dm-avatar-pic",
                  alt: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer",
                  onError: r[8] || (r[8] = (ee) => ee.target.style.display = "none")
                }, null, 40, pa)) : (n(), i("span", ma, l(le(u.avatar)), 1)),
                e("span", {
                  class: L(["dm-online-dot", { online: u.online }])
                }, null, 2)
              ]),
              e("div", ba, [
                e("div", ha, [
                  e("span", fa, l(u.name), 1),
                  u.role === "owner" ? (n(), i("span", ya, "群主")) : m("", !0)
                ]),
                e("div", ga, [
                  u.activity?.title ? (n(), i("span", ka, l(u.activity.type === "bilibili" ? "📺" : u.activity.type === "github" ? "🐙" : u.activity.type === "music" ? "🎵" : u.activity.type === "aihot" ? "🔥" : "🌐") + " " + l(u.activity.title), 1)) : u.online ? (n(), i("span", _a, "当前在线")) : (n(), i("span", $a, "离线"))
                ])
              ])
            ], 10, da))), 128)),
            O.value.length ? m("", !0) : (n(), i("div", Ca, [...r[37] || (r[37] = [
              e("p", null, "暂无好友", -1),
              e("small", null, "在群聊或成员列表中右键点击同学头像，选择「➕ 添加为好友」；通过后即可在此随时私聊。", -1)
            ])]))
          ])
        ], 64)) : (n(), i(W, { key: 1 }, [
          e("div", {
            class: "channels-header",
            onContextmenu: r[10] || (r[10] = J((u) => I.value && _e(u, I.value), ["prevent"]))
          }, [
            e("div", wa, [
              e("span", xa, l(I.value?.icon || "🏠"), 1),
              e("strong", Sa, l(I.value?.name || "聊天室"), 1)
            ]),
            P.value ? (n(), i("button", {
              key: 0,
              type: "button",
              class: "group-more-btn",
              title: "空间设置与管理",
              "aria-label": "空间设置与管理",
              "aria-expanded": N.value,
              onClick: r[9] || (r[9] = J((u) => N.value = !N.value, ["stop"]))
            }, "⋮", 8, Ma)) : m("", !0)
          ], 32),
          N.value && P.value ? (n(), i("div", {
            key: 0,
            class: "space-menu",
            onClick: r[14] || (r[14] = J(() => {
            }, ["stop"]))
          }, [
            o(C).spacesSupported ? (n(), i("button", {
              key: 0,
              type: "button",
              onClick: r[11] || (r[11] = (u) => I.value && q(I.value))
            }, "空间设置 / 改名")) : m("", !0),
            o(C).roomsSupported ? (n(), i("button", {
              key: 1,
              type: "button",
              onClick: r[12] || (r[12] = (u) => V())
            }, "创建房间")) : m("", !0),
            e("button", {
              type: "button",
              onClick: r[13] || (r[13] = (u) => {
                N.value = !1, j("settings");
              })
            }, "成员与邀请")
          ])) : m("", !0),
          e("div", Ia, [
            e("div", Ua, [
              r[38] || (r[38] = e("span", null, "房间频道", -1)),
              P.value && o(C).roomsSupported ? (n(), i("button", {
                key: 0,
                type: "button",
                class: "btn-fast-add-ch",
                title: "创建房间",
                "aria-label": "创建房间",
                disabled: U.value,
                onClick: r[15] || (r[15] = (u) => V())
              }, "＋", 8, Pa)) : m("", !0)
            ]),
            e("div", Ea, [
              (n(!0), i(W, null, ce(S.value, (u) => (n(), i("div", {
                key: u.id,
                class: "channel-line"
              }, [
                e("button", {
                  type: "button",
                  class: L(["channel-item-btn", { active: o(C).channel === u.id }]),
                  "aria-current": o(C).channel === u.id ? "page" : void 0,
                  title: `${u.name}（右键重命名/删除）`,
                  onClick: (ee) => o(wt)(u.id),
                  onContextmenu: J((ee) => ve(ee, u), ["prevent"])
                }, [
                  r[39] || (r[39] = e("span", { class: "channel-prefix" }, "#", -1)),
                  e("span", ja, l(u.icon), 1),
                  e("span", Da, l(u.name), 1)
                ], 42, Ta),
                e("button", {
                  type: "button",
                  class: "channel-settings-btn",
                  "aria-label": `设置房间：${u.name}`,
                  title: "设置房间",
                  disabled: U.value,
                  onClick: J((ee) => ve(ee, u), ["stop"])
                }, " ⚙ ", 8, Aa)
              ]))), 128))
            ]),
            S.value.length ? m("", !0) : (n(), i("p", Ba, l(o(Bt).room ? "暂无房间，连接后由服主创建。" : "请先加入聊天室。"), 1))
          ]),
          Ot(p.$slots, "members", {}, void 0, !0)
        ], 64))
      ]),
      (n(), ke(Ie, { to: "body" }, [
        _.value ? (n(), i("div", {
          key: 0,
          class: "chat-modal-backdrop",
          onClick: r[23] || (r[23] = (u) => !U.value && (_.value = ""))
        }, [
          e("div", {
            class: "chat-manage-dialog-card",
            onClick: r[21] || (r[21] = J(() => {
            }, ["stop"])),
            onKeydown: r[22] || (r[22] = qt((u) => !U.value && (_.value = ""), ["esc"]))
          }, [
            e("div", Ra, [
              e("strong", Fa, l(x.value ? _.value === "space" ? "✏️ 空间改名与设置" : "✏️ 房间改名与设置" : _.value === "space" ? "➕ 创建新空间" : "➕ 创建房间"), 1),
              e("button", {
                type: "button",
                class: "manage-dialog-close",
                disabled: U.value,
                onClick: r[16] || (r[16] = (u) => _.value = "")
              }, "✕", 8, Na)
            ]),
            e("form", {
              class: "manage-dialog-form",
              onSubmit: J(ne, ["prevent"])
            }, [
              e("label", La, [
                r[40] || (r[40] = e("span", null, "名称", -1)),
                Ue(e("input", {
                  "onUpdate:modelValue": r[17] || (r[17] = (u) => H.value = u),
                  class: "manage-input",
                  maxlength: "80",
                  required: "",
                  disabled: U.value,
                  placeholder: "给它起个名字",
                  autofocus: ""
                }, null, 8, Ha), [
                  [Pe, H.value]
                ])
              ]),
              e("label", Wa, [
                r[41] || (r[41] = e("span", null, "图标 Emoji", -1)),
                e("div", Va, [
                  Ue(e("input", {
                    "onUpdate:modelValue": r[18] || (r[18] = (u) => E.value = u),
                    class: "manage-input emoji-input",
                    maxlength: "8",
                    disabled: U.value,
                    placeholder: "Emoji"
                  }, null, 8, za), [
                    [Pe, E.value]
                  ]),
                  e("div", Ga, [
                    (n(!0), i(W, null, ce(_.value === "space" ? ["🏠", "🎮", "💻", "☕", "🎵", "📚", "🚀", "🦫"] : ["💬", "🎵", "📺", "🐙", "⚡", "☕", "🎮", "💡"], (u) => (n(), i("button", {
                      key: u,
                      type: "button",
                      class: L(["quick-emoji-btn", { sel: E.value === u }]),
                      onClick: (ee) => E.value = u
                    }, l(u), 11, Ja))), 128))
                  ])
                ])
              ]),
              _.value === "room" ? (n(), i("label", Oa, [
                r[42] || (r[42] = e("span", null, "房间说明（选填）", -1)),
                Ue(e("textarea", {
                  "onUpdate:modelValue": r[19] || (r[19] = (u) => T.value = u),
                  class: "manage-textarea",
                  maxlength: "500",
                  rows: "2",
                  disabled: U.value,
                  placeholder: "简短描述该房间的主题或规矩"
                }, null, 8, qa), [
                  [Pe, T.value]
                ])
              ])) : m("", !0),
              G.value ? (n(), i("div", Ya, l(G.value), 1)) : m("", !0),
              e("div", Xa, [
                Ee.value ? (n(), i("button", {
                  key: 0,
                  type: "button",
                  class: "manage-btn-delete",
                  disabled: U.value,
                  onClick: fe
                }, " 🗑️ " + l(_.value === "space" ? "删除空间" : "删除房间"), 9, Ka)) : m("", !0),
                e("div", Qa, [
                  e("button", {
                    type: "button",
                    class: "manage-btn-cancel",
                    disabled: U.value,
                    onClick: r[20] || (r[20] = (u) => _.value = "")
                  }, "取消", 8, Za),
                  e("button", {
                    type: "submit",
                    class: "manage-btn-save",
                    disabled: U.value || !H.value.trim()
                  }, l(U.value ? "保存中…" : "保存修改"), 9, en)
                ])
              ])
            ], 32)
          ], 32)
        ])) : m("", !0)
      ])),
      (n(), ke(Ie, { to: "body" }, [
        Z.value ? (n(), i("div", {
          key: 0,
          class: "chat-modal-backdrop",
          onClick: r[27] || (r[27] = (u) => !U.value && (Z.value = null))
        }, [
          e("div", {
            class: "chat-manage-dialog-card delete-confirm-card",
            onClick: r[26] || (r[26] = J(() => {
            }, ["stop"]))
          }, [
            e("div", tn, [
              e("strong", sn, " 🗑️ 确认删除" + l(Z.value.type === "space" ? "空间" : "房间") + "？ ", 1),
              e("button", {
                type: "button",
                class: "manage-dialog-close",
                disabled: U.value,
                onClick: r[24] || (r[24] = (u) => Z.value = null)
              }, "✕", 8, an)
            ]),
            e("div", nn, [
              e("p", null, [
                r[43] || (r[43] = Y(" 确定要删除 ", -1)),
                e("strong", null, l(Z.value.type === "space" ? "群空间" : "房间") + "【" + l(Z.value.name) + "】", 1),
                r[44] || (r[44] = Y(" 吗？ ", -1))
              ]),
              e("small", on, l(Z.value.type === "space" ? "该空间及其包含的所有子房间将停止访问，聊天历史记录仍完整保留在服务器中。" : "所有成员将无法再进入此房间，聊天历史记录仍完整保留在服务器中。"), 1)
            ]),
            G.value ? (n(), i("div", ln, l(G.value), 1)) : m("", !0),
            e("div", rn, [
              e("button", {
                type: "button",
                class: "manage-btn-cancel",
                disabled: U.value,
                onClick: r[25] || (r[25] = (u) => Z.value = null)
              }, "取消", 8, cn),
              e("button", {
                type: "button",
                class: "manage-btn-confirm-delete",
                disabled: U.value,
                onClick: he
              }, l(U.value ? "正在删除…" : "确认删除"), 9, un)
            ])
          ])
        ])) : m("", !0)
      ]))
    ]));
  }
}), vn = /* @__PURE__ */ Ke(dn, [["__scopeId", "data-v-fe679c1c"]]), pn = { class: "history-tools" }, mn = { class: "history-options" }, bn = ["disabled"], hn = { key: 0 }, fn = {
  key: 1,
  role: "alert"
}, yn = {
  key: 2,
  role: "status"
}, gn = /* @__PURE__ */ Xe({
  __name: "ChatHistoryTools",
  props: {
    container: {}
  },
  setup(Q) {
    const y = Q, j = z(() => Xt(c.currentUser.uid, c.serverUrl, c.currentRoomId)), P = h(!1), D = h(""), k = h(!1);
    re(j, () => {
      k.value = !1, D.value = "", bt.value = !1;
    });
    async function I() {
      if (P.value) return;
      const f = j.value;
      P.value = !0, bt.value = !0;
      try {
        const w = c.messages.find((T) => T.id !== "sys-welcome"), _ = await xs(f, w);
        if (f !== j.value) return;
        const x = new Set(c.messages.map((T) => T.id)), $ = _.filter((T) => !x.has(T.id)), H = y.container?.scrollHeight || 0, E = y.container?.scrollTop || 0;
        c.messages = [...$, ...c.messages], k.value = _.length < 200, D.value = $.length ? `已加载 ${$.length} 条历史` : "没有更早记录", await at(), f === j.value && y.container && (y.container.scrollTop = E + y.container.scrollHeight - H);
      } catch {
        D.value = "读取失败，原记录未删除";
      } finally {
        P.value = !1, bt.value = !1;
      }
    }
    function S(f, w) {
      const _ = URL.createObjectURL(new Blob([JSON.stringify(f, null, 2)], { type: "application/json" })), x = document.createElement("a");
      x.href = _, x.download = w, x.click(), setTimeout(() => URL.revokeObjectURL(_), 1e4);
    }
    async function N() {
      const f = j.value, w = c.messages.map((_) => JSON.parse(JSON.stringify(_)));
      try {
        const _ = await Ss(f), x = new Map(_.map(($) => [$.id, $]));
        for (const $ of w) x.set($.id, $);
        S({ version: 1, scope: JSON.parse(f), messages: [...x.values()] }, "chat-room-history.json"), D.value = "已发起导出；文件包含聊天内容及房间地址，请妥善保管";
      } catch {
        S({ partial: !0, scope: JSON.parse(f), visible: w, pending: Ms(f) }, "chat-history-emergency.json"), D.value = "数据库不可读，仅导出当前窗口和待存消息，不是完整归档";
      }
    }
    return (f, w) => (n(), i("div", pn, [
      (n(), i("details", { key: j.value }, [
        w[1] || (w[1] = e("summary", null, "聊天记录", -1)),
        e("div", mn, [
          e("button", {
            type: "button",
            disabled: P.value || k.value,
            onClick: I
          }, l(P.value ? "读取中…" : "加载更早消息"), 9, bn),
          e("button", {
            type: "button",
            onClick: N
          }, "导出聊天记录")
        ])
      ])),
      o(Rt) ? (n(), i("span", hn, l(o(Rt)) + " 条待写入", 1)) : m("", !0),
      o(Ft) ? (n(), i("p", fn, [
        Y(l(o(Ft)) + " ", 1),
        e("button", {
          type: "button",
          onClick: w[0] || (w[0] = //@ts-ignore
          (..._) => o(Nt) && o(Nt)(..._))
        }, "重试保存")
      ])) : m("", !0),
      D.value ? (n(), i("p", yn, l(D.value), 1)) : m("", !0)
    ]));
  }
}), kn = /* @__PURE__ */ Ke(gn, [["__scopeId", "data-v-43fb68ba"]]), _n = ["data-virtual-id"], $n = /* @__PURE__ */ Xe({
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
    const y = Q, j = h(null), P = h(0), D = h(0), k = h(600), I = h(null), S = h(null), N = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
    let w, _, x = 0, $ = 0, H = !0, E = 0, T = null;
    const U = z(() => {
      P.value;
      const M = [0];
      for (const F of y.items) M.push(M[M.length - 1] + (N.get(F.id) ?? y.estimate));
      return M;
    }), G = z(() => new Map(y.items.map((M, F) => [M.id, F])));
    function ae(M) {
      const F = U.value;
      let V = 0, q = y.items.length;
      for (; V < q; ) {
        const ne = V + q >>> 1;
        F[ne + 1] <= M ? V = ne + 1 : q = ne;
      }
      return Math.min(V, Math.max(0, y.items.length - 1));
    }
    const Z = z(() => {
      const M = ae(Math.max(0, D.value - 400)), F = Math.min(y.items.length, ae(D.value + k.value + 400) + 1), V = /* @__PURE__ */ new Set();
      for (let q = M; q < F; q++) V.add(q);
      for (const q of [I.value, S.value]) {
        const ne = q === null ? void 0 : G.value.get(q);
        ne !== void 0 && V.add(ne);
      }
      return [...V].sort((q, ne) => q - ne).map((q) => ({ item: y.items[q], index: q }));
    });
    function se() {
      x = 0, !(!H || !y.active || document.hidden || !j.value || !T) && (D.value = Math.max(0, T.getBoundingClientRect().top - j.value.getBoundingClientRect().top), k.value = T.clientHeight || 600);
    }
    function ue() {
      !x && H && y.active && !document.hidden && (x = requestAnimationFrame(se));
    }
    function le() {
      ++$, ue();
    }
    function O(M, F) {
      const V = f.get(M);
      V !== F && (V && w?.unobserve(V), F instanceof HTMLElement ? (f.set(M, F), y.active && !document.hidden && w?.observe(F)) : f.delete(M));
    }
    function A(M) {
      if (!T || !y.active || !H || document.hidden) return;
      const F = T, V = $, q = E, ne = y.items, fe = ae(D.value), he = ne[fe]?.id, Ee = U.value[fe] || 0, p = F.scrollHeight - F.scrollTop - F.clientHeight <= 3;
      let r = !1;
      for (const u of M) {
        const ye = u.target.dataset.virtualId, xe = u.borderBoxSize?.[0]?.blockSize ?? u.contentRect.height;
        !ye || xe < 1 || !G.value.has(ye) || Math.abs((N.get(ye) ?? y.estimate) - xe) > 0.5 && (N.set(ye, xe), r = !0);
      }
      r && (++P.value, at(() => {
        if (!(!H || q !== E || T !== F || V !== $ || ne !== y.items)) {
          if (p) F.scrollTop = F.scrollHeight;
          else if (he !== void 0) {
            const u = G.value.get(he);
            u !== void 0 && (F.scrollTop += U.value[u] - Ee);
          }
          ue();
        }
      }));
    }
    function R(M) {
      return M.target instanceof Element ? M.target.closest("[data-virtual-id]")?.dataset.virtualId ?? null : null;
    }
    function be(M) {
      I.value = R(M);
    }
    function B() {
      at(() => {
        if (!H) return;
        const M = document.activeElement;
        I.value = M && j.value?.contains(M) ? M.closest("[data-virtual-id]")?.dataset.virtualId ?? null : null;
      });
    }
    function _e(M) {
      S.value = R(M);
    }
    function ve() {
      S.value = null;
    }
    function $e() {
      ++E, T?.removeEventListener("scroll", le), _?.disconnect(), w?.disconnect(), cancelAnimationFrame(x), x = 0, T = null;
    }
    function pe() {
      if ($e(), !(!H || !y.active || document.hidden || !y.scrollHost)) {
        T = y.scrollHost, T.addEventListener("scroll", le, { passive: !0 }), _?.observe(T);
        for (const M of f.values()) w?.observe(M);
        ue();
      }
    }
    return re(() => [y.scrollHost, y.active], pe, { flush: "post" }), re(() => y.items, () => {
      const M = new Set(y.items.map((F) => F.id));
      for (const F of N.keys()) M.has(F) || N.delete(F);
      I.value && !M.has(I.value) && (I.value = null), S.value && !M.has(S.value) && (S.value = null), ++P.value, ue();
    }, { flush: "pre" }), re(() => y.resetKey, () => {
      ++E, N.clear(), ++P.value, I.value = null, S.value = null, D.value = 0, ue();
    }), it(() => {
      w = new ResizeObserver(A), _ = new ResizeObserver(ue), document.addEventListener("visibilitychange", pe), pe();
    }), Yt(() => {
      H = !1, $e(), f.clear(), N.clear(), document.removeEventListener("visibilitychange", pe);
    }), (M, F) => (n(), i("div", {
      ref_key: "canvas",
      ref: j,
      class: "measured-virtual-canvas",
      style: Se({ height: `${U.value[Q.items.length]}px` }),
      onFocusin: be,
      onFocusout: B,
      onDragstart: _e,
      onDragend: ve
    }, [
      (n(!0), i(W, null, ce(Z.value, (V) => (n(), i("div", {
        key: V.item.id,
        ref_for: !0,
        ref: (q) => O(V.item.id, q),
        class: "measured-virtual-row",
        "data-virtual-id": V.item.id,
        style: Se({ transform: `translateY(${U.value[V.index]}px)`, paddingBottom: V.index === Q.items.length - 1 ? "0px" : `${Q.gap}px` })
      }, [
        Ot(M.$slots, "default", {
          item: V.item,
          index: V.index
        }, void 0, !0)
      ], 12, _n))), 128))
    ], 36));
  }
}), Cn = /* @__PURE__ */ Ke($n, [["__scopeId", "data-v-a21eca21"]]);
Et.imageBytes;
Et.imageMessageBytes;
const wn = 25 * 1024 * 1024;
function Jt(Q) {
  return new Promise((y, j) => {
    const P = new FileReader();
    P.onload = () => typeof P.result == "string" ? y(P.result) : j(new Error("图片读取失败")), P.onerror = P.onabort = () => j(new Error("图片读取失败")), P.readAsDataURL(Q);
  });
}
async function xn(Q) {
  let y = 8;
  for (let j = 0; j < 64 && y + 8 <= Q.size; j++) {
    const P = new Uint8Array(await Q.slice(y, y + 8).arrayBuffer()), D = new DataView(P.buffer).getUint32(0), k = String.fromCharCode(...P.slice(4));
    if (k === "acTL") return !0;
    if (k === "IDAT" || k === "IEND") return !1;
    y += D + 12;
  }
  throw new Error("PNG结构无法确认，请换一张图片，避免误将动图转为静态");
}
async function Sn(Q, y) {
  if (y && !y.messageTypes.includes("image")) throw new Error(y.reason || "服务端未启用图片消息");
  const j = y?.limits || Et, P = y?.imageMimeTypes || Is, D = ["image/webp", "image/png", "image/jpeg"].find((w) => P.includes(w));
  if (!Q.size || Q.size > wn) throw new Error("请选择25MB以内的图片");
  const k = new Uint8Array(await Q.slice(0, 32).arrayBuffer()), I = (w, _) => String.fromCharCode(...k.slice(w, _)), S = I(0, 6) === "GIF87a" || I(0, 6) === "GIF89a" ? "image/gif" : k[0] === 137 && I(1, 4) === "PNG" ? "image/png" : k[0] === 255 && k[1] === 216 && k[2] === 255 ? "image/jpeg" : I(0, 4) === "RIFF" && I(8, 12) === "WEBP" ? "image/webp" : I(0, 2) === "BM" ? "image/bmp" : "";
  if (!S) throw new Error("支持 PNG、JPEG、GIF、WebP、BMP，不支持SVG图片");
  const N = S === "image/gif" || S === "image/webp" && I(12, 16) === "VP8X" && !!(k[20] & 2), f = await createImageBitmap(Q);
  try {
    if (!f.width || !f.height || f.width * f.height > 40 * 1024 * 1024) throw new Error("图片像素过大，请先缩小后发送");
    if (P.includes(S) && Q.size <= j.imageBytes && f.width <= j.imageMaxDimension && f.height <= j.imageMaxDimension && f.width * f.height <= j.imageMaxPixels)
      return Jt(Q.slice(0, Q.size, S));
    if (N || S === "image/png" && await xn(Q)) throw new Error("动图超过当前服务的大小、尺寸或格式限制；请选择兼容的小动图，不会自动转为静态图");
    if (!D) throw new Error("服务端没有可用于静态图片压缩的兼容格式");
    let w = Math.min(1, 1280 / Math.max(f.width, f.height), j.imageMaxDimension / Math.max(f.width, f.height), Math.sqrt(j.imageMaxPixels / (f.width * f.height)));
    const _ = document.createElement("canvas");
    for (let x = 0; x < 5; x++) {
      _.width = Math.max(1, Math.round(f.width * w)), _.height = Math.max(1, Math.round(f.height * w));
      const $ = _.getContext("2d");
      if (!$) throw new Error("浏览器无法处理这张图片");
      $.drawImage(f, 0, 0, _.width, _.height);
      const H = await new Promise((E) => _.toBlob(E, D, Math.max(0.45, 0.8 - x * 0.08)));
      if (H && P.includes(H.type) && H.size <= j.imageBytes) return Jt(H);
      w *= 0.75;
    }
    throw new Error("图片压缩后仍超限，请先缩小后发送");
  } finally {
    f.close();
  }
}
const Mn = {
  class: "dj-modeless-layer",
  "aria-label": "海狸 DJ 音乐播控台"
}, In = { class: "dj-head-actions" }, Un = {
  class: "dj-source-tabs",
  role: "tablist"
}, Pn = { class: "ownership-left" }, En = { class: "ownership-icon" }, Tn = { class: "ownership-text" }, jn = { key: 0 }, Dn = { key: 1 }, An = { key: 2 }, Bn = { key: 3 }, Rn = { class: "ownership-right" }, Fn = {
  key: 0,
  class: "transfer-btn-wrapper"
}, Nn = {
  key: 0,
  class: "transfer-dropdown-menu"
}, Ln = ["onClick"], Hn = {
  key: 0,
  class: "transfer-empty-tip"
}, Wn = { class: "dj-turntable-zone" }, Vn = { class: "vinyl-outer-groove" }, zn = { class: "vinyl-inner-label" }, Gn = ["src"], Jn = { class: "vinyl-fallback-icon" }, On = { class: "dj-track-cues" }, qn = { class: "cue-top-meta" }, Yn = { class: "cue-source-tag" }, Xn = ["disabled"], Kn = ["title"], Qn = { class: "cue-track-artist" }, Zn = { class: "dj-seek-bar-row" }, ei = { class: "dj-time-cur" }, ti = ["value"], si = { class: "dj-time-dur" }, ai = { class: "dj-ctrl-row" }, ni = ["title"], ii = {
  key: 1,
  class: "dj-sync-indicator"
}, oi = { class: "dj-playlist-section" }, li = {
  key: 0,
  class: "source-panel-box"
}, ri = { class: "dj-tracks-grid" }, ci = ["onClick"], ui = { class: "track-seq-num" }, di = { class: "track-thumb-wrap" }, vi = ["src"], pi = { class: "track-meta" }, mi = ["title"], bi = ["title"], hi = { class: "track-cue-btn" }, fi = {
  key: 0,
  class: "dj-pagination-footer"
}, yi = { class: "dj-page-count-badge" }, gi = { class: "dj-page-btn-group" }, ki = ["disabled"], _i = ["disabled"], $i = {
  key: 1,
  class: "source-panel-box"
}, Ci = {
  key: 0,
  class: "netease-bind-banner"
}, wi = {
  key: 1,
  class: "netease-user-badge-bar"
}, xi = { class: "user-meta-left" }, Si = ["src"], Mi = {
  key: 1,
  class: "netease-user-avatar-fallback"
}, Ii = { class: "netease-user-name" }, Ui = {
  key: 0,
  class: "vip-badge"
}, Pi = { class: "netease-user-stat" }, Ei = { class: "user-meta-right" }, Ti = ["title", "disabled"], ji = {
  key: 2,
  class: "dj-tracks-grid"
}, Di = ["onClick"], Ai = { class: "track-seq-num" }, Bi = { class: "track-thumb-wrap" }, Ri = ["src"], Fi = { class: "track-meta" }, Ni = ["title"], Li = ["title"], Hi = {
  key: 0,
  class: "track-duration"
}, Wi = { class: "track-cue-btn" }, Vi = {
  key: 3,
  class: "dj-pagination-footer"
}, zi = { class: "dj-page-count-badge" }, Gi = { class: "dj-page-btn-group" }, Ji = ["disabled"], Oi = ["disabled"], qi = {
  key: 4,
  class: "empty-placeholder-box"
}, Yi = { key: 0 }, Xi = { key: 1 }, Ki = {
  key: 2,
  class: "source-panel-box"
}, Qi = { class: "bili-radio-nav-row" }, Zi = { class: "series-chips-wrap" }, eo = ["onClick"], to = { class: "source-panel-head" }, so = { class: "custom-id-input-wrap" }, ao = ["disabled"], no = {
  key: 0,
  class: "dj-tracks-grid"
}, io = ["onClick"], oo = { class: "track-thumb-wrap" }, lo = ["src"], ro = { class: "track-meta" }, co = { class: "track-name" }, uo = { class: "track-sub" }, vo = { class: "track-cue-btn" }, po = {
  key: 1,
  class: "empty-placeholder-box"
}, pt = 10, mt = 10, mo = /* @__PURE__ */ Xe({
  __name: "ChatMusicDjDialog",
  setup(Q) {
    const y = h("siren"), j = h(""), P = h(!1), D = h([
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
    ]), k = h(1), I = z(() => Math.max(1, Math.ceil(D.value.length / pt))), S = z(() => {
      const b = (k.value - 1) * pt;
      return D.value.slice(b, b + pt);
    });
    re(I, (b) => {
      k.value > b && (k.value = Math.max(1, b));
    });
    function N() {
      k.value > 1 && k.value--;
    }
    function f() {
      k.value < I.value && k.value++;
    }
    const w = z(() => X.neteaseUser || Ks.getUser()), _ = h(!1), x = h([]);
    function $() {
      if (!(typeof localStorage > "u"))
        try {
          const b = Us(Lt);
          b.length && Array.isArray(b) && b.length && (x.value = b, X.neteaseSongs.length || (X.neteaseSongs = b));
        } catch {
        }
    }
    $();
    const H = z(() => X.neteaseSongs && X.neteaseSongs.length > 0 ? X.neteaseSongs : x.value), E = h(1), T = z(() => Math.max(1, Math.ceil(H.value.length / mt))), U = z(() => {
      const b = (E.value - 1) * mt;
      return H.value.slice(b, b + mt);
    });
    re(T, (b) => {
      E.value > b && (E.value = Math.max(1, b));
    });
    function G() {
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
    async function se() {
      $(), _.value = !0;
      try {
        await Ne.loadNeteaseData();
        const b = (X.neteasePlaylists || []).find(
          (v) => v.name?.includes("喜欢的音乐") || v.specialType === 5
        ) || X.neteasePlaylists[0];
        if (b && await Ne.selectNeteasePlaylist(b), X.neteaseSongs && X.neteaseSongs.length > 0) {
          x.value = X.neteaseSongs;
          try {
            Ps(Lt, X.neteaseSongs);
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
      nt.open("music");
    }
    const le = h("all"), O = h(!1);
    async function A() {
      O.value = !0;
      try {
        await Js.init();
      } catch (b) {
        console.warn("[DJ] 初始化B站电台失败:", b);
      } finally {
        O.value = !1;
      }
    }
    const R = z(() => {
      if (le.value === "all") {
        const v = /* @__PURE__ */ new Map();
        for (const d of Re.radioSeries)
          for (const ie of d.items || [])
            ie.bvid && !v.has(ie.bvid) && v.set(ie.bvid, ie);
        for (const d of Re.radioQueue || [])
          d.bvid && !v.has(d.bvid) && v.set(d.bvid, d);
        return Array.from(v.values());
      }
      return le.value === "queue" ? Re.radioQueue || [] : Re.radioSeries.find((v) => v.id === le.value)?.items || [];
    });
    function be() {
      nt.open("bilibili");
    }
    const B = h(
      K.track || D.value[0]
    );
    re(
      () => K.track,
      (b) => {
        b && (B.value = { ...b });
      },
      { immediate: !0, deep: !0 }
    );
    const _e = h(!1), ve = z(() => (C.members || []).filter((b) => b.uid !== c.currentUser.uid));
    async function $e(b, v) {
      _e.value = !1, await Os(b, v);
    }
    async function pe() {
      await qs();
    }
    async function M(b) {
      if (!we.value) {
        Fe.fetch("海狸调音台", "播控已锁定", `当前由【${K.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
        return;
      }
      B.value = { ...b }, await st(b, "switch", !1);
    }
    async function F(b) {
      if (!we.value) {
        Fe.fetch("海狸调音台", "播控已锁定", `当前由【${K.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
        return;
      }
      const v = (b.ar || b.artists || []).map((oe) => typeof oe == "string" ? oe : oe.name).join(" / ") || "网易云歌手", d = b.al?.picUrl || b.album?.picUrl || b.picUrl || b.coverUrl || "", ie = {
        source: "netease",
        trackId: String(b.id),
        title: b.name,
        artist: v,
        cover: d
      };
      B.value = ie, await st(ie, "switch", !1);
    }
    async function V(b) {
      if (!we.value) {
        Fe.fetch("海狸调音台", "播控已锁定", `当前由【${K.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
        return;
      }
      const v = {
        source: "bilibili",
        trackId: b.bvid,
        title: b.title,
        artist: b.author || "B站UP主",
        cover: b.cover || ""
      };
      B.value = v, await st(v, "switch", !1);
    }
    async function q() {
      if (!we.value) {
        const v = Ut.getAudioElement();
        if (v && (v.paused || !X.playing))
          try {
            await v.play(), Fe.fetch("海狸同频", "已恢复本地播放", `正在与【${K.hostName}】同步收听《${B.value.title}》`);
            return;
          } catch (d) {
            console.warn("[DJ] 本地恢复播放失败:", d);
          }
        Fe.fetch("海狸调音台", "播控已锁定", `当前由【${K.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
        return;
      }
      const b = !X.playing;
      Ne.togglePlay(), K.isActive && B.value && await st(B.value, b ? "play" : "pause", !1);
    }
    function ne(b) {
      const v = Number(b.target.value);
      Ne.seek(v);
    }
    async function fe() {
      await Kt(!0), Mt();
    }
    async function he() {
      if (B.value) {
        P.value = !0;
        try {
          await st(B.value, "switch", !0);
        } finally {
          P.value = !1;
        }
      }
    }
    function Ee() {
      const b = j.value.trim();
      if (!b) return;
      const v = b.match(/BV[a-zA-Z0-9]+/i), d = v ? v[0] : b;
      B.value = {
        source: "bilibili",
        trackId: d,
        title: `B站点播 (${d})`,
        artist: "哔哩哔哩视频音频",
        cover: ""
      }, j.value = "";
    }
    function p(b) {
      const v = b.target;
      v && (v.style.display = "none");
    }
    const r = h(60), u = h(60), ee = h(!1);
    let ye = 0, xe = 0, Le = 0, He = 0, ge = 0;
    function Me() {
      se();
    }
    it(async () => {
      typeof window < "u" && (r.value = Math.max(20, window.innerWidth - 560 - 30), u.value = Math.max(30, Math.floor((window.innerHeight - 600) / 2)), window.addEventListener("netease:account-updated", Me));
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
          v.length && (D.value = v, B.value.source === "siren" && !B.value.cover && (B.value = v[0]));
        }
      } catch {
      }
      se(), A();
    }), Pt(() => {
      typeof window < "u" && window.removeEventListener("netease:account-updated", Me);
    });
    function ot(b) {
      if (b.target?.closest("button, input, a, select, [role='tab']")) return;
      ee.value = !0, ye = b.clientX, xe = b.clientY, Le = r.value, He = u.value;
      const d = b.currentTarget;
      try {
        d?.setPointerCapture(b.pointerId);
      } catch {
      }
      const ie = (We) => {
        if (!ee.value) return;
        const yt = We.clientX - ye, Qe = We.clientY - xe;
        ge && cancelAnimationFrame(ge), ge = requestAnimationFrame(() => {
          const Ze = Math.max(10, window.innerWidth - 200), Te = Math.max(10, window.innerHeight - 150);
          r.value = Math.min(Ze, Math.max(10, Le + yt)), u.value = Math.min(Te, Math.max(10, He + Qe));
        });
      }, oe = (We) => {
        ee.value = !1, ge && (cancelAnimationFrame(ge), ge = 0), window.removeEventListener("pointermove", ie), window.removeEventListener("pointerup", oe), window.removeEventListener("pointercancel", oe);
        try {
          d?.releasePointerCapture(We.pointerId);
        } catch {
        }
      };
      window.addEventListener("pointermove", ie, { passive: !0 }), window.addEventListener("pointerup", oe, { once: !0 }), window.addEventListener("pointercancel", oe, { once: !0 });
    }
    return (b, v) => (n(), i("aside", Mn, [
      e("div", {
        class: "dj-deck-dialog",
        style: Se({ left: `${r.value}px`, top: `${u.value}px` })
      }, [
        e("header", {
          class: "dj-deck-header",
          title: "按住此处可自由拖动调音台窗口",
          onPointerdown: ot
        }, [
          v[8] || (v[8] = e("div", { class: "dj-title-group" }, [
            e("span", {
              class: "dj-console-icon",
              "aria-hidden": "true"
            }, "🎛️"),
            e("div", null, [
              e("strong", { class: "dj-main-title" }, "海狸 DJ 音乐播控台"),
              e("small", { class: "dj-sub-title" }, "多人同步收听 · 塞壬唱片 / 网易云喜欢的音乐 / B站电台歌单")
            ])
          ], -1)),
          e("div", In, [
            e("span", {
              class: L(["dj-live-status-pill", { live: o(K).isActive }])
            }, l(o(K).isActive ? "🔴 正在广播中" : "⚪ 待机就绪"), 3),
            e("button", {
              type: "button",
              class: "dj-close-btn",
              title: "关闭调音台",
              onClick: v[0] || (v[0] = //@ts-ignore
              (...d) => o(Mt) && o(Mt)(...d))
            }, " ✕ ")
          ])
        ], 32),
        e("nav", Un, [
          e("button", {
            type: "button",
            class: L(["dj-source-tab", { active: y.value === "siren" }]),
            onClick: v[1] || (v[1] = (d) => y.value = "siren")
          }, [...v[9] || (v[9] = [
            e("span", { class: "tab-icon" }, "💿", -1),
            e("span", { class: "tab-text" }, "塞壬唱片 (Monster Siren)", -1)
          ])], 2),
          e("button", {
            type: "button",
            class: L(["dj-source-tab", { active: y.value === "netease" }]),
            onClick: v[2] || (v[2] = (d) => y.value = "netease")
          }, [...v[10] || (v[10] = [
            e("span", { class: "tab-icon" }, "🎵", -1),
            e("span", { class: "tab-text" }, "网易云音乐 (NetEase)", -1)
          ])], 2),
          e("button", {
            type: "button",
            class: L(["dj-source-tab", { active: y.value === "bilibili" }]),
            onClick: v[3] || (v[3] = (d) => y.value = "bilibili")
          }, [...v[11] || (v[11] = [
            e("span", { class: "tab-icon" }, "📻", -1),
            e("span", { class: "tab-text" }, "B站电台歌单 (Bilibili Radio)", -1)
          ])], 2)
        ]),
        e("div", {
          class: L(["dj-ownership-bar", { "is-host": o(we), "is-listener": !o(we) }])
        }, [
          e("div", Pn, [
            e("span", En, l(o(we) ? "👑" : "🎧"), 1),
            e("div", Tn, [
              o(we) ? (n(), i("strong", jn, "你是当前 DJ（独家播控权）")) : (n(), i("strong", Dn, "听众同频中 · 当前主持：【" + l(o(K).hostName || "房主") + "】", 1)),
              o(we) ? (n(), i("small", An, "你拥有播控权限，切歌与暂停将全员同步")) : (n(), i("small", Bn, "播控已被锁定，交换权力后即可自由切歌"))
            ])
          ]),
          e("div", Rn, [
            o(we) ? (n(), i("div", Fn, [
              e("button", {
                type: "button",
                class: "btn-transfer-control",
                title: "将 DJ 操控权移交给其他听友",
                onClick: v[4] || (v[4] = (d) => _e.value = !_e.value)
              }, " 🤝 移交控制权 ▾ "),
              _e.value ? (n(), i("div", Nn, [
                v[12] || (v[12] = e("div", { class: "transfer-menu-title" }, "移交打碟机给：", -1)),
                (n(!0), i(W, null, ce(ve.value, (d) => (n(), i("button", {
                  key: d.uid,
                  type: "button",
                  class: "transfer-peer-item",
                  onClick: (ie) => $e(d.uid, d.name)
                }, [
                  e("span", null, l(d.name), 1),
                  e("small", null, l(d.uid.slice(0, 8)), 1)
                ], 8, Ln))), 128)),
                ve.value.length ? m("", !0) : (n(), i("div", Hn, "暂无其他在线群友"))
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
        e("section", Wn, [
          e("div", {
            class: L(["dj-vinyl-disc", { spinning: o(K).isActive && o(K).isPlaying }])
          }, [
            e("div", Vn, [
              e("div", zn, [
                B.value.cover ? (n(), i("img", {
                  key: 0,
                  src: o(te)(B.value.cover),
                  class: "vinyl-cover-img",
                  referrerpolicy: "no-referrer",
                  alt: "",
                  onError: p
                }, null, 40, Gn)) : m("", !0),
                e("span", Jn, l(B.value.source === "bilibili" ? "📻" : B.value.source === "netease" ? "🎵" : "💿"), 1),
                v[13] || (v[13] = e("div", { class: "vinyl-center-hole" }, null, -1))
              ])
            ])
          ], 2),
          e("div", On, [
            e("div", qn, [
              e("div", Yn, l(B.value.source === "siren" ? "💿 塞壬官方原声" : B.value.source === "netease" ? "🎵 网易云音乐" : "📻 B站电台音频"), 1),
              e("button", {
                type: "button",
                class: "btn-send-invite-card",
                title: "在群聊中发送一张一起听邀请卡片，拉好友加入",
                disabled: P.value,
                onClick: he
              }, [...v[14] || (v[14] = [
                e("span", null, "✉️ 邀请群友", -1)
              ])], 8, Xn)
            ]),
            e("strong", {
              class: "cue-track-title",
              title: B.value.title
            }, l(B.value.title), 9, Kn),
            e("span", Qn, l(B.value.artist), 1),
            e("div", Zn, [
              e("span", ei, l(o(X).formattedCurrent || "0:00"), 1),
              e("input", {
                type: "range",
                class: "dj-seek-slider",
                min: "0",
                max: "100",
                value: o(X).progressPercent,
                onInput: ne
              }, null, 40, ti),
              e("span", si, l(o(X).formattedDuration || "0:00"), 1)
            ]),
            e("div", ai, [
              e("button", {
                type: "button",
                class: "dj-play-btn",
                title: o(X).playing ? "暂停" : "播放",
                onClick: q
              }, l(o(X).playing ? "⏸ 暂停" : "▶ 播放"), 9, ni),
              o(K).isActive ? (n(), i("button", {
                key: 0,
                type: "button",
                class: "dj-stop-btn",
                title: "结束当前一起听派对并关闭顶栏",
                onClick: fe
              }, " ⏹ 结束派对 ")) : m("", !0),
              o(K).isActive ? (n(), i("span", ii, " 🟢 同频中（" + l(o(K).listenersCount) + "人收听 · 切歌自动同步） ", 1)) : m("", !0)
            ])
          ])
        ]),
        e("main", oi, [
          y.value === "siren" ? (n(), i("div", li, [
            e("div", ri, [
              (n(!0), i(W, null, ce(S.value, (d, ie) => (n(), i("div", {
                key: d.trackId,
                class: L(["dj-track-item-card", { selected: B.value.trackId === d.trackId }]),
                onClick: (oe) => M(d)
              }, [
                e("span", ui, l((k.value - 1) * pt + ie + 1), 1),
                e("div", di, [
                  d.cover ? (n(), i("img", {
                    key: 0,
                    src: o(te)(d.cover),
                    class: "track-thumb",
                    referrerpolicy: "no-referrer",
                    alt: "",
                    onError: p
                  }, null, 40, vi)) : m("", !0),
                  v[15] || (v[15] = e("span", { class: "track-thumb-fallback" }, "💿", -1))
                ]),
                e("div", pi, [
                  e("strong", {
                    class: "track-name",
                    title: d.title
                  }, l(d.title), 9, mi),
                  e("small", {
                    class: "track-sub",
                    title: d.artist
                  }, l(d.artist), 9, bi)
                ]),
                e("span", hi, l(B.value.trackId === d.trackId ? "已装载" : "选曲"), 1)
              ], 10, ci))), 128))
            ]),
            I.value > 1 ? (n(), i("footer", fi, [
              e("span", yi, " 第 " + l(k.value) + " / " + l(I.value) + " 页 · 共 " + l(D.value.length) + " 首 ", 1),
              e("div", gi, [
                e("button", {
                  type: "button",
                  class: "btn-page-step",
                  disabled: k.value <= 1,
                  title: "上一页",
                  onClick: N
                }, " ◀ 上一页 ", 8, ki),
                e("button", {
                  type: "button",
                  class: "btn-page-step",
                  disabled: k.value >= I.value,
                  title: "下一页",
                  onClick: f
                }, " 下一页 ▶ ", 8, _i)
              ])
            ])) : m("", !0)
          ])) : y.value === "netease" ? (n(), i("div", $i, [
            w.value?.nickname ? (n(), i("div", wi, [
              e("div", xi, [
                w.value?.avatarUrl ? (n(), i("img", {
                  key: 0,
                  src: w.value.avatarUrl,
                  class: "netease-user-avatar",
                  alt: "",
                  referrerpolicy: "no-referrer",
                  onError: p
                }, null, 40, Si)) : (n(), i("span", Mi, "🎵")),
                e("div", null, [
                  e("strong", Ii, [
                    Y(l(w.value?.nickname || "网易云音乐用户") + " ", 1),
                    w.value?.isVip ? (n(), i("span", Ui, "VIP")) : m("", !0)
                  ]),
                  e("small", Pi, "已载入「我喜欢的音乐」(" + l(H.value.length) + " 首)", 1)
                ])
              ]),
              e("div", Ei, [
                e("button", {
                  type: "button",
                  class: "btn-refresh-fav",
                  title: _.value ? "正在刷新…" : "刷新我喜欢的音乐",
                  disabled: _.value,
                  onClick: se
                }, l(_.value ? "⏳" : "🔄 刷新"), 9, Ti)
              ])
            ])) : (n(), i("div", Ci, [
              v[16] || (v[16] = e("div", { class: "bind-banner-left" }, [
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
            U.value.length > 0 ? (n(), i("div", ji, [
              (n(!0), i(W, null, ce(U.value, (d, ie) => (n(), i("div", {
                key: d.id,
                class: L(["dj-track-item-card", { selected: B.value.trackId === String(d.id) }]),
                onClick: (oe) => F(d)
              }, [
                e("span", Ai, l((E.value - 1) * mt + ie + 1), 1),
                e("div", Bi, [
                  d.al?.picUrl || d.album?.picUrl || d.picUrl ? (n(), i("img", {
                    key: 0,
                    src: o(te)(d.al?.picUrl || d.album?.picUrl || d.picUrl),
                    class: "track-thumb",
                    referrerpolicy: "no-referrer",
                    alt: "",
                    onError: p
                  }, null, 40, Ri)) : m("", !0),
                  v[17] || (v[17] = e("span", { class: "track-thumb-fallback" }, "🎵", -1))
                ]),
                e("div", Fi, [
                  e("strong", {
                    class: "track-name",
                    title: d.name
                  }, l(d.name), 9, Ni),
                  e("small", {
                    class: "track-sub",
                    title: (d.ar || d.artists || []).map((oe) => typeof oe == "string" ? oe : oe.name).join(" / ")
                  }, l((d.ar || d.artists || []).map((oe) => typeof oe == "string" ? oe : oe.name).join(" / ") || "网易云歌手"), 9, Li)
                ]),
                d.dt ? (n(), i("span", Hi, l(Z(d.dt)), 1)) : m("", !0),
                e("span", Wi, l(B.value.trackId === String(d.id) ? "已装载" : "选曲"), 1)
              ], 10, Di))), 128))
            ])) : m("", !0),
            T.value > 1 ? (n(), i("footer", Vi, [
              e("span", zi, " 第 " + l(E.value) + " / " + l(T.value) + " 页 · 共 " + l(H.value.length) + " 首 ", 1),
              e("div", Gi, [
                e("button", {
                  type: "button",
                  class: "btn-page-step",
                  disabled: E.value <= 1,
                  title: "上一页",
                  onClick: G
                }, " ◀ 上一页 ", 8, Ji),
                e("button", {
                  type: "button",
                  class: "btn-page-step",
                  disabled: E.value >= T.value,
                  title: "下一页",
                  onClick: ae
                }, " 下一页 ▶ ", 8, Oi)
              ])
            ])) : U.value.length ? m("", !0) : (n(), i("div", qi, [
              v[18] || (v[18] = e("span", { class: "placeholder-icon" }, "🎵", -1)),
              _.value ? (n(), i("p", Yi, "正在从网易云加载「我喜欢的音乐」149 首曲库…")) : (n(), i("p", Xi, "暂无我喜欢的歌曲，点击上方「刷新」或打开网易云模块同步红心曲库"))
            ]))
          ])) : (n(), i("div", Ki, [
            e("div", Qi, [
              e("div", Zi, [
                e("button", {
                  type: "button",
                  class: L(["series-chip", { active: le.value === "all" }]),
                  onClick: v[5] || (v[5] = (d) => le.value = "all")
                }, " 🌟 全部曲目 (" + l(R.value.length) + ") ", 3),
                o(Re).radioQueue?.length ? (n(), i("button", {
                  key: 0,
                  type: "button",
                  class: L(["series-chip", { active: le.value === "queue" }]),
                  onClick: v[6] || (v[6] = (d) => le.value = "queue")
                }, " 📻 当前队列 (" + l(o(Re).radioQueue.length) + ") ", 3)) : m("", !0),
                (n(!0), i(W, null, ce(o(Re).radioSeries, (d) => (n(), i("button", {
                  key: d.id,
                  type: "button",
                  class: L(["series-chip", { active: le.value === d.id }]),
                  onClick: (ie) => le.value = d.id
                }, " 📑 " + l(d.name) + " (" + l(d.items?.length || 0) + ") ", 11, eo))), 128))
              ]),
              e("button", {
                type: "button",
                class: "btn-open-workspace",
                title: "打开B站收藏夹与电台管理",
                onClick: be
              }, " 📺 电台管理 ")
            ]),
            e("div", to, [
              v[19] || (v[19] = e("span", null, "B站电台歌单曲目（音频格式同频收听）", -1)),
              e("div", so, [
                Ue(e("input", {
                  "onUpdate:modelValue": v[7] || (v[7] = (d) => j.value = d),
                  placeholder: "输入 BV号 点播音频",
                  class: "custom-input",
                  onKeydown: qt(Ee, ["enter"])
                }, null, 544), [
                  [Pe, j.value]
                ]),
                e("button", {
                  type: "button",
                  class: "custom-add-btn",
                  disabled: !j.value.trim(),
                  onClick: Ee
                }, " 装载 ", 8, ao)
              ])
            ]),
            R.value.length > 0 ? (n(), i("div", no, [
              (n(!0), i(W, null, ce(R.value, (d) => (n(), i("div", {
                key: d.bvid,
                class: L(["dj-track-item-card", { selected: B.value.trackId === d.bvid }]),
                onClick: (ie) => V(d)
              }, [
                e("div", oo, [
                  d.cover ? (n(), i("img", {
                    key: 0,
                    src: o(te)(d.cover),
                    class: "track-thumb",
                    referrerpolicy: "no-referrer",
                    alt: "",
                    onError: p
                  }, null, 40, lo)) : m("", !0),
                  v[20] || (v[20] = e("span", { class: "track-thumb-fallback" }, "📻", -1))
                ]),
                e("div", ro, [
                  e("strong", co, l(d.title), 1),
                  e("small", uo, l(d.author || "B站UP主") + " · " + l(d.bvid), 1)
                ]),
                e("span", vo, l(B.value.trackId === d.bvid ? "已装载" : "选曲"), 1)
              ], 10, io))), 128))
            ])) : (n(), i("div", po, [
              v[21] || (v[21] = e("span", { class: "placeholder-icon" }, "📻", -1)),
              v[22] || (v[22] = e("p", null, "你的B站电台暂无已保存的歌单曲目", -1)),
              e("button", {
                type: "button",
                class: "btn-bind-action",
                onClick: be
              }, " 📺 前往B站模块将收藏夹加入电台 ")
            ]))
          ]))
        ])
      ], 4)
    ]));
  }
}), bo = /* @__PURE__ */ Ke(mo, [["__scopeId", "data-v-35a18cca"]]), ho = { class: "sticker-popover-head" }, fo = { class: "sticker-head-left" }, yo = { class: "sticker-head-count" }, go = { class: "sticker-head-actions" }, ko = ["disabled"], _o = { class: "sticker-groups-bar" }, $o = ["disabled"], Co = ["disabled", "onClick"], wo = {
  key: 0,
  class: "picker-hint",
  role: "status"
}, xo = { class: "sticker-grid-wrap" }, So = {
  key: 0,
  class: "sticker-state-empty"
}, Mo = {
  key: 1,
  class: "sticker-state-empty"
}, Io = {
  key: 2,
  class: "sticker-grid"
}, Uo = ["disabled", "title", "onClick"], Po = ["src", "alt"], Eo = { class: "sticker-name-tag" }, To = {
  key: 1,
  class: "picker-pagination",
  "aria-label": "表情包分页"
}, jo = ["disabled"], Do = ["disabled"], Ao = /* @__PURE__ */ Xe({
  __name: "ChatStickerPicker",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["close", "select"],
  setup(Q, { emit: y }) {
    const j = Q, P = y, D = Zt(), k = D.state, I = h(!document.hidden), S = h(!1), N = h(""), f = h(null);
    let w = !0, _ = 0;
    const x = () => w && j.active && I.value, $ = new Qt(D, x, ft, 12);
    $.onToast = (O) => {
      w && (N.value = O);
    };
    const H = z(() => k.folders.filter((O) => O.path !== ""));
    let E;
    async function T(O) {
      if (!(!x() || S.value)) {
        N.value = "";
        try {
          await D.dispatch("select-folder", O);
        } catch {
          N.value = "分类读取失败，请刷新图库";
        }
      }
    }
    async function U(O) {
      if (!x() || S.value) return;
      const A = _;
      S.value = !0;
      try {
        const R = await $.readItemBlob(O);
        if (!x() || A !== _) return;
        P("select", R), P("close");
      } catch {
        x() && (N.value = "原图读取失败，请检查图库读取权限");
      } finally {
        w && (S.value = !1);
      }
    }
    async function G(O) {
      const A = O.target, R = Array.from(A.files || []);
      if (A.value = "", !(!x() || S.value || !R.length)) {
        if (R.length > 50) {
          N.value = "一次最多导入50张，请分批选择";
          return;
        }
        S.value = !0;
        try {
          await ft(async () => {
            if (k.storageKind === "indexeddb") await $.saveFilesToIndexedDb(R);
            else {
              const be = $.getActiveTargetHandle();
              if (!be) throw new Error("图库需要重新授权，未转存内置库");
              await $.saveFilesToDir(be.handle, R, be.name);
            }
          }), x() && (N.value = "图片已加入同一图库，未发送聊天消息。");
        } catch {
          x() && (N.value = "保存未完成，可能已有部分图片写入；请核对目录与权限，不要重复导入");
        } finally {
          w && (S.value = !1);
        }
      }
    }
    async function ae() {
      if (!x() || S.value || k.loading) return;
      const O = $.getActiveTargetHandle();
      if (k.storageKind === "directory" && (!O || !await $.ensureHandlePermission(O.handle))) {
        N.value = "请先在图库设置中授权读取/添加图片";
        return;
      }
      x() && f.value?.click();
    }
    function Z() {
      P("close"), Qs.open("storage", "stickers"), nt.activate("settings");
    }
    function se() {
      P("close"), nt.activate("stickers");
    }
    function ue() {
      _++, $.pauseReads(), $.clearBlobUrlCache();
    }
    function le() {
      I.value = !document.hidden, x() ? $.activate() : ue();
    }
    return re(() => j.active, (O) => {
      O && I.value ? $.activate() : ue();
    }), it(() => {
      $.enableBoardPaging(), E = $.attachBoard(), $.init(), document.addEventListener("visibilitychange", le);
    }), Yt(() => {
      w = !1, ue(), E?.(), $.dispose(), document.removeEventListener("visibilitychange", le);
    }), (O, A) => (n(), i("div", {
      class: "chat-sticker-popover",
      onClick: A[4] || (A[4] = J(() => {
      }, ["stop"]))
    }, [
      e("header", ho, [
        e("div", fo, [
          A[5] || (A[5] = e("span", { class: "sticker-head-title" }, "我的表情包", -1)),
          e("span", yo, "(" + l(o(k).totalCount) + ")", 1)
        ]),
        e("div", go, [
          e("button", {
            type: "button",
            class: "sticker-act-btn",
            disabled: S.value || o(k).loading,
            onClick: ae
          }, "＋ 添加", 8, ko),
          e("button", {
            type: "button",
            class: "sticker-act-btn",
            onClick: Z
          }, "图库设置"),
          e("button", {
            type: "button",
            class: "sticker-act-btn",
            onClick: se
          }, "表情库"),
          e("button", {
            type: "button",
            class: "sticker-close-btn",
            "aria-label": "关闭表情面板",
            onClick: A[0] || (A[0] = (R) => P("close"))
          }, "✕")
        ])
      ]),
      e("div", _o, [
        e("button", {
          type: "button",
          class: L(["sticker-group-pill", { active: o(k).activePath === "" }]),
          disabled: S.value || o(k).loading,
          onClick: A[1] || (A[1] = (R) => T(""))
        }, "全部", 10, $o),
        (n(!0), i(W, null, ce(H.value, (R) => (n(), i("button", {
          key: R.path,
          type: "button",
          class: L(["sticker-group-pill", { active: o(k).activePath === R.path }]),
          disabled: S.value || o(k).loading,
          onClick: (be) => T(R.path)
        }, l(`${"－".repeat(Math.max(0, R.depth - 1))}${R.name}`), 11, Co))), 128))
      ]),
      A[6] || (A[6] = e("p", { class: "picker-hint" }, "使用本地图库。点击发送；较大静态图会压缩，动图最多1MB。", -1)),
      N.value ? (n(), i("p", wo, l(N.value), 1)) : m("", !0),
      e("div", xo, [
        o(k).loading ? (n(), i("div", So, "正在读取图库…")) : o(k).items.length ? (n(), i("div", Io, [
          (n(!0), i(W, null, ce(o(k).items, (R) => (n(), i("button", {
            key: R.id,
            type: "button",
            class: "sticker-grid-item",
            disabled: S.value,
            title: "发送图片：" + R.file,
            onClick: (be) => U(R)
          }, [
            R.url ? (n(), i("img", {
              key: 0,
              src: R.url,
              alt: R.file,
              class: "sticker-img",
              loading: "lazy"
            }, null, 8, Po)) : m("", !0),
            e("span", Eo, l(R.file), 1)
          ], 8, Uo))), 128))
        ])) : (n(), i("div", Mo, l(o(k).emptyText || "当前分类没有图片，可在图库设置中选择文件夹。"), 1))
      ]),
      o(k).totalPages > 1 ? (n(), i("nav", To, [
        e("button", {
          type: "button",
          disabled: S.value || o(k).loading || o(k).currentPage <= 1,
          onClick: A[2] || (A[2] = (R) => o($).prevPage())
        }, "上一页", 8, jo),
        e("span", null, l(o(k).currentPage) + " / " + l(o(k).totalPages), 1),
        e("button", {
          type: "button",
          disabled: S.value || o(k).loading || o(k).currentPage >= o(k).totalPages,
          onClick: A[3] || (A[3] = (R) => o($).nextPage())
        }, "下一页", 8, Do)
      ])) : m("", !0),
      e("input", {
        ref_key: "fileInputRef",
        ref: f,
        type: "file",
        accept: "image/png,image/jpeg,image/gif,image/webp,image/bmp",
        multiple: "",
        hidden: "",
        onChange: G
      }, null, 544)
    ]));
  }
}), Bo = /* @__PURE__ */ Ke(Ao, [["__scopeId", "data-v-ddfa0e58"]]), Ro = { class: "status-text" }, Fo = ["title"], No = { class: "chat-container" }, Lo = {
  key: 0,
  role: "status",
  class: "chat-error-bar"
}, Ho = { class: "chat-error-text" }, Wo = { class: "chat-error-actions" }, Vo = {
  key: 1,
  class: "chat-settings-page"
}, zo = { class: "settings-page-header" }, Go = { class: "settings-page-body" }, Jo = { class: "profile-card-right" }, Oo = {
  key: 0,
  class: "chat-profile-feedback",
  role: "status"
}, qo = ["disabled"], Yo = { class: "settings-card setup-card-wrap" }, Xo = {
  key: 2,
  class: "chat-three-column-layout"
}, Ko = {
  open: "",
  class: "sidebar-room-members"
}, Qo = { class: "members-scroll-inner" }, Zo = { key: 0 }, el = ["title", "onContextmenu", "onClick"], tl = { class: "member-avatar-wrap" }, sl = ["src", "onError"], al = {
  key: 1,
  class: "member-avatar-text"
}, nl = { class: "member-info-col" }, il = { class: "member-name" }, ol = { class: "col-main-content" }, ll = { class: "current-room-bar" }, rl = { class: "room-title-info" }, cl = { class: "shared-room-description" }, ul = { key: 0 }, dl = { class: "shared-room-description" }, vl = { class: "room-bar-right-actions" }, pl = { class: "notif-bell-wrap" }, ml = {
  key: 0,
  class: "notif-count-badge"
}, bl = { class: "notif-popover-head" }, hl = { class: "notif-popover-body" }, fl = { class: "notif-user-row" }, yl = { class: "notif-avatar" }, gl = { class: "notif-info" }, kl = { class: "notif-name" }, _l = { class: "notif-uid" }, $l = { class: "notif-action-row" }, Cl = ["onClick"], wl = ["onClick"], xl = {
  key: 0,
  class: "notif-empty"
}, Sl = {
  key: 0,
  class: "party-top-bar"
}, Ml = { class: "party-bar-text" }, Il = { class: "party-bar-actions" }, Ul = ["aria-busy"], Pl = {
  key: 0,
  class: "chat-sys-banner"
}, El = ["title", "onContextmenu"], Tl = ["src", "onError"], jl = { key: 1 }, Dl = { class: "chat-msg-content-wrap" }, Al = { class: "chat-msg-meta" }, Bl = { class: "chat-sender-name" }, Rl = { class: "chat-msg-time" }, Fl = { class: "chat-message-actions-content" }, Nl = ["onClick"], Ll = ["onClick"], Hl = { class: "chat-msg-delivery-box" }, Wl = ["title", "aria-label"], Vl = ["onClick"], zl = ["src"], Gl = {
  key: 1,
  class: "music-icon"
}, Jl = { class: "music-info" }, Ol = { class: "music-title" }, ql = { class: "music-artist" }, Yl = ["onClick", "onContextmenu"], Xl = { class: "bili-card-title" }, Kl = { class: "bili-card-up-row" }, Ql = ["src"], Zl = { class: "bili-up-name" }, er = {
  key: 1,
  class: "bili-up-fans"
}, tr = { class: "bili-card-cover-wrap" }, sr = ["src"], ar = {
  key: 0,
  class: "bili-hot-tag"
}, nr = { class: "bili-cover-bottom" }, ir = { key: 0 }, or = { key: 1 }, lr = {
  key: 2,
  class: "chat-series-card"
}, rr = { class: "series-card-head" }, cr = { class: "series-title-row" }, ur = { class: "series-name" }, dr = { class: "series-items-scroll-box" }, vr = ["title", "onClick"], pr = { class: "series-item-num" }, mr = ["src"], br = { class: "series-item-title" }, hr = { class: "series-card-footer" }, fr = ["onClick"], yr = { class: "gh-card-top-row" }, gr = ["src"], kr = {
  key: 1,
  class: "gh-owner-icon"
}, _r = { class: "gh-repo-fullname" }, $r = { class: "gh-owner-name" }, Cr = { class: "gh-repo-name" }, wr = { class: "gh-card-tags" }, xr = { class: "gh-tag-pill" }, Sr = { class: "gh-card-desc" }, Mr = { class: "gh-card-footer" }, Ir = { class: "gh-star-stat" }, Ur = { class: "gh-lang-stat" }, Pr = { class: "gh-date-stat" }, Er = ["onClick"], Tr = { class: "aihot-card-badge" }, jr = { class: "aihot-card-title" }, Dr = {
  key: 0,
  class: "aihot-card-summary"
}, Ar = { class: "aihot-card-footer" }, Br = ["onClick"], Rr = { class: "yt-thumb-wrap" }, Fr = ["src"], Nr = { class: "yt-title" }, Lr = { class: "yt-author" }, Hr = {
  key: 6,
  class: "chat-image-bubble"
}, Wr = ["src", "onClick"], Vr = ["onClick"], zr = {
  key: 2,
  class: "chat-unsafe-tip"
}, Gr = ["title", "onClick"], Jr = { class: "website-card-icon-wrap" }, Or = ["src"], qr = {
  key: 1,
  class: "website-card-icon-fallback"
}, Yr = { class: "website-card-info" }, Xr = { class: "website-card-title" }, Kr = { class: "website-card-domain" }, Qr = {
  key: 0,
  class: "website-card-note"
}, Zr = ["title", "onClick"], ec = { class: "server-invite-icon-wrap" }, tc = { class: "server-invite-icon" }, sc = { class: "server-invite-info" }, ac = { class: "server-invite-head" }, nc = { class: "server-invite-title" }, ic = { class: "server-invite-origin" }, oc = {
  key: 9,
  class: "chat-party-card"
}, lc = { class: "party-card-head" }, rc = { class: "party-source-label" }, cc = { class: "party-card-main" }, uc = { class: "party-cover-wrap" }, dc = ["src"], vc = {
  key: 1,
  class: "party-cover-fallback"
}, pc = { class: "party-meta-info" }, mc = { class: "party-meta-title" }, bc = { class: "party-meta-artist" }, hc = { class: "party-meta-host" }, fc = { class: "party-card-foot" }, yc = ["onClick"], gc = {
  key: 1,
  class: "party-joined-badge"
}, kc = {
  key: 10,
  class: "chat-msg-text"
}, _c = {
  key: 0,
  role: "alert"
}, $c = {
  key: 1,
  class: "chat-image-error",
  role: "alert"
}, Cc = {
  key: 2,
  class: "chat-image-processing",
  role: "status"
}, wc = { class: "chat-tools-strip" }, xc = ["title", "disabled"], Sc = { class: "chat-sticker-btn-anchor" }, Mc = ["title", "disabled"], Ic = {
  key: 3,
  class: "chat-pending-image-bar"
}, Uc = { class: "pending-img-wrap" }, Pc = ["src"], Ec = { class: "chat-textarea-wrap" }, Tc = ["maxlength"], jc = ["disabled", "title"], Dc = { class: "user-card-head" }, Ac = { class: "user-card-avatar-wrap" }, Bc = ["src"], Rc = {
  key: 1,
  class: "user-card-avatar-emoji"
}, Fc = { class: "user-card-meta" }, Nc = { class: "user-card-name" }, Lc = { class: "user-card-uid" }, Hc = { class: "user-card-body" }, Wc = { class: "user-status-row" }, Vc = { class: "user-status-text" }, zc = {
  key: 0,
  class: "user-card-friend-action"
}, Gc = {
  key: 1,
  type: "button",
  class: "card-add-friend-btn",
  disabled: ""
}, Jc = { class: "user-activity-section" }, Oc = { class: "activity-content-box" }, qc = { class: "act-icon" }, Yc = { class: "act-details" }, Xc = { class: "act-title" }, Kc = { key: 0 }, Qc = { key: 1 }, Zc = { key: 2 }, eu = { key: 3 }, tu = { key: 4 }, su = { key: 5 }, au = ["title"], nu = { class: "chat-context-header" }, iu = { style: { "margin-left": "6px", opacity: "0.7" } }, ou = {
  key: 1,
  type: "button",
  class: "chat-context-item",
  disabled: ""
}, lu = { class: "create-room-modal-card" }, ru = { class: "create-room-title" }, cu = { class: "create-room-form" }, uu = { class: "icon-selector-row" }, du = ["onClick"], vu = { class: "create-room-actions" }, pu = ["disabled"], mu = { class: "create-room-modal-card" }, bu = { class: "create-room-title" }, hu = { class: "create-room-form" }, fu = { class: "icon-selector-row" }, yu = ["onClick"], gu = { class: "create-room-actions" }, ku = ["disabled"], _u = { class: "chat-context-header" }, $u = { class: "chat-context-header" }, Cu = { class: "create-room-modal-card" }, wu = { class: "create-room-title" }, xu = { class: "create-room-form" }, Su = { class: "icon-selector-row" }, Mu = ["onClick"], Iu = { class: "create-room-actions" }, Uu = ["disabled"], Pu = /* @__PURE__ */ Xe({
  __name: "ChatDialog",
  setup(Q) {
    const y = z(() => Xt(c.currentUser.uid, c.serverUrl, c.currentRoomId)), j = z(() => c.messages.filter((a) => !a.meta?.silentPartySync));
    function P(a) {
      Ys(a);
    }
    function D() {
      we.value ? Kt(!0) : (It(), Xs());
    }
    function k(a) {
      return typeof a == "string" && a.length <= 32 && !/[:/]/.test(a) && a || "👤";
    }
    const I = z(() => Vt()), S = z(() => {
      const a = f.value.user;
      return a ? a.uid === c.currentUser.uid ? I.value || c.currentUser.activity || Vt() : C.members.find((s) => s.uid === a.uid)?.activity || c.userActivities[a.uid] || a.activity : null;
    }), N = z(() => {
      const a = f.value.user;
      if (!a) return !1;
      if (a.uid === c.currentUser.uid) return !0;
      const t = C.members.find((s) => s.uid === a.uid);
      return t ? t.online : !!a.online;
    }), f = h({
      visible: !1,
      x: 0,
      y: 0,
      user: null
    });
    function w(a, t) {
      a.preventDefault(), a.stopPropagation();
      const s = { ...t }, g = C.members.find((Be) => Be.uid === s.uid);
      g && (g.activity && (s.activity = g.activity), s.online = g.online, s.name = g.name || s.name, s.avatar = g.avatar || s.avatar), s.uid === c.currentUser.uid && I.value ? (s.activity = I.value, s.online = !0) : c.userActivities[s.uid] && (s.activity = c.userActivities[s.uid]), f.value = {
        visible: !0,
        x: a.clientX,
        y: a.clientY,
        user: s
      };
    }
    re(
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
    function H() {
      x.value?.click();
    }
    const E = h(!1), T = h(!1), U = h("");
    let G = 0, ae = !0;
    re(y, () => {
      G++, $.value = null, U.value = "";
    }), re(() => c.visible, (a) => {
      !a && E.value && G++;
    });
    async function Z(a, t = !1) {
      if (E.value || T.value) return;
      const s = ++G, g = y.value, Be = () => ae && c.visible && !document.hidden && s === G && g === y.value;
      E.value = !0, U.value = "";
      try {
        const qe = await Sn(a, C.capabilities);
        if (!Be()) return;
        if (t) {
          const fs = await me.sendImageMessage(qe);
          if (!Be()) return;
          fs ? fe() : $.value = qe;
        } else $.value = qe;
      } catch (qe) {
        Be() && (U.value = qe?.message || "图片处理失败，请换一张图片");
      } finally {
        ae && (E.value = !1);
      }
    }
    async function se(a) {
      const t = a.target, s = t.files?.[0];
      t.value = "", s && await Z(s);
    }
    function ue() {
      G++, $.value = null, U.value = "";
    }
    async function le(a) {
      const t = a.clipboardData;
      if (!t) return;
      const s = Array.from(t.items || []).find((g) => g.kind === "file" && g.type.startsWith("image/"))?.getAsFile() || Array.from(t.files || []).find((g) => g.type.startsWith("image/"));
      s && (a.preventDefault(), a.stopPropagation(), await Z(s));
    }
    function O(a) {
      Z(a, !0);
    }
    const A = h({
      visible: !1,
      x: 0,
      y: 0,
      meta: null
    });
    function R(a, t) {
      a.preventDefault(), a.stopPropagation(), A.value = {
        visible: !0,
        x: a.clientX,
        y: a.clientY,
        meta: t
      };
    }
    function be() {
      A.value.visible = !1, A.value.meta = null;
    }
    function B(a) {
      const t = A.value.meta;
      if (be(), !t) return;
      const s = t.bvid || (t.aid ? `av${t.aid}` : ""), g = s ? `https://www.bilibili.com/video/${s}` : "https://www.bilibili.com";
      a === "play" ? b(t) : a === "open" ? window.open(g, "_blank", "noreferrer") : a === "copy-link" ? navigator.clipboard.writeText(g) : a === "cache" ? zt.dispatch("organizer-video-action", {
        id: s,
        video: { bvid: s, aid: t.aid, title: t.videoTitle, cover: t.videoCover, url: g },
        action: "cache"
      }) : a === "subtitle" && zt.dispatch("organizer-video-action", {
        id: s,
        video: { bvid: s, aid: t.aid, title: t.videoTitle, cover: t.videoCover, url: g },
        action: "subtitle"
      });
    }
    function _e(a) {
      a && Ht.openVideo({
        bvid: a.bvid || (a.aid ? `av${a.aid}` : ""),
        aid: a.aid,
        title: a.title,
        cover: a.cover,
        author: a.author
      });
    }
    const ve = h(""), $e = z(() => {
      const a = C.capabilities;
      return a.status === "unknown" || a.status === "incompatible" ? a.reason : $.value && !a.messageTypes.includes("image") ? a.reason || "服务端未启用图片消息" : ve.value.trim() && !a.messageTypes.includes("text") ? "此服务端未启用文字消息，草稿已保留。" : "";
    }), pe = h(null), M = h(c.currentUser.name), F = h(!1);
    re(M, () => {
      F.value = !1;
    });
    function V() {
      M.value.trim() && (Ds(M.value, c.currentUser.avatar), M.value = c.currentUser.name, at(() => {
        F.value = !0;
      }));
    }
    h(c.currentUser.avatar);
    const q = h(c.serverUrl);
    h(c.shareActivity);
    const ne = h(null);
    function fe() {
      at(() => {
        pe.value && (pe.value.scrollTop = pe.value.scrollHeight);
      });
    }
    re(
      () => c.messages.length,
      () => {
        bt.value || fe();
      }
    ), re(
      () => c.serverUrl,
      (a) => {
        q.value = a;
      }
    ), re(
      () => c.visible,
      (a) => {
        a && (c.unreadCount = 0, fe(), q.value = c.serverUrl, me.connect());
      },
      { immediate: !0 }
    );
    const he = h(!1);
    function Ee() {
      he.value = !he.value;
    }
    async function p(a) {
      if (a)
        try {
          const t = new Qt(Zt(), () => c.visible && !document.hidden, ft, 0);
          t.isBoardPaging = !1;
          try {
            const s = await ft(() => t.saveImageToFavoritesAny(a.startsWith("data:image/") ? { dataUrl: a } : { url: a }));
            if (!s.ok) throw new Error(s.error);
            Fe.fetch("海狸表情包", "收藏成功", "已加入当前图库，未使用 Native Host。");
          } finally {
            t.dispose();
          }
        } catch (t) {
          console.warn("收藏表情失败:", t), Fe.fetch("海狸表情包", "收藏未完成", "无法读取图片数据，请重试。");
        }
    }
    function r() {
      Ce(), Ge.value = !1, he.value = !1;
    }
    it(() => {
      fe(), window.addEventListener("click", r);
    }), Pt(() => {
      ae = !1, G++, window.removeEventListener("click", r);
    });
    async function u() {
      if (E.value || T.value) return;
      if ($e.value) {
        vt.value = $e.value;
        return;
      }
      const a = y.value, t = G, s = $.value, g = ve.value;
      if (s) {
        T.value = !0;
        try {
          if (!await me.sendImageMessage(s)) return;
          t === G && $.value === s && ($.value = null);
        } catch {
          U.value = "图片入队未确认，待发图片已保留，请检查存储";
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
            ae && a === y.value && t === G && ve.value === g && (ve.value = "");
          } catch {
            vt.value = "文字入队未确认，草稿已保留，请检查存储后重试。";
          } finally {
            T.value = !1;
          }
        }
        fe();
      }
    }
    function ee(a) {
      a.key === "Enter" && !a.shiftKey && (a.preventDefault(), u());
    }
    function ye() {
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
    function xe(a) {
      if (!a) return "";
      try {
        return new URL(a).hostname;
      } catch {
        return a;
      }
    }
    function Le(a) {
      const t = Wt(a?.linkUrl);
      t && window.open(t, "_blank", "noopener,noreferrer");
    }
    async function He(a) {
      if (!a) return;
      const t = String(a.neteaseId || a.sirenCid || a.musicTitle || "");
      ne.value = t;
      try {
        a.rawSong ? await Ne.playNeteaseTrack(a.rawSong) : a.sirenCid ? Ne.playTrack(a.sirenCid) : a.neteaseId && await Ne.playNeteaseTrack({ id: a.neteaseId, name: a.musicTitle, ar: [{ name: a.musicArtist }] });
      } finally {
        setTimeout(() => {
          ne.value === t && (ne.value = null);
        }, 1200);
      }
    }
    function ge(a) {
      const t = Wt(a);
      t && window.open(t, "_blank", "noopener,noreferrer");
    }
    function Me(a) {
      return !!te(a);
    }
    function ot(a, t) {
      const s = te(a);
      s && gs.open({
        source: s,
        title: t ? `${t} 发送的图片` : "聊天图片"
      });
    }
    function b(a) {
      a && Ht.openVideo({
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
      a?.repoUrl && ge(a.repoUrl);
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
    re(() => c.showProfileEdit, (a) => {
      a && (M.value = c.currentUser.name, F.value = !1, ie());
    });
    const oe = z(() => {
      const a = f.value.user;
      return a?.uid ? a.uid === c.currentUser.uid ? "self" : C.friends.includes(a.uid) || c.friends.some((t) => t.uid === a.uid) ? "mutual" : c.friendRequests.some((t) => (t.toUid === a.uid || t.from.uid === a.uid) && t.status === "pending") ? "pending" : "none" : "none";
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
    const Qe = z(() => c.groups.find((a) => a.id === c.currentGroupId) || c.groups[0]), Ze = h(!1), Te = h(""), gt = h("👥");
    function es() {
      Te.value.trim() && (As(Te.value, gt.value || "👥"), Te.value = "", Ze.value = !1, me.connect());
    }
    const lt = h(!1), Ve = h(""), kt = h("💬");
    function ts() {
      Ve.value.trim() && (Bs(Ve.value, kt.value || "💬"), Ve.value = "", lt.value = !1, me.connect());
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
    function Ce() {
      je.value.visible = !1, De.value.visible = !1, de.value.visible = !1, A.value.visible = !1, Ge.value = !1, _();
    }
    const de = h({
      visible: !1,
      x: 0,
      y: 0,
      member: null
    });
    function Tt(a, t) {
      a.preventDefault(), a.stopPropagation(), Ce(), de.value = {
        visible: !0,
        x: Math.min(a.clientX, window.innerWidth - 180),
        y: Math.min(a.clientY, window.innerHeight - 200),
        member: t
      };
    }
    function ss(a) {
      Ce(), w({ clientX: de.value.x, clientY: de.value.y, preventDefault() {
      }, stopPropagation() {
      } }, a);
    }
    function as(a) {
      Ce(), ht(a.uid);
    }
    function ns(a) {
      Ce(), me.sendFriendRequest({
        uid: a.uid,
        name: a.name,
        avatar: a.avatar
      }), c.error = `✓ 已向【${a.name}】发送好友申请！`, setTimeout(() => {
        c.error.startsWith("✓ 已向") && (c.error = "");
      }, 3e3);
    }
    async function jt(a) {
      Ce();
      try {
        await Rs(a), c.error = `✓ 已向【${a.name}】发送服务器邀请卡片！`, setTimeout(() => {
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
          await Fs(a.inviteCode), c.error = `✓ 成功加入聊天室【${a.inviteServerName || a.inviteRoom}】！`, setTimeout(() => {
            c.error.startsWith("✓ 成功加入") && (c.error = "");
          }, 4e3);
        } catch (t) {
          c.error = `加入聊天室失败：${t.message || t}`;
        }
    }
    function os(a) {
      return C.friends.includes(a) || c.friends.some((t) => t.uid === a && t.status === "mutual");
    }
    function ls(a) {
      return c.friendRequests.some((t) => (t.toUid === a || t.from.uid === a) && t.status === "pending");
    }
    const et = h(!1), _t = h("group"), rt = h(""), $t = h(""), Ae = h(""), ze = h("💬");
    function rs(a) {
      Ce(), _t.value = "group", rt.value = a.id, $t.value = `重命名群空间【${a.name}】`, Ae.value = a.name, ze.value = a.icon || "👥", et.value = !0;
    }
    function cs(a) {
      Ce(), _t.value = "channel", rt.value = a.id, $t.value = `重命名频道【${a.name}】`, Ae.value = a.name, ze.value = a.icon || "💬", et.value = !0;
    }
    function us() {
      Ae.value.trim() && (_t.value === "group" ? Ns(rt.value, Ae.value, ze.value) : Ls(c.currentGroupId, rt.value, Ae.value, ze.value), et.value = !1);
    }
    function ds(a) {
      Ce(), Hs(c.currentGroupId, a), me.connect();
    }
    function vs(a) {
      Ce(), Ws(a), me.connect();
    }
    const Ct = z(() => C.members), Dt = h(/* @__PURE__ */ new Set());
    function ct(a) {
      return a.uid === c.currentUser.uid ? c.currentUser.avatar : C.members.find((t) => t.uid === a.uid)?.avatar || a.avatar;
    }
    function ut(a) {
      const t = te(ct(a));
      return Dt.value.has(t) ? "" : t;
    }
    function At(a) {
      Dt.value.add(te(ct(a)));
    }
    const Ge = h(!1), Je = z(() => {
      const a = zs(C.channel);
      if (!a) return null;
      const t = C.members.find((g) => g.uid === a), s = c.friends.find((g) => g.uid === a);
      return {
        uid: a,
        name: t?.name || s?.name || a,
        avatar: t?.avatar || s?.avatar || "🦫",
        online: t?.online ?? !1,
        activity: t?.activity || c.userActivities[a]
      };
    }), Oe = z(() => c.friendRequests.filter((a) => a.toUid === c.currentUser.uid && a.status === "pending"));
    function ps(a) {
      me.respondFriendRequest(a, !0);
    }
    function ms(a) {
      me.respondFriendRequest(a, !1), Vs(a.id);
    }
    function bs() {
      nt.close("chat");
    }
    function hs(a) {
      const t = new Date(a), s = String(t.getHours()).padStart(2, "0"), g = String(t.getMinutes()).padStart(2, "0");
      return `${s}:${g}`;
    }
    return (a, t) => (n(), ke(o(ys), {
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
          class: L(["chat-status-pill", { online: o(c).connected }])
        }, [
          t[50] || (t[50] = e("span", { class: "status-dot" }, null, -1)),
          e("span", Ro, l(o(c).connected ? "已连接私有服务器" : o(c).connecting ? "同步中…" : o(c).error ? "同步失败" : o(C).status), 1)
        ], 2)
      ]),
      "header-actions": tt(() => [
        e("button", {
          type: "button",
          class: L(["chat-icon-btn", { active: o(c).showProfileEdit }]),
          title: o(c).showProfileEdit ? "返回自习室" : "设置我的昵称与房间配置",
          onClick: t[0] || (t[0] = (s) => o(c).showProfileEdit = !o(c).showProfileEdit)
        }, l(o(c).showProfileEdit ? "💬" : "⚙️"), 11, Fo)
      ]),
      default: tt(() => [
        e("div", No, [
          o(c).error ? (n(), i("div", Lo, [
            e("span", Ho, l(o(c).error), 1),
            e("div", Wo, [
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
          o(c).showProfileEdit ? (n(), i("div", Vo, [
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
            e("div", Go, [
              e("form", {
                class: "settings-card chat-profile-card",
                onSubmit: J(V, ["prevent"])
              }, [
                t[53] || (t[53] = e("div", { class: "profile-card-left" }, [
                  e("span", { class: "profile-card-icon" }, "👤"),
                  e("div", { class: "profile-card-label" }, [
                    e("strong", null, "我的聊天昵称"),
                    e("small", null, "在群聊与房间中对好友展示的名字")
                  ])
                ], -1)),
                e("div", Jo, [
                  Ue(e("input", {
                    "onUpdate:modelValue": t[5] || (t[5] = (s) => M.value = s),
                    class: "chat-settings-input",
                    maxlength: "100",
                    autocomplete: "off",
                    placeholder: "设置你的聊天昵称"
                  }, null, 512), [
                    [Pe, M.value]
                  ]),
                  F.value ? (n(), i("span", Oo, "✅ 已保存")) : m("", !0),
                  e("button", {
                    type: "submit",
                    class: "settings-save-btn",
                    disabled: !M.value.trim() || M.value.trim() === o(c).currentUser.name
                  }, " 保存 ", 8, qo)
                ])
              ], 32),
              e("div", Yo, [
                dt(Gs)
              ])
            ])
          ])) : (n(), i("div", Xo, [
            dt(vn, {
              onSettings: t[6] || (t[6] = (s) => o(c).showProfileEdit = !0)
            }, {
              members: tt(() => [
                e("details", Ko, [
                  e("summary", null, "房间成员 · " + l(Ct.value.length), 1),
                  e("div", Qo, [
                    Ct.value.length ? m("", !0) : (n(), i("p", Zo, l(o(Es) ? o(c).error ? "成员列表尚未同步，请重试" : "正在获取成员列表…" : "尚未配置连接，请点击设置或成员与邀请。"), 1)),
                    (n(!0), i(W, null, ce(Ct.value, (s) => (n(), i("div", {
                      key: s.uid,
                      class: "member-item-row",
                      title: `${s.name}（${s.role === "owner" ? "群主" : "成员"} · 右键更多操作）`,
                      onContextmenu: J((g) => Tt(g, s), ["prevent"]),
                      onClick: (g) => Tt(g, s)
                    }, [
                      e("div", tl, [
                        ut(s) ? (n(), i("img", {
                          key: 0,
                          src: ut(s),
                          class: "member-avatar-img",
                          referrerpolicy: "no-referrer",
                          loading: "lazy",
                          alt: "",
                          onError: (g) => At(s)
                        }, null, 40, sl)) : (n(), i("span", al, l(k(ct(s))), 1))
                      ]),
                      e("div", nl, [
                        e("span", il, l(s.uid === o(c).currentUser.uid ? o(c).currentUser.name : s.name), 1),
                        e("small", null, l(s.role === "owner" ? "群主" : "成员"), 1)
                      ])
                    ], 40, el))), 128))
                  ])
                ])
              ]),
              _: 1
            }),
            e("div", ol, [
              e("div", ll, [
                e("div", rl, [
                  Je.value ? (n(), i(W, { key: 0 }, [
                    e("strong", null, "💬 与【" + l(Je.value.name) + "】私聊", 1),
                    e("small", cl, [
                      e("span", {
                        class: L(["user-status-dot", { online: Je.value.online }])
                      }, null, 2),
                      Y(" " + l(Je.value.online ? "当前在线" : "离线") + " ", 1),
                      Je.value.activity?.title ? (n(), i("span", ul, " · " + l(Je.value.activity.title), 1)) : m("", !0)
                    ])
                  ], 64)) : (n(), i(W, { key: 1 }, [
                    e("strong", null, l(o(C).rooms.find((s) => s.id === o(C).channel)?.name || "私有聊天室"), 1),
                    e("small", dl, l(o(C).rooms.find((s) => s.id === o(C).channel)?.description), 1)
                  ], 64))
                ]),
                e("div", vl, [
                  e("div", pl, [
                    e("button", {
                      type: "button",
                      class: L(["btn-notif-bell", { "has-unread": Oe.value.length > 0 }]),
                      title: "好友申请通知",
                      onClick: t[7] || (t[7] = J((s) => Ge.value = !Ge.value, ["stop"]))
                    }, [
                      t[54] || (t[54] = e("span", { class: "notif-icon" }, "🔔", -1)),
                      Oe.value.length > 0 ? (n(), i("span", ml, l(Oe.value.length), 1)) : m("", !0)
                    ], 2),
                    Ge.value ? (n(), i("div", {
                      key: 0,
                      class: "notif-dropdown-popover",
                      onClick: t[9] || (t[9] = J(() => {
                      }, ["stop"]))
                    }, [
                      e("div", bl, [
                        e("strong", null, "好友申请 (" + l(Oe.value.length) + ")", 1),
                        e("button", {
                          type: "button",
                          class: "notif-close-btn",
                          onClick: t[8] || (t[8] = J((s) => Ge.value = !1, ["stop"]))
                        }, "✕")
                      ]),
                      e("div", hl, [
                        (n(!0), i(W, null, ce(Oe.value, (s) => (n(), i("div", {
                          key: s.id,
                          class: "notif-req-card"
                        }, [
                          e("div", fl, [
                            e("span", yl, l(s.from.avatar || "🦫"), 1),
                            e("div", gl, [
                              e("span", kl, l(s.from.name), 1),
                              e("small", _l, l(s.from.uid), 1)
                            ])
                          ]),
                          e("div", $l, [
                            e("button", {
                              type: "button",
                              class: "notif-btn-accept",
                              onClick: J((g) => ps(s), ["stop"])
                            }, "✓ 同意", 8, Cl),
                            e("button", {
                              type: "button",
                              class: "notif-btn-reject",
                              onClick: J((g) => ms(s), ["stop"])
                            }, "忽略", 8, wl)
                          ])
                        ]))), 128)),
                        Oe.value.length ? m("", !0) : (n(), i("p", xl, "暂无待处理的好友申请"))
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
              o(K).isActive && o(K).track ? (n(), i("div", Sl, [
                e("div", {
                  class: "party-bar-info",
                  onClick: t[11] || (t[11] = //@ts-ignore
                  (...s) => o(Ye) && o(Ye)(...s))
                }, [
                  e("span", {
                    class: L(["party-disc-icon", { spinning: o(K).isPlaying }])
                  }, "💿", 2),
                  e("div", Ml, [
                    e("strong", null, "一起听：" + l(o(K).track.title), 1),
                    e("small", null, "【" + l(o(K).hostName) + "】正在点播 · " + l(o(K).listenersCount) + " 人收听", 1)
                  ])
                ]),
                e("div", Il, [
                  o(K).isJoined ? (n(), i("button", {
                    key: 1,
                    type: "button",
                    class: "party-btn-leave",
                    onClick: t[13] || (t[13] = //@ts-ignore
                    (...s) => o(It) && o(It)(...s))
                  }, " 退出 ")) : (n(), i("button", {
                    key: 0,
                    type: "button",
                    class: "party-btn-join",
                    onClick: t[12] || (t[12] = //@ts-ignore
                    (...s) => o(Gt) && o(Gt)(...s))
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
                    onClick: D
                  }, " ✕ ")
                ])
              ])) : m("", !0),
              e("div", {
                ref_key: "messagesContainer",
                ref: pe,
                class: "chat-messages-area",
                "aria-busy": o(C).syncing
              }, [
                dt(Cn, {
                  items: j.value,
                  "scroll-host": pe.value,
                  active: o(c).visible,
                  "reset-key": y.value,
                  estimate: 112,
                  gap: 12
                }, {
                  default: tt(({ item: s }) => [
                    (n(), i("div", {
                      key: s.id,
                      class: L(["chat-msg-row", {
                        "is-me": s.sender.uid === o(c).currentUser.uid,
                        "is-sys": s.type === "system"
                      }])
                    }, [
                      s.type === "system" ? (n(), i("div", Pl, [
                        e("span", null, l(s.content), 1)
                      ])) : (n(), i(W, { key: 1 }, [
                        e("div", {
                          class: "chat-avatar clickable",
                          title: `${s.sender.name} (右键查看状态)`,
                          onContextmenu: (g) => w(g, s.sender)
                        }, [
                          ut(s.sender) ? (n(), i("img", {
                            key: 0,
                            src: ut(s.sender),
                            class: "chat-avatar-img",
                            referrerpolicy: "no-referrer",
                            loading: "lazy",
                            alt: "",
                            onError: (g) => At(s.sender)
                          }, null, 40, Tl)) : (n(), i("span", jl, l(k(ct(s.sender))), 1))
                        ], 40, El),
                        e("div", Dl, [
                          e("div", Al, [
                            e("span", Bl, l(s.sender.uid === o(c).currentUser.uid ? o(c).currentUser.name : s.sender.name), 1),
                            e("span", Rl, l(hs(s.timestamp)), 1),
                            s.sender.uid === o(c).currentUser.uid ? (n(), i("details", {
                              class: "chat-message-actions",
                              name: "chat-message-actions",
                              key: y.value + s.id
                            }, [
                              t[56] || (t[56] = e("summary", {
                                "aria-label": "消息详情与操作",
                                title: "消息详情与操作"
                              }, "⋯", -1)),
                              e("div", Fl, [
                                e("span", null, l(o(xt)(y.value, s.id)), 1),
                                e("button", {
                                  type: "button",
                                  class: "chat-tool-btn",
                                  title: "重新加入本房间待发队列，服务器按消息 ID 去重",
                                  onClick: (g) => o(me).retryMessage(s)
                                }, "重试发送", 8, Nl),
                                e("button", {
                                  type: "button",
                                  class: "chat-tool-btn",
                                  title: "停止自动补发，不撤回已发出的消息",
                                  onClick: (g) => o(Ts)(y.value, s.id)
                                }, "暂停补发", 8, Ll)
                              ])
                            ])) : m("", !0)
                          ]),
                          e("div", Hl, [
                            s.sender.uid === o(c).currentUser.uid && ["sending", "failed"].includes(o(St)(y.value, s.id)) ? (n(), i("span", {
                              key: 0,
                              class: L(["chat-delivery-indicator", o(St)(y.value, s.id) === "failed" ? "is-failed" : "is-sending"]),
                              role: "status",
                              tabindex: "0",
                              title: o(xt)(y.value, s.id),
                              "aria-label": o(xt)(y.value, s.id)
                            }, l(o(St)(y.value, s.id) === "failed" ? "!" : ""), 11, Wl)) : m("", !0),
                            e("div", {
                              class: L(["chat-msg-bubble", { "is-share-card": ["music", "bilibili", "bili_series", "github", "aihot", "youtube", "website", "server_invite", "music_party"].includes(s.type) }])
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
                                  src: o(te)(s.meta.musicCover),
                                  class: "music-cover-img",
                                  alt: ""
                                }, null, 8, zl)) : (n(), i("span", Gl, "🎵")),
                                e("div", Jl, [
                                  e("strong", Ol, l(s.meta?.musicTitle), 1),
                                  e("small", ql, l(s.meta?.musicArtist), 1)
                                ]),
                                e("button", {
                                  type: "button",
                                  class: L(["music-play-btn", { loading: ne.value === String(s.meta?.neteaseId || s.meta?.sirenCid || s.meta?.musicTitle || "") }]),
                                  title: "点击播放"
                                }, [
                                  ne.value === String(s.meta?.neteaseId || s.meta?.sirenCid || s.meta?.musicTitle || "") ? (n(), i(W, { key: 0 }, [
                                    Y("⏳")
                                  ], 64)) : (n(), i(W, { key: 1 }, [
                                    Y("▶")
                                  ], 64))
                                ], 2)
                              ], 8, Vl)) : s.type === "bilibili" ? (n(), i("div", {
                                key: 1,
                                class: "chat-bili-card clickable",
                                title: "左键小窗播放，右键打开操作菜单",
                                onClick: (g) => b(s.meta),
                                onContextmenu: (g) => R(g, s.meta)
                              }, [
                                t[59] || (t[59] = e("div", { class: "bili-card-header" }, [
                                  e("span", { class: "bili-badge-pink" }, "📺 哔哩哔哩")
                                ], -1)),
                                e("div", Xl, l(s.meta?.videoTitle), 1),
                                e("div", Kl, [
                                  s.meta?.upFace ? (n(), i("img", {
                                    key: 0,
                                    referrerpolicy: "no-referrer",
                                    src: o(te)(s.meta.upFace),
                                    class: "bili-up-avatar",
                                    alt: ""
                                  }, null, 8, Ql)) : m("", !0),
                                  e("span", Zl, l(s.meta?.upName), 1),
                                  t[57] || (t[57] = e("span", { class: "bili-up-tag" }, "UP主", -1)),
                                  s.meta?.upFans ? (n(), i("span", er, l(s.meta?.upFans) + "粉丝", 1)) : m("", !0)
                                ]),
                                e("div", tr, [
                                  e("img", {
                                    referrerpolicy: "no-referrer",
                                    src: o(te)(s.meta?.videoCover),
                                    class: "bili-cover-img",
                                    alt: "",
                                    loading: "lazy"
                                  }, null, 8, sr),
                                  s.meta?.isHot ? (n(), i("span", ar, "B站热门")) : m("", !0),
                                  t[58] || (t[58] = e("div", { class: "bili-play-overlay" }, [
                                    e("span", { class: "bili-play-icon" }, "▶")
                                  ], -1)),
                                  e("div", nr, [
                                    e("span", null, l(s.meta?.playCount ? `${s.meta.playCount}播放` : "近期热门"), 1),
                                    s.meta?.likeCount ? (n(), i("span", ir, l(s.meta.likeCount) + "点赞", 1)) : m("", !0),
                                    s.meta?.danmakuCount ? (n(), i("span", or, l(s.meta.danmakuCount) + "弹幕", 1)) : m("", !0)
                                  ])
                                ])
                              ], 40, Yl)) : s.type === "bili_series" ? (n(), i("div", lr, [
                                e("div", rr, [
                                  e("div", cr, [
                                    t[60] || (t[60] = e("span", { class: "series-icon" }, "📻", -1)),
                                    e("strong", ur, l(s.meta?.seriesName), 1)
                                  ])
                                ]),
                                e("div", dr, [
                                  (n(!0), i(W, null, ce(s.meta?.seriesItems || [], (g, Be) => (n(), i("div", {
                                    key: g.bvid || Be,
                                    class: "series-item-row",
                                    title: `点击立即播放：${g.title}`,
                                    onClick: (qe) => _e(g)
                                  }, [
                                    e("span", pr, l(Be + 1), 1),
                                    g.cover ? (n(), i("img", {
                                      key: 0,
                                      referrerpolicy: "no-referrer",
                                      src: o(te)(g.cover),
                                      class: "series-item-thumb",
                                      alt: "",
                                      loading: "lazy"
                                    }, null, 8, mr)) : m("", !0),
                                    e("div", br, l(g.title), 1)
                                  ], 8, vr))), 128))
                                ]),
                                e("div", hr, [
                                  e("span", null, "共 " + l(s.meta?.seriesCount || s.meta?.seriesItems?.length || 0) + " 首音乐 · 点击任意曲目播放", 1)
                                ])
                              ])) : s.type === "github" ? (n(), i("div", {
                                key: 3,
                                class: "chat-github-card clickable",
                                title: "点击在新标签页打开此仓库",
                                onClick: (g) => v(s.meta)
                              }, [
                                e("div", yr, [
                                  s.meta?.repoOwnerAvatar ? (n(), i("img", {
                                    key: 0,
                                    referrerpolicy: "no-referrer",
                                    src: o(te)(s.meta.repoOwnerAvatar),
                                    class: "gh-owner-avatar",
                                    alt: ""
                                  }, null, 8, gr)) : (n(), i("span", kr, "🐙")),
                                  e("span", _r, [
                                    e("span", $r, l(s.meta?.repoOwner), 1),
                                    t[61] || (t[61] = Y("/", -1)),
                                    e("strong", Cr, l(s.meta?.repoName), 1)
                                  ]),
                                  t[62] || (t[62] = e("span", { class: "gh-more-dot" }, "⋮", -1))
                                ]),
                                e("div", wr, [
                                  e("span", xr, "+ " + l(s.meta?.repoCategory || "未分类"), 1)
                                ]),
                                e("div", Sr, l(s.meta?.repoDesc), 1),
                                e("div", Mr, [
                                  e("span", Ir, "★ " + l(s.meta?.repoStars || 0), 1),
                                  e("span", Ur, l(s.meta?.repoLanguage || "Plain Text"), 1),
                                  e("span", Pr, "更新 " + l(s.meta?.repoUpdatedAt), 1)
                                ])
                              ], 8, fr)) : s.type === "aihot" ? (n(), i("div", {
                                key: 4,
                                class: "chat-aihot-card clickable",
                                title: "点击打开 AI 资讯",
                                onClick: (g) => ge(s.meta?.aihotUrl)
                              }, [
                                e("div", Tr, "🔥 " + l(s.meta?.aihotCategory || "AI 资讯"), 1),
                                e("strong", jr, l(s.meta?.aihotTitle), 1),
                                s.meta?.aihotSummary ? (n(), i("p", Dr, l(s.meta?.aihotSummary), 1)) : m("", !0),
                                e("div", Ar, [
                                  e("span", null, l(s.meta?.aihotSource), 1),
                                  e("span", null, l(s.meta?.aihotDate), 1)
                                ])
                              ], 8, Er)) : s.type === "youtube" ? (n(), i("div", {
                                key: 5,
                                class: "chat-youtube-card clickable",
                                title: "点击在 YouTube 观看",
                                onClick: (g) => ge(s.meta?.youtubeUrl)
                              }, [
                                e("div", Rr, [
                                  s.meta?.youtubeCover ? (n(), i("img", {
                                    key: 0,
                                    referrerpolicy: "no-referrer",
                                    src: o(te)(s.meta.youtubeCover),
                                    class: "yt-thumb",
                                    alt: "",
                                    loading: "lazy"
                                  }, null, 8, Fr)) : m("", !0),
                                  t[63] || (t[63] = e("span", { class: "yt-badge" }, "YouTube", -1))
                                ]),
                                e("strong", Nr, l(s.meta?.youtubeTitle), 1),
                                e("div", Lr, l(s.meta?.youtubeAuthor), 1)
                              ], 8, Br)) : s.type === "image" ? (n(), i("div", Hr, [
                                Me(s.meta?.imageUrl) ? (n(), i("img", {
                                  key: 0,
                                  referrerpolicy: "no-referrer",
                                  src: o(te)(s.meta?.imageUrl),
                                  class: "chat-sent-image",
                                  alt: "发送的图片",
                                  loading: "lazy",
                                  title: "点击查看大图",
                                  onClick: (g) => ot(s.meta?.imageUrl, s.sender?.name)
                                }, null, 8, Wr)) : m("", !0),
                                Me(s.meta?.imageUrl) ? (n(), i("button", {
                                  key: 1,
                                  type: "button",
                                  class: "chat-collect-sticker-btn",
                                  title: "收藏到我的表情包",
                                  onClick: J((g) => p(s.meta?.imageUrl), ["stop"])
                                }, " ⭐ 存为表情 ", 8, Vr)) : (n(), i("div", zr, "⚠️ 非法或不安全的图片协议"))
                              ])) : s.type === "website" ? (n(), i("div", {
                                key: 7,
                                class: "chat-website-card clickable",
                                title: `点击在新标签页打开：${s.meta?.linkUrl || ""}`,
                                onClick: (g) => Le(s.meta)
                              }, [
                                e("div", Jr, [
                                  o(te)(s.meta?.linkIcon) ? (n(), i("img", {
                                    key: 0,
                                    src: o(te)(s.meta?.linkIcon),
                                    class: "website-card-icon-img",
                                    alt: "",
                                    loading: "lazy",
                                    referrerpolicy: "no-referrer",
                                    onError: t[15] || (t[15] = (g) => g.target.style.display = "none")
                                  }, null, 40, Or)) : (n(), i("span", qr, "🌐"))
                                ]),
                                e("div", Yr, [
                                  e("strong", Xr, l(s.meta?.linkTitle || "常用网站"), 1),
                                  e("span", Kr, l(xe(s.meta?.linkUrl)), 1),
                                  s.meta?.linkNote ? (n(), i("small", Qr, l(s.meta?.linkNote), 1)) : m("", !0)
                                ]),
                                t[64] || (t[64] = e("span", {
                                  class: "website-card-arrow",
                                  "aria-hidden": "true"
                                }, "↗", -1))
                              ], 8, Gr)) : s.type === "server_invite" ? (n(), i("div", {
                                key: 8,
                                class: "chat-server-invite-card clickable",
                                title: `点击直接加入聊天室：${s.meta?.inviteServerName || s.meta?.inviteRoom || ""}`,
                                onClick: (g) => is(s.meta)
                              }, [
                                e("div", ec, [
                                  e("span", tc, l(s.meta?.inviteServerIcon || "🏠"), 1)
                                ]),
                                e("div", sc, [
                                  e("div", ac, [
                                    e("strong", nc, "邀请加入：" + l(s.meta?.inviteServerName || s.meta?.inviteRoom), 1),
                                    t[65] || (t[65] = e("span", {
                                      class: "server-invite-arrow",
                                      title: "立即加入"
                                    }, "↗", -1))
                                  ]),
                                  e("span", ic, l(s.meta?.inviteOrigin || "海狸私有服务器"), 1),
                                  t[66] || (t[66] = e("small", { class: "server-invite-hint" }, "点击直接加入此聊天室", -1))
                                ])
                              ], 8, Zr)) : s.type === "music_party" ? (n(), i("div", oc, [
                                e("div", lc, [
                                  t[67] || (t[67] = e("span", { class: "party-card-badge" }, "🎧 音乐派对 · 一起听", -1)),
                                  e("span", rc, l(s.meta?.partySource === "bilibili" ? "📺 B站音频" : s.meta?.partySource === "netease" ? "🎵 网易云" : "💿 塞壬唱片"), 1)
                                ]),
                                e("div", cc, [
                                  e("div", uc, [
                                    o(te)(s.meta?.partyCover) ? (n(), i("img", {
                                      key: 0,
                                      src: o(te)(s.meta?.partyCover),
                                      class: "party-cover-img",
                                      referrerpolicy: "no-referrer",
                                      alt: "",
                                      onError: t[16] || (t[16] = (g) => g.target.style.display = "none")
                                    }, null, 40, dc)) : (n(), i("span", vc, "💿")),
                                    t[68] || (t[68] = e("span", { class: "party-play-indicator" }, "▶", -1))
                                  ]),
                                  e("div", pc, [
                                    e("strong", mc, l(s.meta?.partyTitle), 1),
                                    e("span", bc, l(s.meta?.partyArtist), 1),
                                    e("small", hc, "由【" + l(s.sender.name) + "】发起的同频收听", 1)
                                  ])
                                ]),
                                e("div", fc, [
                                  !o(K).isJoined || o(K).track?.trackId !== s.meta?.partyTrackId ? (n(), i("button", {
                                    key: 0,
                                    type: "button",
                                    class: "party-join-btn",
                                    onClick: (g) => P(s)
                                  }, " 🎧 加入一起听 ", 8, yc)) : (n(), i("span", gc, "✓ 正在同步收听中"))
                                ])
                              ])) : (n(), i("div", kc, l(s.content), 1))
                            ], 2)
                          ])
                        ])
                      ], 64))
                    ], 2))
                  ]),
                  _: 1
                }, 8, ["items", "scroll-host", "active", "reset-key"])
              ], 8, Ul),
              e("div", {
                class: "chat-input-bar",
                onPaste: le
              }, [
                o(vt) ? (n(), i("p", _c, l(o(vt)), 1)) : m("", !0),
                U.value ? (n(), i("p", $c, l(U.value), 1)) : m("", !0),
                E.value ? (n(), i("p", Cc, "正在处理图片…")) : m("", !0),
                e("div", wc, [
                  dt(kn, { container: pe.value }, null, 8, ["container"]),
                  e("button", {
                    type: "button",
                    class: "chat-tool-btn",
                    title: o(C).imageMessagesSupported ? "发送图片（支持截图直接 Ctrl+V 粘贴）" : o(C).capabilities.reason,
                    disabled: E.value || T.value || !o(C).imageMessagesSupported,
                    onClick: H
                  }, " 🖼️ 图片 ", 8, xc),
                  e("input", {
                    ref_key: "imageInputRef",
                    ref: x,
                    type: "file",
                    accept: "image/png,image/jpeg,image/gif,image/webp,image/bmp",
                    style: { display: "none" },
                    onChange: se
                  }, null, 544),
                  e("button", {
                    type: "button",
                    class: "chat-tool-btn dj-tool-btn",
                    title: "打开海狸 DJ 音乐播控台（多音源一起听）",
                    onClick: t[17] || (t[17] = //@ts-ignore
                    (...s) => o(Ye) && o(Ye)(...s))
                  }, " 🎛️ 一起听 / DJ "),
                  e("div", Sc, [
                    e("button", {
                      type: "button",
                      class: L(["chat-tool-btn sticker-tool-btn", { "is-active": he.value }]),
                      title: o(C).imageMessagesSupported ? "打开表情包面板，点击即可直接发送" : o(C).capabilities.reason,
                      disabled: !o(C).imageMessagesSupported,
                      onClick: J(Ee, ["stop"])
                    }, " 😜 表情包 ", 10, Mc),
                    he.value ? (n(), ke(Bo, {
                      key: 0,
                      active: o(c).visible && o(C).imageMessagesSupported && !E.value && !T.value,
                      onClose: t[18] || (t[18] = (s) => he.value = !1),
                      onSelect: O
                    }, null, 8, ["active"])) : m("", !0)
                  ]),
                  o(X).playing && o(X).title ? (n(), i("button", {
                    key: 0,
                    type: "button",
                    class: "chat-tool-btn",
                    title: "分享正在播放的歌曲",
                    onClick: ye
                  }, " 🎵 分享正在听的歌 ")) : m("", !0)
                ]),
                $.value ? (n(), i("div", Ic, [
                  e("div", Uc, [
                    e("img", {
                      referrerpolicy: "no-referrer",
                      src: o(te)($.value),
                      class: "pending-preview-thumb",
                      alt: "待发预览",
                      title: "点击查看大图",
                      style: { cursor: "pointer" },
                      onClick: t[19] || (t[19] = (s) => ot($.value, "待发图片"))
                    }, null, 8, Pc),
                    e("button", {
                      type: "button",
                      class: "modal-close-pill pending-del-pill",
                      title: "撤销该图片",
                      onClick: ue
                    }, "✕")
                  ]),
                  t[69] || (t[69] = e("span", { class: "pending-tip" }, "已就绪 · 点击发送或按 Enter 发出", -1))
                ])) : m("", !0),
                e("div", Ec, [
                  Ue(e("textarea", {
                    "onUpdate:modelValue": t[20] || (t[20] = (s) => ve.value = s),
                    maxlength: o(js),
                    class: "chat-textarea",
                    placeholder: "聊点什么…（支持直接按 Ctrl+V 粘贴截图）",
                    "aria-label": "消息内容，Enter 发送，Shift+Enter 换行",
                    title: "Enter 发送 · Shift+Enter 换行 · 支持 Ctrl+V 粘贴图片",
                    rows: "2",
                    onKeydown: ee,
                    onPaste: le
                  }, null, 40, Tc), [
                    [Pe, ve.value]
                  ]),
                  e("button", {
                    type: "button",
                    class: "chat-send-btn",
                    disabled: E.value || T.value || !!$e.value || !ve.value.trim() && !$.value,
                    title: $e.value || "发送消息",
                    onClick: u
                  }, " 发送 ", 8, jc)
                ])
              ], 32)
            ])
          ])),
          (n(), ke(Ie, { to: "body" }, [
            f.value.visible && f.value.user ? (n(), i("div", {
              key: 0,
              class: "chat-user-card-modal",
              style: Se({ left: `${Math.min(f.value.x, 600)}px`, top: `${Math.min(f.value.y, 400)}px` }),
              onClick: t[22] || (t[22] = J(() => {
              }, ["stop"]))
            }, [
              e("div", Dc, [
                e("div", Ac, [
                  o(te)(f.value.user.avatar) ? (n(), i("img", {
                    key: 0,
                    src: o(te)(f.value.user.avatar),
                    class: "user-card-avatar-img",
                    referrerpolicy: "no-referrer",
                    alt: ""
                  }, null, 8, Bc)) : (n(), i("span", Rc, l(k(f.value.user.avatar)), 1))
                ]),
                e("div", Fc, [
                  e("strong", Nc, l(f.value.user.name), 1),
                  e("small", Lc, "UID: " + l(f.value.user.uid), 1)
                ]),
                e("button", {
                  type: "button",
                  class: "modal-close-pill",
                  title: "关闭名片",
                  onClick: _
                }, "✕")
              ]),
              e("div", Hc, [
                e("div", Wc, [
                  e("span", {
                    class: L(["user-status-dot", { online: N.value }])
                  }, null, 2),
                  e("span", Vc, l(N.value ? "当前在线" : "离线"), 1)
                ]),
                f.value.user?.uid !== o(c).currentUser.uid ? (n(), i("div", zc, [
                  oe.value === "mutual" ? (n(), i("button", {
                    key: 0,
                    type: "button",
                    class: "card-add-friend-btn active-dm",
                    onClick: yt
                  }, " 💬 发送私聊 ")) : oe.value === "pending" ? (n(), i("button", Gc, " ⏳ 已发申请 · 等待对方确认 ")) : (n(), i("button", {
                    key: 2,
                    type: "button",
                    class: "card-add-friend-btn",
                    onClick: We
                  }, " ➕ 添加为好友 ")),
                  e("button", {
                    type: "button",
                    class: "card-add-friend-btn invite-action-btn",
                    onClick: t[21] || (t[21] = (s) => jt(f.value.user))
                  }, " 📨 邀请加入服务器卡片 ")
                ])) : m("", !0),
                e("div", Jc, [
                  t[72] || (t[72] = e("div", { class: "activity-label" }, "当前动态 (实时同步)", -1)),
                  e("div", Oc, [
                    S.value?.title ? (n(), i(W, { key: 0 }, [
                      e("span", qc, l(S.value.type === "bilibili" ? "📺" : S.value.type === "github" ? "🐙" : S.value.type === "aihot" ? "🔥" : S.value.type === "youtube" ? "▶️" : "🎵"), 1),
                      e("div", Yc, [
                        e("strong", Xc, l(S.value.title), 1),
                        S.value.type === "bilibili" ? (n(), i("small", Kc, "正在 B站 观看视频")) : S.value.type === "github" ? (n(), i("small", Qc, "正在研读代码仓库")) : S.value.type === "aihot" ? (n(), i("small", Zc, "正在阅读 AI 热点")) : S.value.type === "youtube" ? (n(), i("small", eu, "正在观看 YouTube")) : S.value.type === "music" ? (n(), i("small", tu, "正在聆听音乐")) : (n(), i("small", su, "正在新标签页活动"))
                      ])
                    ], 64)) : (n(), i(W, { key: 1 }, [
                      t[70] || (t[70] = e("span", { class: "act-icon" }, "☕", -1)),
                      t[71] || (t[71] = e("span", { class: "act-idle" }, "正在新标签页摸鱼发呆中…", -1))
                    ], 64))
                  ])
                ])
              ])
            ], 4)) : m("", !0)
          ])),
          (n(), ke(Ie, { to: "body" }, [
            A.value.visible && A.value.meta ? (n(), i("div", {
              key: 0,
              class: "chat-context-menu",
              style: Se({ left: `${A.value.x}px`, top: `${A.value.y}px` }),
              onClick: t[28] || (t[28] = J(() => {
              }, ["stop"]))
            }, [
              e("div", {
                class: "chat-context-header",
                title: A.value.meta.videoTitle
              }, l(A.value.meta.videoTitle), 9, au),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[23] || (t[23] = (s) => B("play"))
              }, [...t[73] || (t[73] = [
                e("span", { class: "chat-context-icon" }, "▶", -1),
                Y(" 小窗播放视频 ", -1)
              ])]),
              t[78] || (t[78] = e("div", { class: "chat-context-divider" }, null, -1)),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[24] || (t[24] = (s) => B("open"))
              }, [...t[74] || (t[74] = [
                e("span", { class: "chat-context-icon" }, "↗", -1),
                Y(" 跳转到 B站 ", -1)
              ])]),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[25] || (t[25] = (s) => B("copy-link"))
              }, [...t[75] || (t[75] = [
                e("span", { class: "chat-context-icon" }, "📋", -1),
                Y(" 复制链接 ", -1)
              ])]),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[26] || (t[26] = (s) => B("cache"))
              }, [...t[76] || (t[76] = [
                e("span", { class: "chat-context-icon" }, "💾", -1),
                Y(" 缓存视频 ", -1)
              ])]),
              t[79] || (t[79] = e("div", { class: "chat-context-divider" }, null, -1)),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[27] || (t[27] = (s) => B("subtitle"))
              }, [...t[77] || (t[77] = [
                e("span", { class: "chat-context-icon" }, "▤", -1),
                Y(" 字幕转文本 ", -1)
              ])])
            ], 4)) : m("", !0)
          ])),
          (n(), ke(Ie, { to: "body" }, [
            de.value.visible && de.value.member ? (n(), i("div", {
              key: 0,
              class: "chat-context-menu",
              style: Se({ left: `${de.value.x}px`, top: `${de.value.y}px` }),
              onClick: t[33] || (t[33] = J(() => {
              }, ["stop"]))
            }, [
              e("div", nu, [
                e("strong", null, l(de.value.member.name), 1),
                e("small", iu, l(de.value.member.role === "owner" ? "群主" : "成员"), 1)
              ]),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[29] || (t[29] = (s) => ss(de.value.member))
              }, [...t[80] || (t[80] = [
                e("span", { class: "chat-context-icon" }, "👤", -1),
                Y(" 查看详细名片 ", -1)
              ])]),
              de.value.member.uid !== o(c).currentUser.uid ? (n(), i(W, { key: 0 }, [
                t[85] || (t[85] = e("div", { class: "chat-context-divider" }, null, -1)),
                os(de.value.member.uid) ? (n(), i("button", {
                  key: 0,
                  type: "button",
                  class: "chat-context-item",
                  onClick: t[30] || (t[30] = (s) => as(de.value.member))
                }, [...t[81] || (t[81] = [
                  e("span", { class: "chat-context-icon" }, "💬", -1),
                  Y(" 发送私聊 ", -1)
                ])])) : ls(de.value.member.uid) ? (n(), i("button", ou, [...t[82] || (t[82] = [
                  e("span", { class: "chat-context-icon" }, "⏳", -1),
                  Y(" 好友申请处理中 ", -1)
                ])])) : (n(), i("button", {
                  key: 2,
                  type: "button",
                  class: "chat-context-item",
                  onClick: t[31] || (t[31] = (s) => ns(de.value.member))
                }, [...t[83] || (t[83] = [
                  e("span", { class: "chat-context-icon" }, "➕", -1),
                  Y(" 添加为好友 ", -1)
                ])])),
                o(c).connected && o(C).role === "owner" ? (n(), i("button", {
                  key: 3,
                  type: "button",
                  class: "chat-context-item",
                  onClick: t[32] || (t[32] = (s) => jt(de.value.member))
                }, [...t[84] || (t[84] = [
                  e("span", { class: "chat-context-icon" }, "📨", -1),
                  Y(" 邀请加入服务器卡片 ", -1)
                ])])) : m("", !0)
              ], 64)) : m("", !0)
            ], 4)) : m("", !0)
          ])),
          o(K).djModalOpen ? (n(), ke(bo, { key: 3 })) : m("", !0),
          Ze.value ? (n(), i("div", {
            key: 4,
            class: "nonmodal-room-popover",
            onClick: t[36] || (t[36] = J(() => {
            }, ["stop"]))
          }, [
            e("div", lu, [
              e("div", ru, [
                t[86] || (t[86] = e("strong", null, "➕ 创建新大群 / 空间", -1)),
                e("button", {
                  type: "button",
                  class: "modal-close-pill",
                  title: "关闭",
                  onClick: t[34] || (t[34] = (s) => Ze.value = !1)
                }, "✕")
              ]),
              e("div", cu, [
                t[87] || (t[87] = e("label", null, "群聊空间名称", -1)),
                Ue(e("input", {
                  "onUpdate:modelValue": t[35] || (t[35] = (s) => Te.value = s),
                  class: "chat-input",
                  placeholder: "例如：计科3班摸鱼基地",
                  maxlength: "20"
                }, null, 512), [
                  [Pe, Te.value]
                ]),
                t[88] || (t[88] = e("label", null, "群聊图标 Emoji", -1)),
                e("div", uu, [
                  (n(), i(W, null, ce(["🏠", "🎮", "💻", "☕", "🎵", "📚", "🚀", "🦫"], (s) => e("button", {
                    key: s,
                    type: "button",
                    class: L(["icon-choice-btn", { sel: gt.value === s }]),
                    onClick: (g) => gt.value = s
                  }, l(s), 11, du)), 64))
                ]),
                e("div", vu, [
                  e("button", {
                    type: "button",
                    class: "chat-btn-primary",
                    disabled: !Te.value.trim(),
                    onClick: es
                  }, "立即创建群聊", 8, pu)
                ])
              ])
            ])
          ])) : m("", !0),
          lt.value ? (n(), i("div", {
            key: 5,
            class: "nonmodal-room-popover",
            onClick: t[39] || (t[39] = J(() => {
            }, ["stop"]))
          }, [
            e("div", mu, [
              e("div", bu, [
                e("strong", null, "➕ 在【" + l(Qe.value?.name) + "】添加房间", 1),
                e("button", {
                  type: "button",
                  class: "modal-close-pill",
                  title: "关闭",
                  onClick: t[37] || (t[37] = (s) => lt.value = !1)
                }, "✕")
              ]),
              e("div", hu, [
                t[89] || (t[89] = e("label", null, "房间名称", -1)),
                Ue(e("input", {
                  "onUpdate:modelValue": t[38] || (t[38] = (s) => Ve.value = s),
                  class: "chat-input",
                  placeholder: "例如：考研打卡、动漫吐槽",
                  maxlength: "15"
                }, null, 512), [
                  [Pe, Ve.value]
                ]),
                t[90] || (t[90] = e("label", null, "房间图标 Emoji", -1)),
                e("div", fu, [
                  (n(), i(W, null, ce(["💬", "🎵", "📺", "🐙", "⚡", "☕", "🎮", "💡"], (s) => e("button", {
                    key: s,
                    type: "button",
                    class: L(["icon-choice-btn", { sel: kt.value === s }]),
                    onClick: (g) => kt.value = s
                  }, l(s), 11, yu)), 64))
                ]),
                e("div", gu, [
                  e("button", {
                    type: "button",
                    class: "chat-btn-primary",
                    disabled: !Ve.value.trim(),
                    onClick: ts
                  }, "添加此房间", 8, ku)
                ])
              ])
            ])
          ])) : m("", !0),
          (n(), ke(Ie, { to: "body" }, [
            je.value.visible && je.value.group ? (n(), i("div", {
              key: 0,
              class: "chat-context-menu",
              style: Se({ left: `${je.value.x}px`, top: `${je.value.y}px` }),
              onClick: t[43] || (t[43] = J(() => {
              }, ["stop"]))
            }, [
              e("div", _u, l(je.value.group.name), 1),
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
                  lt.value = !0, Ce();
                })
              }, [...t[92] || (t[92] = [
                e("span", { class: "chat-context-icon" }, "➕", -1),
                Y(" 添加子房间频道 ", -1)
              ])]),
              o(c).groups && o(c).groups.length > 1 ? (n(), i(W, { key: 0 }, [
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
          (n(), ke(Ie, { to: "body" }, [
            De.value.visible && De.value.channel ? (n(), i("div", {
              key: 0,
              class: "chat-context-menu",
              style: Se({ left: `${De.value.x}px`, top: `${De.value.y}px` }),
              onClick: t[46] || (t[46] = J(() => {
              }, ["stop"]))
            }, [
              e("div", $u, " # " + l(De.value.channel.name), 1),
              e("button", {
                type: "button",
                class: "chat-context-item",
                onClick: t[44] || (t[44] = (s) => cs(De.value.channel))
              }, [...t[95] || (t[95] = [
                e("span", { class: "chat-context-icon" }, "✏️", -1),
                Y(" 重命名房间频道 ", -1)
              ])]),
              Qe.value?.channels && Qe.value.channels.length > 1 ? (n(), i(W, { key: 0 }, [
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
            onClick: t[49] || (t[49] = J(() => {
            }, ["stop"]))
          }, [
            e("div", Cu, [
              e("div", wu, [
                e("strong", null, l($t.value), 1),
                e("button", {
                  type: "button",
                  class: "modal-close-pill",
                  title: "关闭",
                  onClick: t[47] || (t[47] = (s) => et.value = !1)
                }, "✕")
              ]),
              e("div", xu, [
                t[98] || (t[98] = e("label", null, "新名称", -1)),
                Ue(e("input", {
                  "onUpdate:modelValue": t[48] || (t[48] = (s) => Ae.value = s),
                  class: "chat-input",
                  maxlength: "20",
                  autofocus: ""
                }, null, 512), [
                  [Pe, Ae.value]
                ]),
                t[99] || (t[99] = e("label", null, "图标 Emoji", -1)),
                e("div", Su, [
                  (n(), i(W, null, ce(["🏠", "💬", "🎵", "📺", "🐙", "🎮", "💻", "⚡", "☕", "📚", "🚀", "🦫"], (s) => e("button", {
                    key: s,
                    type: "button",
                    class: L(["icon-choice-btn", { sel: ze.value === s }]),
                    onClick: (g) => ze.value = s
                  }, l(s), 11, Mu)), 64))
                ]),
                e("div", Iu, [
                  e("button", {
                    type: "button",
                    class: "chat-btn-primary",
                    disabled: !Ae.value.trim(),
                    onClick: us
                  }, "保存修改", 8, Uu)
                ])
              ])
            ])
          ])) : m("", !0)
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), Vu = /* @__PURE__ */ Ke(Pu, [["__scopeId", "data-v-f27fd9a2"]]);
export {
  Vu as default
};
