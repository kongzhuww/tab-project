import { d as _e, o as s, g as n, h as e, n as ie, q as ye, i as R, F as W, j as B, C as j, t as a, u as t, k as X, b as E, y as te, r as ke, w as we, D as je, z as Fe, A as Ie, m as Ee, e as de, l as Ye, B as Ve, p as ae, G as Ze, L as it, H as rt, s as Me, E as ct } from "./vendor-vue-FFI3kJnP.js";
import { u as ut } from "./useCardActivity-B5sPzUkz.js";
import { D as nt, E as Ue, F as Ae, H as Ne, t as K, A as dt, y as pt } from "./search.service-B_r1P6oe.js";
import { A as ht } from "./AccountSetupGuide-ZDGhjuNx.js";
import { g as gt, _ as mt, a as et, G as ft } from "./main-CQf_lm0f.js";
import bt from "./GitHubTrending-DLY6jABO.js";
import { _ as $e, t as T } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { s as Re } from "./storage-cache.service-BYF2zxXX.js";
import { n as tt, r as vt } from "./view-styles-DNJvDC7i.js";
import { m as he } from "./core-utils-DYgSCp9X.js";
const yt = [
  { id: "all", name: "全部清单", icon: "🌟" },
  { id: "ai", name: "AI 与大模型", icon: "🤖" },
  { id: "frontend", name: "现代前端", icon: "🎨" },
  { id: "backend", name: "后端与语言", icon: "⚡" },
  { id: "selfhosted", name: "自建服务与私有云", icon: "🏠" },
  { id: "tools", name: "CLI 与效率工具", icon: "🛠️" },
  { id: "learning", name: "计算机体系与学习", icon: "📚" }
], wt = [
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
], _t = { class: "gh-awesome-wrapper" }, kt = { class: "gh-awesome-header" }, $t = { class: "gh-awesome-intro" }, Ct = { class: "gh-awesome-search-box" }, Gt = { class: "gh-awesome-pills" }, Tt = ["onClick"], Mt = { class: "gh-awesome-grid" }, Rt = ["onClick"], St = { class: "gh-awesome-card-head" }, xt = { class: "gh-awesome-card-name" }, Lt = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, At = { class: "gh-awesome-desc" }, Dt = { class: "gh-awesome-footer" }, Ht = { class: "gh-awesome-tags" }, Ut = ["href"], Pt = {
  key: 0,
  class: "gh-awesome-empty"
}, Et = /* @__PURE__ */ _e({
  __name: "GitHubAwesome",
  setup(b) {
    const l = E("all"), i = E(""), o = te(() => {
      const f = i.value.trim().toLowerCase(), C = l.value;
      return wt.filter((p) => C === "all" || p.category === C ? f ? p.name.toLowerCase().includes(f) || p.title.toLowerCase().includes(f) || p.desc.toLowerCase().includes(f) || p.tags.some((A) => A.toLowerCase().includes(f)) : !0 : !1);
    });
    function g(f) {
      window.open(f, "_blank", "noreferrer");
    }
    return (f, C) => (s(), n("div", _t, [
      e("header", kt, [
        e("div", $t, [
          C[3] || (C[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", Ct, [
            ie(e("input", {
              "onUpdate:modelValue": C[0] || (C[0] = (p) => i.value = p),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [ye, i.value]
            ]),
            i.value ? (s(), n("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: C[1] || (C[1] = (p) => i.value = "")
            }, "✕")) : R("", !0)
          ])
        ]),
        e("div", Gt, [
          (s(!0), n(W, null, B(t(yt), (p) => (s(), n("button", {
            key: p.id,
            type: "button",
            class: j(["gh-awesome-pill", { active: l.value === p.id }]),
            onClick: (m) => l.value = p.id
          }, [
            e("span", null, a(p.icon), 1),
            e("b", null, a(p.name), 1)
          ], 10, Tt))), 128))
        ])
      ]),
      e("div", Mt, [
        (s(!0), n(W, null, B(o.value, (p) => (s(), n("article", {
          key: p.id,
          class: "gh-awesome-card",
          onClick: (m) => g(p.url)
        }, [
          e("div", St, [
            e("div", xt, [
              e("strong", null, a(p.title), 1),
              e("small", null, a(p.name), 1)
            ]),
            e("span", Lt, "★ " + a(p.stars), 1)
          ]),
          e("p", At, a(p.desc), 1),
          e("div", Dt, [
            e("div", Ht, [
              (s(!0), n(W, null, B(p.tags, (m) => (s(), n("span", {
                key: m,
                class: "gh-awesome-tag"
              }, a(m), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: p.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: C[2] || (C[2] = X(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Ut)
          ])
        ], 8, Rt))), 128)),
        o.value.length ? R("", !0) : (s(), n("div", Pt, [...C[4] || (C[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), It = /* @__PURE__ */ $e(Et, [["__scopeId", "data-v-28a8995f"]]), Se = "gh_my_repos_cache_v1", xe = "gh_my_repo_groups_v2", Le = "gh_my_repo_groups_map_v2", M = ke({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function me(b) {
  return b.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
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
  async load(l = !1) {
    if (!l && this.inFlightPromise)
      return this.inFlightPromise;
    l && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const i = this.abortController.signal, o = (async () => {
      await this.loadPersistedGroups();
      const g = await Re.get(Se);
      if (g && g.length ? this.hydrateRepos(g) : M.repos.length && this.hydrateRepos(M.repos), l || !M.repos.length) {
        M.loading = !0, M.errorMessage = "";
        try {
          await this.fetchRemote(i);
        } catch (C) {
          if (C.name === "AbortError") return;
          M.errorMessage = C.message || "获取个人仓库失败";
        } finally {
          M.loading = !1;
        }
      } else
        this.fetchRemote(i).catch(() => {
        });
    })();
    return this.inFlightPromise = o.finally(() => {
      this.inFlightPromise === o && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(l) {
    const { ghUser: i, ghToken: o } = await nt();
    if (!i && !o) {
      M.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const g = Ue(o), f = [], C = /* @__PURE__ */ new Set();
    if (i)
      try {
        const m = `https://api.github.com/users/${encodeURIComponent(i)}/repos?type=owner&sort=updated&per_page=100`, A = await fetch(m, { method: "GET", headers: g, signal: l });
        if (A.ok) {
          const x = await A.json();
          if (Array.isArray(x))
            for (const G of x)
              G && G.id && !C.has(G.id) && (C.add(G.id), f.push(G));
        }
      } catch (m) {
        if (m.name === "AbortError") throw m;
      }
    if (o)
      try {
        const A = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: g, signal: l });
        if (A.ok) {
          const x = await A.json();
          if (Array.isArray(x))
            for (const G of x)
              G && G.id && !C.has(G.id) && (C.add(G.id), f.push(G));
        }
      } catch (m) {
        if (m.name === "AbortError") throw m;
      }
    if (!f.length) {
      M.repos.length || (M.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const p = f.map((m) => {
      const A = m.full_name || `${m.owner?.login || i}/${m.name}`, x = m.name, G = M.repoGroupsMap[A] || M.repoGroupsMap[x] || M.repoGroupsMap[A.toLowerCase()] || M.repoGroupsMap[x.toLowerCase()] || [];
      return {
        id: m.id,
        name: m.name,
        fullName: A,
        description: m.description || "",
        isPrivate: !!m.private,
        isFork: !!m.fork,
        htmlUrl: m.html_url || `https://github.com/${i}/${m.name}`,
        language: m.language || null,
        stargazersCount: Number(m.stargazers_count) || 0,
        forksCount: Number(m.forks_count) || 0,
        openIssuesCount: Number(m.open_issues_count) || 0,
        topics: Array.isArray(m.topics) ? m.topics.map((H) => String(H).toLowerCase()) : [],
        localGroups: G,
        updatedAt: m.updated_at || "",
        pushedAt: m.pushed_at || "",
        defaultBranch: m.default_branch || "main"
      };
    });
    this.hydrateRepos(p), await Re.set(Se, p, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(l) {
    let i = !1;
    M.repos = l.map((o) => {
      const g = M.repoGroupsMap[o.fullName] || M.repoGroupsMap[o.name] || M.repoGroupsMap[o.fullName.toLowerCase()] || M.repoGroupsMap[o.name.toLowerCase()], f = o.localGroups && o.localGroups.length ? o.localGroups : null, C = this.inferGroupsForRepo(o, M.customGroups), p = (g && g.length ? g : null) || f || C, m = p ? [...new Set(p.filter(Boolean))] : [];
      return m.length && (!M.repoGroupsMap[o.fullName] || !M.repoGroupsMap[o.fullName].length) && (M.repoGroupsMap[o.fullName] = m, i = !0), {
        ...o,
        localGroups: m
      };
    }), i && this.persistGroupsMap();
  }
  /**
   * 智能推断仓库最匹配的分组归属（仅在无手动归类时作为平滑桥接）
   */
  inferGroupsForRepo(l, i) {
    if (!i || !i.length) return [];
    const o = [], g = l.name.toLowerCase(), f = (l.topics || []).map((C) => C.toLowerCase());
    for (const C of i) {
      const p = C.toLowerCase();
      if ((p.includes("fork") || C.includes("分支")) && (l.isFork || f.includes("fork"))) {
        o.push(C);
        continue;
      }
      if ((p.includes("浏览器") || p.includes("browser") || p.includes("chrome") || p.includes("edge")) && (f.some((m) => m.includes("extension") || m.includes("browser") || m.includes("newtab")) || g.includes("tab-project"))) {
        o.push(C);
        continue;
      }
      if ((p.includes("pi") || C.includes("PI")) && (f.some((m) => m.includes("pi") || m.includes("grounding-pi")) || g.includes("pi-") || g.includes("-pi"))) {
        o.push(C);
        continue;
      }
      if (p.includes("herdr") && (f.some((m) => m.includes("herdr")) || g.includes("herdr"))) {
        o.push(C);
        continue;
      }
      if ((p.includes("嵌入式") || p.includes("embedded") || p.includes("单片机")) && (f.some((m) => m.includes("embedded") || m.includes("zephyr") || m.includes("stm32") || m.includes("k230")) || g.includes("k230") || g.includes("mspm0") || g.includes("pid-") || g.includes("zephyr"))) {
        o.push(C);
        continue;
      }
      if ((p.includes("美化") || p.includes("theme") || p.includes("style")) && (f.some((m) => m.includes("theme") || m.includes("beauty") || m.includes("ui")) || g.includes("theme") || g.includes("style"))) {
        o.push(C);
        continue;
      }
    }
    return o;
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(l, i) {
    const o = me(i);
    o && (l.localGroups.includes(o) || l.localGroups.push(o), M.repoGroupsMap[l.fullName] = [...l.localGroups], await this.persistGroupsMap(), await Re.set(Se, M.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(l, i) {
    l.localGroups = l.localGroups.filter((o) => o !== i), M.repoGroupsMap[l.fullName] = [...l.localGroups], await this.persistGroupsMap(), await Re.set(Se, M.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(l, i) {
    if (!i)
      l.localGroups = [];
    else {
      const o = me(i);
      if (!o) return;
      l.localGroups = [o];
    }
    M.repoGroupsMap[l.fullName] = [...l.localGroups], await this.persistGroupsMap(), await Re.set(Se, M.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(l) {
    const i = me(l);
    return i ? M.customGroups.includes(i) ? (alert(`分组「${i}」已存在。`), null) : (M.customGroups.push(i), await this.persistGroups(), i) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(l, i) {
    const o = me(i);
    return o ? l === o ? !0 : M.customGroups.includes(o) ? (alert(`已存在名为「${o}」的分组。`), !1) : (M.customGroups = M.customGroups.map((g) => g === l ? o : g), M.repos.forEach((g) => {
      g.localGroups.includes(l) && (g.localGroups = g.localGroups.map((f) => f === l ? o : f), M.repoGroupsMap[g.fullName] = [...g.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(l) {
    const i = M.repos.filter((g) => g.localGroups.includes(l)).length, o = i > 0 ? `确定删除分组「${l}」吗？
该分组下的 ${i} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${l}」吗？`;
    return confirm(o) ? (M.customGroups = M.customGroups.filter((g) => g !== l), M.repos.forEach((g) => {
      g.localGroups.includes(l) && (g.localGroups = g.localGroups.filter((f) => f !== l), M.repoGroupsMap[g.fullName] = [...g.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let l = null, i = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const o = await chrome.storage.local.get([xe, Le]);
        l = o?.[xe], i = o?.[Le];
      }
      if (!l || !Array.isArray(l)) {
        const o = localStorage.getItem(xe);
        o && (l = JSON.parse(o));
      }
      if (!i || typeof i != "object") {
        const o = localStorage.getItem(Le);
        o && (i = JSON.parse(o));
      }
      Array.isArray(l) && (M.customGroups = l.map(me).filter(Boolean)), i && typeof i == "object" && (M.repoGroupsMap = i);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const l = { ...M.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Le]: l }), localStorage.setItem(Le, JSON.stringify(l));
    } catch {
    }
  }
  async persistGroups() {
    const l = Array.from(new Set(M.customGroups.map(me).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [xe]: l }), localStorage.setItem(xe, JSON.stringify(l));
    } catch {
    }
  }
}
const oe = be.getInstance(), Nt = { class: "my-repos-workspace" }, jt = {
  key: 0,
  class: "error-banner"
}, Ft = { class: "shelf-header" }, Ot = { class: "shelf-left" }, Wt = { class: "shelf-badge" }, zt = { class: "shelf-right" }, Bt = { class: "shelf-search-wrap" }, Yt = ["disabled", "title"], Vt = ["title"], qt = ["onDragstart", "onContextmenu"], Kt = { class: "repo-card-head" }, Qt = ["title", "onClick"], Xt = {
  key: 0,
  class: "badge-repo-visibility private"
}, Jt = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Zt = ["title"], es = {
  key: 1,
  class: "repo-topics-row"
}, ts = { class: "repo-card-footer" }, ss = { class: "meta-left" }, os = {
  key: 0,
  class: "meta-item lang"
}, ns = { class: "meta-item" }, as = {
  key: 1,
  class: "meta-item"
}, ls = ["title"], is = { class: "board-columns-track" }, rs = ["onDragover", "onDragleave", "onDrop"], cs = { class: "column-header" }, us = {
  key: 0,
  class: "column-title-group"
}, ds = ["title"], ps = { class: "badge-count" }, hs = {
  key: 1,
  class: "column-rename-group"
}, gs = ["onKeydown"], ms = ["onClick"], fs = { class: "column-actions" }, bs = ["onClick"], vs = {
  key: 0,
  class: "col-popover-menu"
}, ys = ["onClick"], ws = ["onClick"], _s = { class: "column-cards-scroll" }, ks = ["onDragstart", "onContextmenu"], $s = { class: "repo-card-head" }, Cs = ["title", "onClick"], Gs = {
  key: 0,
  class: "badge-repo-visibility private"
}, Ts = {
  key: 1,
  class: "badge-repo-visibility fork"
}, Ms = ["title"], Rs = { class: "repo-topics-row" }, Ss = { class: "topic-chip active-chip" }, xs = ["onClick"], Ls = { class: "repo-card-footer" }, As = { class: "meta-left" }, Ds = {
  key: 0,
  class: "meta-item lang"
}, Hs = { class: "meta-item" }, Us = {
  key: 1,
  class: "meta-item"
}, Ps = { class: "meta-date" }, Es = {
  key: 0,
  class: "empty-column-placeholder"
}, Is = { class: "board-column new-column-slot" }, Ns = {
  key: 1,
  class: "new-column-composer"
}, js = { class: "composer-actions" }, Fs = ["onClick"], Os = /* @__PURE__ */ _e({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(b) {
    const l = b, i = E(""), o = E(!1), g = E(null), f = E(""), C = E(null), p = E(null), m = E(null), A = E(!1);
    function x() {
      A.value = !A.value;
    }
    function G(c) {
      const r = m.value;
      r && (Math.abs(c.deltaX) > Math.abs(c.deltaY) && c.deltaX !== 0 || c.deltaY !== 0 && (c.preventDefault(), r.scrollLeft += c.deltaY));
    }
    const H = E(null), L = E(null), S = E(null);
    let v = null, N = 0;
    const D = ke({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), Y = E(null), le = E(!1);
    function J() {
      D.visible = !1, Y.value = null;
    }
    function ne(c, r, d) {
      c.preventDefault(), c.stopPropagation();
      let _ = c.clientX, se = c.clientY;
      _ > window.innerWidth - 200 && (_ = window.innerWidth - 210), se > window.innerHeight - 240 && (se = window.innerHeight - 245), D.x = _, D.y = se, D.repo = r, D.fromGroup = d, D.visible = !0, Y.value = "folder", le.value = _ > window.innerWidth - 380;
    }
    async function ue() {
      const c = D.repo;
      J(), c && await oe.moveRepoToGroup(c, null);
    }
    async function P(c) {
      const r = D.repo;
      J(), r && await oe.moveRepoToGroup(r, c);
    }
    async function I() {
      const c = D.repo;
      if (J(), !!c)
        try {
          await navigator.clipboard.writeText(c.htmlUrl), tt.show({
            appName: "GitHub",
            title: T("github.myRepos.copiedUrlTitle"),
            message: T("github.myRepos.copiedUrlMsg", { name: c.name })
          });
        } catch {
        }
    }
    async function F() {
      const c = D.repo;
      if (J(), !!c)
        try {
          const r = `git clone ${c.htmlUrl}.git`;
          await navigator.clipboard.writeText(r), tt.show({
            appName: "GitHub",
            title: T("github.myRepos.copiedCloneTitle"),
            message: r
          });
        } catch {
        }
    }
    function q() {
      const c = D.repo;
      J(), c && We(c.htmlUrl);
    }
    function ee() {
      const c = D.repo;
      J(), c && gt.open({
        fullName: c.fullName,
        description: c.description || "",
        stars: c.stargazersCount,
        language: c.language || void 0,
        updated: c.pushedAt
      });
    }
    function re(c) {
      c.target?.closest(".gh-repo-context-menu") || D.visible && J();
    }
    function V(c) {
      c.key === "Escape" && D.visible && J();
    }
    const $ = te(() => M.customGroups), Q = te(() => {
      const c = M.searchQuery.trim().toLowerCase();
      return c ? M.repos.filter(
        (r) => r.name.toLowerCase().includes(c) || r.description.toLowerCase().includes(c) || r.localGroups.some((d) => d.toLowerCase().includes(c)) || r.topics.some((d) => d.toLowerCase().includes(c)) || r.language && r.language.toLowerCase().includes(c)
      ) : M.repos;
    }), pe = te(() => Q.value.filter((c) => !c.localGroups.length));
    function ge(c) {
      return Q.value.filter((r) => r.localGroups.includes(c));
    }
    async function Ce() {
      const c = i.value.trim();
      if (!c) return;
      await oe.createGroup(c) && (i.value = "", o.value = !1);
    }
    function Ge(c) {
      C.value = c, f.value = c, g.value = null;
    }
    async function Te(c) {
      const r = f.value.trim();
      if (!r || r === c) {
        C.value = null;
        return;
      }
      await oe.renameGroup(c, r) && (C.value = null);
    }
    async function y(c) {
      g.value = null, await oe.deleteGroup(c);
    }
    async function u(c, r) {
      await oe.removeRepoFromGroup(c, r);
    }
    function h(c) {
      const r = p.value;
      if (!r) return;
      const _ = c.target?.closest(".column-cards-scroll");
      if (_ && _.scrollHeight > _.clientHeight && !c.shiftKey && c.deltaX === 0) {
        const se = _.scrollTop <= 0 && c.deltaY < 0, lt = _.scrollTop + _.clientHeight >= _.scrollHeight - 1 && c.deltaY > 0;
        if (!se && !lt)
          return;
      }
      Math.abs(c.deltaX) > Math.abs(c.deltaY) && c.deltaX !== 0 || c.deltaY !== 0 && (c.preventDefault(), r.scrollLeft += c.deltaY);
    }
    function k(c) {
      if (!H.value || !p.value) return;
      c.preventDefault();
      const r = c.deltaX !== 0 ? c.deltaX : c.deltaY;
      p.value.scrollLeft += r;
    }
    function z() {
      if (v !== null) return;
      const c = () => {
        p.value && N !== 0 ? (p.value.scrollLeft += N, v = requestAnimationFrame(c)) : ce();
      };
      v = requestAnimationFrame(c);
    }
    function ce() {
      v !== null && (cancelAnimationFrame(v), v = null), N = 0;
    }
    function Pe(c) {
      if (!H.value || !p.value) return;
      const r = p.value.getBoundingClientRect(), d = 100;
      if (c > r.right - d) {
        const _ = Math.min(1, Math.max(0.1, (c - (r.right - d)) / d));
        N = Math.round(_ * 20), z();
      } else if (c < r.left + d) {
        const _ = Math.min(1, Math.max(0.1, (r.left + d - c) / d));
        N = -Math.round(_ * 20), z();
      } else
        ce();
    }
    function at(c) {
      H.value && (c.preventDefault(), Pe(c.clientX));
    }
    function qe(c, r, d) {
      J(), H.value = r, L.value = d, c.dataTransfer && (c.dataTransfer.effectAllowed = "move", c.dataTransfer.setData("text/plain", `${r.id}:${d}`)), window.addEventListener("wheel", k, { passive: !1 });
    }
    function Oe() {
      H.value = null, L.value = null, S.value = null, ce(), window.removeEventListener("wheel", k);
    }
    function Ke(c, r) {
      H.value && (c.preventDefault(), c.dataTransfer && (c.dataTransfer.dropEffect = "move"), S.value = r, Pe(c.clientX));
    }
    function Qe(c, r) {
      const d = c.currentTarget, _ = c.relatedTarget;
      d?.contains(_) || S.value === r && (S.value = null);
    }
    async function Xe(c, r) {
      c.preventDefault();
      const d = H.value, _ = L.value;
      Oe(), d && (r === "default" ? _ && _ !== "default" ? await oe.removeRepoFromGroup(d, _) : await oe.moveRepoToGroup(d, null) : (await oe.addRepoToGroup(d, r), _ && _ !== "default" && _ !== r && await oe.removeRepoFromGroup(d, _)));
    }
    function We(c) {
      window.open(c, "_blank", "noopener,noreferrer");
    }
    function Je(c) {
      if (!c) return "";
      try {
        const r = new Date(c);
        return `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return we(
      () => l.active,
      (c) => {
        J(), c && oe.load();
      }
    ), je(() => {
      window.addEventListener("pointerdown", re), window.addEventListener("keydown", V), oe.load();
    }), Fe(() => {
      ce(), window.removeEventListener("wheel", k), window.removeEventListener("pointerdown", re), window.removeEventListener("keydown", V);
    }), (c, r) => (s(), n("div", Nt, [
      t(M).errorMessage ? (s(), n("div", jt, [
        e("span", null, "⚠️ " + a(t(M).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: r[0] || (r[0] = (d) => t(oe).load(!0))
        }, "重试")
      ])) : R("", !0),
      e("section", {
        class: j(["default-shelf-area", { "is-collapsed": A.value, "drop-active": S.value === "default" }]),
        onDragover: r[4] || (r[4] = (d) => Ke(d, "default")),
        onDragleave: r[5] || (r[5] = (d) => Qe(d, "default")),
        onDrop: r[6] || (r[6] = (d) => Xe(d, "default"))
      }, [
        e("header", Ft, [
          e("div", Ot, [
            r[23] || (r[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            r[24] || (r[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", Wt, a(pe.value.length), 1),
            r[25] || (r[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", zt, [
            e("div", Bt, [
              r[26] || (r[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              ie(e("input", {
                "onUpdate:modelValue": r[1] || (r[1] = (d) => t(M).searchQuery = d),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [ye, t(M).searchQuery]
              ]),
              t(M).searchQuery ? (s(), n("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: r[2] || (r[2] = (d) => t(M).searchQuery = "")
              }, "✕")) : R("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(M).loading,
              title: t(T)("github.myRepos.refreshBtnTitle"),
              onClick: r[3] || (r[3] = (d) => t(oe).load(!0))
            }, [
              e("span", {
                class: j({ spinning: t(M).loading })
              }, "🔄", 2),
              e("span", null, a(t(M).loading ? t(T)("github.myRepos.refreshing") : t(T)("common.refresh")), 1)
            ], 8, Yt),
            pe.value.length ? (s(), n("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: A.value ? t(T)("github.myRepos.expandShelf") : t(T)("github.myRepos.collapseShelf"),
              onClick: x
            }, a(A.value ? t(T)("github.myRepos.expandBtn") : t(T)("github.myRepos.collapseBtn")), 9, Vt)) : R("", !0)
          ])
        ]),
        pe.value.length ? ie((s(), n("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: m,
          class: "shelf-cards-scroll",
          onWheel: G
        }, [
          (s(!0), n(W, null, B(pe.value, (d) => (s(), n("div", {
            key: d.id,
            class: j(["repo-card shelf-card", { "card-dragging": H.value?.id === d.id }]),
            draggable: "true",
            onDragstart: (_) => qe(_, d, "default"),
            onDragend: Oe,
            onContextmenu: (_) => ne(_, d, "default")
          }, [
            e("div", Kt, [
              e("span", {
                class: "repo-name",
                title: d.fullName,
                onClick: (_) => We(d.htmlUrl)
              }, a(d.name), 9, Qt),
              d.isPrivate ? (s(), n("span", Xt, "私有")) : R("", !0),
              d.isFork ? (s(), n("span", Jt, "Fork")) : R("", !0)
            ]),
            d.description ? (s(), n("p", {
              key: 0,
              class: "repo-desc",
              title: d.description
            }, a(d.description), 9, Zt)) : R("", !0),
            d.topics.length ? (s(), n("div", es, [
              (s(!0), n(W, null, B(d.topics, (_) => (s(), n("span", {
                key: _,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + a(_), 1))), 128))
            ])) : R("", !0),
            e("div", ts, [
              e("div", ss, [
                d.language ? (s(), n("span", os, [
                  r[27] || (r[27] = e("span", { class: "lang-color" }, null, -1)),
                  ae(a(d.language), 1)
                ])) : R("", !0),
                e("span", ns, "⭐ " + a(d.stargazersCount), 1),
                d.forksCount ? (s(), n("span", as, "🍴 " + a(d.forksCount), 1)) : R("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + d.updatedAt
              }, a(Je(d.pushedAt || d.updatedAt)), 9, ls)
            ])
          ], 42, qt))), 128))
        ], 544)), [
          [Ie, !A.value]
        ]) : R("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: p,
        class: "board-viewport",
        onWheel: h,
        onDragover: at
      }, [
        e("div", is, [
          (s(!0), n(W, null, B($.value, (d) => (s(), n("section", {
            key: d,
            class: j(["board-column topic-column", { "drop-active": S.value === d }]),
            onDragover: (_) => Ke(_, d),
            onDragleave: (_) => Qe(_, d),
            onDrop: (_) => Xe(_, d)
          }, [
            e("header", cs, [
              C.value !== d ? (s(), n("div", us, [
                r[28] || (r[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + d
                }, " 📁 " + a(d), 9, ds),
                e("span", ps, a(ge(d).length), 1)
              ])) : (s(), n("div", hs, [
                ie(e("input", {
                  "onUpdate:modelValue": r[7] || (r[7] = (_) => f.value = _),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    Ee((_) => Te(d), ["enter"]),
                    r[8] || (r[8] = Ee((_) => C.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, gs), [
                  [ye, f.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (_) => Te(d)
                }, "✓", 8, ms),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: r[9] || (r[9] = (_) => C.value = null)
                }, "✕")
              ])),
              e("div", fs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (_) => g.value = g.value === d ? null : d
                }, "•••", 8, bs),
                g.value === d ? (s(), n("div", vs, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (_) => Ge(d)
                  }, " 重命名分组 ", 8, ys),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (_) => y(d)
                  }, " 删除分组 ", 8, ws)
                ])) : R("", !0)
              ])
            ]),
            e("div", _s, [
              (s(!0), n(W, null, B(ge(d), (_) => (s(), n("div", {
                key: _.id,
                class: j(["repo-card", { "card-dragging": H.value?.id === _.id }]),
                draggable: "true",
                onDragstart: (se) => qe(se, _, d),
                onDragend: Oe,
                onContextmenu: (se) => ne(se, _, d)
              }, [
                e("div", $s, [
                  e("span", {
                    class: "repo-name",
                    title: _.fullName,
                    onClick: (se) => We(_.htmlUrl)
                  }, a(_.name), 9, Cs),
                  _.isPrivate ? (s(), n("span", Gs, "私有")) : R("", !0),
                  _.isFork ? (s(), n("span", Ts, "Fork")) : R("", !0)
                ]),
                _.description ? (s(), n("p", {
                  key: 0,
                  class: "repo-desc",
                  title: _.description
                }, a(_.description), 9, Ms)) : R("", !0),
                e("div", Rs, [
                  e("span", Ss, [
                    ae(" 📁 " + a(d) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: X((se) => u(_, d), ["stop"])
                    }, "✕", 8, xs)
                  ]),
                  (s(!0), n(W, null, B(_.topics, (se) => (s(), n("span", {
                    key: se,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + a(se), 1))), 128))
                ]),
                e("div", Ls, [
                  e("div", As, [
                    _.language ? (s(), n("span", Ds, [
                      r[29] || (r[29] = e("span", { class: "lang-color" }, null, -1)),
                      ae(a(_.language), 1)
                    ])) : R("", !0),
                    e("span", Hs, "⭐ " + a(_.stargazersCount), 1),
                    _.forksCount ? (s(), n("span", Us, "🍴 " + a(_.forksCount), 1)) : R("", !0)
                  ]),
                  e("span", Ps, a(Je(_.pushedAt || _.updatedAt)), 1)
                ])
              ], 42, ks))), 128)),
              ge(d).length ? R("", !0) : (s(), n("div", Es, [...r[30] || (r[30] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, rs))), 128)),
          e("section", Is, [
            o.value ? (s(), n("div", Ns, [
              r[32] || (r[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              ie(e("input", {
                "onUpdate:modelValue": r[11] || (r[11] = (d) => i.value = d),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  Ee(Ce, ["enter"]),
                  r[12] || (r[12] = Ee((d) => o.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [ye, i.value]
              ]),
              e("div", js, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: Ce
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: r[13] || (r[13] = (d) => o.value = !1)
                }, a(t(T)("common.cancel")), 1)
              ])
            ])) : (s(), n("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: r[10] || (r[10] = (d) => o.value = !0)
            }, [...r[31] || (r[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (s(), de(Ye, { to: "body" }, [
        D.visible && D.repo ? (s(), n("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Ve({ left: `${D.x}px`, top: `${D.y}px` }),
          onClick: r[21] || (r[21] = X(() => {
          }, ["stop"])),
          onContextmenu: r[22] || (r[22] = X(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: j(["gh-menu-has-sub", { "is-active": Y.value === "folder" }]),
            onMouseenter: r[16] || (r[16] = (d) => Y.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: r[14] || (r[14] = X((d) => Y.value = Y.value === "folder" ? null : "folder", ["stop"]))
            }, [...r[33] || (r[33] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: j(["gh-sub-flyout", { "flyout-left": le.value }]),
              onClick: r[15] || (r[15] = X(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: j(["fo-cover-menu-item", { primary: !D.repo.localGroups.length }]),
                type: "button",
                onClick: ue
              }, a(D.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (s(!0), n(W, null, B($.value, (d) => (s(), n("button", {
                key: d,
                class: j(["fo-cover-menu-item", { primary: D.repo.localGroups.includes(d) }]),
                type: "button",
                onClick: (_) => P(d)
              }, a(D.repo.localGroups.includes(d) ? "✓ " : "  ") + "📁 " + a(d), 11, Fs))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[17] || (r[17] = (d) => Y.value = null),
            onClick: I
          }, a(t(T)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[18] || (r[18] = (d) => Y.value = null),
            onClick: F
          }, a(t(T)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[19] || (r[19] = (d) => Y.value = null),
            onClick: ee
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: r[20] || (r[20] = (d) => Y.value = null),
            onClick: q
          }, a(t(T)("github.myRepos.openInGitHub")), 33)
        ], 36)) : R("", !0)
      ]))
    ]));
  }
}), Ws = /* @__PURE__ */ $e(Os, [["__scopeId", "data-v-f77c8971"]]), Z = ke({
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
  setUncatPage(l) {
    const i = Math.max(1, Math.min(l, this.uncatTotalPages));
    Z.uncatPage = i;
  }
  get uncatPage() {
    return Z.uncatPage;
  }
  get uncatTotalPages() {
    const l = this.filteredUncatRepos.length;
    return Math.max(1, Math.ceil(l / Z.pageSize));
  }
  /**
   * 未分类的所有 Star 仓库（带搜索过滤）
   */
  get filteredUncatRepos() {
    const l = Z.searchQuery.trim().toLowerCase(), i = Ae.repos.filter((o) => Ne(o.full_name).length === 0);
    return l ? i.filter(
      (o) => o.full_name.toLowerCase().includes(l) || o.description && o.description.toLowerCase().includes(l) || o.language && o.language.toLowerCase().includes(l) || o.topics && o.topics.some((g) => g.toLowerCase().includes(l))
    ) : i;
  }
  /**
   * 当前页切片的 10 个未分类 Star 仓库
   */
  get pagedUncatRepos() {
    const l = this.filteredUncatRepos, o = (Math.min(Z.uncatPage, this.uncatTotalPages) - 1) * Z.pageSize;
    return l.slice(o, o + Z.pageSize);
  }
  /**
   * 各个 GitHub 原生 Lists 板块列表
   */
  get lists() {
    return Ae.lists;
  }
  /**
   * 获取归属于指定 GitHub List 的 Star 仓库（带搜索过滤）
   */
  getReposForList(l) {
    const i = Z.searchQuery.trim().toLowerCase(), o = Ae.repos.filter((g) => Ne(g.full_name).includes(l));
    return i ? o.filter(
      (g) => g.full_name.toLowerCase().includes(i) || g.description && g.description.toLowerCase().includes(i) || g.language && g.language.toLowerCase().includes(i) || g.topics && g.topics.some((f) => f.toLowerCase().includes(i))
    ) : o;
  }
  /**
   * 拖拽归入指定 List（若 target 为 'uncategorized' 则从所有 List 移出）
   */
  async moveRepoToList(l, i) {
    await K.dropRepositoryIntoFolder(l, i);
  }
  /**
   * 从指定 List 移出仓库
   */
  async removeRepoFromList(l, i) {
    await K.toggleRepoList(l, i);
  }
}
const O = ve.getInstance(), zs = { class: "stars-board-workspace" }, Bs = { class: "shelf-header" }, Ys = { class: "shelf-left" }, Vs = { class: "shelf-badge" }, qs = { class: "shelf-right" }, Ks = { class: "shelf-search-wrap" }, Qs = {
  key: 0,
  class: "shelf-pager"
}, Xs = ["disabled"], Js = { class: "pager-text" }, Zs = ["disabled"], eo = ["disabled", "aria-busy"], to = ["title"], so = {
  key: 0,
  class: "shelf-cards-scroll"
}, oo = ["onClick", "onDragstart", "onContextmenu"], no = ["onClick"], ao = { class: "gh-card-head" }, lo = ["src"], io = ["href", "title"], ro = { class: "owner" }, co = { class: "gh-card-body" }, uo = { class: "gh-card-badges" }, po = ["title"], ho = ["title"], go = ["title"], mo = { class: "meta" }, fo = { class: "gh-stars" }, bo = {
  key: 0,
  class: "gh-lang"
}, vo = { class: "gh-updated" }, yo = { class: "shelf-next-content" }, wo = { class: "shelf-next-sub" }, _o = {
  key: 2,
  class: "shelf-empty",
  role: "status"
}, ko = {
  key: 0,
  class: "board-columns-track"
}, $o = { class: "column-cards-scroll" }, Co = {
  key: 1,
  class: "board-columns-track"
}, Go = ["onDragover", "onDragleave", "onDrop"], To = { class: "column-header" }, Mo = { class: "column-title-group" }, Ro = ["title"], So = { class: "badge-count" }, xo = { class: "column-actions" }, Lo = ["onClick"], Ao = { class: "column-cards-scroll" }, Do = ["onClick", "onDragstart", "onContextmenu"], Ho = ["onClick"], Uo = { class: "gh-card-head" }, Po = ["src"], Eo = ["href", "title"], Io = { class: "owner" }, No = { class: "gh-card-body" }, jo = { class: "gh-card-badges" }, Fo = ["title"], Oo = ["onClick"], Wo = ["title"], zo = ["title"], Bo = ["title"], Yo = { class: "meta" }, Vo = { class: "gh-stars" }, qo = {
  key: 0,
  class: "gh-lang"
}, Ko = { class: "gh-updated" }, Qo = {
  key: 0,
  class: "empty-column-dropzone"
}, Xo = { class: "board-column add-column-panel" }, Jo = ["onClick"], Zo = /* @__PURE__ */ _e({
  __name: "GitHubStarsBoard",
  props: {
    active: { type: Boolean }
  },
  setup(b) {
    const l = E(null), i = E(null), o = E(!1);
    function g() {
      o.value = !o.value;
    }
    function f(y) {
      const u = i.value;
      u && (Math.abs(y.deltaX) > Math.abs(y.deltaY) && y.deltaX !== 0 || y.deltaY !== 0 && (y.preventDefault(), u.scrollLeft += y.deltaY));
    }
    const C = te(() => Ae.loading), p = te(() => C.value && !Ae.repos.length), m = E(null), A = E(null), x = E(null);
    let G = null, H = 0;
    function L() {
      G === null && (G = window.setInterval(() => {
        !l.value || H === 0 || (l.value.scrollLeft += H);
      }, 16));
    }
    function S() {
      G !== null && (clearInterval(G), G = null), H = 0;
    }
    const v = ke({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromList: null
    }), N = E(null), D = E(!1);
    function Y() {
      v.visible = !1, v.repo = null, v.fromList = null, N.value = null;
    }
    function le(y, u, h) {
      y.preventDefault(), y.stopPropagation();
      const k = 190, z = 220, ce = Math.min(y.clientX, window.innerWidth - k - 10), Pe = Math.min(y.clientY, window.innerHeight - z - 10);
      v.x = ce, v.y = Pe, v.repo = u, v.fromList = h, v.visible = !0, N.value = "folder", D.value = ce > window.innerWidth - 380;
    }
    async function J() {
      const y = v.repo;
      Y(), y && await O.moveRepoToList(y.full_name, K.UNCAT);
    }
    async function ne(y) {
      const u = v.repo;
      Y(), u && await O.moveRepoToList(u.full_name, y);
    }
    async function ue() {
      const y = v.repo;
      if (Y(), !!y?.html_url)
        try {
          await navigator.clipboard.writeText(y.html_url);
        } catch {
        }
    }
    async function P() {
      const y = v.repo;
      if (Y(), !!y?.full_name)
        try {
          await navigator.clipboard.writeText(`git clone https://github.com/${y.full_name}.git`);
        } catch {
        }
    }
    function I(y) {
      const u = y.target;
      !u?.closest(".fo-cover-context-menu") && !u?.closest(".col-popover-menu") && Y();
    }
    function F(y) {
      y.key === "Escape" && Y();
    }
    function q(y) {
      const u = l.value;
      if (!u) return;
      const k = y.target?.closest(".column-cards-scroll");
      if (k && k.scrollHeight > k.clientHeight && !y.shiftKey && y.deltaX === 0) {
        const z = k.scrollTop === 0 && y.deltaY < 0, ce = Math.ceil(k.scrollTop + k.clientHeight) >= k.scrollHeight && y.deltaY > 0;
        if (!z && !ce)
          return;
      }
      Math.abs(y.deltaX) > Math.abs(y.deltaY) && y.deltaX !== 0 || y.deltaY !== 0 && (y.preventDefault(), u.scrollLeft += y.deltaY);
    }
    function ee(y) {
      if (!m.value || !l.value) return;
      y.preventDefault();
      const u = y.deltaY !== 0 ? y.deltaY : y.deltaX;
      l.value.scrollLeft += u;
    }
    function re(y) {
      const u = l.value;
      if (!u) return;
      const h = u.getBoundingClientRect(), k = 100;
      if (y > h.right - k) {
        const z = Math.min(1, Math.max(0.1, (y - (h.right - k)) / k));
        H = Math.round(z * 20), L();
      } else if (y < h.left + k) {
        const z = Math.min(1, Math.max(0.1, (h.left + k - y) / k));
        H = -Math.round(z * 20), L();
      } else
        S();
    }
    function V(y) {
      re(y.clientX);
    }
    function $(y, u, h) {
      Y(), m.value = u, A.value = h, y.dataTransfer && (y.dataTransfer.effectAllowed = "move", y.dataTransfer.setData("text/plain", `${u.full_name}:${h || "uncategorized"}`)), window.addEventListener("wheel", ee, { passive: !1 });
    }
    function Q() {
      m.value = null, A.value = null, x.value = null, S(), window.removeEventListener("wheel", ee);
    }
    function pe(y, u) {
      m.value && (y.preventDefault(), y.dataTransfer && (y.dataTransfer.dropEffect = "move"), x.value = u);
    }
    function ge(y, u) {
      const h = y.currentTarget;
      h && y.relatedTarget instanceof Node && h.contains(y.relatedTarget) || x.value === u && (x.value = null);
    }
    async function Ce(y, u) {
      y.preventDefault();
      const h = m.value;
      Q(), h && await O.moveRepoToList(h.full_name, u);
    }
    function Ge(y) {
      dt.open(y.full_name, void 0, y);
    }
    function Te(y) {
      if (!y) return "";
      try {
        const u = new Date(y);
        return `${u.getFullYear()}-${String(u.getMonth() + 1).padStart(2, "0")}-${String(u.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return je(() => {
      window.addEventListener("pointerdown", I), window.addEventListener("keydown", F);
    }), Fe(() => {
      S(), window.removeEventListener("wheel", ee), window.removeEventListener("pointerdown", I), window.removeEventListener("keydown", F);
    }), (y, u) => (s(), n("div", zs, [
      e("section", {
        class: j(["default-shelf-area", { "is-collapsed": o.value, "drop-active": x.value === "uncategorized" }]),
        onDragover: u[8] || (u[8] = (h) => pe(h, "uncategorized")),
        onDragleave: u[9] || (u[9] = (h) => ge(h, "uncategorized")),
        onDrop: u[10] || (u[10] = (h) => Ce(h, "uncategorized"))
      }, [
        e("header", Bs, [
          e("div", Ys, [
            u[23] || (u[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            u[24] || (u[24] = e("span", { class: "shelf-title" }, "未分类 Star 收藏", -1)),
            e("span", Vs, a(t(O).filteredUncatRepos.length), 1),
            u[25] || (u[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消列表归属；单排 10 个一页）", -1))
          ]),
          e("div", qs, [
            e("div", Ks, [
              u[26] || (u[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              ie(e("input", {
                "onUpdate:modelValue": u[0] || (u[0] = (h) => t(Z).searchQuery = h),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索 Star 仓库名称、简介或语言…"
              }, null, 512), [
                [ye, t(Z).searchQuery]
              ]),
              t(Z).searchQuery ? (s(), n("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: u[1] || (u[1] = (h) => t(Z).searchQuery = "")
              }, "✕")) : R("", !0)
            ]),
            t(O).filteredUncatRepos.length > t(Z).pageSize ? (s(), n("div", Qs, [
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(O).uncatPage <= 1,
                title: "上一页",
                onClick: u[2] || (u[2] = //@ts-ignore
                (...h) => t(O).prevUncatPage && t(O).prevUncatPage(...h))
              }, "‹", 8, Xs),
              e("span", Js, a(t(O).uncatPage) + " / " + a(t(O).uncatTotalPages) + " 页", 1),
              e("button", {
                type: "button",
                class: "pager-btn",
                disabled: t(O).uncatPage >= t(O).uncatTotalPages,
                title: "下一页",
                onClick: u[3] || (u[3] = //@ts-ignore
                (...h) => t(O).nextUncatPage && t(O).nextUncatPage(...h))
              }, "›", 8, Zs)
            ])) : R("", !0),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              title: "刷新 Star 列表",
              disabled: C.value,
              "aria-busy": C.value,
              onClick: u[4] || (u[4] = (h) => t(K).refreshRepositories())
            }, [
              e("span", {
                class: j({ spinning: C.value })
              }, "🔄", 2),
              e("span", null, a(C.value ? "读取中…" : "刷新"), 1)
            ], 8, eo),
            t(O).filteredUncatRepos.length ? (s(), n("button", {
              key: 1,
              type: "button",
              class: "shelf-toggle-btn",
              title: o.value ? "展开托盘" : "收起托盘",
              onClick: g
            }, a(o.value ? "展开 ▼" : "收起 ▲"), 9, to)) : R("", !0)
          ])
        ]),
        p.value ? ie((s(), n("div", so, [
          (s(), n(W, null, B(6, (h) => e("div", {
            key: "skel-shelf-" + h,
            class: "repo gh-card shelf-card skel-card"
          }, [...u[27] || (u[27] = [
            e("div", { class: "skel-line skel-title" }, null, -1),
            e("div", { class: "skel-line skel-desc" }, null, -1),
            e("div", { class: "skel-line skel-meta" }, null, -1)
          ])])), 64))
        ], 512)), [
          [Ie, !o.value]
        ]) : t(O).filteredUncatRepos.length ? ie((s(), n("div", {
          key: 1,
          ref_key: "shelfScrollRef",
          ref: i,
          class: "shelf-cards-scroll",
          onWheel: f
        }, [
          (s(!0), n(W, null, B(t(O).pagedUncatRepos, (h) => (s(), n("article", {
            key: h.full_name,
            class: j(["repo gh-card shelf-card", { "card-dragging": m.value?.full_name === h.full_name }]),
            draggable: "true",
            onClick: (k) => Ge(h),
            onDragstart: (k) => $(k, h, null),
            onDragend: Q,
            onContextmenu: (k) => le(k, h, null)
          }, [
            e("button", {
              class: "fo-card-more",
              type: "button",
              "aria-label": "更多操作",
              title: "更多操作",
              onClick: X((k) => le(k, h, null), ["stop"])
            }, "⋮", 8, no),
            e("div", ao, [
              e("img", {
                class: "gh-owner-avatar",
                src: h.owner?.avatar_url || "assets/github-star.svg",
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer",
                onError: u[5] || (u[5] = (k) => k.target.src = "assets/github-star.svg")
              }, null, 40, lo),
              e("a", {
                href: h.html_url,
                target: "_blank",
                rel: "noreferrer",
                class: "name",
                title: h.full_name,
                onClick: u[6] || (u[6] = X(() => {
                }, ["stop"]))
              }, [
                e("span", ro, a(h.owner?.login || h.full_name.split("/")[0]) + "/", 1),
                ae(a(h.name), 1)
              ], 8, io)
            ]),
            e("div", co, [
              e("div", uo, [
                u[28] || (u[28] = e("span", { class: "gh-badge-folder uncat" }, "＋ 未分类", -1)),
                h.topics && h.topics.length ? (s(), n(W, { key: 0 }, [
                  (s(!0), n(W, null, B(h.topics.slice(0, 2), (k) => (s(), n("span", {
                    key: k,
                    class: "gh-badge-topic-chip",
                    title: "Topic: " + k
                  }, " #" + a(k), 9, po))), 128)),
                  h.topics.length > 2 ? (s(), n("span", {
                    key: 0,
                    class: "gh-badge-topic-chip more",
                    title: h.topics.slice(2).map((k) => "#" + k).join(" ")
                  }, " +" + a(h.topics.length - 2), 9, ho)) : R("", !0)
                ], 64)) : R("", !0)
              ]),
              e("p", {
                class: "desc",
                title: h.description || ""
              }, a(h.description || "暂无描述"), 9, go)
            ]),
            e("div", mo, [
              e("span", fo, "★ " + a(h.stargazers_count), 1),
              h.language ? (s(), n("span", bo, a(h.language), 1)) : R("", !0),
              e("span", vo, "更新 " + a(Te(h.updated_at)), 1)
            ])
          ], 42, oo))), 128)),
          t(O).uncatPage < t(O).uncatTotalPages ? (s(), n("div", {
            key: 0,
            class: "repo gh-card shelf-card shelf-next-card",
            title: "点击翻到下一页",
            onClick: u[7] || (u[7] = //@ts-ignore
            (...h) => t(O).nextUncatPage && t(O).nextUncatPage(...h))
          }, [
            e("div", yo, [
              u[29] || (u[29] = e("span", { class: "shelf-next-icon" }, "➔", -1)),
              u[30] || (u[30] = e("span", { class: "shelf-next-title" }, "下一页", -1)),
              e("span", wo, a(t(O).uncatPage + 1) + " / " + a(t(O).uncatTotalPages) + " 页", 1)
            ])
          ])) : R("", !0)
        ], 544)), [
          [Ie, !o.value]
        ]) : o.value ? R("", !0) : (s(), n("p", _o, a(t(Z).searchQuery ? "没有匹配的未分类仓库" : "暂无未分类 Star 仓库"), 1))
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: l,
        class: "board-viewport",
        onWheel: q,
        onDragover: V
      }, [
        C.value && !t(O).lists.length ? (s(), n("div", ko, [
          (s(), n(W, null, B(4, (h) => e("div", {
            key: "skel-col-" + h,
            class: "board-column skel-column"
          }, [
            u[32] || (u[32] = e("div", { class: "column-header" }, [
              e("div", {
                class: "skel-line",
                style: { width: "120px", height: "16px" }
              })
            ], -1)),
            e("div", $o, [
              (s(), n(W, null, B(3, (k) => e("div", {
                key: "skel-col-card-" + k,
                class: "repo gh-card skel-card"
              }, [...u[31] || (u[31] = [
                e("div", { class: "skel-line skel-title" }, null, -1),
                e("div", { class: "skel-line skel-desc" }, null, -1),
                e("div", { class: "skel-line skel-meta" }, null, -1)
              ])])), 64))
            ])
          ])), 64))
        ])) : (s(), n("div", Co, [
          (s(!0), n(W, null, B(t(O).lists, (h) => (s(), n("section", {
            key: h.id,
            class: j(["board-column list-column", { "drop-active": x.value === h.name }]),
            onDragover: (k) => pe(k, h.name),
            onDragleave: (k) => ge(k, h.name),
            onDrop: (k) => Ce(k, h.name)
          }, [
            e("header", To, [
              e("div", Mo, [
                u[33] || (u[33] = e("span", { class: "col-dot list-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: h.description || "GitHub 列表: " + h.name
                }, " 📁 " + a(h.name), 9, Ro),
                e("span", So, a(t(O).getReposForList(h.name).length), 1)
              ]),
              e("div", xo, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "删除此 GitHub 列表",
                  onClick: (k) => t(K).deleteFolder(h.name)
                }, "✕", 8, Lo)
              ])
            ]),
            e("div", Ao, [
              (s(!0), n(W, null, B(t(O).getReposForList(h.name), (k) => (s(), n("article", {
                key: k.full_name,
                class: j(["repo gh-card", { "card-dragging": m.value?.full_name === k.full_name }]),
                draggable: "true",
                onClick: (z) => Ge(k),
                onDragstart: (z) => $(z, k, h.name),
                onDragend: Q,
                onContextmenu: (z) => le(z, k, h.name)
              }, [
                e("button", {
                  class: "fo-card-more",
                  type: "button",
                  "aria-label": "更多操作",
                  title: "更多操作",
                  onClick: X((z) => le(z, k, h.name), ["stop"])
                }, "⋮", 8, Ho),
                e("div", Uo, [
                  e("img", {
                    class: "gh-owner-avatar",
                    src: k.owner?.avatar_url || "assets/github-star.svg",
                    alt: "",
                    loading: "lazy",
                    referrerpolicy: "no-referrer",
                    onError: u[11] || (u[11] = (z) => z.target.src = "assets/github-star.svg")
                  }, null, 40, Po),
                  e("a", {
                    href: k.html_url,
                    target: "_blank",
                    rel: "noreferrer",
                    class: "name",
                    title: k.full_name,
                    onClick: u[12] || (u[12] = X(() => {
                    }, ["stop"]))
                  }, [
                    e("span", Io, a(k.owner?.login || k.full_name.split("/")[0]) + "/", 1),
                    ae(a(k.name), 1)
                  ], 8, Eo)
                ]),
                e("div", No, [
                  e("div", jo, [
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
                        onClick: X((z) => t(O).removeRepoFromList(k.full_name, h.name), ["stop"])
                      }, "×", 8, Oo)
                    ], 8, Fo),
                    k.topics && k.topics.length ? (s(), n(W, { key: 0 }, [
                      (s(!0), n(W, null, B(k.topics.slice(0, 2), (z) => (s(), n("span", {
                        key: z,
                        class: "gh-badge-topic-chip",
                        title: "Topic: " + z
                      }, " #" + a(z), 9, Wo))), 128)),
                      k.topics.length > 2 ? (s(), n("span", {
                        key: 0,
                        class: "gh-badge-topic-chip more",
                        title: k.topics.slice(2).map((z) => "#" + z).join(" ")
                      }, " +" + a(k.topics.length - 2), 9, zo)) : R("", !0)
                    ], 64)) : R("", !0)
                  ]),
                  e("p", {
                    class: "desc",
                    title: k.description || ""
                  }, a(k.description || "暂无描述"), 9, Bo)
                ]),
                e("div", Yo, [
                  e("span", Vo, "★ " + a(k.stargazers_count), 1),
                  k.language ? (s(), n("span", qo, a(k.language), 1)) : R("", !0),
                  e("span", Ko, "更新 " + a(Te(k.updated_at)), 1)
                ])
              ], 42, Do))), 128)),
              t(O).getReposForList(h.name).length ? R("", !0) : (s(), n("div", Qo, [...u[34] || (u[34] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, Go))), 128)),
          e("section", Xo, [
            e("button", {
              type: "button",
              class: "btn-trigger-add-col",
              onClick: u[13] || (u[13] = (h) => t(K).promptCreateFolder())
            }, [...u[35] || (u[35] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", null, "新建 GitHub 列表", -1)
            ])])
          ])
        ]))
      ], 544),
      (s(), de(Ye, { to: "body" }, [
        v.visible && v.repo ? (s(), n("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Ve({ left: `${v.x}px`, top: `${v.y}px` }),
          onClick: u[21] || (u[21] = X(() => {
          }, ["stop"])),
          onContextmenu: u[22] || (u[22] = X(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: j(["gh-menu-has-sub", { "is-active": N.value === "folder" }]),
            onMouseenter: u[16] || (u[16] = (h) => N.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: u[14] || (u[14] = X((h) => N.value = N.value === "folder" ? null : "folder", ["stop"]))
            }, [...u[36] || (u[36] = [
              e("span", null, "移动/加入列表", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: j(["gh-sub-flyout", { "flyout-left": D.value }]),
              onClick: u[15] || (u[15] = X(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: "fo-cover-menu-item",
                type: "button",
                onClick: J
              }, " 设为未分类 "),
              (s(!0), n(W, null, B(t(O).lists, (h) => (s(), n("button", {
                key: h.id,
                class: j(["fo-cover-menu-item", { primary: t(Ne)(v.repo.full_name).includes(h.name) }]),
                type: "button",
                onClick: (k) => ne(h.name)
              }, a(t(Ne)(v.repo.full_name).includes(h.name) ? "✓ " : "  ") + "📁 " + a(h.name), 11, Jo))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[17] || (u[17] = (h) => N.value = null),
            onClick: u[18] || (u[18] = (h) => Ge(v.repo))
          }, " 查看仓库详情 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[19] || (u[19] = (h) => N.value = null),
            onClick: ue
          }, " 复制仓库链接 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: u[20] || (u[20] = (h) => N.value = null),
            onClick: P
          }, " 复制克隆命令 (git clone) ", 32)
        ], 36)) : R("", !0)
      ]))
    ]));
  }
}), en = /* @__PURE__ */ $e(Zo, [["__scopeId", "data-v-95c2f74b"]]);
function tn(b) {
  const l = b.subject?.url, i = b.repository?.html_url || "https://github.com";
  if (!l) return i;
  const o = b.subject?.type;
  return o === "Issue" ? l.replace("https://api.github.com/repos/", "https://github.com/") : o === "PullRequest" ? l.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : o === "Release" ? l.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : l.replace("https://api.github.com/repos/", "https://github.com/");
}
function sn(b) {
  try {
    const l = Date.now() - new Date(b).getTime();
    if (l < 6e4) return "刚刚";
    const i = Math.floor(l / 6e4);
    if (i < 60) return `${i} 分钟前`;
    const o = Math.floor(i / 60);
    if (o < 24) return `${o} 小时前`;
    const g = Math.floor(o / 24);
    return g < 30 ? `${g} 天前` : b.slice(5, 10);
  } catch {
    return "";
  }
}
const U = ke({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), fe = {
  open() {
    U.isOpen = !0, (!U.items.length || Date.now() - U.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    U.isOpen = !1;
  },
  toggle() {
    U.isOpen ? this.close() : this.open();
  },
  setTab(b) {
    U.activeKind = b;
  },
  async refresh() {
    const b = K.token?.trim();
    if (!b) {
      U.items = [], U.unreadCount = 0, U.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    U.loading = !0, U.error = "";
    try {
      const l = {
        ...Ue(b),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, i = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: l
      });
      if (!i.ok)
        throw i.status === 401 ? new Error("GitHub Token 无效或已过期") : i.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${i.status})`);
      const o = await i.json();
      if (!Array.isArray(o))
        throw new Error("GitHub 返回数据异常");
      const g = o.map((f) => ({
        id: String(f.id),
        unread: !!f.unread,
        reason: String(f.reason || ""),
        updatedAt: f.updated_at,
        formattedTime: sn(f.updated_at),
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
        htmlUrl: tn(f)
      }));
      U.items = g, U.unreadCount = g.filter((f) => f.unread).length, U.lastFetchedAt = Date.now();
    } catch (l) {
      console.warn("[GitHubNotifications] 读取失败:", l), U.error = l?.message || "网络请求异常";
    } finally {
      U.loading = !1;
    }
  },
  openTarget(b) {
    typeof window < "u" && window.open(b.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, w = ke({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function De(b) {
  try {
    const l = Date.now() - new Date(b).getTime(), i = Math.floor(l / 6e4);
    if (i < 1) return "刚刚";
    if (i < 60) return `${i}分钟前`;
    const o = Math.floor(i / 60);
    if (o < 24) return `${o}小时前`;
    const g = Math.floor(o / 24);
    if (g < 30) return `${g}天前`;
    const f = new Date(b);
    return `${f.getFullYear()}/${f.getMonth() + 1}/${f.getDate()}`;
  } catch {
    return "";
  }
}
function He(b) {
  switch (b) {
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
function on(b) {
  return b ? {
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
  }[b] || (b.startsWith(":") && b.endsWith(":") ? b.slice(1, -1) : b) : "";
}
function ze(b) {
  if (!Array.isArray(b)) return [];
  const l = {
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    HOORAY: "🎉",
    CONFUSED: "😕",
    HEART: "❤️",
    ROCKET: "🚀",
    EYES: "👀"
  };
  return b.map((i) => ({
    emoji: l[i.content] || i.content,
    count: i.reactors?.totalCount || i.users?.totalCount || 0
  })).filter((i) => i.count > 0);
}
function st(b) {
  if (!b || typeof b != "object") return [];
  const l = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, i = [];
  for (const [o, g] of Object.entries(l)) {
    const f = Number(b[o] || 0);
    f > 0 && i.push({ emoji: g, count: f });
  }
  return i;
}
async function ot(b, l) {
  if (!b) return "";
  try {
    const i = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...Ue(l),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: b, mode: "gfm" })
    });
    if (i.ok)
      return await i.text();
  } catch {
  }
  return he.renderMarkdown(b);
}
async function nn(b, l, i, o) {
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
        ...Ue(o),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: g,
        variables: { owner: b, name: l, num: i }
      })
    });
    if (!f.ok) return null;
    const p = (await f.json())?.data?.repository?.discussion;
    if (!p) return null;
    let m = 0;
    const A = (p.comments?.nodes || []).map((H) => {
      const L = H.replies?.nodes || [];
      m += L.length;
      const S = L.map((v) => ({
        id: v.id,
        author: {
          login: v.author?.login || "匿名",
          avatarUrl: v.author?.avatarUrl || "",
          association: He(v.authorAssociation)
        },
        createdAt: v.createdAt,
        formattedTime: De(v.createdAt),
        body: v.body || "",
        bodyHtml: v.bodyHTML || (v.body ? he.renderMarkdown(v.body) : ""),
        reactions: ze(v.reactionGroups)
      }));
      return {
        id: H.id,
        author: {
          login: H.author?.login || "匿名",
          avatarUrl: H.author?.avatarUrl || "",
          association: He(H.authorAssociation)
        },
        createdAt: H.createdAt,
        formattedTime: De(H.createdAt),
        body: H.body || "",
        bodyHtml: H.bodyHTML || (H.body ? he.renderMarkdown(H.body) : "<p>（评论内容为空）</p>"),
        reactions: ze(H.reactionGroups),
        replies: S
      };
    }), x = p.body || "", G = p.bodyHTML && p.bodyHTML.trim().length > 10 ? p.bodyHTML : x ? he.renderMarkdown(x) : "<p>（主贴内容为空）</p>";
    return {
      title: p.title,
      number: i,
      state: "discussion",
      category: p.category ? {
        name: p.category.name,
        emoji: on(p.category.emoji)
      } : void 0,
      author: {
        login: p.author?.login || "未知",
        avatarUrl: p.author?.avatarUrl || "",
        association: He(p.authorAssociation)
      },
      createdAt: p.createdAt,
      formattedTime: De(p.createdAt),
      body: x,
      bodyHtml: G,
      htmlUrl: p.url,
      commentsCount: p.comments?.totalCount || A.length,
      totalRepliesCount: m,
      comments: A,
      reactions: ze(p.reactionGroups)
    };
  } catch {
    return null;
  }
}
const Be = {
  async open(b) {
    w.isOpen = !0, w.loading = !0, w.error = "", w.data = null, w.notificationItem = b;
    const l = K.token?.trim() || "", i = {
      ...Ue(l),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const o = b.subject?.url, g = b.subject?.type, f = b.repository?.fullName || "", [C, p] = f.split("/"), m = o?.match(/\/(\d+)$/), A = m ? Number(m[1]) : void 0;
      if (g === "Discussion" && C && p && A) {
        const x = await nn(C, p, A, l);
        if (x) {
          w.data = {
            notificationId: b.id,
            title: x.title || b.subject.title,
            number: A,
            state: "discussion",
            category: x.category,
            author: x.author || { login: b.repository.owner.login, avatarUrl: b.repository.owner.avatarUrl || "" },
            createdAt: x.createdAt || b.updatedAt,
            formattedTime: x.formattedTime || b.formattedTime,
            body: x.body || "",
            bodyHtml: x.bodyHtml || (x.body ? he.renderMarkdown(x.body) : ""),
            htmlUrl: x.htmlUrl || b.htmlUrl,
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
      if (o) {
        const x = await fetch(o, { headers: i, cache: "no-store" });
        if (x.ok) {
          const G = await x.json();
          let H = [];
          if (G.comments_url && G.comments > 0)
            try {
              const v = await fetch(`${G.comments_url}?per_page=50`, { headers: i, cache: "no-store" });
              if (v.ok) {
                const N = await v.json();
                Array.isArray(N) && (H = await Promise.all(
                  N.map(async (D) => {
                    const Y = D.body_html || (D.body ? await ot(D.body, l) : "");
                    return {
                      id: D.id,
                      author: {
                        login: D.user?.login || "匿名",
                        avatarUrl: D.user?.avatar_url || "",
                        association: He(D.author_association)
                      },
                      createdAt: D.created_at,
                      formattedTime: De(D.created_at),
                      body: D.body || "",
                      bodyHtml: Y,
                      reactions: st(D.reactions)
                    };
                  })
                ));
              }
            } catch (v) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", v);
            }
          const L = G.body || "";
          let S = G.body_html || "";
          !S && L && (S = await ot(L, l)), !S && L && (S = he.renderMarkdown(L)), w.data = {
            notificationId: b.id,
            title: G.title || G.name || b.subject.title,
            number: G.number || A,
            state: G.merged ? "merged" : G.state || G.conclusion || "open",
            author: {
              login: G.user?.login || G.author?.login || b.repository.owner.login,
              avatarUrl: G.user?.avatar_url || G.author?.avatar_url || b.repository.owner.avatarUrl || "",
              association: He(G.author_association)
            },
            createdAt: G.created_at || G.published_at || b.updatedAt,
            formattedTime: De(G.created_at || G.published_at || b.updatedAt),
            body: L,
            bodyHtml: S || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: G.html_url || b.htmlUrl,
            commentsCount: typeof G.comments == "number" ? G.comments : H.length,
            comments: H,
            reactions: st(G.reactions),
            repositoryFullName: f,
            type: g || "Issue"
          };
          return;
        }
      }
      w.data = {
        notificationId: b.id,
        title: b.subject.title,
        number: A,
        state: "open",
        author: {
          login: b.repository.owner.login,
          avatarUrl: b.repository.owner.avatarUrl || ""
        },
        createdAt: b.updatedAt,
        formattedTime: b.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: b.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: f,
        type: g || "通知"
      };
    } catch (o) {
      console.warn("[GitHubNotificationDetail] 读取异常:", o), w.error = o?.message || "网络请求异常";
    } finally {
      w.loading = !1;
    }
  },
  close() {
    w.isOpen = !1, w.data = null, w.error = "";
  }
}, an = { class: "vue-gh-notification-panel-wrapper" }, ln = { class: "gh-msg-header" }, rn = { class: "gh-msg-account" }, cn = { class: "gh-msg-subtitle" }, un = {
  class: "gh-msg-tabs",
  role: "tablist"
}, dn = ["onClick"], pn = { class: "gh-msg-list" }, hn = {
  key: 0,
  class: "gh-msg-loading"
}, gn = {
  key: 1,
  class: "gh-msg-error"
}, mn = {
  key: 2,
  class: "gh-msg-empty"
}, fn = ["onClick"], bn = { class: "gh-card-indicator-col" }, vn = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, yn = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, wn = { class: "gh-card-type-col" }, _n = ["title"], kn = { class: "gh-card-main-col" }, $n = { class: "gh-card-repo-row" }, Cn = ["title"], Gn = { class: "gh-card-reason-tag" }, Tn = { class: "gh-card-time" }, Mn = ["title"], Rn = { class: "gh-card-footer-row" }, Sn = { class: "gh-card-type-label" }, xn = ["onClick"], Ln = /* @__PURE__ */ _e({
  __name: "GitHubNotificationPanel",
  setup(b) {
    const l = E(null), i = te(() => [
      { kind: "all", label: "所有", count: U.items.length },
      { kind: "unread", label: "未读", count: U.items.filter((L) => L.unread).length },
      { kind: "mention", label: "提及", count: U.items.filter((L) => L.reason === "mention").length },
      { kind: "author", label: "作者", count: U.items.filter((L) => L.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: U.items.filter((L) => L.reason === "ci_activity" || L.subject.type === "CheckSuite").length }
    ]), o = te(() => {
      const L = U.items;
      switch (U.activeKind) {
        case "unread":
          return L.filter((S) => S.unread);
        case "mention":
          return L.filter((S) => S.reason === "mention");
        case "author":
          return L.filter((S) => S.reason === "author");
        case "ci":
          return L.filter((S) => S.reason === "ci_activity" || S.subject.type === "CheckSuite");
        default:
          return L;
      }
    });
    function g(L, S) {
      if (S === "ci_activity" || L === "CheckSuite")
        return "⚡";
      switch (L) {
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
    function f(L) {
      switch (L) {
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
          return L || "通知";
      }
    }
    function C() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function p() {
      fe.refresh();
    }
    function m() {
      fe.close();
    }
    function A(L) {
      Be.open(L);
    }
    function x(L) {
      fe.openTarget(L);
    }
    function G(L) {
      if (!U.isOpen) return;
      const S = L.target;
      !l.value?.contains(S) && !S?.closest("#gh-header-msg-center-btn") && fe.close();
    }
    function H(L) {
      L.key === "Escape" && U.isOpen && fe.close();
    }
    return je(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", G), window.addEventListener("keydown", H));
    }), Fe(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", G), window.removeEventListener("keydown", H));
    }), (L, S) => (s(), n("div", an, [
      t(U).isOpen ? (s(), n("section", {
        key: 0,
        ref_key: "panelRef",
        ref: l,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: S[0] || (S[0] = X(() => {
        }, ["stop"]))
      }, [
        e("header", ln, [
          e("div", rn, [
            S[2] || (S[2] = e("div", { class: "gh-msg-octo-avatar" }, [
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
              S[1] || (S[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", cn, " 共 " + a(t(U).items.length) + " 条通知 · " + a(t(U).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          S[3] || (S[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: C
          }, " ↗ "),
          e("button", {
            type: "button",
            class: j(["gh-panel-btn", { "is-spinning": t(U).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: p
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: m
          }, " ✕ ")
        ]),
        e("nav", un, [
          (s(!0), n(W, null, B(i.value, (v) => (s(), n("button", {
            key: v.kind,
            type: "button",
            class: j(["gh-msg-tab", { active: t(U).activeKind === v.kind }]),
            onClick: (N) => t(U).activeKind = v.kind
          }, [
            ae(a(v.label) + " ", 1),
            v.count > 0 ? (s(), n("span", {
              key: 0,
              class: j(["gh-tab-pill", { "is-unread-pill": v.kind === "unread" }])
            }, a(v.count), 3)) : R("", !0)
          ], 10, dn))), 128))
        ]),
        e("div", pn, [
          t(U).loading && !t(U).items.length ? (s(), n("div", hn, [...S[4] || (S[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(U).error ? (s(), n("div", gn, [
            S[5] || (S[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, a(t(U).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: p
            }, "重试")
          ])) : o.value.length === 0 ? (s(), n("div", mn, [...S[6] || (S[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (s(!0), n(W, { key: 3 }, B(o.value, (v) => (s(), n("article", {
            key: v.id,
            class: j(["gh-notification-card", { "is-unread": v.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (N) => A(v)
          }, [
            e("div", bn, [
              v.unread ? (s(), n("span", vn)) : (s(), n("span", yn))
            ]),
            e("div", wn, [
              e("span", {
                class: "gh-type-badge",
                title: v.subject.type
              }, a(g(v.subject.type, v.reason)), 9, _n)
            ]),
            e("div", kn, [
              e("div", $n, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: v.repository.fullName
                }, a(v.repository.fullName), 9, Cn),
                e("span", Gn, a(f(v.reason)), 1),
                e("time", Tn, a(v.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: v.subject.title
              }, a(v.subject.title), 9, Mn),
              e("div", Rn, [
                e("span", Sn, a(v.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: X((N) => x(v), ["stop"])
                }, "在网页打开 ↗", 8, xn)
              ])
            ])
          ], 10, fn))), 128))
        ])
      ], 512)) : R("", !0)
    ]));
  }
}), An = /* @__PURE__ */ $e(Ln, [["__scopeId", "data-v-4271efab"]]), Dn = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, Hn = ["aria-label"], Un = { class: "gh-modal-title-wrap" }, Pn = { class: "gh-modal-octo-icon" }, En = ["href"], In = { class: "gh-owner" }, Nn = { class: "gh-name" }, jn = {
  key: 1,
  class: "gh-modal-repo-name"
}, Fn = { class: "gh-name" }, On = { class: "gh-modal-actions" }, Wn = { class: "gh-modal-content" }, zn = {
  key: 0,
  class: "gh-content-loading"
}, Bn = {
  key: 1,
  class: "gh-content-error"
}, Yn = { class: "gh-discussion-title-header" }, Vn = { class: "gh-discussion-h1" }, qn = {
  key: 0,
  class: "gh-discussion-num"
}, Kn = { class: "gh-discussion-sub-meta" }, Qn = {
  key: 0,
  class: "gh-category-pill"
}, Xn = {
  key: 0,
  class: "cat-emoji"
}, Jn = {
  key: 1,
  class: "gh-category-pill"
}, Zn = { class: "gh-sub-author" }, ea = { class: "gh-sub-verb" }, ta = {
  key: 2,
  class: "gh-sub-comments-count"
}, sa = { class: "gh-op-post-card" }, oa = { class: "gh-op-post-head" }, na = { class: "gh-op-author-left" }, aa = ["src"], la = { class: "gh-op-meta" }, ia = { class: "gh-op-name-row" }, ra = { class: "gh-op-name" }, ca = {
  key: 0,
  class: "gh-role-pill"
}, ua = { class: "gh-op-time" }, da = ["innerHTML"], pa = {
  key: 0,
  class: "gh-reactions-bar"
}, ha = { class: "rx-emoji" }, ga = { class: "rx-count" }, ma = {
  key: 0,
  class: "gh-comments-block"
}, fa = { class: "gh-comments-header" }, ba = { class: "gh-comments-count-pill" }, va = { class: "gh-comments-feed" }, ya = { class: "gh-comment-head" }, wa = ["src"], _a = { class: "gh-comment-meta" }, ka = { class: "gh-comment-author" }, $a = {
  key: 0,
  class: "gh-role-pill small"
}, Ca = { class: "gh-comment-time" }, Ga = ["innerHTML"], Ta = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, Ma = { class: "rx-emoji" }, Ra = { class: "rx-count" }, Sa = {
  key: 1,
  class: "gh-comment-replies-thread"
}, xa = { class: "gh-replies-thread-title" }, La = { class: "gh-reply-head" }, Aa = ["src"], Da = { class: "gh-reply-meta" }, Ha = { class: "gh-reply-author" }, Ua = {
  key: 0,
  class: "gh-role-pill tiny"
}, Pa = { class: "gh-reply-time" }, Ea = ["innerHTML"], Ia = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, Na = { class: "rx-emoji" }, ja = { class: "rx-count" }, Fa = {
  key: 1,
  class: "gh-no-comments"
}, Oa = /* @__PURE__ */ _e({
  __name: "GitHubNotificationDetailDrawer",
  setup(b) {
    const l = E(null), i = E(null), o = E(null);
    let g = !1, f = 0, C = 0, p = 0, m = 0, A = () => {
    };
    const x = te(() => (w.data?.repositoryFullName || w.notificationItem?.repository.fullName || "").split("/")[0] || ""), G = te(() => {
      const P = w.data?.repositoryFullName || w.notificationItem?.repository.fullName || "";
      return P.split("/")[1] || P;
    }), H = te(() => {
      if (!w.data) return "";
      const P = w.data.bodyHtml?.trim() || "";
      if (P.length > 20) return P;
      const I = w.data.body?.trim() || "";
      return I.length > 0 ? he.renderMarkdown(I) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), L = te(() => o.value ? {
      position: "fixed",
      left: `${o.value.x}px`,
      top: `${o.value.y}px`,
      transform: "none"
    } : {});
    we(
      () => w.isOpen,
      (P) => {
        P && (o.value = null, Ze(() => {
          i.value && (i.value.scrollTop = 0);
        }));
      }
    ), we(
      () => w.data,
      (P) => {
        P && Ze(() => {
          i.value && (i.value.scrollTop = 0);
        });
      }
    );
    function S(P) {
      if (P.target.closest("button, a, input")) return;
      A();
      const I = l.value;
      if (!I || !w.isOpen) return;
      g = !0;
      const F = I.getBoundingClientRect();
      p = F.left, m = F.top, f = P.clientX, C = P.clientY, o.value = { x: p, y: m };
      const q = (re) => {
        if (!g) return;
        const V = re.clientX - f, $ = re.clientY - C;
        o.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, p + V)),
          y: Math.max(10, Math.min(window.innerHeight - 80, m + $))
        };
      }, ee = () => {
        g = !1, window.removeEventListener("mousemove", q), window.removeEventListener("mouseup", ee);
      };
      A = ee, window.addEventListener("mousemove", q), window.addEventListener("mouseup", ee);
    }
    function v() {
      Be.close();
    }
    function N() {
      const P = w.data?.htmlUrl || w.notificationItem?.htmlUrl;
      P && typeof window < "u" && window.open(P, "_blank", "noopener,noreferrer");
    }
    function D(P) {
      const F = P.target?.closest("a");
      F && F.href && (P.preventDefault(), P.stopPropagation(), window.open(F.href, "_blank", "noopener,noreferrer"));
    }
    function Y() {
      w.notificationItem && Be.open(w.notificationItem);
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
    function ne(P) {
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
    function ue(P) {
      P.key === "Escape" && w.isOpen && v();
    }
    return je(() => {
      window.addEventListener("keydown", ue);
    }), Fe(() => {
      window.removeEventListener("keydown", ue), A();
    }), (P, I) => (s(), de(Ye, { to: "body" }, [
      t(w).isOpen ? (s(), n("div", Dn, [
        e("div", {
          ref_key: "windowRef",
          ref: l,
          class: "gh-nonmodal-window",
          style: Ve(L.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(w).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: S
          }, [
            e("div", Un, [
              e("span", Pn, a(le(t(w).data?.type || t(w).notificationItem?.subject.type)), 1),
              t(w).data?.htmlUrl || t(w).notificationItem?.htmlUrl ? (s(), n("a", {
                key: 0,
                href: t(w).data?.htmlUrl || t(w).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", In, a(x.value), 1),
                I[0] || (I[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", Nn, a(G.value), 1),
                I[1] || (I[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, En)) : (s(), n("span", jn, [
                e("strong", Fn, a(t(w).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", On, [
              t(w).data?.state ? (s(), n("span", {
                key: 0,
                class: j(["gh-detail-state-pill", t(w).data.state])
              }, a(ne(t(w).data.state)), 3)) : R("", !0),
              t(w).data?.htmlUrl || t(w).notificationItem?.htmlUrl ? (s(), n("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: N
              }, " 在网页打开 ↗ ")) : R("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: v
              }, " ✕ ")
            ])
          ], 32),
          e("div", Wn, [
            t(w).loading ? (s(), n("div", zn, [
              I[2] || (I[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + a(t(w).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(w).error ? (s(), n("div", Bn, [
              I[3] || (I[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, a(t(w).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: Y
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: N
                }, "在 GitHub 打开 ↗")
              ])
            ])) : t(w).data ? (s(), n("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: i,
              class: "gh-detail-scrollable",
              onClick: D
            }, [
              e("div", Yn, [
                e("h1", Vn, [
                  ae(a(t(w).data.title) + " ", 1),
                  t(w).data.number ? (s(), n("span", qn, "#" + a(t(w).data.number), 1)) : R("", !0)
                ]),
                e("div", Kn, [
                  t(w).data.category ? (s(), n("span", Qn, [
                    t(w).data.category.emoji ? (s(), n("span", Xn, a(t(w).data.category.emoji), 1)) : R("", !0),
                    e("span", null, a(t(w).data.category.name), 1)
                  ])) : (s(), n("span", Jn, a(J(t(w).data.type)), 1)),
                  e("span", Zn, a(t(w).data.author.login), 1),
                  e("span", ea, "发布于 " + a(t(w).data.formattedTime), 1),
                  t(w).data.commentsCount ? (s(), n("span", ta, [
                    ae(" · " + a(t(w).data.commentsCount) + " 条讨论主题 ", 1),
                    t(w).data.totalRepliesCount ? (s(), n(W, { key: 0 }, [
                      ae(" （含 " + a(t(w).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : R("", !0)
                  ])) : R("", !0)
                ])
              ]),
              e("article", sa, [
                e("div", oa, [
                  e("div", na, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(w).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, aa),
                    e("div", la, [
                      e("div", ia, [
                        e("strong", ra, a(t(w).data.author.login), 1),
                        t(w).data.author.association ? (s(), n("span", ca, a(t(w).data.author.association), 1)) : R("", !0)
                      ]),
                      e("time", ua, a(t(w).data.formattedTime), 1)
                    ])
                  ]),
                  I[4] || (I[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                I[5] || (I[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: H.value
                }, null, 8, da),
                t(w).data.reactions?.length ? (s(), n("div", pa, [
                  (s(!0), n(W, null, B(t(w).data.reactions, (F) => (s(), n("span", {
                    key: F.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", ha, a(F.emoji), 1),
                    e("span", ga, a(F.count), 1)
                  ]))), 128))
                ])) : R("", !0)
              ]),
              t(w).data.comments.length ? (s(), n("div", ma, [
                e("div", fa, [
                  I[6] || (I[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", ba, [
                    ae(a(t(w).data.commentsCount) + " 条主题 ", 1),
                    t(w).data.totalRepliesCount ? (s(), n(W, { key: 0 }, [
                      ae(" · " + a(t(w).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : R("", !0)
                  ])
                ]),
                e("div", va, [
                  (s(!0), n(W, null, B(t(w).data.comments, (F) => (s(), n("div", {
                    key: F.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", ya, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: F.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, wa),
                      e("div", _a, [
                        e("span", ka, a(F.author.login), 1),
                        F.author.association ? (s(), n("span", $a, a(F.author.association), 1)) : R("", !0),
                        e("time", Ca, a(F.formattedTime), 1)
                      ])
                    ]),
                    I[7] || (I[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: F.bodyHtml
                    }, null, 8, Ga),
                    F.reactions?.length ? (s(), n("div", Ta, [
                      (s(!0), n(W, null, B(F.reactions, (q) => (s(), n("span", {
                        key: q.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", Ma, a(q.emoji), 1),
                        e("span", Ra, a(q.count), 1)
                      ]))), 128))
                    ])) : R("", !0),
                    F.replies?.length ? (s(), n("div", Sa, [
                      e("div", xa, [
                        e("span", null, "💬 " + a(F.replies.length) + " 条回复对话", 1)
                      ]),
                      (s(!0), n(W, null, B(F.replies, (q) => (s(), n("div", {
                        key: q.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", La, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: q.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, Aa),
                          e("div", Da, [
                            e("strong", Ha, a(q.author.login), 1),
                            q.author.association ? (s(), n("span", Ua, a(q.author.association), 1)) : R("", !0),
                            e("time", Pa, a(q.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: q.bodyHtml
                        }, null, 8, Ea),
                        q.reactions?.length ? (s(), n("div", Ia, [
                          (s(!0), n(W, null, B(q.reactions, (ee) => (s(), n("span", {
                            key: ee.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", Na, a(ee.emoji), 1),
                            e("span", ja, a(ee.count), 1)
                          ]))), 128))
                        ])) : R("", !0)
                      ]))), 128))
                    ])) : R("", !0)
                  ]))), 128))
                ])
              ])) : (s(), n("div", Fa, [...I[8] || (I[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : R("", !0)
          ])
        ], 12, Hn)
      ])) : R("", !0)
    ]));
  }
}), Wa = /* @__PURE__ */ $e(Oa, [["__scopeId", "data-v-d22ba06c"]]), za = ["inert"], Ba = { class: "card-head" }, Ya = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, Va = ["title"], qa = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Ka = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Qa = ["placeholder"], Xa = ["title"], Ja = { class: "gh-search-rule-icon" }, Za = { class: "gh-search-rule-text" }, el = ["title"], tl = ["title"], sl = { class: "gh-header-msg-label" }, ol = {
  key: 0,
  class: "gh-header-msg-badge"
}, nl = { class: "gh-settings-anchor" }, al = ["aria-expanded", "aria-label", "title"], ll = {
  key: 0,
  class: "muted small",
  role: "status"
}, il = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, rl = { class: "gh-bili-layout" }, cl = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, ul = ["title"], dl = { class: "fo-sidebar-toggle-title" }, pl = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, hl = ["aria-expanded", "title"], gl = { class: "fo-sidebar-toggle-chevron" }, ml = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, fl = { class: "fo-sidebar-sub-wrap" }, bl = ["title"], vl = { class: "fo-sidebar-sub-main" }, yl = { class: "fo-sidebar-sub-text" }, wl = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, _l = ["title"], kl = { class: "fo-sidebar-sub-main" }, $l = { class: "fo-sidebar-sub-text" }, Cl = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, Gl = ["title"], Tl = { class: "fo-sidebar-sub-main" }, Ml = { class: "fo-sidebar-sub-text" }, Rl = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, Sl = ["title"], xl = { class: "fo-sidebar-sub-main" }, Ll = { class: "fo-sidebar-sub-text" }, Al = { class: "gh-bili-sidebar-head" }, Dl = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, Hl = { style: { color: "var(--dim)", "font-size": "9.5px" } }, Ul = ["title", "aria-label"], Pl = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, El = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Il = {
  id: "vue-github-repositories-root",
  style: { flex: "1", "min-height": "0", display: "flex", "flex-direction": "column" }
}, Nl = /* @__PURE__ */ _e({
  __name: "GitHubWorkspaceCard",
  setup(b) {
    const l = ct(() => import("./GitHubSettingsModal-D92K2v2T.js")), { active: i } = ut("card-github", "/github.html");
    let o = 0, g = !1, f;
    const C = E(""), p = E("stars");
    we(() => i.value && p.value === "stars", (V) => K.setAiViewActive(V), { immediate: !0, flush: "sync" });
    const m = E(!1), A = E("local"), x = E(""), G = E(!1), H = E(0);
    function L() {
      i.value && (G.value = !0, ++H.value);
    }
    const S = E(!1);
    we(G, (V) => {
      V && (S.value = !0);
    });
    const v = E(null);
    let N = 0;
    function D(V) {
      p.value = V, V === "trending" ? et.switchTab("trending") : et.switchTab("stars");
    }
    function Y() {
      p.value = "stars";
    }
    const le = te(() => [
      { id: "exact", icon: "🎯", name: T("search.rule.exact"), desc: T("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: T("search.rule.fuzzy"), desc: T("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: T("search.rule.topic"), desc: T("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: T("search.rule.smart"), desc: T("search.rule.smartDesc") }
    ]), J = E(K.searchRule || "exact"), ne = te(() => le.value.find((V) => V.id === J.value) || le.value[0]);
    function ue() {
      const V = K.cycleSearchRule();
      J.value = V;
    }
    const P = te(() => A.value === "global" ? T("github.searchGlobalPlaceholder") : T("github.searchLocalPlaceholder", { rule: ne.value.name }));
    function I() {
      clearTimeout(N), !(!i.value || A.value !== "local") && (N = window.setTimeout(() => K.setSearchQuery(x.value.trim().toLowerCase()), 180));
    }
    function F() {
      A.value = A.value === "local" ? "global" : "local", A.value === "local" && I();
    }
    function q() {
      x.value = "", clearTimeout(N), K.resetLocalSearch();
    }
    function ee() {
      const V = x.value.trim();
      A.value === "local" ? (clearTimeout(N), K.setSearchQuery(V.toLowerCase())) : V && window.open(`https://github.com/search?q=${encodeURIComponent(V)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function re() {
      ++o, g = !0, C.value = "";
    }
    return we(i, async (V) => {
      if (clearTimeout(N), !V) return;
      const $ = ++o;
      if ((!f || f.signal.aborted) && (f = new AbortController(), K.setRepositoryViewSignal(f.signal)), g) {
        await K.resumeRepositoryReads();
        return;
      }
      if (K.repos.length || K.loadingAllStars || K.loadingPage) {
        g = !0;
        return;
      }
      try {
        const Q = await nt();
        if ($ !== o || f.signal.aborted) return;
        g = !0, await K.loadGitHub(Q.ghUser, Q.ghToken);
      } catch {
        if ($ !== o || f?.signal.aborted) return;
        g = !1, C.value = T("github.initError");
      }
    }, { immediate: !0, flush: "sync" }), it(() => {
      K.setAiViewActive(!1), ++o, f?.abort(), clearTimeout(N);
    }), (V, $) => (s(), n("section", {
      class: j(["card wide", { "card-fullscreen": t(vt).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(i)
    }, [
      e("header", Ba, [
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
        e("div", Ya, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: X(ee, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: A.value === "local" ? t(T)("github.searchScope.toGlobal") : t(T)("github.searchScope.toLocal"),
              onClick: F
            }, [
              e("span", qa, a(A.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Ka, a(A.value === "local" ? t(T)("github.searchScope.local") : t(T)("github.searchScope.global")), 1),
              $[11] || ($[11] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, Va),
            ie(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": $[0] || ($[0] = (Q) => x.value = Q),
              placeholder: P.value,
              autocomplete: "off",
              onInput: I
            }, null, 40, Qa), [
              [ye, x.value]
            ]),
            A.value === "local" ? (s(), n("button", {
              key: 0,
              type: "button",
              class: j(["gh-search-rule-btn", `rule-${ne.value.id}`]),
              title: t(T)("github.ruleHint", { rule: ne.value.name, desc: ne.value.desc }),
              onClick: X(ue, ["stop"])
            }, [
              e("span", Ja, a(ne.value.icon), 1),
              e("span", Za, a(ne.value.name), 1)
            ], 10, Xa)) : R("", !0),
            ie(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: t(T)("github.clearSearch"),
              onClick: q
            }, "✕", 8, el), [
              [Ie, x.value]
            ]),
            $[12] || ($[12] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          $[13] || ($[13] = rt('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-9c3b2264><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-9c3b2264><input type="checkbox" value="exact" checked data-v-9c3b2264>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-9c3b2264><input type="checkbox" value="loose" data-v-9c3b2264>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-9c3b2264><input type="checkbox" value="related" data-v-9c3b2264>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-9c3b2264><input type="checkbox" value="topic" data-v-9c3b2264>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-9c3b2264><input type="checkbox" value="readme" data-v-9c3b2264>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-9c3b2264></div>', 2))
        ]),
        e("button", {
          id: "gh-header-msg-center-btn",
          class: j(["gh-header-msg-btn", { "has-unread": t(U).unreadCount > 0, "is-active": t(U).isOpen }]),
          type: "button",
          title: t(U).unreadCount > 0 ? t(T)("github.header.msgUnread", { count: t(U).unreadCount }) : t(T)("github.header.msgCenter"),
          onClick: $[1] || ($[1] = (Q) => t(fe).toggle())
        }, [
          $[14] || ($[14] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
          e("span", sl, a(t(T)("github.header.msg")), 1),
          t(U).unreadCount > 0 ? (s(), n("span", ol, a(t(U).unreadCount > 99 ? "99+" : t(U).unreadCount), 1)) : R("", !0)
        ], 10, tl),
        e("div", nl, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: v,
            "aria-expanded": G.value,
            "aria-label": t(T)("github.settings"),
            class: "gh-head-settings-btn",
            title: t(T)("github.header.settings"),
            onClick: $[2] || ($[2] = (Q) => G.value = !G.value)
          }, " ⚙️ ", 8, al),
          S.value ? (s(), de(t(l), {
            key: 0,
            visible: t(i) && G.value,
            anchor: v.value,
            "ai-request": H.value,
            onAccountReload: re,
            onClose: $[3] || ($[3] = (Q) => G.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : R("", !0)
        ])
      ]),
      C.value ? (s(), n("p", ll, a(C.value), 1)) : R("", !0),
      e("div", il, [
        e("div", rl, [
          e("aside", cl, [
            e("div", {
              class: j(["fo-sidebar-toggle-bar", { "is-collapsed": m.value }]),
              title: m.value ? t(T)("github.channel.toggleExpand") : t(T)("github.channel.toggleCollapse"),
              onClick: $[4] || ($[4] = (Q) => m.value = !m.value)
            }, [
              e("div", dl, [
                $[18] || ($[18] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, a(t(T)("github.channel.channels")), 1),
                m.value ? (s(), n("span", pl, "3")) : R("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !m.value,
                title: m.value ? t(T)("github.expand") : t(T)("github.collapse")
              }, [
                e("span", null, a(m.value ? t(T)("github.expand") : t(T)("github.collapse")), 1),
                e("span", gl, a(m.value ? "▾" : "▴"), 1)
              ], 8, hl)
            ], 10, ul),
            m.value ? R("", !0) : (s(), n("div", ml, [
              e("div", fl, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: p.value === "stars" }]),
                  title: t(T)("github.channel.starsTitle"),
                  onClick: $[5] || ($[5] = (Q) => D("stars"))
                }, [
                  e("div", vl, [
                    $[19] || ($[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", yl, [
                      e("strong", null, a(t(T)("github.channel.stars")), 1),
                      e("small", null, a(t(T)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  $[20] || ($[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, bl)
              ]),
              e("div", wl, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: p.value === "trending" }]),
                  title: t(T)("github.channel.trendingTitle"),
                  onClick: $[6] || ($[6] = (Q) => D("trending"))
                }, [
                  e("div", kl, [
                    $[21] || ($[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", $l, [
                      e("strong", null, a(t(T)("github.channel.trending")), 1),
                      e("small", null, a(t(T)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  $[22] || ($[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, _l)
              ]),
              e("div", Cl, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: p.value === "awesome" }]),
                  title: t(T)("github.channel.awesomeTitle"),
                  onClick: $[7] || ($[7] = (Q) => D("awesome"))
                }, [
                  e("div", Tl, [
                    $[23] || ($[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", Ml, [
                      e("strong", null, a(t(T)("github.channel.awesome")), 1),
                      e("small", null, a(t(T)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  $[24] || ($[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, Gl)
              ]),
              e("div", Rl, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: j(["fo-sidebar-sub-btn", { on: p.value === "repos" }]),
                  title: t(T)("github.channel.reposTitle"),
                  onClick: $[8] || ($[8] = (Q) => D("repos"))
                }, [
                  e("div", xl, [
                    $[25] || ($[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", Ll, [
                      e("strong", null, a(t(T)("github.channel.repos")), 1),
                      e("small", null, a(t(T)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  $[26] || ($[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, Sl)
              ])
            ])),
            e("header", Al, [
              e("div", null, [
                e("b", Dl, [
                  $[27] || ($[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  ae(" " + a(t(T)("github.lists.title")), 1)
                ]),
                e("small", Hl, a(t(T)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: t(T)("github.lists.new"),
                "aria-label": t(T)("github.lists.new"),
                onClick: $[9] || ($[9] = (Q) => t(K).promptCreateFolder())
              }, "＋", 8, Ul)
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: Y
            }, [
              Me(mt, { active: t(i) }, null, 8, ["active"])
            ])
          ]),
          e("section", Pl, [
            p.value === "stars" && t(pt).accountConfigured === !1 ? (s(), de(ht, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: $[10] || ($[10] = (Q) => G.value = !0)
            })) : p.value === "stars" ? (s(), n(W, { key: 1 }, [
              e("header", El, [
                Me(ft, { onOpenAiSettings: L })
              ]),
              e("div", Il, [
                Me(en, {
                  active: t(i) && p.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : p.value === "trending" ? (s(), de(bt, { key: 2 })) : p.value === "awesome" ? (s(), de(It, { key: 3 })) : p.value === "repos" ? (s(), de(Ws, {
              key: 4,
              active: t(i) && p.value === "repos"
            }, null, 8, ["active"])) : R("", !0)
          ])
        ])
      ]),
      Me(An),
      Me(Wa)
    ], 10, za));
  }
}), Ql = /* @__PURE__ */ $e(Nl, [["__scopeId", "data-v-9c3b2264"]]);
export {
  Ql as default
};
