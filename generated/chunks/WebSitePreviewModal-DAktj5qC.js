import { d as ie, w as V, o as re, e as ue, f as o, l as de, u as c, g as a, h as e, t as i, k as j, q as m, j as f, F as ve, n as q, p as ce, v as pe, T as we, s as h, b as v } from "./vendor-vue-_upDT3S_.js";
import { u as me } from "./useWindowDraggable-DlE89hnn.js";
import { i as G, o as fe, _ as be } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { l as ye } from "./search.service-I5ZPPxGy.js";
import { w as ke } from "./web-task-store-XxOqv0xY.js";
import { i as _e, w as ge, j as he } from "./main-JHkPnzTg.js";
const Ce = ["aria-label"], Te = { class: "wp-title-group" }, Pe = ["src"], Ee = {
  key: 1,
  class: "wp-favicon-fallback"
}, Me = { class: "wp-title-meta" }, $e = ["title"], xe = { class: "wp-badge" }, Ne = {
  class: "wp-lock-icon",
  "aria-hidden": "true"
}, Se = ["title"], Ue = {
  class: "wp-segmented",
  role: "tablist",
  "aria-label": "预览模式"
}, Le = ["aria-selected"], De = ["aria-selected"], We = {
  key: 0,
  class: "wp-segmented wp-viewport-switch",
  role: "group",
  "aria-label": "视口宽度"
}, ze = { class: "wp-body" }, Fe = {
  key: 0,
  class: "wp-empty-state"
}, He = {
  key: 0,
  class: "wp-progress-bar",
  "aria-hidden": "true"
}, Be = {
  key: 1,
  class: "wp-notice-banner",
  role: "status"
}, Re = { class: "wp-notice-actions" }, Ie = ["src"], Ke = {
  key: 2,
  class: "wp-card-stage"
}, Oe = { class: "wp-site-card" }, Ve = { class: "wp-browser-chrome" }, je = { class: "chrome-url" }, qe = ["src"], Ge = {
  key: 1,
  class: "wp-card-gradient"
}, Ae = ["src"], Je = {
  key: 1,
  class: "wp-card-hero-globe"
}, Qe = { class: "wp-card-hero-title" }, Xe = { class: "wp-card-content" }, Ye = { class: "wp-card-meta-row" }, Ze = {
  key: 0,
  class: "wp-site-pill"
}, et = { class: "wp-site-host" }, tt = { class: "wp-card-desc" }, lt = { class: "wp-card-footer-btns" }, st = {
  key: 0,
  class: "wp-sidebar"
}, ot = { class: "wp-side-section wp-side-head" }, at = ["src"], nt = {
  key: 1,
  class: "wp-side-icon-fallback"
}, it = { class: "wp-side-head-text" }, rt = ["href"], ut = { class: "wp-side-section" }, dt = { class: "wp-side-label-row" }, vt = ["disabled"], ct = { class: "wp-browser-chrome compact" }, pt = { class: "chrome-url" }, wt = { class: "wp-mini-preview-box" }, mt = ["src"], ft = {
  key: 1,
  class: "wp-mini-placeholder"
}, bt = { class: "wp-side-section" }, yt = { class: "wp-side-label-row" }, kt = {
  key: 0,
  class: "wp-site-tag"
}, _t = { class: "wp-side-desc" }, gt = { class: "wp-side-section" }, ht = { class: "wp-side-label-row" }, Ct = {
  key: 0,
  class: "wp-note-editor"
}, Tt = ["disabled"], Pt = { class: "wp-note-actions" }, Et = ["disabled"], Mt = ["disabled"], $t = {
  key: 0,
  class: "wp-note-error"
}, xt = { class: "wp-side-footer" }, Nt = /* @__PURE__ */ ie({
  __name: "WebSitePreviewModal",
  setup(St) {
    const b = _e, C = ge, l = h(() => b.target), r = h(() => b.meta), x = h(() => b.metaLoading), u = h(() => he(l.value?.url || "")), p = h(() => {
      try {
        return u.value ? new URL(u.value).hostname : "";
      } catch {
        return "";
      }
    }), A = h(() => u.value.startsWith("https://")), d = v("live"), T = v("desktop"), N = v(!0), D = v(0), P = v(!1), S = v(!1), $ = v(!1), y = v(!1), k = v(!1), E = v(""), F = h(() => !!(l.value?.source === "launcher" && l.value?.id)), w = v(!1), U = v(""), _ = v(!1), g = v("");
    let M, W;
    const {
      panelRef: J,
      headerRef: Q,
      initialStyle: X,
      isDragging: Y,
      isResizing: Z,
      stopInteractions: H,
      onHeaderPointerDown: B,
      onResizePointerDown: L,
      bringToFront: ee
    } = me({
      windowId: "web-site-preview",
      managed: !1,
      storageKey: "webSitePreviewPositionV1",
      defaultWidth: typeof window < "u" ? Math.min(1120, Math.max(680, window.innerWidth - 120)) : 1040,
      defaultHeight: typeof window < "u" ? Math.min(720, Math.max(460, window.innerHeight - 100)) : 660,
      defaultLeft: typeof window < "u" ? Math.max(40, Math.floor((window.innerWidth - Math.min(1120, Math.max(680, window.innerWidth - 120))) / 2)) : 120,
      defaultTop: 48,
      minWidth: 520,
      minHeight: 380,
      active: () => b.isOpen
    });
    function R() {
      clearTimeout(M), P.value = !!u.value, S.value = !1, $.value = !1, u.value && (M = setTimeout(() => {
        P.value && (S.value = !0, P.value = !1);
      }, 6e3));
    }
    V(
      () => [b.isOpen, u.value],
      ([n, t]) => {
        if (!n) {
          clearTimeout(M), H(), w.value = !1, g.value = "";
          return;
        }
        y.value = !1, k.value = !1, w.value = !1, g.value = "", d.value = t ? "live" : "card", D.value++, R(), ee();
      },
      { immediate: !0 }
    ), V(() => r.value?.imageUrl, () => {
      k.value = !1;
    });
    function te() {
      D.value++, R(), C.refreshMeta();
    }
    function le() {
      clearTimeout(M), P.value = !1, S.value = !1, $.value = !1;
    }
    function se() {
      clearTimeout(M), P.value = !1, $.value = !0;
    }
    async function I() {
      const n = u.value || l.value?.url || "";
      if (n) {
        clearTimeout(W);
        try {
          await navigator.clipboard.writeText(n), E.value = "已复制链接 ✓";
        } catch {
          E.value = "复制失败";
        }
        W = setTimeout(() => {
          E.value = "";
        }, 1800);
      }
    }
    function z() {
      const n = u.value;
      n && window.open(n, "_blank", "noopener,noreferrer");
    }
    function oe() {
      l.value && ke.open({
        id: l.value.id,
        title: l.value.title,
        url: u.value || l.value.url,
        icon: l.value.icon,
        note: l.value.note,
        category: l.value.category,
        source: l.value.source
      });
    }
    function ae() {
      U.value = l.value?.note || "", g.value = "", w.value = !0;
    }
    async function K() {
      if (!(!l.value?.id || _.value)) {
        _.value = !0, g.value = "";
        try {
          const n = await ye.editLinkNote(l.value.id, l.value.note || "", U.value);
          C.updateNote(n), w.value = !1;
        } catch (n) {
          g.value = n?.message || "备注保存失败";
        } finally {
          _.value = !1;
        }
      }
    }
    function ne(n) {
      if (!G(n)) {
        if (n.key === "Escape") {
          n.preventDefault(), n.stopPropagation(), w.value = !1;
          return;
        }
        fe(n, () => {
          K();
        });
      }
    }
    function O(n) {
      !b.isOpen || n.key !== "Escape" || G(n) || w.value || (n.preventDefault(), n.stopPropagation(), C.close());
    }
    return re(() => {
      window.addEventListener("keydown", O);
    }), ue(() => {
      clearTimeout(M), clearTimeout(W), H(), window.removeEventListener("keydown", O);
    }), (n, t) => (o(), de(we, { to: "body" }, [
      c(b).isOpen && l.value ? (o(), a("aside", {
        key: 0,
        ref_key: "panelRef",
        ref: J,
        class: "web-preview-window",
        style: q(c(X)),
        role: "dialog",
        "aria-modal": "false",
        "aria-label": "网站预览 - " + (l.value.title || l.value.url)
      }, [
        e("header", {
          ref_key: "headerRef",
          ref: Q,
          class: "wp-header",
          onPointerdown: t[9] || (t[9] = //@ts-ignore
          (...s) => c(B) && c(B)(...s))
        }, [
          e("div", Te, [
            l.value.icon && !y.value ? (o(), a("img", {
              key: 0,
              src: l.value.icon,
              alt: "",
              class: "wp-favicon",
              onError: t[0] || (t[0] = (s) => y.value = !0)
            }, null, 40, Pe)) : (o(), a("span", Ee, "🌐")),
            e("div", Me, [
              e("strong", {
                class: "wp-title",
                title: l.value.title || l.value.url
              }, i(l.value.title || p.value || l.value.url), 9, $e),
              e("span", xe, i(l.value.category || (l.value.source === "bookmark" ? "书签" : "常用网站")), 1)
            ])
          ]),
          e("div", {
            class: "wp-address-bar no-drag",
            onPointerdown: t[1] || (t[1] = j(() => {
            }, ["stop"]))
          }, [
            e("span", Ne, i(A.value ? "🔒" : "🔗"), 1),
            e("button", {
              type: "button",
              class: "wp-url-copy-btn",
              title: E.value || `点击复制链接：${l.value.url}`,
              onClick: I
            }, i(E.value || l.value.url), 9, Se),
            e("button", {
              type: "button",
              class: "wp-icon-btn",
              title: "刷新预览",
              "aria-label": "刷新预览",
              onClick: te
            }, "↻")
          ], 32),
          e("div", {
            class: "wp-actions no-drag",
            onPointerdown: t[8] || (t[8] = j(() => {
            }, ["stop"]))
          }, [
            e("div", Ue, [
              e("button", {
                type: "button",
                role: "tab",
                "aria-selected": d.value === "live",
                class: m({ active: d.value === "live" }),
                onClick: t[2] || (t[2] = (s) => d.value = "live")
              }, "🌐 实时网页", 10, Le),
              e("button", {
                type: "button",
                role: "tab",
                "aria-selected": d.value === "card",
                class: m({ active: d.value === "card" }),
                onClick: t[3] || (t[3] = (s) => d.value = "card")
              }, "🪪 站点名片", 10, De)
            ]),
            d.value === "live" ? (o(), a("div", We, [
              e("button", {
                type: "button",
                class: m({ active: T.value === "desktop" }),
                title: "桌面视口",
                onClick: t[4] || (t[4] = (s) => T.value = "desktop")
              }, "🖥", 2),
              e("button", {
                type: "button",
                class: m({ active: T.value === "mobile" }),
                title: "手机视口 (390px)",
                onClick: t[5] || (t[5] = (s) => T.value = "mobile")
              }, "📱", 2)
            ])) : f("", !0),
            e("button", {
              type: "button",
              class: m(["wp-tool-btn", { active: N.value }]),
              title: "展开或收起右侧站点详情",
              onClick: t[6] || (t[6] = (s) => N.value = !N.value)
            }, "ⓘ 详情", 2),
            e("button", {
              type: "button",
              class: "wp-tool-btn primary",
              title: "在浏览器新标签页打开",
              onClick: z
            }, "↗ 打开"),
            e("button", {
              type: "button",
              class: "wp-close-btn",
              title: "关闭预览 (Esc)",
              "aria-label": "关闭预览",
              onClick: t[7] || (t[7] = //@ts-ignore
              (...s) => c(C).close && c(C).close(...s))
            }, "✕")
          ], 32)
        ], 544),
        e("div", ze, [
          e("div", {
            class: m(["wp-stage", { "is-mobile": d.value === "live" && T.value === "mobile" }])
          }, [
            u.value ? d.value === "live" ? (o(), a(ve, { key: 1 }, [
              P.value ? (o(), a("div", He, [...t[25] || (t[25] = [
                e("span", null, null, -1)
              ])])) : f("", !0),
              S.value || $.value ? (o(), a("div", Be, [
                e("span", null, i($.value ? "该网站未能完成内嵌加载，可切换「站点名片」或直接在新标签页打开。" : "页面加载较慢或被站点脚本限制内嵌？可随时切到「站点名片」或新标签页查看。"), 1),
                e("div", Re, [
                  e("button", {
                    type: "button",
                    onClick: t[10] || (t[10] = (s) => d.value = "card")
                  }, "查看站点名片"),
                  e("button", {
                    type: "button",
                    onClick: z
                  }, "新标签页打开 ↗")
                ])
              ])) : f("", !0),
              e("div", {
                class: m(["wp-frame-shell", { mobile: T.value === "mobile" }])
              }, [
                (o(), a("iframe", {
                  key: `${u.value}#${D.value}`,
                  src: u.value,
                  class: "wp-iframe",
                  style: q({ pointerEvents: c(Y) || c(Z) ? "none" : "auto" }),
                  sandbox: "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox",
                  referrerpolicy: "no-referrer",
                  onLoad: le,
                  onError: se
                }, null, 44, Ie))
              ], 2)
            ], 64)) : (o(), a("div", Ke, [
              e("article", Oe, [
                e("div", Ve, [
                  t[26] || (t[26] = e("span", { class: "dot red" }, null, -1)),
                  t[27] || (t[27] = e("span", { class: "dot yellow" }, null, -1)),
                  t[28] || (t[28] = e("span", { class: "dot green" }, null, -1)),
                  e("span", je, i(p.value || u.value), 1)
                ]),
                e("div", {
                  class: m(["wp-card-hero", { "has-image": !!(r.value?.imageUrl && !k.value) }])
                }, [
                  r.value?.imageUrl && !k.value ? (o(), a("img", {
                    key: 0,
                    src: r.value.imageUrl,
                    alt: "",
                    class: "wp-card-cover",
                    referrerpolicy: "no-referrer",
                    onError: t[11] || (t[11] = (s) => k.value = !0)
                  }, null, 40, qe)) : (o(), a("div", Ge, [
                    l.value.icon && !y.value ? (o(), a("img", {
                      key: 0,
                      src: l.value.icon,
                      alt: "",
                      class: "wp-card-hero-icon",
                      onError: t[12] || (t[12] = (s) => y.value = !0)
                    }, null, 40, Ae)) : (o(), a("span", Je, "🌐")),
                    e("div", Qe, i(r.value?.title || l.value.title || p.value), 1),
                    e("small", null, i(p.value), 1)
                  ]))
                ], 2),
                e("div", Xe, [
                  e("div", Ye, [
                    r.value?.siteName ? (o(), a("span", Ze, i(r.value.siteName), 1)) : f("", !0),
                    e("span", et, i(p.value), 1)
                  ]),
                  e("h3", null, i(r.value?.title || l.value.title || p.value), 1),
                  e("p", tt, i(x.value ? "正在读取网站摘要与封面信息…" : r.value?.description || r.value?.error || "该站点未提供公开摘要信息。"), 1),
                  e("div", lt, [
                    e("button", {
                      type: "button",
                      class: "wp-tool-btn",
                      onClick: t[13] || (t[13] = (s) => d.value = "live")
                    }, "🌐 尝试实时网页预览"),
                    e("button", {
                      type: "button",
                      class: "wp-tool-btn primary",
                      onClick: z
                    }, "↗ 在新标签页打开")
                  ])
                ])
              ])
            ])) : (o(), a("div", Fe, [...t[24] || (t[24] = [
              e("div", { class: "wp-empty-icon" }, "🔗", -1),
              e("h4", null, "无法预览此链接", -1),
              e("p", null, "仅支持预览 HTTP / HTTPS 协议的网站地址。", -1)
            ])]))
          ], 2),
          N.value ? (o(), a("aside", st, [
            e("div", ot, [
              l.value.icon && !y.value ? (o(), a("img", {
                key: 0,
                src: l.value.icon,
                alt: "",
                class: "wp-side-icon",
                onError: t[14] || (t[14] = (s) => y.value = !0)
              }, null, 40, at)) : (o(), a("span", nt, "🌐")),
              e("div", it, [
                e("h4", null, i(l.value.title || p.value || "未命名网站"), 1),
                e("a", {
                  href: u.value || l.value.url,
                  target: "_blank",
                  rel: "noreferrer",
                  class: "wp-side-link"
                }, i(l.value.url), 9, rt)
              ])
            ]),
            e("div", ut, [
              e("div", dt, [
                t[29] || (t[29] = e("span", null, "站点名片", -1)),
                e("button", {
                  type: "button",
                  class: "wp-mini-link",
                  disabled: x.value,
                  onClick: t[15] || (t[15] = (s) => c(C).refreshMeta())
                }, i(x.value ? "读取中…" : "↻ 更新"), 9, vt)
              ]),
              e("button", {
                type: "button",
                class: "wp-mini-browser",
                title: "切换站点名片视图",
                onClick: t[17] || (t[17] = (s) => d.value = d.value === "live" ? "card" : "live")
              }, [
                e("div", ct, [
                  t[30] || (t[30] = e("span", { class: "dot red" }, null, -1)),
                  t[31] || (t[31] = e("span", { class: "dot yellow" }, null, -1)),
                  t[32] || (t[32] = e("span", { class: "dot green" }, null, -1)),
                  e("span", pt, i(p.value), 1)
                ]),
                e("div", wt, [
                  r.value?.imageUrl && !k.value ? (o(), a("img", {
                    key: 0,
                    src: r.value.imageUrl,
                    alt: "",
                    referrerpolicy: "no-referrer",
                    onError: t[16] || (t[16] = (s) => k.value = !0)
                  }, null, 40, mt)) : (o(), a("div", ft, [
                    e("span", null, i(r.value?.title || l.value.title || p.value), 1)
                  ]))
                ])
              ])
            ]),
            e("div", bt, [
              e("div", yt, [
                t[33] || (t[33] = e("span", null, "网站简介", -1)),
                r.value?.siteName ? (o(), a("span", kt, i(r.value.siteName), 1)) : f("", !0)
              ]),
              e("p", _t, i(x.value ? "正在读取页面元信息…" : r.value?.description || r.value?.error || "暂无公开描述。"), 1)
            ]),
            e("div", gt, [
              e("div", ht, [
                t[34] || (t[34] = e("span", null, "网站备注", -1)),
                F.value && !w.value ? (o(), a("button", {
                  key: 0,
                  type: "button",
                  class: "wp-mini-link",
                  onClick: ae
                }, "✏️ 编辑")) : f("", !0)
              ]),
              w.value ? (o(), a("div", Ct, [
                ce(e("textarea", {
                  "onUpdate:modelValue": t[18] || (t[18] = (s) => U.value = s),
                  rows: "3",
                  maxlength: "200",
                  placeholder: "输入网站备注…",
                  disabled: _.value,
                  onKeydown: ne
                }, null, 40, Tt), [
                  [pe, U.value]
                ]),
                e("div", Pt, [
                  e("button", {
                    type: "button",
                    class: "wp-tool-btn",
                    disabled: _.value,
                    onClick: t[19] || (t[19] = (s) => w.value = !1)
                  }, "取消", 8, Et),
                  e("button", {
                    type: "button",
                    class: "wp-tool-btn primary",
                    disabled: _.value,
                    onClick: K
                  }, i(_.value ? "保存中…" : "保存"), 9, Mt)
                ]),
                g.value ? (o(), a("p", $t, i(g.value), 1)) : f("", !0)
              ])) : (o(), a("p", {
                key: 1,
                class: m(["wp-side-note", { empty: !l.value.note }])
              }, i(l.value.note || (F.value ? "暂无备注，点击右上角编辑添加" : "暂无备注")), 3))
            ]),
            e("div", xt, [
              e("button", {
                type: "button",
                class: "wp-tool-btn",
                onClick: I
              }, i(E.value || "📋 复制网址"), 1),
              e("button", {
                type: "button",
                class: "wp-tool-btn",
                onClick: oe
              }, "✓ 创建任务")
            ])
          ])) : f("", !0)
        ]),
        e("i", {
          class: "wp-resize-handle n",
          "aria-hidden": "true",
          onPointerdown: t[20] || (t[20] = (s) => c(L)(s, "n"))
        }, null, 32),
        e("i", {
          class: "wp-resize-handle e",
          "aria-hidden": "true",
          onPointerdown: t[21] || (t[21] = (s) => c(L)(s, "e"))
        }, null, 32),
        e("i", {
          class: "wp-resize-handle s",
          "aria-hidden": "true",
          onPointerdown: t[22] || (t[22] = (s) => c(L)(s, "s"))
        }, null, 32),
        e("i", {
          class: "wp-resize-handle w",
          "aria-hidden": "true",
          onPointerdown: t[23] || (t[23] = (s) => c(L)(s, "w"))
        }, null, 32)
      ], 12, Ce)) : f("", !0)
    ]));
  }
}), Ht = /* @__PURE__ */ be(Nt, [["__scopeId", "data-v-98488545"]]);
export {
  Ht as default
};
