import { C as i, ao as c, ap as l } from "./search.service-lHw6yJW3.js";
import { u as a, w as s, g as u } from "./read-session-C1M3QoXl.js";
const t = ["todoist", "card-github", "daily-aihot", "daily-bilibili", "daily-youtube", "daily-pricing"];
let o = null;
function f() {
  if (o) return;
  const e = document.querySelector("#hero-background-media video");
  e && !e.paused && (o = e, e.pause());
}
function v() {
  const e = o;
  o = null, e?.isConnected && e.play().catch(() => {
  });
}
const d = {
  get activeId() {
    return i.activeId;
  },
  enter(e) {
    if (!t.includes(e)) return;
    const n = u(e);
    if (n?.lifecycle.canOpen && !n.lifecycle.canOpen()) return;
    i.activeId && a(i.activeId), n && a(e), f();
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
