import { e as O, w as D, d as T } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BiNio4cP.js";
import { b as R } from "./read-session-DQk1qcgF.js";
import { d as x, y as S, D as P, M as I, o as f, f as y, u as b, g as e, t as _, h as C, C as V, b as g, x as N, H as A, E as j } from "./vendor-vue-wIH4jcna.js";
import { _ as $ } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { c as H, s as K } from "./cache-directory-CPgWN97W.js";
const W = ["aria-busy"], G = {
  key: 0,
  class: "library-folder-row"
}, J = { class: "library-folder-info" }, Q = { class: "library-folder-summary" }, X = ["title"], Y = {
  key: 0,
  class: "hint"
}, Z = {
  key: 1,
  class: "hint"
}, ee = {
  key: 2,
  class: "hint"
}, te = {
  key: 3,
  class: "hint"
}, ae = { class: "library-main-actions" }, se = ["disabled"], ie = ["disabled"], oe = ["disabled"], ne = {
  key: 1,
  class: "library-empty"
}, re = { class: "hint" }, le = ["disabled"], ce = {
  key: 0,
  class: "hint"
}, de = {
  key: 2,
  class: "library-advanced"
}, ue = { class: "library-actions" }, ve = ["disabled"], be = ["disabled"], fe = ["disabled"], ye = ["disabled"], pe = /* @__PURE__ */ x({
  __name: "StickerLibrarySettings",
  props: {
    active: { type: Boolean }
  },
  setup(k) {
    const s = k, c = T();
    let o = !0;
    const t = new O(c, () => o && s.active && !document.hidden, D, 0);
    t.isBoardPaging = !1;
    const a = c.state, n = g(!1), r = g(""), d = g(!1), m = g(null), u = N(() => !s.active || n.value || a.loading), B = N(() => a.storageKind === "directory" && !!a.rootName);
    t.onToast = (p, i) => {
      o && (r.value = p, d.value = i);
    };
    async function l(p, i = !0) {
      if (!(!o || u.value)) {
        n.value = !0, r.value = "", d.value = !1;
        try {
          i ? await D(p) : await p();
        } catch (h) {
          o && h?.name !== "AbortError" && (r.value = h?.message || "操作未确认，请重读核对", d.value = !0);
        } finally {
          o && (n.value = !1);
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
        await R.confirm({ title: "显示旧版隐藏图片", message: "仅清除旧版图片隐藏标记；只显示磁盘上仍存在的原图，不能恢复已经删除的文件。是否继续？", danger: !1 }) && (!o || !s.active || (await t.revealHiddenImages(), r.value = "已清除移除标记；磁盘上仍可读取的图片会重新显示。"));
      });
    }
    function F() {
      l(async () => {
        const p = await t.exportIndexBackup();
        if (!o || !s.active) return;
        const i = new Blob([p], { type: "application/json" }), h = URL.createObjectURL(i), w = document.createElement("a");
        w.href = h, w.download = "sticker-library-index.json", w.click(), setTimeout(() => URL.revokeObjectURL(h), 1e3), r.value = "索引备份已交给浏览器保存；不包含原图或目录权限，请单独备份原图。", d.value = !1;
      });
    }
    async function M(p) {
      const i = p.target, h = i.files?.[0];
      if (i.value = "", !(!h || n.value || !s.active)) {
        if (h.size > 8 * 1024 * 1024) {
          r.value = "索引备份不能超过8MB", d.value = !0;
          return;
        }
        await l(async () => {
          const w = await h.text();
          if (!await R.confirm({
            title: "恢复图库分类索引",
            danger: !0,
            message: "将替换当前图库的分类与移除标记。仅按相对路径、文件大小及修改时间匹配，不保证内容相同或自动识别外部改名；未匹配记录保留为失联索引。请先导出当前索引备份。原图不移动、不删除，是否继续？"
          }) || !o || !s.active) return;
          await t.loadLibrary();
          const E = await t.restoreIndexBackup(w);
          r.value = `索引已恢复：匹配 ${E.matched} 张，${E.unmatched} 条未匹配。未匹配不代表原图已删除。`;
        });
      }
    }
    function L() {
      document.hidden ? t.pauseReads() : s.active && t.activate();
    }
    return S(() => s.active, (p) => {
      p ? t.activate() : t.pauseReads();
    }), P(() => {
      t.init(), document.addEventListener("visibilitychange", L);
    }), I(() => {
      o = !1, t.dispose(), document.removeEventListener("visibilitychange", L);
    }), (p, i) => (f(), y("div", {
      class: "settings-subgroup library-settings",
      "aria-busy": n.value || b(a).loading
    }, [
      B.value ? (f(), y("div", G, [
        e("div", J, [
          i[1] || (i[1] = e("span", { class: "hint" }, "图片文件夹", -1)),
          e("div", Q, [
            e("strong", {
              title: b(a).rootName
            }, _(b(a).rootName), 9, X),
            b(a).loading ? (f(), y("span", Y, "正在读取…")) : b(a).needsReadPermission ? (f(), y("span", Z, "需要重新授权")) : b(a).libraryImageCount !== null ? (f(), y("span", ee, _(b(a).libraryImageCount) + " 张图片", 1)) : (f(), y("span", te, "数量未读取"))
          ])
        ]),
        e("div", ae, [
          b(a).needsReadPermission ? (f(), y("button", {
            key: 0,
            type: "button",
            class: "btn-secondary",
            disabled: u.value,
            onClick: U
          }, "重新授权", 8, se)) : C("", !0),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: u.value,
            onClick: v
          }, "更换文件夹", 8, ie),
          e("button", {
            type: "button",
            class: "library-refresh",
            "aria-label": "刷新图片列表",
            title: "刷新图片列表",
            disabled: u.value,
            onClick: z
          }, "↻", 8, oe)
        ])
      ])) : (f(), y("div", ne, [
        e("p", re, _(b(a).loading ? "正在读取图片文件夹…" : "选择表情包使用的图片文件夹，原图保留在磁盘中。"), 1),
        e("button", {
          type: "button",
          class: "btn-secondary",
          disabled: u.value,
          onClick: v
        }, "选择图片文件夹", 8, le),
        b(a).storageKind === "indexeddb" && b(a).libraryImageCount ? (f(), y("p", ce, "当前使用浏览器内置图片库，共 " + _(b(a).libraryImageCount) + " 张；选择文件夹不会搬动这些图片。", 1)) : C("", !0)
      ])),
      B.value ? (f(), y("details", de, [
        i[2] || (i[2] = e("summary", null, "高级管理", -1)),
        e("div", ue, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: u.value,
            onClick: F
          }, "导出分类索引", 8, ve),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: u.value || !b(a).hasFolder,
            onClick: i[0] || (i[0] = (h) => m.value?.click())
          }, "恢复分类索引", 8, be),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: u.value || !b(a).hasFolder,
            onClick: q
          }, "显示旧版隐藏图片", 8, fe)
        ]),
        i[3] || (i[3] = e("p", { class: "hint" }, "索引备份只保存分类关系，不包含原图。恢复会替换当前分类，操作前仍需确认。", -1)),
        i[4] || (i[4] = e("p", { class: "hint" }, "添加或删除图片时才会按需申请写权限；删除会移除磁盘原图，通常不进回收站。", -1)),
        i[5] || (i[5] = e("p", { class: "hint" }, "“显示旧版隐藏图片”只显示磁盘上仍存在的图片，不能恢复已经删除的文件。", -1))
      ])) : C("", !0),
      e("input", {
        ref_key: "restoreInput",
        ref: m,
        type: "file",
        accept: "application/json,.json",
        disabled: u.value,
        hidden: "",
        onChange: M
      }, null, 40, ye),
      r.value ? (f(), y("p", {
        key: 3,
        class: V(["hint", { "library-error": d.value }]),
        role: "status"
      }, _(r.value), 3)) : C("", !0)
    ], 8, W));
  }
}), ge = /* @__PURE__ */ $(pe, [["__scopeId", "data-v-bbe6c74d"]]), me = ["aria-busy"], he = { class: "field full-width" }, _e = { class: "cache-directory-name" }, ke = { class: "cache-directory-actions" }, we = ["disabled"], Ce = ["disabled"], Be = /* @__PURE__ */ x({
  __name: "BiliSettingsPanel",
  props: {
    active: { type: Boolean }
  },
  setup(k) {
    const s = k, c = g(!1), o = g(!1), t = g(""), a = g(!1), n = g(null), r = g("尚未选择缓存目录");
    let d = !0, m = 0;
    async function u() {
      if (!s.active || c.value) return;
      const l = ++m;
      o.value = !0;
      try {
        const v = await H();
        if (!d || l !== m) return;
        n.value = v, r.value = v?.name || "尚未选择缓存目录";
      } catch {
        d && l === m && (n.value = null, r.value = "缓存目录读取失败，请重试");
      } finally {
        d && l === m && (o.value = !1);
      }
    }
    async function B() {
      if (c.value || !s.active) return;
      const l = window.showDirectoryPicker;
      if (typeof l != "function") {
        t.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。", a.value = !0;
        return;
      }
      ++m, o.value = !1, c.value = !0, t.value = "";
      try {
        const v = await l.call(window, {
          id: "logicweaver-bili-cache",
          mode: "readwrite",
          startIn: n.value || "videos"
        });
        if (await K(v), !d) return;
        n.value = v, r.value = v.name, a.value = !1, t.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
      } catch (v) {
        d && v?.name !== "AbortError" && (a.value = !0, t.value = "目录选择或保存未确认，请重读目录核对后再试。");
      } finally {
        d && (c.value = !1);
      }
    }
    return S(() => s.active, (l) => {
      l ? u() : ++m;
    }, { immediate: !0 }), P(() => window.addEventListener("focus", u)), I(() => {
      d = !1, ++m, window.removeEventListener("focus", u);
    }), (l, v) => (f(), y("div", {
      class: "settings-subgroup bili-cache-settings",
      "aria-busy": c.value || o.value
    }, [
      e("div", he, [
        e("p", _e, _(o.value ? "正在读取缓存目录…" : r.value), 1),
        e("div", ke, [
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !s.active || c.value || o.value,
            onClick: B
          }, _(c.value ? "正在保存…" : "选择或重新授权目录"), 9, we),
          e("button", {
            type: "button",
            class: "btn-secondary",
            disabled: !s.active || c.value || o.value,
            onClick: u
          }, "重读目录", 8, Ce)
        ]),
        v[0] || (v[0] = e("p", { class: "hint" }, "仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。", -1)),
        t.value ? (f(), y("p", {
          key: 0,
          class: V(["hint cache-directory-message", { "is-error": a.value }]),
          role: "status"
        }, _(t.value), 3)) : C("", !0)
      ])
    ], 8, me));
  }
}), xe = /* @__PURE__ */ $(Be, [["__scopeId", "data-v-d83d211c"]]), Se = {
  class: "storage-group",
  "aria-labelledby": "storage-stickers-title"
}, Ie = {
  class: "storage-group",
  "aria-labelledby": "storage-bili-title"
}, $e = /* @__PURE__ */ x({
  __name: "StorageSettings",
  props: {
    active: { type: Boolean },
    target: {},
    request: {}
  },
  setup(k) {
    const s = k, c = g(null);
    let o = !0, t = 0;
    return S(() => [s.active, s.target, s.request], async () => {
      const a = ++t;
      if (!s.active || !s.target) return;
      const n = s.target;
      if (await A(), !o || !s.active || a !== t) return;
      const r = c.value?.querySelector(`[data-storage-target="${n}"]`);
      r?.scrollIntoView({ block: "nearest" }), r?.focus({ preventScroll: !0 });
    }, { immediate: !0, flush: "post" }), I(() => {
      o = !1, ++t;
    }), (a, n) => (f(), y("div", {
      ref_key: "root",
      ref: c,
      class: "storage-settings"
    }, [
      n[2] || (n[2] = e("p", { class: "hint storage-note" }, "目录选择立即生效，不用再点底部保存。浏览器只提供文件夹名称，不提供完整磁盘路径。", -1)),
      e("section", Se, [
        n[0] || (n[0] = e("h3", {
          id: "storage-stickers-title",
          "data-storage-target": "stickers",
          tabindex: "-1"
        }, "表情包图片文件夹", -1)),
        j(ge, {
          active: s.active
        }, null, 8, ["active"])
      ]),
      e("section", Ie, [
        n[1] || (n[1] = e("h3", {
          id: "storage-bili-title",
          "data-storage-target": "bili-cache",
          tabindex: "-1"
        }, "B站视频缓存目录", -1)),
        j(xe, {
          active: s.active
        }, null, 8, ["active"])
      ])
    ], 512));
  }
}), Pe = /* @__PURE__ */ $($e, [["__scopeId", "data-v-39179fd2"]]);
export {
  Pe as default
};
