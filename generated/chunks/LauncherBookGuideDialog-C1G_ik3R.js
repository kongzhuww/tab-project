import { d as B, B as L, x as T, o, j as A, p as D, H as R, e as l, i as e, t as s, f as u, F as v, g as _, A as x, R as N, T as P, b as w, s as C } from "./vendor-vue-9b0eS4bW.js";
import { _ as V } from "./_plugin-vue_export-helper-BxikU0LD.js";
const F = ["aria-label"], G = { class: "launcher-book-spread" }, I = { class: "launcher-book-page page-left" }, $ = { class: "page-header" }, j = { class: "page-meta" }, z = { class: "page-tag" }, H = {
  key: 0,
  class: "page-badge"
}, K = { class: "page-number" }, M = { class: "page-body" }, U = { class: "page-title" }, W = { class: "page-steps" }, q = { class: "step-icon" }, J = { class: "step-detail" }, O = { class: "step-title" }, Q = { class: "step-desc" }, X = {
  key: 0,
  class: "step-tip"
}, Y = { class: "launcher-book-page page-right" }, Z = { class: "page-header" }, ee = { class: "page-meta" }, te = { class: "page-tag" }, se = {
  key: 0,
  class: "page-badge"
}, ae = { class: "page-number" }, oe = { class: "page-body" }, ne = { class: "page-title" }, le = { class: "page-steps" }, ie = { class: "step-icon" }, ce = { class: "step-detail" }, de = { class: "step-title" }, re = { class: "step-desc" }, pe = {
  key: 0,
  class: "step-tip"
}, ue = { class: "launcher-book-footer" }, he = ["disabled"], ge = { class: "book-chapter-switcher" }, ve = ["onClick"], _e = { class: "chapter-name" }, be = { class: "chapter-pages" }, fe = ["disabled"], ke = /* @__PURE__ */ B({
  __name: "LauncherBookGuideDialog",
  props: {
    open: { type: Boolean },
    title: { default: "常用网站使用手册" },
    spreads: {},
    helpSelector: { default: ".launcher-page-help" }
  },
  emits: ["close"],
  setup(h, { emit: E }) {
    const r = h, b = w(null), g = E, n = w(0), S = [
      {
        chapterTitle: "基础篇 · 文件夹与整理",
        left: {
          tag: "第 1 篇 · 结构搭建",
          title: "🗂️ 文件夹怎么创建？",
          badge: "基础技巧",
          steps: [
            {
              icon: "🖱️",
              title: "在空白处点击鼠标右键",
              desc: "常用网站的主界面没有突兀的新建按钮。请在图标之间的任意空白区域点击鼠标右键。"
            },
            {
              icon: "📐",
              title: "选择大文件夹或中文件夹",
              desc: "「大文件夹」内置 2×2 / 3×3 宫格实时预览，适合高频分类；「中文件夹」紧凑小巧，适合归档次要站点。"
            },
            {
              icon: "✏️",
              title: "命名与大小调整",
              desc: "点击文件夹标题可就地重命名；右键文件夹可随时在「大 / 中 / 小」尺寸之间自由切换。",
              tip: "右键文件夹还可以一键解散文件夹，里面的网站会自动释放到当前面板。"
            }
          ]
        },
        right: {
          tag: "第 2 篇 · 整理归纳",
          title: "🎯 网站怎么放进文件夹？",
          badge: "核心交互",
          steps: [
            {
              icon: "🛡️",
              title: "外层拖拽为什么不能直接塞入？",
              desc: "这是刻意设计的防误触保护！在主桌面拖拽图标时，系统默认专注于「自由调换排序」，避免整理桌面时手滑误把网站塞丢。"
            },
            {
              icon: "📂",
              title: "规则：必须先点开文件夹！",
              desc: "点击打开目标文件夹，展开为独立清晰的整理视窗。这是保证交互精准、体验流畅的核心操作方式。"
            },
            {
              icon: "📥",
              title: "将网站拖入展开的视窗",
              desc: "在文件夹展开状态下，将网站平稳拖入视窗内部即可收入；反之按住网站拖到视窗外部即可移出到桌面。",
              tip: "体验设计：打开后再拖入，过程一清二楚，绝不发生误塞或找不到图标的困扰！"
            }
          ]
        }
      },
      {
        chapterTitle: "进阶篇 · 分区与快捷技巧",
        left: {
          tag: "第 3 篇 · 分区分流",
          title: "📑 分区管理与快速流转",
          badge: "空间延展",
          steps: [
            {
              icon: "➕",
              title: "创建新分区（Tab）",
              desc: "点击右上角顶栏的「+」按钮，输入分类名（如：工作、娱乐、学习、资源），即可新增独立分区。"
            },
            {
              icon: "🚀",
              title: "跨分区快速迁移",
              desc: "按住任意网站卡片，直接拖动并悬停到顶部分区标签（Tab）上，松手就能把网站瞬间搬家过去。"
            },
            {
              icon: "🎡",
              title: "Shift + 滚轮平滑切区",
              desc: "按住键盘 Shift 键并在常用网站区域滑动鼠标滚轮，即可在多个分区之间平滑翻页切屏。",
              tip: "右键分区标签还可以对当前分区进行重命名或安全删除。"
            }
          ]
        },
        right: {
          tag: "第 4 篇 · 效率进阶",
          title: "✨ 快捷技巧与联动彩蛋",
          badge: "效率倍增",
          steps: [
            {
              icon: "📝",
              title: "网站备注与悬浮气泡",
              desc: "右键网站选择「修改备注」，可以为网站填写账号提示或说明，鼠标悬停时会以气泡优雅展示。"
            },
            {
              icon: "🔖",
              title: "原生书签无缝查看",
              desc: "点击常用网站左上角的「书签」切换器，即可无缝翻看浏览器原生书签栏，无需打开沉重的侧边栏。"
            },
            {
              icon: "🎡",
              title: "快捷导航轮盘 Alt + E 直达",
              desc: "在任意时刻按下 Alt + E，即可就地唤起炫酷的环形快捷导航轮盘，鼠标一划瞬间切换模块或直达常用站点！",
              tip: "快捷技巧：轮盘跟随光标位置就地呼出，再次按下 Alt + E 即可随时收起。"
            }
          ]
        }
      }
    ], p = C(() => r.spreads?.length ? r.spreads : S), i = C(() => p.value[n.value] || p.value[0]);
    function f() {
      n.value > 0 && n.value--;
    }
    function k() {
      n.value < p.value.length - 1 && n.value++;
    }
    function m(d) {
      r.open && (d.key === "Escape" ? g("close") : d.key === "ArrowLeft" ? f() : d.key === "ArrowRight" && k());
    }
    function y(d) {
      if (!r.open) return;
      const t = d.target;
      if (t?.closest(r.helpSelector)) return;
      const a = b.value;
      a && !a.contains(t) && g("close");
    }
    return L(() => {
      window.addEventListener("keydown", m), window.addEventListener("pointerdown", y, !0);
    }), T(() => {
      window.removeEventListener("keydown", m), window.removeEventListener("pointerdown", y, !0);
    }), (d, t) => (o(), A(P, { to: "body" }, [
      D(N, { name: "book-fade" }, {
        default: R(() => [
          h.open ? (o(), l("aside", {
            key: 0,
            class: "launcher-book-window",
            role: "region",
            "aria-label": h.title
          }, [
            e("div", {
              ref_key: "bookCaseRef",
              ref: b,
              class: "launcher-book-case"
            }, [
              e("button", {
                type: "button",
                class: "launcher-book-close-ribbon",
                title: "合上说明书 (Esc)",
                "aria-label": "关闭指南",
                onClick: t[0] || (t[0] = (a) => g("close"))
              }, [...t[1] || (t[1] = [
                e("span", { class: "ribbon-tail" }, null, -1),
                e("span", { class: "ribbon-icon" }, "✕", -1)
              ])]),
              e("div", G, [
                e("div", I, [
                  e("header", $, [
                    e("div", j, [
                      e("span", z, s(i.value.left.tag), 1),
                      i.value.left.badge ? (o(), l("span", H, s(i.value.left.badge), 1)) : u("", !0)
                    ]),
                    e("span", K, "P. " + s(n.value * 2 + 1), 1)
                  ]),
                  e("div", M, [
                    e("h3", U, s(i.value.left.title), 1),
                    e("div", W, [
                      (o(!0), l(v, null, _(i.value.left.steps, (a, c) => (o(), l("div", {
                        key: c,
                        class: "step-card"
                      }, [
                        e("div", q, s(a.icon), 1),
                        e("div", J, [
                          e("div", O, s(a.title), 1),
                          e("div", Q, s(a.desc), 1),
                          a.tip ? (o(), l("div", X, [
                            t[2] || (t[2] = e("span", { class: "tip-dot" }, null, -1)),
                            e("span", null, s(a.tip), 1)
                          ])) : u("", !0)
                        ])
                      ]))), 128))
                    ])
                  ]),
                  t[3] || (t[3] = e("div", { class: "page-corner page-corner-left" }, null, -1))
                ]),
                t[6] || (t[6] = e("div", { class: "launcher-book-spine" }, [
                  e("div", { class: "spine-line" }, [
                    e("span", { class: "spine-stitch" }),
                    e("span", { class: "spine-stitch" }),
                    e("span", { class: "spine-stitch" }),
                    e("span", { class: "spine-stitch" })
                  ])
                ], -1)),
                e("div", Y, [
                  e("header", Z, [
                    e("div", ee, [
                      e("span", te, s(i.value.right.tag), 1),
                      i.value.right.badge ? (o(), l("span", se, s(i.value.right.badge), 1)) : u("", !0)
                    ]),
                    e("span", ae, "P. " + s(n.value * 2 + 2), 1)
                  ]),
                  e("div", oe, [
                    e("h3", ne, s(i.value.right.title), 1),
                    e("div", le, [
                      (o(!0), l(v, null, _(i.value.right.steps, (a, c) => (o(), l("div", {
                        key: c,
                        class: "step-card"
                      }, [
                        e("div", ie, s(a.icon), 1),
                        e("div", ce, [
                          e("div", de, s(a.title), 1),
                          e("div", re, s(a.desc), 1),
                          a.tip ? (o(), l("div", pe, [
                            t[4] || (t[4] = e("span", { class: "tip-dot" }, null, -1)),
                            e("span", null, s(a.tip), 1)
                          ])) : u("", !0)
                        ])
                      ]))), 128))
                    ])
                  ]),
                  t[5] || (t[5] = e("div", { class: "page-corner page-corner-right" }, null, -1))
                ])
              ]),
              e("footer", ue, [
                e("button", {
                  type: "button",
                  class: "book-flip-btn",
                  disabled: n.value === 0,
                  onClick: f
                }, [...t[7] || (t[7] = [
                  e("span", { class: "arrow" }, "◀", -1),
                  e("span", null, "上一章", -1)
                ])], 8, he),
                e("div", ge, [
                  (o(!0), l(v, null, _(p.value, (a, c) => (o(), l("button", {
                    key: c,
                    type: "button",
                    class: x(["chapter-tab", { active: c === n.value }]),
                    onClick: (me) => n.value = c
                  }, [
                    t[8] || (t[8] = e("span", { class: "chapter-dot" }, null, -1)),
                    e("span", _e, s(a.chapterTitle), 1),
                    e("span", be, "（" + s(c * 2 + 1) + "~" + s(c * 2 + 2) + "页）", 1)
                  ], 10, ve))), 128))
                ]),
                e("button", {
                  type: "button",
                  class: "book-flip-btn",
                  disabled: n.value === p.value.length - 1,
                  onClick: k
                }, [...t[9] || (t[9] = [
                  e("span", null, "下一章", -1),
                  e("span", { class: "arrow" }, "▶", -1)
                ])], 8, fe)
              ])
            ], 512)
          ], 8, F)) : u("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), Ce = /* @__PURE__ */ V(ke, [["__scopeId", "data-v-d7ca085f"]]);
export {
  Ce as default
};
