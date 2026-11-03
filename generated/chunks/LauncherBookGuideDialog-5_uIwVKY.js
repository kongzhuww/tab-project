import { d as w, D as E, z as C, o as n, e as L, s as S, f as T, g as l, h as e, t, i as p, F as h, j as _, C as B, T as A, l as D, b as N, y as P } from "./vendor-vue-FFI3kJnP.js";
import { _ as V } from "./_plugin-vue_export-helper-CVWGtx1v.js";
const x = {
  key: 0,
  class: "launcher-book-window",
  role: "region",
  "aria-label": "常用网站使用手册"
}, z = { class: "launcher-book-case" }, F = { class: "launcher-book-spread" }, G = { class: "launcher-book-page page-left" }, I = { class: "page-header" }, $ = { class: "page-meta" }, j = { class: "page-tag" }, q = {
  key: 0,
  class: "page-badge"
}, K = { class: "page-number" }, M = { class: "page-body" }, R = { class: "page-title" }, U = { class: "page-steps" }, W = { class: "step-icon" }, H = { class: "step-detail" }, J = { class: "step-title" }, O = { class: "step-desc" }, Q = {
  key: 0,
  class: "step-tip"
}, X = { class: "launcher-book-page page-right" }, Y = { class: "page-header" }, Z = { class: "page-meta" }, ee = { class: "page-tag" }, se = {
  key: 0,
  class: "page-badge"
}, te = { class: "page-number" }, oe = { class: "page-body" }, ae = { class: "page-title" }, ne = { class: "page-steps" }, ie = { class: "step-icon" }, le = { class: "step-detail" }, ce = { class: "step-title" }, de = { class: "step-desc" }, re = {
  key: 0,
  class: "step-tip"
}, pe = { class: "launcher-book-footer" }, ue = ["disabled"], he = { class: "book-chapter-switcher" }, _e = ["onClick"], ge = { class: "chapter-name" }, ve = { class: "chapter-pages" }, be = ["disabled"], fe = /* @__PURE__ */ w({
  __name: "LauncherBookGuideDialog",
  props: {
    open: { type: Boolean }
  },
  emits: ["close"],
  setup(g, { emit: y }) {
    const v = g, u = y, a = N(0), r = [
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
    ], i = P(() => r[a.value] || r[0]);
    function b() {
      a.value > 0 && a.value--;
    }
    function f() {
      a.value < r.length - 1 && a.value++;
    }
    function k(d) {
      v.open && (d.key === "Escape" ? u("close") : d.key === "ArrowLeft" ? b() : d.key === "ArrowRight" && f());
    }
    function m(d) {
      if (!v.open) return;
      const s = d.target;
      if (s?.closest(".launcher-page-help")) return;
      const o = document.querySelector(".launcher-book-case");
      o && !o.contains(s) && u("close");
    }
    return E(() => {
      window.addEventListener("keydown", k), window.addEventListener("pointerdown", m, !0);
    }), C(() => {
      window.removeEventListener("keydown", k), window.removeEventListener("pointerdown", m, !0);
    }), (d, s) => (n(), L(D, { to: "body" }, [
      S(A, { name: "book-fade" }, {
        default: T(() => [
          g.open ? (n(), l("aside", x, [
            e("div", z, [
              e("button", {
                type: "button",
                class: "launcher-book-close-ribbon",
                title: "合上说明书 (Esc)",
                "aria-label": "关闭指南",
                onClick: s[0] || (s[0] = (o) => u("close"))
              }, [...s[1] || (s[1] = [
                e("span", { class: "ribbon-tail" }, null, -1),
                e("span", { class: "ribbon-icon" }, "✕", -1)
              ])]),
              e("div", F, [
                e("div", G, [
                  e("header", I, [
                    e("div", $, [
                      e("span", j, t(i.value.left.tag), 1),
                      i.value.left.badge ? (n(), l("span", q, t(i.value.left.badge), 1)) : p("", !0)
                    ]),
                    e("span", K, "P. " + t(a.value * 2 + 1), 1)
                  ]),
                  e("div", M, [
                    e("h3", R, t(i.value.left.title), 1),
                    e("div", U, [
                      (n(!0), l(h, null, _(i.value.left.steps, (o, c) => (n(), l("div", {
                        key: c,
                        class: "step-card"
                      }, [
                        e("div", W, t(o.icon), 1),
                        e("div", H, [
                          e("div", J, t(o.title), 1),
                          e("div", O, t(o.desc), 1),
                          o.tip ? (n(), l("div", Q, [
                            s[2] || (s[2] = e("span", { class: "tip-dot" }, null, -1)),
                            e("span", null, t(o.tip), 1)
                          ])) : p("", !0)
                        ])
                      ]))), 128))
                    ])
                  ]),
                  s[3] || (s[3] = e("div", { class: "page-corner page-corner-left" }, null, -1))
                ]),
                s[6] || (s[6] = e("div", { class: "launcher-book-spine" }, [
                  e("div", { class: "spine-line" }, [
                    e("span", { class: "spine-stitch" }),
                    e("span", { class: "spine-stitch" }),
                    e("span", { class: "spine-stitch" }),
                    e("span", { class: "spine-stitch" })
                  ])
                ], -1)),
                e("div", X, [
                  e("header", Y, [
                    e("div", Z, [
                      e("span", ee, t(i.value.right.tag), 1),
                      i.value.right.badge ? (n(), l("span", se, t(i.value.right.badge), 1)) : p("", !0)
                    ]),
                    e("span", te, "P. " + t(a.value * 2 + 2), 1)
                  ]),
                  e("div", oe, [
                    e("h3", ae, t(i.value.right.title), 1),
                    e("div", ne, [
                      (n(!0), l(h, null, _(i.value.right.steps, (o, c) => (n(), l("div", {
                        key: c,
                        class: "step-card"
                      }, [
                        e("div", ie, t(o.icon), 1),
                        e("div", le, [
                          e("div", ce, t(o.title), 1),
                          e("div", de, t(o.desc), 1),
                          o.tip ? (n(), l("div", re, [
                            s[4] || (s[4] = e("span", { class: "tip-dot" }, null, -1)),
                            e("span", null, t(o.tip), 1)
                          ])) : p("", !0)
                        ])
                      ]))), 128))
                    ])
                  ]),
                  s[5] || (s[5] = e("div", { class: "page-corner page-corner-right" }, null, -1))
                ])
              ]),
              e("footer", pe, [
                e("button", {
                  type: "button",
                  class: "book-flip-btn",
                  disabled: a.value === 0,
                  onClick: b
                }, [...s[7] || (s[7] = [
                  e("span", { class: "arrow" }, "◀", -1),
                  e("span", null, "上一章", -1)
                ])], 8, ue),
                e("div", he, [
                  (n(), l(h, null, _(r, (o, c) => e("button", {
                    key: c,
                    type: "button",
                    class: B(["chapter-tab", { active: c === a.value }]),
                    onClick: (ke) => a.value = c
                  }, [
                    s[8] || (s[8] = e("span", { class: "chapter-dot" }, null, -1)),
                    e("span", ge, t(o.chapterTitle), 1),
                    e("span", ve, "（" + t(c * 2 + 1) + "~" + t(c * 2 + 2) + "页）", 1)
                  ], 10, _e)), 64))
                ]),
                e("button", {
                  type: "button",
                  class: "book-flip-btn",
                  disabled: a.value === r.length - 1,
                  onClick: f
                }, [...s[9] || (s[9] = [
                  e("span", null, "下一章", -1),
                  e("span", { class: "arrow" }, "▶", -1)
                ])], 8, be)
              ])
            ])
          ])) : p("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), we = /* @__PURE__ */ V(fe, [["__scopeId", "data-v-9226209f"]]);
export {
  we as default
};
