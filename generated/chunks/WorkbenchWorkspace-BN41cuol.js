import { f as $, q as u, D as V, g as l, h as n, i as s, x as o, v as _, t as i, F as h, z as v, s as k, k as b, A as T, u as c, l as U, c as B, b as S } from "./vendor-vue-BUkfvXUI.js";
import { u as y } from "./search.service-CJV_B19X.js";
import { L as I } from "./LauncherTileContent-jgef1FWs.js";
import { workbenchState as a, toggleWorkbenchTask as N, removeWorkbenchTask as q, removeWorkbenchVideo as A, removeWorkbenchWeb as D, removeWorkbenchRepo as E, addWorkbenchTask as F, setWorkbenchFocus as f } from "./workbench.store-BPy9IbCC.js";
import { _ as K } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const L = { class: "workbench-header" }, R = { class: "header-left" }, z = { class: "header-center-tasks" }, G = { class: "tasks-bar" }, H = { class: "tasks-summary" }, M = { class: "task-count" }, P = { class: "tasks-scroll-list" }, O = ["onClick", "title"], j = { class: "task-check" }, J = { class: "task-text" }, Q = ["onClick"], X = { class: "task-quick-add" }, Y = { class: "workbench-body" }, Z = { class: "workbench-col col-left" }, ss = { class: "panel-card panel-videos" }, es = { class: "panel-header" }, ts = { class: "panel-title" }, os = { class: "panel-count" }, as = { class: "panel-content scrollable" }, ls = {
  key: 0,
  class: "empty-state"
}, ns = ["onClick"], is = { class: "video-cover-wrap" }, ds = ["src"], cs = {
  key: 1,
  class: "video-cover-placeholder"
}, rs = {
  key: 2,
  class: "video-duration-badge"
}, ps = ["onClick"], us = { class: "video-info" }, _s = ["title"], hs = { class: "video-meta" }, vs = { class: "video-author" }, ks = {
  key: 0,
  class: "video-dot"
}, bs = {
  key: 1,
  class: "video-bvid"
}, ms = { class: "panel-card panel-websites" }, fs = { class: "panel-header" }, gs = { class: "panel-title" }, ys = { class: "panel-count" }, ws = { class: "panel-content scrollable" }, Cs = {
  key: 0,
  class: "empty-state"
}, xs = {
  key: 1,
  class: "sites-grid"
}, Ws = ["href", "title"], $s = ["onClick", "aria-label"], Vs = { class: "workbench-stage" }, Ts = {
  key: 0,
  class: "stage-view stage-video"
}, Us = { class: "stage-header" }, Bs = { class: "stage-title" }, Ss = { class: "video-player-frame" }, Is = ["src"], Ns = {
  key: 1,
  class: "stage-view stage-repo"
}, qs = { class: "stage-header" }, As = { class: "stage-title" }, Ds = ["href"], Es = { class: "repo-details" }, Fs = { class: "repo-desc" }, Ks = { class: "repo-stats" }, Ls = {
  key: 0,
  class: "stat-pill"
}, Rs = {
  key: 1,
  class: "stat-pill"
}, zs = {
  key: 2,
  class: "stage-view stage-note"
}, Gs = {
  key: 3,
  class: "stage-empty"
}, Hs = { class: "workbench-col col-right" }, Ms = { class: "panel-card panel-repos" }, Ps = { class: "panel-header" }, Os = { class: "panel-title" }, js = { class: "panel-count" }, Js = { class: "panel-content scrollable" }, Qs = {
  key: 0,
  class: "empty-state"
}, Xs = ["onClick"], Ys = { class: "repo-item-top" }, Zs = { class: "repo-item-name" }, se = ["onClick"], ee = {
  key: 0,
  class: "repo-item-desc"
}, te = { class: "panel-card panel-scratchpad" }, oe = { class: "panel-content scratchpad-box" }, ae = /* @__PURE__ */ $({
  __name: "WorkbenchWorkspace",
  setup(le) {
    const m = B(() => y.activeId === "workbench"), p = S("");
    function w() {
      y.activeId = null;
    }
    function C() {
      p.value.trim() && (F(p.value), p.value = "");
    }
    function x(d) {
      f({
        type: "video",
        id: d.id,
        title: d.title,
        data: { bvid: d.bvid }
      });
    }
    function W(d) {
      f({
        type: "repo",
        id: d.id,
        title: `${d.owner}/${d.name}`,
        data: d
      });
    }
    function g() {
      f({
        type: "note",
        id: "scratchpad",
        title: "速记与灵感草稿"
      });
    }
    return (d, t) => u((l(), n("section", {
      id: "workbench-workspace",
      class: k(["card wide workbench-container", { "card-fullscreen": m.value, "is-active": m.value }])
    }, [
      s("header", L, [
        s("div", R, [
          t[4] || (t[4] = s("span", { class: "workbench-badge" }, "WORKSPACE", -1)),
          u(s("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (e) => o(a).title = e),
            class: "workbench-title-input",
            placeholder: "给工作台起个名字..."
          }, null, 512), [
            [_, o(a).title]
          ])
        ]),
        s("div", z, [
          s("div", G, [
            s("div", H, [
              t[5] || (t[5] = s("span", { class: "task-icon" }, "✓", -1)),
              s("span", M, i(o(a).tasks.filter((e) => !e.completed).length) + " 待完成 ", 1)
            ]),
            s("div", P, [
              (l(!0), n(h, null, v(o(a).tasks, (e) => (l(), n("div", {
                key: e.id,
                class: k(["task-chip", { "is-completed": e.completed }]),
                onClick: (r) => o(N)(e.id),
                title: e.content
              }, [
                s("span", j, i(e.completed ? "✔" : "○"), 1),
                s("span", J, i(e.content), 1),
                s("button", {
                  class: "task-del-btn",
                  onClick: b((r) => o(q)(e.id), ["stop"]),
                  title: "移除任务"
                }, "×", 8, Q)
              ], 10, O))), 128))
            ]),
            s("div", X, [
              u(s("input", {
                "onUpdate:modelValue": t[1] || (t[1] = (e) => p.value = e),
                placeholder: "+ 加任务",
                onKeyup: T(C, ["enter"])
              }, null, 544), [
                [_, p.value]
              ])
            ])
          ])
        ]),
        s("div", { class: "header-right" }, [
          s("button", {
            class: "action-btn",
            onClick: g,
            title: "聚焦编辑草稿"
          }, " 📝 笔记模式 "),
          s("button", {
            class: "close-btn",
            onClick: w,
            title: "退出工作台 (Esc)"
          }, " ✕ ")
        ])
      ]),
      s("div", Y, [
        s("aside", Z, [
          s("div", ss, [
            s("div", es, [
              s("div", ts, [
                t[6] || (t[6] = s("span", { class: "panel-icon" }, "📺", -1)),
                t[7] || (t[7] = s("span", null, "B站视频", -1)),
                s("span", os, i(o(a).videos.length), 1)
              ]),
              t[8] || (t[8] = s("span", { class: "panel-tip" }, "右键/移入添加", -1))
            ]),
            s("div", as, [
              o(a).videos.length === 0 ? (l(), n("div", ls, [...t[9] || (t[9] = [
                s("span", null, "暂无视频", -1),
                s("span", { class: "sub" }, "在B站模块卡片右键可移入", -1)
              ])])) : c("", !0),
              (l(!0), n(h, null, v(o(a).videos, (e) => (l(), n("div", {
                key: e.id,
                class: k(["video-card bili-style-card", { "is-playing": o(a).focus.id === e.id && o(a).focus.type === "video" }]),
                onClick: (r) => x(e)
              }, [
                s("div", is, [
                  e.pic ? (l(), n("img", {
                    key: 0,
                    src: e.pic,
                    class: "video-cover-img",
                    referrerpolicy: "no-referrer",
                    alt: "cover"
                  }, null, 8, ds)) : (l(), n("div", cs, "📺")),
                  e.duration ? (l(), n("span", rs, i(e.duration), 1)) : c("", !0),
                  s("button", {
                    class: "video-del-float-btn",
                    onClick: b((r) => o(A)(e.id), ["stop"]),
                    title: "从工作台移除"
                  }, "×", 8, ps)
                ]),
                s("div", us, [
                  s("div", {
                    class: "video-title",
                    title: e.title
                  }, i(e.title), 9, _s),
                  s("div", hs, [
                    s("span", vs, i(e.owner?.name || "UP主"), 1),
                    e.bvid ? (l(), n("span", ks, "·")) : c("", !0),
                    e.bvid ? (l(), n("span", bs, i(e.bvid), 1)) : c("", !0)
                  ])
                ])
              ], 10, ns))), 128))
            ])
          ]),
          s("div", ms, [
            s("div", fs, [
              s("div", gs, [
                t[10] || (t[10] = s("span", { class: "panel-icon" }, "🔗", -1)),
                t[11] || (t[11] = s("span", null, "常用网站 / 参考", -1)),
                s("span", ys, i(o(a).websites.length), 1)
              ])
            ]),
            s("div", ws, [
              o(a).websites.length === 0 ? (l(), n("div", Cs, [...t[12] || (t[12] = [
                s("span", null, "暂无网站", -1),
                s("span", { class: "sub" }, "从常用网站或 ai hot 文章右键添加", -1)
              ])])) : (l(), n("div", xs, [
                (l(!0), n(h, null, v(o(a).websites, (e) => (l(), n("div", {
                  key: e.id,
                  class: "site-item"
                }, [
                  s("a", {
                    href: e.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    class: "launcher-link site-link",
                    title: e.title
                  }, [
                    U(I, { link: e }, null, 8, ["link"])
                  ], 8, Ws),
                  s("button", {
                    type: "button",
                    class: "item-remove-btn site-remove-btn",
                    onClick: b((r) => o(D)(e.id), ["stop"]),
                    "aria-label": `从工作台移除${e.title}`,
                    title: "从工作台移除"
                  }, "×", 8, $s)
                ]))), 128))
              ]))
            ])
          ])
        ]),
        s("main", Vs, [
          o(a).focus.type === "video" && o(a).focus.data?.bvid ? (l(), n("div", Ts, [
            s("div", Us, [
              t[13] || (t[13] = s("span", { class: "stage-badge" }, "正在播放", -1)),
              s("span", Bs, i(o(a).focus.title), 1)
            ]),
            s("div", Ss, [
              s("iframe", {
                src: `https://player.bilibili.com/player.html?bvid=${o(a).focus.data.bvid}&page=1&high_quality=1&as_wide=1&danmaku=0`,
                scrolling: "no",
                border: "0",
                frameborder: "no",
                framespacing: "0",
                allowfullscreen: "true"
              }, null, 8, Is)
            ])
          ])) : o(a).focus.type === "repo" && o(a).focus.data ? (l(), n("div", Ns, [
            s("div", qs, [
              t[14] || (t[14] = s("span", { class: "stage-badge" }, "代码仓库", -1)),
              s("span", As, i(o(a).focus.title), 1),
              s("a", {
                href: o(a).focus.data.htmlUrl,
                target: "_blank",
                rel: "noopener",
                class: "stage-ext-link"
              }, "在 GitHub 打开 ↗", 8, Ds)
            ]),
            s("div", Es, [
              s("p", Fs, i(o(a).focus.data.description || "暂无仓库简介"), 1),
              s("div", Ks, [
                o(a).focus.data.language ? (l(), n("span", Ls, " ● " + i(o(a).focus.data.language), 1)) : c("", !0),
                o(a).focus.data.stars ? (l(), n("span", Rs, " ⭐ " + i(o(a).focus.data.stars), 1)) : c("", !0)
              ]),
              t[15] || (t[15] = s("div", { class: "repo-readme-placeholder" }, [
                s("p", null, "💡 点击右上角直达仓库源码，或在此关联相关 Issues 与 Commit。")
              ], -1))
            ])
          ])) : o(a).focus.type === "note" ? (l(), n("div", zs, [
            t[16] || (t[16] = s("div", { class: "stage-header" }, [
              s("span", { class: "stage-badge" }, "沉浸记录"),
              s("span", { class: "stage-title" }, "速记草稿本")
            ], -1)),
            u(s("textarea", {
              "onUpdate:modelValue": t[2] || (t[2] = (e) => o(a).scratchpad = e),
              class: "stage-textarea",
              placeholder: "在这里深度构思、沉浸书写笔记与想法..."
            }, null, 512), [
              [_, o(a).scratchpad]
            ])
          ])) : (l(), n("div", Gs, [...t[17] || (t[17] = [
            s("div", { class: "empty-mascot" }, "🦫", -1),
            s("h2", null, "就绪工作台 · 沉浸焦点", -1),
            s("p", null, "从左侧点击视频播放，点击右侧仓库查看详情，或点击顶部聚焦笔记。", -1)
          ])]))
        ]),
        s("aside", Hs, [
          s("div", Ms, [
            s("div", Ps, [
              s("div", Os, [
                t[18] || (t[18] = s("span", { class: "panel-icon" }, "🐙", -1)),
                t[19] || (t[19] = s("span", null, "项目仓库", -1)),
                s("span", js, i(o(a).repos.length), 1)
              ])
            ]),
            s("div", Js, [
              o(a).repos.length === 0 ? (l(), n("div", Qs, [...t[20] || (t[20] = [
                s("span", null, "暂无仓库", -1),
                s("span", { class: "sub" }, "在 GitHub 模块右键移入", -1)
              ])])) : c("", !0),
              (l(!0), n(h, null, v(o(a).repos, (e) => (l(), n("div", {
                key: e.id,
                class: k(["repo-item", { "is-selected": o(a).focus.id === e.id && o(a).focus.type === "repo" }]),
                onClick: (r) => W(e)
              }, [
                s("div", Ys, [
                  s("span", Zs, i(e.owner) + "/" + i(e.name), 1),
                  s("button", {
                    class: "item-remove-btn",
                    onClick: b((r) => o(E)(e.id), ["stop"]),
                    title: "移除仓库"
                  }, "×", 8, se)
                ]),
                e.description ? (l(), n("p", ee, i(e.description), 1)) : c("", !0)
              ], 10, Xs))), 128))
            ])
          ]),
          s("div", te, [
            s("div", { class: "panel-header" }, [
              t[21] || (t[21] = s("div", { class: "panel-title" }, [
                s("span", { class: "panel-icon" }, "📝"),
                s("span", null, "速记草稿")
              ], -1)),
              s("button", {
                class: "small-btn",
                onClick: g,
                title: "全屏沉浸编辑"
              }, " 展开 ↗ ")
            ]),
            s("div", oe, [
              u(s("textarea", {
                "onUpdate:modelValue": t[3] || (t[3] = (e) => o(a).scratchpad = e),
                class: "scratchpad-textarea",
                placeholder: "随手写草稿、灵感备忘..."
              }, null, 512), [
                [_, o(a).scratchpad]
              ])
            ])
          ])
        ])
      ])
    ], 2)), [
      [V, m.value]
    ]);
  }
}), pe = /* @__PURE__ */ K(ae, [["__scopeId", "data-v-6fed9abb"]]);
export {
  pe as default
};
