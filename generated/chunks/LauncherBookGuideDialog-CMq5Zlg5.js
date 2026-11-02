import { d as y, D as w, z as C, o as i, e as S, E as T, w as B, f as l, g as s, t, h as p, F as u, i as _, C as E, T as L, k as A, b as D, x } from "./vendor-vue-wIH4jcna.js";
import { _ as N } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const V = {
  key: 0,
  class: "launcher-book-window",
  role: "region",
  "aria-label": "常用网站使用手册"
}, z = { class: "launcher-book-case" }, F = { class: "launcher-book-spread" }, G = { class: "launcher-book-page page-left" }, I = { class: "page-header" }, P = { class: "page-meta" }, $ = { class: "page-tag" }, K = {
  key: 0,
  class: "page-badge"
}, M = { class: "page-number" }, R = { class: "page-body" }, U = { class: "page-title" }, j = { class: "page-steps" }, q = { class: "step-icon" }, H = { class: "step-detail" }, J = { class: "step-title" }, O = { class: "step-desc" }, Q = {
  key: 0,
  class: "step-tip"
}, W = { class: "launcher-book-page page-right" }, X = { class: "page-header" }, Y = { class: "page-meta" }, Z = { class: "page-tag" }, ss = {
  key: 0,
  class: "page-badge"
}, es = { class: "page-number" }, ts = { class: "page-body" }, as = { class: "page-title" }, os = { class: "page-steps" }, is = { class: "step-icon" }, ns = { class: "step-detail" }, ls = { class: "step-title" }, cs = { class: "step-desc" }, ds = {
  key: 0,
  class: "step-tip"
}, ps = { class: "launcher-book-footer" }, rs = ["disabled"], us = { class: "book-chapter-switcher" }, _s = ["onClick"], hs = { class: "chapter-name" }, gs = { class: "chapter-pages" }, vs = ["disabled"], bs = /* @__PURE__ */ y({
  __name: "LauncherBookGuideDialog",
  props: {
    open: { type: Boolean }
  },
  emits: ["close"],
  setup(h, { emit: k }) {
    const m = h, g = k, o = D(0), d = [
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
              tip: "小建议：右键文件夹还可以一键解散文件夹，里面的网站会自动释放到当前面板。"
            }
          ]
        },
        right: {
          tag: "第 2 篇 · 整理归纳",
          title: "🎯 网站怎么放进文件夹？",
          badge: "高频解惑",
          steps: [
            {
              icon: "🤔",
              title: "为什么拖动时总是换位置？",
              desc: "这是为了保护你的图标排版！当拖动到边缘时系统默认是「交换排序」，需要精准放入核心区。"
            },
            {
              icon: "🎯",
              title: "方式一：精准拖入核心区",
              desc: "按住网站图标拖拽，将光标平稳移到目标文件夹的正中央核心区域，看到高亮吸附框时松开鼠标即可。",
              tip: "核心吸附：文件夹四周亮起微蓝光晕时松手，即可稳妥收入！"
            },
            {
              icon: "⚡",
              title: "方式二：右键菜单直达（零失误）",
              desc: "在想要整理的网站图标上点击鼠标右键，找到「移动到文件夹」，在列表里直接点选目标文件夹。"
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
              desc: "点击右上角的「+」加号按钮，输入分类名（如：工作、娱乐、学习、资源），即可新增独立分区。"
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
              icon: "⌨️",
              title: "极速搜索 Alt + S 直达",
              desc: "在任意时刻按下 Alt+S 或直接在空白处打字，即可瞬间唤出极速启动器，直达网址或搜索结果。",
              tip: "多端同步：在顶栏设置中开启配置同步，常用网站和文件夹可以在多台电脑间自动同步。"
            }
          ]
        }
      }
    ], n = x(() => d[o.value] || d[0]);
    function v() {
      o.value > 0 && o.value--;
    }
    function b() {
      o.value < d.length - 1 && o.value++;
    }
    function f(r) {
      m.open && (r.key === "Escape" ? g("close") : r.key === "ArrowLeft" ? v() : r.key === "ArrowRight" && b());
    }
    return w(() => {
      window.addEventListener("keydown", f);
    }), C(() => {
      window.removeEventListener("keydown", f);
    }), (r, e) => (i(), S(A, { to: "body" }, [
      T(L, { name: "book-fade" }, {
        default: B(() => [
          h.open ? (i(), l("aside", V, [
            s("div", z, [
              s("button", {
                type: "button",
                class: "launcher-book-close-ribbon",
                title: "合上说明书 (Esc)",
                "aria-label": "关闭指南",
                onClick: e[0] || (e[0] = (a) => g("close"))
              }, [...e[1] || (e[1] = [
                s("span", { class: "ribbon-tail" }, null, -1),
                s("span", { class: "ribbon-icon" }, "✕", -1)
              ])]),
              s("div", F, [
                s("div", G, [
                  s("header", I, [
                    s("div", P, [
                      s("span", $, t(n.value.left.tag), 1),
                      n.value.left.badge ? (i(), l("span", K, t(n.value.left.badge), 1)) : p("", !0)
                    ]),
                    s("span", M, "P. " + t(o.value * 2 + 1), 1)
                  ]),
                  s("div", R, [
                    s("h3", U, t(n.value.left.title), 1),
                    s("div", j, [
                      (i(!0), l(u, null, _(n.value.left.steps, (a, c) => (i(), l("div", {
                        key: c,
                        class: "step-card"
                      }, [
                        s("div", q, t(a.icon), 1),
                        s("div", H, [
                          s("div", J, t(a.title), 1),
                          s("div", O, t(a.desc), 1),
                          a.tip ? (i(), l("div", Q, [
                            e[2] || (e[2] = s("span", { class: "tip-dot" }, null, -1)),
                            s("span", null, t(a.tip), 1)
                          ])) : p("", !0)
                        ])
                      ]))), 128))
                    ])
                  ]),
                  e[3] || (e[3] = s("div", { class: "page-corner page-corner-left" }, null, -1))
                ]),
                e[6] || (e[6] = s("div", { class: "launcher-book-spine" }, [
                  s("div", { class: "spine-line" }, [
                    s("span", { class: "spine-stitch" }),
                    s("span", { class: "spine-stitch" }),
                    s("span", { class: "spine-stitch" }),
                    s("span", { class: "spine-stitch" })
                  ])
                ], -1)),
                s("div", W, [
                  s("header", X, [
                    s("div", Y, [
                      s("span", Z, t(n.value.right.tag), 1),
                      n.value.right.badge ? (i(), l("span", ss, t(n.value.right.badge), 1)) : p("", !0)
                    ]),
                    s("span", es, "P. " + t(o.value * 2 + 2), 1)
                  ]),
                  s("div", ts, [
                    s("h3", as, t(n.value.right.title), 1),
                    s("div", os, [
                      (i(!0), l(u, null, _(n.value.right.steps, (a, c) => (i(), l("div", {
                        key: c,
                        class: "step-card"
                      }, [
                        s("div", is, t(a.icon), 1),
                        s("div", ns, [
                          s("div", ls, t(a.title), 1),
                          s("div", cs, t(a.desc), 1),
                          a.tip ? (i(), l("div", ds, [
                            e[4] || (e[4] = s("span", { class: "tip-dot" }, null, -1)),
                            s("span", null, t(a.tip), 1)
                          ])) : p("", !0)
                        ])
                      ]))), 128))
                    ])
                  ]),
                  e[5] || (e[5] = s("div", { class: "page-corner page-corner-right" }, null, -1))
                ])
              ]),
              s("footer", ps, [
                s("button", {
                  type: "button",
                  class: "book-flip-btn",
                  disabled: o.value === 0,
                  onClick: v
                }, [...e[7] || (e[7] = [
                  s("span", { class: "arrow" }, "◀", -1),
                  s("span", null, "上一章", -1)
                ])], 8, rs),
                s("div", us, [
                  (i(), l(u, null, _(d, (a, c) => s("button", {
                    key: c,
                    type: "button",
                    class: E(["chapter-tab", { active: c === o.value }]),
                    onClick: (fs) => o.value = c
                  }, [
                    e[8] || (e[8] = s("span", { class: "chapter-dot" }, null, -1)),
                    s("span", hs, t(a.chapterTitle), 1),
                    s("span", gs, "（" + t(c * 2 + 1) + "~" + t(c * 2 + 2) + "页）", 1)
                  ], 10, _s)), 64))
                ]),
                s("button", {
                  type: "button",
                  class: "book-flip-btn",
                  disabled: o.value === d.length - 1,
                  onClick: b
                }, [...e[9] || (e[9] = [
                  s("span", null, "下一章", -1),
                  s("span", { class: "arrow" }, "▶", -1)
                ])], 8, vs)
              ])
            ])
          ])) : p("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), ys = /* @__PURE__ */ N(bs, [["__scopeId", "data-v-fec42920"]]);
export {
  ys as default
};
