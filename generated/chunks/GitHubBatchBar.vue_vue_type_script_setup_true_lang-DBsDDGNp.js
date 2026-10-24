import { R as Se } from "./read-session-BWENvNUM.js";
import { au as Ee, ah as Ke, aj as Ve, av as L, c as S, at as B, aw as Me, ax as G, f as q, g as J, ay as Je, az as Fe, aA as O, aB as oe, aC as qe, e as T, aD as W, d as Ye, L as Ze, aE as j, aF as ue } from "./search.service-BE0VV64-.js";
import { r as ae, f as V, g as p, h, F as N, x as r, i, t as w, u as C, s as E, w as me, a as Qe, z as ee, A as ie, k as M, b as te, o as Xe, n as et, q as De, v as tt, e as nt, d as ot, l as ve, j as X, I as ke, B as st, T as rt, c as it, y as at, E as lt } from "./vendor-vue-BUkfvXUI.js";
import { _ as Ne } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { C as ct } from "./ChatShareMenu-wOkMwHLf.js";
const x = ae({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), de = /* @__PURE__ */ new Set();
let P;
const F = new Se();
let we = !1;
async function ut(e, s) {
  if (s.throwIfAborted(), new URL(e).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const o = new AbortController(), n = () => o.abort();
  s.addEventListener("abort", n, { once: !0 });
  const a = setTimeout(n, 15e3);
  try {
    const u = await fetch(e, {
      signal: o.signal,
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!u.ok)
      throw u.body?.cancel().catch(() => {
      }), new Error("Source unavailable");
    if (!u.body) throw new Error("Empty public source");
    const b = u.body.getReader(), d = new TextDecoder("utf-8", { fatal: !0 });
    let y = 0, g = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const v = await b.read();
        if (v.done) break;
        if (y += v.value.byteLength, y > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        g += d.decode(v.value, { stream: !0 });
      }
      return o.signal.throwIfAborted(), JSON.parse(g + d.decode());
    } finally {
      b.cancel().catch(() => {
      }), b.releaseLock();
    }
  } finally {
    clearTimeout(a), s.removeEventListener("abort", n);
  }
}
function Ce(e, s) {
  const o = e?.name || e?.repository, n = s ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof n != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(n) || n.split("/").some((d) => d === "." || d === "..")) throw new Error("Invalid repository");
  const [a, u] = n.split("/"), b = (d) => typeof d == "number" && Number.isFinite(d) && d >= 0 ? d : void 0;
  return {
    name: u,
    full_name: n,
    owner: { login: a },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: b(s ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: b(s ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(a)}/${encodeURIComponent(u)}`
  };
}
async function dt(e, s) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let n = "";
  try {
    const b = await Ee(s), { data: d } = await Ke(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: b, signal: s, maxBytes: 2 * 1024 * 1024 });
    if (s.throwIfAborted(), !Array.isArray(d?.items)) throw new Error("Invalid search response");
    return {
      repos: d.items.slice(0, 30).map((y) => Ce(y, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${d.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (b) {
    s.throwIfAborted(), n = b instanceof Ve ? b.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", u = await ut(`https://ghapi.h11.dev/repositories?since=${a}`, s);
  if (s.throwIfAborted(), !Array.isArray(u)) throw new Error("Invalid fallback response");
  return {
    repos: u.slice(0, 30).map((b) => Ce(b, !0)),
    sourceText: `GitHub Search 不可用：${n} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const qn = {
  get state() {
    return x;
  },
  // Only a mounted, visible View may own network work. Returning keeps the
  // previous result/error; an interrupted request requires explicit refresh.
  attachView(e) {
    F.cancel(), x.isLoading = !1, P = e;
    const s = () => {
      P === e && F.pending && (F.cancel(), x.isLoading = !1, x.errorMessage = "读取已暂停，返回后可点击刷新。");
    };
    return e.addEventListener("abort", s, { once: !0 }), !e.aborted && !we && this.refresh(), () => {
      e.removeEventListener("abort", s), P === e && (s(), P = void 0);
    };
  },
  switchTab(e) {
    x.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, s) {
    !P || P.aborted || ![1, 7, 30].includes(e) || e === x.sinceDays || (F.cancel(), Object.assign(x, {
      sinceDays: e,
      rangeText: `近 ${e} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: e, text: x.rangeText }), await this.refresh());
  },
  async refresh() {
    const e = P;
    if (!e || e.aborted || x.isLoading) return;
    const s = x.sinceDays, o = F.begin({
      signal: e,
      timeoutMs: 45e3,
      isCurrent: () => P === e && x.sinceDays === s,
      onStop: (a) => {
        x.isLoading = !1, a === "timeout" && (x.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), n = o.current;
    if (n()) {
      we = !0, x.isLoading = !0, x.errorMessage = "";
      try {
        const a = await o.wait(() => dt(s, o.signal));
        if (!n()) return;
        x.repos = a.repos, x.sourceText = a.sourceText, x.fetchedAt = Date.now(), x.hasLoaded = !0;
      } catch {
        n() && (x.errorMessage = x.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (x.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return de.add(e), () => {
      de.delete(e);
    };
  },
  dispatch(e, s) {
    for (const o of de)
      try {
        o(e, s);
      } catch {
      }
  }
}, gt = {
  key: 0,
  "aria-label": "AI 分析任务"
}, ft = { role: "status" }, pt = ["disabled"], ht = ["disabled"], bt = /* @__PURE__ */ V({
  __name: "GitHubStatus",
  setup(e) {
    function s() {
      Me.update({ actionText: "", actionError: !1 });
    }
    return (o, n) => (p(), h(N, null, [
      r(L).message || r(L).busy ? (p(), h("section", gt, [
        i("p", ft, w(r(L).repo ? `原任务仓库：${r(L).repo}。 ` : "") + w(r(L).message), 1),
        r(L).busy ? (p(), h("button", {
          key: 0,
          type: "button",
          onClick: n[0] || (n[0] = (a) => r(S).stopAiAnalysis())
        }, "停止后续分析 / 中断等待")) : C("", !0),
        r(L).uncertain ? (p(), h(N, { key: 1 }, [
          n[5] || (n[5] = i("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
          r(L).unlockConfirmation ? (p(), h(N, { key: 1 }, [
            n[4] || (n[4] = i("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
            i("button", {
              type: "button",
              disabled: r(L).busy,
              onClick: n[2] || (n[2] = (a) => r(S).acknowledgeAiChecked())
            }, "确认解除本页限制", 8, ht),
            i("button", {
              type: "button",
              onClick: n[3] || (n[3] = (a) => r(L).unlockConfirmation = !1)
            }, "保持限制")
          ], 64)) : (p(), h("button", {
            key: 0,
            type: "button",
            disabled: r(L).busy,
            onClick: n[1] || (n[1] = (a) => r(L).unlockConfirmation = !0)
          }, "我已核对供应商记录", 8, pt))
        ], 64)) : C("", !0)
      ])) : C("", !0),
      r(B).actionText && r(B).actionError ? (p(), h("div", {
        key: 1,
        class: E(["gh-action-status", { error: r(B).actionError }]),
        role: "status"
      }, [
        i("span", null, w(r(B).actionText), 1),
        i("button", {
          type: "button",
          class: "gh-action-status-close",
          title: "关闭提示",
          onClick: s
        }, "✕")
      ], 2)) : C("", !0)
    ], 64));
  }
}), Yn = /* @__PURE__ */ Ne(bt, [["__scopeId", "data-v-8fc895fa"]]), mt = {
  key: 0,
  role: "status",
  style: { "font-size": "12px", color: "var(--danger,#ef4444)", padding: "4px 8px", margin: "0 0 6px 0", "border-radius": "6px", background: "var(--surface)" }
}, yt = {
  key: 0,
  class: "gh-sidebar-divider"
}, vt = {
  key: 1,
  class: "gh-sidebar-caption"
}, kt = ["data-folder", "onClick", "onDragover", "onDragleave", "onDrop"], wt = {
  class: "gh-folder-icon-wrap",
  style: { "font-size": "13px", display: "grid", "place-items": "center" }
}, Ct = { key: 0 }, $t = { key: 1 }, xt = { key: 2 }, _t = {
  key: 3,
  class: "fo-folder-icon",
  style: { color: "currentColor" }
}, Tt = ["title"], At = { class: "gh-folder-count" }, Rt = ["data-del", "onClick", "onKeydown"], Zn = /* @__PURE__ */ V({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const s = e, o = te(""), n = () => {
      o.value = "";
    };
    function a(g) {
      return s.active && !G.busy && q.folders.some((v) => v.title === g && (v.kind === "custom" || v.kind === "uncategorized"));
    }
    me(() => s.active, (g) => {
      n(), window.removeEventListener("dragend", n), window.removeEventListener("drop", n), g && (window.addEventListener("dragend", n), window.addEventListener("drop", n));
    }, { immediate: !0 }), Qe(() => {
      window.removeEventListener("dragend", n), window.removeEventListener("drop", n);
    });
    function u(g, v) {
      g.stopPropagation(), J.delete(v);
    }
    function b(g, v) {
      if (!a(v) || !Array.from(g.dataTransfer?.types || []).includes(Je)) {
        n();
        return;
      }
      g.preventDefault(), g.dataTransfer && (g.dataTransfer.dropEffect = "move"), o.value = v;
    }
    function d(g, v) {
      const m = g.currentTarget;
      m instanceof Node && g.relatedTarget instanceof Node && m.contains(g.relatedTarget) || o.value === v && (o.value = "");
    }
    function y(g, v) {
      if (n(), !a(v)) return;
      const m = Fe(g.dataTransfer);
      m && (g.preventDefault(), g.stopPropagation(), J.dropRepository(m, v));
    }
    return (g, v) => (p(), h(N, null, [
      r(G).message ? (p(), h("p", mt, w(r(G).message), 1)) : C("", !0),
      (p(!0), h(N, null, ee(r(q).folders, (m, $) => (p(), h(N, {
        key: m.title
      }, [
        m.kind === "custom" && r(q).folders[$ - 1]?.kind !== "custom" ? (p(), h("div", yt)) : C("", !0),
        m.kind === "custom" && r(q).folders[$ - 1]?.kind !== "custom" ? (p(), h("div", vt, "我的文件夹")) : C("", !0),
        i("button", {
          type: "button",
          class: E(["gh-bili-folder", { on: m.active, "drag-into": o.value === m.title }]),
          "data-folder": m.title,
          onClick: (A) => r(J).select(m.title),
          onDragover: (A) => b(A, m.title),
          onDragleave: (A) => d(A, m.title),
          onDrop: (A) => y(A, m.title)
        }, [
          i("span", wt, [
            m.kind === "all" ? (p(), h("span", Ct, "⭐")) : m.kind === "used" ? (p(), h("span", $t, "⚡")) : m.kind === "uncategorized" ? (p(), h("span", xt, "📄")) : (p(), h("i", _t))
          ]),
          i("span", {
            class: "gh-folder-name",
            title: m.title
          }, w(m.title), 9, Tt),
          i("small", At, w(m.count), 1),
          m.kind === "custom" ? (p(), h("span", {
            key: 0,
            class: "gh-folder-delete",
            title: "删除文件夹",
            "data-del": m.title,
            role: "button",
            tabindex: "0",
            onClick: (A) => u(A, m.title),
            onKeydown: [
              ie(M((A) => r(J).delete(m.title), ["prevent", "stop"]), ["enter"]),
              ie(M((A) => r(J).delete(m.title), ["prevent", "stop"]), ["space"])
            ]
          }, "✕", 40, Rt)) : C("", !0)
        ], 42, kt)
      ], 64))), 128))
    ], 64));
  }
}), It = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, St = { key: 0 }, Et = { key: 1 }, Mt = { key: 2 }, Dt = {
  key: 3,
  class: "fo-folder-icon"
}, Nt = { class: "gh-bili-heading" }, Lt = { class: "gh-hero-title-row" }, Ut = ["title"], Ht = {
  key: 0,
  class: "gh-hero-inline-status",
  role: "status",
  "aria-live": "polite",
  "aria-atomic": "true"
}, Ot = ["title"], Pt = { id: "gh-hero-desc" }, Gt = { class: "gh-bili-actions" }, Bt = { class: "gh-batch-btn-text" }, zt = /* @__PURE__ */ V({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: s }) {
    const o = s;
    return (n, a) => (p(), h(N, null, [
      i("div", It, [
        r(O).kind === "all" ? (p(), h("span", St, "⭐")) : r(O).kind === "used" ? (p(), h("span", Et, "⚡")) : r(O).kind === "uncategorized" ? (p(), h("span", Mt, "📄")) : (p(), h("i", Dt))
      ]),
      i("div", Nt, [
        i("div", Lt, [
          i("h3", {
            id: "gh-hero-title",
            title: r(O).title
          }, w(r(O).title), 9, Ut),
          r(B).actionText && !r(B).actionError ? (p(), h("div", Ht, [
            i("span", {
              class: "gh-hero-status-text",
              title: r(B).actionText
            }, w(r(B).actionText), 9, Ot),
            i("button", {
              type: "button",
              title: "关闭提示",
              "aria-label": "关闭同步状态提示",
              onClick: a[0] || (a[0] = (u) => r(Me).update({ actionText: "", actionError: !1 }))
            }, "×")
          ])) : C("", !0)
        ]),
        i("p", Pt, w(r(O).description), 1)
      ]),
      i("div", Gt, [
        i("button", {
          id: "gh-ai-analyze-all-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "仅分析当前筛选下已加载且没有摘要的仓库，不代表全部远端收藏",
          onClick: a[1] || (a[1] = (u) => r(oe).analyzeAll())
        }, "✨ AI 分析已加载项"),
        i("button", {
          id: "gh-ai-settings-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "配置 AI 服务（DeepSeek、Gemini、OpenAI等）",
          onClick: a[2] || (a[2] = (u) => o("open-ai-settings"))
        }, "🤖 AI 设置"),
        i("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: E(["gh-hero-btn gh-batch-toggle-btn", { active: r(O).batchMode }]),
          title: "批量多选操作",
          onClick: a[3] || (a[3] = (u) => r(oe).toggleBatch())
        }, [
          a[6] || (a[6] = i("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          i("span", Bt, w(r(O).batchMode ? "返回" : "批量操作"), 1)
        ], 2),
        i("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "只读核对未确认的 Star 状态并刷新列表，不重发远端操作",
          onClick: a[4] || (a[4] = (u) => r(oe).refresh())
        }, "↻ 刷新 / 核对"),
        i("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          onClick: a[5] || (a[5] = (u) => r(oe).createFolder())
        }, "＋ 新建文件夹")
      ])
    ], 64));
  }
}), Qn = /* @__PURE__ */ Ne(zt, [["__scopeId", "data-v-3538adaf"]]), k = ae({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function $e(e, s = !1) {
  if (!e || k.busy) return;
  if (k.repo && k.text !== k.baseline) {
    k.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = S.remarks[e]?.userRemark, n = typeof o == "string" ? o : "";
  Object.assign(k, {
    repo: e,
    baseline: n,
    text: s ? "" : n,
    storedValue: null,
    message: s ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function ge() {
  k.busy || Object.assign(k, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function fe() {
  if (k.busy || !k.repo) return;
  const { repo: e, text: s, baseline: o } = k;
  k.busy = !0;
  try {
    await S.updateRepoRemark(e, { userRemark: s.trim() }, o), Object.assign(k, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (n) {
    k.message = n instanceof Error ? n.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    k.busy = !1;
  }
}
async function xe() {
  if (k.busy || !k.repo) return;
  const e = k.repo;
  k.busy = !0;
  try {
    const o = (await S.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    k.storedValue = o ?? "", k.baseline = o ?? "", k.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (s) {
    k.message = s instanceof Error ? s.message : "读取失败，草稿保留。";
  } finally {
    k.busy = !1;
  }
}
const Wt = ["disabled"], jt = ["disabled"], Kt = ["disabled"], Vt = ["disabled"], Jt = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, _e = /* @__PURE__ */ V({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const s = e, o = te(null);
    return Xe(() => {
      et(() => {
        s.active && !k.busy && o.value?.focus();
      });
    }), (n, a) => (p(), h("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = M(() => {
      }, ["stop"]))
    }, [
      De(i("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": a[0] || (a[0] = (u) => r(k).text = u),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: r(k).busy || !e.active,
        onKeydown: [
          a[1] || (a[1] = ie(M((u) => !u.isComposing && e.active && r(fe)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = ie(M((u) => !u.isComposing && e.active && r(ge)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Wt), [
        [tt, r(k).text]
      ]),
      i("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: r(k).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...u) => r(fe) && r(fe)(...u))
      }, "✓", 8, jt),
      i("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: r(k).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...u) => r(ge) && r(ge)(...u))
      }, "✕", 8, Kt),
      i("button", {
        type: "button",
        disabled: r(k).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...u) => r(xe) && r(xe)(...u))
      }, "读取已保存值", 8, Vt),
      r(k).storedValue !== null ? (p(), h("p", Jt, "已保存值：" + w(r(k).storedValue || "（空）"), 1)) : C("", !0)
    ]));
  }
}), pe = "ghArchifyWebhookUrl";
class z extends Error {
}
function Ft(e) {
  if (e == null || e === "") return "";
  if (typeof e != "string") throw new z("流水线地址格式无效，请在 GitHub 设置中重新填写。");
  const s = e.trim();
  if (!s) return "";
  let o;
  try {
    o = new URL(s);
  } catch {
    throw new z("请填写完整的 HTTP(S) Webhook 地址。");
  }
  if (!["http:", "https:"].includes(o.protocol) || o.username || o.password || o.search || o.hash)
    throw new z("Webhook 只支持 HTTP(S)，不能包含账号密码、查询参数或片段。");
  if (o.pathname === "/") throw new z("请填写完整的 Webhook 路径，而不是 n8n 控制台根地址。");
  return o.href;
}
async function Te() {
  const e = typeof chrome < "u" && chrome.storage?.local ? (await chrome.storage.local.get(pe))[pe] : localStorage.getItem(pe);
  return Ft(e);
}
const t = ae({
  isOpen: !1,
  fullName: "",
  activeTab: "gitingest",
  n8nSubmitting: !1,
  actionBusy: "",
  actionMessage: "",
  n8nResult: null,
  n8nUnlockConfirmation: !1,
  n8nConfirmation: null,
  gitingest: {
    loading: !1,
    progress: "",
    fileCount: 0,
    tokenCount: 0,
    fullText: "",
    treeText: "",
    error: ""
  },
  gitdiagram: {
    loading: !1,
    graph: null,
    mermaidCode: "",
    error: ""
  },
  archify: {
    loading: !1,
    data: null,
    rawJson: "",
    diagramType: "architecture",
    error: ""
  },
  deepwiki: {
    loading: !1,
    wikiMarkdown: "",
    error: ""
  }
}), Xn = nt(t);
let Y = null, be = 0;
function U() {
  be++, Y = null, t.n8nConfirmation = null;
}
function he() {
  return JSON.stringify({ repo: t.fullName, diagramType: t.archify.diagramType, ir: t.archify.data });
}
function qt() {
  if (!t.isOpen || !I || t[t.activeTab].loading) return;
  const e = t.activeTab, s = e === "gitingest" ? t.gitingest.fullText : e === "gitdiagram" ? t.gitdiagram.mermaidCode : e === "archify" ? t.archify.rawJson : t.deepwiki.wikiMarkdown;
  if (!s.trim()) return;
  const o = t.fullName, n = D;
  return { repo: o, tab: e, content: s, current: () => t.isOpen && I && D === n && t.fullName === o && t.activeTab === e };
}
function K() {
  return !!t.actionBusy || t.n8nSubmitting;
}
let I = typeof document < "u" && !document.hidden, D = 0;
const Le = new Se();
let Z;
function Q() {
  Z && Le.cancel();
}
function Ae(e) {
  if (!t.isOpen || !I || t.activeTab !== e || t[e].loading) return;
  Q();
  const s = D, o = Le.begin({
    timeoutMs: 6e4,
    isCurrent: () => D === s && t.isOpen && t.activeTab === e && I,
    onStop: (a) => {
      Z = void 0, t[e].loading = !1, t[e].error = a === "timeout" ? "读取超时，已停止后续请求；可手动重新读取。" : "读取已暂停，可在对应工具中点击重新读取。";
    }
  });
  if (!o.current()) return;
  const n = { kind: e, job: o };
  return Z = n, {
    signal: o.signal,
    current: o.current,
    wait: o.wait,
    finish: () => {
      o.finish() && Z === n && (t[e].loading = !1, Z = void 0);
    }
  };
}
function Re(e, s) {
  if (e?.encoding !== "base64" || typeof e.content != "string" || e.content.length > s * 1.5) throw new Error("Unsupported blob");
  const o = Uint8Array.from(atob(e.content.replace(/\s/g, "")), (a) => a.charCodeAt(0));
  if (o.length > s) throw new Error("Blob too large");
  const n = new TextDecoder("utf-8", { fatal: !0 }).decode(o);
  if (n.includes("\0")) throw new Error("Binary blob");
  return n;
}
const Ie = Ee;
async function se(e, s, o) {
  return (await qe(`https://api.github.com/repos/${e}`, s, o)).data;
}
const Yt = [
  /^\.git\//,
  /node_modules\//,
  /dist\//,
  /build\//,
  /target\//,
  /\.lock$/,
  /lock\.json$/,
  /lock\.yaml$/,
  /\.(png|jpe?g|gif|webp|svg|ico|pdf|zip|tar|gz|7z|woff2?|ttf|eot|mp4|webm|mp3|exe|dll|so|dylib)$/i
];
function Zt(e) {
  return Yt.some((s) => s.test(e));
}
function Qt(e) {
  const s = /* @__PURE__ */ Object.create(null);
  for (const n of e.slice(0, 150)) {
    const a = n.split("/");
    let u = s;
    for (const b of a)
      u[b] || (u[b] = /* @__PURE__ */ Object.create(null)), u = u[b];
  }
  function o(n, a = "") {
    const u = Object.keys(n), b = [];
    return u.forEach((d, y) => {
      const g = y === u.length - 1, v = g ? "└── " : "├── ";
      if (b.push(`${a}${v}${d}`), Object.keys(n[d]).length > 0) {
        const $ = a + (g ? "    " : "│   ");
        b.push(...o(n[d], $));
      }
    }), b;
  }
  return o(s).join(`
`);
}
const re = {
  state: t,
  open(e, s = "gitingest") {
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(e) || e.split("/").some((n) => n === "." || n === "..")) return;
    Q(), ++D, t.actionMessage = "", t.n8nUnlockConfirmation = !1, U();
    const o = t.fullName !== e;
    o && U(), t.fullName = e, t.activeTab = s, t.isOpen = !0, o && (t.gitingest = {
      loading: !1,
      progress: "",
      fileCount: 0,
      tokenCount: 0,
      fullText: "",
      treeText: "",
      error: ""
    }, t.gitdiagram = {
      loading: !1,
      graph: null,
      mermaidCode: "",
      error: ""
    }, t.archify = {
      loading: !1,
      data: null,
      rawJson: "",
      diagramType: "architecture",
      error: ""
    }, t.deepwiki = {
      loading: !1,
      wikiMarkdown: "",
      error: ""
    }), s === "gitingest" && !t.gitingest.fullText ? this.runGitIngest() : s === "gitdiagram" && !t.gitdiagram.mermaidCode ? this.runGitDiagram() : s === "archify" && !t.archify.data ? this.runArchify() : s === "deepwiki" && !t.deepwiki.wikiMarkdown && this.runDeepWiki();
  },
  setPageActive(e) {
    I = e, e || (Q(), ++D, t.actionMessage = "", t.n8nUnlockConfirmation = !1, U());
  },
  refreshCurrent() {
    K() || !t.isOpen || !I || t[t.activeTab].loading || (++D, t.actionMessage = "", t.activeTab === "gitingest" ? this.runGitIngest() : t.activeTab === "deepwiki" ? this.runDeepWiki() : t.activeTab === "gitdiagram" ? this.runGitDiagram() : this.runArchify(t.archify.diagramType));
  },
  close() {
    Q(), ++D, t.actionMessage = "", t.n8nUnlockConfirmation = !1, U(), t.isOpen = !1;
  },
  setTab(e) {
    !t.isOpen || !I || t.activeTab === e || (Q(), ++D, t.actionMessage = "", t.n8nUnlockConfirmation = !1, U(), t.activeTab = e, e === "gitingest" && !t.gitingest.fullText ? this.runGitIngest() : e === "gitdiagram" && !t.gitdiagram.mermaidCode ? this.runGitDiagram() : e === "archify" && !t.archify.data ? this.runArchify() : e === "deepwiki" && !t.deepwiki.wikiMarkdown && this.runDeepWiki());
  },
  /**
   * 📦 本地 GitIngest：递归抓取文件树并组装适合 LLM 的 Prompt 文本
   */
  async runGitIngest() {
    const e = Ae("gitingest");
    if (!e) return;
    const s = t.fullName;
    U(), Object.assign(t.gitdiagram, { graph: null, mermaidCode: "", error: "" }), Object.assign(t.archify, { data: null, rawJson: "", error: "" }), Object.assign(t.gitingest, { loading: !0, progress: "正在读取仓库目录快照…", error: "", fullText: "", treeText: "", fileCount: 0, tokenCount: 0 });
    try {
      const o = await e.wait(() => Ie(e.signal));
      if (e.signal.throwIfAborted(), !e.current()) return;
      const n = s.split("/").map(encodeURIComponent).join("/"), a = await e.wait(() => se(n, o, e.signal));
      if (e.signal.throwIfAborted(), !e.current()) return;
      if (typeof a?.default_branch != "string") throw new Error("Missing branch");
      const u = a.default_branch, b = await e.wait(() => se(`${n}/git/trees/${encodeURIComponent(u)}?recursive=1`, o, e.signal));
      if (e.signal.throwIfAborted(), !e.current()) return;
      if (!Array.isArray(b?.tree)) throw new Error("Invalid tree");
      const d = b.tree.filter((R) => R?.type === "blob" && typeof R.path == "string" && !Zt(R.path)), y = d.map((R) => R.path), g = Qt(y);
      t.gitingest.treeText = g, t.gitingest.fileCount = y.length;
      const v = d.filter((R) => {
        const H = R.path.toLowerCase();
        return typeof R.size == "number" && R.size <= 65536 && /^[0-9a-f]{40,64}$/i.test(R.sha || "") && (H.startsWith("readme") || ["package.json", "cargo.toml", "pyproject.toml", "go.mod"].includes(H) || H.startsWith("src/") || /\.(ts|py|go|rs)$/.test(H));
      }).slice(0, 18);
      let m = `Repository: ${s}
Default branch: ${u}
Source: GitHub Git Tree + immutable blobs
Tree truncated by API: ${!!b.truncated}
Eligible paths returned: ${y.length}; directory preview: first 150 paths
Selected files: ${v.length}; each <=64KiB, shown at most 8000 characters
This is a local sample, not a complete repository or AI analysis.

${g}

`, $ = 0, A = 0;
      for (const R of v) {
        if (e.signal.throwIfAborted(), !e.current()) return;
        t.gitingest.progress = `读取代码样本 ${$ + A + 1}/${v.length}…`;
        try {
          const H = await e.wait(() => se(`${n}/git/blobs/${R.sha}`, o, e.signal));
          if (e.signal.throwIfAborted(), !e.current()) return;
          const ne = Re(H, 65536);
          m += `FILE: ${R.path}
${ne.slice(0, 8e3)}${ne.length > 8e3 ? `
[truncated]` : ""}

`, $++;
        } catch {
          if (e.signal.throwIfAborted(), !e.current()) return;
          m += `FILE: ${R.path}
[not read: error, unsupported format, or size limit]

`, A++;
        }
      }
      if (!e.current()) return;
      t.gitingest.fullText = m, t.gitingest.tokenCount = Math.round(m.length / 3.8), t.gitingest.progress = `已采样 ${$} 个文件，未读 ${A} 个；目录预览最多150项${b.truncated ? "，API目录结果不完整" : ""}。`, A && (t.gitingest.error = "部分文件未能读取，导出中已逐项标记；不是完整代码快照。");
    } catch {
      e.current() && (t.gitingest.error = "读取失败、超时或权限不足；请检查配置后手动重新读取。");
    } finally {
      e.finish();
    }
  },
  /**
   * 本地目录关键词与模板示意，不是经源码验证的架构分析
   */
  async runGitDiagram() {
    const e = t.fullName;
    if (!(!e || !t.isOpen || !I || t.activeTab !== "gitdiagram")) {
      if (!t.gitingest.treeText) {
        t.gitdiagram.error = "请先在代码采样页读取目录；没有目录时不生成示意图。";
        return;
      }
      t.gitdiagram.loading = !0, t.gitdiagram.error = "";
      try {
        const s = e.split("/")[1] || e, o = t.gitingest.treeText || "", n = /components|views|ui|frontend|app|pages/i.test(o), a = /store|pinia|vuex|state|redux/i.test(o), u = /service|engine|controller|core|logic/i.test(o), b = /api|server|router|network|http|fetch/i.test(o), d = /db|storage|cache|indexeddb|sqlite|sql/i.test(o), y = /worker|background|daemon|schedule|cron/i.test(o), g = [], v = [];
        g.push({
          id: "node-ui",
          name: n ? "用户交互层 (UI & Pages)" : "CLI / 命令行交互层",
          category: "ui",
          categoryLabel: "界面与输入",
          desc: "处理用户手势、点击、路由与视觉状态展示",
          x: 40,
          y: 40,
          width: 190,
          height: 80,
          files: ["views/", "components/", "layout/"]
        }), g.push({
          id: "node-store",
          name: a ? "响应式状态中心 (Stores)" : "配置与上下文环境",
          category: "store",
          categoryLabel: "状态中心",
          desc: "管理全局活跃状态、用户偏好与数据流分发",
          x: 40,
          y: 190,
          width: 190,
          height: 80,
          files: ["store/", "state/", "context/"]
        }), g.push({
          id: "node-core",
          name: `${s} 核心调度引擎`,
          category: "service",
          categoryLabel: "业务逻辑与调度",
          desc: "驱动项目核心算法、事务管线与流程编排",
          x: 290,
          y: 110,
          width: 200,
          height: 88,
          files: ["services/", "controllers/", "core/"]
        }), g.push({
          id: "node-api",
          name: b ? "外部 API 与网络通信" : "系统调用与外部进程",
          category: "network",
          categoryLabel: "网络与外部桥接",
          desc: "负责 REST/WebSocket 数据交互与协议适配",
          x: 550,
          y: 40,
          width: 190,
          height: 80,
          files: ["api/", "network/", "http/"]
        }), g.push({
          id: "node-storage",
          name: d ? "本地存储与缓存 (Storage)" : "本地文件系统读写",
          category: "storage",
          categoryLabel: "数据持久化",
          desc: "管理本地 IndexedDB、文件写入与离线缓存",
          x: 550,
          y: 190,
          width: 190,
          height: 80,
          files: ["storage/", "cache/", "db/"]
        }), y && g.push({
          id: "node-worker",
          name: "后台 Worker / 守护任务",
          category: "worker",
          categoryLabel: "后台调度",
          desc: "处理离线常驻、定时同步与消息监听",
          x: 290,
          y: 250,
          width: 200,
          height: 75,
          files: ["workers/", "background/"]
        }), v.push({
          fromId: "node-ui",
          toId: "node-core",
          label: "用户事件",
          pathD: "M 230, 80 C 260, 80 260, 140 290, 140"
        }), v.push({
          fromId: "node-store",
          toId: "node-core",
          label: "状态驱动",
          pathD: "M 230, 230 C 260, 230 260, 160 290, 160"
        }), v.push({
          fromId: "node-core",
          toId: "node-api",
          label: "请求派发",
          pathD: "M 490, 140 C 520, 140 520, 80 550, 80"
        }), v.push({
          fromId: "node-core",
          toId: "node-storage",
          label: "持久化存储",
          pathD: "M 490, 160 C 520, 160 520, 230 550, 230"
        }), y && v.push({
          fromId: "node-worker",
          toId: "node-core",
          label: "事件总线",
          pathD: "M 390, 250 L 390, 198"
        }), g.forEach(($) => {
          $.files = [];
        }), t.gitdiagram.graph = {
          title: `${s} 本地规则示意图`,
          nodes: g,
          edges: v,
          width: 780,
          height: y ? 350 : 300
        };
        let m = `%% Local directory-keyword/template sketch; nodes and edges are unverified.
graph TD
`;
        m += `  subgraph ${s} [项目核心架构]
`, g.forEach(($) => {
          m += `    ${$.id}["${$.name}"]
`;
        }), v.forEach(($) => {
          m += `    ${$.fromId} -->|${$.label}| ${$.toId}
`;
        }), m += `  end
`, t.gitdiagram.mermaidCode = m;
      } catch (s) {
        t.gitdiagram.error = s?.message || "生成架构图失败";
      } finally {
        t.gitdiagram.loading = !1;
      }
    }
  },
  /**
   * 本地规则示意；不提供虚构源码路径或行号证据
   */
  async runArchify(e = "architecture") {
    const s = t.fullName;
    if (!(!s || !t.isOpen || !I || t.activeTab !== "archify")) {
      if (!t.gitingest.treeText) {
        t.archify.error = "请先在代码采样页读取目录；没有目录时不生成示意图。";
        return;
      }
      U(), t.archify.loading = !0, t.archify.diagramType = e, t.archify.error = "";
      try {
        const o = s.split("/")[1] || s, n = t.gitingest.treeText || "", a = /components|views|ui|frontend|app|pages/i.test(n), u = /store|pinia|vuex|state|redux/i.test(n), b = /api|server|router|network|http|fetch/i.test(n), d = /db|storage|cache|indexeddb|sqlite|sql/i.test(n), y = /worker|background|daemon|schedule|cron/i.test(n), g = [
          { id: "c-ingress", name: "客户端边界 (Ingress & Boundary)", x: 20, y: 20, width: 235, height: 330 },
          { id: "c-core", name: "业务调度集群 (Core Microservices)", x: 275, y: 20, width: 250, height: 330 },
          { id: "c-storage", name: "数据与通信层 (Persistence & Network)", x: 545, y: 20, width: 235, height: 330 }
        ], v = [], m = [];
        v.push({
          id: "arch-client",
          label: a ? "Web / 前端交互端" : "CLI Terminal 客户端",
          role: "client",
          roleLabel: "Client",
          sourceRef: "未定位（规则示意）",
          protocol: "HTTPS / User Action",
          desc: "用户输入与主控界面",
          x: 35,
          y: 60,
          width: 200,
          height: 86
        }), v.push({
          id: "arch-state",
          label: u ? "响应式状态控制器" : "全局配置与上下文",
          role: "cache",
          roleLabel: "State / Cache",
          sourceRef: "未定位（规则示意）",
          protocol: "Memory State",
          desc: "实时内存状态与参数注入",
          x: 35,
          y: 200,
          width: 200,
          height: 86
        }), v.push({
          id: "arch-service",
          label: `${o} 核心业务管线`,
          role: "service",
          roleLabel: "Core Service",
          sourceRef: "未定位（规则示意）",
          protocol: "In-Process / RPC",
          desc: "业务流程编排与算法调度",
          x: 290,
          y: 75,
          width: 220,
          height: 94
        }), y && v.push({
          id: "arch-worker",
          label: "后台常驻守护 Worker",
          role: "queue",
          roleLabel: "Worker / Queue",
          sourceRef: "未定位（规则示意）",
          protocol: "EventBus / PostMessage",
          desc: "异步任务队列与定时轮询",
          x: 290,
          y: 205,
          width: 220,
          height: 86
        }), v.push({
          id: "arch-api",
          label: b ? "外部 API 与网关" : "系统子进程 (IPC / REST)",
          role: "gateway",
          roleLabel: "Gateway / API",
          sourceRef: "未定位（规则示意）",
          protocol: "HTTP/2 REST / JSON",
          desc: "网络请求派发与反向代理",
          x: 560,
          y: 60,
          width: 200,
          height: 86
        }), v.push({
          id: "arch-db",
          label: d ? "持久化存储 (IndexedDB / DB)" : "文件系统持久化",
          role: "database",
          roleLabel: "Database",
          sourceRef: "未定位（规则示意）",
          protocol: "Storage Engine",
          desc: "离线数据落盘与缓存持久化",
          x: 560,
          y: 200,
          width: 200,
          height: 86
        }), m.push({
          fromId: "arch-client",
          toId: "arch-service",
          label: "REST / Dispatch",
          protocol: "HTTP/JSON",
          pathD: "M 235, 103 C 262, 103 262, 122 290, 122"
        }), m.push({
          fromId: "arch-state",
          toId: "arch-service",
          label: "Sync Props",
          protocol: "Reactive",
          pathD: "M 235, 243 C 262, 243 262, 142 290, 142"
        }), m.push({
          fromId: "arch-service",
          toId: "arch-api",
          label: "Outbound Call",
          protocol: "HTTPS",
          pathD: "M 510, 110 C 535, 110 535, 103 560, 103"
        }), m.push({
          fromId: "arch-service",
          toId: "arch-db",
          label: "Read / Write",
          protocol: "SQL / KV",
          pathD: "M 510, 132 C 535, 132 535, 243 560, 243"
        }), y && m.push({
          fromId: "arch-worker",
          toId: "arch-service",
          label: "Job Result",
          protocol: "Event",
          pathD: "M 400, 205 L 400, 169"
        });
        const $ = {
          provenance: "本地目录关键词与模板生成；节点、关系、协议未经源码验证，sourceRef不是源码证据。",
          title: `${o} 本地规则示意图`,
          diagramType: e,
          clusters: g,
          nodes: v,
          edges: m,
          width: 800,
          height: 370
        };
        t.archify.data = $, t.archify.rawJson = JSON.stringify($, null, 2);
      } catch (o) {
        t.archify.error = o?.message || "Archify 图谱生成失败";
      } finally {
        t.archify.loading = !1;
      }
    }
  },
  /** Preparing a confirmation never submits a POST. */
  async triggerN8nWorkflow() {
    if (!t.isOpen || !I || t.activeTab !== "archify" || !t.archify.data || t.archify.loading || K() || Y || t.n8nResult?.uncertain) return;
    const e = t.fullName, s = he(), o = D, n = be, a = () => t.isOpen && I && D === o && be === n;
    t.n8nSubmitting = !0;
    try {
      const u = await Te();
      if (!a()) return;
      if (!u) throw new z("请先在 GitHub 设置中填写 Webhook 地址。");
      if (he() !== s) {
        t.actionMessage = "架构数据已变化，请重新准备提交。";
        return;
      }
      Y = { url: u, repo: e, body: s }, t.n8nConfirmation = { origin: new URL(u).origin, repo: e };
    } catch (u) {
      a() && (t.actionMessage = u instanceof z ? u.message : "读取设置失败，没有提交任务。");
    } finally {
      t.n8nSubmitting = !1;
    }
  },
  cancelN8nWorkflow: U,
  requestN8nUnlock() {
    t.isOpen && I && !K() && t.n8nResult?.uncertain && (t.n8nUnlockConfirmation = !0);
  },
  cancelN8nUnlock() {
    t.n8nUnlockConfirmation = !1;
  },
  acknowledgeN8nChecked() {
    !t.isOpen || !I || K() || !t.n8nUnlockConfirmation || !t.n8nResult?.uncertain || (t.n8nResult = { ...t.n8nResult, uncertain: !1, message: "用户声明已在节点侧核对，已解除本页提交限制；扩展未验证执行结果，也未重发请求。" }, t.n8nUnlockConfirmation = !1);
  },
  async confirmN8nWorkflow() {
    const e = Y;
    if (!e || !t.isOpen || !I || t.activeTab !== "archify" || K() || t.n8nResult?.uncertain) return;
    const s = D, o = () => t.isOpen && I && D === s && Y === e;
    t.n8nSubmitting = !0;
    let n, a = !1;
    const u = new URL(e.url).origin;
    try {
      const b = await Te();
      if (!o()) return;
      if (b !== e.url || t.fullName !== e.repo || t.archify.loading || he() !== e.body)
        throw new z("节点或架构数据已变化，没有提交；请重新准备确认。");
      U();
      const d = new AbortController();
      n = setTimeout(() => d.abort(), 15e3), a = !0, t.n8nResult = { repo: e.repo, origin: u, uncertain: !0, message: "已开始提交，等待响应；不要重复发送。" };
      const y = await fetch(e.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: e.body,
        signal: d.signal,
        credentials: "omit",
        redirect: "error",
        referrerPolicy: "no-referrer"
      });
      y.body?.cancel().catch(() => {
      }), d.signal.throwIfAborted(), t.n8nResult = { repo: e.repo, origin: u, uncertain: !y.ok, message: y.ok ? `节点返回 HTTP ${y.status}，仅表示接受请求，不证明任务执行完成。` : `节点返回 HTTP ${y.status}，是否执行仍未知。请在节点侧核对，不要直接重发。` };
    } catch (b) {
      a ? t.n8nResult = { repo: e.repo, origin: u, uncertain: !0, message: "网络失败或超时，节点可能已收到请求。请先在节点侧核对；未自动重试。" } : o() && (t.actionMessage = b instanceof z ? b.message : "读取设置失败，没有提交任务。", U());
    } finally {
      n !== void 0 && clearTimeout(n), t.n8nSubmitting = !1;
    }
  },
  async runDeepWiki() {
    const e = Ae("deepwiki");
    if (!e) return;
    const s = t.fullName, n = S.findRepository(s)?.description || "列表快照暂无项目说明";
    t.deepwiki.loading = !0, t.deepwiki.error = "", t.deepwiki.wikiMarkdown = "";
    try {
      const a = await e.wait(() => Ie(e.signal));
      if (e.signal.throwIfAborted(), !e.current()) return;
      const u = await e.wait(() => se(`${s.split("/").map(encodeURIComponent).join("/")}/readme`, a, e.signal));
      if (e.signal.throwIfAborted(), !e.current()) return;
      const b = Re(u, 1048576);
      t.deepwiki.wikiMarkdown = `# ${s} README 摘录

来源：GitHub README API；不是 DeepWiki 在线服务或 AI 分析。
简介（列表快照）：${n}

${b.slice(0, 4e4)}${b.length > 4e4 ? `

[正文超过40000字符，已截断]` : b.length === 0 ? `
[README为空]` : ""}`;
    } catch {
      e.current() && (t.deepwiki.error = "README读取失败或超时；未生成无依据的项目介绍，请手动重新读取。");
    } finally {
      e.finish();
    }
  },
  async copyCurrentContent() {
    if (K()) return;
    const e = qt();
    if (!e) {
      t.actionMessage = "请先读取或生成有效内容。";
      return;
    }
    t.actionBusy = "copy", t.actionMessage = "正在复制当前内容…";
    try {
      await navigator.clipboard.writeText(e.content), e.current() && (t.actionMessage = `已复制 ${e.repo} 的 ${e.tab} 提交快照。`);
    } catch {
      e.current() && (t.actionMessage = "复制未确认，不会自动重试。");
    } finally {
      t.actionBusy = "";
    }
  }
}, Xt = {
  key: 0,
  role: "status"
}, en = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, tn = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, nn = { style: { "font-size": "12px", color: "var(--dim)" } }, on = {
  key: 3,
  class: "muted small"
}, sn = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], rn = ["onClick"], an = { class: "gh-card-head" }, ln = ["checked", "onChange"], cn = ["src"], un = ["href", "title"], dn = { class: "owner" }, gn = { class: "gh-card-body" }, fn = { class: "gh-card-badges" }, pn = ["title", "onClick"], hn = ["title", "onClick"], bn = { class: "gh-badge-remark-text" }, mn = ["onClick"], yn = ["href"], vn = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, kn = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, wn = ["title"], Cn = {
  key: 3,
  class: "desc dim"
}, $n = { class: "meta" }, xn = { class: "gh-stars" }, _n = {
  key: 0,
  class: "gh-lang"
}, Tn = {
  key: 1,
  class: "gh-updated"
}, An = {
  key: 5,
  class: "gh-pager"
}, Rn = ["disabled"], In = { class: "gh-page-info" }, Sn = ["disabled"], En = ["onClick"], eo = /* @__PURE__ */ V({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const s = e, o = it(() => !!k.repo && !T.cards.some((f) => f.fullName === k.repo)), n = ae({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folder: "",
      used: !1,
      hasRemark: !1,
      url: ""
    }), a = te(null), u = te(!1);
    function b(f, l) {
      const c = f.target;
      if (c instanceof Element) {
        if (T.batchMode) {
          if (c.closest(".fo-card-more,.gh-badge-folder,.gh-badge-used,.gh-badge-remark,.gh-inline-remark-box")) return;
          f.preventDefault(), f.stopPropagation(), W.toggleSelection(l.fullName);
          return;
        }
        c.closest("a,button,.gh-badge-folder,.gh-badge-used,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (f.preventDefault(), f.stopPropagation(), Ye.open(l.fullName, void 0, l));
      }
    }
    function d(f, l) {
      if (!s.active) return;
      f.preventDefault(), f.stopPropagation();
      const c = 12, _ = 160, We = 280, ye = Math.min(window.innerWidth - _ - c, Math.max(c, f.clientX)), je = Math.min(window.innerHeight - We - c, Math.max(c, f.clientY));
      n.x = ye, n.y = je, n.fullName = l.fullName, n.folder = l.folder || "", n.used = !!l.used, n.hasRemark = !!l.customRemark, n.url = l.url, n.visible = !0, a.value = null, u.value = ye > window.innerWidth - 380;
    }
    function y(f, l) {
      d(l, f), a.value = "folder";
    }
    function g() {
      n.visible = !1, a.value = null;
    }
    function v(f) {
      S.setRepoFolder(n.fullName, f), g();
    }
    function m(f) {
      if (!s.active) return;
      const l = typeof f == "string" ? f : f?.fullName || n.fullName;
      g(), $e(l);
    }
    function $() {
      if (!s.active) return;
      const f = n.fullName;
      g(), $e(f, !0);
    }
    function A() {
      const f = S.findRepository(n.fullName);
      f && S.analyzeRepoWithAi(f), g();
    }
    function R() {
      n.fullName && re.open(n.fullName, "gitdiagram"), g();
    }
    function H() {
      n.fullName && re.open(n.fullName, "archify"), g();
    }
    function ne() {
      n.fullName && re.open(n.fullName, "gitingest"), g();
    }
    function Ue() {
      n.fullName && re.open(n.fullName, "deepwiki"), g();
    }
    async function He() {
      const f = n.url;
      if (g(), f && s.active)
        try {
          await navigator.clipboard.writeText(f);
        } catch {
        }
    }
    function Oe(f) {
      const l = S.findRepository(n.fullName);
      g(), l && Ze.sendGitHubShare({
        fullName: l.full_name,
        name: l.name,
        owner: l.owner?.login,
        ownerAvatar: l.owner?.avatar_url,
        desc: l.description || void 0,
        language: l.language || void 0,
        stars: l.stargazers_count,
        category: n.folder || "未分类",
        url: l.html_url || `https://github.com/${l.full_name}`,
        updatedAt: l.updated_at ? l.updated_at.split("T")[0] : void 0
      }, f);
    }
    async function Pe() {
      const f = S.findRepository(n.fullName);
      if (g(), !!f)
        try {
          const { addWorkbenchRepo: l } = await import("./workbench.store---R-eEes.js");
          l({
            id: f.full_name,
            owner: f.owner?.login || f.full_name.split("/")[0] || "",
            name: f.name || f.full_name.split("/")[1] || f.full_name,
            description: f.description || "",
            stars: f.stargazers_count,
            language: f.language || "",
            htmlUrl: f.html_url || `https://github.com/${f.full_name}`
          });
          const { notifications: c } = await import("./youtube-store-CosxBVAL.js").then((_) => _.n);
          c.show({
            appName: "海狸工作台",
            title: "已添加到工作台",
            message: `已将项目「${f.full_name}」放入关联仓库`
          });
        } catch (l) {
          console.warn("添加到工作台失败", l);
        }
    }
    function Ge() {
      n.url && window.open(n.url, "_blank", "noreferrer"), g();
    }
    async function Be() {
      const f = S.findRepository(n.fullName);
      if (!f) {
        g();
        return;
      }
      g(), await S.confirmUnstarRepository(f);
    }
    function le(f) {
      const l = f.target;
      l?.closest(".gh-repo-context-menu") || l?.closest(".gh-inline-remark-box") || g();
    }
    function ce(f) {
      f.key === "Escape" && n.visible && g();
    }
    me(() => s.active, (f) => {
      window.removeEventListener("pointerdown", le), window.removeEventListener("keydown", ce), g(), f && (window.addEventListener("pointerdown", le), window.addEventListener("keydown", ce));
    }, { immediate: !0 }), ot(() => {
      window.removeEventListener("pointerdown", le), window.removeEventListener("keydown", ce);
    });
    function ze(f, l) {
      const c = f.target;
      if (c instanceof Element && c.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        f.preventDefault();
        return;
      }
      W.startDrag(l, f);
    }
    return (f, l) => (p(), h(N, null, [
      r(k).message ? (p(), h("p", Xt, w(r(k).repo ? `${r(k).repo}：` : "") + w(r(k).message), 1)) : C("", !0),
      o.value ? (p(), h("section", en, [
        i("p", null, "备注草稿：" + w(r(k).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        ve(_e, {
          active: s.active
        }, null, 8, ["active"])
      ])) : C("", !0),
      r(T).searchMessage ? (p(), h("div", tn, [
        i("span", nn, w(r(T).searchMessage), 1),
        i("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: l[0] || (l[0] = (c) => r(W).resetSearch())
        }, "清空搜索")
      ])) : C("", !0),
      r(T).emptyMessage ? (p(), h("p", on, w(r(T).emptyMessage), 1)) : C("", !0),
      r(T).cards.length ? (p(), h("div", {
        key: 4,
        class: E(["repos gh-grid", { "gh-batch-active": r(T).batchMode }])
      }, [
        (p(!0), h(N, null, ee(r(T).cards, (c) => (p(), h("article", {
          key: c.fullName,
          class: E(["repo gh-card", { selected: c.selected }]),
          "data-repo-name": c.fullName,
          draggable: "true",
          onClick: (_) => b(_, c),
          onContextmenu: (_) => d(_, c),
          onDragstart: (_) => ze(_, c.fullName)
        }, [
          i("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: M((_) => d(_, c), ["stop"])
          }, "⋮", 8, rn),
          i("div", an, [
            i("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: l[1] || (l[1] = M(() => {
              }, ["stop"]))
            }, [
              i("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: c.selected,
                onChange: (_) => r(W).setSelection(c.fullName, _.target.checked)
              }, null, 40, ln),
              l[20] || (l[20] = i("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            i("img", {
              class: "gh-owner-avatar",
              src: c.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: l[2] || (l[2] = (_) => _.target.src = "assets/github-star.svg")
            }, null, 40, cn),
            i("a", {
              href: c.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: c.fullName
            }, [
              i("span", dn, w(c.owner) + "/", 1),
              X(w(c.name), 1)
            ], 8, un)
          ]),
          i("div", gn, [
            i("div", fn, [
              i("span", {
                class: E(["gh-badge-folder", { uncat: !c.folder }]),
                title: c.folder ? `文件夹：${c.folder}（点击更换）` : "未分类（点击归类）",
                onClick: M((_) => y(c, _), ["stop"])
              }, w(c.folder ? `📁 ${c.folder}` : "＋ 未分类"), 11, pn),
              r(k).repo === c.fullName ? (p(), ke(_e, {
                key: 0,
                active: s.active
              }, null, 8, ["active"])) : c.customRemark ? (p(), h("span", {
                key: 1,
                class: "gh-badge-remark",
                title: `备注：${c.customRemark}（点击就地修改）`,
                onClick: M((_) => m(c), ["stop"])
              }, [
                l[21] || (l[21] = i("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                i("span", bn, w(c.customRemark), 1)
              ], 8, hn)) : C("", !0),
              c.showUsedStatus && c.used ? (p(), h("span", {
                key: 2,
                class: "gh-badge-used",
                title: "已标记为正在使用（点击移除）",
                onClick: M((_) => r(W).removeUsed(c.fullName), ["stop"])
              }, "⚡ 正在使用", 8, mn)) : C("", !0),
              c.showUsedStatus && c.releaseKind !== "none" && c.releaseUrl ? (p(), h("a", {
                key: 3,
                class: E(["gh-update-badge", { latest: c.releaseKind === "latest" }]),
                href: c.releaseUrl,
                target: "_blank",
                rel: "noreferrer"
              }, w(c.releaseText), 11, yn)) : c.showUsedStatus && c.releaseKind !== "none" ? (p(), h("span", {
                key: 4,
                class: E(["gh-update-badge", { latest: c.releaseKind === "latest" }])
              }, w(c.releaseText), 3)) : C("", !0)
            ]),
            c.descriptionKind === "analyzing" ? (p(), h("p", vn, [...l[22] || (l[22] = [
              i("span", { class: "gh-ai-sparkle" }, "✨", -1),
              X(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : c.descriptionKind === "ai" ? (p(), h("p", kn, [
              l[23] || (l[23] = i("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              X(w(c.description), 1)
            ])) : c.descriptionKind === "plain" ? (p(), h("p", {
              key: 2,
              class: "desc",
              title: c.description
            }, w(c.description), 9, wn)) : (p(), h("p", Cn, "暂无描述"))
          ]),
          i("div", $n, [
            i("span", xn, "★ " + w(c.stars), 1),
            c.language ? (p(), h("span", _n, w(c.language), 1)) : C("", !0),
            c.updated ? (p(), h("span", Tn, "更新 " + w(c.updated), 1)) : C("", !0)
          ])
        ], 42, sn))), 128))
      ], 2)) : C("", !0),
      r(T).totalPages > 1 ? (p(), h("div", An, [
        i("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: r(T).page <= 1,
          onClick: l[3] || (l[3] = (c) => r(W).changePage(r(T).page - 1))
        }, "‹ 上一页", 8, Rn),
        i("span", In, w(r(T).page) + " / " + w(r(T).totalPages) + " · 共 " + w(r(T).totalItems) + " 个" + w(r(T).serverPaged ? ` · 已加载 ${r(T).loadedItems}` : ""), 1),
        i("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: r(T).page >= r(T).totalPages,
          onClick: l[4] || (l[4] = (c) => r(W).changePage(r(T).page + 1))
        }, "下一页 ›", 8, Sn)
      ])) : C("", !0),
      (p(), ke(rt, { to: "body" }, [
        s.active && n.visible ? (p(), h("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: st({ left: `${n.x}px`, top: `${n.y}px` }),
          onClick: l[18] || (l[18] = M(() => {
          }, ["stop"])),
          onContextmenu: l[19] || (l[19] = M(() => {
          }, ["prevent"]))
        }, [
          i("div", {
            class: E(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: l[7] || (l[7] = (c) => a.value = "folder")
          }, [
            l[24] || (l[24] = i("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              i("span", null, "📁 移动到文件夹"),
              i("span", { class: "sub-arrow" }, "›")
            ], -1)),
            i("div", {
              class: E(["gh-sub-flyout", { "flyout-left": u.value }]),
              onClick: l[6] || (l[6] = M(() => {
              }, ["stop"]))
            }, [
              i("button", {
                class: E(["fo-cover-menu-item", { primary: !n.folder }]),
                type: "button",
                onClick: l[5] || (l[5] = (c) => v(""))
              }, w(n.folder ? "  " : "✓ ") + "＋ 设为未分类（清旧使用标记） ", 3),
              (p(!0), h(N, null, ee(r(S).cats, (c) => (p(), h("button", {
                key: c,
                class: E(["fo-cover-menu-item", { primary: n.folder === c }]),
                type: "button",
                onClick: (_) => v(c)
              }, w(n.folder === c ? "✓ " : "  ") + "📁 " + w(c), 11, En))), 128))
            ], 2)
          ], 34),
          i("div", {
            class: E(["gh-menu-has-sub", { "is-active": a.value === "analysis" }]),
            onMouseenter: l[9] || (l[9] = (c) => a.value = "analysis")
          }, [
            l[25] || (l[25] = i("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              i("span", null, "🔍 深度分析"),
              i("span", { class: "sub-arrow" }, "›")
            ], -1)),
            i("div", {
              class: E(["gh-sub-flyout", { "flyout-left": u.value }]),
              onClick: l[8] || (l[8] = M(() => {
              }, ["stop"]))
            }, [
              i("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: A
              }, " ✨ AI 提炼中文简介 "),
              i("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: R
              }, " 📊 GitDiagram 架构图解 "),
              i("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: H
              }, " 📐 Archify 架构图谱 "),
              i("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: ne
              }, " 📦 GitIngest 代码文本提取 "),
              i("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: Ue
              }, " 🌐 DeepWiki 知识库 ")
            ], 2)
          ], 34),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: l[10] || (l[10] = (c) => a.value = null),
            onClick: Pe
          }, " 📌 发送到工作台 ", 32),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: l[11] || (l[11] = (c) => a.value = null),
            onClick: l[12] || (l[12] = (c) => m())
          }, " ✏️ 编辑备注… ", 32),
          ve(ct, {
            label: "💬 发送到聊天室",
            visible: n.visible,
            onOpen: l[13] || (l[13] = (c) => a.value = null),
            onSelect: Oe
          }, null, 8, ["visible"]),
          n.hasRemark ? (p(), h("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: l[14] || (l[14] = (c) => a.value = null),
            onClick: $
          }, " 🗑️ 清除备注 ", 32)) : C("", !0),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: l[15] || (l[15] = (c) => a.value = null),
            onClick: He
          }, " 📋 复制仓库链接 ", 32),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: l[16] || (l[16] = (c) => a.value = null),
            onClick: Ge
          }, " ↗ 在 GitHub 打开 ", 32),
          i("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: l[17] || (l[17] = (c) => a.value = null),
            onClick: Be
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : C("", !0)
      ]))
    ], 64));
  }
}), Mn = { class: "gh-batch-bar-left" }, Dn = { class: "gh-batch-count-tip" }, Nn = { id: "gh-batch-selected-count" }, Ln = {
  key: 0,
  "aria-label": "批量移动确认"
}, Un = ["disabled"], Hn = ["value"], On = ["disabled"], Pn = ["disabled"], Gn = { class: "gh-batch-bar-right" }, Bn = ["disabled"], zn = ["disabled"], Wn = ["disabled"], to = /* @__PURE__ */ V({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const s = e, o = lt(), n = te(null);
    function a() {
      s.active && (o.value = S.prepareBatchMove(), n.value = null);
    }
    async function u() {
      const b = o.value, d = n.value;
      if (!s.active || !b || d === null || G.busy) return;
      await b.submit(d) && o.value === b && (o.value = void 0);
    }
    return me(() => s.active && j.active, (b) => {
      b || (o.value = void 0);
    }), (b, d) => (p(), h(N, null, [
      i("div", Mn, [
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: d[0] || (d[0] = (y) => r(ue).toggleSelectAll())
        }, w(r(j).allSelected ? "取消全选" : "全选"), 1),
        i("span", Dn, [
          d[5] || (d[5] = X("已选择 ", -1)),
          i("b", Nn, w(r(j).selectedCount), 1),
          d[6] || (d[6] = X(" 项", -1))
        ])
      ]),
      o.value ? (p(), h("section", Ln, [
        i("p", null, "仅移动打开选择器时的 " + w(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        i("details", null, [
          d[7] || (d[7] = i("summary", null, "查看本次仓库清单", -1)),
          i("ul", null, [
            (p(!0), h(N, null, ee(o.value.names, (y) => (p(), h("li", { key: y }, w(y), 1))), 128))
          ])
        ]),
        De(i("select", {
          "onUpdate:modelValue": d[1] || (d[1] = (y) => n.value = y),
          "aria-label": "目标分类",
          disabled: r(G).busy
        }, [
          d[8] || (d[8] = i("option", {
            value: null,
            disabled: ""
          }, "请选择目标分类", -1)),
          d[9] || (d[9] = i("option", { value: "" }, "未分类（同时清除这些仓库的旧使用标记）", -1)),
          (p(!0), h(N, null, ee(r(q).folders.filter((y) => y.kind === "custom"), (y) => (p(), h("option", {
            key: y.title,
            value: y.title
          }, w(y.title), 9, Hn))), 128))
        ], 8, Un), [
          [at, n.value]
        ]),
        i("button", {
          type: "button",
          disabled: !s.active || r(G).busy || n.value === null,
          onClick: u
        }, "确认移动", 8, On),
        i("button", {
          type: "button",
          disabled: r(G).busy,
          onClick: d[2] || (d[2] = (y) => o.value = void 0)
        }, "取消", 8, Pn)
      ])) : C("", !0),
      i("div", Gn, [
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !s.active || r(G).busy || r(j).selectedCount === 0,
          title: "固定当前选择，确认后批量移动",
          onClick: a
        }, " 📁 移动到文件夹 ", 8, Bn),
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: r(j).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: d[3] || (d[3] = (y) => r(ue).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, zn),
        i("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: r(j).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: d[4] || (d[4] = (y) => r(ue).unstar())
        }, " 🗑 取消收藏 ", 8, Wn)
      ])
    ], 64));
  }
});
export {
  z as A,
  pe as G,
  Zn as _,
  x as a,
  Xn as b,
  re as c,
  Qn as d,
  to as e,
  Yn as f,
  qn as g,
  eo as h,
  Ft as n
};
