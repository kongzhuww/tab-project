import { d as f, w as p, o as v, H as k, f as t, g as o, u as w, n as y, j as c, b as h, x as g } from "./vendor-vue-BbmU9NUg.js";
import { _ as W } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
const b = {
  key: 0,
  class: "workspace-wallpaper-layer",
  "aria-hidden": "true"
}, x = ["src"], _ = ["src"], I = ["src"], L = /* @__PURE__ */ f({
  __name: "WorkspaceWallpaperLayer",
  props: {
    media: {}
  },
  setup(a) {
    const s = a, r = h(null), m = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL("wallpaper-sandbox.html") : "wallpaper-sandbox.html", i = g(() => s.media?.kind === "web" ? s.media.pack : void 0);
    let e;
    function l() {
      i.value && r.value?.contentWindow && r.value.contentWindow.postMessage(i.value, "*");
    }
    function u() {
      e && clearInterval(e), l();
      let n = 0;
      e = setInterval(() => {
        ++n > 5 ? (clearInterval(e), e = void 0) : l();
      }, 80);
    }
    function d(n) {
      n.source === r.value?.contentWindow && (n.data?.type === "WE_SANDBOX_READY" && l(), n.data?.type === "WE_SANDBOX_ACK" && e && (clearInterval(e), e = void 0));
    }
    return p(i, () => {
      e && clearInterval(e), e = void 0, l();
    }), v(() => window.addEventListener("message", d)), k(() => {
      e && clearInterval(e), window.removeEventListener("message", d);
    }), (n, E) => a.media ? (t(), o("div", b, [
      a.media.kind === "image" ? (t(), o("img", {
        key: 0,
        src: a.media.src,
        alt: ""
      }, null, 8, x)) : a.media.kind === "video" ? (t(), o("video", {
        key: 1,
        src: a.media.src,
        autoplay: "",
        loop: "",
        muted: "",
        playsinline: ""
      }, null, 8, _)) : a.media.kind === "web" ? (t(), o("iframe", {
        key: 2,
        ref_key: "frame",
        ref: r,
        src: w(m),
        title: "工作区壁纸",
        allow: "autoplay",
        tabindex: "-1",
        onLoad: u
      }, null, 40, I)) : a.media.kind === "css" ? (t(), o("div", {
        key: 3,
        class: "workspace-wallpaper-fill",
        style: y({ background: a.media.background })
      }, null, 4)) : c("", !0)
    ])) : c("", !0);
  }
}), U = /* @__PURE__ */ W(L, [["__scopeId", "data-v-61d85c66"]]);
export {
  U as W
};
