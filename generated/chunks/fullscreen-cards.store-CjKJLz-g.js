import { f as t, i as a, O as d, P as v } from "./search.service-I5ZPPxGy.js";
import { g as u, k as r, w as g } from "./window-manager.store-D2fEf4ic.js";
const o = ["todoist", "card-github", "daily-aihot", "daily-bilibili", "multica"];
let c = null;
function I() {
  if (c) return;
  const e = document.querySelector("#hero-background-media video");
  e && !e.paused && (c = e, e.pause());
}
function m() {
  const e = c;
  c = null, e?.isConnected && e.play().catch(() => {
  });
}
const f = {
  get activeId() {
    return t.activeId;
  },
  enter(e) {
    if (!o.includes(e)) return;
    const i = u(e);
    if (i?.lifecycle.canOpen && !i.lifecycle.canOpen()) return;
    t.activeId && r(t.activeId), i && r(e), I();
    try {
      sessionStorage.setItem(d, e);
    } catch {
    }
    t.activeId = e, a(t.activeId);
    const n = window;
    e === "daily-bilibili" && (n.LogicWeaverBiliFavorites?.loadOrganizer?.(), requestAnimationFrame(() => n.ensureDailyDataLoaded?.()));
  },
  exit() {
    if (!t.activeId) {
      a(null);
      return;
    }
    const e = t.activeId;
    r(t.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), t.activeId = null;
    try {
      sessionStorage.removeItem(d);
    } catch {
    }
    a(null), g.releaseFocus(e), m();
  },
  cycle() {
    const e = t.activeId, i = o.indexOf(e);
    for (let n = 1; n <= o.length; n++) {
      const l = o[(i + n) % o.length], s = u(l);
      if (!s?.lifecycle.canOpen || s.lifecycle.canOpen()) {
        this.enter(l);
        return;
      }
    }
  }
};
v({ enter: (e) => f.enter(e), exit: () => f.exit() });
export {
  t as fullscreenCardState,
  f as fullscreenCardsController
};
