import { d as Le, D as Se, z as Pe, o as d, g as u, h as s, t as i, u as l, C as k, n as T, A as S, F as A, j as K, i as $, m as J, k as P, q as Z, b as p, y as ue, G as je } from "./vendor-vue-D8gPZiit.js";
import { t as x } from "./todoist.service-C09bjqJk.js";
import { i as re, g as Ee, s as pe, l as Me, t as We } from "./quick-links-export.service-bmE4-0fH.js";
import { t as n, _ as Ae } from "./_plugin-vue_export-helper-aCvtv1YP.js";
const Ke = { class: "sp-app-root" }, Oe = { class: "sp-global-nav" }, Ve = { class: "sp-nav-title" }, Be = { class: "sp-nav-title-text" }, qe = ["title"], Ne = { class: "sp-viewport sp-view-tools" }, Re = { class: "sp-page-card" }, ze = { class: "sp-page-ico" }, Ge = ["src"], He = { key: 1 }, Fe = { class: "sp-page-meta" }, Qe = ["title"], Ye = { class: "sp-page-actions" }, Xe = ["disabled", "title"], Je = ["title"], Ze = { class: "picker-label" }, et = { class: "picker-arrow" }, tt = { class: "sp-page-picker-dropdown" }, ot = { class: "dropdown-header" }, st = ["title"], at = { class: "dropdown-list" }, nt = ["onClick"], lt = { class: "item-icon" }, it = { class: "item-text" }, ct = {
  key: 0,
  class: "item-check"
}, dt = { class: "sp-manual-panel" }, ut = { class: "manual-head" }, rt = ["placeholder", "onKeydown"], pt = ["placeholder", "onKeydown"], vt = ["disabled"], mt = { class: "sp-tab-switcher-card" }, ht = { class: "sp-segment-bar" }, ft = { class: "sp-switcher-view-content" }, bt = { class: "sp-view-subheader" }, _t = { class: "subheader-title" }, yt = ["title"], gt = {
  key: 0,
  class: "tab-status-box muted small"
}, wt = {
  key: 1,
  class: "tab-status-box muted small"
}, kt = {
  key: 2,
  class: "tab-group-container"
}, Tt = ["onClick"], Ct = { class: "grp-toggle-arrow" }, It = ["src"], $t = {
  key: 1,
  class: "grp-favicon-fallback"
}, xt = { class: "grp-domain-title" }, Dt = {
  key: 2,
  class: "grp-domain-sub"
}, Ut = { class: "grp-count-badge" }, Lt = {
  key: 0,
  class: "tab-group-items"
}, St = ["title", "onClick"], Pt = ["src"], jt = {
  key: 1,
  class: "tab-favicon-fallback"
}, Et = { class: "tab-title-text" }, Mt = {
  key: 2,
  class: "tab-current-pill"
}, Wt = ["title", "onClick"], At = { class: "sp-switcher-view-content todoist-view-body" }, Kt = { class: "sp-view-subheader" }, Ot = { class: "subheader-title" }, Vt = ["title"], Bt = { class: "sp-page-picker-dropdown todoist-section-dropdown" }, qt = { class: "dropdown-header" }, Nt = ["title"], Rt = { class: "dropdown-list" }, zt = ["onClick"], Gt = { class: "item-text" }, Ht = {
  key: 0,
  class: "item-check"
}, Ft = { class: "todoist-quick-add-row" }, Qt = ["placeholder", "onKeydown"], Yt = ["disabled"], Xt = {
  key: 0,
  class: "todoist-tasks-scroll"
}, Jt = ["title", "onClick"], Zt = { key: 0 }, eo = ["title"], to = { class: "todoist-task-title" }, oo = {
  key: 0,
  class: "todoist-task-due"
}, so = {
  key: 1,
  class: "todoist-empty-state"
}, ao = {
  key: 2,
  class: "todoist-empty-state"
}, ve = "lw_sidepanel_todoist_mount_key", no = /* @__PURE__ */ Le({
  __name: "SidePanelApp",
  props: {
    inDrawer: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(me, { emit: he }) {
    const R = me, fe = he, D = p("tabs"), z = p(!1), _ = p([]), O = p(/* @__PURE__ */ new Set());
    function ee(t) {
      return O.value.has(t);
    }
    function be(t) {
      O.value.has(t) ? O.value.delete(t) : O.value.add(t);
    }
    const _e = /* @__PURE__ */ new Set([
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
    function ye(t, o = "") {
      try {
        const e = new URL(t), a = e.hostname.toLowerCase();
        if (e.protocol.includes("extension"))
          return {
            domain: "tab-project",
            title: "tab-project",
            favIcon: "assets/bilibili.svg"
          };
        if (a === "localhost" || a === "127.0.0.1" || /^192\.168\./.test(a) || /^10\./.test(a) || /^172\.(1[6-9]|2\d|3[01])\./.test(a))
          return { domain: a, title: n("sidepanel.localService", { host: a }) };
        const r = a.split(".");
        let v = a;
        if (r.length >= 3) {
          const w = `${r[r.length - 2]}.${r[r.length - 1]}`;
          _e.has(w) ? v = `${r[r.length - 3]}.${w}` : v = `${r[r.length - 2]}.${r[r.length - 1]}`;
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
              const X = w[w.length - 1].trim();
              X.length >= 2 && X.length <= 15 && (b = X);
            }
          }
          if (!b) {
            const w = v.split(".")[0];
            b = w.charAt(0).toUpperCase() + w.slice(1);
          }
        }
        return { domain: v, title: b };
      } catch {
        return { domain: "other", title: n("sidepanel.otherWeb") };
      }
    }
    const te = ue(() => {
      const t = _.value, o = /* @__PURE__ */ new Map();
      for (const e of t) {
        const { domain: a, title: c, favIcon: r } = ye(e.url || "", e.title || "");
        o.has(a) || o.set(a, {
          domain: a,
          domainTitle: c,
          favIconUrl: r || e.favIconUrl || "",
          tabs: []
        }), o.get(a).tabs.push(e);
      }
      return Array.from(o.values()).sort((e, a) => a.tabs.length - e.tabs.length);
    });
    async function G() {
      if (typeof chrome > "u" || !chrome.tabs?.query) {
        _.value = [
          { id: 1, title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili", url: "https://www.bilibili.com", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !1 },
          { id: 2, title: "Rewrite-番剧-全集-高清独家在线观看-bilibili", url: "https://www.bilibili.com/bangumi/play/ep...", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !0 }
        ];
        return;
      }
      z.value = !0;
      try {
        const t = await chrome.tabs.query({ currentWindow: !0 });
        _.value = t || [];
      } catch {
        _.value = [];
      } finally {
        z.value = !1;
      }
    }
    function ge(t) {
      typeof chrome < "u" && chrome.tabs?.update && t?.id && (chrome.tabs.update(t.id, { active: !0 }), t.windowId && chrome.windows?.update && chrome.windows.update(t.windowId, { focused: !0 }));
    }
    function we(t) {
      typeof chrome < "u" && chrome.tabs?.remove && t ? chrome.tabs.remove(t).then(() => {
        _.value = _.value.filter((o) => o.id !== t);
      }) : _.value = _.value.filter((o) => o.id !== t);
    }
    const oe = p([]), j = p("inbox:"), f = p(null), E = p(!1), M = p(""), H = p(!1);
    async function ke() {
      H.value = !0;
      try {
        const t = localStorage.getItem(ve) || "inbox:";
        j.value = t;
        const [o, e] = await Promise.all([
          x.loadWorkspaceData("inbox").catch(() => null),
          x.loadWorkspaceData("today").catch(() => null)
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
        oe.value = a, await se(t);
      } catch (t) {
        console.warn("[SidePanel] Load Todoist mount data failed:", t);
      } finally {
        H.value = !1;
      }
    }
    async function se(t) {
      j.value = t;
      try {
        localStorage.setItem(ve, t);
      } catch {
      }
      const [o, e, a] = t.split(":");
      let c = null;
      if (o === "inbox") {
        c = await x.loadWorkspaceData("inbox").catch(() => null);
        const r = e || "";
        f.value = c?.columns?.find((v) => (v.sectionId || "") === r) || c?.columns?.[0] || null;
      } else if (o === "today") {
        c = await x.loadWorkspaceData("today").catch(() => null);
        const r = e || "today";
        f.value = c?.columns?.find((v) => v.sectionId === r) || c?.columns?.[0] || null;
      } else if (o === "projects") {
        const r = e, v = a || "";
        c = await x.loadWorkspaceData("projects", r).catch(() => null), f.value = c?.columns?.find((b) => (b.sectionId || "") === v) || c?.columns?.[0] || null;
      }
    }
    function Te(t) {
      E.value = !1, se(t.key), h(`已挂载 Todoist 板块「${t.label}」`);
    }
    async function Ce(t) {
      const o = !t.completed;
      t.completed = o;
      try {
        await x.toggleTaskCompletion(t.id, o), h(o ? `✓ 已完成「${t.content}」` : `已恢复「${t.content}」`), o && f.value && setTimeout(() => {
          f.value && (f.value.tasks = f.value.tasks.filter((e) => e.id !== t.id));
        }, 400);
      } catch (e) {
        t.completed = !o, h(e?.message || "操作失败", !0);
      }
    }
    async function ae() {
      const t = M.value.trim();
      if (!t) return;
      M.value = "", h("正在创建任务…");
      const [o, e, a] = j.value.split(":"), c = { content: t };
      o === "today" ? c.due_string = "today" : o === "projects" ? (c.project_id = e, a && (c.section_id = a)) : o === "inbox" && e && (c.section_id = e);
      try {
        const r = await x.createTask(c);
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
    const W = p(["常用网站"]), ne = p({}), m = p("常用网站");
    function g(t) {
      return ne.value[t] || (t === "常用网站" ? "常用网站" : t);
    }
    const I = p(!1), V = p(""), le = p(!1);
    let F = 0;
    function h(t, o = !1) {
      V.value = t, le.value = o, clearTimeout(F), F = window.setTimeout(() => {
        V.value = "";
      }, 3200);
    }
    const y = p(null), ie = p(!1), U = p(!1), L = p(!1), B = p(""), q = p(""), N = p(null), Ie = ue(() => We(y.value));
    async function ce() {
      try {
        y.value = await Ee();
        const t = y.value?.favIconUrl || "";
        ie.value = /^https?:|^data:/i.test(t);
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
    async function xe() {
      if (!re(y.value)) {
        U.value = !U.value, U.value && (await je(), N.value?.focus());
        return;
      }
      L.value = !0, h("正在保存…");
      try {
        const t = await pe(y.value, m.value);
        h(
          t.ok ? t.existed ? `该网页已在「${m.value}」中 ✓` : `已成功保存到「${m.value}」 ✓` : t.error || "保存失败",
          !t.ok
        );
      } catch (t) {
        h(t?.message || "保存失败", !0);
      } finally {
        L.value = !1;
      }
    }
    async function Q() {
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
      L.value = !0, h("正在添加…");
      try {
        const a = await pe({
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
        L.value = !1;
      }
    }
    function De() {
      if (R.inDrawer) {
        fe("close");
        return;
      }
      chrome.tabs.create({ url: chrome.runtime.getURL("newtab.html"), active: !0 });
    }
    function Ue() {
      try {
        const t = localStorage.getItem("theme") || "light";
        document.documentElement.dataset.theme = t, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.get("theme").then((o) => {
          o?.theme && (document.documentElement.dataset.theme = o.theme);
        });
      } catch {
      }
    }
    let Y = null;
    function C() {
      clearTimeout(Y), Y = setTimeout(() => {
        ce(), G();
      }, 120);
    }
    const de = () => {
      Me().then(({ pages: t, labels: o }) => {
        t && t.length && (W.value = t), ne.value = o || {};
        const e = localStorage.getItem("lw_target_bookmark_page");
        e && W.value.includes(e) ? m.value = e : W.value.includes(m.value) || (m.value = W.value[0] || "常用网站");
      });
    };
    return Se(() => {
      Ue(), ce(), requestAnimationFrame(() => {
        setTimeout(() => {
          G(), ke(), de();
        }, 100);
      }), typeof chrome < "u" && chrome?.tabs && (chrome.tabs.onActivated?.addListener(C), chrome.tabs.onUpdated?.addListener(C), chrome.tabs.onCreated?.addListener(C), chrome.tabs.onRemoved?.addListener(C)), typeof chrome < "u" && chrome?.storage?.onChanged && chrome.storage.onChanged.addListener((t, o) => {
        o === "local" && (t?.theme?.newValue && (document.documentElement.dataset.theme = t.theme.newValue), (t?.launcherPages || t?.pages || t?.launcherPageLabels || t?.quickLinks) && de());
      });
    }), Pe(() => {
      clearTimeout(F), clearTimeout(Y), typeof chrome < "u" && chrome?.tabs && (chrome.tabs.onActivated?.removeListener(C), chrome.tabs.onUpdated?.removeListener(C), chrome.tabs.onCreated?.removeListener(C), chrome.tabs.onRemoved?.removeListener(C));
    }), (t, o) => (d(), u("div", Ke, [
      s("header", Oe, [
        s("div", Ve, [
          o[12] || (o[12] = s("span", { class: "sp-nav-title-icon" }, "⚡", -1)),
          s("span", Be, i(l(n)("sidepanel.title")), 1)
        ]),
        s("button", {
          type: "button",
          class: "sp-nav-icon-btn",
          title: R.inDrawer ? l(n)("sidepanel.closeDrawerTip") : l(n)("sidepanel.openDashboardTip"),
          onClick: De
        }, i(R.inDrawer ? "✕" : "⌂"), 9, qe)
      ]),
      s("main", Ne, [
        s("div", Re, [
          s("div", ze, [
            ie.value && y.value?.favIconUrl ? (d(), u("img", {
              key: 0,
              src: y.value.favIconUrl,
              alt: ""
            }, null, 8, Ge)) : (d(), u("span", He, "🌐"))
          ]),
          s("div", Fe, [
            s("small", null, i(l(n)("sidepanel.activeTab")), 1),
            s("strong", {
              title: y.value?.title
            }, i(y.value?.title || l(n)("sidepanel.readingPage")), 9, Qe),
            s("span", null, i(Ie.value || l(n)("sidepanel.internalPage")), 1)
          ]),
          s("div", Ye, [
            s("button", {
              class: "sp-collect-btn",
              type: "button",
              disabled: L.value,
              title: l(re)(y.value) ? l(n)("sidepanel.collectTipWeb", { page: m.value }) : l(n)("sidepanel.collectTipManual", { page: m.value }),
              onClick: xe
            }, i(l(n)("sidepanel.collectBtn")), 9, Xe),
            s("button", {
              class: k(["sp-target-picker-btn", { active: I.value }]),
              type: "button",
              title: l(n)("sidepanel.switchTargetPartitionTip", { page: g(m.value) }),
              onClick: o[0] || (o[0] = (e) => I.value = !I.value)
            }, [
              s("span", Ze, i(g(m.value)), 1),
              s("span", et, i(I.value ? "▲" : "▼"), 1)
            ], 10, Je)
          ])
        ]),
        T(s("div", tt, [
          s("div", ot, [
            s("span", null, i(l(n)("sidepanel.switchTargetPartition")), 1),
            s("button", {
              type: "button",
              title: l(n)("common.close"),
              onClick: o[1] || (o[1] = (e) => I.value = !1)
            }, "✕", 8, st)
          ]),
          s("div", at, [
            (d(!0), u(A, null, K(W.value, (e) => (d(), u("button", {
              key: e,
              type: "button",
              class: k(["dropdown-item", { selected: e === m.value }]),
              onClick: (a) => $e(e)
            }, [
              s("span", lt, i(e === "常用网站" ? "⭐" : g(e).includes("游戏") ? "🎮" : g(e).includes("办公") ? "💼" : g(e).includes("实验") ? "🧪" : g(e).includes("就业") ? "🎯" : g(e).includes("工具") ? "🛠️" : "📁"), 1),
              s("span", it, i(g(e)), 1),
              e === m.value ? (d(), u("span", ct, "✓")) : $("", !0)
            ], 10, nt))), 128))
          ])
        ], 512), [
          [S, I.value]
        ]),
        T(s("div", dt, [
          s("div", ut, [
            s("span", null, i(l(n)("sidepanel.manualInputTitle")), 1),
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
            placeholder: l(n)("sidepanel.manualUrlPlaceholder"),
            onKeydown: J(P(Q, ["prevent"]), ["enter"])
          }, null, 40, rt), [
            [Z, B.value]
          ]),
          T(s("input", {
            "onUpdate:modelValue": o[4] || (o[4] = (e) => q.value = e),
            type: "text",
            placeholder: l(n)("sidepanel.manualTitlePlaceholder"),
            onKeydown: J(P(Q, ["prevent"]), ["enter"])
          }, null, 40, pt), [
            [Z, q.value]
          ]),
          s("button", {
            class: "manual-submit-btn",
            type: "button",
            disabled: L.value,
            onClick: Q
          }, i(l(n)("sidepanel.manualConfirmBtn")), 9, vt)
        ], 512), [
          [S, U.value]
        ]),
        s("div", mt, [
          s("div", ht, [
            s("button", {
              type: "button",
              class: k(["sp-segment-item", { active: D.value === "tabs" }]),
              onClick: o[5] || (o[5] = (e) => D.value = "tabs")
            }, i(l(n)("sidepanel.tabOpen", { count: _.value.length })), 3),
            s("button", {
              type: "button",
              class: k(["sp-segment-item", { active: D.value === "todoist" }]),
              onClick: o[6] || (o[6] = (e) => D.value = "todoist")
            }, i(l(n)("sidepanel.todoistOpen")), 3)
          ]),
          T(s("div", ft, [
            s("div", bt, [
              s("span", _t, i(l(n)("sidepanel.aggregation", { count: te.value.length })), 1),
              s("button", {
                type: "button",
                class: "sp-tab-refresh-btn",
                title: l(n)("sidepanel.refreshTabsTip"),
                onClick: P(G, ["stop"])
              }, i(l(n)("sidepanel.refreshTabs")), 9, yt)
            ]),
            z.value ? (d(), u("div", gt, [
              s("span", null, i(l(n)("sidepanel.loadingTabs")), 1)
            ])) : _.value.length === 0 ? (d(), u("div", wt, [
              s("span", null, i(l(n)("sidepanel.noTabs")), 1)
            ])) : (d(), u("div", kt, [
              (d(!0), u(A, null, K(te.value, (e) => (d(), u("div", {
                key: e.domain,
                class: "tab-group-block"
              }, [
                s("div", {
                  class: "tab-group-header",
                  onClick: (a) => be(e.domain)
                }, [
                  s("span", Ct, i(ee(e.domain) ? "▶" : "▼"), 1),
                  e.favIconUrl && !e.favIconUrl.startsWith("chrome://") ? (d(), u("img", {
                    key: 0,
                    src: e.favIconUrl,
                    class: "grp-favicon",
                    alt: "",
                    loading: "lazy",
                    onError: o[7] || (o[7] = (a) => a.target.style.display = "none")
                  }, null, 40, It)) : (d(), u("span", $t, "🌐")),
                  s("strong", xt, i(e.domainTitle), 1),
                  e.domain !== "tab-project" && e.domain !== e.domainTitle && !e.domainTitle.includes(e.domain) ? (d(), u("small", Dt, " (" + i(e.domain) + ") ", 1)) : $("", !0),
                  s("span", Ut, i(e.tabs.length), 1)
                ], 8, Tt),
                ee(e.domain) ? $("", !0) : (d(), u("div", Lt, [
                  (d(!0), u(A, null, K(e.tabs, (a) => (d(), u("div", {
                    key: a.id,
                    class: k(["tab-tree-row", { "is-active-tab": a.active }]),
                    title: `${a.title}
${a.url}`,
                    onClick: (c) => ge(a)
                  }, [
                    a.favIconUrl && !a.favIconUrl.startsWith("chrome://") ? (d(), u("img", {
                      key: 0,
                      src: a.favIconUrl,
                      class: "tab-favicon",
                      alt: "",
                      loading: "lazy",
                      onError: o[8] || (o[8] = (c) => c.target.style.display = "none")
                    }, null, 40, Pt)) : (d(), u("span", jt, "🌐")),
                    s("span", Et, i(a.title || l(n)("sidepanel.unnamedPage")), 1),
                    a.active ? (d(), u("span", Mt, i(l(n)("sidepanel.currentTabPill")), 1)) : $("", !0),
                    s("button", {
                      type: "button",
                      class: "tab-close-btn",
                      title: l(n)("sidepanel.closeTabTip"),
                      onClick: P((c) => we(a.id), ["stop"])
                    }, " ✕ ", 8, Wt)
                  ], 10, St))), 128))
                ]))
              ]))), 128))
            ]))
          ], 512), [
            [S, D.value === "tabs"]
          ]),
          T(s("div", At, [
            s("div", Kt, [
              s("span", Ot, i(f.value ? f.value.title : l(n)("common.loading")), 1),
              s("button", {
                type: "button",
                class: "todoist-switch-btn",
                title: l(n)("sidepanel.todoistSwitchTip"),
                onClick: o[9] || (o[9] = P((e) => E.value = !E.value, ["stop"]))
              }, i(l(n)("sidepanel.todoistSwitchBtn")), 9, Vt)
            ]),
            T(s("div", Bt, [
              s("div", qt, [
                s("span", null, i(l(n)("sidepanel.todoistSectionHeader")), 1),
                s("button", {
                  type: "button",
                  title: l(n)("common.close"),
                  onClick: o[10] || (o[10] = (e) => E.value = !1)
                }, "✕", 8, Nt)
              ]),
              s("div", Rt, [
                (d(!0), u(A, null, K(oe.value, (e) => (d(), u("button", {
                  key: e.key,
                  type: "button",
                  class: k(["dropdown-item", { selected: e.key === j.value }]),
                  onClick: (a) => Te(e)
                }, [
                  s("span", Gt, i(e.label), 1),
                  e.key === j.value ? (d(), u("span", Ht, "✓")) : $("", !0)
                ], 10, zt))), 128))
              ])
            ], 512), [
              [S, E.value]
            ]),
            s("div", Ft, [
              T(s("input", {
                "onUpdate:modelValue": o[11] || (o[11] = (e) => M.value = e),
                type: "text",
                placeholder: l(n)("sidepanel.todoistQuickInput"),
                class: "todoist-quick-input",
                onKeydown: J(P(ae, ["prevent"]), ["enter"])
              }, null, 40, Qt), [
                [Z, M.value]
              ]),
              s("button", {
                type: "button",
                class: "todoist-quick-submit",
                disabled: !M.value.trim(),
                onClick: ae
              }, i(l(n)("sidepanel.todoistAddBtn")), 9, Yt)
            ]),
            f.value && f.value.tasks.length ? (d(), u("div", Xt, [
              (d(!0), u(A, null, K(f.value.tasks, (e) => (d(), u("div", {
                key: e.id,
                class: k(["todoist-task-item", { completed: e.completed }])
              }, [
                s("button", {
                  type: "button",
                  class: k(["todoist-checkbox", { checked: e.completed }]),
                  title: e.completed ? l(n)("sidepanel.todoistCheckDone") : l(n)("sidepanel.todoistCheckTip"),
                  onClick: (a) => Ce(e)
                }, [
                  e.completed ? (d(), u("span", Zt, "✓")) : $("", !0)
                ], 10, Jt),
                s("div", {
                  class: "todoist-task-content",
                  title: e.content
                }, [
                  s("span", to, i(e.content), 1),
                  e.dueText ? (d(), u("span", oo, "📅 " + i(e.dueText), 1)) : $("", !0)
                ], 8, eo)
              ], 2))), 128))
            ])) : H.value ? (d(), u("div", so, i(l(n)("sidepanel.todoistLoading")), 1)) : (d(), u("div", ao, i(l(n)("sidepanel.todoistEmpty")), 1))
          ], 512), [
            [S, D.value === "todoist"]
          ])
        ])
      ]),
      T(s("div", {
        class: k(["sp-toast", { bad: le.value }])
      }, i(V.value), 3), [
        [S, V.value]
      ])
    ]));
  }
}), ro = /* @__PURE__ */ Ae(no, [["__scopeId", "data-v-46f0b3b5"]]);
export {
  ro as S
};
