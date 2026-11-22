import { o as E, e as h, b as p, s as b } from "./vendor-vue-_upDT3S_.js";
const y = "tab-project-workspace-wallpapers", i = "wallpapers", f = "workspace-wallpaper-changed", g = "workspaceWallpaperRevision:", L = 20 * 1024 * 1024;
function k() {
  return new Promise((o, r) => {
    const n = indexedDB.open(y, 1);
    n.onupgradeneeded = () => n.result.createObjectStore(i), n.onsuccess = () => o(n.result), n.onerror = () => r(n.error || new Error("无法打开壁纸存储"));
  });
}
async function R(o) {
  const r = await k();
  try {
    return await new Promise((n, t) => {
      const a = r.transaction(i, "readonly").objectStore(i).get(o);
      a.onsuccess = () => n(a.result || { enabled: !1, image: null, name: "" }), a.onerror = () => t(a.error || new Error("读取背景失败"));
    });
  } finally {
    r.close();
  }
}
async function P(o, r) {
  if (r.image && (!r.image.type.startsWith("image/") || r.image.size > L))
    throw new Error("请选择不超过 20 MB 的图片。");
  const n = await k();
  try {
    await new Promise((t, a) => {
      const s = n.transaction(i, "readwrite"), l = s.objectStore(i), u = l.get(o);
      u.onsuccess = () => {
        const d = u.result || { enabled: !1, image: null, name: "" };
        l.put({ ...d, ...r }, o);
      }, s.oncomplete = () => t(), s.onerror = () => a(s.error || new Error("保存背景失败")), s.onabort = () => a(s.error || new Error("保存背景失败"));
    });
  } finally {
    n.close();
  }
  window.dispatchEvent(new CustomEvent(f, { detail: o })), typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [g + o]: `${Date.now()}-${Math.random()}` }).catch(() => {
  });
}
function O(o) {
  const r = p({ enabled: !1, image: null, name: "" }), n = p(""), t = p("");
  let a = 0;
  async function s() {
    const e = ++a;
    try {
      const c = await R(o);
      if (e !== a) return;
      const m = t.value;
      r.value = c;
      const v = c.selection?.blob || c.image;
      t.value = c.enabled && v ? URL.createObjectURL(v) : "", m && URL.revokeObjectURL(m), n.value = "";
    } catch {
      e === a && (n.value = "背景读取失败");
    }
  }
  const l = b(() => {
    if (!r.value.enabled) return null;
    const e = r.value.selection;
    if (!e) return t.value ? { kind: "image", src: t.value } : null;
    if (e.kind === "web") return e.pack ? { kind: "web", pack: e.pack } : null;
    if (e.kind === "css") return e.background ? { kind: "css", background: e.background } : null;
    const c = t.value || e.src;
    return c ? { kind: e.kind, src: c } : null;
  }), u = b(() => l.value ? { "--workspace-wallpaper-enabled": "1" } : void 0);
  function d(e) {
    e.detail === o && s();
  }
  function w(e, c) {
    c === "local" && e[g + o] && s();
  }
  return E(() => {
    s(), window.addEventListener(f, d), typeof chrome < "u" && chrome.storage?.onChanged?.addListener(w);
  }), h(() => {
    a++, window.removeEventListener(f, d), typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(w), t.value && URL.revokeObjectURL(t.value);
  }), { value: r, style: u, media: l, error: n, reload: s };
}
export {
  P as s,
  O as u
};
