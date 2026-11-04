import { d as $e, o as s, g as n, h as e, n as re, q as _e, i as S, F as O, j as Y, C as F, t as a, u as t, k as Q, b as E, y as se, r as Ce, w as ke, D as Pe, z as Ee, A as Oe, m as Ue, e as ue, l as We, B as ze, p as ae, G as Qe, L as at, H as lt, s as Te, E as it } from "./vendor-vue-FFI3kJnP.js";
import { u as rt } from "./useCardActivity-Cut_p1co.js";
import { D as st, E as De, t as j, A as ct, y as ut } from "./search.service-BlryTTnm.js";
import { A as dt } from "./AccountSetupGuide-ZDGhjuNx.js";
import { g as pt, _ as ht, a as Je, G as gt } from "./main-DMCedpSk.js";
import mt from "./GitHubTrending-BNVXbY_4.js";
import { _ as Ge, t as R } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { s as Re } from "./storage-cache.service-BYF2zxXX.js";
import { n as Ze, r as ft } from "./view-styles-2Dpf6r_S.js";
import { m as he } from "./core-utils-Ccz-tarm.js";
const bt = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], vt = [
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
], yt = { class: "gh-awesome-wrapper" }, wt = { class: "gh-awesome-header" }, _t = { class: "gh-awesome-intro" }, kt = { class: "gh-awesome-search-box" }, $t = { class: "gh-awesome-pills" }, Ct = ["onClick"], Gt = { class: "gh-awesome-grid" }, Tt = ["onClick"], Rt = { class: "gh-awesome-card-head" }, Mt = { class: "gh-awesome-card-name" }, St = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, xt = { class: "gh-awesome-desc" }, Lt = { class: "gh-awesome-footer" }, At = { class: "gh-awesome-tags" }, Dt = ["href"], Ht = {
  key: 0,
  class: "gh-awesome-empty"
}, Ut = /* @__PURE__ */ $e({
  __name: "GitHubAwesome",
  setup(v) {
    const i = E("all"), l = E(""), o = se(() => {
      const f = l.value.trim().toLowerCase(), T = i.value;
      return vt.filter((d) => T === "all" || d.category === T ? f ? d.name.toLowerCase().includes(f) || d.title.toLowerCase().includes(f) || d.desc.toLowerCase().includes(f) || d.tags.some((x) => x.toLowerCase().includes(f)) : !0 : !1);
    });
    function g(f) {
      window.open(f, "_blank", "noreferrer");
    }
    return (f, T) => (s(), n("div", yt, [
      e("header", wt, [
        e("div", _t, [
          T[3] || (T[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", kt, [
            re(e("input", {
              "onUpdate:modelValue": T[0] || (T[0] = (d) => l.value = d),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [_e, l.value]
            ]),
            l.value ? (s(), n("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: T[1] || (T[1] = (d) => l.value = "")
            }, "✕")) : S("", !0)
          ])
        ]),
        e("div", $t, [
          (s(!0), n(O, null, Y(t(bt), (d) => (s(), n("button", {
            key: d.id,
            type: "button",
            class: F(["gh-awesome-pill", { active: i.value === d.id }]),
            onClick: (m) => i.value = d.id
          }, [
            e("span", null, a(d.icon), 1),
            e("b", null, a(d.name), 1)
          ], 10, Ct))), 128))
        ])
      ]),
      e("div", Gt, [
        (s(!0), n(O, null, Y(o.value, (d) => (s(), n("article", {
          key: d.id,
          class: "gh-awesome-card",
          onClick: (m) => g(d.url)
        }, [
          e("div", Rt, [
            e("div", Mt, [
              e("strong", null, a(d.title), 1),
              e("small", null, a(d.name), 1)
            ]),
            e("span", St, "★ " + a(d.stars), 1)
          ]),
          e("p", xt, a(d.desc), 1),
          e("div", Lt, [
            e("div", At, [
              (s(!0), n(O, null, Y(d.tags, (m) => (s(), n("span", {
                key: m,
                class: "gh-awesome-tag"
              }, a(m), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: d.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: T[2] || (T[2] = Q(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Dt)
          ])
        ], 8, Tt))), 128)),
        o.value.length ? S("", !0) : (s(), n("div", Ht, [...T[4] || (T[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Pt = /* @__PURE__ */ Ge(Ut, [["__scopeId", "data-v-28a8995f"]]), Me = "gh_my_repos_cache_v1", Se = "gh_my_repo_groups_v2", xe = "gh_my_repo_groups_map_v2", M = Ce({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function be(v) {
  return v.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class ye {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return ye.instance || (ye.instance = new ye()), ye.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(i = !1) {
    if (!i && this.inFlightPromise)
      return this.inFlightPromise;
    i && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const l = this.abortController.signal, o = (async () => {
      await this.loadPersistedGroups();
      const g = await Re.get(Me);
      if (g && g.length ? this.hydrateRepos(g) : M.repos.length && this.hydrateRepos(M.repos), i || !M.repos.length) {
        M.loading = !0, M.errorMessage = "";
        try {
          await this.fetchRemote(l);
        } catch (T) {
          if (T.name === "AbortError") return;
          M.errorMessage = T.message || "获取个人仓库失败";
        } finally {
          M.loading = !1;
        }
      } else
        this.fetchRemote(l).catch(() => {
        });
    })();
    return this.inFlightPromise = o.finally(() => {
      this.inFlightPromise === o && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(i) {
    const { ghUser: l, ghToken: o } = await st();
    if (!l && !o) {
      M.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const g = De(o), f = [], T = /* @__PURE__ */ new Set();
    if (l)
      try {
        const m = `https://api.github.com/users/${encodeURIComponent(l)}/repos?type=owner&sort=updated&per_page=100`, x = await fetch(m, { method: "GET", headers: g, signal: i });
        if (x.ok) {
          const L = await x.json();
          if (Array.isArray(L))
            for (const G of L)
              G && G.id && !T.has(G.id) && (T.add(G.id), f.push(G));
        }
      } catch (m) {
        if (m.name === "AbortError") throw m;
      }
    if (o)
      try {
        const x = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: g, signal: i });
        if (x.ok) {
          const L = await x.json();
          if (Array.isArray(L))
            for (const G of L)
              G && G.id && !T.has(G.id) && (T.add(G.id), f.push(G));
        }
      } catch (m) {
        if (m.name === "AbortError") throw m;
      }
    if (!f.length) {
      M.repos.length || (M.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const d = f.map((m) => {
      const x = m.full_name || `${m.owner?.login || l}/${m.name}`, L = m.name, G = M.repoGroupsMap[x] || M.repoGroupsMap[L] || M.repoGroupsMap[x.toLowerCase()] || M.repoGroupsMap[L.toLowerCase()] || [];
      return {
        id: m.id,
        name: m.name,
        fullName: x,
        description: m.description || "",
        isPrivate: !!m.private,
        isFork: !!m.fork,
        htmlUrl: m.html_url || `https://github.com/${l}/${m.name}`,
        language: m.language || null,
        stargazersCount: Number(m.stargazers_count) || 0,
        forksCount: Number(m.forks_count) || 0,
        openIssuesCount: Number(m.open_issues_count) || 0,
        topics: Array.isArray(m.topics) ? m.topics.map((U) => String(U).toLowerCase()) : [],
        localGroups: G,
        updatedAt: m.updated_at || "",
        pushedAt: m.pushed_at || "",
        defaultBranch: m.default_branch || "main"
      };
    });
    this.hydrateRepos(d), await Re.set(Me, d, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(i) {
    let l = !1;
    M.repos = i.map((o) => {
      const g = M.repoGroupsMap[o.fullName] || M.repoGroupsMap[o.name] || M.repoGroupsMap[o.fullName.toLowerCase()] || M.repoGroupsMap[o.name.toLowerCase()], f = o.localGroups && o.localGroups.length ? o.localGroups : null, T = this.inferGroupsForRepo(o, M.customGroups), d = (g && g.length ? g : null) || f || T, m = d ? [...new Set(d.filter(Boolean))] : [];
      return m.length && (!M.repoGroupsMap[o.fullName] || !M.repoGroupsMap[o.fullName].length) && (M.repoGroupsMap[o.fullName] = m, l = !0), {
        ...o,
        localGroups: m
      };
    }), l && this.persistGroupsMap();
  }
  /**
   * 智能推断仓库最匹配的分组归属（仅在无手动归类时作为平滑桥接）
   */
  inferGroupsForRepo(i, l) {
    if (!l || !l.length) return [];
    const o = [], g = i.name.toLowerCase(), f = (i.topics || []).map((T) => T.toLowerCase());
    for (const T of l) {
      const d = T.toLowerCase();
      if ((d.includes("fork") || T.includes("分支")) && (i.isFork || f.includes("fork"))) {
        o.push(T);
        continue;
      }
      if ((d.includes("浏览器") || d.includes("browser") || d.includes("chrome") || d.includes("edge")) && (f.some((m) => m.includes("extension") || m.includes("browser") || m.includes("newtab")) || g.includes("tab-project"))) {
        o.push(T);
        continue;
      }
      if ((d.includes("pi") || T.includes("PI")) && (f.some((m) => m.includes("pi") || m.includes("grounding-pi")) || g.includes("pi-") || g.includes("-pi"))) {
        o.push(T);
        continue;
      }
      if (d.includes("herdr") && (f.some((m) => m.includes("herdr")) || g.includes("herdr"))) {
        o.push(T);
        continue;
      }
      if ((d.includes("嵌入式") || d.includes("embedded") || d.includes("单片机")) && (f.some((m) => m.includes("embedded") || m.includes("zephyr") || m.includes("stm32") || m.includes("k230")) || g.includes("k230") || g.includes("mspm0") || g.includes("pid-") || g.includes("zephyr"))) {
        o.push(T);
        continue;
      }
      if ((d.includes("美化") || d.includes("theme") || d.includes("style")) && (f.some((m) => m.includes("theme") || m.includes("beauty") || m.includes("ui")) || g.includes("theme") || g.includes("style"))) {
        o.push(T);
        continue;
      }
    }
    return o;
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(i, l) {
    const o = be(l);
    o && (i.localGroups.includes(o) || i.localGroups.push(o), M.repoGroupsMap[i.fullName] = [...i.localGroups], await this.persistGroupsMap(), await Re.set(Me, M.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(i, l) {
    i.localGroups = i.localGroups.filter((o) => o !== l), M.repoGroupsMap[i.fullName] = [...i.localGroups], await this.persistGroupsMap(), await Re.set(Me, M.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(i, l) {
    if (!l)
      i.localGroups = [];
    else {
      const o = be(l);
      if (!o) return;
      i.localGroups = [o];
    }
    M.repoGroupsMap[i.fullName] = [...i.localGroups], await this.persistGroupsMap(), await Re.set(Me, M.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(i) {
    const l = be(i);
    return l ? M.customGroups.includes(l) ? (alert(`分组「${l}」已存在。`), null) : (M.customGroups.push(l), await this.persistGroups(), l) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(i, l) {
    const o = be(l);
    return o ? i === o ? !0 : M.customGroups.includes(o) ? (alert(`已存在名为「${o}」的分组。`), !1) : (M.customGroups = M.customGroups.map((g) => g === i ? o : g), M.repos.forEach((g) => {
      g.localGroups.includes(i) && (g.localGroups = g.localGroups.map((f) => f === i ? o : f), M.repoGroupsMap[g.fullName] = [...g.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(i) {
    const l = M.repos.filter((g) => g.localGroups.includes(i)).length, o = l > 0 ? `确定删除分组「${i}」吗？
该分组下的 ${l} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${i}」吗？`;
    return confirm(o) ? (M.customGroups = M.customGroups.filter((g) => g !== i), M.repos.forEach((g) => {
      g.localGroups.includes(i) && (g.localGroups = g.localGroups.filter((f) => f !== i), M.repoGroupsMap[g.fullName] = [...g.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let i = null, l = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const o = await chrome.storage.local.get([Se, xe]);
        i = o?.[Se], l = o?.[xe];
      }
      if (!i || !Array.isArray(i)) {
        const o = localStorage.getItem(Se);
        o && (i = JSON.parse(o));
      }
      if (!l || typeof l != "object") {
        const o = localStorage.getItem(xe);
        o && (l = JSON.parse(o));
      }
      Array.isArray(i) && (M.customGroups = i.map(be).filter(Boolean)), l && typeof l == "object" && (M.repoGroupsMap = l);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const i = { ...M.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [xe]: i }), localStorage.setItem(xe, JSON.stringify(i));
    } catch {
    }
  }
  async persistGroups() {
    const i = Array.from(new Set(M.customGroups.map(be).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Se]: i }), localStorage.setItem(Se, JSON.stringify(i));
    } catch {
    }
  }
}
const te = ye.getInstance(), Et = { class: "my-repos-workspace" }, It = {
  key: 0,
  class: "error-banner"
}, Nt = { class: "shelf-header" }, jt = { class: "shelf-left" }, Ft = { class: "shelf-badge" }, Ot = { class: "shelf-right" }, Wt = { class: "shelf-search-wrap" }, zt = ["disabled", "title"], Bt = ["title"], Yt = ["onDragstart", "onContextmenu"], Vt = { class: "repo-card-head" }, qt = ["title", "onClick"], Kt = {
  key: 0,
  class: "badge-repo-visibility private"
}, Xt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Qt = ["title"], Jt = {
  key: 1,
  class: "repo-topics-row"
}, Zt = { class: "repo-card-footer" }, es = { class: "meta-left" }, ts = {
  key: 0,
  class: "meta-item lang"
}, ss = { class: "meta-item" }, os = {
  key: 1,
  class: "meta-item"
}, ns = ["title"], as = { class: "board-columns-track" }, ls = ["onDragover", "onDragleave", "onDrop"], is = { class: "column-header" }, rs = {
  key: 0,
  class: "column-title-group"
}, cs = ["title"], us = { class: "badge-count" }, ds = {
  key: 1,
  class: "column-rename-group"
}, ps = ["onKeydown"], hs = ["onClick"], gs = { class: "column-actions" }, ms = ["onClick"], fs = {
  key: 0,
  class: "col-popover-menu"
}, bs = ["onClick"], vs = ["onClick"], ys = { class: "column-cards-scroll" }, ws = ["onDragstart", "onContextmenu"], _s = { class: "repo-card-head" }, ks = ["title", "onClick"], $s = {
  key: 0,
  class: "badge-repo-visibility private"
}, Cs = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Gs = ["title"], Ts = { class: "repo-topics-row" }, Rs = { class: "topic-chip active-chip" }, Ms = ["onClick"], Ss = { class: "repo-card-footer" }, xs = { class: "meta-left" }, Ls = {
  key: 0,
  class: "meta-item lang"
}, As = { class: "meta-item" }, Ds = {
  key: 1,
  class: "meta-item"
}, Hs = { class: "meta-date" }, Us = {
  key: 0,
  class: "empty-column-placeholder"
}, Ps = { class: "board-column new-column-slot" }, Es = {
  key: 1,
  class: "new-column-composer"
}, Is = { class: "composer-actions" }, Ns = ["onClick"], js = /* @__PURE__ */ $e({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(v) {
    const i = v, l = E(""), o = E(!1), g = E(null), f = E(""), T = E(null), d = E(null), m = E(null), x = E(!1);
    function L() {
      x.value = !x.value;
    }
    function G(c) {
      const r = m.value;
      r && (Math.abs(c.deltaX) > Math.abs(c.deltaY) && c.deltaX !== 0 || c.deltaY !== 0 && (c.preventDefault(), r.scrollLeft += c.deltaY));
    }
    const U = E(null), A = E(null), k = E(null);
    let C = null, V = 0;
    const D = Ce({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), K = E(null), le = E(!1);
    function J() {
      D.visible = !1, K.value = null;
    }
    function oe(c, r, p) {
      c.preventDefault(), c.stopPropagation();
      let w = c.clientX, ee = c.clientY;
      w > window.innerWidth - 200 && (w = window.innerWidth - 210), ee > window.innerHeight - 240 && (ee = window.innerHeight - 245), D.x = w, D.y = ee, D.repo = r, D.fromGroup = p, D.visible = !0, K.value = "folder", le.value = w > window.innerWidth - 380;
    }
    async function ce() {
      const c = D.repo;
      J(), c && await te.moveRepoToGroup(c, null);
    }
    async function P(c) {
      const r = D.repo;
      J(), r && await te.moveRepoToGroup(r, c);
    }
    async function I() {
      const c = D.repo;
      if (J(), !!c)
        try {
          await navigator.clipboard.writeText(c.htmlUrl), Ze.show({
            appName: "GitHub",
            title: R("github.myRepos.copiedUrlTitle"),
            message: R("github.myRepos.copiedUrlMsg", { name: c.name })
          });
        } catch {
        }
    }
    async function W() {
      const c = D.repo;
      if (J(), !!c)
        try {
          const r = `git clone ${c.htmlUrl}.git`;
          await navigator.clipboard.writeText(r), Ze.show({
            appName: "GitHub",
            title: R("github.myRepos.copiedCloneTitle"),
            message: r
          });
        } catch {
        }
    }
    function q() {
      const c = D.repo;
      J(), c && Ne(c.htmlUrl);
    }
    function ne() {
      const c = D.repo;
      J(), c && pt.open({
        fullName: c.fullName,
        description: c.description || "",
        stars: c.stargazersCount,
        language: c.language || void 0,
        updated: c.pushedAt
      });
    }
    function ie(c) {
      c.target?.closest(".gh-repo-context-menu") || D.visible && J();
    }
    function B(c) {
      c.key === "Escape" && D.visible && J();
    }
    const $ = se(() => M.customGroups), X = se(() => {
      const c = M.searchQuery.trim().toLowerCase();
      return c ? M.repos.filter(
        (r) => r.name.toLowerCase().includes(c) || r.description.toLowerCase().includes(c) || r.localGroups.some((p) => p.toLowerCase().includes(c)) || r.topics.some((p) => p.toLowerCase().includes(c)) || r.language && r.language.toLowerCase().includes(c)
      ) : M.repos;
    }), de = se(() => X.value.filter((c) => !c.localGroups.length));
    function ge(c) {
      return X.value.filter((r) => r.localGroups.includes(c));
    }
    async function me() {
      const c = l.value.trim();
      if (!c) return;
      await te.createGroup(c) && (l.value = "", o.value = !1);
    }
    function He(c) {
      T.value = c, f.value = c, g.value = null;
    }
    async function b(c) {
      const r = f.value.trim();
      if (!r || r === c) {
        T.value = null;
        return;
      }
      await te.renameGroup(c, r) && (T.value = null);
    }
    async function u(c) {
      g.value = null, await te.deleteGroup(c);
    }
    async function h(c, r) {
      await te.removeRepoFromGroup(c, r);
    }
    function _(c) {
      const r = d.value;
      if (!r) return;
      const w = c.target?.closest(".column-cards-scroll");
      if (w && w.scrollHeight > w.clientHeight && !c.shiftKey && c.deltaX === 0) {
        const ee = w.scrollTop <= 0 && c.deltaY < 0, nt = w.scrollTop + w.clientHeight >= w.scrollHeight - 1 && c.deltaY > 0;
        if (!ee && !nt)
          return;
      }
      Math.abs(c.deltaX) > Math.abs(c.deltaY) && c.deltaX !== 0 || c.deltaY !== 0 && (c.preventDefault(), r.scrollLeft += c.deltaY);
    }
    function z(c) {
      if (!U.value || !d.value) return;
      c.preventDefault();
      const r = c.deltaX !== 0 ? c.deltaX : c.deltaY;
      d.value.scrollLeft += r;
    }
    function pe() {
      if (C !== null) return;
      const c = () => {
        d.value && V !== 0 ? (d.value.scrollLeft += V, C = requestAnimationFrame(c)) : fe();
      };
      C = requestAnimationFrame(c);
    }
    function fe() {
      C !== null && (cancelAnimationFrame(C), C = null), V = 0;
    }
    function Be(c) {
      if (!U.value || !d.value) return;
      const r = d.value.getBoundingClientRect(), p = 100;
      if (c > r.right - p) {
        const w = Math.min(1, Math.max(0.1, (c - (r.right - p)) / p));
        V = Math.round(w * 20), pe();
      } else if (c < r.left + p) {
        const w = Math.min(1, Math.max(0.1, (r.left + p - c) / p));
        V = -Math.round(w * 20), pe();
      } else
        fe();
    }
    function ot(c) {
      U.value && (c.preventDefault(), Be(c.clientX));
    }
    function Ye(c, r, p) {
      J(), U.value = r, A.value = p, c.dataTransfer && (c.dataTransfer.effectAllowed = "move", c.dataTransfer.setData("text/plain", `${r.id}:${p}`)), window.addEventListener("wheel", z, { passive: !1 });
    }
    function Ie() {
      U.value = null, A.value = null, k.value = null, fe(), window.removeEventListener("wheel", z);
    }
    function Ve(c, r) {
      U.value && (c.preventDefault(), c.dataTransfer && (c.dataTransfer.dropEffect = "move"), k.value = r, Be(c.clientX));
    }
    function qe(c, r) {
      const p = c.currentTarget, w = c.relatedTarget;
      p?.contains(w) || k.value === r && (k.value = null);
    }
    async function Ke(c, r) {
      c.preventDefault();
      const p = U.value, w = A.value;
      Ie(), p && (r === "default" ? w && w !== "default" ? await te.removeRepoFromGroup(p, w) : await te.moveRepoToGroup(p, null) : (await te.addRepoToGroup(p, r), w && w !== "default" && w !== r && await te.removeRepoFromGroup(p, w)));
    }
    function Ne(c) {
      window.open(c, "_blank", "noopener,noreferrer");
    }
    function Xe(c) {
      if (!c) return "";
      try {
        const r = new Date(c);
        return `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ke(
      () => i.active,
      (c) => {
        J(), c && te.load();
      }
    ), Pe(() => {
      window.addEventListener("pointerdown", ie), window.addEventListener("keydown", B), te.load();
    }), Ee(() => {
      fe(), window.removeEventListener("wheel", z), window.removeEventListener("pointerdown", ie), window.removeEventListener("keydown", B);
    }), (c, r) => (s(), n("div", Et, [
      t(M).errorMessage ? (s(), n("div", It, [
        e("span", null, "⚠️ " + a(t(M).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: r[0] || (r[0] = (p) => t(te).load(!0))
        }, "重试")
      ])) : S("", !0),
      e("section", {
        class: F(["default-shelf-area", { "is-collapsed": x.value, "drop-active": k.value === "default" }]),
        onDragover: r[4] || (r[4] = (p) => Ve(p, "default")),
        onDragleave: r[5] || (r[5] = (p) => qe(p, "default")),
        onDrop: r[6] || (r[6] = (p) => Ke(p, "default"))
      }, [
        e("header", Nt, [
          e("div", jt, [
            r[23] || (r[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            r[24] || (r[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", Ft, a(de.value.length), 1),
            r[25] || (r[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", Ot, [
            e("div", Wt, [
              r[26] || (r[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              re(e("input", {
                "onUpdate:modelValue": r[1] || (r[1] = (p) => t(M).searchQuery = p),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [_e, t(M).searchQuery]
              ]),
              t(M).searchQuery ? (s(), n("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: r[2] || (r[2] = (p) => t(M).searchQuery = "")
              }, "✕")) : S("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(M).loading,
              title: t(R)("github.myRepos.refreshBtnTitle"),
              onClick: r[3] || (r[3] = (p) => t(te).load(!0))
            }, [
              e("span", {
                class: F({ spinning: t(M).loading })
              }, "🔄", 2),
              e("span", null, a(t(M).loading ? t(R)("github.myRepos.refreshing") : t(R)("common.refresh")), 1)
            ], 8, zt),
            de.value.length ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: x.value ? t(R)("github.myRepos.expandShelf") : t(R)("github.myRepos.collapseShelf"),
              onClick: L
            }, a(x.value ? t(R)("github.myRepos.expandBtn") : t(R)("github.myRepos.collapseBtn")), 9, Bt)) : S("", !0)
          ])
        ]),
        de.value.length ? re((s(), n("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: m,
          class: "shelf-cards-scroll",
          onWheel: G
        }, [
          (s(!0), n(O, null, Y(de.value, (p) => (s(), n("div", {
            key: p.id,
            class: F(["repo-card shelf-card", { "card-dragging": U.value?.id === p.id }]),
            draggable: "true",
            onDragstart: (w) => Ye(w, p, "default"),
            onDragend: Ie,
            onContextmenu: (w) => oe(w, p, "default")
          }, [
            e("div", Vt, [
              e("span", {
                class: "repo-name",
                title: p.fullName,
                onClick: (w) => Ne(p.htmlUrl)
              }, a(p.name), 9, qt),
              p.isPrivate ? (s(), n("span", Kt, "私有")) : S("", !0),
              p.isFork ? (s(), n("span", Xt, "Fork")) : S("", !0)
            ]),
            p.description ? (s(), n("p", {
              key: 0,
              class: "repo-desc",
              title: p.description
            }, a(p.description), 9, Qt)) : S("", !0),
            p.topics.length ? (s(), n("div", Jt, [
              (s(!0), n(O, null, Y(p.topics, (w) => (s(), n("span", {
                key: w,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + a(w), 1))), 128))
            ])) : S("", !0),
            e("div", Zt, [
              e("div", es, [
                p.language ? (s(), n("span", ts, [
                  r[27] || (r[27] = e("span", { class: "lang-color" }, null, -1)),
                  ae(a(p.language), 1)
                ])) : S("", !0),
                e("span", ss, "⭐ " + a(p.stargazersCount), 1),
                p.forksCount ? (s(), n("span", os, "🍴 " + a(p.forksCount), 1)) : S("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + p.updatedAt
              }, a(Xe(p.pushedAt || p.updatedAt)), 9, ns)
            ])
          ], 42, Yt))), 128))
        ], 544)), [
          [Oe, !x.value]
        ]) : S("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: d,
        class: "board-viewport",
        onWheel: _,
        onDragover: ot
      }, [
        e("div", as, [
          (s(!0), n(O, null, Y($.value, (p) => (s(), n("section", {
            key: p,
            class: F(["board-column topic-column", { "drop-active": k.value === p }]),
            onDragover: (w) => Ve(w, p),
            onDragleave: (w) => qe(w, p),
            onDrop: (w) => Ke(w, p)
          }, [
            e("header", is, [
              T.value !== p ? (s(), n("div", rs, [
                r[28] || (r[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + p
                }, " 📁 " + a(p), 9, cs),
                e("span", us, a(ge(p).length), 1)
              ])) : (s(), n("div", ds, [
                re(e("input", {
                  "onUpdate:modelValue": r[7] || (r[7] = (w) => f.value = w),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    Ue((w) => b(p), ["enter"]),
                    r[8] || (r[8] = Ue((w) => T.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, ps), [
                  [_e, f.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (w) => b(p)
                }, "✓", 8, hs),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: r[9] || (r[9] = (w) => T.value = null)
                }, "✕")
              ])),
              e("div", gs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (w) => g.value = g.value === p ? null : p
                }, "•••", 8, ms),
                g.value === p ? (s(), n("div", fs, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (w) => He(p)
                  }, " 重命名分组 ", 8, bs),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (w) => u(p)
                  }, " 删除分组 ", 8, vs)
                ])) : S("", !0)
              ])
            ]),
            e("div", ys, [
              (s(!0), n(O, null, Y(ge(p), (w) => (s(), n("div", {
                key: w.id,
                class: F(["repo-card", { "card-dragging": U.value?.id === w.id }]),
                draggable: "true",
                onDragstart: (ee) => Ye(ee, w, p),
                onDragend: Ie,
                onContextmenu: (ee) => oe(ee, w, p)
              }, [
                e("div", _s, [
                  e("span", {
                    class: "repo-name",
                    title: w.fullName,
                    onClick: (ee) => Ne(w.htmlUrl)
                  }, a(w.name), 9, ks),
                  w.isPrivate ? (s(), n("span", $s, "私有")) : S("", !0),
                  w.isFork ? (s(), n("span", Cs, "Fork")) : S("", !0)
                ]),
                w.description ? (s(), n("p", {
                  key: 0,
                  class: "repo-desc",
                  title: w.description
                }, a(w.description), 9, Gs)) : S("", !0),
                e("div", Ts, [
                  e("span", Rs, [
                    ae(" 📁 " + a(p) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: Q((ee) => h(w, p), ["stop"])
                    }, "✕", 8, Ms)
                  ]),
                  (s(!0), n(O, null, Y(w.topics, (ee) => (s(), n("span", {
                    key: ee,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + a(ee), 1))), 128))
                ]),
                e("div", Ss, [
                  e("div", xs, [
                    w.language ? (s(), n("span", Ls, [
                      r[29] || (r[29] = e("span", { class: "lang-color" }, null, -1)),
                      ae(a(w.language), 1)
                    ])) : S("", !0),
                    e("span", As, "⭐ " + a(w.stargazersCount), 1),
                    w.forksCount ? (s(), n("span", Ds, "🍴 " + a(w.forksCount), 1)) : S("", !0)
                  ]),
                  e("span", Hs, a(Xe(w.pushedAt || w.updatedAt)), 1)
                ])
              ], 42, ws))), 128)),
              ge(p).length ? S("", !0) : (s(), n("div", Us, [...r[30] || (r[30] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, ls))), 128)),
          e("section", Ps, [
            o.value ? (s(), n("div", Es, [
              r[32] || (r[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              re(e("input", {
                "onUpdate:modelValue": r[11] || (r[11] = (p) => l.value = p),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  Ue(me, ["enter"]),
                  r[12] || (r[12] = Ue((p) => o.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [_e, l.value]
              ]),
              e("div", Is, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: me
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: r[13] || (r[13] = (p) => o.value = !1)
                }, a(t(R)("common.cancel")), 1)
              ])
            ])) : (s(), n("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: r[10] || (r[10] = (p) => o.value = !0)
            }, [...r[31] || (r[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (s(), ue(We, { to: "body" }, [
        D.visible && D.repo ? (s(), n("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ze({ left: `${D.x}px`, top: `${D.y}px` }),
          onClick: r[21] || (r[21] = Q(() => {
          }, ["stop"])),
          onContextmenu: r[22] || (r[22] = Q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: F(["gh-menu-has-sub", { "is-active": K.value === "folder" }]),
            onMouseenter: r[16] || (r[16] = (p) => K.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: r[14] || (r[14] = Q((p) => K.value = K.value === "folder" ? null : "folder", ["stop"]))
            }, [...r[33] || (r[33] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: F(["gh-sub-flyout", { "flyout-left": le.value }]),
              onClick: r[15] || (r[15] = Q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: F(["fo-cover-menu-item", { primary: !D.repo.localGroups.length }]),
                type: "button",
                onClick: ce
              }, a(D.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (s(!0), n(O, null, Y($.value, (p) => (s(), n("button", {
                key: p,
                class: F(["fo-cover-menu-item", { primary: D.repo.localGroups.includes(p) }]),
                type: "button",
                onClick: (w) => P(p)
              }, a(D.repo.localGroups.includes(p) ? "✓ " : "  ") + "📁 " + a(p), 11, Ns))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[17] || (r[17] = (p) => K.value = null),
            onClick: I
          }, a(t(R)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[18] || (r[18] = (p) => K.value = null),
            onClick: W
          }, a(t(R)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[19] || (r[19] = (p) => K.value = null),
            onClick: ne
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[20] || (r[20] = (p) => K.value = null),
            onClick: q
          }, a(t(R)("github.myRepos.openInGitHub")), 33)
        ], 36)) : S("", !0)
      ]))
    ]));
  }
}), Fs = /* @__PURE__ */ Ge(js, [["__scopeId", "data-v-f77c8971"]]), Z = Ce({
  uncatPage: 1,
  pageSize: 10,
  searchQuery: ""
});
class we {
  static getInstance() {
    return we.instance || (we.instance = new we()), we.instance;
  }
  nextUncatPage() {
    this.uncatPage < this.uncatTotalPages && Z.uncatPage++;
  }
  prevUncatPage() {
    Z.uncatPage > 1 && Z.uncatPage--;
  }
  setUncatPage(i) {
    const l = Math.max(1, Math.min(i, this.uncatTotalPages));
    Z.uncatPage = l;
  }
  get uncatPage() {
    return Z.uncatPage;
  }
  get uncatTotalPages() {
    const i = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(i / Z.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const i = Z.searchQuery.trim().toLowerCase(), l = j.repos.filter((o) => j.getRepoFolders(o.full_name).length === 0);
    return i ? l.filter(
      (o) => o.full_name.toLowerCase().includes(i) || o.description && o.description.toLowerCase().includes(i) || o.language && o.language.toLowerCase().includes(i) || o.topics && o.topics.some((g) => g.toLowerCase().includes(i))
    ) : l;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const i = this.filteredUncatRepos, o = (Math.min(Z.uncatPage, this.uncatTotalPages) - 1) * Z.pageSize;
    return i.slice(o, o + Z.pageSize);
  }
  /**
   * 各个 GitHub 原生 Lists 板块列表
   */
  get lists() {
    return j.lists;
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(i) {
    const l = Z.searchQuery.trim().toLowerCase(), o = j.repos.filter((g) => j.getRepoFolders(g.full_name).includes(i));
    return l ? o.filter(
      (g) => g.full_name.toLowerCase().includes(l) || g.description && g.description.toLowerCase().includes(l) || g.language && g.language.toLowerCase().includes(l) || g.topics && g.topics.some((f) => f.toLowerCase().includes(l))
    ) : o;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(i, l) {
    await j.dropRepositoryIntoFolder(i, l);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(i, l) {
    await j.toggleRepoList(i, l);
  }
}
const N = we.getInstance(), Os = { class: "stars-board-workspace" }, Ws = { class: "shelf-header" }, zs = { class: "shelf-left" }, Bs = { class: "shelf-badge" }, Ys = { class: "shelf-right" }, Vs = { class: "shelf-search-wrap" }, qs = {
  key: 0,
  class: "shelf-pager"
}, Ks = ["disabled"], Xs = { class: "pager-text" }, Qs = ["disabled"], Js = ["title"], Zs = {
  key: 0,
  class: "shelf-cards-scroll"
}, eo = ["onClick", "onDragstart", "onContextmenu"], to = ["onClick"], so = { class: "gh-card-head" }, oo = ["src"], no = ["href", "title"], ao = { class: "owner" }, lo = { class: "gh-card-body" }, io = { class: "gh-card-badges" }, ro = ["title"], co = ["title"], uo = ["title"], po = { class: "meta" }, ho = { class: "gh-stars" }, go = {
  key: 0,
  class: "gh-lang"
}, mo = { class: "gh-updated" }, fo = { class: "shelf-next-content" }, bo = { class: "shelf-next-sub" }, vo = {
  key: 0,
  class: "board-columns-track"
}, yo = { class: "column-cards-scroll" }, wo = {
  key: 1,
  class: "board-columns-track"
}, _o = ["onDragover", "onDragleave", "onDrop"], ko = { class: "column-header" }, $o = { class: "column-title-group" }, Co = ["title"], Go = { class: "badge-count" }, To = { class: "column-actions" }, Ro = ["onClick"], Mo = { class: "column-cards-scroll" }, So = ["onClick", "onDragstart", "onContextmenu"], xo = ["onClick"], Lo = { class: "gh-card-head" }, Ao = ["src"], Do = ["href", "title"], Ho = { class: "owner" }, Uo = { class: "gh-card-body" }, Po = { class: "gh-card-badges" }, Eo = ["title"], Io = ["onClick"], No = ["title"], jo = ["title"], Fo = ["title"], Oo = { class: "meta" }, Wo = { class: "gh-stars" }, zo = {
  key: 0,
  class: "gh-lang"
}, Bo = { class: "gh-updated" }, Yo = {
  key: 0,
  class: "empty-column-dropzone"
}, Vo = { class: "board-column add-column-panel" }, qo = ["onClick"], Ko = /* @__PURE__ */ $e({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(v) {
    const i = E(null), l = E(null), o = E(!1);
    function g() {
      o.value = !o.value;
    }
    function f(b) {
      const u = l.value;
      u && (Math.abs(b.deltaX) > Math.abs(b.deltaY) && b.deltaX !== 0 || b.deltaY !== 0 && (b.preventDefault(), u.scrollLeft += b.deltaY));
    }
    const T = se(() => j.loadingAllStars || !j.repos.length && !N.filteredUncatRepos.length && !N.lists.length), d = E(null), m = E(null), x = E(null);
    let L = null, G = 0;
    function U() {
      L === null && (L = window.setInterval(() => {
        !i.value || G === 0 || (i.value.scrollLeft += G);
      }, 16));
    }
    function A() {
      L !== null && (clearInterval(L), L = null), G = 0;
    }
    const k = Ce({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), C = E(null), V = E(!1);
    function D() {
      k.visible = !1, k.repo = null, k.fromList = null, C.value = null;
    }
    function K(b, u, h) {
      b.preventDefault(), b.stopPropagation();
      const _ = 190, z = 220, pe = Math.min(b.clientX, window.innerWidth - _ - 10), fe = Math.min(b.clientY, window.innerHeight - z - 10);
      k.x = pe, k.y = fe, k.repo = u, k.fromList = h, k.visible = !0, C.value = "folder", V.value = pe > window.innerWidth - 380;
    }
    async function le() {
      const b = k.repo;
      D(), b && await N.moveRepoToList(b.full_name, j.UNCAT);
    }
    async function J(b) {
      const u = k.repo;
      D(), u && await N.moveRepoToList(u.full_name, b);
    }
    async function oe() {
      const b = k.repo;
      if (D(), !!b?.html_url)
        try {
          await navigator.clipboard.writeText(b.html_url);
        } catch {
        }
    }
    async function ce() {
      const b = k.repo;
      if (D(), !!b?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${b.full_name}.git`);
        } catch {
        }
    }
    function P(b) {
      const u = b.target;
      !u?.closest(".fo-cover-context-menu") && !u?.closest(".col-popover-menu") && D();
    }
    function I(b) {
      b.key === "Escape" && D();
    }
    function W(b) {
      const u = i.value;
      if (!u) return;
      const _ = b.target?.closest(".column-cards-scroll");
      if (_ && _.scrollHeight > _.clientHeight && !b.shiftKey && b.deltaX === 0) {
        const z = _.scrollTop === 0 && b.deltaY < 0, pe = Math.ceil(_.scrollTop + _.clientHeight) >= _.scrollHeight && b.deltaY > 0;
        if (!z && !pe)
          return;
      }
      Math.abs(b.deltaX) > Math.abs(b.deltaY) && b.deltaX !== 0 || b.deltaY !== 0 && (b.preventDefault(), u.scrollLeft += b.deltaY);
    }
    function q(b) {
      if (!d.value || !i.value) return;
      b.preventDefault();
      const u = b.deltaY !== 0 ? b.deltaY : b.deltaX;
      i.value.scrollLeft += u;
    }
    function ne(b) {
      const u = i.value;
      if (!u) return;
      const h = u.getBoundingClientRect(), _ = 100;
      if (b > h.right - _) {
        const z = Math.min(1, Math.max(0.1, (b - (h.right - _)) / _));
        G = Math.round(z * 20), U();
      } else if (b < h.left + _) {
        const z = Math.min(1, Math.max(0.1, (h.left + _ - b) / _));
        G = -Math.round(z * 20), U();
      } else
        A();
    }
    function ie(b) {
      ne(b.clientX);
    }
    function B(b, u, h) {
      D(), d.value = u, m.value = h, b.dataTransfer && (b.dataTransfer.effectAllowed = "move", b.dataTransfer.setData("text/plain", `${u.full_name}:${h || "uncategorized"}`)), window.addEventListener("wheel", q, { passive: !1 });
    }
    function $() {
      d.value = null, m.value = null, x.value = null, A(), window.removeEventListener("wheel", q);
    }
    function X(b, u) {
      d.value && (b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "move"), x.value = u);
    }
    function de(b, u) {
      const h = b.currentTarget;
      h && b.relatedTarget instanceof Node && h.contains(b.relatedTarget) || x.value === u && (x.value = null);
    }
    async function ge(b, u) {
      b.preventDefault();
      const h = d.value;
      $(), h && await N.moveRepoToList(h.full_name, u);
    }
    function me(b) {
      ct.open(b.full_name, void 0, b);
    }
    function He(b) {
      if (!b) return "";
      try {
        const u = new Date(b);
        return `${u.getFullYear()}-${String(u.getMonth() + 1).padStart(2, "0")}-${String(u.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return Pe(() => {
      window.addEventListener("pointerdown", P), window.addEventListener("keydown", I);
    }), Ee(() => {
      A(), window.removeEventListener("wheel", q), window.removeEventListener("pointerdown", P), window.removeEventListener("keydown", I);
    }), (b, u) => (s(), n("div", Os, [
      e("section", {
        class: F(["default-shelf-area", { "is-collapsed": o.value, "drop-active": x.value === "uncategorized" }]),
        onDragover: u[8] || (u[8] = (h) => X(h, "uncategorized")),
        onDragleave: u[9] || (u[9] = (h) => de(h, "uncategorized")),
        onDrop: u[10] || (u[10] = (h) => ge(h, "uncategorized"))
      }, [
        e("header", Ws, [
          e("div", zs, [
            u[23] || (u[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            u[24] || (u[24] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", Bs, a(t(N).filteredUncatRepos.length), 1),
            u[25] || (u[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消列表归属；单排 10 个一页）", -1))
          ]),
          e("div", Ys, [
            e("div", Vs, [
              u[26] || (u[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              re(e("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (h) => t(Z).searchQuery = h),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索 Star 仓库名称、简介或语言…"
              }, null, 512), [
                [_e, t(Z).searchQuery]
              ]),
              t(Z).searchQuery ? (s(), n("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: u[1] || (u[1] = (h) => t(Z).searchQuery = "")
              }, "✕")) : S("", !0)
            ]),
            t(N).filteredUncatRepos.length > t(Z).pageSize ? (s(), n("div", qs, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(N).uncatPage <= 1,
                title: "上一页",
                onClick: u[2] || (u[2] = //@ts-ignore
                (...h) => t(N).prevUncatPage && t(N).prevUncatPage(...h))
              }, "‹", 8, Ks),
              e("span", Xs, a(t(N).uncatPage) + " / " + a(t(N).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(N).uncatPage >= t(N).uncatTotalPages,
                title: "下一页",
                onClick: u[3] || (u[3] = //@ts-ignore
                (...h) => t(N).nextUncatPage && t(N).nextUncatPage(...h))
              }, "›", 8, Qs)
            ])) : S("", !0),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              title: "刷新 Star 列表",
              onClick: u[4] || (u[4] = (h) => t(j).refreshRepositories())
            }, [
              e("span", {
                class: F({ spinning: T.value })
              }, "🔄", 2),
              e("span", null, a(T.value ? "读取中…" : "刷新"), 1)
            ]),
            t(N).filteredUncatRepos.length ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: o.value ? "展开托盘" : "收起托盘",
              onClick: g
            }, a(o.value ? "展开 ▼" : "收起 ▲"), 9, Js)) : S("", !0)
          ])
        ]),
        T.value && !t(N).filteredUncatRepos.length ? (s(), n("div", Zs, [
          (s(), n(O, null, Y(6, (h) => e("div", {
            key: "skel-shelf-" + h,
            class: "repo gh-card skel-card"
          }, [...u[27] || (u[27] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ])) : t(N).filteredUncatRepos.length ? re((s(), n("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: l,
          class: "shelf-cards-scroll",
          onWheel: f
        }, [
          (s(!0), n(O, null, Y(t(N).pagedUncatRepos, (h) => (s(), n("article", {
            key: h.full_name,
            class: F(["repo gh-card shelf-card", { "card-dragging": d.value?.full_name === h.full_name }]),
            draggable: "true",
            onClick: (_) => me(h),
            onDragstart: (_) => B(_, h, null),
            onDragend: $,
            onContextmenu: (_) => K(_, h, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: Q((_) => K(_, h, null), ["stop"])
            }, "⋮", 8, to),
            e("div", so, [
              e("img", {
                class: "gh-owner-avatar",
                src: h.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: u[5] || (u[5] = (_) => _.target.src = "assets/github-star.svg")
              }, null, 40, oo),
              e("a", {
                href: h.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: h.full_name,
                onClick: u[6] || (u[6] = Q(() => {
                }, ["stop"]))
              }, [
                e("span", ao, a(h.owner?.login || h.full_name.split("/")[0]) + "/", 1),
                ae(a(h.name), 1)
              ], 8, no)
            ]),
            e("div", lo, [
              e("div", io, [
                u[28] || (u[28] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                h.topics && h.topics.length ? (s(), n(O, { key: 0 }, [
                  (s(!0), n(O, null, Y(h.topics.slice(0, 2), (_) => (s(), n("span", {
                    key: _,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + _
                  }, " #" + a(_), 9, ro))), 128)),
                  h.topics.length > 2 ? (s(), n("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: h.topics.slice(2).map((_) => "#" + _).join(" ")
                  }, " +" + a(h.topics.length - 2), 9, co)) : S("", !0)
                ], 64)) : S("", !0)
              ]),
              e("p", {
                class: "desc",
                title: h.description || ""
              }, a(h.description || "暂无描述"), 9, uo)
            ]),
            e("div", po, [
              e("span", ho, "★ " + a(h.stargazers_count), 1),
              h.language ? (s(), n("span", go, a(h.language), 1)) : S("", !0),
              e("span", mo, "更新 " + a(He(h.updated_at)), 1)
            ])
          ], 42, eo))), 128)),
          t(N).uncatPage < t(N).uncatTotalPages ? (s(), n("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: u[7] || (u[7] = //@ts-ignore
            (...h) => t(N).nextUncatPage && t(N).nextUncatPage(...h))
          }, [
            e("div", fo, [
              u[29] || (u[29] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              u[30] || (u[30] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", bo, a(t(N).uncatPage + 1) + " / " + a(t(N).uncatTotalPages) + " 页", 1)
            ])
          ])) : S("", !0)
        ], 544)), [
          [Oe, !o.value]
        ]) : S("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: i,
        class: "board-viewport",
        onWheel: W,
        onDragover: ie
      }, [
        T.value && !t(N).lists.length ? (s(), n("div", vo, [
          (s(), n(O, null, Y(4, (h) => e("div", {
            key: "skel-col-" + h,
            class: "board-column skel-column"
          }, [
            u[32] || (u[32] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", yo, [
              (s(), n(O, null, Y(3, (_) => e("div", {
                key: "skel-col-card-" + _,
                class: "repo gh-card skel-card"
              }, [...u[31] || (u[31] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (s(), n("div", wo, [
          (s(!0), n(O, null, Y(t(N).lists, (h) => (s(), n("section", {
            key: h.id,
            class: F(["board-column list-column", { "drop-active": x.value === h.name }]),
            onDragover: (_) => X(_, h.name),
            onDragleave: (_) => de(_, h.name),
            onDrop: (_) => ge(_, h.name)
          }, [
            e("header", ko, [
              e("div", $o, [
                u[33] || (u[33] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: h.description || "GitHub 列表: " + h.name
                }, " 📁 " + a(h.name), 9, Co),
                e("span", Go, a(t(N).getReposForList(h.name).length), 1)
              ]),
              e("div", To, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "删除此 GitHub 列表",
                  onClick: (_) => t(j).deleteFolder(h.name)
                }, "✕", 8, Ro)
              ])
            ]),
            e("div", Mo, [
              (s(!0), n(O, null, Y(t(N).getReposForList(h.name), (_) => (s(), n("article", {
                key: _.full_name,
                class: F(["repo gh-card", { "card-dragging": d.value?.full_name === _.full_name }]),
                draggable: "true",
                onClick: (z) => me(_),
                onDragstart: (z) => B(z, _, h.name),
                onDragend: $,
                onContextmenu: (z) => K(z, _, h.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: Q((z) => K(z, _, h.name), ["stop"])
                }, "⋮", 8, xo),
                e("div", Lo, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: _.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: u[11] || (u[11] = (z) => z.target.src = "assets/github-star.svg")
                  }, null, 40, Ao),
                  e("a", {
                    href: _.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: _.full_name,
                    onClick: u[12] || (u[12] = Q(() => {
                    }, ["stop"]))
                  }, [
                    e("span", Ho, a(_.owner?.login || _.full_name.split("/")[0]) + "/", 1),
                    ae(a(_.name), 1)
                  ], 8, Do)
                ]),
                e("div", Uo, [
                  e("div", Po, [
                    e("span", {
                      class: "gh-badge-folder",
                      title: "属于列表: " + h.name
                    }, [
                      ae(" 📁 " + a(h.name) + " ", 1),
                      e("span", {
                        class: "btn-inline-remove",
                        title: "从该列表中移出",
                        role: "button",
                        tabindex: "0",
                        onClick: Q((z) => t(N).removeRepoFromList(_.full_name, h.name), ["stop"])
                      }, "×", 8, Io)
                    ], 8, Eo),
                    _.topics && _.topics.length ? (s(), n(O, { key: 0 }, [
                      (s(!0), n(O, null, Y(_.topics.slice(0, 2), (z) => (s(), n("span", {
                        key: z,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + z
                      }, " #" + a(z), 9, No))), 128)),
                      _.topics.length > 2 ? (s(), n("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: _.topics.slice(2).map((z) => "#" + z).join(" ")
                      }, " +" + a(_.topics.length - 2), 9, jo)) : S("", !0)
                    ], 64)) : S("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: _.description || ""
                  }, a(_.description || "暂无描述"), 9, Fo)
                ]),
                e("div", Oo, [
                  e("span", Wo, "★ " + a(_.stargazers_count), 1),
                  _.language ? (s(), n("span", zo, a(_.language), 1)) : S("", !0),
                  e("span", Bo, "更新 " + a(He(_.updated_at)), 1)
                ])
              ], 42, So))), 128)),
              t(N).getReposForList(h.name).length ? S("", !0) : (s(), n("div", Yo, [...u[34] || (u[34] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, _o))), 128)),
          e("section", Vo, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              onClick: u[13] || (u[13] = (h) => t(j).promptCreateFolder())
            }, [...u[35] || (u[35] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", null, "新建 GitHub 列表", -1)
            ])])
          ])
        ]))
      ], 544),
      (s(), ue(We, { to: "body" }, [
        k.visible && k.repo ? (s(), n("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ze({ left: `${k.x}px`, top: `${k.y}px` }),
          onClick: u[21] || (u[21] = Q(() => {
          }, ["stop"])),
          onContextmenu: u[22] || (u[22] = Q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: F(["gh-menu-has-sub", { "is-active": C.value === "folder" }]),
            onMouseenter: u[16] || (u[16] = (h) => C.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: u[14] || (u[14] = Q((h) => C.value = C.value === "folder" ? null : "folder", ["stop"]))
            }, [...u[36] || (u[36] = [
              e("span", null, "移动/加入列表", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: F(["gh-sub-flyout", { "flyout-left": V.value }]),
              onClick: u[15] || (u[15] = Q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: le
              }, " 设为未分类 "),
              (s(!0), n(O, null, Y(t(N).lists, (h) => (s(), n("button", {
                key: h.id,
                class: F(["fo-cover-menu-item", { primary: t(j).getRepoFolders(k.repo.full_name).includes(h.name) }]),
                type: "button",
                onClick: (_) => J(h.name)
              }, a(t(j).getRepoFolders(k.repo.full_name).includes(h.name) ? "✓ " : "  ") + "📁 " + a(h.name), 11, qo))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[17] || (u[17] = (h) => C.value = null),
            onClick: u[18] || (u[18] = (h) => me(k.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[19] || (u[19] = (h) => C.value = null),
            onClick: oe
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[20] || (u[20] = (h) => C.value = null),
            onClick: ce
          }, " 复制克隆命令 (git clone) ", 32)
        ], 36)) : S("", !0)
      ]))
    ]));
  }
}), Xo = /* @__PURE__ */ Ge(Ko, [["__scopeId", "data-v-4fe76e53"]]);
function Qo(v) {
  const i = v.subject?.url, l = v.repository?.html_url || "https://github.com";
  if (!i) return l;
  const o = v.subject?.type;
  return o === "Issue" ? i.replace("https://api.github.com/repos/", "https://github.com/") : o === "PullRequest" ? i.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : o === "Release" ? i.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : i.replace("https://api.github.com/repos/", "https://github.com/");
}
function Jo(v) {
  try {
    const i = Date.now() - new Date(v).getTime();
    if (i < 6e4) return "刚刚";
    const l = Math.floor(i / 6e4);
    if (l < 60) return `${l} 分钟前`;
    const o = Math.floor(l / 60);
    if (o < 24) return `${o} 小时前`;
    const g = Math.floor(o / 24);
    return g < 30 ? `${g} 天前` : v.slice(5, 10);
  } catch {
    return "";
  }
}
const H = Ce({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), ve = {
  open() {
    H.isOpen = !0, (!H.items.length || Date.now() - H.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    H.isOpen = !1;
  },
  toggle() {
    H.isOpen ? this.close() : this.open();
  },
  setTab(v) {
    H.activeKind = v;
  },
  async refresh() {
    const v = j.token?.trim();
    if (!v) {
      H.items = [], H.unreadCount = 0, H.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    H.loading = !0, H.error = "";
    try {
      const i = {
        ...De(v),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, l = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: i
      });
      if (!l.ok)
        throw l.status === 401 ? new Error("GitHub Token 无效或已过期") : l.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${l.status})`);
      const o = await l.json();
      if (!Array.isArray(o))
        throw new Error("GitHub 返回数据异常");
      const g = o.map((f) => ({
        id: String(f.id),
        unread: !!f.unread,
        reason: String(f.reason || ""),
        updatedAt: f.updated_at,
        formattedTime: Jo(f.updated_at),
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
        htmlUrl: Qo(f)
      }));
      H.items = g, H.unreadCount = g.filter((f) => f.unread).length, H.lastFetchedAt = Date.now();
    } catch (i) {
      console.warn("[GitHubNotifications] 读取失败:", i), H.error = i?.message || "网络请求异常";
    } finally {
      H.loading = !1;
    }
  },
  openTarget(v) {
    typeof window < "u" && window.open(v.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, y = Ce({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function Le(v) {
  try {
    const i = Date.now() - new Date(v).getTime(), l = Math.floor(i / 6e4);
    if (l < 1) return "刚刚";
    if (l < 60) return `${l}分钟前`;
    const o = Math.floor(l / 60);
    if (o < 24) return `${o}小时前`;
    const g = Math.floor(o / 24);
    if (g < 30) return `${g}天前`;
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
function Zo(v) {
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
  const i = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return v.map((l) => ({
    emoji: i[l.content] || l.content,
    count: l.reactors?.totalCount || l.users?.totalCount || 0
  })).filter((l) => l.count > 0);
}
function et(v) {
  if (!v || typeof v != "object") return [];
  const i = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, l = [];
  for (const [o, g] of Object.entries(i)) {
    const f = Number(v[o] || 0);
    f > 0 && l.push({ emoji: g, count: f });
  }
  return l;
}
async function tt(v, i) {
  if (!v) return "";
  try {
    const l = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...De(i),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: v, mode: "gfm" })
    });
    if (l.ok)
      return await l.text();
  } catch {
  }
  return he.renderMarkdown(v);
}
async function en(v, i, l, o) {
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
    const f = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...De(o),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: g,
        variables: { owner: v, name: i, num: l }
      })
    });
    if (!f.ok) return null;
    const d = (await f.json())?.data?.repository?.discussion;
    if (!d) return null;
    let m = 0;
    const x = (d.comments?.nodes || []).map((U) => {
      const A = U.replies?.nodes || [];
      m += A.length;
      const k = A.map((C) => ({
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
        id: U.id,
        author: {
          login: U.author?.login || "匿名",
          avatarUrl: U.author?.avatarUrl || "",
          association: Ae(U.authorAssociation)
        },
        createdAt: U.createdAt,
        formattedTime: Le(U.createdAt),
        body: U.body || "",
        bodyHtml: U.bodyHTML || (U.body ? he.renderMarkdown(U.body) : "<p>（评论内容为空）</p>"),
        reactions: je(U.reactionGroups),
        replies: k
      };
    }), L = d.body || "", G = d.bodyHTML && d.bodyHTML.trim().length > 10 ? d.bodyHTML : L ? he.renderMarkdown(L) : "<p>（主贴内容为空）</p>";
    return {
      title: d.title,
      number: l,
      state: "discussion",
      category: d.category ? {
        name: d.category.name,
        emoji: Zo(d.category.emoji)
      } : void 0,
      author: {
        login: d.author?.login || "未知",
        avatarUrl: d.author?.avatarUrl || "",
        association: Ae(d.authorAssociation)
      },
      createdAt: d.createdAt,
      formattedTime: Le(d.createdAt),
      body: L,
      bodyHtml: G,
      htmlUrl: d.url,
      commentsCount: d.comments?.totalCount || x.length,
      totalRepliesCount: m,
      comments: x,
      reactions: je(d.reactionGroups)
    };
  } catch {
    return null;
  }
}
const Fe = {
  async open(v) {
    y.isOpen = !0, y.loading = !0, y.error = "", y.data = null, y.notificationItem = v;
    const i = j.token?.trim() || "", l = {
      ...De(i),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const o = v.subject?.url, g = v.subject?.type, f = v.repository?.fullName || "", [T, d] = f.split("/"), m = o?.match(/\/(\d+)$/), x = m ? Number(m[1]) : void 0;
      if (g === "Discussion" && T && d && x) {
        const L = await en(T, d, x, i);
        if (L) {
          y.data = {
            notificationId: v.id,
            title: L.title || v.subject.title,
            number: x,
            state: "discussion",
            category: L.category,
            author: L.author || { login: v.repository.owner.login, avatarUrl: v.repository.owner.avatarUrl || "" },
            createdAt: L.createdAt || v.updatedAt,
            formattedTime: L.formattedTime || v.formattedTime,
            body: L.body || "",
            bodyHtml: L.bodyHtml || (L.body ? he.renderMarkdown(L.body) : ""),
            htmlUrl: L.htmlUrl || v.htmlUrl,
            commentsCount: L.commentsCount || 0,
            totalRepliesCount: L.totalRepliesCount || 0,
            comments: L.comments || [],
            reactions: L.reactions || [],
            repositoryFullName: f,
            type: "Discussion"
          };
          return;
        }
      }
      if (o) {
        const L = await fetch(o, { headers: l, cache: "no-store" });
        if (L.ok) {
          const G = await L.json();
          let U = [];
          if (G.comments_url && G.comments > 0)
            try {
              const C = await fetch(`${G.comments_url}?per_page=50`, { headers: l, cache: "no-store" });
              if (C.ok) {
                const V = await C.json();
                Array.isArray(V) && (U = await Promise.all(
                  V.map(async (D) => {
                    const K = D.body_html || (D.body ? await tt(D.body, i) : "");
                    return {
                      id: D.id,
                      author: {
                        login: D.user?.login || "匿名",
                        avatarUrl: D.user?.avatar_url || "",
                        association: Ae(D.author_association)
                      },
                      createdAt: D.created_at,
                      formattedTime: Le(D.created_at),
                      body: D.body || "",
                      bodyHtml: K,
                      reactions: et(D.reactions)
                    };
                  })
                ));
              }
            } catch (C) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", C);
            }
          const A = G.body || "";
          let k = G.body_html || "";
          !k && A && (k = await tt(A, i)), !k && A && (k = he.renderMarkdown(A)), y.data = {
            notificationId: v.id,
            title: G.title || G.name || v.subject.title,
            number: G.number || x,
            state: G.merged ? "merged" : G.state || G.conclusion || "open",
            author: {
              login: G.user?.login || G.author?.login || v.repository.owner.login,
              avatarUrl: G.user?.avatar_url || G.author?.avatar_url || v.repository.owner.avatarUrl || "",
              association: Ae(G.author_association)
            },
            createdAt: G.created_at || G.published_at || v.updatedAt,
            formattedTime: Le(G.created_at || G.published_at || v.updatedAt),
            body: A,
            bodyHtml: k || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: G.html_url || v.htmlUrl,
            commentsCount: typeof G.comments == "number" ? G.comments : U.length,
            comments: U,
            reactions: et(G.reactions),
            repositoryFullName: f,
            type: g || "Issue"
          };
          return;
        }
      }
      y.data = {
        notificationId: v.id,
        title: v.subject.title,
        number: x,
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
        type: g || "通知"
      };
    } catch (o) {
      console.warn("[GitHubNotificationDetail] 读取异常:", o), y.error = o?.message || "网络请求异常";
    } finally {
      y.loading = !1;
    }
  },
  close() {
    y.isOpen = !1, y.data = null, y.error = "";
  }
}, tn = { class: "vue-gh-notification-panel-wrapper" }, sn = { class: "gh-msg-header" }, on = { class: "gh-msg-account" }, nn = { class: "gh-msg-subtitle" }, an = {
  class: "gh-msg-tabs",
  role: "tablist"
}, ln = ["onClick"], rn = { class: "gh-msg-list" }, cn = {
  key: 0,
  class: "gh-msg-loading"
}, un = {
  key: 1,
  class: "gh-msg-error"
}, dn = {
  key: 2,
  class: "gh-msg-empty"
}, pn = ["onClick"], hn = { class: "gh-card-indicator-col" }, gn = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, mn = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, fn = { class: "gh-card-type-col" }, bn = ["title"], vn = { class: "gh-card-main-col" }, yn = { class: "gh-card-repo-row" }, wn = ["title"], _n = { class: "gh-card-reason-tag" }, kn = { class: "gh-card-time" }, $n = ["title"], Cn = { class: "gh-card-footer-row" }, Gn = { class: "gh-card-type-label" }, Tn = ["onClick"], Rn = /* @__PURE__ */ $e({
  __name: "GitHubNotificationPanel",
  setup(v) {
    const i = E(null), l = se(() => [
      { kind: "all", label: "所有", count: H.items.length },
      { kind: "unread", label: "未读", count: H.items.filter((A) => A.unread).length },
      { kind: "mention", label: "提及", count: H.items.filter((A) => A.reason === "mention").length },
      { kind: "author", label: "作者", count: H.items.filter((A) => A.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: H.items.filter((A) => A.reason === "ci_activity" || A.subject.type === "CheckSuite").length }
    ]), o = se(() => {
      const A = H.items;
      switch (H.activeKind) {
        case "unread":
          return A.filter((k) => k.unread);
        case "mention":
          return A.filter((k) => k.reason === "mention");
        case "author":
          return A.filter((k) => k.reason === "author");
        case "ci":
          return A.filter((k) => k.reason === "ci_activity" || k.subject.type === "CheckSuite");
        default:
          return A;
      }
    });
    function g(A, k) {
      if (k === "ci_activity" || A === "CheckSuite")
        return "⚡";
      switch (A) {
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
    function f(A) {
      switch (A) {
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
          return A || "通知";
      }
    }
    function T() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function d() {
      ve.refresh();
    }
    function m() {
      ve.close();
    }
    function x(A) {
      Fe.open(A);
    }
    function L(A) {
      ve.openTarget(A);
    }
    function G(A) {
      if (!H.isOpen) return;
      const k = A.target;
      !i.value?.contains(k) && !k?.closest("#gh-header-msg-center-btn") && ve.close();
    }
    function U(A) {
      A.key === "Escape" && H.isOpen && ve.close();
    }
    return Pe(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", G), window.addEventListener("keydown", U));
    }), Ee(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", G), window.removeEventListener("keydown", U));
    }), (A, k) => (s(), n("div", tn, [
      t(H).isOpen ? (s(), n("section", {
        key: 0,
        ref_key: "panelRef",
        ref: i,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: k[0] || (k[0] = Q(() => {
        }, ["stop"]))
      }, [
        e("header", sn, [
          e("div", on, [
            k[2] || (k[2] = e("div", { class: "gh-msg-octo-avatar" }, [
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
              k[1] || (k[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", nn, " 共 " + a(t(H).items.length) + " 条通知 · " + a(t(H).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          k[3] || (k[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: T
          }, " ↗ "),
          e("button", {
            type: "button",
            class: F(["gh-panel-btn", { "is-spinning": t(H).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: d
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: m
          }, " ✕ ")
        ]),
        e("nav", an, [
          (s(!0), n(O, null, Y(l.value, (C) => (s(), n("button", {
            key: C.kind,
            type: "button",
            class: F(["gh-msg-tab", { active: t(H).activeKind === C.kind }]),
            onClick: (V) => t(H).activeKind = C.kind
          }, [
            ae(a(C.label) + " ", 1),
            C.count > 0 ? (s(), n("span", {
              key: 0,
              class: F(["gh-tab-pill", { "is-unread-pill": C.kind === "unread" }])
            }, a(C.count), 3)) : S("", !0)
          ], 10, ln))), 128))
        ]),
        e("div", rn, [
          t(H).loading && !t(H).items.length ? (s(), n("div", cn, [...k[4] || (k[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(H).error ? (s(), n("div", un, [
            k[5] || (k[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, a(t(H).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: d
            }, "重试")
          ])) : o.value.length === 0 ? (s(), n("div", dn, [...k[6] || (k[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (s(!0), n(O, { key: 3 }, Y(o.value, (C) => (s(), n("article", {
            key: C.id,
            class: F(["gh-notification-card", { "is-unread": C.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (V) => x(C)
          }, [
            e("div", hn, [
              C.unread ? (s(), n("span", gn)) : (s(), n("span", mn))
            ]),
            e("div", fn, [
              e("span", {
                class: "gh-type-badge",
                title: C.subject.type
              }, a(g(C.subject.type, C.reason)), 9, bn)
            ]),
            e("div", vn, [
              e("div", yn, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: C.repository.fullName
                }, a(C.repository.fullName), 9, wn),
                e("span", _n, a(f(C.reason)), 1),
                e("time", kn, a(C.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: C.subject.title
              }, a(C.subject.title), 9, $n),
              e("div", Cn, [
                e("span", Gn, a(C.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: Q((V) => L(C), ["stop"])
                }, "在网页打开 ↗", 8, Tn)
              ])
            ])
          ], 10, pn))), 128))
        ])
      ], 512)) : S("", !0)
    ]));
  }
}), Mn = /* @__PURE__ */ Ge(Rn, [["__scopeId", "data-v-4271efab"]]), Sn = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, xn = ["aria-label"], Ln = { class: "gh-modal-title-wrap" }, An = { class: "gh-modal-octo-icon" }, Dn = ["href"], Hn = { class: "gh-owner" }, Un = { class: "gh-name" }, Pn = {
  key: 1,
  class: "gh-modal-repo-name"
}, En = { class: "gh-name" }, In = { class: "gh-modal-actions" }, Nn = { class: "gh-modal-content" }, jn = {
  key: 0,
  class: "gh-content-loading"
}, Fn = {
  key: 1,
  class: "gh-content-error"
}, On = { class: "gh-discussion-title-header" }, Wn = { class: "gh-discussion-h1" }, zn = {
  key: 0,
  class: "gh-discussion-num"
}, Bn = { class: "gh-discussion-sub-meta" }, Yn = {
  key: 0,
  class: "gh-category-pill"
}, Vn = {
  key: 0,
  class: "cat-emoji"
}, qn = {
  key: 1,
  class: "gh-category-pill"
}, Kn = { class: "gh-sub-author" }, Xn = { class: "gh-sub-verb" }, Qn = {
  key: 2,
  class: "gh-sub-comments-count"
}, Jn = { class: "gh-op-post-card" }, Zn = { class: "gh-op-post-head" }, ea = { class: "gh-op-author-left" }, ta = ["src"], sa = { class: "gh-op-meta" }, oa = { class: "gh-op-name-row" }, na = { class: "gh-op-name" }, aa = {
  key: 0,
  class: "gh-role-pill"
}, la = { class: "gh-op-time" }, ia = ["innerHTML"], ra = {
  key: 0,
  class: "gh-reactions-bar"
}, ca = { class: "rx-emoji" }, ua = { class: "rx-count" }, da = {
  key: 0,
  class: "gh-comments-block"
}, pa = { class: "gh-comments-header" }, ha = { class: "gh-comments-count-pill" }, ga = { class: "gh-comments-feed" }, ma = { class: "gh-comment-head" }, fa = ["src"], ba = { class: "gh-comment-meta" }, va = { class: "gh-comment-author" }, ya = {
  key: 0,
  class: "gh-role-pill small"
}, wa = { class: "gh-comment-time" }, _a = ["innerHTML"], ka = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, $a = { class: "rx-emoji" }, Ca = { class: "rx-count" }, Ga = {
  key: 1,
  class: "gh-comment-replies-thread"
}, Ta = { class: "gh-replies-thread-title" }, Ra = { class: "gh-reply-head" }, Ma = ["src"], Sa = { class: "gh-reply-meta" }, xa = { class: "gh-reply-author" }, La = {
  key: 0,
  class: "gh-role-pill tiny"
}, Aa = { class: "gh-reply-time" }, Da = ["innerHTML"], Ha = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, Ua = { class: "rx-emoji" }, Pa = { class: "rx-count" }, Ea = {
  key: 1,
  class: "gh-no-comments"
}, Ia = /* @__PURE__ */ $e({
  __name: "GitHubNotificationDetailDrawer",
  setup(v) {
    const i = E(null), l = E(null), o = E(null);
    let g = !1, f = 0, T = 0, d = 0, m = 0, x = () => {
    };
    const L = se(() => (y.data?.repositoryFullName || y.notificationItem?.repository.fullName || "").split("/")[0] || ""), G = se(() => {
      const P = y.data?.repositoryFullName || y.notificationItem?.repository.fullName || "";
      return P.split("/")[1] || P;
    }), U = se(() => {
      if (!y.data) return "";
      const P = y.data.bodyHtml?.trim() || "";
      if (P.length > 20) return P;
      const I = y.data.body?.trim() || "";
      return I.length > 0 ? he.renderMarkdown(I) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), A = se(() => o.value ? {
      position: "fixed",
      left: `${o.value.x}px`,
      top: `${o.value.y}px`,
      transform: "none"
    } : {});
    ke(
      () => y.isOpen,
      (P) => {
        P && (o.value = null, Qe(() => {
          l.value && (l.value.scrollTop = 0);
        }));
      }
    ), ke(
      () => y.data,
      (P) => {
        P && Qe(() => {
          l.value && (l.value.scrollTop = 0);
        });
      }
    );
    function k(P) {
      if (P.target.closest("button, a, input")) return;
      x();
      const I = i.value;
      if (!I || !y.isOpen) return;
      g = !0;
      const W = I.getBoundingClientRect();
      d = W.left, m = W.top, f = P.clientX, T = P.clientY, o.value = { x: d, y: m };
      const q = (ie) => {
        if (!g) return;
        const B = ie.clientX - f, $ = ie.clientY - T;
        o.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, d + B)),
          y: Math.max(10, Math.min(window.innerHeight - 80, m + $))
        };
      }, ne = () => {
        g = !1, window.removeEventListener("mousemove", q), window.removeEventListener("mouseup", ne);
      };
      x = ne, window.addEventListener("mousemove", q), window.addEventListener("mouseup", ne);
    }
    function C() {
      Fe.close();
    }
    function V() {
      const P = y.data?.htmlUrl || y.notificationItem?.htmlUrl;
      P && typeof window < "u" && window.open(P, "_blank", "noopener,noreferrer");
    }
    function D(P) {
      const W = P.target?.closest("a");
      W && W.href && (P.preventDefault(), P.stopPropagation(), window.open(W.href, "_blank", "noopener,noreferrer"));
    }
    function K() {
      y.notificationItem && Fe.open(y.notificationItem);
    }
    function le(P) {
      switch (P) {
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
    function J(P) {
      switch (P) {
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
          return P || "通知详情";
      }
    }
    function oe(P) {
      switch (P) {
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
          return P || "";
      }
    }
    function ce(P) {
      P.key === "Escape" && y.isOpen && C();
    }
    return Pe(() => {
      window.addEventListener("keydown", ce);
    }), Ee(() => {
      window.removeEventListener("keydown", ce), x();
    }), (P, I) => (s(), ue(We, { to: "body" }, [
      t(y).isOpen ? (s(), n("div", Sn, [
        e("div", {
          ref_key: "windowRef",
          ref: i,
          class: "gh-nonmodal-window",
          style: ze(A.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(y).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: k
          }, [
            e("div", Ln, [
              e("span", An, a(le(t(y).data?.type || t(y).notificationItem?.subject.type)), 1),
              t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl ? (s(), n("a", {
                key: 0,
                href: t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", Hn, a(L.value), 1),
                I[0] || (I[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", Un, a(G.value), 1),
                I[1] || (I[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, Dn)) : (s(), n("span", Pn, [
                e("strong", En, a(t(y).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", In, [
              t(y).data?.state ? (s(), n("span", {
                key: 0,
                class: F(["gh-detail-state-pill", t(y).data.state])
              }, a(oe(t(y).data.state)), 3)) : S("", !0),
              t(y).data?.htmlUrl || t(y).notificationItem?.htmlUrl ? (s(), n("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: V
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
          e("div", Nn, [
            t(y).loading ? (s(), n("div", jn, [
              I[2] || (I[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + a(t(y).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(y).error ? (s(), n("div", Fn, [
              I[3] || (I[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, a(t(y).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: K
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: V
                }, "在 GitHub 打开 ↗")
              ])
            ])) : t(y).data ? (s(), n("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: l,
              class: "gh-detail-scrollable",
              onClick: D
            }, [
              e("div", On, [
                e("h1", Wn, [
                  ae(a(t(y).data.title) + " ", 1),
                  t(y).data.number ? (s(), n("span", zn, "#" + a(t(y).data.number), 1)) : S("", !0)
                ]),
                e("div", Bn, [
                  t(y).data.category ? (s(), n("span", Yn, [
                    t(y).data.category.emoji ? (s(), n("span", Vn, a(t(y).data.category.emoji), 1)) : S("", !0),
                    e("span", null, a(t(y).data.category.name), 1)
                  ])) : (s(), n("span", qn, a(J(t(y).data.type)), 1)),
                  e("span", Kn, a(t(y).data.author.login), 1),
                  e("span", Xn, "发布于 " + a(t(y).data.formattedTime), 1),
                  t(y).data.commentsCount ? (s(), n("span", Qn, [
                    ae(" · " + a(t(y).data.commentsCount) + " 条讨论主题 ", 1),
                    t(y).data.totalRepliesCount ? (s(), n(O, { key: 0 }, [
                      ae(" （含 " + a(t(y).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : S("", !0)
                  ])) : S("", !0)
                ])
              ]),
              e("article", Jn, [
                e("div", Zn, [
                  e("div", ea, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(y).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, ta),
                    e("div", sa, [
                      e("div", oa, [
                        e("strong", na, a(t(y).data.author.login), 1),
                        t(y).data.author.association ? (s(), n("span", aa, a(t(y).data.author.association), 1)) : S("", !0)
                      ]),
                      e("time", la, a(t(y).data.formattedTime), 1)
                    ])
                  ]),
                  I[4] || (I[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                I[5] || (I[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: U.value
                }, null, 8, ia),
                t(y).data.reactions?.length ? (s(), n("div", ra, [
                  (s(!0), n(O, null, Y(t(y).data.reactions, (W) => (s(), n("span", {
                    key: W.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", ca, a(W.emoji), 1),
                    e("span", ua, a(W.count), 1)
                  ]))), 128))
                ])) : S("", !0)
              ]),
              t(y).data.comments.length ? (s(), n("div", da, [
                e("div", pa, [
                  I[6] || (I[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", ha, [
                    ae(a(t(y).data.commentsCount) + " 条主题 ", 1),
                    t(y).data.totalRepliesCount ? (s(), n(O, { key: 0 }, [
                      ae(" · " + a(t(y).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : S("", !0)
                  ])
                ]),
                e("div", ga, [
                  (s(!0), n(O, null, Y(t(y).data.comments, (W) => (s(), n("div", {
                    key: W.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", ma, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: W.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, fa),
                      e("div", ba, [
                        e("span", va, a(W.author.login), 1),
                        W.author.association ? (s(), n("span", ya, a(W.author.association), 1)) : S("", !0),
                        e("time", wa, a(W.formattedTime), 1)
                      ])
                    ]),
                    I[7] || (I[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: W.bodyHtml
                    }, null, 8, _a),
                    W.reactions?.length ? (s(), n("div", ka, [
                      (s(!0), n(O, null, Y(W.reactions, (q) => (s(), n("span", {
                        key: q.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", $a, a(q.emoji), 1),
                        e("span", Ca, a(q.count), 1)
                      ]))), 128))
                    ])) : S("", !0),
                    W.replies?.length ? (s(), n("div", Ga, [
                      e("div", Ta, [
                        e("span", null, "💬 " + a(W.replies.length) + " 条回复对话", 1)
                      ]),
                      (s(!0), n(O, null, Y(W.replies, (q) => (s(), n("div", {
                        key: q.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", Ra, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: q.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, Ma),
                          e("div", Sa, [
                            e("strong", xa, a(q.author.login), 1),
                            q.author.association ? (s(), n("span", La, a(q.author.association), 1)) : S("", !0),
                            e("time", Aa, a(q.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: q.bodyHtml
                        }, null, 8, Da),
                        q.reactions?.length ? (s(), n("div", Ha, [
                          (s(!0), n(O, null, Y(q.reactions, (ne) => (s(), n("span", {
                            key: ne.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", Ua, a(ne.emoji), 1),
                            e("span", Pa, a(ne.count), 1)
                          ]))), 128))
                        ])) : S("", !0)
                      ]))), 128))
                    ])) : S("", !0)
                  ]))), 128))
                ])
              ])) : (s(), n("div", Ea, [...I[8] || (I[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : S("", !0)
          ])
        ], 12, xn)
      ])) : S("", !0)
    ]));
  }
}), Na = /* @__PURE__ */ Ge(Ia, [["__scopeId", "data-v-d22ba06c"]]), ja = ["inert"], Fa = { class: "card-head" }, Oa = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, Wa = ["title"], za = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Ba = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Ya = ["placeholder"], Va = ["title"], qa = { class: "gh-search-rule-icon" }, Ka = { class: "gh-search-rule-text" }, Xa = ["title"], Qa = ["title"], Ja = { class: "gh-header-msg-label" }, Za = {
  key: 0,
  class: "gh-header-msg-badge"
}, el = { class: "gh-settings-anchor" }, tl = ["aria-expanded", "aria-label", "title"], sl = {
  key: 0,
  class: "muted small",
  role: "status"
}, ol = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, nl = { class: "gh-bili-layout" }, al = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, ll = ["title"], il = { class: "fo-sidebar-toggle-title" }, rl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, cl = ["aria-expanded", "title"], ul = { class: "fo-sidebar-toggle-chevron" }, dl = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, pl = { class: "fo-sidebar-sub-wrap" }, hl = ["title"], gl = { class: "fo-sidebar-sub-main" }, ml = { class: "fo-sidebar-sub-text" }, fl = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, bl = ["title"], vl = { class: "fo-sidebar-sub-main" }, yl = { class: "fo-sidebar-sub-text" }, wl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, _l = ["title"], kl = { class: "fo-sidebar-sub-main" }, $l = { class: "fo-sidebar-sub-text" }, Cl = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Gl = ["title"], Tl = { class: "fo-sidebar-sub-main" }, Rl = { class: "fo-sidebar-sub-text" }, Ml = { class: "gh-bili-sidebar-head" }, Sl = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, xl = { style: { color: "var(--dim)", "font-size": "9.5px" } }, Ll = ["title", "aria-label"], Al = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, Dl = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Hl = {
  id: "vue-github-repositories-root",
  style: { flex: "1", "min-height": "0", display: "flex", "flex-direction": "column" }
}, Ul = /* @__PURE__ */ $e({
  __name: "GitHubWorkspaceCard",
  setup(v) {
    const i = it(() => import("./GitHubSettingsModal-BJ_bWCPF.js")), { active: l } = rt("card-github", "/github.html");
    let o = 0, g = !1, f;
    const T = E(""), d = E("stars");
    ke(() => l.value && d.value === "stars", (B) => j.setAiViewActive(B), { immediate: !0, flush: "sync" });
    const m = E(!1), x = E("local"), L = E(""), G = E(!1), U = E(0);
    function A() {
      l.value && (G.value = !0, ++U.value);
    }
    const k = E(!1);
    ke(G, (B) => {
      B && (k.value = !0);
    });
    const C = E(null);
    let V = 0;
    function D(B) {
      d.value = B, B === "trending" ? Je.switchTab("trending") : Je.switchTab("stars");
    }
    function K() {
      d.value = "stars";
    }
    const le = se(() => [
      { id: "exact", icon: "🎯", name: R("search.rule.exact"), desc: R("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: R("search.rule.fuzzy"), desc: R("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: R("search.rule.topic"), desc: R("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: R("search.rule.smart"), desc: R("search.rule.smartDesc") }
    ]), J = E(j.searchRule || "exact"), oe = se(() => le.value.find((B) => B.id === J.value) || le.value[0]);
    function ce() {
      const B = j.cycleSearchRule();
      J.value = B;
    }
    const P = se(() => x.value === "global" ? R("github.searchGlobalPlaceholder") : R("github.searchLocalPlaceholder", { rule: oe.value.name }));
    function I() {
      clearTimeout(V), !(!l.value || x.value !== "local") && (V = window.setTimeout(() => j.setSearchQuery(L.value.trim().toLowerCase()), 180));
    }
    function W() {
      x.value = x.value === "local" ? "global" : "local", x.value === "local" && I();
    }
    function q() {
      L.value = "", clearTimeout(V), j.resetLocalSearch();
    }
    function ne() {
      const B = L.value.trim();
      x.value === "local" ? (clearTimeout(V), j.setSearchQuery(B.toLowerCase())) : B && window.open(`https://github.com/search?q=${encodeURIComponent(B)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function ie() {
      ++o, g = !0, T.value = "";
    }
    return ke(l, async (B) => {
      const $ = ++o;
      if (clearTimeout(V), f?.abort(), f = new AbortController(), B || f.abort(), j.setRepositoryViewSignal(f.signal), !!B) {
        if (g) {
          await j.resumeRepositoryReads();
          return;
        }
        if (j.repos.length || j.loadingAllStars || j.loadingPage) {
          g = !0;
          return;
        }
        try {
          const X = await st();
          if (!l.value || $ !== o) return;
          g = !0, await j.loadGitHub(X.ghUser, X.ghToken);
        } catch {
          if (!l.value || $ !== o) return;
          g = !1, T.value = R("github.initError");
        }
      }
    }, { immediate: !0, flush: "sync" }), at(() => {
      j.setAiViewActive(!1), ++o, f?.abort(), clearTimeout(V);
    }), (B, $) => (s(), n("section", {
      class: F(["card wide", { "card-fullscreen": t(ft).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(l)
    }, [
      e("header", Fa, [
        $[15] || ($[15] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        $[16] || ($[16] = e("h2", null, "GitHub", -1)),
        $[17] || ($[17] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", Oa, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: Q(ne, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: x.value === "local" ? t(R)("github.searchScope.toGlobal") : t(R)("github.searchScope.toLocal"),
              onClick: W
            }, [
              e("span", za, a(x.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Ba, a(x.value === "local" ? t(R)("github.searchScope.local") : t(R)("github.searchScope.global")), 1),
              $[11] || ($[11] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, Wa),
            re(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": $[0] || ($[0] = (X) => L.value = X),
              placeholder: P.value,
              autocomplete: "off",
              onInput: I
            }, null, 40, Ya), [
              [_e, L.value]
            ]),
            x.value === "local" ? (s(), n("button", {
              key: 0,
              type: "button",
              class: F(["gh-search-rule-btn", `rule-${oe.value.id}`]),
              title: t(R)("github.ruleHint", { rule: oe.value.name, desc: oe.value.desc }),
              onClick: Q(ce, ["stop"])
            }, [
              e("span", qa, a(oe.value.icon), 1),
              e("span", Ka, a(oe.value.name), 1)
            ], 10, Va)) : S("", !0),
            re(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: t(R)("github.clearSearch"),
              onClick: q
            }, "✕", 8, Xa), [
              [Oe, L.value]
            ]),
            $[12] || ($[12] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          $[13] || ($[13] = lt('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-9e711a1e><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-9e711a1e><input type="checkbox" value="exact" checked data-v-9e711a1e>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-9e711a1e><input type="checkbox" value="loose" data-v-9e711a1e>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-9e711a1e><input type="checkbox" value="related" data-v-9e711a1e>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-9e711a1e><input type="checkbox" value="topic" data-v-9e711a1e>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-9e711a1e><input type="checkbox" value="readme" data-v-9e711a1e>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-9e711a1e></div>', 2))
        ]),
        e("button", {
          id: "gh-header-msg-center-btn",
          class: F(["gh-header-msg-btn", { "has-unread": t(H).unreadCount > 0, "is-active": t(H).isOpen }]),
          type: "button",
          title: t(H).unreadCount > 0 ? t(R)("github.header.msgUnread", { count: t(H).unreadCount }) : t(R)("github.header.msgCenter"),
          onClick: $[1] || ($[1] = (X) => t(ve).toggle())
        }, [
          $[14] || ($[14] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
          e("span", Ja, a(t(R)("github.header.msg")), 1),
          t(H).unreadCount > 0 ? (s(), n("span", Za, a(t(H).unreadCount > 99 ? "99+" : t(H).unreadCount), 1)) : S("", !0)
        ], 10, Qa),
        e("div", el, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: C,
            "aria-expanded": G.value,
            "aria-label": t(R)("github.settings"),
            class: "gh-head-settings-btn",
            title: t(R)("github.header.settings"),
            onClick: $[2] || ($[2] = (X) => G.value = !G.value)
          }, " ⚙️ ", 8, tl),
          k.value ? (s(), ue(t(i), {
            key: 0,
            visible: t(l) && G.value,
            anchor: C.value,
            "ai-request": U.value,
            onAccountReload: ie,
            onClose: $[3] || ($[3] = (X) => G.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : S("", !0)
        ])
      ]),
      T.value ? (s(), n("p", sl, a(T.value), 1)) : S("", !0),
      e("div", ol, [
        e("div", nl, [
          e("aside", al, [
            e("div", {
              class: F(["fo-sidebar-toggle-bar", { "is-collapsed": m.value }]),
              title: m.value ? t(R)("github.channel.toggleExpand") : t(R)("github.channel.toggleCollapse"),
              onClick: $[4] || ($[4] = (X) => m.value = !m.value)
            }, [
              e("div", il, [
                $[18] || ($[18] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, a(t(R)("github.channel.channels")), 1),
                m.value ? (s(), n("span", rl, "3")) : S("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !m.value,
                title: m.value ? t(R)("github.expand") : t(R)("github.collapse")
              }, [
                e("span", null, a(m.value ? t(R)("github.expand") : t(R)("github.collapse")), 1),
                e("span", ul, a(m.value ? "▾" : "▴"), 1)
              ], 8, cl)
            ], 10, ll),
            m.value ? S("", !0) : (s(), n("div", dl, [
              e("div", pl, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: d.value === "stars" }]),
                  title: t(R)("github.channel.starsTitle"),
                  onClick: $[5] || ($[5] = (X) => D("stars"))
                }, [
                  e("div", gl, [
                    $[19] || ($[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", ml, [
                      e("strong", null, a(t(R)("github.channel.stars")), 1),
                      e("small", null, a(t(R)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  $[20] || ($[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, hl)
              ]),
              e("div", fl, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: d.value === "trending" }]),
                  title: t(R)("github.channel.trendingTitle"),
                  onClick: $[6] || ($[6] = (X) => D("trending"))
                }, [
                  e("div", vl, [
                    $[21] || ($[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", yl, [
                      e("strong", null, a(t(R)("github.channel.trending")), 1),
                      e("small", null, a(t(R)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  $[22] || ($[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, bl)
              ]),
              e("div", wl, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: d.value === "awesome" }]),
                  title: t(R)("github.channel.awesomeTitle"),
                  onClick: $[7] || ($[7] = (X) => D("awesome"))
                }, [
                  e("div", kl, [
                    $[23] || ($[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", $l, [
                      e("strong", null, a(t(R)("github.channel.awesome")), 1),
                      e("small", null, a(t(R)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  $[24] || ($[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, _l)
              ]),
              e("div", Cl, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: F(["fo-sidebar-sub-btn", { on: d.value === "repos" }]),
                  title: t(R)("github.channel.reposTitle"),
                  onClick: $[8] || ($[8] = (X) => D("repos"))
                }, [
                  e("div", Tl, [
                    $[25] || ($[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", Rl, [
                      e("strong", null, a(t(R)("github.channel.repos")), 1),
                      e("small", null, a(t(R)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  $[26] || ($[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, Gl)
              ])
            ])),
            e("header", Ml, [
              e("div", null, [
                e("b", Sl, [
                  $[27] || ($[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  ae(" " + a(t(R)("github.lists.title")), 1)
                ]),
                e("small", xl, a(t(R)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: t(R)("github.lists.new"),
                "aria-label": t(R)("github.lists.new"),
                onClick: $[9] || ($[9] = (X) => t(j).promptCreateFolder())
              }, "＋", 8, Ll)
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: K
            }, [
              Te(ht, { active: t(l) }, null, 8, ["active"])
            ])
          ]),
          e("section", Al, [
            d.value === "stars" && t(ut).accountConfigured === !1 ? (s(), ue(dt, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: $[10] || ($[10] = (X) => G.value = !0)
            })) : d.value === "stars" ? (s(), n(O, { key: 1 }, [
              e("header", Dl, [
                Te(gt, { onOpenAiSettings: A })
              ]),
              e("div", Hl, [
                Te(Xo, {
                  active: t(l) && d.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : d.value === "trending" ? (s(), ue(mt, { key: 2 })) : d.value === "awesome" ? (s(), ue(Pt, { key: 3 })) : d.value === "repos" ? (s(), ue(Fs, {
              key: 4,
              active: t(l) && d.value === "repos"
            }, null, 8, ["active"])) : S("", !0)
          ])
        ])
      ]),
      Te(Mn),
      Te(Na)
    ], 10, ja));
  }
}), Yl = /* @__PURE__ */ Ge(Ul, [["__scopeId", "data-v-9e711a1e"]]);
export {
  Yl as default
};
