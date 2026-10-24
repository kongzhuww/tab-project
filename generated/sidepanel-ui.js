import { f as Ct, o as $t, d as It, g as l, h as i, i as s, t as r, x as xt, s as g, q as k, D as U, F as E, z as M, u as T, A as F, k as L, v as Q, b as u, c as at, n as Ut, p as Lt } from "./chunks/vendor-vue-BUkfvXUI.js";
import { t as C } from "./chunks/todoist.service-DeCQ21Vr.js";
import { i as lt, g as St, s as it, l as Dt, t as jt } from "./chunks/quick-links-export.service-bmE4-0fH.js";
import { _ as Pt } from "./chunks/_plugin-vue_export-helper-CHgC5LLL.js";
/* empty css                       */
const Et = { class: "sp-app-root" }, Mt = { class: "sp-viewport sp-view-tools" }, Wt = { class: "sp-page-card" }, At = { class: "sp-page-ico" }, Kt = ["src"], Vt = { key: 1 }, Nt = { class: "sp-page-meta" }, Ot = ["title"], qt = { class: "sp-page-actions" }, Rt = ["disabled", "title"], Bt = ["title"], zt = { class: "picker-label" }, Gt = { class: "picker-arrow" }, Ht = { class: "sp-page-picker-dropdown" }, Ft = { class: "dropdown-header" }, Qt = { class: "dropdown-list" }, Yt = ["onClick"], Xt = { class: "item-icon" }, Jt = { class: "item-text" }, Zt = {
  key: 0,
  class: "item-check"
}, te = { class: "sp-manual-panel" }, ee = { class: "manual-head" }, oe = ["onKeydown"], se = ["onKeydown"], ne = ["disabled"], ae = { class: "sp-tab-switcher-card" }, le = { class: "sp-segment-bar" }, ie = { class: "sp-switcher-view-content" }, ce = { class: "sp-view-subheader" }, ue = { class: "subheader-title" }, de = {
  key: 0,
  class: "tab-status-box muted small"
}, re = {
  key: 1,
  class: "tab-status-box muted small"
}, ve = {
  key: 2,
  class: "tab-group-container"
}, pe = ["onClick"], me = { class: "grp-toggle-arrow" }, he = ["src"], fe = {
  key: 1,
  class: "grp-favicon-fallback"
}, be = { class: "grp-domain-title" }, _e = {
  key: 2,
  class: "grp-domain-sub"
}, ye = { class: "grp-count-badge" }, ge = {
  key: 0,
  class: "tab-group-items"
}, ke = ["title", "onClick"], we = ["src"], Te = {
  key: 1,
  class: "tab-favicon-fallback"
}, Ce = { class: "tab-title-text" }, $e = {
  key: 2,
  class: "tab-current-pill"
}, Ie = ["onClick"], xe = { class: "sp-switcher-view-content todoist-view-body" }, Ue = { class: "sp-view-subheader" }, Le = { class: "subheader-title" }, Se = { class: "sp-page-picker-dropdown todoist-section-dropdown" }, De = { class: "dropdown-header" }, je = { class: "dropdown-list" }, Pe = ["onClick"], Ee = { class: "item-text" }, Me = {
  key: 0,
  class: "item-check"
}, We = { class: "todoist-quick-add-row" }, Ae = ["onKeydown"], Ke = ["disabled"], Ve = {
  key: 0,
  class: "todoist-tasks-scroll"
}, Ne = ["title", "onClick"], Oe = { key: 0 }, qe = ["title"], Re = { class: "todoist-task-title" }, Be = {
  key: 0,
  class: "todoist-task-due"
}, ze = {
  key: 1,
  class: "todoist-empty-state"
}, Ge = {
  key: 2,
  class: "todoist-empty-state"
}, ct = "lw_sidepanel_todoist_mount_key", He = /* @__PURE__ */ Ct({
  __name: "SidePanelApp",
  setup(dt) {
    const $ = u("tabs"), R = u(!1), f = u([]), W = u(/* @__PURE__ */ new Set());
    function Y(o) {
      return W.value.has(o);
    }
    function rt(o) {
      W.value.has(o) ? W.value.delete(o) : W.value.add(o);
    }
    const vt = /* @__PURE__ */ new Set([
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
    function pt(o, e = "") {
      try {
        const t = new URL(o), n = t.hostname.toLowerCase();
        if (t.protocol.includes("extension"))
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
          vt.has(y) ? d = `${c[c.length - 3]}.${y}` : d = `${c[c.length - 2]}.${c[c.length - 1]}`;
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
          if (e) {
            const y = e.split(/[\-_|_—|•]/);
            if (y.length > 1) {
              const H = y[y.length - 1].trim();
              H.length >= 2 && H.length <= 15 && (h = H);
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
    const X = at(() => {
      const o = f.value, e = /* @__PURE__ */ new Map();
      for (const t of o) {
        const { domain: n, title: a, favIcon: c } = pt(t.url || "", t.title || "");
        e.has(n) || e.set(n, {
          domain: n,
          domainTitle: a,
          favIconUrl: c || t.favIconUrl || "",
          tabs: []
        }), e.get(n).tabs.push(t);
      }
      return Array.from(e.values()).sort((t, n) => n.tabs.length - t.tabs.length);
    });
    async function A() {
      if (typeof chrome > "u" || !chrome.tabs?.query) {
        f.value = [
          { id: 1, title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili", url: "https://www.bilibili.com", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !1 },
          { id: 2, title: "Rewrite-番剧-全集-高清独家在线观看-bilibili", url: "https://www.bilibili.com/bangumi/play/ep...", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !0 }
        ];
        return;
      }
      R.value = !0;
      try {
        const o = await chrome.tabs.query({ currentWindow: !0 });
        f.value = o || [];
      } catch {
        f.value = [];
      } finally {
        R.value = !1;
      }
    }
    function mt(o) {
      typeof chrome < "u" && chrome.tabs?.update && o?.id && (chrome.tabs.update(o.id, { active: !0 }), o.windowId && chrome.windows?.update && chrome.windows.update(o.windowId, { focused: !0 }));
    }
    function ht(o) {
      typeof chrome < "u" && chrome.tabs?.remove && o ? chrome.tabs.remove(o).then(() => {
        f.value = f.value.filter((e) => e.id !== o);
      }) : f.value = f.value.filter((e) => e.id !== o);
    }
    const J = u([]), S = u("inbox:"), m = u(null), D = u(!1), j = u(""), B = u(!1);
    async function ft() {
      B.value = !0;
      try {
        const o = localStorage.getItem(ct) || "inbox:";
        S.value = o;
        const [e, t] = await Promise.all([
          C.loadWorkspaceData("inbox").catch(() => null),
          C.loadWorkspaceData("today").catch(() => null)
        ]), n = [];
        if (e?.columns)
          for (const a of e.columns)
            n.push({
              key: `inbox:${a.sectionId || ""}`,
              view: "inbox",
              sectionId: a.sectionId,
              label: `📥 收件箱 · ${a.title}`
            });
        if (t?.columns)
          for (const a of t.columns)
            n.push({
              key: `today:${a.sectionId}`,
              view: "today",
              sectionId: a.sectionId,
              label: `📅 ${a.title}`
            });
        if (e?.projects)
          for (const a of e.projects)
            n.push({
              key: `projects:${a.id}:`,
              view: "projects",
              projectId: String(a.id),
              sectionId: "",
              label: `📁 ${a.name} · 默认板块`
            });
        J.value = n, await Z(o);
      } catch (o) {
        console.warn("[SidePanel] Load Todoist mount data failed:", o);
      } finally {
        B.value = !1;
      }
    }
    async function Z(o) {
      S.value = o;
      try {
        localStorage.setItem(ct, o);
      } catch {
      }
      const [e, t, n] = o.split(":");
      let a = null;
      if (e === "inbox") {
        a = await C.loadWorkspaceData("inbox").catch(() => null);
        const c = t || "";
        m.value = a?.columns?.find((d) => (d.sectionId || "") === c) || a?.columns?.[0] || null;
      } else if (e === "today") {
        a = await C.loadWorkspaceData("today").catch(() => null);
        const c = t || "today";
        m.value = a?.columns?.find((d) => d.sectionId === c) || a?.columns?.[0] || null;
      } else if (e === "projects") {
        const c = t, d = n || "";
        a = await C.loadWorkspaceData("projects", c).catch(() => null), m.value = a?.columns?.find((h) => (h.sectionId || "") === d) || a?.columns?.[0] || null;
      }
    }
    function bt(o) {
      D.value = !1, Z(o.key), p(`已挂载 Todoist 板块「${o.label}」`);
    }
    async function _t(o) {
      const e = !o.completed;
      o.completed = e;
      try {
        await C.toggleTaskCompletion(o.id, e), p(e ? `✓ 已完成「${o.content}」` : `已恢复「${o.content}」`), e && m.value && setTimeout(() => {
          m.value && (m.value.tasks = m.value.tasks.filter((t) => t.id !== o.id));
        }, 400);
      } catch (t) {
        o.completed = !e, p(t?.message || "操作失败", !0);
      }
    }
    async function tt() {
      const o = j.value.trim();
      if (!o) return;
      j.value = "", p("正在创建任务…");
      const [e, t, n] = S.value.split(":"), a = { content: o };
      e === "today" ? a.due_string = "today" : e === "projects" ? (a.project_id = t, n && (a.section_id = n)) : e === "inbox" && t && (a.section_id = t);
      try {
        const c = await C.createTask(a);
        p(`✓ 任务「${o}」创建成功！`), m.value && c && m.value.tasks.unshift({
          id: String(c.id),
          content: c.content,
          completed: !1,
          priority: c.priority || 1,
          dueDate: c.due?.date || "",
          dueText: c.due?.string || ""
        });
      } catch (c) {
        p(c?.message || "创建失败，请检查网络或 Token", !0);
      }
    }
    const P = u(["常用网站"]), et = u({}), v = u("常用网站");
    function _(o) {
      return et.value[o] || (o === "常用网站" ? "常用网站" : o);
    }
    const w = u(!1), K = u(""), ot = u(!1);
    let z = 0;
    function p(o, e = !1) {
      K.value = o, ot.value = e, clearTimeout(z), z = window.setTimeout(() => {
        K.value = "";
      }, 3200);
    }
    const b = u(null), st = u(!1), I = u(!1), x = u(!1), V = u(""), N = u(""), O = u(null), yt = at(() => jt(b.value));
    async function nt() {
      try {
        b.value = await St();
        const o = b.value?.favIconUrl || "";
        st.value = /^https?:|^data:/i.test(o);
      } catch {
      }
    }
    function gt(o) {
      v.value = o, w.value = !1;
      try {
        localStorage.setItem("lw_target_bookmark_page", o);
      } catch {
      }
      p(`已选择目标分区「${_(o)}」`);
    }
    async function kt() {
      if (!lt(b.value)) {
        I.value = !I.value, I.value && (await Ut(), O.value?.focus());
        return;
      }
      x.value = !0, p("正在保存…");
      try {
        const o = await it(b.value, v.value);
        p(
          o.ok ? o.existed ? `该网页已在「${v.value}」中 ✓` : `已成功保存到「${v.value}」 ✓` : o.error || "保存失败",
          !o.ok
        );
      } catch (o) {
        p(o?.message || "保存失败", !0);
      } finally {
        x.value = !1;
      }
    }
    async function G() {
      const o = V.value.trim();
      if (!o) {
        p("请输入网址", !0), O.value?.focus();
        return;
      }
      const e = /^https?:\/\//i.test(o) ? o : `https://${o}`;
      let t;
      try {
        const n = new URL(e);
        if (!/^https?:$/.test(n.protocol) || !n.hostname) throw new Error("协议不受支持");
        t = n.href;
      } catch {
        p("网址格式不正确", !0), O.value?.focus();
        return;
      }
      x.value = !0, p("正在添加…");
      try {
        const n = await it({
          url: t,
          title: N.value.trim() || new URL(t).hostname
        }, v.value);
        p(
          n.ok ? n.existed ? `该网址已在「${v.value}」中 ✓` : `已成功添加到「${v.value}」 ✓` : n.error || "添加失败",
          !n.ok
        ), n.ok && (V.value = "", N.value = "", I.value = !1);
      } catch (n) {
        p(n?.message || "添加失败", !0);
      } finally {
        x.value = !1;
      }
    }
    function wt() {
      chrome.tabs.create({ url: chrome.runtime.getURL("newtab.html"), active: !0 });
    }
    function Tt() {
      try {
        const o = localStorage.getItem("theme") || "light";
        document.documentElement.dataset.theme = o, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.get("theme").then((e) => {
          e?.theme && (document.documentElement.dataset.theme = e.theme);
        });
      } catch {
      }
    }
    function q() {
      nt();
    }
    return $t(() => {
      Tt(), nt(), ft(), A();
      const o = () => {
        Dt().then(({ pages: e, labels: t }) => {
          e && e.length && (P.value = e), et.value = t || {};
          const n = localStorage.getItem("lw_target_bookmark_page");
          n && P.value.includes(n) ? v.value = n : P.value.includes(v.value) || (v.value = P.value[0] || "常用网站");
        });
      };
      o(), typeof chrome < "u" && chrome?.tabs && (chrome.tabs.onActivated?.addListener(q), chrome.tabs.onUpdated?.addListener(q), chrome.tabs.onCreated?.addListener(A), chrome.tabs.onRemoved?.addListener(A)), typeof chrome < "u" && chrome?.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
        t === "local" && (e?.theme?.newValue && (document.documentElement.dataset.theme = e.theme.newValue), (e?.launcherPages || e?.pages || e?.launcherPageLabels || e?.quickLinks) && o());
      });
    }), It(() => {
      clearTimeout(z), typeof chrome < "u" && chrome?.tabs && (chrome.tabs.onActivated?.removeListener(q), chrome.tabs.onUpdated?.removeListener(q));
    }), (o, e) => (l(), i("div", Et, [
      s("header", { class: "sp-global-nav" }, [
        e[12] || (e[12] = s("div", { class: "sp-nav-title" }, [
          s("span", { class: "sp-nav-title-icon" }, "⚡"),
          s("span", { class: "sp-nav-title-text" }, "网页工具与收集箱")
        ], -1)),
        s("button", {
          type: "button",
          class: "sp-nav-icon-btn",
          title: "打开完整新标签页仪表盘",
          onClick: wt
        }, " ⌂ ")
      ]),
      s("main", Mt, [
        s("div", Wt, [
          s("div", At, [
            st.value && b.value?.favIconUrl ? (l(), i("img", {
              key: 0,
              src: b.value.favIconUrl,
              alt: ""
            }, null, 8, Kt)) : (l(), i("span", Vt, "🌐"))
          ]),
          s("div", Nt, [
            e[13] || (e[13] = s("small", null, "当前活跃标签页", -1)),
            s("strong", {
              title: b.value?.title
            }, r(b.value?.title || "正在读取网页…"), 9, Ot),
            s("span", null, r(yt.value || "内部或本地页面"), 1)
          ]),
          s("div", qt, [
            s("button", {
              class: "sp-collect-btn",
              type: "button",
              disabled: x.value,
              title: xt(lt)(b.value) ? `一键收藏至「${v.value}」` : `手动添加到「${v.value}」`,
              onClick: kt
            }, " ⭐ 收藏 ", 8, Rt),
            s("button", {
              class: g(["sp-target-picker-btn", { active: w.value }]),
              type: "button",
              title: `点击切换保存分区（当前：${_(v.value)}）`,
              onClick: e[0] || (e[0] = (t) => w.value = !w.value)
            }, [
              s("span", zt, r(_(v.value)), 1),
              s("span", Gt, r(w.value ? "▲" : "▼"), 1)
            ], 10, Bt)
          ])
        ]),
        k(s("div", Ht, [
          s("div", Ft, [
            e[14] || (e[14] = s("span", null, "切换目标保存分区", -1)),
            s("button", {
              type: "button",
              title: "关闭",
              onClick: e[1] || (e[1] = (t) => w.value = !1)
            }, "✕")
          ]),
          s("div", Qt, [
            (l(!0), i(E, null, M(P.value, (t) => (l(), i("button", {
              key: t,
              type: "button",
              class: g(["dropdown-item", { selected: t === v.value }]),
              onClick: (n) => gt(t)
            }, [
              s("span", Xt, r(t === "常用网站" ? "⭐" : _(t).includes("游戏") ? "🎮" : _(t).includes("办公") ? "💼" : _(t).includes("实验") ? "🧪" : _(t).includes("就业") ? "🎯" : _(t).includes("工具") ? "🛠️" : "📁"), 1),
              s("span", Jt, r(_(t)), 1),
              t === v.value ? (l(), i("span", Zt, "✓")) : T("", !0)
            ], 10, Yt))), 128))
          ])
        ], 512), [
          [U, w.value]
        ]),
        k(s("div", te, [
          s("div", ee, [
            e[15] || (e[15] = s("span", null, "✏️ 手动输入网址", -1)),
            s("button", {
              type: "button",
              onClick: e[2] || (e[2] = (t) => I.value = !1)
            }, "✕")
          ]),
          k(s("input", {
            ref_key: "manualUrlInput",
            ref: O,
            "onUpdate:modelValue": e[3] || (e[3] = (t) => V.value = t),
            type: "text",
            placeholder: "如 bilibili.com 或 https://...",
            onKeydown: F(L(G, ["prevent"]), ["enter"])
          }, null, 40, oe), [
            [Q, V.value]
          ]),
          k(s("input", {
            "onUpdate:modelValue": e[4] || (e[4] = (t) => N.value = t),
            type: "text",
            placeholder: "网站名称（选填）",
            onKeydown: F(L(G, ["prevent"]), ["enter"])
          }, null, 40, se), [
            [Q, N.value]
          ]),
          s("button", {
            class: "manual-submit-btn",
            type: "button",
            disabled: x.value,
            onClick: G
          }, " 确定添加 ", 8, ne)
        ], 512), [
          [U, I.value]
        ]),
        s("div", ae, [
          s("div", le, [
            s("button", {
              type: "button",
              class: g(["sp-segment-item", { active: $.value === "tabs" }]),
              onClick: e[5] || (e[5] = (t) => $.value = "tabs")
            }, " 📑 打开的标签页 (" + r(f.value.length) + ") ", 3),
            s("button", {
              type: "button",
              class: g(["sp-segment-item", { active: $.value === "todoist" }]),
              onClick: e[6] || (e[6] = (t) => $.value = "todoist")
            }, " 📋 Todoist 待办 ", 2)
          ]),
          k(s("div", ie, [
            s("div", ce, [
              s("span", ue, "全网智能聚合 (" + r(X.value.length) + " 个分组)", 1),
              s("button", {
                type: "button",
                class: "sp-tab-refresh-btn",
                title: "刷新标签页列表",
                onClick: L(A, ["stop"])
              }, " ↻ 刷新 ")
            ]),
            R.value ? (l(), i("div", de, [...e[16] || (e[16] = [
              s("span", null, "正在读取标签页…", -1)
            ])])) : f.value.length === 0 ? (l(), i("div", re, [...e[17] || (e[17] = [
              s("span", null, "暂无打开的标签页", -1)
            ])])) : (l(), i("div", ve, [
              (l(!0), i(E, null, M(X.value, (t) => (l(), i("div", {
                key: t.domain,
                class: "tab-group-block"
              }, [
                s("div", {
                  class: "tab-group-header",
                  onClick: (n) => rt(t.domain)
                }, [
                  s("span", me, r(Y(t.domain) ? "▶" : "▼"), 1),
                  t.favIconUrl && !t.favIconUrl.startsWith("chrome://") ? (l(), i("img", {
                    key: 0,
                    src: t.favIconUrl,
                    class: "grp-favicon",
                    alt: "",
                    loading: "lazy",
                    onError: e[7] || (e[7] = (n) => n.target.style.display = "none")
                  }, null, 40, he)) : (l(), i("span", fe, "🌐")),
                  s("strong", be, r(t.domainTitle), 1),
                  t.domain !== "tab-project" && t.domain !== t.domainTitle && !t.domainTitle.includes(t.domain) ? (l(), i("small", _e, " (" + r(t.domain) + ") ", 1)) : T("", !0),
                  s("span", ye, r(t.tabs.length), 1)
                ], 8, pe),
                Y(t.domain) ? T("", !0) : (l(), i("div", ge, [
                  (l(!0), i(E, null, M(t.tabs, (n) => (l(), i("div", {
                    key: n.id,
                    class: g(["tab-tree-row", { "is-active-tab": n.active }]),
                    title: `${n.title}
${n.url}`,
                    onClick: (a) => mt(n)
                  }, [
                    n.favIconUrl && !n.favIconUrl.startsWith("chrome://") ? (l(), i("img", {
                      key: 0,
                      src: n.favIconUrl,
                      class: "tab-favicon",
                      alt: "",
                      loading: "lazy",
                      onError: e[8] || (e[8] = (a) => a.target.style.display = "none")
                    }, null, 40, we)) : (l(), i("span", Te, "🌐")),
                    s("span", Ce, r(n.title || "未命名网页"), 1),
                    n.active ? (l(), i("span", $e, "当前")) : T("", !0),
                    s("button", {
                      type: "button",
                      class: "tab-close-btn",
                      title: "关闭此标签页",
                      onClick: L((a) => ht(n.id), ["stop"])
                    }, " ✕ ", 8, Ie)
                  ], 10, ke))), 128))
                ]))
              ]))), 128))
            ]))
          ], 512), [
            [U, $.value === "tabs"]
          ]),
          k(s("div", xe, [
            s("div", Ue, [
              s("span", Le, r(m.value ? m.value.title : "加载中…"), 1),
              s("button", {
                type: "button",
                class: "todoist-switch-btn",
                title: "选择要挂载到侧边栏的板块",
                onClick: e[9] || (e[9] = L((t) => D.value = !D.value, ["stop"]))
              }, " ⚙️ 切换板块 ")
            ]),
            k(s("div", Se, [
              s("div", De, [
                e[18] || (e[18] = s("span", null, "选择挂载到侧边栏的板块", -1)),
                s("button", {
                  type: "button",
                  title: "关闭",
                  onClick: e[10] || (e[10] = (t) => D.value = !1)
                }, "✕")
              ]),
              s("div", je, [
                (l(!0), i(E, null, M(J.value, (t) => (l(), i("button", {
                  key: t.key,
                  type: "button",
                  class: g(["dropdown-item", { selected: t.key === S.value }]),
                  onClick: (n) => bt(t)
                }, [
                  s("span", Ee, r(t.label), 1),
                  t.key === S.value ? (l(), i("span", Me, "✓")) : T("", !0)
                ], 10, Pe))), 128))
              ])
            ], 512), [
              [U, D.value]
            ]),
            s("div", We, [
              k(s("input", {
                "onUpdate:modelValue": e[11] || (e[11] = (t) => j.value = t),
                type: "text",
                placeholder: "随手记任务… 按 Enter 添加",
                class: "todoist-quick-input",
                onKeydown: F(L(tt, ["prevent"]), ["enter"])
              }, null, 40, Ae), [
                [Q, j.value]
              ]),
              s("button", {
                type: "button",
                class: "todoist-quick-submit",
                disabled: !j.value.trim(),
                onClick: tt
              }, " 添加 ", 8, Ke)
            ]),
            m.value && m.value.tasks.length ? (l(), i("div", Ve, [
              (l(!0), i(E, null, M(m.value.tasks, (t) => (l(), i("div", {
                key: t.id,
                class: g(["todoist-task-item", { completed: t.completed }])
              }, [
                s("button", {
                  type: "button",
                  class: g(["todoist-checkbox", { checked: t.completed }]),
                  title: t.completed ? "已完成" : "点击划去完成",
                  onClick: (n) => _t(t)
                }, [
                  t.completed ? (l(), i("span", Oe, "✓")) : T("", !0)
                ], 10, Ne),
                s("div", {
                  class: "todoist-task-content",
                  title: t.content
                }, [
                  s("span", Re, r(t.content), 1),
                  t.dueText ? (l(), i("span", Be, "📅 " + r(t.dueText), 1)) : T("", !0)
                ], 8, qe)
              ], 2))), 128))
            ])) : B.value ? (l(), i("div", ze, " ⏳ 加载任务中… ")) : (l(), i("div", Ge, " ✨ 当前板块暂无待办任务，可在上方随时登记添加 "))
          ], 512), [
            [U, $.value === "todoist"]
          ])
        ])
      ]),
      k(s("div", {
        class: g(["sp-toast", { bad: ot.value }])
      }, r(K.value), 3), [
        [U, K.value]
      ])
    ]));
  }
}), Fe = /* @__PURE__ */ Pt(He, [["__scopeId", "data-v-c3903b8b"]]), ut = document.getElementById("vue-sidepanel-root");
ut && Lt(Fe).mount(ut);
