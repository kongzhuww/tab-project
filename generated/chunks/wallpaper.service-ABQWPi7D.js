import { a1 as ae } from "./search.service-gzbpg5BD.js";
import { b as se } from "./radio-player-CCUSmV1E.js";
const ce = "active_wallpaper", Z = "_manifest.json";
function le() {
  return typeof navigator < "u" && typeof navigator.storage?.getDirectory == "function";
}
async function De(e) {
  const t = [];
  for await (const [n, r] of e.entries())
    t.push(e.removeEntry(n, { recursive: r.kind === "directory" }));
  await Promise.all(t);
}
async function Be(e, t) {
  let n = e;
  for (const r of t)
    !r || r === "." || (n = await n.getDirectoryHandle(r, { create: !0 }));
  return n;
}
async function Le(e) {
  if (!le()) return !1;
  try {
    const n = await (await navigator.storage.getDirectory()).getDirectoryHandle(ce, { create: !0 });
    await De(n);
    const o = await (await n.getFileHandle(Z, { create: !0 })).createWritable(), i = {
      type: e.type,
      entry: e.entry || "",
      name: e.name || "Active Wallpaper",
      properties: e.properties || {},
      updatedAt: Date.now(),
      fileCount: e.files.length
    };
    await o.write(JSON.stringify(i)), await o.close();
    for (const s of e.files) {
      const a = String(s.path || "").replace(/\\/g, "/").replace(/^\/+/, "");
      if (!a) continue;
      const c = a.split("/"), p = c.pop(), A = await (await (await Be(n, c)).getFileHandle(p, { create: !0 })).createWritable();
      await A.write(s.file), await A.close();
    }
    return !0;
  } catch (t) {
    return console.warn("[OPFS Wallpaper] 写入活跃壁纸失败，回退至 IndexedDB:", t), !1;
  }
}
async function ue(e, t = "") {
  const n = [];
  for await (const [r, o] of e.entries()) {
    if (r === Z) continue;
    const i = t ? `${t}/${r}` : r;
    if (o.kind === "file") {
      const s = await o.getFile();
      n.push({
        path: i,
        file: s,
        mime: s.type || void 0
      });
    } else if (o.kind === "directory") {
      const s = await ue(o, i);
      n.push(...s);
    }
  }
  return n;
}
async function ee() {
  if (!le()) return null;
  try {
    const e = await navigator.storage.getDirectory();
    let t;
    try {
      t = await e.getDirectoryHandle(ce, { create: !1 });
    } catch {
      return null;
    }
    let n;
    try {
      n = await t.getFileHandle(Z, { create: !1 });
    } catch {
      return null;
    }
    const o = await (await n.getFile()).text(), i = JSON.parse(o), s = await ue(t);
    return !s.length && i.type !== "image" ? null : {
      type: i.type || "web",
      entry: i.entry || "",
      name: i.name || "Active Wallpaper",
      properties: i.properties || {},
      updatedAt: i.updatedAt || 0,
      files: s
    };
  } catch (e) {
    return console.warn("[OPFS Wallpaper] 读取活跃壁纸失败:", e), null;
  }
}
const J = 1024, L = J / 2, E = 64;
let l = null, w = null, h = null;
const te = /* @__PURE__ */ new WeakMap();
let ne = null, f = null, g = null, M = !1, F = 0, W = 0, re = !1;
const H = new Uint8Array(L), K = new Uint8Array(L), q = new Array(128).fill(0), O = new Array(128).fill(0), pe = [];
for (let e = 0; e < E; e++) {
  const t = Math.floor(e + Math.pow(e / E, 3.2) * (L - E)), n = Math.min(
    L - 1,
    Math.max(t, Math.floor(e + 1 + Math.pow((e + 1) / E, 3.2) * (L - E) - 1))
  );
  pe.push([t, n]);
}
function Oe() {
  if (l && w && h) return !0;
  try {
    const e = window.AudioContext || window.webkitAudioContext;
    if (!e) return !1;
    l = new e();
    const t = l.createChannelSplitter(2);
    return w = l.createAnalyser(), w.fftSize = J, w.smoothingTimeConstant = 0.82, h = l.createAnalyser(), h.fftSize = J, h.smoothingTimeConstant = 0.82, t.connect(w, 0), t.connect(h, 1), !0;
  } catch (e) {
    return console.warn("[WE AudioVisualizer] AudioContext init failed:", e), !1;
  }
}
function Me(e) {
  if (!e || !Oe() || !l) return !1;
  try {
    let t = te.get(e);
    if (t || (t = l.createMediaElementSource(e), te.set(e, t)), ne !== e) {
      if (w && h) {
        try {
          t.disconnect();
        } catch {
        }
        t.connect(w), t.connect(h);
      }
      t.connect(l.destination), ne = e;
    }
    return !0;
  } catch {
    return !1;
  }
}
function de() {
  const e = ae.getAudioElement(), t = se.getAudioElement();
  return t && !t.paused && !t.ended && t.currentTime > 0 ? t : e && !e.paused && !e.ended && e.currentTime > 0 ? e : null;
}
function Ie() {
  const e = de();
  return e && Me(e), e;
}
function N(e) {
  if (!M || !g) return;
  if (e - F < 33) {
    f = requestAnimationFrame(N);
    return;
  }
  F = e;
  const t = Ie();
  if (!t || t.paused || t.ended) {
    try {
      g.postMessage({
        type: "WE_AUDIO_DATA",
        audio: O
      }, "*");
    } catch {
    }
    l && l.state === "running" && l.suspend().catch(() => {
    }), f !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(f), f = null);
    return;
  }
  l && l.state === "suspended" && l.resume().catch(() => {
  });
  let n = !1;
  if (w && h) {
    w.getByteFrequencyData(H), h.getByteFrequencyData(K);
    for (let r = 0; r < E; r++) {
      const [o, i] = pe[r];
      let s = 0, a = 0;
      for (let u = o; u <= i; u++)
        H[u] > s && (s = H[u]), K[u] > a && (a = K[u]);
      const c = s / 255, p = a / 255;
      q[r] = c, q[r + 64] = p, (c > 0.015 || p > 0.015) && (n = !0);
    }
  }
  if (n)
    W = 0;
  else if (W++, W >= 30) {
    try {
      g.postMessage({
        type: "WE_AUDIO_DATA",
        audio: O
      }, "*");
    } catch {
    }
    l && l.state === "running" && l.suspend().catch(() => {
    }), f !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(f), f = null);
    return;
  }
  try {
    g.postMessage({
      type: "WE_AUDIO_DATA",
      audio: n ? q : O
    }, "*");
  } catch {
  }
  f = requestAnimationFrame(N);
}
function I() {
  M && f === null && (W = 0, F = 0, f = requestAnimationFrame(N));
}
function Pe() {
  if (re) return;
  re = !0;
  const e = ae.getAudioElement(), t = se.getAudioElement();
  e && (e.addEventListener("play", I), e.addEventListener("playing", I)), t && (t.addEventListener("play", I), t.addEventListener("playing", I));
}
function fe(e) {
  if (g = e, Pe(), M) return;
  if (M = !0, F = 0, W = 0, de())
    f = requestAnimationFrame(N);
  else
    try {
      g.postMessage({
        type: "WE_AUDIO_DATA",
        audio: O
      }, "*");
    } catch {
    }
}
function C() {
  if (M = !1, W = 0, f !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(f), clearTimeout(f), f = null), l && l.state === "running" && l.suspend().catch(() => {
  }), g)
    try {
      g.postMessage({
        type: "WE_AUDIO_DATA",
        audio: O
      }, "*");
    } catch {
    }
}
const me = "leaf-newtab-backgrounds", ye = 1, b = "current-background", d = "heroBackgroundHistory", V = 30, S = "assets/newtab-mountains.png", ie = 450, G = 180 * 1024 * 1024;
let z = [], k = 0, P = null, D = null, T = null;
function oe(e) {
  return z.push(e), e;
}
function Q() {
  if (P) {
    try {
      P();
    } catch {
    }
    P = null;
  }
}
function Ue(e) {
  Q();
  let t = null, n = 0, r = 0, o = 0, i = -1, s = -1;
  const a = () => {
    if (t = null, n = performance.now(), r !== i || o !== s) {
      i = r, s = o;
      try {
        e.postMessage({
          type: "WE_MOUSE_MOVE",
          x: r,
          y: o
        }, "*");
      } catch {
      }
    }
  }, c = (m) => {
    r = m.clientX, o = m.clientY;
    const _ = performance.now();
    _ - n >= 33 ? (t && (clearTimeout(t), t = null), a()) : t || (t = setTimeout(a, 33 - (_ - n)));
  }, p = (m) => {
    try {
      e.postMessage({
        type: "WE_MOUSE_DOWN",
        x: m.clientX,
        y: m.clientY
      }, "*"), e.postMessage({ type: "WE_USER_GESTURE_UNLOCK" }, "*");
    } catch {
    }
  }, u = (m) => {
    try {
      e.postMessage({
        type: "WE_MOUSE_UP",
        x: m.clientX,
        y: m.clientY
      }, "*");
    } catch {
    }
  }, y = () => {
    try {
      e.postMessage({ type: "WE_USER_GESTURE_UNLOCK" }, "*");
    } catch {
    }
  }, A = () => {
    const m = document.hidden;
    try {
      e.postMessage({
        type: "WE_SET_PAUSED",
        isPaused: m
      }, "*");
    } catch {
    }
    m ? C() : fe(e);
  };
  window.addEventListener("pointermove", c, { passive: !0 }), window.addEventListener("mousedown", p, { passive: !0 }), window.addEventListener("mouseup", u, { passive: !0 }), window.addEventListener("click", y, { passive: !0 }), window.addEventListener("keydown", y, { passive: !0 }), document.addEventListener("visibilitychange", A), P = () => {
    t && clearTimeout(t), window.removeEventListener("pointermove", c), window.removeEventListener("mousedown", p), window.removeEventListener("mouseup", u), window.removeEventListener("click", y), window.removeEventListener("keydown", y), document.removeEventListener("visibilitychange", A);
  };
}
function we() {
  C(), Q(), z.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }), z = [];
}
function R() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const n = indexedDB.open(me, ye);
    n.onupgradeneeded = () => {
      const r = n.result;
      r.objectStoreNames.contains("files") || r.createObjectStore("files");
    }, n.onsuccess = () => e(n.result), n.onerror = () => t(n.error);
  });
}
async function he(e, t = b) {
  const n = await R();
  return new Promise((r, o) => {
    const i = n.transaction("files", "readwrite");
    i.objectStore("files").put(e, t), i.oncomplete = () => {
      n.close(), r();
    }, i.onerror = () => {
      n.close(), o(i.error);
    }, i.onabort = i.onerror;
  });
}
async function ge() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported"));
      return;
    }
    const n = indexedDB.open("my-newtab-background", 1);
    n.onupgradeneeded = () => {
      const r = n.result;
      r.objectStoreNames.contains("files") || r.createObjectStore("files");
    }, n.onsuccess = () => e(n.result), n.onerror = () => t(n.error);
  });
}
async function x(e = "hero") {
  try {
    const t = await ge();
    return new Promise((n) => {
      const r = t.transaction("files", "readonly"), o = r.objectStore("files").get(e);
      o.onsuccess = () => {
        t.close(), n(o.result || null);
      }, o.onerror = () => {
        t.close(), n(null);
      }, r.oncomplete = () => t.close();
    });
  } catch {
    return null;
  }
}
async function U(e = b) {
  try {
    const n = await R(), r = await new Promise((o, i) => {
      const s = n.transaction("files", "readonly"), a = s.objectStore("files").get(e);
      a.onsuccess = () => o(a.result || null), s.oncomplete = () => n.close(), s.onerror = () => {
        n.close(), i(s.error);
      };
    });
    if (r) return r;
  } catch {
  }
  const t = await x(e);
  return t || (e === b ? x("hero") : null);
}
async function Y(e = b) {
  const t = await R();
  return new Promise((n, r) => {
    const o = t.transaction("files", "readwrite");
    o.objectStore("files").delete(e), o.oncomplete = () => {
      t.close(), n();
    }, o.onerror = () => {
      t.close(), r(o.error);
    }, o.onabort = o.onerror;
  });
}
function B(e) {
  return new Promise((t, n) => {
    if (typeof chrome > "u" || !chrome.storage?.local?.get) {
      n(new Error("壁纸存储不可用"));
      return;
    }
    chrome.storage.local.get(e, (r) => {
      chrome.runtime?.lastError ? n(new Error("壁纸配置读取失败")) : t(r || {});
    });
  });
}
function v(e) {
  return new Promise((t, n) => {
    if (typeof chrome > "u" || !chrome.storage?.local?.set) {
      n(new Error("壁纸存储不可用"));
      return;
    }
    chrome.storage.local.set(e, () => {
      chrome.runtime?.lastError ? n(new Error("壁纸配置保存失败")) : t();
    });
  });
}
function j(e) {
  return !!(e && (/^image\//i.test(e.type || "") || /^video\//i.test(e.type || "") || /\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(e.name || "")));
}
function $(e) {
  return String(e || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
}
function be(e, t) {
  const n = String(t || "").trim().replace(/^['"]|['"]$/g, "");
  if (!n || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(n)) return "";
  const [r] = n.split(/[?#]/);
  if (!r) return "";
  const o = n.startsWith("/") ? "" : $(e).split("/").slice(0, -1).join("/"), i = `${o ? o + "/" : ""}${r.replace(/^\/+/, "")}`.split("/"), s = [];
  return i.forEach((a) => {
    !a || a === "." || (a === ".." ? s.pop() : s.push(a));
  }), s.join("/").toLowerCase();
}
function Ae(e, t) {
  return t.type ? t.type : /\.html?$/i.test(e) ? "text/html" : /\.css$/i.test(e) ? "text/css" : /\.m?js$/i.test(e) ? "text/javascript" : /\.png$/i.test(e) ? "image/png" : /\.jpe?g$/i.test(e) ? "image/jpeg" : /\.webp$/i.test(e) ? "image/webp" : /\.gif$/i.test(e) ? "image/gif" : /\.mp4$/i.test(e) ? "video/mp4" : /\.webm$/i.test(e) ? "video/webm" : "application/octet-stream";
}
async function ve(e) {
  const t = [];
  let n = 0;
  async function r(o, i = "", s = 0) {
    if (!(s > 4 || t.length >= ie || n >= G))
      for await (const a of o.values()) {
        if (t.length >= ie || n >= G) break;
        const c = $(i ? `${i}/${a.name}` : a.name);
        if (a.kind === "file") {
          const p = await a.getFile();
          n += p.size || 0, n <= G && t.push({ path: c, file: p });
        } else a.kind === "directory" && await r(a, c, s + 1);
      }
  }
  return await r(e), t;
}
function Ee(e) {
  return e.filter((t) => /(^|\/)index\.html?$/i.test(t.path) || /\.html?$/i.test(t.path)).sort((t, n) => {
    const r = (o) => /^index\.html?$/i.test(o.path) ? 0 : /(^|\/)index\.html?$/i.test(o.path) ? 1 : 2;
    return r(t) - r(n) || t.path.length - n.path.length;
  })[0] || null;
}
function X(e, t = []) {
  return typeof e == "string" ? /\.(png|jpe?g|webp|gif|mp4|webm|html?)($|[?#])/i.test(e) && t.push(e) : Array.isArray(e) ? e.forEach((n) => X(n, t)) : e && typeof e == "object" && Object.values(e).forEach((n) => X(n, t)), t;
}
async function Se(e) {
  const t = new Map(e.map((r) => [$(r.path).toLowerCase(), r])), n = e.filter((r) => /(^|\/)project\.json$/i.test(r.path));
  for (const r of n)
    try {
      const o = JSON.parse(await r.file.text());
      for (const i of X(o)) {
        const s = t.get(be(r.path, i));
        if (s && j(s.file)) return s.file;
      }
    } catch {
    }
  return null;
}
function We(e, t, n) {
  const r = n.filter((o) => !/\.(pkg|mpkg)$/i.test(o.path)).map((o) => ({ path: o.path, file: o.file, mime: Ae(o.path, o.file) }));
  return { type: "web", name: e || "Web Wallpaper", entry: t.path, files: r };
}
async function _e(e) {
  const t = await ve(e), n = Ee(t);
  if (n) return We(e.name, n, t);
  const r = await Se(t);
  return r || t.map((i) => i.file).filter(j).sort((i, s) => {
    const a = (c) => /\.(mp4|webm)$/i.test(c.name) ? 0 : /\.gif$/i.test(c.name) ? 1 : /^preview\./i.test(c.name) ? 2 : /cover|thumb|poster/i.test(c.name) ? 3 : 4;
    return a(i) - a(s) || s.size - i.size;
  })[0] || null;
}
function Fe(e) {
  return e ? typeof e == "string" ? "自定义图片" : e.name || (e.type === "web" ? "Web Wallpaper" : "自定义背景") : "默认背景";
}
function Ne(e) {
  return typeof e == "string" ? "图片" : e?.type === "web" ? "Web Wallpaper" : e?.type === "db" ? /video/i.test(e.mediaType || "") ? "视频" : "图片/GIF" : "背景";
}
function Te(e, t) {
  if (!e || !t) return !1;
  const n = e.value || e, r = t.value || t;
  if (n.workshopId && r.workshopId && String(n.workshopId) === String(r.workshopId)) return !0;
  const o = e.title || n.name || n.title, i = t.title || r.name || r.title;
  if (o && i && o === i && n.type === r.type) return !0;
  const s = { ...n, storageKey: void 0 }, a = { ...r, storageKey: void 0 };
  return JSON.stringify(s) === JSON.stringify(a);
}
const ke = {
  pauseWallpaper(e) {
    if (typeof document > "u") return;
    const t = document.querySelector("#hero-background-media video");
    t && (e ? t.paused || t.pause() : t.paused && t.play().catch(() => {
    }));
    const n = document.querySelector("#hero-background-media iframe");
    if (n?.contentWindow)
      try {
        n.contentWindow.postMessage({
          type: "WE_SET_PAUSED",
          isPaused: e,
          paused: e
        }, "*");
      } catch {
      }
    e && C();
  },
  async loadHistory() {
    const e = await B([d, "heroBackground"]);
    let t = Array.isArray(e[d]) ? e[d] : [];
    const n = /* @__PURE__ */ new Set(), r = [];
    for (const o of t) {
      const i = o.value?.workshopId ? `ws-${o.value.workshopId}` : o.title ? `${o.kind || ""}-${o.title}` : JSON.stringify({ ...o.value, storageKey: void 0 });
      n.has(i) || (n.add(i), r.push(o));
    }
    return r.length !== t.length && (t = r, v({ [d]: r })), { history: t, currentValue: e.heroBackground || null };
  },
  async addHistory(e, t = null, n) {
    const r = `bg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let o = e;
    e && typeof e == "object" && (o = { ...e, storageKey: r }), t && await he(t, r);
    const i = await B([d, "heroBackground"]), s = Array.isArray(i[d]) ? i[d] : [], a = {
      id: r,
      title: Fe(o),
      kind: Ne(o),
      createdAt: Date.now(),
      previewUrl: n || o.previewUrl || o.previewBase64,
      value: o
    }, c = [a, ...s.filter((u) => !Te(u, a))].slice(
      0,
      V
    ), p = s.slice(V - 1).filter((u) => u.value?.storageKey && u.value.storageKey !== i.heroBackground?.storageKey);
    return await Promise.all(p.map((u) => Y(u.value.storageKey))), await v({ [d]: c }), o;
  },
  async deleteHistory(e) {
    const t = await B([d, "heroBackground"]), n = (t[d] || []).filter((r) => r.id !== e.id);
    e.value?.storageKey && await Y(e.value.storageKey), await v({ [d]: n }), JSON.stringify(t.heroBackground) === JSON.stringify(e.value) && await this.clearWallpaper();
  },
  async clearWallpaper() {
    const e = { type: "none" };
    await v({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(null);
  },
  async setMountain() {
    await v({ heroBackground: S });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(S));
    } catch {
    }
    await this.applyWallpaper(S);
  },
  async setWallpaper(e, t = null) {
    t && (D = t), T = e, await v({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(e, t);
  },
  async chooseBackgroundFile(e = "all") {
    return typeof document > "u" ? [] : new Promise((t, n) => {
      const r = document.createElement("input");
      r.type = "file", r.hidden = !0, r.multiple = !0, r.accept = e === "image" ? "image/*,.jpg,.jpeg,.png,.webp,.gif" : e === "video" ? "video/mp4,video/webm,.mp4,.webm" : "image/*,video/mp4,video/webm";
      const o = (a) => {
        r.removeEventListener("change", i), r.removeEventListener("cancel", s), r.remove(), t(a);
      }, i = () => o(Array.from(r.files || [])), s = () => o([]);
      r.addEventListener("change", i), r.addEventListener("cancel", s), document.body.appendChild(r);
      try {
        r.click();
      } catch (a) {
        r.remove(), n(a);
      }
    });
  },
  async importBackgroundFile(e, { apply: t = !0 } = {}) {
    if (!e) return null;
    let n, r = null;
    if (e.type === "web")
      r = e, n = { type: "web", name: e.name, entry: e.entry };
    else if (j(e))
      r = e, n = { type: "db", name: e.name, mediaType: e.type || "application/octet-stream" };
    else
      throw new Error("请选择 JPG、PNG、WebP、GIF、MP4 或 WebM 壁纸。");
    return n = await this.addHistory(n, r), t && await this.setWallpaper(n), n;
  },
  async importWallpaperDirectory() {
    const e = window;
    if (!e.showDirectoryPicker) throw new Error("当前浏览器不支持直接选择 Wallpaper 文件夹。");
    const t = await e.showDirectoryPicker(), n = await _e(t);
    if (!n) throw new Error("文件夹中没有找到可用的 Web Wallpaper、图片、GIF、MP4 或 WebM。");
    return this.importBackgroundFile(n);
  },
  async applyWallpaper(e, t = null) {
    const n = ++k;
    if (typeof document > "u") return;
    const r = document.getElementById("launcher"), o = document.getElementById("hero-background-media");
    if (o && (T = e, we(), o.replaceChildren(), r?.style.removeProperty("--launcher-image"), !!e)) {
      if (typeof e == "string") {
        const i = typeof chrome < "u" ? chrome : null, s = e.startsWith("chrome-extension://") || e.startsWith("http") || e.startsWith("data:") ? e : i?.runtime?.getURL ? i.runtime.getURL(e) : e, a = document.createElement("img");
        a.src = s, a.alt = "", a.decoding = "async", a.fetchPriority = "high", o.appendChild(a);
        return;
      }
      if (e.type === "style") {
        const i = document.createElement("div");
        i.style.cssText = e.style || "", i.style.position = "absolute", i.style.inset = "0", o.appendChild(i);
        return;
      }
      if (e.type === "video") {
        let i = null;
        if (t?.files ? i = (t.files.find((a) => a.path === t.entry) || t.files[0])?.file || null : t instanceof Blob && (i = t), !i) {
          const s = await ee();
          s?.files?.length && (i = (s.files.find((c) => c.path === s.entry) || s.files[0])?.file || null);
        }
        if (i instanceof Blob && n === k) {
          const s = oe(URL.createObjectURL(i)), a = document.createElement("video");
          a.src = s, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0, a.defaultMuted = !0, a.volume = 0, a.setAttribute("muted", ""), a.playsInline = !0, a.disablePictureInPicture = !0, a.setAttribute("disablepictureinpicture", ""), a.setAttribute("disableremoteplayback", ""), o.appendChild(a);
          return;
        }
      }
      if (e.type === "web") {
        let i = t || D;
        if ((!i || i.type !== "web") && (i = await ee(), i && i.type === "web" ? D = i : (i = await U(e.storageKey || b), i && i.type === "web" && (D = i, Le(i)))), n !== k) return;
        if (i?.type === "web") {
          D = i;
          const s = document.createElement("iframe");
          s.title = i.name || "Web Wallpaper", s.setAttribute("allow", "autoplay *"), s.allow = "autoplay";
          const a = typeof chrome < "u" ? chrome : null;
          s.src = a?.runtime?.getURL ? a.runtime.getURL("wallpaper-sandbox.html") : "wallpaper-sandbox.html";
          let c = !1;
          const p = () => {
            c || s.contentWindow?.postMessage(i, "*");
          }, u = (y) => {
            y.source === s.contentWindow && (y.data?.type === "WE_SANDBOX_READY" ? p() : y.data?.type === "WE_SANDBOX_ACK" && (c = !0));
          };
          window.addEventListener("message", u), s.onload = () => {
            p();
            let y = 0;
            const A = setInterval(() => {
              if (y++, c || y > 5 || n !== k) {
                clearInterval(A);
                return;
              }
              p();
            }, 80);
            s.contentWindow && (Ue(s.contentWindow), fe(s.contentWindow));
          }, o.appendChild(s);
        } else
          console.warn("[WallpaperService] Web wallpaper pack not found yet, keeping state without fallback");
        return;
      }
      if (e.type === "db") {
        const i = await U(e.storageKey || b);
        if (n !== k || !(i instanceof Blob)) return;
        const s = oe(URL.createObjectURL(i));
        if (/^video\//i.test(i.type || "") || /\.(mp4|webm)$/i.test(i.name || "")) {
          const a = document.createElement("video");
          a.src = s, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0, a.defaultMuted = !0, a.volume = 0, a.setAttribute("muted", ""), a.playsInline = !0, a.disablePictureInPicture = !0, a.setAttribute("disablepictureinpicture", ""), a.setAttribute("disableremoteplayback", ""), o.appendChild(a);
        } else {
          const a = document.createElement("img");
          a.src = s, a.alt = "", a.decoding = "async", a.fetchPriority = "high", o.appendChild(a);
        }
      }
    }
  },
  // Caller owns and revokes this URL; never put it in the current wallpaper URL pool.
  async createLibraryPreviewUrl(e, t) {
    t?.throwIfAborted();
    const n = await U(e || b);
    return t?.throwIfAborted(), n instanceof Blob ? URL.createObjectURL(n) : null;
  },
  async updateHistoryTitle(e, t) {
    const n = await B([d]), r = Array.isArray(n[d]) ? n[d] : [];
    if (!r.some((i) => i.id === e)) throw new Error("壁纸条目已变化，请刷新");
    const o = r.map((i) => i.id === e ? { ...i, title: t.trim() || i.title } : i);
    await v({ [d]: o });
  },
  async initWallpaper(e = {}) {
    try {
      let t = null;
      try {
        const n = await B(["heroBackground"]);
        n.heroBackground !== void 0 && (t = n.heroBackground);
      } catch {
      }
      if (t === null)
        try {
          const n = localStorage.getItem("lw-current-wallpaper");
          n !== null && (t = JSON.parse(n));
        } catch {
        }
      if (t && (t === "none" || t.type === "none")) {
        await this.applyWallpaper(e.fallbackWhenNone ? S : null);
        return;
      }
      if (!t) {
        const n = await this.loadHistory();
        n.currentValue ? t = n.currentValue : n.history.length > 0 && (t = n.history[0].value);
      }
      if (!t) {
        const n = await x("hero");
        n && (t = {
          type: "db",
          name: n.name || "当前壁纸",
          mediaType: n.type || "application/octet-stream"
        });
      }
      t || (t = S);
      try {
        localStorage.setItem("lw-current-wallpaper", JSON.stringify(t));
      } catch {
      }
      await this.applyWallpaper(t);
    } catch (t) {
      console.warn("[WallpaperService] Failed to init wallpaper", t);
    }
  }
};
typeof chrome < "u" && chrome?.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
  if (t === "local" && e.heroBackground) {
    const n = e.heroBackground.newValue;
    if (T && n && JSON.stringify(T) === JSON.stringify(n))
      return;
    ke.applyWallpaper(n);
  }
});
typeof document < "u" && document.addEventListener("visibilitychange", () => {
  const e = document.hidden, t = document.querySelector("#hero-background-media video");
  t && (e ? t.paused || t.pause() : t.paused && t.play().catch(() => {
  }));
  const n = document.querySelector("#hero-background-media iframe");
  if (n?.contentWindow)
    try {
      n.contentWindow.postMessage({
        type: "WE_SET_PAUSED",
        isPaused: e
      }, "*");
    } catch {
    }
  e && C();
});
const Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BACKGROUND_CURRENT_KEY: b,
  BACKGROUND_DB_NAME: me,
  BACKGROUND_DB_VERSION: ye,
  BACKGROUND_HISTORY_KEY: d,
  BACKGROUND_HISTORY_LIMIT: V,
  DEFAULT_MOUNTAIN_VALUE: S,
  WallpaperService: ke,
  backgroundDbClear: Y,
  backgroundDbGet: U,
  backgroundDbPut: he,
  buildWebWallpaperPack: We,
  clearActiveWallpaperUrls: we,
  collectWallpaperFiles: ve,
  findWebWallpaperEntry: Ee,
  getWallpaperMime: Ae,
  isBackgroundMedia: j,
  legacyBackgroundDbGet: x,
  normalizeWallpaperPath: $,
  openBackgroundDb: R,
  openLegacyBackgroundDb: ge,
  pickProjectReferencedMedia: Se,
  pickWallpaperMediaFromDirectory: _e,
  resolveWallpaperPath: be,
  teardownWallpaperInteractions: Q
}, Symbol.toStringTag, { value: "Module" }));
export {
  S as D,
  ke as W,
  U as a,
  Y as b,
  R as o,
  Le as s,
  Re as w
};
