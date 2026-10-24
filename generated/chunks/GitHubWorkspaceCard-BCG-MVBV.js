import { f as O, g as a, h as r, i as e, q as H, v as U, u as f, F as $, z as L, s as y, t as u, x as b, k as I, b as h, c as R, w as T, a as Z, D as ee, m as se, I as x, j as te, l as A, J as ae } from "./vendor-vue-BUkfvXUI.js";
import { u as oe } from "./useCardActivity-C9m6Z3UX.js";
import { c, as as ie, at as le, u as ne } from "./search.service-CipPV7Bz.js";
import { _ as re, d as de, e as ce, f as ue, h as me, g as N } from "./GitHubBatchBar.vue_vue_type_script_setup_true_lang-YKsmnLxT.js";
import { A as ge } from "./AccountSetupGuide-CyxqXFu_.js";
import he from "./GitHubTrending-QwBNsQFw.js";
import { _ as z } from "./_plugin-vue_export-helper-CHgC5LLL.js";
const be = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], pe = [
  // 1. AI 与大模型
  {
    id: "awesome-generative-ai",
    name: "awesome-generative-ai",
    title: "生成式 AI 大全 (Generative AI)",
    category: "ai",
    desc: "精选各类顶尖生成式 AI 工具、模型架构、API 服务与研究论文索引。",
    stars: "18k+",
    url: "https://github.com/steven2358/awesome-generative-ai",
    tags: ["LLM", "Diffusion", "AI工具", "GPT"]
  },
  {
    id: "awesome-llm",
    name: "Awesome-LLM",
    title: "大语言模型权威全景指南",
    category: "ai",
    desc: "覆盖全球主流大语言模型（LLM）的论文、微调框架、评测基准与实战资料。",
    stars: "22k+",
    url: "https://github.com/Hannibal046/Awesome-LLM",
    tags: ["深度学习", "LLM", "论文", "微调"]
  },
  {
    id: "awesome-chatgpt-prompts",
    name: "awesome-chatgpt-prompts",
    title: "ChatGPT / Claude 提示词神级指南",
    category: "ai",
    desc: "全球最受欢迎的优质提示词合集，包含编程专家、角色扮演、写作助理等海量 Prompt。",
    stars: "120k+",
    url: "https://github.com/f/awesome-chatgpt-prompts",
    tags: ["Prompt", "ChatGPT", "Claude", "效率"]
  },
  {
    id: "awesome-langchain",
    name: "awesome-langchain",
    title: "LangChain & Agent 生态精选",
    category: "ai",
    desc: "精选基于 LangChain、LlamaIndex 等构建的智能体、RAG 向量检索与应用示例。",
    stars: "11k+",
    url: "https://github.com/kyrolabs/awesome-langchain",
    tags: ["Agent", "RAG", "向量检索", "Python"]
  },
  // 2. 现代前端
  {
    id: "awesome-vue",
    name: "awesome-vue",
    title: "Vue.js 官方精选生态资源",
    category: "frontend",
    desc: "Vue 3 官方社区维护的周边全景：UI 组件库、状态管理、模板、工具与教程。",
    stars: "72k+",
    url: "https://github.com/vuejs/awesome-vue",
    tags: ["Vue3", "UI库", "Pinia", "Vite"]
  },
  {
    id: "awesome-react",
    name: "awesome-react",
    title: "React 生态完整全景清单",
    category: "frontend",
    desc: "精选 React 核心生态资源：Next.js、Hooks、动画库、表单与全栈方案。",
    stars: "66k+",
    url: "https://github.com/enaqx/awesome-react",
    tags: ["React", "Next.js", "前端", "Hooks"]
  },
  {
    id: "awesome-tailwind-css",
    name: "awesome-tailwindcss",
    title: "Tailwind CSS 神器集合",
    category: "frontend",
    desc: "优质 Tailwind 插件、设计系统组件、配色生成器与现代排版实践。",
    stars: "16k+",
    url: "https://github.com/aniftyco/awesome-tailwindcss",
    tags: ["CSS", "Tailwind", "样式", "UI"]
  },
  {
    id: "awesome-electron",
    name: "awesome-electron",
    title: "Electron 桌面端开发精选",
    category: "frontend",
    desc: "使用 Web 技术打造跨平台桌面软件的实用框架、打包工具与知名开源软件清单。",
    stars: "26k+",
    url: "https://github.com/sindresorhus/awesome-electron",
    tags: ["桌面端", "CrossPlatform", "Node"]
  },
  // 3. 后端与多语言
  {
    id: "awesome-python",
    name: "awesome-python",
    title: "Python 顶级开源库与框架大全",
    category: "backend",
    desc: "Python 开发者必备百科全书：涵盖爬虫、Web 框架、并发、科学计算与工具库。",
    stars: "230k+",
    url: "https://github.com/vinta/awesome-python",
    tags: ["Python", "FastAPI", "自动化", "爬虫"]
  },
  {
    id: "awesome-go",
    name: "awesome-go",
    title: "Go 语言实用包与高并发工具",
    category: "backend",
    desc: "Golang 高性能后端、微服务架构、网络库、存储引擎与脚手架。",
    stars: "140k+",
    url: "https://github.com/avelino/awesome-go",
    tags: ["Go", "高并发", "微服务", "网络"]
  },
  {
    id: "awesome-rust",
    name: "awesome-rust",
    title: "Rust 语言神级开源应用与库",
    category: "backend",
    desc: "极速且安全的现代系统编程：WebAssembly、高性能网络、CLI 工具与游戏开发。",
    stars: "45k+",
    url: "https://github.com/rust-unofficial/awesome-rust",
    tags: ["Rust", "系统级", "WASM", "高性能"]
  },
  {
    id: "awesome-nodejs",
    name: "awesome-nodejs",
    title: "Node.js 实用包与服务端清单",
    category: "backend",
    desc: "高星 Node.js 库、异步处理、文件系统与现代后端运行时方案。",
    stars: "57k+",
    url: "https://github.com/sindresorhus/awesome-nodejs",
    tags: ["Node.js", "TypeScript", "后端"]
  },
  // 4. 自建服务与私有云
  {
    id: "awesome-selfhosted",
    name: "awesome-selfhosted",
    title: "Self-Hosted 自由自建私有服务大全",
    category: "selfhosted",
    desc: "摆脱云服务垄断！自建个人网盘、家庭媒体中心、个人笔记、密码管理器与 Git 服务器。",
    stars: "210k+",
    url: "https://github.com/awesome-selfhosted/awesome-selfhosted",
    tags: ["私有云", "Docker", "NAS", "本地优先"]
  },
  {
    id: "awesome-docker",
    name: "awesome-docker",
    title: "Docker 容器技术与镜像实战",
    category: "selfhosted",
    desc: "容器化部署精选、Compose 模板、轻量运维面板与极速优化工具。",
    stars: "31k+",
    url: "https://github.com/veggiemonk/awesome-docker",
    tags: ["Docker", "容器", "DevOps", "运维"]
  },
  {
    id: "awesome-sysadmin",
    name: "awesome-sysadmin",
    title: "Linux 与系统管理员神级清单",
    category: "selfhosted",
    desc: "系统监控、备份方案、自动化编排、日志分析与安全加固必备开源神器。",
    stars: "28k+",
    url: "https://github.com/kahun/awesome-sysadmin",
    tags: ["Linux", "系统管理", "监控", "备份"]
  },
  // 5. CLI 与效率工具
  {
    id: "awesome-cli",
    name: "awesome-cli-apps",
    title: "现代命令行 CLI 生产力神器",
    category: "tools",
    desc: "终极终端生产力！现代替代品（bat、eza、ripgrep、fzf）与炫酷终端增强应用。",
    stars: "25k+",
    url: "https://github.com/agarrharr/awesome-cli-apps",
    tags: ["终端", "命令行", "CLI", "效率"]
  },
  {
    id: "awesome-mac",
    name: "awesome-mac",
    title: "macOS 绝赞开源与实用软件清单",
    category: "tools",
    desc: "让 Mac 体验更进一步的顶尖开发者工具、窗口管理、效率辅助与设计软件。",
    stars: "74k+",
    url: "https://github.com/jaywcjlove/awesome-mac",
    tags: ["macOS", "桌面", "效率", "开发工具"]
  },
  {
    id: "awesome-windows",
    name: "awesome-windows",
    title: "Windows 开发者高级工具合集",
    category: "tools",
    desc: "针对 Windows 10/11 的极简美化、WSL2、终端配置、PowerToys 与效率神器。",
    stars: "11k+",
    url: "https://github.com/Awesome-Windows/Awesome",
    tags: ["Windows", "WSL", "美化", "工具"]
  },
  // 6. 计算机体系与学习
  {
    id: "awesome-cs-courses",
    name: "awesome-cs-courses",
    title: "全球顶尖名校计算机公开课汇总",
    category: "learning",
    desc: "斯坦福、MIT、伯克利等世界名校的计算机科学系统化自学路线与视频作业。",
    stars: "61k+",
    url: "https://github.com/prakhar1989/awesome-courses",
    tags: ["计算机科学", "名校课程", "算法", "操作系统"]
  },
  {
    id: "awesome-free-programming-books",
    name: "free-programming-books",
    title: "经典免费编程电子书大全",
    category: "learning",
    desc: "全语言覆盖的权威经典开源技术书籍、教程与交互式编程学习资源。",
    stars: "340k+",
    url: "https://github.com/EbookFoundation/free-programming-books",
    tags: ["电子书", "编程入门", "教程", "免费资源"]
  },
  {
    id: "awesome-algorithms",
    name: "awesome-algorithms",
    title: "数据结构与算法精选索引",
    category: "learning",
    desc: "刷题必备、算法可视化、经典数据结构实现与面试精编题解。",
    stars: "17k+",
    url: "https://github.com/tayllan/awesome-algorithms",
    tags: ["算法", "数据结构", "LeetCode", "面试"]
  }
], ve = { class: "gh-awesome-wrapper" }, fe = { class: "gh-awesome-header" }, we = { class: "gh-awesome-intro" }, ye = { class: "gh-awesome-search-box" }, ke = { class: "gh-awesome-pills" }, _e = ["onClick"], Ce = { class: "gh-awesome-grid" }, Se = ["onClick"], Ae = { class: "gh-awesome-card-head" }, xe = { class: "gh-awesome-card-name" }, $e = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Ge = { class: "gh-awesome-desc" }, Le = { class: "gh-awesome-footer" }, Te = { class: "gh-awesome-tags" }, He = ["href"], Ie = {
  key: 0,
  class: "gh-awesome-empty"
}, Re = /* @__PURE__ */ O({
  __name: "GitHubAwesome",
  setup(D) {
    const S = h("all"), l = h(""), p = R(() => {
      const d = l.value.trim().toLowerCase(), o = S.value;
      return pe.filter((t) => o === "all" || t.category === o ? d ? t.name.toLowerCase().includes(d) || t.title.toLowerCase().includes(d) || t.desc.toLowerCase().includes(d) || t.tags.some((m) => m.toLowerCase().includes(d)) : !0 : !1);
    });
    function w(d) {
      window.open(d, "_blank", "noreferrer");
    }
    return (d, o) => (a(), r("div", ve, [
      e("header", fe, [
        e("div", we, [
          o[3] || (o[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", ye, [
            H(e("input", {
              "onUpdate:modelValue": o[0] || (o[0] = (t) => l.value = t),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [U, l.value]
            ]),
            l.value ? (a(), r("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: o[1] || (o[1] = (t) => l.value = "")
            }, "✕")) : f("", !0)
          ])
        ]),
        e("div", ke, [
          (a(!0), r($, null, L(b(be), (t) => (a(), r("button", {
            key: t.id,
            type: "button",
            class: y(["gh-awesome-pill", { active: S.value === t.id }]),
            onClick: (n) => S.value = t.id
          }, [
            e("span", null, u(t.icon), 1),
            e("b", null, u(t.name), 1)
          ], 10, _e))), 128))
        ])
      ]),
      e("div", Ce, [
        (a(!0), r($, null, L(p.value, (t) => (a(), r("article", {
          key: t.id,
          class: "gh-awesome-card",
          onClick: (n) => w(t.url)
        }, [
          e("div", Ae, [
            e("div", xe, [
              e("strong", null, u(t.title), 1),
              e("small", null, u(t.name), 1)
            ]),
            e("span", $e, "★ " + u(t.stars), 1)
          ]),
          e("p", Ge, u(t.desc), 1),
          e("div", Le, [
            e("div", Te, [
              (a(!0), r($, null, L(t.tags, (n) => (a(), r("span", {
                key: n,
                class: "gh-awesome-tag"
              }, u(n), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: t.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: o[2] || (o[2] = I(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, He)
          ])
        ], 8, Se))), 128)),
        p.value.length ? f("", !0) : (a(), r("div", Ie, [...o[4] || (o[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Me = /* @__PURE__ */ z(Re, [["__scopeId", "data-v-28a8995f"]]), Ee = ["inert"], Pe = { class: "card-head" }, Ve = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, We = ["title"], je = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Ne = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Oe = ["placeholder"], Ue = ["title"], ze = { class: "gh-search-rule-icon" }, De = { class: "gh-search-rule-text" }, qe = { class: "gh-settings-anchor" }, Be = ["aria-expanded"], Fe = {
  key: 0,
  class: "muted small",
  role: "status"
}, Qe = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Je = { class: "gh-bili-layout" }, Ke = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, Xe = ["title"], Ye = { class: "fo-sidebar-toggle-title" }, Ze = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, es = ["aria-expanded", "title"], ss = { class: "fo-sidebar-toggle-chevron" }, ts = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, as = { class: "fo-sidebar-sub-wrap" }, os = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, is = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, ls = { class: "gh-bili-sidebar-head" }, ns = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, rs = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, ds = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, cs = { id: "vue-github-status-root" }, us = { id: "vue-github-repositories-root" }, ms = /* @__PURE__ */ O({
  __name: "GitHubWorkspaceCard",
  setup(D) {
    const S = ae(() => import("./GitHubSettingsModal-D0DrX4XP.js")), { active: l } = oe("card-github", "/github.html");
    let p = 0, w = !1, d;
    const o = h(""), t = h("stars");
    T(() => l.value && t.value === "stars", (i) => c.setAiViewActive(i), { immediate: !0, flush: "sync" });
    const n = h(!1), m = h("local"), k = h(""), v = h(!1), M = h(0);
    function q() {
      l.value && (v.value = !0, ++M.value);
    }
    const E = h(!1);
    T(v, (i) => {
      i && (E.value = !0);
    });
    const P = h(null);
    let _ = 0;
    function G(i) {
      t.value = i, i === "trending" ? N.switchTab("trending") : N.switchTab("stars");
    }
    function B() {
      t.value = "stars";
    }
    const V = [
      { id: "exact", icon: "🎯", name: "精确", desc: "严格匹配完整关键词" },
      { id: "fuzzy", icon: "🔍", name: "模糊", desc: "多词拆解自由容错" },
      { id: "topic", icon: "🏷️", name: "标签", desc: "优先匹配Topic与分类" },
      { id: "smart", icon: "✨", name: "语义", desc: "技术近义词与联想" }
    ], W = h(c.searchRule || "exact"), C = R(() => V.find((i) => i.id === W.value) || V[0]);
    function F() {
      const i = c.cycleSearchRule();
      W.value = i;
    }
    const Q = R(() => m.value === "global" ? "在 GitHub 全网搜索开源仓库…" : `在当前分类中${C.value.name}搜索 Star 仓库…`);
    function j() {
      clearTimeout(_), !(!l.value || m.value !== "local") && (_ = window.setTimeout(() => c.setSearchQuery(k.value.trim().toLowerCase()), 180));
    }
    function J() {
      m.value = m.value === "local" ? "global" : "local", m.value === "local" && j();
    }
    function K() {
      k.value = "", clearTimeout(_), c.resetLocalSearch();
    }
    function X() {
      const i = k.value.trim();
      m.value === "local" ? (clearTimeout(_), c.setSearchQuery(i.toLowerCase())) : i && window.open(`https://github.com/search?q=${encodeURIComponent(i)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function Y() {
      ++p, w = !0, o.value = "";
    }
    return T(l, async (i) => {
      const s = ++p;
      if (clearTimeout(_), d?.abort(), d = new AbortController(), i || d.abort(), c.setRepositoryViewSignal(d.signal), !!i) {
        if (w) {
          await c.resumeRepositoryReads();
          return;
        }
        if (c.repos.length || c.loadingAllStars || c.loadingPage) {
          w = !0;
          return;
        }
        try {
          const g = await ie();
          if (!l.value || s !== p) return;
          w = !0, await c.loadGitHub(g.ghUser, g.ghToken);
        } catch {
          if (!l.value || s !== p) return;
          w = !1, o.value = "GitHub 初始化失败；请检查设置，或重新进入后重试。";
        }
      }
    }, { immediate: !0, flush: "sync" }), Z(() => {
      c.setAiViewActive(!1), ++p, d?.abort(), clearTimeout(_);
    }), (i, s) => (a(), r("section", {
      class: y(["card wide", { "card-fullscreen": b(ne).activeId === "card-github" }]),
      id: "card-github",
      inert: !b(l)
    }, [
      e("header", Pe, [
        s[12] || (s[12] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        s[13] || (s[13] = e("h2", null, "GitHub", -1)),
        s[14] || (s[14] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", Ve, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: I(X, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: m.value === "local" ? "切换为 GitHub 全站搜索" : "切换为当前分类搜索",
              onClick: J
            }, [
              e("span", je, u(m.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Ne, u(m.value === "local" ? "当前分类" : "GitHub 全站"), 1),
              s[9] || (s[9] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, We),
            H(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": s[0] || (s[0] = (g) => k.value = g),
              placeholder: Q.value,
              autocomplete: "off",
              onInput: j
            }, null, 40, Oe), [
              [U, k.value]
            ]),
            m.value === "local" ? (a(), r("button", {
              key: 0,
              type: "button",
              class: y(["gh-search-rule-btn", `rule-${C.value.id}`]),
              title: `当前匹配规则：${C.value.name}（${C.value.desc}）
点击切换下一个规则`,
              onClick: I(F, ["stop"])
            }, [
              e("span", ze, u(C.value.icon), 1),
              e("span", De, u(C.value.name), 1)
            ], 10, Ue)) : f("", !0),
            H(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: "清空搜索",
              onClick: K
            }, "✕", 512), [
              [ee, k.value]
            ]),
            s[10] || (s[10] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          s[11] || (s[11] = se('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-89461de4><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-89461de4><input type="checkbox" value="exact" checked data-v-89461de4>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-89461de4><input type="checkbox" value="loose" data-v-89461de4>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-89461de4><input type="checkbox" value="related" data-v-89461de4>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-89461de4><input type="checkbox" value="topic" data-v-89461de4>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-89461de4><input type="checkbox" value="readme" data-v-89461de4>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-89461de4></div>', 2))
        ]),
        e("div", qe, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: P,
            "aria-expanded": v.value,
            "aria-label": "GitHub 设置",
            class: "gh-head-settings-btn",
            title: "GitHub 模组偏好设置 (账号、Token、AI模型、缓存)",
            onClick: s[1] || (s[1] = (g) => v.value = !v.value)
          }, " ⚙️ ", 8, Be),
          E.value ? (a(), x(b(S), {
            key: 0,
            visible: b(l) && v.value,
            anchor: P.value,
            "ai-request": M.value,
            onAccountReload: Y,
            onClose: s[2] || (s[2] = (g) => v.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : f("", !0)
        ])
      ]),
      o.value ? (a(), r("p", Fe, u(o.value), 1)) : f("", !0),
      e("div", Qe, [
        e("div", Je, [
          e("aside", Ke, [
            e("div", {
              class: y(["fo-sidebar-toggle-bar", { "is-collapsed": n.value }]),
              title: n.value ? "点击展开快捷频道" : "点击收起快捷频道",
              onClick: s[3] || (s[3] = (g) => n.value = !n.value)
            }, [
              e("div", Ye, [
                s[15] || (s[15] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                s[16] || (s[16] = e("span", null, "快捷频道", -1)),
                n.value ? (a(), r("span", Ze, "3")) : f("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !n.value,
                title: n.value ? "展开" : "收起"
              }, [
                e("span", null, u(n.value ? "展开" : "收起"), 1),
                e("span", ss, u(n.value ? "▾" : "▴"), 1)
              ], 8, es)
            ], 10, Xe),
            n.value ? f("", !0) : (a(), r("div", ts, [
              e("div", as, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: y(["fo-sidebar-sub-btn", { on: t.value === "stars" }]),
                  title: "查看与管理 Star 星标仓库",
                  onClick: s[4] || (s[4] = (g) => G("stars"))
                }, [...s[17] || (s[17] = [
                  e("div", { class: "fo-sidebar-sub-main" }, [
                    e("span", { class: "fo-sidebar-sub-icon" }, "⭐"),
                    e("div", { class: "fo-sidebar-sub-text" }, [
                      e("strong", null, "Star 收藏"),
                      e("small", null, "星标项目 · 文件夹管理")
                    ])
                  ], -1),
                  e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1)
                ])], 2)
              ]),
              e("div", os, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: y(["fo-sidebar-sub-btn", { on: t.value === "trending" }]),
                  title: "查看 GitHub 实时趋势项目",
                  onClick: s[5] || (s[5] = (g) => G("trending"))
                }, [...s[18] || (s[18] = [
                  e("div", { class: "fo-sidebar-sub-main" }, [
                    e("span", { class: "fo-sidebar-sub-icon" }, "🔥"),
                    e("div", { class: "fo-sidebar-sub-text" }, [
                      e("strong", null, "趋势榜单"),
                      e("small", null, "开源风向标 · 今日/近7天")
                    ])
                  ], -1),
                  e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1)
                ])], 2)
              ]),
              e("div", is, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: y(["fo-sidebar-sub-btn", { on: t.value === "awesome" }]),
                  title: "查看 Awesome 精选开源资源清单",
                  onClick: s[6] || (s[6] = (g) => G("awesome"))
                }, [...s[19] || (s[19] = [
                  e("div", { class: "fo-sidebar-sub-main" }, [
                    e("span", { class: "fo-sidebar-sub-icon" }, "🌟"),
                    e("div", { class: "fo-sidebar-sub-text" }, [
                      e("strong", null, "Awesome 专区"),
                      e("small", null, "神级清单 · 全球精选")
                    ])
                  ], -1),
                  e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1)
                ])], 2)
              ])
            ])),
            e("header", ls, [
              s[20] || (s[20] = e("div", null, [
                e("b", { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, [
                  e("i", { class: "fo-folder-icon" }),
                  te(" 收藏文件夹")
                ]),
                e("small", { style: { color: "var(--dim)", "font-size": "9.5px" } }, "单一文件夹 · 独立正在使用")
              ], -1)),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: "新建文件夹",
                "aria-label": "新建文件夹",
                onClick: s[7] || (s[7] = (g) => b(c).promptCreateFolder())
              }, "＋")
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: B
            }, [
              A(re, { active: b(l) }, null, 8, ["active"])
            ])
          ]),
          e("section", ns, [
            t.value === "stars" && b(le).accountConfigured === !1 ? (a(), x(ge, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: s[8] || (s[8] = (g) => v.value = !0)
            })) : t.value === "stars" ? (a(), r($, { key: 1 }, [
              e("header", rs, [
                A(de, { onOpenAiSettings: q })
              ]),
              s[21] || (s[21] = e("div", { class: "gh-main-subbar" }, [
                e("span", {
                  id: "gh-rate",
                  class: "gh-rate"
                }),
                e("button", {
                  type: "button",
                  class: "gh-batch-toggle-btn",
                  id: "gh-batch-toggle-btn",
                  hidden: "",
                  style: { display: "none" }
                }, "批量操作")
              ], -1)),
              e("div", ds, [
                A(ce, {
                  active: b(l) && t.value === "stars"
                }, null, 8, ["active"])
              ]),
              s[22] || (s[22] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", cs, [
                A(ue)
              ]),
              e("div", us, [
                A(me, {
                  active: b(l) && t.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : t.value === "trending" ? (a(), x(he, { key: 2 })) : t.value === "awesome" ? (a(), x(Me, { key: 3 })) : f("", !0)
          ])
        ])
      ])
    ], 10, Ee));
  }
}), ys = /* @__PURE__ */ z(ms, [["__scopeId", "data-v-89461de4"]]);
export {
  ys as default
};
