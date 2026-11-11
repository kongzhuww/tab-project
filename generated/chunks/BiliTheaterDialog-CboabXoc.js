import { d as M, o, e as l, i as t, t as a, u as s, j as I, f as d, A as v, F as u, g as b, m as f, p as g, h, b as N, s as z } from "./vendor-vue-9b0eS4bW.js";
import { u as A } from "./use-video-failover-DlY0N2Dn.js";
import { b as n } from "./up-group-manager-store-bA_qU6G-.js";
import { B as k } from "./BiliRichText-DiMdMZkQ.js";
import { C as Q } from "./view-styles-KV13C9x1.js";
import { _ as V } from "./_plugin-vue_export-helper-BxikU0LD.js";
const $ = ["open"], D = { class: "bili-theater-header" }, E = { class: "bili-theater-meta" }, F = {
  id: "bili-theater-title",
  class: "bili-theater-title"
}, O = {
  id: "bili-theater-author",
  class: "bili-theater-author"
}, P = { class: "bili-theater-controls" }, q = ["title"], H = ["href"], j = { class: "bili-theater-content-wrapper" }, U = { class: "bili-theater-body" }, W = { class: "bili-theater-player-box" }, G = ["src", "poster", "hidden"], J = ["src", "hidden"], K = { class: "bili-theater-comments-section" }, X = { class: "bili-theater-comments-head" }, Y = { class: "bili-theater-comments-title" }, Z = {
  id: "bili-theater-comments-count",
  class: "muted small"
}, tt = { class: "bili-theater-comments-sort" }, et = {
  id: "bili-theater-comments-list",
  class: "bili-theater-comments-list"
}, st = {
  key: 0,
  class: "muted small",
  style: { padding: "12px 0" }
}, it = {
  key: 1,
  class: "muted small",
  style: { padding: "12px 0" }
}, ot = ["src"], lt = { class: "bili-theater-comment-main" }, at = { class: "bili-theater-comment-user" }, nt = { key: 0 }, rt = { class: "bili-theater-comment-text" }, dt = {
  key: 0,
  class: "bili-comment-picture-grid"
}, ct = ["href"], mt = ["src"], ut = { class: "bili-theater-comment-meta muted small" }, bt = { key: 0 }, ht = { key: 1 }, pt = {
  key: 1,
  class: "bili-comment-sub-list"
}, _t = { class: "bili-comment-sub-uname" }, yt = { class: "bili-comment-sub-more" }, vt = ["disabled", "onClick"], ft = ["disabled", "onClick"], gt = ["onClick"], kt = { class: "bili-theater-comments-more" }, Ct = ["hidden"], xt = ["hidden"], St = { class: "bili-srt-head" }, Rt = { class: "bili-srt-meta" }, Lt = {
  id: "bili-srt-count",
  class: "muted small"
}, Bt = {
  id: "bili-srt-list",
  class: "bili-srt-list",
  tabindex: "0"
}, Tt = {
  key: 0,
  class: "muted small bili-srt-placeholder",
  style: { padding: "12px 6px" }
}, wt = ["data-from", "data-to", "onClick"], Mt = { class: "bili-srt-time muted" }, It = { class: "bili-srt-text" }, Nt = /* @__PURE__ */ M({
  __name: "BiliTheaterDialog",
  setup(zt) {
    const i = n.state, p = N(null);
    A(i, p, () => n.playbackFailed());
    const C = z(() => i.acceptQualities.map((m) => ({
      value: m.qn,
      label: m.label
    })));
    function x() {
      n.close();
    }
    function _() {
      n.toggleSrt();
    }
    function S() {
      n.togglePlayerMode();
    }
    function R(m) {
      n.switchQuality(Number(m));
    }
    function y(m) {
      n.setSort(m);
    }
    function L() {
      n.loadMoreComments();
    }
    function B() {
      n.analyzeSrtWithAi();
    }
    function T() {
      n.copySrt();
    }
    function w(m) {
      n.seekSrt(m);
    }
    return (m, r) => (o(), l("dialog", {
      id: "bili-theater-dialog",
      class: "bili-theater-dialog",
      open: s(i).isOpen || void 0
    }, [
      t("header", D, [
        t("div", E, [
          t("button", {
            id: "bili-theater-srt-toggle",
            class: "bili-theater-btn bili-theater-srt-toggle-btn",
            type: "button",
            title: "展开/收起字幕抽屉面板 (快捷键 S)",
            onClick: _
          }, " 📝 字幕 "),
          r[2] || (r[2] = t("span", { class: "bili-theater-badge" }, "本地播放", -1)),
          t("h3", F, a(s(i).title), 1),
          t("span", O, a(s(i).author), 1)
        ]),
        t("div", P, [
          !s(i).useIframe && s(i).acceptQualities.length ? (o(), I(Q, {
            key: 0,
            class: "bili-theater-quality-select",
            "model-value": s(i).currentQuality,
            options: C.value,
            size: "sm",
            style: { width: "105px" },
            onChange: R
          }, null, 8, ["model-value", "options"])) : d("", !0),
          s(i).canDirectPlay ? (o(), l("button", {
            key: 1,
            class: "bili-theater-btn",
            type: "button",
            title: s(i).useIframe ? "切换至原生 HTML5 直链播放器" : "切换至官方 iframe 内嵌播放器",
            onClick: S
          }, a(s(i).useIframe ? "直链播放" : "官方内嵌"), 9, q)) : d("", !0),
          t("a", {
            id: "bili-theater-open-bili",
            class: "bili-theater-btn",
            target: "_blank",
            rel: "noreferrer",
            title: "在 B站 网页中打开",
            href: s(i).openBiliUrl || void 0
          }, " B站播放 ↗ ", 8, H),
          t("button", {
            id: "bili-theater-close",
            class: "bili-theater-btn close",
            type: "button",
            title: "关闭 (Esc / Q)",
            onClick: x
          }, " ✕ ")
        ])
      ]),
      t("div", j, [
        t("div", U, [
          t("div", W, [
            t("video", {
              id: "bili-theater-video",
              ref_key: "videoRef",
              ref: p,
              class: "bili-theater-video",
              controls: "",
              autoplay: "",
              playsinline: "",
              preload: "metadata",
              src: s(i).videoSrc || void 0,
              poster: s(i).cover || void 0,
              hidden: s(i).useIframe
            }, null, 8, G),
            t("iframe", {
              id: "bili-theater-iframe",
              class: "bili-theater-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen; encrypted-media",
              src: s(i).iframeSrc || void 0,
              hidden: !s(i).useIframe
            }, null, 8, J)
          ]),
          t("div", K, [
            t("div", X, [
              t("div", Y, [
                r[3] || (r[3] = t("strong", null, "💬 评论区", -1)),
                t("span", Z, a(s(i).commentsCountText), 1)
              ]),
              t("div", tt, [
                t("button", {
                  type: "button",
                  class: v(["bili-comments-sort-btn", { active: s(i).commentsSort === 1 }]),
                  "data-sort": "1",
                  onClick: r[0] || (r[0] = (e) => y(1))
                }, " 按热度 ", 2),
                t("button", {
                  type: "button",
                  class: v(["bili-comments-sort-btn", { active: s(i).commentsSort === 0 }]),
                  "data-sort": "0",
                  onClick: r[1] || (r[1] = (e) => y(0))
                }, " 按最新 ", 2)
              ])
            ]),
            t("div", et, [
              s(i).commentsLoading && !s(i).comments.length ? (o(), l("p", st, "正在加载评论…")) : s(i).commentsStatus && !s(i).comments.length ? (o(), l("p", it, a(s(i).commentsStatus), 1)) : d("", !0),
              (o(!0), l(u, null, b(s(i).comments, (e) => (o(), l("div", {
                key: e.id,
                class: "bili-theater-comment-item"
              }, [
                e.avatar ? (o(), l("img", {
                  key: 0,
                  class: "bili-theater-comment-avatar",
                  src: e.avatar,
                  alt: "",
                  loading: "lazy"
                }, null, 8, ot)) : d("", !0),
                t("div", lt, [
                  t("div", at, [
                    f(a(e.userName) + " ", 1),
                    e.level ? (o(), l("small", nt, "LV" + a(e.level), 1)) : d("", !0)
                  ]),
                  t("div", rt, [
                    g(k, {
                      text: e.message
                    }, null, 8, ["text"])
                  ]),
                  e.pictures?.length ? (o(), l("div", dt, [
                    (o(!0), l(u, null, b(e.pictures, (c) => (o(), l("a", {
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
                      }, null, 8, mt)
                    ], 8, ct))), 128))
                  ])) : d("", !0),
                  t("div", ut, [
                    t("span", null, a(e.timeStr || ""), 1),
                    e.likeCount ? (o(), l("span", bt, "👍 " + a(e.likeCount), 1)) : d("", !0),
                    e.replyCount ? (o(), l("span", ht, "💬 " + a(e.replyCount), 1)) : d("", !0)
                  ]),
                  e.replies?.length ? (o(), l("div", pt, [
                    (o(!0), l(u, null, b(e.replies, (c) => (o(), l("div", {
                      key: c.id,
                      class: "bili-comment-sub-item"
                    }, [
                      t("strong", _t, a(c.userName) + ":", 1),
                      r[4] || (r[4] = f()),
                      g(k, {
                        text: c.message
                      }, null, 8, ["text"])
                    ]))), 128)),
                    t("div", yt, [
                      !e.subRepliesExpanded && (e.replyCount || 0) > e.replies.length ? (o(), l(u, { key: 0 }, [
                        t("span", null, "共 " + a(e.replyCount) + " 条回复，", 1),
                        t("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: e.subRepliesLoading,
                          onClick: h((c) => s(n).expandSubReplies(e.id), ["stop"])
                        }, a(e.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, vt)
                      ], 64)) : e.subRepliesExpanded ? (o(), l(u, { key: 1 }, [
                        e.subRepliesHasMore ? (o(), l("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: e.subRepliesLoading,
                          onClick: h((c) => s(n).expandSubReplies(e.id), ["stop"])
                        }, a(e.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, ft)) : d("", !0),
                        t("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: h((c) => s(n).collapseSubReplies(e.id), ["stop"])
                        }, " 收起 ▴ ", 8, gt)
                      ], 64)) : d("", !0)
                    ])
                  ])) : d("", !0)
                ])
              ]))), 128))
            ]),
            t("div", kt, [
              t("button", {
                id: "bili-theater-comments-more",
                class: "bili-theater-load-more",
                type: "button",
                hidden: !s(i).hasMoreComments,
                onClick: L
              }, " 加载更多评论 ", 8, Ct)
            ])
          ])
        ]),
        t("aside", {
          id: "bili-theater-srt-drawer",
          class: "bili-theater-srt-drawer",
          hidden: !s(i).srtDrawerOpen
        }, [
          t("div", St, [
            t("div", Rt, [
              r[5] || (r[5] = t("strong", { class: "bili-srt-title" }, "📝 视频字幕 (SRT)", -1)),
              t("span", Lt, a(s(i).srtCountText), 1)
            ]),
            t("div", { class: "bili-srt-actions" }, [
              t("button", {
                id: "bili-srt-ai",
                class: "bili-theater-btn",
                type: "button",
                title: "把字幕填入 AI 草稿，发送前不会上传",
                onClick: B
              }, " ✦ AI 分析 "),
              t("button", {
                id: "bili-srt-copy",
                class: "bili-theater-btn",
                type: "button",
                title: "复制纯文本字幕",
                onClick: T
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
          t("div", Bt, [
            !s(i).srtLines.length && !s(i).srtLoading ? (o(), l("p", Tt, " 点击左上方“📝 字幕”即可获取该视频的字幕稿… ")) : d("", !0),
            (o(!0), l(u, null, b(s(i).srtLines, (e) => (o(), l("div", {
              key: e.id,
              class: "bili-srt-line",
              "data-from": e.from,
              "data-to": e.to,
              onClick: (c) => w(e.from)
            }, [
              t("span", Mt, a(Math.floor(e.from)) + "s", 1),
              t("span", It, a(e.content), 1)
            ], 8, wt))), 128))
          ])
        ], 8, xt)
      ])
    ], 8, $));
  }
}), Ft = /* @__PURE__ */ V(Nt, [["__scopeId", "data-v-4dac6d1a"]]);
export {
  Ft as default
};
