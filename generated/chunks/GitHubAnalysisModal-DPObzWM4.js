import { f as F, w as G, o as K, d as U, g as n, I as q, x as i, h as o, i as t, t as l, k as Q, s as d, q as Z, D as tt, F as v, z as m, u as g, j as _, B as et, T as st, b as p, c as D } from "./vendor-vue-BUkfvXUI.js";
import { b as e, c } from "./GitHubBatchBar.vue_vue_type_script_setup_true_lang-YKsmnLxT.js";
import { _ as at } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const it = {
  key: 0,
  class: "analysis-modal-overlay"
}, nt = { class: "analysis-tabs" }, ot = ["title"], lt = { class: "active-tool-name" }, rt = { class: "analysis-dropdown-menu" }, dt = ["onClick"], ct = { class: "item-title" }, ut = { class: "item-hint" }, gt = {
  key: 0,
  class: "item-check"
}, pt = { class: "analysis-actions" }, ht = ["disabled"], yt = ["disabled"], vt = { class: "analysis-body" }, mt = {
  key: 0,
  class: "analysis-source-notice"
}, _t = {
  key: 1,
  class: "analysis-source-notice"
}, wt = {
  key: 2,
  class: "analysis-source-notice"
}, ft = {
  key: 3,
  class: "analysis-source-notice",
  role: "status"
}, bt = {
  key: 4,
  class: "analysis-source-notice",
  role: "status"
}, kt = {
  key: 5,
  class: "analysis-pane"
}, xt = { class: "analysis-stat-bar" }, Mt = { class: "stat-pill" }, Ct = { class: "stat-pill" }, Tt = { class: "stat-toggle" }, Lt = {
  key: 0,
  class: "analysis-loading"
}, Et = {
  key: 1,
  class: "analysis-error"
}, $t = {
  key: 2,
  class: "analysis-code-viewport"
}, Bt = { class: "analysis-pre" }, Pt = {
  key: 6,
  class: "analysis-pane"
}, Dt = { class: "analysis-stat-bar" }, At = { class: "stat-pill" }, Ht = { class: "stat-pill" }, Ot = { class: "stat-toggle" }, Rt = {
  key: 0,
  class: "analysis-loading"
}, Nt = {
  key: 1,
  class: "analysis-error"
}, St = {
  key: 2,
  class: "analysis-diagram-viewport"
}, Wt = { class: "analysis-pre mermaid-pre" }, Yt = {
  key: 3,
  class: "analysis-canvas-viewport"
}, It = ["viewBox"], Gt = { class: "diagram-edges" }, Vt = ["d"], Xt = ["d"], zt = { class: "diagram-nodes" }, jt = ["transform"], Jt = ["width", "height"], Ft = {
  class: "node-category-tag",
  x: "12",
  y: "20"
}, Kt = {
  class: "node-title",
  x: "12",
  y: "38"
}, Ut = {
  class: "node-desc",
  x: "12",
  y: "56"
}, qt = {
  key: 7,
  class: "analysis-pane"
}, Qt = { class: "analysis-stat-bar" }, Zt = { class: "stat-pill" }, te = { class: "stat-pill" }, ee = { class: "stat-toggle" }, se = {
  key: 0,
  class: "analysis-loading"
}, ae = {
  key: 1,
  class: "analysis-error"
}, ie = {
  key: 2,
  class: "analysis-code-viewport"
}, ne = { class: "analysis-pre" }, oe = {
  key: 3,
  class: "analysis-canvas-viewport archify-viewport"
}, le = ["viewBox"], re = { class: "archify-clusters" }, de = ["x", "y", "width", "height"], ce = ["x", "y"], ue = { class: "diagram-edges" }, ge = ["d"], pe = ["d"], he = { class: "diagram-nodes" }, ye = ["transform"], ve = ["width", "height"], me = {
  class: "node-category-tag",
  x: "12",
  y: "22"
}, _e = ["transform"], we = {
  class: "node-title",
  x: "12",
  y: "42"
}, fe = {
  class: "node-source-ref",
  x: "12",
  y: "60"
}, be = {
  class: "node-protocol-tag",
  x: "12",
  y: "78"
}, ke = {
  key: 8,
  class: "analysis-pane"
}, xe = {
  key: 0,
  class: "analysis-loading"
}, Me = {
  key: 1,
  class: "analysis-error"
}, Ce = {
  key: 2,
  class: "analysis-wiki-viewport"
}, Te = { class: "analysis-pre wiki-pre" }, Le = /* @__PURE__ */ F({
  __name: "GitHubAnalysisModal",
  setup(Ee) {
    const T = p(null), h = p({
      x: Math.max(20, Math.round((window.innerWidth - 640) / 2)),
      y: Math.max(40, Math.round((window.innerHeight - 560) / 2))
    }), w = p(!document.hidden);
    let L = !0, x, E = 0;
    function M() {
      x?.hasPointerCapture(E) && x.releasePointerCapture(E), x = void 0, $ = !1;
    }
    let $ = !1, A = 0, H = 0, O = 0, R = 0;
    const y = p(!1), f = p("graph"), b = p("graph"), u = p(!1), N = D(() => !!e.actionBusy || e.n8nSubmitting), V = D(() => e[e.activeTab].loading ? !1 : !!(e.activeTab === "gitingest" ? e.gitingest.fullText : e.activeTab === "gitdiagram" ? e.gitdiagram.mermaidCode : e.activeTab === "archify" ? e.archify.rawJson : e.deepwiki.wikiMarkdown).trim()), S = [
      { tab: "gitingest", label: "代码采样", desc: "本地 Git Tree / Blob 读取" },
      { tab: "gitdiagram", label: "目录示意", desc: "关键词规则，不是已验证架构" },
      { tab: "archify", label: "结构示意", desc: "本地模板，无源码行号证据" },
      { tab: "deepwiki", label: "README 摘录", desc: "读取文档，不调用在线 DeepWiki" }
    ], X = D(() => {
      const r = S.find((a) => a.tab === e.activeTab);
      return r ? r.label : "选择工具";
    });
    function z(r) {
      c.setTab(r), u.value = !1;
    }
    function B(r) {
      r.target.closest(".analysis-tool-dropdown-wrap") || (u.value = !1);
    }
    G(
      () => e.isOpen,
      (r) => {
        if (r) {
          const a = T.value?.offsetWidth || 640, s = T.value?.offsetHeight || 560;
          h.value = {
            x: Math.max(20, Math.round((window.innerWidth - a) / 2)),
            y: Math.max(40, Math.round((window.innerHeight - s) / 2))
          }, y.value = !1;
        }
      }
    );
    function j(r) {
      if (r.target.closest("button, a, input, select") || !e.isOpen || !w.value) return;
      M();
      const a = r.currentTarget;
      x = a, E = r.pointerId;
      try {
        a.setPointerCapture(r.pointerId);
      } catch {
      }
      $ = !0, A = r.clientX, H = r.clientY, O = h.value.x, R = h.value.y;
    }
    function J(r) {
      if (!$) return;
      const a = r.clientX - A, s = r.clientY - H;
      h.value = {
        x: Math.max(10, Math.min(window.innerWidth - 100, O + a)),
        y: Math.max(10, Math.min(window.innerHeight - 60, R + s))
      };
    }
    function W(r) {
      M();
    }
    function P(r) {
      r.key === "Escape" && e.isOpen && c.close();
    }
    function k() {
      w.value = L && !document.hidden, c.setPageActive(w.value);
    }
    function Y() {
      L = !1, k();
    }
    function I() {
      L = !0, k();
    }
    return G(() => [e.isOpen, e.fullName, e.activeTab, w.value], () => {
      M(), u.value = !1, window.removeEventListener("keydown", P), window.removeEventListener("click", B), e.isOpen && w.value && (window.addEventListener("keydown", P), window.addEventListener("click", B));
    }, { immediate: !0, flush: "sync" }), K(() => {
      document.addEventListener("visibilitychange", k), window.addEventListener("pagehide", Y), window.addEventListener("pageshow", I), k();
    }), U(() => {
      M(), c.setPageActive(!1), window.removeEventListener("keydown", P), window.removeEventListener("click", B), document.removeEventListener("visibilitychange", k), window.removeEventListener("pagehide", Y), window.removeEventListener("pageshow", I);
    }), (r, a) => (n(), q(st, { to: "body" }, [
      i(e).isOpen ? (n(), o("div", it, [
        t("div", {
          ref_key: "windowRef",
          ref: T,
          class: "analysis-modal-window",
          style: et({ position: "fixed", left: `${h.value.x}px`, top: `${h.value.y}px`, margin: "0", transform: "none" }),
          role: "dialog",
          "aria-modal": "false"
        }, [
          t("header", {
            class: "analysis-header",
            onPointerdown: j,
            onPointermove: J,
            onPointerup: W,
            onPointercancel: W
          }, [
            t("div", nt, [
              t("span", {
                class: "analysis-repo-chip",
                title: i(e).fullName
              }, l(i(e).fullName.split("/")[1] || i(e).fullName), 9, ot),
              t("div", {
                class: "analysis-tool-dropdown-wrap",
                onClick: a[1] || (a[1] = Q(() => {
                }, ["stop"]))
              }, [
                t("button", {
                  type: "button",
                  class: d(["analysis-dropdown-trigger", { open: u.value }]),
                  title: "点击切换分析工具",
                  onClick: a[0] || (a[0] = (s) => u.value = !u.value)
                }, [
                  t("span", lt, l(X.value), 1),
                  a[11] || (a[11] = t("span", { class: "dropdown-arrow" }, "▾", -1))
                ], 2),
                Z(t("div", rt, [
                  (n(), o(v, null, m(S, (s) => t("button", {
                    key: s.tab,
                    type: "button",
                    class: d(["dropdown-menu-item", { active: i(e).activeTab === s.tab }]),
                    onClick: (C) => z(s.tab)
                  }, [
                    t("span", ct, l(s.label), 1),
                    t("span", ut, l(s.desc), 1),
                    i(e).activeTab === s.tab ? (n(), o("span", gt, "✓")) : g("", !0)
                  ], 10, dt)), 64))
                ], 512), [
                  [tt, u.value]
                ])
              ])
            ]),
            t("div", pt, [
              t("button", {
                type: "button",
                class: "analysis-tool-btn",
                disabled: N.value || i(e)[i(e).activeTab].loading,
                onClick: a[2] || (a[2] = //@ts-ignore
                (...s) => i(c).refreshCurrent && i(c).refreshCurrent(...s))
              }, "重新读取 / 生成", 8, ht),
              t("button", {
                type: "button",
                class: "analysis-tool-btn",
                title: "复制当前文本（喂给 LLM / 存档）",
                disabled: N.value || !V.value,
                onClick: a[3] || (a[3] = //@ts-ignore
                (...s) => i(c).copyCurrentContent && i(c).copyCurrentContent(...s))
              }, " 复制 ", 8, yt),
              t("button", {
                type: "button",
                class: "analysis-close-btn",
                title: "关闭视窗 (Esc)",
                onClick: a[4] || (a[4] = //@ts-ignore
                (...s) => i(c).close && i(c).close(...s))
              }, " ✕ ")
            ])
          ], 32),
          t("main", vt, [
            i(e).activeTab === "gitingest" ? (n(), o("p", mt, "本地代码采样：最多18个文件，每个最多64KiB、展示8000字符；目录预览最多150项，不是完整仓库或 AI 分析。")) : i(e).activeTab === "deepwiki" ? (n(), o("p", _t, "GitHub README 摘录；不是 DeepWiki 在线服务，没有 AI 推理或未经验证的功能介绍。")) : (n(), o("p", wt, "本地目录关键词与固定模板示意。节点、连接、协议未经源码验证，不是 GitDiagram / Archify 在线分析，也不提供源码证据。")),
            i(e).actionMessage ? (n(), o("p", ft, l(i(e).actionMessage), 1)) : g("", !0),
            i(e).actionBusy ? (n(), o("p", bt, l(i(e).actionBusy === "save" ? "原目标笔记保存仍在进行；切换或关闭窗口不撤回写入。" : "正在等待剪贴板确认；不会自动重试。"), 1)) : g("", !0),
            i(e).activeTab === "gitingest" ? (n(), o("div", kt, [
              t("div", xt, [
                t("span", Mt, [
                  a[12] || (a[12] = _("返回路径数: ", -1)),
                  t("b", null, l(i(e).gitingest.fileCount), 1)
                ]),
                t("span", Ct, [
                  a[13] || (a[13] = _("预估 Tokens: ", -1)),
                  t("b", null, "~" + l(i(e).gitingest.tokenCount.toLocaleString()), 1)
                ]),
                t("div", Tt, [
                  t("button", {
                    type: "button",
                    class: d(["toggle-chip", { active: !y.value }]),
                    onClick: a[5] || (a[5] = (s) => y.value = !1)
                  }, " 采样代码 Prompt ", 2),
                  t("button", {
                    type: "button",
                    class: d(["toggle-chip", { active: y.value }]),
                    onClick: a[6] || (a[6] = (s) => y.value = !0)
                  }, " 仅目录树 ", 2)
                ])
              ]),
              i(e).gitingest.loading ? (n(), o("div", Lt, [
                a[14] || (a[14] = t("div", { class: "loading-spin" }, "⚡", -1)),
                t("p", null, l(i(e).gitingest.progress || "正在抓取仓库并提炼…"), 1)
              ])) : i(e).gitingest.error ? (n(), o("div", Et, " ⚠️ " + l(i(e).gitingest.error), 1)) : (n(), o("div", $t, [
                t("pre", Bt, [
                  t("code", null, l(y.value ? i(e).gitingest.treeText : i(e).gitingest.fullText), 1)
                ])
              ]))
            ])) : i(e).activeTab === "gitdiagram" ? (n(), o("div", Pt, [
              t("div", Dt, [
                t("span", At, [
                  a[15] || (a[15] = _("规则节点: ", -1)),
                  t("b", null, l(i(e).gitdiagram.graph?.nodes.length || 0) + " 个", 1)
                ]),
                t("span", Ht, [
                  a[16] || (a[16] = _("示意连接: ", -1)),
                  t("b", null, l(i(e).gitdiagram.graph?.edges.length || 0) + " 条", 1)
                ]),
                t("div", Ot, [
                  t("button", {
                    type: "button",
                    class: d(["toggle-chip", { active: f.value === "graph" }]),
                    onClick: a[7] || (a[7] = (s) => f.value = "graph")
                  }, " 架构拓扑图 ", 2),
                  t("button", {
                    type: "button",
                    class: d(["toggle-chip", { active: f.value === "mermaid" }]),
                    onClick: a[8] || (a[8] = (s) => f.value = "mermaid")
                  }, " Mermaid 代码 ", 2)
                ])
              ]),
              i(e).gitdiagram.loading ? (n(), o("div", Rt, [...a[17] || (a[17] = [
                t("div", { class: "loading-spin" }, "⚡", -1),
                t("p", null, "正在为仓库绘制架构拓扑图…", -1)
              ])])) : i(e).gitdiagram.error ? (n(), o("div", Nt, " ⚠️ " + l(i(e).gitdiagram.error), 1)) : f.value === "mermaid" ? (n(), o("div", St, [
                t("pre", Wt, [
                  t("code", null, l(i(e).gitdiagram.mermaidCode), 1)
                ])
              ])) : (n(), o("div", Yt, [
                i(e).gitdiagram.graph ? (n(), o("svg", {
                  key: 0,
                  class: "diagram-svg-canvas",
                  viewBox: `0 0 ${i(e).gitdiagram.graph.width} ${i(e).gitdiagram.graph.height}`,
                  preserveAspectRatio: "xMidYMid meet"
                }, [
                  a[18] || (a[18] = t("defs", null, [
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
                  t("g", Gt, [
                    (n(!0), o(v, null, m(i(e).gitdiagram.graph.edges, (s, C) => (n(), o("g", {
                      key: C,
                      class: "edge-group"
                    }, [
                      t("path", {
                        d: s.pathD,
                        class: "edge-glow-line"
                      }, null, 8, Vt),
                      t("path", {
                        d: s.pathD,
                        class: "edge-main-line",
                        "marker-end": "url(#diagram-arrow)"
                      }, null, 8, Xt)
                    ]))), 128))
                  ]),
                  t("g", zt, [
                    (n(!0), o(v, null, m(i(e).gitdiagram.graph.nodes, (s) => (n(), o("g", {
                      key: s.id,
                      class: "node-group",
                      transform: `translate(${s.x}, ${s.y})`
                    }, [
                      t("rect", {
                        class: d(["node-rect", `type-${s.category}`]),
                        width: s.width,
                        height: s.height,
                        rx: "8"
                      }, null, 10, Jt),
                      t("text", Ft, l(s.categoryLabel), 1),
                      t("text", Kt, l(s.name), 1),
                      t("text", Ut, l(s.desc), 1)
                    ], 8, jt))), 128))
                  ])
                ], 8, It)) : g("", !0)
              ]))
            ])) : i(e).activeTab === "archify" ? (n(), o("div", qt, [
              t("div", Qt, [
                t("span", Zt, [
                  a[19] || (a[19] = _("架构组件: ", -1)),
                  t("b", null, l(i(e).archify.data?.nodes.length || 0) + " 个", 1)
                ]),
                t("span", te, [
                  a[20] || (a[20] = _("模板分组: ", -1)),
                  t("b", null, l(i(e).archify.data?.clusters.length || 0) + " 个", 1)
                ]),
                t("div", ee, [
                  t("button", {
                    type: "button",
                    class: d(["toggle-chip", { active: b.value === "graph" }]),
                    onClick: a[9] || (a[9] = (s) => b.value = "graph")
                  }, " 交互式图谱 ", 2),
                  t("button", {
                    type: "button",
                    class: d(["toggle-chip", { active: b.value === "json" }]),
                    onClick: a[10] || (a[10] = (s) => b.value = "json")
                  }, " 强类型 JSON IR ", 2)
                ])
              ]),
              i(e).archify.loading ? (n(), o("div", se, [...a[21] || (a[21] = [
                t("div", { class: "loading-spin" }, "⚡", -1),
                t("p", null, "正在生成本地规则示意…", -1)
              ])])) : i(e).archify.error ? (n(), o("div", ae, " ⚠️ " + l(i(e).archify.error), 1)) : b.value === "json" ? (n(), o("div", ie, [
                t("pre", ne, [
                  t("code", null, l(i(e).archify.rawJson), 1)
                ])
              ])) : (n(), o("div", oe, [
                i(e).archify.data ? (n(), o("svg", {
                  key: 0,
                  class: "diagram-svg-canvas",
                  viewBox: `0 0 ${i(e).archify.data.width} ${i(e).archify.data.height}`,
                  preserveAspectRatio: "xMidYMid meet"
                }, [
                  a[23] || (a[23] = t("defs", null, [
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
                  t("g", re, [
                    (n(!0), o(v, null, m(i(e).archify.data.clusters, (s) => (n(), o("g", {
                      key: s.id
                    }, [
                      t("rect", {
                        class: "cluster-rect",
                        x: s.x,
                        y: s.y,
                        width: s.width,
                        height: s.height,
                        rx: "10"
                      }, null, 8, de),
                      t("text", {
                        class: "cluster-title",
                        x: s.x + 12,
                        y: s.y + 20
                      }, l(s.name), 9, ce)
                    ]))), 128))
                  ]),
                  t("g", ue, [
                    (n(!0), o(v, null, m(i(e).archify.data.edges, (s, C) => (n(), o("g", {
                      key: C,
                      class: "edge-group"
                    }, [
                      t("path", {
                        d: s.pathD,
                        class: "edge-glow-line"
                      }, null, 8, ge),
                      t("path", {
                        d: s.pathD,
                        class: "edge-main-line",
                        "marker-end": "url(#archify-arrow)"
                      }, null, 8, pe)
                    ]))), 128))
                  ]),
                  t("g", he, [
                    (n(!0), o(v, null, m(i(e).archify.data.nodes, (s) => (n(), o("g", {
                      key: s.id,
                      class: "node-group",
                      transform: `translate(${s.x}, ${s.y})`
                    }, [
                      t("rect", {
                        class: d(["node-rect", `type-${s.role}`]),
                        width: s.width,
                        height: s.height,
                        rx: "8"
                      }, null, 10, ve),
                      t("text", me, l(s.roleLabel), 1),
                      t("g", {
                        transform: `translate(${s.width - 64}, 10)`
                      }, [...a[22] || (a[22] = [
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
                      ])], 8, _e),
                      t("text", we, l(s.label), 1),
                      t("text", fe, "📍 " + l(s.sourceRef), 1),
                      t("text", be, "⚡ " + l(s.protocol), 1)
                    ], 8, ye))), 128))
                  ])
                ], 8, le)) : g("", !0)
              ]))
            ])) : i(e).activeTab === "deepwiki" ? (n(), o("div", ke, [
              i(e).deepwiki.loading ? (n(), o("div", xe, [...a[24] || (a[24] = [
                t("div", { class: "loading-spin" }, "🌐", -1),
                t("p", null, "正在读取 README 文档…", -1)
              ])])) : i(e).deepwiki.error ? (n(), o("div", Me, " ⚠️ " + l(i(e).deepwiki.error), 1)) : (n(), o("div", Ce, [
                t("pre", Te, [
                  t("code", null, l(i(e).deepwiki.wikiMarkdown), 1)
                ])
              ]))
            ])) : g("", !0)
          ])
        ], 4)
      ])) : g("", !0)
    ]));
  }
}), De = /* @__PURE__ */ at(Le, [["__scopeId", "data-v-cd7033d3"]]);
export {
  De as default
};
