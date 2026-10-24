import { f as B, w as C, q as v, D as I, g as l, h as n, i as s, x as o, v as h, t as i, F as k, z as b, s as m, k as f, A as S, u as c, l as q, c as F, b as x } from "./vendor-vue-BUkfvXUI.js";
import { u as W } from "./search.service-CipPV7Bz.js";
import { L as N } from "./LauncherTileContent-jEQmIfi6.js";
import { workbenchState as a, toggleWorkbenchTask as R, removeWorkbenchTask as A, removeWorkbenchVideo as D, removeWorkbenchWeb as E, removeWorkbenchRepo as K, addWorkbenchTask as L, setWorkbenchFocus as y } from "./workbench.store---R-eEes.js";
import { _ as z } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const G = { class: "workbench-header" }, H = { class: "header-left" }, M = { class: "header-center-tasks" }, P = { class: "tasks-bar" }, O = { class: "tasks-summary" }, j = { class: "task-count" }, J = { class: "tasks-scroll-list" }, Q = ["onClick", "title"], X = { class: "task-check" }, Y = { class: "task-text" }, Z = ["onClick"], ss = { class: "task-quick-add" }, es = { class: "workbench-body" }, ts = { class: "workbench-col col-left" }, os = { class: "panel-card panel-videos" }, as = { class: "panel-header" }, ls = { class: "panel-title" }, ns = { class: "panel-count" }, is = { class: "panel-content scrollable" }, ds = {
  key: 0,
  class: "empty-state"
}, cs = ["onClick"], rs = { class: "video-cover-wrap" }, ps = ["src"], us = {
  key: 1,
  class: "video-cover-placeholder"
}, _s = {
  key: 2,
  class: "video-duration-badge"
}, vs = ["onClick"], hs = { class: "video-info" }, ks = ["title"], bs = { class: "video-meta" }, ms = { class: "video-author" }, fs = {
  key: 0,
  class: "video-dot"
}, ys = {
  key: 1,
  class: "video-bvid"
}, gs = { class: "panel-card panel-websites" }, ws = { class: "panel-header" }, Cs = { class: "panel-title" }, xs = { class: "panel-count" }, Ws = { class: "panel-content scrollable" }, Vs = {
  key: 0,
  class: "empty-state"
}, $s = {
  key: 1,
  class: "sites-grid"
}, Ts = ["href", "title"], Us = ["onClick", "aria-label"], Bs = { class: "workbench-stage" }, Is = {
  key: 0,
  class: "stage-view stage-video"
}, Ss = { class: "stage-header" }, qs = { class: "stage-badge" }, Fs = { class: "stage-title" }, Ns = { class: "video-player-frame" }, Rs = ["src"], As = {
  key: 1,
  class: "video-play-placeholder"
}, Ds = {
  key: 1,
  class: "stage-view stage-repo"
}, Es = { class: "stage-header" }, Ks = { class: "stage-title" }, Ls = ["href"], zs = { class: "repo-details" }, Gs = { class: "repo-desc" }, Hs = { class: "repo-stats" }, Ms = {
  key: 0,
  class: "stat-pill"
}, Ps = {
  key: 1,
  class: "stat-pill"
}, Os = {
  key: 2,
  class: "stage-view stage-note"
}, js = {
  key: 3,
  class: "stage-empty"
}, Js = { class: "workbench-col col-right" }, Qs = { class: "panel-card panel-repos" }, Xs = { class: "panel-header" }, Ys = { class: "panel-title" }, Zs = { class: "panel-count" }, se = { class: "panel-content scrollable" }, ee = {
  key: 0,
  class: "empty-state"
}, te = ["onClick"], oe = { class: "repo-item-top" }, ae = { class: "repo-item-name" }, le = ["onClick"], ne = {
  key: 0,
  class: "repo-item-desc"
}, ie = { class: "panel-card panel-scratchpad" }, de = { class: "panel-content scratchpad-box" }, ce = /* @__PURE__ */ B({
  __name: "WorkbenchWorkspace",
  setup(re) {
    const p = F(() => W.activeId === "workbench"), _ = x(""), r = x("");
    C(p, (d) => {
      d || (r.value = "");
    }, { flush: "sync" }), C(() => [a.focus.type, a.focus.id, a.focus.data?.bvid], () => {
      r.value = "";
    }, { flush: "sync" });
    function g() {
      const d = a.focus.data?.bvid;
      p.value && typeof d == "string" && (r.value = d);
    }
    function V() {
      W.activeId = null;
    }
    function $() {
      _.value.trim() && (L(_.value), _.value = "");
    }
    function T(d) {
      y({
        type: "video",
        id: d.id,
        title: d.title,
        data: { bvid: d.bvid }
      }), g();
    }
    function U(d) {
      y({
        type: "repo",
        id: d.id,
        title: `${d.owner}/${d.name}`,
        data: d
      });
    }
    function w() {
      y({
        type: "note",
        id: "scratchpad",
        title: "速记与灵感草稿"
      });
    }
    return (d, t) => v((l(), n("section", {
      id: "workbench-workspace",
      class: m(["card wide workbench-container", { "card-fullscreen": p.value, "is-active": p.value }])
    }, [
      s("header", G, [
        s("div", H, [
          t[4] || (t[4] = s("span", { class: "workbench-badge" }, "WORKSPACE", -1)),
          v(s("input", {
            "onUpdate:modelValue": t[0] || (t[0] = (e) => o(a).title = e),
            class: "workbench-title-input",
            placeholder: "给工作台起个名字..."
          }, null, 512), [
            [h, o(a).title]
          ])
        ]),
        s("div", M, [
          s("div", P, [
            s("div", O, [
              t[5] || (t[5] = s("span", { class: "task-icon" }, "✓", -1)),
              s("span", j, i(o(a).tasks.filter((e) => !e.completed).length) + " 待完成 ", 1)
            ]),
            s("div", J, [
              (l(!0), n(k, null, b(o(a).tasks, (e) => (l(), n("div", {
                key: e.id,
                class: m(["task-chip", { "is-completed": e.completed }]),
                onClick: (u) => o(R)(e.id),
                title: e.content
              }, [
                s("span", X, i(e.completed ? "✔" : "○"), 1),
                s("span", Y, i(e.content), 1),
                s("button", {
                  class: "task-del-btn",
                  onClick: f((u) => o(A)(e.id), ["stop"]),
                  title: "移除任务"
                }, "×", 8, Z)
              ], 10, Q))), 128))
            ]),
            s("div", ss, [
              v(s("input", {
                "onUpdate:modelValue": t[1] || (t[1] = (e) => _.value = e),
                placeholder: "+ 加任务",
                onKeyup: S($, ["enter"])
              }, null, 544), [
                [h, _.value]
              ])
            ])
          ])
        ]),
        s("div", { class: "header-right" }, [
          s("button", {
            class: "action-btn",
            onClick: w,
            title: "聚焦编辑草稿"
          }, " 📝 笔记模式 "),
          s("button", {
            class: "close-btn",
            onClick: V,
            title: "退出工作台 (Esc)"
          }, " ✕ ")
        ])
      ]),
      s("div", es, [
        s("aside", ts, [
          s("div", os, [
            s("div", as, [
              s("div", ls, [
                t[6] || (t[6] = s("span", { class: "panel-icon" }, "📺", -1)),
                t[7] || (t[7] = s("span", null, "B站视频", -1)),
                s("span", ns, i(o(a).videos.length), 1)
              ]),
              t[8] || (t[8] = s("span", { class: "panel-tip" }, "右键/移入添加", -1))
            ]),
            s("div", is, [
              o(a).videos.length === 0 ? (l(), n("div", ds, [...t[9] || (t[9] = [
                s("span", null, "暂无视频", -1),
                s("span", { class: "sub" }, "在B站模块卡片右键可移入", -1)
              ])])) : c("", !0),
              (l(!0), n(k, null, b(o(a).videos, (e) => (l(), n("div", {
                key: e.id,
                class: m(["video-card bili-style-card", { "is-playing": o(a).focus.id === e.id && o(a).focus.type === "video" }]),
                onClick: (u) => T(e)
              }, [
                s("div", rs, [
                  e.pic ? (l(), n("img", {
                    key: 0,
                    src: e.pic,
                    class: "video-cover-img",
                    referrerpolicy: "no-referrer",
                    alt: "cover"
                  }, null, 8, ps)) : (l(), n("div", us, "📺")),
                  e.duration ? (l(), n("span", _s, i(e.duration), 1)) : c("", !0),
                  s("button", {
                    class: "video-del-float-btn",
                    onClick: f((u) => o(D)(e.id), ["stop"]),
                    title: "从工作台移除"
                  }, "×", 8, vs)
                ]),
                s("div", hs, [
                  s("div", {
                    class: "video-title",
                    title: e.title
                  }, i(e.title), 9, ks),
                  s("div", bs, [
                    s("span", ms, i(e.owner?.name || "UP主"), 1),
                    e.bvid ? (l(), n("span", fs, "·")) : c("", !0),
                    e.bvid ? (l(), n("span", ys, i(e.bvid), 1)) : c("", !0)
                  ])
                ])
              ], 10, cs))), 128))
            ])
          ]),
          s("div", gs, [
            s("div", ws, [
              s("div", Cs, [
                t[10] || (t[10] = s("span", { class: "panel-icon" }, "🔗", -1)),
                t[11] || (t[11] = s("span", null, "常用网站 / 参考", -1)),
                s("span", xs, i(o(a).websites.length), 1)
              ])
            ]),
            s("div", Ws, [
              o(a).websites.length === 0 ? (l(), n("div", Vs, [...t[12] || (t[12] = [
                s("span", null, "暂无网站", -1),
                s("span", { class: "sub" }, "从常用网站或 ai hot 文章右键添加", -1)
              ])])) : (l(), n("div", $s, [
                (l(!0), n(k, null, b(o(a).websites, (e) => (l(), n("div", {
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
                    q(N, { link: e }, null, 8, ["link"])
                  ], 8, Ts),
                  s("button", {
                    type: "button",
                    class: "item-remove-btn site-remove-btn",
                    onClick: f((u) => o(E)(e.id), ["stop"]),
                    "aria-label": `从工作台移除${e.title}`,
                    title: "从工作台移除"
                  }, "×", 8, Us)
                ]))), 128))
              ]))
            ])
          ])
        ]),
        s("main", Bs, [
          o(a).focus.type === "video" && o(a).focus.data?.bvid ? (l(), n("div", Is, [
            s("div", Ss, [
              s("span", qs, i(r.value === o(a).focus.data?.bvid ? "正在播放" : "视频待播放"), 1),
              s("span", Fs, i(o(a).focus.title), 1)
            ]),
            s("div", Ns, [
              p.value && r.value && r.value === o(a).focus.data.bvid ? (l(), n("iframe", {
                key: 0,
                src: `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(r.value)}&page=1&high_quality=1&as_wide=1&danmaku=0&autoplay=1`,
                allow: "autoplay; fullscreen",
                scrolling: "no",
                border: "0",
                frameborder: "no",
                framespacing: "0",
                allowfullscreen: "true"
              }, null, 8, Rs)) : (l(), n("div", As, [
                t[13] || (t[13] = s("p", null, "视频仅在主动点击后加载，切走工作台即停止。", -1)),
                s("button", {
                  type: "button",
                  onClick: g
                }, "播放此视频")
              ]))
            ])
          ])) : o(a).focus.type === "repo" && o(a).focus.data ? (l(), n("div", Ds, [
            s("div", Es, [
              t[14] || (t[14] = s("span", { class: "stage-badge" }, "代码仓库", -1)),
              s("span", Ks, i(o(a).focus.title), 1),
              s("a", {
                href: o(a).focus.data.htmlUrl,
                target: "_blank",
                rel: "noopener",
                class: "stage-ext-link"
              }, "在 GitHub 打开 ↗", 8, Ls)
            ]),
            s("div", zs, [
              s("p", Gs, i(o(a).focus.data.description || "暂无仓库简介"), 1),
              s("div", Hs, [
                o(a).focus.data.language ? (l(), n("span", Ms, " ● " + i(o(a).focus.data.language), 1)) : c("", !0),
                o(a).focus.data.stars ? (l(), n("span", Ps, " ⭐ " + i(o(a).focus.data.stars), 1)) : c("", !0)
              ]),
              t[15] || (t[15] = s("div", { class: "repo-readme-placeholder" }, [
                s("p", null, "💡 点击右上角直达仓库源码，或在此关联相关 Issues 与 Commit。")
              ], -1))
            ])
          ])) : o(a).focus.type === "note" ? (l(), n("div", Os, [
            t[16] || (t[16] = s("div", { class: "stage-header" }, [
              s("span", { class: "stage-badge" }, "沉浸记录"),
              s("span", { class: "stage-title" }, "速记草稿本")
            ], -1)),
            v(s("textarea", {
              "onUpdate:modelValue": t[2] || (t[2] = (e) => o(a).scratchpad = e),
              class: "stage-textarea",
              placeholder: "在这里深度构思、沉浸书写笔记与想法..."
            }, null, 512), [
              [h, o(a).scratchpad]
            ])
          ])) : (l(), n("div", js, [...t[17] || (t[17] = [
            s("div", { class: "empty-mascot" }, "🦫", -1),
            s("h2", null, "就绪工作台 · 沉浸焦点", -1),
            s("p", null, "从左侧点击视频播放，点击右侧仓库查看详情，或点击顶部聚焦笔记。", -1)
          ])]))
        ]),
        s("aside", Js, [
          s("div", Qs, [
            s("div", Xs, [
              s("div", Ys, [
                t[18] || (t[18] = s("span", { class: "panel-icon" }, "🐙", -1)),
                t[19] || (t[19] = s("span", null, "项目仓库", -1)),
                s("span", Zs, i(o(a).repos.length), 1)
              ])
            ]),
            s("div", se, [
              o(a).repos.length === 0 ? (l(), n("div", ee, [...t[20] || (t[20] = [
                s("span", null, "暂无仓库", -1),
                s("span", { class: "sub" }, "在 GitHub 模块右键移入", -1)
              ])])) : c("", !0),
              (l(!0), n(k, null, b(o(a).repos, (e) => (l(), n("div", {
                key: e.id,
                class: m(["repo-item", { "is-selected": o(a).focus.id === e.id && o(a).focus.type === "repo" }]),
                onClick: (u) => U(e)
              }, [
                s("div", oe, [
                  s("span", ae, i(e.owner) + "/" + i(e.name), 1),
                  s("button", {
                    class: "item-remove-btn",
                    onClick: f((u) => o(K)(e.id), ["stop"]),
                    title: "移除仓库"
                  }, "×", 8, le)
                ]),
                e.description ? (l(), n("p", ne, i(e.description), 1)) : c("", !0)
              ], 10, te))), 128))
            ])
          ]),
          s("div", ie, [
            s("div", { class: "panel-header" }, [
              t[21] || (t[21] = s("div", { class: "panel-title" }, [
                s("span", { class: "panel-icon" }, "📝"),
                s("span", null, "速记草稿")
              ], -1)),
              s("button", {
                class: "small-btn",
                onClick: w,
                title: "全屏沉浸编辑"
              }, " 展开 ↗ ")
            ]),
            s("div", de, [
              v(s("textarea", {
                "onUpdate:modelValue": t[3] || (t[3] = (e) => o(a).scratchpad = e),
                class: "scratchpad-textarea",
                placeholder: "随手写草稿、灵感备忘..."
              }, null, 512), [
                [h, o(a).scratchpad]
              ])
            ])
          ])
        ])
      ])
    ], 2)), [
      [I, p.value]
    ]);
  }
}), ke = /* @__PURE__ */ z(ce, [["__scopeId", "data-v-a0a22de0"]]);
export {
  ke as default
};
