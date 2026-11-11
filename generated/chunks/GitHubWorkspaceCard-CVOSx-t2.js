import { d as Me, o, e as i, i as e, l as ge, n as Ie, f as $, F as Y, g as K, A as F, t as r, u as t, h as Q, b as N, s as se, r as ve, w as me, B as et, x as tt, y as Qe, k as Xe, j as he, T as ut, z as Je, m as te, D as gt, K as Mt, p as Ae, H as mt, C as ft } from "./vendor-vue-9b0eS4bW.js";
import { u as Tt } from "./useCardActivity-Dgss38ox.js";
import { F as kt, H as Oe, w as ce, I as Ze, t as V, R as vt, y as Rt, v as St, D as Lt, A as Dt } from "./search.service-wriY3nvN.js";
import { A as At } from "./AccountSetupGuide-DHqCWacl.js";
import { g as Ct, G as xt, a as Et, b as bt } from "./main-CYdnt-hd.js";
import Ht from "./GitHubTrending-DTOneFJB.js";
import { _ as Te, t as M } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { s as xe } from "./storage-cache.service-BYF2zxXX.js";
import { n as yt, o as Ut } from "./view-styles-QLNzcaRQ.js";
import { m as fe } from "./core-utils-B2N4WtKx.js";
const It = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], Nt = [
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
], Pt = { class: "gh-awesome-wrapper" }, Ot = { class: "gh-awesome-header" }, Ft = { class: "gh-awesome-intro" }, jt = { class: "gh-awesome-search-box" }, Bt = { class: "gh-awesome-pills" }, Wt = ["onClick"], zt = { class: "gh-awesome-grid" }, Yt = ["onClick"], Vt = { class: "gh-awesome-card-head" }, qt = { class: "gh-awesome-card-name" }, Kt = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, Xt = { class: "gh-awesome-desc" }, Qt = { class: "gh-awesome-footer" }, Jt = { class: "gh-awesome-tags" }, Zt = ["href"], es = {
  key: 0,
  class: "gh-awesome-empty"
}, ts = /* @__PURE__ */ Me({
  __name: "GitHubAwesome",
  setup(y) {
    const a = N("all"), l = N(""), u = se(() => {
      const b = l.value.trim().toLowerCase(), G = a.value;
      return Nt.filter((m) => G === "all" || m.category === G ? b ? m.name.toLowerCase().includes(b) || m.title.toLowerCase().includes(b) || m.desc.toLowerCase().includes(b) || m.tags.some((k) => k.toLowerCase().includes(b)) : !0 : !1);
    });
    function g(b) {
      window.open(b, "_blank", "noreferrer");
    }
    return (b, G) => (o(), i("div", Pt, [
      e("header", Ot, [
        e("div", Ft, [
          G[3] || (G[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", jt, [
            ge(e("input", {
              "onUpdate:modelValue": G[0] || (G[0] = (m) => l.value = m),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [Ie, l.value]
            ]),
            l.value ? (o(), i("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: G[1] || (G[1] = (m) => l.value = "")
            }, "✕")) : $("", !0)
          ])
        ]),
        e("div", Bt, [
          (o(!0), i(Y, null, K(t(It), (m) => (o(), i("button", {
            key: m.id,
            type: "button",
            class: F(["gh-awesome-pill", { active: a.value === m.id }]),
            onClick: (f) => a.value = m.id
          }, [
            e("span", null, r(m.icon), 1),
            e("b", null, r(m.name), 1)
          ], 10, Wt))), 128))
        ])
      ]),
      e("div", zt, [
        (o(!0), i(Y, null, K(u.value, (m) => (o(), i("article", {
          key: m.id,
          class: "gh-awesome-card",
          onClick: (f) => g(m.url)
        }, [
          e("div", Vt, [
            e("div", qt, [
              e("strong", null, r(m.title), 1),
              e("small", null, r(m.name), 1)
            ]),
            e("span", Kt, "★ " + r(m.stars), 1)
          ]),
          e("p", Xt, r(m.desc), 1),
          e("div", Qt, [
            e("div", Jt, [
              (o(!0), i(Y, null, K(m.tags, (f) => (o(), i("span", {
                key: f,
                class: "gh-awesome-tag"
              }, r(f), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: m.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: G[2] || (G[2] = Q(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Zt)
          ])
        ], 8, Yt))), 128)),
        u.value.length ? $("", !0) : (o(), i("div", es, [...G[4] || (G[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), ss = /* @__PURE__ */ Te(ts, [["__scopeId", "data-v-9dc0bfaf"]]), Ee = "gh_my_repos_cache_v1", He = "gh_my_repo_groups_v2", Ue = "gh_my_repo_groups_map_v2", T = ve({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function we(y) {
  return y.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class $e {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return $e.instance || ($e.instance = new $e()), $e.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(a = !1) {
    if (!a && this.inFlightPromise)
      return this.inFlightPromise;
    a && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const l = this.abortController.signal, u = (async () => {
      await this.loadPersistedGroups();
      const g = await xe.get(Ee);
      if (g && g.length ? this.hydrateRepos(g) : T.repos.length && this.hydrateRepos(T.repos), a || !T.repos.length) {
        T.loading = !0, T.errorMessage = "";
        try {
          await this.fetchRemote(l);
        } catch (G) {
          if (G.name === "AbortError") return;
          T.errorMessage = G.message || "获取个人仓库失败";
        } finally {
          T.loading = !1;
        }
      } else
        this.fetchRemote(l).catch(() => {
        });
    })();
    return this.inFlightPromise = u.finally(() => {
      this.inFlightPromise === u && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(a) {
    const { ghUser: l, ghToken: u } = await kt();
    if (!l && !u) {
      T.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const g = Oe(u), b = [], G = /* @__PURE__ */ new Set();
    if (l)
      try {
        const f = `https://api.github.com/users/${encodeURIComponent(l)}/repos?type=owner&sort=updated&per_page=100`, k = await fetch(f, { method: "GET", headers: g, signal: a });
        if (k.ok) {
          const D = await k.json();
          if (Array.isArray(D))
            for (const R of D)
              R && R.id && !G.has(R.id) && (G.add(R.id), b.push(R));
        }
      } catch (f) {
        if (f.name === "AbortError") throw f;
      }
    if (u)
      try {
        const k = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: g, signal: a });
        if (k.ok) {
          const D = await k.json();
          if (Array.isArray(D))
            for (const R of D)
              R && R.id && !G.has(R.id) && (G.add(R.id), b.push(R));
        }
      } catch (f) {
        if (f.name === "AbortError") throw f;
      }
    if (!b.length) {
      T.repos.length || (T.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const m = b.map((f) => {
      const k = f.full_name || `${f.owner?.login || l}/${f.name}`, D = f.name, R = T.repoGroupsMap[k] || T.repoGroupsMap[D] || T.repoGroupsMap[k.toLowerCase()] || T.repoGroupsMap[D.toLowerCase()] || [];
      return {
        id: f.id,
        name: f.name,
        fullName: k,
        description: f.description || "",
        isPrivate: !!f.private,
        isFork: !!f.fork,
        htmlUrl: f.html_url || `https://github.com/${l}/${f.name}`,
        language: f.language || null,
        stargazersCount: Number(f.stargazers_count) || 0,
        forksCount: Number(f.forks_count) || 0,
        openIssuesCount: Number(f.open_issues_count) || 0,
        topics: Array.isArray(f.topics) ? f.topics.map((x) => String(x).toLowerCase()) : [],
        localGroups: R,
        updatedAt: f.updated_at || "",
        pushedAt: f.pushed_at || "",
        defaultBranch: f.default_branch || "main"
      };
    });
    this.hydrateRepos(m), await xe.set(Ee, m, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(a) {
    let l = !1;
    T.repos = a.map((u) => {
      const g = T.repoGroupsMap[u.fullName] || T.repoGroupsMap[u.name] || T.repoGroupsMap[u.fullName.toLowerCase()] || T.repoGroupsMap[u.name.toLowerCase()], b = u.localGroups && u.localGroups.length ? u.localGroups : null, G = this.inferGroupsForRepo(u, T.customGroups), m = (g && g.length ? g : null) || b || G, f = m ? [...new Set(m.filter(Boolean))] : [];
      return f.length && (!T.repoGroupsMap[u.fullName] || !T.repoGroupsMap[u.fullName].length) && (T.repoGroupsMap[u.fullName] = f, l = !0), {
        ...u,
        localGroups: f
      };
    }), l && this.persistGroupsMap();
  }
  /**
   * 智能推断仓库最匹配的分组归属（仅在无手动归类时作为平滑桥接）
   */
  inferGroupsForRepo(a, l) {
    if (!l || !l.length) return [];
    const u = [], g = a.name.toLowerCase(), b = (a.topics || []).map((G) => G.toLowerCase());
    for (const G of l) {
      const m = G.toLowerCase();
      if ((m.includes("fork") || G.includes("分支")) && (a.isFork || b.includes("fork"))) {
        u.push(G);
        continue;
      }
      if ((m.includes("浏览器") || m.includes("browser") || m.includes("chrome") || m.includes("edge")) && (b.some((f) => f.includes("extension") || f.includes("browser") || f.includes("newtab")) || g.includes("tab-project"))) {
        u.push(G);
        continue;
      }
      if ((m.includes("pi") || G.includes("PI")) && (b.some((f) => f.includes("pi") || f.includes("grounding-pi")) || g.includes("pi-") || g.includes("-pi"))) {
        u.push(G);
        continue;
      }
      if (m.includes("herdr") && (b.some((f) => f.includes("herdr")) || g.includes("herdr"))) {
        u.push(G);
        continue;
      }
      if ((m.includes("嵌入式") || m.includes("embedded") || m.includes("单片机")) && (b.some((f) => f.includes("embedded") || f.includes("zephyr") || f.includes("stm32") || f.includes("k230")) || g.includes("k230") || g.includes("mspm0") || g.includes("pid-") || g.includes("zephyr"))) {
        u.push(G);
        continue;
      }
      if ((m.includes("美化") || m.includes("theme") || m.includes("style")) && (b.some((f) => f.includes("theme") || f.includes("beauty") || f.includes("ui")) || g.includes("theme") || g.includes("style"))) {
        u.push(G);
        continue;
      }
    }
    return u;
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(a, l) {
    const u = we(l);
    u && (a.localGroups.includes(u) || a.localGroups.push(u), T.repoGroupsMap[a.fullName] = [...a.localGroups], await this.persistGroupsMap(), await xe.set(Ee, T.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(a, l) {
    a.localGroups = a.localGroups.filter((u) => u !== l), T.repoGroupsMap[a.fullName] = [...a.localGroups], await this.persistGroupsMap(), await xe.set(Ee, T.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(a, l) {
    if (!l)
      a.localGroups = [];
    else {
      const u = we(l);
      if (!u) return;
      a.localGroups = [u];
    }
    T.repoGroupsMap[a.fullName] = [...a.localGroups], await this.persistGroupsMap(), await xe.set(Ee, T.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(a) {
    const l = we(a);
    return l ? T.customGroups.includes(l) ? (alert(`分组「${l}」已存在。`), null) : (T.customGroups.push(l), await this.persistGroups(), l) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(a, l) {
    const u = we(l);
    return u ? a === u ? !0 : T.customGroups.includes(u) ? (alert(`已存在名为「${u}」的分组。`), !1) : (T.customGroups = T.customGroups.map((g) => g === a ? u : g), T.repos.forEach((g) => {
      g.localGroups.includes(a) && (g.localGroups = g.localGroups.map((b) => b === a ? u : b), T.repoGroupsMap[g.fullName] = [...g.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(a) {
    const l = T.repos.filter((g) => g.localGroups.includes(a)).length, u = l > 0 ? `确定删除分组「${a}」吗？
该分组下的 ${l} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${a}」吗？`;
    return confirm(u) ? (T.customGroups = T.customGroups.filter((g) => g !== a), T.repos.forEach((g) => {
      g.localGroups.includes(a) && (g.localGroups = g.localGroups.filter((b) => b !== a), T.repoGroupsMap[g.fullName] = [...g.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let a = null, l = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const u = await chrome.storage.local.get([He, Ue]);
        a = u?.[He], l = u?.[Ue];
      }
      if (!a || !Array.isArray(a)) {
        const u = localStorage.getItem(He);
        u && (a = JSON.parse(u));
      }
      if (!l || typeof l != "object") {
        const u = localStorage.getItem(Ue);
        u && (l = JSON.parse(u));
      }
      Array.isArray(a) && (T.customGroups = a.map(we).filter(Boolean)), l && typeof l == "object" && (T.repoGroupsMap = l);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const a = { ...T.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Ue]: a }), localStorage.setItem(Ue, JSON.stringify(a));
    } catch {
    }
  }
  async persistGroups() {
    const a = Array.from(new Set(T.customGroups.map(we).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [He]: a }), localStorage.setItem(He, JSON.stringify(a));
    } catch {
    }
  }
}
const le = $e.getInstance(), os = { class: "my-repos-workspace" }, ns = {
  key: 0,
  class: "error-banner"
}, as = { class: "shelf-header" }, ls = { class: "shelf-left" }, rs = { class: "shelf-badge" }, is = { class: "shelf-right" }, us = { class: "shelf-search-wrap" }, cs = ["disabled", "title"], ds = ["title"], ps = ["onDragstart", "onContextmenu"], hs = { class: "repo-card-head" }, gs = ["title", "onClick"], ms = {
  key: 0,
  class: "badge-repo-visibility private"
}, fs = {
  key: 1,
  class: "badge-repo-visibility fork"
}, vs = ["title"], bs = {
  key: 1,
  class: "repo-topics-row"
}, ys = { class: "repo-card-footer" }, _s = { class: "meta-left" }, ws = {
  key: 0,
  class: "meta-item lang"
}, ks = { class: "meta-item" }, Cs = {
  key: 1,
  class: "meta-item"
}, $s = ["title"], Gs = { class: "board-columns-track" }, Ms = ["onDragover", "onDragleave", "onDrop"], Ts = { class: "column-header" }, Rs = {
  key: 0,
  class: "column-title-group"
}, Ss = ["title"], Ls = { class: "badge-count" }, Ds = {
  key: 1,
  class: "column-rename-group"
}, As = ["onKeydown"], xs = ["onClick"], Es = { class: "column-actions" }, Hs = ["onClick"], Us = {
  key: 0,
  class: "col-popover-menu"
}, Is = ["onClick"], Ns = ["onClick"], Ps = { class: "column-cards-scroll" }, Os = ["onDragstart", "onContextmenu"], Fs = { class: "repo-card-head" }, js = ["title", "onClick"], Bs = {
  key: 0,
  class: "badge-repo-visibility private"
}, Ws = {
  key: 1,
  class: "badge-repo-visibility fork"
}, zs = ["title"], Ys = { class: "repo-topics-row" }, Vs = { class: "topic-chip active-chip" }, qs = ["onClick"], Ks = { class: "repo-card-footer" }, Xs = { class: "meta-left" }, Qs = {
  key: 0,
  class: "meta-item lang"
}, Js = { class: "meta-item" }, Zs = {
  key: 1,
  class: "meta-item"
}, eo = { class: "meta-date" }, to = {
  key: 0,
  class: "empty-column-placeholder"
}, so = { class: "board-column new-column-slot" }, oo = {
  key: 1,
  class: "new-column-composer"
}, no = { class: "composer-actions" }, ao = ["onClick"], lo = /* @__PURE__ */ Me({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(y) {
    const a = y, l = N(""), u = N(!1), g = N(null), b = N(""), G = N(null), m = N(null), f = N(null), k = N(!1);
    function D() {
      k.value = !k.value;
    }
    function R(p) {
      const d = f.value;
      d && (Math.abs(p.deltaX) > Math.abs(p.deltaY) && p.deltaX !== 0 || p.deltaY !== 0 && (p.preventDefault(), d.scrollLeft += p.deltaY));
    }
    const x = N(null), S = N(null), A = N(null);
    let L = null, J = 0;
    const I = ve({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), H = N(null), Z = N(!1);
    function oe() {
      I.visible = !1, H.value = null;
    }
    function ie(p, d, h) {
      p.preventDefault(), p.stopPropagation();
      let _ = p.clientX, ne = p.clientY;
      _ > window.innerWidth - 200 && (_ = window.innerWidth - 210), ne > window.innerHeight - 240 && (ne = window.innerHeight - 245), I.x = _, I.y = ne, I.repo = d, I.fromGroup = h, I.visible = !0, H.value = "folder", Z.value = _ > window.innerWidth - 380;
    }
    async function re() {
      const p = I.repo;
      oe(), p && await le.moveRepoToGroup(p, null);
    }
    async function E(p) {
      const d = I.repo;
      oe(), d && await le.moveRepoToGroup(d, p);
    }
    async function j() {
      const p = I.repo;
      if (oe(), !!p)
        try {
          await navigator.clipboard.writeText(p.htmlUrl), yt.show({
            appName: "GitHub",
            title: M("github.myRepos.copiedUrlTitle"),
            message: M("github.myRepos.copiedUrlMsg", { name: p.name })
          });
        } catch {
        }
    }
    async function B() {
      const p = I.repo;
      if (oe(), !!p)
        try {
          const d = `git clone ${p.htmlUrl}.git`;
          await navigator.clipboard.writeText(d), yt.show({
            appName: "GitHub",
            title: M("github.myRepos.copiedCloneTitle"),
            message: d
          });
        } catch {
        }
    }
    function P() {
      const p = I.repo;
      oe(), p && Le(p.htmlUrl);
    }
    function z() {
      const p = I.repo;
      oe(), p && Ct.open({
        fullName: p.fullName,
        description: p.description || "",
        stars: p.stargazersCount,
        language: p.language || void 0,
        updated: p.pushedAt
      });
    }
    function ee(p) {
      p.target?.closest(".gh-repo-context-menu") || I.visible && oe();
    }
    function de(p) {
      p.key === "Escape" && I.visible && oe();
    }
    const ae = se(() => T.customGroups), q = se(() => {
      const p = T.searchQuery.trim().toLowerCase();
      return p ? T.repos.filter(
        (d) => d.name.toLowerCase().includes(p) || d.description.toLowerCase().includes(p) || d.localGroups.some((h) => h.toLowerCase().includes(p)) || d.topics.some((h) => h.toLowerCase().includes(p)) || d.language && d.language.toLowerCase().includes(p)
      ) : T.repos;
    }), C = se(() => q.value.filter((p) => !p.localGroups.length));
    function X(p) {
      return q.value.filter((d) => d.localGroups.includes(p));
    }
    async function Fe() {
      const p = l.value.trim();
      if (!p) return;
      await le.createGroup(p) && (l.value = "", u.value = !1);
    }
    function st(p) {
      G.value = p, b.value = p, g.value = null;
    }
    async function je(p) {
      const d = b.value.trim();
      if (!d || d === p) {
        G.value = null;
        return;
      }
      await le.renameGroup(p, d) && (G.value = null);
    }
    async function ot(p) {
      g.value = null, await le.deleteGroup(p);
    }
    async function nt(p, d) {
      await le.removeRepoFromGroup(p, d);
    }
    function Be(p) {
      const d = m.value;
      if (!d) return;
      const _ = p.target?.closest(".column-cards-scroll");
      if (_ && _.scrollHeight > _.clientHeight && !p.shiftKey && p.deltaX === 0) {
        const ne = _.scrollTop <= 0 && p.deltaY < 0, Ke = _.scrollTop + _.clientHeight >= _.scrollHeight - 1 && p.deltaY > 0;
        if (!ne && !Ke)
          return;
      }
      Math.abs(p.deltaX) > Math.abs(p.deltaY) && p.deltaX !== 0 || p.deltaY !== 0 && (p.preventDefault(), d.scrollLeft += p.deltaY);
    }
    function Re(p) {
      if (!x.value || !m.value) return;
      p.preventDefault();
      const d = p.deltaX !== 0 ? p.deltaX : p.deltaY;
      m.value.scrollLeft += d;
    }
    function We() {
      if (L !== null) return;
      const p = () => {
        m.value && J !== 0 ? (m.value.scrollLeft += J, L = requestAnimationFrame(p)) : be();
      };
      L = requestAnimationFrame(p);
    }
    function be() {
      L !== null && (cancelAnimationFrame(L), L = null), J = 0;
    }
    function pe(p) {
      if (!x.value || !m.value) return;
      const d = m.value.getBoundingClientRect(), h = 100;
      if (p > d.right - h) {
        const _ = Math.min(1, Math.max(0.1, (p - (d.right - h)) / h));
        J = Math.round(_ * 20), We();
      } else if (p < d.left + h) {
        const _ = Math.min(1, Math.max(0.1, (d.left + h - p) / h));
        J = -Math.round(_ * 20), We();
      } else
        be();
    }
    function ye(p) {
      x.value && (p.preventDefault(), pe(p.clientX));
    }
    function ze(p, d, h) {
      oe(), x.value = d, S.value = h, p.dataTransfer && (p.dataTransfer.effectAllowed = "move", p.dataTransfer.setData("text/plain", `${d.id}:${h}`)), window.addEventListener("wheel", Re, { passive: !1 });
    }
    function Se() {
      x.value = null, S.value = null, A.value = null, be(), window.removeEventListener("wheel", Re);
    }
    function Ye(p, d) {
      x.value && (p.preventDefault(), p.dataTransfer && (p.dataTransfer.dropEffect = "move"), A.value = d, pe(p.clientX));
    }
    function Ve(p, d) {
      const h = p.currentTarget, _ = p.relatedTarget;
      h?.contains(_) || A.value === d && (A.value = null);
    }
    async function qe(p, d) {
      p.preventDefault();
      const h = x.value, _ = S.value;
      Se(), h && (d === "default" ? _ && _ !== "default" ? await le.removeRepoFromGroup(h, _) : await le.moveRepoToGroup(h, null) : (await le.addRepoToGroup(h, d), _ && _ !== "default" && _ !== d && await le.removeRepoFromGroup(h, _)));
    }
    function Le(p) {
      window.open(p, "_blank", "noopener,noreferrer");
    }
    function De(p) {
      if (!p) return "";
      try {
        const d = new Date(p);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return me(
      () => a.active,
      (p) => {
        oe(), p && le.load();
      }
    ), et(() => {
      window.addEventListener("pointerdown", ee), window.addEventListener("keydown", de), le.load();
    }), tt(() => {
      be(), window.removeEventListener("wheel", Re), window.removeEventListener("pointerdown", ee), window.removeEventListener("keydown", de);
    }), (p, d) => (o(), i("div", os, [
      t(T).errorMessage ? (o(), i("div", ns, [
        e("span", null, "⚠️ " + r(t(T).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: d[0] || (d[0] = (h) => t(le).load(!0))
        }, "重试")
      ])) : $("", !0),
      e("section", {
        class: F(["default-shelf-area", { "is-collapsed": k.value, "drop-active": A.value === "default" }]),
        onDragover: d[4] || (d[4] = (h) => Ye(h, "default")),
        onDragleave: d[5] || (d[5] = (h) => Ve(h, "default")),
        onDrop: d[6] || (d[6] = (h) => qe(h, "default"))
      }, [
        e("header", as, [
          e("div", ls, [
            d[23] || (d[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            d[24] || (d[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", rs, r(C.value.length), 1),
            d[25] || (d[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", is, [
            e("div", us, [
              d[26] || (d[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              ge(e("input", {
                "onUpdate:modelValue": d[1] || (d[1] = (h) => t(T).searchQuery = h),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [Ie, t(T).searchQuery]
              ]),
              t(T).searchQuery ? (o(), i("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: d[2] || (d[2] = (h) => t(T).searchQuery = "")
              }, "✕")) : $("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(T).loading,
              title: t(M)("github.myRepos.refreshBtnTitle"),
              onClick: d[3] || (d[3] = (h) => t(le).load(!0))
            }, [
              e("span", {
                class: F({ spinning: t(T).loading })
              }, "🔄", 2),
              e("span", null, r(t(T).loading ? t(M)("github.myRepos.refreshing") : t(M)("common.refresh")), 1)
            ], 8, cs),
            C.value.length ? (o(), i("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: k.value ? t(M)("github.myRepos.expandShelf") : t(M)("github.myRepos.collapseShelf"),
              onClick: D
            }, r(k.value ? t(M)("github.myRepos.expandBtn") : t(M)("github.myRepos.collapseBtn")), 9, ds)) : $("", !0)
          ])
        ]),
        C.value.length ? ge((o(), i("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: f,
          class: "shelf-cards-scroll",
          onWheel: R
        }, [
          (o(!0), i(Y, null, K(C.value, (h) => (o(), i("div", {
            key: h.id,
            class: F(["repo-card shelf-card", { "card-dragging": x.value?.id === h.id }]),
            draggable: "true",
            onDragstart: (_) => ze(_, h, "default"),
            onDragend: Se,
            onContextmenu: (_) => ie(_, h, "default")
          }, [
            e("div", hs, [
              e("span", {
                class: "repo-name",
                title: h.fullName,
                onClick: (_) => Le(h.htmlUrl)
              }, r(h.name), 9, gs),
              h.isPrivate ? (o(), i("span", ms, "私有")) : $("", !0),
              h.isFork ? (o(), i("span", fs, "Fork")) : $("", !0)
            ]),
            h.description ? (o(), i("p", {
              key: 0,
              class: "repo-desc",
              title: h.description
            }, r(h.description), 9, vs)) : $("", !0),
            h.topics.length ? (o(), i("div", bs, [
              (o(!0), i(Y, null, K(h.topics, (_) => (o(), i("span", {
                key: _,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + r(_), 1))), 128))
            ])) : $("", !0),
            e("div", ys, [
              e("div", _s, [
                h.language ? (o(), i("span", ws, [
                  d[27] || (d[27] = e("span", { class: "lang-color" }, null, -1)),
                  te(r(h.language), 1)
                ])) : $("", !0),
                e("span", ks, "⭐ " + r(h.stargazersCount), 1),
                h.forksCount ? (o(), i("span", Cs, "🍴 " + r(h.forksCount), 1)) : $("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + h.updatedAt
              }, r(De(h.pushedAt || h.updatedAt)), 9, $s)
            ])
          ], 42, ps))), 128))
        ], 544)), [
          [Qe, !k.value]
        ]) : $("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: m,
        class: "board-viewport",
        onWheel: Be,
        onDragover: ye
      }, [
        e("div", Gs, [
          (o(!0), i(Y, null, K(ae.value, (h) => (o(), i("section", {
            key: h,
            class: F(["board-column topic-column", { "drop-active": A.value === h }]),
            onDragover: (_) => Ye(_, h),
            onDragleave: (_) => Ve(_, h),
            onDrop: (_) => qe(_, h)
          }, [
            e("header", Ts, [
              G.value !== h ? (o(), i("div", Rs, [
                d[28] || (d[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + h
                }, " 📁 " + r(h), 9, Ss),
                e("span", Ls, r(X(h).length), 1)
              ])) : (o(), i("div", Ds, [
                ge(e("input", {
                  "onUpdate:modelValue": d[7] || (d[7] = (_) => b.value = _),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    Xe((_) => je(h), ["enter"]),
                    d[8] || (d[8] = Xe((_) => G.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, As), [
                  [Ie, b.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (_) => je(h)
                }, "✓", 8, xs),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: d[9] || (d[9] = (_) => G.value = null)
                }, "✕")
              ])),
              e("div", Es, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (_) => g.value = g.value === h ? null : h
                }, "•••", 8, Hs),
                g.value === h ? (o(), i("div", Us, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (_) => st(h)
                  }, " 重命名分组 ", 8, Is),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (_) => ot(h)
                  }, " 删除分组 ", 8, Ns)
                ])) : $("", !0)
              ])
            ]),
            e("div", Ps, [
              (o(!0), i(Y, null, K(X(h), (_) => (o(), i("div", {
                key: _.id,
                class: F(["repo-card", { "card-dragging": x.value?.id === _.id }]),
                draggable: "true",
                onDragstart: (ne) => ze(ne, _, h),
                onDragend: Se,
                onContextmenu: (ne) => ie(ne, _, h)
              }, [
                e("div", Fs, [
                  e("span", {
                    class: "repo-name",
                    title: _.fullName,
                    onClick: (ne) => Le(_.htmlUrl)
                  }, r(_.name), 9, js),
                  _.isPrivate ? (o(), i("span", Bs, "私有")) : $("", !0),
                  _.isFork ? (o(), i("span", Ws, "Fork")) : $("", !0)
                ]),
                _.description ? (o(), i("p", {
                  key: 0,
                  class: "repo-desc",
                  title: _.description
                }, r(_.description), 9, zs)) : $("", !0),
                e("div", Ys, [
                  e("span", Vs, [
                    te(" 📁 " + r(h) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: Q((ne) => nt(_, h), ["stop"])
                    }, "✕", 8, qs)
                  ]),
                  (o(!0), i(Y, null, K(_.topics, (ne) => (o(), i("span", {
                    key: ne,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + r(ne), 1))), 128))
                ]),
                e("div", Ks, [
                  e("div", Xs, [
                    _.language ? (o(), i("span", Qs, [
                      d[29] || (d[29] = e("span", { class: "lang-color" }, null, -1)),
                      te(r(_.language), 1)
                    ])) : $("", !0),
                    e("span", Js, "⭐ " + r(_.stargazersCount), 1),
                    _.forksCount ? (o(), i("span", Zs, "🍴 " + r(_.forksCount), 1)) : $("", !0)
                  ]),
                  e("span", eo, r(De(_.pushedAt || _.updatedAt)), 1)
                ])
              ], 42, Os))), 128)),
              X(h).length ? $("", !0) : (o(), i("div", to, [...d[30] || (d[30] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, Ms))), 128)),
          e("section", so, [
            u.value ? (o(), i("div", oo, [
              d[32] || (d[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              ge(e("input", {
                "onUpdate:modelValue": d[11] || (d[11] = (h) => l.value = h),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  Xe(Fe, ["enter"]),
                  d[12] || (d[12] = Xe((h) => u.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [Ie, l.value]
              ]),
              e("div", no, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: Fe
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: d[13] || (d[13] = (h) => u.value = !1)
                }, r(t(M)("common.cancel")), 1)
              ])
            ])) : (o(), i("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: d[10] || (d[10] = (h) => u.value = !0)
            }, [...d[31] || (d[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (o(), he(ut, { to: "body" }, [
        I.visible && I.repo ? (o(), i("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Je({ left: `${I.x}px`, top: `${I.y}px` }),
          onClick: d[21] || (d[21] = Q(() => {
          }, ["stop"])),
          onContextmenu: d[22] || (d[22] = Q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: F(["gh-menu-has-sub", { "is-active": H.value === "folder" }]),
            onMouseenter: d[16] || (d[16] = (h) => H.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: d[14] || (d[14] = Q((h) => H.value = H.value === "folder" ? null : "folder", ["stop"]))
            }, [...d[33] || (d[33] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: F(["gh-sub-flyout", { "flyout-left": Z.value }]),
              onClick: d[15] || (d[15] = Q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: F(["fo-cover-menu-item", { primary: !I.repo.localGroups.length }]),
                type: "button",
                onClick: re
              }, r(I.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (o(!0), i(Y, null, K(ae.value, (h) => (o(), i("button", {
                key: h,
                class: F(["fo-cover-menu-item", { primary: I.repo.localGroups.includes(h) }]),
                type: "button",
                onClick: (_) => E(h)
              }, r(I.repo.localGroups.includes(h) ? "✓ " : "  ") + "📁 " + r(h), 11, ao))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: d[17] || (d[17] = (h) => H.value = null),
            onClick: j
          }, r(t(M)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: d[18] || (d[18] = (h) => H.value = null),
            onClick: B
          }, r(t(M)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: d[19] || (d[19] = (h) => H.value = null),
            onClick: z
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: d[20] || (d[20] = (h) => H.value = null),
            onClick: P
          }, r(t(M)("github.myRepos.openInGitHub")), 33)
        ], 36)) : $("", !0)
      ]))
    ]));
  }
}), ro = /* @__PURE__ */ Te(lo, [["__scopeId", "data-v-f77c8971"]]), ue = ve({
  uncatPage: 1,
  pageSize: 10
});
class Ge {
  static getInstance() {
    return Ge.instance || (Ge.instance = new Ge()), Ge.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && ue.uncatPage++;
  }
  prevUncatPage() {
    ue.uncatPage > 1 && ue.uncatPage--;
  }
  setUncatPage(a) {
    const l = Math.max(1, Math.min(a, this.uncatTotalPages));
    ue.uncatPage = l;
  }
  get uncatPage() {
    return ue.uncatPage;
  }
  get uncatTotalPages() {
    const a = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(a / ue.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const a = ce.searchQuery.trim().toLowerCase(), l = ce.repos.filter((u) => Ze(u.full_name).length === 0);
    return a ? l.filter(
      (u) => u.full_name.toLowerCase().includes(a) || u.description && u.description.toLowerCase().includes(a) || u.language && u.language.toLowerCase().includes(a) || u.topics && u.topics.some((g) => g.toLowerCase().includes(a))
    ) : l;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const a = this.filteredUncatRepos, u = (Math.min(ue.uncatPage, this.uncatTotalPages) - 1) * ue.pageSize;
    return a.slice(u, u + ue.pageSize);
  }
  /**
   * 各个本地分组板块列表（根据当前激活的大分组标签过滤）
   */
  get lists() {
    const a = ce.activeSection || "默认";
    return ce.lists.filter((l) => (l.section || "默认") === a);
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(a) {
    const l = ce.searchQuery.trim().toLowerCase(), u = ce.repos.filter((g) => Ze(g.full_name).includes(a));
    return l ? u.filter(
      (g) => g.full_name.toLowerCase().includes(l) || g.description && g.description.toLowerCase().includes(l) || g.language && g.language.toLowerCase().includes(l) || g.topics && g.topics.some((b) => b.toLowerCase().includes(l))
    ) : u;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(a, l) {
    await V.dropRepositoryIntoFolder(a, l);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(a, l) {
    await V.toggleRepoList(a, l);
  }
}
const W = Ge.getInstance(), ke = {
  mode: "idle",
  activeDragRepo: null,
  activeDragFromList: null,
  hoverTargetColumn: null,
  draggingColumnId: null,
  hoverColumnId: null,
  repoMenu: null,
  columnMenu: null
};
class io {
  constructor() {
    this._state = { ...ke }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.githubStarsBoard = this);
  }
  get state() {
    return this._state;
  }
  get mode() {
    return this._state.mode;
  }
  get isDraggingRepo() {
    return this._state.mode === "dragging_repo";
  }
  get isDraggingColumn() {
    return this._state.mode === "dragging_column";
  }
  get activeDragRepo() {
    return this._state.activeDragRepo;
  }
  get activeDragFromList() {
    return this._state.activeDragFromList;
  }
  get hoverTargetColumn() {
    return this._state.hoverTargetColumn;
  }
  get draggingColumnId() {
    return this._state.draggingColumnId;
  }
  get hoverColumnId() {
    return this._state.hoverColumnId;
  }
  get repoMenu() {
    return this._state.repoMenu;
  }
  get columnMenu() {
    return this._state.columnMenu;
  }
  subscribe(a) {
    return this._listeners.add(a), () => {
      this._listeners.delete(a);
    };
  }
  _setState(a) {
    this._state = a;
    for (const l of this._listeners)
      l(a);
  }
  send(a) {
    const l = this._state;
    switch (a.type) {
      case "START_DRAG_REPO":
        return this._setState({
          mode: "dragging_repo",
          activeDragRepo: a.repo,
          activeDragFromList: a.fromList,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_TARGET_COLUMN":
        return l.mode === "dragging_repo" ? (this._setState({
          ...l,
          hoverTargetColumn: a.columnId
        }), !0) : !1;
      case "END_DRAG_REPO":
        return l.mode === "dragging_repo" ? (this._setState({ ...ke }), !0) : !1;
      case "START_DRAG_COLUMN":
        return this._setState({
          mode: "dragging_column",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: a.columnId,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: null
        }), !0;
      case "HOVER_COLUMN_REORDER":
        return l.mode === "dragging_column" ? (this._setState({
          ...l,
          hoverColumnId: a.columnId
        }), !0) : !1;
      case "END_DRAG_COLUMN":
        return l.mode === "dragging_column" ? (this._setState({ ...ke }), !0) : !1;
      case "OPEN_REPO_MENU":
        return this._setState({
          mode: "repo_context_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: a.payload,
          columnMenu: null
        }), !0;
      case "CLOSE_REPO_MENU":
        return l.mode === "repo_context_menu" ? (this._setState({ ...ke }), !0) : !1;
      case "OPEN_COLUMN_MENU":
        return this._setState({
          mode: "column_menu",
          activeDragRepo: null,
          activeDragFromList: null,
          hoverTargetColumn: null,
          draggingColumnId: null,
          hoverColumnId: null,
          repoMenu: null,
          columnMenu: a.payload
        }), !0;
      case "CLOSE_COLUMN_MENU":
        return l.mode === "column_menu" ? (this._setState({ ...ke }), !0) : !1;
      case "RESET_IDLE":
        return this._setState({ ...ke }), !0;
      default:
        return !1;
    }
  }
}
const uo = { class: "stars-board-workspace" }, co = ["data-gh-list-drop"], po = { class: "shelf-header" }, ho = { class: "shelf-left" }, go = { class: "shelf-badge" }, mo = { class: "shelf-right" }, fo = {
  key: 0,
  class: "shelf-pager"
}, vo = ["disabled"], bo = { class: "pager-text" }, yo = ["disabled"], _o = ["disabled", "aria-busy"], wo = ["title"], ko = {
  key: 0,
  class: "shelf-cards-scroll"
}, Co = ["onClick", "onDragstart", "onContextmenu"], $o = ["onClick"], Go = { class: "gh-card-head" }, Mo = ["src"], To = ["href", "title"], Ro = { class: "owner" }, So = { class: "gh-card-body" }, Lo = { class: "gh-card-badges" }, Do = ["title"], Ao = ["title"], xo = ["title"], Eo = { class: "meta" }, Ho = { class: "gh-stars" }, Uo = {
  key: 0,
  class: "gh-lang"
}, Io = { class: "gh-updated" }, No = { class: "shelf-next-content" }, Po = { class: "shelf-next-sub" }, Oo = {
  key: 2,
  class: "shelf-empty",
  role: "status"
}, Fo = {
  key: 0,
  class: "gh-drilldown-header"
}, jo = { class: "gh-drilldown-current" }, Bo = { class: "gh-drilldown-sub-count" }, Wo = {
  key: 0,
  class: "board-columns-track"
}, zo = { class: "column-cards-scroll" }, Yo = {
  key: 1,
  class: "board-columns-track"
}, Vo = ["data-gh-list-drop", "onDragover", "onDragleave", "onDrop"], qo = ["title"], Ko = ["onClick"], Xo = ["title"], Qo = {
  key: 0,
  class: "col-pinned-icon",
  title: "已置顶分组"
}, Jo = { class: "badge-count" }, Zo = {
  key: 1,
  class: "col-sub-badge",
  title: "点击下钻查看所有子分组"
}, en = { class: "column-actions" }, tn = ["onDragstart", "onClick"], sn = { class: "column-cards-scroll" }, on = ["onClick", "onDragstart", "onContextmenu"], nn = ["onClick"], an = { class: "gh-card-head" }, ln = ["src"], rn = ["href", "title"], un = { class: "owner" }, cn = { class: "gh-card-body" }, dn = { class: "gh-card-badges" }, pn = ["title"], hn = ["onClick"], gn = ["title"], mn = ["title"], fn = ["title"], vn = { class: "meta" }, bn = { class: "gh-stars" }, yn = {
  key: 0,
  class: "gh-lang"
}, _n = { class: "gh-updated" }, wn = {
  key: 0,
  class: "empty-column-dropzone"
}, kn = { class: "board-column add-column-panel" }, Cn = ["title"], $n = ["onClick"], Gn = /* @__PURE__ */ Me({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(y) {
    const a = y, l = N(null), u = N(null), g = N(!1);
    function b() {
      g.value = !g.value;
    }
    function G(s) {
      const n = u.value;
      n && (Math.abs(s.deltaX) > Math.abs(s.deltaY) && s.deltaX !== 0 || s.deltaY !== 0 && (s.preventDefault(), n.scrollLeft += s.deltaY));
    }
    const m = se(() => ce.loading), f = se(() => m.value && !ce.repos.length), k = N(null);
    function D(s) {
      if (!s) return null;
      const n = s.match(/^(.+?)[/／](.+)$/);
      if (!n) return null;
      const c = n[1].trim(), v = n[2].trim();
      return !c || !v ? null : { parentPrefix: c, childName: v };
    }
    function R(s) {
      const n = D(s);
      if (!n) return null;
      const c = n.parentPrefix.toLowerCase(), v = W.lists.find((O) => O.name.trim().toLowerCase() === c);
      return v ? v.name : null;
    }
    function x(s) {
      const n = s.trim().toLowerCase();
      return W.lists.filter((c) => {
        const v = D(c.name);
        return v !== null && v.parentPrefix.toLowerCase() === n;
      });
    }
    function S(s) {
      return x(s).length > 0;
    }
    const A = se(() => k.value ? x(k.value).length : 0);
    function L(s) {
      k.value = s, l.value && (l.value.scrollLeft = 0);
    }
    const J = se(() => {
      const s = W.lists;
      if (!k.value)
        return s.filter((O) => R(O.name) === null);
      const n = k.value.trim().toLowerCase(), c = s.find((O) => O.name.trim().toLowerCase() === n), v = x(k.value);
      return !c && !v.length ? (k.value = null, s.filter((O) => R(O.name) === null)) : c ? [c, ...v] : v;
    });
    me(() => ce.activeSection, () => {
      k.value = null;
    });
    function I() {
      V.promptCreateFolder(k.value || void 0);
    }
    const H = new io(), Z = N(H.activeDragRepo), oe = N(H.activeDragFromList), ie = N(H.hoverTargetColumn);
    let re = null, E = 0;
    function j() {
      re === null && (re = window.setInterval(() => {
        !l.value || E === 0 || (l.value.scrollLeft += E);
      }, 16));
    }
    function B() {
      re !== null && (clearInterval(re), re = null), E = 0;
    }
    const P = ve({
      visible: !1,
      x: 0,
      y: 0,
      list: null
    }), z = ve({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), ee = N(null), de = N(!1), ae = N(H.draggingColumnId), q = N(H.hoverColumnId), C = H.subscribe((s) => {
      Z.value = s.activeDragRepo, oe.value = s.activeDragFromList, ie.value = s.hoverTargetColumn, ae.value = s.draggingColumnId, q.value = s.hoverColumnId, P.visible = s.mode === "column_menu" && s.columnMenu !== null, P.x = s.columnMenu?.x ?? 0, P.y = s.columnMenu?.y ?? 0, P.list = s.columnMenu?.list ?? null, z.visible = s.mode === "repo_context_menu" && s.repoMenu !== null, z.x = s.repoMenu?.x ?? 0, z.y = s.repoMenu?.y ?? 0, z.repo = s.repoMenu?.repo ?? null, z.fromList = s.repoMenu?.fromList ?? null, ee.value = s.repoMenu?.activeSubMenu ?? null, de.value = s.repoMenu?.isFlyoutLeft ?? !1;
    });
    function X() {
      H.send({ type: "CLOSE_COLUMN_MENU" });
    }
    function Fe(s, n) {
      s.preventDefault(), s.stopPropagation();
      const c = 150, v = 130, O = Math.min(s.clientX, window.innerWidth - c - 10), _e = Math.min(s.clientY, window.innerHeight - v - 10);
      H.send({ type: "OPEN_COLUMN_MENU", payload: { x: O, y: _e, list: n } });
    }
    async function st() {
      const s = P.list;
      X(), s && await V.renameFolder(s.id, s.name);
    }
    async function je() {
      const s = P.list;
      X(), s && await V.pinFolder(s.id);
    }
    async function ot() {
      const s = P.list;
      X(), s && await V.deleteFolder(s.name);
    }
    function nt(s, n) {
      H.send({ type: "START_DRAG_COLUMN", columnId: n.id }), s.dataTransfer && (s.dataTransfer.effectAllowed = "move", s.dataTransfer.setData("application/x-gh-col-id", n.id));
    }
    function Be() {
      H.send({ type: "END_DRAG_COLUMN" });
    }
    function Re(s, n) {
      !ae.value || ae.value === n || (s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "move"), H.send({ type: "HOVER_COLUMN_REORDER", columnId: n }));
    }
    function We(s, n) {
      q.value === n && H.send({ type: "HOVER_COLUMN_REORDER", columnId: null });
    }
    async function be(s, n) {
      if (!ae.value || ae.value === n) return;
      s.preventDefault();
      const c = ae.value;
      Be(), await V.reorderFolders(c, n);
    }
    function pe() {
      H.send({ type: "CLOSE_REPO_MENU" });
    }
    function ye(s, n, c) {
      s.preventDefault(), s.stopPropagation();
      const v = 190, O = 270, _e = Math.min(s.clientX, window.innerWidth - v - 10), Gt = Math.min(s.clientY, window.innerHeight - O - 10);
      H.send({
        type: "OPEN_REPO_MENU",
        payload: {
          x: _e,
          y: Gt,
          repo: n,
          fromList: c,
          activeSubMenu: "folder",
          isFlyoutLeft: _e > window.innerWidth - 380
        }
      });
    }
    async function ze() {
      const s = z.repo;
      pe(), s && await W.moveRepoToList(s.full_name, V.UNCAT);
    }
    async function Se(s) {
      const n = z.repo;
      pe(), n && await W.moveRepoToList(n.full_name, s);
    }
    async function Ye() {
      const s = z.repo;
      if (pe(), !!s?.html_url)
        try {
          await navigator.clipboard.writeText(s.html_url);
        } catch {
        }
    }
    async function Ve() {
      const s = z.repo;
      if (pe(), !!s?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${s.full_name}.git`);
        } catch {
        }
    }
    function qe() {
      const s = z.repo;
      pe(), s && Ct.open({
        fullName: s.full_name,
        description: s.description || "",
        stars: s.stargazers_count,
        language: s.language || void 0,
        updated: s.updated_at
      });
    }
    function Le() {
      const s = z.repo;
      pe(), s?.html_url && $t(s.html_url);
    }
    function De(s) {
      const n = s.target;
      !n?.closest(".fo-cover-context-menu") && !n?.closest(".col-popover-menu") && !n?.closest(".gh-list-col-menu") && H.send({ type: "RESET_IDLE" });
    }
    function p(s) {
      if (s.key === "Escape") {
        if (k.value) {
          k.value = null;
          return;
        }
        H.send({ type: "RESET_IDLE" });
      }
    }
    function d(s) {
      const n = l.value;
      if (!n) return;
      const v = s.target?.closest(".column-cards-scroll");
      if (v && v.scrollHeight > v.clientHeight && !s.shiftKey && s.deltaX === 0) {
        const O = v.scrollTop === 0 && s.deltaY < 0, _e = Math.ceil(v.scrollTop + v.clientHeight) >= v.scrollHeight && s.deltaY > 0;
        if (!O && !_e)
          return;
      }
      Math.abs(s.deltaX) > Math.abs(s.deltaY) && s.deltaX !== 0 || s.deltaY !== 0 && (s.preventDefault(), n.scrollLeft += s.deltaY);
    }
    function h(s) {
      if (!Z.value || !l.value) return;
      s.preventDefault();
      const n = s.deltaY !== 0 ? s.deltaY : s.deltaX;
      l.value.scrollLeft += n;
    }
    function _(s) {
      const n = l.value;
      if (!n) return;
      const c = n.getBoundingClientRect(), v = 100;
      if (s > c.right - v) {
        const O = Math.min(1, Math.max(0.1, (s - (c.right - v)) / v));
        E = Math.round(O * 20), j();
      } else if (s < c.left + v) {
        const O = Math.min(1, Math.max(0.1, (c.left + v - s) / v));
        E = -Math.round(O * 20), j();
      } else
        B();
    }
    function ne(s) {
      _(s.clientX);
    }
    function Ke(s, n, c) {
      H.send({ type: "START_DRAG_REPO", repo: n, fromList: c }), s.dataTransfer && (s.dataTransfer.effectAllowed = "move", s.dataTransfer.setData(vt, n.full_name), s.dataTransfer.setData("text/plain", `${n.full_name}:${c || "uncategorized"}`)), window.addEventListener("wheel", h, { passive: !1 });
    }
    function at() {
      H.send({ type: "END_DRAG_REPO" }), B(), window.removeEventListener("wheel", h);
    }
    function ct(s, n) {
      !a.active || !Z.value && !Array.from(s.dataTransfer?.types || []).includes(vt) || (s.preventDefault(), s.dataTransfer && (s.dataTransfer.dropEffect = "move"), H.send({ type: "HOVER_TARGET_COLUMN", columnId: n }));
    }
    function dt(s, n) {
      const c = s.currentTarget;
      c && s.relatedTarget instanceof Node && c.contains(s.relatedTarget) || ie.value === n && H.send({ type: "HOVER_TARGET_COLUMN", columnId: null });
    }
    async function pt(s, n) {
      s.preventDefault();
      const c = Z.value?.full_name || Rt(s.dataTransfer);
      at(), !(!a.active || !c) && await W.moveRepoToList(c, n === "uncategorized" ? V.UNCAT : n);
    }
    function lt(s) {
      St.open(s.full_name, void 0, s);
    }
    function $t(s) {
      window.open(s, "_blank", "noopener,noreferrer");
    }
    function ht(s) {
      if (!s) return "";
      try {
        const n = new Date(s);
        return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return et(() => {
      window.addEventListener("pointerdown", De), window.addEventListener("keydown", p);
    }), tt(() => {
      C(), H.send({ type: "RESET_IDLE" }), B(), window.removeEventListener("wheel", h), window.removeEventListener("pointerdown", De), window.removeEventListener("keydown", p);
    }), (s, n) => (o(), i("div", uo, [
      e("section", {
        class: F(["default-shelf-area", { "is-collapsed": g.value, "drop-active": ie.value === "uncategorized" }]),
        "data-gh-list-drop": t(V).UNCAT,
        onDragover: n[6] || (n[6] = (c) => ct(c, "uncategorized")),
        onDragleave: n[7] || (n[7] = (c) => dt(c, "uncategorized")),
        onDrop: n[8] || (n[8] = (c) => pt(c, "uncategorized"))
      }, [
        e("header", po, [
          e("div", ho, [
            n[26] || (n[26] = e("span", { class: "shelf-icon" }, "📁", -1)),
            n[27] || (n[27] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", go, r(t(W).filteredUncatRepos.length), 1),
            n[28] || (n[28] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消本地分组归属；单排 10 个一页）", -1))
          ]),
          e("div", mo, [
            t(W).filteredUncatRepos.length > t(ue).pageSize ? (o(), i("div", fo, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(W).uncatPage <= 1,
                title: "上一页",
                onClick: n[0] || (n[0] = //@ts-ignore
                (...c) => t(W).prevUncatPage && t(W).prevUncatPage(...c))
              }, "‹", 8, vo),
              e("span", bo, r(t(W).uncatPage) + " / " + r(t(W).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(W).uncatPage >= t(W).uncatTotalPages,
                title: "下一页",
                onClick: n[1] || (n[1] = //@ts-ignore
                (...c) => t(W).nextUncatPage && t(W).nextUncatPage(...c))
              }, "›", 8, yo)
            ])) : $("", !0),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              title: "刷新 Star 列表",
              disabled: m.value,
              "aria-busy": m.value,
              onClick: n[2] || (n[2] = (c) => t(V).refreshRepositories())
            }, [
              e("span", {
                class: F({ spinning: m.value })
              }, "🔄", 2),
              e("span", null, r(m.value ? "读取中…" : "刷新"), 1)
            ], 8, _o),
            t(W).filteredUncatRepos.length ? (o(), i("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: g.value ? "展开托盘" : "收起托盘",
              onClick: b
            }, r(g.value ? "展开 ▼" : "收起 ▲"), 9, wo)) : $("", !0)
          ])
        ]),
        f.value ? ge((o(), i("div", ko, [
          (o(), i(Y, null, K(6, (c) => e("div", {
            key: "skel-shelf-" + c,
            class: "repo gh-card shelf-card skel-card"
          }, [...n[29] || (n[29] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ], 512)), [
          [Qe, !g.value]
        ]) : t(W).filteredUncatRepos.length ? ge((o(), i("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: u,
          class: "shelf-cards-scroll",
          onWheel: G
        }, [
          (o(!0), i(Y, null, K(t(W).pagedUncatRepos, (c) => (o(), i("article", {
            key: c.full_name,
            class: F(["repo gh-card shelf-card", { "card-dragging": Z.value?.full_name === c.full_name }]),
            draggable: "true",
            onClick: (v) => lt(c),
            onDragstart: (v) => Ke(v, c, null),
            onDragend: at,
            onContextmenu: (v) => ye(v, c, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: Q((v) => ye(v, c, null), ["stop"])
            }, "⋮", 8, $o),
            e("div", Go, [
              e("img", {
                class: "gh-owner-avatar",
                src: c.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: n[3] || (n[3] = (v) => v.target.src = "assets/github-star.svg")
              }, null, 40, Mo),
              e("a", {
                href: c.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: c.full_name,
                onClick: n[4] || (n[4] = Q(() => {
                }, ["stop"]))
              }, [
                e("span", Ro, r(c.owner?.login || c.full_name.split("/")[0]) + "/", 1),
                te(r(c.name), 1)
              ], 8, To)
            ]),
            e("div", So, [
              e("div", Lo, [
                n[30] || (n[30] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                c.topics && c.topics.length ? (o(), i(Y, { key: 0 }, [
                  (o(!0), i(Y, null, K(c.topics.slice(0, 2), (v) => (o(), i("span", {
                    key: v,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + v
                  }, " #" + r(v), 9, Do))), 128)),
                  c.topics.length > 2 ? (o(), i("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: c.topics.slice(2).map((v) => "#" + v).join(" ")
                  }, " +" + r(c.topics.length - 2), 9, Ao)) : $("", !0)
                ], 64)) : $("", !0)
              ]),
              e("p", {
                class: "desc",
                title: c.description || ""
              }, r(c.description || "暂无描述"), 9, xo)
            ]),
            e("div", Eo, [
              e("span", Ho, "★ " + r(c.stargazers_count), 1),
              c.language ? (o(), i("span", Uo, r(c.language), 1)) : $("", !0),
              e("span", Io, "更新 " + r(ht(c.updated_at)), 1)
            ])
          ], 42, Co))), 128)),
          t(W).uncatPage < t(W).uncatTotalPages ? (o(), i("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: n[5] || (n[5] = //@ts-ignore
            (...c) => t(W).nextUncatPage && t(W).nextUncatPage(...c))
          }, [
            e("div", No, [
              n[31] || (n[31] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              n[32] || (n[32] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", Po, r(t(W).uncatPage + 1) + " / " + r(t(W).uncatTotalPages) + " 页", 1)
            ])
          ])) : $("", !0)
        ], 544)), [
          [Qe, !g.value]
        ]) : g.value ? $("", !0) : (o(), i("p", Oo, r(t(ce).searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库"), 1))
      ], 42, co),
      k.value ? (o(), i("div", Fo, [
        e("button", {
          type: "button",
          class: "gh-drilldown-back-btn",
          title: "返回查看全部一级分组 (Esc)",
          onClick: n[9] || (n[9] = (c) => k.value = null)
        }, " ‹ 返回全部 "),
        n[33] || (n[33] = e("span", { class: "gh-drilldown-sep" }, "/", -1)),
        e("span", jo, "📁 " + r(k.value), 1),
        e("span", Bo, " (含 " + r(A.value) + " 个子分组) ", 1),
        e("button", {
          type: "button",
          class: "gh-drilldown-exit-btn",
          title: "退出下钻视图",
          onClick: n[10] || (n[10] = (c) => k.value = null)
        }, " ✕ ")
      ])) : $("", !0),
      e("div", {
        ref_key: "boardViewportRef",
        ref: l,
        class: "board-viewport",
        onWheel: d,
        onDragover: ne
      }, [
        m.value && !J.value.length ? (o(), i("div", Wo, [
          (o(), i(Y, null, K(4, (c) => e("div", {
            key: "skel-col-" + c,
            class: "board-column skel-column"
          }, [
            n[35] || (n[35] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", zo, [
              (o(), i(Y, null, K(3, (v) => e("div", {
                key: "skel-col-card-" + v,
                class: "repo gh-card skel-card"
              }, [...n[34] || (n[34] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (o(), i("div", Yo, [
          (o(!0), i(Y, null, K(J.value, (c) => (o(), i("section", {
            key: c.id,
            class: F(["board-column list-column", {
              "drop-active": ie.value === c.name,
              "col-dragging": ae.value === c.id,
              "col-hover-target": q.value === c.id
            }]),
            "data-gh-list-drop": c.name,
            onDragover: (v) => Z.value ? ct(v, c.name) : Re(v, c.id),
            onDragleave: (v) => Z.value ? dt(v, c.name) : We(v, c.id),
            onDrop: (v) => Z.value ? pt(v, c.name) : be(v, c.id)
          }, [
            e("header", {
              class: "column-header",
              title: S(c.name) ? `📁 ${c.name}（包含 ${x(c.name).length} 个子分组，点击下钻进入）` : "拖动此列可调换位置；右侧更多可重命名、置顶或删除"
            }, [
              e("div", {
                class: F(["column-title-group", { "is-parent-folder": S(c.name) && !k.value }]),
                onClick: (v) => S(c.name) && !k.value && L(c.name)
              }, [
                n[36] || (n[36] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: F(["column-title", { "title-clickable": S(c.name) && !k.value }]),
                  title: c.description || "本地分组: " + c.name
                }, " 📁 " + r(c.name), 11, Xo),
                c.pinned ? (o(), i("span", Qo, "📌")) : $("", !0),
                e("span", Jo, r(t(W).getReposForList(c.name).length), 1),
                S(c.name) && !k.value ? (o(), i("span", Zo, r(x(c.name).length) + "个子分组 › ", 1)) : $("", !0)
              ], 10, Ko),
              e("div", en, [
                e("button", {
                  type: "button",
                  class: "col-more-btn col-drag-handle",
                  title: "按住拖动可调换分组位置；点击打开更多操作",
                  draggable: "true",
                  "aria-label": "分组操作与拖拽手柄",
                  onDragstart: (v) => nt(v, c),
                  onDragend: Be,
                  onClick: Q((v) => Fe(v, c), ["stop"])
                }, "⋮", 40, tn)
              ])
            ], 8, qo),
            e("div", sn, [
              (o(!0), i(Y, null, K(t(W).getReposForList(c.name), (v) => (o(), i("article", {
                key: v.full_name,
                class: F(["repo gh-card", { "card-dragging": Z.value?.full_name === v.full_name }]),
                draggable: "true",
                onClick: (O) => lt(v),
                onDragstart: (O) => Ke(O, v, c.name),
                onDragend: at,
                onContextmenu: (O) => ye(O, v, c.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: Q((O) => ye(O, v, c.name), ["stop"])
                }, "⋮", 8, nn),
                e("div", an, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: v.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: n[11] || (n[11] = (O) => O.target.src = "assets/github-star.svg")
                  }, null, 40, ln),
                  e("a", {
                    href: v.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: v.full_name,
                    onClick: n[12] || (n[12] = Q(() => {
                    }, ["stop"]))
                  }, [
                    e("span", un, r(v.owner?.login || v.full_name.split("/")[0]) + "/", 1),
                    te(r(v.name), 1)
                  ], 8, rn)
                ]),
                e("div", cn, [
                  e("div", dn, [
                    e("span", {
                      class: "gh-badge-folder",
                      title: "属于列表: " + c.name
                    }, [
                      te(" 📁 " + r(c.name) + " ", 1),
                      e("span", {
                        class: "btn-inline-remove",
                        title: "从该列表中移出",
                        role: "button",
                        tabindex: "0",
                        onClick: Q((O) => t(W).removeRepoFromList(v.full_name, c.name), ["stop"])
                      }, "×", 8, hn)
                    ], 8, pn),
                    v.topics && v.topics.length ? (o(), i(Y, { key: 0 }, [
                      (o(!0), i(Y, null, K(v.topics.slice(0, 2), (O) => (o(), i("span", {
                        key: O,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + O
                      }, " #" + r(O), 9, gn))), 128)),
                      v.topics.length > 2 ? (o(), i("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: v.topics.slice(2).map((O) => "#" + O).join(" ")
                      }, " +" + r(v.topics.length - 2), 9, mn)) : $("", !0)
                    ], 64)) : $("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: v.description || ""
                  }, r(v.description || "暂无描述"), 9, fn)
                ]),
                e("div", vn, [
                  e("span", bn, "★ " + r(v.stargazers_count), 1),
                  v.language ? (o(), i("span", yn, r(v.language), 1)) : $("", !0),
                  e("span", _n, "更新 " + r(ht(v.updated_at)), 1)
                ])
              ], 42, on))), 128)),
              t(W).getReposForList(c.name).length ? $("", !0) : (o(), i("div", wn, [...n[37] || (n[37] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, Vo))), 128)),
          e("section", kn, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              title: k.value ? `在「${k.value}」下新建子分组` : "新建本地分组",
              onClick: I
            }, [
              n[38] || (n[38] = e("span", { class: "plus-icon" }, "＋", -1)),
              e("span", null, r(k.value ? `新建 ${k.value} 子分组` : "新建本地分组"), 1)
            ], 8, Cn)
          ])
        ]))
      ], 544),
      (o(), he(ut, { to: "body" }, [
        z.visible && z.repo ? (o(), i("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Je({ left: `${z.x}px`, top: `${z.y}px` }),
          onClick: n[22] || (n[22] = Q(() => {
          }, ["stop"])),
          onContextmenu: n[23] || (n[23] = Q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: F(["gh-menu-has-sub", { "is-active": ee.value === "folder" }]),
            onMouseenter: n[15] || (n[15] = (c) => ee.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: n[13] || (n[13] = Q((c) => ee.value = ee.value === "folder" ? null : "folder", ["stop"]))
            }, [...n[39] || (n[39] = [
              e("span", null, "移动/加入本地分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: F(["gh-sub-flyout", { "flyout-left": de.value }]),
              onClick: n[14] || (n[14] = Q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: ze
              }, " 设为未分类 "),
              (o(!0), i(Y, null, K(t(W).lists, (c) => (o(), i("button", {
                key: c.id,
                class: F(["fo-cover-menu-item", { primary: t(Ze)(z.repo.full_name).includes(c.name) }]),
                type: "button",
                onClick: (v) => Se(c.name)
              }, r(t(Ze)(z.repo.full_name).includes(c.name) ? "✓ " : "  ") + "📁 " + r(c.name), 11, $n))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[16] || (n[16] = (c) => ee.value = null),
            onClick: n[17] || (n[17] = (c) => lt(z.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[18] || (n[18] = (c) => ee.value = null),
            onClick: Ye
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[19] || (n[19] = (c) => ee.value = null),
            onClick: Ve
          }, " 复制克隆命令 (git clone) ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[20] || (n[20] = (c) => ee.value = null),
            onClick: qe
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: n[21] || (n[21] = (c) => ee.value = null),
            onClick: Le
          }, " 在 GitHub 打开 ", 32)
        ], 36)) : $("", !0),
        P.visible && P.list ? (o(), i("div", {
          key: 1,
          class: "fo-cover-context-menu gh-list-col-menu",
          style: Je({ left: `${P.x}px`, top: `${P.y}px` }),
          onClick: n[24] || (n[24] = Q(() => {
          }, ["stop"])),
          onContextmenu: n[25] || (n[25] = Q(() => {
          }, ["prevent"]))
        }, [
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: st
          }, " ✏️ 重命名分组 "),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onClick: je
          }, [
            e("span", null, r(P.list?.pinned ? "📍 取消置顶" : "📌 置顶此分组"), 1)
          ]),
          e("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onClick: ot
          }, " 🗑️ 删除分组 ")
        ], 36)) : $("", !0)
      ]))
    ]));
  }
}), Mn = /* @__PURE__ */ Te(Gn, [["__scopeId", "data-v-ae416c99"]]);
function Tn(y) {
  const a = y.subject?.url, l = y.repository?.html_url || "https://github.com";
  if (!a) return l;
  const u = y.subject?.type;
  return u === "Issue" ? a.replace("https://api.github.com/repos/", "https://github.com/") : u === "PullRequest" ? a.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : u === "Release" ? a.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : a.replace("https://api.github.com/repos/", "https://github.com/");
}
function Rn(y) {
  try {
    const a = Date.now() - new Date(y).getTime();
    if (a < 6e4) return "刚刚";
    const l = Math.floor(a / 6e4);
    if (l < 60) return `${l} 分钟前`;
    const u = Math.floor(l / 60);
    if (u < 24) return `${u} 小时前`;
    const g = Math.floor(u / 24);
    return g < 30 ? `${g} 天前` : y.slice(5, 10);
  } catch {
    return "";
  }
}
const U = ve({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), Ce = {
  open() {
    U.isOpen = !0, (!U.items.length || Date.now() - U.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    U.isOpen = !1;
  },
  toggle() {
    U.isOpen ? this.close() : this.open();
  },
  setTab(y) {
    U.activeKind = y;
  },
  async refresh() {
    const y = V.token?.trim();
    if (!y) {
      U.items = [], U.unreadCount = 0, U.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    U.loading = !0, U.error = "";
    try {
      const a = {
        ...Oe(y),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, l = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: a
      });
      if (!l.ok)
        throw l.status === 401 ? new Error("GitHub Token 无效或已过期") : l.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${l.status})`);
      const u = await l.json();
      if (!Array.isArray(u))
        throw new Error("GitHub 返回数据异常");
      const g = u.map((b) => ({
        id: String(b.id),
        unread: !!b.unread,
        reason: String(b.reason || ""),
        updatedAt: b.updated_at,
        formattedTime: Rn(b.updated_at),
        subject: {
          title: String(b.subject?.title || "未命名通知"),
          url: String(b.subject?.url || ""),
          type: String(b.subject?.type || "Issue"),
          latestCommentUrl: b.subject?.latest_comment_url
        },
        repository: {
          id: Number(b.repository?.id || 0),
          name: String(b.repository?.name || ""),
          fullName: String(b.repository?.full_name || ""),
          owner: {
            login: String(b.repository?.owner?.login || ""),
            avatarUrl: b.repository?.owner?.avatar_url
          },
          htmlUrl: String(b.repository?.html_url || "")
        },
        url: String(b.url || ""),
        htmlUrl: Tn(b)
      }));
      U.items = g, U.unreadCount = g.filter((b) => b.unread).length, U.lastFetchedAt = Date.now();
    } catch (a) {
      console.warn("[GitHubNotifications] 读取失败:", a), U.error = a?.message || "网络请求异常";
    } finally {
      U.loading = !1;
    }
  },
  openTarget(y) {
    typeof window < "u" && window.open(y.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, w = ve({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function Ne(y) {
  try {
    const a = Date.now() - new Date(y).getTime(), l = Math.floor(a / 6e4);
    if (l < 1) return "刚刚";
    if (l < 60) return `${l}分钟前`;
    const u = Math.floor(l / 60);
    if (u < 24) return `${u}小时前`;
    const g = Math.floor(u / 24);
    if (g < 30) return `${g}天前`;
    const b = new Date(y);
    return `${b.getFullYear()}/${b.getMonth() + 1}/${b.getDate()}`;
  } catch {
    return "";
  }
}
function Pe(y) {
  switch (y) {
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
function Sn(y) {
  return y ? {
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
  }[y] || (y.startsWith(":") && y.endsWith(":") ? y.slice(1, -1) : y) : "";
}
function rt(y) {
  if (!Array.isArray(y)) return [];
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
  return y.map((l) => ({
    emoji: a[l.content] || l.content,
    count: l.reactors?.totalCount || l.users?.totalCount || 0
  })).filter((l) => l.count > 0);
}
function _t(y) {
  if (!y || typeof y != "object") return [];
  const a = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, l = [];
  for (const [u, g] of Object.entries(a)) {
    const b = Number(y[u] || 0);
    b > 0 && l.push({ emoji: g, count: b });
  }
  return l;
}
async function wt(y, a) {
  if (!y) return "";
  try {
    const l = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...Oe(a),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: y, mode: "gfm" })
    });
    if (l.ok)
      return await l.text();
  } catch {
  }
  return fe.renderMarkdown(y);
}
async function Ln(y, a, l, u) {
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
    const b = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...Oe(u),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: g,
        variables: { owner: y, name: a, num: l }
      })
    });
    if (!b.ok) return null;
    const m = (await b.json())?.data?.repository?.discussion;
    if (!m) return null;
    let f = 0;
    const k = (m.comments?.nodes || []).map((x) => {
      const S = x.replies?.nodes || [];
      f += S.length;
      const A = S.map((L) => ({
        id: L.id,
        author: {
          login: L.author?.login || "匿名",
          avatarUrl: L.author?.avatarUrl || "",
          association: Pe(L.authorAssociation)
        },
        createdAt: L.createdAt,
        formattedTime: Ne(L.createdAt),
        body: L.body || "",
        bodyHtml: L.bodyHTML || (L.body ? fe.renderMarkdown(L.body) : ""),
        reactions: rt(L.reactionGroups)
      }));
      return {
        id: x.id,
        author: {
          login: x.author?.login || "匿名",
          avatarUrl: x.author?.avatarUrl || "",
          association: Pe(x.authorAssociation)
        },
        createdAt: x.createdAt,
        formattedTime: Ne(x.createdAt),
        body: x.body || "",
        bodyHtml: x.bodyHTML || (x.body ? fe.renderMarkdown(x.body) : "<p>（评论内容为空）</p>"),
        reactions: rt(x.reactionGroups),
        replies: A
      };
    }), D = m.body || "", R = m.bodyHTML && m.bodyHTML.trim().length > 10 ? m.bodyHTML : D ? fe.renderMarkdown(D) : "<p>（主贴内容为空）</p>";
    return {
      title: m.title,
      number: l,
      state: "discussion",
      category: m.category ? {
        name: m.category.name,
        emoji: Sn(m.category.emoji)
      } : void 0,
      author: {
        login: m.author?.login || "未知",
        avatarUrl: m.author?.avatarUrl || "",
        association: Pe(m.authorAssociation)
      },
      createdAt: m.createdAt,
      formattedTime: Ne(m.createdAt),
      body: D,
      bodyHtml: R,
      htmlUrl: m.url,
      commentsCount: m.comments?.totalCount || k.length,
      totalRepliesCount: f,
      comments: k,
      reactions: rt(m.reactionGroups)
    };
  } catch {
    return null;
  }
}
const it = {
  async open(y) {
    w.isOpen = !0, w.loading = !0, w.error = "", w.data = null, w.notificationItem = y;
    const a = V.token?.trim() || "", l = {
      ...Oe(a),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const u = y.subject?.url, g = y.subject?.type, b = y.repository?.fullName || "", [G, m] = b.split("/"), f = u?.match(/\/(\d+)$/), k = f ? Number(f[1]) : void 0;
      if (g === "Discussion" && G && m && k) {
        const D = await Ln(G, m, k, a);
        if (D) {
          w.data = {
            notificationId: y.id,
            title: D.title || y.subject.title,
            number: k,
            state: "discussion",
            category: D.category,
            author: D.author || { login: y.repository.owner.login, avatarUrl: y.repository.owner.avatarUrl || "" },
            createdAt: D.createdAt || y.updatedAt,
            formattedTime: D.formattedTime || y.formattedTime,
            body: D.body || "",
            bodyHtml: D.bodyHtml || (D.body ? fe.renderMarkdown(D.body) : ""),
            htmlUrl: D.htmlUrl || y.htmlUrl,
            commentsCount: D.commentsCount || 0,
            totalRepliesCount: D.totalRepliesCount || 0,
            comments: D.comments || [],
            reactions: D.reactions || [],
            repositoryFullName: b,
            type: "Discussion"
          };
          return;
        }
      }
      if (u) {
        const D = await fetch(u, { headers: l, cache: "no-store" });
        if (D.ok) {
          const R = await D.json();
          let x = [];
          if (R.comments_url && R.comments > 0)
            try {
              const L = await fetch(`${R.comments_url}?per_page=50`, { headers: l, cache: "no-store" });
              if (L.ok) {
                const J = await L.json();
                Array.isArray(J) && (x = await Promise.all(
                  J.map(async (I) => {
                    const H = I.body_html || (I.body ? await wt(I.body, a) : "");
                    return {
                      id: I.id,
                      author: {
                        login: I.user?.login || "匿名",
                        avatarUrl: I.user?.avatar_url || "",
                        association: Pe(I.author_association)
                      },
                      createdAt: I.created_at,
                      formattedTime: Ne(I.created_at),
                      body: I.body || "",
                      bodyHtml: H,
                      reactions: _t(I.reactions)
                    };
                  })
                ));
              }
            } catch (L) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", L);
            }
          const S = R.body || "";
          let A = R.body_html || "";
          !A && S && (A = await wt(S, a)), !A && S && (A = fe.renderMarkdown(S)), w.data = {
            notificationId: y.id,
            title: R.title || R.name || y.subject.title,
            number: R.number || k,
            state: R.merged ? "merged" : R.state || R.conclusion || "open",
            author: {
              login: R.user?.login || R.author?.login || y.repository.owner.login,
              avatarUrl: R.user?.avatar_url || R.author?.avatar_url || y.repository.owner.avatarUrl || "",
              association: Pe(R.author_association)
            },
            createdAt: R.created_at || R.published_at || y.updatedAt,
            formattedTime: Ne(R.created_at || R.published_at || y.updatedAt),
            body: S,
            bodyHtml: A || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: R.html_url || y.htmlUrl,
            commentsCount: typeof R.comments == "number" ? R.comments : x.length,
            comments: x,
            reactions: _t(R.reactions),
            repositoryFullName: b,
            type: g || "Issue"
          };
          return;
        }
      }
      w.data = {
        notificationId: y.id,
        title: y.subject.title,
        number: k,
        state: "open",
        author: {
          login: y.repository.owner.login,
          avatarUrl: y.repository.owner.avatarUrl || ""
        },
        createdAt: y.updatedAt,
        formattedTime: y.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: y.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: b,
        type: g || "通知"
      };
    } catch (u) {
      console.warn("[GitHubNotificationDetail] 读取异常:", u), w.error = u?.message || "网络请求异常";
    } finally {
      w.loading = !1;
    }
  },
  close() {
    w.isOpen = !1, w.data = null, w.error = "";
  }
}, Dn = { class: "vue-gh-notification-panel-wrapper" }, An = { class: "gh-msg-header" }, xn = { class: "gh-msg-account" }, En = { class: "gh-msg-subtitle" }, Hn = {
  class: "gh-msg-tabs",
  role: "tablist"
}, Un = ["onClick"], In = { class: "gh-msg-list" }, Nn = {
  key: 0,
  class: "gh-msg-loading"
}, Pn = {
  key: 1,
  class: "gh-msg-error"
}, On = {
  key: 2,
  class: "gh-msg-empty"
}, Fn = ["onClick"], jn = { class: "gh-card-indicator-col" }, Bn = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, Wn = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, zn = { class: "gh-card-type-col" }, Yn = ["title"], Vn = { class: "gh-card-main-col" }, qn = { class: "gh-card-repo-row" }, Kn = ["title"], Xn = { class: "gh-card-reason-tag" }, Qn = { class: "gh-card-time" }, Jn = ["title"], Zn = { class: "gh-card-footer-row" }, ea = { class: "gh-card-type-label" }, ta = ["onClick"], sa = /* @__PURE__ */ Me({
  __name: "GitHubNotificationPanel",
  setup(y) {
    const a = N(null), l = se(() => [
      { kind: "all", label: "所有", count: U.items.length },
      { kind: "unread", label: "未读", count: U.items.filter((S) => S.unread).length },
      { kind: "mention", label: "提及", count: U.items.filter((S) => S.reason === "mention").length },
      { kind: "author", label: "作者", count: U.items.filter((S) => S.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: U.items.filter((S) => S.reason === "ci_activity" || S.subject.type === "CheckSuite").length }
    ]), u = se(() => {
      const S = U.items;
      switch (U.activeKind) {
        case "unread":
          return S.filter((A) => A.unread);
        case "mention":
          return S.filter((A) => A.reason === "mention");
        case "author":
          return S.filter((A) => A.reason === "author");
        case "ci":
          return S.filter((A) => A.reason === "ci_activity" || A.subject.type === "CheckSuite");
        default:
          return S;
      }
    });
    function g(S, A) {
      if (A === "ci_activity" || S === "CheckSuite")
        return "⚡";
      switch (S) {
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
    function b(S) {
      switch (S) {
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
          return S || "通知";
      }
    }
    function G() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function m() {
      Ce.refresh();
    }
    function f() {
      Ce.close();
    }
    function k(S) {
      it.open(S);
    }
    function D(S) {
      Ce.openTarget(S);
    }
    function R(S) {
      if (!U.isOpen) return;
      const A = S.target;
      !a.value?.contains(A) && !A?.closest("#gh-header-msg-center-btn") && Ce.close();
    }
    function x(S) {
      S.key === "Escape" && U.isOpen && Ce.close();
    }
    return et(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", R), window.addEventListener("keydown", x));
    }), tt(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", R), window.removeEventListener("keydown", x));
    }), (S, A) => (o(), i("div", Dn, [
      t(U).isOpen ? (o(), i("section", {
        key: 0,
        ref_key: "panelRef",
        ref: a,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: A[0] || (A[0] = Q(() => {
        }, ["stop"]))
      }, [
        e("header", An, [
          e("div", xn, [
            A[2] || (A[2] = e("div", { class: "gh-msg-octo-avatar" }, [
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
              A[1] || (A[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", En, " 共 " + r(t(U).items.length) + " 条通知 · " + r(t(U).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          A[3] || (A[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: G
          }, " ↗ "),
          e("button", {
            type: "button",
            class: F(["gh-panel-btn", { "is-spinning": t(U).loading }]),
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
        e("nav", Hn, [
          (o(!0), i(Y, null, K(l.value, (L) => (o(), i("button", {
            key: L.kind,
            type: "button",
            class: F(["gh-msg-tab", { active: t(U).activeKind === L.kind }]),
            onClick: (J) => t(U).activeKind = L.kind
          }, [
            te(r(L.label) + " ", 1),
            L.count > 0 ? (o(), i("span", {
              key: 0,
              class: F(["gh-tab-pill", { "is-unread-pill": L.kind === "unread" }])
            }, r(L.count), 3)) : $("", !0)
          ], 10, Un))), 128))
        ]),
        e("div", In, [
          t(U).loading && !t(U).items.length ? (o(), i("div", Nn, [...A[4] || (A[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(U).error ? (o(), i("div", Pn, [
            A[5] || (A[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, r(t(U).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: m
            }, "重试")
          ])) : u.value.length === 0 ? (o(), i("div", On, [...A[6] || (A[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (o(!0), i(Y, { key: 3 }, K(u.value, (L) => (o(), i("article", {
            key: L.id,
            class: F(["gh-notification-card", { "is-unread": L.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (J) => k(L)
          }, [
            e("div", jn, [
              L.unread ? (o(), i("span", Bn)) : (o(), i("span", Wn))
            ]),
            e("div", zn, [
              e("span", {
                class: "gh-type-badge",
                title: L.subject.type
              }, r(g(L.subject.type, L.reason)), 9, Yn)
            ]),
            e("div", Vn, [
              e("div", qn, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: L.repository.fullName
                }, r(L.repository.fullName), 9, Kn),
                e("span", Xn, r(b(L.reason)), 1),
                e("time", Qn, r(L.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: L.subject.title
              }, r(L.subject.title), 9, Jn),
              e("div", Zn, [
                e("span", ea, r(L.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: Q((J) => D(L), ["stop"])
                }, "在网页打开 ↗", 8, ta)
              ])
            ])
          ], 10, Fn))), 128))
        ])
      ], 512)) : $("", !0)
    ]));
  }
}), oa = /* @__PURE__ */ Te(sa, [["__scopeId", "data-v-9a98e294"]]), na = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, aa = ["aria-label"], la = { class: "gh-modal-title-wrap" }, ra = { class: "gh-modal-octo-icon" }, ia = ["href"], ua = { class: "gh-owner" }, ca = { class: "gh-name" }, da = {
  key: 1,
  class: "gh-modal-repo-name"
}, pa = { class: "gh-name" }, ha = { class: "gh-modal-actions" }, ga = { class: "gh-modal-content" }, ma = {
  key: 0,
  class: "gh-content-loading"
}, fa = {
  key: 1,
  class: "gh-content-error"
}, va = { class: "gh-discussion-title-header" }, ba = { class: "gh-discussion-h1" }, ya = {
  key: 0,
  class: "gh-discussion-num"
}, _a = { class: "gh-discussion-sub-meta" }, wa = {
  key: 0,
  class: "gh-category-pill"
}, ka = {
  key: 0,
  class: "cat-emoji"
}, Ca = {
  key: 1,
  class: "gh-category-pill"
}, $a = { class: "gh-sub-author" }, Ga = { class: "gh-sub-verb" }, Ma = {
  key: 2,
  class: "gh-sub-comments-count"
}, Ta = { class: "gh-op-post-card" }, Ra = { class: "gh-op-post-head" }, Sa = { class: "gh-op-author-left" }, La = ["src"], Da = { class: "gh-op-meta" }, Aa = { class: "gh-op-name-row" }, xa = { class: "gh-op-name" }, Ea = {
  key: 0,
  class: "gh-role-pill"
}, Ha = { class: "gh-op-time" }, Ua = ["innerHTML"], Ia = {
  key: 0,
  class: "gh-reactions-bar"
}, Na = { class: "rx-emoji" }, Pa = { class: "rx-count" }, Oa = {
  key: 0,
  class: "gh-comments-block"
}, Fa = { class: "gh-comments-header" }, ja = { class: "gh-comments-count-pill" }, Ba = { class: "gh-comments-feed" }, Wa = { class: "gh-comment-head" }, za = ["src"], Ya = { class: "gh-comment-meta" }, Va = { class: "gh-comment-author" }, qa = {
  key: 0,
  class: "gh-role-pill small"
}, Ka = { class: "gh-comment-time" }, Xa = ["innerHTML"], Qa = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, Ja = { class: "rx-emoji" }, Za = { class: "rx-count" }, el = {
  key: 1,
  class: "gh-comment-replies-thread"
}, tl = { class: "gh-replies-thread-title" }, sl = { class: "gh-reply-head" }, ol = ["src"], nl = { class: "gh-reply-meta" }, al = { class: "gh-reply-author" }, ll = {
  key: 0,
  class: "gh-role-pill tiny"
}, rl = { class: "gh-reply-time" }, il = ["innerHTML"], ul = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, cl = { class: "rx-emoji" }, dl = { class: "rx-count" }, pl = {
  key: 1,
  class: "gh-no-comments"
}, hl = /* @__PURE__ */ Me({
  __name: "GitHubNotificationDetailDrawer",
  setup(y) {
    const a = N(null), l = N(null), u = N(null);
    let g = !1, b = 0, G = 0, m = 0, f = 0, k = () => {
    };
    const D = se(() => (w.data?.repositoryFullName || w.notificationItem?.repository.fullName || "").split("/")[0] || ""), R = se(() => {
      const E = w.data?.repositoryFullName || w.notificationItem?.repository.fullName || "";
      return E.split("/")[1] || E;
    }), x = se(() => {
      if (!w.data) return "";
      const E = w.data.bodyHtml?.trim() || "";
      if (E.length > 20) return E;
      const j = w.data.body?.trim() || "";
      return j.length > 0 ? fe.renderMarkdown(j) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), S = se(() => u.value ? {
      position: "fixed",
      left: `${u.value.x}px`,
      top: `${u.value.y}px`,
      transform: "none"
    } : {});
    me(
      () => w.isOpen,
      (E) => {
        E && (u.value = null, gt(() => {
          l.value && (l.value.scrollTop = 0);
        }));
      }
    ), me(
      () => w.data,
      (E) => {
        E && gt(() => {
          l.value && (l.value.scrollTop = 0);
        });
      }
    );
    function A(E) {
      if (E.target.closest("button, a, input")) return;
      k();
      const j = a.value;
      if (!j || !w.isOpen) return;
      g = !0;
      const B = j.getBoundingClientRect();
      m = B.left, f = B.top, b = E.clientX, G = E.clientY, u.value = { x: m, y: f };
      const P = (ee) => {
        if (!g) return;
        const de = ee.clientX - b, ae = ee.clientY - G;
        u.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, m + de)),
          y: Math.max(10, Math.min(window.innerHeight - 80, f + ae))
        };
      }, z = () => {
        g = !1, window.removeEventListener("mousemove", P), window.removeEventListener("mouseup", z);
      };
      k = z, window.addEventListener("mousemove", P), window.addEventListener("mouseup", z);
    }
    function L() {
      it.close();
    }
    function J() {
      const E = w.data?.htmlUrl || w.notificationItem?.htmlUrl;
      E && typeof window < "u" && window.open(E, "_blank", "noopener,noreferrer");
    }
    function I(E) {
      const B = E.target?.closest("a");
      B && B.href && (E.preventDefault(), E.stopPropagation(), window.open(B.href, "_blank", "noopener,noreferrer"));
    }
    function H() {
      w.notificationItem && it.open(w.notificationItem);
    }
    function Z(E) {
      switch (E) {
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
    function oe(E) {
      switch (E) {
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
          return E || "通知详情";
      }
    }
    function ie(E) {
      switch (E) {
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
          return E || "";
      }
    }
    function re(E) {
      E.key === "Escape" && w.isOpen && L();
    }
    return et(() => {
      Lt(), window.addEventListener("keydown", re);
    }), tt(() => {
      window.removeEventListener("keydown", re), k();
    }), (E, j) => (o(), he(ut, { to: "body" }, [
      t(w).isOpen ? (o(), i("div", na, [
        e("div", {
          ref_key: "windowRef",
          ref: a,
          class: "gh-nonmodal-window",
          style: Je(S.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(w).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: A
          }, [
            e("div", la, [
              e("span", ra, r(Z(t(w).data?.type || t(w).notificationItem?.subject.type)), 1),
              t(w).data?.htmlUrl || t(w).notificationItem?.htmlUrl ? (o(), i("a", {
                key: 0,
                href: t(w).data?.htmlUrl || t(w).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", ua, r(D.value), 1),
                j[0] || (j[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", ca, r(R.value), 1),
                j[1] || (j[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, ia)) : (o(), i("span", da, [
                e("strong", pa, r(t(w).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", ha, [
              t(w).data?.state ? (o(), i("span", {
                key: 0,
                class: F(["gh-detail-state-pill", t(w).data.state])
              }, r(ie(t(w).data.state)), 3)) : $("", !0),
              t(w).data?.htmlUrl || t(w).notificationItem?.htmlUrl ? (o(), i("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: J
              }, " 在网页打开 ↗ ")) : $("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: L
              }, " ✕ ")
            ])
          ], 32),
          e("div", ga, [
            t(w).loading ? (o(), i("div", ma, [
              j[2] || (j[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + r(t(w).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(w).error ? (o(), i("div", fa, [
              j[3] || (j[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, r(t(w).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: H
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: J
                }, "在 GitHub 打开 ↗")
              ])
            ])) : t(w).data ? (o(), i("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: l,
              class: "gh-detail-scrollable",
              onClick: I
            }, [
              e("div", va, [
                e("h1", ba, [
                  te(r(t(w).data.title) + " ", 1),
                  t(w).data.number ? (o(), i("span", ya, "#" + r(t(w).data.number), 1)) : $("", !0)
                ]),
                e("div", _a, [
                  t(w).data.category ? (o(), i("span", wa, [
                    t(w).data.category.emoji ? (o(), i("span", ka, r(t(w).data.category.emoji), 1)) : $("", !0),
                    e("span", null, r(t(w).data.category.name), 1)
                  ])) : (o(), i("span", Ca, r(oe(t(w).data.type)), 1)),
                  e("span", $a, r(t(w).data.author.login), 1),
                  e("span", Ga, "发布于 " + r(t(w).data.formattedTime), 1),
                  t(w).data.commentsCount ? (o(), i("span", Ma, [
                    te(" · " + r(t(w).data.commentsCount) + " 条讨论主题 ", 1),
                    t(w).data.totalRepliesCount ? (o(), i(Y, { key: 0 }, [
                      te(" （含 " + r(t(w).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : $("", !0)
                  ])) : $("", !0)
                ])
              ]),
              e("article", Ta, [
                e("div", Ra, [
                  e("div", Sa, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(w).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, La),
                    e("div", Da, [
                      e("div", Aa, [
                        e("strong", xa, r(t(w).data.author.login), 1),
                        t(w).data.author.association ? (o(), i("span", Ea, r(t(w).data.author.association), 1)) : $("", !0)
                      ]),
                      e("time", Ha, r(t(w).data.formattedTime), 1)
                    ])
                  ]),
                  j[4] || (j[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                j[5] || (j[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: x.value
                }, null, 8, Ua),
                t(w).data.reactions?.length ? (o(), i("div", Ia, [
                  (o(!0), i(Y, null, K(t(w).data.reactions, (B) => (o(), i("span", {
                    key: B.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", Na, r(B.emoji), 1),
                    e("span", Pa, r(B.count), 1)
                  ]))), 128))
                ])) : $("", !0)
              ]),
              t(w).data.comments.length ? (o(), i("div", Oa, [
                e("div", Fa, [
                  j[6] || (j[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", ja, [
                    te(r(t(w).data.commentsCount) + " 条主题 ", 1),
                    t(w).data.totalRepliesCount ? (o(), i(Y, { key: 0 }, [
                      te(" · " + r(t(w).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : $("", !0)
                  ])
                ]),
                e("div", Ba, [
                  (o(!0), i(Y, null, K(t(w).data.comments, (B) => (o(), i("div", {
                    key: B.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", Wa, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: B.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, za),
                      e("div", Ya, [
                        e("span", Va, r(B.author.login), 1),
                        B.author.association ? (o(), i("span", qa, r(B.author.association), 1)) : $("", !0),
                        e("time", Ka, r(B.formattedTime), 1)
                      ])
                    ]),
                    j[7] || (j[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: B.bodyHtml
                    }, null, 8, Xa),
                    B.reactions?.length ? (o(), i("div", Qa, [
                      (o(!0), i(Y, null, K(B.reactions, (P) => (o(), i("span", {
                        key: P.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", Ja, r(P.emoji), 1),
                        e("span", Za, r(P.count), 1)
                      ]))), 128))
                    ])) : $("", !0),
                    B.replies?.length ? (o(), i("div", el, [
                      e("div", tl, [
                        e("span", null, "💬 " + r(B.replies.length) + " 条回复对话", 1)
                      ]),
                      (o(!0), i(Y, null, K(B.replies, (P) => (o(), i("div", {
                        key: P.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", sl, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: P.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, ol),
                          e("div", nl, [
                            e("strong", al, r(P.author.login), 1),
                            P.author.association ? (o(), i("span", ll, r(P.author.association), 1)) : $("", !0),
                            e("time", rl, r(P.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: P.bodyHtml
                        }, null, 8, il),
                        P.reactions?.length ? (o(), i("div", ul, [
                          (o(!0), i(Y, null, K(P.reactions, (z) => (o(), i("span", {
                            key: z.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", cl, r(z.emoji), 1),
                            e("span", dl, r(z.count), 1)
                          ]))), 128))
                        ])) : $("", !0)
                      ]))), 128))
                    ])) : $("", !0)
                  ]))), 128))
                ])
              ])) : (o(), i("div", pl, [...j[8] || (j[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : $("", !0)
          ])
        ], 12, aa)
      ])) : $("", !0)
    ]));
  }
}), gl = /* @__PURE__ */ Te(hl, [["__scopeId", "data-v-053c788c"]]), ml = [
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
], fl = ["inert"], vl = {
  key: 0,
  class: "muted small",
  role: "status"
}, bl = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, yl = { class: "gh-bili-layout" }, _l = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, wl = ["title"], kl = { class: "fo-sidebar-toggle-title" }, Cl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, $l = ["aria-expanded", "title"], Gl = { class: "fo-sidebar-toggle-chevron" }, Ml = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, Tl = { class: "fo-sidebar-sub-wrap" }, Rl = ["title"], Sl = { class: "fo-sidebar-sub-main" }, Ll = { class: "fo-sidebar-sub-text" }, Dl = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, Al = ["title"], xl = { class: "fo-sidebar-sub-main" }, El = { class: "fo-sidebar-sub-text" }, Hl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Ul = ["title"], Il = { class: "fo-sidebar-sub-main" }, Nl = { class: "fo-sidebar-sub-text" }, Pl = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Ol = ["title"], Fl = { class: "fo-sidebar-sub-main" }, jl = { class: "fo-sidebar-sub-text" }, Bl = { class: "gh-bili-sidebar-head" }, Wl = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, zl = { style: { color: "var(--dim)", "font-size": "9.5px" } }, Yl = ["title", "aria-label"], Vl = {
  class: "gh-bili-folder-list",
  id: "gh-folder-list"
}, ql = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, Kl = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Xl = {
  class: "card-fullscreen-gh-search gh-hero-search-box-wrap",
  id: "gh-head-search-wrap"
}, Ql = ["title"], Jl = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Zl = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, er = ["placeholder"], tr = ["title"], sr = { class: "gh-search-rule-icon" }, or = { class: "gh-search-rule-text" }, nr = ["title"], ar = ["title"], lr = { class: "gh-header-msg-label" }, rr = {
  key: 0,
  class: "gh-header-msg-badge"
}, ir = { class: "gh-settings-anchor" }, ur = ["aria-expanded", "aria-label", "title"], cr = {
  id: "vue-github-repositories-root",
  style: { flex: "1", "min-height": "0", display: "flex", "flex-direction": "column" }
}, dr = /* @__PURE__ */ Me({
  __name: "GitHubWorkspaceCard",
  setup(y) {
    const a = ft(() => import("./GitHubSettingsModal-CGoRYAdD.js")), l = ft(() => import("./LauncherBookGuideDialog-C1G_ik3R.js")), { active: u } = Tt("card-github", "/github.html");
    let g = 0, b = !1, G;
    const m = N(""), f = N("stars");
    me(() => u.value && f.value === "stars", (q) => V.setAiViewActive(q), { immediate: !0, flush: "sync" });
    const k = N(!1), D = N("local"), R = N(""), x = N(!1), S = N(!1);
    me(u, (q) => {
      q || (S.value = !1);
    });
    const A = N(0);
    function L() {
      u.value && (x.value = !0, ++A.value);
    }
    const J = N(!1);
    me(x, (q) => {
      q && (J.value = !0);
    });
    const I = N(null);
    let H = 0;
    function Z(q) {
      f.value = q, q === "trending" ? bt.switchTab("trending") : bt.switchTab("stars");
    }
    function oe() {
      f.value = "stars";
    }
    const ie = se(() => [
      { id: "exact", icon: "🎯", name: M("search.rule.exact"), desc: M("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: M("search.rule.fuzzy"), desc: M("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: M("search.rule.topic"), desc: M("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: M("search.rule.smart"), desc: M("search.rule.smartDesc") }
    ]), re = N(V.searchRule || "exact"), E = se(() => ie.value.find((q) => q.id === re.value) || ie.value[0]);
    function j() {
      const q = V.cycleSearchRule();
      re.value = q;
    }
    const B = se(() => D.value === "global" ? M("github.searchGlobalPlaceholder") : M("github.searchLocalPlaceholder", { rule: E.value.name }));
    function P() {
      clearTimeout(H), !(!u.value || D.value !== "local") && (H = window.setTimeout(() => V.setSearchQuery(R.value.trim().toLowerCase()), 180));
    }
    function z() {
      D.value = D.value === "local" ? "global" : "local", D.value === "local" && P();
    }
    function ee() {
      R.value = "", clearTimeout(H), V.resetLocalSearch();
    }
    function de() {
      const q = R.value.trim();
      D.value === "local" ? (clearTimeout(H), V.setSearchQuery(q.toLowerCase())) : q && window.open(`https://github.com/search?q=${encodeURIComponent(q)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function ae() {
      ++g, b = !0, m.value = "";
    }
    return me(u, async (q) => {
      if (clearTimeout(H), !q) return;
      const C = ++g;
      if ((!G || G.signal.aborted) && (G = new AbortController(), V.setRepositoryViewSignal(G.signal)), b) {
        await V.resumeRepositoryReads();
        return;
      }
      if (V.repos.length || V.loadingAllStars || V.loadingPage) {
        b = !0;
        return;
      }
      try {
        const X = await kt();
        if (C !== g || G.signal.aborted) return;
        b = !0, await V.loadGitHub(X.ghUser, X.ghToken);
      } catch {
        if (C !== g || G?.signal.aborted) return;
        b = !1, m.value = M("github.initError");
      }
    }, { immediate: !0, flush: "sync" }), Mt(() => {
      V.setAiViewActive(!1), ++g, G?.abort(), clearTimeout(H);
    }), (q, C) => (o(), i("section", {
      class: F(["card wide", { "card-fullscreen": t(Ut).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(u)
    }, [
      C[28] || (C[28] = e("header", { class: "card-head" }, [
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
      m.value ? (o(), i("p", vl, r(m.value), 1)) : $("", !0),
      e("div", bl, [
        e("div", yl, [
          e("aside", _l, [
            e("div", {
              class: F(["fo-sidebar-toggle-bar", { "is-collapsed": k.value }]),
              title: k.value ? t(M)("github.channel.toggleExpand") : t(M)("github.channel.toggleCollapse"),
              onClick: C[0] || (C[0] = (X) => k.value = !k.value)
            }, [
              e("div", kl, [
                C[13] || (C[13] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, r(t(M)("github.channel.channels")), 1),
                k.value ? (o(), i("span", Cl, "3")) : $("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !k.value,
                title: k.value ? t(M)("github.expand") : t(M)("github.collapse")
              }, [
                e("span", null, r(k.value ? t(M)("github.expand") : t(M)("github.collapse")), 1),
                e("span", Gl, r(k.value ? "▾" : "▴"), 1)
              ], 8, $l)
            ], 10, wl),
            k.value ? $("", !0) : (o(), i("div", Ml, [
              e("div", Tl, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: f.value === "stars" }]),
                  title: t(M)("github.channel.starsTitle"),
                  onClick: C[1] || (C[1] = (X) => Z("stars"))
                }, [
                  e("div", Sl, [
                    C[14] || (C[14] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", Ll, [
                      e("strong", null, r(t(M)("github.channel.stars")), 1),
                      e("small", null, r(t(M)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  C[15] || (C[15] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, Rl)
              ]),
              e("div", Dl, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: f.value === "trending" }]),
                  title: t(M)("github.channel.trendingTitle"),
                  onClick: C[2] || (C[2] = (X) => Z("trending"))
                }, [
                  e("div", xl, [
                    C[16] || (C[16] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", El, [
                      e("strong", null, r(t(M)("github.channel.trending")), 1),
                      e("small", null, r(t(M)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  C[17] || (C[17] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, Al)
              ]),
              e("div", Hl, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: f.value === "awesome" }]),
                  title: t(M)("github.channel.awesomeTitle"),
                  onClick: C[3] || (C[3] = (X) => Z("awesome"))
                }, [
                  e("div", Il, [
                    C[18] || (C[18] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", Nl, [
                      e("strong", null, r(t(M)("github.channel.awesome")), 1),
                      e("small", null, r(t(M)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  C[19] || (C[19] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, Ul)
              ]),
              e("div", Pl, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: f.value === "repos" }]),
                  title: t(M)("github.channel.reposTitle"),
                  onClick: C[4] || (C[4] = (X) => Z("repos"))
                }, [
                  e("div", Fl, [
                    C[20] || (C[20] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", jl, [
                      e("strong", null, r(t(M)("github.channel.repos")), 1),
                      e("small", null, r(t(M)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  C[21] || (C[21] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, Ol)
              ])
            ])),
            e("header", Bl, [
              e("div", null, [
                e("b", Wl, [
                  C[22] || (C[22] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  te(" " + r(t(M)("github.lists.title")), 1)
                ]),
                e("small", zl, r(t(M)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: t(M)("github.lists.new"),
                "aria-label": t(M)("github.lists.new"),
                onClick: C[5] || (C[5] = (X) => t(V).promptCreateFolder())
              }, "＋", 8, Yl)
            ]),
            e("nav", Vl, [
              Ae(xt, {
                active: t(u),
                onSelect: oe
              }, null, 8, ["active"])
            ])
          ]),
          e("section", ql, [
            f.value === "stars" && t(Dt).accountConfigured === !1 ? (o(), he(At, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: C[6] || (C[6] = (X) => x.value = !0)
            })) : f.value === "stars" ? (o(), i(Y, { key: 1 }, [
              e("header", Kl, [
                Ae(Et, {
                  onOpenAiSettings: L,
                  onOpenGuide: C[11] || (C[11] = (X) => S.value = !0)
                }, {
                  search: mt(() => [
                    e("div", Xl, [
                      e("form", {
                        id: "gh-search-form",
                        class: "gh-search-box",
                        onSubmit: Q(de, ["prevent"])
                      }, [
                        e("button", {
                          type: "button",
                          id: "gh-search-mode-toggle",
                          class: "gh-search-mode-toggle",
                          title: D.value === "local" ? t(M)("github.searchScope.toGlobal") : t(M)("github.searchScope.toLocal"),
                          onClick: z
                        }, [
                          e("span", Jl, r(D.value === "local" ? "⭐" : "🌐"), 1),
                          e("span", Zl, r(D.value === "local" ? t(M)("github.searchScope.local") : t(M)("github.searchScope.global")), 1),
                          C[23] || (C[23] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
                        ], 8, Ql),
                        ge(e("input", {
                          id: "gh-search-input",
                          "onUpdate:modelValue": C[7] || (C[7] = (X) => R.value = X),
                          placeholder: B.value,
                          autocomplete: "off",
                          onInput: P
                        }, null, 40, er), [
                          [Ie, R.value]
                        ]),
                        D.value === "local" ? (o(), i("button", {
                          key: 0,
                          type: "button",
                          class: F(["gh-search-rule-btn", `rule-${E.value.id}`]),
                          title: t(M)("github.ruleHint", { rule: E.value.name, desc: E.value.desc }),
                          onClick: Q(j, ["stop"])
                        }, [
                          e("span", sr, r(E.value.icon), 1),
                          e("span", or, r(E.value.name), 1)
                        ], 10, tr)) : $("", !0),
                        ge(e("button", {
                          type: "button",
                          id: "gh-search-clear-btn",
                          class: "gh-search-clear-btn",
                          title: t(M)("github.clearSearch"),
                          onClick: ee
                        }, "✕", 8, nr), [
                          [Qe, R.value]
                        ]),
                        C[24] || (C[24] = e("button", {
                          type: "submit",
                          id: "gh-search-submit-btn",
                          title: "搜索"
                        }, "⌕", -1))
                      ], 32),
                      C[25] || (C[25] = e("div", {
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
                      C[26] || (C[26] = e("div", {
                        id: "gh-search-suggest",
                        class: "gh-search-suggest",
                        hidden: ""
                      }, null, -1))
                    ])
                  ]),
                  "actions-prefix": mt(() => [
                    e("button", {
                      id: "gh-header-msg-center-btn",
                      class: F(["gh-header-msg-btn", { "has-unread": t(U).unreadCount > 0, "is-active": t(U).isOpen }]),
                      type: "button",
                      title: t(U).unreadCount > 0 ? t(M)("github.header.msgUnread", { count: t(U).unreadCount }) : t(M)("github.header.msgCenter"),
                      onClick: C[8] || (C[8] = (X) => t(Ce).toggle())
                    }, [
                      C[27] || (C[27] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
                      e("span", lr, r(t(M)("github.header.msg")), 1),
                      t(U).unreadCount > 0 ? (o(), i("span", rr, r(t(U).unreadCount > 99 ? "99+" : t(U).unreadCount), 1)) : $("", !0)
                    ], 10, ar),
                    e("div", ir, [
                      e("button", {
                        type: "button",
                        ref_key: "settingsButton",
                        ref: I,
                        "aria-expanded": x.value,
                        "aria-label": t(M)("github.settings"),
                        class: "gh-head-settings-btn",
                        title: t(M)("github.header.settings"),
                        onClick: C[9] || (C[9] = (X) => x.value = !x.value)
                      }, " ⚙️ ", 8, ur),
                      J.value ? (o(), he(t(a), {
                        key: 0,
                        visible: t(u) && x.value,
                        anchor: I.value,
                        "ai-request": A.value,
                        onAccountReload: ae,
                        onClose: C[10] || (C[10] = (X) => x.value = !1)
                      }, null, 8, ["visible", "anchor", "ai-request"])) : $("", !0)
                    ])
                  ]),
                  _: 1
                })
              ]),
              e("div", cr, [
                Ae(Mn, {
                  active: t(u) && f.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : f.value === "trending" ? (o(), he(Ht, { key: 2 })) : f.value === "awesome" ? (o(), he(ss, { key: 3 })) : f.value === "repos" ? (o(), he(ro, {
              key: 4,
              active: t(u) && f.value === "repos"
            }, null, 8, ["active"])) : $("", !0)
          ])
        ])
      ]),
      S.value ? (o(), he(t(l), {
        key: 1,
        open: S.value,
        title: "GitHub 使用手册",
        spreads: t(ml),
        "help-selector": ".gh-github-help-btn",
        onClose: C[12] || (C[12] = (X) => S.value = !1)
      }, null, 8, ["open", "spreads"])) : $("", !0),
      Ae(oa),
      Ae(gl)
    ], 10, fl));
  }
}), kr = /* @__PURE__ */ Te(dr, [["__scopeId", "data-v-53375c13"]]);
export {
  kr as default
};
