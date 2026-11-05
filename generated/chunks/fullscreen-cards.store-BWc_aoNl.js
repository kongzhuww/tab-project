import { r as i, w as a, M as l, N as s } from "./view-styles-BiijI0WG.js";
import { k as r, w as u, g as f } from "./window-manager.store-B8yz4j-E.js";
const t = ["todoist", "card-github", "daily-aihot", "daily-bilibili", "daily-youtube", "daily-pricing"];
let n = null;
function v() {
  if (n) return;
  const e = document.querySelector("#hero-background-media video");
  e && !e.paused && (n = e, e.pause());
}
function g() {
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
    const o = f(e);
    if (o?.lifecycle.canOpen && !o.lifecycle.canOpen()) return;
    i.activeId && r(i.activeId), o && r(e), v();
    try {
      sessionStorage.setItem(l, e);
    } catch {
    }
    i.activeId = e, a(i.activeId);
    const c = window;
    e === "daily-bilibili" && (c.LogicWeaverBiliFavorites?.loadOrganizer?.(), requestAnimationFrame(() => c.ensureDailyDataLoaded?.()));
  },
  exit() {
    if (!i.activeId) {
      a(null);
      return;
    }
    const e = i.activeId;
    r(i.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), i.activeId = null;
    try {
      sessionStorage.removeItem(l);
    } catch {
    }
    a(null), u.releaseFocus(e), g();
  },
  cycle() {
    const e = i.activeId;
    this.enter(t[(t.indexOf(e) + 1) % t.length]);
  }
};
s({ enter: (e) => d.enter(e), exit: () => d.exit() });
export {
  d as f
};
