import { d as A, f as l, g as i, h as t, t as k, u as c, q as y, F as f, i as C, k as h, n as g, b as O, s as U } from "./vendor-vue-_upDT3S_.js";
import { u as W, b as p, d as V } from "./search.service-I5ZPPxGy.js";
import { _ as X } from "./_plugin-vue_export-helper-DtNgUcga.js";
const Y = { class: "bookmark-panel-sheet" }, q = ["hidden"], D = ["aria-pressed", "title"], G = {
  id: "bookmark-import-list",
  class: "bookmark-import-list"
}, H = {
  key: 0,
  class: "bookmark-tree"
}, N = ["data-bookmark-folder-id"], j = ["title", "onMouseenter", "onClick", "onContextmenu"], J = { class: "bookmark-folder-name" }, K = ["data-bookmark-id", "title", "onClick", "onContextmenu"], Q = ["src"], Z = { class: "bookmark-import-copy" }, I = { class: "bookmark-import-title" }, oo = { class: "bookmark-import-host" }, eo = ["onClick"], to = {
  key: 1,
  class: "bookmark-import-empty"
}, no = { class: "bookmark-flyout-list" }, ro = {
  key: 0,
  class: "bookmark-tree-folder"
}, ao = ["onMouseenter", "onClick", "onContextmenu"], so = { class: "bookmark-folder-name" }, lo = ["title", "onClick", "onContextmenu"], io = ["src"], co = { class: "bookmark-import-copy" }, ko = { class: "bookmark-import-title" }, uo = { class: "bookmark-import-host" }, po = {
  key: 1,
  class: "bookmark-import-empty"
}, mo = /* @__PURE__ */ A({
  __name: "BookmarkPanel",
  setup(fo) {
    const s = W, m = O([]);
    let u;
    function b(n, o, e) {
      u && clearTimeout(u);
      const r = (typeof window < "u" ? window : null)?.LogicWeaverBookmarksService, d = r?.getChildrenOfFolder ? r.getChildrenOfFolder(o.id) : [], z = e.currentTarget, T = document.getElementById("bookmark-panel")?.getBoundingClientRect(), $ = z?.getBoundingClientRect();
      let v = $ && T ? Math.max(0, $.top - T.top) : 0;
      v > 280 && (v = Math.max(20, v - 100)), m.value = m.value.slice(0, n), m.value.push({
        level: n,
        folderId: o.id,
        title: o.title,
        items: d,
        top: v
      });
    }
    function w() {
      u && clearTimeout(u), u = setTimeout(() => {
        m.value = [];
      }, 240);
    }
    function L() {
      u && clearTimeout(u);
    }
    const S = U(() => typeof s.positionLeft == "number" ? { left: `${s.positionLeft}px` } : {});
    function E() {
      p.setPinned(!s.pinned), p.dispatch("toggle-pin", s.pinned);
    }
    function P() {
      p.close(), p.dispatch("close");
    }
    function x(n) {
      p.openBookmark(n);
    }
    function _(n, o) {
      p.openContextMenu(o, n.clientX, n.clientY);
      const e = typeof window < "u" ? window : null, a = Array.isArray(e?.launcherState?.groups) ? e.launcherState.groups.map((r) => r.name || r) : ["常用网站"];
      V.openMenu(
        {
          id: o.id,
          title: o.title,
          url: o.url,
          isFolder: o.isFolder,
          parentId: o.parentId
        },
        n.clientX,
        n.clientY,
        {
          hostOrCount: o.isFolder ? "浏览器文件夹" : o.url || "",
          note: o.url && e?.bookmarkImportState?.remarks?.[o.url] || "",
          launcherGroups: a
        }
      );
    }
    function B(n) {
      if (!n) return "";
      try {
        return new URL(n).hostname.replace(/^www\./, "");
      } catch {
        return n;
      }
    }
    function F(n) {
      if (!n) return "assets/default-favicon.svg";
      const o = globalThis.chrome;
      return o?.runtime?.id ? `chrome-extension://${o.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(n)}&size=32` : "assets/default-favicon.svg";
    }
    function M(n) {
      const o = n.target;
      o && (o.src = "assets/default-favicon.svg");
    }
    function R(n) {
      const o = typeof window < "u" ? window : null, e = o?.launcherState?.activePage || "常用网站";
      o?.LogicWeaverBookmarksService?.saveBookmarkToLauncher && o.LogicWeaverBookmarksService.saveBookmarkToLauncher(e);
    }
    return (n, o) => (l(), i("aside", {
      id: "bookmark-panel",
      class: y(["bookmark-panel", {
        open: c(s).open,
        pinned: c(s).pinned
      }]),
      style: g(S.value),
      "aria-label": "浏览器书签"
    }, [
      t("section", Y, [
        t("header", null, [
          t("div", null, [
            t("h2", null, k(c(s).title), 1),
            t("p", {
              id: "bookmark-feedback",
              class: y({ error: c(s).feedbackError }),
              hidden: !c(s).feedbackVisible
            }, k(c(s).feedbackText), 11, q)
          ]),
          t("button", {
            id: "bookmark-pin",
            type: "button",
            "aria-pressed": c(s).pinned ? "true" : "false",
            title: c(s).pinned ? "取消固定（取消后点击页面空白处会自动收起）" : "固定书签窗口，不因点击页面其他位置而消失",
            onClick: E
          }, "📌", 8, D),
          t("button", {
            id: "bookmark-close",
            type: "button",
            title: "收起",
            onClick: P
          }, "✕")
        ]),
        o[6] || (o[6] = t("nav", {
          id: "bookmark-page-tabs",
          class: "bookmark-page-tabs",
          "aria-label": "书签页面",
          hidden: ""
        }, null, -1)),
        t("div", G, [
          c(s).items.length ? (l(), i("div", H, [
            (l(!0), i(f, null, C(c(s).items, (e) => (l(), i(f, {
              key: e.id
            }, [
              e.isFolder ? (l(), i("div", {
                key: 0,
                class: y(["bookmark-tree-folder", { expanded: e.expanded }]),
                "data-bookmark-folder-id": e.id
              }, [
                t("button", {
                  type: "button",
                  class: "bookmark-folder-row",
                  style: g({ paddingLeft: e.level ? e.level * 16 + 12 + "px" : void 0 }),
                  title: `打开书签文件夹：${e.title || "未命名"}`,
                  onMouseenter: (a) => b(0, e, a),
                  onMouseleave: w,
                  onClick: (a) => b(0, e, a),
                  onContextmenu: h((a) => _(a, e), ["prevent"])
                }, [
                  o[2] || (o[2] = t("span", {
                    class: "bookmark-folder-icon",
                    "aria-hidden": "true"
                  }, "📁", -1)),
                  t("span", J, k(e.title || "未命名"), 1),
                  o[3] || (o[3] = t("span", {
                    class: "bookmark-folder-arrow",
                    "aria-hidden": "true"
                  }, "›", -1))
                ], 44, j)
              ], 10, N)) : (l(), i("article", {
                key: 1,
                class: "bookmark-import-item",
                style: g({ paddingLeft: e.level ? e.level * 16 + 12 + "px" : void 0 }),
                "data-bookmark-id": e.id,
                title: `${e.title}
${e.url}`,
                onClick: (a) => x(e),
                onContextmenu: h((a) => _(a, e), ["prevent"])
              }, [
                t("img", {
                  src: F(e.url),
                  alt: "",
                  loading: "lazy",
                  onError: o[0] || (o[0] = (a) => M(a))
                }, null, 40, Q),
                t("div", Z, [
                  t("span", I, k(e.title || e.url || "未命名书签"), 1),
                  t("span", oo, k(B(e.url)), 1)
                ]),
                t("button", {
                  type: "button",
                  class: "bookmark-import-add",
                  title: "添加到快捷方式",
                  onClick: h((a) => R(), ["stop"])
                }, "＋", 8, eo)
              ], 44, K))
            ], 64))), 128))
          ])) : (l(), i("p", to, k(c(s).emptyText || "书签栏为空"), 1))
        ]),
        (l(!0), i(f, null, C(m.value, (e, a) => (l(), i("aside", {
          key: e.folderId,
          class: "bookmark-flyout-subpanel",
          style: g({
            top: `${e.top}px`,
            left: `calc(100% + ${8 + a * 286}px)`
          }),
          onMouseenter: L,
          onMouseleave: w
        }, [
          t("div", no, [
            e.items.length ? (l(!0), i(f, { key: 0 }, C(e.items, (r) => (l(), i(f, {
              key: r.id
            }, [
              r.isFolder ? (l(), i("div", ro, [
                t("button", {
                  type: "button",
                  class: "bookmark-folder-row",
                  onMouseenter: (d) => b(a + 1, r, d),
                  onClick: (d) => b(a + 1, r, d),
                  onContextmenu: h((d) => _(d, r), ["prevent"])
                }, [
                  o[4] || (o[4] = t("span", {
                    class: "bookmark-folder-icon",
                    "aria-hidden": "true"
                  }, "📁", -1)),
                  t("span", so, k(r.title || "未命名"), 1),
                  o[5] || (o[5] = t("span", {
                    class: "bookmark-folder-arrow",
                    "aria-hidden": "true"
                  }, "›", -1))
                ], 40, ao)
              ])) : (l(), i("article", {
                key: 1,
                class: "bookmark-import-item",
                title: `${r.title}
${r.url}`,
                onClick: (d) => x(r),
                onContextmenu: h((d) => _(d, r), ["prevent"])
              }, [
                t("img", {
                  src: F(r.url),
                  alt: "",
                  loading: "lazy",
                  onError: o[1] || (o[1] = (d) => M(d))
                }, null, 40, io),
                t("div", co, [
                  t("span", ko, k(r.title || r.url || "未命名书签"), 1),
                  t("span", uo, k(B(r.url)), 1)
                ])
              ], 40, lo))
            ], 64))), 128)) : (l(), i("p", po, "该文件夹为空"))
          ])
        ], 36))), 128))
      ])
    ], 6));
  }
}), go = /* @__PURE__ */ X(mo, [["__scopeId", "data-v-21d46a0f"]]);
export {
  go as default
};
