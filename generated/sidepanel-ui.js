import { f as kt, o as Tt, d as Ct, g as l, h as i, i as s, t as r, x as $t, s as y, q as g, D as x, F as j, z as E, u as k, A as H, k as U, v as F, b as u, c as st, n as It, p as xt } from "./chunks/vendor-vue-BUkfvXUI.js";
import { t as T } from "./chunks/todoist.service-DeCQ21Vr.js";
import { l as Ut, i as nt, g as St, s as at, t as Lt } from "./chunks/quick-links-export.service-FAD7mdVP.js";
import { _ as Dt } from "./chunks/_plugin-vue_export-helper-CHgC5LLL.js";
/* empty css                       */
const jt = { class: "sp-app-root" }, Et = { class: "sp-viewport sp-view-tools" }, Mt = { class: "sp-page-card" }, Pt = { class: "sp-page-ico" }, Wt = ["src"], At = { key: 1 }, Kt = { class: "sp-page-meta" }, Vt = ["title"], Ot = { class: "sp-page-actions" }, Nt = ["disabled", "title"], Rt = ["title"], qt = { class: "picker-label" }, Bt = { class: "picker-arrow" }, zt = { class: "sp-page-picker-dropdown" }, Gt = { class: "dropdown-header" }, Ht = { class: "dropdown-list" }, Ft = ["onClick"], Qt = { class: "item-icon" }, Yt = { class: "item-text" }, Xt = {
  key: 0,
  class: "item-check"
}, Jt = { class: "sp-manual-panel" }, Zt = { class: "manual-head" }, te = ["onKeydown"], ee = ["onKeydown"], oe = ["disabled"], se = { class: "sp-tab-switcher-card" }, ne = { class: "sp-segment-bar" }, ae = { class: "sp-switcher-view-content" }, le = { class: "sp-view-subheader" }, ie = { class: "subheader-title" }, ce = {
  key: 0,
  class: "tab-status-box muted small"
}, ue = {
  key: 1,
  class: "tab-status-box muted small"
}, de = {
  key: 2,
  class: "tab-group-container"
}, re = ["onClick"], ve = { class: "grp-toggle-arrow" }, pe = ["src"], me = {
  key: 1,
  class: "grp-favicon-fallback"
}, he = { class: "grp-domain-title" }, fe = {
  key: 2,
  class: "grp-domain-sub"
}, be = { class: "grp-count-badge" }, _e = {
  key: 0,
  class: "tab-group-items"
}, ye = ["title", "onClick"], ge = ["src"], we = {
  key: 1,
  class: "tab-favicon-fallback"
}, ke = { class: "tab-title-text" }, Te = {
  key: 2,
  class: "tab-current-pill"
}, Ce = ["onClick"], $e = { class: "sp-switcher-view-content todoist-view-body" }, Ie = { class: "sp-view-subheader" }, xe = { class: "subheader-title" }, Ue = { class: "sp-page-picker-dropdown todoist-section-dropdown" }, Se = { class: "dropdown-header" }, Le = { class: "dropdown-list" }, De = ["onClick"], je = { class: "item-text" }, Ee = {
  key: 0,
  class: "item-check"
}, Me = { class: "todoist-quick-add-row" }, Pe = ["onKeydown"], We = ["disabled"], Ae = {
  key: 0,
  class: "todoist-tasks-scroll"
}, Ke = ["title", "onClick"], Ve = { key: 0 }, Oe = ["title"], Ne = { class: "todoist-task-title" }, Re = {
  key: 0,
  class: "todoist-task-due"
}, qe = {
  key: 1,
  class: "todoist-empty-state"
}, Be = {
  key: 2,
  class: "todoist-empty-state"
}, lt = "lw_sidepanel_todoist_mount_key", ze = /* @__PURE__ */ kt({
  __name: "SidePanelApp",
  setup(ct) {
    const C = u("tabs"), N = u(!1), f = u([]), M = u(/* @__PURE__ */ new Set());
    function Q(o) {
      return M.value.has(o);
    }
    function ut(o) {
      M.value.has(o) ? M.value.delete(o) : M.value.add(o);
    }
    const dt = /* @__PURE__ */ new Set([
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
    function rt(o, e = "") {
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
          const _ = `${c[c.length - 2]}.${c[c.length - 1]}`;
          dt.has(_) ? d = `${c[c.length - 3]}.${_}` : d = `${c[c.length - 2]}.${c[c.length - 1]}`;
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
            const _ = e.split(/[\-_|_—|•]/);
            if (_.length > 1) {
              const G = _[_.length - 1].trim();
              G.length >= 2 && G.length <= 15 && (h = G);
            }
          }
          if (!h) {
            const _ = d.split(".")[0];
            h = _.charAt(0).toUpperCase() + _.slice(1);
          }
        }
        return { domain: d, title: h };
      } catch {
        return { domain: "other", title: "其它网页" };
      }
    }
    const Y = st(() => {
      const o = f.value, e = /* @__PURE__ */ new Map();
      for (const t of o) {
        const { domain: n, title: a, favIcon: c } = rt(t.url || "", t.title || "");
        e.has(n) || e.set(n, {
          domain: n,
          domainTitle: a,
          favIconUrl: c || t.favIconUrl || "",
          tabs: []
        }), e.get(n).tabs.push(t);
      }
      return Array.from(e.values()).sort((t, n) => n.tabs.length - t.tabs.length);
    });
    async function P() {
      if (typeof chrome > "u" || !chrome.tabs?.query) {
        f.value = [
          { id: 1, title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili", url: "https://www.bilibili.com", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !1 },
          { id: 2, title: "Rewrite-番剧-全集-高清独家在线观看-bilibili", url: "https://www.bilibili.com/bangumi/play/ep...", favIconUrl: "https://www.bilibili.com/favicon.ico", active: !0 }
        ];
        return;
      }
      N.value = !0;
      try {
        const o = await chrome.tabs.query({ currentWindow: !0 });
        f.value = o || [];
      } catch {
        f.value = [];
      } finally {
        N.value = !1;
      }
    }
    function vt(o) {
      typeof chrome < "u" && chrome.tabs?.update && o?.id && (chrome.tabs.update(o.id, { active: !0 }), o.windowId && chrome.windows?.update && chrome.windows.update(o.windowId, { focused: !0 }));
    }
    function pt(o) {
      typeof chrome < "u" && chrome.tabs?.remove && o ? chrome.tabs.remove(o).then(() => {
        f.value = f.value.filter((e) => e.id !== o);
      }) : f.value = f.value.filter((e) => e.id !== o);
    }
    const X = u([]), S = u("inbox:"), p = u(null), L = u(!1), D = u(""), R = u(!1);
    async function mt() {
      R.value = !0;
      try {
        const o = localStorage.getItem(lt) || "inbox:";
        S.value = o;
        const [e, t] = await Promise.all([
          T.loadWorkspaceData("inbox").catch(() => null),
          T.loadWorkspaceData("today").catch(() => null)
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
        X.value = n, await J(o);
      } catch (o) {
        console.warn("[SidePanel] Load Todoist mount data failed:", o);
      } finally {
        R.value = !1;
      }
    }
    async function J(o) {
      S.value = o;
      try {
        localStorage.setItem(lt, o);
      } catch {
      }
      const [e, t, n] = o.split(":");
      let a = null;
      if (e === "inbox") {
        a = await T.loadWorkspaceData("inbox").catch(() => null);
        const c = t || "";
        p.value = a?.columns?.find((d) => (d.sectionId || "") === c) || a?.columns?.[0] || null;
      } else if (e === "today") {
        a = await T.loadWorkspaceData("today").catch(() => null);
        const c = t || "today";
        p.value = a?.columns?.find((d) => d.sectionId === c) || a?.columns?.[0] || null;
      } else if (e === "projects") {
        const c = t, d = n || "";
        a = await T.loadWorkspaceData("projects", c).catch(() => null), p.value = a?.columns?.find((h) => (h.sectionId || "") === d) || a?.columns?.[0] || null;
      }
    }
    function ht(o) {
      L.value = !1, J(o.key), v(`已挂载 Todoist 板块「${o.label}」`);
    }
    async function ft(o) {
      const e = !o.completed;
      o.completed = e;
      try {
        await T.toggleTaskCompletion(o.id, e), v(e ? `✓ 已完成「${o.content}」` : `已恢复「${o.content}」`), e && p.value && setTimeout(() => {
          p.value && (p.value.tasks = p.value.tasks.filter((t) => t.id !== o.id));
        }, 400);
      } catch (t) {
        o.completed = !e, v(t?.message || "操作失败", !0);
      }
    }
    async function Z() {
      const o = D.value.trim();
      if (!o) return;
      D.value = "", v("正在创建任务…");
      const [e, t, n] = S.value.split(":"), a = { content: o };
      e === "today" ? a.due_string = "today" : e === "projects" ? (a.project_id = t, n && (a.section_id = n)) : e === "inbox" && t && (a.section_id = t);
      try {
        const c = await T.createTask(a);
        v(`✓ 任务「${o}」创建成功！`), p.value && c && p.value.tasks.unshift({
          id: String(c.id),
          content: c.content,
          completed: !1,
          priority: c.priority || 1,
          dueDate: c.due?.date || "",
          dueText: c.due?.string || ""
        });
      } catch (c) {
        v(c?.message || "创建失败，请检查网络或 Token", !0);
      }
    }
    const q = u(["常用网站", "游戏区", "办公区", "实验组", "就业区", "工具箱", "办公桌"]), m = u("常用网站"), w = u(!1), W = u(""), tt = u(!1);
    let B = 0;
    function v(o, e = !1) {
      W.value = o, tt.value = e, clearTimeout(B), B = window.setTimeout(() => {
        W.value = "";
      }, 3200);
    }
    const b = u(null), et = u(!1), $ = u(!1), I = u(!1), A = u(""), K = u(""), V = u(null), bt = st(() => Lt(b.value));
    async function ot() {
      try {
        b.value = await St();
        const o = b.value?.favIconUrl || "";
        et.value = /^https?:|^data:/i.test(o);
      } catch {
      }
    }
    function _t(o) {
      m.value = o, w.value = !1;
      try {
        localStorage.setItem("lw_target_bookmark_page", o);
      } catch {
      }
      v(`已选择目标分区「${o}」`);
    }
    async function yt() {
      if (!nt(b.value)) {
        $.value = !$.value, $.value && (await It(), V.value?.focus());
        return;
      }
      I.value = !0, v("正在保存…");
      try {
        const o = await at(b.value, m.value);
        v(
          o.ok ? o.existed ? `该网页已在「${m.value}」中 ✓` : `已成功保存到「${m.value}」 ✓` : o.error || "保存失败",
          !o.ok
        );
      } catch (o) {
        v(o?.message || "保存失败", !0);
      } finally {
        I.value = !1;
      }
    }
    async function z() {
      const o = A.value.trim();
      if (!o) {
        v("请输入网址", !0), V.value?.focus();
        return;
      }
      const e = /^https?:\/\//i.test(o) ? o : `https://${o}`;
      let t;
      try {
        const n = new URL(e);
        if (!/^https?:$/.test(n.protocol) || !n.hostname) throw new Error("协议不受支持");
        t = n.href;
      } catch {
        v("网址格式不正确", !0), V.value?.focus();
        return;
      }
      I.value = !0, v("正在添加…");
      try {
        const n = await at({
          url: t,
          title: K.value.trim() || new URL(t).hostname
        }, m.value);
        v(
          n.ok ? n.existed ? `该网址已在「${m.value}」中 ✓` : `已成功添加到「${m.value}」 ✓` : n.error || "添加失败",
          !n.ok
        ), n.ok && (A.value = "", K.value = "", $.value = !1);
      } catch (n) {
        v(n?.message || "添加失败", !0);
      } finally {
        I.value = !1;
      }
    }
    function gt() {
      chrome.tabs.create({ url: chrome.runtime.getURL("newtab.html"), active: !0 });
    }
    function wt() {
      try {
        const o = localStorage.getItem("theme") || "light";
        document.documentElement.dataset.theme = o, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.get("theme").then((e) => {
          e?.theme && (document.documentElement.dataset.theme = e.theme);
        });
      } catch {
      }
    }
    function O() {
      ot();
    }
    return Tt(() => {
      wt(), ot(), mt(), P(), Ut().then((o) => {
        o && o.length && (q.value = o);
        const e = localStorage.getItem("lw_target_bookmark_page");
        e && q.value.includes(e) && (m.value = e);
      }), typeof chrome < "u" && chrome?.tabs && (chrome.tabs.onActivated?.addListener(O), chrome.tabs.onUpdated?.addListener(O), chrome.tabs.onCreated?.addListener(P), chrome.tabs.onRemoved?.addListener(P)), typeof chrome < "u" && chrome?.storage?.onChanged && chrome.storage.onChanged.addListener((o) => {
        o?.theme?.newValue && (document.documentElement.dataset.theme = o.theme.newValue);
      });
    }), Ct(() => {
      clearTimeout(B), typeof chrome < "u" && chrome?.tabs && (chrome.tabs.onActivated?.removeListener(O), chrome.tabs.onUpdated?.removeListener(O));
    }), (o, e) => (l(), i("div", jt, [
      s("header", { class: "sp-global-nav" }, [
        e[12] || (e[12] = s("div", { class: "sp-nav-title" }, [
          s("span", { class: "sp-nav-title-icon" }, "⚡"),
          s("span", { class: "sp-nav-title-text" }, "网页工具与收集箱")
        ], -1)),
        s("button", {
          type: "button",
          class: "sp-nav-icon-btn",
          title: "打开完整新标签页仪表盘",
          onClick: gt
        }, " ⌂ ")
      ]),
      s("main", Et, [
        s("div", Mt, [
          s("div", Pt, [
            et.value && b.value?.favIconUrl ? (l(), i("img", {
              key: 0,
              src: b.value.favIconUrl,
              alt: ""
            }, null, 8, Wt)) : (l(), i("span", At, "🌐"))
          ]),
          s("div", Kt, [
            e[13] || (e[13] = s("small", null, "当前活跃标签页", -1)),
            s("strong", {
              title: b.value?.title
            }, r(b.value?.title || "正在读取网页…"), 9, Vt),
            s("span", null, r(bt.value || "内部或本地页面"), 1)
          ]),
          s("div", Ot, [
            s("button", {
              class: "sp-collect-btn",
              type: "button",
              disabled: I.value,
              title: $t(nt)(b.value) ? `一键收藏至「${m.value}」` : `手动添加到「${m.value}」`,
              onClick: yt
            }, " ⭐ 收藏 ", 8, Nt),
            s("button", {
              class: y(["sp-target-picker-btn", { active: w.value }]),
              type: "button",
              title: `点击切换保存分区（当前：${m.value}）`,
              onClick: e[0] || (e[0] = (t) => w.value = !w.value)
            }, [
              s("span", qt, r(m.value), 1),
              s("span", Bt, r(w.value ? "▲" : "▼"), 1)
            ], 10, Rt)
          ])
        ]),
        g(s("div", zt, [
          s("div", Gt, [
            e[14] || (e[14] = s("span", null, "切换目标保存分区", -1)),
            s("button", {
              type: "button",
              title: "关闭",
              onClick: e[1] || (e[1] = (t) => w.value = !1)
            }, "✕")
          ]),
          s("div", Ht, [
            (l(!0), i(j, null, E(q.value, (t) => (l(), i("button", {
              key: t,
              type: "button",
              class: y(["dropdown-item", { selected: t === m.value }]),
              onClick: (n) => _t(t)
            }, [
              s("span", Qt, r(t === "常用网站" ? "⭐" : t.includes("游戏") ? "🎮" : t.includes("办公") ? "💼" : t.includes("实验") ? "🧪" : t.includes("就业") ? "🎯" : t.includes("工具") ? "🛠️" : "📁"), 1),
              s("span", Yt, r(t), 1),
              t === m.value ? (l(), i("span", Xt, "✓")) : k("", !0)
            ], 10, Ft))), 128))
          ])
        ], 512), [
          [x, w.value]
        ]),
        g(s("div", Jt, [
          s("div", Zt, [
            e[15] || (e[15] = s("span", null, "✏️ 手动输入网址", -1)),
            s("button", {
              type: "button",
              onClick: e[2] || (e[2] = (t) => $.value = !1)
            }, "✕")
          ]),
          g(s("input", {
            ref_key: "manualUrlInput",
            ref: V,
            "onUpdate:modelValue": e[3] || (e[3] = (t) => A.value = t),
            type: "text",
            placeholder: "如 bilibili.com 或 https://...",
            onKeydown: H(U(z, ["prevent"]), ["enter"])
          }, null, 40, te), [
            [F, A.value]
          ]),
          g(s("input", {
            "onUpdate:modelValue": e[4] || (e[4] = (t) => K.value = t),
            type: "text",
            placeholder: "网站名称（选填）",
            onKeydown: H(U(z, ["prevent"]), ["enter"])
          }, null, 40, ee), [
            [F, K.value]
          ]),
          s("button", {
            class: "manual-submit-btn",
            type: "button",
            disabled: I.value,
            onClick: z
          }, " 确定添加 ", 8, oe)
        ], 512), [
          [x, $.value]
        ]),
        s("div", se, [
          s("div", ne, [
            s("button", {
              type: "button",
              class: y(["sp-segment-item", { active: C.value === "tabs" }]),
              onClick: e[5] || (e[5] = (t) => C.value = "tabs")
            }, " 📑 打开的标签页 (" + r(f.value.length) + ") ", 3),
            s("button", {
              type: "button",
              class: y(["sp-segment-item", { active: C.value === "todoist" }]),
              onClick: e[6] || (e[6] = (t) => C.value = "todoist")
            }, " 📋 Todoist 待办 ", 2)
          ]),
          g(s("div", ae, [
            s("div", le, [
              s("span", ie, "全网智能聚合 (" + r(Y.value.length) + " 个分组)", 1),
              s("button", {
                type: "button",
                class: "sp-tab-refresh-btn",
                title: "刷新标签页列表",
                onClick: U(P, ["stop"])
              }, " ↻ 刷新 ")
            ]),
            N.value ? (l(), i("div", ce, [...e[16] || (e[16] = [
              s("span", null, "正在读取标签页…", -1)
            ])])) : f.value.length === 0 ? (l(), i("div", ue, [...e[17] || (e[17] = [
              s("span", null, "暂无打开的标签页", -1)
            ])])) : (l(), i("div", de, [
              (l(!0), i(j, null, E(Y.value, (t) => (l(), i("div", {
                key: t.domain,
                class: "tab-group-block"
              }, [
                s("div", {
                  class: "tab-group-header",
                  onClick: (n) => ut(t.domain)
                }, [
                  s("span", ve, r(Q(t.domain) ? "▶" : "▼"), 1),
                  t.favIconUrl && !t.favIconUrl.startsWith("chrome://") ? (l(), i("img", {
                    key: 0,
                    src: t.favIconUrl,
                    class: "grp-favicon",
                    alt: "",
                    loading: "lazy",
                    onError: e[7] || (e[7] = (n) => n.target.style.display = "none")
                  }, null, 40, pe)) : (l(), i("span", me, "🌐")),
                  s("strong", he, r(t.domainTitle), 1),
                  t.domain !== "tab-project" && t.domain !== t.domainTitle && !t.domainTitle.includes(t.domain) ? (l(), i("small", fe, " (" + r(t.domain) + ") ", 1)) : k("", !0),
                  s("span", be, r(t.tabs.length), 1)
                ], 8, re),
                Q(t.domain) ? k("", !0) : (l(), i("div", _e, [
                  (l(!0), i(j, null, E(t.tabs, (n) => (l(), i("div", {
                    key: n.id,
                    class: y(["tab-tree-row", { "is-active-tab": n.active }]),
                    title: `${n.title}
${n.url}`,
                    onClick: (a) => vt(n)
                  }, [
                    n.favIconUrl && !n.favIconUrl.startsWith("chrome://") ? (l(), i("img", {
                      key: 0,
                      src: n.favIconUrl,
                      class: "tab-favicon",
                      alt: "",
                      loading: "lazy",
                      onError: e[8] || (e[8] = (a) => a.target.style.display = "none")
                    }, null, 40, ge)) : (l(), i("span", we, "🌐")),
                    s("span", ke, r(n.title || "未命名网页"), 1),
                    n.active ? (l(), i("span", Te, "当前")) : k("", !0),
                    s("button", {
                      type: "button",
                      class: "tab-close-btn",
                      title: "关闭此标签页",
                      onClick: U((a) => pt(n.id), ["stop"])
                    }, " ✕ ", 8, Ce)
                  ], 10, ye))), 128))
                ]))
              ]))), 128))
            ]))
          ], 512), [
            [x, C.value === "tabs"]
          ]),
          g(s("div", $e, [
            s("div", Ie, [
              s("span", xe, r(p.value ? p.value.title : "加载中…"), 1),
              s("button", {
                type: "button",
                class: "todoist-switch-btn",
                title: "选择要挂载到侧边栏的板块",
                onClick: e[9] || (e[9] = U((t) => L.value = !L.value, ["stop"]))
              }, " ⚙️ 切换板块 ")
            ]),
            g(s("div", Ue, [
              s("div", Se, [
                e[18] || (e[18] = s("span", null, "选择挂载到侧边栏的板块", -1)),
                s("button", {
                  type: "button",
                  title: "关闭",
                  onClick: e[10] || (e[10] = (t) => L.value = !1)
                }, "✕")
              ]),
              s("div", Le, [
                (l(!0), i(j, null, E(X.value, (t) => (l(), i("button", {
                  key: t.key,
                  type: "button",
                  class: y(["dropdown-item", { selected: t.key === S.value }]),
                  onClick: (n) => ht(t)
                }, [
                  s("span", je, r(t.label), 1),
                  t.key === S.value ? (l(), i("span", Ee, "✓")) : k("", !0)
                ], 10, De))), 128))
              ])
            ], 512), [
              [x, L.value]
            ]),
            s("div", Me, [
              g(s("input", {
                "onUpdate:modelValue": e[11] || (e[11] = (t) => D.value = t),
                type: "text",
                placeholder: "随手记任务… 按 Enter 添加",
                class: "todoist-quick-input",
                onKeydown: H(U(Z, ["prevent"]), ["enter"])
              }, null, 40, Pe), [
                [F, D.value]
              ]),
              s("button", {
                type: "button",
                class: "todoist-quick-submit",
                disabled: !D.value.trim(),
                onClick: Z
              }, " 添加 ", 8, We)
            ]),
            p.value && p.value.tasks.length ? (l(), i("div", Ae, [
              (l(!0), i(j, null, E(p.value.tasks, (t) => (l(), i("div", {
                key: t.id,
                class: y(["todoist-task-item", { completed: t.completed }])
              }, [
                s("button", {
                  type: "button",
                  class: y(["todoist-checkbox", { checked: t.completed }]),
                  title: t.completed ? "已完成" : "点击划去完成",
                  onClick: (n) => ft(t)
                }, [
                  t.completed ? (l(), i("span", Ve, "✓")) : k("", !0)
                ], 10, Ke),
                s("div", {
                  class: "todoist-task-content",
                  title: t.content
                }, [
                  s("span", Ne, r(t.content), 1),
                  t.dueText ? (l(), i("span", Re, "📅 " + r(t.dueText), 1)) : k("", !0)
                ], 8, Oe)
              ], 2))), 128))
            ])) : R.value ? (l(), i("div", qe, " ⏳ 加载任务中… ")) : (l(), i("div", Be, " ✨ 当前板块暂无待办任务，可在上方随时登记添加 "))
          ], 512), [
            [x, C.value === "todoist"]
          ])
        ])
      ]),
      g(s("div", {
        class: y(["sp-toast", { bad: tt.value }])
      }, r(W.value), 3), [
        [x, W.value]
      ])
    ]));
  }
}), Ge = /* @__PURE__ */ Dt(ze, [["__scopeId", "data-v-e2070de9"]]), it = document.getElementById("vue-sidepanel-root");
it && xt(Ge).mount(it);
