import { x as g } from "./vendor-vue-DokqDua_.js";
function E(r, b, S) {
  let a = null, c = null, n = /* @__PURE__ */ new Set();
  g(
    () => [b.value, r.videoSrc, r.sourceUrls, r.isOpen, r.useIframe],
    ([e, u, s, w, y], x, T) => {
      if (c !== s && (c = s, n = /* @__PURE__ */ new Set(), a = null), !e || !w || y || !u || u.startsWith("blob:")) return;
      n.add(u);
      let l = !1, i = Date.now(), m = e.currentTime, f = 0;
      const d = () => {
        if (l || r.isLoading || r.videoSrc !== u) return;
        l = !0;
        const t = n.size < 3 ? s.find((h) => !n.has(h) && /^https:\/\//i.test(h)) : void 0;
        if (!t) {
          a = null, e.pause(), S();
          return;
        }
        a ||= { time: Number.isFinite(e.currentTime) ? e.currentTime : 0, paused: e.paused && e.readyState >= 2, rate: e.playbackRate }, r.videoSrc = t;
      }, o = () => {
        (e.error?.code === 2 || e.error?.code === 4) && d();
      }, p = () => {
        if (!a) return;
        const t = a;
        if (a = null, t.time > 0)
          try {
            e.currentTime = Number.isFinite(e.duration) ? Math.min(t.time, Math.max(0, e.duration - 0.1)) : t.time;
          } catch {
          }
        e.playbackRate = t.rate, t.paused ? e.pause() : e.play().catch(() => {
        });
      };
      e.addEventListener("error", o), e.addEventListener("loadedmetadata", p);
      const L = setInterval(() => {
        if (l || r.isLoading || document.hidden || e.ended || e.paused && e.readyState >= 2) {
          i = Date.now();
          return;
        }
        const t = e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
        (e.currentTime !== m || t > f) && (i = Date.now()), m = e.currentTime, f = t, Date.now() - i >= 15e3 && e.readyState < 3 && d();
      }, 1e3);
      T(() => {
        clearInterval(L), e.removeEventListener("error", o), e.removeEventListener("loadedmetadata", p);
      });
    },
    { flush: "post", immediate: !0 }
  );
}
export {
  E as u
};
