import { d as W, C as q, c as O, w as P, u as l, o as a, f as s, B as u, t as o, l as f, n as Q, e as r, g as G, F as C, h as w, i as U, z as S, b as L, s as M } from "./vendor-vue-DokqDua_.js";
import { A as H } from "./AppWindowFrame-D05mPlSe.js";
import { k as i, M as b, a1 as J, h as y, a2 as F } from "./view-styles-hx9Gz5g8.js";
import { _ as K } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const X = { class: "siren-container" }, Y = { class: "siren-top-bar" }, Z = { class: "siren-nav-tabs" }, ss = { class: "siren-search-box" }, ts = { class: "siren-stats-chip" }, es = { class: "siren-body" }, ns = { class: "siren-pane" }, is = {
  key: 0,
  class: "siren-empty"
}, ls = {
  key: 1,
  class: "siren-track-table"
}, os = { class: "siren-track-rows" }, as = ["onClick"], rs = { class: "col-num" }, cs = {
  key: 0,
  class: "siren-playing-wave"
}, ds = { key: 1 }, us = { class: "col-title" }, vs = ["src"], _s = ["title"], ps = ["title"], ms = ["title", "onClick"], bs = ["title", "onClick"], ys = { class: "siren-pane" }, ks = {
  key: 0,
  class: "siren-album-detail"
}, hs = { class: "siren-album-detail-banner" }, fs = ["src"], gs = { class: "siren-album-detail-info" }, Cs = { class: "siren-album-detail-title" }, ws = { class: "siren-album-detail-sub" }, Ss = {
  key: 0,
  class: "siren-empty"
}, Ls = {
  key: 1,
  class: "siren-track-rows"
}, Ms = ["onClick"], $s = { class: "col-num" }, As = { class: "col-title" }, xs = { class: "siren-track-name" }, Us = { class: "col-artist" }, Ds = ["onClick"], zs = {
  key: 1,
  class: "siren-album-grid"
}, Bs = ["onClick"], Es = { class: "siren-album-cover-wrap" }, Fs = ["src"], Rs = { class: "siren-album-meta" }, Ts = ["title"], js = { class: "siren-pane" }, Is = {
  key: 0,
  class: "siren-empty"
}, Vs = {
  key: 1,
  class: "siren-track-rows"
}, Ns = ["onClick"], Ws = { class: "col-num" }, qs = { class: "col-title" }, Os = ["src"], Ps = { class: "siren-track-name" }, Qs = { class: "col-artist" }, Gs = ["onClick"], Hs = { class: "siren-pane siren-lyrics-pane" }, Js = { class: "siren-lyrics-wrap" }, Ks = { class: "siren-lyrics-header" }, Xs = ["src"], Ys = { class: "siren-lyrics-track-info" }, Zs = { class: "siren-lyrics-title" }, st = { class: "siren-lyrics-artist" }, tt = { class: "siren-lyrics-body" }, et = {
  key: 0,
  class: "siren-lyrics-active-line"
}, nt = {
  key: 1,
  class: "siren-lyrics-empty"
}, it = { class: "siren-player-bar" }, lt = { class: "siren-pb-info" }, ot = ["src"], at = { class: "siren-pb-meta" }, rt = ["title"], ct = ["title"], dt = { class: "siren-pb-controls" }, ut = { class: "siren-pb-btns" }, vt = ["title"], _t = { class: "siren-pb-progress-row" }, pt = { class: "siren-time" }, mt = ["value"], bt = { class: "siren-time" }, yt = ["title"], kt = { class: "siren-lyric-snip" }, ht = /* @__PURE__ */ W({
  __name: "SirenWorkspaceDialog",
  setup(ft) {
    const d = L("songs"), _ = L(""), p = L(null), $ = L(!1), k = J;
    q(async () => {
      if (!i.songs || i.songs.length === 0)
        try {
          const n = await b.getSirenSongs();
          n?.length && (i.songs = n);
        } catch {
        }
      if (!i.albums || i.albums.length === 0)
        try {
          const n = await b.getSirenAlbums();
          n?.length && (i.albums = n);
        } catch {
        }
    });
    function D() {
      F.visible = !1;
    }
    const z = M(() => {
      const n = i.songs || [], t = _.value.trim().toLowerCase();
      return t ? n.filter((e) => {
        const v = (e.name || "").toLowerCase().includes(t), c = (e.artists || []).some((x) => x.toLowerCase().includes(t));
        return v || c;
      }) : n;
    }), R = M(() => {
      const n = i.albums || [], t = _.value.trim().toLowerCase();
      return t ? n.filter((e) => (e.name || "").toLowerCase().includes(t)) : n;
    }), B = M(() => {
      const n = i.favorites || [], t = _.value.trim().toLowerCase();
      return t ? n.filter((e) => {
        const v = (e.name || "").toLowerCase().includes(t), c = (e.artists || []).some((x) => x.toLowerCase().includes(t));
        return v || c;
      }) : n;
    });
    function m(n) {
      if (!i.playing) return !1;
      const t = b.getState().currentSong;
      return !!(t && String(t.cid) === String(n.cid));
    }
    function g(n) {
      y.playTrack(n.cid);
    }
    async function T(n) {
      if (p.value = n, !n._songs || !n._songs.length) {
        $.value = !0;
        try {
          const t = await b.getSirenAlbumDetail(n.cid);
          n._songs = t;
        } catch (t) {
          console.warn("加载专辑曲目失败", t);
        } finally {
          $.value = !1;
        }
      }
    }
    function j() {
      p.value = null;
    }
    function I(n) {
      const t = n._songs || [];
      t.length > 0 && (b.setQueue(t, 0, !0), i.activeAlbum = n);
    }
    function A(n, t) {
      t?.stopPropagation();
      const e = b.toggleLike(n);
      m(n) && (i.liked = e);
    }
    function h(n) {
      return b.isLiked(n.cid);
    }
    function E(n) {
      if (n.coverUrl) return n.coverUrl;
      if (n.albumCid) {
        const t = i.albums?.find((e) => String(e.cid) === String(n.albumCid));
        if (t?.coverUrl) return t.coverUrl;
      }
      return k;
    }
    function V(n) {
      const t = Number(n.target.value);
      y.seek(t);
    }
    const N = M(() => i.mode === "shuffle" ? "🔀" : i.mode === "one" ? "🔂" : "🔁");
    return (n, t) => (a(), O(H, {
      "window-id": "siren",
      title: "塞壬唱片模块",
      icon: "💿",
      visible: l(F).visible,
      "default-width": 880,
      "default-height": 620,
      "min-width": 600,
      "min-height": 450,
      "custom-class": "siren-workspace",
      onClose: D,
      onMinimize: D
    }, {
      default: P(() => [
        s("div", X, [
          s("header", Y, [
            s("nav", Z, [
              s("button", {
                type: "button",
                class: u(["siren-nav-btn", { active: d.value === "songs" }]),
                onClick: t[0] || (t[0] = (e) => d.value = "songs")
              }, " 🎵 单曲曲库 ", 2),
              s("button", {
                type: "button",
                class: u(["siren-nav-btn", { active: d.value === "albums" }]),
                onClick: t[1] || (t[1] = (e) => d.value = "albums")
              }, " 💿 官方专辑 ", 2),
              s("button", {
                type: "button",
                class: u(["siren-nav-btn", { active: d.value === "favorites" }]),
                onClick: t[2] || (t[2] = (e) => d.value = "favorites")
              }, " ♥️ 我的收藏 (" + o(l(i).favorites?.length || 0) + ") ", 3),
              s("button", {
                type: "button",
                class: u(["siren-nav-btn", { active: d.value === "lyrics" }]),
                onClick: t[3] || (t[3] = (e) => d.value = "lyrics")
              }, " 📜 沉浸歌词 ", 2)
            ]),
            s("div", ss, [
              t[15] || (t[15] = s("span", { class: "siren-search-icon" }, "🔍", -1)),
              f(s("input", {
                "onUpdate:modelValue": t[4] || (t[4] = (e) => _.value = e),
                type: "text",
                class: "siren-search-input",
                placeholder: "搜索塞壬原声、专辑或艺术家…"
              }, null, 512), [
                [Q, _.value]
              ]),
              _.value ? (a(), r("button", {
                key: 0,
                type: "button",
                class: "siren-search-clear",
                onClick: t[5] || (t[5] = (e) => _.value = "")
              }, " ✕ ")) : G("", !0)
            ]),
            s("div", ts, o(l(i).songs?.length || 0) + " 首原声 · " + o(l(i).albums?.length || 0) + " 张专辑 ", 1)
          ]),
          s("main", es, [
            f(s("section", ns, [
              z.value.length ? (a(), r("div", ls, [
                t[16] || (t[16] = s("div", { class: "siren-track-head" }, [
                  s("span", { class: "col-num" }, "#"),
                  s("span", { class: "col-title" }, "曲名"),
                  s("span", { class: "col-artist" }, "艺术家"),
                  s("span", { class: "col-act" }, "操作")
                ], -1)),
                s("div", os, [
                  (a(!0), r(C, null, w(z.value, (e, v) => (a(), r("div", {
                    key: e.cid,
                    class: u(["siren-track-row", { playing: m(e) }]),
                    onClick: (c) => g(e)
                  }, [
                    s("span", rs, [
                      m(e) ? (a(), r("span", cs, "▶")) : (a(), r("span", ds, o(v + 1), 1))
                    ]),
                    s("div", us, [
                      s("img", {
                        src: E(e),
                        class: "siren-track-thumb",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, vs),
                      s("span", {
                        class: "siren-track-name",
                        title: e.name
                      }, o(e.name), 9, _s)
                    ]),
                    s("div", {
                      class: "col-artist",
                      title: (e.artists || []).join(", ") || "塞壬唱片"
                    }, o((e.artists || []).join(", ") || "塞壬唱片"), 9, ps),
                    s("div", {
                      class: "col-act",
                      onClick: t[6] || (t[6] = U(() => {
                      }, ["stop"]))
                    }, [
                      s("button", {
                        type: "button",
                        class: u(["siren-btn-icon", { liked: h(e) }]),
                        title: h(e) ? "取消收藏" : "收藏曲目",
                        onClick: (c) => A(e, c)
                      }, o(h(e) ? "♥" : "♡"), 11, ms),
                      s("button", {
                        type: "button",
                        class: "siren-btn-icon play",
                        title: m(e) ? "正在播放" : "播放",
                        onClick: (c) => g(e)
                      }, o(m(e) ? "⏸" : "▶"), 9, bs)
                    ])
                  ], 10, as))), 128))
                ])
              ])) : (a(), r("div", is, o(_.value ? "未找到符合条件的塞壬曲目" : "正在加载塞壬曲库…"), 1))
            ], 512), [
              [S, d.value === "songs"]
            ]),
            f(s("section", ys, [
              p.value ? (a(), r("div", ks, [
                s("header", hs, [
                  s("button", {
                    type: "button",
                    class: "siren-back-btn",
                    onClick: j
                  }, " ‹ 返回专辑列表 "),
                  s("img", {
                    src: p.value.coverUrl || l(k),
                    class: "siren-album-detail-cover",
                    alt: ""
                  }, null, 8, fs),
                  s("div", gs, [
                    t[17] || (t[17] = s("span", { class: "siren-badge" }, "OFFICIAL ALBUM", -1)),
                    s("h2", Cs, o(p.value.name), 1),
                    s("p", ws, "塞壬唱片-MSR 出品 · 共 " + o(p.value._songs?.length || 0) + " 首曲目", 1),
                    s("button", {
                      type: "button",
                      class: "siren-play-album-btn",
                      onClick: t[7] || (t[7] = (e) => I(p.value))
                    }, " ▶ 播放整张专辑 ")
                  ])
                ]),
                $.value ? (a(), r("div", Ss, "正在调取专辑曲目列表…")) : (a(), r("div", Ls, [
                  (a(!0), r(C, null, w(p.value._songs || [], (e, v) => (a(), r("div", {
                    key: e.cid,
                    class: u(["siren-track-row", { playing: m(e) }]),
                    onClick: (c) => g(e)
                  }, [
                    s("span", $s, o(v + 1), 1),
                    s("div", As, [
                      s("span", xs, o(e.name), 1)
                    ]),
                    s("div", Us, o((e.artists || []).join(", ") || "塞壬唱片"), 1),
                    s("div", {
                      class: "col-act",
                      onClick: t[8] || (t[8] = U(() => {
                      }, ["stop"]))
                    }, [
                      s("button", {
                        type: "button",
                        class: u(["siren-btn-icon", { liked: h(e) }]),
                        onClick: (c) => A(e, c)
                      }, o(h(e) ? "♥" : "♡"), 11, Ds)
                    ])
                  ], 10, Ms))), 128))
                ]))
              ])) : (a(), r("div", zs, [
                (a(!0), r(C, null, w(R.value, (e) => (a(), r("div", {
                  key: e.cid,
                  class: "siren-album-card",
                  onClick: (v) => T(e)
                }, [
                  s("div", Es, [
                    s("img", {
                      src: e.coverUrl || l(k),
                      class: "siren-album-cover",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Fs),
                    t[18] || (t[18] = s("div", { class: "siren-album-hover-play" }, "▶", -1))
                  ]),
                  s("div", Rs, [
                    s("span", {
                      class: "siren-album-name",
                      title: e.name
                    }, o(e.name), 9, Ts),
                    t[19] || (t[19] = s("span", { class: "siren-album-corp" }, "塞壬唱片 MSR", -1))
                  ])
                ], 8, Bs))), 128))
              ]))
            ], 512), [
              [S, d.value === "albums"]
            ]),
            f(s("section", js, [
              B.value.length ? (a(), r("div", Vs, [
                (a(!0), r(C, null, w(B.value, (e, v) => (a(), r("div", {
                  key: e.cid,
                  class: u(["siren-track-row", { playing: m(e) }]),
                  onClick: (c) => g(e)
                }, [
                  s("span", Ws, o(v + 1), 1),
                  s("div", qs, [
                    s("img", {
                      src: E(e),
                      class: "siren-track-thumb",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Os),
                    s("span", Ps, o(e.name), 1)
                  ]),
                  s("div", Qs, o((e.artists || []).join(", ") || "塞壬唱片"), 1),
                  s("div", {
                    class: "col-act",
                    onClick: t[9] || (t[9] = U(() => {
                    }, ["stop"]))
                  }, [
                    s("button", {
                      type: "button",
                      class: "siren-btn-icon liked",
                      title: "取消收藏",
                      onClick: (c) => A(e, c)
                    }, " ♥ ", 8, Gs)
                  ])
                ], 10, Ns))), 128))
              ])) : (a(), r("div", Is, [...t[20] || (t[20] = [
                s("span", { style: { "font-size": "24px", "margin-bottom": "6px" } }, "♥️", -1),
                s("span", null, "暂无收藏的塞壬歌曲", -1),
                s("small", { style: { color: "var(--muted)", "margin-top": "4px" } }, "在单曲列表或播放条中点击 ♥ 即可加入心动收藏", -1)
              ])]))
            ], 512), [
              [S, d.value === "favorites"]
            ]),
            f(s("section", Hs, [
              s("div", Js, [
                s("div", Ks, [
                  s("img", {
                    src: l(i).coverUrl || l(k),
                    class: "siren-lyrics-disc",
                    alt: ""
                  }, null, 8, Xs),
                  s("div", Ys, [
                    s("h3", Zs, o(l(i).title || "未在播放"), 1),
                    s("p", st, o(l(i).artist || "塞壬唱片-MSR"), 1)
                  ])
                ]),
                s("div", tt, [
                  l(i).currentLyric ? (a(), r("div", et, o(l(i).currentLyric), 1)) : (a(), r("div", nt, o(l(i).playing ? "♪ 伴奏演播中…" : "未在播放塞壬歌曲"), 1))
                ])
              ])
            ], 512), [
              [S, d.value === "lyrics"]
            ])
          ]),
          s("footer", it, [
            s("div", lt, [
              s("img", {
                src: l(i).coverUrl || l(k),
                class: u(["siren-pb-cover", { spinning: l(i).playing }]),
                alt: ""
              }, null, 10, ot),
              s("div", at, [
                s("span", {
                  class: "siren-pb-title",
                  title: l(i).title
                }, o(l(i).title || "点击曲目开始播放"), 9, rt),
                s("span", {
                  class: "siren-pb-artist",
                  title: l(i).artist
                }, o(l(i).artist || "塞壬唱片"), 9, ct)
              ]),
              s("button", {
                type: "button",
                class: u(["siren-btn-icon", { liked: l(i).liked }]),
                title: "收藏",
                onClick: t[10] || (t[10] = (e) => l(y).toggleLike())
              }, o(l(i).liked ? "♥" : "♡"), 3)
            ]),
            s("div", dt, [
              s("div", ut, [
                s("button", {
                  type: "button",
                  class: "siren-ctrl-btn",
                  title: "播放模式",
                  onClick: t[11] || (t[11] = (e) => l(y).cycleMode())
                }, o(N.value), 1),
                s("button", {
                  type: "button",
                  class: "siren-ctrl-btn",
                  title: "上一首",
                  onClick: t[12] || (t[12] = (e) => l(y).prev())
                }, " ⏮ "),
                s("button", {
                  type: "button",
                  class: "siren-ctrl-btn play",
                  title: l(i).playing ? "暂停" : "播放",
                  onClick: t[13] || (t[13] = (e) => l(y).togglePlay())
                }, o(l(i).playing ? "⏸" : "▶"), 9, vt),
                s("button", {
                  type: "button",
                  class: "siren-ctrl-btn",
                  title: "下一首",
                  onClick: t[14] || (t[14] = (e) => l(y).next())
                }, " ⏭ ")
              ]),
              s("div", _t, [
                s("span", pt, o(l(i).formattedCurrent), 1),
                s("input", {
                  type: "range",
                  class: "siren-progress-bar",
                  min: "0",
                  max: "100",
                  value: l(i).progressPercent,
                  onInput: V
                }, null, 40, mt),
                s("span", bt, o(l(i).formattedDuration), 1)
              ])
            ]),
            s("div", {
              class: "siren-pb-lyric-preview",
              title: l(i).currentLyric || "塞壬官方原声无损音源"
            }, [
              t[21] || (t[21] = s("span", { class: "siren-lyric-dot" }, "♪", -1)),
              s("span", kt, o(l(i).currentLyric || "塞壬唱片 MSR 官方原声"), 1)
            ], 8, yt)
          ])
        ])
      ]),
      _: 1
    }, 8, ["visible"]));
  }
}), Lt = /* @__PURE__ */ K(ht, [["__scopeId", "data-v-594650f9"]]);
export {
  Lt as default
};
