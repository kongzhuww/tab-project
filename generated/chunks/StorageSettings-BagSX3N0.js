import { e as A, w as R, d as K } from "./stickers.service-CM18JWYX.js";
import { a as N } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-YyXyKV6C.js";
import { d as $, w as x, D as V, L as I, o as b, g as f, u as r, h as e, t as h, i as C, C as T, b as _, y as j, G as M, s as P } from "./vendor-vue-D8gPZiit.js";
import { _ as L, t as S } from "./_plugin-vue_export-helper-CHsDq6Yy.js";
import { c as G, s as H } from "./cache-directory-CPgWN97W.js";
const W = ["aria-busy"], J = {
  key: 0,
  class: "library-folder-row"
}, Q = { class: "library-folder-info" }, X = { class: "library-folder-summary" }, Y = ["title"], Z = {
  key: 0,
  class: "hint"
}, ee = {
  key: 1,
  class: "hint"
}, te = {
  key: 2,
  class: "hint"
}, ae = {
  key: 3,
  class: "hint"
}, se = { class: "library-main-actions" }, ie = ["disabled"], oe = ["disabled"], ne = ["disabled"], re = {
  key: 1,
  class: "library-empty"
}, le = { class: "hint" }, ce = ["disabled"], de = {
  key: 0,
  class: "hint"
}, ue = {
  key: 2,
  class: "library-advanced"
}, ve = { class: "library-actions" }, be = ["disabled"], fe = ["disabled"], ye = ["disabled"], pe = ["disabled"], _e = /* @__PURE__ */ $({
  __name: "StickerLibrarySettings",
  props: {
    active: { type: Boolean }
  },
  setup(k) {
    const s = k, c = K();
    let o = !0;
    const t = new A(c, () => o && s.active && !document.hidden, R, 0);
    t.isBoardPaging = !1;
    const a = c.state, y = _(!1), n = _(""), d = _(!1), g = _(null), u = j(() => !s.active || y.value || a.loading), B = j(() => a.storageKind === "directory" && !!a.rootName);
    t.onToast = (p, i) => {
      o && (n.value = p, d.value = i);
    };
    async function l(p, i = !0) {
      if (!(!o || u.value)) {
        y.value = !0, n.value = "", d.value = !1;
        try {
          i ? await R(p) : await p();
        } catch (m) {
          o && m?.name !== "AbortError" && (n.value = m?.message || "操作未确认，请重读核对", d.value = !0);
        } finally {
          o && (y.value = !1);
        }
      }
    }
    function v() {
      l(() => t.chooseRootFolder());
    }
    function U() {
      l(() => t.authorizeOrChooseRoot());
    }
    function z() {
      l(() => t.loadLibrary(), !1);
    }
    function q() {
      l(async () => {
        await N.confirm({ title: "显示旧版隐藏图片", message: "仅清除旧版图片隐藏标记；只显示磁盘上仍存在的原图，不能恢复已经删除的文件。是否继续？", danger: !1 }) && (!o || !s.active || (await t.revealHiddenImages(), n.value = "已清除移除标记；磁盘上仍可读取的图片会重新显示。"));
      });
    }
    function F() {
      l(async () => {
        const p = await t.exportIndexBackup();
        if (!o || !s.active) return;
        const i = new Blob([p], { type: "application/json" }), m = URL.createObjectURL(i), w = document.createElement("a");
        w.href = m, w.download = "sticker-library-index.json", w.click(), setTimeout(() => URL.revokeObjectURL(m), 1e3), n.value = "索引备份已交给浏览器保存；不包含原图或目录权限，请单独备份原图。", d.value = !1;
      });
    }
    async function O(p) {
      const i = p.target, m = i.files?.[0];
      if (i.value = "", !(!m || y.value || !s.active)) {
        if (m.size > 8 * 1024 * 1024) {
          n.value = "索引备份不能超过8MB", d.value = !0;
          return;
        }
        await l(async () => {
          const w = await m.text();
          if (!await N.confirm({
            title: "恢复图库分类索引",
            danger: !0,
            message: "将替换当前图库的分类与移除标记。仅按相对路径、文件大小及修改时间匹配，不保证内容相同或自动识别外部改名；未匹配记录保留为失联索引。请先导出当前索引备份。原图不移动、不删除，是否继续？"
          }) || !o || !s.active) return;
          await t.loadLibrary();
          const E = await t.restoreIndexBackup(w);
          n.value = `索引已恢复：匹配 ${E.matched} 张，${E.unmatched} 条未匹配。未匹配不代表原图已删除。`;
        });
      }
    }
    function D() {
      document.hidden ? t.pauseReads() : s.active && t.activate();
    }
    return x(() => s.active, (p) => {
      p ? t.activate() : t.pauseReads();
    }), V(() => {
      t.init(), document.addEventListener("visibilitychange", D);
    }), I(() => {
      o = !1, t.dispose(), document.removeEventListener("visibilitychange", D);
    }), (p, i) => (b(), f("div", {
      class: "settings-subgroup library-settings",
      "aria-busy": y.value || r(a).loading
    }, [
      B.value ? (b(), f("div", J, [
        e("div", Q, [
          i[1] || (i[1] = e("span", { class: "hint" }, "图片文件夹", -1)),
          e("div", X, [
            e("strong", {
              title: r(a).rootName
            }, h(r(a).rootName), 9, Y),
            r(a).loading ? (b(), f("span", Z, "正在读取…")) : r(a).needsReadPermission ? (b(), f("span", ee, "需要重新授权")) : r(a).libraryImageCount !== null ? (b(), f("span", te, h(r(a).libraryImageCount) + " 张图片", 1)) : (b(), f("span", ae, "数量未读取"))
          ])
        ]),
        e("div", se, [
          r(a).needsReadPermission ? (b(), f("button", {
            key: 0,
            type: "button",
            class: "btn-secondary",
            disabled: u.value,
            onClick: U
          }, "重新授权", 8, ie)) : C("", !0),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: u.value,
            onClick: v
          }, "更换文件夹", 8, oe),
          e("button", {
            type: "button",
            class: "library-refresh",
            "aria-label": "刷新图片列表",
            title: "刷新图片列表",
            disabled: u.value,
            onClick: z
          }, "↻", 8, ne)
        ])
      ])) : (b(), f("div", re, [
        e("p", le, h(r(a).loading ? "正在读取图片文件夹…" : "选择表情包使用的图片文件夹，原图保留在磁盘中。"), 1),
        e("button", {
          type: "button",
          class: "btn-secondary",
          disabled: u.value,
          onClick: v
        }, "选择图片文件夹", 8, ce),
        r(a).storageKind === "indexeddb" && r(a).libraryImageCount ? (b(), f("p", de, "当前使用浏览器内置图片库，共 " + h(r(a).libraryImageCount) + " 张；选择文件夹不会搬动这些图片。", 1)) : C("", !0)
      ])),
      B.value ? (b(), f("details", ue, [
        i[2] || (i[2] = e("summary", null, "高级管理", -1)),
        e("div", ve, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: u.value,
            onClick: F
          }, "导出分类索引", 8, be),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: u.value || !r(a).hasFolder,
            onClick: i[0] || (i[0] = (m) => g.value?.click())
          }, "恢复分类索引", 8, fe),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: u.value || !r(a).hasFolder,
            onClick: q
          }, "显示旧版隐藏图片", 8, ye)
        ]),
        i[3] || (i[3] = e("p", { class: "hint" }, "索引备份只保存分类关系，不包含原图。恢复会替换当前分类，操作前仍需确认。", -1)),
        i[4] || (i[4] = e("p", { class: "hint" }, "添加或删除图片时才会按需申请写权限；删除会移除磁盘原图，通常不进回收站。", -1)),
        i[5] || (i[5] = e("p", { class: "hint" }, "“显示旧版隐藏图片”只显示磁盘上仍存在的图片，不能恢复已经删除的文件。", -1))
      ])) : C("", !0),
      e("input", {
        ref_key: "restoreInput",
        ref: g,
        type: "file",
        accept: "application/json,.json",
        disabled: u.value,
        hidden: "",
        onChange: O
      }, null, 40, pe),
      n.value ? (b(), f("p", {
        key: 3,
        class: T(["hint", { "library-error": d.value }]),
        role: "status"
      }, h(n.value), 3)) : C("", !0)
    ], 8, W));
  }
}), he = /* @__PURE__ */ L(_e, [["__scopeId", "data-v-bbe6c74d"]]), ge = ["aria-busy"], me = { class: "field full-width" }, ke = { class: "cache-directory-name" }, we = { class: "cache-directory-actions" }, Ce = ["disabled"], Be = ["disabled"], Se = /* @__PURE__ */ $({
  __name: "BiliSettingsPanel",
  props: {
    active: { type: Boolean }
  },
  setup(k) {
    const s = k, c = _(!1), o = _(!1), t = _(""), a = _(!1), y = _(null), n = _("尚未选择缓存目录");
    let d = !0, g = 0;
    async function u() {
      if (!s.active || c.value) return;
      const l = ++g;
      o.value = !0;
      try {
        const v = await G();
        if (!d || l !== g) return;
        y.value = v, n.value = v?.name || "尚未选择缓存目录";
      } catch {
        d && l === g && (y.value = null, n.value = "缓存目录读取失败，请重试");
      } finally {
        d && l === g && (o.value = !1);
      }
    }
    async function B() {
      if (c.value || !s.active) return;
      const l = window.showDirectoryPicker;
      if (typeof l != "function") {
        t.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。", a.value = !0;
        return;
      }
      ++g, o.value = !1, c.value = !0, t.value = "";
      try {
        const v = await l.call(window, {
          id: "logicweaver-bili-cache",
          mode: "readwrite",
          startIn: y.value || "videos"
        });
        if (await H(v), !d) return;
        y.value = v, n.value = v.name, a.value = !1, t.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
      } catch (v) {
        d && v?.name !== "AbortError" && (a.value = !0, t.value = "目录选择或保存未确认，请重读目录核对后再试。");
      } finally {
        d && (c.value = !1);
      }
    }
    return x(() => s.active, (l) => {
      l ? u() : ++g;
    }, { immediate: !0 }), V(() => window.addEventListener("focus", u)), I(() => {
      d = !1, ++g, window.removeEventListener("focus", u);
    }), (l, v) => (b(), f("div", {
      class: "settings-subgroup bili-cache-settings",
      "aria-busy": c.value || o.value
    }, [
      e("div", me, [
        e("p", ke, h(o.value ? "正在读取缓存目录…" : n.value), 1),
        e("div", we, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !s.active || c.value || o.value,
            onClick: B
          }, h(c.value ? "正在保存…" : "选择或重新授权目录"), 9, Ce),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !s.active || c.value || o.value,
            onClick: u
          }, "重读目录", 8, Be)
        ]),
        v[0] || (v[0] = e("p", { class: "hint" }, "仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。", -1)),
        t.value ? (b(), f("p", {
          key: 0,
          class: T(["hint cache-directory-message", { "is-error": a.value }]),
          role: "status"
        }, h(t.value), 3)) : C("", !0)
      ])
    ], 8, ge));
  }
}), $e = /* @__PURE__ */ L(Se, [["__scopeId", "data-v-d83d211c"]]), xe = { class: "hint storage-note" }, Ie = {
  class: "storage-group",
  "aria-labelledby": "storage-stickers-title"
}, Le = {
  id: "storage-stickers-title",
  "data-storage-target": "stickers",
  tabindex: "-1"
}, De = {
  class: "storage-group",
  "aria-labelledby": "storage-bili-title"
}, Ee = {
  id: "storage-bili-title",
  "data-storage-target": "bili-cache",
  tabindex: "-1"
}, Re = /* @__PURE__ */ $({
  __name: "StorageSettings",
  props: {
    active: { type: Boolean },
    target: {},
    request: {}
  },
  setup(k) {
    const s = k, c = _(null);
    let o = !0, t = 0;
    return x(() => [s.active, s.target, s.request], async () => {
      const a = ++t;
      if (!s.active || !s.target) return;
      const y = s.target;
      if (await M(), !o || !s.active || a !== t) return;
      const n = c.value?.querySelector(`[data-storage-target="${y}"]`);
      n?.scrollIntoView({ block: "nearest" }), n?.focus({ preventScroll: !0 });
    }, { immediate: !0, flush: "post" }), I(() => {
      o = !1, ++t;
    }), (a, y) => (b(), f("div", {
      ref_key: "root",
      ref: c,
      class: "storage-settings"
    }, [
      e("p", xe, h(r(S)("storage.note")), 1),
      e("section", Ie, [
        e("h3", Le, h(r(S)("storage.stickersTitle")), 1),
        P(he, {
          active: s.active
        }, null, 8, ["active"])
      ]),
      e("section", De, [
        e("h3", Ee, h(r(S)("storage.biliCacheTitle")), 1),
        P($e, {
          active: s.active
        }, null, 8, ["active"])
      ])
    ], 512));
  }
}), ze = /* @__PURE__ */ L(Re, [["__scopeId", "data-v-327b909a"]]);
export {
  ze as default
};
