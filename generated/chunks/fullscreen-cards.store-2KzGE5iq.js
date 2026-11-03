import { r as t, L as c, M as s } from "./view-styles-DTsG8pBj.js";
import { k as a, w as l, g as u } from "./window-manager.store-BD4IokhA.js";
const i = ["todoist", "card-github", "daily-aihot", "daily-bilibili", "daily-youtube", "daily-pricing"];
let o = null;
function f() {
  if (o) return;
  const e = document.querySelector("#hero-background-media video");
  e && !e.paused && (o = e, e.pause());
}
function y() {
  const e = o;
  o = null, e?.isConnected && e.play().catch(() => {
  });
}
const r = {
  get activeId() {
    return t.activeId;
  },
  enter(e) {
    if (!i.includes(e)) return;
    const n = u(e);
    if (n?.lifecycle.canOpen && !n.lifecycle.canOpen()) return;
    t.activeId && a(t.activeId), n && a(e), f();
    try {
      sessionStorage.setItem(c, e);
    } catch {
    }
    t.activeId = e, typeof document < "u" && (document.body.classList.add("has-card-fullscreen"), document.body.dataset.page = "daily");
    const d = window;
    e === "daily-bilibili" && (d.LogicWeaverBiliFavorites?.loadOrganizer?.(), requestAnimationFrame(() => d.ensureDailyDataLoaded?.()));
  },
  exit() {
    if (!t.activeId) return;
    const e = t.activeId;
    a(t.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), t.activeId = null;
    try {
      sessionStorage.removeItem(c);
    } catch {
    }
    typeof document < "u" && (document.body.classList.remove("has-card-fullscreen"), document.body.dataset.page = "home"), l.releaseFocus(e), y();
  },
  cycle() {
    const e = t.activeId;
    this.enter(i[(i.indexOf(e) + 1) % i.length]);
  }
};
s({ enter: (e) => r.enter(e), exit: () => r.exit() });
export {
  r as f
};
