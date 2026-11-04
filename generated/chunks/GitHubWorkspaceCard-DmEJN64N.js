import { d as be, o as i, g as d, h as e, n as oe, q as me, i as T, F as O, j as B, C as I, t as r, u as t, k as Q, b as D, y as Y, r as Ce, w as ue, D as Re, z as He, A as Ve, m as ke, e as se, l as qe, B as Ye, p as J, G as Pe, L as st, H as ot, s as te, E as at } from "./vendor-vue-FFI3kJnP.js";
import { u as nt } from "./useCardActivity-B9JGgXtu.js";
import { D as Ke, E as ve, t as W, y as it } from "./search.service-SkDtwskJ.js";
import { g as rt, _ as lt, a as ut, G as ct, b as Fe, c as dt, d as pt } from "./main-BfoSuzLX.js";
import { A as ht } from "./AccountSetupGuide-ZDGhjuNx.js";
import mt from "./GitHubTrending-BdM3s9J0.js";
import { _ as ye, t as y } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { s as ce } from "./storage-cache.service-BYF2zxXX.js";
import { n as We, r as gt } from "./view-styles-zS5Fr_m1.js";
import { m as ae } from "./core-utils-Ccz-tarm.js";
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
], vt = { class: "gh-awesome-wrapper" }, yt = { class: "gh-awesome-header" }, wt = { class: "gh-awesome-intro" }, _t = { class: "gh-awesome-search-box" }, kt = { class: "gh-awesome-pills" }, Ct = ["onClick"], $t = { class: "gh-awesome-grid" }, Gt = ["onClick"], Tt = { class: "gh-awesome-card-head" }, At = { class: "gh-awesome-card-name" }, Mt = {
  class: "gh-awesome-stars",
  title: "GitHub Star 预估"
}, St = { class: "gh-awesome-desc" }, Rt = { class: "gh-awesome-footer" }, Ht = { class: "gh-awesome-tags" }, Lt = ["href"], xt = {
  key: 0,
  class: "gh-awesome-empty"
}, Dt = /* @__PURE__ */ be({
  __name: "GitHubAwesome",
  setup(f) {
    const l = D("all"), a = D(""), n = Y(() => {
      const h = a.value.trim().toLowerCase(), _ = l.value;
      return bt.filter((c) => _ === "all" || c.category === _ ? h ? c.name.toLowerCase().includes(h) || c.title.toLowerCase().includes(h) || c.desc.toLowerCase().includes(h) || c.tags.some((A) => A.toLowerCase().includes(h)) : !0 : !1);
    });
    function m(h) {
      window.open(h, "_blank", "noreferrer");
    }
    return (h, _) => (i(), d("div", vt, [
      e("header", yt, [
        e("div", wt, [
          _[3] || (_[3] = e("div", { class: "gh-awesome-title" }, [
            e("span", { class: "gh-awesome-mark" }, "🌟"),
            e("div", null, [
              e("h3", null, "Awesome 优质资源宝库"),
              e("small", null, "全球顶级开源清单索引 · 点击卡片即可快速直达探索")
            ])
          ], -1)),
          e("div", _t, [
            oe(e("input", {
              "onUpdate:modelValue": _[0] || (_[0] = (c) => a.value = c),
              type: "search",
              placeholder: "搜索 Awesome 清单、技术栈或关键词…",
              "aria-label": "搜索 Awesome 清单"
            }, null, 512), [
              [me, a.value]
            ]),
            a.value ? (i(), d("span", {
              key: 0,
              class: "gh-awesome-clear",
              onClick: _[1] || (_[1] = (c) => a.value = "")
            }, "✕")) : T("", !0)
          ])
        ]),
        e("div", kt, [
          (i(!0), d(O, null, B(t(ft), (c) => (i(), d("button", {
            key: c.id,
            type: "button",
            class: I(["gh-awesome-pill", { active: l.value === c.id }]),
            onClick: (p) => l.value = c.id
          }, [
            e("span", null, r(c.icon), 1),
            e("b", null, r(c.name), 1)
          ], 10, Ct))), 128))
        ])
      ]),
      e("div", $t, [
        (i(!0), d(O, null, B(n.value, (c) => (i(), d("article", {
          key: c.id,
          class: "gh-awesome-card",
          onClick: (p) => m(c.url)
        }, [
          e("div", Tt, [
            e("div", At, [
              e("strong", null, r(c.title), 1),
              e("small", null, r(c.name), 1)
            ]),
            e("span", Mt, "★ " + r(c.stars), 1)
          ]),
          e("p", St, r(c.desc), 1),
          e("div", Rt, [
            e("div", Ht, [
              (i(!0), d(O, null, B(c.tags, (p) => (i(), d("span", {
                key: p,
                class: "gh-awesome-tag"
              }, r(p), 1))), 128))
            ]),
            e("a", {
              class: "gh-awesome-link-btn",
              href: c.url,
              target: "_blank",
              rel: "noreferrer",
              onClick: _[2] || (_[2] = Q(() => {
              }, ["stop"]))
            }, " 访问仓库 ↗ ", 8, Lt)
          ])
        ], 8, Gt))), 128)),
        n.value.length ? T("", !0) : (i(), d("div", xt, [..._[4] || (_[4] = [
          e("span", null, "⌕ 没有找到匹配的 Awesome 资源", -1)
        ])]))
      ])
    ]));
  }
}), Ut = /* @__PURE__ */ ye(Dt, [["__scopeId", "data-v-28a8995f"]]), de = "gh_my_repos_cache_v1", pe = "gh_my_repo_groups_v2", he = "gh_my_repo_groups_map_v2", w = Ce({
  loading: !1,
  errorMessage: "",
  repos: [],
  customGroups: [],
  repoGroupsMap: {},
  searchQuery: "",
  editingColumnGroup: null,
  composerActiveColumnId: null
});
function ie(f) {
  return f.trim().replace(/[\r\n\t]/g, "").slice(0, 50);
}
class le {
  constructor() {
    this.abortController = null, this.inFlightPromise = null;
  }
  static getInstance() {
    return le.instance || (le.instance = new le()), le.instance;
  }
  /**
   * 初始化并加载数据（SWR 策略，支持并发防抖与请求去重）
   */
  async load(l = !1) {
    if (!l && this.inFlightPromise)
      return this.inFlightPromise;
    l && (this.abortController?.abort(), this.inFlightPromise = null), this.abortController = new AbortController();
    const a = this.abortController.signal, n = (async () => {
      await this.loadPersistedGroups();
      const m = await ce.get(de);
      if (m && m.length ? this.hydrateRepos(m) : w.repos.length && this.hydrateRepos(w.repos), l || !w.repos.length) {
        w.loading = !0, w.errorMessage = "";
        try {
          await this.fetchRemote(a);
        } catch (_) {
          if (_.name === "AbortError") return;
          w.errorMessage = _.message || "获取个人仓库失败";
        } finally {
          w.loading = !1;
        }
      } else
        this.fetchRemote(a).catch(() => {
        });
    })();
    return this.inFlightPromise = n.finally(() => {
      this.inFlightPromise === n && (this.inFlightPromise = null);
    }), this.inFlightPromise;
  }
  async fetchRemote(l) {
    const { ghUser: a, ghToken: n } = await Ke();
    if (!a && !n) {
      w.errorMessage = "请先在 GitHub 设置中配置用户名或个人访问 Token。";
      return;
    }
    const m = ve(n), h = [], _ = /* @__PURE__ */ new Set();
    if (a)
      try {
        const p = `https://api.github.com/users/${encodeURIComponent(a)}/repos?type=owner&sort=updated&per_page=100`, A = await fetch(p, { method: "GET", headers: m, signal: l });
        if (A.ok) {
          const M = await A.json();
          if (Array.isArray(M))
            for (const k of M)
              k && k.id && !_.has(k.id) && (_.add(k.id), h.push(k));
        }
      } catch (p) {
        if (p.name === "AbortError") throw p;
      }
    if (n)
      try {
        const A = await fetch("https://api.github.com/user/repos?affiliation=owner&sort=updated&per_page=100", { method: "GET", headers: m, signal: l });
        if (A.ok) {
          const M = await A.json();
          if (Array.isArray(M))
            for (const k of M)
              k && k.id && !_.has(k.id) && (_.add(k.id), h.push(k));
        }
      } catch (p) {
        if (p.name === "AbortError") throw p;
      }
    if (!h.length) {
      w.repos.length || (w.errorMessage = "未能读取到个人仓库，请检查网络或 GitHub 设置。");
      return;
    }
    const c = h.map((p) => {
      const A = p.full_name || `${p.owner?.login || a}/${p.name}`, M = p.name, k = w.repoGroupsMap[A] || w.repoGroupsMap[M] || w.repoGroupsMap[A.toLowerCase()] || w.repoGroupsMap[M.toLowerCase()] || [];
      return {
        id: p.id,
        name: p.name,
        fullName: A,
        description: p.description || "",
        isPrivate: !!p.private,
        isFork: !!p.fork,
        htmlUrl: p.html_url || `https://github.com/${a}/${p.name}`,
        language: p.language || null,
        stargazersCount: Number(p.stargazers_count) || 0,
        forksCount: Number(p.forks_count) || 0,
        openIssuesCount: Number(p.open_issues_count) || 0,
        topics: Array.isArray(p.topics) ? p.topics.map((H) => String(H).toLowerCase()) : [],
        localGroups: k,
        updatedAt: p.updated_at || "",
        pushedAt: p.pushed_at || "",
        defaultBranch: p.default_branch || "main"
      };
    });
    this.hydrateRepos(c), await ce.set(de, c, { ttlMs: 30 * 86400 * 1e3 });
  }
  hydrateRepos(l) {
    let a = !1;
    w.repos = l.map((n) => {
      const m = w.repoGroupsMap[n.fullName] || w.repoGroupsMap[n.name] || w.repoGroupsMap[n.fullName.toLowerCase()] || w.repoGroupsMap[n.name.toLowerCase()], h = n.localGroups && n.localGroups.length ? n.localGroups : null, _ = this.inferGroupsForRepo(n, w.customGroups), c = (m && m.length ? m : null) || h || _, p = c ? [...new Set(c.filter(Boolean))] : [];
      return p.length && (!w.repoGroupsMap[n.fullName] || !w.repoGroupsMap[n.fullName].length) && (w.repoGroupsMap[n.fullName] = p, a = !0), {
        ...n,
        localGroups: p
      };
    }), a && this.persistGroupsMap();
  }
  /**
   * 智能推断仓库最匹配的分组归属（仅在无手动归类时作为平滑桥接）
   */
  inferGroupsForRepo(l, a) {
    if (!a || !a.length) return [];
    const n = [], m = l.name.toLowerCase(), h = (l.topics || []).map((_) => _.toLowerCase());
    for (const _ of a) {
      const c = _.toLowerCase();
      if ((c.includes("fork") || _.includes("分支")) && (l.isFork || h.includes("fork"))) {
        n.push(_);
        continue;
      }
      if ((c.includes("浏览器") || c.includes("browser") || c.includes("chrome") || c.includes("edge")) && (h.some((p) => p.includes("extension") || p.includes("browser") || p.includes("newtab")) || m.includes("tab-project"))) {
        n.push(_);
        continue;
      }
      if ((c.includes("pi") || _.includes("PI")) && (h.some((p) => p.includes("pi") || p.includes("grounding-pi")) || m.includes("pi-") || m.includes("-pi"))) {
        n.push(_);
        continue;
      }
      if (c.includes("herdr") && (h.some((p) => p.includes("herdr")) || m.includes("herdr"))) {
        n.push(_);
        continue;
      }
      if ((c.includes("嵌入式") || c.includes("embedded") || c.includes("单片机")) && (h.some((p) => p.includes("embedded") || p.includes("zephyr") || p.includes("stm32") || p.includes("k230")) || m.includes("k230") || m.includes("mspm0") || m.includes("pid-") || m.includes("zephyr"))) {
        n.push(_);
        continue;
      }
      if ((c.includes("美化") || c.includes("theme") || c.includes("style")) && (h.some((p) => p.includes("theme") || p.includes("beauty") || p.includes("ui")) || m.includes("theme") || m.includes("style"))) {
        n.push(_);
        continue;
      }
    }
    return n;
  }
  /**
   * 将仓库添加到本地自定义分组
   */
  async addRepoToGroup(l, a) {
    const n = ie(a);
    n && (l.localGroups.includes(n) || l.localGroups.push(n), w.repoGroupsMap[l.fullName] = [...l.localGroups], await this.persistGroupsMap(), await ce.set(de, w.repos, { ttlMs: 30 * 86400 * 1e3 }));
  }
  /**
   * 将仓库从指定本地分组中移出
   */
  async removeRepoFromGroup(l, a) {
    l.localGroups = l.localGroups.filter((n) => n !== a), w.repoGroupsMap[l.fullName] = [...l.localGroups], await this.persistGroupsMap(), await ce.set(de, w.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 将仓库移动到指定分组（替换原有分组）
   */
  async moveRepoToGroup(l, a) {
    if (!a)
      l.localGroups = [];
    else {
      const n = ie(a);
      if (!n) return;
      l.localGroups = [n];
    }
    w.repoGroupsMap[l.fullName] = [...l.localGroups], await this.persistGroupsMap(), await ce.set(de, w.repos, { ttlMs: 30 * 86400 * 1e3 });
  }
  /**
   * 新建一个本地分组板块
   */
  async createGroup(l) {
    const a = ie(l);
    return a ? w.customGroups.includes(a) ? (alert(`分组「${a}」已存在。`), null) : (w.customGroups.push(a), await this.persistGroups(), a) : (alert("分组名称不能为空。"), null);
  }
  /**
   * 重命名本地分组
   */
  async renameGroup(l, a) {
    const n = ie(a);
    return n ? l === n ? !0 : w.customGroups.includes(n) ? (alert(`已存在名为「${n}」的分组。`), !1) : (w.customGroups = w.customGroups.map((m) => m === l ? n : m), w.repos.forEach((m) => {
      m.localGroups.includes(l) && (m.localGroups = m.localGroups.map((h) => h === l ? n : h), w.repoGroupsMap[m.fullName] = [...m.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : (alert("新分组名称不能为空。"), !1);
  }
  /**
   * 删除本地分组
   */
  async deleteGroup(l) {
    const a = w.repos.filter((m) => m.localGroups.includes(l)).length, n = a > 0 ? `确定删除分组「${l}」吗？
该分组下的 ${a} 个仓库将被归入“未分类”，不会影响 GitHub 线上仓库。` : `确定删除空分组「${l}」吗？`;
    return confirm(n) ? (w.customGroups = w.customGroups.filter((m) => m !== l), w.repos.forEach((m) => {
      m.localGroups.includes(l) && (m.localGroups = m.localGroups.filter((h) => h !== l), w.repoGroupsMap[m.fullName] = [...m.localGroups]);
    }), await this.persistGroups(), await this.persistGroupsMap(), !0) : !1;
  }
  async loadPersistedGroups() {
    try {
      let l = null, a = null;
      if (typeof chrome < "u" && chrome.storage?.local) {
        const n = await chrome.storage.local.get([pe, he]);
        l = n?.[pe], a = n?.[he];
      }
      if (!l || !Array.isArray(l)) {
        const n = localStorage.getItem(pe);
        n && (l = JSON.parse(n));
      }
      if (!a || typeof a != "object") {
        const n = localStorage.getItem(he);
        n && (a = JSON.parse(n));
      }
      Array.isArray(l) && (w.customGroups = l.map(ie).filter(Boolean)), a && typeof a == "object" && (w.repoGroupsMap = a);
    } catch {
    }
  }
  async persistGroupsMap() {
    try {
      const l = { ...w.repoGroupsMap };
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [he]: l }), localStorage.setItem(he, JSON.stringify(l));
    } catch {
    }
  }
  async persistGroups() {
    const l = Array.from(new Set(w.customGroups.map(ie).filter(Boolean)));
    try {
      typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [pe]: l }), localStorage.setItem(pe, JSON.stringify(l));
    } catch {
    }
  }
}
const q = le.getInstance(), Nt = { class: "my-repos-workspace" }, It = {
  key: 0,
  class: "error-banner"
}, Et = { class: "shelf-header" }, jt = { class: "shelf-left" }, Ot = { class: "shelf-badge" }, Pt = { class: "shelf-right" }, Ft = { class: "shelf-search-wrap" }, Wt = ["disabled", "title"], Bt = ["title"], zt = ["onDragstart", "onContextmenu"], Vt = { class: "repo-card-head" }, qt = ["title", "onClick"], Yt = {
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
}, os = ["title"], as = { class: "board-columns-track" }, ns = ["onDragover", "onDragleave", "onDrop"], is = { class: "column-header" }, rs = {
  key: 0,
  class: "column-title-group"
}, ls = ["title"], us = { class: "badge-count" }, cs = {
  key: 1,
  class: "column-rename-group"
}, ds = ["onKeydown"], ps = ["onClick"], hs = { class: "column-actions" }, ms = ["onClick"], gs = {
  key: 0,
  class: "col-popover-menu"
}, fs = ["onClick"], bs = ["onClick"], vs = { class: "column-cards-scroll" }, ys = ["onDragstart", "onContextmenu"], ws = { class: "repo-card-head" }, _s = ["title", "onClick"], ks = {
  key: 0,
  class: "badge-repo-visibility private"
}, Cs = {
  key: 1,
  class: "badge-repo-visibility fork"
}, $s = ["title"], Gs = { class: "repo-topics-row" }, Ts = { class: "topic-chip active-chip" }, As = ["onClick"], Ms = { class: "repo-card-footer" }, Ss = { class: "meta-left" }, Rs = {
  key: 0,
  class: "meta-item lang"
}, Hs = { class: "meta-item" }, Ls = {
  key: 1,
  class: "meta-item"
}, xs = { class: "meta-date" }, Ds = {
  key: 0,
  class: "empty-column-placeholder"
}, Us = { class: "board-column new-column-slot" }, Ns = {
  key: 1,
  class: "new-column-composer"
}, Is = { class: "composer-actions" }, Es = ["onClick"], js = /* @__PURE__ */ be({
  __name: "GitHubMyRepos",
  props: {
    active: { type: Boolean }
  },
  setup(f) {
    const l = f, a = D(""), n = D(!1), m = D(null), h = D(""), _ = D(null), c = D(null), p = D(null), A = D(!1);
    function M() {
      A.value = !A.value;
    }
    function k(o) {
      const s = p.value;
      s && (Math.abs(o.deltaX) > Math.abs(o.deltaY) && o.deltaX !== 0 || o.deltaY !== 0 && (o.preventDefault(), s.scrollLeft += o.deltaY));
    }
    const H = D(null), G = D(null), $ = D(null);
    let C = null, E = 0;
    const R = Ce({
      visible: !1,
      x: 0,
      y: 0,
      repo: null,
      fromGroup: null
    }), F = D(null), Z = D(!1);
    function z() {
      R.visible = !1, F.value = null;
    }
    function K(o, s, u) {
      o.preventDefault(), o.stopPropagation();
      let b = o.clientX, V = o.clientY;
      b > window.innerWidth - 200 && (b = window.innerWidth - 210), V > window.innerHeight - 240 && (V = window.innerHeight - 245), R.x = b, R.y = V, R.repo = s, R.fromGroup = u, R.visible = !0, F.value = "folder", Z.value = b > window.innerWidth - 380;
    }
    async function ne() {
      const o = R.repo;
      z(), o && await q.moveRepoToGroup(o, null);
    }
    async function L(o) {
      const s = R.repo;
      z(), s && await q.moveRepoToGroup(s, o);
    }
    async function x() {
      const o = R.repo;
      if (z(), !!o)
        try {
          await navigator.clipboard.writeText(o.htmlUrl), We.show({
            appName: "GitHub",
            title: y("github.myRepos.copiedUrlTitle"),
            message: y("github.myRepos.copiedUrlMsg", { name: o.name })
          });
        } catch {
        }
    }
    async function U() {
      const o = R.repo;
      if (z(), !!o)
        try {
          const s = `git clone ${o.htmlUrl}.git`;
          await navigator.clipboard.writeText(s), We.show({
            appName: "GitHub",
            title: y("github.myRepos.copiedCloneTitle"),
            message: s
          });
        } catch {
        }
    }
    function j() {
      const o = R.repo;
      z(), o && Ae(o.htmlUrl);
    }
    function X() {
      const o = R.repo;
      z(), o && rt.open({
        fullName: o.fullName,
        description: o.description || "",
        stars: o.stargazersCount,
        language: o.language || void 0,
        updated: o.pushedAt
      });
    }
    function ee(o) {
      o.target?.closest(".gh-repo-context-menu") || R.visible && z();
    }
    function N(o) {
      o.key === "Escape" && R.visible && z();
    }
    const v = Y(() => w.customGroups), P = Y(() => {
      const o = w.searchQuery.trim().toLowerCase();
      return o ? w.repos.filter(
        (s) => s.name.toLowerCase().includes(o) || s.description.toLowerCase().includes(o) || s.localGroups.some((u) => u.toLowerCase().includes(o)) || s.topics.some((u) => u.toLowerCase().includes(o)) || s.language && s.language.toLowerCase().includes(o)
      ) : w.repos;
    }), we = Y(() => P.value.filter((o) => !o.localGroups.length));
    function $e(o) {
      return P.value.filter((s) => s.localGroups.includes(o));
    }
    async function Le() {
      const o = a.value.trim();
      if (!o) return;
      await q.createGroup(o) && (a.value = "", n.value = !1);
    }
    function Xe(o) {
      _.value = o, h.value = o, m.value = null;
    }
    async function xe(o) {
      const s = h.value.trim();
      if (!s || s === o) {
        _.value = null;
        return;
      }
      await q.renameGroup(o, s) && (_.value = null);
    }
    async function Qe(o) {
      m.value = null, await q.deleteGroup(o);
    }
    async function Je(o, s) {
      await q.removeRepoFromGroup(o, s);
    }
    function Ze(o) {
      const s = c.value;
      if (!s) return;
      const b = o.target?.closest(".column-cards-scroll");
      if (b && b.scrollHeight > b.clientHeight && !o.shiftKey && o.deltaX === 0) {
        const V = b.scrollTop <= 0 && o.deltaY < 0, tt = b.scrollTop + b.clientHeight >= b.scrollHeight - 1 && o.deltaY > 0;
        if (!V && !tt)
          return;
      }
      Math.abs(o.deltaX) > Math.abs(o.deltaY) && o.deltaX !== 0 || o.deltaY !== 0 && (o.preventDefault(), s.scrollLeft += o.deltaY);
    }
    function Ge(o) {
      if (!H.value || !c.value) return;
      o.preventDefault();
      const s = o.deltaX !== 0 ? o.deltaX : o.deltaY;
      c.value.scrollLeft += s;
    }
    function De() {
      if (C !== null) return;
      const o = () => {
        c.value && E !== 0 ? (c.value.scrollLeft += E, C = requestAnimationFrame(o)) : _e();
      };
      C = requestAnimationFrame(o);
    }
    function _e() {
      C !== null && (cancelAnimationFrame(C), C = null), E = 0;
    }
    function Ue(o) {
      if (!H.value || !c.value) return;
      const s = c.value.getBoundingClientRect(), u = 100;
      if (o > s.right - u) {
        const b = Math.min(1, Math.max(0.1, (o - (s.right - u)) / u));
        E = Math.round(b * 20), De();
      } else if (o < s.left + u) {
        const b = Math.min(1, Math.max(0.1, (s.left + u - o) / u));
        E = -Math.round(b * 20), De();
      } else
        _e();
    }
    function et(o) {
      H.value && (o.preventDefault(), Ue(o.clientX));
    }
    function Ne(o, s, u) {
      z(), H.value = s, G.value = u, o.dataTransfer && (o.dataTransfer.effectAllowed = "move", o.dataTransfer.setData("text/plain", `${s.id}:${u}`)), window.addEventListener("wheel", Ge, { passive: !1 });
    }
    function Te() {
      H.value = null, G.value = null, $.value = null, _e(), window.removeEventListener("wheel", Ge);
    }
    function Ie(o, s) {
      H.value && (o.preventDefault(), o.dataTransfer && (o.dataTransfer.dropEffect = "move"), $.value = s, Ue(o.clientX));
    }
    function Ee(o, s) {
      const u = o.currentTarget, b = o.relatedTarget;
      u?.contains(b) || $.value === s && ($.value = null);
    }
    async function je(o, s) {
      o.preventDefault();
      const u = H.value, b = G.value;
      Te(), u && (s === "default" ? b && b !== "default" ? await q.removeRepoFromGroup(u, b) : await q.moveRepoToGroup(u, null) : (await q.addRepoToGroup(u, s), b && b !== "default" && b !== s && await q.removeRepoFromGroup(u, b)));
    }
    function Ae(o) {
      window.open(o, "_blank", "noopener,noreferrer");
    }
    function Oe(o) {
      if (!o) return "";
      try {
        const s = new Date(o);
        return `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}-${String(s.getDate()).padStart(2, "0")}`;
      } catch {
        return "";
      }
    }
    return ue(
      () => l.active,
      (o) => {
        z(), o && q.load();
      }
    ), Re(() => {
      window.addEventListener("pointerdown", ee), window.addEventListener("keydown", N), q.load();
    }), He(() => {
      _e(), window.removeEventListener("wheel", Ge), window.removeEventListener("pointerdown", ee), window.removeEventListener("keydown", N);
    }), (o, s) => (i(), d("div", Nt, [
      t(w).errorMessage ? (i(), d("div", It, [
        e("span", null, "⚠️ " + r(t(w).errorMessage), 1),
        e("button", {
          type: "button",
          class: "btn-retry",
          onClick: s[0] || (s[0] = (u) => t(q).load(!0))
        }, "重试")
      ])) : T("", !0),
      e("section", {
        class: I(["default-shelf-area", { "is-collapsed": A.value, "drop-active": $.value === "default" }]),
        onDragover: s[4] || (s[4] = (u) => Ie(u, "default")),
        onDragleave: s[5] || (s[5] = (u) => Ee(u, "default")),
        onDrop: s[6] || (s[6] = (u) => je(u, "default"))
      }, [
        e("header", Et, [
          e("div", jt, [
            s[23] || (s[23] = e("span", { class: "shelf-icon" }, "📁", -1)),
            s[24] || (s[24] = e("span", { class: "shelf-title" }, "未分类仓库", -1)),
            e("span", Ot, r(we.value.length), 1),
            s[25] || (s[25] = e("span", { class: "shelf-sub-tip" }, "（拖入此处即可取消分组归属，不会修改 GitHub 远端 Topics）", -1))
          ]),
          e("div", Pt, [
            e("div", Ft, [
              s[26] || (s[26] = e("span", { class: "search-icon" }, "🔍", -1)),
              oe(e("input", {
                "onUpdate:modelValue": s[1] || (s[1] = (u) => t(w).searchQuery = u),
                type: "text",
                class: "shelf-search-input",
                placeholder: "搜索我的仓库名称、简介或语言…"
              }, null, 512), [
                [me, t(w).searchQuery]
              ]),
              t(w).searchQuery ? (i(), d("button", {
                key: 0,
                type: "button",
                class: "clear-search-btn",
                onClick: s[2] || (s[2] = (u) => t(w).searchQuery = "")
              }, "✕")) : T("", !0)
            ]),
            e("button", {
              type: "button",
              class: "shelf-btn-refresh",
              disabled: t(w).loading,
              title: t(y)("github.myRepos.refreshBtnTitle"),
              onClick: s[3] || (s[3] = (u) => t(q).load(!0))
            }, [
              e("span", {
                class: I({ spinning: t(w).loading })
              }, "🔄", 2),
              e("span", null, r(t(w).loading ? t(y)("github.myRepos.refreshing") : t(y)("common.refresh")), 1)
            ], 8, Wt),
            we.value.length ? (i(), d("button", {
              key: 0,
              type: "button",
              class: "shelf-toggle-btn",
              title: A.value ? t(y)("github.myRepos.expandShelf") : t(y)("github.myRepos.collapseShelf"),
              onClick: M
            }, r(A.value ? t(y)("github.myRepos.expandBtn") : t(y)("github.myRepos.collapseBtn")), 9, Bt)) : T("", !0)
          ])
        ]),
        we.value.length ? oe((i(), d("div", {
          key: 0,
          ref_key: "shelfScrollRef",
          ref: p,
          class: "shelf-cards-scroll",
          onWheel: k
        }, [
          (i(!0), d(O, null, B(we.value, (u) => (i(), d("div", {
            key: u.id,
            class: I(["repo-card shelf-card", { "card-dragging": H.value?.id === u.id }]),
            draggable: "true",
            onDragstart: (b) => Ne(b, u, "default"),
            onDragend: Te,
            onContextmenu: (b) => K(b, u, "default")
          }, [
            e("div", Vt, [
              e("span", {
                class: "repo-name",
                title: u.fullName,
                onClick: (b) => Ae(u.htmlUrl)
              }, r(u.name), 9, qt),
              u.isPrivate ? (i(), d("span", Yt, "私有")) : T("", !0),
              u.isFork ? (i(), d("span", Kt, "Fork")) : T("", !0)
            ]),
            u.description ? (i(), d("p", {
              key: 0,
              class: "repo-desc",
              title: u.description
            }, r(u.description), 9, Xt)) : T("", !0),
            u.topics.length ? (i(), d("div", Qt, [
              (i(!0), d(O, null, B(u.topics, (b) => (i(), d("span", {
                key: b,
                class: "topic-chip-tag",
                title: "GitHub 远端引流标签"
              }, " #" + r(b), 1))), 128))
            ])) : T("", !0),
            e("div", Jt, [
              e("div", Zt, [
                u.language ? (i(), d("span", es, [
                  s[27] || (s[27] = e("span", { class: "lang-color" }, null, -1)),
                  J(r(u.language), 1)
                ])) : T("", !0),
                e("span", ts, "⭐ " + r(u.stargazersCount), 1),
                u.forksCount ? (i(), d("span", ss, "🍴 " + r(u.forksCount), 1)) : T("", !0)
              ]),
              e("span", {
                class: "meta-date",
                title: "最后更新：" + u.updatedAt
              }, r(Oe(u.pushedAt || u.updatedAt)), 9, os)
            ])
          ], 42, zt))), 128))
        ], 544)), [
          [Ve, !A.value]
        ]) : T("", !0)
      ], 34),
      e("div", {
        ref_key: "boardViewportRef",
        ref: c,
        class: "board-viewport",
        onWheel: Ze,
        onDragover: et
      }, [
        e("div", as, [
          (i(!0), d(O, null, B(v.value, (u) => (i(), d("section", {
            key: u,
            class: I(["board-column topic-column", { "drop-active": $.value === u }]),
            onDragover: (b) => Ie(b, u),
            onDragleave: (b) => Ee(b, u),
            onDrop: (b) => je(b, u)
          }, [
            e("header", is, [
              _.value !== u ? (i(), d("div", rs, [
                s[28] || (s[28] = e("span", { class: "col-dot topic-dot" }, null, -1)),
                e("h3", {
                  class: "column-title",
                  title: "自定义分组: " + u
                }, " 📁 " + r(u), 9, ls),
                e("span", us, r($e(u).length), 1)
              ])) : (i(), d("div", cs, [
                oe(e("input", {
                  "onUpdate:modelValue": s[7] || (s[7] = (b) => h.value = b),
                  type: "text",
                  class: "rename-input",
                  onKeydown: [
                    ke((b) => xe(u), ["enter"]),
                    s[8] || (s[8] = ke((b) => _.value = null, ["esc"]))
                  ],
                  autofocus: ""
                }, null, 40, ds), [
                  [me, h.value]
                ]),
                e("button", {
                  type: "button",
                  class: "btn-confirm-rename",
                  onClick: (b) => xe(u)
                }, "✓", 8, ps),
                e("button", {
                  type: "button",
                  class: "btn-cancel-rename",
                  onClick: s[9] || (s[9] = (b) => _.value = null)
                }, "✕")
              ])),
              e("div", hs, [
                e("button", {
                  type: "button",
                  class: "col-more-btn",
                  title: "分组操作",
                  onClick: (b) => m.value = m.value === u ? null : u
                }, "•••", 8, ms),
                m.value === u ? (i(), d("div", gs, [
                  e("button", {
                    type: "button",
                    class: "menu-item",
                    onClick: (b) => Xe(u)
                  }, " 重命名分组 ", 8, fs),
                  e("button", {
                    type: "button",
                    class: "menu-item danger",
                    onClick: (b) => Qe(u)
                  }, " 删除分组 ", 8, bs)
                ])) : T("", !0)
              ])
            ]),
            e("div", vs, [
              (i(!0), d(O, null, B($e(u), (b) => (i(), d("div", {
                key: b.id,
                class: I(["repo-card", { "card-dragging": H.value?.id === b.id }]),
                draggable: "true",
                onDragstart: (V) => Ne(V, b, u),
                onDragend: Te,
                onContextmenu: (V) => K(V, b, u)
              }, [
                e("div", ws, [
                  e("span", {
                    class: "repo-name",
                    title: b.fullName,
                    onClick: (V) => Ae(b.htmlUrl)
                  }, r(b.name), 9, _s),
                  b.isPrivate ? (i(), d("span", ks, "私有")) : T("", !0),
                  b.isFork ? (i(), d("span", Cs, "Fork")) : T("", !0)
                ]),
                b.description ? (i(), d("p", {
                  key: 0,
                  class: "repo-desc",
                  title: b.description
                }, r(b.description), 9, $s)) : T("", !0),
                e("div", Gs, [
                  e("span", Ts, [
                    J(" 📁 " + r(u) + " ", 1),
                    e("i", {
                      class: "remove-topic-btn",
                      title: "从该分组移出",
                      onClick: Q((V) => Je(b, u), ["stop"])
                    }, "✕", 8, As)
                  ]),
                  (i(!0), d(O, null, B(b.topics, (V) => (i(), d("span", {
                    key: V,
                    class: "topic-chip-tag",
                    title: "GitHub 远端引流标签"
                  }, " #" + r(V), 1))), 128))
                ]),
                e("div", Ms, [
                  e("div", Ss, [
                    b.language ? (i(), d("span", Rs, [
                      s[29] || (s[29] = e("span", { class: "lang-color" }, null, -1)),
                      J(r(b.language), 1)
                    ])) : T("", !0),
                    e("span", Hs, "⭐ " + r(b.stargazersCount), 1),
                    b.forksCount ? (i(), d("span", Ls, "🍴 " + r(b.forksCount), 1)) : T("", !0)
                  ]),
                  e("span", xs, r(Oe(b.pushedAt || b.updatedAt)), 1)
                ])
              ], 42, ys))), 128)),
              $e(u).length ? T("", !0) : (i(), d("div", Ds, [...s[30] || (s[30] = [
                e("span", null, "暂无仓库，可从上方或其它列拖入", -1)
              ])]))
            ])
          ], 42, ns))), 128)),
          e("section", Us, [
            n.value ? (i(), d("div", Ns, [
              s[32] || (s[32] = e("header", { class: "composer-header" }, [
                e("strong", null, "新建分组板块"),
                e("small", null, "支持中文命名，仅在插件内归类，不影响 GitHub 远端 Topics")
              ], -1)),
              oe(e("input", {
                "onUpdate:modelValue": s[11] || (s[11] = (u) => a.value = u),
                type: "text",
                placeholder: "输入分组名称（如：前端工具、深度学习）",
                class: "composer-input",
                onKeydown: [
                  ke(Le, ["enter"]),
                  s[12] || (s[12] = ke((u) => n.value = !1, ["esc"]))
                ],
                autofocus: ""
              }, null, 544), [
                [me, a.value]
              ]),
              e("div", Is, [
                e("button", {
                  type: "button",
                  class: "btn-primary",
                  onClick: Le
                }, "创建"),
                e("button", {
                  type: "button",
                  class: "btn-cancel",
                  onClick: s[13] || (s[13] = (u) => n.value = !1)
                }, r(t(y)("common.cancel")), 1)
              ])
            ])) : (i(), d("div", {
              key: 0,
              class: "new-column-placeholder",
              onClick: s[10] || (s[10] = (u) => n.value = !0)
            }, [...s[31] || (s[31] = [
              e("span", { class: "plus-icon" }, "＋", -1),
              e("span", { class: "new-col-text" }, "新建分组板块", -1)
            ])]))
          ])
        ])
      ], 544),
      (i(), se(qe, { to: "body" }, [
        R.visible && R.repo ? (i(), d("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Ye({ left: `${R.x}px`, top: `${R.y}px` }),
          onClick: s[21] || (s[21] = Q(() => {
          }, ["stop"])),
          onContextmenu: s[22] || (s[22] = Q(() => {
          }, ["prevent"]))
        }, [
          e("div", {
            class: I(["gh-menu-has-sub", { "is-active": F.value === "folder" }]),
            onMouseenter: s[16] || (s[16] = (u) => F.value = "folder")
          }, [
            e("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button",
              onClick: s[14] || (s[14] = Q((u) => F.value = F.value === "folder" ? null : "folder", ["stop"]))
            }, [...s[33] || (s[33] = [
              e("span", null, "移动到分组", -1),
              e("span", { class: "sub-arrow" }, "›", -1)
            ])]),
            e("div", {
              class: I(["gh-sub-flyout", { "flyout-left": Z.value }]),
              onClick: s[15] || (s[15] = Q(() => {
              }, ["stop"]))
            }, [
              e("button", {
                class: I(["fo-cover-menu-item", { primary: !R.repo.localGroups.length }]),
                type: "button",
                onClick: ne
              }, r(R.repo.localGroups.length ? "  " : "✓ ") + "设为未分类 ", 3),
              (i(!0), d(O, null, B(v.value, (u) => (i(), d("button", {
                key: u,
                class: I(["fo-cover-menu-item", { primary: R.repo.localGroups.includes(u) }]),
                type: "button",
                onClick: (b) => L(u)
              }, r(R.repo.localGroups.includes(u) ? "✓ " : "  ") + "📁 " + r(u), 11, Es))), 128))
            ], 2)
          ], 34),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[17] || (s[17] = (u) => F.value = null),
            onClick: x
          }, r(t(y)("github.myRepos.copyRepoUrl")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[18] || (s[18] = (u) => F.value = null),
            onClick: U
          }, r(t(y)("github.myRepos.copyCloneCmd")), 33),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[19] || (s[19] = (u) => F.value = null),
            onClick: X
          }, " 创建任务 ", 32),
          e("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: s[20] || (s[20] = (u) => F.value = null),
            onClick: j
          }, r(t(y)("github.myRepos.openInGitHub")), 33)
        ], 36)) : T("", !0)
      ]))
    ]));
  }
}), Os = /* @__PURE__ */ ye(js, [["__scopeId", "data-v-f77c8971"]]);
function Ps(f) {
  const l = f.subject?.url, a = f.repository?.html_url || "https://github.com";
  if (!l) return a;
  const n = f.subject?.type;
  return n === "Issue" ? l.replace("https://api.github.com/repos/", "https://github.com/") : n === "PullRequest" ? l.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/") : n === "Release" ? l.replace("https://api.github.com/repos/", "https://github.com/").replace("/releases/", "/releases/tag/") : l.replace("https://api.github.com/repos/", "https://github.com/");
}
function Fs(f) {
  try {
    const l = Date.now() - new Date(f).getTime();
    if (l < 6e4) return "刚刚";
    const a = Math.floor(l / 6e4);
    if (a < 60) return `${a} 分钟前`;
    const n = Math.floor(a / 60);
    if (n < 24) return `${n} 小时前`;
    const m = Math.floor(n / 24);
    return m < 30 ? `${m} 天前` : f.slice(5, 10);
  } catch {
    return "";
  }
}
const S = Ce({
  isOpen: !1,
  loading: !1,
  error: "",
  activeKind: "all",
  items: [],
  unreadCount: 0,
  lastFetchedAt: 0
}), re = {
  open() {
    S.isOpen = !0, (!S.items.length || Date.now() - S.lastFetchedAt > 12e4) && this.refresh();
  },
  close() {
    S.isOpen = !1;
  },
  toggle() {
    S.isOpen ? this.close() : this.open();
  },
  setTab(f) {
    S.activeKind = f;
  },
  async refresh() {
    const f = W.token?.trim();
    if (!f) {
      S.items = [], S.unreadCount = 0, S.error = "未配置 GitHub Token，请在设置中配置带有 notifications 权限的 Token。";
      return;
    }
    S.loading = !0, S.error = "";
    try {
      const l = {
        ...ve(f),
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      }, a = await fetch("https://api.github.com/notifications?all=true&per_page=50", {
        headers: l
      });
      if (!a.ok)
        throw a.status === 401 ? new Error("GitHub Token 无效或已过期") : a.status === 403 ? new Error("当前 Token 缺少 notifications 作用域，请前往 GitHub 生成带有 notifications 权限的 Personal Access Token。") : new Error(`请求失败 (HTTP ${a.status})`);
      const n = await a.json();
      if (!Array.isArray(n))
        throw new Error("GitHub 返回数据异常");
      const m = n.map((h) => ({
        id: String(h.id),
        unread: !!h.unread,
        reason: String(h.reason || ""),
        updatedAt: h.updated_at,
        formattedTime: Fs(h.updated_at),
        subject: {
          title: String(h.subject?.title || "未命名通知"),
          url: String(h.subject?.url || ""),
          type: String(h.subject?.type || "Issue"),
          latestCommentUrl: h.subject?.latest_comment_url
        },
        repository: {
          id: Number(h.repository?.id || 0),
          name: String(h.repository?.name || ""),
          fullName: String(h.repository?.full_name || ""),
          owner: {
            login: String(h.repository?.owner?.login || ""),
            avatarUrl: h.repository?.owner?.avatar_url
          },
          htmlUrl: String(h.repository?.html_url || "")
        },
        url: String(h.url || ""),
        htmlUrl: Ps(h)
      }));
      S.items = m, S.unreadCount = m.filter((h) => h.unread).length, S.lastFetchedAt = Date.now();
    } catch (l) {
      console.warn("[GitHubNotifications] 读取失败:", l), S.error = l?.message || "网络请求异常";
    } finally {
      S.loading = !1;
    }
  },
  openTarget(f) {
    typeof window < "u" && window.open(f.htmlUrl, "_blank", "noopener,noreferrer");
  }
}, g = Ce({
  isOpen: !1,
  loading: !1,
  error: "",
  data: null,
  notificationItem: null
});
function ge(f) {
  try {
    const l = Date.now() - new Date(f).getTime(), a = Math.floor(l / 6e4);
    if (a < 1) return "刚刚";
    if (a < 60) return `${a}分钟前`;
    const n = Math.floor(a / 60);
    if (n < 24) return `${n}小时前`;
    const m = Math.floor(n / 24);
    if (m < 30) return `${m}天前`;
    const h = new Date(f);
    return `${h.getFullYear()}/${h.getMonth() + 1}/${h.getDate()}`;
  } catch {
    return "";
  }
}
function fe(f) {
  switch (f) {
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
function Ws(f) {
  return f ? {
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
  }[f] || (f.startsWith(":") && f.endsWith(":") ? f.slice(1, -1) : f) : "";
}
function Me(f) {
  if (!Array.isArray(f)) return [];
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
  return f.map((a) => ({
    emoji: l[a.content] || a.content,
    count: a.reactors?.totalCount || a.users?.totalCount || 0
  })).filter((a) => a.count > 0);
}
function Be(f) {
  if (!f || typeof f != "object") return [];
  const l = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    hooray: "🎉",
    confused: "😕",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀"
  }, a = [];
  for (const [n, m] of Object.entries(l)) {
    const h = Number(f[n] || 0);
    h > 0 && a.push({ emoji: m, count: h });
  }
  return a;
}
async function ze(f, l) {
  if (!f) return "";
  try {
    const a = await fetch("https://api.github.com/markdown", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...ve(l),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: f, mode: "gfm" })
    });
    if (a.ok)
      return await a.text();
  } catch {
  }
  return ae.renderMarkdown(f);
}
async function Bs(f, l, a, n) {
  const m = `
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
    const h = await fetch("https://api.github.com/graphql", {
      method: "POST",
      cache: "no-store",
      headers: {
        ...ve(n),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: m,
        variables: { owner: f, name: l, num: a }
      })
    });
    if (!h.ok) return null;
    const c = (await h.json())?.data?.repository?.discussion;
    if (!c) return null;
    let p = 0;
    const A = (c.comments?.nodes || []).map((H) => {
      const G = H.replies?.nodes || [];
      p += G.length;
      const $ = G.map((C) => ({
        id: C.id,
        author: {
          login: C.author?.login || "匿名",
          avatarUrl: C.author?.avatarUrl || "",
          association: fe(C.authorAssociation)
        },
        createdAt: C.createdAt,
        formattedTime: ge(C.createdAt),
        body: C.body || "",
        bodyHtml: C.bodyHTML || (C.body ? ae.renderMarkdown(C.body) : ""),
        reactions: Me(C.reactionGroups)
      }));
      return {
        id: H.id,
        author: {
          login: H.author?.login || "匿名",
          avatarUrl: H.author?.avatarUrl || "",
          association: fe(H.authorAssociation)
        },
        createdAt: H.createdAt,
        formattedTime: ge(H.createdAt),
        body: H.body || "",
        bodyHtml: H.bodyHTML || (H.body ? ae.renderMarkdown(H.body) : "<p>（评论内容为空）</p>"),
        reactions: Me(H.reactionGroups),
        replies: $
      };
    }), M = c.body || "", k = c.bodyHTML && c.bodyHTML.trim().length > 10 ? c.bodyHTML : M ? ae.renderMarkdown(M) : "<p>（主贴内容为空）</p>";
    return {
      title: c.title,
      number: a,
      state: "discussion",
      category: c.category ? {
        name: c.category.name,
        emoji: Ws(c.category.emoji)
      } : void 0,
      author: {
        login: c.author?.login || "未知",
        avatarUrl: c.author?.avatarUrl || "",
        association: fe(c.authorAssociation)
      },
      createdAt: c.createdAt,
      formattedTime: ge(c.createdAt),
      body: M,
      bodyHtml: k,
      htmlUrl: c.url,
      commentsCount: c.comments?.totalCount || A.length,
      totalRepliesCount: p,
      comments: A,
      reactions: Me(c.reactionGroups)
    };
  } catch {
    return null;
  }
}
const Se = {
  async open(f) {
    g.isOpen = !0, g.loading = !0, g.error = "", g.data = null, g.notificationItem = f;
    const l = W.token?.trim() || "", a = {
      ...ve(l),
      Accept: "application/vnd.github.html+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
    try {
      const n = f.subject?.url, m = f.subject?.type, h = f.repository?.fullName || "", [_, c] = h.split("/"), p = n?.match(/\/(\d+)$/), A = p ? Number(p[1]) : void 0;
      if (m === "Discussion" && _ && c && A) {
        const M = await Bs(_, c, A, l);
        if (M) {
          g.data = {
            notificationId: f.id,
            title: M.title || f.subject.title,
            number: A,
            state: "discussion",
            category: M.category,
            author: M.author || { login: f.repository.owner.login, avatarUrl: f.repository.owner.avatarUrl || "" },
            createdAt: M.createdAt || f.updatedAt,
            formattedTime: M.formattedTime || f.formattedTime,
            body: M.body || "",
            bodyHtml: M.bodyHtml || (M.body ? ae.renderMarkdown(M.body) : ""),
            htmlUrl: M.htmlUrl || f.htmlUrl,
            commentsCount: M.commentsCount || 0,
            totalRepliesCount: M.totalRepliesCount || 0,
            comments: M.comments || [],
            reactions: M.reactions || [],
            repositoryFullName: h,
            type: "Discussion"
          };
          return;
        }
      }
      if (n) {
        const M = await fetch(n, { headers: a, cache: "no-store" });
        if (M.ok) {
          const k = await M.json();
          let H = [];
          if (k.comments_url && k.comments > 0)
            try {
              const C = await fetch(`${k.comments_url}?per_page=50`, { headers: a, cache: "no-store" });
              if (C.ok) {
                const E = await C.json();
                Array.isArray(E) && (H = await Promise.all(
                  E.map(async (R) => {
                    const F = R.body_html || (R.body ? await ze(R.body, l) : "");
                    return {
                      id: R.id,
                      author: {
                        login: R.user?.login || "匿名",
                        avatarUrl: R.user?.avatar_url || "",
                        association: fe(R.author_association)
                      },
                      createdAt: R.created_at,
                      formattedTime: ge(R.created_at),
                      body: R.body || "",
                      bodyHtml: F,
                      reactions: Be(R.reactions)
                    };
                  })
                ));
              }
            } catch (C) {
              console.warn("[GitHubNotificationDetail] 拉取评论失败:", C);
            }
          const G = k.body || "";
          let $ = k.body_html || "";
          !$ && G && ($ = await ze(G, l)), !$ && G && ($ = ae.renderMarkdown(G)), g.data = {
            notificationId: f.id,
            title: k.title || k.name || f.subject.title,
            number: k.number || A,
            state: k.merged ? "merged" : k.state || k.conclusion || "open",
            author: {
              login: k.user?.login || k.author?.login || f.repository.owner.login,
              avatarUrl: k.user?.avatar_url || k.author?.avatar_url || f.repository.owner.avatarUrl || "",
              association: fe(k.author_association)
            },
            createdAt: k.created_at || k.published_at || f.updatedAt,
            formattedTime: ge(k.created_at || k.published_at || f.updatedAt),
            body: G,
            bodyHtml: $ || "<p style='color: var(--dim);'>（正文内容为空）</p>",
            htmlUrl: k.html_url || f.htmlUrl,
            commentsCount: typeof k.comments == "number" ? k.comments : H.length,
            comments: H,
            reactions: Be(k.reactions),
            repositoryFullName: h,
            type: m || "Issue"
          };
          return;
        }
      }
      g.data = {
        notificationId: f.id,
        title: f.subject.title,
        number: A,
        state: "open",
        author: {
          login: f.repository.owner.login,
          avatarUrl: f.repository.owner.avatarUrl || ""
        },
        createdAt: f.updatedAt,
        formattedTime: f.formattedTime,
        body: "",
        bodyHtml: "<p style='color: var(--muted);'>未能通过 API 读取到详细正文，请点击右上角「在网页打开」直达原帖。</p>",
        htmlUrl: f.htmlUrl,
        commentsCount: 0,
        comments: [],
        repositoryFullName: h,
        type: m || "通知"
      };
    } catch (n) {
      console.warn("[GitHubNotificationDetail] 读取异常:", n), g.error = n?.message || "网络请求异常";
    } finally {
      g.loading = !1;
    }
  },
  close() {
    g.isOpen = !1, g.data = null, g.error = "";
  }
}, zs = { class: "vue-gh-notification-panel-wrapper" }, Vs = { class: "gh-msg-header" }, qs = { class: "gh-msg-account" }, Ys = { class: "gh-msg-subtitle" }, Ks = {
  class: "gh-msg-tabs",
  role: "tablist"
}, Xs = ["onClick"], Qs = { class: "gh-msg-list" }, Js = {
  key: 0,
  class: "gh-msg-loading"
}, Zs = {
  key: 1,
  class: "gh-msg-error"
}, eo = {
  key: 2,
  class: "gh-msg-empty"
}, to = ["onClick"], so = { class: "gh-card-indicator-col" }, oo = {
  key: 0,
  class: "gh-unread-dot",
  title: "未读通知"
}, ao = {
  key: 1,
  class: "gh-read-dot-placeholder"
}, no = { class: "gh-card-type-col" }, io = ["title"], ro = { class: "gh-card-main-col" }, lo = { class: "gh-card-repo-row" }, uo = ["title"], co = { class: "gh-card-reason-tag" }, po = { class: "gh-card-time" }, ho = ["title"], mo = { class: "gh-card-footer-row" }, go = { class: "gh-card-type-label" }, fo = ["onClick"], bo = /* @__PURE__ */ be({
  __name: "GitHubNotificationPanel",
  setup(f) {
    const l = D(null), a = Y(() => [
      { kind: "all", label: "所有", count: S.items.length },
      { kind: "unread", label: "未读", count: S.items.filter((G) => G.unread).length },
      { kind: "mention", label: "提及", count: S.items.filter((G) => G.reason === "mention").length },
      { kind: "author", label: "作者", count: S.items.filter((G) => G.reason === "author").length },
      { kind: "ci", label: "CI 活动", count: S.items.filter((G) => G.reason === "ci_activity" || G.subject.type === "CheckSuite").length }
    ]), n = Y(() => {
      const G = S.items;
      switch (S.activeKind) {
        case "unread":
          return G.filter(($) => $.unread);
        case "mention":
          return G.filter(($) => $.reason === "mention");
        case "author":
          return G.filter(($) => $.reason === "author");
        case "ci":
          return G.filter(($) => $.reason === "ci_activity" || $.subject.type === "CheckSuite");
        default:
          return G;
      }
    });
    function m(G, $) {
      if ($ === "ci_activity" || G === "CheckSuite")
        return "⚡";
      switch (G) {
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
    function h(G) {
      switch (G) {
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
          return G || "通知";
      }
    }
    function _() {
      typeof window < "u" && window.open("https://github.com/notifications", "_blank", "noopener,noreferrer");
    }
    function c() {
      re.refresh();
    }
    function p() {
      re.close();
    }
    function A(G) {
      Se.open(G);
    }
    function M(G) {
      re.openTarget(G);
    }
    function k(G) {
      if (!S.isOpen) return;
      const $ = G.target;
      !l.value?.contains($) && !$?.closest("#gh-header-msg-center-btn") && re.close();
    }
    function H(G) {
      G.key === "Escape" && S.isOpen && re.close();
    }
    return Re(() => {
      typeof window < "u" && (window.addEventListener("pointerdown", k), window.addEventListener("keydown", H));
    }), He(() => {
      typeof window < "u" && (window.removeEventListener("pointerdown", k), window.removeEventListener("keydown", H));
    }), (G, $) => (i(), d("div", zs, [
      t(S).isOpen ? (i(), d("section", {
        key: 0,
        ref_key: "panelRef",
        ref: l,
        class: "gh-notification-panel",
        role: "dialog",
        "aria-label": "GitHub 消息通知中心",
        onClick: $[0] || ($[0] = Q(() => {
        }, ["stop"]))
      }, [
        e("header", Vs, [
          e("div", qs, [
            $[2] || ($[2] = e("div", { class: "gh-msg-octo-avatar" }, [
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
              $[1] || ($[1] = e("h2", { class: "gh-msg-title" }, "GitHub 消息通知", -1)),
              e("p", Ys, " 共 " + r(t(S).items.length) + " 条通知 · " + r(t(S).unreadCount) + " 条未读（完整保留不标记） ", 1)
            ])
          ]),
          $[3] || ($[3] = e("span", { class: "grow" }, null, -1)),
          e("button", {
            type: "button",
            class: "gh-panel-btn",
            title: "在 GitHub 网页版查看通知列表",
            onClick: _
          }, " ↗ "),
          e("button", {
            type: "button",
            class: I(["gh-panel-btn", { "is-spinning": t(S).loading }]),
            title: "重新拉取最新 GitHub 消息通知",
            onClick: c
          }, " ↻ ", 2),
          e("button", {
            type: "button",
            class: "gh-panel-btn close-btn",
            title: "关闭通知中心",
            onClick: p
          }, " ✕ ")
        ]),
        e("nav", Ks, [
          (i(!0), d(O, null, B(a.value, (C) => (i(), d("button", {
            key: C.kind,
            type: "button",
            class: I(["gh-msg-tab", { active: t(S).activeKind === C.kind }]),
            onClick: (E) => t(S).activeKind = C.kind
          }, [
            J(r(C.label) + " ", 1),
            C.count > 0 ? (i(), d("span", {
              key: 0,
              class: I(["gh-tab-pill", { "is-unread-pill": C.kind === "unread" }])
            }, r(C.count), 3)) : T("", !0)
          ], 10, Xs))), 128))
        ]),
        e("div", Qs, [
          t(S).loading && !t(S).items.length ? (i(), d("div", Js, [...$[4] || ($[4] = [
            e("div", { class: "gh-msg-spinner" }, null, -1),
            e("span", null, "正在拉取 GitHub 全量消息通知…", -1)
          ])])) : t(S).error ? (i(), d("div", Zs, [
            $[5] || ($[5] = e("span", { class: "error-icon" }, "⚠️", -1)),
            e("p", null, r(t(S).error), 1),
            e("button", {
              type: "button",
              class: "gh-retry-btn",
              onClick: c
            }, "重试")
          ])) : n.value.length === 0 ? (i(), d("div", eo, [...$[6] || ($[6] = [
            e("span", { class: "empty-emoji" }, "☕", -1),
            e("strong", null, "当前分类下暂无相关通知", -1),
            e("small", null, "你参与或关注的项目在 GitHub 上产生动态时会汇聚在此", -1)
          ])])) : (i(!0), d(O, { key: 3 }, B(n.value, (C) => (i(), d("article", {
            key: C.id,
            class: I(["gh-notification-card", { "is-unread": C.unread }]),
            title: "点击打开通知详情预览抽屉",
            onClick: (E) => A(C)
          }, [
            e("div", so, [
              C.unread ? (i(), d("span", oo)) : (i(), d("span", ao))
            ]),
            e("div", no, [
              e("span", {
                class: "gh-type-badge",
                title: C.subject.type
              }, r(m(C.subject.type, C.reason)), 9, io)
            ]),
            e("div", ro, [
              e("div", lo, [
                e("span", {
                  class: "gh-card-repo-name",
                  title: C.repository.fullName
                }, r(C.repository.fullName), 9, uo),
                e("span", co, r(h(C.reason)), 1),
                e("time", po, r(C.formattedTime), 1)
              ]),
              e("h4", {
                class: "gh-card-subject-title",
                title: C.subject.title
              }, r(C.subject.title), 9, ho),
              e("div", mo, [
                e("span", go, r(C.subject.type), 1),
                e("span", {
                  class: "gh-card-jump-hint",
                  title: "直接在 GitHub 网页打开",
                  onClick: Q((E) => M(C), ["stop"])
                }, "在网页打开 ↗", 8, fo)
              ])
            ])
          ], 10, to))), 128))
        ])
      ], 512)) : T("", !0)
    ]));
  }
}), vo = /* @__PURE__ */ ye(bo, [["__scopeId", "data-v-4271efab"]]), yo = {
  key: 0,
  class: "gh-nonmodal-backdrop"
}, wo = ["aria-label"], _o = { class: "gh-modal-title-wrap" }, ko = { class: "gh-modal-octo-icon" }, Co = ["href"], $o = { class: "gh-owner" }, Go = { class: "gh-name" }, To = {
  key: 1,
  class: "gh-modal-repo-name"
}, Ao = { class: "gh-name" }, Mo = { class: "gh-modal-actions" }, So = { class: "gh-modal-content" }, Ro = {
  key: 0,
  class: "gh-content-loading"
}, Ho = {
  key: 1,
  class: "gh-content-error"
}, Lo = { class: "gh-discussion-title-header" }, xo = { class: "gh-discussion-h1" }, Do = {
  key: 0,
  class: "gh-discussion-num"
}, Uo = { class: "gh-discussion-sub-meta" }, No = {
  key: 0,
  class: "gh-category-pill"
}, Io = {
  key: 0,
  class: "cat-emoji"
}, Eo = {
  key: 1,
  class: "gh-category-pill"
}, jo = { class: "gh-sub-author" }, Oo = { class: "gh-sub-verb" }, Po = {
  key: 2,
  class: "gh-sub-comments-count"
}, Fo = { class: "gh-op-post-card" }, Wo = { class: "gh-op-post-head" }, Bo = { class: "gh-op-author-left" }, zo = ["src"], Vo = { class: "gh-op-meta" }, qo = { class: "gh-op-name-row" }, Yo = { class: "gh-op-name" }, Ko = {
  key: 0,
  class: "gh-role-pill"
}, Xo = { class: "gh-op-time" }, Qo = ["innerHTML"], Jo = {
  key: 0,
  class: "gh-reactions-bar"
}, Zo = { class: "rx-emoji" }, ea = { class: "rx-count" }, ta = {
  key: 0,
  class: "gh-comments-block"
}, sa = { class: "gh-comments-header" }, oa = { class: "gh-comments-count-pill" }, aa = { class: "gh-comments-feed" }, na = { class: "gh-comment-head" }, ia = ["src"], ra = { class: "gh-comment-meta" }, la = { class: "gh-comment-author" }, ua = {
  key: 0,
  class: "gh-role-pill small"
}, ca = { class: "gh-comment-time" }, da = ["innerHTML"], pa = {
  key: 0,
  class: "gh-reactions-bar comment-rx"
}, ha = { class: "rx-emoji" }, ma = { class: "rx-count" }, ga = {
  key: 1,
  class: "gh-comment-replies-thread"
}, fa = { class: "gh-replies-thread-title" }, ba = { class: "gh-reply-head" }, va = ["src"], ya = { class: "gh-reply-meta" }, wa = { class: "gh-reply-author" }, _a = {
  key: 0,
  class: "gh-role-pill tiny"
}, ka = { class: "gh-reply-time" }, Ca = ["innerHTML"], $a = {
  key: 0,
  class: "gh-reactions-bar reply-rx"
}, Ga = { class: "rx-emoji" }, Ta = { class: "rx-count" }, Aa = {
  key: 1,
  class: "gh-no-comments"
}, Ma = /* @__PURE__ */ be({
  __name: "GitHubNotificationDetailDrawer",
  setup(f) {
    const l = D(null), a = D(null), n = D(null);
    let m = !1, h = 0, _ = 0, c = 0, p = 0, A = () => {
    };
    const M = Y(() => (g.data?.repositoryFullName || g.notificationItem?.repository.fullName || "").split("/")[0] || ""), k = Y(() => {
      const L = g.data?.repositoryFullName || g.notificationItem?.repository.fullName || "";
      return L.split("/")[1] || L;
    }), H = Y(() => {
      if (!g.data) return "";
      const L = g.data.bodyHtml?.trim() || "";
      if (L.length > 20) return L;
      const x = g.data.body?.trim() || "";
      return x.length > 0 ? ae.renderMarkdown(x) : "<p style='color: var(--muted);'>（主贴正文内容为空）</p>";
    }), G = Y(() => n.value ? {
      position: "fixed",
      left: `${n.value.x}px`,
      top: `${n.value.y}px`,
      transform: "none"
    } : {});
    ue(
      () => g.isOpen,
      (L) => {
        L && (n.value = null, Pe(() => {
          a.value && (a.value.scrollTop = 0);
        }));
      }
    ), ue(
      () => g.data,
      (L) => {
        L && Pe(() => {
          a.value && (a.value.scrollTop = 0);
        });
      }
    );
    function $(L) {
      if (L.target.closest("button, a, input")) return;
      A();
      const x = l.value;
      if (!x || !g.isOpen) return;
      m = !0;
      const U = x.getBoundingClientRect();
      c = U.left, p = U.top, h = L.clientX, _ = L.clientY, n.value = { x: c, y: p };
      const j = (ee) => {
        if (!m) return;
        const N = ee.clientX - h, v = ee.clientY - _;
        n.value = {
          x: Math.max(10, Math.min(window.innerWidth - 100, c + N)),
          y: Math.max(10, Math.min(window.innerHeight - 80, p + v))
        };
      }, X = () => {
        m = !1, window.removeEventListener("mousemove", j), window.removeEventListener("mouseup", X);
      };
      A = X, window.addEventListener("mousemove", j), window.addEventListener("mouseup", X);
    }
    function C() {
      Se.close();
    }
    function E() {
      const L = g.data?.htmlUrl || g.notificationItem?.htmlUrl;
      L && typeof window < "u" && window.open(L, "_blank", "noopener,noreferrer");
    }
    function R(L) {
      const U = L.target?.closest("a");
      U && U.href && (L.preventDefault(), L.stopPropagation(), window.open(U.href, "_blank", "noopener,noreferrer"));
    }
    function F() {
      g.notificationItem && Se.open(g.notificationItem);
    }
    function Z(L) {
      switch (L) {
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
    function z(L) {
      switch (L) {
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
          return L || "通知详情";
      }
    }
    function K(L) {
      switch (L) {
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
          return L || "";
      }
    }
    function ne(L) {
      L.key === "Escape" && g.isOpen && C();
    }
    return Re(() => {
      window.addEventListener("keydown", ne);
    }), He(() => {
      window.removeEventListener("keydown", ne), A();
    }), (L, x) => (i(), se(qe, { to: "body" }, [
      t(g).isOpen ? (i(), d("div", yo, [
        e("div", {
          ref_key: "windowRef",
          ref: l,
          class: "gh-nonmodal-window",
          style: Ye(G.value),
          role: "dialog",
          "aria-modal": "false",
          "aria-label": t(g).data?.title || "GitHub 详情"
        }, [
          e("header", {
            class: "gh-modal-header",
            onMousedown: $
          }, [
            e("div", _o, [
              e("span", ko, r(Z(t(g).data?.type || t(g).notificationItem?.subject.type)), 1),
              t(g).data?.htmlUrl || t(g).notificationItem?.htmlUrl ? (i(), d("a", {
                key: 0,
                href: t(g).data?.htmlUrl || t(g).notificationItem?.htmlUrl,
                target: "_blank",
                rel: "noreferrer",
                class: "gh-modal-repo-name",
                title: "在 GitHub 新标签页打开原帖"
              }, [
                e("span", $o, r(M.value), 1),
                x[0] || (x[0] = e("span", { class: "gh-sep" }, "/", -1)),
                e("strong", Go, r(k.value), 1),
                x[1] || (x[1] = e("span", { class: "gh-external-arrow" }, "↗", -1))
              ], 8, Co)) : (i(), d("span", To, [
                e("strong", Ao, r(t(g).data?.repositoryFullName || "GitHub 详情"), 1)
              ]))
            ]),
            e("div", Mo, [
              t(g).data?.state ? (i(), d("span", {
                key: 0,
                class: I(["gh-detail-state-pill", t(g).data.state])
              }, r(K(t(g).data.state)), 3)) : T("", !0),
              t(g).data?.htmlUrl || t(g).notificationItem?.htmlUrl ? (i(), d("button", {
                key: 1,
                type: "button",
                class: "gh-btn gh-btn-action",
                title: "在 GitHub 网页中打开原帖",
                onClick: E
              }, " 在网页打开 ↗ ")) : T("", !0),
              e("button", {
                type: "button",
                class: "gh-btn gh-btn-close",
                title: "关闭视窗 (Esc)",
                "aria-label": "关闭视窗",
                onClick: C
              }, " ✕ ")
            ])
          ], 32),
          e("div", So, [
            t(g).loading ? (i(), d("div", Ro, [
              x[2] || (x[2] = e("div", { class: "gh-loading-spinner" }, null, -1)),
              e("span", null, "正在获取并排版 " + r(t(g).notificationItem?.repository.fullName) + " 的贴子详情与对话流 …", 1)
            ])) : t(g).error ? (i(), d("div", Ho, [
              x[3] || (x[3] = e("span", { class: "error-icon" }, "⚠️", -1)),
              e("p", null, r(t(g).error), 1),
              e("div", { class: "error-actions" }, [
                e("button", {
                  type: "button",
                  class: "gh-btn",
                  onClick: F
                }, "重试"),
                e("button", {
                  type: "button",
                  class: "gh-btn gh-btn-action",
                  onClick: E
                }, "在 GitHub 打开 ↗")
              ])
            ])) : t(g).data ? (i(), d("div", {
              key: 2,
              ref_key: "scrollContainerRef",
              ref: a,
              class: "gh-detail-scrollable",
              onClick: R
            }, [
              e("div", Lo, [
                e("h1", xo, [
                  J(r(t(g).data.title) + " ", 1),
                  t(g).data.number ? (i(), d("span", Do, "#" + r(t(g).data.number), 1)) : T("", !0)
                ]),
                e("div", Uo, [
                  t(g).data.category ? (i(), d("span", No, [
                    t(g).data.category.emoji ? (i(), d("span", Io, r(t(g).data.category.emoji), 1)) : T("", !0),
                    e("span", null, r(t(g).data.category.name), 1)
                  ])) : (i(), d("span", Eo, r(z(t(g).data.type)), 1)),
                  e("span", jo, r(t(g).data.author.login), 1),
                  e("span", Oo, "发布于 " + r(t(g).data.formattedTime), 1),
                  t(g).data.commentsCount ? (i(), d("span", Po, [
                    J(" · " + r(t(g).data.commentsCount) + " 条讨论主题 ", 1),
                    t(g).data.totalRepliesCount ? (i(), d(O, { key: 0 }, [
                      J(" （含 " + r(t(g).data.totalRepliesCount) + " 条互动对话） ", 1)
                    ], 64)) : T("", !0)
                  ])) : T("", !0)
                ])
              ]),
              e("article", Fo, [
                e("div", Wo, [
                  e("div", Bo, [
                    e("img", {
                      class: "gh-op-avatar",
                      src: t(g).data.author.avatarUrl || "assets/icon-48.png",
                      alt: "",
                      loading: "lazy"
                    }, null, 8, zo),
                    e("div", Vo, [
                      e("div", qo, [
                        e("strong", Yo, r(t(g).data.author.login), 1),
                        t(g).data.author.association ? (i(), d("span", Ko, r(t(g).data.author.association), 1)) : T("", !0)
                      ]),
                      e("time", Xo, r(t(g).data.formattedTime), 1)
                    ])
                  ]),
                  x[4] || (x[4] = e("span", { class: "gh-op-badge" }, "楼主", -1))
                ]),
                x[5] || (x[5] = e("div", { class: "gh-op-divider" }, null, -1)),
                e("div", {
                  class: "gh-post-markdown markdown-rendered",
                  innerHTML: H.value
                }, null, 8, Qo),
                t(g).data.reactions?.length ? (i(), d("div", Jo, [
                  (i(!0), d(O, null, B(t(g).data.reactions, (U) => (i(), d("span", {
                    key: U.emoji,
                    class: "gh-reaction-pill"
                  }, [
                    e("span", Zo, r(U.emoji), 1),
                    e("span", ea, r(U.count), 1)
                  ]))), 128))
                ])) : T("", !0)
              ]),
              t(g).data.comments.length ? (i(), d("div", ta, [
                e("div", sa, [
                  x[6] || (x[6] = e("strong", null, "💬 讨论回复与对话流", -1)),
                  e("span", oa, [
                    J(r(t(g).data.commentsCount) + " 条主题 ", 1),
                    t(g).data.totalRepliesCount ? (i(), d(O, { key: 0 }, [
                      J(" · " + r(t(g).data.totalRepliesCount) + " 条楼内对话 ", 1)
                    ], 64)) : T("", !0)
                  ])
                ]),
                e("div", aa, [
                  (i(!0), d(O, null, B(t(g).data.comments, (U) => (i(), d("div", {
                    key: U.id,
                    class: "gh-comment-item-card"
                  }, [
                    e("div", na, [
                      e("img", {
                        class: "gh-comment-avatar",
                        src: U.author.avatarUrl || "assets/icon-48.png",
                        alt: "",
                        loading: "lazy"
                      }, null, 8, ia),
                      e("div", ra, [
                        e("span", la, r(U.author.login), 1),
                        U.author.association ? (i(), d("span", ua, r(U.author.association), 1)) : T("", !0),
                        e("time", ca, r(U.formattedTime), 1)
                      ])
                    ]),
                    x[7] || (x[7] = e("div", { class: "gh-op-divider" }, null, -1)),
                    e("div", {
                      class: "gh-post-markdown markdown-rendered",
                      innerHTML: U.bodyHtml
                    }, null, 8, da),
                    U.reactions?.length ? (i(), d("div", pa, [
                      (i(!0), d(O, null, B(U.reactions, (j) => (i(), d("span", {
                        key: j.emoji,
                        class: "gh-reaction-pill"
                      }, [
                        e("span", ha, r(j.emoji), 1),
                        e("span", ma, r(j.count), 1)
                      ]))), 128))
                    ])) : T("", !0),
                    U.replies?.length ? (i(), d("div", ga, [
                      e("div", fa, [
                        e("span", null, "💬 " + r(U.replies.length) + " 条回复对话", 1)
                      ]),
                      (i(!0), d(O, null, B(U.replies, (j) => (i(), d("div", {
                        key: j.id,
                        class: "gh-reply-item-card"
                      }, [
                        e("div", ba, [
                          e("img", {
                            class: "gh-reply-avatar",
                            src: j.author.avatarUrl || "assets/icon-48.png",
                            alt: "",
                            loading: "lazy"
                          }, null, 8, va),
                          e("div", ya, [
                            e("strong", wa, r(j.author.login), 1),
                            j.author.association ? (i(), d("span", _a, r(j.author.association), 1)) : T("", !0),
                            e("time", ka, r(j.formattedTime), 1)
                          ])
                        ]),
                        e("div", {
                          class: "gh-post-markdown gh-reply-markdown markdown-rendered",
                          innerHTML: j.bodyHtml
                        }, null, 8, Ca),
                        j.reactions?.length ? (i(), d("div", $a, [
                          (i(!0), d(O, null, B(j.reactions, (X) => (i(), d("span", {
                            key: X.emoji,
                            class: "gh-reaction-pill"
                          }, [
                            e("span", Ga, r(X.emoji), 1),
                            e("span", Ta, r(X.count), 1)
                          ]))), 128))
                        ])) : T("", !0)
                      ]))), 128))
                    ])) : T("", !0)
                  ]))), 128))
                ])
              ])) : (i(), d("div", Aa, [...x[8] || (x[8] = [
                e("span", null, "暂无后续讨论回复 · 可点击右上角直达 GitHub 原帖留言", -1)
              ])]))
            ], 512)) : T("", !0)
          ])
        ], 12, wo)
      ])) : T("", !0)
    ]));
  }
}), Sa = /* @__PURE__ */ ye(Ma, [["__scopeId", "data-v-d22ba06c"]]), Ra = ["inert"], Ha = { class: "card-head" }, La = {
  class: "card-fullscreen-gh-search",
  id: "gh-head-search-wrap"
}, xa = ["title"], Da = {
  id: "gh-mode-icon",
  class: "gh-mode-icon"
}, Ua = {
  id: "gh-mode-text",
  class: "gh-mode-text"
}, Na = ["placeholder"], Ia = ["title"], Ea = { class: "gh-search-rule-icon" }, ja = { class: "gh-search-rule-text" }, Oa = ["title"], Pa = ["title"], Fa = { class: "gh-header-msg-label" }, Wa = {
  key: 0,
  class: "gh-header-msg-badge"
}, Ba = { class: "gh-settings-anchor" }, za = ["aria-expanded", "aria-label", "title"], Va = {
  key: 0,
  class: "muted small",
  role: "status"
}, qa = {
  class: "gh-main-pane",
  id: "gh-pane-main"
}, Ya = { class: "gh-bili-layout" }, Ka = {
  class: "gh-bili-sidebar fo-bili-sidebar",
  id: "gh-bili-sidebar"
}, Xa = ["title"], Qa = { class: "fo-sidebar-toggle-title" }, Ja = {
  key: 0,
  class: "fo-sidebar-toggle-pill"
}, Za = ["aria-expanded", "title"], en = { class: "fo-sidebar-toggle-chevron" }, tn = {
  key: 0,
  class: "fo-sidebar-features-wrap"
}, sn = { class: "fo-sidebar-sub-wrap" }, on = ["title"], an = { class: "fo-sidebar-sub-main" }, nn = { class: "fo-sidebar-sub-text" }, rn = { class: "fo-sidebar-sub-wrap fo-sidebar-following-wrap" }, ln = ["title"], un = { class: "fo-sidebar-sub-main" }, cn = { class: "fo-sidebar-sub-text" }, dn = { class: "fo-sidebar-sub-wrap fo-sidebar-cache-wrap" }, pn = ["title"], hn = { class: "fo-sidebar-sub-main" }, mn = { class: "fo-sidebar-sub-text" }, gn = { class: "fo-sidebar-sub-wrap fo-sidebar-repos-wrap" }, fn = ["title"], bn = { class: "fo-sidebar-sub-main" }, vn = { class: "fo-sidebar-sub-text" }, yn = { class: "gh-bili-sidebar-head" }, wn = { style: { "font-size": "13px", display: "flex", "align-items": "center", gap: "6px" } }, _n = { style: { color: "var(--dim)", "font-size": "9.5px" } }, kn = ["title", "aria-label"], Cn = {
  class: "gh-bili-main",
  id: "gh-bili-main"
}, $n = {
  class: "gh-bili-hero",
  id: "gh-hero"
}, Gn = {
  id: "gh-batch-bar",
  class: "gh-batch-bar",
  hidden: ""
}, Tn = { id: "vue-github-status-root" }, An = { id: "vue-github-repositories-root" }, Mn = /* @__PURE__ */ be({
  __name: "GitHubWorkspaceCard",
  setup(f) {
    const l = at(() => import("./GitHubSettingsModal-D6ckrhuf.js")), { active: a } = nt("card-github", "/github.html");
    let n = 0, m = !1, h;
    const _ = D(""), c = D("stars");
    ue(() => a.value && c.value === "stars", (N) => W.setAiViewActive(N), { immediate: !0, flush: "sync" });
    const p = D(!1), A = D("local"), M = D(""), k = D(!1), H = D(0);
    function G() {
      a.value && (k.value = !0, ++H.value);
    }
    const $ = D(!1);
    ue(k, (N) => {
      N && ($.value = !0);
    });
    const C = D(null);
    let E = 0;
    function R(N) {
      c.value = N, N === "trending" ? Fe.switchTab("trending") : Fe.switchTab("stars");
    }
    function F() {
      c.value = "stars";
    }
    const Z = Y(() => [
      { id: "exact", icon: "🎯", name: y("search.rule.exact"), desc: y("search.rule.exactDesc") },
      { id: "fuzzy", icon: "🔍", name: y("search.rule.fuzzy"), desc: y("search.rule.fuzzyDesc") },
      { id: "topic", icon: "🏷️", name: y("search.rule.topic"), desc: y("search.rule.topicDesc") },
      { id: "smart", icon: "✨", name: y("search.rule.smart"), desc: y("search.rule.smartDesc") }
    ]), z = D(W.searchRule || "exact"), K = Y(() => Z.value.find((N) => N.id === z.value) || Z.value[0]);
    function ne() {
      const N = W.cycleSearchRule();
      z.value = N;
    }
    const L = Y(() => A.value === "global" ? y("github.searchGlobalPlaceholder") : y("github.searchLocalPlaceholder", { rule: K.value.name }));
    function x() {
      clearTimeout(E), !(!a.value || A.value !== "local") && (E = window.setTimeout(() => W.setSearchQuery(M.value.trim().toLowerCase()), 180));
    }
    function U() {
      A.value = A.value === "local" ? "global" : "local", A.value === "local" && x();
    }
    function j() {
      M.value = "", clearTimeout(E), W.resetLocalSearch();
    }
    function X() {
      const N = M.value.trim();
      A.value === "local" ? (clearTimeout(E), W.setSearchQuery(N.toLowerCase())) : N && window.open(`https://github.com/search?q=${encodeURIComponent(N)}&type=repositories`, "_blank", "noopener,noreferrer");
    }
    function ee() {
      ++n, m = !0, _.value = "";
    }
    return ue(a, async (N) => {
      const v = ++n;
      if (clearTimeout(E), h?.abort(), h = new AbortController(), N || h.abort(), W.setRepositoryViewSignal(h.signal), !!N) {
        if (m) {
          await W.resumeRepositoryReads();
          return;
        }
        if (W.repos.length || W.loadingAllStars || W.loadingPage) {
          m = !0;
          return;
        }
        try {
          const P = await Ke();
          if (!a.value || v !== n) return;
          m = !0, await W.loadGitHub(P.ghUser, P.ghToken);
        } catch {
          if (!a.value || v !== n) return;
          m = !1, _.value = y("github.initError");
        }
      }
    }, { immediate: !0, flush: "sync" }), st(() => {
      W.setAiViewActive(!1), ++n, h?.abort(), clearTimeout(E);
    }), (N, v) => (i(), d("section", {
      class: I(["card wide", { "card-fullscreen": t(gt).activeId === "card-github" }]),
      id: "card-github",
      inert: !t(a)
    }, [
      e("header", Ha, [
        v[15] || (v[15] = e("span", {
          class: "bar",
          style: { background: "linear-gradient(180deg,#22c55e,#06b6d4)" }
        }, null, -1)),
        v[16] || (v[16] = e("h2", null, "GitHub", -1)),
        v[17] || (v[17] = e("span", {
          id: "gh-user",
          class: "muted small",
          style: { "margin-left": "8px" }
        }, null, -1)),
        e("div", La, [
          e("form", {
            id: "gh-search-form",
            class: "gh-search-box",
            onSubmit: Q(X, ["prevent"])
          }, [
            e("button", {
              type: "button",
              id: "gh-search-mode-toggle",
              class: "gh-search-mode-toggle",
              title: A.value === "local" ? t(y)("github.searchScope.toGlobal") : t(y)("github.searchScope.toLocal"),
              onClick: U
            }, [
              e("span", Da, r(A.value === "local" ? "⭐" : "🌐"), 1),
              e("span", Ua, r(A.value === "local" ? t(y)("github.searchScope.local") : t(y)("github.searchScope.global")), 1),
              v[11] || (v[11] = e("span", { class: "gh-mode-arrow" }, "▾", -1))
            ], 8, xa),
            oe(e("input", {
              id: "gh-search-input",
              "onUpdate:modelValue": v[0] || (v[0] = (P) => M.value = P),
              placeholder: L.value,
              autocomplete: "off",
              onInput: x
            }, null, 40, Na), [
              [me, M.value]
            ]),
            A.value === "local" ? (i(), d("button", {
              key: 0,
              type: "button",
              class: I(["gh-search-rule-btn", `rule-${K.value.id}`]),
              title: t(y)("github.ruleHint", { rule: K.value.name, desc: K.value.desc }),
              onClick: Q(ne, ["stop"])
            }, [
              e("span", Ea, r(K.value.icon), 1),
              e("span", ja, r(K.value.name), 1)
            ], 10, Ia)) : T("", !0),
            oe(e("button", {
              type: "button",
              id: "gh-search-clear-btn",
              class: "gh-search-clear-btn",
              title: t(y)("github.clearSearch"),
              onClick: j
            }, "✕", 8, Oa), [
              [Ve, M.value]
            ]),
            v[12] || (v[12] = e("button", {
              type: "submit",
              id: "gh-search-submit-btn",
              title: "搜索"
            }, "⌕", -1))
          ], 32),
          v[13] || (v[13] = ot('<div id="gh-search-options" class="gh-search-options" aria-label="搜索来源" hidden data-v-90a302f8><label title="精确：严格用你的原关键词搜索仓库名和描述" data-v-90a302f8><input type="checkbox" value="exact" checked data-v-90a302f8>精确</label><label title="宽松匹配：把关键词拆开搜索，并按名称/描述/语言/主题的相似度本地重排" data-v-90a302f8><input type="checkbox" value="loose" data-v-90a302f8>宽松匹配</label><label title="近义词：自动扩展相关英文词，例如 ai → llm / machine learning" data-v-90a302f8><input type="checkbox" value="related" data-v-90a302f8>近义词</label><label title="主题标签：搜索 GitHub Topics 标签，例如 topic:llm" data-v-90a302f8><input type="checkbox" value="topic" data-v-90a302f8>主题标签</label><label title="说明文档：搜索仓库 README 内容" data-v-90a302f8><input type="checkbox" value="readme" data-v-90a302f8>说明文档</label></div><div id="gh-search-suggest" class="gh-search-suggest" hidden data-v-90a302f8></div>', 2))
        ]),
        e("button", {
          id: "gh-header-msg-center-btn",
          class: I(["gh-header-msg-btn", { "has-unread": t(S).unreadCount > 0, "is-active": t(S).isOpen }]),
          type: "button",
          title: t(S).unreadCount > 0 ? t(y)("github.header.msgUnread", { count: t(S).unreadCount }) : t(y)("github.header.msgCenter"),
          onClick: v[1] || (v[1] = (P) => t(re).toggle())
        }, [
          v[14] || (v[14] = e("span", { class: "gh-header-msg-icon" }, "🔔", -1)),
          e("span", Fa, r(t(y)("github.header.msg")), 1),
          t(S).unreadCount > 0 ? (i(), d("span", Wa, r(t(S).unreadCount > 99 ? "99+" : t(S).unreadCount), 1)) : T("", !0)
        ], 10, Pa),
        e("div", Ba, [
          e("button", {
            type: "button",
            ref_key: "settingsButton",
            ref: C,
            "aria-expanded": k.value,
            "aria-label": t(y)("github.settings"),
            class: "gh-head-settings-btn",
            title: t(y)("github.header.settings"),
            onClick: v[2] || (v[2] = (P) => k.value = !k.value)
          }, " ⚙️ ", 8, za),
          $.value ? (i(), se(t(l), {
            key: 0,
            visible: t(a) && k.value,
            anchor: C.value,
            "ai-request": H.value,
            onAccountReload: ee,
            onClose: v[3] || (v[3] = (P) => k.value = !1)
          }, null, 8, ["visible", "anchor", "ai-request"])) : T("", !0)
        ])
      ]),
      _.value ? (i(), d("p", Va, r(_.value), 1)) : T("", !0),
      e("div", qa, [
        e("div", Ya, [
          e("aside", Ka, [
            e("div", {
              class: I(["fo-sidebar-toggle-bar", { "is-collapsed": p.value }]),
              title: p.value ? t(y)("github.channel.toggleExpand") : t(y)("github.channel.toggleCollapse"),
              onClick: v[4] || (v[4] = (P) => p.value = !p.value)
            }, [
              e("div", Qa, [
                v[18] || (v[18] = e("span", { class: "fo-sidebar-toggle-icon" }, "⚡", -1)),
                e("span", null, r(t(y)("github.channel.channels")), 1),
                p.value ? (i(), d("span", Ja, "3")) : T("", !0)
              ]),
              e("button", {
                type: "button",
                class: "fo-sidebar-toggle-action",
                "aria-expanded": !p.value,
                title: p.value ? t(y)("github.expand") : t(y)("github.collapse")
              }, [
                e("span", null, r(p.value ? t(y)("github.expand") : t(y)("github.collapse")), 1),
                e("span", en, r(p.value ? "▾" : "▴"), 1)
              ], 8, Za)
            ], 10, Xa),
            p.value ? T("", !0) : (i(), d("div", tn, [
              e("div", sn, [
                e("button", {
                  id: "gh-sidebar-stars-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: c.value === "stars" }]),
                  title: t(y)("github.channel.starsTitle"),
                  onClick: v[5] || (v[5] = (P) => R("stars"))
                }, [
                  e("div", an, [
                    v[19] || (v[19] = e("span", { class: "fo-sidebar-sub-icon" }, "⭐", -1)),
                    e("div", nn, [
                      e("strong", null, r(t(y)("github.channel.stars")), 1),
                      e("small", null, r(t(y)("github.channel.starsSub")), 1)
                    ])
                  ]),
                  v[20] || (v[20] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #f59e0b, #d97706)" }
                  }, "STAR", -1))
                ], 10, on)
              ]),
              e("div", rn, [
                e("button", {
                  id: "gh-sidebar-trending-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: c.value === "trending" }]),
                  title: t(y)("github.channel.trendingTitle"),
                  onClick: v[6] || (v[6] = (P) => R("trending"))
                }, [
                  e("div", un, [
                    v[21] || (v[21] = e("span", { class: "fo-sidebar-sub-icon" }, "🔥", -1)),
                    e("div", cn, [
                      e("strong", null, r(t(y)("github.channel.trending")), 1),
                      e("small", null, r(t(y)("github.channel.trendingSub")), 1)
                    ])
                  ]),
                  v[22] || (v[22] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #ef4444, #f97316)" }
                  }, "HOT", -1))
                ], 10, ln)
              ]),
              e("div", dn, [
                e("button", {
                  id: "gh-sidebar-awesome-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: c.value === "awesome" }]),
                  title: t(y)("github.channel.awesomeTitle"),
                  onClick: v[7] || (v[7] = (P) => R("awesome"))
                }, [
                  e("div", hn, [
                    v[23] || (v[23] = e("span", { class: "fo-sidebar-sub-icon" }, "🌟", -1)),
                    e("div", mn, [
                      e("strong", null, r(t(y)("github.channel.awesome")), 1),
                      e("small", null, r(t(y)("github.channel.awesomeSub")), 1)
                    ])
                  ]),
                  v[24] || (v[24] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #6366f1, #a855f7)" }
                  }, "AWESOME", -1))
                ], 10, pn)
              ]),
              e("div", gn, [
                e("button", {
                  id: "gh-sidebar-repos-btn",
                  type: "button",
                  class: I(["fo-sidebar-sub-btn", { on: c.value === "repos" }]),
                  title: t(y)("github.channel.reposTitle"),
                  onClick: v[8] || (v[8] = (P) => R("repos"))
                }, [
                  e("div", bn, [
                    v[25] || (v[25] = e("span", { class: "fo-sidebar-sub-icon" }, "📦", -1)),
                    e("div", vn, [
                      e("strong", null, r(t(y)("github.channel.repos")), 1),
                      e("small", null, r(t(y)("github.channel.reposSub")), 1)
                    ])
                  ]),
                  v[26] || (v[26] = e("span", {
                    class: "fo-sidebar-sub-badge",
                    style: { background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }
                  }, "REPOS", -1))
                ], 10, fn)
              ])
            ])),
            e("header", yn, [
              e("div", null, [
                e("b", wn, [
                  v[27] || (v[27] = e("i", { class: "fo-folder-icon" }, null, -1)),
                  J(" " + r(t(y)("github.lists.title")), 1)
                ]),
                e("small", _n, r(t(y)("github.lists.sub")), 1)
              ]),
              e("button", {
                class: "fo-sidebar-add",
                id: "gh-folder-add-btn",
                type: "button",
                title: t(y)("github.lists.new"),
                "aria-label": t(y)("github.lists.new"),
                onClick: v[9] || (v[9] = (P) => t(W).promptCreateFolder())
              }, "＋", 8, kn)
            ]),
            e("nav", {
              class: "gh-bili-folder-list",
              id: "gh-folder-list",
              onClick: F
            }, [
              te(lt, { active: t(a) }, null, 8, ["active"])
            ])
          ]),
          e("section", Cn, [
            c.value === "stars" && t(it).accountConfigured === !1 ? (i(), se(ht, {
              key: 0,
              icon: "⭐",
              title: "尚未配置 GitHub 账号",
              description: "填写 GitHub 用户名即可查看 Star 收藏；Token 可选，用于提高访问额度及管理 Star。",
              onConfigure: v[10] || (v[10] = (P) => k.value = !0)
            })) : c.value === "stars" ? (i(), d(O, { key: 1 }, [
              e("header", $n, [
                te(dt, { onOpenAiSettings: G })
              ]),
              v[28] || (v[28] = e("div", { class: "gh-main-subbar" }, [
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
              e("div", Gn, [
                te(ut, {
                  active: t(a) && c.value === "stars"
                }, null, 8, ["active"])
              ]),
              v[29] || (v[29] = e("div", {
                id: "gh-search-body",
                hidden: ""
              }, null, -1)),
              e("div", Tn, [
                te(pt)
              ]),
              e("div", An, [
                te(ct, {
                  active: t(a) && c.value === "stars"
                }, null, 8, ["active"])
              ])
            ], 64)) : c.value === "trending" ? (i(), se(mt, { key: 2 })) : c.value === "awesome" ? (i(), se(Ut, { key: 3 })) : c.value === "repos" ? (i(), se(Os, {
              key: 4,
              active: t(a) && c.value === "repos"
            }, null, 8, ["active"])) : T("", !0)
          ])
        ])
      ]),
      te(vo),
      te(Sa)
    ], 10, Ra));
  }
}), jn = /* @__PURE__ */ ye(Mn, [["__scopeId", "data-v-90a302f8"]]);
export {
  jn as default
};
