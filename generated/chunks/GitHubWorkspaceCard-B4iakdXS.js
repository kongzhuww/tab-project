import { d as Me, o as s, e as a, i as e, l as me, n as Ie, f as C, F as B, g as q, A as F, t as n, u as t, h as Q, b as I, s as se, r as we, w as ve, B as Ze, x as et, y as Xe, k as Ke, j as ge, T as it, z as Qe, m as te, D as dt, K as $t, p as Ae, H as pt, C as ht } from "./vendor-vue-9b0eS4bW.js";
import { u as Ct } from "./useCardActivity-DDKQGWi_.js";
import { F as yt, H as Fe, w as de, I as Je, t as V, R as gt, y as Gt, v as Tt, D as St, A as Mt } from "./search.service-wriY3nvN.js";
import { A as Rt } from "./AccountSetupGuide-DHqCWacl.js";
import { g as wt, G as Lt, a as xt, b as mt } from "./main-Cb_Nq_M5.js";
import Dt from "./GitHubTrending-BDsUttj-.js";
import { _ as Re, t as T } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { s as He } from "./storage-cache.service-BYF2zxXX.js";
import { n as ft, o as At } from "./view-styles-cTxR8cWg.js";
import { m as ye } from "./core-utils-B2N4WtKx.js";
const Ht = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], Ut = [
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
], Pt = { class: "gh-awesome-wrapper" }, Et = { class: "gh-awesome-header" }, It = { class: "gh-awesome-intro" }, Nt = { class: "gh-awesome-search-box" }, jt = { class: "gh-awesome-pills" }, Ft = ["onClick"], Ot = { class: "gh-awesome-grid" }, Wt = ["onClick"], zt = { class: "gh-awesome-card-head" }, Bt = { class: "gh-awesome-card-name" }, Yt = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Vt = { class: "gh-awesome-desc" }, qt = { class: "gh-awesome-footer" }, Kt = { class: "gh-awesome-tags" }, Xt = ["href"], Qt = {
  key: 0,
  class: "gh-awesome-empty"
}, Jt = /* @__PURE__ */ Me({
  __name: "GitHubAwesome",
  setup(w) {
    const d = I("all"), r = I(""), l = se(() => {
      const v = r.value.trim().toLowerCase(), G = d.value;
      return Ut.filter((m) => G === "all" || m.category === G ? v ? m.name.toLowerCase().includes(v) || m.title.toLowerCase().includes(v) || m.desc.toLowerCase().includes(v) || m.tags.some(($) => $.toLowerCase().includes(v)) : !0 : !1);
    });
    function g(v) {
      window.open(v, "_blank", "noreferrer");
    }
    return (v, G) => (s(), a("div", Pt, [
      e("header", Et, [
        e("div", It, [
          G[3] || (G[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", Nt, [
            me(e("input", {
              "onUpdate:modelValue": G[0] || (G[0] = (m) => r.value = m),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [Ie, r.value]
            ]),
            r.value ? (s(), a("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: G[1] || (G[1] = (m) => r.value = "")
            }, "✕")) : C("", !0)
          ])
        ]),
        e("div", jt, [
          (s(!0), a(B, null, q(t(Ht), (m) => (s(), a("button", {
            key: m.id,
            type: "button",
            class: F(["gh-awesome-pill", { active: d.value === m.id }]),
            onClick: (f) => d.value = m.id
          }, [
            e("span", null, n(m.icon), 1),
            e("b", null, n(m.name), 1)
          ], 10, Ft))), 128))
        ])
      ]),
      e("div", Ot, [
        (s(!0), a(B, null, q(l.value, (m) => (s(), a("article", {
          key: m.id,
          class: "gh-awesome-card",
          onClick: (f) => g(m.url)
        }, [
          e("div", zt, [
            e("div", Bt, [
              e("strong", null, n(m.title), 1),
              e("small", null, n(m.name), 1)
            ]),
            e("span", Yt, "★ " + n(m.stars), 1)
          ]),
          e("p", Vt, n(m.desc), 1),
          e("div", qt, [
            e("div", Kt, [
              (s(!0), a(B, null, q(m.tags, (f) => (s(), a("span", {
                key: f,
                class: "gh-awesome-tag"
              }, n(f), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: m.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: G[2] || (G[2] = Q(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Xt)
          ])
        ], 8, Wt))), 128)),
        l.value.length ? C("", !0) : (s(), a("div", Qt, [...G[4] || (G[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Zt = /* @__PURE__ */ Re(Jt, [["__scopeId", "data-v-9dc0bfaf"]]), Ue = "gh_my_repos_cache_v1", Pe = "gh_my_repo_groups_v2", Ee = "gh_my_repo_groups_map_v2", S = we({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function Ce(w) {
  return w.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class Te {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return Te.instance || (Te.instance = new Te()), Te.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(d = !1) {
    if (!d && this.inFlightPromise)
      return this.inFlightPromise;
    d && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const r = this.abortController.signal, l = (async () => {
      await this.loadPersistedGroups();
      const g = await He.get(Ue);
      if (g && g.length ? this.hydrateRepos(g) : S.repos.length && this.hydrateRepos(S.repos), d || !S.repos.length) {
        S.loading = !0, S.errorMessage = "";
        try {
          await this.fetchRemote(r);
        } catch (G) {
          if (G.name === "AbortError") return;
          S.errorMessage = G.message || "获取个人仓库失败";
        } finally {
          S.loading = !1;
        }
      } else
        this.fetchRemote(r).catch(() => {
        });
    })();
    return this.inFlightPromise = l.finally(() => {
      this.inFlightPromise === l && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(d) {
    const { ghUser: r, ghToken: l } = await yt();
    if (!r && !l) {
      S.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const g = Fe(l), v = [], G = /* @__PURE__ */ new Set();
    if (r)
      try {
        const f = `https://api.github.com/users/${encodeURIComponent(r)}/repos?type=owner&sort=updated&per_page=100`, $ = await fetch(f, { method: "GET", headers: g, signal: d });
        if ($.ok) {
          const x = await $.json();
          if (Array.isArray(x))
            for (const M of x)
              M && M.id && !G.has(M.id) && (G.add(M.id), v.push(M));
        }
      } catch (f) {
        if (f.name === "AbortError") throw f;
      }
    if (l)
      try {
        const $ = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: g, signal: d });
        if ($.ok) {
          const x = await $.json();
          if (Array.isArray(x))
            for (const M of x)
              M && M.id && !G.has(M.id) && (G.add(M.id), v.push(M));
        }
      } catch (f) {
        if (f.name === "AbortError") throw f;
      }
    if (!v.length) {
      S.repos.length || (S.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const m = v.map((f) => {
      const $ = f.full_name || `${f.owner?.login || r}/${f.name}`, x = f.name, M = S.repoGroupsMap[$] || S.repoGroupsMap[x] || S.repoGroupsMap[$.toLowerCase()] || S.repoGroupsMap[x.toLowerCase()] || [];
      return {
        id: f.id,
        name: f.name,
        fullName: $,
        description: f.description || "",
        isPrivate: !!f.private,
        isFork: !!f.fork,
        htmlUrl: f.html_url || `https://github.com/${r}/${f.name}`,
        language: f.language || null,
        stargazersCount: Number(f.stargazers_count) || 0,
        forksCount: Number(f.forks_count) || 0,
        openIssuesCount: Number(f.open_issues_count) || 0,
        topics: Array.isArray(f.topics) ? f.topics.map((A) => String(A).toLowerCase()) : [],
        localGroups: M,
        updatedAt: f.updated_at || "",
        pushedAt: f.pushed_at || "",
        defaultBranch: f.default_branch || "main"
      };
    });
    this.hydrateRepos(m), await He.set(Ue, m, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(d) {
    let r = !1;
    S.repos = d.map((l) => {
      const g = S.repoGroupsMap[l.fullName] || S.repoGroupsMap[l.name] || S.repoGroupsMap[l.fullName.toLowerCase()] || S.repoGroupsMap[l.name.toLowerCase()], v = l.localGroups && l.localGroups.length ? l.localGroups : null, G = this.inferGroupsForRepo(l, S.customGroups), m = (g && g.length ? g : null) || v || G, f = m ? [...new Set(m.filter(Boolean))] : [];
      return f.length && (!S.repoGroupsMap[l.fullName] || !S.repoGroupsMap[l.fullName].length) && (S.repoGroupsMap[l.fullName] = f, r = !0), {
        ...l,
        localGroups: f
      };
    }), r && this.persistGroupsMap();
  }
  /**
   * 智能推断仓库最匹配的分组归属（仅在无手动归类时作为平滑桥接）
   */
  inferGroupsForRepo(d, r) {
    if (!r || !r.length) return [];
    const l = [], g = d.name.toLowerCase(), v = (d.topics || []).map((G) => G.toLowerCase());
    for (const G of r) {
      const m = G.toLowerCase();
      if ((m.includes("fork") || G.includes("分支")) && (d.isFork || v.includes("fork"))) {
        l.push(G);
        continue;
      }
      if ((m.includes("浏览器") || m.includes("browser") || m.includes("chrome") || m.includes("edge")) && (v.some((f) => f.includes("extension") || f.includes("browser") || f.includes("newtab")) || g.includes("tab-project"))) {
        l.push(G);
        continue;
      }
      if ((m.includes("pi") || G.includes("PI")) && (v.some((f) => f.includes("pi") || f.includes("grounding-pi")) || g.includes("pi-") || g.includes("-pi"))) {
        l.push(G);
        continue;
      }
      if (m.includes("herdr") && (v.some((f) => f.includes("herdr")) || g.includes("herdr"))) {
        l.push(G);
        continue;
      }
      if ((m.includes("嵌入式") || m.includes("embedded") || m.includes("单片机")) && (v.some((f) => f.includes("embedded") || f.includes("zephyr") || f.includes("stm32") || f.includes("k230")) || g.includes("k230") || g.includes("mspm0") || g.includes("pid-") || g.includes("zephyr"))) {
        l.push(G);
        continue;
      }
      if ((m.includes("美化") || m.includes("theme") || m.includes("style")) && (v.some((f) => f.includes("theme") || f.includes("beauty") || f.includes("ui")) || g.includes("theme") || g.includes("style"))) {
        l.push(G);
        continue;
      }
    }
    return l;
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(d, r) {
    const l = Ce(r);
    l && (d.localGroups.includes(l) || d.localGroups.push(l), S.repoGroupsMap[d.fullName] = [...d.localGroups], await this.persistGroupsMap(), await He.set(Ue, S.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(d, r) {
    d.localGroups = d.localGroups.filter((l) => l !== r), S.repoGroupsMap[d.fullName] = [...d.localGroups], await this.persistGroupsMap(), await He.set(Ue, S.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(d, r) {
    if (!r)
      d.localGroups = [];
    else {
      const l = Ce(r);
      if (!l) return;
      d.localGroups = [l];
    }
    S.repoGroupsMap[d.fullName] = [...d.localGroups], await this.persistGroupsMap(), await He.set(Ue, S.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(d) {
    const r = Ce(d);
    return r ? S.customGroups.includes(r) ? (alert(`分组「${r}」已存在。`), null) : (S.customGroups.push(r), await this.persistGroups(), r) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(d, r) {
    const l = Ce(r);
    return l ? d === l ? !0 : S.customGroups.includes(l) ? (alert(`已存在名为「${l}」的分组。`), !1) : (S.customGroups = S.customGroups.map((g) => g === d ? l : g), S.repos.forEach((g) => {
      g.localGroups.includes(d) && (g.localGroups = g.localGroups.map((v) => v === d ? l : v), S.repoGroupsMap[g.fullName] = [...g.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(d) {
    const r = S.repos.filter((g) => g.localGroups.includes(d)).length, l = r > 0 ? `确定删除分组「${d}」吗？
该分组下的 ${r} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${d}」吗？`;
    return confirm(l) ? (S.customGroups = S.customGroups.filter((g) => g !== d), S.repos.forEach((g) => {
      g.localGroups.includes(d) && (g.localGroups = g.localGroups.filter((v) => v !== d), S.repoGroupsMap[g.fullName] = [...g.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let d = null, r = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const l = await chrome.storage.local.get([Pe, Ee]);
        d = l?.[Pe], r = l?.[Ee];
      }
      if (!d || !Array.isArray(d)) {
        const l = localStorage.getItem(Pe);
        l && (d = JSON.parse(l));
      }
      if (!r || typeof r != "object") {
        const l = localStorage.getItem(Ee);
        l && (r = JSON.parse(l));
      }
      Array.isArray(d) && (S.customGroups = d.map(Ce).filter(Boolean)), r && typeof r == "object" && (S.repoGroupsMap = r);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const d = { ...S.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Ee]: d }), localStorage.setItem(Ee, JSON.stringify(d));
    } catch {
    }
  }
  async persistGroups() {
    const d = Array.from(new Set(S.customGroups.map(Ce).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Pe]: d }), localStorage.setItem(Pe, JSON.stringify(d));
    } catch {
    }
  }
}
const ne = Te.getInstance(), es = { class: "my-repos-workspace" }, ts = {
  key: 0,
  class: "error-banner"
}, ss = { class: "shelf-header" }, os = { class: "shelf-left" }, ns = { class: "shelf-badge" }, as = { class: "shelf-right" }, ls = { class: "shelf-search-wrap" }, is = ["disabled", "title"], rs = ["title"], us = ["onDragstart", "onContextmenu"], cs = { class: "repo-card-head" }, ds = ["title", "onClick"], ps = {
  key: 0,
  class: "badge-repo-visibility private"
}, hs = {
  key: 1,
  class: "badge-repo-visibility fork"
}, gs = ["title"], ms = {
  key: 1,
  class: "repo-topics-row"
}, fs = { class: "repo-card-footer" }, bs = { class: "meta-left" }, vs = {
  key: 0,
  class: "meta-item lang"
}, ys = { class: "meta-item" }, ws = {
  key: 1,
  class: "meta-item"
}, _s = ["title"], ks = { class: "board-columns-track" }, $s = ["onDragover", "onDragleave", "onDrop"], Cs = { class: "column-header" }, Gs = {
  key: 0,
  class: "column-title-group"
}, Ts = ["title"], Ss = { class: "badge-count" }, Ms = {
  key: 1,
  class: "column-rename-group"
}, Rs = ["onKeydown"], Ls = ["onClick"], xs = { class: "column-actions" }, Ds = ["onClick"], As = {
  key: 0,
  class: "col-popover-menu"
}, Hs = ["onClick"], Us = ["onClick"], Ps = { class: "column-cards-scroll" }, Es = ["onDragstart", "onContextmenu"], Is = { class: "repo-card-head" }, Ns = ["title", "onClick"], js = {
  key: 0,
  class: "badge-repo-visibility private"
}, Fs = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Os = ["title"], Ws = { class: "repo-topics-row" }, zs = { class: "topic-chip active-chip" }, Bs = ["onClick"], Ys = { class: "repo-card-footer" }, Vs = { class: "meta-left" }, qs = {
  key: 0,
  class: "meta-item lang"
}, Ks = { class: "meta-item" }, Xs = {
  key: 1,
  class: "meta-item"
}, Qs = { class: "meta-date" }, Js = {
  key: 0,
  class: "empty-column-placeholder"
}, Zs = { class: "board-column new-column-slot" }, eo = {
  key: 1,
  class: "new-column-composer"
}, to = { class: "composer-actions" }, so = ["onClick"], oo = /* @__PURE__ */ Me({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(w) {
    const d = w, r = I(""), l = I(!1), g = I(null), v = I(""), G = I(null), m = I(null), f = I(null), $ = I(!1);
    function x() {
      $.value = !$.value;
    }
    function M(p) {
      const c = f.value;
      c && (Math.abs(p.deltaX) > Math.abs(p.deltaY) && p.deltaX !== 0 || p.deltaY !== 0 && (p.preventDefault(), c.scrollLeft += p.deltaY));
    }
    const A = I(null), R = I(null), D = I(null);
    let L = null, Z = 0;
    const E = we({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), O = I(null), ue = I(!1);
    function J() {
      E.visible = !1, O.value = null;
    }
    function ae(p, c, h) {
      p.preventDefault(), p.stopPropagation();
      let y = p.clientX, ee = p.clientY;
      y > window.innerWidth - 200 && (y = window.innerWidth - 210), ee > window.innerHeight - 240 && (ee = window.innerHeight - 245), E.x = y, E.y = ee, E.repo = c, E.fromGroup = h, E.visible = !0, O.value = "folder", ue.value = y > window.innerWidth - 380;
    }
    async function le() {
      const p = E.repo;
      J(), p && await ne.moveRepoToGroup(p, null);
    }
    async function H(p) {
      const c = E.repo;
      J(), c && await ne.moveRepoToGroup(c, p);
    }
    async function N() {
      const p = E.repo;
      if (J(), !!p)
        try {
          await navigator.clipboard.writeText(p.htmlUrl), ft.show({
            appName: "GitHub",
            title: T("github.myRepos.copiedUrlTitle"),
            message: T("github.myRepos.copiedUrlMsg", { name: p.name })
          });
        } catch {
        }
    }
    async function U() {
      const p = E.repo;
      if (J(), !!p)
        try {
          const c = `git clone ${p.htmlUrl}.git`;
          await navigator.clipboard.writeText(c), ft.show({
            appName: "GitHub",
            title: T("github.myRepos.copiedCloneTitle"),
            message: c
          });
        } catch {
        }
    }
    function Y() {
      const p = E.repo;
      J(), p && ke(p.htmlUrl);
    }
    function ie() {
      const p = E.repo;
      J(), p && wt.open({
        fullName: p.fullName,
        description: p.description || "",
        stars: p.stargazersCount,
        language: p.language || void 0,
        updated: p.pushedAt
      });
    }
    function pe(p) {
      p.target?.closest(".gh-repo-context-menu") || E.visible && J();
    }
    function fe(p) {
      p.key === "Escape" && E.visible && J();
    }
    const be = se(() => S.customGroups), W = se(() => {
      const p = S.searchQuery.trim().toLowerCase();
      return p ? S.repos.filter(
        (c) => c.name.toLowerCase().includes(p) || c.description.toLowerCase().includes(p) || c.localGroups.some((h) => h.toLowerCase().includes(p)) || c.topics.some((h) => h.toLowerCase().includes(p)) || c.language && c.language.toLowerCase().includes(p)
      ) : S.repos;
    }), k = se(() => W.value.filter((p) => !p.localGroups.length));
    function X(p) {
      return W.value.filter((c) => c.localGroups.includes(p));
    }
    async function Le() {
      const p = r.value.trim();
      if (!p) return;
      await ne.createGroup(p) && (r.value = "", l.value = !1);
    }
    function tt(p) {
      G.value = p, v.value = p, g.value = null;
    }
    async function Oe(p) {
      const c = v.value.trim();
      if (!c || c === p) {
        G.value = null;
        return;
      }
      await ne.renameGroup(p, c) && (G.value = null);
    }
    async function st(p) {
      g.value = null, await ne.deleteGroup(p);
    }
    async function K(p, c) {
      await ne.removeRepoFromGroup(p, c);
    }
    function re(p) {
      const c = m.value;
      if (!c) return;
      const y = p.target?.closest(".column-cards-scroll");
      if (y && y.scrollHeight > y.clientHeight && !p.shiftKey && p.deltaX === 0) {
        const ee = y.scrollTop <= 0 && p.deltaY < 0, qe = y.scrollTop + y.clientHeight >= y.scrollHeight - 1 && p.deltaY > 0;
        if (!ee && !qe)
          return;
      }
      Math.abs(p.deltaX) > Math.abs(p.deltaY) && p.deltaX !== 0 || p.deltaY !== 0 && (p.preventDefault(), c.scrollLeft += p.deltaY);
    }
    function _e(p) {
      if (!A.value || !m.value) return;
      p.preventDefault();
      const c = p.deltaX !== 0 ? p.deltaX : p.deltaY;
      m.value.scrollLeft += c;
    }
    function oe() {
      if (L !== null) return;
      const p = () => {
        m.value && Z !== 0 ? (m.value.scrollLeft += Z, L = requestAnimationFrame(p)) : he();
      };
      L = requestAnimationFrame(p);
    }
    function he() {
      L !== null && (cancelAnimationFrame(L), L = null), Z = 0;
    }
    function We(p) {
      if (!A.value || !m.value) return;
      const c = m.value.getBoundingClientRect(), h = 100;
      if (p > c.right - h) {
        const y = Math.min(1, Math.max(0.1, (p - (c.right - h)) / h));
        Z = Math.round(y * 20), oe();
      } else if (p < c.left + h) {
        const y = Math.min(1, Math.max(0.1, (c.left + h - p) / h));
        Z = -Math.round(y * 20), oe();
      } else
        he();
    }
    function ot(p) {
      A.value && (p.preventDefault(), We(p.clientX));
    }
    function ze(p, c, h) {
      J(), A.value = c, R.value = h, p.dataTransfer && (p.dataTransfer.effectAllowed = "move", p.dataTransfer.setData("text/plain", `${c.id}:${h}`)), window.addEventListener("wheel", _e, { passive: !1 });
    }
    function xe() {
      A.value = null, R.value = null, D.value = null, he(), window.removeEventListener("wheel", _e);
    }
    function Be(p, c) {
      A.value && (p.preventDefault(), p.dataTransfer && (p.dataTransfer.dropEffect = "move"), D.value = c, We(p.clientX));
    }
    function Ye(p, c) {
      const h = p.currentTarget, y = p.relatedTarget;
      h?.contains(y) || D.value === c && (D.value = null);
    }
    async function De(p, c) {
      p.preventDefault();
      const h = A.value, y = R.value;
      xe(), h && (c === "default" ? y && y !== "default" ? await ne.removeRepoFromGroup(h, y) : await ne.moveRepoToGroup(h, null) : (await ne.addRepoToGroup(h, c), y && y !== "default" && y !== c && await ne.removeRepoFromGroup(h, y)));
    }
    function ke(p) {
      window.open(p, "_blank", "noopener,noreferrer");
    }
    function Ve(p) {
      if (!p) return "";
      try {
        const c = new Date(p);
        return `${c.getFullYear()}-${String(c.getMonth() + 1).padStart(2, "0")}-${String(c.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ve(
      () => d.active,
      (p) => {
        J(), p && ne.load();
      }
    ), Ze(() => {
      window.addEventListener("pointerdown", pe), window.addEventListener("keydown", fe), ne.load();
    }), et(() => {
      he(), window.removeEventListener("wheel", _e), window.removeEventListener("pointerdown", pe), window.removeEventListener("keydown", fe);
    }), (p, c) => (s(), a("div", es, [
      t(S).errorMessage ? (s(), a("div", ts, [
        e("span", null, "⚠️ " + n(t(S).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: c[0] || (c[0] = (h) => t(ne).load(!0))
        }, "重试")
      ])) : C("", !0),
      e("section", {
        class: F(["default-shelf-area", { "is-collapsed": $.value, "drop-active": D.value === "default" }]),
        onDragover: c[4] || (c[4] = (h) => Be(h, "default")),
        onDragleave: c[5] || (c[5] = (h) => Ye(h, "default")),
        onDrop: c[6] || (c[6] = (h) => De(h, "default"))
      }, [
        e("header", ss, [
          e("div", os, [
            c[23] || (c[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            c[24] || (c[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", ns, n(k.value.length), 1),
            c[25] || (c[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", as, [
            e("div", ls, [
              c[26] || (c[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              me(e("input", {
                "onUpdate:modelValue": c[1] || (c[1] = (h) => t(S).searchQuery = h),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [Ie, t(S).searchQuery]
              ]),
              t(S).searchQuery ? (s(), a("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: c[2] || (c[2] = (h) => t(S).searchQuery = "")
              }, "✕")) : C("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(S).loading,
              title: t(T)("github.myRepos.refreshBtnTitle"),
              onClick: c[3] || (c[3] = (h) => t(ne).load(!0))
            }, [
              e("span", {
                class: F({ spinning: t(S).loading })
              }, "🔄", 2),
              e("span", null, n(t(S).loading ? t(T)("github.myRepos.refreshing") : t(T)("common.refresh")), 1)
            ], 8, is),
            k.value.length ? (s(), a("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: $.value ? t(T)("github.myRepos.expandShelf") : t(T)("github.myRepos.collapseShelf"),
              onClick: x
            }, n($.value ? t(T)("github.myRepos.expandBtn") : t(T)("github.myRepos.collapseBtn")), 9, rs)) : C("", !0)
          ])
        ]),
        k.value.length ? me((s(), a("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: f,
          class: "shelf-cards-scroll",
          onWheel: M
        }, [
          (s(!0), a(B, null, q(k.value, (h) => (s(), a("div", {
            key: h.id,
            class: F(["repo-card shelf-card", { "card-dragging": A.value?.id === h.id }]),
            draggable: "true",
            onDragstart: (y) => ze(y, h, "default"),
            onDragend: xe,
            onContextmenu: (y) => ae(y, h, "default")
          }, [
            e("div", cs, [
              e("span", {
                class: "repo-name",
                title: h.fullName,
                onClick: (y) => ke(h.htmlUrl)
              }, n(h.name), 9, ds),
              h.isPrivate ? (s(), a("span", ps, "私有")) : C("", !0),
              h.isFork ? (s(), a("span", hs, "Fork")) : C("", !0)
            ]),
            h.description ? (s(), a("p", {
              key: 0,
              class: "repo-desc",
              title: h.description
            }, n(h.description), 9, gs)) : C("", !0),
            h.topics.length ? (s(), a("div", ms, [
              (s(!0), a(B, null, q(h.topics, (y) => (s(), a("span", {
                key: y,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + n(y), 1))), 128))
            ])) : C("", !0),
            e("div", fs, [
              e("div", bs, [
                h.language ? (s(), a("span", vs, [
                  c[27] || (c[27] = e("span", { class: "lang-color" }, null, -1)),
                  te(n(h.language), 1)
                ])) : C("", !0),
                e("span", ys, "⭐ " + n(h.stargazersCount), 1),
                h.forksCount ? (s(), a("span", ws, "🍴 " + n(h.forksCount), 1)) : C("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + h.updatedAt
              }, n(Ve(h.pushedAt || h.updatedAt)), 9, _s)
            ])
          ], 42, us))), 128))
        ], 544)), [
          [Xe, !$.value]
        ]) : C("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: m,
        class: "board-viewport",
        onWheel: re,
        onDragover: ot
      }, [
        e("div", ks, [
          (s(!0), a(B, null, q(be.value, (h) => (s(), a("section", {
            key: h,
            class: F(["board-column topic-column", { "drop-active": D.value === h }]),
            onDragover: (y) => Be(y, h),
            onDragleave: (y) => Ye(y, h),
            onDrop: (y) => De(y, h)
          }, [
            e("header", Cs, [
              G.value !== h ? (s(), a("div", Gs, [
                c[28] || (c[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + h
                }, " 📁 " + n(h), 9, Ts),
                e("span", Ss, n(X(h).length), 1)
              ])) : (s(), a("div", Ms, [
                me(e("input", {
                  "onUpdate:modelValue": c[7] || (c[7] = (y) => v.value = y),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    Ke((y) => Oe(h), ["enter"]),
                    c[8] || (c[8] = Ke((y) => G.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, Rs), [
                  [Ie, v.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (y) => Oe(h)
                }, "✓", 8, Ls),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: c[9] || (c[9] = (y) => G.value = null)
                }, "✕")
              ])),
              e("div", xs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (y) => g.value = g.value === h ? null : h
                }, "•••", 8, Ds),
                g.value === h ? (s(), a("div", As, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (y) => tt(h)
                  }, " 重命名分组 ", 8, Hs),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (y) => st(h)
                  }, " 删除分组 ", 8, Us)
                ])) : C("", !0)
              ])
            ]),
            e("div", Ps, [
              (s(!0), a(B, null, q(X(h), (y) => (s(), a("div", {
                key: y.id,
                class: F(["repo-card", { "card-dragging": A.value?.id === y.id }]),
                draggable: "true",
                onDragstart: (ee) => ze(ee, y, h),
                onDragend: xe,
                onContextmenu: (ee) => ae(ee, y, h)
              }, [
                e("div", Is, [
                  e("span", {
                    class: "repo-name",
                    title: y.fullName,
                    onClick: (ee) => ke(y.htmlUrl)
                  }, n(y.name), 9, Ns),
                  y.isPrivate ? (s(), a("span", js, "私有")) : C("", !0),
                  y.isFork ? (s(), a("span", Fs, "Fork")) : C("", !0)
                ]),
                y.description ? (s(), a("p", {
                  key: 0,
                  class: "repo-desc",
                  title: y.description
                }, n(y.description), 9, Os)) : C("", !0),
                e("div", Ws, [
                  e("span", zs, [
                    te(" 📁 " + n(h) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: Q((ee) => K(y, h), ["stop"])
                    }, "✕", 8, Bs)
                  ]),
                  (s(!0), a(B, null, q(y.topics, (ee) => (s(), a("span", {
                    key: ee,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + n(ee), 1))), 128))
                ]),
                e("div", Ys, [
                  e("div", Vs, [
                    y.language ? (s(), a("span", qs, [
                      c[29] || (c[29] = e("span", { class: "lang-color" }, null, -1)),
                      te(n(y.language), 1)
                    ])) : C("", !0),
                    e("span", Ks, "⭐ " + n(y.stargazersCount), 1),
                    y.forksCount ? (s(), a("span", Xs, "🍴 " + n(y.forksCount), 1)) : C("", !0)
                  ]),
                  e("span", Qs, n(Ve(y.pushedAt || y.updatedAt)), 1)
                ])
              ], 42, Es))), 128)),
              X(h).length ? C("", !0) : (s(), a("div", Js, [...c[30] || (c[30] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, $s))), 128)),
          e("section", Zs, [
            l.value ? (s(), a("div", eo, [
              c[32] || (c[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              me(e("input", {
                "onUpdate:modelValue": c[11] || (c[11] = (h) => r.value = h),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  Ke(Le, ["enter"]),
                  c[12] || (c[12] = Ke((h) => l.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [Ie, r.value]
              ]),
              e("div", to, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: Le
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: c[13] || (c[13] = (h) => l.value = !1)
                }, n(t(T)("common.cancel")), 1)
              ])
            ])) : (s(), a("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: c[10] || (c[10] = (h) => l.value = !0)
            }, [...c[31] || (c[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (s(), ge(it, { to: "body" }, [
        E.visible && E.repo ? (s(), a("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Qe({ left: `${E.x}px`, top: `${E.y}px` }),
          onClick: c[21] || (c[21] = Q(() => {
          }, ["stop"])),
          onContextmenu: c[22] || (c[22] = Q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: F(["gh-menu-has-sub", { "is-active": O.value === "folder" }]),
            onMouseenter: c[16] || (c[16] = (h) => O.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: c[14] || (c[14] = Q((h) => O.value = O.value === "folder" ? null : "folder", ["stop"]))
            }, [...c[33] || (c[33] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: F(["gh-sub-flyout", { "flyout-left": ue.value }]),
              onClick: c[15] || (c[15] = Q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: F(["fo-cover-menu-item", { primary: !E.repo.localGroups.length }]),
                type: "button",
                onClick: le
              }, n(E.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (s(!0), a(B, null, q(be.value, (h) => (s(), a("button", {
                key: h,
                class: F(["fo-cover-menu-item", { primary: E.repo.localGroups.includes(h) }]),
                type: "button",
                onClick: (y) => H(h)
              }, n(E.repo.localGroups.includes(h) ? "✓ " : "  ") + "📁 " + n(h), 11, so))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[17] || (c[17] = (h) => O.value = null),
            onClick: N
          }, n(t(T)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[18] || (c[18] = (h) => O.value = null),
            onClick: U
          }, n(t(T)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[19] || (c[19] = (h) => O.value = null),
            onClick: ie
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: c[20] || (c[20] = (h) => O.value = null),
            onClick: Y
          }, n(t(T)("github.myRepos.openInGitHub")), 33)
        ], 36)) : C("", !0)
      ]))
    ]));
  }
}), no = /* @__PURE__ */ Re(oo, [["__scopeId", "data-v-f77c8971"]]), ce = we({
  uncatPage: 1,
  pageSize: 10
});
class Se {
  static getInstance() {
    return Se.instance || (Se.instance = new Se()), Se.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && ce.uncatPage++;
  }
  prevUncatPage() {
    ce.uncatPage > 1 && ce.uncatPage--;
  }
  setUncatPage(d) {
    const r = Math.max(1, Math.min(d, this.uncatTotalPages));
    ce.uncatPage = r;
  }
  get uncatPage() {
    return ce.uncatPage;
  }
  get uncatTotalPages() {
    const d = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(d / ce.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const d = de.searchQuery.trim().toLowerCase(), r = de.repos.filter((l) => Je(l.full_name).length === 0);
    return d ? r.filter(
      (l) => l.full_name.toLowerCase().includes(d) || l.description && l.description.toLowerCase().includes(d) || l.language && l.language.toLowerCase().includes(d) || l.topics && l.topics.some((g) => g.toLowerCase().includes(d))
    ) : r;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const d = this.filteredUncatRepos, l = (Math.min(ce.uncatPage, this.uncatTotalPages) - 1) * ce.pageSize;
    return d.slice(l, l + ce.pageSize);
  }
  /**
   * 各个本地分组板块列表（根据当前激活的大分组标签过滤）
   */
  get lists() {
    const d = de.activeSection || "默认";
    return de.lists.filter((r) => (r.section || "默认") === d);
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(d) {
    const r = de.searchQuery.trim().toLowerCase(), l = de.repos.filter((g) => Je(g.full_name).includes(d));
    return r ? l.filter(
      (g) => g.full_name.toLowerCase().includes(r) || g.description && g.description.toLowerCase().includes(r) || g.language && g.language.toLowerCase().includes(r) || g.topics && g.topics.some((v) => v.toLowerCase().includes(r))
    ) : l;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(d, r) {
    await V.dropRepositoryIntoFolder(d, r);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(d, r) {
    await V.toggleRepoList(d, r);
  }
}
const z = Se.getInstance(), ao = { class: "stars-board-workspace" }, lo = ["data-gh-list-drop"], io = { class: "shelf-header" }, ro = { class: "shelf-left" }, uo = { class: "shelf-badge" }, co = { class: "shelf-right" }, po = {
  key: 0,
  class: "shelf-pager"
}, ho = ["disabled"], go = { class: "pager-text" }, mo = ["disabled"], fo = ["disabled", "aria-busy"], bo = ["title"], vo = {
  key: 0,
  class: "shelf-cards-scroll"
}, yo = ["onClick", "onDragstart", "onContextmenu"], wo = ["onClick"], _o = { class: "gh-card-head" }, ko = ["src"], $o = ["href", "title"], Co = { class: "owner" }, Go = { class: "gh-card-body" }, To = { class: "gh-card-badges" }, So = ["title"], Mo = ["title"], Ro = ["title"], Lo = { class: "meta" }, xo = { class: "gh-stars" }, Do = {
  key: 0,
  class: "gh-lang"
}, Ao = { class: "gh-updated" }, Ho = { class: "shelf-next-content" }, Uo = { class: "shelf-next-sub" }, Po = {
  key: 2,
  class: "shelf-empty",
  role: "status"
}, Eo = {
  key: 0,
  class: "gh-drilldown-header"
}, Io = { class: "gh-drilldown-current" }, No = { class: "gh-drilldown-sub-count" }, jo = {
  key: 0,
  class: "board-columns-track"
}, Fo = { class: "column-cards-scroll" }, Oo = {
  key: 1,
  class: "board-columns-track"
}, Wo = ["data-gh-list-drop", "onDragover", "onDragleave", "onDrop"], zo = ["title"], Bo = ["onClick"], Yo = ["title"], Vo = {
  key: 0,
  class: "col-pinned-icon",
  title: "已置顶分组"
}, qo = { class: "badge-count" }, Ko = {
  key: 1,
  class: "col-sub-badge",
  title: "点击下钻查看所有子分组"
}, Xo = { class: "column-actions" }, Qo = ["onDragstart", "onClick"], Jo = { class: "column-cards-scroll" }, Zo = ["onClick", "onDragstart", "onContextmenu"], en = ["onClick"], tn = { class: "gh-card-head" }, sn = ["src"], on = ["href", "title"], nn = { class: "owner" }, an = { class: "gh-card-body" }, ln = { class: "gh-card-badges" }, rn = ["title"], un = ["onClick"], cn = ["title"], dn = ["title"], pn = ["title"], hn = { class: "meta" }, gn = { class: "gh-stars" }, mn = {
  key: 0,
  class: "gh-lang"
}, fn = { class: "gh-updated" }, bn = {
  key: 0,
  class: "empty-column-dropzone"
}, vn = { class: "board-column add-column-panel" }, yn = ["title"], wn = ["onClick"], _n = /* @__PURE__ */ Me({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(w) {
    const d = w, r = I(null), l = I(null), g = I(!1);
    function v() {
      g.value = !g.value;
    }
    function G(i) {
      const o = l.value;
      o && (Math.abs(i.deltaX) > Math.abs(i.deltaY) && i.deltaX !== 0 || i.deltaY !== 0 && (i.preventDefault(), o.scrollLeft += i.deltaY));
    }
    const m = se(() => de.loading), f = se(() => m.value && !de.repos.length), $ = I(null);
    function x(i) {
      if (!i) return null;
      const o = i.match(/^(.+?)[/／](.+)$/);
      if (!o) return null;
      const u = o[1].trim(), b = o[2].trim();
      return !u || !b ? null : { parentPrefix: u, childName: b };
    }
    function M(i) {
      const o = x(i);
      if (!o) return null;
      const u = o.parentPrefix.toLowerCase(), b = z.lists.find((j) => j.name.trim().toLowerCase() === u);
      return b ? b.name : null;
    }
    function A(i) {
      const o = i.trim().toLowerCase();
      return z.lists.filter((u) => {
        const b = x(u.name);
        return b !== null && b.parentPrefix.toLowerCase() === o;
      });
    }
    function R(i) {
      return A(i).length > 0;
    }
    const D = se(() => $.value ? A($.value).length : 0);
    function L(i) {
      $.value = i, r.value && (r.value.scrollLeft = 0);
    }
    const Z = se(() => {
      const i = z.lists;
      if (!$.value)
        return i.filter((j) => M(j.name) === null);
      const o = $.value.trim().toLowerCase(), u = i.find((j) => j.name.trim().toLowerCase() === o), b = A($.value);
      return !u && !b.length ? ($.value = null, i.filter((j) => M(j.name) === null)) : u ? [u, ...b] : b;
    });
    ve(() => de.activeSection, () => {
      $.value = null;
    });
    function E() {
      V.promptCreateFolder($.value || void 0);
    }
    const O = I(null), ue = I(null), J = I(null);
    let ae = null, le = 0;
    function H() {
      ae === null && (ae = window.setInterval(() => {
        !r.value || le === 0 || (r.value.scrollLeft += le);
      }, 16));
    }
    function N() {
      ae !== null && (clearInterval(ae), ae = null), le = 0;
    }
    const U = we({
      visible: !1,
      x: 0,
      y: 0,
      list: null
    });
    function Y() {
      U.visible = !1, U.list = null;
    }
    function ie(i, o) {
      i.preventDefault(), i.stopPropagation(), oe();
      const u = 150, b = 130, j = Math.min(i.clientX, window.innerWidth - u - 10), $e = Math.min(i.clientY, window.innerHeight - b - 10);
      U.x = j, U.y = $e, U.list = o, U.visible = !0;
    }
    async function pe() {
      const i = U.list;
      Y(), i && await V.renameFolder(i.id, i.name);
    }
    async function fe() {
      const i = U.list;
      Y(), i && await V.pinFolder(i.id);
    }
    async function be() {
      const i = U.list;
      Y(), i && await V.deleteFolder(i.name);
    }
    const W = I(null), k = I(null);
    function X(i, o) {
      Y(), oe(), W.value = o.id, i.dataTransfer && (i.dataTransfer.effectAllowed = "move", i.dataTransfer.setData("application/x-gh-col-id", o.id));
    }
    function Le() {
      W.value = null, k.value = null;
    }
    function tt(i, o) {
      !W.value || W.value === o || (i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = "move"), k.value = o);
    }
    function Oe(i, o) {
      k.value === o && (k.value = null);
    }
    async function st(i, o) {
      if (!W.value || W.value === o) return;
      i.preventDefault();
      const u = W.value;
      Le(), await V.reorderFolders(u, o);
    }
    const K = we({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), re = I(null), _e = I(!1);
    function oe() {
      K.visible = !1, K.repo = null, K.fromList = null, re.value = null;
    }
    function he(i, o, u) {
      i.preventDefault(), i.stopPropagation();
      const b = 190, j = 270, $e = Math.min(i.clientX, window.innerWidth - b - 10), kt = Math.min(i.clientY, window.innerHeight - j - 10);
      K.x = $e, K.y = kt, K.repo = o, K.fromList = u, K.visible = !0, re.value = "folder", _e.value = $e > window.innerWidth - 380;
    }
    async function We() {
      const i = K.repo;
      oe(), i && await z.moveRepoToList(i.full_name, V.UNCAT);
    }
    async function ot(i) {
      const o = K.repo;
      oe(), o && await z.moveRepoToList(o.full_name, i);
    }
    async function ze() {
      const i = K.repo;
      if (oe(), !!i?.html_url)
        try {
          await navigator.clipboard.writeText(i.html_url);
        } catch {
        }
    }
    async function xe() {
      const i = K.repo;
      if (oe(), !!i?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${i.full_name}.git`);
        } catch {
        }
    }
    function Be() {
      const i = K.repo;
      oe(), i && wt.open({
        fullName: i.full_name,
        description: i.description || "",
        stars: i.stargazers_count,
        language: i.language || void 0,
        updated: i.updated_at
      });
    }
    function Ye() {
      const i = K.repo;
      oe(), i?.html_url && _t(i.html_url);
    }
    function De(i) {
      const o = i.target;
      !o?.closest(".fo-cover-context-menu") && !o?.closest(".col-popover-menu") && !o?.closest(".gh-list-col-menu") && (oe(), Y());
    }
    function ke(i) {
      if (i.key === "Escape") {
        if ($.value) {
          $.value = null;
          return;
        }
        oe(), Y();
      }
    }
    function Ve(i) {
      const o = r.value;
      if (!o) return;
      const b = i.target?.closest(".column-cards-scroll");
      if (b && b.scrollHeight > b.clientHeight && !i.shiftKey && i.deltaX === 0) {
        const j = b.scrollTop === 0 && i.deltaY < 0, $e = Math.ceil(b.scrollTop + b.clientHeight) >= b.scrollHeight && i.deltaY > 0;
        if (!j && !$e)
          return;
      }
      Math.abs(i.deltaX) > Math.abs(i.deltaY) && i.deltaX !== 0 || i.deltaY !== 0 && (i.preventDefault(), o.scrollLeft += i.deltaY);
    }
    function p(i) {
      if (!O.value || !r.value) return;
      i.preventDefault();
      const o = i.deltaY !== 0 ? i.deltaY : i.deltaX;
      r.value.scrollLeft += o;
    }
    function c(i) {
      const o = r.value;
      if (!o) return;
      const u = o.getBoundingClientRect(), b = 100;
      if (i > u.right - b) {
        const j = Math.min(1, Math.max(0.1, (i - (u.right - b)) / b));
        le = Math.round(j * 20), H();
      } else if (i < u.left + b) {
        const j = Math.min(1, Math.max(0.1, (u.left + b - i) / b));
        le = -Math.round(j * 20), H();
      } else
        N();
    }
    function h(i) {
      c(i.clientX);
    }
    function y(i, o, u) {
      oe(), O.value = o, ue.value = u, i.dataTransfer && (i.dataTransfer.effectAllowed = "move", i.dataTransfer.setData(gt, o.full_name), i.dataTransfer.setData("text/plain", `${o.full_name}:${u || "uncategorized"}`)), window.addEventListener("wheel", p, { passive: !1 });
    }
    function ee() {
      O.value = null, ue.value = null, J.value = null, N(), window.removeEventListener("wheel", p);
    }
    function qe(i, o) {
      !d.active || !O.value && !Array.from(i.dataTransfer?.types || []).includes(gt) || (i.preventDefault(), i.dataTransfer && (i.dataTransfer.dropEffect = "move"), J.value = o);
    }
    function rt(i, o) {
      const u = i.currentTarget;
      u && i.relatedTarget instanceof Node && u.contains(i.relatedTarget) || J.value === o && (J.value = null);
    }
    async function ut(i, o) {
      i.preventDefault();
      const u = O.value?.full_name || Gt(i.dataTransfer);
      ee(), !(!d.active || !u) && await z.moveRepoToList(u, o === "uncategorized" ? V.UNCAT : o);
    }
    function nt(i) {
      Tt.open(i.full_name, void 0, i);
    }
    function _t(i) {
      window.open(i, "_blank", "noopener,noreferrer");
    }
    function ct(i) {
      if (!i) return "";
      try {
        const o = new Date(i);
        return `${o.getFullYear()}-${String(o.getMonth() + 1).padStart(2, "0")}-${String(o.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return Ze(() => {
      window.addEventListener("pointerdown", De), window.addEventListener("keydown", ke);
    }), et(() => {
      N(), window.removeEventListener("wheel", p), window.removeEventListener("pointerdown", De), window.removeEventListener("keydown", ke);
    }), (i, o) => (s(), a("div", ao, [
      e("section", {
        class: F(["default-shelf-area", { "is-collapsed": g.value, "drop-active": J.value === "uncategorized" }]),
        "data-gh-list-drop": t(V).UNCAT,
        onDragover: o[6] || (o[6] = (u) => qe(u, "uncategorized")),
        onDragleave: o[7] || (o[7] = (u) => rt(u, "uncategorized")),
        onDrop: o[8] || (o[8] = (u) => ut(u, "uncategorized"))
      }, [
        e("header", io, [
          e("div", ro, [
            o[26] || (o[26] = e("span", { class: "shelf-icon" }, "📁", -1)),
            o[27] || (o[27] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", uo, n(t(z).filteredUncatRepos.length), 1),
            o[28] || (o[28] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消本地分组归属；单排 10 个一页）", -1))
          ]),
          e("div", co, [
            t(z).filteredUncatRepos.length > t(ce).pageSize ? (s(), a("div", po, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(z).uncatPage <= 1,
                title: "上一页",
                onClick: o[0] || (o[0] = //@ts-ignore
                (...u) => t(z).prevUncatPage && t(z).prevUncatPage(...u))
              }, "‹", 8, ho),
              e("span", go, n(t(z).uncatPage) + " / " + n(t(z).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(z).uncatPage >= t(z).uncatTotalPages,
                title: "下一页",
                onClick: o[1] || (o[1] = //@ts-ignore
                (...u) => t(z).nextUncatPage && t(z).nextUncatPage(...u))
              }, "›", 8, mo)
            ])) : C("", !0),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              title: "刷新 Star 列表",
              disabled: m.value,
              "aria-busy": m.value,
              onClick: o[2] || (o[2] = (u) => t(V).refreshRepositories())
            }, [
              e("span", {
                class: F({ spinning: m.value })
              }, "🔄", 2),
              e("span", null, n(m.value ? "读取中…" : "刷新"), 1)
            ], 8, fo),
            t(z).filteredUncatRepos.length ? (s(), a("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: g.value ? "展开托盘" : "收起托盘",
              onClick: v
            }, n(g.value ? "展开 ▼" : "收起 ▲"), 9, bo)) : C("", !0)
          ])
        ]),
        f.value ? me((s(), a("div", vo, [
          (s(), a(B, null, q(6, (u) => e("div", {
            key: "skel-shelf-" + u,
            class: "repo gh-card shelf-card skel-card"
          }, [...o[29] || (o[29] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ], 512)), [
          [Xe, !g.value]
        ]) : t(z).filteredUncatRepos.length ? me((s(), a("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: l,
          class: "shelf-cards-scroll",
          onWheel: G
        }, [
          (s(!0), a(B, null, q(t(z).pagedUncatRepos, (u) => (s(), a("article", {
            key: u.full_name,
            class: F(["repo gh-card shelf-card", { "card-dragging": O.value?.full_name === u.full_name }]),
            draggable: "true",
            onClick: (b) => nt(u),
            onDragstart: (b) => y(b, u, null),
            onDragend: ee,
            onContextmenu: (b) => he(b, u, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: Q((b) => he(b, u, null), ["stop"])
            }, "⋮", 8, wo),
            e("div", _o, [
              e("img", {
                class: "gh-owner-avatar",
                src: u.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: o[3] || (o[3] = (b) => b.target.src = "assets/github-star.svg")
              }, null, 40, ko),
              e("a", {
                href: u.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: u.full_name,
                onClick: o[4] || (o[4] = Q(() => {
                }, ["stop"]))
              }, [
                e("span", Co, n(u.owner?.login || u.full_name.split("/")[0]) + "/", 1),
                te(n(u.name), 1)
              ], 8, $o)
            ]),
            e("div", Go, [
              e("div", To, [
                o[30] || (o[30] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                u.topics && u.topics.length ? (s(), a(B, { key: 0 }, [
                  (s(!0), a(B, null, q(u.topics.slice(0, 2), (b) => (s(), a("span", {
                    key: b,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + b
                  }, " #" + n(b), 9, So))), 128)),
                  u.topics.length > 2 ? (s(), a("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: u.topics.slice(2).map((b) => "#" + b).join(" ")
                  }, " +" + n(u.topics.length - 2), 9, Mo)) : C("", !0)
                ], 64)) : C("", !0)
              ]),
              e("p", {
                class: "desc",
                title: u.description || ""
              }, n(u.description || "暂无描述"), 9, Ro)
            ]),
            e("div", Lo, [
              e("span", xo, "★ " + n(u.stargazers_count), 1),
              u.language ? (s(), a("span", Do, n(u.language), 1)) : C("", !0),
              e("span", Ao, "更新 " + n(ct(u.updated_at)), 1)
            ])
          ], 42, yo))), 128)),
          t(z).uncatPage < t(z).uncatTotalPages ? (s(), a("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: o[5] || (o[5] = //@ts-ignore
            (...u) => t(z).nextUncatPage && t(z).nextUncatPage(...u))
          }, [
            e("div", Ho, [
              o[31] || (o[31] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              o[32] || (o[32] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", Uo, n(t(z).uncatPage + 1) + " / " + n(t(z).uncatTotalPages) + " 页", 1)
            ])
          ])) : C("", !0)
        ], 544)), [
          [Xe, !g.value]
        ]) : g.value ? C("", !0) : (s(), a("p", Po, n(t(de).searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库"), 1))
      ], 42, lo),
      $.value ? (s(), a("div", Eo, [
        e("button", {
          type: "button",
          class: "gh-drilldown-back-btn",
          title: "返回查看全部一级分组 (Esc)",
          onClick: o[9] || (o[9] = (u) => $.value = null)
        }, " ‹ 返回全部 "),
        o[33] || (o[33] = e("span", { class: "gh-drilldown-sep" }, "/", -1)),
        e("span", Io, "📁 " + n($.value), 1),
        e("span", No, " (含 " + n(D.value) + " 个子分组) ", 1),
        e("button", {
          type: "button",
          class: "gh-drilldown-exit-btn",
          title: "退出下钻视图",
          onClick: o[10] || (o[10] = (u) => $.value = null)
        }, " ✕ ")
      ])) : C("", !0),
      e("div", {
        ref_key: "boardViewportRef",
        ref: r,
        class: "board-viewport",
        onWheel: Ve,
        onDragover: h
      }, [
        m.value && !Z.value.length ? (s(), a("div", jo, [
          (s(), a(B, null, q(4, (u) => e("div", {
            key: "skel-col-" + u,
            class: "board-column skel-column"
          }, [
            o[35] || (o[35] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", Fo, [
              (s(), a(B, null, q(3, (b) => e("div", {
                key: "skel-col-card-" + b,
                class: "repo gh-card skel-card"
              }, [...o[34] || (o[34] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (s(), a("div", Oo, [
          (s(!0), a(B, null, q(Z.value, (u) => (s(), a("section", {
            key: u.id,
            class: F(["board-column list-column", {
              "drop-active": J.value === u.name,
              "col-dragging": W.value === u.id,
              "col-hover-target": k.value === u.id
            }]),
            "data-gh-list-drop": u.name,
            onDragover: (b) => O.value ? qe(b, u.name) : tt(b, u.id),
            onDragleave: (b) => O.value ? rt(b, u.name) : Oe(b, u.id),
            onDrop: (b) => O.value ? ut(b, u.name) : st(b, u.id)
          }, [
            e("header", {
              class: "column-header",
              title: R(u.name) ? `📁 ${u.name}（包含 ${A(u.name).length} 个子分组，点击下钻进入）` : "拖动此列可调换位置；右侧更多可重命名、置顶或删除"
            }, [
              e("div", {
                class: F(["column-title-group", { "is-parent-folder": R(u.name) && !$.value }]),
                onClick: (b) => R(u.name) && !$.value && L(u.name)
              }, [
                o[36] || (o[36] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: F(["column-title", { "title-clickable": R(u.name) && !$.value }]),
                  title: u.description || "本地分组: " + u.name
                }, " 📁 " + n(u.name), 11, Yo),
                u.pinned ? (s(), a("span", Vo, "📌")) : C("", !0),
                e("span", qo, n(t(z).getReposForList(u.name).length), 1),
                R(u.name) && !$.value ? (s(), a("span", Ko, n(A(u.name).length) + "个子分组 › ", 1)) : C("", !0)
              ], 10, Bo),
              e("div", Xo, [
                e("button", {
                  type: "button",
                  class: "col-more-btn col-drag-handle",
                  title: "按住拖动可调换分组位置；点击打开更多操作",
                  draggable: "true",
                  "aria-label": "分组操作与拖拽手柄",
                  onDragstart: (b) => X(b, u),
                  onDragend: Le,
                  onClick: Q((b) => ie(b, u), ["stop"])
                }, "⋮", 40, Qo)
              ])
            ], 8, zo),
            e("div", Jo, [
              (s(!0), a(B, null, q(t(z).getReposForList(u.name), (b) => (s(), a("article", {
                key: b.full_name,
                class: F(["repo gh-card", { "card-dragging": O.value?.full_name === b.full_name }]),
                draggable: "true",
                onClick: (j) => nt(b),
                onDragstart: (j) => y(j, b, u.name),
                onDragend: ee,
                onContextmenu: (j) => he(j, b, u.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: Q((j) => he(j, b, u.name), ["stop"])
                }, "⋮", 8, en),
                e("div", tn, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: b.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: o[11] || (o[11] = (j) => j.target.src = "assets/github-star.svg")
                  }, null, 40, sn),
                  e("a", {
                    href: b.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: b.full_name,
                    onClick: o[12] || (o[12] = Q(() => {
                    }, ["stop"]))
                  }, [
                    e("span", nn, n(b.owner?.login || b.full_name.split("/")[0]) + "/", 1),
                    te(n(b.name), 1)
                  ], 8, on)
                ]),
                e("div", an, [
                  e("div", ln, [
                    e("span", {
                      class: "gh-badge-folder",
                      title: "属于列表: " + u.name
                    }, [
                      te(" 📁 " + n(u.name) + " ", 1),
                      e("span", {
                        class: "btn-inline-remove",
                        title: "从该列表中移出",
                        role: "button",
                        tabindex: "0",
                        onClick: Q((j) => t(z).removeRepoFromList(b.full_name, u.name), ["stop"])
                      }, "×", 8, un)
                    ], 8, rn),
                    b.topics && b.topics.length ? (s(), a(B, { key: 0 }, [
                      (s(!0), a(B, null, q(b.topics.slice(0, 2), (j) => (s(), a("span", {
                        key: j,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + j
                      }, " #" + n(j), 9, cn))), 128)),
                      b.topics.length > 2 ? (s(), a("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: b.topics.slice(2).map((j) => "#" + j).join(" ")
                      }, " +" + n(b.topics.length - 2), 9, dn)) : C("", !0)
                    ], 64)) : C("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: b.description || ""
                  }, n(b.description || "暂无描述"), 9, pn)
                ]),
                e("div", hn, [
                  e("span", gn, "★ " + n(b.stargazers_count), 1),
                  b.language ? (s(), a("span", mn, n(b.language), 1)) : C("", !0),
                  e("span", fn, "更新 " + n(ct(b.updated_at)), 1)
                ])
              ], 42, Zo))), 128)),
              t(z).getReposForList(u.name).length ? C("", !0) : (s(), a("div", bn, [...o[37] || (o[37] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, Wo))), 128)),
          e("section", vn, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              title: $.value ? `在「${$.value}」下新建子分组` : "新建本地分组",
              onClick: E
            }, [
              o[38] || (o[38] = e("span", { class: "plus-icon" }, "＋", -1)),
              e("span", null, n($.value ? `新建 ${$.value} 子分组` : "新建本地分组"), 1)
            ], 8, yn)
          ])
        ]))
      ], 544),
      (s(), ge(it, { to: "body" }, [
        K.visible && K.repo ? (s(), a("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Qe({ left: `${K.x}px`, top: `${K.y}px` }),
          onClick: o[22] || (o[22] = Q(() => {
          }, ["stop"])),
          onContextmenu: o[23] || (o[23] = Q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: F(["gh-menu-has-sub", { "is-active": re.value === "folder" }]),
            onMouseenter: o[15] || (o[15] = (u) => re.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: o[13] || (o[13] = Q((u) => re.value = re.value === "folder" ? null : "folder", ["stop"]))
            }, [...o[39] || (o[39] = [
              e("span", null, "移动/加入本地分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: F(["gh-sub-flyout", { "flyout-left": _e.value }]),
              onClick: o[14] || (o[14] = Q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: We
              }, " 设为未分类 "),
              (s(!0), a(B, null, q(t(z).lists, (u) => (s(), a("button", {
                key: u.id,
                class: F(["fo-cover-menu-item", { primary: t(Je)(K.repo.full_name).includes(u.name) }]),
                type: "button",
                onClick: (b) => ot(u.name)
              }, n(t(Je)(K.repo.full_name).includes(u.name) ? "✓ " : "  ") + "📁 " + n(u.name), 11, wn))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: o[16] || (o[16] = (u) => re.value = null),
            onClick: o[17] || (o[17] = (u) => nt(K.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: o[18] || (o[18] = (u) => re.value = null),
            onClick: ze
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: o[19] || (o[19] = (u) => re.value = null),
            onClick: xe
          }, " 复制克隆命令 (git clone) ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: o[20] || (o[20] = (u) => re.value = null),
            onClick: Be
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: o[21] || (o[21] = (u) => re.value = null),
            onClick: Ye
          }, " 在 GitHub 打开 ", 32)
        ], 36)) : C("", !0),
        U.visible && U.list ? (s(), a("div", {
          key: 1,
          class: "fo-cover-context-menu gh-list-col-menu",
          style: Qe({ left: `${U.x}px`, top: `${U.y}px` }),
          onClick: o[24] || (o[24] = Q(() => {
          }, ["stop"])),
          onContextmenu: o[25] || (o[25] = Q(() => {
          }, ["prevent"]))
        }, [
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: pe
          }, " ✏️ 重命名分组 "),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: fe
          }, [
            e("span", null, n(U.list?.pinned ? "📍 取消置顶" : "📌 置顶此分组"), 1)
          ]),
          e("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onClick: be
          }, " 🗑️ 删除分组 ")
        ], 36)) : C("", !0)
      ]))
    ]));
  }
}), kn = /* @__PURE__ */ Re(_n, [["__scopeId", "data-v-596b48e6"]]);
function $n(w) {
  const d = w.subject?.url, r = w.repository?.html_url || "https://github.com";
  if (!d) return r;
  const l = w.subject?.type;
  return l === "Issue" ? d.replace("https://api.github.com/repos/", "https://github.com/") : l === "PullRequest" ? d.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : l === "Release" ? d.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : d.replace("https://api.github.com/repos/", "https://github.com/");
}
function Cn(w) {
  try {
    const d = Date.now() - new Date(w).getTime();
    if (d < 6e4) return "刚刚";
    const r = Math.floor(d / 6e4);
    if (r < 60) return `${r} 分钟前`;
    const l = Math.floor(r / 60);
    if (l < 24) return `${l} 小时前`;
    const g = Math.floor(l / 24);
    return g < 30 ? `${g} 天前` : w.slice(5, 10);
  } catch {
    return "";
  }
}
const P = we({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), Ge = {
  open() {
    P.isOpen = !0, (!P.items.length || Date.now() - P.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    P.isOpen = !1;
  },
  toggle() {
    P.isOpen ? this.close() : this.open();
  },
  setTab(w) {
    P.activeKind = w;
  },
  async refresh() {
    const w = V.token?.trim();
    if (!w) {
      P.items = [], P.unreadCount = 0, P.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    P.loading = !0, P.error = "";
    try {
      const d = {
        ...Fe(w),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, r = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: d
      });
      if (!r.ok)
        throw r.status === 401 ? new Error("GitHub Token 无效或已过期") : r.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${r.status})`);
      const l = await r.json();
      if (!Array.isArray(l))
        throw new Error("GitHub 返回数据异常");
      const g = l.map((v) => ({
        id: String(v.id),
        unread: !!v.unread,
        reason: String(v.reason || ""),
        updatedAt: v.updated_at,
        formattedTime: Cn(v.updated_at),
        subject: {
          title: String(v.subject?.title || "未命名通知"),
          url: String(v.subject?.url || ""),
          type: String(v.subject?.type || "Issue"),
          latestCommentUrl: v.subject?.latest_comment_url
        },
        repository: {
          id: Number(v.repository?.id || 0),
          name: String(v.repository?.name || ""),
          fullName: String(v.repository?.full_name || ""),
          owner: {
            login: String(v.repository?.owner?.login || ""),
            avatarUrl: v.repository?.owner?.avatar_url
          },
          htmlUrl: String(v.repository?.html_url || "")
        },
        url: String(v.url || ""),
        htmlUrl: $n(v)
      }));
      P.items = g, P.unreadCount = g.filter((v) => v.unread).length, P.lastFetchedAt = Date.now();
    } catch (d) {
      console.warn("[GitHubNotifications] 读取失败:", d), P.error = d?.message || "网络请求异常";
    } finally {
      P.loading = !1;
    }
  },
  openTarget(w) {
    typeof window < "u" && window.open(w.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, _ = we({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function Ne(w) {
  try {
    const d = Date.now() - new Date(w).getTime(), r = Math.floor(d / 6e4);
    if (r < 1) return "刚刚";
    if (r < 60) return `${r}分钟前`;
    const l = Math.floor(r / 60);
    if (l < 24) return `${l}小时前`;
    const g = Math.floor(l / 24);
    if (g < 30) return `${g}天前`;
    const v = new Date(w);
    return `${v.getFullYear()}/${v.getMonth() + 1}/${v.getDate()}`;
  } catch {
    return "";
  }
}
function je(w) {
  switch (w) {
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
function Gn(w) {
  return w ? {
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
  }[w] || (w.startsWith(":") && w.endsWith(":") ? w.slice(1, -1) : w) : "";
}
function at(w) {
  if (!Array.isArray(w)) return [];
  const d = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return w.map((r) => ({
    emoji: d[r.content] || r.content,
    count: r.reactors?.totalCount || r.users?.totalCount || 0
  })).filter((r) => r.count > 0);
}
function bt(w) {
  if (!w || typeof w != "object") return [];
  const d = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, r = [];
  for (const [l, g] of Object.entries(d)) {
    const v = Number(w[l] || 0);
    v > 0 && r.push({ emoji: g, count: v });
  }
  return r;
}
async function vt(w, d) {
  if (!w) return "";
  try {
    const r = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...Fe(d),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: w, mode: "gfm" })
    });
    if (r.ok)
      return await r.text();
  } catch {
  }
  return ye.renderMarkdown(w);
}
async function Tn(w, d, r, l) {
  const g = `
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
    const v = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...Fe(l),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: g,
        variables: { owner: w, name: d, num: r }
      })
    });
    if (!v.ok) return null;
    const m = (await v.json())?.data?.repository?.discussion;
    if (!m) return null;
    let f = 0;
    const $ = (m.comments?.nodes || []).map((A) => {
      const R = A.replies?.nodes || [];
      f += R.length;
      const D = R.map((L) => ({
        id: L.id,
        author: {
          login: L.author?.login || "匿名",
          avatarUrl: L.author?.avatarUrl || "",
          association: je(L.authorAssociation)
        },
        createdAt: L.createdAt,
        formattedTime: Ne(L.createdAt),
        body: L.body || "",
        bodyHtml: L.bodyHTML || (L.body ? ye.renderMarkdown(L.body) : ""),
        reactions: at(L.reactionGroups)
      }));
      return {
        id: A.id,
        author: {
          login: A.author?.login || "匿名",
          avatarUrl: A.author?.avatarUrl || "",
          association: je(A.authorAssociation)
        },
        createdAt: A.createdAt,
        formattedTime: Ne(A.createdAt),
        body: A.body || "",
        bodyHtml: A.bodyHTML || (A.body ? ye.renderMarkdown(A.body) : "<p>（评论内容为空）</p>"),
        reactions: at(A.reactionGroups),
        replies: D
      };
    }), x = m.body || "", M = m.bodyHTML && m.bodyHTML.trim().length > 10 ? m.bodyHTML : x ? ye.renderMarkdown(x) : "<p>（主贴内容为空）</p>";
    return {
      title: m.title,
      number: r,
      state: "discussion",
      category: m.category ? {
        name: m.category.name,
        emoji: Gn(m.category.emoji)
      } : void 0,
      author: {
        login: m.author?.login || "未知",
        avatarUrl: m.author?.avatarUrl || "",
        association: je(m.authorAssociation)
      },
      createdAt: m.createdAt,
      formattedTime: Ne(m.createdAt),
      body: x,
      bodyHtml: M,
      htmlUrl: m.url,
      commentsCount: m.comments?.totalCount || $.length,
      totalRepliesCount: f,
      comments: $,
      reactions: at(m.reactionGroups)
    };
  } catch {
    return null;
  }
}
const lt = {
  async open(w) {
    _.isOpen = !0, _.loading = !0, _.error = "", _.data = null, _.notificationItem = w;
    const d = V.token?.trim() || "", r = {
      ...Fe(d),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const l = w.subject?.url, g = w.subject?.type, v = w.repository?.fullName || "", [G, m] = v.split("/"), f = l?.match(/\/(\d+)$/), $ = f ? Number(f[1]) : void 0;
      if (g === "Discussion" && G && m && $) {
        const x = await Tn(G, m, $, d);
        if (x) {
          _.data = {
            notificationId: w.id,
            title: x.title || w.subject.title,
            number: $,
            state: "discussion",
            category: x.category,
            author: x.author || { login: w.repository.owner.login, avatarUrl: w.repository.owner.avatarUrl || "" },
            createdAt: x.createdAt || w.updatedAt,
            formattedTime: x.formattedTime || w.formattedTime,
            body: x.body || "",
            bodyHtml: x.bodyHtml || (x.body ? ye.renderMarkdown(x.body) : ""),
            htmlUrl: x.htmlUrl || w.htmlUrl,
            commentsCount: x.commentsCount || 0,
            totalRepliesCount: x.totalRepliesCount || 0,
            comments: x.comments || [],
            reactions: x.reactions || [],
            repositoryFullName: v,
            type: "Discussion"
          };
          return;
        }
      }
      if (l) {
        const x = await fetch(l, { headers: r, cache: "no-store" });
        if (x.ok) {
          const M = await x.json();
          let A = [];
          if (M.comments_url && M.comments > 0)
            try {
              const L = await fetch(`${M.comments_url}?per_page=50`, { headers: r, cache: "no-store" });
              if (L.ok) {
                const Z = await L.json();
                Array.isArray(Z) && (A = await Promise.all(
                  Z.map(async (E) => {
                    const O = E.body_html || (E.body ? await vt(E.body, d) : "");
                    return {
                      id: E.id,
                      author: {
                        login: E.user?.login || "匿名",
                        avatarUrl: E.user?.avatar_url || "",
                        association: je(E.author_association)
                      },
                      createdAt: E.created_at,
                      formattedTime: Ne(E.created_at),
                      body: E.body || "",
                      bodyHtml: O,
                      reactions: bt(E.reactions)
                    };
                  })
                ));
              }
            } catch (L) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", L);
            }
          const R = M.body || "";
          let D = M.body_html || "";
          !D && R && (D = await vt(R, d)), !D && R && (D = ye.renderMarkdown(R)), _.data = {
            notificationId: w.id,
            title: M.title || M.name || w.subject.title,
            number: M.number || $,
            state: M.merged ? "merged" : M.state || M.conclusion || "open",
            author: {
              login: M.user?.login || M.author?.login || w.repository.owner.login,
              avatarUrl: M.user?.avatar_url || M.author?.avatar_url || w.repository.owner.avatarUrl || "",
              association: je(M.author_association)
            },
            createdAt: M.created_at || M.published_at || w.updatedAt,
            formattedTime: Ne(M.created_at || M.published_at || w.updatedAt),
            body: R,
            bodyHtml: D || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: M.html_url || w.htmlUrl,
            commentsCount: typeof M.comments == "number" ? M.comments : A.length,
            comments: A,
            reactions: bt(M.reactions),
            repositoryFullName: v,
            type: g || "Issue"
          };
          return;
        }
      }
      _.data = {
        notificationId: w.id,
        title: w.subject.title,
        number: $,
        state: "open",
        author: {
          login: w.repository.owner.login,
          avatarUrl: w.repository.owner.avatarUrl || ""
        },
        createdAt: w.updatedAt,
        formattedTime: w.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: w.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: v,
        type: g || "通知"
      };
    } catch (l) {
      console.warn("[GitHubNotificationDetail] 读取异常:", l), _.error = l?.message || "网络请求异常";
    } finally {
      _.loading = !1;
    }
  },
  close() {
    _.isOpen = !1, _.data = null, _.error = "";
  }
}, Sn = { class: "vue-gh-notification-panel-wrapper" }, Mn = { class: "gh-msg-header" }, Rn = { class: "gh-msg-account" }, Ln = { class: "gh-msg-subtitle" }, xn = {
  class: "gh-msg-tabs",
  role: "tablist"
}, Dn = ["onClick"], An = { class: "gh-msg-list" }, Hn = {
  key: 0,
  class: "gh-msg-loading"
}, Un = {
  key: 1,
  class: "gh-msg-error"
}, Pn = {
  key: 2,
  class: "gh-msg-empty"
}, En = ["onClick"], In = { class: "gh-card-indicator-col" }, Nn = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, jn = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, Fn = { class: "gh-card-type-col" }, On = ["title"], Wn = { class: "gh-card-main-col" }, zn = { class: "gh-card-repo-row" }, Bn = ["title"], Yn = { class: "gh-card-reason-tag" }, Vn = { class: "gh-card-time" }, qn = ["title"], Kn = { class: "gh-card-footer-row" }, Xn = { class: "gh-card-type-label" }, Qn = ["onClick"], Jn = /* @__PURE__ */ Me({
  __name: "GitHubNotificationPanel",
  setup(w) {
    const d = I(null), r = se(() => [
      { kind: "all", label: "所有", count: P.items.length },
      { kind: "unread", label: "未读", count: P.items.filter((R) => R.unread).length },
      { kind: "mention", label: "提及", count: P.items.filter((R) => R.reason === "mention").length },
      { kind: "author", label: "作者", count: P.items.filter((R) => R.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: P.items.filter((R) => R.reason === "ci_activity" || R.subject.type === "CheckSuite").length }
    ]), l = se(() => {
      const R = P.items;
      switch (P.activeKind) {
        case "unread":
          return R.filter((D) => D.unread);
        case "mention":
          return R.filter((D) => D.reason === "mention");
        case "author":
          return R.filter((D) => D.reason === "author");
        case "ci":
          return R.filter((D) => D.reason === "ci_activity" || D.subject.type === "CheckSuite");
        default:
          return R;
      }
    });
    function g(R, D) {
      if (D === "ci_activity" || R === "CheckSuite")
        return "⚡";
      switch (R) {
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
    function v(R) {
      switch (R) {
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
          return R || "通知";
      }
    }
    function G() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function m() {
      Ge.refresh();
    }
    function f() {
      Ge.close();
    }
    function $(R) {
      lt.open(R);
    }
    function x(R) {
      Ge.openTarget(R);
    }
    function M(R) {
      if (!P.isOpen) return;
      const D = R.target;
      !d.value?.contains(D) && !D?.closest("#gh-header-msg-center-btn") && Ge.close();
    }
    function A(R) {
      R.key === "Escape" && P.isOpen && Ge.close();
    }
    return Ze(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", M), window.addEventListener("keydown", A));
    }), et(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", M), window.removeEventListener("keydown", A));
    }), (R, D) => (s(), a("div", Sn, [
      t(P).isOpen ? (s(), a("section", {
        key: 0,
        ref_key: "panelRef",
        ref: d,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: D[0] || (D[0] = Q(() => {
        }, ["stop"]))
      }, [
        e("header", Mn, [
          e("div", Rn, [
            D[2] || (D[2] = e("div", { class: "gh-msg-octo-avatar" }, [
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
              D[1] || (D[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", Ln, " 共 " + n(t(P).items.length) + " 条通知 · " + n(t(P).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          D[3] || (D[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: G
          }, " ↗ "),
          e("button", {
            type: "button",
            class: F(["gh-panel-btn", { "is-spinning": t(P).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: m
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: f
          }, " ✕ ")
        ]),
        e("nav", xn, [
          (s(!0), a(B, null, q(r.value, (L) => (s(), a("button", {
            key: L.kind,
            type: "button",
            class: F(["gh-msg-tab", { active: t(P).activeKind === L.kind }]),
            onClick: (Z) => t(P).activeKind = L.kind
          }, [
            te(n(L.label) + " ", 1),
            L.count > 0 ? (s(), a("span", {
              key: 0,
              class: F(["gh-tab-pill", { "is-unread-pill": L.kind === "unread" }])
            }, n(L.count), 3)) : C("", !0)
          ], 10, Dn))), 128))
        ]),
        e("div", An, [
          t(P).loading && !t(P).items.length ? (s(), a("div", Hn, [...D[4] || (D[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(P).error ? (s(), a("div", Un, [
            D[5] || (D[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, n(t(P).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: m
            }, "重试")
          ])) : l.value.length === 0 ? (s(), a("div", Pn, [...D[6] || (D[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (s(!0), a(B, { key: 3 }, q(l.value, (L) => (s(), a("article", {
            key: L.id,
            class: F(["gh-notification-card", { "is-unread": L.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (Z) => $(L)
          }, [
            e("div", In, [
              L.unread ? (s(), a("span", Nn)) : (s(), a("span", jn))
            ]),
            e("div", Fn, [
              e("span", {
                class: "gh-type-badge",
                title: L.subject.type
              }, n(g(L.subject.type, L.reason)), 9, On)
            ]),
            e("div", Wn, [
              e("div", zn, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: L.repository.fullName
                }, n(L.repository.fullName), 9, Bn),
                e("span", Yn, n(v(L.reason)), 1),
                e("time", Vn, n(L.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: L.subject.title
              }, n(L.subject.title), 9, qn),
              e("div", Kn, [
                e("span", Xn, n(L.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: Q((Z) => x(L), ["stop"])
                }, "在网页打开 ↗", 8, Qn)
              ])
            ])
          ], 10, En))), 128))
        ])
      ], 512)) : C("", !0)
    ]));
  }
}), Zn = /* @__PURE__ */ Re(Jn, [["__scopeId", "data-v-9a98e294"]]), ea = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, ta = ["aria-label"], sa = { class: "gh-modal-title-wrap" }, oa = { class: "gh-modal-octo-icon" }, na = ["href"], aa = { class: "gh-owner" }, la = { class: "gh-name" }, ia = {
  key: 1,
  class: "gh-modal-repo-name"
}, ra = { class: "gh-name" }, ua = { class: "gh-modal-actions" }, ca = { class: "gh-modal-content" }, da = {
  key: 0,
  class: "gh-content-loading"
}, pa = {
  key: 1,
  class: "gh-content-error"
}, ha = { class: "gh-discussion-title-header" }, ga = { class: "gh-discussion-h1" }, ma = {
  key: 0,
  class: "gh-discussion-num"
}, fa = { class: "gh-discussion-sub-meta" }, ba = {
  key: 0,
  class: "gh-category-pill"
}, va = {
  key: 0,
  class: "cat-emoji"
}, ya = {
  key: 1,
  class: "gh-category-pill"
}, wa = { class: "gh-sub-author" }, _a = { class: "gh-sub-verb" }, ka = {
  key: 2,
  class: "gh-sub-comments-count"
}, $a = { class: "gh-op-post-card" }, Ca = { class: "gh-op-post-head" }, Ga = { class: "gh-op-author-left" }, Ta = ["src"], Sa = { class: "gh-op-meta" }, Ma = { class: "gh-op-name-row" }, Ra = { class: "gh-op-name" }, La = {
  key: 0,
  class: "gh-role-pill"
}, xa = { class: "gh-op-time" }, Da = ["innerHTML"], Aa = {
  key: 0,
  class: "gh-reactions-bar"
}, Ha = { class: "rx-emoji" }, Ua = { class: "rx-count" }, Pa = {
  key: 0,
  class: "gh-comments-block"
}, Ea = { class: "gh-comments-header" }, Ia = { class: "gh-comments-count-pill" }, Na = { class: "gh-comments-feed" }, ja = { class: "gh-comment-head" }, Fa = ["src"], Oa = { class: "gh-comment-meta" }, Wa = { class: "gh-comment-author" }, za = {
  key: 0,
  class: "gh-role-pill small"
}, Ba = { class: "gh-comment-time" }, Ya = ["innerHTML"], Va = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, qa = { class: "rx-emoji" }, Ka = { class: "rx-count" }, Xa = {
  key: 1,
  class: "gh-comment-replies-thread"
}, Qa = { class: "gh-replies-thread-title" }, Ja = { class: "gh-reply-head" }, Za = ["src"], el = { class: "gh-reply-meta" }, tl = { class: "gh-reply-author" }, sl = {
  key: 0,
  class: "gh-role-pill tiny"
}, ol = { class: "gh-reply-time" }, nl = ["innerHTML"], al = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, ll = { class: "rx-emoji" }, il = { class: "rx-count" }, rl = {
  key: 1,
  class: "gh-no-comments"
}, ul = /* @__PURE__ */ Me({
  __name: "GitHubNotificationDetailDrawer",
  setup(w) {
    const d = I(null), r = I(null), l = I(null);
    let g = !1, v = 0, G = 0, m = 0, f = 0, $ = () => {
    };
    const x = se(() => (_.data?.repositoryFullName || _.notificationItem?.repository.fullName || "").split("/")[0] || ""), M = se(() => {
      const H = _.data?.repositoryFullName || _.notificationItem?.repository.fullName || "";
      return H.split("/")[1] || H;
    }), A = se(() => {
      if (!_.data) return "";
      const H = _.data.bodyHtml?.trim() || "";
      if (H.length > 20) return H;
      const N = _.data.body?.trim() || "";
      return N.length > 0 ? ye.renderMarkdown(N) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), R = se(() => l.value ? {
      position: "fixed",
      left: `${l.value.x}px`,
      top: `${l.value.y}px`,
      transform: "none"
    } : {});
    ve(
      () => _.isOpen,
      (H) => {
        H && (l.value = null, dt(() => {
          r.value && (r.value.scrollTop = 0);
        }));
      }
    ), ve(
      () => _.data,
      (H) => {
        H && dt(() => {
          r.value && (r.value.scrollTop = 0);
        });
      }
    );
    function D(H) {
      if (H.target.closest("button, a, input")) return;
      $();
      const N = d.value;
      if (!N || !_.isOpen) return;
      g = !0;
      const U = N.getBoundingClientRect();
      m = U.left, f = U.top, v = H.clientX, G = H.clientY, l.value = { x: m, y: f };
      const Y = (pe) => {
        if (!g) return;
        const fe = pe.clientX - v, be = pe.clientY - G;
        l.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, m + fe)),
          y: Math.max(10, Math.min(window.innerHeight - 80, f + be))
        };
      }, ie = () => {
        g = !1, window.removeEventListener("mousemove", Y), window.removeEventListener("mouseup", ie);
      };
      $ = ie, window.addEventListener("mousemove", Y), window.addEventListener("mouseup", ie);
    }
    function L() {
      lt.close();
    }
    function Z() {
      const H = _.data?.htmlUrl || _.notificationItem?.htmlUrl;
      H && typeof window < "u" && window.open(H, "_blank", "noopener,noreferrer");
    }
    function E(H) {
      const U = H.target?.closest("a");
      U && U.href && (H.preventDefault(), H.stopPropagation(), window.open(U.href, "_blank", "noopener,noreferrer"));
    }
    function O() {
      _.notificationItem && lt.open(_.notificationItem);
    }
    function ue(H) {
      switch (H) {
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
    function J(H) {
      switch (H) {
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
          return H || "通知详情";
      }
    }
    function ae(H) {
      switch (H) {
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
          return H || "";
      }
    }
    function le(H) {
      H.key === "Escape" && _.isOpen && L();
    }
    return Ze(() => {
      St(), window.addEventListener("keydown", le);
    }), et(() => {
      window.removeEventListener("keydown", le), $();
    }), (H, N) => (s(), ge(it, { to: "body" }, [
      t(_).isOpen ? (s(), a("div", ea, [
        e("div", {
          ref_key: "windowRef",
          ref: d,
          class: "gh-nonmodal-window",
          style: Qe(R.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(_).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: D
          }, [
            e("div", sa, [
              e("span", oa, n(ue(t(_).data?.type || t(_).notificationItem?.subject.type)), 1),
              t(_).data?.htmlUrl || t(_).notificationItem?.htmlUrl ? (s(), a("a", {
                key: 0,
                href: t(_).data?.htmlUrl || t(_).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", aa, n(x.value), 1),
                N[0] || (N[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", la, n(M.value), 1),
                N[1] || (N[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, na)) : (s(), a("span", ia, [
                e("strong", ra, n(t(_).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", ua, [
              t(_).data?.state ? (s(), a("span", {
                key: 0,
                class: F(["gh-detail-state-pill", t(_).data.state])
              }, n(ae(t(_).data.state)), 3)) : C("", !0),
              t(_).data?.htmlUrl || t(_).notificationItem?.htmlUrl ? (s(), a("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: Z
              }, " 在网页打开 ↗ ")) : C("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: L
              }, " ✕ ")
            ])
          ], 32),
          e("div", ca, [
            t(_).loading ? (s(), a("div", da, [
              N[2] || (N[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + n(t(_).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(_).error ? (s(), a("div", pa, [
              N[3] || (N[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, n(t(_).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: O
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: Z
                }, "在 GitHub 打开 ↗")
              ])
            ])) : t(_).data ? (s(), a("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: r,
              class: "gh-detail-scrollable",
              onClick: E
            }, [
              e("div", ha, [
                e("h1", ga, [
                  te(n(t(_).data.title) + " ", 1),
                  t(_).data.number ? (s(), a("span", ma, "#" + n(t(_).data.number), 1)) : C("", !0)
                ]),
                e("div", fa, [
                  t(_).data.category ? (s(), a("span", ba, [
                    t(_).data.category.emoji ? (s(), a("span", va, n(t(_).data.category.emoji), 1)) : C("", !0),
                    e("span", null, n(t(_).data.category.name), 1)
                  ])) : (s(), a("span", ya, n(J(t(_).data.type)), 1)),
                  e("span", wa, n(t(_).data.author.login), 1),
                  e("span", _a, "发布于 " + n(t(_).data.formattedTime), 1),
                  t(_).data.commentsCount ? (s(), a("span", ka, [
                    te(" · " + n(t(_).data.commentsCount) + " 条讨论主题 ", 1),
                    t(_).data.totalRepliesCount ? (s(), a(B, { key: 0 }, [
                      te(" （含 " + n(t(_).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : C("", !0)
                  ])) : C("", !0)
                ])
              ]),
              e("article", $a, [
                e("div", Ca, [
                  e("div", Ga, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(_).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, Ta),
                    e("div", Sa, [
                      e("div", Ma, [
                        e("strong", Ra, n(t(_).data.author.login), 1),
                        t(_).data.author.association ? (s(), a("span", La, n(t(_).data.author.association), 1)) : C("", !0)
                      ]),
                      e("time", xa, n(t(_).data.formattedTime), 1)
                    ])
                  ]),
                  N[4] || (N[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                N[5] || (N[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: A.value
                }, null, 8, Da),
                t(_).data.reactions?.length ? (s(), a("div", Aa, [
                  (s(!0), a(B, null, q(t(_).data.reactions, (U) => (s(), a("span", {
                    key: U.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", Ha, n(U.emoji), 1),
                    e("span", Ua, n(U.count), 1)
                  ]))), 128))
                ])) : C("", !0)
              ]),
              t(_).data.comments.length ? (s(), a("div", Pa, [
                e("div", Ea, [
                  N[6] || (N[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", Ia, [
                    te(n(t(_).data.commentsCount) + " 条主题 ", 1),
                    t(_).data.totalRepliesCount ? (s(), a(B, { key: 0 }, [
                      te(" · " + n(t(_).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : C("", !0)
                  ])
                ]),
                e("div", Na, [
                  (s(!0), a(B, null, q(t(_).data.comments, (U) => (s(), a("div", {
                    key: U.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", ja, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: U.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, Fa),
                      e("div", Oa, [
                        e("span", Wa, n(U.author.login), 1),
                        U.author.association ? (s(), a("span", za, n(U.author.association), 1)) : C("", !0),
                        e("time", Ba, n(U.formattedTime), 1)
                      ])
                    ]),
                    N[7] || (N[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: U.bodyHtml
                    }, null, 8, Ya),
                    U.reactions?.length ? (s(), a("div", Va, [
                      (s(!0), a(B, null, q(U.reactions, (Y) => (s(), a("span", {
                        key: Y.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", qa, n(Y.emoji), 1),
                        e("span", Ka, n(Y.count), 1)
                      ]))), 128))
                    ])) : C("", !0),
                    U.replies?.length ? (s(), a("div", Xa, [
                      e("div", Qa, [
                        e("span", null, "💬 " + n(U.replies.length) + " 条回复对话", 1)
                      ]),
                      (s(!0), a(B, null, q(U.replies, (Y) => (s(), a("div", {
                        key: Y.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", Ja, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: Y.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, Za),
                          e("div", el, [
                            e("strong", tl, n(Y.author.login), 1),
                            Y.author.association ? (s(), a("span", sl, n(Y.author.association), 1)) : C("", !0),
                            e("time", ol, n(Y.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: Y.bodyHtml
                        }, null, 8, nl),
                        Y.reactions?.length ? (s(), a("div", al, [
                          (s(!0), a(B, null, q(Y.reactions, (ie) => (s(), a("span", {
                            key: ie.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", ll, n(ie.emoji), 1),
                            e("span", il, n(ie.count), 1)
                          ]))), 128))
                        ])) : C("", !0)
                      ]))), 128))
                    ])) : C("", !0)
                  ]))), 128))
                ])
              ])) : (s(), a("div", rl, [...N[8] || (N[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : C("", !0)
          ])
        ], 12, ta)
      ])) : C("", !0)
    ]));
  }
}), cl = /* @__PURE__ */ Re(ul, [["__scopeId", "data-v-053c788c"]]), dl = [
  {
    chapterTitle: "基础篇 · 收藏与本地分类",
    left: { tag: "第 1 篇 · 数据边界", title: "⭐ 收藏从哪里来？", badge: "先看这里", steps: [
      { icon: "🔗", title: "连接 GitHub 账号", desc: "在右上角设置填写 GitHub 用户名。Token 可选，用于读取账号收藏、提高请求额度；本地分类不需要 GitHub Lists 写权限。" },
      { icon: "📥", title: "只把收藏读取到工作台", desc: "刷新会读取 GitHub 的 Star 收藏。同账号刷新保留已有卡片，完整读取成功后再替换；网络失败时保留上次内容并提示。" },
      { icon: "💾", title: "分类只存在本机", desc: "分组、仓库归属和左栏排序保存在当前浏览器的扩展数据中，不会同步修改 GitHub 官方 Lists。", tip: "首次切换会保留本机已有列表缓存作为分组初始数据；官网原有 Lists 不会被删除或改写。" }
    ] },
    right: { tag: "第 2 篇 · 整理收藏", title: "📁 像常用网站一样整理", badge: "本地分组", steps: [
      { icon: "➕", title: "创建与打开文件夹", desc: "点击左侧分组标题右边的 +，输入名称创建本地分组。左栏每行两个图标：文件夹代表分组，独立图标代表未分组仓库。" },
      { icon: "🖱️", title: "拖动归类，边缘排序", desc: "把仓库拖到文件夹中心可加入分组，保留其他分组归属；拖到图标边缘可以调整左栏顺序。点击文件夹会打开独立、实心的无模态窗口。", tip: "分组不支持嵌套；把两个仓库图标叠放只调整顺序，不会偷偷创建分组。" },
      { icon: "↩️", title: "右键移到未分组", desc: "右键仓库图标，选择“移到未分组”，即可移除它的所有本地分组归属。删除分组只影响本地整理，不会取消 GitHub Star。" }
    ] }
  },
  {
    chapterTitle: "进阶篇 · 检索、阅读与安全边界",
    left: { tag: "第 3 篇 · 查找与阅读", title: "🔎 快速找到有用的仓库", badge: "效率技巧", steps: [
      { icon: "⌨️", title: "统一使用顶部搜索", desc: "顶部选择本地搜索后，可按仓库名称、简介、语言或主题标签筛选已读取的收藏。未分组托盘和分组看板共用这一个搜索词。" },
      { icon: "📑", title: "托盘翻页与横向看板", desc: "顶部未分组收藏保持单排，每页 10 个；使用翻页按钮浏览。下方是本地分组的多列看板，支持横向滚动及拖拽归类。" },
      { icon: "📖", title: "打开 README 详情", desc: "点击仓库图标或卡片打开详情，查看说明文档与标题目录；可读取仓库提供的中文版本。近期读过的详情有短时内存缓存。", tip: "图片由原站提供；私有、已删除或网络不可达的资源仍可能加载失败。" }
    ] },
    right: { tag: "第 4 篇 · 使用须知", title: "🛡️ 哪些操作会改变什么？", badge: "真实边界", steps: [
      { icon: "🏠", title: "本地分组不跨设备同步", desc: "不同账号分开保存；首次导入后，刷新收藏不会用官网 Lists 覆盖本地分类。清理扩展数据、卸载扩展或更换扩展 ID 可能丢失本地分组，请谨慎操作。" },
      { icon: "⚠️", title: "Star 操作与分类不同", desc: "分类不修改云端；如果你主动使用已有的 Star / 取消 Star 功能，则仍会真实修改 GitHub 收藏。创建关联任务也会通过对应任务服务执行。" },
      { icon: "❔", title: "遇到加载或拖动问题", desc: "读取失败先检查网络、Token 或请求额度，不要连续重复刷新。Esc 可取消图标拖动、收起菜单或关闭当前说明书；点击窗口外也能收起说明书。", tip: "说明书底部可切换章节，键盘左右方向键也能翻页。" }
    ] }
  }
], pl = ["inert"], hl = {
  key: 0,
  class: "muted small",
  role: "status"
}, gl = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, ml = { class: "gh-bili-layout" }, fl = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, bl = ["title"], vl = { class: "fo-sidebar-toggle-title" }, yl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, wl = ["aria-expanded", "title"], _l = { class: "fo-sidebar-toggle-chevron" }, kl = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, $l = { class: "fo-sidebar-sub-wrap" }, Cl = ["title"], Gl = { class: "fo-sidebar-sub-main" }, Tl = { class: "fo-sidebar-sub-text" }, Sl = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Ml = ["title"], Rl = { class: "fo-sidebar-sub-main" }, Ll = { class: "fo-sidebar-sub-text" }, xl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Dl = ["title"], Al = { class: "fo-sidebar-sub-main" }, Hl = { class: "fo-sidebar-sub-text" }, Ul = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Pl = ["title"], El = { class: "fo-sidebar-sub-main" }, Il = { class: "fo-sidebar-sub-text" }, Nl = { class: "gh-bili-sidebar-head" }, jl = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, Fl = { style: { color: "var(--dim)", "font-size": "9.5px" } }, Ol = ["title", "aria-label"], Wl = {
  class: "gh-bili-folder-list",
  id: "gh-folder-list"
}, zl = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, Bl = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Yl = {
  class: "card-fullscreen-gh-search gh-hero-search-box-wrap",
  id: "gh-head-search-wrap"
}, Vl = ["title"], ql = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Kl = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Xl = ["placeholder"], Ql = ["title"], Jl = { class: "gh-search-rule-icon" }, Zl = { class: "gh-search-rule-text" }, ei = ["title"], ti = ["title"], si = { class: "gh-header-msg-label" }, oi = {
  key: 0,
  class: "gh-header-msg-badge"
}, ni = { class: "gh-settings-anchor" }, ai = ["aria-expanded", "aria-label", "title"], li = {
  id: "vue-github-repositories-root",
  style: { flex: "1", "min-height": "0", display: "flex", "flex-direction": "column" }
}, ii = /* @__PURE__ */ Me({
  __name: "GitHubWorkspaceCard",
  setup(w) {
    const d = ht(() => import("./GitHubSettingsModal-CGoRYAdD.js")), r = ht(() => import("./LauncherBookGuideDialog-C1G_ik3R.js")), { active: l } = Ct("card-github", "/github.html");
    let g = 0, v = !1, G;
    const m = I(""), f = I("stars");
    ve(() => l.value && f.value === "stars", (W) => V.setAiViewActive(W), { immediate: !0, flush: "sync" });
    const $ = I(!1), x = I("local"), M = I(""), A = I(!1), R = I(!1);
    ve(l, (W) => {
      W || (R.value = !1);
    });
    const D = I(0);
    function L() {
      l.value && (A.value = !0, ++D.value);
    }
    const Z = I(!1);
    ve(A, (W) => {
      W && (Z.value = !0);
    });
    const E = I(null);
    let O = 0;
    function ue(W) {
      f.value = W, W === "trending" ? mt.switchTab("trending") : mt.switchTab("stars");
    }
    function J() {
      f.value = "stars";
    }
    const ae = se(() => [
      { id: "exact", icon: "🎯", name: T("search.rule.exact"), desc: T("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: T("search.rule.fuzzy"), desc: T("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: T("search.rule.topic"), desc: T("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: T("search.rule.smart"), desc: T("search.rule.smartDesc") }
    ]), le = I(V.searchRule || "exact"), H = se(() => ae.value.find((W) => W.id === le.value) || ae.value[0]);
    function N() {
      const W = V.cycleSearchRule();
      le.value = W;
    }
    const U = se(() => x.value === "global" ? T("github.searchGlobalPlaceholder") : T("github.searchLocalPlaceholder", { rule: H.value.name }));
    function Y() {
      clearTimeout(O), !(!l.value || x.value !== "local") && (O = window.setTimeout(() => V.setSearchQuery(M.value.trim().toLowerCase()), 180));
    }
    function ie() {
      x.value = x.value === "local" ? "global" : "local", x.value === "local" && Y();
    }
    function pe() {
      M.value = "", clearTimeout(O), V.resetLocalSearch();
    }
    function fe() {
      const W = M.value.trim();
      x.value === "local" ? (clearTimeout(O), V.setSearchQuery(W.toLowerCase())) : W && window.open(`https://github.com/search?q=${encodeURIComponent(W)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function be() {
      ++g, v = !0, m.value = "";
    }
    return ve(l, async (W) => {
      if (clearTimeout(O), !W) return;
      const k = ++g;
      if ((!G || G.signal.aborted) && (G = new AbortController(), V.setRepositoryViewSignal(G.signal)), v) {
        await V.resumeRepositoryReads();
        return;
      }
      if (V.repos.length || V.loadingAllStars || V.loadingPage) {
        v = !0;
        return;
      }
      try {
        const X = await yt();
        if (k !== g || G.signal.aborted) return;
        v = !0, await V.loadGitHub(X.ghUser, X.ghToken);
      } catch {
        if (k !== g || G?.signal.aborted) return;
        v = !1, m.value = T("github.initError");
      }
    }, { immediate: !0, flush: "sync" }), $t(() => {
      V.setAiViewActive(!1), ++g, G?.abort(), clearTimeout(O);
    }), (W, k) => (s(), a("section", {
      class: F(["card wide", { "card-fullscreen": t(At).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(l)
    }, [
      k[28] || (k[28] = e("header", { class: "card-head" }, [
        e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }),
        e("h2", null, "GitHub"),
        e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        })
      ], -1)),
      m.value ? (s(), a("p", hl, n(m.value), 1)) : C("", !0),
      e("div", gl, [
        e("div", ml, [
          e("aside", fl, [
            e("div", {
              class: F(["fo-sidebar-toggle-bar", { "is-collapsed": $.value }]),
              title: $.value ? t(T)("github.channel.toggleExpand") : t(T)("github.channel.toggleCollapse"),
              onClick: k[0] || (k[0] = (X) => $.value = !$.value)
            }, [
              e("div", vl, [
                k[13] || (k[13] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, n(t(T)("github.channel.channels")), 1),
                $.value ? (s(), a("span", yl, "3")) : C("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !$.value,
                title: $.value ? t(T)("github.expand") : t(T)("github.collapse")
              }, [
                e("span", null, n($.value ? t(T)("github.expand") : t(T)("github.collapse")), 1),
                e("span", _l, n($.value ? "▾" : "▴"), 1)
              ], 8, wl)
            ], 10, bl),
            $.value ? C("", !0) : (s(), a("div", kl, [
              e("div", $l, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: f.value === "stars" }]),
                  title: t(T)("github.channel.starsTitle"),
                  onClick: k[1] || (k[1] = (X) => ue("stars"))
                }, [
                  e("div", Gl, [
                    k[14] || (k[14] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", Tl, [
                      e("strong", null, n(t(T)("github.channel.stars")), 1),
                      e("small", null, n(t(T)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  k[15] || (k[15] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, Cl)
              ]),
              e("div", Sl, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: f.value === "trending" }]),
                  title: t(T)("github.channel.trendingTitle"),
                  onClick: k[2] || (k[2] = (X) => ue("trending"))
                }, [
                  e("div", Rl, [
                    k[16] || (k[16] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", Ll, [
                      e("strong", null, n(t(T)("github.channel.trending")), 1),
                      e("small", null, n(t(T)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  k[17] || (k[17] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, Ml)
              ]),
              e("div", xl, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: f.value === "awesome" }]),
                  title: t(T)("github.channel.awesomeTitle"),
                  onClick: k[3] || (k[3] = (X) => ue("awesome"))
                }, [
                  e("div", Al, [
                    k[18] || (k[18] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", Hl, [
                      e("strong", null, n(t(T)("github.channel.awesome")), 1),
                      e("small", null, n(t(T)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  k[19] || (k[19] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, Dl)
              ]),
              e("div", Ul, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: f.value === "repos" }]),
                  title: t(T)("github.channel.reposTitle"),
                  onClick: k[4] || (k[4] = (X) => ue("repos"))
                }, [
                  e("div", El, [
                    k[20] || (k[20] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", Il, [
                      e("strong", null, n(t(T)("github.channel.repos")), 1),
                      e("small", null, n(t(T)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  k[21] || (k[21] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, Pl)
              ])
            ])),
            e("header", Nl, [
              e("div", null, [
                e("b", jl, [
                  k[22] || (k[22] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  te(" " + n(t(T)("github.lists.title")), 1)
                ]),
                e("small", Fl, n(t(T)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: t(T)("github.lists.new"),
                "aria-label": t(T)("github.lists.new"),
                onClick: k[5] || (k[5] = (X) => t(V).promptCreateFolder())
              }, "＋", 8, Ol)
            ]),
            e("nav", Wl, [
              Ae(Lt, {
                active: t(l),
                onSelect: J
              }, null, 8, ["active"])
            ])
          ]),
          e("section", zl, [
            f.value === "stars" && t(Mt).accountConfigured === !1 ? (s(), ge(Rt, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: k[6] || (k[6] = (X) => A.value = !0)
            })) : f.value === "stars" ? (s(), a(B, { key: 1 }, [
              e("header", Bl, [
                Ae(xt, {
                  onOpenAiSettings: L,
                  onOpenGuide: k[11] || (k[11] = (X) => R.value = !0)
                }, {
                  search: pt(() => [
                    e("div", Yl, [
                      e("form", {
                        id: "gh-search-form",
                        class: "gh-search-box",
                        onSubmit: Q(fe, ["prevent"])
                      }, [
                        e("button", {
                          type: "button",
                          id: "gh-search-mode-toggle",
                          class: "gh-search-mode-toggle",
                          title: x.value === "local" ? t(T)("github.searchScope.toGlobal") : t(T)("github.searchScope.toLocal"),
                          onClick: ie
                        }, [
                          e("span", ql, n(x.value === "local" ? "⭐" : "🌐"), 1),
                          e("span", Kl, n(x.value === "local" ? t(T)("github.searchScope.local") : t(T)("github.searchScope.global")), 1),
                          k[23] || (k[23] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
                        ], 8, Vl),
                        me(e("input", {
                          id: "gh-search-input",
                          "onUpdate:modelValue": k[7] || (k[7] = (X) => M.value = X),
                          placeholder: U.value,
                          autocomplete: "off",
                          onInput: Y
                        }, null, 40, Xl), [
                          [Ie, M.value]
                        ]),
                        x.value === "local" ? (s(), a("button", {
                          key: 0,
                          type: "button",
                          class: F(["gh-search-rule-btn", `rule-${H.value.id}`]),
                          title: t(T)("github.ruleHint", { rule: H.value.name, desc: H.value.desc }),
                          onClick: Q(N, ["stop"])
                        }, [
                          e("span", Jl, n(H.value.icon), 1),
                          e("span", Zl, n(H.value.name), 1)
                        ], 10, Ql)) : C("", !0),
                        me(e("button", {
                          type: "button",
                          id: "gh-search-clear-btn",
                          class: "gh-search-clear-btn",
                          title: t(T)("github.clearSearch"),
                          onClick: pe
                        }, "✕", 8, ei), [
                          [Xe, M.value]
                        ]),
                        k[24] || (k[24] = e("button", {
                          type: "submit",
                          id: "gh-search-submit-btn",
                          title: "搜索"
                        }, "⌕", -1))
                      ], 32),
                      k[25] || (k[25] = e("div", {
                        id: "gh-search-options",
                        class: "gh-search-options",
                        "aria-label": "搜索来源",
                        hidden: ""
                      }, [
                        e("label", { title: "精确：严格用你的原关键词搜索仓库名和描述" }, [
                          e("input", {
                            type: "checkbox",
                            value: "exact",
                            checked: ""
                          }),
                          te("精确")
                        ]),
                        e("label", { title: "宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" }, [
                          e("input", {
                            type: "checkbox",
                            value: "loose"
                          }),
                          te("宽松匹配")
                        ]),
                        e("label", { title: "近义词：自动扩展相关英文词，例如 ai → llm / machine learning" }, [
                          e("input", {
                            type: "checkbox",
                            value: "related"
                          }),
                          te("近义词")
                        ]),
                        e("label", { title: "主题标签：搜索 GitHub Topics 标签，例如 topic:llm" }, [
                          e("input", {
                            type: "checkbox",
                            value: "topic"
                          }),
                          te("主题标签")
                        ]),
                        e("label", { title: "说明文档：搜索仓库 README 内容" }, [
                          e("input", {
                            type: "checkbox",
                            value: "readme"
                          }),
                          te("说明文档")
                        ])
                      ], -1)),
                      k[26] || (k[26] = e("div", {
                        id: "gh-search-suggest",
                        class: "gh-search-suggest",
                        hidden: ""
                      }, null, -1))
                    ])
                  ]),
                  "actions-prefix": pt(() => [
                    e("button", {
                      id: "gh-header-msg-center-btn",
                      class: F(["gh-header-msg-btn", { "has-unread": t(P).unreadCount > 0, "is-active": t(P).isOpen }]),
                      type: "button",
                      title: t(P).unreadCount > 0 ? t(T)("github.header.msgUnread", { count: t(P).unreadCount }) : t(T)("github.header.msgCenter"),
                      onClick: k[8] || (k[8] = (X) => t(Ge).toggle())
                    }, [
                      k[27] || (k[27] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
                      e("span", si, n(t(T)("github.header.msg")), 1),
                      t(P).unreadCount > 0 ? (s(), a("span", oi, n(t(P).unreadCount > 99 ? "99+" : t(P).unreadCount), 1)) : C("", !0)
                    ], 10, ti),
                    e("div", ni, [
                      e("button", {
                        type: "button",
                        ref_key: "settingsButton",
                        ref: E,
                        "aria-expanded": A.value,
                        "aria-label": t(T)("github.settings"),
                        class: "gh-head-settings-btn",
                        title: t(T)("github.header.settings"),
                        onClick: k[9] || (k[9] = (X) => A.value = !A.value)
                      }, " ⚙️ ", 8, ai),
                      Z.value ? (s(), ge(t(d), {
                        key: 0,
                        visible: t(l) && A.value,
                        anchor: E.value,
                        "ai-request": D.value,
                        onAccountReload: be,
                        onClose: k[10] || (k[10] = (X) => A.value = !1)
                      }, null, 8, ["visible", "anchor", "ai-request"])) : C("", !0)
                    ])
                  ]),
                  _: 1
                })
              ]),
              e("div", li, [
                Ae(kn, {
                  active: t(l) && f.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : f.value === "trending" ? (s(), ge(Dt, { key: 2 })) : f.value === "awesome" ? (s(), ge(Zt, { key: 3 })) : f.value === "repos" ? (s(), ge(no, {
              key: 4,
              active: t(l) && f.value === "repos"
            }, null, 8, ["active"])) : C("", !0)
          ])
        ])
      ]),
      R.value ? (s(), ge(t(r), {
        key: 1,
        open: R.value,
        title: "GitHub 使用手册",
        spreads: t(dl),
        "help-selector": ".gh-github-help-btn",
        onClose: k[12] || (k[12] = (X) => R.value = !1)
      }, null, 8, ["open", "spreads"])) : C("", !0),
      Ae(Zn),
      Ae(cl)
    ], 10, pl));
  }
}), vi = /* @__PURE__ */ Re(ii, [["__scopeId", "data-v-53375c13"]]);
export {
  vi as default
};
