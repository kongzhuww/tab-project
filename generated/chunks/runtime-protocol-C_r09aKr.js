function m(n) {
  return n?.sendMessage ? n : typeof chrome < "u" && chrome?.runtime?.sendMessage ? chrome.runtime : null;
}
function d(n, o) {
  const s = m(o?.runtime), i = !!o?.throwOnError;
  return s?.sendMessage ? new Promise((u, c) => {
    let f = !1;
    const t = (r, e) => {
      if (f) return;
      f = !0;
      const a = s.lastError;
      if (a || e) {
        i ? c(e instanceof Error ? e : new Error(a?.message || String(e || "RUNTIME_ERROR"))) : u(void 0);
        return;
      }
      u(r);
    };
    try {
      const r = s.sendMessage(n, (e) => t(e));
      r && typeof r.then == "function" && r.then(
        (e) => t(e),
        (e) => t(void 0, e)
      );
    } catch (r) {
      t(void 0, r);
    }
  }) : i ? Promise.reject(new Error("RUNTIME_UNAVAILABLE")) : Promise.resolve(void 0);
}
export {
  d as s
};
