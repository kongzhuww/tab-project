import { d as Ue, D as Le, z as De, o as l, f as i, g as s, t as r, u as Se, C as w, m as g, A as L, F as M, i as W, h as C, l as Y, j as D, p as X, b as u, x as ce, H as je } from "./vendor-vue-wIH4jcna.js";
import { t as $ } from "./todoist.service-BwvB2mGP.js";
import { i as ue, g as Pe, s as de, l as Ee, t as Me } from "./quick-links-export.service-bmE4-0fH.js";
import { _ as We } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const Ae = { class: "sp-app-root" }, Ke = { class: "sp-global-nav" }, Ve = ["title"], Oe = { class: "sp-viewport sp-view-tools" }, Ne = { class: "sp-page-card" }, Re = { class: "sp-page-ico" }, qe = ["src"], Be = { key: 1 }, ze = { class: "sp-page-meta" }, Ge = ["title"], He = { class: "sp-page-actions" }, Fe = ["disabled", "title"], Qe = ["title"], Ye = { class: "picker-label" }, Xe = { class: "picker-arrow" }, Je = { class: "sp-page-picker-dropdown" }, Ze = { class: "dropdown-header" }, et = { class: "dropdown-list" }, tt = ["onClick"], ot = { class: "item-icon" }, st = { class: "item-text" }, nt = {
  key: 0,
  class: "item-check"
}, at = { class: "sp-manual-panel" }, lt = { class: "manual-head" }, it = ["onKeydown"], ct = ["onKeydown"], ut = ["disabled"], dt = { class: "sp-tab-switcher-card" }, rt = { class: "sp-segment-bar" }, vt = { class: "sp-switcher-view-content" }, mt = { class: "sp-view-subheader" }, pt = { class: "subheader-title" }, ht = {
  key: 0,
  class: "tab-status-box muted small"
}, ft = {
  key: 1,
  class: "tab-status-box muted small"
}, bt = {
  key: 2,
  class: "tab-group-container"
}, _t = ["onClick"], yt = { class: "grp-toggle-arrow" }, wt = ["src"], gt = {
  key: 1,
  class: "grp-favicon-fallback"
}, kt = { class: "grp-domain-title" }, Tt = {
  key: 2,
  class: "grp-domain-sub"
}, Ct = { class: "grp-count-badge" }, $t = {
  key: 0,
  class: "tab-group-items"
}, xt = ["title", "onClick"], It = ["src"], Ut = {
  key: 1,
  class: "tab-favicon-fallback"
}, Lt = { class: "tab-title-text" }, Dt = {
  key: 2,
  class: "tab-current-pill"
}, St = ["onClick"], jt = { class: "sp-switcher-view-content todoist-view-body" }, Pt = { class: "sp-view-subheader" }, Et = { class: "subheader-title" }, Mt = { class: "sp-page-picker-dropdown todoist-section-dropdown" }, Wt = { class: "dropdown-header" }, At = { class: "dropdown-list" }, Kt = ["onClick"], Vt = { class: "item-text" }, Ot = {
  key: 0,
  class: "item-check"
}, Nt = { class: "todoist-quick-add-row" }, Rt = ["onKeydown"], qt = ["disabled"], Bt = {
  key: 0,
  class: "todoist-tasks-scroll"
}, zt = ["title", "onClick"], Gt = { key: 0 }, Ht = ["title"], Ft = { class: "todoist-task-title" }, Qt = {
  key: 0,
  class: "todoist-task-due"
}, Yt = {
  key: 1,
  class: "todoist-empty-state"
}, Xt = {
  key: 2,
  class: "todoist-empty-state"
}, re = "lw_sidepanel_todoist_mount_key", Jt = /* @__PURE__ */ Ue({
  __name: "SidePanelApp",
  props: {
    inDrawer: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(ve, { emit: me }) {
    const R = ve, pe = me, x = u("tabs"), q = u(!1), f = u([]), A = u(/* @__PURE__ */ new Set());
    function J(t) {
      return A.value.has(t);
    }
    function he(t) {
      A.value.has(t) ? A.value.delete(t) : A.value.add(t);
    }
    const fe = /* @__PURE__ */ new Set([
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
    function be(t, o = "") {
      try {
        const e = new URL(t), n = e.hostname.toLowerCase();
        if (e.protocol.includes("extension"))
          return {
            domain: "tab-project",
            title: "tab-project 新标签页",
            favIcon: "assets/bilibili.svg"
          };
        if (n === "localhost" || n === "127.0.0.1" || /^192\.168\./.test(n) || /^10\./.test(n) || /^172\.(1[6-9]|2\d|3[01])\./.test(n))
          return { domain: n, title: `局域网服务 (${n})` };
        const c = n.split(".");
        let d = n;
        if (c.length >= 3) {
          const y = `${c[c.length - 2]}.${c[c.length - 1]}`;
          fe.has(y) ? d = `${c[c.length - 3]}.${y}` : d = `${c[c.length - 2]}.${c[c.length - 1]}`;
        } else
          d = n;
        let h = "";
        if (d === "bilibili.com") h = "哔哩哔哩 (Bilibili)";
        else if (d === "github.com") h = "GitHub 开发者";
        else if (d === "youtube.com" || d === "youtu.be") h = "YouTube 视界";
        else if (d === "google.com") h = "Google 搜索与云";
        else if (d === "zhihu.com") h = "知乎";
        else if (d === "v2ex.com") h = "V2EX 社区";
        else if (d === "chaoxing.com") h = "学习通 (超星)";
        else if (d.includes("extensions")) h = "浏览器扩展管理";
        else {
          if (o) {
            const y = o.split(/[\-_|_—|•]/);
            if (y.length > 1) {
              const Q = y[y.length - 1].trim();
              Q.length >= 2 && Q.length <= 15 && (h = Q);
            }
          }
          if (!h) {
            const y = d.split(".")[0];
            h = y.charAt(0).toUpperCase() + y.slice(1);
          }
        }
        return { domain: d, title: h };
      } catch {
        return { domain: "other", title: "其它网页" };
      }
    }
    const Z = ce(() => {
      const t = f.value, o = /* @__PURE__ */ new Map();
      for (const e of t) {
        const { domain: n, title: a, favIcon: c } = be(e.url || "", e.title || "");
        o.has(n) || o.set(n, {
          domain: n,
          domainTitle: a,
          favIconUrl: c || e.favIconUrl || "",
          tabs: []
        }), o.get(n).tabs.push(e);
      }
      return Array.from(o.values()).sort((e, n) => n.tabs.length - e.tabs.length);
    });
    async function B() {
      if (typeof chrome > "u" || !chrome.tabs?.query) {
        f.value = [
          { id: 1, title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili", url: "https://www.bilibili.com", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !1 },
          { id: 2, title: "Rewrite-番剧-全集-高清独家在线观看-bilibili", url: "https://www.bilibili.com/bangumi/play/ep...", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !0 }
        ];
        return;
      }
      q.value = !0;
      try {
        const t = await chrome.tabs.query({ currentWindow: !0 });
        f.value = t || [];
      } catch {
        f.value = [];
      } finally {
        q.value = !1;
      }
    }
    function _e(t) {
      typeof chrome < "u" && chrome.tabs?.update && t?.id && (chrome.tabs.update(t.id, { active: !0 }), t.windowId && chrome.windows?.update && chrome.windows.update(t.windowId, { focused: !0 }));
    }
    function ye(t) {
      typeof chrome < "u" && chrome.tabs?.remove && t ? chrome.tabs.remove(t).then(() => {
        f.value = f.value.filter((o) => o.id !== t);
      }) : f.value = f.value.filter((o) => o.id !== t);
    }
    const ee = u([]), S = u("inbox:"), p = u(null), j = u(!1), P = u(""), z = u(!1);
    async function we() {
      z.value = !0;
      try {
        const t = localStorage.getItem(re) || "inbox:";
        S.value = t;
        const [o, e] = await Promise.all([
          $.loadWorkspaceData("inbox").catch(() => null),
          $.loadWorkspaceData("today").catch(() => null)
        ]), n = [];
        if (o?.columns)
          for (const a of o.columns)
            n.push({
              key: `inbox:${a.sectionId || ""}`,
              view: "inbox",
              sectionId: a.sectionId,
              label: `📥 收件箱 · ${a.title}`
            });
        if (e?.columns)
          for (const a of e.columns)
            n.push({
              key: `today:${a.sectionId}`,
              view: "today",
              sectionId: a.sectionId,
              label: `📅 ${a.title}`
            });
        if (o?.projects)
          for (const a of o.projects)
            n.push({
              key: `projects:${a.id}:`,
              view: "projects",
              projectId: String(a.id),
              sectionId: "",
              label: `📁 ${a.name} · 默认板块`
            });
        ee.value = n, await te(t);
      } catch (t) {
        console.warn("[SidePanel] Load Todoist mount data failed:", t);
      } finally {
        z.value = !1;
      }
    }
    async function te(t) {
      S.value = t;
      try {
        localStorage.setItem(re, t);
      } catch {
      }
      const [o, e, n] = t.split(":");
      let a = null;
      if (o === "inbox") {
        a = await $.loadWorkspaceData("inbox").catch(() => null);
        const c = e || "";
        p.value = a?.columns?.find((d) => (d.sectionId || "") === c) || a?.columns?.[0] || null;
      } else if (o === "today") {
        a = await $.loadWorkspaceData("today").catch(() => null);
        const c = e || "today";
        p.value = a?.columns?.find((d) => d.sectionId === c) || a?.columns?.[0] || null;
      } else if (o === "projects") {
        const c = e, d = n || "";
        a = await $.loadWorkspaceData("projects", c).catch(() => null), p.value = a?.columns?.find((h) => (h.sectionId || "") === d) || a?.columns?.[0] || null;
      }
    }
    function ge(t) {
      j.value = !1, te(t.key), m(`已挂载 Todoist 板块「${t.label}」`);
    }
    async function ke(t) {
      const o = !t.completed;
      t.completed = o;
      try {
        await $.toggleTaskCompletion(t.id, o), m(o ? `✓ 已完成「${t.content}」` : `已恢复「${t.content}」`), o && p.value && setTimeout(() => {
          p.value && (p.value.tasks = p.value.tasks.filter((e) => e.id !== t.id));
        }, 400);
      } catch (e) {
        t.completed = !o, m(e?.message || "操作失败", !0);
      }
    }
    async function oe() {
      const t = P.value.trim();
      if (!t) return;
      P.value = "", m("正在创建任务…");
      const [o, e, n] = S.value.split(":"), a = { content: t };
      o === "today" ? a.due_string = "today" : o === "projects" ? (a.project_id = e, n && (a.section_id = n)) : o === "inbox" && e && (a.section_id = e);
      try {
        const c = await $.createTask(a);
        m(`✓ 任务「${t}」创建成功！`), p.value && c && p.value.tasks.unshift({
          id: String(c.id),
          content: c.content,
          completed: !1,
          priority: c.priority || 1,
          dueDate: c.due?.date || "",
          dueText: c.due?.string || ""
        });
      } catch (c) {
        m(c?.message || "创建失败，请检查网络或 Token", !0);
      }
    }
    const E = u(["常用网站"]), se = u({}), v = u("常用网站");
    function _(t) {
      return se.value[t] || (t === "常用网站" ? "常用网站" : t);
    }
    const T = u(!1), K = u(""), ne = u(!1);
    let G = 0;
    function m(t, o = !1) {
      K.value = t, ne.value = o, clearTimeout(G), G = window.setTimeout(() => {
        K.value = "";
      }, 3200);
    }
    const b = u(null), ae = u(!1), I = u(!1), U = u(!1), V = u(""), O = u(""), N = u(null), Te = ce(() => Me(b.value));
    async function le() {
      try {
        b.value = await Pe();
        const t = b.value?.favIconUrl || "";
        ae.value = /^https?:|^data:/i.test(t);
      } catch {
      }
    }
    function Ce(t) {
      v.value = t, T.value = !1;
      try {
        localStorage.setItem("lw_target_bookmark_page", t);
      } catch {
      }
      m(`已选择目标分区「${_(t)}」`);
    }
    async function $e() {
      if (!ue(b.value)) {
        I.value = !I.value, I.value && (await je(), N.value?.focus());
        return;
      }
      U.value = !0, m("正在保存…");
      try {
        const t = await de(b.value, v.value);
        m(
          t.ok ? t.existed ? `该网页已在「${v.value}」中 ✓` : `已成功保存到「${v.value}」 ✓` : t.error || "保存失败",
          !t.ok
        );
      } catch (t) {
        m(t?.message || "保存失败", !0);
      } finally {
        U.value = !1;
      }
    }
    async function H() {
      const t = V.value.trim();
      if (!t) {
        m("请输入网址", !0), N.value?.focus();
        return;
      }
      const o = /^https?:\/\//i.test(t) ? t : `https://${t}`;
      let e;
      try {
        const n = new URL(o);
        if (!/^https?:$/.test(n.protocol) || !n.hostname) throw new Error("协议不受支持");
        e = n.href;
      } catch {
        m("网址格式不正确", !0), N.value?.focus();
        return;
      }
      U.value = !0, m("正在添加…");
      try {
        const n = await de({
          url: e,
          title: O.value.trim() || new URL(e).hostname
        }, v.value);
        m(
          n.ok ? n.existed ? `该网址已在「${v.value}」中 ✓` : `已成功添加到「${v.value}」 ✓` : n.error || "添加失败",
          !n.ok
        ), n.ok && (V.value = "", O.value = "", I.value = !1);
      } catch (n) {
        m(n?.message || "添加失败", !0);
      } finally {
        U.value = !1;
      }
    }
    function xe() {
      if (R.inDrawer) {
        pe("close");
        return;
      }
      chrome.tabs.create({ url: chrome.runtime.getURL("newtab.html"), active: !0 });
    }
    function Ie() {
      try {
        const t = localStorage.getItem("theme") || "light";
        document.documentElement.dataset.theme = t, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.get("theme").then((o) => {
          o?.theme && (document.documentElement.dataset.theme = o.theme);
        });
      } catch {
      }
    }
    let F = null;
    function k() {
      clearTimeout(F), F = setTimeout(() => {
        le(), B();
      }, 120);
    }
    const ie = () => {
      Ee().then(({ pages: t, labels: o }) => {
        t && t.length && (E.value = t), se.value = o || {};
        const e = localStorage.getItem("lw_target_bookmark_page");
        e && E.value.includes(e) ? v.value = e : E.value.includes(v.value) || (v.value = E.value[0] || "常用网站");
      });
    };
    return Le(() => {
      Ie(), le(), requestAnimationFrame(() => {
        setTimeout(() => {
          B(), we(), ie();
        }, 100);
      }), typeof chrome < "u" && chrome?.tabs && (chrome.tabs.onActivated?.addListener(k), chrome.tabs.onUpdated?.addListener(k), chrome.tabs.onCreated?.addListener(k), chrome.tabs.onRemoved?.addListener(k)), typeof chrome < "u" && chrome?.storage?.onChanged && chrome.storage.onChanged.addListener((t, o) => {
        o === "local" && (t?.theme?.newValue && (document.documentElement.dataset.theme = t.theme.newValue), (t?.launcherPages || t?.pages || t?.launcherPageLabels || t?.quickLinks) && ie());
      });
    }), De(() => {
      clearTimeout(G), clearTimeout(F), typeof chrome < "u" && chrome?.tabs && (chrome.tabs.onActivated?.removeListener(k), chrome.tabs.onUpdated?.removeListener(k), chrome.tabs.onCreated?.removeListener(k), chrome.tabs.onRemoved?.removeListener(k));
    }), (t, o) => (l(), i("div", Ae, [
      s("header", Ke, [
        o[12] || (o[12] = s("div", { class: "sp-nav-title" }, [
          s("span", { class: "sp-nav-title-icon" }, "⚡"),
          s("span", { class: "sp-nav-title-text" }, "网页工具与收集箱")
        ], -1)),
        s("button", {
          type: "button",
          class: "sp-nav-icon-btn",
          title: R.inDrawer ? "关闭侧栏" : "打开完整新标签页仪表盘",
          onClick: xe
        }, r(R.inDrawer ? "✕" : "⌂"), 9, Ve)
      ]),
      s("main", Oe, [
        s("div", Ne, [
          s("div", Re, [
            ae.value && b.value?.favIconUrl ? (l(), i("img", {
              key: 0,
              src: b.value.favIconUrl,
              alt: ""
            }, null, 8, qe)) : (l(), i("span", Be, "🌐"))
          ]),
          s("div", ze, [
            o[13] || (o[13] = s("small", null, "当前活跃标签页", -1)),
            s("strong", {
              title: b.value?.title
            }, r(b.value?.title || "正在读取网页…"), 9, Ge),
            s("span", null, r(Te.value || "内部或本地页面"), 1)
          ]),
          s("div", He, [
            s("button", {
              class: "sp-collect-btn",
              type: "button",
              disabled: U.value,
              title: Se(ue)(b.value) ? `一键收藏至「${v.value}」` : `手动添加到「${v.value}」`,
              onClick: $e
            }, " ⭐ 收藏 ", 8, Fe),
            s("button", {
              class: w(["sp-target-picker-btn", { active: T.value }]),
              type: "button",
              title: `点击切换保存分区（当前：${_(v.value)}）`,
              onClick: o[0] || (o[0] = (e) => T.value = !T.value)
            }, [
              s("span", Ye, r(_(v.value)), 1),
              s("span", Xe, r(T.value ? "▲" : "▼"), 1)
            ], 10, Qe)
          ])
        ]),
        g(s("div", Je, [
          s("div", Ze, [
            o[14] || (o[14] = s("span", null, "切换目标保存分区", -1)),
            s("button", {
              type: "button",
              title: "关闭",
              onClick: o[1] || (o[1] = (e) => T.value = !1)
            }, "✕")
          ]),
          s("div", et, [
            (l(!0), i(M, null, W(E.value, (e) => (l(), i("button", {
              key: e,
              type: "button",
              class: w(["dropdown-item", { selected: e === v.value }]),
              onClick: (n) => Ce(e)
            }, [
              s("span", ot, r(e === "常用网站" ? "⭐" : _(e).includes("游戏") ? "🎮" : _(e).includes("办公") ? "💼" : _(e).includes("实验") ? "🧪" : _(e).includes("就业") ? "🎯" : _(e).includes("工具") ? "🛠️" : "📁"), 1),
              s("span", st, r(_(e)), 1),
              e === v.value ? (l(), i("span", nt, "✓")) : C("", !0)
            ], 10, tt))), 128))
          ])
        ], 512), [
          [L, T.value]
        ]),
        g(s("div", at, [
          s("div", lt, [
            o[15] || (o[15] = s("span", null, "✏️ 手动输入网址", -1)),
            s("button", {
              type: "button",
              onClick: o[2] || (o[2] = (e) => I.value = !1)
            }, "✕")
          ]),
          g(s("input", {
            ref_key: "manualUrlInput",
            ref: N,
            "onUpdate:modelValue": o[3] || (o[3] = (e) => V.value = e),
            type: "text",
            placeholder: "如 bilibili.com 或 https://...",
            onKeydown: Y(D(H, ["prevent"]), ["enter"])
          }, null, 40, it), [
            [X, V.value]
          ]),
          g(s("input", {
            "onUpdate:modelValue": o[4] || (o[4] = (e) => O.value = e),
            type: "text",
            placeholder: "网站名称（选填）",
            onKeydown: Y(D(H, ["prevent"]), ["enter"])
          }, null, 40, ct), [
            [X, O.value]
          ]),
          s("button", {
            class: "manual-submit-btn",
            type: "button",
            disabled: U.value,
            onClick: H
          }, " 确定添加 ", 8, ut)
        ], 512), [
          [L, I.value]
        ]),
        s("div", dt, [
          s("div", rt, [
            s("button", {
              type: "button",
              class: w(["sp-segment-item", { active: x.value === "tabs" }]),
              onClick: o[5] || (o[5] = (e) => x.value = "tabs")
            }, " 📑 打开的标签页 (" + r(f.value.length) + ") ", 3),
            s("button", {
              type: "button",
              class: w(["sp-segment-item", { active: x.value === "todoist" }]),
              onClick: o[6] || (o[6] = (e) => x.value = "todoist")
            }, " 📋 Todoist 待办 ", 2)
          ]),
          g(s("div", vt, [
            s("div", mt, [
              s("span", pt, "全网智能聚合 (" + r(Z.value.length) + " 个分组)", 1),
              s("button", {
                type: "button",
                class: "sp-tab-refresh-btn",
                title: "刷新标签页列表",
                onClick: D(B, ["stop"])
              }, " ↻ 刷新 ")
            ]),
            q.value ? (l(), i("div", ht, [...o[16] || (o[16] = [
              s("span", null, "正在读取标签页…", -1)
            ])])) : f.value.length === 0 ? (l(), i("div", ft, [...o[17] || (o[17] = [
              s("span", null, "暂无打开的标签页", -1)
            ])])) : (l(), i("div", bt, [
              (l(!0), i(M, null, W(Z.value, (e) => (l(), i("div", {
                key: e.domain,
                class: "tab-group-block"
              }, [
                s("div", {
                  class: "tab-group-header",
                  onClick: (n) => he(e.domain)
                }, [
                  s("span", yt, r(J(e.domain) ? "▶" : "▼"), 1),
                  e.favIconUrl && !e.favIconUrl.startsWith("chrome://") ? (l(), i("img", {
                    key: 0,
                    src: e.favIconUrl,
                    class: "grp-favicon",
                    alt: "",
                    loading: "lazy",
                    onError: o[7] || (o[7] = (n) => n.target.style.display = "none")
                  }, null, 40, wt)) : (l(), i("span", gt, "🌐")),
                  s("strong", kt, r(e.domainTitle), 1),
                  e.domain !== "tab-project" && e.domain !== e.domainTitle && !e.domainTitle.includes(e.domain) ? (l(), i("small", Tt, " (" + r(e.domain) + ") ", 1)) : C("", !0),
                  s("span", Ct, r(e.tabs.length), 1)
                ], 8, _t),
                J(e.domain) ? C("", !0) : (l(), i("div", $t, [
                  (l(!0), i(M, null, W(e.tabs, (n) => (l(), i("div", {
                    key: n.id,
                    class: w(["tab-tree-row", { "is-active-tab": n.active }]),
                    title: `${n.title}
${n.url}`,
                    onClick: (a) => _e(n)
                  }, [
                    n.favIconUrl && !n.favIconUrl.startsWith("chrome://") ? (l(), i("img", {
                      key: 0,
                      src: n.favIconUrl,
                      class: "tab-favicon",
                      alt: "",
                      loading: "lazy",
                      onError: o[8] || (o[8] = (a) => a.target.style.display = "none")
                    }, null, 40, It)) : (l(), i("span", Ut, "🌐")),
                    s("span", Lt, r(n.title || "未命名网页"), 1),
                    n.active ? (l(), i("span", Dt, "当前")) : C("", !0),
                    s("button", {
                      type: "button",
                      class: "tab-close-btn",
                      title: "关闭此标签页",
                      onClick: D((a) => ye(n.id), ["stop"])
                    }, " ✕ ", 8, St)
                  ], 10, xt))), 128))
                ]))
              ]))), 128))
            ]))
          ], 512), [
            [L, x.value === "tabs"]
          ]),
          g(s("div", jt, [
            s("div", Pt, [
              s("span", Et, r(p.value ? p.value.title : "加载中…"), 1),
              s("button", {
                type: "button",
                class: "todoist-switch-btn",
                title: "选择要挂载到侧边栏的板块",
                onClick: o[9] || (o[9] = D((e) => j.value = !j.value, ["stop"]))
              }, " ⚙️ 切换板块 ")
            ]),
            g(s("div", Mt, [
              s("div", Wt, [
                o[18] || (o[18] = s("span", null, "选择挂载到侧边栏的板块", -1)),
                s("button", {
                  type: "button",
                  title: "关闭",
                  onClick: o[10] || (o[10] = (e) => j.value = !1)
                }, "✕")
              ]),
              s("div", At, [
                (l(!0), i(M, null, W(ee.value, (e) => (l(), i("button", {
                  key: e.key,
                  type: "button",
                  class: w(["dropdown-item", { selected: e.key === S.value }]),
                  onClick: (n) => ge(e)
                }, [
                  s("span", Vt, r(e.label), 1),
                  e.key === S.value ? (l(), i("span", Ot, "✓")) : C("", !0)
                ], 10, Kt))), 128))
              ])
            ], 512), [
              [L, j.value]
            ]),
            s("div", Nt, [
              g(s("input", {
                "onUpdate:modelValue": o[11] || (o[11] = (e) => P.value = e),
                type: "text",
                placeholder: "随手记任务… 按 Enter 添加",
                class: "todoist-quick-input",
                onKeydown: Y(D(oe, ["prevent"]), ["enter"])
              }, null, 40, Rt), [
                [X, P.value]
              ]),
              s("button", {
                type: "button",
                class: "todoist-quick-submit",
                disabled: !P.value.trim(),
                onClick: oe
              }, " 添加 ", 8, qt)
            ]),
            p.value && p.value.tasks.length ? (l(), i("div", Bt, [
              (l(!0), i(M, null, W(p.value.tasks, (e) => (l(), i("div", {
                key: e.id,
                class: w(["todoist-task-item", { completed: e.completed }])
              }, [
                s("button", {
                  type: "button",
                  class: w(["todoist-checkbox", { checked: e.completed }]),
                  title: e.completed ? "已完成" : "点击划去完成",
                  onClick: (n) => ke(e)
                }, [
                  e.completed ? (l(), i("span", Gt, "✓")) : C("", !0)
                ], 10, zt),
                s("div", {
                  class: "todoist-task-content",
                  title: e.content
                }, [
                  s("span", Ft, r(e.content), 1),
                  e.dueText ? (l(), i("span", Qt, "📅 " + r(e.dueText), 1)) : C("", !0)
                ], 8, Ht)
              ], 2))), 128))
            ])) : z.value ? (l(), i("div", Yt, " ⏳ 加载任务中… ")) : (l(), i("div", Xt, " ✨ 当前板块暂无待办任务，可在上方随时登记添加 "))
          ], 512), [
            [L, x.value === "todoist"]
          ])
        ])
      ]),
      g(s("div", {
        class: w(["sp-toast", { bad: ne.value }])
      }, r(K.value), 3), [
        [L, K.value]
      ])
    ]));
  }
}), so = /* @__PURE__ */ We(Jt, [["__scopeId", "data-v-29be6202"]]);
export {
  so as S
};
