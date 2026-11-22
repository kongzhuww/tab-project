import { d as Le, o as Pe, e as je, f as d, g as u, h as s, t as i, u as n, q as k, p as T, z as L, F as W, i as A, j as x, v as X, k as J, b as p, s as re, x as Ee } from "./vendor-vue-_upDT3S_.js";
import { t as l, o as Z, _ as Me } from "./_plugin-vue_export-helper-DtNgUcga.js";
import { t as $ } from "./todoist.service-DU71_-GO.js";
import { i as pe, g as We, s as ve, l as Ae, t as Oe } from "./quick-links-export.service-BSSTNgxD.js";
import { n as ee } from "./system-theme-B-k5DBhe.js";
const Ve = { class: "sp-app-root" }, Be = { class: "sp-global-nav" }, qe = { class: "sp-nav-title" }, Ne = { class: "sp-nav-title-text" }, Re = ["title"], Ke = { class: "sp-viewport sp-view-tools" }, ze = { class: "sp-page-card" }, Ge = { class: "sp-page-ico" }, He = ["src"], Fe = { key: 1 }, Qe = { class: "sp-page-meta" }, Ye = ["title"], Xe = { class: "sp-page-actions" }, Je = ["disabled", "title"], Ze = ["title"], et = { class: "picker-label" }, tt = { class: "picker-arrow" }, ot = { class: "sp-page-picker-dropdown" }, st = { class: "dropdown-header" }, at = ["title"], nt = { class: "dropdown-list" }, lt = ["onClick"], it = { class: "item-icon" }, ct = { class: "item-text" }, dt = {
  key: 0,
  class: "item-check"
}, ut = { class: "sp-manual-panel" }, rt = { class: "manual-head" }, pt = ["placeholder"], vt = ["placeholder"], mt = ["disabled"], ht = { class: "sp-tab-switcher-card" }, ft = { class: "sp-segment-bar" }, bt = { class: "sp-switcher-view-content" }, _t = { class: "sp-view-subheader" }, yt = { class: "subheader-title" }, gt = ["title"], wt = {
  key: 0,
  class: "tab-status-box muted small"
}, kt = {
  key: 1,
  class: "tab-status-box muted small"
}, Tt = {
  key: 2,
  class: "tab-group-container"
}, Ct = ["onClick"], It = { class: "grp-toggle-arrow" }, xt = ["src"], $t = {
  key: 1,
  class: "grp-favicon-fallback"
}, St = { class: "grp-domain-title" }, Ut = {
  key: 2,
  class: "grp-domain-sub"
}, Dt = { class: "grp-count-badge" }, Lt = {
  key: 0,
  class: "tab-group-items"
}, Pt = ["title", "onClick"], jt = ["src"], Et = {
  key: 1,
  class: "tab-favicon-fallback"
}, Mt = { class: "tab-title-text" }, Wt = {
  key: 2,
  class: "tab-current-pill"
}, At = ["title", "onClick"], Ot = { class: "sp-switcher-view-content todoist-view-body" }, Vt = { class: "sp-view-subheader" }, Bt = { class: "subheader-title" }, qt = ["title"], Nt = { class: "sp-page-picker-dropdown todoist-section-dropdown" }, Rt = { class: "dropdown-header" }, Kt = ["title"], zt = { class: "dropdown-list" }, Gt = ["onClick"], Ht = { class: "item-text" }, Ft = {
  key: 0,
  class: "item-check"
}, Qt = { class: "todoist-quick-add-row" }, Yt = ["placeholder"], Xt = ["disabled"], Jt = {
  key: 0,
  class: "todoist-tasks-scroll"
}, Zt = ["title", "onClick"], eo = { key: 0 }, to = ["title"], oo = { class: "todoist-task-title" }, so = {
  key: 0,
  class: "todoist-task-due"
}, ao = {
  key: 1,
  class: "todoist-empty-state"
}, no = {
  key: 2,
  class: "todoist-empty-state"
}, me = "lw_sidepanel_todoist_mount_key", lo = /* @__PURE__ */ Le({
  __name: "SidePanelApp",
  props: {
    inDrawer: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(he, { emit: fe }) {
    const R = he, be = fe, S = p("tabs"), K = p(!1), _ = p([]), O = p(/* @__PURE__ */ new Set());
    function te(t) {
      return O.value.has(t);
    }
    function _e(t) {
      O.value.has(t) ? O.value.delete(t) : O.value.add(t);
    }
    const ye = /* @__PURE__ */ new Set([
      "com.cn",
      "org.cn",
      "net.cn",
      "gov.cn",
      "edu.cn",
      "co.uk",
      "org.uk",
      "gov.uk",
      "ac.uk",
      "co.jp",
      "ne.jp",
      "ac.jp",
      "go.jp",
      "com.hk",
      "org.hk",
      "edu.hk",
      "com.tw",
      "org.tw",
      "club.tw"
    ]);
    function ge(t, o = "") {
      try {
        const e = new URL(t), a = e.hostname.toLowerCase();
        if (e.protocol.includes("extension"))
          return {
            domain: "tab-project",
            title: "tab-project",
            favIcon: "assets/bilibili.svg"
          };
        if (a === "localhost" || a === "127.0.0.1" || /^192\.168\./.test(a) || /^10\./.test(a) || /^172\.(1[6-9]|2\d|3[01])\./.test(a))
          return { domain: a, title: l("sidepanel.localService", { host: a }) };
        const r = a.split(".");
        let v = a;
        if (r.length >= 3) {
          const w = `${r[r.length - 2]}.${r[r.length - 1]}`;
          ye.has(w) ? v = `${r[r.length - 3]}.${w}` : v = `${r[r.length - 2]}.${r[r.length - 1]}`;
        } else
          v = a;
        let b = "";
        if (v === "bilibili.com") b = "哔哩哔哩 (Bilibili)";
        else if (v === "github.com") b = "GitHub 开发者";
        else if (v === "youtube.com" || v === "youtu.be") b = "YouTube 视界";
        else if (v === "google.com") b = "Google 搜索与云";
        else if (v === "zhihu.com") b = "知乎";
        else if (v === "v2ex.com") b = "V2EX 社区";
        else if (v === "chaoxing.com") b = "学习通 (超星)";
        else if (v.includes("extensions")) b = "浏览器扩展管理";
        else {
          if (o) {
            const w = o.split(/[\-_|_—|•]/);
            if (w.length > 1) {
              const Y = w[w.length - 1].trim();
              Y.length >= 2 && Y.length <= 15 && (b = Y);
            }
          }
          if (!b) {
            const w = v.split(".")[0];
            b = w.charAt(0).toUpperCase() + w.slice(1);
          }
        }
        return { domain: v, title: b };
      } catch {
        return { domain: "other", title: l("sidepanel.otherWeb") };
      }
    }
    const oe = re(() => {
      const t = _.value, o = /* @__PURE__ */ new Map();
      for (const e of t) {
        const { domain: a, title: c, favIcon: r } = ge(e.url || "", e.title || "");
        o.has(a) || o.set(a, {
          domain: a,
          domainTitle: c,
          favIconUrl: r || e.favIconUrl || "",
          tabs: []
        }), o.get(a).tabs.push(e);
      }
      return Array.from(o.values()).sort((e, a) => a.tabs.length - e.tabs.length);
    });
    async function z() {
      if (typeof chrome > "u" || !chrome.tabs?.query) {
        _.value = [
          { id: 1, title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili", url: "https://www.bilibili.com", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !1 },
          { id: 2, title: "Rewrite-番剧-全集-高清独家在线观看-bilibili", url: "https://www.bilibili.com/bangumi/play/ep...", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !0 }
        ];
        return;
      }
      K.value = !0;
      try {
        const t = await chrome.tabs.query({ currentWindow: !0 });
        _.value = t || [];
      } catch {
        _.value = [];
      } finally {
        K.value = !1;
      }
    }
    function we(t) {
      typeof chrome < "u" && chrome.tabs?.update && t?.id && (chrome.tabs.update(t.id, { active: !0 }), t.windowId && chrome.windows?.update && chrome.windows.update(t.windowId, { focused: !0 }));
    }
    function ke(t) {
      typeof chrome < "u" && chrome.tabs?.remove && t ? chrome.tabs.remove(t).then(() => {
        _.value = _.value.filter((o) => o.id !== t);
      }) : _.value = _.value.filter((o) => o.id !== t);
    }
    const se = p([]), P = p("inbox:"), f = p(null), j = p(!1), E = p(""), G = p(!1);
    async function Te() {
      G.value = !0;
      try {
        const t = localStorage.getItem(me) || "inbox:";
        P.value = t;
        const [o, e] = await Promise.all([
          $.loadWorkspaceData("inbox").catch(() => null),
          $.loadWorkspaceData("today").catch(() => null)
        ]), a = [];
        if (o?.columns)
          for (const c of o.columns)
            a.push({
              key: `inbox:${c.sectionId || ""}`,
              view: "inbox",
              sectionId: c.sectionId,
              label: `📥 收件箱 · ${c.title}`
            });
        if (e?.columns)
          for (const c of e.columns)
            a.push({
              key: `today:${c.sectionId}`,
              view: "today",
              sectionId: c.sectionId,
              label: `📅 ${c.title}`
            });
        if (o?.projects)
          for (const c of o.projects)
            a.push({
              key: `projects:${c.id}:`,
              view: "projects",
              projectId: String(c.id),
              sectionId: "",
              label: `📁 ${c.name} · 默认板块`
            });
        se.value = a, await ae(t);
      } catch (t) {
        console.warn("[SidePanel] Load Todoist mount data failed:", t);
      } finally {
        G.value = !1;
      }
    }
    async function ae(t) {
      P.value = t;
      try {
        localStorage.setItem(me, t);
      } catch {
      }
      const [o, e, a] = t.split(":");
      let c = null;
      if (o === "inbox") {
        c = await $.loadWorkspaceData("inbox").catch(() => null);
        const r = e || "";
        f.value = c?.columns?.find((v) => (v.sectionId || "") === r) || c?.columns?.[0] || null;
      } else if (o === "today") {
        c = await $.loadWorkspaceData("today").catch(() => null);
        const r = e || "today";
        f.value = c?.columns?.find((v) => v.sectionId === r) || c?.columns?.[0] || null;
      } else if (o === "projects") {
        const r = e, v = a || "";
        c = await $.loadWorkspaceData("projects", r).catch(() => null), f.value = c?.columns?.find((b) => (b.sectionId || "") === v) || c?.columns?.[0] || null;
      }
    }
    function Ce(t) {
      j.value = !1, ae(t.key), h(`已挂载 Todoist 板块「${t.label}」`);
    }
    async function Ie(t) {
      const o = !t.completed;
      t.completed = o;
      try {
        await $.toggleTaskCompletion(t.id, o), h(o ? `✓ 已完成「${t.content}」` : `已恢复「${t.content}」`), o && f.value && setTimeout(() => {
          f.value && (f.value.tasks = f.value.tasks.filter((e) => e.id !== t.id));
        }, 400);
      } catch (e) {
        t.completed = !o, h(e?.message || "操作失败", !0);
      }
    }
    async function ne() {
      const t = E.value.trim();
      if (!t) return;
      E.value = "", h("正在创建任务…");
      const [o, e, a] = P.value.split(":"), c = { content: t };
      o === "today" ? c.due_string = "today" : o === "projects" ? (c.project_id = e, a && (c.section_id = a)) : o === "inbox" && e && (c.section_id = e);
      try {
        const r = await $.createTask(c);
        h(`✓ 任务「${t}」创建成功！`), f.value && r && f.value.tasks.unshift({
          id: String(r.id),
          content: r.content,
          completed: !1,
          priority: r.priority || 1,
          dueDate: r.due?.date || "",
          dueText: r.due?.string || ""
        });
      } catch (r) {
        h(r?.message || "创建失败，请检查网络或 Token", !0);
      }
    }
    const M = p(["常用网站"]), le = p({}), m = p("常用网站");
    function g(t) {
      return le.value[t] || (t === "常用网站" ? "常用网站" : t);
    }
    const I = p(!1), V = p(""), ie = p(!1);
    let H = 0;
    function h(t, o = !1) {
      V.value = t, ie.value = o, clearTimeout(H), H = window.setTimeout(() => {
        V.value = "";
      }, 3200);
    }
    const y = p(null), ce = p(!1), U = p(!1), D = p(!1), B = p(""), q = p(""), N = p(null), xe = re(() => Oe(y.value));
    async function de() {
      try {
        y.value = await We();
        const t = y.value?.favIconUrl || "";
        ce.value = /^https?:|^data:/i.test(t);
      } catch {
      }
    }
    function $e(t) {
      m.value = t, I.value = !1;
      try {
        localStorage.setItem("lw_target_bookmark_page", t);
      } catch {
      }
      h(`已选择目标分区「${g(t)}」`);
    }
    async function Se() {
      if (!pe(y.value)) {
        U.value = !U.value, U.value && (await Ee(), N.value?.focus());
        return;
      }
      D.value = !0, h("正在保存…");
      try {
        const t = await ve(y.value, m.value);
        h(
          t.ok ? t.existed ? `该网页已在「${m.value}」中 ✓` : `已成功保存到「${m.value}」 ✓` : t.error || "保存失败",
          !t.ok
        );
      } catch (t) {
        h(t?.message || "保存失败", !0);
      } finally {
        D.value = !1;
      }
    }
    async function F() {
      const t = B.value.trim();
      if (!t) {
        h("请输入网址", !0), N.value?.focus();
        return;
      }
      const o = /^https?:\/\//i.test(t) ? t : `https://${t}`;
      let e;
      try {
        const a = new URL(o);
        if (!/^https?:$/.test(a.protocol) || !a.hostname) throw new Error("协议不受支持");
        e = a.href;
      } catch {
        h("网址格式不正确", !0), N.value?.focus();
        return;
      }
      D.value = !0, h("正在添加…");
      try {
        const a = await ve({
          url: e,
          title: q.value.trim() || new URL(e).hostname
        }, m.value);
        h(
          a.ok ? a.existed ? `该网址已在「${m.value}」中 ✓` : `已成功添加到「${m.value}」 ✓` : a.error || "添加失败",
          !a.ok
        ), a.ok && (B.value = "", q.value = "", U.value = !1);
      } catch (a) {
        h(a?.message || "添加失败", !0);
      } finally {
        D.value = !1;
      }
    }
    function Ue() {
      if (R.inDrawer) {
        be("close");
        return;
      }
      chrome.tabs.create({ url: chrome.runtime.getURL("newtab.html"), active: !0 });
    }
    function De() {
      try {
        const t = ee(localStorage.getItem("theme"));
        document.documentElement.dataset.theme = t, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.get("theme").then((o) => {
          o?.theme && (document.documentElement.dataset.theme = ee(o.theme));
        });
      } catch {
      }
    }
    let Q = null;
    function C() {
      clearTimeout(Q), Q = setTimeout(() => {
        de(), z();
      }, 120);
    }
    const ue = () => {
      Ae().then(({ pages: t, labels: o }) => {
        t && t.length && (M.value = t), le.value = o || {};
        const e = localStorage.getItem("lw_target_bookmark_page");
        e && M.value.includes(e) ? m.value = e : M.value.includes(m.value) || (m.value = M.value[0] || "常用网站");
      });
    };
    return Pe(() => {
      De(), de(), requestAnimationFrame(() => {
        setTimeout(() => {
          z(), Te(), ue();
        }, 100);
      }), typeof chrome < "u" && chrome?.tabs && (chrome.tabs.onActivated?.addListener(C), chrome.tabs.onUpdated?.addListener(C), chrome.tabs.onCreated?.addListener(C), chrome.tabs.onRemoved?.addListener(C)), typeof chrome < "u" && chrome?.storage?.onChanged && chrome.storage.onChanged.addListener((t, o) => {
        o === "local" && (t?.theme?.newValue && (document.documentElement.dataset.theme = ee(t.theme.newValue)), (t?.launcherPages || t?.pages || t?.launcherPageLabels || t?.quickLinks) && ue());
      });
    }), je(() => {
      clearTimeout(H), clearTimeout(Q), typeof chrome < "u" && chrome?.tabs && (chrome.tabs.onActivated?.removeListener(C), chrome.tabs.onUpdated?.removeListener(C), chrome.tabs.onCreated?.removeListener(C), chrome.tabs.onRemoved?.removeListener(C));
    }), (t, o) => (d(), u("div", Ve, [
      s("header", Be, [
        s("div", qe, [
          o[15] || (o[15] = s("span", { class: "sp-nav-title-icon" }, "⚡", -1)),
          s("span", Ne, i(n(l)("sidepanel.title")), 1)
        ]),
        s("button", {
          type: "button",
          class: "sp-nav-icon-btn",
          title: R.inDrawer ? n(l)("sidepanel.closeDrawerTip") : n(l)("sidepanel.openDashboardTip"),
          onClick: Ue
        }, i(R.inDrawer ? "✕" : "⌂"), 9, Re)
      ]),
      s("main", Ke, [
        s("div", ze, [
          s("div", Ge, [
            ce.value && y.value?.favIconUrl ? (d(), u("img", {
              key: 0,
              src: y.value.favIconUrl,
              alt: ""
            }, null, 8, He)) : (d(), u("span", Fe, "🌐"))
          ]),
          s("div", Qe, [
            s("small", null, i(n(l)("sidepanel.activeTab")), 1),
            s("strong", {
              title: y.value?.title
            }, i(y.value?.title || n(l)("sidepanel.readingPage")), 9, Ye),
            s("span", null, i(xe.value || n(l)("sidepanel.internalPage")), 1)
          ]),
          s("div", Xe, [
            s("button", {
              class: "sp-collect-btn",
              type: "button",
              disabled: D.value,
              title: n(pe)(y.value) ? n(l)("sidepanel.collectTipWeb", { page: m.value }) : n(l)("sidepanel.collectTipManual", { page: m.value }),
              onClick: Se
            }, i(n(l)("sidepanel.collectBtn")), 9, Je),
            s("button", {
              class: k(["sp-target-picker-btn", { active: I.value }]),
              type: "button",
              title: n(l)("sidepanel.switchTargetPartitionTip", { page: g(m.value) }),
              onClick: o[0] || (o[0] = (e) => I.value = !I.value)
            }, [
              s("span", et, i(g(m.value)), 1),
              s("span", tt, i(I.value ? "▲" : "▼"), 1)
            ], 10, Ze)
          ])
        ]),
        T(s("div", ot, [
          s("div", st, [
            s("span", null, i(n(l)("sidepanel.switchTargetPartition")), 1),
            s("button", {
              type: "button",
              title: n(l)("common.close"),
              onClick: o[1] || (o[1] = (e) => I.value = !1)
            }, "✕", 8, at)
          ]),
          s("div", nt, [
            (d(!0), u(W, null, A(M.value, (e) => (d(), u("button", {
              key: e,
              type: "button",
              class: k(["dropdown-item", { selected: e === m.value }]),
              onClick: (a) => $e(e)
            }, [
              s("span", it, i(e === "常用网站" ? "⭐" : g(e).includes("游戏") ? "🎮" : g(e).includes("办公") ? "💼" : g(e).includes("实验") ? "🧪" : g(e).includes("就业") ? "🎯" : g(e).includes("工具") ? "🛠️" : "📁"), 1),
              s("span", ct, i(g(e)), 1),
              e === m.value ? (d(), u("span", dt, "✓")) : x("", !0)
            ], 10, lt))), 128))
          ])
        ], 512), [
          [L, I.value]
        ]),
        T(s("div", ut, [
          s("div", rt, [
            s("span", null, i(n(l)("sidepanel.manualInputTitle")), 1),
            s("button", {
              type: "button",
              onClick: o[2] || (o[2] = (e) => U.value = !1)
            }, "✕")
          ]),
          T(s("input", {
            ref_key: "manualUrlInput",
            ref: N,
            "onUpdate:modelValue": o[3] || (o[3] = (e) => B.value = e),
            type: "text",
            placeholder: n(l)("sidepanel.manualUrlPlaceholder"),
            onKeydown: o[4] || (o[4] = (e) => n(Z)(e, F))
          }, null, 40, pt), [
            [X, B.value]
          ]),
          T(s("input", {
            "onUpdate:modelValue": o[5] || (o[5] = (e) => q.value = e),
            type: "text",
            placeholder: n(l)("sidepanel.manualTitlePlaceholder"),
            onKeydown: o[6] || (o[6] = (e) => n(Z)(e, F))
          }, null, 40, vt), [
            [X, q.value]
          ]),
          s("button", {
            class: "manual-submit-btn",
            type: "button",
            disabled: D.value,
            onClick: F
          }, i(n(l)("sidepanel.manualConfirmBtn")), 9, mt)
        ], 512), [
          [L, U.value]
        ]),
        s("div", ht, [
          s("div", ft, [
            s("button", {
              type: "button",
              class: k(["sp-segment-item", { active: S.value === "tabs" }]),
              onClick: o[7] || (o[7] = (e) => S.value = "tabs")
            }, i(n(l)("sidepanel.tabOpen", { count: _.value.length })), 3),
            s("button", {
              type: "button",
              class: k(["sp-segment-item", { active: S.value === "todoist" }]),
              onClick: o[8] || (o[8] = (e) => S.value = "todoist")
            }, i(n(l)("sidepanel.todoistOpen")), 3)
          ]),
          T(s("div", bt, [
            s("div", _t, [
              s("span", yt, i(n(l)("sidepanel.aggregation", { count: oe.value.length })), 1),
              s("button", {
                type: "button",
                class: "sp-tab-refresh-btn",
                title: n(l)("sidepanel.refreshTabsTip"),
                onClick: J(z, ["stop"])
              }, i(n(l)("sidepanel.refreshTabs")), 9, gt)
            ]),
            K.value ? (d(), u("div", wt, [
              s("span", null, i(n(l)("sidepanel.loadingTabs")), 1)
            ])) : _.value.length === 0 ? (d(), u("div", kt, [
              s("span", null, i(n(l)("sidepanel.noTabs")), 1)
            ])) : (d(), u("div", Tt, [
              (d(!0), u(W, null, A(oe.value, (e) => (d(), u("div", {
                key: e.domain,
                class: "tab-group-block"
              }, [
                s("div", {
                  class: "tab-group-header",
                  onClick: (a) => _e(e.domain)
                }, [
                  s("span", It, i(te(e.domain) ? "▶" : "▼"), 1),
                  e.favIconUrl && !e.favIconUrl.startsWith("chrome://") ? (d(), u("img", {
                    key: 0,
                    src: e.favIconUrl,
                    class: "grp-favicon",
                    alt: "",
                    loading: "lazy",
                    onError: o[9] || (o[9] = (a) => a.target.style.display = "none")
                  }, null, 40, xt)) : (d(), u("span", $t, "🌐")),
                  s("strong", St, i(e.domainTitle), 1),
                  e.domain !== "tab-project" && e.domain !== e.domainTitle && !e.domainTitle.includes(e.domain) ? (d(), u("small", Ut, " (" + i(e.domain) + ") ", 1)) : x("", !0),
                  s("span", Dt, i(e.tabs.length), 1)
                ], 8, Ct),
                te(e.domain) ? x("", !0) : (d(), u("div", Lt, [
                  (d(!0), u(W, null, A(e.tabs, (a) => (d(), u("div", {
                    key: a.id,
                    class: k(["tab-tree-row", { "is-active-tab": a.active }]),
                    title: `${a.title}
${a.url}`,
                    onClick: (c) => we(a)
                  }, [
                    a.favIconUrl && !a.favIconUrl.startsWith("chrome://") ? (d(), u("img", {
                      key: 0,
                      src: a.favIconUrl,
                      class: "tab-favicon",
                      alt: "",
                      loading: "lazy",
                      onError: o[10] || (o[10] = (c) => c.target.style.display = "none")
                    }, null, 40, jt)) : (d(), u("span", Et, "🌐")),
                    s("span", Mt, i(a.title || n(l)("sidepanel.unnamedPage")), 1),
                    a.active ? (d(), u("span", Wt, i(n(l)("sidepanel.currentTabPill")), 1)) : x("", !0),
                    s("button", {
                      type: "button",
                      class: "tab-close-btn",
                      title: n(l)("sidepanel.closeTabTip"),
                      onClick: J((c) => ke(a.id), ["stop"])
                    }, " ✕ ", 8, At)
                  ], 10, Pt))), 128))
                ]))
              ]))), 128))
            ]))
          ], 512), [
            [L, S.value === "tabs"]
          ]),
          T(s("div", Ot, [
            s("div", Vt, [
              s("span", Bt, i(f.value ? f.value.title : n(l)("common.loading")), 1),
              s("button", {
                type: "button",
                class: "todoist-switch-btn",
                title: n(l)("sidepanel.todoistSwitchTip"),
                onClick: o[11] || (o[11] = J((e) => j.value = !j.value, ["stop"]))
              }, i(n(l)("sidepanel.todoistSwitchBtn")), 9, qt)
            ]),
            T(s("div", Nt, [
              s("div", Rt, [
                s("span", null, i(n(l)("sidepanel.todoistSectionHeader")), 1),
                s("button", {
                  type: "button",
                  title: n(l)("common.close"),
                  onClick: o[12] || (o[12] = (e) => j.value = !1)
                }, "✕", 8, Kt)
              ]),
              s("div", zt, [
                (d(!0), u(W, null, A(se.value, (e) => (d(), u("button", {
                  key: e.key,
                  type: "button",
                  class: k(["dropdown-item", { selected: e.key === P.value }]),
                  onClick: (a) => Ce(e)
                }, [
                  s("span", Ht, i(e.label), 1),
                  e.key === P.value ? (d(), u("span", Ft, "✓")) : x("", !0)
                ], 10, Gt))), 128))
              ])
            ], 512), [
              [L, j.value]
            ]),
            s("div", Qt, [
              T(s("input", {
                "onUpdate:modelValue": o[13] || (o[13] = (e) => E.value = e),
                type: "text",
                placeholder: n(l)("sidepanel.todoistQuickInput"),
                class: "todoist-quick-input",
                onKeydown: o[14] || (o[14] = (e) => n(Z)(e, ne))
              }, null, 40, Yt), [
                [X, E.value]
              ]),
              s("button", {
                type: "button",
                class: "todoist-quick-submit",
                disabled: !E.value.trim(),
                onClick: ne
              }, i(n(l)("sidepanel.todoistAddBtn")), 9, Xt)
            ]),
            f.value && f.value.tasks.length ? (d(), u("div", Jt, [
              (d(!0), u(W, null, A(f.value.tasks, (e) => (d(), u("div", {
                key: e.id,
                class: k(["todoist-task-item", { completed: e.completed }])
              }, [
                s("button", {
                  type: "button",
                  class: k(["todoist-checkbox", { checked: e.completed }]),
                  title: e.completed ? n(l)("sidepanel.todoistCheckDone") : n(l)("sidepanel.todoistCheckTip"),
                  onClick: (a) => Ie(e)
                }, [
                  e.completed ? (d(), u("span", eo, "✓")) : x("", !0)
                ], 10, Zt),
                s("div", {
                  class: "todoist-task-content",
                  title: e.content
                }, [
                  s("span", oo, i(e.content), 1),
                  e.dueText ? (d(), u("span", so, "📅 " + i(e.dueText), 1)) : x("", !0)
                ], 8, to)
              ], 2))), 128))
            ])) : G.value ? (d(), u("div", ao, i(n(l)("sidepanel.todoistLoading")), 1)) : (d(), u("div", no, i(n(l)("sidepanel.todoistEmpty")), 1))
          ], 512), [
            [L, S.value === "todoist"]
          ])
        ])
      ]),
      T(s("div", {
        class: k(["sp-toast", { bad: ie.value }])
      }, i(V.value), 3), [
        [L, V.value]
      ])
    ]));
  }
}), vo = /* @__PURE__ */ Me(lo, [["__scopeId", "data-v-9d173c63"]]);
export {
  vo as S
};
