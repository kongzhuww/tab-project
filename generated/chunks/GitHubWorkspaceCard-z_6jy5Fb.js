import { d as _e, o as n, g as r, h as e, n as ue, q as ye, i as S, F as B, j as K, C as j, t as l, u as t, k as J, b as I, y as ne, r as ke, w as we, D as Ue, z as Pe, A as Oe, m as He, e as re, l as We, B as ze, p as oe, G as Qe, L as at, H as lt, s as Ne, E as it } from "./vendor-vue-FFI3kJnP.js";
import { u as rt } from "./useCardActivity-BEFieaWK.js";
import { D as st, E as xe, t as O, A as ut, y as ct } from "./search.service-BlryTTnm.js";
import { A as dt } from "./AccountSetupGuide-ZDGhjuNx.js";
import { g as pt, _ as ht, a as Je } from "./main-DYcoynvZ.js";
import mt from "./GitHubTrending-Cp6_IfTC.js";
import { _ as $e, t as G } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { s as Te } from "./storage-cache.service-BYF2zxXX.js";
import { n as Ze, r as gt } from "./view-styles-DvHQtuGC.js";
import { m as he } from "./core-utils-Ccz-tarm.js";
const ft = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], bt = [
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
], vt = { class: "gh-awesome-wrapper" }, yt = { class: "gh-awesome-header" }, wt = { class: "gh-awesome-intro" }, _t = { class: "gh-awesome-search-box" }, kt = { class: "gh-awesome-pills" }, $t = ["onClick"], Ct = { class: "gh-awesome-grid" }, Gt = ["onClick"], Tt = { class: "gh-awesome-card-head" }, Rt = { class: "gh-awesome-card-name" }, Mt = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, St = { class: "gh-awesome-desc" }, Lt = { class: "gh-awesome-footer" }, At = { class: "gh-awesome-tags" }, xt = ["href"], Dt = {
  key: 0,
  class: "gh-awesome-empty"
}, Ht = /* @__PURE__ */ _e({
  __name: "GitHubAwesome",
  setup(v) {
    const a = I("all"), o = I(""), s = ne(() => {
      const f = o.value.trim().toLowerCase(), $ = a.value;
      return bt.filter((c) => $ === "all" || c.category === $ ? f ? c.name.toLowerCase().includes(f) || c.title.toLowerCase().includes(f) || c.desc.toLowerCase().includes(f) || c.tags.some((A) => A.toLowerCase().includes(f)) : !0 : !1);
    });
    function h(f) {
      window.open(f, "_blank", "noreferrer");
    }
    return (f, $) => (n(), r("div", vt, [
      e("header", yt, [
        e("div", wt, [
          $[3] || ($[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", _t, [
            ue(e("input", {
              "onUpdate:modelValue": $[0] || ($[0] = (c) => o.value = c),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [ye, o.value]
            ]),
            o.value ? (n(), r("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: $[1] || ($[1] = (c) => o.value = "")
            }, "✕")) : S("", !0)
          ])
        ]),
        e("div", kt, [
          (n(!0), r(B, null, K(t(ft), (c) => (n(), r("button", {
            key: c.id,
            type: "button",
            class: j(["gh-awesome-pill", { active: a.value === c.id }]),
            onClick: (m) => a.value = c.id
          }, [
            e("span", null, l(c.icon), 1),
            e("b", null, l(c.name), 1)
          ], 10, $t))), 128))
        ])
      ]),
      e("div", Ct, [
        (n(!0), r(B, null, K(s.value, (c) => (n(), r("article", {
          key: c.id,
          class: "gh-awesome-card",
          onClick: (m) => h(c.url)
        }, [
          e("div", Tt, [
            e("div", Rt, [
              e("strong", null, l(c.title), 1),
              e("small", null, l(c.name), 1)
            ]),
            e("span", Mt, "★ " + l(c.stars), 1)
          ]),
          e("p", St, l(c.desc), 1),
          e("div", Lt, [
            e("div", At, [
              (n(!0), r(B, null, K(c.tags, (m) => (n(), r("span", {
                key: m,
                class: "gh-awesome-tag"
              }, l(m), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: c.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: $[2] || ($[2] = J(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, xt)
          ])
        ], 8, Gt))), 128)),
        s.value.length ? S("", !0) : (n(), r("div", Dt, [...$[4] || ($[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Ut = /* @__PURE__ */ $e(Ht, [["__scopeId", "data-v-28a8995f"]]), Re = "gh_my_repos_cache_v1", Me = "gh_my_repo_groups_v2", Se = "gh_my_repo_groups_map_v2", M = ke({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function ge(v) {
  return v.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class be {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return be.instance || (be.instance = new be()), be.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(a = !1) {
    if (!a && this.inFlightPromise)
      return this.inFlightPromise;
    a && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const o = this.abortController.signal, s = (async () => {
      await this.loadPersistedGroups();
      const h = await Te.get(Re);
      if (h && h.length ? this.hydrateRepos(h) : M.repos.length && this.hydrateRepos(M.repos), a || !M.repos.length) {
        M.loading = !0, M.errorMessage = "";
        try {
          await this.fetchRemote(o);
        } catch ($) {
          if ($.name === "AbortError") return;
          M.errorMessage = $.message || "获取个人仓库失败";
        } finally {
          M.loading = !1;
        }
      } else
        this.fetchRemote(o).catch(() => {
        });
    })();
    return this.inFlightPromise = s.finally(() => {
      this.inFlightPromise === s && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(a) {
    const { ghUser: o, ghToken: s } = await st();
    if (!o && !s) {
      M.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const h = xe(s), f = [], $ = /* @__PURE__ */ new Set();
    if (o)
      try {
        const m = `https://api.github.com/users/${encodeURIComponent(o)}/repos?type=owner&sort=updated&per_page=100`, A = await fetch(m, { method: "GET", headers: h, signal: a });
        if (A.ok) {
          const x = await A.json();
          if (Array.isArray(x))
            for (const T of x)
              T && T.id && !$.has(T.id) && ($.add(T.id), f.push(T));
        }
      } catch (m) {
        if (m.name === "AbortError") throw m;
      }
    if (s)
      try {
        const A = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: h, signal: a });
        if (A.ok) {
          const x = await A.json();
          if (Array.isArray(x))
            for (const T of x)
              T && T.id && !$.has(T.id) && ($.add(T.id), f.push(T));
        }
      } catch (m) {
        if (m.name === "AbortError") throw m;
      }
    if (!f.length) {
      M.repos.length || (M.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const c = f.map((m) => {
      const A = m.full_name || `${m.owner?.login || o}/${m.name}`, x = m.name, T = M.repoGroupsMap[A] || M.repoGroupsMap[x] || M.repoGroupsMap[A.toLowerCase()] || M.repoGroupsMap[x.toLowerCase()] || [];
      return {
        id: m.id,
        name: m.name,
        fullName: A,
        description: m.description || "",
        isPrivate: !!m.private,
        isFork: !!m.fork,
        htmlUrl: m.html_url || `https://github.com/${o}/${m.name}`,
        language: m.language || null,
        stargazersCount: Number(m.stargazers_count) || 0,
        forksCount: Number(m.forks_count) || 0,
        openIssuesCount: Number(m.open_issues_count) || 0,
        topics: Array.isArray(m.topics) ? m.topics.map((P) => String(P).toLowerCase()) : [],
        localGroups: T,
        updatedAt: m.updated_at || "",
        pushedAt: m.pushed_at || "",
        defaultBranch: m.default_branch || "main"
      };
    });
    this.hydrateRepos(c), await Te.set(Re, c, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(a) {
    let o = !1;
    M.repos = a.map((s) => {
      const h = M.repoGroupsMap[s.fullName] || M.repoGroupsMap[s.name] || M.repoGroupsMap[s.fullName.toLowerCase()] || M.repoGroupsMap[s.name.toLowerCase()], f = s.localGroups && s.localGroups.length ? s.localGroups : null, $ = this.inferGroupsForRepo(s, M.customGroups), c = (h && h.length ? h : null) || f || $, m = c ? [...new Set(c.filter(Boolean))] : [];
      return m.length && (!M.repoGroupsMap[s.fullName] || !M.repoGroupsMap[s.fullName].length) && (M.repoGroupsMap[s.fullName] = m, o = !0), {
        ...s,
        localGroups: m
      };
    }), o && this.persistGroupsMap();
  }
  /**
   * 智能推断仓库最匹配的分组归属（仅在无手动归类时作为平滑桥接）
   */
  inferGroupsForRepo(a, o) {
    if (!o || !o.length) return [];
    const s = [], h = a.name.toLowerCase(), f = (a.topics || []).map(($) => $.toLowerCase());
    for (const $ of o) {
      const c = $.toLowerCase();
      if ((c.includes("fork") || $.includes("分支")) && (a.isFork || f.includes("fork"))) {
        s.push($);
        continue;
      }
      if ((c.includes("浏览器") || c.includes("browser") || c.includes("chrome") || c.includes("edge")) && (f.some((m) => m.includes("extension") || m.includes("browser") || m.includes("newtab")) || h.includes("tab-project"))) {
        s.push($);
        continue;
      }
      if ((c.includes("pi") || $.includes("PI")) && (f.some((m) => m.includes("pi") || m.includes("grounding-pi")) || h.includes("pi-") || h.includes("-pi"))) {
        s.push($);
        continue;
      }
      if (c.includes("herdr") && (f.some((m) => m.includes("herdr")) || h.includes("herdr"))) {
        s.push($);
        continue;
      }
      if ((c.includes("嵌入式") || c.includes("embedded") || c.includes("单片机")) && (f.some((m) => m.includes("embedded") || m.includes("zephyr") || m.includes("stm32") || m.includes("k230")) || h.includes("k230") || h.includes("mspm0") || h.includes("pid-") || h.includes("zephyr"))) {
        s.push($);
        continue;
      }
      if ((c.includes("美化") || c.includes("theme") || c.includes("style")) && (f.some((m) => m.includes("theme") || m.includes("beauty") || m.includes("ui")) || h.includes("theme") || h.includes("style"))) {
        s.push($);
        continue;
      }
    }
    return s;
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(a, o) {
    const s = ge(o);
    s && (a.localGroups.includes(s) || a.localGroups.push(s), M.repoGroupsMap[a.fullName] = [...a.localGroups], await this.persistGroupsMap(), await Te.set(Re, M.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(a, o) {
    a.localGroups = a.localGroups.filter((s) => s !== o), M.repoGroupsMap[a.fullName] = [...a.localGroups], await this.persistGroupsMap(), await Te.set(Re, M.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(a, o) {
    if (!o)
      a.localGroups = [];
    else {
      const s = ge(o);
      if (!s) return;
      a.localGroups = [s];
    }
    M.repoGroupsMap[a.fullName] = [...a.localGroups], await this.persistGroupsMap(), await Te.set(Re, M.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(a) {
    const o = ge(a);
    return o ? M.customGroups.includes(o) ? (alert(`分组「${o}」已存在。`), null) : (M.customGroups.push(o), await this.persistGroups(), o) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(a, o) {
    const s = ge(o);
    return s ? a === s ? !0 : M.customGroups.includes(s) ? (alert(`已存在名为「${s}」的分组。`), !1) : (M.customGroups = M.customGroups.map((h) => h === a ? s : h), M.repos.forEach((h) => {
      h.localGroups.includes(a) && (h.localGroups = h.localGroups.map((f) => f === a ? s : f), M.repoGroupsMap[h.fullName] = [...h.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(a) {
    const o = M.repos.filter((h) => h.localGroups.includes(a)).length, s = o > 0 ? `确定删除分组「${a}」吗？
该分组下的 ${o} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${a}」吗？`;
    return confirm(s) ? (M.customGroups = M.customGroups.filter((h) => h !== a), M.repos.forEach((h) => {
      h.localGroups.includes(a) && (h.localGroups = h.localGroups.filter((f) => f !== a), M.repoGroupsMap[h.fullName] = [...h.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let a = null, o = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const s = await chrome.storage.local.get([Me, Se]);
        a = s?.[Me], o = s?.[Se];
      }
      if (!a || !Array.isArray(a)) {
        const s = localStorage.getItem(Me);
        s && (a = JSON.parse(s));
      }
      if (!o || typeof o != "object") {
        const s = localStorage.getItem(Se);
        s && (o = JSON.parse(s));
      }
      Array.isArray(a) && (M.customGroups = a.map(ge).filter(Boolean)), o && typeof o == "object" && (M.repoGroupsMap = o);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const a = { ...M.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Se]: a }), localStorage.setItem(Se, JSON.stringify(a));
    } catch {
    }
  }
  async persistGroups() {
    const a = Array.from(new Set(M.customGroups.map(ge).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Me]: a }), localStorage.setItem(Me, JSON.stringify(a));
    } catch {
    }
  }
}
const te = be.getInstance(), Pt = { class: "my-repos-workspace" }, It = {
  key: 0,
  class: "error-banner"
}, Et = { class: "shelf-header" }, Nt = { class: "shelf-left" }, jt = { class: "shelf-badge" }, Ft = { class: "shelf-right" }, Ot = { class: "shelf-search-wrap" }, Wt = ["disabled", "title"], zt = ["title"], Bt = ["onDragstart", "onContextmenu"], Yt = { class: "repo-card-head" }, Vt = ["title", "onClick"], qt = {
  key: 0,
  class: "badge-repo-visibility private"
}, Kt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Xt = ["title"], Qt = {
  key: 1,
  class: "repo-topics-row"
}, Jt = { class: "repo-card-footer" }, Zt = { class: "meta-left" }, es = {
  key: 0,
  class: "meta-item lang"
}, ts = { class: "meta-item" }, ss = {
  key: 1,
  class: "meta-item"
}, os = ["title"], ns = { class: "board-columns-track" }, as = ["onDragover", "onDragleave", "onDrop"], ls = { class: "column-header" }, is = {
  key: 0,
  class: "column-title-group"
}, rs = ["title"], us = { class: "badge-count" }, cs = {
  key: 1,
  class: "column-rename-group"
}, ds = ["onKeydown"], ps = ["onClick"], hs = { class: "column-actions" }, ms = ["onClick"], gs = {
  key: 0,
  class: "col-popover-menu"
}, fs = ["onClick"], bs = ["onClick"], vs = { class: "column-cards-scroll" }, ys = ["onDragstart", "onContextmenu"], ws = { class: "repo-card-head" }, _s = ["title", "onClick"], ks = {
  key: 0,
  class: "badge-repo-visibility private"
}, $s = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Cs = ["title"], Gs = { class: "repo-topics-row" }, Ts = { class: "topic-chip active-chip" }, Rs = ["onClick"], Ms = { class: "repo-card-footer" }, Ss = { class: "meta-left" }, Ls = {
  key: 0,
  class: "meta-item lang"
}, As = { class: "meta-item" }, xs = {
  key: 1,
  class: "meta-item"
}, Ds = { class: "meta-date" }, Hs = {
  key: 0,
  class: "empty-column-placeholder"
}, Us = { class: "board-column new-column-slot" }, Ps = {
  key: 1,
  class: "new-column-composer"
}, Is = { class: "composer-actions" }, Es = ["onClick"], Ns = /* @__PURE__ */ _e({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(v) {
    const a = v, o = I(""), s = I(!1), h = I(null), f = I(""), $ = I(null), c = I(null), m = I(null), A = I(!1);
    function x() {
      A.value = !A.value;
    }
    function T(u) {
      const i = m.value;
      i && (Math.abs(u.deltaX) > Math.abs(u.deltaY) && u.deltaX !== 0 || u.deltaY !== 0 && (u.preventDefault(), i.scrollLeft += u.deltaY));
    }
    const P = I(null), k = I(null), R = I(null);
    let C = null, W = 0;
    const H = ke({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), X = I(null), ae = I(!1);
    function q() {
      H.visible = !1, X.value = null;
    }
    function ce(u, i, d) {
      u.preventDefault(), u.stopPropagation();
      let w = u.clientX, ee = u.clientY;
      w > window.innerWidth - 200 && (w = window.innerWidth - 210), ee > window.innerHeight - 240 && (ee = window.innerHeight - 245), H.x = w, H.y = ee, H.repo = i, H.fromGroup = d, H.visible = !0, X.value = "folder", ae.value = w > window.innerWidth - 380;
    }
    async function le() {
      const u = H.repo;
      q(), u && await te.moveRepoToGroup(u, null);
    }
    async function U(u) {
      const i = H.repo;
      q(), i && await te.moveRepoToGroup(i, u);
    }
    async function E() {
      const u = H.repo;
      if (q(), !!u)
        try {
          await navigator.clipboard.writeText(u.htmlUrl), Ze.show({
            appName: "GitHub",
            title: G("github.myRepos.copiedUrlTitle"),
            message: G("github.myRepos.copiedUrlMsg", { name: u.name })
          });
        } catch {
        }
    }
    async function N() {
      const u = H.repo;
      if (q(), !!u)
        try {
          const i = `git clone ${u.htmlUrl}.git`;
          await navigator.clipboard.writeText(i), Ze.show({
            appName: "GitHub",
            title: G("github.myRepos.copiedCloneTitle"),
            message: i
          });
        } catch {
        }
    }
    function Y() {
      const u = H.repo;
      q(), u && Ee(u.htmlUrl);
    }
    function se() {
      const u = H.repo;
      q(), u && pt.open({
        fullName: u.fullName,
        description: u.description || "",
        stars: u.stargazersCount,
        language: u.language || void 0,
        updated: u.pushedAt
      });
    }
    function z(u) {
      u.target?.closest(".gh-repo-context-menu") || H.visible && q();
    }
    function _(u) {
      u.key === "Escape" && H.visible && q();
    }
    const V = ne(() => M.customGroups), Ce = ne(() => {
      const u = M.searchQuery.trim().toLowerCase();
      return u ? M.repos.filter(
        (i) => i.name.toLowerCase().includes(u) || i.description.toLowerCase().includes(u) || i.localGroups.some((d) => d.toLowerCase().includes(u)) || i.topics.some((d) => d.toLowerCase().includes(u)) || i.language && i.language.toLowerCase().includes(u)
      ) : M.repos;
    }), de = ne(() => Ce.value.filter((u) => !u.localGroups.length));
    function ie(u) {
      return Ce.value.filter((i) => i.localGroups.includes(u));
    }
    async function Ge() {
      const u = o.value.trim();
      if (!u) return;
      await te.createGroup(u) && (o.value = "", s.value = !1);
    }
    function De(u) {
      $.value = u, f.value = u, h.value = null;
    }
    async function b(u) {
      const i = f.value.trim();
      if (!i || i === u) {
        $.value = null;
        return;
      }
      await te.renameGroup(u, i) && ($.value = null);
    }
    async function p(u) {
      h.value = null, await te.deleteGroup(u);
    }
    async function g(u, i) {
      await te.removeRepoFromGroup(u, i);
    }
    function L(u) {
      const i = c.value;
      if (!i) return;
      const w = u.target?.closest(".column-cards-scroll");
      if (w && w.scrollHeight > w.clientHeight && !u.shiftKey && u.deltaX === 0) {
        const ee = w.scrollTop <= 0 && u.deltaY < 0, nt = w.scrollTop + w.clientHeight >= w.scrollHeight - 1 && u.deltaY > 0;
        if (!ee && !nt)
          return;
      }
      Math.abs(u.deltaX) > Math.abs(u.deltaY) && u.deltaX !== 0 || u.deltaY !== 0 && (u.preventDefault(), i.scrollLeft += u.deltaY);
    }
    function Q(u) {
      if (!P.value || !c.value) return;
      u.preventDefault();
      const i = u.deltaX !== 0 ? u.deltaX : u.deltaY;
      c.value.scrollLeft += i;
    }
    function pe() {
      if (C !== null) return;
      const u = () => {
        c.value && W !== 0 ? (c.value.scrollLeft += W, C = requestAnimationFrame(u)) : me();
      };
      C = requestAnimationFrame(u);
    }
    function me() {
      C !== null && (cancelAnimationFrame(C), C = null), W = 0;
    }
    function Be(u) {
      if (!P.value || !c.value) return;
      const i = c.value.getBoundingClientRect(), d = 100;
      if (u > i.right - d) {
        const w = Math.min(1, Math.max(0.1, (u - (i.right - d)) / d));
        W = Math.round(w * 20), pe();
      } else if (u < i.left + d) {
        const w = Math.min(1, Math.max(0.1, (i.left + d - u) / d));
        W = -Math.round(w * 20), pe();
      } else
        me();
    }
    function ot(u) {
      P.value && (u.preventDefault(), Be(u.clientX));
    }
    function Ye(u, i, d) {
      q(), P.value = i, k.value = d, u.dataTransfer && (u.dataTransfer.effectAllowed = "move", u.dataTransfer.setData("text/plain", `${i.id}:${d}`)), window.addEventListener("wheel", Q, { passive: !1 });
    }
    function Ie() {
      P.value = null, k.value = null, R.value = null, me(), window.removeEventListener("wheel", Q);
    }
    function Ve(u, i) {
      P.value && (u.preventDefault(), u.dataTransfer && (u.dataTransfer.dropEffect = "move"), R.value = i, Be(u.clientX));
    }
    function qe(u, i) {
      const d = u.currentTarget, w = u.relatedTarget;
      d?.contains(w) || R.value === i && (R.value = null);
    }
    async function Ke(u, i) {
      u.preventDefault();
      const d = P.value, w = k.value;
      Ie(), d && (i === "default" ? w && w !== "default" ? await te.removeRepoFromGroup(d, w) : await te.moveRepoToGroup(d, null) : (await te.addRepoToGroup(d, i), w && w !== "default" && w !== i && await te.removeRepoFromGroup(d, w)));
    }
    function Ee(u) {
      window.open(u, "_blank", "noopener,noreferrer");
    }
    function Xe(u) {
      if (!u) return "";
      try {
        const i = new Date(u);
        return `${i.getFullYear()}-${String(i.getMonth() + 1).padStart(2, "0")}-${String(i.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return we(
      () => a.active,
      (u) => {
        q(), u && te.load();
      }
    ), Ue(() => {
      window.addEventListener("pointerdown", z), window.addEventListener("keydown", _), te.load();
    }), Pe(() => {
      me(), window.removeEventListener("wheel", Q), window.removeEventListener("pointerdown", z), window.removeEventListener("keydown", _);
    }), (u, i) => (n(), r("div", Pt, [
      t(M).errorMessage ? (n(), r("div", It, [
        e("span", null, "⚠️ " + l(t(M).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: i[0] || (i[0] = (d) => t(te).load(!0))
        }, "重试")
      ])) : S("", !0),
      e("section", {
        class: j(["default-shelf-area", { "is-collapsed": A.value, "drop-active": R.value === "default" }]),
        onDragover: i[4] || (i[4] = (d) => Ve(d, "default")),
        onDragleave: i[5] || (i[5] = (d) => qe(d, "default")),
        onDrop: i[6] || (i[6] = (d) => Ke(d, "default"))
      }, [
        e("header", Et, [
          e("div", Nt, [
            i[23] || (i[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            i[24] || (i[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", jt, l(de.value.length), 1),
            i[25] || (i[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", Ft, [
            e("div", Ot, [
              i[26] || (i[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              ue(e("input", {
                "onUpdate:modelValue": i[1] || (i[1] = (d) => t(M).searchQuery = d),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [ye, t(M).searchQuery]
              ]),
              t(M).searchQuery ? (n(), r("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: i[2] || (i[2] = (d) => t(M).searchQuery = "")
              }, "✕")) : S("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(M).loading,
              title: t(G)("github.myRepos.refreshBtnTitle"),
              onClick: i[3] || (i[3] = (d) => t(te).load(!0))
            }, [
              e("span", {
                class: j({ spinning: t(M).loading })
              }, "🔄", 2),
              e("span", null, l(t(M).loading ? t(G)("github.myRepos.refreshing") : t(G)("common.refresh")), 1)
            ], 8, Wt),
            de.value.length ? (n(), r("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: A.value ? t(G)("github.myRepos.expandShelf") : t(G)("github.myRepos.collapseShelf"),
              onClick: x
            }, l(A.value ? t(G)("github.myRepos.expandBtn") : t(G)("github.myRepos.collapseBtn")), 9, zt)) : S("", !0)
          ])
        ]),
        de.value.length ? ue((n(), r("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: m,
          class: "shelf-cards-scroll",
          onWheel: T
        }, [
          (n(!0), r(B, null, K(de.value, (d) => (n(), r("div", {
            key: d.id,
            class: j(["repo-card shelf-card", { "card-dragging": P.value?.id === d.id }]),
            draggable: "true",
            onDragstart: (w) => Ye(w, d, "default"),
            onDragend: Ie,
            onContextmenu: (w) => ce(w, d, "default")
          }, [
            e("div", Yt, [
              e("span", {
                class: "repo-name",
                title: d.fullName,
                onClick: (w) => Ee(d.htmlUrl)
              }, l(d.name), 9, Vt),
              d.isPrivate ? (n(), r("span", qt, "私有")) : S("", !0),
              d.isFork ? (n(), r("span", Kt, "Fork")) : S("", !0)
            ]),
            d.description ? (n(), r("p", {
              key: 0,
              class: "repo-desc",
              title: d.description
            }, l(d.description), 9, Xt)) : S("", !0),
            d.topics.length ? (n(), r("div", Qt, [
              (n(!0), r(B, null, K(d.topics, (w) => (n(), r("span", {
                key: w,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + l(w), 1))), 128))
            ])) : S("", !0),
            e("div", Jt, [
              e("div", Zt, [
                d.language ? (n(), r("span", es, [
                  i[27] || (i[27] = e("span", { class: "lang-color" }, null, -1)),
                  oe(l(d.language), 1)
                ])) : S("", !0),
                e("span", ts, "⭐ " + l(d.stargazersCount), 1),
                d.forksCount ? (n(), r("span", ss, "🍴 " + l(d.forksCount), 1)) : S("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + d.updatedAt
              }, l(Xe(d.pushedAt || d.updatedAt)), 9, os)
            ])
          ], 42, Bt))), 128))
        ], 544)), [
          [Oe, !A.value]
        ]) : S("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: c,
        class: "board-viewport",
        onWheel: L,
        onDragover: ot
      }, [
        e("div", ns, [
          (n(!0), r(B, null, K(V.value, (d) => (n(), r("section", {
            key: d,
            class: j(["board-column topic-column", { "drop-active": R.value === d }]),
            onDragover: (w) => Ve(w, d),
            onDragleave: (w) => qe(w, d),
            onDrop: (w) => Ke(w, d)
          }, [
            e("header", ls, [
              $.value !== d ? (n(), r("div", is, [
                i[28] || (i[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + d
                }, " 📁 " + l(d), 9, rs),
                e("span", us, l(ie(d).length), 1)
              ])) : (n(), r("div", cs, [
                ue(e("input", {
                  "onUpdate:modelValue": i[7] || (i[7] = (w) => f.value = w),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    He((w) => b(d), ["enter"]),
                    i[8] || (i[8] = He((w) => $.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, ds), [
                  [ye, f.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (w) => b(d)
                }, "✓", 8, ps),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: i[9] || (i[9] = (w) => $.value = null)
                }, "✕")
              ])),
              e("div", hs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (w) => h.value = h.value === d ? null : d
                }, "•••", 8, ms),
                h.value === d ? (n(), r("div", gs, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (w) => De(d)
                  }, " 重命名分组 ", 8, fs),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (w) => p(d)
                  }, " 删除分组 ", 8, bs)
                ])) : S("", !0)
              ])
            ]),
            e("div", vs, [
              (n(!0), r(B, null, K(ie(d), (w) => (n(), r("div", {
                key: w.id,
                class: j(["repo-card", { "card-dragging": P.value?.id === w.id }]),
                draggable: "true",
                onDragstart: (ee) => Ye(ee, w, d),
                onDragend: Ie,
                onContextmenu: (ee) => ce(ee, w, d)
              }, [
                e("div", ws, [
                  e("span", {
                    class: "repo-name",
                    title: w.fullName,
                    onClick: (ee) => Ee(w.htmlUrl)
                  }, l(w.name), 9, _s),
                  w.isPrivate ? (n(), r("span", ks, "私有")) : S("", !0),
                  w.isFork ? (n(), r("span", $s, "Fork")) : S("", !0)
                ]),
                w.description ? (n(), r("p", {
                  key: 0,
                  class: "repo-desc",
                  title: w.description
                }, l(w.description), 9, Cs)) : S("", !0),
                e("div", Gs, [
                  e("span", Ts, [
                    oe(" 📁 " + l(d) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: J((ee) => g(w, d), ["stop"])
                    }, "✕", 8, Rs)
                  ]),
                  (n(!0), r(B, null, K(w.topics, (ee) => (n(), r("span", {
                    key: ee,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + l(ee), 1))), 128))
                ]),
                e("div", Ms, [
                  e("div", Ss, [
                    w.language ? (n(), r("span", Ls, [
                      i[29] || (i[29] = e("span", { class: "lang-color" }, null, -1)),
                      oe(l(w.language), 1)
                    ])) : S("", !0),
                    e("span", As, "⭐ " + l(w.stargazersCount), 1),
                    w.forksCount ? (n(), r("span", xs, "🍴 " + l(w.forksCount), 1)) : S("", !0)
                  ]),
                  e("span", Ds, l(Xe(w.pushedAt || w.updatedAt)), 1)
                ])
              ], 42, ys))), 128)),
              ie(d).length ? S("", !0) : (n(), r("div", Hs, [...i[30] || (i[30] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, as))), 128)),
          e("section", Us, [
            s.value ? (n(), r("div", Ps, [
              i[32] || (i[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              ue(e("input", {
                "onUpdate:modelValue": i[11] || (i[11] = (d) => o.value = d),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  He(Ge, ["enter"]),
                  i[12] || (i[12] = He((d) => s.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [ye, o.value]
              ]),
              e("div", Is, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: Ge
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: i[13] || (i[13] = (d) => s.value = !1)
                }, l(t(G)("common.cancel")), 1)
              ])
            ])) : (n(), r("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: i[10] || (i[10] = (d) => s.value = !0)
            }, [...i[31] || (i[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (n(), re(We, { to: "body" }, [
        H.visible && H.repo ? (n(), r("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ze({ left: `${H.x}px`, top: `${H.y}px` }),
          onClick: i[21] || (i[21] = J(() => {
          }, ["stop"])),
          onContextmenu: i[22] || (i[22] = J(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: j(["gh-menu-has-sub", { "is-active": X.value === "folder" }]),
            onMouseenter: i[16] || (i[16] = (d) => X.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: i[14] || (i[14] = J((d) => X.value = X.value === "folder" ? null : "folder", ["stop"]))
            }, [...i[33] || (i[33] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: j(["gh-sub-flyout", { "flyout-left": ae.value }]),
              onClick: i[15] || (i[15] = J(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: j(["fo-cover-menu-item", { primary: !H.repo.localGroups.length }]),
                type: "button",
                onClick: le
              }, l(H.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (n(!0), r(B, null, K(V.value, (d) => (n(), r("button", {
                key: d,
                class: j(["fo-cover-menu-item", { primary: H.repo.localGroups.includes(d) }]),
                type: "button",
                onClick: (w) => U(d)
              }, l(H.repo.localGroups.includes(d) ? "✓ " : "  ") + "📁 " + l(d), 11, Es))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[17] || (i[17] = (d) => X.value = null),
            onClick: E
          }, l(t(G)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[18] || (i[18] = (d) => X.value = null),
            onClick: N
          }, l(t(G)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[19] || (i[19] = (d) => X.value = null),
            onClick: se
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: i[20] || (i[20] = (d) => X.value = null),
            onClick: Y
          }, l(t(G)("github.myRepos.openInGitHub")), 33)
        ], 36)) : S("", !0)
      ]))
    ]));
  }
}), js = /* @__PURE__ */ $e(Ns, [["__scopeId", "data-v-f77c8971"]]), Z = ke({
  uncatPage: 1,
  pageSize: 10,
  searchQuery: ""
});
class ve {
  static getInstance() {
    return ve.instance || (ve.instance = new ve()), ve.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && Z.uncatPage++;
  }
  prevUncatPage() {
    Z.uncatPage > 1 && Z.uncatPage--;
  }
  setUncatPage(a) {
    const o = Math.max(1, Math.min(a, this.uncatTotalPages));
    Z.uncatPage = o;
  }
  get uncatPage() {
    return Z.uncatPage;
  }
  get uncatTotalPages() {
    const a = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(a / Z.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const a = Z.searchQuery.trim().toLowerCase(), o = O.repos.filter((s) => O.getRepoFolders(s.full_name).length === 0);
    return a ? o.filter(
      (s) => s.full_name.toLowerCase().includes(a) || s.description && s.description.toLowerCase().includes(a) || s.language && s.language.toLowerCase().includes(a) || s.topics && s.topics.some((h) => h.toLowerCase().includes(a))
    ) : o;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const a = this.filteredUncatRepos, s = (Math.min(Z.uncatPage, this.uncatTotalPages) - 1) * Z.pageSize;
    return a.slice(s, s + Z.pageSize);
  }
  /**
   * 各个 GitHub 原生 Lists 板块列表
   */
  get lists() {
    return O.lists;
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(a) {
    const o = Z.searchQuery.trim().toLowerCase(), s = O.repos.filter((h) => O.getRepoFolders(h.full_name).includes(a));
    return o ? s.filter(
      (h) => h.full_name.toLowerCase().includes(o) || h.description && h.description.toLowerCase().includes(o) || h.language && h.language.toLowerCase().includes(o) || h.topics && h.topics.some((f) => f.toLowerCase().includes(o))
    ) : s;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(a, o) {
    await O.dropRepositoryIntoFolder(a, o);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(a, o) {
    await O.toggleRepoList(a, o);
  }
}
const F = ve.getInstance(), Fs = { class: "stars-board-workspace" }, Os = { class: "shelf-header" }, Ws = { class: "shelf-left" }, zs = { class: "shelf-badge" }, Bs = { class: "shelf-right" }, Ys = { class: "shelf-search-wrap" }, Vs = {
  key: 0,
  class: "shelf-pager"
}, qs = ["disabled"], Ks = { class: "pager-text" }, Xs = ["disabled"], Qs = ["title"], Js = ["onDragstart", "onContextmenu"], Zs = { class: "repo-card-head" }, eo = ["title", "onClick"], to = ["onClick"], so = ["title", "onClick"], oo = {
  key: 0,
  class: "repo-topics-wrap"
}, no = ["title"], ao = { class: "repo-card-meta" }, lo = {
  key: 0,
  class: "meta-lang"
}, io = {
  class: "meta-stars",
  title: "Stars"
}, ro = ["title"], uo = { class: "shelf-next-content" }, co = { class: "shelf-next-sub" }, po = { class: "board-columns-track" }, ho = ["onDragover", "onDragleave", "onDrop"], mo = { class: "column-header" }, go = { class: "column-title-group" }, fo = ["title"], bo = { class: "badge-count" }, vo = { class: "column-actions" }, yo = ["onClick"], wo = { class: "column-cards-scroll" }, _o = ["onDragstart", "onContextmenu"], ko = { class: "repo-card-head" }, $o = ["title", "onClick"], Co = ["onClick"], Go = ["title", "onClick"], To = { class: "repo-local-groups-wrap" }, Ro = ["title"], Mo = ["onClick"], So = { class: "repo-card-meta" }, Lo = {
  key: 0,
  class: "meta-lang"
}, Ao = { class: "meta-stars" }, xo = { class: "meta-date" }, Do = {
  key: 0,
  class: "empty-column-dropzone"
}, Ho = { class: "board-column add-column-panel" }, Uo = ["onClick"], Po = /* @__PURE__ */ _e({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(v) {
    const a = I(null), o = I(null), s = I(!1);
    function h() {
      s.value = !s.value;
    }
    function f(b) {
      const p = o.value;
      p && (Math.abs(b.deltaX) > Math.abs(b.deltaY) && b.deltaX !== 0 || b.deltaY !== 0 && (b.preventDefault(), p.scrollLeft += b.deltaY));
    }
    const $ = I(null), c = I(null), m = I(null);
    let A = null, x = 0;
    function T() {
      A === null && (A = window.setInterval(() => {
        !a.value || x === 0 || (a.value.scrollLeft += x);
      }, 16));
    }
    function P() {
      A !== null && (clearInterval(A), A = null), x = 0;
    }
    const k = ke({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), R = I(null), C = I(!1);
    function W() {
      k.visible = !1, k.repo = null, k.fromList = null, R.value = null;
    }
    function H(b, p, g) {
      b.preventDefault(), b.stopPropagation();
      const L = 190, Q = 220, pe = Math.min(b.clientX, window.innerWidth - L - 10), me = Math.min(b.clientY, window.innerHeight - Q - 10);
      k.x = pe, k.y = me, k.repo = p, k.fromList = g, k.visible = !0, R.value = "folder", C.value = pe > window.innerWidth - 380;
    }
    async function X() {
      const b = k.repo;
      W(), b && await F.moveRepoToList(b.full_name, O.UNCAT);
    }
    async function ae(b) {
      const p = k.repo;
      W(), p && await F.moveRepoToList(p.full_name, b);
    }
    async function q() {
      const b = k.repo;
      if (W(), !!b?.html_url)
        try {
          await navigator.clipboard.writeText(b.html_url);
        } catch {
        }
    }
    async function ce() {
      const b = k.repo;
      if (W(), !!b?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${b.full_name}.git`);
        } catch {
        }
    }
    function le(b) {
      const p = b.target;
      !p?.closest(".fo-cover-context-menu") && !p?.closest(".col-popover-menu") && W();
    }
    function U(b) {
      b.key === "Escape" && W();
    }
    function E(b) {
      const p = a.value;
      if (!p) return;
      const L = b.target?.closest(".column-cards-scroll");
      if (L && L.scrollHeight > L.clientHeight && !b.shiftKey && b.deltaX === 0) {
        const Q = L.scrollTop === 0 && b.deltaY < 0, pe = Math.ceil(L.scrollTop + L.clientHeight) >= L.scrollHeight && b.deltaY > 0;
        if (!Q && !pe)
          return;
      }
      Math.abs(b.deltaX) > Math.abs(b.deltaY) && b.deltaX !== 0 || b.deltaY !== 0 && (b.preventDefault(), p.scrollLeft += b.deltaY);
    }
    function N(b) {
      if (!$.value || !a.value) return;
      b.preventDefault();
      const p = b.deltaY !== 0 ? b.deltaY : b.deltaX;
      a.value.scrollLeft += p;
    }
    function Y(b) {
      const p = a.value;
      if (!p) return;
      const g = p.getBoundingClientRect(), L = 100;
      if (b > g.right - L) {
        const Q = Math.min(1, Math.max(0.1, (b - (g.right - L)) / L));
        x = Math.round(Q * 20), T();
      } else if (b < g.left + L) {
        const Q = Math.min(1, Math.max(0.1, (g.left + L - b) / L));
        x = -Math.round(Q * 20), T();
      } else
        P();
    }
    function se(b) {
      Y(b.clientX);
    }
    function z(b, p, g) {
      W(), $.value = p, c.value = g, b.dataTransfer && (b.dataTransfer.effectAllowed = "move", b.dataTransfer.setData("text/plain", `${p.full_name}:${g || "uncategorized"}`)), window.addEventListener("wheel", N, { passive: !1 });
    }
    function _() {
      $.value = null, c.value = null, m.value = null, P(), window.removeEventListener("wheel", N);
    }
    function V(b, p) {
      $.value && (b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "move"), m.value = p);
    }
    function Ce(b, p) {
      const g = b.currentTarget;
      g && b.relatedTarget instanceof Node && g.contains(b.relatedTarget) || m.value === p && (m.value = null);
    }
    async function de(b, p) {
      b.preventDefault();
      const g = $.value;
      _(), g && await F.moveRepoToList(g.full_name, p);
    }
    function ie(b) {
      ut.open(b.full_name, void 0, b);
    }
    function Ge(b) {
      window.open(b, "_blank", "noopener,noreferrer");
    }
    function De(b) {
      if (!b) return "";
      try {
        const p = new Date(b);
        return `${p.getFullYear()}-${String(p.getMonth() + 1).padStart(2, "0")}-${String(p.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return Ue(() => {
      window.addEventListener("pointerdown", le), window.addEventListener("keydown", U);
    }), Pe(() => {
      P(), window.removeEventListener("wheel", N), window.removeEventListener("pointerdown", le), window.removeEventListener("keydown", U);
    }), (b, p) => (n(), r("div", Fs, [
      e("section", {
        class: j(["default-shelf-area", { "is-collapsed": s.value, "drop-active": m.value === "uncategorized" }]),
        onDragover: p[6] || (p[6] = (g) => V(g, "uncategorized")),
        onDragleave: p[7] || (p[7] = (g) => Ce(g, "uncategorized")),
        onDrop: p[8] || (p[8] = (g) => de(g, "uncategorized"))
      }, [
        e("header", Os, [
          e("div", Ws, [
            p[19] || (p[19] = e("span", { class: "shelf-icon" }, "📁", -1)),
            p[20] || (p[20] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", zs, l(t(F).filteredUncatRepos.length), 1),
            p[21] || (p[21] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消列表归属；单排 10 个一页）", -1))
          ]),
          e("div", Bs, [
            e("div", Ys, [
              p[22] || (p[22] = e("span", { class: "search-icon" }, "🔍", -1)),
              ue(e("input", {
                "onUpdate:modelValue": p[0] || (p[0] = (g) => t(Z).searchQuery = g),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索 Star 仓库名称、简介或语言…"
              }, null, 512), [
                [ye, t(Z).searchQuery]
              ]),
              t(Z).searchQuery ? (n(), r("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: p[1] || (p[1] = (g) => t(Z).searchQuery = "")
              }, "✕")) : S("", !0)
            ]),
            t(F).filteredUncatRepos.length > t(Z).pageSize ? (n(), r("div", Vs, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(F).uncatPage <= 1,
                title: "上一页",
                onClick: p[2] || (p[2] = //@ts-ignore
                (...g) => t(F).prevUncatPage && t(F).prevUncatPage(...g))
              }, "‹", 8, qs),
              e("span", Ks, l(t(F).uncatPage) + " / " + l(t(F).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(F).uncatPage >= t(F).uncatTotalPages,
                title: "下一页",
                onClick: p[3] || (p[3] = //@ts-ignore
                (...g) => t(F).nextUncatPage && t(F).nextUncatPage(...g))
              }, "›", 8, Xs)
            ])) : S("", !0),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              title: "刷新 Star 列表",
              onClick: p[4] || (p[4] = (g) => t(O).refreshRepositories())
            }, [...p[23] || (p[23] = [
              e("span", null, "🔄 刷新", -1)
            ])]),
            t(F).filteredUncatRepos.length ? (n(), r("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: s.value ? "展开托盘" : "收起托盘",
              onClick: h
            }, l(s.value ? "展开 ▼" : "收起 ▲"), 9, Qs)) : S("", !0)
          ])
        ]),
        t(F).filteredUncatRepos.length ? ue((n(), r("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: o,
          class: "shelf-cards-scroll",
          onWheel: f
        }, [
          (n(!0), r(B, null, K(t(F).pagedUncatRepos, (g) => (n(), r("div", {
            key: g.full_name,
            class: j(["repo-card shelf-card", { "card-dragging": $.value?.full_name === g.full_name }]),
            draggable: "true",
            onDragstart: (L) => z(L, g, null),
            onDragend: _,
            onContextmenu: (L) => H(L, g, null)
          }, [
            e("div", Zs, [
              e("span", {
                class: "repo-name",
                title: g.full_name,
                onClick: (L) => ie(g)
              }, l(g.name), 9, eo),
              e("button", {
                type: "button",
                class: "btn-open-link",
                title: "在 GitHub 打开新标签页",
                onClick: J((L) => Ge(g.html_url), ["stop"])
              }, "↗", 8, to)
            ]),
            e("p", {
              class: "repo-desc",
              title: g.description || "",
              onClick: (L) => ie(g)
            }, l(g.description || "暂无描述"), 9, so),
            g.topics && g.topics.length ? (n(), r("div", oo, [
              (n(!0), r(B, null, K(g.topics, (L) => (n(), r("span", {
                key: L,
                class: "topic-chip-tag",
                title: "Topic: " + L
              }, " #" + l(L), 9, no))), 128))
            ])) : S("", !0),
            e("div", ao, [
              g.language ? (n(), r("span", lo, [
                p[24] || (p[24] = e("span", { class: "lang-color-dot" }, null, -1)),
                oe(" " + l(g.language), 1)
              ])) : S("", !0),
              e("span", io, "⭐ " + l(g.stargazers_count), 1),
              e("span", {
                class: "meta-date",
                title: "更新于: " + g.updated_at
              }, l(De(g.updated_at)), 9, ro)
            ])
          ], 42, Js))), 128)),
          t(F).uncatPage < t(F).uncatTotalPages ? (n(), r("div", {
            key: 0,
            class: "repo-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: p[5] || (p[5] = //@ts-ignore
            (...g) => t(F).nextUncatPage && t(F).nextUncatPage(...g))
          }, [
            e("div", uo, [
              p[25] || (p[25] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              p[26] || (p[26] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", co, "（第 " + l(t(F).uncatPage + 1) + " 页，共 " + l(t(F).uncatTotalPages) + " 页）", 1)
            ])
          ])) : S("", !0)
        ], 544)), [
          [Oe, !s.value]
        ]) : S("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: a,
        class: "board-viewport",
        onWheel: E,
        onDragover: se
      }, [
        e("div", po, [
          (n(!0), r(B, null, K(t(F).lists, (g) => (n(), r("section", {
            key: g.id,
            class: j(["board-column list-column", { "drop-active": m.value === g.name }]),
            onDragover: (L) => V(L, g.name),
            onDragleave: (L) => Ce(L, g.name),
            onDrop: (L) => de(L, g.name)
          }, [
            e("header", mo, [
              e("div", go, [
                p[27] || (p[27] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: g.description || "GitHub 列表: " + g.name
                }, " 📁 " + l(g.name), 9, fo),
                e("span", bo, l(t(F).getReposForList(g.name).length), 1)
              ]),
              e("div", vo, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "删除此 GitHub 列表",
                  onClick: (L) => t(O).deleteFolder(g.name)
                }, "✕", 8, yo)
              ])
            ]),
            e("div", wo, [
              (n(!0), r(B, null, K(t(F).getReposForList(g.name), (L) => (n(), r("div", {
                key: L.full_name,
                class: j(["repo-card", { "card-dragging": $.value?.full_name === L.full_name }]),
                draggable: "true",
                onDragstart: (Q) => z(Q, L, g.name),
                onDragend: _,
                onContextmenu: (Q) => H(Q, L, g.name)
              }, [
                e("div", ko, [
                  e("span", {
                    class: "repo-name",
                    title: L.full_name,
                    onClick: (Q) => ie(L)
                  }, l(L.name), 9, $o),
                  e("button", {
                    type: "button",
                    class: "btn-open-link",
                    title: "在 GitHub 打开新标签页",
                    onClick: J((Q) => Ge(L.html_url), ["stop"])
                  }, "↗", 8, Co)
                ]),
                e("p", {
                  class: "repo-desc",
                  title: L.description || "",
                  onClick: (Q) => ie(L)
                }, l(L.description || "暂无描述"), 9, Go),
                e("div", To, [
                  e("span", {
                    class: "local-group-chip",
                    title: "属于列表: " + g.name
                  }, [
                    oe(" 📁 " + l(g.name) + " ", 1),
                    e("button", {
                      type: "button",
                      class: "btn-remove-group",
                      title: "从该列表中移出",
                      onClick: J((Q) => t(F).removeRepoFromList(L.full_name, g.name), ["stop"])
                    }, "×", 8, Mo)
                  ], 8, Ro)
                ]),
                e("div", So, [
                  L.language ? (n(), r("span", Lo, [
                    p[28] || (p[28] = e("span", { class: "lang-color-dot" }, null, -1)),
                    oe(" " + l(L.language), 1)
                  ])) : S("", !0),
                  e("span", Ao, "⭐ " + l(L.stargazers_count), 1),
                  e("span", xo, l(De(L.updated_at)), 1)
                ])
              ], 42, _o))), 128)),
              t(F).getReposForList(g.name).length ? S("", !0) : (n(), r("div", Do, [...p[29] || (p[29] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, ho))), 128)),
          e("section", Ho, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              onClick: p[9] || (p[9] = (g) => t(O).promptCreateFolder())
            }, [...p[30] || (p[30] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", null, "新建 GitHub 列表", -1)
            ])])
          ])
        ])
      ], 544),
      (n(), re(We, { to: "body" }, [
        k.visible && k.repo ? (n(), r("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ze({ left: `${k.x}px`, top: `${k.y}px` }),
          onClick: p[17] || (p[17] = J(() => {
          }, ["stop"])),
          onContextmenu: p[18] || (p[18] = J(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: j(["gh-menu-has-sub", { "is-active": R.value === "folder" }]),
            onMouseenter: p[12] || (p[12] = (g) => R.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: p[10] || (p[10] = J((g) => R.value = R.value === "folder" ? null : "folder", ["stop"]))
            }, [...p[31] || (p[31] = [
              e("span", null, "移动/加入列表", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: j(["gh-sub-flyout", { "flyout-left": C.value }]),
              onClick: p[11] || (p[11] = J(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: X
              }, " 设为未分类 "),
              (n(!0), r(B, null, K(t(F).lists, (g) => (n(), r("button", {
                key: g.id,
                class: j(["fo-cover-menu-item", { primary: t(O).getRepoFolders(k.repo.full_name).includes(g.name) }]),
                type: "button",
                onClick: (L) => ae(g.name)
              }, l(t(O).getRepoFolders(k.repo.full_name).includes(g.name) ? "✓ " : "  ") + "📁 " + l(g.name), 11, Uo))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: p[13] || (p[13] = (g) => R.value = null),
            onClick: p[14] || (p[14] = (g) => ie(k.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: p[15] || (p[15] = (g) => R.value = null),
            onClick: q
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: p[16] || (p[16] = (g) => R.value = null),
            onClick: ce
          }, " 复制克隆命令 (git clone) ", 32)
        ], 36)) : S("", !0)
      ]))
    ]));
  }
}), Io = /* @__PURE__ */ $e(Po, [["__scopeId", "data-v-9b492882"]]);
function Eo(v) {
  const a = v.subject?.url, o = v.repository?.html_url || "https://github.com";
  if (!a) return o;
  const s = v.subject?.type;
  return s === "Issue" ? a.replace("https://api.github.com/repos/", "https://github.com/") : s === "PullRequest" ? a.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : s === "Release" ? a.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : a.replace("https://api.github.com/repos/", "https://github.com/");
}
function No(v) {
  try {
    const a = Date.now() - new Date(v).getTime();
    if (a < 6e4) return "刚刚";
    const o = Math.floor(a / 6e4);
    if (o < 60) return `${o} 分钟前`;
    const s = Math.floor(o / 60);
    if (s < 24) return `${s} 小时前`;
    const h = Math.floor(s / 24);
    return h < 30 ? `${h} 天前` : v.slice(5, 10);
  } catch {
    return "";
  }
}
const D = ke({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), fe = {
  open() {
    D.isOpen = !0, (!D.items.length || Date.now() - D.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    D.isOpen = !1;
  },
  toggle() {
    D.isOpen ? this.close() : this.open();
  },
  setTab(v) {
    D.activeKind = v;
  },
  async refresh() {
    const v = O.token?.trim();
    if (!v) {
      D.items = [], D.unreadCount = 0, D.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    D.loading = !0, D.error = "";
    try {
      const a = {
        ...xe(v),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, o = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: a
      });
      if (!o.ok)
        throw o.status === 401 ? new Error("GitHub Token 无效或已过期") : o.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${o.status})`);
      const s = await o.json();
      if (!Array.isArray(s))
        throw new Error("GitHub 返回数据异常");
      const h = s.map((f) => ({
        id: String(f.id),
        unread: !!f.unread,
        reason: String(f.reason || ""),
        updatedAt: f.updated_at,
        formattedTime: No(f.updated_at),
        subject: {
          title: String(f.subject?.title || "未命名通知"),
          url: String(f.subject?.url || ""),
          type: String(f.subject?.type || "Issue"),
          latestCommentUrl: f.subject?.latest_comment_url
        },
        repository: {
          id: Number(f.repository?.id || 0),
          name: String(f.repository?.name || ""),
          fullName: String(f.repository?.full_name || ""),
          owner: {
            login: String(f.repository?.owner?.login || ""),
            avatarUrl: f.repository?.owner?.avatar_url
          },
          htmlUrl: String(f.repository?.html_url || "")
        },
        url: String(f.url || ""),
        htmlUrl: Eo(f)
      }));
      D.items = h, D.unreadCount = h.filter((f) => f.unread).length, D.lastFetchedAt = Date.now();
    } catch (a) {
      console.warn("[GitHubNotifications] 读取失败:", a), D.error = a?.message || "网络请求异常";
    } finally {
      D.loading = !1;
    }
  },
  openTarget(v) {
    typeof window < "u" && window.open(v.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, y = ke({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function Le(v) {
  try {
    const a = Date.now() - new Date(v).getTime(), o = Math.floor(a / 6e4);
    if (o < 1) return "刚刚";
    if (o < 60) return `${o}分钟前`;
    const s = Math.floor(o / 60);
    if (s < 24) return `${s}小时前`;
    const h = Math.floor(s / 24);
    if (h < 30) return `${h}天前`;
    const f = new Date(v);
    return `${f.getFullYear()}/${f.getMonth() + 1}/${f.getDate()}`;
  } catch {
    return "";
  }
}
function Ae(v) {
  switch (v) {
    case "OWNER":
      return "所有者";
    case "MEMBER":
      return "成员";
    case "COLLABORATOR":
      return "维护者";
    case "CONTRIBUTOR":
      return "贡献者";
    case "FIRST_TIME_CONTRIBUTOR":
      return "初次贡献";
    case "FIRST_TIMER":
      return "新人";
    case "AUTHOR":
      return "作者";
    default:
      return "";
  }
}
function jo(v) {
  return v ? {
    ":triangular_flag_on_post:": "🚩",
    ":speech_balloon:": "💬",
    ":bulb:": "💡",
    ":mega:": "📢",
    ":sparkles:": "✨",
    ":books:": "📚",
    ":tada:": "🎉",
    ":pray:": "🙏",
    ":question:": "❓",
    ":hammer:": "🔨",
    ":zap:": "⚡",
    ":fire:": "🔥",
    ":heart:": "❤️",
    ":rocket:": "🚀",
    ":eyes:": "👀"
  }[v] || (v.startsWith(":") && v.endsWith(":") ? v.slice(1, -1) : v) : "";
}
function je(v) {
  if (!Array.isArray(v)) return [];
  const a = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return v.map((o) => ({
    emoji: a[o.content] || o.content,
    count: o.reactors?.totalCount || o.users?.totalCount || 0
  })).filter((o) => o.count > 0);
}
function et(v) {
  if (!v || typeof v != "object") return [];
  const a = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, o = [];
  for (const [s, h] of Object.entries(a)) {
    const f = Number(v[s] || 0);
    f > 0 && o.push({ emoji: h, count: f });
  }
  return o;
}
async function tt(v, a) {
  if (!v) return "";
  try {
    const o = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...xe(a),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: v, mode: "gfm" })
    });
    if (o.ok)
      return await o.text();
  } catch {
  }
  return he.renderMarkdown(v);
}
async function Fo(v, a, o, s) {
  const h = `
    query($owner: String!, $name: String!, $num: Int!) {
      repository(owner: $owner, name: $name) {
        discussion(number: $num) {
          title
          body
          bodyHTML
          author { login avatarUrl }
          authorAssociation
          createdAt
          url
          category {
            name
            emoji
          }
          reactionGroups {
            content
            reactors {
              totalCount
            }
          }
          comments(first: 30) {
            totalCount
            nodes {
              id
              body
              bodyHTML
              createdAt
              author { login avatarUrl }
              authorAssociation
              reactionGroups {
                content
                reactors {
                  totalCount
                }
              }
              replies(first: 30) {
                totalCount
                nodes {
                  id
                  body
                  bodyHTML
                  createdAt
                  author { login avatarUrl }
                  authorAssociation
                  reactionGroups {
                    content
                    reactors {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const f = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...xe(s),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: h,
        variables: { owner: v, name: a, num: o }
      })
    });
    if (!f.ok) return null;
    const c = (await f.json())?.data?.repository?.discussion;
    if (!c) return null;
    let m = 0;
    const A = (c.comments?.nodes || []).map((P) => {
      const k = P.replies?.nodes || [];
      m += k.length;
      const R = k.map((C) => ({
        id: C.id,
        author: {
          login: C.author?.login || "匿名",
          avatarUrl: C.author?.avatarUrl || "",
          association: Ae(C.authorAssociation)
        },
        createdAt: C.createdAt,
        formattedTime: Le(C.createdAt),
        body: C.body || "",
        bodyHtml: C.bodyHTML || (C.body ? he.renderMarkdown(C.body) : ""),
        reactions: je(C.reactionGroups)
      }));
      return {
        id: P.id,
        author: {
          login: P.author?.login || "匿名",
          avatarUrl: P.author?.avatarUrl || "",
          association: Ae(P.authorAssociation)
        },
        createdAt: P.createdAt,
        formattedTime: Le(P.createdAt),
        body: P.body || "",
        bodyHtml: P.bodyHTML || (P.body ? he.renderMarkdown(P.body) : "<p>（评论内容为空）</p>"),
        reactions: je(P.reactionGroups),
        replies: R
      };
    }), x = c.body || "", T = c.bodyHTML && c.bodyHTML.trim().length > 10 ? c.bodyHTML : x ? he.renderMarkdown(x) : "<p>（主贴内容为空）</p>";
    return {
      title: c.title,
      number: o,
      state: "discussion",
      category: c.category ? {
        name: c.category.name,
        emoji: jo(c.category.emoji)
      } : void 0,
      author: {
        login: c.author?.login || "未知",
        avatarUrl: c.author?.avatarUrl || "",
        association: Ae(c.authorAssociation)
      },
      createdAt: c.createdAt,
      formattedTime: Le(c.createdAt),
      body: x,
      bodyHtml: T,
      htmlUrl: c.url,
      commentsCount: c.comments?.totalCount || A.length,
      totalRepliesCount: m,
      comments: A,
      reactions: je(c.reactionGroups)
    };
  } catch {
    return null;
  }
}
const Fe = {
  async open(v) {
    y.isOpen = !0, y.loading = !0, y.error = "", y.data = null, y.notificationItem = v;
    const a = O.token?.trim() || "", o = {
      ...xe(a),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const s = v.subject?.url, h = v.subject?.type, f = v.repository?.fullName || "", [$, c] = f.split("/"), m = s?.match(/\/(\d+)$/), A = m ? Number(m[1]) : void 0;
      if (h === "Discussion" && $ && c && A) {
        const x = await Fo($, c, A, a);
        if (x) {
          y.data = {
            notificationId: v.id,
            title: x.title || v.subject.title,
            number: A,
            state: "discussion",
            category: x.category,
            author: x.author || { login: v.repository.owner.login, avatarUrl: v.repository.owner.avatarUrl || "" },
            createdAt: x.createdAt || v.updatedAt,
            formattedTime: x.formattedTime || v.formattedTime,
            body: x.body || "",
            bodyHtml: x.bodyHtml || (x.body ? he.renderMarkdown(x.body) : ""),
            htmlUrl: x.htmlUrl || v.htmlUrl,
            commentsCount: x.commentsCount || 0,
            totalRepliesCount: x.totalRepliesCount || 0,
            comments: x.comments || [],
            reactions: x.reactions || [],
            repositoryFullName: f,
            type: "Discussion"
          };
          return;
        }
      }
      if (s) {
        const x = await fetch(s, { headers: o, cache: "no-store" });
        if (x.ok) {
          const T = await x.json();
          let P = [];
          if (T.comments_url && T.comments > 0)
            try {
              const C = await fetch(`${T.comments_url}?per_page=50`, { headers: o, cache: "no-store" });
              if (C.ok) {
                const W = await C.json();
                Array.isArray(W) && (P = await Promise.all(
                  W.map(async (H) => {
                    const X = H.body_html || (H.body ? await tt(H.body, a) : "");
                    return {
                      id: H.id,
                      author: {
                        login: H.user?.login || "匿名",
                        avatarUrl: H.user?.avatar_url || "",
                        association: Ae(H.author_association)
                      },
                      createdAt: H.created_at,
                      formattedTime: Le(H.created_at),
                      body: H.body || "",
                      bodyHtml: X,
                      reactions: et(H.reactions)
                    };
                  })
                ));
              }
            } catch (C) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", C);
            }
          const k = T.body || "";
          let R = T.body_html || "";
          !R && k && (R = await tt(k, a)), !R && k && (R = he.renderMarkdown(k)), y.data = {
            notificationId: v.id,
            title: T.title || T.name || v.subject.title,
            number: T.number || A,
            state: T.merged ? "merged" : T.state || T.conclusion || "open",
            author: {
              login: T.user?.login || T.author?.login || v.repository.owner.login,
              avatarUrl: T.user?.avatar_url || T.author?.avatar_url || v.repository.owner.avatarUrl || "",
              association: Ae(T.author_association)
            },
            createdAt: T.created_at || T.published_at || v.updatedAt,
            formattedTime: Le(T.created_at || T.published_at || v.updatedAt),
            body: k,
            bodyHtml: R || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: T.html_url || v.htmlUrl,
            commentsCount: typeof T.comments == "number" ? T.comments : P.length,
            comments: P,
            reactions: et(T.reactions),
            repositoryFullName: f,
            type: h || "Issue"
          };
          return;
        }
      }
      y.data = {
        notificationId: v.id,
        title: v.subject.title,
        number: A,
        state: "open",
        author: {
          login: v.repository.owner.login,
          avatarUrl: v.repository.owner.avatarUrl || ""
        },
        createdAt: v.updatedAt,
        formattedTime: v.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: v.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: f,
        type: h || "通知"
      };
    } catch (s) {
      console.warn("[GitHubNotificationDetail] 读取异常:", s), y.error = s?.message || "网络请求异常";
    } finally {
      y.loading = !1;
    }
  },
  close() {
    y.isOpen = !1, y.data = null, y.error = "";
  }
}, Oo = { class: "vue-gh-notification-panel-wrapper" }, Wo = { class: "gh-msg-header" }, zo = { class: "gh-msg-account" }, Bo = { class: "gh-msg-subtitle" }, Yo = {
  class: "gh-msg-tabs",
  role: "tablist"
}, Vo = ["onClick"], qo = { class: "gh-msg-list" }, Ko = {
  key: 0,
  class: "gh-msg-loading"
}, Xo = {
  key: 1,
  class: "gh-msg-error"
}, Qo = {
  key: 2,
  class: "gh-msg-empty"
}, Jo = ["onClick"], Zo = { class: "gh-card-indicator-col" }, en = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, tn = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, sn = { class: "gh-card-type-col" }, on = ["title"], nn = { class: "gh-card-main-col" }, an = { class: "gh-card-repo-row" }, ln = ["title"], rn = { class: "gh-card-reason-tag" }, un = { class: "gh-card-time" }, cn = ["title"], dn = { class: "gh-card-footer-row" }, pn = { class: "gh-card-type-label" }, hn = ["onClick"], mn = /* @__PURE__ */ _e({
  __name: "GitHubNotificationPanel",
  setup(v) {
    const a = I(null), o = ne(() => [
      { kind: "all", label: "所有", count: D.items.length },
      { kind: "unread", label: "未读", count: D.items.filter((k) => k.unread).length },
      { kind: "mention", label: "提及", count: D.items.filter((k) => k.reason === "mention").length },
      { kind: "author", label: "作者", count: D.items.filter((k) => k.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: D.items.filter((k) => k.reason === "ci_activity" || k.subject.type === "CheckSuite").length }
    ]), s = ne(() => {
      const k = D.items;
      switch (D.activeKind) {
        case "unread":
          return k.filter((R) => R.unread);
        case "mention":
          return k.filter((R) => R.reason === "mention");
        case "author":
          return k.filter((R) => R.reason === "author");
        case "ci":
          return k.filter((R) => R.reason === "ci_activity" || R.subject.type === "CheckSuite");
        default:
          return k;
      }
    });
    function h(k, R) {
      if (R === "ci_activity" || k === "CheckSuite")
        return "⚡";
      switch (k) {
        case "Issue":
          return "🟢";
        case "PullRequest":
          return "🔀";
        case "Release":
          return "🏷️";
        case "Discussion":
          return "💡";
        default:
          return "📦";
      }
    }
    function f(k) {
      switch (k) {
        case "mention":
          return "提及";
        case "author":
          return "作者";
        case "ci_activity":
          return "CI 活动";
        case "review_requested":
          return "待我审查";
        case "comment":
          return "新评论";
        case "subscribed":
          return "关注动态";
        case "assign":
          return "指派给我";
        default:
          return k || "通知";
      }
    }
    function $() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function c() {
      fe.refresh();
    }
    function m() {
      fe.close();
    }
    function A(k) {
      Fe.open(k);
    }
    function x(k) {
      fe.openTarget(k);
    }
    function T(k) {
      if (!D.isOpen) return;
      const R = k.target;
      !a.value?.contains(R) && !R?.closest("#gh-header-msg-center-btn") && fe.close();
    }
    function P(k) {
      k.key === "Escape" && D.isOpen && fe.close();
    }
    return Ue(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", T), window.addEventListener("keydown", P));
    }), Pe(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", T), window.removeEventListener("keydown", P));
    }), (k, R) => (n(), r("div", Oo, [
      t(D).isOpen ? (n(), r("section", {
        key: 0,
        ref_key: "panelRef",
        ref: a,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: R[0] || (R[0] = J(() => {
        }, ["stop"]))
      }, [
        e("header", Wo, [
          e("div", zo, [
            R[2] || (R[2] = e("div", { class: "gh-msg-octo-avatar" }, [
              e("svg", {
                viewBox: "0 0 24 24",
                width: "18",
                height: "18",
                fill: "currentColor"
              }, [
                e("path", { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" })
              ])
            ], -1)),
            e("div", null, [
              R[1] || (R[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", Bo, " 共 " + l(t(D).items.length) + " 条通知 · " + l(t(D).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          R[3] || (R[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: $
          }, " ↗ "),
          e("button", {
            type: "button",
            class: j(["gh-panel-btn", { "is-spinning": t(D).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: c
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: m
          }, " ✕ ")
        ]),
        e("nav", Yo, [
          (n(!0), r(B, null, K(o.value, (C) => (n(), r("button", {
            key: C.kind,
            type: "button",
            class: j(["gh-msg-tab", { active: t(D).activeKind === C.kind }]),
            onClick: (W) => t(D).activeKind = C.kind
          }, [
            oe(l(C.label) + " ", 1),
            C.count > 0 ? (n(), r("span", {
              key: 0,
              class: j(["gh-tab-pill", { "is-unread-pill": C.kind === "unread" }])
            }, l(C.count), 3)) : S("", !0)
          ], 10, Vo))), 128))
        ]),
        e("div", qo, [
          t(D).loading && !t(D).items.length ? (n(), r("div", Ko, [...R[4] || (R[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(D).error ? (n(), r("div", Xo, [
            R[5] || (R[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, l(t(D).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: c
            }, "重试")
          ])) : s.value.length === 0 ? (n(), r("div", Qo, [...R[6] || (R[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (n(!0), r(B, { key: 3 }, K(s.value, (C) => (n(), r("article", {
            key: C.id,
            class: j(["gh-notification-card", { "is-unread": C.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (W) => A(C)
          }, [
            e("div", Zo, [
              C.unread ? (n(), r("span", en)) : (n(), r("span", tn))
            ]),
            e("div", sn, [
              e("span", {
                class: "gh-type-badge",
                title: C.subject.type
              }, l(h(C.subject.type, C.reason)), 9, on)
            ]),
            e("div", nn, [
              e("div", an, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: C.repository.fullName
                }, l(C.repository.fullName), 9, ln),
                e("span", rn, l(f(C.reason)), 1),
                e("time", un, l(C.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: C.subject.title
              }, l(C.subject.title), 9, cn),
              e("div", dn, [
                e("span", pn, l(C.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: J((W) => x(C), ["stop"])
                }, "在网页打开 ↗", 8, hn)
              ])
            ])
          ], 10, Jo))), 128))
        ])
      ], 512)) : S("", !0)
    ]));
  }
}), gn = /* @__PURE__ */ $e(mn, [["__scopeId", "data-v-4271efab"]]), fn = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, bn = ["aria-label"], vn = { class: "gh-modal-title-wrap" }, yn = { class: "gh-modal-octo-icon" }, wn = ["href"], _n = { class: "gh-owner" }, kn = { class: "gh-name" }, $n = {
  key: 1,
  class: "gh-modal-repo-name"
}, Cn = { class: "gh-name" }, Gn = { class: "gh-modal-actions" }, Tn = { class: "gh-modal-content" }, Rn = {
  key: 0,
  class: "gh-content-loading"
}, Mn = {
  key: 1,
  class: "gh-content-error"
}, Sn = { class: "gh-discussion-title-header" }, Ln = { class: "gh-discussion-h1" }, An = {
  key: 0,
  class: "gh-discussion-num"
}, xn = { class: "gh-discussion-sub-meta" }, Dn = {
  key: 0,
  class: "gh-category-pill"
}, Hn = {
  key: 0,
  class: "cat-emoji"
}, Un = {
  key: 1,
  class: "gh-category-pill"
}, Pn = { class: "gh-sub-author" }, In = { class: "gh-sub-verb" }, En = {
  key: 2,
  class: "gh-sub-comments-count"
}, Nn = { class: "gh-op-post-card" }, jn = { class: "gh-op-post-head" }, Fn = { class: "gh-op-author-left" }, On = ["src"], Wn = { class: "gh-op-meta" }, zn = { class: "gh-op-name-row" }, Bn = { class: "gh-op-name" }, Yn = {
  key: 0,
  class: "gh-role-pill"
}, Vn = { class: "gh-op-time" }, qn = ["innerHTML"], Kn = {
  key: 0,
  class: "gh-reactions-bar"
}, Xn = { class: "rx-emoji" }, Qn = { class: "rx-count" }, Jn = {
  key: 0,
  class: "gh-comments-block"
}, Zn = { class: "gh-comments-header" }, ea = { class: "gh-comments-count-pill" }, ta = { class: "gh-comments-feed" }, sa = { class: "gh-comment-head" }, oa = ["src"], na = { class: "gh-comment-meta" }, aa = { class: "gh-comment-author" }, la = {
  key: 0,
  class: "gh-role-pill small"
}, ia = { class: "gh-comment-time" }, ra = ["innerHTML"], ua = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, ca = { class: "rx-emoji" }, da = { class: "rx-count" }, pa = {
  key: 1,
  class: "gh-comment-replies-thread"
}, ha = { class: "gh-replies-thread-title" }, ma = { class: "gh-reply-head" }, ga = ["src"], fa = { class: "gh-reply-meta" }, ba = { class: "gh-reply-author" }, va = {
  key: 0,
  class: "gh-role-pill tiny"
}, ya = { class: "gh-reply-time" }, wa = ["innerHTML"], _a = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, ka = { class: "rx-emoji" }, $a = { class: "rx-count" }, Ca = {
  key: 1,
  class: "gh-no-comments"
}, Ga = /* @__PURE__ */ _e({
  __name: "GitHubNotificationDetailDrawer",
  setup(v) {
    const a = I(null), o = I(null), s = I(null);
    let h = !1, f = 0, $ = 0, c = 0, m = 0, A = () => {
    };
    const x = ne(() => (y.data?.repositoryFullName || y.notificationItem?.repository.fullName || "").split("/")[0] || ""), T = ne(() => {
      const U = y.data?.repositoryFullName || y.notificationItem?.repository.fullName || "";
      return U.split("/")[1] || U;
    }), P = ne(() => {
      if (!y.data) return "";
      const U = y.data.bodyHtml?.trim() || "";
      if (U.length > 20) return U;
      const E = y.data.body?.trim() || "";
      return E.length > 0 ? he.renderMarkdown(E) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), k = ne(() => s.value ? {
      position: "fixed",
      left: `${s.value.x}px`,
      top: `${s.value.y}px`,
      transform: "none"
    } : {});
    we(
      () => y.isOpen,
      (U) => {
        U && (s.value = null, Qe(() => {
          o.value && (o.value.scrollTop = 0);
        }));
      }
    ), we(
      () => y.data,
      (U) => {
        U && Qe(() => {
          o.value && (o.value.scrollTop = 0);
        });
      }
    );
    function R(U) {
      if (U.target.closest("button, a, input")) return;
      A();
      const E = a.value;
      if (!E || !y.isOpen) return;
      h = !0;
      const N = E.getBoundingClientRect();
      c = N.left, m = N.top, f = U.clientX, $ = U.clientY, s.value = { x: c, y: m };
      const Y = (z) => {
        if (!h) return;
        const _ = z.clientX - f, V = z.clientY - $;
        s.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, c + _)),
          y: Math.max(10, Math.min(window.innerHeight - 80, m + V))
        };
      }, se = () => {
        h = !1, window.removeEventListener("mousemove", Y), window.removeEventListener("mouseup", se);
      };
      A = se, window.addEventListener("mousemove", Y), window.addEventListener("mouseup", se);
    }
    function C() {
      Fe.close();
    }
    function W() {
      const U = y.data?.htmlUrl || y.notificationItem?.htmlUrl;
      U && typeof window < "u" && window.open(U, "_blank", "noopener,noreferrer");
    }
    function H(U) {
      const N = U.target?.closest("a");
      N && N.href && (U.preventDefault(), U.stopPropagation(), window.open(N.href, "_blank", "noopener,noreferrer"));
    }
    function X() {
      y.notificationItem && Fe.open(y.notificationItem);
    }
    function ae(U) {
      switch (U) {
        case "Discussion":
          return "💡";
        case "Issue":
          return "🟢";
        case "PullRequest":
          return "🔀";
        case "Release":
          return "🏷️";
        case "CheckSuite":
          return "⚡";
        default:
          return "🐙";
      }
    }
    function q(U) {
      switch (U) {
        case "Discussion":
          return "Discussion 讨论";
        case "Issue":
          return "Issue 议题";
        case "PullRequest":
          return "Pull Request 合并请求";
        case "Release":
          return "Release 发行版";
        case "CheckSuite":
          return "CI 流水线";
        default:
          return U || "通知详情";
      }
    }
    function ce(U) {
      switch (U) {
        case "open":
          return "Open 开启";
        case "closed":
          return "Closed 已关闭";
        case "merged":
          return "Merged 已合并";
        case "discussion":
          return "活跃中";
        case "success":
          return "构建成功";
        case "failure":
          return "构建失败";
        default:
          return U || "";
      }
    }
    function le(U) {
      U.key === "Escape" && y.isOpen && C();
    }
    return Ue(() => {
      window.addEventListener("keydown", le);
    }), Pe(() => {
      window.removeEventListener("keydown", le), A();
    }), (U, E) => (n(), re(We, { to: "body" }, [
      t(y).isOpen ? (n(), r("div", fn, [
        e("div", {
          ref_key: "windowRef",
          ref: a,
          class: "gh-nonmodal-window",
          style: ze(k.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(y).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: R
          }, [
            e("div", vn, [
              e("span", yn, l(ae(t(y).data?.type || t(y).notificationItem?.subject.type)), 1),
              t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl ? (n(), r("a", {
                key: 0,
                href: t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", _n, l(x.value), 1),
                E[0] || (E[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", kn, l(T.value), 1),
                E[1] || (E[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, wn)) : (n(), r("span", $n, [
                e("strong", Cn, l(t(y).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", Gn, [
              t(y).data?.state ? (n(), r("span", {
                key: 0,
                class: j(["gh-detail-state-pill", t(y).data.state])
              }, l(ce(t(y).data.state)), 3)) : S("", !0),
              t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl ? (n(), r("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: W
              }, " 在网页打开 ↗ ")) : S("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: C
              }, " ✕ ")
            ])
          ], 32),
          e("div", Tn, [
            t(y).loading ? (n(), r("div", Rn, [
              E[2] || (E[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + l(t(y).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(y).error ? (n(), r("div", Mn, [
              E[3] || (E[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, l(t(y).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: X
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: W
                }, "在 GitHub 打开 ↗")
              ])
            ])) : t(y).data ? (n(), r("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: o,
              class: "gh-detail-scrollable",
              onClick: H
            }, [
              e("div", Sn, [
                e("h1", Ln, [
                  oe(l(t(y).data.title) + " ", 1),
                  t(y).data.number ? (n(), r("span", An, "#" + l(t(y).data.number), 1)) : S("", !0)
                ]),
                e("div", xn, [
                  t(y).data.category ? (n(), r("span", Dn, [
                    t(y).data.category.emoji ? (n(), r("span", Hn, l(t(y).data.category.emoji), 1)) : S("", !0),
                    e("span", null, l(t(y).data.category.name), 1)
                  ])) : (n(), r("span", Un, l(q(t(y).data.type)), 1)),
                  e("span", Pn, l(t(y).data.author.login), 1),
                  e("span", In, "发布于 " + l(t(y).data.formattedTime), 1),
                  t(y).data.commentsCount ? (n(), r("span", En, [
                    oe(" · " + l(t(y).data.commentsCount) + " 条讨论主题 ", 1),
                    t(y).data.totalRepliesCount ? (n(), r(B, { key: 0 }, [
                      oe(" （含 " + l(t(y).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : S("", !0)
                  ])) : S("", !0)
                ])
              ]),
              e("article", Nn, [
                e("div", jn, [
                  e("div", Fn, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(y).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, On),
                    e("div", Wn, [
                      e("div", zn, [
                        e("strong", Bn, l(t(y).data.author.login), 1),
                        t(y).data.author.association ? (n(), r("span", Yn, l(t(y).data.author.association), 1)) : S("", !0)
                      ]),
                      e("time", Vn, l(t(y).data.formattedTime), 1)
                    ])
                  ]),
                  E[4] || (E[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                E[5] || (E[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: P.value
                }, null, 8, qn),
                t(y).data.reactions?.length ? (n(), r("div", Kn, [
                  (n(!0), r(B, null, K(t(y).data.reactions, (N) => (n(), r("span", {
                    key: N.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", Xn, l(N.emoji), 1),
                    e("span", Qn, l(N.count), 1)
                  ]))), 128))
                ])) : S("", !0)
              ]),
              t(y).data.comments.length ? (n(), r("div", Jn, [
                e("div", Zn, [
                  E[6] || (E[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", ea, [
                    oe(l(t(y).data.commentsCount) + " 条主题 ", 1),
                    t(y).data.totalRepliesCount ? (n(), r(B, { key: 0 }, [
                      oe(" · " + l(t(y).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : S("", !0)
                  ])
                ]),
                e("div", ta, [
                  (n(!0), r(B, null, K(t(y).data.comments, (N) => (n(), r("div", {
                    key: N.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", sa, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: N.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, oa),
                      e("div", na, [
                        e("span", aa, l(N.author.login), 1),
                        N.author.association ? (n(), r("span", la, l(N.author.association), 1)) : S("", !0),
                        e("time", ia, l(N.formattedTime), 1)
                      ])
                    ]),
                    E[7] || (E[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: N.bodyHtml
                    }, null, 8, ra),
                    N.reactions?.length ? (n(), r("div", ua, [
                      (n(!0), r(B, null, K(N.reactions, (Y) => (n(), r("span", {
                        key: Y.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", ca, l(Y.emoji), 1),
                        e("span", da, l(Y.count), 1)
                      ]))), 128))
                    ])) : S("", !0),
                    N.replies?.length ? (n(), r("div", pa, [
                      e("div", ha, [
                        e("span", null, "💬 " + l(N.replies.length) + " 条回复对话", 1)
                      ]),
                      (n(!0), r(B, null, K(N.replies, (Y) => (n(), r("div", {
                        key: Y.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", ma, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: Y.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, ga),
                          e("div", fa, [
                            e("strong", ba, l(Y.author.login), 1),
                            Y.author.association ? (n(), r("span", va, l(Y.author.association), 1)) : S("", !0),
                            e("time", ya, l(Y.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: Y.bodyHtml
                        }, null, 8, wa),
                        Y.reactions?.length ? (n(), r("div", _a, [
                          (n(!0), r(B, null, K(Y.reactions, (se) => (n(), r("span", {
                            key: se.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", ka, l(se.emoji), 1),
                            e("span", $a, l(se.count), 1)
                          ]))), 128))
                        ])) : S("", !0)
                      ]))), 128))
                    ])) : S("", !0)
                  ]))), 128))
                ])
              ])) : (n(), r("div", Ca, [...E[8] || (E[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : S("", !0)
          ])
        ], 12, bn)
      ])) : S("", !0)
    ]));
  }
}), Ta = /* @__PURE__ */ $e(Ga, [["__scopeId", "data-v-d22ba06c"]]), Ra = ["inert"], Ma = { class: "card-head" }, Sa = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, La = ["title"], Aa = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, xa = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Da = ["placeholder"], Ha = ["title"], Ua = { class: "gh-search-rule-icon" }, Pa = { class: "gh-search-rule-text" }, Ia = ["title"], Ea = ["title"], Na = { class: "gh-header-msg-label" }, ja = {
  key: 0,
  class: "gh-header-msg-badge"
}, Fa = { class: "gh-settings-anchor" }, Oa = ["aria-expanded", "aria-label", "title"], Wa = {
  key: 0,
  class: "muted small",
  role: "status"
}, za = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Ba = { class: "gh-bili-layout" }, Ya = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, Va = ["title"], qa = { class: "fo-sidebar-toggle-title" }, Ka = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Xa = ["aria-expanded", "title"], Qa = { class: "fo-sidebar-toggle-chevron" }, Ja = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, Za = { class: "fo-sidebar-sub-wrap" }, el = ["title"], tl = { class: "fo-sidebar-sub-main" }, sl = { class: "fo-sidebar-sub-text" }, ol = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, nl = ["title"], al = { class: "fo-sidebar-sub-main" }, ll = { class: "fo-sidebar-sub-text" }, il = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, rl = ["title"], ul = { class: "fo-sidebar-sub-main" }, cl = { class: "fo-sidebar-sub-text" }, dl = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, pl = ["title"], hl = { class: "fo-sidebar-sub-main" }, ml = { class: "fo-sidebar-sub-text" }, gl = { class: "gh-bili-sidebar-head" }, fl = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, bl = { style: { color: "var(--dim)", "font-size": "9.5px" } }, vl = ["title", "aria-label"], yl = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, wl = /* @__PURE__ */ _e({
  __name: "GitHubWorkspaceCard",
  setup(v) {
    const a = it(() => import("./GitHubSettingsModal-BJ_bWCPF.js")), { active: o } = rt("card-github", "/github.html");
    let s = 0, h = !1, f;
    const $ = I(""), c = I("stars");
    we(() => o.value && c.value === "stars", (z) => O.setAiViewActive(z), { immediate: !0, flush: "sync" });
    const m = I(!1), A = I("local"), x = I(""), T = I(!1), P = I(0), k = I(!1);
    we(T, (z) => {
      z && (k.value = !0);
    });
    const R = I(null);
    let C = 0;
    function W(z) {
      c.value = z, z === "trending" ? Je.switchTab("trending") : Je.switchTab("stars");
    }
    function H() {
      c.value = "stars";
    }
    const X = ne(() => [
      { id: "exact", icon: "🎯", name: G("search.rule.exact"), desc: G("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: G("search.rule.fuzzy"), desc: G("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: G("search.rule.topic"), desc: G("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: G("search.rule.smart"), desc: G("search.rule.smartDesc") }
    ]), ae = I(O.searchRule || "exact"), q = ne(() => X.value.find((z) => z.id === ae.value) || X.value[0]);
    function ce() {
      const z = O.cycleSearchRule();
      ae.value = z;
    }
    const le = ne(() => A.value === "global" ? G("github.searchGlobalPlaceholder") : G("github.searchLocalPlaceholder", { rule: q.value.name }));
    function U() {
      clearTimeout(C), !(!o.value || A.value !== "local") && (C = window.setTimeout(() => O.setSearchQuery(x.value.trim().toLowerCase()), 180));
    }
    function E() {
      A.value = A.value === "local" ? "global" : "local", A.value === "local" && U();
    }
    function N() {
      x.value = "", clearTimeout(C), O.resetLocalSearch();
    }
    function Y() {
      const z = x.value.trim();
      A.value === "local" ? (clearTimeout(C), O.setSearchQuery(z.toLowerCase())) : z && window.open(`https://github.com/search?q=${encodeURIComponent(z)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function se() {
      ++s, h = !0, $.value = "";
    }
    return we(o, async (z) => {
      const _ = ++s;
      if (clearTimeout(C), f?.abort(), f = new AbortController(), z || f.abort(), O.setRepositoryViewSignal(f.signal), !!z) {
        if (h) {
          await O.resumeRepositoryReads();
          return;
        }
        if (O.repos.length || O.loadingAllStars || O.loadingPage) {
          h = !0;
          return;
        }
        try {
          const V = await st();
          if (!o.value || _ !== s) return;
          h = !0, await O.loadGitHub(V.ghUser, V.ghToken);
        } catch {
          if (!o.value || _ !== s) return;
          h = !1, $.value = G("github.initError");
        }
      }
    }, { immediate: !0, flush: "sync" }), at(() => {
      O.setAiViewActive(!1), ++s, f?.abort(), clearTimeout(C);
    }), (z, _) => (n(), r("section", {
      class: j(["card wide", { "card-fullscreen": t(gt).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(o)
    }, [
      e("header", Ma, [
        _[15] || (_[15] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        _[16] || (_[16] = e("h2", null, "GitHub", -1)),
        _[17] || (_[17] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", Sa, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: J(Y, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: A.value === "local" ? t(G)("github.searchScope.toGlobal") : t(G)("github.searchScope.toLocal"),
              onClick: E
            }, [
              e("span", Aa, l(A.value === "local" ? "⭐" : "🌐"), 1),
              e("span", xa, l(A.value === "local" ? t(G)("github.searchScope.local") : t(G)("github.searchScope.global")), 1),
              _[11] || (_[11] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, La),
            ue(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": _[0] || (_[0] = (V) => x.value = V),
              placeholder: le.value,
              autocomplete: "off",
              onInput: U
            }, null, 40, Da), [
              [ye, x.value]
            ]),
            A.value === "local" ? (n(), r("button", {
              key: 0,
              type: "button",
              class: j(["gh-search-rule-btn", `rule-${q.value.id}`]),
              title: t(G)("github.ruleHint", { rule: q.value.name, desc: q.value.desc }),
              onClick: J(ce, ["stop"])
            }, [
              e("span", Ua, l(q.value.icon), 1),
              e("span", Pa, l(q.value.name), 1)
            ], 10, Ha)) : S("", !0),
            ue(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: t(G)("github.clearSearch"),
              onClick: N
            }, "✕", 8, Ia), [
              [Oe, x.value]
            ]),
            _[12] || (_[12] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          _[13] || (_[13] = lt('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-b7f999c4><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-b7f999c4><input type="checkbox" value="exact" checked data-v-b7f999c4>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-b7f999c4><input type="checkbox" value="loose" data-v-b7f999c4>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-b7f999c4><input type="checkbox" value="related" data-v-b7f999c4>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-b7f999c4><input type="checkbox" value="topic" data-v-b7f999c4>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-b7f999c4><input type="checkbox" value="readme" data-v-b7f999c4>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-b7f999c4></div>', 2))
        ]),
        e("button", {
          id: "gh-header-msg-center-btn",
          class: j(["gh-header-msg-btn", { "has-unread": t(D).unreadCount > 0, "is-active": t(D).isOpen }]),
          type: "button",
          title: t(D).unreadCount > 0 ? t(G)("github.header.msgUnread", { count: t(D).unreadCount }) : t(G)("github.header.msgCenter"),
          onClick: _[1] || (_[1] = (V) => t(fe).toggle())
        }, [
          _[14] || (_[14] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
          e("span", Na, l(t(G)("github.header.msg")), 1),
          t(D).unreadCount > 0 ? (n(), r("span", ja, l(t(D).unreadCount > 99 ? "99+" : t(D).unreadCount), 1)) : S("", !0)
        ], 10, Ea),
        e("div", Fa, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: R,
            "aria-expanded": T.value,
            "aria-label": t(G)("github.settings"),
            class: "gh-head-settings-btn",
            title: t(G)("github.header.settings"),
            onClick: _[2] || (_[2] = (V) => T.value = !T.value)
          }, " ⚙️ ", 8, Oa),
          k.value ? (n(), re(t(a), {
            key: 0,
            visible: t(o) && T.value,
            anchor: R.value,
            "ai-request": P.value,
            onAccountReload: se,
            onClose: _[3] || (_[3] = (V) => T.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : S("", !0)
        ])
      ]),
      $.value ? (n(), r("p", Wa, l($.value), 1)) : S("", !0),
      e("div", za, [
        e("div", Ba, [
          e("aside", Ya, [
            e("div", {
              class: j(["fo-sidebar-toggle-bar", { "is-collapsed": m.value }]),
              title: m.value ? t(G)("github.channel.toggleExpand") : t(G)("github.channel.toggleCollapse"),
              onClick: _[4] || (_[4] = (V) => m.value = !m.value)
            }, [
              e("div", qa, [
                _[18] || (_[18] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, l(t(G)("github.channel.channels")), 1),
                m.value ? (n(), r("span", Ka, "3")) : S("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !m.value,
                title: m.value ? t(G)("github.expand") : t(G)("github.collapse")
              }, [
                e("span", null, l(m.value ? t(G)("github.expand") : t(G)("github.collapse")), 1),
                e("span", Qa, l(m.value ? "▾" : "▴"), 1)
              ], 8, Xa)
            ], 10, Va),
            m.value ? S("", !0) : (n(), r("div", Ja, [
              e("div", Za, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: c.value === "stars" }]),
                  title: t(G)("github.channel.starsTitle"),
                  onClick: _[5] || (_[5] = (V) => W("stars"))
                }, [
                  e("div", tl, [
                    _[19] || (_[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", sl, [
                      e("strong", null, l(t(G)("github.channel.stars")), 1),
                      e("small", null, l(t(G)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  _[20] || (_[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, el)
              ]),
              e("div", ol, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: c.value === "trending" }]),
                  title: t(G)("github.channel.trendingTitle"),
                  onClick: _[6] || (_[6] = (V) => W("trending"))
                }, [
                  e("div", al, [
                    _[21] || (_[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", ll, [
                      e("strong", null, l(t(G)("github.channel.trending")), 1),
                      e("small", null, l(t(G)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  _[22] || (_[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, nl)
              ]),
              e("div", il, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: c.value === "awesome" }]),
                  title: t(G)("github.channel.awesomeTitle"),
                  onClick: _[7] || (_[7] = (V) => W("awesome"))
                }, [
                  e("div", ul, [
                    _[23] || (_[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", cl, [
                      e("strong", null, l(t(G)("github.channel.awesome")), 1),
                      e("small", null, l(t(G)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  _[24] || (_[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, rl)
              ]),
              e("div", dl, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: c.value === "repos" }]),
                  title: t(G)("github.channel.reposTitle"),
                  onClick: _[8] || (_[8] = (V) => W("repos"))
                }, [
                  e("div", hl, [
                    _[25] || (_[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", ml, [
                      e("strong", null, l(t(G)("github.channel.repos")), 1),
                      e("small", null, l(t(G)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  _[26] || (_[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, pl)
              ])
            ])),
            e("header", gl, [
              e("div", null, [
                e("b", fl, [
                  _[27] || (_[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  oe(" " + l(t(G)("github.lists.title")), 1)
                ]),
                e("small", bl, l(t(G)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: t(G)("github.lists.new"),
                "aria-label": t(G)("github.lists.new"),
                onClick: _[9] || (_[9] = (V) => t(O).promptCreateFolder())
              }, "＋", 8, vl)
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: H
            }, [
              Ne(ht, { active: t(o) }, null, 8, ["active"])
            ])
          ]),
          e("section", yl, [
            c.value === "stars" && t(ct).accountConfigured === !1 ? (n(), re(dt, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: _[10] || (_[10] = (V) => T.value = !0)
            })) : c.value === "stars" ? (n(), re(Io, {
              key: 1,
              active: t(o) && c.value === "stars"
            }, null, 8, ["active"])) : c.value === "trending" ? (n(), re(mt, { key: 2 })) : c.value === "awesome" ? (n(), re(Ut, { key: 3 })) : c.value === "repos" ? (n(), re(js, {
              key: 4,
              active: t(o) && c.value === "repos"
            }, null, 8, ["active"])) : S("", !0)
          ])
        ])
      ]),
      Ne(gn),
      Ne(Ta)
    ], 10, Ra));
  }
}), Al = /* @__PURE__ */ $e(wl, [["__scopeId", "data-v-b7f999c4"]]);
export {
  Al as default
};
