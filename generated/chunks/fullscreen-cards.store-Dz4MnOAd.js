import { r as i, K as c, L as l } from "./view-styles-hx9Gz5g8.js";
import { k as a, w as s, g as u } from "./window-manager.store-D_Nuf9-p.js";
const t = ["todoist", "card-github", "daily-aihot", "daily-bilibili", "daily-youtube", "daily-pricing"];
let n = null;
function f() {
  if (n) return;
  const e = document.querySelector("#hero-background-media video");
  e && !e.paused && (n = e, e.pause());
}
function v() {
  const e = n;
  n = null, e?.isConnected && e.play().catch(() => {
  });
}
const d = {
  get activeId() {
    return i.activeId;
  },
  enter(e) {
    if (!t.includes(e)) return;
    const o = u(e);
    if (o?.lifecycle.canOpen && !o.lifecycle.canOpen()) return;
    i.activeId && a(i.activeId), o && a(e), f();
    try {
      sessionStorage.setItem(c, e);
    } catch {
    }
    i.activeId = e;
    const r = window;
    e === "daily-bilibili" && (r.LogicWeaverBiliFavorites?.loadOrganizer?.(), requestAnimationFrame(() => r.ensureDailyDataLoaded?.()));
  },
  exit() {
    if (!i.activeId) return;
    const e = i.activeId;
    a(i.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), i.activeId = null;
    try {
      sessionStorage.removeItem(c);
    } catch {
    }
    s.releaseFocus(e), v();
  },
  cycle() {
    const e = i.activeId;
    this.enter(t[(t.indexOf(e) + 1) % t.length]);
  }
};
l({ enter: (e) => d.enter(e), exit: () => d.exit() });
export {
  d as f
};
