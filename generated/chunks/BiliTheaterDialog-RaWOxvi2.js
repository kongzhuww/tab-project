import { d as M, o, e as l, f as t, t as a, u as s, F as u, h as m, g as d, B as v, m as f, D as g, i as h, b as w } from "./vendor-vue-DokqDua_.js";
import { u as I } from "./use-video-failover-nNqois9K.js";
import { b as r } from "./up-group-manager-store-DdXDf4yA.js";
import { B as k } from "./BiliRichText-BE-gFgV_.js";
import { _ as N } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const D = ["open"], Q = { class: "bili-theater-header" }, V = { class: "bili-theater-meta" }, $ = {
  id: "bili-theater-title",
  class: "bili-theater-title"
}, z = {
  id: "bili-theater-author",
  class: "bili-theater-author"
}, A = { class: "bili-theater-controls" }, E = ["value"], F = ["value"], P = ["title"], H = ["href"], O = { class: "bili-theater-content-wrapper" }, q = { class: "bili-theater-body" }, U = { class: "bili-theater-player-box" }, W = ["src", "poster", "hidden"], j = ["src", "hidden"], G = { class: "bili-theater-comments-section" }, J = { class: "bili-theater-comments-head" }, K = { class: "bili-theater-comments-title" }, X = {
  id: "bili-theater-comments-count",
  class: "muted small"
}, Y = { class: "bili-theater-comments-sort" }, Z = {
  id: "bili-theater-comments-list",
  class: "bili-theater-comments-list"
}, tt = {
  key: 0,
  class: "muted small",
  style: { padding: "12px 0" }
}, et = {
  key: 1,
  class: "muted small",
  style: { padding: "12px 0" }
}, st = ["src"], it = { class: "bili-theater-comment-main" }, ot = { class: "bili-theater-comment-user" }, lt = { key: 0 }, at = { class: "bili-theater-comment-text" }, nt = {
  key: 0,
  class: "bili-comment-picture-grid"
}, rt = ["href"], dt = ["src"], ct = { class: "bili-theater-comment-meta muted small" }, ut = { key: 0 }, bt = { key: 1 }, mt = {
  key: 1,
  class: "bili-comment-sub-list"
}, ht = { class: "bili-comment-sub-uname" }, _t = { class: "bili-comment-sub-more" }, pt = ["disabled", "onClick"], yt = ["disabled", "onClick"], vt = ["onClick"], ft = { class: "bili-theater-comments-more" }, gt = ["hidden"], kt = ["hidden"], Ct = { class: "bili-srt-head" }, xt = { class: "bili-srt-meta" }, St = {
  id: "bili-srt-count",
  class: "muted small"
}, Rt = {
  id: "bili-srt-list",
  class: "bili-srt-list",
  tabindex: "0"
}, Lt = {
  key: 0,
  class: "muted small bili-srt-placeholder",
  style: { padding: "12px 6px" }
}, Bt = ["data-from", "data-to", "onClick"], Tt = { class: "bili-srt-time muted" }, Mt = { class: "bili-srt-text" }, wt = /* @__PURE__ */ M({
  __name: "BiliTheaterDialog",
  setup(It) {
    const i = r.state, _ = w(null);
    I(i, _, () => r.playbackFailed());
    function C() {
      r.close();
    }
    function p() {
      r.toggleSrt();
    }
    function x() {
      r.togglePlayerMode();
    }
    function S(b) {
      const n = b.target;
      n && r.switchQuality(Number(n.value));
    }
    function y(b) {
      r.setSort(b);
    }
    function R() {
      r.loadMoreComments();
    }
    function L() {
      r.analyzeSrtWithAi();
    }
    function B() {
      r.copySrt();
    }
    function T(b) {
      r.seekSrt(b);
    }
    return (b, n) => (o(), l("dialog", {
      id: "bili-theater-dialog",
      class: "bili-theater-dialog",
      open: s(i).isOpen || void 0
    }, [
      t("header", Q, [
        t("div", V, [
          t("button", {
            id: "bili-theater-srt-toggle",
            class: "bili-theater-btn bili-theater-srt-toggle-btn",
            type: "button",
            title: "展开/收起字幕抽屉面板 (快捷键 S)",
            onClick: p
          }, " 📝 字幕 "),
          n[2] || (n[2] = t("span", { class: "bili-theater-badge" }, "本地播放", -1)),
          t("h3", $, a(s(i).title), 1),
          t("span", z, a(s(i).author), 1)
        ]),
        t("div", A, [
          !s(i).useIframe && s(i).acceptQualities.length ? (o(), l("select", {
            key: 0,
            class: "bili-theater-quality-select",
            value: s(i).currentQuality,
            title: "切换视频画质清晰度",
            onChange: S
          }, [
            (o(!0), l(u, null, m(s(i).acceptQualities, (e) => (o(), l("option", {
              key: e.qn,
              value: e.qn
            }, a(e.label), 9, F))), 128))
          ], 40, E)) : d("", !0),
          s(i).canDirectPlay ? (o(), l("button", {
            key: 1,
            class: "bili-theater-btn",
            type: "button",
            title: s(i).useIframe ? "切换至原生 HTML5 直链播放器" : "切换至官方 iframe 内嵌播放器",
            onClick: x
          }, a(s(i).useIframe ? "直链播放" : "官方内嵌"), 9, P)) : d("", !0),
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
            onClick: C
          }, " ✕ ")
        ])
      ]),
      t("div", O, [
        t("div", q, [
          t("div", U, [
            t("video", {
              id: "bili-theater-video",
              ref_key: "videoRef",
              ref: _,
              class: "bili-theater-video",
              controls: "",
              autoplay: "",
              playsinline: "",
              preload: "metadata",
              src: s(i).videoSrc || void 0,
              poster: s(i).cover || void 0,
              hidden: s(i).useIframe
            }, null, 8, W),
            t("iframe", {
              id: "bili-theater-iframe",
              class: "bili-theater-iframe",
              allowfullscreen: "true",
              allow: "autoplay; fullscreen; encrypted-media",
              src: s(i).iframeSrc || void 0,
              hidden: !s(i).useIframe
            }, null, 8, j)
          ]),
          t("div", G, [
            t("div", J, [
              t("div", K, [
                n[3] || (n[3] = t("strong", null, "💬 评论区", -1)),
                t("span", X, a(s(i).commentsCountText), 1)
              ]),
              t("div", Y, [
                t("button", {
                  type: "button",
                  class: v(["bili-comments-sort-btn", { active: s(i).commentsSort === 1 }]),
                  "data-sort": "1",
                  onClick: n[0] || (n[0] = (e) => y(1))
                }, " 按热度 ", 2),
                t("button", {
                  type: "button",
                  class: v(["bili-comments-sort-btn", { active: s(i).commentsSort === 0 }]),
                  "data-sort": "0",
                  onClick: n[1] || (n[1] = (e) => y(0))
                }, " 按最新 ", 2)
              ])
            ]),
            t("div", Z, [
              s(i).commentsLoading && !s(i).comments.length ? (o(), l("p", tt, "正在加载评论…")) : s(i).commentsStatus && !s(i).comments.length ? (o(), l("p", et, a(s(i).commentsStatus), 1)) : d("", !0),
              (o(!0), l(u, null, m(s(i).comments, (e) => (o(), l("div", {
                key: e.id,
                class: "bili-theater-comment-item"
              }, [
                e.avatar ? (o(), l("img", {
                  key: 0,
                  class: "bili-theater-comment-avatar",
                  src: e.avatar,
                  alt: "",
                  loading: "lazy"
                }, null, 8, st)) : d("", !0),
                t("div", it, [
                  t("div", ot, [
                    f(a(e.userName) + " ", 1),
                    e.level ? (o(), l("small", lt, "LV" + a(e.level), 1)) : d("", !0)
                  ]),
                  t("div", at, [
                    g(k, {
                      text: e.message
                    }, null, 8, ["text"])
                  ]),
                  e.pictures?.length ? (o(), l("div", nt, [
                    (o(!0), l(u, null, m(e.pictures, (c) => (o(), l("a", {
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
                      }, null, 8, dt)
                    ], 8, rt))), 128))
                  ])) : d("", !0),
                  t("div", ct, [
                    t("span", null, a(e.timeStr || ""), 1),
                    e.likeCount ? (o(), l("span", ut, "👍 " + a(e.likeCount), 1)) : d("", !0),
                    e.replyCount ? (o(), l("span", bt, "💬 " + a(e.replyCount), 1)) : d("", !0)
                  ]),
                  e.replies?.length ? (o(), l("div", mt, [
                    (o(!0), l(u, null, m(e.replies, (c) => (o(), l("div", {
                      key: c.id,
                      class: "bili-comment-sub-item"
                    }, [
                      t("strong", ht, a(c.userName) + ":", 1),
                      n[4] || (n[4] = f()),
                      g(k, {
                        text: c.message
                      }, null, 8, ["text"])
                    ]))), 128)),
                    t("div", _t, [
                      !e.subRepliesExpanded && (e.replyCount || 0) > e.replies.length ? (o(), l(u, { key: 0 }, [
                        t("span", null, "共 " + a(e.replyCount) + " 条回复，", 1),
                        t("button", {
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: e.subRepliesLoading,
                          onClick: h((c) => s(r).expandSubReplies(e.id), ["stop"])
                        }, a(e.subRepliesLoading ? "正在加载回复…" : "点击查看 ›"), 9, pt)
                      ], 64)) : e.subRepliesExpanded ? (o(), l(u, { key: 1 }, [
                        e.subRepliesHasMore ? (o(), l("button", {
                          key: 0,
                          type: "button",
                          class: "bili-comment-sub-expand-btn",
                          disabled: e.subRepliesLoading,
                          onClick: h((c) => s(r).expandSubReplies(e.id), ["stop"])
                        }, a(e.subRepliesLoading ? "正在加载更多…" : "加载更多回复 ›"), 9, yt)) : d("", !0),
                        t("button", {
                          type: "button",
                          class: "bili-comment-sub-collapse-btn",
                          onClick: h((c) => s(r).collapseSubReplies(e.id), ["stop"])
                        }, " 收起 ▴ ", 8, vt)
                      ], 64)) : d("", !0)
                    ])
                  ])) : d("", !0)
                ])
              ]))), 128))
            ]),
            t("div", ft, [
              t("button", {
                id: "bili-theater-comments-more",
                class: "bili-theater-load-more",
                type: "button",
                hidden: !s(i).hasMoreComments,
                onClick: R
              }, " 加载更多评论 ", 8, gt)
            ])
          ])
        ]),
        t("aside", {
          id: "bili-theater-srt-drawer",
          class: "bili-theater-srt-drawer",
          hidden: !s(i).srtDrawerOpen
        }, [
          t("div", Ct, [
            t("div", xt, [
              n[5] || (n[5] = t("strong", { class: "bili-srt-title" }, "📝 视频字幕 (SRT)", -1)),
              t("span", St, a(s(i).srtCountText), 1)
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
                onClick: B
              }, " 📋 复制 "),
              t("button", {
                id: "bili-srt-close",
                class: "bili-theater-btn close",
                type: "button",
                title: "收起字幕面板",
                onClick: p
              }, " ✕ ")
            ])
          ]),
          t("div", Rt, [
            !s(i).srtLines.length && !s(i).srtLoading ? (o(), l("p", Lt, " 点击左上方“📝 字幕”即可获取该视频的字幕稿… ")) : d("", !0),
            (o(!0), l(u, null, m(s(i).srtLines, (e) => (o(), l("div", {
              key: e.id,
              class: "bili-srt-line",
              "data-from": e.from,
              "data-to": e.to,
              onClick: (c) => T(e.from)
            }, [
              t("span", Tt, a(Math.floor(e.from)) + "s", 1),
              t("span", Mt, a(e.content), 1)
            ], 8, Bt))), 128))
          ])
        ], 8, kt)
      ])
    ], 8, D));
  }
}), zt = /* @__PURE__ */ N(wt, [["__scopeId", "data-v-5dc470d6"]]);
export {
  zt as default
};
