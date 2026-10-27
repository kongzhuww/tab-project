import { d as z, o as l, e as i, f as t, t as k, u as c, B as g, F as f, h as C, i as h, A as y, b as O, s as U } from "./vendor-vue-DokqDua_.js";
import { E as W, b as u, e as V } from "./search.service-CxgDk0dD.js";
import { _ as X } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const Y = { class: "bookmark-panel-sheet" }, D = ["hidden"], G = ["aria-pressed", "title"], H = {
  id: "bookmark-import-list",
  class: "bookmark-import-list"
}, N = {
  key: 0,
  class: "bookmark-tree"
}, j = ["data-bookmark-folder-id"], q = ["title", "onMouseenter", "onClick", "onContextmenu"], J = { class: "bookmark-folder-name" }, K = ["data-bookmark-id", "title", "onClick", "onContextmenu"], Q = ["src"], Z = { class: "bookmark-import-copy" }, I = { class: "bookmark-import-title" }, oo = { class: "bookmark-import-host" }, eo = ["onClick"], to = {
  key: 1,
  class: "bookmark-import-empty"
}, no = { class: "bookmark-flyout-list" }, ao = {
  key: 0,
  class: "bookmark-tree-folder"
}, ro = ["onMouseenter", "onClick", "onContextmenu"], so = { class: "bookmark-folder-name" }, lo = ["title", "onClick", "onContextmenu"], io = ["src"], co = { class: "bookmark-import-copy" }, ko = { class: "bookmark-import-title" }, po = { class: "bookmark-import-host" }, uo = {
  key: 1,
  class: "bookmark-import-empty"
}, mo = /* @__PURE__ */ z({
  __name: "BookmarkPanel",
  setup(fo) {
    const s = W, m = O([]);
    let p;
    function b(n, o, e) {
      p && clearTimeout(p);
      const a = (typeof window < "u" ? window : null)?.LogicWeaverBookmarksService, d = a?.getChildrenOfFolder ? a.getChildrenOfFolder(o.id) : [], R = e.currentTarget, T = document.getElementById("bookmark-panel")?.getBoundingClientRect(), $ = R?.getBoundingClientRect();
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
      p && clearTimeout(p), p = setTimeout(() => {
        m.value = [];
      }, 240);
    }
    function L() {
      p && clearTimeout(p);
    }
    const S = U(() => typeof s.positionLeft == "number" ? { left: `${s.positionLeft}px` } : {});
    function E() {
      u.setPinned(!s.pinned), u.dispatch("toggle-pin", s.pinned);
    }
    function P() {
      u.close(), u.dispatch("close");
    }
    function x(n) {
      u.openBookmark(n);
    }
    function _(n, o) {
      u.openContextMenu(o, n.clientX, n.clientY);
      const e = typeof window < "u" ? window : null, r = Array.isArray(e?.launcherState?.groups) ? e.launcherState.groups.map((a) => a.name || a) : ["常用网站"];
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
          launcherGroups: r
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
    function A(n) {
      const o = typeof window < "u" ? window : null, e = o?.launcherState?.activePage || "常用网站";
      o?.LogicWeaverBookmarksService?.saveBookmarkToLauncher && o.LogicWeaverBookmarksService.saveBookmarkToLauncher(e);
    }
    return (n, o) => (l(), i("aside", {
      id: "bookmark-panel",
      class: g(["bookmark-panel", {
        open: c(s).open,
        pinned: c(s).pinned
      }]),
      style: y(S.value),
      "aria-label": "浏览器书签"
    }, [
      t("section", Y, [
        t("header", null, [
          t("div", null, [
            t("h2", null, k(c(s).title), 1),
            t("p", {
              id: "bookmark-feedback",
              class: g({ error: c(s).feedbackError }),
              hidden: !c(s).feedbackVisible
            }, k(c(s).feedbackText), 11, D)
          ]),
          t("button", {
            id: "bookmark-pin",
            type: "button",
            "aria-pressed": c(s).pinned ? "true" : "false",
            title: c(s).pinned ? "取消固定（取消后点击页面空白处会自动收起）" : "固定书签窗口，不因点击页面其他位置而消失",
            onClick: E
          }, "📌", 8, G),
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
        t("div", H, [
          c(s).items.length ? (l(), i("div", N, [
            (l(!0), i(f, null, C(c(s).items, (e) => (l(), i(f, {
              key: e.id
            }, [
              e.isFolder ? (l(), i("div", {
                key: 0,
                class: g(["bookmark-tree-folder", { expanded: e.expanded }]),
                "data-bookmark-folder-id": e.id
              }, [
                t("button", {
                  type: "button",
                  class: "bookmark-folder-row",
                  style: y({ paddingLeft: e.level ? e.level * 16 + 12 + "px" : void 0 }),
                  title: `打开书签文件夹：${e.title || "未命名"}`,
                  onMouseenter: (r) => b(0, e, r),
                  onMouseleave: w,
                  onClick: (r) => b(0, e, r),
                  onContextmenu: h((r) => _(r, e), ["prevent"])
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
                ], 44, q)
              ], 10, j)) : (l(), i("article", {
                key: 1,
                class: "bookmark-import-item",
                style: y({ paddingLeft: e.level ? e.level * 16 + 12 + "px" : void 0 }),
                "data-bookmark-id": e.id,
                title: `${e.title}
${e.url}`,
                onClick: (r) => x(e),
                onContextmenu: h((r) => _(r, e), ["prevent"])
              }, [
                t("img", {
                  src: F(e.url),
                  alt: "",
                  loading: "lazy",
                  onError: o[0] || (o[0] = (r) => M(r))
                }, null, 40, Q),
                t("div", Z, [
                  t("span", I, k(e.title || e.url || "未命名书签"), 1),
                  t("span", oo, k(B(e.url)), 1)
                ]),
                t("button", {
                  type: "button",
                  class: "bookmark-import-add",
                  title: "添加到快捷方式",
                  onClick: h((r) => A(), ["stop"])
                }, "＋", 8, eo)
              ], 44, K))
            ], 64))), 128))
          ])) : (l(), i("p", to, k(c(s).emptyText || "书签栏为空"), 1))
        ]),
        (l(!0), i(f, null, C(m.value, (e, r) => (l(), i("aside", {
          key: e.folderId,
          class: "bookmark-flyout-subpanel",
          style: y({
            top: `${e.top}px`,
            left: `calc(100% + ${8 + r * 286}px)`
          }),
          onMouseenter: L,
          onMouseleave: w
        }, [
          t("div", no, [
            e.items.length ? (l(!0), i(f, { key: 0 }, C(e.items, (a) => (l(), i(f, {
              key: a.id
            }, [
              a.isFolder ? (l(), i("div", ao, [
                t("button", {
                  type: "button",
                  class: "bookmark-folder-row",
                  onMouseenter: (d) => b(r + 1, a, d),
                  onClick: (d) => b(r + 1, a, d),
                  onContextmenu: h((d) => _(d, a), ["prevent"])
                }, [
                  o[4] || (o[4] = t("span", {
                    class: "bookmark-folder-icon",
                    "aria-hidden": "true"
                  }, "📁", -1)),
                  t("span", so, k(a.title || "未命名"), 1),
                  o[5] || (o[5] = t("span", {
                    class: "bookmark-folder-arrow",
                    "aria-hidden": "true"
                  }, "›", -1))
                ], 40, ro)
              ])) : (l(), i("article", {
                key: 1,
                class: "bookmark-import-item",
                title: `${a.title}
${a.url}`,
                onClick: (d) => x(a),
                onContextmenu: h((d) => _(d, a), ["prevent"])
              }, [
                t("img", {
                  src: F(a.url),
                  alt: "",
                  loading: "lazy",
                  onError: o[1] || (o[1] = (d) => M(d))
                }, null, 40, io),
                t("div", co, [
                  t("span", ko, k(a.title || a.url || "未命名书签"), 1),
                  t("span", po, k(B(a.url)), 1)
                ])
              ], 40, lo))
            ], 64))), 128)) : (l(), i("p", uo, "该文件夹为空"))
          ])
        ], 36))), 128))
      ])
    ], 6));
  }
}), yo = /* @__PURE__ */ X(mo, [["__scopeId", "data-v-5ad6a2d9"]]);
export {
  yo as default
};
