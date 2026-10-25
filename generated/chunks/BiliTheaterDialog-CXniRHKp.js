import { f as B, g as o, h as l, i as t, t as n, x as s, F as b, z as m, u as d, s as y, j as v, l as g, k as h } from "./vendor-vue-BUkfvXUI.js";
import { b as r } from "./up-group-manager-store-CPsfzf7t.js";
import { B as f } from "./BiliRichText-sNjt2n6q.js";
import { _ as M } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const w = ["open"], I = { class: "bili-theater-header" }, N = { class: "bili-theater-meta" }, z = {
  id: "bili-theater-title",
  class: "bili-theater-title"
}, A = {
  id: "bili-theater-author",
  class: "bili-theater-author"
}, Q = { class: "bili-theater-controls" }, $ = ["value"], D = ["value"], V = ["title"], E = ["href"], P = { class: "bili-theater-content-wrapper" }, F = { class: "bili-theater-body" }, H = { class: "bili-theater-player-box" }, O = ["src", "poster", "hidden"], W = ["src", "hidden"], j = { class: "bili-theater-comments-section" }, q = { class: "bili-theater-comments-head" }, U = { class: "bili-theater-comments-title" }, G = {
  id: "bili-theater-comments-count",
  class: "muted small"
}, J = { class: "bili-theater-comments-sort" }, K = {
  id: "bili-theater-comments-list",
  class: "bili-theater-comments-list"
}, X = {
  key: 0,
  class: "muted small",
  style: { padding: "12px 0" }
}, Y = {
  key: 1,
  class: "muted small",
  style: { padding: "12px 0" }
}, Z = ["src"], tt = { class: "bili-theater-comment-main" }, et = { class: "bili-theater-comment-user" }, st = { key: 0 }, it = { class: "bili-theater-comment-text" }, ot = {
  key: 0,
  class: "bili-comment-picture-grid"
}, lt = ["href"], nt = ["src"], at = { class: "bili-theater-comment-meta muted small" }, rt = { key: 0 }, dt = { key: 1 }, ct = {
  key: 1,
  class: "bili-comment-sub-list"
}, bt = { class: "bili-comment-sub-uname" }, ut = { class: "bili-comment-sub-more" }, mt = ["disabled", "onClick"], ht = ["disabled", "onClick"], _t = ["onClick"], pt = { class: "bili-theater-comments-more" }, yt = ["hidden"], vt = ["hidden"], gt = { class: "bili-srt-head" }, ft = { class: "bili-srt-meta" }, kt = {
  id: "bili-srt-count",
  class: "muted small"
}, Ct = {
  id: "bili-srt-list",
  class: "bili-srt-list",
  tabindex: "0"
}, xt = {
  key: 0,
  class: "muted small bili-srt-placeholder",
  style: { padding: "12px 6px" }
}, St = ["data-from", "data-to", "onClick"], Lt = { class: "bili-srt-time muted" }, Rt = { class: "bili-srt-text" }, Tt = /* @__PURE__ */ B({
  __name: "BiliTheaterDialog",
  setup(Bt) {
    const i = r.state;
    function k() {
      r.close();
    }
    function _() {
      r.toggleSrt();
    }
    function C() {
      r.togglePlayerMode();
    }
    function x(u) {
      const a = u.target;
      a && r.switchQuality(Number(a.value));
    }
    function p(u) {
      r.setSort(u);
    }
    function S() {
      r.loadMoreComments();
    }
    function L() {
      r.analyzeSrtWithAi();
    }
    function R() {
      r.copySrt();
    }
    function T(u) {
      r.seekSrt(u);
    }
    return (u, a) => (o(), l("dialog", {
      id: "bili-theater-dialog",
      class: "bili-theater-dialog",
      open: s(i).isOpen || void 0
    }, [
      t("header", I, [
        t("div", N, [
          t("button", {
            id: "bili-theater-srt-toggle",
            class: "bili-theater-btn bili-theater-srt-toggle-btn",
            type: "button",
            title: "展开/收起字幕抽屉面板 (快捷键 S)",
            onClick: _
          }, " 📝 字幕 "),
          a[2] || (a[2] = t("span", { class: "bili-theater-badge" }, "本地播放", -1)),
          t("h3", z, n(s(i).title), 1),
          t("span", A, n(s(i).author), 1)
        ]),
        t("div", Q, [
          !s(i).useIframe && s(i).acceptQualities.length ? (o(), l("select", {
            key: 0,
            class: "bili-theater-quality-select",
            value: s(i).currentQuality,
            title: "切换视频画质清晰度",
            onChange: x
          }, [
            (o(!0), l(b, null, m(s(i).acceptQualities, (e) => (o(), l("option", {
              key: e.qn,
              value: e.qn
            }, n(e.label), 9, D))), 128))
          ], 40, $)) : d("", !0),
          s(i).canDirectPlay ? (o(), l("button", {
            key: 1,
            class: "bili-theater-btn",
            type: "button",
            title: s(i).useIframe ? "切换至原生 HTML5 直链播放器" : "切换至官方 iframe 内嵌播放器",
            onClick: C
          }, n(s(i).useIframe ? "直链播放" : "官方内嵌"), 9, V)) : d("", !0),
          t("a", {
            id: "bili-theater-open-bili",
            class: "bili-theater-btn",
            target: "_blank",
            rel: "noreferrer",
            title: "在 B站 网页中打开",
            href: s(i).openBiliUrl || void 0
          }, " B站播放 ↗ ", 8, E),
          t("button", {
            id: "bili-theater-close",
            class: "bili-theater-btn close",
            type: "button",
            title: "关闭 (Esc / Alt+W / Q)",
            onClick: k
          }, " ✕ ")
        ])
      ]),
      t("div", P, [
        t("div", F, [
          t("div", H, [
            t("video", {
              id: "bili-theater-video",
              class: "bili-theater-video",
              controls: "",
              autoplay: "",
              playsinline: "",
              preload: "metadata",
              src: s(i).videoSrc || void 0,
              poster: s(i).cover || void 0,
              hidden: s(i).useIframe
            }, null, 8, O),
            t("iframe", {
              id: "bili-theater-iframe",
              class: "bili-theater-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen; encrypted-media",
              src: s(i).iframeSrc || void 0,
              hidden: !s(i).useIframe
            }, null, 8, W)
          ]),
          t("div", j, [
            t("div", q, [
              t("div", U, [
                a[3] || (a[3] = t("strong", null, "💬 评论区", -1)),
                t("span", G, n(s(i).commentsCountText), 1)
              ]),
              t("div", J, [
                t("button", {
                  type: "button",
                  class: y(["bili-comments-sort-btn", { active: s(i).commentsSort === 1 }]),
                  "data-sort": "1",
                  onClick: a[0] || (a[0] = (e) => p(1))
                }, " 按热度 ", 2),
                t("button", {
                  type: "button",
                  class: y(["bili-comments-sort-btn", { active: s(i).commentsSort === 0 }]),
                  "data-sort": "0",
                  onClick: a[1] || (a[1] = (e) => p(0))
                }, " 按最新 ", 2)
              ])
            ]),
            t("div", K, [
              s(i).commentsLoading && !s(i).comments.length ? (o(), l("p", X, "正在加载评论…")) : s(i).commentsStatus && !s(i).comments.length ? (o(), l("p", Y, n(s(i).commentsStatus), 1)) : d("", !0),
              (o(!0), l(b, null, m(s(i).comments, (e) => (o(), l("div", {
                key: e.id,
                class: "bili-theater-comment-item"
              }, [
                e.avatar ? (o(), l("img", {
                  key: 0,
                  class: "bili-theater-comment-avatar",
                  src: e.avatar,
                  alt: "",
                  loading: "lazy"
                }, null, 8, Z)) : d("", !0),
                t("div", tt, [
                  t("div", et, [
                    v(n(e.userName) + " ", 1),
                    e.level ? (o(), l("small", st, "LV" + n(e.level), 1)) : d("", !0)
                  ]),
                  t("div", it, [
                    g(f, {
                      text: e.message
                    }, null, 8, ["text"])
                  ]),
                  e.pictures?.length ? (o(), l("div", ot, [
                    (o(!0), l(b, null, m(e.pictures, (c) => (o(), l("a", {
                      key: c,
                      href: c,
                      target: "_blank",
                      rel: "noreferrer"
                    }, [
                      t("img", {
                        src: c,
                        alt: "评论图片",
                        loading: "lazy",
                        referrerpolicy: "no-referrer"
                      }, null, 8, nt)
                    ], 8, lt))), 128))
                  ])) : d("", !0),
                  t("div", at, [
                    t("span", null, n(e.timeStr || ""), 1),
                    e.likeCount ? (o(), l("span", rt, "👍 " + n(e.likeCount), 1)) : d("", !0),
                    e.replyCount ? (o(), l("span", dt, "💬 " + n(e.replyCount), 1)) : d("", !0)
                  ]),
                  e.replies?.length ? (o(), l("div", ct, [
                    (o(!0), l(b, null, m(e.replies, (c) => (o(), l("div", {
                      key: c.id,
                      class: "bili-comment-sub-item"
                    }, [
                      t("strong", bt, n(c.userName) + ":", 1),
                      a[4] || (a[4] = v()),
                      g(f, {
                        text: c.message
                      }, null, 8, ["text"])
                    ]))), 128)),
                    t("div", ut, [
                      !e.subRepliesExpanded && (e.replyCount || 0) > e.replies.length ? (o(), l(b, { key: 0 }, [
                        t("span", null, "共 " + n(e.replyCount) + " 条回复，", 1),
                        t("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: e.subRepliesLoading,
                          onClick: h((c) => s(r).expandSubReplies(e.id), ["stop"])
                        }, n(e.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, mt)
                      ], 64)) : e.subRepliesExpanded ? (o(), l(b, { key: 1 }, [
                        e.subRepliesHasMore ? (o(), l("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: e.subRepliesLoading,
                          onClick: h((c) => s(r).expandSubReplies(e.id), ["stop"])
                        }, n(e.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, ht)) : d("", !0),
                        t("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: h((c) => s(r).collapseSubReplies(e.id), ["stop"])
                        }, " 收起 ▴ ", 8, _t)
                      ], 64)) : d("", !0)
                    ])
                  ])) : d("", !0)
                ])
              ]))), 128))
            ]),
            t("div", pt, [
              t("button", {
                id: "bili-theater-comments-more",
                class: "bili-theater-load-more",
                type: "button",
                hidden: !s(i).hasMoreComments,
                onClick: S
              }, " 加载更多评论 ", 8, yt)
            ])
          ])
        ]),
        t("aside", {
          id: "bili-theater-srt-drawer",
          class: "bili-theater-srt-drawer",
          hidden: !s(i).srtDrawerOpen
        }, [
          t("div", gt, [
            t("div", ft, [
              a[5] || (a[5] = t("strong", { class: "bili-srt-title" }, "📝 视频字幕 (SRT)", -1)),
              t("span", kt, n(s(i).srtCountText), 1)
            ]),
            t("div", { class: "bili-srt-actions" }, [
              t("button", {
                id: "bili-srt-ai",
                class: "bili-theater-btn",
                type: "button",
                title: "把字幕填入 AI 草稿，发送前不会上传",
                onClick: L
              }, " ✦ AI 分析 "),
              t("button", {
                id: "bili-srt-copy",
                class: "bili-theater-btn",
                type: "button",
                title: "复制纯文本字幕",
                onClick: R
              }, " 📋 复制 "),
              t("button", {
                id: "bili-srt-close",
                class: "bili-theater-btn close",
                type: "button",
                title: "收起字幕面板",
                onClick: _
              }, " ✕ ")
            ])
          ]),
          t("div", Ct, [
            !s(i).srtLines.length && !s(i).srtLoading ? (o(), l("p", xt, " 点击左上方“📝 字幕”即可获取该视频的字幕稿… ")) : d("", !0),
            (o(!0), l(b, null, m(s(i).srtLines, (e) => (o(), l("div", {
              key: e.id,
              class: "bili-srt-line",
              "data-from": e.from,
              "data-to": e.to,
              onClick: (c) => T(e.from)
            }, [
              t("span", Lt, n(Math.floor(e.from)) + "s", 1),
              t("span", Rt, n(e.content), 1)
            ], 8, St))), 128))
          ])
        ], 8, vt)
      ])
    ], 8, w));
  }
}), zt = /* @__PURE__ */ M(Tt, [["__scopeId", "data-v-bb08258b"]]);
export {
  zt as default
};
