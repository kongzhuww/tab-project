import { c as L, d as U } from "./view-styles-tviQK1Nj.js";
import { g as $, r as p, a as B, b as S, c as A } from "./cache-directory-CPgWN97W.js";
import { s as _ } from "./cache-directory-CPgWN97W.js";
const s = "biliCachedVideosV1";
function a(e) {
  window.showBiliToast?.(e);
}
const h = /* @__PURE__ */ new Set();
async function D(e) {
  if (!navigator.locks) throw new Error("缓存索引无法锁定");
  await navigator.locks.request("logicweaver:bili-cache-index", { signal: AbortSignal.timeout(15e3) }, async () => {
    const t = await chrome.storage.local.get(s);
    if (t[s] !== void 0 && !Array.isArray(t[s]))
      throw new Error("缓存索引格式异常，未覆盖原记录");
    const i = t[s] || [];
    await chrome.storage.local.set({ [s]: [e, ...i.filter((r) => r?.bvid !== e.bvid)] });
  });
}
async function I(e) {
  const t = String(e.bvid || "");
  if (!/^BV[a-zA-Z0-9]+$/.test(t))
    return a("缺少有效的视频编号"), !1;
  if (h.has(t))
    return a("该视频正在缓存，请勿重复提交"), !1;
  h.add(t);
  let i = !1, r = null, n = "无法读取缓存目录，请在设置中选择或重新授权";
  const d = new AbortController(), w = () => d.abort(), m = setTimeout(w, 1800 * 1e3);
  window.addEventListener("pagehide", w, { once: !0 });
  try {
    const o = await $();
    if (!o)
      return a("请先在设置 → 文件夹与存储 → B站视频缓存目录中选择存放目录"), !1;
    await p(o.handle, "readwrite");
    const v = o.id || await B(o.handle);
    n = "播放流解析失败，请稍后手动重试", a(`正在解析「${e.title || t}」播放流…`);
    const c = await L.resolvePlayStream(e), g = c.sources[0];
    if (!g) throw new Error("没有可缓存的播放源");
    const l = new URL(g);
    if (l.protocol !== "https:" || l.username || l.password || !/(^|\.)(bilivideo\.(com|cn)|bilibili\.com|hdslb\.com)$/.test(l.hostname))
      throw new Error("不支持的播放源");
    n = "视频下载或目录写入失败，未登记为缓存；请检查网络、目录权限和可用空间";
    const f = await fetch(l.href, { credentials: "omit", referrerPolicy: "no-referrer", signal: d.signal });
    if (r = f.body, !f.ok || !r) throw new Error("视频流不可读取");
    const C = f.headers.get("content-type") || "";
    if (/text\/|json|html/i.test(C))
      throw await r.cancel(), new Error("响应不是视频流");
    const u = `${String(c.title || e.title || t).replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").replace(/[. ]+$/g, "").slice(0, 100)}_${t}_${crypto.randomUUID()}.mp4`, y = await o.handle.getFileHandle(u, { create: !0 }), E = await y.createWritable();
    a(`正在缓存到「${o.handle.name}」，请保持当前页面打开…`), await r.pipeTo(E, { signal: d.signal }), i = !0;
    const b = (await y.getFile()).size;
    if (!b) throw new Error("视频文件为空");
    return await D({
      bvid: t,
      aid: c.aid || e.aid || null,
      title: c.title || e.title || t,
      cover: c.poster || e.cover || "",
      fileName: u,
      directoryId: v,
      size: b,
      cachedAt: Date.now()
    }), a(`已缓存到「${o.handle.name}」`), !0;
  } catch {
    return a(i ? "文件已写入，但缓存记录保存未确认；请核对目录与列表，不要重复缓存" : n), !1;
  } finally {
    clearTimeout(m), window.removeEventListener("pagehide", w), r && !r.locked && r.cancel().catch(() => {
    }), h.delete(t);
  }
}
async function N(e) {
  let t = "";
  try {
    if (!e.fileName || /[\\/]/.test(e.fileName) || e.fileName === "." || e.fileName === "..")
      throw new Error("缓存文件名无效");
    const i = e.directoryId ? await S(e.directoryId) : await A();
    if (!i) {
      a("请在设置 → 文件夹与存储 → B站视频缓存目录中选择此视频实际所在的目录");
      return;
    }
    await p(i, "read");
    const n = await (await i.getFileHandle(e.fileName)).getFile();
    if (!n.size) throw new Error("缓存文件为空");
    t = URL.createObjectURL(n), await U.openVideo({
      bvid: e.bvid,
      aid: e.aid || void 0,
      title: e.title,
      cover: e.cover,
      cachedSourceUrl: t
    }), t = "";
  } catch {
    t && URL.revokeObjectURL(t), a("本地缓存无法打开：请核对文件是否存在，并在设置中重新授权目录；未改为在线播放");
  }
}
export {
  s as CACHE_LIST_KEY,
  I as cacheBiliVideo,
  A as getConfiguredCacheDirectory,
  N as openCachedBiliVideo,
  _ as saveConfiguredCacheDirectory
};
