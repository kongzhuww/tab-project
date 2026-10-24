import { f as q, w as Y, o as J, d as F, g as a, I as K, x as s, h as o, i as t, t as l, k as Q, s as u, q as Z, D as tt, F as g, z as m, u as c, j as b, B as et, T as st, b as y, c as D } from "./vendor-vue-BUkfvXUI.js";
import { b as e, c as d } from "./GitHubBatchBar.vue_vue_type_script_setup_true_lang-BEl9lBhM.js";
import { _ as it } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const nt = {
  key: 0,
  class: "analysis-modal-overlay"
}, at = { class: "analysis-tabs" }, ot = ["title"], lt = { class: "active-tool-name" }, rt = { class: "analysis-dropdown-menu" }, dt = ["onClick"], ct = { class: "item-title" }, ut = { class: "item-hint" }, gt = {
  key: 0,
  class: "item-check"
}, pt = { class: "analysis-actions" }, yt = ["disabled"], ht = ["disabled"], vt = ["disabled"], mt = { class: "analysis-body" }, bt = {
  key: 0,
  class: "analysis-source-notice"
}, ft = {
  key: 1,
  class: "analysis-source-notice"
}, wt = {
  key: 2,
  class: "analysis-source-notice"
}, _t = {
  key: 3,
  class: "analysis-source-notice",
  role: "status"
}, kt = {
  key: 4,
  class: "analysis-source-notice",
  role: "status"
}, xt = {
  key: 5,
  class: "n8n-confirm-inline",
  "aria-label": "上次提交记录"
}, Ct = ["disabled"], Mt = ["disabled"], Tt = {
  key: 6,
  class: "n8n-confirm-inline",
  "aria-label": "确认提交 n8n"
}, Lt = ["disabled"], Et = ["disabled"], $t = {
  key: 7,
  role: "status"
}, Nt = {
  key: 8,
  class: "analysis-pane"
}, Bt = { class: "analysis-stat-bar" }, Pt = { class: "stat-pill" }, Dt = { class: "stat-pill" }, Rt = { class: "stat-toggle" }, At = {
  key: 0,
  class: "analysis-loading"
}, Ht = {
  key: 1,
  class: "analysis-error"
}, Wt = {
  key: 2,
  class: "analysis-code-viewport"
}, St = { class: "analysis-pre" }, Ot = {
  key: 9,
  class: "analysis-pane"
}, Gt = { class: "analysis-stat-bar" }, It = { class: "stat-pill" }, Yt = { class: "stat-pill" }, Ut = { class: "stat-toggle" }, Vt = {
  key: 0,
  class: "analysis-loading"
}, Xt = {
  key: 1,
  class: "analysis-error"
}, zt = {
  key: 2,
  class: "analysis-diagram-viewport"
}, jt = { class: "analysis-pre mermaid-pre" }, qt = {
  key: 3,
  class: "analysis-canvas-viewport"
}, Jt = ["viewBox"], Ft = { class: "diagram-edges" }, Kt = ["d"], Qt = ["d"], Zt = { class: "diagram-nodes" }, te = ["transform"], ee = ["width", "height"], se = {
  class: "node-category-tag",
  x: "12",
  y: "20"
}, ie = {
  class: "node-title",
  x: "12",
  y: "38"
}, ne = {
  class: "node-desc",
  x: "12",
  y: "56"
}, ae = {
  key: 10,
  class: "analysis-pane"
}, oe = { class: "analysis-stat-bar" }, le = { class: "stat-pill" }, re = { class: "stat-pill" }, de = { class: "stat-toggle" }, ce = {
  key: 0,
  class: "analysis-loading"
}, ue = {
  key: 1,
  class: "analysis-error"
}, ge = {
  key: 2,
  class: "analysis-code-viewport"
}, pe = { class: "analysis-pre" }, ye = {
  key: 3,
  class: "analysis-canvas-viewport archify-viewport"
}, he = ["viewBox"], ve = { class: "archify-clusters" }, me = ["x", "y", "width", "height"], be = ["x", "y"], fe = { class: "diagram-edges" }, we = ["d"], _e = ["d"], ke = { class: "diagram-nodes" }, xe = ["transform"], Ce = ["width", "height"], Me = {
  class: "node-category-tag",
  x: "12",
  y: "22"
}, Te = ["transform"], Le = {
  class: "node-title",
  x: "12",
  y: "42"
}, Ee = {
  class: "node-source-ref",
  x: "12",
  y: "60"
}, $e = {
  class: "node-protocol-tag",
  x: "12",
  y: "78"
}, Ne = {
  key: 11,
  class: "analysis-pane"
}, Be = {
  key: 0,
  class: "analysis-loading"
}, Pe = {
  key: 1,
  class: "analysis-error"
}, De = {
  key: 2,
  class: "analysis-wiki-viewport"
}, Re = { class: "analysis-pre wiki-pre" }, Ae = /* @__PURE__ */ q({
  __name: "GitHubAnalysisModal",
  setup(He) {
    const L = y(null), h = y({
      x: Math.max(20, Math.round((window.innerWidth - 640) / 2)),
      y: Math.max(40, Math.round((window.innerHeight - 560) / 2))
    }), f = y(!document.hidden);
    let E = !0, C, $ = 0;
    function M() {
      C?.hasPointerCapture($) && C.releasePointerCapture($), C = void 0, N = !1;
    }
    let N = !1, R = 0, A = 0, H = 0, W = 0;
    const v = y(!1), w = y("graph"), _ = y("graph"), p = y(!1), k = D(() => !!e.actionBusy || e.n8nSubmitting), U = D(() => e[e.activeTab].loading ? !1 : !!(e.activeTab === "gitingest" ? e.gitingest.fullText : e.activeTab === "gitdiagram" ? e.gitdiagram.mermaidCode : e.activeTab === "archify" ? e.archify.rawJson : e.deepwiki.wikiMarkdown).trim()), S = [
      { tab: "gitingest", label: "代码采样", desc: "本地 Git Tree / Blob 读取" },
      { tab: "gitdiagram", label: "目录示意", desc: "关键词规则，不是已验证架构" },
      { tab: "archify", label: "结构示意", desc: "本地模板，无源码行号证据" },
      { tab: "deepwiki", label: "README 摘录", desc: "读取文档，不调用在线 DeepWiki" }
    ], V = D(() => {
      const r = S.find((i) => i.tab === e.activeTab);
      return r ? r.label : "选择工具";
    });
    function X(r) {
      d.setTab(r), p.value = !1;
    }
    function B(r) {
      r.target.closest(".analysis-tool-dropdown-wrap") || (p.value = !1);
    }
    Y(
      () => e.isOpen,
      (r) => {
        if (r) {
          const i = L.value?.offsetWidth || 640, n = L.value?.offsetHeight || 560;
          h.value = {
            x: Math.max(20, Math.round((window.innerWidth - i) / 2)),
            y: Math.max(40, Math.round((window.innerHeight - n) / 2))
          }, v.value = !1;
        }
      }
    );
    function z(r) {
      if (r.target.closest("button, a, input, select") || !e.isOpen || !f.value) return;
      M();
      const i = r.currentTarget;
      C = i, $ = r.pointerId;
      try {
        i.setPointerCapture(r.pointerId);
      } catch {
      }
      N = !0, R = r.clientX, A = r.clientY, H = h.value.x, W = h.value.y;
    }
    function j(r) {
      if (!N) return;
      const i = r.clientX - R, n = r.clientY - A;
      h.value = {
        x: Math.max(10, Math.min(window.innerWidth - 100, H + i)),
        y: Math.max(10, Math.min(window.innerHeight - 60, W + n))
      };
    }
    function O(r) {
      M();
    }
    function P(r) {
      r.key === "Escape" && e.isOpen && d.close();
    }
    function x() {
      f.value = E && !document.hidden, d.setPageActive(f.value);
    }
    function G() {
      E = !1, x();
    }
    function I() {
      E = !0, x();
    }
    return Y(() => [e.isOpen, e.fullName, e.activeTab, f.value], () => {
      M(), p.value = !1, window.removeEventListener("keydown", P), window.removeEventListener("click", B), e.isOpen && f.value && (window.addEventListener("keydown", P), window.addEventListener("click", B));
    }, { immediate: !0, flush: "sync" }), J(() => {
      document.addEventListener("visibilitychange", x), window.addEventListener("pagehide", G), window.addEventListener("pageshow", I), x();
    }), F(() => {
      M(), d.setPageActive(!1), window.removeEventListener("keydown", P), window.removeEventListener("click", B), document.removeEventListener("visibilitychange", x), window.removeEventListener("pagehide", G), window.removeEventListener("pageshow", I);
    }), (r, i) => (a(), K(st, { to: "body" }, [
      s(e).isOpen ? (a(), o("div", nt, [
        t("div", {
          ref_key: "windowRef",
          ref: L,
          class: "analysis-modal-window",
          style: et({ position: "fixed", left: `${h.value.x}px`, top: `${h.value.y}px`, margin: "0", transform: "none" }),
          role: "dialog",
          "aria-modal": "false"
        }, [
          t("header", {
            class: "analysis-header",
            onPointerdown: z,
            onPointermove: j,
            onPointerup: O,
            onPointercancel: O
          }, [
            t("div", at, [
              t("span", {
                class: "analysis-repo-chip",
                title: s(e).fullName
              }, l(s(e).fullName.split("/")[1] || s(e).fullName), 9, ot),
              t("div", {
                class: "analysis-tool-dropdown-wrap",
                onClick: i[1] || (i[1] = Q(() => {
                }, ["stop"]))
              }, [
                t("button", {
                  type: "button",
                  class: u(["analysis-dropdown-trigger", { open: p.value }]),
                  title: "点击切换分析工具",
                  onClick: i[0] || (i[0] = (n) => p.value = !p.value)
                }, [
                  t("span", lt, l(V.value), 1),
                  i[17] || (i[17] = t("span", { class: "dropdown-arrow" }, "▾", -1))
                ], 2),
                Z(t("div", rt, [
                  (a(), o(g, null, m(S, (n) => t("button", {
                    key: n.tab,
                    type: "button",
                    class: u(["dropdown-menu-item", { active: s(e).activeTab === n.tab }]),
                    onClick: (T) => X(n.tab)
                  }, [
                    t("span", ct, l(n.label), 1),
                    t("span", ut, l(n.desc), 1),
                    s(e).activeTab === n.tab ? (a(), o("span", gt, "✓")) : c("", !0)
                  ], 10, dt)), 64))
                ], 512), [
                  [tt, p.value]
                ])
              ])
            ]),
            t("div", pt, [
              t("button", {
                type: "button",
                class: "analysis-tool-btn",
                disabled: k.value || s(e)[s(e).activeTab].loading,
                onClick: i[2] || (i[2] = //@ts-ignore
                (...n) => s(d).refreshCurrent && s(d).refreshCurrent(...n))
              }, "重新读取 / 生成", 8, yt),
              s(e).activeTab === "archify" ? (a(), o("button", {
                key: 0,
                type: "button",
                class: "analysis-tool-btn n8n",
                title: "确认后提交到 GitHub 设置中的 n8n Webhook",
                disabled: k.value || !!s(e).n8nConfirmation || !!s(e).n8nResult?.uncertain || s(e).archify.loading || !s(e).archify.data,
                onClick: i[3] || (i[3] = //@ts-ignore
                (...n) => s(d).triggerN8nWorkflow && s(d).triggerN8nWorkflow(...n))
              }, " 发往 n8n ", 8, ht)) : c("", !0),
              t("button", {
                type: "button",
                class: "analysis-tool-btn",
                title: "复制当前文本（喂给 LLM / 存档）",
                disabled: k.value || !U.value,
                onClick: i[4] || (i[4] = //@ts-ignore
                (...n) => s(d).copyCurrentContent && s(d).copyCurrentContent(...n))
              }, " 复制 ", 8, vt),
              t("button", {
                type: "button",
                class: "analysis-close-btn",
                title: "关闭视窗 (Esc)",
                onClick: i[5] || (i[5] = //@ts-ignore
                (...n) => s(d).close && s(d).close(...n))
              }, " ✕ ")
            ])
          ], 32),
          t("main", mt, [
            s(e).activeTab === "gitingest" ? (a(), o("p", bt, "本地代码采样：最多18个文件，每个最多64KiB、展示8000字符；目录预览最多150项，不是完整仓库或 AI 分析。")) : s(e).activeTab === "deepwiki" ? (a(), o("p", ft, "GitHub README 摘录；不是 DeepWiki 在线服务，没有 AI 推理或未经验证的功能介绍。")) : (a(), o("p", wt, "本地目录关键词与固定模板示意。节点、连接、协议未经源码验证，不是 GitDiagram / Archify 在线分析，也不提供源码证据。")),
            s(e).actionMessage ? (a(), o("p", _t, l(s(e).actionMessage), 1)) : c("", !0),
            s(e).actionBusy ? (a(), o("p", kt, l(s(e).actionBusy === "save" ? "原目标笔记保存仍在进行；切换或关闭窗口不撤回写入。" : "正在等待剪贴板确认；不会自动重试。"), 1)) : c("", !0),
            s(e).n8nResult ? (a(), o("section", xt, [
              t("p", null, "提交记录：" + l(s(e).n8nResult.repo) + " → " + l(s(e).n8nResult.origin) + "。" + l(s(e).n8nResult.message), 1),
              s(e).n8nResult.uncertain ? (a(), o(g, { key: 0 }, [
                i[19] || (i[19] = t("p", null, "这是本页内存记录，整页关闭或重载会丢失；扩展没有自动核对节点任务的接口。", -1)),
                s(e).n8nUnlockConfirmation ? (a(), o(g, { key: 1 }, [
                  i[18] || (i[18] = t("p", null, "确认已人工核对上述原仓库任务？此操作仅解除本页限制，不证明远端成功，也不会重新发送请求。", -1)),
                  t("button", {
                    type: "button",
                    class: "analysis-tool-btn",
                    disabled: k.value,
                    onClick: i[7] || (i[7] = //@ts-ignore
                    (...n) => s(d).acknowledgeN8nChecked && s(d).acknowledgeN8nChecked(...n))
                  }, "确认解除本页限制", 8, Mt),
                  t("button", {
                    type: "button",
                    class: "analysis-tool-btn",
                    onClick: i[8] || (i[8] = //@ts-ignore
                    (...n) => s(d).cancelN8nUnlock && s(d).cancelN8nUnlock(...n))
                  }, "保持锁定")
                ], 64)) : (a(), o("button", {
                  key: 0,
                  type: "button",
                  class: "analysis-tool-btn",
                  disabled: k.value,
                  onClick: i[6] || (i[6] = //@ts-ignore
                  (...n) => s(d).requestN8nUnlock && s(d).requestN8nUnlock(...n))
                }, "我已在节点侧核对", 8, Ct))
              ], 64)) : c("", !0)
            ])) : c("", !0),
            s(e).n8nConfirmation ? (a(), o("section", Tt, [
              t("p", null, "将 " + l(s(e).n8nConfirmation.repo) + " 的仓库名与架构数据发送到已配置节点 " + l(s(e).n8nConfirmation.origin) + "。内容是本地规则示意，不是已验证架构；可能含仓库路径，请确认节点可信，不发送 GitHub Token 或 AI 密钥。", 1),
              t("button", {
                type: "button",
                class: "analysis-tool-btn primary",
                disabled: s(e).n8nSubmitting,
                onClick: i[9] || (i[9] = //@ts-ignore
                (...n) => s(d).confirmN8nWorkflow && s(d).confirmN8nWorkflow(...n))
              }, "确认提交", 8, Lt),
              t("button", {
                type: "button",
                class: "analysis-tool-btn",
                disabled: s(e).n8nSubmitting,
                onClick: i[10] || (i[10] = //@ts-ignore
                (...n) => s(d).cancelN8nWorkflow && s(d).cancelN8nWorkflow(...n))
              }, "取消", 8, Et)
            ])) : c("", !0),
            s(e).n8nSubmitting ? (a(), o("p", $t, "正在准备或等待节点响应。关闭窗口不撤回已提交请求；请求发出后等待最长15秒，结果记录在原任务名下。")) : c("", !0),
            s(e).activeTab === "gitingest" ? (a(), o("div", Nt, [
              t("div", Bt, [
                t("span", Pt, [
                  i[20] || (i[20] = b("返回路径数: ", -1)),
                  t("b", null, l(s(e).gitingest.fileCount), 1)
                ]),
                t("span", Dt, [
                  i[21] || (i[21] = b("预估 Tokens: ", -1)),
                  t("b", null, "~" + l(s(e).gitingest.tokenCount.toLocaleString()), 1)
                ]),
                t("div", Rt, [
                  t("button", {
                    type: "button",
                    class: u(["toggle-chip", { active: !v.value }]),
                    onClick: i[11] || (i[11] = (n) => v.value = !1)
                  }, " 采样代码 Prompt ", 2),
                  t("button", {
                    type: "button",
                    class: u(["toggle-chip", { active: v.value }]),
                    onClick: i[12] || (i[12] = (n) => v.value = !0)
                  }, " 仅目录树 ", 2)
                ])
              ]),
              s(e).gitingest.loading ? (a(), o("div", At, [
                i[22] || (i[22] = t("div", { class: "loading-spin" }, "⚡", -1)),
                t("p", null, l(s(e).gitingest.progress || "正在抓取仓库并提炼…"), 1)
              ])) : s(e).gitingest.error ? (a(), o("div", Ht, " ⚠️ " + l(s(e).gitingest.error), 1)) : (a(), o("div", Wt, [
                t("pre", St, [
                  t("code", null, l(v.value ? s(e).gitingest.treeText : s(e).gitingest.fullText), 1)
                ])
              ]))
            ])) : s(e).activeTab === "gitdiagram" ? (a(), o("div", Ot, [
              t("div", Gt, [
                t("span", It, [
                  i[23] || (i[23] = b("规则节点: ", -1)),
                  t("b", null, l(s(e).gitdiagram.graph?.nodes.length || 0) + " 个", 1)
                ]),
                t("span", Yt, [
                  i[24] || (i[24] = b("示意连接: ", -1)),
                  t("b", null, l(s(e).gitdiagram.graph?.edges.length || 0) + " 条", 1)
                ]),
                t("div", Ut, [
                  t("button", {
                    type: "button",
                    class: u(["toggle-chip", { active: w.value === "graph" }]),
                    onClick: i[13] || (i[13] = (n) => w.value = "graph")
                  }, " 架构拓扑图 ", 2),
                  t("button", {
                    type: "button",
                    class: u(["toggle-chip", { active: w.value === "mermaid" }]),
                    onClick: i[14] || (i[14] = (n) => w.value = "mermaid")
                  }, " Mermaid 代码 ", 2)
                ])
              ]),
              s(e).gitdiagram.loading ? (a(), o("div", Vt, [...i[25] || (i[25] = [
                t("div", { class: "loading-spin" }, "⚡", -1),
                t("p", null, "正在为仓库绘制架构拓扑图…", -1)
              ])])) : s(e).gitdiagram.error ? (a(), o("div", Xt, " ⚠️ " + l(s(e).gitdiagram.error), 1)) : w.value === "mermaid" ? (a(), o("div", zt, [
                t("pre", jt, [
                  t("code", null, l(s(e).gitdiagram.mermaidCode), 1)
                ])
              ])) : (a(), o("div", qt, [
                s(e).gitdiagram.graph ? (a(), o("svg", {
                  key: 0,
                  class: "diagram-svg-canvas",
                  viewBox: `0 0 ${s(e).gitdiagram.graph.width} ${s(e).gitdiagram.graph.height}`,
                  preserveAspectRatio: "xMidYMid meet"
                }, [
                  i[26] || (i[26] = t("defs", null, [
                    t("marker", {
                      id: "diagram-arrow",
                      viewBox: "0 0 10 10",
                      refX: "9",
                      refY: "5",
                      markerWidth: "6",
                      markerHeight: "6",
                      orient: "auto-start-reverse"
                    }, [
                      t("path", {
                        d: "M 0 1.5 L 8 5 L 0 8.5 z",
                        fill: "#0284c7"
                      })
                    ])
                  ], -1)),
                  t("g", Ft, [
                    (a(!0), o(g, null, m(s(e).gitdiagram.graph.edges, (n, T) => (a(), o("g", {
                      key: T,
                      class: "edge-group"
                    }, [
                      t("path", {
                        d: n.pathD,
                        class: "edge-glow-line"
                      }, null, 8, Kt),
                      t("path", {
                        d: n.pathD,
                        class: "edge-main-line",
                        "marker-end": "url(#diagram-arrow)"
                      }, null, 8, Qt)
                    ]))), 128))
                  ]),
                  t("g", Zt, [
                    (a(!0), o(g, null, m(s(e).gitdiagram.graph.nodes, (n) => (a(), o("g", {
                      key: n.id,
                      class: "node-group",
                      transform: `translate(${n.x}, ${n.y})`
                    }, [
                      t("rect", {
                        class: u(["node-rect", `type-${n.category}`]),
                        width: n.width,
                        height: n.height,
                        rx: "8"
                      }, null, 10, ee),
                      t("text", se, l(n.categoryLabel), 1),
                      t("text", ie, l(n.name), 1),
                      t("text", ne, l(n.desc), 1)
                    ], 8, te))), 128))
                  ])
                ], 8, Jt)) : c("", !0)
              ]))
            ])) : s(e).activeTab === "archify" ? (a(), o("div", ae, [
              t("div", oe, [
                t("span", le, [
                  i[27] || (i[27] = b("架构组件: ", -1)),
                  t("b", null, l(s(e).archify.data?.nodes.length || 0) + " 个", 1)
                ]),
                t("span", re, [
                  i[28] || (i[28] = b("模板分组: ", -1)),
                  t("b", null, l(s(e).archify.data?.clusters.length || 0) + " 个", 1)
                ]),
                t("div", de, [
                  t("button", {
                    type: "button",
                    class: u(["toggle-chip", { active: _.value === "graph" }]),
                    onClick: i[15] || (i[15] = (n) => _.value = "graph")
                  }, " 交互式图谱 ", 2),
                  t("button", {
                    type: "button",
                    class: u(["toggle-chip", { active: _.value === "json" }]),
                    onClick: i[16] || (i[16] = (n) => _.value = "json")
                  }, " 强类型 JSON IR ", 2)
                ])
              ]),
              s(e).archify.loading ? (a(), o("div", ce, [...i[29] || (i[29] = [
                t("div", { class: "loading-spin" }, "⚡", -1),
                t("p", null, "正在生成本地规则示意…", -1)
              ])])) : s(e).archify.error ? (a(), o("div", ue, " ⚠️ " + l(s(e).archify.error), 1)) : _.value === "json" ? (a(), o("div", ge, [
                t("pre", pe, [
                  t("code", null, l(s(e).archify.rawJson), 1)
                ])
              ])) : (a(), o("div", ye, [
                s(e).archify.data ? (a(), o("svg", {
                  key: 0,
                  class: "diagram-svg-canvas",
                  viewBox: `0 0 ${s(e).archify.data.width} ${s(e).archify.data.height}`,
                  preserveAspectRatio: "xMidYMid meet"
                }, [
                  i[31] || (i[31] = t("defs", null, [
                    t("marker", {
                      id: "archify-arrow",
                      viewBox: "0 0 10 10",
                      refX: "9",
                      refY: "5",
                      markerWidth: "6",
                      markerHeight: "6",
                      orient: "auto-start-reverse"
                    }, [
                      t("path", {
                        d: "M 0 1.5 L 8 5 L 0 8.5 z",
                        fill: "#0284c7"
                      })
                    ])
                  ], -1)),
                  t("g", ve, [
                    (a(!0), o(g, null, m(s(e).archify.data.clusters, (n) => (a(), o("g", {
                      key: n.id
                    }, [
                      t("rect", {
                        class: "cluster-rect",
                        x: n.x,
                        y: n.y,
                        width: n.width,
                        height: n.height,
                        rx: "10"
                      }, null, 8, me),
                      t("text", {
                        class: "cluster-title",
                        x: n.x + 12,
                        y: n.y + 20
                      }, l(n.name), 9, be)
                    ]))), 128))
                  ]),
                  t("g", fe, [
                    (a(!0), o(g, null, m(s(e).archify.data.edges, (n, T) => (a(), o("g", {
                      key: T,
                      class: "edge-group"
                    }, [
                      t("path", {
                        d: n.pathD,
                        class: "edge-glow-line"
                      }, null, 8, we),
                      t("path", {
                        d: n.pathD,
                        class: "edge-main-line",
                        "marker-end": "url(#archify-arrow)"
                      }, null, 8, _e)
                    ]))), 128))
                  ]),
                  t("g", ke, [
                    (a(!0), o(g, null, m(s(e).archify.data.nodes, (n) => (a(), o("g", {
                      key: n.id,
                      class: "node-group",
                      transform: `translate(${n.x}, ${n.y})`
                    }, [
                      t("rect", {
                        class: u(["node-rect", `type-${n.role}`]),
                        width: n.width,
                        height: n.height,
                        rx: "8"
                      }, null, 10, Ce),
                      t("text", Me, l(n.roleLabel), 1),
                      t("g", {
                        transform: `translate(${n.width - 64}, 10)`
                      }, [...i[30] || (i[30] = [
                        t("rect", {
                          class: "src-pill-bg",
                          width: "54",
                          height: "16",
                          rx: "3"
                        }, null, -1),
                        t("text", {
                          class: "src-pill-text",
                          x: "27",
                          y: "11.5",
                          "text-anchor": "middle"
                        }, "未验证", -1)
                      ])], 8, Te),
                      t("text", Le, l(n.label), 1),
                      t("text", Ee, "📍 " + l(n.sourceRef), 1),
                      t("text", $e, "⚡ " + l(n.protocol), 1)
                    ], 8, xe))), 128))
                  ])
                ], 8, he)) : c("", !0)
              ]))
            ])) : s(e).activeTab === "deepwiki" ? (a(), o("div", Ne, [
              s(e).deepwiki.loading ? (a(), o("div", Be, [...i[32] || (i[32] = [
                t("div", { class: "loading-spin" }, "🌐", -1),
                t("p", null, "正在读取 README 文档…", -1)
              ])])) : s(e).deepwiki.error ? (a(), o("div", Pe, " ⚠️ " + l(s(e).deepwiki.error), 1)) : (a(), o("div", De, [
                t("pre", Re, [
                  t("code", null, l(s(e).deepwiki.wikiMarkdown), 1)
                ])
              ]))
            ])) : c("", !0)
          ])
        ], 4)
      ])) : c("", !0)
    ]));
  }
}), Ge = /* @__PURE__ */ it(Ae, [["__scopeId", "data-v-09ca8ba1"]]);
export {
  Ge as default
};
