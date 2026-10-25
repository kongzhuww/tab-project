import { R as ve } from "./read-session-C1M3QoXl.js";
import { U as ye, V as ke, W as we, X as T, K as A, S as I, o as ue, Y as L, Q as U, q as G, Z as _e, _ as $e, $ as D, r as F, a0 as xe, P as $, u as N, O as Ce, v as Y, a1 as H } from "./search.service-CzxjlNxM.js";
import { r as Q, d as z, o as l, e as u, F as R, u as e, f as s, t as g, g as k, B as E, x as ee, L as Re, h as V, k as j, i as C, b as K, C as Se, G as Te, l as de, n as Ee, y as Ae, D as se, c as oe, A as De, j as Me, s as Le, m as P, p as Ie, O as Ne } from "./vendor-vue-CjOHdfe5.js";
import { _ as ce } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { C as He } from "./ChatShareMenu-CcKxiexU.js";
const w = Q({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), Z = /* @__PURE__ */ new Set();
let M;
const B = new ve();
let ne = !1;
async function ze(a, i) {
  if (i.throwIfAborted(), new URL(a).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const d = new AbortController(), t = () => d.abort();
  i.addEventListener("abort", t, { once: !0 });
  const r = setTimeout(t, 15e3);
  try {
    const f = await fetch(a, {
      signal: d.signal,
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!f.ok)
      throw f.body?.cancel().catch(() => {
      }), new Error("Source unavailable");
    if (!f.body) throw new Error("Empty public source");
    const v = f.body.getReader(), c = new TextDecoder("utf-8", { fatal: !0 });
    let y = 0, h = "";
    try {
      for (; ; ) {
        d.signal.throwIfAborted();
        const _ = await v.read();
        if (_.done) break;
        if (y += _.value.byteLength, y > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        h += c.decode(_.value, { stream: !0 });
      }
      return d.signal.throwIfAborted(), JSON.parse(h + c.decode());
    } finally {
      v.cancel().catch(() => {
      }), v.releaseLock();
    }
  } finally {
    clearTimeout(r), i.removeEventListener("abort", t);
  }
}
function ae(a, i) {
  const d = a?.name || a?.repository, t = i ? a?.full_name || (typeof d == "string" && d.includes("/") ? d : a?.author && d ? `${a.author}/${d}` : "") : a?.full_name;
  if (typeof t != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(t) || t.split("/").some((c) => c === "." || c === "..")) throw new Error("Invalid repository");
  const [r, f] = t.split("/"), v = (c) => typeof c == "number" && Number.isFinite(c) && c >= 0 ? c : void 0;
  return {
    name: f,
    full_name: t,
    owner: { login: r },
    description: typeof a.description == "string" ? a.description : "",
    language: typeof a.language == "string" ? a.language : "",
    stargazers_count: v(i ? a.stars ?? a.stargazers_count : a.stargazers_count),
    forks_count: v(i ? a.forks ?? a.forks_count : a.forks_count),
    html_url: `https://github.com/${encodeURIComponent(r)}/${encodeURIComponent(f)}`
  };
}
async function Ge(a, i) {
  const d = new Date(Date.now() - a * 864e5).toISOString().slice(0, 10);
  let t = "";
  try {
    const v = await ye(i), { data: c } = await ke(`/search/repositories?q=${encodeURIComponent(`is:public created:>${d}`)}&sort=stars&order=desc&per_page=30`, { headers: v, signal: i, maxBytes: 2 * 1024 * 1024 });
    if (i.throwIfAborted(), !Array.isArray(c?.items)) throw new Error("Invalid search response");
    return {
      repos: c.items.slice(0, 30).map((y) => ae(y, !1)),
      sourceText: `GitHub Search：UTC 日期 ${d} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${c.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (v) {
    i.throwIfAborted(), t = v instanceof we ? v.message : "主源响应格式无效。";
  }
  const r = a === 1 ? "daily" : a === 7 ? "weekly" : "monthly", f = await ze(`https://ghapi.h11.dev/repositories?since=${r}`, i);
  if (i.throwIfAborted(), !Array.isArray(f)) throw new Error("Invalid fallback response");
  return {
    repos: f.slice(0, 30).map((v) => ae(v, !0)),
    sourceText: `GitHub Search 不可用：${t} 改用第三方 ghapi.h11.dev 的 ${r} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const hs = {
  get state() {
    return w;
  },
  // Only a mounted, visible View may own network work. Returning keeps the
  // previous result/error; an interrupted request requires explicit refresh.
  attachView(a) {
    B.cancel(), w.isLoading = !1, M = a;
    const i = () => {
      M === a && B.pending && (B.cancel(), w.isLoading = !1, w.errorMessage = "读取已暂停，返回后可点击刷新。");
    };
    return a.addEventListener("abort", i, { once: !0 }), !a.aborted && !ne && this.refresh(), () => {
      a.removeEventListener("abort", i), M === a && (i(), M = void 0);
    };
  },
  switchTab(a) {
    w.currentTab = a, this.dispatch("switch-tab", a);
  },
  async switchRange(a, i) {
    !M || M.aborted || ![1, 7, 30].includes(a) || a === w.sinceDays || (B.cancel(), Object.assign(w, {
      sinceDays: a,
      rangeText: `近 ${a} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: a, text: w.rangeText }), await this.refresh());
  },
  async refresh() {
    const a = M;
    if (!a || a.aborted || w.isLoading) return;
    const i = w.sinceDays, d = B.begin({
      signal: a,
      timeoutMs: 45e3,
      isCurrent: () => M === a && w.sinceDays === i,
      onStop: (r) => {
        w.isLoading = !1, r === "timeout" && (w.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), t = d.current;
    if (t()) {
      ne = !0, w.isLoading = !0, w.errorMessage = "";
      try {
        const r = await d.wait(() => Ge(i, d.signal));
        if (!t()) return;
        w.repos = r.repos, w.sourceText = r.sourceText, w.fetchedAt = Date.now(), w.hasLoaded = !0;
      } catch {
        t() && (w.errorMessage = w.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        d.finish() && (w.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(a) {
    this.dispatch("select-repo", a);
  },
  onAction(a) {
    return Z.add(a), () => {
      Z.delete(a);
    };
  },
  dispatch(a, i) {
    for (const d of Z)
      try {
        d(a, i);
      } catch {
      }
  }
}, Be = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Ue = { role: "status" }, Pe = ["disabled"], Ve = ["disabled"], Ke = /* @__PURE__ */ z({
  __name: "GitHubStatus",
  setup(a) {
    function i() {
      ue.update({ actionText: "", actionError: !1 });
    }
    return (d, t) => (l(), u(R, null, [
      e(T).message || e(T).busy ? (l(), u("section", Be, [
        s("p", Ue, g(e(T).repo ? `原任务仓库：${e(T).repo}。 ` : "") + g(e(T).message), 1),
        e(T).busy ? (l(), u("button", {
          key: 0,
          type: "button",
          onClick: t[0] || (t[0] = (r) => e(A).stopAiAnalysis())
        }, "停止后续分析 / 中断等待")) : k("", !0),
        e(T).uncertain ? (l(), u(R, { key: 1 }, [
          t[5] || (t[5] = s("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
          e(T).unlockConfirmation ? (l(), u(R, { key: 1 }, [
            t[4] || (t[4] = s("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
            s("button", {
              type: "button",
              disabled: e(T).busy,
              onClick: t[2] || (t[2] = (r) => e(A).acknowledgeAiChecked())
            }, "确认解除本页限制", 8, Ve),
            s("button", {
              type: "button",
              onClick: t[3] || (t[3] = (r) => e(T).unlockConfirmation = !1)
            }, "保持限制")
          ], 64)) : (l(), u("button", {
            key: 0,
            type: "button",
            disabled: e(T).busy,
            onClick: t[1] || (t[1] = (r) => e(T).unlockConfirmation = !0)
          }, "我已核对供应商记录", 8, Pe))
        ], 64)) : k("", !0)
      ])) : k("", !0),
      e(I).actionText && e(I).actionError ? (l(), u("div", {
        key: 1,
        class: E(["gh-action-status", { error: e(I).actionError }]),
        role: "status"
      }, [
        s("span", null, g(e(I).actionText), 1),
        s("button", {
          type: "button",
          class: "gh-action-status-close",
          title: "关闭提示",
          onClick: i
        }, "✕")
      ], 2)) : k("", !0)
    ], 64));
  }
}), ms = /* @__PURE__ */ ce(Ke, [["__scopeId", "data-v-8fc895fa"]]), Oe = {
  key: 0,
  role: "status",
  style: { "font-size": "12px", color: "var(--danger,#ef4444)", padding: "4px 8px", margin: "0 0 6px 0", "border-radius": "6px", background: "var(--surface)" }
}, Fe = {
  key: 0,
  class: "gh-sidebar-divider"
}, je = {
  key: 1,
  class: "gh-sidebar-caption"
}, Je = ["data-folder", "onClick", "onDragover", "onDragleave", "onDrop"], We = {
  class: "gh-folder-icon-wrap",
  style: { "font-size": "13px", display: "grid", "place-items": "center" }
}, Ye = { key: 0 }, Ze = { key: 1 }, qe = { key: 2 }, Xe = {
  key: 3,
  class: "fo-folder-icon",
  style: { color: "currentColor" }
}, Qe = ["title"], et = { class: "gh-folder-count" }, tt = ["data-del", "onClick", "onKeydown"], vs = /* @__PURE__ */ z({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(a) {
    const i = a, d = K(""), t = () => {
      d.value = "";
    };
    function r(h) {
      return i.active && !L.busy && U.folders.some((_) => _.title === h && (_.kind === "custom" || _.kind === "uncategorized"));
    }
    ee(() => i.active, (h) => {
      t(), window.removeEventListener("dragend", t), window.removeEventListener("drop", t), h && (window.addEventListener("dragend", t), window.addEventListener("drop", t));
    }, { immediate: !0 }), Re(() => {
      window.removeEventListener("dragend", t), window.removeEventListener("drop", t);
    });
    function f(h, _) {
      h.stopPropagation(), G.delete(_);
    }
    function v(h, _) {
      if (!r(_) || !Array.from(h.dataTransfer?.types || []).includes(_e)) {
        t();
        return;
      }
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = "move"), d.value = _;
    }
    function c(h, _) {
      const m = h.currentTarget;
      m instanceof Node && h.relatedTarget instanceof Node && m.contains(h.relatedTarget) || d.value === _ && (d.value = "");
    }
    function y(h, _) {
      if (t(), !r(_)) return;
      const m = $e(h.dataTransfer);
      m && (h.preventDefault(), h.stopPropagation(), G.dropRepository(m, _));
    }
    return (h, _) => (l(), u(R, null, [
      e(L).message ? (l(), u("p", Oe, g(e(L).message), 1)) : k("", !0),
      (l(!0), u(R, null, V(e(U).folders, (m, O) => (l(), u(R, {
        key: m.title
      }, [
        m.kind === "custom" && e(U).folders[O - 1]?.kind !== "custom" ? (l(), u("div", Fe)) : k("", !0),
        m.kind === "custom" && e(U).folders[O - 1]?.kind !== "custom" ? (l(), u("div", je, "我的文件夹")) : k("", !0),
        s("button", {
          type: "button",
          class: E(["gh-bili-folder", { on: m.active, "drag-into": d.value === m.title }]),
          "data-folder": m.title,
          onClick: (S) => e(G).select(m.title),
          onDragover: (S) => v(S, m.title),
          onDragleave: (S) => c(S, m.title),
          onDrop: (S) => y(S, m.title)
        }, [
          s("span", We, [
            m.kind === "all" ? (l(), u("span", Ye, "⭐")) : m.kind === "used" ? (l(), u("span", Ze, "⚡")) : m.kind === "uncategorized" ? (l(), u("span", qe, "📄")) : (l(), u("i", Xe))
          ]),
          s("span", {
            class: "gh-folder-name",
            title: m.title
          }, g(m.title), 9, Qe),
          s("small", et, g(m.count), 1),
          m.kind === "custom" ? (l(), u("span", {
            key: 0,
            class: "gh-folder-delete",
            title: "删除文件夹",
            "data-del": m.title,
            role: "button",
            tabindex: "0",
            onClick: (S) => f(S, m.title),
            onKeydown: [
              j(C((S) => e(G).delete(m.title), ["prevent", "stop"]), ["enter"]),
              j(C((S) => e(G).delete(m.title), ["prevent", "stop"]), ["space"])
            ]
          }, "✕", 40, tt)) : k("", !0)
        ], 42, Je)
      ], 64))), 128))
    ], 64));
  }
}), st = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, ot = { key: 0 }, nt = { key: 1 }, at = { key: 2 }, rt = {
  key: 3,
  class: "fo-folder-icon"
}, it = { class: "gh-bili-heading" }, lt = { class: "gh-hero-title-row" }, ut = ["title"], dt = {
  key: 0,
  class: "gh-hero-inline-status",
  role: "status",
  "aria-live": "polite",
  "aria-atomic": "true"
}, ct = ["title"], pt = { id: "gh-hero-desc" }, bt = { class: "gh-bili-actions" }, gt = { class: "gh-batch-btn-text" }, ft = /* @__PURE__ */ z({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(a, { emit: i }) {
    const d = i;
    return (t, r) => (l(), u(R, null, [
      s("div", st, [
        e(D).kind === "all" ? (l(), u("span", ot, "⭐")) : e(D).kind === "used" ? (l(), u("span", nt, "⚡")) : e(D).kind === "uncategorized" ? (l(), u("span", at, "📄")) : (l(), u("i", rt))
      ]),
      s("div", it, [
        s("div", lt, [
          s("h3", {
            id: "gh-hero-title",
            title: e(D).title
          }, g(e(D).title), 9, ut),
          e(I).actionText && !e(I).actionError ? (l(), u("div", dt, [
            s("span", {
              class: "gh-hero-status-text",
              title: e(I).actionText
            }, g(e(I).actionText), 9, ct),
            s("button", {
              type: "button",
              title: "关闭提示",
              "aria-label": "关闭同步状态提示",
              onClick: r[0] || (r[0] = (f) => e(ue).update({ actionText: "", actionError: !1 }))
            }, "×")
          ])) : k("", !0)
        ]),
        s("p", pt, g(e(D).description), 1)
      ]),
      s("div", bt, [
        s("button", {
          id: "gh-ai-analyze-all-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "仅分析当前筛选下已加载且没有摘要的仓库，不代表全部远端收藏",
          onClick: r[1] || (r[1] = (f) => e(F).analyzeAll())
        }, "✨ AI 分析已加载项"),
        s("button", {
          id: "gh-ai-settings-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "配置 AI 服务（DeepSeek、Gemini、OpenAI等）",
          onClick: r[2] || (r[2] = (f) => d("open-ai-settings"))
        }, "🤖 AI 设置"),
        s("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: E(["gh-hero-btn gh-batch-toggle-btn", { active: e(D).batchMode }]),
          title: "批量多选操作",
          onClick: r[3] || (r[3] = (f) => e(F).toggleBatch())
        }, [
          r[6] || (r[6] = s("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          s("span", gt, g(e(D).batchMode ? "返回" : "批量操作"), 1)
        ], 2),
        s("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "只读核对未确认的 Star 状态并刷新列表，不重发远端操作",
          onClick: r[4] || (r[4] = (f) => e(F).refresh())
        }, "↻ 刷新 / 核对"),
        s("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          onClick: r[5] || (r[5] = (f) => e(F).createFolder())
        }, "＋ 新建文件夹")
      ])
    ], 64));
  }
}), ys = /* @__PURE__ */ ce(ft, [["__scopeId", "data-v-3538adaf"]]), b = Q({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function re(a, i = !1) {
  if (!a || b.busy) return;
  if (b.repo && b.text !== b.baseline) {
    b.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const d = A.remarks[a]?.userRemark, t = typeof d == "string" ? d : "";
  Object.assign(b, {
    repo: a,
    baseline: t,
    text: i ? "" : t,
    storedValue: null,
    message: i ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function q() {
  b.busy || Object.assign(b, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function X() {
  if (b.busy || !b.repo) return;
  const { repo: a, text: i, baseline: d } = b;
  b.busy = !0;
  try {
    await A.updateRepoRemark(a, { userRemark: i.trim() }, d), Object.assign(b, { repo: "", text: "", baseline: "", storedValue: null, message: `${a} 的备注已保存并回读核对。` });
  } catch (t) {
    b.message = t instanceof Error ? t.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    b.busy = !1;
  }
}
async function ie() {
  if (b.busy || !b.repo) return;
  const a = b.repo;
  b.busy = !0;
  try {
    const d = (await A.reloadRepoRemarks())[a]?.userRemark;
    if (d !== void 0 && typeof d != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    b.storedValue = d ?? "", b.baseline = d ?? "", b.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (i) {
    b.message = i instanceof Error ? i.message : "读取失败，草稿保留。";
  } finally {
    b.busy = !1;
  }
}
const ht = ["disabled"], mt = ["disabled"], vt = ["disabled"], yt = ["disabled"], kt = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, le = /* @__PURE__ */ z({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(a) {
    const i = a, d = K(null);
    return Se(() => {
      Te(() => {
        i.active && !b.busy && d.value?.focus();
      });
    }), (t, r) => (l(), u("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: r[6] || (r[6] = C(() => {
      }, ["stop"]))
    }, [
      de(s("input", {
        ref_key: "input",
        ref: d,
        "onUpdate:modelValue": r[0] || (r[0] = (f) => e(b).text = f),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: e(b).busy || !a.active,
        onKeydown: [
          r[1] || (r[1] = j(C((f) => !f.isComposing && a.active && e(X)(), ["prevent"]), ["enter"])),
          r[2] || (r[2] = j(C((f) => !f.isComposing && a.active && e(q)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, ht), [
        [Ee, e(b).text]
      ]),
      s("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: e(b).busy || !a.active,
        onClick: r[3] || (r[3] = //@ts-ignore
        (...f) => e(X) && e(X)(...f))
      }, "✓", 8, mt),
      s("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: e(b).busy || !a.active,
        onClick: r[4] || (r[4] = //@ts-ignore
        (...f) => e(q) && e(q)(...f))
      }, "✕", 8, vt),
      s("button", {
        type: "button",
        disabled: e(b).busy || !a.active,
        onClick: r[5] || (r[5] = //@ts-ignore
        (...f) => e(ie) && e(ie)(...f))
      }, "读取已保存值", 8, yt),
      e(b).storedValue !== null ? (l(), u("p", kt, "已保存值：" + g(e(b).storedValue || "（空）"), 1)) : k("", !0)
    ]));
  }
}), wt = {
  key: 0,
  role: "status"
}, _t = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, $t = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, xt = { style: { "font-size": "12px", color: "var(--dim)" } }, Ct = {
  key: 3,
  class: "muted small"
}, Rt = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], St = ["onClick"], Tt = { class: "gh-card-head" }, Et = ["checked", "onChange"], At = ["src"], Dt = ["href", "title"], Mt = { class: "owner" }, Lt = { class: "gh-card-body" }, It = { class: "gh-card-badges" }, Nt = ["title", "onClick"], Ht = ["title", "onClick"], zt = { class: "gh-badge-remark-text" }, Gt = ["onClick"], Bt = ["href"], Ut = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, Pt = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, Vt = ["title"], Kt = {
  key: 3,
  class: "desc dim"
}, Ot = { class: "meta" }, Ft = { class: "gh-stars" }, jt = {
  key: 0,
  class: "gh-lang"
}, Jt = {
  key: 1,
  class: "gh-updated"
}, Wt = {
  key: 5,
  class: "gh-pager"
}, Yt = ["disabled"], Zt = { class: "gh-page-info" }, qt = ["disabled"], Xt = ["onClick"], ks = /* @__PURE__ */ z({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(a) {
    const i = a, d = Le(() => !!b.repo && !$.cards.some((p) => p.fullName === b.repo)), t = Q({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folder: "",
      used: !1,
      hasRemark: !1,
      url: ""
    }), r = K(null), f = K(!1);
    function v(p, n) {
      const o = p.target;
      if (o instanceof Element) {
        if ($.batchMode) {
          if (o.closest(".fo-card-more,.gh-badge-folder,.gh-badge-used,.gh-badge-remark,.gh-inline-remark-box")) return;
          p.preventDefault(), p.stopPropagation(), N.toggleSelection(n.fullName);
          return;
        }
        o.closest("a,button,.gh-badge-folder,.gh-badge-used,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (p.preventDefault(), p.stopPropagation(), Ce.open(n.fullName, void 0, n));
      }
    }
    function c(p, n) {
      if (!i.active) return;
      p.preventDefault(), p.stopPropagation();
      const o = 12, x = 160, he = 280, te = Math.min(window.innerWidth - x - o, Math.max(o, p.clientX)), me = Math.min(window.innerHeight - he - o, Math.max(o, p.clientY));
      t.x = te, t.y = me, t.fullName = n.fullName, t.folder = n.folder || "", t.used = !!n.used, t.hasRemark = !!n.customRemark, t.url = n.url, t.visible = !0, r.value = null, f.value = te > window.innerWidth - 380;
    }
    function y(p, n) {
      c(n, p), r.value = "folder";
    }
    function h() {
      t.visible = !1, r.value = null;
    }
    function _(p) {
      A.setRepoFolder(t.fullName, p), h();
    }
    function m(p) {
      if (!i.active) return;
      const n = typeof p == "string" ? p : p?.fullName || t.fullName;
      h(), re(n);
    }
    function O() {
      if (!i.active) return;
      const p = t.fullName;
      h(), re(p, !0);
    }
    async function S() {
      const p = t.url;
      if (h(), p && i.active)
        try {
          await navigator.clipboard.writeText(p);
        } catch {
        }
    }
    function pe(p) {
      const n = A.findRepository(t.fullName);
      h(), n && xe.sendGitHubShare({
        fullName: n.full_name,
        name: n.name,
        owner: n.owner?.login,
        ownerAvatar: n.owner?.avatar_url,
        desc: n.description || void 0,
        language: n.language || void 0,
        stars: n.stargazers_count,
        category: t.folder || "未分类",
        url: n.html_url || `https://github.com/${n.full_name}`,
        updatedAt: n.updated_at ? n.updated_at.split("T")[0] : void 0
      }, p);
    }
    function be() {
      t.url && window.open(t.url, "_blank", "noreferrer"), h();
    }
    async function ge() {
      const p = A.findRepository(t.fullName);
      if (!p) {
        h();
        return;
      }
      h(), await A.confirmUnstarRepository(p);
    }
    function J(p) {
      const n = p.target;
      n?.closest(".gh-repo-context-menu") || n?.closest(".gh-inline-remark-box") || h();
    }
    function W(p) {
      p.key === "Escape" && t.visible && h();
    }
    ee(() => i.active, (p) => {
      window.removeEventListener("pointerdown", J), window.removeEventListener("keydown", W), h(), p && (window.addEventListener("pointerdown", J), window.addEventListener("keydown", W));
    }, { immediate: !0 }), Ae(() => {
      window.removeEventListener("pointerdown", J), window.removeEventListener("keydown", W);
    });
    function fe(p, n) {
      const o = p.target;
      if (o instanceof Element && o.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        p.preventDefault();
        return;
      }
      N.startDrag(n, p);
    }
    return (p, n) => (l(), u(R, null, [
      e(b).message ? (l(), u("p", wt, g(e(b).repo ? `${e(b).repo}：` : "") + g(e(b).message), 1)) : k("", !0),
      d.value ? (l(), u("section", _t, [
        s("p", null, "备注草稿：" + g(e(b).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        se(le, {
          active: i.active
        }, null, 8, ["active"])
      ])) : k("", !0),
      e($).searchMessage ? (l(), u("div", $t, [
        s("span", xt, g(e($).searchMessage), 1),
        s("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: n[0] || (n[0] = (o) => e(N).resetSearch())
        }, "清空搜索")
      ])) : k("", !0),
      e($).emptyMessage ? (l(), u("p", Ct, g(e($).emptyMessage), 1)) : k("", !0),
      e($).cards.length ? (l(), u("div", {
        key: 4,
        class: E(["repos gh-grid", { "gh-batch-active": e($).batchMode }])
      }, [
        (l(!0), u(R, null, V(e($).cards, (o) => (l(), u("article", {
          key: o.fullName,
          class: E(["repo gh-card", { selected: o.selected }]),
          "data-repo-name": o.fullName,
          draggable: "true",
          onClick: (x) => v(x, o),
          onContextmenu: (x) => c(x, o),
          onDragstart: (x) => fe(x, o.fullName)
        }, [
          s("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: C((x) => c(x, o), ["stop"])
          }, "⋮", 8, St),
          s("div", Tt, [
            s("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: n[1] || (n[1] = C(() => {
              }, ["stop"]))
            }, [
              s("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: o.selected,
                onChange: (x) => e(N).setSelection(o.fullName, x.target.checked)
              }, null, 40, Et),
              n[17] || (n[17] = s("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            s("img", {
              class: "gh-owner-avatar",
              src: o.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: n[2] || (n[2] = (x) => x.target.src = "assets/github-star.svg")
            }, null, 40, At),
            s("a", {
              href: o.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: o.fullName
            }, [
              s("span", Mt, g(o.owner) + "/", 1),
              P(g(o.name), 1)
            ], 8, Dt)
          ]),
          s("div", Lt, [
            s("div", It, [
              s("span", {
                class: E(["gh-badge-folder", { uncat: !o.folder }]),
                title: o.folder ? `文件夹：${o.folder}（点击更换）` : "未分类（点击归类）",
                onClick: C((x) => y(o, x), ["stop"])
              }, g(o.folder ? `📁 ${o.folder}` : "＋ 未分类"), 11, Nt),
              e(b).repo === o.fullName ? (l(), oe(le, {
                key: 0,
                active: i.active
              }, null, 8, ["active"])) : o.customRemark ? (l(), u("span", {
                key: 1,
                class: "gh-badge-remark",
                title: `备注：${o.customRemark}（点击就地修改）`,
                onClick: C((x) => m(o), ["stop"])
              }, [
                n[18] || (n[18] = s("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                s("span", zt, g(o.customRemark), 1)
              ], 8, Ht)) : k("", !0),
              o.showUsedStatus && o.used ? (l(), u("span", {
                key: 2,
                class: "gh-badge-used",
                title: "已标记为正在使用（点击移除）",
                onClick: C((x) => e(N).removeUsed(o.fullName), ["stop"])
              }, "⚡ 正在使用", 8, Gt)) : k("", !0),
              o.showUsedStatus && o.releaseKind !== "none" && o.releaseUrl ? (l(), u("a", {
                key: 3,
                class: E(["gh-update-badge", { latest: o.releaseKind === "latest" }]),
                href: o.releaseUrl,
                target: "_blank",
                rel: "noreferrer"
              }, g(o.releaseText), 11, Bt)) : o.showUsedStatus && o.releaseKind !== "none" ? (l(), u("span", {
                key: 4,
                class: E(["gh-update-badge", { latest: o.releaseKind === "latest" }])
              }, g(o.releaseText), 3)) : k("", !0)
            ]),
            o.descriptionKind === "analyzing" ? (l(), u("p", Ut, [...n[19] || (n[19] = [
              s("span", { class: "gh-ai-sparkle" }, "✨", -1),
              P(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : o.descriptionKind === "ai" ? (l(), u("p", Pt, [
              n[20] || (n[20] = s("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              P(g(o.description), 1)
            ])) : o.descriptionKind === "plain" ? (l(), u("p", {
              key: 2,
              class: "desc",
              title: o.description
            }, g(o.description), 9, Vt)) : (l(), u("p", Kt, "暂无描述"))
          ]),
          s("div", Ot, [
            s("span", Ft, "★ " + g(o.stars), 1),
            o.language ? (l(), u("span", jt, g(o.language), 1)) : k("", !0),
            o.updated ? (l(), u("span", Jt, "更新 " + g(o.updated), 1)) : k("", !0)
          ])
        ], 42, Rt))), 128))
      ], 2)) : k("", !0),
      e($).totalPages > 1 ? (l(), u("div", Wt, [
        s("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: e($).page <= 1,
          onClick: n[3] || (n[3] = (o) => e(N).changePage(e($).page - 1))
        }, "‹ 上一页", 8, Yt),
        s("span", Zt, g(e($).page) + " / " + g(e($).totalPages) + " · 共 " + g(e($).totalItems) + " 个" + g(e($).serverPaged ? ` · 已加载 ${e($).loadedItems}` : ""), 1),
        s("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: e($).page >= e($).totalPages,
          onClick: n[4] || (n[4] = (o) => e(N).changePage(e($).page + 1))
        }, "下一页 ›", 8, qt)
      ])) : k("", !0),
      (l(), oe(Me, { to: "body" }, [
        i.active && t.visible ? (l(), u("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: De({ left: `${t.x}px`, top: `${t.y}px` }),
          onClick: n[15] || (n[15] = C(() => {
          }, ["stop"])),
          onContextmenu: n[16] || (n[16] = C(() => {
          }, ["prevent"]))
        }, [
          s("div", {
            class: E(["gh-menu-has-sub", { "is-active": r.value === "folder" }]),
            onMouseenter: n[7] || (n[7] = (o) => r.value = "folder")
          }, [
            n[21] || (n[21] = s("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              s("span", null, "📁 移动到文件夹"),
              s("span", { class: "sub-arrow" }, "›")
            ], -1)),
            s("div", {
              class: E(["gh-sub-flyout", { "flyout-left": f.value }]),
              onClick: n[6] || (n[6] = C(() => {
              }, ["stop"]))
            }, [
              s("button", {
                class: E(["fo-cover-menu-item", { primary: !t.folder }]),
                type: "button",
                onClick: n[5] || (n[5] = (o) => _(""))
              }, g(t.folder ? "  " : "✓ ") + "＋ 设为未分类（清旧使用标记） ", 3),
              (l(!0), u(R, null, V(e(A).cats, (o) => (l(), u("button", {
                key: o,
                class: E(["fo-cover-menu-item", { primary: t.folder === o }]),
                type: "button",
                onClick: (x) => _(o)
              }, g(t.folder === o ? "✓ " : "  ") + "📁 " + g(o), 11, Xt))), 128))
            ], 2)
          ], 34),
          s("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[8] || (n[8] = (o) => r.value = null),
            onClick: n[9] || (n[9] = (o) => m())
          }, " ✏️ 编辑备注… ", 32),
          se(He, {
            label: "💬 发送到聊天室",
            visible: t.visible,
            onOpen: n[10] || (n[10] = (o) => r.value = null),
            onSelect: pe
          }, null, 8, ["visible"]),
          t.hasRemark ? (l(), u("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[11] || (n[11] = (o) => r.value = null),
            onClick: O
          }, " 🗑️ 清除备注 ", 32)) : k("", !0),
          s("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[12] || (n[12] = (o) => r.value = null),
            onClick: S
          }, " 📋 复制仓库链接 ", 32),
          s("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[13] || (n[13] = (o) => r.value = null),
            onClick: be
          }, " ↗ 在 GitHub 打开 ", 32),
          s("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: n[14] || (n[14] = (o) => r.value = null),
            onClick: ge
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : k("", !0)
      ]))
    ], 64));
  }
}), Qt = { class: "gh-batch-bar-left" }, es = { class: "gh-batch-count-tip" }, ts = { id: "gh-batch-selected-count" }, ss = {
  key: 0,
  "aria-label": "批量移动确认"
}, os = ["disabled"], ns = ["value"], as = ["disabled"], rs = ["disabled"], is = { class: "gh-batch-bar-right" }, ls = ["disabled"], us = ["disabled"], ds = ["disabled"], ws = /* @__PURE__ */ z({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(a) {
    const i = a, d = Ne(), t = K(null);
    function r() {
      i.active && (d.value = A.prepareBatchMove(), t.value = null);
    }
    async function f() {
      const v = d.value, c = t.value;
      if (!i.active || !v || c === null || L.busy) return;
      await v.submit(c) && d.value === v && (d.value = void 0);
    }
    return ee(() => i.active && H.active, (v) => {
      v || (d.value = void 0);
    }), (v, c) => (l(), u(R, null, [
      s("div", Qt, [
        s("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: c[0] || (c[0] = (y) => e(Y).toggleSelectAll())
        }, g(e(H).allSelected ? "取消全选" : "全选"), 1),
        s("span", es, [
          c[5] || (c[5] = P("已选择 ", -1)),
          s("b", ts, g(e(H).selectedCount), 1),
          c[6] || (c[6] = P(" 项", -1))
        ])
      ]),
      d.value ? (l(), u("section", ss, [
        s("p", null, "仅移动打开选择器时的 " + g(d.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        s("details", null, [
          c[7] || (c[7] = s("summary", null, "查看本次仓库清单", -1)),
          s("ul", null, [
            (l(!0), u(R, null, V(d.value.names, (y) => (l(), u("li", { key: y }, g(y), 1))), 128))
          ])
        ]),
        de(s("select", {
          "onUpdate:modelValue": c[1] || (c[1] = (y) => t.value = y),
          "aria-label": "目标分类",
          disabled: e(L).busy
        }, [
          c[8] || (c[8] = s("option", {
            value: null,
            disabled: ""
          }, "请选择目标分类", -1)),
          c[9] || (c[9] = s("option", { value: "" }, "未分类（同时清除这些仓库的旧使用标记）", -1)),
          (l(!0), u(R, null, V(e(U).folders.filter((y) => y.kind === "custom"), (y) => (l(), u("option", {
            key: y.title,
            value: y.title
          }, g(y.title), 9, ns))), 128))
        ], 8, os), [
          [Ie, t.value]
        ]),
        s("button", {
          type: "button",
          disabled: !i.active || e(L).busy || t.value === null,
          onClick: f
        }, "确认移动", 8, as),
        s("button", {
          type: "button",
          disabled: e(L).busy,
          onClick: c[2] || (c[2] = (y) => d.value = void 0)
        }, "取消", 8, rs)
      ])) : k("", !0),
      s("div", is, [
        s("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !i.active || e(L).busy || e(H).selectedCount === 0,
          title: "固定当前选择，确认后批量移动",
          onClick: r
        }, " 📁 移动到文件夹 ", 8, ls),
        s("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: e(H).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: c[3] || (c[3] = (y) => e(Y).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, us),
        s("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: e(H).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: c[4] || (c[4] = (y) => e(Y).unstar())
        }, " 🗑 取消收藏 ", 8, ds)
      ])
    ], 64));
  }
});
export {
  ms as G,
  vs as _,
  ys as a,
  ks as b,
  ws as c,
  w as d,
  hs as g
};
