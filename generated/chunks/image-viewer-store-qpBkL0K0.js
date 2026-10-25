import { n as l } from "./search.service-CzxjlNxM.js";
import { r as m, a as p } from "./vendor-vue-CjOHdfe5.js";
const e = m({
  isOpen: !1,
  src: "",
  alt: "",
  zoom: 1,
  naturalWidth: 0,
  naturalHeight: 0
}), w = p(e);
let i = "", a = 0;
function c() {
  i && URL.revokeObjectURL(i), i = "";
}
const f = {
  state: e,
  open(t, o = "图片预览") {
    if (!t) return null;
    const r = t instanceof Blob ? URL.createObjectURL(t) : "", n = ++a;
    return c(), i = r, e.src = typeof t == "string" ? t : i, e.alt = o || "图片预览", e.zoom = 1, e.naturalWidth = 0, e.naturalHeight = 0, e.isOpen = !0, Object.freeze({ close() {
      n === a && f.close();
    } });
  },
  close() {
    ++a, e.isOpen = !1, e.src = "", e.alt = "", e.naturalWidth = 0, e.naturalHeight = 0, c();
  },
  setDimensions(t, o) {
    e.naturalWidth = t, e.naturalHeight = o;
  },
  setZoom(t) {
    e.zoom = Math.max(0.2, Math.min(4, Number(t.toFixed(2))));
  },
  zoomIn() {
    this.setZoom(e.zoom + 0.2);
  },
  zoomOut() {
    this.setZoom(e.zoom - 0.2);
  },
  resetZoom() {
    e.zoom = 1;
  },
  async copyImage() {
    if (!e.isOpen || !e.src) return;
    const t = e.src, o = a, r = () => e.isOpen && a === o;
    try {
      const n = await fetch(t, { signal: AbortSignal.timeout(15e3) });
      if (!n.ok) throw new Error("Image read failed");
      const s = await n.blob();
      if (!r() || (await navigator.clipboard.write([
        new ClipboardItem({ [s.type]: s })
      ]), !r())) return;
      l.show({
        title: "已复制",
        message: "图片已成功复制到剪贴板",
        appType: "fetch",
        appName: "图片查看器",
        showActions: !1
      });
    } catch {
      if (!r()) return;
      l.show({
        title: "图片复制未确认",
        message: "图片格式或剪贴板权限不支持本次操作，未自动改为复制链接。",
        appType: "fetch",
        appName: "图片查看器",
        showActions: !1
      });
    }
  },
  openOriginal() {
    e.src && (typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: e.src, active: !0 }) : window.open(e.src, "_blank"));
  }
};
export {
  w as a,
  f as i
};
