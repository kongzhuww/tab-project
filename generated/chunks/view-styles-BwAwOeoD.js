import { l as w } from "./search.service-CzxjlNxM.js";
import { b as O } from "./vendor-vue-CjOHdfe5.js";
const x = "leaf-newtab-backgrounds", $ = 1, d = "current-background", c = "heroBackgroundHistory", j = 30, y = "assets/newtab-mountains.png", L = 450, b = 180 * 1024 * 1024;
let W = [], g = 0;
function N(e) {
  return W.push(e), e;
}
function I() {
  W.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }), W = [];
}
function B() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const r = indexedDB.open(x, $);
    r.onupgradeneeded = () => {
      const n = r.result;
      n.objectStoreNames.contains("files") || n.createObjectStore("files");
    }, r.onsuccess = () => e(r.result), r.onerror = () => t(r.error);
  });
}
async function R(e, t = d) {
  const r = await B();
  return new Promise((n, o) => {
    const i = r.transaction("files", "readwrite");
    i.objectStore("files").put(e, t), i.oncomplete = () => {
      r.close(), n();
    }, i.onerror = () => {
      r.close(), o(i.error);
    }, i.onabort = i.onerror;
  });
}
async function U() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported"));
      return;
    }
    const r = indexedDB.open("my-newtab-background", 1);
    r.onupgradeneeded = () => {
      const n = r.result;
      n.objectStoreNames.contains("files") || n.createObjectStore("files");
    }, r.onsuccess = () => e(r.result), r.onerror = () => t(r.error);
  });
}
async function E(e = "hero") {
  try {
    const t = await U();
    return new Promise((r) => {
      const n = t.transaction("files", "readonly"), o = n.objectStore("files").get(e);
      o.onsuccess = () => {
        t.close(), r(o.result || null);
      }, o.onerror = () => {
        t.close(), r(null);
      }, n.oncomplete = () => t.close();
    });
  } catch {
    return null;
  }
}
async function k(e = d) {
  try {
    const r = await B(), n = await new Promise((o, i) => {
      const a = r.transaction("files", "readonly"), s = a.objectStore("files").get(e);
      s.onsuccess = () => o(s.result || null), a.oncomplete = () => r.close(), a.onerror = () => {
        r.close(), i(a.error);
      };
    });
    if (n) return n;
  } catch {
  }
  const t = await E(e);
  return t || (e === d ? E("hero") : null);
}
async function D(e = d) {
  const t = await B();
  return new Promise((r, n) => {
    const o = t.transaction("files", "readwrite");
    o.objectStore("files").delete(e), o.oncomplete = () => {
      t.close(), r();
    }, o.onerror = () => {
      t.close(), n(o.error);
    }, o.onabort = o.onerror;
  });
}
function m(e) {
  return new Promise((t, r) => {
    if (typeof chrome > "u" || !chrome.storage?.local?.get) {
      r(new Error("壁纸存储不可用"));
      return;
    }
    chrome.storage.local.get(e, (n) => {
      chrome.runtime?.lastError ? r(new Error("壁纸配置读取失败")) : t(n || {});
    });
  });
}
function u(e) {
  return new Promise((t, r) => {
    if (typeof chrome > "u" || !chrome.storage?.local?.set) {
      r(new Error("壁纸存储不可用"));
      return;
    }
    chrome.storage.local.set(e, () => {
      chrome.runtime?.lastError ? r(new Error("壁纸配置保存失败")) : t();
    });
  });
}
function P(e) {
  return !!(e && (/^image\//i.test(e.type || "") || /^video\//i.test(e.type || "") || /\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(e.name || "")));
}
function A(e) {
  return String(e || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
}
function C(e, t) {
  const r = String(t || "").trim().replace(/^['"]|['"]$/g, "");
  if (!r || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(r)) return "";
  const [n] = r.split(/[?#]/);
  if (!n) return "";
  const o = r.startsWith("/") ? "" : A(e).split("/").slice(0, -1).join("/"), i = `${o ? o + "/" : ""}${n.replace(/^\/+/, "")}`.split("/"), a = [];
  return i.forEach((s) => {
    !s || s === "." || (s === ".." ? a.pop() : a.push(s));
  }), a.join("/").toLowerCase();
}
function M(e, t) {
  return t.type ? t.type : /\.html?$/i.test(e) ? "text/html" : /\.css$/i.test(e) ? "text/css" : /\.m?js$/i.test(e) ? "text/javascript" : /\.png$/i.test(e) ? "image/png" : /\.jpe?g$/i.test(e) ? "image/jpeg" : /\.webp$/i.test(e) ? "image/webp" : /\.gif$/i.test(e) ? "image/gif" : /\.mp4$/i.test(e) ? "video/mp4" : /\.webm$/i.test(e) ? "video/webm" : "application/octet-stream";
}
async function T(e) {
  const t = [];
  let r = 0;
  async function n(o, i = "", a = 0) {
    if (!(a > 4 || t.length >= L || r >= b))
      for await (const s of o.values()) {
        if (t.length >= L || r >= b) break;
        const l = A(i ? `${i}/${s.name}` : s.name);
        if (s.kind === "file") {
          const p = await s.getFile();
          r += p.size || 0, r <= b && t.push({ path: l, file: p });
        } else s.kind === "directory" && await n(s, l, a + 1);
      }
  }
  return await n(e), t;
}
function _(e) {
  return e.filter((t) => /(^|\/)index\.html?$/i.test(t.path) || /\.html?$/i.test(t.path)).sort((t, r) => {
    const n = (o) => /^index\.html?$/i.test(o.path) ? 0 : /(^|\/)index\.html?$/i.test(o.path) ? 1 : 2;
    return n(t) - n(r) || t.path.length - r.path.length;
  })[0] || null;
}
function v(e, t = []) {
  return typeof e == "string" ? /\.(png|jpe?g|webp|gif|mp4|webm|html?)($|[?#])/i.test(e) && t.push(e) : Array.isArray(e) ? e.forEach((r) => v(r, t)) : e && typeof e == "object" && Object.values(e).forEach((r) => v(r, t)), t;
}
async function K(e) {
  const t = new Map(e.map((n) => [A(n.path).toLowerCase(), n])), r = e.filter((n) => /(^|\/)project\.json$/i.test(n.path));
  for (const n of r)
    try {
      const o = JSON.parse(await n.file.text());
      for (const i of v(o)) {
        const a = t.get(C(n.path, i));
        if (a && P(a.file)) return a.file;
      }
    } catch {
    }
  return null;
}
function G(e, t, r) {
  const n = r.filter((o) => !/\.(pkg|mpkg)$/i.test(o.path)).map((o) => ({ path: o.path, file: o.file, mime: M(o.path, o.file) }));
  return { type: "web", name: e || "Web Wallpaper", entry: t.path, files: n };
}
async function J(e) {
  const t = await T(e), r = _(t);
  if (r) return G(e.name, r, t);
  const n = await K(t);
  return n || t.map((i) => i.file).filter(P).sort((i, a) => {
    const s = (l) => /\.(mp4|webm)$/i.test(l.name) ? 0 : /\.gif$/i.test(l.name) ? 1 : /^preview\./i.test(l.name) ? 2 : /cover|thumb|poster/i.test(l.name) ? 3 : 4;
    return s(i) - s(a) || a.size - i.size;
  })[0] || null;
}
function F(e) {
  return e ? typeof e == "string" ? "自定义图片" : e.name || (e.type === "web" ? "Web Wallpaper" : "自定义背景") : "默认背景";
}
function H(e) {
  return typeof e == "string" ? "图片" : e?.type === "web" ? "Web Wallpaper" : e?.type === "db" ? /video/i.test(e.mediaType || "") ? "视频" : "图片/GIF" : "背景";
}
const S = {
  async loadHistory() {
    const e = await m([c, "heroBackground"]);
    return { history: Array.isArray(e[c]) ? e[c] : [], currentValue: e.heroBackground || null };
  },
  async addHistory(e, t = null) {
    const r = `bg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let n = e;
    e && typeof e == "object" && (n = { ...e, storageKey: r }), t && await R(t, r);
    const o = await m([c, "heroBackground"]), i = Array.isArray(o[c]) ? o[c] : [], s = [{
      id: r,
      title: F(n),
      kind: H(n),
      createdAt: Date.now(),
      value: n
    }, ...i.filter((p) => JSON.stringify(p.value) !== JSON.stringify(n))].slice(
      0,
      j
    ), l = i.slice(j - 1).filter((p) => p.value?.storageKey && p.value.storageKey !== o.heroBackground?.storageKey);
    return await Promise.all(l.map((p) => D(p.value.storageKey))), await u({ [c]: s }), n;
  },
  async deleteHistory(e) {
    const t = await m([c, "heroBackground"]), r = (t[c] || []).filter((n) => n.id !== e.id);
    e.value?.storageKey && await D(e.value.storageKey), await u({ [c]: r }), JSON.stringify(t.heroBackground) === JSON.stringify(e.value) && await this.clearWallpaper();
  },
  async clearWallpaper() {
    const e = { type: "none" };
    await u({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(null);
  },
  async setMountain() {
    await u({ heroBackground: y });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(y));
    } catch {
    }
    await this.applyWallpaper(y);
  },
  async setWallpaper(e) {
    await u({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(e);
  },
  async chooseBackgroundFile(e = "all") {
    return typeof document > "u" ? [] : new Promise((t, r) => {
      const n = document.createElement("input");
      n.type = "file", n.hidden = !0, n.multiple = !0, n.accept = e === "image" ? "image/*,.jpg,.jpeg,.png,.webp,.gif" : e === "video" ? "video/mp4,video/webm,.mp4,.webm" : "image/*,video/mp4,video/webm";
      const o = (s) => {
        n.removeEventListener("change", i), n.removeEventListener("cancel", a), n.remove(), t(s);
      }, i = () => o(Array.from(n.files || [])), a = () => o([]);
      n.addEventListener("change", i), n.addEventListener("cancel", a), document.body.appendChild(n);
      try {
        n.click();
      } catch (s) {
        n.remove(), r(s);
      }
    });
  },
  async importBackgroundFile(e, { apply: t = !0 } = {}) {
    if (!e) return null;
    let r, n = null;
    if (e.type === "web")
      n = e, r = { type: "web", name: e.name, entry: e.entry };
    else if (P(e))
      n = e, r = { type: "db", name: e.name, mediaType: e.type || "application/octet-stream" };
    else
      throw new Error("请选择 JPG、PNG、WebP、GIF、MP4 或 WebM 壁纸。");
    return r = await this.addHistory(r, n), t && (await u({ heroBackground: r }), await this.applyWallpaper(r)), r;
  },
  async importWallpaperDirectory() {
    const e = window;
    if (!e.showDirectoryPicker) throw new Error("当前浏览器不支持直接选择 Wallpaper 文件夹。");
    const t = await e.showDirectoryPicker(), r = await J(t);
    if (!r) throw new Error("文件夹中没有找到可用的 Web Wallpaper、图片、GIF、MP4 或 WebM。");
    return this.importBackgroundFile(r);
  },
  async applyWallpaper(e) {
    const t = ++g;
    if (typeof document > "u") return;
    const r = document.getElementById("launcher"), n = document.getElementById("hero-background-media");
    if (!(!r || !n) && (I(), n.replaceChildren(), r.style.removeProperty("--launcher-image"), !!e)) {
      if (typeof e == "string") {
        const o = typeof chrome < "u" ? chrome : null, i = e.startsWith("chrome-extension://") || e.startsWith("http") || e.startsWith("data:") ? e : o?.runtime?.getURL ? o.runtime.getURL(e) : e, a = document.createElement("img");
        a.src = i, a.alt = "", a.decoding = "async", a.fetchPriority = "high", n.appendChild(a);
        return;
      }
      if (e.type === "style") {
        const o = document.createElement("div");
        o.style.cssText = e.style || "", o.style.position = "absolute", o.style.inset = "0", n.appendChild(o);
        return;
      }
      if (e.type === "web") {
        const o = await k(e.storageKey || d);
        if (t !== g) return;
        if (o?.type === "web") {
          const i = document.createElement("iframe");
          i.title = o.name || "Web Wallpaper";
          const a = typeof chrome < "u" ? chrome : null;
          i.src = a?.runtime?.getURL ? a.runtime.getURL("wallpaper-sandbox.html") : "wallpaper-sandbox.html";
          const s = setTimeout(() => {
            t === g && i.parentNode && (console.warn("[Wallpaper] Web wallpaper timeout or failed, auto fallback to mountain"), S.setMountain());
          }, 1500);
          i.onload = () => {
            clearTimeout(s), i.contentWindow?.postMessage(o, "*");
          }, n.appendChild(i);
        } else
          S.setMountain();
        return;
      }
      if (e.type === "db") {
        const o = await k(e.storageKey || d);
        if (t !== g || !(o instanceof Blob)) return;
        const i = N(URL.createObjectURL(o));
        if (/^video\//i.test(o.type || "") || /\.(mp4|webm)$/i.test(o.name || "")) {
          const a = document.createElement("video");
          a.src = i, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0, a.defaultMuted = !0, a.volume = 0, a.setAttribute("muted", ""), a.playsInline = !0, a.disablePictureInPicture = !0, a.setAttribute("disablepictureinpicture", ""), a.setAttribute("disableremoteplayback", ""), n.appendChild(a);
        } else {
          const a = document.createElement("img");
          a.src = i, a.alt = "", a.decoding = "async", a.fetchPriority = "high", n.appendChild(a);
        }
      }
    }
  },
  // Caller owns and revokes this URL; never put it in the current wallpaper URL pool.
  async createLibraryPreviewUrl(e, t) {
    t?.throwIfAborted();
    const r = await k(e || d);
    return t?.throwIfAborted(), r instanceof Blob ? URL.createObjectURL(r) : null;
  },
  async updateHistoryTitle(e, t) {
    const r = await m([c]), n = Array.isArray(r[c]) ? r[c] : [];
    if (!n.some((i) => i.id === e)) throw new Error("壁纸条目已变化，请刷新");
    const o = n.map((i) => i.id === e ? { ...i, title: t.trim() || i.title } : i);
    await u({ [c]: o });
  },
  async initWallpaper() {
    try {
      let e = null;
      try {
        const t = localStorage.getItem("lw-current-wallpaper");
        t !== null && (e = JSON.parse(t));
      } catch {
      }
      if (e === null) {
        const t = await m(["heroBackground"]);
        t.heroBackground !== void 0 && (e = t.heroBackground);
      }
      if (e && (e === "none" || e.type === "none")) {
        await this.applyWallpaper(null);
        return;
      }
      if (!e) {
        const t = await this.loadHistory();
        t.currentValue ? e = t.currentValue : t.history.length > 0 && (e = t.history[0].value);
      }
      if (!e) {
        const t = await E("hero");
        t && (e = {
          type: "db",
          name: t.name || "当前壁纸",
          mediaType: t.type || "application/octet-stream"
        });
      }
      e || (e = y);
      try {
        localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
      } catch {
      }
      await this.applyWallpaper(e);
    } catch (e) {
      console.warn("[WallpaperService] Failed to init wallpaper", e);
    }
  }
};
typeof chrome < "u" && chrome?.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
  t === "local" && e.heroBackground && S.applyWallpaper(e.heroBackground.newValue);
});
typeof document < "u" && document.addEventListener("visibilitychange", () => {
  const e = document.querySelector("#hero-background-media video");
  e && (document.hidden ? e.paused || e.pause() : e.paused && e.play().catch(() => {
  }));
});
const f = O(!1);
let h = null;
const q = {
  get isActive() {
    return f.value;
  },
  /**
   * 进入新用户页面内空态预览沙箱（常用网站变为空无一物）
   */
  enter() {
    if (f.value) return;
    const e = w.getState();
    h = JSON.parse(JSON.stringify(e)), w.updateState({
      links: [],
      groupSizes: {},
      folders: {},
      pages: ["常用网站"],
      pageLabels: {},
      activePage: "常用网站"
    }), f.value = !0, typeof window < "u" && window.dispatchEvent(new CustomEvent("tab-project:guest-preview-changed", {
      detail: { active: !0 }
    }));
  },
  /**
   * 退出新用户预览沙箱，原样恢复用户的真实数据
   */
  exit() {
    f.value && (h && (w.updateState(h), h = null), f.value = !1, typeof window < "u" && window.dispatchEvent(new CustomEvent("tab-project:guest-preview-changed", {
      detail: { active: !1 }
    })));
  },
  toggle() {
    f.value ? this.exit() : this.enter();
  }
};
function Y(e, t) {
  if (document.getElementById(e)) return;
  const r = document.createElement("style");
  r.id = e, r.textContent = t, document.head.appendChild(r);
}
export {
  y as D,
  S as W,
  D as b,
  Y as e,
  q as g,
  f as i
};
